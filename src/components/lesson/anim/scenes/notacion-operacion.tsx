import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";
import type { AnimBuild } from "@/components/lesson/anim/types";

export type SciOp = "mul" | "div" | "sum" | "pow";

const num = (s: string | undefined, fallback: number) => {
  const v = Number((s ?? "").replace(",", "."));
  return Number.isFinite(v) && v > 0 ? v : fallback;
};
/** Número con coma y como mucho 8 cifras significativas (sin ruido de coma flotante). */
export function fmtSci(x: number): string {
  return String(parseFloat(x.toPrecision(8))).replace(".", ",");
}
/** Lleva la mantisa al intervalo [1, 10) ajustando el exponente. */
export function normalizeSci(m: number, e: number): { m: number; e: number } {
  let mm = m;
  let ee = e;
  while (mm >= 10) {
    mm = parseFloat((mm / 10).toPrecision(12));
    ee += 1;
  }
  while (mm < 1) {
    mm = parseFloat((mm * 10).toPrecision(12));
    ee -= 1;
  }
  return { m: mm, e: ee };
}
const tex = (s: string) => s.replace(",", "{,}");
const T = (m: number, e: number) => `${tex(fmtSci(m))} \\cdot 10^{${e}}`;
const P = (m: number, e: number) => `${fmtSci(m)} · 10${sup(e)}`;

/**
 * Operaciones con notación científica. `terms` son las mantisas, `a` y `b` los exponentes
 * (`pow`: una mantisa, exponente `a` y potencia `c`).
 */
export function buildNotacionOperacion(params: { nop?: SciOp; terms?: string[]; a?: number; b?: number; c?: number }): AnimBuild {
  const op = params.nop ?? "mul";
  const m1 = num(params.terms?.[0], 4.5);
  const m2 = num(params.terms?.[1], 2.1);
  const a = Math.round(params.a ?? 12);
  const b = Math.round(params.b ?? -8);
  const n = Math.min(Math.max(Math.round(params.c ?? 2), 2), 4);
  type Line = { text: string; color: string };
  const lines: Line[] = [];
  const captions: string[] = [];

  if (op === "mul" || op === "div") {
    const mul = op === "mul";
    const sym = mul ? "·" : ":";
    const r = mul ? m1 * m2 : m1 / m2;
    const re = mul ? a + b : a - b;
    const norm = normalizeSci(r, re);
    lines.push({ text: `(${P(m1, a)}) ${sym} (${P(m2, b)})`, color: MANIM.ink });
    captions.push(`Queremos $(${T(m1, a)}) ${mul ? "\\cdot" : ":"} (${T(m2, b)})$.`);
    lines.push({ text: `(${fmtSci(m1)} ${sym} ${fmtSci(m2)}) ${sym} (10${sup(a)} ${sym} 10${sup(b)})`, color: MANIM.blue });
    captions.push(`Se separan **las mantisas** por un lado y **las potencias de 10** por otro.`);
    lines.push({
      text: `${fmtSci(r)} · 10${sup(re)}`,
      color: MANIM.yellow,
    });
    captions.push(
      mul
        ? `Mantisas: $${tex(fmtSci(m1))} \\cdot ${tex(fmtSci(m2))} = ${tex(fmtSci(r))}$. Potencias: $10^{${a}} \\cdot 10^{${b}} = 10^{${a + b}}$ (se **suman** los exponentes).`
        : `Mantisas: $${tex(fmtSci(m1))} : ${tex(fmtSci(m2))} = ${tex(fmtSci(r))}$. Potencias: $10^{${a}} : 10^{${b}} = 10^{${a - b}}$ (se **restan** los exponentes).`,
    );
    const changed = norm.e !== re || norm.m !== r;
    lines.push({ text: `= ${P(norm.m, norm.e)}`, color: MANIM.orange });
    captions.push(
      changed
        ? `${r >= 10 ? `$${tex(fmtSci(r))}$ es mayor que $10$` : `$${tex(fmtSci(r))}$ es menor que $1$`}: se ajusta la coma y el exponente. Resultado: $${T(norm.m, norm.e)}$.`
        : `La mantisa ya está entre $1$ y $10$: el resultado ya es notación científica, $${T(norm.m, norm.e)}$.`,
    );
  } else if (op === "pow") {
    const r = m1 ** n;
    const re = a * n;
    const norm = normalizeSci(r, re);
    lines.push({ text: `(${P(m1, a)})${sup(n)}`, color: MANIM.ink });
    captions.push(`Queremos $(${T(m1, a)})^{${n}}$.`);
    lines.push({ text: `${fmtSci(m1)}${sup(n)} · (10${sup(a)})${sup(n)}`, color: MANIM.blue });
    captions.push(`La potencia **se reparte** entre la mantisa y la potencia de 10.`);
    lines.push({ text: `${fmtSci(r)} · 10${sup(re)}`, color: MANIM.yellow });
    captions.push(`$(10^{${a}})^{${n}} = 10^{${a} \\cdot ${n}} = 10^{${re}}$ (se **multiplican** los exponentes) y $${tex(fmtSci(m1))}^{${n}} = ${tex(fmtSci(r))}$.`);
    lines.push({ text: `= ${P(norm.m, norm.e)}`, color: MANIM.orange });
    captions.push(
      norm.e !== re
        ? `Se ajusta la mantisa a $[1, 10)$: $${T(norm.m, norm.e)}$.`
        : `Ya está en notación científica: $${T(norm.m, norm.e)}$.`,
    );
  } else {
    const hi = a >= b ? { m: m1, e: a } : { m: m2, e: b };
    const lo = a >= b ? { m: m2, e: b } : { m: m1, e: a };
    const shift = hi.e - lo.e;
    const loShift = parseFloat((lo.m / 10 ** shift).toPrecision(12));
    const r = hi.m + loShift;
    const norm = normalizeSci(r, hi.e);
    lines.push({ text: `${P(m1, a)} + ${P(m2, b)}`, color: MANIM.ink });
    captions.push(`Queremos $${T(m1, a)} + ${T(m2, b)}$. Para sumar hace falta **el mismo exponente**.`);
    lines.push({ text: `${P(lo.m, lo.e)} = ${fmtSci(loShift)} · 10${sup(hi.e)}`, color: MANIM.blue });
    captions.push(`Pasamos el de menor exponente al mayor: $${T(lo.m, lo.e)} = ${T(loShift, hi.e)}$ (la coma se desplaza ${shift} ${shift === 1 ? "lugar" : "lugares"}).`);
    lines.push({ text: `(${fmtSci(hi.m)} + ${fmtSci(loShift)}) · 10${sup(hi.e)}`, color: MANIM.yellow });
    captions.push(`Con el mismo exponente, se **saca factor común** $10^{${hi.e}}$ y se suman las mantisas.`);
    lines.push({ text: `= ${P(norm.m, norm.e)}`, color: MANIM.orange });
    captions.push(
      norm.e !== hi.e
        ? `Mantisa fuera de $[1, 10)$: se ajusta. Resultado: $${T(norm.m, norm.e)}$.`
        : `Resultado: $${T(norm.m, norm.e)}$.`,
    );
  }

  return {
    label: `Operación con notación científica (${op}): ${lines[0]!.text} = ${lines[lines.length - 1]!.text.replace("= ", "")}`,
    captions,
    beatMs: 4000,
    render: (beat) => (
      <Canvas>
        {lines.map((l, i) => (
          <Fade key={i} show={beat >= i} dy={14}>
            <Txt x={400} y={90 + i * 78} size={i === lines.length - 1 ? 46 : 38} color={l.color}>{l.text}</Txt>
          </Fade>
        ))}
      </Canvas>
    ),
  };
}
