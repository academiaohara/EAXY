import type { ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";

/** Punto del lienzo (x, y) en unidades SVG (y crece hacia abajo). */
export type Pt = readonly [number, number];

const RAD = Math.PI / 180;

/** Punto a distancia `r` de `c` en la dirección `deg` (grados, sentido antihorario, y hacia arriba). */
export function polar(c: Pt, r: number, deg: number): Pt {
  return [c[0] + r * Math.cos(deg * RAD), c[1] - r * Math.sin(deg * RAD)];
}

/** Dirección (grados, antihorario) del vector de `a` a `b`. */
export function angleOf(a: Pt, b: Pt): number {
  return (Math.atan2(-(b[1] - a[1]), b[0] - a[0]) / RAD + 360) % 360;
}

export function dist(a: Pt, b: Pt): number {
  return Math.hypot(b[0] - a[0], b[1] - a[1]);
}

/** Arco de circunferencia de centro `c` entre `a0` y `a1`, recorrido en ese sentido. */
export function arcPath(c: Pt, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(c, r, a0);
  const [x1, y1] = polar(c, r, a1);
  const large = Math.abs(a1 - a0) > 180 ? 1 : 0;
  const sweep = a1 > a0 ? 0 : 1;
  return `M ${x0} ${y0} A ${r} ${r} 0 ${large} ${sweep} ${x1} ${y1}`;
}

/** Sector (cuña) de círculo entre `a0` y `a1`, con `a1 > a0`. */
export function wedgePath(c: Pt, r: number, a0: number, a1: number): string {
  const [x0, y0] = polar(c, r, a0);
  const [x1, y1] = polar(c, r, a1);
  const large = a1 - a0 > 180 ? 1 : 0;
  return `M ${c[0]} ${c[1]} L ${x0} ${y0} A ${r} ${r} 0 ${large} 0 ${x1} ${y1} Z`;
}

/** Arco que aparece dibujándose (Create de Manim); `show` falso lo deja sin trazar. */
export function ArcStroke({
  c,
  r,
  a0,
  a1,
  show,
  color = MANIM.ink,
  width = 3,
  sweep = false,
}: {
  c: Pt;
  r: number;
  a0: number;
  a1: number;
  show: boolean;
  color?: string;
  width?: number;
  /** Se dibuja al mismo ritmo (lineal) que gira el compás. */
  sweep?: boolean;
}) {
  return (
    <path
      d={arcPath(c, r, a0, a1)}
      fill="none"
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={show ? 0 : 1}
      className={sweep ? "anim-sweep" : "anim-draw"}
      style={{ opacity: show ? 1 : 0 }}
    />
  );
}

/** Cuña de ángulo con relleno translúcido (sin borde), para marcar amplitudes. */
export function Wedge({
  c,
  r,
  a0,
  a1,
  color,
  show = true,
  opacity = 0.35,
}: {
  c: Pt;
  r: number;
  a0: number;
  a1: number;
  color: string;
  show?: boolean;
  opacity?: number;
}) {
  return (
    <path
      d={wedgePath(c, r, a0, a1)}
      fill={color}
      fillOpacity={show ? opacity : 0}
      stroke={color}
      strokeOpacity={show ? 0.9 : 0}
      strokeWidth={2}
      strokeLinejoin="round"
      className="anim-t"
    />
  );
}

/** Rótulo a media altura de la cuña (para el valor del ángulo); `halo` lo separa de las líneas que pasen por detrás. */
export function WedgeLabel({
  c,
  r,
  a0,
  a1,
  text,
  color = MANIM.ink,
  size = 22,
  halo,
}: {
  c: Pt;
  r: number;
  a0: number;
  a1: number;
  text: ReactNode;
  color?: string;
  size?: number;
  halo?: string;
}) {
  const [x, y] = polar(c, r, (a0 + a1) / 2);
  return (
    <text
      x={x}
      y={y + size * 0.35}
      fontSize={size}
      fill={color}
      fontWeight={600}
      textAnchor="middle"
      stroke={halo}
      strokeWidth={halo ? 5 : undefined}
      strokeLinejoin="round"
      paintOrder="stroke"
      style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)", fontVariantNumeric: "tabular-nums" }}
    >
      {text}
    </text>
  );
}

/** Punto con rótulo. */
export function Dot({ p, color = MANIM.ink, r = 6 }: { p: Pt; color?: string; r?: number }) {
  return <circle cx={p[0]} cy={p[1]} r={r} fill={color} stroke={MANIM.surface} strokeWidth={2} />;
}

/** Cuadradito de ángulo recto en el vértice `v`, entre las direcciones `a` y `b` (grados). */
export function RightMark({ v, a, b, size = 16, color = MANIM.ink }: { v: Pt; a: number; b: number; size?: number; color?: string }) {
  const p1 = polar(v, size, a);
  const p2 = polar(v, size, b);
  const p3: Pt = [p1[0] + p2[0] - v[0], p1[1] + p2[1] - v[1]];
  return <path d={`M ${p1[0]} ${p1[1]} L ${p3[0]} ${p3[1]} L ${p2[0]} ${p2[1]}`} fill="none" stroke={color} strokeWidth={2} />;
}

/** Marca de igualdad (rayita) en mitad de un segmento. */
export function TickMark({ a, b, n = 1, color = MANIM.ink }: { a: Pt; b: Pt; n?: number; color?: string }) {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const ang = angleOf(a, b) + 90;
  return (
    <g stroke={color} strokeWidth={2.5} strokeLinecap="round">
      {Array.from({ length: n }, (_, i) => {
        const off = (i - (n - 1) / 2) * 8;
        const c = polar([mx, my], off, angleOf(a, b));
        const p = polar(c, 9, ang);
        const q = polar(c, 9, ang + 180);
        return <line key={i} x1={p[0]} y1={p[1]} x2={q[0]} y2={q[1]} />;
      })}
    </g>
  );
}

/** Flecha en el extremo `to` de un segmento (punta rellena). */
export function arrowHead(from: Pt, to: Pt, size = 14): string {
  const ang = angleOf(from, to);
  const tip = to;
  const b = polar(tip, size, ang + 180);
  const l = polar(b, size * 0.45, ang + 90);
  const r = polar(b, size * 0.45, ang - 90);
  return `${tip[0]},${tip[1]} ${l[0]},${l[1]} ${r[0]},${r[1]}`;
}

/**
 * Compás de dibujo. El pivote (aguja) está en `c`, la mina a distancia `r` en la
 * dirección `angle`. Se dibuja con la mina a la derecha (o a la izquierda con
 * `flip`) y se gira como un sólido rígido en torno a la aguja: así el movimiento
 * coincide con el del arco que va dejando.
 */
export function Compass({
  c,
  r,
  angle,
  flip = false,
  show = true,
  sweep = false,
  instant = false,
  legLen,
}: {
  c: Pt;
  r: number;
  /** Dirección de la mina (grados, antihorario). */
  angle: number;
  flip?: boolean;
  show?: boolean;
  /** Gira con transición lineal (sincronizada con `ArcStroke sweep`). */
  sweep?: boolean;
  /** Sin transición: el giro lo manda directamente un deslizador. */
  instant?: boolean;
  legLen?: number;
}) {
  const sgn = flip ? -1 : 1;
  const base = flip ? 180 : 0;
  const half = r / 2;
  const leg = legLen ?? r * 0.72;
  const h = Math.sqrt(Math.max(leg * leg - half * half, 16));
  const hinge: Pt = [c[0] + sgn * half, c[1] - h];
  const pencil: Pt = [c[0] + sgn * r, c[1]];
  const knob: Pt = [hinge[0], hinge[1] - 24];
  const rot = -(angle - base);
  return (
    <g
      className={instant ? undefined : sweep ? "anim-sweep" : "anim-t"}
      style={{
        opacity: show ? 1 : 0,
        transform: `rotate(${rot}deg)`,
        transformOrigin: `${c[0]}px ${c[1]}px`,
        transformBox: "view-box",
        pointerEvents: "none",
      }}
    >
      <line x1={hinge[0]} y1={hinge[1]} x2={c[0]} y2={c[1]} stroke="#9aa7b8" strokeWidth={6} strokeLinecap="round" />
      <line x1={hinge[0]} y1={hinge[1]} x2={pencil[0]} y2={pencil[1] - 10} stroke="#9aa7b8" strokeWidth={6} strokeLinecap="round" />
      <path d={`M ${pencil[0] - 4} ${pencil[1] - 12} L ${pencil[0]} ${pencil[1]} L ${pencil[0] + 4} ${pencil[1] - 12} Z`} fill={MANIM.yellow} />
      <circle cx={c[0]} cy={c[1]} r={3.5} fill={MANIM.surface} stroke="#9aa7b8" strokeWidth={2} />
      <line x1={hinge[0]} y1={hinge[1]} x2={knob[0]} y2={knob[1]} stroke="#9aa7b8" strokeWidth={5} strokeLinecap="round" />
      <circle cx={hinge[0]} cy={hinge[1]} r={9} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3.5} />
    </g>
  );
}

/**
 * Regla translúcida con el borde apoyado en la recta de `a` a `b`; el cuerpo
 * queda a un lado (`side` 1 o -1) y se prolonga `over` px por cada extremo.
 */
export function Ruler({
  a,
  b,
  show,
  side = 1,
  over = 36,
  thickness = 46,
  ticks = true,
}: {
  a: Pt;
  b: Pt;
  show: boolean;
  side?: 1 | -1;
  over?: number;
  thickness?: number;
  ticks?: boolean;
}) {
  const ang = angleOf(a, b);
  const len = dist(a, b) + 2 * over;
  const start = polar(a, over, ang + 180);
  const normal = ang + 90 * side;
  const p0 = start;
  const p1 = polar(start, len, ang);
  const p2 = polar(p1, thickness, normal);
  const p3 = polar(p0, thickness, normal);
  const count = Math.floor(len / 14);
  return (
    <g className="anim-t" style={{ opacity: show ? 0.9 : 0, pointerEvents: "none" }}>
      <polygon points={[p0, p1, p2, p3].map((p) => p.join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={2} />
      {ticks
        ? Array.from({ length: count + 1 }, (_, i) => {
            const t = polar(p0, i * 14, ang);
            const e = polar(t, i % 5 === 0 ? 14 : 8, normal);
            return <line key={i} x1={t[0]} y1={t[1]} x2={e[0]} y2={e[1]} stroke={MANIM.green} strokeWidth={1.5} />;
          })
        : null}
    </g>
  );
}

/** Recta de longitud total `len` centrada en `p` con dirección `deg` (extremos devueltos). */
export function lineThrough(p: Pt, deg: number, half: number): [Pt, Pt] {
  return [polar(p, half, deg + 180), polar(p, half, deg)];
}

/** Segmento dibujado con un trazo (con transición de opacidad). */
export function Seg({
  a,
  b,
  color = MANIM.ink,
  width = 3,
  dashed = false,
  show = true,
}: {
  a: Pt;
  b: Pt;
  color?: string;
  width?: number;
  dashed?: boolean;
  show?: boolean;
}) {
  return (
    <line
      x1={a[0]}
      y1={a[1]}
      x2={b[0]}
      y2={b[1]}
      stroke={color}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dashed ? "8 7" : undefined}
      className="anim-t"
      style={{ opacity: show ? 1 : 0 }}
    />
  );
}

/** Pie de un punto sobre una recta (proyección ortogonal). */
export function footOn(p: Pt, a: Pt, b: Pt): Pt {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const t = ((p[0] - a[0]) * dx + (p[1] - a[1]) * dy) / (dx * dx + dy * dy);
  return [a[0] + t * dx, a[1] + t * dy];
}
