import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { expandFraction, expansionTex } from "@/components/lesson/anim/periodic";
import type { AnimBuild } from "@/components/lesson/anim/types";

const MAX_NODES = 9;
const R = 25;
const Y = 150;

const KIND_TEXT = {
  exacto: "decimal **exacto**: el resto llega a $0$ y la división acaba.",
  puro: "decimal **periódico puro**: el periodo empieza justo después de la coma.",
  mixto: "decimal **periódico mixto**: hay cifras que no se repiten antes del periodo.",
} as const;

/** Fracción → decimal: los restos posibles son menos que el divisor, así que acaban en 0 o se repiten. */
export function buildDecimalPeriodicoRestos(params: { a?: number; b?: number }): AnimBuild {
  const d = Math.min(Math.max(Math.round(params.b ?? 33), 2), 99);
  const n = Math.min(Math.max(Math.round(params.a ?? 41), 1), 999);
  const e = expandFraction(n, d);
  const shown = Math.min(e.rems.length, MAX_NODES);
  const x = (i: number) => 400 + (i - (shown - 1) / 2) * Math.min(150, 640 / Math.max(shown - 1, 1));
  const periodic = e.kind !== "exacto";
  const last = shown - 1;
  const closes = periodic && shown === e.rems.length;
  // Cifras que se dibujan en el resultado: entero, pre, dos vueltas del periodo y puntos suspensivos.
  const preDigits = e.pre.split("");
  const perDigits = periodic ? (e.per.length <= 6 ? e.per.repeat(2) : e.per).split("") : [];
  const digits = [...preDigits, ...perDigits];
  const GAP = 46;
  const ix = String(e.int);
  const startX = 400 - ((ix.length + 1 + digits.length) * GAP) / 2;
  const dx = (i: number) => startX + (ix.length + 1 + i) * GAP;

  return {
    label: `${n}/${d} en decimal: ${e.kind} (${e.int},${e.pre}${e.per ? e.per : ""}…)`,
    captions: [
      `Una fracción es una división indicada: $${n} : ${d}$. Tras la parte entera ($${e.int}$) queda **resto $${e.rems[0]}$**.`,
      `Cada cifra decimal sale de bajar un $0$ al resto y dividir otra vez. Sigamos la cadena de **restos**.`,
      periodic
        ? `El resto $${e.rems[e.rems.length - 1]}$ **ya había salido**: desde aquí todo se repite. Solo hay $${d - 1}$ restos posibles, así que tiene que pasar.`
        : `El resto llega a $0$: no queda nada por repartir y la división **acaba**.`,
      `$\\dfrac{${n}}{${d}} = ${expansionTex(e)}$: ${KIND_TEXT[e.kind]}`,
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Txt x={400} y={200} size={64} color={MANIM.ink}>{`${n} : ${d}`}</Txt>
          <Txt x={400} y={270} size={30} color={MANIM.muted}>{`= ${e.int}  y resto  ${e.rems[0]}`}</Txt>
        </Fade>
        {e.rems.slice(0, shown).map((r, i) => (
          <Fade key={i} show={beat >= 1} dy={10} delay={i * 200}>
            <circle
              cx={x(i)}
              cy={Y}
              r={R}
              fill={MANIM.panel}
              stroke={beat >= 2 && ((periodic && (i === last || (closes && i === e.loopAt))) || (!periodic && r === 0)) ? (periodic ? MANIM.orange : MANIM.green) : MANIM.blue}
              strokeWidth={3}
              className="anim-t"
            />
            <Txt x={x(i)} y={Y + 9} size={24} color={MANIM.ink}>{r}</Txt>
            {i < shown - 1 ? (
              <g>
                <path d={`M ${x(i) + R + 4} ${Y} L ${x(i + 1) - R - 8} ${Y}`} stroke={MANIM.muted} strokeWidth={2.5} />
                <path d={`M ${x(i + 1) - R - 8} ${Y - 6} L ${x(i + 1) - R - 2} ${Y} L ${x(i + 1) - R - 8} ${Y + 6}`} stroke={MANIM.muted} strokeWidth={2.5} fill="none" />
                <Txt x={(x(i) + x(i + 1)) / 2} y={Y - 16} size={18} color={MANIM.yellow}>{`cifra ${e.pre.concat(e.per)[i] ?? "·"}`}</Txt>
              </g>
            ) : null}
          </Fade>
        ))}
        <Fade show={beat >= 2 && closes} dy={-8}>
          <path
            d={`M ${x(last)} ${Y + R + 4} Q ${(x(last) + x(e.loopAt)) / 2} ${Y + 95} ${x(e.loopAt)} ${Y + R + 4}`}
            fill="none"
            stroke={MANIM.orange}
            strokeWidth={3}
            strokeDasharray="8 6"
          />
          <Txt x={(x(last) + x(e.loopAt)) / 2} y={Y + 100} size={24} color={MANIM.orange}>se repite</Txt>
        </Fade>
        <Fade show={beat >= 2 && !periodic} dy={-8}>
          <Txt x={x(last)} y={Y + 66} size={24} color={MANIM.green}>resto 0 → acaba</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={14}>
          <Txt x={startX + (ix.length * GAP) / 2} y={330} size={46} color={MANIM.ink}>{ix}</Txt>
          <Txt x={startX + ix.length * GAP + GAP / 2 - 4} y={330} size={46} color={MANIM.ink}>,</Txt>
          {digits.map((c, i) => (
            <Txt key={i} x={dx(i) + GAP / 2} y={330} size={46} color={i >= preDigits.length ? MANIM.orange : MANIM.blue}>{c}</Txt>
          ))}
          {periodic ? <Txt x={dx(digits.length) + GAP / 2} y={330} size={46} color={MANIM.muted}>…</Txt> : null}
          {periodic ? (
            <HBrace show x1={dx(preDigits.length) + 6} x2={dx(preDigits.length + e.per.length) - 6} y={346} color={MANIM.orange} label="periodo" labelSize={22} />
          ) : null}
        </Fade>
      </Canvas>
    ),
  };
}
