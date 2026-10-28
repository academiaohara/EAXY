"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const SISTEMAS_CONTROL = [
  { n: "Termostato de calefacción", ent: ["Sensor de temperatura", "Temperatura deseada (consigna)"], proc: ["Controlador que compara"], sal: ["Caldera o radiador"], lazo: "Lazo cerrado: mide el resultado y corrige" },
  { n: "Semáforo con temporizador", ent: ["Reloj / temporizador", "Pulsador de peatones"], proc: ["Autómata programado"], sal: ["Luces roja, ámbar y verde"], lazo: "Lazo abierto: sigue su programa sin medir el tráfico" },
  { n: "Puerta automática", ent: ["Sensor de presencia", "Finales de carrera"], proc: ["Controlador"], sal: ["Motor de la puerta"], lazo: "Lazo cerrado: los finales de carrera confirman la posición" },
  { n: "Lavadora", ent: ["Selector de programa", "Sensor de nivel de agua", "Sensor de temperatura"], proc: ["Programador / microcontrolador"], sal: ["Motor del tambor", "Electroválvula", "Resistencia calefactora"], lazo: "Mixto: programa fijo con sensores que lo ajustan" },
] as const;

/** Evolución de la temperatura de una habitación con un calefactor en lazo abierto (potencia fija) y en lazo cerrado (todo/nada con histéresis). */
export function simulaLazo(consigna: number, tAmb: number, duty: number, minutos: number) {
  const PERDIDA = 0.03;
  const POT = 0.6;
  const abierto: number[] = [tAmb];
  const cerrado: number[] = [tAmb];
  let on = false;
  let tiempoOn = 0;
  for (let t = 1; t <= minutos; t += 1) {
    const a = abierto[t - 1]!;
    abierto.push(a + (duty / 100) * POT - PERDIDA * (a - tAmb));
    const c = cerrado[t - 1]!;
    if (c < consigna - 0.5) on = true;
    else if (c > consigna + 0.5) on = false;
    if (on) tiempoOn += 1;
    cerrado.push(c + (on ? POT : 0) - PERDIDA * (c - tAmb));
  }
  return { abierto, cerrado, fraccionOn: minutos > 0 ? tiempoOn / minutos : 0 };
}

/** Código digital de un conversor analógico-digital de `bits` bits y referencia `vref`. */
export function adc(v: number, vref: number, bits: number) {
  const niveles = 2 ** bits;
  const codigo = Math.min(niveles - 1, Math.max(0, Math.floor((v / vref) * niveles)));
  return { codigo, niveles, resolucion: vref / niveles, reconstruido: (codigo * vref) / niveles };
}

export type Puerta = "AND" | "OR" | "NOT" | "NAND" | "NOR" | "XOR";
export const PUERTAS: Puerta[] = ["AND", "OR", "NOT", "NAND", "NOR", "XOR"];
export function puerta(op: Puerta, a: boolean, b: boolean) {
  switch (op) {
    case "AND":
      return a && b;
    case "OR":
      return a || b;
    case "NOT":
      return !a;
    case "NAND":
      return !(a && b);
    case "NOR":
      return !(a || b);
    default:
      return a !== b;
  }
}

/** Sirena de una alarma: suena si está armada y se activa alguno de los sensores. */
export const sirena = (armada: boolean, puertaAbierta: boolean, ventana: boolean, movimiento: boolean) => armada && (puertaAbierta || ventana || movimiento);
export function combinacionesSirena() {
  let n = 0;
  for (let i = 0; i < 16; i += 1) if (sirena(!!(i & 8), !!(i & 4), !!(i & 2), !!(i & 1))) n += 1;
  return n;
}

export type EstadoPuerta = "Cerrada" | "Abriendo" | "Abierta" | "Cerrando";
export type EventoPuerta = "Pulsador" | "Final de carrera arriba" | "Final de carrera abajo" | "Obstáculo";
export const EVENTOS_PUERTA: EventoPuerta[] = ["Pulsador", "Final de carrera arriba", "Final de carrera abajo", "Obstáculo"];
export function siguientePuerta(e: EstadoPuerta, ev: EventoPuerta): EstadoPuerta {
  if (e === "Cerrada" && ev === "Pulsador") return "Abriendo";
  if (e === "Abriendo" && ev === "Final de carrera arriba") return "Abierta";
  if (e === "Abierta" && ev === "Pulsador") return "Cerrando";
  if (e === "Cerrando" && ev === "Final de carrera abajo") return "Cerrada";
  if (e === "Cerrando" && ev === "Obstáculo") return "Abriendo";
  return e;
}

/** Humedad del suelo (%) hora a hora con riego automático (bomba si baja del umbral) y con un temporizador fijo. */
export function simulaRiego(h0: number, umbral: number, evap: number, horas = 24, horasTemporizador = 3) {
  const auto: number[] = [h0];
  const temp: number[] = [h0];
  let horasBomba = 0;
  for (let t = 1; t <= horas; t += 1) {
    const a = auto[t - 1]!;
    const bomba = a < umbral;
    if (bomba) horasBomba += 1;
    auto.push(Math.min(100, Math.max(0, a - evap + (bomba ? 25 : 0))));
    const b = temp[t - 1]!;
    const prog = t >= 6 && t < 6 + horasTemporizador;
    temp.push(Math.min(100, Math.max(0, b - evap + (prog ? 25 : 0))));
  }
  return { auto, temp, horasBomba, litrosAuto: horasBomba * 20, litrosTemp: horasTemporizador * 20 };
}

/* ───────────── 1. Entrada, proceso y salida ───────────── */

export function SistemaIpsExplorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.n, 0, 0, SISTEMAS_CONTROL.length - 1)) };
  const [s, setS] = useState(init);
  const S = SISTEMAS_CONTROL[s.s]!;
  const col = (t: string, items: readonly string[], c: string) => (
    <div className="rounded-lg border bg-black/20 p-3 text-sm" style={{ borderColor: c }}>
      <div className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: c }}>
        {t}
      </div>
      <ul className="list-disc pl-4">
        {items.map((i) => (
          <li key={i}>{i}</li>
        ))}
      </ul>
    </div>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un sistema y mira cómo se reparten sus elementos en entradas (sensores), proceso (controlador) y salidas (actuadores)."}
      onReset={() => setS(init)}
      controls={<Choice label="Sistema" items={SISTEMAS_CONTROL.map((x, value) => ({ value, label: x.n }))} value={s.s} onChange={(v) => setS({ s: v })} />}
    >
      <div className="grid gap-3 sm:grid-cols-3" data-testid="sistema-ips">
        {col("Entradas (sensores)", S.ent, MANIM.blue)}
        {col("Proceso (control)", S.proc, MANIM.yellow)}
        {col("Salidas (actuadores)", S.sal, MANIM.green)}
      </div>
      <Readout>
        <Stat color={MANIM.orange} label="Tipo de control">{S.lazo}</Stat>
      </Readout>
      <Note>Todo sistema de control tiene entradas que informan, un proceso que decide y salidas que actúan. Si además mide el resultado y corrige, es de lazo cerrado; si no, de lazo abierto.</Note>
    </Frame>
  );
}

/* ───────────── 2. Lazo abierto y cerrado: termostato ───────────── */

export function LazoControlExplorador({ block }: { block: ToolBlock }) {
  const init = { cons: Math.round(num(block.params?.a, 21, 15, 25)), amb: Math.round(num(block.params?.b, 4, 0, 20)), duty: 50, min: 180 };
  const [s, setS] = useState(init);
  const r = simulaLazo(s.cons, s.amb, s.duty, s.min);
  const pts = (arr: number[]) => arr.filter((_, i) => i % Math.max(1, Math.floor(s.min / 120)) === 0).map((v, i, a) => `${40 + (i / Math.max(1, a.length - 1)) * 440},${170 - ((Math.min(40, Math.max(0, v)) / 40) * 140)}`).join(" ");
  const fa = r.abierto.at(-1)!;
  const fc = r.cerrado.at(-1)!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara un calefactor con potencia fija (lazo abierto) con un termostato (lazo cerrado). Cambia la temperatura exterior y mira cuál mantiene la consigna."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Temperatura deseada (consigna)" value={s.cons} min={15} max={25} step={1} unit=" °C" color={MANIM.green} onChange={(cons) => setS((x) => ({ ...x, cons }))} />
          <Slider label="Temperatura exterior" value={s.amb} min={0} max={20} step={1} unit=" °C" color={MANIM.blue} onChange={(amb) => setS((x) => ({ ...x, amb }))} />
          <Slider label="Potencia fija del calefactor (lazo abierto)" value={s.duty} min={0} max={100} step={5} unit=" %" color={MANIM.orange} onChange={(duty) => setS((x) => ({ ...x, duty }))} />
          <Slider label="Duración" value={s.min} min={60} max={240} step={10} unit=" min" color={MANIM.muted} onChange={(min) => setS((x) => ({ ...x, min }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="lazo" maxH={200}>
        <line x1={40} y1={170} x2={490} y2={170} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={30} x2={40} y2={170} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={170 - (s.cons / 40) * 140} x2={490} y2={170 - (s.cons / 40) * 140} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={pts(r.abierto)} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <polyline points={pts(r.cerrado)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <text x={490} y={186} fill={MANIM.muted} fontSize={11} textAnchor="end">
          tiempo
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Lazo abierto: temperatura final">{f1(fa)} °C ({fa - s.cons >= 0 ? "+" : ""}{f1(fa - s.cons)} respecto a la consigna)</Stat>
        <Stat color={MANIM.green} label="Lazo cerrado: temperatura final">{f1(fc)} °C ({fc - s.cons >= 0 ? "+" : ""}{f1(fc - s.cons)})</Stat>
        <Stat color={MANIM.blue} label="El termostato tuvo el calefactor encendido">{fmtEs(r.fraccionOn * 100, 0)} % del tiempo</Stat>
      </Readout>
      <Note>Con potencia fija, la temperatura depende del frío exterior: no se corrige. El termostato mide, compara con la consigna y enciende o apaga el calefactor, así que mantiene la temperatura aunque cambien las condiciones (con un pequeño margen para no conectar y desconectar sin parar). Es la realimentación o «feedback».</Note>
    </Frame>
  );
}

/* ───────────── 3. Conversión analógico-digital ───────────── */

export function ConversorAdcExplorador({ block }: { block: ToolBlock }) {
  const init = { v: Math.round(num(block.params?.a, 3.3, 0, 5) * 10) / 10, bits: Math.round(num(block.params?.n, 1, 0, 3)) };
  const [s, setS] = useState(init);
  const BITS = [2, 4, 8, 10];
  const b = BITS[s.bits]!;
  const r = adc(s.v, 5, b);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un conversor traduce una tensión (0 a 5 V) a un número binario. Con más bits hay más niveles y se parece más a la señal real."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de entrada" value={s.v} min={0} max={5} step={0.1} unit=" V" color={MANIM.blue} format={(v) => fmtEs(v, 1)} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Choice label="Resolución del conversor" items={BITS.map((n, value) => ({ value, label: `${n} bits` }))} value={s.bits} onChange={(bits) => setS((x) => ({ ...x, bits }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Niveles posibles (2ⁿ)">{r.niveles}</Stat>
        <Stat color={MANIM.green} label="Paso de cada nivel">{fmtEs(r.resolucion * 1000, 1)} mV</Stat>
        <Stat color={MANIM.blue} label="Código digital">{r.codigo} = {r.codigo.toString(2).padStart(b, "0")}</Stat>
        <Stat color={MANIM.orange} label="Tensión reconstruida">{fmtEs(r.reconstruido, 3)} V</Stat>
        <Stat color={MANIM.red} label="Error de cuantización">{fmtEs(Math.abs(s.v - r.reconstruido) * 1000, 1)} mV</Stat>
      </Readout>
      <Note>Un microcontrolador solo entiende números. El conversor analógico-digital (ADC) divide el rango de tensión en 2ⁿ niveles y asigna a cada tensión el número del nivel. Una placa típica usa 10 bits: 1 024 niveles, unos 4,9 mV cada uno con 5 V.</Note>
    </Frame>
  );
}

/* ───────────── 4. Puertas lógicas ───────────── */

export function PuertasLogicasExplorador({ block }: { block: ToolBlock }) {
  const init = { op: Math.round(num(block.params?.n, 0, 0, PUERTAS.length - 1)), a: false, b: false };
  const [s, setS] = useState(init);
  const op = PUERTAS[s.op]!;
  const out = puerta(op, s.a, s.b);
  const uno = op === "NOT";
  const filas: [boolean, boolean][] = uno ? [[false, false], [true, false]] : [[false, false], [false, true], [true, false], [true, true]];
  const v = (x: boolean) => (x ? "1" : "0");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una puerta, cambia las entradas A y B, y completa mentalmente su tabla de verdad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Puerta" items={PUERTAS.map((p, value) => ({ value, label: p }))} value={s.op} onChange={(o) => setS((x) => ({ ...x, op: o }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Entradas">
            <button type="button" className={TOOL_BTN} aria-pressed={s.a} onClick={() => setS((x) => ({ ...x, a: !x.a }))}>
              A = {v(s.a)}
            </button>
            {uno ? null : (
              <button type="button" className={TOOL_BTN} aria-pressed={s.b} onClick={() => setS((x) => ({ ...x, b: !x.b }))}>
                B = {v(s.b)}
              </button>
            )}
          </div>
        </>
      }
    >
      <div className="flex flex-wrap items-center gap-6" data-testid="puertas">
        <div className="rounded-lg border px-4 py-3 text-center text-xl font-bold" style={{ borderColor: out ? MANIM.green : MANIM.muted, color: out ? MANIM.green : MANIM.muted }}>
          {op}
          <div className="text-3xl">{v(out)}</div>
        </div>
        <table className="border-collapse text-sm">
          <thead>
            <tr className="text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="border border-white/10 px-3 py-1">A</th>
              {uno ? null : <th className="border border-white/10 px-3 py-1">B</th>}
              <th className="border border-white/10 px-3 py-1">Salida</th>
            </tr>
          </thead>
          <tbody>
            {filas.map(([a, b]) => {
              const act = a === s.a && (uno || b === s.b);
              return (
                <tr key={`${a}${b}`} style={act ? { background: "rgba(252,213,76,0.2)" } : undefined}>
                  <td className="border border-white/10 px-3 py-1 text-center">{v(a)}</td>
                  {uno ? null : <td className="border border-white/10 px-3 py-1 text-center">{v(b)}</td>}
                  <td className="border border-white/10 px-3 py-1 text-center font-bold">{v(puerta(op, a, b))}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Note>
        {op === "AND" && "AND («y»): la salida es 1 solo si las dos entradas son 1."}
        {op === "OR" && "OR («o»): la salida es 1 si al menos una entrada es 1."}
        {op === "NOT" && "NOT («no»): invierte la entrada."}
        {op === "NAND" && "NAND: es un AND seguido de un NOT; da 0 solo si las dos entradas son 1."}
        {op === "NOR" && "NOR: es un OR seguido de un NOT; da 1 solo si las dos entradas son 0."}
        {op === "XOR" && "XOR («o exclusivo»): la salida es 1 si las entradas son distintas."}
      </Note>
    </Frame>
  );
}

/* ───────────── 5. Lógica de control: una alarma ───────────── */

export function AlarmaLogicaExplorador({ block }: { block: ToolBlock }) {
  const init = { arm: block.params?.n === 0 ? false : true, p: false, v: false, m: false };
  const [s, setS] = useState(init);
  const on = sirena(s.arm, s.p, s.v, s.m);
  const T = (k: "arm" | "p" | "v" | "m", t: string) => (
    <button key={k} type="button" className={TOOL_BTN} aria-pressed={s[k]} onClick={() => setS((x) => ({ ...x, [k]: !x[k] }))}>
      {t}: {s[k] ? "1" : "0"}
    </button>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa y desactiva las entradas de la alarma y observa cuándo suena la sirena. Piensa en la expresión lógica."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Entradas de la alarma">
          {T("arm", "Armada")}
          {T("p", "Puerta abierta")}
          {T("v", "Ventana abierta")}
          {T("m", "Movimiento")}
        </div>
      }
    >
      <Svg w={520} h={80} testId="alarma" maxH={90}>
        <circle cx={90} cy={40} r={26} fill={on ? MANIM.red : MANIM.surface} fillOpacity={on ? 0.7 : 1} stroke={on ? MANIM.red : MANIM.muted} strokeWidth={4} />
        <text x={130} y={46} fill={on ? MANIM.red : MANIM.muted} fontSize={20} fontWeight={800}>
          {on ? "¡SIRENA!" : "Silencio"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Expresión lógica">Sirena = Armada Y (Puerta O Ventana O Movimiento)</Stat>
        <Stat color={on ? MANIM.red : MANIM.green} label="Salida">{on ? "1 (suena)" : "0 (no suena)"}</Stat>
        <Stat color={MANIM.blue} label="Combinaciones en las que suena">{combinacionesSirena()} de 16</Stat>
      </Readout>
      <Note>Una condición de control se traduce a lógica: «la alarma suena si está armada y se activa cualquier sensor». Con 4 entradas hay 2⁴ = 16 combinaciones: la tabla de verdad recoge qué hace el sistema en cada una.</Note>
    </Frame>
  );
}

/* ───────────── 6. Máquina de estados: puerta de garaje ───────────── */

export function PuertaGarajeExplorador({ block }: { block: ToolBlock }) {
  const init = { e: "Cerrada" as EstadoPuerta, hist: [] as string[] };
  const [s, setS] = useState(init);
  void block;
  const ESTADOS: EstadoPuerta[] = ["Cerrada", "Abriendo", "Abierta", "Cerrando"];
  const dispara = (ev: EventoPuerta) =>
    setS((x) => {
      const n = siguientePuerta(x.e, ev);
      return { e: n, hist: [...x.hist.slice(-5), `${x.e} + «${ev}» → ${n === x.e ? "sin cambio" : n}`] };
    });
  return (
    <Frame
      stacked
      hint="Provoca eventos y mira cómo cambia el estado de la puerta. Algunos eventos no hacen nada en ciertos estados."
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Eventos">
          {EVENTOS_PUERTA.map((ev) => (
            <button key={ev} type="button" className={TOOL_BTN} onClick={() => dispara(ev)}>
              {ev}
            </button>
          ))}
        </div>
      }
    >
      <Svg w={520} h={90} testId="garaje" maxH={100}>
        {ESTADOS.map((es, i) => (
          <g key={es}>
            <rect x={15 + i * 126} y={20} width={110} height={50} rx={10} fill={es === s.e ? MANIM.green : MANIM.surface} fillOpacity={es === s.e ? 0.5 : 1} stroke={es === s.e ? MANIM.green : MANIM.muted} strokeWidth={es === s.e ? 4 : 2} />
            <text x={70 + i * 126} y={51} fill={MANIM.ink} fontSize={14} textAnchor="middle" fontWeight={es === s.e ? 700 : 400}>
              {es}
            </text>
            {i < 3 ? <text x={127 + i * 126} y={50} fill={MANIM.muted} fontSize={16}>→</text> : null}
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Estado actual">{s.e}</Stat>
        <Stat color={MANIM.yellow} label="Motor">{s.e === "Abriendo" ? "Girando (subir)" : s.e === "Cerrando" ? "Girando (bajar)" : "Parado"}</Stat>
      </Readout>
      <ul className="list-disc pl-5 text-sm" data-testid="garaje-hist">
        {s.hist.map((h, i) => (
          <li key={i}>{h}</li>
        ))}
      </ul>
      <Note>Un automatismo programable se puede describir como estados y transiciones: en cada estado, un evento (pulsador, sensor) provoca el paso a otro. Si al cerrar detecta un obstáculo, vuelve a abrir por seguridad.</Note>
    </Frame>
  );
}

/* ───────────── 7. Riego automático ───────────── */

export function RiegoAutomaticoExplorador({ block }: { block: ToolBlock }) {
  const init = { h0: Math.round(num(block.params?.a, 60, 20, 90)), um: Math.round(num(block.params?.b, 40, 20, 60)), ev: 2 };
  const [s, setS] = useState(init);
  const r = simulaRiego(s.h0, s.um, s.ev);
  const ptsOf = (arr: number[]) => arr.map((v, i) => `${40 + (i / 24) * 440},${160 - (v / 100) * 130}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara un riego programado por reloj con uno que mide la humedad del suelo. Cambia el umbral y la evaporación."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Humedad inicial del suelo" value={s.h0} min={20} max={90} step={5} unit=" %" color={MANIM.blue} onChange={(h0) => setS((x) => ({ ...x, h0 }))} />
          <Slider label="Umbral del sensor (riega si baja)" value={s.um} min={20} max={60} step={5} unit=" %" color={MANIM.green} onChange={(um) => setS((x) => ({ ...x, um }))} />
          <Slider label="Evaporación por hora" value={s.ev} min={2} max={8} step={1} unit=" %" color={MANIM.orange} onChange={(ev) => setS((x) => ({ ...x, ev }))} />
        </>
      }
    >
      <Svg w={520} h={180} testId="riego" maxH={190}>
        <line x1={40} y1={160} x2={490} y2={160} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={30} x2={40} y2={160} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={160 - (s.um / 100) * 130} x2={490} y2={160 - (s.um / 100) * 130} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={ptsOf(r.temp)} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <polyline points={ptsOf(r.auto)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <text x={490} y={176} fill={MANIM.muted} fontSize={11} textAnchor="end">
          24 horas
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Riego con sensor: horas de bomba">{r.horasBomba} h · {r.litrosAuto} L</Stat>
        <Stat color={MANIM.green} label="Humedad mínima con sensor">{fmtEs(Math.min(...r.auto), 0)} %</Stat>
        <Stat color={MANIM.orange} label="Riego programado (3 h fijas): agua">{r.litrosTemp} L</Stat>
        <Stat color={MANIM.orange} label="Humedad mínima programado">{fmtEs(Math.min(...r.temp), 0)} %</Stat>
      </Readout>
      <Note>El temporizador es un control de lazo abierto: riega lo mismo llueva o no. El sensor de humedad cierra el lazo: solo riega cuando hace falta, así que ahorra agua y mantiene el suelo en el rango deseado. Los datos son de una simulación sencilla.</Note>
    </Frame>
  );
}
