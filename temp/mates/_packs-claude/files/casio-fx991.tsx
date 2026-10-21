"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/utils";

type KeyKind = "dark" | "white" | "orange" | "purple";

type CasioKey = {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  kind: KeyKind;
  face?: string;
  sh?: string;
  al?: string;
};

const KEY_FILL: Record<KeyKind, string> = {
  dark: "#2f3441",
  white: "#f3f3f6",
  orange: "#f59e0b",
  purple: "#8a8ec8",
};
const KEY_TEXT: Record<KeyKind, string> = { dark: "#e5e7eb", white: "#1f2937", orange: "#ffffff", purple: "#ffffff" };
const SHIFT_INK = "#a16207";
const ALPHA_INK = "#dc2626";

function buildCasioKeys(): CasioKey[] {
  const keys: CasioKey[] = [];
  const add = (k: CasioKey) => keys.push(k);

  add({ id: "shift", x: 38, y: 204, w: 40, h: 20, kind: "purple", sh: "SHIFT" });
  add({ id: "alpha", x: 86, y: 204, w: 40, h: 20, kind: "purple", al: "ALPHA" });
  add({ id: "mode", x: 202, y: 204, w: 38, h: 20, kind: "purple" });
  add({ id: "on", x: 246, y: 204, w: 38, h: 20, kind: "purple", sh: "", face: "" });

  add({ id: "calc", x: 38, y: 254, w: 40, h: 24, kind: "dark", face: "CALC", sh: "SOLVE" });
  add({ id: "int", x: 84, y: 254, w: 36, h: 24, kind: "dark", sh: "d/dx" });
  add({ id: "inv", x: 204, y: 254, w: 36, h: 24, kind: "dark", face: "x⁻¹", sh: "x!" });
  add({ id: "logb", x: 246, y: 254, w: 38, h: 24, kind: "dark", sh: "Σ" });

  const rows: [string, string | undefined, string | undefined][][] = [
    [["frac", undefined, undefined], ["sqrt", "∛", undefined], ["sq", "x³", undefined], ["pow", "ˣ√", undefined], ["log", "10ˣ", undefined], ["ln", "eˣ", undefined]],
    [["neg", undefined, undefined], ["dms", undefined, undefined], ["hyp", undefined, undefined], ["sin", "sin⁻¹", undefined], ["cos", "cos⁻¹", undefined], ["tan", "tan⁻¹", undefined]],
    [["rcl", "STO", undefined], ["eng", undefined, undefined], ["lp", undefined, undefined], ["rp", undefined, undefined], ["sd", undefined, undefined], ["mp", "M−", undefined]],
  ];
  const faces: Record<string, string> = {
    sq: "x²", log: "log", ln: "ln", neg: "(−)", dms: "°′″", hyp: "hyp", sin: "sin", cos: "cos", tan: "tan",
    rcl: "RCL", eng: "ENG", lp: "(", rp: ")", sd: "S⇔D", mp: "M+",
  };
  rows.forEach((row, r) =>
    row.forEach(([id, sh], c) =>
      add({ id, x: 38 + c * 42, y: 296 + r * 42, w: 36, h: 24, kind: "dark", face: faces[id], sh }),
    ),
  );

  const nums: [string, string, KeyKind, string | undefined, string | undefined][][] = [
    [["7", "7", "white", "CONST", undefined], ["8", "8", "white", "CONV", undefined], ["9", "9", "white", "CLR", undefined], ["del", "DEL", "orange", "INS", undefined], ["ac", "AC", "orange", "OFF", undefined]],
    [["4", "4", "white", "MATRIX", undefined], ["5", "5", "white", "VECTOR", undefined], ["6", "6", "white", undefined, undefined], ["mul", "×", "white", undefined, undefined], ["div", "÷", "white", undefined, undefined]],
    [["1", "1", "white", "STAT", undefined], ["2", "2", "white", "CMPLX", undefined], ["3", "3", "white", "BASE", undefined], ["add", "+", "white", undefined, undefined], ["sub", "−", "white", undefined, undefined]],
    [["0", "0", "white", "Rnd", undefined], ["dot", "·", "white", "Ran#", undefined], ["exp10", "×10ˣ", "white", "π", undefined], ["ans", "Ans", "white", "DRG▸", undefined], ["eq", "=", "white", undefined, undefined]],
  ];
  nums.forEach((row, r) =>
    row.forEach(([id, face, kind, sh]) =>
      add({ id, x: 38 + row.findIndex((k) => k[0] === id) * 50, y: 432 + r * 48, w: 44, h: 36, kind, face, sh }),
    ),
  );
  return keys;
}

const CASIO_KEYS = buildCasioKeys();

function KeyFace({ k, color }: { k: CasioKey; color: string }) {
  const cx = k.x + k.w / 2;
  const cy = k.y + k.h / 2;
  const box = (x: number, y: number, size: number) => (
    <rect x={x} y={y} width={size} height={size} fill="none" stroke={color} strokeWidth={1.2} />
  );
  switch (k.id) {
    case "frac":
      return (
        <g>
          {box(cx - 5, cy - 10, 9)}
          <line x1={cx - 7} y1={cy} x2={cx + 7} y2={cy} stroke={color} strokeWidth={1.2} />
          {box(cx - 5, cy + 2, 9)}
        </g>
      );
    case "sqrt":
      return (
        <g>
          <text x={cx - 5} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700} style={{ fill: color }}>√</text>
          {box(cx + 1, cy - 5, 9)}
        </g>
      );
    case "pow":
      return (
        <g>
          <text x={cx - 3} y={cy + 2} textAnchor="middle" dominantBaseline="central" fontSize={15} fontWeight={700} style={{ fill: color }}>x</text>
          {box(cx + 3, cy - 10, 8)}
        </g>
      );
    case "int":
      return (
        <g>
          <text x={cx - 4} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={17} fontWeight={700} style={{ fill: color }}>∫</text>
          {box(cx + 2, cy - 4, 8)}
        </g>
      );
    case "logb":
      return (
        <g>
          <text x={cx - 4} y={cy} textAnchor="middle" dominantBaseline="central" fontSize={11} fontWeight={700} style={{ fill: color }}>log</text>
          {box(cx + 7, cy + 1, 6)}
        </g>
      );
    default:
      return (
        <text
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="central"
          fontSize={k.face && k.face.length > 3 ? 9.5 : k.kind === "white" || k.kind === "orange" ? 16 : 11.5}
          fontWeight={700}
          style={{ fill: color }}
        >
          {k.face}
        </text>
      );
  }
}

export type CasioFx991Props = {
  phase: number;
  keySequence: readonly string[];
  accentColor: string;
  /** Teclas resaltadas en reposo (p. ej. `pow` o `sqrt`). */
  emphasisKeyIds?: readonly string[];
  ariaLabel: string;
  screen: ReactNode;
};

export function CasioFx991({ phase, keySequence, accentColor, emphasisKeyIds = ["pow"], ariaLabel, screen }: CasioFx991Props) {
  const uid = useId().replace(/:/g, "");
  const pressed = phase >= 1 ? keySequence[phase - 1] : null;

  return (
    <svg viewBox="0 0 320 640" className="h-full max-h-[38rem] w-auto" role="img" aria-label={ariaLabel}>
      <defs>
        <linearGradient id={`${uid}-plate`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#dcdde3" />
          <stop offset="1" stopColor="#bfc2cb" />
        </linearGradient>
        <linearGradient id={`${uid}-frame`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#5a5d96" />
          <stop offset="1" stopColor="#3a3c68" />
        </linearGradient>
      </defs>

      <rect x={8} y={8} width={304} height={626} rx={38} fill={`url(#${uid}-frame)`} />
      <rect x={20} y={18} width={280} height={608} rx={30} fill={`url(#${uid}-plate)`} />

      <text x={36} y={50} fontSize={17} fontWeight={800} letterSpacing={1.5} fill="#1f2937">CASIO</text>
      <text x={36} y={66} fontSize={9.5} fontStyle="italic" fill="#374151">fx-991ES PLUS</text>
      <text x={36} y={78} fontSize={7.5} fontWeight={700} fill="#0f766e">NATURAL-V.P.A.M.</text>
      <rect x={186} y={34} width={100} height={26} rx={3} fill="#3b2c2c" stroke="#1f2937" />
      {[1, 2, 3].map((i) => (
        <line key={i} x1={186 + i * 25} y1={34} x2={186 + i * 25} y2={60} stroke="#1f2937" strokeWidth={1} />
      ))}
      <text x={236} y={71} textAnchor="middle" fontSize={6.5} fontWeight={700} fill="#374151">TWO WAY POWER</text>

      <rect x={32} y={86} width={256} height={96} rx={8} fill="#2a2f3a" />
      <rect x={38} y={92} width={244} height={84} rx={4} fill="#c7cfbf" />
      {screen}

      <text x={58} y={200} textAnchor="middle" fontSize={8} fontWeight={700} fill={SHIFT_INK}>SHIFT</text>
      <text x={106} y={200} textAnchor="middle" fontSize={8} fontWeight={700} fill={ALPHA_INK}>ALPHA</text>
      <text x={197} y={200} fontSize={8} fontWeight={700} fill="#1f2937">MODE</text>
      <text x={225} y={200} fontSize={8} fontWeight={700} fill={SHIFT_INK}>SETUP</text>
      <text x={265} y={200} textAnchor="middle" fontSize={8} fontWeight={700} fill="#1f2937">ON</text>
      <circle cx={164} cy={224} r={36} fill="#8a8ec8" />
      <circle cx={164} cy={224} r={19} fill="#a3a7d8" />
      <text x={164} y={227} textAnchor="middle" fontSize={6.5} fontWeight={700} fill="#ffffff">REPLAY</text>
      {[["▲", 164, 199], ["▼", 164, 255], ["◀", 139, 227], ["▶", 189, 227]].map(([ch, x, y]) => (
        <text key={String(ch)} x={x as number} y={y as number} textAnchor="middle" dominantBaseline="central" fontSize={8} fill="#ffffff">{ch}</text>
      ))}

      {CASIO_KEYS.map((key) => {
        const isPressed = key.id === pressed;
        const emphasis = emphasisKeyIds.includes(key.id);
        const ink = isPressed ? "#111827" : emphasis ? accentColor : KEY_TEXT[key.kind];
        const round = key.kind === "purple" ? key.h / 2 : 6;
        return (
          <g key={key.id}>
            {key.sh && key.id !== "shift" && key.id !== "on" ? (
              <text x={key.x + key.w / 2} y={key.y - 4} textAnchor="middle" fontSize={7.5} fontWeight={700} fill={key.id === "9" ? ALPHA_INK : SHIFT_INK}>
                {key.sh}
              </text>
            ) : null}
            <g key={isPressed ? `p-${phase}` : "idle"} className={isPressed ? "animate-in zoom-in-90 duration-300 motion-reduce:animate-none" : undefined} style={{ transformBox: "fill-box", transformOrigin: "center" }}>
              <rect x={key.x} y={key.y + 2} width={key.w} height={key.h} rx={round} fill="#00000033" />
              <rect
                x={key.x}
                y={key.y}
                width={key.w}
                height={key.h}
                rx={round}
                style={{
                  fill: isPressed ? accentColor : KEY_FILL[key.kind],
                  stroke: isPressed ? "#fff7d6" : key.kind === "white" ? "#9ca3af" : "#111827",
                  strokeWidth: isPressed ? 2.5 : 1,
                  filter: isPressed ? `drop-shadow(0 0 8px ${accentColor})` : undefined,
                  transition: "fill 0.3s",
                }}
              />
              {key.kind !== "purple" ? <KeyFace k={key} color={ink} /> : null}
            </g>
            {isPressed ? (
              <rect
                x={key.x - 4}
                y={key.y - 4}
                width={key.w + 8}
                height={key.h + 8}
                rx={round + 3}
                fill="none"
                stroke={accentColor}
                strokeWidth={2}
                className="animate-ping motion-reduce:animate-none"
                style={{ transformBox: "fill-box", transformOrigin: "center" }}
              />
            ) : null}
          </g>
        );
      })}
    </svg>
  );
}
