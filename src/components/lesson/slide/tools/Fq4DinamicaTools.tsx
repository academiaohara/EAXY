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

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;

/** Segunda ley de Newton: aceleración (m/s²) con la resultante ΣF (N) y la masa (kg). */
export const aceleracionNeta = (fuerzas: number[], m: number): number => (m > 0 ? fuerzas.reduce((s, f) => s + f, 0) / m : NaN);

/** Rozamiento sobre un suelo horizontal: normal, fuerza máxima estática, rozamiento real y aceleración. */
export function rozamiento(m: number, F: number, muE: number, muC: number) {
  const N = m * G;
  const frMax = muE * N;
  const desliza = F > frMax;
  const fr = desliza ? muC * N : Math.min(F, frMax);
  return { N, frMax, desliza, fr, a: desliza && m > 0 ? (F - fr) / m : 0 };
}

/** Plano inclinado (ángulo en grados): componentes del peso, normal, rozamiento y aceleración. */
export function planoInclinado(m: number, angulo: number, mu: number) {
  const th = (Math.min(90, Math.max(0, angulo)) * Math.PI) / 180;
  const P = m * G;
  const px = P * Math.sin(th);
  const py = P * Math.cos(th);
  const frMax = mu * py;
  const desliza = px > frMax;
  const fr = desliza ? frMax : px;
  return { P, px, py, N: py, frMax, desliza, fr, a: desliza && m > 0 ? (px - fr) / m : 0, anguloLimite: (Math.atan(mu) * 180) / Math.PI };
}

/** Máquina de Atwood: dos masas colgadas de una polea ideal. a > 0 si baja m₂. */
export function atwood(m1: number, m2: number) {
  const s = m1 + m2;
  if (!(s > 0)) return { a: NaN, T: NaN };
  return { a: ((m2 - m1) * G) / s, T: (2 * m1 * m2 * G) / s };
}
/** Bloque m₁ sobre una mesa (rozamiento μ) unido por una cuerda y una polea a m₂ colgando. */
export function mesaPolea(m1: number, m2: number, mu: number) {
  const s = m1 + m2;
  if (!(s > 0)) return { a: NaN, T: NaN, desliza: false };
  const frMax = mu * m1 * G;
  if (m2 * G <= frMax) return { a: 0, T: m2 * G, desliza: false };
  const a = (m2 * G - mu * m1 * G) / s;
  return { a, T: m1 * (a + mu * G), desliza: true };
}

/** Ley de Hooke: módulo de la fuerza elástica (N) con k (N/m) y deformación x (m); energía potencial elástica (J). */
export const fuerzaElastica = (k: number, x: number): number => Math.abs(k * x);
export const energiaElastica = (k: number, x: number): number => 0.5 * k * x * x;
/** Alargamiento de un muelle por el peso de una masa colgada (m). */
export const alargamientoPeso = (m: number, k: number): number => (k > 0 ? (m * G) / k : NaN);

/** Fuerza centrípeta (N) y velocidad máxima en una curva plana con rozamiento μ (m/s). */
export const fuerzaCentripeta = (m: number, v: number, R: number): number => (R > 0 ? (m * v * v) / R : NaN);
export const velocidadMaximaCurva = (mu: number, R: number): number => (R > 0 && mu >= 0 ? Math.sqrt(mu * G * R) : NaN);

/* ───────────── Dibujo ───────────── */

function Flecha({ a, b, color, width = 3 }: { a: Pt; b: Pt; color: string; width?: number }) {
  const len = Math.hypot(b[0] - a[0], b[1] - a[1]);
  if (len < 4) return null;
  return (
    <g>
      <Seg a={a} b={b} color={color} width={width} />
      <polygon points={arrowHead(a, b, Math.min(12, len * 0.6))} fill={color} />
    </g>
  );
}

/* ───────────── 1. Leyes de Newton ───────────── */

export function NewtonFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 5, 1, 20)), f1: Math.round(num(block.params?.b, 40, 0, 100)), f2: Math.round(num(block.params?.c, 10, 0, 100)), t: 4 };
  const [s, setS] = useState(init);
  const R = s.f1 - s.f2;
  const a = aceleracionNeta([s.f1, -s.f2], s.m);
  const sc = 1.1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "ΣF = m·a: la aceleración tiene la dirección de la fuerza resultante."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={1} max={20} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Fuerza hacia la derecha" value={s.f1} min={0} max={100} step={5} unit=" N" color={MANIM.green} onChange={(f1v) => setS((o) => ({ ...o, f1: f1v }))} />
          <Slider label="Fuerza hacia la izquierda" value={s.f2} min={0} max={100} step={5} unit=" N" color={MANIM.red} onChange={(f2v) => setS((o) => ({ ...o, f2: f2v }))} />
          <Slider label="Tiempo" value={s.t} min={0} max={10} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={120} testId="newton" maxH={140}>
        <Seg a={[40, 90]} b={[480, 90]} color={MANIM.muted} width={2} />
        <rect x={220} y={40} width={80} height={50} rx={4} fill={MANIM.blue} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={2} />
        <text x={260} y={71} textAnchor="middle" fill={MANIM.ink} fontSize={15} fontWeight={700}>{`${s.m} kg`}</text>
        <Flecha a={[300, 65]} b={[300 + s.f1 * sc, 65]} color={MANIM.green} />
        <Flecha a={[220, 65]} b={[220 - s.f2 * sc, 65]} color={MANIM.red} />
        <Flecha a={[260, 25]} b={[260 + R * sc * 0.6, 25]} color={MANIM.yellow} width={4} />
        <text x={260} y={14} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>ΣF</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Fuerza resultante ΣF">{`${f1(R)} N ${R === 0 ? "(equilibrio)" : R > 0 ? "→" : "←"}`}</Stat>
        <Stat color={MANIM.orange} label="Aceleración a = ΣF/m">{`${fin(a, f2)} m/s²`}</Stat>
        <Stat color={MANIM.blue} label={`Velocidad a los ${s.t} s (desde el reposo)`}>{`${fin(a * s.t, f1)} m/s`}</Stat>
        <Stat color={MANIM.purple} label="Distancia recorrida">{`${fin(0.5 * a * s.t * s.t, f1)} m`}</Stat>
      </Readout>
      <Note><b>1.ª ley (inercia)</b>: si ΣF = 0, el cuerpo sigue en reposo o en MRU. <b>2.ª ley</b>: la aceleración es proporcional a la fuerza resultante y tiene su dirección: <b>ΣF = m·a</b> (1 N = 1 kg·m/s²); con la misma fuerza, a más masa, menos aceleración. <b>3.ª ley (acción y reacción)</b>: si A empuja a B con una fuerza, B empuja a A con otra igual y de sentido contrario; actúan sobre cuerpos <b>distintos</b>, por eso no se anulan. Aquí no hay rozamiento.</Note>
    </Frame>
  );
}

/* ───────────── 2. Rozamiento ───────────── */

export function RozamientoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 10, 1, 50)), F: Math.round(num(block.params?.b, 30, 0, 200)), muE: num(block.params?.c, 0.5, 0.1, 1), muC: 0.4 };
  const [s, setS] = useState(init);
  const muC = Math.min(s.muC, s.muE);
  const r = rozamiento(s.m, s.F, s.muE, muC);
  const Fm = Math.max(50, r.frMax * 2, s.F * 1.1);
  const X = (F: number): number => 50 + (F / Fm) * 420;
  const Y = (fr: number): number => 150 - (fr / Fm) * 125;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El rozamiento estático iguala a la fuerza aplicada hasta un máximo; después, el cinético es menor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa del bloque" value={s.m} min={1} max={50} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Fuerza aplicada" value={s.F} min={0} max={200} step={5} unit=" N" color={MANIM.green} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="μ estático" value={s.muE} min={0.1} max={1} step={0.05} color={MANIM.orange} format={f2} onChange={(muE) => setS((o) => ({ ...o, muE }))} />
          <Slider label="μ cinético" value={muC} min={0.05} max={s.muE} step={0.05} color={MANIM.red} format={f2} onChange={(mc) => setS((o) => ({ ...o, muC: mc }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="rozamiento" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <polyline points={`${X(0)},${Y(0)} ${X(r.frMax)},${Y(r.frMax)} ${X(r.frMax)},${Y(muC * r.N)} ${X(Fm)},${Y(muC * r.N)}`} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <Dot p={[X(s.F), Y(r.fr)]} r={6} color={r.desliza ? MANIM.red : MANIM.green} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>fuerza aplicada F (N)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>rozamiento Fr (N)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Normal N = m·g">{`${f1(r.N)} N`}</Stat>
        <Stat color={MANIM.orange} label="Rozamiento estático máximo μₑ·N">{`${f1(r.frMax)} N`}</Stat>
        <Stat color={r.desliza ? MANIM.red : MANIM.green} label="Estado">{r.desliza ? "El bloque se desliza" : "El bloque no se mueve"}</Stat>
        <Stat color={MANIM.purple} label="Rozamiento actual · aceleración">{`${f1(r.fr)} N · ${f2(r.a)} m/s²`}</Stat>
      </Readout>
      <Note>La fuerza de <b>rozamiento</b> se opone al deslizamiento y es <b>proporcional a la normal</b>: <b>Fr = μ·N</b>. Si el cuerpo está <b>quieto</b>, el rozamiento <b>estático</b> iguala a la fuerza aplicada (Fr = F) hasta su máximo μₑ·N. Cuando se supera, el cuerpo se mueve y el rozamiento <b>cinético</b> (μ<sub>c</sub>·N, algo menor) es constante. No depende del área de contacto. En horizontal, N = m·g; la aceleración es a = (F − μ<sub>c</sub>·N)/m. Los valores de μ dependen de las superficies.</Note>
    </Frame>
  );
}

/* ───────────── 3. Plano inclinado ───────────── */

export function PlanoInclinadoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 10, 1, 50)), ang: Math.round(num(block.params?.b, 30, 0, 80)), mu: num(block.params?.c, 0.3, 0, 1) };
  const [s, setS] = useState(init);
  const r = planoInclinado(s.m, s.ang, s.mu);
  const th = (Math.min(80, Math.max(0, s.ang)) * Math.PI) / 180;
  const L = 300;
  const A: Pt = [60, 170];
  const B: Pt = [A[0] + L * Math.cos(th), A[1] - L * Math.sin(th)];
  const u: Pt = [Math.cos(th), -Math.sin(th)];
  const n: Pt = [-Math.sin(th), -Math.cos(th)];
  const c: Pt = [A[0] + u[0] * 190 + n[0] * 16, A[1] + u[1] * 190 + n[1] * 16];
  const k = 60 / Math.max(r.P, 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El peso se descompone: Pₓ = m·g·sen α tira del bloque pendiente abajo y P_y = m·g·cos α lo aprieta contra el plano."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo del plano" value={s.ang} min={0} max={80} step={1} unit="°" color={MANIM.orange} onChange={(ang) => setS((o) => ({ ...o, ang }))} />
          <Slider label="Masa" value={s.m} min={1} max={50} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Coeficiente de rozamiento μ" value={s.mu} min={0} max={1} step={0.05} color={MANIM.red} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
        </>
      }
    >
      <Svg w={520} h={210} testId="plano-inclinado" maxH={230}>
        <polygon points={`${A[0]},${A[1]} ${B[0]},${B[1]} ${B[0]},${A[1]}`} fill={MANIM.muted} fillOpacity={0.25} stroke={MANIM.ink} strokeWidth={2} />
        <g transform={`translate(${c[0]} ${c[1]}) rotate(${-s.ang})`}>
          <rect x={-18} y={-14} width={36} height={28} rx={3} fill={MANIM.blue} fillOpacity={0.8} stroke={MANIM.ink} strokeWidth={2} />
        </g>
        <Flecha a={c} b={[c[0], c[1] + r.P * k]} color={MANIM.red} />
        <Flecha a={c} b={[c[0] + n[0] * r.N * k, c[1] + n[1] * r.N * k]} color={MANIM.green} />
        <Flecha a={c} b={[c[0] + u[0] * r.fr * k * -1, c[1] + u[1] * r.fr * k * -1]} color={MANIM.orange} />
        <text x={A[0] + 40} y={A[1] - 6} fill={MANIM.ink} fontSize={12}>{`${s.ang}°`}</text>
        <text x={c[0] + 10} y={c[1] + r.P * k + 4} fill={MANIM.red} fontSize={12}>P</text>
        <text x={c[0] + n[0] * r.N * k - 14} y={c[1] + n[1] * r.N * k - 4} fill={MANIM.green} fontSize={12}>N</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Peso · componentes Pₓ y P_y">{`${f1(r.P)} N · ${f1(r.px)} N y ${f1(r.py)} N`}</Stat>
        <Stat color={MANIM.green} label="Normal N = P_y">{`${f1(r.N)} N`}</Stat>
        <Stat color={MANIM.orange} label="Rozamiento · estado">{`${f1(r.fr)} N · ${r.desliza ? "desliza" : "en reposo"}`}</Stat>
        <Stat color={MANIM.purple} label="Aceleración">{`${f2(r.a)} m/s²`}</Stat>
        <Stat color={MANIM.blue} label="Ángulo límite (tan α = μ)">{`${f1(r.anguloLimite)}°`}</Stat>
      </Readout>
      <Note>En un plano inclinado el <b>peso</b> se descompone en dos componentes: <b>Pₓ = m·g·sen α</b> (a lo largo del plano, tira del cuerpo hacia abajo) y <b>P_y = m·g·cos α</b> (perpendicular, la equilibra la <b>normal</b>: N = P_y). El rozamiento vale <b>μ·N = μ·m·g·cos α</b> y se opone al movimiento. El cuerpo <b>desliza</b> si Pₓ &gt; μ·N, es decir, si <b>tan α &gt; μ</b>; entonces <b>a = g·(sen α − μ·cos α)</b>. Fíjate en que <b>no depende de la masa</b>. El dibujo muestra el peso, la normal y el rozamiento (Pₓ y P_y se calculan en los datos).</Note>
    </Frame>
  );
}

/* ───────────── 4. Tensión y poleas ───────────── */

export function PoleasFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), m1: Math.round(num(block.params?.a, 3, 1, 20)), m2: Math.round(num(block.params?.b, 5, 1, 20)), mu: 0.2 };
  const [s, setS] = useState(init);
  const atw = atwood(s.m1, s.m2);
  const mesa = mesaPolea(s.m1, s.m2, s.mu);
  const esMesa = s.modo === 1;
  const a = esMesa ? mesa.a : atw.a;
  const T = esMesa ? mesa.T : atw.T;
  const h1 = 20 + s.m1 * 3;
  const h2 = 20 + s.m2 * 3;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La tensión es la fuerza que transmite la cuerda; con polea ideal es la misma a los dos lados."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Montaje" items={[{ value: "0", label: "Máquina de Atwood" }, { value: "1", label: "Bloque en mesa + colgante" }]} value={String(s.modo)} onChange={(v) => setS((o) => ({ ...o, modo: Number(v) }))} />
          <Slider label="Masa m₁" value={s.m1} min={1} max={20} step={1} unit=" kg" color={MANIM.blue} onChange={(m1) => setS((o) => ({ ...o, m1 }))} />
          <Slider label="Masa m₂" value={s.m2} min={1} max={20} step={1} unit=" kg" color={MANIM.orange} onChange={(m2) => setS((o) => ({ ...o, m2 }))} />
          {esMesa && <Slider label="Rozamiento μ de la mesa" value={s.mu} min={0} max={1} step={0.05} color={MANIM.red} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />}
        </>
      }
    >
      <Svg w={520} h={190} testId="poleas" maxH={210}>
        {!esMesa ? (
          <g>
            <circle cx={260} cy={36} r={30} fill="none" stroke={MANIM.ink} strokeWidth={3} />
            <Seg a={[230, 36]} b={[230, 175 - h1]} color={MANIM.muted} width={2} />
            <Seg a={[290, 36]} b={[290, 175 - h2]} color={MANIM.muted} width={2} />
            <rect x={206} y={175 - h1} width={48} height={h1} fill={MANIM.blue} fillOpacity={0.8} stroke={MANIM.ink} strokeWidth={2} />
            <rect x={266} y={175 - h2} width={48} height={h2} fill={MANIM.orange} fillOpacity={0.8} stroke={MANIM.ink} strokeWidth={2} />
            <text x={230} y={175 - h1 / 2 + 5} textAnchor="middle" fill={MANIM.ink} fontSize={14} fontWeight={700}>m₁</text>
            <text x={290} y={175 - h2 / 2 + 5} textAnchor="middle" fill={MANIM.ink} fontSize={14} fontWeight={700}>m₂</text>
          </g>
        ) : (
          <g>
            <Seg a={[60, 90]} b={[340, 90]} color={MANIM.ink} width={3} />
            <circle cx={350} cy={80} r={14} fill="none" stroke={MANIM.ink} strokeWidth={3} />
            <Seg a={[220, 70]} b={[350, 66]} color={MANIM.muted} width={2} />
            <Seg a={[364, 80]} b={[364, 170 - h2 + 40]} color={MANIM.muted} width={2} />
            <rect x={180} y={50} width={44} height={40} fill={MANIM.blue} fillOpacity={0.8} stroke={MANIM.ink} strokeWidth={2} />
            <rect x={346} y={130} width={36} height={40} fill={MANIM.orange} fillOpacity={0.8} stroke={MANIM.ink} strokeWidth={2} />
            <text x={202} y={75} textAnchor="middle" fill={MANIM.ink} fontSize={12}>m₁</text>
            <text x={364} y={155} textAnchor="middle" fill={MANIM.ink} fontSize={12}>m₂</text>
          </g>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Aceleración del sistema">{`${fin(Math.abs(a), f2)} m/s²${esMesa ? (mesa.desliza ? "" : " (no se mueve)") : a === 0 ? " (equilibrio)" : a > 0 ? " · baja m₂" : " · baja m₁"}`}</Stat>
        <Stat color={MANIM.blue} label="Tensión de la cuerda">{`${fin(T, f1)} N`}</Stat>
        <Stat color={MANIM.purple} label="Pesos">{`m₁·g = ${f1(s.m1 * G)} N · m₂·g = ${f1(s.m2 * G)} N`}</Stat>
      </Readout>
      <Note>La <b>tensión</b> es la fuerza que ejerce una cuerda; con <b>cuerda ideal</b> (inextensible, sin masa) y <b>polea ideal</b> es la misma en toda la cuerda y los dos cuerpos tienen el <b>mismo módulo de aceleración</b>. Se aplica ΣF = m·a <b>a cada cuerpo</b> y se resuelve el sistema. <b>Atwood</b>: a = (m₂ − m₁)·g/(m₁ + m₂) y T = 2·m₁·m₂·g/(m₁ + m₂). <b>Bloque en mesa</b> unido a otro colgante: a = (m₂·g − μ·m₁·g)/(m₁ + m₂) y T = m₁·(a + μ·g). Si m₂·g no supera el rozamiento máximo, no se mueve.</Note>
    </Frame>
  );
}

/* ───────────── 5. Fuerza elástica y centrípeta ───────────── */

export function ElasticaCentripetaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), k: Math.round(num(block.params?.a, 100, 10, 500)), x: num(block.params?.b, 0.2, 0, 0.5), m: 1000, v: 50, R: 50, mu: 0.7 };
  const [s, setS] = useState(init);
  const curva = s.modo === 1;
  const vms = s.v / 3.6;
  const Fc = fuerzaCentripeta(s.m, vms, s.R);
  const vmax = velocidadMaximaCurva(s.mu, s.R);
  const sale = vms > vmax;
  const pasos = 8;
  const w = 40 + s.x * 300;
  const zig = Array.from({ length: pasos * 2 + 1 }, (_, i) => `${60 + (i / (pasos * 2)) * w},${i === 0 || i === pasos * 2 ? 60 : 60 + (i % 2 === 0 ? -10 : 10)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Fuerza elástica F = k·x; fuerza centrípeta F = m·v²/R."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Estudio" items={[{ value: "0", label: "Muelle (ley de Hooke)" }, { value: "1", label: "Curva (fuerza centrípeta)" }]} value={String(s.modo)} onChange={(v) => setS((o) => ({ ...o, modo: Number(v) }))} />
          {!curva ? (
            <>
              <Slider label="Constante del muelle k" value={s.k} min={10} max={500} step={10} unit=" N/m" color={MANIM.blue} onChange={(k) => setS((o) => ({ ...o, k }))} />
              <Slider label="Alargamiento x" value={s.x} min={0} max={0.5} step={0.01} unit=" m" color={MANIM.orange} format={f2} onChange={(x) => setS((o) => ({ ...o, x }))} />
            </>
          ) : (
            <>
              <Slider label="Masa del coche" value={s.m} min={500} max={2000} step={100} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
              <Slider label="Velocidad" value={s.v} min={10} max={120} step={5} unit=" km/h" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
              <Slider label="Radio de la curva" value={s.R} min={10} max={200} step={5} unit=" m" color={MANIM.green} onChange={(R) => setS((o) => ({ ...o, R }))} />
              <Slider label="Rozamiento μ" value={s.mu} min={0.1} max={1} step={0.05} color={MANIM.red} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
            </>
          )}
        </>
      }
    >
      <Svg w={520} h={120} testId="elastica-centripeta" maxH={140}>
        {!curva ? (
          <g>
            <Seg a={[60, 30]} b={[60, 90]} color={MANIM.ink} width={5} />
            <polyline points={zig} fill="none" stroke={MANIM.blue} strokeWidth={3} />
            <rect x={60 + w} y={42} width={36} height={36} fill={MANIM.orange} fillOpacity={0.85} stroke={MANIM.ink} strokeWidth={2} />
            <Flecha a={[60 + w + 18, 100]} b={[60 + w + 18 - Math.min(150, fuerzaElastica(s.k, s.x) * 2), 100]} color={MANIM.green} />
          </g>
        ) : (
          <g>
            <path d="M 60 100 A 160 160 0 0 1 400 70" fill="none" stroke={MANIM.muted} strokeWidth={14} strokeLinecap="round" opacity={0.5} />
            <circle cx={230} cy={40} r={12} fill={sale ? MANIM.red : MANIM.green} />
            <Flecha a={[230, 40]} b={[230, 40 + Math.min(60, 10 + Fc / 1000)]} color={MANIM.orange} />
            <text x={248} y={40 + Math.min(60, 10 + Fc / 1000)} fill={MANIM.orange} fontSize={12}>F centrípeta</text>
          </g>
        )}
      </Svg>
      <Readout>
        {!curva ? (
          <>
            <Stat color={MANIM.green} label="Fuerza elástica F = k·x">{`${f1(fuerzaElastica(s.k, s.x))} N`}</Stat>
            <Stat color={MANIM.purple} label="Energía almacenada ½·k·x²">{`${f2(energiaElastica(s.k, s.x))} J`}</Stat>
            <Stat color={MANIM.blue} label="Masa que lo alargaría así">{`${f2(fuerzaElastica(s.k, s.x) / G)} kg`}</Stat>
          </>
        ) : (
          <>
            <Stat color={MANIM.orange} label="Fuerza centrípeta necesaria m·v²/R">{`${fmtEs(Fc, 0)} N`}</Stat>
            <Stat color={MANIM.red} label="Rozamiento máximo μ·m·g">{`${fmtEs(s.mu * s.m * G, 0)} N`}</Stat>
            <Stat color={MANIM.blue} label="Velocidad máxima segura">{`${fin(vmax * 3.6, f1)} km/h`}</Stat>
            <Stat color={sale ? MANIM.red : MANIM.green} label="Resultado">{sale ? "El coche derrapa" : "El coche toma la curva"}</Stat>
          </>
        )}
      </Readout>
      <Note>{!curva ? <>Un muelle se opone a la deformación con una fuerza <b>proporcional al alargamiento</b>: <b>ley de Hooke, F = k·x</b>, con k la <b>constante elástica</b> (N/m). Vale mientras no se supere el <b>límite elástico</b>; la fuerza apunta hacia la posición de equilibrio. Se usa en los <b>dinamómetros</b>. Al deformarlo se almacena la <b>energía elástica ½·k·x²</b>.</> : <>Para girar en una curva de radio R hace falta una <b>fuerza centrípeta</b> dirigida al centro: <b>F = m·a_c = m·v²/R</b>. No es una fuerza nueva: la aporta el <b>rozamiento</b> de los neumáticos (curva plana), la <b>tensión</b> de una cuerda o la <b>gravedad</b>. En una curva plana, el rozamiento máximo μ·m·g limita la velocidad: <b>v_máx = √(μ·g·R)</b>; no depende de la masa. Con lluvia o hielo, μ baja y v_máx también.</>}</Note>
    </Frame>
  );
}
