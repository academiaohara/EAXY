import { Canvas, Fade, HBrace, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt as formatGrouped } from "@/components/lesson/anim/format";

const X_L = 90;
const X_R = 710;
const Y = 200;
const DIGIT_GAP = 22;

const ORDER_NAMES: Record<number, string> = {
  0: "unidades",
  1: "decenas",
  2: "centenas",
  3: "millares",
  4: "decenas de millar",
  5: "centenas de millar",
  6: "millones",
};

/** Redondear = quedarse con el extremo del tramo más cercano al número. */
export function buildRedondeoRecta(params: { n?: number; power?: number }): AnimBuild {
  const n = params.n ?? 293_518;
  const power = params.power ?? 4;
  const unit = 10 ** power;
  const lower = Math.floor(n / unit) * unit;
  const upper = lower + unit;
  const mid = lower + unit / 2;
  const goesUp = n >= mid;
  const target = goesUp ? upper : lower;
  const pos = (v: number) => X_L + ((v - lower) / unit) * (X_R - X_L);
  const xn = pos(n);
  const xt = pos(target);
  const xmid = pos(mid);
  const order = ORDER_NAMES[power] ?? `10^${power}`;

  const digits = String(n).split("");
  const keptCount = digits.length - power;
  const firstRemoved = digits[keptCount]!;
  const digitX = (i: number) => 400 - ((digits.length - 1) * DIGIT_GAP) / 2 + i * DIGIT_GAP;

  return {
    label: `Redondear ${formatGrouped(n)} a las ${order}: queda en ${formatGrouped(target)}`,
    captions: [
      `**${formatGrouped(n)}** está entre dos múltiplos de ${formatGrouped(unit)}: **${formatGrouped(lower)}** y **${formatGrouped(upper)}**.`,
      `El **punto medio** es ${formatGrouped(mid)}. A su izquierda, el número queda más cerca del extremo bajo; a su derecha, del alto.`,
      goesUp
        ? `${formatGrouped(n)} está **pasado el punto medio**: queda más cerca de ${formatGrouped(upper)}.`
        : `${formatGrouped(n)} está **antes del punto medio**: queda más cerca de ${formatGrouped(lower)}.`,
      `Redondeamos a las ${order}: **${formatGrouped(n)} ≈ ${formatGrouped(target)}**.`,
      `La regla de siempre es esto mismo: la primera cifra que quitamos es un **${firstRemoved}** → ${goesUp ? "es 5 o más, **sube**" : "es menos de 5, **se queda**"}.`,
    ],
    render: (beat) => (
      <Canvas>
        <WriteLine show x1={X_L - 20} y1={Y} x2={X_R + 20} y2={Y} color={MANIM.muted} width={4} />
        {/* extremos */}
        {[
          { v: lower, x: X_L, c: MANIM.blue },
          { v: upper, x: X_R, c: MANIM.green },
        ].map((e) => (
          <g key={e.v}>
            <line x1={e.x} y1={Y - 16} x2={e.x} y2={Y + 16} stroke={e.c} strokeWidth={5} strokeLinecap="round" />
            <Txt x={e.x} y={Y + 52} size={26} color={e.c}>
              {formatGrouped(e.v)}
            </Txt>
          </g>
        ))}
        {/* punto medio */}
        <Fade show={beat >= 1} dy={-8}>
          <line x1={xmid} y1={Y - 90} x2={xmid} y2={Y + 16} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
          <Txt x={xmid} y={Y - 104} size={22} color={MANIM.yellow}>
            {`punto medio · ${formatGrouped(mid)}`}
          </Txt>
        </Fade>
        <Fade show={beat === 1} dy={4}>
          <Txt x={(X_L + xmid) / 2} y={Y - 40} size={22} color={MANIM.blue}>
            ← se queda
          </Txt>
          <Txt x={(xmid + X_R) / 2} y={Y - 40} size={22} color={MANIM.green}>
            sube →
          </Txt>
        </Fade>
        {/* distancias */}
        <Fade show={beat === 2} dy={-6}>
          <HBrace show x1={X_L} x2={xn} y={Y + 70} color={MANIM.blue} label={formatGrouped(n - lower)} labelSize={22} />
          <HBrace show x1={xn} x2={X_R} y={Y + 70} color={MANIM.green} label={formatGrouped(upper - n)} labelSize={22} delay={150} />
        </Fade>
        {/* el número: se desliza al extremo más cercano en el paso 3 */}
        <g
          className="anim-t"
          style={{ transform: `translate(${beat >= 3 ? xt - xn : 0}px, 0px)`, transitionDuration: "0.9s" }}
        >
          <circle cx={xn} cy={Y} r={11} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
          <Fade show={beat < 3} dy={-10}>
            <Txt x={xn + (xn >= xmid ? 16 : -16)} y={Y - 26} size={26} color={MANIM.yellow} anchor={xn >= xmid ? "start" : "end"}>
              {formatGrouped(n)}
            </Txt>
          </Fade>
        </g>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={52} size={36} color={MANIM.yellow}>
            {`${formatGrouped(n)} ≈ ${formatGrouped(target)}`}
          </Txt>
        </Fade>
        <Fade show={beat === 4} dy={10}>
          <g>
            {digits.map((d, i) => {
              const x = digitX(i);
              const kept = i < keptCount;
              const first = i === keptCount;
              return (
                <g key={i}>
                  {first ? <rect x={x - 12} y={Y + 118} width={24} height={44} rx={6} fill="rgba(255,216,102,0.2)" stroke={MANIM.yellow} strokeWidth={2} /> : null}
                  <Txt x={x} y={Y + 150} size={32} color={kept ? MANIM.green : first ? MANIM.yellow : MANIM.muted} mono>
                    {d}
                  </Txt>
                </g>
              );
            })}
          </g>
          <Txt x={digitX(0) + ((keptCount - 1) * DIGIT_GAP) / 2} y={Y + 186} size={18} color={MANIM.green}>
            se conservan
          </Txt>
          <Txt x={digitX(keptCount)} y={Y + 214} size={18} color={MANIM.yellow}>
            ↑ la que decide
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
