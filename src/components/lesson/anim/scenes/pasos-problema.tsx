import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 190;
const U = 18;

/**
 * Los cuatro pasos con un problema sencillo: Pablo y Lucía reúnen 30 € y Lucía tiene 6 € más.
 * Barras: Pablo x, Lucía x + 6.
 */
export function buildPasosProblema(): AnimBuild {
  const pablo = 12;
  const lucia = 18;
  return {
    label: "Problema en cuatro pasos: Pablo x, Lucía x + 6, x + (x + 6) = 30, x = 12 y comprobación",
    captions: [
      "**Problema:** Pablo y Lucía reúnen 30 €. Lucía tiene 6 € más que Pablo. ¿Cuánto tiene cada uno?",
      "**1. Nombrar.** Pablo tiene $x$ (lo que no sabemos). Lucía, 6 más: $x + 6$.",
      "**2. Relacionar.** Entre los dos hacen 30: $x + (x + 6) = 30$.",
      "**3. Resolver.** $2x + 6 = 30$, luego $2x = 24$ y $x = 12$.",
      "**4. Interpretar y comprobar.** Pablo 12 €, Lucía 18 € y $12 + 18 = 30$. Tiene sentido: son cantidades de dinero positivas.",
    ],
    render: (beat) => {
      const barP = beat >= 1 ? pablo : 0;
      const solved = beat >= 3;
      const step = (n: number, label: string, y: number, show: boolean) => (
        <Fade show={show} dx={-10}>
          <circle cx={60} cy={y} r={20} fill={MANIM.yellow} />
          <Txt x={60} y={y + 8} size={22} color={MANIM.surface} weight={800}>
            {String(n)}
          </Txt>
          <Txt x={92} y={y + 8} size={22} color={MANIM.muted} anchor="start">
            {label}
          </Txt>
        </Fade>
      );
      return (
        <Canvas>
          {step(1, "Nombrar", 40, beat >= 1)}
          {step(2, "Relacionar", 80, beat >= 2)}
          {step(3, "Resolver", 120, beat >= 3)}
          {step(4, "Interpretar", 160, beat >= 4)}
          <Fade show={beat === 0}>
            <Txt x={400} y={170} size={30} color={MANIM.ink}>
              Pablo + Lucía = 30 €
            </Txt>
            <Txt x={400} y={220} size={30} color={MANIM.green}>
              Lucía tiene 6 € más que Pablo
            </Txt>
            <Txt x={400} y={290} size={28} color={MANIM.muted}>
              ¿Cuánto tiene cada uno?
            </Txt>
          </Fade>
          {/* barras */}
          <Fade show={beat >= 1}>
            <Txt x={X0 - 14} y={226} size={24} color={MANIM.blue} anchor="end">
              Pablo
            </Txt>
            <Txt x={X0 - 14} y={296} size={24} color={MANIM.green} anchor="end">
              Lucía
            </Txt>
          </Fade>
          <rect x={X0} y={200} width={barP * U} height={36} rx={6} fill={MANIM.blue} fillOpacity={0.9} className="anim-t" />
          <Fade show={beat >= 1}>
            <Txt x={X0 + (pablo * U) / 2} y={226} size={24} color={MANIM.surface} weight={800}>
              {solved ? "12" : "x"}
            </Txt>
          </Fade>
          <Fade show={beat >= 1} dy={8}>
            <rect x={X0} y={270} width={pablo * U} height={36} rx={6} fill={MANIM.blue} fillOpacity={0.9} />
            <rect x={X0 + pablo * U} y={270} width={6 * U} height={36} rx={6} fill={MANIM.green} fillOpacity={0.9} />
            <Txt x={X0 + (pablo * U) / 2} y={296} size={24} color={MANIM.surface} weight={800}>
              {solved ? "12" : "x"}
            </Txt>
            <Txt x={X0 + pablo * U + 3 * U} y={296} size={24} color={MANIM.surface} weight={800}>
              6
            </Txt>
          </Fade>
          <Fade show={beat >= 2} dy={8}>
            <Txt x={400} y={362} size={26} color={MANIM.yellow}>
              {solved ? "12 + 18 = 30" : "x + (x + 6) = 30"}
            </Txt>
          </Fade>
          <Fade show={beat >= 4} dy={8}>
            <Txt x={X0 + lucia * U + 14} y={296} size={24} color={MANIM.green} anchor="start">
              {`= ${lucia} €`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
