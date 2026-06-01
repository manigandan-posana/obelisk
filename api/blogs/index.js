// GET  /api/blogs        -> list posts (newest first)
// POST /api/blogs        -> create a post (JSON body; cover is a Blob URL string)
import { sql } from "@vercel/postgres";
import { ensureTable, slugify, uniqueSlug, toClient } from "../_lib/db.js";

export default async function handler(req, res) {
  try {
    await ensureTable();

    if (req.method === "GET") {
      const { rows } = await sql`
        SELECT id, title, slug, excerpt, cover, author, tags, created_at
        FROM blogs ORDER BY created_at DESC`;
      return res.status(200).json(rows.map(toClient));
    }

    if (req.method === "POST") {
      const body = req.body || {};
      const { title, content, excerpt = "", author = "Obelisk Team", tags = "", cover = "" } = body;
      if (!title || !content) {
        return res.status(400).json({ error: "title and content are required" });
      }
      const slug = await uniqueSlug(slugify(title));
      const { rows } = await sql`
        INSERT INTO blogs (title, slug, excerpt, content, cover, author, tags)
        VALUES (${title}, ${slug}, ${excerpt}, ${content}, ${cover}, ${author}, ${tags})
        RETURNING *`;
      return res.status(201).json(toClient(rows[0]));
    }

    res.setHeader("Allow", "GET, POST");
    return res.status(405).json({ error: "Method not allowed" });
  } catch (err) {
    console.error("[api/blogs]", err);
    return res.status(500).json({ error: err.message || "Server error" });
  }
}
