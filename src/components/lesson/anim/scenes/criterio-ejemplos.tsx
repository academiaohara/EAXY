import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt } from "@/components/lesson/anim/format";

type Check = {
  /** Índices (de izquierda a derecha) de las cifras que se miran, con su color. */
  marks: Record<number, string>;
  /** Cuenta que se hace con esas cifras. */
  work: string;
  /** Lectura breve de la cuenta. */
  reading: string;
  ok: boolean;
  /** Frase del paso, con LaTeX. */
  caption: string;
};

const sum = (list: number[]) => list.reduce((total, digit) => total + digit, 0);
const indices = (from: number, to: number) => Array.from({ length: to - from }, (_, i) => from + i);

function marksOf(list: number[], color: string): Record<number, string> {
  return Object.fromEntries(list.map((i) => [i, color]));
}

/** Qué se mira en `n` para decidir si es divisible entre `d`, y cómo se lee. */
function checkFor(n: number, d: number): Check {
  const digits = String(n).split("").map(Number);
  const len = digits.length;
  const last = digits[len - 1]!;
  const ok = n % d === 0;
  const verdictWord = ok ? "sí" : "no";
  const head = `**${fmt(n)}**: ${verdictWord} es divisible entre $${d}$.`;

  if (d === 2 || d === 5 || d === 10) {
    const allowed = d === 2 ? "par" : d === 5 ? "0 o 5" : "0";
    return {
      marks: { [len - 1]: MANIM.yellow },
      work: `acaba en ${last}`,
      reading: ok ? `es ${allowed}` : `no es ${allowed}`,
      ok,
      caption: `${fmt(n)} acaba en $${last}$${d === 2 ? `, cifra ${ok ? "par" : "impar"}` : ok ? "" : `, que no es ${d === 5 ? "$0$ ni $5$" : "$0$"}`}. ${head}`,
    };
  }

  if (d === 3 || d === 9) {
    const total = sum(digits);
    return {
      marks: marksOf(indices(0, len), MANIM.yellow),
      work: `${digits.join(" + ")} = ${total}`,
      reading: ok ? `múltiplo de ${d}` : `no es múltiplo de ${d}`,
      ok,
      caption: `$${digits.join(" + ")} = ${total}$, ${ok ? "múltiplo" : "que no es múltiplo"} de $${d}$. ${head}`,
    };
  }

  if (d === 4) {
    const two = n % 100;
    const shown = len > 1 ? String(two).padStart(2, "0") : String(two);
    return {
      marks: marksOf(indices(Math.max(0, len - 2), len), MANIM.yellow),
      work: ok ? `${shown} = 4 · ${two / 4}` : `${shown}`,
      reading: ok ? "múltiplo de 4" : "no es múltiplo de 4",
      ok,
      caption: `Las dos últimas cifras forman $${shown}$, ${ok ? `que es $4 \\cdot ${two / 4}$` : "que no es múltiplo de $4$"}. ${head}`,
    };
  }

  if (d === 6) {
    const total = sum(digits);
    const even = last % 2 === 0;
    const by3 = total % 3 === 0;
    return {
      marks: { ...marksOf(indices(0, len - 1), MANIM.blue), [len - 1]: even ? MANIM.yellow : MANIM.red },
      work: `${last} ${even ? "par" : "impar"} · ${digits.join("+")} = ${total}`,
      reading: `${even ? "2 ✓" : "2 ✗"}  ${by3 ? "3 ✓" : "3 ✗"}`,
      ok,
      caption: `Con el $2$: acaba en $${last}$, ${even ? "par" : "impar"}. Con el $3$: $${digits.join(" + ")} = ${total}$, ${by3 ? "múltiplo de $3$" : "no múltiplo de $3$"}. ${head}`,
    };
  }

  if (d === 12) {
    const total = sum(digits);
    const two = n % 100;
    const shown = len > 1 ? String(two).padStart(2, "0") : String(two);
    const by3 = total % 3 === 0;
    const by4 = two % 4 === 0;
    return {
      marks: {
        ...marksOf(indices(0, Math.max(0, len - 2)), MANIM.blue),
        ...marksOf(indices(Math.max(0, len - 2), len), MANIM.yellow),
      },
      work: `${digits.join("+")} = ${total}  ·  ${shown}`,
      reading: `${by3 ? "3 ✓" : "3 ✗"}  ${by4 ? "4 ✓" : "4 ✗"}`,
      ok,
      caption: `Con el $3$: $${digits.join(" + ")} = ${total}$, ${by3 ? "múltiplo de $3$" : "no múltiplo de $3$"}. Con el $4$: $${shown}$, ${by4 ? "múltiplo de $4$" : "no múltiplo de $4$"}. ${head}`,
    };
  }

  // d === 11: posiciones contadas desde la derecha
  const fromRight = [...digits].reverse();
  const odd = fromRight.filter((_, i) => i % 2 === 0);
  const even = fromRight.filter((_, i) => i % 2 === 1);
  const diff = sum(odd) - sum(even);
  const colors: Record<number, string> = {};
  digits.forEach((_, i) => {
    colors[i] = (len - 1 - i) % 2 === 0 ? MANIM.blue : MANIM.orange;
  });
  const group = (list: number[]) => (list.length > 1 ? `(${list.join("+")})` : `${list[0] ?? 0}`);
  return {
    marks: colors,
    work: `${group(odd)} − ${group(even)} = ${diff}`,
    reading: diff === 0 ? "es 0" : ok ? "múltiplo de 11" : "no es 0 ni múltiplo de 11",
    ok,
    caption: `Impares menos pares: $${group(odd)} - ${group(even)} = ${diff}$, ${diff === 0 ? "que es $0$" : ok ? "múltiplo de $11$" : "que no es $0$ ni múltiplo de $11$"}. ${head}`,
  };
}

const ROW_Y = [118, 232, 346];
const DIGIT_W = 36;

/** Un criterio de divisibilidad aplicado a tres números: se marcan las cifras que cuentan y se lee el resultado. */
export function buildCriterioEjemplos(params: { d?: number; nums?: number[] }): AnimBuild {
  const d = params.d ?? 3;
  const nums = (params.nums ?? [135, 2472, 418]).slice(0, 3);
  const checks = nums.map((n) => checkFor(n, d));

  return {
    label: `Criterio del ${d} aplicado a ${nums.map(fmt).join(", ")}`,
    captions: [
      `¿Cuáles de estos números son divisibles entre $${d}$? Aplicamos el criterio a cada uno.`,
      ...checks.map((c) => c.caption),
    ],
    render: (beat) => (
      <Canvas>
        {nums.map((n, row) => {
          const digits = String(n).split("");
          const check = checks[row]!;
          const active = beat === row + 1;
          const done = beat >= row + 1;
          const y = ROW_Y[row]!;
          return (
            <g key={n}>
              {digits.map((digit, i) => (
                <g key={i} className="anim-t" style={{ opacity: beat === 0 || active || done ? 1 : 0.3 }}>
                  <Txt
                    x={44 + i * DIGIT_W}
                    y={y}
                    size={46}
                    color={done ? (check.marks[i] ?? MANIM.muted) : MANIM.ink}
                    weight={700}
                    mono
                  >
                    {digit}
                  </Txt>
                </g>
              ))}
              <Fade show={done} dx={-8}>
                <Txt x={44 + digits.length * DIGIT_W + 14} y={y - 2} size={26} color={MANIM.ink} anchor="start" mono weight={600}>
                  {check.work}
                </Txt>
                <Txt x={44 + digits.length * DIGIT_W + 14} y={y + 26} size={19} color={MANIM.muted} anchor="start">
                  {check.reading}
                </Txt>
              </Fade>
              <Fade show={done} scale={0.8}>
                <Txt x={752} y={y + 2} size={50} color={check.ok ? MANIM.green : MANIM.red} weight={800}>
                  {check.ok ? "✓" : "✗"}
                </Txt>
              </Fade>
            </g>
          );
        })}
      </Canvas>
    ),
  };
}
