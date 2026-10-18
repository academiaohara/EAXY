import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const LETTERS = ["a", "a", "b", "c", "c"] as const;
const VALUE = { a: 20, b: 5, c: 1 } as const;
const COLOR = { a: MANIM.yellow, b: MANIM.blue, c: MANIM.green } as const;
const X0 = 200;
const STEP = 100;

/** Monedas en clave: cada letra vale un número; sustituir y sumar da el valor de la expresión. */
export function buildLetrasValores(): AnimBuild {
  const total = LETTERS.reduce((s, l) => s + VALUE[l], 0);
  return {
    label: `Con la clave a = 20, b = 5 y c = 1, la expresión a + a + b + c + c vale ${total}`,
    captions: [
      "La **clave** dice qué número esconde cada letra: $a = 20$, $b = 5$ y $c = 1$ céntimos.",
      "La expresión $a + a + b + c + c$ es una lista de monedas escritas con letras.",
      "Se sustituye cada letra por su valor. La estructura de la suma **no cambia**, solo la letra.",
      `Ahora es una suma de números: $20 + 20 + 5 + 1 + 1 = ${total}$.`,
    ],
    render: (beat) => {
      const subst = beat >= 2;
      return (
        <Canvas>
          {(["a", "b", "c"] as const).map((l, i) => (
            <g key={l}>
              <circle cx={190 + i * 210} cy={70} r={30} fill={COLOR[l]} fillOpacity={0.92} />
              <Txt x={190 + i * 210} y={80} size={28} color={MANIM.surface} weight={800}>
                {l}
              </Txt>
              <Txt x={190 + i * 210 + 48} y={80} size={26} color={MANIM.ink} anchor="start">
                {`= ${VALUE[l]}`}
              </Txt>
            </g>
          ))}
          {LETTERS.map((l, i) => {
            const x = X0 + i * STEP;
            return (
              <g key={`${l}-${i}`}>
                <Fade show={beat >= 1} dy={14} delay={i * 80}>
                  <circle cx={x} cy={240} r={34} fill={COLOR[l]} fillOpacity={subst ? 0.35 : 0.92} className="anim-t" />
                  <Txt x={x} y={252} size={32} color={subst ? MANIM.muted : MANIM.surface} weight={800}>
                    {l}
                  </Txt>
                </Fade>
                <Fade show={subst} dy={-14} delay={i * 80}>
                  <Txt x={x} y={175} size={34} color={COLOR[l]} weight={800}>
                    {String(VALUE[l])}
                  </Txt>
                </Fade>
                {i < LETTERS.length - 1 ? (
                  <Fade show={beat >= 1}>
                    <Txt x={x + STEP / 2} y={252} size={30} color={MANIM.muted}>
                      +
                    </Txt>
                  </Fade>
                ) : null}
              </g>
            );
          })}
          <HBrace show={beat >= 3} x1={X0 - 30} x2={X0 + 4 * STEP + 30} y={290} color={MANIM.yellow} label={`${total} céntimos`} labelSize={30} />
        </Canvas>
      );
    },
  };
}
