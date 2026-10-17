import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { MINUS, NEG, POS, tex, z } from "@/components/lesson/anim/integers";

const Y_POS = 130;
const Y_NEG = 290;

type Token = { sign: 1 | -1; col: number; beat: number };

/** Fichas +1 y −1: al sumar con distinto signo, las parejas se anulan y sobran las del signo mayor. */
export function buildFichasOpuestos(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 4;
  const b = params.b ?? -9;
  const r = a + b;
  const tokens: Token[] = [];
  const cols = { 1: 0, [-1]: 0 } as Record<number, number>;
  [a, b].forEach((value, beat) => {
    const sign = value >= 0 ? 1 : -1;
    for (let k = 0; k < Math.abs(value); k += 1) {
      tokens.push({ sign, col: cols[sign]!, beat });
      cols[sign] = cols[sign]! + 1;
    }
  });
  const nPos = cols[1]!;
  const nNeg = cols[-1]!;
  const pairs = Math.min(nPos, nNeg);
  const widest = Math.max(nPos, nNeg, 1);
  const gap = Math.min(56, 660 / widest);
  const colX = (c: number) => 400 + (c - (widest - 1) / 2) * gap;
  const rowY = (s: number) => (s === 1 ? Y_POS : Y_NEG);
  const leftoverSign = r >= 0 ? 1 : -1;
  const shiftX = -(pairs / 2) * gap;
  const centerY = (Y_POS + Y_NEG) / 2;
  const colorOf = (s: number) => (s === 1 ? POS : NEG);
  const word = (n: number) => (n >= 0 ? "verdes" : "rojas");
  const expr = `${z(a)} ${b < 0 ? MINUS : "+"} ${Math.abs(b)} = ${z(r)}`;

  return {
    label: `${expr} con fichas positivas y negativas que se anulan por parejas`,
    captions: [
      `Cada ficha verde vale $+1$ y cada roja $-1$. $${tex(a)}$ son **${Math.abs(a)}** fichas ${word(a)}.`,
      `$${b > 0 ? "+" : ""}${tex(b)}$ son **${Math.abs(b)}** fichas ${word(b)}.`,
      `Una verde y una roja **se anulan** ($+1 - 1 = 0$). Hay **${pairs}** parejas.`,
      `Quitadas las parejas, sobran **${Math.abs(r)}** fichas ${word(r)}: $${tex(a)} ${b < 0 ? "-" : "+"} ${Math.abs(b)} = ${tex(r)}$. Se restan los valores absolutos y queda el signo del que tenía más.`,
    ],
    render: (beat) => (
      <Canvas>
        {tokens.map((t, i) => {
          const paired = t.col < pairs;
          const leftover = !paired && t.sign === leftoverSign;
          const x = colX(t.col);
          const y = rowY(t.sign);
          return (
            <Move key={i} x={beat >= 3 && leftover ? shiftX : 0} y={beat >= 3 && leftover ? centerY - y : 0}>
              <Fade show={beat >= t.beat && !(paired && beat >= 3)} dy={t.sign === 1 ? -14 : 14} delay={(t.col % 12) * 40} scale={0.6}>
                <circle cx={x} cy={y} r={Math.min(22, gap * 0.4)} fill={colorOf(t.sign)} fillOpacity={0.92} />
                <Txt x={x} y={y + 9} size={Math.min(26, gap * 0.5)} color={MANIM.surface} weight={800}>{t.sign === 1 ? "+" : MINUS}</Txt>
              </Fade>
            </Move>
          );
        })}
        {/* parejas */}
        {Array.from({ length: pairs }, (_, k) => (
          <Fade key={k} show={beat === 2} delay={k * 120}>
            <line x1={colX(k)} y1={Y_POS + 28} x2={colX(k)} y2={Y_NEG - 28} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="7 6" />
            <circle cx={colX(k)} cy={centerY} r={13} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={colX(k)} y={centerY + 7} size={19} color={MANIM.yellow}>0</Txt>
          </Fade>
        ))}
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={64} size={44} color={MANIM.yellow}>{expr}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
