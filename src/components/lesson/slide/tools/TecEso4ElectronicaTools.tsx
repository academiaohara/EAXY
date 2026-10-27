"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Valor eficaz de una tensión senoidal a partir de su valor de pico. */
export const valorEficaz = (vp: number) => vp / Math.SQRT2;
export const periodo = (f: number) => (f > 0 ? 1 / f : Infinity);

/** Potencia (W): P = V·I. Con la resistencia, P = V²/R. */
export const potenciaVI = (v: number, i: number) => v * i;
export const potenciaVR = (v: number, r: number) => (r > 0 ? (v * v) / r : 0);

/** Resistencia equivalente de R1 en serie con (R2 ∥ R3). */
export const paraleloR = (a: number, b: number) => (a + b > 0 ? (a * b) / (a + b) : 0);
export function mixtoR1R2R3(v: number, r1: number, r2: number, r3: number) {
  const rp = paraleloR(r2, r3);
  const req = r1 + rp;
  const i = req > 0 ? v / req : 0;
  const v1 = i * r1;
  const vp = i * rp;
  return { req, i, v1, vp, i2: r2 > 0 ? vp / r2 : 0, i3: r3 > 0 ? vp / r3 : 0 };
}

/** Tensión del secundario de un transformador ideal. */
export const tensionSecundario = (vPrim: number, nPrim: number, nSec: number) => (nPrim > 0 ? (vPrim * nSec) / nPrim : 0);
/** Rizado (V) en un rectificador de onda completa con condensador: ΔV = I / (2·f·C). */
export const rizado = (iA: number, fRed: number, cF: number) => (fRed > 0 && cF > 0 ? iA / (2 * fRed * cF) : Infinity);

/** Resistencia de base (Ω) para saturar un transistor: Ib = k·Ic/β y RB = (Vin − 0,7)/Ib. */
export function resistenciaBase(vin: number, ic: number, beta: number, k = 5) {
  const ib = beta > 0 ? (k * ic) / beta : 0;
  return ib > 0 && vin > 0.7 ? (vin - 0.7) / ib : Infinity;
}

/** Temporizador 555 en modo astable. */
export const frecuencia555 = (r1: number, r2: number, cF: number) => (r1 + 2 * r2 > 0 && cF > 0 ? 1.44 / ((r1 + 2 * r2) * cF) : 0);
export const ciclo555 = (r1: number, r2: number) => (r1 + 2 * r2 > 0 ? ((r1 + r2) / (r1 + 2 * r2)) * 100 : 0);

export const EXPRESIONES = [
  { n: "A · B + C", f: (a: boolean, b: boolean, c: boolean) => (a && b) || c },
  { n: "A XOR B (O exclusiva)", f: (a: boolean, b: boolean) => a !== b },
  { n: "(A + B) · C̅", f: (a: boolean, b: boolean, c: boolean) => (a || b) && !c },
  { n: "NAND: ¬(A · B)", f: (a: boolean, b: boolean) => !(a && b) },
] as const;
export const evalBoole = (id: number, a: boolean, b: boolean, c: boolean) => EXPRESIONES[id]!.f(a, b, c);

/* ───────────── 1. Corriente alterna ───────────── */

export function AlternaExplorador({ block }: { block: ToolBlock }) {
  const init = { vp: num(block.params?.a, 325, 5, 400), f: num(block.params?.b, 50, 1, 100) };
  const [s, setS] = useState(init);
  const ef = valorEficaz(s.vp);
  const T = periodo(s.f);
  const pts = Array.from({ length: 121 }, (_, k) => {
    const t = (k / 120) * 2; // dos periodos de 20 ms visibles como referencia relativa
    const x = 20 + (k / 120) * 480;
    const y = 75 - (s.vp / 400) * 60 * Math.sin(2 * Math.PI * (s.f / 50) * t);
    return `${x},${y}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la tensión de pico y la frecuencia de la señal alterna. El valor eficaz es el que equivale a una tensión continua que da la misma potencia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de pico" value={s.vp} min={5} max={400} step={5} unit=" V" color={MANIM.blue} onChange={(vp) => setS((x) => ({ ...x, vp }))} />
          <Slider label="Frecuencia" value={s.f} min={1} max={100} step={1} unit=" Hz" color={MANIM.orange} onChange={(f) => setS((x) => ({ ...x, f }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="alterna" maxH={160}>
        <line x1={20} y1={75} x2={500} y2={75} stroke={MANIM.muted} strokeWidth={1} />
        <line x1={20} y1={75 - (ef / 400) * 60} x2={500} y2={75 - (ef / 400) * 60} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <text x={504} y={75 - (ef / 400) * 60 + 4} fill={MANIM.green} fontSize={11}>
          Vef
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Tensión de pico">{f0(s.vp)} V</Stat>
        <Stat color={MANIM.green} label="Valor eficaz">{f1(ef)} V</Stat>
        <Stat color={MANIM.orange} label="Periodo">{f1(T * 1000)} ms</Stat>
        <Stat color={MANIM.purple} label="Frecuencia angular">{f0(2 * Math.PI * s.f)} rad/s</Stat>
      </Readout>
      <Note>La red doméstica es de 230 V eficaces y 50 Hz: la tensión de pico es 230·√2 ≈ 325 V. El valor eficaz es V<sub>pico</sub>/√2 y es el que dan los polímetros. Un ciclo dura T = 1/f = 20 ms.</Note>
    </Frame>
  );
}

/* ───────────── 2. Potencia y energía ───────────── */

export function PotenciaEnergiaExplorador({ block }: { block: ToolBlock }) {
  const init = { v: num(block.params?.a, 230, 1, 400), i: num(block.params?.b, 5, 0.1, 40), h: 3, pr: 0.15 };
  const [s, setS] = useState(init);
  const p = potenciaVI(s.v, s.i);
  const r = s.i > 0 ? s.v / s.i : 0;
  const kwh = (p * s.h * 30) / 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la tensión y la corriente. La potencia es P = V·I; con el tiempo de uso obtienes la energía y su coste."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión" value={s.v} min={1} max={400} step={1} unit=" V" color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Corriente" value={s.i} min={0.1} max={40} step={0.1} unit=" A" color={MANIM.orange} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Horas de uso al día" value={s.h} min={0.5} max={24} step={0.5} unit=" h" color={MANIM.purple} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Precio de la energía" value={s.pr} min={0.05} max={0.4} step={0.01} unit=" €/kWh" color={MANIM.green} onChange={(pr) => setS((x) => ({ ...x, pr }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Potencia">{f0(p)} W</Stat>
        <Stat color={MANIM.blue} label="Resistencia del aparato">{f1(r)} Ω</Stat>
        <Stat color={MANIM.orange} label="Energía al mes">{f1(kwh)} kWh</Stat>
        <Stat color={MANIM.green} label="Coste al mes">{f2(kwh * s.pr)} €</Stat>
      </Readout>
      <Note>P = V·I = I²·R = V²/R. La energía es potencia por tiempo: E = P·t (el kWh es la unidad de la factura). Un aparato de 1 000 W encendido una hora gasta 1 kWh.</Note>
    </Frame>
  );
}

/* ───────────── 3. Circuito mixto ───────────── */

export function CircuitoMixtoExplorador({ block }: { block: ToolBlock }) {
  const init = { v: num(block.params?.a, 12, 1, 24), r1: 100, r2: 220, r3: 330 };
  const [s, setS] = useState(init);
  const m = mixtoR1R2R3(s.v, s.r1, s.r2, s.r3);
  return (
    <Frame
      stacked
      hint={block.hint ?? "R1 está en serie con el conjunto R2 ∥ R3. Calcula la resistencia equivalente, la corriente total y cómo se reparte."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de la fuente" value={s.v} min={1} max={24} step={1} unit=" V" color={MANIM.yellow} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="R1" value={s.r1} min={10} max={1000} step={10} unit=" Ω" color={MANIM.blue} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R2" value={s.r2} min={10} max={1000} step={10} unit=" Ω" color={MANIM.orange} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
          <Slider label="R3" value={s.r3} min={10} max={1000} step={10} unit=" Ω" color={MANIM.purple} onChange={(r3) => setS((x) => ({ ...x, r3 }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="mixto" maxH={150}>
        <rect x={30} y={20} width={460} height={90} fill="none" stroke={MANIM.muted} strokeWidth={2} />
        <rect x={90} y={12} width={80} height={16} fill={MANIM.blue} fillOpacity={0.6} />
        <text x={130} y={42} textAnchor="middle" fill={MANIM.ink} fontSize={12}>
          R1
        </text>
        {[308, 388].map((x) => (
          <g key={x}>
            <line x1={x} y1={20} x2={x} y2={40} stroke={MANIM.muted} strokeWidth={2} />
            <line x1={x} y1={90} x2={x} y2={110} stroke={MANIM.muted} strokeWidth={2} />
          </g>
        ))}
        <rect x={300} y={40} width={16} height={50} fill={MANIM.orange} fillOpacity={0.6} />
        <rect x={380} y={40} width={16} height={50} fill={MANIM.purple} fillOpacity={0.6} />
        <text x={308} y={105} textAnchor="middle" fill={MANIM.ink} fontSize={12}>
          R2
        </text>
        <text x={388} y={105} textAnchor="middle" fill={MANIM.ink} fontSize={12}>
          R3
        </text>
        <text x={50} y={70} fill={MANIM.yellow} fontSize={13}>
          {s.v} V
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="R equivalente">{f1(m.req)} Ω</Stat>
        <Stat color={MANIM.yellow} label="Corriente total">{f1(m.i * 1000)} mA</Stat>
        <Stat color={MANIM.blue} label="Tensión en R1">{f2(m.v1)} V</Stat>
        <Stat color={MANIM.orange} label="Tensión en R2 y R3">{f2(m.vp)} V</Stat>
        <Stat color={MANIM.orange} label="I en R2">{f1(m.i2 * 1000)} mA</Stat>
        <Stat color={MANIM.purple} label="I en R3">{f1(m.i3 * 1000)} mA</Stat>
      </Readout>
      <Note>Se reduce el circuito paso a paso: primero el paralelo R2∥R3 = R2·R3/(R2+R3), luego se suma R1 en serie. Después se aplica la ley de Ohm y las leyes de Kirchhoff: la suma de tensiones en la malla es la de la fuente, y la corriente total se reparte entre R2 y R3.</Note>
    </Frame>
  );
}

/* ───────────── 4. Fuente de alimentación ───────────── */

export function FuenteAlimentacionExplorador({ block }: { block: ToolBlock }) {
  const init = { ns: Math.round(num(block.params?.a, 20, 5, 100)), c: 1000, i: 0.3 };
  const [s, setS] = useState(init);
  const vs = tensionSecundario(230, 230, s.ns);
  const vpico = vs * Math.SQRT2 - 1.4;
  const rz = rizado(s.i, 50, s.c * 1e-6);
  const vmin = Math.max(0, vpico - rz);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una fuente: transformador, rectificador de puente y condensador de filtro. Mira la tensión continua y el rizado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Vueltas del secundario (primario 230)" value={s.ns} min={5} max={100} step={1} color={MANIM.blue} onChange={(ns) => setS((x) => ({ ...x, ns }))} />
          <Slider label="Condensador de filtro" value={s.c} min={100} max={4700} step={100} unit=" µF" color={MANIM.orange} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Corriente de la carga" value={s.i} min={0.05} max={2} step={0.05} unit=" A" color={MANIM.red} onChange={(i) => setS((x) => ({ ...x, i }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Secundario (eficaz)">{f1(vs)} V</Stat>
        <Stat color={MANIM.green} label="Tensión continua de pico">{f1(vpico)} V</Stat>
        <Stat color={MANIM.red} label="Rizado">{Number.isFinite(rz) ? `${f2(rz)} V` : "—"}</Stat>
        <Stat color={MANIM.orange} label="Tensión mínima">{f1(vmin)} V</Stat>
      </Readout>
      <Note>El transformador reduce la tensión en proporción a las vueltas; el puente de diodos la rectifica (se pierden ≈ 1,4 V) y el condensador la alisa. El rizado ΔV = I/(2·f·C) disminuye con un condensador mayor y aumenta con la corriente consumida. Se supone onda completa a 50 Hz.</Note>
    </Frame>
  );
}

/* ───────────── 5. Transistor: resistencia de base ───────────── */

export function TransistorBetaExplorador({ block }: { block: ToolBlock }) {
  const init = { ic: num(block.params?.a, 100, 5, 500), beta: num(block.params?.b, 100, 20, 400), vin: 5 };
  const [s, setS] = useState(init);
  const ib = (5 * s.ic) / s.beta;
  const rb = resistenciaBase(s.vin, s.ic / 1000, s.beta);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Calcula la resistencia de base para que el transistor se sature y mueva una carga (relé, motor o LED potente)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Corriente de la carga (colector)" value={s.ic} min={5} max={500} step={5} unit=" mA" color={MANIM.orange} onChange={(ic) => setS((x) => ({ ...x, ic }))} />
          <Slider label="Ganancia β del transistor" value={s.beta} min={20} max={400} step={10} color={MANIM.blue} onChange={(beta) => setS((x) => ({ ...x, beta }))} />
          <Slider label="Tensión de entrada" value={s.vin} min={1} max={12} step={0.5} unit=" V" color={MANIM.green} onChange={(vin) => setS((x) => ({ ...x, vin }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Corriente de base necesaria (con margen ×5)">{f2(ib)} mA</Stat>
        <Stat color={MANIM.green} label="Resistencia de base">{Number.isFinite(rb) ? `${f0(rb)} Ω` : "Vin ≤ 0,7 V: no conduce"}</Stat>
      </Readout>
      <Note>En un transistor Ic = β·Ib. Para usarlo como interruptor se le da más corriente de base de la mínima (aquí ×5) para que quede <b>saturado</b>. La resistencia de base vale (Vin − 0,7 V)/Ib. Elige después el valor normalizado inmediatamente inferior.</Note>
    </Frame>
  );
}

/* ───────────── 6. Temporizador 555 ───────────── */

export function Temporizador555Explorador({ block }: { block: ToolBlock }) {
  const init = { r1: 1, r2: num(block.params?.a, 10, 1, 100), c: 10 };
  const [s, setS] = useState(init);
  const f = frecuencia555(s.r1 * 1000, s.r2 * 1000, s.c * 1e-6);
  const d = ciclo555(s.r1, s.r2);
  const high = Math.max(8, Math.min(350, (d / 100) * 120));
  const low = 120 - (d / 100) * 120;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El 555 en modo astable genera una onda cuadrada. Elige R1, R2 y C y mira la frecuencia y el ciclo de trabajo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="R1" value={s.r1} min={1} max={100} step={1} unit=" kΩ" color={MANIM.blue} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R2" value={s.r2} min={1} max={100} step={1} unit=" kΩ" color={MANIM.orange} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
          <Slider label="Condensador C" value={s.c} min={1} max={100} step={1} unit=" µF" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="555" maxH={130}>
        <polyline
          points={[0, 1, 2].map((k) => `${20 + k * 150},90 ${20 + k * 150},20 ${20 + k * 150 + high},20 ${20 + k * 150 + high},90 ${20 + k * 150 + high + low},90`).join(" ")}
          fill="none"
          stroke={MANIM.green}
          strokeWidth={2.5}
          transform="scale(1 1)"
        />
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Frecuencia">{f < 1 ? `${f3(f)} Hz` : `${f2(f)} Hz`}</Stat>
        <Stat color={MANIM.blue} label="Periodo">{f > 0 ? `${f2(1000 / f)} ms` : "—"}</Stat>
        <Stat color={MANIM.orange} label="Ciclo de trabajo">{f1(d)} %</Stat>
      </Readout>
      <Note>En modo astable f = 1,44 / ((R1 + 2·R2)·C). El condensador se carga a través de R1+R2 y se descarga por R2; por eso el ciclo de trabajo siempre es mayor del 50 %. Sirve para hacer parpadear un LED o generar un tono.</Note>
    </Frame>
  );
}

/* ───────────── 7. Electrónica digital: Boole ───────────── */

export function BooleExplorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 0, 0, 3)), a: false, b: false, c: false };
  const [s, setS] = useState(init);
  const E = EXPRESIONES[s.e]!;
  const out = evalBoole(s.e, s.a, s.b, s.c);
  const filas = [false, true].flatMap((a) => [false, true].flatMap((b) => [false, true].map((c) => ({ a, b, c, y: evalBoole(s.e, a, b, c) }))));
  const un = (x: boolean) => (x ? "1" : "0");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una expresión booleana, activa las entradas A, B y C y mira la salida. Debajo, su tabla de verdad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Expresión" items={EXPRESIONES.map((x, value) => ({ value, label: x.n }))} value={s.e} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <div className="flex gap-2">
            {(["a", "b", "c"] as const).map((k) => (
              <button key={k} type="button" className={TOOL_BTN} aria-pressed={s[k]} onClick={() => setS((x) => ({ ...x, [k]: !x[k] }))}>
                {k.toUpperCase()} = {un(s[k])}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={out ? MANIM.green : MANIM.red} label={`Salida de ${E.n}`}>{un(out)}</Stat>
      </Readout>
      <Svg w={520} h={150} testId="boole" maxH={170}>
        {filas.map((r, i) => {
          const act = r.a === s.a && r.b === s.b && r.c === s.c;
          return (
            <g key={i}>
              <rect x={150} y={4 + i * 17} width={220} height={16} fill={act ? MANIM.yellow : MANIM.surface} fillOpacity={act ? 0.35 : 0.5} />
              <text x={175} y={16 + i * 17} fill={MANIM.ink} fontSize={11}>{`A ${un(r.a)}   B ${un(r.b)}   C ${un(r.c)}`}</text>
              <text x={330} y={16 + i * 17} fill={r.y ? MANIM.green : MANIM.red} fontSize={11} fontWeight={700}>{`→ ${un(r.y)}`}</text>
            </g>
          );
        })}
      </Svg>
      <Note>El álgebra de Boole describe circuitos digitales con las operaciones Y (·), O (+) y NO. Una tabla de verdad recoge la salida para cada combinación de entradas; con n entradas hay 2ⁿ filas. Cada expresión se puede construir con puertas lógicas.</Note>
    </Frame>
  );
}
