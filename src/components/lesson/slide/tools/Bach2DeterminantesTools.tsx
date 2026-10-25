"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { adjunta, contarMenores, det, inversa, mat, mMul, mT, qDiv, qMul, q, qShow, rango, type Mat } from "@/components/lesson/anim/matrices";
import { cellsOf, numCells } from "@/components/lesson/anim/matrix-svg";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Stat } from "@/components/lesson/slide/tools/industrial-ui";
import { MatrixEditor, MatrixView, gridFrom } from "@/components/lesson/slide/tools/matrix-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const int = (v: number | undefined, fallback: number, lo: number, hi: number) =>
  clamp(Math.round(Number.isFinite(v) ? (v as number) : fallback), lo, hi);
const sgn = (x: number) => String(x).replace("-", "−");
const detTxt = (m: Mat) => qShow(det(m));
const WRAP = "flex flex-wrap items-center justify-center gap-x-6 gap-y-3";

/** `initial`: [a, b, c, d]: columnas (a, c) y (b, d) de la matriz 2×2, entre −4 y 4. */
export function DeterminanteAreaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { a: int(ini[0], 3, -4, 4), b: int(ini[1], 1, -4, 4), c: int(ini[2], 0, -4, 4), d: int(ini[3], 2, -4, 4) };
  const [v, setV] = useState(init);
  const D = v.a * v.d - v.b * v.c;
  const X = (x: number) => 150 + x * 30;
  const Y = (y: number) => 150 - y * 30;
  const pts = [[0, 0], [v.a, v.c], [v.a + v.b, v.c + v.d], [v.b, v.d]] as const;
  return (
    <Frame
      hint={block.hint ?? "El valor absoluto del determinante es el área del paralelogramo que forman las dos columnas. Con columnas proporcionales el paralelogramo se aplasta y el determinante es 0."}
      onReset={() => setV(init)}
      controls={
        <>
          <Slider label="Primera columna, arriba (a)" value={v.a} min={-4} max={4} color={MANIM.blue} onChange={(a) => setV((p) => ({ ...p, a }))} format={sgn} />
          <Slider label="Primera columna, abajo (c)" value={v.c} min={-4} max={4} color={MANIM.blue} onChange={(c) => setV((p) => ({ ...p, c }))} format={sgn} />
          <Slider label="Segunda columna, arriba (b)" value={v.b} min={-4} max={4} color={MANIM.green} onChange={(b) => setV((p) => ({ ...p, b }))} format={sgn} />
          <Slider label="Segunda columna, abajo (d)" value={v.d} min={-4} max={4} color={MANIM.green} onChange={(d) => setV((p) => ({ ...p, d }))} format={sgn} />
        </>
      }
    >
      <Svg w={300} h={300} testId="tool-da-figura" maxH={260}>
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <line x1={X(i - 4)} y1={Y(-4.5)} x2={X(i - 4)} y2={Y(4.5)} stroke={MANIM.grid} strokeWidth={i === 4 ? 2 : 1} />
            <line x1={X(-4.5)} y1={Y(i - 4)} x2={X(4.5)} y2={Y(i - 4)} stroke={MANIM.grid} strokeWidth={i === 4 ? 2 : 1} />
          </g>
        ))}
        <polygon points={pts.map(([x, y]) => `${X(x)},${Y(y)}`).join(" ")} fill={D === 0 ? MANIM.red : D > 0 ? MANIM.yellow : MANIM.orange} fillOpacity={0.28} stroke={MANIM.yellow} strokeWidth={2} />
        <line x1={X(0)} y1={Y(0)} x2={X(v.a)} y2={Y(v.c)} stroke={MANIM.blue} strokeWidth={4} strokeLinecap="round" />
        <line x1={X(0)} y1={Y(0)} x2={X(v.b)} y2={Y(v.d)} stroke={MANIM.green} strokeWidth={4} strokeLinecap="round" />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Determinante" plain>
          <span data-testid="tool-da-det">{sgn(D)}</span>
        </Stat>
        <Stat color={MANIM.green} label="Área del paralelogramo" plain>
          <span data-testid="tool-da-area">{String(Math.abs(D))}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-da-signo">
        {D === 0 ? "Los dos vectores son paralelos: el paralelogramo se aplasta (matriz singular)." : D > 0 ? "Giro de la 1.ª a la 2.ª columna en sentido antihorario: determinante positivo." : "Giro en sentido horario: determinante negativo."}
      </p>
    </Frame>
  );
}

const OPS = ["Multiplicar F₁ por k", "Intercambiar F₁ y F₂", "F₂ → F₂ + k·F₁", "Trasponer", "Hacer F₃ = F₁ + F₂"] as const;

/** `initial`: [operación (0–4), k (−3 a 3)] y después los 9 elementos de la matriz 3×3. */
export function DeterminantePropiedadesExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { op: int(ini[0], 0, 0, 4), k: int(ini[1], 2, -3, 3), M: gridFrom(ini, 2, 3, 3, [[2, 3, 4], [1, 3, 2], [5, 1, 6]]) };
  const [v, setV] = useState(init);
  const M = v.M;
  const aplicar = (): { R: number[][]; regla: string; esperado: string } => {
    const d0 = det(mat(M));
    switch (v.op) {
      case 0:
        return { R: M.map((r, i) => (i === 0 ? r.map((x) => x * v.k) : r)), regla: "Propiedad 2: multiplicar una línea por k multiplica el determinante por k.", esperado: qShow(qMul(q(v.k), d0)) };
      case 1:
        return { R: [M[1]!, M[0]!, M[2]!], regla: "Propiedad 5: al permutar dos líneas el determinante cambia de signo.", esperado: qShow(qMul(q(-1), d0)) };
      case 2:
        return { R: M.map((r, i) => (i === 1 ? r.map((x, j) => x + v.k * M[0]![j]!) : r)), regla: "Propiedad 9: sumar a una línea un múltiplo de otra no cambia el determinante.", esperado: qShow(d0) };
      case 3:
        return { R: mT(mat(M)).map((r) => r.map((x) => x.n)), regla: "Propiedad 1: el determinante de una matriz y el de su traspuesta coinciden.", esperado: qShow(d0) };
      default:
        return { R: M.map((r, i) => (i === 2 ? r.map((_, j) => M[0]![j]! + M[1]![j]!) : r)), regla: "Propiedad 8: si una línea es combinación lineal de las otras, el determinante vale 0.", esperado: "0" };
    }
  };
  const { R, regla, esperado } = aplicar();
  const antes = detTxt(mat(M));
  const despues = detTxt(mat(R));
  return (
    <Frame
      hint={block.hint ?? "Elige una operación y compara el determinante antes y después: coincide con lo que predice la propiedad."}
      onReset={() => setV(init)}
      controls={
        <>
          <MatrixEditor name="A" m={v.M} rows={3} cols={3} onChange={(M2) => setV((p) => ({ ...p, M: M2 }))} />
          <Choice label="Operación" value={v.op} onChange={(op) => setV((p) => ({ ...p, op }))} items={OPS.map((t, i) => ({ value: i, label: t }))} />
          <Slider label="Número k" value={v.k} min={-3} max={3} color={MANIM.orange} onChange={(k) => setV((p) => ({ ...p, k }))} format={sgn} disabled={v.op === 1 || v.op === 3 || v.op === 4} />
        </>
      }
    >
      <div className={WRAP}>
        <MatrixView cells={numCells(M)} label="Antes" tint={() => MANIM.blue} />
        <MatrixView cells={numCells(R)} label="Después" tint={() => MANIM.green} />
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="|A| antes" plain>
          <span data-testid="tool-dp-antes">{antes}</span>
        </Stat>
        <Stat color={MANIM.green} label="|A| después" plain>
          <span data-testid="tool-dp-despues">{despues}</span>
        </Stat>
        <Stat color={MANIM.yellow} label="Lo que predice la propiedad" plain>
          <span data-testid="tool-dp-esperado">{esperado}</span>
        </Stat>
      </Readout>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="tool-dp-regla">{regla}</p>
    </Frame>
  );
}

/** `initial`: 4 elementos de A, 4 de B (2×2) y k (−3 a 3). */
export function DeterminanteProductoExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { A: gridFrom(ini, 0, 2, 2, [[2, 1], [1, 3]]), B: gridFrom(ini, 4, 2, 2, [[1, 2], [0, 4]]), k: int(ini[8], 3, -3, 3) };
  const [v, setV] = useState(init);
  const A = mat(v.A);
  const B = mat(v.B);
  const dA = det(A);
  const dB = det(B);
  const dAB = det(mMul(A, B)!);
  const dkA = det(A.map((r) => r.map((x) => qMul(q(v.k), x))));
  const inv = inversa(A);
  return (
    <Frame
      hint={block.hint ?? "Comprueba que |A·B| = |A|·|B|, que |k·A| = k²·|A| (orden 2) y que |A⁻¹| = 1/|A|. Si |A| = 0, no existe la inversa."}
      onReset={() => setV(init)}
      controls={
        <>
          <MatrixEditor name="A" m={v.A} rows={2} cols={2} onChange={(A2) => setV((p) => ({ ...p, A: A2 }))} color={MANIM.blue} />
          <MatrixEditor name="B" m={v.B} rows={2} cols={2} onChange={(B2) => setV((p) => ({ ...p, B: B2 }))} color={MANIM.green} />
          <Slider label="Número k" value={v.k} min={-3} max={3} color={MANIM.orange} onChange={(k) => setV((p) => ({ ...p, k }))} format={sgn} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="|A|" plain><span data-testid="tool-dpr-a">{qShow(dA)}</span></Stat>
        <Stat color={MANIM.green} label="|B|" plain><span data-testid="tool-dpr-b">{qShow(dB)}</span></Stat>
        <Stat color={MANIM.yellow} label="|A·B|" plain><span data-testid="tool-dpr-ab">{qShow(dAB)}</span></Stat>
        <Stat color={MANIM.orange} label="|A|·|B|" plain><span data-testid="tool-dpr-prod">{qShow(qMul(dA, dB))}</span></Stat>
      </Readout>
      <Readout>
        <Stat color={MANIM.purple} label={`|${sgn(v.k)}·A|`} plain><span data-testid="tool-dpr-ka">{qShow(dkA)}</span></Stat>
        <Stat color={MANIM.purple} label={`${sgn(v.k)}²·|A|`} plain><span data-testid="tool-dpr-k2a">{qShow(qMul(q(v.k * v.k), dA))}</span></Stat>
        <Stat color={MANIM.red} label="|A⁻¹|" plain>
          <span data-testid="tool-dpr-inv">{inv ? qShow(det(inv.inv)) : "no existe"}</span>
        </Stat>
        <Stat color={MANIM.red} label="1/|A|" plain>
          <span data-testid="tool-dpr-inv1">{inv ? qShow(qDiv(q(1), dA)) : "—"}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}

type Familia = { nombre: string; m: (a: number) => number[][]; formula: string };
const FAMILIAS: Familia[] = [
  { nombre: "Tres iguales", m: (a) => [[a, 1, 1], [1, a, 1], [1, 1, a]], formula: "(a − 1)²·(a + 2)" },
  { nombre: "Triangular", m: (a) => [[a, 1, 1], [0, a, 1], [0, 0, a - 2]], formula: "a²·(a − 2)" },
  { nombre: "Fila proporcional", m: (a) => [[1, 2, a], [2, 4, 6], [1, 1, 1]], formula: "6 − 2a" },
];

/** `initial`: [familia (0–2), a (−5 a 5)]. */
export function DeterminanteParametroExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { f: int(ini[0], 0, 0, 2), a: int(ini[1], 2, -5, 5) };
  const [v, setV] = useState(init);
  const F = FAMILIAS[v.f]!;
  const M = mat(F.m(v.a));
  const d = det(M);
  const rg = rango(M);
  const X = (x: number) => 20 + ((x + 5) / 10) * 280;
  const ys = Array.from({ length: 101 }, (_, i) => {
    const x = -5 + i * 0.1;
    const [r0, r1, r2] = F.m(x) as [number[], number[], number[]];
    return { x, y: r0[0]! * (r1[1]! * r2[2]! - r1[2]! * r2[1]!) - r0[1]! * (r1[0]! * r2[2]! - r1[2]! * r2[0]!) + r0[2]! * (r1[0]! * r2[1]! - r1[1]! * r2[0]!) };
  });
  const ymax = Math.max(10, ...ys.map((p) => Math.abs(p.y)));
  const clip = Math.min(ymax, 60);
  const Y = (y: number) => 120 - (Math.max(-clip, Math.min(clip, y)) / clip) * 100;
  return (
    <Frame
      hint={block.hint ?? "Mueve a y busca los valores donde el determinante vale 0: ahí el rango baja. Fuera de esos valores el rango es 3."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Matriz" value={v.f} onChange={(f) => setV((p) => ({ ...p, f }))} items={FAMILIAS.map((x, i) => ({ value: i, label: x.nombre }))} />
          <Slider label="Parámetro a" value={v.a} min={-5} max={5} color={MANIM.orange} onChange={(a) => setV((p) => ({ ...p, a }))} format={sgn} />
        </>
      }
    >
      <div className={WRAP}>
        <MatrixView cells={numCells(F.m(v.a))} label="A =" tint={() => MANIM.blue} />
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label={`|A| = ${F.formula}`} plain><span data-testid="tool-dpa-det">{qShow(d)}</span></Stat>
        <Stat color={rg === 3 ? MANIM.green : MANIM.red} label="Rango" plain><span data-testid="tool-dpa-rango">{String(rg)}</span></Stat>
      </Readout>
      <Svg w={320} h={140}>
        <line x1={20} y1={Y(0)} x2={300} y2={Y(0)} stroke={MANIM.grid} strokeWidth={1.5} />
        <polyline points={ys.map((p) => `${X(p.x)},${Y(p.y)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={2.5} />
        <circle cx={X(v.a)} cy={Y(Number(d.n) / Number(d.d))} r={6} fill={MANIM.yellow} />
      </Svg>
    </Frame>
  );
}

/** `initial`: [tamaño (2 o 3)] y 9 elementos por filas. */
export function AdjuntaExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { n: int(ini[0], 3, 2, 3), M: gridFrom(ini, 1, 3, 3, [[1, 2, 3], [-1, 5, 1], [3, 6, -2]]) };
  const [v, setV] = useState(init);
  const A = mat(v.M.slice(0, v.n).map((r) => r.slice(0, v.n)));
  const adj = adjunta(A);
  const adjT = mT(adj);
  const prod = mMul(A, adjT)!;
  const d = det(A);
  const inv = inversa(A);
  return (
    <Frame
      hint={block.hint ?? "A·Adj(A)ᵗ da siempre |A| en la diagonal y 0 fuera de ella. Por eso A⁻¹ = Adj(A)ᵗ / |A|, cuando |A| ≠ 0."}
      onReset={() => setV(init)}
      controls={
        <>
          <Choice label="Tamaño" value={v.n} onChange={(n) => setV((p) => ({ ...p, n }))} items={[{ value: 2, label: "2 × 2" }, { value: 3, label: "3 × 3" }]} />
          <MatrixEditor name="A" m={v.M} rows={v.n} cols={v.n} onChange={(M2) => setV((p) => ({ ...p, M: p.M.map((r, a) => r.map((x, b) => M2[a]?.[b] ?? x)) }))} />
        </>
      }
    >
      <div className={WRAP}>
        <MatrixView cells={cellsOf(adj)} label="Adj(A) =" tint={() => MANIM.blue} testId="tool-ad-adj" />
        <MatrixView cells={cellsOf(adjT)} label="Adj(A)ᵗ =" tint={() => MANIM.green} testId="tool-ad-adjt" />
      </div>
      <div className={WRAP}>
        <MatrixView cells={cellsOf(prod)} label="A·Adj(A)ᵗ =" tint={() => MANIM.yellow} testId="tool-ad-prod" />
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="|A|" plain><span data-testid="tool-ad-det">{qShow(d)}</span></Stat>
        <Stat color={inv ? MANIM.green : MANIM.red} label="A⁻¹ = Adj(A)ᵗ / |A|" plain>
          <span data-testid="tool-ad-inv">{inv ? cellsOf(inv.inv).map((r) => r.join(" ")).join("  |  ") : "no existe (|A| = 0)"}</span>
        </Stat>
      </Readout>
    </Frame>
  );
}

/** `initial`: 12 elementos de una matriz 3×4, por filas. */
export function RangoMenoresExplorador({ block }: { block: ToolBlock }) {
  const ini = block.initial ?? [];
  const init = { M: gridFrom(ini, 0, 3, 4, [[1, 3, 1, -2], [1, 4, 3, -1], [2, 3, -4, -7]]) };
  const [v, setV] = useState(init);
  const A = mat(v.M);
  const rg = rango(A);
  const filas = [1, 2, 3].map((k) => ({ k, ...contarMenores(A, k) }));
  return (
    <Frame
      hint={block.hint ?? "El rango es el orden del mayor menor no nulo. Si todos los menores de un orden son 0, también lo son los de órdenes mayores."}
      onReset={() => setV(init)}
      controls={<MatrixEditor name="A" m={v.M} rows={3} cols={4} onChange={(M2) => setV({ M: M2 })} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Rango" plain><span data-testid="tool-rm-rango">{String(rg)}</span></Stat>
      </Readout>
      <table className="w-full max-w-md border-collapse text-base tabular-nums" data-testid="tool-rm-tabla">
        <thead>
          <tr className="text-left text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            <th className="py-1 pr-4 font-semibold">Orden del menor</th>
            <th className="py-1 pr-4 font-semibold">Menores</th>
            <th className="py-1 font-semibold">No nulos</th>
          </tr>
        </thead>
        <tbody>
          {filas.map((f) => (
            <tr key={f.k} style={{ color: f.noNulos > 0 ? MANIM.green : MANIM.red }}>
              <td className="py-0.5 pr-4">{f.k}</td>
              <td className="py-0.5 pr-4">{f.total}</td>
              <td className="py-0.5" data-testid={`tool-rm-n${f.k}`}>{f.noNulos}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </Frame>
  );
}

