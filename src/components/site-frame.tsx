"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type ReactNode } from "react";

const INSTAGRAM_URL = "https://www.instagram.com/svdesignsinc/";
const EMAIL = "INFO@SVDESIGNS.COM";
const EMAIL_HREF = "mailto:info@svdesigns.com";

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1];

const menuLinks = [
  { label: "Defender 6x6", href: "/#defender" },
  { label: "Discover", href: "/#discover" },
  { label: "Contact", href: "/#contact" },
];

function Menu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const linkRefs = useRef<(HTMLAnchorElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    linkRefs.current[0]?.focus();
    return () => {
      window.removeEventListener("keydown", onKey);
      previouslyFocused?.focus();
    };
  }, [open, onClose]);

  useEffect(() => {
    document.documentElement.style.overflow = open ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  const overlay: Variants = {
    hidden: { clipPath: "inset(0% 0% 100% 0%)" },
    open: {
      clipPath: "inset(0% 0% 0% 0%)",
      transition: { duration: 0.6, ease: EASE },
    },
    exit: {
      clipPath: "inset(0% 0% 100% 0%)",
      transition: { duration: 0.45, ease: EASE },
    },
  };

  const item: Variants = {
    hidden: { opacity: 0, y: 24 },
    open: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: { delay: 0.15 + i * 0.09, duration: 0.7, ease: EASE },
    }),
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          key="menu"
          initial="hidden"
          animate="open"
          exit="exit"
          variants={overlay}
          role="dialog"
          aria-label="Menu"
          className="fixed inset-0 z-[60] bg-sv-black text-white"
        >
          <nav
            aria-label="Primary"
            className="flex h-full flex-col justify-between px-6 pb-12 pt-32 md:px-14 md:pb-20 md:pt-40"
          >
            <ul className="flex flex-col">
              {menuLinks.map((link, i) => (
                <motion.li
                  key={link.label}
                  custom={i}
                  variants={item}
                  initial="hidden"
                  animate="open"
                >
                  <Link
                    ref={(el) => {
                      linkRefs.current[i] = el;
                    }}
                    href={link.href}
                    onClick={onClose}
                    className="group flex items-baseline gap-5 border-b border-white/12 py-5 md:py-6"
                  >
                    <span className="text-[10px] tracking-[0.3em] text-white/35">
                      {`0${i + 1}`}
                    </span>
                    <span className="text-[clamp(2rem,4.6vw,4rem)] font-normal leading-none tracking-[-0.01em] text-white transition-transform duration-500 ease-out group-hover:translate-x-2">
                      {link.label}
                    </span>
                  </Link>
                </motion.li>
              ))}
            </ul>

            <motion.div
              initial="hidden"
              animate="open"
              variants={item}
              custom={3}
              className="flex flex-col justify-between gap-12 md:flex-row md:items-end"
            >
              <div className="flex flex-col gap-4">
                <a
                  href={EMAIL_HREF}
                  className="text-sm tracking-[0.08em] text-white/85 transition-colors hover:text-white"
                >
                  {EMAIL}
                </a>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[10px] uppercase tracking-[0.3em] text-white/60 transition-colors hover:text-white"
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    className="h-4 w-4"
                    aria-hidden="true"
                  >
                    <rect x="3" y="3" width="18" height="18" rx="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" stroke="none" />
                  </svg>
                  Instagram
                </a>
              </div>
              <Image
                src="/svdesignsnywhitelogo.png"
                alt="SV Designs New York"
                width={1937}
                height={488}
                className="w-44 md:w-60"
              />
            </motion.div>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Header({ open, onToggle }: { open: boolean; onToggle: () => void }) {
  return (
    <header className="absolute inset-x-0 top-0 z-[70] px-6 py-6 text-white md:px-14 md:py-8">
      <div className="relative flex items-center justify-between">
        <button
          type="button"
          onClick={onToggle}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          aria-controls="site-menu"
          className="flex h-10 w-10 rounded-full items-center justify-center  backdrop-blur-md"
        >
          <span className="relative block h-3 w-6" aria-hidden="true">
            <span
              className={`absolute left-0 top-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "translate-y-[5.5px] rotate-45" : ""
              }`}
            />
            <span
              className={`absolute bottom-0 left-0 block h-px w-6 bg-current transition-transform duration-300 ${
                open ? "-translate-y-[5.5px] -rotate-45" : ""
              }`}
            />
          </span>
        </button>

        <Link
          href="/"
          aria-label="SV Designs — Home"
          className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 ${
            open ? "hidden" : ""
          }`}
        >
          <Image
            src="/logo.svg"
            alt="SV Designs"
            width={1800}
            height={340}
            unoptimized
            priority
            style={{ filter: "brightness(0) invert(1) drop-shadow(0 2px 8px rgba(0,0,0,0.5))" }}
            className="h-6 w-auto md:h-7"
          />
        </Link>

        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Instagram"
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 backdrop-blur-md text-current transition-opacity hover:opacity-60"
        >
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            className="h-5 w-5"
            aria-hidden="true"
          >
            <rect x="3" y="3" width="18" height="18" rx="5" />
            <circle cx="12" cy="12" r="4" />
            <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" stroke="none" />
          </svg>
        </a>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="bg-sv-black text-white">
      <div className="px-6 py-16 md:px-14 md:py-24">
        <div className="flex flex-col items-center border-t border-white/12 pt-14">
          <Image
            src="/svdesignsnywhitelogo.png"
            alt="SV Designs New York"
            width={1937}
            height={488}
            className="w-56 md:w-72"
          />
          <p className="mt-8 text-center text-[9px] font-normal uppercase tracking-[0.4em] text-white/40">
            Defender 6x6 — SV Designs Inc., New York
          </p>
        </div>
        <div className="mt-16 flex flex-col gap-5 border-t border-white/12 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="text-[9px] font-normal uppercase tracking-[0.35em] text-white/45">
            © SV Designs Inc.
          </p>
          <div className="flex flex-wrap items-center gap-x-8 gap-y-3 text-[9px] font-normal uppercase tracking-[0.3em] text-white/55">
            <a
              href={EMAIL_HREF}
              className="normal-case leading-none tracking-[0.06em] transition-colors hover:text-white"
            >
              info@svdesigns.com
            </a>
            <a
              href={INSTAGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 transition-colors hover:text-white"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                className="h-3.5 w-3.5"
                aria-hidden="true"
              >
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.2" cy="6.8" r="0.4" fill="currentColor" stroke="none" />
              </svg>
              Instagram
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function SiteFrame({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);

  const closeMenu = useCallback(() => setOpen(false), []);
  const toggleMenu = useCallback(() => setOpen((v) => !v), []);

  return (
    <div className="bg-paper overflow-x-clip font-sans text-ink">
      <Header open={open} onToggle={toggleMenu} />
      <Menu open={open} onClose={closeMenu} />
      {children}
      <Footer />
    </div>
  );
}