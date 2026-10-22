import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs, share } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 70;
const W = 660;
const COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple, MANIM.red];

/** Reparto proporcional: el total se parte en tantas partes como suman los valores y cada uno se lleva las suyas. */
export function buildRepartoPartes(params: { nums?: number[]; a?: number; titles?: string[]; unit?: string }): AnimBuild {
  const values = (params.nums ?? [1, 2, 5]).slice(0, 5).map((v) => Math.max(1, Math.round(v)));
  const total = params.a ?? 600000;
  const unit = params.unit ?? "€";
  const names = values.map((_, i) => params.titles?.[i] ?? `Socio ${i + 1}`);
  const S = values.reduce((a, b) => a + b, 0);
  const { amounts, fractions } = share(values, total);
  const seg = W / S;
  const money = (v: number) => `${fmtEs(v)} ${unit}`;
  let acc = 0;
  const starts = values.map((v) => {
    const s = acc;
    acc += v;
    return s;
  });

  return {
    label: `Reparto proporcional de ${money(total)} entre ${names.join(", ")} según ${values.join(", ")}`,
    captions: [
      `Hay que repartir **${money(total)}** de forma proporcional a ${values.join(", ")}.`,
      `El total se parte en $${values.join(" + ")} = ${S}$ partes iguales. Cada parte vale $${fmtEs(total)} : ${S} = ${fmtEs(total / S)}$ ${unit}.`,
      `Cada uno se lleva tantas partes como su valor: ${values.map((v, i) => `${names[i]}: ${v}`).join(", ")}.`,
      `${names.map((n, i) => `${n}: $${fmtEs(total / S)} \\cdot ${values[i]} = ${fmtEs(amounts[i]!)}$ ${unit}`).join("; ")}. Las fracciones ${fractions.map((f) => `$\\frac{${f[0]}}{${f[1]}}$`).join(", ")} suman $1$.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <rect x={X0} y={110} width={W} height={70} rx={6} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={X0 + W / 2} y={84} size={30} color={MANIM.yellow}>{money(total)}</Txt>
        <Fade show={beat >= 1}>
          {Array.from({ length: S - 1 }, (_, i) => (
            <line key={i} x1={X0 + (i + 1) * seg} y1={110} x2={X0 + (i + 1) * seg} y2={180} stroke={MANIM.ink} strokeOpacity={0.5} strokeWidth={2} />
          ))}
        </Fade>
        {values.map((v, i) => (
          <g key={i}>
            <Fade show={beat >= 2} dy={8}>
              <rect x={X0 + starts[i]! * seg} y={110} width={v * seg} height={70} rx={4} fill={COLORS[i]} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
              <Txt x={X0 + (starts[i]! + v / 2) * seg} y={152} size={26} color={MANIM.ink}>{String(v)}</Txt>
              <Txt x={X0 + (starts[i]! + v / 2) * seg} y={208} size={20} color={COLORS[i]}>{names[i]}</Txt>
            </Fade>
            <Fade show={beat >= 3} dy={10}>
              <Txt x={400 + (i - (values.length - 1) / 2) * Math.min(220, 640 / values.length)} y={270} size={values.length > 3 ? 22 : 28} color={COLORS[i]}>{money(amounts[i]!)}</Txt>
            </Fade>
          </g>
        ))}
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={340} size={26} color={MANIM.muted}>{`${values.map((_, i) => `${fractions[i]![0]}/${fractions[i]![1]}`).join(" + ")} = 1`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
