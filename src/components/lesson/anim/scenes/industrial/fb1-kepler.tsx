import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const E = 0.6;
const AX = 300;
const BX = AX * Math.sqrt(1 - E * E);
const CX = 400;
const CY = 215;
const SUN: [number, number] = [CX + AX * E, CY];
const rr = (th: number): number => (AX * (1 - E * E)) / (1 + E * Math.cos(th));
const pt = (th: number): [number, number] => [SUN[0] + rr(th) * Math.cos(th), SUN[1] - rr(th) * Math.sin(th)];
const area = (a: number, b: number): number => {
  let s = 0;
  const n = 200;
  for (let i = 0; i < n; i++) {
    const t = a + ((i + 0.5) / n) * (b - a);
    s += 0.5 * rr(t) ** 2 * ((b - a) / n);
  }
  return s;
};
const sector = (a: number, b: number): string => {
  const n = 24;
  const pts = Array.from({ length: n + 1 }, (_, i) => pt(a + ((b - a) * i) / n).join(",")).join(" ");
  return `${SUN.join(",")} ${pts}`;
};
const D1 = 0.5;
const A1 = area(-D1, D1);
const D2 = (() => {
  let lo = 0.001;
  let hi = 1.5;
  for (let i = 0; i < 40; i++) {
    const mid = (lo + hi) / 2;
    if (area(Math.PI - mid, Math.PI + mid) < A1) lo = mid;
    else hi = mid;
  }
  return lo;
})();

/** Leyes de Kepler: órbita elíptica, áreas iguales y velocidades. */
export function buildKepler(): AnimBuild {
  return {
    label: "Leyes de Kepler: elipse, áreas iguales en tiempos iguales y velocidad orbital",
    beatMs: 5600,
    captions: [
      "**1.ª ley**: el planeta describe una **elipse** y el Sol ocupa uno de sus **focos**. El punto más cercano es el **perihelio**; el más lejano, el **afelio**.",
      "**2.ª ley**: el radio vector Sol-planeta barre **áreas iguales en tiempos iguales**. Los dos sectores tienen la misma área, y se recorren en el mismo tiempo.",
      "Por eso el planeta va **más rápido en el perihelio** y **más lento en el afelio**: recorre un arco largo cerca y uno corto lejos.",
      "Es la **conservación del momento angular**: la fuerza gravitatoria es **central**, así que **r·v·sen φ = constante**.",
      "**3.ª ley**: **T² = k·a³**, con la misma k para todos los planetas. Cuanto mayor es el semieje **a**, mayor es el periodo **T**.",
    ],
    render: (beat) => (
      <Canvas>
        <ellipse cx={CX} cy={CY} rx={AX} ry={BX} fill="none" stroke={MANIM.muted} strokeWidth={3} />
        <circle cx={SUN[0]} cy={SUN[1]} r={16} fill={MANIM.yellow} />
        <circle cx={CX - AX * E} cy={CY} r={4} fill={MANIM.muted} />
        <Fade show={beat === 0 || beat >= 4}>
          <Txt x={SUN[0] + 110} y={CY - 28} size={18} color={MANIM.green}>perihelio</Txt>
          <Txt x={CX - AX + 10} y={CY - 28} size={18} color={MANIM.orange}>afelio</Txt>
        </Fade>
        <circle cx={pt(0)[0]} cy={pt(0)[1]} r={9} fill={MANIM.blue} />
        <Fade show={beat >= 1 && beat <= 3}>
          <polygon points={sector(-D1, D1)} fill={MANIM.green} fillOpacity={0.45} stroke={MANIM.green} strokeWidth={2} />
          <polygon points={sector(Math.PI - D2, Math.PI + D2)} fill={MANIM.orange} fillOpacity={0.45} stroke={MANIM.orange} strokeWidth={2} />
          <Txt x={CX} y={60} size={22} color={MANIM.ink}>áreas iguales → tiempos iguales</Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={SUN[0] + 90} y={CY + 80} size={20} color={MANIM.green}>v grande</Txt>
          <Txt x={CX - AX + 50} y={CY + 60} size={20} color={MANIM.orange}>v pequeña</Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={CX} y={380} size={22} color={MANIM.yellow}>L = m·r·v·sen φ = constante</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={CX} y={380} size={26} color={MANIM.yellow}>T² / a³ = constante</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
