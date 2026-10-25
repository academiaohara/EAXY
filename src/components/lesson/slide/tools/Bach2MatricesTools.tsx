"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { caminos, det, inversa, mat, mAdd, mEq, mMul, mPow, mScale, mSub, q, qShow } from "@/components/lesson/anim/matrices";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { MatrixEditor, MatrixView, gridFrom } from "@/components/lesson/slide/tools/matrix-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { cellsOf, numCells } from "@/components/lesson/anim/matrix-svg";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sgn = (x: number) => String(x).replace("-", "−");
const sup = (n: number) => String(n).replace(/\d/g, (d) => "⁰¹²³⁴⁵⁶⁷⁸⁹"[Number(d)]!);

/** `initial`: [a11, a12, a21, a22, b11, b12, b21, b22, k, operación (0 suma, 1 resta, 2 k·A)]. */
export function MatrizOperacionesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    A: gridFrom(ini, 0, 2, 2, [[1, 2], [-1, 3]]),
    B: gridFrom(ini, 4, 2, 2, [[2, -1], [0, 4]]),
    k: int(ini[8], 3, -5, 5),
    op: int(ini[9], 0, 0, 2),
  };
  const [v, setV] = useState(init);
  const A = mat(v.A);
  const B = mat(v.B);
  const R = v.op === 0 ? mAdd(A, B) : v.op === 1 ? mSub(A, B) : mScale(q(v.k), A);
  const sym = v.op === 0 ? "A + B" : v.op === 1 ? "A − B" : `${sgn(v.k)}·A`;
  return (
    <Frame
      hint={block.hint ?? "Suma y resta: elemento a elemento (misma dimensión). El número multiplica todos los elementos. Cambia un valor y mira solo la celda que se modifica."}
      onReset={() => setV(init)}
      controls={
        <>
          <MatrixEditor name="A" m={v.A} rows={2} cols={2} onChange={(A2) => setV((p) => ({ ...p, A: A2 }))} color={MANIM.blue} />
          <MatrixEditor name="B" m={v.B} rows={2} cols={2} onChange={(B2) => setV((p) => ({ ...p, B: B2 }))} color={MANIM.green} />
          <Slider label="Número k" value={v.k} min={-5} max={5} color={MANIM.orange} onChange={(k) => setV((p) => ({ ...p, k }))} format={sgn} />
          <Choice
            label="Operación"
            value={v.op}
            onChange={(op) => setV((p) => ({ ...p, op }))}
            items={[
              { value: 0, label: "A + B" },
              { value: 1, label: "A − B" },
              { value: 2, label: "k · A" },
            ]}
          />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <MatrixView cells={numCells(v.A)} tint={() => MANIM.blue} />
        <span className="text-xl text-[color:var(--stage-muted,#b8c2d0)]">{v.op === 0 ? "+" : v.op === 1 ? "−" : ""}</span>
        {v.op < 2 ? <MatrixView cells={numCells(v.B)} tint={() => MANIM.green} /> : <span className="text-xl font-bold text-[color:var(--stage-muted,#b8c2d0)]">con k = {sgn(v.k)}</span>}
        <span className="text-xl text-[color:var(--stage-muted,#b8c2d0)]">=</span>
        <MatrixView cells={cellsOf(R)} tint={() => MANIM.yellow} testId="tool-mo-resultado" />
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label={`Elemento (1, 1) de ${sym}`} plain>
          <span data-testid="tool-mo-c11">{qShow(R[0]![0]!)}</span>
        </Stat>
        <Stat color={MANIM.green} label="Suma de todos los elementos" plain>
          <span data-testid="tool-mo-suma">{qShow(R.flat().reduce((s, x) => ({ n: s.n * x.d + x.n * s.d, d: s.d * x.d }), q(0)))}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: [m, n, r, p] = dimensiones de A (m×n) y B (r×p); y después los 9 elementos de A y los 9 de B. */
export function MatrizProductoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = {
    m: int(ini[0], 2, 1, 3),
    n: int(ini[1], 3, 1, 3),
    r: int(ini[2], 3, 1, 3),
    p: int(ini[3], 2, 1, 3),
    A: gridFrom(ini, 4, 3, 3, [[1, 2, 3], [4, 5, 6], [1, 0, 2]]),
    B: gridFrom(ini, 13, 3, 3, [[2, 1, 0], [3, 2, 1], [4, 1, 2]]),
    i: 0,
    j: 0,
  };
  const [v, setV] = useState(init);
  const A = mat(v.A.slice(0, v.m).map((r) => r.slice(0, v.n)));
  const B = mat(v.B.slice(0, v.r).map((r) => r.slice(0, v.p)));
  const P = mMul(A, B);
  const i = Math.min(v.i, v.m - 1);
  const j = Math.min(v.j, v.p - 1);
  const BA = mMul(B, A);
  const expansion = P ? A[i]!.map((a, k) => `${sgn(a.n)}·${sgn(B[k]![j]!.n)}`).join(" + ") : "";
  return (
    <Frame
      hint={block.hint ?? "Solo se puede multiplicar si las columnas de A son las filas de B. Mueve i y j para ver qué fila y qué columna dan cada elemento."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Filas de A" value={v.m} min={1} max={3} color={MANIM.blue} onChange={(m) => setV((p) => ({ ...p, m }))} />
          <Slider label="Columnas de A" value={v.n} min={1} max={3} color={MANIM.blue} onChange={(n) => setV((p) => ({ ...p, n }))} />
          <Slider label="Filas de B" value={v.r} min={1} max={3} color={MANIM.green} onChange={(r) => setV((p) => ({ ...p, r }))} />
          <Slider label="Columnas de B" value={v.p} min={1} max={3} color={MANIM.green} onChange={(p2) => setV((p) => ({ ...p, p: p2 }))} />
          <MatrixEditor name="A" m={v.A} rows={v.m} cols={v.n} onChange={(A2) => setV((p) => ({ ...p, A: v.A.map((r, a) => r.map((x, b) => A2[a]?.[b] ?? x)) }))} color={MANIM.blue} />
          <MatrixEditor name="B" m={v.B} rows={v.r} cols={v.p} onChange={(B2) => setV((p) => ({ ...p, B: v.B.map((r, a) => r.map((x, b) => B2[a]?.[b] ?? x)) }))} color={MANIM.green} />
        </>
      }
    >
      <p className="text-base" data-testid="tool-mp-dim">
        {`A: ${v.m}×${v.n}   B: ${v.r}×${v.p}   →   `}
        {P ? `A·B: ${v.m}×${v.p}` : "A·B no está definido"}
        {`;  ${BA ? `B·A: ${v.r}×${v.n}` : "B·A no está definido"}`}
      </p>
      {P ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <MatrixView cells={cellsOf(A)} tint={(a) => (a === i ? MANIM.blue : undefined)} mark={(a) => (a === i ? MANIM.blue : undefined)} />
            <span className="text-xl">·</span>
            <MatrixView cells={cellsOf(B)} tint={(_, b) => (b === j ? MANIM.green : undefined)} mark={(_, b) => (b === j ? MANIM.green : undefined)} />
            <span className="text-xl">=</span>
            <MatrixView cells={cellsOf(P)} mark={(a, b) => (a === i && b === j ? MANIM.yellow : undefined)} tint={(a, b) => (a === i && b === j ? MANIM.yellow : undefined)} testId="tool-mp-resultado" />
          </div>
          <Slider label="Fila i del resultado" value={i + 1} min={1} max={v.m} color={MANIM.blue} onChange={(x) => setV((p) => ({ ...p, i: x - 1 }))} />
          <Slider label="Columna j del resultado" value={j + 1} min={1} max={v.p} color={MANIM.green} onChange={(x) => setV((p) => ({ ...p, j: x - 1 }))} />
          <p className="text-base text-[color:var(--stage-ink,#fff)]" data-testid="tool-mp-calculo">
            {`c${i + 1}${j + 1} = ${expansion} = ${sgn(P[i]![j]!.n)}`}
          </p>
        </>
      ) : (
        <p className="text-base" style={{ color: MANIM.orange }} data-testid="tool-mp-error">
          {`A tiene ${v.n} columnas y B tiene ${v.r} filas: no coinciden, así que no se pueden multiplicar en ese orden.`}
        </p>
      )}
    </Frame>
  );
}

/** `initial`: [tamaño (2 o 3), y los 9 elementos por filas]. */
export function MatrizInversaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const n0 = int(ini[0], 2, 2, 3);
  const init = { n: n0, M: gridFrom(ini, 1, 3, 3, [[1, 2, 0], [3, 4, 0], [0, 0, 1]]) };
  const [v, setV] = useState(init);
  const A = mat(v.M.slice(0, v.n).map((r) => r.slice(0, v.n)));
  const d = det(A);
  const inv = inversa(A);
  const check = inv ? mMul(A, inv.inv) : null;
  const I = mat(Array.from({ length: v.n }, (_, a) => Array.from({ length: v.n }, (_, b) => (a === b ? 1 : 0))));
  return (
    <Frame
      hint={block.hint ?? "A tiene inversa solo si su determinante no es 0. Prueba con filas proporcionales (por ejemplo 1 2 / 3 6): la matriz se vuelve singular."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice
            label="Tamaño"
            value={v.n}
            onChange={(n) => setV((p) => ({ ...p, n }))}
            items={[
              { value: 2, label: "2 × 2" },
              { value: 3, label: "3 × 3" },
            ]}
          />
          <MatrixEditor name="A" m={v.M} rows={v.n} cols={v.n} onChange={(M2) => setV((p) => ({ ...p, M: p.M.map((r, a) => r.map((x, b) => M2[a]?.[b] ?? x)) }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Determinante de A" plain>
          <span data-testid="tool-mi-det">{qShow(d)}</span>
        </Stat>
        <Stat color={inv ? MANIM.green : MANIM.red} label="¿Tiene inversa?" plain>
          <span data-testid="tool-mi-estado">{inv ? "Sí (regular)" : "No (singular)"}</span>
        </Stat>
      </Readout>
      {inv ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <MatrixView cells={cellsOf(A)} label="A" />
            <MatrixView cells={cellsOf(inv.inv)} label="A⁻¹" tint={() => MANIM.green} testId="tool-mi-inversa" />
          </div>
          <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-mi-check">
            {check && mEq(check, I) ? "Comprobación: A · A⁻¹ = I ✓" : "Comprobación fallida"}
          </p>
        </>
      ) : (
        <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-mi-singular">
          Al hacer Gauss–Jordan aparece una fila de ceros a la izquierda: no se puede llegar a la identidad.
        </p>
      )}
    </Frame>
  );
}

const PRESETS: { name: string; m: number[][]; nota: string }[] = [
  { name: "Giro de 90°", m: [[0, -1], [1, 0]], nota: "Se repite cada 4 potencias: A⁴ = I." },
  { name: "Cizalla", m: [[1, 1], [0, 1]], nota: "Aⁿ = (1 n; 0 1): el elemento superior derecho vale n." },
  { name: "Todo unos", m: [[1, 1], [1, 1]], nota: "Aⁿ = 2ⁿ⁻¹ · A: cada potencia duplica los elementos." },
  { name: "Diagonal", m: [[2, 0], [0, 3]], nota: "En una diagonal se eleva cada elemento: (2ⁿ, 3ⁿ)." },
  { name: "Fibonacci", m: [[1, 1], [1, 0]], nota: "Los elementos de Aⁿ son números de Fibonacci." },
];

/** `initial`: [matriz (0–4), n (0–12)]. */
export function MatrizPotenciasExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { p: int(ini[0], 0, 0, PRESETS.length - 1), n: int(ini[1], 4, 0, 12) };
  const [v, setV] = useState(init);
  const P = PRESETS[v.p]!;
  const R = mPow(mat(P.m), v.n);
  return (
    <Frame
      hint={block.hint ?? "Calcula Aⁿ y busca el patrón: algunas matrices se repiten, otras crecen de forma sencilla. Después se demuestra por inducción."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice
            label="Matriz A"
            value={v.p}
            onChange={(p) => setV((s) => ({ ...s, p }))}
            items={PRESETS.map((x, i) => ({ value: i, label: x.name }))}
          />
          <Slider label="Exponente n" value={v.n} min={0} max={12} color={MANIM.orange} onChange={(n) => setV((s) => ({ ...s, n }))} />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <MatrixView cells={numCells(P.m)} label="A =" tint={() => MANIM.blue} />
        <MatrixView cells={cellsOf(R)} label={`A${sup(v.n)} =`} tint={() => MANIM.yellow} testId="tool-mpot-resultado" />
      </div>
      <p className="text-base" data-testid="tool-mpot-nota">{P.nota}</p>
      <Stat color={MANIM.green} label="Elemento (1, 2) de Aⁿ" plain>
        <span data-testid="tool-mpot-c12">{qShow(R[0]![1]!)}</span>
      </Stat>
    </Frame>
  );
}

const NAMES = ["A", "B", "C", "D"];
const NODE: [number, number][] = [[60, 120], [180, 40], [300, 120], [180, 200]];

/** `initial`: [k (1–5), i origen (0–3), j destino (0–3), y los 16 elementos de la matriz de adyacencia]. */
export function GrafoCaminosExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const dflt = [[0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
  const init = { k: int(ini[0], 2, 1, 5), i: int(ini[1], 0, 0, 3), j: int(ini[2], 2, 0, 3), M: gridFrom(ini, 3, 4, 4, dflt, 0, 1) };
  const [v, setV] = useState(init);
  const P = caminos(v.M, v.k);
  const total = P.flat().reduce((s, x) => s + x, 0);
  const toggle = (a: number, b: number) => setV((s) => ({ ...s, M: s.M.map((r, x) => r.map((c, y) => (x === a && y === b ? 1 - c : c))) }));
  return (
    <Frame
      hint={block.hint ?? "Pulsa una casilla de la matriz para añadir o quitar una arista. El elemento (i, j) de Aᵏ cuenta los caminos de longitud k de i a j."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Longitud k del camino" value={v.k} min={1} max={5} color={MANIM.orange} onChange={(k) => setV((s) => ({ ...s, k }))} />
          <Choice label="Desde" value={v.i} onChange={(i) => setV((s) => ({ ...s, i }))} items={NAMES.map((n, i) => ({ value: i, label: n }))} />
          <Choice label="Hasta" value={v.j} onChange={(j) => setV((s) => ({ ...s, j }))} items={NAMES.map((n, j) => ({ value: j, label: n }))} />
          <div className="flex flex-col gap-1.5">
            <span className="text-sm font-semibold" style={{ color: MANIM.blue }}>Matriz de adyacencia (pulsa para cambiar)</span>
            <div className="inline-grid grid-cols-4 gap-1.5" style={{ maxWidth: "11rem" }}>
              {v.M.map((r, a) =>
                r.map((c, b) => (
                  <button
                    key={`${a}-${b}`}
                    type="button"
                    aria-label={`Arista ${NAMES[a]}→${NAMES[b]}: ${c}`}
                    aria-pressed={c === 1}
                    onClick={() => toggle(a, b)}
                    className="rounded-md border border-[color:var(--stage-border,#3d4f66)] py-1 text-base font-bold tabular-nums"
                    style={{ background: c ? `${MANIM.blue}55` : "transparent", color: c ? MANIM.ink : MANIM.muted }}
                  >
                    {c}
                  </button>
                )),
              )}
            </div>
          </div>
        </>
      }
    >
      <svg viewBox="0 0 360 240" className="mx-auto block h-auto w-full max-w-xs" aria-hidden focusable="false">
        <defs>
          <marker id="gc-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.muted} />
          </marker>
        </defs>
        {v.M.map((r, a) =>
          r.map((c, b) => {
            if (!c) return null;
            if (a === b) {
              const [x, y] = NODE[a]!;
              return <circle key={`${a}-${b}`} cx={x} cy={y - 30} r={14} fill="none" stroke={MANIM.muted} strokeWidth={2} markerEnd="url(#gc-arrow)" />;
            }
            const [x1, y1] = NODE[a]!;
            const [x2, y2] = NODE[b]!;
            const L = Math.hypot(x2 - x1, y2 - y1);
            const ux = (x2 - x1) / L;
            const uy = (y2 - y1) / L;
            const off = v.M[b]![a] === 1 ? 7 : 0;
            return (
              <line key={`${a}-${b}`} x1={x1 + ux * 20 - uy * off} y1={y1 + uy * 20 + ux * off} x2={x2 - ux * 26 - uy * off} y2={y2 - uy * 26 + ux * off} stroke={MANIM.muted} strokeWidth={2.5} markerEnd="url(#gc-arrow)" />
            );
          }),
        )}
        {NODE.map(([x, y], n) => (
          <g key={n}>
            <circle cx={x} cy={y} r={20} fill={MANIM.surface} stroke={n === v.i ? MANIM.green : n === v.j ? MANIM.yellow : MANIM.blue} strokeWidth={3} />
            <text x={x} y={y + 7} textAnchor="middle" fontSize={20} fontWeight={700} fill={MANIM.ink}>{NAMES[n]}</text>
          </g>
        ))}
      </svg>
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <MatrixView cells={numCells(P)} label={`A${sup(v.k)} =`} mark={(a, b) => (a === v.i && b === v.j ? MANIM.yellow : undefined)} tint={(a, b) => (a === v.i && b === v.j ? MANIM.yellow : undefined)} testId="tool-gc-matriz" />
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label={`Caminos de longitud ${v.k} de ${NAMES[v.i]} a ${NAMES[v.j]}`} plain>
          <span data-testid="tool-gc-caminos">{String(P[v.i]![v.j]!)}</span>
        </Stat>
        <Stat color={MANIM.green} label="Caminos de esa longitud en total" plain>
          <span data-testid="tool-gc-total">{String(total)}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}


/** `initial`: los 4 elementos de A y los 4 de B (por filas). Muestra AB, BA y si coinciden. */
export function MatrizConmutaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { A: gridFrom(ini, 0, 2, 2, [[1, 2], [0, 1]]), B: gridFrom(ini, 4, 2, 2, [[0, 1], [1, 0]]) };
  const [v, setV] = useState(init);
  const A = mat(v.A);
  const B = mat(v.B);
  const AB = mMul(A, B)!;
  const BA = mMul(B, A)!;
  const igual = mEq(AB, BA);
  const diff = AB.flat().filter((x, k) => !(x.n === BA.flat()[k]!.n && x.d === BA.flat()[k]!.d)).length;
  return (
    <Frame
      hint={block.hint ?? "Casi siempre AB y BA son distintas. Busca matrices B que conmuten con A: por ejemplo, las que tienen la forma (a b / 0 a) cuando A = (1 2 / 0 1)."}
      onReset={() => setV(init)}
      controls={
        <>
          <MatrixEditor name="A" m={v.A} rows={2} cols={2} onChange={(A2) => setV((p) => ({ ...p, A: A2 }))} color={MANIM.blue} />
          <MatrixEditor name="B" m={v.B} rows={2} cols={2} onChange={(B2) => setV((p) => ({ ...p, B: B2 }))} color={MANIM.green} />
        </>
      }
    >
      <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
        <MatrixView cells={cellsOf(AB)} label="A·B =" tint={() => MANIM.yellow} testId="tool-mc-ab" />
        <MatrixView cells={cellsOf(BA)} label="B·A =" tint={() => MANIM.orange} testId="tool-mc-ba" />
      </div>
      <Readout>
        <Stat color={igual ? MANIM.green : MANIM.red} label="¿A·B = B·A?" plain>
          <span data-testid="tool-mc-estado">{igual ? "Sí, conmutan" : `No (${diff} ${diff === 1 ? "elemento distinto" : "elementos distintos"})`}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: tipo (0: A·X = B, 1: X·A = B), los 4 elementos de A y los 4 de B. */
export function EcuacionMatricialExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { t: int(ini[0], 0, 0, 1), A: gridFrom(ini, 1, 2, 2, [[2, -1], [1, 1]]), B: gridFrom(ini, 5, 2, 2, [[4, 2], [0, -2]]) };
  const [v, setV] = useState(init);
  const A = mat(v.A);
  const B = mat(v.B);
  const inv = inversa(A);
  const X = inv ? (v.t === 0 ? mMul(inv.inv, B) : mMul(B, inv.inv)) : null;
  const check = X ? (v.t === 0 ? mMul(A, X) : mMul(X, A)) : null;
  return (
    <Frame
      hint={block.hint ?? "Si A está a la izquierda de X se multiplica por A⁻¹ por la izquierda; si está a la derecha, por la derecha. Cambia el tipo y compara las dos soluciones."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice
            label="Ecuación"
            value={v.t}
            onChange={(t) => setV((p) => ({ ...p, t }))}
            items={[
              { value: 0, label: "A · X = B" },
              { value: 1, label: "X · A = B" },
            ]}
          />
          <MatrixEditor name="A" m={v.A} rows={2} cols={2} onChange={(A2) => setV((p) => ({ ...p, A: A2 }))} color={MANIM.blue} />
          <MatrixEditor name="B" m={v.B} rows={2} cols={2} onChange={(B2) => setV((p) => ({ ...p, B: B2 }))} color={MANIM.green} />
        </>
      }
    >
      <p className="text-lg font-semibold text-[color:var(--stage-ink,#fff)]" data-testid="tool-em-formula">
        {v.t === 0 ? "X = A⁻¹ · B" : "X = B · A⁻¹"}
      </p>
      {X && check ? (
        <>
          <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-3">
            <MatrixView cells={cellsOf(inv!.inv)} label="A⁻¹ =" tint={() => MANIM.blue} />
            <MatrixView cells={cellsOf(X)} label="X =" tint={() => MANIM.yellow} testId="tool-em-x" />
          </div>
          <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-em-check">
            {mEq(check, B) ? (v.t === 0 ? "Comprobación: A · X = B ✓" : "Comprobación: X · A = B ✓") : "Comprobación fallida"}
          </p>
        </>
      ) : (
        <p className="text-base" style={{ color: MANIM.red }} data-testid="tool-em-singular">
          A es singular: no tiene inversa y no se puede despejar X de esta forma.
        </p>
      )}
    </Frame>
  );
}
