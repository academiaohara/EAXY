"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { masaMolar, REACCIONES_EB, ecuacionTexto, bonita, type Rx } from "@/components/lesson/slide/tools/Fb1CantidadTools";
import { parseFormula } from "@/components/lesson/slide/tools/Fq4FormulacionTools";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

const SUPD = "⁰¹²³⁴⁵⁶⁷⁸⁹";
function cient(v: number, dec = 2): string {
  if (!Number.isFinite(v) || v === 0) return Number.isFinite(v) ? "0" : "—";
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(dec))) >= 10) { m /= 10; e += 1; }
  return e === 0 ? fmtEs(m, dec) : `${fmtEs(m, dec)}·10${e < 0 ? "⁻" : ""}${String(Math.abs(e)).replace(/[0-9]/g, (c) => SUPD[Number(c)]!)}`;
}

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export type Esqueleto = { id: string; nombre: string; reactivos: string[]; productos: string[]; coef: number[] };
export const ESQUELETOS: Esqueleto[] = [
  { id: "agua", nombre: "Formación del agua", reactivos: ["H2", "O2"], productos: ["H2O"], coef: [2, 1, 2] },
  { id: "metano", nombre: "Combustión del metano", reactivos: ["CH4", "O2"], productos: ["CO2", "H2O"], coef: [1, 2, 1, 2] },
  { id: "propano", nombre: "Combustión del propano", reactivos: ["C3H8", "O2"], productos: ["CO2", "H2O"], coef: [1, 5, 3, 4] },
  { id: "butano", nombre: "Combustión del butano", reactivos: ["C4H10", "O2"], productos: ["CO2", "H2O"], coef: [2, 13, 8, 10] },
  { id: "glucosa", nombre: "Respiración celular", reactivos: ["C6H12O6", "O2"], productos: ["CO2", "H2O"], coef: [1, 6, 6, 6] },
  { id: "aluminio", nombre: "Oxidación del aluminio", reactivos: ["Al", "O2"], productos: ["Al2O3"], coef: [4, 3, 2] },
  { id: "hierro", nombre: "Reducción del óxido de hierro(III)", reactivos: ["Fe2O3", "CO"], productos: ["Fe", "CO2"], coef: [1, 3, 2, 3] },
  { id: "amoniaco", nombre: "Oxidación del amoníaco", reactivos: ["NH3", "O2"], productos: ["NO", "H2O"], coef: [4, 5, 4, 6] },
  { id: "alhcl", nombre: "Aluminio con ácido clorhídrico", reactivos: ["Al", "HCl"], productos: ["AlCl3", "H2"], coef: [2, 6, 2, 3] },
  { id: "neutral", nombre: "Neutralización", reactivos: ["Ca(OH)2", "HCl"], productos: ["CaCl2", "H2O"], coef: [1, 2, 1, 2] },
];
/** Átomos de cada elemento en un lado de la ecuación para unos coeficientes dados. */
export function contarAtomos(formulas: string[], coefs: number[]): Record<string, number> {
  const t: Record<string, number> = {};
  formulas.forEach((f, i) => {
    const c = parseFormula(f);
    if (!c) return;
    for (const [e, n] of Object.entries(c)) t[e] = (t[e] ?? 0) + n * (coefs[i] ?? 0);
  });
  return t;
}
export function estaAjustada(e: Esqueleto, coefs: number[]): boolean {
  const r = contarAtomos(e.reactivos, coefs.slice(0, e.reactivos.length));
  const p = contarAtomos(e.productos, coefs.slice(e.reactivos.length));
  const els = new Set([...Object.keys(r), ...Object.keys(p)]);
  return coefs.every((c) => c >= 1) && [...els].every((el) => (r[el] ?? 0) === (p[el] ?? 0));
}
/** Coeficientes enteros mínimos que ajustan la ecuación (búsqueda exhaustiva con coeficientes hasta `max`). */
export function ajusteMinimo(e: Esqueleto, max = 14): number[] | null {
  const n = e.reactivos.length + e.productos.length;
  let mejor: number[] | null = null;
  const rec = (i: number, cur: number[]) => {
    if (i === n) {
      if (estaAjustada(e, cur) && (!mejor || cur.reduce((a, b) => a + b, 0) < mejor.reduce((a, b) => a + b, 0))) mejor = [...cur];
      return;
    }
    for (let c = 1; c <= max; c += 1) { cur.push(c); rec(i + 1, cur); cur.pop(); }
  };
  rec(0, []);
  return mejor;
}

/** Reactivo limitante de una reacción de dos reactivos a partir de las masas (g) de cada uno. */
export function reactivoLimitante(r: Rx, masas: number[]) {
  const reactivos = r.esp.filter((e) => e.lado === "r");
  const molesDisp = reactivos.map((e, i) => (masas[i] ?? 0) / masaMolar(e.f));
  const veces = reactivos.map((e, i) => molesDisp[i]! / e.c);
  const k = Math.min(...veces);
  const lim = veces.indexOf(k);
  return {
    limitante: reactivos[lim]!.f,
    iLim: lim,
    extentos: k,
    sobran: reactivos.map((e, i) => ({ f: e.f, mol: molesDisp[i]! - k * e.c, masa: (molesDisp[i]! - k * e.c) * masaMolar(e.f) })),
    productos: r.esp.filter((e) => e.lado === "p").map((e) => ({ f: e.f, mol: k * e.c, masa: k * e.c * masaMolar(e.f) })),
  };
}
export const rendimiento = (real: number, teorico: number): number => (teorico > 0 ? (real / teorico) * 100 : NaN);
export const masaReal = (teorica: number, pct: number): number => (teorica * Math.max(0, Math.min(100, pct))) / 100;

/* Ácidos y bases */
export const KW = 1e-14;
export const phAcidoFuerte = (C: number): number => (C > 0 ? -Math.log10((C + Math.sqrt(C * C + 4 * KW)) / 2) : NaN);
export const phBaseFuerte = (C: number): number => (C > 0 ? 14 + Math.log10((C + Math.sqrt(C * C + 4 * KW)) / 2) : NaN);
/** Concentración de H⁺ (o de OH⁻) de un ácido (o base) débil: x²/(C − x) = K. */
export const xDebil = (C: number, K: number): number => (C > 0 && K > 0 ? (-K + Math.sqrt(K * K + 4 * K * C)) / 2 : NaN);
export const phAcidoDebil = (C: number, Ka: number): number => -Math.log10(xDebil(C, Ka));
export const phBaseDebil = (C: number, Kb: number): number => 14 + Math.log10(xDebil(C, Kb));
export type Especie = { f: string; nombre: string; tipo: "ácido fuerte" | "ácido débil" | "base fuerte" | "base débil"; K?: number };
export const ESPECIES_PH: Especie[] = [
  { f: "HCl", nombre: "ácido clorhídrico", tipo: "ácido fuerte" }, { f: "HNO3", nombre: "ácido nítrico", tipo: "ácido fuerte" },
  { f: "CH3COOH", nombre: "ácido acético", tipo: "ácido débil", K: 1.8e-5 }, { f: "HF", nombre: "ácido fluorhídrico", tipo: "ácido débil", K: 6.8e-4 },
  { f: "NaOH", nombre: "hidróxido de sodio", tipo: "base fuerte" }, { f: "KOH", nombre: "hidróxido de potasio", tipo: "base fuerte" },
  { f: "NH3", nombre: "amoníaco", tipo: "base débil", K: 1.8e-5 },
];
export function calcularPh(e: Especie, C: number) {
  let ph: number;
  if (e.tipo === "ácido fuerte") ph = phAcidoFuerte(C);
  else if (e.tipo === "base fuerte") ph = phBaseFuerte(C);
  else if (e.tipo === "ácido débil") ph = phAcidoDebil(C, e.K!);
  else ph = phBaseDebil(C, e.K!);
  const x = e.tipo.startsWith("ácido") ? 10 ** -ph : 10 ** (ph - 14);
  const alpha = e.tipo.endsWith("débil") ? (x / C) * 100 : e.tipo.endsWith("fuerte") && C >= 1e-6 ? 100 : NaN;
  return { ph, poh: 14 - ph, h: 10 ** -ph, oh: 10 ** (ph - 14), alpha };
}
/** pH durante la valoración de un ácido fuerte (Ca, Va en L) con una base fuerte (Cb) tras añadir Vb (L). */
export function phValoracion(Ca: number, Va: number, Cb: number, Vb: number): number {
  const nH = Ca * Va;
  const nOH = Cb * Math.max(0, Vb);
  const V = Va + Math.max(0, Vb);
  if (!(V > 0)) return NaN;
  const d = (nH - nOH) / V;
  if (Math.abs(d) < 1e-9) return 7;
  return d > 0 ? -Math.log10(d) : 14 + Math.log10(-d);
}
export const volumenEquivalencia = (Ca: number, Va: number, Cb: number): number => (Cb > 0 ? (Ca * Va) / Cb : NaN);

/* Redox y pilas */
export const POTENCIALES = [
  { s: "Li", nombre: "litio", n: 1, E: -3.04 }, { s: "K", nombre: "potasio", n: 1, E: -2.93 }, { s: "Ca", nombre: "calcio", n: 2, E: -2.87 }, { s: "Na", nombre: "sodio", n: 1, E: -2.71 },
  { s: "Mg", nombre: "magnesio", n: 2, E: -2.37 }, { s: "Al", nombre: "aluminio", n: 3, E: -1.66 }, { s: "Zn", nombre: "cinc", n: 2, E: -0.76 }, { s: "Fe", nombre: "hierro", n: 2, E: -0.44 },
  { s: "Ni", nombre: "níquel", n: 2, E: -0.26 }, { s: "Pb", nombre: "plomo", n: 2, E: -0.13 }, { s: "Cu", nombre: "cobre", n: 2, E: 0.34 }, { s: "Ag", nombre: "plata", n: 1, E: 0.8 }, { s: "Au", nombre: "oro", n: 3, E: 1.5 },
] as const;
const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
const sup = (n: number): string => (n > 1 ? String(n).replace(/[0-9]/g, (c) => SUPD[Number(c)]!) : "") + "⁺";
/** Pila entre dos metales: ánodo (menor E°), cátodo, f.e.m. y reacción global ajustada. */
export function pila(i: number, j: number) {
  const a = POTENCIALES[i];
  const b = POTENCIALES[j];
  if (!a || !b || i === j) return null;
  const [an, ca] = a.E < b.E ? [a, b] : [b, a];
  const ne = (an.n * ca.n) / mcd(an.n, ca.n);
  const cAn = ne / an.n;
  const cCa = ne / ca.n;
  const c = (n: number, f: string): string => (n > 1 ? `${n} ${f}` : f);
  return {
    anodo: an,
    catodo: ca,
    fem: ca.E - an.E,
    ne,
    oxidacion: `${an.s} → ${an.s}${sup(an.n)} + ${an.n} e⁻`.replace("⁺", an.n > 1 ? "⁺" : "⁺"),
    reduccion: `${ca.s}${sup(ca.n)} + ${ca.n} e⁻ → ${ca.s}`,
    global: `${c(cAn, an.s)} + ${c(cCa, `${ca.s}${sup(ca.n)}`)} → ${c(cAn, `${an.s}${sup(an.n)}`)} + ${c(cCa, ca.s)}`,
    espontanea: ca.E - an.E > 0,
  };
}

/* Procesos industriales */
export type Proceso = { id: string; nombre: string; rx: Rx; deseado: string; uso: string };
export const PROCESOS: Proceso[] = [
  { id: "haber", nombre: "Síntesis del amoníaco (Haber-Bosch)", rx: REACCIONES_EB.find((r) => r.id === "nh3")!, deseado: "NH3", uso: "abonos nitrogenados y explosivos" },
  { id: "hierro", nombre: "Obtención del hierro (alto horno)", rx: REACCIONES_EB.find((r) => r.id === "fe2o3")!, deseado: "Fe", uso: "acero y fundición" },
  { id: "cal", nombre: "Obtención de cal viva", rx: REACCIONES_EB.find((r) => r.id === "caco3")!, deseado: "CaO", uso: "cemento, construcción y siderurgia" },
  { id: "metano", nombre: "Combustión del metano (energía)", rx: REACCIONES_EB.find((r) => r.id === "ch4")!, deseado: "H2O", uso: "calefacción y electricidad (se libera CO₂)" },
];
/** Economía atómica: masa del producto deseado / masa total de reactivos · 100. */
export function economiaAtomica(p: Proceso): number {
  const rs = p.rx.esp.filter((e) => e.lado === "r").reduce((s, e) => s + e.c * masaMolar(e.f), 0);
  const d = p.rx.esp.find((e) => e.f === p.deseado)!;
  return ((d.c * masaMolar(d.f)) / rs) * 100;
}

/* ───────────── Dibujo ───────────── */

function Titulo({ f, sub: s, id }: { f: string; sub?: string; id: string }) {
  return (
    <Svg w={520} h={90} testId={id} maxH={110}>
      <text x={260} y={46} textAnchor="middle" fill={MANIM.yellow} fontSize={f.length > 34 ? 18 : f.length > 22 ? 24 : 32} fontWeight={700}>{f}</text>
      {s && <text x={260} y={78} textAnchor="middle" fill={MANIM.muted} fontSize={13}>{s}</text>}
    </Svg>
  );
}

/* ───────────── 1. Ajuste de ecuaciones ───────────── */

export function AjusteFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 1, 0, ESQUELETOS.length - 1)), c: [1, 1, 1, 1, 1] };
  const [s, setS] = useState(init);
  const e = ESQUELETOS[s.i]!;
  const n = e.reactivos.length + e.productos.length;
  const coefs = s.c.slice(0, n);
  const ok = estaAjustada(e, coefs);
  const r = contarAtomos(e.reactivos, coefs.slice(0, e.reactivos.length));
  const p = contarAtomos(e.productos, coefs.slice(e.reactivos.length));
  const els = [...new Set([...Object.keys(r), ...Object.keys(p)])];
  const txt = (fs: string[], cs: number[]): string => fs.map((f, k) => `${cs[k]! > 1 ? `${cs[k]} ` : ""}${bonita(f)}`).join(" + ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ajusta con coeficientes (nunca cambiando los subíndices) hasta que haya los mismos átomos de cada elemento a los dos lados."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={ESQUELETOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.i)} onChange={(k) => setS({ i: Number(k), c: [1, 1, 1, 1, 1] })} />
          {[...e.reactivos, ...e.productos].map((f, k) => (
            <Slider key={f + k} label={`Coeficiente de ${bonita(f)}`} value={coefs[k]!} min={1} max={14} step={1} color={k < e.reactivos.length ? MANIM.blue : MANIM.green} onChange={(v) => setS((o) => ({ ...o, c: o.c.map((x, q) => (q === k ? v : x)) }))} />
          ))}
        </>
      }
    >
      <Titulo f={`${txt(e.reactivos, coefs.slice(0, e.reactivos.length))} → ${txt(e.productos, coefs.slice(e.reactivos.length))}`} sub={ok ? "¡Ajustada! Mismos átomos a ambos lados" : "Aún no está ajustada"} id="ajuste" />
      <Readout>
        {els.map((el) => (
          <Stat key={el} color={(r[el] ?? 0) === (p[el] ?? 0) ? MANIM.green : MANIM.red} label={`Átomos de ${el}: reactivos · productos`}>{`${r[el] ?? 0} · ${p[el] ?? 0} ${(r[el] ?? 0) === (p[el] ?? 0) ? "✓" : "✗"}`}</Stat>
        ))}
        <Stat color={ok ? MANIM.green : MANIM.orange} label="Estado">{ok ? "ajustada (¿son los coeficientes mínimos?)" : "sigue ajustando"}</Stat>
      </Readout>
      <Note>Una <b>ecuación química</b> representa una reacción: reactivos → productos. Para cumplir la <b>ley de Lavoisier</b> debe tener <b>los mismos átomos de cada elemento</b> a ambos lados. Se <b>ajusta</b> con <b>coeficientes estequiométricos</b> delante de cada fórmula; <b>nunca se cambian los subíndices</b> (cambiarían la sustancia). Método de <b>tanteo</b>: empieza por el elemento que aparece en un solo reactivo y un solo producto, deja el <b>oxígeno y el hidrógeno para el final</b> y, si hay fracciones, multiplica todo por el denominador (butano: 13/2 O₂ → ×2). Método <b>algebraico</b>: un coeficiente por sustancia, una ecuación por elemento. Los coeficientes deben ser los <b>enteros más pequeños</b>. Los coeficientes indican la proporción de <b>moles</b> y de moléculas (y de volúmenes en gases a igual P y T).</Note>
    </Frame>
  );
}

/* ───────────── 2. Reactivo limitante y rendimiento ───────────── */

export function LimitanteFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 3, 0, REACCIONES_EB.length - 1)), a: Math.round(num(block.params?.a, 32, 1, 500)), b: Math.round(num(block.params?.b, 100, 1, 500)), p: Math.round(num(block.params?.c, 80, 10, 100)) };
  const [s, setS] = useState(init);
  const rx = REACCIONES_EB[s.r]!;
  const reactivos = rx.esp.filter((e) => e.lado === "r");
  const dosReact = reactivos.length === 2;
  const masas = dosReact ? [s.a, s.b] : [s.a];
  const l = reactivoLimitante(rx, masas);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El reactivo limitante es el que se agota primero y marca la cantidad de producto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES_EB.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.r)} onChange={(k) => setS((o) => ({ ...o, r: Number(k) }))} />
          <Slider label={`Masa de ${bonita(reactivos[0]!.f)}`} value={s.a} min={1} max={500} step={1} unit=" g" color={MANIM.blue} onChange={(a) => setS((o) => ({ ...o, a }))} />
          {dosReact && <Slider label={`Masa de ${bonita(reactivos[1]!.f)}`} value={s.b} min={1} max={500} step={1} unit=" g" color={MANIM.orange} onChange={(b) => setS((o) => ({ ...o, b }))} />}
          <Slider label="Rendimiento de la reacción" value={s.p} min={10} max={100} step={1} unit=" %" color={MANIM.green} onChange={(p) => setS((o) => ({ ...o, p }))} />
        </>
      }
    >
      <Titulo f={ecuacionTexto(rx)} sub={`reactivo limitante: ${bonita(l.limitante)}`} id="limitante" />
      <Readout>
        <Stat color={MANIM.red} label="Reactivo limitante (se agota)">{bonita(l.limitante)}</Stat>
        {l.sobran.map((x) => (
          <Stat key={x.f} color={x.mol < 1e-9 ? MANIM.muted : MANIM.blue} label={`Sobra de ${bonita(x.f)}`}>{x.mol < 1e-9 ? "nada (se agota)" : `${fin(x.mol, f3)} mol · ${fin(x.masa, f1)} g`}</Stat>
        ))}
        {l.productos.map((x) => (
          <Stat key={x.f} color={MANIM.green} label={`Producto ${bonita(x.f)}: teórico → real (${s.p} %)`}>{`${fin(x.masa, f2)} g → ${fin(masaReal(x.masa, s.p), f2)} g`}</Stat>
        ))}
      </Readout>
      <Note>Cuando los reactivos <b>no están en proporción estequiométrica</b>, uno se agota antes: es el <b>reactivo limitante</b>, y el otro está <b>en exceso</b>. Para identificarlo: pasa las masas a <b>moles</b> y divide cada uno por su coeficiente; el <b>menor cociente</b> corresponde al limitante. <b>Todos los cálculos del producto</b> se hacen a partir del limitante. El <b>rendimiento</b> de una reacción es <b>(masa real / masa teórica)·100</b>: casi nunca llega al 100 % por reacciones secundarias, pérdidas o equilibrios. La cantidad <b>real</b> de producto = teórica · rendimiento/100. La <b>pureza</b> de los reactivos y el rendimiento se combinan en los problemas reales de la industria.</Note>
    </Frame>
  );
}

/* ───────────── 3. Ácidos, bases y pH ───────────── */

export function PhFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 2, 0, ESPECIES_PH.length - 1)), e: num(block.params?.a, -1.5, -6, 0.5) };
  const [s, setS] = useState(init);
  const esp = ESPECIES_PH[s.i]!;
  const C = 10 ** s.e;
  const r = calcularPh(esp, C);
  const X = (ph: number): number => 40 + (Math.max(0, Math.min(14, ph)) / 14) * 440;
  return (
    <Frame
      stacked
      hint={block.hint ?? "pH = −log[H⁺]; pH + pOH = 14. Un ácido fuerte se ioniza por completo; uno débil, solo en parte."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Especie" items={ESPECIES_PH.map((x, k) => ({ value: String(k), label: bonita(x.f) }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="log₁₀ de la concentración inicial (mol/L)" value={s.e} min={-6} max={0.5} step={0.1} color={MANIM.orange} format={f1} onChange={(e) => setS((o) => ({ ...o, e }))} />
        </>
      }
    >
      <Svg w={520} h={95} testId="ph" maxH={115}>
        {Array.from({ length: 15 }, (_, k) => <rect key={k} x={40 + (k / 14) * 440 - 15} y={30} width={31} height={22} fill={`hsl(${Math.round(360 - k * 25)} 70% 50%)`} fillOpacity={0.85} />)}
        <polygon points={`${X(r.ph)},26 ${X(r.ph) - 7},12 ${X(r.ph) + 7},12`} fill={MANIM.ink} />
        <text x={40} y={72} fill={MANIM.muted} fontSize={11}>0 · ácido</text>
        <text x={260} y={72} textAnchor="middle" fill={MANIM.muted} fontSize={11}>7 · neutro</text>
        <text x={480} y={72} textAnchor="end" fill={MANIM.muted} fontSize={11}>14 · básico</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`${bonita(esp.f)} (${esp.nombre}) · ${esp.tipo}`}>{`C = ${cient(C)} mol/L`}</Stat>
        <Stat color={MANIM.red} label="pH · pOH">{`${fin(r.ph, f2)} · ${fin(r.poh, f2)}`}</Stat>
        <Stat color={MANIM.blue} label="[H⁺] · [OH⁻] (mol/L)">{`${cient(r.h)} · ${cient(r.oh)}`}</Stat>
        <Stat color={MANIM.green} label="Grado de ionización α">{Number.isFinite(r.alpha) ? `${fin(r.alpha, f2)} %` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Carácter">{r.ph < 6.95 ? "ácida" : r.ph > 7.05 ? "básica" : "neutra"}</Stat>
      </Readout>
      <Note>Según <b>Arrhenius</b>, un ácido libera H⁺ en agua y una base libera OH⁻. Según <b>Brønsted-Lowry</b>, un <b>ácido</b> cede protones y una <b>base</b> los acepta; cada ácido tiene su <b>base conjugada</b> (HCl/Cl⁻; NH₄⁺/NH₃). El agua se autoioniza: <b>K_w = [H⁺]·[OH⁻] = 10⁻¹⁴</b> a 25 °C. <b>pH = −log[H⁺]</b>, <b>pOH = −log[OH⁻]</b> y <b>pH + pOH = 14</b>. Los <b>ácidos y bases fuertes</b> (HCl, HNO₃, NaOH, KOH) se ionizan <b>por completo</b>: [H⁺] = C. Los <b>débiles</b> (ácido acético, HF, NH₃) solo en parte, con constante <b>K_a</b> o <b>K_b</b>: [H⁺] ≈ √(K_a·C) si α es pequeño. A menor concentración, un ácido débil se ioniza proporcionalmente más. Valores de K a 25 °C aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 4. Valoración ácido-base ───────────── */

export function ValoracionFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { Ca: num(block.params?.a, 0.1, 0.01, 1), Va: num(block.params?.b, 25, 5, 100), Cb: num(block.params?.c, 0.1, 0.01, 1), vb: 10 };
  const [s, setS] = useState(init);
  const Veq = volumenEquivalencia(s.Ca, s.Va, s.Cb) * 1; // mL (Va en mL)
  const Vmax = Math.max(2 * (Number.isFinite(Veq) ? Veq : 50), 10);
  const ph = phValoracion(s.Ca, s.Va / 1000, s.Cb, s.vb / 1000);
  const X = (v: number): number => 50 + (v / Vmax) * 420;
  const Y = (p: number): number => 150 - (Math.max(0, Math.min(14, p)) / 14) * 130;
  const pts = Array.from({ length: 121 }, (_, k) => {
    const v = (k / 120) * Vmax;
    return `${X(v)},${Y(phValoracion(s.Ca, s.Va / 1000, s.Cb, v / 1000))}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "En el punto de equivalencia, moles de H⁺ = moles de OH⁻: Ca·Va = Cb·Vb."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Concentración del ácido (HCl)" value={s.Ca} min={0.01} max={1} step={0.01} unit=" mol/L" color={MANIM.red} format={f2} onChange={(Ca) => setS((o) => ({ ...o, Ca }))} />
          <Slider label="Volumen de ácido" value={s.Va} min={5} max={100} step={1} unit=" mL" color={MANIM.red} onChange={(Va) => setS((o) => ({ ...o, Va }))} />
          <Slider label="Concentración de la base (NaOH)" value={s.Cb} min={0.01} max={1} step={0.01} unit=" mol/L" color={MANIM.blue} format={f2} onChange={(Cb) => setS((o) => ({ ...o, Cb }))} />
          <Slider label="Volumen de base añadido (bureta)" value={Math.min(s.vb, Vmax)} min={0} max={Math.round(Vmax * 10) / 10} step={0.5} unit=" mL" color={MANIM.green} format={f1} onChange={(vb) => setS((o) => ({ ...o, vb }))} />
        </>
      }
    >
      <Svg w={520} h={175} testId="valoracion" maxH={195}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[50, Y(7)]} b={[480, Y(7)]} color={MANIM.muted} width={1} dashed />
        <polyline points={pts} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        {Number.isFinite(Veq) && <Seg a={[X(Veq), 150]} b={[X(Veq), 15]} color={MANIM.green} width={1.5} dashed />}
        <Dot p={[X(Math.min(s.vb, Vmax)), Y(ph)]} r={6} color={MANIM.yellow} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={11}>volumen de NaOH añadido (mL)</text>
        <text x={56} y={14} fill={MANIM.muted} fontSize={11}>pH</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`pH tras añadir ${f1(Math.min(s.vb, Vmax))} mL`}>{fin(ph, f2)}</Stat>
        <Stat color={MANIM.green} label="Volumen en el punto de equivalencia">{`${fin(Veq, f2)} mL`}</Stat>
        <Stat color={MANIM.purple} label="Indicador útil">{Number.isFinite(ph) && ph < 3.1 ? "naranja de metilo: rojo" : "fenolftaleína: incolora (pH < 8,2) / rosa (pH > 8,2)"}</Stat>
        <Stat color={MANIM.blue} label="Estado">{Math.abs(ph - 7) < 0.01 ? "equivalencia: neutralización exacta" : ph < 7 ? "queda ácido sin neutralizar" : "exceso de base"}</Stat>
      </Readout>
      <Note>En una <b>neutralización</b> el ácido y la base reaccionan formando una <b>sal y agua</b>: HCl + NaOH → NaCl + H₂O (ionicamente, H⁺ + OH⁻ → H₂O). Una <b>valoración (volumetría)</b> permite hallar la concentración desconocida de una disolución añadiendo desde una <b>bureta</b> otra de concentración conocida hasta el <b>punto de equivalencia</b> (cambio de color de un <b>indicador</b>, como la fenolftaleína): <b>moles de H⁺ = moles de OH⁻</b>, es decir <b>Cₐ·Vₐ = C_b·V_b</b> (para ácido y base monopróticos). Con ácido y base fuertes el pH de equivalencia es <b>7</b>; el pH sube bruscamente alrededor de ese punto. Con ácidos débiles, el pH de equivalencia es &gt; 7. Aplicaciones: antiácidos, vertidos, control de alimentos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Redox y pilas ───────────── */

export function RedoxPilaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 6, 0, POTENCIALES.length - 1)), b: Math.round(num(block.params?.b, 10, 0, POTENCIALES.length - 1)) };
  const [s, setS] = useState(init);
  const p = pila(s.a, s.b);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El metal con menor potencial de reducción se oxida (ánodo); el de mayor, se reduce (cátodo)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Semipila 1" items={POTENCIALES.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.a)} onChange={(k) => setS((o) => ({ ...o, a: Number(k) }))} />
          <Choice label="Semipila 2" items={POTENCIALES.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.b)} onChange={(k) => setS((o) => ({ ...o, b: Number(k) }))} />
        </>
      }
    >
      <Titulo f={p ? p.global : "elige dos metales distintos"} sub={p ? `f.e.m. = E°cátodo − E°ánodo = ${fmtEs(p.catodo.E, 2)} − (${fmtEs(p.anodo.E, 2)}) = ${fmtEs(p.fem, 2)} V` : undefined} id="pila" />
      <Readout>
        {p ? (
          <>
            <Stat color={MANIM.red} label={`Ánodo (−): oxidación · se oxida el ${p.anodo.nombre}`}>{p.oxidacion}</Stat>
            <Stat color={MANIM.blue} label={`Cátodo (+): reducción · se reduce el ion ${p.catodo.nombre}`}>{p.reduccion}</Stat>
            <Stat color={MANIM.yellow} label="Fuerza electromotriz E°">{`${fmtEs(p.fem, 2)} V`}</Stat>
            <Stat color={MANIM.green} label="Electrones intercambiados">{`${p.ne}`}</Stat>
            <Stat color={MANIM.purple} label="Agente reductor · agente oxidante">{`${p.anodo.s} · ${p.catodo.s}${sup(p.catodo.n)}`}</Stat>
          </>
        ) : <Stat color={MANIM.muted} label="Resultado">elige dos metales diferentes</Stat>}
      </Readout>
      <Note>Una <b>reacción redox</b> es una transferencia de <b>electrones</b>: la <b>oxidación</b> es la <b>pérdida</b> de electrones (aumenta el nº de oxidación) y la <b>reducción</b>, la <b>ganancia</b>. La especie que se <b>oxida</b> es el <b>agente reductor</b> y la que se <b>reduce</b>, el <b>agente oxidante</b>. Se ajustan con el <b>método ion-electrón</b>: se escriben las dos <b>semirreacciones</b>, se ajustan átomos y cargas (en medio ácido con H⁺ y H₂O), se <b>igualan los electrones</b> y se suman. En una <b>pila</b> (celda galvánica) las dos semirreacciones ocurren en recipientes separados unidos por un <b>puente salino</b>; los electrones fluyen por el hilo del <b>ánodo (−)</b> al <b>cátodo (+)</b>. La f.e.m. se calcula con los <b>potenciales estándar de reducción</b>: <b>E° = E°cátodo − E°ánodo</b>; si es positiva, la reacción es <b>espontánea</b>. La pila Daniell (Zn/Cu) da 1,10 V. Potenciales a 25 °C y 1 mol/L.</Note>
    </Frame>
  );
}

/* ───────────── 6. Procesos industriales y ambientales ───────────── */

export function IndustriaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, PROCESOS.length - 1)), kg: Math.round(num(block.params?.a, 1000, 100, 5000)), p: Math.round(num(block.params?.b, 80, 10, 100)) };
  const [s, setS] = useState(init);
  const pr = PROCESOS[s.i]!;
  const rs = pr.rx.esp.filter((e) => e.lado === "r");
  const principal = rs[0]!;
  const d = pr.rx.esp.find((e) => e.f === pr.deseado)!;
  const nBase = s.kg * 1000 / masaMolar(principal.f) / principal.c;
  const masaDeseadaT = (nBase * d.c * masaMolar(d.f)) / 1000;
  const co2 = pr.rx.esp.find((e) => e.f === "CO2" && e.lado === "p");
  const kgCO2 = co2 ? (nBase * co2.c * masaMolar("CO2")) / 1000 : 0;
  const ae = economiaAtomica(pr);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La economía atómica mide qué parte de la masa de los reactivos acaba en el producto deseado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Proceso" items={PROCESOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label={`Masa de ${bonita(principal.f)} que se procesa`} value={s.kg} min={100} max={5000} step={100} unit=" kg" color={MANIM.blue} onChange={(kg) => setS((o) => ({ ...o, kg }))} />
          <Slider label="Rendimiento del proceso" value={s.p} min={10} max={100} step={1} unit=" %" color={MANIM.green} onChange={(p) => setS((o) => ({ ...o, p }))} />
        </>
      }
    >
      <Titulo f={ecuacionTexto(pr.rx)} sub={`uso: ${pr.uso}`} id="industria" />
      <Readout>
        <Stat color={MANIM.yellow} label={`Producto deseado ${bonita(pr.deseado)}: teórico → real`}>{`${fmtEs(masaDeseadaT, 1)} kg → ${fmtEs(masaReal(masaDeseadaT, s.p), 1)} kg`}</Stat>
        <Stat color={MANIM.orange} label="Economía atómica">{`${fmtEs(ae, 1)} %`}</Stat>
        <Stat color={kgCO2 > 0 ? MANIM.red : MANIM.green} label="CO₂ emitido (teórico)">{kgCO2 > 0 ? `${fmtEs(kgCO2, 1)} kg` : "ninguno en esta reacción"}</Stat>
        <Stat color={MANIM.purple} label="Coste ambiental">{ae < 60 ? "baja economía atómica: mucha masa se desperdicia como residuo" : "alta economía atómica: casi toda la masa se aprovecha"}</Stat>
      </Readout>
      <Note>La <b>industria química</b> aplica la estequiometría a gran escala: <b>Haber-Bosch</b> (N₂ + 3 H₂ → 2 NH₃, base de los fertilizantes: alimenta a media humanidad), <b>alto horno</b> (reducción del mineral de hierro con coque), <b>cal viva</b> (calcinación de la caliza) o la <b>combustión</b> de hidrocarburos. Interesa el <b>rendimiento</b> (cuánto producto real se obtiene) y la <b>economía atómica</b> (<b>masa del producto deseado / masa de todos los reactivos · 100</b>), que valora la cantidad de residuos. Impacto ambiental: la combustión de combustibles fósiles emite <b>CO₂</b> (efecto invernadero y cambio climático) y óxidos de azufre y nitrógeno que dan lugar a la <b>lluvia ácida</b>; los fertilizantes en exceso provocan <b>eutrofización</b>. La <b>química verde</b> busca procesos con más economía atómica, menos residuos y energías renovables. Se simplifica: reactivo principal puro y en exceso de los demás.</Note>
    </Frame>
  );
}
