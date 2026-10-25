import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, B, Curve, Dot, mapper, type View } from "@/components/lesson/anim/scenes/bach1-limites";

/** Recta por (x0, y0) con pendiente m, recortada a la ventana. */
function Line({ v, x0, y0, m, color, dashed = false, width = 3 }: { v: View; x0: number; y0: number; m: number; color: string; dashed?: boolean; width?: number }) {
  const { px, py } = mapper(v);
  return (
    <g clipPath="url(#lim-clip)">
      <line x1={px(v.x0)} y1={py(y0 + m * (v.x0 - x0))} x2={px(v.x1)} y2={py(y0 + m * (v.x1 - x0))} stroke={color} strokeWidth={width} strokeDasharray={dashed ? "9 7" : undefined} />
    </g>
  );
}

/** Rectas secantes que giran hacia la tangente: f(x) = x² en x = 1. */
export function buildSecanteTangente(): AnimBuild {
  const f = (x: number) => x * x;
  const v: View = { x0: -1, x1: 4, y0: -1, y1: 10 };
  const { px, py } = mapper(v);
  const qs = [3, 2, 1.5];
  return {
    label: "De la recta secante a la recta tangente",
    captions: [
      "Sea $f(x) = x^2$ y el punto $P(1,\\ 1)$. Queremos la pendiente de la curva **en** $P$.",
      "Con $Q$ en $x = 3$: $\\text{TVM} = \\dfrac{f(3) - f(1)}{3 - 1} = \\dfrac{9 - 1}{2} = 4$. Es la pendiente de la **secante** $PQ$.",
      "Acercamos $Q$ a $x = 2$: $\\dfrac{4 - 1}{1} = 3$. La secante se inclina menos.",
      "Con $Q$ en $x = 1{,}5$: $\\dfrac{2{,}25 - 1}{0{,}5} = 2{,}5$. Las pendientes se acercan a un valor.",
      "Cuando $Q \\to P$ la secante se convierte en la **tangente**, de pendiente $f'(1) = \\displaystyle\\lim_{h\\to 0}\\dfrac{f(1 + h) - f(1)}{h} = 2$.",
    ],
    beatMs: 5000,
    render: (beat) => {
      const q = beat >= 1 && beat <= 3 ? qs[beat - 1]! : null;
      return (
        <Canvas>
          <Axes v={v} />
          <Curve f={f} v={v} color={MANIM.blue} />
          {q !== null ? (
            <g>
              <Line v={v} x0={1} y0={1} m={(f(q) - 1) / (q - 1)} color={MANIM.red} />
              <Dot x={px(q)} y={py(f(q))} color={MANIM.red} />
              <Txt x={px(q) + 12} y={py(f(q)) - 14} size={22} color={MANIM.red} anchor="start">{`pendiente ${((f(q) - 1) / (q - 1)).toString().replace(".", ",")}`}</Txt>
            </g>
          ) : null}
          <Fade show={beat >= 4}>
            <Line v={v} x0={1} y0={1} m={2} color={MANIM.green} />
            <Txt x={px(2.2)} y={py(1.6)} size={24} color={MANIM.green} anchor="start">tangente: pendiente 2</Txt>
          </Fade>
          <Dot x={px(1)} y={py(1)} color={MANIM.yellow} />
          <Txt x={px(1) - 16} y={py(1) + 28} size={22} color={MANIM.yellow} anchor="end">P</Txt>
        </Canvas>
      );
    },
  };
}

/** El signo de la derivada decide si la función sube o baja: f(x) = 2x − 0,1x². */
export function buildDerivadaSigno(): AnimBuild {
  const f = (x: number) => 2 * x - 0.1 * x * x;
  const df = (x: number) => 2 - 0.2 * x;
  const v: View = { x0: -1, x1: 21, y0: -2, y1: 12 };
  const { px, py } = mapper(v);
  const pts = [
    { a: 5, color: MANIM.green, text: "f′(5) = 1 > 0: sube" },
    { a: 10, color: MANIM.yellow, text: "f′(10) = 0: tangente horizontal" },
    { a: 15, color: MANIM.red, text: "f′(15) = −1 < 0: baja" },
  ];
  return {
    label: "El signo de la derivada: crecimiento y decrecimiento",
    captions: [
      "La trayectoria de un avión de juguete es $f(x) = 2x - 0{,}1x^2$, con $f'(x) = 2 - 0{,}2x$.",
      "En $x = 5$: $f'(5) = 1 > 0$. La tangente sube y la función es **creciente**.",
      "En $x = 10$: $f'(10) = 0$. La tangente es horizontal: es el punto más alto.",
      "En $x = 15$: $f'(15) = -1 < 0$. La tangente baja y la función es **decreciente**.",
    ],
    beatMs: 5000,
    render: (beat) => (
      <Canvas>
        <Axes v={v} />
        <Curve f={f} v={v} color={MANIM.blue} />
        {pts.map((p, i) => (
          <Fade key={p.a} show={beat === i + 1}>
            <Line v={{ ...v, x0: p.a - 5, x1: p.a + 5 }} x0={p.a} y0={f(p.a)} m={df(p.a)} color={p.color} width={4} />
            <Dot x={px(p.a)} y={py(f(p.a))} color={p.color} />
            <Txt x={px(p.a)} y={B + 8} size={22} color={p.color}>{p.text}</Txt>
          </Fade>
        ))}
      </Canvas>
    ),
  };
}

/** Puntos críticos de f(x) = x³ − 3x y criterios de la primera y la segunda derivada. */
export function buildExtremosCriterios(): AnimBuild {
  const f = (x: number) => x ** 3 - 3 * x;
  const v: View = { x0: -2.5, x1: 2.5, y0: -4, y1: 4 };
  const { px, py } = mapper(v);
  return {
    label: "Máximos y mínimos con la derivada",
    captions: [
      "Sea $f(x) = x^3 - 3x$, con $f'(x) = 3x^2 - 3$ y $f''(x) = 6x$.",
      "En un máximo o un mínimo la tangente es horizontal: $f'(x) = 0 \\Rightarrow 3x^2 - 3 = 0 \\Rightarrow x = \\pm 1$. Son los **puntos críticos**.",
      "El signo de $f'$ lo confirma: **+** antes de $-1$ (sube), **−** entre $-1$ y $1$ (baja), **+** después de $1$ (sube).",
      "Con la segunda derivada: $f''(-1) = -6 < 0$ → **máximo** $(-1,\\ 2)$; $f''(1) = 6 > 0$ → **mínimo** $(1,\\ -2)$.",
    ],
    beatMs: 5200,
    render: (beat) => (
      <Canvas>
        <Axes v={v} />
        <Curve f={f} v={v} color={MANIM.blue} />
        <Fade show={beat >= 1}>
          {[-1, 1].map((a) => (
            <g key={a}>
              <Line v={v} x0={a} y0={f(a)} m={0} color={MANIM.yellow} dashed width={2.5} />
              <Dot x={px(a)} y={py(f(a))} color={beat >= 3 ? (a < 0 ? MANIM.red : MANIM.green) : MANIM.yellow} />
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={px(-1.55)} y={py(-3.2)} size={30} color={MANIM.green}>f′ &gt; 0</Txt>
          <Txt x={px(0)} y={py(3)} size={30} color={MANIM.red}>f′ &lt; 0</Txt>
          <Txt x={px(1.5)} y={py(3.3)} size={30} color={MANIM.green}>f′ &gt; 0</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={px(-1) - 14} y={py(2) - 18} size={24} color={MANIM.red} anchor="end">máximo (−1, 2)</Txt>
          <Txt x={px(1) + 14} y={py(-2) + 34} size={24} color={MANIM.green} anchor="start">mínimo (1, −2)</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
