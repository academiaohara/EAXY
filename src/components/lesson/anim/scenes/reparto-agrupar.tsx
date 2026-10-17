import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const COLORS = [MANIM.blue, MANIM.green, MANIM.yellow, MANIM.orange, MANIM.purple, MANIM.red];
const CLOUD_COLS = 15;
const CLOUD_GAP = 26;
const CARD_W = 220;
const CARD_H = 150;
const CARD_GAP = 20;
const IN_COLS = 5;
const IN_GAP = 22;

/** Repartir y agrupar son la misma división leída de dos formas: el mismo reparto en cajas. */
export function buildRepartoAgrupar(params: { a?: number; b?: number }): AnimBuild {
  const total = params.a ?? 150;
  const boxes = params.b ?? 6;
  const per = Math.floor(total / boxes);
  const cardCols = Math.min(3, boxes);
  const cardRows = Math.ceil(boxes / cardCols);
  const gridW = cardCols * CARD_W + (cardCols - 1) * CARD_GAP;
  const gridH = cardRows * CARD_H + (cardRows - 1) * CARD_GAP;
  const x0 = (800 - gridW) / 2;
  const y0 = 56 + (350 - gridH) / 2;
  const cloudW = (CLOUD_COLS - 1) * CLOUD_GAP;
  const cloudRows = Math.ceil(total / CLOUD_COLS);

  const cardOrigin = (c: number) => ({
    x: x0 + (c % cardCols) * (CARD_W + CARD_GAP),
    y: y0 + Math.floor(c / cardCols) * (CARD_H + CARD_GAP),
  });

  const dots = Array.from({ length: total }, (_, i) => {
    const cloud = {
      x: 400 - cloudW / 2 + (i % CLOUD_COLS) * CLOUD_GAP,
      y: 70 + Math.floor(i / CLOUD_COLS) * CLOUD_GAP + (350 - cloudRows * CLOUD_GAP) / 2,
    };
    const c = Math.min(boxes - 1, Math.floor(i / per));
    const j = i - c * per;
    const origin = cardOrigin(c);
    const innerW = (IN_COLS - 1) * IN_GAP;
    const target = {
      x: origin.x + CARD_W / 2 - innerW / 2 + (j % IN_COLS) * IN_GAP,
      y: origin.y + 46 + Math.floor(j / IN_COLS) * IN_GAP,
    };
    return { cloud, target, c, j };
  });

  return {
    label: `${total} : ${boxes} = ${per} y ${total} : ${per} = ${boxes}: el mismo reparto leído de dos formas`,
    captions: [
      `**${total}** bombones sueltos.`,
      `**Repartir:** ${total} bombones en ${boxes} cajas iguales. ¿Cuántos en cada una? → $${total} : ${boxes} = ${per}$.`,
      `**Agrupar:** cajas de ${per}. ¿Cuántas se llenan? → $${total} : ${per} = ${boxes}$. Es el **mismo reparto**, leído al revés.`,
      `Por eso toda división se **comprueba multiplicando**: $${boxes} \\cdot ${per} = ${total}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {Array.from({ length: boxes }).map((_, c) => {
          const o = cardOrigin(c);
          const color = COLORS[c % COLORS.length]!;
          return (
            <Fade key={c} show={beat >= 1} dy={10} delay={c * 70}>
              <rect x={o.x} y={o.y} width={CARD_W} height={CARD_H} rx={12} fill="rgba(255,255,255,0.04)" stroke={color} strokeWidth={2.5} />
              <Fade show={beat === 1 && c === 0} dy={4}>
                <Txt x={o.x + 18} y={o.y + 26} size={22} color={color} anchor="start">
                  {`¿${per}?`}
                </Txt>
              </Fade>
              <Fade show={beat >= 2} dy={4} delay={c * 220}>
                <Txt x={o.x + 18} y={o.y + 26} size={22} color={color} anchor="start">
                  {`caja ${c + 1}`}
                </Txt>
              </Fade>
            </Fade>
          );
        })}
        {dots.map((d, i) => (
          <circle
            key={i}
            cx={d.cloud.x}
            cy={d.cloud.y}
            r={beat === 0 ? 7 : 6}
            fill={beat === 0 ? MANIM.muted : COLORS[d.c % COLORS.length]}
            className="anim-t"
            style={{
              transform: beat >= 1 ? `translate(${d.target.x - d.cloud.x}px, ${d.target.y - d.cloud.y}px)` : "translate(0px, 0px)",
              transitionDelay: beat >= 1 ? `${d.c * 70 + d.j * 6}ms` : "0ms",
              transitionDuration: "0.8s",
            }}
          />
        ))}
        <Fade show={beat === 0} dy={8}>
          <Txt x={400} y={40} size={26} color={MANIM.yellow}>
            {`${total} bombones`}
          </Txt>
        </Fade>
        <Fade show={beat === 1} dy={8}>
          <Txt x={400} y={40} size={26} color={MANIM.yellow}>
            {`${total} : ${boxes} = ${per} en cada caja`}
          </Txt>
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <Txt x={400} y={40} size={26} color={MANIM.yellow}>
            {`${total} : ${per} = ${boxes} cajas`}
          </Txt>
        </Fade>
        <Fade show={beat === 3} dy={8}>
          <Txt x={400} y={40} size={26} color={MANIM.yellow}>
            {`${boxes} · ${per} = ${total}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
