"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { contarAtomos, masaMolecular, sub } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import { type Reaccion } from "@/components/lesson/slide/tools/Fq2ReaccionesTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const sf = (f: string) => f.replace(/\d+/g, (d) => sub(d));

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const REACCIONES_MASA: Reaccion[] = [
  { id: "agua", nombre: "Formación del agua", reactivos: ["H2", "O2"], productos: ["H2O"], coef: [2, 1, 2] },
  { id: "amoniaco", nombre: "Síntesis del amoniaco", reactivos: ["N2", "H2"], productos: ["NH3"], coef: [1, 3, 2] },
  { id: "metano", nombre: "Combustión del metano", reactivos: ["CH4", "O2"], productos: ["CO2", "H2O"], coef: [1, 2, 1, 2] },
  { id: "magnesio", nombre: "Combustión del magnesio", reactivos: ["Mg", "O2"], productos: ["MgO"], coef: [2, 1, 2] },
  { id: "caliza", nombre: "Descomposición de la caliza", reactivos: ["CaCO3"], productos: ["CaO", "CO2"], coef: [1, 1, 1] },
];
/** Todas las especies de la reacción, en orden de coeficientes. */
export const especies = (r: Reaccion): string[] => [...r.reactivos, ...r.productos];
/** Masa molar de una especie (el magnesio se trata como átomo). */
export const masaMolar = (f: string): number => masaMolecular(f);
/** Masa (g) de la especie `destino` que se forma o consume cuando se consumen `masa` g de la especie `origen`. */
export function masaEspecie(r: Reaccion, origen: number, destino: number, masa: number): number {
  const fs = especies(r);
  const Mo = masaMolar(fs[origen] ?? "");
  const Md = masaMolar(fs[destino] ?? "");
  const co = r.coef[origen];
  const cd = r.coef[destino];
  if (!(Mo > 0) || !(Md > 0) || !co || !cd) return NaN;
  return ((masa / Mo) * (cd / co)) * Md;
}

export type FactoresVelocidad = { temperatura: number; concentracion: number; trozos: number; catalizador: boolean };
/** Constante de velocidad relativa: se duplica cada 10 °C, es proporcional a la concentración y a la superficie, y el catalizador la multiplica por 5. */
export function velocidadRelativa(f: FactoresVelocidad): number {
  const t = 2 ** ((f.temperatura - 20) / 10);
  const c = f.concentracion;
  const s = Math.sqrt(Math.max(1, f.trozos));
  return t * c * s * (f.catalizador ? 5 : 1);
}
/** Fracción de producto formado a tiempo t (min) con constante k (1/min): 1 − e^(−k·t). */
export const productoFormado = (k: number, t: number): number => (k > 0 && t >= 0 ? 1 - Math.exp(-k * t) : 0);
/** Tiempo (min) en formarse la mitad del producto: ln2 / k. */
export const tiempoMitad = (k: number): number => (k > 0 ? Math.LN2 / k : NaN);

export type Fuente = { id: string; nombre: string; formula: string; x: number; y: number };
/** Combustibles con C_xH_y (o carbono puro). Reacción: C_xH_y + O₂ → x CO₂ + y/2 H₂O. */
export const COMBUSTIBLES = [
  { nombre: "Metano (gas natural)", formula: "CH4" },
  { nombre: "Propano", formula: "C3H8" },
  { nombre: "Butano", formula: "C4H10" },
  { nombre: "Octano (gasolina)", formula: "C8H18" },
  { nombre: "Carbón (C)", formula: "C" },
] as const;
/** kg de CO₂ que se emiten al quemar `kg` de un combustible de fórmula dada. */
export function co2Combustion(formula: string, kg: number): number {
  const c = contarAtomos(formula);
  if (!c || !c.C) return NaN;
  const M = masaMolecular(formula);
  return M > 0 ? ((kg / M) * c.C * masaMolecular("CO2")) : NaN;
}

export type ReaccionEntorno = { nombre: string; ecuacion: string; tipo: string; energia: "exotérmica" | "endotérmica"; evidencia: string; ejemplo: string };
export const REACCIONES_ENTORNO: ReaccionEntorno[] = [
  { nombre: "Combustión del metano", ecuacion: "CH₄ + 2 O₂ → CO₂ + 2 H₂O", tipo: "Combustión", energia: "exotérmica", evidencia: "llama, luz y calor", ejemplo: "cocina de gas" },
  { nombre: "Oxidación del hierro", ecuacion: "4 Fe + 3 O₂ → 2 Fe₂O₃", tipo: "Oxidación", energia: "exotérmica", evidencia: "cambio de color (herrumbre)", ejemplo: "óxido en una verja" },
  { nombre: "Neutralización", ecuacion: "HCl + NaOH → NaCl + H₂O", tipo: "Ácido + base", energia: "exotérmica", evidencia: "se calienta la mezcla", ejemplo: "antiácido contra el ardor de estómago" },
  { nombre: "Fotosíntesis", ecuacion: "6 CO₂ + 6 H₂O → C₆H₁₂O₆ + 6 O₂", tipo: "Síntesis", energia: "endotérmica", evidencia: "necesita luz solar", ejemplo: "plantas" },
  { nombre: "Descomposición de la caliza", ecuacion: "CaCO₃ → CaO + CO₂", tipo: "Descomposición", energia: "endotérmica", evidencia: "hace falta calentar mucho", ejemplo: "fabricación de cal y cemento" },
];

/* ───────────── 1. Estequiometría con masas ───────────── */

export function EstequiometriaMasasFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 0, 0, REACCIONES_MASA.length - 1)), m: num(block.params?.a, 4, 1, 100) };
  const [s, setS] = useState(init);
  const r = REACCIONES_MASA[s.r]!;
  const fs = especies(r);
  const nr = r.reactivos.length;
  const base = r.reactivos[0]!;
  const masas = fs.map((_, i) => masaEspecie(r, 0, i, s.m));
  const ecu = (coefs: readonly number[]) => `${r.reactivos.map((f, i) => `${coefs[i] === 1 ? "" : `${coefs[i]} `}${sf(f)}`).join(" + ")} → ${r.productos.map((f, i) => `${coefs[nr + i] === 1 ? "" : `${coefs[nr + i]} `}${sf(f)}`).join(" + ")}`;
  const maxM = Math.max(...masas, 1);
  const bw = 60;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pasa de gramos a moles, aplica los coeficientes de la ecuación y vuelve a gramos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES_MASA.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.r)} onChange={(k) => setS((o) => ({ ...o, r: Number(k) }))} />
          <Slider label={`Masa de ${sf(base)} que reacciona`} value={s.m} min={1} max={100} step={1} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="estequiometria-masas" maxH={210}>
        <text x={260} y={20} textAnchor="middle" fill={MANIM.yellow} fontSize={15} fontWeight={700}>{ecu(r.coef)}</text>
        <Seg a={[30, 150]} b={[490, 150]} color={MANIM.ink} width={2} />
        {fs.map((f, i) => {
          const h = (masas[i]! / maxM) * 95;
          const x = 260 - (fs.length * (bw + 14)) / 2 + i * (bw + 14);
          const reactivo = i < nr;
          return (
            <g key={f + i}>
              <rect x={x} y={150 - h} width={bw} height={h} fill={reactivo ? MANIM.orange : MANIM.green} fillOpacity={0.85} />
              <text x={x + bw / 2} y={144 - h} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{`${f1(masas[i]!)} g`}</text>
              <text x={x + bw / 2} y={168} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{sf(f)}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Reactivos (g)">{r.reactivos.map((f, i) => `${sf(f)}: ${f1(masas[i]!)}`).join(" · ")}</Stat>
        <Stat color={MANIM.green} label="Productos (g)">{r.productos.map((f, i) => `${sf(f)}: ${f1(masas[nr + i]!)}`).join(" · ")}</Stat>
        <Stat color={MANIM.purple} label="Masa antes − después">{`${f2(masas.slice(0, nr).reduce((a, b) => a + b, 0) - masas.slice(nr).reduce((a, b) => a + b, 0))} g`}</Stat>
      </Readout>
      <Note>En una reacción <b>la masa se conserva</b>: la masa de los reactivos que se consumen es igual a la de los productos que se forman (aquí la diferencia sale 0). Para calcular masas: <b>1)</b> pasa los gramos a <b>moles</b> (n = m / M); <b>2)</b> usa la <b>proporción de coeficientes</b> de la ecuación ajustada; <b>3)</b> pasa los moles a gramos (m = n · M). Se usan masas atómicas redondeadas (H 1, C 12, N 14, O 16, Mg 24, Ca 40).</Note>
    </Frame>
  );
}

/* ───────────── 2. Velocidad de reacción ───────────── */

export function VelocidadReaccionFq3Explorador({ block }: { block: ToolBlock }) {
  const init: FactoresVelocidad = { temperatura: Math.round(num(block.params?.a, 20, 0, 80)), concentracion: num(block.params?.b, 1, 0.5, 3), trozos: Math.round(num(block.params?.c, 1, 1, 16)), catalizador: num(block.params?.n, 0, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  const k = 0.1 * velocidadRelativa(s);
  const k0 = 0.1 * velocidadRelativa({ temperatura: 20, concentracion: 1, trozos: 1, catalizador: false });
  const X = (t: number): number => 50 + (t / 60) * 420;
  const Y = (p: number): number => 150 - p * 120;
  const pts = (kk: number): string => Array.from({ length: 61 }, (_, t) => `${X(t)},${Y(productoFormado(kk, t))}`).join(" ");
  const th = tiempoMitad(k);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Más temperatura, más concentración, más superficie de contacto o un catalizador aceleran la reacción."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Temperatura" value={s.temperatura} min={0} max={80} step={5} unit=" °C" color={MANIM.red} onChange={(temperatura) => setS((o) => ({ ...o, temperatura }))} />
          <Slider label="Concentración del reactivo" value={s.concentracion} min={0.5} max={3} step={0.5} unit=" M" color={MANIM.blue} format={f1} onChange={(concentracion) => setS((o) => ({ ...o, concentracion }))} />
          <Slider label="Trozos en que se divide el sólido" value={s.trozos} min={1} max={16} step={1} color={MANIM.purple} onChange={(trozos) => setS((o) => ({ ...o, trozos }))} />
          <Choice label="Catalizador" items={[{ value: "no", label: "Sin catalizador" }, { value: "si", label: "Con catalizador" }]} value={s.catalizador ? "si" : "no"} onChange={(v) => setS((o) => ({ ...o, catalizador: v === "si" }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="velocidad-reaccion" maxH={210}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 20]} color={MANIM.ink} width={2} />
        <polyline points={pts(k0)} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="5 4" />
        <polyline points={pts(k)} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>tiempo (min)</text>
        <text x={58} y={16} fill={MANIM.muted} fontSize={12}>producto formado (fracción)</text>
        <text x={60} y={182} fill={MANIM.muted} fontSize={11}>discontinua: condiciones de referencia</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Velocidad relativa">{`× ${f2(velocidadRelativa(s))}`}</Stat>
        <Stat color={MANIM.green} label="Tiempo en formarse la mitad">{Number.isNaN(th) ? "—" : `${f2(th)} min`}</Stat>
      </Readout>
      <Note>La <b>velocidad de reacción</b> mide lo rápido que se consumen los reactivos o se forman los productos. Según la <b>teoría de colisiones</b>, para reaccionar las partículas deben <b>chocar</b> con energía suficiente. Se acelera con: <b>más temperatura</b> (se mueven más y chocan con más energía), <b>más concentración</b> (más choques), <b>más superficie de contacto</b> (sólido en polvo, no en trozo) y un <b>catalizador</b>, que facilita la reacción sin consumirse. El modelo numérico de aquí es <b>didáctico</b> (la velocidad se duplica cada 10 °C): no sirve para reacciones reales concretas.</Note>
    </Frame>
  );
}

/* ───────────── 3. Reacciones del entorno ───────────── */

export function ReaccionesEntornoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, REACCIONES_ENTORNO.length - 1));
  const [i, setI] = useState(init);
  const r = REACCIONES_ENTORNO[i]!;
  const exo = r.energia === "exotérmica";
  const yR = exo ? 50 : 100;
  const yP = exo ? 100 : 50;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Exotérmica: desprende energía; endotérmica: la absorbe."}
      onReset={() => setI(init)}
      controls={<Choice label="Reacción" items={REACCIONES_ENTORNO.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={150} testId="reacciones-entorno" maxH={170}>
        <Seg a={[60, 20]} b={[60, 130]} color={MANIM.ink} width={2} />
        <text x={50} y={25} textAnchor="end" fill={MANIM.muted} fontSize={11}>energía</text>
        <Seg a={[90, yR]} b={[190, yR]} color={MANIM.orange} width={4} />
        <text x={140} y={yR - 8} textAnchor="middle" fill={MANIM.orange} fontSize={12}>reactivos</text>
        <Seg a={[330, yP]} b={[430, yP]} color={MANIM.green} width={4} />
        <text x={380} y={yP - 8} textAnchor="middle" fill={MANIM.green} fontSize={12}>productos</text>
        <Seg a={[190, yR]} b={[330, yP]} color={MANIM.muted} width={2} dashed />
        <text x={260} y={135} textAnchor="middle" fill={exo ? MANIM.red : MANIM.blue} fontSize={13} fontWeight={700}>{exo ? "Se desprende energía" : "Se absorbe energía"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ecuación">{r.ecuacion}</Stat>
        <Stat color={MANIM.green} label="Tipo">{r.tipo}</Stat>
        <Stat color={exo ? MANIM.red : MANIM.blue} label="Energía">{r.energia}</Stat>
        <Stat color={MANIM.purple} label="Cómo se nota">{r.evidencia}</Stat>
        <Stat color={MANIM.muted} label="Dónde la vemos">{r.ejemplo}</Stat>
      </Readout>
      <Note>Una <b>combustión</b> es la reacción de una sustancia con el oxígeno desprendiendo luz y calor. La <b>oxidación</b> es una reacción con el oxígeno más lenta (el hierro se oxida y forma herrumbre). En una <b>neutralización</b>, un ácido y una base dan una sal y agua. Las reacciones <b>exotérmicas</b> desprenden energía (los productos tienen menos energía que los reactivos); las <b>endotérmicas</b> la absorben. Los niveles del diagrama son <b>cualitativos</b>, sin escala.</Note>
    </Frame>
  );
}

/* ───────────── 4. Emisiones de CO₂ ───────────── */

export function EmisionesCombustionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.n, 3, 0, COMBUSTIBLES.length - 1)), kg: num(block.params?.a, 10, 1, 100) };
  const [s, setS] = useState(init);
  const comb = COMBUSTIBLES[s.c]!;
  const co2 = co2Combustion(comb.formula, s.kg);
  const porKg = co2Combustion(comb.formula, 1);
  const maxPorKg = Math.max(...COMBUSTIBLES.map((c) => co2Combustion(c.formula, 1)));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada kg de combustible produce más de 2,7 kg de CO₂, que sale de combinar el carbono con el oxígeno del aire."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Combustible" items={COMBUSTIBLES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
          <Slider label="Masa que se quema" value={s.kg} min={1} max={100} step={1} unit=" kg" color={MANIM.orange} onChange={(kg) => setS((o) => ({ ...o, kg }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="emisiones-combustion" maxH={190}>
        {COMBUSTIBLES.map((c, k) => {
          const v = co2Combustion(c.formula, 1);
          const w = (v / maxPorKg) * 280;
          const sel = k === s.c;
          return (
            <g key={c.formula}>
              <text x={150} y={28 + k * 28} textAnchor="end" fill={sel ? MANIM.ink : MANIM.muted} fontSize={12} fontWeight={sel ? 700 : 400}>{c.nombre.split(" (")[0]}</text>
              <rect x={160} y={14 + k * 28} width={w} height={18} fill={sel ? MANIM.orange : MANIM.muted} fillOpacity={sel ? 0.9 : 0.4} />
              <text x={166 + w} y={28 + k * 28} fill={MANIM.ink} fontSize={11}>{`${f2(v)} kg CO₂ / kg`}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Fórmula">{sf(comb.formula)}</Stat>
        <Stat color={MANIM.orange} label="CO₂ por kg de combustible">{`${f2(porKg)} kg`}</Stat>
        <Stat color={MANIM.red} label={`CO₂ al quemar ${s.kg} kg`}>{`${f1(co2)} kg`}</Stat>
      </Readout>
      <Note>Al quemar un hidrocarburo C<sub>x</sub>H<sub>y</sub> con oxígeno se forma <b>CO₂ + H₂O</b>. Por la <b>conservación de la masa</b>, el CO₂ emitido pesa <b>más que el combustible</b>, porque aporta oxígeno del aire: 16 g de metano dan 44 g de CO₂. El CO₂ es un <b>gas de efecto invernadero</b>. Los resultados salen de la estequiometría de la <b>combustión completa</b> (con masas atómicas redondeadas); en la realidad dependen de la pureza del combustible y de que la combustión sea completa.</Note>
    </Frame>
  );
}
