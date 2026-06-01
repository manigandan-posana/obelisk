// Token endpoint for client-side uploads to Vercel Blob.
// The browser (@vercel/blob/client `upload`) hits this to get a signed token,
// then uploads the file straight to Blob — bypassing the function body limit.
import { handleUpload } from "@vercel/blob/client";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ error: "Method not allowed" });
  }
  try {
    const jsonResponse = await handleUpload({
      request: req,
      body: req.body,
      onBeforeGenerateToken: async () => ({
        allowedContentTypes: ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif"],
        maximumSizeInBytes: 8 * 1024 * 1024,
        addRandomSuffix: true,
      }),
      // Runs as a Blob webhook after upload completes (production only).
      onUploadCompleted: async () => {},
    });
    return res.status(200).json(jsonResponse);
  } catch (err) {
    console.error("[api/upload]", err);
    return res.status(400).json({ error: err.message || "Upload failed" });
  }
}
