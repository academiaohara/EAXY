"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { FnPlot } from "@/components/lesson/slide/tools/Bach1FuncTools";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sg = (x: number) => String(x).replace("-", "−");
const dec = (x: number, d = 5) => x.toFixed(d).replace(".", ",").replace(/,?0+$/, "").replace("-", "−");

/** `initial`: [a (−3 a 3), b (1 a 3), k (0 a 7): n = 10^k]. Límite de (1 + a/n)^(b·n) cuando n → ∞. */
export function UnoInfinitoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 1, -3, 3), b: int(ini[1], 1, 1, 3), k: int(ini[2], 2, 0, 7) };
  const [v, setV] = useState(init);
  const n = 10 ** v.k;
  const val = (1 + v.a / n) ** (v.b * n);
  const lim = Math.exp(v.a * v.b);
  return (
    <Frame
      hint={block.hint ?? "Con a = 1 y b = 1 los valores se acercan a e ≈ 2,71828. En general, (1 + a/n)^(b·n) tiende a e^(a·b)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="a (en 1 + a/n)" value={v.a} min={-3} max={3} color={MANIM.blue} format={sg} onChange={(a) => setV((s) => ({ ...s, a }))} />
          <Slider label="b (exponente b·n)" value={v.b} min={1} max={3} color={MANIM.green} onChange={(b) => setV((s) => ({ ...s, b }))} />
          <Slider label="n = 10^k, k =" value={v.k} min={0} max={7} color={MANIM.orange} onChange={(k) => setV((s) => ({ ...s, k }))} />
        </>
      }
    >
      <p className="text-lg text-[color:var(--stage-ink,#fff)]" data-testid="tool-ui-expr">{`(1 + ${sg(v.a)}/${n})^(${v.b}·${n})`}</p>
      <Readout>
        <Stat color={MANIM.yellow} label="Valor con este n" plain><span data-testid="tool-ui-valor">{dec(val)}</span></Stat>
        <Stat color={MANIM.green} label={`Límite e^(${sg(v.a * v.b)})`} plain><span data-testid="tool-ui-limite">{dec(lim)}</span></Stat>
      </Readout>
    </Frame>
  );
}

type LH = { label: string; paso: string[]; lim: string; f: (x: number) => number; x0: number; inf?: boolean };
const LH_CASOS: LH[] = [
  { label: "sen x / x, x → 0", paso: ["0/0", "cos x / 1"], lim: "1", f: (x) => Math.sin(x) / x, x0: 0 },
  { label: "(eˣ − 1) / x, x → 0", paso: ["0/0", "eˣ / 1"], lim: "1", f: (x) => (Math.exp(x) - 1) / x, x0: 0 },
  { label: "(1 − cos x) / x², x → 0", paso: ["0/0", "sen x / 2x  (otra vez 0/0)", "cos x / 2"], lim: "1/2", f: (x) => (1 - Math.cos(x)) / (x * x), x0: 0 },
  { label: "(x − sen x) / x³, x → 0", paso: ["0/0", "(1 − cos x) / 3x²  (0/0)", "sen x / 6x  (0/0)", "cos x / 6"], lim: "1/6", f: (x) => (x - Math.sin(x)) / x ** 3, x0: 0 },
  { label: "ln x / x, x → +∞", paso: ["∞/∞", "(1/x) / 1 = 1/x"], lim: "0", f: (x) => Math.log(x) / x, x0: 0, inf: true },
  { label: "x · e⁻ˣ = x / eˣ, x → +∞", paso: ["∞/∞", "1 / eˣ"], lim: "0", f: (x) => x / Math.exp(x), x0: 0, inf: true },
];

/** `initial`: [caso (0–5), pasos de aproximación (0–5)]. Regla de L'Hôpital paso a paso y tabla numérica. */
export function LHopitalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { c: int(ini[0], 0, 0, LH_CASOS.length - 1), k: int(ini[1], 2, 0, 5) };
  const [v, setV] = useState(init);
  const caso = LH_CASOS[v.c]!;
  const xs = Array.from({ length: v.k + 1 }, (_, j) => (caso.inf ? 10 ** (j + 1) : 10 ** -(j + 1)));
  return (
    <Frame
      hint={block.hint ?? "Si queda 0/0 o ∞/∞ se derivan numerador y denominador por separado, y se repite si sigue indeterminado. La tabla confirma el resultado."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex flex-col gap-1.5" role="group" aria-label="Límite">
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Límite</span>
            <div className="flex flex-wrap gap-2">
              {LH_CASOS.map((c, i) => (
                <button key={c.label} type="button" aria-pressed={i === v.c} onClick={() => setV((s) => ({ ...s, c: i }))} className={`rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm text-[color:var(--stage-ink,#fff)] hover:bg-white/10 ${i === v.c ? "bg-white/15" : ""}`}>
                  {c.label}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Valores de la tabla" value={v.k} min={0} max={5} color={MANIM.orange} onChange={(k) => setV((s) => ({ ...s, k }))} />
        </>
      }
    >
      <ol className="list-decimal pl-5 text-base text-[color:var(--stage-ink,#fff)]" data-testid="tool-lh-pasos">
        {caso.paso.map((p, i) => <li key={i}>{p}</li>)}
      </ol>
      <Readout>
        <Stat color={MANIM.green} label="Límite" plain><span data-testid="tool-lh-limite">{caso.lim}</span></Stat>
      </Readout>
      <table className="w-full max-w-sm border-collapse text-sm tabular-nums" data-testid="tool-lh-tabla">
        <tbody>
          {xs.map((x, i) => (
            <tr key={i}>
              <td className="pr-4 text-[color:var(--stage-muted,#b8c2d0)]">{`x = ${caso.inf ? x : x.toExponential(0).replace("e-", "·10⁻")}`}</td>
              <td className="text-[color:var(--stage-ink,#fff)]">{dec(caso.f(x), 6)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

type Estudio = {
  label: string;
  f: (x: number) => number;
  ok?: (x: number) => boolean;
  xr: [number, number];
  yr: [number, number];
  /** Una línea de texto por paso: dominio, cortes, simetría, asíntotas, monotonía y curvatura. */
  pasos: string[];
  marks: { paso: number; x: number; y: number; color: string; open?: boolean }[];
  vlines?: number[];
  hlines?: number[];
};

const ESTUDIOS: Estudio[] = [
  {
    label: "x³ − 3x² + 2",
    f: (x) => x ** 3 - 3 * x * x + 2,
    xr: [-2, 4], yr: [-4, 6],
    pasos: ["Dominio: ℝ (polinomio).", "Cortes: con el eje Y en (0, 2); con el eje X en x = 1 y x = 1 ± √3.", "Sin simetría (ni par ni impar).", "Sin asíntotas: el límite en ±∞ es ±∞.", "f′ = 3x² − 6x = 0 en x = 0 (máximo, f = 2) y x = 2 (mínimo, f = −2).", "f″ = 6x − 6: inflexión en x = 1, f(1) = 0."],
    marks: [{ paso: 1, x: 0, y: 2, color: MANIM.blue }, { paso: 1, x: 1, y: 0, color: MANIM.blue }, { paso: 4, x: 0, y: 2, color: MANIM.red }, { paso: 4, x: 2, y: -2, color: MANIM.green }, { paso: 5, x: 1, y: 0, color: MANIM.yellow }],
  },
  {
    label: "x / (x² + 1)",
    f: (x) => x / (x * x + 1),
    xr: [-5, 5], yr: [-1, 1],
    pasos: ["Dominio: ℝ (el denominador nunca se anula).", "Cortes: solo el origen (0, 0).", "Impar: f(−x) = −f(x), simétrica respecto del origen.", "Asíntota horizontal y = 0 en ±∞.", "f′ = (1 − x²)/(x² + 1)² = 0 en x = ±1: máximo (1, ½) y mínimo (−1, −½).", "f″ = 2x(x² − 3)/(x² + 1)³: inflexiones en x = 0 y x = ±√3."],
    marks: [{ paso: 1, x: 0, y: 0, color: MANIM.blue }, { paso: 4, x: 1, y: 0.5, color: MANIM.red }, { paso: 4, x: -1, y: -0.5, color: MANIM.green }, { paso: 5, x: 0, y: 0, color: MANIM.yellow }, { paso: 5, x: Math.sqrt(3), y: Math.sqrt(3) / 4, color: MANIM.yellow }, { paso: 5, x: -Math.sqrt(3), y: -Math.sqrt(3) / 4, color: MANIM.yellow }],
    hlines: [0],
  },
  {
    label: "x + 1/x",
    f: (x) => x + 1 / x,
    ok: (x) => Math.abs(x) > 1e-9,
    xr: [-4, 4], yr: [-6, 6],
    pasos: ["Dominio: ℝ − {0}.", "Sin cortes con los ejes (no se anula ni existe f(0)).", "Impar: f(−x) = −f(x).", "Asíntota vertical x = 0 y asíntota oblicua y = x.", "f′ = 1 − 1/x² = 0 en x = ±1: mínimo (1, 2) y máximo (−1, −2).", "f″ = 2/x³: no se anula, sin inflexión; convexa para x > 0 y cóncava para x < 0."],
    marks: [{ paso: 4, x: 1, y: 2, color: MANIM.green }, { paso: 4, x: -1, y: -2, color: MANIM.red }],
    vlines: [0],
  },
  {
    label: "x² / (x² − 4)",
    f: (x) => (x * x) / (x * x - 4),
    ok: (x) => Math.abs(Math.abs(x) - 2) > 1e-6,
    xr: [-6, 6], yr: [-6, 6],
    pasos: ["Dominio: ℝ − {−2, 2}.", "Cortes: el origen (0, 0).", "Par: f(−x) = f(x), simétrica respecto del eje Y.", "Asíntotas verticales x = ±2 y horizontal y = 1.", "f′ = −8x/(x² − 4)²: máximo relativo en (0, 0); creciente en x < 0 (salvo asíntota), decreciente en x > 0.", "f″ > 0 en |x| > 2 y f″ < 0 en |x| < 2: sin inflexión (los cambios son en las asíntotas)."],
    marks: [{ paso: 1, x: 0, y: 0, color: MANIM.blue }, { paso: 4, x: 0, y: 0, color: MANIM.red }],
    vlines: [-2, 2], hlines: [1],
  },
  {
    label: "x² · e⁻ˣ",
    f: (x) => x * x * Math.exp(-x),
    xr: [-2, 8], yr: [-1, 4],
    pasos: ["Dominio: ℝ.", "Cortes: el origen (0, 0).", "Sin simetría.", "Asíntota horizontal y = 0 cuando x → +∞; crece muy deprisa cuando x → −∞.", "f′ = (2x − x²)e⁻ˣ: mínimo en (0, 0) y máximo en (2, 4e⁻²) ≈ (2; 0,54).", "f″ = (x² − 4x + 2)e⁻ˣ: inflexión en x = 2 ± √2."],
    marks: [{ paso: 1, x: 0, y: 0, color: MANIM.blue }, { paso: 4, x: 0, y: 0, color: MANIM.green }, { paso: 4, x: 2, y: 4 * Math.exp(-2), color: MANIM.red }, { paso: 5, x: 2 - Math.SQRT2, y: (2 - Math.SQRT2) ** 2 * Math.exp(-(2 - Math.SQRT2)), color: MANIM.yellow }, { paso: 5, x: 2 + Math.SQRT2, y: (2 + Math.SQRT2) ** 2 * Math.exp(-(2 + Math.SQRT2)), color: MANIM.yellow }],
    hlines: [0],
  },
  {
    label: "ln x / x",
    f: (x) => Math.log(x) / x,
    ok: (x) => x > 0,
    xr: [-1, 10], yr: [-3, 1],
    pasos: ["Dominio: (0, +∞).", "Corte con el eje X en (1, 0); no corta al eje Y.", "Sin simetría (el dominio no es simétrico).", "Asíntota vertical x = 0 (f → −∞) y horizontal y = 0 en +∞.", "f′ = (1 − ln x)/x² = 0 en x = e: máximo (e, 1/e) ≈ (2,72; 0,37).", "f″ = (2 ln x − 3)/x³: inflexión en x = e^{3/2} ≈ 4,48."],
    marks: [{ paso: 1, x: 1, y: 0, color: MANIM.blue }, { paso: 4, x: Math.E, y: 1 / Math.E, color: MANIM.red }, { paso: 5, x: Math.E ** 1.5, y: 1.5 / Math.E ** 1.5, color: MANIM.yellow }],
    vlines: [0], hlines: [0],
  },
  {
    label: "x⁴ − 2x²",
    f: (x) => x ** 4 - 2 * x * x,
    xr: [-2, 2], yr: [-2, 4],
    pasos: ["Dominio: ℝ.", "Cortes: (0, 0) y x = ±√2.", "Par: simétrica respecto del eje Y.", "Sin asíntotas (límite +∞ en ±∞).", "f′ = 4x³ − 4x = 0 en x = 0 (máximo local, 0) y x = ±1 (mínimos, −1).", "f″ = 12x² − 4: inflexiones en x = ±1/√3."],
    marks: [{ paso: 1, x: 0, y: 0, color: MANIM.blue }, { paso: 1, x: Math.SQRT2, y: 0, color: MANIM.blue }, { paso: 1, x: -Math.SQRT2, y: 0, color: MANIM.blue }, { paso: 4, x: 0, y: 0, color: MANIM.red }, { paso: 4, x: 1, y: -1, color: MANIM.green }, { paso: 4, x: -1, y: -1, color: MANIM.green }, { paso: 5, x: 1 / Math.sqrt(3), y: (1 / Math.sqrt(3)) ** 4 - 2 / 3, color: MANIM.yellow }, { paso: 5, x: -1 / Math.sqrt(3), y: (1 / Math.sqrt(3)) ** 4 - 2 / 3, color: MANIM.yellow }],
  },
];

const ETIQ = ["Dominio", "Cortes", "Simetría", "Asíntotas", "Monotonía y extremos", "Curvatura e inflexión"];

/** `initial`: [función (0–6), pasos mostrados (0–6)]. Estudio completo de una función paso a paso. */
export function EstudioFuncionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { i: int(ini[0], 0, 0, ESTUDIOS.length - 1), k: int(ini[1], 6, 0, 6) };
  const [v, setV] = useState(init);
  const e = ESTUDIOS[v.i]!;
  return (
    <Frame
      hint={block.hint ?? "Avanza los pasos del estudio y fíjate en cómo cada dato aparece en la gráfica: cortes, asíntotas, extremos e inflexiones."}
      onReset={() => setV(init)}
      controls={
        <>
          <div className="flex flex-col gap-1.5" role="group" aria-label="Función">
            <span className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Función</span>
            <div className="flex flex-wrap gap-2">
              {ESTUDIOS.map((s, i) => (
                <button key={s.label} type="button" aria-pressed={i === v.i} onClick={() => setV((p) => ({ ...p, i }))} className={`rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm text-[color:var(--stage-ink,#fff)] hover:bg-white/10 ${i === v.i ? "bg-white/15" : ""}`}>
                  {s.label}
                </button>
              ))}
            </div>
          </div>
          <Slider label="Pasos del estudio" value={v.k} min={0} max={6} color={MANIM.orange} onChange={(k) => setV((p) => ({ ...p, k }))} />
        </>
      }
    >
      <FnPlot
        curves={[{ fn: e.f, ok: e.ok, color: MANIM.blue, width: 3 }]}
        xr={e.xr}
        yr={e.yr}
        marks={e.marks.filter((m) => m.paso < v.k).map((m) => ({ x: m.x, y: m.y, color: m.color, r: 6 }))}
        vlines={v.k >= 4 ? e.vlines : []}
        hlines={v.k >= 4 ? e.hlines : []}
        testId="tool-ef-grafica"
      />
      <ol className="flex flex-col gap-1 text-sm text-[color:var(--stage-ink,#fff)]" data-testid="tool-ef-pasos">
        {e.pasos.slice(0, v.k).map((p, i) => (
          <li key={i}><strong style={{ color: MANIM.yellow }}>{ETIQ[i]}.</strong> {p}</li>
        ))}
      </ol>
    </Frame>
  );
}
