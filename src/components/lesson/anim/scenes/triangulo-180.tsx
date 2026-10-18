import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { ArcStroke, Dot, Seg, Wedge, angleOf, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const A: Pt = [250, 350];
const B: Pt = [560, 350];
const C: Pt = [440, 120];
const AC = angleOf(A, C);
const BC = angleOf(B, C);
const CA = angleOf(C, A);
const CB = angleOf(C, B);
const ANG_A = AC;
const ANG_B = 180 - BC;

/** La suma de los ángulos de un triángulo vale 180°: la paralela por C copia a y b junto a c y forman un llano. */
export function buildTriangulo180(): AnimBuild {
  const r = 46;
  return {
    label: "Prueba de que los tres ángulos de un triángulo suman 180 grados con una paralela por un vértice",
    captions: [
      "Un triángulo cualquiera, con ángulos $a$, $b$ y $c$.",
      "Por el vértice $C$ trazamos la **paralela** al lado opuesto, $AB$.",
      "Por ser **alternos internos**, el ángulo $a$ se repite a la izquierda de $C$ y el ángulo $b$ a la derecha.",
      "En $C$, los tres ángulos juntos forman un ángulo **llano**: $a + b + c = 180^\\circ$.",
    ],
    render: (beat) => (
      <Canvas>
        <Wedge c={A} r={r} a0={0} a1={ANG_A} color={MANIM.blue} opacity={0.5} />
        <Wedge c={B} r={r} a0={180 - ANG_B} a1={180} color={MANIM.green} opacity={0.5} />
        <Wedge c={C} r={r} a0={CA} a1={CB} color={MANIM.orange} opacity={0.5} />
        <Seg a={A} b={B} width={4} />
        <Seg a={B} b={C} width={4} />
        <Seg a={C} b={A} width={4} />
        <Txt x={A[0] + 64} y={A[1] - 12} size={28} color={MANIM.blue}>a</Txt>
        <Txt x={B[0] - 66} y={B[1] - 12} size={28} color={MANIM.green}>b</Txt>
        <Txt x={C[0]} y={C[1] + 68} size={28} color={MANIM.orange}>c</Txt>
        <Txt x={A[0] - 22} y={A[1] + 30} size={26}>A</Txt>
        <Txt x={B[0] + 22} y={B[1] + 30} size={26}>B</Txt>
        <Txt x={C[0] + 4} y={C[1] - 56} size={26}>C</Txt>

        <WriteLine show={beat >= 1} x1={90} y1={C[1]} x2={760} y2={C[1]} color={MANIM.purple} width={3} />
        <Fade show={beat >= 1}>
          <Dot p={C} color={MANIM.yellow} r={6} />
        </Fade>
        <Wedge c={C} r={r} a0={180} a1={CA} color={MANIM.blue} show={beat >= 2} opacity={0.5} />
        <Wedge c={C} r={r} a0={CB} a1={360} color={MANIM.green} show={beat >= 2} opacity={0.5} />
        <Fade show={beat >= 2}>
          <Txt x={C[0] - 96} y={C[1] + 36} size={28} color={MANIM.blue}>a</Txt>
          <Txt x={C[0] + 100} y={C[1] + 36} size={28} color={MANIM.green}>b</Txt>
        </Fade>
        <ArcStroke c={C} r={r + 38} a0={180} a1={360} show={beat >= 3} color={MANIM.yellow} width={4} />
        <Fade show={beat >= 3} dy={8}>
          <Txt x={640} y={210} size={32} color={MANIM.yellow}>a + b + c = 180°</Txt>
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <Txt x={C[0] + 220} y={C[1] - 22} size={22} color={MANIM.purple}>paralela a AB</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

