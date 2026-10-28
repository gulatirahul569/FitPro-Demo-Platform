import { NextResponse } from "next/server";
import { createLead } from "@/lib/models/lead";
import { getPackageBySlug } from "@/lib/models/package";
import { FITNESS_GOALS } from "@/lib/leadOptions";
import { validateSlots } from "@/lib/validateSlots";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RE = /^([01]\d|2[0-3]):[0-5]\d$/;

const clean = (value, max) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";

const cleanTag = (value) =>
  clean(value, 60).toLowerCase().replace(/[^a-z0-9_\-. ]/g, "") || "";

function normalizePhone(raw) {
  let digits = String(raw || "").replace(/\D/g, "");
  if (digits.length === 12 && digits.startsWith("91")) digits = digits.slice(2);
  if (digits.length === 11 && digits.startsWith("0")) digits = digits.slice(1);
  return digits;
}

export async function POST(request) {
  try {
    const body = await request.json();

    // Honeypot: real users never fill this hidden field. Pretend success for bots.
    if (body.website) {
      return NextResponse.json({ leadId: "FP-OK" }, { status: 201 });
    }

    const name = clean(body.name, 100);
    const phone = normalizePhone(body.phone);
    const email = clean(body.email, 150).toLowerCase();
    const address = clean(body.address, 300);
    const goal = clean(body.goal, 60);
    const notes = clean(body.notes, 500);
    const packageSlug = clean(body.packageSlug, 80);

    if (name.length < 2) {
      return NextResponse.json({ error: "Please enter your full name." }, { status: 400 });
    }
    if (!/^[6-9]\d{9}$/.test(phone)) {
      return NextResponse.json(
        { error: "Please enter a valid 10-digit mobile number." },
        { status: 400 }
      );
    }
    if (!EMAIL_RE.test(email)) {
      return NextResponse.json({ error: "Please enter a valid email address." }, { status: 400 });
    }
    if (address.length < 6) {
      return NextResponse.json(
        { error: "Please enter your address or PIN code." },
        { status: 400 }
      );
    }
    if (!FITNESS_GOALS.includes(goal)) {
      return NextResponse.json({ error: "Please choose a fitness goal." }, { status: 400 });
    }
    if (body.consent !== true) {
      return NextResponse.json(
        { error: "Please accept the consent checkbox to continue." },
        { status: 400 }
      );
    }

    // Package is optional, but if one is sent it must exist and be active.
    let pkg = null;
    if (packageSlug) {
      pkg = await getPackageBySlug(packageSlug);
      if (!pkg || !pkg.active) {
        return NextResponse.json(
          { error: "The selected package is no longer available. Please choose another." },
          { status: 400 }
        );
      }
    }

    // Slots: first choice required, second and third optional (see validateSlots).
    const slotError = validateSlots(body.slots);
    if (slotError) {
      return NextResponse.json({ error: slotError }, { status: 400 });
    }

    const rawSlots = Array.isArray(body.slots) ? body.slots.slice(0, 3) : [];
    const slots = [];

    for (let i = 0; i < rawSlots.length; i++) {
      const s = rawSlots[i] || {};
      if (!s.date && !s.time) continue; // empty optional choice

      if (!DATE_RE.test(s.date || "") || !TIME_RE.test(s.time || "")) {
        return NextResponse.json(
          { error: `Preferred slot ${i + 1} has an invalid date or time.` },
          { status: 400 }
        );
      }

      // priority keeps the customer's original ranking (1, 2 or 3)
      slots.push({ priority: i + 1, date: s.date, time: s.time });
    }

    const pinMatch = address.match(/\b\d{6}\b/);

    const { leadId } = await createLead({
      name,
      phone,
      email,
      address,
      pinCode: pinMatch ? pinMatch[0] : "",
      goal,
      notes,
      slots,
      // Taken from the database, never from the browser
      packageSlug: pkg ? pkg.slug : "",
      packageName: pkg ? pkg.name : "",
      packageType: pkg ? pkg.type : "",
      consent: true,
      consentAt: new Date(),
      source: cleanTag(body.source) || "direct",
      medium: cleanTag(body.medium),
      campaign: cleanTag(body.campaign),
    });

    // TODO (notifications step): email the sales team and send the customer an acknowledgment

    return NextResponse.json({ leadId }, { status: 201 });
  } catch (error) {
    console.error("Demo request error:", error);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}