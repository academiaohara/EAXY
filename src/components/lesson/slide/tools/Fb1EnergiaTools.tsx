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
const f0 = (v: number) => fmtEs(v, 0);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");
const cero = (v: number): number => (Math.abs(v) < 5e-3 ? 0 : v);
const rad = (g: number): number => (g * Math.PI) / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;

export const trabajo = (F: number, alfa: number, d: number): number => F * d * Math.cos(rad(alfa));

/** Cuerpo arrastrado por el suelo con una fuerza F inclinada α sobre la horizontal. */
export function arrastre(m: number, F: number, alfa: number, d: number, mu: number, g = G) {
  const N = Math.max(0, m * g - F * Math.sin(rad(alfa)));
  const Fr = mu * N;
  const Wf = trabajo(F, alfa, d);
  const Wr = -Fr * d;
  const Wn = Wf + Wr;
  return { N, Fr, Wf, Wr, Wp: 0, WN: 0, Wn, v: Wn > 0 && m > 0 ? Math.sqrt((2 * Wn) / m) : 0 };
}

export const cinetica = (m: number, v: number): number => 0.5 * m * v * v;

/** Teorema de las fuerzas vivas: W = ΔEc. Devuelve la velocidad final o NaN si el trabajo la hace imposible. */
export function velocidadFinal(m: number, v0: number, W: number): number {
  if (m <= 0) return NaN;
  const v2 = v0 * v0 + (2 * W) / m;
  return v2 < 0 ? NaN : Math.sqrt(v2);
}

export const distanciaParada = (m: number, v0: number, Fneta: number): number => (Fneta < 0 ? (0.5 * m * v0 * v0) / -Fneta : NaN);

/** Bloque que baja por una rampa de altura h0, ángulo th y rozamiento mu; frac = fracción del recorrido (0–1). */
export function energiasRampa(m: number, h0: number, th: number, mu: number, frac: number, g = G) {
  const L = h0 / Math.sin(rad(th));
  const s = Math.max(0, Math.min(1, frac)) * L;
  const h = h0 - s * Math.sin(rad(th));
  const Ep = m * g * h;
  const Q = mu * m * g * Math.cos(rad(th)) * s;
  const Ec = m * g * h0 - Ep - Q;
  const desliza = Math.tan(rad(th)) > mu;
  return { L, s, h, Ep, Ec: desliza ? Ec : 0, Q: desliza ? Q : 0, Em: desliza ? Ep + Ec : m * g * h0, Etot: m * g * h0, desliza, vFinal: desliza ? Math.sqrt(Math.max(0, 2 * g * h0 * (1 - mu / Math.tan(rad(th))))) : 0 };
}

/** Muelle comprimido x (m) que lanza una masa m sobre un suelo con rozamiento mu. */
export function muelleLanzamiento(k: number, x: number, m: number, mu: number, g = G) {
  const Ep = 0.5 * k * x * x;
  const Wr = mu * m * g * x;
  const Ec = Math.max(0, Ep - Wr);
  const v = m > 0 ? Math.sqrt((2 * Ec) / m) : NaN;
  return { Ep, Wr, Ec, v, hMax: v * v / (2 * g), distancia: mu > 0 ? Ec / (mu * m * g) : Infinity };
}

/** Elevar una masa m una altura h en t segundos con un motor de rendimiento eta (0–1). */
export function elevacion(m: number, h: number, t: number, eta: number, precioKWh = 0.15, g = G) {
  const Wu = m * g * h;
  const Pu = t > 0 ? Wu / t : NaN;
  const Wc = eta > 0 ? Wu / eta : NaN;
  const Pc = t > 0 ? Wc / t : NaN;
  return { Wu, Pu, Wc, Pc, perdida: Wc - Wu, kWh: Wc / 3.6e6, coste: (Wc / 3.6e6) * precioKWh, cv: Pu / 735.5 };
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

/* ───────────── 1. Trabajo de una fuerza ───────────── */

export function TrabajoFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { F: Math.round(num(block.params?.a, 50, 0, 200)), alfa: Math.round(num(block.params?.b, 30, -90, 90)), d: Math.round(num(block.params?.c, 10, 1, 50)), m: 10, mu: 0.2 };
  const [s, setS] = useState(init);
  const r = arrastre(s.m, s.F, s.alfa, s.d, s.mu);
  const al = rad(s.alfa);
  const O: Pt = [90, 100];
  const colorW = (w: number): string => (w > 0.005 ? MANIM.green : w < -0.005 ? MANIM.red : MANIM.muted);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El trabajo de una fuerza es F·d·cos α: solo cuenta su componente en la dirección del desplazamiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza aplicada F" value={s.F} min={0} max={200} step={5} unit=" N" color={MANIM.blue} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Ángulo α con el desplazamiento (negativo = empujando hacia abajo)" value={s.alfa} min={-90} max={90} step={5} unit="°" color={MANIM.green} onChange={(alfa) => setS((o) => ({ ...o, alfa }))} />
          <Slider label="Distancia recorrida d" value={s.d} min={1} max={50} step={1} unit=" m" color={MANIM.purple} onChange={(d) => setS((o) => ({ ...o, d }))} />
          <Slider label="Masa del bloque" value={s.m} min={1} max={50} step={1} unit=" kg" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Coeficiente de rozamiento μ" value={s.mu} min={0} max={1} step={0.05} color={MANIM.orange} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
        </>
      }
    >
      <Svg w={420} h={150} testId="trabajo-fuerza" maxH={180}>
        <Seg a={[20, 130]} b={[400, 130]} color={MANIM.ink} width={3} />
        <rect x={O[0] - 30} y={100} width={60} height={30} fill={MANIM.blue} fillOpacity={0.75} />
        <Flecha a={[O[0], 115]} b={[O[0] + Math.cos(al) * (20 + s.F * 0.7), 115 - Math.sin(al) * (20 + s.F * 0.7)]} color={MANIM.green} />
        <Flecha a={[O[0] - 30, 115]} b={[O[0] - 30 - Math.min(70, r.Fr * 0.7), 115]} color={MANIM.red} />
        <Flecha a={[O[0] + 40, 140]} b={[O[0] + 40 + Math.min(280, s.d * 6), 140]} color={MANIM.yellow} width={2} />
        <text x={O[0] + 50 + Math.min(280, s.d * 6)} y={144} fill={MANIM.yellow} fontSize={11}>d</text>
        <text x={410} y={146} textAnchor="end" fill={MANIM.muted} fontSize={11}>verde: F · rojo: rozamiento</text>
      </Svg>
      <Readout>
        <Stat color={colorW(r.Wf)} label="Trabajo de F = F·d·cos α">{`${f1(cero(r.Wf))} J`}</Stat>
        <Stat color={colorW(r.Wr)} label="Trabajo del rozamiento = −μ·N·d">{`${f1(cero(r.Wr))} J (N = ${f1(r.N)} N)`}</Stat>
        <Stat color={MANIM.muted} label="Trabajo del peso y de la normal (perpendiculares al desplazamiento)">{`0 J y 0 J`}</Stat>
        <Stat color={colorW(r.Wn)} label="Trabajo neto = ΔEc">{`${f1(cero(r.Wn))} J`}</Stat>
        <Stat color={MANIM.yellow} label="Si partía del reposo, velocidad final">{r.Wn > 0 ? `${f2(r.v)} m/s` : "no llega a moverse con aceleración positiva"}</Stat>
      </Readout>
      <Note>El <b>trabajo</b> de una fuerza constante es el <b>producto escalar</b> W = F · Δr = <b>F·d·cos α</b>, con α el ángulo entre la fuerza y el desplazamiento. Se mide en <b>julios</b> (1 J = 1 N·m). Es <b>positivo</b> si la fuerza ayuda al movimiento (α &lt; 90°), <b>negativo</b> si se opone (α &gt; 90°; p. ej. el rozamiento, α = 180°) y <b>nulo</b> si es perpendicular (el peso y la normal en un suelo horizontal, o la fuerza centrípeta). Tirar hacia arriba <b>reduce la normal</b> y por tanto el rozamiento; empujar hacia abajo lo aumenta. El <b>trabajo neto</b> es la suma de los trabajos de todas las fuerzas y es igual a la <b>variación de energía cinética</b>.</Note>
    </Frame>
  );
}

/* ───────────── 2. Teorema trabajo-energía cinética ───────────── */

export function TeoremaEnergiaCineticaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 1000, 100, 2000)), v0: Math.round(num(block.params?.b, 20, 0, 40)), F: Math.round(num(block.params?.c, -4000, -10000, 10000)), d: 40 };
  const [s, setS] = useState(init);
  const W = s.F * s.d;
  const vf = velocidadFinal(s.m, s.v0, W);
  const parada = distanciaParada(s.m, s.v0, s.F);
  const E0 = cinetica(s.m, s.v0);
  const Ef = Number.isFinite(vf) ? cinetica(s.m, vf) : 0;
  const maxE = Math.max(E0, Ef, 1);
  const bar = (e: number): number => Math.max(2, (e / maxE) * 220);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El trabajo de la fuerza neta es igual a la variación de la energía cinética: W = ½·m·v² − ½·m·v₀²."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={100} max={2000} step={50} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Velocidad inicial" value={s.v0} min={0} max={40} step={1} unit=" m/s" color={MANIM.green} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Fuerza neta (negativa = frena)" value={s.F} min={-10000} max={10000} step={250} unit=" N" color={MANIM.orange} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Distancia recorrida" value={s.d} min={1} max={200} step={1} unit=" m" color={MANIM.purple} onChange={(d) => setS((o) => ({ ...o, d }))} />
        </>
      }
    >
      <Svg w={420} h={110} testId="teorema-ec" maxH={140}>
        <rect x={110} y={20} width={bar(E0)} height={28} fill={MANIM.blue} fillOpacity={0.8} />
        <text x={100} y={39} textAnchor="end" fill={MANIM.ink} fontSize={12}>Ec inicial</text>
        <rect x={110} y={62} width={bar(Ef)} height={28} fill={MANIM.green} fillOpacity={0.8} />
        <text x={100} y={81} textAnchor="end" fill={MANIM.ink} fontSize={12}>Ec final</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Energía cinética inicial ½·m·v₀²">{`${f1(E0 / 1000)} kJ`}</Stat>
        <Stat color={MANIM.orange} label="Trabajo de la fuerza neta W = F·d">{`${f1(cero(W) / 1000)} kJ`}</Stat>
        <Stat color={MANIM.green} label="Velocidad final · energía cinética final">{Number.isFinite(vf) ? `${f2(vf)} m/s (${f1(vf * 3.6)} km/h) · ${f1(Ef / 1000)} kJ` : "el cuerpo se detiene antes de recorrer esa distancia"}</Stat>
        <Stat color={MANIM.red} label="Si frena: distancia hasta pararse">{Number.isFinite(parada) ? `${f1(parada)} m` : "— (la fuerza no frena)"}</Stat>
      </Readout>
      <Note>La <b>energía cinética</b> es la que posee un cuerpo por su movimiento: <b>Ec = ½·m·v²</b> (J). El <b>teorema de las fuerzas vivas</b> (o trabajo-energía cinética) afirma que el <b>trabajo de la fuerza neta</b> es la variación de Ec: <b>W_neto = ΔEc = ½·m·v² − ½·m·v₀²</b>. Sirve para fuerzas variables y trayectorias curvas, sin necesidad de calcular la aceleración. La Ec depende del <b>cuadrado de la velocidad</b>: al doblar v, la distancia de frenado se <b>cuadruplica</b> (d = Ec/F). Si la fuerza es contraria al movimiento y W &lt; −Ec₀, el cuerpo se detiene antes de acabar el recorrido.</Note>
    </Frame>
  );
}

/* ───────────── 3. Conservación de la energía en una rampa ───────────── */

export function RampaEnergiaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 2, 1, 20)), h0: Math.round(num(block.params?.b, 5, 1, 10)), th: Math.round(num(block.params?.c, 35, 10, 75)), mu: 0.1, frac: 0.5 };
  const [s, setS] = useState(init);
  const r = energiasRampa(s.m, s.h0, s.th, s.mu, s.frac);
  const th = rad(s.th);
  const hpx = s.h0 * 14;
  const A: Pt = [30, 150];
  const top: Pt = [A[0], 150 - hpx];
  const bot: Pt = [A[0] + hpx / Math.tan(th), 150];
  const pos: Pt = [top[0] + (bot[0] - top[0]) * s.frac, top[1] + (bot[1] - top[1]) * s.frac];
  const tot = Math.max(1, r.Etot);
  const W = (e: number): number => Math.max(0, Math.min(1, e / tot)) * 120;
  const bx = 330;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sin rozamiento, la energía mecánica Ec + Ep es constante. Con rozamiento, una parte se convierte en calor y se disipa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={1} max={20} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Altura inicial" value={s.h0} min={1} max={10} step={0.5} unit=" m" color={MANIM.green} format={f1} onChange={(h0) => setS((o) => ({ ...o, h0 }))} />
          <Slider label="Inclinación" value={s.th} min={10} max={75} step={1} unit="°" color={MANIM.purple} onChange={(th2) => setS((o) => ({ ...o, th: th2 }))} />
          <Slider label="Rozamiento μ" value={s.mu} min={0} max={0.8} step={0.05} color={MANIM.orange} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
          <Slider label="Posición en la rampa (0 = arriba, 1 = abajo)" value={s.frac} min={0} max={1} step={0.05} color={MANIM.yellow} format={f2} onChange={(frac) => setS((o) => ({ ...o, frac }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="rampa-energia" maxH={200}>
        <polygon points={`${top.join(",")} ${bot.join(",")} ${A.join(",")}`} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.ink} strokeWidth={2} />
        <Dot p={[pos[0] + Math.sin(th) * -9, pos[1] - Math.cos(th) * 9]} r={8} color={MANIM.blue} />
        {([["Ep", r.Ep, MANIM.green], ["Ec", r.Ec, MANIM.blue], ["Q", r.Q, MANIM.red], ["Total", r.Etot, MANIM.yellow]] as const).map(([n, e, c], i) => (
          <g key={n}>
            <rect x={bx + 30} y={14 + i * 36} width={W(e)} height={24} fill={c} fillOpacity={0.8} />
            <text x={bx + 24} y={31 + i * 36} textAnchor="end" fill={MANIM.ink} fontSize={12}>{n}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Altura · energía potencial m·g·h">{`${f2(r.h)} m · ${f1(r.Ep)} J`}</Stat>
        <Stat color={MANIM.blue} label="Energía cinética ½·m·v²">{`${f1(r.Ec)} J${r.Ec > 0 ? ` (v = ${f2(Math.sqrt((2 * r.Ec) / s.m))} m/s)` : ""}`}</Stat>
        <Stat color={MANIM.red} label="Calor disipado por rozamiento Q = μ·m·g·cos θ·s">{`${f1(r.Q)} J`}</Stat>
        <Stat color={MANIM.yellow} label="Conservación: Ep + Ec + Q = energía inicial">{`${f1(r.Ep + r.Ec + r.Q)} J = ${f1(r.Etot)} J`}</Stat>
        <Stat color={r.desliza ? MANIM.green : MANIM.red} label="Velocidad al llegar abajo">{r.desliza ? `${f2(r.vFinal)} m/s` : `no desliza (μ ≥ tg θ = ${f2(Math.tan(th))})`}</Stat>
      </Readout>
      <Note>Una fuerza es <b>conservativa</b> si su trabajo no depende del camino (peso, elástica, gravitatoria, eléctrica): permite definir una <b>energía potencial</b>, con W = −ΔEp. La <b>Ep gravitatoria</b> cerca de la Tierra es <b>m·g·h</b> y la <b>elástica</b> ½·k·x². Si solo actúan fuerzas conservativas se conserva la <b>energía mecánica Em = Ec + Ep</b>: sin rozamiento, v = √(2·g·h) <b>no depende de la masa ni de la inclinación</b>. Las fuerzas <b>no conservativas</b> (rozamiento) hacen que <b>ΔEm = W_nc</b>: la energía mecánica disminuye y se convierte en <b>calor</b> Q, aunque la energía total se conserva (<b>principio de conservación de la energía</b>).</Note>
    </Frame>
  );
}

/* ───────────── 4. Muelle que lanza un cuerpo ───────────── */

export function MuelleEnergiaFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { k: Math.round(num(block.params?.a, 400, 50, 2000)), x: num(block.params?.b, 0.2, 0.02, 0.5), m: num(block.params?.c, 0.5, 0.1, 5), mu: 0.1 };
  const [s, setS] = useState(init);
  const r = muelleLanzamiento(s.k, s.x, s.m, s.mu);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La energía elástica almacenada en el muelle comprimido se transforma en energía cinética (menos lo que disipa el rozamiento)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Constante del muelle k" value={s.k} min={50} max={2000} step={50} unit=" N/m" color={MANIM.blue} onChange={(k) => setS((o) => ({ ...o, k }))} />
          <Slider label="Compresión x" value={s.x} min={0.02} max={0.5} step={0.01} unit=" m" color={MANIM.green} format={f2} onChange={(x) => setS((o) => ({ ...o, x }))} />
          <Slider label="Masa del cuerpo" value={s.m} min={0.1} max={5} step={0.1} unit=" kg" color={MANIM.orange} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Rozamiento μ con el suelo" value={s.mu} min={0} max={0.5} step={0.05} color={MANIM.purple} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
        </>
      }
    >
      <Svg w={420} h={100} testId="muelle-energia" maxH={130}>
        <Seg a={[20, 80]} b={[400, 80]} color={MANIM.ink} width={3} />
        <Seg a={[30, 30]} b={[30, 80]} color={MANIM.ink} width={4} />
        <polyline points={Array.from({ length: 13 }, (_, i) => `${30 + (s.x * 180 * i) / 12},${i === 0 || i === 12 ? 62 : 62 + (i % 2 === 0 ? -9 : 9)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <rect x={30 + s.x * 180} y={52} width={30} height={28} fill={MANIM.orange} fillOpacity={0.8} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Energía elástica almacenada ½·k·x²">{`${f2(r.Ep)} J`}</Stat>
        <Stat color={MANIM.red} label="Trabajo del rozamiento durante la descompresión">{`${f2(r.Wr)} J`}</Stat>
        <Stat color={MANIM.green} label="Energía cinética al soltarse · velocidad">{`${f2(r.Ec)} J · ${fin(r.v, f2)} m/s`}</Stat>
        <Stat color={MANIM.yellow} label="Altura que alcanzaría subiendo en vertical (v²/2g)">{`${fin(r.hMax, f2)} m`}</Stat>
        <Stat color={MANIM.purple} label="Distancia que seguiría deslizando hasta pararse">{Number.isFinite(r.distancia) ? `${f2(r.distancia)} m` : "sin límite (no hay rozamiento)"}</Stat>
      </Readout>
      <Note>El muelle es un ejemplo de <b>fuerza conservativa</b>: el trabajo para comprimirlo x es <b>½·k·x²</b> (el área bajo la gráfica F–x, un triángulo) y queda almacenado como <b>energía potencial elástica</b>. Al soltarlo se transforma en cinética: <b>½·k·x² = ½·m·v²</b> → v = x·√(k/m). Con rozamiento hay que restar <b>μ·m·g·x</b>. La energía cinética final sirve para calcular, por ejemplo, la <b>altura</b> a la que subiría (m·g·h = Ec) o la <b>distancia</b> de deslizamiento sobre el suelo (Ec = μ·m·g·d). La <b>gráfica fuerza–posición</b> es la herramienta general: <b>el trabajo es el área bajo la curva</b>, incluso con fuerzas variables.</Note>
    </Frame>
  );
}

/* ───────────── 5. Potencia y rendimiento ───────────── */

export function PotenciaRendimientoFb1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 500, 50, 2000)), h: Math.round(num(block.params?.b, 20, 1, 100)), t: Math.round(num(block.params?.c, 20, 1, 120)), eta: 0.7 };
  const [s, setS] = useState(init);
  const r = elevacion(s.m, s.h, s.t, s.eta);
  const W = (e: number): number => Math.max(2, Math.min(1, e / Math.max(1, r.Wc)) * 240);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La potencia es el trabajo (o energía) por unidad de tiempo; el rendimiento es la fracción de energía consumida que se aprovecha."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa que se eleva" value={s.m} min={50} max={2000} step={50} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Altura" value={s.h} min={1} max={100} step={1} unit=" m" color={MANIM.green} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Slider label="Tiempo empleado" value={s.t} min={1} max={120} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
          <Slider label="Rendimiento del motor" value={s.eta} min={0.1} max={1} step={0.05} color={MANIM.orange} format={(v) => `${f0(v * 100)} %`} onChange={(eta) => setS((o) => ({ ...o, eta }))} />
        </>
      }
    >
      <Svg w={420} h={100} testId="potencia-rend" maxH={130}>
        <rect x={110} y={14} width={W(r.Wc)} height={26} fill={MANIM.yellow} fillOpacity={0.8} />
        <text x={100} y={32} textAnchor="end" fill={MANIM.ink} fontSize={12}>Consumida</text>
        <rect x={110} y={56} width={Math.max(2, (r.Wu / Math.max(1, r.Wc)) * 240)} height={26} fill={MANIM.green} fillOpacity={0.8} />
        <text x={100} y={74} textAnchor="end" fill={MANIM.ink} fontSize={12}>Útil</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Trabajo útil W = m·g·h">{`${f1(r.Wu / 1000)} kJ`}</Stat>
        <Stat color={MANIM.green} label="Potencia útil P = W/t">{`${fin(r.Pu, f0)} W (${fin(r.cv, f2)} CV)`}</Stat>
        <Stat color={MANIM.yellow} label="Energía consumida W/η · potencia consumida">{`${fin(r.Wc / 1000, f1)} kJ · ${fin(r.Pc, f0)} W`}</Stat>
        <Stat color={MANIM.red} label="Energía perdida (calor, rozamiento…)">{`${fin(r.perdida / 1000, f1)} kJ`}</Stat>
        <Stat color={MANIM.purple} label="Energía en kWh · coste a 0,15 €/kWh">{`${fin(r.kWh, (v) => fmtEs(v, 4))} kWh · ${fin(r.coste, (v) => fmtEs(v, 4))} €`}</Stat>
      </Readout>
      <Note>La <b>potencia</b> es la rapidez con que se realiza trabajo o se transfiere energía: <b>P = W/t</b> (vatio, 1 W = 1 J/s). Para una fuerza constante y un cuerpo con velocidad v: <b>P = F·v</b>. Otras unidades: <b>1 CV = 735,5 W</b> y el <b>kWh</b> (<b>1 kWh = 3,6·10⁶ J</b>), unidad de <b>energía</b> en la factura eléctrica. El <b>rendimiento</b> es η = W_útil/W_consumido = P_útil/P_consumida (siempre menor que 1): la diferencia se disipa, sobre todo en forma de <b>calor</b>. En una cadena de máquinas, los rendimientos <b>se multiplican</b>. Para elevar m a una altura h en un tiempo t: P_útil = m·g·h/t.</Note>
    </Frame>
  );
}
