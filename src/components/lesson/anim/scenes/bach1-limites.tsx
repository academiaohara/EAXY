import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import type { SlideAnimParams } from "@/lib/lesson/types";
import { fmtEs } from "@/components/lesson/anim/arith";

export type Fn = (x: number) => number;
export type View = { x0: number; x1: number; y0: number; y1: number };
export const L = 50;
export const R = 750;
export const T = 30;
export const B = 390;

export const mapper = (v: View) => ({
  px: (x: number) => L + ((x - v.x0) / (v.x1 - v.x0)) * (R - L),
  py: (y: number) => B - ((y - v.y0) / (v.y1 - v.y0)) * (B - T),
});

/** Trazo de f partido donde no hay valor, hay saltos grandes o se sale de la ventana. */
export function Curve({ f, v, color, skip, width = 4 }: { f: Fn; v: View; color: string; skip?: (x: number) => boolean; width?: number }) {
  const { px, py } = mapper(v);
  const span = v.y1 - v.y0;
  const paths: string[][] = [[]];
  let prev: number | null = null;
  const N = 400;
  for (let i = 0; i <= N; i += 1) {
    const x = v.x0 + (i / N) * (v.x1 - v.x0);
    const y = skip?.(x) ? NaN : f(x);
    if (!Number.isFinite(y) || y < v.y0 - span || y > v.y1 + span || (prev !== null && Math.abs(y - prev) > span * 0.6)) {
      if (paths[paths.length - 1]!.length) paths.push([]);
      prev = Number.isFinite(y) && y >= v.y0 - span && y <= v.y1 + span ? y : null;
      if (prev !== null) paths[paths.length - 1]!.push(`${px(x)},${py(y)}`);
      continue;
    }
    paths[paths.length - 1]!.push(`${px(x)},${py(y)}`);
    prev = y;
  }
  return (
    <g clipPath="url(#lim-clip)">
      {paths.filter((p) => p.length > 1).map((p, i) => (
        <polyline key={i} points={p.join(" ")} fill="none" stroke={color} strokeWidth={width} strokeLinejoin="round" />
      ))}
    </g>
  );
}

export function Axes({ v, children }: { v: View; children?: ReactNode }) {
  const { px, py } = mapper(v);
  return (
    <g>
      <defs>
        <clipPath id="lim-clip">
          <rect x={L} y={T - 6} width={R - L} height={B - T + 12} />
        </clipPath>
      </defs>
      {v.y0 <= 0 && v.y1 >= 0 ? <line x1={L - 10} y1={py(0)} x2={R + 10} y2={py(0)} stroke={MANIM.ink} strokeWidth={2} /> : null}
      {v.x0 <= 0 && v.x1 >= 0 ? <line x1={px(0)} y1={T - 12} x2={px(0)} y2={B + 12} stroke={MANIM.ink} strokeWidth={2} /> : null}
      {children}
    </g>
  );
}

export const Dot = ({ x, y, color, r = 8, open = false }: { x: number; y: number; color: string; r?: number; open?: boolean }) => (
  <circle cx={x} cy={y} r={r} fill={open ? MANIM.surface : color} stroke={color} strokeWidth={3} />
);

/** Acercarse a x = 1 por los dos lados: f(x) → 2 aunque f(1) no exista. */
export function buildLimiteAproximacion(): AnimBuild {
  const f: Fn = (x) => (x * x - 1) / (x - 1);
  const v: View = { x0: -0.6, x1: 2.6, y0: -0.3, y1: 4 };
  const { px, py } = mapper(v);
  const left = [0.5, 0.8, 0.95];
  const right = [1.5, 1.2, 1.05];
  return {
    label: "Límite de una función en un punto: acercarse por los dos lados",
    captions: [
      "Sea $f(x) = \\dfrac{x^2 - 1}{x - 1}$. En $x = 1$ **no está definida**: la gráfica tiene un hueco.",
      "Acercándonos a $1$ **por la izquierda** ($0{,}5;\\ 0{,}8;\\ 0{,}95$), los valores de $f$ son $1{,}5;\\ 1{,}8;\\ 1{,}95$: se acercan a $2$.",
      "Acercándonos **por la derecha** ($1{,}5;\\ 1{,}2;\\ 1{,}05$), los valores son $2{,}5;\\ 2{,}2;\\ 2{,}05$: también se acercan a $2$.",
      "Los dos lados coinciden: $\\displaystyle\\lim_{x\\to 1} f(x) = 2$. El límite describe a dónde **se dirige** $f$, no el valor en el punto.",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <Axes v={v} />
        <Curve f={f} v={v} color={MANIM.blue} skip={(x) => Math.abs(x - 1) < 1e-6} />
        <Dot x={px(1)} y={py(2)} color={MANIM.yellow} open />
        <Txt x={px(1) + 14} y={B + 30} size={22} color={MANIM.muted}>1</Txt>
        <Fade show={beat === 0}>
          <Txt x={px(1) + 20} y={py(2) - 22} size={22} color={MANIM.yellow} anchor="start">f(1) no existe</Txt>
        </Fade>
        <Fade show={beat >= 1}>
          {left.map((x) => (
            <g key={x}>
              <Dot x={px(x)} y={py(f(x))} color={MANIM.green} r={7} />
              <Txt x={px(x)} y={py(f(x)) + 30} size={18} color={MANIM.green}>{fmtEs(f(x), 2)}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          {right.map((x) => (
            <g key={x}>
              <Dot x={px(x)} y={py(f(x))} color={MANIM.red} r={7} />
              <Txt x={px(x)} y={py(f(x)) - 16} size={18} color={MANIM.red}>{fmtEs(f(x), 2)}</Txt>
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={L} y1={py(2)} x2={px(1)} y2={py(2)} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="7 6" />
          <line x1={px(1)} y1={py(2)} x2={px(1)} y2={B} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="7 6" />
          <Txt x={L + 70} y={py(2) - 12} size={24} color={MANIM.yellow}>lím = 2</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/** Asíntotas: vertical y horizontal (a = 1) u oblicua y rama parabólica (a = 2). */
export function buildAsintotasTipos(params: SlideAnimParams = {}): AnimBuild {
  const oblique = params.a === 2;
  if (!oblique) {
    const f: Fn = (x) => (2 * x + 1) / (x - 1);
    const v: View = { x0: -4, x1: 6, y0: -6, y1: 10 };
    const { px, py } = mapper(v);
    return {
      label: "Asíntotas verticales y horizontales de una función",
      captions: [
        "$f(x) = \\dfrac{2x + 1}{x - 1}$ no está definida en $x = 1$ y la gráfica se dispara junto a ese valor.",
        "Como $\\displaystyle\\lim_{x\\to 1^+} f = +\\infty$ y $\\displaystyle\\lim_{x\\to 1^-} f = -\\infty$, la recta $x = 1$ es **asíntota vertical**.",
        "Para $x$ muy grande (en positivo o en negativo) la gráfica se pega a $y = 2$: $\\displaystyle\\lim_{x\\to\\pm\\infty} f = 2$. Es **asíntota horizontal**.",
      ],
      beatMs: 5200,
      render: (beat) => (
        <Canvas>
          <Axes v={v} />
          <Curve f={f} v={v} color={MANIM.blue} skip={(x) => Math.abs(x - 1) < 1e-6} />
          <Fade show={beat >= 1}>
            <line x1={px(1)} y1={T - 8} x2={px(1)} y2={B + 8} stroke={MANIM.red} strokeWidth={3} strokeDasharray="9 7" />
            <Txt x={px(1) + 14} y={T + 24} size={24} color={MANIM.red} anchor="start">x = 1</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <line x1={L} y1={py(2)} x2={R} y2={py(2)} stroke={MANIM.green} strokeWidth={3} strokeDasharray="9 7" />
            <Txt x={R - 10} y={py(2) - 12} size={24} color={MANIM.green} anchor="end">y = 2</Txt>
          </Fade>
        </Canvas>
      ),
    };
  }
  const g: Fn = (x) => (x * x + 2 * x - 8) / (x - 1);
  const v: View = { x0: -5, x1: 7, y0: -12, y1: 14 };
  const { px, py } = mapper(v);
  return {
    label: "Asíntota oblicua y rama parabólica",
    captions: [
      "$f(x) = \\dfrac{x^2 + 2x - 8}{x - 1}$ tiene una asíntota vertical en $x = 1$, y para $x$ grande sigue creciendo como una recta.",
      "La pendiente es $m = \\displaystyle\\lim_{x\\to\\infty}\\dfrac{f(x)}{x} = 1$ y la ordenada $n = \\displaystyle\\lim_{x\\to\\infty}\\big(f(x) - x\\big) = 3$: **asíntota oblicua** $y = x + 3$.",
      "Si la función crece sin acercarse a ninguna recta, como $y = x^2$, se dice que tiene una **rama parabólica**.",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <Axes v={v} />
        <Fade show={beat <= 1}>
          <Curve f={g} v={v} color={MANIM.blue} skip={(x) => Math.abs(x - 1) < 1e-6} />
          <line x1={px(1)} y1={T - 8} x2={px(1)} y2={B + 8} stroke={MANIM.red} strokeWidth={3} strokeDasharray="9 7" />
        </Fade>
        <Fade show={beat === 1}>
          <g clipPath="url(#lim-clip)">
            <line x1={px(v.x0)} y1={py(v.x0 + 3)} x2={px(v.x1)} y2={py(v.x1 + 3)} stroke={MANIM.orange} strokeWidth={3} strokeDasharray="9 7" />
          </g>
          <Txt x={px(3.4)} y={py(6.4) + 36} size={24} color={MANIM.orange} anchor="start">y = x + 3</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Curve f={(x) => x * x} v={v} color={MANIM.yellow} />
          <Txt x={px(3.5)} y={py(6)} size={24} color={MANIM.yellow} anchor="start">y = x²</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
