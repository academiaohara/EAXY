import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const GX = 50;
const GY = 50;
const CELL = 32;

/**
 * Porcentaje como «a de cada 100»: cuadrícula de 100 con `a` casillas marcadas. Con un
 * total `b` distinto de 100 se parte en paquetes de 100 y se toman `a` de cada uno.
 */
export function buildCuadriculaPorcentaje(params: { a?: number; b?: number }): AnimBuild {
  const pct = Math.min(100, Math.max(0, params.a ?? 20));
  const total = params.b ?? 100;
  const per = total / 100;
  const res = per * pct;
  const custom = total !== 100;

  const captions = [
    `Un cuadrado dividido en **100 partes iguales**: cada casilla es el 1 %.`,
    `El **${pct} %** son **${pct} casillas de cada 100**.`,
    custom
      ? `Si el total es **${numEs(total)}**, cada paquete de 100 casillas representa $${numTex(total)} : 100 = ${numTex(per)}$ unidades.`
      : `Aquí el total es 100: ${pct} casillas son justo **${pct}** unidades.`,
    custom
      ? `Se toma ${pct} paquetes de ese tamaño: $${numTex(per)} \\cdot ${pct} = ${numTex(res)}$. El ${pct} % de ${numTex(total)} es **${numEs(res)}**.`
      : `El ${pct} % de 100 es **${pct}**.`,
  ];

  const cells = Array.from({ length: 100 }, (_, i) => i);
  // se rellena de abajo hacia arriba, fila a fila
  const filled = (i: number) => {
    const row = Math.floor(i / 10);
    const col = i % 10;
    const order = (9 - row) * 10 + col;
    return order < pct;
  };

  return {
    label: `El ${pct} % de ${numEs(total)}: ${pct} casillas de cada 100`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {cells.map((i) => {
          const r = Math.floor(i / 10);
          const c = i % 10;
          const on = beat >= 1 && filled(i);
          return (
            <rect
              key={i}
              x={GX + c * CELL + 2}
              y={GY + r * CELL + 2}
              width={CELL - 4}
              height={CELL - 4}
              rx={4}
              className="anim-t"
              fill={on ? MANIM.yellow : "none"}
              fillOpacity={on ? 0.9 : 0}
              stroke={on ? MANIM.yellow : MANIM.grid}
              strokeWidth={2}
              style={{ transitionDelay: on ? `${(Math.floor((99 - i) / 10) * 40)}ms` : "0ms" }}
            />
          );
        })}
        <Fade show>
          <Txt x={GX + (10 * CELL) / 2} y={GY + 10 * CELL + 36} size={22} color={MANIM.muted}>100 casillas = 100 %</Txt>
        </Fade>
        <Fade show={beat >= 1} dx={10}>
          <Txt x={440} y={110} size={60} color={MANIM.yellow} anchor="start">{`${pct} %`}</Txt>
          <Txt x={440} y={150} size={26} color={MANIM.muted} anchor="start">{`${pct} de cada 100`}</Txt>
        </Fade>
        <Fade show={beat >= 2 && custom} dx={10}>
          <Txt x={440} y={230} size={28} color={MANIM.blue} anchor="start">{`${numEs(total)} : 100 = ${numEs(per)}`}</Txt>
          <Txt x={440} y={262} size={22} color={MANIM.muted} anchor="start">cada casilla vale esto</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={10}>
          <Txt x={440} y={custom ? 330 : 240} size={32} color={MANIM.green} anchor="start">{custom ? `${numEs(per)} · ${pct} = ${numEs(res)}` : `${pct} de 100`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
