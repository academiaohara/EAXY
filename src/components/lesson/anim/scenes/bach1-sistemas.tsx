import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmtEs } from "@/components/lesson/anim/arith";
import { KIND_TEXT, eqText, gauss3, type Row } from "@/components/lesson/anim/gauss";

const DEFAULT: number[] = [1, 1, 1, 6, 2, -1, 1, 3, 1, 2, -1, 2];

const clampInt = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, Math.round(Number.isFinite(v) ? v : 0)));

/** Convierte `nums` (12 valores) en tres filas con coeficientes enteros acotados. */
function rowsOf(nums: number[] | undefined): [Row, Row, Row] {
  const n = nums && nums.length >= 12 ? nums : DEFAULT;
  const v = n.slice(0, 12).map((x) => clampInt(x, -9, 9));
  return [v.slice(0, 4) as Row, v.slice(4, 8) as Row, v.slice(8, 12) as Row];
}

const COLORS = [MANIM.blue, MANIM.orange, MANIM.green];

function System({ rows, y0 }: { rows: Row[]; y0: number }) {
  return (
    <g>
      <path d={`M 128 ${y0 - 34} Q 108 ${y0 + 56} 128 ${y0 + 146}`} fill="none" stroke={MANIM.muted} strokeWidth={3} />
      {rows.map((r, i) => (
        <g key={i}>
          <Txt x={50} y={y0 + i * 56 + 22} size={24} color={COLORS[i]!} anchor="start">{`E${i + 1}`}</Txt>
          <Txt x={150} y={y0 + i * 56 + 24} size={32} color={MANIM.ink} anchor="start">{eqText(r)}</Txt>
        </g>
      ))}
    </g>
  );
}

/**
 * Método de Gauss con tres ecuaciones y tres incógnitas.
 * `nums`: `[a₁,b₁,c₁,d₁, a₂,b₂,c₂,d₂, a₃,b₃,c₃,d₃]` (enteros entre −9 y 9).
 */
export function buildGaussEliminacion(params: { nums?: number[] }): AnimBuild {
  const rows = rowsOf(params.nums);
  const g = gauss3(rows);
  const [s0, s1, s2] = g.steps as [Row[], Row[], Row[]];
  const last = s2[2]!;
  const kind = g.kind;
  const fmtN = (n: number) => fmtEs(n, 2);
  const result =
    kind === "determinado"
      ? [`z = ${fmtN(g.solution![2])}`, `y = ${fmtN(g.solution![1])}`, `x = ${fmtN(g.solution![0])}`]
      : kind === "incompatible"
        ? [`0 = ${String(last[3]).replace("-", "−")}  (absurdo)`]
        : ["0 = 0  (siempre se cumple)"];
  const lastCaption =
    kind === "determinado"
      ? `La última ecuación da $z$; subiendo ecuación a ecuación salen $y$ y $x$. Solución única: $(${g.solution!.map((v) => fmtN(v).replace(",", "{,}")).join(",\\ ")})$. Es **compatible determinado**: los tres planos se cortan en un punto.`
      : kind === "incompatible"
        ? `La última ecuación queda $0 = ${last[3]}$, que es imposible. El sistema es **incompatible**: no existe ninguna solución.`
        : `La última ecuación queda $0 = 0$: desaparece y sobran incógnitas. Es **compatible indeterminado**: infinitas soluciones, que se dan en función de un parámetro ($z = k$).`;
  return {
    label: `Método de Gauss: sistema ${KIND_TEXT[kind]}`,
    captions: [
      `Tres ecuaciones con tres incógnitas. El método de Gauss las transforma en otro sistema **equivalente** en forma de escalera, fácil de resolver de abajo arriba.`,
      `Paso 1: eliminar $x$ en la 2.ª y la 3.ª ecuaciones sumando múltiplos de la 1.ª. Sus operaciones: ${g.ops[0]!.map((o) => `$${o.replace("→", "\\to").replace(/·/g, "\\cdot ")}$`).join(" y ")}.`,
      `Paso 2: eliminar $y$ en la 3.ª ecuación con la 2.ª: $${g.ops[1]!.join("").replace("→", "\\to").replace(/·/g, "\\cdot ")}$. Queda un sistema escalonado: 3, 2 y 1 incógnitas.`,
      lastCaption,
    ],
    beatMs: 5200,
    render: (beat) => {
      const cur = beat === 0 ? s0 : beat === 1 ? s1 : s2;
      return (
        <Canvas>
          <Txt x={400} y={40} size={26} color={MANIM.muted}>
            {beat === 0 ? "Sistema inicial" : beat === 1 ? "Paso 1: eliminar x" : beat === 2 ? "Paso 2: eliminar y" : `Sistema escalonado: ${KIND_TEXT[kind]}`}
          </Txt>
          <System rows={cur} y0={90} />
          <Fade show={beat === 1} dx={14}>
            {g.ops[0]!.map((o, i) => (
              <Txt key={i} x={600} y={168 + i * 56} size={24} color={MANIM.yellow} anchor="start">{o}</Txt>
            ))}
          </Fade>
          <Fade show={beat === 2} dx={14}>
            {g.ops[1]!.map((o, i) => (
              <Txt key={i} x={600} y={224 + i * 56} size={24} color={MANIM.yellow} anchor="start">{o}</Txt>
            ))}
          </Fade>
          <Fade show={beat >= 3} dy={10}>
            <rect x={150} y={290} width={500} height={96} rx={12} fill={MANIM.panel} stroke={kind === "incompatible" ? MANIM.red : MANIM.green} strokeWidth={3} />
            {result.map((t, i) => (
              <Txt key={i} x={result.length === 3 ? 260 + i * 140 : 400} y={352} size={result.length === 3 ? 34 : 30} color={kind === "incompatible" ? MANIM.red : MANIM.green}>{t}</Txt>
            ))}
          </Fade>
        </Canvas>
      );
    },
  };
}
