// Shared by the booking form (browser) and the /api/demo-requests route (server).
// Returns an error message string, or "" when the slots are valid.

const LABELS = ["First choice", "Second choice", "Third choice"];
const DATE_RX = /^\d{4}-\d{2}-\d{2}$/;
const TIME_RX = /^\d{2}:\d{2}$/;

// Current date (YYYY-MM-DD) and time (HH:MM) in India, whatever the device's timezone.
function nowInIST(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const get = (type) => parts.find((p) => p.type === type)?.value || "";

  return {
    date: `${get("year")}-${get("month")}-${get("day")}`,
    time: `${get("hour")}:${get("minute")}`,
  };
}

export function validateSlots(slots, now = new Date()) {
  if (!Array.isArray(slots) || slots.length === 0) {
    return "Please choose a date and time for your first choice.";
  }

  const current = nowInIST(now);
  const usedDates = new Set();

  for (let i = 0; i < Math.min(slots.length, LABELS.length); i++) {
    const label = LABELS[i];
    const date = typeof slots[i]?.date === "string" ? slots[i].date : "";
    const time = typeof slots[i]?.time === "string" ? slots[i].time : "";

    // First choice is mandatory.
    if (i === 0 && (!date || !time)) {
      return "Please choose a date and time for your first choice.";
    }

    // Other choices are optional, but never half-filled.
    if (!date && !time) continue;

    if (!date || !time) {
      return `${label}: please select both a date and a time.`;
    }

    if (!DATE_RX.test(date) || !TIME_RX.test(time)) {
      return `${label}: the date or time is not valid.`;
    }

    if (
      date < current.date ||
      (date === current.date && time <= current.time)
    ) {
      return `${label}: please choose a date and time in the future.`;
    }

    if (usedDates.has(date)) {
      return `${label}: this day is already used in another choice. Please pick a different day.`;
    }
    usedDates.add(date);
  }

  return "";
}
