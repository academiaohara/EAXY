import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Comprobar en la ecuación original `7x − 2x + 4 = 8 + 3x + 2`: con x = 3 coinciden, con x = 2 no. */
export function buildComprobarSolucion(): AnimBuild {
  return {
    label: "Comprobación de 7x − 2x + 4 = 8 + 3x + 2: con x = 3 los dos miembros valen 19; con x = 2 no coinciden",
    captions: [
      "Hemos resuelto y obtenemos $x = 3$. Para comprobarlo usamos la ecuación **original**.",
      "Sustituimos la $x$ por $3$ en **cada miembro**, por separado.",
      "Primer miembro: $7 \\cdot 3 - 2 \\cdot 3 + 4 = 21 - 6 + 4 = 19$. Segundo: $8 + 3 \\cdot 3 + 2 = 8 + 9 + 2 = 19$.",
      "Los dos miembros valen **19**: la igualdad se cumple y $x = 3$ es solución.",
      "Un valor equivocado se delata: con $x = 2$ salen $14$ y $16$. No coinciden, así que $x = 2$ **no** es solución.",
    ],
    render: (beat) => {
      const x = beat >= 4 ? "2" : "3";
      const sub = beat >= 1;
      const calc = beat >= 2;
      const wrong = beat >= 4;
      const lv = wrong ? 14 : 19;
      const rv = wrong ? 16 : 19;
      const ok = lv === rv;
      return (
        <Canvas>
          <Txt x={400} y={70} size={38} color={MANIM.ink} weight={800}>
            <tspan fill={MANIM.yellow}>7x − 2x + 4</tspan>
            <tspan fill={MANIM.ink}> = </tspan>
            <tspan fill={MANIM.blue}>8 + 3x + 2</tspan>
          </Txt>
          <Fade show={sub} dy={-10}>
            <Txt x={400} y={145} size={34} color={MANIM.muted}>
              {`x = ${x}`}
            </Txt>
          </Fade>
          <Fade show={sub && !wrong} dy={10}>
            <Txt x={210} y={215} size={28} color={MANIM.yellow}>
              7·3 − 2·3 + 4
            </Txt>
            <Txt x={590} y={215} size={28} color={MANIM.blue}>
              8 + 3·3 + 2
            </Txt>
          </Fade>
          <Fade show={wrong} dy={10}>
            <Txt x={210} y={215} size={28} color={MANIM.yellow}>
              7·2 − 2·2 + 4
            </Txt>
            <Txt x={590} y={215} size={28} color={MANIM.blue}>
              8 + 3·2 + 2
            </Txt>
          </Fade>
          <Fade show={calc} dy={10}>
            <rect x={120} y={245} width={180} height={64} rx={14} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={210} y={290} size={40} color={MANIM.yellow} weight={800}>
              {String(lv)}
            </Txt>
            <rect x={500} y={245} width={180} height={64} rx={14} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3} />
            <Txt x={590} y={290} size={40} color={MANIM.blue} weight={800}>
              {String(rv)}
            </Txt>
            <Txt x={400} y={290} size={48} color={beat >= 3 ? (ok ? MANIM.green : MANIM.red) : MANIM.muted} weight={800}>
              {beat >= 3 ? (ok ? "=" : "≠") : "?"}
            </Txt>
          </Fade>
          <Fade show={beat >= 3} dy={8}>
            <Txt x={400} y={370} size={32} color={ok ? MANIM.green : MANIM.red} weight={800}>
              {ok ? "✓ x = 3 es solución" : "✗ x = 2 no es solución"}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
