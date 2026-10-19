import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({ children, className, delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0.7, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({ eyebrow, title, intro }: { eyebrow: string; title: string; intro: string }) {
  return (
    <Reveal className="grid gap-4 border-t pt-6 md:grid-cols-12 md:gap-8">
      <p className="eyebrow md:col-span-3">{eyebrow}</p>
      <div className="md:col-span-9">
        <h2 className="text-3xl sm:text-4xl md:text-5xl">{title}</h2>
        <p className="mt-4 max-w-2xl text-lg text-muted-foreground">{intro}</p>
      </div>
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
