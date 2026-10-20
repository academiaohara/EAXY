import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Superficie de la esfera = superficie lateral del cilindro que la envuelve: 2πR · 2R = 4πR². */
export function buildEsferaCilindro(): AnimBuild {
  const cx = 400;
  const cy = 215;
  const R = 130;
  return {
    label: "El área de la esfera es la del cilindro que la envuelve",
    beatMs: 3400,
    captions: [
      "Una **esfera** de radio $R$ queda determinada solo por su radio.",
      "La envolvemos con un **cilindro** que se ajusta por completo: su radio es $R$ y su altura, $2R$.",
      "La pared lateral del cilindro mide $2\\pi R$ de ancho por $2R$ de alto: $A = 2\\pi R \\cdot 2R$.",
      "El área de la esfera es igual a la del cilindro: $A = 4\\pi R^2$.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 1}>
          <rect x={cx - R} y={cy - R} width={2 * R} height={2 * R} fill={MANIM.green} fillOpacity={0.12} stroke={MANIM.green} strokeWidth={4} strokeDasharray="10 6" />
          <ellipse cx={cx} cy={cy - R} rx={R} ry={28} fill="none" stroke={MANIM.green} strokeWidth={3} />
          <ellipse cx={cx} cy={cy + R} rx={R} ry={28} fill="none" stroke={MANIM.green} strokeWidth={3} strokeOpacity={0.6} />
        </Fade>
        <circle cx={cx} cy={cy} r={R} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={5} />
        <ellipse cx={cx} cy={cy} rx={R} ry={28} fill="none" stroke={MANIM.blue} strokeWidth={2.5} strokeOpacity={0.7} />
        <line x1={cx} y1={cy} x2={cx + R} y2={cy} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={cx + R / 2} y={cy - 12} size={28}>R</Txt>
        <Fade show={beat >= 1}>
          <line x1={cx + R + 36} y1={cy - R} x2={cx + R + 36} y2={cy + R} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={cx + R + 50} y={cy + 9} size={28} color={MANIM.yellow} anchor="start">2R</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={150} y={170} size={26} color={MANIM.green}>2πR · 2R</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <Txt x={150} y={230} size={34} color={MANIM.yellow}>A = 4πR²</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
