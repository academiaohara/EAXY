import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MatrixSvg, numCells } from "@/components/lesson/anim/matrix-svg";
import { buildPasosFilas } from "@/components/lesson/anim/scenes/bach2-matrices";
import { analizarSistema, escalonar, mat, qShow } from "@/components/lesson/anim/matrices";

const clampInt = (v: number | undefined, fb: number) => (Number.isFinite(v) ? Math.max(-9, Math.min(9, Math.round(v as number))) : fb);

/** Texto de una ecuación `ax + by + cz = d` con signos y sin coeficientes 1. */
export function ecuacionTxt(r: number[]): string {
  const nombres = ["x", "y", "z"];
  let out = "";
  for (let j = 0; j < 3; j++) {
    const c = r[j]!;
    if (c === 0) continue;
    const abs = Math.abs(c) === 1 ? "" : String(Math.abs(c));
    out += out === "" ? `${c < 0 ? "−" : ""}${abs}${nombres[j]}` : ` ${c < 0 ? "−" : "+"} ${abs}${nombres[j]}`;
  }
  return `${out || "0"} = ${String(r[3]).replace("-", "−")}`;
}

const EJ: number[][] = [[1, 1, 1, 3], [2, -1, 1, 2], [1, 2, -3, 0]];

/** De las ecuaciones a la forma matricial A·X = B y a la matriz ampliada. */
export function buildSistemaFormaMatricial(): AnimBuild {
  const A = EJ.map((r) => r.slice(0, 3));
  const b = EJ.map((r) => [r[3]!]);
  return {
    label: "Un sistema en forma matricial",
    captions: [
      "Un sistema de $3$ ecuaciones con $3$ incógnitas. Cada ecuación es **lineal**: las incógnitas solo aparecen con exponente $1$ y sin multiplicarse entre sí.",
      "Los **coeficientes** de las incógnitas, ordenados, forman la matriz del sistema $A$ ($3\\times 3$).",
      "Las incógnitas forman la matriz columna $X$ y los términos independientes la matriz columna $B$.",
      "El sistema completo es el producto de matrices $A\\cdot X = B$: la fila $i$ de $A$ por $X$ da la ecuación $i$.",
      "Si se pega $B$ a la derecha de $A$ se obtiene la **matriz ampliada** $A^* = (A\\,|\\,B)$, que guarda todo el sistema.",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 1}>
          {EJ.map((r, i) => (
            <Txt key={i} x={70} y={130 + i * 56} size={32} anchor="start" color={MANIM.ink}>{ecuacionTxt(r)}</Txt>
          ))}
          <path d="M 52 96 Q 36 176 52 256" fill="none" stroke={MANIM.muted} strokeWidth={3} />
        </Fade>
        <Fade show={beat >= 1 && beat <= 3} dx={20}>
          <MatrixSvg cells={numCells(A)} x={beat === 1 ? 420 : 60} y={beat === 1 ? 110 : 140} cw={60} ch={50} size={28} color={MANIM.blue} />
          <Txt x={beat === 1 ? 510 : 150} y={beat === 1 ? 88 : 118} size={22} color={MANIM.blue}>A</Txt>
        </Fade>
        <Fade show={beat >= 2 && beat <= 3} dx={20}>
          <MatrixSvg cells={[["x"], ["y"], ["z"]]} x={290} y={140} cw={52} ch={50} size={28} color={MANIM.green} />
          <Txt x={316} y={118} size={22} color={MANIM.green}>X</Txt>
        </Fade>
        <Fade show={beat >= 2 && beat <= 3} dx={20}>
          <Txt x={382} y={238} size={34} color={MANIM.muted}>=</Txt>
          <MatrixSvg cells={numCells(b)} x={430} y={140} cw={52} ch={50} size={28} color={MANIM.orange} />
          <Txt x={456} y={118} size={22} color={MANIM.orange}>B</Txt>
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <Txt x={400} y={360} size={30} color={MANIM.yellow}>A · X = B</Txt>
        </Fade>
        <Fade show={beat === 4} dx={20}>
          <MatrixSvg cells={numCells(EJ)} x={250} y={130} cw={62} ch={52} size={30} split={3} tint={(_, j) => (j === 3 ? MANIM.orange : MANIM.blue)} />
          <Txt x={400} y={340} size={26} color={MANIM.yellow}>matriz ampliada A* = (A | B)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Método de Gauss sobre la matriz ampliada. `nums`: `[a₁,b₁,c₁,d₁, a₂,b₂,c₂,d₂, a₃,b₃,c₃,d₃]`. */
export function buildSistemaGaussAmpliada(params: { nums?: number[] }): AnimBuild {
  const raw = params.nums && params.nums.length === 12 ? params.nums : EJ.flat();
  const filas = [0, 1, 2].map((i) => raw.slice(i * 4, i * 4 + 4).map((v) => clampInt(v, 0)));
  const aug = mat(filas);
  const an = analizarSistema(mat(filas.map((r) => r.slice(0, 3))), mat(filas.map((r) => [r[3]!])));
  const pasos = escalonar(aug);
  const texto =
    an.tipo === "determinado"
      ? `x = ${qShow(an.solucion![0]!)},  y = ${qShow(an.solucion![1]!)},  z = ${qShow(an.solucion![2]!)}`
      : an.tipo === "indeterminado"
        ? `S.C.I.: rg = ${an.rA} < 3`
        : "S.I.: aparece 0 = c ≠ 0";
  const finalCap =
    an.tipo === "determinado"
      ? `Las tres filas son no nulas: $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = 3$. Se resuelve **de abajo arriba** y sale la única solución: $x = ${qShow(an.solucion![0]!).replace("−", "-")}$, $y = ${qShow(an.solucion![1]!).replace("−", "-")}$, $z = ${qShow(an.solucion![2]!).replace("−", "-")}$. Sistema **compatible determinado**.`
      : an.tipo === "indeterminado"
        ? `Aparece una fila de ceros: $\\operatorname{rg}(A) = \\operatorname{rg}(A^*) = ${an.rA} < 3$. Sobran ecuaciones y quedan incógnitas libres: **infinitas soluciones**. Sistema compatible indeterminado.`
        : `Una fila queda $(0\\ 0\\ 0\\,|\\,c)$ con $c \\neq 0$, es decir $0 = c$, que es imposible: $\\operatorname{rg}(A) < \\operatorname{rg}(A^*)$. Sistema **incompatible**.`;
  return buildPasosFilas({
    label: "Método de Gauss con la matriz ampliada",
    mat: aug,
    pasos,
    split: 3,
    intro: "Se escribe el sistema como **matriz ampliada** $(A\\,|\\,B)$. Con operaciones elementales por filas se busca una forma **escalonada** (ceros bajo la diagonal); el sistema obtenido es equivalente.",
    stepCaption: (op) => (op.includes("↔") ? `Se intercambian dos ecuaciones: $${op.replace("↔", "\\leftrightarrow ")}$.` : `Se elimina una incógnita con $${op.replace(/→/g, "\\to ").replace(/·/g, "\\cdot ").replace(/−/g, "-")}$.`),
    finalCaption: finalCap,
    finalText: texto,
    header: (b) => (b === 0 ? "Matriz ampliada (A | B)" : b >= pasos.length ? "Sistema escalonado" : `Paso ${b}`),
  });
}

const CASOS = [
  { titulo: "rg(A) = rg(A*) = n", res: "Compatible determinado", det: "Una única solución", color: MANIM.green, ej: "rg(A) = rg(A*) = 3 = n" },
  { titulo: "rg(A) = rg(A*) < n", res: "Compatible indeterminado", det: "Infinitas soluciones (n − rg parámetros)", color: MANIM.yellow, ej: "rg(A) = rg(A*) = 2 < 3 = n" },
  { titulo: "rg(A) < rg(A*)", res: "Incompatible", det: "Ninguna solución", color: MANIM.red, ej: "rg(A) = 2 < 3 = rg(A*)" },
];

/** Teorema de Rouché–Frobenius: los tres casos según los rangos. */
export function buildRoucheCasos(): AnimBuild {
  return {
    label: "Teorema de Rouché–Frobenius",
    captions: [
      "Para un sistema con $n$ incógnitas se comparan dos rangos: el de la matriz $A$ y el de la ampliada $A^*$. Siempre $\\operatorname{rg}(A) \\leq \\operatorname{rg}(A^*)$, porque $A^*$ solo añade una columna.",
      "Si los dos rangos coinciden **y valen $n$**, el sistema tiene **una única solución**.",
      "Si coinciden **pero son menores que $n$**, hay **infinitas soluciones** que dependen de $n - \\operatorname{rg}$ parámetros.",
      "Si el rango de $A^*$ es **mayor** que el de $A$, una ecuación contradice a las demás: **no hay solución**.",
    ],
    beatMs: 5000,
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={52} size={28} color={MANIM.muted}>rg(A) ≤ rg(A*) ≤ n</Txt>
        {CASOS.map((c, i) => {
          const on = beat === i + 1;
          const y = 90 + i * 100;
          return (
            <g key={c.titulo} opacity={beat === 0 || on ? 1 : 0.28} style={{ transition: "opacity 400ms" }}>
              <rect x={40} y={y} width={720} height={82} rx={14} fill={on ? c.color : MANIM.surface} fillOpacity={on ? 0.18 : 1} stroke={c.color} strokeWidth={on ? 3.5 : 2} />
              <Txt x={70} y={y + 36} size={30} color={c.color} anchor="start">{c.titulo}</Txt>
              <Txt x={70} y={y + 66} size={20} color={MANIM.muted} anchor="start">{c.ej}</Txt>
              <Txt x={750} y={y + 36} size={28} color={MANIM.ink} anchor="end">{c.res}</Txt>
              <Txt x={750} y={y + 66} size={20} color={MANIM.muted} anchor="end">{c.det}</Txt>
            </g>
          );
        })}
      </Canvas>
    ),
  };
}
