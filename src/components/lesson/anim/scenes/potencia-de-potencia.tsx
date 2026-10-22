import { Canvas, Fade, HBrace, Txt, VBrace } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";

const STEP = 56;
const ROW = 62;
const R = 20;

/** (aᵐ)ⁿ: n grupos de m factores = m·n factores. */
export function buildPotenciaDePotencia(params: { a?: number; b?: number }): AnimBuild {
  const m = Math.min(Math.max(Math.round(params.a ?? 3), 2), 4);
  const n = Math.min(Math.max(Math.round(params.b ?? 2), 2), 4);
  const total = m * n;
  const x0 = 250;
  const y0 = 120;

  return {
    label: `Potencia de una potencia: (a^${m})^${n} = a^${total}`,
    captions: [
      `$(a^{${m}})^{${n}}$ significa multiplicar $a^{${m}}$ por sí misma ${n} veces.`,
      `Cada $a^{${m}}$ son ${m} factores $a$. Hay ${n} grupos iguales.`,
      `En total hay ${n} grupos de ${m} factores: $${n} \\cdot ${m} = ${total}$ factores $a$.`,
      `$(a^{${m}})^{${n}} = a^{${m} \\cdot ${n}} = a^{${total}}$. **Se multiplican los exponentes.**`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Txt x={400} y={200} size={64} color={MANIM.yellow}>{`(a${sup(m)})${sup(n)}`}</Txt>
        </Fade>
        {Array.from({ length: n }, (_, r) => (
          <Fade key={r} show={beat >= 1} dy={16} delay={r * 160}>
            <Txt x={150} y={y0 + r * ROW + 8} size={30} color={MANIM.blue}>{`a${sup(m)}`}</Txt>
            {Array.from({ length: m }, (_, c) => (
              <g key={c}>
                <circle cx={x0 + c * STEP} cy={y0 + r * ROW} r={R} fill={MANIM.panel} stroke={beat >= 3 ? MANIM.orange : MANIM.blue} strokeWidth={3} className="anim-t" />
                <Txt x={x0 + c * STEP} y={y0 + r * ROW + 8} size={22} color={beat >= 3 ? MANIM.orange : MANIM.blue}>a</Txt>
              </g>
            ))}
          </Fade>
        ))}
        <HBrace show={beat === 1} x1={x0 - R} x2={x0 + (m - 1) * STEP + R} y={y0 - 36} dir="up" color={MANIM.blue} label={`${m} factores`} />
        <VBrace show={beat >= 2} x={x0 + (m - 1) * STEP + R + 28} y1={y0 - R} y2={y0 + (n - 1) * ROW + R} dir="right" color={MANIM.yellow} label={`${n} grupos`} labelSize={24} />
        <Fade show={beat >= 2} dy={10}>
          <Txt x={400} y={y0 + (n - 1) * ROW + 74} size={32} color={MANIM.yellow}>{`${n} · ${m} = ${total} factores`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={10}>
          <Txt x={400} y={y0 + (n - 1) * ROW + 126} size={40} color={MANIM.orange}>{`(a${sup(m)})${sup(n)} = a${sup(total)}`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
