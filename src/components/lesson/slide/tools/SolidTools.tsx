"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Solid3D, type SolidKind } from "@/components/lesson/anim/scenes/solidos";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

/** Caras, vértices y aristas de un prisma o una pirámide de base con `n` lados. */
export function solidCounts(kind: SolidKind, n: number) {
  return kind === "prism" ? { c: n + 2, v: 2 * n, a: 3 * n } : { c: n + 1, v: n + 1, a: 2 * n };
}

export function PoliedroExplorador({ block }: { block: ToolBlock }) {
  const initN = Math.round(clamp(Number.isFinite(block.params?.n) ? (block.params?.n as number) : 5, 3, 10));
  const initKind: SolidKind = block.params?.a === 1 ? "pyramid" : "prism";
  const [s, setS] = useState({ n: initN, kind: initKind });
  const { c, v, a } = solidCounts(s.kind, s.n);
  const name = `${s.kind === "prism" ? "Prisma" : "Pirámide"} ${["", "", "", "triangular", "cuadrangular", "pentagonal", "hexagonal", "heptagonal", "octogonal", "eneagonal", "decagonal"][s.n]}`;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el número de lados de la base y comprueba que C + V = A + 2 se cumple siempre."}
      onReset={() => setS({ n: initN, kind: initKind })}
      controls={
        <>
          <Slider label="Lados de la base n" value={s.n} min={3} max={10} color={MANIM.orange} onChange={(n) => setS((p) => ({ ...p, n }))} />
          <div className="flex flex-wrap items-end gap-2">
            <button type="button" className={TOOL_BTN} aria-pressed={s.kind === "prism"} onClick={() => setS((p) => ({ ...p, kind: "prism" }))}>
              Prisma
            </button>
            <button type="button" className={TOOL_BTN} aria-pressed={s.kind === "pyramid"} onClick={() => setS((p) => ({ ...p, kind: "pyramid" }))}>
              Pirámide
            </button>
          </div>
        </>
      }
    >
      <Readout>
        <span className="text-xl font-bold" style={{ color: MANIM.blue }}>{name}</span>
        <span className="text-lg font-semibold" style={{ color: MANIM.yellow }}>Caras: {c}</span>
        <span className="text-lg font-semibold" style={{ color: MANIM.purple }}>Vértices: {v}</span>
        <span className="text-lg font-semibold" style={{ color: MANIM.green }}>Aristas: {a}</span>
      </Readout>
      <Svg h={330} testId="tool-poliedro">
        <Solid3D kind={s.kind} n={s.n} c={[260, 270]} r={120} h={s.kind === "prism" ? 170 : 210} highlight="vertices" />
      </Svg>
      <p className="text-base text-[color:var(--stage-ink,#fff)]">
        Euler: C + V = {c} + {v} = {c + v} y A + 2 = {a} + 2 = {a + 2}.
      </p>
    </Frame>
  );
}
