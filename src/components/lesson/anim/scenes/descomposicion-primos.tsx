import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { factorize, factorsToString, smallestPrimeFactor } from "@/components/lesson/anim/number-theory";
import { fmt } from "@/components/lesson/anim/format";

const ROW_H = 50;
const Y0 = 84;
const LINE_X = 250;

const digitSum = (v: number) => String(v).split("").reduce((acc, d) => acc + Number(d), 0);

function why(v: number, p: number): string {
  if (p === 2) {
    return `**${fmt(v)}** es par: lo dividimos entre $2$.`;
  }
  if (p === 3 && digitSum(v) % 3 === 0) {
    return `**${fmt(v)}** no es par, pero sus cifras suman $${digitSum(v)}$: es divisible entre $3$.`;
  }
  if (p === 5) {
    return `**${fmt(v)}** acaba en $5$: lo dividimos entre $5$.`;
  }
  return `El menor primo que divide a **${fmt(v)}** es el $${p}$.`;
}

/** Descomposición en factores primos con la línea vertical: dividir siempre entre el primo más pequeño. */
export function buildDescomposicionPrimos(params: { n?: number }): AnimBuild {
  const n = params.n ?? 180;
  const rows: { v: number; p: number }[] = [];
  for (let v = n; v > 1; ) {
    const p = smallestPrimeFactor(v);
    rows.push({ v, p });
    v /= p;
  }
  const f = factorize(n);
  const plain = rows.map((r) => r.p).join(" · ");
  const compact = factorsToString(f);
  const R = rows.length;
  const lineEnd = Y0 + (R + 1) * ROW_H - 18;

  return {
    label: `Descomposición de ${fmt(n)} en factores primos: ${compact}`,
    captions: [
      `Escribimos **${fmt(n)}** y trazamos una línea vertical a su derecha.`,
      ...rows.map(({ v, p }) => `${why(v, p)} $${v} : ${p} = ${v / p}$`),
      `Llegamos a $1$: fin. Los primos de la columna derecha son los factores. Los repetidos se agrupan en **potencias**.`,
    ],
    beatMs: 2800,
    render: (beat) => (
      <Canvas>
        <WriteLine show x1={LINE_X} y1={Y0 - 34} x2={LINE_X} y2={lineEnd} color={MANIM.muted} width={3} />
        <Txt x={LINE_X - 22} y={Y0} size={34} color={MANIM.ink} anchor="end">{fmt(n)}</Txt>
        {rows.map(({ v, p }, i) => {
          const done = beat >= i + 1;
          const current = beat === i + 1;
          const last = i === R - 1;
          const quotient = v / p;
          return (
            <g key={i}>
              <Fade show={done} dx={-14}>
                <Txt x={LINE_X + 22} y={Y0 + i * ROW_H} size={34} color={current ? MANIM.yellow : MANIM.green} anchor="start">{p}</Txt>
              </Fade>
              <Fade show={done} dy={-14} delay={200}>
                <Txt x={LINE_X - 22} y={Y0 + (i + 1) * ROW_H} size={34} color={last ? MANIM.green : MANIM.ink} anchor="end">{fmt(quotient)}</Txt>
              </Fade>
            </g>
          );
        })}
        <Fade show={beat === R + 1} dy={10}>
          <Txt x={560} y={170} size={22} color={MANIM.muted}>factores primos</Txt>
          <Txt x={560} y={216} size={32} color={MANIM.ink}>{`${fmt(n)} = ${plain}`}</Txt>
          <Txt x={560} y={286} size={36} color={MANIM.yellow}>{`${fmt(n)} = ${compact}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
