import { motion, useReducedMotion, useScroll, useSpring, useTransform, useMotionValueEvent } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { ChevronRight, Menu, X } from "lucide-react";
import { CONTACT, hero, partnership, services, standards, steps, team } from "@/content/site";
import { Glyph, Reveal, SectionHead } from "./primitives";
import { LineBoard } from "./LineBoard";

export function scrollToId(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = (window as unknown as { __lenis?: { scrollTo: (e: Element, o: object) => void } }).__lenis;
  if (lenis) lenis.scrollTo(el, { offset: -64 });
  else el.scrollIntoView({ behavior: "smooth" });
}

const LINKS = [
  { id: "services", label: "Services" },
  { id: "process", label: "Process" },
  { id: "team", label: "Team" },
  { id: "standards", label: "Standards" },
  { id: "partnership", label: "Partnership" },
];

function AnchorLink({ id, children, className }: { id: string; children: React.ReactNode; className?: string }) {
  return (
    <a href={`#${id}`} onClick={(e) => { e.preventDefault(); scrollToId(id); }} className={className}>
      {children}
    </a>
  );
}

function Logo({ dark = false }: { dark?: boolean }) {
  return (
    <span className={`flex items-center gap-2 font-display text-lg font-medium tracking-tight ${dark ? "text-white" : ""}`}>
      <Glyph className="h-4 w-4" /> HN Solutions
    </span>
  );
}

export function Nav() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  const go = (id: string) => { setOpen(false); scrollToId(id); };
  return (
    <header className="sticky top-0 z-40 border-b bg-white">
      <nav className="container-site grid h-16 grid-cols-[1fr_auto] items-center md:grid-cols-[1fr_auto_1fr]" aria-label="Main">
        <a href="#top" onClick={(e) => { e.preventDefault(); setOpen(false); window.scrollTo({ top: 0 }); }}><Logo /></a>
        <div className="hidden items-center gap-7 md:flex">
          {LINKS.map((l) => (
            <AnchorLink key={l.id} id={l.id} className="text-sm text-muted-foreground transition-colors hover:text-ink">{l.label}</AnchorLink>
          ))}
        </div>
        <div className="flex items-center justify-end gap-2">
          <AnchorLink id="partnership" className="btn btn-dark h-9">Contact</AnchorLink>
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-[3px] border md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>
      {open && (
        <div id="mobile-menu" className="absolute inset-x-0 top-full border-b bg-white shadow-[0_20px_40px_-24px_rgb(0_0_0/0.3)] md:hidden">
          <ul className="container-site py-2">
            {LINKS.map((l) => (
              <li key={l.id} className="border-b last:border-b-0">
                <button type="button" onClick={() => go(l.id)} className="block w-full py-4 text-left font-display text-xl">
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  );
}

export function Hero() {
  const reduce = useReducedMotion();
  const [hasImg, setHasImg] = useState(false);
  useEffect(() => {
    const img = new Image();
    img.onload = () => setHasImg(true);
    img.src = "/hero-office.jpg";
  }, []);
  const item = {
    hidden: reduce ? {} : { opacity: 0, y: 12 },
    show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const } },
  };
  return (
    <section id="top" className="relative flex min-h-[calc(100vh-4rem)] flex-col overflow-hidden bg-black text-white">
      <div className="hero-fallback absolute inset-0" aria-hidden="true" />
      {hasImg && (
        <div className="ken-burns absolute inset-0 bg-cover bg-center" style={{ backgroundImage: "url(/hero-office.jpg)" }} aria-hidden="true" />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/60 to-transparent" aria-hidden="true" />
      <div className="absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-black/70 to-transparent" aria-hidden="true" />

      <div className="container-site relative flex flex-1 items-center py-24">
        <motion.div className="max-w-4xl" initial="hidden" animate="show" variants={{ show: { transition: { staggerChildren: 0.1 } } }}>
          <motion.p variants={item} className="eyebrow text-white/70">{hero.eyebrow}</motion.p>
          <motion.h1 variants={item} className="mt-6 text-[2.75rem] text-white md:text-7xl lg:text-[5.75rem]">{hero.title}</motion.h1>
          <motion.p variants={item} className="mt-7 max-w-xl text-lg leading-relaxed text-white/80">{hero.lede}</motion.p>
          <motion.div variants={item} className="mt-10 flex flex-wrap gap-3">
            <button onClick={() => scrollToId("process")} className="btn btn-light">
              See how a sale moves <ChevronRight className="h-4 w-4" />
            </button>
            <button onClick={() => scrollToId("partnership")} className="btn btn-ghost-dark">Get in touch</button>
          </motion.div>
        </motion.div>
      </div>

      <div className="container-site relative pb-8">
        <ul className="grid grid-cols-2 gap-x-6 gap-y-3 border-t border-white/10 pt-6 text-sm text-white/70 md:grid-cols-4">
          {services.map((s) => <li key={s.title}>{s.title}</li>)}
        </ul>
      </div>
    </section>
  );
}

export function Statement() {
  return (
    <section className="container-site section-pad">
      <Reveal>
        <p className="max-w-[800px] font-display text-3xl font-medium leading-[1.2] tracking-[-0.02em] sm:text-4xl md:text-[2.75rem]">
          Every sale is reviewed against its recording before it is submitted.{" "}
          <span className="text-soft">Three experienced closers work the phones. One operator runs the dialer, CRM and QA.</span>
        </p>
      </Reveal>
    </section>
  );
}

export function ProductFrame() {
  return (
    <section className="container-site pb-[100px] md:pb-[140px]">
      <Reveal>
        <div className="rounded-[4px] bg-black p-4 shadow-[0_40px_80px_-40px_rgb(0_0_0/0.45)] sm:p-8 md:p-14">
          <LineBoard />
        </div>
      </Reveal>
    </section>
  );
}

function ServiceTicker() {
  const reduce = useReducedMotion();
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    if (reduce || paused) return;
    const id = setInterval(() => setActive((a) => (a + 1) % services.length), 2500);
    return () => clearInterval(id);
  }, [reduce, paused]);
  const ROW = 72;
  return (
    <div
      className="relative h-[216px] overflow-hidden"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <motion.ul
        animate={{ y: ROW - active * ROW }}
        transition={{ duration: reduce ? 0 : 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        {services.map((s, i) => (
          <li key={s.title} style={{ height: ROW }} className="flex items-center">
            <button
              onClick={() => setActive(i)}
              className={`text-left font-display text-3xl font-medium tracking-[-0.02em] transition-colors duration-500 sm:text-5xl ${i === active ? "text-ink" : "text-soft/60"}`}
            >
              {s.title}
            </button>
          </li>
        ))}
      </motion.ul>
    </div>
  );
}

export function Services() {
  return (
    <section id="services" className="scroll-mt-16 bg-beige section-pad">
      <div className="container-site">
        <div className="grid gap-8 md:grid-cols-12">
          <p className="eyebrow md:col-span-4 md:pt-8">What we run</p>
          <div className="md:col-span-8"><ServiceTicker /></div>
        </div>
        <div className="mt-20 grid border-t border-line sm:grid-cols-2 lg:grid-cols-4">
          {services.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.05} className="border-b border-line py-8 sm:border-b-0 sm:pr-8 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <p className="eyebrow">{s.tag}</p>
              <h3 className="mt-4 text-xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function Step({ i, title, body, progress }: { i: number; title: string; body: string; progress: number }) {
  const lit = progress >= (i + 0.3) / steps.length;
  return (
    <li className="relative grid gap-3 border-b py-10 pl-10 last:border-b-0 md:grid-cols-12 md:gap-8">
      <span className={`absolute left-[11px] top-[3.1rem] h-2.5 w-2.5 rounded-full border transition-colors duration-300 ${lit ? "border-black bg-black" : "border-soft bg-white"}`} />
      <p className={`font-display text-5xl font-light tracking-[-0.02em] transition-colors duration-300 md:col-span-2 ${lit ? "text-ink" : "text-soft"}`}>
        {String(i + 1).padStart(2, "0")}
      </p>
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
    <section id="process" className="container-site scroll-mt-16 section-pad">
      <SectionHead eyebrow="Process" title="How a sale moves through our line" intro="Six steps from the first dial to the weekly report." />
      <ol ref={ref} className="relative mt-16 border-t">
        <span className="absolute bottom-0 left-4 top-0 w-px bg-line" aria-hidden="true" />
        <motion.span style={{ scaleY }} className="absolute bottom-0 left-4 top-0 w-px origin-top bg-black" aria-hidden="true" />
        {steps.map((s, i) => <Step key={s.title} i={i} {...s} progress={reduce ? 1 : p} />)}
      </ol>
    </section>
  );
}

export function TeamStandards() {
  return (
    <section className="bg-grey section-pad">
      <div id="team" className="container-site scroll-mt-16">
        <SectionHead eyebrow="Team" title="Four partners, one line" intro="Three closers on the phones and one operator behind them. All four own the company." />
        <ul className="mt-14 grid border-t border-black/10 sm:grid-cols-2 lg:grid-cols-4">
          {team.map((m, i) => (
            <Reveal key={m.name} delay={i * 0.05} className="border-b border-black/10 py-8 sm:pr-8 lg:border-b-0 lg:border-l lg:pl-6 lg:first:border-l-0 lg:first:pl-0">
              <li>
                <h3 className="text-2xl font-light sm:text-[1.6rem]">{m.name}</h3>
                <p className="eyebrow mt-3">{m.role}</p>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{m.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
      <div id="standards" className="container-site mt-[100px] scroll-mt-16 md:mt-[140px]">
        <SectionHead eyebrow="Standards" title="How we work" intro="The rules we hold ourselves to on every campaign." />
        <ul className="mt-14 grid border-t border-black/10 md:grid-cols-3">
          {standards.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.05} className="border-b border-black/10 py-8 md:pr-8">
              <li>
                <h3 className="text-xl">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Partnership() {
  const cols = [
    { title: "We bring", items: partnership.bring },
    { title: "We need from a partner", items: partnership.need },
  ];
  return (
    <section id="partnership" className="scroll-mt-16 bg-black text-white section-pad">
      <div className="container-site">
        <SectionHead dark eyebrow="Partnership" title="What we bring and what we need" intro="Terms are discussed directly, on a call or by email." />
        <div className="mt-14 grid gap-12 md:grid-cols-2">
          {cols.map((c, i) => (
            <Reveal key={c.title} delay={i * 0.06}>
              <h3 className="text-2xl text-white">{c.title}</h3>
              <ul className="mt-6 border-t border-white/10">
                {c.items.map((t) => (
                  <li key={t} className="border-b border-white/10 py-4 text-white/80">{t}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        <Reveal className="mt-12">
          <button onClick={() => scrollToId("process")} className="btn btn-ghost-dark">
            See how a sale moves <ChevronRight className="h-4 w-4" />
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export function Closing() {
  const rows = [
    { label: "Email", href: CONTACT.email && `mailto:${CONTACT.email}` },
    { label: "Phone", href: CONTACT.phone && `tel:${CONTACT.phone}` },
    { label: "LinkedIn", href: CONTACT.linkedin },
  ].filter((r) => r.href.trim());
  return (
    <section className="border-t border-white/10 bg-black text-white">
      <Reveal className="container-site flex flex-col gap-8 py-[100px] md:flex-row md:items-end md:justify-between md:py-[120px]">
        <h2 className="max-w-2xl text-4xl text-white sm:text-5xl">Run your next campaign with HN Solutions.</h2>
        <div className="flex flex-wrap gap-3">
          <button onClick={() => scrollToId("partnership")} className="btn btn-light">Get in touch <ChevronRight className="h-4 w-4" /></button>
          <button onClick={() => scrollToId("services")} className="btn btn-ghost-dark">Our services</button>
          {rows.map((r) => <a key={r.label} href={r.href} className="btn btn-ghost-dark">{r.label}</a>)}
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  const cols = [
    { title: "Company", links: LINKS.filter((l) => ["team", "standards", "partnership"].includes(l.id)) },
    { title: "Work", links: LINKS.filter((l) => ["services", "process"].includes(l.id)) },
  ];
  return (
    <footer className="bg-black text-white">
      <div className="container-site grid gap-10 border-t border-white/10 py-14 md:grid-cols-12">
        <div className="md:col-span-6">
          <Logo dark />
          <p className="mt-4 max-w-sm text-sm text-white/60">{hero.title}</p>
        </div>
        {cols.map((c) => (
          <div key={c.title} className="md:col-span-3">
            <p className="eyebrow text-white/50">{c.title}</p>
            <ul className="mt-4 space-y-2.5">
              {c.links.map((l) => (
                <li key={l.id}><AnchorLink id={l.id} className="text-sm text-white/80 hover:text-white">{l.label}</AnchorLink></li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="container-site flex flex-wrap justify-between gap-3 border-t border-white/10 py-6 text-xs text-white/50">
        <span>HN Solutions · Based in Pakistan</span>
        <span>© 2026 HN Solutions</span>
      </div>
    </footer>
  );
}
