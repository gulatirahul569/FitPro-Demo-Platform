// Called once, the first time a lead's payment is confirmed.
// TODO: email the sales team and send the customer a receipt/acknowledgment.
export async function notifyPaidLead(lead) {
  console.log(
    "Paid demo request:",
    lead.leadId,
    lead.packageName,
    `₹${(lead.amount || 0) / 100}`
  );
}