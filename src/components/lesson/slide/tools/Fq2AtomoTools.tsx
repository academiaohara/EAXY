"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export type Tipo = "metal" | "no metal" | "metaloide" | "gas noble";
export const ELEMENTOS: { sim: string; nombre: string; masa: number; tipo: Tipo }[] = [
  { sim: "H", nombre: "Hidrógeno", masa: 1.008, tipo: "no metal" },
  { sim: "He", nombre: "Helio", masa: 4.003, tipo: "gas noble" },
  { sim: "Li", nombre: "Litio", masa: 6.94, tipo: "metal" },
  { sim: "Be", nombre: "Berilio", masa: 9.012, tipo: "metal" },
  { sim: "B", nombre: "Boro", masa: 10.81, tipo: "metaloide" },
  { sim: "C", nombre: "Carbono", masa: 12.011, tipo: "no metal" },
  { sim: "N", nombre: "Nitrógeno", masa: 14.007, tipo: "no metal" },
  { sim: "O", nombre: "Oxígeno", masa: 15.999, tipo: "no metal" },
  { sim: "F", nombre: "Flúor", masa: 18.998, tipo: "no metal" },
  { sim: "Ne", nombre: "Neón", masa: 20.18, tipo: "gas noble" },
  { sim: "Na", nombre: "Sodio", masa: 22.99, tipo: "metal" },
  { sim: "Mg", nombre: "Magnesio", masa: 24.305, tipo: "metal" },
  { sim: "Al", nombre: "Aluminio", masa: 26.982, tipo: "metal" },
  { sim: "Si", nombre: "Silicio", masa: 28.085, tipo: "metaloide" },
  { sim: "P", nombre: "Fósforo", masa: 30.974, tipo: "no metal" },
  { sim: "S", nombre: "Azufre", masa: 32.06, tipo: "no metal" },
  { sim: "Cl", nombre: "Cloro", masa: 35.45, tipo: "no metal" },
  { sim: "Ar", nombre: "Argón", masa: 39.948, tipo: "gas noble" },
  { sim: "K", nombre: "Potasio", masa: 39.098, tipo: "metal" },
  { sim: "Ca", nombre: "Calcio", masa: 40.078, tipo: "metal" },
];
/** Elemento de número atómico Z (1–20), o null. */
export const elemento = (Z: number) => ELEMENTOS[Math.round(Z) - 1] ?? null;
/** Neutrones del isótopo más abundante, aproximadamente: masa atómica redondeada − Z. */
export const neutronesTipicos = (Z: number) => {
  const e = elemento(Z);
  return e ? Math.round(e.masa) - Math.round(Z) : NaN;
};
/** Distribución de los electrones por capas (2, 8, 8, …) para un número de electrones. */
export function capas(electrones: number): number[] {
  const out: number[] = [];
  let r = Math.max(0, Math.round(electrones));
  for (const c of [2, 8, 8, 18]) {
    if (r <= 0) break;
    const k = Math.min(c, r);
    out.push(k);
    r -= k;
  }
  return out;
}
/** Grupo y periodo de un elemento de Z ≤ 20. */
export function posicionTabla(Z: number): { grupo: number; periodo: number } | null {
  const z = Math.round(Z);
  if (z < 1 || z > 20) return null;
  if (z === 1) return { grupo: 1, periodo: 1 };
  if (z === 2) return { grupo: 18, periodo: 1 };
  if (z <= 10) return { grupo: z <= 4 ? z - 2 : z + 8, periodo: 2 };
  if (z <= 18) return { grupo: z <= 12 ? z - 10 : z - 0, periodo: 3 };
  return { grupo: z - 18, periodo: 4 };
}
/** Electrones de valencia (última capa) de un átomo neutro de Z ≤ 20. */
export const electronesValencia = (Z: number) => {
  const c = capas(Z);
  return c.length ? c[c.length - 1]! : 0;
};

/** Superíndices y subíndices Unicode. */
export const sup = (s: string | number) => String(s).replace(/[0-9+\-−]/g, (c) => "⁰¹²³⁴⁵⁶⁷⁸⁹⁺⁻⁻"["0123456789+-−".indexOf(c)]!);
export const sub = (s: string | number) => String(s).replace(/[0-9]/g, (c) => "₀₁₂₃₄₅₆₇₈₉"[Number(c)]!);
/** Notación de una especie: A en superíndice, Z en subíndice, símbolo y carga (ej. ²³₁₁Na⁺). */
export function notacion(Z: number, A: number, carga: number) {
  const e = elemento(Z);
  if (!e) return "?";
  const c = carga === 0 ? "" : sup(`${Math.abs(carga) === 1 ? "" : Math.abs(carga)}${carga > 0 ? "+" : "−"}`);
  return `${sup(A)}${sub(Z)}${e.sim}${c}`;
}
/** Tipo de partícula según protones y electrones. */
export const tipoParticula = (p: number, e: number) => (p === e ? "átomo neutro" : p > e ? `catión (carga +${p - e})` : `anión (carga −${e - p})`);

export const MASAS: Record<string, number> = { H: 1, C: 12, N: 14, O: 16, Na: 23, Cl: 35.5, S: 32, Ca: 40, Mg: 24 };
/** Cuenta los átomos de cada elemento en una fórmula sencilla sin paréntesis (H2O, C6H12O6). */
export function contarAtomos(formula: string): Record<string, number> | null {
  const re = /([A-Z][a-z]?)(\d*)/g;
  const out: Record<string, number> = {};
  let resto = formula;
  let m: RegExpExecArray | null;
  while ((m = re.exec(formula)) !== null) {
    if (!m[0]) break;
    out[m[1]!] = (out[m[1]!] ?? 0) + (m[2] ? Number(m[2]) : 1);
    resto = resto.replace(m[0], "");
  }
  return Object.keys(out).length && resto.replace(/\s/g, "") === "" ? out : null;
}
export function masaMolecular(formula: string) {
  const c = contarAtomos(formula);
  if (!c) return NaN;
  let t = 0;
  for (const [el, n] of Object.entries(c)) {
    if (!(el in MASAS)) return NaN;
    t += MASAS[el]! * n;
  }
  return t;
}
export const SUSTANCIAS_FORMULA = [
  { f: "H2", nombre: "Hidrógeno", tipo: "molécula (sustancia simple)" },
  { f: "O2", nombre: "Oxígeno", tipo: "molécula (sustancia simple)" },
  { f: "H2O", nombre: "Agua", tipo: "molécula (compuesto)" },
  { f: "CO2", nombre: "Dióxido de carbono", tipo: "molécula (compuesto)" },
  { f: "CH4", nombre: "Metano", tipo: "molécula (compuesto)" },
  { f: "NH3", nombre: "Amoniaco", tipo: "molécula (compuesto)" },
  { f: "NaCl", nombre: "Cloruro de sodio", tipo: "red de iones (compuesto iónico)" },
  { f: "C6H12O6", nombre: "Glucosa", tipo: "molécula (compuesto)" },
] as const;

export const MODELOS = [
  { id: "dalton", nombre: "Dalton", anio: "1803", idea: "El átomo es una esfera maciza e indivisible.", limite: "No explica la electricidad ni que existan partículas más pequeñas." },
  { id: "thomson", nombre: "Thomson", anio: "1904", idea: "Esfera con carga positiva con electrones incrustados («pudin de pasas»).", limite: "No explica el resultado del experimento de Rutherford." },
  { id: "rutherford", nombre: "Rutherford", anio: "1911", idea: "Núcleo pequeño, denso y positivo; los electrones giran a su alrededor, en un átomo casi vacío.", limite: "No explica por qué los electrones no caen al núcleo." },
  { id: "bohr", nombre: "Bohr", anio: "1913", idea: "Los electrones giran en órbitas (capas) con energías definidas.", limite: "Solo funciona bien para el hidrógeno; el modelo actual es el cuántico." },
] as const;

/* ───────────── Dibujo de un átomo con capas ───────────── */

function AtomoBohr({ cx, cy, p, n, e, R = 90 }: { cx: number; cy: number; p: number; n: number; e: number; R?: number }) {
  const cs = capas(e);
  const nr = 12 + Math.min(14, (p + n) * 0.5);
  return (
    <>
      {cs.map((k, i) => {
        const r = nr + 16 + ((i + 1) * (R - nr - 16)) / Math.max(3, cs.length);
        return (
          <g key={i}>
            <circle cx={cx} cy={cy} r={r} fill="none" stroke={MANIM.grid} strokeWidth={1.6} />
            {Array.from({ length: k }, (_, j) => {
              const a = (2 * Math.PI * j) / k + i * 0.5;
              return <circle key={j} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={4.5} fill={MANIM.blue} />;
            })}
          </g>
        );
      })}
      <circle cx={cx} cy={cy} r={nr} fill={MANIM.red} fillOpacity={0.55} stroke={MANIM.red} strokeWidth={2} />
      <text x={cx} y={cy + 4} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>{`${p}p ${n}n`}</text>
    </>
  );
}

/* ───────────── 1. Modelos atómicos ───────────── */

export function ModelosAtomicosFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, MODELOS.length - 1)) };
  const [s, setS] = useState(init);
  const m = MODELOS[s.i]!;
  const cx = 150;
  const cy = 110;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada modelo atómico mejora al anterior porque explica hechos nuevos que este no podía explicar."}
      onReset={() => setS(init)}
      controls={<Choice label="Modelo" items={MODELOS.map((x, i) => ({ value: i, label: `${x.nombre} (${x.anio})` }))} value={s.i} onChange={(i) => setS({ i })} />}
    >
      <Svg w={520} h={220} testId="modelos-atomicos" maxH={240}>
        {m.id === "dalton" ? <circle cx={cx} cy={cy} r={70} fill={MANIM.orange} fillOpacity={0.75} stroke={MANIM.ink} strokeWidth={2.5} /> : null}
        {m.id === "thomson" ? (
          <>
            <circle cx={cx} cy={cy} r={80} fill={MANIM.red} fillOpacity={0.25} stroke={MANIM.red} strokeWidth={2.5} />
            {Array.from({ length: 9 }, (_, i) => <circle key={i} cx={cx + 44 * Math.cos(i * 2.1) * ((i % 3) * 0.4 + 0.3)} cy={cy + 44 * Math.sin(i * 2.1) * ((i % 3) * 0.4 + 0.3)} r={6} fill={MANIM.blue} />)}
          </>
        ) : null}
        {m.id === "rutherford" ? (
          <>
            <circle cx={cx} cy={cy} r={85} fill="none" stroke={MANIM.grid} strokeWidth={1.2} strokeDasharray="4 5" />
            <circle cx={cx} cy={cy} r={6} fill={MANIM.red} />
            {Array.from({ length: 4 }, (_, i) => <circle key={i} cx={cx + 80 * Math.cos(i * 1.6 + 0.4)} cy={cy + 80 * Math.sin(i * 1.6 + 0.4)} r={5} fill={MANIM.blue} />)}
          </>
        ) : null}
        {m.id === "bohr" ? <AtomoBohr cx={cx} cy={cy} p={3} n={4} e={3} R={90} /> : null}
        <text x={290} y={50} fill={MANIM.yellow} fontSize={20} fontWeight={700}>{`${m.nombre}, ${m.anio}`}</text>
        <text x={290} y={86} fill={MANIM.ink} fontSize={13}>{m.idea.length > 44 ? m.idea.slice(0, 44) + "…" : m.idea}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Modelo">{`${m.nombre} (${m.anio})`}</Stat>
        <Stat color={MANIM.green} label="Idea">{m.idea}</Stat>
        <Stat color={MANIM.red} label="Limitación">{m.limite}</Stat>
      </Readout>
      <Note>La idea de <b>átomo</b> (en griego, «sin división») es antigua, pero los modelos científicos aparecen en los siglos XIX y XX. <b>Dalton</b> propuso átomos como esferas macizas; <b>Thomson</b> descubrió el <b>electrón</b> y propuso un átomo con electrones incrustados en una esfera positiva; <b>Rutherford</b>, con su experimento de la lámina de oro, descubrió el <b>núcleo</b>: un átomo casi vacío; y <b>Bohr</b> colocó los electrones en <b>capas</b> con energía definida. El modelo actual, <b>cuántico</b>, habla de zonas de probabilidad (orbitales). Los modelos <b>no son la realidad</b>: son representaciones que se mejoran.</Note>
    </Frame>
  );
}

/* ───────────── 2. Construir un átomo ───────────── */

export function ConstruirAtomoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.a, 6, 1, 18)), n: Math.round(num(block.params?.b, 6, 0, 22)), e: Math.round(num(block.params?.c, 6, 0, 20)) };
  const [s, setS] = useState(init);
  const el = elemento(s.p);
  const A = s.p + s.n;
  const carga = s.p - s.e;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El número de protones (Z) define el elemento; protones más neutrones es el número másico (A); si hay distinto número de electrones, es un ion."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Protones (Z)" value={s.p} min={1} max={18} step={1} color={MANIM.red} onChange={(p) => setS((o) => ({ ...o, p }))} />
          <Slider label="Neutrones" value={s.n} min={0} max={22} step={1} color={MANIM.muted} onChange={(n) => setS((o) => ({ ...o, n }))} />
          <Slider label="Electrones" value={s.e} min={0} max={20} step={1} color={MANIM.blue} onChange={(e) => setS((o) => ({ ...o, e }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="construir-atomo" maxH={240}>
        <AtomoBohr cx={150} cy={110} p={s.p} n={s.n} e={s.e} />
        <text x={300} y={70} fill={MANIM.yellow} fontSize={34} fontWeight={700}>{notacion(s.p, A, carga)}</text>
        <text x={300} y={104} fill={MANIM.ink} fontSize={16}>{el ? `${el.nombre} (${el.tipo})` : "—"}</text>
        <text x={300} y={134} fill={MANIM.muted} fontSize={14}>{`Capas: ${capas(s.e).join(" · ") || "—"}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Número atómico Z (protones)">{`${s.p}`}</Stat>
        <Stat color={MANIM.muted} label="Número másico A = Z + N">{`${A}`}</Stat>
        <Stat color={MANIM.blue} label="Carga neta (p − e)">{`${carga > 0 ? "+" : ""}${carga}`}</Stat>
        <Stat color={MANIM.yellow} label="Tipo">{tipoParticula(s.p, s.e)}</Stat>
      </Readout>
      <Note>El <b>átomo</b> tiene un <b>núcleo</b> con <b>protones</b> (carga +) y <b>neutrones</b> (sin carga), y una <b>corteza</b> con <b>electrones</b> (carga −), mucho más ligeros. El <b>número atómico Z</b> es el de protones y <b>identifica el elemento</b>. El <b>número másico A</b> es protones + neutrones. Un átomo <b>neutro</b> tiene tantos electrones como protones. Los electrones se reparten en <b>capas</b>: 2 en la primera, hasta 8 en la segunda, hasta 8 en la tercera (en los primeros 20 elementos).</Note>
    </Frame>
  );
}

/* ───────────── 3. Iones e isótopos ───────────── */

export function IonesIsotoposFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { Z: Math.round(num(block.params?.a, 11, 1, 20)), dn: Math.round(num(block.params?.b, 0, -1, 2)), q: Math.round(num(block.params?.c, 1, -3, 3)) };
  const [s, setS] = useState(init);
  const el = elemento(s.Z);
  const N = Math.max(0, neutronesTipicos(s.Z) + s.dn);
  const A = s.Z + N;
  const e = s.Z - s.q;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambiar los neutrones da un isótopo (mismo elemento, distinta masa); cambiar los electrones da un ion (distinta carga)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número atómico Z" value={s.Z} min={1} max={20} step={1} color={MANIM.red} onChange={(Z) => setS((o) => ({ ...o, Z }))} />
          <Slider label="Neutrones de más o de menos (isótopos)" value={s.dn} min={-1} max={2} step={1} color={MANIM.muted} onChange={(dn) => setS((o) => ({ ...o, dn }))} />
          <Slider label="Carga del ion (electrones perdidos +, ganados −)" value={s.q} min={-3} max={3} step={1} color={MANIM.blue} onChange={(q) => setS((o) => ({ ...o, q }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="iones-isotopos" maxH={240}>
        <AtomoBohr cx={150} cy={110} p={s.Z} n={N} e={Math.max(0, e)} />
        <text x={300} y={72} fill={MANIM.yellow} fontSize={34} fontWeight={700}>{notacion(s.Z, A, s.q)}</text>
        <text x={300} y={106} fill={MANIM.ink} fontSize={16}>{el ? el.nombre : "—"}</text>
        <text x={300} y={134} fill={MANIM.muted} fontSize={14}>{`${s.Z} p · ${N} n · ${Math.max(0, e)} e`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Isótopo">{s.dn === 0 ? "el más abundante" : `con ${Math.abs(s.dn)} neutrón(es) ${s.dn > 0 ? "de más" : "de menos"}`}</Stat>
        <Stat color={MANIM.blue} label="Ion">{tipoParticula(s.Z, Math.max(0, e))}</Stat>
        <Stat color={MANIM.muted} label="Número másico A">{`${A}`}</Stat>
      </Readout>
      <Note>Los <b>isótopos</b> son átomos del <b>mismo elemento</b> (mismo Z) con <b>distinto número de neutrones</b> y, por tanto, distinto número másico: el hidrógeno tiene 0, 1 o 2 neutrones (protio, deuterio y tritio). Un <b>ion</b> es un átomo que ha <b>ganado o perdido electrones</b>: si pierde, queda con carga positiva (<b>catión</b>, como Na⁺); si gana, con carga negativa (<b>anión</b>, como Cl⁻). Cambiar los electrones <b>no cambia el elemento</b>; cambiar los protones, sí.</Note>
    </Frame>
  );
}

/* ───────────── 4. Tabla periódica (primeros 20 elementos) ───────────── */

const COLOR_TIPO: Record<Tipo, string> = { metal: MANIM.orange, "no metal": MANIM.green, metaloide: MANIM.purple, "gas noble": MANIM.blue };

export function TablaPeriodicaFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { Z: Math.round(num(block.params?.a, 11, 1, 20)) };
  const [s, setS] = useState(init);
  const el = elemento(s.Z)!;
  const pos = posicionTabla(s.Z)!;
  const cw = 24;
  const ch = 28;
  const x0 = 20;
  const y0 = 24;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las columnas son los grupos y las filas, los periodos; los elementos de un mismo grupo tienen los mismos electrones en la última capa."}
      onReset={() => setS(init)}
      controls={<Slider label="Número atómico Z" value={s.Z} min={1} max={20} step={1} color={MANIM.red} onChange={(Z) => setS({ Z })} />}
    >
      <Svg w={520} h={180} testId="tabla-periodica" maxH={200}>
        {ELEMENTOS.map((e, i) => {
          const p = posicionTabla(i + 1)!;
          const x = x0 + (p.grupo - 1) * cw;
          const y = y0 + (p.periodo - 1) * ch;
          const sel = i + 1 === s.Z;
          return (
            <g key={e.sim}>
              <rect x={x} y={y} width={cw - 2} height={ch - 2} rx={3} fill={COLOR_TIPO[e.tipo]} fillOpacity={sel ? 0.9 : 0.3} stroke={sel ? MANIM.ink : COLOR_TIPO[e.tipo]} strokeWidth={sel ? 2.5 : 1} />
              <text x={x + (cw - 2) / 2} y={y + 17} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>{e.sim}</text>
            </g>
          );
        })}
        {Array.from({ length: 18 }, (_, g) => <text key={g} x={x0 + g * cw + 11} y={14} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{g + 1}</text>)}
        {[1, 2, 3, 4].map((p) => <text key={p} x={8} y={y0 + (p - 1) * ch + 18} textAnchor="middle" fill={MANIM.muted} fontSize={9}>{p}</text>)}
        <text x={x0 + 4 * cw} y={y0 + 1 * ch + 14} fill={MANIM.yellow} fontSize={14} fontWeight={700}>{`${el.nombre} (${el.sim})`}</text>
        <text x={x0 + 4 * cw} y={y0 + 2 * ch + 4} fill={MANIM.muted} fontSize={12}>{`Z = ${s.Z} · grupo ${pos.grupo} · periodo ${pos.periodo}`}</text>
        <Seg a={[x0, 154]} b={[x0 + 18 * cw, 154]} color={MANIM.grid} width={1} />
        {(Object.keys(COLOR_TIPO) as Tipo[]).map((t, i) => (
          <g key={t}>
            <rect x={x0 + i * 110} y={162} width={10} height={10} fill={COLOR_TIPO[t]} />
            <text x={x0 + 14 + i * 110} y={171} fill={MANIM.muted} fontSize={10}>{t}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Elemento">{`${el.nombre} (${el.sim})`}</Stat>
        <Stat color={MANIM.green} label="Tipo">{el.tipo}</Stat>
        <Stat color={MANIM.blue} label="Electrones por capas">{capas(s.Z).join(" · ")}</Stat>
        <Stat color={MANIM.purple} label="Electrones de valencia">{`${electronesValencia(s.Z)}`}</Stat>
        <Stat color={MANIM.muted} label="Masa atómica">{`${f2(el.masa)} u`}</Stat>
      </Readout>
      <Note>La <b>tabla periódica</b> ordena los elementos por <b>número atómico creciente</b>. Las <b>filas</b> son los <b>periodos</b> (coinciden con el número de capas con electrones) y las <b>columnas</b>, los <b>grupos</b>: los elementos de un grupo tienen el <b>mismo número de electrones en la última capa</b> y por eso propiedades parecidas. Se clasifican en <b>metales</b> (brillantes, conducen la electricidad), <b>no metales</b>, <b>metaloides</b> y <b>gases nobles</b> (muy poco reactivos, con la última capa completa). Aquí se muestran los 20 primeros.</Note>
    </Frame>
  );
}

/* ───────────── 5. Fórmulas, moléculas y masa molecular ───────────── */

export function FormulasMoleculasFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 2, 0, SUSTANCIAS_FORMULA.length - 1)) };
  const [s, setS] = useState(init);
  const su = SUSTANCIAS_FORMULA[s.i]!;
  const conteo = contarAtomos(su.f) ?? {};
  const total = Object.values(conteo).reduce((a, b) => a + b, 0);
  const colores = [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple];
  return (
    <Frame
      stacked
      hint={block.hint ?? "La fórmula dice qué elementos hay y cuántos átomos de cada uno; los subíndices indican la cantidad."}
      onReset={() => setS(init)}
      controls={<Choice label="Sustancia" items={SUSTANCIAS_FORMULA.map((x, i) => ({ value: i, label: `${x.nombre} (${x.f.replace(/\d+/g, (d) => sub(d))})` }))} value={s.i} onChange={(i) => setS({ i })} />}
    >
      <Svg w={520} h={160} testId="formulas-moleculas" maxH={180}>
        <text x={30} y={56} fill={MANIM.yellow} fontSize={40} fontWeight={700}>{su.f.replace(/\d+/g, (d) => sub(d))}</text>
        <text x={30} y={86} fill={MANIM.ink} fontSize={14}>{su.nombre}</text>
        {Object.entries(conteo).map(([el, n], i) => (
          <g key={el}>
            {Array.from({ length: Math.min(n, 12) }, (_, k) => (
              <circle key={k} cx={230 + k * 20} cy={46 + i * 36} r={8} fill={colores[i % 4]} />
            ))}
            <text x={230} y={72 + i * 36 - 6} fill={MANIM.muted} fontSize={11}>{`${el}: ${n}`}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Átomos en total">{`${total}`}</Stat>
        <Stat color={MANIM.blue} label="Elementos distintos">{`${Object.keys(conteo).length}`}</Stat>
        <Stat color={MANIM.orange} label="Masa molecular / de la unidad fórmula">{`${f2(masaMolecular(su.f))} u`}</Stat>
        <Stat color={MANIM.yellow} label="Tipo">{su.tipo}</Stat>
      </Readout>
      <Note>Una <b>molécula</b> es un grupo de átomos unidos; se representa con una <b>fórmula</b>: los <b>símbolos</b> indican los elementos y los <b>subíndices</b>, cuántos átomos de cada uno (H₂O: 2 de hidrógeno y 1 de oxígeno). Las sustancias formadas por <b>un solo elemento</b> (H₂, O₂) son <b>sustancias simples</b>; las de varios, <b>compuestos</b>. En los compuestos <b>iónicos</b>, como la sal (NaCl), no hay moléculas sino una <b>red de iones</b>; la fórmula da la proporción. La <b>masa molecular</b> es la suma de las masas atómicas (en unidades de masa atómica, u), con valores aproximados.</Note>
    </Frame>
  );
}
