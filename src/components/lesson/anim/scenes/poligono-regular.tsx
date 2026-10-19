import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, TickMark, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const O: Pt = [240, 215];
const R = 150;

/** Vértices de un polígono regular de `n` lados inscrito en la circunferencia de centro `c` y radio `r`. */
export function regularPoints(c: Pt, r: number, n: number, rot = 90): Pt[] {
  return Array.from({ length: n }, (_, i) => polar(c, r, rot + (360 / n) * i));
}

const poly = (p: Pt[]) => p.map((q) => q.join(",")).join(" ");

function Regular({ n, color, rot = 90, show }: { n: number; color: string; rot?: number; show: boolean }) {
  const p = regularPoints(O, R, n, rot);
  return (
    <Fade show={show} dy={6}>
      <polygon points={poly(p)} fill={color} fillOpacity={0.14} stroke={color} strokeWidth={4} strokeLinejoin="round" />
      {p.map((v, i) => (
        <g key={i}>
          <TickMark a={v} b={p[(i + 1) % n]!} color={color} />
          <Dot p={v} color={color} r={5} />
        </g>
      ))}
    </Fade>
  );
}

const NAMES: Record<number, string> = { 3: "Triángulo equilátero", 4: "Cuadrado", 5: "Pentágono regular", 6: "Hexágono regular" };

export function buildPoligonoRegularCircunscrito(): AnimBuild {
  const angle = 108;
  return {
    label: "Un polígono regular tiene lados y ángulos iguales y todos sus vértices están en una circunferencia circunscrita de centro O y radio r",
    captions: [
      "Un polígono **regular** tiene todos sus **lados iguales** y todos sus **ángulos iguales**. Aquí, un pentágono.",
      "Todos sus vértices están a la misma distancia de un punto: pertenecen a una circunferencia, la **circunscrita**.",
      "Su centro $O$ y su radio $r$ son el **centro** y el **radio** del polígono. Pasa igual con el triángulo equilátero…",
      "…con el cuadrado…",
      "…y con el hexágono regular. Cuantos más lados, más se parece el polígono a su circunferencia.",
    ],
    render: (beat) => {
      const n = beat <= 1 ? 5 : beat === 2 ? 3 : beat === 3 ? 4 : 6;
      return (
        <Canvas>
          <Fade show={beat >= 1}>
            <circle cx={O[0]} cy={O[1]} r={R} fill="none" stroke={MANIM.blue} strokeWidth={3} strokeDasharray="10 8" />
            <Dot p={O} color={MANIM.yellow} r={6} />
            <Txt x={O[0] - 18} y={O[1] + 8} size={24} color={MANIM.yellow}>O</Txt>
          </Fade>
          {[3, 4, 5, 6].map((k) => (
            <Regular key={k} n={k} color={[MANIM.green, MANIM.orange, MANIM.purple, MANIM.blue][k - 3]!} show={n === k} />
          ))}
          <Fade show={beat >= 1}>
            {(() => {
              const v = regularPoints(O, R, n)[0]!;
              const mid: Pt = [(O[0] + v[0]) / 2, (O[1] + v[1]) / 2];
              return (
                <>
                  <Seg a={O} b={v} color={MANIM.yellow} width={3.5} />
                  <Txt x={mid[0] + 16} y={mid[1] + 6} size={24} color={MANIM.yellow} anchor="start">r</Txt>
                </>
              );
            })()}
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={O[0] + R + 60} y={190} size={30} color={MANIM.purple} anchor="start">5 lados iguales</Txt>
            <Txt x={O[0] + R + 60} y={236} size={30} color={MANIM.purple} anchor="start">{`5 ángulos de ${angle}°`}</Txt>
          </Fade>
          <Fade show={beat >= 2} dy={6}>
            <Txt x={O[0] + R + 60} y={200} size={32} color={MANIM.ink} anchor="start">{NAMES[n] ?? ""}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Apotema ───────────── */

const OA: Pt = [250, 215];
const RA = 150;

export function buildPoligonoApotema(): AnimBuild {
  const v = regularPoints(OA, RA, 6, 0);
  const vA = v[4]!; // vértice inferior izquierdo del lado de abajo
  const vB = v[5]!;
  const a = RA * Math.cos(Math.PI / 6);
  const M = polar(OA, a, 270);
  return {
    label: "La apotema de un polígono regular es el segmento perpendicular desde el centro al punto medio de un lado; forma un triángulo rectángulo con el radio y media lado",
    captions: [
      "Partimos de un hexágono regular con centro $O$ y radio $r$.",
      "La **apotema** $a$ es el segmento que va del centro, **perpendicular**, a un lado.",
      "Siempre corta al lado en su **punto medio** $M$: hay dos mitades iguales de longitud $\\frac{l}{2}$.",
      "Así aparece un triángulo rectángulo: la hipotenusa es el radio $r$ y los catetos son la apotema $a$ y $\\frac{l}{2}$.",
      "Con Pitágoras, $r^2 = a^2 + \\left(\\frac{l}{2}\\right)^2$. En un hexágono de lado $6$ cm, $r = 6$ y $a = \\sqrt{36-9} \\approx 5{,}2$ cm.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={poly(v)} fill={MANIM.blue} fillOpacity={0.1} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <Dot p={OA} color={MANIM.yellow} r={6} />
        <Txt x={OA[0] - 18} y={OA[1] - 8} size={24} color={MANIM.yellow}>O</Txt>
        <Seg a={OA} b={vB} color={MANIM.orange} width={3.5} />
        <Txt x={(OA[0] + vB[0]) / 2 + 4} y={(OA[1] + vB[1]) / 2 - 8} size={24} color={MANIM.orange} anchor="start">r</Txt>
        <Fade show={beat >= 1}>
          <Seg a={OA} b={M} color={MANIM.green} width={3.5} />
          <Txt x={OA[0] - 14} y={(OA[1] + M[1]) / 2 + 8} size={24} color={MANIM.green} anchor="end">a</Txt>
          <RightMark v={M} a={90} b={0} size={14} color={MANIM.green} />
          <Dot p={M} color={MANIM.green} r={5} />
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={M[0] + 6} y={M[1] + 30} size={22} color={MANIM.green}>M</Txt>
          <Txt x={(vB[0] + M[0]) / 2} y={M[1] + 56} size={22} color={MANIM.yellow}>l/2</Txt>
          <Txt x={(vA[0] + M[0]) / 2} y={M[1] + 56} size={22} color={MANIM.yellow}>l/2</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={poly([OA, M, vB])} fill={MANIM.yellow} fillOpacity={0.22} stroke={MANIM.yellow} strokeWidth={3} strokeLinejoin="round" />
        </Fade>
        <Fade show={beat >= 4} dy={6}>
          <Txt x={470} y={170} size={28} color={MANIM.yellow} anchor="start">r² = a² + (l/2)²</Txt>
          <Txt x={470} y={226} size={24} color={MANIM.ink} anchor="start">l = 6 cm → r = 6 cm</Txt>
          <Txt x={470} y={270} size={26} color={MANIM.green} anchor="start">a = √27 ≈ 5,2 cm</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
