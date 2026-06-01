import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UploadCloud, Trash2, Loader2 } from "lucide-react";
import { createBlog, listBlogs, deleteBlog, formatDate } from "../lib/api";

const empty = { title: "", author: "Obelisk Team", tags: "", excerpt: "", content: "" };

export default function Admin() {
  const navigate = useNavigate();
  const fileRef = useRef(null);
  const [form, setForm] = useState(empty);
  const [cover, setCover] = useState(null);
  const [preview, setPreview] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [blogs, setBlogs] = useState([]);

  const set = (k) => (e) => setForm((f) => ({ ...f, [k]: e.target.value }));

  const refresh = () => listBlogs().then(setBlogs).catch(() => {});
  useEffect(() => {
    refresh();
  }, []);

  const onFile = (e) => {
    const file = e.target.files?.[0];
    setCover(file || null);
    setPreview(file ? URL.createObjectURL(file) : "");
  };

  const submit = async (e) => {
    e.preventDefault();
    setError("");
    if (!form.title.trim() || !form.content.trim()) {
      setError("Title and content are required.");
      return;
    }
    setBusy(true);
    try {
      const created = await createBlog({ ...form, coverFile: cover });
      navigate(`/blog/${created.slug}`);
    } catch (err) {
      setError(err.message || "Something went wrong.");
      setBusy(false);
    }
  };

  const removeBlog = async (id) => {
    if (!window.confirm("Delete this article?")) return;
    await deleteBlog(id);
    refresh();
  };

  const inputCls =
    "w-full rounded-xl border border-black/10 bg-white px-4 py-3 text-ink placeholder:text-neutral-400 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20";

  return (
    <main className="bg-cream py-16">
      <div className="mx-auto max-w-5xl px-5 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold tracking-[0.3em] text-brand">ADMIN</p>
            <h1 className="mt-2 text-4xl font-semibold text-ink">Publish a new blog</h1>
          </div>
          <Link to="/blog" className="font-semibold text-brand">
            View blog →
          </Link>
        </div>

        <form
          onSubmit={submit}
          className="mt-10 grid grid-cols-1 gap-6 rounded-3xl bg-white p-6 shadow-sm ring-1 ring-black/5 lg:p-10"
        >
          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Title *</label>
            <input className={inputCls} value={form.title} onChange={set("title")} placeholder="How we cut RFIs by 40% with smart federation" />
          </div>

          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Author</label>
              <input className={inputCls} value={form.author} onChange={set("author")} />
            </div>
            <div>
              <label className="mb-2 block text-sm font-semibold text-ink">Tags (comma separated)</label>
              <input className={inputCls} value={form.tags} onChange={set("tags")} placeholder="Revit, Coordination, Workflow" />
            </div>
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Excerpt</label>
            <textarea className={inputCls} rows={2} value={form.excerpt} onChange={set("excerpt")} placeholder="A one or two line summary shown on cards." />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Cover image</label>
            <div
              onClick={() => fileRef.current?.click()}
              className="flex cursor-pointer items-center gap-4 rounded-xl border border-dashed border-black/20 bg-cream px-4 py-5 transition hover:border-brand"
            >
              {preview ? (
                <img src={preview} alt="cover preview" className="h-20 w-28 rounded-lg object-cover" />
              ) : (
                <span className="flex h-20 w-28 items-center justify-center rounded-lg bg-cream-200 text-brand">
                  <UploadCloud className="h-7 w-7" />
                </span>
              )}
              <div className="text-sm">
                <p className="font-semibold text-ink">{cover ? cover.name : "Click to upload a cover image"}</p>
                <p className="text-neutral-500">PNG, JPG, WEBP up to 8MB</p>
              </div>
            </div>
            <input ref={fileRef} type="file" accept="image/*" onChange={onFile} className="hidden" />
          </div>

          <div>
            <label className="mb-2 block text-sm font-semibold text-ink">Content *</label>
            <textarea
              className={`${inputCls} font-mono text-sm`}
              rows={14}
              value={form.content}
              onChange={set("content")}
              placeholder={"Write your article here.\n\nLeave a blank line between paragraphs.\n\nYou can also paste raw HTML (<h2>, <p>, <ul>, <img>, <blockquote>…) for richer formatting."}
            />
            <p className="mt-2 text-xs text-neutral-500">
              Tip: blank lines become paragraphs. HTML tags are supported for headings, lists, images and quotes.
            </p>
          </div>

          {error && <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">{error}</p>}

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={busy}
              className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-3.5 text-base font-semibold text-white transition hover:bg-brand-600 disabled:opacity-60"
            >
              {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <UploadCloud className="h-4 w-4" />}
              {busy ? "Publishing…" : "Publish blog"}
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(empty);
                setCover(null);
                setPreview("");
              }}
              className="text-sm font-semibold text-neutral-500 hover:text-ink"
            >
              Reset
            </button>
          </div>
        </form>

        {/* Existing posts */}
        {blogs.length > 0 && (
          <div className="mt-14">
            <h2 className="text-xl font-semibold text-ink">Published articles ({blogs.length})</h2>
            <ul className="mt-5 divide-y divide-black/5 overflow-hidden rounded-2xl bg-white ring-1 ring-black/5">
              {blogs.map((b) => (
                <li key={b.id} className="flex items-center gap-4 px-5 py-4">
                  <img src={b.cover || "/hero.jpg"} alt="" className="h-12 w-16 rounded-md object-cover" />
                  <div className="min-w-0 flex-1">
                    <Link to={`/blog/${b.slug}`} className="block truncate font-semibold text-ink hover:text-brand">
                      {b.title}
                    </Link>
                    <span className="text-xs text-neutral-500">{formatDate(b.created_at)}</span>
                  </div>
                  <button
                    onClick={() => removeBlog(b.id)}
                    className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm text-neutral-400 transition hover:bg-red-50 hover:text-red-500"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </main>
  );
}
