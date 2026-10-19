import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, ArrowUpRight, Check, Copy } from "lucide-react";
import { CONTACT, hero, partnership, services, standards, steps, team, ticker } from "@/content/site";
import { Glyph, Reveal, SectionHead } from "./primitives";
import { LineBoard } from "./LineBoard";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (e: Element, o: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -72 });
  else el.scrollIntoView({ behavior: "smooth" });
}

function NavLink({ id, children }: { id: string; children: string }) {
  return (
    <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }} className="text-sm text-muted-foreground transition-colors hover:text-foreground">
      {children}
    </a>
  );
}

export function Nav() {
  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <nav className="container-site flex h-16 items-center justify-between" aria-label="Main">
        <a href="#top" onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0 }); }} className="flex items-center gap-2 font-display text-lg font-bold [font-stretch:115%]">
          <Glyph className="h-4 w-4 text-signal" /> HN Solutions
        </a>
        <div className="flex items-center gap-8">
          <div className="hidden items-center gap-7 md:flex">
            <NavLink id="services">Services</NavLink>
            <NavLink id="process">Process</NavLink>
            <NavLink id="team">Team</NavLink>
            <NavLink id="standards">Standards</NavLink>
          </div>
          <a href="#contact" onClick={(e) => { e.preventDefault(); scrollToId("contact"); }} className="btn btn-outline h-9 text-sm">Contact</a>
        </div>
      </nav>
    </header>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 18 },
    show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return (
    <section id="top" className="relative overflow-hidden">
      <div className="halftone pointer-events-none absolute inset-0 opacity-50" aria-hidden="true" />
      <div className="container-site relative grid items-center gap-12 py-16 md:py-24 lg:grid-cols-12">
        <motion.div className="lg:col-span-7" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={item} className="eyebrow flex items-center gap-2">
            <span className="h-1.5 w-1.5 rounded-full bg-signal" /> {hero.eyebrow}
          </motion.p>
          <motion.h1 variants={item} className="mt-6 text-[2.4rem] sm:text-5xl lg:text-[4.1rem]">{hero.title}</motion.h1>
          <motion.p variants={item} className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">{hero.lede}</motion.p>
          <motion.div variants={item} className="mt-9 flex flex-wrap gap-3">
            <button onClick={() => scrollToId("process")} className="btn btn-signal group">
              See how a sale moves <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button onClick={() => scrollToId("contact")} className="btn btn-outline">Get in touch</button>
          </motion.div>
        </motion.div>
        <motion.div
          className="lg:col-span-5"
          initial={reduce ? false : { opacity: 0, y: 30, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        >
          <LineBoard />
        </motion.div>
      </div>
    </section>
  );
}

export function Ticker() {
  const items = [...ticker, ...ticker];
  return (
    <div className="overflow-hidden border-y bg-card py-3" aria-label={ticker.join(", ")}>
      <div className="marquee-track flex w-max" aria-hidden="true">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0">
            {items.map((t, i) => (
              <span key={`${k}-${i}`} className="eyebrow flex items-center gap-6 pr-6 text-foreground">
                {t} <span className="h-1 w-1 rounded-full bg-signal" />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export function Services() {
  const spans = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];
  return (
    <section id="services" className="container-site scroll-mt-20 py-20 md:py-28">
      <SectionHead eyebrow="01 · Services" title="What the team handles" intro="One team covers the calls, the checks and the paperwork around them." />
      <div className="mt-12 grid gap-4 md:grid-cols-12">
        {services.map((s, i) => (
          <Reveal key={s.title} delay={i * 0.06} className={spans[i]}>
            <article className="group relative flex h-full flex-col rounded-md border bg-card p-6 transition-transform duration-300 hover:-translate-y-1 sm:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span className={`rounded-sm border px-2 py-0.5 font-mono text-[0.65rem] uppercase tracking-[0.12em] ${s.tag === "Closers" ? "text-signal" : "text-ok"}`}>{s.tag}</span>
              </div>
              <h3 className="mt-10 inline-flex items-center gap-2 text-2xl sm:text-3xl">
                <span className="relative">
                  {s.title}
                  <span className="absolute -bottom-1 left-0 h-[2px] w-full origin-left scale-x-0 bg-signal transition-transform duration-300 group-hover:scale-x-100" />
                </span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-signal" />
              </h3>
              <p className="mt-4 max-w-lg text-muted-foreground">{s.body}</p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Step({ i, title, body, progress }: { i: number; title: string; body: string; progress: number }) {
  const lit = progress >= (i + 0.3) / steps.length;
  return (
    <li className="relative grid gap-2 pb-12 pl-12 last:pb-0 md:grid-cols-12 md:gap-8">
      <span className={`absolute left-[9px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-colors duration-300 ${lit ? "border-signal bg-signal" : "border-border bg-background"}`} />
      <p className="eyebrow md:col-span-2">Step {String(i + 1).padStart(2, "0")}</p>
      <div className="md:col-span-10">
        <h3 className="text-2xl">{title}</h3>
        <p className="mt-2 max-w-2xl text-muted-foreground">{body}</p>
      </div>
    </li>
  );
}

export function Process() {
  const ref = useRef<HTMLOListElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 55%"] });
  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 30 });
  const scaleY = useTransform(smooth, (v) => (reduce ? 1 : v));
  const [p, setP] = useState(reduce ? 1 : 0);
  useMotionValueEvent(scrollYProgress, "change", (v) => !reduce && setP(v));
  return (
    <section id="process" className="container-site scroll-mt-20 py-20 md:py-28">
      <SectionHead eyebrow="02 · Process" title="How a sale moves through our line" intro="Six steps from the first dial to the weekly report." />
      <ol ref={ref} className="relative mt-14">
        <span className="absolute bottom-2 left-4 top-2 w-px bg-border" aria-hidden="true" />
        <motion.span style={{ scaleY }} className="absolute bottom-2 left-4 top-2 w-px origin-top bg-signal" aria-hidden="true" />
        {steps.map((s, i) => <Step key={s.title} i={i} {...s} progress={reduce ? 1 : p} />)}
      </ol>
    </section>
  );
}

export function Team() {
  return (
    <section id="team" className="container-site scroll-mt-20 py-20 md:py-28">
      <SectionHead eyebrow="03 · Team" title="Four partners, one line" intro="Three closers on the phones and one operator behind them. All four own the company." />
      <ul className="mt-12 grid border-l border-t sm:grid-cols-2 lg:grid-cols-4">
        {team.map((m, i) => (
          <Reveal key={m.name} delay={i * 0.06} className="border-b border-r">
            <li className="group h-full bg-card p-6 sm:p-8">
              <div className="flex h-16 w-16 items-center justify-center rounded-full border border-foreground font-display text-xl font-bold transition-colors duration-300 group-hover:border-signal group-hover:bg-signal group-hover:text-signal-foreground">
                {m.name[0]}
              </div>
              <h3 className="mt-6 text-2xl">{m.name}</h3>
              <p className="eyebrow mt-2">{m.role}</p>
              <p className="mt-4 text-muted-foreground">{m.body}</p>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Standards() {
  return (
    <section id="standards" className="container-site scroll-mt-20 py-20 md:py-28">
      <SectionHead eyebrow="04 · Standards" title="How we work" intro="The rules we hold ourselves to on every campaign." />
      <ul className="mt-12 grid gap-x-10 md:grid-cols-2">
        {standards.map((s, i) => (
          <Reveal key={s.title} delay={(i % 2) * 0.06}>
            <li className="flex gap-4 border-b py-6">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-ok text-ok">
                <Check className="h-3.5 w-3.5" strokeWidth={3} />
              </span>
              <div>
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{s.body}</p>
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </section>
  );
}

export function Partnership() {
  const cols = [
    { title: "We bring", items: partnership.bring, marker: "bg-ok" },
    { title: "We need from a partner", items: partnership.need, marker: "bg-signal" },
  ];
  return (
    <section className="container-site py-20 md:py-28">
      <SectionHead eyebrow="05 · Partnership" title="What we bring and what we need" intro="Terms are discussed directly, on a call or by email." />
      <div className="mt-12 grid gap-4 md:grid-cols-2">
        {cols.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.08}>
            <div className="h-full rounded-md border bg-card p-6 sm:p-8">
              <h3 className="text-2xl">{c.title}</h3>
              <ul className="mt-6">
                {c.items.map((t) => (
                  <li key={t} className="flex items-start gap-3 border-t py-4">
                    <span className={`mt-2 h-1.5 w-1.5 shrink-0 rounded-full ${c.marker}`} />
                    <span>{t}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function CopyRow({ label, value }: { label: string; value: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <li className="flex flex-wrap items-center justify-between gap-3 border-b py-5">
      <div className="min-w-0">
        <p className="eyebrow">{label}</p>
        <p className="mt-1 break-all text-lg">{value}</p>
      </div>
      <button
        onClick={() => { navigator.clipboard?.writeText(value); setCopied(true); setTimeout(() => setCopied(false), 1600); }}
        className="btn btn-outline h-9 text-sm"
        aria-label={`Copy ${label}`}
      >
        {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />} {copied ? "Copied" : "Copy"}
      </button>
    </li>
  );
}

export function Contact() {
  const rows = [
    { label: "Email", value: CONTACT.email },
    { label: "Phone", value: CONTACT.phone },
    { label: "LinkedIn", value: CONTACT.linkedin },
  ].filter((r) => r.value.trim());
  return (
    <section id="contact" className="container-site scroll-mt-20 py-20 md:py-28">
      <Reveal className="grid gap-8 border-t pt-6 md:grid-cols-12">
        <p className="eyebrow md:col-span-3">06 · Contact</p>
        <div className="md:col-span-9">
          <h2 className="text-4xl sm:text-5xl md:text-6xl">Start with a short call.</h2>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">Tell us about your campaign and we will walk you through our setup and answer questions about the team.</p>
          {rows.length ? (
            <ul className="mt-10 max-w-2xl border-t">{rows.map((r) => <CopyRow key={r.label} {...r} />)}</ul>
          ) : (
            <p className="mt-10 max-w-2xl border-l-2 border-signal pl-4">Contact details are shared by the person who sent you this page.</p>
          )}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t">
      <div className="container-site flex flex-wrap justify-between gap-3 py-8 font-mono text-xs uppercase tracking-[0.12em] text-muted-foreground">
        <span>HN Solutions · Based in Pakistan</span>
        <span>© 2026 HN Solutions</span>
      </div>
    </footer>
  );
}
