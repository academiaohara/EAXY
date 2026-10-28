"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { puntuacion } from "@/components/lesson/slide/tools/TecEso2MaterialesTools";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export type Nivel = "vacio" | "vago" | "parcial" | "medible";
const VAGAS = /(bonit|fuerte|bueno|buena|grande|pequeñ|peque\b|ligero|ligera|fácil|facil|rápid|rapid|cómod|comod|barat|resistente|duradero|seguro|segura)/i;
const NUM_UNIDAD = /\d+([.,]\d+)?\s*(kg|g|mm|cm|m|km|€|euros?|h|horas?|min|minutos?|s|segundos?|w|v|a|n|%|l|litros?|°c|grados?)(?![a-záéíóúñ])/i;

/** Valora si un requisito está escrito de forma verificable (con valor y unidad) y da pistas. */
export function evaluaRequisito(txt: string): { nivel: Nivel; pistas: string[] } {
  const t = txt.trim();
  if (!t) return { nivel: "vacio", pistas: ["Escribe un requisito, por ejemplo: «El soporte debe aguantar 500 g»."] };
  const pistas: string[] = [];
  const medible = NUM_UNIDAD.test(t);
  const vaga = t.match(VAGAS);
  if (!/(debe|tiene que|ha de|puede)/i.test(t)) pistas.push("Empieza con «debe…» para que sea una exigencia clara.");
  if (medible) return { nivel: "medible", pistas: pistas.length ? pistas : ["Es verificable: se puede comprobar con una medida."] };
  if (/\d/.test(t)) {
    pistas.push("Hay un número, pero falta la unidad (kg, mm, €, min…).");
    return { nivel: "parcial", pistas };
  }
  if (vaga) pistas.push(`«${vaga[1]}» es subjetivo: ¿cuánto es eso? Sustitúyelo por un valor con unidad.`);
  else pistas.push("Añade un valor medible con su unidad para poder comprobarlo.");
  return { nivel: "vago", pistas };
}

export const TECNICAS_SCAMPER = ["Sustituir", "Combinar", "Adaptar", "Modificar", "Otro uso", "Eliminar", "Reordenar"] as const;
export const OBJETOS_SCAMPER = ["Botella de agua", "Mochila", "Lámpara de escritorio"] as const;
export const IDEAS_SCAMPER: readonly (readonly string[])[] = [
  ["¿Y si el tapón fuera de silicona plegable?", "Botella con filtro de agua incorporado.", "Adaptar la forma para encajar en el portabotellas de la bici.", "Hacerla plegable para que ocupe menos vacía.", "Usarla como regadera de plantas.", "Quitar la etiqueta y grabar el diseño en el material.", "Poner el tapón en el fondo para beber más cómodo."],
  ["Sustituir la tela por material reciclado.", "Mochila con paneles solares para cargar el móvil.", "Adaptar los tirantes para llevarla como bolsa de mano.", "Hacerla más estrecha para ir en bici.", "Convertirla en cojín o asiento plegable.", "Eliminar cremalleras por cierres magnéticos.", "Poner los bolsillos de uso diario en la espalda y lo pesado abajo."],
  ["Cambiar la bombilla por un LED de bajo consumo.", "Lámpara con cargador inalámbrico en la base.", "Adaptar el brazo para sujetarla a la mesa con pinza.", "Hacer el brazo extensible y regulable.", "Usarla como luz de lectura para la cama.", "Quitar el cable y usar una batería recargable.", "Pasar el interruptor a la base, con un sensor táctil."],
];

export const IDEAS_SOPORTE = ["A · Soporte plegable de cartón", "B · Soporte de madera fijo", "C · Soporte impreso en 3D"] as const;
export const CRITERIOS_IDEAS = ["Cumple requisitos", "Bajo coste", "Facilidad de construcción", "Seguridad", "Aspecto"] as const;
export const NOTAS_IDEAS: readonly (readonly number[])[] = [
  [3, 5, 4, 4, 2],
  [4, 3, 3, 4, 4],
  [5, 2, 2, 4, 5],
];

export type TareaPlan = { n: string; dep: number[] };
export const TAREAS: TareaPlan[] = [
  { n: "Investigar", dep: [] },
  { n: "Diseñar y bocetar", dep: [0] },
  { n: "Preparar materiales", dep: [1] },
  { n: "Construir", dep: [2] },
  { n: "Probar y ajustar", dep: [3] },
  { n: "Redactar la memoria", dep: [1] },
];

/** Planificación con dependencias: inicio y fin más tempranos, duración total y tareas críticas (sin holgura). */
export function planifica(durs: readonly number[]) {
  const es: number[] = [];
  const ef: number[] = [];
  TAREAS.forEach((t, i) => {
    es[i] = t.dep.length ? Math.max(...t.dep.map((d) => ef[d]!)) : 0;
    ef[i] = es[i]! + durs[i]!;
  });
  const total = Math.max(...ef);
  const lf: number[] = TAREAS.map(() => total);
  for (let i = TAREAS.length - 1; i >= 0; i -= 1) {
    const sucesores = TAREAS.map((t, k) => (t.dep.includes(i) ? k : -1)).filter((k) => k >= 0);
    if (sucesores.length) lf[i] = Math.min(...sucesores.map((k) => lf[k]! - durs[k]!));
  }
  const critica = TAREAS.map((_, i) => lf[i]! - ef[i]! === 0);
  return { es, ef, total, critica };
}

export const REQ_PRUEBAS = [
  { n: "Aguanta un móvil de peso", u: "g", min: 500, max: 1500, cumple: (v: number) => v >= 500, req: "≥ 500 g" },
  { n: "Posiciones de inclinación", u: "", min: 1, max: 6, cumple: (v: number) => v >= 3, req: "≥ 3" },
  { n: "Ángulo de vuelco", u: "°", min: 5, max: 45, cumple: (v: number) => v >= 20, req: "≥ 20°" },
  { n: "Coste de fabricación", u: "€", min: 1, max: 12, cumple: (v: number) => v <= 5, req: "≤ 5 €" },
] as const;

export const evaluaPruebas = (vals: readonly number[]) => REQ_PRUEBAS.map((r, i) => r.cumple(vals[i]!));

export const SECCIONES_MEMORIA = [
  { n: "Portada", clave: false },
  { n: "Índice", clave: false },
  { n: "Necesidad y problema", clave: true },
  { n: "Búsqueda de información", clave: false },
  { n: "Ideas y solución elegida", clave: true },
  { n: "Planos y dibujos", clave: true },
  { n: "Materiales y presupuesto", clave: true },
  { n: "Plan de trabajo", clave: false },
  { n: "Proceso de construcción", clave: false },
  { n: "Pruebas y evaluación", clave: true },
  { n: "Conclusiones y mejoras", clave: true },
  { n: "Bibliografía y fuentes", clave: false },
] as const;

export function puntuaMemoria(on: readonly boolean[]) {
  const total = on.filter(Boolean).length;
  const faltanClave = SECCIONES_MEMORIA.filter((s, i) => s.clave && !on[i]).map((s) => s.n);
  return { total, faltanClave };
}

/* ───────────── 1. Requisitos medibles ───────────── */

const EJEMPLOS_REQ = ["El soporte debe ser fuerte y bonito", "El soporte debe aguantar 500 g sin deformarse", "El soporte debe costar menos de 5", "El soporte debe aguantar 5 kg"];

export function RequisitosProyectoExplorador({ block }: { block: ToolBlock }) {
  const init = { txt: EJEMPLOS_REQ[Math.round(num(block.params?.n, 0, 0, EJEMPLOS_REQ.length - 1))]! };
  const [s, setS] = useState(init);
  const r = evaluaRequisito(s.txt);
  const col = r.nivel === "medible" ? MANIM.green : r.nivel === "parcial" ? MANIM.yellow : r.nivel === "vago" ? MANIM.red : MANIM.muted;
  const NOM: Record<Nivel, string> = { vacio: "—", vago: "Vago", parcial: "Incompleto", medible: "Medible" };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Escribe un requisito y comprueba si se podría verificar con una medida. Prueba con los ejemplos."}
      onReset={() => setS(init)}
      controls={
        <>
          <label className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)] sm:col-span-2">
            Requisito
            <input
              type="text"
              value={s.txt}
              aria-label="Requisito"
              onChange={(e) => setS({ txt: e.target.value })}
              className="rounded-lg border border-white/20 bg-black/30 px-3 py-2 text-base text-[color:var(--stage-ink,#fff)]"
            />
          </label>
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Ejemplos">
            {EJEMPLOS_REQ.map((e, i) => (
              <button key={i} type="button" className={TOOL_BTN} onClick={() => setS({ txt: e })}>
                Ejemplo {i + 1}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={col} label="Valoración">{NOM[r.nivel]}</Stat>
      </Readout>
      <ul className="list-disc pl-5 text-base" data-testid="requisitos">
        {r.pistas.map((p) => (
          <li key={p}>{p}</li>
        ))}
      </ul>
      <Note>Un requisito bien escrito se puede comprobar: tiene un valor, una unidad y un criterio. «Fuerte» no se puede medir; «aguanta 500 g sin deformarse más de 2 mm» sí.</Note>
    </Frame>
  );
}

/* ───────────── 2. SCAMPER ───────────── */

export function ScamperExplorador({ block }: { block: ToolBlock }) {
  const init = { o: Math.round(num(block.params?.n, 0, 0, 2)), t: Math.round(num(block.params?.a, 0, 0, 6)) };
  const [s, setS] = useState(init);
  const PREG = ["¿Qué material o pieza se puede cambiar por otro?", "¿Qué dos cosas se pueden unir?", "¿Qué se puede copiar de otro objeto o de la naturaleza?", "¿Qué se puede hacer más grande, más pequeño o distinto?", "¿Para qué más podría servir?", "¿Qué se puede quitar y seguir funcionando?", "¿Qué pasa si cambio el orden o la posición?"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "SCAMPER es una lista de preguntas para generar ideas sobre un objeto existente. Elige un objeto y una técnica."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Objeto" items={OBJETOS_SCAMPER.map((n, value) => ({ value, label: n }))} value={s.o} onChange={(o) => setS((x) => ({ ...x, o }))} />
          <Choice label="Técnica" items={TECNICAS_SCAMPER.map((n, value) => ({ value, label: n }))} value={s.t} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-base" data-testid="scamper">
        <div className="mb-1 text-sm" style={{ color: MANIM.yellow }}>
          {TECNICAS_SCAMPER[s.t]}: {PREG[s.t]}
        </div>
        <div className="font-bold" style={{ color: MANIM.green }}>
          {IDEAS_SCAMPER[s.o]![s.t]}
        </div>
      </div>
      <Note>En la fase de ideas no se descarta nada: se busca cantidad. Después, con los requisitos delante, se elige la mejor. Muchos inventos son mejoras de algo que ya existía.</Note>
    </Frame>
  );
}

/* ───────────── 3. Selección de ideas ───────────── */

export function SeleccionIdeasExplorador({ block }: { block: ToolBlock }) {
  const init = { p: [4, 3, 3, 4, 2].map((v, i) => (block.params?.n === 1 ? [2, 5, 4, 3, 1][i]! : v)) };
  const [s, setS] = useState(init);
  const res = IDEAS_SOPORTE.map((n, i) => ({ n, v: puntuacion(s.p, NOTAS_IDEAS[i]!) })).sort((a, b) => b.v - a.v);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pondera cada criterio según lo que pide tu proyecto y mira qué idea gana. Las notas de cada idea son orientativas."}
      onReset={() => setS(init)}
      controls={
        <>
          {CRITERIOS_IDEAS.map((c, i) => (
            <Slider key={c} label={`Importancia: ${c}`} value={s.p[i]!} min={0} max={5} step={1} color={MANIM.blue} onChange={(v) => setS((x) => ({ p: x.p.map((o, k) => (k === i ? v : o)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={110} testId="seleccion-ideas" maxH={120}>
        {res.map((m, i) => (
          <g key={m.n}>
            <text x={10} y={24 + i * 32} fill={MANIM.ink} fontSize={13}>
              {m.n}
            </text>
            <rect x={230} y={10 + i * 32} width={Math.max(2, (m.v / 5) * 240)} height={20} rx={3} fill={i === 0 ? MANIM.green : MANIM.blue} fillOpacity={0.6} />
            <text x={236 + (m.v / 5) * 240} y={25 + i * 32} fill={MANIM.yellow} fontSize={13}>
              {f2(m.v)}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Idea elegida">{res[0]!.n}</Stat>
        <Stat color={MANIM.yellow} label="Puntuación (0–5)">{f2(res[0]!.v)}</Stat>
      </Readout>
      <Note>Elegir con una matriz evita decidir «por simpatía»: los criterios y sus pesos se acuerdan antes de puntuar. Si dos ideas empatan, se pueden combinar sus mejores rasgos.</Note>
    </Frame>
  );
}

/* ───────────── 4. Diagrama de Gantt ───────────── */

export function GanttProyectoExplorador({ block }: { block: ToolBlock }) {
  const init = { d: [2, 3, 1, 4, 1, 2].map((v, i) => (i === 3 ? Math.round(num(block.params?.a, 4, 1, 8)) : v)) };
  const [s, setS] = useState(init);
  const p = planifica(s.d);
  const k = 380 / Math.max(10, p.total);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la duración (en días) de cada tarea. Las barras rojas forman el camino crítico: si se retrasan, se retrasa el proyecto."}
      onReset={() => setS(init)}
      controls={
        <>
          {TAREAS.map((t, i) => (
            <Slider key={t.n} label={t.n} value={s.d[i]!} min={1} max={8} step={1} unit=" días" color={p.critica[i] ? MANIM.red : MANIM.blue} onChange={(v) => setS((x) => ({ d: x.d.map((o, q) => (q === i ? v : o)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={190} testId="gantt" maxH={200}>
        {TAREAS.map((t, i) => (
          <g key={t.n}>
            <text x={6} y={22 + i * 28} fill={MANIM.ink} fontSize={12}>
              {t.n}
            </text>
            <rect x={130 + p.es[i]! * k} y={8 + i * 28} width={Math.max(4, s.d[i]! * k - 2)} height={20} rx={3} fill={p.critica[i] ? MANIM.red : MANIM.blue} fillOpacity={0.65} />
          </g>
        ))}
        <line x1={130 + p.total * k} y1={0} x2={130 + p.total * k} y2={176} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Duración total">{p.total} días</Stat>
        <Stat color={MANIM.red} label="Tareas críticas">{TAREAS.filter((_, i) => p.critica[i]).map((t) => t.n).join(" → ")}</Stat>
      </Readout>
      <Note>Las tareas que no dependen unas de otras (como la memoria y la construcción) se pueden hacer a la vez. La duración del proyecto la marca el camino más largo: el camino crítico.</Note>
    </Frame>
  );
}

/* ───────────── 5. Pruebas del prototipo ───────────── */

export function PruebasPrototipoExplorador({ block }: { block: ToolBlock }) {
  const init = { v: [Math.round(num(block.params?.a, 400, 100, 1500) / 50) * 50, 2, 15, 6] };
  const [s, setS] = useState(init);
  const ok = evaluaPruebas(s.v);
  const n = ok.filter(Boolean).length;
  const MEJORAS = ["Reforzar la base o usar un material más resistente.", "Añadir más posiciones al mecanismo de inclinación.", "Ensanchar la base o bajar el centro de gravedad.", "Reducir material o usar uno más barato."];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Anota las medidas del prototipo y compáralas con los requisitos. Cada requisito que falla indica qué mejorar."}
      onReset={() => setS(init)}
      controls={
        <>
          {REQ_PRUEBAS.map((r, i) => (
            <Slider key={r.n} label={r.n} value={s.v[i]!} min={r.min} max={r.max} step={r.u === "g" ? 50 : 1} unit={r.u ? ` ${r.u}` : ""} color={ok[i] ? MANIM.green : MANIM.red} onChange={(v) => setS((x) => ({ v: x.v.map((o, k) => (k === i ? v : o)) }))} />
          ))}
        </>
      }
    >
      <ul className="flex flex-col gap-1 text-base" data-testid="pruebas-proto">
        {REQ_PRUEBAS.map((r, i) => (
          <li key={r.n} style={{ color: ok[i] ? MANIM.green : MANIM.red }}>
            {ok[i] ? "✓" : "✗"} {r.n}: {s.v[i]}
            {r.u ? ` ${r.u}` : ""} (requisito {r.req}){ok[i] ? "" : ` → ${MEJORAS[i]}`}
          </li>
        ))}
      </ul>
      <Readout>
        <Stat color={n === 4 ? MANIM.green : MANIM.yellow} label="Requisitos cumplidos">{n} de 4</Stat>
      </Readout>
      <Note>{n === 4 ? "El prototipo cumple todos los requisitos: se puede pasar a la memoria. Aun así, siempre quedan posibles mejoras." : "Cada fallo es información útil: se corrige un aspecto cada vez, se vuelve a probar y se anota el resultado."}</Note>
    </Frame>
  );
}

/* ───────────── 6. Memoria técnica ───────────── */

export function MemoriaProyectoExplorador({ block }: { block: ToolBlock }) {
  const init = { on: SECCIONES_MEMORIA.map((_, i) => i < Math.round(num(block.params?.n, 4, 0, SECCIONES_MEMORIA.length))) };
  const [s, setS] = useState(init);
  const r = puntuaMemoria(s.on);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa las secciones que ya has escrito. Las marcadas con ★ son imprescindibles."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Secciones de la memoria">
          {SECCIONES_MEMORIA.map((sec, i) => (
            <button key={sec.n} type="button" className={TOOL_BTN} aria-pressed={s.on[i]} onClick={() => setS((x) => ({ on: x.on.map((v, k) => (k === i ? !v : v)) }))}>
              {sec.clave ? "★ " : ""}
              {sec.n}
            </button>
          ))}
        </div>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Secciones escritas">{r.total} de {SECCIONES_MEMORIA.length}</Stat>
        <Stat color={r.faltanClave.length ? MANIM.yellow : MANIM.green} label="Imprescindibles que faltan">{r.faltanClave.length ? r.faltanClave.join(", ") : "Ninguna"}</Stat>
      </Readout>
      <Note>La memoria técnica cuenta el proyecto de principio a fin para que otra persona lo entienda y pueda repetirlo. Se escribe mientras se trabaja, no solo al final: anota fechas, decisiones y fotos del proceso.</Note>
    </Frame>
  );
}
