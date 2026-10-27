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

export const FACTORES_EIA = ["Calidad del aire", "Agua", "Suelo", "Fauna y flora", "Paisaje", "Empleo local"] as const;
/** Importancia (1–10) de cada factor ambiental, igual para todas las alternativas. */
export const IMPORTANCIAS_EIA = [8, 9, 7, 8, 5, 6] as const;
/** Alternativas con la magnitud (−10 muy negativa … +10 muy positiva) del efecto sobre cada factor. */
export const ALTERNATIVAS_EIA = [
  { n: "Parque fotovoltaico", mags: [8, -1, -4, -3, -4, 4] },
  { n: "Central de carbón", mags: [-9, -7, -6, -5, -6, 5] },
  { n: "Cantera a cielo abierto", mags: [-6, -6, -9, -8, -9, 3] },
] as const;
/** Valoración de impacto: Σ magnitud × importancia, con una reducción (%) de los efectos negativos por medidas correctoras. */
export function valoracionImpacto(mags: readonly number[], imps: readonly number[], reduccionPct = 0) {
  const k = 1 - Math.max(0, Math.min(100, reduccionPct)) / 100;
  const parciales = mags.map((m, i) => (m < 0 ? m * k : m) * (imps[i] ?? 0));
  const total = parciales.reduce((a, b) => a + b, 0);
  return { parciales, total, maximo: imps.reduce((a, b) => a + b, 0) * 10 };
}
export const clasificaImpacto = (total: number, maximo: number) => {
  const r = maximo > 0 ? total / maximo : 0;
  return r >= 0 ? "compatible o positivo" : r > -0.25 ? "moderado" : r > -0.5 ? "severo" : "crítico";
};

/** Cogeneración: ahorro de energía primaria frente a producir por separado (rendimientos de referencia 50 % eléctrico y 90 % térmico). */
export function cogeneracion(etaE: number, etaT: number, refE = 0.5, refT = 0.9) {
  const separado = etaE / refE + etaT / refT; // combustible necesario por separado por cada unidad de combustible de la cogeneración
  return { global: etaE + etaT, ahorro: separado > 0 ? 1 - 1 / separado : 0, separado };
}

/** Impacto por uso de un producto: la producción se reparte entre sus usos y se suma el impacto de cada uso. */
export const impactoPorUso = (produccion: number, porUso: number, usos: number) => (usos > 0 ? produccion / usos + porUso : Infinity);
/** Número de usos a partir del cual un producto reutilizable supera en limpieza a uno desechable. */
export const usosEquilibrio = (produccionReutilizable: number, porUsoReutilizable: number, impactoDesechable: number) => (impactoDesechable > porUsoReutilizable ? produccionReutilizable / (impactoDesechable - porUsoReutilizable) : Infinity);

/** OEE (eficiencia global de un equipo) = disponibilidad × rendimiento × calidad. */
export function oee(planificadoMin: number, paradasMin: number, cicloIdealSeg: number, piezas: number, buenas: number) {
  const operativo = Math.max(0, planificadoMin - paradasMin);
  const disponibilidad = planificadoMin > 0 ? operativo / planificadoMin : 0;
  const rendimiento = operativo > 0 ? Math.min(1, (cicloIdealSeg * piezas) / 60 / operativo) : 0;
  const calidad = piezas > 0 ? Math.min(1, buenas / piezas) : 0;
  return { disponibilidad, rendimiento, calidad, oee: disponibilidad * rendimiento * calidad };
}

/** Índice de circularidad de material simplificado (inspirado en el MCI): flujo lineal y utilidad (vida relativa al promedio). */
export function circularidad(recicladoEntradaPct: number, recuperacionFinPct: number, vidaRelativa: number) {
  const r = Math.max(0, Math.min(100, recicladoEntradaPct)) / 100;
  const w = Math.max(0, Math.min(100, recuperacionFinPct)) / 100;
  const lfi = 1 - (r + w) / 2;
  const x = Math.max(0.1, vidaRelativa);
  return { lfi, mci: Math.max(0, Math.min(1, 1 - lfi * (0.9 / x))) };
}

/* ───────────── 1. Evaluación de impacto ambiental ───────────── */

export function EiaExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.n, 0, 0, 2)), red: 0 };
  const [s, setS] = useState(init);
  const alt = ALTERNATIVAS_EIA[s.a]!;
  const v = valoracionImpacto(alt.mags, IMPORTANCIAS_EIA, s.red);
  const clase = clasificaImpacto(v.total, v.maximo);
  const max = Math.max(1, ...v.parciales.map((p) => Math.abs(p)));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una matriz de impacto multiplica la magnitud de cada efecto por la importancia del factor. Añade medidas correctoras y mira cómo mejora."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Proyecto" items={ALTERNATIVAS_EIA.map((x, value) => ({ value, label: x.n }))} value={s.a} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Reducción de los efectos negativos con medidas correctoras" value={s.red} min={0} max={80} step={5} unit=" %" color={MANIM.green} onChange={(red) => setS((x) => ({ ...x, red }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="eia" maxH={170}>
        <line x1={260} y1={8} x2={260} y2={142} stroke={MANIM.muted} strokeWidth={1} />
        {FACTORES_EIA.map((f, i) => {
          const p = v.parciales[i]!;
          const w = (Math.abs(p) / max) * 200;
          return (
            <g key={f}>
              <rect x={p >= 0 ? 260 : 260 - w} y={10 + i * 22} width={Math.max(2, w)} height={16} rx={3} fill={p >= 0 ? MANIM.green : MANIM.red} fillOpacity={0.7} />
              <text x={p >= 0 ? 255 : 265} y={22 + i * 22} textAnchor={p >= 0 ? "end" : "start"} fill={MANIM.muted} fontSize={11}>
                {f}
              </text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={v.total >= 0 ? MANIM.green : MANIM.red} label="Valoración total">{f0(v.total)} puntos</Stat>
        <Stat color={MANIM.muted} label="Rango posible">± {f0(v.maximo)}</Stat>
        <Stat color={v.total >= 0 ? MANIM.green : MANIM.yellow} label="Impacto global">{clase}</Stat>
      </Readout>
      <Note>La <b>evaluación de impacto ambiental (EIA)</b> es el procedimiento que obliga a analizar, antes de aprobar un proyecto, sus efectos sobre el entorno. Una <b>matriz tipo Leopold</b> cruza las acciones del proyecto con los factores ambientales: cada celda valora la <b>magnitud</b> (con signo) y la <b>importancia</b>. Después se proponen <b>medidas preventivas, correctoras y compensatorias</b> y un <b>plan de vigilancia</b>. Valores ilustrativos.</Note>
    </Frame>
  );
}

/* ───────────── 2. Cogeneración ───────────── */

export function CogeneracionExplorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.a, 35, 10, 50)), t: 45 };
  const [s, setS] = useState(init);
  const tt = Math.min(s.t, 100 - s.e);
  const r = cogeneracion(s.e / 100, tt / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Producir electricidad y calor útil a la vez con el mismo combustible aprovecha energía que una central perdería."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Rendimiento eléctrico" value={s.e} min={10} max={50} step={1} unit=" %" color={MANIM.yellow} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <Slider label="Rendimiento térmico (calor aprovechado)" value={tt} min={0} max={90} step={1} unit=" %" color={MANIM.orange} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="cogeneracion" maxH={130}>
        <rect x={40} y={20} width={400} height={30} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={1.5} />
        <rect x={40} y={20} width={s.e * 4} height={30} fill={MANIM.yellow} fillOpacity={0.7} />
        <rect x={40 + s.e * 4} y={20} width={tt * 4} height={30} fill={MANIM.orange} fillOpacity={0.7} />
        <text x={46} y={14} fill={MANIM.muted} fontSize={11}>
          combustible = 100 %
        </text>
        <text x={40} y={70} fill={MANIM.yellow} fontSize={12}>
          electricidad {s.e} %
        </text>
        <text x={40 + 150} y={70} fill={MANIM.orange} fontSize={12}>
          calor útil {tt} %
        </text>
        <text x={40 + 300} y={70} fill={MANIM.red} fontSize={12}>
          pérdidas {100 - s.e - tt} %
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Rendimiento global">{f0(r.global * 100)} %</Stat>
        <Stat color={MANIM.blue} label="Combustible por separado (central 50 % + caldera 90 %)">{f0(r.separado * 100)} unid. por cada 100 de la cogeneración</Stat>
        <Stat color={r.ahorro > 0 ? MANIM.green : MANIM.red} label="Ahorro de energía primaria">{f1(r.ahorro * 100)} %</Stat>
      </Readout>
      <Note>Una central eléctrica térmica tira más de la mitad de la energía del combustible como calor. En <b>cogeneración</b> ese calor se aprovecha (vapor industrial, calefacción urbana), así que el rendimiento global puede superar el 80 %. El <b>ahorro de energía primaria</b> compara con producir por separado la misma electricidad y el mismo calor: 1 − 1/(η<sub>e</sub>/0,50 + η<sub>t</sub>/0,90). La cogeneración solo compensa si hay una <b>demanda de calor constante</b> cerca.</Note>
    </Frame>
  );
}

/* ───────────── 3. Comparar el ciclo de vida de dos productos ───────────── */

export function AcvTi2Explorador({ block }: { block: ToolBlock }) {
  const init = { usos: Math.round(num(block.params?.a, 30, 1, 200)), prod: 1, lavado: 0.02 };
  const [s, setS] = useState(init);
  const desechable = 0.08;
  const reutil = impactoPorUso(s.prod, s.lavado, s.usos);
  const equilibrio = usosEquilibrio(s.prod, s.lavado, desechable);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara el CO₂ por uso de un envase desechable y uno reutilizable. La producción del reutilizable pesa más, pero se reparte entre muchos usos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Usos del envase reutilizable" value={s.usos} min={1} max={200} step={1} color={MANIM.blue} onChange={(usos) => setS((x) => ({ ...x, usos }))} />
          <Slider label="CO₂ de fabricar el reutilizable" value={s.prod} min={0.2} max={3} step={0.1} unit=" kg" color={MANIM.orange} onChange={(prod) => setS((x) => ({ ...x, prod }))} />
          <Slider label="CO₂ de lavarlo en cada uso" value={s.lavado} min={0} max={0.1} step={0.005} unit=" kg" color={MANIM.purple} onChange={(lavado) => setS((x) => ({ ...x, lavado }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Desechable (por uso)">{f2(desechable)} kg CO₂</Stat>
        <Stat color={reutil < desechable ? MANIM.green : MANIM.red} label="Reutilizable (por uso)">{f2(reutil)} kg CO₂</Stat>
        <Stat color={MANIM.blue} label="Usos para compensar">{Number.isFinite(equilibrio) ? `${f0(Math.ceil(equilibrio))} usos` : "nunca"}</Stat>
        <Stat color={reutil < desechable ? MANIM.green : MANIM.yellow} label="Mejor opción">{reutil < desechable ? "el reutilizable" : "el desechable (todavía)"}</Stat>
      </Readout>
      <Note>El <b>análisis de ciclo de vida (ACV)</b> compara productos por una <b>unidad funcional</b> (aquí, «un uso»). Impacto por uso = producción/usos + impacto de cada uso. Un envase reutilizable empieza «perdiendo» por su fabricación y empieza a ganar a partir de cierto número de usos. Lo decisivo es que realmente <b>se reutilice</b>. Cifras ilustrativas; un ACV completo incluye más categorías (agua, residuos, toxicidad).</Note>
    </Frame>
  );
}

/* ───────────── 4. OEE ───────────── */

export function OeeExplorador({ block }: { block: ToolBlock }) {
  const init = { plan: 480, par: Math.round(num(block.params?.a, 60, 0, 300)), ciclo: 30, piezas: 700, buenas: 665 };
  const [s, setS] = useState(init);
  const piezas = s.piezas;
  const r = oee(s.plan, s.par, s.ciclo, piezas, Math.min(s.buenas, piezas));
  const barra = (v: number, c: string, y: number, n: string) => (
    <g key={n}>
      <rect x={110} y={y} width={300} height={16} rx={3} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={1} />
      <rect x={110} y={y} width={300 * v} height={16} rx={3} fill={c} fillOpacity={0.7} />
      <text x={104} y={y + 12} textAnchor="end" fill={MANIM.muted} fontSize={11}>
        {n}
      </text>
      <text x={416} y={y + 12} fill={MANIM.ink} fontSize={11} fontWeight={700}>
        {f1(v * 100)} %
      </text>
    </g>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "La eficiencia global de un equipo mide qué parte del tiempo planificado produce piezas buenas a la velocidad ideal."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tiempo planificado (turno)" value={s.plan} min={120} max={720} step={30} unit=" min" color={MANIM.blue} onChange={(plan) => setS((x) => ({ ...x, plan }))} />
          <Slider label="Paradas (averías, cambios de formato)" value={s.par} min={0} max={300} step={5} unit=" min" color={MANIM.red} onChange={(par) => setS((x) => ({ ...x, par }))} />
          <Slider label="Tiempo de ciclo ideal" value={s.ciclo} min={5} max={120} step={1} unit=" s/pieza" color={MANIM.orange} onChange={(ciclo) => setS((x) => ({ ...x, ciclo }))} />
          <Slider label="Piezas fabricadas" value={s.piezas} min={0} max={1500} step={10} color={MANIM.purple} onChange={(p) => setS((x) => ({ ...x, piezas: p, buenas: Math.min(x.buenas, p) }))} />
          <Slider label="Piezas buenas" value={Math.min(s.buenas, s.piezas)} min={0} max={Math.max(1, s.piezas)} step={5} color={MANIM.green} onChange={(buenas) => setS((x) => ({ ...x, buenas }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="oee" maxH={130}>
        {barra(r.disponibilidad, MANIM.blue, 8, "Disponibilidad")}
        {barra(r.rendimiento, MANIM.orange, 34, "Rendimiento")}
        {barra(r.calidad, MANIM.green, 60, "Calidad")}
        {barra(r.oee, MANIM.yellow, 86, "OEE")}
      </Svg>
      <Readout>
        <Stat color={r.oee >= 0.85 ? MANIM.green : r.oee >= 0.6 ? MANIM.yellow : MANIM.red} label="OEE">{f1(r.oee * 100)} %</Stat>
        <Stat color={MANIM.muted} label="Referencia de clase mundial">≥ 85 %</Stat>
      </Readout>
      <Note>OEE = disponibilidad × rendimiento × calidad. Cada factor revela un tipo de pérdida: <b>paradas</b> (disponibilidad), <b>velocidad reducida y microparadas</b> (rendimiento) y <b>defectos y reprocesos</b> (calidad). Las prácticas de <b>fabricación ajustada (lean)</b> buscan eliminar los desperdicios: sobreproducción, esperas, transportes, exceso de inventario, movimientos, defectos y procesos innecesarios. Producir menos residuos y menos energía por pieza buena es producir de forma más sostenible.</Note>
    </Frame>
  );
}

/* ───────────── 5. Circularidad de un producto ───────────── */

export function CircularidadExplorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.a, 30, 0, 100)), w: 50, v: 1 };
  const [s, setS] = useState(init);
  const c = circularidad(s.r, s.w, s.v);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El índice de circularidad mide cuánto del material de un producto vuelve a circular: entra reciclado, se recupera al final y dura lo suficiente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Material reciclado en la fabricación" value={s.r} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Material recuperado al final de su vida" value={s.w} min={0} max={100} step={5} unit=" %" color={MANIM.blue} onChange={(w) => setS((x) => ({ ...x, w }))} />
          <Slider label="Vida útil respecto al promedio del sector" value={s.v} min={0.25} max={3} step={0.25} unit="×" color={MANIM.orange} onChange={(v) => setS((x) => ({ ...x, v }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Flujo lineal (se extrae y se desecha)">{f0(c.lfi * 100)} %</Stat>
        <Stat color={c.mci >= 0.6 ? MANIM.green : c.mci >= 0.3 ? MANIM.yellow : MANIM.red} label="Índice de circularidad (0–1)">{f2(c.mci)}</Stat>
      </Readout>
      <Note>Un producto es más circular cuanto <b>más material reciclado</b> usa, <b>más material se recupera</b> al final y <b>más dura</b> (durar el doble reduce a la mitad el material por año de servicio). Es una versión simplificada del <i>Material Circularity Indicator</i>. La economía circular se aplica por orden: <b>rediseñar, reducir, reutilizar, reparar, remanufacturar y, al final, reciclar</b>. Un producto de usar y tirar nunca llega a ser circular aunque se recicle.</Note>
    </Frame>
  );
}
