import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { urnTree } from "@/components/lesson/anim/prob";
import type { AnimBuild } from "@/components/lesson/anim/types";

const ROOT = { x: 70, y: 210 };
const L1 = { V: { x: 330, y: 110 }, R: { x: 330, y: 310 } };
const L2 = { VV: 55, VR: 165, RV: 255, RR: 365 } as const;
const COL = { V: MANIM.green, R: MANIM.red } as const;
const name = { V: "verde", R: "roja" } as const;
const fr = (f: { n: number; d: number }) => `${f.n}/${f.d}`;

/** Diagrama en árbol de dos extracciones de una urna. `nums = [verdes, rojas, reemplazamiento (0/1)]`. */
export function buildArbolUrna(params: { nums?: number[] }): AnimBuild {
  const g = Math.min(Math.max(Math.round(params.nums?.[0] ?? 3), 1), 8);
  const r = Math.min(Math.max(Math.round(params.nums?.[1] ?? 2), 1), 8);
  const rep = (params.nums?.[2] ?? 0) === 1;
  const t = urnTree(g, r, rep);
  const get = (a: "V" | "R", b: "V" | "R") => t.find((l) => l.first === a && l.second === b)!;

  return {
    label: `Árbol de dos extracciones de una urna con ${g} verdes y ${r} rojas ${rep ? "con" : "sin"} reemplazamiento`,
    captions: [
      `Una urna con **${g} verdes** y **${r} rojas**. En la 1.ª extracción: $P(V) = \\frac{${g}}{${g + r}}$ y $P(R) = \\frac{${r}}{${g + r}}$.`,
      rep
        ? `Con **reemplazamiento** la bola vuelve a la urna: la composición **no cambia** y la 2.ª extracción tiene las mismas probabilidades (experiencias **independientes**).`
        : `**Sin reemplazamiento**, si la 1.ª es verde quedan ${g - 1} verdes y ${r} rojas: las probabilidades de la 2.ª extracción **cambian**.`,
      `Si la 1.ª es roja, ${rep ? "la urna sigue igual" : `quedan ${g} verdes y ${r - 1} rojas`}: probabilidades condicionadas $P(\\cdot / R)$.`,
      `Cada camino se multiplica: $P(V, V) = ${fr(get("V", "V").p1)}\\cdot${fr(get("V", "V").p2)} = ${fr(get("V", "V").p)}$. Las cuatro ramas suman $1$.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <circle cx={ROOT.x} cy={ROOT.y} r={9} fill={MANIM.yellow} />
        {(["V", "R"] as const).map((c) => (
          <g key={c}>
            <line x1={ROOT.x} y1={ROOT.y} x2={L1[c].x} y2={L1[c].y} stroke={COL[c]} strokeWidth={4} />
            <circle cx={L1[c].x} cy={L1[c].y} r={14} fill={COL[c]} />
            <Txt x={(ROOT.x + L1[c].x) / 2} y={(ROOT.y + L1[c].y) / 2 + (c === "V" ? -14 : 28)} size={22} color={COL[c]}>{fr(get(c, "V").p1)}</Txt>
          </g>
        ))}
        {(["V", "R"] as const).map((a, ia) => (
          <Fade key={a} show={beat >= (ia === 0 ? 1 : 2)}>
            {(["V", "R"] as const).map((b, ib) => {
              const key = `${a}${b}` as keyof typeof L2;
              const y = L2[key];
              const leaf = get(a, b);
              return (
                <g key={b}>
                  <line x1={L1[a].x} y1={L1[a].y} x2={520} y2={y} stroke={COL[b]} strokeWidth={3.5} />
                  <circle cx={520} cy={y} r={10} fill={COL[b]} />
                  <Txt x={(L1[a].x + 520) / 2 + (ib === 0 ? 10 : 10)} y={(L1[a].y + y) / 2 + (ib === 0 ? -8 : 22)} size={20} color={COL[b]}>{fr(leaf.p2)}</Txt>
                </g>
              );
            })}
          </Fade>
        ))}
        <Fade show={beat >= 3}>
          {(["V", "R"] as const).flatMap((a) =>
            (["V", "R"] as const).map((b) => {
              const leaf = get(a, b);
              return (
                <Txt key={`${a}${b}`} x={540} y={L2[`${a}${b}` as keyof typeof L2] + 7} size={20} color={MANIM.ink} anchor="start">
                  {`${a},${b}: ${fr(leaf.p1)}·${fr(leaf.p2)} = ${fr(leaf.p)}`}
                </Txt>
              );
            }),
          )}
        </Fade>
        <Txt x={14} y={ROOT.y - 26} size={18} color={MANIM.muted} anchor="start">{`${g} ${name.V}s, ${r} ${name.R}s`}</Txt>
      </Canvas>
    ),
  };
}
