import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MatrixSvg, numCells } from "@/components/lesson/anim/matrix-svg";
import { buildPasosFilas } from "@/components/lesson/anim/scenes/bach2-matrices";
import { adjuntoElemento, desarrolloFila, escalonar, mat, menorComplementario, q, qMul, qShow, sinFilaColumna, type Q } from "@/components/lesson/anim/matrices";

const clampInt = (v: number | undefined, fb: number) => (Number.isFinite(v) ? Math.max(-9, Math.min(9, Math.round(v as number))) : fb);
const sg = (n: number) => String(n).replace("-", "−");
const par = (n: number) => (n < 0 ? `(${sg(n)})` : String(n));

function grid(nums: number[] | undefined, size: number, fallback: number[][]): number[][] {
  return Array.from({ length: size }, (_, i) => Array.from({ length: size }, (_, j) => clampInt(nums && nums.length === size * size ? nums[i * size + j] : undefined, fallback[i]![j]!)));
}

const SARRUS: number[][] = [[1, 2, 3], [-1, 5, 1], [3, 6, -2]];

/** Regla de Sarrus: se repiten dos columnas y se suman las diagonales principales y se restan las secundarias. */
export function buildDeterminanteSarrus(params: { nums?: number[] }): AnimBuild {
  const A = grid(params.nums, 3, SARRUS);
  const [a, b, c] = A as [number[], number[], number[]];
  const P = [a[0]! * b[1]! * c[2]!, a[1]! * b[2]! * c[0]!, a[2]! * b[0]! * c[1]!];
  const Q3 = [a[2]! * b[1]! * c[0]!, a[0]! * b[2]! * c[1]!, a[1]! * b[0]! * c[2]!];
  const pT = [`${par(a[0]!)}·${par(b[1]!)}·${par(c[2]!)}`, `${par(a[1]!)}·${par(b[2]!)}·${par(c[0]!)}`, `${par(a[2]!)}·${par(b[0]!)}·${par(c[1]!)}`];
  const qT = [`${par(a[2]!)}·${par(b[1]!)}·${par(c[0]!)}`, `${par(a[0]!)}·${par(b[2]!)}·${par(c[1]!)}`, `${par(a[1]!)}·${par(b[0]!)}·${par(c[2]!)}`];
  const total = P[0]! + P[1]! + P[2]! - (Q3[0]! + Q3[1]! + Q3[2]!);
  const suma = (v: number[]) => v.map((x) => (x < 0 ? `(${x})` : String(x))).join(" + ");
  const x = 50, y = 110, cw = 62, ch = 52;
  const cx = (j: number) => x + j * cw + cw / 2;
  const cy = (i: number) => y + i * ch + ch / 2;
  return {
    label: "Regla de Sarrus",
    captions: [
      "Un determinante de orden $3$ tiene $3! = 6$ productos. La **regla de Sarrus** ayuda a recordarlos sin equivocarse con los signos.",
      "Se repiten a la derecha las **dos primeras columnas** del determinante.",
      "Las tres **diagonales que bajan** (de izquierda a derecha) dan los productos que **suman**.",
      "Las tres **diagonales que suben** dan los productos que **restan**.",
      `$|A| = (${suma(P)}) - (${suma(Q3)}) = ${total}$. Se escribe cada producto con cuidado: los signos de los números son la causa de casi todos los errores.`,
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <MatrixSvg cells={numCells(A)} x={x} y={y} cw={cw} ch={ch} size={28} />
        <Fade show={beat >= 1} dx={-10}>
          {[0, 1].map((j) => A.map((r, i) => <Txt key={`${i}-${j}`} x={cx(j + 3) + 14} y={cy(i) + 10} size={28} color={MANIM.muted}>{sg(r[j]!)}</Txt>))}
        </Fade>
        <Fade show={beat === 2 || beat === 4}>
          {[0, 1, 2].map((k) => (
            <line key={k} x1={cx(k) - 14} y1={cy(0) - 12} x2={cx(k + 2) + 14} y2={cy(2) + 12} stroke={MANIM.green} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
          ))}
        </Fade>
        <Fade show={beat === 3 || beat === 4}>
          {[0, 1, 2].map((k) => (
            <line key={k} x1={cx(k + 2) + 14} y1={cy(0) - 12} x2={cx(k) - 14} y2={cy(2) + 12} stroke={MANIM.red} strokeWidth={2.5} strokeLinecap="round" opacity={0.7} />
          ))}
        </Fade>
        <Fade show={beat >= 2} dx={14}>
          <Txt x={450} y={90} size={22} color={MANIM.green} anchor="start">Suman</Txt>
          {pT.map((t, k) => <Txt key={k} x={450} y={122 + k * 30} size={22} color={MANIM.green} anchor="start">{`+ ${t} = ${sg(P[k]!)}`}</Txt>)}
        </Fade>
        <Fade show={beat >= 3} dx={14}>
          <Txt x={450} y={235} size={22} color={MANIM.red} anchor="start">Restan</Txt>
          {qT.map((t, k) => <Txt key={k} x={450} y={267 + k * 30} size={22} color={MANIM.red} anchor="start">{`− ${t} = ${sg(Q3[k]!)}`}</Txt>)}
        </Fade>
        <Fade show={beat === 4} dy={10}>
          <Txt x={400} y={385} size={32} color={MANIM.yellow}>{`|A| = ${sg(total)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Menor complementario y adjunto de un elemento `a_ij` (`a` = fila, `b` = columna, desde 1). */
export function buildMatrizMenorAdjunto(params: { a?: number; b?: number }): AnimBuild {
  const A = grid(undefined, 3, SARRUS);
  const i = Math.max(0, Math.min(2, Math.round(params.a ?? 1) - 1));
  const j = Math.max(0, Math.min(2, Math.round(params.b ?? 2) - 1));
  const M = mat(A);
  const sub = sinFilaColumna(M, i, j);
  const alpha = menorComplementario(M, i, j);
  const adj = adjuntoElemento(M, i, j);
  const sign = (i + j) % 2 === 0 ? "+" : "−";
  const subCells = sub.map((r) => r.map((v) => qShow(v)));
  const cross = (r: number, c: number) => r === i || c === j;
  return {
    label: "Menor complementario y adjunto",
    captions: [
      `Elegimos un elemento: $a_{${i + 1}${j + 1}} = ${A[i]![j]}$ (fila $${i + 1}$, columna $${j + 1}$).`,
      `Se **tachan su fila y su columna**. Lo que queda es una matriz de orden $2$.`,
      `Su determinante es el **menor complementario** $\\alpha_{${i + 1}${j + 1}} = ${qShow(alpha).replace("−", "-")}$.`,
      `El **adjunto** es el menor con el signo $(-1)^{i+j} = (-1)^{${i + 1 + j + 1}}$: $A_{${i + 1}${j + 1}} = ${sign === "+" ? "+" : "-"}\\alpha_{${i + 1}${j + 1}} = ${qShow(adj).replace("−", "-")}$.`,
      "Los signos $(-1)^{i+j}$ forman un **tablero de ajedrez**: empiezan con $+$ en la esquina superior izquierda y se alternan por filas y columnas.",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <MatrixSvg
          cells={numCells(A)}
          x={50}
          y={120}
          cw={64}
          ch={54}
          size={28}
          tint={(r, c) => (r === i && c === j ? MANIM.yellow : beat >= 1 && cross(r, c) ? "#5b6b80" : undefined)}
          fill={(r, c) => (r === i && c === j ? MANIM.yellow : undefined)}
        />
        <Fade show={beat >= 1 && beat <= 3}>
          <rect x={50 + j * 64} y={110} width={64} height={174} rx={10} fill="none" stroke={MANIM.red} strokeWidth={2} strokeDasharray="6 5" />
          <rect x={42} y={120 + i * 54} width={204} height={54} rx={10} fill="none" stroke={MANIM.red} strokeWidth={2} strokeDasharray="6 5" />
        </Fade>
        <Fade show={beat >= 2 && beat <= 3} dx={20}>
          <MatrixSvg cells={subCells} x={400} y={130} cw={70} ch={54} size={30} color={MANIM.blue} />
          <Txt x={440} y={108} size={22} color={MANIM.muted}>matriz que queda</Txt>
          <Txt x={440} y={290} size={28} color={MANIM.blue}>{`α${i + 1}${j + 1} = ${qShow(alpha)}`}</Txt>
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <Txt x={440} y={345} size={30} color={MANIM.yellow}>{`A${i + 1}${j + 1} = ${sign} (${qShow(alpha)}) = ${qShow(adj)}`}</Txt>
        </Fade>
        <Fade show={beat === 4} dx={20}>
          <MatrixSvg cells={[["+", "−", "+"], ["−", "+", "−"], ["+", "−", "+"]]} x={450} y={130} cw={64} ch={54} size={30} tint={(r, c) => ((r + c) % 2 === 0 ? MANIM.green : MANIM.red)} />
          <Txt x={514} y={108} size={22} color={MANIM.muted}>signo de (−1)ⁱ⁺ʲ</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

const ADJ_DEF = [[3, 1, 5], [2, 0, 3], [5, 7, 2]];

/** Desarrollo por los adjuntos de una fila (`a`, desde 1) de un determinante 3×3. */
export function buildDeterminanteAdjuntos(params: { nums?: number[]; a?: number }): AnimBuild {
  const A = grid(params.nums, 3, ADJ_DEF);
  const f = Math.max(0, Math.min(2, Math.round(params.a ?? 2) - 1));
  const M = mat(A);
  const { terminos, total } = desarrolloFila(M, f);
  const sgn = (j: number) => ((f + j) % 2 === 0 ? "+" : "−");
  const minTxt = (j: number) => {
    const s = sinFilaColumna(M, f, j);
    return `|${qShow(s[0]![0]!)} ${qShow(s[0]![1]!)}; ${qShow(s[1]![0]!)} ${qShow(s[1]![1]!)}|`;
  };
  const ceros = A[f]!.filter((v) => v === 0).length;
  return {
    label: "Determinante por adjuntos de una fila",
    captions: [
      `Para desarrollar por una fila conviene elegir la que tenga **más ceros**: aquí la fila $${f + 1}$ tiene ${ceros === 0 ? "los números más cómodos" : `${ceros} ${ceros === 1 ? "cero" : "ceros"}`}.`,
      "Cada elemento se multiplica por su **adjunto**; el signo viene del tablero de signos $(-1)^{i+j}$.",
      "Cada adjunto es el determinante de orden $2$ que queda al tachar la fila y la columna del elemento (con su signo).",
      `Se suman los tres términos: $|A| = ${terminos.map((t) => qShow(t).replace("−", "-")).join(" + ")} = ${qShow(total).replace("−", "-")}$. Un cero evita calcular un menor entero.`,
    ],
    beatMs: 5400,
    render: (beat) => (
      <Canvas>
        <MatrixSvg cells={numCells(A)} x={50} y={110} cw={64} ch={54} size={28} fill={(r) => (beat >= 0 && r === f ? MANIM.blue : undefined)} tint={(r) => (r === f ? MANIM.blue : undefined)} />
        <Fade show={beat >= 1}>
          <Txt x={50} y={355} size={22} color={MANIM.muted} anchor="start">{`Signos de la fila ${f + 1}:`}</Txt>
          {[0, 1, 2].map((j) => <Txt key={j} x={250 + j * 40} y={355} size={30} color={(f + j) % 2 === 0 ? MANIM.green : MANIM.red}>{sgn(j)}</Txt>)}
        </Fade>
        {[0, 1, 2].map((j) => (
          <Fade key={j} show={beat >= 1} dx={14} delay={j * 150}>
            <Txt x={310} y={140 + j * 56} size={24} color={MANIM.ink} anchor="start">
              {beat >= 2
                ? `${sgn(j)} ${par(A[f]![j]!)} · ${minTxt(j)} = ${qShow(terminos[j]!)}`
                : `${sgn(j)} ${par(A[f]![j]!)} · A${f + 1}${j + 1}`}
            </Txt>
          </Fade>
        ))}
        <Fade show={beat === 3} dy={10}>
          <Txt x={400} y={360} size={32} color={MANIM.yellow}>{`|A| = ${qShow(total)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Determinante por Gauss: se hacen ceros (el valor no cambia) y se multiplica la diagonal. `nums`: 9 o 16 elementos. */
export function buildDeterminanteGauss(params: { nums?: number[] }): AnimBuild {
  const n = params.nums && params.nums.length === 16 ? 4 : 3;
  const A = mat(grid(params.nums, n, n === 3 ? [[1, 2, 3], [-2, 1, 5], [1, 4, 2]] : [[1, 2, 3, 4], [2, 3, 4, 1], [3, 4, 1, 2], [4, 1, 2, 3]]));
  const pasos = escalonar(A);
  const swaps = pasos.filter((p) => p.op.includes("↔")).length;
  const d = pasos[pasos.length - 1]!.m.reduce((acc: Q, r, i) => qMul(acc, r[i]!), q(1));
  const dTotal = swaps % 2 === 0 ? d : { n: -d.n, d: d.d };
  const diag = pasos[pasos.length - 1]!.m.map((r, i) => r[i]!);
  return buildPasosFilas({
    label: "Determinante haciendo ceros",
    mat: A,
    pasos,
    intro: "Se transforma el determinante en uno **triangular**. Sumar a una fila un múltiplo de otra **no cambia** el valor; intercambiar dos filas lo multiplica por $-1$.",
    stepCaption: (op) => (op.includes("↔") ? `$${op.replace("↔", "\\leftrightarrow ")}$: al intercambiar dos filas el determinante **cambia de signo**.` : `$${op.replace(/→/g, "\\to ").replace(/·/g, "\\cdot ").replace(/−/g, "-")}$: el valor del determinante **no cambia**.`),
    finalCaption: `Triangular: el determinante es el **producto de la diagonal**: $${diag.map((v) => (v.n < 0 ? `(${qShow(v).replace("−", "-")})` : qShow(v))).join(" \\cdot ")}${swaps % 2 === 1 ? " \\cdot (-1)" : ""} = ${qShow(dTotal).replace("−", "-")}$.`,
    finalText: `|A| = ${qShow(dTotal)}`,
    header: (b) => (b === 0 ? "Determinante inicial" : b >= pasos.length ? "Determinante triangular" : `Paso ${b}`),
  });
}

