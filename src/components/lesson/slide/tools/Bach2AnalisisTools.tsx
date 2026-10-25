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
