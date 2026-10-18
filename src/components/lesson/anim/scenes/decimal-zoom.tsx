import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { ORDER_PLURAL, ORDER_SINGULAR, ORDER_VALUE, fromScaled, parseDec, readDec, scaled, texDec } from "@/components/lesson/anim/decimal";

const X0 = 225;
const X1 = 740;
const tickX = (t: number) => X0 + (t / 10) * (X1 - X0);

const LEVEL_COLORS = [MANIM.blue, MANIM.green, MANIM.purple];

function axisYs(levels: number): number[] {
  if (levels === 1) return [220];
  if (levels === 2) return [140, 310];
  return [105, 235, 365];
}

/** Cada tramo se amplía y se divide otra vez en diez: décimas, centésimas, milésimas. */
export function buildDecimalZoom(params: { dec?: string }): AnimBuild {
  const dec = params.dec ?? "2,375";
  const d = parseDec(dec);
  const levels = Math.max(1, Math.min(3, d.frac.length));
  const ys = axisYs(levels);

  const info = Array.from({ length: levels }, (_, i) => {
    const k = i + 1;
    const lo = scaled(`${d.int}${d.frac.slice(0, i)}`);
    const digit = Number(d.frac[i]);
    return {
      k,
      lo,
      digit,
      loText: fromScaled(lo, i),
      hiText: fromScaled(lo + 1, i),
      markText: fromScaled(lo * 10 + digit, k),
      color: LEVEL_COLORS[i]!,
    };
  });

  const captions = info.flatMap((lv) => {
    const order = ORDER_PLURAL[lv.k - 1]!;
    const single = ORDER_SINGULAR[lv.k - 1]!;
    const first =
      lv.k === 1
        ? `Entre **${lv.loText}** y **${lv.hiText}** hay una unidad. Se divide en **diez partes iguales**: cada una es **una ${single}** ($${texDec(ORDER_VALUE[0]!)}$).`
        : `Se **amplía** el tramo entre $${texDec(lv.loText)}$ y $${texDec(lv.hiText)}$ y se divide otra vez en diez: cada parte es **una ${single}** ($${texDec(ORDER_VALUE[lv.k - 1]!)}$).`;
    const second = `$${texDec(lv.markText)}$ → **${readDec(lv.markText)}**${lv.k < levels ? "." : `: la cifra de las ${order} es la última.`}`;
    return [first, second];
  });

  return {
    label: `La unidad se divide en décimas, después en centésimas y en milésimas hasta situar ${dec}`,
    captions,
    beatMs: 3400,
    render: (beat) => (
      <Canvas>
        {info.map((lv, i) => {
          const y = ys[i]!;
          const shown = beat >= 2 * i;
          const marked = beat >= 2 * i + 1;
          const prev = i > 0 ? info[i - 1]! : null;
          const prevY = i > 0 ? ys[i - 1]! : 0;
          return (
            <g key={lv.k}>
              {/* embudo desde el tramo del nivel anterior */}
              {prev ? (
                <Fade show={shown} dy={-8}>
                  <line x1={tickX(prev.digit)} y1={prevY + 12} x2={X0} y2={y - 18} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" />
                  <line x1={tickX(prev.digit + 1)} y1={prevY + 12} x2={X1} y2={y - 18} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" />
                </Fade>
              ) : null}
              <Fade show={shown} dy={prev ? -10 : 0}>
                <Txt x={20} y={y - 2} size={21} color={lv.color} anchor="start">
                  {ORDER_PLURAL[lv.k - 1]}
                </Txt>
                <Txt x={20} y={y + 24} size={16} color={MANIM.muted} anchor="start" weight={500}>
                  {`cada parte = ${ORDER_VALUE[lv.k - 1]}`}
                </Txt>
                <line x1={X0 - 16} y1={y} x2={X1 + 16} y2={y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
                {Array.from({ length: 11 }, (_, t) => (
                  <line key={t} x1={tickX(t)} y1={y - (t % 10 === 0 ? 14 : 8)} x2={tickX(t)} y2={y + (t % 10 === 0 ? 14 : 8)} stroke={t % 10 === 0 ? MANIM.ink : MANIM.muted} strokeWidth={t % 10 === 0 ? 4 : 2.5} strokeLinecap="round" />
                ))}
                <Txt x={X0} y={y + 40} size={22} color={MANIM.muted}>
                  {lv.loText}
                </Txt>
                <Txt x={X1} y={y + 40} size={22} color={MANIM.muted}>
                  {lv.hiText}
                </Txt>
              </Fade>
              {/* tramo que se va a ampliar */}
              {i < levels - 1 ? (
                <WriteLine show={beat >= 2 * (i + 1)} x1={tickX(lv.digit)} y1={y} x2={tickX(lv.digit + 1)} y2={y} color={MANIM.yellow} width={7} />
              ) : null}
              <Fade show={marked} dy={-14}>
                <polygon points={`${tickX(lv.digit)},${y - 5} ${tickX(lv.digit) - 9},${y - 22} ${tickX(lv.digit) + 9},${y - 22}`} fill={MANIM.yellow} />
                <Txt x={tickX(lv.digit)} y={y - 32} size={28} color={MANIM.yellow}>
                  {lv.markText}
                </Txt>
              </Fade>
            </g>
          );
        })}
      </Canvas>
    ),
  };
}
