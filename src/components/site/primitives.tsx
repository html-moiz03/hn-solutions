import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string | undefined; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.4, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, intro, dark = false }: { eyebrow: string; title: string; intro?: string; dark?: boolean }) {
  return (
    <Reveal className="max-w-3xl">
      <p className={`eyebrow flex items-center gap-3 ${dark ? "text-white/60" : ""}`}><span className="h-px w-6 bg-current opacity-40" aria-hidden="true" />{eyebrow}</p>
      <h2 className={`mt-4 text-4xl sm:text-5xl md:text-[3.25rem] ${dark ? "text-white" : ""}`}>{title}</h2>
      {intro && <p className={`mt-5 max-w-2xl text-lg ${dark ? "text-white/70" : "text-muted-foreground"}`}>{intro}</p>}
    </Reveal>
  );
}

export function Glyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 16 16" className={className} aria-hidden="true">
      {[3, 9, 6, 12].map((h, i) => (
        <rect key={i} x={1 + i * 4} y={(16 - h) / 2} width="2" height={h} rx="1" fill="currentColor" />
      ))}
    </svg>
  );
}
