import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Vaso (trapecio) con su líquido; `x`,`y` es la esquina superior izquierda. */
function Glass({ x, y, s, filled = true }: { x: number; y: number; s: number; filled?: boolean }) {
  const w = 56 * s;
  const b = 42 * s;
  const h = 72 * s;
  const inset = (w - b) / 2;
  return (
    <g>
      {filled ? (
        <polygon
          points={`${x + 2 * s},${x * 0 + y + 14 * s} ${x + w - 2 * s},${y + 14 * s} ${x + w - inset - 2 * s},${y + h - 2} ${x + inset + 2 * s},${y + h - 2}`}
          fill={MANIM.blue}
          fillOpacity={0.45}
        />
      ) : null}
      <polygon
        points={`${x},${y} ${x + w},${y} ${x + w - inset},${y + h} ${x + inset},${y + h}`}
        fill="none"
        stroke={MANIM.ink}
        strokeWidth={3}
        strokeLinejoin="round"
      />
    </g>
  );
}

const JUG_X = 70;

/** Medir = contar cuántas veces cabe una unidad; y la unidad tiene que ser la misma para todos. */
export function buildMedirUnidad(): AnimBuild {
  const captions = [
    "Queremos medir la **capacidad** de esta jarra: cuánto líquido cabe.",
    "Medir es **comparar** con una cantidad fija: la **unidad de medida**. Aquí, un vaso.",
    "Se cuenta cuántas veces cabe la unidad: la jarra mide **5 vasos**.",
    "Con otro vaso, la misma jarra mide **8 vasos**. Sin una unidad **convencional** que todos conozcan, el número no dice nada.",
  ];
  const big = Array.from({ length: 5 }, (_, i) => ({ x: 360 + i * 78, y: 200 }));
  const small = Array.from({ length: 8 }, (_, i) => ({ x: 340 + i * 54, y: 214 }));
  return {
    label: "Medir una jarra con vasos: la unidad tiene que ser la misma para todos",
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {/* jarra */}
        <g>
          <rect x={JUG_X} y={150} width={130} height={190} rx={14} fill="none" stroke={MANIM.ink} strokeWidth={4} />
          <rect x={JUG_X + 4} y={196} width={122} height={140} rx={10} fill={MANIM.blue} fillOpacity={0.45} />
          <path d={`M ${JUG_X + 130} 180 q 46 6 46 54 q 0 48 -46 54`} fill="none" stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
          <Txt x={JUG_X + 65} y={376} size={20} color={MANIM.muted} weight={500}>
            cantidad que se va a medir
          </Txt>
        </g>
        {/* la unidad */}
        <Fade show={beat === 1} dy={10}>
          <Glass x={398} y={150} s={1.5} />
          <Txt x={440} y={290} size={22} color={MANIM.yellow}>
            unidad de medida
          </Txt>
        </Fade>
        {/* 5 vasos */}
        {big.map((g, i) => (
          <Fade key={i} show={beat === 2} dy={-12} delay={i * 220}>
            <Glass x={g.x} y={g.y} s={1} />
            <Txt x={g.x + 28} y={g.y - 14} size={24} color={MANIM.yellow}>
              {i + 1}
            </Txt>
          </Fade>
        ))}
        <Fade show={beat === 2} dy={8} delay={1100}>
          <Txt x={560} y={340} size={34} color={MANIM.green}>
            la jarra mide 5 vasos
          </Txt>
        </Fade>
        {/* 8 vasos pequeños */}
        {small.map((g, i) => (
          <Fade key={i} show={beat === 3} dy={-12} delay={i * 130}>
            <Glass x={g.x} y={g.y} s={0.72} />
            <Txt x={g.x + 20} y={g.y - 10} size={20} color={MANIM.yellow}>
              {i + 1}
            </Txt>
          </Fade>
        ))}
        <Fade show={beat === 3} dy={8} delay={1100}>
          <Txt x={560} y={340} size={30} color={MANIM.red}>
            la misma jarra mide 8 vasos
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
