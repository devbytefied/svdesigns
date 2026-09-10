"use client";

import { motion } from "framer-motion";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Discover() {
  return (
    <section
      id="discover"
      aria-label="Discover"
      className="scroll-mt-24 bg-sv-black text-white"
    >
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, ease: EASE }}
        className="flex flex-col gap-16 px-6 py-32 md:gap-24 md:px-14 md:py-56"
      >
        <p className="flex items-center gap-4 text-[9px] font-normal uppercase tracking-[0.42em] text-white/60">
          <span className="h-px w-10 bg-current opacity-70" />
          Discover
        </p>

        <h2 className="max-w-4xl text-[clamp(2.5rem,6vw,5.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-white">
          Six wheels. One silhouette.
          <br />
          Built one at a time.
        </h2>

        <a
          href="#contact"
          className="group inline-flex w-fit items-center gap-5 text-[10px] font-normal uppercase tracking-[0.42em] text-white"
        >
          <span className="relative pb-2">
            Discover
            <span className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
            <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
          </span>
          <span
            aria-hidden="true"
            className="text-sm leading-none transition-transform duration-500 ease-out group-hover:translate-x-1"
          >
            →
          </span>
        </a>
      </motion.div>
    </section>
  );
}