"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const CONDUCTORES = [
  { n: "Cobre", rho: 0.0172 },
  { n: "Aluminio", rho: 0.0282 },
  { n: "Hierro", rho: 0.1 },
  { n: "Constantán (aleación)", rho: 0.49 },
] as const;

/** Resistencia (Ω) de un conductor de resistividad `rho` (Ω·mm²/m), longitud `L` (m) y sección `S` (mm²). */
export const resistenciaConductor = (rho: number, L: number, S: number) => (S > 0 ? (rho * L) / S : Infinity);

export const COLORES = [
  { n: "Negro", v: 0, c: "#1a1a1a" },
  { n: "Marrón", v: 1, c: "#8b4513" },
  { n: "Rojo", v: 2, c: "#e02020" },
  { n: "Naranja", v: 3, c: "#ff8c00" },
  { n: "Amarillo", v: 4, c: "#f2d21b" },
  { n: "Verde", v: 5, c: "#2e9d3d" },
  { n: "Azul", v: 6, c: "#2a5fd1" },
  { n: "Violeta", v: 7, c: "#8a2be2" },
  { n: "Gris", v: 8, c: "#8c8c8c" },
  { n: "Blanco", v: 9, c: "#f5f5f5" },
] as const;
export const TOLERANCIAS = [
  { n: "Oro", t: 5, c: "#d4af37" },
  { n: "Plata", t: 10, c: "#c0c0c0" },
  { n: "Marrón", t: 1, c: "#8b4513" },
  { n: "Rojo", t: 2, c: "#e02020" },
] as const;

/** Valor (Ω) de una resistencia de cuatro bandas: dos cifras y un multiplicador (potencia de 10). */
export const valorResistencia = (d1: number, d2: number, mult: number) => (d1 * 10 + d2) * 10 ** mult;

export function formatoOhm(r: number) {
  if (r >= 1e6) return `${fmtEs(r / 1e6, 2)} MΩ`;
  if (r >= 1e3) return `${fmtEs(r / 1e3, 2)} kΩ`;
  return `${fmtEs(r, 0)} Ω`;
}

const E12 = [10, 12, 15, 18, 22, 27, 33, 39, 47, 56, 68, 82] as const;
/** Menor valor normalizado de la serie E12 que es mayor o igual que `r` (para no pasarse de corriente). */
export function e12Superior(r: number) {
  if (!(r > 0)) return 10;
  const dec = Math.floor(Math.log10(r)) - 1;
  const base = 10 ** dec;
  for (const v of E12) if (v * base >= r - 1e-9) return v * base;
  return 10 * 10 * base;
}

export const LEDS = [
  { n: "Rojo", vf: 2.0 },
  { n: "Amarillo", vf: 2.1 },
  { n: "Verde", vf: 2.2 },
  { n: "Azul", vf: 3.0 },
  { n: "Blanco", vf: 3.0 },
] as const;

/** Resistencia (Ω) en serie con un LED de tensión directa `vf` alimentado a `v` para una corriente de `iMa` mA. */
export const resistenciaLed = (v: number, vf: number, iMa: number) => (v > vf && iMa > 0 ? (v - vf) / (iMa / 1000) : NaN);

/** Transistor NPN como interruptor: corriente de base, corriente máxima de colector y si satura con la carga dada. */
export function transistor(vin: number, rb: number, icCargaMa: number, beta = 100) {
  const ib = Math.max(0, (vin - 0.7) / rb);
  const icMax = beta * ib * 1000;
  return { ibMa: ib * 1000, icMaxMa: icMax, satura: icMax >= icCargaMa, icRealMa: Math.min(icMax, icCargaMa) };
}

export const divisor = (vin: number, rFija: number, rSensor: number) => (vin * rSensor) / (rFija + rSensor);
/** Resistencia orientativa (Ω) de una LDR según la iluminación en lux (10 kΩ a 100 lux). */
export const ldrOhm = (lux: number) => 10000 * (100 / Math.max(1, lux)) ** 0.9;
/** Resistencia (Ω) de una NTC de 10 kΩ a 25 °C (β = 3950) según la temperatura en °C. */
export const ntcOhm = (tC: number) => 10000 * Math.exp(3950 * (1 / (tC + 273.15) - 1 / 298.15));

/** Constante de tiempo (ms) con R en kΩ y C en µF. */
export const tauMs = (rK: number, cUf: number) => rK * cUf;
export const vCondensador = (vs: number, tau: number, t: number) => (tau > 0 ? vs * (1 - Math.exp(-t / tau)) : vs);

/** Dos patillas están en el mismo nodo de una protoboard si comparten columna y mitad (A–E o F–J). */
export const mismoNodo = (c1: number, h1: number, c2: number, h2: number) => c1 === c2 && h1 === h2;

export const comparador = (vin: number, vref: number) => vin > vref;

/** Luz automática: LDR y potenciómetro forman un divisor; el transistor conduce con 0,7 V en la base. */
export function luzAutomatica(lux: number, rPot: number, vcc = 5) {
  const rldr = ldrOhm(lux);
  const vb = divisor(vcc, rPot, rldr);
  return { rldr, vb, encendida: vb >= 0.7 };
}
/** Iluminación (lux) por debajo de la cual se enciende la luz con un potenciómetro de `rPot` ohmios. */
export const luxUmbral = (rPot: number, vcc = 5) => {
  const k = (0.7 / (vcc - 0.7)) * rPot;
  return 100 / (k / 10000) ** (1 / 0.9);
};

/* ───────────── 1. Resistencia de un conductor ───────────── */

export function ConductorExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, CONDUCTORES.length - 1)), L: Math.round(num(block.params?.a, 20, 1, 100)), S: Math.round(num(block.params?.b, 1, 0.5, 6) * 2) / 2 };
  const [s, setS] = useState(init);
  const C = CONDUCTORES[s.m]!;
  const R = resistenciaConductor(C.rho, s.L, s.S);
  const grosor = 6 + s.S * 5;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el material, la longitud y la sección de un cable. Un cable más largo o más fino resiste más el paso de la corriente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={CONDUCTORES.map((c, value) => ({ value, label: c.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Longitud" value={s.L} min={1} max={100} step={1} unit=" m" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Sección" value={s.S} min={0.5} max={6} step={0.5} unit=" mm²" color={MANIM.orange} format={(v) => fmtEs(v, 1)} onChange={(S) => setS((x) => ({ ...x, S }))} />
        </>
      }
    >
      <Svg w={520} h={70} testId="conductor" maxH={80}>
        <rect x={20 + (100 - s.L) * 1.2} y={35 - grosor / 2} width={Math.max(30, s.L * 4.2)} height={grosor} rx={grosor / 2} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={2} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Resistividad ρ">{fmtEs(C.rho, 4)} Ω·mm²/m</Stat>
        <Stat color={MANIM.green} label="R = ρ · L / S">{R < 1 ? f2(R) : f1(R)} Ω</Stat>
      </Readout>
      <Note>La resistencia de un conductor crece con su longitud y su resistividad, y disminuye con su sección. Por eso los cables largos o delgados se calientan más y pierden más tensión. Los materiales con resistividad alta (constantán) sirven para fabricar resistencias.</Note>
    </Frame>
  );
}

/* ───────────── 2. Código de colores ───────────── */

export function CodigoColoresExplorador({ block }: { block: ToolBlock }) {
  const init = { d1: Math.round(num(block.params?.a, 4, 1, 9)), d2: Math.round(num(block.params?.b, 7, 0, 9)), m: 2, t: 0 };
  const [s, setS] = useState(init);
  const R = valorResistencia(s.d1, s.d2, s.m);
  const T = TOLERANCIAS[s.t]!;
  const MULT = COLORES.slice(0, 7);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el color de cada banda y lee el valor de la resistencia: dos cifras, un multiplicador y la tolerancia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Banda 1 (primera cifra)" items={COLORES.slice(1).map((c) => ({ value: c.v, label: c.n }))} value={s.d1} onChange={(d1) => setS((x) => ({ ...x, d1 }))} />
          <Choice label="Banda 2 (segunda cifra)" items={COLORES.map((c) => ({ value: c.v, label: c.n }))} value={s.d2} onChange={(d2) => setS((x) => ({ ...x, d2 }))} />
          <Choice label="Banda 3 (multiplicador ×10ⁿ)" items={MULT.map((c) => ({ value: c.v, label: c.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Choice label="Banda 4 (tolerancia)" items={TOLERANCIAS.map((c, value) => ({ value, label: `${c.n} (${c.t} %)` }))} value={s.t} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="codigo-colores" maxH={100}>
        <line x1={20} y1={45} x2={500} y2={45} stroke={MANIM.muted} strokeWidth={4} />
        <rect x={120} y={18} width={280} height={54} rx={22} fill="#d9b88a" stroke="#a37c4b" strokeWidth={2} />
        {[
          [160, COLORES[s.d1]!.c],
          [210, COLORES[s.d2]!.c],
          [260, COLORES[s.m]!.c],
          [350, T.c],
        ].map(([x, c], i) => (
          <rect key={i} x={x as number} y={18} width={20} height={54} fill={c as string} stroke="#00000055" strokeWidth={1} />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Valor">{formatoOhm(R)}</Stat>
        <Stat color={MANIM.yellow} label={`Tolerancia ±${T.t} %`}>
          {formatoOhm(R * (1 - T.t / 100))} a {formatoOhm(R * (1 + T.t / 100))}
        </Stat>
      </Readout>
      <Note>Las dos primeras bandas dan las cifras, la tercera es el factor por el que se multiplica (marrón ×10, rojo ×100, naranja ×1 000…) y la cuarta indica el margen de error (oro 5 %, plata 10 %). Se lee empezando por el lado opuesto a la banda de tolerancia.</Note>
    </Frame>
  );
}

/* ───────────── 3. LED y su resistencia ───────────── */

export function LedResistenciaExplorador({ block }: { block: ToolBlock }) {
  const init = { led: Math.round(num(block.params?.n, 0, 0, LEDS.length - 1)), v: Math.round(num(block.params?.a, 9, 3, 12)), i: Math.round(num(block.params?.b, 10, 5, 20)) };
  const [s, setS] = useState(init);
  const L = LEDS[s.led]!;
  const R = resistenciaLed(s.v, L.vf, s.i);
  const ok = !Number.isNaN(R);
  const Rn = ok ? e12Superior(R) : 0;
  const iReal = ok ? ((s.v - L.vf) / Rn) * 1000 : 0;
  const pR = ok ? ((s.v - L.vf) ** 2 / Rn) * 1000 : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un LED necesita una resistencia en serie que limite su corriente. Elige el color, la pila y la corriente y calcula su valor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Color del LED" items={LEDS.map((l, value) => ({ value, label: `${l.n} (${fmtEs(l.vf, 1)} V)` }))} value={s.led} onChange={(led) => setS((x) => ({ ...x, led }))} />
          <Slider label="Tensión de alimentación" value={s.v} min={3} max={12} step={1} unit=" V" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Corriente deseada" value={s.i} min={5} max={20} step={1} unit=" mA" color={MANIM.orange} onChange={(i) => setS((x) => ({ ...x, i }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Tensión sobrante (V − Vf)">{ok ? `${f1(s.v - L.vf)} V` : "—"}</Stat>
        <Stat color={MANIM.yellow} label="R = (V − Vf) / I">{ok ? formatoOhm(R) : "El LED no se enciende"}</Stat>
        <Stat color={MANIM.green} label="Valor normalizado (E12)">{ok ? formatoOhm(Rn) : "—"}</Stat>
        <Stat color={MANIM.orange} label="Corriente real">{ok ? `${f1(iReal)} mA` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Potencia en la resistencia">{ok ? `${fmtEs(pR, 0)} mW` : "—"}</Stat>
      </Readout>
      <Note>{ok ? "Sin la resistencia, el LED recibiría una corriente enorme y se fundiría. Se elige el valor normalizado inmediatamente superior para que la corriente sea algo menor y no sobrepase la prevista." : "La tensión de alimentación debe ser mayor que la tensión directa del LED (Vf) para que conduzca."}</Note>
    </Frame>
  );
}

/* ───────────── 4. Transistor como interruptor ───────────── */

export function TransistorLlaveExplorador({ block }: { block: ToolBlock }) {
  const RB = [1000, 4700, 10000, 47000, 100000, 470000];
  const init = { vin: Math.round(num(block.params?.a, 5, 0, 9)), ri: 2, ic: Math.round(num(block.params?.b, 200, 20, 500) / 10) * 10 };
  const [s, setS] = useState(init);
  const t = transistor(s.vin, RB[s.ri]!, s.ic);
  const estado = s.vin < 0.7 ? "Corte (apagado)" : t.satura ? "Saturación (encendido)" : "Zona activa (carga a medias)";
  const col = s.vin < 0.7 ? MANIM.muted : t.satura ? MANIM.green : MANIM.yellow;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una pequeña corriente de base controla una corriente de colector β veces mayor. Si es suficiente para la carga, el transistor «cierra el interruptor»."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de entrada en la base" value={s.vin} min={0} max={9} step={0.5} unit=" V" color={MANIM.blue} format={(v) => fmtEs(v, 1)} onChange={(vin) => setS((x) => ({ ...x, vin }))} />
          <Slider label="Resistencia de base" value={s.ri} min={0} max={5} step={1} color={MANIM.orange} format={(v) => formatoOhm(RB[v]!)} onChange={(ri) => setS((x) => ({ ...x, ri }))} />
          <Slider label="Corriente que pide la carga" value={s.ic} min={20} max={500} step={10} unit=" mA" color={MANIM.green} onChange={(ic) => setS((x) => ({ ...x, ic }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Corriente de base">{f2(t.ibMa)} mA</Stat>
        <Stat color={MANIM.orange} label="Colector máxima (β = 100)">{f1(t.icMaxMa)} mA</Stat>
        <Stat color={MANIM.green} label="Corriente real en la carga">{f1(t.icRealMa)} mA</Stat>
        <Stat color={col} label="Estado">{estado}</Stat>
      </Readout>
      <Note>El transistor es un interruptor controlado por electricidad. Necesita unos 0,7 V en la base para empezar a conducir; la resistencia de base limita la corriente. Para que sature hace falta que β · I_base sea al menos la corriente que pide la carga.</Note>
    </Frame>
  );
}

/* ───────────── 5. Sensores analógicos y divisor de tensión ───────────── */

export function SensorDivisorExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: Math.round(num(block.params?.n, 0, 0, 1)), lux: Math.round(num(block.params?.a, 100, 1, 1000)), t: 25, rf: 10 };
  const [s, setS] = useState(init);
  const R = s.tipo === 0 ? ldrOhm(s.lux) : ntcOhm(s.t);
  const vout = divisor(5, s.rf * 1000, R);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un sensor cambia su resistencia con la luz (LDR) o la temperatura (NTC). Con una resistencia fija forma un divisor de tensión que la convierte en una señal eléctrica."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sensor" items={[{ value: 0, label: "LDR (luz)" }, { value: 1, label: "NTC (temperatura)" }]} value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} />
          {s.tipo === 0 ? <Slider label="Iluminación" value={s.lux} min={1} max={1000} step={1} unit=" lux" color={MANIM.yellow} onChange={(lux) => setS((x) => ({ ...x, lux }))} /> : <Slider label="Temperatura" value={s.t} min={0} max={100} step={1} unit=" °C" color={MANIM.red} onChange={(t) => setS((x) => ({ ...x, t }))} />}
          <Slider label="Resistencia fija" value={s.rf} min={1} max={100} step={1} unit=" kΩ" color={MANIM.blue} onChange={(rf) => setS((x) => ({ ...x, rf }))} />
        </>
      }
    >
      <Svg w={520} h={50} testId="divisor-sensor" maxH={60}>
        <rect x={20} y={12} width={480} height={26} rx={6} fill="none" stroke={MANIM.muted} strokeWidth={2} />
        <rect x={20} y={12} width={(vout / 5) * 480} height={26} rx={6} fill={MANIM.green} fillOpacity={0.55} />
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label={s.tipo === 0 ? "Resistencia de la LDR (orient.)" : "Resistencia de la NTC (orient.)"}>{formatoOhm(R)}</Stat>
        <Stat color={MANIM.green} label="Vout = Vin · R_sensor / (R_fija + R_sensor)">{f2(vout)} V</Stat>
      </Readout>
      <Note>{s.tipo === 0 ? "Con más luz la LDR baja su resistencia y la tensión de salida disminuye. " : "En una NTC, al subir la temperatura baja la resistencia. "}El circuito microcontrolador o comparador lee esa tensión (de 0 a 5 V) para saber cuánta luz o calor hay. Los valores son orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 6. Carga de un condensador ───────────── */

export function CondensadorRcExplorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.a, 10, 1, 100)), c: Math.round(num(block.params?.b, 100, 1, 1000)), t: 200 };
  const [s, setS] = useState(init);
  const tau = tauMs(s.r, s.c);
  const v = vCondensador(5, tau, s.t);
  const tmax = Math.max(s.t, 5 * tau);
  const pts: string[] = [];
  for (let i = 0; i <= 60; i += 1) {
    const t = (i / 60) * tmax;
    pts.push(`${40 + (t / tmax) * 440},${150 - (vCondensador(5, tau, t) / 5) * 120}`);
  }
  return (
    <Frame
      stacked
      hint={block.hint ?? "El condensador se carga poco a poco. La constante de tiempo τ = R · C indica lo rápido que lo hace: en 5τ está casi cargado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Resistencia" value={s.r} min={1} max={100} step={1} unit=" kΩ" color={MANIM.orange} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Capacidad" value={s.c} min={1} max={1000} step={1} unit=" µF" color={MANIM.blue} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Tiempo transcurrido" value={s.t} min={0} max={5000} step={10} unit=" ms" color={MANIM.green} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="rc" maxH={180}>
        <line x1={40} y1={150} x2={490} y2={150} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={20} x2={40} y2={150} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={30} x2={490} y2={30} stroke={MANIM.green} strokeWidth={1} strokeDasharray="4 4" />
        <polyline points={pts.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <circle cx={40 + Math.min(1, s.t / tmax) * 440} cy={150 - (v / 5) * 120} r={6} fill={MANIM.yellow} />
        <text x={490} y={166} fill={MANIM.muted} fontSize={11} textAnchor="end">
          tiempo
        </text>
        <text x={46} y={24} fill={MANIM.green} fontSize={11}>
          5 V
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Constante de tiempo τ = R · C">{fmtEs(tau, 0)} ms</Stat>
        <Stat color={MANIM.blue} label="Tensión del condensador">{f2(v)} V</Stat>
        <Stat color={MANIM.green} label="Carga alcanzada">{fmtEs((v / 5) * 100, 0)} %</Stat>
      </Readout>
      <Note>Tras un tiempo τ el condensador alcanza el 63 % de la tensión de la pila; tras 5τ, más del 99 %. Los condensadores sirven para temporizar, filtrar señales y guardar energía durante un instante.</Note>
    </Frame>
  );
}

/* ───────────── 7. Protoboard ───────────── */

export function ProtoboardExplorador({ block }: { block: ToolBlock }) {
  const init = { cR: 4, hR: 0, cL: Math.round(num(block.params?.a, 4, 1, 10)), hL: Math.round(num(block.params?.n, 0, 0, 1)) };
  const [s, setS] = useState(init);
  const ok = mismoNodo(s.cR, s.hR, s.cL, s.hL);
  const X = (c: number) => 60 + (c - 1) * 40;
  const Y = (h: number, r: number) => (h === 0 ? 45 : 142) + r * 18;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una protoboard, los 5 agujeros de cada columna (A–E o F–J) están unidos por dentro. Mueve las patillas y comprueba si la resistencia y el LED quedan en serie."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Columna de la 2.ª patilla de la resistencia" value={s.cR} min={1} max={10} step={1} color={MANIM.orange} onChange={(cR) => setS((x) => ({ ...x, cR }))} />
          <Slider label="Columna del ánodo del LED" value={s.cL} min={1} max={10} step={1} color={MANIM.green} onChange={(cL) => setS((x) => ({ ...x, cL }))} />
          <Choice label="Mitad del LED" items={[{ value: 0, label: "A–E (arriba)" }, { value: 1, label: "F–J (abajo)" }]} value={s.hL} onChange={(hL) => setS((x) => ({ ...x, hL }))} />
          <Choice label="Mitad de la resistencia" items={[{ value: 0, label: "A–E (arriba)" }, { value: 1, label: "F–J (abajo)" }]} value={s.hR} onChange={(hR) => setS((x) => ({ ...x, hR }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="protoboard" maxH={250}>
        <rect x={30} y={30} width={460} height={190} rx={8} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={30} y1={125} x2={490} y2={125} stroke={MANIM.muted} strokeWidth={6} />
        {Array.from({ length: 10 }, (_, i) => i + 1).flatMap((c) =>
          [0, 1].flatMap((h) =>
            Array.from({ length: 5 }, (_, r) => {
              const activo = (c === s.cR && h === s.hR) || (c === s.cL && h === s.hL);
              return <circle key={`${c}-${h}-${r}`} cx={X(c)} cy={Y(h, r)} r={activo ? 6 : 4} fill={activo ? (c === s.cR && h === s.hR ? MANIM.orange : MANIM.green) : MANIM.muted} fillOpacity={activo ? 0.9 : 0.5} />;
            }),
          ),
        )}
        {ok ? <rect x={X(s.cR) - 8} y={s.hR === 0 ? 36 : 133} width={16} height={92} rx={8} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={2} /> : null}
      </Svg>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Resistencia y LED">{ok ? "En el mismo nodo: en serie, el circuito conduce" : "En nodos distintos: el circuito está abierto"}</Stat>
      </Readout>
      <Note>Las columnas de 5 agujeros están conectadas entre sí por dentro, pero las dos mitades (A–E y F–J) están separadas por la canal central: ahí se colocan los circuitos integrados. Para unir dos componentes en serie hay que poner sus patillas en la misma columna.</Note>
    </Frame>
  );
}

/* ───────────── 8. Comparador ───────────── */

export function ComparadorExplorador({ block }: { block: ToolBlock }) {
  const init = { vin: Math.round(num(block.params?.a, 2, 0, 5) * 10) / 10, vref: Math.round(num(block.params?.b, 2.5, 0, 5) * 10) / 10, inv: 0 };
  const [s, setS] = useState(init);
  const alta = comparador(s.vin, s.vref) !== (s.inv === 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un comparador compara dos tensiones y da una salida alta o baja. Cambia la señal y la referencia, y prueba el modo inversor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Señal del sensor (Vin)" value={s.vin} min={0} max={5} step={0.1} unit=" V" color={MANIM.blue} format={(v) => fmtEs(v, 1)} onChange={(vin) => setS((x) => ({ ...x, vin }))} />
          <Slider label="Referencia (Vref)" value={s.vref} min={0} max={5} step={0.1} unit=" V" color={MANIM.orange} format={(v) => fmtEs(v, 1)} onChange={(vref) => setS((x) => ({ ...x, vref }))} />
          <Choice label="Modo" items={[{ value: 0, label: "Normal (Vin > Vref → alta)" }, { value: 1, label: "Inversor (Vin > Vref → baja)" }]} value={s.inv} onChange={(inv) => setS((x) => ({ ...x, inv }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="comparador" maxH={100}>
        <circle cx={260} cy={45} r={30} fill={alta ? MANIM.yellow : MANIM.surface} fillOpacity={alta ? 0.6 : 1} stroke={alta ? MANIM.yellow : MANIM.muted} strokeWidth={4} />
        <text x={260} y={50} fill={MANIM.ink} fontSize={14} textAnchor="middle">
          LED
        </text>
        <text x={310} y={50} fill={alta ? MANIM.yellow : MANIM.muted} fontSize={16} fontWeight={700}>
          {alta ? "encendido" : "apagado"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Vin">{f1(s.vin)} V</Stat>
        <Stat color={MANIM.orange} label="Vref">{f1(s.vref)} V</Stat>
        <Stat color={alta ? MANIM.green : MANIM.muted} label="Salida">{alta ? "Alta (5 V)" : "Baja (0 V)"}</Stat>
      </Readout>
      <Note>El comparador convierte una señal analógica (cualquier valor entre 0 y 5 V) en una señal digital (solo alta o baja). Es la base de termostatos, alarmas de luz y detectores de nivel.</Note>
    </Frame>
  );
}

/* ───────────── 9. Proyecto: luz automática ───────────── */

export function LuzAutomaticaExplorador({ block }: { block: ToolBlock }) {
  const init = { lux: Math.round(num(block.params?.a, 300, 1, 1000)), rp: Math.round(num(block.params?.b, 47, 1, 200)) };
  const [s, setS] = useState(init);
  const r = luzAutomatica(s.lux, s.rp * 1000);
  const umbral = luxUmbral(s.rp * 1000);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ajusta el potenciómetro para que la luz se encienda al anochecer. Un valor alto la enciende solo con muy poca luz."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Luz ambiente" value={s.lux} min={1} max={1000} step={1} unit=" lux" color={MANIM.yellow} onChange={(lux) => setS((x) => ({ ...x, lux }))} />
          <Slider label="Potenciómetro (sensibilidad)" value={s.rp} min={1} max={200} step={1} unit=" kΩ" color={MANIM.blue} onChange={(rp) => setS((x) => ({ ...x, rp }))} />
        </>
      }
    >
      <Svg w={520} h={90} testId="luz-auto" maxH={100}>
        <circle cx={150} cy={45} r={30} fill={r.encendida ? MANIM.yellow : MANIM.surface} fillOpacity={r.encendida ? 0.6 : 1} stroke={r.encendida ? MANIM.yellow : MANIM.muted} strokeWidth={4} />
        <text x={150} y={50} fill={MANIM.ink} fontSize={14} textAnchor="middle">
          LED
        </text>
        <text x={210} y={50} fill={r.encendida ? MANIM.yellow : MANIM.muted} fontSize={18} fontWeight={700}>
          {r.encendida ? "Luz encendida (es de noche)" : "Luz apagada (hay luz)"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Resistencia de la LDR">{formatoOhm(r.rldr)}</Stat>
        <Stat color={MANIM.blue} label="Tensión en la base">{f2(r.vb)} V</Stat>
        <Stat color={MANIM.green} label="Se enciende por debajo de">{fmtEs(umbral, 0)} lux</Stat>
      </Readout>
      <Note>La LDR y el potenciómetro forman un divisor de tensión que alimenta la base del transistor. Cuando oscurece, la LDR aumenta su resistencia, sube la tensión de base, el transistor satura y enciende el LED. El potenciómetro ajusta a qué nivel de luz ocurre. Los valores son orientativos.</Note>
    </Frame>
  );
}
