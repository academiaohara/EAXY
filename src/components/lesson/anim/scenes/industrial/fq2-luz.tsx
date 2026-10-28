import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 400;
const CY = 210;
const L = 170;

/** Rayo de luz que llega a la frontera entre aire y agua: reflexión y refracción. */
export function buildRayoLuz(): AnimBuild {
  const i = (50 * Math.PI) / 180;
  const r = Math.asin(Math.sin(i) / 1.33);
  const pIn: [number, number] = [CX - L * Math.sin(i), CY - L * Math.cos(i)];
  const pRef: [number, number] = [CX + L * Math.sin(i), CY - L * Math.cos(i)];
  const pOut: [number, number] = [CX + L * Math.sin(r), CY + L * Math.cos(r)];
  return {
    label: "Un rayo de luz que pasa del aire al agua se refleja y se refracta",
    beatMs: 5200,
    captions: [
      "Un **rayo de luz** viaja por el **aire** y llega a la **superficie del agua**.",
      "Se dibuja la **normal**, perpendicular a la superficie. Los ángulos se miden **desde ella**.",
      "Parte de la luz **rebota**: es la **reflexión**, con ángulo de reflexión **igual** al de incidencia.",
      "El resto **entra en el agua** y cambia de dirección: es la **refracción**.",
      "En el agua la luz va **más lenta**, así que el rayo se **acerca a la normal**: ángulo de refracción **menor**.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={100} y={CY} width={600} height={170} fill={MANIM.blue} fillOpacity={0.2} />
        <Seg a={[100, CY]} b={[700, CY]} color={MANIM.ink} width={3} />
        <Txt x={140} y={CY - 14} size={18} color={MANIM.muted}>aire</Txt>
        <Txt x={140} y={CY + 28} size={18} color={MANIM.muted}>agua</Txt>
        <Seg a={pIn} b={[CX, CY]} color={MANIM.yellow} width={5} />
        <Dot p={[CX, CY]} r={6} color={MANIM.ink} />
        <Fade show={beat >= 1}>
          <Seg a={[CX, CY - 190]} b={[CX, CY + 160]} color={MANIM.muted} width={2} />
          <Txt x={CX + 40} y={CY - 180} size={18} color={MANIM.muted}>normal</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={[CX, CY]} b={pRef} color={MANIM.green} width={4} />
          <Txt x={CX + 120} y={CY - 150} size={18} color={MANIM.green}>reflejado</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={[CX, CY]} b={pOut} color={MANIM.orange} width={5} />
          <Txt x={CX + 150} y={CY + 135} size={18} color={MANIM.orange}>refractado</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={CX - 190} y={CY - 110} size={20} color={MANIM.yellow}>i = 50°</Txt>
          <Txt x={CX + 110} y={CY + 55} size={20} color={MANIM.orange}>r ≈ 35°</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
