"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { compound, directRule, fmtEs, hm, inverseRule, mixture, movers, share, simpleInterest, variationIndex, type Rel } from "@/components/lesson/anim/arith";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const tx = (x: number, d = 2) => fmtEs(x, d).replace(",", "{,}").replace(/ /g, "\\ ").replace("−", "-");
const seg = (label: string, on: boolean, onClick: () => void, key?: string) => (
  <button key={key ?? label} type="button" className={`${TOOL_BTN} ${on ? "border-white bg-white/20" : ""}`} aria-pressed={on} onClick={onClick}>
    {label}
  </button>
);

/* ───────────── Regla de tres: directa e inversa ───────────── */

export function ProporcionExplorador({ block }: { block: ToolBlock }) {
  const init = { inv: block.params?.n === 1, a: int(block.params?.a, 5, 1, 20), b: int(block.params?.b, 12, 1, 60), c: int(block.params?.c, 8, 1, 40) };
  const [v, setV] = useState(init);
  const x = v.inv ? inverseRule(v.a, v.b, v.c) : directRule(v.a, v.b, v.c);
  const W = 420;
  const H = 150;
  const xmax = 40;
  const ymax = v.inv ? Math.max(v.b * 4, 12) : Math.max((v.b / v.a) * xmax, 12);
  const curve = (t: number) => (v.inv ? (v.a * v.b) / t : (v.b / v.a) * t);
  const px = (t: number) => 30 + (t / xmax) * (W - 50);
  const py = (y: number) => H - 20 - (clamp(y, 0, ymax) / ymax) * (H - 40);
  const pts = Array.from({ length: 80 }, (_, i) => 0.6 + (i * (xmax - 0.6)) / 79);
  const path = pts.map((t, i) => `${i === 0 ? "M" : "L"} ${px(t).toFixed(1)} ${py(curve(t)).toFixed(1)}`).join(" ");

  return (
    <Frame
      hint={block.hint ?? "Cambia el tipo de relación y los datos: la gráfica de la directa es una recta y la de la inversa, una curva que baja."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex gap-2">
            {seg("Directa", !v.inv, () => setV((p) => ({ ...p, inv: false })))}
            {seg("Inversa", v.inv, () => setV((p) => ({ ...p, inv: true })))}
          </div>
          <Slider label="A (dato)" value={v.a} min={1} max={20} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="B (dato)" value={v.b} min={1} max={60} color={MANIM.green} onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Slider label="Nuevo valor de A" value={v.c} min={1} max={40} color={MANIM.orange} onChange={(c) => setV((p) => ({ ...p, c }))} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={v.inv ? `$${v.a} \\cdot ${v.b} = ${v.c} \\cdot x \\ \\Rightarrow\\ x = ${tx(x)}$` : `$\\dfrac{${v.a}}{${v.b}} = \\dfrac{${v.c}}{x} \\ \\Rightarrow\\ x = ${tx(x)}$`} className="text-2xl" />
        <p className="mt-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-prop-tipo">
          {v.inv ? "Inversa: el producto A·B es constante." : "Directa: el cociente B/A es constante."}
        </p>
      </div>
      <Svg w={W} h={H} testId="tool-prop-grafica">
        <line x1={30} y1={H - 20} x2={W - 10} y2={H - 20} stroke={MANIM.grid} strokeWidth={2} />
        <line x1={30} y1={10} x2={30} y2={H - 20} stroke={MANIM.grid} strokeWidth={2} />
        <path d={path} fill="none" stroke={v.inv ? MANIM.orange : MANIM.blue} strokeWidth={3} />
        <circle cx={px(v.a)} cy={py(v.b)} r={6} fill={MANIM.green} />
        <circle cx={px(v.c)} cy={py(x)} r={7} fill={MANIM.yellow} className="anim-t" />
      </Svg>
    </Frame>
  );
}

/* ───────────── Proporcionalidad compuesta ───────────── */

export function CompuestaExplorador({ block }: { block: ToolBlock }) {
  const [k1, k2, res] = [int(block.params?.a, 15, 1, 100), int(block.params?.b, 7, 1, 100), int(block.params?.c, 294, 1, 5000)];
  const ini = block.initial ?? [];
  const init = { n1: int(ini[0], 10, 1, 100), n2: int(ini[1], 30, 1, 100), r1: (ini[2] === 1 ? "i" : "d") as Rel, r2: (ini[3] === 1 ? "i" : "d") as Rel };
  const [v, setV] = useState(init);
  const x = compound([k1, k2], res, [v.n1, v.n2], [v.r1, v.r2]);
  const f1 = v.r1 === "d" ? [v.n1, k1] : [k1, v.n1];
  const f2 = v.r2 === "d" ? [v.n2, k2] : [k2, v.n2];

  return (
    <Frame
      hint={block.hint ?? "Decide si cada magnitud es directa o inversa respecto de la incógnita y mira cómo cambia la fórmula."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Nuevo valor de la 1.ª magnitud" value={v.n1} min={1} max={100} color={MANIM.blue} onChange={(n1) => setV((p) => ({ ...p, n1 }))} />
          <div className="flex gap-2">
            {seg("1.ª directa", v.r1 === "d", () => setV((p) => ({ ...p, r1: "d" })), "d1")}
            {seg("1.ª inversa", v.r1 === "i", () => setV((p) => ({ ...p, r1: "i" })), "i1")}
          </div>
          <Slider label="Nuevo valor de la 2.ª magnitud" value={v.n2} min={1} max={100} color={MANIM.green} onChange={(n2) => setV((p) => ({ ...p, n2 }))} />
          <div className="flex gap-2">
            {seg("2.ª directa", v.r2 === "d", () => setV((p) => ({ ...p, r2: "d" })), "d2")}
            {seg("2.ª inversa", v.r2 === "i", () => setV((p) => ({ ...p, r2: "i" })), "i2")}
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-2 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`Datos: $${k1}$ y $${k2}$ dan $${res}$`} className="text-lg" />
        <MathRenderer text={`$x = ${res} \\cdot \\dfrac{${f1[0]}}{${f1[1]}} \\cdot \\dfrac{${f2[0]}}{${f2[1]}}$`} className="text-2xl" />
        <MathRenderer text={`$x = ${tx(x)}$`} className="text-4xl" />
      </div>
    </Frame>
  );
}

/* ───────────── Reparto proporcional ───────────── */

const TOTALS = [100, 200, 264, 300, 500, 605, 1000, 2000, 600000];

export function RepartoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 1, 1, 12), b: int(ini[1], 2, 1, 12), c: int(ini[2], 5, 1, 12), total: TOTALS.includes(ini[3] ?? 0) ? (ini[3] as number) : 600000 };
  const [v, setV] = useState(init);
  const values = [v.a, v.b, v.c];
  const { amounts, fractions } = share(values, v.total);
  const S = values.reduce((a, b) => a + b, 0);
  const colors = [MANIM.blue, MANIM.green, MANIM.orange];
  let acc = 0;

  return (
    <Frame
      hint={block.hint ?? "Cambia lo que aporta cada uno: las fracciones siempre suman 1 y los importes, el total."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Valor del 1.º" value={v.a} min={1} max={12} color={colors[0]!} onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="Valor del 2.º" value={v.b} min={1} max={12} color={colors[1]!} onChange={(b) => setV((p) => ({ ...p, b }))} />
          <Slider label="Valor del 3.º" value={v.c} min={1} max={12} color={colors[2]!} onChange={(c) => setV((p) => ({ ...p, c }))} />
          <Slider label="Total a repartir" value={TOTALS.indexOf(v.total)} min={0} max={TOTALS.length - 1} color={MANIM.yellow} onChange={(i) => setV((p) => ({ ...p, total: TOTALS[i]! }))} format={(i) => fmtEs(TOTALS[i]!, 0)} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$${v.a} + ${v.b} + ${v.c} = ${S}$ partes · cada parte: $${tx(v.total / S)}$`} className="text-lg" />
        <div className="mt-2 grid grid-cols-3 gap-3 text-center" data-testid="tool-reparto">
          {amounts.map((m, i) => (
            <div key={i}>
              <MathRenderer text={`$\\dfrac{${fractions[i]![0]}}{${fractions[i]![1]}}$`} />
              <div className="text-xl font-bold tabular-nums" style={{ color: colors[i] }}>{fmtEs(m)}</div>
            </div>
          ))}
        </div>
      </div>
      <Svg w={420} h={46} testId="tool-reparto-barra">
        {values.map((val, i) => {
          const w = (val / S) * 400;
          const x = 10 + (acc / S) * 400;
          acc += val;
          return <rect key={i} x={x} y={10} width={w} height={26} fill={colors[i]} fillOpacity={0.8} stroke={MANIM.surface} strokeWidth={2} className="anim-t" />;
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── Mezclas ───────────── */

export function MezclaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { q1: int(ini[0], 50, 1, 100), p1: int(ini[1], 880, 100, 2000), q2: int(ini[2], 30, 1, 100), p2: int(ini[3], 640, 100, 2000) };
  const [v, setV] = useState(init);
  const m = mixture([{ qty: v.q1, price: v.p1 / 100 }, { qty: v.q2, price: v.p2 / 100 }]);
  const lo = Math.min(v.p1, v.p2) / 100;
  const hi = Math.max(v.p1, v.p2) / 100;
  const sx = (p: number) => 20 + ((p - lo) / (hi - lo || 1)) * 380;

  return (
    <Frame
      hint={block.hint ?? "Aumenta la cantidad de uno de los productos: el precio de la mezcla se acerca al suyo."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Cantidad del 1.º" value={v.q1} min={1} max={100} color={MANIM.blue} onChange={(q1) => setV((p) => ({ ...p, q1 }))} />
          <Slider label="Precio del 1.º (céntimos)" value={v.p1} min={100} max={2000} step={10} color={MANIM.blue} onChange={(p1) => setV((p) => ({ ...p, p1 }))} format={(x) => fmtEs(x / 100)} />
          <Slider label="Cantidad del 2.º" value={v.q2} min={1} max={100} color={MANIM.orange} onChange={(q2) => setV((p) => ({ ...p, q2 }))} />
          <Slider label="Precio del 2.º (céntimos)" value={v.p2} min={100} max={2000} step={10} color={MANIM.orange} onChange={(p2) => setV((p) => ({ ...p, p2 }))} format={(x) => fmtEs(x / 100)} />
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${tx(m.totalCost)}}{${m.totalQty}} = ${tx(m.price)}$`} className="text-3xl" />
        <p className="mt-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">Coste total entre cantidad total.</p>
      </div>
      <Svg w={420} h={70} testId="tool-mezcla">
        <line x1={20} y1={34} x2={400} y2={34} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
        <circle cx={sx(v.p1 / 100)} cy={34} r={8} fill={MANIM.blue} />
        <circle cx={sx(v.p2 / 100)} cy={34} r={8} fill={MANIM.orange} />
        <circle cx={sx(m.price)} cy={34} r={10} fill={MANIM.green} className="anim-t" />
      </Svg>
    </Frame>
  );
}

/* ───────────── Móviles: encuentros y alcances ───────────── */

export function MovilesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { alc: block.params?.n === 1, v1: int(ini[0], 80, 10, 150), v2: int(ini[1], 120, 10, 150), d: int(ini[2], 350, 10, 600), delay: int(ini[3], 0, 0, 120) };
  const [v, setV] = useState(init);
  const res = movers(v.alc ? "alcance" : "opuesto", v.v1, v.v2, v.d, v.delay / 60);
  const closing = v.alc ? v.v2 - v.v1 : v.v1 + v.v2;
  const span = v.alc ? (res.ok ? Math.max(res.x, v.d) : v.d) : v.d;
  const sx = (km: number) => 20 + (km / Math.max(span, 1)) * 380;

  return (
    <Frame
      hint={block.hint ?? "Compara los dos tipos: en sentidos opuestos las velocidades se suman; en el mismo sentido se restan."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex gap-2">
            {seg("Se cruzan", !v.alc, () => setV((p) => ({ ...p, alc: false })), "c")}
            {seg("Alcance", v.alc, () => setV((p) => ({ ...p, alc: true })), "a")}
          </div>
          <Slider label="Velocidad 1 (km/h)" value={v.v1} min={10} max={150} color={MANIM.blue} onChange={(v1) => setV((p) => ({ ...p, v1 }))} />
          <Slider label="Velocidad 2 (km/h)" value={v.v2} min={10} max={150} color={MANIM.orange} onChange={(v2) => setV((p) => ({ ...p, v2 }))} />
          <Slider label="Distancia (km)" value={v.d} min={10} max={600} step={5} color={MANIM.green} onChange={(d) => setV((p) => ({ ...p, d }))} />
          {v.alc ? <Slider label="Retraso de la salida del 2.º (min)" value={v.delay} min={0} max={120} step={5} color={MANIM.yellow} onChange={(delay) => setV((p) => ({ ...p, delay }))} /> : null}
        </>
      }
    >
      <div className="text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        {res.ok ? (
          <>
            <MathRenderer text={`Aproximación: $${v.alc ? `${v.v2} - ${v.v1}` : `${v.v1} + ${v.v2}`} = ${closing}$ km/h`} className="text-lg" />
            <MathRenderer text={`$t = ${tx(v.alc ? v.d + v.v1 * (v.delay / 60) : v.d)} : ${closing} = ${tx(res.t, 3)}$ h`} className="text-2xl" />
            <p className="mt-1 text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-movil-tiempo">{hm(res.t)}</p>
          </>
        ) : (
          <p className="text-lg" style={{ color: MANIM.red }} data-testid="tool-movil-tiempo">
            El 2.º no es más rápido: nunca alcanzará al 1.º.
          </p>
        )}
      </div>
      <Svg w={420} h={60} testId="tool-moviles">
        <line x1={20} y1={34} x2={400} y2={34} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
        <circle cx={sx(v.alc ? v.d + v.v1 * (v.delay / 60) : 0)} cy={34} r={8} fill={MANIM.blue} />
        <circle cx={sx(v.alc ? 0 : v.d)} cy={34} r={8} fill={MANIM.orange} />
        {res.ok ? <circle cx={sx(v.alc ? res.x : res.x)} cy={34} r={10} fill={MANIM.green} /> : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Índice de variación ───────────── */

const AMOUNTS = [60, 100, 840, 1400, 5400, 8000];

export function IndiceVariacionExplorador({ block }: { block: ToolBlock }) {
  const init = { amount: AMOUNTS.includes(block.params?.a ?? 0) ? (block.params?.a as number) : 1400, p1: int(block.params?.b, -15, -90, 100), p2: int(block.params?.c, 0, -90, 100), rev: false };
  const [v, setV] = useState(init);
  const pcts = v.p2 === 0 ? [v.p1] : [v.p1, v.p2];
  const idx = variationIndex(pcts);
  const final = v.amount * idx;
  const global = (idx - 1) * 100;
  const fmtPct = (p: number) => `${p > 0 ? "+" : p < 0 ? "−" : ""}${fmtEs(Math.abs(p), 2)} %`;

  return (
    <Frame
      hint={block.hint ?? "Fíjate en que dos variaciones seguidas no se suman: se multiplican sus índices."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Cantidad inicial" value={AMOUNTS.indexOf(v.amount)} min={0} max={AMOUNTS.length - 1} color={MANIM.yellow} onChange={(i) => setV((p) => ({ ...p, amount: AMOUNTS[i]! }))} format={(i) => fmtEs(AMOUNTS[i]!, 0)} />
          <Slider label="1.ª variación (%)" value={v.p1} min={-90} max={100} step={5} color={MANIM.blue} onChange={(p1) => setV((p) => ({ ...p, p1 }))} format={(x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}`} />
          <Slider label="2.ª variación (%)" value={v.p2} min={-90} max={100} step={5} color={MANIM.orange} onChange={(p2) => setV((p) => ({ ...p, p2 }))} format={(x) => `${x > 0 ? "+" : x < 0 ? "−" : ""}${Math.abs(x)}`} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`Índice: $${pcts.map((p) => tx(1 + p / 100, 3)).join(" \\cdot ")} = ${tx(idx, 4)}$`} className="text-xl" />
        <MathRenderer text={`Final: $${tx(v.amount, 0)} \\cdot ${tx(idx, 4)} = ${tx(final)}$`} className="text-2xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-indice-global">
          Variación total: {fmtPct(global)}
          {pcts.length === 2 ? ` (no ${fmtPct(v.p1 + v.p2)})` : ""}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── Interés simple ───────────── */

export function InteresExplorador({ block }: { block: ToolBlock }) {
  const init = { c: int(block.params?.a, 750, 500, 50000), r: int(block.params?.b, 4, 1, 12), months: int(block.params?.c, 36, 1, 120) };
  const [v, setV] = useState(init);
  const years = v.months / 12;
  const interest = simpleInterest(v.c, v.r, years);
  const bars = Math.min(10, Math.ceil(years));
  const perYear = simpleInterest(v.c, v.r, 1);

  return (
    <Frame
      hint={block.hint ?? "El interés crece en línea recta con el capital, el rédito y el tiempo: duplica uno y se duplica el interés."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Capital (€)" value={v.c} min={500} max={50000} step={250} color={MANIM.blue} onChange={(c) => setV((p) => ({ ...p, c }))} format={(x) => fmtEs(x, 0)} />
          <Slider label="Rédito anual (%)" value={v.r} min={1} max={12} color={MANIM.green} onChange={(r) => setV((p) => ({ ...p, r }))} />
          <Slider label="Tiempo (meses)" value={v.months} min={1} max={120} color={MANIM.orange} onChange={(months) => setV((p) => ({ ...p, months }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$I = \\dfrac{${tx(v.c, 0)} \\cdot ${v.r} \\cdot ${tx(years, 3)}}{100} = ${tx(interest)}\\ €$`} className="text-2xl" />
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-interes-total">
          Capital final: {fmtEs(v.c + interest)} € · interés anual: {fmtEs(perYear)} €
        </p>
      </div>
      <Svg w={420} h={80} testId="tool-interes-barras">
        {Array.from({ length: bars }, (_, i) => {
          const frac = Math.min(1, years - i);
          const h = (frac * perYear / Math.max(perYear, 1)) * 50;
          return <rect key={i} x={20 + i * 38} y={66 - h} width={30} height={Math.max(h, 2)} rx={3} fill={MANIM.green} fillOpacity={0.4 + 0.5 * frac} />;
        })}
        <line x1={14} y1={66} x2={410} y2={66} stroke={MANIM.grid} strokeWidth={2} />
      </Svg>
    </Frame>
  );
}
