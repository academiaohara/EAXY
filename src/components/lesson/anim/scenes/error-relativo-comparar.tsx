import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 80;
const W = 640;

/**
 * Dos medidas con el mismo error absoluto (`c`): el error relativo, el que pesa sobre cada medida,
 * es mucho mayor en la pequeña. `a` y `b` son las dos medidas (con `titles` y `units`).
 */
export function buildErrorRelativoComparar(params: { a?: number; b?: number; c?: number; titles?: string[]; unit?: string }): AnimBuild {
  const big = params.a ?? 126;
  const small = params.b ?? 13;
  const cota = params.c ?? 0.5;
  const [t1 = "Distancia entre dos ciudades", t2 = "Anchura de un arroyo"] = params.titles ?? [];
  const unit = (params.unit ?? "").split("|");
  const u1 = unit[0] ?? "km";
  const u2 = unit[1] ?? "m";
  const es = (v: number) => String(v).replace(".", ",");
  const rel = (v: number) => cota / v;
  const pct = (v: number) => `${(rel(v) * 100).toFixed(rel(v) < 0.01 ? 2 : 1).replace(".", ",")} %`;
  const rows = [
    { title: t1, v: big, u: u1, y: 100, color: MANIM.blue },
    { title: t2, v: small, u: u2, y: 250, color: MANIM.orange },
  ];

  return {
    label: `El mismo error absoluto (${es(cota)}) pesa más sobre ${es(small)} que sobre ${es(big)}: error relativo ${pct(small)} frente a ${pct(big)}`,
    captions: [
      `Dos medidas aproximadas: **${es(big)} ${u1}** y **${es(small)} ${u2}**. Cada barra representa la medida completa.`,
      `Las dos tienen un error absoluto menor que $${es(cota)}$ (en su unidad). Parecen igual de buenas.`,
      `Pero la parte de la barra que ocupa el error es muy distinta: en la medida **pequeña** pesa mucho más.`,
      `**Error relativo** = error absoluto : valor. $\\dfrac{${es(cota)}}{${es(big)}} \\approx ${es(Number(rel(big).toFixed(4)))}$ frente a $\\dfrac{${es(cota)}}{${es(small)}} \\approx ${es(Number(rel(small).toFixed(3)))}$. La segunda medida es, en proporción, **mucho más burda**.`,
    ],
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        {rows.map((r) => {
          const ew = Math.max((rel(r.v)) * W, 3);
          return (
            <g key={r.title}>
              <Txt x={X0} y={r.y - 24} size={24} color={r.color} anchor="start">{`${r.title}: ${es(r.v)} ${r.u}`}</Txt>
              <rect x={X0} y={r.y} width={W} height={44} rx={6} fill={r.color} fillOpacity={0.35} stroke={r.color} strokeWidth={2.5} />
              <Fade show={beat >= 2} dy={-6}>
                <rect x={X0 + W - ew} y={r.y} width={ew} height={44} rx={3} fill={MANIM.red} fillOpacity={0.9} />
                <path d={`M ${X0 + W - ew / 2} ${r.y + 50} L ${X0 + W - ew / 2} ${r.y + 62}`} stroke={MANIM.red} strokeWidth={3} />
                <Txt x={X0 + W - ew / 2} y={r.y + 86} size={22} color={MANIM.red}>{`error < ${es(cota)} ${r.u}`}</Txt>
              </Fade>
              <Fade show={beat >= 3} dy={8}>
                <Txt x={X0} y={r.y + 86} size={26} color={MANIM.yellow} anchor="start">{`e. relativo ≈ ${pct(r.v)}`}</Txt>
              </Fade>
            </g>
          );
        })}
        <Fade show={beat === 1}>
          <Txt x={400} y={380} size={26} color={MANIM.muted}>{`mismo error absoluto: ${es(cota)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
