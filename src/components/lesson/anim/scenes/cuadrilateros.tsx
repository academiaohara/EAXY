import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { RightMark, Seg, TickMark, angleOf, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

type Quad = readonly [Pt, Pt, Pt, Pt];

const pts = (q: readonly Pt[]) => q.map((p) => p.join(",")).join(" ");
const sides = (q: Quad): [Pt, Pt][] => q.map((p, i) => [p, q[(i + 1) % 4]!] as [Pt, Pt]);

/** Flechita sobre un lado: los lados con la misma marca son paralelos. */
export function ParMark({ a, b, n = 1, color = MANIM.ink }: { a: Pt; b: Pt; n?: number; color?: string }) {
  const ang = angleOf(a, b);
  const mid: Pt = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return (
    <g stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" fill="none">
      {Array.from({ length: n }, (_, i) => {
        const c = polar(mid, (i - (n - 1) / 2) * 12, ang);
        const tip = polar(c, 5, ang);
        const l = polar(tip, 9, ang + 180 + 35);
        const r = polar(tip, 9, ang + 180 - 35);
        return <path key={i} d={`M ${l[0]} ${l[1]} L ${tip[0]} ${tip[1]} L ${r[0]} ${r[1]}`} />;
      })}
    </g>
  );
}

function Shape({ q, color, children }: { q: Quad; color: string; children?: ReactNode }) {
  return (
    <>
      <polygon points={pts(q)} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={4} strokeLinejoin="round" />
      {children}
    </>
  );
}

const GENERICO: Quad = [[90, 330], [380, 345], [340, 140], [140, 110]];
const ROMBOIDE: Quad = [[70, 330], [330, 330], [420, 150], [160, 150]];
const ROMBO: Quad = [[250, 340], [380, 225], [250, 110], [120, 225]];
const RECTANGULO: Quad = [[80, 330], [400, 330], [400, 150], [80, 150]];
const CUADRADO: Quad = [[110, 340], [370, 340], [370, 80], [110, 80]];
const TRAPECIO: Quad = [[60, 330], [410, 330], [300, 150], [140, 150]];
const TRAPEZOIDE: Quad = [[80, 330], [390, 300], [330, 130], [150, 190]];

function RightMarks({ q, color }: { q: Quad; color: string }) {
  return (
    <>
      {q.map((p, i) => (
        <RightMark key={i} v={p} a={angleOf(p, q[(i + 3) % 4]!)} b={angleOf(p, q[(i + 1) % 4]!)} size={20} color={color} />
      ))}
    </>
  );
}

function Diagonals({ q, show }: { q: Quad; show: boolean }) {
  return (
    <>
      <Seg a={q[0]} b={q[2]} color={MANIM.muted} width={2.5} dashed show={show} />
      <Seg a={q[1]} b={q[3]} color={MANIM.muted} width={2.5} dashed show={show} />
    </>
  );
}

export function buildCuadrilaterosFamilia(): AnimBuild {
  const items: { q: Quad; title: string; rule: string; color: string; extra?: ReactNode }[] = [
    { q: GENERICO, title: "Cuadrilátero", rule: "4 lados y 2 diagonales", color: MANIM.ink },
    {
      q: ROMBOIDE,
      title: "Romboide",
      rule: "lados opuestos paralelos",
      color: MANIM.blue,
      extra: (
        <>
          <ParMark a={ROMBOIDE[0]} b={ROMBOIDE[1]} color={MANIM.blue} />
          <ParMark a={ROMBOIDE[3]} b={ROMBOIDE[2]} color={MANIM.blue} />
          <ParMark a={ROMBOIDE[0]} b={ROMBOIDE[3]} n={2} color={MANIM.blue} />
          <ParMark a={ROMBOIDE[1]} b={ROMBOIDE[2]} n={2} color={MANIM.blue} />
        </>
      ),
    },
    {
      q: ROMBO,
      title: "Rombo",
      rule: "4 lados iguales",
      color: MANIM.green,
      extra: sides(ROMBO).map(([a, b], i) => <TickMark key={i} a={a} b={b} color={MANIM.green} />),
    },
    { q: RECTANGULO, title: "Rectángulo", rule: "4 ángulos rectos", color: MANIM.orange, extra: <RightMarks q={RECTANGULO} color={MANIM.orange} /> },
    {
      q: CUADRADO,
      title: "Cuadrado",
      rule: "lados y ángulos iguales",
      color: MANIM.yellow,
      extra: (
        <>
          {sides(CUADRADO).map(([a, b], i) => (
            <TickMark key={i} a={a} b={b} color={MANIM.yellow} />
          ))}
          <RightMarks q={CUADRADO} color={MANIM.yellow} />
        </>
      ),
    },
    {
      q: TRAPECIO,
      title: "Trapecio",
      rule: "solo 2 lados paralelos",
      color: MANIM.purple,
      extra: (
        <>
          <ParMark a={TRAPECIO[0]} b={TRAPECIO[1]} color={MANIM.purple} />
          <ParMark a={TRAPECIO[3]} b={TRAPECIO[2]} color={MANIM.purple} />
        </>
      ),
    },
    { q: TRAPEZOIDE, title: "Trapezoide", rule: "ningún lado paralelo", color: MANIM.red },
  ];
  return {
    label: "Familia de los cuadriláteros: paralelogramos (romboide, rombo, rectángulo, cuadrado), trapecios y trapezoides",
    captions: [
      "Un **cuadrilátero** tiene $4$ lados, sus ángulos suman $360^\\circ$ y tiene $2$ diagonales.",
      "Si los lados opuestos son **paralelos**, es un **paralelogramo**. El más general es el **romboide**.",
      "El **rombo** es un paralelogramo con los cuatro lados iguales.",
      "El **rectángulo** es un paralelogramo con los cuatro ángulos rectos.",
      "El **cuadrado** reúne las dos cosas: lados iguales y ángulos rectos.",
      "Si solo hay **un par** de lados paralelos, es un **trapecio**. No es un paralelogramo.",
      "Si no hay ningún par de lados paralelos, es un **trapezoide**.",
    ],
    render: (beat) => (
      <Canvas>
        {items.map((it, i) => (
          <Fade key={it.title} show={beat === i} dy={8}>
            <Shape q={it.q} color={it.color}>{it.extra}</Shape>
            <Diagonals q={it.q} show={i === 0 || i >= 1} />
            <Txt x={470} y={170} size={32} color={it.color} anchor="start">{it.title}</Txt>
            <Txt x={470} y={216} size={22} color={MANIM.ink} anchor="start">{it.rule}</Txt>
          </Fade>
        ))}
      </Canvas>
    ),
  };
}

/* ───────────── Trapecios: bases, altura y tipos ───────────── */

const TR_GEN: Quad = [[60, 340], [400, 340], [280, 150], [110, 150]];
const TR_REC: Quad = [[80, 340], [400, 340], [300, 150], [80, 150]];
const TR_ISO: Quad = [[60, 340], [400, 340], [330, 150], [130, 150]];

export function buildTrapecioTipos(): AnimBuild {
  const items = [
    { q: TR_GEN, title: "Trapecio", color: MANIM.purple },
    { q: TR_GEN, title: "Base y altura", color: MANIM.purple },
    { q: TR_REC, title: "Trapecio rectángulo", color: MANIM.orange },
    { q: TR_ISO, title: "Trapecio isósceles", color: MANIM.green },
  ];
  const q = TR_GEN;
  return {
    label: "Trapecio con sus bases y su altura, trapecio rectángulo y trapecio isósceles",
    captions: [
      "Un **trapecio** tiene dos lados paralelos y otros dos que no lo son.",
      "Los lados paralelos son las **bases**; la **altura** es la distancia perpendicular entre ellas.",
      "Si tiene **dos ángulos rectos**, es un trapecio **rectángulo**: uno de los lados no paralelos hace de altura.",
      "Si los dos lados **no paralelos son iguales**, es un trapecio **isósceles**.",
    ],
    render: (beat) => (
      <Canvas>
        {items.map((it, i) => (
          <Fade key={i} show={beat === i} dy={8}>
            <Shape q={it.q} color={it.color} />
            <Txt x={470} y={170} size={30} color={it.color} anchor="start">{it.title}</Txt>
          </Fade>
        ))}
        <Fade show={beat === 0 || beat === 1}>
          <ParMark a={q[0]} b={q[1]} color={MANIM.purple} />
          <ParMark a={q[3]} b={q[2]} color={MANIM.purple} />
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={(q[0][0] + q[1][0]) / 2} y={q[0][1] + 34} size={24} color={MANIM.yellow}>base mayor</Txt>
          <Txt x={(q[3][0] + q[2][0]) / 2} y={q[3][1] - 14} size={24} color={MANIM.yellow}>base menor</Txt>
          <Seg a={[q[3][0] + 40, q[3][1]]} b={[q[3][0] + 40, q[0][1]]} color={MANIM.yellow} width={3.5} dashed />
          <RightMark v={[q[3][0] + 40, q[0][1]]} a={180} b={90} size={14} color={MANIM.yellow} />
          <Txt x={q[3][0] + 62} y={250} size={26} color={MANIM.yellow} anchor="start">altura</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <RightMark v={TR_REC[0]} a={0} b={90} size={20} color={MANIM.orange} />
          <RightMark v={TR_REC[3]} a={270} b={0} size={20} color={MANIM.orange} />
          <ParMark a={TR_REC[0]} b={TR_REC[1]} color={MANIM.orange} />
          <ParMark a={TR_REC[3]} b={TR_REC[2]} color={MANIM.orange} />
        </Fade>
        <Fade show={beat === 3}>
          <TickMark a={TR_ISO[1]} b={TR_ISO[2]} color={MANIM.green} />
          <TickMark a={TR_ISO[3]} b={TR_ISO[0]} color={MANIM.green} />
          <ParMark a={TR_ISO[0]} b={TR_ISO[1]} color={MANIM.green} />
          <ParMark a={TR_ISO[3]} b={TR_ISO[2]} color={MANIM.green} />
        </Fade>
      </Canvas>
    ),
  };
}
