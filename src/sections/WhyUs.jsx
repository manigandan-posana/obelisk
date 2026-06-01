import { motion } from "framer-motion";
import { Boxes, Ruler, LayoutGrid, Globe } from "lucide-react";

const ITEMS = [
  {
    icon: Boxes,
    title: "15 Years of Specialized Experience",
    body: "Eliminate workflow delays. We handle technical execution while you maintain creative momentum.",
  },
  {
    icon: Ruler,
    title: "BIM-Savvy Professionals",
    body: "Architects and engineers who understand design standards. We ensure compliance with your specific requirements and protocols.",
  },
  {
    icon: LayoutGrid,
    title: "Customized Solutions",
    body: "Tailored to your project's scale, complexity, and timeline. No cookie-cutter approaches—every solution fits your unique needs.",
  },
  {
    icon: Globe,
    title: "Time Zone Advantage",
    body: "24×5 work cycle keeps your projects moving forward. Submit work at day's end and receive updates by morning.",
  },
];

export default function WhyUs() {
  return (
    <section id="why" className="bg-cream py-24">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-x-6 gap-y-12 px-5 sm:grid-cols-2 lg:grid-cols-4 lg:px-8">
        {ITEMS.map((it, i) => (
          <motion.div
            key={it.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
            className={`px-2 lg:px-7 ${i !== 0 ? "lg:border-l lg:border-black/15" : ""} lg:mt-[var(--stagger)]`}
            style={{ "--stagger": `${i * 56}px` }}
          >
            <it.icon className="h-9 w-9 text-brand" strokeWidth={1.5} />
            <h3 className="mt-7 text-lg font-semibold leading-snug text-ink">{it.title}</h3>
            <p className="mt-4 text-[15px] leading-relaxed text-neutral-600">{it.body}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
