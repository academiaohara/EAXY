"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { SEQS, arithSum, arithTerm, geomInf, geomSum, geomTerm, nZero, seqTerms } from "@/components/lesson/anim/seq";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const f = (x: number) => String(x).replace("-", "−");
const ink = "text-[color:var(--stage-ink,#fff)]";

const W = 520;
const H = 260;

/* ───────────── Sucesiones: términos, gráfica y clasificación ───────────── */

/** Una sucesión del catálogo: sus términos como puntos, su límite y su clasificación. */
export function SucesionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 1, 0, SEQS.length - 1), n: int(ini[1], 10, 1, 30) };
  const [v, setV] = useState(init);
  const s = SEQS[v.i]!;
  const K = 30;
  const terms = seqTerms(s, K);
  const cap = s.bounded && s.kind !== "divergente" ? Infinity : 40;
  const shown = terms.map((t) => clamp(t, -cap, cap));
  const lo = Math.min(0, ...shown, s.limit ?? 0);
  const hi = Math.max(0, ...shown, s.limit ?? 0);
  const span = hi - lo || 1;
  const px = (n: number) => 36 + ((n - 1) / (K - 1)) * (W - 56);
  const py = (y: number) => H - 16 - ((clamp(y, -cap, cap) - lo) / span) * (H - 32);
  const an = s.f(v.n);
  return (
    <Frame
      hint={block.hint ?? "Cambia de sucesión y mueve n: ¿a qué valor se acercan los términos? ¿Se quedan por debajo de alguna cota?"}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice
            label="Sucesión"
            items={SEQS.map((q, k) => ({ value: k, label: q.label }))}
            value={v.i}
            onChange={(i) => setV((p) => ({ ...p, i }))}
          />
          <Slider label="Lugar n" value={v.n} min={1} max={30} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-su-termino">{`a${v.n} = ${Math.abs(an) > 1e9 ? an.toExponential(2) : fmtEs(an, 4)}`}</p>
        <p className="text-sm" data-testid="tool-su-primeros">{`${terms.slice(0, 6).map((t) => fmtEs(t, 3)).join(",  ")}, …`}</p>
        <p className="text-2xl font-bold" style={{ color: s.kind === "convergente" ? MANIM.green : s.kind === "divergente" ? MANIM.orange : MANIM.red }} data-testid="tool-su-tipo">
          {s.kind === "convergente" ? `Convergente: límite ${fmtEs(s.limit!, 3)}` : s.kind === "divergente" ? "Divergente: tiende a infinito" : "Oscilante: no tiene límite"}
        </p>
        <p className="text-lg" data-testid="tool-su-mono">{`${s.mono[0]!.toUpperCase()}${s.mono.slice(1)} · ${s.bounded ? "acotada" : "no acotada"}`}</p>
      </div>
      <Svg w={W} h={H} testId="tool-su-grafica">
        <line x1={20} y1={py(0)} x2={W - 8} y2={py(0)} stroke={MANIM.ink} strokeWidth={1.5} />
        {s.limit !== undefined ? (
          <line x1={20} y1={py(s.limit)} x2={W - 8} y2={py(s.limit)} stroke={MANIM.green} strokeWidth={2} strokeDasharray="7 6" />
        ) : null}
        {terms.map((t, k) => (
          <circle key={k} cx={px(k + 1)} cy={py(t)} r={k + 1 === v.n ? 7 : 4} fill={k + 1 === v.n ? MANIM.yellow : MANIM.blue} />
        ))}
      </Svg>
    </Frame>
  );
}

/* ───────────── Progresiones aritméticas y geométricas ───────────── */

/** Progresión aritmética (suma d) o geométrica (multiplica por r): término general y sumas. */
export function ProgresionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const tipo0 = int(ini[0], 0, 0, 1);
  const init = { t: tipo0, a1: int(ini[1], 2, -10, 10), p: int(ini[2], tipo0 === 0 ? 3 : 4, tipo0 === 0 ? -5 : -6, tipo0 === 0 ? 5 : 6), n: int(ini[3], 5, 1, 12) };
  const [v, setV] = useState(init);
  const geo = v.t === 1;
  const r = v.p / 2;
  const d = v.p;
  const term = (n: number) => (geo ? geomTerm(v.a1, r, n) : arithTerm(v.a1, d, n));
  const an = term(v.n);
  const sn = geo ? geomSum(v.a1, r, v.n) : arithSum(v.a1, d, v.n);
  const inf = geo ? geomInf(v.a1, r) : null;
  const vals = Array.from({ length: 12 }, (_, i) => term(i + 1));
  const top = Math.max(1, ...vals.map((x) => Math.abs(x)));
  const bw = (W - 60) / 12;
  const by = (y: number) => (clamp(y, -top, top) / top) * (H / 2 - 18);
  return (
    <Frame
      hint={block.hint ?? "Cambia el primer término y la diferencia (o la razón). En la geométrica, con |r| < 1 los términos se apagan y la suma infinita existe."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tipo" items={[{ value: 0, label: "Aritmética (+d)" }, { value: 1, label: "Geométrica (·r)" }]} value={v.t} onChange={(t) => setV({ t, a1: v.a1, p: t === 0 ? 3 : 4, n: v.n })} />
          <Slider label="Primer término a₁" value={v.a1} min={-10} max={10} color={MANIM.blue} onChange={(a1) => setV((p) => ({ ...p, a1 }))} format={f} />
          {geo ? (
            <Slider label="Razón r" value={r} min={-3} max={3} step={0.5} color={MANIM.orange} onChange={(nr) => setV((p) => ({ ...p, p: Math.round(nr * 2) }))} format={(n) => fmtEs(n, 1)} />
          ) : (
            <Slider label="Diferencia d" value={d} min={-5} max={5} color={MANIM.orange} onChange={(p) => setV((q) => ({ ...q, p }))} format={f} />
          )}
          <Slider label="Número de términos n" value={v.n} min={1} max={12} color={MANIM.yellow} onChange={(n) => setV((p) => ({ ...p, n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-pg-formula">
          {geo ? `aₙ = ${f(v.a1)} · (${fmtEs(r, 1)})ⁿ⁻¹` : `aₙ = ${f(v.a1)} + (n − 1)·(${f(d)})`}
        </p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-pg-an">{`a${v.n} = ${fmtEs(an, 4)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.yellow }} data-testid="tool-pg-sn">{`S${v.n} = ${fmtEs(sn, 4)}`}</p>
        {geo ? (
          <p className="text-lg" data-testid="tool-pg-infinito">
            {inf !== null ? `Como |r| < 1, la suma de infinitos términos es S = a₁/(1 − r) = ${fmtEs(inf, 4)}` : "Como |r| ≥ 1, la suma de infinitos términos no es finita."}
          </p>
        ) : null}
      </div>
      <Svg w={W} h={H} testId="tool-pg-barras">
        <line x1={20} y1={H / 2} x2={W - 10} y2={H / 2} stroke={MANIM.ink} strokeWidth={1.5} />
        {vals.map((x, k) => {
          const h = by(x);
          return (
            <rect key={k} x={30 + k * bw + 3} y={h >= 0 ? H / 2 - h : H / 2} width={bw - 6} height={Math.abs(h)} fill={k < v.n ? (geo ? MANIM.orange : MANIM.blue) : MANIM.grid} opacity={k < v.n ? 0.9 : 0.5} />
          );
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── Definición de límite con ε ───────────── */

const EPS = [1, 0.5, 0.1, 0.05, 0.01, 0.001, 0.0001];
const LIM_SEQS = [SEQS[1]!, SEQS[3]!, SEQS[7]!, SEQS[8]!];

/** Dado ε, desde qué lugar n₀ todos los términos están a menos de ε del límite. */
export function LimiteEpsilonExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 1, 0, LIM_SEQS.length - 1), e: int(ini[1], 2, 0, EPS.length - 1) };
  const [v, setV] = useState(init);
  const s = LIM_SEQS[v.i]!;
  const L = s.limit!;
  const eps = EPS[v.e]!;
  const n0 = nZero(s.f, L, eps);
  return (
    <Frame
      hint={block.hint ?? "Reduce ε: hay que ir más lejos en la sucesión, pero siempre existe un n₀ a partir del cual los términos entran en la banda."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Sucesión" items={LIM_SEQS.map((q, k) => ({ value: k, label: q.label }))} value={v.i} onChange={(i) => setV((p) => ({ ...p, i }))} />
          <Slider label="Distancia ε al límite" value={v.e} min={0} max={EPS.length - 1} color={MANIM.orange} onChange={(e) => setV((p) => ({ ...p, e }))} format={(k) => fmtEs(EPS[k]!, 4)} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-le-limite">{`límite L = ${fmtEs(L, 3)}`}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-le-n0">
          {n0 === null ? "n₀ no se encuentra en el rango calculado" : `n₀ = ${fmtEs(n0, 0)}`}
        </p>
        {n0 !== null ? (
          <>
            <p className="text-lg" data-testid="tool-le-dentro">{`Para n ≥ ${fmtEs(n0, 0)}: |aₙ − ${fmtEs(L, 3)}| < ${fmtEs(eps, 4)}. Por ejemplo a${fmtEs(n0, 0)} = ${fmtEs(s.f(n0), 6)}.`}</p>
            {n0 > 1 ? <p className="text-lg" data-testid="tool-le-fuera">{`En cambio a${fmtEs(n0 - 1, 0)} = ${fmtEs(s.f(n0 - 1), 6)} todavía queda fuera de la banda.`}</p> : null}
          </>
        ) : null}
      </div>
    </Frame>
  );
}

/* ───────────── Límite de un cociente de polinomios ───────────── */

const sup = (n: number) => ["", "", "²", "³"][n] ?? "";
const mono = (c: number, p: number, k: number) => `${c}${p === 0 ? "" : `n${sup(p)}`}${k >= 0 ? ` + ${k}` : ` − ${-k}`}`.replace("1n", "n");

/** aₙ = (a·nᵖ + 3)/(c·nᵠ + 5): tabla con n grande y regla de los grados. */
export function LimiteRacionalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const nz = (x: number) => (x === 0 ? 1 : x);
  const init = { p: int(ini[0], 1, 0, 3), a: nz(int(ini[1], 3, -5, 5)), q: int(ini[2], 1, 0, 3), c: nz(int(ini[3], 2, -5, 5)) };
  const [v, setV] = useState(init);
  const a = nz(v.a);
  const c = nz(v.c);
  const an = (n: number) => (a * Math.pow(n, v.p) + 3) / (c * Math.pow(n, v.q) + 5);
  const lim = v.p < v.q ? "0" : v.p === v.q ? fmtEs(a / c, 4) : a / c > 0 ? "+∞" : "−∞";
  const rule = v.p < v.q ? "grado del numerador < grado del denominador → 0" : v.p === v.q ? "mismo grado → cociente de los coeficientes principales" : "grado del numerador > grado del denominador → ±∞";
  return (
    <Frame
      hint={block.hint ?? "Compara los grados: solo los términos de mayor grado mandan cuando n es muy grande."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Grado del numerador p" value={v.p} min={0} max={3} color={MANIM.blue} onChange={(p) => setV((s) => ({ ...s, p }))} />
          <Slider label="Coeficiente principal a" value={a} min={-5} max={5} color={MANIM.blue} onChange={(x) => setV((s) => ({ ...s, a: x }))} format={f} />
          <Slider label="Grado del denominador q" value={v.q} min={0} max={3} color={MANIM.orange} onChange={(q) => setV((s) => ({ ...s, q }))} />
          <Slider label="Coeficiente principal c" value={c} min={-5} max={5} color={MANIM.orange} onChange={(x) => setV((s) => ({ ...s, c: x }))} format={f} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-lg" data-testid="tool-lr-formula">{`aₙ = (${mono(a, v.p, 3)}) / (${mono(c, v.q, 5)})`}</p>
        <p className="text-sm" data-testid="tool-lr-tabla">{[10, 1000, 1_000_000].map((n) => `n = ${fmtEs(n, 0)}: ${Math.abs(an(n)) > 1e9 ? an(n).toExponential(2) : fmtEs(an(n), 6)}`).join("     ")}</p>
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-lr-limite">{`lím aₙ = ${lim}`}</p>
        <p className="text-lg" data-testid="tool-lr-regla">{rule}</p>
      </div>
    </Frame>
  );
}

/* ───────────── El número e ───────────── */

const NS = [1, 2, 5, 10, 100, 1000, 10_000, 100_000, 1_000_000];

/** (1 + 1/n)ⁿ al crecer n, y capitalización con n periodos al año frente a eʳ. */
export function NumeroEExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { k: int(ini[0], 3, 0, NS.length - 1), r: int(ini[1], 100, 1, 100) };
  const [v, setV] = useState(init);
  const n = NS[v.k]!;
  const val = Math.pow(1 + 1 / n, n);
  const rate = v.r / 100;
  const comp = 1000 * Math.pow(1 + rate / n, n);
  const cont = 1000 * Math.exp(rate);
  return (
    <Frame
      hint={block.hint ?? "Sube n: (1 + 1/n)ⁿ no crece sin límite, se estabiliza en e ≈ 2,71828. Con el capital: pagar interés cada instante da 1000·eʳ."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="n" value={v.k} min={0} max={NS.length - 1} color={MANIM.blue} onChange={(k) => setV((p) => ({ ...p, k }))} format={(k) => fmtEs(NS[k]!, 0)} />
          <Slider label="Rédito anual (%)" value={v.r} min={1} max={100} color={MANIM.orange} unit=" %" onChange={(r) => setV((p) => ({ ...p, r }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-2xl font-bold" style={{ color: MANIM.green }} data-testid="tool-e-valor">{`(1 + 1/${fmtEs(n, 0)})^${fmtEs(n, 0)} = ${fmtEs(val, 6)}`}</p>
        <p className="text-lg" data-testid="tool-e-dif">{`e − valor = ${fmtEs(Math.E - val, 6)}`}</p>
        <p className="text-lg" data-testid="tool-e-capital">{`1000 € al ${v.r} % con ${fmtEs(n, 0)} abono(s) al año: ${fmtEs(comp, 2)} €`}</p>
        <p className="text-lg" data-testid="tool-e-continuo">{`Abono continuo (1000·e^${fmtEs(rate, 2)}): ${fmtEs(cont, 2)} €`}</p>
      </div>
    </Frame>
  );
}
