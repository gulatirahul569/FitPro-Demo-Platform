    import crypto from "crypto";
import { NextResponse } from "next/server";
import { markLeadPaid } from "@/lib/models/lead";
import { notifyPaidLead } from "@/lib/notifications";

export const runtime = "nodejs";

export async function POST(req) {
  const raw = await req.text(); // raw body is required for the signature
  const signature = req.headers.get("x-razorpay-signature") || "";

  const expected = crypto
    .createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
    .update(raw)
    .digest("hex");

  if (
    expected.length !== signature.length ||
    !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(signature))
  ) {
    return NextResponse.json({ error: "Bad signature" }, { status: 400 });
  }

  try {
    const event = JSON.parse(raw);

    if (event.event === "payment.captured" || event.event === "order.paid") {
      const p = event.payload?.payment?.entity;
      if (p?.order_id) {
        const lead = await markLeadPaid({ orderId: p.order_id, paymentId: p.id });
        if (lead) await notifyPaidLead(lead);
      }
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 500 });
  }
}