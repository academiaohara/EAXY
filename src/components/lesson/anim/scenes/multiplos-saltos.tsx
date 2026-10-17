import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { lcm } from "@/components/lesson/anim/number-theory";

const X0 = 50;
const X1 = 750;

function Arc({ x1, x2, y, color, show, delay }: { x1: number; x2: number; y: number; color: string; show: boolean; delay: number }) {
  const h = Math.min(54, (x2 - x1) * 0.45);
  return (
    <path
      d={`M ${x1} ${y} Q ${(x1 + x2) / 2} ${y - h * 2} ${x2} ${y}`}
      fill="none"
      stroke={color}
      strokeWidth={3}
      strokeLinecap="round"
      pathLength={1}
      strokeDasharray={1}
      strokeDashoffset={show ? 0 : 1}
      className="anim-draw"
      style={{ transitionDelay: `${show ? delay : 0}ms`, opacity: show ? 1 : 0 }}
    />
  );
}

/** Múltiplos como saltos regulares sobre la recta; con dos pasos, aparecen los múltiplos comunes. */
export function buildMultiplosSaltos(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 4;
  const b = params.b;
  const dual = b !== undefined;
  const m = dual ? lcm(a, b) : 0;
  const len = dual ? m * 2 : a * 6;
  const sx = (v: number) => X0 + (v / len) * (X1 - X0);
  const lanes = dual
    ? [
        { step: a, y: 150, color: MANIM.blue },
        { step: b, y: 320, color: MANIM.orange },
      ]
    : [{ step: a, y: 230, color: MANIM.blue }];
  const mults = (step: number) => Array.from({ length: Math.floor(len / step) }, (_, k) => (k + 1) * step);
  const common = dual ? mults(m) : [];

  const captions = dual
    ? [
        `Dos autobuses salen **a la vez** (minuto $0$): uno pasa cada **${a}** min y el otro cada **${b}**.`,
        `Múltiplos de ${a}: $${mults(a).join(", ")}$. Cada salto mide ${a}.`,
        `Múltiplos de ${b}: $${mults(b).join(", ")}$. Cada salto mide ${b}.`,
        `Coinciden en $${common.join(" \\text{ y } ")}$: son los **múltiplos comunes**. El menor, **${m}**, es el **m.c.m.**`,
      ]
    : [
        `Partimos de $0$ y avanzamos de **${a}** en **${a}**.`,
        `Cada salto cae en un **múltiplo de ${a}**: $${mults(a).slice(0, 4).join(", ")}, \\dots$`,
        `No hay último salto: los múltiplos son **infinitos**. El menor es el propio ${a}.`,
      ];

  return {
    label: dual
      ? `Múltiplos de ${a} y de ${b} como saltos en la recta; coinciden primero en ${m}`
      : `Los múltiplos de ${a} como saltos regulares sobre la recta numérica`,
    captions,
    render: (beat) => (
      <Canvas>
        {lanes.map((lane, li) => {
          const active = dual ? beat >= li + 1 : beat >= 1;
          return (
            <g key={li}>
              <line x1={X0 - 10} y1={lane.y} x2={X1 + 20} y2={lane.y} stroke={MANIM.grid} strokeWidth={3} strokeLinecap="round" />
              <circle cx={sx(0)} cy={lane.y} r={6} fill={MANIM.ink} />
              <Txt x={sx(0)} y={lane.y + 34} size={20} color={MANIM.muted}>0</Txt>
              {mults(lane.step).map((v, k) => (
                <g key={v}>
                  <Arc x1={sx(v - lane.step)} x2={sx(v)} y={lane.y} color={lane.color} show={active} delay={k * 140} />
                  <Fade show={active} dy={-6} delay={k * 140 + 250}>
                    <circle cx={sx(v)} cy={lane.y} r={6} fill={lane.color} />
                    <Txt x={sx(v)} y={lane.y + 34} size={dual ? 20 : 22} color={lane.color}>{v}</Txt>
                  </Fade>
                </g>
              ))}
              <Fade show={dual && active} dy={-6}>
                <Txt x={X0} y={lane.y - 70} size={22} color={lane.color} anchor="start">
                  {`cada ${lane.step} min`}
                </Txt>
              </Fade>
            </g>
          );
        })}
        {dual
          ? common.map((v, k) => {
              const left = sx(v) > 600;
              return (
                <Fade key={v} show={beat >= 3} delay={k * 250}>
                  <line x1={sx(v)} y1={196} x2={sx(v)} y2={262} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 7" />
                  <circle cx={sx(v)} cy={150} r={11} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
                  <circle cx={sx(v)} cy={320} r={11} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
                  <Txt x={sx(v) + (left ? -16 : 16)} y={238} size={k === 0 ? 28 : 24} color={MANIM.yellow} anchor={left ? "end" : "start"}>
                    {k === 0 ? `m.c.m. = ${v}` : String(v)}
                  </Txt>
                </Fade>
              );
            })
          : null}
        {!dual ? (
          <Fade show={beat >= 2} dx={-10}>
            <Txt x={X1 + 20} y={176} size={30} color={MANIM.muted} anchor="end">…</Txt>
          </Fade>
        ) : null}
      </Canvas>
    ),
  };
}
