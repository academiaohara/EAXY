"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { prefijo, proporcion, romano, sub } from "@/components/lesson/slide/tools/Fq4FormulacionTools";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Motor de formulación (se comprueba en los tests) ───────────── */

export type Pos = { s: string; nombre: string; nox: number[]; metal: boolean; en: number };
export const POSITIVOS: Pos[] = [
  { s: "Li", nombre: "litio", nox: [1], metal: true, en: 0.98 }, { s: "Na", nombre: "sodio", nox: [1], metal: true, en: 0.93 }, { s: "K", nombre: "potasio", nox: [1], metal: true, en: 0.82 },
  { s: "Ag", nombre: "plata", nox: [1], metal: true, en: 1.93 }, { s: "Mg", nombre: "magnesio", nox: [2], metal: true, en: 1.31 }, { s: "Ca", nombre: "calcio", nox: [2], metal: true, en: 1.0 },
  { s: "Ba", nombre: "bario", nox: [2], metal: true, en: 0.89 }, { s: "Zn", nombre: "cinc", nox: [2], metal: true, en: 1.65 }, { s: "Al", nombre: "aluminio", nox: [3], metal: true, en: 1.61 },
  { s: "Cu", nombre: "cobre", nox: [1, 2], metal: true, en: 1.9 }, { s: "Fe", nombre: "hierro", nox: [2, 3], metal: true, en: 1.83 }, { s: "Ni", nombre: "níquel", nox: [2, 3], metal: true, en: 1.91 },
  { s: "Sn", nombre: "estaño", nox: [2, 4], metal: true, en: 1.96 }, { s: "Pb", nombre: "plomo", nox: [2, 4], metal: true, en: 2.33 }, { s: "Au", nombre: "oro", nox: [1, 3], metal: true, en: 2.54 },
  { s: "B", nombre: "boro", nox: [3], metal: false, en: 2.04 }, { s: "Si", nombre: "silicio", nox: [4], metal: false, en: 1.9 }, { s: "C", nombre: "carbono", nox: [2, 4], metal: false, en: 2.55 },
  { s: "N", nombre: "nitrógeno", nox: [1, 2, 3, 4, 5], metal: false, en: 3.04 }, { s: "P", nombre: "fósforo", nox: [3, 5], metal: false, en: 2.19 }, { s: "S", nombre: "azufre", nox: [2, 4, 6], metal: false, en: 2.58 },
  { s: "Cl", nombre: "cloro", nox: [1, 3, 5, 7], metal: false, en: 3.16 }, { s: "Br", nombre: "bromo", nox: [1, 3, 5, 7], metal: false, en: 2.96 }, { s: "I", nombre: "yodo", nox: [1, 3, 5, 7], metal: false, en: 2.66 },
];
export type Neg = { id: string; s: string; nombre: string; carga: number; tipo: "oxido" | "peroxido" | "hidruro" | "binaria"; en: number };
export const NEGATIVOS: Neg[] = [
  { id: "O", s: "O", nombre: "óxido", carga: 2, tipo: "oxido", en: 3.44 }, { id: "O2", s: "O₂", nombre: "peróxido", carga: 2, tipo: "peroxido", en: 3.44 },
  { id: "H", s: "H", nombre: "hidruro", carga: 1, tipo: "hidruro", en: 2.2 },
  { id: "F", s: "F", nombre: "fluoruro", carga: 1, tipo: "binaria", en: 3.98 }, { id: "Cl", s: "Cl", nombre: "cloruro", carga: 1, tipo: "binaria", en: 3.16 },
  { id: "Br", s: "Br", nombre: "bromuro", carga: 1, tipo: "binaria", en: 2.96 }, { id: "I", s: "I", nombre: "yoduro", carga: 1, tipo: "binaria", en: 2.66 },
  { id: "S", s: "S", nombre: "sulfuro", carga: 2, tipo: "binaria", en: 2.58 }, { id: "N", s: "N", nombre: "nitruro", carga: 3, tipo: "binaria", en: 3.04 },
];
/** ¿Existe un compuesto binario razonable entre ambos? Metales con cualquier no metal (peróxidos solo con nox 1 o 2) y no metales con otro más electronegativo. */
export function compatible(pos: Pos, nox: number, neg: Neg): boolean {
  if (pos.s === neg.id || pos.s + "₂" === neg.s) return false;
  if (!pos.nox.includes(nox)) return false;
  if (neg.tipo === "hidruro") return pos.metal;
  if (neg.tipo === "peroxido") return pos.metal && (nox === 1 || nox === 2);
  if (pos.metal) return true;
  return neg.en > pos.en;
}
const conSub = (s: string, n: number): string => `${s}${n > 1 ? sub(n) : ""}`;
const conParentesis = (f: string, n: number): string => (n > 1 ? `(${f})${sub(n)}` : f);

/** Compuesto binario: fórmula, nomenclatura sistemática (prefijos) y de Stock. */
export function binario(pos: Pos, nox: number, neg: Neg) {
  const varios = pos.nox.length > 1;
  if (neg.tipo === "peroxido") {
    const [nP, nO2] = proporcion(nox, 2);
    return { formula: `${conSub(pos.s, nP)}O${sub(2 * nO2)}`, sistematica: `${prefijo(2 * nO2)}óxido de ${nP > 1 ? prefijo(nP) : ""}${pos.nombre}`, stock: `peróxido de ${pos.nombre}${varios ? `(${romano(nox)})` : ""}`, subP: nP, subN: 2 * nO2 };
  }
  const [nP, nN] = proporcion(nox, neg.carga);
  const anion = nN === 1 ? (neg.tipo === "oxido" ? "monóxido" : neg.nombre) : `${prefijo(nN)}${neg.nombre}`;
  return {
    formula: `${conSub(pos.s, nP)}${conSub(neg.s, nN)}`,
    sistematica: `${anion} de ${nP > 1 ? prefijo(nP) : ""}${pos.nombre}`,
    stock: `${neg.nombre} de ${pos.nombre}${varios ? `(${romano(nox)})` : ""}`,
    subP: nP,
    subN: nN,
  };
}

export type Acido = { f: string; H: number; X: string; nX: number; O: number; trad: string };
const RAIZ: Record<string, string> = { Cl: "clor", Br: "brom", I: "yod", N: "nitr", S: "sulf", C: "carbon", P: "fosf", B: "bor", Cr: "crom", Mn: "mangan", As: "arsen", Se: "selen" };
const NOMBRE_ELEM: Record<string, string> = { Cl: "cloro", Br: "bromo", I: "yodo", N: "nitrógeno", S: "azufre", C: "carbono", P: "fósforo", B: "boro", Cr: "cromo", Mn: "manganeso", As: "arsénico", Se: "selenio" };
const ac = (H: number, X: string, nX: number, O: number, trad: string): Acido => ({ f: `${conSub("H", H)}${conSub(X, nX)}${conSub("O", O)}`, H, X, nX, O, trad });
export const ACIDOS: Acido[] = [
  ac(1, "Cl", 1, 1, "ácido hipocloroso"), ac(1, "Cl", 1, 2, "ácido cloroso"), ac(1, "Cl", 1, 3, "ácido clórico"), ac(1, "Cl", 1, 4, "ácido perclórico"),
  ac(1, "Br", 1, 1, "ácido hipobromoso"), ac(1, "Br", 1, 3, "ácido brómico"), ac(1, "Br", 1, 4, "ácido perbrómico"),
  ac(1, "I", 1, 1, "ácido hipoyodoso"), ac(1, "I", 1, 3, "ácido yódico"), ac(1, "I", 1, 4, "ácido peryódico"),
  ac(1, "N", 1, 2, "ácido nitroso"), ac(1, "N", 1, 3, "ácido nítrico"), ac(2, "S", 1, 3, "ácido sulfuroso"), ac(2, "S", 1, 4, "ácido sulfúrico"),
  ac(2, "C", 1, 3, "ácido carbónico"), ac(3, "P", 1, 3, "ácido fosforoso"), ac(3, "P", 1, 4, "ácido fosfórico"), ac(1, "P", 1, 3, "ácido metafosfórico"),
  ac(3, "B", 1, 3, "ácido bórico"), ac(3, "As", 1, 4, "ácido arsénico"), ac(2, "Se", 1, 4, "ácido selénico"),
  ac(2, "Cr", 1, 4, "ácido crómico"), ac(2, "Cr", 2, 7, "ácido dicrómico"), ac(1, "Mn", 1, 4, "ácido permangánico"), ac(2, "Mn", 1, 4, "ácido mangánico"),
];
/** Número de oxidación del elemento central: (2·O − H)/nX. */
export const noxAcido = (a: Acido): number => (2 * a.O - a.H) / a.nX;
const sinTilde = (s: string): string => s.replace(/á/g, "a").replace(/é/g, "e").replace(/í/g, "i").replace(/ó/g, "o").replace(/ú/g, "u");
/** Nombre tradicional del anión (-ico → -ato; -oso → -ito). */
export function anionTradicional(a: Acido): string {
  const t = a.trad.replace("ácido ", "");
  const suf = t.endsWith("ico") ? "ato" : "ito";
  let raiz = sinTilde(t.slice(0, -3));
  if (raiz.endsWith("sulfur")) raiz = raiz.slice(0, -2);
  else if (raiz.endsWith("fosfor")) raiz = raiz.slice(0, -2);
  else if (raiz.endsWith("arsen")) raiz += "i";
  return `${raiz}${suf}`;
}
/** Parte «tetraoxidosulfato» de la nomenclatura de adición (IUPAC 2005). */
export const aniónSistematico = (a: Acido): string => `${prefijo(a.O)}oxido${a.nX > 1 ? prefijo(a.nX) : ""}${RAIZ[a.X]}ato`;
export function nombresAcido(a: Acido) {
  const nox = noxAcido(a);
  return {
    trad: a.trad,
    iupac2005: `${a.H > 1 ? prefijo(a.H) : ""}hidrogeno(${aniónSistematico(a)})`,
    clasica: `${prefijo(a.O)}oxo${a.nX > 1 ? prefijo(a.nX) : ""}${RAIZ[a.X]}ato(${romano(nox)}) de ${a.H > 1 ? prefijo(a.H) : ""}hidrógeno`,
    nox,
  };
}
const mcd = (a: number, b: number): number => (b === 0 ? a : mcd(b, a % b));
/** Obtención del oxoácido: óxido + agua → ácido, con coeficientes enteros. */
export function obtencionAcido(a: Acido) {
  const nox = noxAcido(a);
  const [nXo, nOo] = proporcion(nox, 2);
  const g = mcd(nXo, a.nX);
  let p = a.nX / g;
  let q = nXo / g;
  let w = (q * a.H) / 2;
  if (!Number.isInteger(w)) { p *= 2; q *= 2; w *= 2; }
  const oxido = `${conSub(a.X, nXo)}${conSub("O", nOo)}`;
  const c = (n: number, f: string): string => (n > 1 ? `${n} ${f}` : f);
  return { oxido, p, q, w, ecuacion: `${c(p, oxido)} + ${c(w, "H₂O")} → ${c(q, a.f)}` };
}

export type Cation = { s: string; nombre: string; nox: number[]; poli: boolean };
export const CATIONES: Cation[] = [
  { s: "Na", nombre: "sodio", nox: [1], poli: false }, { s: "K", nombre: "potasio", nox: [1], poli: false }, { s: "NH₄", nombre: "amonio", nox: [1], poli: true },
  { s: "Ca", nombre: "calcio", nox: [2], poli: false }, { s: "Mg", nombre: "magnesio", nox: [2], poli: false }, { s: "Ba", nombre: "bario", nox: [2], poli: false },
  { s: "Zn", nombre: "cinc", nox: [2], poli: false }, { s: "Al", nombre: "aluminio", nox: [3], poli: false }, { s: "Cu", nombre: "cobre", nox: [1, 2], poli: false },
  { s: "Fe", nombre: "hierro", nox: [2, 3], poli: false }, { s: "Pb", nombre: "plomo", nox: [2, 4], poli: false }, { s: "Ag", nombre: "plata", nox: [1], poli: false },
];
const SIMPLE_ACIDOS = ["H2SO4", "H2SO3", "HNO3", "HNO2", "H2CO3", "H3PO4", "HClO", "HClO3", "HClO4", "H2CrO4", "H2Cr2O7", "HMnO4"];
export const ACIDOS_SAL: Acido[] = ACIDOS.filter((a) => SIMPLE_ACIDOS.includes(a.f.replace(/[₀-₉]/g, (d) => String("₀₁₂₃₄₅₆₇₈₉".indexOf(d)))));

/** Oxisal (u oxisal ácida): se quitan r hidrógenos del ácido y se combina con el catión. */
export function oxisal(cat: Cation, nox: number, a: Acido, r: number) {
  if (r < 1 || r > a.H) return null;
  const rem = a.H - r;
  const cuerpo = `${conSub(a.X, a.nX)}${conSub("O", a.O)}`;
  const anionF = `${rem > 0 ? conSub("H", rem) : ""}${cuerpo}`;
  const [nC, nA] = proporcion(nox, r);
  const formula = `${cat.poli ? conParentesis(cat.s, nC) : conSub(cat.s, nC)}${conParentesis(anionF, nA)}`;
  const aniTrad = `${rem > 0 ? `${rem > 1 ? prefijo(rem) : ""}hidrogeno` : ""}${anionTradicional(a)}`;
  const varios = cat.nox.length > 1;
  const aniSis = rem > 0 ? `${rem > 1 ? prefijo(rem) : ""}hidrogeno(${aniónSistematico(a)})` : aniónSistematico(a);
  const mult = nA === 1 ? aniSis : `${nA === 2 ? "bis" : nA === 3 ? "tris" : "tetrakis"}${rem > 0 ? `[${aniSis}]` : `(${aniSis})`}`;
  return {
    formula,
    stock: `${aniTrad} de ${cat.nombre}${varios ? `(${romano(nox)})` : ""}`,
    sistematica: `${nA === 1 && rem === 0 ? aniSis : mult} de ${nC > 1 ? prefijo(nC) : ""}${cat.nombre}`,
    carga: r,
    subC: nC,
    subA: nA,
    acida: rem > 0,
  };
}

export type Item = { f: string; fam: string; sis: string; stock: string; extra?: string };
export const ENTRENADOR: Item[] = [
  { f: "Fe₂O₃", fam: "óxido", sis: "trióxido de dihierro", stock: "óxido de hierro(III)" },
  { f: "Al₂O₃", fam: "óxido", sis: "trióxido de dialuminio", stock: "óxido de aluminio" },
  { f: "CO", fam: "óxido", sis: "monóxido de carbono", stock: "óxido de carbono(II)" },
  { f: "SO₃", fam: "óxido", sis: "trióxido de azufre", stock: "óxido de azufre(VI)" },
  { f: "N₂O₅", fam: "óxido", sis: "pentaóxido de dinitrógeno", stock: "óxido de nitrógeno(V)" },
  { f: "Cl₂O₇", fam: "óxido", sis: "heptaóxido de dicloro", stock: "óxido de cloro(VII)" },
  { f: "Na₂O₂", fam: "peróxido", sis: "dióxido de disodio", stock: "peróxido de sodio" },
  { f: "BaO₂", fam: "peróxido", sis: "dióxido de bario", stock: "peróxido de bario" },
  { f: "CaH₂", fam: "hidruro", sis: "dihidruro de calcio", stock: "hidruro de calcio" },
  { f: "AlH₃", fam: "hidruro", sis: "trihidruro de aluminio", stock: "hidruro de aluminio" },
  { f: "NaCl", fam: "sal binaria", sis: "cloruro de sodio", stock: "cloruro de sodio" },
  { f: "FeCl₃", fam: "sal binaria", sis: "tricloruro de hierro", stock: "cloruro de hierro(III)" },
  { f: "CaF₂", fam: "sal binaria", sis: "difluoruro de calcio", stock: "fluoruro de calcio" },
  { f: "Al₂S₃", fam: "sal binaria", sis: "trisulfuro de dialuminio", stock: "sulfuro de aluminio" },
  { f: "Mg₃N₂", fam: "sal binaria", sis: "dinitruro de trimagnesio", stock: "nitruro de magnesio" },
  { f: "CCl₄", fam: "sal binaria", sis: "tetracloruro de carbono", stock: "cloruro de carbono(IV)" },
  { f: "Ca(OH)₂", fam: "hidróxido", sis: "dihidróxido de calcio", stock: "hidróxido de calcio" },
  { f: "Fe(OH)₃", fam: "hidróxido", sis: "trihidróxido de hierro", stock: "hidróxido de hierro(III)" },
  { f: "H₂SO₄", fam: "oxoácido", sis: "dihidrogeno(tetraoxidosulfato)", stock: "ácido sulfúrico" },
  { f: "HNO₃", fam: "oxoácido", sis: "hidrogeno(trioxidonitrato)", stock: "ácido nítrico" },
  { f: "HClO₄", fam: "oxoácido", sis: "hidrogeno(tetraoxidoclorato)", stock: "ácido perclórico" },
  { f: "CaCO₃", fam: "oxisal", sis: "trioxidocarbonato de calcio", stock: "carbonato de calcio" },
  { f: "Fe₂(SO₄)₃", fam: "oxisal", sis: "tris(tetraoxidosulfato) de dihierro", stock: "sulfato de hierro(III)" },
  { f: "KMnO₄", fam: "oxisal", sis: "tetraoxidomanganato de potasio", stock: "permanganato de potasio" },
  { f: "NaHCO₃", fam: "oxisal", sis: "hidrogeno(trioxidocarbonato) de sodio", stock: "hidrogenocarbonato de sodio" },
];
/** Cuatro opciones (la correcta y tres de la misma familia o de otras) en un orden determinado por la semilla. */
export function opcionesEntrenador(i: number, modo: "formula" | "nombre"): { texto: string; ok: boolean }[] {
  const n = ENTRENADOR.length;
  const ii = ((Math.round(i) % n) + n) % n;
  const it = ENTRENADOR[ii]!;
  const misma = ENTRENADOR.filter((x) => x.fam === it.fam && x.f !== it.f);
  const resto = ENTRENADOR.filter((x) => x.fam !== it.fam);
  const otros: Item[] = [];
  for (let k = 0; otros.length < 3 && k < 80; k += 1) {
    const cand = k < misma.length ? misma[(ii + k) % misma.length]! : resto[(ii * 3 + k) % resto.length]!;
    if (!otros.includes(cand) && cand.f !== it.f) otros.push(cand);
  }
  const txt = (x: Item): string => (modo === "formula" ? x.f : x.stock);
  const todas = [{ texto: txt(it), ok: true }, ...otros.map((x) => ({ texto: txt(x), ok: false }))];
  const out = todas.filter((x, k) => todas.findIndex((y) => y.texto === x.texto) === k);
  const desp = ii % out.length;
  return [...out.slice(desp), ...out.slice(0, desp)];
}

/* ───────────── Dibujo ───────────── */

function Formula({ f, sub: s, id }: { f: string; sub?: string; id: string }) {
  return (
    <Svg w={520} h={90} testId={id} maxH={110}>
      <text x={260} y={48} textAnchor="middle" fill={MANIM.yellow} fontSize={f.length > 12 ? 26 : 34} fontWeight={700}>{f}</text>
      {s && <text x={260} y={78} textAnchor="middle" fill={MANIM.muted} fontSize={13}>{s}</text>}
    </Svg>
  );
}

/* ───────────── 1. Compuestos binarios ───────────── */

export function BinariosFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.a, 10, 0, POSITIVOS.length - 1)), k: Math.round(num(block.params?.b, 1, 0, 4)), n: Math.round(num(block.params?.n, 0, 0, NEGATIVOS.length - 1)) };
  const [s, setS] = useState(init);
  const pos = POSITIVOS[s.p]!;
  const nox = pos.nox[Math.min(s.k, pos.nox.length - 1)]!;
  const neg = NEGATIVOS[s.n]!;
  const ok = compatible(pos, nox, neg);
  const r = ok ? binario(pos, nox, neg) : null;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Se intercambian los números de oxidación como subíndices y se simplifica: Fe³⁺ y O²⁻ → Fe₂O₃."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Elemento electropositivo" items={POSITIVOS.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.p)} onChange={(k) => setS({ p: Number(k), k: 0, n: s.n })} />
          <Choice label="Número de oxidación" items={pos.nox.map((x, k) => ({ value: String(k), label: `+${x}` }))} value={String(Math.min(s.k, pos.nox.length - 1))} onChange={(k) => setS((o) => ({ ...o, k: Number(k) }))} />
          <Choice label="Parte negativa" items={NEGATIVOS.map((x, k) => ({ value: String(k), label: x.id === "O2" ? "O₂²⁻ (peróxido)" : x.id === "H" ? "H⁻" : x.s }))} value={String(s.n)} onChange={(k) => setS((o) => ({ ...o, n: Number(k) }))} />
        </>
      }
    >
      <Formula f={r ? r.formula : "—"} sub={r ? `${pos.s} (+${nox}) y ${neg.id === "O2" ? "O₂ (−1 cada O)" : `${neg.s} (−${neg.carga === 1 && neg.tipo === "hidruro" ? 1 : neg.carga})`}` : "combinación no habitual"} id="binarios-fb1" />
      <Readout>
        <Stat color={MANIM.green} label="Nomenclatura sistemática">{r ? r.sistematica : "—"}</Stat>
        <Stat color={MANIM.blue} label="Nomenclatura de Stock">{r ? r.stock : "—"}</Stat>
        <Stat color={MANIM.orange} label="Familia">{!r ? "—" : neg.tipo === "oxido" ? "óxido" : neg.tipo === "peroxido" ? "peróxido" : neg.tipo === "hidruro" ? "hidruro metálico" : pos.metal ? "sal binaria" : "binario de dos no metales"}</Stat>
      </Readout>
      <Note>Un <b>compuesto binario</b> tiene dos elementos; el <b>menos electronegativo</b> (de número de oxidación positivo) se escribe primero y su nombre va al final: «<i>cloruro de sodio</i>». Los subíndices se obtienen <b>intercambiando</b> los números de oxidación (en valor absoluto) y <b>simplificando</b>. <b>Sistemática</b>: prefijos <b>mono-, di-, tri-, tetra-, penta-, hexa-, hepta-</b> para cada elemento (mono- se omite en el primero). <b>Stock</b>: el nº de oxidación en <b>romanos entre paréntesis</b> solo si el elemento tiene varios (<i>óxido de hierro(III)</i>; <i>cloruro de sodio</i>). Los <b>peróxidos</b> contienen el grupo O₂²⁻ (Na₂O₂, H₂O₂); en los <b>hidruros metálicos</b> el H es −1. En compuestos de dos no metales, el más electronegativo se nombra el primero con la terminación <b>-uro</b> y el otro con prefijos (SF₆: <i>hexafluoruro de azufre</i>).</Note>
    </Frame>
  );
}

/* ───────────── 2. Oxoácidos ───────────── */

export function OxoacidosFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 13, 0, ACIDOS.length - 1));
  const [i, setI] = useState(init);
  const a = ACIDOS[i]!;
  const n = nombresAcido(a);
  const ob = obtencionAcido(a);
  const anion = `${a.nX > 1 ? "" : ""}${anionTradicional(a)}`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Oxoácido = óxido + agua. El nombre tradicional depende del número de oxidación: hipo-…-oso < -oso < -ico < per-…-ico."}
      onReset={() => setI(init)}
      controls={<Choice label="Oxoácido" items={ACIDOS.map((x, k) => ({ value: String(k), label: x.f }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Formula f={a.f} sub={`${NOMBRE_ELEM[a.X]} con nº de oxidación +${n.nox}`} id="oxoacidos-fb1" />
      <Readout>
        <Stat color={MANIM.yellow} label="Obtención (óxido + agua)">{ob.ecuacion}</Stat>
        <Stat color={MANIM.green} label="Nombre tradicional (aceptado)">{n.trad}</Stat>
        <Stat color={MANIM.blue} label="Sistemática de adición (IUPAC 2005)">{n.iupac2005}</Stat>
        <Stat color={MANIM.orange} label="Sistemática clásica de hidrógeno">{n.clasica}</Stat>
        <Stat color={MANIM.purple} label="Anión que forma al perder todos sus H">{`${anion} (${a.H}−)`}</Stat>
      </Readout>
      <Note>Un <b>oxoácido</b> contiene H, un elemento (generalmente no metal o metal de transición con nº de oxidación alto) y O: <b>H<sub>a</sub>X<sub>b</sub>O<sub>c</sub></b>. Se obtiene al <b>sumar agua a un óxido ácido</b>: SO₃ + H₂O → H₂SO₄. El <b>nº de oxidación</b> del elemento central sale de <b>2c − a = b·n</b>. <b>Nombre tradicional</b> (muy usado y permitido): con <b>cuatro números</b> de oxidación (Cl, Br, I): <b>hipo-…-oso</b> (+1), <b>-oso</b> (+3), <b>-ico</b> (+5) y <b>per-…-ico</b> (+7); con dos (S, N, P…): <b>-oso</b> (menor) e <b>-ico</b> (mayor). <b>IUPAC 2005</b>: se nombra el anión por adición de átomos de O: <i>dihidrogeno(tetraoxidosulfato)</i>. En los textos más antiguos aparece <i>tetraoxosulfato(VI) de dihidrógeno</i>. Los ácidos del fósforo, el boro y el crómico se dan en su forma orto o más común.</Note>
    </Frame>
  );
}

/* ───────────── 3. Oxisales ───────────── */

export function OxisalesFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 3, 0, CATIONES.length - 1)), k: 0, ac: Math.round(num(block.params?.b, 0, 0, ACIDOS_SAL.length - 1)), r: Math.round(num(block.params?.n, 2, 1, 3)) };
  const [s, setS] = useState(init);
  const cat = CATIONES[s.c]!;
  const nox = cat.nox[Math.min(s.k, cat.nox.length - 1)]!;
  const acid = ACIDOS_SAL[Math.min(s.ac, ACIDOS_SAL.length - 1)]!;
  const r = Math.min(Math.max(1, s.r), acid.H);
  const sal = oxisal(cat, nox, acid, r);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Oxisal = ácido que pierde H⁺. Si no los pierde todos, es una sal ácida (hidrogeno-)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Catión" items={CATIONES.map((x, k) => ({ value: String(k), label: x.s }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k), k: 0 }))} />
          <Choice label="Número de oxidación" items={cat.nox.map((x, k) => ({ value: String(k), label: `+${x}` }))} value={String(Math.min(s.k, cat.nox.length - 1))} onChange={(k) => setS((o) => ({ ...o, k: Number(k) }))} />
          <Choice label="Oxoácido de partida" items={ACIDOS_SAL.map((x, k) => ({ value: String(k), label: x.f }))} value={String(Math.min(s.ac, ACIDOS_SAL.length - 1))} onChange={(k) => setS((o) => ({ ...o, ac: Number(k) }))} />
          <Choice label="Hidrógenos que pierde" items={Array.from({ length: acid.H }, (_, k) => ({ value: String(k + 1), label: String(k + 1) }))} value={String(r)} onChange={(k) => setS((o) => ({ ...o, r: Number(k) }))} />
        </>
      }
    >
      <Formula f={sal ? sal.formula : "—"} sub={sal ? `${cat.s} (+${nox}) con el anión ${sal.carga}− procedente de ${acid.f}` : undefined} id="oxisales-fb1" />
      <Readout>
        <Stat color={MANIM.green} label="Nombre tradicional / Stock">{sal ? sal.stock : "—"}</Stat>
        <Stat color={MANIM.blue} label="Nomenclatura sistemática (IUPAC 2005)">{sal ? sal.sistematica : "—"}</Stat>
        <Stat color={MANIM.orange} label="Tipo">{sal ? (sal.acida ? "sal ácida (conserva algún H)" : "sal neutra") : "—"}</Stat>
      </Readout>
      <Note>Una <b>oxisal</b> deriva de un oxoácido al sustituir sus H⁺ por un catión. El <b>anión</b> se nombra cambiando <b>-ico → -ato</b> y <b>-oso → -ito</b> (sulfúrico → sulfato; sulfuroso → sulfito; hipocloroso → hipoclorito). La fórmula se obtiene como en los binarios, <b>intercambiando cargas</b>: el anión poliatómico va entre <b>paréntesis</b> si hay más de uno: Fe₂(SO₄)₃. Si el ácido es poliprótico y <b>no pierde todos los H</b>, se forman <b>sales ácidas</b> con el prefijo <b>hidrogeno-</b>: NaHCO₃ (hidrogenocarbonato de sodio), Na₂HPO₄ (hidrogenofosfato de disodio). <b>Stock</b>: <i>sulfato de hierro(III)</i>. <b>Sistemática</b> (IUPAC 2005): <i>tris(tetraoxidosulfato) de dihierro</i>. El catión <b>amonio</b> NH₄⁺ se comporta como un metal.</Note>
    </Frame>
  );
}

/* ───────────── 4. Entrenador ───────────── */

export function EntrenadorFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 0, 0, ENTRENADOR.length - 1)), modo: Math.round(num(block.params?.n, 0, 0, 1)), r: -1 };
  const [s, setS] = useState(init);
  const it = ENTRENADOR[((s.i % ENTRENADOR.length) + ENTRENADOR.length) % ENTRENADOR.length]!;
  const modo = s.modo === 0 ? "formula" : "nombre";
  const ops = opcionesEntrenador(s.i, modo);
  const elegido = s.r >= 0 ? ops[s.r] : null;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige la fórmula (o el nombre) correcto y comprueba con las tres nomenclaturas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Ejercicio" items={[{ value: "0", label: "Nombre → fórmula" }, { value: "1", label: "Fórmula → nombre" }]} value={String(s.modo)} onChange={(m) => setS((o) => ({ ...o, modo: Number(m), r: -1 }))} />
          <Choice label="Opciones" items={ops.map((x, k) => ({ value: String(k), label: x.texto }))} value={String(s.r)} onChange={(k) => setS((o) => ({ ...o, r: Number(k) }))} />
          <Choice label="Siguiente" items={[{ value: "a", label: "← anterior" }, { value: "b", label: "siguiente →" }]} value="" onChange={(d) => setS((o) => ({ ...o, i: (o.i + (d === "a" ? -1 : 1) + ENTRENADOR.length) % ENTRENADOR.length, r: -1 }))} />
        </>
      }
    >
      <Formula f={modo === "formula" ? it.stock : it.f} sub={`${it.fam} · ${modo === "formula" ? "¿cuál es su fórmula?" : "¿cuál es su nombre (Stock/tradicional)?"}`} id="entrenador-fb1" />
      <Readout>
        <Stat color={!elegido ? MANIM.muted : elegido.ok ? MANIM.green : MANIM.red} label="Tu respuesta">{!elegido ? "elige una opción" : elegido.ok ? "¡Correcto!" : `Incorrecto: la respuesta es ${modo === "formula" ? it.f : it.stock}`}</Stat>
        <Stat color={MANIM.yellow} label="Fórmula">{it.f}</Stat>
        <Stat color={MANIM.blue} label="Sistemática">{it.sis}</Stat>
        <Stat color={MANIM.green} label="Stock / tradicional">{it.stock}</Stat>
      </Readout>
      <Note>Método: <b>1)</b> identifica la <b>familia</b> por el nombre o por los elementos (O con otro elemento: óxido; -uro: sal binaria o hidruro; hidróxido: grupo OH⁻; ácido ...: H + no metal + O; -ato/-ito: oxisal). <b>2)</b> Escribe los <b>iones</b> con su carga. <b>3)</b> <b>Intercambia</b> las cargas y simplifica. <b>4)</b> Comprueba que la <b>suma de cargas es cero</b>. Para nombrar: lee la fórmula de derecha a izquierda («<i>sulfato de hierro(III)</i>»), calcula el nº de oxidación del metal con la neutralidad y usa <b>prefijos</b> (sistemática) o <b>números romanos</b> (Stock).</Note>
    </Frame>
  );
}
