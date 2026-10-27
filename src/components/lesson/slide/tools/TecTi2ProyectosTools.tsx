"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const ETAPAS_ID = ["Estudio de viabilidad", "Prototipo", "Pruebas y validación", "Lanzamiento"] as const;
/** Embudo de I+D: recuento tras cada etapa, a partir de unas ideas y la tasa de éxito (0–1) de cada fase. */
export function embudo(ideas: number, tasas: readonly number[], costes: readonly number[]) {
  const cuentas = [ideas];
  let gasto = 0;
  for (let i = 0; i < tasas.length; i++) {
    gasto += cuentas[i]! * (costes[i] ?? 0);
    cuentas.push(cuentas[i]! * Math.max(0, Math.min(1, tasas[i]!)));
  }
  const productos = cuentas[cuentas.length - 1]!;
  return { cuentas, productos, gasto, costePorProducto: productos > 0 ? gasto / productos : Infinity };
}

/** Sprints necesarios para terminar un backlog con una velocidad media (puntos por sprint). */
export const sprintsNecesarios = (puntos: number, velocidad: number) => (velocidad > 0 ? Math.ceil(puntos / velocidad) : Infinity);
/** Trabajo pendiente tras cada sprint (burndown), con puntos nuevos añadidos en cada sprint. */
export function burndown(puntos: number, velocidad: number, sprints: number, nuevosPorSprint = 0) {
  const r = [puntos];
  for (let s = 1; s <= sprints; s++) r.push(Math.max(0, r[s - 1]! - velocidad + nuevosPorSprint));
  return r;
}
/** Ley de Little (Kanban): tiempo de entrega = tareas en curso (WIP) / ritmo de producción (tareas por semana). */
export const tiempoEntrega = (wip: number, ritmo: number) => (ritmo > 0 ? wip / ritmo : Infinity);

/** Distribución normal estándar acumulada (aproximación de Abramowitz-Stegun). */
export function normalCdf(z: number) {
  const t = 1 / (1 + 0.2316419 * Math.abs(z));
  const d = 0.3989423 * Math.exp((-z * z) / 2);
  const p = d * t * (0.3193815 + t * (-0.3565638 + t * (1.781478 + t * (-1.821256 + t * 1.330274))));
  return z > 0 ? 1 - p : p;
}
/** Estimación PERT de una tarea: duración esperada y desviación típica a partir de optimista, probable y pesimista. */
export const estimacionPert = (o: number, m: number, p: number) => ({ esp: (o + 4 * m + p) / 6, sigma: Math.abs(p - o) / 6 });
/** Proyecto de tareas en serie: duración esperada, desviación y probabilidad de acabar antes de un plazo. */
export function proyectoPert(tareas: readonly { o: number; m: number; p: number }[], plazo: number) {
  const est = tareas.map((t) => estimacionPert(t.o, t.m, t.p));
  const mu = est.reduce((a, b) => a + b.esp, 0);
  const sigma = Math.sqrt(est.reduce((a, b) => a + b.sigma ** 2, 0));
  const prob = sigma > 0 ? normalCdf((plazo - mu) / sigma) : plazo >= mu ? 1 : 0;
  return { mu, sigma, prob };
}

/** Valor actual neto de una inversión con un flujo de caja anual constante. */
export function van(inversion: number, flujoAnual: number, anios: number, tasaPct: number) {
  const r = tasaPct / 100;
  let v = -inversion;
  for (let t = 1; t <= anios; t++) v += flujoAnual / (1 + r) ** t;
  return v;
}
export const plazoRecuperacion = (inversion: number, flujoAnual: number) => (flujoAnual > 0 ? inversion / flujoAnual : Infinity);

/* ───────────── 1. Embudo de I+D ───────────── */

export function EmbudoExplorador({ block }: { block: ToolBlock }) {
  const init = { ideas: Math.round(num(block.params?.a, 100, 10, 1000)), t: [30, 50, 60, 80] as number[] };
  const [s, setS] = useState(init);
  const costes = [1, 10, 50, 100]; // miles de euros por unidad que entra en cada etapa
  const r = embudo(s.ideas, s.t.map((x) => x / 100), costes);
  const max = Math.max(1, s.ideas);
  return (
    <Frame
      stacked
      hint={block.hint ?? "De cada cien ideas, muy pocas llegan al mercado. Cambia la tasa de éxito de cada fase y mira el coste por producto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ideas de partida" value={s.ideas} min={10} max={1000} step={10} color={MANIM.blue} onChange={(ideas) => setS((x) => ({ ...x, ideas }))} />
          {ETAPAS_ID.map((e, i) => (
            <Slider key={e} label={`Éxito: ${e}`} value={s.t[i]!} min={5} max={100} step={5} unit=" %" color={[MANIM.orange, MANIM.purple, MANIM.green, MANIM.yellow][i]!} onChange={(v) => setS((x) => ({ ...x, t: x.t.map((y, k) => (k === i ? v : y)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={140} testId="embudo" maxH={160}>
        {r.cuentas.map((c, i) => (
          <g key={i}>
            <rect x={60} y={8 + i * 26} width={Math.max(4, (c / max) * 380)} height={20} rx={3} fill={i === r.cuentas.length - 1 ? MANIM.green : MANIM.blue} fillOpacity={0.6} />
            <text x={66 + Math.max(4, (c / max) * 380)} y={23 + i * 26} fill={MANIM.ink} fontSize={11} fontWeight={700}>
              {fmtEs(c, c < 10 ? 1 : 0)}
            </text>
            <text x={54} y={23 + i * 26} textAnchor="end" fill={MANIM.muted} fontSize={10}>
              {i === 0 ? "ideas" : i === r.cuentas.length - 1 ? "productos" : "etapa " + i}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Productos que llegan al mercado">{f1(r.productos)}</Stat>
        <Stat color={MANIM.blue} label="Éxito global">{f1((r.productos / Math.max(1, s.ideas)) * 100)} %</Stat>
        <Stat color={MANIM.orange} label="Inversión total en I+D">{f0(r.gasto)} mil €</Stat>
        <Stat color={MANIM.red} label="Coste por producto lanzado">{Number.isFinite(r.costePorProducto) ? `${f0(r.costePorProducto)} mil €` : "—"}</Stat>
      </Readout>
      <Note>Cada fase filtra ideas, pero también cuesta más: estudiar una idea es barato; probar un prototipo, caro. Por eso conviene <b>descartar pronto</b> lo que no tiene futuro. Un producto que llega al mercado «paga» el coste de todos los intentos fallidos: el éxito global de la I+D es bajo, y las empresas calculan su inversión con ese embudo. Costes y tasas ilustrativos.</Note>
    </Frame>
  );
}

/* ───────────── 2. Sprints y burndown ───────────── */

export function SprintExplorador({ block }: { block: ToolBlock }) {
  const init = { pts: Math.round(num(block.params?.a, 120, 20, 400)), vel: 20, nuevos: 0 };
  const [s, setS] = useState(init);
  const n = sprintsNecesarios(s.pts, s.vel - s.nuevos);
  const tope = 12;
  const bd = burndown(s.pts, s.vel, tope, s.nuevos);
  const X = (i: number) => 40 + (i / tope) * 440;
  const Y = (v: number) => 120 - (v / Math.max(1, s.pts)) * 100;
  const fin = Number.isFinite(n) ? Math.min(n, tope) : tope;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El backlog son los puntos de trabajo pendientes. En cada sprint el equipo completa su velocidad en puntos; el burndown muestra lo que queda."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Trabajo total (backlog)" value={s.pts} min={20} max={400} step={10} unit=" puntos" color={MANIM.blue} onChange={(pts) => setS((x) => ({ ...x, pts }))} />
          <Slider label="Velocidad del equipo" value={s.vel} min={5} max={60} step={1} unit=" puntos/sprint" color={MANIM.green} onChange={(vel) => setS((x) => ({ ...x, vel }))} />
          <Slider label="Trabajo nuevo que aparece en cada sprint" value={s.nuevos} min={0} max={30} step={1} unit=" puntos" color={MANIM.red} onChange={(nuevos) => setS((x) => ({ ...x, nuevos }))} />
        </>
      }
    >
      <Svg w={520} h={140} testId="burndown" maxH={160}>
        <polyline points={bd.map((v, i) => `${X(i)},${Y(v)}`).join(" ")} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <line x1={40} y1={Y(s.pts)} x2={480} y2={120} stroke={MANIM.muted} strokeWidth={1} strokeDasharray="5 4" />
        <text x={44} y={134} fill={MANIM.muted} fontSize={10}>
          sprint 0
        </text>
        <text x={480} y={134} textAnchor="end" fill={MANIM.muted} fontSize={10}>
          sprint {tope}
        </text>
        {Number.isFinite(n) && n <= tope ? <circle cx={X(fin)} cy={Y(bd[fin]!)} r={5} fill={MANIM.green} /> : null}
      </Svg>
      <Readout>
        <Stat color={Number.isFinite(n) ? MANIM.green : MANIM.red} label="Sprints necesarios">{Number.isFinite(n) ? n : "nunca (el trabajo nuevo iguala a la velocidad)"}</Stat>
        <Stat color={MANIM.blue} label="Duración con sprints de 2 semanas">{Number.isFinite(n) ? `${n * 2} semanas` : "—"}</Stat>
      </Readout>
      <Note>En <b>Scrum</b> el trabajo se divide en <b>sprints</b> de duración fija (1–4 semanas). La <b>velocidad</b> es la media de puntos de historia que el equipo completa por sprint y sirve para <b>predecir</b>, no para presionar. El <b>burndown</b> baja con la velocidad y sube si se añade trabajo nuevo (<b>cambio de alcance</b>): si lo nuevo iguala a la velocidad, el proyecto nunca termina.</Note>
    </Frame>
  );
}

/* ───────────── 3. Kanban y la ley de Little ───────────── */

export function KanbanExplorador({ block }: { block: ToolBlock }) {
  const init = { wip: Math.round(num(block.params?.a, 12, 1, 40)), rit: 4 };
  const [s, setS] = useState(init);
  const t = tiempoEntrega(s.wip, s.rit);
  const columnas = ["Por hacer", "En curso", "Hecho"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "En un tablero Kanban, limitar el trabajo en curso (WIP) acorta el tiempo que tarda cada tarea en terminarse."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tareas en curso a la vez (WIP)" value={s.wip} min={1} max={40} step={1} color={MANIM.orange} onChange={(wip) => setS((x) => ({ ...x, wip }))} />
          <Slider label="Tareas terminadas por semana" value={s.rit} min={1} max={15} step={1} color={MANIM.green} onChange={(rit) => setS((x) => ({ ...x, rit }))} />
        </>
      }
    >
      <Svg w={520} h={120} testId="kanban" maxH={140}>
        {columnas.map((c, i) => (
          <g key={c}>
            <rect x={40 + i * 150} y={10} width={140} height={100} rx={6} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={1.5} />
            <text x={110 + i * 150} y={26} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
              {c}
            </text>
            {i === 1
              ? Array.from({ length: Math.min(s.wip, 24) }, (_, k) => <rect key={k} x={48 + i * 150 + (k % 8) * 16} y={36 + Math.floor(k / 8) * 18} width={13} height={14} rx={2} fill={MANIM.orange} fillOpacity={0.8} />)
              : null}
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Tiempo de entrega de cada tarea (WIP / ritmo)">{Number.isFinite(t) ? `${f1(t)} semanas` : "—"}</Stat>
        <Stat color={MANIM.green} label="Ritmo">{s.rit} tareas/semana</Stat>
      </Readout>
      <Note>Ley de Little: <b>tiempo de entrega = trabajo en curso / ritmo</b>. Si el equipo termina 4 tareas por semana y tiene 12 a medias, cada una tarda 3 semanas; con un límite de 4 en curso, tardaría 1. Empezar menos y terminar más reduce los cambios de contexto y sale a cuenta. Kanban visualiza el flujo, <b>limita el WIP</b> y mejora de forma continua, sin sprints fijos.</Note>
    </Frame>
  );
}

/* ───────────── 4. Estimación con tres puntos (PERT) ───────────── */

export function EstimacionPertExplorador({ block }: { block: ToolBlock }) {
  const init = { o: [2, 3, 1], m: [4, 5, 2], p: [10, 9, 6], plazo: Math.round(num(block.params?.a, 16, 5, 40)) };
  const [s, setS] = useState(init);
  const tareas = ["Diseño", "Prototipo", "Pruebas"].map((n, i) => ({ n, o: s.o[i]!, m: Math.max(s.o[i]!, s.m[i]!), p: Math.max(s.o[i]!, s.m[i]!, s.p[i]!) }));
  const r = proyectoPert(tareas, s.plazo);
  const set = (k: "o" | "m" | "p", i: number, v: number) => setS((x) => ({ ...x, [k]: x[k].map((y, j) => (j === i ? v : y)) }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada tarea tiene una estimación optimista, otra probable y otra pesimista. Se calcula la duración esperada y la probabilidad de cumplir el plazo."}
      onReset={() => setS(init)}
      controls={
        <>
          {tareas.map((t, i) => (
            <div key={t.n} className="contents">
              <Slider label={`${t.n}: optimista`} value={s.o[i]!} min={1} max={15} step={1} unit=" d" color={MANIM.green} onChange={(v) => set("o", i, v)} />
              <Slider label={`${t.n}: probable`} value={s.m[i]!} min={1} max={20} step={1} unit=" d" color={MANIM.blue} onChange={(v) => set("m", i, v)} />
              <Slider label={`${t.n}: pesimista`} value={s.p[i]!} min={1} max={30} step={1} unit=" d" color={MANIM.red} onChange={(v) => set("p", i, v)} />
            </div>
          ))}
          <Slider label="Plazo comprometido" value={s.plazo} min={5} max={40} step={1} unit=" días" color={MANIM.purple} onChange={(plazo) => setS((x) => ({ ...x, plazo }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Duración esperada (O + 4M + P)/6">{f1(r.mu)} días</Stat>
        <Stat color={MANIM.muted} label="Desviación típica">{f1(r.sigma)} días</Stat>
        <Stat color={r.prob >= 0.9 ? MANIM.green : r.prob >= 0.5 ? MANIM.yellow : MANIM.red} label="Probabilidad de cumplir el plazo">{f0(r.prob * 100)} %</Stat>
      </Readout>
      <Note>La estimación a <b>tres puntos</b> reconoce la incertidumbre: duración esperada = (O + 4·M + P)/6 y desviación = (P − O)/6. En un proyecto de tareas en serie, las esperadas se <b>suman</b> y las varianzas también; con ello se estima la probabilidad de acabar antes de un plazo (aproximación normal). Un plazo igual a la duración esperada solo se cumple el 50 % de las veces: hay que añadir <b>margen</b> si importa cumplirlo.</Note>
    </Frame>
  );
}

/* ───────────── 5. Viabilidad económica: VAN ───────────── */

export function VanExplorador({ block }: { block: ToolBlock }) {
  const init = { inv: num(block.params?.a, 100, 10, 1000), flujo: 30, anios: 6, tasa: 8 };
  const [s, setS] = useState(init);
  const v = van(s.inv, s.flujo, s.anios, s.tasa);
  const pb = plazoRecuperacion(s.inv, s.flujo);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una inversión se evalúa comparando lo que cuesta ahora con los ingresos futuros, traídos al presente con una tasa de descuento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Inversión inicial" value={s.inv} min={10} max={1000} step={10} unit=" mil €" color={MANIM.red} onChange={(inv) => setS((x) => ({ ...x, inv }))} />
          <Slider label="Beneficio anual" value={s.flujo} min={1} max={300} step={1} unit=" mil €" color={MANIM.green} onChange={(flujo) => setS((x) => ({ ...x, flujo }))} />
          <Slider label="Años de vida del proyecto" value={s.anios} min={1} max={15} step={1} color={MANIM.blue} onChange={(anios) => setS((x) => ({ ...x, anios }))} />
          <Slider label="Tasa de descuento" value={s.tasa} min={0} max={20} step={0.5} unit=" %" color={MANIM.orange} onChange={(tasa) => setS((x) => ({ ...x, tasa }))} />
        </>
      }
    >
      <Readout>
        <Stat color={v >= 0 ? MANIM.green : MANIM.red} label="Valor actual neto (VAN)">{f1(v)} mil €</Stat>
        <Stat color={MANIM.blue} label="Plazo de recuperación">{Number.isFinite(pb) ? `${f1(pb)} años` : "no se recupera"}</Stat>
        <Stat color={v >= 0 && pb <= s.anios ? MANIM.green : MANIM.yellow} label="Decisión">{v >= 0 ? "rentable" : "no rentable con esta tasa"}</Stat>
      </Readout>
      <Note>VAN = −I + Σ F<sub>t</sub>/(1 + r)<sup>t</sup>. Un euro dentro de unos años vale menos que un euro hoy, por eso se <b>descuentan</b> los flujos futuros. Si el VAN es positivo, el proyecto devuelve la inversión y además rinde más que la tasa exigida. El <b>plazo de recuperación</b> (I/F) es más simple, pero ignora el valor del tiempo y lo que pasa después. Cifras ilustrativas.</Note>
    </Frame>
  );
}
