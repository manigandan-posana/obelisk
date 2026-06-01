// Client for the Obelisk blog API (Vercel Serverless Functions).
// Cover images go straight to Vercel Blob from the browser; post data is JSON.
import { upload } from "@vercel/blob/client";

const BASE = "/api";
const API_DOWN =
  "Could not reach the blog API. On Vercel this means Postgres/Blob aren't configured yet; locally run `vercel dev` (see README).";

async function asError(res) {
  const e = await res.json().catch(() => ({}));
  return new Error(e.error || (res.status >= 500 ? API_DOWN : "Request failed"));
}

export async function listBlogs() {
  let res;
  try {
    res = await fetch(`${BASE}/blogs`);
  } catch {
    throw new Error(API_DOWN);
  }
  if (!res.ok) throw await asError(res);
  return res.json();
}

export async function getBlog(slug) {
  const res = await fetch(`${BASE}/blogs/${slug}`);
  if (res.status === 404) return null;
  if (!res.ok) throw await asError(res);
  return res.json();
}

export async function createBlog({ title, author, tags, excerpt, content, coverFile }) {
  // 1) Upload the cover (if any) directly to Vercel Blob.
  let cover = "";
  if (coverFile) {
    const blob = await upload(coverFile.name, coverFile, {
      access: "public",
      handleUploadUrl: `${BASE}/upload`,
    });
    cover = blob.url;
  }

  // 2) Create the post.
  let res;
  try {
    res = await fetch(`${BASE}/blogs`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, author, tags, excerpt, content, cover }),
    });
  } catch {
    throw new Error(API_DOWN);
  }
  if (!res.ok) throw await asError(res);
  return res.json();
}

export async function deleteBlog(id) {
  const res = await fetch(`${BASE}/blogs/${id}`, { method: "DELETE" });
  if (!res.ok) throw await asError(res);
  return res.json();
}

export function formatDate(value) {
  if (!value) return "";
  let d = new Date(value);
  if (isNaN(d.getTime())) d = new Date(String(value).replace(" ", "T") + "Z");
  return isNaN(d.getTime())
    ? String(value)
    : d.toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });
}
