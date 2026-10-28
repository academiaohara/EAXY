import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Cubo en perspectiva isométrica ───────────── */

const O: Pt = [400, 235];
const L = 105;
const VX: Pt = [-0.866 * L, 0.5 * L];
const VY: Pt = [0.866 * L, 0.5 * L];
const VZ: Pt = [0, -L];
const P = (x: number, y: number, z: number): Pt => [O[0] + x * VX[0] + y * VY[0] + z * VZ[0], O[1] + x * VX[1] + y * VY[1] + z * VZ[1]];
const pts = (a: Pt[]) => a.map((p) => p.join(",")).join(" ");
/** Circunferencia inscrita en una cara del cubo (puntos de la elipse). */
function circulo(plano: "xy" | "xz" | "yz"): Pt[] {
  const out: Pt[] = [];
  for (let i = 0; i <= 60; i++) {
    const t = (2 * Math.PI * i) / 60;
    const c = 0.5 + 0.5 * Math.cos(t);
    const d = 0.5 + 0.5 * Math.sin(t);
    out.push(plano === "xy" ? P(c, d, 1) : plano === "xz" ? P(1, c, d) : P(c, 1, d));
  }
  return out;
}

export function buildCuboIsometrico(): AnimBuild {
  return {
    label: "Perspectiva isométrica de un cubo: ejes a 120°, medidas sobre los ejes y circunferencias convertidas en elipses",
    beatMs: 5400,
    captions: [
      "En la perspectiva **isométrica** los tres ejes **X, Y, Z** forman **120°** entre sí: **Z** es vertical y **X** e **Y** bajan a 30° de la horizontal.",
      "Las **medidas** de aristas paralelas a los ejes se llevan **directamente** sobre ellos (coeficiente 1 en el dibujo isométrico).",
      "Se dibuja la **base** con rectas paralelas a X e Y: los lados paralelos en el espacio **siguen siendo paralelos** en el dibujo.",
      "Se levantan las **aristas verticales** y se cierra la cara superior. Las aristas **ocultas** se dibujan discontinuas.",
      "Las **circunferencias** inscritas en las caras se ven como **elipses**; su eje mayor es **perpendicular al eje** que no está en esa cara.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={O} b={[O[0], O[1] - 1.5 * L]} color={MANIM.blue} width={3} />
        <Seg a={O} b={[O[0] + 1.5 * VX[0], O[1] + 1.5 * VX[1]]} color={MANIM.orange} width={3} />
        <Seg a={O} b={[O[0] + 1.5 * VY[0], O[1] + 1.5 * VY[1]]} color={MANIM.green} width={3} />
        <Txt x={O[0]} y={O[1] - 1.5 * L - 12} size={24} color={MANIM.blue}>Z</Txt>
        <Txt x={O[0] + 1.5 * VX[0] - 18} y={O[1] + 1.5 * VX[1] + 8} size={24} color={MANIM.orange}>X</Txt>
        <Txt x={O[0] + 1.5 * VY[0] + 18} y={O[1] + 1.5 * VY[1] + 8} size={24} color={MANIM.green}>Y</Txt>
        <Dot p={O} r={5} />
        <Fade show={beat === 0}>
          <Txt x={O[0] - 150} y={O[1] - 20} size={22} color={MANIM.yellow}>120°</Txt>
          <Txt x={O[0] + 150} y={O[1] - 20} size={22} color={MANIM.yellow}>120°</Txt>
          <Txt x={O[0]} y={O[1] + 100} size={22} color={MANIM.yellow}>120°</Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Dot p={P(1, 0, 0)} color={MANIM.orange} r={6} />
          <Dot p={P(0, 1, 0)} color={MANIM.green} r={6} />
          <Dot p={P(0, 0, 1)} color={MANIM.blue} r={6} />
          <Txt x={O[0] + 140} y={O[1] - 80} size={20} color={MANIM.muted}>unidad = medida real</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={P(1, 0, 0)} b={P(1, 1, 0)} color={MANIM.ink} width={3} />
          <Seg a={P(0, 1, 0)} b={P(1, 1, 0)} color={MANIM.ink} width={3} />
        </Fade>
        <Fade show={beat >= 3}>
          <polygon points={pts([P(0, 0, 1), P(1, 0, 1), P(1, 1, 1), P(0, 1, 1)])} fill={MANIM.blue} fillOpacity={0.28} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={pts([P(1, 0, 0), P(1, 1, 0), P(1, 1, 1), P(1, 0, 1)])} fill={MANIM.orange} fillOpacity={0.22} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
          <polygon points={pts([P(0, 1, 0), P(1, 1, 0), P(1, 1, 1), P(0, 1, 1)])} fill={MANIM.green} fillOpacity={0.22} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
        </Fade>
        <Fade show={beat >= 4}>
          <polygon points={pts(circulo("xy"))} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <polygon points={pts(circulo("xz"))} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <polygon points={pts(circulo("yz"))} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
        </Fade>
      </Canvas>
    ),
  };
}
