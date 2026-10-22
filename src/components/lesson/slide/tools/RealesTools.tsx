"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { exactRoot, gcd, factorPowers, radicalTex, rationalizeSqrt, realRoot, simplifyRadical, sqrtBounds } from "@/components/lesson/anim/radicals";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const approx = (x: number, d = 4) => x.toFixed(d).replace(".", ",").replace("-", "−");
const approxTex = (x: number, d = 4) => approx(x, d).replace(",", "{,}").replace("−", "-");

/* ───────────── √n atrapada entre decimales ───────────── */

export function RaizAproxExplorador({ block }: { block: ToolBlock }) {
  const n0 = int(block.params?.a, 2, 2, 50);
  const d0 = int(block.params?.b, 3, 0, 6);
  const [n, setN] = useState(n0);
  const [digits, setDigits] = useState(d0);
  const b = sqrtBounds(n, digits);
  const sq = (s: string) => (Number(s.replace(",", ".")) ** 2).toFixed(2 * digits).replace(".", ",");

  return (
    <Frame
      hint={block.hint ?? "Aumenta las cifras: el tramo se estrecha pero, si la raíz no es exacta, nunca se cierra del todo."}
      onReset={() => {
        setN(n0);
        setDigits(d0);
      }}
      controls={
        <>
          <Slider label="Radicando" value={n} min={2} max={50} color={MANIM.blue} onChange={setN} />
          <Slider label="Cifras decimales" value={digits} min={0} max={6} color={MANIM.orange} onChange={setDigits} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${b.lower.replace(",", "{,}")} \\le \\sqrt{${n}} \\le ${b.upper.replace(",", "{,}")}$`} className="text-2xl" />
        <div className="mt-2 text-lg">
          <MathRenderer text={`$${b.lower.replace(",", "{,}")}^2 = ${sq(b.lower).replace(",", "{,}")}$ y $${b.upper.replace(",", "{,}")}^2 = ${sq(b.upper).replace(",", "{,}")}$`} />
        </div>
        <p className="mt-2 text-lg font-semibold" style={{ color: b.exact ? MANIM.green : MANIM.orange }} data-testid="tool-raiz-tipo">
          {b.exact ? "Raíz exacta: es un número entero (racional)" : "No es un cuadrado perfecto: la raíz es irracional"}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── ¿En qué conjuntos está? ───────────── */

type Num = { tex: string; n: boolean; z: boolean; q: boolean; note: string };

export const NUMEROS: Num[] = [
  { tex: "24", n: true, z: true, q: true, note: "Natural: también es entero y racional." },
  { tex: "-5", n: false, z: true, q: true, note: "Entero negativo: no es natural." },
  { tex: "\\dfrac{28}{7}", n: true, z: true, q: true, note: "$\\frac{28}{7} = 4$: parece fracción, pero es natural." },
  { tex: "0{,}71", n: false, z: false, q: true, note: "Decimal exacto: $\\frac{71}{100}$." },
  { tex: "0{,}\\overline{71}", n: false, z: false, q: true, note: "Decimal periódico: tiene fracción generatriz $\\frac{71}{99}$." },
  { tex: "\\dfrac{3}{5}", n: false, z: false, q: true, note: "Fracción: racional (no entero)." },
  { tex: "-\\sqrt{9}", n: false, z: true, q: true, note: "$-\\sqrt{9} = -3$: entero." },
  { tex: "\\sqrt{36}", n: true, z: true, q: true, note: "$\\sqrt{36} = 6$: natural." },
  { tex: "\\sqrt{7}", n: false, z: false, q: false, note: "7 no es cuadrado perfecto: irracional." },
  { tex: "\\sqrt{20}", n: false, z: false, q: false, note: "20 no es cuadrado perfecto: irracional." },
  { tex: "\\pi - 1", n: false, z: false, q: false, note: "$\\pi$ es irracional y restar $1$ no lo cambia." },
  { tex: "1{,}010203\\ldots", n: false, z: false, q: false, note: "Infinitas cifras sin periodo (cada vez un número más): irracional." },
];

export function ConjuntosExplorador({ block }: { block: ToolBlock }) {
  const i0 = int(block.params?.a, 0, 0, NUMEROS.length - 1);
  const [idx, setIdx] = useState(i0);
  const cur = NUMEROS[idx]!;
  const chips: { label: string; on: boolean; color: string }[] = [
    { label: "ℕ naturales", on: cur.n, color: MANIM.blue },
    { label: "ℤ enteros", on: cur.z, color: MANIM.orange },
    { label: "ℚ racionales", on: cur.q, color: MANIM.green },
    { label: "Irracionales", on: !cur.q, color: MANIM.red },
    { label: "ℝ reales", on: true, color: MANIM.purple },
  ];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige números y comprueba en qué conjuntos están. Algunos aparecen en más de uno."}
      onReset={() => setIdx(i0)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Números">
          {NUMEROS.map((x, i) => (
            <button key={i} type="button" className={`${TOOL_BTN} ${i === idx ? "border-white bg-white/20" : ""}`} aria-pressed={i === idx} aria-label={`Número ${i + 1}`} onClick={() => setIdx(i)}>
              <MathRenderer text={`$${x.tex}$`} />
            </button>
          ))}
        </div>
      }
    >
      <Readout>
        <MathRenderer text={`$${cur.tex}$`} className="text-4xl" />
      </Readout>
      <div className="flex flex-wrap gap-2" data-testid="tool-conjuntos">
        {chips.map((c) => (
          <span
            key={c.label}
            className="rounded-full border px-3 py-1 text-sm font-semibold"
            style={{ borderColor: c.color, color: c.on ? "#0e1522" : c.color, background: c.on ? c.color : "transparent", opacity: c.on ? 1 : 0.5 }}
            data-on={c.on}
          >
            {c.on ? "✓ " : "✗ "}
            {c.label}
          </span>
        ))}
      </div>
      <p className="text-[color:var(--stage-ink,#fff)]">
        <MathRenderer text={cur.note} />
      </p>
    </Frame>
  );
}

/* ───────────── Raíz n-ésima: existencia y valor ───────────── */

export function RaizIndiceExplorador({ block }: { block: ToolBlock }) {
  const i0 = int(block.params?.a, 3, 2, 7);
  const a0 = int(block.params?.b, -8, -128, 256);
  const [index, setIndex] = useState(i0);
  const [a, setA] = useState(a0);
  const r = realRoot(a, index);
  const negRoot = a < 0 && index % 2 === 1 ? exactRoot(-a, index) : null;
  const exact = a >= 0 ? exactRoot(a, index) : negRoot === null ? null : -negRoot;
  const exists = !Number.isNaN(r);
  const tex = `\\sqrt${index === 2 ? "" : `[${index}]`}{${a}}`;

  return (
    <Frame
      hint={block.hint ?? "Prueba un radicando negativo con índice par y con índice impar. ¿Cuándo existe la raíz?"}
      onReset={() => {
        setIndex(i0);
        setA(a0);
      }}
      controls={
        <>
          <Slider label="Índice" value={index} min={2} max={7} color={MANIM.orange} onChange={setIndex} />
          <Slider label="Radicando" value={a} min={-128} max={256} color={MANIM.blue} onChange={setA} format={(x) => String(x).replace("-", "−")} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${tex}$`} className="text-4xl" />
        {!exists ? (
          <p className="mt-2 text-lg" style={{ color: MANIM.red }} data-testid="tool-raiz-existe">
            No existe en los reales: un número elevado a un exponente par nunca es negativo.
          </p>
        ) : exact !== null ? (
          <p className="mt-2 text-xl" data-testid="tool-raiz-existe">
            <MathRenderer text={`$= ${exact}$ (raíz exacta, porque $${exact}^{${index}} = ${a}$)`} />
          </p>
        ) : (
          <p className="mt-2 text-xl" data-testid="tool-raiz-existe">
            <MathRenderer text={`$\\approx ${approxTex(r)}$ (irracional)`} />
          </p>
        )}
      </div>
    </Frame>
  );
}

/* ───────────── Forma exponencial ───────────── */

export function RadicalExponencialExplorador({ block }: { block: ToolBlock }) {
  const m0 = int(block.params?.b, 2, 1, 12);
  const n0 = int(block.params?.a, 3, 2, 9);
  const [m, setM] = useState(m0);
  const [n, setN] = useState(n0);
  const g = gcd(m, n);
  const sm = m / g;
  const sn = n / g;
  const value = 2 ** (m / n);
  const simplifiedTex = sn === 1 ? `a^{${sm}}` : `a^{\\frac{${sm}}{${sn}}}`;
  const radical = `\\sqrt${n === 2 ? "" : `[${n}]`}{a^{${m}}}`;
  const simpRadical = sn === 1 ? `a^{${sm}}` : `\\sqrt${sn === 2 ? "" : `[${sn}]`}{a^{${sm}}}`;

  return (
    <Frame
      hint={block.hint ?? "Cuando el exponente es múltiplo del índice, el radical desaparece. Busca esos casos."}
      onReset={() => {
        setM(m0);
        setN(n0);
      }}
      controls={
        <>
          <Slider label="Exponente del radicando" value={m} min={1} max={12} color={MANIM.blue} onChange={setM} />
          <Slider label="Índice" value={n} min={2} max={9} color={MANIM.orange} onChange={setN} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${radical} = a^{\\frac{${m}}{${n}}}$`} className="text-3xl" />
        <MathRenderer text={`Simplificando: $${simplifiedTex}$${sn === 1 ? " (¡sin radical!)" : g > 1 ? ` $= ${simpRadical}$` : " (irreducible)"}`} className="text-xl" />
        <MathRenderer text={`Con $a = 2$: $\\approx ${approxTex(value)}$`} className="text-lg" />
      </div>
    </Frame>
  );
}

/* ───────────── Extraer factores ───────────── */

export function RadicalSimplificador({ block }: { block: ToolBlock }) {
  const n0 = int(block.params?.a, 720, 2, 1000);
  const i0 = int(block.params?.b, 2, 2, 4);
  const [n, setN] = useState(n0);
  const [index, setIndex] = useState(i0);
  const { k, m } = simplifyRadical(n, index);
  const powers = factorPowers(n);
  const original = n ** (1 / index);
  const tex = (x: number) => `\\sqrt${index === 2 ? "" : `[${index}]`}{${x}}`;
  const fact = powers.map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(" \\cdot ");

  return (
    <Frame
      hint={block.hint ?? "Busca un radicando que ya sea un cuadrado perfecto y otro sin ningún factor repetido."}
      onReset={() => {
        setN(n0);
        setIndex(i0);
      }}
      controls={
        <>
          <Slider label="Radicando" value={n} min={2} max={1000} color={MANIM.blue} onChange={setN} />
          <Slider label="Índice" value={index} min={2} max={4} color={MANIM.orange} onChange={setIndex} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${tex(n)} = ${tex(1).replace("{1}", `{${fact}}`)}$`} className="text-2xl" />
        <MathRenderer text={`$= ${radicalTex(k, m, index)}$`} className="text-4xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-radical-nota">
          {m === 1 ? "Sin radical: raíz exacta." : k === 1 ? "No se puede extraer ningún factor." : `Salen ${k} y queda ${m} dentro.`} Valor: {approx(original)}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Racionalizar ───────────── */

export function RacionalizarExplorador({ block }: { block: ToolBlock }) {
  const a0 = int(block.params?.a, 3, 1, 9);
  const b0 = int(block.params?.b, 2, 2, 12);
  const [a, setA] = useState(a0);
  const [b, setB] = useState(b0);
  const r = rationalizeSqrt(a, b);
  const before = a / Math.sqrt(b);
  const after = (r.coef * Math.sqrt(r.radicand)) / r.den;
  const resultTex = `${r.coef === 1 ? "" : r.coef}${r.radicand === 1 ? "" : `\\sqrt{${r.radicand}}`}`;
  const frac = r.den === 1 ? resultTex : `\\dfrac{${resultTex || 1}}{${r.den}}`;

  return (
    <Frame
      hint={block.hint ?? "Cambia a y b: el valor decimal de las dos expresiones es siempre el mismo."}
      onReset={() => {
        setA(a0);
        setB(b0);
      }}
      controls={
        <>
          <Slider label="Numerador" value={a} min={1} max={9} color={MANIM.blue} onChange={setA} />
          <Slider label="Radicando del denominador" value={b} min={2} max={12} color={MANIM.orange} onChange={setB} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${a}}{\\sqrt{${b}}} = \\dfrac{${a}}{\\sqrt{${b}}} \\cdot \\dfrac{\\sqrt{${b}}}{\\sqrt{${b}}} = \\dfrac{${a}\\sqrt{${b}}}{${b}}$`} className="text-2xl" />
        <MathRenderer text={`$= ${frac}$`} className="text-4xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-racionaliza-valor">
          Antes: {approx(before)} · Después: {approx(after)}
        </p>
      </div>
      <Svg w={420} h={30} testId="tool-racionaliza-barra">
        <rect x={10} y={6} width={Math.min(400, (before / 5) * 400)} height={8} rx={4} fill={MANIM.blue} />
        <rect x={10} y={18} width={Math.min(400, (after / 5) * 400)} height={8} rx={4} fill={MANIM.orange} />
      </Svg>
    </Frame>
  );
}
