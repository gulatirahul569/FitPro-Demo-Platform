import { useId } from "react";
import {
  Activity,
  Dumbbell,
  Flame,
  Heart,
  Timer,
  Trophy,
} from "lucide-react";

/**
 * Decorative motion kit. Every component:
 *  - is absolutely positioned: put it inside a `relative` wrapper (e.g. <section className="relative overflow-hidden">)
 *  - takes `className` for position/size and `dark` for dark backgrounds
 *  - is aria-hidden, ignores pointer events, and stops moving for reduced-motion users
 * Keep your real content at `relative z-10` so it sits above the decorations.
 *
 * Components (each one moves differently, so sections don't look alike):
 *   OrbitRing      rings rotating in opposite directions, dumbbell circling
 *   SpinBadge      rotating circular text badge
 *   FloatingChips  icon chips bobbing up and down
 *   PulseRings     ripples expanding outward from a heart
 *   HeartbeatLine  ECG line that draws itself on a loop
 *   SpinStar       slowly turning star that breathes
 *   DriftBlobs     soft coloured glows drifting in the background
 *   TravelDot      glowing dot travelling along a line (e.g. a step connector)
 */

/* Keyframes live here so no tailwind.config / globals.css change is needed */
function DecorStyles() {
  return (
    <style>{`
      @keyframes fp-float { 0%,100%{transform:translateY(0) rotate(0deg)} 50%{transform:translateY(-16px) rotate(6deg)} }
      @keyframes fp-ripple { 0%{transform:scale(.35);opacity:.65} 100%{transform:scale(1.5);opacity:0} }
      @keyframes fp-draw { 0%{stroke-dashoffset:100;opacity:1} 65%{stroke-dashoffset:0;opacity:1} 100%{stroke-dashoffset:0;opacity:0} }
      @keyframes fp-drift { 0%,100%{transform:translate(0,0) scale(1)} 33%{transform:translate(40px,-30px) scale(1.12)} 66%{transform:translate(-30px,25px) scale(.94)} }
      @keyframes fp-breathe { 0%,100%{transform:scale(1)} 50%{transform:scale(1.14)} }
      @keyframes fp-spin { to{transform:rotate(360deg)} }
      @keyframes fp-travel { 0%{left:0;opacity:0} 8%{opacity:1} 92%{opacity:1} 100%{left:100%;opacity:0} }
      @media (prefers-reduced-motion: reduce) { .fp-anim { animation: none !important; } }
    `}</style>
  );
}

/* ------------------------------------------------------------------ */
/* 1. OrbitRing                                                        */
/* ------------------------------------------------------------------ */
export function OrbitRing({ className = "", dark = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-56 w-56 sm:h-64 sm:w-64 lg:h-72 lg:w-72 ${className}`}
    >
      <div className="absolute inset-0 animate-[spin_40s_linear_infinite] rounded-full border-2 border-dashed border-orange-300/70 motion-reduce:animate-none">
        <span
          className={`absolute left-1/2 top-0 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full shadow-lg ${
            dark ? "bg-white text-slate-900" : "bg-slate-900 text-white"
          }`}
        >
          <Dumbbell size={18} />
        </span>
      </div>

      <div
        className={`absolute inset-8 animate-[spin_26s_linear_infinite_reverse] rounded-full border motion-reduce:animate-none ${
          dark ? "border-white/20" : "border-slate-300"
        }`}
      >
        <span className="absolute bottom-0 left-1/2 h-3 w-3 -translate-x-1/2 translate-y-1/2 rounded-full bg-orange-500" />
        <span className="absolute left-0 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-amber-400" />
      </div>

      <div className="absolute inset-[38%] rounded-full bg-gradient-to-br from-orange-400/30 to-amber-300/30 blur-xl" />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 2. SpinBadge                                                        */
/* ------------------------------------------------------------------ */
export function SpinBadge({
  text = "Book a demo • Trainers at your home •",
  className = "",
  dark = false,
}) {
  const id = "badge-" + useId().replace(/:/g, "");

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 hidden h-28 w-28 sm:block lg:h-32 lg:w-32 ${className}`}
    >
      <svg
        viewBox="0 0 100 100"
        className="h-full w-full animate-[spin_18s_linear_infinite] motion-reduce:animate-none"
      >
        <defs>
          <path
            id={id}
            d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
          />
        </defs>
        <text
          className={dark ? "fill-white/80" : "fill-slate-700"}
          style={{ fontSize: 9, fontWeight: 700 }}
        >
          <textPath href={`#${id}`} textLength="236" lengthAdjust="spacing">
            {text}{" "}
          </textPath>
        </text>
      </svg>
      <span className="absolute inset-0 m-auto flex h-10 w-10 items-center justify-center rounded-full bg-orange-500 text-white shadow-md shadow-orange-500/30 lg:h-12 lg:w-12">
        <Dumbbell size={18} />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 3. FloatingChips: icon chips bobbing up and down                    */
/*    Covers the section by default; use className to restrict it,     */
/*    e.g. "hidden md:block".                                          */
/* ------------------------------------------------------------------ */
const DEFAULT_CHIPS = [
  { Icon: Flame, pos: "left-[4%] top-[10%]", delay: 0, duration: 6 },
  { Icon: Heart, pos: "right-[6%] top-[16%]", delay: 1.2, duration: 7 },
  { Icon: Timer, pos: "left-[10%] bottom-[12%]", delay: 2.4, duration: 5.5 },
  { Icon: Trophy, pos: "right-[10%] bottom-[10%]", delay: 0.6, duration: 6.5 },
  { Icon: Activity, pos: "left-[48%] top-[4%]", delay: 1.8, duration: 7.5 },
];

export function FloatingChips({
  items = DEFAULT_CHIPS,
  className = "",
  dark = false,
}) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 ${className}`}
    >
      <DecorStyles />
      {items.map(({ Icon, pos, delay = 0, duration = 6 }, i) => (
        <span
          key={i}
          className={`fp-anim absolute flex h-12 w-12 items-center justify-center rounded-2xl border shadow-lg ${pos} ${
            dark
              ? "border-white/15 bg-white/10 text-orange-300 shadow-black/20"
              : "border-slate-200 bg-white text-orange-500 shadow-slate-900/10"
          }`}
          style={{
            animation: `fp-float ${duration}s ease-in-out ${delay}s infinite`,
          }}
        >
          <Icon size={20} />
        </span>
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 4. PulseRings: ripples expanding from a heart                       */
/* ------------------------------------------------------------------ */
export function PulseRings({ className = "", dark = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-64 w-64 sm:h-72 sm:w-72 ${className}`}
    >
      <DecorStyles />
      {[0, 1.33, 2.66].map((delay) => (
        <span
          key={delay}
          className={`fp-anim absolute inset-0 rounded-full border-2 ${
            dark ? "border-orange-400/60" : "border-orange-400/70"
          }`}
          style={{ animation: `fp-ripple 4s ease-out ${delay}s infinite` }}
        />
      ))}
      <span
        className="fp-anim absolute inset-0 m-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-500 text-white shadow-lg shadow-orange-500/30"
        style={{ animation: "fp-breathe 1.6s ease-in-out infinite" }}
      >
        <Heart size={26} fill="currentColor" />
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 5. HeartbeatLine: ECG line that draws itself                        */
/*    Give it width and position, e.g. "left-0 right-0 bottom-6"       */
/* ------------------------------------------------------------------ */
export function HeartbeatLine({ className = "", dark = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-16 w-full sm:h-20 ${className}`}
    >
      <DecorStyles />
      <svg
        viewBox="0 0 400 80"
        preserveAspectRatio="none"
        className="h-full w-full"
      >
        {/* faint track */}
        <path
          d="M0,40 H120 L135,40 L150,8 L170,72 L190,28 L205,40 H400"
          fill="none"
          stroke={dark ? "rgba(255,255,255,0.12)" : "rgba(15,23,42,0.08)"}
          strokeWidth="2"
          vectorEffect="non-scaling-stroke"
        />
        {/* animated line */}
        <path
          className="fp-anim"
          d="M0,40 H120 L135,40 L150,8 L170,72 L190,28 L205,40 H400"
          fill="none"
          stroke="#f97316"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          vectorEffect="non-scaling-stroke"
          pathLength="100"
          strokeDasharray="100"
          style={{ animation: "fp-draw 4.5s ease-in-out infinite" }}
        />
      </svg>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 6. SpinStar: slow-turning star that breathes                        */
/* ------------------------------------------------------------------ */
const STAR_POINTS = Array.from({ length: 16 }, (_, i) => {
  const r = i % 2 === 0 ? 48 : 31;
  const a = (Math.PI * 2 * i) / 16 - Math.PI / 2;
  return `${(50 + r * Math.cos(a)).toFixed(2)},${(50 + r * Math.sin(a)).toFixed(2)}`;
}).join(" ");

export function SpinStar({ className = "", dark = false }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-32 w-32 sm:h-40 sm:w-40 ${className}`}
    >
      <DecorStyles />
      <div
        className="fp-anim h-full w-full"
        style={{ animation: "fp-breathe 5s ease-in-out infinite" }}
      >
        <svg
          viewBox="0 0 100 100"
          className="fp-anim h-full w-full"
          style={{ animation: "fp-spin 30s linear infinite" }}
        >
          <polygon
            points={STAR_POINTS}
            fill="rgba(249,115,22,0.18)"
            stroke="#f97316"
            strokeWidth="1.2"
            strokeLinejoin="round"
          />
          <polygon
            points={STAR_POINTS}
            fill="none"
            stroke={dark ? "rgba(255,255,255,0.35)" : "rgba(15,23,42,0.3)"}
            strokeWidth="0.8"
            strokeDasharray="2 3"
            transform="rotate(11.25 50 50) scale(0.7) translate(21.4 21.4)"
          />
        </svg>
      </div>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 7. DriftBlobs: soft glows drifting in the background               */
/*    Wrap area is the whole section; clip with overflow-hidden.       */
/* ------------------------------------------------------------------ */
export function DriftBlobs({ className = "", dark = false }) {
  const blobs = [
    {
      pos: "-left-20 top-10 h-72 w-72",
      color: dark ? "bg-orange-500/20" : "bg-orange-300/40",
      anim: "fp-drift 18s ease-in-out infinite",
    },
    {
      pos: "right-0 top-1/3 h-80 w-80",
      color: dark ? "bg-indigo-500/20" : "bg-indigo-300/40",
      anim: "fp-drift 22s ease-in-out -6s infinite",
    },
    {
      pos: "bottom-0 left-1/3 h-64 w-64",
      color: dark ? "bg-amber-400/15" : "bg-amber-200/50",
      anim: "fp-drift 26s ease-in-out -12s infinite",
    },
  ];

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 z-0 overflow-hidden ${className}`}
    >
      <DecorStyles />
      {blobs.map((b, i) => (
        <span
          key={i}
          className={`fp-anim absolute rounded-full blur-3xl ${b.pos} ${b.color}`}
          style={{ animation: b.anim }}
        />
      ))}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* 8. TravelDot: glowing dot that runs along a horizontal line         */
/*    Give it the same position/width classes as the line it follows,  */
/*    e.g. "left-[12.5%] right-[12.5%] top-8 hidden lg:block"          */
/* ------------------------------------------------------------------ */
export function TravelDot({ className = "" }) {
  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute z-0 h-0 ${className}`}
    >
      <DecorStyles />
      <span
        className="fp-anim absolute -top-[7px] -ml-1.5 h-3 w-3 rounded-full bg-orange-500 shadow-[0_0_14px_4px_rgba(249,115,22,0.55)]"
        style={{ animation: "fp-travel 6s ease-in-out infinite" }}
      />
    </div>
  );
}