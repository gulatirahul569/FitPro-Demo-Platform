import { getDb } from "@/lib/db";

export const PACKAGE_TYPES = ["demo", "main"];

const plain = (doc) => (doc ? JSON.parse(JSON.stringify(doc)) : null);

let indexesReady = false;

async function getCol() {
  const db = await getDb();
  const col = db.collection("packages");

  if (!indexesReady) {
    await col.createIndex({ slug: 1 }, { unique: true });
    await col.createIndex({ type: 1, active: 1, sortOrder: 1 });
    indexesReady = true;
  }

  return col;
}

const SLUG_RX = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

/**
 * Validates and cleans admin input. Returns { data } or { error }.
 * Prices are always stored as whole rupees (integer).
 */
export function validatePackageInput(input, { creating = false } = {}) {
  const str = (v) => (typeof v === "string" ? v.trim() : "");

  const name = str(input.name);
  const slug = str(input.slug).toLowerCase();
  const type = str(input.type);
  const price = Number(input.price);
  const sortOrder = Number.isFinite(Number(input.sortOrder))
    ? Math.trunc(Number(input.sortOrder))
    : 0;
  const image = str(input.image);

  if (!name) return { error: "Name is required." };
  if (name.length > 80) return { error: "Name is too long." };

  if (creating) {
    if (!SLUG_RX.test(slug)) {
      return {
        error: "Slug can only have lowercase letters, numbers and hyphens.",
      };
    }
  }

  if (!PACKAGE_TYPES.includes(type)) {
    return { error: "Type must be demo or main." };
  }

  if (!Number.isInteger(price) || price <= 0 || price > 10000000) {
    return { error: "Price must be a whole number greater than 0." };
  }

  if (image && !/^https:\/\//i.test(image)) {
    return { error: "Image must be a full https:// URL." };
  }

  const benefits = Array.isArray(input.benefits)
    ? input.benefits.map(str).filter(Boolean).slice(0, 10)
    : [];

  const data = {
    name,
    type,
    description: str(input.description).slice(0, 300),
    level: str(input.level).slice(0, 60),
    format: str(input.format).slice(0, 60) || "At Home",
    sessions: str(input.sessions).slice(0, 40),
    benefits,
    price,
    image,
    sortOrder,
    active: input.active !== false,
  };

  if (creating) data.slug = slug;

  return { data };
}

export async function listPackages({ type = "", activeOnly = true } = {}) {
  const col = await getCol();
  const filter = {};

  if (type) filter.type = type;
  if (activeOnly) filter.active = true;

  const docs = await col
    .find(filter, { projection: { _id: 0 } })
    .sort({ sortOrder: 1, createdAt: 1 })
    .toArray();

  return plain(docs);
}

export async function getPackageBySlug(slug) {
  const col = await getCol();
  return plain(await col.findOne({ slug }, { projection: { _id: 0 } }));
}

export async function createPackage(data) {
  const col = await getCol();
  const now = new Date();

  await col.insertOne({ ...data, createdAt: now, updatedAt: now });

  return { slug: data.slug };
}

export async function updatePackage(slug, data) {
  const col = await getCol();

  const result = await col.updateOne(
    { slug },
    { $set: { ...data, updatedAt: new Date() } }
  );

  return result.matchedCount > 0;
}