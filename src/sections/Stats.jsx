import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const STATS = [
  { value: "15+", caption: "Years Of Expertise In BIM Services" },
  { value: "200+", caption: "Successfully Projects Completed Worldwide" },
  { value: "150+", caption: "Architects & Engineers Ready To Support You" },
  { value: "1M+", caption: "Square Meters Of Projects Brought To Life" },
];

export default function Stats() {
  return (
    <section className="bg-rings-dark relative overflow-hidden bg-ink py-24">
      <div className="mx-auto max-w-7xl px-5 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mx-auto max-w-4xl text-center text-3xl font-semibold leading-tight text-white sm:text-4xl lg:text-5xl"
        >
          Experience Innovative BIM That Transforms{" "}
          <span className="text-brand">Your Vision To Reality</span>
        </motion.h2>

        <div className="mt-16 grid grid-cols-1 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className={`px-6 ${i !== 0 ? "lg:border-l lg:border-white/10" : ""}`}
            >
              <div className="text-6xl font-light text-white lg:text-7xl">{s.value}</div>
              <p className="mt-4 max-w-[16ch] text-base leading-snug text-neutral-400">
                {s.caption}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 flex justify-center">
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-600"
          >
            Get In Touch <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </div>
    </section>
  );
}
