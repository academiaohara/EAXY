"use client";

import { useMemo, useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { ESTATURAS_40, boxStats, groupData, intervalLength, tableStats } from "@/components/lesson/anim/est";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const d2 = (x: number) => fmtEs(Math.round(x * 100) / 100, 2);
const thou = (x: number) => String(Math.round(x)).replace(/\B(?=(\d{3})+(?!\d))/g, " ");

/* ───────────── Parámetros con tabla de frecuencias ───────────── */

const PRESETS = [
  { name: "Test de 0 a 5", xs: [0, 1, 2, 3, 4, 5], fs: [12, 31, 86, 92, 48, 19], label: "xᵢ" },
  { name: "Pesos agrupados (marcas de clase)", xs: [48, 59, 70, 81, 92, 103], fs: [4, 19, 86, 72, 41, 7], label: "marca" },
  { name: "Estaturas de 40 jóvenes (marcas)", xs: [151, 156, 161, 166, 171, 176], fs: [2, 4, 11, 14, 5, 4], label: "marca" },
];

export function TablaParametrosExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 0, 0, PRESETS.length - 1);
  const [idx, setIdx] = useState(idx0);
  const [fs, setFs] = useState(PRESETS[idx0]!.fs);
  const p = PRESETS[idx]!;
  const rows = p.xs.map((x, i) => ({ x, f: fs[i]! }));
  const s = tableStats(rows);
  const pick = (i: number) => {
    setIdx(i);
    setFs(PRESETS[i]!.fs);
  };

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las frecuencias y observa cómo se mueven la media y la desviación típica."}
      onReset={() => pick(idx0)}
      controls={
        <>
          <div className="flex flex-wrap gap-2 sm:col-span-2">
            {PRESETS.map((q, i) => (
              <button key={q.name} type="button" className={`${TOOL_BTN} ${i === idx ? "border-white bg-white/20" : ""}`} aria-pressed={i === idx} onClick={() => pick(i)}>
                {q.name}
              </button>
            ))}
          </div>
          {p.xs.map((x, i) => (
            <Slider key={`${idx}-${x}`} label={`Frecuencia de ${x}`} value={fs[i]!} min={0} max={120} color={MANIM.blue} onChange={(v) => setFs((cur) => cur.map((c, k) => (k === i ? v : c)))} />
          ))}
        </>
      }
    >
      <div className="overflow-x-auto text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <table className="w-full min-w-[360px] border-collapse text-center text-base tabular-nums">
          <thead>
            <tr className="text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="p-1">{p.label}</th>
              <th className="p-1">fᵢ</th>
              <th className="p-1">fᵢ·xᵢ</th>
              <th className="p-1">fᵢ·xᵢ²</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.x}>
                <td className="p-1">{r.x}</td>
                <td className="p-1">{r.f}</td>
                <td className="p-1">{thou(r.f * r.x)}</td>
                <td className="p-1">{thou(r.f * r.x * r.x)}</td>
              </tr>
            ))}
            <tr className="border-t border-[color:var(--stage-border,#3d4f66)] font-bold">
              <td className="p-1">Σ</td>
              <td className="p-1" data-testid="tool-tp-n">{s.n}</td>
              <td className="p-1" data-testid="tool-tp-sumfx">{thou(s.sumFx)}</td>
              <td className="p-1">{thou(s.sumFx2)}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-2 flex flex-wrap gap-x-6 gap-y-1 text-lg font-semibold">
          <span style={{ color: MANIM.blue }} data-testid="tool-tp-media">{`x̄ = ${d2(s.mean)}`}</span>
          <span style={{ color: MANIM.orange }} data-testid="tool-tp-var">{`Var = ${d2(s.variance)}`}</span>
          <span style={{ color: MANIM.green }} data-testid="tool-tp-sd">{`σ = ${d2(s.sd)}`}</span>
          <span style={{ color: MANIM.yellow }} data-testid="tool-tp-cv">{`C.V. = ${fmtEs(Math.round(s.cv * 1000) / 10, 1)} %`}</span>
        </div>
        <MathRenderer text={`$\\bar{x} = \\dfrac{\\sum f_i x_i}{N} = \\dfrac{${thou(s.sumFx)}}{${s.n}}\\qquad \\text{Var} = \\dfrac{\\sum f_i x_i^2}{N} - \\bar{x}^2$`} className="text-base" />
      </div>
    </Frame>
  );
}

/* ───────────── Agrupar en intervalos ───────────── */

export function AgruparExplorador({ block }: { block: ToolBlock }) {
  const init = [6, 8, 10].includes(Number(block.params?.a)) ? Number(block.params?.a) : 6;
  const [k, setK] = useState(init);
  const { range, rPrime, len } = intervalLength(Math.min(...ESTATURAS_40), Math.max(...ESTATURAS_40), k);
  const groups = useMemo(() => groupData(ESTATURAS_40, 148.5, len, k), [len, k]);
  const maxC = Math.max(...groups.map((g) => g.count));
  const s = tableStats(groups.map((g) => ({ x: g.mark, f: g.count })));

  return (
    <Frame
      hint={block.hint ?? "Cambia el número de intervalos: la longitud es r′ / k, con r′ un múltiplo de k algo mayor que el recorrido."}
      onReset={() => setK(init)}
      controls={
        <div className="flex flex-wrap gap-2">
          {[6, 8, 10].map((n) => (
            <button key={n} type="button" className={`${TOOL_BTN} ${n === k ? "border-white bg-white/20" : ""}`} aria-pressed={n === k} onClick={() => setK(n)}>
              {`${n} intervalos`}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-base" data-testid="tool-agr-len">{`Recorrido r = ${range} · r′ = ${rPrime} · longitud de cada intervalo = ${len}`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-agr-marcas">{`Marcas de clase: ${groups.map((g) => fmtEs(g.mark, 2)).join(" · ")}`}</p>
        <p className="text-sm" data-testid="tool-agr-freq">{`Frecuencias: ${groups.map((g) => g.count).join(" · ")} (total ${groups.reduce((a, g) => a + g.count, 0)})`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{`Media con marcas: ${d2(s.mean)} cm · σ = ${d2(s.sd)} cm`}</p>
      </div>
      <svg viewBox="0 0 420 170" className="w-full" aria-hidden data-testid="tool-agr">
        <line x1={20} y1={140} x2={410} y2={140} stroke={MANIM.grid} strokeWidth={2} />
        {groups.map((g, i) => {
          const w = 380 / k;
          const h = (g.count / maxC) * 110;
          return (
            <g key={i}>
              <rect x={20 + i * w} y={140 - h} width={w - 2} height={h} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.blue} />
              <text x={20 + i * w + (w - 2) / 2} y={134 - h} textAnchor="middle" fontSize={11} fill={MANIM.ink}>{g.count}</text>
              <text x={20 + i * w + (w - 2) / 2} y={156} textAnchor="middle" fontSize={9} fill={MANIM.muted}>{fmtEs(g.mark, 1)}</text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

/* ───────────── Cuartiles y diagrama de caja ───────────── */

const SETS: { name: string; data: number[]; free: boolean }[] = [
  { name: "17 datos", data: [1, 1, 2, 3, 4, 4, 5, 5, 5, 5, 6, 7, 7, 7, 8, 9, 10], free: false },
  { name: "Estaturas (40)", data: [149, 150, 154, 156, 157, 158, 159, 160, 160, 160, 161, 162, 162, 163, 163, 163, 163, 164, 165, 166, 166, 166, 167, 167, 167, 168, 168, 168, 169, 169, 170, 170, 170, 171, 172, 173, 174, 175, 175, 189], free: true },
  { name: "Test A (15)", data: [25, 22, 27, 30, 23, 22, 31, 18, 24, 25, 32, 35, 20, 28, 30], free: false },
  { name: "Test B (7)", data: [27, 32, 19, 22, 25, 30, 21], free: false },
];

export function CuartilesExplorador({ block }: { block: ToolBlock }) {
  const i0 = int(block.params?.a, 1, 0, SETS.length - 1);
  const [i, setI] = useState(i0);
  const [last, setLast] = useState(189);
  const set = SETS[i]!;
  const data = useMemo(() => (set.free ? [...set.data.slice(0, -1), last] : set.data), [set, last]);
  const b = boxStats(data);
  const lo = Math.min(...data) - 2;
  const hi = Math.max(...data) + 2;
  const X = (v: number) => 20 + ((v - lo) / (hi - lo)) * 380;
  const f1 = (v: number) => fmtEs(v, 2);

  return (
    <Frame
      hint={block.hint ?? "Elige una distribución. En la de estaturas, mueve el mayor valor: cuando se aleja demasiado de la caja, pasa a ser un valor atípico (asterisco)."}
      onReset={() => {
        setI(i0);
        setLast(189);
      }}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {SETS.map((q, k) => (
              <button key={q.name} type="button" className={`${TOOL_BTN} ${k === i ? "border-white bg-white/20" : ""}`} aria-pressed={k === i} onClick={() => setI(k)}>
                {q.name}
              </button>
            ))}
          </div>
          {set.free ? <Slider label="Mayor valor" value={last} min={175} max={200} color={MANIM.red} unit=" cm" onChange={setLast} /> : null}
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-cuart-valores">{`Q1 = ${f1(b.q1)} · Me = ${f1(b.me)} · Q3 = ${f1(b.q3)}`}</p>
        <p className="text-sm" data-testid="tool-cuart-caja">{`N = ${b.n} · caja = ${f1(b.iqr)} · bigotes hasta ${f1(b.low)} y ${f1(b.high)} como máximo`}</p>
        <p className="text-sm" style={{ color: b.highOut.length + b.lowOut.length > 0 ? MANIM.red : MANIM.muted }} data-testid="tool-cuart-atipicos">
          {b.highOut.length + b.lowOut.length > 0 ? `Valores atípicos: ${[...b.lowOut, ...b.highOut].join(", ")}` : "No hay valores atípicos"}
        </p>
      </div>
      <svg viewBox="0 0 420 110" className="w-full" aria-hidden data-testid="tool-cuart">
        <line x1={X(lo)} y1={95} x2={X(hi)} y2={95} stroke={MANIM.grid} strokeWidth={2} />
        <rect x={X(b.q1)} y={30} width={X(b.q3) - X(b.q1)} height={40} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={3} />
        <line x1={X(b.me)} y1={30} x2={X(b.me)} y2={70} stroke={MANIM.yellow} strokeWidth={4} />
        <line x1={X(b.whiskerLow)} y1={50} x2={X(b.q1)} y2={50} stroke={MANIM.blue} strokeWidth={3} />
        <line x1={X(b.q3)} y1={50} x2={X(b.whiskerHigh)} y2={50} stroke={MANIM.blue} strokeWidth={3} />
        <line x1={X(b.whiskerLow)} y1={40} x2={X(b.whiskerLow)} y2={60} stroke={MANIM.blue} strokeWidth={3} />
        <line x1={X(b.whiskerHigh)} y1={40} x2={X(b.whiskerHigh)} y2={60} stroke={MANIM.blue} strokeWidth={3} />
        {[...b.lowOut, ...b.highOut].map((o) => (
          <text key={o} x={X(o)} y={58} textAnchor="middle" fontSize={26} fill={MANIM.red}>*</text>
        ))}
      </svg>
    </Frame>
  );
}

/* ───────────── Comparar dispersiones ───────────── */

export function DispersionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ma: int(ini[0], 100, 1, 300), sa: int(ini[1], 25, 1, 100), mb: int(ini[2], 15, 1, 300), sb: int(ini[3], 5, 1, 100) };
  const [v, setV] = useState(init);
  const cvA = v.sa / 2 / v.ma;
  const cvB = v.sb / 2 / v.mb;
  const mayor = Math.abs(cvA - cvB) < 1e-9 ? "Misma variación relativa" : cvA > cvB ? "La empresa A tiene más variación relativa" : "La empresa B tiene más variación relativa";
  const pct = (x: number) => `${fmtEs(Math.round(x * 1000) / 10, 1)} %`;
  const set = (k: keyof typeof init) => (n: number) => setV((s) => ({ ...s, [k]: n }));

  return (
    <Frame
      hint={block.hint ?? "El coeficiente de variación σ / x̄ permite comparar la dispersión de grupos con medias muy distintas."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Media de A (miles de €)" value={v.ma} min={1} max={300} color={MANIM.blue} onChange={set("ma")} />
          <Slider label="Desviación típica de A (miles de €)" value={v.sa / 2} min={0.5} max={50} step={0.5} color={MANIM.blue} onChange={(x) => setV((s) => ({ ...s, sa: Math.round(x * 2) }))} format={(x) => fmtEs(x, 1)} />
          <Slider label="Media de B (miles de €)" value={v.mb} min={1} max={300} color={MANIM.orange} onChange={set("mb")} />
          <Slider label="Desviación típica de B (miles de €)" value={v.sb / 2} min={0.5} max={50} step={0.5} color={MANIM.orange} onChange={(x) => setV((s) => ({ ...s, sb: Math.round(x * 2) }))} format={(x) => fmtEs(x, 1)} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-lg font-semibold" style={{ color: MANIM.blue }} data-testid="tool-disp-a">{`C.V. de A = ${pct(cvA)}`}</p>
        <p className="text-lg font-semibold" style={{ color: MANIM.orange }} data-testid="tool-disp-b">{`C.V. de B = ${pct(cvB)}`}</p>
        <p className="text-base" style={{ color: MANIM.green }} data-testid="tool-disp-mayor">{mayor}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">{`σ de A = ${fmtEs(v.sa / 2, 1)} frente a σ de B = ${fmtEs(v.sb / 2, 1)}: la mayor σ no siempre es la mayor variación relativa.`}</p>
      </div>
    </Frame>
  );
}
