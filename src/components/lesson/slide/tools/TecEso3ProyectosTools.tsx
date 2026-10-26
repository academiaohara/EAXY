"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export type Especificacion = { nombre: string; unidad: string; min?: number; max?: number };

/** Una especificación se cumple si el valor medido está dentro de los límites (los que existan). */
export function cumpleEspecificacion(valor: number, e: Pick<Especificacion, "min" | "max">) {
  if (!Number.isFinite(valor)) return false;
  if (e.min !== undefined && valor < e.min) return false;
  if (e.max !== undefined && valor > e.max) return false;
  return true;
}

/** Margen (%) respecto al límite más cercano; negativo si no se cumple. */
export function margenEspecificacion(valor: number, e: Pick<Especificacion, "min" | "max">) {
  const m: number[] = [];
  if (e.min !== undefined && e.min !== 0) m.push(((valor - e.min) / Math.abs(e.min)) * 100);
  if (e.max !== undefined && e.max !== 0) m.push(((e.max - valor) / Math.abs(e.max)) * 100);
  return m.length ? Math.min(...m) : 0;
}

/** Carga máxima (N) de una viga rectangular apoyada con carga en el centro: F = 2·σ·b·h² / (3·L). */
export function cargaMaximaViga(sigmaMPa: number, bMm: number, hMm: number, LMm: number) {
  return LMm > 0 ? (2 * sigmaMPa * bMm * hMm * hMm) / (3 * LMm) : 0;
}

/** Masa (g) de una viga rectangular: volumen (mm³) × densidad (g/cm³) / 1000. */
export function masaViga(bMm: number, hMm: number, LMm: number, rho: number) {
  return (bMm * hMm * LMm * rho) / 1000;
}

/** Coste del proyecto: materiales + mano de obra (horas × tarifa) + indirectos (% sobre lo anterior). */
export function costeProyecto(materiales: number, horas: number, tarifa: number, indirectosPct: number) {
  const directo = materiales + horas * tarifa;
  return { directo, indirectos: (directo * indirectosPct) / 100, total: directo * (1 + indirectosPct / 100) };
}

/** Precio de venta con un margen de beneficio (%) sobre el coste. */
export const precioVenta = (coste: number, margenPct: number) => coste * (1 + margenPct / 100);

/** Unidades que hay que vender para cubrir un coste fijo dado el beneficio unitario. */
export const puntoEquilibrio = (fijo: number, precio: number, costeUnit: number) => (precio > costeUnit ? Math.ceil(fijo / (precio - costeUnit)) : Infinity);

/* ───────────── 1. Especificaciones técnicas ───────────── */

const SPECS: Especificacion[] = [
  { nombre: "Masa", unidad: "g", max: 500 },
  { nombre: "Carga", unidad: "N", min: 40 },
  { nombre: "Altura", unidad: "mm", min: 180, max: 220 },
  { nombre: "Coste", unidad: "€", max: 12 },
];
const SPEC_INIT = [430, 55, 205, 9.5];
const SPEC_RANGE: [number, number, number][] = [[100, 900, 10], [0, 100, 1], [100, 300, 1], [0, 30, 0.5]];

export function EspecificacionesExplorador({ block }: { block: ToolBlock }) {
  const init = SPEC_INIT.map((v, i) => (i === 0 ? num(block.params?.a, v, 100, 900) : v));
  const [vals, setVals] = useState<number[]>(init);
  const res = SPECS.map((e, i) => ({ e, ok: cumpleEspecificacion(vals[i]!, e), m: margenEspecificacion(vals[i]!, e) }));
  const fallos = res.filter((r) => !r.ok).length;
  const limite = (e: Especificacion) => (e.min !== undefined && e.max !== undefined ? `${e.min}–${e.max} ${e.unidad}` : e.min !== undefined ? `≥ ${e.min} ${e.unidad}` : `≤ ${e.max} ${e.unidad}`);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve cada medida de tu prototipo y comprueba si cumple la especificación (un número con unidad y un límite)."}
      onReset={() => setVals(init)}
      controls={
        <>
          {SPECS.map((e, i) => (
            <Slider key={e.nombre} label={`${e.nombre} (${limite(e)})`} value={vals[i]!} min={SPEC_RANGE[i]![0]} max={SPEC_RANGE[i]![1]} step={SPEC_RANGE[i]![2]} unit={` ${e.unidad}`} color={res[i]!.ok ? MANIM.green : MANIM.red} onChange={(v) => setVals((x) => x.map((y, k) => (k === i ? v : y)))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={130} testId="especificaciones" maxH={150}>
        {res.map((r, i) => (
          <g key={r.e.nombre}>
            <rect x={20 + i * 125} y={15} width={115} height={70} rx={8} fill={r.ok ? MANIM.green : MANIM.red} fillOpacity={0.25} stroke={r.ok ? MANIM.green : MANIM.red} strokeWidth={2} />
            <text x={77 + i * 125} y={38} fill={MANIM.ink} fontSize={13} textAnchor="middle" fontWeight={700}>
              {r.e.nombre}
            </text>
            <text x={77 + i * 125} y={60} fill={r.ok ? MANIM.green : MANIM.red} fontSize={16} textAnchor="middle" fontWeight={700}>
              {r.ok ? "Cumple" : "No cumple"}
            </text>
            <text x={77 + i * 125} y={78} fill={MANIM.muted} fontSize={11} textAnchor="middle">
              margen {f1(r.m)} %
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={fallos === 0 ? MANIM.green : MANIM.red} label="Requisitos cumplidos">{res.length - fallos} de {res.length}</Stat>
      </Readout>
      <Note>Una buena especificación es <b>medible</b>: incluye una magnitud, una unidad y un límite (por ejemplo «masa ≤ 500 g»). Así se puede comprobar con el prototipo si se cumple, y con qué margen.</Note>
    </Frame>
  );
}

/* ───────────── 2. Simulación digital: viga ───────────── */

const VIGAS = [
  { n: "Pino", sigma: 40, rho: 0.5 },
  { n: "Aluminio", sigma: 120, rho: 2.7 },
  { n: "PLA (impresión 3D)", sigma: 50, rho: 1.25 },
];

export function SimulacionVigaExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), b: 20, h: Math.round(num(block.params?.a, 20, 5, 60)), L: 300 };
  const [s, setS] = useState(init);
  const M = VIGAS[s.m]!;
  const F = cargaMaximaViga(M.sigma, s.b, s.h, s.L);
  const masa = masaViga(s.b, s.h, s.L, M.rho);
  const ratio = masa > 0 ? F / masa : 0;
  const hPx = 8 + s.h * 0.9;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba el diseño en el ordenador antes de construirlo: cambia el material y las medidas de la viga y observa la carga que aguanta y lo que pesa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={VIGAS.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Ancho de la sección" value={s.b} min={5} max={60} step={1} unit=" mm" color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Alto de la sección" value={s.h} min={5} max={60} step={1} unit=" mm" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Distancia entre apoyos" value={s.L} min={100} max={600} step={10} unit=" mm" color={MANIM.purple} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="simulacion-viga" maxH={160}>
        <polygon points="70,130 90,100 50,100" fill={MANIM.muted} />
        <polygon points="450,130 470,100 430,100" fill={MANIM.muted} />
        <rect x={50} y={100 - hPx} width={420} height={hPx} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
        <line x1={260} y1={8} x2={260} y2={100 - hPx - 4} stroke={MANIM.red} strokeWidth={4} />
        <polygon points="260,100 252,86 268,86" fill={MANIM.red} transform={`translate(0 ${-hPx - 4 + 4})`} />
        <text x={275} y={24} fill={MANIM.red} fontSize={13}>
          carga {f1(F)} N
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Carga máxima en el centro">{f1(F)} N</Stat>
        <Stat color={MANIM.blue} label="Masa de la viga">{f1(masa)} g</Stat>
        <Stat color={MANIM.green} label="Carga por gramo (cuanto más, mejor)">{f2(ratio)} N/g</Stat>
      </Readout>
      <Note>Una simulación sencilla permite comparar diseños sin gastar material. Fíjate en que el <b>alto</b> pesa al cuadrado (h²) en la resistencia, pero solo una vez en la masa: <b>poner la viga de canto</b> es la forma más barata de hacerla más resistente. Valores orientativos con la fórmula F = 2·σ·b·h² / (3·L).</Note>
    </Frame>
  );
}

/* ───────────── 3. Gestión de recursos: coste del proyecto ───────────── */

export function CosteProyectoExplorador({ block }: { block: ToolBlock }) {
  const init = { mat: Math.round(num(block.params?.a, 40, 0, 200)), h: 20, t: 12, ind: 10, mar: 20 };
  const [s, setS] = useState(init);
  const c = costeProyecto(s.mat, s.h, s.t, s.ind);
  const pv = precioVenta(c.total, s.mar);
  const eq = puntoEquilibrio(c.total, pv, s.mat);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Suma materiales, tiempo de trabajo e indirectos. Después añade un margen para fijar el precio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Materiales" value={s.mat} min={0} max={200} step={5} unit=" €" color={MANIM.blue} onChange={(mat) => setS((x) => ({ ...x, mat }))} />
          <Slider label="Horas de trabajo" value={s.h} min={0} max={80} step={1} unit=" h" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Coste por hora" value={s.t} min={5} max={40} step={1} unit=" €/h" color={MANIM.purple} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <Slider label="Indirectos (energía, desgaste…)" value={s.ind} min={0} max={30} step={1} unit=" %" color={MANIM.yellow} onChange={(ind) => setS((x) => ({ ...x, ind }))} />
          <Slider label="Margen de beneficio" value={s.mar} min={0} max={60} step={1} unit=" %" color={MANIM.green} onChange={(mar) => setS((x) => ({ ...x, mar }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Coste directo">{f2(c.directo)} €</Stat>
        <Stat color={MANIM.yellow} label="Indirectos">{f2(c.indirectos)} €</Stat>
        <Stat color={MANIM.orange} label="Coste total">{f2(c.total)} €</Stat>
        <Stat color={MANIM.green} label="Precio de venta">{f2(pv)} €</Stat>
      </Readout>
      <Note>{Number.isFinite(eq) ? `Si el coste total es un gasto que hay que cubrir y cada unidad adicional solo cuesta los materiales, hacen falta ${eq} unidades vendidas para recuperarlo.` : "Con este margen no se llega a recuperar el coste: sube el margen o baja el coste."} La gestión de recursos consiste en <b>medir el tiempo, el dinero y los materiales</b> para decidir si un proyecto es viable.</Note>
    </Frame>
  );
}
