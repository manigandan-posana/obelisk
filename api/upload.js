// Server-side image upload to Vercel Blob.
// The browser POSTs the raw file bytes here (same-origin — no CORS), and we
// stream them straight to Blob. Cover images stay well under Vercel's 4.5 MB
// serverless request limit.
import { put } from "@vercel/blob";

async function streamToBuffer(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(typeof chunk === "string" ? Buffer.from(chunk) : chunk);
  }
  return Buffer.concat(chunks);
}

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const filename = String(req.query.filename || "upload");
    const contentType = req.headers["content-type"] || "application/octet-stream";

    // Vercel only auto-parses JSON / urlencoded bodies; binary bodies arrive as
    // an intact stream (or, depending on runtime, a Buffer). Handle both.
    let body = req.body;
    if (Buffer.isBuffer(body)) {
      // already buffered
    } else if (typeof body === "string" && body.length) {
      body = Buffer.from(body);
    } else {
      body = await streamToBuffer(req);
    }

    if (!body || body.length === 0) {
      return res.status(400).json({ error: "Empty file upload" });
    }

    const blob = await put(filename, body, {
      access: "private",
      contentType,
      addRandomSuffix: true,
    });
    // Private blobs aren't directly loadable by a browser, so return a
    // same-origin proxy URL that streams the image via /api/image.
    const pathname = blob.pathname || new URL(blob.url).pathname.replace(/^\/+/, "");
    return res.status(200).json({ url: `/api/image?path=${encodeURIComponent(pathname)}` });
  } catch (err) {
    console.error("[api/upload]", err);
    return res.status(500).json({ error: err.message || "Upload failed" });
  }
}
