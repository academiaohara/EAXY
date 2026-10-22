"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/* ───────────── Resistencia específica (tabla 3.1) ───────────── */

export const METALES_3_1 = [
  { sym: "Al", name: "Aluminio", rho: 2.7, sigma: 118, esp: 43.7, cond: 37.7 },
  { sym: "Cu", name: "Cobre", rho: 8.93, sigma: 213, esp: 23.9, cond: 59.8 },
  { sym: "Pb", name: "Plomo", rho: 11.36, sigma: 14, esp: 1.2, cond: 4.8 },
  { sym: "Mg", name: "Magnesio", rho: 1.74, sigma: 78, esp: 44.8, cond: 31.6 },
  { sym: "Ni", name: "Níquel", rho: 8.9, sigma: 256, esp: 28.8, cond: 14.6 },
  { sym: "Ti", name: "Titanio", rho: 4.51, sigma: 227, esp: 50.3, cond: 1.25 },
  { sym: "W", name: "Wolframio", rho: 19.25, sigma: 213, esp: 11.1, cond: 18.2 },
  { sym: "Zn", name: "Cinc", rho: 7.13, sigma: 107, esp: 15.0, cond: 17 },
  { sym: "Fe", name: "Hierro", rho: 7.87, sigma: 284, esp: 36.1, cond: 10 },
] as const;

const PROPS = {
  sigma: { label: "Tensión de rotura (MPa)", color: MANIM.red, get: (m: (typeof METALES_3_1)[number]) => m.sigma },
  rho: { label: "Densidad (kg/dm³)", color: MANIM.blue, get: (m: (typeof METALES_3_1)[number]) => m.rho },
  esp: { label: "Resistencia específica", color: MANIM.green, get: (m: (typeof METALES_3_1)[number]) => m.esp },
  cond: { label: "Conductividad (10⁶/Ω·m)", color: MANIM.yellow, get: (m: (typeof METALES_3_1)[number]) => m.cond },
} as const;
type PropKey = keyof typeof PROPS;

export function ResistenciaEspecifica({ block }: { block: ToolBlock }) {
  const init = { prop: "esp" as PropKey, divide: false, sel: Math.round(num(block.params?.a, 3, 0, METALES_3_1.length - 1)) };
  const [s, setS] = useState(init);
  const P = PROPS[s.prop];
  const fe = METALES_3_1.find((m) => m.sym === "Fe")!;
  const value = (m: (typeof METALES_3_1)[number]) => (s.divide ? P.get(m) / P.get(fe) : P.get(m));
  const max = Math.max(...METALES_3_1.map(value));
  const picked = METALES_3_1[s.sel]!;
  const calc = picked.sigma / picked.rho;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la propiedad y pasa a «Dividir entre el hierro». ¿Qué metal conviene si lo que importa es el peso?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Propiedad" value={s.prop} onChange={(prop) => setS((p) => ({ ...p, prop }))} items={(Object.keys(PROPS) as PropKey[]).map((k) => ({ value: k, label: PROPS[k].label }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            <button type="button" className={TOOL_BTN} aria-pressed={s.divide} onClick={() => setS((p) => ({ ...p, divide: !p.divide }))}>
              Dividir entre el hierro
            </button>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-1.5" data-testid="tool-barras-metales">
        {[...METALES_3_1]
          .sort((a, b) => value(b) - value(a))
          .map((m) => (
            <button
              key={m.sym}
              type="button"
              onClick={() => setS((p) => ({ ...p, sel: METALES_3_1.indexOf(m) }))}
              className="flex items-center gap-3 text-left"
              aria-label={`${m.name}: ${fmtEs(value(m), 2)}`}
            >
              <span className="w-8 text-sm font-bold" style={{ color: m === picked ? MANIM.yellow : MANIM.ink }}>
                {m.sym}
              </span>
              <span className="relative h-5 flex-1 rounded-sm bg-white/5">
                <span
                  className="anim-t absolute inset-y-0 left-0 rounded-sm"
                  style={{ width: `${(value(m) / max) * 100}%`, background: P.color, opacity: m === picked ? 1 : 0.6 }}
                />
              </span>
              <span className="w-16 text-right text-sm tabular-nums text-[color:var(--stage-ink,#fff)]">{fmtEs(value(m), s.divide ? 2 : 1)}</span>
            </button>
          ))}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label={`${picked.name}: resistencia específica`}>
          {fmtEs(picked.sigma, 0)} / {fmtEs(picked.rho, 2)} = {fmtEs(calc, 1)}
        </Stat>
        <Stat color={MANIM.green} label="Frente al hierro">
          × {fmtEs(calc / (fe.sigma / fe.rho), 2)}
        </Stat>
      </Readout>
      <Note>Pulsa un metal para ver su cociente tensión/densidad. La resistencia específica es la tensión de rotura dividida entre la densidad.</Note>
    </Frame>
  );
}

/* ───────────── Pieza de peso mínimo ───────────── */

const CANDIDATOS = [
  { name: "Latón", sigma: 345, rho: 8.5, color: MANIM.yellow },
  { name: "Acero", sigma: 690, rho: 7.9, color: MANIM.blue },
  { name: "Aluminio", sigma: 275, rho: 2.7, color: MANIM.green },
] as const;

export function PiezaPesoMinimo({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.a, 50, 10, 100)), l: Math.round(num(block.params?.b, 300, 100, 600) / 50) * 50 };
  const [s, setS] = useState(init);
  const rows = CANDIDATOS.map((m) => {
    const area = (s.f * 1000) / m.sigma;
    const mass = (m.rho * area * s.l) / 1000;
    return { ...m, area, mass };
  });
  const best = rows.reduce((a, b) => (b.mass < a.mass ? b : a));
  const maxMass = Math.max(...rows.map((r) => r.mass));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la carga y la longitud. El material más resistente no es el que da la pieza más ligera: mira la masa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Carga a soportar" value={s.f} min={10} max={100} step={5} unit=" kN" color={MANIM.red} onChange={(f) => setS((p) => ({ ...p, f }))} />
          <Slider label="Longitud de la pieza" value={s.l} min={100} max={600} step={50} unit=" mm" color={MANIM.blue} onChange={(l) => setS((p) => ({ ...p, l }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2" data-testid="tool-peso-minimo">
        {rows.map((r) => (
          <div key={r.name} className="flex items-center gap-3">
            <span className="w-20 text-sm font-bold" style={{ color: r === best ? MANIM.yellow : MANIM.ink }}>
              {r.name}
            </span>
            <span className="relative h-6 flex-1 rounded-sm bg-white/5">
              <span className="anim-t absolute inset-y-0 left-0 rounded-sm" style={{ width: `${(r.mass / maxMass) * 100}%`, background: r.color, opacity: r === best ? 1 : 0.55 }} />
            </span>
            <span className="w-28 text-right text-sm tabular-nums text-[color:var(--stage-ink,#fff)]">{fmtEs(r.mass, 0)} g</span>
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Pieza más ligera">
          {best.name} · {fmtEs(best.mass, 0)} g
        </Stat>
        <Stat color={MANIM.muted} label="Sección necesaria">
          {fmtEs(best.area, 0)} mm²
        </Stat>
      </Readout>
      <MathRenderer text={`$A = \\dfrac{F}{\\sigma_e} \\;\\Rightarrow\\; m = \\rho\\, A\\, L$`} className="text-xl" />
      <Note>Límite elástico (MPa) y densidad (g/cm³): latón 345 y 8,5; acero 690 y 7,9; aluminio 275 y 2,7.</Note>
    </Frame>
  );
}

/* ───────────── Filtro de aleaciones ligeras ───────────── */

type Aleacion = { base: "Al" | "Mg" | "Ti"; comp: string; sigma: number; uso: string };
const ALEACIONES: Aleacion[] = [
  { base: "Al", comp: ">99 % Al", sigma: 18, uso: "componentes eléctricos, forja" },
  { base: "Al", comp: "1,2 % Mn-1 % Mg", sigma: 37, uso: "cuerpo de latas, arquitectura" },
  { base: "Al", comp: "4,5 % Mg", sigma: 60, uso: "tapas de latas, componentes marinos" },
  { base: "Al", comp: "4,4 % Cu", sigma: 97, uso: "ruedas" },
  { base: "Al", comp: "2,4 % Li-2,7 % Cu", sigma: 114, uso: "carrocería, aviación" },
  { base: "Al", comp: "5,6 % Zn-2,5 % Mg", sigma: 118, uso: "chasis, aviación" },
  { base: "Mg", comp: "3 % Al-0,2 % Mn-1 % Zn", sigma: 220, uso: "láminas y placas" },
  { base: "Mg", comp: "8,5 % Al-0,15 % Mn-0,5 % Zn", sigma: 296, uso: "elementos extruidos" },
  { base: "Mg", comp: "9 % Al-0,15 % Mn-0,7 % Zn", sigma: 324, uso: "material deportivo, automóvil" },
  { base: "Ti", comp: "Ti puro 99 %", sigma: 662, uso: "intercambiadores de calor" },
  { base: "Ti", comp: "5 % Al-2,5 % Sn", sigma: 862, uso: "equipos químicos, prótesis" },
  { base: "Ti", comp: "6 % Al-4 % V", sigma: 1172, uso: "álabes de turbinas de avión" },
  { base: "Ti", comp: "10 % V-11 % Cr-3 % Al", sigma: 1276, uso: "estructuras de aviación" },
  { base: "Ti", comp: "85 % Ti-6 % V-4 % Cr-4 % Zr", sigma: 1448, uso: "resortes, piezas de aviación" },
];
const DENS = { Al: 2.7, Mg: 1.74, Ti: 4.5 } as const;
const BASE_COLOR = { Al: MANIM.blue, Mg: MANIM.green, Ti: MANIM.orange } as const;

export function AleacionesFiltro({ block }: { block: ToolBlock }) {
  const init = { minSigma: Math.round(num(block.params?.a, 200, 0, 1500) / 50) * 50, maxRho: num(block.params?.b, 5, 1.5, 5) };
  const [s, setS] = useState(init);
  const ok = ALEACIONES.filter((a) => a.sigma >= s.minSigma && DENS[a.base] <= s.maxRho + 1e-9);
  const best = ok.reduce<Aleacion | null>((acc, a) => (!acc || a.sigma / DENS[a.base] > acc.sigma / DENS[acc.base] ? a : acc), null);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Exige una resistencia mínima y limita la densidad (Al 2,7; Mg 1,74; Ti 4,5 g/cm³). ¿Qué familia sobrevive en cada caso?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Resistencia a la tracción mínima" value={s.minSigma} min={0} max={1500} step={50} unit=" MPa" color={MANIM.red} onChange={(minSigma) => setS((p) => ({ ...p, minSigma }))} />
          <Slider label="Densidad máxima" value={s.maxRho} min={1.5} max={5} step={0.1} format={(v) => fmtEs(v, 1)} unit=" g/cm³" color={MANIM.blue} onChange={(maxRho) => setS((p) => ({ ...p, maxRho }))} />
        </>
      }
    >
      <ul className="grid gap-1.5 sm:grid-cols-2" data-testid="tool-aleaciones">
        {ALEACIONES.map((a) => {
          const pass = ok.includes(a);
          return (
            <li
              key={a.base + a.comp}
              className="anim-t flex items-baseline justify-between gap-2 rounded-md border px-2.5 py-1.5 text-sm"
              style={{ borderColor: pass ? BASE_COLOR[a.base] : "transparent", opacity: pass ? 1 : 0.28, background: pass ? "rgba(255,255,255,0.05)" : "transparent" }}
            >
              <span className="text-[color:var(--stage-ink,#fff)]">
                <b style={{ color: BASE_COLOR[a.base] }}>{a.base}</b> {a.comp}
              </span>
              <span className="tabular-nums text-[color:var(--stage-muted,#b8c2d0)]">{fmtEs(a.sigma, 0)} MPa</span>
            </li>
          );
        })}
      </ul>
      <Readout>
        <Stat color={MANIM.yellow} label="Aleaciones que cumplen">
          {ok.length} de {ALEACIONES.length}
        </Stat>
        {best ? (
          <Stat color={MANIM.green} label="Mayor resistencia específica">
            {best.base} {best.comp}: {fmtEs((best.sigma / DENS[best.base]) * 1, 0)} MPa·cm³/g
          </Stat>
        ) : (
          <span className="text-base text-[color:var(--stage-ink,#fff)]">Ninguna aleación de la tabla cumple los dos requisitos a la vez.</span>
        )}
      </Readout>
    </Frame>
  );
}

/* ───────────── Defecto de Griffith ───────────── */

export function GrietaGriffith({ block }: { block: ToolBlock }) {
  const init = { a: num(block.params?.a, 2, 0.1, 5), exp: Math.round(num(block.params?.b, 4, 1, 7)), sigma: 70 };
  const [s, setS] = useState(init);
  const r = 10 ** -s.exp;
  const k = 2 * Math.sqrt(s.a / r);
  const smax = k * s.sigma;
  const TEORICA = 8500;
  const breaks = smax >= TEORICA;
  const w = 220;
  const notchDepth = Math.min(90, 20 + s.a * 14);
  const sharp = Math.min(1, s.exp / 7);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Afila la grieta (radio menor) o hazla más profunda: ¿a qué tensión aplicada se rompe el material?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Profundidad de la grieta, a" value={s.a} min={0.1} max={5} step={0.1} format={(v) => fmtEs(v, 1)} unit=" mm" color={MANIM.blue} onChange={(a) => setS((p) => ({ ...p, a }))} />
          <Slider label="Radio del vértice, r = 10⁻ⁿ mm: n" value={s.exp} min={1} max={7} color={MANIM.orange} onChange={(exp) => setS((p) => ({ ...p, exp }))} />
          <Slider label="Tensión aplicada, σ" value={s.sigma} min={10} max={300} step={5} unit=" kp/mm²" color={MANIM.red} onChange={(sigma) => setS((p) => ({ ...p, sigma }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Factor de amplificación">
          2·√(a/r) = {fmtEs(k, 0)}
        </Stat>
        <Stat color={breaks ? MANIM.red : MANIM.green} label="Tensión en el vértice">
          σmáx = {fmtEs(smax, 0)} kp/mm² {breaks ? "≥" : "<"} {fmtEs(TEORICA, 0)}
        </Stat>
      </Readout>
      <svg viewBox={`0 0 ${w * 2} 170`} className="mx-auto block h-auto w-full max-w-xl" aria-hidden focusable="false" data-testid="tool-griffith">
        <rect x={w / 2 + 40} y={20} width={w} height={130} fill={breaks ? MANIM.red : MANIM.blue} fillOpacity={0.22} stroke={breaks ? MANIM.red : MANIM.blue} strokeWidth={3} className="anim-t" />
        <path d={`M ${w / 2 + 40} 85 L ${w / 2 + 40 + notchDepth} ${85 - sharp * 3 + 3} L ${w / 2 + 40} 85`} stroke={MANIM.yellow} strokeWidth={5 - sharp * 3} fill="none" strokeLinecap="round" />
        <circle cx={w / 2 + 40 + notchDepth} cy={85} r={Math.max(2, 9 - s.exp)} fill={breaks ? MANIM.red : MANIM.yellow} />
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <line x1={w / 2 + 70 + i * 60} y1={20} x2={w / 2 + 70 + i * 60} y2={4} stroke={MANIM.red} strokeWidth={3} />
            <line x1={w / 2 + 70 + i * 60} y1={150} x2={w / 2 + 70 + i * 60} y2={166} stroke={MANIM.red} strokeWidth={3} />
          </g>
        ))}
        <text x={w / 2 + 40 + notchDepth / 2} y={74} fill={MANIM.yellow} fontSize={16} textAnchor="middle">
          a
        </text>
      </svg>
      <MathRenderer text={`$\\sigma_{m\\acute{a}x} = 2\\,\\sigma \\sqrt{\\dfrac{a}{r}} = 2\\cdot ${fmtEs(s.sigma, 0)}\\sqrt{\\dfrac{${fmtEs(s.a, 1)}}{10^{-${s.exp}}}} = ${fmtEs(smax, 0)}\\ \\text{kp/mm}^2$`} className="text-lg" />
      <Note>La tensión teórica de rotura del ejemplo es 8 500 kp/mm². {breaks ? "El material se rompe: la grieta amplifica la tensión hasta la de rotura." : "Todavía aguanta: prueba a afilar el vértice."}</Note>
    </Frame>
  );
}

/* ───────────── Grado de polimerización ───────────── */

const MONOMEROS = [
  { id: "etileno", label: "Etileno → polietileno", m: 28, sub: 0 },
  { id: "propileno", label: "Propileno → polipropileno", m: 42, sub: 0 },
  { id: "vinilo", label: "Cloruro de vinilo → PVC", m: 62.5, sub: 0 },
  { id: "estireno", label: "Estireno → poliestireno", m: 104, sub: 0 },
  { id: "pet", label: "Dimetil-ftalato + etilenglicol → PET", m: 194.19 + 62.07, sub: 2 * 32.04 },
] as const;

export function GradoPolimerizacion({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 0, 0, MONOMEROS.length - 1)), n: Math.round(num(block.params?.b, 5350, 100, 20000) / 50) * 50 };
  const [s, setS] = useState(init);
  const mon = MONOMEROS[s.i]!;
  const mero = mon.m - mon.sub;
  const M = s.n * mero;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el monómero y el número de unidades de la cadena: la masa molecular del polímero crece en proporción."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Monómero" value={s.i} onChange={(i) => setS((p) => ({ ...p, i }))} items={MONOMEROS.map((m, i) => ({ value: i, label: m.label }))} />
          <Slider label="Grado de polimerización, n" value={s.n} min={100} max={20000} step={50} format={(v) => fmtEs(v, 0)} color={MANIM.green} onChange={(n) => setS((p) => ({ ...p, n }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label={mon.sub ? "Masa de cada mero (restando el subproducto)" : "Masa del monómero"}>
          {fmtEs(mero, 2)} g/mol
        </Stat>
        <Stat color={MANIM.yellow} label="Masa molecular del polímero">
          {fmtEs(M, 0)} g/mol
        </Stat>
      </Readout>
      <div className="flex h-8 w-full items-stretch gap-px overflow-hidden rounded-md" data-testid="tool-cadena">
        {Array.from({ length: 24 }, (_, i) => (
          <span key={i} className="anim-t flex-1" style={{ background: i < Math.max(1, Math.round((s.n / 20000) * 24)) ? MANIM.green : "rgba(255,255,255,0.06)" }} />
        ))}
      </div>
      <MathRenderer
        text={mon.sub ? `$M = n\\,(M_1 + M_2 - 2\\,M_{\\text{CH}_3\\text{OH}}) = ${fmtEs(s.n, 0)}\\cdot ${fmtEs(mero, 2)} = ${fmtEs(M, 0)}$` : `$\\text{grado} = \\dfrac{M_{\\text{polímero}}}{M_{\\text{monómero}}} \\;\\Rightarrow\\; M = ${fmtEs(s.n, 0)}\\cdot ${fmtEs(mon.m, 2)} = ${fmtEs(M, 0)}$`}
        className="text-lg"
      />
    </Frame>
  );
}

/* ───────────── Residuos tóxicos y peligrosos por comunidad ───────────── */

export const RTP_ESPANA: { name: string; v: [number, number, number, number] }[] = [
  { name: "Andalucía", v: [17000, 40000, 100000, 2400] },
  { name: "Aragón", v: [13500, 25240, 59900, 1440] },
  { name: "Asturias", v: [3300, 11000, 36000, 3700] },
  { name: "Baleares", v: [2000, 3000, 11000, 235] },
  { name: "Canarias", v: [5000, 4000, 13500, 125] },
  { name: "Cantabria", v: [4000, 8000, 9000, 830] },
  { name: "Castilla-La Mancha", v: [5000, 12000, 22000, 500] },
  { name: "Castilla y León", v: [23000, 23000, 65000, 3000] },
  { name: "Cataluña", v: [75000, 98000, 285000, 24000] },
  { name: "Extremadura", v: [1500, 10000, 9000, 250] },
  { name: "Galicia", v: [3500, 4000, 35000, 500] },
  { name: "Madrid", v: [30000, 67000, 75000, 4600] },
  { name: "Murcia", v: [5000, 46000, 18500, 675] },
  { name: "Navarra", v: [10000, 10000, 9000, 2000] },
  { name: "País Vasco", v: [30000, 156000, 77000, 19000] },
  { name: "La Rioja", v: [1500, 6000, 5000, 370] },
  { name: "Valencia", v: [15887, 20775, 119358, 5488] },
];
const RTP_TOTAL: [number, number, number, number] = [245187, 544015, 949258, 69113];
const RTP_KEYS = [
  { label: "Incineración", color: MANIM.red },
  { label: "Físico-químico", color: MANIM.blue },
  { label: "Depósito de seguridad", color: MANIM.orange },
  { label: "Recuperación de aceite", color: MANIM.green },
] as const;

export function RtpComunidades({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 8, 0, RTP_ESPANA.length));
  const [i, setI] = useState(init);
  const national = i >= RTP_ESPANA.length;
  const v = national ? RTP_TOTAL : RTP_ESPANA[i]!.v;
  const total = v.reduce((a, b) => a + b, 0);
  const top = v.indexOf(Math.max(...v));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una comunidad: ¿qué método de gestión pesa más? Compárala con el total nacional."}
      onReset={() => setI(init)}
      controls={
        <Choice
          label="Comunidad autónoma"
          value={i}
          onChange={setI}
          items={[...RTP_ESPANA.map((c, k) => ({ value: k, label: c.name })), { value: RTP_ESPANA.length, label: "Total nacional" }]}
        />
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={national ? "Total nacional" : RTP_ESPANA[i]!.name}>
          {fmtEs(total, 0)} t/año
        </Stat>
        <Stat color={RTP_KEYS[top]!.color} label="Método principal">
          {RTP_KEYS[top]!.label} ({fmtEs((v[top]! / total) * 100, 0)} %)
        </Stat>
      </Readout>
      <SplitBar parts={v.map((x, k) => ({ value: x, color: RTP_KEYS[k]!.color, label: `${fmtEs((x / total) * 100, 0)} %` }))} height={40} />
      <SplitBar parts={RTP_TOTAL.map((x, k) => ({ value: x, color: RTP_KEYS[k]!.color, label: `${fmtEs((x / RTP_TOTAL.reduce((a, b) => a + b, 0)) * 100, 0)} %` }))} height={22} />
      <Note>La segunda barra es la media nacional (1 807 573 t/año): casi la mitad de los RTP va a depósito de seguridad. Fuente: tabla del libro.</Note>
      <ul className="flex flex-wrap gap-x-4 gap-y-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
        {RTP_KEYS.map((k, idx) => (
          <li key={k.label} className="flex items-center gap-1.5">
            <span className="inline-block size-3 rounded-sm" style={{ background: k.color }} />
            {k.label}: {fmtEs(v[idx]!, 0)} t
          </li>
        ))}
      </ul>
    </Frame>
  );
}
