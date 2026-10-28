import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Curva tensión-deformación de un ensayo de tracción ───────────── */

export function buildCurvaTraccion(): AnimBuild {
  const X0 = 120;
  const Y0 = 340;
  // Puntos clave de la curva (esquemática de un acero dulce)
  const P = { ey: [190, 220], max: [560, 120], rot: [640, 175] } as const;
  const camino = (beat: number) => {
    const pts: string[] = [`${X0},${Y0}`];
    if (beat >= 0) pts.push(`${P.ey[0]},${P.ey[1]}`);
    if (beat >= 3) pts.push("300,205", "420,150", `${P.max[0]},${P.max[1]}`);
    if (beat >= 4) pts.push("600,140", `${P.rot[0]},${P.rot[1]}`);
    return pts.join(" ");
  };
  return {
    label: "Ensayo de tracción: zona elástica, límite elástico, zona plástica, resistencia máxima y rotura",
    beatMs: 5600,
    captions: [
      "En el **ensayo de tracción** se estira una probeta y se mide la **tensión σ** (fuerza ÷ sección) frente a la **deformación ε** (alargamiento relativo).",
      "Al principio la curva es una **recta**: **zona elástica**. Si se suelta la probeta, recupera su forma. La pendiente indica la **rigidez** (módulo de Young).",
      "El **límite elástico** marca el final de la zona elástica. Si se supera, la deformación ya es **permanente**: empieza la **zona plástica**.",
      "En la zona plástica la probeta se estira cada vez más. La tensión llega a un **máximo**: la **resistencia a la tracción**.",
      "Pasado el máximo, la probeta se **estrecha** (estricción) y acaba **rompiendo**. Un material **dúctil** se deforma mucho antes; uno **frágil** rompe casi sin deformarse.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={X0} y1={Y0} x2={720} y2={Y0} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={X0} y1={50} x2={X0} y2={Y0} stroke={MANIM.muted} strokeWidth={3} />
        <Txt x={720} y={Y0 + 40} size={22} color={MANIM.muted}>
          deformación ε
        </Txt>
        <Txt x={X0 + 10} y={40} size={22} color={MANIM.muted}>
          tensión σ
        </Txt>
        <polyline points={camino(beat)} fill="none" stroke={MANIM.blue} strokeWidth={6} strokeLinejoin="round" className="anim-t" />
        <Fade show={beat === 1}>
          <rect x={X0 + 6} y={P.ey[1] - 4} width={P.ey[0] - X0} height={Y0 - P.ey[1]} fill={MANIM.green} fillOpacity={0.15} />
          <Txt x={X0 + 90} y={Y0 - 40} size={22} color={MANIM.green}>
            elástica
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <circle cx={P.ey[0]} cy={P.ey[1]} r={10} fill={MANIM.yellow} />
          <Txt x={P.ey[0] + 20} y={P.ey[1] - 22} size={22} color={MANIM.yellow}>
            límite elástico
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <circle cx={P.max[0]} cy={P.max[1]} r={10} fill={MANIM.orange} />
          <Txt x={P.max[0]} y={P.max[1] - 24} size={22} color={MANIM.orange}>
            resistencia máxima
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={P.rot[0] + 10} y={P.rot[1] + 36} size={26} color={MANIM.red}>
            ✕ rotura
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
