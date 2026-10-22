"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { add, commonFactor, degree, evaluate, lcm, monoDegree, monoSimilar, monoTex, monoValue, mul, polyTex, sub, type Mono, type Poly } from "@/components/lesson/anim/poly";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const seg = (label: string, on: boolean, onClick: () => void, key?: string) => (
  <button key={key ?? label} type="button" className={`${TOOL_BTN} ${on ? "border-white bg-white/20" : ""}`} aria-pressed={on} onClick={onClick}>
    {label}
  </button>
);
const paren = (n: number) => (n < 0 ? `(${n})` : String(n));

/* ───────────── Monomio: coeficiente, grado y valor ───────────── */

export function MonomioExplorador({ block }: { block: ToolBlock }) {
  const init = { c: int(block.params?.a, -5, -9, 9), p: int(block.params?.b, 2, 0, 5), q: int(block.params?.c, 1, 0, 4), x: 2, y: -3 };
  const [v, setV] = useState(init);
  const m: Mono = { c: v.c, p: v.p, q: v.q };
  const value = monoValue(m, v.x, v.y);
  const sample: Mono = { c: 7, p: v.p, q: v.q };
  const other: Mono = { c: 1, p: v.p + 1, q: v.q };

  return (
    <Frame
      hint={block.hint ?? "Cambia el coeficiente y los exponentes: el grado es la suma de los exponentes. Prueba a hacerlos 0."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Coeficiente" value={v.c} min={-9} max={9} color={MANIM.blue} onChange={(c) => setV((p) => ({ ...p, c }))} format={(x) => String(x).replace("-", "−")} />
          <Slider label="Exponente de x" value={v.p} min={0} max={5} color={MANIM.green} onChange={(p) => setV((s) => ({ ...s, p }))} />
          <Slider label="Exponente de y" value={v.q} min={0} max={4} color={MANIM.orange} onChange={(q) => setV((s) => ({ ...s, q }))} />
          <Slider label="Valor de x" value={v.x} min={-5} max={5} color={MANIM.yellow} onChange={(x) => setV((s) => ({ ...s, x }))} format={(x) => String(x).replace("-", "−")} />
          <Slider label="Valor de y" value={v.y} min={-5} max={5} color={MANIM.purple} onChange={(y) => setV((s) => ({ ...s, y }))} format={(x) => String(x).replace("-", "−")} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${monoTex(m)}$`} className="text-4xl" />
        <p className="text-lg" data-testid="tool-mono-datos">
          Coeficiente {v.c} · parte literal {v.p + v.q === 0 ? "ninguna" : <MathRenderer text={`$${monoTex({ c: 1, p: v.p, q: v.q })}$`} className="inline" />} · grado {monoDegree(m)}
        </p>
        <MathRenderer text={`Valor para $x = ${v.x},\\ y = ${v.y}$: $${v.c}${v.p === 0 ? "" : `\\cdot ${paren(v.x)}^{${v.p}}`}${v.q === 0 ? "" : `\\cdot ${paren(v.y)}^{${v.q}}`} = ${value}$`} />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-mono-semejante">
          {monoSimilar(m, sample) ? "Es semejante a " : "No es semejante a "}
          <MathRenderer text={`$${monoTex(sample)}$`} className="inline" /> y {monoSimilar(m, other) ? "es" : "no es"} semejante a <MathRenderer text={`$${monoTex(other)}$`} className="inline" />
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Operar monomios ───────────── */

export function MonomiosOperador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { op: (["+", "-", "·", ":"] as const)[int(ini[6], 0, 0, 3)], a: int(ini[0], 3, -9, 9), p: int(ini[1], 2, 0, 4), b: int(ini[2], 4, -9, 9), q: int(ini[3], 2, 0, 4) };
  const [v, setV] = useState({ ...init });
  const A: Mono = { c: v.a === 0 ? 1 : v.a, p: v.p, q: 0 };
  const B: Mono = { c: v.b === 0 ? 1 : v.b, p: v.q, q: 0 };
  let resultTex = "";
  let note = "";
  if (v.op === "+" || v.op === "-") {
    if (monoSimilar(A, B)) {
      const c = v.op === "+" ? A.c + B.c : A.c - B.c;
      resultTex = monoTex({ c, p: A.p, q: 0 });
      note = "Semejantes: se suman (restan) los coeficientes.";
    } else {
      resultTex = `${monoTex(A)} ${v.op === "+" ? "+" : "-"} ${B.c < 0 ? `(${monoTex(B)})` : monoTex(B)}`;
      note = "No son semejantes: la suma se deja indicada.";
    }
  } else if (v.op === "·") {
    resultTex = monoTex({ c: A.c * B.c, p: A.p + B.p, q: 0 });
    note = "Se multiplican los coeficientes y se suman los exponentes.";
  } else {
    const c = A.c / B.c;
    const e = A.p - B.p;
    const frac = Number.isInteger(c) ? String(c) : `\\frac{${A.c}}{${B.c}}`;
    if (e >= 0) {
      resultTex = Number.isInteger(c) ? monoTex({ c, p: e, q: 0 }) : `${frac}${e === 0 ? "" : e === 1 ? "x" : `x^{${e}}`}`;
      note = "Se dividen los coeficientes y se restan los exponentes.";
    } else {
      resultTex = `\\frac{${A.c}}{${B.c}x^{${-e}}}`.replace("x^{1}", "x");
      note = "El exponente sale negativo: el resultado no es un monomio (la x queda en el denominador).";
    }
  }
  const op = v.op === "·" ? "\\cdot" : v.op === ":" ? ":" : v.op;

  return (
    <Frame
      hint={block.hint ?? "Prueba las cuatro operaciones con los mismos monomios: ¿cuándo se puede sumar? ¿cuándo el cociente deja de ser un monomio?"}
      onReset={() => setV({ ...init })}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {(["+", "-", "·", ":"] as const).map((o) => seg(o === "-" ? "−" : o, v.op === o, () => setV((p) => ({ ...p, op: o })), o))}
          </div>
          <Slider label="Coeficiente de A" value={v.a} min={-9} max={9} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={(x) => String(x).replace("-", "−")} />
          <Slider label="Exponente de A" value={v.p} min={0} max={4} color={MANIM.blue} onChange={(p) => setV((s) => ({ ...s, p }))} />
          <Slider label="Coeficiente de B" value={v.b} min={-9} max={9} color={MANIM.orange} onChange={(b) => setV((p) => ({ ...p, b }))} format={(x) => String(x).replace("-", "−")} />
          <Slider label="Exponente de B" value={v.q} min={0} max={4} color={MANIM.orange} onChange={(q) => setV((s) => ({ ...s, q }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$(${monoTex(A)}) ${op} (${monoTex(B)}) = ${resultTex}$`} className="text-3xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-mono-nota">{note}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Polinomio de grado ≤ 3: grado, valor y gráfica ───────────── */

export function PolinomioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { c3: int(ini[0], 0, -5, 5), c2: int(ini[1], 1, -5, 5), c1: int(ini[2], -2, -5, 5), c0: int(ini[3], 1, -9, 9), x: int(block.params?.a, 2, -4, 4) };
  const [v, setV] = useState(init);
  const P: Poly = [v.c0, v.c1, v.c2, v.c3];
  const value = evaluate(P, v.x);
  const W = 420;
  const H = 150;
  const xs = Array.from({ length: 81 }, (_, i) => -4 + i * 0.1);
  const ys = xs.map((x) => evaluate(P, x));
  const ymax = Math.max(10, ...ys.map((y) => Math.min(Math.abs(y), 40)));
  const px = (x: number) => 20 + ((x + 4) / 8) * (W - 40);
  const py = (y: number) => H / 2 - (clamp(y, -ymax, ymax) / ymax) * (H / 2 - 10);
  const path = xs.map((x, i) => `${i === 0 ? "M" : "L"} ${px(x).toFixed(1)} ${py(ys[i]!).toFixed(1)}`).join(" ");
  const f = (x: number) => String(x).replace("-", "−");

  return (
    <Frame
      hint={block.hint ?? "Pon el coeficiente de x³ a 0: el grado baja. Cambia x y comprueba el valor P(x) en la gráfica."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Coeficiente de x³" value={v.c3} min={-5} max={5} color={MANIM.purple} onChange={(c3) => setV((p) => ({ ...p, c3 }))} format={f} />
          <Slider label="Coeficiente de x²" value={v.c2} min={-5} max={5} color={MANIM.blue} onChange={(c2) => setV((p) => ({ ...p, c2 }))} format={f} />
          <Slider label="Coeficiente de x" value={v.c1} min={-5} max={5} color={MANIM.green} onChange={(c1) => setV((p) => ({ ...p, c1 }))} format={f} />
          <Slider label="Término independiente" value={v.c0} min={-9} max={9} color={MANIM.orange} onChange={(c0) => setV((p) => ({ ...p, c0 }))} format={f} />
          <Slider label="Valor de x" value={v.x} min={-4} max={4} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, x }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$P(x) = ${polyTex(P)}$`} className="text-3xl" />
        <p className="text-lg" data-testid="tool-poli-grado">
          Grado: {degree(P)} {P.every((c) => c === 0) ? "(polinomio nulo)" : ""}
        </p>
        <MathRenderer text={`$P(${v.x}) = ${value}$`} className="text-xl" />
      </div>
      <Svg w={W} h={H} testId="tool-poli-grafica">
        <line x1={20} y1={H / 2} x2={W - 20} y2={H / 2} stroke={MANIM.grid} strokeWidth={2} />
        <line x1={px(0)} y1={8} x2={px(0)} y2={H - 8} stroke={MANIM.grid} strokeWidth={2} />
        <path d={path} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <circle cx={px(v.x)} cy={py(value)} r={6} fill={MANIM.yellow} className="anim-t" />
      </Svg>
    </Frame>
  );
}

/* ───────────── Suma y resta de polinomios ───────────── */

export function PolinomiosOperador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const arr = (i: number, d: number) => int(ini[i], d, -5, 5);
  const init = { sub: ini[8] === 1, a: [arr(0, 0), arr(1, 3), arr(2, 5), arr(3, -2)], b: [arr(4, 1), arr(5, 4), arr(6, 0), arr(7, -5)] };
  const [v, setV] = useState(init);
  const A: Poly = [v.a[3]!, v.a[2]!, v.a[1]!, v.a[0]!];
  const B: Poly = [v.b[3]!, v.b[2]!, v.b[1]!, v.b[0]!];
  const R = v.sub ? sub(A, B) : add(A, B);
  const names = ["x³", "x²", "x", "1"];
  const setCoef = (which: "a" | "b", i: number, val: number) => setV((p) => ({ ...p, [which]: p[which].map((c, k) => (k === i ? val : c)) }));
  const f = (x: number) => String(x).replace("-", "−");

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los coeficientes y alterna entre suma y resta: en la resta se cambia el signo de todo el segundo polinomio."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex gap-2 sm:col-span-2">
            {seg("A + B", !v.sub, () => setV((p) => ({ ...p, sub: false })), "s")}
            {seg("A − B", v.sub, () => setV((p) => ({ ...p, sub: true })), "r")}
          </div>
          {names.map((n, i) => (
            <Slider key={`a${n}`} label={`A: coef. de ${n}`} value={v.a[i]!} min={-5} max={5} color={MANIM.blue} onChange={(x) => setCoef("a", i, x)} format={f} />
          ))}
          {names.map((n, i) => (
            <Slider key={`b${n}`} label={`B: coef. de ${n}`} value={v.b[i]!} min={-5} max={5} color={MANIM.orange} onChange={(x) => setCoef("b", i, x)} format={f} />
          ))}
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$A = ${polyTex(A)}$`} className="text-xl" />
        <MathRenderer text={`$B = ${polyTex(B)}$`} className="text-xl" />
        <MathRenderer text={`$A ${v.sub ? "-" : "+"} B = ${polyTex(R)}$`} className="text-3xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-poli-resultado">Grado del resultado: {degree(R)}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Producto de dos binomios ───────────── */

export function ProductoPolinomiosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 1, -5, 5), b: int(ini[1], 2, -9, 9), c: int(ini[2], 1, -5, 5), d: int(ini[3], 3, -9, 9), x: int(block.params?.a, 2, -5, 5) };
  const [v, setV] = useState(init);
  const P: Poly = [v.b, v.a];
  const Q: Poly = [v.d, v.c];
  const R = mul(P, Q);
  const left = evaluate(P, v.x) * evaluate(Q, v.x);
  const right = evaluate(R, v.x);
  const f = (x: number) => String(x).replace("-", "−");

  return (
    <Frame
      hint={block.hint ?? "El producto desarrollado y el factorizado valen lo mismo para cualquier x: cámbiala y compruébalo."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a en (ax + b)" value={v.a} min={-5} max={5} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={f} />
          <Slider label="b en (ax + b)" value={v.b} min={-9} max={9} color={MANIM.blue} onChange={(b) => setV((p) => ({ ...p, b }))} format={f} />
          <Slider label="c en (cx + d)" value={v.c} min={-5} max={5} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} format={f} />
          <Slider label="d en (cx + d)" value={v.d} min={-9} max={9} color={MANIM.orange} onChange={(d) => setV((p) => ({ ...p, d }))} format={f} />
          <Slider label="Valor de x para comprobar" value={v.x} min={-5} max={5} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, x }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$(${polyTex(P)})(${polyTex(Q)})$`} className="text-2xl" />
        <MathRenderer text={`$= ${polyTex(R)}$`} className="text-3xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-prod-check">
          Para x = {v.x}: factorizado {left} · desarrollado {right} {left === right ? "✓" : "✗"}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Factor común ───────────── */

export function FactorComunExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { k: int(ini[0], 3, 1, 9), m: int(ini[1], 1, 0, 3), c2: int(ini[2], 2, -9, 9), c1: int(ini[3], -3, -9, 9), c0: int(ini[4], 4, -9, 9) };
  const [v, setV] = useState(init);
  const inner: Poly = [v.c0, v.c1, v.c2];
  const shifted: Poly = [...Array.from({ length: v.m }, () => 0), ...inner.map((c) => c * v.k)];
  const P = shifted;
  const cf = commonFactor(P);
  const monoFactor = `${cf.k === 1 ? "" : cf.k}${cf.m === 0 ? (cf.k === 1 ? "1" : "") : cf.m === 1 ? "x" : `x^{${cf.m}}`}`;
  const back = mul([...Array.from({ length: cf.m }, () => 0), cf.k], cf.rest);
  const f = (x: number) => String(x).replace("-", "−");

  return (
    <Frame
      hint={block.hint ?? "Construye un polinomio con un factor oculto y comprueba que la herramienta lo encuentra. Pon un término suelto para que no haya factor."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Factor numérico oculto" value={v.k} min={1} max={9} color={MANIM.blue} onChange={(k) => setV((p) => ({ ...p, k }))} />
          <Slider label="Potencia de x oculta" value={v.m} min={0} max={3} color={MANIM.green} onChange={(m) => setV((p) => ({ ...p, m }))} />
          <Slider label="Coeficiente de x² (dentro)" value={v.c2} min={-9} max={9} color={MANIM.orange} onChange={(c2) => setV((p) => ({ ...p, c2 }))} format={f} />
          <Slider label="Coeficiente de x (dentro)" value={v.c1} min={-9} max={9} color={MANIM.orange} onChange={(c1) => setV((p) => ({ ...p, c1 }))} format={f} />
          <Slider label="Término independiente (dentro)" value={v.c0} min={-9} max={9} color={MANIM.orange} onChange={(c0) => setV((p) => ({ ...p, c0 }))} format={f} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$P(x) = ${polyTex(P)}$`} className="text-2xl" />
        <MathRenderer text={`Factor común: $${monoFactor || "1"}$`} className="text-lg" />
        <MathRenderer text={`$P(x) = ${cf.k === 1 && cf.m === 0 ? "" : monoFactor}\\left(${polyTex(cf.rest)}\\right)$`} className="text-3xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-fc-check">
          Comprobación: al multiplicar de nuevo se obtiene {polyTex(back) === polyTex(P) ? "el polinomio original ✓" : "otro polinomio ✗"}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── m.c.m. de denominadores ───────────── */

export function McmExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { d1: int(ini[0], 2, 1, 12), d2: int(ini[1], 3, 1, 12), d3: int(ini[2], 4, 1, 12) };
  const [v, setV] = useState(init);
  const ds = [v.d1, v.d2, v.d3];
  const m = lcm(ds);
  const colors = [MANIM.blue, MANIM.green, MANIM.orange];

  return (
    <Frame
      hint={block.hint ?? "Elige tres denominadores: el m.c.m. es el número por el que se multiplica toda la expresión para quitarlos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Denominador 1" value={v.d1} min={1} max={12} color={colors[0]!} onChange={(d1) => setV((p) => ({ ...p, d1 }))} />
          <Slider label="Denominador 2" value={v.d2} min={1} max={12} color={colors[1]!} onChange={(d2) => setV((p) => ({ ...p, d2 }))} />
          <Slider label="Denominador 3" value={v.d3} min={1} max={12} color={colors[2]!} onChange={(d3) => setV((p) => ({ ...p, d3 }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\text{m.c.m.}(${ds.join(", ")}) = ${m}$`} className="text-3xl" />
        <div className="grid grid-cols-3 gap-3 text-center" data-testid="tool-mcm-factores">
          {ds.map((d, i) => (
            <div key={i}>
              <MathRenderer text={`$\\dfrac{x}{${d}} \\cdot ${m} = ${m / d}x$`} />
              <div className="text-sm" style={{ color: colors[i] }}>factor {m / d}</div>
            </div>
          ))}
        </div>
      </div>
    </Frame>
  );
}
