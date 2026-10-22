import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const O = { x: 120, y: 340 };
// vértices de la figura F relativos a O (px)
const BASE: [number, number][] = [
  [60, -30],
  [130, -45],
  [150, -100],
  [90, -115],
  [40, -80],
];
const NAMES = ["A", "B", "C", "D", "E"];

/** Método de la proyección: cada vértice se lleva a `k` veces su distancia al centro O. `a` = k (2 o 3). */
export function buildHomoteciaProyeccion(params: { a?: number }): AnimBuild {
  const k = Math.min(Math.max(Math.round(params.a ?? 2), 2), 3);
  const P = BASE.map(([dx, dy]) => ({ x: O.x + dx, y: O.y + dy }));
  const Q = BASE.map(([dx, dy]) => ({ x: O.x + k * dx, y: O.y + k * dy }));
  const poly = (pts: { x: number; y: number }[]) => pts.map((p) => `${p.x},${p.y}`).join(" ");

  return {
    label: `Homotecia de centro O y razón ${k}: cada punto se lleva a ${k} veces su distancia al centro`,
    captions: [
      `Queremos **ampliar** la figura $F$ al **${k === 2 ? "doble" : "triple"}**. Elegimos un punto $O$, el **centro de homotecia**.`,
      `Trazamos rectas desde $O$ por cada vértice de la figura.`,
      `Sobre cada recta marcamos el punto a ${k === 2 ? "doble" : "triple"} distancia: $OA' = ${k}\\cdot OA$, $OB' = ${k}\\cdot OB$…`,
      `Unimos los puntos: $F'$ es **semejante** a $F$ con razón de semejanza $${k}$. Además, cada lado de $F'$ es **paralelo** a su correspondiente.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <polygon points={poly(P)} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" />
        {P.map((p, i) => (
          <Txt key={i} x={p.x - 14} y={p.y + 4} size={22} color={MANIM.blue} anchor="end">{NAMES[i]!}</Txt>
        ))}
        <circle cx={O.x} cy={O.y} r={9} fill={MANIM.yellow} />
        <Txt x={O.x - 14} y={O.y + 24} size={26} color={MANIM.yellow} anchor="end">O</Txt>
        <Fade show={beat >= 1}>
          {Q.map((q, i) => (
            <line key={i} x1={O.x} y1={O.y} x2={q.x} y2={q.y} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="8 6" />
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          {Q.map((q, i) => (
            <g key={i}>
              <circle cx={q.x} cy={q.y} r={7} fill={MANIM.orange} />
              <Txt x={q.x + 14} y={q.y - 8} size={22} color={MANIM.orange} anchor="start">{`${NAMES[i]}'`}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={poly(Q)} fill={MANIM.orange} fillOpacity={0.2} stroke={MANIM.orange} strokeWidth={5} strokeLinejoin="round" />
          <Txt x={680} y={380} size={28} color={MANIM.orange}>{`F' = ${k}·F`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
