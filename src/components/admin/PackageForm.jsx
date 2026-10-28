"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2.5 text-sm text-black outline-none transition focus:border-black focus:ring-2 focus:ring-black/10 disabled:bg-gray-100 disabled:text-gray-500";
const labelClass = "mb-1.5 block text-sm font-medium text-gray-700";

// Pass `pkg` to edit an existing package; omit it to create a new one.
export default function PackageForm({ pkg = null }) {
  const router = useRouter();
  const isEdit = Boolean(pkg);

  const [form, setForm] = useState({
    name: pkg?.name || "",
    slug: pkg?.slug || "",
    type: pkg?.type || "demo",
    price: pkg?.price ?? "",
    sessions: pkg?.sessions || "",
    level: pkg?.level || "",
    format: pkg?.format || "At Home",
    description: pkg?.description || "",
    benefits: (pkg?.benefits || []).join("\n"),
    image: pkg?.image || "",
    sortOrder: pkg?.sortOrder ?? 0,
    active: pkg?.active ?? true,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  const setField = (key) => (e) =>
    setForm((c) => ({
      ...c,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    }));

  async function handleFile(e) {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");
    setUploading(true);

    try {
      const body = new FormData();
      body.append("file", file);

      const res = await fetch("/api/admin/upload", { method: "POST", body });
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Upload failed.");
      } else {
        setForm((c) => ({ ...c, image: data.url }));
      }
    } catch {
      setError("Upload failed. Please try again.");
    }

    setUploading(false);
    e.target.value = "";
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setSaving(true);

    const payload = {
      ...form,
      price: Number(form.price),
      sortOrder: Number(form.sortOrder) || 0,
      benefits: form.benefits.split("\n"),
    };

    try {
      const res = await fetch(
        isEdit
          ? `/api/admin/packages/${encodeURIComponent(pkg.slug)}`
          : "/api/admin/packages",
        {
          method: isEdit ? "PATCH" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        },
      );
      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Something went wrong.");
        setSaving(false);
        return;
      }

      router.push("/admin/packages");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-3xl space-y-5 rounded-2xl border border-gray-200 bg-white p-5 sm:p-6"
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className={labelClass}>Name *</label>
          <input
            className={inputClass}
            value={form.name}
            onChange={setField("name")}
          />
        </div>

        <div>
          <label className={labelClass}>Slug *</label>
          <input
            className={inputClass}
            value={form.slug}
            onChange={setField("slug")}
            disabled={isEdit}
            placeholder="e.g. yoga-demo"
          />
          <p className="mt-1 text-xs text-gray-500">
            {isEdit
              ? "Slug can't be changed after creation."
              : "Lowercase letters, numbers and hyphens. Can't be changed later."}
          </p>
        </div>

        <div>
          <label className={labelClass}>Type *</label>
          <select
            className={inputClass}
            value={form.type}
            onChange={setField("type")}
          >
            <option value="demo">Demo package</option>
            <option value="main">Main package</option>
          </select>
        </div>

        <div>
          <label className={labelClass}>Price (₹) *</label>
          <input
            className={inputClass}
            type="number"
            min="1"
            step="1"
            inputMode="numeric"
            value={form.price}
            onChange={setField("price")}
          />
        </div>

        <div>
          <label className={labelClass}>Sessions</label>
          <input
            className={inputClass}
            value={form.sessions}
            onChange={setField("sessions")}
            placeholder="e.g. 8 Sessions"
          />
        </div>

        <div>
          <label className={labelClass}>Level</label>
          <input
            className={inputClass}
            value={form.level}
            onChange={setField("level")}
            placeholder="e.g. All Levels"
          />
        </div>

        <div>
          <label className={labelClass}>Format</label>
          <input
            className={inputClass}
            value={form.format}
            onChange={setField("format")}
          />
        </div>

        <div>
          <label className={labelClass}>Sort order</label>
          <input
            className={inputClass}
            type="number"
            value={form.sortOrder}
            onChange={setField("sortOrder")}
          />
          <p className="mt-1 text-xs text-gray-500">
            Lower numbers show first.
          </p>
        </div>
      </div>

      <div>
        <label className={labelClass}>Description</label>
        <textarea
          className={`${inputClass} resize-y`}
          rows={2}
          value={form.description}
          onChange={setField("description")}
        />
      </div>

      <div>
        <label className={labelClass}>Benefits (one per line, optional)</label>
        <textarea
          className={`${inputClass} resize-y`}
          rows={4}
          value={form.benefits}
          onChange={setField("benefits")}
          placeholder={"Diet guidance\nCustom workout plan"}
        />
      </div>

      <div>
        <label className={labelClass}>Image</label>
        <input
          type="file"
          accept="image/jpeg,image/png,image/webp"
          onChange={handleFile}
          disabled={uploading}
          className="block w-full text-sm text-gray-600 file:mr-3 file:rounded-lg file:border-0 file:bg-black file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-gray-800"
        />
        <p className="mt-1 text-xs text-gray-500">
          {uploading
            ? "Uploading…"
            : "JPG, PNG or WebP, up to 4 MB. Or paste an image URL below."}
        </p>
        <input
          className={`${inputClass} mt-2`}
          value={form.image}
          onChange={setField("image")}
          placeholder="https://..."
        />
        {form.image && (
          <img
            src={form.image}
            alt=""
            className="mt-3 h-32 w-auto rounded-lg border border-gray-200 object-cover"
          />
        )}
      </div>

      <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-700">
        <input
          type="checkbox"
          className="h-4 w-4 accent-black"
          checked={form.active}
          onChange={setField("active")}
        />
        Active (shown on the website and in the booking form)
      </label>

      {error && (
        <p
          role="alert"
          className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
        >
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          type="submit"
          disabled={saving}
          className="rounded-lg bg-black px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-gray-800 disabled:opacity-60"
        >
          {saving ? "Saving…" : isEdit ? "Save changes" : "Create package"}
        </button>
        <button
          type="button"
          onClick={() => router.push("/admin/packages")}
          className="rounded-lg border border-gray-300 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}
