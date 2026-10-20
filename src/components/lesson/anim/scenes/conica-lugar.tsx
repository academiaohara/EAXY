import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CX = 400;
const CY = 215;
const U = 38;

const dist = (a: [number, number], b: [number, number]) => Math.hypot(a[0] - b[0], a[1] - b[1]);
const px = (p: [number, number]) => CX + p[0] * U;
const py = (p: [number, number]) => CY - p[1] * U;

/** Elipse, parábola e hipérbola definidas como lugares geométricos de puntos con una propiedad de distancias. */
export function buildConicaLugar(params: { conica?: "elipse" | "parabola" | "hiperbola" }): AnimBuild {
  const kind = params.conica ?? "elipse";

  if (kind === "elipse") {
    const a = 5;
    const c = 4;
    const b = Math.sqrt(a * a - c * c);
    const F: [number, number] = [-c, 0];
    const F2: [number, number] = [c, 0];
    const P: [number, number] = [a * Math.cos(1), b * Math.sin(1)];
    const total = dist(P, F) + dist(P, F2);
    return {
      label: "Elipse: la suma de distancias a los dos focos es constante",
      captions: [
        "Dos puntos fijos, los **focos** $F$ y $F'$, y una distancia constante $d$.",
        "Tomamos un punto $P$ cualquiera de la curva y medimos $PF$ y $PF'$.",
        `**Elipse**: lugar geométrico de los puntos cuya **suma** de distancias a los focos es constante: $PF + PF' = d$ (aquí $d = ${total.toFixed(0)}$).`,
      ],
      render: (beat) => (
        <Canvas>
          <ellipse cx={CX} cy={CY} rx={a * U} ry={b * U} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
          {[F, F2].map((f, i) => (
            <g key={i}>
              <circle cx={px(f)} cy={py(f)} r={7} fill={MANIM.blue} />
              <Txt x={px(f)} y={py(f) + 28} size={22} color={MANIM.blue}>{i === 0 ? "F" : "F'"}</Txt>
            </g>
          ))}
          <Fade show={beat >= 1}>
            <line x1={px(F)} y1={py(F)} x2={px(P)} y2={py(P)} stroke={MANIM.green} strokeWidth={3} />
            <line x1={px(F2)} y1={py(F2)} x2={px(P)} y2={py(P)} stroke={MANIM.orange} strokeWidth={3} />
            <circle cx={px(P)} cy={py(P)} r={8} fill={MANIM.ink} />
            <Txt x={px(P) + 14} y={py(P) - 12} size={22} color={MANIM.ink} anchor="start">P</Txt>
          </Fade>
          <Fade show={beat >= 2} dy={8}>
            <Txt x={400} y={385} size={26} color={MANIM.yellow}>{`PF + PF' = ${dist(P, F).toFixed(1).replace(".", ",")} + ${dist(P, F2).toFixed(1).replace(".", ",")} = ${total.toFixed(0)}`}</Txt>
          </Fade>
        </Canvas>
      ),
    };
  }

  if (kind === "parabola") {
    const F: [number, number] = [0, 2];
    const yd = -2;
    const pts: string[] = [];
    for (let x = -5.2; x <= 5.2; x += 0.1) pts.push(`${px([x, (x * x) / 8])},${py([x, (x * x) / 8])}`);
    const P: [number, number] = [4, 2];
    return {
      label: "Parábola: puntos que equidistan del foco y de la directriz",
      captions: [
        "Un punto fijo, el **foco** $F$, y una recta fija, la **directriz** $d$.",
        "Tomamos un punto $P$ de la curva y medimos su distancia al foco y a la directriz.",
        "**Parábola**: lugar geométrico de los puntos que **equidistan** del foco y de la directriz: $PF = \\text{dist}(P, d)$.",
      ],
      render: (beat) => (
        <Canvas>
          <line x1={80} y1={py([0, yd])} x2={720} y2={py([0, yd])} stroke={MANIM.red} strokeWidth={3} strokeDasharray="10 8" />
          <Txt x={700} y={py([0, yd]) - 12} size={22} color={MANIM.red} anchor="end">directriz d</Txt>
          <polyline points={pts.join(" ")} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
          <circle cx={px(F)} cy={py(F)} r={7} fill={MANIM.blue} />
          <Txt x={px(F)} y={py(F) - 16} size={22} color={MANIM.blue}>F</Txt>
          <Fade show={beat >= 1}>
            <line x1={px(F)} y1={py(F)} x2={px(P)} y2={py(P)} stroke={MANIM.green} strokeWidth={3} />
            <line x1={px(P)} y1={py(P)} x2={px(P)} y2={py([0, yd])} stroke={MANIM.orange} strokeWidth={3} />
            <circle cx={px(P)} cy={py(P)} r={8} fill={MANIM.ink} />
            <Txt x={px(P) + 14} y={py(P) - 10} size={22} color={MANIM.ink} anchor="start">P</Txt>
          </Fade>
          <Fade show={beat >= 2} dy={8}>
            <Txt x={400} y={395} size={26} color={MANIM.yellow}>{`PF = dist(P, d) = ${dist(P, F).toFixed(0)}`}</Txt>
          </Fade>
        </Canvas>
      ),
    };
  }

  const a = 2;
  const c = 4;
  const b = Math.sqrt(c * c - a * a);
  const F: [number, number] = [-c, 0];
  const F2: [number, number] = [c, 0];
  const branch = (s: number) => {
    const out: string[] = [];
    for (let t = -1.6; t <= 1.6; t += 0.05) out.push(`${px([s * a * Math.cosh(t), b * Math.sinh(t)])},${py([s * a * Math.cosh(t), b * Math.sinh(t)])}`);
    return out.join(" ");
  };
  const P: [number, number] = [a * Math.cosh(1.1), b * Math.sinh(1.1)];
  const diff = Math.abs(dist(P, F) - dist(P, F2));
  return {
    label: "Hipérbola: la diferencia de distancias a los dos focos es constante",
    captions: [
      "Dos puntos fijos, los **focos** $F$ y $F'$, y una distancia constante $d$.",
      "Tomamos un punto $P$ de una rama y medimos $PF$ y $PF'$.",
      `**Hipérbola**: lugar geométrico de los puntos cuya **diferencia** de distancias a los focos, en valor absoluto, es constante: $|PF - PF'| = d$ (aquí $d = ${diff.toFixed(0)}$).`,
    ],
    render: (beat) => (
      <Canvas>
        <polyline points={branch(1)} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
        <polyline points={branch(-1)} fill="none" stroke={MANIM.yellow} strokeWidth={4} />
        {[F, F2].map((f, i) => (
          <g key={i}>
            <circle cx={px(f)} cy={py(f)} r={7} fill={MANIM.blue} />
            <Txt x={px(f)} y={py(f) + 28} size={22} color={MANIM.blue}>{i === 0 ? "F" : "F'"}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1}>
          <line x1={px(F)} y1={py(F)} x2={px(P)} y2={py(P)} stroke={MANIM.green} strokeWidth={3} />
          <line x1={px(F2)} y1={py(F2)} x2={px(P)} y2={py(P)} stroke={MANIM.orange} strokeWidth={3} />
          <circle cx={px(P)} cy={py(P)} r={8} fill={MANIM.ink} />
          <Txt x={px(P) + 14} y={py(P) - 12} size={22} color={MANIM.ink} anchor="start">P</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={8}>
          <Txt x={400} y={392} size={26} color={MANIM.yellow}>{`|PF − PF'| = |${dist(P, F).toFixed(1).replace(".", ",")} − ${dist(P, F2).toFixed(1).replace(".", ",")}| = ${diff.toFixed(0)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
