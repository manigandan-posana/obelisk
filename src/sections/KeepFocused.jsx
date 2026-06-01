import { motion } from "framer-motion";
import { Workflow, Users, PenTool, TrendingUp, ArrowRight } from "lucide-react";

const CARDS = [
  {
    icon: Workflow,
    title: "Fewer Bottlenecks",
    body: "Eliminate workflow delays. We handle technical execution while you maintain creative momentum.",
  },
  {
    icon: Users,
    title: "Staffing Agility",
    body: "Scale your capability instantly. No hiring hassles or training overhead required.",
  },
  {
    icon: PenTool,
    title: "Focus On Design",
    body: "Stay in your creative zone. Leave BIM complexities to our specialized team.",
  },
  {
    icon: TrendingUp,
    title: "Take On More Work",
    body: "Expand your project pipeline confidently. We provide the bandwidth you need.",
  },
];

export default function KeepFocused() {
  return (
    <section id="about" className="bg-cream py-20 lg:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-12 px-5 lg:grid-cols-2 lg:px-8">
        {/* Left: heading + image */}
        <div>
          <h2 className="text-4xl font-semibold leading-tight text-ink sm:text-5xl">
            Keep Your Team Focused
            <br />
            <span className="text-brand">While We Own BIM</span>
          </h2>
          <motion.img
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            src="/image4.jpg"
            alt="BIM architectural model"
            className="mt-10 h-[420px] w-full rounded-3xl object-cover shadow-xl"
          />
        </div>

        {/* Right: cards */}
        <div className="flex flex-col">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {CARDS.map((c, i) => (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className={`rounded-2xl bg-cream-200 p-7 ${i % 2 === 1 ? "sm:mt-10" : ""}`}
              >
                <c.icon className="h-8 w-8 text-brand" strokeWidth={1.6} />
                <h3 className="mt-6 text-xl font-semibold text-ink">{c.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-neutral-600">{c.body}</p>
              </motion.div>
            ))}
          </div>
          <div className="mt-8 flex sm:justify-end">
            <a
              href="#contact"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-brand px-8 py-4 text-base font-semibold text-white transition hover:bg-brand-600 max-sm:w-full"
            >
              Get In Touch <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
