"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs } from "@/components/lesson/anim/arith";
import {
  DIE_EVENTS, E6, SCENARIOS, birthday, contingency, fracText, meré, pairProbs, regionOf, setOp, threeDice, totalBayes, treeToTable, type SetOp,
} from "@/components/lesson/anim/probbach";
import { FnPlot } from "@/components/lesson/slide/tools/Bach1FuncTools";
import { Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const ink = "text-[color:var(--stage-ink,#fff)]";
const m = (x: number | null, d = 4) => (x === null || !Number.isFinite(x) ? "—" : fmtEs(x, d).replace("-", "−"));
const pct = (x: number | null, d = 2) => (x === null ? "—" : `${fmtEs(x * 100, d)} %`);
const setTxt = (s: number[]) => (s.length ? `{${s.join(", ")}}` : "∅");

/* ───────────── Sucesos con un dado: diagrama de Venn ───────────── */

const OPS: { value: number; label: string; op: SetOp | "demorgan1" | "demorgan2"; sym: string }[] = [
  { value: 0, label: "A ∪ B", op: "union", sym: "A ∪ B" },
  { value: 1, label: "A ∩ B", op: "inter", sym: "A ∩ B" },
  { value: 2, label: "A − B", op: "diff", sym: "A − B" },
  { value: 3, label: "Aᶜ", op: "comp", sym: "Aᶜ" },
  { value: 4, label: "(A ∪ B)ᶜ", op: "demorgan1", sym: "(A ∪ B)ᶜ" },
  { value: 5, label: "Aᶜ ∩ Bᶜ", op: "demorgan2", sym: "Aᶜ ∩ Bᶜ" },
];

function resultOf(op: (typeof OPS)[number]["op"], a: number[], b: number[]): number[] {
  if (op === "demorgan1") return setOp("comp", setOp("union", a, b), b);
  if (op === "demorgan2") return E6.filter((x) => !a.includes(x) && !b.includes(x));
  return setOp(op, a, b);
}

/** Dos sucesos del lanzamiento de un dado: regiones del diagrama de Venn y operaciones. */
export function SucesosVennExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 0, 0, DIE_EVENTS.length - 1), b: int(ini[1], 2, 0, DIE_EVENTS.length - 1), o: int(ini[2], 0, 0, OPS.length - 1) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const A = DIE_EVENTS[v.a]!;
  const B = DIE_EVENTS[v.b]!;
  const O = OPS[v.o]!;
  const res = resultOf(O.op, A.set, B.set);
  const inter = setOp("inter", A.set, B.set);
  const slots = { A: 0, AB: 0, B: 0, none: 0 };
  const pos = (x: number) => {
    const r = regionOf(x, A.set, B.set);
    const i = slots[r]++;
    return r === "A" ? { x: 105, y: 55 + i * 38 } : r === "AB" ? { x: 200, y: 55 + i * 38 } : r === "B" ? { x: 295, y: 55 + i * 38 } : { x: 378, y: 40 + i * 38 };
  };
  const items = E6.map((n) => ({ n, ...pos(n) }));
  return (
    <Frame
      hint={block.hint ?? "Elige los sucesos A y B del lanzamiento de un dado y una operación: los números del resultado se iluminan en el diagrama. Compara (A ∪ B)ᶜ con Aᶜ ∩ Bᶜ."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Suceso A" items={DIE_EVENTS.map((e, i) => ({ value: i, label: e.label }))} value={v.a} onChange={set("a")} />
          <Choice label="Suceso B" items={DIE_EVENTS.map((e, i) => ({ value: i, label: e.label }))} value={v.b} onChange={set("b")} />
          <Choice label="Operación" items={OPS.map((q) => ({ value: q.value, label: q.label }))} value={v.o} onChange={set("o")} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-sv-sucesos">{`A = ${setTxt(A.set)}      B = ${setTxt(B.set)}`}</p>
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-sv-resultado">{`${O.sym} = ${setTxt(res)}   →   P = ${fracText(res.length, 6)}`}</p>
        <p className="text-base" data-testid="tool-sv-compat">{inter.length === 0 ? "A y B son incompatibles: A ∩ B = ∅" : `A y B son compatibles: A ∩ B = ${setTxt(inter)}`}</p>
      </div>
      <Svg w={420} h={250} testId="tool-sv-venn">
        <rect x={6} y={6} width={408} height={238} rx={10} fill="none" stroke={MANIM.muted} strokeWidth={1.5} />
        <circle cx={150} cy={125} r={98} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.blue} strokeWidth={2.5} />
        <circle cx={250} cy={125} r={98} fill={MANIM.orange} fillOpacity={0.14} stroke={MANIM.orange} strokeWidth={2.5} />
        <text x={86} y={34} fontSize={20} fontWeight={700} fill={MANIM.blue}>A</text>
        <text x={316} y={34} fontSize={20} fontWeight={700} fill={MANIM.orange}>B</text>
        {items.map((it) => {
          const on = res.includes(it.n);
          return (
            <g key={it.n}>
              <circle cx={it.x} cy={it.y} r={15} fill={on ? MANIM.yellow : MANIM.surface} stroke={on ? MANIM.yellow : MANIM.muted} strokeWidth={2} />
              <text x={it.x} y={it.y + 6} fontSize={18} fontWeight={700} textAnchor="middle" fill={on ? "#1a1a1a" : MANIM.ink}>{it.n}</text>
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── P(A), P(B), P(A∩B): unión, contrario y condicionada ───────────── */

/** Mosaico de dos sucesos: P(A ∪ B), contrarios, condicionadas e independencia. */
export function ProbUnionExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { pa: int(ini[0], 40, 0, 100), pb: int(ini[1], 25, 0, 100), pab: int(ini[2], 10, 0, 100) };
  const [v, setV] = useState(init);
  const lo = Math.max(0, v.pa + v.pb - 100);
  const hi = Math.min(v.pa, v.pb);
  const pab = clamp(v.pab, lo, hi);
  const r = pairProbs(v.pa / 100, v.pb / 100, pab / 100);
  const W0 = 360;
  const H0 = 240;
  const wA = (v.pa / 100) * W0;
  const hA = r.bGivenA === null ? 0 : r.bGivenA * H0;
  const nA = 1 - v.pa / 100;
  const hN = nA > 0 ? ((v.pb / 100 - pab / 100) / nA) * H0 : 0;
  return (
    <Frame
      hint={block.hint ?? "Cada columna es A o no A (su anchura es la probabilidad). La parte coloreada de cada columna es B. Si las dos partes alcanzan la misma altura, A y B son independientes."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="P(A) (%)" value={v.pa} min={0} max={100} color={MANIM.blue} unit=" %" onChange={(n) => setV((p) => ({ ...p, pa: n }))} />
          <Slider label="P(B) (%)" value={v.pb} min={0} max={100} color={MANIM.orange} unit=" %" onChange={(n) => setV((p) => ({ ...p, pb: n }))} />
          <Slider label={`P(A ∩ B) (%), entre ${lo} y ${hi}`} value={pab} min={lo} max={Math.max(lo, hi)} color={MANIM.green} unit=" %" disabled={lo >= hi} onChange={(n) => setV((p) => ({ ...p, pab: n }))} />
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-pu-union">{`P(A ∪ B) = ${pct(r.union, 1)}   (= P(A) + P(B) − P(A ∩ B))`}</p>
        <p className="text-base" data-testid="tool-pu-contrarios">{`P(Aᶜ) = ${pct(r.notA, 1)}   P(Bᶜ) = ${pct(r.notB, 1)}   P(ni A ni B) = ${pct(r.neither, 1)}`}</p>
        <p className="text-base" data-testid="tool-pu-condicionadas">{`P(A | B) = ${pct(r.aGivenB, 1)}   P(B | A) = ${pct(r.bGivenA, 1)}`}</p>
        <p className="text-lg font-semibold" style={{ color: r.independent ? MANIM.green : r.incompatible ? MANIM.yellow : MANIM.red }} data-testid="tool-pu-tipo">
          {r.incompatible ? "Incompatibles (A ∩ B = ∅): P(A ∪ B) = P(A) + P(B)" : r.independent ? "Independientes: P(A ∩ B) = P(A)·P(B)" : "Dependientes: P(A ∩ B) ≠ P(A)·P(B)"}
        </p>
      </div>
      <Svg w={W0 + 20} h={H0 + 20} testId="tool-pu-mosaico">
        <g transform="translate(10,10)">
          <rect x={0} y={0} width={W0} height={H0} fill="none" stroke={MANIM.muted} strokeWidth={1.5} />
          <rect x={0} y={H0 - hA} width={wA} height={hA} fill={MANIM.green} fillOpacity={0.75} />
          <rect x={wA} y={H0 - hN} width={W0 - wA} height={hN} fill={MANIM.orange} fillOpacity={0.65} />
          <line x1={wA} y1={0} x2={wA} y2={H0} stroke={MANIM.ink} strokeWidth={2} />
          <text x={wA / 2} y={H0 + 16} fontSize={14} textAnchor="middle" fill={MANIM.blue}>A</text>
          <text x={wA + (W0 - wA) / 2} y={H0 + 16} fontSize={14} textAnchor="middle" fill={MANIM.muted}>no A</text>
        </g>
      </Svg>
    </Frame>
  );
}

/* ───────────── Tabla de contingencia ───────────── */

const PRESETS = [
  { value: 0, label: "Estudio del hígado", a: "Diagnóstico correcto", b: "Lesión maligna", c: [206, 12, 268, 14] as [number, number, number, number] },
  { value: 1, label: "Medicamento", a: "Tratado con el medicamento", b: "Curado", c: [50, 30, 10, 10] as [number, number, number, number] },
  { value: 2, label: "Genérico", a: "A", b: "B", c: [20, 30, 10, 40] as [number, number, number, number] },
];

/** Tabla de contingencia con conteos: marginales, árbol que empieza en A y en B, independencia. */
export function TablaContingenciaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const p0 = PRESETS[int(ini[0], 0, 0, PRESETS.length - 1)]!;
  const base = ini.length >= 5 ? [int(ini[1], 0, 0, 400), int(ini[2], 0, 0, 400), int(ini[3], 0, 0, 400), int(ini[4], 0, 0, 400)] : p0.c;
  const init = { p: int(ini[0], 0, 0, PRESETS.length - 1), c: base as number[] };
  const [v, setV] = useState(init);
  const P = PRESETS[v.p]!;
  const c = v.c as [number, number, number, number];
  const t = contingency(c);
  const setC = (k: number) => (n: number) => setV((s) => ({ ...s, c: s.c.map((x, i) => (i === k ? n : x)) }));
  const tot = t ? t.n : 0;
  const rowB = c[0] + c[1];
  const rowNb = c[2] + c[3];
  const colA = c[0] + c[2];
  const colNa = c[1] + c[3];
  const cell = "border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-center tabular-nums";
  return (
    <Frame
      hint={block.hint ?? "Cambia los datos de la tabla: se recalculan las probabilidades, las dos formas de árbol y si los sucesos son independientes."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Datos" items={PRESETS.map((q) => ({ value: q.value, label: q.label }))} value={v.p} onChange={(p) => setV({ p, c: [...PRESETS[p]!.c] })} />
          <Slider label="A y B" value={c[0]} min={0} max={400} color={MANIM.blue} onChange={setC(0)} />
          <Slider label="no A y B" value={c[1]} min={0} max={400} color={MANIM.orange} onChange={setC(1)} />
          <Slider label="A y no B" value={c[2]} min={0} max={400} color={MANIM.green} onChange={setC(2)} />
          <Slider label="no A y no B" value={c[3]} min={0} max={400} color={MANIM.yellow} onChange={setC(3)} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-tc-leyenda">{`A = ${P.a}   ·   B = ${P.b}`}</p>
        <table className="w-full border-collapse text-sm" data-testid="tool-tc-tabla">
          <thead>
            <tr><th className={cell} /><th className={cell}>A</th><th className={cell}>no A</th><th className={cell}>Total</th></tr>
          </thead>
          <tbody>
            <tr><th className={cell}>B</th><td className={cell}>{c[0]}</td><td className={cell}>{c[1]}</td><td className={cell}>{rowB}</td></tr>
            <tr><th className={cell}>no B</th><td className={cell}>{c[2]}</td><td className={cell}>{c[3]}</td><td className={cell}>{rowNb}</td></tr>
            <tr><th className={cell}>Total</th><td className={cell}>{colA}</td><td className={cell}>{colNa}</td><td className={cell}>{tot}</td></tr>
          </tbody>
        </table>
        {t ? (
          <>
            <p className="text-base" data-testid="tool-tc-marginales">{`P(A) = ${fracText(colA, tot)} = ${m(t.pa, 3)}   P(B) = ${fracText(rowB, tot)} = ${m(t.pb, 3)}   P(A ∩ B) = ${fracText(c[0], tot)} = ${m(t.joint.ab, 3)}`}</p>
            <p className="text-base" data-testid="tool-tc-arbol-a">{`Árbol desde A: P(B | A) = ${t.bGivenA === null ? "—" : fracText(c[0], colA)} = ${m(t.bGivenA, 3)}   P(B | no A) = ${t.bGivenNa === null ? "—" : fracText(c[1], colNa)} = ${m(t.bGivenNa, 3)}`}</p>
            <p className="text-base" data-testid="tool-tc-arbol-b">{`Árbol desde B: P(A | B) = ${t.aGivenB === null ? "—" : fracText(c[0], rowB)} = ${m(t.aGivenB, 3)}   P(A | no B) = ${t.aGivenNb === null ? "—" : fracText(c[2], rowNb)} = ${m(t.aGivenNb, 3)}`}</p>
            <p className="text-lg font-semibold" style={{ color: t.independent ? MANIM.green : t.nearIndependent ? MANIM.yellow : MANIM.red }} data-testid="tool-tc-indep">
              {t.independent ? "A y B son independientes: P(B | A) = P(B)" : t.nearIndependent ? "Casi independientes: P(B | A) ≈ P(B) (se diferencian menos de 0,005)" : "A y B son dependientes: P(B | A) ≠ P(B)"}
            </p>
          </>
        ) : (
          <p className="text-base" data-testid="tool-tc-marginales">Introduce algún dato para calcular probabilidades.</p>
        )}
      </div>
    </Frame>
  );
}

/* ───────────── Árbol → tabla ───────────── */

/** Del árbol (P(A), P(B|A), P(B|Ā)) a la tabla de contingencia y al árbol invertido. */
export function ArbolTablaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 30, 0, 100), ba: int(ini[1], 50, 0, 100), bna: int(ini[2], 80, 0, 100) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const t = treeToTable(v.a / 100, v.ba / 100, v.bna / 100);
  const cell = "border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-center tabular-nums";
  return (
    <Frame
      hint={block.hint ?? "Multiplicando por las ramas se obtiene la tabla; dividiendo cada casilla entre el total de su fila se obtiene el árbol que empieza en B."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="P(A) (%)" value={v.a} min={0} max={100} color={MANIM.blue} unit=" %" onChange={set("a")} />
          <Slider label="P(B | A) (%)" value={v.ba} min={0} max={100} color={MANIM.orange} unit=" %" onChange={set("ba")} />
          <Slider label="P(B | no A) (%)" value={v.bna} min={0} max={100} color={MANIM.green} unit=" %" onChange={set("bna")} />
        </>
      }
    >
      <div className={`flex flex-col gap-2 ${ink}`} data-testid="tool-readout">
        <p className="text-base" data-testid="tool-at-productos">{`P(A ∩ B) = ${m(v.a / 100, 2)} · ${m(v.ba / 100, 2)} = ${m(t.joint.ab, 4)}      P(Aᶜ ∩ B) = ${m(1 - v.a / 100, 2)} · ${m(v.bna / 100, 2)} = ${m(t.joint.nab, 4)}`}</p>
        <table className="w-full border-collapse text-sm" data-testid="tool-at-tabla">
          <thead>
            <tr><th className={cell} /><th className={cell}>A</th><th className={cell}>no A</th><th className={cell}>Total</th></tr>
          </thead>
          <tbody>
            <tr><th className={cell}>B</th><td className={cell}>{m(t.joint.ab, 4)}</td><td className={cell}>{m(t.joint.nab, 4)}</td><td className={cell}>{m(t.pb, 4)}</td></tr>
            <tr><th className={cell}>no B</th><td className={cell}>{m(t.joint.anb, 4)}</td><td className={cell}>{m(t.joint.nanb, 4)}</td><td className={cell}>{m(t.pnb, 4)}</td></tr>
            <tr><th className={cell}>Total</th><td className={cell}>{m(v.a / 100, 4)}</td><td className={cell}>{m(1 - v.a / 100, 4)}</td><td className={cell}>1</td></tr>
          </tbody>
        </table>
        <p className="text-base" data-testid="tool-at-inverso">{`Árbol desde B: P(A | B) = ${m(t.aGivenB, 4)}   P(A | no B) = ${m(t.aGivenNb, 4)}   P(no A | B) = ${m(t.naGivenB, 4)}`}</p>
      </div>
    </Frame>
  );
}

/* ───────────── Probabilidad total y Bayes ───────────── */

/** Sistema completo de sucesos: P(B) por la probabilidad total y P(Aᵢ | B) por Bayes. */
export function ProbTotalExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { s: int(ini[0], 2, 0, SCENARIOS.length - 1), neg: int(ini[1], 0, 0, 1), prev: int(ini[2], 2, 1, 50) };
  const [v, setV] = useState(init);
  const base = SCENARIOS[v.s]!;
  const sc =
    v.s === 2
      ? { ...base, hyps: [{ ...base.hyps[0]!, p: v.prev / 100 }, { ...base.hyps[1]!, p: 1 - v.prev / 100 }] }
      : base;
  const r = totalBayes(sc, v.neg === 1);
  const evName = v.neg === 1 ? sc.notEvent : sc.event;
  return (
    <Frame
      hint={block.hint ?? "Cada rama del árbol aporta p·P(B|Aᵢ). Sumándolas sale P(B) (probabilidad total); dividiendo cada una entre P(B) salen las probabilidades de Bayes."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Situación" items={SCENARIOS.map((q, i) => ({ value: i, label: q.label }))} value={v.s} onChange={(s) => setV((p) => ({ ...p, s }))} />
          <Choice label="Suceso observado" items={[{ value: 0, label: sc.event }, { value: 1, label: sc.notEvent }]} value={v.neg} onChange={(neg) => setV((p) => ({ ...p, neg }))} />
          {v.s === 2 ? <Slider label="Móviles defectuosos (%)" value={v.prev} min={1} max={50} color={MANIM.red} unit=" %" onChange={(prev) => setV((p) => ({ ...p, prev }))} /> : null}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        <p className="text-sm" style={{ color: MANIM.muted }} data-testid="tool-pt-enunciado">{sc.question}</p>
        <ul className="text-base" data-testid="tool-pt-ramas">
          {sc.hyps.map((h, i) => (
            <li key={h.name}>{`P(${h.name}) · P(${evName} | ${h.name}) = ${m(h.p, 4)} · ${m(v.neg === 1 ? 1 - h.cond : h.cond, 4)} = ${m(r.joint[i]!, 5)}`}</li>
          ))}
        </ul>
        <p className="text-lg font-bold" style={{ color: MANIM.green }} data-testid="tool-pt-total">{`P(${evName}) = ${m(r.total, 5)}   (probabilidad total)`}</p>
        <ul className="text-base" data-testid="tool-pt-bayes">
          {sc.hyps.map((h, i) => (
            <li key={h.name}>{`P(${h.name} | ${evName}) = ${m(r.joint[i]!, 5)} / ${m(r.total, 5)} = ${pct(r.posterior[i]!, 2)}`}</li>
          ))}
        </ul>
      </div>
      <Svg w={420} h={60} testId="tool-pt-barras">
        {sc.hyps.map((h, i) => {
          const x0 = 10 + r.posterior.slice(0, i).reduce((a, b) => a + b, 0) * 400;
          const w = r.posterior[i]! * 400;
          return (
            <g key={h.name}>
              <rect x={x0} y={14} width={w} height={32} fill={[MANIM.blue, MANIM.orange, MANIM.green][i % 3]} fillOpacity={0.85} />
              {w > 60 ? <text x={x0 + w / 2} y={36} fontSize={13} fontWeight={700} textAnchor="middle" fill="#101418">{`${h.name} ${fmtEs(r.posterior[i]! * 100, 1)} %`}</text> : null}
            </g>
          );
        })}
      </Svg>
    </Frame>
  );
}

/* ───────────── Problemas famosos ───────────── */

function decompositions(s: number): { triple: [number, number, number]; orders: number }[] {
  const out: { triple: [number, number, number]; orders: number }[] = [];
  for (let a = 1; a <= 6; a += 1) for (let b = a; b <= 6; b += 1) for (let c = b; c <= 6; c += 1) {
    if (a + b + c !== s) continue;
    out.push({ triple: [a, b, c], orders: a === b && b === c ? 1 : a === b || b === c ? 3 : 6 });
  }
  return out;
}

const FAMOSO_MODES = [
  { value: 0, label: "Paradoja del cumpleaños" },
  { value: 1, label: "Caballero de la Meré" },
  { value: 2, label: "Problema de Galileo" },
];

/** Cumpleaños, Caballero de la Meré y Galileo con el cálculo del suceso contrario y el recuento. */
export function AzarFamosoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { mo: int(ini[0], 0, 0, 2), n: int(ini[1], 23, 1, 60), d: int(ini[2], 0, 0, 1), s: int(ini[3], 10, 3, 18) };
  const [v, setV] = useState(init);
  const set = (k: keyof typeof init) => (n: number) => setV((p) => ({ ...p, [k]: n }));
  const dec = decompositions(v.s);
  const count = threeDice(v.s);
  const mode = v.mo;
  const meMode = v.d === 0 ? "uno" : "doble";
  const n = mode === 0 ? clamp(v.n, 2, 60) : v.n;
  return (
    <Frame
      hint={block.hint ?? "La clave en los tres casos: contar bien los resultados (Galileo) o pasar al suceso contrario «ninguna vez» (cumpleaños y Meré)."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Problema" items={FAMOSO_MODES} value={mode} onChange={set("mo")} />
          {mode === 0 ? <Slider label="Personas en el grupo" value={n} min={2} max={60} color={MANIM.blue} onChange={set("n")} /> : null}
          {mode === 1 ? (
            <>
              <Choice label="Apuesta" items={[{ value: 0, label: "Un 6 con un dado" }, { value: 1, label: "Un 6 doble con dos dados" }]} value={v.d} onChange={set("d")} />
              <Slider label="Número de tiradas" value={clamp(v.n, 1, 60)} min={1} max={60} color={MANIM.orange} onChange={set("n")} />
            </>
          ) : null}
          {mode === 2 ? <Slider label="Suma de los tres dados" value={v.s} min={3} max={18} color={MANIM.green} onChange={set("s")} /> : null}
        </>
      }
    >
      <div className={`flex flex-col gap-1 ${ink}`} data-testid="tool-readout">
        {mode === 0 ? (
          <>
            <p className="text-base" data-testid="tool-af-formula">{`P(todos distintos) = (365/365)·(364/365)·…·((365 − ${n - 1})/365)`}</p>
            <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-af-valor">{`P(dos cumplen años el mismo día) = ${pct(birthday(n), 2)}`}</p>
            <p className="text-base" data-testid="tool-af-nota">{birthday(n) > 0.5 ? "Ya es más probable que sí a que no." : "Todavía es más probable que no haya coincidencias."}</p>
          </>
        ) : null}
        {mode === 1 ? (
          <>
            <p className="text-base" data-testid="tool-af-formula">{meMode === "uno" ? `P(ningún 6 en ${clamp(v.n, 1, 60)} tiradas) = (5/6)^${clamp(v.n, 1, 60)}` : `P(ningún 6 doble en ${clamp(v.n, 1, 60)} tiradas) = (35/36)^${clamp(v.n, 1, 60)}`}</p>
            <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-af-valor">{`P(al menos una vez) = ${pct(meré(meMode, clamp(v.n, 1, 60)), 2)}`}</p>
            <p className="text-base" data-testid="tool-af-nota">{`Referencias: 4 tiradas de un dado → ${pct(meré("uno", 4), 2)}; 24 tiradas de dos dados → ${pct(meré("doble", 24), 2)}.`}</p>
          </>
        ) : null}
        {mode === 2 ? (
          <>
            <ul className="text-base" data-testid="tool-af-lista">
              {dec.map((d) => (
                <li key={d.triple.join("")}>{`${d.triple.join(" + ")}  →  ${d.orders} ${d.orders === 1 ? "orden" : "órdenes"}`}</li>
              ))}
            </ul>
            <p className="text-xl font-bold" style={{ color: MANIM.green }} data-testid="tool-af-valor">{`Suma ${v.s}: ${count} casos de 216 → P = ${fracText(count, 216)} ≈ ${pct(count / 216, 2)}`}</p>
            <p className="text-base" data-testid="tool-af-nota">{`Hay ${dec.length} descomposiciones, pero no todas son igual de probables.`}</p>
          </>
        ) : null}
      </div>
      {mode === 0 ? (
        <FnPlot testId="tool-af-grafica" xr={[0, 60]} yr={[0, 1.05]} xTicks={[10, 20, 30, 40, 50].map((x) => ({ x, label: String(x) }))} curves={[{ fn: (x) => birthday(Math.floor(x)), color: MANIM.blue }]} marks={[{ x: n, y: birthday(n), color: MANIM.yellow, r: 6 }]} hlines={[0.5]} />
      ) : mode === 1 ? (
        <FnPlot testId="tool-af-grafica" xr={[0, 60]} yr={[0, 1.05]} xTicks={[10, 20, 30, 40, 50].map((x) => ({ x, label: String(x) }))} curves={[{ fn: (x) => meré("uno", Math.floor(x)), color: MANIM.blue }, { fn: (x) => meré("doble", Math.floor(x)), color: MANIM.orange }]} marks={[{ x: clamp(v.n, 1, 60), y: meré(meMode, clamp(v.n, 1, 60)), color: MANIM.yellow, r: 6 }]} hlines={[0.5]} />
      ) : null}
    </Frame>
  );
}
