import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const C: Pt = [250, 215];
const COLORS = [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple, MANIM.yellow, MANIM.red];

/** Vértices de un polígono regular de `n` lados con un vértice abajo a la izquierda. */
export function polygonPoints(c: Pt, r: number, n: number, rot = 90): Pt[] {
  return Array.from({ length: n }, (_, i) => polar(c, r, rot + (360 / n) * i));
}

/** Polígono de `n` lados partido en n − 2 triángulos desde un vértice. */
export function TriangulatedPolygon({ n, c = C, r = 150, show = true, tint = true }: { n: number; c?: Pt; r?: number; show?: boolean; tint?: boolean }) {
  const pts = polygonPoints(c, r, n);
  return (
    <g className="anim-t" style={{ opacity: show ? 1 : 0 }}>
      {Array.from({ length: n - 2 }, (_, i) => (
        <polygon
          key={i}
          points={[pts[0]!, pts[i + 1]!, pts[i + 2]!].map((p) => p.join(",")).join(" ")}
          fill={COLORS[i % COLORS.length]}
          fillOpacity={tint ? 0.32 : 0.12}
          stroke="none"
        />
      ))}
      {Array.from({ length: n - 3 }, (_, i) => (
        <Seg key={i} a={pts[0]!} b={pts[i + 2]!} color={MANIM.muted} width={2.5} dashed />
      ))}
      <polygon points={pts.map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
    </g>
  );
}

const NAMES: Record<number, string> = { 4: "cuadrilátero", 5: "pentágono", 6: "hexágono" };

/** Suma de ángulos de un polígono: n − 2 triángulos de 180° cada uno. */
export function buildPoligonoTriangulos(): AnimBuild {
  return {
    label: "Un cuadrilátero, un pentágono y un hexágono partidos en triángulos desde un vértice; la suma de ángulos es (n − 2) · 180",
    captions: [
      "Un **cuadrilátero** se parte con una diagonal en $2$ triángulos: $2 \\cdot 180^\\circ = 360^\\circ$.",
      "Un **pentágono** se parte en $3$ triángulos: $3 \\cdot 180^\\circ = 540^\\circ$.",
      "Un **hexágono** se parte en $4$ triángulos: $4 \\cdot 180^\\circ = 720^\\circ$.",
      "Siempre sobran dos: un polígono de $n$ lados se parte en $n-2$ triángulos, y sus ángulos suman $(n-2)\\cdot 180^\\circ$.",
      "Si el polígono es **regular**, todos sus ángulos son iguales: el hexágono regular tiene $720^\\circ : 6 = 120^\\circ$ en cada vértice.",
    ],
    render: (beat) => {
      const n = beat === 0 ? 4 : beat === 1 ? 5 : 6;
      return (
        <Canvas>
          {[4, 5, 6].map((k) => (
            <TriangulatedPolygon key={k} n={k} show={n === k} />
          ))}
          <Fade show={beat <= 2} dy={6}>
            <Txt x={470} y={110} size={34} color={MANIM.yellow} anchor="start">{NAMES[n]}</Txt>
            <Txt x={470} y={166} size={28} color={MANIM.ink} anchor="start">{`n = ${n} lados`}</Txt>
            <Txt x={470} y={214} size={28} color={MANIM.ink} anchor="start">{`${n - 2} triángulos`}</Txt>
            <Txt x={470} y={270} size={30} color={MANIM.green} anchor="start">{`${n - 2} · 180° = ${(n - 2) * 180}°`}</Txt>
          </Fade>
          <Fade show={beat >= 3} dy={6}>
            <Txt x={470} y={150} size={32} color={MANIM.yellow} anchor="start">n lados</Txt>
            <Txt x={470} y={200} size={30} color={MANIM.ink} anchor="start">n − 2 triángulos</Txt>
            <Txt x={470} y={256} size={34} color={MANIM.green} anchor="start">(n − 2) · 180°</Txt>
          </Fade>
          <Fade show={beat === 4} dy={6}>
            <Txt x={470} y={312} size={30} color={MANIM.orange} anchor="start">720° : 6 = 120°</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
