import crypto from "crypto";
import { NextResponse } from "next/server";
import { markLeadPaid } from "@/lib/models/lead";
import { notifyPaidLead } from "@/lib/notifications";

export const runtime = "nodejs";

export async function POST(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
      await req.json();

    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    const sig = String(razorpay_signature || "");
    if (
      expected.length !== sig.length ||
      !crypto.timingSafeEqual(Buffer.from(expected), Buffer.from(sig))
    ) {
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }

    // Returns the lead only on the first confirmation (idempotent),
    // so the webhook and this route can't send duplicate notifications.
    const lead = await markLeadPaid({
      orderId: razorpay_order_id,
      paymentId: razorpay_payment_id,
    });
    if (lead) await notifyPaidLead(lead);

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Verify error:", error);
    return NextResponse.json({ error: "Verification failed" }, { status: 500 });
  }
}