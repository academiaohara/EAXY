import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { NEG, POS, zp, zs } from "@/components/lesson/anim/integers";

type Eq = { left: string; result: number };

function EqText({ x, y, size, eq, anchor = "start" }: { x: number; y: number; size: number; eq: Eq; anchor?: "start" | "middle" | "end" }) {
  return (
    <Txt x={x} y={y} size={size} anchor={anchor}>
      {eq.left}
      <tspan fill={eq.result >= 0 ? POS : NEG}>{` ${zs(eq.result)}`}</tspan>
    </Txt>
  );
}

/** Dividir deshace multiplicar: de cada producto salen dos cocientes, y con ellos la regla de los signos. */
export function buildDivisionInversa(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 4;
  const b = params.b ?? 5;
  const p = a * b;
  const rows: { product: Eq; divs: [Eq, Eq]; tags: [string, string] }[] = [
    {
      product: { left: `${zp(a)} · ${zp(b)} =`, result: p },
      divs: [
        { left: `${zp(p)} : ${zp(a)} =`, result: b },
        { left: `${zp(p)} : ${zp(b)} =`, result: a },
      ],
      tags: ["+ : + = +", "+ : + = +"],
    },
    {
      product: { left: `${zp(a)} · ${zp(-b)} =`, result: -p },
      divs: [
        { left: `${zp(-p)} : ${zp(a)} =`, result: -b },
        { left: `${zp(-p)} : ${zp(-b)} =`, result: a },
      ],
      tags: ["− : + = −", "− : − = +"],
    },
    {
      product: { left: `${zp(-a)} · ${zp(-b)} =`, result: p },
      divs: [
        { left: `${zp(p)} : ${zp(-a)} =`, result: -b },
        { left: `${zp(p)} : ${zp(-b)} =`, result: -a },
      ],
      tags: ["+ : − = −", "+ : − = −"],
    },
  ];
  const rowY = [82, 212, 342];

  return {
    label: `Cada multiplicación de enteros da dos divisiones: la regla de los signos del cociente es la del producto`,
    captions: [
      `Partimos de una multiplicación: $(+${a})\\cdot(+${b}) = +${p}$.`,
      `Dividir **deshace** multiplicar: $(+${p}):(+${a}) = +${b}$ y $(+${p}):(+${b}) = +${a}$. Más entre más, **más**.`,
      `De $(+${a})\\cdot(-${b}) = -${p}$ salen $(-${p}):(+${a}) = -${b}$ y $(-${p}):(-${b}) = +${a}$. Menos entre más, **menos**; menos entre menos, **más**.`,
      `Y de $(-${a})\\cdot(-${b}) = +${p}$ sale $(+${p}):(-${a}) = -${b}$. Más entre menos, **menos**.`,
      `La regla de los signos de la división es **la misma** que la del producto: iguales, $+$; distintos, $-$.`,
    ],
    render: (beat) => (
      <Canvas>
        {rows.map((r, i) => (
          <g key={i}>
            <Fade show={beat >= (i === 0 ? 0 : i + 1)} dx={-10}>
              <EqText x={36} y={rowY[i]! + 10} size={30} eq={r.product} />
            </Fade>
            <Fade show={beat >= (i === 0 ? 1 : i + 1)} dx={-10} delay={i === 0 ? 0 : 250}>
              <Txt x={338} y={rowY[i]! + 10} size={34} color={MANIM.yellow}>⇒</Txt>
              {r.divs.map((d, k) => (
                <g key={k}>
                  <EqText x={394} y={rowY[i]! - 16 + k * 44 + 10} size={26} eq={d} />
                  <Fade show={beat >= 4} dx={8}>
                    <Txt x={770} y={rowY[i]! - 16 + k * 44 + 8} size={20} color={MANIM.yellow} anchor="end">{r.tags[k]}</Txt>
                  </Fade>
                </g>
              ))}
            </Fade>
          </g>
        ))}
      </Canvas>
    ),
  };
}
