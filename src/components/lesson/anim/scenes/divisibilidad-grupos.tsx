import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const SLOT_W = 140;
const SLOT_GAP = 14;
const CARD_H = 124;
const CARD_Y = 150;
const DOT_GAP = 30;
const CLOUD_COLS = 12;
const CLOUD_GAP = 28;

/**
 * Divisible = los objetos se reparten en grupos completos sin que sobre ninguno.
 * `a` debe ser múltiplo de `b`; `extra` objetos más dejan resto.
 */
export function buildDivisibilidadGrupos(params: { a?: number; b?: number; extra?: number }): AnimBuild {
  const b = params.b ?? 6;
  const a = params.a ?? 24;
  const extra = params.extra ?? 2;
  const groups = Math.floor(a / b);
  const slots = groups + 1;
  const rowW = slots * SLOT_W + (slots - 1) * SLOT_GAP;
  const x0 = (800 - rowW) / 2;
  const cols = Math.min(b, 3);
  const rows = Math.ceil(b / cols);
  const cloudRows = Math.ceil(a / CLOUD_COLS);
  const cloudW = (Math.min(a, CLOUD_COLS) - 1) * CLOUD_GAP;

  const slotX = (s: number) => x0 + s * (SLOT_W + SLOT_GAP);
  const inSlot = (s: number, j: number) => ({
    x: slotX(s) + SLOT_W / 2 - ((cols - 1) * DOT_GAP) / 2 + (j % cols) * DOT_GAP,
    y: CARD_Y + CARD_H / 2 - ((rows - 1) * DOT_GAP) / 2 + Math.floor(j / cols) * DOT_GAP,
  });

  const dots = Array.from({ length: a + extra }, (_, i) => {
    const isExtra = i >= a;
    const cloud = {
      x: 400 - cloudW / 2 + (i % CLOUD_COLS) * CLOUD_GAP,
      y: 210 - ((cloudRows - 1) * CLOUD_GAP) / 2 + Math.floor(i / CLOUD_COLS) * CLOUD_GAP,
    };
    const slot = isExtra ? groups : Math.floor(i / b);
    const target = inSlot(slot, isExtra ? i - a : i % b);
    return { cloud, target, isExtra, slot };
  });
  const color = (slot: number, isExtra: boolean) =>
    isExtra ? MANIM.red : [MANIM.blue, MANIM.green, MANIM.yellow, MANIM.purple, MANIM.orange][slot % 5]!;

  return {
    label: `${a} objetos en grupos de ${b}: sin resto no hay problema; con ${a + extra} sobran ${extra}`,
    captions: [
      `**${a}** objetos. ¿Se pueden repartir en grupos de **${b}** sin que sobre ninguno?`,
      `Salen **${groups} grupos** completos y no sobra nada: la división es **exacta**, así que ${a} es **divisible** entre ${b}.`,
      `Con **${a + extra}** quedan **${extra} sueltos**: el resto no es $0$, así que ${a + extra} **no es divisible** entre ${b}.`,
      `Divisible significa que el número es **un número exacto de grupos**: $${a} = ${b} \\cdot ${groups}$. Con resto no hay forma de escribirlo así.`,
    ],
    render: (beat) => (
      <Canvas>
        {Array.from({ length: groups }).map((_, g) => (
          <Fade key={g} show={beat >= 1} dy={10} delay={g * 80}>
            <rect x={slotX(g)} y={CARD_Y} width={SLOT_W} height={CARD_H} rx={12} fill="rgba(255,255,255,0.04)" stroke={color(g, false)} strokeWidth={2.5} />
          </Fade>
        ))}
        <Fade show={beat >= 2} dy={10}>
          <rect x={slotX(groups)} y={CARD_Y} width={SLOT_W} height={CARD_H} rx={12} fill="rgba(252,98,85,0.08)" stroke={MANIM.red} strokeWidth={2.5} strokeDasharray="7 6" />
          <Txt x={slotX(groups) + SLOT_W / 2} y={CARD_Y + CARD_H + 30} size={22} color={MANIM.red}>
            {`sobran ${extra}`}
          </Txt>
        </Fade>
        {dots.map((d, i) => {
          const moved = d.isExtra ? beat >= 2 : beat >= 1;
          return (
            <circle
              key={i}
              cx={d.cloud.x}
              cy={d.cloud.y}
              r={9}
              fill={beat === 0 || (d.isExtra && beat < 2) ? MANIM.muted : color(d.slot, d.isExtra)}
              className="anim-t"
              style={{
                opacity: d.isExtra && beat < 2 ? 0 : 1,
                transform: moved ? `translate(${d.target.x - d.cloud.x}px, ${d.target.y - d.cloud.y}px)` : "translate(0px, 0px)",
                transitionDelay: moved ? `${d.slot * 80 + (i % b) * 20}ms` : "0ms",
                transitionDuration: "0.8s",
              }}
            />
          );
        })}
        <Fade show={beat === 0} dy={8}>
          <Txt x={400} y={64} size={30} color={MANIM.yellow}>{`${a} objetos`}</Txt>
        </Fade>
        <Fade show={beat === 1} dy={8}>
          <Txt x={400} y={64} size={30} color={MANIM.green}>{`${a} : ${b} = ${groups} · resto 0`}</Txt>
        </Fade>
        <Fade show={beat === 2} dy={8}>
          <Txt x={400} y={64} size={30} color={MANIM.red}>{`${a + extra} : ${b} = ${groups} · resto ${extra}`}</Txt>
        </Fade>
        <Fade show={beat === 3} dy={8}>
          <Txt x={400} y={64} size={30} color={MANIM.yellow}>{`${a} = ${b} · ${groups}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
