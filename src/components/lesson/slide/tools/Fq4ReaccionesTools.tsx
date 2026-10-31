"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { ion, parseFormula, sub } from "@/components/lesson/slide/tools/Fq4FormulacionTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const bonita = (f: string): string => f.replace(/[0-9]/g, (d) => sub(Number(d)));

/* ───────────── Cálculos y datos (se comprueban en los tests) ───────────── */

export const MASA_ATOMICA: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Mg: 24, Al: 27, S: 32, Cl: 35.5, K: 39, Ca: 40, Fe: 56, Cu: 63.5, Zn: 65.4 };
export const AVOGADRO = 6.022e23;
export const R_GASES = 0.082; // atm·L/(mol·K)

/** Masa molar (g/mol) de una fórmula escrita con dígitos normales (H2SO4); NaN si algún elemento no está en la tabla. */
export function masaMolar(f: string): number {
  const c = parseFormula(f);
  if (!c) return NaN;
  let t = 0;
  for (const [e, n] of Object.entries(c)) {
    const m = MASA_ATOMICA[e];
    if (m === undefined) return NaN;
    t += m * n;
  }
  return t;
}
export const moles = (masa: number, M: number): number => (M > 0 ? masa / M : NaN);
export const particulas = (n: number): number => n * AVOGADRO;
/** Volumen (L) de n mol de gas ideal a T (K) y P (atm). */
export const volumenGas = (n: number, T: number, P: number): number => (P > 0 ? (n * R_GASES * T) / P : NaN);
/** Volumen molar en condiciones normales (0 °C y 1 atm): 22,4 L/mol. */
export const volumenCN = (n: number): number => volumenGas(n, 273, 1);

export type Especie = { f: string; c: number; gas?: boolean };
export type Reaccion = { id: string; nombre: string; reactivos: Especie[]; productos: Especie[] };
export const REACCIONES: Reaccion[] = [
  { id: "agua", nombre: "Formación del agua", reactivos: [{ f: "H2", c: 2, gas: true }, { f: "O2", c: 1, gas: true }], productos: [{ f: "H2O", c: 2 }] },
  { id: "amoniaco", nombre: "Síntesis del amoniaco", reactivos: [{ f: "N2", c: 1, gas: true }, { f: "H2", c: 3, gas: true }], productos: [{ f: "NH3", c: 2, gas: true }] },
  { id: "metano", nombre: "Combustión del metano", reactivos: [{ f: "CH4", c: 1, gas: true }, { f: "O2", c: 2, gas: true }], productos: [{ f: "CO2", c: 1, gas: true }, { f: "H2O", c: 2 }] },
  { id: "magnesio", nombre: "Combustión del magnesio", reactivos: [{ f: "Mg", c: 2 }, { f: "O2", c: 1, gas: true }], productos: [{ f: "MgO", c: 2 }] },
  { id: "caliza", nombre: "Caliza con ácido clorhídrico", reactivos: [{ f: "CaCO3", c: 1 }, { f: "HCl", c: 2 }], productos: [{ f: "CaCl2", c: 1 }, { f: "H2O", c: 1 }, { f: "CO2", c: 1, gas: true }] },
  { id: "zinc", nombre: "Cinc con ácido clorhídrico", reactivos: [{ f: "Zn", c: 1 }, { f: "HCl", c: 2 }], productos: [{ f: "ZnCl2", c: 1 }, { f: "H2", c: 1, gas: true }] },
];
export const especies = (r: Reaccion): Especie[] => [...r.reactivos, ...r.productos];
export const ecuacionTexto = (r: Reaccion): string => {
  const lado = (l: Especie[]) => l.map((e) => `${e.c > 1 ? `${e.c} ` : ""}${bonita(e.f)}`).join(" + ");
  return `${lado(r.reactivos)} → ${lado(r.productos)}`;
};
/** ¿Tiene la reacción los mismos átomos de cada elemento a ambos lados? */
export function estaAjustada(r: Reaccion): boolean {
  const cuenta = (l: Especie[]) => {
    const t: Record<string, number> = {};
    for (const e of l) {
      const p = parseFormula(e.f);
      if (!p) return null;
      for (const [k, v] of Object.entries(p)) t[k] = (t[k] ?? 0) + v * e.c;
    }
    return t;
  };
  const a = cuenta(r.reactivos);
  const b = cuenta(r.productos);
  if (!a || !b) return false;
  const els = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...els].every((e) => (a[e] ?? 0) === (b[e] ?? 0));
}
/** Cálculo estequiométrico: dada la masa (g) de la especie `origen` (índice en especies(r)), masa y moles de cada especie. */
export function estequiometria(r: Reaccion, origen: number, masa: number): { f: string; moles: number; masa: number; volumenCN: number | null }[] {
  const es = especies(r);
  const o = es[origen];
  if (!o) return es.map((e) => ({ f: e.f, moles: NaN, masa: NaN, volumenCN: null }));
  const nAvance = moles(masa, masaMolar(o.f)) / o.c;
  return es.map((e) => {
    const n = nAvance * e.c;
    return { f: e.f, moles: n, masa: n * masaMolar(e.f), volumenCN: e.gas ? volumenCN(n) : null };
  });
}
/** Reactivo limitante dados las masas (g) de cada reactivo: índice, avance (mol de reacción) y exceso (g) del otro. */
export function reactivoLimitante(r: Reaccion, masas: readonly number[]) {
  const avances = r.reactivos.map((e, i) => moles(masas[i] ?? 0, masaMolar(e.f)) / e.c);
  const avance = Math.min(...avances);
  const limitante = avances.indexOf(avance);
  const exceso = r.reactivos.map((e, i) => (masas[i] ?? 0) - avance * e.c * masaMolar(e.f));
  const productos = r.productos.map((e) => ({ f: e.f, masa: avance * e.c * masaMolar(e.f) }));
  return { avances, avance, limitante, exceso, productos };
}
export const rendimientoPct = (real: number, teorico: number): number => (teorico > 0 ? (100 * real) / teorico : NaN);

/** pH de la mezcla de Va mL de ácido fuerte (Ca mol/L) y Vb mL de base fuerte (Cb mol/L), ambos monopróticos. */
export function phMezcla(Ca: number, Va: number, Cb: number, Vb: number): number {
  const nH = (Ca * Va) / 1000;
  const nOH = (Cb * Vb) / 1000;
  const V = (Va + Vb) / 1000;
  if (!(V > 0)) return NaN;
  const dif = nH - nOH;
  if (Math.abs(dif) < 1e-12) return 7;
  return dif > 0 ? -Math.log10(dif / V) : 14 + Math.log10(-dif / V);
}
/** Volumen (mL) de base necesario para neutralizar el ácido. */
export const volumenEquivalencia = (Ca: number, Va: number, Cb: number): number => (Cb > 0 ? (Ca * Va) / Cb : NaN);

export type TipoReaccion = "síntesis" | "descomposición" | "sustitución simple" | "doble sustitución" | "combustión" | "neutralización";
const esElemento = (f: string): boolean => {
  const p = parseFormula(f);
  return !!p && Object.keys(p).length === 1;
};
/** Clasificación sencilla de una reacción a partir de las fórmulas de reactivos y productos. */
export function clasificarReaccion(reactivos: readonly string[], productos: readonly string[]): TipoReaccion | null {
  if (reactivos.length === 0 || productos.length === 0) return null;
  const tiene = (l: readonly string[], f: string) => l.includes(f);
  const contieneC = (f: string) => !!parseFormula(f)?.C && !!parseFormula(f)?.H;
  if (tiene(reactivos, "O2") && reactivos.some(contieneC) && tiene(productos, "CO2") && tiene(productos, "H2O")) return "combustión";
  const hidroxido = (f: string) => /OH\)?\d*$/.test(f);
  if (reactivos.length === 2 && reactivos.some(hidroxido) && reactivos.some((f) => /^H[A-Z0-9]/.test(f) && !hidroxido(f)) && productos.includes("H2O")) return "neutralización";
  if (productos.length === 1 && reactivos.length >= 2) return "síntesis";
  if (reactivos.length === 1 && productos.length >= 2) return "descomposición";
  if (reactivos.length === 2 && productos.length === 2) {
    const nEl = reactivos.filter(esElemento).length;
    if (nEl === 1 && productos.filter(esElemento).length === 1) return "sustitución simple";
    if (nEl === 0) return "doble sustitución";
  }
  return null;
}
export const EJEMPLOS_TIPOS: { r: string[]; p: string[]; texto: string }[] = [
  { r: ["Fe", "S"], p: ["FeS"], texto: "Fe + S → FeS" },
  { r: ["CaCO3"], p: ["CaO", "CO2"], texto: "CaCO₃ → CaO + CO₂" },
  { r: ["Zn", "HCl"], p: ["ZnCl2", "H2"], texto: "Zn + 2 HCl → ZnCl₂ + H₂" },
  { r: ["AgNO3", "NaCl"], p: ["AgCl", "NaNO3"], texto: "AgNO₃ + NaCl → AgCl + NaNO₃" },
  { r: ["CH4", "O2"], p: ["CO2", "H2O"], texto: "CH₄ + 2 O₂ → CO₂ + 2 H₂O" },
  { r: ["HCl", "NaOH"], p: ["NaCl", "H2O"], texto: "HCl + NaOH → NaCl + H₂O" },
];

/** Serie de actividad (de más a menos reductor). */
export const SERIE_ACTIVIDAD = ["Li", "K", "Ca", "Na", "Mg", "Al", "Zn", "Fe", "Ni", "Sn", "Pb", "H", "Cu", "Ag", "Au"] as const;
export const CARGA_METAL: Record<string, number> = { Li: 1, K: 1, Ca: 2, Na: 1, Mg: 2, Al: 3, Zn: 2, Fe: 2, Ni: 2, Sn: 2, Pb: 2, Cu: 2, Ag: 1, Au: 3 };
/** Un metal desplaza a otro de su disolución si está más arriba en la serie de actividad. */
export function reaccionaDesplazamiento(metal: string, cation: string): boolean {
  const a = SERIE_ACTIVIDAD.indexOf(metal as (typeof SERIE_ACTIVIDAD)[number]);
  const b = SERIE_ACTIVIDAD.indexOf(cation as (typeof SERIE_ACTIVIDAD)[number]);
  return a >= 0 && b >= 0 && a < b;
}
const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));
/** Electrones intercambiados en una reacción redox entre un metal que se oxida (carga p) y un catión que se reduce (carga q). */
export function electronesIntercambiados(p: number, q: number): number {
  if (!(p > 0) || !(q > 0)) return NaN;
  return (p * q) / mcd(p, q);
}

/* ───────────── 1. Mol, masa molar y volumen de un gas ───────────── */

const SUSTANCIAS_MOL = ["H2O", "CO2", "NH3", "CH4", "O2", "NaCl", "H2SO4", "CaCO3"] as const;
const GASES = new Set(["CO2", "NH3", "CH4", "O2"]);

export function MolGasesFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.n, 1, 0, SUSTANCIAS_MOL.length - 1)), m: num(block.params?.a, 44, 1, 500), T: Math.round(num(block.params?.b, 273, 250, 400)), P: num(block.params?.c, 1, 0.5, 3) };
  const [st, setSt] = useState(init);
  const f = SUSTANCIAS_MOL[st.s]!;
  const M = masaMolar(f);
  const n = moles(st.m, M);
  const gas = GASES.has(f);
  return (
    <Frame
      stacked
      hint={block.hint ?? "n = m / M. Un mol contiene 6,022·10²³ partículas y, si es un gas en condiciones normales, ocupa 22,4 L."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Choice label="Sustancia" items={SUSTANCIAS_MOL.map((x, k) => ({ value: String(k), label: bonita(x) }))} value={String(st.s)} onChange={(k) => setSt((o) => ({ ...o, s: Number(k) }))} />
          <Slider label="Masa de la muestra" value={st.m} min={1} max={500} step={1} unit=" g" color={MANIM.orange} onChange={(m) => setSt((o) => ({ ...o, m }))} />
          {gas && <Slider label="Temperatura" value={st.T} min={250} max={400} step={1} unit=" K" color={MANIM.red} onChange={(T) => setSt((o) => ({ ...o, T }))} />}
          {gas && <Slider label="Presión" value={st.P} min={0.5} max={3} step={0.1} unit=" atm" color={MANIM.blue} format={f1} onChange={(P) => setSt((o) => ({ ...o, P }))} />}
        </>
      }
    >
      <Svg w={520} h={80} testId="mol-gases" maxH={100}>
        <text x={260} y={36} textAnchor="middle" fill={MANIM.ink} fontSize={15}>{`n = ${f1(st.m)} g / ${f1(M)} g/mol`}</text>
        <text x={260} y={66} textAnchor="middle" fill={MANIM.green} fontSize={22} fontWeight={700}>{`${f2(n)} mol`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label={`Masa molar de ${bonita(f)}`}>{`${f1(M)} g/mol`}</Stat>
        <Stat color={MANIM.green} label="Cantidad de sustancia">{`${f2(n)} mol`}</Stat>
        <Stat color={MANIM.orange} label="Moléculas o unidades fórmula">{`${fmtEs(particulas(n) / 1e23, 2)} · 10²³`}</Stat>
        <Stat color={MANIM.blue} label={gas ? "Volumen del gas (a la T y P elegidas)" : "Volumen en CN (si fuera gas)"}>{gas ? `${f1(volumenGas(n, st.T, st.P))} L · en CN: ${f1(volumenCN(n))} L` : "no es un gas: no se aplica"}</Stat>
      </Readout>
      <Note>El <b>mol</b> es la unidad de cantidad de sustancia: 1 mol contiene el <b>número de Avogadro</b>, 6,022·10²³, de partículas. La <b>masa molar</b> M (g/mol) coincide con la masa molecular en u. <b>n = m / M</b>. Para un <b>gas ideal</b>: <b>P·V = n·R·T</b>, con R = 0,082 atm·L/(mol·K). En <b>condiciones normales</b> (0 °C = 273 K y 1 atm), <b>1 mol</b> de cualquier gas ocupa <b>22,4 L</b> (volumen molar). Masas atómicas redondeadas.</Note>
    </Frame>
  );
}

/* ───────────── 2. Estequiometría ───────────── */

export function EstequiometriaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 4, 0, REACCIONES.length - 1)), m: num(block.params?.a, 50, 1, 200) };
  const [s, setS] = useState(init);
  const r = REACCIONES[s.r]!;
  const res = estequiometria(r, 0, s.m);
  const nr = r.reactivos.length;
  const maxM = Math.max(...res.map((x) => x.masa), 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pasa a moles, aplica la proporción de los coeficientes y vuelve a gramos o litros."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.r)} onChange={(k) => setS((o) => ({ ...o, r: Number(k) }))} />
          <Slider label={`Masa de ${bonita(r.reactivos[0]!.f)}`} value={s.m} min={1} max={200} step={1} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="estequiometria-fq4" maxH={205}>
        <text x={260} y={18} textAnchor="middle" fill={MANIM.yellow} fontSize={14} fontWeight={700}>{ecuacionTexto(r)}</text>
        <Seg a={[30, 150]} b={[490, 150]} color={MANIM.ink} width={2} />
        {res.map((x, i) => {
          const bw = 56;
          const h = (x.masa / maxM) * 95;
          const xx = 260 - (res.length * (bw + 14)) / 2 + i * (bw + 14);
          return (
            <g key={`${x.f}${i}`}>
              <rect x={xx} y={150 - h} width={bw} height={h} fill={i < nr ? MANIM.orange : MANIM.green} fillOpacity={0.85} />
              <text x={xx + bw / 2} y={144 - h} textAnchor="middle" fill={MANIM.ink} fontSize={11}>{`${f1(x.masa)} g`}</text>
              <text x={xx + bw / 2} y={168} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{bonita(x.f)}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        {res.map((x, i) => (
          <Stat key={`${x.f}${i}`} color={i < nr ? MANIM.orange : MANIM.green} label={`${i < nr ? "Reactivo" : "Producto"} ${bonita(x.f)}`}>{`${f2(x.moles)} mol · ${f1(x.masa)} g${x.volumenCN !== null ? ` · ${f1(x.volumenCN)} L (CN)` : ""}`}</Stat>
        ))}
      </Readout>
      <Note>Los coeficientes de una ecuación <b>ajustada</b> dan la proporción en <b>moles</b> (y, en gases a igual P y T, en <b>volumen</b>). Método: <b>1)</b> pasar la masa conocida a moles (n = m/M); <b>2)</b> usar los coeficientes para hallar los moles de la sustancia buscada; <b>3)</b> pasar a masa (m = n·M) o a volumen del gas (V = n·22,4 L en CN). Aquí se supone que el reactivo 1 se consume por completo y que el otro está en exceso. Masas atómicas redondeadas (H 1, C 12, O 16, Mg 24, Cl 35,5, Ca 40, Zn 65,4).</Note>
    </Frame>
  );
}

/* ───────────── 3. Reactivo limitante y rendimiento ───────────── */

export function ReactivoLimitanteFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 1, 0, REACCIONES.length - 1)), a: num(block.params?.a, 10, 1, 100), b: num(block.params?.b, 10, 1, 100), rend: Math.round(num(block.params?.c, 100, 10, 100)) };
  const [s, setS] = useState(init);
  const r = REACCIONES[s.r]!;
  const res = reactivoLimitante(r, [s.a, s.b]);
  const maxA = Math.max(...res.avances.map((x) => x), 1e-9);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El reactivo limitante es el que se agota primero: determina cuánto producto se puede formar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.r)} onChange={(k) => setS((o) => ({ ...o, r: Number(k) }))} />
          <Slider label={`Masa de ${bonita(r.reactivos[0]!.f)}`} value={s.a} min={1} max={100} step={1} unit=" g" color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label={`Masa de ${bonita(r.reactivos[1]!.f)}`} value={s.b} min={1} max={100} step={1} unit=" g" color={MANIM.blue} onChange={(b) => setS((o) => ({ ...o, b }))} />
          <Slider label="Rendimiento de la reacción" value={s.rend} min={10} max={100} step={5} unit=" %" color={MANIM.green} onChange={(rend) => setS((o) => ({ ...o, rend }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="reactivo-limitante" maxH={150}>
        {r.reactivos.map((e, i) => {
          const w = (res.avances[i]! / maxA) * 300;
          const lim = i === res.limitante;
          return (
            <g key={e.f}>
              <text x={120} y={44 + i * 44} textAnchor="end" fill={lim ? MANIM.ink : MANIM.muted} fontSize={13} fontWeight={lim ? 700 : 400}>{bonita(e.f)}</text>
              <rect x={130} y={28 + i * 44} width={Math.max(2, w)} height={22} fill={lim ? MANIM.red : MANIM.blue} fillOpacity={0.85} />
              <text x={136 + w} y={44 + i * 44} fill={MANIM.ink} fontSize={11}>{`${fmtEs(res.avances[i]!, 3)} mol de reacción${lim ? " (limitante)" : ""}`}</text>
            </g>
          );
        })}
        <text x={130} y={122} fill={MANIM.muted} fontSize={11}>moles disponibles / coeficiente: el menor es el limitante</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Reactivo limitante">{bonita(r.reactivos[res.limitante]!.f)}</Stat>
        <Stat color={MANIM.blue} label="Exceso del otro reactivo">{`${f1(res.exceso[1 - res.limitante]!)} g de ${bonita(r.reactivos[1 - res.limitante]!.f)}`}</Stat>
        {res.productos.map((p) => (
          <Stat key={p.f} color={MANIM.green} label={`${bonita(p.f)}: teórico → real (${s.rend} %)`}>{`${f1(p.masa)} g → ${f1((p.masa * s.rend) / 100)} g`}</Stat>
        ))}
      </Readout>
      <Note>Cuando los reactivos no están en proporción estequiométrica, uno se agota antes: es el <b>reactivo limitante</b>. Se identifica dividiendo los <b>moles</b> de cada reactivo entre su <b>coeficiente</b>: el cociente menor corresponde al limitante. La cantidad de producto depende <b>solo</b> de él. El otro reactivo queda en <b>exceso</b>. La cantidad máxima de producto es el <b>rendimiento teórico</b>; el <b>rendimiento real</b> suele ser menor (pérdidas, reacciones secundarias, reacción incompleta): <b>rendimiento (%) = real / teórico · 100</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Tipos de reacciones ───────────── */

export function TiposReaccionFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, EJEMPLOS_TIPOS.length - 1));
  const [i, setI] = useState(init);
  const ej = EJEMPLOS_TIPOS[i]!;
  const tipo = clasificarReaccion(ej.r, ej.p);
  const DESC: Record<TipoReaccion, string> = {
    síntesis: "Dos o más sustancias se combinan para formar una sola.",
    descomposición: "Una sustancia se rompe en dos o más más simples.",
    "sustitución simple": "Un elemento desplaza a otro de su compuesto.",
    "doble sustitución": "Dos compuestos intercambian sus iones (a menudo se forma un precipitado).",
    combustión: "Una sustancia (combustible) reacciona con O₂ y desprende luz y calor; si es orgánica, se forman CO₂ y H₂O.",
    neutralización: "Un ácido y una base reaccionan y forman una sal y agua.",
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Fíjate en cuántas sustancias hay en cada lado y si algún reactivo es un elemento."}
      onReset={() => setI(init)}
      controls={<Choice label="Ejemplo" items={EJEMPLOS_TIPOS.map((x, k) => ({ value: String(k), label: x.texto.split(" → ")[0]! }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={90} testId="tipos-reaccion" maxH={110}>
        <text x={260} y={40} textAnchor="middle" fill={MANIM.yellow} fontSize={22} fontWeight={700}>{ej.texto}</text>
        <text x={260} y={72} textAnchor="middle" fill={MANIM.green} fontSize={16} fontWeight={700}>{tipo ?? "sin clasificar"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tipo de reacción">{tipo ?? "—"}</Stat>
        <Stat color={MANIM.blue} label="Descripción">{tipo ? DESC[tipo] : "—"}</Stat>
      </Readout>
      <Note>Según el <b>tipo de transformación</b>: <b>síntesis</b> (A + B → AB), <b>descomposición</b> (AB → A + B), <b>sustitución simple</b> (A + BC → AC + B), <b>doble sustitución</b> (AB + CD → AD + CB) y reacciones especiales: la <b>combustión</b> (con O₂, muy exotérmica) y la <b>neutralización</b> (ácido + base → sal + agua). Las reacciones de <b>precipitación</b> son una doble sustitución en la que se forma un sólido insoluble. La clasificación es un <b>esquema</b>: algunas reacciones encajan en varios tipos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Neutralización ───────────── */

export function NeutralizacionFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { Ca: num(block.params?.a, 0.1, 0.05, 0.5), Va: Math.round(num(block.params?.b, 25, 10, 50)), Cb: 0.1, Vb: Math.round(num(block.params?.c, 10, 0, 100)) };
  const [s, setS] = useState(init);
  const ph = phMezcla(s.Ca, s.Va, s.Cb, s.Vb);
  const veq = volumenEquivalencia(s.Ca, s.Va, s.Cb);
  const X = (v: number): number => 50 + (v / 100) * 420;
  const Y = (p: number): number => 150 - (Math.max(0, Math.min(14, p)) / 14) * 125;
  const pts = Array.from({ length: 101 }, (_, k) => `${X(k)},${Y(phMezcla(s.Ca, s.Va, s.Cb, k))}`).join(" ");
  const color = Number.isNaN(ph) ? MANIM.muted : ph < 6.95 ? MANIM.red : ph > 7.05 ? MANIM.blue : MANIM.green;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En el punto de equivalencia los moles de H⁺ y de OH⁻ son iguales y el pH es 7."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Concentración del ácido (HCl)" value={s.Ca} min={0.05} max={0.5} step={0.05} unit=" mol/L" color={MANIM.red} format={f2} onChange={(Ca) => setS((o) => ({ ...o, Ca }))} />
          <Slider label="Volumen de ácido" value={s.Va} min={10} max={50} step={5} unit=" mL" color={MANIM.red} onChange={(Va) => setS((o) => ({ ...o, Va }))} />
          <Slider label="Volumen de base añadido (NaOH 0,1 mol/L)" value={s.Vb} min={0} max={100} step={1} unit=" mL" color={MANIM.blue} onChange={(Vb) => setS((o) => ({ ...o, Vb }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="neutralizacion" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[50, Y(7)]} b={[480, Y(7)]} color={MANIM.muted} width={1} dashed />
        <polyline points={pts} fill="none" stroke={MANIM.purple} strokeWidth={3} />
        <Seg a={[X(Math.min(100, veq)), 150]} b={[X(Math.min(100, veq)), 15]} color={MANIM.green} width={1.5} dashed />
        <Dot p={[X(s.Vb), Y(ph)]} r={6} color={color} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>V de base (mL)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>pH</text>
        <text x={56} y={Y(7) - 4} fill={MANIM.muted} fontSize={10}>7</text>
      </Svg>
      <Readout>
        <Stat color={color} label="pH de la mezcla">{f2(ph)}</Stat>
        <Stat color={MANIM.green} label="Volumen de equivalencia">{`${f1(veq)} mL de NaOH`}</Stat>
        <Stat color={MANIM.purple} label="Estado">{Math.abs(s.Vb - veq) < 0.5 ? "neutralización completa (pH ≈ 7)" : s.Vb < veq ? "queda ácido en exceso" : "queda base en exceso"}</Stat>
      </Readout>
      <Note>Según <b>Arrhenius</b>, un <b>ácido</b> libera H⁺ en agua y una <b>base</b> libera OH⁻. La <b>neutralización</b> es H⁺ + OH⁻ → H₂O: HCl + NaOH → NaCl + H₂O. El <b>pH</b> = −log[H⁺]. En una <b>valoración</b> se añade base de concentración conocida al ácido hasta el <b>punto de equivalencia</b> (moles de OH⁻ = moles de H⁺), donde el pH vale 7 (ácido y base fuertes): <b>Cₐ·Vₐ = C_b·V_b</b>. El pH cambia <b>bruscamente</b> cerca de ese punto. Se supone ácido y base <b>fuertes</b> y monopróticos, y volúmenes aditivos.</Note>
    </Frame>
  );
}

/* ───────────── 6. Oxidación-reducción ───────────── */

export function RedoxFq4Explorador({ block }: { block: ToolBlock }) {
  const metales = ["Mg", "Zn", "Fe", "Cu", "Ag"];
  const cationes = ["Zn", "Fe", "Cu", "Ag"];
  const init = { m: Math.round(num(block.params?.a, 1, 0, metales.length - 1)), c: Math.round(num(block.params?.b, 2, 0, cationes.length - 1)) };
  const [s, setS] = useState(init);
  const metal = metales[s.m]!;
  const cat = cationes[s.c]!;
  const reacciona = reaccionaDesplazamiento(metal, cat);
  const p = CARGA_METAL[metal]!;
  const q = CARGA_METAL[cat]!;
  const ne = electronesIntercambiados(p, q);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Oxidación: pérdida de electrones (sube el nº de oxidación). Reducción: ganancia (baja)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal sólido" items={metales.map((x, k) => ({ value: String(k), label: x }))} value={String(s.m)} onChange={(k) => setS((o) => ({ ...o, m: Number(k) }))} />
          <Choice label="Catión en disolución" items={cationes.map((x, k) => ({ value: String(k), label: ion(x, CARGA_METAL[x]!) }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="redox" maxH={130}>
        <text x={260} y={34} textAnchor="middle" fill={reacciona ? MANIM.green : MANIM.red} fontSize={18} fontWeight={700}>{reacciona ? "Sí hay reacción" : "No hay reacción"}</text>
        <text x={260} y={66} textAnchor="middle" fill={MANIM.ink} fontSize={14}>{`${ne / p > 1 ? ne / p : ""}${metal}(s) + ${ne / q > 1 ? ne / q : ""}${ion(cat, q)}(aq) ${reacciona ? "→" : "↛"} ${ne / p > 1 ? ne / p : ""}${ion(metal, p)}(aq) + ${ne / q > 1 ? ne / q : ""}${cat}(s)`}</text>
        <text x={260} y={92} textAnchor="middle" fill={MANIM.muted} fontSize={12}>{reacciona ? `${metal} se oxida (0 → +${p}) y el ${cat} se reduce (+${q} → 0)` : `${metal} está por debajo de ${cat} en la serie de actividad`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Se oxida (pierde e⁻)">{reacciona ? `${metal}: 0 → +${p}` : "—"}</Stat>
        <Stat color={MANIM.blue} label="Se reduce (gana e⁻)">{reacciona ? `${cat}: +${q} → 0` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Electrones que se intercambian">{reacciona ? `${ne}` : "—"}</Stat>
      </Readout>
      <Note>Una <b>reacción redox</b> es una transferencia de <b>electrones</b>. La <b>oxidación</b> es la <b>pérdida</b> de electrones (el nº de oxidación <b>aumenta</b>); la <b>reducción</b>, la <b>ganancia</b> (disminuye). El que se oxida es el <b>agente reductor</b> y el que se reduce, el <b>agente oxidante</b>. Siempre ocurren a la vez. Un metal desplaza a otro de su sal si está <b>más arriba</b> en la <b>serie de actividad</b> (Li, K, Ca, Na, Mg, Al, Zn, Fe, Ni, Sn, Pb, H, Cu, Ag, Au): el cinc desplaza al cobre (Zn + Cu²⁺ → Zn²⁺ + Cu), pero el cobre no desplaza al cinc. Es la base de las <b>pilas</b> y de la <b>corrosión</b>. Los coeficientes de la ecuación se ajustan para igualar los electrones.</Note>
    </Frame>
  );
}
