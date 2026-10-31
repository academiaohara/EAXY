"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, arrowHead, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");
const cero = (v: number): number => (Math.abs(v) < 5e-3 ? 0 : v);
const rad = (g: number): number => (g * Math.PI) / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;

/** Suma de fuerzas dadas como [módulo (N), ángulo (°)] respecto al eje X. */
export function resultante(fs: [number, number][]) {
  const x = fs.reduce((s, [F, a]) => s + F * Math.cos(rad(a)), 0);
  const y = fs.reduce((s, [F, a]) => s + F * Math.sin(rad(a)), 0);
  const R = Math.hypot(x, y);
  return { x, y, R, ang: R < 1e-9 ? NaN : (Math.atan2(y, x) * 180) / Math.PI };
}

export const descomponer = (F: number, ang: number): [number, number] => [F * Math.cos(rad(ang)), F * Math.sin(rad(ang))];

/** Bloque en un plano inclinado (μ estático = cinético). Sentido positivo: hacia abajo del plano. */
export function planoInclinado(m: number, th: number, mu: number, g = G) {
  const P = m * g;
  const N = P * Math.cos(rad(th));
  const Px = P * Math.sin(rad(th));
  const frMax = mu * N;
  const desliza = Px > frMax + 1e-9;
  const Fr = desliza ? frMax : Px;
  const a = desliza ? (Px - frMax) / m : 0;
  return { P, N, Px, frMax, Fr, a, desliza, angLimite: (Math.atan(mu) * 180) / Math.PI };
}

/** Máquina de Atwood: a (hacia el cuerpo más pesado) y tensión. */
export function atwood(m1: number, m2: number, g = G) {
  const s = m1 + m2;
  return { a: s > 0 ? (Math.abs(m2 - m1) * g) / s : NaN, T: s > 0 ? (2 * m1 * m2 * g) / s : NaN };
}

/** Cuerpo m1 sobre la mesa (rozamiento μ) unido por una cuerda a m2 colgando. */
export function mesaPolea(m1: number, m2: number, mu: number, g = G) {
  const s = m1 + m2;
  if (s <= 0) return { a: NaN, T: NaN, desliza: false };
  const desliza = m2 * g > mu * m1 * g + 1e-9;
  const a = desliza ? ((m2 - mu * m1) * g) / s : 0;
  const T = desliza ? m1 * (a + mu * g) : m2 * g;
  return { a, T, desliza };
}

export const hooke = (k: number, x: number): number => k * x;

export function muelleEquivalente(k1: number, k2: number, modo: "serie" | "paralelo"): number {
  if (modo === "paralelo") return k1 + k2;
  return k1 + k2 > 0 ? (k1 * k2) / (k1 + k2) : NaN;
}

/** Masa colgada de un muelle vertical en equilibrio. */
export function muelleColgado(k: number, m: number, g = G) {
  const x = k > 0 ? (m * g) / k : NaN;
  return { x, F: m * g, Ep: 0.5 * k * x * x, T: k > 0 && m > 0 ? 2 * Math.PI * Math.sqrt(m / k) : NaN };
}

/** Choque unidimensional con coeficiente de restitución e (1 = elástico, 0 = totalmente inelástico). */
export function choque(m1: number, v1: number, m2: number, v2: number, e: number) {
  const s = m1 + m2;
  const p = m1 * v1 + m2 * v2;
  const v1f = s > 0 ? (p + m2 * e * (v2 - v1)) / s : NaN;
  const v2f = s > 0 ? (p + m1 * e * (v1 - v2)) / s : NaN;
  const Ec0 = 0.5 * m1 * v1 * v1 + 0.5 * m2 * v2 * v2;
  const Ecf = 0.5 * m1 * v1f * v1f + 0.5 * m2 * v2f * v2f;
  return { p, v1f, v2f, Ec0, Ecf, perdida: Ec0 - Ecf };
}

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

/* ───────────── 1. Composición de fuerzas ───────────── */

export function FuerzasResultanteFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { f1: Math.round(num(block.params?.a, 30, 0, 50)), a1: 0, f2: Math.round(num(block.params?.b, 40, 0, 50)), a2: 90, f3: Math.round(num(block.params?.c, 0, 0, 50)), a3: 225 };
  const [s, setS] = useState(init);
  const R = resultante([[s.f1, s.a1], [s.f2, s.a2], [s.f3, s.a3]]);
  const O: Pt = [200, 95];
  const k = 1.6;
  const p = (F: number, a: number): Pt => [O[0] + F * k * Math.cos(rad(a)), O[1] - F * k * Math.sin(rad(a))];
  const equilibrio = R.R < 0.05;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La fuerza resultante es la suma vectorial de todas las fuerzas; si es nula, el cuerpo está en equilibrio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza F₁" value={s.f1} min={0} max={50} step={1} unit=" N" color={MANIM.blue} onChange={(f1) => setS((o) => ({ ...o, f1 }))} />
          <Slider label="Ángulo de F₁" value={s.a1} min={0} max={360} step={5} unit="°" color={MANIM.blue} onChange={(a1) => setS((o) => ({ ...o, a1 }))} />
          <Slider label="Fuerza F₂" value={s.f2} min={0} max={50} step={1} unit=" N" color={MANIM.green} onChange={(f2) => setS((o) => ({ ...o, f2 }))} />
          <Slider label="Ángulo de F₂" value={s.a2} min={0} max={360} step={5} unit="°" color={MANIM.green} onChange={(a2) => setS((o) => ({ ...o, a2 }))} />
          <Slider label="Fuerza F₃" value={s.f3} min={0} max={50} step={1} unit=" N" color={MANIM.orange} onChange={(f3) => setS((o) => ({ ...o, f3 }))} />
          <Slider label="Ángulo de F₃" value={s.a3} min={0} max={360} step={5} unit="°" color={MANIM.orange} onChange={(a3) => setS((o) => ({ ...o, a3 }))} />
        </>
      }
    >
      <Svg w={400} h={190} testId="fuerzas-resultante" maxH={210}>
        <Seg a={[20, O[1]]} b={[380, O[1]]} color={MANIM.muted} width={1} dashed />
        <Seg a={[O[0], 10]} b={[O[0], 180]} color={MANIM.muted} width={1} dashed />
        <Flecha a={O} b={p(s.f1, s.a1)} color={MANIM.blue} />
        <Flecha a={O} b={p(s.f2, s.a2)} color={MANIM.green} />
        <Flecha a={O} b={p(s.f3, s.a3)} color={MANIM.orange} />
        {!equilibrio && <Flecha a={O} b={[Math.max(10, Math.min(390, O[0] + R.x * k)), Math.max(10, Math.min(180, O[1] - R.y * k))]} color={MANIM.yellow} width={4} />}
        <Dot p={O} r={6} color={MANIM.ink} />
        <text x={390} y={186} textAnchor="end" fill={MANIM.muted} fontSize={11}>amarillo: resultante</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Resultante ΣF (componentes)">{`(${f1(cero(R.x))}, ${f1(cero(R.y))}) N`}</Stat>
        <Stat color={MANIM.yellow} label="Módulo · ángulo">{`${f1(R.R)} N · ${Number.isFinite(R.ang) ? `${f1(R.ang < 0 ? R.ang + 360 : R.ang)}°` : "—"}`}</Stat>
        <Stat color={equilibrio ? MANIM.green : MANIM.red} label="Estado del cuerpo (1.ª ley)">{equilibrio ? "ΣF = 0: reposo o MRU (equilibrio)" : "ΣF ≠ 0: cambia su velocidad (2.ª ley)"}</Stat>
      </Readout>
      <Note>La <b>fuerza</b> es una magnitud <b>vectorial</b>: se mide en <b>newton</b> (1 N = 1 kg·m/s²). Varias fuerzas sobre un cuerpo equivalen a su <b>resultante</b>, la <b>suma vectorial</b>: se descompone cada una en x e y (Fₓ = F·cos α; F_y = F·sen α), se suman las componentes y se calcula el módulo √(Rₓ² + R_y²). Si <b>ΣF = 0</b> se cumple la <b>1.ª ley de Newton</b> (inercia): el cuerpo sigue en reposo o con MRU. Con tres fuerzas, el equilibrio exige que formen un <b>triángulo cerrado</b>. Prueba F₁ = F₂ = F₃ = 20 N con ángulos de 0°, 120° y 240°: se anulan (triángulo equilátero).</Note>
    </Frame>
  );
}

/* ───────────── 2. Plano inclinado ───────────── */

export function PlanoInclinadoFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 5, 1, 20)), th: Math.round(num(block.params?.b, 30, 0, 80)), mu: num(block.params?.c, 0.2, 0, 1) };
  const [s, setS] = useState(init);
  const r = planoInclinado(s.m, s.th, s.mu);
  const th = rad(s.th);
  const A: Pt = [30, 150];
  const L = Math.min(300, 125 / Math.max(Math.sin(th), 0.01));
  const B: Pt = [A[0] + L * Math.cos(th), 150];
  const C: Pt = [B[0], 150 - L * Math.sin(th)];
  const u: Pt = [Math.cos(th), -Math.sin(th)];
  const nrm: Pt = [-Math.sin(th), -Math.cos(th)];
  const sPos = 0.5 * L;
  const P0: Pt = [A[0] + u[0] * sPos + nrm[0] * 9, A[1] + u[1] * sPos + nrm[1] * 9];
  const k = 0.3;
  const ar = (v: Pt, F: number): Pt => [P0[0] + v[0] * F * k, P0[1] + v[1] * F * k];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El peso se descompone en una componente paralela al plano (que tira hacia abajo) y otra perpendicular (que equilibra la normal)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={1} max={20} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Inclinación θ" value={s.th} min={0} max={80} step={1} unit="°" color={MANIM.green} onChange={(th2) => setS((o) => ({ ...o, th: th2 }))} />
          <Slider label="Coeficiente de rozamiento μ" value={s.mu} min={0} max={1} step={0.05} color={MANIM.orange} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
        </>
      }
    >
      <Svg w={420} h={170} testId="plano-inclinado" maxH={200}>
        <polygon points={`${A.join(",")} ${B.join(",")} ${C.join(",")}`} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.ink} strokeWidth={2} />
        <Dot p={P0} r={8} color={MANIM.blue} />
        <Flecha a={P0} b={[P0[0], P0[1] + r.P * k]} color={MANIM.red} />
        <Flecha a={P0} b={ar(nrm, r.N)} color={MANIM.green} />
        <Flecha a={P0} b={ar([-u[0], -u[1]], r.Px)} color={MANIM.yellow} width={2} />
        {r.Fr > 0.5 && <Flecha a={P0} b={ar(u, r.Fr)} color={MANIM.orange} />}
        <text x={410} y={164} textAnchor="end" fill={MANIM.muted} fontSize={11}>rojo: P · verde: N · amarillo: Pₓ · naranja: rozamiento</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Peso P = m·g">{`${f1(r.P)} N`}</Stat>
        <Stat color={MANIM.yellow} label="Pₓ = P·sen θ (paralela) · P_y = P·cos θ (perpendicular)">{`${f1(r.Px)} N · ${f1(r.N)} N`}</Stat>
        <Stat color={MANIM.green} label="Normal N = P·cos θ">{`${f1(r.N)} N`}</Stat>
        <Stat color={MANIM.orange} label="Rozamiento (máximo μ·N)">{`${f1(r.Fr)} N (máx. ${f1(r.frMax)} N)`}</Stat>
        <Stat color={r.desliza ? MANIM.red : MANIM.green} label="Movimiento">{r.desliza ? `Desliza hacia abajo con a = ${f2(r.a)} m/s²` : `Permanece en reposo (se desliza si θ > ${f1(r.angLimite)}°)`}</Stat>
      </Readout>
      <Note>El <b>peso</b> P = m·g (vertical) se descompone en los ejes del plano: <b>Pₓ = m·g·sen θ</b> (paralela, tira hacia abajo) y <b>P_y = m·g·cos θ</b> (perpendicular, la compensa la <b>normal N</b>). El <b>rozamiento</b> se opone al movimiento (o a la tendencia): <b>F_r ≤ μ·N</b>. Si Pₓ ≤ μ·N el cuerpo no se mueve y la fuerza de rozamiento iguala a Pₓ; si no, <b>desliza</b> con a = g·(sen θ − μ·cos θ). Observa que <b>la aceleración no depende de la masa</b>; y que el cuerpo empieza a deslizar cuando <b>tg θ &gt; μ</b>: así se mide μ con un plano de inclinación variable. Aquí se toma el mismo μ estático y cinético (simplificación).</Note>
    </Frame>
  );
}

/* ───────────── 3. Poleas y cuerpos enlazados ───────────── */

export function PoleasFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: 0, m1: Math.round(num(block.params?.a, 3, 1, 10)), m2: Math.round(num(block.params?.b, 5, 1, 10)), mu: num(block.params?.c, 0.2, 0, 1) };
  const [s, setS] = useState(init);
  const atw = s.modo === 0;
  const A = atwood(s.m1, s.m2);
  const M = mesaPolea(s.m1, s.m2, s.mu);
  const a = atw ? A.a : M.a;
  const T = atw ? A.T : M.T;
  const sentido = atw ? (s.m2 > s.m1 ? "m₂ baja" : s.m1 > s.m2 ? "m₁ baja" : "equilibrio") : M.desliza ? "m₂ baja y m₁ avanza hacia la polea" : "reposo (el rozamiento aguanta)";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Se aplica la 2.ª ley a cada cuerpo; la cuerda une las aceleraciones y su tensión es la misma en ambos extremos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Montaje" items={[{ value: "0", label: "Máquina de Atwood" }, { value: "1", label: "Mesa + cuerpo colgante" }]} value={String(s.modo)} onChange={(v) => setS((o) => ({ ...o, modo: Number(v) }))} />
          <Slider label="Masa m₁" value={s.m1} min={1} max={10} step={1} unit=" kg" color={MANIM.blue} onChange={(m1) => setS((o) => ({ ...o, m1 }))} />
          <Slider label="Masa m₂" value={s.m2} min={1} max={10} step={1} unit=" kg" color={MANIM.green} onChange={(m2) => setS((o) => ({ ...o, m2 }))} />
          {!atw && <Slider label="Rozamiento μ de m₁ con la mesa" value={s.mu} min={0} max={1} step={0.05} color={MANIM.orange} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />}
        </>
      }
    >
      <Svg w={420} h={170} testId="poleas" maxH={200}>
        {atw ? (
          <g>
            <circle cx={210} cy={30} r={16} fill="none" stroke={MANIM.ink} strokeWidth={3} />
            <Seg a={[194, 30]} b={[194, 100 + (s.m1 > s.m2 ? 20 : s.m1 < s.m2 ? -20 : 0)]} color={MANIM.ink} width={2} />
            <Seg a={[226, 30]} b={[226, 100 + (s.m2 > s.m1 ? 20 : s.m2 < s.m1 ? -20 : 0)]} color={MANIM.ink} width={2} />
            <rect x={194 - 8 - s.m1 * 2.5} y={100 + (s.m1 > s.m2 ? 20 : s.m1 < s.m2 ? -20 : 0)} width={16 + s.m1 * 5} height={14 + s.m1 * 3} fill={MANIM.blue} fillOpacity={0.7} />
            <rect x={226 - 8 - s.m2 * 2.5} y={100 + (s.m2 > s.m1 ? 20 : s.m2 < s.m1 ? -20 : 0)} width={16 + s.m2 * 5} height={14 + s.m2 * 3} fill={MANIM.green} fillOpacity={0.7} />
          </g>
        ) : (
          <g>
            <Seg a={[40, 70]} b={[300, 70]} color={MANIM.ink} width={3} />
            <circle cx={310} cy={62} r={9} fill="none" stroke={MANIM.ink} strokeWidth={3} />
            <Seg a={[40 + 90 + s.m1 * 3, 62]} b={[310, 53]} color={MANIM.ink} width={2} />
            <rect x={130} y={70 - 14 - s.m1 * 2} width={s.m1 * 3 + 20} height={14 + s.m1 * 2} fill={MANIM.blue} fillOpacity={0.7} />
            <Seg a={[319, 62]} b={[319, 100]} color={MANIM.ink} width={2} />
            <rect x={319 - 8 - s.m2 * 2} y={100} width={16 + s.m2 * 4} height={14 + s.m2 * 3} fill={MANIM.green} fillOpacity={0.7} />
          </g>
        )}
        <text x={410} y={164} textAnchor="end" fill={MANIM.muted} fontSize={11}>azul: m₁ · verde: m₂</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Aceleración del sistema">{`${fin(a, f2)} m/s²`}</Stat>
        <Stat color={MANIM.purple} label="Tensión de la cuerda">{`${fin(T, f1)} N`}</Stat>
        <Stat color={MANIM.yellow} label="Movimiento">{sentido}</Stat>
      </Readout>
      <Note>Con <b>cuerda ideal</b> (inextensible y sin masa) y <b>polea ideal</b> (sin masa ni rozamiento), la tensión es la misma en toda la cuerda y los dos cuerpos tienen el <b>mismo módulo de aceleración</b>. Se escribe la 2.ª ley para cada cuerpo y se resuelve el sistema. <b>Atwood</b>: a = (m₂ − m₁)·g/(m₁ + m₂) y T = 2·m₁·m₂·g/(m₁ + m₂). <b>Mesa + colgante</b>: m₂·g − T = m₂·a y T − μ·m₁·g = m₁·a → a = (m₂ − μ·m₁)·g/(m₁ + m₂). Observa que <b>T ≠ m₂·g</b> mientras haya aceleración (T es menor que el peso del que baja y mayor que el del que sube). Si m₂·g ≤ μ·m₁·g el sistema no se mueve.</Note>
    </Frame>
  );
}

/* ───────────── 4. Muelles y ley de Hooke ───────────── */

export function MuelleFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: 0, k: Math.round(num(block.params?.a, 200, 20, 1000)), k2: Math.round(num(block.params?.b, 200, 20, 1000)), m: num(block.params?.c, 1, 0.1, 10) };
  const [s, setS] = useState(init);
  const keq = s.modo === 0 ? s.k : muelleEquivalente(s.k, s.k2, s.modo === 1 ? "serie" : "paralelo");
  const r = muelleColgado(keq, s.m);
  const x = Number.isFinite(r.x) ? r.x : 0;
  const largo = Math.min(120, 40 + x * 150);
  const zig = Array.from({ length: 13 }, (_, i) => `${210 + (i % 2 === 0 ? -12 : 12) * (i === 0 || i === 12 ? 0 : 1)},${20 + (largo * i) / 12}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "El muelle ejerce una fuerza proporcional a su deformación: F = k·x. En equilibrio, la fuerza elástica iguala al peso."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Montaje" items={[{ value: "0", label: "Un muelle" }, { value: "1", label: "Dos en serie" }, { value: "2", label: "Dos en paralelo" }]} value={String(s.modo)} onChange={(v) => setS((o) => ({ ...o, modo: Number(v) }))} />
          <Slider label="Constante k₁" value={s.k} min={20} max={1000} step={10} unit=" N/m" color={MANIM.blue} onChange={(k) => setS((o) => ({ ...o, k }))} />
          {s.modo !== 0 && <Slider label="Constante k₂" value={s.k2} min={20} max={1000} step={10} unit=" N/m" color={MANIM.green} onChange={(k2) => setS((o) => ({ ...o, k2 }))} />}
          <Slider label="Masa colgada" value={s.m} min={0.1} max={10} step={0.1} unit=" kg" color={MANIM.orange} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={420} h={200} testId="muelle" maxH={230}>
        <Seg a={[170, 20]} b={[250, 20]} color={MANIM.ink} width={4} />
        <polyline points={zig} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <rect x={190} y={20 + largo} width={40} height={20 + s.m * 3} fill={MANIM.orange} fillOpacity={0.75} />
        <Seg a={[300, 20]} b={[300, 20 + largo]} color={MANIM.yellow} width={2} dashed />
        <text x={308} y={20 + largo / 2} fill={MANIM.yellow} fontSize={12}>x</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Constante equivalente k">{`${fin(keq, f1)} N/m`}</Stat>
        <Stat color={MANIM.orange} label="Peso = fuerza elástica">{`${f1(r.F)} N`}</Stat>
        <Stat color={MANIM.yellow} label="Alargamiento x = m·g/k">{Number.isFinite(r.x) ? `${f1(r.x * 100)} cm` : "—"}</Stat>
        <Stat color={MANIM.green} label="Energía potencial elástica ½·k·x²">{`${fin(r.Ep, f2)} J`}</Stat>
        <Stat color={MANIM.purple} label="Periodo de oscilación T = 2π·√(m/k)">{`${fin(r.T, f2)} s`}</Stat>
      </Readout>
      <Note>La <b>ley de Hooke</b> dice que la fuerza elástica es proporcional a la deformación y de sentido contrario: <b>F = −k·x</b>, con k la <b>constante elástica</b> (N/m), válida dentro del <b>límite elástico</b>. En equilibrio con un cuerpo colgado: <b>k·x = m·g</b>. Dos muelles <b>en paralelo</b> comparten la carga y se suman: <b>k = k₁ + k₂</b> (más rígido); <b>en serie</b> se reparte la deformación: <b>1/k = 1/k₁ + 1/k₂</b> (más blando). Un muelle almacena <b>energía elástica ½·k·x²</b>. Si se suelta desde otra posición oscila con periodo <b>T = 2π·√(m/k)</b> (se verá con el movimiento armónico simple en 2.º de Bachillerato).</Note>
    </Frame>
  );
}

/* ───────────── 5. Choques y momento lineal ───────────── */

export function ChoqueFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m1: Math.round(num(block.params?.a, 2, 1, 10)), v1: Math.round(num(block.params?.b, 6, -10, 10)), m2: Math.round(num(block.params?.c, 4, 1, 10)), v2: 0, e: 1 };
  const [s, setS] = useState(init);
  const r = choque(s.m1, s.v1, s.m2, s.v2, s.e);
  const bloque = (x: number, y: number, m: number, v: number, color: string, key: string) => (
    <g key={key}>
      <rect x={x - 10 - m * 2} y={y - 12 - m * 2} width={20 + m * 4} height={12 + m * 2} fill={color} fillOpacity={0.75} />
      <Flecha a={[x, y - 20 - m * 2]} b={[x + v * 7, y - 20 - m * 2]} color={color} width={3} />
    </g>
  );
  const tipo = s.e >= 0.999 ? "elástico (se conserva la energía cinética)" : s.e <= 0.001 ? "totalmente inelástico (quedan unidos)" : "parcialmente inelástico";
  return (
    <Frame
      stacked
      hint={block.hint ?? "En un choque se conserva siempre el momento lineal total; la energía cinética solo si es elástico."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa m₁" value={s.m1} min={1} max={10} step={1} unit=" kg" color={MANIM.blue} onChange={(m1) => setS((o) => ({ ...o, m1 }))} />
          <Slider label="Velocidad inicial v₁" value={s.v1} min={-10} max={10} step={1} unit=" m/s" color={MANIM.blue} onChange={(v1) => setS((o) => ({ ...o, v1 }))} />
          <Slider label="Masa m₂" value={s.m2} min={1} max={10} step={1} unit=" kg" color={MANIM.green} onChange={(m2) => setS((o) => ({ ...o, m2 }))} />
          <Slider label="Velocidad inicial v₂" value={s.v2} min={-10} max={10} step={1} unit=" m/s" color={MANIM.green} onChange={(v2) => setS((o) => ({ ...o, v2 }))} />
          <Slider label="Coeficiente de restitución e (1 = elástico, 0 = inelástico)" value={s.e} min={0} max={1} step={0.05} color={MANIM.orange} format={f2} onChange={(e) => setS((o) => ({ ...o, e }))} />
        </>
      }
    >
      <Svg w={420} h={200} testId="choque" maxH={230}>
        <text x={10} y={16} fill={MANIM.muted} fontSize={12}>antes</text>
        {bloque(130, 90, s.m1, s.v1, MANIM.blue, "a1")}
        {bloque(290, 90, s.m2, s.v2, MANIM.green, "a2")}
        <Seg a={[10, 96]} b={[410, 96]} color={MANIM.muted} width={1} />
        <text x={10} y={116} fill={MANIM.muted} fontSize={12}>después</text>
        {bloque(130, 190, s.m1, Number.isFinite(r.v1f) ? r.v1f : 0, MANIM.blue, "d1")}
        {bloque(290, 190, s.m2, Number.isFinite(r.v2f) ? r.v2f : 0, MANIM.green, "d2")}
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Momento lineal total p (se conserva)">{`${f1(r.p)} kg·m/s`}</Stat>
        <Stat color={MANIM.blue} label="Velocidades finales (v₁′ · v₂′)">{`${fin(cero(r.v1f), f2)} · ${fin(cero(r.v2f), f2)} m/s`}</Stat>
        <Stat color={MANIM.orange} label="Energía cinética antes → después">{`${f1(r.Ec0)} J → ${fin(r.Ecf, f1)} J`}</Stat>
        <Stat color={MANIM.red} label="Energía disipada">{`${fin(r.perdida, f1)} J`}</Stat>
        <Stat color={MANIM.yellow} label="Tipo de choque">{tipo}</Stat>
      </Readout>
      <Note>El <b>momento lineal</b> es <b>p = m·v</b> (kg·m/s, vectorial) y la <b>2.ª ley</b> se escribe mejor así: <b>ΣF = dp/dt</b>. El <b>impulso</b> I = F·Δt = Δp. Si no hay fuerzas externas (o son despreciables durante el choque) <b>p se conserva</b>: m₁·v₁ + m₂·v₂ = m₁·v₁′ + m₂·v₂′. Esto equivale a la <b>3.ª ley</b> (acción y reacción). En un <b>choque elástico</b> (e = 1) también se conserva la energía cinética; en un <b>inelástico</b> parte se disipa (deformación, calor, sonido), y si quedan <b>unidos</b> (e = 0) la pérdida es máxima: v′ = p/(m₁ + m₂). Observa que, con masas iguales y el segundo en reposo, el choque elástico <b>intercambia las velocidades</b>.</Note>
    </Frame>
  );
}
