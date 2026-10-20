import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs } from "@/components/lesson/anim/prop";

const CARD_W = 104;
const GAP = 52;
const Y = 120;
const CARD_H = 70;

/** Progresión aritmética (+d) o geométrica (·r): de a₁ a aₙ se dan n − 1 pasos iguales. */
export function buildProgresionPasos(params: { a?: number; b?: number; c?: number; d?: number; prog?: "aritmetica" | "geometrica" }): AnimBuild {
  const geo = params.prog === "geometrica";
  const a1 = params.a ?? (geo ? 3 : 2);
  const step = params.b ?? (geo ? 2 : 3);
  const count = Math.min(Math.max(params.c ?? 5, 3), 5);
  const target = params.d ?? 100;
  const term = (k: number) => (geo ? a1 * step ** k : a1 + k * step);
  const values = Array.from({ length: count }, (_, k) => term(k));
  const total = count * CARD_W + (count - 1) * GAP;
  const x0 = (800 - total) / 2;
  const cx = (k: number) => x0 + k * (CARD_W + GAP) + CARD_W / 2;
  const sym = geo ? "r" : "d";
  const stepTxt = geo ? `· ${numEs(step)}` : `${step >= 0 ? "+" : "−"} ${numEs(Math.abs(step))}`;
  const last = term(target - 1);
  const lastTxt = Number.isFinite(last) && Math.abs(last) < 1e12 ? numEs(last) : `${a1} · ${numEs(step)}^${target - 1}`;

  return {
    label: geo ? `Progresión geométrica: se multiplica siempre por ${step}` : `Progresión aritmética: se suma siempre ${step}`,
    captions: [
      `El primer término es $a_1 = ${numEs(a1)}$ y ${geo ? "la **razón**" : "la **diferencia**"} es $${sym} = ${numEs(step)}$.`,
      geo ? `Cada término se obtiene **multiplicando** el anterior por $${numEs(step)}$.` : `Cada término se obtiene **sumando** ${numEs(step)} al anterior.`,
      `Para pasar de $a_1$ a $a_n$ hay que dar **$n-1$ pasos** iguales (aquí, hasta $a_{${count}}$ son ${count - 1}).`,
      geo
        ? `$a_n = a_1 \\cdot r^{\\,n-1}$. Por ejemplo, $a_{${target}} = ${numEs(a1)} \\cdot ${numEs(step)}^{${target - 1}}$.`
        : `$a_n = a_1 + (n-1) \\cdot d$. Por ejemplo, $a_{${target}} = ${numEs(a1)} + ${target - 1} \\cdot ${numEs(step)} = ${lastTxt}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {values.map((v, k) => (
          <g key={k}>
            <Fade show={k === 0 || beat >= 1} dy={8} delay={k * 150}>
              <rect x={cx(k) - CARD_W / 2} y={Y} width={CARD_W} height={CARD_H} rx={12} fill={MANIM.panel} stroke={k === 0 ? MANIM.yellow : MANIM.blue} strokeWidth={3} />
              <Txt x={cx(k)} y={Y + 44} size={30} color={MANIM.ink}>{numEs(v)}</Txt>
              <Txt x={cx(k)} y={Y - 14} size={22} color={MANIM.muted}>{`a${["₁", "₂", "₃", "₄", "₅"][k]}`}</Txt>
            </Fade>
          </g>
        ))}
        {values.slice(1).map((_, k) => (
          <Fade key={`s${k}`} show={beat >= 1} dy={-6} delay={k * 150 + 100}>
            <path d={`M ${cx(k) + CARD_W / 2 + 6} ${Y + CARD_H / 2} L ${cx(k + 1) - CARD_W / 2 - 6} ${Y + CARD_H / 2}`} stroke={geo ? MANIM.orange : MANIM.green} strokeWidth={3} />
            <Txt x={(cx(k) + cx(k + 1)) / 2} y={Y + CARD_H / 2 - 12} size={22} color={geo ? MANIM.orange : MANIM.green}>{stepTxt}</Txt>
          </Fade>
        ))}
        <Fade show={beat >= 2} dy={-6}>
          <HBrace show x1={cx(0)} x2={cx(count - 1)} y={Y + CARD_H + 30} color={MANIM.yellow} label={`${count - 1} pasos (n − 1)`} labelSize={24} />
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <text x={400} y={350} fontSize={34} fill={MANIM.ink} fontWeight={600} textAnchor="middle" style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
            {geo ? `aₙ = a₁ · r^(n−1) = ${numEs(a1)} · ${numEs(step)}^(n−1)` : `aₙ = a₁ + (n−1)·d = ${numEs(a1)} + (n−1)·${numEs(step)}`}
          </text>
        </Fade>
      </Canvas>
    ),
  };
}
