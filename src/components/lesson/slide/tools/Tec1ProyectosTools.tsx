"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/** Barra horizontal de 0 a `max` con etiqueta y valor. */
function HBar({ label, value, max, color, text }: { label: string; value: number; max: number; color: string; text?: string }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-40 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full rounded" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="w-16 shrink-0 text-right font-bold tabular-nums">{text ?? f1(value)}</span>
    </div>
  );
}

/* ───────────── 1.1 Objetos cotidianos: ¿qué problema resuelven? ───────────── */

const OBJETOS = [
  { n: "Paraguas", tipo: "Cotidiana", need: "Protegerse de la lluvia sin dejar de moverse.", prob: "Mojarse al caminar por la calle.", sol: "Una cubierta plegable sujeta por varillas." },
  { n: "Rampa de acceso", tipo: "Accesibilidad", need: "Que cualquier persona entre en un edificio.", prob: "Un escalón impide el paso a una silla de ruedas o a un carrito.", sol: "Plano inclinado con pendiente máxima normalizada." },
  { n: "Filtro de agua", tipo: "Social", need: "Disponer de agua potable.", prob: "El agua de algunas fuentes contiene microorganismos.", sol: "Un medio poroso que retiene partículas y patógenos." },
  { n: "Variador de velocidad", tipo: "Industrial", need: "Ajustar la velocidad de un motor al proceso.", prob: "Un motor a velocidad fija desperdicia energía.", sol: "Electrónica que regula frecuencia y tensión." },
  { n: "Contenedor de reciclaje", tipo: "Ambiental", need: "Reducir los residuos que van a vertedero.", prob: "Mezclados, los materiales no se pueden recuperar.", sol: "Recogida selectiva por tipo de material." },
  { n: "Cinturón de seguridad", tipo: "Cotidiana", need: "Sobrevivir a un choque.", prob: "En una frenada brusca el cuerpo sigue avanzando.", sol: "Una cinta que reparte la fuerza y retiene al pasajero." },
  { n: "Subtítulos automáticos", tipo: "Accesibilidad", need: "Seguir un vídeo sin oír el audio.", prob: "Una persona sorda o en un lugar ruidoso pierde la información.", sol: "Reconocimiento de voz que genera texto sincronizado." },
  { n: "Placa solar", tipo: "Ambiental", need: "Generar electricidad con menos emisiones.", prob: "Quemar combustibles fósiles emite CO₂.", sol: "Células fotovoltaicas que convierten luz en corriente." },
] as const;
const TIPOS = ["Todos", "Cotidiana", "Accesibilidad", "Social", "Industrial", "Ambiental"] as const;

export function ObjetoProblemaExplorador({ block }: { block: ToolBlock }) {
  const [sel, setSel] = useState(Math.round(num(block.params?.a, 0, 0, OBJETOS.length - 1)));
  const [tipo, setTipo] = useState<(typeof TIPOS)[number]>("Todos");
  const [vistos, setVistos] = useState<number[]>([sel]);
  const o = OBJETOS[sel]!;
  const visibles = OBJETOS.map((x, i) => ({ x, i })).filter(({ x }) => tipo === "Todos" || x.tipo === tipo);
  const pick = (i: number) => {
    setSel(i);
    setVistos((v) => (v.includes(i) ? v : [...v, i]));
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa un objeto: detrás de cada solución hay una necesidad, un problema y una idea que lo resuelve."}
      onReset={() => {
        setSel(0);
        setTipo("Todos");
        setVistos([0]);
      }}
      controls={<Choice label="Tipo de necesidad" items={TIPOS.map((t) => ({ value: t, label: t }))} value={tipo} onChange={setTipo} />}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Objetos">
        {visibles.map(({ x, i }) => (
          <button key={x.n} type="button" aria-pressed={sel === i} className={`${TOOL_BTN} ${sel === i ? "border-[color:var(--stage-ink,#fff)] bg-white/15" : ""}`} onClick={() => pick(i)}>
            {x.n}
          </button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-3" data-testid="objeto-detalle">
        {[
          { t: "Necesidad", v: o.need, c: MANIM.blue },
          { t: "Problema", v: o.prob, c: MANIM.red },
          { t: "Solución", v: o.sol, c: MANIM.green },
        ].map((c) => (
          <div key={c.t} className="rounded-lg border p-3" style={{ borderColor: c.c }}>
            <div className="text-xs font-bold uppercase tracking-wide" style={{ color: c.c }}>
              {c.t}
            </div>
            <p className="mt-1 text-base leading-snug text-[color:var(--stage-ink,#fff)]">{c.v}</p>
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Tipo de necesidad">
          {o.tipo}
        </Stat>
        <Stat color={MANIM.blue} label="Objetos explorados">
          {vistos.length} de {OBJETOS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── Matriz de decisión ponderada (varios temas) ───────────── */

type Preset = { title: string; criteria: { n: string; w: number; hint: string }[]; options: { n: string; s: number[] }[] };

/** Puntuaciones de 0 a 10 (10 = mejor para ese criterio). Valores ilustrativos, no medidas. */
const PRESETS: Preset[] = [
  {
    title: "Alumbrado de una bicicleta",
    criteria: [
      { n: "Coste", w: 3, hint: "10 = muy barato" },
      { n: "Eficacia", w: 4, hint: "10 = ilumina y se ve mucho" },
      { n: "Sostenibilidad", w: 2, hint: "10 = poco residuo" },
      { n: "Facilidad de uso", w: 2, hint: "10 = no requiere cuidados" },
    ],
    options: [
      { n: "Dinamo de buje", s: [4, 8, 9, 9] },
      { n: "Luz LED recargable USB", s: [6, 9, 7, 5] },
      { n: "Luz de pilas desechables", s: [8, 6, 2, 5] },
      { n: "Solo reflectantes", s: [10, 1, 10, 9] },
    ],
  },
  {
    title: "Soporte de móvil para el escritorio",
    criteria: [
      { n: "Estabilidad", w: 4, hint: "10 = no se vuelca" },
      { n: "Fabricación sencilla", w: 3, hint: "10 = se hace en un taller de aula" },
      { n: "Coste", w: 2, hint: "10 = muy barato" },
      { n: "Ergonomía", w: 3, hint: "10 = ángulo ajustable" },
    ],
    options: [
      { n: "A. Pieza fija en L", s: [7, 9, 9, 3] },
      { n: "B. Brazo articulado", s: [6, 4, 4, 9] },
      { n: "C. Base con ranura", s: [8, 8, 8, 5] },
      { n: "D. Soporte plegable", s: [5, 5, 6, 8] },
    ],
  },
  {
    title: "Material para un cuadro de bicicleta",
    criteria: [
      { n: "Ligereza", w: 3, hint: "10 = muy ligero" },
      { n: "Resistencia", w: 4, hint: "10 = muy resistente" },
      { n: "Coste", w: 3, hint: "10 = muy barato" },
      { n: "Reciclabilidad", w: 2, hint: "10 = se recicla fácil" },
    ],
    options: [
      { n: "Acero", s: [3, 8, 9, 9] },
      { n: "Aluminio", s: [7, 7, 6, 9] },
      { n: "Fibra de carbono", s: [10, 9, 2, 2] },
      { n: "Titanio", s: [8, 9, 1, 7] },
    ],
  },
  {
    title: "Movilidad para un barrio",
    criteria: [
      { n: "Coste por viaje", w: 3, hint: "10 = muy barato" },
      { n: "Emisiones", w: 4, hint: "10 = casi nulas" },
      { n: "Accesibilidad", w: 3, hint: "10 = lo puede usar cualquiera" },
      { n: "Rapidez", w: 2, hint: "10 = muy rápido" },
    ],
    options: [
      { n: "Autobús eléctrico", s: [7, 8, 9, 6] },
      { n: "Bicicleta compartida", s: [8, 10, 5, 5] },
      { n: "Coche de gasolina", s: [3, 2, 6, 8] },
      { n: "Tren de cercanías", s: [6, 8, 7, 9] },
    ],
  },
  {
    title: "Rediseño de un teléfono móvil",
    criteria: [
      { n: "Menos masa de material", w: 2, hint: "10 = muy poco material" },
      { n: "Durabilidad", w: 4, hint: "10 = muchos años de uso" },
      { n: "Reparabilidad", w: 4, hint: "10 = se cambia cada pieza" },
      { n: "Consumo de recursos", w: 3, hint: "10 = poca energía y agua" },
    ],
    options: [
      { n: "Diseño sellado con pegamento", s: [7, 5, 1, 5] },
      { n: "Diseño modular", s: [5, 8, 10, 6] },
      { n: "Diseño reforzado y pesado", s: [2, 9, 6, 3] },
    ],
  },
];

export function MatrizDecisionExplorador({ block }: { block: ToolBlock }) {
  const preset = PRESETS[Math.round(num(block.params?.n, 0, 0, PRESETS.length - 1))]!;
  const init = preset.criteria.map((c) => c.w);
  const [w, setW] = useState<number[]>(init);
  const total = w.reduce((a, b) => a + b, 0);
  const scores = preset.options.map((o) => ({ n: o.n, v: total > 0 ? o.s.reduce((a, s, i) => a + s * w[i]!, 0) / total : 0 }));
  const best = scores.reduce((m, s) => (s.v > m.v ? s : m), scores[0]!);
  const colors = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la importancia de cada criterio (el peso): la mejor opción depende de lo que valores. Con todos los pesos a 0 no hay decisión."}
      onReset={() => setW(init)}
      controls={
        <>
          {preset.criteria.map((c, i) => (
            <Slider key={c.n} label={`Peso: ${c.n}`} value={w[i]!} min={0} max={5} step={1} color={colors[i % 4]!} onChange={(v) => setW((x) => x.map((y, j) => (j === i ? v : y)))} />
          ))}
        </>
      }
    >
      <p className="text-sm font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{preset.title}</p>
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[color:var(--stage-ink,#fff)]" data-testid="matriz-tabla">
          <thead>
            <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="py-1 pr-2">Opción</th>
              {preset.criteria.map((c) => (
                <th key={c.n} className="px-2 py-1" title={c.hint}>
                  {c.n}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {preset.options.map((o) => (
              <tr key={o.n} className="border-t border-[color:var(--stage-border,#3d4f66)]">
                <td className="py-1 pr-2 font-semibold">{o.n}</td>
                {o.s.map((s, i) => (
                  <td key={i} className="px-2 py-1 tabular-nums">
                    {s}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex flex-col gap-1.5">
        {scores.map((s, i) => (
          <HBar key={s.n} label={s.n} value={s.v} max={10} color={s === best && total > 0 ? MANIM.green : colors[i % 4]!} text={total > 0 ? f2(s.v) : "—"} />
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Mejor puntuada">
          {total > 0 ? best.n : "Sin criterios"}
        </Stat>
        <Stat color={MANIM.yellow} label="Puntuación">
          {total > 0 ? `${f2(best.v)} / 10` : "—"}
        </Stat>
      </Readout>
      <Note>Puntuación = Σ (peso × nota) ÷ Σ pesos. Las notas de 0 a 10 son valoraciones <strong>ilustrativas</strong>, no mediciones: lo importante es ver cómo cambia el resultado al cambiar los pesos.</Note>
    </Frame>
  );
}

/* ───────────── 1.4 Requisitos verificables ───────────── */

export function RequisitosExplorador({ block }: { block: ToolBlock }) {
  const init = { peso: num(block.params?.a, 850, 200, 1500), carga: num(block.params?.b, 6, 1, 20), coste: num(block.params?.c, 22, 5, 60) };
  const [s, setS] = useState(init);
  const reqs = [
    { n: "Masa ≤ 700 g", ok: s.peso <= 700, val: `${fmtEs(s.peso, 0)} g`, margen: 700 - s.peso, u: "g" },
    { n: "Soporta ≥ 8 kg sin deformarse", ok: s.carga >= 8, val: `${f1(s.carga)} kg`, margen: s.carga - 8, u: "kg" },
    { n: "Coste de materiales ≤ 25 €", ok: s.coste <= 25, val: `${f2(s.coste)} €`, margen: 25 - s.coste, u: "€" },
  ];
  const cumplidos = reqs.filter((r) => r.ok).length;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve las medidas del prototipo: cada requisito verificable se cumple o no. «Que quede bonito» no se puede comprobar con ninguna medida."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa medida" value={s.peso} min={200} max={1500} step={10} unit=" g" color={MANIM.blue} format={(v) => fmtEs(v, 0)} onChange={(peso) => setS((x) => ({ ...x, peso }))} />
          <Slider label="Carga máxima soportada" value={s.carga} min={1} max={20} step={0.5} unit=" kg" color={MANIM.green} format={f1} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
          <Slider label="Coste de materiales" value={s.coste} min={5} max={60} step={0.5} unit=" €" color={MANIM.orange} format={f1} onChange={(coste) => setS((x) => ({ ...x, coste }))} />
        </>
      }
    >
      <ul className="flex flex-col gap-2" data-testid="requisitos-lista">
        {reqs.map((r) => (
          <li key={r.n} className="flex items-center gap-3 rounded-lg border p-2.5 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: r.ok ? MANIM.green : MANIM.red }}>
            <span className="text-xl font-bold" style={{ color: r.ok ? MANIM.green : MANIM.red }} aria-label={r.ok ? "cumple" : "no cumple"}>
              {r.ok ? "✓" : "✗"}
            </span>
            <span className="flex-1">{r.n}</span>
            <span className="tabular-nums text-[color:var(--stage-muted,#b8c2d0)]">
              medido: {r.val} ({r.margen >= 0 ? "margen" : "falta"} {fmtEs(Math.abs(r.margen), 1)} {r.u})
            </span>
          </li>
        ))}
        <li className="flex items-center gap-3 rounded-lg border border-dashed border-[color:var(--stage-border,#3d4f66)] p-2.5 text-[color:var(--stage-muted,#b8c2d0)]">
          <span className="text-xl font-bold">?</span>
          <span className="flex-1">«Que sea bonito y cómodo»</span>
          <span>preferencia: no tiene medida ni umbral</span>
        </li>
      </ul>
      <Readout>
        <Stat color={cumplidos === reqs.length ? MANIM.green : MANIM.yellow} label="Requisitos verificables cumplidos">
          {cumplidos} de {reqs.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 1.5 Gantt y camino crítico ───────────── */

const TAREAS = [
  { id: "A", n: "Investigar", dep: [] as string[], d: 3 },
  { id: "B", n: "Diseñar", dep: ["A"], d: 4 },
  { id: "C", n: "Comprar", dep: ["A"], d: 2 },
  { id: "D", n: "Construir", dep: ["B", "C"], d: 5 },
  { id: "E", n: "Ensayar", dep: ["D"], d: 3 },
  { id: "F", n: "Documentar", dep: ["B"], d: 4 },
];

/** Calcula inicio/fin más temprano, holgura y camino crítico (método CPM). */
export function planificar(durs: number[]) {
  const es: Record<string, number> = {};
  const ef: Record<string, number> = {};
  TAREAS.forEach((t, i) => {
    es[t.id] = Math.max(0, ...t.dep.map((d) => ef[d]!));
    ef[t.id] = es[t.id]! + durs[i]!;
  });
  const fin = Math.max(...Object.values(ef));
  const lf: Record<string, number> = {};
  [...TAREAS].reverse().forEach((t) => {
    const sucesoras = TAREAS.filter((x) => x.dep.includes(t.id));
    lf[t.id] = sucesoras.length ? Math.min(...sucesoras.map((x) => lf[x.id]! - durs[TAREAS.indexOf(x)]!)) : fin;
  });
  const holgura = Object.fromEntries(TAREAS.map((t) => [t.id, lf[t.id]! - ef[t.id]!]));
  return { es, ef, fin, holgura };
}

export function GanttExplorador({ block }: { block: ToolBlock }) {
  const init = { d: TAREAS.map((t) => t.d), plazo: Math.round(num(block.params?.a, 14, 6, 30)), tarifa: Math.round(num(block.params?.b, 40, 10, 100)) };
  const [s, setS] = useState(init);
  const p = planificar(s.d);
  const coste = s.d.reduce((a, b) => a + b, 0) * s.tarifa;
  const W = 520;
  const dayW = (W - 80) / Math.max(p.fin, s.plazo, 10);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Alarga la duración de una tarea: si está en el camino crítico (rojo), todo el proyecto se retrasa; si tiene holgura, no pasa nada."}
      onReset={() => setS(init)}
      controls={
        <>
          {TAREAS.map((t, i) => (
            <Slider key={t.id} label={`${t.id}. ${t.n}`} value={s.d[i]!} min={1} max={10} unit=" d" color={p.holgura[t.id] === 0 ? MANIM.red : MANIM.blue} onChange={(v) => setS((x) => ({ ...x, d: x.d.map((y, j) => (j === i ? v : y)) }))} />
          ))}
          <Slider label="Plazo máximo" value={s.plazo} min={6} max={30} unit=" d" color={MANIM.yellow} onChange={(plazo) => setS((x) => ({ ...x, plazo }))} />
        </>
      }
    >
      <Svg w={W} h={210} maxH={230} testId="tool-gantt">
        {Array.from({ length: Math.max(p.fin, s.plazo, 10) + 1 }, (_, d) => (
          <g key={d}>
            <line x1={70 + d * dayW} y1={10} x2={70 + d * dayW} y2={180} stroke={MANIM.grid} strokeWidth={0.7} />
            {d % 2 === 0 ? (
              <text x={70 + d * dayW} y={198} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
                {d}
              </text>
            ) : null}
          </g>
        ))}
        {TAREAS.map((t, i) => (
          <g key={t.id}>
            <text x={64} y={30 + i * 27} textAnchor="end" fill={MANIM.muted} fontSize={12}>
              {t.id}. {t.n}
            </text>
            <rect x={70 + p.es[t.id]! * dayW} y={16 + i * 27} width={s.d[i]! * dayW} height={18} rx={3} fill={p.holgura[t.id] === 0 ? MANIM.red : MANIM.blue} fillOpacity={0.8} className="anim-t" />
          </g>
        ))}
        <line x1={70 + s.plazo * dayW} y1={6} x2={70 + s.plazo * dayW} y2={182} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
      </Svg>
      <Readout>
        <Stat color={p.fin <= s.plazo ? MANIM.green : MANIM.red} label="Duración del proyecto">
          {p.fin} días
        </Stat>
        <Stat color={MANIM.orange} label="Camino crítico">
          {TAREAS.filter((t) => p.holgura[t.id] === 0)
            .map((t) => t.id)
            .join(" → ")}
        </Stat>
        <Stat color={MANIM.purple} label="Coste de mano de obra">
          {fmtEs(coste, 0)} €
        </Stat>
      </Readout>
      <Note>
        {p.fin <= s.plazo ? "Entra en plazo." : `Se pasa ${p.fin - s.plazo} día(s) del plazo: hay que acortar alguna tarea del camino crítico.`} Las tareas fuera del camino crítico tienen holgura:{" "}
        {TAREAS.filter((t) => p.holgura[t.id]! > 0)
          .map((t) => `${t.id} (${p.holgura[t.id]} d)`)
          .join(", ") || "ninguna"}
        .
      </Note>
    </Frame>
  );
}

/* ───────────── 1.6 Reparto de tareas en el equipo ───────────── */

const PERSONAS = ["Ana", "Biel", "Carla"];
const TAREAS_EQ = [
  { n: "Diseño CAD", h: 8, f: [0.6, 1.2, 1] },
  { n: "Programación", h: 8, f: [1.3, 0.7, 1] },
  { n: "Montaje", h: 7, f: [1, 0.9, 0.7] },
  { n: "Memoria técnica", h: 6, f: [0.8, 1.3, 0.9] },
  { n: "Presupuesto", h: 4, f: [1, 1, 0.8] },
];

export function RolesEquipoExplorador({ block }: { block: ToolBlock }) {
  const init = TAREAS_EQ.map((_, i) => i % 3);
  const [asig, setAsig] = useState<number[]>(init);
  const cap = Math.round(num(block.params?.a, 12, 6, 24));
  const carga = PERSONAS.map((_, p) => asig.reduce((a, who, t) => a + (who === p ? TAREAS_EQ[t]!.h * TAREAS_EQ[t]!.f[p]! : 0), 0));
  const max = Math.max(...carga);
  const min = Math.min(...carga);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Asigna cada tarea a una persona. El factor de cada una (más bajo = más rápida) cambia las horas reales. Busca que nadie pase de su capacidad y la carga quede equilibrada."}
      onReset={() => setAsig(init)}
      controls={
        <>
          {TAREAS_EQ.map((t, i) => (
            <Choice key={t.n} label={`${t.n} (${t.h} h base)`} items={PERSONAS.map((p, k) => ({ value: k, label: `${p} ×${fmtEs(t.f[k]!, 1)}` }))} value={asig[i]!} onChange={(k) => setAsig((x) => x.map((y, j) => (j === i ? k : y)))} />
          ))}
        </>
      }
    >
      <div className="flex flex-col gap-1.5" data-testid="roles-carga">
        {PERSONAS.map((p, k) => (
          <HBar key={p} label={p} value={carga[k]!} max={Math.max(cap * 1.5, max)} color={carga[k]! > cap ? MANIM.red : MANIM.green} text={`${f1(carga[k]!)} h`} />
        ))}
      </div>
      <Readout>
        <Stat color={max > cap ? MANIM.red : MANIM.green} label="Persona más cargada">
          {f1(max)} h (capacidad {cap} h)
        </Stat>
        <Stat color={MANIM.yellow} label="Desequilibrio (máx − mín)">
          {f1(max - min)} h
        </Stat>
      </Readout>
      <Note>{max > cap ? "Alguien supera su capacidad: reparte de nuevo o negocia el plazo." : max - min <= 2 ? "Reparto equilibrado y dentro de capacidad." : "Cabe en capacidad, pero el reparto no es equilibrado."} Los factores son datos de ejemplo.</Note>
    </Frame>
  );
}

/* ───────────── 1.7 Prototipo virtual: estantería sometida a carga ───────────── */

const MATS_PROTO = [
  { n: "Pino", E: 9000, sadm: 10, rho: 500 },
  { n: "Aluminio", E: 70000, sadm: 100, rho: 2700 },
  { n: "Acero", E: 200000, sadm: 150, rho: 7850 },
  { n: "PLA (impresión 3D)", E: 3500, sadm: 30, rho: 1250 },
];

/** Viga biapoyada con carga central: flecha (mm) y tensión máxima (MPa). Unidades N, mm, MPa. */
export function vigaCentral(F: number, L: number, b: number, h: number, E: number) {
  const I = (b * h ** 3) / 12;
  return { delta: (F * L ** 3) / (48 * E * I), sigma: ((F * L) / 4) * (h / 2) / I, I };
}

export function PrototipoEnsayoExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 3, 0, 30)), h: Math.round(num(block.params?.b, 12, 4, 40)), L: Math.round(num(block.params?.c, 600, 300, 900)), mat: Math.round(num(block.params?.n, 0, 0, MATS_PROTO.length - 1)) };
  const [s, setS] = useState(init);
  const mat = MATS_PROTO[s.mat]!;
  const b = 200;
  const F = s.m * 9.81;
  const { delta, sigma } = vigaCentral(F, s.L, b, s.h, mat.E);
  const limD = s.L / 300;
  const okD = delta <= limD;
  const okS = sigma <= mat.sadm;
  const masa = (mat.rho * b * s.h * s.L * 1e-9) ;
  const X = (x: number) => 40 + (x / s.L) * 440;
  const flechaPx = Math.min(70, (delta / s.L) * 440 * 8);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia material, espesor y carga. Un ensayo da números: aquí se verifican dos requisitos (flecha ≤ L/300 y tensión ≤ σ admisible)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATS_PROTO.map((m, i) => ({ value: i, label: m.n }))} value={s.mat} onChange={(mat2) => setS((x) => ({ ...x, mat: mat2 }))} />
          <Slider label="Carga en el centro" value={s.m} min={0} max={30} unit=" kg" color={MANIM.red} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Espesor de la tabla, h" value={s.h} min={4} max={40} unit=" mm" color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Distancia entre apoyos, L" value={s.L} min={300} max={900} step={50} unit=" mm" color={MANIM.green} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Svg w={520} h={150} maxH={160} testId="tool-prototipo">
        <path d={`M ${X(0)} 50 Q ${X(s.L / 2)} ${50 + flechaPx * 2} ${X(s.L)} 50`} fill="none" stroke={okD && okS ? MANIM.green : MANIM.red} strokeWidth={Math.max(3, s.h / 3)} strokeLinecap="round" className="anim-t" />
        <polygon points={`${X(0)},58 ${X(0) - 10},78 ${X(0) + 10},78`} fill={MANIM.muted} />
        <polygon points={`${X(s.L)},58 ${X(s.L) - 10},78 ${X(s.L) + 10},78`} fill={MANIM.muted} />
        <line x1={X(s.L / 2)} y1={4} x2={X(s.L / 2)} y2={44 + flechaPx} stroke={MANIM.yellow} strokeWidth={3} />
        <text x={X(s.L / 2) + 8} y={16} fill={MANIM.yellow} fontSize={13}>
          {s.m} kg
        </text>
        <text x={260} y={135} textAnchor="middle" fill={MANIM.muted} fontSize={12}>
          deformación dibujada ×8 para que se vea
        </text>
      </Svg>
      <Readout>
        <Stat color={okD ? MANIM.green : MANIM.red} label="Flecha (límite L/300)">
          {f2(delta)} mm (≤ {f2(limD)})
        </Stat>
        <Stat color={okS ? MANIM.green : MANIM.red} label="Tensión máxima">
          {f1(sigma)} MPa (≤ {mat.sadm})
        </Stat>
        <Stat color={MANIM.yellow} label="Masa de la tabla">
          {f2(masa)} kg
        </Stat>
      </Readout>
      <Note>{okD && okS ? "El prototipo cumple los dos criterios con esta carga." : "No cumple: refuerza el espesor, acorta la distancia entre apoyos o cambia de material."} Modelo: viga biapoyada con carga puntual central, anchura 200 mm (simplificación, sin pandeo ni fluencia).</Note>
    </Frame>
  );
}

/* ───────────── 1.8 Memoria técnica con vista previa ───────────── */

const SECCIONES = [
  { k: "titulo", n: "Título del proyecto", ph: "Soporte plegable para portátil" },
  { k: "problema", n: "Problema y necesidad", ph: "Trabajar con el portátil en la mesa daña el cuello." },
  { k: "requisitos", n: "Requisitos", ph: "Masa ≤ 700 g; soporta ≥ 8 kg." },
  { k: "solucion", n: "Solución elegida y justificación", ph: "Aluminio plegable: ligero y rígido." },
  { k: "conclusiones", n: "Conclusiones y mejoras", ph: "Cumple 3 de 3 requisitos; mejorar el acabado." },
] as const;

export function MemoriaTecnicaExplorador({ block }: { block: ToolBlock }) {
  const init = { titulo: "", problema: "", requisitos: "", solucion: "", conclusiones: "" };
  const [t, setT] = useState<Record<string, string>>(init);
  const [bom, setBom] = useState([
    { n: "Perfil de aluminio", q: 2, p: 6.5 },
    { n: "Tornillos M4", q: 8, p: 0.1 },
    { n: "Goma antideslizante", q: 4, p: 0.4 },
  ]);
  const total = bom.reduce((a, r) => a + r.q * r.p, 0);
  const hechas = SECCIONES.filter((s) => t[s.k]!.trim().length > 0).length;
  const reset = () => {
    setT(init);
    setBom([
      { n: "Perfil de aluminio", q: 2, p: 6.5 },
      { n: "Tornillos M4", q: 8, p: 0.1 },
      { n: "Goma antideslizante", q: 4, p: 0.4 },
    ]);
  };
  return (
    <Frame
      hint={block.hint ?? "Rellena cada apartado y mira la vista previa: la memoria debe poder leerla alguien que no estuvo en el taller."}
      onReset={reset}
      controls={
        <>
          {SECCIONES.map((s) => (
            <label key={s.k} className="flex flex-col gap-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
              {s.n}
              <input value={t[s.k]} placeholder={s.ph} onChange={(e) => setT((x) => ({ ...x, [s.k]: e.target.value }))} className="rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-2 py-1.5 text-base text-[color:var(--stage-ink,#fff)]" />
            </label>
          ))}
          <div className="flex flex-col gap-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            Lista de materiales (cantidad)
            {bom.map((r, i) => (
              <label key={r.n} className="flex items-center gap-2">
                <span className="flex-1">{r.n}</span>
                <input type="number" min={0} max={99} aria-label={`Cantidad de ${r.n}`} value={r.q} onChange={(e) => setBom((x) => x.map((y, j) => (j === i ? { ...y, q: Math.max(0, Math.min(99, Number(e.target.value) || 0)) } : y)))} className="w-16 rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-2 py-1 text-[color:var(--stage-ink,#fff)]" />
              </label>
            ))}
          </div>
        </>
      }
    >
      <article className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-white/5 p-4 text-[color:var(--stage-ink,#fff)]" data-testid="memoria-preview">
        <h3 className="text-lg font-bold">{t.titulo!.trim() || "Título sin escribir"}</h3>
        {SECCIONES.slice(1).map((s) => (
          <section key={s.k} className="mt-2">
            <h4 className="text-xs font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{s.n}</h4>
            <p className={t[s.k]!.trim() ? "" : "italic text-[color:var(--stage-muted,#b8c2d0)]"}>{t[s.k]!.trim() || "Pendiente"}</p>
          </section>
        ))}
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
              <th>Material</th>
              <th>Cant.</th>
              <th>€/ud</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {bom.map((r) => (
              <tr key={r.n}>
                <td>{r.n}</td>
                <td>{r.q}</td>
                <td>{f2(r.p)}</td>
                <td>{f2(r.q * r.p)} €</td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
      <Readout>
        <Stat color={hechas === SECCIONES.length ? MANIM.green : MANIM.yellow} label="Apartados escritos">
          {hechas} de {SECCIONES.length}
        </Stat>
        <Stat color={MANIM.orange} label="Coste de materiales">
          {f2(total)} €
        </Stat>
      </Readout>
    </Frame>
  );
}
