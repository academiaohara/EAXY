"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { masaMolar } from "@/components/lesson/slide/tools/Fb1CantidadTools";

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

export const R = 0.082; // atm·L/(mol·K)
export const R_SI = 8.314; // J/(mol·K)
export const NA = 6.022e23;
export const ATM_PA = 101325;

/** Ley de Boyle (T y n constantes): P₁V₁ = P₂V₂ → P₂. */
export const boyle = (P1: number, V1: number, V2: number): number => (V2 > 0 ? (P1 * V1) / V2 : NaN);
/** Ley de Charles (P y n constantes): V₁/T₁ = V₂/T₂ → V₂ (T en kelvin). */
export const charles = (V1: number, T1: number, T2: number): number => (T1 > 0 ? (V1 * T2) / T1 : NaN);
/** Ley de Gay-Lussac (V y n constantes): P₁/T₁ = P₂/T₂ → P₂. */
export const gayLussac = (P1: number, T1: number, T2: number): number => (T1 > 0 ? (P1 * T2) / T1 : NaN);
/** Ley de Avogadro (P y T constantes): V₁/n₁ = V₂/n₂ → V₂. */
export const avogadro = (V1: number, n1: number, n2: number): number => (n1 > 0 ? (V1 * n2) / n1 : NaN);
/** Ley combinada: P₁V₁/T₁ = P₂V₂/T₂ → V₂. */
export const combinada = (P1: number, V1: number, T1: number, P2: number, T2: number): number => (T1 > 0 && P2 > 0 ? (P1 * V1 * T2) / (T1 * P2) : NaN);
export const aKelvin = (c: number): number => c + 273.15;

/** Ecuación de los gases ideales: cada magnitud despejada (P en atm, V en L, T en K, n en mol). */
export const presionGas = (n: number, T: number, V: number): number => (V > 0 ? (n * R * T) / V : NaN);
export const volumenGas = (n: number, T: number, P: number): number => (P > 0 ? (n * R * T) / P : NaN);
export const molesGas = (P: number, V: number, T: number): number => (T > 0 ? (P * V) / (R * T) : NaN);
export const temperaturaGas = (P: number, V: number, n: number): number => (n > 0 ? (P * V) / (n * R) : NaN);
/** Densidad (g/L) de un gas: d = P·M/(R·T). Masa molar de un gas a partir de su densidad: M = d·R·T/P. */
export const densidadGas = (P: number, M: number, T: number): number => (T > 0 ? (P * M) / (R * T) : NaN);
export const masaMolarDesdeDensidad = (d: number, T: number, P: number): number => (P > 0 ? (d * R * T) / P : NaN);

export const GASES = [
  { f: "H2", nombre: "hidrógeno" }, { f: "He", nombre: "helio", M: 4 }, { f: "N2", nombre: "nitrógeno" }, { f: "O2", nombre: "oxígeno" },
  { f: "CO2", nombre: "dióxido de carbono" }, { f: "NH3", nombre: "amoníaco" }, { f: "Cl2", nombre: "cloro" }, { f: "CH4", nombre: "metano" },
] as const;
export const masaGas = (f: string): number => ((GASES.find((g) => g.f === f) as { M?: number } | undefined)?.M ?? masaMolar(f));
const bonita = (f: string): string => f.replace(/[0-9]+/g, (d) => d.replace(/[0-9]/g, (c) => "₀₁₂₃₄₅₆₇₈₉"[Number(c)]!));

/** Mezcla de gases (Dalton): presiones parciales, fracciones molares y %, a partir de los moles de cada gas, T (K) y V (L). */
export function mezclaGases(componentes: { f: string; n: number }[], T: number, V: number) {
  const nT = componentes.reduce((s, c) => s + Math.max(0, c.n), 0);
  const P = presionGas(nT, T, V);
  const masaT = componentes.reduce((s, c) => s + Math.max(0, c.n) * masaGas(c.f), 0);
  return {
    nT,
    P,
    masaT,
    comp: componentes.map((c) => {
      const x = nT > 0 ? Math.max(0, c.n) / nT : NaN;
      return { f: c.f, n: c.n, x, P: x * P, masa: Math.max(0, c.n) * masaGas(c.f), pctMasa: masaT > 0 ? (Math.max(0, c.n) * masaGas(c.f) * 100) / masaT : NaN };
    }),
  };
}

/** Concentraciones de una disolución a partir de la masa de soluto (g), su masa molar, el volumen de disolución (L) y su densidad (g/mL). */
export function concentraciones(ms: number, M: number, Vl: number, dens: number) {
  const n = ms / M;
  const mDis = Vl * 1000 * dens;
  const mDisolvente = mDis - ms;
  const nAgua = mDisolvente / 18;
  return {
    n,
    mDis,
    mDisolvente,
    molaridad: Vl > 0 ? n / Vl : NaN,
    gPorL: Vl > 0 ? ms / Vl : NaN,
    pctMasa: mDis > 0 ? (ms * 100) / mDis : NaN,
    pctMasaVol: Vl > 0 ? (ms * 100) / (Vl * 1000) : NaN,
    molalidad: mDisolvente > 0 ? n / (mDisolvente / 1000) : NaN,
    fraccionMolar: n + nAgua > 0 ? n / (n + nAgua) : NaN,
  };
}
export const SOLUTOS = [
  { f: "NaCl", nombre: "cloruro de sodio", i: 2 }, { f: "NaOH", nombre: "hidróxido de sodio", i: 2 }, { f: "H2SO4", nombre: "ácido sulfúrico", i: 3 },
  { f: "C6H12O6", nombre: "glucosa", i: 1 }, { f: "KMnO4", nombre: "permanganato de potasio", i: 2 }, { f: "CaCl2", nombre: "cloruro de calcio", i: 3 },
  { f: "C12H22O11", nombre: "sacarosa", i: 1 }, { f: "HCl", nombre: "ácido clorhídrico", i: 2 },
] as const;
export const MASA_SOLUTO = (f: string): number => {
  // masas atómicas redondeadas usadas en el curso; C12H22O11 = 342
  return masaMolar(f);
};

/** Dilución: C₁·V₁ = C₂·V₂. */
export const volumenFinal = (C1: number, V1: number, C2: number): number => (C2 > 0 ? (C1 * V1) / C2 : NaN);
export const concentracionFinal = (C1: number, V1: number, V2: number): number => (V2 > 0 ? (C1 * V1) / V2 : NaN);
/** Volumen de disolución concentrada que hay que tomar para preparar V₂ de concentración C₂. */
export const volumenAlicuota = (C2: number, V2: number, C1: number): number => (C1 > 0 ? (C2 * V2) / C1 : NaN);

/** Propiedades coligativas del agua: ΔT_e = K_e·m·i, ΔT_c = K_c·m·i, π = M·R·T·i (atm). */
export const KE_AGUA = 0.52;
export const KC_AGUA = 1.86;
export const ascensoEbulloscopico = (m: number, i: number): number => KE_AGUA * m * i;
export const descensoCrioscopico = (m: number, i: number): number => KC_AGUA * m * i;
export const presionOsmotica = (M: number, T: number, i: number): number => M * R * T * i;
/** Descenso relativo de la presión de vapor (ley de Raoult): ΔP/P° = x_soluto. */
export const descensoRelativoVapor = (xs: number): number => xs;

/* ───────────── Dibujo ───────────── */

function Titulo({ f, sub: s, id }: { f: string; sub?: string; id: string }) {
  return (
    <Svg w={520} h={90} testId={id} maxH={110}>
      <text x={260} y={48} textAnchor="middle" fill={MANIM.yellow} fontSize={f.length > 16 ? 24 : 32} fontWeight={700}>{f}</text>
      {s && <text x={260} y={78} textAnchor="middle" fill={MANIM.muted} fontSize={13}>{s}</text>}
    </Svg>
  );
}

/* ───────────── 1. Leyes de los gases ───────────── */

type Ley = "boyle" | "charles" | "gay" | "avogadro";
const LEYES: { id: Ley; nombre: string; fija: string }[] = [
  { id: "boyle", nombre: "Boyle", fija: "T y n constantes" },
  { id: "charles", nombre: "Charles", fija: "P y n constantes" },
  { id: "gay", nombre: "Gay-Lussac", fija: "V y n constantes" },
  { id: "avogadro", nombre: "Avogadro", fija: "P y T constantes" },
];

export function LeyesGasesFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { ley: Math.round(num(block.params?.n, 0, 0, 3)), x: num(block.params?.a, 1, 0.25, 4) };
  const [s, setS] = useState(init);
  const ley = LEYES[s.ley]!;
  const P1 = 1;
  const V1 = 10;
  const T1 = 300;
  const n1 = 0.4;
  const [lab, v0, v1, unidad] = ley.id === "boyle" ? ["Volumen V₂", V1, V1 * s.x, "L"] : ley.id === "charles" ? ["Temperatura T₂", T1, T1 * s.x, "K"] : ley.id === "gay" ? ["Temperatura T₂", T1, T1 * s.x, "K"] : ["Cantidad n₂", n1, n1 * s.x, "mol"];
  const resultado = ley.id === "boyle" ? boyle(P1, V1, v1) : ley.id === "charles" ? charles(V1, T1, v1) : ley.id === "gay" ? gayLussac(P1, T1, v1) : avogadro(V1, n1, v1);
  const etiquetaRes = ley.id === "boyle" ? "Presión P₂" : ley.id === "charles" ? "Volumen V₂" : ley.id === "gay" ? "Presión P₂" : "Volumen V₂";
  const unRes = etiquetaRes.startsWith("Presión") ? "atm" : "L";
  const vol = ley.id === "boyle" ? v1 : ley.id === "charles" ? resultado : ley.id === "avogadro" ? resultado : V1;
  const w = Math.max(60, Math.min(300, 18 * vol));
  const nPart = Math.round((ley.id === "avogadro" ? v1 : n1) * 40);
  const fv = ley.id === "charles" || ley.id === "gay" ? v1 / T1 : 1;
  const flecha = unRes === "atm" ? Math.min(80, 25 * resultado) : 25;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada ley relaciona dos variables con las otras dos constantes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Ley" items={LEYES.map((l, k) => ({ value: String(k), label: l.nombre }))} value={String(s.ley)} onChange={(k) => setS({ ley: Number(k), x: 1 })} />
          <Slider label={`${lab} (inicial ${fmtEs(v0, 1)} ${unidad})`} value={s.x} min={0.25} max={4} step={0.05} color={MANIM.orange} format={(v) => `× ${fmtEs(v, 2)}`} onChange={(x) => setS((o) => ({ ...o, x }))} />
        </>
      }
    >
      <Svg w={520} h={120} testId="leyes-gases" maxH={140}>
        <rect x={60} y={20} width={w} height={70} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <rect x={60 + w} y={20} width={8} height={70} fill={MANIM.muted} />
        {Array.from({ length: Math.min(60, nPart) }, (_, k) => {
          const px = 66 + ((k * 0.618034) % 1) * (w - 12);
          const py = 28 + ((k * 0.7548776) % 1) * 54;
          return <Dot key={k} p={[px, py]} r={3.2} color={MANIM.blue} />;
        })}
        <Seg a={[60 + w + 14, 55]} b={[60 + w + 14 + (Number.isFinite(flecha) ? flecha : 0), 55]} color={MANIM.red} width={3} />
        <text x={60} y={112} fill={MANIM.muted} fontSize={11}>{`${ley.nombre}: ${ley.fija} · vel. media relativa ${fmtEs(Math.sqrt(fv), 2)}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={lab}>{`${fmtEs(v1, 2)} ${unidad}${ley.id === "charles" || ley.id === "gay" ? ` (${fmtEs(Math.round(v1 - 273.15) || 0, 0)} °C)` : ""}`}</Stat>
        <Stat color={MANIM.green} label={etiquetaRes}>{`${fin(resultado, f2)} ${unRes}`}</Stat>
        <Stat color={MANIM.blue} label="Relación entre magnitudes">{ley.id === "boyle" ? "P·V = constante (P ∝ 1/V)" : ley.id === "charles" ? "V/T = constante (V ∝ T)" : ley.id === "gay" ? "P/T = constante (P ∝ T)" : "V/n = constante (V ∝ n)"}</Stat>
        <Stat color={MANIM.purple} label="Estado inicial">{`P₁ = ${fmtEs(P1, 0)} atm · V₁ = ${fmtEs(V1, 0)} L · T₁ = ${fmtEs(T1, 0)} K · n₁ = ${fmtEs(n1, 1)} mol`}</Stat>
      </Readout>
      <Note>Las <b>variables de estado</b> de un gas son <b>presión P</b> (atm, Pa, mmHg; 1 atm = 101 325 Pa = 760 mmHg), <b>volumen V</b> (L, m³), <b>temperatura T</b> (<b>siempre en kelvin</b>: K = °C + 273,15) y <b>cantidad n</b> (mol). Los gases tienen un modelo cinético: partículas en movimiento caótico que chocan con las paredes (la <b>presión</b>) y cuya energía cinética media es proporcional a la <b>temperatura</b>. <b>Boyle</b>: a T constante, P·V = cte. <b>Charles</b>: a P constante, V/T = cte. <b>Gay-Lussac</b>: a V constante, P/T = cte. <b>Avogadro</b>: a P y T constantes, V/n = cte (1 mol de cualquier gas ocupa lo mismo). Se combinan en P₁V₁/T₁ = P₂V₂/T₂.</Note>
    </Frame>
  );
}

/* ───────────── 2. Gas ideal ───────────── */

export function GasIdealFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { g: Math.round(num(block.params?.n, 2, 0, GASES.length - 1)), T: Math.round(num(block.params?.a, 273, 100, 600)), P: num(block.params?.b, 1, 0.1, 10), V: num(block.params?.c, 22.4, 1, 100) };
  const [s, setS] = useState(init);
  const gas = GASES[s.g]!;
  const M = masaGas(gas.f);
  const n = molesGas(s.P, s.V, s.T);
  const masa = n * M;
  const d = densidadGas(s.P, M, s.T);
  return (
    <Frame
      stacked
      hint={block.hint ?? "P·V = n·R·T con R = 0,082 atm·L/(mol·K): P en atm, V en L, T en K."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Gas" items={GASES.map((x, k) => ({ value: String(k), label: bonita(x.f) }))} value={String(s.g)} onChange={(k) => setS((o) => ({ ...o, g: Number(k) }))} />
          <Slider label="Temperatura" value={s.T} min={100} max={600} step={1} unit=" K" color={MANIM.red} onChange={(T) => setS((o) => ({ ...o, T }))} />
          <Slider label="Presión" value={s.P} min={0.1} max={10} step={0.1} unit=" atm" color={MANIM.blue} format={f1} onChange={(P) => setS((o) => ({ ...o, P }))} />
          <Slider label="Volumen" value={s.V} min={1} max={100} step={0.5} unit=" L" color={MANIM.green} format={f1} onChange={(V) => setS((o) => ({ ...o, V }))} />
        </>
      }
    >
      <Titulo f="P · V = n · R · T" sub={`${bonita(gas.f)} (${gas.nombre}) · M = ${fmtEs(M, 1)} g/mol · T = ${s.T} K = ${fmtEs(Math.round(s.T - 273.15) || 0, 0)} °C`} id="gas-ideal" />
      <Readout>
        <Stat color={MANIM.orange} label="Cantidad de gas n = PV/(RT)">{`${fin(n, f3)} mol`}</Stat>
        <Stat color={MANIM.blue} label="Masa m = n·M">{`${fin(masa, f2)} g`}</Stat>
        <Stat color={MANIM.green} label="Densidad d = P·M/(R·T)">{`${fin(d, f3)} g/L`}</Stat>
        <Stat color={MANIM.purple} label="Nº de moléculas">{cient(n * NA)}</Stat>
        <Stat color={MANIM.yellow} label="Volumen molar en estas condiciones">{`${fin(volumenGas(1, s.T, s.P), f2)} L/mol`}</Stat>
      </Readout>
      <Note>Un <b>gas ideal</b> cumple <b>P·V = n·R·T</b> con <b>R = 0,082 atm·L/(mol·K)</b> (= 8,314 J/(mol·K)): partículas puntuales sin interacciones entre sí. Se aproxima bien a <b>baja presión y alta temperatura</b>. A partir de ella: <b>n = m/M</b> → <b>P·V = (m/M)·R·T</b>; la <b>densidad</b> es <b>d = P·M/(R·T)</b>, y la <b>masa molar</b> M = d·R·T/P. En <b>condiciones normales</b> (0 °C y 1 atm) 1 mol ocupa <b>22,4 L</b> (volumen molar). Los gases más densos que el aire (M &gt; 29 g/mol: CO₂, Cl₂) se acumulan abajo; los menos densos (H₂, He, CH₄), arriba.</Note>
    </Frame>
  );
}

/* ───────────── 3. Mezclas de gases (Dalton) ───────────── */

const MEZCLAS = [
  { nombre: "Aire (simplificado)", c: [{ f: "N2", n: 78 }, { f: "O2", n: 21 }, { f: "CO2", n: 1 }] },
  { nombre: "Buceo (nitrox)", c: [{ f: "N2", n: 68 }, { f: "O2", n: 32 }, { f: "CO2", n: 0 }] },
  { nombre: "Atmósfera de Venus", c: [{ f: "N2", n: 3.5 }, { f: "O2", n: 0 }, { f: "CO2", n: 96.5 }] },
] as const;

export function MezclaGasesFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), nN: 0, nO: 0, nC: 0, T: 298, V: 10, libre: false, a: 0.78, b: 0.21, c: 0.01 };
  const [s, setS] = useState(init);
  const preset = MEZCLAS[s.m]!;
  const base = s.libre ? [{ f: "N2", n: s.a }, { f: "O2", n: s.b }, { f: "CO2", n: s.c }] : preset.c.map((x) => ({ f: x.f, n: x.n / 100 }));
  const r = mezclaGases(base, s.T, s.V);
  const COLORES = [MANIM.blue, MANIM.orange, MANIM.green];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada gas ejerce la presión que ejercería si estuviera solo en el recipiente: P_i = x_i · P_total."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Mezcla" items={[...MEZCLAS.map((x, k) => ({ value: String(k), label: x.nombre })), { value: "lib", label: "personalizada" }]} value={s.libre ? "lib" : String(s.m)} onChange={(k) => setS((o) => (k === "lib" ? { ...o, libre: true } : { ...o, libre: false, m: Number(k) }))} />
          {s.libre && (
            <>
              <Slider label="Moles de N₂" value={s.a} min={0} max={1} step={0.01} color={MANIM.blue} format={f2} onChange={(a) => setS((o) => ({ ...o, a }))} />
              <Slider label="Moles de O₂" value={s.b} min={0} max={1} step={0.01} color={MANIM.orange} format={f2} onChange={(b) => setS((o) => ({ ...o, b }))} />
              <Slider label="Moles de CO₂" value={s.c} min={0} max={1} step={0.01} color={MANIM.green} format={f2} onChange={(c) => setS((o) => ({ ...o, c }))} />
            </>
          )}
          <Slider label="Temperatura" value={s.T} min={200} max={500} step={1} unit=" K" color={MANIM.red} onChange={(T) => setS((o) => ({ ...o, T }))} />
          <Slider label="Volumen del recipiente" value={s.V} min={1} max={50} step={1} unit=" L" color={MANIM.purple} onChange={(V) => setS((o) => ({ ...o, V }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="mezcla-gases" maxH={100}>
        {(() => {
          const x0s = r.comp.map((_, k) => 60 + r.comp.slice(0, k).reduce((a, c) => a + (Number.isFinite(c.x) ? c.x : 0) * 400, 0));
          return r.comp.map((c, k) => {
            const w = (Number.isFinite(c.x) ? c.x : 0) * 400;
            return (
              <g key={c.f}>
                <rect x={x0s[k]} y={20} width={w} height={30} fill={COLORES[k]} fillOpacity={0.85} />
                {w > 28 && <text x={x0s[k]! + w / 2} y={40} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{bonita(c.f)}</text>}
              </g>
            );
          });
        })()}
        <text x={60} y={72} fill={MANIM.muted} fontSize={11}>fracciones molares (x_i = n_i/n_total)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Presión total P = n_T·R·T/V">{`${fin(r.P, f3)} atm`}</Stat>
        {r.comp.map((c, k) => (
          <Stat key={c.f} color={COLORES[k]!} label={`${bonita(c.f)}: x = ${fin(c.x, f3)}`}>{`P parcial = ${fin(c.P, f3)} atm · ${fin(c.pctMasa, f1)} % en masa`}</Stat>
        ))}
        <Stat color={MANIM.purple} label="Moles totales · masa total">{`${fin(r.nT, f3)} mol · ${fin(r.masaT, f2)} g`}</Stat>
      </Readout>
      <Note>En una <b>mezcla de gases ideales</b> cada gas se comporta como si ocupara él solo todo el recipiente. <b>Ley de Dalton</b>: la presión total es la suma de las <b>presiones parciales</b>, <b>P = ΣPᵢ</b>, y <b>Pᵢ = xᵢ·P</b>, donde la <b>fracción molar xᵢ = nᵢ/n_total</b> (suma 1). Cada presión parcial cumple Pᵢ·V = nᵢ·R·T. Para los gases, la fracción molar coincide con la fracción en <b>volumen</b> (Avogadro), pero no con el porcentaje en <b>masa</b>. En el aire, el O₂ (21 %) tiene una presión parcial de ≈ 0,21 atm. La masa molar media del aire es ≈ 29 g/mol. Composiciones simplificadas.</Note>
    </Frame>
  );
}

/* ───────────── 4. Concentración de disoluciones ───────────── */

export function ConcentracionFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, SOLUTOS.length - 1)), g: Math.round(num(block.params?.a, 20, 1, 200)), V: num(block.params?.b, 0.5, 0.05, 2), d: num(block.params?.c, 1.05, 0.9, 1.5) };
  const [s, setS] = useState(init);
  const so = SOLUTOS[s.i]!;
  const M = MASA_SOLUTO(so.f);
  const c = concentraciones(s.g, M, s.V, s.d);
  const valida = c.mDisolvente > 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Molaridad = moles de soluto por litro de disolución; % en masa = gramos de soluto por 100 g de disolución."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Soluto" items={SOLUTOS.map((x, k) => ({ value: String(k), label: bonita(x.f) }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="Masa de soluto" value={s.g} min={1} max={200} step={1} unit=" g" color={MANIM.blue} onChange={(g) => setS((o) => ({ ...o, g }))} />
          <Slider label="Volumen de disolución" value={s.V} min={0.05} max={2} step={0.05} unit=" L" color={MANIM.green} format={f2} onChange={(V) => setS((o) => ({ ...o, V }))} />
          <Slider label="Densidad de la disolución" value={s.d} min={0.9} max={1.5} step={0.01} unit=" g/mL" color={MANIM.orange} format={f2} onChange={(d) => setS((o) => ({ ...o, d }))} />
        </>
      }
    >
      <Titulo f={bonita(so.f)} sub={`${so.nombre} · M = ${fmtEs(M, 1)} g/mol · ${fmtEs(c.n, 3)} mol en ${fmtEs(s.V, 2)} L`} id="concentracion" />
      <Readout>
        <Stat color={MANIM.yellow} label="Molaridad M = n/V (mol/L)">{valida ? fin(c.molaridad, f3) : "—"}</Stat>
        <Stat color={MANIM.blue} label="Concentración en masa (g/L)">{valida ? fin(c.gPorL, f1) : "—"}</Stat>
        <Stat color={MANIM.orange} label="% en masa (g soluto / 100 g disolución)">{valida ? `${fin(c.pctMasa, f2)} %` : "datos incoherentes: más soluto que disolución"}</Stat>
        <Stat color={MANIM.green} label="% masa/volumen (g / 100 mL)">{valida ? `${fin(c.pctMasaVol, f2)} %` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Molalidad m (mol/kg disolvente) · fracción molar">{valida ? `${fin(c.molalidad, f3)} · ${fin(c.fraccionMolar, (x) => fmtEs(x, 4))}` : "—"}</Stat>
      </Readout>
      <Note>Una <b>disolución</b> es una mezcla homogénea de <b>soluto</b> (en menor proporción) y <b>disolvente</b>. Formas de expresar la <b>concentración</b>: <b>molaridad M</b> = mol de soluto / L de disolución; <b>concentración en masa</b> = g de soluto / L de disolución; <b>% en masa</b> = (g de soluto / g de disolución)·100; <b>% en volumen</b> = (mL de soluto / mL de disolución)·100; <b>molalidad m</b> = mol de soluto / kg de disolvente (no depende de la temperatura); <b>fracción molar</b> x = n_soluto/(n_soluto + n_disolvente). Para pasar de unas a otras hace falta la <b>densidad</b> de la disolución: <b>m_disolución = V·d</b>. Se supone agua como disolvente (M = 18 g/mol).</Note>
    </Frame>
  );
}

/* ───────────── 5. Dilución y propiedades coligativas ───────────── */

export function DilucionColigativasFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), C1: num(block.params?.a, 12, 0.1, 18), V2: num(block.params?.b, 500, 10, 2000), C2: 1, m: 1, i: 0, T: 298 };
  const [s, setS] = useState(init);
  const V1 = volumenAlicuota(s.C2, s.V2, s.C1);
  const iAct = SOLUTOS[Math.min(s.i, SOLUTOS.length - 1)]!.i;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al diluir no cambian los moles de soluto: C₁·V₁ = C₂·V₂."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Estudio" items={[{ value: "0", label: "Dilución" }, { value: "1", label: "Propiedades coligativas (agua)" }]} value={String(s.modo)} onChange={(k) => setS((o) => ({ ...o, modo: Number(k) }))} />
          {s.modo === 0 ? (
            <>
              <Slider label="Concentración de la disolución concentrada" value={s.C1} min={0.1} max={18} step={0.1} unit=" mol/L" color={MANIM.red} format={f1} onChange={(C1) => setS((o) => ({ ...o, C1 }))} />
              <Slider label="Concentración que se quiere" value={s.C2} min={0.01} max={5} step={0.01} unit=" mol/L" color={MANIM.blue} format={f2} onChange={(C2) => setS((o) => ({ ...o, C2 }))} />
              <Slider label="Volumen que se quiere preparar" value={s.V2} min={10} max={2000} step={10} unit=" mL" color={MANIM.green} onChange={(V2) => setS((o) => ({ ...o, V2 }))} />
            </>
          ) : (
            <>
              <Choice label="Soluto" items={SOLUTOS.map((x, k) => ({ value: String(k), label: bonita(x.f) }))} value={String(Math.min(s.i, SOLUTOS.length - 1))} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
              <Slider label="Molalidad" value={s.m} min={0.05} max={5} step={0.05} unit=" mol/kg" color={MANIM.blue} format={f2} onChange={(m) => setS((o) => ({ ...o, m }))} />
              <Slider label="Temperatura" value={s.T} min={270} max={373} step={1} unit=" K" color={MANIM.red} onChange={(T) => setS((o) => ({ ...o, T }))} />
            </>
          )}
        </>
      }
    >
      {s.modo === 0 ? (
        <>
          <Titulo f="C₁ · V₁ = C₂ · V₂" sub="los moles de soluto no cambian al añadir disolvente" id="dilucion" />
          <Readout>
            <Stat color={V1 <= s.V2 ? MANIM.yellow : MANIM.red} label="Volumen de la disolución concentrada que hay que tomar">{V1 <= s.V2 ? `${fin(V1, f2)} mL` : "imposible: la final no puede ser más concentrada"}</Stat>
            <Stat color={MANIM.blue} label="Agua que se añade">{V1 <= s.V2 ? `${fin(s.V2 - V1, f1)} mL (aprox., volúmenes aditivos)` : "—"}</Stat>
            <Stat color={MANIM.green} label="Factor de dilución">{`× ${fin(s.C1 / s.C2, f1)}`}</Stat>
            <Stat color={MANIM.purple} label="Moles de soluto en la disolución preparada">{`${fin((s.C2 * s.V2) / 1000, f3)} mol`}</Stat>
          </Readout>
        </>
      ) : (
        <>
          <Titulo f={bonita(SOLUTOS[Math.min(s.i, SOLUTOS.length - 1)]!.f)} sub={`factor de van't Hoff i = ${iAct} (partículas por unidad fórmula)`} id="coligativas" />
          <Readout>
            <Stat color={MANIM.red} label="Ascenso ebulloscópico ΔT_e = K_e·m·i">{`${fin(ascensoEbulloscopico(s.m, iAct), f2)} °C → hierve a ${fin(100 + ascensoEbulloscopico(s.m, iAct), f2)} °C`}</Stat>
            <Stat color={MANIM.blue} label="Descenso crioscópico ΔT_c = K_c·m·i">{`${fin(descensoCrioscopico(s.m, iAct), f2)} °C → congela a ${fin(-descensoCrioscopico(s.m, iAct), f2)} °C`}</Stat>
            <Stat color={MANIM.green} label="Presión osmótica π = M·R·T·i (M ≈ m)">{`${fin(presionOsmotica(s.m, s.T, iAct), f1)} atm`}</Stat>
          </Readout>
        </>
      )}
      <Note>{s.modo === 0 ? <>Para <b>preparar una disolución diluida</b> a partir de una concentrada se toma un volumen V₁ (con una pipeta) y se lleva al volumen final V₂ con agua en un matraz aforado. Como los <b>moles de soluto no cambian</b>: <b>C₁·V₁ = C₂·V₂</b>. Ejemplo: de HCl 12 mol/L para preparar 500 mL de 1 mol/L se toman V₁ = 1·500/12 ≈ 41,7 mL y se completa con agua. Para preparar una disolución a partir de un <b>sólido</b>: se calcula la masa (m = M·V·M_molar), se disuelve en poca agua y se enrasa. Seguridad: los ácidos concentrados se vierten <b>sobre el agua</b>, no al revés.</> : <>Las <b>propiedades coligativas</b> dependen del <b>número de partículas de soluto</b> y no de su naturaleza. Un soluto no volátil produce: <b>descenso de la presión de vapor</b> (Raoult: ΔP = x_s·P°), <b>ascenso ebulloscópico</b> ΔT_e = K_e·m·i, <b>descenso crioscópico</b> ΔT_c = K_c·m·i (para el agua K_e = 0,52 y K_c = 1,86 °C·kg/mol) y <b>presión osmótica</b> π = M·R·T·i. El <b>factor de van&apos;t Hoff i</b> cuenta los iones en que se disocia (NaCl: 2; CaCl₂: 3; glucosa: 1). Aplicaciones: <b>sal en las carreteras</b>, anticongelante, suero fisiológico, ósmosis inversa (desalación). Se supone disolución ideal.</>}</Note>
    </Frame>
  );
}
