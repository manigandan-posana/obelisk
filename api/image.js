// Streams a private Vercel Blob image to the browser (same-origin), so cover
// images stored in a PRIVATE blob store can still be displayed publicly.
// Usage: <img src="/api/image?path=<blob pathname>">
import { get } from "@vercel/blob";

export default async function handler(req, res) {
  if (req.method !== "GET") {
    res.setHeader("Allow", "GET");
    return res.status(405).json({ error: "Method not allowed" });
  }

  const path = req.query.path;
  if (!path || typeof path !== "string") {
    return res.status(400).json({ error: "Missing 'path' query parameter" });
  }

  try {
    // Token is read from BLOB_READ_WRITE_TOKEN in the environment.
    const result = await get(path, { access: "private" });
    if (!result || !result.stream) return res.status(404).json({ error: "Image not found" });

    const buffer = Buffer.from(await new Response(result.stream).arrayBuffer());
    res.setHeader("Content-Type", result.blob.contentType || "application/octet-stream");
    // Pathnames are immutable (random suffix), so cache hard at the CDN + browser.
    res.setHeader("Cache-Control", "public, max-age=31536000, immutable");
    return res.status(200).send(buffer);
  } catch (err) {
    console.error("[api/image]", err);
    return res.status(500).json({ error: err.message || "Failed to load image" });
  }
}
