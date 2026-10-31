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

export const G = 9.8;

/** Aceleración media (m/s²): variación de velocidad entre el tiempo. */
export const aceleracionMedia = (v0: number, v: number, t: number): number => (t > 0 ? (v - v0) / t : NaN);
/** Tiempo que tarda en detenerse un móvil que frena con a < 0 (s). */
export const tiempoParada = (v0: number, a: number): number => (a < 0 && v0 > 0 ? v0 / -a : Infinity);
/** Velocidad en el instante t: v = v₀ + a·t. Si frena, se queda en 0 (no marcha atrás). */
export function velocidadMRUA(v0: number, a: number, t: number): number {
  const v = v0 + a * t;
  return a < 0 ? Math.max(0, v) : v;
}
/** Posición en el instante t: x = x₀ + v₀·t + ½·a·t² (con parada incluida si frena). */
export function posicionMRUA(x0: number, v0: number, a: number, t: number): number {
  const tt = Math.min(t, tiempoParada(v0, a));
  return x0 + v0 * tt + 0.5 * a * tt * tt;
}
/** Velocidad final sin conocer el tiempo: v² = v₀² + 2·a·Δx. */
export const velocidadSinTiempo = (v0: number, a: number, dx: number): number => {
  const v2 = v0 * v0 + 2 * a * dx;
  return v2 >= 0 ? Math.sqrt(v2) : NaN;
};

export type PerfilVT = { a1: number; t1: number; t2: number; a3: number };
/** Perfil v-t: acelera desde el reposo (a1 durante t1), mantiene la velocidad t2 y frena (a3 < 0) hasta parar. */
export function perfilVT(p: PerfilVT) {
  const v1 = Math.max(0, p.a1) * Math.max(0, p.t1);
  const t3 = p.a3 < 0 && v1 > 0 ? v1 / -p.a3 : 0;
  const x1 = 0.5 * v1 * p.t1;
  const x2 = v1 * p.t2;
  const x3 = 0.5 * v1 * t3;
  return { v1, t3, total: p.t1 + p.t2 + t3, x1, x2, x3, distancia: x1 + x2 + x3 };
}
export function velocidadEn(p: PerfilVT, t: number): number {
  const q = perfilVT(p);
  if (t < 0 || t > q.total) return 0;
  if (t <= p.t1) return p.a1 * t;
  if (t <= p.t1 + p.t2) return q.v1;
  return Math.max(0, q.v1 + p.a3 * (t - p.t1 - p.t2));
}
export function recorridoEn(p: PerfilVT, t: number): number {
  const q = perfilVT(p);
  const tt = Math.max(0, Math.min(t, q.total));
  if (tt <= p.t1) return 0.5 * p.a1 * tt * tt;
  if (tt <= p.t1 + p.t2) return q.x1 + q.v1 * (tt - p.t1);
  const s = tt - p.t1 - p.t2;
  return q.x1 + q.x2 + q.v1 * s + 0.5 * p.a3 * s * s;
}

/** Caída libre desde una altura h (m), sin rozamiento. */
export const tiempoCaida = (h: number, g = G): number => (h >= 0 && g > 0 ? Math.sqrt((2 * h) / g) : NaN);
export const velocidadImpacto = (h: number, g = G): number => (h >= 0 && g > 0 ? Math.sqrt(2 * g * h) : NaN);
/** Lanzamiento vertical hacia arriba con velocidad v₀ (m/s). */
export const alturaMaxima = (v0: number, g = G): number => (g > 0 ? (v0 * v0) / (2 * g) : NaN);
export const tiempoSubida = (v0: number, g = G): number => (g > 0 ? v0 / g : NaN);
/** Distancia de reacción, de frenado y total (m) con velocidad en km/h, tiempo de reacción (s) y deceleración (m/s²). */
export function distanciaParada(vKmh: number, tReaccion: number, decel: number) {
  const v = vKmh / 3.6;
  const dr = v * Math.max(0, tReaccion);
  const df = decel > 0 ? (v * v) / (2 * decel) : NaN;
  return { reaccion: dr, frenado: df, total: dr + df };
}

/* ───────────── 1. Aceleración ───────────── */

export function AceleracionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { v0: Math.round(num(block.params?.a, 10, 0, 30)), a: num(block.params?.b, 2, -5, 5), t: Math.round(num(block.params?.c, 5, 0, 10)) };
  const [s, setS] = useState(init);
  const v = velocidadMRUA(s.v0, s.a, s.t);
  const vmax = Math.max(40, s.v0 + Math.max(0, s.a) * 10);
  const X = (t: number): number => 50 + (t / 10) * 420;
  const Y = (vv: number): number => 150 - (vv / vmax) * 125;
  const tp = tiempoParada(s.v0, s.a);
  const tEnd = Math.min(10, tp);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La aceleración es lo que cambia la velocidad cada segundo: si es positiva, acelera; si es negativa, frena."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad inicial" value={s.v0} min={0} max={30} step={1} unit=" m/s" color={MANIM.blue} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Aceleración" value={s.a} min={-5} max={5} step={0.5} unit=" m/s²" color={MANIM.orange} format={f1} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Tiempo" value={s.t} min={0} max={10} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="aceleracion" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[X(0), Y(s.v0)]} b={[X(tEnd), Y(velocidadMRUA(s.v0, s.a, tEnd))]} color={MANIM.blue} width={3} />
        {Number.isFinite(tp) && tp < 10 && <Seg a={[X(tp), 150]} b={[X(10), 150]} color={MANIM.blue} width={3} />}
        <Dot p={[X(s.t), Y(v)]} r={6} color={MANIM.orange} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>t (s)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>v (m/s)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={`Velocidad a los ${s.t} s`}>{`${f1(v)} m/s`}</Stat>
        <Stat color={MANIM.blue} label="En km/h">{`${f1(v * 3.6)} km/h`}</Stat>
        <Stat color={MANIM.purple} label="Tipo de movimiento">{s.a === 0 ? "uniforme (a = 0)" : s.a > 0 ? "acelerado" : v === 0 ? "frenado hasta parar" : "frenando"}</Stat>
      </Readout>
      <Note>La <b>aceleración</b> mide cuánto cambia la velocidad por unidad de tiempo: <b>a = (v − v₀) / t</b>, en <b>m/s²</b>. Una aceleración de 2 m/s² significa que cada segundo la velocidad aumenta 2 m/s. Si <b>a &gt; 0</b> el móvil acelera; si <b>a &lt; 0</b> frena (a veces se llama deceleración). La velocidad en cualquier instante es <b>v = v₀ + a · t</b>. En la herramienta, un móvil que frena <b>se queda parado</b> (no da marcha atrás).</Note>
    </Frame>
  );
}

/* ───────────── 2. MRUA ───────────── */

export function MruaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { v0: Math.round(num(block.params?.a, 0, 0, 30)), a: num(block.params?.b, 2, -5, 5), t: Math.round(num(block.params?.c, 6, 0, 10)) };
  const [s, setS] = useState(init);
  const x = posicionMRUA(0, s.v0, s.a, s.t);
  const v = velocidadMRUA(s.v0, s.a, s.t);
  const xmax = Math.max(50, ...Array.from({ length: 11 }, (_, t) => posicionMRUA(0, s.v0, s.a, t)));
  const X = (t: number): number => 50 + (t / 10) * 420;
  const Y = (xx: number): number => 150 - (xx / xmax) * 125;
  const pts = Array.from({ length: 41 }, (_, k) => `${X(k / 4)},${Y(posicionMRUA(0, s.v0, s.a, k / 4))}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "En el MRUA la posición crece con el cuadrado del tiempo: la gráfica x-t es una parábola."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad inicial" value={s.v0} min={0} max={30} step={1} unit=" m/s" color={MANIM.blue} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Aceleración" value={s.a} min={-5} max={5} step={0.5} unit=" m/s²" color={MANIM.orange} format={f1} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Tiempo" value={s.t} min={0} max={10} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="mrua" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Dot p={[X(s.t), Y(x)]} r={6} color={MANIM.orange} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>t (s)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>x (m)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={`Posición a los ${s.t} s`}>{`${f1(x)} m`}</Stat>
        <Stat color={MANIM.blue} label="Velocidad">{`${f1(v)} m/s`}</Stat>
        <Stat color={MANIM.purple} label="Recorrido en el último segundo">{`${f1(x - posicionMRUA(0, s.v0, s.a, Math.max(0, s.t - 1)))} m`}</Stat>
      </Readout>
      <Note>En el <b>movimiento rectilíneo uniformemente acelerado (MRUA)</b> la aceleración es <b>constante</b>. Las ecuaciones son <b>v = v₀ + a·t</b> y <b>x = x₀ + v₀·t + ½·a·t²</b>. Partiendo del reposo (v₀ = 0): x = ½·a·t², así que en el doble de tiempo se recorre <b>cuatro veces</b> la distancia. La gráfica posición–tiempo es una <b>parábola</b>. Hay también una relación sin tiempo: <b>v² = v₀² + 2·a·Δx</b>. Si el móvil frena, se detiene y no avanza más.</Note>
    </Frame>
  );
}

/* ───────────── 3. Gráficas v-t ───────────── */

export function GraficaVtFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { a1: num(block.params?.a, 2, 0.5, 5), t1: Math.round(num(block.params?.b, 5, 1, 10)), t2: Math.round(num(block.params?.c, 5, 0, 10)), a3: -2, t: 4 };
  const [s, setS] = useState(init);
  const p: PerfilVT = { a1: s.a1, t1: s.t1, t2: s.t2, a3: s.a3 };
  const q = perfilVT(p);
  const T = Math.max(q.total, 1);
  const vmax = Math.max(q.v1, 1);
  const X = (t: number): number => 50 + (t / T) * 420;
  const Y = (v: number): number => 150 - (v / vmax) * 120;
  const tt = Math.min(s.t, T);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El área bajo la gráfica velocidad-tiempo es la distancia recorrida."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Aceleración al arrancar" value={s.a1} min={0.5} max={5} step={0.5} unit=" m/s²" color={MANIM.orange} format={f1} onChange={(a1) => setS((o) => ({ ...o, a1 }))} />
          <Slider label="Tiempo acelerando" value={s.t1} min={1} max={10} step={1} unit=" s" color={MANIM.blue} onChange={(t1) => setS((o) => ({ ...o, t1 }))} />
          <Slider label="Tiempo a velocidad constante" value={s.t2} min={0} max={10} step={1} unit=" s" color={MANIM.green} onChange={(t2) => setS((o) => ({ ...o, t2 }))} />
          <Slider label="Frenada" value={s.a3} min={-5} max={-0.5} step={0.5} unit=" m/s²" color={MANIM.red} format={f1} onChange={(a3) => setS((o) => ({ ...o, a3 }))} />
          <Slider label="Instante a consultar" value={tt} min={0} max={Math.round(T * 10) / 10} step={0.5} unit=" s" color={MANIM.purple} format={f1} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="grafica-vt" maxH={205}>
        <polygon points={`${X(0)},150 ${X(p.t1)},${Y(q.v1)} ${X(p.t1 + p.t2)},${Y(q.v1)} ${X(q.total)},150`} fill={MANIM.blue} fillOpacity={0.25} />
        <polyline points={`${X(0)},150 ${X(p.t1)},${Y(q.v1)} ${X(p.t1 + p.t2)},${Y(q.v1)} ${X(q.total)},150`} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[X(tt), 150]} b={[X(tt), Y(velocidadEn(p, tt))]} color={MANIM.purple} width={1.5} dashed />
        <Dot p={[X(tt), Y(velocidadEn(p, tt))]} r={5} color={MANIM.purple} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>t (s)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>v (m/s)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad máxima">{`${f1(q.v1)} m/s (${f1(q.v1 * 3.6)} km/h)`}</Stat>
        <Stat color={MANIM.green} label="Distancia total (área)">{`${f1(q.distancia)} m`}</Stat>
        <Stat color={MANIM.purple} label={`A los ${f1(tt)} s`}>{`v = ${f1(velocidadEn(p, tt))} m/s · recorrido ${f1(recorridoEn(p, tt))} m`}</Stat>
        <Stat color={MANIM.muted} label="Duración total">{`${f1(q.total)} s`}</Stat>
      </Readout>
      <Note>En una gráfica <b>velocidad–tiempo</b>: la <b>pendiente</b> es la <b>aceleración</b> (tramo inclinado hacia arriba: acelera; horizontal: velocidad constante; hacia abajo: frena) y el <b>área bajo la curva</b> es la <b>distancia recorrida</b> (un triángulo vale base·altura/2; un rectángulo, base·altura). Aquí el móvil <b>arranca, mantiene la velocidad y frena</b> hasta parar. Los datos son ilustrativos.</Note>
    </Frame>
  );
}

/* ───────────── 4. Caída libre y frenada ───────────── */

type Modo = "caida" | "lanzamiento" | "frenada";

export function CaidaFrenadaFq3Explorador({ block }: { block: ToolBlock }) {
  const modos: Modo[] = ["caida", "lanzamiento", "frenada"];
  const init = { modo: modos[Math.round(num(block.params?.n, 0, 0, 2))]!, h: Math.round(num(block.params?.a, 20, 1, 100)), v0: Math.round(num(block.params?.b, 15, 1, 40)), kmh: Math.round(num(block.params?.c, 90, 20, 130)), tr: 1, dec: 6 };
  const [s, setS] = useState<{ modo: Modo; h: number; v0: number; kmh: number; tr: number; dec: number }>(init);
  const caida = { t: tiempoCaida(s.h), v: velocidadImpacto(s.h) };
  const lanz = { h: alturaMaxima(s.v0), t: tiempoSubida(s.v0) };
  const par = distanciaParada(s.kmh, s.tr, s.dec);
  const esc = 130 / Math.max(1, s.modo === "caida" ? s.h : s.modo === "lanzamiento" ? lanz.h : par.total);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Todos los cuerpos caen con la misma aceleración (g = 9,8 m/s²) si no hay rozamiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Situación" items={[{ value: "caida", label: "Caída libre" }, { value: "lanzamiento", label: "Lanzamiento hacia arriba" }, { value: "frenada", label: "Distancia de frenado" }]} value={s.modo} onChange={(modo) => setS((o) => ({ ...o, modo: modo as Modo }))} />
          {s.modo === "caida" && <Slider label="Altura desde la que cae" value={s.h} min={1} max={100} step={1} unit=" m" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />}
          {s.modo === "lanzamiento" && <Slider label="Velocidad de lanzamiento" value={s.v0} min={1} max={40} step={1} unit=" m/s" color={MANIM.orange} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />}
          {s.modo === "frenada" && (
            <>
              <Slider label="Velocidad del coche" value={s.kmh} min={20} max={130} step={10} unit=" km/h" color={MANIM.blue} onChange={(kmh) => setS((o) => ({ ...o, kmh }))} />
              <Slider label="Tiempo de reacción" value={s.tr} min={0} max={2} step={0.25} unit=" s" color={MANIM.purple} format={f2} onChange={(tr) => setS((o) => ({ ...o, tr }))} />
              <Slider label="Deceleración al frenar" value={s.dec} min={3} max={9} step={1} unit=" m/s²" color={MANIM.red} onChange={(dec) => setS((o) => ({ ...o, dec }))} />
            </>
          )}
        </>
      }
    >
      <Svg w={520} h={170} testId="caida-frenada" maxH={190}>
        {s.modo === "frenada" ? (
          <>
            <rect x={50} y={60} width={Math.min(420, par.reaccion * (420 / Math.max(par.total, 1)))} height={30} fill={MANIM.purple} fillOpacity={0.8} />
            <rect x={50 + Math.min(420, par.reaccion * (420 / Math.max(par.total, 1)))} y={60} width={Math.max(0, 420 - Math.min(420, par.reaccion * (420 / Math.max(par.total, 1))))} height={30} fill={MANIM.red} fillOpacity={0.8} />
            <text x={50} y={50} fill={MANIM.purple} fontSize={12}>reacción</text>
            <text x={470} y={50} textAnchor="end" fill={MANIM.red} fontSize={12}>frenado</text>
            <text x={260} y={125} textAnchor="middle" fill={MANIM.ink} fontSize={14}>{`Distancia total hasta parar: ${f1(par.total)} m`}</text>
          </>
        ) : (
          <>
            <Seg a={[120, 20]} b={[120, 150]} color={MANIM.muted} width={2} />
            <Seg a={[100, 150]} b={[140, 150]} color={MANIM.ink} width={3} />
            <Dot p={[120, 150 - (s.modo === "caida" ? s.h : lanz.h) * esc]} r={8} color={MANIM.orange} />
            <text x={160} y={90} fill={MANIM.ink} fontSize={14}>{s.modo === "caida" ? `h = ${s.h} m` : `h máx = ${f1(lanz.h)} m`}</text>
          </>
        )}
      </Svg>
      <Readout>
        {s.modo === "caida" && (
          <>
            <Stat color={MANIM.blue} label="Tiempo de caída">{`${f2(caida.t)} s`}</Stat>
            <Stat color={MANIM.orange} label="Velocidad al llegar al suelo">{`${f1(caida.v)} m/s (${f1(caida.v * 3.6)} km/h)`}</Stat>
          </>
        )}
        {s.modo === "lanzamiento" && (
          <>
            <Stat color={MANIM.orange} label="Altura máxima">{`${f1(lanz.h)} m`}</Stat>
            <Stat color={MANIM.blue} label="Tiempo de subida">{`${f2(lanz.t)} s`}</Stat>
            <Stat color={MANIM.purple} label="Tiempo total en el aire">{`${f2(2 * lanz.t)} s`}</Stat>
          </>
        )}
        {s.modo === "frenada" && (
          <>
            <Stat color={MANIM.purple} label="Distancia durante la reacción">{`${f1(par.reaccion)} m`}</Stat>
            <Stat color={MANIM.red} label="Distancia de frenado">{`${f1(par.frenado)} m`}</Stat>
            <Stat color={MANIM.green} label="Total hasta detenerse">{`${f1(par.total)} m`}</Stat>
          </>
        )}
      </Readout>
      <Note>La <b>caída libre</b> es un MRUA con <b>a = g ≈ 9,8 m/s²</b>, igual para todos los cuerpos si no hay rozamiento del aire. Desde el reposo: <b>t = √(2h/g)</b> y <b>v = g·t</b>. Al <b>lanzar hacia arriba</b>, la velocidad disminuye 9,8 m/s cada segundo hasta 0 en el punto más alto: <b>h máx = v₀² / (2g)</b>. La <b>distancia de parada</b> de un coche es la suma de lo que recorre durante el <b>tiempo de reacción</b> (a velocidad constante) y la <b>distancia de frenado</b> (v² / 2a): al <b>doblar la velocidad se cuadruplica</b> la de frenado. Se desprecia el rozamiento del aire; la deceleración y el tiempo de reacción son valores típicos.</Note>
    </Frame>
  );
}
