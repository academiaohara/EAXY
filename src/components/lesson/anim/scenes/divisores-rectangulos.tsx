import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { divisors } from "@/components/lesson/anim/number-theory";

const GAP = 3;
const COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple, MANIM.red];

/** Cada forma de ordenar n objetos en un rectángulo da una pareja de divisores. */
export function buildDivisoresRectangulos(params: { n?: number }): AnimBuild {
  const n = params.n ?? 24;
  const S = Math.min(24, Math.floor(700 / n));
  const all = divisors(n);
  const pairs = all.filter((d) => d * d <= n).map((d) => [d, n / d] as const);
  const cx = 400;
  const cy = 165;

  const layout = (rowsN: number) => {
    const colsN = n / rowsN;
    return Array.from({ length: n }, (_, i) => ({
      x: cx - (colsN * S) / 2 + (i % colsN) * S,
      y: cy - (rowsN * S) / 2 + Math.floor(i / colsN) * S,
    }));
  };
  const layouts = pairs.map(([r]) => layout(r));
  const total = pairs.length + 1;

  const captions = pairs.map(([r, c], p) =>
    r === c
      ? `**${r} filas de ${r}**: un cuadrado perfecto. $${r} \\cdot ${r} = ${n}$, y el divisor ${r} solo cuenta **una** vez.`
      : p === 0
        ? `Colocamos **${n}** sillas en filas iguales. La primera forma: **1 fila de ${n}**. $1 \\cdot ${n} = ${n}$: el $1$ y el $${n}$ son divisores.`
        : `**${r} filas de ${c}**: $${r} \\cdot ${c} = ${n}$. Cada forma de ordenar da **dos divisores**: ${r} y ${c}.`,
  );
  captions.push(
    `Ya no hay más rectángulos: los divisores de ${n} son **${all.join(", ")}** (${all.length} divisores en ${pairs.length} parejas).`,
  );

  const slotW = 760 / pairs.length;

  return {
    label: `Los divisores de ${n} aparecen por parejas al ordenar ${n} objetos en rectángulos`,
    captions,
    render: (beat) => {
      const shown = Math.min(beat, pairs.length - 1);
      return (
        <Canvas>
          {layouts[0]!.map((_, i) => {
            const pos = layouts[shown]![i]!;
            const base = layouts[0]![i]!;
            const colsN = n / pairs[shown]![0];
            return (
              <rect
                key={i}
                x={base.x}
                y={base.y}
                width={S - GAP}
                height={S - GAP}
                rx={4}
                fill={COLORS[Math.floor(i / colsN) % COLORS.length]}
                fillOpacity={0.9}
                className="anim-t"
                style={{
                  transform: `translate(${pos.x - base.x}px, ${pos.y - base.y}px)`,
                  transitionDelay: `${(i % 12) * 25}ms`,
                  transitionDuration: "0.8s",
                }}
              />
            );
          })}
          {pairs.map(([r, c], p) => (
            <Fade key={p} show={beat === p && beat < pairs.length} dy={-8}>
              <Txt x={400} y={44} size={30} color={MANIM.yellow}>
                {`${r} ${r === 1 ? "fila" : "filas"} × ${c} columnas`}
              </Txt>
            </Fade>
          ))}
          <Fade show={beat === pairs.length} dy={-8}>
            <Txt x={400} y={44} size={30} color={MANIM.yellow}>
              {`${n} tiene ${all.length} divisores`}
            </Txt>
          </Fade>
          {pairs.map(([r, c], p) => (
            <Fade key={p} show={beat >= p} dy={10}>
              <Txt x={20 + slotW * (p + 0.5)} y={330} size={r === c ? 26 : 24} color={COLORS[p % COLORS.length]}>
                {`${r} × ${c}`}
              </Txt>
            </Fade>
          ))}
          <Fade show={beat === pairs.length} dy={10}>
            <Txt x={400} y={385} size={28} color={MANIM.green}>
              {all.join(" · ")}
            </Txt>
          </Fade>
          <Fade show={beat < pairs.length} dy={10}>
            <Txt x={400} y={385} size={22} color={MANIM.muted}>
              {`divisores encontrados: ${Array.from(new Set(pairs.slice(0, beat + 1).flatMap(([r, c]) => [r, c]))).sort((x, y) => x - y).join(", ")}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
    beatMs: total > 5 ? 2400 : undefined,
  };
}
