"use client";

import { useMemo, useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

function HBar({ label, value, max, color, text }: { label: string; value: number; max: number; color: string; text?: string }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-40 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full rounded" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="w-24 shrink-0 text-right font-bold tabular-nums">{text ?? f1(value)}</span>
    </div>
  );
}

const hash = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ───────────── 6.1 Manual, semiautomático y automático ───────────── */

const MODOS_FAB = [
  { id: "manual", n: "Manual", rate: (op: number) => 10 * op, defect: 0.06, hora: (op: number) => 15 * op },
  { id: "semi", n: "Semiautomático", rate: (op: number) => 35 * Math.min(op, 2), defect: 0.02, hora: (op: number) => 15 * Math.min(op, 2) + 8 },
  { id: "auto", n: "Automático", rate: () => 80, defect: 0.005, hora: () => 15 + 25 },
] as const;

export function resultadoFabrica(modo: number, op: number, parada: number, turno = 8) {
  const m = MODOS_FAB[modo]!;
  const horas = Math.max(0, turno - parada);
  const piezas = m.rate(op) * horas;
  const malas = piezas * m.defect;
  const buenas = piezas - malas;
  const coste = buenas > 0 ? (m.hora(op) * turno) / buenas + 2 : Infinity;
  return { piezas, malas, buenas, coste };
}

export function FabricaModosExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 2)), op: Math.round(num(block.params?.a, 3, 1, 6)), parada: 0, dem: Math.round(num(block.params?.b, 250, 100, 700)) };
  const [s, setS] = useState(init);
  const r = resultadoFabrica(s.modo, s.op, s.parada);
  const cubre = r.buenas >= s.dem;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara los tres modos con los mismos operarios y la misma demanda. El automático produce más y con menos defectos, pero una avería lo para todo y exige inversión."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Modo de operación" items={MODOS_FAB.map((m, i) => ({ value: i, label: m.n }))} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="Operarios disponibles" value={s.op} min={1} max={6} color={MANIM.blue} onChange={(op) => setS((x) => ({ ...x, op }))} />
          <Slider label="Demanda del turno" value={s.dem} min={100} max={700} step={10} unit=" piezas" color={MANIM.yellow} onChange={(dem) => setS((x) => ({ ...x, dem }))} />
          <Slider label="Horas de parada por avería (turno de 8 h)" value={s.parada} min={0} max={6} step={0.5} unit=" h" format={f1} color={MANIM.red} onChange={(parada) => setS((x) => ({ ...x, parada }))} />
        </>
      }
    >
      <HBar label="Piezas buenas" value={r.buenas} max={700} color={cubre ? MANIM.green : MANIM.orange} text={f0(r.buenas)} />
      <HBar label="Demanda" value={s.dem} max={700} color={MANIM.yellow} text={f0(s.dem)} />
      <Readout>
        <Stat color={MANIM.red} label="Piezas defectuosas">
          {f1(r.malas)}
        </Stat>
        <Stat color={MANIM.purple} label="Coste por pieza buena">
          {Number.isFinite(r.coste) ? `${f2(r.coste)} €` : "—"}
        </Stat>
        <Stat color={cubre ? MANIM.green : MANIM.orange} label="¿Cubre la demanda?">
          {cubre ? "Sí" : "No"}
        </Stat>
      </Readout>
      <Note>Datos <strong>ilustrativos</strong> para comparar: manual 10 piezas/h por operario (6 % de defectos); semiautomático 35 piezas/h con 1 o 2 operarios (2 %); automático 80 piezas/h con un supervisor (0,5 %). La inversión inicial de la máquina no está en el coste por pieza.</Note>
    </Frame>
  );
}

/* ───────────── 6.2 Bloques de un sistema de control ───────────── */

const SISTEMAS_CTRL = [
  { n: "Termostato de calefacción", ref: "Temperatura deseada (22 °C)", sen: "Sensor de temperatura", con: "Termostato (compara y decide)", act: "Caldera y válvula", pla: "La habitación", sal: "Temperatura real", per: "Abrir una ventana" },
  { n: "Riego automático", ref: "Humedad mínima del suelo", sen: "Sensor de humedad", con: "Microcontrolador", act: "Electroválvula", pla: "El huerto", sal: "Humedad real", per: "Lluvia o calor intenso" },
  { n: "Control de crucero", ref: "Velocidad fijada (100 km/h)", sen: "Sensor de velocidad (ruedas)", con: "Unidad de control del motor", act: "Acelerador electrónico", pla: "El coche", sal: "Velocidad real", per: "Una cuesta" },
  { n: "Ascensor", ref: "Planta solicitada", sen: "Sensores de planta", con: "Autómata programable", act: "Motor y freno", pla: "La cabina", sal: "Posición real", per: "Carga de pasajeros" },
];
const BLOQUES = [
  { k: "ref", t: "Referencia", tipo: "Información", c: MANIM.yellow },
  { k: "con", t: "Controlador", tipo: "Información", c: MANIM.green },
  { k: "act", t: "Actuador", tipo: "Energía", c: MANIM.orange },
  { k: "pla", t: "Planta (proceso)", tipo: "Energía y materia", c: MANIM.blue },
  { k: "sen", t: "Sensor", tipo: "Información", c: MANIM.purple },
] as const;

export function BloquesControlExplorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.n, 0, 0, SISTEMAS_CTRL.length - 1)), b: "con" as (typeof BLOQUES)[number]["k"], vistos: ["con"] as string[] };
  const [st, setSt] = useState(init);
  const sis = SISTEMAS_CTRL[st.s]!;
  const bl = BLOQUES.find((x) => x.k === st.b)!;
  const nombre = (k: string) => sis[k as "ref"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa cada bloque: ¿lleva información (señales) o energía? El sensor cierra el lazo devolviendo al controlador lo que de verdad ocurre."}
      onReset={() => setSt(init)}
      controls={<Choice label="Sistema" items={SISTEMAS_CTRL.map((x, i) => ({ value: i, label: x.n }))} value={st.s} onChange={(s) => setSt({ ...init, s })} />}
    >
      <Svg w={520} h={170} maxH={180} testId="tool-bloques">
        {[
          { k: "ref", x: 20, y: 20 },
          { k: "con", x: 150, y: 20 },
          { k: "act", x: 280, y: 20 },
          { k: "pla", x: 410, y: 20 },
          { k: "sen", x: 215, y: 110 },
        ].map((p) => {
          const b = BLOQUES.find((x) => x.k === p.k)!;
          return (
            <g key={p.k}>
              <rect x={p.x} y={p.y} width={100} height={44} rx={8} fill={MANIM.surface} stroke={b.c} strokeWidth={st.b === p.k ? 5 : 2.5} />
              <text x={p.x + 50} y={p.y + 27} textAnchor="middle" fill={b.c} fontSize={12} fontWeight={700}>
                {b.t}
              </text>
            </g>
          );
        })}
        <path d="M 120 42 L 150 42 M 250 42 L 280 42 M 380 42 L 410 42" stroke={MANIM.muted} strokeWidth={2.5} />
        <path d="M 460 64 L 460 132 L 315 132" fill="none" stroke={MANIM.purple} strokeWidth={2.5} />
        <path d="M 215 132 L 200 132 L 200 70" fill="none" stroke={MANIM.purple} strokeWidth={2.5} />
        <text x={500} y={42} fill={MANIM.muted} fontSize={11}>
          salida
        </text>
      </Svg>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Bloques">
        {BLOQUES.map((b) => (
          <button key={b.k} type="button" aria-pressed={st.b === b.k} className={`${TOOL_BTN} ${st.b === b.k ? "bg-white/15" : ""}`} style={{ borderColor: b.c }} onClick={() => setSt((x) => ({ ...x, b: b.k, vistos: x.vistos.includes(b.k) ? x.vistos : [...x.vistos, b.k] }))}>
            {b.t}
          </button>
        ))}
      </div>
      <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: bl.c }} data-testid="bloque-detalle">
        <span className="text-lg font-bold">{bl.t}</span>: <strong>{nombre(bl.k)}</strong>
        <p className="mt-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">Transporta: {bl.tipo.toLowerCase()}.</p>
      </div>
      <Readout>
        <Stat color={MANIM.red} label="Perturbación típica">
          {sis.per}
        </Stat>
        <Stat color={MANIM.green} label="Variable controlada">
          {sis.sal}
        </Stat>
        <Stat color={MANIM.yellow} label="Bloques revisados">
          {st.vistos.length} de {BLOQUES.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 6.3 Sensores en una habitación ───────────── */

export function lecturasSensores(lux: number, temp: number, dist: number) {
  const rLdr = 500000 / (lux + 10); // Ω
  const vLdr = (5 * 10000) / (10000 + rLdr);
  const T = temp + 273.15;
  const rNtc = 10000 * Math.exp(3950 * (1 / T - 1 / 298.15)); // Ω
  const vNtc = (5 * 10000) / (10000 + rNtc);
  const eco = ((2 * dist) / 100 / 343) * 1e6; // µs
  const adc = (v: number) => Math.round((v / 5) * 1023);
  return { rLdr, vLdr, rNtc, vNtc, eco, adcLdr: adc(vLdr), adcNtc: adc(vNtc) };
}

export function SensoresHabitacionExplorador({ block }: { block: ToolBlock }) {
  const init = { lux: Math.round(num(block.params?.a, 100, 0, 1000)), t: Math.round(num(block.params?.b, 25, -10, 40)), d: Math.round(num(block.params?.c, 100, 2, 400)) };
  const [s, setS] = useState(init);
  const r = lecturasSensores(s.lux, s.t, s.d);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el entorno de la habitación y observa cómo cada sensor lo traduce a una señal eléctrica y a un número que lee el controlador."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Luz de la habitación" value={s.lux} min={0} max={1000} step={10} unit=" lux" color={MANIM.yellow} onChange={(lux) => setS((x) => ({ ...x, lux }))} />
          <Slider label="Temperatura" value={s.t} min={-10} max={40} unit=" °C" color={MANIM.red} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <Slider label="Distancia al obstáculo" value={s.d} min={2} max={400} step={2} unit=" cm" color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-3" data-testid="sensores-lecturas">
        {[
          { t: "LDR (luz)", c: MANIM.yellow, l: [`Resistencia: ${r.rLdr >= 1000 ? `${f1(r.rLdr / 1000)} kΩ` : `${f0(r.rLdr)} Ω`}`, `Tensión del divisor: ${f2(r.vLdr)} V`, `Lectura ADC (10 bits): ${r.adcLdr}`] },
          { t: "NTC (temperatura)", c: MANIM.red, l: [`Resistencia: ${f1(r.rNtc / 1000)} kΩ`, `Tensión del divisor: ${f2(r.vNtc)} V`, `Lectura ADC (10 bits): ${r.adcNtc}`] },
          { t: "Ultrasonidos (distancia)", c: MANIM.blue, l: [`Tiempo de eco: ${f0(r.eco)} µs`, `Recorrido de ida y vuelta: ${f2((2 * s.d) / 100)} m`, "v sonido = 343 m/s"] },
        ].map((c) => (
          <div key={c.t} className="rounded-lg border p-3 text-sm text-[color:var(--stage-ink,#fff)]" style={{ borderColor: c.c }}>
            <div className="mb-1 text-xs font-bold uppercase tracking-wide" style={{ color: c.c }}>
              {c.t}
            </div>
            {c.l.map((x) => (
              <p key={x}>{x}</p>
            ))}
          </div>
        ))}
      </div>
      <Note>Los sensores resistivos (LDR, NTC) se conectan en un <strong>divisor de tensión</strong> con una resistencia fija de 10 kΩ a 5 V. El ultrasonidos mide el tiempo de ida y vuelta: d = v·t/2. Modelos simplificados (LDR: R = 500 000/(lux+10) Ω; NTC de 10 kΩ, β = 3 950 K).</Note>
    </Frame>
  );
}

/* ───────────── 6.4 Actuadores ───────────── */

export function ActuadoresExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: Math.round(num(block.params?.n, 0, 0, 2)), V: Math.round(num(block.params?.a, 9, 0, 12)), carga: 10, pulso: num(block.params?.b, 1.5, 1, 2), vb: 5, W: 1000 };
  const [s, setS] = useState(init);
  const rpm0 = (600 * s.V) / 12;
  const par0 = (40 * s.V) / 12;
  const rpm = par0 > 0 ? Math.max(0, rpm0 * (1 - s.carga / par0)) : 0;
  const parado = rpm <= 0 && s.V > 0;
  const omega = (2 * Math.PI * rpm) / 60;
  const pMec = (s.carga / 100) * omega;
  const angulo = (clamp(s.pulso, 1, 2) - 1) * 180;
  const activo = s.vb >= 3.5;
  const iCarga = s.W / 230;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada actuador convierte una señal de control en una acción física: el motor, en giro; el servo, en una posición; el relé, en un contacto que maneja una carga mayor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Actuador" items={[{ value: 0, label: "Motor de CC" }, { value: 1, label: "Servomotor" }, { value: 2, label: "Relé" }]} value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} />
          {s.tipo === 0 ? (
            <>
              <Slider label="Tensión aplicada" value={s.V} min={0} max={12} unit=" V" color={MANIM.yellow} onChange={(V) => setS((x) => ({ ...x, V }))} />
              <Slider label="Par resistente de la carga" value={s.carga} min={0} max={40} unit=" N·cm" color={MANIM.red} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
            </>
          ) : null}
          {s.tipo === 1 ? <Slider label="Ancho del pulso PWM (periodo 20 ms)" value={s.pulso} min={1} max={2} step={0.05} unit=" ms" format={f2} color={MANIM.yellow} onChange={(pulso) => setS((x) => ({ ...x, pulso }))} /> : null}
          {s.tipo === 2 ? (
            <>
              <Slider label="Tensión de la bobina" value={s.vb} min={0} max={6} step={0.1} unit=" V" format={f1} color={MANIM.yellow} onChange={(vb) => setS((x) => ({ ...x, vb }))} />
              <Slider label="Potencia de la carga (230 V)" value={s.W} min={100} max={4000} step={100} unit=" W" format={f0} color={MANIM.orange} onChange={(W) => setS((x) => ({ ...x, W }))} />
            </>
          ) : null}
        </>
      }
    >
      {s.tipo === 0 ? (
        <Readout>
          <Stat color={MANIM.green} label="Velocidad con esa carga">
            {f0(rpm)} rpm {parado ? "(calado)" : ""}
          </Stat>
          <Stat color={MANIM.blue} label="Velocidad en vacío">
            {f0(rpm0)} rpm
          </Stat>
          <Stat color={MANIM.orange} label="Par máximo (a rotor parado)">
            {f1(par0)} N·cm
          </Stat>
          <Stat color={MANIM.purple} label="Potencia mecánica">
            {f2(pMec)} W
          </Stat>
        </Readout>
      ) : null}
      {s.tipo === 1 ? (
        <>
          <Svg w={520} h={150} maxH={160} testId="tool-servo">
            <path d="M 160 130 A 100 100 0 0 1 360 130" fill="none" stroke={MANIM.grid} strokeWidth={3} />
            <line x1={260} y1={130} x2={260 - 90 * Math.cos((angulo * Math.PI) / 180)} y2={130 - 90 * Math.sin((angulo * Math.PI) / 180)} stroke={MANIM.green} strokeWidth={6} strokeLinecap="round" className="anim-t" />
            <circle cx={260} cy={130} r={8} fill={MANIM.yellow} />
          </Svg>
          <Readout>
            <Stat color={MANIM.green} label="Ángulo del eje">
              {f0(angulo)} °
            </Stat>
            <Stat color={MANIM.yellow} label="Ciclo de trabajo">
              {f1((s.pulso / 20) * 100)} %
            </Stat>
          </Readout>
        </>
      ) : null}
      {s.tipo === 2 ? (
        <Readout>
          <Stat color={activo ? MANIM.green : MANIM.muted} label="Estado del relé">
            {activo ? "Activado (contacto cerrado)" : "Reposo (contacto abierto)"}
          </Stat>
          <Stat color={iCarga > 10 ? MANIM.red : MANIM.blue} label="Corriente por el contacto">
            {f1(iCarga)} A {iCarga > 10 ? "(supera los 10 A del contacto)" : ""}
          </Stat>
        </Readout>
      ) : null}
      <Note>
        {s.tipo === 0 ? "El motor de CC pierde velocidad al cargarlo y, si la carga iguala su par máximo, se cala: la corriente se dispara. Modelo lineal simplificado." : s.tipo === 1 ? "Un servo recibe pulsos de 1 a 2 ms cada 20 ms: el ancho del pulso fija el ángulo (1 ms = 0°, 1,5 ms = 90°, 2 ms = 180°)." : "El relé permite que una señal débil (5 V, decenas de mA) maneje una carga de red. Tiene un umbral de activación y una corriente máxima de contacto."}
      </Note>
    </Frame>
  );
}

/* ───────────── 6.5 Placa programable virtual ───────────── */

export function PlacaVirtualExplorador({ block }: { block: ToolBlock }) {
  const init = { lux: Math.round(num(block.params?.a, 300, 0, 1000)), umbral: Math.round(num(block.params?.b, 400, 0, 1023)), modo: Math.round(num(block.params?.n, 0, 0, 1)) };
  const [s, setS] = useState(init);
  const { adcLdr } = lecturasSensores(s.lux, 25, 100);
  const oscuro = adcLdr < s.umbral;
  const duty = s.modo === 0 ? (oscuro ? 255 : 0) : Math.round(255 - (adcLdr / 1023) * 255);
  const lineas = s.modo === 0 ? ["int luz = analogRead(A0);", `if (luz < ${s.umbral}) {`, "  digitalWrite(LED, HIGH);", "} else {", "  digitalWrite(LED, LOW);", "}"] : ["int luz = analogRead(A0);", "int brillo = map(luz, 0, 1023, 255, 0);", "analogWrite(LED, brillo);"];
  const activas = s.modo === 0 ? (oscuro ? [0, 1, 2] : [0, 1, 3, 4]) : [0, 1, 2];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El programa lee la entrada analógica (0–1023) y actúa sobre la salida. En modo todo/nada decide con un umbral; en modo proporcional, la luz del LED sigue a la oscuridad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Luz sobre el LDR" value={s.lux} min={0} max={1000} step={10} unit=" lux" color={MANIM.yellow} onChange={(lux) => setS((x) => ({ ...x, lux }))} />
          <Slider label="Umbral del programa" value={s.umbral} min={0} max={1023} step={10} color={MANIM.orange} disabled={s.modo === 1} onChange={(umbral) => setS((x) => ({ ...x, umbral }))} />
          <Choice label="Programa" items={[{ value: 0, label: "Todo o nada (digitalWrite)" }, { value: 1, label: "Proporcional (analogWrite, PWM)" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
        </>
      }
    >
      <pre className="overflow-x-auto rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/30 p-2 font-mono text-sm leading-6 text-[color:var(--stage-ink,#fff)]" data-testid="placa-codigo">
        {lineas.map((l, i) => (
          <div key={i} style={{ background: activas.includes(i) ? "rgba(255,216,102,0.18)" : undefined }}>
            {l}
          </div>
        ))}
      </pre>
      <Svg w={520} h={80} maxH={90} testId="tool-placa">
        <circle cx={260} cy={40} r={26} fill={MANIM.yellow} fillOpacity={duty / 255} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={310} y={46} fill={MANIM.muted} fontSize={14}>
          LED al {Math.round((duty / 255) * 100)} %
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="analogRead(A0)">
          {adcLdr}
        </Stat>
        <Stat color={MANIM.green} label={s.modo === 0 ? "Salida digital" : "Salida PWM (0–255)"}>
          {s.modo === 0 ? (oscuro ? "HIGH (LED encendido)" : "LOW (LED apagado)") : duty}
        </Stat>
      </Readout>
      <Note>El conversor A/D de 10 bits convierte 0–5 V en 0–1023. Con el LDR en un divisor de tensión, más luz da una lectura mayor. El programa es solo una ilustración en lenguaje de Arduino: aquí no se ejecuta código real.</Note>
    </Frame>
  );
}

/* ───────────── 6.6 Señal analógica, umbral y histéresis ───────────── */

export function simulaComparador(amp: number, freq: number, ruido: number, umbral: number, histeresis: number) {
  const N = 400;
  const s: number[] = [];
  const out: number[] = [];
  let estado = 0;
  let cambios = 0;
  for (let i = 0; i < N; i += 1) {
    const t = i / N;
    const v = clamp(2.5 + amp * Math.sin(2 * Math.PI * freq * t) + (hash(i, 7) - 0.5) * 2 * ruido, 0, 5);
    s.push(v);
    const nuevo = histeresis > 0 ? (estado === 0 ? (v > umbral + histeresis / 2 ? 1 : 0) : v < umbral - histeresis / 2 ? 0 : 1) : v > umbral ? 1 : 0;
    if (i > 0 && nuevo !== estado) cambios += 1;
    estado = nuevo;
    out.push(estado);
  }
  return { s, out, cambios };
}

export function SenalUmbralExplorador({ block }: { block: ToolBlock }) {
  const init = { amp: num(block.params?.a, 2, 0.5, 2.5), freq: Math.round(num(block.params?.b, 2, 1, 6)), ruido: num(block.params?.c, 0.1, 0, 1), umbral: 2.5, hist: 0 };
  const [st, setSt] = useState(init);
  const r = useMemo(() => simulaComparador(st.amp, st.freq, st.ruido, st.umbral, st.hist), [st]);
  const X = (i: number) => 40 + (i / 399) * 460;
  const Y = (v: number) => 130 - (v / 5) * 110;
  const traza = r.s.map((v, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${Y(v).toFixed(1)}`).join(" ");
  const digital = r.out.map((v, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${200 - v * 30}`).join(" ");
  const ideal = 2 * st.freq;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con ruido, la señal cruza el umbral muchas veces y la salida digital «tiembla». La histéresis (dos umbrales) lo evita a costa de reaccionar algo más tarde."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Slider label="Amplitud de la señal" value={st.amp} min={0.5} max={2.5} step={0.1} unit=" V" format={f1} color={MANIM.blue} onChange={(amp) => setSt((x) => ({ ...x, amp }))} />
          <Slider label="Frecuencia" value={st.freq} min={1} max={6} unit=" Hz" color={MANIM.green} onChange={(freq) => setSt((x) => ({ ...x, freq }))} />
          <Slider label="Ruido" value={st.ruido} min={0} max={1} step={0.05} unit=" V" format={f2} color={MANIM.red} onChange={(ruido) => setSt((x) => ({ ...x, ruido }))} />
          <Slider label="Umbral" value={st.umbral} min={0.5} max={4.5} step={0.1} unit=" V" format={f1} color={MANIM.yellow} onChange={(umbral) => setSt((x) => ({ ...x, umbral }))} />
          <Slider label="Banda de histéresis" value={st.hist} min={0} max={1} step={0.1} unit=" V" format={f1} color={MANIM.orange} onChange={(hist) => setSt((x) => ({ ...x, hist }))} />
        </>
      }
    >
      <Svg w={520} h={215} maxH={225} testId="tool-umbral">
        <line x1={40} y1={Y(st.umbral)} x2={500} y2={Y(st.umbral)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 4" />
        {st.hist > 0 ? (
          <>
            <line x1={40} y1={Y(st.umbral + st.hist / 2)} x2={500} y2={Y(st.umbral + st.hist / 2)} stroke={MANIM.orange} strokeWidth={1} strokeDasharray="2 3" />
            <line x1={40} y1={Y(st.umbral - st.hist / 2)} x2={500} y2={Y(st.umbral - st.hist / 2)} stroke={MANIM.orange} strokeWidth={1} strokeDasharray="2 3" />
          </>
        ) : null}
        <path d={traza} fill="none" stroke={MANIM.blue} strokeWidth={1.8} />
        <path d={digital} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
        <text x={44} y={150} fill={MANIM.blue} fontSize={11}>
          señal física (V)
        </text>
        <text x={44} y={212} fill={MANIM.green} fontSize={11}>
          lectura digital (0/1)
        </text>
      </Svg>
      <Readout>
        <Stat color={r.cambios > ideal + 1 ? MANIM.red : MANIM.green} label="Cambios de la salida en 1 s">
          {r.cambios}
        </Stat>
        <Stat color={MANIM.blue} label="Cambios ideales (sin ruido)">
          {ideal}
        </Stat>
      </Readout>
      <Note>{r.cambios > ideal + 1 ? "La salida cambia mucho más de lo debido por culpa del ruido: un relé conectado aquí se estropearía. Prueba la histéresis." : "La salida sigue a la señal sin cambios espurios."} Señal y ruido son <strong>simulados</strong> de forma determinista.</Note>
    </Frame>
  );
}

/* ───────────── 6.7 Lógica de una alarma ───────────── */

const REGLAS_ALARMA = [
  { n: "Correcta: armada y (puerta o ventana o movimiento)", f: (a: number, p: number, v: number, m: number) => a && (p || v || m) },
  { n: "Defectuosa A: suena si puerta y ventana a la vez", f: (a: number, p: number, v: number) => a && p && v },
  { n: "Defectuosa B: ignora el armado", f: (_a: number, p: number, v: number, m: number) => p || v || m },
];

export function CompuertasAlarmaExplorador({ block }: { block: ToolBlock }) {
  const init = { e: [1, 0, 0, 0], regla: Math.round(num(block.params?.n, 0, 0, 2)) };
  const [s, setS] = useState(init);
  const regla = REGLAS_ALARMA[s.regla]!;
  const suena = regla.f(s.e[0]!, s.e[1]!, s.e[2]!, s.e[3]!) ? 1 : 0;
  const filas = Array.from({ length: 16 }, (_, k) => [(k >> 3) & 1, (k >> 2) & 1, (k >> 1) & 1, k & 1]);
  const actual = (s.e[0]! << 3) | (s.e[1]! << 2) | (s.e[2]! << 1) | s.e[3]!;
  const nombres = ["Armada", "Puerta", "Ventana", "Movimiento"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa y desactiva sensores y observa la salida. Compara la regla correcta con las defectuosas: ¿qué combinaciones de la tabla de verdad fallan?"}
      onReset={() => setS(init)}
      controls={
        <>
          {nombres.map((n, i) => (
            <Choice key={n} label={n} items={[{ value: 0, label: "0 (desactivada)" }, { value: 1, label: "1 (activa)" }]} value={s.e[i]!} onChange={(v) => setS((x) => ({ ...x, e: x.e.map((y, j) => (j === i ? v : y)) }))} />
          ))}
          <Choice label="Regla de control" items={REGLAS_ALARMA.map((r, i) => ({ value: i, label: r.n }))} value={s.regla} onChange={(regla2) => setS((x) => ({ ...x, regla: regla2 }))} />
        </>
      }
    >
      <Readout>
        <Stat color={suena ? MANIM.red : MANIM.green} label="Sirena">
          {suena ? "SUENA (1)" : "Silencio (0)"}
        </Stat>
      </Readout>
      <div className="max-h-56 overflow-y-auto">
        <table className="w-full text-center text-sm text-[color:var(--stage-ink,#fff)]" data-testid="alarma-tabla">
          <thead>
            <tr className="text-[color:var(--stage-muted,#b8c2d0)]">
              {nombres.map((n) => (
                <th key={n}>{n}</th>
              ))}
              <th>Sirena</th>
              <th>Correcta</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f, k) => {
              const out = regla.f(f[0]!, f[1]!, f[2]!, f[3]!) ? 1 : 0;
              const ok = REGLAS_ALARMA[0]!.f(f[0]!, f[1]!, f[2]!, f[3]!) ? 1 : 0;
              return (
                <tr key={k} className="border-t border-[color:var(--stage-border,#3d4f66)]" style={{ background: k === actual ? "rgba(255,216,102,0.2)" : undefined }}>
                  {f.map((b, i) => (
                    <td key={i}>{b}</td>
                  ))}
                  <td className="font-bold" style={{ color: out ? MANIM.red : MANIM.green }}>
                    {out}
                  </td>
                  <td style={{ color: out === ok ? MANIM.muted : MANIM.red }}>{out === ok ? ok : `${ok} ✗`}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <Note>La regla correcta es S = A · (P + V + M): una puerta AND con una OR de tres entradas. Una tabla de verdad con 4 entradas tiene 2⁴ = 16 combinaciones.</Note>
    </Frame>
  );
}

/* ───────────── 6.8 Termostato: lazo abierto frente a cerrado ───────────── */

export function simulaTermostato(tref: number, text: number, hist: number, ventana: boolean) {
  const C = 4e5; // J/K
  const P = 4000; // W
  const dt = 60; // s
  const pasos = 360; // 6 h
  const kNom = 120;
  const uAbierto = clamp((kNom * (tref - text)) / P, 0, 1);
  let tA = text;
  let tC = text;
  let on = true;
  const A: number[] = [];
  const Cc: number[] = [];
  for (let i = 0; i < pasos; i += 1) {
    const k = ventana && i >= 180 && i < 240 ? kNom * 2 : kNom;
    tA += ((P * uAbierto - k * (tA - text)) / C) * dt;
    if (tC > tref + hist / 2) on = false;
    else if (tC < tref - hist / 2) on = true;
    tC += ((on ? P : 0) - k * (tC - text)) / C * dt;
    A.push(tA);
    Cc.push(tC);
  }
  return { A, C: Cc, uAbierto };
}

export function TermostatoLazoExplorador({ block }: { block: ToolBlock }) {
  const init = { tref: Math.round(num(block.params?.a, 21, 16, 26)), text: Math.round(num(block.params?.b, 5, -5, 15)), hist: 1, ventana: num(block.params?.n, 1, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  const r = useMemo(() => simulaTermostato(s.tref, s.text, s.hist, s.ventana), [s]);
  const X = (i: number) => 50 + (i / 359) * 450;
  const Y = (t: number) => 190 - ((t - 0) / 30) * 170;
  const camino = (d: number[]) => d.map((v, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${Y(clamp(v, 0, 30)).toFixed(1)}`).join(" ");
  const minA = Math.min(...r.A.slice(200, 260));
  const minC = Math.min(...r.C.slice(200, 260));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos sistemas calientan la misma habitación. El de lazo abierto da una potencia fija; el de lazo cerrado mide y corrige. Abre la ventana entre la hora 3 y la 4 y compara."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Temperatura deseada" value={s.tref} min={16} max={26} unit=" °C" color={MANIM.yellow} onChange={(tref) => setS((x) => ({ ...x, tref }))} />
          <Slider label="Temperatura exterior" value={s.text} min={-5} max={15} unit=" °C" color={MANIM.blue} onChange={(text) => setS((x) => ({ ...x, text }))} />
          <Slider label="Histéresis del termostato" value={s.hist} min={0.2} max={3} step={0.2} unit=" °C" format={f1} color={MANIM.orange} onChange={(hist) => setS((x) => ({ ...x, hist }))} />
          <Choice label="Perturbación" items={[{ value: 0, label: "Ninguna" }, { value: 1, label: "Ventana abierta (h 3–4)" }]} value={s.ventana ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, ventana: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={225} maxH={235} testId="tool-termostato">
        <line x1={50} y1={190} x2={500} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={190} x2={50} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={Y(s.tref)} x2={500} y2={Y(s.tref)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 4" />
        {s.ventana ? <rect x={X(180)} y={20} width={X(240) - X(180)} height={170} fill={MANIM.blue} fillOpacity={0.12} /> : null}
        <path d={camino(r.A)} fill="none" stroke={MANIM.red} strokeWidth={2.5} />
        <path d={camino(r.C)} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
        {[0, 1, 2, 3, 4, 5, 6].map((h) => (
          <text key={h} x={X(h * 60 - (h === 6 ? 1 : 0))} y={208} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
            {h} h
          </text>
        ))}
        <text x={56} y={30} fill={MANIM.muted} fontSize={11}>
          temperatura de la habitación (0–30 °C)
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Lazo abierto: mínima durante la perturbación">
          {f1(minA)} °C
        </Stat>
        <Stat color={MANIM.green} label="Lazo cerrado: mínima durante la perturbación">
          {f1(minC)} °C
        </Stat>
        <Stat color={MANIM.orange} label="Potencia fija del lazo abierto">
          {f0(r.uAbierto * 100)} %
        </Stat>
      </Readout>
      <Note>Rojo: lazo abierto (potencia calculada para la situación normal; no se entera de la ventana). Verde: lazo cerrado con termostato todo/nada con histéresis. Modelo: C = 0,4 MJ/K, pérdidas 120 W/K (240 W/K con la ventana), calefactor de 4 kW.</Note>
    </Frame>
  );
}

/* ───────────── 6.9 Línea de clasificación ───────────── */

const PIEZAS_LINEA = [12, 25, 8, 30, 15, 22, 9, 28, 18, 26];

export function evaluaLinea(umbral: number, v: number) {
  const clasif = PIEZAS_LINEA.map((h) => ({ h, real: h >= 20, dec: h >= umbral }));
  const errores = clasif.filter((c) => c.real !== c.dec).length;
  const dist = 0.5; // sensor → pistón (m)
  const tLlegada = dist / v;
  const tNecesario = 0.1 + 0.4; // reacción + carrera del pistón (s)
  const separacion = 0.3 / v; // entre piezas (s)
  return { clasif, errores, tLlegada, tNecesario, okTiempo: tLlegada >= tNecesario, okRitmo: separacion >= 0.8, separacion };
}

export function LineaClasificacionExplorador({ block }: { block: ToolBlock }) {
  const init = { umbral: Math.round(num(block.params?.a, 20, 5, 35)), v: num(block.params?.b, 0.3, 0.1, 1) };
  const [s, setS] = useState(init);
  const r = evaluaLinea(s.umbral, s.v);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos condiciones deben cumplirse a la vez: que el umbral del sensor separe bien las piezas y que la cinta no vaya tan rápido que el pistón no llegue a tiempo. Diagnostica cada fallo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Umbral de altura del sensor (grandes ≥ 20 cm)" value={s.umbral} min={5} max={35} unit=" cm" color={MANIM.yellow} onChange={(umbral) => setS((x) => ({ ...x, umbral }))} />
          <Slider label="Velocidad de la cinta" value={s.v} min={0.1} max={1} step={0.05} unit=" m/s" format={f2} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <div className="flex flex-wrap gap-2" data-testid="linea-piezas">
        {r.clasif.map((c, i) => (
          <div key={i} className="rounded-md border px-2 py-1 text-sm text-[color:var(--stage-ink,#fff)]" style={{ borderColor: c.real === c.dec ? MANIM.green : MANIM.red }}>
            {c.h} cm → {c.dec ? "grande" : "pequeña"} {c.real === c.dec ? "✓" : "✗"}
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={r.errores === 0 ? MANIM.green : MANIM.red} label="Piezas mal clasificadas">
          {r.errores} de {PIEZAS_LINEA.length}
        </Stat>
        <Stat color={r.okTiempo ? MANIM.green : MANIM.red} label="Tiempo hasta el pistón / necesario">
          {f2(r.tLlegada)} s / {f2(r.tNecesario)} s
        </Stat>
        <Stat color={r.okRitmo ? MANIM.green : MANIM.red} label="Tiempo entre piezas / ciclo del pistón">
          {f2(r.separacion)} s / 0,8 s
        </Stat>
      </Readout>
      <Note>
        {r.errores > 0 ? "Fallo de calibración: el umbral del sensor no coincide con el criterio de clasificación. " : ""}
        {!r.okTiempo ? "Fallo de secuencia: la pieza llega al pistón antes de que éste pueda actuar. " : ""}
        {!r.okRitmo ? "Fallo de ritmo: llega otra pieza antes de que el pistón haya vuelto a su posición. " : ""}
        {r.errores === 0 && r.okTiempo && r.okRitmo ? "La línea funciona: clasificación correcta y tiempos compatibles. " : ""}Distancia sensor–pistón 0,5 m, reacción del controlador 0,1 s, carrera del pistón 0,4 s, separación entre piezas 0,3 m.
      </Note>
    </Frame>
  );
}

/* ───────────── 6.10 Robot en una cuadrícula ───────────── */

const MAPAS = [
  { obst: [[2, 0], [2, 1], [2, 2], [4, 3], [4, 4], [1, 4]] as [number, number][], meta: [5, 5] as [number, number] },
  { obst: [[1, 1], [3, 2], [3, 3], [3, 4], [5, 1]] as [number, number][], meta: [5, 5] as [number, number] },
];
const DIRS: [number, number][] = [[1, 0], [0, 1], [-1, 0], [0, -1]]; // este, sur, oeste, norte (y crece hacia abajo)
const FLECHA = ["→", "↓", "←", "↑"];
type Cmd = "A" | "A3" | "I" | "D";

export function ejecutaRobot(prog: Cmd[], mapa: number) {
  const m = MAPAS[mapa]!;
  let x = 0;
  let y = 0;
  let d = 0;
  const camino: [number, number, number][] = [[x, y, d]];
  let choque: string | null = null;
  for (const c of prog) {
    if (c === "I") d = (d + 3) % 4;
    else if (c === "D") d = (d + 1) % 4;
    else {
      for (let k = 0; k < (c === "A3" ? 3 : 1); k += 1) {
        const nx = x + DIRS[d]![0];
        const ny = y + DIRS[d]![1];
        if (nx < 0 || ny < 0 || nx > 5 || ny > 5) {
          choque = "se sale del tablero";
          break;
        }
        if (m.obst.some(([ox, oy]) => ox === nx && oy === ny)) {
          choque = "choca con un obstáculo";
          break;
        }
        x = nx;
        y = ny;
        camino.push([x, y, d]);
      }
    }
    if (choque) break;
    camino.push([x, y, d]);
  }
  return { x, y, d, camino, choque, meta: x === m.meta[0] && y === m.meta[1] };
}

export function RobotCuadriculaExplorador({ block }: { block: ToolBlock }) {
  const mapa = Math.round(num(block.params?.n, 0, 0, MAPAS.length - 1));
  const m = MAPAS[mapa]!;
  const [prog, setProg] = useState<Cmd[]>([]);
  const [ver, setVer] = useState(false);
  const r = ejecutaRobot(prog, mapa);
  const add = (c: Cmd) => {
    setProg((p) => (p.length < 30 ? [...p, c] : p));
    setVer(false);
  };
  const etiqueta: Record<Cmd, string> = { A: "Avanzar", A3: "Avanzar ×3", I: "Girar izq.", D: "Girar der." };
  const S = 40;
  const posR = ver ? r : { x: 0, y: 0, d: 0 };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Programa al robot con una secuencia de órdenes para llegar de la esquina superior izquierda a la meta, sin chocar. Ejecuta y corrige: es el ciclo de depuración."}
      onReset={() => {
        setProg([]);
        setVer(false);
      }}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Órdenes">
          {(["A", "A3", "I", "D"] as Cmd[]).map((c) => (
            <button key={c} type="button" className={TOOL_BTN} onClick={() => add(c)}>
              {etiqueta[c]}
            </button>
          ))}
          <button type="button" className={TOOL_BTN} onClick={() => { setProg((p) => p.slice(0, -1)); setVer(false); }} disabled={!prog.length}>
            Borrar la última
          </button>
          <button type="button" className={TOOL_BTN} onClick={() => setVer(true)} disabled={!prog.length}>
            Ejecutar programa
          </button>
        </div>
      }
    >
      <Svg w={260} h={250} maxH={260} testId="tool-robot">
        {Array.from({ length: 6 }, (_, j) => Array.from({ length: 6 }, (_, i) => <rect key={`${i}-${j}`} x={10 + i * S} y={5 + j * S} width={S - 2} height={S - 2} fill={MANIM.surface} stroke={MANIM.grid} />))}
        {m.obst.map(([ox, oy]) => (
          <rect key={`${ox}${oy}`} x={10 + ox * S} y={5 + oy * S} width={S - 2} height={S - 2} fill={MANIM.red} fillOpacity={0.55} />
        ))}
        <rect x={10 + m.meta[0] * S} y={5 + m.meta[1] * S} width={S - 2} height={S - 2} fill={MANIM.green} fillOpacity={0.5} />
        {ver
          ? r.camino.map(([cx, cy], k) => <circle key={k} cx={10 + cx * S + S / 2 - 1} cy={5 + cy * S + S / 2 - 1} r={3} fill={MANIM.yellow} fillOpacity={0.6} />)
          : null}
        <text x={10 + posR.x * S + S / 2 - 1} y={5 + posR.y * S + S / 2 + 8} textAnchor="middle" fill={MANIM.yellow} fontSize={26} fontWeight={700}>
          {FLECHA[posR.d]}
        </text>
      </Svg>
      <p className="font-mono text-sm text-[color:var(--stage-ink,#fff)]" data-testid="robot-programa">
        {prog.length ? prog.map((c) => ({ A: "A", A3: "A×3", I: "I", D: "D" })[c]).join(" · ") : "(programa vacío)"}
      </p>
      <Readout>
        <Stat color={MANIM.blue} label="Órdenes del programa">
          {prog.length}
        </Stat>
        <Stat color={ver ? (r.meta ? MANIM.green : r.choque ? MANIM.red : MANIM.yellow) : MANIM.muted} label="Resultado">
          {!ver ? "sin ejecutar" : r.choque ? `El robot ${r.choque}` : r.meta ? "¡Ha llegado a la meta!" : "Termina fuera de la meta"}
        </Stat>
      </Readout>
      <Note>Rojo: obstáculos. Verde: meta. El robot empieza arriba a la izquierda mirando al este (→). Cada «Avanzar» mueve una casilla.</Note>
    </Frame>
  );
}
