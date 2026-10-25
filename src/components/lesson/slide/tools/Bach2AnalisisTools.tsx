"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

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
