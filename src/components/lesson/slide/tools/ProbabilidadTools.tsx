"use client";

import { useState } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import { fracValue } from "@/components/lesson/anim/eq";
import { DICE_OPS, diceCount, diceDistribution, fadd, leafP, pTex, urnTree, type DiceOp } from "@/components/lesson/anim/prob";
import { Frame, Slider, TOOL_BTN, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const d3 = (x: number) => fmtEs(Math.round(x * 1000) / 1000, 3);

/* ───────────── Urna con árbol ───────────── */

export function UrnaArbolExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { g: int(ini[0], 3, 1, 8), r: int(ini[1], 2, 1, 8), rep: ini[2] === 1 };
  const [s, setS] = useState(init);
  const t = urnTree(s.g, s.r, s.rep);
  const vv = leafP(t, "V", "V");
  const vr = leafP(t, "V", "R");
  const rv = leafP(t, "R", "V");
  const rr = leafP(t, "R", "R");
  const distintas = fadd(vr, rv);

  return (
    <Frame
      hint={block.hint ?? "Cambia las bolas y activa el reemplazamiento: sin reemplazamiento, la 2.ª extracción cambia según lo que salió antes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Bolas verdes" value={s.g} min={1} max={8} color={MANIM.green} onChange={(g) => setS((p) => ({ ...p, g }))} />
          <Slider label="Bolas rojas" value={s.r} min={1} max={8} color={MANIM.red} onChange={(r) => setS((p) => ({ ...p, r }))} />
          <div className="flex flex-col gap-2">
            <button type="button" className={`${TOOL_BTN} ${!s.rep ? "border-white bg-white/20" : ""}`} aria-pressed={!s.rep} onClick={() => setS((p) => ({ ...p, rep: false }))}>Sin reemplazamiento</button>
            <button type="button" className={`${TOOL_BTN} ${s.rep ? "border-white bg-white/20" : ""}`} aria-pressed={s.rep} onClick={() => setS((p) => ({ ...p, rep: true }))}>Con reemplazamiento</button>
          </div>
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$P(V) = ${pTex(t[0]!.p1)},\\quad P(V/V) = ${pTex(t[0]!.p2)},\\quad P(V/R) = ${pTex(t[2]!.p2)}$`} className="text-base" />
        <p className="text-base" style={{ color: MANIM.green }} data-testid="tool-urna-vv">{`P(verde y verde) = ${vv.n}/${vv.d} ≈ ${d3(fracValue(vv))}`}</p>
        <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-urna-rr">{`P(roja y roja) = ${rr.n}/${rr.d} ≈ ${d3(fracValue(rr))}`}</p>
        <p className="text-base" style={{ color: MANIM.yellow }} data-testid="tool-urna-distintas">{`P(una de cada color) = ${distintas.n}/${distintas.d} ≈ ${d3(fracValue(distintas))}`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-urna-ramas">{`V,R: ${vr.n}/${vr.d} · R,V: ${rv.n}/${rv.d}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Dos dados ───────────── */

const OPS: { id: DiceOp; label: string }[] = [
  { id: "suma", label: "Suma" },
  { id: "diferencia", label: "Diferencia" },
  { id: "mayor", label: "Mayor" },
  { id: "menor", label: "Menor" },
  { id: "producto", label: "Producto" },
];

export function DosDadosExplorador({ block }: { block: ToolBlock }) {
  const idx0 = int(block.params?.a, 1, 0, OPS.length - 1);
  const [op, setOp] = useState<DiceOp>(OPS[idx0]!.id);
  const [cmp, setCmp] = useState<">" | "<" | "=">(">");
  const [k, setK] = useState(int(block.params?.b, 3, 0, 36));
  const dist = diceDistribution(op);
  const maxV = Math.max(...dist.keys());
  const favorable = diceCount(op, cmp, k);
  const cell = (a: number, b: number) => {
    const v = DICE_OPS[op](a, b);
    return (cmp === ">" && v > k) || (cmp === "<" && v < k) || (cmp === "=" && v === k);
  };

  return (
    <Frame
      hint={block.hint ?? "Elige la operación con los dos dados y una condición: las casillas marcadas son los casos favorables, de 36."}
      onReset={() => {
        setOp(OPS[idx0]!.id);
        setCmp(">");
        setK(int(block.params?.b, 3, 0, 36));
      }}
      controls={
        <>
          <div className="flex flex-wrap gap-2">
            {OPS.map((o) => (
              <button key={o.id} type="button" className={`${TOOL_BTN} ${op === o.id ? "border-white bg-white/20" : ""}`} aria-pressed={op === o.id} onClick={() => setOp(o.id)}>{o.label}</button>
            ))}
          </div>
          <div className="flex gap-2">
            {([">", "<", "="] as const).map((c) => (
              <button key={c} type="button" className={`${TOOL_BTN} ${cmp === c ? "border-white bg-white/20" : ""}`} aria-pressed={cmp === c} onClick={() => setCmp(c)}>{c === ">" ? "mayor que" : c === "<" ? "menor que" : "igual a"}</button>
            ))}
          </div>
          <Slider label="Valor k" value={k} min={0} max={Math.max(12, maxV)} color={MANIM.yellow} onChange={setK} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <p className="text-lg font-semibold" style={{ color: MANIM.yellow }} data-testid="tool-dados-p">{`P(${OPS.find((o) => o.id === op)!.label.toLowerCase()} ${cmp} ${k}) = ${favorable}/36 ≈ ${d3(favorable / 36)}`}</p>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-dados-dist">{`Distribución: ${[...dist.entries()].map(([v, n]) => `${v}: ${n}/36`).join(" · ")}`}</p>
      </div>
      <svg viewBox="0 0 260 260" className="mx-auto w-full max-w-xs" aria-hidden data-testid="tool-dados">
        {Array.from({ length: 6 }, (_, i) => i + 1).map((a) =>
          Array.from({ length: 6 }, (_, j) => j + 1).map((b) => {
            const on = cell(a, b);
            return (
              <g key={`${a}-${b}`}>
                <rect x={30 + (a - 1) * 36} y={30 + (b - 1) * 36} width={34} height={34} rx={4} fill={on ? MANIM.green : MANIM.panel} fillOpacity={on ? 0.8 : 1} stroke={MANIM.grid} />
                <text x={30 + (a - 1) * 36 + 17} y={30 + (b - 1) * 36 + 22} textAnchor="middle" fontSize={14} fill={MANIM.ink}>{DICE_OPS[op](a, b)}</text>
              </g>
            );
          }),
        )}
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <g key={n}>
            <text x={47 + (n - 1) * 36} y={22} textAnchor="middle" fontSize={13} fill={MANIM.muted}>{n}</text>
            <text x={18} y={53 + (n - 1) * 36} textAnchor="middle" fontSize={13} fill={MANIM.muted}>{n}</text>
          </g>
        ))}
      </svg>
    </Frame>
  );
}

/* ───────────── Pruebas independientes repetidas ───────────── */

export function IndependientesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { p: int(ini[0], 50, 1, 99), n: int(ini[1], 3, 1, 8) };
  const [s, setS] = useState(init);
  const p = s.p / 100;
  const todas = p ** s.n;
  const ninguna = (1 - p) ** s.n;
  const alguna = 1 - ninguna;

  return (
    <Frame
      hint={block.hint ?? "Con n pruebas independientes, P(todas) = pⁿ y P(ninguna) = (1 − p)ⁿ. «Alguna» es el complementario de «ninguna»."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Probabilidad de éxito en cada prueba" value={s.p} min={1} max={99} color={MANIM.blue} unit=" %" onChange={(v) => setS((q) => ({ ...q, p: v }))} />
          <Slider label="Número de pruebas" value={s.n} min={1} max={8} color={MANIM.orange} onChange={(n) => setS((q) => ({ ...q, n }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1 text-[color:var(--stage-ink,#fff)]" data-testid="tool-readout">
        <MathRenderer text={`$P(\\text{todas}) = ${fmtEs(p, 2).replace(",", "{,}")}^{${s.n}}$`} className="text-base" />
        <p className="text-base" style={{ color: MANIM.green }} data-testid="tool-ind-todas">{`P(todas) = ${d3(todas)}`}</p>
        <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-ind-ninguna">{`P(ninguna) = ${d3(ninguna)}`}</p>
        <p className="text-base" style={{ color: MANIM.yellow }} data-testid="tool-ind-alguna">{`P(alguna) = 1 − P(ninguna) = ${d3(alguna)}`}</p>
      </div>
      <svg viewBox="0 0 420 60" className="w-full" aria-hidden>
        <rect x={10} y={10} width={400 * todas} height={14} fill={MANIM.green} />
        <rect x={10} y={32} width={400 * ninguna} height={14} fill={MANIM.red} />
      </svg>
    </Frame>
  );
}
