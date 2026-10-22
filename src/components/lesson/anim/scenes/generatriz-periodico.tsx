import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { generatrix, shiftedPeriodic } from "@/components/lesson/anim/periodic";
import type { AnimBuild } from "@/components/lesson/anim/types";

const digitsOnly = (s: string | undefined, max: number) => (s ?? "").replace(/\D/g, "").slice(0, max);

/**
 * Fracción generatriz de un decimal periódico. El número es `int , ante periodo…`
 * (`dec` = parte entera y no periódica con coma, `per` = cifras del periodo).
 */
export function buildGeneratrizPeriodico(params: { dec?: string; per?: string }): AnimBuild {
  const [intRaw = "3", anteRaw = ""] = (params.dec ?? "3").replace(".", ",").split(",");
  const int = digitsOnly(intRaw, 4) || "0";
  const ante = digitsOnly(anteRaw, 2);
  const per = digitsOnly(params.per ?? "84", 3) || "9";
  const a = ante.length;
  const p = per.length;
  const k1 = a;
  const k2 = a + p;
  const N = shiftedPeriodic(int, ante, per, 0);
  const A = shiftedPeriodic(int, ante, per, k1);
  const B = shiftedPeriodic(int, ante, per, k2);
  const tailA = Number(`${int}${ante}`);
  const tailB = Number(`${int}${ante}${per}`);
  const diff = tailB - tailA;
  const den = (10 ** p - 1) * 10 ** a;
  const g = generatrix(int, ante, per);
  const mult = (k: number) => (k === 0 ? "N" : `${10 ** k}N`);
  const num = (s: string) => s.replace(",", "{,}").replace("…", "\\ldots");
  const needsA = a > 0;

  return {
    label: `Fracción generatriz de ${N}: ${g.n}/${g.d}`,
    captions: [
      `Queremos la fracción de $N = ${num(N)}$ (el periodo es $${per}$).`,
      needsA
        ? `Primero multiplicamos por $${10 ** k1}$ para que el periodo empiece justo tras la coma: $${mult(k1)} = ${num(A)}$.`
        : `El periodo ya empieza justo tras la coma: no hace falta desplazar nada antes.`,
      `Multiplicamos por $${10 ** k2}$ para llevar **un periodo completo** a la parte entera: $${mult(k2)} = ${num(B)}$.`,
      `Restamos: las dos colas decimales son **idénticas** y se cancelan. $${mult(k2)} - ${mult(k1)} = ${tailB} - ${tailA} = ${diff}$.`,
      `Queda $${den}\\,N = ${diff}$, así que $N = \\dfrac{${diff}}{${den}}${g.n === diff && g.d === den ? "" : ` = \\dfrac{${g.n}}{${g.d}}`}$.`,
    ],
    beatMs: 4000,
    render: (beat) => {
      const Y = (i: number) => 62 + i * 58;
      const iB = needsA ? 2 : 1;
      const iSub = iB + 1;
      const rows = [
        { show: beat >= 0, text: `${mult(0)} = ${N}`, color: MANIM.blue, y: Y(0) },
        { show: beat >= 1 && needsA, text: `${mult(k1)} = ${A}`, color: MANIM.yellow, y: Y(1) },
        { show: beat >= 2, text: `${mult(k2)} = ${B}`, color: MANIM.green, y: Y(iB) },
      ];
      const simplified = g.n === diff && g.d === den ? "" : ` = ${g.n}/${g.d}`;
      return (
        <Canvas>
          {rows.map((r, i) => (
            <Fade key={i} show={r.show} dy={12}>
              <Txt x={80} y={r.y} size={34} color={r.color} anchor="start">{r.text}</Txt>
            </Fade>
          ))}
          <Fade show={beat >= 3} dy={12}>
            <line x1={80} y1={Y(iSub) - 40} x2={720} y2={Y(iSub) - 40} stroke={MANIM.ink} strokeWidth={3} />
            <Txt x={80} y={Y(iSub)} size={34} color={MANIM.orange} anchor="start">{`${mult(k2)} − ${mult(k1)} = ${tailB} − ${tailA} = ${diff}`}</Txt>
          </Fade>
          <Fade show={beat >= 4} dy={12}>
            <Txt x={80} y={Y(iSub + 1)} size={36} color={MANIM.ink} anchor="start">{`${den}N = ${diff}`}</Txt>
            <Txt x={80} y={Y(iSub + 2)} size={40} color={MANIM.ink} anchor="start">{`N = ${diff}/${den}${simplified}`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
