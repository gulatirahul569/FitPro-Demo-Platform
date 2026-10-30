export const FITNESS_GOALS = [
  "Weight loss",
  "Muscle gain",
  "General fitness",
  "Flexibility and yoga",
  "Strength and conditioning",
  "Stress relief",
  "Other",
];

export const LEAD_STATUSES = [
  "New Request",
  "Contacting",
  "Availability Check",
  "Demo Pending",
  "Pending Payment", // now used for a later payment (e.g. balance / main package), not the demo fee
  "Demo Confirmed",
  "Demo Completed",
  "Converted / Closed",
];

// Online payment state, stored separately from the pipeline status.
// "pending" = checkout started but not confirmed (hidden from sales)
// "paid"    = confirmed by Razorpay (verify route or webhook)
// Old leads have no paymentStatus and are treated as visible.
export const PAYMENT_STATUSES = ["pending", "paid"];