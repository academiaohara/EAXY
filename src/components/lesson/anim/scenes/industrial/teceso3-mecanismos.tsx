import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Leva excéntrica y seguidor ───────────── */

export function buildLevaSeguidor(): AnimBuild {
  const cx = 280;
  const cy = 270;
  const R = 70;
  const e = 30;
  const ANG = [0, 90, 180, 270, 45];
  return {
    label: "Leva excéntrica: el giro continuo produce un movimiento de subida y bajada del seguidor",
    beatMs: 5400,
    captions: [
      "Una **leva** es una pieza con un perfil especial que gira sobre un eje. Aquí es un disco **excéntrico**: su centro no coincide con el eje de giro. El **seguidor** se apoya en ella.",
      "Al girar 90°, el punto de contacto **baja**: el seguidor desciende empujado por su **muelle** (o por su propio peso).",
      "En 180° el seguidor está en su posición **más baja**: la leva presenta su lado más cercano al eje.",
      "A los 270° vuelve a **subir**. Con una vuelta completa, el seguidor ha subido y bajado una vez.",
      "La **carrera** del seguidor es el **doble de la excentricidad** (2 · e). Cambiando el perfil de la leva se cambia el movimiento: suave, uniforme o con caída brusca.",
    ],
    render: (beat) => {
      const th = (ANG[beat]! * Math.PI) / 180;
      const ccx = cx + e * Math.sin(th);
      const ccy = cy - e * Math.cos(th);
      const top = ccy - R;
      return (
        <Canvas>
          <circle cx={ccx} cy={ccy} r={R} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={5} className="anim-t" />
          <circle cx={cx} cy={cy} r={9} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={4} />
          <line x1={cx} y1={cy} x2={ccx} y2={ccy} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="4 4" />
          <rect x={cx - 48} y={top - 30} width={96} height={20} rx={4} fill={MANIM.green} fillOpacity={0.5} stroke={MANIM.green} strokeWidth={4} className="anim-t" />
          <line x1={cx} y1={top - 30} x2={cx} y2={110} stroke={MANIM.green} strokeWidth={6} />
          <rect x={cx - 24} y={90} width={48} height={20} rx={4} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={3} />
          <Txt x={cx + 120} y={top - 12} size={20} color={MANIM.green}>
            seguidor
          </Txt>
          <Txt x={cx - 175} y={cy + 20} size={20} color={MANIM.orange}>
            leva excéntrica
          </Txt>
          <Fade show={beat === 4}>
            <Arrow x1={cx + 200} y1={cy - e - R - 20} x2={cx + 200} y2={cy + e - R - 20} color={MANIM.yellow} width={4} />
            <Txt x={cx + 310} y={cy - R - 20} size={22} color={MANIM.yellow}>
              carrera = 2 · e
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
