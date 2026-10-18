import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fromScaled, parseDec, scaled, texDec, trimDec } from "@/components/lesson/anim/decimal";

const Y1 = 170;
const Y2 = 300;

/** Divisor decimal: se multiplican dividendo y divisor por 10, 100… hasta que el divisor sea natural (el cociente no cambia). */
export function buildDivisionComaDivisor(params: { terms?: string[] }): AnimBuild {
  const [ta = "7,5", tb = "0,25"] = params.terms ?? [];
  const a = parseDec(ta);
  const b = parseDec(tb);
  const k = Math.max(1, b.frac.length);
  const factor = 10 ** k;
  const A = scaled(ta);
  const B = scaled(tb);
  const newDivisor = String(B);
  const fa = a.frac.length;
  const newDividend = fa >= k ? fromScaled(A, fa - k) : String(A * 10 ** (k - fa));
  const zeroCount = fa >= k ? 0 : k - fa;
  const ratio = Number(ta.replace(",", ".")) / Number(tb.replace(",", "."));
  const quotient = trimDec(ratio.toFixed(4).replace(".", ","));
  const quotientExact = Math.abs(Number(quotient.replace(",", ".")) - ratio) < 1e-9;
  const eq = quotientExact ? "=" : "\\approx";

  // cifras del nuevo dividendo: las del dividendo original y los ceros añadidos
  const originalDigits = newDividend.replace(",", "").length - zeroCount;
  const dividendChars = Array.from(newDividend);
  const colorOf = (i: number) => {
    const digitIndex = dividendChars.slice(0, i).filter((c) => c !== ",").length;
    return dividendChars[i] !== "," && digitIndex >= originalDigits ? MANIM.yellow : MANIM.ink;
  };

  const captions = [
    `Se pide $${texDec(ta)} : ${texDec(tb)}$: el divisor es decimal. Antes de dividir hay que conseguir un divisor **natural**.`,
    `Multiplicar dividendo y divisor por el **mismo** número no cambia el cociente (como $6 : 3 = 60 : 30$). Como $${texDec(tb)}$ tiene ${k} cifra${k > 1 ? "s" : ""} decimal${k > 1 ? "es" : ""}, se multiplican por **${factor}**.`,
    `En cada número, la coma se desplaza **${k} lugar${k > 1 ? "es" : ""} a la derecha**${zeroCount > 0 ? `; a $${texDec(ta)}$ le faltan cifras y se añade${zeroCount > 1 ? "n" : ""} ${zeroCount === 1 ? "un cero" : `${zeroCount} ceros`}` : ""}. Queda $${texDec(newDividend)} : ${newDivisor}$.`,
    `Ahora es una división con divisor natural: $${texDec(newDividend)} : ${newDivisor} ${eq} ${texDec(quotient)}$.`,
    `Comprobación: $${texDec(quotient)} \\cdot ${texDec(tb)} = ${texDec(ta)}$ — el cociente es el mismo que el de la división original.`,
  ];

  return {
    label: `${ta} : ${tb} = ${newDividend} : ${newDivisor} = ${quotient}`,
    captions,
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {/* división original */}
        <g className="anim-t" style={{ opacity: beat >= 2 ? 0.55 : 1 }}>
          <Txt x={280} y={Y1} size={72} color={MANIM.ink} mono>
            {ta}
          </Txt>
          <Txt x={400} y={Y1 - 4} size={60} color={MANIM.muted} mono>
            :
          </Txt>
          <Txt x={520} y={Y1} size={72} color={MANIM.blue} mono>
            {tb}
          </Txt>
        </g>
        {/* × factor */}
        <Fade show={beat === 1 || beat === 2} dy={10}>
          {[280, 520].map((x) => (
            <g key={x}>
              <path d={`M ${x - 56} ${Y1 - 70} Q ${x} ${Y1 - 118} ${x + 56} ${Y1 - 70}`} fill="none" stroke={MANIM.yellow} strokeWidth={4} strokeLinecap="round" />
              <path d={`M ${x + 40} ${Y1 - 82} L ${x + 58} ${Y1 - 68} L ${x + 36} ${Y1 - 60}`} fill="none" stroke={MANIM.yellow} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round" />
              <Txt x={x} y={Y1 - 112} size={30} color={MANIM.yellow}>
                {`× ${factor}`}
              </Txt>
            </g>
          ))}
        </Fade>
        {/* división equivalente */}
        <Fade show={beat >= 2} dy={-14}>
          <g>
            {dividendChars.map((c, i) => (
              <Txt key={i} x={280 - ((dividendChars.length - 1) * 21) + i * 42} y={Y2} size={72} color={colorOf(i)} mono>
                {c}
              </Txt>
            ))}
            <Txt x={400} y={Y2 - 4} size={60} color={MANIM.muted} mono>
              :
            </Txt>
            <Txt x={520} y={Y2} size={72} color={MANIM.blue} mono>
              {newDivisor}
            </Txt>
          </g>
        </Fade>
        <Fade show={beat >= 3} dx={-14}>
          <Txt x={610} y={Y2} size={60} color={MANIM.green} anchor="start" mono>
            {`${eq === "=" ? "=" : "≈"} ${quotient}`}
          </Txt>
        </Fade>
        <Fade show={beat >= 4} dy={10}>
          <rect x={150} y={Y2 + 52} width={500} height={64} rx={14} fill="rgba(131,193,103,0.10)" stroke={MANIM.green} strokeWidth={2.5} />
          <Txt x={400} y={Y2 + 94} size={30} color={MANIM.green}>
            {`${quotient} · ${tb} = ${ta}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
