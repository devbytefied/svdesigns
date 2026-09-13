"use client";

import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Image from "next/image";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section
      id="defender"
      aria-label="Defender 6x6"
      className="relative min-h-svh w-full bg-sv-black text-white"
    >
      <div className="absolute inset-0">
        <Image
          src="/desktop-view.jpeg"
          alt="SV Designs Defender 6x6 — exterior"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="hidden object-cover object-bottom lg:block"
        />
        <Image
          src="/mobile-view-new.jpeg"
          alt="SV Designs Defender 6x6 — exterior"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="md:object-cover lg:hidden"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="flex flex-col pb-5 items-center justify-center text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="uppercase text-shadow-2xs tracking-widest font-semibold "
          >
            Defender 6x6
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className=" text-white/70 flex text-shadow-2xs tracking-wide font-medium flex-col items-center "
          >
            <span className="relative pb-0.5">Discover</span>
            <ChevronDown  />
          </motion.h2>{" "}
        </div>
      </div>
    </section>
  );
}
