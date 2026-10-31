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

export const K_COULOMB = 9e9;
export const E_ELEMENTAL = 1.602e-19;

/** Fuerza de Coulomb (N) entre dos cargas en µC separadas r metros. */
export const fuerzaCoulomb = (q1uC: number, q2uC: number, r: number): number => (r > 0 ? (K_COULOMB * Math.abs(q1uC * 1e-6 * q2uC * 1e-6)) / (r * r) : NaN);
export const tipoFuerzaCarga = (q1: number, q2: number): string => (q1 === 0 || q2 === 0 ? "no hay fuerza (alguna carga es cero)" : q1 * q2 > 0 ? "repulsión" : "atracción");

export const TRIBO = ["Vidrio", "Lana", "Seda", "Algodón", "Ámbar", "Ebonita", "Plástico (PVC)"] as const;
/** Al frotar dos materiales de la serie triboeléctrica, el que está antes (más a la izquierda) se carga positivamente. */
export function frotamiento(a: number, b: number): { positivo: string; negativo: string } | null {
  if (a === b || a < 0 || b < 0 || a >= TRIBO.length || b >= TRIBO.length) return null;
  return a < b ? { positivo: TRIBO[a]!, negativo: TRIBO[b]! } : { positivo: TRIBO[b]!, negativo: TRIBO[a]! };
}

/** Intensidad (A) = carga (C) / tiempo (s). */
export const intensidad = (Q: number, t: number): number => (t > 0 ? Q / t : NaN);
export const electronesPorSegundo = (I: number): number => I / E_ELEMENTAL;
/** Tensión (V) = energía (J) / carga (C). */
export const tension = (E: number, Q: number): number => (Q > 0 ? E / Q : NaN);

export const ohmI = (V: number, R: number): number => (R > 0 ? V / R : NaN);
export const ohmV = (I: number, R: number): number => I * R;
export const ohmR = (V: number, I: number): number => (I > 0 ? V / I : NaN);

export const RESISTIVIDADES = [
  { nombre: "Plata", rho: 0.016 },
  { nombre: "Cobre", rho: 0.017 },
  { nombre: "Aluminio", rho: 0.028 },
  { nombre: "Hierro", rho: 0.1 },
  { nombre: "Nicrom (resistencias)", rho: 1.1 },
] as const;
/** Resistencia (Ω) de un hilo: ρ·L/S con ρ en Ω·mm²/m, L en m y S en mm². */
export const resistenciaHilo = (rho: number, L: number, S: number): number => (S > 0 ? (rho * L) / S : NaN);

export const resistenciaSerie = (rs: readonly number[]): number => rs.reduce((a, b) => a + b, 0);
export function resistenciaParalelo(rs: readonly number[]): number {
  if (rs.length === 0 || rs.some((r) => !(r > 0))) return NaN;
  return 1 / rs.reduce((a, r) => a + 1 / r, 0);
}
export function circuito(tipo: "serie" | "paralelo", V: number, r1: number, r2: number) {
  if (tipo === "serie") {
    const Req = resistenciaSerie([r1, r2]);
    const I = ohmI(V, Req);
    return { Req, I, I1: I, I2: I, V1: I * r1, V2: I * r2 };
  }
  const Req = resistenciaParalelo([r1, r2]);
  return { Req, I: ohmI(V, Req), I1: ohmI(V, r1), I2: ohmI(V, r2), V1: V, V2: V };
}

export const potenciaElectrica = (V: number, I: number): number => V * I;
export const energiaKWh = (potenciaW: number, horas: number): number => (potenciaW * horas) / 1000;
export const APARATOS = [
  { nombre: "Bombilla LED", w: 10 },
  { nombre: "Bombilla incandescente", w: 60 },
  { nombre: "Nevera", w: 150 },
  { nombre: "Televisión", w: 100 },
  { nombre: "Microondas", w: 800 },
  { nombre: "Lavadora", w: 2000 },
  { nombre: "Calefactor", w: 2000 },
] as const;

/** Intensidad (mA) que atraviesa el cuerpo humano con una tensión V (V) y una resistencia R (Ω). */
export const corrienteCuerpoMA = (V: number, R: number): number => (R > 0 ? (V / R) * 1000 : NaN);
export function efectoCorriente(mA: number): string {
  if (!Number.isFinite(mA) || mA < 0) return "—";
  if (mA < 1) return "casi imperceptible";
  if (mA < 10) return "hormigueo; se percibe";
  if (mA < 30) return "contracción muscular: puede impedir soltar el conductor";
  if (mA < 75) return "peligro: paro respiratorio";
  return "peligro de muerte: fibrilación del corazón";
}

/* ───────────── 1. Carga y fuerza de Coulomb ───────────── */

export function CargaCoulombFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { q1: Math.round(num(block.params?.a, 4, -10, 10)), q2: Math.round(num(block.params?.b, -4, -10, 10)), r: num(block.params?.c, 0.5, 0.1, 1) };
  const [s, setS] = useState(init);
  const F = fuerzaCoulomb(s.q1, s.q2, s.r);
  const x1 = 260 - 20 - s.r * 160;
  const x2 = 260 + 20 + s.r * 160;
  const long = Math.min(60, 10 + F * 8);
  const col = (q: number): string => (q > 0 ? MANIM.red : q < 0 ? MANIM.blue : MANIM.muted);
  const atrae = s.q1 * s.q2 < 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cargas del mismo signo se repelen; de signo contrario se atraen. La fuerza disminuye con el cuadrado de la distancia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Carga 1" value={s.q1} min={-10} max={10} step={1} unit=" µC" color={MANIM.red} onChange={(q1) => setS((o) => ({ ...o, q1 }))} />
          <Slider label="Carga 2" value={s.q2} min={-10} max={10} step={1} unit=" µC" color={MANIM.blue} onChange={(q2) => setS((o) => ({ ...o, q2 }))} />
          <Slider label="Distancia" value={s.r} min={0.1} max={1} step={0.05} unit=" m" color={MANIM.purple} format={f2} onChange={(r) => setS((o) => ({ ...o, r }))} />
        </>
      }
    >
      <Svg w={520} h={120} testId="carga-coulomb" maxH={140}>
        <Dot p={[x1, 60]} r={16} color={col(s.q1)} />
        <Dot p={[x2, 60]} r={16} color={col(s.q2)} />
        <text x={x1} y={65} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{s.q1 > 0 ? "+" : s.q1 < 0 ? "−" : "0"}</text>
        <text x={x2} y={65} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{s.q2 > 0 ? "+" : s.q2 < 0 ? "−" : "0"}</text>
        {F > 0 && (
          <>
            <Seg a={[x1, 95]} b={[atrae ? x1 + long : x1 - long, 95]} color={MANIM.orange} width={4} />
            <Seg a={[x2, 95]} b={[atrae ? x2 - long : x2 + long, 95]} color={MANIM.orange} width={4} />
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Tipo de fuerza">{tipoFuerzaCarga(s.q1, s.q2)}</Stat>
        <Stat color={MANIM.orange} label="Módulo F = k·|q₁·q₂| / r²">{`${fmtEs(F, 3)} N`}</Stat>
      </Readout>
      <Note>La <b>carga eléctrica</b> es una propiedad de la materia: puede ser <b>positiva</b> (protones) o <b>negativa</b> (electrones). Se mide en <b>culombios (C)</b>; 1 µC = 10⁻⁶ C. Cargas de <b>igual signo se repelen</b> y de <b>signo contrario se atraen</b>. La <b>ley de Coulomb</b> dice que la fuerza es proporcional al producto de las cargas e <b>inversamente proporcional al cuadrado de la distancia</b>: F = k·|q₁·q₂|/r², con k ≈ 9·10⁹ N·m²/C². Si se duplica la distancia, la fuerza se divide entre 4.</Note>
    </Frame>
  );
}

/* ───────────── 2. Intensidad y tensión ───────────── */

export function IntensidadTensionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { Q: num(block.params?.a, 6, 1, 30), t: Math.round(num(block.params?.b, 3, 1, 20)), E: num(block.params?.c, 36, 1, 300) };
  const [s, setS] = useState(init);
  const I = intensidad(s.Q, s.t);
  const V = tension(s.E, s.Q);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La intensidad es la carga que pasa por segundo; la tensión, la energía que lleva cada culombio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Carga que atraviesa el conductor" value={s.Q} min={1} max={30} step={1} unit=" C" color={MANIM.blue} onChange={(Q) => setS((o) => ({ ...o, Q }))} />
          <Slider label="Tiempo" value={s.t} min={1} max={20} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
          <Slider label="Energía que cede esa carga" value={s.E} min={1} max={300} step={1} unit=" J" color={MANIM.orange} onChange={(E) => setS((o) => ({ ...o, E }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="intensidad-tension" maxH={130}>
        <Seg a={[60, 55]} b={[460, 55]} color={MANIM.muted} width={8} />
        {Array.from({ length: Math.min(12, Math.max(1, Math.round(I * 2))) }, (_, k) => (
          <Dot key={k} p={[70 + k * (380 / Math.min(12, Math.max(1, Math.round(I * 2)))), 55]} r={6} color={MANIM.blue} />
        ))}
        <text x={60} y={95} fill={MANIM.ink} fontSize={13}>{`I = ${f2(I)} A`}</text>
        <text x={460} y={95} textAnchor="end" fill={MANIM.ink} fontSize={13}>{`V = ${f2(V)} V`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Intensidad I = Q / t">{`${f2(I)} A (${fmtEs(I * 1000, 0)} mA)`}</Stat>
        <Stat color={MANIM.orange} label="Tensión V = E / Q">{`${f2(V)} V`}</Stat>
        <Stat color={MANIM.purple} label="Electrones por segundo">{`${fmtEs(electronesPorSegundo(I) / 1e18, 2)} · 10¹⁸`}</Stat>
      </Readout>
      <Note>La <b>corriente eléctrica</b> es un movimiento ordenado de <b>cargas</b> (electrones en los metales). La <b>intensidad</b> I es la carga que atraviesa una sección del conductor por unidad de tiempo: <b>I = Q / t</b>, en <b>amperios (A)</b> (1 A = 1 C/s), y se mide con un <b>amperímetro</b> en serie. La <b>tensión</b> o <b>diferencia de potencial</b> V es la energía que cada culombio recibe del generador (o cede en un receptor): <b>V = E / Q</b>, en <b>voltios (V)</b>, y se mide con un <b>voltímetro</b> en paralelo. Una carga elemental es de 1,6·10⁻¹⁹ C.</Note>
    </Frame>
  );
}

/* ───────────── 3. Ley de Ohm ───────────── */

export function LeyOhmFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { V: num(block.params?.a, 12, 1, 24), R: Math.round(num(block.params?.b, 20, 1, 100)) };
  const [s, setS] = useState(init);
  const I = ohmI(s.V, s.R);
  const X = (v: number): number => 50 + (v / 24) * 420;
  const Y = (i: number): number => 150 - (i / 2.5) * 125;
  return (
    <Frame
      stacked
      hint={block.hint ?? "A mayor resistencia, menor intensidad con la misma tensión. La gráfica V-I es una recta de pendiente R."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión" value={s.V} min={1} max={24} step={1} unit=" V" color={MANIM.orange} onChange={(V) => setS((o) => ({ ...o, V }))} />
          <Slider label="Resistencia" value={s.R} min={1} max={100} step={1} unit=" Ω" color={MANIM.red} onChange={(R) => setS((o) => ({ ...o, R }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="ley-ohm" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[X(0), Y(0)]} b={[X(24), Y(Math.min(2.5, 24 / s.R))]} color={MANIM.blue} width={3} />
        <Dot p={[X(s.V), Y(Math.min(2.5, I))]} r={6} color={MANIM.orange} />
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>V (V)</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>I (A)</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Intensidad I = V / R">{`${f2(I)} A`}</Stat>
        <Stat color={MANIM.red} label="Resistencia">{`${s.R} Ω`}</Stat>
        <Stat color={MANIM.orange} label="Tensión">{`${s.V} V`}</Stat>
      </Readout>
      <Note>La <b>resistencia eléctrica</b> R mide la oposición de un conductor al paso de la corriente; se mide en <b>ohmios (Ω)</b>. La <b>ley de Ohm</b> dice que, en un conductor metálico a temperatura constante, la intensidad es <b>proporcional a la tensión</b>: <b>I = V / R</b> (o V = I·R). Su gráfica V–I es una <b>recta</b> cuya pendiente es R. Con la misma tensión, <b>más resistencia, menos corriente</b>. (La recta de la gráfica se corta en 2,5 A para no salirse del dibujo.)</Note>
    </Frame>
  );
}

/* ───────────── 3b. Resistencia de un hilo ───────────── */

export function ResistenciaHiloFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 1, 0, RESISTIVIDADES.length - 1)), L: Math.round(num(block.params?.a, 10, 1, 100)), S: num(block.params?.b, 1.5, 0.5, 6) };
  const [s, setS] = useState(init);
  const mat = RESISTIVIDADES[s.m]!;
  const R = resistenciaHilo(mat.rho, s.L, s.S);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un hilo largo y fino resiste más que uno corto y grueso."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={RESISTIVIDADES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.m)} onChange={(k) => setS((o) => ({ ...o, m: Number(k) }))} />
          <Slider label="Longitud" value={s.L} min={1} max={100} step={1} unit=" m" color={MANIM.blue} onChange={(L) => setS((o) => ({ ...o, L }))} />
          <Slider label="Sección" value={s.S} min={0.5} max={6} step={0.5} unit=" mm²" color={MANIM.purple} format={f1} onChange={(S) => setS((o) => ({ ...o, S }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="resistencia-hilo" maxH={130}>
        <rect x={60} y={55 - s.S * 3} width={60 + s.L * 3.4} height={s.S * 6} rx={3} fill={MANIM.orange} fillOpacity={0.8} />
        <text x={60} y={20} fill={MANIM.muted} fontSize={12}>{`L = ${s.L} m · S = ${f1(s.S)} mm²`}</text>
        <text x={60} y={98} fill={MANIM.ink} fontSize={14} fontWeight={700}>{`R = ${f2(R)} Ω`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Resistividad ρ">{`${fmtEs(mat.rho, 3)} Ω·mm²/m`}</Stat>
        <Stat color={MANIM.red} label="Resistencia R = ρ·L / S">{`${f2(R)} Ω`}</Stat>
      </Readout>
      <Note>La resistencia de un conductor depende de su <b>material</b> (<b>resistividad ρ</b>), su <b>longitud</b> L y su <b>sección</b> S: <b>R = ρ · L / S</b>. Crece con la longitud y <b>disminuye con la sección</b>. Por eso los cables eléctricos son de <b>cobre</b> (baja resistividad) y gruesos si transportan mucha corriente, mientras que las resistencias calefactoras de un tostador son de <b>nicrom</b> (alta resistividad). Valores aproximados a 20 °C.</Note>
    </Frame>
  );
}

/* ───────────── 4. Circuitos serie y paralelo ───────────── */

export function CircuitoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { tipo: (num(block.params?.n, 0, 0, 1) >= 0.5 ? "paralelo" : "serie") as "serie" | "paralelo", V: Math.round(num(block.params?.a, 12, 1, 24)), r1: Math.round(num(block.params?.b, 10, 1, 50)), r2: Math.round(num(block.params?.c, 20, 1, 50)) };
  const [s, setS] = useState<{ tipo: "serie" | "paralelo"; V: number; r1: number; r2: number }>(init);
  const c = circuito(s.tipo, s.V, s.r1, s.r2);
  return (
    <Frame
      stacked
      hint={block.hint ?? "En serie la intensidad es la misma y las tensiones se reparten; en paralelo la tensión es la misma y las intensidades se reparten."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Asociación de las dos resistencias" items={[{ value: "serie", label: "En serie" }, { value: "paralelo", label: "En paralelo" }]} value={s.tipo} onChange={(tipo) => setS((o) => ({ ...o, tipo: tipo as "serie" | "paralelo" }))} />
          <Slider label="Tensión de la pila" value={s.V} min={1} max={24} step={1} unit=" V" color={MANIM.orange} onChange={(V) => setS((o) => ({ ...o, V }))} />
          <Slider label="Resistencia R₁" value={s.r1} min={1} max={50} step={1} unit=" Ω" color={MANIM.blue} onChange={(r1) => setS((o) => ({ ...o, r1 }))} />
          <Slider label="Resistencia R₂" value={s.r2} min={1} max={50} step={1} unit=" Ω" color={MANIM.green} onChange={(r2) => setS((o) => ({ ...o, r2 }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="circuito" maxH={170}>
        {s.tipo === "serie" ? (
          <>
            <path d="M 80 30 L 440 30 L 440 120 L 80 120 Z" fill="none" stroke={MANIM.ink} strokeWidth={3} />
            <rect x={160} y={20} width={60} height={20} fill={MANIM.blue} />
            <rect x={300} y={20} width={60} height={20} fill={MANIM.green} />
            <text x={190} y={16} textAnchor="middle" fill={MANIM.blue} fontSize={12}>{`R₁ ${s.r1} Ω`}</text>
            <text x={330} y={16} textAnchor="middle" fill={MANIM.green} fontSize={12}>{`R₂ ${s.r2} Ω`}</text>
          </>
        ) : (
          <>
            <path d="M 80 30 L 440 30 L 440 120 L 80 120 Z" fill="none" stroke={MANIM.ink} strokeWidth={3} />
            <Seg a={[180, 30]} b={[180, 120]} color={MANIM.ink} width={3} />
            <Seg a={[340, 30]} b={[340, 120]} color={MANIM.ink} width={3} />
            <rect x={160} y={55} width={40} height={30} fill={MANIM.blue} />
            <rect x={320} y={55} width={40} height={30} fill={MANIM.green} />
            <text x={140} y={75} textAnchor="end" fill={MANIM.blue} fontSize={12}>{`R₁ ${s.r1} Ω`}</text>
            <text x={380} y={75} fill={MANIM.green} fontSize={12}>{`R₂ ${s.r2} Ω`}</text>
          </>
        )}
        <rect x={70} y={60} width={20} height={30} fill={MANIM.orange} />
        <text x={100} y={80} fill={MANIM.orange} fontSize={12}>{`${s.V} V`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Resistencia equivalente">{`${f2(c.Req)} Ω`}</Stat>
        <Stat color={MANIM.orange} label="Intensidad total">{`${f2(c.I)} A`}</Stat>
        <Stat color={MANIM.blue} label="R₁: V e I">{`${f2(c.V1)} V · ${f2(c.I1)} A`}</Stat>
        <Stat color={MANIM.green} label="R₂: V e I">{`${f2(c.V2)} V · ${f2(c.I2)} A`}</Stat>
      </Readout>
      <Note>En un <b>circuito en serie</b> los receptores están uno a continuación de otro: por todos pasa la <b>misma intensidad</b>, la tensión total se <b>reparte</b> (V = V₁ + V₂) y la resistencia total es la <b>suma</b>: R = R₁ + R₂. Si uno se funde, se <b>corta</b> todo el circuito. En un <b>circuito en paralelo</b> cada receptor está conectado a los dos bornes: todos tienen la <b>misma tensión</b>, la intensidad total se <b>reparte</b> (I = I₁ + I₂) y <b>1/R = 1/R₁ + 1/R₂</b> (la total es <b>menor</b> que la menor). Es como están conectados los enchufes de una casa.</Note>
    </Frame>
  );
}

/* ───────────── 5. Potencia y consumo eléctrico ───────────── */

export function ConsumoElectricoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { ap: Math.round(num(block.params?.n, 1, 0, APARATOS.length - 1)), h: num(block.params?.a, 4, 0.5, 24), precio: num(block.params?.b, 0.15, 0.05, 0.5) };
  const [s, setS] = useState(init);
  const ap = APARATOS[s.ap]!;
  const kwh = energiaKWh(ap.w, s.h) * 30;
  const max = Math.max(...APARATOS.map((x) => energiaKWh(x.w, s.h) * 30));
  return (
    <Frame
      stacked
      hint={block.hint ?? "La energía consumida es la potencia por el tiempo de uso: kWh = kW · h."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Aparato" items={APARATOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.ap)} onChange={(k) => setS((o) => ({ ...o, ap: Number(k) }))} />
          <Slider label="Horas de uso al día" value={s.h} min={0.5} max={24} step={0.5} unit=" h" color={MANIM.blue} format={f1} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Slider label="Precio de la electricidad" value={s.precio} min={0.05} max={0.5} step={0.01} unit=" €/kWh" color={MANIM.orange} format={f2} onChange={(precio) => setS((o) => ({ ...o, precio }))} />
        </>
      }
    >
      <Svg w={520} h={185} testId="consumo-electrico" maxH={205}>
        {APARATOS.map((x, k) => {
          const e = energiaKWh(x.w, s.h) * 30;
          const w = (e / max) * 260;
          const sel = k === s.ap;
          return (
            <g key={x.nombre}>
              <text x={170} y={24 + k * 24} textAnchor="end" fill={sel ? MANIM.ink : MANIM.muted} fontSize={12} fontWeight={sel ? 700 : 400}>{x.nombre}</text>
              <rect x={180} y={10 + k * 24} width={Math.max(2, w)} height={15} fill={sel ? MANIM.orange : MANIM.muted} fillOpacity={sel ? 0.9 : 0.4} />
              <text x={186 + w} y={23 + k * 24} fill={MANIM.ink} fontSize={11}>{`${fmtEs(e, 1)} kWh/mes`}</text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Potencia">{`${fmtEs(ap.w, 0)} W`}</Stat>
        <Stat color={MANIM.blue} label="Energía al mes">{`${f1(kwh)} kWh`}</Stat>
        <Stat color={MANIM.orange} label="Coste al mes">{`${f2(kwh * s.precio)} €`}</Stat>
        <Stat color={MANIM.green} label="En julios">{`${fmtEs(kwh * 3.6, 1)} MJ al mes`}</Stat>
      </Readout>
      <Note>La <b>potencia eléctrica</b> de un aparato es la energía que consume por segundo: <b>P = V · I</b>, en <b>vatios (W)</b>. La <b>energía</b> consumida en un tiempo t es <b>E = P · t</b>; la factura se mide en <b>kWh</b> (kilovatios-hora): 1 kWh = 3,6·10⁶ J. Por ejemplo, una bombilla de 60 W encendida 4 h cada día durante un mes (30 días) consume 7,2 kWh. Sustituir una incandescente por una <b>LED</b> da la misma luz con mucha menos potencia. Potencias y precio son <b>orientativos</b>.</Note>
    </Frame>
  );
}

/* ───────────── 6. Seguridad eléctrica ───────────── */

export function SeguridadElectricaFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { V: Math.round(num(block.params?.a, 230, 12, 400)), mojado: num(block.params?.n, 0, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  const R = s.mojado ? 1000 : 100000;
  const mA = corrienteCuerpoMA(s.V, R);
  const efecto = efectoCorriente(mA);
  const peligro = mA >= 30;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con la piel mojada la resistencia del cuerpo baja mucho y la corriente es mucho mayor."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión de contacto" value={s.V} min={12} max={400} step={1} unit=" V" color={MANIM.orange} onChange={(V) => setS((o) => ({ ...o, V }))} />
          <Choice label="Estado de la piel" items={[{ value: "seca", label: "Piel seca (≈ 100 000 Ω)" }, { value: "mojada", label: "Piel mojada (≈ 1 000 Ω)" }]} value={s.mojado ? "mojada" : "seca"} onChange={(v) => setS((o) => ({ ...o, mojado: v === "mojada" }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="seguridad-electrica" maxH={130}>
        <rect x={60} y={40} width={400} height={26} rx={6} fill={MANIM.muted} fillOpacity={0.25} />
        <rect x={60} y={40} width={Math.min(400, (mA / 100) * 400)} height={26} rx={6} fill={peligro ? MANIM.red : MANIM.green} fillOpacity={0.85} />
        <Seg a={[60 + 0.3 * 400, 70]} b={[60 + 0.3 * 400, 82]} color={MANIM.muted} width={1.5} />
        <text x={60 + 0.3 * 400} y={96} textAnchor="middle" fill={MANIM.muted} fontSize={11}>30 mA</text>
        <text x={60} y={30} fill={MANIM.ink} fontSize={13} fontWeight={700}>{`${f2(mA)} mA`}</text>
      </Svg>
      <Readout>
        <Stat color={peligro ? MANIM.red : MANIM.green} label="Intensidad por el cuerpo I = V / R">{`${f2(mA)} mA`}</Stat>
        <Stat color={peligro ? MANIM.red : MANIM.green} label="Efecto orientativo">{efecto}</Stat>
      </Readout>
      <Note>El peligro de una descarga depende de la <b>intensidad</b> que atraviesa el cuerpo (I = V / R), de su <b>duración</b> y del camino que recorre. Con la piel <b>mojada</b> la resistencia baja mucho: la misma tensión produce una corriente 100 veces mayor. Por encima de unos <b>30 mA</b> hay riesgo grave. Protecciones de una instalación: <b>fusibles</b> y <b>magnetotérmicos</b> (cortan si hay exceso de intensidad), <b>interruptor diferencial</b> (corta con fugas de ~30 mA) y <b>toma de tierra</b>. Reglas: no tocar aparatos con las manos mojadas, no manipular enchufes con corriente, no sobrecargar regletas. Los umbrales son <b>orientativos</b>: no sustituyen a una norma de seguridad.</Note>
    </Frame>
  );
}
