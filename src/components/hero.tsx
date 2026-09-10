"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ChevronsDown } from "lucide-react";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

export function Hero() {
  return (
    <section
      id="defender"
      aria-label="Defender 6x6"
      className="relative h-[65svh] md:min-h-[100svh] w-full bg-sv-black text-white"
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
          src="/mobile-view.jpeg"
          alt="SV Designs Defender 6x6 — exterior"
          fill
          priority
          sizes="100vw"
          quality={85}
          className="object-cover object-bottom lg:hidden"
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0">
        <div className="flex flex-col gap-1 px-6 pb-5 md:flex-row md:items-end md:justify-between items-center md:gap-10 md:px-14 md:pb-20">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.35, ease: EASE }}
            className="text-base font-normal uppercase leading-[1.08] tracking-[0.12em] text-white  md:text-[clamp(1.6rem,3.4vw,3rem)]"
          >
            Defender <span className="md:hidden">6x6</span>
            <span className="md:block hidden">6x6</span>
          </motion.h1>
          <motion.a
            href="#discover"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className=" text-white flex flex-col items-center md:hidden"
          >
            <span className="relative pb-1.5">Discover</span>
            <ChevronsDown className="ml-2 inline h-4 w-4" />
          </motion.a>{" "}
          <motion.a
            href="#discover"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.55, ease: EASE }}
            className=" text-white md:block hidden"
          >
            <span className="relative pb-1.5">
              Discover
              <span className="absolute inset-x-0 bottom-0 h-px bg-white/30" />
              <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-white transition-transform duration-500 ease-out group-hover:scale-x-100" />
            </span>
            <ChevronsDown className="ml-2 inline h-4 w-4" />
          </motion.a>
        </div>
      </div>
    </section>
  );
}
