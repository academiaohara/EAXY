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
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;
export type P2 = [number, number];

/** Punto de una trayectoria curva (Bézier cuadrática) entre A y B; `curva` desplaza el punto de control en perpendicular. */
export function puntoTrayectoria(a: P2, b: P2, curva: number, u: number): P2 {
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2;
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const c: P2 = [mx - dy * curva * 0.5, my + dx * curva * 0.5];
  const w = 1 - u;
  return [w * w * a[0] + 2 * w * u * c[0] + u * u * b[0], w * w * a[1] + 2 * w * u * c[1] + u * u * b[1]];
}
/** Longitud recorrida a lo largo de la trayectoria (m). */
export function longitudTrayectoria(a: P2, b: P2, curva: number, n = 200): number {
  let s = 0;
  let prev = puntoTrayectoria(a, b, curva, 0);
  for (let k = 1; k <= n; k++) {
    const p = puntoTrayectoria(a, b, curva, k / n);
    s += Math.hypot(p[0] - prev[0], p[1] - prev[1]);
    prev = p;
  }
  return s;
}
/** Vector desplazamiento Δr = B − A y su módulo. */
export const desplazamiento = (a: P2, b: P2): { dx: number; dy: number; modulo: number } => ({ dx: b[0] - a[0], dy: b[1] - a[1], modulo: Math.hypot(b[0] - a[0], b[1] - a[1]) });

/** Posición y velocidad de un móvil con aceleración constante. */
export const posicion = (x0: number, v0: number, a: number, t: number): number => x0 + v0 * t + 0.5 * a * t * t;
export const velocidad = (v0: number, a: number, t: number): number => v0 + a * t;
/** Instantes (≥ 0, ordenados) en que dos móviles coinciden: ½(a₁−a₂)t² + (v₁−v₂)t + (x₁−x₂) = 0. */
export function instantesEncuentro(x1: number, v1: number, a1: number, x2: number, v2: number, a2: number): number[] {
  const A = 0.5 * (a1 - a2);
  const B = v1 - v2;
  const C = x1 - x2;
  const roots: number[] = [];
  if (Math.abs(A) < 1e-12) {
    if (Math.abs(B) > 1e-12) roots.push(-C / B);
  } else {
    const d = B * B - 4 * A * C;
    if (d >= 0) roots.push((-B - Math.sqrt(d)) / (2 * A), (-B + Math.sqrt(d)) / (2 * A));
  }
  return roots.filter((t) => t >= 0 && Number.isFinite(t)).sort((p, q) => p - q);
}

/** Lanzamiento vertical desde h0 con velocidad v0 (positiva hacia arriba): alturas y tiempos. */
export function tiroVertical(h0: number, v0: number, g = G) {
  const hMax = v0 > 0 ? h0 + (v0 * v0) / (2 * g) : h0;
  const tSubida = v0 > 0 ? v0 / g : 0;
  const disc = v0 * v0 + 2 * g * h0;
  const tVuelo = disc >= 0 ? (v0 + Math.sqrt(disc)) / g : NaN;
  const vImpacto = disc >= 0 ? -Math.sqrt(disc) : NaN;
  return { hMax, tSubida, tVuelo, vImpacto };
}
export const alturaEn = (h0: number, v0: number, t: number, g = G): number => h0 + v0 * t - 0.5 * g * t * t;

/** Magnitudes del movimiento circular uniforme para radio R (m) y periodo T (s). */
export function mcu(R: number, T: number) {
  if (!(R > 0) || !(T > 0)) return { omega: NaN, v: NaN, f: NaN, ac: NaN, rpm: NaN };
  const omega = (2 * Math.PI) / T;
  return { omega, v: omega * R, f: 1 / T, ac: omega * omega * R, rpm: 60 / T };
}

export const SUPERFICIES = [
  { id: "seco", nombre: "Asfalto seco", mu: 0.7 },
  { id: "mojado", nombre: "Asfalto mojado", mu: 0.4 },
  { id: "nieve", nombre: "Nieve", mu: 0.2 },
  { id: "hielo", nombre: "Hielo", mu: 0.1 },
] as const;
/** Distancias de reacción, de frenada y total (m); v en km/h, t de reacción en s, deceleración μ·g. */
export function distanciasParada(vKmh: number, tReaccion: number, mu: number) {
  const v = Math.max(0, vKmh) / 3.6;
  const dReaccion = v * Math.max(0, tReaccion);
  const a = mu * G;
  const dFrenada = a > 0 ? (v * v) / (2 * a) : Infinity;
  return { v, dReaccion, dFrenada, total: dReaccion + dFrenada, a };
}

/* ───────────── 1. Vectores del movimiento ───────────── */

export function VectoresMovimientoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { ax: 1, ay: 1, bx: Math.round(num(block.params?.a, 8, 0, 10)), by: Math.round(num(block.params?.b, 5, 0, 10)), curva: num(block.params?.c, 1, -2, 2), t: 10 };
  const [s, setS] = useState(init);
  const A: P2 = [s.ax, s.ay];
  const B: P2 = [s.bx, s.by];
  const d = desplazamiento(A, B);
  const L = longitudTrayectoria(A, B, s.curva);
  const X = (x: number): number => 40 + x * 36;
  const Y = (y: number): number => 190 - y * 17;
  const pts = Array.from({ length: 41 }, (_, k) => puntoTrayectoria(A, B, s.curva, k / 40)).map((p) => `${X(p[0])},${Y(p[1])}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "El desplazamiento es el vector de A a B; la distancia recorrida es la longitud del camino."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición final x" value={s.bx} min={0} max={10} step={1} unit=" m" color={MANIM.blue} onChange={(bx) => setS((o) => ({ ...o, bx }))} />
          <Slider label="Posición final y" value={s.by} min={0} max={10} step={1} unit=" m" color={MANIM.blue} onChange={(by) => setS((o) => ({ ...o, by }))} />
          <Slider label="Curvatura del camino" value={s.curva} min={-2} max={2} step={0.25} color={MANIM.orange} format={f2} onChange={(curva) => setS((o) => ({ ...o, curva }))} />
          <Slider label="Tiempo empleado" value={s.t} min={1} max={60} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={210} testId="vectores-movimiento" maxH={230}>
        <Seg a={[40, 190]} b={[420, 190]} color={MANIM.ink} width={2} />
        <Seg a={[40, 190]} b={[40, 10]} color={MANIM.ink} width={2} />
        <polyline points={pts} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <Seg a={[X(A[0]), Y(A[1])]} b={[X(B[0]), Y(B[1])]} color={MANIM.blue} width={2.5} dashed />
        <Dot p={[X(A[0]), Y(A[1])]} r={6} color={MANIM.green} />
        <Dot p={[X(B[0]), Y(B[1])]} r={6} color={MANIM.red} />
        <text x={X(A[0]) + 8} y={Y(A[1]) + 16} fill={MANIM.green} fontSize={12}>A</text>
        <text x={X(B[0]) + 8} y={Y(B[1]) - 8} fill={MANIM.red} fontSize={12}>B</text>
        <text x={420} y={206} textAnchor="end" fill={MANIM.muted} fontSize={12}>x (m)</text>
        <text x={48} y={14} fill={MANIM.muted} fontSize={12}>y (m)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Desplazamiento Δr">{`(${f1(d.dx)}, ${f1(d.dy)}) m · |Δr| = ${f2(d.modulo)} m`}</Stat>
        <Stat color={MANIM.orange} label="Distancia recorrida">{`${f2(L)} m`}</Stat>
        <Stat color={MANIM.purple} label="Velocidad media (vector)">{`(${f2(d.dx / s.t)}, ${f2(d.dy / s.t)}) m/s · ${f2(d.modulo / s.t)} m/s`}</Stat>
        <Stat color={MANIM.green} label="Rapidez media">{`${f2(L / s.t)} m/s`}</Stat>
      </Readout>
      <Note>El <b>vector de posición</b> r va del origen al móvil. El <b>desplazamiento</b> Δr = r₂ − r₁ es el vector de la posición inicial a la final (línea azul discontinua); la <b>distancia recorrida</b> es la longitud del <b>camino</b> (naranja) y nunca es menor que |Δr|; solo coinciden si el movimiento es rectilíneo sin cambiar de sentido. La <b>velocidad media</b> es el vector Δr/Δt; la <b>rapidez media</b> es distancia/Δt. La <b>velocidad instantánea</b> es tangente a la trayectoria y la <b>aceleración</b> mide cómo cambia el vector velocidad (módulo <i>o</i> dirección).</Note>
    </Frame>
  );
}

/* ───────────── 2. Encuentro de móviles ───────────── */

export function EncuentroFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { x2: Math.round(num(block.params?.a, 200, 0, 500)), v1: Math.round(num(block.params?.b, 20, 0, 40)), a1: 0, v2: -10, a2: 0 };
  const [s, setS] = useState(init);
  const ts = instantesEncuentro(0, s.v1, s.a1, s.x2, s.v2, s.a2);
  const T = 20;
  const vals = [0, T].flatMap((t) => [posicion(0, s.v1, s.a1, t), posicion(s.x2, s.v2, s.a2, t)]);
  const lo = Math.min(0, ...vals);
  const hi = Math.max(1, ...vals);
  const X = (t: number): number => 50 + (t / T) * 420;
  const Y = (x: number): number => 150 - ((x - lo) / (hi - lo)) * 125;
  const curva = (x0: number, v0: number, a: number): string => Array.from({ length: 41 }, (_, k) => `${X(k / 2)},${Y(Math.max(lo - 1e4, Math.min(hi + 1e4, posicion(x0, v0, a, k / 2))))}`).join(" ");
  const t1 = ts[0];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos móviles se encuentran cuando sus posiciones coinciden: x₁(t) = x₂(t)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición inicial del móvil 2" value={s.x2} min={0} max={500} step={10} unit=" m" color={MANIM.red} onChange={(x2) => setS((o) => ({ ...o, x2 }))} />
          <Slider label="Velocidad inicial del móvil 1" value={s.v1} min={0} max={40} step={1} unit=" m/s" color={MANIM.blue} onChange={(v1) => setS((o) => ({ ...o, v1 }))} />
          <Slider label="Aceleración del móvil 1" value={s.a1} min={-4} max={4} step={0.5} unit=" m/s²" color={MANIM.blue} format={f1} onChange={(a1) => setS((o) => ({ ...o, a1 }))} />
          <Slider label="Velocidad inicial del móvil 2" value={s.v2} min={-40} max={40} step={1} unit=" m/s" color={MANIM.red} onChange={(v2) => setS((o) => ({ ...o, v2 }))} />
          <Slider label="Aceleración del móvil 2" value={s.a2} min={-4} max={4} step={0.5} unit=" m/s²" color={MANIM.red} format={f1} onChange={(a2) => setS((o) => ({ ...o, a2 }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="encuentro" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <polyline points={curva(0, s.v1, s.a1)} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <polyline points={curva(s.x2, s.v2, s.a2)} fill="none" stroke={MANIM.red} strokeWidth={3} />
        {t1 !== undefined && t1 <= T && <Dot p={[X(t1), Y(posicion(0, s.v1, s.a1, t1))]} r={6} color={MANIM.yellow} />}
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>t (s)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>x (m)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Se encuentran en">{t1 === undefined ? "nunca (no se cruzan)" : `t = ${f2(t1)} s · x = ${f1(posicion(0, s.v1, s.a1, t1))} m`}</Stat>
        {ts.length > 1 && <Stat color={MANIM.muted} label="Segundo encuentro">{`t = ${f2(ts[1]!)} s`}</Stat>}
        <Stat color={MANIM.blue} label="Móvil 1 · parte de x = 0">{`v₀ = ${s.v1} m/s, a = ${f1(s.a1)} m/s²`}</Stat>
        <Stat color={MANIM.red} label="Móvil 2">{`x₀ = ${s.x2} m, v₀ = ${s.v2} m/s, a = ${f1(s.a2)} m/s²`}</Stat>
      </Readout>
      <Note>Para que dos móviles <b>se encuentren</b>, deben estar en la <b>misma posición en el mismo instante</b>: se escriben las ecuaciones x = x₀ + v₀·t + ½·a·t² de cada uno, se <b>igualan</b> y se resuelve para t (ecuación de primer grado en el MRU y de segundo en el MRUA). El cruce de las dos gráficas x–t es el encuentro. Con signo <b>negativo</b> la velocidad va hacia el origen. La gráfica se muestra en los primeros 20 s.</Note>
    </Frame>
  );
}

/* ───────────── 3. Tiro vertical ───────────── */

export function TiroVerticalFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { h0: Math.round(num(block.params?.a, 0, 0, 60)), v0: Math.round(num(block.params?.b, 20, -20, 40)), t: 1 };
  const [s, setS] = useState(init);
  const r = tiroVertical(s.h0, s.v0);
  const T = Number.isFinite(r.tVuelo) && r.tVuelo > 0 ? r.tVuelo : 1;
  const tt = Math.min(s.t, T);
  const hi = Math.max(1, r.hMax);
  const X = (t: number): number => 50 + (t / T) * 420;
  const Y = (h: number): number => 150 - (Math.max(0, h) / hi) * 125;
  const pts = Array.from({ length: 41 }, (_, k) => `${X((k / 40) * T)},${Y(alturaEn(s.h0, s.v0, (k / 40) * T))}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Subida y bajada son un mismo MRUA con a = −g = −9,8 m/s²."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura inicial" value={s.h0} min={0} max={60} step={1} unit=" m" color={MANIM.green} onChange={(h0) => setS((o) => ({ ...o, h0 }))} />
          <Slider label="Velocidad inicial (+ arriba, − abajo)" value={s.v0} min={-20} max={40} step={1} unit=" m/s" color={MANIM.blue} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Instante a consultar" value={tt} min={0} max={Math.round(T * 10) / 10} step={0.1} unit=" s" color={MANIM.purple} format={f1} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="tiro-vertical" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Dot p={[X(tt), Y(alturaEn(s.h0, s.v0, tt))]} r={6} color={MANIM.orange} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>t (s)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>h (m)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={`A los ${f1(tt)} s`}>{`h = ${f1(alturaEn(s.h0, s.v0, tt))} m · v = ${f1(s.v0 - G * tt)} m/s`}</Stat>
        <Stat color={MANIM.blue} label="Altura máxima">{`${f1(r.hMax)} m${r.tSubida > 0 ? ` (a los ${f2(r.tSubida)} s)` : ""}`}</Stat>
        <Stat color={MANIM.green} label="Tiempo hasta el suelo">{`${fin(r.tVuelo, f2)} s`}</Stat>
        <Stat color={MANIM.red} label="Velocidad al llegar al suelo">{`${fin(r.vImpacto, f1)} m/s`}</Stat>
      </Readout>
      <Note>En <b>caída libre</b> y en el <b>tiro vertical</b> la única aceleración es la de la gravedad: <b>g ≈ 9,8 m/s²</b> hacia abajo, igual para todos los cuerpos sin rozamiento. Con el eje hacia arriba: <b>v = v₀ − g·t</b> y <b>h = h₀ + v₀·t − ½·g·t²</b>. En el punto más alto <b>v = 0</b>; sube y baja el mismo tiempo, y vuelve al punto de partida con la misma rapidez con la que salió. La altura máxima es h₀ + v₀²/(2g).</Note>
    </Frame>
  );
}

/* ───────────── 4. Movimiento circular uniforme ───────────── */

export function McuFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { R: num(block.params?.a, 2, 0.5, 10), T: num(block.params?.b, 4, 0.5, 20), t: 0 };
  const [s, setS] = useState(init);
  const m = mcu(s.R, s.T);
  const ang = m.omega * s.t;
  const rpx = 35 + s.R * 5;
  const cx = 130;
  const cy = 120;
  const px = cx + rpx * Math.cos(ang);
  const py = cy - rpx * Math.sin(ang);
  const dir: P2 = [-Math.sin(ang), -Math.cos(ang)];
  const ar = rpx * 0.5;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Rapidez constante, pero la velocidad cambia de dirección: hay aceleración hacia el centro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Radio" value={s.R} min={0.5} max={10} step={0.5} unit=" m" color={MANIM.blue} format={f1} onChange={(R) => setS((o) => ({ ...o, R }))} />
          <Slider label="Periodo" value={s.T} min={0.5} max={20} step={0.5} unit=" s" color={MANIM.orange} format={f1} onChange={(T) => setS((o) => ({ ...o, T }))} />
          <Slider label="Instante" value={s.t} min={0} max={20} step={0.25} unit=" s" color={MANIM.purple} format={f2} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="mcu" maxH={260}>
        <circle cx={cx} cy={cy} r={rpx} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
        <Dot p={[cx, cy]} r={3} color={MANIM.ink} />
        <Seg a={[cx, cy]} b={[px, py]} color={MANIM.muted} width={1.5} />
        <Seg a={[px, py]} b={[px + dir[0] * 34, py + dir[1] * 34]} color={MANIM.green} width={3} />
        <Seg a={[px, py]} b={[px + ((cx - px) / rpx) * ar, py + ((cy - py) / rpx) * ar]} color={MANIM.red} width={3} />
        <Dot p={[px, py]} r={7} color={MANIM.orange} />
        <text x={px + dir[0] * 46} y={py + dir[1] * 46 + 4} textAnchor="middle" fill={MANIM.green} fontSize={13}>v</text>
        <text x={px + ((cx - px) / rpx) * (ar + 10)} y={py + ((cy - py) / rpx) * (ar + 10) + 4} textAnchor="middle" fill={MANIM.red} fontSize={13}>a</text>
        <text x={300} y={100} fill={MANIM.green} fontSize={14}>▬ v: tangente a la trayectoria</text>
        <text x={300} y={130} fill={MANIM.red} fontSize={14}>▬ a: hacia el centro (centrípeta)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Velocidad angular ω = 2π/T">{`${fin(m.omega, f2)} rad/s`}</Stat>
        <Stat color={MANIM.green} label="Rapidez lineal v = ω·R">{`${fin(m.v, f2)} m/s`}</Stat>
        <Stat color={MANIM.blue} label="Frecuencia · rpm">{`${fin(m.f, f2)} Hz · ${fin(m.rpm, f1)} rpm`}</Stat>
        <Stat color={MANIM.red} label="Aceleración centrípeta a = v²/R">{`${fin(m.ac, f2)} m/s²`}</Stat>
        <Stat color={MANIM.purple} label="Ángulo recorrido">{`${f1(((ang * 180) / Math.PI) % 360)}° (${f2(ang)} rad)`}</Stat>
      </Readout>
      <Note>En el <b>movimiento circular uniforme (MCU)</b> la <b>rapidez es constante</b> pero la <b>velocidad cambia de dirección</b>: por eso hay <b>aceleración</b>, dirigida al centro (<b>centrípeta</b>), de módulo <b>a = v²/R = ω²·R</b>. Se describe con el <b>periodo</b> T (tiempo de una vuelta), la <b>frecuencia</b> f = 1/T (vueltas por segundo, Hz) y la <b>velocidad angular</b> ω = 2π/T = 2π·f (rad/s). Se relacionan con v = ω·R. El ángulo recorrido es φ = ω·t.</Note>
    </Frame>
  );
}

/* ───────────── 5. Seguridad vial ───────────── */

export function SeguridadVialFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { v: Math.round(num(block.params?.a, 90, 20, 150)), tr: num(block.params?.b, 1, 0.2, 2.5), sup: Math.round(num(block.params?.n, 0, 0, SUPERFICIES.length - 1)), obs: 80 };
  const [s, setS] = useState(init);
  const sup = SUPERFICIES[s.sup]!;
  const d = distanciasParada(s.v, s.tr, sup.mu);
  const escala = Math.max(150, d.total * 1.1, s.obs * 1.1);
  const X = (m: number): number => 30 + (Math.min(m, escala) / escala) * 460;
  const para = d.total <= s.obs;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La distancia de frenado crece con el cuadrado de la velocidad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad" value={s.v} min={20} max={150} step={5} unit=" km/h" color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Tiempo de reacción" value={s.tr} min={0.2} max={2.5} step={0.1} unit=" s" color={MANIM.orange} format={f1} onChange={(tr) => setS((o) => ({ ...o, tr }))} />
          <Slider label="Distancia al obstáculo" value={s.obs} min={10} max={200} step={5} unit=" m" color={MANIM.red} onChange={(obs) => setS((o) => ({ ...o, obs }))} />
          <Choice label="Superficie" items={SUPERFICIES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.sup)} onChange={(k) => setS((o) => ({ ...o, sup: Number(k) }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="seguridad-vial" maxH={130}>
        <rect x={X(0)} y={40} width={X(d.dReaccion) - X(0)} height={26} fill={MANIM.orange} fillOpacity={0.8} />
        <rect x={X(d.dReaccion)} y={40} width={Math.max(0, X(d.total) - X(d.dReaccion))} height={26} fill={MANIM.blue} fillOpacity={0.8} />
        <Seg a={[X(s.obs), 25]} b={[X(s.obs), 85]} color={MANIM.red} width={4} />
        <text x={X(s.obs)} y={20} textAnchor="middle" fill={MANIM.red} fontSize={12}>obstáculo</text>
        <text x={30} y={100} fill={MANIM.orange} fontSize={12}>reacción</text>
        <text x={120} y={100} fill={MANIM.blue} fontSize={12}>frenada</text>
        <text x={490} y={100} textAnchor="end" fill={MANIM.muted} fontSize={12}>{`0 – ${Math.round(escala)} m`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Distancia de reacción (v·t)">{`${f1(d.dReaccion)} m`}</Stat>
        <Stat color={MANIM.blue} label={`Distancia de frenada (μ = ${fmtEs(sup.mu, 1)})`}>{`${f1(d.dFrenada)} m`}</Stat>
        <Stat color={MANIM.purple} label="Distancia total de detención">{`${f1(d.total)} m`}</Stat>
        <Stat color={para ? MANIM.green : MANIM.red} label="Resultado">{para ? `Se detiene a ${f1(s.obs - d.total)} m del obstáculo` : `Choca: llega con exceso de ${f1(d.total - s.obs)} m`}</Stat>
      </Readout>
      <Note>La <b>distancia de detención</b> tiene dos partes: la de <b>reacción</b> (el conductor aún no ha frenado: MRU, d = v·t) y la de <b>frenada</b> (MRUA con a = μ·g, d = v²/(2a)). Como la frenada depende de <b>v²</b>, <b>duplicar la velocidad</b> la multiplica por <b>cuatro</b>. El cansancio, el alcohol o el móvil aumentan el tiempo de reacción; la lluvia o el hielo reducen el rozamiento μ. Los valores de μ son orientativos.</Note>
    </Frame>
  );
}
