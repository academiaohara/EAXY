"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

const G = 9.8;
/** Periodo (s) de un péndulo simple para oscilaciones pequeñas: T = 2π·√(L/g). */
export function periodoPendulo(longitud: number, g = G): number {
  return longitud > 0 && g > 0 ? 2 * Math.PI * Math.sqrt(longitud / g) : NaN;
}

export const ESCALAS = [
  { nombre: "Núcleo de un átomo", m: 1e-15 },
  { nombre: "Átomo", m: 1e-10 },
  { nombre: "Virus", m: 1e-7 },
  { nombre: "Célula", m: 1e-5 },
  { nombre: "Hormiga", m: 3e-3 },
  { nombre: "Persona", m: 1.7 },
  { nombre: "Montaña (Everest)", m: 8.8e3 },
  { nombre: "Tierra (diámetro)", m: 1.27e7 },
  { nombre: "Sol (diámetro)", m: 1.39e9 },
  { nombre: "Distancia Tierra–Sol", m: 1.5e11 },
  { nombre: "Sistema solar", m: 1.2e13 },
  { nombre: "Vía Láctea (diámetro)", m: 9.5e20 },
] as const;

/** Mantisa y exponente en notación científica. */
export function aCientifica(x: number): { mantisa: number; exp: number } {
  if (!Number.isFinite(x) || x === 0) return { mantisa: x === 0 ? 0 : NaN, exp: 0 };
  const exp = Math.floor(Math.log10(Math.abs(x)) + 1e-12);
  return { mantisa: x / 10 ** exp, exp };
}
/** Orden de magnitud: exponente de la potencia de 10 más cercana. */
export function ordenMagnitud(x: number): number {
  return x > 0 && Number.isFinite(x) ? Math.round(Math.log10(x)) : NaN;
}
/** Cuántos órdenes de magnitud separan dos cantidades. */
export const saltoOrdenes = (a: number, b: number): number => ordenMagnitud(a) - ordenMagnitud(b);

export const sup = (n: number): string => String(n).replace(/[-0-9]/g, (c) => "⁻⁰¹²³⁴⁵⁶⁷⁸⁹"["-0123456789".indexOf(c)]!);
export const texCientifica = (x: number): string => {
  const { mantisa, exp } = aCientifica(x);
  return Number.isNaN(mantisa) ? "—" : `${fmtEs(mantisa, 2)} · 10${sup(exp)}`;
};

export type Factor = { num: string; den: string; valor: number };
export const CONVERSIONES: { nombre: string; de: string; a: string; factores: Factor[] }[] = [
  { nombre: "km/h → m/s", de: "km/h", a: "m/s", factores: [{ num: "1000 m", den: "1 km", valor: 1000 }, { num: "1 h", den: "3600 s", valor: 1 / 3600 }] },
  { nombre: "g/cm³ → kg/m³", de: "g/cm³", a: "kg/m³", factores: [{ num: "1 kg", den: "1000 g", valor: 1 / 1000 }, { num: "1 000 000 cm³", den: "1 m³", valor: 1e6 }] },
  { nombre: "kWh → J", de: "kWh", a: "J", factores: [{ num: "1000 Wh", den: "1 kWh", valor: 1000 }, { num: "3600 J", den: "1 Wh", valor: 3600 }] },
  { nombre: "días → s", de: "días", a: "s", factores: [{ num: "24 h", den: "1 día", valor: 24 }, { num: "3600 s", den: "1 h", valor: 3600 }] },
];
/** Aplica una cadena de factores de conversión. */
export const convertirCadena = (v: number, factores: readonly { valor: number }[]): number => factores.reduce((acc, f) => acc * f.valor, v);

/** Pendiente de la recta y = k·x que mejor ajusta (mínimos cuadrados por el origen). */
export function pendienteOrigen(xs: readonly number[], ys: readonly number[]): number {
  const sxx = xs.reduce((s, x) => s + x * x, 0);
  return sxx > 0 ? xs.reduce((s, x, i) => s + x * ys[i]!, 0) / sxx : NaN;
}
export const sumaErrores2 = (xs: readonly number[], ys: readonly number[], k: number): number => xs.reduce((s, x, i) => s + (ys[i]! - k * x) ** 2, 0);
export const PEND_L = [0.2, 0.4, 0.6, 0.8, 1.0] as const;
export const PEND_T2 = [0.80, 1.65, 2.40, 3.25, 4.02] as const;

/* ───────────── 1. Péndulo y control de variables ───────────── */

const REF = { l: 1, m: 100, a: 10 };

export function PenduloVariablesFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { l: num(block.params?.a, 1, 0.2, 2), m: Math.round(num(block.params?.b, 100, 50, 500)), a: Math.round(num(block.params?.c, 10, 5, 40)) };
  const [s, setS] = useState(init);
  const t = periodoPendulo(s.l);
  const t0 = periodoPendulo(REF.l);
  const px = 260;
  const py = 20;
  const len = 40 + s.l * 55;
  const th = (s.a * Math.PI) / 180;
  const bx = px + len * Math.sin(th);
  const by = py + len * Math.cos(th);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia una sola variable cada vez y mira si el periodo se altera."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Longitud del hilo" value={s.l} min={0.2} max={2} step={0.1} unit=" m" color={MANIM.blue} format={f1} onChange={(l) => setS((o) => ({ ...o, l }))} />
          <Slider label="Masa de la bola" value={s.m} min={50} max={500} step={50} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Ángulo inicial" value={s.a} min={5} max={40} step={5} unit="°" color={MANIM.purple} onChange={(a) => setS((o) => ({ ...o, a }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="pendulo-variables" maxH={210}>
        <Seg a={[px - 60, py]} b={[px + 60, py]} color={MANIM.ink} width={4} />
        <Seg a={[px, py]} b={[bx, by]} color={MANIM.muted} width={2} />
        <Dot p={[bx, by]} r={6 + s.m / 60} color={MANIM.orange} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Periodo T = 2π√(L/g)">{`${f2(t)} s`}</Stat>
        <Stat color={MANIM.muted} label="Periodo de referencia (1 m)">{`${f2(t0)} s`}</Stat>
        <Stat color={MANIM.green} label="Variación del periodo">{Math.abs(t - t0) < 0.005 ? "ninguna" : `${t > t0 ? "+" : ""}${f2(t - t0)} s`}</Stat>
      </Readout>
      <Note>En un experimento hay una <b>variable independiente</b> (la que cambiamos), una <b>dependiente</b> (la que medimos) y varias <b>controladas</b> (las que mantenemos fijas). Aquí el periodo <b>solo depende de la longitud</b> (para ángulos pequeños): cambia la masa o el ángulo y no se altera. Para saber qué variable influye, se cambia <b>una sola cada vez</b>. El valor de g = 9,8 m/s² y el modelo de ángulos pequeños son aproximaciones.</Note>
    </Frame>
  );
}

/* ───────────── 2. Órdenes de magnitud ───────────── */

export function OrdenesMagnitudFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 5, 0, ESCALAS.length - 1));
  const [i, setI] = useState(init);
  const e = ESCALAS[i]!;
  const ref = ESCALAS[5]!;
  const salto = saltoOrdenes(e.m, ref.m);
  const pos = (k: number) => 40 + (k / (ESCALAS.length - 1)) * 440;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada paso de la escala es un cambio de órdenes de magnitud: potencias de 10."}
      onReset={() => setI(init)}
      controls={<Slider label="Objeto" value={i} min={0} max={ESCALAS.length - 1} step={1} color={MANIM.blue} format={(v) => ESCALAS[Math.round(v)]?.nombre ?? ""} onChange={setI} />}
    >
      <Svg w={520} h={130} testId="ordenes-magnitud" maxH={150}>
        <Seg a={[40, 60]} b={[480, 60]} color={MANIM.muted} width={2} />
        {ESCALAS.map((_, k) => (
          <Dot key={k} p={[pos(k), 60]} r={k === i ? 9 : 4} color={k === i ? MANIM.orange : MANIM.muted} />
        ))}
        <text x={pos(i)} y={100} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{e.nombre}</text>
        <text x={40} y={22} fill={MANIM.muted} fontSize={12}>más pequeño</text>
        <text x={480} y={22} textAnchor="end" fill={MANIM.muted} fontSize={12}>más grande</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Tamaño en metros">{`${texCientifica(e.m)} m`}</Stat>
        <Stat color={MANIM.blue} label="Orden de magnitud">{`10${sup(ordenMagnitud(e.m))} m`}</Stat>
        <Stat color={MANIM.purple} label="Respecto a una persona">{salto === 0 ? "mismo orden" : `${salto > 0 ? "+" : ""}${salto} órdenes`}</Stat>
      </Readout>
      <Note>La <b>notación científica</b> escribe un número como <b>a · 10ⁿ</b>, con 1 ≤ a &lt; 10. El exponente n indica el <b>orden de magnitud</b>: cada unidad más es <b>10 veces mayor</b>. Así se manejan cantidades enormes o diminutas sin escribir ceros. Los tamaños son aproximados y están redondeados.</Note>
    </Frame>
  );
}

/* ───────────── 3. Factores de conversión ───────────── */

export function FactoresConversionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.n, 0, 0, CONVERSIONES.length - 1)), v: num(block.params?.a, 72, 1, 200) };
  const [s, setS] = useState(init);
  const conv = CONVERSIONES[s.c]!;
  const res = convertirCadena(s.v, conv.factores);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada factor vale 1: multiplicas por fracciones que cancelan las unidades de partida."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Conversión" items={CONVERSIONES.map((c, k) => ({ value: String(k), label: c.nombre }))} value={String(s.c)} onChange={(k) => setS((o) => ({ ...o, c: Number(k) }))} />
          <Slider label={`Valor en ${conv.de}`} value={s.v} min={1} max={200} step={1} color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="factores-conversion" maxH={150}>
        <text x={20} y={55} fill={MANIM.orange} fontSize={16} fontWeight={700}>{`${s.v} ${conv.de}`}</text>
        {conv.factores.map((f, k) => (
          <g key={k}>
            <text x={150 + k * 150} y={45} textAnchor="middle" fill={MANIM.ink} fontSize={14}>×</text>
            <text x={200 + k * 150} y={40} textAnchor="middle" fill={MANIM.blue} fontSize={13}>{f.num}</text>
            <Seg a={[140 + k * 150 + 20, 50]} b={[260 + k * 150, 50]} color={MANIM.ink} width={2} />
            <text x={200 + k * 150} y={68} textAnchor="middle" fill={MANIM.purple} fontSize={13}>{f.den}</text>
          </g>
        ))}
        <text x={20} y={110} fill={MANIM.green} fontSize={16} fontWeight={700}>{`= ${fmtEs(res, 2)} ${conv.a}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Valor de partida">{`${s.v} ${conv.de}`}</Stat>
        <Stat color={MANIM.green} label="Resultado">{`${res >= 1e4 || res < 1e-2 ? texCientifica(res) : fmtEs(res, 2)} ${conv.a}`}</Stat>
      </Readout>
      <Note>Un <b>factor de conversión</b> es una fracción que vale <b>1</b> (por ejemplo 1000 m / 1 km). Se multiplica por ella de modo que la unidad que sobra <b>se cancele</b> y quede la unidad deseada. Se encadenan los factores que hagan falta. Comprobar que las <b>unidades finales</b> son las esperadas ayuda a detectar errores.</Note>
    </Frame>
  );
}

/* ───────────── 4. Gráfica y ajuste ───────────── */

export function GraficaAjusteFq3Explorador({ block }: { block: ToolBlock }) {
  const init = num(block.params?.a, 3, 1, 6);
  const [k, setK] = useState(init);
  const kOpt = pendienteOrigen(PEND_L, PEND_T2);
  const e = sumaErrores2(PEND_L, PEND_T2, k);
  const eOpt = sumaErrores2(PEND_L, PEND_T2, kOpt);
  const X = (l: number): number => 50 + l * 400;
  const Y = (t: number): number => 160 - t * 32;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ajusta la pendiente hasta que la recta pase lo más cerca posible de todos los puntos."}
      onReset={() => setK(init)}
      controls={<Slider label="Pendiente k de la recta T² = k·L" value={k} min={1} max={6} step={0.1} color={MANIM.orange} format={f1} onChange={setK} />}
    >
      <Svg w={520} h={190} testId="grafica-ajuste" maxH={210}>
        <Seg a={[50, 160]} b={[470, 160]} color={MANIM.ink} width={2} />
        <Seg a={[50, 160]} b={[50, 20]} color={MANIM.ink} width={2} />
        <Seg a={[50, 160]} b={[X(1.05), Y(k * 1.05)]} color={MANIM.orange} width={3} />
        {PEND_L.map((l, i) => (
          <Dot key={i} p={[X(l), Y(PEND_T2[i]!)]} r={5} color={MANIM.blue} />
        ))}
        <text x={470} y={180} textAnchor="end" fill={MANIM.muted} fontSize={12}>L (m)</text>
        <text x={58} y={16} fill={MANIM.muted} fontSize={12}>T² (s²)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Tu pendiente">{f1(k)}</Stat>
        <Stat color={MANIM.green} label="Mejor ajuste (mínimos cuadrados)">{f2(kOpt)}</Stat>
        <Stat color={MANIM.purple} label="Error total (suma de cuadrados)">{`${fmtEs(e, 3)} (mín. ${fmtEs(eOpt, 3)})`}</Stat>
      </Readout>
      <Note>Al representar T² frente a L, los puntos casi forman una <b>recta que pasa por el origen</b>: las magnitudes son <b>directamente proporcionales</b> y la <b>pendiente</b> es la constante de proporcionalidad (≈ 4π²/g ≈ 4,0 s²/m). Los puntos nunca caen exactamente en la recta por el <b>error de medida</b>: se traza la recta que mejor los ajusta. Un informe recoge: <b>objetivo, material, método, datos, gráfica, conclusiones</b> y posibles <b>fuentes de error</b>. Los datos son simulados.</Note>
    </Frame>
  );
}
