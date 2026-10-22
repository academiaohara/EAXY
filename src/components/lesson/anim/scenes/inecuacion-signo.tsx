import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { relTex, solveLinearInequality, fracValue, type Rel } from "@/components/lesson/anim/eq";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 60;
const X1 = 740;
const Y = 270;
const RELS: Rel[] = ["<", "<=", ">", ">="];
const sym = (r: Rel) => ({ "<": "<", "<=": "≤", ">": ">", ">=": "≥" })[r];
const sx = (v: number) => X0 + ((v + 8) / 16) * (X1 - X0);
const tickLabel = (v: number) => String(v).replace("-", "−");

/** Resolver `a·x rel c` y por qué se invierte la desigualdad al dividir entre un negativo. `nums = [a, c]`. */
export function buildInecuacionSigno(params: { nums?: number[]; ine?: Rel }): AnimBuild {
  const a = Math.round(params.nums?.[0] ?? -2) || -2;
  const c = Math.round(params.nums?.[1] ?? 6);
  const rel: Rel = RELS.includes(params.ine as Rel) ? (params.ine as Rel) : ">";
  const sol = solveLinearInequality(a, 0, rel, c);
  const bound = fracValue(sol.bound);
  const inside = (v: number) => {
    const val = a * v;
    return rel === "<" ? val < c : rel === "<=" ? val <= c : rel === ">" ? val > c : val >= c;
  };
  const tests = [Math.round(bound) - 3, Math.round(bound), Math.round(bound) + 3].map((t) => Math.max(-7, Math.min(7, t)));
  const closed = sol.rel === "<=" || sol.rel === ">=";
  const right = sol.rel === ">" || sol.rel === ">=";
  const bx = sx(Math.max(-8, Math.min(8, bound)));

  return {
    label: `${a}x ${sym(rel)} ${c}: solución x ${sym(sol.rel)} ${bound}${sol.flipped ? " (se invierte al dividir entre un negativo)" : ""}`,
    captions: [
      `Resolvemos $${a}x ${relTex(rel)} ${c}$. Para despejar hay que dividir entre $${a}$.`,
      `Probamos valores: ${tests.map((t) => `$x = ${t}$ da $${a * t}$, ${inside(t) ? "**cumple**" : "**no cumple**"}`).join("; ")}.`,
      `Las soluciones forman una **semirrecta**: $x ${relTex(sol.rel)} ${bound}$.`,
      sol.flipped
        ? `Al dividir entre un número **negativo**, la desigualdad se **invierte**: $${relTex(rel)}$ pasa a $${relTex(sol.rel)}$. Los valores de la prueba lo confirman.`
        : `Al dividir entre un número **positivo**, la desigualdad **no cambia**.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={70} size={52} color={MANIM.ink}>{`${a}x ${sym(rel)} ${c}`.replace("-", "−")}</Txt>
        <line x1={X0 - 20} y1={Y} x2={X1 + 20} y2={Y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
        {Array.from({ length: 17 }, (_, i) => i - 8).filter((v) => v % 2 === 0).map((v) => (
          <g key={v}>
            <line x1={sx(v)} y1={Y - 8} x2={sx(v)} y2={Y + 8} stroke={MANIM.muted} strokeWidth={2} />
            <Txt x={sx(v)} y={Y + 34} size={20} color={MANIM.muted}>{tickLabel(v)}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1 && beat < 2}>
          {tests.map((t, i) => (
            <g key={i}>
              <circle cx={sx(t)} cy={Y} r={9} fill={inside(t) ? MANIM.green : MANIM.red} />
              <Txt x={sx(t)} y={Y - 26} size={20} color={inside(t) ? MANIM.green : MANIM.red}>{`${a * t}`.replace("-", "−")}</Txt>
              <Txt x={sx(t)} y={Y + 64} size={18} color={MANIM.muted}>{`x = ${t}`.replace("-", "−")}</Txt>
            </g>
          ))}
          <Txt x={400} y={160} size={26} color={MANIM.yellow}>{`¿${a}·x ${sym(rel)} ${c}?`.replace("-", "−")}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={right ? bx : X0 - 20} y1={Y} x2={right ? X1 + 20 : bx} y2={Y} stroke={MANIM.green} strokeWidth={9} strokeLinecap="round" />
          <circle cx={bx} cy={Y} r={11} fill={closed ? MANIM.green : MANIM.panel} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={400} y={160} size={40} color={MANIM.green}>{`x ${sym(sol.rel)} ${bound}`.replace("-", "−")}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={370} size={26} color={sol.flipped ? MANIM.orange : MANIM.muted}>
            {sol.flipped ? `÷ ${a}  →  ${sym(rel)} se invierte a ${sym(sol.rel)}`.replace("÷ -", "÷ −") : `÷ ${a}  →  el sentido no cambia`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
