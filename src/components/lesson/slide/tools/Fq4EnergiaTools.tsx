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
const f0 = (v: number) => fmtEs(v, 0);
const fin = (v: number, fmt: (x: number) => string): string => (Number.isFinite(v) ? fmt(v) : "—");

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;
export const CV = 735.5;

/** Trabajo de una fuerza constante: W = F·d·cos θ (J), θ en grados. */
export const trabajo = (F: number, d: number, angulo: number): number => F * d * Math.cos((angulo * Math.PI) / 180);
/** Potencia media (W): trabajo entre tiempo. */
export const potencia = (W: number, t: number): number => (t > 0 ? W / t : NaN);
/** Energías mecánicas (J). */
export const energiaCinetica = (m: number, v: number): number => 0.5 * m * v * v;
export const energiaPotencial = (m: number, h: number): number => m * G * h;

/**
 * Teorema trabajo-energía en un tramo horizontal con fuerza F (horizontal) y rozamiento cinético μ·m·g:
 * W_neto = (F − Fr)·d = ΔEc. Devuelve velocidad final (0 si se para antes) y la distancia hasta pararse si decelera.
 */
export function teoremaTrabajoEnergia(m: number, v0: number, F: number, mu: number, d: number) {
  const fr = mu * m * G;
  const wF = F * d;
  const wFr = -fr * d;
  const ec0 = energiaCinetica(m, v0);
  const ecFinal = ec0 + wF + wFr;
  const neta = F - fr;
  return {
    fr,
    wF,
    wFr,
    wNeto: wF + wFr,
    ec0,
    ecFinal: Math.max(0, ecFinal),
    vFinal: m > 0 && ecFinal > 0 ? Math.sqrt((2 * ecFinal) / m) : 0,
    seDetiene: ecFinal <= 0,
    distanciaParada: neta < 0 ? ec0 / -neta : Infinity,
  };
}

/** Conservación de la energía en una pista en U con pérdida de energía lineal (fracción 0–1 a lo largo de la pista). */
export function pistaU(m: number, h0: number, s: number, perdida: number) {
  const u = Math.min(1, Math.max(0, s));
  const h = h0 * (2 * u - 1) ** 2;
  const emInicial = energiaPotencial(m, h0);
  const em = emInicial * (1 - Math.min(1, Math.max(0, perdida)) * u);
  const ep = energiaPotencial(m, h);
  const ec = Math.max(0, em - ep);
  const alcanza = em >= ep - 1e-9;
  return { h, ep, ec, em, emInicial, alcanza, v: m > 0 ? Math.sqrt((2 * ec) / m) : 0 };
}

export type Aparato = { id: string; nombre: string; eta: number; entrada: string; util: string; perdida: string };
export const APARATOS: Aparato[] = [
  { id: "incand", nombre: "Bombilla incandescente", eta: 0.05, entrada: "eléctrica", util: "luz", perdida: "calor" },
  { id: "led", nombre: "Bombilla LED", eta: 0.4, entrada: "eléctrica", util: "luz", perdida: "calor" },
  { id: "motor", nombre: "Motor eléctrico", eta: 0.9, entrada: "eléctrica", util: "movimiento", perdida: "calor y ruido" },
  { id: "gasolina", nombre: "Motor de gasolina", eta: 0.25, entrada: "química", util: "movimiento", perdida: "calor" },
  { id: "central", nombre: "Central térmica", eta: 0.4, entrada: "química del combustible", util: "eléctrica", perdida: "calor" },
  { id: "panel", nombre: "Panel solar", eta: 0.2, entrada: "luz solar", util: "eléctrica", perdida: "calor y reflejo" },
];
/** Rendimiento η = útil/total; energía útil y disipada (J). */
export function rendimiento(entrada: number, util: number): number {
  return entrada > 0 ? util / entrada : NaN;
}
/** Energía en kWh a partir de potencia (W) y tiempo (h), y coste con precio (€/kWh). */
export const energiaKWh = (P: number, horas: number): number => (P * horas) / 1000;
export const costeKWh = (kwh: number, precio: number): number => kwh * precio;

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

/* ───────────── 1. Trabajo y potencia ───────────── */

export function TrabajoPotenciaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { F: Math.round(num(block.params?.a, 100, 0, 500)), ang: Math.round(num(block.params?.b, 30, 0, 180)), d: Math.round(num(block.params?.c, 10, 0, 100)), t: 5 };
  const [s, setS] = useState(init);
  const W = trabajo(s.F, s.d, s.ang);
  const P = potencia(W, s.t);
  const th = (s.ang * Math.PI) / 180;
  const len = 30 + s.F * 0.22;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Solo la componente de la fuerza en la dirección del desplazamiento realiza trabajo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza" value={s.F} min={0} max={500} step={10} unit=" N" color={MANIM.green} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Ángulo entre F y el desplazamiento" value={s.ang} min={0} max={180} step={5} unit="°" color={MANIM.orange} onChange={(ang) => setS((o) => ({ ...o, ang }))} />
          <Slider label="Distancia recorrida" value={s.d} min={0} max={100} step={1} unit=" m" color={MANIM.blue} onChange={(d) => setS((o) => ({ ...o, d }))} />
          <Slider label="Tiempo empleado" value={s.t} min={1} max={60} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="trabajo-potencia" maxH={150}>
        <Seg a={[40, 105]} b={[480, 105]} color={MANIM.muted} width={2} />
        <rect x={200} y={65} width={70} height={40} rx={4} fill={MANIM.blue} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={2} />
        <Flecha a={[270, 85]} b={[270 + 80, 85]} color={MANIM.muted} width={2} />
        <text x={360} y={81} fill={MANIM.muted} fontSize={12}>desplazamiento</text>
        <Flecha a={[235, 85]} b={[235 + len * Math.cos(th), 85 - len * Math.sin(th)]} color={MANIM.green} width={4} />
        <text x={235 + len * Math.cos(th) + 8} y={85 - len * Math.sin(th) - 4} fill={MANIM.green} fontSize={13}>F</text>
      </Svg>
      <Readout>
        <Stat color={W < 0 ? MANIM.red : MANIM.yellow} label="Trabajo W = F·d·cos θ">{`${f1(W)} J`}</Stat>
        <Stat color={MANIM.orange} label="Potencia P = W/t">{`${fin(P, f1)} W (${fin(P / CV, f2)} CV)`}</Stat>
        <Stat color={MANIM.blue} label="Componente útil de F">{`${f1(s.F * Math.cos(th))} N`}</Stat>
        <Stat color={MANIM.purple} label="Signo del trabajo">{W > 0.0001 ? "positivo: la fuerza ayuda al movimiento" : W < -0.0001 ? "negativo: la fuerza lo frena" : "nulo"}</Stat>
      </Readout>
      <Note>El <b>trabajo</b> de una fuerza constante es <b>W = F·d·cos θ</b>, con θ el ángulo entre la fuerza y el desplazamiento; se mide en <b>julios</b> (1 J = 1 N·m). Si θ = 0° es <b>máximo y positivo</b>; si θ = 90° <b>no hay trabajo</b> (por eso el peso no hace trabajo al mover algo en horizontal, ni la normal); si θ = 180° es <b>negativo</b> (rozamiento). La <b>potencia</b> es el trabajo por unidad de tiempo: <b>P = W/t</b>, en <b>vatios</b> (1 W = 1 J/s); también <b>P = F·v</b>. 1 CV ≈ 735,5 W y 1 kW·h = 3,6·10⁶ J.</Note>
    </Frame>
  );
}

/* ───────────── 2. Energías cinética y potencial ───────────── */

export function EnergiasFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 2, 0.5, 100)), v: Math.round(num(block.params?.b, 10, 0, 50)), h: Math.round(num(block.params?.c, 20, 0, 100)) };
  const [s, setS] = useState(init);
  const ec = energiaCinetica(s.m, s.v);
  const ep = energiaPotencial(s.m, s.h);
  const tot = Math.max(1, ec + ep);
  const H = 90;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ec = ½·m·v² crece con el cuadrado de la velocidad; Ep = m·g·h crece con la altura."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={0.5} max={100} step={0.5} unit=" kg" color={MANIM.blue} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Velocidad" value={s.v} min={0} max={50} step={1} unit=" m/s" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Altura" value={s.h} min={0} max={100} step={1} unit=" m" color={MANIM.green} onChange={(h) => setS((o) => ({ ...o, h }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="energias" maxH={150}>
        <Seg a={[120, 110]} b={[400, 110]} color={MANIM.ink} width={2} />
        <rect x={150} y={110 - (ec / tot) * H} width={60} height={(ec / tot) * H} fill={MANIM.orange} />
        <rect x={230} y={110 - (ep / tot) * H} width={60} height={(ep / tot) * H} fill={MANIM.green} />
        <rect x={310} y={110 - ((ec + ep) / tot) * H} width={60} height={((ec + ep) / tot) * H} fill={MANIM.yellow} />
        <text x={180} y={124} textAnchor="middle" fill={MANIM.orange} fontSize={12}>Ec</text>
        <text x={260} y={124} textAnchor="middle" fill={MANIM.green} fontSize={12}>Ep</text>
        <text x={340} y={124} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>Em</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Energía cinética ½·m·v²">{`${f0(ec)} J`}</Stat>
        <Stat color={MANIM.green} label="Energía potencial m·g·h">{`${f0(ep)} J`}</Stat>
        <Stat color={MANIM.yellow} label="Energía mecánica Ec + Ep">{`${f0(ec + ep)} J`}</Stat>
        <Stat color={MANIM.purple} label="Velocidad al caer libremente desde esa altura">{`${f1(Math.sqrt(2 * G * s.h))} m/s`}</Stat>
      </Readout>
      <Note>La <b>energía</b> es la capacidad de realizar trabajo; se mide en <b>julios</b>. La <b>energía cinética</b> es la del movimiento: <b>Ec = ½·m·v²</b> (con el <b>doble de velocidad</b>, <b>cuatro veces</b> más). La <b>energía potencial gravitatoria</b> es la que tiene un cuerpo por su altura: <b>Ep = m·g·h</b>, respecto a un nivel de referencia que se elige (h = 0). La suma es la <b>energía mecánica</b> Em = Ec + Ep. La <b>energía potencial elástica</b> de un muelle es ½·k·x².</Note>
    </Frame>
  );
}

/* ───────────── 3. Teorema trabajo-energía ───────────── */

export function TeoremaTrabajoEnergiaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 10, 1, 100)), v0: Math.round(num(block.params?.b, 2, 0, 30)), F: Math.round(num(block.params?.c, 80, 0, 500)), mu: 0.3, d: 10 };
  const [s, setS] = useState(init);
  const r = teoremaTrabajoEnergia(s.m, s.v0, s.F, s.mu, s.d);
  const maxW = Math.max(1, Math.abs(r.wF), Math.abs(r.wFr), r.ec0, r.ecFinal);
  const bar = (x: number, v: number, color: string, label: string) => {
    const h = (Math.abs(v) / maxW) * 70;
    return (
      <g key={label}>
        <rect x={x} y={v >= 0 ? 85 - h : 85} width={50} height={h} fill={color} />
        <text x={x + 25} y={120} textAnchor="middle" fill={color} fontSize={11}>{label}</text>
      </g>
    );
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "El trabajo neto de todas las fuerzas es igual a la variación de energía cinética."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={1} max={100} step={1} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Velocidad inicial" value={s.v0} min={0} max={30} step={1} unit=" m/s" color={MANIM.orange} onChange={(v0) => setS((o) => ({ ...o, v0 }))} />
          <Slider label="Fuerza horizontal aplicada" value={s.F} min={0} max={500} step={10} unit=" N" color={MANIM.green} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Coeficiente de rozamiento μ" value={s.mu} min={0} max={1} step={0.05} color={MANIM.red} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
          <Slider label="Distancia recorrida" value={s.d} min={1} max={100} step={1} unit=" m" color={MANIM.purple} onChange={(d) => setS((o) => ({ ...o, d }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="trabajo-energia" maxH={150}>
        <Seg a={[90, 85]} b={[440, 85]} color={MANIM.ink} width={1.5} />
        {bar(110, r.ec0, MANIM.orange, "Ec inicial")}
        {bar(180, r.wF, MANIM.green, "W fuerza")}
        {bar(250, r.wFr, MANIM.red, "W rozam.")}
        {bar(320, r.wNeto, MANIM.yellow, "W neto")}
        {bar(390, r.ecFinal, MANIM.purple, "Ec final")}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Trabajo neto = ΔEc">{`${f0(r.wNeto)} J`}</Stat>
        <Stat color={MANIM.green} label="W de F · W del rozamiento">{`${f0(r.wF)} J · ${f0(r.wFr)} J`}</Stat>
        <Stat color={MANIM.purple} label="Energía cinética final">{`${f0(r.ecFinal)} J`}</Stat>
        <Stat color={r.seDetiene ? MANIM.red : MANIM.blue} label="Velocidad final">{r.seDetiene ? `se detiene antes (a ${fin(r.distanciaParada, f1)} m)` : `${f2(r.vFinal)} m/s`}</Stat>
      </Readout>
      <Note>El <b>teorema del trabajo y la energía cinética</b>: el <b>trabajo neto</b> de todas las fuerzas que actúan sobre un cuerpo es igual a la <b>variación de su energía cinética</b>: <b>W_neto = Ec_final − Ec_inicial</b>. Si W_neto &gt; 0, el cuerpo <b>gana velocidad</b>; si &lt; 0, la pierde. Aquí actúan la fuerza aplicada (W = F·d) y el rozamiento (W = −μ·m·g·d, negativo); el peso y la normal no hacen trabajo en horizontal. Permite hallar velocidades <b>sin calcular tiempos ni aceleraciones</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Conservación de la energía mecánica ───────────── */

export function ConservacionEnergiaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 2, 0.5, 100)), h0: Math.round(num(block.params?.b, 10, 1, 50)), s: 0.25, perdida: num(block.params?.c, 0, 0, 1) };
  const [s, setS] = useState(init);
  const r = pistaU(s.m, s.h0, s.s, s.perdida);
  const X = (u: number): number => 60 + u * 280;
  const Y = (h: number): number => 140 - (h / s.h0) * 110;
  const pts = Array.from({ length: 41 }, (_, k) => `${X(k / 40)},${Y(s.h0 * (2 * (k / 40) - 1) ** 2)}`).join(" ");
  const E = Math.max(1, r.emInicial);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sin rozamiento, la energía mecánica se conserva: lo que pierde la potencial lo gana la cinética."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura de partida" value={s.h0} min={1} max={50} step={1} unit=" m" color={MANIM.green} onChange={(h0) => setS((o) => ({ ...o, h0 }))} />
          <Slider label="Masa" value={s.m} min={0.5} max={100} step={0.5} unit=" kg" color={MANIM.blue} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Posición en la pista" value={s.s} min={0} max={1} step={0.05} color={MANIM.purple} format={f2} onChange={(sv) => setS((o) => ({ ...o, s: sv }))} />
          <Slider label="Energía perdida por rozamiento al final" value={s.perdida} min={0} max={0.9} step={0.05} color={MANIM.red} format={(v) => `${f0(v * 100)} %`} onChange={(perdida) => setS((o) => ({ ...o, perdida }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="conservacion" maxH={180}>
        <polyline points={pts} fill="none" stroke={MANIM.muted} strokeWidth={4} />
        <Dot p={[X(s.s), Y(r.h) - 10]} r={9} color={r.alcanza ? MANIM.orange : MANIM.red} />
        <rect x={380} y={140 - (r.ec / E) * 110} width={26} height={(r.ec / E) * 110} fill={MANIM.orange} />
        <rect x={412} y={140 - (r.ep / E) * 110} width={26} height={(r.ep / E) * 110} fill={MANIM.green} />
        <rect x={444} y={140 - (r.em / E) * 110} width={26} height={(r.em / E) * 110} fill={MANIM.yellow} />
        <text x={393} y={154} textAnchor="middle" fill={MANIM.orange} fontSize={11}>Ec</text>
        <text x={425} y={154} textAnchor="middle" fill={MANIM.green} fontSize={11}>Ep</text>
        <text x={457} y={154} textAnchor="middle" fill={MANIM.yellow} fontSize={11}>Em</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Energía potencial">{`${f0(r.ep)} J (h = ${f1(r.h)} m)`}</Stat>
        <Stat color={MANIM.orange} label="Energía cinética">{`${f0(r.ec)} J`}</Stat>
        <Stat color={MANIM.yellow} label="Energía mecánica">{`${f0(r.em)} J ${s.perdida === 0 ? "(constante)" : `(se han disipado ${f0(r.emInicial - r.em)} J en forma de calor)`}`}</Stat>
        <Stat color={MANIM.blue} label="Velocidad en este punto">{`${f2(r.v)} m/s`}</Stat>
      </Readout>
      <Note>Si solo actúan <b>fuerzas conservativas</b> (como el peso o la elástica) y las demás no hacen trabajo, la <b>energía mecánica se conserva</b>: <b>Ec + Ep = constante</b>. Al bajar, la energía potencial se transforma en cinética y al subir, al revés; de ahí que v = √(2·g·Δh) <b>no dependa de la masa ni de la forma de la pista</b>. Con <b>rozamiento</b> (fuerza no conservativa), parte de la energía se <b>disipa en calor</b>: la energía mecánica disminuye, pero la <b>energía total se conserva</b>. Con rozamiento, el móvil no alcanza la altura inicial.</Note>
    </Frame>
  );
}

/* ───────────── 5. Rendimiento ───────────── */

export function RendimientoFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, APARATOS.length - 1)), P: Math.round(num(block.params?.a, 60, 5, 2000)), h: Math.round(num(block.params?.b, 5, 1, 24)), precio: 0.15 };
  const [s, setS] = useState(init);
  const ap = APARATOS[s.i]!;
  const E = energiaKWh(s.P, s.h);
  const util = E * ap.eta;
  const w = 380;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El rendimiento es la fracción de la energía consumida que se aprovecha."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Aparato" items={APARATOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.i)} onChange={(k) => setS((o) => ({ ...o, i: Number(k) }))} />
          <Slider label="Potencia consumida" value={s.P} min={5} max={2000} step={5} unit=" W" color={MANIM.blue} onChange={(P) => setS((o) => ({ ...o, P }))} />
          <Slider label="Tiempo de uso al día" value={s.h} min={1} max={24} step={1} unit=" h" color={MANIM.orange} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Slider label="Precio de la electricidad" value={s.precio} min={0.05} max={0.5} step={0.01} unit=" €/kWh" color={MANIM.green} format={f2} onChange={(precio) => setS((o) => ({ ...o, precio }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="rendimiento" maxH={110}>
        <rect x={70} y={30} width={w * ap.eta} height={30} fill={MANIM.green} />
        <rect x={70 + w * ap.eta} y={30} width={w * (1 - ap.eta)} height={30} fill={MANIM.red} fillOpacity={0.75} />
        <text x={70} y={22} fill={MANIM.green} fontSize={12}>{`útil (${ap.util}) ${f0(ap.eta * 100)} %`}</text>
        <text x={70 + w} y={80} textAnchor="end" fill={MANIM.red} fontSize={12}>{`perdida (${ap.perdida}) ${f0((1 - ap.eta) * 100)} %`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Rendimiento η = útil/total">{`${f0(ap.eta * 100)} %`}</Stat>
        <Stat color={MANIM.blue} label="Energía consumida en un día">{`${f2(E)} kWh (${fmtEs(E * 3.6e6, 0)} J)`}</Stat>
        <Stat color={MANIM.green} label="Energía aprovechada">{`${f2(util)} kWh`}</Stat>
        <Stat color={MANIM.red} label="Energía disipada">{`${f2(E - util)} kWh`}</Stat>
        <Stat color={MANIM.purple} label="Coste al día · al mes (30 días)">{`${f2(costeKWh(E, s.precio))} € · ${f2(costeKWh(E, s.precio) * 30)} €`}</Stat>
      </Readout>
      <Note>El <b>rendimiento</b> es el cociente entre la energía <b>útil</b> y la <b>total</b> consumida: <b>η = E_útil/E_total</b> (se da en % y siempre es <b>menor que 100 %</b>). La energía no aprovechada no desaparece: se <b>disipa</b>, sobre todo en forma de calor. Cambiar una bombilla incandescente por una LED consume mucho menos para la misma luz. La energía eléctrica se factura en <b>kWh</b> (1 kWh = 3,6·10⁶ J). Los rendimientos y el precio son valores aproximados de referencia.</Note>
    </Frame>
  );
}
