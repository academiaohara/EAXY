"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const DENSIDADES = [
  { n: "Corcho", rho: 0.24 },
  { n: "Pino", rho: 0.5 },
  { n: "PLA", rho: 1.24 },
  { n: "Aluminio", rho: 2.7 },
  { n: "Acero", rho: 7.85 },
  { n: "Cobre", rho: 8.96 },
] as const;

/** Masa (g) de un volumen en cm³ con densidad en g/cm³. */
export const masaGr = (rho: number, volCm3: number) => rho * volCm3;
export const flota = (rho: number) => rho < 1;

/** Valores orientativos: módulo elástico E (MPa), límite elástico, resistencia máxima (MPa) y deformación de rotura. */
export const MAT_TRACCION = [
  { n: "Acero", E: 200000, sy: 235, su: 360, eu: 0.2 },
  { n: "Aluminio", E: 70000, sy: 100, su: 150, eu: 0.12 },
  { n: "PLA", E: 3500, sy: 50, su: 55, eu: 0.04 },
  { n: "Pino (a lo largo)", E: 10000, sy: 40, su: 50, eu: 0.01 },
] as const;

/** Tensión (MPa) y zona del ensayo de tracción para una deformación unitaria `eps`. */
export function sigma(m: number, eps: number): { s: number; zona: "elástica" | "plástica" | "rotura" } {
  const M = MAT_TRACCION[m]!;
  const ey = M.sy / M.E;
  if (eps >= M.eu) return { s: 0, zona: "rotura" };
  if (eps <= ey) return { s: M.E * eps, zona: "elástica" };
  return { s: M.sy + ((M.su - M.sy) * (eps - ey)) / (M.eu - ey), zona: "plástica" };
}

/** Piezas rectangulares de `w` × `h` que caben en un tablero `W` × `H` (se descuenta un corte de `kerf` mm). */
export function piezasPorTablero(W: number, H: number, w: number, h: number, kerf = 3) {
  const nx = Math.floor((W + kerf) / (w + kerf));
  const ny = Math.floor((H + kerf) / (h + kerf));
  return { nx, ny, total: nx * ny };
}

export const CRITERIOS = ["Resistencia", "Bajo coste", "Ligereza", "Sostenibilidad", "Facilidad de trabajo"] as const;
export const MATERIALES_MATRIZ: { n: string; s: readonly number[] }[] = [
  { n: "Pino", s: [3, 5, 4, 4, 5] },
  { n: "Aluminio", s: [4, 3, 5, 3, 3] },
  { n: "Acero", s: [5, 4, 1, 3, 2] },
  { n: "PLA (impresión 3D)", s: [2, 4, 5, 4, 4] },
  { n: "Metacrilato", s: [3, 3, 4, 2, 3] },
];

/** Puntuación ponderada (0–5) de un material con los pesos dados. */
export function puntuacion(pesos: readonly number[], s: readonly number[]) {
  const t = pesos.reduce((a, b) => a + b, 0);
  return t > 0 ? pesos.reduce((a, p, i) => a + p * s[i]!, 0) / t : 0;
}

export type MaterialTaller = "madera" | "metal" | "plastico";
export type Operacion = "cortar" | "unir" | "acabar";
const TECNICAS: Record<MaterialTaller, Record<Operacion, string>> = {
  madera: {
    cortar: "Serrucho, sierra de calar o sierra de mesa. Se marca con lápiz y se sujeta con tornillo de banco o sargentos.",
    unir: "Cola blanca con sargentos, tornillos para madera, clavos o escuadras metálicas.",
    acabar: "Lijado (de grano grueso a fino), después barniz, lasur o pintura.",
  },
  metal: {
    cortar: "Sierra de arco, cizalla (chapa fina) o amoladora con protección. La pieza se sujeta siempre al tornillo de banco.",
    unir: "Tornillos y remaches; la soldadura solo en el taller y con supervisión.",
    acabar: "Limado de rebabas, pulido y pintura antioxidante o galvanizado.",
  },
  plastico: {
    cortar: "Sierra de calar de diente fino a baja velocidad (para no fundirlo) o cúter en láminas finas.",
    unir: "Adhesivo específico, tornillos o termofusión con un soldador de plástico.",
    acabar: "Lijado fino al agua, pulido y pintura para plásticos.",
  },
};
const SEGURIDAD: Record<MaterialTaller, string> = {
  madera: "Gafas de protección y mascarilla: el serrín es irritante.",
  metal: "Gafas, guantes contra las rebabas y pieza bien sujeta; pelo recogido en máquinas.",
  plastico: "Buena ventilación (los humos al fundir o pegar son nocivos) y gafas.",
};
export const recomienda = (m: MaterialTaller, o: Operacion) => ({ tecnica: TECNICAS[m][o], seguridad: SEGURIDAD[m] });

/** Lectura de un pie de rey con nonio de 10 divisiones (precisión 0,1 mm). */
export function lecturaCalibre(mm: number) {
  let ent = Math.floor(mm);
  let dec = Math.round((mm - ent) * 10);
  if (dec === 10) {
    ent += 1;
    dec = 0;
  }
  return { ent, dec, lectura: ent + dec / 10 };
}

/** Estimación de una pieza cúbica impresa en 3D: plástico, masa y tiempo. */
export function impresion(L: number, capa: number, relleno: number, pared = 1.2) {
  const interior = Math.max(0, L - 2 * pared) ** 3;
  const vol = L ** 3 - interior + (relleno / 100) * interior;
  const flujo = 10 * (capa / 0.2);
  const horas = vol / flujo / 3600;
  return { volMm3: vol, masaG: (vol / 1000) * 1.24, horas };
}

/* ───────────── 1. Densidad ───────────── */

export function DensidadMaterialesExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 4, 0, DENSIDADES.length - 1)), l: Math.round(num(block.params?.a, 5, 1, 20)), a: 5, h: 5 };
  const [s, setS] = useState(init);
  const D = DENSIDADES[s.m]!;
  const vol = s.l * s.a * s.h;
  const masa = masaGr(D.rho, vol);
  const sum = flota(D.rho) ? D.rho : 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un material y las dimensiones de un bloque. Compara su masa con la de otros materiales del mismo tamaño y mira cuáles flotan."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={DENSIDADES.map((d, value) => ({ value, label: d.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Largo" value={s.l} min={1} max={20} step={1} unit=" cm" color={MANIM.blue} onChange={(l) => setS((x) => ({ ...x, l }))} />
          <Slider label="Ancho" value={s.a} min={1} max={20} step={1} unit=" cm" color={MANIM.purple} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Alto" value={s.h} min={1} max={20} step={1} unit=" cm" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="densidad" maxH={140}>
        <rect x={60} y={50} width={400} height={70} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={2} />
        <text x={64} y={44} fill={MANIM.blue} fontSize={12}>
          agua (1 g/cm³)
        </text>
        <rect x={230} y={flota(D.rho) ? 50 - 38 + 38 * (1 - sum) : 70} width={60} height={38} rx={4} fill={flota(D.rho) ? MANIM.green : MANIM.red} fillOpacity={0.55} stroke={flota(D.rho) ? MANIM.green : MANIM.red} strokeWidth={3} />
        <text x={260} y={flota(D.rho) ? 38 : 126} fill={MANIM.ink} fontSize={13} textAnchor="middle">
          {flota(D.rho) ? "flota" : "se hunde"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Volumen = L · A · H">{fmtEs(vol, 0)} cm³</Stat>
        <Stat color={MANIM.orange} label={`Densidad del ${D.n.toLowerCase()}`}>{f2(D.rho)} g/cm³</Stat>
        <Stat color={MANIM.green} label="Masa = densidad · volumen">{masa >= 1000 ? `${f2(masa / 1000)} kg` : `${f1(masa)} g`}</Stat>
      </Readout>
      <Note>La densidad es la masa que tiene cada cm³ de un material. Con el mismo volumen, un material más denso pesa más. Si es menor que la del agua (1 g/cm³), el objeto flota.</Note>
    </Frame>
  );
}

/* ───────────── 2. Curva del ensayo de tracción ───────────── */

export function CurvaTraccionExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, MAT_TRACCION.length - 1)), e: Math.round(num(block.params?.a, 3, 0, 100)) };
  const [s, setS] = useState(init);
  const M = MAT_TRACCION[s.m]!;
  const eps = (s.e / 100) * M.eu * 1.15;
  const r = sigma(s.m, eps);
  const X = (e: number) => 50 + (e / (M.eu * 1.15)) * 420;
  const Y = (v: number) => 190 - (v / (M.su * 1.15)) * 160;
  const pts: string[] = [];
  for (let i = 0; i <= 120; i += 1) {
    const e = (i / 120) * M.eu * 0.9999;
    pts.push(`${X(e)},${Y(sigma(s.m, e).s)}`);
  }
  const color = r.zona === "elástica" ? MANIM.green : r.zona === "plástica" ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Estira la probeta (deformación): primero recupera su forma (zona elástica), luego se deforma para siempre (plástica) y al final se rompe."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MAT_TRACCION.map((m, value) => ({ value, label: m.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Estirado de la probeta" value={s.e} min={0} max={100} step={1} unit=" %" color={MANIM.orange} onChange={(e) => setS((x) => ({ ...x, e }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="curva-traccion" maxH={230}>
        <line x1={50} y1={190} x2={490} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={20} x2={50} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        <text x={490} y={208} fill={MANIM.muted} fontSize={12} textAnchor="end">
          deformación ε
        </text>
        <text x={56} y={26} fill={MANIM.muted} fontSize={12}>
          tensión σ
        </text>
        <polyline points={pts.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <line x1={50} y1={Y(M.sy)} x2={X(M.sy / M.E)} y2={Y(M.sy)} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="4 4" />
        <line x1={50} y1={Y(M.su)} x2={X(M.eu)} y2={Y(M.su)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
        <circle cx={X(Math.min(eps, M.eu))} cy={Y(r.s)} r={7} fill={color} />
        {r.zona === "rotura" ? (
          <text x={X(M.eu) - 10} y={Y(0) - 10} fill={MANIM.red} fontSize={14} textAnchor="end" fontWeight={700}>
            ¡rotura!
          </text>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={color} label="Zona">{r.zona}</Stat>
        <Stat color={MANIM.blue} label="Tensión">{fmtEs(r.s, 0)} MPa</Stat>
        <Stat color={MANIM.green} label="Límite elástico (orient.)">{M.sy} MPa</Stat>
        <Stat color={MANIM.yellow} label="Resistencia máxima (orient.)">{M.su} MPa</Stat>
      </Readout>
      <Note>{r.zona === "elástica" ? "Zona elástica: si se suelta, la probeta recupera su longitud (como un muelle). La pendiente de la recta mide la rigidez del material." : r.zona === "plástica" ? "Zona plástica: se ha superado el límite elástico y la deformación es permanente. Los materiales dúctiles (acero, aluminio) se estiran mucho antes de romper." : "La probeta se ha roto. Los materiales frágiles (como la madera a lo largo o el vidrio) rompen con muy poca deformación, casi sin avisar."}</Note>
    </Frame>
  );
}

/* ───────────── 3. Despiece de un tablero ───────────── */

export function DespieceTableroExplorador({ block }: { block: ToolBlock }) {
  const init = { w: Math.round(num(block.params?.a, 400, 100, 1200)), h: Math.round(num(block.params?.b, 300, 100, 1200)), rot: 0 };
  const [s, setS] = useState(init);
  const W = 2440;
  const H = 1220;
  const a = piezasPorTablero(W, H, s.w, s.h);
  const b = piezasPorTablero(W, H, s.h, s.w);
  const rotar = s.rot === 1 && b.total > a.total;
  const r = rotar ? b : a;
  const pw = rotar ? s.h : s.w;
  const ph = rotar ? s.w : s.h;
  const k = 440 / W;
  const aprov = (r.total * s.w * s.h) / (W * H);
  const cells: [number, number][] = [];
  for (let i = 0; i < r.nx; i += 1) for (let j = 0; j < r.ny; j += 1) cells.push([i, j]);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el tamaño de la pieza y comprueba cuántas salen de un tablero de 2 440 × 1 220 mm. Girarla puede aprovechar mejor el material."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ancho de la pieza" value={s.w} min={100} max={1200} step={10} unit=" mm" color={MANIM.blue} onChange={(w) => setS((x) => ({ ...x, w }))} />
          <Slider label="Alto de la pieza" value={s.h} min={100} max={1200} step={10} unit=" mm" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Choice label="Colocación" items={[{ value: 0, label: "Sin girar" }, { value: 1, label: "Probar girada" }]} value={s.rot} onChange={(rot) => setS((x) => ({ ...x, rot }))} />
        </>
      }
    >
      <Svg w={520} h={262} testId="despiece" maxH={270}>
        <rect x={40} y={20} width={W * k} height={H * k} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2} />
        {cells.map(([i, j]) => (
          <rect key={`${i}-${j}`} x={40 + i * (pw + 3) * k} y={20 + j * (ph + 3) * k} width={pw * k} height={ph * k} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={1} />
        ))}
        <text x={40} y={252} fill={MANIM.muted} fontSize={12}>
          tablero 2 440 × 1 220 mm {rotar ? "· piezas giradas" : ""}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Piezas por tablero">{r.total}</Stat>
        <Stat color={MANIM.blue} label="Aprovechamiento">{f1(aprov * 100)} %</Stat>
        <Stat color={MANIM.orange} label="Desperdicio">{f1((1 - aprov) * 100)} %</Stat>
      </Readout>
      <Note>Un buen despiece reduce el desperdicio y el coste. Se deja un pequeño margen (3 mm) para el corte de la sierra. Girar la pieza 90° a veces permite que quepan más.</Note>
    </Frame>
  );
}

/* ───────────── 4. Matriz de decisión ponderada ───────────── */

export function MatrizDecisionMaterialesExplorador({ block }: { block: ToolBlock }) {
  const preset = Math.round(num(block.params?.n, 0, 0, 2));
  const PRESETS = [[3, 3, 3, 3, 3], [5, 2, 1, 1, 2], [1, 5, 2, 3, 4]];
  const init = { p: PRESETS[preset]! };
  const [s, setS] = useState(init);
  const orden = MATERIALES_MATRIZ.map((m) => ({ n: m.n, v: puntuacion(s.p, m.s) })).sort((a, b) => b.v - a.v);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Da más peso a los criterios que importan en tu proyecto. El mejor material cambia con tus prioridades. Las notas son orientativas."}
      onReset={() => setS(init)}
      controls={
        <>
          {CRITERIOS.map((c, i) => (
            <Slider key={c} label={`Importancia: ${c}`} value={s.p[i]!} min={0} max={5} step={1} color={MANIM.blue} onChange={(v) => setS((x) => ({ p: x.p.map((o, k) => (k === i ? v : o)) }))} />
          ))}
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Prioridades típicas">
            <button type="button" className={TOOL_BTN} onClick={() => setS({ p: PRESETS[0]! })}>
              Todo igual
            </button>
            <button type="button" className={TOOL_BTN} onClick={() => setS({ p: PRESETS[1]! })}>
              Prima la resistencia
            </button>
            <button type="button" className={TOOL_BTN} onClick={() => setS({ p: PRESETS[2]! })}>
              Prima el bajo coste
            </button>
          </div>
        </>
      }
    >
      <Svg w={520} h={160} testId="matriz-decision" maxH={170}>
        {orden.map((m, i) => (
          <g key={m.n}>
            <text x={10} y={24 + i * 30} fill={MANIM.ink} fontSize={13}>
              {m.n}
            </text>
            <rect x={160} y={10 + i * 30} width={Math.max(2, (m.v / 5) * 300)} height={20} rx={3} fill={i === 0 ? MANIM.green : MANIM.blue} fillOpacity={0.6} />
            <text x={166 + (m.v / 5) * 300} y={25 + i * 30} fill={MANIM.yellow} fontSize={13}>
              {f2(m.v)}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Mejor opción con tus prioridades">{orden[0]!.n}</Stat>
        <Stat color={MANIM.yellow} label="Puntuación (0–5)">{f2(orden[0]!.v)}</Stat>
      </Readout>
      <Note>La matriz de decisión puntúa cada material en cada criterio (de 1 a 5) y los pondera por su importancia. No da «la verdad», pero obliga a justificar la elección con datos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Técnicas de corte, unión y acabado ───────────── */

export function TecnicaTallerExplorador({ block }: { block: ToolBlock }) {
  const MATS: MaterialTaller[] = ["madera", "metal", "plastico"];
  const OPS: Operacion[] = ["cortar", "unir", "acabar"];
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), o: Math.round(num(block.params?.a, 0, 0, 2)) };
  const [s, setS] = useState(init);
  const r = recomienda(MATS[s.m]!, OPS[s.o]!);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el material y la operación: te mostramos la técnica habitual y la protección que se necesita."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={[{ value: 0, label: "Madera" }, { value: 1, label: "Metal" }, { value: 2, label: "Plástico" }]} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Choice label="Operación" items={[{ value: 0, label: "Cortar" }, { value: 1, label: "Unir" }, { value: 2, label: "Acabar" }]} value={s.o} onChange={(o) => setS((x) => ({ ...x, o }))} />
        </>
      }
    >
      <div className="grid gap-3 sm:grid-cols-2" data-testid="tecnica-taller">
        <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
          <div className="mb-1 text-xs uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Técnica y herramientas</div>
          <span style={{ color: MANIM.green }}>{r.tecnica}</span>
        </div>
        <div className="rounded-lg border border-white/10 bg-black/20 p-3 text-sm">
          <div className="mb-1 text-xs uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Seguridad</div>
          <span style={{ color: MANIM.yellow }}>{r.seguridad}</span>
        </div>
      </div>
      <Note>Antes de cortar, unir o acabar: pieza sujeta, herramienta adecuada, zona despejada y protección personal. Las máquinas solo se usan con permiso y supervisión.</Note>
    </Frame>
  );
}

/* ───────────── 6. Pie de rey ───────────── */

export function CalibreExplorador({ block }: { block: ToolBlock }) {
  const init = { mm: Math.round(num(block.params?.a, 23.4, 0, 90) * 10) / 10 };
  const [s, setS] = useState(init);
  const r = lecturaCalibre(s.mm);
  const k = 36;
  const x0 = r.ent - 2;
  const X = (v: number) => 40 + (v - x0) * k;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Lee primero los milímetros enteros en la regla fija (hasta el cero del nonio) y luego la división del nonio que coincide con una marca de la regla."}
      onReset={() => setS(init)}
      controls={<Slider label="Apertura de las mordazas" value={s.mm} min={0} max={90} step={0.1} unit=" mm" color={MANIM.blue} onChange={(mm) => setS({ mm })} format={(v) => fmtEs(v, 1)} />}
    >
      <Svg w={520} h={150} testId="calibre" maxH={160}>
        <rect x={20} y={20} width={480} height={36} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2} />
        {Array.from({ length: 12 }, (_, i) => x0 + i).map((v) => (
          <g key={v}>
            <line x1={X(v)} y1={56} x2={X(v)} y2={v % 5 === 0 ? 34 : 42} stroke={MANIM.ink} strokeWidth={1.5} />
            <text x={X(v)} y={30} fill={MANIM.muted} fontSize={10} textAnchor="middle">
              {v}
            </text>
          </g>
        ))}
        <rect x={X(s.mm)} y={58} width={9.4 * k} height={38} fill={MANIM.blue} fillOpacity={0.2} stroke={MANIM.blue} strokeWidth={2} />
        {Array.from({ length: 11 }, (_, kx) => kx).map((kx) => (
          <g key={kx}>
            <line x1={X(s.mm + 0.9 * kx)} y1={58} x2={X(s.mm + 0.9 * kx)} y2={kx === r.dec ? 82 : 72} stroke={kx === r.dec ? MANIM.yellow : MANIM.ink} strokeWidth={kx === r.dec ? 3 : 1.5} />
            <text x={X(s.mm + 0.9 * kx)} y={94} fill={kx === r.dec ? MANIM.yellow : MANIM.muted} fontSize={10} textAnchor="middle">
              {kx}
            </text>
          </g>
        ))}
        <line x1={X(s.mm)} y1={14} x2={X(s.mm)} y2={104} stroke={MANIM.orange} strokeWidth={1.5} strokeDasharray="3 3" />
        <text x={260} y={130} fill={MANIM.ink} fontSize={13} textAnchor="middle">
          cero del nonio ≈ {fmtEs(s.mm, 1)} mm
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Milímetros enteros (regla)">{r.ent}</Stat>
        <Stat color={MANIM.yellow} label="División del nonio que coincide">{r.dec}</Stat>
        <Stat color={MANIM.green} label="Lectura">{fmtEs(r.lectura, 1)} mm</Stat>
      </Readout>
      <Note>Lectura = milímetros enteros (donde queda el cero del nonio) + décimas de la división del nonio que coincide con una marca de la regla. Este calibre aprecia 0,1 mm; los de nonio de 20 o 50 divisiones llegan a 0,05 o 0,02 mm.</Note>
    </Frame>
  );
}

/* ───────────── 7. Impresión 3D ───────────── */

export function Impresion3dEsoExplorador({ block }: { block: ToolBlock }) {
  const init = { L: Math.round(num(block.params?.a, 40, 10, 100)), capa: Math.round(num(block.params?.b, 20, 10, 30)), rel: 20 };
  const [s, setS] = useState(init);
  const r = impresion(s.L, s.capa / 100, s.rel);
  const horas = r.horas;
  const nCapas = Math.min(25, Math.max(4, Math.round(s.L / (s.capa / 100) / 8)));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el tamaño, la altura de capa y el relleno y observa el tiempo y el plástico. Son estimaciones sencillas; cada impresora real varía."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lado del cubo" value={s.L} min={10} max={100} step={5} unit=" mm" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Altura de capa" value={s.capa} min={10} max={30} step={5} unit=" mm" color={MANIM.orange} format={(v) => fmtEs(v / 100, 2)} onChange={(capa) => setS((x) => ({ ...x, capa }))} />
          <Slider label="Relleno interior" value={s.rel} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(rel) => setS((x) => ({ ...x, rel }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="impresion3d" maxH={160}>
        {Array.from({ length: nCapas }, (_, i) => (
          <rect key={i} x={210} y={130 - (i + 1) * (100 / nCapas)} width={100} height={100 / nCapas - 1} fill={MANIM.green} fillOpacity={0.3 + 0.3 * (s.rel / 100)} stroke={MANIM.green} strokeWidth={0.8} />
        ))}
        <text x={330} y={70} fill={MANIM.muted} fontSize={12}>
          capas de {fmtEs(s.capa / 100, 2)} mm
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Plástico usado">{f1(r.masaG)} g</Stat>
        <Stat color={MANIM.orange} label="Tiempo estimado">{horas < 1 ? `${fmtEs(horas * 60, 0)} min` : `${f1(horas)} h`}</Stat>
        <Stat color={MANIM.green} label="Número de capas">{fmtEs(s.L / (s.capa / 100), 0)}</Stat>
      </Readout>
      <Note>Capas más gruesas imprimen más rápido pero con peor acabado; más relleno da una pieza más resistente pero gasta más plástico y tiempo. La pared exterior (1,2 mm aprox.) aporta gran parte de la resistencia.</Note>
    </Frame>
  );
}
