import { useRef, useState } from "react";

const SERVICES = [
  {
    n: "01",
    title: "3D BIM Coordination & Clash Detection",
    img: "/image1.jpg",
    body: "Federate models across disciplines and resolve clashes early. Fewer RFIs, smoother approvals, and a cleaner path to construction.",
  },
  {
    n: "02",
    title: "BIM Modeling & Documentation",
    img: "/image7.jpg",
    body: "Complete project delivery support from concept to construction. Detailed models and accurate documentation every time.",
  },
  {
    n: "03",
    title: "Existing Conditions - Scan To BIM",
    img: "/image3.jpg",
    body: "Transform laser scans into precise digital models. Capture existing structures with millimeter accuracy.",
  },
  {
    n: "04",
    title: "4D / 5D BIM Simulation",
    img: "/image8.jpg",
    body: "Link geometry to programme and cost. Stress-test sequencing and logistics before anyone steps on site.",
  },
  {
    n: "05",
    title: "Revit Family & Content Creation",
    img: "/image5.jpg",
    body: "Lightweight, parametric, standard-compliant families and content libraries built for real project use.",
  },
];

export default function ServicesSlider() {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const scrollTo = (idx) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.children[idx];
    if (card) track.scrollTo({ left: card.offsetLeft - 8, behavior: "smooth" });
    setActive(idx);
  };

  const onScroll = () => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children);
    const center = track.scrollLeft + track.clientWidth / 2;
    let best = 0;
    let bestDist = Infinity;
    cards.forEach((c, i) => {
      const cc = c.offsetLeft + c.clientWidth / 2;
      const d = Math.abs(cc - center);
      if (d < bestDist) {
        bestDist = d;
        best = i;
      }
    });
    setActive(best);
  };

  return (
    <section id="services" className="bg-rings-dark overflow-hidden bg-ink py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl">
          Comprehensive BIM Services
          <br />
          <span className="text-brand">Tailored To Your Needs</span>
        </h2>
      </div>

      <div
        ref={trackRef}
        onScroll={onScroll}
        className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto px-5 pb-2 lg:px-8"
      >
        {SERVICES.map((s) => (
          <article
            key={s.n}
            className="flex w-[88vw] max-w-[680px] shrink-0 snap-center flex-col gap-6 rounded-3xl bg-ink-800 p-5 sm:flex-row sm:items-center"
          >
            <img
              src={s.img}
              alt={s.title}
              className="h-56 w-full rounded-2xl object-cover sm:h-72 sm:w-1/2"
            />
            <div className="sm:w-1/2 sm:pr-4">
              <div className="flex items-center gap-3 text-brand">
                <span className="text-sm font-semibold">{s.n}</span>
                <span className="h-px w-10 bg-brand/60" />
              </div>
              <h3 className="mt-4 text-xl font-bold uppercase leading-snug text-brand">
                {s.title}
              </h3>
              <p className="mt-4 text-[15px] leading-relaxed text-neutral-300">{s.body}</p>
            </div>
          </article>
        ))}
      </div>

      {/* Indicators */}
      <div className="mt-10 flex items-center justify-center gap-2">
        {SERVICES.map((_, i) => (
          <button
            key={i}
            aria-label={`Service ${i + 1}`}
            onClick={() => scrollTo(i)}
            className={`h-1 rounded-full transition-all ${
              i === active ? "w-8 bg-brand" : "w-5 bg-white/25 hover:bg-white/50"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
