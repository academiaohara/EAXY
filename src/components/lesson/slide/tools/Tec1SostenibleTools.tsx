"use client";

import { useMemo, useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

function HBar({ label, value, max, color, text }: { label: string; value: number; max: number; color: string; text?: string }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-40 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full rounded" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="w-28 shrink-0 text-right font-bold tabular-nums">{text ?? f1(value)}</span>
    </div>
  );
}

const hash = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ───────────── 7.1 Decisiones tecnológicas e indicadores ───────────── */

const DECISIONES = [
  { n: "Instalar paneles solares en el pueblo", a: 25, s: 10, e: -10 },
  { n: "Mantener una central de carbón", a: -35, s: 5, e: 15 },
  { n: "Aislar los edificios públicos", a: 15, s: 5, e: 10 },
  { n: "Bono eléctrico para familias vulnerables", a: 0, s: 25, e: -15 },
  { n: "Importar electricidad barata de la red", a: -10, s: 0, e: 10 },
];

export function indicadores(sel: boolean[]) {
  const tot = { a: 50, s: 50, e: 50 };
  DECISIONES.forEach((d, i) => {
    if (sel[i]) {
      tot.a += d.a;
      tot.s += d.s;
      tot.e += d.e;
    }
  });
  return { a: clamp(tot.a, 0, 100), s: clamp(tot.s, 0, 100), e: clamp(tot.e, 0, 100) };
}

export function IndicadoresDecisionExplorador({ block }: { block: ToolBlock }) {
  const init = [false, false, false, false, false];
  const [sel, setSel] = useState<boolean[]>(init);
  const r = indicadores(sel);
  const min = Math.min(r.a, r.s, r.e);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada decisión mejora unos indicadores y empeora otros. Combina decisiones y busca un equilibrio: la sostenibilidad exige que ninguna de las tres dimensiones se hunda."}
      onReset={() => setSel(init)}
      controls={
        <div className="flex flex-col gap-2 sm:col-span-2">
          {DECISIONES.map((d, i) => (
            <label key={d.n} className="flex items-center gap-2 text-sm text-[color:var(--stage-ink,#fff)]">
              <input type="checkbox" checked={sel[i]!} onChange={() => setSel((x) => x.map((y, j) => (j === i ? !y : y)))} />
              {d.n}
              <span className="text-[color:var(--stage-muted,#b8c2d0)]">
                (amb. {d.a > 0 ? "+" : ""}
                {d.a} · soc. {d.s > 0 ? "+" : ""}
                {d.s} · eco. {d.e > 0 ? "+" : ""}
                {d.e})
              </span>
            </label>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-1.5" data-testid="indicadores-barras">
        <HBar label="Ambiental" value={r.a} max={100} color={MANIM.green} text={`${f0(r.a)} / 100`} />
        <HBar label="Social" value={r.s} max={100} color={MANIM.blue} text={`${f0(r.s)} / 100`} />
        <HBar label="Económico" value={r.e} max={100} color={MANIM.orange} text={`${f0(r.e)} / 100`} />
      </div>
      <Readout>
        <Stat color={min >= 50 ? MANIM.green : MANIM.red} label="Dimensión más débil">
          {f0(min)} / 100
        </Stat>
        <Stat color={MANIM.yellow} label="Decisiones tomadas">
          {sel.filter(Boolean).length}
        </Stat>
      </Readout>
      <Note>{min >= 50 && sel.some(Boolean) ? "Equilibrado: ninguna dimensión cae por debajo del punto de partida." : min < 50 ? "Alguna dimensión empeora: ¿qué decisión la compensa?" : "Parte de 50 en cada indicador."} Los efectos son <strong>valoraciones de ejemplo</strong>, no mediciones.</Note>
    </Frame>
  );
}

/* ───────────── 7.2 Recursos de un producto ───────────── */

const FASES = ["Extracción", "Fabricación", "Transporte", "Uso", "Fin de vida"];
/** Recursos por fase: [agua (L), energía (MJ), materias primas (kg)]. Órdenes de magnitud, no datos exactos. */
const PRODUCTOS_REC = [
  { n: "Smartphone (3 años de uso)", v: [[12000, 150, 70], [3000, 300, 3], [5, 10, 0], [20, 40, 0], [30, 5, -0.05]] },
  { n: "Camiseta de algodón", v: [[2500, 25, 0.4], [150, 20, 0.05], [2, 5, 0], [50, 12, 0], [1, 1, 0]] },
  { n: "Botella de PET de 0,5 L", v: [[2, 1.5, 0.03], [1, 1.5, 0.02], [0, 0.5, 0], [0, 0, 0], [0, 0.1, 0]] },
];

export function MapaRecursosExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PRODUCTOS_REC.length - 1)), f: 0, rec: 0 };
  const [s, setS] = useState(init);
  const prod = PRODUCTOS_REC[s.p]!;
  const col = prod.v.map((v) => v[s.rec]!);
  const max = Math.max(...col, 1e-9);
  const total = col.reduce((a, b) => a + b, 0);
  const mayor = col.indexOf(Math.max(...col));
  const unidad = ["L de agua", "MJ de energía", "kg de materias primas"][s.rec]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia de producto y de recurso: la fase que más recursos consume casi nunca es la que imaginas. Pulsa una fase para ver sus valores."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Producto" items={PRODUCTOS_REC.map((p, i) => ({ value: i, label: p.n }))} value={s.p} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Choice label="Recurso" items={[{ value: 0, label: "Agua" }, { value: 1, label: "Energía" }, { value: 2, label: "Materias primas" }]} value={s.rec} onChange={(rec) => setS((x) => ({ ...x, rec }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1.5" data-testid="recursos-fases">
        {FASES.map((f, i) => (
          <button key={f} type="button" aria-pressed={s.f === i} className="text-left" onClick={() => setS((x) => ({ ...x, f: i }))}>
            <HBar label={f} value={Math.max(0, col[i]!)} max={max} color={i === mayor ? MANIM.red : MANIM.blue} text={`${fmtEs(col[i]!, col[i]! < 10 ? 2 : 0)}`} />
          </button>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.red} label="Fase que más consume">
          {FASES[mayor]}
        </Stat>
        <Stat color={MANIM.green} label={`Total (${unidad})`}>
          {fmtEs(total, total < 10 ? 2 : 0)}
        </Stat>
        <Stat color={MANIM.yellow} label={`${FASES[s.f]}: % del total`}>
          {total > 0 ? f0((Math.max(0, col[s.f]!) / total) * 100) : 0} %
        </Stat>
      </Readout>
      <Note>Valores de <strong>orden de magnitud</strong> (varían mucho entre fuentes y modelos). El agua incluye la «oculta» de la extracción y cultivo. En el smartphone, el fin de vida resta materias primas porque se recuperan por reciclaje.</Note>
    </Frame>
  );
}

/* ───────────── 7.3 Edificio eficiente ───────────── */

export function demandaCalefaccion(esp: number, uVentana: number, tInt: number): number {
  const uMuro = 1 / (0.17 + 0.5 + esp / 100 / 0.035);
  const UA = uMuro * 100 + uVentana * 15;
  return (UA * (tInt - 8) * 24 * 180) / 1000; // kWh por temporada de calefacción
}

export function EdificioEficienciaExplorador({ block }: { block: ToolBlock }) {
  const init = { esp: Math.round(num(block.params?.a, 0, 0, 20)), v: num(block.params?.b, 1.4, 0.8, 5.7), t: Math.round(num(block.params?.c, 21, 18, 24)), led: false, h: 4 };
  const [s, setS] = useState(init);
  const cal = demandaCalefaccion(s.esp, s.v, s.t);
  const luz = (12 * (s.led ? 7 : 50) * s.h * 365) / 1000;
  const total = cal + luz;
  const base = demandaCalefaccion(0, 5.7, 24) + (12 * 50 * 6 * 365) / 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aísla las paredes, cambia las ventanas, baja un grado el termostato y pasa a LED: cada medida ahorra, pero no todas ahorran lo mismo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Aislante en muros (λ = 0,035 W/m·K)" value={s.esp} min={0} max={20} unit=" cm" color={MANIM.blue} onChange={(esp) => setS((x) => ({ ...x, esp }))} />
          <Choice label="Ventanas (15 m²)" items={[{ value: 5.7, label: "Vidrio simple (U 5,7)" }, { value: 1.4, label: "Doble (U 1,4)" }, { value: 0.8, label: "Triple (U 0,8)" }]} value={s.v} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Temperatura interior" value={s.t} min={18} max={24} unit=" °C" color={MANIM.red} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <Choice label="Iluminación (12 puntos)" items={[{ value: 0, label: "Halógena 50 W" }, { value: 1, label: "LED 7 W" }]} value={s.led ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, led: v === 1 }))} />
          <Slider label="Horas de luz al día" value={s.h} min={1} max={10} unit=" h" color={MANIM.yellow} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <HBar label="Calefacción" value={cal} max={Math.max(cal, luz, 12000)} color={MANIM.red} text={`${f0(cal)} kWh`} />
      <HBar label="Iluminación" value={luz} max={Math.max(cal, luz, 12000)} color={MANIM.yellow} text={`${f0(luz)} kWh`} />
      <Readout>
        <Stat color={MANIM.green} label="Energía anual estimada">
          {f0(total)} kWh
        </Stat>
        <Stat color={MANIM.purple} label="Emisiones (0,2 kg CO₂/kWh)">
          {f0(total * 0.2)} kg
        </Stat>
        <Stat color={MANIM.orange} label="Frente a un edificio sin medidas">
          {f0(Math.max(0, (1 - total / base) * 100))} % menos
        </Stat>
      </Readout>
      <Note>Modelo simplificado: 100 m² de muro con U = 1/(0,67 + e/λ), 15 m² de ventanas, 180 días de calefacción con temperatura exterior media de 8 °C. No incluye ganancias solares ni ventilación.</Note>
    </Frame>
  );
}

/* ───────────── 7.4 Producto desechable frente a reutilizable ───────────── */

export function impactoBotellas(usos: number) {
  const reutilizable = { extraccion: 1.0, fabricacion: 1.5, transporte: 0.1, uso: 0.02 * usos, fin: 0.05 };
  const desechable = { extraccion: 0.03 * usos, fabricacion: 0.04 * usos, transporte: 0.01 * usos, uso: 0, fin: 0.01 * usos };
  const sum = (o: Record<string, number>) => Object.values(o).reduce((a, b) => a + b, 0);
  return { reutilizable, desechable, totR: sum(reutilizable), totD: sum(desechable) };
}

export function ProductoImpactoExplorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 20, 1, 500));
  const [usos, setUsos] = useState(init);
  const r = impactoBotellas(usos);
  const mejor = r.totR < r.totD ? "reutilizable" : "desechable";
  const fases: [string, keyof typeof r.reutilizable][] = [["Extracción", "extraccion"], ["Fabricación", "fabricacion"], ["Transporte", "transporte"], ["Uso (lavado)", "uso"], ["Fin de vida", "fin"]];
  const max = Math.max(r.totR, r.totD, 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El producto reutilizable carga con un impacto inicial alto que se «amortiza» con los usos. Busca el número de usos a partir del cual compensa."}
      onReset={() => setUsos(init)}
      controls={<Slider label="Número de usos" value={usos} min={1} max={500} color={MANIM.yellow} onChange={setUsos} />}
    >
      <div className="grid gap-4 sm:grid-cols-2" data-testid="impacto-barras">
        {([["Botella reutilizable de acero", r.reutilizable, r.totR, MANIM.green], ["Botellas de plástico de un solo uso", r.desechable, r.totD, MANIM.red]] as const).map(([n, d, t, c]) => (
          <div key={n} className="flex flex-col gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-2">
            <strong className="text-sm" style={{ color: c }}>
              {n}: {f2(t)} kg CO₂e
            </strong>
            {fases.map(([lab, k]) => (
              <HBar key={k} label={lab} value={d[k]} max={max} color={c} text={f2(d[k])} />
            ))}
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Menor impacto con esos usos">
          {mejor === "reutilizable" ? "La reutilizable" : "La de un solo uso"}
        </Stat>
        <Stat color={MANIM.yellow} label="Punto de equilibrio (usos)">
          {f0(Math.ceil(2.65 / 0.07))}
        </Stat>
      </Readout>
      <Note>Cifras <strong>ilustrativas</strong> en kg de CO₂ equivalente por la función «beber agua durante {usos} usos». Con datos reales el punto de equilibrio varía mucho según el material, el lavado y la vida útil.</Note>
    </Frame>
  );
}

/* ───────────── 7.5 Economía circular ───────────── */

export function flujoCircular(masa: number, vida: number, pRep: number, reciclaje: number) {
  const vidaEf = vida * (1 + 0.6 * (pRep / 100));
  const virgen = masa * (1 - reciclaje / 100);
  return { vidaEf, virgenAnio: virgen / vidaEf, base: masa / 5 };
}

export function EconomiaCircularExplorador({ block }: { block: ToolBlock }) {
  const init = { vida: Math.round(num(block.params?.a, 5, 2, 15)), rep: Math.round(num(block.params?.b, 0, 0, 100)), rec: Math.round(num(block.params?.c, 0, 0, 100)), masa: 10 };
  const [s, setS] = useState(init);
  const r = flujoCircular(s.masa, s.vida, s.rep, s.rec);
  const red = (1 - r.virgenAnio / r.base) * 100;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un electrodoméstico de 10 kg que dura 5 años y se tira entero es el modelo lineal (2 kg de material nuevo al año). Alarga su vida, repáralo y recicla sus materiales."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Vida útil del diseño" value={s.vida} min={2} max={15} unit=" años" color={MANIM.blue} onChange={(vida) => setS((x) => ({ ...x, vida }))} />
          <Slider label="Reparabilidad (probabilidad de arreglarlo)" value={s.rep} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(rep) => setS((x) => ({ ...x, rep }))} />
          <Slider label="Materiales recuperados por reciclaje" value={s.rec} min={0} max={100} step={5} unit=" %" color={MANIM.orange} onChange={(rec) => setS((x) => ({ ...x, rec }))} />
        </>
      }
    >
      <HBar label="Modelo lineal (base)" value={r.base} max={2} color={MANIM.red} text={`${f2(r.base)} kg/año`} />
      <HBar label="Tu diseño" value={r.virgenAnio} max={2} color={MANIM.green} text={`${f2(r.virgenAnio)} kg/año`} />
      <Readout>
        <Stat color={MANIM.blue} label="Vida efectiva con reparaciones">
          {f1(r.vidaEf)} años
        </Stat>
        <Stat color={MANIM.green} label="Material nuevo por año de servicio">
          {f2(r.virgenAnio)} kg
        </Stat>
        <Stat color={red > 0 ? MANIM.green : MANIM.muted} label="Reducción frente a lo lineal">
          {f0(Math.max(0, red))} %
        </Stat>
      </Readout>
      <Note>Modelo simplificado: cada reparación probable alarga la vida un 60 %, y el material reciclado sustituye al nuevo. Las estrategias «reducir, reutilizar, reparar» pesan más que «reciclar», que es la última.</Note>
    </Frame>
  );
}

/* ───────────── 7.6 Parque energético virtual ───────────── */

export function simulaRed(solar: number, eolica: number, viento: number, nubes: number, bateria: number) {
  const dem = Array.from({ length: 24 }, (_, h) => 30 + 25 * Math.exp(-((h - 8) ** 2) / 8) + 40 * Math.exp(-((h - 21) ** 2) / 10));
  const gen = Array.from({ length: 24 }, (_, h) => {
    const sol = h >= 7 && h <= 19 ? solar * Math.sin((Math.PI * (h - 7)) / 12) * (1 - nubes / 100) : 0;
    const eol = eolica * viento * (0.7 + 0.6 * hash(h, 5));
    return sol + eol;
  });
  let soc = 0;
  let deficit = 0;
  let vertido = 0;
  let cubierto = 0;
  const falta: number[] = [];
  for (let h = 0; h < 24; h += 1) {
    const dif = gen[h]! - dem[h]!;
    if (dif >= 0) {
      const carga = Math.min(dif, bateria - soc);
      soc += carga;
      vertido += dif - carga;
      falta.push(0);
      cubierto += dem[h]!;
    } else {
      const descarga = Math.min(-dif, soc);
      soc -= descarga;
      const resto = -dif - descarga;
      deficit += resto;
      falta.push(resto);
      cubierto += dem[h]! - resto;
    }
  }
  const total = dem.reduce((a, b) => a + b, 0);
  return { dem, gen, falta, deficit, vertido, cobertura: (cubierto / total) * 100, total };
}

export function ParqueRenovableExplorador({ block }: { block: ToolBlock }) {
  const init = { solar: Math.round(num(block.params?.a, 80, 0, 200)), eol: Math.round(num(block.params?.b, 40, 0, 200)), v: num(block.params?.c, 0.6, 0.1, 1), nubes: 0, bat: 0 };
  const [s, setS] = useState(init);
  const r = useMemo(() => simulaRed(s.solar, s.eol, s.v, s.nubes, s.bat), [s]);
  const X = (h: number) => 50 + (h / 23) * 450;
  const Y = (mw: number) => 190 - (mw / 150) * 170;
  const linea = (d: number[]) => d.map((v, h) => `${h ? "L" : "M"} ${X(h).toFixed(1)} ${Y(Math.min(150, v)).toFixed(1)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la potencia solar y eólica y mira cómo no coinciden con la demanda. El almacenamiento traslada energía de las horas de sobra a las de falta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Potencia solar instalada (pico)" value={s.solar} min={0} max={200} step={10} unit=" MW" color={MANIM.yellow} onChange={(solar) => setS((x) => ({ ...x, solar }))} />
          <Slider label="Potencia eólica instalada" value={s.eol} min={0} max={200} step={10} unit=" MW" color={MANIM.blue} onChange={(eol) => setS((x) => ({ ...x, eol }))} />
          <Slider label="Intensidad del viento (factor)" value={s.v} min={0.1} max={1} step={0.05} format={f2} color={MANIM.green} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Nubosidad" value={s.nubes} min={0} max={100} step={5} unit=" %" color={MANIM.muted} onChange={(nubes) => setS((x) => ({ ...x, nubes }))} />
          <Slider label="Almacenamiento (baterías)" value={s.bat} min={0} max={400} step={20} unit=" MWh" color={MANIM.orange} onChange={(bat) => setS((x) => ({ ...x, bat }))} />
        </>
      }
    >
      <Svg w={520} h={225} maxH={235} testId="tool-red">
        <line x1={50} y1={190} x2={500} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={190} x2={50} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        {r.falta.map((f, h) => (f > 0 ? <rect key={h} x={X(h) - 8} y={Y(Math.min(150, r.dem[h]!))} width={16} height={Math.max(0, Y(Math.max(0, r.dem[h]! - f)) - Y(Math.min(150, r.dem[h]!)))} fill={MANIM.red} fillOpacity={0.35} /> : null))}
        <path d={linea(r.dem)} fill="none" stroke={MANIM.red} strokeWidth={3} />
        <path d={linea(r.gen)} fill="none" stroke={MANIM.green} strokeWidth={3} />
        {[0, 6, 12, 18, 23].map((h) => (
          <text key={h} x={X(h)} y={208} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
            {h} h
          </text>
        ))}
        <text x={56} y={30} fill={MANIM.muted} fontSize={11}>
          MW · rojo: demanda · verde: generación renovable
        </text>
      </Svg>
      <Readout>
        <Stat color={r.cobertura >= 95 ? MANIM.green : MANIM.orange} label="Demanda cubierta con renovables">
          {f0(r.cobertura)} %
        </Stat>
        <Stat color={MANIM.red} label="Energía que falta">
          {f0(r.deficit)} MWh
        </Stat>
        <Stat color={MANIM.yellow} label="Energía sobrante vertida">
          {f0(r.vertido)} MWh
        </Stat>
      </Readout>
      <Note>Modelo de un día: demanda con picos a las 8 y las 21 h, sol de 7 a 19 h con perfil sinusoidal y viento variable. La batería carga con los excedentes y descarga en el déficit (sin pérdidas). Lo que falta lo cubrirían otras fuentes o la red.</Note>
    </Frame>
  );
}

/* ───────────── 7.8 Análisis del ciclo de vida de una bombilla ───────────── */

const BOMBILLAS = [
  { n: "Incandescente", P: 60, vida: 1000, fab: 0.2 },
  { n: "Fluorescente compacta", P: 14, vida: 8000, fab: 0.8 },
  { n: "LED", P: 9, vida: 25000, fab: 1.5 },
];

export function acvBombilla(horas: number, mix: number) {
  return BOMBILLAS.map((b) => {
    const unidades = Math.ceil(horas / b.vida);
    const fab = unidades * b.fab;
    const uso = ((b.P * horas) / 1000) * (mix / 1000);
    return { n: b.n, unidades, fab, uso, total: fab + uso, kWh: (b.P * horas) / 1000 };
  });
}

export function AcvExplorador({ block }: { block: ToolBlock }) {
  const init = { h: Math.round(num(block.params?.a, 25000, 5000, 50000)), mix: Math.round(num(block.params?.b, 150, 0, 800)), inc: Math.round(num(block.params?.c, 20, 0, 50)) };
  const [s, setS] = useState(init);
  const r = acvBombilla(s.h, s.mix);
  const max = Math.max(...r.map((x) => x.total), 1e-9);
  const led = r[2]!;
  const inc = r[0]!;
  const clara = led.total * (1 + s.inc / 100) < inc.total * (1 - s.inc / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La unidad funcional es «dar luz durante N horas». Compara fabricación y uso. Después sube la incertidumbre: ¿sigue siendo clara la diferencia?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Unidad funcional: horas de luz" value={s.h} min={5000} max={50000} step={1000} unit=" h" format={f0} color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Mix eléctrico" value={s.mix} min={0} max={800} step={10} unit=" g CO₂/kWh" color={MANIM.orange} onChange={(mix) => setS((x) => ({ ...x, mix }))} />
          <Slider label="Incertidumbre de los datos" value={s.inc} min={0} max={50} step={5} unit=" %" color={MANIM.red} onChange={(inc2) => setS((x) => ({ ...x, inc: inc2 }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2" data-testid="acv-barras">
        {r.map((x) => (
          <div key={x.n} className="flex flex-col gap-0.5">
            <div className="flex h-5 w-full overflow-hidden rounded bg-white/10">
              <div className="anim-t h-full" style={{ width: `${(x.fab / max) * 100}%`, background: MANIM.purple }} title="Fabricación" />
              <div className="anim-t h-full" style={{ width: `${(x.uso / max) * 100}%`, background: MANIM.yellow }} title="Uso" />
            </div>
            <span className="text-sm text-[color:var(--stage-ink,#fff)]">
              <strong>{x.n}</strong> ({x.unidades} ud.): {f1(x.total)} kg CO₂e (fabricación {f1(x.fab)} + uso {f1(x.uso)}) · {f0(x.kWh)} kWh
            </span>
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.purple} label="Barra morada">
          Fabricación
        </Stat>
        <Stat color={MANIM.yellow} label="Barra amarilla">
          Uso (electricidad)
        </Stat>
        <Stat color={clara ? MANIM.green : MANIM.orange} label={`Con ±${s.inc} % de incertidumbre`}>
          {clara ? "La diferencia LED / incandescente es clara" : "La diferencia ya no es concluyente"}
        </Stat>
      </Readout>
      <Note>Cifras <strong>ilustrativas</strong>: potencias equivalentes a ≈ 800 lm, 1,5 kg CO₂e por LED fabricado, 0,2 por incandescente. En todas las bombillas domina la fase de uso, por eso importa el mix eléctrico. Los resultados de un ACV dependen de los límites que se fijen.</Note>
    </Frame>
  );
}

/* ───────────── 7.9 Grupos afectados por una decisión tecnológica ───────────── */

const GRUPOS = ["Trabajadores del almacén", "Clientes", "La empresa", "Comunidad local", "Medio ambiente"];
const MEDIDAS = [
  { n: "Automatizar el almacén con robots", v: [-2, 2, 3, -1, 0] },
  { n: "Reubicar y formar a la plantilla", v: [3, 0, -1, 1, 0] },
  { n: "Cámaras y seguimiento continuo de los empleados", v: [-3, 0, 1, 0, 0] },
  { n: "Alimentar el almacén con energía renovable", v: [0, 0, -1, 1, 3] },
  { n: "Entregas más rápidas con embalaje reducido", v: [-1, 2, 1, 0, 1] },
];

export function efectosGrupos(sel: boolean[]) {
  return GRUPOS.map((_, g) => MEDIDAS.reduce((a, m, i) => a + (sel[i] ? m.v[g]! : 0), 0));
}

export function GruposAfectadosExplorador({ block }: { block: ToolBlock }) {
  const init = [false, false, false, false, false];
  const [sel, setSel] = useState<boolean[]>(init);
  const ef = efectosGrupos(sel);
  const peor = Math.min(...ef);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige las medidas del proyecto y observa a quién benefician y a quién perjudican. Una buena decisión no solo suma: mira también quién sale peor parado y cómo compensarlo."}
      onReset={() => setSel(init)}
      controls={
        <div className="flex flex-col gap-2 sm:col-span-2">
          {MEDIDAS.map((m, i) => (
            <label key={m.n} className="flex items-center gap-2 text-sm text-[color:var(--stage-ink,#fff)]">
              <input type="checkbox" checked={sel[i]!} onChange={() => setSel((x) => x.map((y, j) => (j === i ? !y : y)))} />
              {m.n}
            </label>
          ))}
        </div>
      }
    >
      <p className="text-sm font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Proyecto: almacén logístico automatizado</p>
      <div className="flex flex-col gap-1.5" data-testid="grupos-efectos">
        {GRUPOS.map((g, i) => (
          <HBar key={g} label={g} value={Math.abs(ef[i]!)} max={8} color={ef[i]! >= 0 ? MANIM.green : MANIM.red} text={`${ef[i]! > 0 ? "+" : ""}${ef[i]}`} />
        ))}
      </div>
      <Readout>
        <Stat color={peor < 0 ? MANIM.red : MANIM.green} label="Grupo más perjudicado">
          {peor < 0 ? `${GRUPOS[ef.indexOf(peor)]} (${peor})` : "ninguno"}
        </Stat>
        <Stat color={MANIM.yellow} label="Suma de efectos">
          {ef.reduce((a, b) => a + b, 0)}
        </Stat>
      </Readout>
      <Note>Valoraciones <strong>subjetivas de ejemplo</strong> de −3 (muy negativo) a +3 (muy positivo). No hay una única respuesta: lo importante es justificar las prioridades y proponer medidas que compensen a los perjudicados.</Note>
    </Frame>
  );
}

