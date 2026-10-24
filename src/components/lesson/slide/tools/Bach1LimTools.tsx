"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  DISC_LABEL, INF_FNS, OP_FNS, PIECES, TABLE_FNS, applyOp, approachPoints, asymFn, asymptotes, classify, degreeLimit, formOf, limText, limitAt, limitOneSided, pieceLimits, ratFn, restaFn, type Op,
} from "@/components/lesson/anim/lim";
import { FnPlot, type Curve, type Mark } from "@/components/lesson/slide/tools/Bach1FuncTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const nz = (x: number, d = 1) => (x === 0 ? d : x);
const f = (x: number) => String(x).replace("-", "−");
const ink = "text-[color:var(--stage-ink,#fff)]";
const num = (x: number, d = 4) => (Number.isFinite(x) ? fmtEs(x, d).replace("-", "−") : x > 0 ? "+∞" : "−∞");
const big = (v: number) => (!Number.isFinite(v) ? (v > 0 ? "+∞" : "−∞") : Math.abs(v) >= 1e9 ? v.toExponential(2).replace(".", ",").replace("-", "−") : num(v, 4));
const side = (s: number) => (s === 0 ? "−" : "+");
/** (x − r) escrito con el signo adecuado. */
const fac = (r: number) => (r === 0 ? "x" : r > 0 ? `(x − ${r})` : `(x + ${-r})`);
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b));
const frac = (p: number, q: number) => {
  const g = gcd(p, q) || 1;
  const n = p / g;
  const d = q / g;
  return d === 1 ? f(n) : d === -1 ? f(-n) : `${f(d < 0 ? -n : n)}/${Math.abs(d)}`;
};

/* ───────────── Tabla de aproximación ───────────── */

const TABLE_VIEW: { xr: [number, number]; yr: [number, number] }[] = [
  { xr: [-1, 5], yr: [-4, 8] },
  { xr: [-2, 4], yr: [-2, 6] },
  { xr: [-8, 8], yr: [-1, 2] },
  { xr: [-1, 3], yr: [0, 1.2] },
];

/** Valores de f al acercarse a a por la izquierda o por la derecha. */
export function LimiteTablaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, TABLE_FNS.length - 1), s: int(ini[1], 1, 0, 1), k: int(ini[2], 2, 0, 5) };
  const [v, setV] = useState(init);
  const t = TABLE_FNS[v.i]!;
  const view = TABLE_VIEW[v.i]!;
  const sg = v.s === 0 ? -1 : 1;
  const rows = Array.from({ length: v.k + 1 }, (_, j) => {
    const x = t.a + sg * 10 ** -j;
    return { x, y: t.f(x) };
  });
  const lim = limitOneSided(t.f, t.a, v.s === 0 ? "-" : "+");
  const L = lim.kind === "finite" ? lim.value : null;
  const marks: Mark[] = rows.map((r) => ({ x: r.x, y: r.y, color: v.s === 0 ? MANIM.green : MANIM.red, r: 5 }));
  if (L !== null && (t.fa === null || Math.abs(t.fa - L) > 1e-9)) marks.push({ x: t.a, y: L, color: MANIM.yellow, open: true, r: 6 });
  if (t.fa !== null) marks.push({ x: t.a, y: t.fa, color: MANIM.yellow, r: 6 });
  const curve: Curve = { fn: t.f, color: MANIM.blue, ok: (x) => Math.abs(x - t.a) > 1e-9 };
  return (
    <Frame
      hint={block.hint ?? "Acércate a x = a por un lado: los valores de f(x) se aproximan a un número aunque f(a) no exista o sea otro."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={TABLE_FNS.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV((p) => ({ ...p, i }))} />
          <Choice label="Nos acercamos" items={[{ value: 0, label: "Por la izquierda" }, { value: 1, label: "Por la derecha" }]} value={v.s} onChange={(s) => setV((p) => ({ ...p, s }))} />
          <Slider label="Pasos hacia a" value={v.k} min={0} max={5} color={MANIM.orange} onChange={(k) => setV((p) => ({ ...p, k }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <ul className="text-base" data-testid="tool-lt-tabla">
          {rows.map((r, j) => (
            <li key={j}>{`x = ${num(r.x, 5)}   →   f(x) = ${num(r.y, 6)}`}</li>
          ))}
        </ul>
        <p className="text-lg font-bold" style={{ color: MANIM.green }} data-testid="tool-lt-limite">{`Lím cuando x → ${f(t.a)}${side(v.s)}: ${limText(lim)}`}</p>
        <p className="text-base" data-testid="tool-lt-imagen">{t.fa === null ? `f(${f(t.a)}) no está definida` : `f(${f(t.a)}) = ${num(t.fa, 2)}`}</p>
      </div>
      <FnPlot testId="tool-lt-grafica" xr={view.xr} yr={view.yr} curves={[curve]} marks={marks} />
    </Frame>
  );
}

/* ───────────── Límites laterales y discontinuidades ───────────── */

/** Función a trozos: límites laterales en el punto de unión y tipo de comportamiento. */
export function LimiteLateralExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, PIECES.length - 1), k: int(ini[1], 1, 0, 4) };
  const [v, setV] = useState(init);
  const p = PIECES[v.i]!;
  const { left, right, kind } = pieceLimits(p);
  const h = 10 ** -v.k;
  const xl = p.a - h;
  const xr = p.a + h;
  const marks: Mark[] = [];
  for (const [x, c] of [[xl, MANIM.green], [xr, MANIM.red]] as const) {
    const y = p.f(x);
    if (Number.isFinite(y) && y >= p.yr[0] && y <= p.yr[1]) marks.push({ x, y, color: c, r: 5 });
  }
  for (const L of [left, right]) if (L.kind === "finite" && (p.fa === null || Math.abs(p.fa - L.value) > 1e-9)) marks.push({ x: p.a, y: L.value, color: MANIM.yellow, open: true, r: 6 });
  if (p.fa !== null && Math.abs(p.fa) <= Math.max(Math.abs(p.yr[0]), Math.abs(p.yr[1]))) marks.push({ x: p.a, y: p.fa, color: MANIM.yellow, r: 6 });
  const jump = left.kind === "finite" && right.kind === "finite" ? Math.abs(right.value - left.value) : 0;
  const verdict = kind === "continua" ? MANIM.green : MANIM.red;
  return (
    <Frame
      hint={block.hint ?? "Verde: nos acercamos por la izquierda. Rojo: por la derecha. Círculo vacío: adonde 'quiere llegar' la gráfica. Círculo lleno: el valor real f(a)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={PIECES.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV((s) => ({ ...s, i }))} />
          <Slider label="Distancia al punto: 10^(−k)" value={v.k} min={0} max={4} color={MANIM.orange} onChange={(k) => setV((s) => ({ ...s, k }))} format={(k) => fmtEs(10 ** -k, 4)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$${p.tex}$`} className="text-base" />
        <p className="text-lg" data-testid="tool-ll-laterales">{`Lím x→${f(p.a)}⁻ = ${limText(left)}      Lím x→${f(p.a)}⁺ = ${limText(right)}`}</p>
        <p className="text-base" data-testid="tool-ll-imagen">{`${p.fa === null ? `f(${f(p.a)}) no está definida` : `f(${f(p.a)}) = ${num(p.fa, 2)}`}   ·   ${kind === "segunda-especie" || left.kind !== right.kind || (left.kind === "finite" && right.kind === "finite" && jump > 1e-3) || (left.kind === "inf" && right.kind === "inf" && left.sign !== right.sign) ? "el límite no existe" : `el límite existe: ${limText(left)}`}`}</p>
        <p className="text-lg font-bold" style={{ color: verdict }} data-testid="tool-ll-tipo">{`${DISC_LABEL[kind]}${kind === "salto-finito" ? ` (salto ${num(jump, 0)})` : ""}`}</p>
      </div>
      <FnPlot testId="tool-ll-grafica" xr={p.xr} yr={p.yr} curves={[{ fn: p.f, color: MANIM.blue, ok: p.ok }]} marks={marks} />
    </Frame>
  );
}

/* ───────────── Infinitos ───────────── */

const TARGETS = [
  { value: 0, label: "x → 0⁺", at: 0 as const, s: "+" as const },
  { value: 1, label: "x → 0⁻", at: 0 as const, s: "-" as const },
  { value: 2, label: "x → +∞", at: "+inf" as const, s: "+" as const },
  { value: 3, label: "x → −∞", at: "-inf" as const, s: "+" as const },
];

/** Cuatro tipos de límite: valor finito o infinito, en un punto finito o en el infinito. */
export function LimiteInfinitoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, INF_FNS.length - 1), t: int(ini[1], 0, 0, 3) };
  const [v, setV] = useState(init);
  const fn = INF_FNS[v.i]!;
  const tg = TARGETS[v.t]!;
  const xs = approachPoints(tg.at, tg.s);
  const lim = limitOneSided(fn.f, tg.at, tg.s);
  const kindTxt =
    lim.kind === "undef" ? "La función no está definida a ese lado" : `Límite ${lim.kind === "inf" ? "infinito" : lim.kind === "finite" ? "finito" : "inexistente"} en un punto ${tg.at === 0 ? "finito" : "infinito"}`;
  return (
    <Frame
      hint={block.hint ?? "Elige una función y hacia dónde tiende x: compara el valor de f(x) en puntos cada vez más extremos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={INF_FNS.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV((s) => ({ ...s, i }))} />
          <Choice label="Hacia dónde tiende x" items={TARGETS.map((q) => ({ value: q.value, label: q.label }))} value={v.t} onChange={(t) => setV((s) => ({ ...s, t }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <ul className="text-base" data-testid="tool-li-tabla">
          {xs.map((x, j) => (
            <li key={j}>{`x = ${tg.at === 0 ? num(x, 7) : num(x, 0)}   →   f(x) = ${big(fn.f(x))}`}</li>
          ))}
        </ul>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-li-limite">{`Lím ${TARGETS[v.t]!.label.replace("x → ", "x→")} de ${fn.label} = ${limText(lim)}`}</p>
        <p className="text-base" data-testid="tool-li-tipo">{kindTxt}</p>
      </div>
      <FnPlot testId="tool-li-grafica" xr={fn.xr} yr={fn.yr} curves={[{ fn: fn.f, color: MANIM.blue }]} />
    </Frame>
  );
}

/* ───────────── Asíntotas ───────────── */

/** f(x) = (a x² + b x + c)/(x − r): asíntotas vertical, horizontal y oblicua. */
export function AsintotasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 1, -2, 2), b: int(ini[1], 1, -6, 6), c: int(ini[2], 1, -8, 8), r: int(ini[3], 1, -4, 4) };
  const [v, setV] = useState(init);
  const as = asymptotes(v.a, v.b, v.c, v.r);
  const fn = asymFn(v.a, v.b, v.c, v.r);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const marks: Mark[] = as.hole ? [{ x: v.r, y: 2 * v.a * v.r + v.b, color: MANIM.yellow, open: true, r: 6 }] : [];
  const curves: Curve[] = [{ fn, color: MANIM.blue, ok: (x) => Math.abs(x - v.r) > 1e-9 }];
  if (as.oblique) curves.push({ fn: (x) => as.oblique!.m * x + as.oblique!.n, color: MANIM.orange, dashed: true, width: 2.2 });
  const polyTxt = `${v.a === 0 ? "" : `${v.a === 1 ? "" : v.a === -1 ? "−" : f(v.a)}x²`}${v.b === 0 ? "" : ` ${v.b < 0 ? "−" : "+"} ${Math.abs(v.b) === 1 ? "" : Math.abs(v.b)}x`}${v.c === 0 ? "" : ` ${v.c < 0 ? "−" : "+"} ${Math.abs(v.c)}`}`.trim().replace(/^\+ /, "") || "0";
  return (
    <Frame
      hint={block.hint ?? "La recta vertical está donde se anula el denominador (si el numerador no se anula también). Con a = 0 aparece una horizontal; con a ≠ 0, una oblicua y = mx + n."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a (coef. de x² en el numerador)" value={v.a} min={-2} max={2} color={MANIM.blue} onChange={set("a")} format={f} />
          <Slider label="b" value={v.b} min={-6} max={6} color={MANIM.orange} onChange={set("b")} format={f} />
          <Slider label="c" value={v.c} min={-8} max={8} color={MANIM.green} onChange={set("c")} format={f} />
          <Slider label="r (denominador x − r)" value={v.r} min={-4} max={4} color={MANIM.yellow} onChange={set("r")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-as-formula">{`f(x) = (${polyTxt}) / ${fac(v.r)}`}</p>
        <p className="text-base" data-testid="tool-as-vertical">{as.vertical !== null ? `Asíntota vertical: x = ${f(as.vertical)}` : "Sin asíntota vertical: el numerador también se anula en x = " + f(v.r) + " (hueco)"}</p>
        <p className="text-base" data-testid="tool-as-horizontal">{as.horizontal !== null ? `Asíntota horizontal: y = ${f(as.horizontal)}` : "Sin asíntota horizontal (el numerador tiene más grado)"}</p>
        <p className="text-base font-semibold" style={{ color: MANIM.orange }} data-testid="tool-as-oblicua">
          {as.oblique ? `Oblicua: m = ${f(as.oblique.m)}, n = ${f(as.oblique.n)}  →  y = ${as.oblique.m === 1 ? "" : as.oblique.m === -1 ? "−" : f(as.oblique.m)}x ${as.oblique.n < 0 ? "−" : "+"} ${Math.abs(as.oblique.n)}` : "Sin asíntota oblicua"}
        </p>
      </div>
      <FnPlot testId="tool-as-grafica" xr={[-8, 8]} yr={[-12, 12]} curves={curves} marks={marks} vlines={as.vertical !== null ? [as.vertical] : []} hlines={as.horizontal !== null ? [as.horizontal] : []} />
    </Frame>
  );
}

/* ───────────── 0/0 ───────────── */

/** Indeterminación 0/0: factorizando o con el conjugado de una raíz. */
export function CeroCeroExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { m: int(ini[0], 0, 0, 1), a: int(ini[1], 1, -4, 4), b: int(ini[2], 3, -4, 4), c: int(ini[3], -1, -4, 4), s: int(ini[1], 2, 1, 4), k: int(ini[2], 0, -3, 8) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  let fn: (x: number) => number;
  let atx: number;
  const steps: string[] = [];
  let result = "";
  const marks: Mark[] = [];
  let xr: [number, number];
  let yr: [number, number];
  let vl: number[] = [];
  if (v.m === 0) {
    const { a, b, c } = v;
    atx = a;
    fn = (x) => ((x - a) * (x - b)) / ((x - a) * (x - c));
    steps.push(`Al sustituir x = ${f(a)}: numerador 0 y denominador 0 → 0/0.`);
    steps.push(`Factorizado: ${fac(a)}${fac(b)} / (${fac(a)}${fac(c)}) = ${fac(b)} / ${fac(c)}  (x ≠ ${f(a)})`);
    if (b === a && c === a) result = "1";
    else if (c === a) result = "no existe: queda (x − " + f(b) + ")/(x − " + f(a) + ") con laterales infinitos";
    else result = frac(a - b, a - c);
    const lim = limitAt(fn, a);
    if (lim.kind === "finite") marks.push({ x: a, y: lim.value, color: MANIM.yellow, open: true, r: 6 });
    if (c !== a) vl = [c];
    xr = [-8, 8];
    yr = [-8, 8];
    steps.push(c === a ? (b === a ? "Simplificando de nuevo, f(x) = 1." : `Ahora el denominador sigue anulándose: (${f(a - b)})/0.`) : `Sustituyendo en la simplificada: (${f(a)} − ${f(b)}) / (${f(a)} − ${f(c)}) = ${result}.`);
  } else {
    const { s, k } = v;
    const a = s * s - k;
    atx = a;
    fn = (x) => (Math.sqrt(x + k) - s) / (x - a);
    steps.push(`Al sustituir x = ${f(a)}: (√${f(a + k)} − ${s}) / 0 = 0/0.`);
    steps.push(`Multiplicamos arriba y abajo por el conjugado √(x ${k < 0 ? "−" : "+"} ${Math.abs(k)}) + ${s}:`);
    steps.push(`(x ${k < 0 ? "−" : "+"} ${Math.abs(k)} − ${s * s}) / [${fac(a)}(√(x ${k < 0 ? "−" : "+"} ${Math.abs(k)}) + ${s})] = 1 / (√(x ${k < 0 ? "−" : "+"} ${Math.abs(k)}) + ${s})`);
    result = `1/${2 * s}`;
    steps.push(`Sustituyendo x = ${f(a)}: 1/(${s} + ${s}) = ${result}.`);
    marks.push({ x: a, y: 1 / (2 * s), color: MANIM.yellow, open: true, r: 6 });
    xr = [a - 6, a + 6];
    yr = [-0.4, 1.2];
  }
  return (
    <Frame
      hint={block.hint ?? "Si al sustituir sale 0/0, hay un factor (x − a) que simplificar: se factoriza o se multiplica por el conjugado."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Técnica" items={[{ value: 0, label: "Factorizar" }, { value: 1, label: "Conjugado de una raíz" }]} value={v.m} onChange={(m) => setV((p) => ({ ...p, m }))} />
          {v.m === 0 ? (
            <>
              <Slider label="a (el límite es x → a)" value={v.a} min={-4} max={4} color={MANIM.blue} onChange={set("a")} format={f} />
              <Slider label="b (otra raíz del numerador)" value={v.b} min={-4} max={4} color={MANIM.orange} onChange={set("b")} format={f} />
              <Slider label="c (raíz del denominador)" value={v.c} min={-4} max={4} color={MANIM.green} onChange={set("c")} format={f} />
            </>
          ) : (
            <>
              <Slider label="s (raíz buscada)" value={v.s} min={1} max={4} color={MANIM.blue} onChange={set("s")} />
              <Slider label="k en √(x + k)" value={v.k} min={-3} max={8} color={MANIM.orange} onChange={set("k")} format={f} />
            </>
          )}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-cc-formula">
          {v.m === 0 ? `f(x) = ${fac(v.a)}${fac(v.b)} / (${fac(v.a)}${fac(v.c)}),  x → ${f(v.a)}` : `f(x) = (√(x ${v.k < 0 ? "−" : "+"} ${Math.abs(v.k)}) − ${v.s}) / ${fac(v.s * v.s - v.k)},  x → ${f(v.s * v.s - v.k)}`}
        </p>
        <ul className="text-base" data-testid="tool-cc-pasos">
          {steps.map((t, i) => (
            <li key={i}>{t}</li>
          ))}
        </ul>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-cc-limite">{`Límite = ${result}`}</p>
      </div>
      <FnPlot testId="tool-cc-grafica" xr={xr} yr={yr} curves={[{ fn, color: MANIM.blue, ok: (x) => Math.abs(x - atx) > 1e-9 }]} marks={marks} vlines={vl} />
    </Frame>
  );
}

/* ───────────── ∞/∞ ───────────── */

/** (a·xᵖ + 3)/(c·xᵠ + 5) en ±∞: comparación de grados. */
export function LimiteGradosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { p: int(ini[0], 2, 1, 3), a: nz(int(ini[1], 8, -5, 8)), q: int(ini[2], 2, 1, 3), c: nz(int(ini[3], 1, -5, 5)), s: int(ini[4], 0, 0, 1) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const a = nz(v.a);
  const c = nz(v.c);
  const sg = v.s === 0 ? 1 : -1;
  const fn = ratFn(v.p, a, v.q, c);
  const th = degreeLimit(v.p, a, v.q, c, sg);
  const rule = v.p > v.q ? "grado del numerador > grado del denominador → el límite es infinito" : v.p === v.q ? "mismo grado → cociente de los coeficientes principales" : "grado del numerador < grado del denominador → el límite es 0";
  const xs = [10, 100, 1000, 10000].map((x) => sg * x);
  const lead = (k: number, n: number) => (k === 1 ? "" : k === -1 ? "−" : f(k)) + (n === 1 ? "x" : `x${["", "", "²", "³"][n]}`);
  return (
    <Frame
      hint={block.hint ?? "Cuando x es enorme mandan los términos de mayor grado: el resto se vuelve despreciable."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="x tiende a" items={[{ value: 0, label: "+∞" }, { value: 1, label: "−∞" }]} value={v.s} onChange={set("s")} />
          <Slider label="grado del numerador p" value={v.p} min={1} max={3} color={MANIM.blue} onChange={set("p")} />
          <Slider label="coeficiente a" value={a} min={-5} max={8} color={MANIM.blue} onChange={set("a")} format={f} />
          <Slider label="grado del denominador q" value={v.q} min={1} max={3} color={MANIM.orange} onChange={set("q")} />
          <Slider label="coeficiente c" value={c} min={-5} max={5} color={MANIM.orange} onChange={set("c")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-lg-formula">{`f(x) = (${lead(a, v.p)} + 3) / (${lead(c, v.q)} + 5),  x → ${sg > 0 ? "+∞" : "−∞"}`}</p>
        <ul className="text-base" data-testid="tool-lg-tabla">
          {xs.map((x, j) => (
            <li key={j}>{`x = ${num(x, 0)}   →   f(x) = ${big(fn(x))}`}</li>
          ))}
        </ul>
        <p className="text-base" data-testid="tool-lg-regla">{rule}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-lg-limite">{`Límite = ${th.kind === "finite" ? (v.p === v.q ? frac(a, c) : "0") : th.kind === "inf" ? (th.sign > 0 ? "+∞" : "−∞") : ""}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Continuidad con parámetro ───────────── */

/** f(x) = x² si x < a; x + k si x ≥ a: valor de k para que sea continua. */
export function ContinuidadKExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 2, -2, 3), k: int(ini[1], 0, -6, 10) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const fn = (x: number) => (x < v.a ? x * x : x + v.k);
  const left = v.a * v.a;
  const right = v.a + v.k;
  const kind = classify({ kind: "finite", value: left }, { kind: "finite", value: right }, right);
  const kNeeded = v.a * v.a - v.a;
  const marks: Mark[] = [{ x: v.a, y: right, color: MANIM.yellow, r: 6 }];
  if (kind !== "continua") marks.push({ x: v.a, y: left, color: MANIM.yellow, open: true, r: 6 });
  return (
    <Frame
      hint={block.hint ?? "Para que no haya salto, el valor al que llega la rama izquierda (a²) debe coincidir con el de la derecha (a + k)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a (punto de unión)" value={v.a} min={-2} max={3} color={MANIM.blue} onChange={set("a")} format={f} />
          <Slider label="k" value={v.k} min={-6} max={10} color={MANIM.orange} onChange={set("k")} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-ck-formula">{`f(x) = x² si x < ${f(v.a)};   x ${v.k < 0 ? "−" : "+"} ${Math.abs(v.k)} si x ≥ ${f(v.a)}`}</p>
        <p className="text-base" data-testid="tool-ck-laterales">{`Lím x→${f(v.a)}⁻ = ${f(left)}      Lím x→${f(v.a)}⁺ = f(${f(v.a)}) = ${f(right)}`}</p>
        <p className="text-lg font-bold" style={{ color: kind === "continua" ? MANIM.green : MANIM.red }} data-testid="tool-ck-estado">
          {kind === "continua" ? "Continua en x = " + f(v.a) : `Salto de ${Math.abs(right - left)}: no es continua`}
        </p>
        <p className="text-base" data-testid="tool-ck-k">{`Condición: ${f(left)} = ${f(v.a)} + k  →  k = ${f(kNeeded)}`}</p>
      </div>
      <FnPlot testId="tool-ck-grafica" xr={[-6, 6]} yr={[-4, 14]} curves={[{ fn, color: MANIM.blue }]} marks={marks} />
    </Frame>
  );
}

/* ───────────── Operaciones con límites ───────────── */

const OPS: { value: number; label: string; op: Op }[] = [
  { value: 0, label: "f + g", op: "+" },
  { value: 1, label: "f − g", op: "-" },
  { value: 2, label: "f · g", op: "*" },
  { value: 3, label: "f / g", op: "/" },
];
const OP_TARGETS = [
  { value: 0, label: "x → +∞", at: "+inf" as const, s: "+" as const },
  { value: 1, label: "x → 0⁺", at: 0 as const, s: "+" as const },
];

/** Límite de f ∘ g operando: forma resultante, si es indeterminada y valor real. */
export function OperacionesLimiteExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { fi: int(ini[0], 1, 0, OP_FNS.length - 1), gi: int(ini[1], 0, 0, OP_FNS.length - 1), o: int(ini[2], 1, 0, 3), t: int(ini[3], 0, 0, 1) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const F = OP_FNS[v.fi]!;
  const G = OP_FNS[v.gi]!;
  const o = OPS[v.o]!;
  const tg = OP_TARGETS[v.t]!;
  const lf = limitOneSided(F.f, tg.at, tg.s);
  const lg = limitOneSided(G.f, tg.at, tg.s);
  const comb = limitOneSided(applyOp(o.op, F.f, G.f), tg.at, tg.s);
  const form = formOf(o.op, lf, lg);
  const wrap = (t: string) => (t.length > 1 && /[+−/]/.test(t) ? `(${t})` : t);
  const expr = o.op === "/" ? `${wrap(F.label)} / ${wrap(G.label)}` : `${F.label} ${o.op === "-" ? "−" : o.op === "*" ? "·" : "+"} ${wrap(G.label)}`;
  return (
    <Frame
      hint={block.hint ?? "Elige f, g y la operación. Si la forma es indeterminada, el resultado depende de las funciones: prueba x − x y x² − x."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="f(x)" items={OP_FNS.map((q, i) => ({ value: i, label: q.label }))} value={v.fi} onChange={set("fi")} />
          <Choice label="g(x)" items={OP_FNS.map((q, i) => ({ value: i, label: q.label }))} value={v.gi} onChange={set("gi")} />
          <Choice label="Operación" items={OPS.map((q) => ({ value: q.value, label: q.label }))} value={v.o} onChange={set("o")} />
          <Choice label="x tiende a" items={OP_TARGETS.map((q) => ({ value: q.value, label: q.label }))} value={v.t} onChange={set("t")} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-ol-limites">{`lím f = ${limText(lf)}      lím g = ${limText(lg)}`}</p>
        <p className="text-lg font-semibold" style={{ color: form?.indeterminate ? MANIM.red : MANIM.green }} data-testid="tool-ol-forma">
          {form ? `Forma ${form.text}: ${form.indeterminate ? "indeterminación" : "determinada"}` : "Algún límite no existe"}
        </p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-ol-resultado">{`lím (${expr}) = ${limText(comb)}`}</p>
      </div>
      <FnPlot testId="tool-ol-grafica" xr={tg.at === 0 ? [-0.5, 4] : [-4, 4]} yr={[-8, 8]} curves={[{ fn: F.f, color: MANIM.blue }, { fn: G.f, color: MANIM.orange }, { fn: applyOp(o.op, F.f, G.f), color: MANIM.green, width: 3.5 }]} />
    </Frame>
  );
}

/* ───────────── ∞ − ∞ con fracciones ───────────── */

/** f(x) = 1/(x − r) − k/(x² − r²) cuando x → r. */
export function RestaFraccionesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { k: int(ini[0], 2, 1, 8), r: int(ini[1], 1, 1, 3) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const fn = restaFn(v.k, v.r);
  const lim = limitAt(fn, v.r);
  const left = limitOneSided(fn, v.r, "-");
  const right = limitOneSided(fn, v.r, "+");
  const c0 = v.r - v.k;
  const numTxt = c0 === 0 ? "x" : `x ${c0 > 0 ? "+" : "−"} ${Math.abs(c0)}`;
  const marks: Mark[] = lim.kind === "finite" ? [{ x: v.r, y: lim.value, color: MANIM.yellow, open: true, r: 6 }] : [];
  return (
    <Frame
      hint={block.hint ?? "Cada fracción tiende a ∞, pero al restarlas el resultado depende de k. Con k = 2r desaparece el factor (x − r) y queda un límite finito."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="k" value={v.k} min={1} max={8} color={MANIM.orange} onChange={set("k")} />
          <Slider label="r (x → r)" value={v.r} min={1} max={3} color={MANIM.blue} onChange={set("r")} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-rf-formula">{`f(x) = 1/(x − ${v.r}) − ${v.k}/(x² − ${v.r * v.r}),  x → ${v.r}:  ∞ − ∞`}</p>
        <p className="text-base" data-testid="tool-rf-comun">{`Común denominador: (${numTxt}) / (x² − ${v.r * v.r})`}</p>
        <p className="text-base" data-testid="tool-rf-laterales">{`Lím x→${v.r}⁻ = ${limText(left)}      Lím x→${v.r}⁺ = ${limText(right)}`}</p>
        <p className="text-xl font-bold" style={{ color: lim.kind === "finite" ? MANIM.green : MANIM.red }} data-testid="tool-rf-limite">
          {lim.kind === "finite" ? `Límite = ${limText(lim)} (k = 2r: se simplifica x − ${v.r})` : lim.kind === "inf" ? `Límite = ${limText(lim)}` : "El límite no existe: laterales infinitos de signo opuesto"}
        </p>
      </div>
      <FnPlot testId="tool-rf-grafica" xr={[-6, 6]} yr={[-6, 6]} curves={[{ fn, color: MANIM.blue, ok: (x) => Math.abs(Math.abs(x) - v.r) > 1e-9 }]} marks={marks} vlines={lim.kind === "finite" ? [-v.r] : [-v.r, v.r]} />
    </Frame>
  );
}
