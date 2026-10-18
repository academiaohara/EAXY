import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg, Wedge, WedgeLabel, polar, type Pt } from "@/components/lesson/anim/geometry";

/** Los ocho ángulos que forma una secante con dos paralelas (numerados como en el libro). */
export function ParalelasFigure({
  theta,
  active,
  ghost = false,
  labelValues = false,
  highlight,
}: {
  /** Ángulo (grados) que forma la secante con las paralelas. */
  theta: number;
  /** Ángulos (1–8) resaltados, con su color. */
  active?: { ids: number[]; color: string }[];
  /** Cuña fantasma del ángulo 1 trasladada al 5 (correspondientes). */
  ghost?: boolean;
  labelValues?: boolean;
  highlight?: number[];
}) {
  const y1 = 130;
  const y2 = 290;
  const P1: Pt = [430, y1];
  const P2: Pt = [430 - (y2 - y1) / Math.tan((theta * Math.PI) / 180), y2];
  const centers = [P1, P2];
  // Ángulo k (1..4 en P1, 5..8 en P2): UR, LR, LL, UL.
  const spans: [number, number][] = [
    [0, theta],
    [theta + 180, 360],
    [180, theta + 180],
    [theta, 180],
  ];
  const wedgeOf = (k: number) => {
    const c = centers[k > 4 ? 1 : 0]!;
    const [a0, a1] = spans[(k - 1) % 4]!;
    return { c, a0, a1 };
  };
  const colorOf = (k: number) => active?.find((g) => g.ids.includes(k))?.color;
  const value = (k: number) => {
    const [a0, a1] = spans[(k - 1) % 4]!;
    return Math.round(a1 - a0);
  };
  const dir = theta;
  const tail = polar(P2, 90, dir + 180);
  const head = polar(P1, 90, dir);
  return (
    <>
      <Seg a={[60, y1]} b={[740, y1]} color={MANIM.blue} width={4} />
      <Seg a={[60, y2]} b={[740, y2]} color={MANIM.blue} width={4} />
      <Seg a={tail} b={head} color={MANIM.orange} width={4} />
      <Txt x={760} y={y1 - 10} size={26} color={MANIM.blue} anchor="end">r₁</Txt>
      <Txt x={760} y={y2 - 10} size={26} color={MANIM.blue} anchor="end">r₂</Txt>
      <Txt x={head[0] + 14} y={head[1] - 6} size={26} color={MANIM.orange}>s</Txt>
      {Array.from({ length: 8 }, (_, i) => i + 1).map((k) => {
        const { c, a0, a1 } = wedgeOf(k);
        const color = colorOf(k);
        const lit = !!color || (highlight?.includes(k) ?? false);
        return (
          <g key={k}>
            <Wedge c={c} r={44} a0={a0} a1={a1} color={color ?? MANIM.muted} show={lit} opacity={0.5} />
            <WedgeLabel
              c={c}
              r={lit ? 66 : 62}
              a0={a0}
              a1={a1}
              text={labelValues ? `${value(k)}°` : String(k)}
              size={labelValues ? 21 : 24}
              color={color ?? MANIM.muted}
            />
          </g>
        );
      })}
      <Move x={ghost ? P2[0] - P1[0] : 0} y={ghost ? P2[1] - P1[1] : 0}>
        <g style={{ opacity: ghost ? 1 : 0 }} className="anim-t">
          <path
            d={(() => {
              const { c, a0, a1 } = wedgeOf(1);
              const [x0, y0] = polar(c, 44, a0);
              const [x1, y1b] = polar(c, 44, a1);
              return `M ${c[0]} ${c[1]} L ${x0} ${y0} A 44 44 0 0 0 ${x1} ${y1b} Z`;
            })()}
            fill={MANIM.green}
            fillOpacity={0.35}
            stroke={MANIM.green}
            strokeWidth={3}
            strokeDasharray="6 5"
          />
        </g>
      </Move>
    </>
  );
}

/** Secante y dos paralelas: ocho ángulos, opuestos por el vértice, correspondientes y alternos. */
export function buildParalelasSecante(): import("@/components/lesson/anim/types").AnimBuild {
  const theta = 65;
  return {
    label: "Una recta secante corta a dos paralelas y forma ocho ángulos con parejas iguales: opuestos, correspondientes y alternos",
    captions: [
      "Una recta $s$ corta a dos paralelas, $r_1$ y $r_2$: se forman **ocho ángulos**, cuatro en cada corte.",
      "Los **opuestos por el vértice** son iguales: $\\hat{1} = \\hat{3}$.",
      "Los **correspondientes** ocupan la misma posición en cada corte: trasladando $\\hat{1}$ por la secante cae sobre $\\hat{5}$. Son iguales.",
      "Los **alternos internos** están entre las paralelas y a lados distintos de $s$: $\\hat{3} = \\hat{5}$.",
      "Los **alternos externos** están fuera de las paralelas y a lados distintos de $s$: $\\hat{1} = \\hat{7}$.",
    ],
    render: (beat) => {
      const groups =
        beat === 1
          ? [{ ids: [1, 3], color: MANIM.blue }]
          : beat === 2
            ? [{ ids: [1, 5], color: MANIM.green }]
            : beat === 3
              ? [{ ids: [3, 5], color: MANIM.orange }]
              : beat === 4
                ? [{ ids: [1, 7], color: MANIM.purple }]
                : [];
      return (
        <Canvas>
          <ParalelasFigure theta={theta} active={groups} ghost={beat === 2} labelValues={beat >= 1} />
          <Fade show={beat >= 1} dy={6}>
            <Txt x={150} y={398} size={26} color={MANIM.yellow}>{`${theta}° = ${theta}°`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
