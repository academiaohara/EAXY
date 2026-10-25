"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── 1.1 Análisis de un objeto: necesidad, función, forma, material ───────────── */

const CAPAS = ["Necesidad", "Función", "Forma", "Material", "Mejora posible"] as const;
const COLORES_CAPA = [MANIM.red, MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple];
const OBJETOS = [
  { n: "Tijeras", t: ["Cortar papel, tela o cartón sin usar los dientes ni arrancar.", "Dos cuchillas que se cruzan y cortan por cizalla al cerrarse.", "Dos brazos con un eje común: las cuchillas son afiladas y las asas, anchas para la mano.", "Acero en las cuchillas (duro y afilado) y plástico en las asas (cómodo, aísla del frío).", "Asas para zurdos o una punta redondeada para que sean seguras en el aula."] },
  { n: "Bolígrafo", t: ["Dejar escrita una información de forma permanente y limpia.", "Una bolita en la punta reparte tinta al rodar sobre el papel.", "Cuerpo alargado y ligero; punta fina; capuchón o pulsador para protegerla.", "Plástico para el cuerpo (barato y moldeable) y metal para la punta.", "Cuerpo de cartón reciclado o recambio de tinta para no tirar todo el bolígrafo."] },
  { n: "Botella reutilizable", t: ["Llevar agua a todas partes sin generar residuos de usar y tirar.", "Contiene el líquido, cierra sin fugas y se limpia fácil.", "Cuello ancho para limpiarla, tapón de rosca y base estable para que no vuelque.", "Acero inoxidable (resistente y sin sabor) o aluminio con barniz alimentario.", "Un doble pared para mantener fría el agua más tiempo."] },
  { n: "Silla escolar", t: ["Sentarse varias horas con la espalda recta y sin dolores.", "Soporta el peso, mantiene la postura y se apila para guardar espacio.", "Respaldo curvo, asiento a 45 cm del suelo y patas con cuatro apoyos.", "Estructura de tubo de acero (resistente) y asiento de plástico o madera contrachapada.", "Altura regulable para alumnos de diferentes tallas."] },
] as const;

export function AnalisisObjetoExplorador({ block }: { block: ToolBlock }) {
  const init = { o: Math.round(num(block.params?.n, 0, 0, OBJETOS.length - 1)), c: 0, vistas: [0] as number[] };
  const [s, setS] = useState(init);
  const obj = OBJETOS[s.o]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Recorre las cinco capas de un objeto: de la necesidad que lo origina hasta cómo se podría mejorar."}
      onReset={() => setS(init)}
      controls={<Choice label="Objeto" items={OBJETOS.map((x, i) => ({ value: i, label: x.n }))} value={s.o} onChange={(o) => setS({ o, c: 0, vistas: [0] })} />}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Capas del análisis">
        {CAPAS.map((c, i) => (
          <button key={c} type="button" aria-pressed={s.c === i} className={`${TOOL_BTN} ${s.c === i ? "bg-white/15" : ""}`} style={{ borderColor: COLORES_CAPA[i] }} onClick={() => setS((a) => ({ ...a, c: i, vistas: a.vistas.includes(i) ? a.vistas : [...a.vistas, i] }))}>
            {c}
          </button>
        ))}
      </div>
      <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: COLORES_CAPA[s.c] }} data-testid="analisis-detalle">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{obj.n}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm font-bold" style={{ color: COLORES_CAPA[s.c] }}>
            {CAPAS[s.c]}
          </span>
        </div>
        <p className="mt-2">{obj.t[s.c]}</p>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Capas exploradas">
          {s.vistas.length} de {CAPAS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 1.2 Línea del tiempo de la tecnología ───────────── */

export const EPOCAS = [
  { n: "Prehistoria", fecha: "hace 2,5 millones de años", inv: ["Herramientas de piedra tallada", "Control del fuego", "Lanzas y arcos"], cambio: "La tecnología nace para cazar, protegerse y cocinar. Un hueso afilado ya es un invento." },
  { n: "Neolítico", fecha: "hace 10 000 años", inv: ["Agricultura y ganadería", "Cerámica", "Telar"], cambio: "Se deja de ser nómada: aparecen aldeas, excedentes de comida y el almacenamiento." },
  { n: "Edad Antigua", fecha: "desde 3500 a. C.", inv: ["Rueda", "Escritura", "Metalurgia del bronce y del hierro", "Arco y acueducto"], cambio: "Nacen las ciudades. La rueda y la escritura permiten transportar y guardar información." },
  { n: "Edad Media", fecha: "siglos V–XV", inv: ["Molino de agua y de viento", "Brújula", "Papel", "Arado de ruedas"], cambio: "Se aprovechan el agua y el viento para mover máquinas, no solo la fuerza de personas y animales." },
  { n: "Revolución Industrial", fecha: "siglos XVIII–XIX", inv: ["Máquina de vapor", "Telar mecánico", "Ferrocarril", "Telégrafo"], cambio: "Las máquinas fabrican en serie. La producción se traslada del taller a la fábrica." },
  { n: "Era eléctrica", fecha: "finales del XIX y XX", inv: ["Bombilla", "Motor eléctrico", "Automóvil", "Radio y televisión", "Avión"], cambio: "La electricidad llega a casas y fábricas: la energía se transporta y se usa donde se necesita." },
  { n: "Era digital", fecha: "desde 1970", inv: ["Ordenador personal", "Internet", "Teléfono móvil", "Impresión 3D", "Inteligencia artificial"], cambio: "La información se vuelve digital y viaja al instante: hasta los objetos corrientes llevan procesadores." },
] as const;

export function LineaTiempoExplorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 0, 0, EPOCAS.length - 1)) };
  const [s, setS] = useState(init);
  const ep = EPOCAS[s.e]!;
  const x = (i: number) => 40 + (i * 440) / (EPOCAS.length - 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Desliza por las épocas y fíjate en qué inventos aparecen y cómo cambia la vida cotidiana."}
      onReset={() => setS(init)}
      controls={<Slider label={`Época: ${ep.n}`} value={s.e} min={0} max={EPOCAS.length - 1} step={1} color={MANIM.yellow} onChange={(e) => setS({ e })} />}
    >
      <svg viewBox="0 0 520 70" className="mx-auto block h-auto w-full max-w-2xl" aria-hidden focusable="false">
        <line x1={40} y1={30} x2={480} y2={30} stroke={MANIM.grid} strokeWidth={4} />
        {EPOCAS.map((e, i) => (
          <g key={e.n}>
            <circle cx={x(i)} cy={30} r={i === s.e ? 11 : 6} fill={i <= s.e ? MANIM.yellow : MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} className="anim-t" />
            <text x={x(i)} y={62} fontSize={9} fill={i === s.e ? MANIM.ink : MANIM.muted} textAnchor="middle">
              {e.n.length > 13 ? e.n.split(" ")[0] : e.n}
            </text>
          </g>
        ))}
      </svg>
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3 text-[color:var(--stage-ink,#fff)]" data-testid="epoca-detalle">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{ep.n}</span>
          <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{ep.fecha}</span>
        </div>
        <ul className="mt-2 flex flex-wrap gap-2" aria-label="Inventos de la época">
          {ep.inv.map((i) => (
            <li key={i} className="rounded-md bg-white/10 px-2 py-1 text-sm">
              {i}
            </li>
          ))}
        </ul>
        <p className="mt-2">{ep.cambio}</p>
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Inventos en esta época">
          {ep.inv.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 1.3 Presupuesto de un proyecto ───────────── */

const MATERIALES = [
  { n: "Tablero de madera (hoja)", p: 6.5, q: 1 },
  { n: "Tornillos (caja de 50)", p: 3.2, q: 1 },
  { n: "Cola blanca (bote)", p: 2.4, q: 1 },
  { n: "Barniz (bote)", p: 5.9, q: 1 },
  { n: "Lija (pliego)", p: 0.8, q: 2 },
] as const;

export const totalPresupuesto = (cant: number[], imprevistos: boolean) => {
  const base = MATERIALES.reduce((a, m, i) => a + m.p * (cant[i] ?? 0), 0);
  return { base, total: imprevistos ? base * 1.1 : base };
};

export function PresupuestoExplorador({ block }: { block: ToolBlock }) {
  const init = { cant: MATERIALES.map((m) => m.q) as number[], imp: false, tope: Math.round(num(block.params?.a, 30, 10, 80)) };
  const [s, setS] = useState(init);
  const { base, total } = totalPresupuesto(s.cant, s.imp);
  const ok = total <= s.tope;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las cantidades y activa los imprevistos (un 10 % extra): ¿llegas al presupuesto disponible?"}
      onReset={() => setS(init)}
      controls={
        <>
          {MATERIALES.map((m, i) => (
            <Slider key={m.n} label={`${m.n} · ${f2(m.p)} €/ud.`} value={s.cant[i] ?? 0} min={0} max={6} step={1} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, cant: x.cant.map((c, j) => (j === i ? v : c)) }))} />
          ))}
          <Slider label="Presupuesto disponible" value={s.tope} min={10} max={80} step={1} unit=" €" format={f0} color={MANIM.yellow} onChange={(tope) => setS((x) => ({ ...x, tope }))} />
          <Choice label="Imprevistos (+10 %)" items={[{ value: 0, label: "Sin imprevistos" }, { value: 1, label: "Con imprevistos" }]} value={s.imp ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, imp: v === 1 }))} />
        </>
      }
    >
      <table className="w-full text-sm text-[color:var(--stage-ink,#fff)]" data-testid="presupuesto-tabla">
        <thead>
          <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
            <th className="py-1 font-normal">Material</th>
            <th className="py-1 text-right font-normal">Cantidad</th>
            <th className="py-1 text-right font-normal">Subtotal</th>
          </tr>
        </thead>
        <tbody>
          {MATERIALES.map((m, i) => (
            <tr key={m.n} className="border-t border-[color:var(--stage-border,#3d4f66)]">
              <td className="py-1">{m.n}</td>
              <td className="py-1 text-right tabular-nums">{s.cant[i]}</td>
              <td className="py-1 text-right tabular-nums">{f2(m.p * (s.cant[i] ?? 0))} €</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Readout>
        <Stat color={MANIM.blue} label="Coste de materiales">
          {f2(base)} €
        </Stat>
        <Stat color={MANIM.orange} label="Total con imprevistos">
          {f2(total)} €
        </Stat>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Estado">
          {ok ? "Dentro del presupuesto" : `Te pasas ${f2(total - s.tope)} €`}
        </Stat>
      </Readout>
      <Note>El presupuesto suma cantidad × precio de cada material. Un margen para imprevistos evita sorpresas si falla una pieza o falta tornillería.</Note>
    </Frame>
  );
}

/* ───────────── 1.4 Reparto de tareas en un equipo ───────────── */

const TAREAS = [
  { n: "Dibujar el boceto", h: 2 },
  { n: "Medir y cortar", h: 4 },
  { n: "Lijar y ensamblar", h: 3 },
  { n: "Pintar y acabar", h: 3 },
  { n: "Redactar la memoria", h: 4 },
  { n: "Probar y mejorar", h: 2 },
] as const;
const PERSONAS = ["Alba", "Bruno", "Carla"];
const COL_PERSONA = [MANIM.blue, MANIM.green, MANIM.orange];

export const cargas = (asig: number[], personas = PERSONAS.length) => {
  const c = Array.from({ length: personas }, () => 0);
  TAREAS.forEach((t, i) => {
    const p = asig[i] ?? 0;
    c[p] = (c[p] ?? 0) + t.h;
  });
  return c;
};

export function RepartoTareasExplorador({ block }: { block: ToolBlock }) {
  const init = { asig: TAREAS.map(() => 0) as number[] };
  const [s, setS] = useState(init);
  void block;
  const c = cargas(s.asig);
  const max = Math.max(...c);
  const min = Math.min(...c);
  const total = TAREAS.reduce((a, t) => a + t.h, 0);
  const equilibrado = max - min <= 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa cada tarea para cambiar de responsable. El proyecto dura lo que tarde la persona con más carga."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-col gap-2 sm:col-span-2">
          {TAREAS.map((t, i) => (
            <button key={t.n} type="button" className={`${TOOL_BTN} flex items-center justify-between`} style={{ borderColor: COL_PERSONA[s.asig[i] ?? 0] }} onClick={() => setS((x) => ({ asig: x.asig.map((p, j) => (j === i ? (p + 1) % PERSONAS.length : p)) }))}>
              <span>
                {t.n} <span className="text-[color:var(--stage-muted,#b8c2d0)]">({t.h} h)</span>
              </span>
              <span className="font-bold" style={{ color: COL_PERSONA[s.asig[i] ?? 0] }}>
                {PERSONAS[s.asig[i] ?? 0]}
              </span>
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-2" data-testid="reparto-barras">
        {PERSONAS.map((p, i) => (
          <div key={p} className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
            <span className="w-14">{p}</span>
            <div className="h-5 flex-1 overflow-hidden rounded bg-white/10">
              <div className="anim-t h-full" style={{ width: `${(c[i]! / total) * 100}%`, background: COL_PERSONA[i] }} />
            </div>
            <span className="w-12 text-right tabular-nums">{c[i]} h</span>
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Duración del proyecto">
          {max} h
        </Stat>
        <Stat color={equilibrado ? MANIM.green : MANIM.red} label="Reparto">
          {equilibrado ? "Equilibrado" : "Descompensado"}
        </Stat>
      </Readout>
      <Note>Con 18 horas de trabajo y tres personas, lo ideal es 6 horas cada una. Si una persona acumula todo, el equipo espera por ella.</Note>
    </Frame>
  );
}

/* ───────────── 1.5 ¿Es fiable esta fuente? ───────────── */

const CRITERIOS = ["Autor identificado", "Fecha reciente", "Cita sus datos", "No intenta vender", "Experto en el tema"] as const;
export const FUENTES = [
  { n: "Manual de carpintería", c: [true, true, true, true, true], d: "Libro de un editor técnico, con autor, año de edición y tablas de datos." },
  { n: "Web de una universidad", c: [true, true, true, true, true], d: "Departamento de ingeniería forestal con artículos firmados y bibliografía." },
  { n: "Anuncio de una tienda", c: [false, true, false, false, false], d: "Presenta un producto con frases llamativas pero sin datos que se puedan comprobar." },
  { n: "Comentario anónimo en un foro", c: [false, false, false, true, false], d: "Un usuario con apodo dice que «a él le funcionó». No cita nada." },
] as const;

export const fiabilidad = (c: readonly boolean[]) => c.filter(Boolean).length;

export function FuenteFiableExplorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.n, 0, 0, FUENTES.length - 1)), contrasta: false };
  const [s, setS] = useState(init);
  const fu = FUENTES[s.f]!;
  const n = fiabilidad(fu.c);
  const veredicto = n >= 4 ? "Fiable: puedes usarla" : n >= 2 ? "Dudosa: contrástala con otra fuente" : "Poco fiable: no te fíes";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una fuente y comprueba cuántos criterios cumple. Si dudas, contrástala con otra."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Fuente de información" items={FUENTES.map((x, i) => ({ value: i, label: x.n }))} value={s.f} onChange={(f) => setS({ f, contrasta: false })} />
          <Choice label="¿La contrastas con una segunda fuente fiable?" items={[{ value: 0, label: "No" }, { value: 1, label: "Sí" }]} value={s.contrasta ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, contrasta: v === 1 }))} />
        </>
      }
    >
      <p className="text-[color:var(--stage-ink,#fff)]">{fu.d}</p>
      <ul className="grid gap-2 sm:grid-cols-2" data-testid="criterios-fuente">
        {CRITERIOS.map((c, i) => (
          <li key={c} className="flex items-center gap-2 rounded-md border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-sm text-[color:var(--stage-ink,#fff)]">
            <span className="font-bold" style={{ color: fu.c[i] ? MANIM.green : MANIM.red }}>
              {fu.c[i] ? "✓" : "✗"}
            </span>
            {c}
          </li>
        ))}
      </ul>
      <Readout>
        <Stat color={n >= 4 ? MANIM.green : n >= 2 ? MANIM.yellow : MANIM.red} label="Criterios cumplidos">
          {n} de {CRITERIOS.length}
        </Stat>
        <Stat color={MANIM.blue} label="Veredicto">
          {veredicto}
        </Stat>
      </Readout>
      <Note>{s.contrasta ? (n >= 4 ? "Al coincidir con otra fuente fiable, la información queda confirmada." : "Contrastar ayuda: si otra fuente fiable lo contradice, descarta este dato.") : "Una sola fuente, aunque sea buena, no siempre basta: cuando el dato es importante conviene contrastarlo."}</Note>
    </Frame>
  );
}
