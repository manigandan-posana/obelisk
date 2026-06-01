// Client for the Obelisk blog API (Vercel Serverless Functions).
// Cover images are POSTed to our own /api/upload (same-origin), which streams
// them to Vercel Blob; post data is sent as JSON.
const BASE = "/api";
const MAX_COVER_BYTES = 4.4 * 1024 * 1024; // stay under Vercel's 4.5 MB limit
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
  // 1) Upload the cover (if any) to our function, which streams it to Blob.
  let cover = "";
  if (coverFile) {
    if (coverFile.size > MAX_COVER_BYTES) {
      throw new Error("Cover image is too large. Please use an image under 4 MB.");
    }
    let up;
    try {
      up = await fetch(`${BASE}/upload?filename=${encodeURIComponent(coverFile.name)}`, {
        method: "POST",
        headers: { "Content-Type": coverFile.type || "application/octet-stream" },
        body: coverFile,
      });
    } catch {
      throw new Error(API_DOWN);
    }
    if (!up.ok) throw await asError(up);
    cover = (await up.json()).url;
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
