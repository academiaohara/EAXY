import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frac } from "@/components/lesson/anim/fraction";
import type { AnimBuild } from "@/components/lesson/anim/types";

const BX = 190;
const BW = 560;
const BH = 54;
const YS = [70, 175, 280];

/**
 * Fracciones equivalentes: una barra partida en `b` trozos con `a` coloreados se vuelve a partir
 * (`c` veces más trozos, y luego el doble). La porción coloreada no cambia de tamaño.
 */
export function buildFraccionEquivalente(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const n0 = params.a ?? 1;
  const d0 = params.b ?? 2;
  const k1 = Math.max(2, Math.min(4, params.c ?? 3));
  const k2 = k1 === 2 ? 3 : 2;
  const rows = [
    { n: n0, d: d0 },
    { n: n0 * k1, d: d0 * k1 },
    { n: n0 * k1 * k2, d: d0 * k1 * k2 },
  ];
  const edge = BX + (BW * n0) / d0;

  return {
    label: `La fracción ${n0}/${d0} y sus equivalentes ${rows[1]!.n}/${rows[1]!.d} y ${rows[2]!.n}/${rows[2]!.d} colorean la misma porción`,
    captions: [
      `Una barra partida en **${d0}** trozos iguales, con **${n0}** coloreados: $\\frac{${n0}}{${d0}}$.`,
      `Se parte **cada trozo en ${k1}**: hay ${k1} veces más trozos (${rows[1]!.d}) y ${k1} veces más coloreados (${rows[1]!.n}). La parte coloreada **no ha cambiado**: $\\frac{${n0}}{${d0}} = \\frac{${n0} \\cdot ${k1}}{${d0} \\cdot ${k1}} = \\frac{${rows[1]!.n}}{${rows[1]!.d}}$.`,
      `Otra vez, ahora **en ${k2}**: $\\frac{${rows[1]!.n}}{${rows[1]!.d}} = \\frac{${rows[1]!.n} \\cdot ${k2}}{${rows[1]!.d} \\cdot ${k2}} = \\frac{${rows[2]!.n}}{${rows[2]!.d}}$.`,
      `Las tres fracciones son **equivalentes**: ocupan lo mismo de la barra. Multiplicar numerador y denominador por el mismo número no cambia el valor.`,
    ],
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        {rows.map((r, row) => {
          const y = YS[row]!;
          const cell = BW / r.d;
          const shown = beat >= row;
          return (
            <Fade key={row} show={shown} dy={12}>
              <rect x={BX} y={y} width={BW} height={BH} rx={6} fill={MANIM.panel} />
              <rect x={BX} y={y} width={(BW * r.n) / r.d} height={BH} fill={[MANIM.blue, MANIM.green, MANIM.purple][row]} fillOpacity={0.85} />
              {Array.from({ length: r.d + 1 }, (_, i) => (
                <line key={i} x1={BX + i * cell} y1={y} x2={BX + i * cell} y2={y + BH} stroke={MANIM.yellow} strokeWidth={i === 0 || i === r.d ? 3 : 1.5} />
              ))}
              <Frac x={95} y={y + 22} n={r.n} d={r.d} size={34} color={MANIM.ink} />
            </Fade>
          );
        })}
        <Fade show={beat >= 1 && beat < 3} dy={-8}>
          <Txt x={BX + BW / 2} y={(beat >= 2 ? YS[1]! : YS[0]!) + BH + 37} size={26} color={MANIM.yellow}>
            {beat >= 2 ? `× ${k2} arriba y abajo` : `× ${k1} arriba y abajo`}
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={edge} y1={YS[0]! - 14} x2={edge} y2={YS[2]! + BH + 14} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 7" />
          <Txt x={BX + BW / 2} y={YS[2]! + BH + 62} size={28} color={MANIM.yellow}>
            {`${n0}/${d0} = ${rows[1]!.n}/${rows[1]!.d} = ${rows[2]!.n}/${rows[2]!.d}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
