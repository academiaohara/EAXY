"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Tiempo (min) que tarda un fogón de potencia P (W) en calentar m gramos de agua de 20 °C a 100 °C: t = m · 4,18 · 80 / P. */
export function tiempoHervir(masaG: number, potenciaW: number) {
  return potenciaW > 0 ? (masaG * 4.18 * 80) / potenciaW / 60 : NaN;
}

export const PREFIJOS = [
  { sim: "G", nombre: "giga", exp: 9 },
  { sim: "M", nombre: "mega", exp: 6 },
  { sim: "k", nombre: "kilo", exp: 3 },
  { sim: "", nombre: "(unidad)", exp: 0 },
  { sim: "c", nombre: "centi", exp: -2 },
  { sim: "m", nombre: "mili", exp: -3 },
  { sim: "µ", nombre: "micro", exp: -6 },
  { sim: "n", nombre: "nano", exp: -9 },
] as const;
/** Convierte un valor entre prefijos del SI (exponentes de 10): valor · 10^(expOrigen − expDestino). */
export const convertirPrefijo = (valor: number, expOrigen: number, expDestino: number) => valor * 10 ** (expOrigen - expDestino);
/** Exponente en caracteres superíndice (−3 → ⁻³). */
export const superindice = (n: number) => String(n).replace(/[-0-9]/g, (c) => "⁻⁰¹²³⁴⁵⁶⁷⁸⁹"["-0123456789".indexOf(c)]!);
/** Notación científica: mantisa en [1, 10) y exponente. */
export function notacionCientifica(x: number) {
  if (!Number.isFinite(x) || x === 0) return { mantisa: x === 0 ? 0 : NaN, exp: 0 };
  const exp = Math.floor(Math.log10(Math.abs(x)) + 1e-12);
  return { mantisa: x / 10 ** exp, exp };
}

/** Redondea x a n cifras significativas. */
export function redondearCifras(x: number, n: number) {
  if (!Number.isFinite(x) || x === 0 || n < 1) return x;
  const d = Math.floor(Math.log10(Math.abs(x))) + 1;
  const p = 10 ** (n - d);
  return Math.round(x * p) / p;
}
/** Media y errores de una serie de medidas respecto del valor verdadero (si se conoce). */
export function estadisticaMedidas(vals: readonly number[], verdadero?: number) {
  const n = vals.length;
  const media = n ? vals.reduce((s, v) => s + v, 0) / n : NaN;
  const dispersion = n ? (Math.max(...vals) - Math.min(...vals)) / 2 : NaN;
  const errAbs = verdadero !== undefined ? Math.abs(media - verdadero) : NaN;
  return { media, dispersion, errAbs, errRel: verdadero ? errAbs / Math.abs(verdadero) : NaN };
}
export const MEDIDAS_CM = [12.3, 11.8, 12.1, 12.4, 11.9, 11.7, 12.0, 11.95] as const;

/** Ajuste de una recta por el origen y = k·x por mínimos cuadrados, y suma de cuadrados de los residuos. */
export function ajusteProporcional(xs: readonly number[], ys: readonly number[]) {
  const sxy = xs.reduce((s, x, i) => s + x * ys[i]!, 0);
  const sxx = xs.reduce((s, x) => s + x * x, 0);
  return { k: sxx > 0 ? sxy / sxx : NaN };
}
export const sumaCuadrados = (xs: readonly number[], ys: readonly number[], k: number) => xs.reduce((s, x, i) => s + (ys[i]! - k * x) ** 2, 0);
export const MUELLE_X = [50, 100, 150, 200, 250] as const;
export const MUELLE_Y = [1.1, 2.1, 3.2, 3.9, 5.1] as const;

export type Magnitud = "volumen" | "masa" | "longitud" | "tiempo" | "temperatura";
export const INSTRUMENTOS: Record<Magnitud, { unidad: string; opciones: { nombre: string; resolucion: number }[]; errores: number[] }> = {
  volumen: { unidad: "mL", opciones: [{ nombre: "Vaso de precipitados", resolucion: 25 }, { nombre: "Probeta", resolucion: 1 }, { nombre: "Pipeta graduada", resolucion: 0.1 }], errores: [30, 2, 0.2] },
  masa: { unidad: "g", opciones: [{ nombre: "Balanza de cocina", resolucion: 1 }, { nombre: "Balanza de laboratorio", resolucion: 0.01 }], errores: [2, 0.05] },
  longitud: { unidad: "mm", opciones: [{ nombre: "Regla", resolucion: 1 }, { nombre: "Calibre", resolucion: 0.05 }, { nombre: "Micrómetro", resolucion: 0.01 }], errores: [2, 0.1, 0.02] },
  tiempo: { unidad: "s", opciones: [{ nombre: "Reloj de pared", resolucion: 1 }, { nombre: "Cronómetro digital", resolucion: 0.01 }], errores: [2, 0.05] },
  temperatura: { unidad: "°C", opciones: [{ nombre: "Termómetro de alcohol", resolucion: 1 }, { nombre: "Termómetro digital", resolucion: 0.1 }], errores: [2, 0.2] },
};
/** El instrumento menos preciso cuya resolución no supera el error máximo admitido (null si ninguno basta). */
export function instrumentoAdecuado(m: Magnitud, errorMax: number) {
  const ok = INSTRUMENTOS[m].opciones.filter((o) => o.resolucion <= errorMax);
  return ok.length ? ok.reduce((a, b) => (b.resolucion > a.resolucion ? b : a)) : null;
}

/* ───────────── 1. Experimento y variables ───────────── */

export function ExperimentoVariablesFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 200, 100, 500)), p: Math.round(num(block.params?.b, 200, 100, 400)) };
  const [s, setS] = useState(init);
  const ref = tiempoHervir(200, 200);
  const t = tiempoHervir(s.m, s.p);
  const cambios = [s.m !== 200 ? "la masa de agua" : "", s.p !== 200 ? "la potencia del fogón" : ""].filter(Boolean);
  const estado = cambios.length === 0 ? "Experimento de referencia" : cambios.length === 1 ? `Cambia una sola variable: ${cambios[0]}` : "Cambian dos variables a la vez: no se puede saber cuál influye";
  const W = 440;
  const pm = (v: number) => 40 + (v / Math.max(ref, t, 1)) * (W - 160);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Para saber qué influye, se cambia una variable (independiente) y se mantienen las demás (controladas) mientras se mide el resultado (dependiente)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa de agua (variable)" value={s.m} min={100} max={500} step={50} unit=" g" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Potencia del fogón (variable)" value={s.p} min={100} max={400} step={50} unit=" W" color={MANIM.orange} onChange={(p) => setS((o) => ({ ...o, p }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="experimento-variables" maxH={220}>
        <text x={20} y={34} fill={MANIM.muted} fontSize={13}>Tiempo para hervir (variable dependiente)</text>
        <rect x={40} y={46} width={Math.max(2, pm(ref) - 40)} height={26} rx={4} fill={MANIM.grid} fillOpacity={0.8} />
        <text x={pm(ref) + 8} y={64} fill={MANIM.muted} fontSize={13}>{`referencia: ${f1(ref)} min`}</text>
        <rect x={40} y={86} width={Math.max(2, pm(t) - 40)} height={26} rx={4} fill={MANIM.green} fillOpacity={0.9} />
        <text x={pm(t) + 8} y={104} fill={MANIM.ink} fontSize={13}>{`tu experimento: ${f1(t)} min`}</text>
        <text x={20} y={150} fill={cambios.length > 1 ? MANIM.red : MANIM.yellow} fontSize={14} fontWeight={700}>{estado}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Variable independiente">masa de agua o potencia (la que cambias)</Stat>
        <Stat color={MANIM.green} label="Variable dependiente">{`${f1(t)} min`}</Stat>
        <Stat color={MANIM.muted} label="Variables controladas">temperatura inicial (20 °C) y final (100 °C), recipiente</Stat>
      </Readout>
      <Note>Un <b>experimento controlado</b> cambia <b>una sola variable</b> cada vez. La que se modifica es la <b>variable independiente</b>; la que se mide, la <b>dependiente</b>; y las demás deben mantenerse <b>constantes</b> (<b>controladas</b>). Aquí el tiempo que tarda en hervir el agua depende de la <b>masa</b> (más masa, más tiempo) y de la <b>potencia</b> (más potencia, menos tiempo). Si cambias las dos a la vez, el resultado puede quedar igual y no sabrías a qué se debe.</Note>
    </Frame>
  );
}

/* ───────────── 2. Conversión de unidades con prefijos ───────────── */

const UNI = [
  { value: "m", label: "Longitud (m)" },
  { value: "g", label: "Masa (g)" },
  { value: "s", label: "Tiempo (s)" },
] as const;

export function UnidadesPrefijosFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { u: "m" as "m" | "g" | "s", v: Math.round(num(block.params?.a, 250, 1, 999)), i: Math.round(num(block.params?.b, 3, 0, 7)), j: Math.round(num(block.params?.c, 2, 0, 7)) };
  const [s, setS] = useState(init);
  const from = PREFIJOS[s.i]!;
  const to = PREFIJOS[s.j]!;
  const res = convertirPrefijo(s.v, from.exp, to.exp);
  const sc = notacionCientifica(res);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada prefijo es una potencia de 10: pasar de un prefijo a otro es multiplicar por 10 elevado a la diferencia de exponentes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Magnitud" items={UNI} value={s.u} onChange={(u) => setS((o) => ({ ...o, u }))} />
          <Slider label="Valor" value={s.v} min={1} max={999} step={1} color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Prefijo de origen" value={s.i} min={0} max={PREFIJOS.length - 1} step={1} color={MANIM.blue} format={(v) => PREFIJOS[Math.round(v)]!.nombre} onChange={(i) => setS((o) => ({ ...o, i: Math.round(i) }))} />
          <Slider label="Prefijo de destino" value={s.j} min={0} max={PREFIJOS.length - 1} step={1} color={MANIM.green} format={(v) => PREFIJOS[Math.round(v)]!.nombre} onChange={(j) => setS((o) => ({ ...o, j: Math.round(j) }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="unidades-prefijos" maxH={170}>
        <text x={260} y={56} textAnchor="middle" fill={MANIM.ink} fontSize={26} fontWeight={700}>{`${s.v} ${from.sim}${s.u}  =  ${fmtEs(Number.isInteger(res) || Math.abs(res) >= 1e4 || Math.abs(res) < 1e-3 ? res : Math.round(res * 1e6) / 1e6, 6)} ${to.sim}${s.u}`}</text>
        <text x={260} y={104} textAnchor="middle" fill={MANIM.yellow} fontSize={18}>{`× 10${superindice(from.exp)} ÷ 10${superindice(to.exp)} = × 10${superindice(from.exp - to.exp)}`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Resultado en notación científica">{`${f2(sc.mantisa)} · 10${superindice(sc.exp)} ${to.sim}${s.u}`}</Stat>
        <Stat color={MANIM.muted} label="Factor de conversión">{`10${superindice(from.exp - to.exp)}`}</Stat>
      </Readout>
      <Note>El <b>Sistema Internacional (SI)</b> usa siete unidades base; aquí, el <b>metro</b> (longitud), el <b>kilogramo</b> (masa; el gramo es su submúltiplo habitual) y el <b>segundo</b> (tiempo). Los <b>prefijos</b> forman múltiplos y submúltiplos: <b>kilo</b> = 10³, <b>centi</b> = 10⁻², <b>mili</b> = 10⁻³, <b>micro</b> = 10⁻⁶… Para convertir, se multiplica por 10 elevado a la <b>diferencia de exponentes</b> (origen − destino). La <b>notación científica</b> escribe el resultado como una mantisa entre 1 y 10 por una potencia de 10.</Note>
    </Frame>
  );
}

/* ───────────── 3. Medidas, error y cifras significativas ───────────── */

export function MedidasErrorFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 3, 1, 8)), c: Math.round(num(block.params?.b, 3, 1, 5)) };
  const [s, setS] = useState(init);
  const vals = MEDIDAS_CM.slice(0, s.n);
  const e = estadisticaMedidas(vals, 12.0);
  const redondeada = redondearCifras(e.media, s.c);
  const X = (v: number): number => 60 + ((v - 11.6) / 1) * 400;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuantas más medidas se hacen, más se acerca la media al valor verdadero; el resultado se escribe con las cifras que el instrumento permite."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número de medidas" value={s.n} min={1} max={8} step={1} color={MANIM.orange} onChange={(n) => setS((o) => ({ ...o, n }))} />
          <Slider label="Cifras significativas a mostrar" value={s.c} min={1} max={5} step={1} color={MANIM.blue} onChange={(c) => setS((o) => ({ ...o, c }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="medidas-error" maxH={170}>
        <Seg a={[40, 90]} b={[480, 90]} color={MANIM.ink} width={2} />
        {[11.6, 11.8, 12, 12.2, 12.4, 12.6].map((v) => (
          <g key={v}>
            <Seg a={[X(v), 84]} b={[X(v), 96]} color={MANIM.ink} width={1.5} />
            <text x={X(v)} y={116} textAnchor="middle" fill={MANIM.muted} fontSize={12}>{fmtEs(v, 1)}</text>
          </g>
        ))}
        <Seg a={[X(12), 40]} b={[X(12), 96]} color={MANIM.green} width={2.5} dashed />
        <text x={X(12)} y={34} textAnchor="middle" fill={MANIM.green} fontSize={12} fontWeight={700}>valor verdadero 12,0 cm</text>
        {vals.map((v, i) => (
          <Dot key={i} p={[X(v), 70 - (i % 2) * 14] as Pt} color={MANIM.orange} r={5} />
        ))}
        <Dot p={[X(e.media), 90]} color={MANIM.yellow} r={7} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Media">{f2(e.media)} cm</Stat>
        <Stat color={MANIM.purple} label="Error absoluto |media − verdadero|">{f2(e.errAbs)} cm</Stat>
        <Stat color={MANIM.red} label="Error relativo">{fmtEs(e.errRel * 100, 2)} %</Stat>
        <Stat color={MANIM.blue} label={`Media con ${s.c} cifras significativas`}>{fmtEs(redondeada, 4)} cm</Stat>
      </Readout>
      <Note>Toda <b>medida</b> lleva un <b>error</b>. El <b>error absoluto</b> es la diferencia entre la medida y el valor verdadero; el <b>relativo</b> es ese error dividido por el valor verdadero (se da en %). Repetir la medida y hacer la <b>media</b> reduce los errores accidentales. Las <b>cifras significativas</b> son las que tienen sentido en el resultado: no se escriben más de las que el instrumento puede dar. Al <b>redondear</b>, si la primera cifra que se quita es 5 o más, la última que se queda sube una unidad.</Note>
    </Frame>
  );
}

/* ───────────── 4. Gráficas y proporcionalidad ───────────── */

export function GraficaProporcionalFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { k: num(block.params?.a, 0.01, 0.005, 0.03) };
  const [s, setS] = useState(init);
  const best = ajusteProporcional(MUELLE_X, MUELLE_Y).k;
  const ssTu = sumaCuadrados(MUELLE_X, MUELLE_Y, s.k);
  const ssBest = sumaCuadrados(MUELLE_X, MUELLE_Y, best);
  const X0 = 60;
  const Y0 = 190;
  const ux = 1.5;
  const uy = 28;
  const P = (x: number, y: number): Pt => [X0 + x * ux, Y0 - y * uy];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Si los puntos siguen una recta que pasa por el origen, las magnitudes son directamente proporcionales y y/x es constante."}
      onReset={() => setS(init)}
      controls={<Slider label="Pendiente de tu recta (cm por gramo)" value={s.k} min={0.005} max={0.03} step={0.001} color={MANIM.orange} format={(v) => fmtEs(v, 3)} onChange={(k) => setS({ k })} />}
    >
      <Svg w={520} h={230} testId="grafica-proporcional" maxH={250}>
        <Seg a={P(0, 0)} b={P(300, 0)} color={MANIM.ink} width={2} />
        <Seg a={P(0, 0)} b={P(0, 6.5)} color={MANIM.ink} width={2} />
        <text x={P(300, 0)[0] - 90} y={Y0 + 24} fill={MANIM.muted} fontSize={12}>masa colgada (g)</text>
        <text x={14} y={20} fill={MANIM.muted} fontSize={12}>alargamiento (cm)</text>
        <Seg a={P(0, 0)} b={P(300, Math.min(6.5, s.k * 300))} color={MANIM.orange} width={3} />
        <Seg a={P(0, 0)} b={P(300, best * 300)} color={MANIM.green} width={1.6} dashed />
        {MUELLE_X.map((x, i) => (
          <Dot key={x} p={P(x, MUELLE_Y[i]!)} color={MANIM.blue} r={5.5} />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Tu pendiente">{fmtEs(s.k, 3)} cm/g</Stat>
        <Stat color={MANIM.green} label="Mejor ajuste (mínimos cuadrados)">{fmtEs(best, 4)} cm/g</Stat>
        <Stat color={MANIM.purple} label="Cuánto te desvías de los datos">{f2(ssTu)} (óptimo: {f2(ssBest)})</Stat>
      </Readout>
      <Note>Las <b>tablas</b> ordenan los datos y las <b>gráficas</b> los hacen visibles. Se pone la <b>variable independiente</b> en el eje horizontal y la <b>dependiente</b> en el vertical, con sus <b>unidades</b>. Aquí, el alargamiento de un muelle crece <b>en proporción</b> a la masa colgada: los puntos siguen una <b>recta que pasa por el origen</b> y el cociente y / x (la <b>pendiente</b>) es <b>constante</b>. Las medidas no caen exactamente en la recta por los <b>errores</b>: se traza la recta que mejor se ajusta, no una que una los puntos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Instrumentos de laboratorio ───────────── */

const MAGS = [
  { value: "volumen", label: "Volumen" },
  { value: "masa", label: "Masa" },
  { value: "longitud", label: "Longitud" },
  { value: "tiempo", label: "Tiempo" },
  { value: "temperatura", label: "Temperatura" },
] as const;

export function InstrumentosLaboratorioFq2Explorador({ block }: { block: ToolBlock }) {
  const mags: Magnitud[] = ["volumen", "masa", "longitud", "tiempo", "temperatura"];
  const init = { m: mags[Math.round(num(block.params?.n, 0, 0, 4))]!, e: Math.round(num(block.params?.a, 1, 0, 2)) };
  const [s, setS] = useState<{ m: Magnitud; e: number }>(init);
  const inf = INSTRUMENTOS[s.m];
  const idx = Math.min(s.e, inf.errores.length - 1);
  const errorMax = inf.errores[idx]!;
  const elegido = instrumentoAdecuado(s.m, errorMax);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El instrumento adecuado es el que tiene una resolución igual o menor que el error que se admite; uno más preciso no hace falta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Magnitud a medir" items={MAGS} value={s.m} onChange={(m) => setS({ m, e: Math.min(s.e, INSTRUMENTOS[m].errores.length - 1) })} />
          <Slider label="Error máximo admitido (de mayor a menor)" value={idx} min={0} max={inf.errores.length - 1} step={1} color={MANIM.orange} format={(v) => `${fmtEs(inf.errores[Math.round(v)]!, 2)} ${inf.unidad}`} onChange={(e) => setS((o) => ({ ...o, e: Math.round(e) }))} />
        </>
      }
    >
      <Svg w={520} h={60 + inf.opciones.length * 38} testId="instrumentos-laboratorio" maxH={240}>
        <text x={20} y={28} fill={MANIM.muted} fontSize={13}>{`Instrumentos disponibles (resolución en ${inf.unidad})`}</text>
        {inf.opciones.map((o, i) => {
          const ok = o.resolucion <= errorMax;
          const es = elegido?.nombre === o.nombre;
          return (
            <g key={o.nombre}>
              <rect x={20} y={40 + i * 38} width={480} height={30} rx={6} fill={es ? MANIM.green : MANIM.grid} fillOpacity={es ? 0.35 : 0.35} stroke={es ? MANIM.green : "none"} strokeWidth={2} />
              <text x={34} y={60 + i * 38} fill={ok ? MANIM.ink : MANIM.muted} fontSize={14} fontWeight={es ? 700 : 500}>{o.nombre}</text>
              <text x={480} y={60 + i * 38} textAnchor="end" fill={ok ? MANIM.green : MANIM.red} fontSize={13}>{`${fmtEs(o.resolucion, 2)} ${inf.unidad} · ${ok ? "suficiente" : "demasiado grosero"}`}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Error máximo admitido">{`${fmtEs(errorMax, 2)} ${inf.unidad}`}</Stat>
        <Stat color={MANIM.green} label="Instrumento adecuado">{elegido ? elegido.nombre : "ninguno disponible"}</Stat>
      </Readout>
      <Note>Cada instrumento tiene una <b>resolución</b> (la división más pequeña) y un <b>alcance</b>. Para medir bien se elige el que tiene <b>resolución igual o menor</b> que el error admitido. Un vaso de precipitados sirve para <b>reconocer</b> un volumen, no para medirlo; una probeta o una pipeta, sí. En el laboratorio hay que respetar las <b>normas de seguridad</b>: bata y gafas, pelo recogido, no probar ni oler directamente los productos, leer los <b>pictogramas</b> de las etiquetas y avisar al profesor ante cualquier accidente.</Note>
    </Frame>
  );
}
