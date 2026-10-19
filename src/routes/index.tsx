import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Contact, Footer, Hero, Nav, Partnership, Process, Services, Standards, Team, Ticker } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HN Solutions" },
      { name: "description", content: "Four-person outbound sales team in Pakistan for US auto warranty campaigns. Every sale is QA-reviewed against its recording." },
      { property: "og:title", content: "HN Solutions" },
      { property: "og:description", content: "Outbound sales calls, checked before they reach you." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    let lenis: { raf: (t: number) => void; destroy: () => void } | null = null;
    import("lenis").then(({ default: Lenis }) => {
      const l = new Lenis({ lerp: 0.1 });
      lenis = l;
      (window as unknown as { __lenis: unknown }).__lenis = l;
      const loop = (t: number) => { l.raf(t); raf = requestAnimationFrame(loop); };
      raf = requestAnimationFrame(loop);
    });
    return () => { cancelAnimationFrame(raf); lenis?.destroy(); };
  }, []);

  return (
    <>
      <Nav />
      <main>
        <Hero />
        <Ticker />
        <Services />
        <Process />
        <Team />
        <Standards />
        <Partnership />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
