"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const NECESIDADES = ["Ligera", "Resistente", "Barata", "Fácil de montar"] as const;
export const CARACTERISTICAS = ["Masa", "Material", "N.º de piezas", "Tipo de unión"] as const;
/** Relaciones necesidad → característica técnica (0, 1, 3 o 9, como en la casa de la calidad). */
export const RELACIONES: readonly (readonly number[])[] = [
  [9, 3, 1, 0],
  [3, 9, 0, 3],
  [3, 9, 9, 3],
  [0, 0, 9, 9],
];
/** Prioridad de cada característica técnica = Σ peso_i · relación_ij. */
export function prioridades(pesos: readonly number[], rel: readonly (readonly number[])[] = RELACIONES) {
  const n = rel[0]?.length ?? 0;
  const abs = Array.from({ length: n }, (_, j) => pesos.reduce((s, w, i) => s + w * (rel[i]?.[j] ?? 0), 0));
  const tot = abs.reduce((a, b) => a + b, 0);
  return { abs, pct: abs.map((v) => (tot > 0 ? (v / tot) * 100 : 0)) };
}

export type Tarea = { id: string; nombre: string; dur: number; pre: readonly string[] };
/** Método PERT/CPM: primeros y últimos instantes, holgura y camino crítico de una red de tareas. */
export function caminoCritico(tareas: readonly Tarea[]) {
  const ES: Record<string, number> = {};
  const EF: Record<string, number> = {};
  for (const t of tareas) {
    ES[t.id] = Math.max(0, ...t.pre.map((p) => EF[p] ?? 0));
    EF[t.id] = ES[t.id]! + t.dur;
  }
  const fin = Math.max(0, ...tareas.map((t) => EF[t.id]!));
  const LS: Record<string, number> = {};
  const LF: Record<string, number> = {};
  for (const t of [...tareas].reverse()) {
    const sucesoras = tareas.filter((x) => x.pre.includes(t.id));
    LF[t.id] = sucesoras.length ? Math.min(...sucesoras.map((x) => LS[x.id]!)) : fin;
    LS[t.id] = LF[t.id]! - t.dur;
  }
  const holgura = Object.fromEntries(tareas.map((t) => [t.id, LS[t.id]! - ES[t.id]!]));
  return { ES, EF, LS, LF, holgura, fin, critica: tareas.filter((t) => Math.abs(holgura[t.id]!) < 1e-9).map((t) => t.id) };
}

/** Dimensiones de las tres vistas (mm en el papel) de un prisma a × b × c a una escala 1:e. */
export function vistasPrisma(a: number, b: number, c: number, e: number) {
  const k = e > 0 ? 1 / e : 0;
  return { alzado: [a * k, b * k], planta: [a * k, c * k], perfil: [c * k, b * k] };
}

/** Resultado económico de fabricar q unidades con un coste fijo F y un coste variable cv por unidad. */
export function viabilidad(fijo: number, cv: number, precio: number, q: number) {
  const margen = precio - cv;
  return { margen, beneficio: q * margen - fijo, equilibrio: margen > 0 ? Math.ceil(fijo / margen) : Infinity, ingresos: q * precio, costes: fijo + q * cv };
}

/* ───────────── 1. Casa de la calidad ───────────── */

export function CasaCalidadExplorador({ block }: { block: ToolBlock }) {
  const init = { w: [Math.round(num(block.params?.a, 4, 1, 5)), 5, 3, 2] as number[] };
  const [s, setS] = useState(init);
  const r = prioridades(s.w);
  const max = Math.max(...r.pct, 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Puntúa la importancia que da el cliente a cada necesidad (1–5). La matriz traduce esas necesidades en prioridades técnicas."}
      onReset={() => setS(init)}
      controls={
        <>
          {NECESIDADES.map((n, i) => (
            <Slider key={n} label={`Importancia: ${n}`} value={s.w[i]!} min={1} max={5} step={1} color={[MANIM.blue, MANIM.orange, MANIM.purple, MANIM.green][i]!} onChange={(v) => setS((x) => ({ w: x.w.map((y, k) => (k === i ? v : y)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={140} testId="casa-calidad" maxH={160}>
        {CARACTERISTICAS.map((c, j) => (
          <g key={c}>
            <rect x={40 + j * 120} y={115 - (r.pct[j]! / max) * 95} width={90} height={(r.pct[j]! / max) * 95} rx={4} fill={MANIM.orange} fillOpacity={0.6} />
            <text x={85 + j * 120} y={108 - (r.pct[j]! / max) * 95} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>
              {f0(r.pct[j]!)} %
            </text>
            <text x={85 + j * 120} y={132} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
              {c}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Característica más importante">{CARACTERISTICAS[r.pct.indexOf(Math.max(...r.pct))]}</Stat>
      </Readout>
      <Note>La <b>casa de la calidad</b> (QFD) relaciona lo que quiere el cliente con lo que puede controlar el diseño. Cada relación vale 0, 1, 3 o 9 (nula, débil, media, fuerte); la prioridad de una característica es la suma de (importancia × relación). Así se decide en qué invertir el esfuerzo de diseño.</Note>
    </Frame>
  );
}

/* ───────────── 2. Vistas de un prisma ───────────── */

export function VistasExplorador({ block }: { block: ToolBlock }) {
  const init = { a: num(block.params?.a, 80, 10, 200), b: num(block.params?.b, 50, 10, 200), c: 60, e: 2 };
  const [s, setS] = useState(init);
  const E = [1, 2, 5][s.e === 1 ? 0 : s.e === 2 ? 1 : 2] ?? 2;
  const v = vistasPrisma(s.a, s.b, s.c, s.e);
  const sc = Math.min(2.5, 400 / Math.max(1, v.alzado[0]! + v.planta[0]! + v.perfil[0]!), 110 / Math.max(1, v.alzado[1]!, v.planta[1]!));
  const R = (w: number, h: number, x: number, y: number, t: string) => (
    <g>
      <rect x={x} y={y} width={Math.max(2, w * sc)} height={Math.max(2, h * sc)} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={2} />
      <text x={x + (w * sc) / 2} y={y - 4} textAnchor="middle" fill={MANIM.muted} fontSize={10}>
        {t}
      </text>
    </g>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un objeto se representa con tres vistas: alzado, planta y perfil. Cambia las medidas reales y la escala."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ancho a" value={s.a} min={10} max={200} step={5} unit=" mm" color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Alto b" value={s.b} min={10} max={200} step={5} unit=" mm" color={MANIM.orange} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Fondo c" value={s.c} min={10} max={200} step={5} unit=" mm" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Choice label="Escala" items={[{ value: 1, label: "1:1" }, { value: 2, label: "1:2" }, { value: 5, label: "1:5" }]} value={s.e} onChange={(e) => setS((x) => ({ ...x, e }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="vistas" maxH={180}>
        {R(v.alzado[0]!, v.alzado[1]!, 20, 28, "alzado")}
        {R(v.planta[0]!, v.planta[1]!, 20 + v.alzado[0]! * sc + 30, 28, "planta")}
        {R(v.perfil[0]!, v.perfil[1]!, 20 + (v.alzado[0]! + v.planta[0]!) * sc + 60, 28, "perfil")}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Alzado en el papel">{f1(v.alzado[0]!)} × {f1(v.alzado[1]!)} mm</Stat>
        <Stat color={MANIM.orange} label="Planta en el papel">{f1(v.planta[0]!)} × {f1(v.planta[1]!)} mm</Stat>
        <Stat color={MANIM.purple} label="Perfil en el papel">{f1(v.perfil[0]!)} × {f1(v.perfil[1]!)} mm</Stat>
        <Stat color={MANIM.green} label="Volumen real">{f0((s.a * s.b * s.c) / 1000)} cm³</Stat>
      </Readout>
      <Note>Con escala 1:{E} cada medida del papel es {E} veces menor que la real. En el plano <b>se acota la medida real</b>, no la dibujada. El alzado muestra ancho y alto; la planta, ancho y fondo; el perfil, fondo y alto. Tres vistas bastan para definir un prisma.</Note>
    </Frame>
  );
}

/* ───────────── 3. PERT / camino crítico ───────────── */

const TAREAS_BASE: Omit<Tarea, "dur">[] = [
  { id: "A", nombre: "Diseño", pre: [] },
  { id: "B", nombre: "Compra de materiales", pre: ["A"] },
  { id: "C", nombre: "Construir la estructura", pre: ["B"] },
  { id: "D", nombre: "Hacer la electrónica", pre: ["A"] },
  { id: "E", nombre: "Montaje", pre: ["C", "D"] },
  { id: "F", nombre: "Pruebas", pre: ["E"] },
];

export function PertExplorador({ block }: { block: ToolBlock }) {
  const init = { d: [3, 2, 4, 3, 2, 2].map((v, i) => (i === 3 ? Math.round(num(block.params?.a, v, 1, 10)) : v)) };
  const [s, setS] = useState(init);
  const tareas: Tarea[] = TAREAS_BASE.map((t, i) => ({ ...t, dur: s.d[i]! }));
  const r = caminoCritico(tareas);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada tarea tiene una duración y depende de otras. El camino crítico es la cadena que fija la duración total del proyecto."}
      onReset={() => setS(init)}
      controls={
        <>
          {tareas.map((t, i) => (
            <Slider key={t.id} label={`${t.id}. ${t.nombre}${t.pre.length ? ` (tras ${t.pre.join(", ")})` : ""}`} value={s.d[i]!} min={1} max={10} step={1} unit=" d" color={r.critica.includes(t.id) ? MANIM.red : MANIM.blue} onChange={(v) => setS((x) => ({ d: x.d.map((y, k) => (k === i ? v : y)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={130} testId="pert" maxH={150}>
        {tareas.map((t, i) => {
          const crit = r.critica.includes(t.id);
          const x = 20 + (r.ES[t.id]! / Math.max(1, r.fin)) * 470;
          const w = Math.max(6, (t.dur / Math.max(1, r.fin)) * 470);
          return (
            <g key={t.id}>
              <rect x={x} y={8 + i * 19} width={w} height={14} rx={3} fill={crit ? MANIM.red : MANIM.blue} fillOpacity={0.7} />
              <text x={x + 3} y={19 + i * 19} fill={MANIM.ink} fontSize={10} fontWeight={700}>
                {t.id}
              </text>
              {!crit ? <rect x={x + w} y={11 + i * 19} width={(r.holgura[t.id]! / Math.max(1, r.fin)) * 470} height={8} fill={MANIM.muted} fillOpacity={0.3} /> : null}
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Duración del proyecto">{r.fin} días</Stat>
        <Stat color={MANIM.red} label="Camino crítico">{r.critica.join(" → ")}</Stat>
        <Stat color={MANIM.muted} label="Holgura de D">{r.holgura.D} días</Stat>
      </Readout>
      <Note>En una red de tareas, el <b>camino crítico</b> es el más largo: las tareas que están en él tienen <b>holgura cero</b> y cualquier retraso retrasa todo el proyecto. Las demás tienen holgura (la zona gris): pueden retrasarse sin consecuencias hasta ese límite. Cambia las duraciones y observa cuándo cambia el camino crítico.</Note>
    </Frame>
  );
}

/* ───────────── 4. Viabilidad económica ───────────── */

export function ViabilidadExplorador({ block }: { block: ToolBlock }) {
  const init = { F: num(block.params?.a, 2000, 0, 20000), cv: 8, p: 20, q: 300 };
  const [s, setS] = useState(init);
  const r = viabilidad(s.F, s.cv, s.p, s.q);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un producto se fabrica con un coste fijo (diseño, moldes, máquinas) y un coste variable por unidad. ¿Cuántas hay que vender para ganar dinero?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Coste fijo (diseño, utillaje)" value={s.F} min={0} max={20000} step={500} unit=" €" color={MANIM.blue} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Coste variable por unidad" value={s.cv} min={1} max={30} step={1} unit=" €" color={MANIM.orange} onChange={(cv) => setS((x) => ({ ...x, cv }))} />
          <Slider label="Precio de venta" value={s.p} min={2} max={60} step={1} unit=" €" color={MANIM.green} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Unidades vendidas" value={s.q} min={0} max={2000} step={50} color={MANIM.purple} onChange={(q) => setS((x) => ({ ...x, q }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Margen por unidad">{f2(r.margen)} €</Stat>
        <Stat color={MANIM.purple} label="Punto de equilibrio">{Number.isFinite(r.equilibrio) ? `${f0(r.equilibrio)} unidades` : "no se alcanza"}</Stat>
        <Stat color={MANIM.blue} label="Ingresos">{f0(r.ingresos)} €</Stat>
        <Stat color={MANIM.orange} label="Costes">{f0(r.costes)} €</Stat>
        <Stat color={r.beneficio >= 0 ? MANIM.green : MANIM.red} label="Beneficio">{f0(r.beneficio)} €</Stat>
      </Readout>
      <Note>Beneficio = unidades · (precio − coste variable) − coste fijo. El <b>punto de equilibrio</b> es el número de unidades a partir del cual se recupera el coste fijo: F / (precio − coste variable). Si el precio no supera al coste variable, nunca se gana dinero. Un proyecto viable técnicamente puede no serlo económicamente.</Note>
    </Frame>
  );
}
