import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd } from "@/components/lesson/anim/radicals";
import { sup } from "@/components/lesson/anim/scenes/potencias-factores";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Forma exponencial de un radical: ⁿ√(aᵐ) = a^(m/n), porque (a^(m/n))ⁿ = aᵐ. */
export function buildRadicalPotencia(params: { a?: number; b?: number }): AnimBuild {
  const n = Math.min(Math.max(Math.round(params.a ?? 3), 2), 9);
  const m = Math.min(Math.max(Math.round(params.b ?? 2), 1), 9);
  const g = gcd(m, n);
  const sn = n / g;
  const sm = m / g;
  const radical = `${n === 2 ? "" : sup(n)}√(a${sup(m)})`;

  return {
    label: `Forma exponencial: ${radical} = a^(${m}/${n})`,
    captions: [
      `Queremos escribir $\\sqrt[${n}]{a^{${m}}}$ como una potencia.`,
      `Probamos con el exponente fraccionario $a^{${m}/${n}}$. ¿Es de verdad la raíz? Hay que comprobar que **elevada a $${n}$ da el radicando**.`,
      `$\\left(a^{${m}/${n}}\\right)^{${n}} = a^{\\frac{${m}}{${n}} \\cdot ${n}} = a^{${m}}$. Funciona: es la raíz $${n}$-ésima de $a^{${m}}$.`,
      `$\\sqrt[${n}]{a^{${m}}} = a^{${m}/${n}}$: arriba el **exponente**, abajo el **índice**.`,
      g > 1
        ? `La fracción se simplifica: $a^{${m}/${n}} = a^{${sm}${sn === 1 ? "" : `/${sn}`}}$.`
        : `$\\frac{${m}}{${n}}$ es irreducible: no se simplifica más.`,
    ],
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={80} size={54} color={MANIM.blue}>{radical}</Txt>
        <Fade show={beat >= 1} dy={14}>
          <Txt x={400} y={160} size={44} color={MANIM.yellow}>{`= a^(${m}/${n})  ?`}</Txt>
        </Fade>
        <Fade show={beat >= 2} dy={14}>
          <Txt x={400} y={238} size={36} color={MANIM.green}>{`(a^(${m}/${n}))${sup(n)} = a${sup(m)}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={14}>
          <rect x={150} y={270} width={500} height={64} rx={14} fill={MANIM.orange} fillOpacity={0.12} stroke={MANIM.orange} strokeWidth={2.5} />
          <Txt x={400} y={314} size={36} color={MANIM.orange}>{`${radical} = a^(${m}/${n})`}</Txt>
        </Fade>
        <Fade show={beat >= 4} dy={14}>
          <Txt x={400} y={382} size={30} color={MANIM.muted}>{g > 1 ? `${m}/${n} = ${sm}${sn === 1 ? "" : `/${sn}`}` : "fracción irreducible"}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
