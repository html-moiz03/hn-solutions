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
  return states[0];
}

const lampClass: Record<Lamp, string> = {
  busy: "bg-lamp-busy",
  ok: "bg-lamp-ok",
  idle: "bg-lamp-idle",
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
    <figure
      className="rounded-md border border-board-line bg-board font-mono text-board-foreground shadow-[0_30px_60px_-30px_rgb(14_35_40/0.55)]"
      aria-label="Illustration of a line board showing call states"
    >
      <div className="flex items-center justify-between border-b border-board-line px-4 py-3 sm:px-5">
        <div className="flex items-center gap-2.5">
          <span className="lamp-pulse h-2 w-2 rounded-full bg-lamp-busy" />
          <span className="text-xs uppercase tracking-[0.14em]">Line board</span>
        </div>
        <span className="rounded-sm border border-board-line px-2 py-0.5 text-[0.65rem] uppercase tracking-[0.12em] text-board-muted">
          Illustration
        </span>
      </div>
      <ul>
        {ROWS.map((r) => {
          const s = stateAt(r.states, tick + r.offset);
          const active = !!s.active && !reduce;
          return (
            <li key={r.name} className="grid grid-cols-[auto_1fr_auto] items-center gap-3 border-b border-board-line px-4 py-4 sm:grid-cols-[auto_6rem_1fr_auto] sm:px-5">
              <span className={`h-2.5 w-2.5 rounded-full transition-colors duration-500 ${lampClass[s.lamp]}`} />
              <span className="text-sm">{r.name}</span>
              <span className="hidden h-5 items-center gap-[3px] sm:flex" aria-hidden="true">
                {Array.from({ length: 14 }).map((_, i) => (
                  <span
                    key={i}
                    className={`h-full w-[3px] origin-center rounded-full ${active ? "bg-lamp-ok" : "bg-board-line"}`}
                    style={{
                      transform: active ? undefined : "scaleY(0.25)",
                      animation: active ? `bar ${0.7 + ((i * 37) % 9) / 15}s ease-in-out ${(i % 5) * 0.08}s infinite` : "none",
                    }}
                  />
                ))}
              </span>
              <span className="w-24 text-right text-xs uppercase tracking-[0.1em] text-board-muted">{s.label}</span>
            </li>
          );
        })}
      </ul>
      <figcaption className="px-4 py-3 text-xs text-board-muted sm:px-5">
        Every sale call passes QA before it is submitted.
      </figcaption>
    </figure>
  );
}
