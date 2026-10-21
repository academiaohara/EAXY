import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";
import type { AnimBuild } from "@/components/lesson/anim/types";

const AREA: PlotArea = { left: 110, bottom: 378, ux: 60, uy: 40, xMin: -1, yMin: -1 };
const X_MAX = 9;
const Y_MAX = 7;

type Line = { a: number; b: number; c: number; color: string; label: string };

const CASES = {
  unica: {
    lines: [
      { a: 2, b: -3, c: 3, color: MANIM.blue, label: "2x − 3y = 3" },
      { a: 5, b: 3, c: 18, color: MANIM.orange, label: "5x + 3y = 18" },
    ] as Line[],
    verdict: "Se cortan en (3, 1): una única solución",
    texto: "Las rectas se cortan en **un punto**, $(3, 1)$: es la única solución. Sistema **compatible determinado**.",
  },
  incompatible: {
    lines: [
      { a: 2, b: 3, c: 15, color: MANIM.blue, label: "2x + 3y = 15" },
      { a: 2, b: 3, c: 9, color: MANIM.orange, label: "2x + 3y = 9" },
    ] as Line[],
    verdict: "Paralelas: sin solución",
    texto: "Las rectas son **paralelas**: no tienen ningún punto común. Sistema **incompatible**.",
  },
  indeterminado: {
    lines: [
      { a: 2, b: 3, c: 15, color: MANIM.blue, label: "2x + 3y = 15" },
      { a: 4, b: 6, c: 30, color: MANIM.orange, label: "4x + 6y = 30" },
    ] as Line[],
    verdict: "Coincidentes: infinitas soluciones",
    texto: "Las dos ecuaciones dicen lo mismo: son **la misma recta**. Sistema **indeterminado**, con infinitas soluciones.",
  },
};

/** Sistema de dos ecuaciones lineales: dos rectas que se cortan, son paralelas o coinciden. */
export function buildSistemaRectas(params: { sys?: "unica" | "incompatible" | "indeterminado" }): AnimBuild {
  const kind = params.sys ?? "unica";
  const { lines, verdict, texto } = CASES[kind];
  const draw = (l: Line) => {
    const f = (x: number) => (l.c - l.a * x) / l.b;
    let x1 = -1;
    let x2 = X_MAX;
    // recorta el tramo visible
    const ys = [f(x1), f(x2)];
    if (Math.max(...ys) > Y_MAX || Math.min(...ys) < -1) {
      const xs = [(l.c - l.b * Y_MAX) / l.a, (l.c + l.b) / l.a];
      x1 = Math.max(-1, Math.min(...xs));
      x2 = Math.min(X_MAX, Math.max(...xs));
    }
    return { x1: mapX(AREA, x1), y1: mapY(AREA, f(x1)), x2: mapX(AREA, x2), y2: mapY(AREA, f(x2)) };
  };
  const segs = lines.map(draw);
  return {
    label: `Sistema de dos ecuaciones lineales: ${verdict}`,
    captions: [
      `La primera ecuación, $${lines[0]!.label.replace(/−/g, "-")}$, es una **recta**: cada punto es una solución suya.`,
      `La segunda, $${lines[1]!.label.replace(/−/g, "-")}$, es otra recta. La solución del sistema es lo que tienen **en común**.`,
      texto,
    ],
    render: (beat) => (
      <Canvas>
        <Axes area={AREA} xMax={X_MAX} yMax={Y_MAX} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <line {...segs[0]!} stroke={lines[0]!.color} strokeWidth={kind === "indeterminado" && beat >= 1 ? 9 : 5} strokeLinecap="round" />
        <Txt x={620} y={70} size={22} color={lines[0]!.color} anchor="start">{lines[0]!.label}</Txt>
        <Fade show={beat >= 1}>
          <line {...segs[1]!} stroke={lines[1]!.color} strokeWidth={4} strokeLinecap="round" strokeDasharray={kind === "indeterminado" ? "10 8" : undefined} />
          <Txt x={620} y={100} size={22} color={lines[1]!.color} anchor="start">{lines[1]!.label}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          {kind === "unica" ? (
            <g>
              <circle cx={mapX(AREA, 3)} cy={mapY(AREA, 1)} r={10} fill={MANIM.green} stroke={MANIM.surface} strokeWidth={3} />
              <Txt x={mapX(AREA, 3) + 16} y={mapY(AREA, 1) - 14} size={24} color={MANIM.green} anchor="start">(3, 1)</Txt>
            </g>
          ) : null}
          <Txt x={400} y={36} size={24} color={MANIM.yellow}>{verdict}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
