import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const C = { x: 430, y: 210 };
const FUENTE = { x: 90, y: 210 };
const rectas = [110, 150, 270, 310].map((y) => `M ${FUENTE.x + 30} ${y} L 690 ${y}`);

export function buildRutherford(): AnimBuild {
  return {
    label: "El experimento de Rutherford y el descubrimiento del núcleo",
    beatMs: 5600,
    captions: [
      "**Rutherford** (1911) lanzó **partículas alfa** (positivas) contra una **lámina de oro muy fina** y observó dónde llegaban en una pantalla detectora.",
      "Según el modelo de **Thomson** (carga positiva repartida por todo el átomo), todas las partículas deberían **atravesar** la lámina casi **sin desviarse**.",
      "Resultado: la **mayoría** atraviesa la lámina **sin desviarse**: el átomo está **casi vacío**.",
      "Algunas partículas se **desvían** un poco: pasan cerca de algo con **carga positiva** que las repele.",
      "**Muy pocas** (una de cada miles) **rebotan hacia atrás**: chocan con una zona muy **pequeña, densa y positiva**.",
      "Conclusión: el átomo tiene un **núcleo** diminuto, **positivo** y con casi toda la masa, rodeado de espacio vacío donde están los **electrones**.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={FUENTE.x - 40} y={FUENTE.y - 22} width={70} height={44} rx={8} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={3} />
        <Txt x={FUENTE.x - 5} y={FUENTE.y + 5} size={15} color={MANIM.orange}>fuente α</Txt>
        <rect x={C.x - 6} y={60} width={12} height={300} fill={MANIM.yellow} fillOpacity={0.25} stroke={MANIM.yellow} strokeWidth={2} />
        <Txt x={C.x} y={50} size={18} color={MANIM.yellow}>lámina de oro</Txt>
        <path d="M 700 60 Q 740 210 700 360" fill="none" stroke={MANIM.green} strokeWidth={5} />
        <Txt x={742} y={210} size={16} color={MANIM.green} anchor="start">pantalla</Txt>
        <Fade show={beat >= 1}>
          <circle cx={C.x} cy={C.y} r={72} fill={MANIM.red} fillOpacity={0.12} stroke={MANIM.red} strokeWidth={2} strokeDasharray="7 6" />
          <Txt x={C.x - 100} y={C.y - 84} size={16} color={MANIM.red} anchor="end">átomo (modelo de Thomson)</Txt>
        </Fade>
        <Fade show={beat === 1}>
          {rectas.map((d, i) => (
            <path key={i} d={d} stroke={MANIM.muted} strokeWidth={2.5} strokeDasharray="9 7" fill="none" />
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          {rectas.map((d, i) => (
            <path key={i} d={d} stroke={MANIM.blue} strokeWidth={3.5} fill="none" />
          ))}
          <path d={`M ${FUENTE.x + 30} 210 L ${C.x - 80} 210`} stroke={MANIM.blue} strokeWidth={3.5} fill="none" />
        </Fade>
        <Fade show={beat >= 3}>
          <path d={`M ${FUENTE.x + 30} 235 L ${C.x - 40} 235 L 690 290`} stroke={MANIM.purple} strokeWidth={3.5} fill="none" />
          <path d={`M ${FUENTE.x + 30} 185 L ${C.x - 40} 185 L 690 130`} stroke={MANIM.purple} strokeWidth={3.5} fill="none" />
        </Fade>
        <Fade show={beat >= 4}>
          <path d={`M ${FUENTE.x + 30} 207 L ${C.x - 8} 207 L ${C.x - 120} 250`} stroke={MANIM.orange} strokeWidth={4} fill="none" />
          <Txt x={C.x - 150} y={282} size={16} color={MANIM.orange}>¡rebota!</Txt>
        </Fade>
        <Fade show={beat >= 5}>
          <circle cx={C.x} cy={C.y} r={8} fill={MANIM.red} />
          <Txt x={C.x + 34} y={C.y - 16} size={20} color={MANIM.red} anchor="start">núcleo</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
