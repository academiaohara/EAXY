import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac } from "@/components/lesson/anim/fraction";
import { compound, fmtEs, type Rel } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const COL = [210, 400, 590];

/**
 * Proporcionalidad compuesta con dos magnitudes dadas y la incógnita: `nums = [k1, k2, resultado, n1, n2]`,
 * `rels` = relación de cada magnitud con la incógnita (directa / inversa) y `titles` los nombres.
 */
export function buildProporcionCompuesta(params: { nums?: number[]; rels?: Rel[]; titles?: string[] }): AnimBuild {
  const [k1 = 15, k2 = 7, res = 294, n1 = 10, n2 = 30] = params.nums ?? [];
  const [r1 = "d", r2 = "d"] = params.rels ?? [];
  const [t1 = "vacas", t2 = "días", t3 = "kilos"] = params.titles ?? [];
  const x = compound([k1, k2], res, [n1, n2], [r1, r2]);
  const word = (r: Rel) => (r === "d" ? "directa" : "inversa");
  const tone = (r: Rel) => (r === "d" ? MANIM.green : MANIM.orange);
  const f = (v: number) => fmtEs(v, 3);
  // Cada factor de la fórmula: la razón nuevo/antiguo, invertida si la relación es inversa.
  const f1 = r1 === "d" ? [n1, k1] : [k1, n1];
  const f2 = r2 === "d" ? [n2, k2] : [k2, n2];

  return {
    label: `Proporcionalidad compuesta: ${f(k1)} ${t1}, ${f(k2)} ${t2} → ${f(res)} ${t3}; con ${f(n1)} ${t1} y ${f(n2)} ${t2} → ${f(x)} ${t3}`,
    captions: [
      `Ordenamos los datos: **${t3}** (la incógnita) va en la última columna.`,
      `Para cada magnitud, nos preguntamos: si crece, ¿**${t3}** crece o decrece? ${t1}: **${word(r1)}**. ${t2}: **${word(r2)}**.`,
      `Cada magnitud aporta **una razón**: la directa se escribe tal cual (nuevo/antiguo) y la inversa **al revés**.`,
      `$x = ${f(res)} \\cdot \\dfrac{${f(f1[0]!)}}{${f(f1[1]!)}} \\cdot \\dfrac{${f(f2[0]!)}}{${f(f2[1]!)}} = ${f(x)}$ ${t3}.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {[t1, t2, t3].map((t, i) => (
          <Txt key={t} x={COL[i]!} y={50} size={26} color={i === 2 ? MANIM.yellow : MANIM.blue}>{t}</Txt>
        ))}
        {[k1, k2, res].map((v, i) => (
          <Txt key={`a${i}`} x={COL[i]!} y={100} size={34} color={MANIM.ink}>{f(v)}</Txt>
        ))}
        {[n1, n2].map((v, i) => (
          <Txt key={`b${i}`} x={COL[i]!} y={150} size={34} color={MANIM.ink}>{f(v)}</Txt>
        ))}
        <Txt x={COL[2]!} y={150} size={34} color={MANIM.yellow}>{beat >= 3 ? f(x) : "x"}</Txt>
        <Fade show={beat >= 1}>
          {[r1, r2].map((r, i) => (
            <g key={i}>
              <rect x={COL[i]! - 60} y={170} width={120} height={32} rx={16} fill={tone(r)} fillOpacity={0.15} stroke={tone(r)} strokeWidth={2} />
              <Txt x={COL[i]!} y={193} size={20} color={tone(r)}>{word(r)}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2} dy={12}>
          <Txt x={80} y={290} size={30} color={MANIM.yellow}>x =</Txt>
          <Txt x={140} y={298} size={34} color={MANIM.ink} anchor="start">{f(res)}</Txt>
          <Txt x={250} y={298} size={34} color={MANIM.ink}>·</Txt>
          <Frac x={330} y={290} n={f(f1[0]!)} d={f(f1[1]!)} size={38} color={tone(r1)} />
          <Txt x={410} y={298} size={34} color={MANIM.ink}>·</Txt>
          <Frac x={490} y={290} n={f(f2[0]!)} d={f(f2[1]!)} size={38} color={tone(r2)} />
        </Fade>
        <Fade show={beat >= 3} dy={12}>
          <Txt x={560} y={298} size={34} color={MANIM.ink} anchor="start">{`= ${f(x)}`}</Txt>
          <Txt x={400} y={376} size={26} color={MANIM.muted}>{`${f(x)} ${t3}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
