"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Parpadeo de un LED: encendido `onMs` y apagado `offMs`. */
export function blink(onMs: number, offMs: number) {
  const periodo = onMs + offMs;
  return { periodo, freq: periodo > 0 ? 1000 / periodo : 0, duty: periodo > 0 ? (onMs / periodo) * 100 : 0 };
}

export type ModoPin = "pull-down" | "pull-up" | "ninguna";
/** Lo que lee un pin digital con un pulsador y la resistencia indicada. */
export function lecturaPin(modo: ModoPin, pulsado: boolean) {
  if (modo === "pull-down") return pulsado ? "1 (HIGH)" : "0 (LOW)";
  if (modo === "pull-up") return pulsado ? "0 (LOW)" : "1 (HIGH)";
  return pulsado ? "1 (HIGH)" : "indefinido (el pin «flota» y capta ruido)";
}

/** Reescala `v` del rango [a, b] al rango [c, d] (como la función map de Arduino). */
export const mapea = (v: number, a: number, b: number, c: number, d: number) => (b === a ? c : c + ((v - a) * (d - c)) / (b - a));
/** Temperatura (°C) de un sensor lineal de 10 mV/°C leído con un ADC de 10 bits y 5 V de referencia. */
export const temperaturaLm35 = (lectura: number) => ((lectura * 5) / 1023) * 100;

export const pwmTension = (valor: number, vcc = 5) => (Math.min(255, Math.max(0, valor)) / 255) * vcc;
/** Ángulo de un servo (0–180°) según el ancho del pulso (1 ms = 0°, 2 ms = 180°). */
export const anguloServo = (pulsoMs: number) => Math.min(180, Math.max(0, (pulsoMs - 1) * 180));

/** Puente en H con cuatro interruptores: S1/S2 (lado izquierdo, arriba/abajo) y S3/S4 (lado derecho). */
export function puenteH(s1: boolean, s2: boolean, s3: boolean, s4: boolean) {
  if ((s1 && s2) || (s3 && s4)) return "Cortocircuito";
  if (s1 && s4 && !s2 && !s3) return "Gira hacia delante";
  if (s3 && s2 && !s1 && !s4) return "Gira hacia atrás";
  if (s2 && s4 && !s1 && !s3) return "Frenado (parado)";
  return "Parado (libre)";
}

export type AccionRobot = "Avanzar" | "Girar a la izquierda" | "Girar a la derecha" | "Parar";
/** Seguidor de línea con dos sensores a los lados de la línea (true = detecta la línea). */
export function decideSeguidor(izq: boolean, der: boolean): AccionRobot {
  if (izq && der) return "Parar";
  if (izq) return "Girar a la izquierda";
  if (der) return "Girar a la derecha";
  return "Avanzar";
}

/** Distancia (cm) a partir del tiempo de eco (µs) de un sensor de ultrasonidos (sonido a 343 m/s, ida y vuelta). */
export const distanciaCm = (echoUs: number) => (echoUs * 0.0343) / 2;
export const echoUs = (cm: number) => (cm * 2) / 0.0343;

export function accionRobot(dist: number, izq: boolean, der: boolean, umbral: number): AccionRobot | "Frenar" {
  if (dist < umbral) return "Frenar";
  return decideSeguidor(izq, der);
}

export const CASOS_ROBOT: { n: string; dist: number; izq: boolean; der: boolean; esperado: AccionRobot | "Frenar" }[] = [
  { n: "Camino libre", dist: 80, izq: false, der: false, esperado: "Avanzar" },
  { n: "Línea a la izquierda", dist: 60, izq: true, der: false, esperado: "Girar a la izquierda" },
  { n: "Obstáculo cercano", dist: 12, izq: false, der: false, esperado: "Frenar" },
  { n: "Obstáculo justo en el límite", dist: 19, izq: false, der: false, esperado: "Frenar" },
  { n: "Línea a la derecha", dist: 40, izq: false, der: true, esperado: "Girar a la derecha" },
];

/* ───────────── 1. Parpadeo de un LED ───────────── */

export function BlinkExplorador({ block }: { block: ToolBlock }) {
  const init = { on: Math.round(num(block.params?.a, 500, 50, 2000) / 50) * 50, off: Math.round(num(block.params?.b, 500, 50, 2000) / 50) * 50 };
  const [s, setS] = useState(init);
  const r = blink(s.on, s.off);
  const total = Math.max(1, r.periodo * 3);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El programa enciende el LED, espera, lo apaga y espera. Cambia las esperas (en milisegundos) y observa la frecuencia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="delay con el LED encendido" value={s.on} min={50} max={2000} step={50} unit=" ms" color={MANIM.yellow} onChange={(on) => setS((x) => ({ ...x, on }))} />
          <Slider label="delay con el LED apagado" value={s.off} min={50} max={2000} step={50} unit=" ms" color={MANIM.blue} onChange={(off) => setS((x) => ({ ...x, off }))} />
        </>
      }
    >
      <pre className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-relaxed" data-testid="blink-codigo">
        {`void loop() {\n  digitalWrite(13, HIGH);\n  delay(${s.on});\n  digitalWrite(13, LOW);\n  delay(${s.off});\n}`}
      </pre>
      <Svg w={520} h={50} testId="blink" maxH={60}>
        {[0, 1, 2].map((k) => (
          <g key={k}>
            <rect x={20 + (k * r.periodo * 480) / total} y={10} width={(s.on * 480) / total} height={30} fill={MANIM.yellow} fillOpacity={0.7} />
            <rect x={20 + ((k * r.periodo + s.on) * 480) / total} y={10} width={(s.off * 480) / total} height={30} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={1} />
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Periodo">{r.periodo} ms</Stat>
        <Stat color={MANIM.green} label="Frecuencia">{f2(r.freq)} Hz</Stat>
        <Stat color={MANIM.yellow} label="Tiempo encendido">{fmtEs(r.duty, 0)} %</Stat>
      </Readout>
      <Note>Un programa de placa tiene dos partes: <code>setup()</code> se ejecuta una vez al encender y <code>loop()</code> se repite sin fin. Con <code>delay</code> se fija cuánto tiempo se mantiene cada salida. Por encima de unos 25 Hz el ojo ya no ve parpadear el LED.</Note>
    </Frame>
  );
}

/* ───────────── 2. Entradas digitales: pull-up y pull-down ───────────── */

export function PullPulsadorExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 2)), p: false };
  const [s, setS] = useState(init);
  const MODOS: ModoPin[] = ["pull-down", "pull-up", "ninguna"];
  const m = MODOS[s.modo]!;
  const lee = lecturaPin(m, s.p);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa y suelta el botón con cada montaje. Un pin sin resistencia «flota» y da lecturas aleatorias cuando no se pulsa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Montaje del pulsador" items={[{ value: 0, label: "Resistencia a GND (pull-down)" }, { value: 1, label: "Resistencia a 5 V (pull-up)" }, { value: 2, label: "Sin resistencia" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <div className="sm:col-span-2">
            <button type="button" className={TOOL_BTN} aria-pressed={s.p} onClick={() => setS((x) => ({ ...x, p: !x.p }))}>
              {s.p ? "Botón pulsado (pulsa para soltar)" : "Botón suelto (pulsa para pulsar)"}
            </button>
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={s.modo === 2 && !s.p ? MANIM.red : MANIM.green} label="digitalRead(pin) devuelve">{lee}</Stat>
        <Stat color={MANIM.yellow} label="Con el botón suelto, el pin está">{m === "pull-down" ? "conectado a GND por la resistencia" : m === "pull-up" ? "conectado a 5 V por la resistencia" : "sin conexión definida"}</Stat>
      </Readout>
      <Note>{m === "ninguna" ? "Sin resistencia el pin queda al aire y capta interferencias: el programa leería 0 y 1 al azar. Hay que definir siempre el nivel «de reposo»." : m === "pull-down" ? "Con pull-down la resistencia mantiene el pin a 0 y el pulsador lo lleva a 5 V: se lee 1 al pulsar." : "Con pull-up la resistencia mantiene el pin a 1 y el pulsador lo lleva a 0 V: se lee 0 al pulsar. Muchas placas incluyen pull-up interna (INPUT_PULLUP)."}</Note>
    </Frame>
  );
}

/* ───────────── 3. Lectura analógica ───────────── */

export function LecturaAnalogicaExplorador({ block }: { block: ToolBlock }) {
  const init = { v: Math.round(num(block.params?.a, 150, 0, 1023)) };
  const [s, setS] = useState(init);
  const tension = (s.v * 5) / 1023;
  return (
    <Frame
      stacked
      hint={block.hint ?? "analogRead devuelve un número de 0 a 1023. Conviértelo a tensión, a temperatura o a un ángulo con map()."}
      onReset={() => setS(init)}
      controls={<Slider label="analogRead(A0)" value={s.v} min={0} max={1023} step={1} color={MANIM.blue} onChange={(v) => setS({ v })} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Tensión en el pin">{f2(tension)} V</Stat>
        <Stat color={MANIM.red} label="Si es un sensor de 10 mV/°C: temperatura">{f1(temperaturaLm35(s.v))} °C</Stat>
        <Stat color={MANIM.green} label="map(valor, 0, 1023, 0, 180): ángulo de un servo">{fmtEs(mapea(s.v, 0, 1023, 0, 180), 0)}°</Stat>
        <Stat color={MANIM.orange} label="map(valor, 0, 1023, 0, 100): porcentaje">{fmtEs(mapea(s.v, 0, 1023, 0, 100), 0)} %</Stat>
      </Readout>
      <Note>La placa convierte la tensión (0–5 V) en un entero de 0 a 1023. Un programa traduce ese número a la magnitud real con una fórmula: T = lectura · 5 / 1023 · 100 para un sensor de 10 mV por grado. La función <code>map</code> reescala un rango a otro.</Note>
    </Frame>
  );
}

/* ───────────── 4. PWM y servo ───────────── */

export function PwmServoExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), val: Math.round(num(block.params?.a, 128, 0, 255)), pulso: Math.round(num(block.params?.b, 15, 10, 20)) };
  const [s, setS] = useState(init);
  const duty = (s.val / 255) * 100;
  const ang = anguloServo(s.pulso / 10);
  return (
    <Frame
      stacked
      hint={block.hint ?? "PWM simula tensiones intermedias encendiendo y apagando muy rápido. En un servo, el ancho del pulso decide el ángulo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Actuador" items={[{ value: 0, label: "Motor o LED (analogWrite)" }, { value: 1, label: "Servo (pulso 1–2 ms)" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          {s.modo === 0 ? <Slider label="analogWrite(pin, valor)" value={s.val} min={0} max={255} step={1} color={MANIM.orange} onChange={(val) => setS((x) => ({ ...x, val }))} /> : <Slider label="Ancho del pulso" value={s.pulso} min={10} max={20} step={1} unit=" ×0,1 ms" color={MANIM.green} format={(v) => `${fmtEs(v / 10, 1)} ms`} onChange={(pulso) => setS((x) => ({ ...x, pulso }))} />}
        </>
      }
    >
      <Svg w={520} h={90} testId="pwm" maxH={100}>
        {s.modo === 0
          ? [0, 1, 2, 3].map((k) => (
              <g key={k}>
                <rect x={30 + k * 115} y={15} width={(duty / 100) * 105} height={40} fill={MANIM.orange} fillOpacity={0.7} />
                <rect x={30 + k * 115 + (duty / 100) * 105} y={15} width={105 - (duty / 100) * 105} height={40} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={1} />
              </g>
            ))
          : [0, 1, 2].map((k) => (
              <g key={k}>
                <rect x={30 + k * 160} y={15} width={(s.pulso / 10 / 20) * 480} height={40} fill={MANIM.green} fillOpacity={0.7} />
                <rect x={30 + k * 160 + (s.pulso / 10 / 20) * 480} y={15} width={Math.max(0, 160 - (s.pulso / 10 / 20) * 480)} height={40} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={1} />
              </g>
            ))}
      </Svg>
      <Readout>
        {s.modo === 0 ? (
          <>
            <Stat color={MANIM.yellow} label="Ciclo de trabajo">{fmtEs(duty, 0)} %</Stat>
            <Stat color={MANIM.green} label="Tensión media">{f2(pwmTension(s.val))} V</Stat>
            <Stat color={MANIM.blue} label="Velocidad relativa del motor / brillo">{fmtEs(duty, 0)} %</Stat>
          </>
        ) : (
          <>
            <Stat color={MANIM.green} label="Ancho del pulso">{f1(s.pulso / 10)} ms</Stat>
            <Stat color={MANIM.yellow} label="Ángulo del servo">{fmtEs(ang, 0)}°</Stat>
            <Stat color={MANIM.blue} label="Periodo de la señal">20 ms (50 Hz)</Stat>
          </>
        )}
      </Readout>
      <Note>{s.modo === 0 ? "La placa no genera tensiones intermedias: enciende y apaga la salida cientos de veces por segundo. La tensión media es el ciclo de trabajo por 5 V. analogWrite acepta de 0 (0 %) a 255 (100 %)." : "Un servo recibe un pulso cada 20 ms; la anchura del pulso (1 ms a 2 ms) indica la posición: 1 ms = 0°, 1,5 ms = 90°, 2 ms = 180°."}</Note>
    </Frame>
  );
}

/* ───────────── 5. Puente en H ───────────── */

export function PuenteHExplorador({ block }: { block: ToolBlock }) {
  const init = { s: [false, false, false, false] };
  const [st, setSt] = useState(init);
  void block;
  const r = puenteH(st.s[0]!, st.s[1]!, st.s[2]!, st.s[3]!);
  const col = r === "Cortocircuito" ? MANIM.red : r.startsWith("Gira") ? MANIM.green : MANIM.muted;
  const NOM = ["S1 (+, izquierda)", "S2 (−, izquierda)", "S3 (+, derecha)", "S4 (−, derecha)"];
  return (
    <Frame
      stacked
      hint="Cierra los interruptores del puente en H. Con S1 y S4 el motor gira en un sentido; con S3 y S2, en el contrario. ¡Evita cerrar los dos de un mismo lado!"
      onReset={() => setSt(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Interruptores">
          {NOM.map((n, i) => (
            <button key={n} type="button" className={TOOL_BTN} aria-pressed={st.s[i]} onClick={() => setSt((x) => ({ s: x.s.map((v, k) => (k === i ? !v : v)) }))}>
              {n}: {st.s[i] ? "cerrado" : "abierto"}
            </button>
          ))}
        </div>
      }
    >
      <Svg w={520} h={150} testId="puente-h" maxH={160}>
        <line x1={110} y1={20} x2={410} y2={20} stroke={MANIM.red} strokeWidth={3} />
        <line x1={110} y1={130} x2={410} y2={130} stroke={MANIM.blue} strokeWidth={3} />
        <text x={420} y={25} fill={MANIM.red} fontSize={12}>
          +
        </text>
        <text x={420} y={135} fill={MANIM.blue} fontSize={12}>
          −
        </text>
        {[110, 410].map((x, i) => (
          <g key={x}>
            <line x1={x} y1={20} x2={x} y2={75} stroke={st.s[i * 2] ? MANIM.green : MANIM.muted} strokeWidth={4} />
            <line x1={x} y1={75} x2={x} y2={130} stroke={st.s[i * 2 + 1] ? MANIM.green : MANIM.muted} strokeWidth={4} />
            <circle cx={x} cy={47} r={7} fill={st.s[i * 2] ? MANIM.green : MANIM.surface} stroke={MANIM.ink} strokeWidth={2} />
            <circle cx={x} cy={103} r={7} fill={st.s[i * 2 + 1] ? MANIM.green : MANIM.surface} stroke={MANIM.ink} strokeWidth={2} />
          </g>
        ))}
        <line x1={110} y1={75} x2={410} y2={75} stroke={MANIM.ink} strokeWidth={3} />
        <circle cx={260} cy={75} r={24} fill={MANIM.panel} stroke={col} strokeWidth={4} />
        <text x={260} y={80} fill={col} fontSize={16} textAnchor="middle" fontWeight={800}>
          M
        </text>
      </Svg>
      <Readout>
        <Stat color={col} label="Resultado">{r}</Stat>
      </Readout>
      <Note>Para invertir el sentido de giro de un motor de corriente continua hay que invertir la polaridad. El puente en H lo hace con cuatro interruptores (transistores). Cerrar a la vez los dos de un mismo lado crea un cortocircuito entre + y −: los controladores (L298N, L293D) lo impiden.</Note>
    </Frame>
  );
}

/* ───────────── 6. Seguidor de línea ───────────── */

export function SeguidorLineaExplorador({ block }: { block: ToolBlock }) {
  const init = { pos: Math.round(num(block.params?.a, 0, -2, 2)) };
  const [s, setS] = useState(init);
  // pos < 0: el robot se ha desviado a la derecha de la línea (el sensor izquierdo la ve); pos > 0: a la izquierda.
  const izq = s.pos <= -1;
  const der = s.pos >= 1;
  const ac = decideSeguidor(izq, der);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Desplaza el robot respecto a la línea negra. Cada sensor detecta la línea o no, y el programa decide cómo corregir."}
      onReset={() => setS(init)}
      controls={<Slider label="Posición del robot respecto a la línea" value={s.pos} min={-2} max={2} step={1} color={MANIM.blue} format={(v) => (v === 0 ? "centrado" : v < 0 ? `${-v} a la derecha` : `${v} a la izquierda`)} onChange={(pos) => setS({ pos })} />}
    >
      <Svg w={520} h={150} testId="seguidor" maxH={160}>
        <rect x={0} y={0} width={520} height={150} fill={MANIM.panel} />
        <rect x={230} y={0} width={60} height={150} fill="#111" />
        <g transform={`translate(${-s.pos * 40},0)`}>
          <rect x={210} y={45} width={100} height={60} rx={8} fill={MANIM.blue} fillOpacity={0.4} stroke={MANIM.blue} strokeWidth={3} />
          <circle cx={225} cy={50} r={8} fill={izq ? MANIM.green : MANIM.surface} stroke={MANIM.ink} strokeWidth={2} />
          <circle cx={295} cy={50} r={8} fill={der ? MANIM.green : MANIM.surface} stroke={MANIM.ink} strokeWidth={2} />
        </g>
      </Svg>
      <Readout>
        <Stat color={izq ? MANIM.green : MANIM.muted} label="Sensor izquierdo">{izq ? "ve la línea (1)" : "no la ve (0)"}</Stat>
        <Stat color={der ? MANIM.green : MANIM.muted} label="Sensor derecho">{der ? "ve la línea (1)" : "no la ve (0)"}</Stat>
        <Stat color={MANIM.yellow} label="Decisión del programa">{ac}</Stat>
      </Readout>
      <Note>El robot mantiene la línea entre sus dos sensores. Si uno de ellos la detecta, se ha desviado hacia ese lado y debe girar hacia él para centrarse. Se programa con un si … si no que combina las dos lecturas.</Note>
    </Frame>
  );
}

/* ───────────── 7. Ultrasonidos ───────────── */

export function UltrasonidoExplorador({ block }: { block: ToolBlock }) {
  const init = { cm: Math.round(num(block.params?.a, 50, 2, 200)), um: Math.round(num(block.params?.b, 20, 5, 60)) };
  const [s, setS] = useState(init);
  const us = echoUs(s.cm);
  const frena = s.cm < s.um;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El sensor emite un sonido y mide cuánto tarda en volver el eco. A partir del tiempo se calcula la distancia y se decide si frenar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia al obstáculo" value={s.cm} min={2} max={200} step={1} unit=" cm" color={MANIM.blue} onChange={(cm) => setS((x) => ({ ...x, cm }))} />
          <Slider label="Umbral de frenado" value={s.um} min={5} max={60} step={1} unit=" cm" color={MANIM.orange} onChange={(um) => setS((x) => ({ ...x, um }))} />
        </>
      }
    >
      <Svg w={520} h={80} testId="ultrasonido" maxH={90}>
        <rect x={20} y={20} width={50} height={40} rx={6} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
        <rect x={20 + 40 + (s.cm / 200) * 400} y={10} width={14} height={60} fill={frena ? MANIM.red : MANIM.green} fillOpacity={0.6} stroke={frena ? MANIM.red : MANIM.green} strokeWidth={2} />
        <line x1={72} y1={40} x2={60 + (s.cm / 200) * 400} y2={40} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Tiempo del eco (ida y vuelta)">{fmtEs(us, 0)} µs</Stat>
        <Stat color={MANIM.green} label="Distancia calculada = t · 0,0343 / 2">{f1(distanciaCm(us))} cm</Stat>
        <Stat color={frena ? MANIM.red : MANIM.green} label="Decisión">{frena ? "Frenar y esquivar" : "Seguir avanzando"}</Stat>
      </Readout>
      <Note>El sonido viaja a unos 343 m/s (0,0343 cm/µs). El eco recorre el camino de ida y vuelta, por eso se divide entre 2. Un sensor como el HC-SR04 mide entre unos 2 cm y 4 m. El robot compara la distancia con un umbral para decidir.</Note>
    </Frame>
  );
}

/* ───────────── 8. Pruebas del robot ───────────── */

export function RobotPruebasExplorador({ block }: { block: ToolBlock }) {
  const init = { um: Math.round(num(block.params?.a, 10, 5, 40)) };
  const [s, setS] = useState(init);
  const res = CASOS_ROBOT.map((c) => ({ ...c, obtenido: accionRobot(c.dist, c.izq, c.der, s.um) }));
  const ok = res.filter((r) => r.obtenido === r.esperado).length;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El programa del robot tiene un umbral de frenado mal ajustado. Prueba los casos y corrige el valor hasta que todos pasen."}
      onReset={() => setS(init)}
      controls={<Slider label="Umbral de frenado en el programa" value={s.um} min={5} max={40} step={1} unit=" cm" color={MANIM.orange} onChange={(um) => setS({ um })} />}
    >
      <pre className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm leading-relaxed" data-testid="robot-codigo">
        {`si distancia < ${s.um}:\n    frenar()\nsi no:\n    seguir_linea(sensor_izq, sensor_der)`}
      </pre>
      <ul className="flex flex-col gap-1 text-sm" data-testid="robot-pruebas">
        {res.map((r) => (
          <li key={r.n} style={{ color: r.obtenido === r.esperado ? MANIM.green : MANIM.red }}>
            {r.obtenido === r.esperado ? "✓" : "✗"} {r.n} (distancia {r.dist} cm): esperado «{r.esperado}», obtenido «{r.obtenido}»
          </li>
        ))}
      </ul>
      <Readout>
        <Stat color={ok === res.length ? MANIM.green : MANIM.yellow} label="Pruebas superadas">{ok} de {res.length}</Stat>
      </Readout>
      <Note>{ok === res.length ? "Todos los casos pasan. Un buen conjunto de pruebas incluye casos típicos y casos límite, como un obstáculo justo en el umbral." : "El fallo aparece en el caso límite: un obstáculo a 19 cm no se detecta porque el umbral es demasiado bajo. Los casos límite son los que más errores descubren."}</Note>
    </Frame>
  );
}
