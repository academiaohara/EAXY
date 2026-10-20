import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const DATA = [1, 2, 2, 2, 3, 4, 5, 6, 6, 7, 8, 8, 8, 9];
const LEFT = 90;
const UX = 62;
const X = (v: number) => LEFT + v * UX;

const median = (xs: number[]) => {
  const m = Math.floor(xs.length / 2);
  return xs.length % 2 ? xs[m]! : (xs[m - 1]! + xs[m]!) / 2;
};

/** Mediana, cuartiles y diagrama de caja y bigotes de 14 datos. */
export function buildCajaBigotes(): AnimBuild {
  const n = DATA.length;
  const me = median(DATA);
  const q1 = median(DATA.slice(0, n / 2));
  const q3 = median(DATA.slice(n / 2));
  const min = DATA[0]!;
  const max = DATA[n - 1]!;
  const ROW = 120;
  const BOX_Y = 230;
  const BOX_H = 64;
  return {
    label: "Cuartiles y diagrama de caja y bigotes",
    beatMs: 3800,
    captions: [
      `Datos ordenados ($n = ${n}$). La mediana divide los datos en **dos mitades**; los **cuartiles** los dividen en **cuatro** partes.`,
      `Con $n$ par, la mediana es el promedio de los dos centrales: $Q_2 = Me = ${numEs(me)}$.`,
      `$Q_1$ es la mediana de la mitad inferior ($${numEs(q1)}$) y $Q_3$, la de la mitad superior ($${numEs(q3)}$). Entre $0$ y $Q_1$ queda el $25\\,\\%$ de los datos y hasta $Q_3$, el $75\\,\\%$.`,
      `**Caja y bigotes**: la caja va de $Q_1$ a $Q_3$ con una raya en la mediana; los bigotes llegan al mínimo ($${min}$) y al máximo ($${max}$).`,
    ],
    render: (beat) => (
      <Canvas>
        <line x1={X(0)} y1={ROW + 40} x2={X(10)} y2={ROW + 40} stroke={MANIM.ink} strokeWidth={2.5} />
        {Array.from({ length: 11 }, (_, v) => (
          <g key={v}>
            <line x1={X(v)} y1={ROW + 40} x2={X(v)} y2={ROW + 48} stroke={MANIM.ink} strokeWidth={2} />
            <Txt x={X(v)} y={ROW + 70} size={18} color={MANIM.muted}>{String(v)}</Txt>
          </g>
        ))}
        {DATA.map((v, i) => {
          const same = DATA.slice(0, i).filter((w) => w === v).length;
          const lower = i < n / 2;
          const color = beat >= 2 ? (lower ? MANIM.blue : MANIM.orange) : MANIM.blue;
          return <circle key={i} cx={X(v)} cy={ROW + 20 - same * 24} r={10} fill={color} stroke={MANIM.surface} strokeWidth={2} />;
        })}
        <Fade show={beat >= 1}>
          <line x1={X(me)} y1={ROW - 50} x2={X(me)} y2={ROW + 40} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
          <Txt x={X(me)} y={ROW - 92} size={22} color={MANIM.yellow}>{`Me = ${numEs(me)}`}</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X(q1)} y1={ROW - 20} x2={X(q1)} y2={ROW + 40} stroke={MANIM.green} strokeWidth={3} strokeDasharray="8 6" />
          <line x1={X(q3)} y1={ROW - 20} x2={X(q3)} y2={ROW + 40} stroke={MANIM.green} strokeWidth={3} strokeDasharray="8 6" />
          <Txt x={X(q1)} y={ROW - 70} size={22} color={MANIM.green}>{`Q1 = ${numEs(q1)}`}</Txt>
          <Txt x={X(q3)} y={ROW - 70} size={22} color={MANIM.green}>{`Q3 = ${numEs(q3)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={X(min)} y1={BOX_Y + BOX_H / 2} x2={X(q1)} y2={BOX_Y + BOX_H / 2} stroke={MANIM.ink} strokeWidth={4} />
          <line x1={X(q3)} y1={BOX_Y + BOX_H / 2} x2={X(max)} y2={BOX_Y + BOX_H / 2} stroke={MANIM.ink} strokeWidth={4} />
          <line x1={X(min)} y1={BOX_Y + 14} x2={X(min)} y2={BOX_Y + BOX_H - 14} stroke={MANIM.ink} strokeWidth={4} />
          <line x1={X(max)} y1={BOX_Y + 14} x2={X(max)} y2={BOX_Y + BOX_H - 14} stroke={MANIM.ink} strokeWidth={4} />
          <rect x={X(q1)} y={BOX_Y} width={X(q3) - X(q1)} height={BOX_H} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
          <line x1={X(me)} y1={BOX_Y} x2={X(me)} y2={BOX_Y + BOX_H} stroke={MANIM.yellow} strokeWidth={5} />
          <Txt x={X(min)} y={BOX_Y + BOX_H + 30} size={20} color={MANIM.muted}>mín</Txt>
          <Txt x={X(max)} y={BOX_Y + BOX_H + 30} size={20} color={MANIM.muted}>máx</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
