"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { comb, desarrolloBinomio, factorial, filaPascal } from "@/components/lesson/anim/combinatoria1b";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { MathRenderer } from "@/components/lesson/MathRenderer";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sg = (x: number) => (x < 0 ? "-" : "+");
const sup = (n: number) => String(n).replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]!);

/** `initial`: [n (0–10), k (0–10)]. */
export function PascalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { n: int(ini[0], 5, 0, 10), k: int(ini[1], 2, 0, 10) };
  const [v, setV] = useState(init);
  const k = Math.min(v.k, v.n);
  const c = comb(v.n, k);
  const suma = filaPascal(v.n).reduce((s, t) => s + t, 0);
  return (
    <Frame
      hint={block.hint ?? "Cada número es la suma de los dos que tiene encima: C(n, k) = C(n−1, k−1) + C(n−1, k). Cada fila es simétrica y suma 2ⁿ."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="n (fila)" value={v.n} min={0} max={10} color={MANIM.blue} onChange={(n) => setV((p) => ({ ...p, n }))} />
          <Slider label="k (lugar en la fila)" value={k} min={0} max={v.n} color={MANIM.orange} onChange={(kk) => setV((p) => ({ ...p, k: kk }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Número combinatorio" plain>
          <span data-testid="tool-pa-valor">{`C(${v.n}, ${k}) = ${c}`}</span>
        </Stat>
        <Stat color={MANIM.green} label="Suma de la fila" plain>
          <span data-testid="tool-pa-suma">{`${suma} = 2${sup(v.n)}`}</span>
        </Stat>
      </Readout>
      <MathRenderer text={`$\\dbinom{${v.n}}{${k}} = \\dfrac{${v.n}!}{${k}!\\,${v.n - k}!} = \\dfrac{${factorial(v.n)}}{${factorial(k)}\\cdot ${factorial(v.n - k)}} = ${c}$`} className="text-xl" />
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-pa-regla">
        {v.n > 0 && k > 0 && k < v.n ? `Regla de Pascal: ${comb(v.n - 1, k - 1)} + ${comb(v.n - 1, k)} = ${c}` : "En los bordes del triángulo siempre hay un 1"}
      </p>
      <div className="flex flex-col items-center gap-0.5" data-testid="tool-pa-triangulo">
        {Array.from({ length: v.n + 1 }, (_, i) => (
          <div key={i} className="flex justify-center gap-1">
            {filaPascal(i).map((t, j) => {
              const on = i === v.n && j === k;
              const parent = i === v.n - 1 && (j === k - 1 || j === k);
              return (
                <span
                  key={j}
                  className="min-w-9 rounded px-1 py-0.5 text-center text-sm tabular-nums"
                  style={{ background: on ? MANIM.yellow : parent ? "rgba(131,193,103,.35)" : "transparent", color: on ? "#101418" : MANIM.ink }}
                >
                  {t}
                </span>
              );
            })}
          </div>
        ))}
      </div>
    </Frame>
  );
}

/** `initial`: [n (1–8), a (1–3), b (−3 a 3), término k destacado]. Desarrolla (a·x + b)ⁿ. */
export function BinomioExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { n: int(ini[0], 4, 1, 8), a: int(ini[1], 1, 1, 3), b: int(ini[2], 2, -3, 3), k: int(ini[3], 1, 0, 8) };
  const [v, setV] = useState(init);
  const k = Math.min(v.k, v.n);
  const T = desarrolloBinomio(v.n, v.a, v.b);
  const xs = (g: number) => (g === 0 ? "" : g === 1 ? "x" : `x^{${g}}`);
  const poli = T.filter((t) => t.coef !== 0)
    .map((t, i) => `${i === 0 ? (t.coef < 0 ? "-" : "") : ` ${sg(t.coef)} `}${Math.abs(t.coef) === 1 && t.grado > 0 ? "" : Math.abs(t.coef)}${xs(t.grado)}`)
    .join("");
  const t = T[k]!;
  const base = `${v.a === 1 ? "" : v.a}x ${sg(v.b)} ${Math.abs(v.b)}`;
  const suma = T.reduce((s, q) => s + q.coef, 0);
  return (
    <Frame
      hint={block.hint ?? "El término k+1 es C(n, k)·(ax)^(n−k)·b^k. Con x = 1 la suma de todos los coeficientes es (a + b)ⁿ."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Exponente n" value={v.n} min={1} max={8} color={MANIM.blue} onChange={(n) => setV((p) => ({ ...p, n }))} />
          <Slider label="Coeficiente a" value={v.a} min={1} max={3} color={MANIM.orange} onChange={(a) => setV((p) => ({ ...p, a }))} />
          <Slider label="Número b" value={v.b} min={-3} max={3} color={MANIM.green} onChange={(b) => setV((p) => ({ ...p, b }))} format={(x) => String(x).replace("-", "−")} />
          <Slider label="Término k (empieza en 0)" value={k} min={0} max={v.n} color={MANIM.yellow} onChange={(kk) => setV((p) => ({ ...p, k: kk }))} />
        </>
      }
    >
      <MathRenderer text={`$(${base})^{${v.n}} = ${poli}$`} className="text-xl" />
      <MathRenderer
        text={`Término ${k + 1}: $\\dbinom{${v.n}}{${k}}\\,(${v.a === 1 ? "" : v.a}x)^{${v.n - k}}\\,(${v.b})^{${k}} = ${t.coef}${xs(t.grado)}$`}
        className="text-base"
      />
      <Readout>
        <Stat color={MANIM.yellow} label="Coeficiente del término" plain>
          <span data-testid="tool-bi-coef">{String(t.coef).replace("-", "−")}</span>
        </Stat>
        <Stat color={MANIM.green} label="Suma de coeficientes" plain>
          <span data-testid="tool-bi-suma">{`${String(suma).replace("-", "−")} = (${v.a} ${v.b < 0 ? "−" : "+"} ${Math.abs(v.b)})${sup(v.n)}`}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}
