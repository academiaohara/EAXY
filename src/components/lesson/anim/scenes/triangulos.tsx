import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import {
  Dot,
  RightMark,
  Seg,
  TickMark,
  Wedge,
  angleOf,
  footOn,
  type Pt,
} from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

export type Tri = readonly [Pt, Pt, Pt];

const pts = (t: readonly Pt[]) => t.map((p) => p.join(",")).join(" ");

export const midpoint = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

export const centroid = ([a, b, c]: Tri): Pt => [(a[0] + b[0] + c[0]) / 3, (a[1] + b[1] + c[1]) / 3];

/** Ortocentro: punto donde se cortan las rectas que contienen a las alturas. */
export function orthocenter([a, b, c]: Tri): Pt {
  // H = A + B + C − 2·O, con O el circuncentro.
  const d = 2 * (a[0] * (b[1] - c[1]) + b[0] * (c[1] - a[1]) + c[0] * (a[1] - b[1]));
  if (Math.abs(d) < 1e-9) {
    return centroid([a, b, c]);
  }
  const a2 = a[0] ** 2 + a[1] ** 2;
  const b2 = b[0] ** 2 + b[1] ** 2;
  const c2 = c[0] ** 2 + c[1] ** 2;
  const ox = (a2 * (b[1] - c[1]) + b2 * (c[1] - a[1]) + c2 * (a[1] - b[1])) / d;
  const oy = (a2 * (c[0] - b[0]) + b2 * (a[0] - c[0]) + c2 * (b[0] - a[0])) / d;
  return [a[0] + b[0] + c[0] - 2 * ox, a[1] + b[1] + c[1] - 2 * oy];
}

/** Cuña del ángulo interior en `v`, entre los lados que van a `p` y a `q`. */
export function InteriorWedge({ v, p, q, r = 30, color, opacity = 0.5 }: { v: Pt; p: Pt; q: Pt; r?: number; color: string; opacity?: number }) {
  const a = angleOf(v, p);
  const b = angleOf(v, q);
  const d = (b - a + 360) % 360;
  const [a0, a1] = d <= 180 ? [a, a + d] : [b, b + (360 - d)];
  return <Wedge c={v} r={r} a0={a0} a1={a1} color={color} opacity={opacity} />;
}

/** Rótulo de vértice, apartado del triángulo respecto de su centroide. */
export function VertexLabels({ tri, names = ["A", "B", "C"], color = MANIM.muted, size = 24 }: { tri: Tri; names?: string[]; color?: string; size?: number }) {
  const g = centroid(tri);
  return (
    <>
      {tri.map((p, i) => {
        const dx = p[0] - g[0];
        const dy = p[1] - g[1];
        const len = Math.hypot(dx, dy) || 1;
        return (
          <Txt key={names[i]} x={p[0] + (dx / len) * 22} y={p[1] + (dy / len) * 22 + size * 0.35} size={size} color={color}>
            {names[i]}
          </Txt>
        );
      })}
    </>
  );
}

function Outline({ tri, color = MANIM.ink }: { tri: Tri; color?: string }) {
  return <polygon points={pts(tri)} fill={MANIM.blue} fillOpacity={0.08} stroke={color} strokeWidth={4} strokeLinejoin="round" />;
}

/* ───────────── Clasificación: por ángulos y por lados ───────────── */

const ACUTO: Tri = [[80, 340], [380, 340], [250, 110]];
const RECTO: Tri = [[100, 340], [380, 340], [100, 130]];
const OBTUSO: Tri = [[60, 340], [400, 340], [170, 225]];
const EQUI: Tri = [[130, 340], [370, 340], [250, 132]];
const ISOS: Tri = [[110, 340], [390, 340], [250, 110]];
const ESCA: Tri = [[80, 340], [400, 340], [190, 140]];

function Panel({ title, rule, color }: { title: string; rule: string; color: string }) {
  return (
    <>
      <Txt x={480} y={170} size={36} color={color} anchor="start">{title}</Txt>
      <Txt x={480} y={222} size={28} color={MANIM.ink} anchor="start">{rule}</Txt>
    </>
  );
}

export function buildTriangulosClasificacion(): AnimBuild {
  const angles: { tri: Tri; title: string; rule: string; color: string }[] = [
    { tri: ACUTO, title: "Acutángulo", rule: "tres ángulos < 90°", color: MANIM.green },
    { tri: RECTO, title: "Rectángulo", rule: "un ángulo de 90°", color: MANIM.yellow },
    { tri: OBTUSO, title: "Obtusángulo", rule: "un ángulo > 90°", color: MANIM.orange },
  ];
  const sides: { tri: Tri; title: string; rule: string; color: string; ticks: number[] }[] = [
    { tri: EQUI, title: "Equilátero", rule: "3 lados iguales", color: MANIM.green, ticks: [1, 1, 1] },
    { tri: ISOS, title: "Isósceles", rule: "2 lados iguales", color: MANIM.blue, ticks: [0, 1, 1] },
    { tri: ESCA, title: "Escaleno", rule: "ningún lado igual", color: MANIM.purple, ticks: [1, 2, 3] },
  ];
  return {
    label: "Triángulos clasificados por sus ángulos (acutángulo, rectángulo, obtusángulo) y por sus lados (equilátero, isósceles, escaleno)",
    captions: [
      "Según sus ángulos, un triángulo es **acutángulo** si los tres miden menos de $90^\\circ$.",
      "Es **rectángulo** si uno de sus ángulos mide exactamente $90^\\circ$ (el cuadradito lo marca).",
      "Es **obtusángulo** si uno de sus ángulos mide más de $90^\\circ$. Los otros dos son agudos siempre.",
      "Según sus lados, el **equilátero** tiene los tres lados iguales. Cada rayita marca lados de la misma longitud.",
      "El **isósceles** tiene dos lados iguales y uno distinto.",
      "El **escaleno** no tiene ningún par de lados iguales.",
    ],
    render: (beat) => (
      <Canvas>
        {angles.map((a, i) => (
          <Fade key={a.title} show={beat === i} dy={8}>
            <Outline tri={a.tri} color={a.color} />
            {a.tri.map((p, k) => {
              const prev = a.tri[(k + 2) % 3]!;
              const next = a.tri[(k + 1) % 3]!;
              const v1 = angleOf(p, prev);
              const v2 = angleOf(p, next);
              const isRight = i === 1 && k === 0;
              const isObtuse = i === 2 && k === 2;
              return isRight ? (
                <RightMark key={k} v={p} a={v1} b={v2} size={22} color={a.color} />
              ) : (
                <InteriorWedge key={k} v={p} q={next} p={prev} r={isObtuse ? 34 : 28} color={isObtuse ? a.color : MANIM.muted} opacity={isObtuse ? 0.55 : 0.28} />
              );
            })}
            <VertexLabels tri={a.tri} />
            <Panel title={a.title} rule={a.rule} color={a.color} />
          </Fade>
        ))}
        {sides.map((s, i) => (
          <Fade key={s.title} show={beat === i + 3} dy={8}>
            <Outline tri={s.tri} color={s.color} />
            {s.ticks.map((n, k) =>
              n > 0 ? <TickMark key={k} a={s.tri[k]!} b={s.tri[(k + 1) % 3]!} n={n} color={s.color} /> : null,
            )}
            <VertexLabels tri={s.tri} />
            <Panel title={s.title} rule={s.rule} color={s.color} />
          </Fade>
        ))}
      </Canvas>
    ),
  };
}

/* ───────────── Medianas y baricentro ───────────── */

const MED: Tri = [[90, 340], [430, 340], [200, 100]];

export function buildTrianguloMediana(): AnimBuild {
  const [A, B, C] = MED;
  const Ap = midpoint(B, C);
  const Bp = midpoint(A, C);
  const Cp = midpoint(A, B);
  const G = centroid(MED);
  const med = [
    { from: C, to: Cp, name: "C'", color: MANIM.blue, opp: [A, B] as const },
    { from: A, to: Ap, name: "A'", color: MANIM.green, opp: [B, C] as const },
    { from: B, to: Bp, name: "B'", color: MANIM.orange, opp: [A, C] as const },
  ];
  return {
    label: "Las tres medianas de un triángulo unen cada vértice con el punto medio del lado opuesto y se cortan en el baricentro",
    captions: [
      "Una **mediana** es el segmento que va de un vértice al **punto medio** del lado opuesto. Empezamos por $C$.",
      "El punto $C'$ está justo en medio de $AB$: las dos mitades miden lo mismo. Ahora, la mediana desde $A$.",
      "Y la que sale de $B$. Cada triángulo tiene **tres medianas**, una por vértice.",
      "Las tres se cortan en un único punto: el **baricentro** $G$ (el centro de gravedad del triángulo).",
      "El baricentro divide cada mediana en dos partes: la que llega al vértice mide el **doble** que la otra, $AG = 2\\cdot GA'$.",
    ],
    render: (beat) => (
      <Canvas>
        <Outline tri={MED} />
        <VertexLabels tri={MED} />
        {med.map((m, i) => (
          <g key={m.name}>
            <Seg a={m.from} b={m.to} color={m.color} width={3.5} show={beat >= i && !(i === 1 && beat === 4)} />
            <Fade show={beat >= i}>
              <Dot p={m.to} color={m.color} r={5} />
              <TickMark a={m.opp[0]} b={m.to} color={m.color} />
              <TickMark a={m.to} b={m.opp[1]} color={m.color} />
              <Txt x={m.to[0] + (m.to[0] - G[0]) * 0.25} y={m.to[1] + (m.to[1] - G[1]) * 0.25 + 8} size={22} color={m.color}>
                {m.name}
              </Txt>
            </Fade>
          </g>
        ))}
        {/* beat 4: la mediana desde A se parte en dos tramos de color */}
        <Seg a={A} b={G} color={MANIM.green} width={6} show={beat === 4} />
        <Seg a={G} b={Ap} color={MANIM.yellow} width={6} show={beat === 4} />
        <Fade show={beat >= 3} scale={0.6}>
          <Dot p={G} color={MANIM.yellow} r={8} />
          <Txt x={G[0] + 4} y={G[1] - 16} size={26} color={MANIM.yellow}>G</Txt>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <Txt x={520} y={170} size={32} color={MANIM.green} anchor="start">{"AG = 2 · GA'"}</Txt>
          <Txt x={520} y={220} size={28} color={MANIM.yellow} anchor="start">la parte larga es</Txt>
          <Txt x={520} y={256} size={28} color={MANIM.yellow} anchor="start">el doble de la corta</Txt>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <Txt x={520} y={190} size={34} color={MANIM.yellow} anchor="start">Baricentro</Txt>
          <Txt x={520} y={236} size={24} color={MANIM.ink} anchor="start">corte de las medianas</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Alturas y ortocentro ───────────── */

const ALT_AGUDO: Tri = [[80, 350], [400, 350], [300, 120]];
const ALT_OBTUSO: Tri = [[60, 350], [380, 350], [160, 240]];

/** Altura desde el vértice `v` hasta la recta del lado `p`–`q`; punteada la prolongación si el pie queda fuera. */
export function Altura({ v, p, q, color, show = true, reach }: { v: Pt; p: Pt; q: Pt; color: string; show?: boolean; reach?: Pt }) {
  const f = footOn(v, p, q);
  const t = ((f[0] - p[0]) * (q[0] - p[0]) + (f[1] - p[1]) * (q[1] - p[1])) / ((q[0] - p[0]) ** 2 + (q[1] - p[1]) ** 2);
  const outside = t < 0 || t > 1;
  const near = t < 0 ? p : q;
  return (
    <g>
      <Seg a={v} b={f} color={color} width={3.5} show={show} />
      {outside ? <Seg a={near} b={f} color={color} width={2.5} dashed show={show} /> : null}
      {reach ? <Seg a={f} b={reach} color={color} width={2.5} dashed show={show} /> : null}
      <Fade show={show}>
        <RightMark v={f} a={angleOf(f, v)} b={angleOf(f, outside ? near : p)} size={14} color={color} />
      </Fade>
    </g>
  );
}

export function buildTrianguloAltura(): AnimBuild {
  const [A, B, C] = ALT_AGUDO;
  const [A2, B2, C2] = ALT_OBTUSO;
  const H1 = orthocenter(ALT_AGUDO);
  const H2 = orthocenter(ALT_OBTUSO);
  return {
    label: "Las tres alturas de un triángulo son perpendiculares a los lados y se cortan en el ortocentro, que puede quedar fuera si el triángulo es obtusángulo",
    captions: [
      "La **altura** es el segmento que baja desde un vértice y llega **perpendicular** al lado opuesto. Aquí, la de $C$.",
      "Cada vértice tiene su altura: son **tres**, una por vértice.",
      "Las tres alturas se cortan en un punto, el **ortocentro** $H$. En un triángulo acutángulo queda dentro.",
      "En un triángulo obtusángulo el pie de la altura puede caer fuera del lado: hay que **prolongar** el lado (línea punteada).",
      "Las tres alturas siguen cortándose en un punto, pero el **ortocentro** queda ahora **fuera** del triángulo.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 2}>
          <Outline tri={ALT_AGUDO} />
          <VertexLabels tri={ALT_AGUDO} />
          <Altura v={C} p={A} q={B} color={MANIM.blue} show={beat >= 0} />
          <Altura v={A} p={B} q={C} color={MANIM.green} show={beat >= 1} />
          <Altura v={B} p={A} q={C} color={MANIM.orange} show={beat >= 1} />
          <Fade show={beat === 2} scale={0.6}>
            <Dot p={H1} color={MANIM.yellow} r={8} />
            <Txt x={H1[0] + 20} y={H1[1] - 10} size={26} color={MANIM.yellow}>H</Txt>
          </Fade>
        </Fade>
        <Fade show={beat >= 3}>
          <Outline tri={ALT_OBTUSO} />
          <VertexLabels tri={ALT_OBTUSO} />
          <Altura v={C2} p={A2} q={B2} color={MANIM.blue} reach={beat === 4 ? H2 : undefined} />
          <Altura v={A2} p={B2} q={C2} color={MANIM.green} reach={beat === 4 ? H2 : undefined} />
          <Altura v={B2} p={A2} q={C2} color={MANIM.orange} reach={beat === 4 ? H2 : undefined} />
          <Fade show={beat === 4} scale={0.6}>
            <Dot p={H2} color={MANIM.yellow} r={8} />
            <Txt x={H2[0] + 22} y={H2[1] - 8} size={26} color={MANIM.yellow}>H</Txt>
          </Fade>
        </Fade>
        <Fade show={beat === 2 || beat === 4} dy={6}>
          <Txt x={520} y={190} size={34} color={MANIM.yellow} anchor="start">Ortocentro</Txt>
          <Txt x={520} y={236} size={26} color={MANIM.ink} anchor="start">{beat === 2 ? "dentro del triángulo" : "fuera del triángulo"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

