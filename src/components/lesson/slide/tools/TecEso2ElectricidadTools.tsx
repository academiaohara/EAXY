"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── Funciones de cálculo (se comprueban en los tests) ───────────── */

/** Ley de Ohm: intensidad (A) a partir de tensión (V) y resistencia (Ω). */
export const intensidad = (v: number, r: number) => (r > 0 ? v / r : Infinity);

/** Despeja la incógnita de V = I · R. `a` y `b` son las otras dos magnitudes, en el orden V, I, R sin la incógnita. */
export function ohm(incognita: "V" | "I" | "R", a: number, b: number): number {
  if (incognita === "V") return a * b; // a = I, b = R
  if (incognita === "I") return b > 0 ? a / b : Infinity; // a = V, b = R
  return b > 0 ? a / b : Infinity; // a = V, b = I
}

export const potencia = (v: number, i: number) => v * i;
export const energiaKWh = (potenciaW: number, horas: number) => (potenciaW * horas) / 1000;

export const reqSerie = (rs: readonly number[]) => rs.reduce((a, b) => a + b, 0);
export const reqParalelo = (rs: readonly number[]) => 1 / rs.reduce((a, b) => a + 1 / b, 0);

/** Resuelve dos resistencias en serie o en paralelo conectadas a una pila de `v` voltios. */
export function resuelve(modo: "serie" | "paralelo", v: number, r1: number, r2: number) {
  if (modo === "serie") {
    const req = reqSerie([r1, r2]);
    const i = v / req;
    return { req, iTotal: i, i1: i, i2: i, v1: i * r1, v2: i * r2 };
  }
  const req = reqParalelo([r1, r2]);
  return { req, iTotal: v / req, i1: v / r1, i2: v / r2, v1: v, v2: v };
}

/** R1 en serie con (R2 ∥ R3), conectado a `v` voltios. */
export function resuelveMixto(v: number, r1: number, r2: number, r3: number) {
  const rp = reqParalelo([r2, r3]);
  const req = r1 + rp;
  const i = v / req;
  const vp = i * rp;
  return { rp, req, iTotal: i, v1: i * r1, vp, i2: vp / r2, i3: vp / r3 };
}

const f2 = (x: number) => fmtEs(x, 2);

/* ───────────── Circuito dibujado: pila + resistencias ───────────── */

function Resistencia({ x, y, vertical = false, izq = false, etiqueta, color = MANIM.orange }: { x: number; y: number; vertical?: boolean; izq?: boolean; etiqueta: string; color?: string }) {
  return vertical ? (
    <g>
      <rect x={x - 11} y={y - 30} width={22} height={60} fill={MANIM.surface} stroke={color} strokeWidth={3.5} rx={3} />
      <text x={izq ? x - 20 : x + 20} y={y + 5} fill={color} fontSize={15} fontWeight={700} textAnchor={izq ? "end" : "start"}>
        {etiqueta}
      </text>
    </g>
  ) : (
    <g>
      <rect x={x - 30} y={y - 11} width={60} height={22} fill={MANIM.surface} stroke={color} strokeWidth={3.5} rx={3} />
      <text x={x} y={y - 18} fill={color} fontSize={15} fontWeight={700} textAnchor="middle">
        {etiqueta}
      </text>
    </g>
  );
}

function PilaV({ x, y, v }: { x: number; y: number; v: number }) {
  return (
    <g>
      <rect x={x - 14} y={y - 26} width={28} height={52} fill={MANIM.surface} />
      <line x1={x - 14} y1={y - 12} x2={x + 14} y2={y - 12} stroke={MANIM.green} strokeWidth={4} />
      <line x1={x - 7} y1={y + 12} x2={x + 7} y2={y + 12} stroke={MANIM.green} strokeWidth={4} />
      <text x={x - 24} y={y + 5} fill={MANIM.green} fontSize={15} fontWeight={700} textAnchor="end">
        {fmtEs(v, 1)} V
      </text>
    </g>
  );
}

/* ───────────── 1. Analogía del agua: tensión, intensidad y resistencia ───────────── */

export function AnalogiaAguaExplorador({ block }: { block: ToolBlock }) {
  const init = { v: Math.round(num(block.params?.a, 6, 1, 12)), r: Math.round(num(block.params?.b, 3, 1, 20)) };
  const [s, setS] = useState(init);
  const i = intensidad(s.v, s.r);
  const caudal = Math.min(1, i / 12);
  const altura = 30 + (s.v / 12) * 110;
  const estrecho = 30 - (Math.min(s.r, 20) / 20) * 22;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la tensión (más altura del depósito) y la resistencia (tubo más estrecho) y mira cómo cambia el caudal de electrones."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tensión V (altura del depósito)" value={s.v} min={1} max={12} step={1} unit=" V" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Resistencia R (estrechez del tubo)" value={s.r} min={1} max={20} step={1} unit=" Ω" color={MANIM.orange} onChange={(r) => setS((x) => ({ ...x, r }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="analogia-agua" maxH={210}>
        <rect x={50} y={170 - altura} width={90} height={altura} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={3} />
        <text x={95} y={160 - altura} fill={MANIM.green} fontSize={14} textAnchor="middle" fontWeight={700}>
          {s.v} V
        </text>
        <rect x={140} y={170 - estrecho} width={240} height={estrecho} fill={MANIM.blue} fillOpacity={0.2 + 0.5 * caudal} stroke={MANIM.orange} strokeWidth={3} />
        <text x={260} y={190} fill={MANIM.orange} fontSize={14} textAnchor="middle" fontWeight={700}>
          {s.r} Ω
        </text>
        {Array.from({ length: 6 }, (_, k) => (
          <circle key={k} cx={160 + k * 38} cy={170 - estrecho / 2} r={Math.max(2, estrecho / 6)} fill={MANIM.blue} opacity={0.4 + 0.6 * caudal} />
        ))}
        <rect x={380} y={110} width={100} height={60} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 4" />
        <text x={430} y={145} fill={MANIM.blue} fontSize={16} textAnchor="middle" fontWeight={700}>
          I = {f2(i)} A
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tensión (empuje)">{s.v} V</Stat>
        <Stat color={MANIM.orange} label="Resistencia (oposición)">{s.r} Ω</Stat>
        <Stat color={MANIM.blue} label="Intensidad = V ÷ R">{f2(i)} A</Stat>
      </Readout>
      <Note>Más tensión empuja más corriente; más resistencia la frena. Si duplicas R con la misma V, la intensidad se reduce a la mitad.</Note>
    </Frame>
  );
}

/* ───────────── 2. Ley de Ohm: elige la incógnita ───────────── */

export function OhmIncognitaExplorador({ block }: { block: ToolBlock }) {
  const init = { inc: Math.round(num(block.params?.n, 2, 0, 2)), x: Math.round(num(block.params?.a, 12, 1, 24)), y: Math.round(num(block.params?.b, 4, 1, 30)) };
  const [s, setS] = useState(init);
  const INC = ["V", "I", "R"] as const;
  const inc = INC[s.inc]!;
  // Datos conocidos según la incógnita
  const datos = inc === "V" ? { a: ["I", "A", s.y > 6 ? 6 : s.y] as const, b: ["R", "Ω", s.x] as const } : inc === "I" ? { a: ["V", "V", s.x] as const, b: ["R", "Ω", s.y] as const } : { a: ["V", "V", s.x] as const, b: ["I", "A", Math.max(1, Math.min(s.y, 12))] as const };
  const res = ohm(inc, datos.a[2], datos.b[2]);
  const unidad = inc === "V" ? "V" : inc === "I" ? "A" : "Ω";
  const formula = inc === "V" ? "V = I · R" : inc === "I" ? "I = V ÷ R" : "R = V ÷ I";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige qué magnitud quieres calcular y mueve los dos datos conocidos. El triángulo de Ohm tapa la incógnita."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Incógnita" items={[{ value: 0, label: "Tensión V" }, { value: 1, label: "Intensidad I" }, { value: 2, label: "Resistencia R" }]} value={s.inc} onChange={(v) => setS((x) => ({ ...x, inc: v }))} />
          <Slider label={`${datos.a[0]} (${datos.a[1]})`} value={datos.a[2]} min={1} max={inc === "V" ? 6 : 24} step={1} unit={` ${datos.a[1]}`} color={MANIM.blue} onChange={(v) => setS((x) => (inc === "V" ? { ...x, y: v } : { ...x, x: v }))} />
          <Slider label={`${datos.b[0]} (${datos.b[1]})`} value={datos.b[2]} min={1} max={inc === "R" ? 12 : 30} step={1} unit={` ${datos.b[1]}`} color={MANIM.orange} onChange={(v) => setS((x) => (inc === "V" ? { ...x, x: v } : { ...x, y: v }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="ohm-incognita" maxH={200}>
        <polygon points="260,20 360,170 160,170" fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <line x1={190} y1={120} x2={330} y2={120} stroke={MANIM.ink} strokeWidth={2} />
        <line x1={260} y1={120} x2={260} y2={170} stroke={MANIM.ink} strokeWidth={2} />
        <text x={260} y={100} fill={inc === "V" ? MANIM.yellow : MANIM.green} fontSize={30} textAnchor="middle" fontWeight={800}>
          {inc === "V" ? "?" : "V"}
        </text>
        <text x={218} y={158} fill={inc === "I" ? MANIM.yellow : MANIM.blue} fontSize={30} textAnchor="middle" fontWeight={800}>
          {inc === "I" ? "?" : "I"}
        </text>
        <text x={302} y={158} fill={inc === "R" ? MANIM.yellow : MANIM.orange} fontSize={30} textAnchor="middle" fontWeight={800}>
          {inc === "R" ? "?" : "R"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Fórmula">{formula}</Stat>
        <Stat color={MANIM.green} label="Operación">{inc === "V" ? `${datos.a[2]} · ${datos.b[2]}` : `${datos.a[2]} ÷ ${datos.b[2]}`}</Stat>
        <Stat color={MANIM.blue} label="Resultado">{f2(res)} {unidad}</Stat>
      </Readout>
      <Note>Tapa con el dedo la magnitud que buscas: si quedan una encima de otra, se dividen; si quedan una al lado de otra, se multiplican.</Note>
    </Frame>
  );
}

/* ───────────── 3. Potencia, energía y factura ───────────── */

export const APARATOS = [
  { nombre: "Bombilla LED", w: 9 },
  { nombre: "Televisión", w: 100 },
  { nombre: "Ordenador", w: 150 },
  { nombre: "Nevera", w: 150 },
  { nombre: "Horno", w: 2000 },
] as const;

export function FacturaExplorador({ block }: { block: ToolBlock }) {
  const init = { horas: [4, 3, 3, 8, 1] as number[], precio: Math.round(num(block.params?.a, 15, 5, 40)) };
  const [s, setS] = useState(init);
  const kwhDia = APARATOS.map((ap, i) => energiaKWh(ap.w, s.horas[i] ?? 0));
  const total = kwhDia.reduce((a, b) => a + b, 0);
  const euros = (total * 30 * s.precio) / 100;
  const maxK = Math.max(0.1, ...kwhDia);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ajusta las horas de uso diario de cada aparato y el precio del kWh. ¿Cuál pesa más en la factura?"}
      onReset={() => setS(init)}
      controls={
        <>
          {APARATOS.map((ap, i) => (
            <Slider key={ap.nombre} label={`${ap.nombre} (${ap.w} W)`} value={s.horas[i] ?? 0} min={0} max={ap.nombre === "Nevera" ? 24 : 10} step={1} unit=" h/día" color={MANIM.yellow} onChange={(h) => setS((x) => ({ ...x, horas: x.horas.map((o, k) => (k === i ? h : o)) }))} />
          ))}
          <Slider label="Precio de la energía" value={s.precio} min={5} max={40} step={1} unit=" c€/kWh" color={MANIM.green} onChange={(precio) => setS((x) => ({ ...x, precio }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="factura" maxH={180}>
        {APARATOS.map((ap, i) => {
          const w = (kwhDia[i]! / maxK) * 230;
          return (
            <g key={ap.nombre}>
              <text x={10} y={28 + i * 30} fill={MANIM.ink} fontSize={14}>
                {ap.nombre}
              </text>
              <rect x={130} y={14 + i * 30} width={Math.max(2, w)} height={18} fill={MANIM.yellow} fillOpacity={0.8} rx={3} />
              <text x={138 + Math.max(2, w)} y={28 + i * 30} fill={MANIM.yellow} fontSize={13}>
                {f2(kwhDia[i]!)} kWh
              </text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Energía diaria">{f2(total)} kWh</Stat>
        <Stat color={MANIM.blue} label="Energía al mes (30 días)">{f2(total * 30)} kWh</Stat>
        <Stat color={MANIM.green} label="Coste mensual">{f2(euros)} €</Stat>
      </Readout>
      <Note>Energía = potencia × tiempo. Un aparato de mucha potencia usado poco tiempo puede gastar más que uno pequeño siempre encendido.</Note>
    </Frame>
  );
}

/* ───────────── 4–5. Serie y paralelo con cálculo ───────────── */

export function SerieParaleloCalcExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), v: Math.round(num(block.params?.a, 12, 3, 24)), r1: Math.round(num(block.params?.b, 4, 1, 30)), r2: 6 };
  const [s, setS] = useState(init);
  const modo = s.modo === 0 ? "serie" : "paralelo";
  const r = resuelve(modo, s.v, s.r1, s.r2);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia R1 y R2 y compara la resistencia equivalente, la corriente total y el reparto de tensiones o corrientes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Montaje" items={[{ value: 0, label: "En serie" }, { value: 1, label: "En paralelo" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="Pila" value={s.v} min={3} max={24} step={1} unit=" V" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="R1" value={s.r1} min={1} max={30} step={1} unit=" Ω" color={MANIM.orange} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R2" value={s.r2} min={1} max={30} step={1} unit=" Ω" color={MANIM.blue} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="serie-paralelo-calc" maxH={200}>
        {modo === "serie" ? (
          <>
            <path d="M 70 95 L 70 40 L 450 40 L 450 150 L 70 150 Z" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <PilaV x={70} y={95} v={s.v} />
            <Resistencia x={190} y={40} etiqueta={`R1 = ${s.r1} Ω`} />
            <Resistencia x={340} y={40} etiqueta={`R2 = ${s.r2} Ω`} color={MANIM.blue} />
          </>
        ) : (
          <>
            <path d="M 70 95 L 70 30 L 500 30 M 70 95 L 70 160 L 500 160" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <path d="M 220 30 L 220 160 M 360 30 L 360 160 M 500 30 L 500 160" stroke={MANIM.ink} strokeWidth={4} />
            <PilaV x={70} y={95} v={s.v} />
            <Resistencia x={220} y={95} vertical izq etiqueta={`R1 = ${s.r1} Ω`} />
            <Resistencia x={360} y={95} vertical etiqueta={`R2 = ${s.r2} Ω`} color={MANIM.blue} />
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Resistencia equivalente">{f2(r.req)} Ω</Stat>
        <Stat color={MANIM.blue} label="Corriente de la pila">{f2(r.iTotal)} A</Stat>
        <Stat color={MANIM.orange} label={modo === "serie" ? "Tensión en R1 / R2" : "Corriente por R1 / R2"}>
          {modo === "serie" ? `${f2(r.v1)} V / ${f2(r.v2)} V` : `${f2(r.i1)} A / ${f2(r.i2)} A`}
        </Stat>
      </Readout>
      <Note>{modo === "serie" ? "En serie pasa la misma corriente por todas y las resistencias se suman: Req = R1 + R2. La tensión se reparte en proporción a cada resistencia." : "En paralelo todas reciben la tensión de la pila y las corrientes se suman. La resistencia equivalente es siempre menor que la menor de las resistencias."}</Note>
    </Frame>
  );
}

/* ───────────── 6. Circuito mixto ───────────── */

export function MixtoExplorador({ block }: { block: ToolBlock }) {
  const init = { v: Math.round(num(block.params?.a, 12, 3, 24)), r1: Math.round(num(block.params?.b, 4, 1, 30)), r2: 6, r3: 3, paso: 0 };
  const [s, setS] = useState(init);
  const r = resuelveMixto(s.v, s.r1, s.r2, s.r3);
  const pasos = ["Circuito original", "1. R2 ∥ R3 → Rp", "2. R1 + Rp → Req"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Avanza por los pasos de la reducción: primero el paralelo, luego la suma en serie. Después recorre el camino inverso para hallar tensiones y corrientes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Paso" items={pasos.map((label, value) => ({ value, label }))} value={s.paso} onChange={(paso) => setS((x) => ({ ...x, paso }))} />
          <Slider label="Pila" value={s.v} min={3} max={24} step={1} unit=" V" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="R1" value={s.r1} min={1} max={30} step={1} unit=" Ω" color={MANIM.orange} onChange={(r1) => setS((x) => ({ ...x, r1 }))} />
          <Slider label="R2" value={s.r2} min={1} max={30} step={1} unit=" Ω" color={MANIM.blue} onChange={(r2) => setS((x) => ({ ...x, r2 }))} />
          <Slider label="R3" value={s.r3} min={1} max={30} step={1} unit=" Ω" color={MANIM.purple} onChange={(r3) => setS((x) => ({ ...x, r3 }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="mixto" maxH={200}>
        <path d="M 60 95 L 60 30 L 250 30 M 60 95 L 60 160 L 500 160" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <PilaV x={60} y={95} v={s.v} />
        <Resistencia x={150} y={30} etiqueta={`R1 = ${s.r1} Ω`} />
        {s.paso === 0 ? (
          <>
            <path d="M 250 30 L 500 30 L 500 160 M 300 30 L 300 160 M 400 30 L 400 160" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <Resistencia x={300} y={95} vertical izq etiqueta={`R2 = ${s.r2} Ω`} color={MANIM.blue} />
            <Resistencia x={400} y={95} vertical etiqueta={`R3 = ${s.r3} Ω`} color={MANIM.purple} />
          </>
        ) : s.paso === 1 ? (
          <>
            <path d="M 250 30 L 350 30 L 350 160" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <Resistencia x={350} y={95} vertical etiqueta={`Rp = ${f2(r.rp)} Ω`} color={MANIM.yellow} />
          </>
        ) : (
          <>
            <path d="M 210 30 L 320 30 L 320 160" fill="none" stroke={MANIM.ink} strokeWidth={4} />
            <Resistencia x={320} y={95} vertical etiqueta={`Req = ${f2(r.req)} Ω`} color={MANIM.yellow} />
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="R2 ∥ R3">{f2(r.rp)} Ω</Stat>
        <Stat color={MANIM.green} label="Req = R1 + Rp">{f2(r.req)} Ω</Stat>
        <Stat color={MANIM.blue} label="Corriente total">{f2(r.iTotal)} A</Stat>
        <Stat color={MANIM.orange} label="V en R1 / V en el paralelo">{f2(r.v1)} V / {f2(r.vp)} V</Stat>
        <Stat color={MANIM.purple} label="I por R2 / R3">{f2(r.i2)} A / {f2(r.i3)} A</Stat>
      </Readout>
      <Note>Un circuito mixto se resuelve reduciendo: primero los paralelos, luego las series, hasta llegar a una sola resistencia. Después se vuelve hacia atrás repartiendo tensiones y corrientes.</Note>
    </Frame>
  );
}

/* ───────────── 7. Polímetro: dónde y cómo medir ───────────── */

export type ModoMedida = "V" | "A" | "Ω";
export type PuntoMedida = "r1" | "r2" | "pila" | "serie" | "apagado";

/** Lectura del polímetro para una pila de `v` voltios con R1 y R2 en serie. */
export function lecturaPolimetro(modo: ModoMedida, punto: PuntoMedida, v: number, r1: number, r2: number): { texto: string; ok: boolean; aviso: string } {
  const i = v / (r1 + r2);
  if (modo === "V") {
    if (punto === "serie") return { texto: "0 V (casi)", ok: false, aviso: "El voltímetro se conecta en PARALELO con el elemento. En serie tiene tanta resistencia que apenas pasa corriente." };
    if (punto === "r1") return { texto: `${f2(i * r1)} V`, ok: true, aviso: "Bien: el voltímetro está en paralelo con R1." };
    if (punto === "r2") return { texto: `${f2(i * r2)} V`, ok: true, aviso: "Bien: el voltímetro está en paralelo con R2." };
    if (punto === "pila") return { texto: `${f2(v)} V`, ok: true, aviso: "Bien: mide la tensión de la pila." };
    return { texto: `${f2(v)} V`, ok: true, aviso: "La pila sigue teniendo tensión aunque el circuito esté abierto." };
  }
  if (modo === "A") {
    if (punto === "serie") return { texto: `${f2(i)} A`, ok: true, aviso: "Bien: el amperímetro se coloca EN SERIE, intercalado en el cable." };
    if (punto === "apagado") return { texto: "0 A", ok: false, aviso: "Sin circuito cerrado no circula corriente." };
    return { texto: "¡Cortocircuito!", ok: false, aviso: "Un amperímetro en paralelo es casi un cable: provoca un cortocircuito y puede fundir el fusible o dañar el aparato." };
  }
  if (punto === "apagado") return { texto: `${f2(r1)} Ω (R1)`, ok: true, aviso: "Bien: para medir resistencia hay que desconectar el elemento de la pila." };
  return { texto: "Lectura falsa", ok: false, aviso: "La resistencia se mide con el circuito SIN alimentación y el elemento aislado; si no, la tensión de la pila falsea la medida." };
}

export function PolimetroExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 2)), punto: 0, v: Math.round(num(block.params?.a, 9, 3, 24)) };
  const [s, setS] = useState(init);
  const MODOS: ModoMedida[] = ["V", "A", "Ω"];
  const PUNTOS: { id: PuntoMedida; label: string }[] = [
    { id: "r1", label: "En paralelo con R1" },
    { id: "r2", label: "En paralelo con R2" },
    { id: "pila", label: "En paralelo con la pila" },
    { id: "serie", label: "En serie con el circuito" },
    { id: "apagado", label: "Circuito desconectado" },
  ];
  const modo = MODOS[s.modo]!;
  const punto = PUNTOS[s.punto]!.id;
  const R1 = 100;
  const R2 = 200;
  const l = lecturaPolimetro(modo, punto, s.v, R1, R2);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige qué magnitud medir y dónde conectar el polímetro (R1 = 100 Ω, R2 = 200 Ω en serie). Algunas conexiones son erróneas a propósito."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Magnitud" items={[{ value: 0, label: "Tensión (V)" }, { value: 1, label: "Intensidad (A)" }, { value: 2, label: "Resistencia (Ω)" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Dónde conectar">
            {PUNTOS.map((p, k) => (
              <button key={p.id} type="button" className={TOOL_BTN} aria-pressed={s.punto === k} onClick={() => setS((x) => ({ ...x, punto: k }))}>
                {p.label}
              </button>
            ))}
          </div>
          <Slider label="Pila" value={s.v} min={3} max={24} step={1} unit=" V" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="polimetro" maxH={180}>
        <path d="M 60 85 L 60 30 L 460 30 L 460 140 L 60 140 Z" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <PilaV x={60} y={85} v={s.v} />
        <Resistencia x={200} y={30} etiqueta="R1 = 100 Ω" />
        <Resistencia x={340} y={30} etiqueta="R2 = 200 Ω" color={MANIM.blue} />
        <rect x={190} y={92} width={140} height={44} rx={8} fill={MANIM.panel} stroke={l.ok ? MANIM.green : MANIM.red} strokeWidth={3} />
        <text x={260} y={120} fill={l.ok ? MANIM.green : MANIM.red} fontSize={20} fontWeight={800} textAnchor="middle">
          {l.texto}
        </text>
      </Svg>
      <Readout>
        <Stat color={l.ok ? MANIM.green : MANIM.red} label="Lectura">{l.texto}</Stat>
        <Stat color={MANIM.yellow} label="Conexión">{l.ok ? "Correcta" : "Incorrecta"}</Stat>
      </Readout>
      <Note>{l.aviso}</Note>
    </Frame>
  );
}

/* ───────────── 8. Diagnóstico de averías ───────────── */

export type Averia = "ninguna" | "cable" | "lampara" | "corto";
export const AVERIAS: { id: Averia; label: string }[] = [
  { id: "ninguna", label: "Sin avería" },
  { id: "cable", label: "Cable cortado" },
  { id: "lampara", label: "Lámpara fundida" },
  { id: "corto", label: "Cortocircuito" },
];

/** Medidas en un circuito de pila `v` y lámpara de `r` ohmios con una avería. */
export function medidasAveria(av: Averia, v: number, r: number) {
  switch (av) {
    case "ninguna":
      return { i: v / r, vLampara: v, vPila: v, luce: true };
    case "cable":
      return { i: 0, vLampara: 0, vPila: v, luce: false };
    case "lampara":
      return { i: 0, vLampara: v, vPila: v, luce: false };
    default:
      return { i: 99, vLampara: 0, vPila: 0.5, luce: false };
  }
}

export function FalloCircuitoExplorador({ block }: { block: ToolBlock }) {
  const init = { av: Math.round(num(block.params?.n, 2, 0, 3)), v: Math.round(num(block.params?.a, 6, 3, 12)) };
  const [s, setS] = useState(init);
  const av = AVERIAS[s.av]!.id;
  const m = medidasAveria(av, s.v, 12);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada avería deja una «huella» en las medidas. Compara tensiones e intensidad para saber qué ha fallado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Avería" items={AVERIAS.map((a, value) => ({ value, label: a.label }))} value={s.av} onChange={(av) => setS((x) => ({ ...x, av }))} />
          <Slider label="Pila" value={s.v} min={3} max={12} step={1} unit=" V" color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="fallo" maxH={180}>
        <path d="M 70 85 L 70 30 L 200 30 M 330 30 L 450 30 L 450 140 L 70 140 Z" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <PilaV x={70} y={85} v={s.v} />
        {av === "cable" ? (
          <text x={265} y={20} fill={MANIM.red} fontSize={15} textAnchor="middle" fontWeight={700}>
            ✂ cable cortado
          </text>
        ) : (
          <line x1={200} y1={30} x2={330} y2={30} stroke={MANIM.ink} strokeWidth={4} />
        )}
        {av === "corto" ? <path d="M 400 30 L 400 140" stroke={MANIM.red} strokeWidth={5} /> : null}
        <circle cx={450} cy={85} r={22} fill={m.luce ? MANIM.yellow : MANIM.surface} fillOpacity={m.luce ? 0.5 : 1} stroke={av === "lampara" ? MANIM.red : MANIM.yellow} strokeWidth={4} />
        <text x={450} y={91} fill={MANIM.ink} fontSize={16} textAnchor="middle">
          {av === "lampara" ? "✕" : "L"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="¿Luce la lámpara?">{m.luce ? "Sí" : "No"}</Stat>
        <Stat color={MANIM.blue} label="Intensidad">{av === "corto" ? "muy alta" : `${f2(m.i)} A`}</Stat>
        <Stat color={MANIM.orange} label="Tensión en la lámpara">{f2(m.vLampara)} V</Stat>
        <Stat color={MANIM.green} label="Tensión en la pila">{f2(m.vPila)} V</Stat>
      </Readout>
      <Note>
        {av === "ninguna" && "Todo normal: la corriente circula y la lámpara recibe toda la tensión."}
        {av === "cable" && "Con el cable cortado no hay camino: la intensidad es 0 y la lámpara no tiene tensión. La pila sigue dando sus voltios."}
        {av === "lampara" && "Lámpara fundida: el circuito queda abierto en ella, así que no circula corriente y toda la tensión aparece entre sus extremos."}
        {av === "corto" && "En un cortocircuito la corriente salta la lámpara por un camino de casi cero resistencia: intensidad enorme, tensión casi nula y peligro de calentamiento. Para eso están los fusibles."}
      </Note>
    </Frame>
  );
}
