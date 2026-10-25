import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, mapX, mapY, type PlotArea } from "@/components/lesson/anim/graph";

const pts = (area: PlotArea, p: [number, number][]) => p.map(([x, y]) => `${mapX(area, x)},${mapY(area, y)}`).join(" ");

/** Inecuación 2x + y ≤ 8: la recta divide el plano; un punto de prueba decide el semiplano. */
export function buildSemiplanoPrueba(): AnimBuild {
  const area: PlotArea = { left: 90, bottom: 350, ux: 65, uy: 36, xMin: -1, yMin: -1 };
  const linea = (dashed: boolean) => (
    <line x1={mapX(area, 0)} y1={mapY(area, 8)} x2={mapX(area, 4.5)} y2={mapY(area, -1)} stroke={MANIM.blue} strokeWidth={4} strokeDasharray={dashed ? "10 8" : undefined} />
  );
  return {
    label: "Semiplano de una inecuación",
    captions: [
      "La recta $2x + y = 8$ divide el plano en **dos semiplanos**. Uno cumple $2x + y < 8$ y el otro $2x + y > 8$.",
      "Se toma un **punto de prueba**: $(0, 0)$ da $2\\cdot0 + 0 = 0 \\leq 8$ ✓. Luego la solución de $2x + y \\leq 8$ es el semiplano que contiene al origen.",
      "Comprobación con $(5, 3)$: $2\\cdot5 + 3 = 13 \\leq 8$ es **falso**, y el punto está en el otro semiplano.",
      "Si la desigualdad es **estricta** ($<$) la recta no pertenece a la solución y se dibuja **discontinua**; con $\\leq$ la recta sí pertenece (trazo continuo).",
    ],
    beatMs: 5600,
    render: (beat) => (
      <Canvas>
        <Axes area={area} xMax={6} yMax={8.5} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <Fade show={beat >= 1}>
          <polygon points={pts(area, [[-1, -1], [4.5, -1], [0, 8], [-1, 8]])} fill={MANIM.green} fillOpacity={0.28} />
        </Fade>
        {linea(beat === 3)}
        <Txt x={mapX(area, 2.3)} y={mapY(area, 5.4)} size={22} color={MANIM.blue} anchor="start">2x + y = 8</Txt>
        <Fade show={beat >= 1}>
          <circle cx={mapX(area, 0)} cy={mapY(area, 0)} r={8} fill={MANIM.green} />
          <Txt x={mapX(area, 0.2)} y={mapY(area, 0) - 14} size={20} color={MANIM.green} anchor="start">(0, 0) ✓</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <circle cx={mapX(area, 5)} cy={mapY(area, 3)} r={8} fill={MANIM.red} />
          <Txt x={mapX(area, 5.2)} y={mapY(area, 3) - 14} size={20} color={MANIM.red} anchor="start">(5, 3) ✗</Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={560} y={110} size={22} color={MANIM.yellow} anchor="end">2x + y &lt; 8</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Rectas de nivel de Z = 30x + 20y sobre la región x + y ≤ 6, 2x + y ≤ 8: el máximo es 140 en (2, 4). */
export function buildRectasNivel(): AnimBuild {
  const area: PlotArea = { left: 90, bottom: 360, ux: 60, uy: 45, xMin: 0, yMin: 0 };
  const region: [number, number][] = [[0, 0], [4, 0], [2, 4], [0, 6]];
  const nivel = (z: number, color: string, label?: string) => (
    <g key={z}>
      <line x1={mapX(area, 0)} y1={mapY(area, z / 20)} x2={mapX(area, z / 30)} y2={mapY(area, 0)} stroke={color} strokeWidth={3.5} strokeDasharray="9 6" />
      {label ? <Txt x={mapX(area, z / 30) + 10} y={mapY(area, 0) - 12} size={20} color={color} anchor="start">{label}</Txt> : null}
    </g>
  );
  return {
    label: "Rectas de nivel y óptimo",
    captions: [
      "Región factible de $x + y \\leq 6$, $2x + y \\leq 8$, $x, y \\geq 0$. Sus **vértices** son $(0,0)$, $(4,0)$, $(2,4)$ y $(0,6)$. Queremos maximizar $Z = 30x + 20y$.",
      "Cada **recta de nivel** $30x + 20y = Z$ reúne los puntos con el mismo valor de $Z$. Para $Z = 60$ pasa por $(2, 0)$ y $(0, 3)$.",
      "Todas las rectas de nivel son **paralelas**. Al aumentar $Z$ se desplazan hacia arriba: $Z = 120$ pasa por $(4, 0)$ y $(0, 6)$.",
      "Se sigue desplazando mientras la recta toque la región. Con $Z = 140$ solo toca el vértice $(2, 4)$: **máximo $= 140$** en ese punto.",
    ],
    beatMs: 5800,
    render: (beat) => (
      <Canvas>
        <Axes area={area} xMax={7} yMax={7} xStep={1} yStep={1} xLabel="x" yLabel="y" />
        <polygon points={pts(area, region)} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={3} />
        {region.map(([x, y]) => <circle key={`${x}-${y}`} cx={mapX(area, x)} cy={mapY(area, y)} r={6} fill={MANIM.ink} />)}
        <Fade show={beat === 1}>{nivel(60, MANIM.yellow, "Z = 60")}</Fade>
        <Fade show={beat === 2}>
          {nivel(60, MANIM.muted)}
          {nivel(120, MANIM.yellow, "Z = 120")}
        </Fade>
        <Fade show={beat === 3}>
          {nivel(60, MANIM.muted)}
          {nivel(120, MANIM.muted)}
          {nivel(140, MANIM.red, "Z = 140")}
          <circle cx={mapX(area, 2)} cy={mapY(area, 4)} r={9} fill={MANIM.red} />
          <Txt x={mapX(area, 2) + 14} y={mapY(area, 4) - 12} size={22} color={MANIM.red} anchor="start">(2, 4)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
