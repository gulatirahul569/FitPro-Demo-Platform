import { getDb } from "@/lib/db";
import { randomBytes } from "crypto";

// Lead shape:
// {
//   _id,
//   leadId: "FP-260915-A1B2C3",
//   name, phone (10 digits), email, address, pinCode,
//   packageSlug, packageName, goal, notes,
//   slots: [{ priority: 1|2|3, date: "2026-09-20", time: "17:00" }],
//   consent: true, consentAt: Date,
//   source: "instagram" | "google" | "direct" ...,
//   campaign, medium,
//   status: "New Request",
//   assignedTo: null,          // sales rep user id, set later
//   nextFollowUpAt: null,
//   isDuplicate: boolean, duplicateOfLeadId: string | null,
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
        nextFollowUpAt: null,
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