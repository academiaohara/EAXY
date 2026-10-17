import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt } from "@/components/lesson/anim/format";

type Seg = { t: string; color: string; dim?: boolean };

/** Línea monoespaciada formada por tramos coloreables (sirve para atenuar solo una parte). */
function Line({ y, size, segs, show }: { y: number; size: number; segs: Seg[]; show: boolean }) {
  const charW = size * 0.62;
  const total = segs.reduce((acc, s) => acc + s.t.length, 0) * charW;
  const starts = segs.map((_, i) => 400 - total / 2 + segs.slice(0, i).reduce((acc, p) => acc + p.t.length, 0) * charW);
  return (
    <Fade show={show} dy={10}>
      {segs.map((s, i) => {
        const left = starts[i]!;
        return (
          <g key={i} className="anim-t" style={{ opacity: s.dim ? 0.25 : 1 }}>
            <Txt x={left} y={y} size={size} color={s.color} anchor="start" mono weight={700}>
              {s.t.replace(/ /g, "\u00a0")}
            </Txt>
          </g>
        );
      })}
    </Fade>
  );
}

/** Por qué vale sumar las cifras: 10 = 9 + 1, 100 = 99 + 1… y los 9, 99 son múltiplos de 3 y de 9. */
export function buildCriterioSumaCifras(params: { n?: number }): AnimBuild {
  const n = params.n ?? 462;
  const [a, b, c] = String(n).padStart(3, "0").split("").map(Number) as [number, number, number];
  const s = a + b + c;
  const by3 = s % 3 === 0;
  const by9 = s % 9 === 0;
  const verdict = `${fmt(n)} ${by3 ? "sí" : "no"} es divisible entre 3 · ${by9 ? "sí" : "no"} entre 9`;

  return {
    label: `Por qué la suma de cifras decide la divisibilidad entre 3 y 9, con ${fmt(n)}`,
    captions: [
      `¿Es **${fmt(n)}** divisible entre $3$? Sin dividir: veamos qué aporta cada cifra.`,
      `Cada cifra vale ella misma por $100$, $10$ o $1$.`,
      `$100 = 99 + 1$ y $10 = 9 + 1$. Los $99$ y los $9$ son múltiplos de $3$ y de $9$: **no cambian la divisibilidad**.`,
      `Solo cuenta lo que queda: **la suma de las cifras**, $${a} + ${b} + ${c} = ${s}$.`,
      by3
        ? `$${s}$ es múltiplo de $3$, así que ${fmt(n)} es divisible entre $3$${by9 ? " y entre $9$" : ", pero $" + s + "$ no es múltiplo de $9$: entre $9$ no"}.`
        : `$${s}$ no es múltiplo de $3$, así que ${fmt(n)} no es divisible entre $3$ (ni entre $9$).`,
    ],
    render: (beat) => (
      <Canvas>
        <Line y={78} size={54} show segs={[{ t: `${a} ${b} ${c}`, color: MANIM.ink }]} />
        <Line
          y={160}
          size={32}
          show={beat >= 1}
          segs={[
            { t: `${a}·100`, color: MANIM.blue },
            { t: " + ", color: MANIM.muted },
            { t: `${b}·10`, color: MANIM.green },
            { t: " + ", color: MANIM.muted },
            { t: `${c}`, color: MANIM.orange },
          ]}
        />
        <Line
          y={240}
          size={32}
          show={beat >= 2}
          segs={[
            { t: `${a}·99`, color: MANIM.blue, dim: beat >= 3 },
            { t: " + ", color: MANIM.muted, dim: beat >= 3 },
            { t: `${b}·9`, color: MANIM.green, dim: beat >= 3 },
            { t: " + ", color: MANIM.muted },
            { t: `${a} + ${b} + ${c}`, color: MANIM.yellow },
          ]}
        />
        <Fade show={beat === 2} dy={-6}>
          <Txt x={400} y={282} size={20} color={MANIM.muted}>múltiplos de 3 y de 9 (se descartan)  +  suma de cifras</Txt>
        </Fade>
        <Line y={322} size={34} show={beat >= 3} segs={[{ t: `${a} + ${b} + ${c} = ${s}`, color: MANIM.yellow }]} />
        <Fade show={beat >= 4} dy={8}>
          <Txt x={400} y={378} size={26} color={by3 ? MANIM.green : MANIM.red}>{verdict}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
