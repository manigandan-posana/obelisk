// GET    /api/blogs/:slug  -> single post by slug
// PUT    /api/blogs/:id    -> update post by id
// DELETE /api/blogs/:id    -> delete post by id
import { sql } from "@vercel/postgres";
import { ensureTable, slugify, uniqueSlug, toClient } from "../_lib/db.js";

export default async function handler(req, res) {
  const { param } = req.query;
  try {
    await ensureTable();

    if (req.method === "GET") {
      const { rows } = await sql`SELECT * FROM blogs WHERE slug = ${param} LIMIT 1`;
      if (!rows.length) return res.status(404).json({ error: "Not found" });
      return res.status(200).json(toClient(rows[0]));
    }

    const id = Number(param);

    if (req.method === "DELETE") {
      const { rowCount } = await sql`DELETE FROM blogs WHERE id = ${id}`;
      if (!rowCount) return res.status(404).json({ error: "Not found" });
      return res.status(200).json({ ok: true });
    }

    if (req.method === "PUT") {
      const { rows: existing } = await sql`SELECT * FROM blogs WHERE id = ${id} LIMIT 1`;
      if (!existing.length) return res.status(404).json({ error: "Not found" });
      const e = existing[0];
      const b = req.body || {};
      const title = b.title ?? e.title;
      const slug = b.title ? await uniqueSlug(slugify(b.title), id) : e.slug;
      const { rows } = await sql`
        UPDATE blogs SET
          title=${title}, slug=${slug},
          excerpt=${b.excerpt ?? e.excerpt}, content=${b.content ?? e.content},
          cover=${b.cover ?? e.cover}, author=${b.author ?? e.author}, tags=${b.tags ?? e.tags}
        WHERE id=${id} RETURNING *`;
      return res.status(200).json(toClient(rows[0]));
    }

    res.setHeader("Allow", "GET, PUT, DELETE");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[api/blogs/:param]", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
