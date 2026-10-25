"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const m = (x: number, d = 4) => fmtEs(x, d);
const comb = (n: number, k: number) => {
  let r = 1;
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i;
  return Math.round(r);
};

/** `initial`: [monedas n (1–6), premio por cara en € (0–5), coste de jugar en € (0–6)]. Ganancia X = premio·caras − coste. */
export function DistribucionDiscretaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { n: int(ini[0], 3, 1, 6), p: int(ini[1], 1, 0, 5), c: int(ini[2], 1, 0, 6) };
  const [v, setV] = useState(init);
  const N = 2 ** v.n;
  const filas = Array.from({ length: v.n + 1 }, (_, k) => ({ k, pr: comb(v.n, k) / N, g: v.p * k - v.c }));
  const E = filas.reduce((s, f) => s + f.pr * f.g, 0);
  const Var = filas.reduce((s, f) => s + f.pr * (f.g - E) ** 2, 0);
  const W = 520;
  const H = 150;
  const maxP = Math.max(...filas.map((f) => f.pr));
  const bw = (W - 40) / filas.length;
  return (
    <Frame
      hint={block.hint ?? "Cada fila es un valor de la ganancia con su probabilidad. La media es la suma de ganancia × probabilidad; la varianza, la suma de probabilidad × (ganancia − media)²."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Monedas lanzadas" value={v.n} min={1} max={6} color={MANIM.blue} onChange={(n) => setV((s) => ({ ...s, n }))} />
          <Slider label="Premio por cada cara (€)" value={v.p} min={0} max={5} color={MANIM.green} onChange={(p) => setV((s) => ({ ...s, p }))} />
          <Slider label="Precio de jugar (€)" value={v.c} min={0} max={6} color={MANIM.orange} onChange={(c) => setV((s) => ({ ...s, c }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-dd-grafica">
        <line x1={20} y1={H - 24} x2={W - 20} y2={H - 24} stroke={MANIM.ink} strokeWidth={1.4} />
        {filas.map((f, i) => (
          <g key={f.k}>
            <rect x={20 + i * bw + bw * 0.15} y={H - 24 - (f.pr / maxP) * (H - 50)} width={bw * 0.7} height={(f.pr / maxP) * (H - 50)} fill={f.g >= 0 ? MANIM.green : MANIM.red} fillOpacity={0.6} />
            <text x={20 + i * bw + bw / 2} y={H - 8} fontSize={12} fill={MANIM.muted} textAnchor="middle">{`${f.g}`.replace("-", "−")}</text>
          </g>
        ))}
      </Svg>
      <table className="w-full max-w-xl border-collapse text-sm tabular-nums" data-testid="tool-dd-tabla">
        <tbody>
          <tr><td className="pr-3 text-[color:var(--stage-muted,#b8c2d0)]">Caras</td>{filas.map((f) => <td key={f.k} className="px-1 text-[color:var(--stage-ink,#fff)]">{f.k}</td>)}</tr>
          <tr><td className="pr-3 text-[color:var(--stage-muted,#b8c2d0)]">Ganancia</td>{filas.map((f) => <td key={f.k} className="px-1 text-[color:var(--stage-ink,#fff)]">{`${f.g}`.replace("-", "−")}</td>)}</tr>
          <tr><td className="pr-3 text-[color:var(--stage-muted,#b8c2d0)]">Probabilidad</td>{filas.map((f) => <td key={f.k} className="px-1 text-[color:var(--stage-ink,#fff)]">{`${comb(v.n, f.k)}/${N}`}</td>)}</tr>
        </tbody>
      </table>
      <Readout>
        <Stat color={MANIM.yellow} label="Media μ = E(X)" plain><span data-testid="tool-dd-media">{m(E)}</span></Stat>
        <Stat color={MANIM.blue} label="Varianza σ²" plain><span data-testid="tool-dd-var">{m(Var)}</span></Stat>
        <Stat color={MANIM.green} label="Desv. típica σ" plain><span data-testid="tool-dd-sigma">{m(Math.sqrt(Var))}</span></Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: [k·10 (10–40)]. Desigualdad de Chebychev con X ~ B(20; 0,5): μ = 10, σ = √5. */
export function ChebychevExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { k: int(ini[0], 20, 10, 40) };
  const [v, setV] = useState(init);
  const k = v.k / 10;
  const n = 20;
  const mu = 10;
  const sigma = Math.sqrt(5);
  let exacta = 0;
  for (let x = 0; x <= n; x++) if (Math.abs(x - mu) < k * sigma) exacta += comb(n, x) / 2 ** n;
  const cota = Math.max(0, 1 - 1 / (k * k));
  const W = 520;
  const H = 170;
  const bw = (W - 40) / (n + 1);
  const maxP = comb(n, 10) / 2 ** n;
  return (
    <Frame
      hint={block.hint ?? "Chebychev garantiza que al menos 1 − 1/k² de la distribución está a menos de k desviaciones de la media; el valor real suele ser bastante mayor."}
      onReset={() => setV(init)}
      controls={<Slider label="k (desviaciones típicas)" value={v.k} min={10} max={40} color={MANIM.orange} format={(x) => fmtEs(x / 10, 1)} onChange={(kk) => setV({ k: kk })} />}
    >
      <Svg w={W} h={H} testId="tool-ch-grafica">
        <line x1={20} y1={H - 24} x2={W - 20} y2={H - 24} stroke={MANIM.ink} strokeWidth={1.4} />
        {Array.from({ length: n + 1 }, (_, x) => {
          const dentro = Math.abs(x - mu) < k * sigma;
          const h = (comb(n, x) / 2 ** n / maxP) * (H - 50);
          return <rect key={x} x={20 + x * bw + 1.5} y={H - 24 - h} width={bw - 3} height={h} fill={dentro ? MANIM.green : MANIM.red} fillOpacity={0.6} />;
        })}
        <text x={W / 2} y={H - 6} fontSize={12} fill={MANIM.muted} textAnchor="middle">B(20; 0,5): μ = 10, σ ≈ 2,236</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label={`P(|X − μ| < ${fmtEs(k, 1)}σ) exacta`} plain><span data-testid="tool-ch-exacta">{m(exacta)}</span></Stat>
        <Stat color={MANIM.yellow} label="Cota de Chebychev ≥ 1 − 1/k²" plain><span data-testid="tool-ch-cota">{m(cota)}</span></Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: [c, d (0–10)]. Variable continua con densidad f(x) = x/50 en [0, 10]: P(c ≤ X ≤ d) = (d² − c²)/100. */
export function DensidadExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { c: int(ini[0], 2, 0, 10), d: int(ini[1], 6, 0, 10) };
  const [v, setV] = useState(init);
  const [lo, hi] = v.c <= v.d ? [v.c, v.d] : [v.d, v.c];
  const prob = (hi * hi - lo * lo) / 100;
  const W = 520;
  const H = 230;
  const px = (x: number) => 30 + (x / 10) * (W - 60);
  const py = (y: number) => H - 30 - (y / 0.2) * (H - 60);
  const sombreado = `${px(lo)},${py(0)} ${px(lo)},${py(lo / 50)} ${px(hi)},${py(hi / 50)} ${px(hi)},${py(0)}`;
  return (
    <Frame
      hint={block.hint ?? "En una variable continua la probabilidad de un intervalo es el área bajo la densidad. Aquí f(x) = x/50 en [0, 10] (el área total vale 1)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Extremo c" value={v.c} min={0} max={10} color={MANIM.blue} onChange={(c) => setV((s) => ({ ...s, c }))} />
          <Slider label="Extremo d" value={v.d} min={0} max={10} color={MANIM.orange} onChange={(d) => setV((s) => ({ ...s, d }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-de-grafica">
        <line x1={20} y1={py(0)} x2={W - 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.6} />
        <polygon points={sombreado} fill={MANIM.yellow} fillOpacity={0.4} />
        <polyline points={`${px(0)},${py(0)} ${px(10)},${py(0.2)} ${px(10)},${py(0)}`} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        {[0, 2, 4, 6, 8, 10].map((x) => <text key={x} x={px(x)} y={H - 10} fontSize={12} fill={MANIM.muted} textAnchor="middle">{x}</text>)}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label={`P(${lo} ≤ X ≤ ${hi})`} plain><span data-testid="tool-de-prob">{m(prob)}</span></Stat>
        <Stat color={MANIM.green} label="Media E(X)" plain><span data-testid="tool-de-media">{m(20 / 3)}</span></Stat>
      </Readout>
    </Frame>
  );
}

const Z = [1.645, 1.96, 2.575];
const NS = [4, 9, 16, 25, 36, 49, 64, 100, 144, 225, 400];
const NIVELES = [{ value: 0, label: "90 %" }, { value: 1, label: "95 %" }, { value: 2, label: "99 %" }] as const;

/** `initial`: [media muestral, σ (1–30), índice de n (0–10), nivel (0 90 %, 1 95 %, 2 99 %)]. IC = x̄ ± z·σ/√n. */
export function IntervaloMediaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { x: int(ini[0], 100, 0, 200), s: int(ini[1], 15, 1, 30), i: int(ini[2], 7, 0, NS.length - 1), z: int(ini[3], 1, 0, 2) };
  const [v, setV] = useState(init);
  const n = NS[v.i]!;
  const z = Z[v.z]!;
  const E = (z * v.s) / Math.sqrt(n);
  const W = 520;
  const H = 90;
  const lo = v.x - 20;
  const px = (x: number) => 20 + ((x - lo) / 40) * (W - 40);
  return (
    <Frame
      hint={block.hint ?? "El error máximo E = z·σ/√n baja al aumentar n y sube al aumentar el nivel de confianza o la dispersión σ."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Media muestral x̄" value={v.x} min={0} max={200} color={MANIM.blue} onChange={(x) => setV((s) => ({ ...s, x }))} />
          <Slider label="Desviación típica σ" value={v.s} min={1} max={30} color={MANIM.green} onChange={(s) => setV((q) => ({ ...q, s }))} />
          <Slider label="Tamaño de la muestra n" value={v.i} min={0} max={NS.length - 1} color={MANIM.orange} format={(k) => String(NS[k])} onChange={(i) => setV((s) => ({ ...s, i }))} />
          <Choice label="Nivel de confianza" items={NIVELES} value={v.z} onChange={(zz) => setV((s) => ({ ...s, z: zz }))} />
        </>
      }
    >
      <Svg w={W} h={H} testId="tool-im-grafica">
        <line x1={20} y1={50} x2={W - 20} y2={50} stroke={MANIM.ink} strokeWidth={1.4} />
        <rect x={clamp(px(v.x - E), 20, W - 20)} y={36} width={Math.max(clamp(px(v.x + E), 20, W - 20) - clamp(px(v.x - E), 20, W - 20), 1)} height={28} fill={MANIM.yellow} fillOpacity={0.45} stroke={MANIM.yellow} />
        <circle cx={px(v.x)} cy={50} r={5} fill={MANIM.blue} />
        <text x={px(v.x)} y={82} fontSize={12} fill={MANIM.muted} textAnchor="middle">x̄</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label={`Error máximo E = ${fmtEs(z, 3)}·σ/√n`} plain><span data-testid="tool-im-error">{m(E, 3)}</span></Stat>
        <Stat color={MANIM.yellow} label="Intervalo de confianza" plain><span data-testid="tool-im-ic">{`(${m(v.x - E, 3)}; ${m(v.x + E, 3)})`}</span></Stat>
      </Readout>
    </Frame>
  );
}
