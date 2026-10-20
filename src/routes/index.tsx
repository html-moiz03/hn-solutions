import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Closing, Experience, Faq, Footer, Hero, Nav, Partnership, Process, ProductFrame, Services, Statement, TeamStandards } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HN Solutions | Outbound sales team for US auto warranty campaigns" },
      { name: "description", content: "Four-person outbound sales team in Pakistan for US auto warranty campaigns. Every sale is QA-reviewed against its recording." },
      { property: "og:title", content: "HN Solutions | Outbound sales calls, checked before they reach you" },
      { property: "og:description", content: "A four-person outbound sales team for US auto warranty campaigns. Every sale is reviewed against its recording before it is submitted." },
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
        <Experience />
        <Statement />
        <ProductFrame />
        <Services />
        <Process />
        <TeamStandards />
        <Partnership />
        <Faq />
        <Closing />
      </main>
      <Footer />
    </>
  );
}
