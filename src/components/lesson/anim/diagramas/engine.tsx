import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { arcPath, arrowHead, angleOf, polar, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/**
 * Diagramas animados descritos como datos: cada paso añade elementos (segmentos, puntos, polígonos, circunferencias,
 * arcos, textos…) sobre los de los pasos anteriores. Una diapositiva de teoría usa `anim("dt1-diagrama", { clave })`.
 */

export type Color = "azul" | "verde" | "naranja" | "amarillo" | "rojo" | "morado" | "gris" | "blanco" | "cuadricula";
const COLOR: Record<Color, string> = {
  azul: MANIM.blue, verde: MANIM.green, naranja: MANIM.orange, amarillo: MANIM.yellow, rojo: MANIM.red,
  morado: MANIM.purple, gris: MANIM.muted, blanco: MANIM.ink, cuadricula: MANIM.grid,
};

export type Item =
  | { t: "seg"; a: Pt; b: Pt; c?: Color; d?: boolean; w?: number }
  | { t: "fl"; a: Pt; b: Pt; c?: Color; w?: number }
  | { t: "pt"; p: Pt; n?: string; c?: Color; dx?: number; dy?: number; r?: number; s?: number }
  | { t: "poli"; p: Pt[]; c?: Color; f?: number; w?: number; d?: boolean }
  | { t: "lin"; p: Pt[]; c?: Color; w?: number; d?: boolean }
  | { t: "circ"; c: Pt; r: number; col?: Color; f?: number; d?: boolean; w?: number }
  | { t: "arc"; c: Pt; r: number; a0: number; a1: number; col?: Color; w?: number }
  | { t: "txt"; p: Pt; s: string; c?: Color; size?: number; anchor?: "start" | "middle" | "end" };

export type Paso = {
  /** Texto del paso (admite **negrita** y $fórmulas$). */
  texto: string;
  items: Item[];
  /** Los elementos de este paso solo se ven en él. */
  solo?: boolean;
};

export type Diagrama = { label: string; pasos: Paso[]; beatMs?: number };

function Nodo({ it }: { it: Item }) {
  switch (it.t) {
    case "seg":
      return <line x1={it.a[0]} y1={it.a[1]} x2={it.b[0]} y2={it.b[1]} stroke={COLOR[it.c ?? "azul"]} strokeWidth={it.w ?? 3} strokeLinecap="round" strokeDasharray={it.d ? "8 7" : undefined} />;
    case "fl": {
      const col = COLOR[it.c ?? "verde"];
      const fin = polar(it.b, 10, angleOf(it.a, it.b) + 180);
      return (
        <g>
          <line x1={it.a[0]} y1={it.a[1]} x2={fin[0]} y2={fin[1]} stroke={col} strokeWidth={it.w ?? 3.4} strokeLinecap="round" />
          <polygon points={arrowHead(it.a, it.b, 15)} fill={col} />
        </g>
      );
    }
    case "pt": {
      const col = COLOR[it.c ?? "blanco"];
      return (
        <g>
          <circle cx={it.p[0]} cy={it.p[1]} r={it.r ?? 5.5} fill={col} stroke={MANIM.surface} strokeWidth={2} />
          {it.n ? <Txt x={it.p[0] + (it.dx ?? 12)} y={it.p[1] + (it.dy ?? -10)} size={it.s ?? 21} color={col}>{it.n}</Txt> : null}
        </g>
      );
    }
    case "poli": {
      const col = COLOR[it.c ?? "azul"];
      return <polygon points={it.p.map((q) => q.join(",")).join(" ")} fill={col} fillOpacity={it.f ?? 0.18} stroke={col} strokeWidth={it.w ?? 3} strokeLinejoin="round" strokeDasharray={it.d ? "8 7" : undefined} />;
    }
    case "lin": {
      const col = COLOR[it.c ?? "azul"];
      return <polyline points={it.p.map((q) => q.join(",")).join(" ")} fill="none" stroke={col} strokeWidth={it.w ?? 3} strokeLinejoin="round" strokeLinecap="round" strokeDasharray={it.d ? "8 7" : undefined} />;
    }
    case "circ": {
      const col = COLOR[it.col ?? "azul"];
      return <circle cx={it.c[0]} cy={it.c[1]} r={it.r} fill={col} fillOpacity={it.f ?? 0} stroke={col} strokeWidth={it.w ?? 3} strokeDasharray={it.d ? "8 7" : undefined} />;
    }
    case "arc":
      return <path d={arcPath(it.c, it.r, it.a0, it.a1)} fill="none" stroke={COLOR[it.col ?? "verde"]} strokeWidth={it.w ?? 2.8} />;
    case "txt":
      return <Txt x={it.p[0]} y={it.p[1]} size={it.size ?? 21} color={COLOR[it.c ?? "blanco"]} anchor={it.anchor ?? "middle"}>{it.s}</Txt>;
  }
}

/** Rectángulo que contiene todos los elementos del diagrama (en todos los pasos). */
function limites(def: Diagrama): { x0: number; y0: number; x1: number; y1: number } {
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -Infinity;
  let y1 = -Infinity;
  const mete = (x: number, y: number) => {
    x0 = Math.min(x0, x);
    y0 = Math.min(y0, y);
    x1 = Math.max(x1, x);
    y1 = Math.max(y1, y);
  };
  for (const paso of def.pasos) {
    for (const it of paso.items) {
      switch (it.t) {
        case "seg": case "fl": mete(...it.a); mete(...it.b); break;
        case "pt": mete(it.p[0] - 8, it.p[1] - 8); mete(it.p[0] + 8 + (it.n ? 22 : 0), it.p[1] + 8 + (it.n ? 10 : 0)); break;
        case "poli": case "lin": it.p.forEach((q) => mete(...q)); break;
        case "circ": mete(it.c[0] - it.r, it.c[1] - it.r); mete(it.c[0] + it.r, it.c[1] + it.r); break;
        case "arc": for (let a = it.a0; a <= it.a1; a += 10) mete(...polar(it.c, it.r, a)); mete(...polar(it.c, it.r, it.a1)); break;
        case "txt": { const w = it.s.length * (it.size ?? 21) * 0.3; const a = it.anchor ?? "middle"; const xa = a === "middle" ? it.p[0] - w : a === "end" ? it.p[0] - 2 * w : it.p[0]; mete(xa, it.p[1] - (it.size ?? 21)); mete(xa + 2 * w, it.p[1] + 6); break; }
      }
    }
  }
  return { x0, y0, x1, y1 };
}

export function construirDiagrama(def: Diagrama): AnimBuild {
  const b = limites(def);
  const margen = 34;
  const w = Math.max(1, b.x1 - b.x0);
  const h = Math.max(1, b.y1 - b.y0);
  const k = Math.max(0.7, Math.min(1.45, (800 - 2 * margen) / w, (420 - 2 * margen) / h));
  const tx = (800 - w * k) / 2 - b.x0 * k;
  const ty = (420 - h * k) / 2 - b.y0 * k;
  return {
    label: def.label,
    beatMs: def.beatMs ?? 5600,
    captions: def.pasos.map((p) => p.texto),
    render: (beat) => (
      <Canvas>
        <g transform={`translate(${tx} ${ty}) scale(${k})`}>
          {def.pasos.map((paso, n) => (
            <Fade key={n} show={n <= beat && (!paso.solo || n === beat)}>
              {paso.items.map((it, i) => <Nodo key={i} it={it} />)}
            </Fade>
          ))}
        </g>
      </Canvas>
    ),
  };
}

/* ───────────── Ayudas para escribir diagramas ───────────── */

export const seg = (a: Pt, b: Pt, c?: Color, d?: boolean, w?: number): Item => ({ t: "seg", a, b, c, d, w });
export const fl = (a: Pt, b: Pt, c?: Color, w?: number): Item => ({ t: "fl", a, b, c, w });
export const pt = (p: Pt, n?: string, c?: Color, dx?: number, dy?: number): Item => ({ t: "pt", p, n, c, dx, dy });
export const poli = (p: Pt[], c?: Color, f?: number, d?: boolean): Item => ({ t: "poli", p, c, f, d });
export const lin = (p: Pt[], c?: Color, d?: boolean, w?: number): Item => ({ t: "lin", p, c, d, w });
export const circ = (c: Pt, r: number, col?: Color, f?: number, d?: boolean): Item => ({ t: "circ", c, r, col, f, d });
export const arc = (c: Pt, r: number, a0: number, a1: number, col?: Color): Item => ({ t: "arc", c, r, a0, a1, col });
export const txt = (p: Pt, s: string, c?: Color, size?: number, anchor?: "start" | "middle" | "end"): Item => ({ t: "txt", p, s, c, size, anchor });
/** Punto a distancia `r` de `c` en la dirección `deg` (antihoraria, y hacia arriba). */
export const pol = (c: Pt, r: number, deg: number): Pt => polar(c, r, deg);
export const suma = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]];
export const resta = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]];
export const medio = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
export const lerp2 = (a: Pt, b: Pt, t: number): Pt => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t];
export const gira = (p: Pt, c: Pt, deg: number): Pt => {
  const r = (deg * Math.PI) / 180;
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  return [c[0] + dx * Math.cos(r) + dy * Math.sin(r), c[1] - dx * Math.sin(r) + dy * Math.cos(r)];
};
export const homo = (p: Pt, c: Pt, k: number): Pt => [c[0] + k * (p[0] - c[0]), c[1] + k * (p[1] - c[1])];
export type { Pt };
