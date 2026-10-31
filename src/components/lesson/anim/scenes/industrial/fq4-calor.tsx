import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const P = {
  o: [110, 340],
  a: [210, 270],
  b: [330, 270],
  c: [470, 120],
  d: [640, 120],
  e: [720, 70],
} as const;
const seg = (p: readonly [number, number], q: readonly [number, number]) => `M ${p[0]} ${p[1]} L ${q[0]} ${q[1]}`;

/** Curva de calentamiento del agua: tramos inclinados (Q = m·c·ΔT) y mesetas (cambios de estado, Q = m·L). */
export function buildCurvaCalentamiento(): AnimBuild {
  return {
    label: "Curva de calentamiento del agua: hielo, fusión, agua, ebullición y vapor",
    beatMs: 5600,
    captions: [
      "Calentamos **hielo** con una fuente de calor constante y representamos la **temperatura** frente al calor recibido.",
      "El hielo **sube de temperatura**: **Q = m·c·ΔT**. Al llegar a **0 °C** empieza a fundirse.",
      "Durante la **fusión** la temperatura **no cambia** (meseta): el calor se usa para romper uniones, **Q = m·L_fusión**.",
      "Fundido todo el hielo, el **agua líquida** sube de temperatura hasta **100 °C**.",
      "En la **ebullición** vuelve a haber otra meseta, mucho más larga: **L_vaporización** es ≈ 7 veces mayor. Después, el **vapor** se calienta.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={90} y1={360} x2={760} y2={360} stroke={MANIM.ink} strokeWidth={2} />
        <line x1={90} y1={360} x2={90} y2={30} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={740} y={385} size={16} color={MANIM.muted}>calor Q</Txt>
        <Txt x={60} y={40} size={16} color={MANIM.muted}>T</Txt>
        <line x1={90} y1={270} x2={760} y2={270} stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 6" />
        <line x1={90} y1={120} x2={760} y2={120} stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 6" />
        <Txt x={70} y={276} size={14} color={MANIM.muted}>0</Txt>
        <Txt x={62} y={126} size={14} color={MANIM.muted}>100</Txt>
        <Fade show={beat >= 1}>
          <path d={seg(P.o, P.a)} stroke={MANIM.blue} strokeWidth={5} fill="none" />
          <Txt x={140} y={320} size={16} color={MANIM.blue}>hielo</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <path d={seg(P.a, P.b)} stroke={MANIM.orange} strokeWidth={5} fill="none" />
          <Txt x={270} y={296} size={16} color={MANIM.orange}>fusión</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <path d={seg(P.b, P.c)} stroke={MANIM.green} strokeWidth={5} fill="none" />
          <Txt x={420} y={220} size={16} color={MANIM.green}>agua</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <path d={seg(P.c, P.d)} stroke={MANIM.red} strokeWidth={5} fill="none" />
          <Txt x={560} y={146} size={16} color={MANIM.red}>ebullición</Txt>
          <path d={seg(P.d, P.e)} stroke={MANIM.purple} strokeWidth={5} fill="none" />
          <Txt x={715} y={110} size={16} color={MANIM.purple}>vapor</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
