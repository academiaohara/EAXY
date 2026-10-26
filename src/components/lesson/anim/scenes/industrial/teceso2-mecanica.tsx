import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Biela-manivela: de giro a vaivén ───────────── */

export function buildBielaManivela(): AnimBuild {
  const cx = 230;
  const cy = 250;
  const r = 70;
  const L = 200;
  const ANG = [0, 90, 180, 270, 45];
  return {
    label: "Biela-manivela: el giro continuo de la manivela se convierte en un movimiento de vaivén",
    beatMs: 5400,
    captions: [
      "La **manivela** (radio r) gira alrededor de su eje. La **biela** une su extremo con el **émbolo**, que solo puede moverse en línea recta. Aquí el émbolo está en un **extremo** del recorrido.",
      "Con un cuarto de vuelta, la manivela empuja la biela y el émbolo **retrocede** hacia el eje.",
      "Media vuelta: el émbolo llega al **otro extremo**. Ya ha recorrido su **carrera** completa.",
      "En el siguiente cuarto de vuelta el émbolo **vuelve** a avanzar: el giro en un solo sentido produce un **movimiento alternativo**.",
      "La **carrera** del émbolo es siempre el **doble del radio de la manivela**: carrera = 2 · r. Es el principio de un **motor de combustión** y de una bomba de pistón.",
    ],
    render: (beat) => {
      const th = (ANG[beat]! * Math.PI) / 180;
      const px = cx + r * Math.cos(th);
      const py = cy - r * Math.sin(th);
      const ex = px + Math.sqrt(L * L - (r * Math.sin(th)) ** 2);
      return (
        <Canvas>
          <line x1={cx} y1={cy} x2={cx + r + L + 70} y2={cy} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <circle cx={cx} cy={cy} r={r} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="4 5" />
          <line x1={cx} y1={cy} x2={px} y2={py} stroke={MANIM.orange} strokeWidth={8} strokeLinecap="round" />
          <line x1={px} y1={py} x2={ex} y2={cy} stroke={MANIM.blue} strokeWidth={7} strokeLinecap="round" />
          <circle cx={cx} cy={cy} r={11} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={4} />
          <circle cx={px} cy={py} r={8} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={4} />
          <rect x={ex - 26} y={cy - 34} width={52} height={68} rx={6} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.green} strokeWidth={5} className="anim-t" />
          <Txt x={cx} y={cy + 105} size={20} color={MANIM.orange}>
            manivela (r)
          </Txt>
          <Txt x={ex} y={cy + 105} size={20} color={MANIM.green}>
            émbolo
          </Txt>
          <Txt x={(px + ex) / 2} y={cy - 85} size={20} color={MANIM.blue}>
            biela
          </Txt>
          <Fade show={beat === 4}>
            <line x1={cx + L - r} y1={cy - 70} x2={cx + L + r} y2={cy - 70} stroke={MANIM.yellow} strokeWidth={3} />
            <Arrow x1={cx + L - r} y1={cy - 130} x2={cx + L + r} y2={cy - 130} color={MANIM.yellow} width={4} />
            <Txt x={cx + L} y={cy - 150} size={24} color={MANIM.yellow}>
              carrera = 2 · r
            </Txt>
          </Fade>
          <Fade show={beat === 0 || beat === 2}>
            <Txt x={700} y={70} size={22} color={MANIM.yellow}>
              {beat === 0 ? "extremo exterior" : "extremo interior"}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
