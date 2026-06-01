// Shared Postgres helpers for the Obelisk blog serverless functions.
// Files/folders prefixed with "_" are not treated as routes by Vercel.
import { sql } from "@vercel/postgres";

let ready;
// Create the table once per cold start (idempotent).
export async function ensureTable() {
  if (!ready) {
    ready = sql`
      CREATE TABLE IF NOT EXISTS blogs (
        id         SERIAL PRIMARY KEY,
        title      TEXT NOT NULL,
        slug       TEXT NOT NULL UNIQUE,
        excerpt    TEXT NOT NULL DEFAULT '',
        content    TEXT NOT NULL,
        cover      TEXT NOT NULL DEFAULT '',
        author     TEXT NOT NULL DEFAULT 'Obelisk Team',
        tags       TEXT NOT NULL DEFAULT '',
        created_at TIMESTAMPTZ NOT NULL DEFAULT now()
      );
    `;
  }
  return ready;
}

export const slugify = (s) =>
  s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .slice(0, 80) || "post";

export async function uniqueSlug(base, ignoreId = null) {
  let slug = base;
  let n = 1;
  for (;;) {
    const { rows } = await sql`SELECT id FROM blogs WHERE slug = ${slug} LIMIT 1`;
    if (rows.length === 0 || rows[0].id === ignoreId) return slug;
    slug = `${base}-${++n}`;
  }
}

// Normalise a DB row for the client (tags -> array, created_at -> ISO string).
export const toClient = (r) => ({
  ...r,
  tags: r.tags ? r.tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
  created_at:
    r.created_at instanceof Date ? r.created_at.toISOString() : String(r.created_at),
});
