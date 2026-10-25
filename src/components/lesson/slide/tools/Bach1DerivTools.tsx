"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  CASES, CAT, ELEMS, INNERS, INV_PAIRS, MOTIONS, OPT, OUTERS, byId, chain, classifyCritical, growth, optimum, productQuotient, quotient, sideDerivatives, tangent,
  type DFun,
} from "@/components/lesson/anim/deriv";
import { limText } from "@/components/lesson/anim/lim";
import { FnPlot, type Curve, type Mark } from "@/components/lesson/slide/tools/Bach1FuncTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const ink = "text-[color:var(--stage-ink,#fff)]";
const m = (x: number, d = 3) => (Number.isFinite(x) ? fmtEs(x, d).replace("-", "−") : "no definida");
const FUN_CHOICES = CAT.map((c, i) => ({ value: i, label: c.label }));
const inDomain = (c: DFun, x: number) => (c.ok ? c.ok(x) : true);
/** y = m x + n con signos limpios. */
const lineTxt = (mm: number, n: number) => {
  const mt = Math.abs(mm - 1) < 1e-9 ? "" : Math.abs(mm + 1) < 1e-9 ? "−" : m(mm, 2);
  const nt = Math.abs(n) < 1e-9 ? "" : ` ${n < 0 ? "−" : "+"} ${m(Math.abs(n), 2)}`;
  return Math.abs(mm) < 1e-9 ? `y = ${m(n, 2)}` : `y = ${mt}x${nt}`;
};

/* ───────────── Secante ───────────── */

const HS = [2, 1, 0.5, 0.1, 0.01, 0.001];

/** Pendiente de la secante entre a y a + h: tasa de variación media, que tiende a f′(a). */
export function SecanteExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const f0 = int(ini[0], 0, 0, CAT.length - 1);
  const init = { i: f0, a: int(ini[1], Math.round(CAT[f0]!.a0 * 2), -12, 18), k: int(ini[2], 1, 0, HS.length - 1), s: int(ini[3], 0, 0, 1) };
  const [v, setV] = useState(init);
  const c = CAT[v.i]!;
  const a = v.a / 2;
  const h = (v.s === 0 ? 1 : -1) * HS[v.k]!;
  const ok = inDomain(c, a) && inDomain(c, a + h);
  const slope = ok ? quotient(c.f, a, h) : NaN;
  const d = inDomain(c, a) ? c.df(a) : NaN;
  const fa = c.f(a);
  const marks: Mark[] = ok ? [{ x: a, y: fa, color: MANIM.yellow, r: 6 }, { x: a + h, y: c.f(a + h), color: MANIM.red, r: 6 }] : [];
  const curves: Curve[] = [{ fn: c.f, color: MANIM.blue, ok: (x) => inDomain(c, x) }];
  if (ok) curves.push({ fn: (x) => fa + slope * (x - a), color: MANIM.red, width: 2.4 });
  if (Number.isFinite(d)) curves.push({ fn: (x) => fa + d * (x - a), color: MANIM.green, dashed: true, width: 2 });
  return (
    <Frame
      hint={block.hint ?? "La recta roja es la secante entre P (amarillo) y Q (rojo). Al hacer h más pequeño, su pendiente se acerca a la de la tangente (verde)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={FUN_CHOICES} value={v.i} onChange={(i) => setV((p) => ({ ...p, i, a: Math.round(CAT[i]!.a0 * 2) }))} />
          <Slider label="Punto a" value={a} min={-6} max={9} step={0.5} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, a: Math.round(x * 2) }))} format={(x) => m(x, 1)} />
          <Slider label="Tamaño de h" value={v.k} min={0} max={HS.length - 1} color={MANIM.red} onChange={(k) => setV((p) => ({ ...p, k }))} format={(k) => m(HS[k]!, 3)} />
          <Choice label="Q está…" items={[{ value: 0, label: "A la derecha (h > 0)" }, { value: 1, label: "A la izquierda (h < 0)" }]} value={v.s} onChange={(s) => setV((p) => ({ ...p, s }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-sc-puntos">{ok ? `P(${m(a, 1)}, ${m(fa)})    Q(${m(a + h, 3)}, ${m(c.f(a + h))})` : "La función no está definida en alguno de los dos puntos"}</p>
        <p className="text-lg" data-testid="tool-sc-tvm">{`TVM = [f(a + h) − f(a)] / h = ${m(slope, 4)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-sc-derivada">{`f′(${m(a, 1)}) = ${m(d, 4)}  (pendiente de la tangente)`}</p>
      </div>
      <FnPlot testId="tool-sc-grafica" xr={c.xr} yr={c.yr} curves={curves} marks={marks} />
    </Frame>
  );
}

/* ───────────── Derivabilidad ───────────── */

const STATUS_TXT = {
  derivable: "Derivable: las derivadas laterales existen y coinciden",
  esquina: "No derivable: esquina (derivadas laterales distintas)",
  "no-continua": "No derivable: ni siquiera es continua en ese punto",
  "tangente-vertical": "No derivable: la tangente es vertical (pendiente infinita)",
} as const;

/** Derivadas laterales y derivabilidad en un punto. */
export function DerivabilidadExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, CASES.length - 1), k: int(ini[1], 2, 0, 4) };
  const [v, setV] = useState(init);
  const c = CASES[v.i]!;
  const r = sideDerivatives(c);
  const h = 10 ** -v.k;
  const fa = c.f(c.a);
  const ql = (c.f(c.a - h) - fa) / -h;
  const qr = (c.f(c.a + h) - fa) / h;
  const marks: Mark[] = [
    { x: c.a - h, y: c.f(c.a - h), color: MANIM.green, r: 5 },
    { x: c.a + h, y: c.f(c.a + h), color: MANIM.red, r: 5 },
    { x: c.a, y: fa, color: MANIM.yellow, r: 6 },
  ];
  const curves: Curve[] = [{ fn: c.f, color: MANIM.blue }];
  if (Number.isFinite(ql)) curves.push({ fn: (x) => fa + ql * (x - c.a), color: MANIM.green, width: 2, dashed: true });
  if (Number.isFinite(qr)) curves.push({ fn: (x) => fa + qr * (x - c.a), color: MANIM.red, width: 2, dashed: true });
  return (
    <Frame
      hint={block.hint ?? "Las rectas verde (izquierda) y roja (derecha) son las secantes con h pequeño. Si tienden a la misma recta, la función es derivable."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={CASES.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV((p) => ({ ...p, i }))} />
          <Slider label="Distancia h = 10^(−k)" value={v.k} min={0} max={4} color={MANIM.orange} onChange={(k) => setV((p) => ({ ...p, k }))} format={(k) => m(10 ** -k, 4)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$${c.tex}$`} className="text-base" />
        <p className="text-lg" data-testid="tool-dv-laterales">{`f′(${m(c.a, 0)}⁻) = ${limText(r.left)}      f′(${m(c.a, 0)}⁺) = ${limText(r.right)}`}</p>
        <p className="text-base" data-testid="tool-dv-secantes">{`Con h = ${m(h, 4)}: pendiente izquierda ${m(ql, 3)}, derecha ${m(qr, 3)}`}</p>
        <p className="text-lg font-bold" style={{ color: r.status === "derivable" ? MANIM.green : MANIM.red }} data-testid="tool-dv-estado">{STATUS_TXT[r.status]}</p>
      </div>
      <FnPlot testId="tool-dv-grafica" xr={c.xr} yr={c.yr} curves={curves} marks={marks} />
    </Frame>
  );
}

/* ───────────── Función derivada y tangente ───────────── */

/** f, f′ y la recta tangente en un punto móvil: signo de la derivada y ecuación de la tangente. */
export function FuncionDerivadaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const f0 = int(ini[0], 1, 0, CAT.length - 1);
  const init = { i: f0, a: int(ini[1], Math.round(CAT[f0]!.a0 * 10), -80, 120) };
  const [v, setV] = useState(init);
  const c = CAT[v.i]!;
  const a = v.a / 10;
  const ok = inDomain(c, a);
  const t = ok ? tangent(c, a) : null;
  const g = ok ? growth(c.df(a)) : null;
  const marks: Mark[] = t ? [{ x: a, y: t.fa, color: MANIM.blue, r: 6 }, { x: a, y: c.df(a), color: MANIM.orange, r: 6 }] : [];
  const curves: Curve[] = [
    { fn: c.f, color: MANIM.blue, ok: (x) => inDomain(c, x) },
    { fn: c.df, color: MANIM.orange, ok: (x) => inDomain(c, x), width: 2.6 },
  ];
  if (t) curves.push({ fn: (x) => t.fa + t.m * (x - a), color: MANIM.yellow, dashed: true, width: 2 });
  return (
    <Frame
      hint={block.hint ?? "Azul: f. Naranja: f′. La recta amarilla es la tangente en el punto: su pendiente es el valor de la curva naranja en ese x."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={FUN_CHOICES} value={v.i} onChange={(i) => setV({ i, a: Math.round(CAT[i]!.a0 * 10) })} />
          <Slider label="Punto x = a" value={a} min={-8} max={12} step={0.1} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, a: Math.round(x * 10) }))} format={(x) => m(x, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$f(x) = ${c.tex}\\qquad f'(x) = ${c.dtex}$`} className="text-base" />
        <p className="text-lg" data-testid="tool-fd-valores">{t ? `f(${m(a, 1)}) = ${m(t.fa)}      f′(${m(a, 1)}) = ${m(t.m)}` : "f no está definida en ese punto"}</p>
        <p className="text-lg font-bold" style={{ color: g === "creciente" ? MANIM.green : g === "decreciente" ? MANIM.red : MANIM.yellow }} data-testid="tool-fd-crecimiento">
          {g === null ? "" : g === "horizontal" ? "f′ = 0: tangente horizontal" : `f′ ${g === "creciente" ? ">" : "<"} 0: la función es ${g}`}
        </p>
        <p className="text-base" data-testid="tool-fd-tangente">{t ? `Tangente: ${lineTxt(t.m, t.n)}` : ""}</p>
      </div>
      <FnPlot testId="tool-fd-grafica" xr={c.xr} yr={c.yr} curves={curves} marks={marks} />
    </Frame>
  );
}

/* ───────────── Producto y cociente ───────────── */

const ELEM_CHOICES = ELEMS.map((e, i) => ({ value: i, label: e.label }));

/** (f·g)′ y (f/g)′ con las reglas, comprobadas con un cociente incremental. */
export function ProductoCocienteExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { fi: int(ini[0], 0, 0, ELEMS.length - 1), gi: int(ini[1], 2, 0, ELEMS.length - 1), o: int(ini[2], 0, 0, 1), x: int(ini[3], 4, 1, 8) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const F = ELEMS[v.fi]!;
  const G = ELEMS[v.gi]!;
  const x = v.x / 2;
  const op = v.o === 0 ? "*" : "/";
  const valid = (!F.ok || F.ok(x)) && (!G.ok || G.ok(x)) && (op === "*" || Math.abs(G.f(x)) > 1e-9);
  const r = valid ? productQuotient(op, F, G, x) : null;
  const wrap = (t: string) => (/[+−]/.test(t) ? `(${t})` : t);
  const formula =
    op === "*"
      ? `(f·g)′ = f′·g + f·g′ = (${F.dtex})·${wrap(G.label)} + ${wrap(F.label)}·(${G.dtex})`
      : `(f/g)′ = (f′·g − f·g′)/g² = [(${F.dtex})·${wrap(G.label)} − ${wrap(F.label)}·(${G.dtex})] / ${wrap(G.label)}²`;
  const h = op === "*" ? (t: number) => F.f(t) * G.f(t) : (t: number) => F.f(t) / G.f(t);
  return (
    <Frame
      hint={block.hint ?? "Cambia f, g y el punto: el valor dado por la regla coincide con el de la derivada calculada con cocientes incrementales."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="f(x)" items={ELEM_CHOICES} value={v.fi} onChange={set("fi")} />
          <Choice label="g(x)" items={ELEM_CHOICES} value={v.gi} onChange={set("gi")} />
          <Choice label="Operación" items={[{ value: 0, label: "Producto f · g" }, { value: 1, label: "Cociente f / g" }]} value={v.o} onChange={set("o")} />
          <Slider label="Punto x" value={x} min={0.5} max={4} step={0.5} color={MANIM.yellow} onChange={(n) => set("x")(Math.round(n * 2))} format={(n) => m(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-pc-derivadas">{`f = ${F.label}, f′ = ${F.dtex};   g = ${G.label}, g′ = ${G.dtex}`}</p>
        <p className="text-base" data-testid="tool-pc-regla">{formula}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-pc-valor">{r ? `En x = ${m(x, 1)}: derivada = ${m(r.rule, 4)}` : "No definida en ese punto"}</p>
        <p className="text-base" data-testid="tool-pc-comprobacion">{r ? `Comprobación con cocientes incrementales: ${m(r.numeric, 4)}` : ""}</p>
      </div>
      <FnPlot testId="tool-pc-grafica" xr={[-1, 5]} yr={[-6, 12]} curves={[{ fn: h, color: MANIM.blue }]} marks={r ? [{ x, y: r.value, color: MANIM.yellow, r: 6 }] : []} />
    </Frame>
  );
}

/* ───────────── Regla de la cadena ───────────── */

/** (f∘g)′ = f′(g(x))·g′(x), con comprobación numérica. */
export function CadenaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { o: int(ini[0], 2, 0, OUTERS.length - 1), i: int(ini[1], 0, 0, INNERS.length - 1), x: int(ini[2], 1, -4, 4) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const O = OUTERS[v.o]!;
  const I = INNERS[v.i]!;
  const x = v.x / 2;
  const r = chain(O, I, x);
  const dg = I.dtext.includes("x") ? `(${I.dtext})` : I.dtext;
  return (
    <Frame
      hint={block.hint ?? "Se deriva de fuera hacia dentro: la derivada de la función exterior en g(x), multiplicada por la derivada de g."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función exterior f(u)" items={OUTERS.map((q, i) => ({ value: i, label: q.label }))} value={v.o} onChange={set("o")} />
          <Choice label="Función interior g(x)" items={INNERS.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={set("i")} />
          <Slider label="Punto x" value={x} min={-2} max={2} step={0.5} color={MANIM.yellow} onChange={(n) => set("x")(Math.round(n * 2))} format={(n) => m(n, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-ca-funcion">{`h(x) = ${O.name(I.text)}`}</p>
        <p className="text-lg" data-testid="tool-ca-regla">{`h′(x) = ${O.dname(I.text)} · ${dg}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-ca-valor">{r.rule === null ? "No definida en ese punto" : `En x = ${m(x, 1)}: g(x) = ${m(r.u, 3)} y h′(x) = ${m(r.rule, 4)}`}</p>
        <p className="text-base" data-testid="tool-ca-comprobacion">{r.numeric === null ? "" : `Comprobación con cocientes incrementales: ${m(r.numeric, 4)}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Derivada de la inversa ───────────── */

/** (f⁻¹)′(b) = 1 / f′(f⁻¹(b)): tangentes simétricas respecto de y = x. */
export function DerivadaInversaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const p0 = int(ini[0], 0, 0, INV_PAIRS.length - 1);
  const init = { i: p0, b: int(ini[1], Math.round(INV_PAIRS[p0]!.b0 * 10), -90, 90) };
  const [v, setV] = useState(init);
  const P = INV_PAIRS[v.i]!;
  const b = clamp(v.b / 10, P.brange[0], P.brange[1]);
  const a = P.inv(b);
  const dfa = P.df(a);
  const dinv = 1 / dfa;
  const domOk = (x: number) => (P.dom ? x >= P.dom[0] && x <= P.dom[1] : true);
  const curves: Curve[] = [
    { fn: P.f, color: MANIM.blue, ok: domOk },
    { fn: P.inv, color: MANIM.orange },
    { fn: (x) => x, color: MANIM.muted, dashed: true, width: 1.6 },
    { fn: (x) => b + dfa * (x - a), color: MANIM.blue, dashed: true, width: 1.8 },
    { fn: (x) => a + dinv * (x - b), color: MANIM.orange, dashed: true, width: 1.8 },
  ];
  return (
    <Frame
      hint={block.hint ?? "Las gráficas de f (azul) y f⁻¹ (naranja) son simétricas respecto de la diagonal, y sus tangentes también: las pendientes son inversas una de otra."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={INV_PAIRS.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV({ i, b: Math.round(INV_PAIRS[i]!.b0 * 10) })} />
          <Slider label="Valor b" value={b} min={P.brange[0]} max={P.brange[1]} step={0.1} color={MANIM.yellow} onChange={(x) => setV((p) => ({ ...p, b: Math.round(x * 10) }))} format={(x) => m(x, 1)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-di-punto">{`f(${m(a, 3)}) = ${m(b, 1)}   ⇒   f⁻¹(${m(b, 1)}) = ${m(a, 3)}   (f⁻¹ = ${P.invLabel})`}</p>
        <p className="text-base" data-testid="tool-di-f">{`f′(${m(a, 3)}) = ${m(dfa, 4)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-di-inversa">{`(f⁻¹)′(${m(b, 1)}) = 1 / f′(${m(a, 3)}) = ${m(dinv, 4)}`}</p>
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-di-formula">{`Fórmula directa: (${P.invLabel})′ = ${P.dinvTex}`}</p>
      </div>
      <FnPlot testId="tool-di-grafica" xr={P.view.xr} yr={P.view.yr} curves={curves} marks={[{ x: a, y: b, color: MANIM.blue, r: 6 }, { x: b, y: a, color: MANIM.orange, r: 6 }]} />
    </Frame>
  );
}

/* ───────────── Velocidad y aceleración ───────────── */

/** Posición, velocidad y aceleración como derivadas sucesivas. */
export function VelocidadAceleracionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 1, 0, MOTIONS.length - 1), t: int(ini[1], 4, 0, 40) };
  const [v, setV] = useState(init);
  const M = MOTIONS[v.i]!;
  const t = clamp((v.t / 40) * M.tmax, 0, M.tmax);
  const lo = Math.min(0, M.v(M.tmax), M.v(0), M.e(M.tmax));
  const hi = Math.max(M.e(M.tmax), M.v(0), M.v(M.tmax)) * 1.1;
  const ticks = Array.from({ length: 6 }, (_, k) => ({ x: (k * M.tmax) / 5, label: fmtEs((k * M.tmax) / 5, M.tmax % 5 ? 1 : 0) })).slice(1);
  return (
    <Frame
      hint={block.hint ?? "La velocidad v(t) es la derivada de la posición e(t) y la aceleración a(t) es la derivada de la velocidad. Azul: posición. Naranja: velocidad."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Movimiento" items={MOTIONS.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV({ i, t: 10 })} />
          <Slider label="Tiempo t (s)" value={v.t} min={0} max={40} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, t: n }))} format={(n) => m((n / 40) * M.tmax, 2)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$${M.tex}$`} className="text-base" />
        <p className="text-base" data-testid="tool-va-funciones">{`${M.vtex};   ${M.atex}`}</p>
        <p className="text-lg" data-testid="tool-va-valores">{`En t = ${m(t, 2)}:   e = ${m(M.e(t), 3)} ${M.unit}   v = ${m(M.v(t), 3)}   a = ${m(M.a(t), 3)}`}</p>
        <p className="text-base" data-testid="tool-va-estado">{M.v(t) > 1e-9 ? "Avanza (v > 0)" : M.v(t) < -1e-9 ? "Retrocede o cae (v < 0)" : "Se detiene un instante (v = 0)"}</p>
      </div>
      <FnPlot testId="tool-va-grafica" xr={[0, M.tmax]} yr={[lo * 1.1 - 1, hi]} xTicks={ticks} curves={[{ fn: M.e, color: MANIM.blue }, { fn: M.v, color: MANIM.orange, width: 2.6 }]} marks={[{ x: t, y: M.e(t), color: MANIM.blue, r: 6 }, { x: t, y: M.v(t), color: MANIM.orange, r: 6 }]} />
    </Frame>
  );
}

/* ───────────── Máximos y mínimos ───────────── */

const EXT_IDS = ["x2m4x", "x3m3x", "x3", "x4", "x3c"];
const EXT_FUNS = [...EXT_IDS.map(byId)];
const EXT_COLOR = { maximo: MANIM.red, minimo: MANIM.green, inflexion: MANIM.yellow } as const;
const EXT_NAME = { maximo: "máximo", minimo: "mínimo", inflexion: "punto de inflexión de tangente horizontal" } as const;

/** Puntos críticos, criterio de la segunda derivada y extremos absolutos en un intervalo. */
export function ExtremosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 4, 0, EXT_FUNS.length), p: int(ini[1], 0, -3, 6), q: int(ini[2], 7, -2, 8), abs: int(ini[3], 0, 0, 1) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const isAbs = v.i === EXT_FUNS.length;
  const c = isAbs ? null : EXT_FUNS[v.i]!;
  const f = c ? c.f : Math.abs;
  const df = c ? c.df : (x: number) => (x === 0 ? 0 : Math.sign(x));
  const xr: [number, number] = c ? c.xr : [-3, 3];
  const yr: [number, number] = c ? c.yr : [-1, 4];
  const crit = c ? (c.crit ?? []) : [];
  const lo = Math.min(v.p, v.q - 1);
  const hi = Math.max(v.q, lo + 1);
  const cands = isAbs ? [lo, 0, hi] : [lo, ...crit.filter((x) => x > lo && x < hi), hi];
  const vals = cands.map((x) => ({ x, y: f(x) }));
  const gmax = vals.reduce((a, b) => (b.y > a.y ? b : a));
  const gmin = vals.reduce((a, b) => (b.y < a.y ? b : a));
  const marks: Mark[] = c
    ? crit.map((x) => ({ x, y: f(x), color: EXT_COLOR[classifyCritical(c, x)], r: 7 }))
    : [{ x: 0, y: 0, color: MANIM.green, r: 7 }];
  const abs = v.abs === 1;
  if (abs) marks.push({ x: gmax.x, y: gmax.y, color: MANIM.red, open: true, r: 10 }, { x: gmin.x, y: gmin.y, color: MANIM.green, open: true, r: 10 });
  const lines = c
    ? crit.map((x) => {
        const k = classifyCritical(c, x);
        const s = c.ddf ? c.ddf(x) : 0;
        return `x = ${m(x, 2)}:  f = ${m(c.f(x), 2)},  f′ = 0,  f″ = ${m(s, 2)}  →  ${EXT_NAME[k]}${Math.abs(s) < 1e-9 ? " (f″ = 0: se mira el signo de f′)" : ""}`;
      })
    : ["x = 0: f no es derivable (esquina); es un mínimo porque |x| ≥ 0"];
  return (
    <Frame
      hint={block.hint ?? "Con f′ = 0 y f″ > 0 hay un mínimo; con f″ < 0, un máximo; con f″ = 0 puede no haber ni uno ni otro. Activa el intervalo para ver los extremos absolutos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Función" items={[...EXT_FUNS.map((q, i) => ({ value: i, label: q.label })), { value: EXT_FUNS.length, label: "|x|" }]} value={v.i} onChange={set("i")} />
          <Choice label="Buscar" items={[{ value: 0, label: "Extremos relativos" }, { value: 1, label: "Absolutos en [p, q]" }]} value={v.abs} onChange={set("abs")} />
          {abs ? (
            <>
              <Slider label="p (extremo izquierdo)" value={v.p} min={-3} max={6} color={MANIM.blue} onChange={set("p")} />
              <Slider label="q (extremo derecho)" value={v.q} min={-2} max={8} color={MANIM.orange} onChange={set("q")} />
            </>
          ) : null}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <div data-testid="tool-ex-funcion"><MathRenderer text={c ? `$f(x) = ${c.tex}\\qquad f'(x) = ${c.dtex}$` : "$f(x) = |x|$"} className="text-base" /></div>
        <ul className="text-base" data-testid="tool-ex-criticos">
          {lines.map((t, j) => (
            <li key={j}>{t}</li>
          ))}
        </ul>
        {abs ? (
          <p className="text-lg font-bold" style={{ color: MANIM.green }} data-testid="tool-ex-absolutos">
            {`En [${lo}, ${hi}]: máximo absoluto ${m(gmax.y, 2)} en x = ${m(gmax.x, 2)}; mínimo absoluto ${m(gmin.y, 2)} en x = ${m(gmin.x, 2)}`}
          </p>
        ) : null}
      </div>
      <FnPlot testId="tool-ex-grafica" xr={xr} yr={yr} curves={[{ fn: f, color: MANIM.blue }, { fn: df, color: MANIM.orange, dashed: true, width: 2 }]} marks={marks} />
    </Frame>
  );
}

/* ───────────── Optimización ───────────── */

/** Problemas de optimización: función a optimizar, derivada y extremo en el dominio. */
export function OptimizacionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, OPT.length - 1), s: int(ini[1], 50, 0, 100) };
  const [v, setV] = useState(init);
  const P = OPT[v.i]!;
  const x = P.dom[0] + ((P.dom[1] - P.dom[0]) * v.s) / 100;
  const y = P.fn(x);
  const best = optimum(P);
  const d = P.dfn(x);
  const hExtra = v.i === 3 ? `   ·   altura h = ${m(4 / (Math.PI * x * x), 3)} m` : v.i === 0 ? `   ·   altura = ${m(1 / x, 3)} m` : `   ·   altura = ${m(7 - x, 3)} m`;
  const near = Math.abs(x - best.x) < (P.dom[1] - P.dom[0]) * 0.015;
  return (
    <Frame
      hint={block.hint ?? "Mueve la variable y mira la función a optimizar. Donde la derivada se anula puede haber un extremo, pero hay que comparar también los extremos del dominio."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Problema" items={OPT.map((q, i) => ({ value: i, label: q.label }))} value={v.i} onChange={(i) => setV({ i, s: 50 })} />
          <Slider label={P.x} value={v.s} min={0} max={100} color={MANIM.yellow} onChange={(s) => setV((p) => ({ ...p, s }))} format={() => m(x, 3)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <MathRenderer text={`$${P.tex}$`} className="text-base" />
        <p className="text-lg" data-testid="tool-op-valor">{`${P.x.split(" ")[0]} = ${m(x, 3)}:   ${P.y} = ${m(y, 3)}   ·   derivada = ${m(d, 3)}${hExtra}`}</p>
        <p className="text-base" data-testid="tool-op-nota">{`${P.note}. Dominio: [${m(P.dom[0], 2)}, ${m(P.dom[1], 2)}]`}</p>
        <p className="text-xl font-bold" style={{ color: near ? MANIM.green : MANIM.muted }} data-testid="tool-op-optimo">
          {`${P.goal === "min" ? "Mínimo" : "Máximo"} en ${P.x.split(" ")[0]} = ${m(best.x, 3)}: ${m(best.y, 3)}${P.crit !== null && (P.crit < P.dom[0] || P.crit > P.dom[1]) ? " (la derivada se anula fuera del dominio: gana un extremo)" : ""}`}
        </p>
      </div>
      <FnPlot testId="tool-op-grafica" xr={P.xr} yr={P.yr} curves={[{ fn: P.fn, color: MANIM.muted, dashed: true, width: 1.8, ok: (t) => t > 0 }, { fn: P.fn, color: MANIM.blue, ok: (t) => t >= P.dom[0] && t <= P.dom[1] }]} marks={[{ x, y, color: MANIM.yellow, r: 6 }, { x: best.x, y: best.y, color: MANIM.green, open: true, r: 9 }]} />
    </Frame>
  );
}
