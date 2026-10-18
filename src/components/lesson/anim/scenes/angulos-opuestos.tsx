import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, Wedge, WedgeLabel, lineThrough, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const O: Pt = [400, 210];
const D1 = 20;
const D2 = 100;
const [L1A, L1B] = lineThrough(O, D1, 330);
const [L2A, L2B] = lineThrough(O, D2, 200);

/** Dos rectas que se cortan: los opuestos por el vértice son iguales y los consecutivos suman 180°. */
export function buildAngulosOpuestos(): AnimBuild {
  const a = D2 - D1;
  const b = 180 - a;
  const W: [number, number, number][] = [
    [D1, D2, a],
    [D2, D1 + 180, b],
    [D1 + 180, D2 + 180, a],
    [D2 + 180, D1 + 360, b],
  ];
  const col = [MANIM.blue, MANIM.orange, MANIM.blue, MANIM.orange];
  return {
    label: "Dos rectas secantes forman cuatro ángulos: los opuestos por el vértice son iguales y los consecutivos suman 180 grados",
    captions: [
      "Dos rectas que se cortan en $O$ forman **cuatro ángulos**.",
      "Los ángulos **opuestos por el vértice** (en lados contrarios) son **iguales**: $80^\\circ$ y $80^\\circ$.",
      "Pasa igual con la otra pareja: $100^\\circ$ y $100^\\circ$.",
      "Dos ángulos **consecutivos** (comparten vértice y un lado) completan un ángulo llano: $80^\\circ + 100^\\circ = 180^\\circ$.",
    ],
    render: (beat) => {
      const on = (i: number) => (beat === 0 ? true : beat === 1 ? i % 2 === 0 : beat === 2 ? i % 2 === 1 : i < 2);
      return (
        <Canvas>
          {W.map(([a0, a1, v], i) => (
            <g key={i}>
              <Wedge c={O} r={78} a0={a0} a1={a1} color={col[i]!} show={on(i)} opacity={beat === 0 ? 0.18 : 0.42} />
              <Fade show={on(i) && beat > 0}>
                <WedgeLabel c={O} r={54} a0={a0} a1={a1} text={`${v}°`} size={24} color={col[i]!} />
              </Fade>
            </g>
          ))}
          <Seg a={L1A} b={L1B} width={4} />
          <Seg a={L2A} b={L2B} width={4} />
          <Dot p={O} color={MANIM.yellow} r={7} />
          <Txt x={O[0] - 26} y={O[1] + 36} size={26} color={MANIM.yellow}>O</Txt>
          <Fade show={beat === 3} dy={8}>
            <Txt x={170} y={60} size={30} color={MANIM.yellow}>{`${a}° + ${b}° = 180°`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
