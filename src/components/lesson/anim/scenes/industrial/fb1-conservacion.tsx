import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const TOP: [number, number] = [90, 90];
const BOT: [number, number] = [430, 340];
const pos = (f: number): [number, number] => [TOP[0] + (BOT[0] - TOP[0]) * f, TOP[1] + (BOT[1] - TOP[1]) * f];
const BX = 560;
const H = 220;

function Barra({ y, e, color, nombre }: { y: number; e: number; color: string; nombre: string }) {
  const h = Math.max(0, e) * H;
  return (
    <g>
      <rect x={BX + 50 + y * 60} y={340 - h} width={44} height={h} fill={color} fillOpacity={0.85} />
      <text x={BX + 72 + y * 60} y={362} textAnchor="middle" fill={MANIM.ink} fontSize={18}>{nombre}</text>
    </g>
  );
}

/** Conservación de la energía mecánica al bajar por una rampa, y pérdida por rozamiento. */
export function buildConservacion(): AnimBuild {
  const f = [0, 0.5, 1, 1, 1];
  return {
    label: "Conservación de la energía mecánica en una rampa",
    beatMs: 5600,
    captions: [
      "Arriba, el bloque está en reposo: toda la energía es **potencial gravitatoria** **Ep = m·g·h**; la **cinética** es nula.",
      "Al bajar, **h disminuye** y **v aumenta**: la Ep se **transforma** en Ec. La suma **Em = Ec + Ep** se mantiene constante.",
      "Abajo (h = 0), toda la energía es **cinética**: **½·m·v² = m·g·h₀** → **v = √(2·g·h₀)**, independiente de la masa.",
      "Si hay **rozamiento**, parte de la energía se **disipa en calor** (Q = |W_roz|): la energía mecánica final es menor.",
      "**Em,final − Em,inicial = W_no conservativas**. La energía **total** (incluido el calor) siempre se conserva.",
    ],
    render: (beat) => {
      const fr = f[Math.min(beat, 4)]!;
      const [px, py] = pos(fr);
      const roz = beat >= 3;
      const Q = roz ? 0.3 : 0;
      const Ep = 1 - fr;
      const Ec = fr * (1 - Q);
      return (
        <Canvas>
          <polygon points={`${TOP[0]},${TOP[1]} ${BOT[0]},${BOT[1]} ${TOP[0]},${BOT[1]}`} fill={MANIM.muted} fillOpacity={0.2} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={BOT[0]} y1={BOT[1]} x2={520} y2={BOT[1]} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={TOP[0] - 30} y1={TOP[1]} x2={TOP[0] - 30} y2={BOT[1]} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" />
          <Txt x={TOP[0] - 52} y={215} size={22} color={MANIM.yellow}>h₀</Txt>
          <circle cx={px - 12} cy={py - 18} r={16} fill={MANIM.blue} />
          <line x1={BX + 40} y1={340} x2={BX + 230} y2={340} stroke={MANIM.ink} strokeWidth={2} />
          <Barra y={0} e={Ep} color={MANIM.green} nombre="Ep" />
          <Barra y={1} e={Ec} color={MANIM.blue} nombre="Ec" />
          <Fade show={roz}>
            <Barra y={2} e={Q} color={MANIM.red} nombre="Q" />
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={680} y={60} size={24} color={MANIM.yellow}>Ec + Ep = constante</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={660} y={60} size={22} color={MANIM.yellow}>ΔEm = W_no conservativas</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
