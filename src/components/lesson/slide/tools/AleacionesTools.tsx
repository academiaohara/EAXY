"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { interp, interpInverse } from "@/components/lesson/anim/scenes/industrial/common";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, SplitBar, Stat, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/* ───────────── Concentración de una aleación ───────────── */

export function AleacionConcentracion({ block }: { block: ToolBlock }) {
  const objective = block.params?.c === 1;
  const init = objective
    ? { mode: "objetivo" as const, ms: 8, md: Math.round(num(block.params?.b, 1500, 100, 2000) / 50) * 50 }
    : { mode: "directa" as const, ms: Math.round(num(block.params?.a, 85, 0, 500)), md: Math.round(num(block.params?.b, 1000, 100, 2000) / 50) * 50 };
  const [s, setS] = useState(init);
  const direct = s.mode === "directa";
  const soluto = direct ? s.ms : (s.ms * s.md) / (100 - s.ms);
  const conc = direct ? (s.ms / (s.ms + s.md)) * 100 : s.ms;
  const total = soluto + s.md;
  const tex = direct
    ? `C = \\dfrac{m_s}{m_s + m_D}\\cdot 100 = \\dfrac{${fmtEs(soluto, 1)}}{${fmtEs(soluto, 1)} + ${fmtEs(s.md, 0)}}\\cdot 100 = ${fmtEs(conc, 1)}\\,\\%`
    : `${fmtEs(conc, 1)} = \\dfrac{m_s}{m_s + ${fmtEs(s.md, 0)}}\\cdot 100 \\;\\Rightarrow\\; m_s = \\dfrac{${fmtEs(conc, 1)}\\cdot ${fmtEs(s.md, 0)}}{100 - ${fmtEs(conc, 1)}} = ${fmtEs(soluto, 1)}\\ \\text{kg}`;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la masa de soluto y de disolvente. Pasa a «Quiero una concentración» para calcular cuánto soluto añadir."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Qué se calcula"
            value={s.mode}
            onChange={(mode) => setS(mode === "directa" ? { mode, ms: 85, md: 1000 } : { mode, ms: 8, md: 1500 })}
            items={[
              { value: "directa", label: "Concentración de la aleación" },
              { value: "objetivo", label: "Quiero una concentración" },
            ]}
          />
          {direct ? (
            <Slider label="Masa de soluto" value={s.ms} min={0} max={500} step={5} unit=" kg" color={MANIM.orange} onChange={(ms) => setS((p) => ({ ...p, ms }))} />
          ) : (
            <Slider label="Concentración deseada, C" value={s.ms} min={1} max={20} step={0.5} format={(v) => fmtEs(v, 1)} unit=" %" color={MANIM.orange} onChange={(ms) => setS((p) => ({ ...p, ms }))} />
          )}
          <Slider label="Masa de disolvente" value={s.md} min={100} max={2000} step={50} unit=" kg" color={MANIM.blue} onChange={(md) => setS((p) => ({ ...p, md }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={direct ? "Concentración de soluto" : "Soluto que hay que añadir"}>
          {direct ? `${fmtEs(conc, 2)} %` : `${fmtEs(soluto, 1)} kg`}
        </Stat>
        <Stat color={MANIM.green} label="Masa de aleación">
          {fmtEs(total, 1)} kg
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: soluto, color: MANIM.orange, label: "soluto" },
          { value: s.md, color: MANIM.blue, label: "disolvente" },
        ]}
      />
      <MathRenderer text={`$${tex}$`} className="text-xl" />
    </Frame>
  );
}

/* ───────────── Energía para fundir un metal ───────────── */

const METALES = [
  { sym: "Pb", Ts: 327, L: 5.7, c: 31 },
  { sym: "Mg", Ts: 650, L: 82.2, c: 250 },
  { sym: "Al", Ts: 660, L: 92.7, c: 215 },
  { sym: "Ag", Ts: 960, L: 24.9, c: 55 },
  { sym: "Cu", Ts: 1083, L: 48.8, c: 91 },
  { sym: "Ni", Ts: 1455, L: 72.1, c: 105 },
  { sym: "Fe", Ts: 1536, L: 65.0, c: 110 },
  { sym: "Pt", Ts: 1773, L: 27.0, c: 31 },
  { sym: "Ti", Ts: 1812, L: 87.3, c: 127 },
  { sym: "W", Ts: 3410, L: 44.0, c: 31 },
] as const;

export function EnergiaFusion({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 2, 0, METALES.length - 1)), m: Math.round(num(block.params?.b, 1000, 100, 5000) / 100) * 100 };
  const [s, setS] = useState(init);
  const metal = METALES[s.i]!;
  const sensible = (s.m * (metal.c / 1000) * (metal.Ts - 25));
  const latente = s.m * metal.L;
  const total = sensible + latente;
  const kwh = total / 861.24;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el metal y la masa. ¿Qué pesa más, calentarlo hasta la fusión o el cambio de estado?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal (tabla 2.1)" value={s.i} onChange={(i) => setS((p) => ({ ...p, i }))} items={METALES.map((m, i) => ({ value: i, label: m.sym }))} />
          <Slider label="Masa de metal" value={s.m} min={100} max={5000} step={100} unit=" kg" color={MANIM.blue} onChange={(m) => setS((p) => ({ ...p, m }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.orange} label="Calentar de 25 °C a Ts">
          {fmtEs(sensible, 0)} kcal
        </Stat>
        <Stat color={MANIM.purple} label="Cambio de estado">
          {fmtEs(latente, 0)} kcal
        </Stat>
        <Stat color={MANIM.yellow} label="Total">
          {fmtEs(total, 0)} kcal ≈ {fmtEs(kwh, 0)} kWh
        </Stat>
      </Readout>
      <SplitBar
        parts={[
          { value: sensible, color: MANIM.orange, label: "Q = m·c·Δt" },
          { value: latente, color: MANIM.purple, label: "Q = m·C" },
        ]}
      />
      <MathRenderer
        text={`$Q = m\\,c\\,\\Delta t + m\\,C = ${fmtEs(s.m, 0)}\\cdot ${fmtEs(metal.c / 1000, 3)}\\cdot (${metal.Ts}-25) + ${fmtEs(s.m, 0)}\\cdot ${fmtEs(metal.L, 1)}$`}
        className="text-lg"
      />
      <Note>
        Temperatura de fusión del {metal.sym}: {fmtEs(metal.Ts, 0)} °C. En la práctica hace falta más energía, porque el horno pierde calor y el metal se sobrecalienta.
      </Note>
    </Frame>
  );
}

/* ───────────── Regla de las fases de Gibbs ───────────── */

const GIBBS_PRESETS = [
  { label: "Agua: punto triple", c: 1, f: 3 },
  { label: "Agua: sobre la línea sólido-líquido", c: 1, f: 2 },
  { label: "Agua: una sola fase", c: 1, f: 1 },
  { label: "Aleación binaria de dos fases", c: 2, f: 2 },
] as const;

export function GibbsExplorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 1, 1, 3)), f: Math.round(num(block.params?.b, 3, 1, 4)) };
  const [s, setS] = useState(init);
  const n = s.c + 2 - s.f;
  const possible = n >= 0;
  const water = s.c === 1 && s.f >= 1 && s.f <= 3;
  const dot = s.f === 3 ? [200, 220] : s.f === 2 ? [188, 140] : [270, 110];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia los componentes y las fases. ¿Cuántas variables puedes modificar sin perder el equilibrio?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Componentes, C" value={s.c} min={1} max={3} color={MANIM.blue} onChange={(c) => setS((p) => ({ ...p, c }))} />
          <Slider label="Fases que coexisten, F" value={s.f} min={1} max={4} color={MANIM.green} onChange={(f) => setS((p) => ({ ...p, f }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {GIBBS_PRESETS.map((p) => (
              <button key={p.label} type="button" className={TOOL_BTN} onClick={() => setS({ c: p.c, f: p.f })}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Grados de libertad">
          {possible ? `N = ${s.c} + 2 − ${s.f} = ${n}` : `N = ${n} (imposible)`}
        </Stat>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          {!possible
            ? "No pueden coexistir tantas fases en equilibrio con tan pocos componentes."
            : n === 0
              ? "Punto invariante: no se puede cambiar ninguna variable."
              : water && n === 1
                ? "Una variable libre: si cambias la temperatura, la presión queda fijada por la curva."
                : water && n === 2
                  ? "Dos variables libres: puedes cambiar presión y temperatura sin salir de la fase."
                  : `Puedes modificar ${n === 1 ? "una variable" : `${n} variables`} sin cambiar el número de fases.`}
        </span>
      </Readout>
      <MathRenderer text={`$F + N = C + 2 \\;\\Rightarrow\\; ${s.f} + N = ${s.c} + 2$`} className="text-xl" />
      {water ? (
        <Svg w={520} h={290} maxH={235} testId="tool-gibbs">
          <line x1={40} y1={260} x2={500} y2={260} stroke={MANIM.muted} strokeWidth={2.5} />
          <line x1={40} y1={260} x2={40} y2={20} stroke={MANIM.muted} strokeWidth={2.5} />
          <text x={500} y={282} fill={MANIM.muted} fontSize={16} textAnchor="end">T</text>
          <text x={26} y={28} fill={MANIM.muted} fontSize={16} textAnchor="end">P</text>
          <path d="M 200 220 L 182 30" stroke={MANIM.blue} strokeWidth={3} fill="none" />
          <path d="M 200 220 Q 300 190 440 60" stroke={MANIM.green} strokeWidth={3} fill="none" />
          <path d="M 200 220 L 80 262" stroke={MANIM.orange} strokeWidth={3} fill="none" />
          <text x={110} y={120} fill={MANIM.muted} fontSize={20}>Sólido</text>
          <text x={290} y={110} fill={MANIM.muted} fontSize={20}>Líquido</text>
          <text x={380} y={210} fill={MANIM.muted} fontSize={20}>Vapor</text>
          <circle cx={dot[0]} cy={dot[1]} r={9} fill={MANIM.yellow} className="anim-t" />
        </Svg>
      ) : (
        <Note>Con {s.c} componentes la representación ya no cabe en un diagrama P-T plano: usa la fórmula.</Note>
      )}
    </Frame>
  );
}

/* ───────────── Diagrama isomorfo Cu-Ni (esquema) ───────────── */

const CUNI_LIQ: readonly (readonly [number, number])[] = [[0, 1085], [20, 1190], [32, 1250], [50, 1320], [80, 1410], [100, 1455]];
const CUNI_SOL: readonly (readonly [number, number])[] = [[0, 1085], [20, 1160], [43, 1250], [50, 1280], [80, 1395], [100, 1455]];

const bx = (c: number) => 70 + c * 4.5;
const by = (t: number) => 270 - (t - 1000) * 0.46;

const polyPts = (pts: readonly (readonly [number, number])[]) => pts.map(([c, t]) => `${bx(c)},${by(t)}`).join(" ");

export function DiagramaBinario({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 35, 0, 100)), t: Math.round(num(block.params?.b, 1250, 1000, 1500) / 5) * 5 };
  const [s, setS] = useState(init);
  const tl = interp(CUNI_LIQ, s.c);
  const ts = interp(CUNI_SOL, s.c);
  const phase = s.t >= tl ? "L" : s.t <= ts ? "a" : "aL";
  const cl = interpInverse(CUNI_LIQ, s.t);
  const ca = interpInverse(CUNI_SOL, s.t);
  const wl = phase === "aL" ? (ca - s.c) / (ca - cl) : phase === "L" ? 1 : 0;
  const wa = 1 - wl;

  const presets = [
    { label: "Punto A (60 % Ni, 1 100 °C)", c: 60, t: 1100 },
    { label: "Punto B (35 % Ni, 1 250 °C)", c: 35, t: 1250 },
    { label: "Punto C (60 % Ni, 1 400 °C)", c: 60, t: 1400 },
  ];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve la composición y la temperatura. Dentro de la zona α + L aparecen la recta de reparto y los porcentajes de cada fase."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Composición, % en peso de Ni" value={s.c} min={0} max={100} unit=" %" color={MANIM.green} onChange={(c) => setS((p) => ({ ...p, c }))} />
          <Slider label="Temperatura" value={s.t} min={1000} max={1500} step={5} unit=" °C" color={MANIM.orange} onChange={(t) => setS((p) => ({ ...p, t }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {presets.map((p) => (
              <button key={p.label} type="button" className={TOOL_BTN} onClick={() => setS({ c: p.c, t: p.t })}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={phase === "aL" ? MANIM.green : phase === "L" ? MANIM.blue : MANIM.yellow} label="Zona del diagrama">
          {phase === "L" ? "Líquido (L)" : phase === "a" ? "Sólido (α)" : "Bifásica (α + L)"}
        </Stat>
        {phase === "aL" ? (
          <>
            <Stat color={MANIM.blue} label="Líquido">
              C(L) = {fmtEs(cl, 0)} % Ni · W(L) = {fmtEs(wl, 2)}
            </Stat>
            <Stat color={MANIM.yellow} label="Sólido α">
              C(α) = {fmtEs(ca, 0)} % Ni · W(α) = {fmtEs(wa, 2)}
            </Stat>
          </>
        ) : (
          <span className="text-base text-[color:var(--stage-ink,#fff)]">
            Una sola fase: su composición es la de la aleación ({fmtEs(s.c, 0)} % Ni, {fmtEs(100 - s.c, 0)} % Cu).
          </span>
        )}
      </Readout>
      <Svg w={560} h={300} maxH={235} testId="tool-diagrama-binario">
        <polygon points={`${polyPts(CUNI_LIQ)} ${bx(100)},${by(1500)} ${bx(0)},${by(1500)}`} fill={MANIM.blue} fillOpacity={0.18} />
        <polygon points={`${polyPts(CUNI_SOL)} ${bx(100)},${by(1000)} ${bx(0)},${by(1000)}`} fill={MANIM.yellow} fillOpacity={0.16} />
        <polygon points={`${polyPts(CUNI_LIQ)} ${[...CUNI_SOL].reverse().map(([c, t]) => `${bx(c)},${by(t)}`).join(" ")}`} fill={MANIM.green} fillOpacity={0.25} />
        <polyline points={polyPts(CUNI_LIQ)} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <polyline points={polyPts(CUNI_SOL)} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
        <line x1={bx(0)} y1={by(1000)} x2={bx(100) + 14} y2={by(1000)} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={bx(0)} y1={by(1000)} x2={bx(0)} y2={by(1500) - 16} stroke={MANIM.muted} strokeWidth={2} />
        <text x={bx(14)} y={by(1440)} fill={MANIM.blue} fontSize={20} fontWeight={700}>L</text>
        <text x={bx(78)} y={by(1330)} fill={MANIM.green} fontSize={18} fontWeight={700}>α + L</text>
        <text x={bx(55)} y={by(1090)} fill={MANIM.yellow} fontSize={20} fontWeight={700}>α</text>
        <text x={bx(0)} y={292} fill={MANIM.muted} fontSize={14} textAnchor="middle">Cu</text>
        <text x={bx(100)} y={292} fill={MANIM.muted} fontSize={14} textAnchor="middle">Ni</text>
        <text x={bx(0) - 8} y={by(1085) + 5} fill={MANIM.muted} fontSize={13} textAnchor="end">1 085</text>
        <text x={bx(100) + 8} y={by(1455) + 5} fill={MANIM.muted} fontSize={13} textAnchor="start">1 455 °C</text>
        {phase === "aL" ? (
          <g>
            <line x1={bx(cl)} y1={by(s.t)} x2={bx(ca)} y2={by(s.t)} stroke={MANIM.red} strokeWidth={3} />
            <circle cx={bx(cl)} cy={by(s.t)} r={5} fill={MANIM.blue} />
            <circle cx={bx(ca)} cy={by(s.t)} r={5} fill={MANIM.yellow} />
            <line x1={bx(cl)} y1={by(s.t)} x2={bx(cl)} y2={by(1000)} stroke={MANIM.blue} strokeWidth={1.5} strokeDasharray="4 4" />
            <line x1={bx(ca)} y1={by(s.t)} x2={bx(ca)} y2={by(1000)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="4 4" />
          </g>
        ) : null}
        <line x1={bx(s.c)} y1={by(s.t)} x2={bx(s.c)} y2={by(1000)} stroke={MANIM.ink} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.6} />
        <circle cx={bx(s.c)} cy={by(s.t)} r={8} fill={MANIM.ink} stroke={MANIM.red} strokeWidth={3} />
      </Svg>
      {phase === "aL" ? (
        <>
          <SplitBar
            parts={[
              { value: wl, color: MANIM.blue, label: `L ${fmtEs(wl * 100, 0)} %` },
              { value: wa, color: MANIM.yellow, label: `α ${fmtEs(wa * 100, 0)} %` },
            ]}
          />
          <MathRenderer text={`$W_L = \\dfrac{C_\\alpha - C}{C_\\alpha - C_L} = \\dfrac{${fmtEs(ca, 0)} - ${fmtEs(s.c, 0)}}{${fmtEs(ca, 0)} - ${fmtEs(cl, 0)}} = ${fmtEs(wl, 2)}$`} className="text-xl" />
        </>
      ) : null}
      <Note>Esquema aproximado del diagrama Cu-Ni con los valores del libro (en B: CL = 32 %, Cα = 43 %).</Note>
    </Frame>
  );
}

/* ───────────── Diagrama eutéctico A-B (esquema) ───────────── */

const TA = 900;
const TB = 700;
const TE = 500;
const CE = 60;
const ex = (c: number) => 70 + c * 4.5;
const ey = (t: number) => 275 - (t - 400) * 0.45;
const tLiqE = (c: number) => (c <= CE ? TA - ((TA - TE) / CE) * c : TB - ((TB - TE) / (100 - CE)) * (100 - c));

export function DiagramaEutectico({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.a, 30, 0, 100)), t: Math.round(num(block.params?.b, 650, 400, 950) / 10) * 10 };
  const [s, setS] = useState(init);
  const tl = tLiqE(s.c);
  const left = s.c <= CE;
  let kind: "L" | "LA" | "LB" | "eut" | "sol";
  if (s.t >= tl) {
    kind = "L";
  } else if (s.t > TE) {
    kind = left ? "LA" : "LB";
  } else if (s.t === TE && s.c > 0 && s.c < 100) {
    kind = "eut";
  } else {
    kind = "sol";
  }
  const cl = left ? ((TA - s.t) * CE) / (TA - TE) : 100 - ((TB - s.t) * (100 - CE)) / (TB - TE);
  const wl = kind === "LA" ? s.c / cl : kind === "LB" ? (100 - s.c) / (100 - cl) : kind === "L" ? 1 : 0;
  const prim = left ? "A" : "B";
  const wPrim = left ? (CE - s.c) / CE : (s.c - CE) / (100 - CE);
  const wEut = 1 - wPrim;
  const presets = [
    { label: "Hipoeutéctica (30 % B)", c: 30, t: 650 },
    { label: "Eutéctica (60 % B)", c: 60, t: 520 },
    { label: "Hipereutéctica (80 % B)", c: 80, t: 600 },
  ];

  return (
    <Frame
      stacked
      hint={block.hint ?? "Recorre una vertical de arriba abajo: ¿cuándo empiezan los primeros cristales y cuándo solidifica el eutéctico?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Composición, % de B" value={s.c} min={0} max={100} unit=" %" color={MANIM.green} onChange={(c) => setS((p) => ({ ...p, c }))} />
          <Slider label="Temperatura" value={s.t} min={400} max={950} step={10} unit=" °C" color={MANIM.orange} onChange={(t) => setS((p) => ({ ...p, t }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {presets.map((p) => (
              <button key={p.label} type="button" className={TOOL_BTN} onClick={() => setS({ c: p.c, t: p.t })}>
                {p.label}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Estado">
          {kind === "L"
            ? "Líquido homogéneo"
            : kind === "LA"
              ? "Líquido + cristales de A"
              : kind === "LB"
                ? "Líquido + cristales de B"
                : kind === "eut"
                  ? "Reacción eutéctica (T constante)"
                  : s.c === CE
                    ? "Todo eutéctico (A + B)"
                    : `Cristales de ${prim} + eutéctico (A + B)`}
        </Stat>
        {kind === "LA" || kind === "LB" ? (
          <Stat color={MANIM.blue} label="Reparto">
            Líquido ({fmtEs(cl, 0)} % B): {fmtEs(wl * 100, 0)} % · Sólido: {fmtEs((1 - wl) * 100, 0)} %
          </Stat>
        ) : null}
        {kind === "sol" && s.c !== CE && s.c !== 0 && s.c !== 100 ? (
          <Stat color={MANIM.purple} label="Constituyentes a temperatura ambiente">
            {prim} primario {fmtEs(wPrim * 100, 0)} % · eutéctico {fmtEs(wEut * 100, 0)} %
          </Stat>
        ) : null}
      </Readout>
      <Svg w={560} h={300} maxH={235} testId="tool-diagrama-eutectico">
        <polygon points={`${ex(0)},${ey(TA)} ${ex(CE)},${ey(TE)} ${ex(100)},${ey(TB)} ${ex(100)},${ey(950)} ${ex(0)},${ey(950)}`} fill={MANIM.blue} fillOpacity={0.18} />
        <polygon points={`${ex(0)},${ey(TA)} ${ex(CE)},${ey(TE)} ${ex(0)},${ey(TE)}`} fill={MANIM.green} fillOpacity={0.22} />
        <polygon points={`${ex(100)},${ey(TB)} ${ex(CE)},${ey(TE)} ${ex(100)},${ey(TE)}`} fill={MANIM.purple} fillOpacity={0.22} />
        <rect x={ex(0)} y={ey(TE)} width={ex(100) - ex(0)} height={ey(400) - ey(TE)} fill={MANIM.yellow} fillOpacity={0.14} />
        <polyline points={`${ex(0)},${ey(TA)} ${ex(CE)},${ey(TE)} ${ex(100)},${ey(TB)}`} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <line x1={ex(0)} y1={ey(TE)} x2={ex(100)} y2={ey(TE)} stroke={MANIM.orange} strokeWidth={3.5} />
        <line x1={ex(0)} y1={ey(400)} x2={ex(100) + 14} y2={ey(400)} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={ex(0)} y1={ey(400)} x2={ex(0)} y2={ey(950) - 6} stroke={MANIM.muted} strokeWidth={2} />
        <text x={ex(70)} y={ey(840)} fill={MANIM.blue} fontSize={20} fontWeight={700}>L</text>
        <text x={ex(14)} y={ey(690)} fill={MANIM.green} fontSize={16} fontWeight={700}>L + A</text>
        <text x={ex(83)} y={ey(590)} fill={MANIM.purple} fontSize={16} fontWeight={700}>L + B</text>
        <text x={ex(24)} y={ey(450)} fill={MANIM.yellow} fontSize={15} fontWeight={700}>A + (A+B)</text>
        <text x={ex(78)} y={ey(450)} fill={MANIM.yellow} fontSize={15} fontWeight={700}>B + (A+B)</text>
        <text x={ex(0)} y={ey(400) + 22} fill={MANIM.muted} fontSize={14} textAnchor="middle">100 % A</text>
        <text x={ex(100)} y={ey(400) + 22} fill={MANIM.muted} fontSize={14} textAnchor="middle">100 % B</text>
        <text x={ex(CE)} y={ey(TE) + 36} fill={MANIM.orange} fontSize={14} textAnchor="middle">eutéctico (60 % B)</text>
        {kind === "LA" || kind === "LB" ? (
          <g>
            <line x1={ex(left ? 0 : cl)} y1={ey(s.t)} x2={ex(left ? cl : 100)} y2={ey(s.t)} stroke={MANIM.red} strokeWidth={3} />
            <circle cx={ex(cl)} cy={ey(s.t)} r={5} fill={MANIM.yellow} />
          </g>
        ) : null}
        <line x1={ex(s.c)} y1={ey(950)} x2={ex(s.c)} y2={ey(400)} stroke={MANIM.ink} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.6} />
        <circle cx={ex(s.c)} cy={ey(s.t)} r={8} fill={MANIM.ink} stroke={MANIM.red} strokeWidth={3} />
      </Svg>
      <Note>
        T(A) = {TA} °C, T(B) = {TB} °C y eutéctico a {TE} °C con {CE} % de B (esquema como el de la figura 2.16).
      </Note>
    </Frame>
  );
}

/* ───────────── Fe-C: fases y constituyentes ───────────── */

const FX = (c: number) => 70 + c * 270;
const FY = (t: number) => 296 - (t - 500) * 0.23;
const feLiq = (c: number) => 1539 - 95.1 * c;
const feSol = (c: number) => 1539 - 232.4 * c;
const feA3 = (c: number) => 910 - (187 / 0.89) * c;
const feAcm = (c: number) => 723 + (407 / 0.87) * (c - 0.89);

export function FeCExplorador({ block }: { block: ToolBlock }) {
  const init = { c: num(block.params?.a, 0.4, 0.05, 1.7), t: Math.round(num(block.params?.b, 600, 500, 1600) / 10) * 10 };
  const [s, setS] = useState({ c: Math.round(init.c * 100) / 100, t: init.t });
  const eut = Math.abs(s.c - 0.89) < 0.005;
  const hypo = s.c < 0.89 && !eut;
  const cross = hypo ? feA3(s.c) : feAcm(s.c);

  let region: string;
  let detail = "";
  if (s.t > feLiq(s.c)) {
    region = "Líquido";
  } else if (s.t > feSol(s.c)) {
    region = "Austenita + líquido";
  } else if (eut ? s.t > 723 : s.t > cross) {
    region = "Austenita (γ)";
  } else if (s.t > 723) {
    if (hypo) {
      const cg = ((910 - s.t) * 0.89) / 187;
      const wa = (cg - s.c) / cg;
      region = "Ferrita (α) + austenita";
      detail = `Ferrita ${fmtEs(wa * 100, 0)} % · austenita ${fmtEs((1 - wa) * 100, 0)} % (con ${fmtEs(cg, 2)} % C)`;
    } else {
      const cg = 0.89 + ((s.t - 723) * 0.87) / 407;
      const wc = (s.c - cg) / (6.67 - cg);
      region = "Austenita + cementita";
      detail = `Cementita ${fmtEs(wc * 100, 1)} % · austenita ${fmtEs((1 - wc) * 100, 1)} % (con ${fmtEs(cg, 2)} % C)`;
    }
  } else if (eut) {
    region = "Perlita";
    detail = "100 % perlita";
  } else if (hypo) {
    const wp = s.c / 0.89;
    region = "Ferrita + perlita";
    detail = `Perlita ${fmtEs(wp * 100, 0)} % · ferrita proeutectoide ${fmtEs((1 - wp) * 100, 0)} %`;
  } else {
    const wc = (s.c - 0.89) / (6.67 - 0.89);
    region = "Cementita + perlita";
    detail = `Perlita ${fmtEs((1 - wc) * 100, 1)} % · cementita proeutectoide ${fmtEs(wc * 100, 1)} %`;
  }
  const name = eut ? "eutectoide" : hypo ? "hipoeutectoide" : "hipereutectoide";

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el carbono y la temperatura. A temperatura ambiente, ¿cuánta perlita hay en cada acero?"}
      onReset={() => setS({ c: Math.round(init.c * 100) / 100, t: init.t })}
      controls={
        <>
          <Slider label="Carbono, % en peso" value={s.c} min={0.05} max={1.7} step={0.01} format={(v) => fmtEs(v, 2)} unit=" %" color={MANIM.green} onChange={(c) => setS((p) => ({ ...p, c }))} />
          <Slider label="Temperatura" value={s.t} min={500} max={1600} step={10} unit=" °C" color={MANIM.orange} onChange={(t) => setS((p) => ({ ...p, t }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={`Acero ${name}`}>
          {region}
        </Stat>
        {detail ? <span className="text-base text-[color:var(--stage-ink,#fff)]">{detail}</span> : null}
      </Readout>
      <Svg w={560} h={320} maxH={235} testId="tool-fec">
        <line x1={FX(0)} y1={FY(1650)} x2={FX(0)} y2={FY(500)} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={FX(0)} y1={FY(500)} x2={FX(1.9)} y2={FY(500)} stroke={MANIM.muted} strokeWidth={2} />
        <polyline points={`${FX(0)},${FY(1539)} ${FX(1.8)},${FY(feLiq(1.8))}`} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <polyline points={`${FX(0)},${FY(1539)} ${FX(1.76)},${FY(1130)}`} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <polyline points={`${FX(0)},${FY(910)} ${FX(0.89)},${FY(723)}`} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <polyline points={`${FX(0.89)},${FY(723)} ${FX(1.76)},${FY(1130)}`} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        <polyline points={`${FX(0)},${FY(723)} ${FX(1.76)},${FY(723)}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
        <text x={FX(1.4)} y={FY(1575)} fill={MANIM.blue} fontSize={18} fontWeight={700}>Líquido</text>
        <text x={FX(1.0)} y={FY(1120)} fill={MANIM.muted} fontSize={16}>Austenita γ</text>
        <text x={FX(0.15)} y={FY(830)} fill={MANIM.muted} fontSize={13}>α + γ</text>
        <text x={FX(0.3)} y={FY(620)} fill={MANIM.muted} fontSize={13}>α + perlita</text>
        <text x={FX(1.25)} y={FY(620)} fill={MANIM.muted} fontSize={13}>Fe₃C + perlita</text>
        <text x={FX(1.4)} y={FY(880)} fill={MANIM.muted} fontSize={13}>γ + Fe₃C</text>
        <text x={FX(0) - 6} y={FY(723) + 5} fill={MANIM.yellow} fontSize={13} textAnchor="end">A₁</text>
        <text x={FX(0) - 6} y={FY(910) + 5} fill={MANIM.green} fontSize={13} textAnchor="end">A₃</text>
        <text x={FX(0.89)} y={FY(500) + 20} fill={MANIM.muted} fontSize={13} textAnchor="middle">0,89</text>
        <text x={FX(1.76)} y={FY(500) + 20} fill={MANIM.muted} fontSize={13} textAnchor="middle">1,76 % C</text>
        <line x1={FX(s.c)} y1={FY(1650)} x2={FX(s.c)} y2={FY(500)} stroke={MANIM.ink} strokeWidth={1.5} strokeDasharray="4 4" opacity={0.6} />
        <circle cx={FX(s.c)} cy={FY(s.t)} r={8} fill={MANIM.ink} stroke={MANIM.red} strokeWidth={3} />
      </Svg>
      <Note>
        Valores del libro: eutectoide en 0,89 % de C y máxima solubilidad del carbono en la austenita en 1,76 % (otros textos usan 0,77 % y 2,11 %).
      </Note>
    </Frame>
  );
}

/* ───────────── Clasificación hierro-acero-fundición por carbono ───────────── */

const ZONAS = [
  { from: 0, to: 0.03, color: "#9aa7b8", name: "Hierro (< 0,03 % C)" },
  { from: 0.03, to: 0.1, color: "#6f7d90", name: "Entre hierro y acero (0,03–0,10 % C)" },
  { from: 0.1, to: 0.89, color: MANIM.blue, name: "Acero hipoeutectoide" },
  { from: 0.89, to: 1.76, color: MANIM.green, name: "Acero hipereutectoide" },
  { from: 1.76, to: 4.3, color: MANIM.orange, name: "Fundición hipoeutéctica" },
  { from: 4.3, to: 5, color: MANIM.red, name: "Fundición hipereutéctica" },
  { from: 5, to: 6.67, color: MANIM.purple, name: "Más del 5 %: fuera de las fundiciones habituales" },
] as const;

export function AceroClasificador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 0.45, 0, 6.67) * 100) / 100;
  const [c, setC] = useState(init);
  const zona = ZONAS.find((z) => c >= z.from && c < z.to) ?? ZONAS[ZONAS.length - 1]!;
  const eut = Math.abs(c - 0.89) < 0.005;
  const forjable = c >= 0.1 && c <= 1.76;
  const W = 520;
  const sx = (v: number) => 20 + (v / 6.67) * (W - 40);

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el porcentaje de carbono y mira en qué grupo cae la aleación."}
      onReset={() => setC(init)}
      controls={<Slider label="Carbono, % en peso" value={c} min={0} max={6.67} step={0.01} format={(v) => fmtEs(v, 2)} unit=" %" color={MANIM.yellow} onChange={setC} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Clasificación">
          {eut ? "Acero eutectoide (100 % perlita)" : zona.name}
        </Stat>
        <span className="text-base text-[color:var(--stage-ink,#fff)]">
          {forjable ? "Se puede forjar." : c > 1.76 && c <= 5 ? "No se puede forjar: se moldea." : c >= 6.67 ? "Cementita pura, Fe₃C." : ""}
        </span>
      </Readout>
      <Svg w={W} h={130} testId="tool-acero-clasificador">
        {ZONAS.map((z) => (
          <rect key={z.name} x={sx(z.from)} y={40} width={Math.max(2, sx(z.to) - sx(z.from))} height={36} fill={z.color} fillOpacity={0.75} stroke={MANIM.surface} strokeWidth={1.5} />
        ))}
        {[0, 0.89, 1.76, 4.3, 5, 6.67].map((v) => (
          <text key={v} x={sx(v)} y={102} fill={MANIM.muted} fontSize={13} textAnchor="middle">
            {fmtEs(v, 2)}
          </text>
        ))}
        <polygon points={`${sx(c)},38 ${sx(c) - 9},16 ${sx(c) + 9},16`} fill={MANIM.ink} className="anim-t" />
      </Svg>
    </Frame>
  );
}
