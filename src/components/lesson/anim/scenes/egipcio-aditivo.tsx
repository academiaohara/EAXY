import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt as formatGrouped } from "@/components/lesson/anim/format";

const COLUMNS = [
  { power: 3, src: "/lesson/numeracion/egypt/1000.svg", name: "millares", color: MANIM.purple },
  { power: 2, src: "/lesson/numeracion/egypt/100.svg", name: "centenas", color: MANIM.orange },
  { power: 1, src: "/lesson/numeracion/egypt/10.svg", name: "decenas", color: MANIM.green },
  { power: 0, src: "/lesson/numeracion/egypt/1.svg", name: "unidades", color: MANIM.blue },
] as const;

const COL_X = [100, 300, 500, 700];
const GLYPH = 52;

function digitAt(n: number, power: number): number {
  return Math.floor(n / 10 ** power) % 10;
}

/** Egipcio: cada símbolo se repite tantas veces como haga falta y todo se suma. */
export function buildEgipcioAditivo(params: { n?: number }): AnimBuild {
  const n = params.n ?? 1435;
  const parts = COLUMNS.map((c) => digitAt(n, c.power) * 10 ** c.power);
  const total = formatGrouped(n);
  const sum = parts
    .filter((p) => p > 0)
    .map(formatGrouped)
    .join(" + ");

  return {
    label: `Cómo se escribe ${total} con símbolos egipcios: se suman los valores`,
    captions: [
      `Queremos escribir **${total}**. Lo descomponemos por órdenes.`,
      `Un símbolo para los **millares**: vale $1\\,000$.`,
      `Cuatro símbolos de **centenas**: $4 \\cdot 100 = 400$.`,
      `Tres de **decenas**: $3 \\cdot 10 = 30$.`,
      `Cinco **unidades**: $5$.`,
      `**Se suman** todos los valores: ${sum} = ${total}. El orden de los símbolos no cambia el valor.`,
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={52} size={40} color={MANIM.yellow}>
          {total}
        </Txt>
        {COLUMNS.map((col, ci) => {
          const count = digitAt(n, col.power);
          const visible = beat >= ci + 1;
          const cols = Math.min(3, Math.max(1, count));
          return (
            <g key={col.power}>
              <Fade show={beat >= 0} dy={8}>
                <Txt x={COL_X[ci]!} y={116} size={20} color={col.color}>
                  {col.name}
                </Txt>
              </Fade>
              {Array.from({ length: count }).map((_, k) => {
                const gx = COL_X[ci]! - ((cols - 1) * (GLYPH + 6)) / 2 + (k % cols) * (GLYPH + 6) - GLYPH / 2;
                const gy = 140 + Math.floor(k / cols) * (GLYPH + 8);
                return (
                  <Fade key={k} show={visible} dy={-24} delay={k * 120}>
                    <image
                      href={col.src}
                      x={gx}
                      y={gy}
                      width={GLYPH}
                      height={GLYPH}
                      style={{ filter: "brightness(0) invert(1)" }}
                    />
                  </Fade>
                );
              })}
              <Fade show={visible} dy={6} delay={count * 120}>
                <Txt x={COL_X[ci]!} y={330} size={26} color={col.color}>
                  {formatGrouped(parts[ci]!)}
                </Txt>
              </Fade>
            </g>
          );
        })}
        <Fade show={beat >= 5} dy={10}>
          <rect x={90} y={352} width={620} height={54} rx={12} fill="rgba(255,216,102,0.12)" stroke={MANIM.yellow} strokeWidth={2} />
          <Txt x={400} y={388} size={26} color={MANIM.ink}>
            {`${sum} = ${total}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
