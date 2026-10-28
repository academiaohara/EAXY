"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;
const rad = (g: number): number => (g * Math.PI) / 180;

/** Trabajo (J) de una fuerza F (N) sobre un desplazamiento d (m) que forman un ángulo α (grados). */
export const trabajo = (F: number, d: number, alfa = 0): number => F * d * Math.cos(rad(alfa));
/** Potencia (W) = trabajo / tiempo. */
export const potencia = (W: number, t: number): number => (t > 0 ? W / t : NaN);
export const wAcv = (w: number): number => w / 735.5;
export const kWh = (potenciaW: number, horas: number): number => (potenciaW * horas) / 1000;

/** Altura (m) de la pista de la montaña rusa en la posición s (0–1). */
const PISTA: [number, number][] = [[0, 20], [0.35, 0], [0.55, 6], [0.75, 14], [1, 2]];
export function alturaPista(s: number): number {
  const x = Math.max(0, Math.min(1, s));
  for (let i = 1; i < PISTA.length; i++) {
    const [x1, y1] = PISTA[i]!;
    const [x0, y0] = PISTA[i - 1]!;
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return PISTA[PISTA.length - 1]![1];
}
/** Energías (J) y velocidad (m/s) de un cuerpo de masa m en la posición s, si pierde una fracción f de la energía liberada como calor. */
export function estadoPista(s: number, m: number, f: number, g = G) {
  const h0 = alturaPista(0);
  const h = alturaPista(s);
  const epPerdida = m * g * (h0 - h);
  const ec = epPerdida * (1 - f);
  const calor = epPerdida * f;
  const ep = m * g * h;
  const alcanza = ec >= -1e-9;
  return { h, ep, ec: Math.max(0, ec), calor: Math.max(0, calor), v: alcanza ? Math.sqrt((2 * Math.max(0, ec)) / m) : NaN, alcanza };
}

export const MATERIALES_C = [
  { nombre: "Agua", c: 4180 },
  { nombre: "Aceite", c: 2000 },
  { nombre: "Aluminio", c: 900 },
  { nombre: "Hierro", c: 450 },
  { nombre: "Cobre", c: 385 },
  { nombre: "Plomo", c: 130 },
] as const;
/** Calor (J) = m · c · ΔT. */
export const calor = (m: number, c: number, dT: number): number => m * c * dT;
export const tiempoCalentar = (Q: number, P: number): number => (P > 0 ? Q / P : NaN);

export const C_HIELO = 2100;
export const C_AGUA = 4180;
export const C_VAPOR = 2000;
export const L_FUSION = 334000;
export const L_VAPOR = 2260000;
/** Temperatura (°C) y estado tras comunicar Q (J) a m kg de hielo a −20 °C (a presión normal). */
export function calentamientoHielo(m: number, Q: number): { T: number; estado: string } {
  if (!(m > 0)) return { T: NaN, estado: "—" };
  const q1 = m * C_HIELO * 20;
  if (Q <= q1) return { T: -20 + Q / (m * C_HIELO), estado: "hielo" };
  const q2 = q1 + m * L_FUSION;
  if (Q <= q2) return { T: 0, estado: "fundiendo (hielo + agua)" };
  const q3 = q2 + m * C_AGUA * 100;
  if (Q <= q3) return { T: (Q - q2) / (m * C_AGUA), estado: "agua líquida" };
  const q4 = q3 + m * L_VAPOR;
  if (Q <= q4) return { T: 100, estado: "hirviendo (agua + vapor)" };
  return { T: 100 + (Q - q4) / (m * C_VAPOR), estado: "vapor de agua" };
}
export const calorTotalHastaVapor = (m: number): number => m * (C_HIELO * 20 + L_FUSION + C_AGUA * 100 + L_VAPOR);

export const AISLANTES = [
  { nombre: "Hormigón", k: 1.7 },
  { nombre: "Vidrio", k: 1.0 },
  { nombre: "Ladrillo", k: 0.8 },
  { nombre: "Madera", k: 0.15 },
  { nombre: "Lana de roca", k: 0.04 },
  { nombre: "Poliestireno", k: 0.035 },
] as const;
/** Potencia (W) que se pierde por conducción: P = k · A · ΔT / e. */
export const perdidaCalor = (k: number, area: number, dT: number, espesor: number): number => (espesor > 0 ? (k * area * dT) / espesor : NaN);

/* ───────────── 1. Trabajo y potencia ───────────── */

export function TrabajoPotenciaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { F: Math.round(num(block.params?.a, 100, 0, 500)), d: Math.round(num(block.params?.b, 10, 0, 50)), a: Math.round(num(block.params?.c, 0, 0, 90)), t: 5 };
  const [s, setS] = useState(init);
  const W = trabajo(s.F, s.d, s.a);
  const P = potencia(W, s.t);
  const fx = s.F * Math.cos(rad(s.a)) * 0.5;
  const fy = s.F * Math.sin(rad(s.a)) * 0.5;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Solo la componente de la fuerza en la dirección del desplazamiento realiza trabajo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza" value={s.F} min={0} max={500} step={10} unit=" N" color={MANIM.orange} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Desplazamiento" value={s.d} min={0} max={50} step={1} unit=" m" color={MANIM.blue} onChange={(d) => setS((o) => ({ ...o, d }))} />
          <Slider label="Ángulo entre F y el desplazamiento" value={s.a} min={0} max={90} step={5} unit="°" color={MANIM.purple} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Tiempo empleado" value={s.t} min={1} max={30} step={1} unit=" s" color={MANIM.green} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="trabajo-potencia" maxH={170}>
        <Seg a={[60, 120]} b={[460, 120]} color={MANIM.ink} width={3} />
        <rect x={200} y={85} width={60} height={35} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
        <Seg a={[230, 85]} b={[230 + fx, 85 - fy]} color={MANIM.orange} width={4} />
        <Seg a={[260, 102]} b={[260 + 20 + s.d * 3, 102]} color={MANIM.green} width={3} />
        <text x={235 + fx} y={78 - fy} fill={MANIM.orange} fontSize={12} fontWeight={700}>F</text>
        <text x={275 + s.d * 3} y={118} fill={MANIM.green} fontSize={12}>{`d = ${s.d} m`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Trabajo W = F·d·cos α">{`${f1(W)} J`}</Stat>
        <Stat color={MANIM.green} label="Potencia P = W / t">{`${f1(P)} W`}</Stat>
        <Stat color={MANIM.purple} label="Potencia en CV">{`${f2(wAcv(P))} CV`}</Stat>
      </Readout>
      <Note>El <b>trabajo</b> mide la <b>energía transferida</b> por una fuerza al mover un cuerpo: <b>W = F · d · cos α</b>, en <b>julios (J)</b> (1 J = 1 N·m). Si la fuerza es <b>perpendicular</b> al movimiento (α = 90°), <b>no hace trabajo</b>; si F y el desplazamiento tienen el mismo sentido, el trabajo es máximo. La <b>potencia</b> es el trabajo realizado por unidad de tiempo: <b>P = W / t</b>, en <b>vatios (W)</b> (1 W = 1 J/s). 1 CV ≈ 735 W. Una máquina más potente hace el mismo trabajo en <b>menos tiempo</b>.</Note>
    </Frame>
  );
}

/* ───────────── 2. Montaña rusa ───────────── */

export function MontanaRusaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { s: num(block.params?.a, 0.35, 0, 1), m: Math.round(num(block.params?.b, 500, 100, 1000)), f: num(block.params?.c, 0, 0, 0.5) };
  const [st, setSt] = useState(init);
  const e = estadoPista(st.s, st.m, st.f);
  const X = (s: number): number => 40 + s * 440;
  const Y = (h: number): number => 150 - h * 6;
  const pts = Array.from({ length: 51 }, (_, k) => `${X(k / 50)},${Y(alturaPista(k / 50))}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "La energía potencial se transforma en cinética; con rozamiento, parte se pierde como calor."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Slider label="Posición en la pista" value={st.s} min={0} max={1} step={0.05} color={MANIM.blue} format={(v) => `${Math.round(v * 100)} %`} onChange={(s) => setSt((o) => ({ ...o, s }))} />
          <Slider label="Masa del vagón" value={st.m} min={100} max={1000} step={100} unit=" kg" color={MANIM.orange} onChange={(m) => setSt((o) => ({ ...o, m }))} />
          <Slider label="Energía perdida como calor" value={st.f * 100} min={0} max={50} step={5} unit=" %" color={MANIM.red} onChange={(v) => setSt((o) => ({ ...o, f: v / 100 }))} />
        </>
      }
    >
      <Svg w={520} h={175} testId="montana-rusa" maxH={195}>
        <polyline points={pts} fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <Dot p={[X(st.s), Y(e.h) - 8]} r={8} color={e.alcanza ? MANIM.orange : MANIM.red} />
        <Seg a={[X(0), Y(20)]} b={[480, Y(20)]} color={MANIM.muted} width={1} dashed />
        <text x={482} y={Y(20) + 4} fill={MANIM.muted} fontSize={11}>h = 20 m</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Altura">{`${f1(e.h)} m`}</Stat>
        <Stat color={MANIM.green} label="Energía potencial">{`${f1(e.ep / 1000)} kJ`}</Stat>
        <Stat color={MANIM.orange} label="Energía cinética">{`${f1(e.ec / 1000)} kJ`}</Stat>
        <Stat color={MANIM.red} label="Calor disipado">{`${f1(e.calor / 1000)} kJ`}</Stat>
        <Stat color={MANIM.purple} label="Velocidad">{Number.isNaN(e.v) ? "no llega" : `${f1(e.v)} m/s (${f1(e.v * 3.6)} km/h)`}</Stat>
      </Readout>
      <Note>La <b>energía mecánica</b> es la suma de la <b>cinética</b> (½·m·v²) y la <b>potencial</b> (m·g·h). Sin rozamiento se <b>conserva</b>: el vagón llega abajo con v = √(2·g·Δh) sin importar la forma de la pista. Con <b>rozamiento</b>, el <b>trabajo de la fuerza de rozamiento</b> transforma parte de la energía en <b>calor</b> y el vagón no alcanza la misma altura. La <b>energía total</b> (mecánica + calor) siempre se conserva. El modelo supone que se pierde un porcentaje fijo de la energía liberada; no es exacto.</Note>
    </Frame>
  );
}

/* ───────────── 3. Calor específico ───────────── */

export function CalorEspecificoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { mat: Math.round(num(block.params?.n, 0, 0, MATERIALES_C.length - 1)), m: num(block.params?.a, 1, 0.1, 5), dT: Math.round(num(block.params?.b, 50, 5, 100)), P: Math.round(num(block.params?.c, 1000, 100, 3000)) };
  const [s, setS] = useState(init);
  const mat = MATERIALES_C[s.mat]!;
  const Q = calor(s.m, mat.c, s.dT);
  const t = tiempoCalentar(Q, s.P);
  const max = Math.max(...MATERIALES_C.map((x) => calor(s.m, x.c, s.dT)));
  return (
    <Frame
      stacked
      hint={block.hint ?? "El calor necesario depende de la masa, de lo que quieras calentar y del material (calor específico)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATERIALES_C.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.mat)} onChange={(k) => setS((o) => ({ ...o, mat: Number(k) }))} />
          <Slider label="Masa" value={s.m} min={0.1} max={5} step={0.1} unit=" kg" color={MANIM.blue} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Aumento de temperatura" value={s.dT} min={5} max={100} step={5} unit=" °C" color={MANIM.red} onChange={(dT) => setS((o) => ({ ...o, dT }))} />
          <Slider label="Potencia del calentador" value={s.P} min={100} max={3000} step={100} unit=" W" color={MANIM.orange} onChange={(P) => setS((o) => ({ ...o, P }))} />
        </>
      }
    >
      <Svg w={520} h={175} testId="calor-especifico" maxH={195}>
        {MATERIALES_C.map((x, k) => {
          const q = calor(s.m, x.c, s.dT);
          const w = (q / max) * 280;
          const sel = k === s.mat;
          return (
            <g key={x.nombre}>
              <text x={140} y={26 + k * 26} textAnchor="end" fill={sel ? MANIM.ink : MANIM.muted} fontSize={12} fontWeight={sel ? 700 : 400}>{x.nombre}</text>
              <rect x={150} y={12 + k * 26} width={w} height={16} fill={sel ? MANIM.orange : MANIM.muted} fillOpacity={sel ? 0.9 : 0.4} />
              <text x={156 + w} y={26 + k * 26} fill={MANIM.ink} fontSize={11}>{`${fmtEs(q / 1000, 1)} kJ`}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label={`Calor específico del ${mat.nombre.toLowerCase()}`}>{`${fmtEs(mat.c, 0)} J/(kg·°C)`}</Stat>
        <Stat color={MANIM.orange} label="Calor necesario Q = m·c·ΔT">{`${f1(Q / 1000)} kJ`}</Stat>
        <Stat color={MANIM.green} label="Tiempo con el calentador">{`${f1(t)} s (${f1(t / 60)} min)`}</Stat>
      </Readout>
      <Note>El <b>calor específico</b> c es la energía necesaria para elevar <b>1 °C</b> la temperatura de <b>1 kg</b> de una sustancia. El calor que hay que aportar (o que se desprende) es <b>Q = m · c · ΔT</b>, en julios. El <b>agua</b> tiene un calor específico <b>muy alto</b> (4180 J/kg·°C): tarda mucho en calentarse y en enfriarse, por eso regula el clima de las costas y se usa como refrigerante. Los metales se calientan con poca energía. Valores aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 4. Calentar hielo hasta vapor ───────────── */

export function CalentamientoHieloFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { m: num(block.params?.a, 0.2, 0.1, 1), q: num(block.params?.b, 50, 0, 100) };
  const [s, setS] = useState(init);
  const total = calorTotalHastaVapor(s.m);
  const Qmax = total * 1.12;
  const Q = (s.q / 100) * Qmax;
  const r = calentamientoHielo(s.m, Q);
  const X = (q: number): number => 50 + (q / Qmax) * 420;
  const Y = (T: number): number => 140 - ((T + 20) / 160) * 120;
  const pts = Array.from({ length: 121 }, (_, k) => {
    const q = (k / 120) * Qmax;
    return `${X(q)},${Y(Math.min(140, calentamientoHielo(s.m, q).T))}`;
  }).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Durante un cambio de estado la temperatura se mantiene constante: el calor se emplea en cambiar el estado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa de agua (hielo inicial)" value={s.m} min={0.1} max={1} step={0.1} unit=" kg" color={MANIM.blue} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Calor suministrado" value={s.q} min={0} max={100} step={1} color={MANIM.orange} format={(v) => `${fmtEs(((v / 100) * Qmax) / 1000, 0)} kJ`} onChange={(q) => setS((o) => ({ ...o, q }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="calentamiento-hielo" maxH={205}>
        <Seg a={[50, 140]} b={[480, 140]} color={MANIM.ink} width={2} />
        <Seg a={[50, 140]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[50, Y(0)]} b={[480, Y(0)]} color={MANIM.muted} width={1} dashed />
        <Seg a={[50, Y(100)]} b={[480, Y(100)]} color={MANIM.muted} width={1} dashed />
        <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Dot p={[X(Q), Y(Math.min(140, r.T))]} r={6} color={MANIM.orange} />
        <text x={56} y={Y(0) - 4} fill={MANIM.muted} fontSize={11}>0 °C</text>
        <text x={56} y={Y(100) - 4} fill={MANIM.muted} fontSize={11}>100 °C</text>
        <text x={480} y={170} textAnchor="end" fill={MANIM.muted} fontSize={12}>calor suministrado</text>
        <text x={58} y={12} fill={MANIM.muted} fontSize={12}>T (°C)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Temperatura">{`${f1(r.T)} °C`}</Stat>
        <Stat color={MANIM.green} label="Estado">{r.estado}</Stat>
        <Stat color={MANIM.purple} label="Calor hasta evaporar todo">{`${fmtEs(total / 1000, 0)} kJ`}</Stat>
      </Readout>
      <Note>Al calentar hielo a −20 °C hay <b>tramos inclinados</b> (la temperatura sube: <b>Q = m·c·ΔT</b>) y <b>tramos horizontales</b> (cambio de estado: la temperatura <b>no cambia</b> y el calor se emplea en romper enlaces entre partículas: <b>Q = m·L</b>). El <b>calor latente de fusión</b> del agua es ≈ 334 kJ/kg y el de <b>vaporización</b> ≈ 2260 kJ/kg: <b>evaporar</b> cuesta casi 7 veces más que fundir. Calores específicos aproximados: hielo 2100, agua 4180 y vapor 2000 J/(kg·°C), a presión normal.</Note>
    </Frame>
  );
}

/* ───────────── 5. Aislamiento térmico ───────────── */

export function AislamientoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { mat: Math.round(num(block.params?.n, 2, 0, AISLANTES.length - 1)), e: num(block.params?.a, 0.2, 0.02, 0.5), dT: Math.round(num(block.params?.b, 20, 5, 40)), A: 20 };
  const [s, setS] = useState(init);
  const mat = AISLANTES[s.mat]!;
  const P = perdidaCalor(mat.k, s.A, s.dT, s.e);
  const max = perdidaCalor(AISLANTES[0].k, s.A, s.dT, s.e);
  const kWhDia = (P * 24) / 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto menor es la conductividad térmica y mayor el espesor, menos calor se pierde."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material de la pared" items={AISLANTES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.mat)} onChange={(k) => setS((o) => ({ ...o, mat: Number(k) }))} />
          <Slider label="Espesor" value={s.e} min={0.02} max={0.5} step={0.01} unit=" m" color={MANIM.blue} format={f2} onChange={(e) => setS((o) => ({ ...o, e }))} />
          <Slider label="Diferencia de temperatura dentro-fuera" value={s.dT} min={5} max={40} step={1} unit=" °C" color={MANIM.red} onChange={(dT) => setS((o) => ({ ...o, dT }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="aislamiento" maxH={170}>
        <rect x={60} y={20} width={110} height={110} fill={MANIM.red} fillOpacity={0.25} />
        <rect x={170 + Math.max(6, s.e * 360)} y={20} width={110} height={110} fill={MANIM.blue} fillOpacity={0.25} />
        <rect x={170} y={20} width={Math.max(6, s.e * 360)} height={110} fill={MANIM.muted} fillOpacity={0.7} />
        <Seg a={[120, 75]} b={[120 + 40 + (P / max) * 150, 75]} color={MANIM.orange} width={4} />
        <text x={115} y={140} textAnchor="middle" fill={MANIM.red} fontSize={12}>interior</text>
        <text x={170 + Math.max(6, s.e * 360) + 55} y={142} textAnchor="middle" fill={MANIM.blue} fontSize={12}>exterior</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Conductividad térmica">{`${fmtEs(mat.k, 3)} W/(m·°C)`}</Stat>
        <Stat color={MANIM.orange} label="Pérdida por 20 m² de pared">{`${fmtEs(P, 0)} W`}</Stat>
        <Stat color={MANIM.green} label="Energía perdida en un día">{`${f1(kWhDia)} kWh`}</Stat>
      </Readout>
      <Note>El calor pasa del cuerpo caliente al frío por <b>conducción</b>, <b>convección</b> y <b>radiación</b>. Por conducción a través de una pared, la potencia perdida es <b>P = k · A · ΔT / e</b>: crece con la <b>conductividad térmica k</b>, el <b>área</b> y la <b>diferencia de temperatura</b>, y disminuye con el <b>espesor</b>. Los <b>aislantes</b> (lana de roca, poliestireno, corcho, aire encerrado) tienen k muy baja: mantienen el calor dentro en invierno y fuera en verano, reduciendo el <b>consumo de energía</b>. Valores de k aproximados; el cálculo es una simplificación.</Note>
    </Frame>
  );
}
