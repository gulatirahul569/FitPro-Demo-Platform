import { getDb } from "@/lib/db";
import { randomBytes } from "crypto";

export const DEMO_BOOKING_STATUSES = [
  "Waiting for Customer",
  "Waiting for Trainer",
  "Pending Payment",
  "Confirmed",
  "Completed",
  "Cancelled",
  "No Show",
  "Rescheduled",
  "Declined by Trainer",
];
export const CONFIRMED_STATUSES = ["Confirmed", "Completed"];

function generateBookingId() {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = randomBytes(3).toString("hex").toUpperCase();

  return `DB-${yy}${mm}${dd}-${rand}`;
}

const plain = (doc) =>
  doc ? JSON.parse(JSON.stringify(doc)) : null;

let indexesReady = false;

async function ensureIndexes(db) {
  if (indexesReady) return;

  const col = db.collection("demoBookings");

  await col.createIndex({ bookingId: 1 }, { unique: true });
  await col.createIndex({ leadId: 1 });
  await col.createIndex({ trainerId: 1, date: 1, time: 1 });
  await col.createIndex({ date: 1, time: 1 });
  await col.createIndex({ status: 1, date: 1 });

  indexesReady = true;
}

export async function createDemoBooking(data) {
  const db = await getDb();
  await ensureIndexes(db);

  const col = db.collection("demoBookings");
  const now = new Date();

  // Prevent one trainer from having two active demos at the same slot.
  const clash = await col.findOne({
    trainerId: data.trainerId,
    date: data.date,
    time: data.time,
    status: { $in: CONFIRMED_STATUSES },
  });

  if (clash) {
    throw new Error("TRAINER_ALREADY_BOOKED");
  }

  for (let attempt = 0; attempt < 3; attempt++) {
    const bookingId = generateBookingId();

    try {
      await col.insertOne({
        bookingId,
        leadId: data.leadId,
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail,
        address: data.address,
        pinCode: data.pinCode,
        goal: data.goal,

        trainerId: data.trainerId,
        trainerName: data.trainerName,

        date: data.date,
        time: data.time,

        status: data.status || "Waiting for Customer",
        paymentStatus: data.paymentStatus || "Not Required",
        amount: Number(data.amount || 0),

        notes: data.notes || "",
        createdBy: data.createdBy,
        createdByName: data.createdByName,

        history: [
          {
            status: data.status || "Waiting for Customer",
            at: now,
            by: data.createdByName || "Sales",
          },
        ],

        createdAt: now,
        updatedAt: now,
      });

      return { bookingId };
    } catch (error) {
      if (error?.code === 11000 && attempt < 2) continue;
      throw error;
    }
  }
}

export async function listDemoBookings({
  status = "",
  date = "",
  q = "",
  limit = 100,
} = {}) {
  const db = await getDb();
  await ensureIndexes(db);

  const filter = {};

  if (status) filter.status = status;
  if (date) filter.date = date;

  const term = q.trim().slice(0, 60);

  if (term) {
    const rx = new RegExp(
      term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"),
      "i"
    );

    filter.$or = [
      { bookingId: rx },
      { leadId: rx },
      { customerName: rx },
      { customerPhone: rx },
      { trainerName: rx },
    ];
  }

  const bookings = await db
    .collection("demoBookings")
    .find(filter)
    .sort({ date: 1, time: 1 })
    .limit(limit)
    .toArray();

  return plain(bookings);
}

export async function getDemoBookingByBookingId(bookingId) {
  const db = await getDb();
  await ensureIndexes(db);

  return plain(
    await db.collection("demoBookings").findOne({ bookingId })
  );
}

export async function updateDemoBookingStatus(
  bookingId,
  status,
  by,
  byName
) {
  if (!DEMO_BOOKING_STATUSES.includes(status)) {
    throw new Error("Invalid status");
  }

  // Rescheduled needs a proposed slot, so it must go through the trainer reschedule route.
  if (status === "Rescheduled") {
    throw new Error("Use the trainer reschedule flow to set Rescheduled.");
  }

  const db = await getDb();
  const now = new Date();

  const result = await db
    .collection("demoBookings")
    .findOneAndUpdate(
      { bookingId },
      {
        $set: {
          status,
          updatedAt: now,
        },
        $unset: {
          proposedDate: "",
          proposedTime: "",
        },
        $push: {
          history: {
            status,
            at: now,
            by: byName || by || "Sales",
          },
        },
      },
      { returnDocument: "after" }
    );

  return plain(result);
}
export async function getDemoBookingStats() {
  const db = await getDb();
  await ensureIndexes(db);

  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Asia/Kolkata",
  });

  const [
    total,
    todaysDemos,
    pendingPayment,
    confirmed,
    completed,
  ] = await Promise.all([
    db.collection("demoBookings").countDocuments({}),
    db.collection("demoBookings").countDocuments({
      date: today,
      status: { $in: [...CONFIRMED_STATUSES, "Pending Payment"] },
    }),
    db.collection("demoBookings").countDocuments({
      status: "Pending Payment",
    }),
    db.collection("demoBookings").countDocuments({
      status: "Confirmed",
    }),
    db.collection("demoBookings").countDocuments({
      status: "Completed",
    }),
  ]);

  return {
    total,
    todaysDemos,
    pendingPayment,
    confirmed,
    completed,
  };
}