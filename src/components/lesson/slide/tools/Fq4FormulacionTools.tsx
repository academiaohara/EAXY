"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Motor de formulación (se comprueba en los tests) ───────────── */

const SUB = "₀₁₂₃₄₅₆₇₈₉";
export const sub = (n: number): string => String(n).replace(/[0-9]/g, (c) => SUB[Number(c)]!);
const ROMANOS = ["", "I", "II", "III", "IV", "V", "VI", "VII"];
export const romano = (n: number): string => ROMANOS[Math.abs(n)] ?? String(n);
const PREFIJOS = ["", "mono", "di", "tri", "tetra", "penta", "hexa", "hepta", "octa"];
export const prefijo = (n: number): string => PREFIJOS[n] ?? "";
const SUPS = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Ion en texto: símbolo con su carga en superíndice (Fe³⁺, Cl⁻). */
export const ion = (simbolo: string, carga: number): string => `${simbolo}${Math.abs(carga) > 1 ? String(Math.abs(carga)).replace(/[0-9]/g, (c) => SUPS[Number(c)]!) : ""}${carga > 0 ? "⁺" : "⁻"}`;
const mcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : mcd(b, a % b));

export type Metal = { s: string; nombre: string; nox: number[] };
export const METALES: Metal[] = [
  { s: "Li", nombre: "litio", nox: [1] }, { s: "Na", nombre: "sodio", nox: [1] }, { s: "K", nombre: "potasio", nox: [1] }, { s: "Ag", nombre: "plata", nox: [1] },
  { s: "Mg", nombre: "magnesio", nox: [2] }, { s: "Ca", nombre: "calcio", nox: [2] }, { s: "Ba", nombre: "bario", nox: [2] }, { s: "Zn", nombre: "cinc", nox: [2] },
  { s: "Al", nombre: "aluminio", nox: [3] }, { s: "Cu", nombre: "cobre", nox: [1, 2] }, { s: "Fe", nombre: "hierro", nox: [2, 3] }, { s: "Co", nombre: "cobalto", nox: [2, 3] },
  { s: "Ni", nombre: "níquel", nox: [2, 3] }, { s: "Cr", nombre: "cromo", nox: [2, 3] }, { s: "Sn", nombre: "estaño", nox: [2, 4] }, { s: "Pb", nombre: "plomo", nox: [2, 4] },
];
export type NoMetalOxido = { s: string; nombre: string; nox: number[] };
export const NOMETALES_OXIDO: NoMetalOxido[] = [
  { s: "C", nombre: "carbono", nox: [2, 4] }, { s: "N", nombre: "nitrógeno", nox: [1, 2, 3, 4, 5] }, { s: "P", nombre: "fósforo", nox: [3, 5] },
  { s: "S", nombre: "azufre", nox: [2, 4, 6] }, { s: "Cl", nombre: "cloro", nox: [1, 3, 5, 7] },
];
export const ELEMENTOS_OXIDO = [...METALES, ...NOMETALES_OXIDO];

/** Subíndices (átomos del elemento, átomos del otro) simplificados a partir de dos números de oxidación en valor absoluto. */
export function proporcion(a: number, b: number): [number, number] {
  const x = Math.abs(a);
  const y = Math.abs(b);
  if (x === 0 || y === 0) return [NaN, NaN];
  const g = mcd(x, y);
  return [y / g, x / g];
}
const conSub = (s: string, n: number): string => `${s}${n > 1 ? sub(n) : ""}`;
const conParentesis = (f: string, n: number): string => (n > 1 ? `(${f})${sub(n)}` : f);
const stock = (nombre: string, nox: number, varios: boolean): string => `${nombre}${varios ? `(${romano(nox)})` : ""}`;

/** Óxido de un elemento con número de oxidación positivo n: fórmula y nombres. */
export function generarOxido(el: { s: string; nombre: string; nox: number[] }, nox: number) {
  const [nE, nO] = proporcion(nox, 2);
  const formula = `${conSub(el.s, nE)}${conSub("O", nO)}`;
  const anion = nO === 1 ? "monóxido" : `${prefijo(nO)}óxido`;
  const cat = nE > 1 ? `${prefijo(nE)}${el.nombre}` : el.nombre;
  return { formula, sistematica: `${anion} de ${cat}`, stock: `óxido de ${stock(el.nombre, nox, el.nox.length > 1)}`, subE: nE, subO: nO };
}

/** Hidruro metálico MHₙ. */
export function generarHidruroMetalico(el: Metal, nox: number) {
  const formula = `${el.s}${nox > 1 ? `H${sub(nox)}` : "H"}`;
  const pref = nox > 1 ? prefijo(nox) : "";
  return { formula, stock: `hidruro de ${stock(el.nombre, nox, el.nox.length > 1)}`, sistematica: `${pref ? `${pref}hidruro` : "hidruro"} de ${el.nombre}` };
}

export type Anion = { s: string; nombre: string; carga: number; poli: boolean; nombreTrad?: string };
export const ANIONES_BINARIOS: Anion[] = [
  { s: "F", nombre: "fluoruro", carga: 1, poli: false }, { s: "Cl", nombre: "cloruro", carga: 1, poli: false }, { s: "Br", nombre: "bromuro", carga: 1, poli: false }, { s: "I", nombre: "yoduro", carga: 1, poli: false },
  { s: "S", nombre: "sulfuro", carga: 2, poli: false }, { s: "Se", nombre: "seleniuro", carga: 2, poli: false }, { s: "N", nombre: "nitruro", carga: 3, poli: false }, { s: "P", nombre: "fosfuro", carga: 3, poli: false },
];
export const OXOANIONES: Anion[] = [
  { s: "ClO", nombre: "hipoclorito", carga: 1, poli: true }, { s: "ClO₂", nombre: "clorito", carga: 1, poli: true }, { s: "ClO₃", nombre: "clorato", carga: 1, poli: true }, { s: "ClO₄", nombre: "perclorato", carga: 1, poli: true },
  { s: "NO₂", nombre: "nitrito", carga: 1, poli: true }, { s: "NO₃", nombre: "nitrato", carga: 1, poli: true },
  { s: "SO₃", nombre: "sulfito", carga: 2, poli: true }, { s: "SO₄", nombre: "sulfato", carga: 2, poli: true }, { s: "CO₃", nombre: "carbonato", carga: 2, poli: true }, { s: "PO₄", nombre: "fosfato", carga: 3, poli: true },
];

/** Sal formada por un catión metálico de carga `nox` y un anión (monoatómico o poliatómico). */
export function generarSal(el: Metal, nox: number, an: Anion) {
  const [nC, nA] = proporcion(nox, an.carga);
  const formula = `${conSub(el.s, nC)}${an.poli ? conParentesis(an.s, nA) : conSub(an.s, nA)}`;
  const varios = el.nox.length > 1;
  const stockN = `${an.nombre} de ${stock(el.nombre, nox, varios)}`;
  const sist = `${nA > 1 ? prefijo(nA) : ""}${an.nombre} de ${nC > 1 ? prefijo(nC) : ""}${el.nombre}`;
  const sistemática = an.poli ? `${nA > 1 ? (nA === 2 ? "bis" : nA === 3 ? "tris" : "tetrakis") : ""}${nA > 1 ? `(${an.nombre})` : an.nombre} de ${nC > 1 ? prefijo(nC) : ""}${el.nombre}` : sist;
  return { formula, stock: stockN, sistematica: sistemática, subC: nC, subA: nA };
}

/** Hidróxido M(OH)ₙ. */
export function generarHidroxido(el: Metal, nox: number) {
  const formula = `${el.s}${nox > 1 ? `(OH)${sub(nox)}` : "OH"}`;
  const pref = nox > 1 ? prefijo(nox) : "";
  return { formula, stock: `hidróxido de ${stock(el.nombre, nox, el.nox.length > 1)}`, sistematica: `${pref}hidróxido de ${el.nombre}` };
}

export type Oxoacido = { formula: string; el: string; nox: number; tradicional: string; hidrogeno: string };
export const OXOACIDOS: Oxoacido[] = [
  { formula: "HClO", el: "Cl", nox: 1, tradicional: "ácido hipocloroso", hidrogeno: "oxoclorato(I) de hidrógeno" },
  { formula: "HClO₂", el: "Cl", nox: 3, tradicional: "ácido cloroso", hidrogeno: "dioxoclorato(III) de hidrógeno" },
  { formula: "HClO₃", el: "Cl", nox: 5, tradicional: "ácido clórico", hidrogeno: "trioxoclorato(V) de hidrógeno" },
  { formula: "HClO₄", el: "Cl", nox: 7, tradicional: "ácido perclórico", hidrogeno: "tetraoxoclorato(VII) de hidrógeno" },
  { formula: "H₂SO₃", el: "S", nox: 4, tradicional: "ácido sulfuroso", hidrogeno: "trioxosulfato(IV) de dihidrógeno" },
  { formula: "H₂SO₄", el: "S", nox: 6, tradicional: "ácido sulfúrico", hidrogeno: "tetraoxosulfato(VI) de dihidrógeno" },
  { formula: "HNO₂", el: "N", nox: 3, tradicional: "ácido nitroso", hidrogeno: "dioxonitrato(III) de hidrógeno" },
  { formula: "HNO₃", el: "N", nox: 5, tradicional: "ácido nítrico", hidrogeno: "trioxonitrato(V) de hidrógeno" },
  { formula: "H₂CO₃", el: "C", nox: 4, tradicional: "ácido carbónico", hidrogeno: "trioxocarbonato(IV) de dihidrógeno" },
  { formula: "H₃PO₄", el: "P", nox: 5, tradicional: "ácido fosfórico", hidrogeno: "tetraoxofosfato(V) de trihidrógeno" },
];
/** Hidruros y ácidos hidrácidos habituales: fórmula, tipo y nombres. */
export const HIDRUROS_NO_METALICOS = [
  { formula: "NH₃", tipo: "hidruro no metálico", sistematico: "trihidruro de nitrógeno", comun: "amoniaco (azano)" },
  { formula: "PH₃", tipo: "hidruro no metálico", sistematico: "trihidruro de fósforo", comun: "fosfano" },
  { formula: "CH₄", tipo: "hidruro no metálico", sistematico: "tetrahidruro de carbono", comun: "metano" },
  { formula: "SiH₄", tipo: "hidruro no metálico", sistematico: "tetrahidruro de silicio", comun: "silano" },
  { formula: "BH₃", tipo: "hidruro no metálico", sistematico: "trihidruro de boro", comun: "borano" },
  { formula: "H₂O", tipo: "hidruro no metálico", sistematico: "óxido de dihidrógeno", comun: "agua" },
  { formula: "HF", tipo: "hidrácido", sistematico: "fluoruro de hidrógeno", comun: "en disolución acuosa: ácido fluorhídrico" },
  { formula: "HCl", tipo: "hidrácido", sistematico: "cloruro de hidrógeno", comun: "en disolución acuosa: ácido clorhídrico" },
  { formula: "HBr", tipo: "hidrácido", sistematico: "bromuro de hidrógeno", comun: "en disolución acuosa: ácido bromhídrico" },
  { formula: "HI", tipo: "hidrácido", sistematico: "yoduro de hidrógeno", comun: "en disolución acuosa: ácido yodhídrico" },
  { formula: "H₂S", tipo: "hidrácido", sistematico: "sulfuro de dihidrógeno", comun: "en disolución acuosa: ácido sulfhídrico" },
  { formula: "H₂Se", tipo: "hidrácido", sistematico: "seleniuro de dihidrógeno", comun: "en disolución acuosa: ácido selenhídrico" },
] as const;

/** Número de oxidación de la incógnita en un compuesto (H +1, O −2, alcalinos +1, alcalinotérreos +2, Al +3, F −1). */
export function parseFormula(f: string): Record<string, number> | null {
  const pila: Record<string, number>[] = [{}];
  let i = 0;
  const leerNum = (): number => {
    let j = i;
    while (j < f.length && /[0-9]/.test(f[j]!)) j++;
    const n = j > i ? Number(f.slice(i, j)) : 1;
    i = j;
    return n;
  };
  while (i < f.length) {
    const c = f[i]!;
    if (c === "(") { pila.push({}); i++; }
    else if (c === ")") {
      i++;
      const n = leerNum();
      const top = pila.pop();
      if (!top || pila.length === 0) return null;
      for (const [k, v] of Object.entries(top)) pila[pila.length - 1]![k] = (pila[pila.length - 1]![k] ?? 0) + v * n;
    } else if (/[A-Z]/.test(c)) {
      let s = c;
      i++;
      if (i < f.length && /[a-z]/.test(f[i]!)) { s += f[i]!; i++; }
      const n = leerNum();
      pila[pila.length - 1]![s] = (pila[pila.length - 1]![s] ?? 0) + n;
    } else return null;
  }
  return pila.length === 1 ? pila[0]! : null;
}
const NOX_FIJO: Record<string, number> = { H: 1, O: -2, Li: 1, Na: 1, K: 1, Ag: 1, Mg: 2, Ca: 2, Ba: 2, Zn: 2, Al: 3, F: -1 };
export function incognitaNox(f: string): { elemento: string; nox: number; ecuacion: string } | null {
  const c = parseFormula(f);
  if (!c) return null;
  const incog = Object.keys(c).filter((e) => !(e in NOX_FIJO));
  if (incog.length !== 1) return null;
  const x = incog[0]!;
  const conocida = Object.entries(c).filter(([e]) => e in NOX_FIJO).reduce((s, [e, n]) => s + NOX_FIJO[e]! * n, 0);
  const nox = -conocida / c[x]!;
  const terms = Object.entries(c).map(([e, n]) => (e === x ? (n > 1 ? `${n}·x` : "x") : `${n}·(${NOX_FIJO[e]! > 0 ? "+" : ""}${NOX_FIJO[e]})`));
  return { elemento: x, nox, ecuacion: `${terms.join(" + ")} = 0` };
}
export const COMPUESTOS_NOX = ["H2SO4", "HNO3", "KMnO4", "Fe2O3", "CO2", "NH3", "SO2", "K2Cr2O7", "CaCO3", "NaClO", "H3PO4", "Al2(SO4)3"] as const;
const bonita = (f: string): string => f.replace(/[0-9]/g, (d) => SUB[Number(d)]!);

/* ───────────── Herramientas ───────────── */

function Lista({ items }: { items: { etiqueta: string; valor: string; color: string }[] }) {
  return (
    <Readout>
      {items.map((x) => <Stat key={x.etiqueta} color={x.color} label={x.etiqueta}>{x.valor}</Stat>)}
    </Readout>
  );
}
function Formula({ f, sub: s, id }: { f: string; sub?: string; id: string }) {
  return (
    <Svg w={520} h={90} testId={id} maxH={110}>
      <text x={260} y={48} textAnchor="middle" fill={MANIM.yellow} fontSize={34} fontWeight={700}>{f}</text>
      {s && <text x={260} y={78} textAnchor="middle" fill={MANIM.muted} fontSize={13}>{s}</text>}
    </Svg>
  );
}

/* 1. Números de oxidación */
export function OxidacionFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, COMPUESTOS_NOX.length - 1));
  const [i, setI] = useState(init);
  const f = COMPUESTOS_NOX[i]!;
  const r = incognitaNox(f);
  return (
    <Frame
      stacked
      hint={block.hint ?? "En un compuesto neutro, la suma de los números de oxidación de todos los átomos es cero."}
      onReset={() => setI(init)}
      controls={<Choice label="Compuesto" items={COMPUESTOS_NOX.map((x, k) => ({ value: String(k), label: bonita(x) }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Formula f={bonita(f)} sub={r ? `ecuación de neutralidad: ${r.ecuacion}` : undefined} id="oxidacion" />
      <Lista items={r ? [
        { etiqueta: "Elemento desconocido", valor: r.elemento, color: MANIM.blue },
        { etiqueta: "Número de oxidación", valor: `${r.nox > 0 ? "+" : ""}${r.nox}`, color: MANIM.orange },
      ] : [{ etiqueta: "Resultado", valor: "no se puede calcular", color: MANIM.red }]} />
      <Note>El <b>número de oxidación</b> es la carga que tendría un átomo si todos los enlaces fueran iónicos. Reglas: los <b>elementos libres</b> valen 0; el <b>oxígeno</b> −2 (salvo en peróxidos); el <b>hidrógeno</b> +1 (−1 en hidruros metálicos); los <b>alcalinos</b> +1, los <b>alcalinotérreos</b> +2, el aluminio +3 y el flúor −1. La <b>suma</b> de todos los números de oxidación de un compuesto neutro es <b>0</b> (en un ion, su carga). Así se calcula el de la incógnita: H₂SO₄ → 2·(+1) + x + 4·(−2) = 0 → x = +6.</Note>
    </Frame>
  );
}

/* 2. Óxidos */
export function OxidosFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 10, 0, ELEMENTOS_OXIDO.length - 1)), k: Math.round(num(block.params?.a, 1, 0, 6)) };
  const [s, setS] = useState(init);
  const el = ELEMENTOS_OXIDO[s.e]!;
  const nox = el.nox[Math.min(s.k, el.nox.length - 1)]!;
  const o = generarOxido(el, nox);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Óxido: el elemento con O²⁻. Se intercambian los números de oxidación y se simplifica."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Elemento" items={ELEMENTOS_OXIDO.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.e)} onChange={(k) => setS({ e: Number(k), k: 0 })} />
          <Choice label="Número de oxidación" items={el.nox.map((x, k) => ({ value: String(k), label: `+${x}` }))} value={String(Math.min(s.k, el.nox.length - 1))} onChange={(k) => setS((o2) => ({ ...o2, k: Number(k) }))} />
        </>
      }
    >
      <Formula f={o.formula} sub={`${el.s} (+${nox}) y O (−2)`} id="oxidos" />
      <Lista items={[
        { etiqueta: "Nomenclatura sistemática", valor: o.sistematica, color: MANIM.green },
        { etiqueta: "Nomenclatura de Stock", valor: o.stock, color: MANIM.blue },
      ]} />
      <Note>Un <b>óxido</b> es un compuesto binario de un elemento con <b>oxígeno</b> (nº de oxidación −2). Se escribe el elemento y el O, y se <b>intercambian</b> los números de oxidación como subíndices, <b>simplificando</b> si se puede (Fe³⁺ + O²⁻ → Fe₂O₃). <b>Sistemática</b>: prefijos griegos (mono-, di-, tri-, tetra-, penta-, hexa-, hepta-) para cada elemento: <i>trióxido de dihierro</i>. <b>Stock</b>: se indica entre paréntesis y en <b>números romanos</b> el nº de oxidación solo si el elemento tiene <b>más de uno</b>: <i>óxido de hierro(III)</i>; el CaO es simplemente <i>óxido de calcio</i>.</Note>
    </Frame>
  );
}

/* 3. Hidruros e hidrácidos */
export function HidurosFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 7, 0, HIDRUROS_NO_METALICOS.length + METALES.length - 1));
  const [i, setI] = useState(init);
  const metalesHidruro = [METALES[1]!, METALES[5]!, METALES[8]!, METALES[10]!];
  const items = [
    ...metalesHidruro.map((m) => ({ etiqueta: `Hidruro de ${m.nombre}`, nox: m.nox[m.nox.length - 1]!, m })),
  ];
  const total = HIDRUROS_NO_METALICOS.length + items.length;
  const idx = Math.min(i, total - 1);
  const esMetal = idx >= HIDRUROS_NO_METALICOS.length;
  const h = esMetal ? generarHidruroMetalico(items[idx - HIDRUROS_NO_METALICOS.length]!.m, items[idx - HIDRUROS_NO_METALICOS.length]!.nox) : null;
  const n = !esMetal ? HIDRUROS_NO_METALICOS[idx]! : null;
  const etiquetas = [...HIDRUROS_NO_METALICOS.map((x) => x.formula), ...items.map((x) => generarHidruroMetalico(x.m, x.nox).formula)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El hidrógeno es −1 en los hidruros metálicos y +1 en los no metálicos y los hidrácidos."}
      onReset={() => setI(init)}
      controls={<Choice label="Compuesto" items={etiquetas.map((x, k) => ({ value: String(k), label: x }))} value={String(idx)} onChange={(k) => setI(Number(k))} />}
    >
      <Formula f={esMetal ? h!.formula : n!.formula} sub={esMetal ? "hidruro metálico (H −1)" : n!.tipo} id="hidruros" />
      <Lista items={esMetal ? [
        { etiqueta: "Nomenclatura de Stock", valor: h!.stock, color: MANIM.blue },
        { etiqueta: "Nomenclatura sistemática", valor: h!.sistematica, color: MANIM.green },
      ] : [
        { etiqueta: "Nomenclatura sistemática", valor: n!.sistematico, color: MANIM.green },
        { etiqueta: "Nombre común / en disolución", valor: n!.comun, color: MANIM.orange },
      ]} />
      <Note>Los <b>hidruros metálicos</b> son combinaciones del hidrógeno (nº de oxidación <b>−1</b>) con un metal: NaH, <i>hidruro de sodio</i>; FeH₃, <i>hidruro de hierro(III)</i> o <i>trihidruro de hierro</i>. Los <b>hidruros no metálicos</b> (hidrógeno +1) tienen nombres comunes admitidos: <b>agua</b>, <b>amoniaco</b>, <b>metano</b>, <b>silano</b>, <b>fosfano</b>… Los <b>hidrácidos</b> son compuestos de H con halógenos y anfígenos (F, Cl, Br, I, S, Se): se nombran como <i>cloruro de hidrógeno</i>, y <b>disueltos en agua</b> actúan como ácidos (<i>ácido clorhídrico</i>).</Note>
    </Frame>
  );
}

/* 4. Sales binarias */
export function SalesBinariasFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 10, 0, METALES.length - 1)), k: Math.round(num(block.params?.b, 1, 0, 3)), a: Math.round(num(block.params?.n, 1, 0, ANIONES_BINARIOS.length - 1)) };
  const [s, setS] = useState(init);
  const m = METALES[s.m]!;
  const nox = m.nox[Math.min(s.k, m.nox.length - 1)]!;
  const an = ANIONES_BINARIOS[s.a]!;
  const r = generarSal(m, nox, an);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sal binaria: un metal y un no metal con su número de oxidación negativo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal" items={METALES.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.m)} onChange={(k) => setS((o) => ({ ...o, m: Number(k), k: 0 }))} />
          <Choice label="Número de oxidación del metal" items={m.nox.map((x, k) => ({ value: String(k), label: `+${x}` }))} value={String(Math.min(s.k, m.nox.length - 1))} onChange={(k) => setS((o) => ({ ...o, k: Number(k) }))} />
          <Choice label="No metal (anión)" items={ANIONES_BINARIOS.map((x, k) => ({ value: String(k), label: ion(x.s, -x.carga) }))} value={String(s.a)} onChange={(k) => setS((o) => ({ ...o, a: Number(k) }))} />
        </>
      }
    >
      <Formula f={r.formula} sub={`${ion(m.s, nox)} y ${ion(an.s, -an.carga)}`} id="sales-binarias" />
      <Lista items={[
        { etiqueta: "Nomenclatura de Stock", valor: r.stock, color: MANIM.blue },
        { etiqueta: "Nomenclatura sistemática", valor: r.sistematica, color: MANIM.green },
      ]} />
      <Note>Una <b>sal binaria</b> combina un <b>metal</b> (nº de oxidación positivo) con un <b>no metal</b> (negativo: halógenos −1, S y Se −2, N y P −3). Se escribe primero el metal y se intercambian los números de oxidación (Fe³⁺ y Cl⁻ → FeCl₃). Se nombra con la terminación <b>-uro</b>: <b>Stock</b>: <i>cloruro de hierro(III)</i>; <b>sistemática</b>: <i>tricloruro de hierro</i>. El prefijo <i>mono-</i> del metal no se escribe. Si el metal tiene un solo nº de oxidación, no se indica en Stock (<i>cloruro de sodio</i>).</Note>
    </Frame>
  );
}

/* 5. Hidróxidos y oxoácidos */
export function HidroxidosOxoacidosFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: (num(block.params?.n, 0, 0, 1) >= 0.5 ? "acido" : "hidroxido") as "hidroxido" | "acido", m: Math.round(num(block.params?.a, 10, 0, METALES.length - 1)), k: 1, ac: Math.round(num(block.params?.b, 5, 0, OXOACIDOS.length - 1)) };
  const [s, setS] = useState<{ modo: "hidroxido" | "acido"; m: number; k: number; ac: number }>(init);
  const m = METALES[s.m]!;
  const nox = m.nox[Math.min(s.k, m.nox.length - 1)]!;
  const h = generarHidroxido(m, nox);
  const ac = OXOACIDOS[s.ac]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Hidróxido: metal con el grupo OH⁻. Oxoácido: H, un no metal y oxígeno."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo" items={[{ value: "hidroxido", label: "Hidróxido" }, { value: "acido", label: "Oxoácido" }]} value={s.modo} onChange={(v) => setS((o) => ({ ...o, modo: v as "hidroxido" | "acido" }))} />
          {s.modo === "hidroxido" ? (
            <>
              <Choice label="Metal" items={METALES.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.m)} onChange={(k) => setS((o) => ({ ...o, m: Number(k), k: 0 }))} />
              <Choice label="Número de oxidación" items={m.nox.map((x, k) => ({ value: String(k), label: `+${x}` }))} value={String(Math.min(s.k, m.nox.length - 1))} onChange={(k) => setS((o) => ({ ...o, k: Number(k) }))} />
            </>
          ) : (
            <Choice label="Oxoácido" items={OXOACIDOS.map((x, k) => ({ value: String(k), label: x.formula }))} value={String(s.ac)} onChange={(k) => setS((o) => ({ ...o, ac: Number(k) }))} />
          )}
        </>
      }
    >
      {s.modo === "hidroxido" ? (
        <>
          <Formula f={h.formula} sub={`${ion(m.s, nox)} y OH⁻`} id="hidroxidos" />
          <Lista items={[{ etiqueta: "Nomenclatura de Stock", valor: h.stock, color: MANIM.blue }, { etiqueta: "Nomenclatura sistemática", valor: h.sistematica, color: MANIM.green }]} />
        </>
      ) : (
        <>
          <Formula f={ac.formula} sub={`${ac.el} con nº de oxidación +${ac.nox}`} id="oxoacidos" />
          <Lista items={[{ etiqueta: "Nombre tradicional (admitido)", valor: ac.tradicional, color: MANIM.blue }, { etiqueta: "Nomenclatura de hidrógeno", valor: ac.hidrogeno, color: MANIM.green }]} />
        </>
      )}
      <Note>Un <b>hidróxido</b> contiene el ion <b>hidróxido OH⁻</b> unido a un metal: NaOH, Ca(OH)₂, Fe(OH)₃ (<i>hidróxido de hierro(III)</i> o <i>trihidróxido de hierro</i>). El grupo OH se pone entre <b>paréntesis</b> si el subíndice es mayor que 1. Un <b>oxoácido</b> tiene la fórmula general HₐXᵦO𝒸: sus <b>nombres tradicionales</b> usan los sufijos <b>hipo…oso, -oso, -ico, per…ico</b> según el nº de oxidación del no metal (en orden creciente): HClO, HClO₂, HClO₃, HClO₄. Sus sales (oxisales) se forman al sustituir el hidrógeno por un metal.</Note>
    </Frame>
  );
}

/* 6. Oxisales */
export function OxisalesFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 10, 0, METALES.length - 1)), k: Math.round(num(block.params?.b, 1, 0, 3)), a: Math.round(num(block.params?.n, 7, 0, OXOANIONES.length - 1)) };
  const [s, setS] = useState(init);
  const m = METALES[s.m]!;
  const nox = m.nox[Math.min(s.k, m.nox.length - 1)]!;
  const an = OXOANIONES[s.a]!;
  const r = generarSal(m, nox, an);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Oxisal: un metal y un oxoanión. El oxoanión se pone entre paréntesis si hay más de uno."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal" items={METALES.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.m)} onChange={(k) => setS((o) => ({ ...o, m: Number(k), k: 0 }))} />
          <Choice label="Número de oxidación del metal" items={m.nox.map((x, k) => ({ value: String(k), label: `+${x}` }))} value={String(Math.min(s.k, m.nox.length - 1))} onChange={(k) => setS((o) => ({ ...o, k: Number(k) }))} />
          <Choice label="Oxoanión" items={OXOANIONES.map((x, k) => ({ value: String(k), label: ion(x.s, -x.carga) }))} value={String(s.a)} onChange={(k) => setS((o) => ({ ...o, a: Number(k) }))} />
        </>
      }
    >
      <Formula f={r.formula} sub={`${ion(m.s, nox)} y ${an.nombre} (${ion(an.s, -an.carga)})`} id="oxisales" />
      <Lista items={[
        { etiqueta: "Nombre tradicional / Stock", valor: r.stock, color: MANIM.blue },
        { etiqueta: "Sistemática (abreviada)", valor: r.sistematica, color: MANIM.green },
      ]} />
      <Note>Las <b>oxisales</b> proceden de sustituir los hidrógenos de un oxoácido por un metal. El <b>oxoanión</b> conserva su carga (ClO⁻ hipoclorito, SO₄²⁻ sulfato, NO₃⁻ nitrato, CO₃²⁻ carbonato, PO₄³⁻ fosfato). Sus nombres cambian el sufijo del ácido: <b>-oso → -ito</b> y <b>-ico → -ato</b> (ácido sulfúrico → sulfato). En la fórmula se intercambian cargas y el oxoanión va entre <b>paréntesis</b> si el subíndice es mayor que 1: Fe₂(SO₄)₃ es <i>sulfato de hierro(III)</i> (o <i>tris(tetraoxidosulfato) de dihierro</i>, en la sistemática completa; aquí se escribe de forma abreviada).</Note>
    </Frame>
  );
}
