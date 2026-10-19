import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Lamp = "busy" | "ok" | "idle";
type State = { label: string; lamp: Lamp; units: number; active?: boolean };

const CLOSER: State[] = [
  { label: "Dialing", lamp: "busy", units: 1 },
  { label: "Ringing", lamp: "busy", units: 1 },
  { label: "On call", lamp: "ok", units: 2, active: true },
  { label: "Wrap-up", lamp: "idle", units: 1 },
];
const QA: State[] = [
  { label: "In queue", lamp: "busy", units: 1 },
  { label: "Reviewing", lamp: "busy", units: 2, active: true },
  { label: "Approved", lamp: "ok", units: 1 },
];
const ROWS = [
  { name: "Closer 1", states: CLOSER, offset: 0 },
  { name: "Closer 2", states: CLOSER, offset: 2 },
  { name: "Closer 3", states: CLOSER, offset: 3 },
  { name: "QA review", states: QA, offset: 1 },
];
const UNIT = 1400;

function stateAt(states: State[], tick: number) {
  const total = states.reduce((a, s) => a + s.units, 0);
  let t = tick % total;
  for (const s of states) {
    if (t < s.units) return s;
    t -= s.units;
  }
  return states[0]!;
}

const lampClass: Record<Lamp, string> = {
  busy: "bg-muted-foreground",
  ok: "bg-black",
  idle: "bg-line",
};

export function LineBoard() {
  const reduce = useReducedMotion();
  const [tick, setTick] = useState(0);
  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setTick((t) => t + 1), UNIT);
    return () => clearInterval(id);
  }, [reduce]);

  return (
    <figure className="overflow-hidden rounded-[4px] bg-white text-ink" aria-label="Illustration of a line board showing call states">
      <div className="flex items-center gap-1.5 border-b px-4 py-3">
        {[0, 1, 2].map((i) => <span key={i} className="h-2.5 w-2.5 rounded-full bg-grey" />)}
        <span className="ml-3 text-xs text-muted-foreground">Line board · Illustration</span>
      </div>
      <div className="grid md:grid-cols-[180px_1fr]">
        <aside className="hidden border-r bg-beige p-4 text-sm md:block">
          <p className="eyebrow mb-3">Workspace</p>
          {["Line board", "QA queue", "Reports"].map((t, i) => (
            <p key={t} className={`rounded-[3px] px-2 py-1.5 ${i === 0 ? "bg-white font-medium" : "text-muted-foreground"}`}>{t}</p>
          ))}
        </aside>
        <div>
          <div className="grid grid-cols-[auto_1fr_auto] gap-3 border-b px-4 py-2.5 text-xs text-muted-foreground sm:grid-cols-[auto_7rem_1fr_auto] sm:px-5">
            <span className="w-2.5" /><span>Line</span><span className="hidden sm:block">Activity</span><span className="w-24 text-right">Status</span>
          </div>
          <ul>
            {ROWS.map((r) => {
              const s = stateAt(r.states, tick + r.offset);
              const active = !!s.active && !reduce;
              return (
                <li key={r.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b px-4 py-4 last:border-b-0 sm:grid-cols-[auto_7rem_1fr_auto] sm:px-5">
                  <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${lampClass[s.lamp]} ${s.lamp === "busy" ? "lamp-pulse" : ""}`} />
                  <span className="text-sm font-medium">{r.name}</span>
                  <span className="hidden h-5 items-center gap-[3px] sm:flex" aria-hidden="true">
                    {Array.from({ length: 16 }).map((_, i) => (
                      <span
                        key={i}
                        className={`h-full w-[3px] origin-center rounded-full ${active ? "bg-black" : "bg-line"}`}
                        style={{
                          transform: active ? undefined : "scaleY(0.25)",
                          animation: active ? `bar ${0.7 + ((i * 37) % 9) / 15}s ease-in-out ${(i % 5) * 0.08}s infinite` : "none",
                        }}
                      />
                    ))}
                  </span>
                  <span className="w-24 text-right text-xs text-muted-foreground">{s.label}</span>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <figcaption className="border-t px-4 py-3 text-xs text-muted-foreground sm:px-5">
        Every sale call passes QA before it is submitted.
      </figcaption>
    </figure>
  );
}
