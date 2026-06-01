import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, PlusCircle } from "lucide-react";
import { listBlogs, formatDate } from "../lib/api";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    listBlogs()
      .then((data) => {
        setBlogs(data);
        setStatus("ready");
      })
      .catch(() => setStatus("error"));
  }, []);

  const [featured, ...rest] = blogs;

  return (
    <main>
      {/* Hero band */}
      <section className="bg-rings-dark bg-ink py-24">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <p className="text-sm font-semibold tracking-[0.3em] text-brand">OBELISK INSIGHTS</p>
          <h1 className="mt-4 max-w-3xl text-4xl font-semibold leading-tight text-white sm:text-5xl lg:text-6xl">
            The BIM Blog —{" "}
            <span className="text-brand">Ideas, Workflows & Industry Notes</span>
          </h1>
          <div className="mt-8">
            <Link
              to="/admin"
              className="inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white transition hover:bg-brand-600"
            >
              <PlusCircle className="h-4 w-4" /> Upload a blog
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-cream py-20">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          {status === "loading" && <p className="text-neutral-500">Loading articles…</p>}

          {status === "error" && (
            <div className="rounded-2xl bg-cream-200 p-8 text-center">
              <p className="text-lg font-semibold text-ink">Couldn’t load articles.</p>
              <p className="mt-2 text-neutral-600">
                The blog API isn’t ready yet. On Vercel, connect a{" "}
                <strong>Postgres</strong> database and a <strong>Blob</strong> store to the project,
                then redeploy. Locally, run <code className="rounded bg-black/5 px-1.5 py-0.5">vercel dev</code>.
              </p>
            </div>
          )}

          {status === "ready" && blogs.length === 0 && (
            <div className="rounded-2xl bg-cream-200 p-12 text-center">
              <p className="text-xl font-semibold text-ink">No articles yet.</p>
              <p className="mt-2 text-neutral-600">Be the first to publish one.</p>
              <Link
                to="/admin"
                className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
              >
                <PlusCircle className="h-4 w-4" /> Upload a blog
              </Link>
            </div>
          )}

          {status === "ready" && featured && (
            <Link
              to={`/blog/${featured.slug}`}
              className="group grid grid-cols-1 gap-8 overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-black/5 lg:grid-cols-2"
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto">
                <img
                  src={featured.cover || "/hero.jpg"}
                  alt={featured.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <div className="flex flex-col justify-center p-8 lg:p-12">
                <div className="flex items-center gap-3 text-sm text-neutral-500">
                  <span className="rounded-full bg-brand/10 px-3 py-1 font-semibold text-brand">
                    Featured
                  </span>
                  <span>{formatDate(featured.created_at)}</span>
                </div>
                <h2 className="mt-5 text-3xl font-semibold leading-tight text-ink">
                  {featured.title}
                </h2>
                {featured.excerpt && (
                  <p className="mt-4 text-neutral-600">{featured.excerpt}</p>
                )}
                <span className="mt-6 inline-flex items-center gap-2 font-semibold text-brand">
                  Read article <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {rest.map((b) => (
                <Link
                  key={b.id}
                  to={`/blog/${b.slug}`}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-black/5"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={b.cover || "/hero.jpg"}
                      alt={b.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  </div>
                  <div className="flex flex-1 flex-col p-6">
                    <span className="text-xs text-neutral-500">{formatDate(b.created_at)}</span>
                    <h3 className="mt-2 text-lg font-semibold leading-snug text-ink">{b.title}</h3>
                    {b.excerpt && (
                      <p className="mt-3 line-clamp-3 text-sm text-neutral-600">{b.excerpt}</p>
                    )}
                    <span className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-semibold text-brand">
                      Read more <ArrowRight className="h-3.5 w-3.5 transition group-hover:translate-x-1" />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
}
