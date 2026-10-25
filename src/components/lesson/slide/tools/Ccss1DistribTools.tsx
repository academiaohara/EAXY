"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  aproximable, binomCuantia, binomCdf, binomDesv, binomMedia, binomPmf, binomialANormal, crearAzar, densidadN, desviacion, distribucion, esperanza,
  intervaloProporcion, normalCdf, normalEntre, tablaZ, tipificar, varianza, type Cuantia,
} from "@/components/lesson/anim/distrib1b";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const num = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Number.isFinite(v) ? (v as number) : fallback, lo, hi);
const int = (v: number | undefined, fallback: number, lo: number, hi: number) => Math.round(num(v, fallback, lo, hi));
const m = (x: number, d = 4) => fmtEs(x, d).replace("-", "−");
const cell = "border border-[color:var(--stage-border,#3d4f66)] px-2 py-1 text-center tabular-nums text-sm";

/* ───────────── Distribución de probabilidad de una variable discreta ───────────── */

const sumaDados: Cuantia = Array.from({ length: 11 }, (_, i) => ({ x: i + 2, p: (6 - Math.abs(i - 5)) / 36 }));
const CUANTIAS: { label: string; unit: string; d: Cuantia }[] = [
  { label: "Caras en 2 monedas", unit: "caras", d: [{ x: 0, p: 0.25 }, { x: 1, p: 0.5 }, { x: 2, p: 0.25 }] },
  { label: "Caras en 3 monedas", unit: "caras", d: [{ x: 0, p: 1 / 8 }, { x: 1, p: 3 / 8 }, { x: 2, p: 3 / 8 }, { x: 3, p: 1 / 8 }] },
  { label: "Cincos al tirar 2 dados", unit: "cincos", d: [{ x: 0, p: 25 / 36 }, { x: 1, p: 10 / 36 }, { x: 2, p: 1 / 36 }] },
  { label: "Suma de 2 dados", unit: "suma", d: sumaDados },
  { label: "Ganancia: +20 € por cada 5, −10 € si no sale", unit: "€", d: [{ x: -10, p: 25 / 36 }, { x: 20, p: 10 / 36 }, { x: 40, p: 1 / 36 }] },
];

/** `initial`: [distribución (0–4)]. Tabla de cuantía y de distribución, media y desviación típica. */
export function CuantiaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { t: int(ini[0], 0, 0, CUANTIAS.length - 1) };
  const [v, setV] = useState(init);
  const C = CUANTIAS[v.t]!;
  const mu = esperanza(C.d);
  const sg = desviacion(C.d);
  const maxP = Math.max(...C.d.map((t) => t.p));
  const W = 420;
  const H = 130;
  const bw = Math.min(46, (W - 40) / C.d.length - 6);
  const bx = (i: number) => 20 + (i + 0.5) * ((W - 40) / C.d.length);
  const verdict = mu > 1e-9 ? "ventajoso" : mu < -1e-9 ? "desventajoso" : "equitativo";
  return (
    <Frame
      hint={block.hint ?? "p(x) es la probabilidad de cada valor y F(x) la acumulada. La esperanza μ = Σ x·p(x) es la media teórica; si x es una ganancia, el signo de μ dice si el juego es ventajoso."}
      onReset={() => setV(init)}
      controls={<Choice label="Variable aleatoria" items={CUANTIAS.map((q, i) => ({ value: i, label: q.label }))} value={v.t} onChange={(t) => setV({ t })} />}
    >
      <div className="overflow-x-auto">
        <table className="w-full border-collapse" data-testid="tool-cu-tabla">
          <tbody>
            <tr>
              <th className={cell}>x</th>
              {C.d.map((t) => <td key={t.x} className={cell}>{String(t.x).replace("-", "−")}</td>)}
            </tr>
            <tr>
              <th className={cell}>p(x)</th>
              {C.d.map((t) => <td key={t.x} className={cell} style={{ color: MANIM.blue }}>{m(t.p, 3)}</td>)}
            </tr>
            <tr>
              <th className={cell}>F(x)</th>
              {C.d.map((t) => <td key={t.x} className={cell} style={{ color: MANIM.green }}>{m(distribucion(C.d, t.x), 3)}</td>)}
            </tr>
          </tbody>
        </table>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Media μ" plain>
          <span data-testid="tool-cu-media">{m(mu, 3)}</span>
        </Stat>
        <Stat color={MANIM.orange} label="Varianza σ²" plain>
          <span data-testid="tool-cu-varianza">{m(varianza(C.d), 3)}</span>
        </Stat>
        <Stat color={MANIM.green} label="Desviación σ" plain>
          <span data-testid="tool-cu-desviacion">{m(sg, 3)}</span>
        </Stat>
      </Readout>
      {C.unit === "€" ? (
        <p className="text-sm font-semibold" style={{ color: mu < 0 ? MANIM.red : MANIM.green }} data-testid="tool-cu-juego">{`Juego ${verdict}: en 36 jugadas se espera ${mu < 0 ? "perder" : "ganar"} ${m(Math.abs(mu * 36), 1)} €`}</p>
      ) : null}
      <Svg w={W} h={H} testId="tool-cu-histograma">
        <line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={MANIM.grid} strokeWidth={2} />
        {C.d.map((t, i) => {
          const h = (t.p / maxP) * (H - 50);
          return (
            <g key={t.x}>
              <rect x={bx(i) - bw / 2} y={H - 20 - h} width={bw} height={h} fill={MANIM.blue} fillOpacity={0.8} />
              <text x={bx(i)} y={H - 6} fontSize={11} textAnchor="middle" fill={MANIM.muted}>{String(t.x).replace("-", "−")}</text>
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── Binomial ───────────── */

const MODOS = [
  { value: 0, label: "P(X = k)" },
  { value: 1, label: "P(X ≤ k)" },
  { value: 2, label: "P(X ≥ k)" },
] as const;

/** `initial`: [n (1–40), p % (1–99), k, modo (0 =, 1 ≤, 2 ≥)]. */
export function BinomialExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { n: int(ini[0], 10, 1, 40), p: int(ini[1], 50, 1, 99), k: int(ini[2], 5, 0, 40), modo: int(ini[3], 0, 0, 2) };
  const [v, setV] = useState(init);
  const k = Math.min(v.k, v.n);
  const p = v.p / 100;
  const d = binomCuantia(v.n, p);
  const prob = v.modo === 0 ? binomPmf(v.n, p, k) : v.modo === 1 ? binomCdf(v.n, p, k) : 1 - binomCdf(v.n, p, k - 1);
  const maxP = Math.max(...d.map((t) => t.p));
  const W = 420;
  const H = 150;
  const bw = (W - 40) / (v.n + 1);
  const inSel = (x: number) => (v.modo === 0 ? x === k : v.modo === 1 ? x <= k : x >= k);
  return (
    <Frame
      hint={block.hint ?? "P(X = k) = C(n, k)·pᵏ·qⁿ⁻ᵏ. La media es n·p y la desviación típica √(n·p·q). Con p = 0,5 el histograma es simétrico; si no, se carga hacia un lado."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Pruebas n" value={v.n} min={1} max={40} color={MANIM.blue} onChange={(n) => setV((q) => ({ ...q, n }))} />
          <Slider label="Probabilidad de éxito p" value={v.p} min={1} max={99} color={MANIM.orange} unit=" %" onChange={(pp) => setV((q) => ({ ...q, p: pp }))} />
          <Slider label="Número de éxitos k" value={k} min={0} max={v.n} color={MANIM.yellow} onChange={(kk) => setV((q) => ({ ...q, k: kk }))} />
          <Choice label="Calcular" items={MODOS} value={v.modo} onChange={(modo) => setV((q) => ({ ...q, modo }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label={MODOS[v.modo]!.label.replace("k", String(k))} plain>
          <span data-testid="tool-bn-prob">{m(prob, 4)}</span>
        </Stat>
        <Stat color={MANIM.blue} label="μ = n·p" plain>
          <span data-testid="tool-bn-media">{m(binomMedia(v.n, p), 3)}</span>
        </Stat>
        <Stat color={MANIM.green} label="σ = √(n·p·q)" plain>
          <span data-testid="tool-bn-desv">{m(binomDesv(v.n, p), 3)}</span>
        </Stat>
      </Readout>
      <Svg w={W} h={H} testId="tool-bn-histograma">
        <line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={MANIM.grid} strokeWidth={2} />
        {d.map((t) => {
          const h = (t.p / maxP) * (H - 40);
          return <rect key={t.x} x={20 + t.x * bw + 1} y={H - 20 - h} width={Math.max(2, bw - 2)} height={Math.max(1, h)} fill={inSel(t.x) ? MANIM.yellow : MANIM.blue} fillOpacity={inSel(t.x) ? 0.95 : 0.6} />;
        })}
        {v.n <= 20 ? d.map((t) => <text key={t.x} x={20 + (t.x + 0.5) * bw} y={H - 6} fontSize={10} textAnchor="middle" fill={MANIM.muted}>{t.x}</text>) : null}
      </Svg>
    </Frame>
  );
}

/* ───────────── Normal N(μ, σ) ───────────── */

const NMODOS = [
  { value: 0, label: "P(a < X < b)" },
  { value: 1, label: "P(X < a)" },
  { value: 2, label: "P(X > a)" },
] as const;

/** `initial`: [μ (−50–200), σ (1–40), a, b, modo (0 entre, 1 menor, 2 mayor)]. */
export function NormalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    mu: int(ini[0], 100, -50, 200),
    s: int(ini[1], 15, 1, 40),
    a: int(ini[2], 85, -100, 300),
    b: int(ini[3], 130, -100, 300),
    modo: int(ini[4], 0, 0, 2),
  };
  const [v, setV] = useState(init);
  const lo = Math.min(v.a, v.b);
  const hi = Math.max(v.a, v.b);
  const prob = v.modo === 0 ? normalEntre(lo, hi, v.mu, v.s) : v.modo === 1 ? normalCdf(v.a, v.mu, v.s) : 1 - normalCdf(v.a, v.mu, v.s);
  const W = 420;
  const H = 150;
  const x0 = v.mu - 4 * v.s;
  const x1 = v.mu + 4 * v.s;
  const X = (x: number) => 20 + ((x - x0) / (x1 - x0)) * (W - 40);
  const top = densidadN(v.mu, v.mu, v.s);
  const Y = (y: number) => H - 22 - (y / top) * (H - 40);
  const N = 120;
  const pts = Array.from({ length: N + 1 }, (_, i) => {
    const x = x0 + (i / N) * (x1 - x0);
    return [x, densidadN(x, v.mu, v.s)] as const;
  });
  const shadeFrom = v.modo === 0 ? lo : v.modo === 1 ? x0 : v.a;
  const shadeTo = v.modo === 0 ? hi : v.modo === 1 ? v.a : x1;
  const shade = pts.filter(([x]) => x >= shadeFrom && x <= shadeTo);
  const shadePath = shade.length > 1 ? `M ${X(shade[0]![0])} ${Y(0)} ${shade.map(([x, y]) => `L ${X(x)} ${Y(y)}`).join(" ")} L ${X(shade[shade.length - 1]![0])} ${Y(0)} Z` : "";
  return (
    <Frame
      hint={block.hint ?? "El área sombreada es la probabilidad. Tipifica con z = (x − μ)/σ y mira Φ(z): entre μ − σ y μ + σ hay un 68 %, entre μ ± 2σ un 95 % y entre μ ± 3σ un 99,7 %."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Media μ" value={v.mu} min={-50} max={200} color={MANIM.blue} onChange={(mu) => setV((q) => ({ ...q, mu }))} />
          <Slider label="Desviación típica σ" value={v.s} min={1} max={40} color={MANIM.orange} onChange={(s) => setV((q) => ({ ...q, s }))} />
          <Slider label="a" value={v.a} min={-100} max={300} color={MANIM.yellow} onChange={(a) => setV((q) => ({ ...q, a }))} />
          <Slider label="b" value={v.b} min={-100} max={300} color={MANIM.green} onChange={(b) => setV((q) => ({ ...q, b }))} disabled={v.modo !== 0} />
          <Choice label="Calcular" items={NMODOS} value={v.modo} onChange={(modo) => setV((q) => ({ ...q, modo }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Probabilidad" plain>
          <span data-testid="tool-no-prob">{m(prob, 4)}</span>
        </Stat>
        <Stat color={MANIM.blue} label={v.modo === 0 ? "z de a y b" : "z de a"} plain>
          <span data-testid="tool-no-z">{v.modo === 0 ? `${m(tipificar(lo, v.mu, v.s), 2)} y ${m(tipificar(hi, v.mu, v.s), 2)}` : m(tipificar(v.a, v.mu, v.s), 2)}</span>
        </Stat>
      </Readout>
      <Svg w={W} h={H} testId="tool-no-campana">
        <line x1={20} y1={Y(0)} x2={W - 20} y2={Y(0)} stroke={MANIM.grid} strokeWidth={2} />
        {shadePath ? <path d={shadePath} fill={MANIM.yellow} fillOpacity={0.4} /> : null}
        <polyline points={pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <line x1={X(v.mu)} y1={Y(0)} x2={X(v.mu)} y2={Y(top)} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="4 4" />
        {[-3, -2, -1, 1, 2, 3].map((k) => (
          <text key={k} x={X(v.mu + k * v.s)} y={H - 6} fontSize={10} textAnchor="middle" fill={MANIM.muted}>{`${k > 0 ? "+" : "−"}${Math.abs(k)}σ`}</text>
        ))}
        <text x={X(v.mu)} y={H - 6} fontSize={10} textAnchor="middle" fill={MANIM.ink}>μ</text>
      </Svg>
    </Frame>
  );
}

/* ───────────── Tabla de la normal estándar ───────────── */

/** `initial`: [z·100 (−400 a 400)]. */
export function TablaNormalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { z100: int(ini[0], 146, -400, 400) };
  const [v, setV] = useState(init);
  const z = v.z100 / 100;
  const az = Math.abs(z);
  const fila = Math.min(39, Math.floor(Math.round(az * 100) / 10));
  const col = Math.round(az * 100) % 10;
  const filas = Array.from({ length: 5 }, (_, i) => Math.max(0, Math.min(35, fila - 2) + i));
  const cols = Array.from({ length: 5 }, (_, i) => Math.max(0, Math.min(5, col - 2)) + i);
  return (
    <Frame
      hint={block.hint ?? "La tabla solo trae z ≥ 0: la fila da las décimas y la columna las centésimas. Para z negativo se usa la simetría Φ(−z) = 1 − Φ(z)."}
      onReset={() => setV(init)}
      controls={<Slider label="z" value={v.z100} min={-400} max={400} step={1} color={MANIM.yellow} onChange={(z100) => setV({ z100 })} format={(x) => m(x / 100, 2)} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label={`P(Z ≤ ${m(z, 2)})`} plain>
          <span data-testid="tool-tn-menor">{m(tablaZ(z), 4)}</span>
        </Stat>
        <Stat color={MANIM.blue} label={`P(Z > ${m(z, 2)})`} plain>
          <span data-testid="tool-tn-mayor">{m(1 - tablaZ(z), 4)}</span>
        </Stat>
        <Stat color={MANIM.green} label={`P(−${m(az, 2)} < Z < ${m(az, 2)})`} plain>
          <span data-testid="tool-tn-central">{m(2 * tablaZ(az) - 1, 4)}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-tn-consulta">
        {z >= 0 ? `Fila ${m(fila / 10, 1)}, columna 0,0${col}` : `Φ(${m(z, 2)}) = 1 − Φ(${m(az, 2)}) = 1 − ${m(tablaZ(az), 4)}`}
      </p>
      <table className="w-full table-fixed border-collapse" data-testid="tool-tn-tabla">
        <thead>
          <tr>
            <th className={cell}>z</th>
            {cols.map((c) => <th key={c} className={cell} style={{ color: c === col ? MANIM.yellow : undefined }}>{`0,0${c}`}</th>)}
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f}>
              <th className={cell} style={{ color: f === fila ? MANIM.yellow : undefined }}>{m(f / 10, 1)}</th>
              {cols.map((c) => (
                <td key={c} className={cell} style={f === fila && c === col ? { background: MANIM.yellow, color: "#101418", fontWeight: 700 } : undefined}>
                  {tablaZ(f / 10 + c / 100).toFixed(4).replace(".", ",")}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

/* ───────────── Aproximación de la binomial por la normal ───────────── */

/** `initial`: [n (4–200), p % (1–99), a, b]. Probabilidad P(a ≤ X ≤ b) exacta y aproximada. */
export function BinomialNormalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { n: int(ini[0], 100, 4, 200), p: int(ini[1], 50, 1, 99), a: int(ini[2], 45, 0, 200), b: int(ini[3], 55, 0, 200) };
  const [v, setV] = useState(init);
  const p = v.p / 100;
  const lo = Math.min(v.a, v.b, v.n);
  const hi = Math.min(Math.max(v.a, v.b), v.n);
  const mu = v.n * p;
  const s = binomDesv(v.n, p);
  const exacta = binomCdf(v.n, p, hi) - binomCdf(v.n, p, lo - 1);
  const aprox = binomialANormal(v.n, p, lo, hi, true);
  const sin = binomialANormal(v.n, p, lo, hi, false);
  const ok = aproximable(v.n, p);
  const W = 420;
  const H = 160;
  const x0 = Math.max(0, mu - 4.5 * s - 1);
  const x1 = Math.min(v.n, mu + 4.5 * s + 1);
  const bw = (W - 40) / (x1 - x0 + 1);
  const X = (x: number) => 20 + (x - x0 + 0.5) * bw;
  const maxP = Math.max(...Array.from({ length: Math.floor(x1 - x0) + 1 }, (_, i) => binomPmf(v.n, p, Math.round(x0) + i)), 1e-9);
  const Y = (y: number) => H - 20 - (y / (Math.max(maxP, densidadN(mu, mu, s)) * 1.1)) * (H - 36);
  const curve = Array.from({ length: 81 }, (_, i) => {
    const x = x0 + (i / 80) * (x1 - x0);
    return `${X(x)},${Y(densidadN(x, mu, s))}`;
  });
  const xs = Array.from({ length: Math.floor(x1 - x0) + 1 }, (_, i) => Math.round(x0) + i);
  return (
    <Frame
      hint={block.hint ?? "Si n·p·q ≥ 9 la normal N(np, √npq) se ajusta bien a la binomial. Al pasar de un recuento a un intervalo continuo se amplía 0,5 a cada lado (corrección de continuidad)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Pruebas n" value={v.n} min={4} max={200} color={MANIM.blue} onChange={(n) => setV((q) => ({ ...q, n }))} />
          <Slider label="Probabilidad p" value={v.p} min={1} max={99} color={MANIM.orange} unit=" %" onChange={(pp) => setV((q) => ({ ...q, p: pp }))} />
          <Slider label="a (mínimo de éxitos)" value={Math.min(v.a, v.n)} min={0} max={v.n} color={MANIM.yellow} onChange={(a) => setV((q) => ({ ...q, a }))} />
          <Slider label="b (máximo de éxitos)" value={Math.min(v.b, v.n)} min={0} max={v.n} color={MANIM.green} onChange={(b) => setV((q) => ({ ...q, b }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label={`P(${lo} ≤ X ≤ ${hi}) exacta`} plain>
          <span data-testid="tool-bnn-exacta">{m(exacta, 4)}</span>
        </Stat>
        <Stat color={MANIM.green} label="Normal con +0,5" plain>
          <span data-testid="tool-bnn-aprox">{m(aprox, 4)}</span>
        </Stat>
        <Stat color={MANIM.muted} label="Normal sin corregir" plain>
          <span data-testid="tool-bnn-sin">{m(sin, 4)}</span>
        </Stat>
      </Readout>
      <p className="text-sm font-semibold" style={{ color: ok ? MANIM.green : MANIM.orange }} data-testid="tool-bnn-criterio">
        {`n·p·q = ${m(v.n * p * (1 - p), 2)} ${ok ? "≥ 9: la aproximación es buena" : "< 9: la aproximación no es fiable"}`}
      </p>
      <Svg w={W} h={H} testId="tool-bnn-grafica">
        <line x1={20} y1={H - 20} x2={W - 20} y2={H - 20} stroke={MANIM.grid} strokeWidth={2} />
        {xs.map((x) => {
          const h = H - 20 - Y(binomPmf(v.n, p, x));
          const sel = x >= lo && x <= hi;
          return <rect key={x} x={X(x) - bw / 2 + 1} y={H - 20 - h} width={Math.max(1.5, bw - 2)} height={Math.max(0.5, h)} fill={sel ? MANIM.yellow : MANIM.blue} fillOpacity={sel ? 0.9 : 0.55} />;
        })}
        <polyline points={curve.join(" ")} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
      </Svg>
    </Frame>
  );
}

/* ───────────── Intervalos de confianza para una proporción ───────────── */

const NIVELES = [
  { value: 0, label: "90 %", c: 0.9 },
  { value: 1, label: "95 %", c: 0.95 },
  { value: 2, label: "99 %", c: 0.99 },
] as const;

/** `initial`: [p̂ ‰ (10–990), n (20–5000), nivel (0 90 %, 1 95 %, 2 99 %), simulación (0/1)]. */
export function IntervaloConfianzaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { ph: int(ini[0], 350, 10, 990), n: int(ini[1], 2000, 20, 5000), nivel: int(ini[2], 1, 0, 2), sim: int(ini[3], 0, 0, 1), semilla: 1 };
  const [v, setV] = useState(init);
  const pHat = v.ph / 1000;
  const N = NIVELES[v.nivel]!;
  const ic = intervaloProporcion(pHat, v.n, N.c);
  const W = 420;
  const x0 = pHat - 0.12;
  const X = (x: number) => 20 + clamp((x - x0) / 0.24, 0, 1) * (W - 40);
  const rng = crearAzar(v.semilla * 7919);
  const sims = v.sim
    ? Array.from({ length: 20 }, () => {
        let k = 0;
        const nn = Math.min(v.n, 400);
        for (let i = 0; i < nn; i += 1) if (rng() < pHat) k += 1;
        const ph = k / nn;
        const e = ic.z * Math.sqrt((ph * (1 - ph)) / nn);
        return { ph, inf: ph - e, sup: ph + e, ok: ph - e <= pHat && pHat <= ph + e };
      })
    : [];
  return (
    <Frame
      hint={block.hint ?? "El intervalo p̂ ± z·√(p̂q̂/n) tiene un error que baja al aumentar n y sube con el nivel de confianza. Con la simulación, cada barra es una muestra: la verdadera p queda dentro en alrededor del nivel de confianza de los casos."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Proporción en la muestra p̂" value={v.ph} min={10} max={990} step={10} color={MANIM.blue} onChange={(ph) => setV((q) => ({ ...q, ph }))} format={(x) => `${m(x / 10, 1)} %`} />
          <Slider label="Tamaño de la muestra n" value={v.n} min={20} max={5000} step={10} color={MANIM.orange} onChange={(n) => setV((q) => ({ ...q, n }))} format={(x) => fmtEs(x, 0)} />
          <Choice label="Nivel de confianza" items={NIVELES} value={v.nivel} onChange={(nivel) => setV((q) => ({ ...q, nivel }))} />
          <div className="flex gap-2">
            <button type="button" className={`${TOOL_BTN} ${v.sim ? "bg-white/15" : ""}`} aria-pressed={v.sim === 1} onClick={() => setV((q) => ({ ...q, sim: q.sim ? 0 : 1 }))}>
              Simular 20 muestras
            </button>
            {v.sim ? (
              <button type="button" className={TOOL_BTN} onClick={() => setV((q) => ({ ...q, semilla: q.semilla + 1 }))}>
                Otras 20
              </button>
            ) : null}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Valor crítico z" plain>
          <span data-testid="tool-ic-z">{m(ic.z, 3)}</span>
        </Stat>
        <Stat color={MANIM.orange} label="Error máximo" plain>
          <span data-testid="tool-ic-error">{`${m(ic.error * 100, 2)} %`}</span>
        </Stat>
      </Readout>
      <p className="text-lg font-semibold" style={{ color: MANIM.green }} data-testid="tool-ic-intervalo">
        {`(${m(ic.inf, 4)} ; ${m(ic.sup, 4)})`}
      </p>
      {v.sim ? (
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-ic-sim">
          {`${sims.filter((s) => s.ok).length} de 20 intervalos contienen la proporción verdadera (${m(pHat * 100, 1)} %)`}
        </p>
      ) : null}
      <Svg w={W} h={v.sim ? 200 : 70} testId="tool-ic-grafica">
        <line x1={20} y1={v.sim ? 190 : 56} x2={W - 20} y2={v.sim ? 190 : 56} stroke={MANIM.grid} strokeWidth={2} />
        <line x1={X(pHat)} y1={6} x2={X(pHat)} y2={v.sim ? 190 : 56} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="4 4" />
        <line x1={X(ic.inf)} y1={30} x2={X(ic.sup)} y2={30} stroke={MANIM.green} strokeWidth={6} strokeLinecap="round" />
        <circle cx={X(pHat)} cy={30} r={6} fill={MANIM.yellow} />
        {sims.map((s, i) => (
          <g key={i}>
            <line x1={X(s.inf)} y1={56 + i * 6.5} x2={X(s.sup)} y2={56 + i * 6.5} stroke={s.ok ? MANIM.blue : MANIM.red} strokeWidth={3} strokeLinecap="round" />
            <circle cx={X(s.ph)} cy={56 + i * 6.5} r={2} fill={MANIM.ink} />
          </g>
        ))}
      </Svg>
    </Frame>
  );
}
