import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";

const clampInt = (v: number | undefined, d: number, lo: number, hi: number) =>
  Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? (v as number) : d)));

/** Para pocas cifras: potencia con separador de miles. */
const big = (n: number) => fmtEs(n, 0);
const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
const sup = (n: number) => String(n).split("").map((d) => SUP[Number(d)]).join("");

/**
 * El logaritmo es un exponente. `a` = base, `b` = exponente que se busca (0–5).
 * Escalera de potencias a⁰, a¹, … y la pregunta «¿a qué exponente?».
 */
export function buildLogaritmoExponente(params: { a?: number; b?: number }): AnimBuild {
  const a = clampInt(params.a, 2, 2, 10);
  const maxK = a >= 7 ? 4 : 5;
  const b = clampInt(params.b, 3, 1, maxK);
  const value = Math.pow(a, b);
  const ks = Array.from({ length: maxK + 1 }, (_, i) => i);
  const w = 112;
  const x0 = 400 - ((maxK + 1) * w) / 2;
  return {
    label: `El logaritmo en base ${a} de ${value} es el exponente ${b}`,
    captions: [
      `Las potencias de ${a} crecen al subir el exponente: $${a}^0 = 1,\\ ${a}^1 = ${a},\\ ${a}^2 = ${a * a}\\ldots$ Cada casilla es un exponente con su resultado.`,
      `Fijémonos en $${big(value)}$. Pregunta: **¿a qué exponente hay que elevar ${a} para obtener ${big(value)}?**`,
      `Es el exponente $${b}$, porque $${a}^{${b}} = ${big(value)}$. Esa respuesta se llama **logaritmo en base ${a}** de ${big(value)}.`,
      `Se escribe $\\log_{${a}} ${value} = ${b}$. Es la misma igualdad leída al revés: $\\log_{${a}} ${value} = ${b} \\iff ${a}^{${b}} = ${value}$.`,
    ],
    beatMs: 4400,
    render: (beat) => (
      <Canvas>
        {ks.map((k) => {
          const cx = x0 + k * w + w / 2;
          const hit = k === b;
          const lit = beat >= 1 && hit;
          return (
            <g key={k}>
              <rect
                x={cx - 50}
                y={130}
                width={100}
                height={78}
                rx={10}
                fill={lit ? MANIM.panel : MANIM.surface}
                stroke={lit ? MANIM.yellow : MANIM.grid}
                strokeWidth={lit ? 4 : 2}
              />
              <Txt x={cx} y={178} size={a ** k > 9999 ? 26 : 32} color={lit ? MANIM.yellow : MANIM.ink}>{big(a ** k)}</Txt>
              <Txt x={cx} y={116} size={22} color={MANIM.muted}>{`${a}${sup(k)}`}</Txt>
              <Txt x={cx} y={242} size={24} color={lit ? MANIM.orange : MANIM.muted}>{`exp. ${k}`}</Txt>
            </g>
          );
        })}
        <Fade show={beat >= 1 && beat < 2} dy={8}>
          <Txt x={400} y={64} size={30} color={MANIM.yellow}>{`${a}ˣ = ${big(value)}  →  ¿x?`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={64} size={32} color={MANIM.orange}>{`${a}${sup(b)} = ${big(value)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <rect x={200} y={290} width={400} height={84} rx={12} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={400} y={346} size={42} color={MANIM.green}>{`log${String(a).split("").map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]).join("")} ${big(value)} = ${b}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/**
 * Logaritmo de un producto y de un cociente. `a` = base, `b` y `c` = exponentes de x e y (x = aᵇ, y = aᶜ).
 */
export function buildLogaritmoProducto(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const a = clampInt(params.a, 2, 2, 10);
  const m = clampInt(params.b, 3, 2, 5);
  const k = Math.min(clampInt(params.c, 2, 1, 5), m - 1);
  const x = Math.pow(a, m);
  const y = Math.pow(a, k);
  const U = 46;
  const X0 = 170;
  const sub = (n: number) => String(n).split("").map((d) => "₀₁₂₃₄₅₆₇₈₉"[Number(d)]).join("");
  const lg = `log${sub(a)}`;
  const maxLen = (m + k) * U;
  return {
    label: `El logaritmo de un producto es la suma de logaritmos y el de un cociente, la resta`,
    captions: [
      `Tomamos $x = ${a}^{${m}} = ${big(x)}$ e $y = ${a}^{${k}} = ${big(y)}$. Sus logaritmos en base ${a} son sus exponentes: $${m}$ y $${k}$. Cada uno se representa como una barra de esa longitud.`,
      `Producto: $x\\cdot y = ${a}^{${m}}\\cdot ${a}^{${k}} = ${a}^{${m}+${k}} = ${a}^{${m + k}} = ${big(x * y)}$. Al multiplicar potencias de la misma base **los exponentes se suman**: las barras se ponen una a continuación de otra.`,
      `Por tanto $\\log_{${a}}(x\\cdot y) = ${m + k} = \\log_{${a}} x + \\log_{${a}} y$. **El logaritmo de un producto es la suma de los logaritmos.**`,
      `Cociente: $x/y = ${a}^{${m}-${k}} = ${a}^{${m - k}}$. Los exponentes se restan y $\\log_{${a}}(x/y) = ${m - k} = \\log_{${a}} x - \\log_{${a}} y$.`,
    ],
    beatMs: 4600,
    render: (beat) => (
      <Canvas>
        <Txt x={X0 - 10} y={96} size={24} color={MANIM.blue} anchor="end">{`${lg} x`}</Txt>
        <rect x={X0} y={72} width={m * U} height={38} rx={6} fill={MANIM.blue} />
        <Txt x={X0 + (m * U) / 2} y={100} size={24} color={MANIM.surface}>{String(m)}</Txt>
        <Txt x={X0 - 10} y={162} size={24} color={MANIM.orange} anchor="end">{`${lg} y`}</Txt>
        <rect x={X0} y={138} width={k * U} height={38} rx={6} fill={MANIM.orange} />
        <Txt x={X0 + (k * U) / 2} y={166} size={24} color={MANIM.surface}>{String(k)}</Txt>
        <Fade show={beat >= 1 && beat < 3} dy={10}>
          <Txt x={X0 - 10} y={250} size={24} color={MANIM.green} anchor="end">{`${lg} (x·y)`}</Txt>
          <rect x={X0} y={226} width={m * U} height={38} rx={6} fill={MANIM.blue} />
          <rect x={X0 + m * U} y={226} width={k * U} height={38} rx={6} fill={MANIM.orange} />
          <Txt x={X0 + (maxLen) / 2} y={254} size={24} color={MANIM.surface}>{`${m} + ${k}`}</Txt>
        </Fade>
        <Fade show={beat >= 2 && beat < 3} dy={10}>
          <Txt x={400} y={340} size={34} color={MANIM.green}>{`${lg}(x·y) = ${m + k} = ${m} + ${k}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={X0 - 10} y={250} size={24} color={MANIM.green} anchor="end">{`${lg} (x/y)`}</Txt>
          <rect x={X0} y={226} width={Math.max(0, (m - k) * U)} height={38} rx={6} fill={MANIM.blue} />
          <rect x={X0 + Math.max(0, m - k) * U} y={226} width={k * U} height={38} rx={6} fill={MANIM.orange} opacity={0.25} stroke={MANIM.orange} strokeDasharray="6 5" />
          <Txt x={400} y={340} size={34} color={MANIM.green}>{`${lg}(x/y) = ${m - k} = ${m} − ${k}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
