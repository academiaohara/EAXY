import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MatrixSvg, cellsOf, numCells } from "@/components/lesson/anim/matrix-svg";
import { escalonar, inversa, mat, rows as nRows, qIsZero, rango, type Mat, type PasoGauss } from "@/components/lesson/anim/matrices";

const int = (v: number | undefined, fb: number) => (Number.isFinite(v) ? Math.max(-9, Math.min(9, Math.round(v as number))) : fb);
const tex = (op: string) => op.replace(/→/g, "\\to ").replace(/·/g, "\\cdot ").replace(/↔/g, "\\leftrightarrow ").replace(/−/g, "-").replace(/\(-(\d+)\/(\d+)\)/g, "\\left(-\\tfrac{$1}{$2}\\right)").replace(/\((\d+)\/(\d+)\)/g, "\\left(\\tfrac{$1}{$2}\\right)").replace(/ : /g, " : ");

/** Producto A·B como filas por columnas: cada elemento de C es un producto escalar. */
export function buildMatrizProducto(): AnimBuild {
  const A = [[1, 2, 3], [4, 5, 6]];
  const B = [[2, 1], [3, 2], [4, 1]];
  const C = [[20, 8], [47, 20]];
  const calc = (i: number, j: number) => `${A[i]!.map((a, k) => `${a}·${B[k]![j]}`).join(" + ")} = ${C[i]![j]}`;
  const order: [number, number][] = [[0, 0], [0, 1], [1, 0], [1, 1]];
  const ax = 40, bx = 255, cx = 520, ay = 130, by = 100, cy = 130;
  return {
    label: "Producto de matrices: fila por columna",
    captions: [
      "$A$ es de $2\\times 3$ y $B$ de $3\\times 2$. Se pueden multiplicar porque las **columnas de $A$ (3) coinciden con las filas de $B$ (3)**. El resultado será de $2\\times 2$.",
      "$c_{11}$: fila 1 de $A$ por columna 1 de $B$. Se multiplican los elementos **por parejas** y se suma: $1\\cdot 2 + 2\\cdot 3 + 3\\cdot 4 = 20$.",
      "$c_{12}$: fila 1 de $A$ por columna 2 de $B$: $1\\cdot 1 + 2\\cdot 2 + 3\\cdot 1 = 8$.",
      "$c_{21}$: fila 2 de $A$ por columna 1 de $B$: $4\\cdot 2 + 5\\cdot 3 + 6\\cdot 4 = 47$.",
      "$c_{22}$: fila 2 por columna 2: $4\\cdot 1 + 5\\cdot 2 + 6\\cdot 1 = 20$. La matriz producto tiene **tantas filas como $A$ y tantas columnas como $B$**.",
    ],
    beatMs: 5200,
    render: (beat) => {
      const cur = beat >= 1 ? order[beat - 1]! : null;
      const done = (i: number, j: number) => order.findIndex(([a, b]) => a === i && b === j) < beat;
      const Cc = C.map((r, i) => r.map((v, j) => (done(i, j) ? String(v) : "?")));
      return (
        <Canvas>
          <MatrixSvg cells={numCells(A)} x={ax} y={ay} fill={(i) => (cur && i === cur[0] ? MANIM.blue : undefined)} tint={(i) => (cur && i === cur[0] ? MANIM.blue : undefined)} />
          <Txt x={232} y={ay + 52} size={34} color={MANIM.muted}>·</Txt>
          <MatrixSvg cells={numCells(B)} x={bx} y={by} fill={(_, j) => (cur && j === cur[1] ? MANIM.green : undefined)} tint={(_, j) => (cur && j === cur[1] ? MANIM.green : undefined)} />
          <Txt x={425} y={ay + 52} size={34} color={MANIM.muted}>=</Txt>
          <MatrixSvg cells={Cc} x={cx} y={cy} fill={(i, j) => (cur && i === cur[0] && j === cur[1] ? MANIM.yellow : undefined)} tint={(i, j) => (cur && i === cur[0] && j === cur[1] ? MANIM.yellow : undefined)} />
          <Txt x={ax + 84} y={ay - 22} size={20} color={MANIM.muted}>A (2×3)</Txt>
          <Txt x={bx + 56} y={by - 22} size={20} color={MANIM.muted}>B (3×2)</Txt>
          <Txt x={cx + 56} y={cy - 22} size={20} color={MANIM.muted}>C (2×2)</Txt>
          <Fade show={beat === 0}>
            <rect x={ax + 112} y={ay + 96} width={50} height={26} rx={6} fill={MANIM.yellow} fillOpacity={0.2} stroke={MANIM.yellow} strokeWidth={2} />
            <Txt x={ax + 137} y={ay + 115} size={20} color={MANIM.yellow}>3</Txt>
            <rect x={bx - 10} y={by + 16} width={26} height={50} rx={6} fill={MANIM.yellow} fillOpacity={0.2} stroke={MANIM.yellow} strokeWidth={2} />
            <Txt x={bx + 3} y={by + 48} size={20} color={MANIM.yellow}>3</Txt>
          </Fade>
          {order.map(([i, j], k) => (
            <Fade key={k} show={beat === k + 1} dy={10}>
              <Txt x={400} y={340} size={34} color={MANIM.yellow}>{`c${i + 1}${j + 1} = ${calc(i, j)}`}</Txt>
            </Fade>
          ))}
          <Fade show={beat === 4} dy={10}>
            <Txt x={400} y={385} size={22} color={MANIM.muted}>(2×3) · (3×2) → (2×2)</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

type PasosOpts = { label: string; mat: Mat; pasos: PasoGauss[]; split?: number; intro: string; finalCaption: string; stepCaption: (op: string, k: number) => string; header: (beat: number) => string; marcaCero?: boolean };

/** Escena genérica de operaciones elementales: una matriz que cambia paso a paso. */
function buildPasosFilas(o: PasosOpts): AnimBuild {
  const total = o.pasos.length;
  const cols = o.pasos[0]!.m[0]!.length;
  const cw = cols > 5 ? 62 : 78;
  const w = cols * cw;
  const x = 400 - w / 2;
  const ch = 54;
  const y = 120;
  return {
    label: o.label,
    captions: [o.intro, ...o.pasos.slice(1).map((p, k) => o.stepCaption(p.op, k)), o.finalCaption],
    beatMs: 4600,
    render: (beat) => {
      const idx = Math.min(beat, total - 1);
      const p = o.pasos[idx]!;
      const fin = beat >= total;
      return (
        <Canvas>
          <Txt x={400} y={52} size={26} color={MANIM.muted}>{o.header(beat)}</Txt>
          <MatrixSvg
            cells={cellsOf(p.m)}
            x={x}
            y={y}
            cw={cw}
            ch={ch}
            size={28}
            split={o.split}
            fill={(i) => (o.marcaCero && fin && p.m[i]!.every((v) => qIsZero(v)) ? MANIM.red : undefined)}
            tint={(i, j) => (o.split !== undefined && j >= o.split ? MANIM.green : undefined) ?? (o.marcaCero && fin && p.m[i]!.every((v) => qIsZero(v)) ? MANIM.red : undefined)}
          />
          {o.pasos.slice(1).map((s, k) => (
            <Fade key={k} show={beat === k + 1 && !fin} dy={10}>
              <Txt x={400} y={y + nRows(p.m) * ch + 60} size={32} color={MANIM.yellow}>{s.op}</Txt>
            </Fade>
          ))}
          <Fade show={fin} dy={10}>
            <Txt x={400} y={y + nRows(p.m) * ch + 60} size={32} color={MANIM.yellow}>
              {o.marcaCero ? `rango = ${rango(o.pasos[0]!.m)}` : "A⁻¹ a la derecha"}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/** Inversa de una matriz 2×2 (o 3×3) por Gauss–Jordan sobre (A | I). `nums`: elementos por filas. */
export function buildMatrizGaussJordan(params: { nums?: number[] }): AnimBuild {
  const raw = params.nums && (params.nums.length === 4 || params.nums.length === 9) ? params.nums : [1, 2, 3, 4];
  const n = raw.length === 4 ? 2 : 3;
  const A = mat(Array.from({ length: n }, (_, i) => raw.slice(i * n, i * n + n).map((v, j) => int(v, i === j ? 1 : 0))));
  const r = inversa(A);
  const fallback = escalonar(A);
  const pasos = r ? r.pasos : fallback;
  return buildPasosFilas({
    label: "Inversa por Gauss–Jordan",
    mat: A,
    pasos,
    split: n,
    intro: "Se escribe $A$ junto a la matriz identidad: $(A\\,|\\,I)$. Con **operaciones elementales por filas** hay que convertir la parte izquierda en $I$.",
    stepCaption: (op) => `Operación elemental: $${tex(op)}$. Se aplica a la fila entera, también a la parte derecha.`,
    finalCaption: r
      ? "A la izquierda ha quedado $I$. Lo que haya a la derecha es $A^{-1}$ (se comprueba con $A\\cdot A^{-1} = I$)."
      : "No se logra la identidad a la izquierda: aparece una fila de ceros. $A$ es **singular** y no tiene inversa.",
    header: (b) => (b === 0 ? "Matriz ampliada (A | I)" : b >= pasos.length ? (r ? "Resultado: (I | A⁻¹)" : "A no tiene inversa") : `Paso ${b}`),
  });
}

/** Rango por escalonamiento: las filas nulas que aparecen son filas dependientes. `nums`: 3×3 por filas. */
export function buildMatrizRangoGauss(params: { nums?: number[] }): AnimBuild {
  const raw = params.nums && params.nums.length === 9 ? params.nums : [0, 1, -3, -1, 0, -4, -1, 1, -7];
  const A = mat([0, 1, 2].map((i) => raw.slice(i * 3, i * 3 + 3).map((v) => int(v, 0))));
  const pasos = escalonar(A);
  return buildPasosFilas({
    label: "Rango de una matriz por Gauss",
    mat: A,
    pasos,
    marcaCero: true,
    intro: "El **rango** es el número de filas linealmente independientes. Para verlo, se escalona la matriz con operaciones elementales: no cambian el rango.",
    stepCaption: (op) => (op.includes("↔") ? `Se intercambian dos filas para tener un pivote distinto de cero: $${tex(op)}$.` : `Se hace un cero con $${tex(op)}$.`),
    finalCaption: `Las filas **no nulas** de la matriz escalonada son las independientes: rango $= ${rango(A)}$. Una fila de ceros indica que esa fila era combinación de las otras.`,
    header: (b) => (b === 0 ? "Matriz inicial" : b >= pasos.length ? "Matriz escalonada" : `Paso ${b}`),
  });
}

/** Traspuesta: las filas pasan a ser columnas y la matriz 2×3 se convierte en 3×2. */
export function buildMatrizTraspuesta(): AnimBuild {
  const A = [[1, 2, 3], [4, 5, 6]];
  const T = [[1, 4], [2, 5], [3, 6]];
  const rowCol = [MANIM.blue, MANIM.green];
  return {
    label: "Matriz traspuesta",
    captions: [
      "Partimos de $A$, de dimensión $2\\times 3$. Cada fila tiene un color.",
      "$A^t$ se forma **cambiando filas por columnas**: la fila 1 de $A$ pasa a ser la columna 1 de $A^t$.",
      "La fila 2 pasa a ser la columna 2. La dimensión cambia: $2\\times 3 \\to 3\\times 2$, y el elemento $a_{ij}$ pasa al lugar $(j, i)$.",
    ],
    beatMs: 5000,
    render: (beat) => (
      <Canvas>
        <MatrixSvg cells={numCells(A)} x={100} y={140} cw={64} ch={56} size={30} tint={(i) => (beat >= 1 ? rowCol[i] : undefined)} fill={(i) => (beat >= 1 ? rowCol[i] : undefined)} />
        <Txt x={196} y={110} size={24} color={MANIM.muted}>A (2×3)</Txt>
        <Fade show={beat >= 1} dx={-30}>
          <Txt x={400} y={206} size={44} color={MANIM.yellow}>→</Txt>
          <MatrixSvg cells={numCells(T)} x={500} y={112} cw={64} ch={56} size={30} tint={(_, j) => rowCol[j]} fill={(_, j) => (beat >= 2 ? rowCol[j] : beat >= 1 && j === 0 ? rowCol[0] : undefined)} />
          <Txt x={564} y={90} size={24} color={MANIM.muted}>Aᵗ (3×2)</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={10}>
          <Txt x={400} y={340} size={26} color={MANIM.yellow}>a₁₂ = 2 → (Aᵗ)₂₁ = 2</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

const NODES: [number, number][] = [[110, 230], [280, 100], [450, 100], [280, 350]];
const NAMES = ["A", "B", "C", "D"];
const ADJ = [[0, 1, 0, 1], [0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0]];
const ADJ2 = [[0, 0, 1, 1], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]];

function arrow(a: [number, number], b: [number, number], r = 26): { x1: number; y1: number; x2: number; y2: number } {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const len = Math.hypot(dx, dy);
  return { x1: a[0] + (dx / len) * r, y1: a[1] + (dy / len) * r, x2: b[0] - (dx / len) * (r + 6), y2: b[1] - (dy / len) * (r + 6) };
}

/** Grafo dirigido ↔ matriz de adyacencia, y A² cuenta los caminos de longitud 2. */
export function buildGrafoAdyacencia(): AnimBuild {
  const edges: [number, number][] = [];
  ADJ.forEach((r, i) => r.forEach((v, j) => v && edges.push([i, j])));
  const path2: [number, number][] = [[0, 1], [1, 2]];
  const isPath = (i: number, j: number) => path2.some(([a, b]) => a === i && b === j);
  return {
    label: "Grafo y matriz de adyacencia",
    captions: [
      "Un **grafo** son nodos unidos por aristas. Este es dirigido: A→B, A→D, B→C y B→D.",
      "La **matriz de adyacencia** tiene un $1$ en la fila $i$, columna $j$ si hay arista de $i$ a $j$ (fila = origen, columna = destino). La fila de A es $(0\\ 1\\ 0\\ 1)$.",
      "Se lee por filas: A sale hacia B y D, B sale hacia C y D, y C y D no tienen aristas de salida (filas de ceros). Un bucle sería un $1$ en la diagonal.",
      "Al multiplicar la matriz por sí misma, $A^2$ cuenta los **caminos de longitud 2**: A→B→C es un camino de A a C, así que el elemento $(A, C)$ vale $1$.",
      "En general, el elemento $(i, j)$ de $A^n$ es el **número de caminos de longitud $n$** de $i$ a $j$. Con $A^2$: A llega a C y a D pasando por B.",
    ],
    beatMs: 5200,
    render: (beat) => {
      const sq = beat >= 3;
      const M = sq ? ADJ2 : ADJ;
      return (
        <Canvas>
          {edges.map(([i, j], k) => {
            const a = arrow(NODES[i]!, NODES[j]!);
            const hot = sq && isPath(i, j);
            const hotRow = beat === 1 && i === 0;
            const col = hot ? MANIM.yellow : hotRow ? MANIM.blue : MANIM.muted;
            return (
              <Fade key={k} show delay={k * 80}>
                <line x1={a.x1} y1={a.y1} x2={a.x2} y2={a.y2} stroke={col} strokeWidth={hot || hotRow ? 4 : 2.5} markerEnd="url(#gm-arrow)" />
              </Fade>
            );
          })}
          <defs>
            <marker id="gm-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.muted} />
            </marker>
          </defs>
          {NODES.map(([x, y], i) => (
            <g key={i}>
              <circle cx={x} cy={y} r={26} fill={MANIM.surface} stroke={sq && i <= 2 && (i === 0 || i === 1 || i === 2) ? MANIM.yellow : MANIM.blue} strokeWidth={3} />
              <Txt x={x} y={y + 9} size={26}>{NAMES[i]!}</Txt>
            </g>
          ))}
          <Fade show={beat >= 1} dx={20}>
            <Txt x={640} y={94} size={22} color={MANIM.muted}>{sq ? "A²  (caminos de longitud 2)" : "Matriz de adyacencia"}</Txt>
            {NAMES.map((nm, i) => (
              <g key={nm}>
                <Txt x={560 + i * 48 + 24} y={130} size={18} color={MANIM.muted}>{nm}</Txt>
                <Txt x={528} y={160 + i * 44 + 8} size={18} color={MANIM.muted}>{nm}</Txt>
              </g>
            ))}
            <MatrixSvg
              cells={numCells(M)}
              x={560}
              y={146}
              cw={48}
              ch={44}
              size={24}
              fill={(i, j) => (sq && i === 0 && j === 2 ? MANIM.yellow : beat === 1 && i === 0 ? MANIM.blue : undefined)}
              tint={(i, j) => (sq && i === 0 && j === 2 ? MANIM.yellow : beat === 1 && i === 0 ? MANIM.blue : undefined)}
            />
          </Fade>
        </Canvas>
      );
    },
  };
}

/** De una tabla de datos a una matriz: filas, columnas, dimensión y elementos a_ij. */
export function buildMatrizElementos(): AnimBuild {
  const M = [[35, 24, 33], [28, 18, 37]];
  const cw = 130, ch = 62, x0 = 260, y0 = 150;
  const colTxt = ["tradicionales", "de mesa", "electrónicos"];
  const sel = (beat: number): [number, number] | null => (beat === 2 ? [0, 2] : beat === 3 ? [1, 0] : null);
  return {
    label: "Una tabla de datos como matriz",
    captions: [
      "Los juguetes recogidos cada semana se pueden ordenar en una tabla: filas = semanas, columnas = tipos de juego.",
      "Si se quitan las etiquetas queda una **matriz**: $m = 2$ filas y $n = 3$ columnas. Su dimensión es $2\\times 3$ (primero filas, después columnas).",
      "El elemento $a_{13}$ está en la **fila 1** y la **columna 3**: vale $33$ (juegos electrónicos de la primera semana).",
      "El elemento $a_{21}$ está en la fila 2, columna 1: vale $28$. En $a_{ij}$ el primer subíndice es la fila y el segundo, la columna.",
    ],
    beatMs: 5200,
    render: (beat) => {
      const s = sel(beat);
      return (
        <Canvas>
          <Fade show={beat === 0}>
            {colTxt.map((t, j) => (
              <Txt key={t} x={x0 + j * cw + cw / 2} y={y0 - 24} size={20} color={MANIM.muted}>{t}</Txt>
            ))}
            <Txt x={x0 - 22} y={y0 + ch / 2 + 8} size={20} color={MANIM.muted} anchor="end">1.ª semana</Txt>
            <Txt x={x0 - 22} y={y0 + ch + ch / 2 + 8} size={20} color={MANIM.muted} anchor="end">2.ª semana</Txt>
          </Fade>
          <MatrixSvg
            cells={numCells(M)}
            x={x0}
            y={y0}
            cw={cw}
            ch={ch}
            size={36}
            fill={(i, j) => (s && s[0] === i && s[1] === j ? MANIM.yellow : undefined)}
            tint={(i, j) => (s && s[0] === i && s[1] === j ? MANIM.yellow : undefined)}
          />
          <Fade show={beat === 1}>
            <rect x={x0 - 18} y={y0 - 6} width={cw * 3 + 36} height={ch * 2 + 12} rx={10} fill="none" stroke={MANIM.blue} strokeWidth={2} strokeDasharray="8 6" />
            <Txt x={x0 - 40} y={y0 + ch + 8} size={26} color={MANIM.blue} anchor="end">m = 2 filas</Txt>
            <Txt x={x0 + (cw * 3) / 2} y={y0 + ch * 2 + 52} size={26} color={MANIM.green}>n = 3 columnas</Txt>
            <Txt x={x0 + (cw * 3) / 2} y={y0 - 38} size={30} color={MANIM.yellow}>dimensión 2 × 3</Txt>
          </Fade>
          {s ? (
            <Fade show dy={10}>
              <Txt x={400} y={360} size={32} color={MANIM.yellow}>{`a${"₀₁₂₃"[s[0] + 1]}${"₀₁₂₃"[s[1] + 1]} = ${M[s[0]!]![s[1]!]}`}</Txt>
              <Txt x={400} y={394} size={20} color={MANIM.muted}>{`fila ${s[0] + 1}, columna ${s[1] + 1}`}</Txt>
            </Fade>
          ) : null}
        </Canvas>
      );
    },
  };
}

const TIPOS: { nombre: string; m: number[][]; nota: string; ceros: (i: number, j: number) => boolean }[] = [
  { nombre: "Triangular superior", m: [[1, 2, 3], [0, 4, -1], [0, 0, 2]], nota: "Ceros debajo de la diagonal principal", ceros: (i, j) => i > j },
  { nombre: "Triangular inferior", m: [[1, 0, 0], [2, -1, 0], [3, 1, -2]], nota: "Ceros encima de la diagonal principal", ceros: (i, j) => i < j },
  { nombre: "Diagonal", m: [[2, 0, 0], [0, -3, 0], [0, 0, 5]], nota: "Solo la diagonal principal puede ser distinta de cero", ceros: (i, j) => i !== j },
  { nombre: "Escalar", m: [[4, 0, 0], [0, 4, 0], [0, 0, 4]], nota: "Diagonal con todos los elementos iguales", ceros: (i, j) => i !== j },
  { nombre: "Identidad I₃", m: [[1, 0, 0], [0, 1, 0], [0, 0, 1]], nota: "Escalar con unos en la diagonal", ceros: (i, j) => i !== j },
];

/** Matrices cuadradas con ceros: triangular, diagonal, escalar e identidad. */
export function buildMatrizTipos(): AnimBuild {
  return {
    label: "Tipos de matrices cuadradas",
    captions: [
      "**Triangular superior**: todos los elementos **por debajo** de la diagonal principal son cero.",
      "**Triangular inferior**: son cero los elementos **por encima** de la diagonal principal.",
      "**Diagonal**: solo puede haber elementos distintos de cero en la diagonal principal ($a_{ij} = 0$ si $i \\neq j$). Es triangular superior e inferior a la vez.",
      "**Escalar**: matriz diagonal cuyos elementos de la diagonal son todos iguales.",
      "**Identidad** $I$: matriz escalar con unos en la diagonal. Cada tipo está contenido en el anterior: $I \\subset$ escalar $\\subset$ diagonal $\\subset$ triangular.",
    ],
    beatMs: 5000,
    render: (beat) => {
      const t = TIPOS[beat]!;
      return (
        <Canvas>
          <Txt x={400} y={70} size={34} color={MANIM.yellow}>{t.nombre}</Txt>
          <MatrixSvg
            cells={numCells(t.m)}
            x={290}
            y={120}
            cw={72}
            ch={56}
            size={32}
            fill={(i, j) => (t.ceros(i, j) ? MANIM.red : i === j ? MANIM.blue : undefined)}
            tint={(i, j) => (t.ceros(i, j) ? MANIM.red : i === j ? MANIM.blue : undefined)}
          />
          <Txt x={400} y={340} size={24} color={MANIM.muted}>{t.nota}</Txt>
          <Fade show={beat === 4} dy={10}>
            <Txt x={400} y={386} size={22} color={MANIM.green}>I ⊂ escalar ⊂ diagonal ⊂ triangular</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
