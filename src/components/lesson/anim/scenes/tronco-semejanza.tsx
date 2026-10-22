import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { coneFrustumVolume, frustumExtra } from "@/components/lesson/anim/sem";
import { fmtEs } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Tronco de cono: se completa hasta el cono y la semejanza de los dos triángulos da `x`. `nums = [R, r, h]`. */
export function buildTroncoSemejanza(params: { nums?: number[] }): AnimBuild {
  const [R, r, h] = [params.nums?.[0] ?? 20, params.nums?.[1] ?? 8, params.nums?.[2] ?? 9];
  const x = frustumExtra(R, r, h);
  const V = coneFrustumVolume(R, r, h);
  const H = h + x;
  const scale = Math.min(300 / H, 200 / R);
  const cx = 340;
  const base = 370;
  const apex = base - H * scale;
  const topY = base - h * scale;
  const bw = R * scale;
  const tw = r * scale;
  const f = (n: number) => fmtEs(Math.round(n * 100) / 100, 2);

  return {
    label: `Tronco de cono: R = ${R}, r = ${r}, h = ${h}; x = ${f(x)}; volumen ${f(V)}`,
    captions: [
      `Un **tronco de cono** de altura $${h}$ y radios $${R}$ y $${r}$.`,
      `Lo **completamos** hasta el cono entero: llamamos $x$ a la altura que falta.`,
      `Los triángulos rectángulos, pequeño (catetos $${r}$ y $x$) y grande (catetos $${R}$ y $x + ${h}$), son **semejantes**: $\\dfrac{${r}}{${R}} = \\dfrac{x}{x + ${h}}$.`,
      `Resolviendo: $x = ${f(x)}$. El volumen del tronco es la **diferencia de dos conos**: $V = \\frac{1}{3}\\pi\\cdot${R}^2\\cdot${f(H)} - \\frac{1}{3}\\pi\\cdot${r}^2\\cdot${f(x)} \\approx ${f(V)}$.`,
    ],
    beatMs: 4800,
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 1}>
          <polygon points={`${cx},${apex} ${cx - tw},${topY} ${cx + tw},${topY}`} fill="none" stroke={MANIM.orange} strokeWidth={4} strokeDasharray="10 7" />
          <line x1={cx + bw + 30} y1={apex} x2={cx + bw + 30} y2={topY} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={cx + bw + 44} y={(apex + topY) / 2 + 6} size={24} color={MANIM.orange} anchor="start">x</Txt>
        </Fade>
        <polygon points={`${cx - tw},${topY} ${cx + tw},${topY} ${cx + bw},${base} ${cx - bw},${base}`} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={5} strokeLinejoin="round" />
        <line x1={cx - bw - 30} y1={topY} x2={cx - bw - 30} y2={base} stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={cx - bw - 44} y={(topY + base) / 2 + 6} size={24} color={MANIM.blue} anchor="end">{`h = ${h}`}</Txt>
        <Txt x={cx + bw / 2} y={base + 28} size={22} color={MANIM.muted}>{`R = ${R}`}</Txt>
        <Txt x={cx + tw / 2 + 6} y={topY - 10} size={22} color={MANIM.muted}>{`r = ${r}`}</Txt>
        <Fade show={beat >= 2}>
          <line x1={cx} y1={apex} x2={cx} y2={base} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
          <Txt x={640} y={110} size={28} color={MANIM.ink}>{`${r}/${R} = x/(x+${h})`}</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={640} y={170} size={28} color={MANIM.green}>{`x = ${f(x)}`}</Txt>
          <Txt x={640} y={230} size={26} color={MANIM.yellow}>{`V ≈ ${f(V)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
