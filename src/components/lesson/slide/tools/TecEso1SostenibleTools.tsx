"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── 8.1 Huella de un producto a lo largo de su vida ───────────── */

export const FASES_VIDA = ["Materias primas", "Fabricación", "Transporte", "Uso", "Fin de vida"] as const;
const COLOR_FASE = [MANIM.green, MANIM.orange, MANIM.blue, MANIM.purple, MANIM.red];

/** Datos orientativos (órdenes de magnitud): reparto porcentual por fase y huella total en kg de CO₂ equivalente. */
export const PRODUCTOS_HUELLA = [
  { n: "Teléfono móvil", p: [15, 65, 3, 14, 3], total: 70, anios: 3 },
  { n: "Camiseta de algodón", p: [30, 30, 10, 28, 2], total: 7, anios: 2 },
  { n: "Botella de plástico de un solo uso", p: [45, 30, 5, 0, 20], total: 0.1, anios: 1 },
  { n: "Bicicleta", p: [35, 45, 5, 10, 5], total: 150, anios: 10 },
] as const;

export function HuellaProductoExplorador({ block }: { block: ToolBlock }) {
  const p0 = Math.round(num(block.params?.n, 0, 0, PRODUCTOS_HUELLA.length - 1));
  const init = { p: p0, anios: PRODUCTOS_HUELLA[p0]!.anios as number };
  const [s, setS] = useState(init);
  const pr = PRODUCTOS_HUELLA[s.p]!;
  const reparto = pr.p as readonly number[];
  const dominante = reparto.indexOf(Math.max(...reparto));
  const anual = pr.total / s.anios;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un producto y mira en qué fase se concentra su impacto. Después, alarga sus años de uso y comprueba cómo baja el impacto de cada año."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Producto" items={PRODUCTOS_HUELLA.map((x, i) => ({ value: i, label: x.n }))} value={s.p} onChange={(p) => setS({ p, anios: PRODUCTOS_HUELLA[p]!.anios })} />
          <Slider label="Años de uso" value={s.anios} min={1} max={12} step={1} color={MANIM.green} onChange={(anios) => setS((x) => ({ ...x, anios }))} />
        </>
      }
    >
      <SplitBar parts={FASES_VIDA.map((f, i) => ({ value: pr.p[i]!, color: COLOR_FASE[i]!, label: `${pr.p[i]} %` }))} height={42} />
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[color:var(--stage-ink,#fff)]" aria-label="Leyenda">
        {FASES_VIDA.map((f, i) => (
          <li key={f} className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-sm" style={{ background: COLOR_FASE[i] }} />
            {f}: {pr.p[i]} %
          </li>
        ))}
      </ul>
      <Readout>
        <Stat color={MANIM.red} label="Huella total (kg de CO₂ equivalente, orientativa)">
          {pr.total < 1 ? f2(pr.total) : f0(pr.total)}
        </Stat>
        <Stat color={COLOR_FASE[dominante]!} label="Fase con más impacto">
          {FASES_VIDA[dominante]}
        </Stat>
        <Stat color={MANIM.green} label="Impacto por año de uso">
          {anual < 1 ? f2(anual) : f1(anual)} kg
        </Stat>
      </Readout>
      <Note>Los valores son órdenes de magnitud para razonar, no medidas exactas. Casi siempre la mayor parte del impacto está en conseguir las materias primas y fabricar, antes de que lo usemos: por eso alargar la vida del producto reduce mucho su impacto anual.</Note>
    </Frame>
  );
}

/* ───────────── 8.2 Hábitos de consumo responsable ───────────── */

export const HABITOS = [
  { n: "Llevar bolsa reutilizable", co2: 0.3, res: 0.5, agua: 0 },
  { n: "Usar botella reutilizable", co2: 0.8, res: 1, agua: 0 },
  { n: "Ir a clase a pie o en bici", co2: 12, res: 0, agua: 0 },
  { n: "Duchas de 5 minutos en vez de 10", co2: 1.5, res: 0, agua: 600 },
  { n: "Apagar luces y aparatos en espera", co2: 3, res: 0, agua: 0 },
  { n: "Reparar en vez de tirar", co2: 5, res: 2, agua: 0 },
  { n: "Comprar a granel, con menos envases", co2: 1, res: 1.5, agua: 0 },
  { n: "Ropa y libros de segunda mano", co2: 6, res: 1, agua: 1500 },
] as const;

export const totalHabitos = (activos: number[]) => ({
  co2: activos.reduce((a, i) => a + HABITOS[i]!.co2, 0),
  res: activos.reduce((a, i) => a + HABITOS[i]!.res, 0),
  agua: activos.reduce((a, i) => a + HABITOS[i]!.agua, 0),
});

export function ConsumoHabitosExplorador({ block }: { block: ToolBlock }) {
  const init = { activos: [] as number[] };
  const [s, setS] = useState(init);
  const t = totalHabitos(s.activos);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa los hábitos que podrías adoptar y mira lo que se ahorra cada mes (valores orientativos para una persona)."}
      onReset={() => setS(init)}
      controls={
        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-2" role="group" aria-label="Hábitos">
          {HABITOS.map((h, i) => (
            <button key={h.n} type="button" aria-pressed={s.activos.includes(i)} className={`${TOOL_BTN} text-left ${s.activos.includes(i) ? "bg-white/15" : ""}`} style={{ borderColor: s.activos.includes(i) ? MANIM.green : undefined }} onClick={() => setS((x) => ({ activos: x.activos.includes(i) ? x.activos.filter((a) => a !== i) : [...x.activos, i] }))}>
              {s.activos.includes(i) ? "✓ " : ""}
              {h.n}
            </button>
          ))}
        </div>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="CO₂ evitado al mes">
          {f1(t.co2)} kg
        </Stat>
        <Stat color={MANIM.orange} label="Residuos evitados al mes">
          {f1(t.res)} kg
        </Stat>
        <Stat color={MANIM.blue} label="Agua ahorrada al mes">
          {f0(t.agua)} L
        </Stat>
        <Stat color={MANIM.yellow} label="Hábitos activos">
          {s.activos.length} de {HABITOS.length}
        </Stat>
      </Readout>
      <Note>Un gesto aislado ahorra poco, pero repetido cada día y adoptado por muchas personas tiene mucho efecto. Los valores son estimaciones aproximadas, pensadas para comparar hábitos entre sí.</Note>
    </Frame>
  );
}

/* ───────────── 8.3 Ahorro de energía: potencia × tiempo ───────────── */

export const APARATOS = [
  { n: "Bombilla incandescente / LED", viejo: 60, nuevo: 8, h: 4 },
  { n: "Televisor antiguo / moderno", viejo: 150, nuevo: 50, h: 3 },
  { n: "Cargador siempre enchufado / desenchufado", viejo: 5, nuevo: 0, h: 24 },
] as const;
const PRECIO_KWH = 0.15; // €/kWh orientativo
const KG_CO2_KWH = 0.25; // kg CO₂ por kWh, orientativo

/** Energía en kWh: potencia (W) por horas ÷ 1000. */
export const energiaKwh = (potenciaW: number, horas: number) => (potenciaW * horas) / 1000;

export function AhorroEnergiaExplorador({ block }: { block: ToolBlock }) {
  const a0 = Math.round(num(block.params?.n, 0, 0, APARATOS.length - 1));
  const init = { a: a0, h: APARATOS[a0]!.h as number };
  const [s, setS] = useState(init);
  const ap = APARATOS[s.a]!;
  const eViejo = energiaKwh(ap.viejo, s.h * 365);
  const eNuevo = energiaKwh(ap.nuevo, s.h * 365);
  const ahorro = eViejo - eNuevo;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Energía = potencia × tiempo. Cambia las horas de uso y compara el consumo anual de la opción antigua y la eficiente."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Comparar" items={APARATOS.map((x, i) => ({ value: i, label: x.n }))} value={s.a} onChange={(a) => setS({ a, h: APARATOS[a]!.h })} />
          <Slider label="Horas de uso al día" value={s.h} min={1} max={24} step={1} unit=" h" color={MANIM.yellow} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: MANIM.red }}>
          <p className="font-bold" style={{ color: MANIM.red }}>
            Opción antigua · {ap.viejo} W
          </p>
          <p>{f0(eViejo)} kWh al año</p>
          <p>{f2(eViejo * PRECIO_KWH)} € al año</p>
        </div>
        <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: MANIM.green }}>
          <p className="font-bold" style={{ color: MANIM.green }}>
            Opción eficiente · {ap.nuevo} W
          </p>
          <p>{f0(eNuevo)} kWh al año</p>
          <p>{f2(eNuevo * PRECIO_KWH)} € al año</p>
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Ahorro de energía al año">
          {f0(ahorro)} kWh
        </Stat>
        <Stat color={MANIM.yellow} label="Ahorro de dinero al año">
          {f2(ahorro * PRECIO_KWH)} €
        </Stat>
        <Stat color={MANIM.blue} label="CO₂ evitado al año">
          {f1(ahorro * KG_CO2_KWH)} kg
        </Stat>
      </Readout>
      <Note>Precio supuesto: 0,15 €/kWh; emisión supuesta: 0,25 kg de CO₂ por kWh (valores orientativos). Un aparato en espera sigue consumiendo aunque «parezca» apagado.</Note>
    </Frame>
  );
}

/* ───────────── 8.4 ¿Cuánto tarda en descomponerse? ───────────── */

export const DESCOMPOSICION = [
  { n: "Piel de plátano", a: 0.1 },
  { n: "Papel", a: 0.5 },
  { n: "Brik de leche", a: 5 },
  { n: "Lata de acero", a: 50 },
  { n: "Bolsa de plástico", a: 150 },
  { n: "Botella de plástico (PET)", a: 450 },
  { n: "Botella de vidrio", a: 4000 },
] as const;
const ANIOS_PASOS = [0.1, 1, 10, 50, 100, 500, 1000, 4000];

export function TiempoDescomposicionExplorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, ANIOS_PASOS.length - 1)) };
  const [s, setS] = useState(init);
  const t = ANIOS_PASOS[s.i]!;
  const hechos = DESCOMPOSICION.filter((d) => d.a <= t).length;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Avanza en el tiempo y comprueba qué residuos ya han desaparecido y cuáles siguen entre nosotros (valores orientativos)."}
      onReset={() => setS(init)}
      controls={<Slider label="Tiempo transcurrido" value={s.i} min={0} max={ANIOS_PASOS.length - 1} step={1} format={(v) => (ANIOS_PASOS[v]! < 1 ? "1 mes aprox." : `${f0(ANIOS_PASOS[v]!)} ${ANIOS_PASOS[v] === 1 ? "año" : "años"}`)} color={MANIM.orange} onChange={(i) => setS({ i })} />}
    >
      <ul className="flex flex-col gap-2" data-testid="descomposicion-lista">
        {DESCOMPOSICION.map((d) => {
          const ok = d.a <= t;
          const w = clamp((Math.log10(d.a * 10) / Math.log10(40000)) * 100, 3, 100);
          return (
            <li key={d.n} className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
              <span className="w-48 shrink-0">{d.n}</span>
              <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
                <div className="anim-t h-full" style={{ width: `${w}%`, background: ok ? MANIM.green : MANIM.red, opacity: ok ? 0.5 : 1 }} />
              </div>
              <span className="w-28 text-right tabular-nums">{d.a < 1 ? "unos meses" : `${f0(d.a)} años`}</span>
            </li>
          );
        })}
      </ul>
      <Readout>
        <Stat color={MANIM.green} label="Ya descompuestos">
          {hechos} de {DESCOMPOSICION.length}
        </Stat>
        <Stat color={MANIM.red} label="Todavía sin descomponer">
          {DESCOMPOSICION.length - hechos}
        </Stat>
      </Readout>
      <Note>La escala de las barras es logarítmica: cada tramo es unas diez veces mayor. Los tiempos son estimaciones muy variables según el clima y el entorno, pero muestran que los plásticos y el vidrio persisten durante siglos.</Note>
    </Frame>
  );
}

/* ───────────── 8.5 Economía lineal frente a circular ───────────── */

/** Materia prima nueva y residuos finales por cada 100 usos con una fracción de reutilización `u` y de reciclado `r` (0–1). */
export const balanceCircular = (u: number, r: number) => {
  const productos = 100 * (1 - u);
  const nueva = productos * (1 - r);
  return { productos, nueva, residuos: nueva };
};

export function LinealCircularEsoExplorador({ block }: { block: ToolBlock }) {
  const init = { u: Math.round(num(block.params?.a, 0, 0, 80)), r: Math.round(num(block.params?.b, 0, 0, 90)) };
  const [s, setS] = useState(init);
  const b = balanceCircular(s.u / 100, s.r / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la reutilización y el reciclaje: cada producto que se reutiliza es un producto que no hay que fabricar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Productos que se reutilizan" value={s.u} min={0} max={80} step={5} unit=" %" color={MANIM.blue} onChange={(u) => setS((x) => ({ ...x, u }))} />
          <Slider label="Material que se recicla" value={s.r} min={0} max={90} step={5} unit=" %" color={MANIM.green} onChange={(r) => setS((x) => ({ ...x, r }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="lineal-circular" maxH={160}>
        {[
          { y: 20, t: "Materia prima nueva", v: b.nueva, c: MANIM.orange },
          { y: 70, t: "Residuos que se tiran", v: b.residuos, c: MANIM.red },
          { y: 120, t: "Productos que se fabrican", v: b.productos, c: MANIM.blue },
        ].map((r) => (
          <g key={r.t}>
            <text x={10} y={r.y + 16} fill={MANIM.muted} fontSize={13}>
              {r.t}
            </text>
            <rect x={200} y={r.y} width={300} height={22} rx={4} fill={MANIM.ink} fillOpacity={0.05} stroke={MANIM.grid} />
            <rect x={200} y={r.y} width={r.v * 3} height={22} rx={4} fill={r.c} fillOpacity={0.7} className="anim-t" />
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Productos fabricados (de 100 necesarios)">
          {f0(b.productos)}
        </Stat>
        <Stat color={MANIM.orange} label="Materia prima nueva">
          {f0(b.nueva)} %
        </Stat>
        <Stat color={MANIM.red} label="Residuos finales">
          {f0(b.residuos)} %
        </Stat>
      </Readout>
      <Note>En una economía lineal (0 % y 0 %) todo lo que se fabrica acaba como residuo. En una circular, lo reutilizable no se fabrica de nuevo y lo reciclado vuelve a ser materia prima: los dos indicadores bajan a la vez.</Note>
    </Frame>
  );
}

/* ───────────── 8.6 Accesibilidad: una rampa ───────────── */

/** Pendiente máxima (%) permitida en una rampa accesible según su longitud (m): 10 % hasta 3 m, 8 % hasta 6 m, 6 % si es más larga. */
export const pendienteMaxima = (longitudM: number) => (longitudM <= 3 ? 10 : longitudM <= 6 ? 8 : 6);

/** Longitud mínima (m) de una rampa para salvar un desnivel de `alturaCm` cumpliendo la pendiente máxima. */
export function longitudMinimaRampa(alturaCm: number): number {
  const h = alturaCm / 100;
  const l10 = h / 0.1;
  if (l10 <= 3) return l10;
  const l8 = h / 0.08;
  if (l8 <= 6) return l8;
  return h / 0.06;
}

export function RampaAccesibilidadExplorador({ block }: { block: ToolBlock }) {
  const init = { h: Math.round(num(block.params?.a, 30, 5, 120)), L: num(block.params?.b, 2, 0.5, 12) };
  const [s, setS] = useState(init);
  const pend = (s.h / 100 / s.L) * 100;
  const max = pendienteMaxima(s.L);
  const ok = pend <= max;
  const minL = longitudMinimaRampa(s.h);
  const x0 = 40;
  const wpx = clamp(s.L * 30, 30, 360);
  const hpx = clamp((s.h / 100) * 100, 8, 120);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el desnivel y la longitud de la rampa: debe ser lo bastante larga para que se pueda subir en silla de ruedas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Desnivel que hay que salvar" value={s.h} min={5} max={120} step={5} unit=" cm" color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Longitud de la rampa" value={s.L} min={0.5} max={12} step={0.5} unit=" m" format={f1} color={MANIM.orange} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="rampa" maxH={200}>
        <line x1={20} y1={160} x2={500} y2={160} stroke={MANIM.grid} strokeWidth={4} />
        <polygon points={`${x0},160 ${x0 + wpx},160 ${x0 + wpx},${160 - hpx}`} fill={ok ? MANIM.green : MANIM.red} fillOpacity={0.3} stroke={ok ? MANIM.green : MANIM.red} strokeWidth={4} className="anim-t" />
        <rect x={x0 + wpx} y={160 - hpx} width={500 - x0 - wpx} height={hpx} fill={MANIM.muted} fillOpacity={0.3} />
        <text x={x0 + wpx / 2} y={178} fill={MANIM.muted} fontSize={13} textAnchor="middle">
          {f1(s.L)} m
        </text>
        <text x={x0 + wpx + 12} y={160 - hpx / 2} fill={MANIM.muted} fontSize={13}>
          {s.h} cm
        </text>
        <text x={500} y={20} fill={MANIM.muted} fontSize={11} textAnchor="end">
          (altura exagerada en el dibujo)
        </text>
      </Svg>
      <Readout>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Pendiente de la rampa">
          {f1(pend)} %
        </Stat>
        <Stat color={MANIM.yellow} label="Pendiente máxima permitida">
          {max} %
        </Stat>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Resultado">
          {ok ? "Accesible" : "Demasiado empinada"}
        </Stat>
        <Stat color={MANIM.blue} label="Longitud mínima para este desnivel">
          {f1(minL)} m
        </Stat>
      </Readout>
      <Note>La pendiente es el desnivel dividido entre la longitud, en tanto por ciento. En edificios españoles las rampas accesibles pueden llegar al 10 % si miden hasta 3 m, al 8 % hasta 6 m y al 6 % si son más largas. Valores de referencia del Código Técnico de la Edificación.</Note>
    </Frame>
  );
}
