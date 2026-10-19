import { getDb } from "@/lib/db";
import { randomBytes } from "crypto";
import { LEAD_STATUSES } from "@/lib/leadOptions";

// Lead shape:
// {
//   _id, leadId: "FP-260915-A1B2C3",
//   name, phone (10 digits), email, address, pinCode,
//   goal, notes,
//   slots: [{ priority: 1|2|3, date: "2026-09-20", time: "17:00" }],
//   consent, consentAt, source, campaign, medium,
//   status: "New Request",
//   assignedTo: userId | null, assignedToName: string | null,
//   nextFollowUpAt: Date | null,
//   isDuplicate, duplicateOfLeadId,
//   notes list: callNotes: [{ text, by, byName, at }],
//   history: [{ status, at, by }],
//   createdAt, updatedAt
// }

let indexesReady = false;

async function ensureIndexes(db) {
  if (indexesReady) return;
  const col = db.collection("leads");
  await col.createIndex({ leadId: 1 }, { unique: true });
  await col.createIndex({ phone: 1 });
  await col.createIndex({ email: 1 });
  await col.createIndex({ status: 1, createdAt: -1 });
  indexesReady = true;
}

function generateLeadId() {
  const d = new Date();
  const yy = String(d.getFullYear()).slice(2);
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const rand = randomBytes(3).toString("hex").toUpperCase();
  return `FP-${yy}${mm}${dd}-${rand}`;
}

export async function createLead(data) {
  const db = await getDb();
  await ensureIndexes(db);
  const col = db.collection("leads");

  // Same phone or email submitting again: flag it for sales, never block the customer
  const earlier = await col.findOne(
    { $or: [{ phone: data.phone }, { email: data.email }] },
    { projection: { leadId: 1 }, sort: { createdAt: 1 } }
  );

  const now = new Date();

  for (let attempt = 0; attempt < 3; attempt++) {
    const leadId = generateLeadId();
    try {
      await col.insertOne({
        leadId,
        ...data,
        status: "New Request",
        assignedTo: null,
        assignedToName: null,
        nextFollowUpAt: null,
        callNotes: [],
        isDuplicate: !!earlier,
        duplicateOfLeadId: earlier ? earlier.leadId : null,
        history: [{ status: "New Request", at: now, by: "system" }],
        createdAt: now,
        updatedAt: now,
      });
      return { leadId, isDuplicate: !!earlier };
    } catch (error) {
      if (error?.code === 11000 && attempt < 2) continue; // leadId clash, retry
      throw error;
    }
  }
}

/* ============================================================
   SALES FUNCTIONS
============================================================ */

// Turns Dates and ObjectIds into plain strings so pages can pass them around
const plain = (doc) => (doc ? JSON.parse(JSON.stringify(doc)) : null);

const istToday = () =>
  new Date().toLocaleDateString("en-CA", { timeZone: "Asia/Kolkata" });

const endOfTodayIST = () => new Date(`${istToday()}T23:59:59.999+05:30`);

export async function getLeadStats() {
  const db = await getDb();
  const col = db.collection("leads");

  const [total, newLeads, followUpsDue, pendingDemos, confirmedDemos] =
    await Promise.all([
      col.countDocuments({}),
      col.countDocuments({ status: "New Request" }),
      col.countDocuments({
        nextFollowUpAt: { $lte: endOfTodayIST() },
        status: { $ne: "Converted / Closed" },
      }),
      col.countDocuments({ status: { $in: ["Demo Pending", "Pending Payment"] } }),
      col.countDocuments({ status: "Demo Confirmed" }),
    ]);

  return { total, newLeads, followUpsDue, pendingDemos, confirmedDemos };
}

// status can be a pipeline status, or "due" for follow-ups due today or overdue
export async function listLeads({ status = "", q = "", limit = 100 } = {}) {
  const db = await getDb();
  const filter = {};

  if (status === "due") {
    filter.nextFollowUpAt = { $lte: endOfTodayIST() };
    filter.status = { $ne: "Converted / Closed" };
  } else if (LEAD_STATUSES.includes(status)) {
    filter.status = status;
  }

  const term = q.trim().slice(0, 60);
  if (term) {
    const rx = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"), "i");
    filter.$or = [{ name: rx }, { phone: rx }, { email: rx }, { leadId: rx }];
  }

  const leads = await db
    .collection("leads")
    .find(filter)
    .sort({ createdAt: -1 })
    .limit(limit)
    .toArray();

  return plain(leads);
}

export async function getLeadByLeadId(leadId) {
  const db = await getDb();
  return plain(await db.collection("leads").findOne({ leadId }));
}

export async function updateLeadStatus(leadId, status, by) {
  if (!LEAD_STATUSES.includes(status)) throw new Error("Invalid status");
  const db = await getDb();
  const now = new Date();

  const result = await db.collection("leads").findOneAndUpdate(
    { leadId },
    {
      $set: { status, updatedAt: now },
      $push: { history: { status, at: now, by } },
    },
    { returnDocument: "after" }
  );
  return plain(result);
}

export async function addLeadNote(leadId, text, by, byName) {
  const db = await getDb();
  const now = new Date();

  const result = await db.collection("leads").findOneAndUpdate(
    { leadId },
    {
      $set: { updatedAt: now },
      $push: { callNotes: { text, by, byName: byName || "Sales", at: now } },
    },
    { returnDocument: "after" }
  );
  return plain(result);
}

// date: "YYYY-MM-DD" (India time) or null to clear
export async function setFollowUp(leadId, date) {
  const db = await getDb();
  const value = date ? new Date(`${date}T09:00:00+05:30`) : null;

  const result = await db.collection("leads").findOneAndUpdate(
    { leadId },
    { $set: { nextFollowUpAt: value, updatedAt: new Date() } },
    { returnDocument: "after" }
  );
  return plain(result);
}

export async function assignLead(leadId, userId, userName) {
  const db = await getDb();

  const result = await db.collection("leads").findOneAndUpdate(
    { leadId },
    {
      $set: {
        assignedTo: userId || null,
        assignedToName: userId ? userName || "Sales" : null,
        updatedAt: new Date(),
      },
    },
    { returnDocument: "after" }
  );
  return plain(result);
}