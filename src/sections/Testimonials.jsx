import { motion } from "framer-motion";

const ITEMS = [
  {
    title: "Global Perspective, Higher Design Quality",
    quote:
      "We have been collaborating over the last several years with obelisk's graduate architects as part of our extended studio structure. This integration has leveraged experience across different markets and global design contexts, enhancing both our design outcomes and overall deliverable quality. We would confidently recommend engaging obelisk for complex projects.",
    role: "Partner – Senior Architect",
    org: "Award-Winning Architecture Firm",
  },
  {
    title: "Technical Expertise That Drives Productivity",
    quote:
      "obelisk has consistently demonstrated strong technical expertise, creativity, and a proactive approach across our collaborative projects. Their timely turnaround of drawings and clear understanding of workflows have contributed to measurable productivity improvements within our studio.",
    role: "Design Lead",
    org: "Large Architecture Practice",
  },
  {
    title: "Clear Communication, Strong Delivery",
    quote:
      "Our experience with obelisk on commercial fit-out projects has been excellent. They quickly understood our standards and deliverables, and communication has always been clear and timely. It's been refreshing to work with a team that combines strong technical skills with a genuinely collaborative attitude.",
    role: "Project Manager",
    org: "Mid-Sized Architecture Studio",
  },
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="bg-ink py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <h2 className="text-center text-4xl font-semibold leading-tight text-white sm:text-5xl">
          What Our
          <br />
          <span className="text-brand">Clients Say</span>
        </h2>

        <div className="mt-16 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {ITEMS.map((t, i) => (
            <motion.figure
              key={t.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="flex flex-col rounded-2xl bg-ink-800/80 p-8 ring-1 ring-white/5"
            >
              <h3 className="text-center text-xl font-semibold leading-snug text-brand">
                {t.title}
              </h3>
              <blockquote className="mt-6 flex-1 text-center text-[15px] leading-relaxed text-neutral-300">
                {t.quote}
              </blockquote>
              <figcaption className="mt-8 text-center">
                <div className="font-semibold text-brand">{t.role}</div>
                <div className="mt-1 text-sm text-neutral-400">{t.org}</div>
              </figcaption>
            </motion.figure>
          ))}
        </div>
      </div>
    </section>
  );
}
