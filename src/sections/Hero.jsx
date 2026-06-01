import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SLIDES = ["/hero.jpg", "/image2.jpg", "/image4.jpg", "/image8.jpg", "/image9.jpg", "/image6.jpg"];

export default function Hero() {
  const [i, setI] = useState(0);

  useEffect(() => {
    const t = setInterval(() => setI((v) => (v + 1) % SLIDES.length), 5000);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="home" className="relative h-[88vh] min-h-[560px] w-full overflow-hidden">
      {/* Background slides */}
      <AnimatePresence>
        <motion.img
          key={i}
          src={SLIDES[i]}
          alt="Architectural BIM project"
          className="absolute inset-0 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.2 }, scale: { duration: 6, ease: "linear" } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/45 to-black/25" />

      {/* Copy */}
      <div className="relative mx-auto flex h-full max-w-7xl flex-col justify-center px-5 lg:px-8">
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-3xl text-4xl font-semibold leading-[1.08] text-white sm:text-5xl lg:text-6xl"
        >
          BIM Services That Feel Like A True Extension of Your Team
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="mt-6 max-w-xl text-lg leading-relaxed text-white/85"
        >
          Your Trusted Project Delivery Partner For AEC Firms Globally.
          <br className="hidden sm:block" /> We Seamlessly Integrate With Your Workflow.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-10"
        >
          <a
            href="#services"
            className="inline-flex items-center rounded-full bg-brand px-8 py-4 text-base font-semibold text-white shadow-lg transition hover:bg-brand-600"
          >
            Our Services
          </a>
        </motion.div>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-8 right-6 flex items-center gap-2 lg:right-10">
        {SLIDES.map((_, idx) => (
          <button
            key={idx}
            aria-label={`Slide ${idx + 1}`}
            onClick={() => setI(idx)}
            className={`h-1.5 rounded-full transition-all ${
              idx === i ? "w-10 bg-brand" : "w-6 bg-white/40 hover:bg-white/70"
            }`}
          />
        ))}
      </div>
    </section>
  );
}
