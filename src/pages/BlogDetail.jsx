import { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, Trash2 } from "lucide-react";
import { getBlog, deleteBlog, formatDate } from "../lib/api";

// Render authored content. If it already contains block-level HTML we trust it
// (authored by the site owner); otherwise convert blank-line paragraphs to <p>.
function renderContent(content) {
  const hasHtml = /<(p|h[1-6]|ul|ol|li|blockquote|img|figure|br|div)\b/i.test(content);
  if (hasHtml) return content;
  return content
    .split(/\n{2,}/)
    .map((p) => `<p>${p.replace(/\n/g, "<br/>")}</p>`)
    .join("");
}

export default function BlogDetail() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    setStatus("loading");
    getBlog(slug)
      .then((data) => {
        setBlog(data);
        setStatus(data ? "ready" : "missing");
      })
      .catch(() => setStatus("error"));
  }, [slug]);

  const onDelete = async () => {
    if (!window.confirm("Delete this article permanently?")) return;
    await deleteBlog(blog.id);
    navigate("/blog");
  };

  if (status === "loading")
    return <div className="mx-auto max-w-3xl px-5 py-32 text-neutral-500">Loading…</div>;

  if (status === "missing")
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center">
        <h1 className="text-3xl font-semibold text-ink">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-block font-semibold text-brand">
          ← Back to all articles
        </Link>
      </div>
    );

  if (status === "error")
    return (
      <div className="mx-auto max-w-3xl px-5 py-32 text-center text-neutral-600">
        Couldn’t load this article. Is the backend running?
      </div>
    );

  return (
    <article>
      {/* Cover */}
      <header className="relative">
        <div className="h-[46vh] min-h-[320px] w-full overflow-hidden bg-ink">
          {blog.cover && (
            <img src={blog.cover} alt={blog.title} className="h-full w-full object-cover opacity-80" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-black/20" />
        </div>
        <div className="absolute inset-0">
          <div className="mx-auto flex h-full max-w-3xl flex-col justify-end px-5 pb-10">
            {blog.tags?.length > 0 && (
              <div className="mb-4 flex flex-wrap gap-2">
                {blog.tags.map((t) => (
                  <span key={t} className="rounded-full bg-brand px-3 py-1 text-xs font-semibold text-white">
                    {t}
                  </span>
                ))}
              </div>
            )}
            <h1 className="text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
              {blog.title}
            </h1>
            <p className="mt-4 text-white/80">
              By {blog.author} · {formatDate(blog.created_at)}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-3xl px-5 py-14">
        <div className="mb-8 flex items-center justify-between">
          <Link to="/blog" className="inline-flex items-center gap-2 font-semibold text-brand">
            <ArrowLeft className="h-4 w-4" /> All articles
          </Link>
          <button
            onClick={onDelete}
            className="inline-flex items-center gap-1.5 text-sm text-neutral-400 transition hover:text-red-500"
            title="Delete article"
          >
            <Trash2 className="h-4 w-4" /> Delete
          </button>
        </div>

        {blog.excerpt && (
          <p className="mb-8 border-l-4 border-brand pl-5 text-xl leading-relaxed text-neutral-700">
            {blog.excerpt}
          </p>
        )}

        <div
          className="blog-prose"
          dangerouslySetInnerHTML={{ __html: renderContent(blog.content) }}
        />
      </div>
    </article>
  );
}
