import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowRight, Menu, X } from "lucide-react";

const LINKS = [
  { label: "ABOUT US", to: "/#about" },
  { label: "OUR SERVICES", to: "/#services" },
  { label: "WHY US", to: "/#why" },
  { label: "TESTIMONIALS", to: "/#testimonials" },
  { label: "BLOGS", to: "/blog" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-black/5 bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-5 lg:px-8">
        {/* Brand */}
        <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
          <img
            src="/logo.png"
            alt="Obelisk BIM Consulting"
            className="h-11 w-auto object-contain"
          />
          <span className="leading-none">
            <span className="block text-xl font-extrabold tracking-[0.18em] text-ink">OBELISK</span>
            <span className="block text-[10px] font-medium tracking-[0.35em] text-neutral-500">
              BIM CONSULTING
            </span>
          </span>
        </Link>

        {/* Desktop links */}
        <nav className="hidden items-center gap-8 lg:flex">
          {LINKS.map((l) => {
            const active = l.to === "/blog" && pathname.startsWith("/blog");
            return l.to === "/blog" ? (
              <Link
                key={l.label}
                to={l.to}
                className={`text-[13px] font-semibold tracking-wide transition hover:text-brand ${
                  active ? "text-brand" : "text-ink"
                }`}
              >
                {l.label}
              </Link>
            ) : (
              <a
                key={l.label}
                href={l.to}
                className="text-[13px] font-semibold tracking-wide text-ink transition hover:text-brand"
              >
                {l.label}
              </a>
            );
          })}
        </nav>

        {/* CTA */}
        <a
          href="/#contact"
          className="hidden items-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-brand-600 lg:inline-flex"
        >
          Get In Touch <ArrowRight className="h-4 w-4" />
        </a>

        {/* Mobile toggle */}
        <button
          aria-label="Toggle menu"
          className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-black/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile panel */}
      {open && (
        <div className="border-t border-black/5 bg-white px-5 pb-6 pt-2 lg:hidden">
          <nav className="flex flex-col">
            {LINKS.map((l) =>
              l.to === "/blog" ? (
                <Link
                  key={l.label}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/5 py-3 text-sm font-semibold text-ink"
                >
                  {l.label}
                </Link>
              ) : (
                <a
                  key={l.label}
                  href={l.to}
                  onClick={() => setOpen(false)}
                  className="border-b border-black/5 py-3 text-sm font-semibold text-ink"
                >
                  {l.label}
                </a>
              )
            )}
            <a
              href="/#contact"
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center gap-2 rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white"
            >
              Get In Touch <ArrowRight className="h-4 w-4" />
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
