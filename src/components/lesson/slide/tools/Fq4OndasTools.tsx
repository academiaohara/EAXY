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
const f0 = (v: number) => fmtEs(v, 0);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");


const SUP = "⁰¹²³⁴⁵⁶⁷⁸⁹";
/** Notación científica con coma decimal: 3,00·10⁸ */
function cient(v: number, dec = 2): string {
  if (!Number.isFinite(v) || v === 0) return "—";
  let e = Math.floor(Math.log10(Math.abs(v)));
  let m = v / 10 ** e;
  if (Math.abs(Number(m.toFixed(dec))) >= 10) { m /= 10; e += 1; }
  const sup = `${e < 0 ? "⁻" : ""}${String(Math.abs(e)).split("").map((c) => SUP[Number(c)]).join("")}`;
  return e === 0 ? fmtEs(m, dec) : `${fmtEs(m, dec)}·10${sup}`;
}

/* ───────────── Datos y cálculos (se comprueban en los tests) ───────────── */

export const C_LUZ = 3e8;

/** Magnitudes de una onda periódica: v = λ·f, T = 1/f, ω = 2π·f, k = 2π/λ. */
export function onda(lambda: number, f: number) {
  if (!(lambda > 0) || !(f > 0)) return { v: NaN, T: NaN, omega: NaN, k: NaN };
  return { v: lambda * f, T: 1 / f, omega: 2 * Math.PI * f, k: (2 * Math.PI) / lambda };
}
/** Elongación y(x, t) = A·sen(2π(x/λ − f·t)). */
export const elongacion = (A: number, lambda: number, f: number, x: number, t: number): number => A * Math.sin(2 * Math.PI * (x / lambda - f * t));

export const BANDAS = [
  { id: "radio", nombre: "Ondas de radio", min: 1e-1, max: 1e5, uso: "radio, TV, telefonía móvil, wifi (parte)", color: "#c59bd6" },
  { id: "micro", nombre: "Microondas", min: 1e-3, max: 1e-1, uso: "horno, radar, wifi, satélites", color: "#ff862f" },
  { id: "ir", nombre: "Infrarrojo", min: 7.5e-7, max: 1e-3, uso: "mando a distancia, calor, visión nocturna", color: "#fc6255" },
  { id: "vis", nombre: "Luz visible", min: 3.8e-7, max: 7.5e-7, uso: "visión", color: "#ffd866" },
  { id: "uv", nombre: "Ultravioleta", min: 1e-8, max: 3.8e-7, uso: "bronceado, esterilización, vitamina D", color: "#58c4dd" },
  { id: "x", nombre: "Rayos X", min: 1e-11, max: 1e-8, uso: "radiografías, control en aeropuertos", color: "#83c167" },
  { id: "gamma", nombre: "Rayos gamma", min: 1e-14, max: 1e-11, uso: "radioterapia, esterilización, procesos nucleares", color: "#ffffff" },
] as const;
/** Banda del espectro para una longitud de onda (m). */
export function bandaPorLongitud(lambda: number) {
  if (!(lambda > 0)) return null;
  if (lambda >= 1e-1) return BANDAS[0];
  if (lambda >= 1e-3) return BANDAS[1];
  if (lambda >= 7.5e-7) return BANDAS[2];
  if (lambda >= 3.8e-7) return BANDAS[3];
  if (lambda >= 1e-8) return BANDAS[4];
  if (lambda >= 1e-11) return BANDAS[5];
  return BANDAS[6];
}
export const frecuenciaEM = (lambda: number): number => (lambda > 0 ? C_LUZ / lambda : NaN);
/** Color aproximado (RGB) de una longitud de onda visible en nm. */
export function colorVisible(nm: number): string {
  let r = 0, g = 0, b = 0;
  if (nm >= 380 && nm < 440) { r = -(nm - 440) / 60; b = 1; }
  else if (nm < 490) { g = (nm - 440) / 50; b = 1; }
  else if (nm < 510) { g = 1; b = -(nm - 510) / 20; }
  else if (nm < 580) { r = (nm - 510) / 70; g = 1; }
  else if (nm < 645) { r = 1; g = -(nm - 645) / 65; }
  else if (nm <= 750) { r = 1; }
  else return "#888888";
  const h = (v: number): string => Math.round(Math.min(1, Math.max(0, v)) * 255).toString(16).padStart(2, "0");
  return `#${h(r)}${h(g)}${h(b)}`;
}

export const MEDIOS_SONIDO = [
  { id: "aire", nombre: "Aire", v: 343 },
  { id: "agua", nombre: "Agua", v: 1480 },
  { id: "acero", nombre: "Acero", v: 5000 },
] as const;
/** Velocidad del sonido en el aire a T °C: ≈ 331 + 0,6·T (m/s). */
export const velocidadSonidoAire = (T: number): number => 331 + 0.6 * T;
/** Nivel sonoro (dB) a distancia d de una fuente puntual de nivel L₀ a 1 m: cae 6 dB cada vez que se duplica la distancia. */
export const nivelSonido = (L0: number, d: number): number => (d > 0 ? L0 - 20 * Math.log10(d) : NaN);
/** Tiempo (s) que tarda en oírse el eco de un obstáculo a distancia d (ida y vuelta). */
export const tiempoEco = (d: number, v: number): number => (v > 0 ? (2 * d) / v : NaN);
export function categoriaRuido(dB: number): string {
  if (!Number.isFinite(dB)) return "—";
  if (dB < 0) return "inaudible (bajo el umbral de audición)";
  if (dB < 30) return "muy silencioso";
  if (dB < 55) return "tranquilo";
  if (dB < 70) return "moderado (conversación)";
  if (dB < 85) return "ruidoso";
  if (dB < 120) return "peligroso con exposición prolongada";
  return "umbral del dolor: daño inmediato posible";
}
/** Tiempo máximo de exposición diaria (horas) sin riesgo: 8 h a 85 dB y se divide por 2 cada +3 dB. */
export const tiempoMaxExposicion = (dB: number): number => (Number.isFinite(dB) ? 8 / 2 ** ((dB - 85) / 3) : NaN);

export const FUENTES_RUIDO = [
  { nombre: "Susurro", dB: 30 },
  { nombre: "Conversación", dB: 60 },
  { nombre: "Tráfico intenso", dB: 80 },
  { nombre: "Auriculares a tope", dB: 100 },
  { nombre: "Discoteca", dB: 110 },
  { nombre: "Avión al despegar", dB: 130 },
] as const;

export const MEDIOS_OPTICOS = [
  { id: "aire", nombre: "Aire", n: 1.0 },
  { id: "agua", nombre: "Agua", n: 1.33 },
  { id: "vidrio", nombre: "Vidrio", n: 1.5 },
  { id: "diamante", nombre: "Diamante", n: 2.42 },
] as const;
/** Ley de Snell: n₁·sen θ₁ = n₂·sen θ₂. Devuelve θ₂ en grados o null si hay reflexión total. */
export function refraccion(n1: number, n2: number, theta1: number): number | null {
  if (!(n1 > 0) || !(n2 > 0)) return null;
  const s = (n1 * Math.sin((theta1 * Math.PI) / 180)) / n2;
  return Math.abs(s) <= 1 ? (Math.asin(s) * 180) / Math.PI : null;
}
/** Ángulo límite al pasar de n₁ a n₂ < n₁ (grados). */
export const anguloLimite = (n1: number, n2: number): number => (n1 > n2 && n2 > 0 ? (Math.asin(n2 / n1) * 180) / Math.PI : NaN);
export const velocidadEnMedio = (n: number): number => (n > 0 ? C_LUZ / n : NaN);

/* ───────────── 1. Ondas ───────────── */

export function OndaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { A: num(block.params?.a, 1, 0.2, 2), lambda: num(block.params?.b, 4, 0.5, 8), f: num(block.params?.c, 2, 0.1, 10), t: 0 };
  const [s, setS] = useState(init);
  const o = onda(s.lambda, s.f);
  const X = (x: number): number => 40 + (x / 8) * 440;
  const Y = (y: number): number => 80 - (y / 2) * 55;
  const pts = Array.from({ length: 121 }, (_, k) => {
    const x = (k / 120) * 8;
    return `${X(x)},${Y(elongacion(s.A, s.lambda, s.f, x, s.t))}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "v = λ·f: a más frecuencia, menor longitud de onda si la velocidad se mantiene."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Amplitud A" value={s.A} min={0.2} max={2} step={0.1} unit=" m" color={MANIM.orange} format={f1} onChange={(A) => setS((x) => ({ ...x, A }))} />
          <Slider label="Longitud de onda λ" value={s.lambda} min={0.5} max={8} step={0.5} unit=" m" color={MANIM.blue} format={f1} onChange={(lambda) => setS((x) => ({ ...x, lambda }))} />
          <Slider label="Frecuencia f" value={s.f} min={0.1} max={10} step={0.1} unit=" Hz" color={MANIM.green} format={f1} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Slider label="Instante" value={s.t} min={0} max={2} step={0.05} unit=" s" color={MANIM.purple} format={f2} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="onda" maxH={180}>
        <Seg a={[40, 80]} b={[480, 80]} color={MANIM.muted} width={1.5} dashed />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Seg a={[X(0), 80]} b={[X(0), Y(s.A)]} color={MANIM.orange} width={2} />
        <Seg a={[X(0), 148]} b={[X(Math.min(8, s.lambda)), 148]} color={MANIM.green} width={3} />
        <text x={X(Math.min(8, s.lambda) / 2)} y={142} textAnchor="middle" fill={MANIM.green} fontSize={12}>λ</text>
        <text x={X(0) + 8} y={Y(s.A / 2)} fill={MANIM.orange} fontSize={12}>A</text>
        <Dot p={[X(4), Y(elongacion(s.A, s.lambda, s.f, 4, s.t))]} r={6} color={MANIM.yellow} />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Velocidad v = λ·f">{`${fin(o.v, f2)} m/s`}</Stat>
        <Stat color={MANIM.blue} label="Periodo T = 1/f">{`${fin(o.T, f2)} s`}</Stat>
        <Stat color={MANIM.purple} label="Frecuencia angular ω · nº de onda k">{`${fin(o.omega, f2)} rad/s · ${fin(o.k, f2)} rad/m`}</Stat>
        <Stat color={MANIM.yellow} label="Elongación del punto marcado">{`${f2(Math.abs(elongacion(s.A, s.lambda, s.f, 4, s.t)) < 0.005 ? 0 : elongacion(s.A, s.lambda, s.f, 4, s.t))} m`}</Stat>
      </Readout>
      <Note>Una <b>onda</b> es una perturbación que se propaga transportando <b>energía</b> pero <b>no materia</b>. Sus magnitudes: <b>amplitud A</b> (elongación máxima), <b>longitud de onda λ</b> (distancia entre dos puntos en fase), <b>periodo T</b> (tiempo de una oscilación), <b>frecuencia f = 1/T</b> (Hz) y <b>velocidad de propagación v = λ·f = λ/T</b>. La velocidad depende del <b>medio</b>, no de la fuente. Ecuación de la onda armónica: <b>y = A·sen[2π·(x/λ − f·t)]</b>. En una onda <b>transversal</b> las partículas vibran perpendicularmente a la propagación (cuerda, luz); en una <b>longitudinal</b>, paralelamente (sonido, muelle).</Note>
    </Frame>
  );
}

/* ───────────── 2. Espectro electromagnético ───────────── */

export function EspectroFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, -6.3, -14, 4) * 10) / 10;
  const [e, setE] = useState(init);
  const lambda = 10 ** e;
  const banda = bandaPorLongitud(lambda)!;
  const f = frecuenciaEM(lambda);
  const x = 40 + ((e + 14) / 18) * 440;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Todas las ondas electromagnéticas viajan a c = 3·10⁸ m/s en el vacío: f·λ = c."}
      onReset={() => setE(init)}
      controls={<Slider label="log₁₀ de la longitud de onda (m)" value={e} min={-14} max={4} step={0.1} color={banda.color} format={(v) => f1(v)} onChange={setE} />}
    >
      <Svg w={520} h={110} testId="espectro" maxH={130}>
        {BANDAS.map((b) => {
          const x1 = 40 + ((Math.log10(b.min) + 14) / 18) * 440;
          const x2 = 40 + ((Math.log10(b.max) + 14) / 18) * 440;
          return <rect key={b.id} x={Math.min(x1, x2)} y={30} width={Math.max(3, Math.abs(x2 - x1) - 1)} height={34} fill={b.color} fillOpacity={b.id === banda.id ? 0.95 : 0.35} />;
        })}
        <polygon points={`${x},26 ${x - 6},12 ${x + 6},12`} fill={MANIM.ink} />
        <text x={40} y={84} fill={MANIM.muted} fontSize={11}>gamma</text>
        <text x={480} y={84} textAnchor="end" fill={MANIM.muted} fontSize={11}>radio</text>
        <text x={260} y={102} textAnchor="middle" fill={MANIM.muted} fontSize={11}>← menor λ (más energía) · mayor λ →</text>
      </Svg>
      <Readout>
        <Stat color={banda.color} label="Banda">{banda.nombre}</Stat>
        <Stat color={MANIM.blue} label="Longitud de onda">{`${lambda >= 1 && lambda < 1000 ? f2(lambda) : cient(lambda)} m`}</Stat>
        <Stat color={MANIM.orange} label="Frecuencia f = c/λ">{`${cient(f)} Hz`}</Stat>
        <Stat color={MANIM.green} label="Usos">{banda.uso}</Stat>
      </Readout>
      <Note>Las <b>ondas electromagnéticas</b> son oscilaciones de campos eléctrico y magnético, <b>transversales</b> y <b>no necesitan medio</b>: se propagan en el vacío a <b>c = 3·10⁸ m/s</b>. Ordenadas por frecuencia forman el <b>espectro electromagnético</b>: <b>radio, microondas, infrarrojo, luz visible, ultravioleta, rayos X y rayos gamma</b>. Cumplen <b>c = λ·f</b>: a mayor frecuencia, menor λ y <b>más energía</b> (E = h·f). La <b>luz visible</b> es una franja muy estrecha (≈ 380–750 nm). Las radiaciones de mayor energía (UV, X, gamma) son <b>ionizantes</b> y pueden dañar las células. Los límites son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 3. Sonido ───────────── */

export function SonidoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { med: Math.round(num(block.params?.n, 0, 0, MEDIOS_SONIDO.length - 1)), f: Math.round(num(block.params?.a, 440, 20, 20000)), d: Math.round(num(block.params?.b, 100, 1, 1000)), L0: 90 };
  const [s, setS] = useState(init);
  const m = MEDIOS_SONIDO[s.med]!;
  const lambda = m.v / s.f;
  const nivel = nivelSonido(s.L0, s.d);
  const eco = tiempoEco(s.d, m.v);
  const audible = s.f >= 20 && s.f <= 20000;
  const tipo = s.f < 20 ? "infrasonido" : s.f > 20000 ? "ultrasonido" : s.f < 250 ? "grave" : s.f < 2000 ? "medio" : "agudo";
  return (
    <Frame
      stacked
      hint={block.hint ?? "El sonido es una onda longitudinal mecánica: necesita un medio y va más rápido en sólidos que en gases."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Medio" items={MEDIOS_SONIDO.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.med)} onChange={(k) => setS((o) => ({ ...o, med: Number(k) }))} />
          <Slider label="Frecuencia" value={s.f} min={20} max={20000} step={10} unit=" Hz" color={MANIM.blue} onChange={(f) => setS((o) => ({ ...o, f }))} />
          <Slider label="Distancia a la fuente / al obstáculo" value={s.d} min={1} max={1000} step={1} unit=" m" color={MANIM.orange} onChange={(d) => setS((o) => ({ ...o, d }))} />
          <Slider label="Nivel de la fuente a 1 m" value={s.L0} min={40} max={130} step={5} unit=" dB" color={MANIM.red} onChange={(L0) => setS((o) => ({ ...o, L0 }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="sonido" maxH={100}>
        {Array.from({ length: 24 }, (_, k) => {
          const dens = 1 + 0.6 * Math.sin((k / 24) * Math.PI * 2 * 3);
          return <Dot key={k} p={[40 + k * 18.3, 40]} r={3 + dens * 2} color={MANIM.blue} />;
        })}
        <text x={260} y={74} textAnchor="middle" fill={MANIM.muted} fontSize={12}>compresiones y enrarecimientos (onda longitudinal)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label={`Velocidad en ${m.nombre.toLowerCase()}`}>{`${f0(m.v)} m/s`}</Stat>
        <Stat color={MANIM.green} label="Longitud de onda λ = v/f">{`${fmtEs(lambda, lambda < 1 ? 3 : 2)} m`}</Stat>
        <Stat color={audible ? MANIM.yellow : MANIM.red} label="Tipo de sonido">{`${tipo}${audible ? " (audible)" : " (fuera del rango audible)"}`}</Stat>
        <Stat color={MANIM.orange} label="Nivel a esa distancia">{`${fin(nivel, f1)} dB · ${categoriaRuido(nivel)}`}</Stat>
        <Stat color={MANIM.purple} label="Eco (ida y vuelta)">{`${fin(eco, f2)} s${eco >= 0.1 ? " (se percibe separado)" : " (se confunde con el sonido original)"}`}</Stat>
      </Readout>
      <Note>El <b>sonido</b> es una onda <b>mecánica longitudinal</b>: necesita un medio material y <b>no se propaga en el vacío</b>. Es más rápido en <b>sólidos</b> que en líquidos y en gases (aire ≈ 343 m/s a 20 °C; v ≈ 331 + 0,6·T). Oímos entre <b>20 Hz y 20 000 Hz</b>: por debajo, <b>infrasonidos</b>; por encima, <b>ultrasonidos</b>. La <b>frecuencia</b> determina el <b>tono</b> (grave/agudo) y la <b>amplitud</b>, la <b>intensidad</b> (el volumen), que se mide en <b>decibelios (dB)</b>. Cada vez que se duplica la distancia, el nivel baja unos 6 dB. El <b>eco</b> se percibe si el obstáculo está a más de ≈ 17 m (tiempo ≥ 0,1 s); si es menor, se produce <b>reverberación</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Reflexión y refracción de la luz ───────────── */

export function OpticaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { n1: Math.round(num(block.params?.n, 0, 0, MEDIOS_OPTICOS.length - 1)), n2: 1, ang: Math.round(num(block.params?.a, 40, 0, 89)) };
  const [s, setS] = useState(init);
  const m1 = MEDIOS_OPTICOS[s.n1]!;
  const m2 = MEDIOS_OPTICOS[s.n2]!;
  const th2 = refraccion(m1.n, m2.n, s.ang);
  const lim = anguloLimite(m1.n, m2.n);
  const cx = 260;
  const cy = 75;
  const L = 70;
  const p = (deg: number, up: boolean, sgn: number): [number, number] => [cx + sgn * L * Math.sin((deg * Math.PI) / 180), cy + (up ? -1 : 1) * L * Math.cos((deg * Math.PI) / 180)];
  return (
    <Frame
      stacked
      hint={block.hint ?? "n₁·sen θ₁ = n₂·sen θ₂: al entrar en un medio con mayor índice, el rayo se acerca a la normal."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Medio de incidencia (arriba)" items={MEDIOS_OPTICOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.n1)} onChange={(k) => setS((o) => ({ ...o, n1: Number(k) }))} />
          <Choice label="Segundo medio (abajo)" items={MEDIOS_OPTICOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.n2)} onChange={(k) => setS((o) => ({ ...o, n2: Number(k) }))} />
          <Slider label="Ángulo de incidencia" value={s.ang} min={0} max={89} step={1} unit="°" color={MANIM.yellow} onChange={(ang) => setS((o) => ({ ...o, ang }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="optica" maxH={170}>
        <rect x={60} y={cy} width={400} height={70} fill={MANIM.blue} fillOpacity={0.25} />
        <Seg a={[60, cy]} b={[460, cy]} color={MANIM.ink} width={2} />
        <Seg a={[cx, cy - 70]} b={[cx, cy + 70]} color={MANIM.muted} width={1.5} dashed />
        <Seg a={p(s.ang, true, -1)} b={[cx, cy]} color={MANIM.yellow} width={3} />
        <Seg a={[cx, cy]} b={p(s.ang, true, 1)} color={MANIM.orange} width={2} />
        {th2 !== null && <Seg a={[cx, cy]} b={p(th2, false, 1)} color={MANIM.green} width={3} />}
        <text x={70} y={20} fill={MANIM.muted} fontSize={12}>{`${m1.nombre} (n = ${fmtEs(m1.n, 2)})`}</text>
        <text x={70} y={140} fill={MANIM.muted} fontSize={12}>{`${m2.nombre} (n = ${fmtEs(m2.n, 2)})`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Reflexión: ángulo reflejado">{`${s.ang}° (igual al de incidencia)`}</Stat>
        <Stat color={th2 === null ? MANIM.red : MANIM.green} label="Refracción: ángulo refractado">{th2 === null ? "no hay rayo refractado: reflexión total" : `${f1(th2)}°`}</Stat>
        <Stat color={MANIM.purple} label="Ángulo límite">{Number.isFinite(lim) ? `${f1(lim)}°` : "no existe (pasa a un medio más denso)"}</Stat>
        <Stat color={MANIM.blue} label="Velocidad de la luz en cada medio">{`${fmtEs(velocidadEnMedio(m1.n) / 1e8, 2)}·10⁸ y ${fmtEs(velocidadEnMedio(m2.n) / 1e8, 2)}·10⁸ m/s`}</Stat>
      </Readout>
      <Note>Al llegar a la frontera entre dos medios, la luz <b>se refleja</b> y <b>se refracta</b>. <b>Reflexión</b>: el ángulo de reflexión es <b>igual</b> al de incidencia (ambos medidos respecto a la <b>normal</b>). <b>Refracción</b> (ley de Snell): <b>n₁·sen θ₁ = n₂·sen θ₂</b>, donde el <b>índice de refracción</b> n = c/v mide cuánto frena el medio a la luz. Si pasa a un medio <b>más denso</b> (mayor n), el rayo <b>se acerca a la normal</b>; si pasa a uno menos denso, <b>se aleja</b>, y si el ángulo supera el <b>ángulo límite</b> hay <b>reflexión total</b> (fibra óptica). La refracción explica el aspecto «quebrado» de un lápiz en el agua y el arcoíris (dispersión).</Note>
    </Frame>
  );
}

/* ───────────── 5. Contaminación acústica ───────────── */

export function ContaminacionAcusticaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { dB: Math.round(num(block.params?.a, 85, 20, 140)) };
  const [s, setS] = useState(init);
  const t = tiempoMaxExposicion(s.dB);
  const x = (v: number): number => 40 + ((v - 20) / 120) * 440;
  const peligro = s.dB >= 85;
  const txtT = t >= 1 ? `${f1(t)} h` : t * 60 >= 1 ? `${f0(t * 60)} min` : `${f0(t * 3600)} s`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada 3 dB más, el tiempo seguro de exposición se divide por 2."}
      onReset={() => setS(init)}
      controls={<Slider label="Nivel sonoro" value={s.dB} min={20} max={140} step={1} unit=" dB" color={peligro ? MANIM.red : MANIM.green} onChange={(dB) => setS({ dB })} />}
    >
      <Svg w={520} h={120} testId="contaminacion-acustica" maxH={140}>
        <rect x={40} y={50} width={440} height={16} fill={MANIM.panel} />
        <rect x={x(20)} y={50} width={x(85) - x(20)} height={16} fill={MANIM.green} fillOpacity={0.7} />
        <rect x={x(85)} y={50} width={x(120) - x(85)} height={16} fill={MANIM.orange} fillOpacity={0.8} />
        <rect x={x(120)} y={50} width={x(140) - x(120)} height={16} fill={MANIM.red} fillOpacity={0.85} />
        <polygon points={`${x(s.dB)},72 ${x(s.dB) - 7},86 ${x(s.dB) + 7},86`} fill={MANIM.ink} />
        {FUENTES_RUIDO.map((f, k) => (
          <g key={f.nombre}>
            <Seg a={[x(f.dB), 44]} b={[x(f.dB), 50]} color={MANIM.muted} width={1.5} />
            <text x={x(f.dB)} y={[38, 26, 14][k % 3]} textAnchor="middle" fill={MANIM.muted} fontSize={10}>{`${f.nombre} ${f.dB}`}</text>
          </g>
        ))}
        <text x={x(85)} y={108} textAnchor="middle" fill={MANIM.orange} fontSize={11}>85 dB: límite de exposición de 8 h</text>
      </Svg>
      <Readout>
        <Stat color={peligro ? MANIM.red : MANIM.green} label="Valoración">{categoriaRuido(s.dB)}</Stat>
        <Stat color={MANIM.orange} label="Tiempo máximo de exposición diaria">{s.dB < 80 ? "sin límite práctico" : txtT}</Stat>
        <Stat color={MANIM.blue} label="Intensidad respecto a 60 dB">{`× ${fmtEs(10 ** ((s.dB - 60) / 10), 0)}`}</Stat>
      </Readout>
      <Note>El <b>nivel de intensidad sonora</b> se mide en <b>decibelios (dB)</b>, una escala <b>logarítmica</b>: <b>+10 dB</b> significa <b>10 veces</b> más intensidad y <b>+3 dB</b> la duplica. El umbral de audición es 0 dB y el del dolor ≈ 120–130 dB. La exposición prolongada a más de <b>85 dB</b> daña el oído de forma <b>irreversible</b>. La OMS recomienda en ambiente <b>menos de 55 dB</b> en el exterior de día y 40 dB de noche en las viviendas. La <b>contaminación acústica</b> también causa estrés, alteraciones del sueño y problemas cardiovasculares. Los valores son orientativos.</Note>
    </Frame>
  );
}
