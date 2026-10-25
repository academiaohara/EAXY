import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

function Box({ x, y, w, h, color, label, sub, show = true, strong = false }: { x: number; y: number; w: number; h: number; color: string; label: string; sub?: string; show?: boolean; strong?: boolean }) {
  return (
    <Fade show={show}>
      <rect x={x} y={y} width={w} height={h} rx={10} fill={color} fillOpacity={strong ? 0.9 : 0.28} stroke={color} strokeWidth={strong ? 4 : 2.5} />
      <Txt x={x + w / 2} y={y + h / 2 - (sub ? 4 : -8)} size={26} color={strong ? "#101418" : MANIM.ink}>{label}</Txt>
      {sub ? <Txt x={x + w / 2} y={y + h / 2 + 26} size={19} color={strong ? "#101418" : MANIM.muted}>{sub}</Txt> : null}
    </Fade>
  );
}

/** Teorema de Bayes con frecuencias naturales: 10 000 móviles y un detector imperfecto. */
export function buildBayesFrecuencias(): AnimBuild {
  return {
    label: "Teorema de Bayes con frecuencias: móviles defectuosos y un detector",
    captions: [
      "De $10\\,000$ móviles, el $2\\,\\%$ es defectuoso: **200 defectuosos** y **9 800 correctos**.",
      "El detector marca el $90\\,\\%$ de los defectuosos: **180 marcados** y 20 que se escapan.",
      "Pero también marca el $1\\,\\%$ de los correctos: **98 marcados** por error y 9 702 bien clasificados.",
      "Entre los $180 + 98 = 278$ móviles marcados, solo $180$ son defectuosos: $P(\\text{defectuoso}\\,|\\,\\text{marcado}) = \\dfrac{180}{278} \\approx 64{,}7\\,\\%$. Un marcado es correcto el $35{,}3\\,\\%$ de las veces.",
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={34} size={26} color={MANIM.muted}>10 000 móviles</Txt>
        <Box x={60} y={60} w={200} h={80} color={MANIM.red} label="200" sub="defectuosos (2 %)" />
        <Box x={330} y={60} w={410} h={80} color={MANIM.blue} label="9 800" sub="correctos (98 %)" />
        <Box x={20} y={190} w={130} h={90} color={MANIM.red} label="180" sub="marcados" show={beat >= 1} strong={beat >= 3} />
        <Box x={160} y={190} w={130} h={90} color={MANIM.muted} label="20" sub="no marcados" show={beat >= 1} />
        <Box x={330} y={190} w={190} h={90} color={MANIM.orange} label="98" sub="marcados (1 %)" show={beat >= 2} strong={beat >= 3} />
        <Box x={540} y={190} w={200} h={90} color={MANIM.muted} label="9 702" sub="no marcados" show={beat >= 2} />
        <Fade show={beat >= 3}>
          <rect x={20} y={310} width={500} height={80} rx={12} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={270} y={348} size={26} color={MANIM.yellow}>marcados: 180 + 98 = 278</Txt>
          <Txt x={270} y={378} size={22} color={MANIM.ink}>defectuosos: 180/278 ≈ 64,7 %</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
