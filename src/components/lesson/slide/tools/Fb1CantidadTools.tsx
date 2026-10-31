"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { parseFormula, sub } from "@/components/lesson/slide/tools/Fq4FormulacionTools";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

const SUPD = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Notación científica con coma decimal: 6,02·10²³ */
export function cient(v: number, dec = 2): string {
  if (!Number.isFinite(v) || v === 0) return Number.isFinite(v) ? "0" : "—";
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(dec))) >= 10) { m /= 10; e += 1; }
  const sup = `${e < 0 ? "⁻" : ""}${String(Math.abs(e)).replace(/[0-9]/g, (c) => SUPD[Number(c)]!)}`;
  return e === 0 ? fmtEs(m, dec) : `${fmtEs(m, dec)}·10${sup}`;
}

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

export const NA = 6.022e23;
export const MASA_AT: Record<string, number> = { H: 1, Li: 7, B: 10.8, C: 12, N: 14, O: 16, F: 19, Na: 23, Mg: 24, Al: 27, Si: 28, P: 31, S: 32, Cl: 35.5, K: 39, Ca: 40, Cr: 52, Mn: 55, Fe: 56, Cu: 63.5, Zn: 65.4, Br: 80, Ag: 108, I: 127, Ba: 137, Pb: 207 };

/** Formatea una fórmula con subíndices (H2SO4 → H₂SO₄). */
export const bonita = (f: string): string => f.replace(/[0-9]+/g, (d) => sub(Number(d)));
/** Masa molar (g/mol) de una fórmula con dígitos normales; NaN si hay un elemento desconocido. */
export function masaMolar(f: string): number {
  const c = parseFormula(f);
  if (!c) return NaN;
  let t = 0;
  for (const [e, n] of Object.entries(c)) {
    const m = MASA_AT[e];
    if (m === undefined) return NaN;
    t += m * n;
  }
  return t;
}
export const moles = (masa: number, M: number): number => (M > 0 ? masa / M : NaN);
export const unidades = (n: number): number => n * NA;
/** Masa en gramos de una sola partícula (molécula, átomo o unidad fórmula). */
export const masaParticula = (M: number): number => M / NA;
/** Átomos totales por unidad de fórmula. */
export function atomosPorFormula(f: string): number {
  const c = parseFormula(f);
  return c ? Object.values(c).reduce((a, b) => a + b, 0) : NaN;
}

export const SUSTANCIAS_MOL = ["H2O", "CO2", "NaCl", "H2SO4", "C6H12O6", "CaCO3", "NH3", "Fe2O3", "Al2(SO4)3", "CH4", "O2", "Cu", "C2H5OH", "NaOH", "C"] as const;

/** Composición centesimal: % en masa de cada elemento. */
export function composicionCentesimal(f: string): { el: string; n: number; masa: number; pct: number }[] | null {
  const c = parseFormula(f);
  const M = masaMolar(f);
  if (!c || !Number.isFinite(M)) return null;
  return Object.entries(c).map(([el, n]) => ({ el, n, masa: MASA_AT[el]! * n, pct: (MASA_AT[el]! * n * 100) / M }));
}
export const COMPUESTOS_CENT = ["H2O", "CO2", "NaCl", "H2SO4", "C6H12O6", "CaCO3", "NH3", "Fe2O3", "Al2(SO4)3", "C2H5OH", "NaOH", "KMnO4", "CuSO4", "Ca(OH)2"] as const;

/** Fórmula empírica a partir de % (o masas) y masas atómicas: pasos y razón entera más sencilla. */
export function formulaEmpirica(datos: { el: string; pct: number }[], tol = 0.1) {
  const pasos = datos.map((d) => ({ ...d, masaAt: MASA_AT[d.el] ?? NaN, mol: d.pct / (MASA_AT[d.el] ?? NaN) }));
  if (pasos.some((p) => !Number.isFinite(p.mol) || p.mol <= 0)) return null;
  const min = Math.min(...pasos.map((p) => p.mol));
  const razones = pasos.map((p) => p.mol / min);
  let mult = 0;
  for (let k = 1; k <= 8; k += 1) {
    if (razones.every((r) => Math.abs(r * k - Math.round(r * k)) <= tol * Math.max(1, k * 0.5))) { mult = k; break; }
  }
  if (!mult) return null;
  const enteros = razones.map((r) => Math.round(r * mult));
  const formula = pasos.map((p, i) => `${p.el}${enteros[i]! > 1 ? sub(enteros[i]!) : ""}`).join("");
  const plano = pasos.map((p, i) => `${p.el}${enteros[i]! > 1 ? enteros[i] : ""}`).join("");
  return { pasos: pasos.map((p, i) => ({ ...p, razon: razones[i]!, entero: enteros[i]! })), mult, enteros, formula, plano, masaEmpirica: masaMolar(plano) };
}
/** Fórmula molecular: n = M/M_empírica (debe ser entero). */
export function formulaMolecular(emp: { enteros: number[]; pasos: { el: string }[]; masaEmpirica: number }, M: number) {
  const n = M / emp.masaEmpirica;
  const nr = Math.round(n);
  if (!(nr >= 1) || Math.abs(n - nr) > 0.1) return { n, formula: null as string | null };
  return { n: nr, formula: emp.pasos.map((p, i) => `${p.el}${emp.enteros[i]! * nr > 1 ? sub(emp.enteros[i]! * nr) : ""}`).join("") };
}
export const PROBLEMAS_EMP = [
  { nombre: "Glucosa", datos: [{ el: "C", pct: 40 }, { el: "H", pct: 6.7 }, { el: "O", pct: 53.3 }], M: 180 },
  { nombre: "Benceno", datos: [{ el: "C", pct: 92.3 }, { el: "H", pct: 7.7 }], M: 78 },
  { nombre: "Agua oxigenada", datos: [{ el: "H", pct: 5.9 }, { el: "O", pct: 94.1 }], M: 34 },
  { nombre: "Etano", datos: [{ el: "C", pct: 80 }, { el: "H", pct: 20 }], M: 30 },
  { nombre: "Ácido acético", datos: [{ el: "C", pct: 40 }, { el: "H", pct: 6.7 }, { el: "O", pct: 53.3 }], M: 60 },
  { nombre: "Butano", datos: [{ el: "C", pct: 82.8 }, { el: "H", pct: 17.2 }], M: 58 },
  { nombre: "Óxido de hierro", datos: [{ el: "Fe", pct: 69.9 }, { el: "O", pct: 30.1 }], M: 160 },
  { nombre: "Sulfato de cobre", datos: [{ el: "Cu", pct: 39.8 }, { el: "S", pct: 20.1 }, { el: "O", pct: 40.1 }], M: 159.5 },
] as const;

export type Rx = { id: string; nombre: string; esp: { f: string; c: number; lado: "r" | "p" }[] };
export const REACCIONES_EB: Rx[] = [
  { id: "caco3", nombre: "Descomposición de la caliza", esp: [{ f: "CaCO3", c: 1, lado: "r" }, { f: "CaO", c: 1, lado: "p" }, { f: "CO2", c: 1, lado: "p" }] },
  { id: "zn", nombre: "Cinc con ácido clorhídrico", esp: [{ f: "Zn", c: 1, lado: "r" }, { f: "HCl", c: 2, lado: "r" }, { f: "ZnCl2", c: 1, lado: "p" }, { f: "H2", c: 1, lado: "p" }] },
  { id: "fe2o3", nombre: "Reducción del óxido de hierro(III)", esp: [{ f: "Fe2O3", c: 1, lado: "r" }, { f: "CO", c: 3, lado: "r" }, { f: "Fe", c: 2, lado: "p" }, { f: "CO2", c: 3, lado: "p" }] },
  { id: "ch4", nombre: "Combustión del metano", esp: [{ f: "CH4", c: 1, lado: "r" }, { f: "O2", c: 2, lado: "r" }, { f: "CO2", c: 1, lado: "p" }, { f: "H2O", c: 2, lado: "p" }] },
  { id: "nh3", nombre: "Síntesis del amoniaco", esp: [{ f: "N2", c: 1, lado: "r" }, { f: "H2", c: 3, lado: "r" }, { f: "NH3", c: 2, lado: "p" }] },
  { id: "naoh", nombre: "Neutralización de NaOH con H2SO4", esp: [{ f: "H2SO4", c: 1, lado: "r" }, { f: "NaOH", c: 2, lado: "r" }, { f: "Na2SO4", c: 1, lado: "p" }, { f: "H2O", c: 2, lado: "p" }] },
];
export const ecuacionTexto = (r: Rx): string => {
  const lado = (l: "r" | "p"): string => r.esp.filter((e) => e.lado === l).map((e) => `${e.c > 1 ? `${e.c} ` : ""}${bonita(e.f)}`).join(" + ");
  return `${lado("r")} → ${lado("p")}`;
};
/** ¿Cumple la ley de Lavoisier (misma masa a ambos lados)? */
export function conservaMasa(r: Rx): boolean {
  const suma = (l: "r" | "p"): number => r.esp.filter((e) => e.lado === l).reduce((s, e) => s + e.c * masaMolar(e.f), 0);
  return Math.abs(suma("r") - suma("p")) < 1e-6;
}
/** Cálculos a partir de la masa impura de una sustancia dada (con % de pureza): moles y masa de cada especie. */
export function calculoReaccion(r: Rx, origen: number, masaMuestra: number, pureza: number) {
  const o = r.esp[origen];
  if (!o || !(masaMuestra >= 0)) return null;
  const p = Math.min(100, Math.max(0, pureza)) / 100;
  const masaPura = masaMuestra * p;
  const nBase = masaPura / masaMolar(o.f) / o.c;
  return { masaPura, tabla: r.esp.map((e) => ({ f: e.f, c: e.c, lado: e.lado, mol: nBase * e.c, masa: nBase * e.c * masaMolar(e.f) })) };
}

/* ───────────── Dibujo ───────────── */

function Titulo({ f, sub: s, id }: { f: string; sub?: string; id: string }) {
  return (
    <Svg w={520} h={90} testId={id} maxH={110}>
      <text x={260} y={48} textAnchor="middle" fill={MANIM.yellow} fontSize={f.length > 14 ? 24 : 34} fontWeight={700}>{f}</text>
      {s && <text x={260} y={78} textAnchor="middle" fill={MANIM.muted} fontSize={13}>{s}</text>}
    </Svg>
  );
}

/* ───────────── 1. Mol, masa y partículas ───────────── */

export function MolMasaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, SUSTANCIAS_MOL.length - 1)), modo: Math.round(num(block.params?.c, 0, 0, 2)), g: Math.round(num(block.params?.a, 36, 1, 500)), mol: num(block.params?.b, 2, 0.1, 10), e: 24 };
  const [s, setS] = useState(init);
  const f = SUSTANCIAS_MOL[s.i]!;
  const M = masaMolar(f);
  const n = s.modo === 0 ? moles(s.g, M) : s.modo === 1 ? s.mol : 10 ** s.e / NA;
  const masa = n * M;
  const part = n * NA;
  const atomos = part * atomosPorFormula(f);
  return (
    <Frame
      stacked
      hint={block.hint ?? "n = m/M y N = n·N_A: el mol es el puente entre la masa que se pesa y las partículas que se cuentan."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sustancia" items={SUSTANCIAS_MOL.map((x, k) => ({ value: String(k), label: bonita(x) }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Choice label="Dato conocido" items={[{ value: "0", label: "masa" }, { value: "1", label: "cantidad (mol)" }, { value: "2", label: "nº de partículas" }]} value={String(s.modo)} onChange={(k) => setS((o) => ({ ...o, modo: Number(k) }))} />
          {s.modo === 0 && <Slider label="Masa" value={s.g} min={1} max={500} step={1} unit=" g" color={MANIM.blue} onChange={(g) => setS((o) => ({ ...o, g }))} />}
          {s.modo === 1 && <Slider label="Cantidad de sustancia" value={s.mol} min={0.1} max={10} step={0.1} unit=" mol" color={MANIM.orange} format={f1} onChange={(mol) => setS((o) => ({ ...o, mol }))} />}
          {s.modo === 2 && <Slider label="log₁₀ del nº de partículas" value={s.e} min={20} max={26} step={0.1} color={MANIM.green} format={f1} onChange={(e) => setS((o) => ({ ...o, e }))} />}
        </>
      }
    >
      <Titulo f={bonita(f)} sub={`masa molar M = ${fin(M, f1)} g/mol`} id="mol-masa" />
      <Readout>
        <Stat color={MANIM.blue} label="Masa m = n·M">{`${fin(masa, f2)} g`}</Stat>
        <Stat color={MANIM.orange} label="Cantidad de sustancia n = m/M">{`${fin(n, f3)} mol`}</Stat>
        <Stat color={MANIM.green} label="Moléculas o unidades fórmula N = n·N_A">{`${cient(part)}`}</Stat>
        <Stat color={MANIM.purple} label="Átomos totales">{`${cient(atomos)}`}</Stat>
        <Stat color={MANIM.yellow} label="Masa de una partícula">{`${cient(masaParticula(M))} g`}</Stat>
      </Readout>
      <Note>El <b>mol</b> es la unidad de <b>cantidad de sustancia</b> del SI: contiene exactamente <b>6,022·10²³</b> entidades elementales (átomos, moléculas, iones…), el <b>número de Avogadro N_A</b> (mol⁻¹). La <b>masa molar M</b> (g/mol) coincide numéricamente con la masa atómica o molecular en <b>u</b>: M(H₂O) = 2·1 + 16 = 18 g/mol. Se relacionan: <b>n = m/M</b> y <b>N = n·N_A</b>. Así, 36 g de agua son 2 mol y 1,2·10²⁴ moléculas. Una sola molécula pesa M/N_A (≈ 3·10⁻²³ g el agua). Para contar átomos hay que multiplicar por los átomos que tiene cada fórmula. Masas atómicas redondeadas (C 12; O 16; Cl 35,5; Cu 63,5…).</Note>
    </Frame>
  );
}

/* ───────────── 2. Composición centesimal ───────────── */

const COLORES = [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple, MANIM.red];
export function CentesimalFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 4, 0, COMPUESTOS_CENT.length - 1)), g: Math.round(num(block.params?.a, 100, 1, 1000)) };
  const [s, setS] = useState(init);
  const f = COMPUESTOS_CENT[s.i]!;
  const comp = composicionCentesimal(f) ?? [];
  const M = masaMolar(f);
  const inicios = comp.map((_, k) => 60 + comp.slice(0, k).reduce((a, c) => a + (c.pct / 100) * 400, 0));
  return (
    <Frame
      stacked
      hint={block.hint ?? "El % de un elemento = (masa de ese elemento en 1 mol / masa molar) · 100."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Compuesto" items={COMPUESTOS_CENT.map((c, k) => ({ value: String(k), label: bonita(c) }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="Masa de la muestra" value={s.g} min={1} max={1000} step={1} unit=" g" color={MANIM.yellow} onChange={(g) => setS((o) => ({ ...o, g }))} />
        </>
      }
    >
      <Svg w={520} h={100} testId="centesimal" maxH={120}>
        {comp.map((c, k) => {
          const w = (c.pct / 100) * 400;
          const x = inicios[k]!;
          return (
            <g key={c.el}>
              <rect x={x} y={25} width={w} height={34} fill={COLORES[k % COLORES.length]} fillOpacity={0.85} />
              <text x={x + w / 2} y={47} textAnchor="middle" fill={MANIM.ink} fontSize={w > 40 ? 14 : 10} fontWeight={700}>{c.el}</text>
              <text x={x + w / 2} y={78} textAnchor="middle" fill={COLORES[k % COLORES.length]} fontSize={12}>{`${fmtEs(c.pct, 1)} %`}</text>
            </g>
          );
        })}
        <text x={60} y={16} fill={MANIM.muted} fontSize={11}>{`${bonita(f)} (M = ${fin(M, f1)} g/mol)`}</text>
      </Svg>
      <Readout>
        {comp.map((c, k) => (
          <Stat key={c.el} color={COLORES[k % COLORES.length]!} label={`${c.el}: ${c.n} × ${MASA_AT[c.el]} = ${fmtEs(c.masa, 1)} g de ${fmtEs(M, 1)}`}>{`${fmtEs(c.pct, 2)} % → ${fmtEs((c.pct * s.g) / 100, 2)} g en ${s.g} g`}</Stat>
        ))}
      </Readout>
      <Note>La <b>composición centesimal</b> indica el <b>porcentaje en masa</b> de cada elemento en un compuesto: <b>% = (n·A_r / M)·100</b>, donde n es el nº de átomos del elemento en la fórmula, A_r su masa atómica y M la masa molar del compuesto. Los porcentajes <b>suman 100</b>. Es una <b>propiedad del compuesto</b> (ley de las proporciones definidas de Proust): no depende de la cantidad de muestra. Sirve para saber la <b>masa de un elemento</b> en una muestra (masa del elemento = % · masa de la muestra / 100), para comparar abonos o minerales, y para determinar la <b>fórmula empírica</b> de un compuesto desconocido.</Note>
    </Frame>
  );
}

/* ───────────── 3. Fórmula empírica y molecular ───────────── */

export function FormulaEmpiricaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, PROBLEMAS_EMP.length - 1));
  const [i, setI] = useState(init);
  const pr = PROBLEMAS_EMP[i]!;
  const emp = formulaEmpirica(pr.datos.map((d) => ({ ...d })));
  const mol = emp ? formulaMolecular(emp, pr.M) : null;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pasa % a moles, divide por el menor y, si hace falta, multiplica para obtener enteros."}
      onReset={() => setI(init)}
      controls={<Choice label="Problema" items={PROBLEMAS_EMP.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Titulo f={emp ? emp.formula : "—"} sub={mol && mol.formula ? `fórmula molecular: ${mol.formula} (n = ${mol.n})` : "fórmula empírica"} id="formula-empirica" />
      <Readout>
        {emp && emp.pasos.map((p) => (
          <Stat key={p.el} color={MANIM.blue} label={`${p.el}: ${fmtEs(p.pct, 1)} % → ÷ ${p.masaAt} g/mol`}>{`${fmtEs(p.mol, 3)} mol → ÷ menor = ${fmtEs(p.razon, 2)} → ${p.entero}`}</Stat>
        ))}
        <Stat color={MANIM.yellow} label="Fórmula empírica">{emp ? `${emp.formula}${emp.mult > 1 ? ` (se multiplicó por ${emp.mult})` : ""} · M = ${fmtEs(emp.masaEmpirica, 1)} g/mol` : "no se pudo obtener"}</Stat>
        <Stat color={MANIM.green} label={`Con M = ${pr.M} g/mol: n = M/M_emp`}>{mol ? `${fmtEs(mol.n, 2)} → ${mol.formula ?? "no entero"}` : "—"}</Stat>
      </Readout>
      <Note>La <b>fórmula empírica</b> da la <b>proporción más sencilla</b> de átomos; la <b>molecular</b>, el número real de átomos de la molécula (múltiplo de la empírica). <b>Método</b>: <b>1)</b> toma 100 g de compuesto, de modo que cada % son gramos; <b>2)</b> pasa a <b>moles</b> (g / masa atómica); <b>3)</b> divide todos entre el <b>menor</b>; <b>4)</b> si salen decimales como 1,5 o 1,33, <b>multiplica</b> por 2 o por 3 para obtener enteros; <b>5)</b> con la <b>masa molar M</b>, calcula <b>n = M/M_empírica</b> y multiplica los subíndices. Ejemplo: C 40 %, H 6,7 %, O 53,3 % → 3,33 : 6,7 : 3,33 → 1 : 2 : 1 → empírica <b>CH₂O</b> (30 g/mol); con M = 180 → n = 6 → <b>C₆H₁₂O₆</b>. Hay compuestos distintos con la misma empírica (CH₂O: ácido acético y glucosa).</Note>
    </Frame>
  );
}

/* ───────────── 4. Estequiometría con pureza ───────────── */

export function EstequiometriaPurezaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 0, 0, REACCIONES_EB.length - 1)), o: 0, g: Math.round(num(block.params?.a, 200, 1, 1000)), p: Math.round(num(block.params?.b, 80, 10, 100)) };
  const [s, setS] = useState(init);
  const rx = REACCIONES_EB[s.r]!;
  const o = Math.min(s.o, rx.esp.length - 1);
  const c = calculoReaccion(rx, o, s.g, s.p);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pasa a masa pura, a moles, usa la relación de coeficientes y vuelve a gramos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES_EB.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.r)} onChange={(k) => setS((a) => ({ ...a, r: Number(k), o: 0 }))} />
          <Choice label="Sustancia de la que conoces la masa" items={rx.esp.map((e, k) => ({ value: String(k), label: bonita(e.f) }))} value={String(o)} onChange={(k) => setS((a) => ({ ...a, o: Number(k) }))} />
          <Slider label="Masa de la muestra" value={s.g} min={1} max={1000} step={1} unit=" g" color={MANIM.blue} onChange={(g) => setS((a) => ({ ...a, g }))} />
          <Slider label="Pureza" value={s.p} min={10} max={100} step={1} unit=" %" color={MANIM.orange} onChange={(p) => setS((a) => ({ ...a, p }))} />
        </>
      }
    >
      <Titulo f={ecuacionTexto(rx)} sub={conservaMasa(rx) ? "ajustada: la masa se conserva" : "no ajustada"} id="estequiometria-pureza" />
      <Readout>
        <Stat color={MANIM.orange} label={`Masa pura de ${bonita(rx.esp[o]!.f)}`}>{c ? `${fmtEs(c.masaPura, 2)} g (de ${s.g} g)` : "—"}</Stat>
        {c && c.tabla.map((e, k) => (
          <Stat key={e.f} color={k === o ? MANIM.yellow : e.lado === "r" ? MANIM.blue : MANIM.green} label={`${e.lado === "r" ? "Reactivo" : "Producto"} ${bonita(e.f)} (coef. ${e.c})`}>{`${fmtEs(e.mol, 3)} mol · ${fmtEs(e.masa, 2)} g`}</Stat>
        ))}
      </Readout>
      <Note>Una <b>ecuación ajustada</b> indica la <b>proporción en moles</b> entre reactivos y productos (los coeficientes) y cumple la <b>ley de Lavoisier</b> (la masa total se conserva). <b>Método</b> para cualquier cálculo: <b>1)</b> ajusta la ecuación; <b>2)</b> si la muestra no es pura, calcula la <b>masa pura</b> = masa · pureza/100; <b>3)</b> pasa a <b>moles</b> (n = m/M); <b>4)</b> usa la <b>relación molar</b> (n_B = n_A · c_B/c_A); <b>5)</b> vuelve a <b>gramos</b> (m = n·M). En una muestra al 80 %, solo reacciona el 80 % de la masa. Las impurezas se suponen inertes.</Note>
    </Frame>
  );
}
