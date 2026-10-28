import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Planos de proyección, punto y abatimiento ───────────── */

const LTY = 220;
const X1 = 150;
const X2 = 650;
const PX = 445; // posición lateral del punto
const COTA = 112; // píxeles
const ALEJ = 2; // unidades de profundidad
const DEPTH = 3.5;
/** Vector de profundidad por unidad (hacia abajo-izquierda en la perspectiva y hacia abajo al abatir). */
const DV: Pt[] = [
  [-20, 35],
  [-20, 35],
  [-10, 37.5],
  [0, 40],
];

export function buildAbatimientoDiedrico(): AnimBuild {
  return {
    label: "Sistema diédrico: planos de proyección, proyecciones de un punto y abatimiento del PH",
    beatMs: 5600,
    captions: [
      "El sistema **diédrico** utiliza dos planos perpendiculares: el **vertical (PV)** y el **horizontal (PH)**. Se cortan en la **línea de tierra (LT)**.",
      "Un punto **P** se proyecta **ortogonalmente** sobre ambos planos: **P′** en el PV (proyección **vertical**) y **a** en el PH (proyección **horizontal**). La distancia al PH es la **cota**; la distancia al PV, el **alejamiento**.",
      "Para dibujar en el papel se **gira el PH 90°** alrededor de la LT hasta hacerlo coincidir con el PV: es el **abatimiento**.",
      "El resultado es la **épura**: P′ y a quedan en la misma **línea de referencia**, perpendicular a la LT. **Dos proyecciones** definen el punto.",
    ],
    render: (beat) => {
      const dv = DV[beat]!;
      const f = (u: number, y = 0): Pt => [u, LTY + y];
      const phPts = [f(X1), f(X2), [X2 + DEPTH * dv[0], LTY + DEPTH * dv[1]] as Pt, [X1 + DEPTH * dv[0], LTY + DEPTH * dv[1]] as Pt];
      const aPos: Pt = [PX + ALEJ * dv[0], LTY + ALEJ * dv[1]];
      const pPrime: Pt = [PX, LTY - COTA];
      const pSpace: Pt = [aPos[0], aPos[1] - COTA];
      return (
        <Canvas>
          <polygon points={`${X1},${LTY - 160} ${X2},${LTY - 160} ${X2},${LTY} ${X1},${LTY}`} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={2} />
          <polygon points={phPts.map((p) => p.join(",")).join(" ")} fill={MANIM.orange} fillOpacity={0.12} stroke={MANIM.orange} strokeWidth={2} className="anim-t" />
          <Seg a={[X1 - 30, LTY]} b={[X2 + 30, LTY]} color={MANIM.ink} width={3.5} />
          <Txt x={X2 + 46} y={LTY + 6} size={22}>LT</Txt>
          <Txt x={X1 + 40} y={LTY - 138} size={22} color={MANIM.blue}>PV</Txt>
          <Txt x={(phPts[3]![0] + phPts[2]![0]) / 2 + 40} y={(phPts[3]![1] + 20)} size={22} color={MANIM.orange}>PH</Txt>
          <Fade show={beat === 1}>
            <Seg a={pSpace} b={pPrime} color={MANIM.muted} width={2} dashed />
            <Seg a={pSpace} b={aPos} color={MANIM.muted} width={2} dashed />
            <Dot p={pSpace} color={MANIM.green} r={7} />
            <Txt x={pSpace[0] - 18} y={pSpace[1] - 8} size={24} color={MANIM.green}>P</Txt>
          </Fade>
          <Fade show={beat >= 1}>
            <Dot p={pPrime} color={MANIM.blue} r={6} />
            <Txt x={pPrime[0] + 22} y={pPrime[1] - 4} size={24} color={MANIM.blue}>P′</Txt>
            <Dot p={aPos} color={MANIM.orange} r={6} />
            <Txt x={aPos[0] + 20} y={aPos[1] + 6} size={24} color={MANIM.orange}>a</Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={110} y={LTY + 150} size={22} color={MANIM.green}>⟲ giro del PH</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Seg a={pPrime} b={aPos} color={MANIM.green} width={3} dashed />
            <Txt x={PX + 140} y={LTY + 112} size={20} color={MANIM.green}>línea de referencia</Txt>
            <Txt x={PX + 90} y={LTY - 100} size={20} color={MANIM.blue}>cota</Txt>
            <Txt x={PX + 100} y={LTY + 36} size={20} color={MANIM.orange}>alejamiento</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
