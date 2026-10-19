const TZ = "Asia/Kolkata";

export function fmtDate(value) {
  if (!value) return "—";
  return new Date(value).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    timeZone: TZ,
  });
}

export function fmtDateTime(value) {
  if (!value) return "—";
  return new Date(value).toLocaleString("en-IN", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
    timeZone: TZ,
  });
}

// slot = { date: "2026-09-20", time: "17:00" }
export function fmtSlot(slot) {
  if (!slot?.date || !slot?.time) return "—";
  const [h, m] = slot.time.split(":").map(Number);
  const hour12 = h % 12 || 12;
  const ampm = h >= 12 ? "PM" : "AM";
  const day = new Date(`${slot.date}T12:00:00+05:30`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    timeZone: TZ,
  });
  return `${day}, ${hour12}:${String(m).padStart(2, "0")} ${ampm}`;
}

export function isDue(lead) {
  if (!lead?.nextFollowUpAt || lead.status === "Converted / Closed") return false;
  const today = new Date().toLocaleDateString("en-CA", { timeZone: TZ });
  const due = new Date(lead.nextFollowUpAt).toLocaleDateString("en-CA", { timeZone: TZ });
  return due <= today;
}