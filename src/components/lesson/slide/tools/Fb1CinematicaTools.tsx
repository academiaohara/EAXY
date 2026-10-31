"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, arrowHead, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");
const cero = (v: number): number => (Math.abs(v) < 5e-3 ? 0 : v);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;
export type V2 = [number, number];
export const mod = (v: V2): number => Math.hypot(v[0], v[1]);
export const angulo = (v: V2): number => (Math.atan2(v[1], v[0]) * 180) / Math.PI;

/** Movimiento con aceleración constante: r = r₀ + v₀·t + ½·a·t², v = v₀ + a·t. */
export const posicion = (r0: V2, v0: V2, a: V2, t: number): V2 => [r0[0] + v0[0] * t + 0.5 * a[0] * t * t, r0[1] + v0[1] * t + 0.5 * a[1] * t * t];
export const velocidad = (v0: V2, a: V2, t: number): V2 => [v0[0] + a[0] * t, v0[1] + a[1] * t];
/** Componentes intrínsecas de la aceleración: tangencial (a·v/|v|) y normal (el resto); radio de curvatura R = v²/aₙ. */
export function intrinsecas(v: V2, a: V2) {
  const vm = mod(v);
  if (!(vm > 1e-9)) return { at: NaN, an: NaN, R: NaN, am: mod(a) };
  const at = (a[0] * v[0] + a[1] * v[1]) / vm;
  const am = mod(a);
  const an = Math.sqrt(Math.max(0, am * am - at * at));
  return { at, an, R: an > 1e-9 ? (vm * vm) / an : Infinity, am };
}
/** Velocidad media (vector) entre dos instantes. */
export const velocidadMedia = (r0: V2, v0: V2, a: V2, t1: number, t2: number): V2 => {
  const p1 = posicion(r0, v0, a, t1);
  const p2 = posicion(r0, v0, a, t2);
  return t2 !== t1 ? [(p2[0] - p1[0]) / (t2 - t1), (p2[1] - p1[1]) / (t2 - t1)] : [NaN, NaN];
};

/** MRU/MRUA unidimensional. */
export const x1d = (x0: number, v0: number, a: number, t: number): number => x0 + v0 * t + 0.5 * a * t * t;
export const v1d = (v0: number, a: number, t: number): number => v0 + a * t;
export const velocidadSinTiempo = (v0: number, a: number, dx: number): number => {
  const v2 = v0 * v0 + 2 * a * dx;
  return v2 >= 0 ? Math.sqrt(v2) : NaN;
};
/** Tiempo en que se anula la velocidad (a ≠ 0) y desplazamiento hasta ese instante. */
export const tParada = (v0: number, a: number): number => (a !== 0 && -v0 / a > 0 ? -v0 / a : NaN);
/** Distancia total recorrida entre 0 y t (suma de los módulos si el móvil da la vuelta). */
export function distanciaRecorrida(x0: number, v0: number, a: number, t: number): number {
  const tp = tParada(v0, a);
  if (Number.isFinite(tp) && tp < t) return Math.abs(x1d(x0, v0, a, tp) - x0) + Math.abs(x1d(x0, v0, a, t) - x1d(x0, v0, a, tp));
  return Math.abs(x1d(x0, v0, a, t) - x0);
}

/** Tiro oblicuo desde altura h0 con rapidez v0 y ángulo θ (grados): tiempo de vuelo, alcance, altura máxima y velocidad de impacto. */
export function tiroOblicuo(v0: number, ang: number, h0: number, g = G) {
  const th = (ang * Math.PI) / 180;
  const vx = v0 * Math.cos(th);
  const vy = v0 * Math.sin(th);
  const disc = vy * vy + 2 * g * h0;
  const tVuelo = disc >= 0 ? (vy + Math.sqrt(disc)) / g : NaN;
  const tSubida = vy > 0 ? vy / g : 0;
  const hMax = h0 + (vy > 0 ? (vy * vy) / (2 * g) : 0);
  const alcance = Number.isFinite(tVuelo) ? vx * tVuelo : NaN;
  const vyImp = vy - g * tVuelo;
  return { vx, vy, tVuelo, tSubida, hMax, alcance, vImpacto: Math.hypot(vx, vyImp), anguloImpacto: (Math.atan2(vyImp, vx) * 180) / Math.PI };
}
export const posicionParabolica = (v0: number, ang: number, h0: number, t: number, g = G): V2 => {
  const th = (ang * Math.PI) / 180;
  return [v0 * Math.cos(th) * t, h0 + v0 * Math.sin(th) * t - 0.5 * g * t * t];
};

/** Movimiento circular con aceleración angular constante. */
export function circular(R: number, w0: number, alfa: number, t: number) {
  const w = w0 + alfa * t;
  const phi = w0 * t + 0.5 * alfa * t * t;
  const v = w * R;
  const at = alfa * R;
  const an = w * w * R;
  return { w, phi, vueltas: phi / (2 * Math.PI), v, at, an, a: Math.hypot(at, an), T: w !== 0 ? (2 * Math.PI) / Math.abs(w) : Infinity, f: Math.abs(w) / (2 * Math.PI) };
}
export const rpmARads = (rpm: number): number => (rpm * 2 * Math.PI) / 60;
export const radsARpm = (w: number): number => (w * 60) / (2 * Math.PI);

/** Barca que cruza un río: velocidad de la barca respecto al agua, velocidad del agua y ángulo de la proa respecto a la orilla (90° = perpendicular). */
export function barcaRio(vb: number, vr: number, proaGrados: number, ancho: number) {
  const th = (proaGrados * Math.PI) / 180;
  const vx = vr + vb * Math.cos(th); // a lo largo de la orilla (corriente)
  const vy = vb * Math.sin(th); // perpendicular a la orilla
  const t = vy > 1e-9 ? ancho / vy : NaN;
  return { vx, vy, v: Math.hypot(vx, vy), t, deriva: Number.isFinite(t) ? vx * t : NaN, trayectoria: Number.isFinite(t) ? Math.hypot(vx * t, ancho) : NaN };
}
/** Ángulo de proa (respecto a la orilla, hacia aguas arriba) para llegar justo enfrente: cos θ = −v_r/v_b. */
export const proaRectaGrados = (vb: number, vr: number): number => (vb > vr && vr >= 0 ? (Math.acos(-vr / vb) * 180) / Math.PI : NaN);

/* ───────────── Dibujo ───────────── */

function Flecha({ a, b, color, width = 3 }: { a: Pt; b: Pt; color: string; width?: number }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < 4) return null;
  return (
    <g>
      <Seg a={a} b={b} color={color} width={width} />
      <polygon points={arrowHead(a, b, Math.min(11, len * 0.6))} fill={color} />
    </g>
  );
}

/* ───────────── 1. Vectores cinemáticos ───────────── */

export function VectoresCinFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { vx: Math.round(num(block.params?.a, 10, -20, 20)), vy: Math.round(num(block.params?.b, 10, -20, 20)), ax: 0, ay: Math.round(num(block.params?.c, -4, -10, 10)), t: 2 };
  const [s, setS] = useState(init);
  const r0: V2 = [0, 0];
  const v0: V2 = [s.vx, s.vy];
  const a: V2 = [s.ax, s.ay];
  const r = posicion(r0, v0, a, s.t);
  const v = velocidad(v0, a, s.t);
  const intr = intrinsecas(v, a);
  const X = (x: number): number => 50 + x * 7;
  const Y = (y: number): number => 140 - y * 5;
  const pts = Array.from({ length: 61 }, (_, k) => posicion(r0, v0, a, (k / 60) * 6)).map((p) => `${X(p[0])},${Y(p[1])}`).join(" ");
  const clamp = (x: number, y: number): Pt => [Math.max(10, Math.min(500, X(x))), Math.max(10, Math.min(150, Y(y)))];
  const P = clamp(r[0], r[1]);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La velocidad es tangente a la trayectoria; la aceleración se descompone en tangencial (cambia el módulo) y normal (cambia la dirección)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad inicial vₓ" value={s.vx} min={-20} max={20} step={1} unit=" m/s" color={MANIM.blue} onChange={(vx) => setS((o) => ({ ...o, vx }))} />
          <Slider label="Velocidad inicial v_y" value={s.vy} min={-20} max={20} step={1} unit=" m/s" color={MANIM.blue} onChange={(vy) => setS((o) => ({ ...o, vy }))} />
          <Slider label="Aceleración aₓ" value={s.ax} min={-10} max={10} step={1} unit=" m/s²" color={MANIM.orange} onChange={(ax) => setS((o) => ({ ...o, ax }))} />
          <Slider label="Aceleración a_y" value={s.ay} min={-10} max={10} step={1} unit=" m/s²" color={MANIM.orange} onChange={(ay) => setS((o) => ({ ...o, ay }))} />
          <Slider label="Instante" value={s.t} min={0} max={6} step={0.25} unit=" s" color={MANIM.purple} format={f2} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="vectores-cinematicos" maxH={190}>
        <Seg a={[50, 140]} b={[500, 140]} color={MANIM.muted} width={1.5} />
        <Seg a={[50, 140]} b={[50, 10]} color={MANIM.muted} width={1.5} />
        <polyline points={pts} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="5 5" />
        <Seg a={[50, 140]} b={P} color={MANIM.ink} width={1.5} dashed />
        <Flecha a={P} b={[P[0] + v[0] * 2.5, P[1] - v[1] * 2.5]} color={MANIM.green} width={3} />
        <Flecha a={P} b={[P[0] + a[0] * 5, P[1] - a[1] * 5]} color={MANIM.red} width={3} />
        <Dot p={P} r={6} color={MANIM.orange} />
        <text x={500} y={156} textAnchor="end" fill={MANIM.muted} fontSize={11}>verde: v · rojo: a · línea blanca: r</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.ink} label="Posición r(t) · |r|">{`(${f1(cero(r[0]))}, ${f1(cero(r[1]))}) m · ${f1(mod(r))} m`}</Stat>
        <Stat color={MANIM.green} label="Velocidad v(t) · rapidez · ángulo">{`(${f1(cero(v[0]))}, ${f1(cero(v[1]))}) m/s · ${f1(mod(v))} m/s · ${f1(angulo(v))}°`}</Stat>
        <Stat color={MANIM.red} label="Aceleración a · |a|">{`(${f1(a[0])}, ${f1(a[1])}) m/s² · ${f2(intr.am)} m/s²`}</Stat>
        <Stat color={MANIM.orange} label="Componente tangencial aₜ">{`${fin(cero(intr.at), f2)} m/s² (${intr.at > 0.005 ? "aumenta la rapidez" : intr.at < -0.005 ? "disminuye la rapidez" : "rapidez constante"})`}</Stat>
        <Stat color={MANIM.blue} label="Componente normal aₙ · radio de curvatura">{`${fin(cero(intr.an), f2)} m/s² · R = ${intr.R === Infinity ? "∞ (trayectoria recta)" : `${fin(intr.R, f1)} m`}`}</Stat>
      </Readout>
      <Note>El <b>vector de posición r</b> localiza el móvil respecto al origen del <b>sistema de referencia</b>. La <b>velocidad</b> es la derivada de la posición, <b>v = dr/dt</b>, y es siempre <b>tangente a la trayectoria</b>; la <b>aceleración</b> es la derivada de la velocidad, <b>a = dv/dt</b>. Con aceleración constante: <b>r = r₀ + v₀·t + ½·a·t²</b> y <b>v = v₀ + a·t</b> (vectoriales: se aplican a cada componente). La <b>velocidad media</b> es Δr/Δt; la <b>instantánea</b>, el límite cuando Δt → 0. La aceleración se descompone en <b>tangencial aₜ</b> (cambia el <b>módulo</b> de v; vale dv/dt) y <b>normal aₙ</b> (cambia su <b>dirección</b>; vale v²/R, con R el radio de curvatura). Si a ∥ v, la trayectoria es recta; si a ⟂ v, el movimiento es circular uniforme.</Note>
    </Frame>
  );
}

/* ───────────── 2. MRU y MRUA con gráficas ───────────── */

export function GraficasMruaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { x0: Math.round(num(block.params?.a, 0, -50, 50)), v0: Math.round(num(block.params?.b, 10, -20, 30)), a: num(block.params?.c, -2, -5, 5), t: 4 };
  const [s, setS] = useState(init);
  const T = 10;
  const tp = tParada(s.v0, s.a);
  const xs = Array.from({ length: 51 }, (_, k) => x1d(s.x0, s.v0, s.a, (k / 50) * T));
  const vs = Array.from({ length: 51 }, (_, k) => v1d(s.v0, s.a, (k / 50) * T));
  const rng = (arr: number[]): [number, number] => [Math.min(0, ...arr), Math.max(0.001, ...arr)];
  const [xl, xh] = rng(xs);
  const [vl, vh] = rng(vs);
  const gx = (t: number, w = 150): number => (t / T) * w;
  const panel = (x0: number, titulo: string, datos: number[], lo: number, hi: number, color: string, marca: number) => {
    const Yp = (v: number): number => 130 - ((v - lo) / (hi - lo || 1)) * 90;
    return (
      <g key={titulo}>
        <Seg a={[x0, Yp(0)]} b={[x0 + 150, Yp(0)]} color={MANIM.muted} width={1} />
        <Seg a={[x0, 40]} b={[x0, 130]} color={MANIM.ink} width={1.5} />
        <polyline points={datos.map((v, k) => `${x0 + gx((k / 50) * T)},${Yp(v)}`).join(" ")} fill="none" stroke={color} strokeWidth={2.5} />
        <Dot p={[x0 + gx(s.t), Yp(marca)]} r={4.5} color={MANIM.yellow} />
        <text x={x0 + 75} y={32} textAnchor="middle" fill={color} fontSize={12} fontWeight={700}>{titulo}</text>
      </g>
    );
  };
  const as = Array.from({ length: 51 }, () => s.a);
  const [al, ah] = rng(as.concat([0.01, -0.01]));
  return (
    <Frame
      stacked
      hint={block.hint ?? "La pendiente de x–t es v; la pendiente de v–t es a; el área bajo v–t es el desplazamiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición inicial x₀" value={s.x0} min={-50} max={50} step={1} unit=" m" color={MANIM.green} onChange={(x0) => setS((o) => ({ ...o, x0 }))} />
          <Slider label="Velocidad inicial v₀" value={s.v0} min={-20} max={30} step={1} unit=" m/s" color={MANIM.blue} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Aceleración a" value={s.a} min={-5} max={5} step={0.5} unit=" m/s²" color={MANIM.orange} format={f1} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Instante" value={s.t} min={0} max={T} step={0.5} unit=" s" color={MANIM.purple} format={f1} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="graficas-mrua" maxH={170}>
        {panel(30, "x(t)", xs, xl, xh, MANIM.green, x1d(s.x0, s.v0, s.a, s.t))}
        {panel(200, "v(t)", vs, vl, vh, MANIM.blue, v1d(s.v0, s.a, s.t))}
        {panel(370, "a(t)", as, al, ah, MANIM.orange, s.a)}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label={`Posición x a los ${f1(s.t)} s`}>{`${f1(x1d(s.x0, s.v0, s.a, s.t))} m`}</Stat>
        <Stat color={MANIM.blue} label="Velocidad v">{`${f1(v1d(s.v0, s.a, s.t))} m/s`}</Stat>
        <Stat color={MANIM.purple} label="Desplazamiento · distancia recorrida">{`${f1(x1d(s.x0, s.v0, s.a, s.t) - s.x0)} m · ${f1(distanciaRecorrida(s.x0, s.v0, s.a, s.t))} m`}</Stat>
        <Stat color={MANIM.orange} label="Se detiene (v = 0) en">{Number.isFinite(tp) ? `t = ${f2(tp)} s, en x = ${f1(x1d(s.x0, s.v0, s.a, tp))} m (luego da marcha atrás)` : "no se detiene en t > 0"}</Stat>
        <Stat color={MANIM.red} label="v final desde v² = v₀² + 2·a·Δx">{`${fin(velocidadSinTiempo(s.v0, s.a, x1d(s.x0, s.v0, s.a, s.t) - s.x0), f1)} m/s (módulo)`}</Stat>
      </Readout>
      <Note>En el <b>MRU</b> (a = 0): <b>x = x₀ + v·t</b>; la gráfica x–t es una <b>recta</b> y la v–t, una recta horizontal. En el <b>MRUA</b> (a constante): <b>v = v₀ + a·t</b>, <b>x = x₀ + v₀·t + ½·a·t²</b> y <b>v² = v₀² + 2·a·Δx</b>; x–t es una <b>parábola</b> y v–t una <b>recta de pendiente a</b>. En una gráfica: la <b>pendiente</b> de x–t es la <b>velocidad</b>, la de v–t es la <b>aceleración</b>, y el <b>área bajo v–t</b> es el <b>desplazamiento</b> (con signo). Con <b>a y v de signo contrario</b> el móvil frena, se detiene (v = 0, vértice de la parábola) y <b>da marcha atrás</b>: entonces el desplazamiento y la <b>distancia recorrida</b> no coinciden. Hay que elegir <b>origen y sentido positivo</b> y respetar los signos.</Note>
    </Frame>
  );
}

/* ───────────── 3. Tiro parabólico ───────────── */

export function ParabolicoFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { v0: Math.round(num(block.params?.a, 25, 1, 60)), ang: Math.round(num(block.params?.b, 45, -60, 90)), h0: Math.round(num(block.params?.c, 0, 0, 50)), t: 1 };
  const [s, setS] = useState(init);
  const r = tiroOblicuo(s.v0, s.ang, s.h0);
  const Tv = Number.isFinite(r.tVuelo) && r.tVuelo > 0 ? r.tVuelo : 1;
  const xmax = Math.max(10, r.alcance || 10);
  const ymax = Math.max(5, r.hMax);
  const esc = Math.min(440 / xmax, 120 / ymax);
  const X = (x: number): number => 40 + x * esc;
  const Y = (y: number): number => 145 - y * esc;
  const pts = Array.from({ length: 61 }, (_, k) => posicionParabolica(s.v0, s.ang, s.h0, (k / 60) * Tv)).map((p) => `${X(p[0])},${Y(p[1])}`).join(" ");
  const tt = Math.min(s.t, Tv);
  const p = posicionParabolica(s.v0, s.ang, s.h0, tt);
  const vy = r.vy - G * tt;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Horizontalmente es un MRU y verticalmente un MRUA con a = −g: se estudian por separado y se componen."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Rapidez inicial" value={s.v0} min={1} max={60} step={1} unit=" m/s" color={MANIM.blue} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Ángulo de lanzamiento (con la horizontal)" value={s.ang} min={-60} max={90} step={1} unit="°" color={MANIM.orange} onChange={(ang) => setS((o) => ({ ...o, ang }))} />
          <Slider label="Altura inicial" value={s.h0} min={0} max={50} step={1} unit=" m" color={MANIM.green} onChange={(h0) => setS((o) => ({ ...o, h0 }))} />
          <Slider label="Instante" value={tt} min={0} max={Math.round(Tv * 10) / 10} step={0.1} unit=" s" color={MANIM.purple} format={f1} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={165} testId="parabolico" maxH={185}>
        <Seg a={[40, 145]} b={[500, 145]} color={MANIM.ink} width={2} />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Seg a={[X(p[0]), 145]} b={[X(p[0]), Y(p[1])]} color={MANIM.muted} width={1} dashed />
        <Flecha a={[X(p[0]), Y(p[1])]} b={[X(p[0]) + r.vx * 2, Y(p[1])]} color={MANIM.green} width={2} />
        <Flecha a={[X(p[0]), Y(p[1])]} b={[X(p[0]), Y(p[1]) - vy * 2]} color={MANIM.red} width={2} />
        <Dot p={[X(p[0]), Y(p[1])]} r={6} color={MANIM.orange} />
        <text x={500} y={160} textAnchor="end" fill={MANIM.muted} fontSize={11}>verde: vₓ (constante) · rojo: v_y</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Componentes iniciales vₓ · v_y">{`${f1(r.vx)} · ${f1(r.vy)} m/s`}</Stat>
        <Stat color={MANIM.green} label="Tiempo de vuelo · alcance">{`${fin(r.tVuelo, f2)} s · ${fin(r.alcance, f1)} m`}</Stat>
        <Stat color={MANIM.orange} label="Altura máxima">{`${f1(r.hMax)} m${r.tSubida > 0 ? ` (a los ${f2(r.tSubida)} s)` : ""}`}</Stat>
        <Stat color={MANIM.red} label="Velocidad al llegar al suelo">{`${fin(r.vImpacto, f1)} m/s · ${fin(r.anguloImpacto, f1)}°`}</Stat>
        <Stat color={MANIM.purple} label={`En t = ${f1(tt)} s`}>{`x = ${f1(p[0])} m · y = ${f1(p[1])} m · v_y = ${f1(vy)} m/s`}</Stat>
      </Readout>
      <Note>El <b>principio de superposición</b> (Galileo) dice que un movimiento compuesto se puede estudiar como suma de movimientos <b>independientes</b>. En el <b>tiro oblicuo</b> (sin rozamiento): en horizontal, <b>MRU</b> con <b>vₓ = v₀·cos θ</b> (x = vₓ·t); en vertical, <b>MRUA</b> con a = −g: <b>v_y = v₀·sen θ − g·t</b>, <b>y = h₀ + v₀·sen θ·t − ½·g·t²</b>. La trayectoria es una <b>parábola</b>. Con h₀ = 0: tiempo de vuelo <b>2·v₀·sen θ/g</b>, altura máxima <b>v₀²·sen²θ/(2g)</b> y alcance <b>v₀²·sen 2θ/g</b>, <b>máximo a 45°</b> (y el mismo para θ y 90° − θ). En el <b>tiro horizontal</b> (θ = 0): el tiempo de caída solo depende de la altura. Se desprecia el aire; g = 9,8 m/s².</Note>
    </Frame>
  );
}

/* ───────────── 4. Movimiento circular ───────────── */

export function CircularFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { R: num(block.params?.a, 2, 0.5, 10), rpm: Math.round(num(block.params?.b, 60, 0, 300)), alfa: num(block.params?.c, 0, -5, 5), t: 2 };
  const [s, setS] = useState(init);
  const w0 = rpmARads(s.rpm);
  const c = circular(s.R, w0, s.alfa, s.t);
  const rpx = 25 + s.R * 7;
  const cx = 130;
  const cy = 100;
  const px = cx + rpx * Math.cos(c.phi);
  const py = cy - rpx * Math.sin(c.phi);
  const dirT: Pt = [-Math.sin(c.phi), -Math.cos(c.phi)];
  const k = 4;
  return (
    <Frame
      stacked
      hint={block.hint ?? "v = ω·R; aₜ = α·R cambia el módulo; aₙ = ω²·R cambia la dirección."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Radio" value={s.R} min={0.5} max={10} step={0.5} unit=" m" color={MANIM.blue} format={f1} onChange={(R) => setS((o) => ({ ...o, R }))} />
          <Slider label="Velocidad angular inicial" value={s.rpm} min={0} max={300} step={5} unit=" rpm" color={MANIM.orange} onChange={(rpm) => setS((o) => ({ ...o, rpm }))} />
          <Slider label="Aceleración angular α" value={s.alfa} min={-5} max={5} step={0.5} unit=" rad/s²" color={MANIM.red} format={f1} onChange={(alfa) => setS((o) => ({ ...o, alfa }))} />
          <Slider label="Instante" value={s.t} min={0} max={10} step={0.25} unit=" s" color={MANIM.purple} format={f2} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="circular-bach" maxH={220}>
        <circle cx={cx} cy={cy} r={rpx} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
        <Dot p={[cx, cy]} r={3} color={MANIM.ink} />
        <Seg a={[cx, cy]} b={[px, py]} color={MANIM.muted} width={1.5} />
        <Flecha a={[px, py]} b={[px + dirT[0] * Math.min(70, 8 + Math.abs(c.at) * k * 3 + 20), py + dirT[1] * Math.min(70, 8 + Math.abs(c.at) * k * 3 + 20)]} color={MANIM.green} width={3} />
        <Flecha a={[px, py]} b={[px + ((cx - px) / rpx) * Math.min(60, 8 + c.an * 0.4), py + ((cy - py) / rpx) * Math.min(60, 8 + c.an * 0.4)]} color={MANIM.red} width={3} />
        <Dot p={[px, py]} r={7} color={MANIM.orange} />
        <text x={300} y={80} fill={MANIM.green} fontSize={13}>▬ velocidad (tangente)</text>
        <text x={300} y={104} fill={MANIM.red} fontSize={13}>▬ aceleración normal (al centro)</text>
        {Math.abs(s.alfa) > 0 && <text x={300} y={128} fill={MANIM.orange} fontSize={13}>además hay aceleración tangencial</text>}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Velocidad angular ω(t)">{`${f2(c.w)} rad/s (${f1(radsARpm(c.w))} rpm)`}</Stat>
        <Stat color={MANIM.green} label="Rapidez v = ω·R">{`${f2(c.v)} m/s`}</Stat>
        <Stat color={MANIM.blue} label="Ángulo recorrido · vueltas">{`${f2(c.phi)} rad · ${f2(c.vueltas)} vueltas`}</Stat>
        <Stat color={MANIM.red} label="aₜ = α·R · aₙ = ω²·R · a total">{`${f2(c.at)} · ${f2(c.an)} · ${f2(c.a)} m/s²`}</Stat>
        <Stat color={MANIM.purple} label="Periodo · frecuencia (si ω fuese constante)">{c.T === Infinity ? "—" : `${f2(c.T)} s · ${f2(c.f)} Hz`}</Stat>
      </Readout>
      <Note>En un <b>movimiento circular</b> se usan magnitudes <b>angulares</b>: <b>posición angular φ</b> (rad), <b>velocidad angular ω = dφ/dt</b> (rad/s) y <b>aceleración angular α = dω/dt</b> (rad/s²). Se relacionan con las lineales por el radio: <b>s = φ·R</b>, <b>v = ω·R</b>, <b>aₜ = α·R</b>. La aceleración normal o centrípeta es <b>aₙ = v²/R = ω²·R</b>. <b>MCU</b> (α = 0): <b>φ = φ₀ + ω·t</b>, <b>T = 2π/ω</b>, <b>f = 1/T</b> y aₜ = 0. <b>MCUA</b> (α constante): <b>ω = ω₀ + α·t</b> y <b>φ = φ₀ + ω₀·t + ½·α·t²</b>, con las mismas fórmulas que el MRUA sustituyendo x, v, a por φ, ω, α. 1 vuelta = 2π rad = 360°; 1 rpm = 2π/60 rad/s. La aceleración total es a = √(aₜ² + aₙ²).</Note>
    </Frame>
  );
}

/* ───────────── 5. Composición: barca en un río ───────────── */

export function BarcaRioFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { vb: Math.round(num(block.params?.a, 4, 1, 10)), vr: Math.round(num(block.params?.b, 2, 0, 6)), proa: Math.round(num(block.params?.c, 90, 10, 170)), ancho: 100 };
  const [s, setS] = useState(init);
  const r = barcaRio(s.vb, s.vr, s.proa, s.ancho);
  const rect = proaRectaGrados(s.vb, s.vr);
  const esc = 0.8;
  const x0 = 100;
  const yTop = 20;
  const yBot = 130;
  const deriv = Number.isFinite(r.deriva) ? r.deriva : 0;
  const xf = Math.max(30, Math.min(480, x0 + deriv * esc));
  return (
    <Frame
      stacked
      hint={block.hint ?? "El movimiento de la barca respecto a la orilla es la suma vectorial de su velocidad respecto al agua y la de la corriente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Rapidez de la barca respecto al agua" value={s.vb} min={1} max={10} step={1} unit=" m/s" color={MANIM.blue} onChange={(vb) => setS((o) => ({ ...o, vb }))} />
          <Slider label="Rapidez de la corriente" value={s.vr} min={0} max={6} step={1} unit=" m/s" color={MANIM.orange} onChange={(vr) => setS((o) => ({ ...o, vr }))} />
          <Slider label="Dirección de la proa (90° = perpendicular a la orilla; > 90° = contra corriente)" value={s.proa} min={10} max={170} step={1} unit="°" color={MANIM.green} onChange={(proa) => setS((o) => ({ ...o, proa }))} />
          <Slider label="Anchura del río" value={s.ancho} min={20} max={300} step={10} unit=" m" color={MANIM.purple} onChange={(ancho) => setS((o) => ({ ...o, ancho }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="barca-rio" maxH={170}>
        <rect x={20} y={yTop} width={480} height={yBot - yTop} fill={MANIM.blue} fillOpacity={0.18} />
        <Seg a={[20, yTop]} b={[500, yTop]} color={MANIM.ink} width={2} />
        <Seg a={[20, yBot]} b={[500, yBot]} color={MANIM.ink} width={2} />
        {[40, 70, 100].map((y) => <Flecha key={y} a={[40, y + 5]} b={[40 + s.vr * 12, y + 5]} color={MANIM.orange} width={2} />)}
        <Seg a={[x0, yBot]} b={[xf, yTop]} color={MANIM.yellow} width={2} dashed />
        <Flecha a={[x0, yBot]} b={[x0 + s.vb * 9 * Math.cos((s.proa * Math.PI) / 180), yBot - s.vb * 9 * Math.sin((s.proa * Math.PI) / 180)]} color={MANIM.green} width={3} />
        <Dot p={[x0, yBot]} r={6} color={MANIM.green} />
        <Dot p={[xf, yTop]} r={6} color={MANIM.red} />
        <text x={500} y={146} textAnchor="end" fill={MANIM.muted} fontSize={11}>verde: proa (v barca) · naranja: corriente · amarillo: trayectoria real</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Velocidad resultante (a lo largo, perpendicular · módulo)">{`(${f2(r.vx)}, ${f2(r.vy)}) m/s · ${f2(r.v)} m/s`}</Stat>
        <Stat color={MANIM.green} label="Tiempo de travesía = anchura / v_perpendicular">{`${fin(r.t, f1)} s`}</Stat>
        <Stat color={MANIM.red} label="Deriva (desplazamiento aguas abajo)">{`${fin(r.deriva, f1)} m`}</Stat>
        <Stat color={MANIM.purple} label="Para llegar justo enfrente: proa a">{Number.isFinite(rect) ? `${f1(rect)}° (contra corriente), tardando ${f1(s.ancho / (s.vb * Math.sin((rect * Math.PI) / 180)))} s` : "imposible: la corriente es mayor que la velocidad de la barca"}</Stat>
      </Readout>
      <Note>Es un ejemplo de <b>composición de movimientos</b> con el <b>principio de independencia</b>: los movimientos perpendiculares se estudian por separado. La <b>velocidad de la barca respecto a la orilla</b> es la <b>suma vectorial</b> v = v_barca + v_corriente. <b>Tiempo de travesía</b>: depende solo de la componente de la velocidad <b>perpendicular</b> a la orilla (t = anchura/v_⊥); es <b>mínimo</b> con la proa perpendicular, aunque entonces la corriente arrastra la barca (<b>deriva</b> = v_corriente · t). Para llegar <b>justo enfrente</b> hay que apuntar <b>contra corriente</b>, de modo que la componente de la barca a lo largo de la orilla anule la de la corriente: <b>cos θ = −v_c/v_b</b> (solo posible si v_b &gt; v_c). La misma idea sirve para <b>aviones con viento</b> y para las <b>velocidades relativas</b> en general.</Note>
    </Frame>
  );
}
