import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { Closing, Experience, Faq, Floor, Metrics, Footer, Hero, Nav, Partnership, Process, ProductFrame, Services, Statement, TeamStandards } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "HN Solutions | Outbound sales BPO for US auto and home warranty" },
      { name: "description", content: "Outbound sales BPO in Pakistan for US auto and home warranty campaigns. Every sale is QA-reviewed against its recording." },
      { property: "og:title", content: "HN Solutions | Outbound sales calls, checked before they reach you" },
      { property: "og:description", content: "An outbound sales BPO for US auto and home warranty campaigns. Every sale is reviewed against its recording before it is submitted." },
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
        <Metrics />
        <Statement />
        <ProductFrame />
        <Services />
        <Floor />
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
