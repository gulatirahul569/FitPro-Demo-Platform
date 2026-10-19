import { NextResponse } from "next/server";
import { requireSales } from "@/lib/salesAuth";
import {
  updateLeadStatus,
  addLeadNote,
  setFollowUp,
  assignLead,
} from "@/lib/models/lead";

const DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

export async function PATCH(request, { params }) {
  const user = await requireSales();
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;

  let body;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  try {
    let lead;

    switch (body.action) {
      case "status":
        lead = await updateLeadStatus(id, body.status, user.name || user.id);
        break;

      case "note": {
        const text = typeof body.text === "string" ? body.text.trim().slice(0, 1000) : "";
        if (!text) {
          return NextResponse.json({ error: "Please write a note." }, { status: 400 });
        }
        lead = await addLeadNote(id, text, user.id, user.name);
        break;
      }

      case "followUp":
        if (body.date !== null && !DATE_RE.test(body.date || "")) {
          return NextResponse.json({ error: "Invalid date." }, { status: 400 });
        }
        lead = await setFollowUp(id, body.date);
        break;

      case "assign":
        lead = await assignLead(id, body.assign ? user.id : null, user.name);
        break;

      default:
        return NextResponse.json({ error: "Unknown action." }, { status: 400 });
    }

    if (!lead) {
      return NextResponse.json({ error: "Lead not found." }, { status: 404 });
    }

    return NextResponse.json({ lead });
  } catch (error) {
    if (error.message === "Invalid status") {
      return NextResponse.json({ error: "Invalid status." }, { status: 400 });
    }
    console.error("Sales lead update error:", error);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}