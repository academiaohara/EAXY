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

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export type ModoReg = 0 | 1 | 2 | 3;
export const MODOS_REG = ["Todo-nada (con histéresis)", "Proporcional (P)", "Proporcional + integral (PI)", "PID"] as const;
export type ParamsReg = { modo: ModoReg; sp: number; amb: number; kp: number; ki: number; kd: number; hist: number };

/** Simula una habitación con calefactor (planta de primer orden) controlada por distintos reguladores. */
export function simulaRegulacion(p: ParamsReg, pasos = 240) {
  const K = 40;
  const tau = 30;
  const retardo = 3; // el calor tarda en llegar al sensor
  let T = p.amb;
  let u = 0;
  let integ = 0;
  let tPrev = T;
  const cola: number[] = Array.from({ length: retardo }, () => 0);
  const temp: number[] = [];
  const pot: number[] = [];
  for (let k = 0; k < pasos; k++) {
    const e = p.sp - T;
    if (p.modo === 0) {
      if (T < p.sp - p.hist) u = 1;
      else if (T > p.sp + p.hist) u = 0;
    } else {
      const d = p.modo === 3 ? -0.1 * p.kd * (T - tPrev) : 0; // derivada sobre la medida
      let v = p.kp * e + d;
      if (p.modo >= 2) {
        const sinSaturar = v + p.ki * integ;
        // anti-windup: no se integra mientras la salida está saturada
        if (!(sinSaturar > 1 && e > 0) && !(sinSaturar < 0 && e < 0)) integ += e;
        v += p.ki * integ;
      }
      u = Math.max(0, Math.min(1, v));
    }
    tPrev = T;
    temp.push(T);
    pot.push(u);
    cola.push(u);
    const uEf = cola.shift()!;
    T += (p.amb + K * uEf - T) / tau;
  }
  return { temp, pot };
}

export function metricasReg(temp: readonly number[], sp: number) {
  const fin = temp.slice(-20).reduce((a, b) => a + b, 0) / Math.max(1, Math.min(20, temp.length));
  const sobre = Math.max(0, Math.max(...temp) - sp);
  let t98 = -1;
  for (let k = temp.length - 1; k >= 0; k--) {
    if (Math.abs(temp[k]! - sp) > 0.5) {
      t98 = k + 1 < temp.length ? k + 1 : -1;
      break;
    }
    if (k === 0) t98 = 0;
  }
  return { final: fin, error: sp - fin, sobre, establecimiento: t98 };
}

/** Revoluciones por minuto a partir de los pulsos de un encoder contados en un intervalo. */
export const rpmEncoder = (pulsos: number, ppr: number, ms: number) => (ppr > 0 && ms > 0 ? (pulsos / ppr) * (60000 / ms) : 0);
/** Velocidad lineal (m/s) de una rueda de diámetro d (mm). */
export const velocidadLineal = (rpm: number, dMm: number) => (Math.PI * (dMm / 1000) * rpm) / 60;
/** Potencia mecánica (W) con par en N·m. */
export const potenciaMecanica = (parNm: number, rpm: number) => parNm * ((2 * Math.PI * rpm) / 60);

/** Cinemática de un robot de tracción diferencial tras t segundos. */
export function cinematicaDiferencial(vl: number, vr: number, ancho: number, t: number) {
  const v = (vl + vr) / 2;
  const w = ancho > 0 ? (vr - vl) / ancho : 0;
  if (Math.abs(w) < 1e-9) return { v, w: 0, x: v * t, y: 0, theta: 0, radio: Infinity };
  const th = w * t;
  return { v, w, x: (v / w) * Math.sin(th), y: (v / w) * (1 - Math.cos(th)), theta: th, radio: v / w };
}

export const PROTOCOLOS = [
  { n: "Bluetooth LE", alcance: 30, bajo: true, kbps: 1000 },
  { n: "Wi-Fi", alcance: 50, bajo: false, kbps: 100000 },
  { n: "Zigbee", alcance: 100, bajo: true, kbps: 250 },
  { n: "LoRa", alcance: 10000, bajo: true, kbps: 10 },
  { n: "4G / 5G", alcance: 10000, bajo: false, kbps: 50000 },
];
export const protocolosValidos = (alcanceM: number, bajoConsumo: boolean, kbps: number) => PROTOCOLOS.filter((p) => p.alcance >= alcanceM && p.kbps >= kbps && (!bajoConsumo || p.bajo));

export const ETAPAS = ["E0 · Reposo", "E1 · La cinta avanza", "E2 · El taladro baja", "E3 · El taladro sube"] as const;
export type EntradasSeq = { pulsador: boolean; pieza: boolean; abajo: boolean; arriba: boolean };
/** Siguiente etapa de la secuencia (GRAFCET) de una taladradora automática. */
export function siguienteEtapa(etapa: number, e: EntradasSeq) {
  if (etapa === 0 && e.pulsador) return 1;
  if (etapa === 1 && e.pieza) return 2;
  if (etapa === 2 && e.abajo) return 3;
  if (etapa === 3 && e.arriba) return 0;
  return etapa;
}
export const salidasEtapa = (etapa: number) => ({ cinta: etapa === 1, bajar: etapa === 2, subir: etapa === 3 });

/* ───────────── 1. Reguladores ───────────── */

export function ReguladorExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 3)) as ModoReg, sp: 22, amb: Math.round(num(block.params?.a, 5, -5, 15)), kp: 0.3, ki: 0.01, kd: 2, hist: 1 };
  const [s, setS] = useState(init);
  const { temp, pot } = simulaRegulacion(s);
  const m = metricasReg(temp, s.sp);
  const X = (k: number) => 30 + (k / (temp.length - 1)) * 460;
  const Y = (t: number) => 140 - (Math.max(0, Math.min(50, t)) / 50) * 125;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el tipo de regulador y ajusta sus parámetros. La curva naranja es la temperatura; la línea discontinua, la consigna."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Regulador" items={MODOS_REG.map((x, value) => ({ value: value as ModoReg, label: x }))} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="Consigna" value={s.sp} min={15} max={30} step={1} unit=" °C" color={MANIM.green} onChange={(sp) => setS((x) => ({ ...x, sp }))} />
          {s.modo === 0 ? <Slider label="Histéresis ±" value={s.hist} min={0.5} max={5} step={0.5} unit=" °C" color={MANIM.yellow} onChange={(hist) => setS((x) => ({ ...x, hist }))} /> : null}
          {s.modo >= 1 ? <Slider label="Ganancia proporcional Kp" value={s.kp} min={0.02} max={1} step={0.02} color={MANIM.blue} onChange={(kp) => setS((x) => ({ ...x, kp }))} /> : null}
          {s.modo >= 2 ? <Slider label="Ganancia integral Ki" value={s.ki} min={0.002} max={0.05} step={0.002} color={MANIM.orange} onChange={(ki) => setS((x) => ({ ...x, ki }))} /> : null}
          {s.modo === 3 ? <Slider label="Ganancia derivativa Kd" value={s.kd} min={0} max={5} step={0.5} color={MANIM.purple} onChange={(kd) => setS((x) => ({ ...x, kd }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={160} testId="regulador" maxH={180}>
        <line x1={30} y1={Y(s.sp)} x2={490} y2={Y(s.sp)} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="5 4" />
        <polyline points={pot.map((u, k) => `${X(k)},${150 - u * 30}`).join(" ")} fill="none" stroke={MANIM.blue} strokeOpacity={0.5} strokeWidth={1.5} />
        <polyline points={temp.map((t, k) => `${X(k)},${Y(t)}`).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={2.5} />
        <text x={32} y={12} fill={MANIM.muted} fontSize={10}>
          temperatura (naranja) y potencia del calefactor (azul)
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Temperatura final">{f1(m.final)} °C</Stat>
        <Stat color={Math.abs(m.error) < 0.5 ? MANIM.green : MANIM.red} label="Error final">{f1(m.error)} °C</Stat>
        <Stat color={MANIM.purple} label="Sobreoscilación">{f1(m.sobre)} °C</Stat>
        <Stat color={MANIM.blue} label="Tiempo hasta estabilizarse">{m.establecimiento >= 0 ? `${m.establecimiento} min` : "no se estabiliza"}</Stat>
      </Readout>
      <Note>El <b>todo-nada</b> oscila en torno a la consigna; el <b>proporcional</b> actúa en proporción al error pero deja un error permanente; el <b>integral</b> lo elimina acumulando el error; el <b>derivativo</b> frena la acción cuando la temperatura sube deprisa. Con una ganancia excesiva (o con el retraso del calefactor) cualquiera de ellos puede hacer oscilar el sistema: ajustar un PID es buscar un equilibrio.</Note>
    </Frame>
  );
}

/* ───────────── 2. Motor y encoder ───────────── */

export function MotorEncoderExplorador({ block }: { block: ToolBlock }) {
  const init = { pulsos: Math.round(num(block.params?.a, 50, 0, 500)), ppr: 20, d: 65, par: 0.05, i: 0.8 };
  const [s, setS] = useState(init);
  const rpm = rpmEncoder(s.pulsos, s.ppr, 100);
  const v = velocidadLineal(rpm, s.d);
  const pm = potenciaMecanica(s.par, rpm);
  const pe = 6 * s.i;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un encoder cuenta pulsos del eje. Con los pulsos de un intervalo de 100 ms se calcula la velocidad y la potencia del motor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Pulsos contados en 100 ms" value={s.pulsos} min={0} max={500} step={5} color={MANIM.blue} onChange={(pulsos) => setS((x) => ({ ...x, pulsos }))} />
          <Slider label="Pulsos por vuelta del encoder" value={s.ppr} min={5} max={100} step={5} color={MANIM.orange} onChange={(ppr) => setS((x) => ({ ...x, ppr }))} />
          <Slider label="Diámetro de la rueda" value={s.d} min={20} max={120} step={5} unit=" mm" color={MANIM.purple} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Par en el eje" value={s.par} min={0.01} max={0.3} step={0.01} unit=" N·m" color={MANIM.yellow} onChange={(par) => setS((x) => ({ ...x, par }))} />
          <Slider label="Corriente a 6 V" value={s.i} min={0.1} max={3} step={0.1} unit=" A" color={MANIM.red} onChange={(i) => setS((x) => ({ ...x, i }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad del eje">{f0(rpm)} rpm</Stat>
        <Stat color={MANIM.purple} label="Velocidad del robot">{f2(v)} m/s</Stat>
        <Stat color={MANIM.yellow} label="Potencia mecánica">{f2(pm)} W</Stat>
        <Stat color={MANIM.red} label="Potencia eléctrica">{f1(pe)} W</Stat>
        <Stat color={MANIM.green} label="Rendimiento">{pe > 0 ? `${f0(Math.min(100, (pm / pe) * 100))} %` : "—"}</Stat>
      </Readout>
      <Note>rpm = (pulsos / pulsos por vuelta) · (60 000 / intervalo en ms). La velocidad lineal es π·D·rpm/60 y la potencia mecánica, par · velocidad angular. Medir la velocidad con un encoder permite <b>cerrar el lazo</b> y corregir el PWM aunque cambie la carga.</Note>
    </Frame>
  );
}

/* ───────────── 3. Robot diferencial ───────────── */

export function RobotDiferencialExplorador({ block }: { block: ToolBlock }) {
  const init = { vl: num(block.params?.a, 0.2, -0.5, 0.5), vr: num(block.params?.b, 0.3, -0.5, 0.5), L: 0.2, t: 6 };
  const [s, setS] = useState(init);
  const fin = cinematicaDiferencial(s.vl, s.vr, s.L, s.t);
  const pts = Array.from({ length: 41 }, (_, k) => {
    const c = cinematicaDiferencial(s.vl, s.vr, s.L, (s.t * k) / 40);
    return { x: c.x, y: c.y };
  });
  const maxAbs = Math.max(0.5, ...pts.map((p) => Math.max(Math.abs(p.x), Math.abs(p.y))));
  const sc = 70 / maxAbs;
  const PX = (x: number) => 260 + x * sc;
  const PY = (y: number) => 90 - y * sc;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada rueda gira a su velocidad. Si son distintas, el robot describe un arco. Cambia las velocidades y mira la trayectoria."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad rueda izquierda" value={s.vl} min={-0.5} max={0.5} step={0.05} unit=" m/s" color={MANIM.blue} onChange={(vl) => setS((x) => ({ ...x, vl }))} />
          <Slider label="Velocidad rueda derecha" value={s.vr} min={-0.5} max={0.5} step={0.05} unit=" m/s" color={MANIM.orange} onChange={(vr) => setS((x) => ({ ...x, vr }))} />
          <Slider label="Distancia entre ruedas" value={s.L} min={0.1} max={0.4} step={0.05} unit=" m" color={MANIM.purple} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Tiempo" value={s.t} min={1} max={10} step={1} unit=" s" color={MANIM.green} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={180} testId="robot-diferencial" maxH={200}>
        <polyline points={pts.map((p) => `${PX(p.x)},${PY(p.y)}`).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={2.5} />
        <circle cx={PX(0)} cy={PY(0)} r={5} fill={MANIM.blue} />
        <circle cx={PX(fin.x)} cy={PY(fin.y)} r={6} fill={MANIM.green} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad del centro">{f2(fin.v)} m/s</Stat>
        <Stat color={MANIM.purple} label="Velocidad angular">{f2(fin.w)} rad/s</Stat>
        <Stat color={MANIM.orange} label="Radio de giro">{Number.isFinite(fin.radio) ? `${f2(Math.abs(fin.radio))} m` : "recta"}</Stat>
        <Stat color={MANIM.green} label="Posición final (x, y)">{f2(fin.x)} ; {f2(fin.y)} m</Stat>
      </Readout>
      <Note>v = (v<sub>I</sub> + v<sub>D</sub>)/2 y ω = (v<sub>D</sub> − v<sub>I</sub>)/L. Con velocidades iguales va recto; con signos opuestos gira sobre sí mismo; con una rueda más rápida describe un arco de radio v/ω. Así se programan los robots de tracción diferencial.</Note>
    </Frame>
  );
}

/* ───────────── 4. Secuencia (GRAFCET) ───────────── */

export function SecuenciaExplorador({ block }: { block: ToolBlock }) {
  const init = { etapa: Math.round(num(block.params?.n, 0, 0, 3)), e: { pulsador: false, pieza: false, abajo: false, arriba: false } as EntradasSeq };
  const [s, setS] = useState(init);
  const sal = salidasEtapa(s.etapa);
  const sig = siguienteEtapa(s.etapa, s.e);
  const claves: [keyof EntradasSeq, string][] = [["pulsador", "Pulsador de marcha"], ["pieza", "Sensor de pieza"], ["abajo", "Final de carrera abajo"], ["arriba", "Final de carrera arriba"]];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una secuencia automática se describe con etapas y transiciones. Activa las entradas y avanza un ciclo del autómata."}
      onReset={() => setS(init)}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {claves.map(([k, l]) => (
              <button key={k} type="button" className={TOOL_BTN} aria-pressed={s.e[k]} onClick={() => setS((x) => ({ ...x, e: { ...x.e, [k]: !x.e[k] } }))}>
                {l}: {s.e[k] ? "1" : "0"}
              </button>
            ))}
          </div>
          <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, etapa: sig, e: { pulsador: false, pieza: false, abajo: false, arriba: false } }))}>
            Avanzar un ciclo del autómata
          </button>
        </>
      }
    >
      <Svg w={520} h={110} testId="secuencia" maxH={130}>
        {ETAPAS.map((n, i) => (
          <g key={n}>
            <rect x={15 + i * 125} y={20} width={110} height={55} rx={6} fill={i === s.etapa ? MANIM.green : MANIM.surface} fillOpacity={i === s.etapa ? 0.6 : 0.5} stroke={i === s.etapa ? MANIM.green : MANIM.muted} strokeWidth={i === s.etapa ? 3 : 1.5} />
            <text x={70 + i * 125} y={44} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>
              {n.split(" · ")[0]}
            </text>
            <text x={70 + i * 125} y={62} textAnchor="middle" fill={MANIM.ink} fontSize={10}>
              {n.split(" · ")[1]}
            </text>
            {i < 3 ? <text x={127 + i * 125} y={52} fill={MANIM.muted} fontSize={14}>→</text> : null}
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Etapa activa">{ETAPAS[s.etapa]}</Stat>
        <Stat color={sal.cinta ? MANIM.orange : MANIM.muted} label="Motor de la cinta">{sal.cinta ? "ON" : "OFF"}</Stat>
        <Stat color={sal.bajar ? MANIM.orange : MANIM.muted} label="Taladro: bajar">{sal.bajar ? "ON" : "OFF"}</Stat>
        <Stat color={sal.subir ? MANIM.orange : MANIM.muted} label="Taladro: subir">{sal.subir ? "ON" : "OFF"}</Stat>
      </Readout>
      <Note>Cada <b>etapa</b> activa unas salidas; solo se pasa a la siguiente cuando se cumple la <b>transición</b> (la entrada correspondiente). En un PLC se programa así: es una máquina de estados. Una etapa no avanza si falta la señal que espera.</Note>
    </Frame>
  );
}

/* ───────────── 5. Protocolo IoT ───────────── */

export function ProtocoloIotExplorador({ block }: { block: ToolBlock }) {
  const init = { al: Math.round(num(block.params?.n, 1, 0, 3)), kb: 0, bajo: true };
  const [s, setS] = useState(init);
  const ALC = [10, 100, 1000, 10000];
  const KB = [1, 100, 10000];
  const ok = protocolosValidos(ALC[s.al]!, s.bajo, KB[s.kb]!);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Describe lo que necesita tu sistema (alcance, velocidad y batería) y mira qué tecnologías inalámbricas lo permiten."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Alcance necesario" items={["10 m", "100 m", "1 km", "10 km"].map((l, value) => ({ value, label: l }))} value={s.al} onChange={(al) => setS((x) => ({ ...x, al }))} />
          <Choice label="Velocidad de datos necesaria" items={["1 kbps (un sensor)", "100 kbps (audio)", "10 Mbps (vídeo)"].map((l, value) => ({ value, label: l }))} value={s.kb} onChange={(kb) => setS((x) => ({ ...x, kb }))} />
          <button type="button" className={TOOL_BTN} aria-pressed={s.bajo} onClick={() => setS((x) => ({ ...x, bajo: !x.bajo }))}>
            Funciona con pilas (bajo consumo): {s.bajo ? "sí" : "no"}
          </button>
        </>
      }
    >
      <ul className="flex flex-col gap-1" data-testid="protocolos">
        {PROTOCOLOS.map((p) => {
          const v = ok.includes(p);
          return (
            <li key={p.n} className="rounded-lg border px-3 py-1.5 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: v ? MANIM.green : "var(--stage-border,#3d4f66)", opacity: v ? 1 : 0.5 }}>
              <b>{p.n}</b>: hasta {p.alcance >= 1000 ? `${p.alcance / 1000} km` : `${p.alcance} m`}, {p.kbps >= 1000 ? `${p.kbps / 1000} Mbps` : `${p.kbps} kbps`}, {p.bajo ? "bajo consumo" : "consumo alto"} {v ? "✓" : ""}
            </li>
          );
        })}
      </ul>
      <Readout>
        <Stat color={ok.length ? MANIM.green : MANIM.red} label="Tecnologías adecuadas">{ok.length ? ok.map((p) => p.n).join(", ") : "ninguna: revisa los requisitos"}</Stat>
      </Readout>
      <Note>No existe la tecnología perfecta: más alcance y menos consumo suelen implicar menos velocidad. <b>LoRa</b> llega lejos con pilas pero envía pocos datos; <b>Wi-Fi</b> da mucha velocidad pero consume; <b>Bluetooth LE</b> y <b>Zigbee</b> son un punto medio. Valores orientativos.</Note>
    </Frame>
  );
}
