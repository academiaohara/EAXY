import { Canvas, Fade, Txt, WriteLine } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { parseDec, texDec } from "@/components/lesson/anim/decimal";

const CW = 40;
const COMMA_W = 20;
const X_START = 60;
const Y_DIV = 100;
const Y_ROW0 = 168;
const ROW_STEP = 52;

type Stage = { q: number; rem: number; cur: number; digit: number; appended: boolean };

/** División con divisor natural: el cociente entero y, mientras haya resto, cifras decimales bajando ceros. */
export function buildDivisionDecimal(params: { terms?: string[]; places?: number }): AnimBuild {
  const [tdividend = "35", tdivisor = "4"] = params.terms ?? [];
  const places = Math.max(1, Math.min(3, params.places ?? 2));
  const dd = parseDec(tdividend);
  const divisor = Number(tdivisor);
  const intNum = Number(dd.int);
  const qInt = Math.floor(intNum / divisor);
  const r0 = intNum % divisor;

  const maxStages = Math.max(places, dd.frac.length);
  const stages: Stage[] = [];
  let rem = r0;
  for (let j = 0; j < maxStages; j += 1) {
    const appended = j >= dd.frac.length;
    const digit = appended ? 0 : Number(dd.frac[j]);
    const cur = rem * 10 + digit;
    const q = Math.floor(cur / divisor);
    rem = cur % divisor;
    stages.push({ q, rem, cur, digit, appended });
    // todas las cifras del dividendo consumidas y resto 0: división exacta
    if (rem === 0 && j >= dd.frac.length - 1) {
      break;
    }
  }
  // Si el dividendo ya es exacto sin decimales (p. ej. 8 : 2), no hay etapas decimales.
  const needsDecimals = r0 !== 0 || dd.frac.length > 0;
  const used = needsDecimals ? stages : [];
  const finalRem = used.length ? used[used.length - 1]!.rem : r0;
  const exact = finalRem === 0;
  const repeated = !exact && used.length >= 2 && used.at(-1)!.rem === used.at(-2)!.rem;

  // posiciones de las cifras del dividendo (con la coma ocupando un hueco más estrecho)
  const intChars = dd.int.split("");
  const decCells = used.length;
  const digitX: number[] = [];
  let x = X_START;
  intChars.forEach(() => {
    digitX.push(x + CW / 2);
    x += CW;
  });
  const commaX = x + COMMA_W / 2;
  x += COMMA_W;
  for (let j = 0; j < decCells; j += 1) {
    digitX.push(x + CW / 2);
    x += CW;
  }
  const barX = x + 16;
  const divX = barX + 22;
  const qStr = used.map((s) => s.q);
  const qX0 = divX;
  const qIntChars = String(qInt).split("");
  const qIntX = (i: number) => qX0 + i * CW + CW / 2;
  const qCommaX = qX0 + qIntChars.length * CW + COMMA_W / 2;
  const qDecX = (j: number) => qX0 + qIntChars.length * CW + COMMA_W + j * CW + CW / 2;
  const qEnd = qDecX(Math.max(decCells - 1, 0)) + CW / 2 + 40;

  const sInt = intChars.length;
  const cellOfDecimal = (j: number) => sInt + j;
  const rowY = (k: number) => Y_ROW0 + k * ROW_STEP;

  const orderName = (j: number) => ["décimas", "centésimas", "milésimas"][j] ?? "";
  const nameSingleInt = `$${intNum} : ${divisor}$`;

  const captions: string[] = [
    `Hay que repartir $${texDec(tdividend)}$ entre $${divisor}$. Se empieza por la **parte entera**.`,
    needsDecimals
      ? `${nameSingleInt}: cociente $${qInt}$ y **resto $${r0}$**. Como queda resto, se sigue: se pone la **coma** y se baja una cifra decimal (aquí ${dd.frac.length > 0 ? "la del dividendo" : "un **0**"}).`
      : `${nameSingleInt}: cociente $${qInt}$ y resto $0$. La división es **exacta**.`,
    ...used.map((s, j) => {
      const prevRem = j === 0 ? r0 : used[j - 1]!.rem;
      const verb = s.appended ? `Se añade un **0**` : `Se baja la cifra de las ${orderName(j)}`;
      const tail = s.rem === 0 ? "**resto $0$**" : `resto $${s.rem}$`;
      return `${verb}: $${prevRem * 10 + s.digit}$ ${orderName(j)}. $${prevRem * 10 + s.digit} : ${divisor} = ${s.q}$, ${tail}.`;
    }),
    exact
      ? `El resto es $0$: la división es **exacta**. $${texDec(tdividend)} : ${divisor} = ${qInt}${used.length ? "{,}" : ""}${qStr.join("")}$.`
      : repeated
        ? `El resto vuelve a ser **$${finalRem}$**: si se siguiera, las cifras se repetirían sin fin (cociente **periódico**). Se corta en ${places} decimales y se redondea.`
        : `Quedan restos: se corta en ${places} cifras decimales y se redondea.`,
  ];
  const lastBeat = captions.length - 1;
  const quotientText = `${qInt}${used.length ? "," : ""}${qStr.join("")}`;

  return {
    label: `${tdividend} : ${tdivisor} = ${quotientText}${exact ? "" : "…"}`,
    captions,
    beatMs: 3800,
    render: (beat) => {
      const stageShown = (k: number) => beat >= k + 1; // k = 0 (parte entera) … used.length
      return (
        <Canvas>
          {/* dividendo */}
          {intChars.map((c, i) => (
            <Txt key={`di${i}`} x={digitX[i]!} y={Y_DIV} size={44} color={MANIM.ink} mono>
              {c}
            </Txt>
          ))}
          {used.length ? (
            dd.frac.length > 0 ? (
              <Txt x={commaX} y={Y_DIV + 6} size={44} color={MANIM.yellow} mono>
                ,
              </Txt>
            ) : (
              <Fade show={beat >= 1} dx={-8}>
                <Txt x={commaX} y={Y_DIV + 6} size={44} color={MANIM.yellow} mono>
                  ,
                </Txt>
              </Fade>
            )
          ) : null}
          {used.map((s, j) => {
            const visible = !s.appended || beat >= j + 1;
            return (
              <Fade key={`dd${j}`} show={visible} dx={-8}>
                <Txt x={digitX[cellOfDecimal(j)]!} y={Y_DIV} size={44} color={s.appended ? MANIM.yellow : MANIM.ink} mono>
                  {String(s.digit)}
                </Txt>
              </Fade>
            );
          })}
          {/* caja de la división */}
          <WriteLine show x1={barX} y1={Y_DIV - 36} x2={barX} y2={Y_DIV + 14} color={MANIM.muted} width={3} />
          <WriteLine show x1={barX} y1={Y_DIV + 14} x2={qEnd} y2={Y_DIV + 14} color={MANIM.muted} width={3} />
          <Txt x={divX + 8} y={Y_DIV} size={44} color={MANIM.blue} mono anchor="start">
            {tdivisor}
          </Txt>

          {/* cociente */}
          <Fade show={stageShown(0)} dy={10}>
            {qIntChars.map((c, i) => (
              <Txt key={`qi${i}`} x={qIntX(i)} y={Y_DIV + 66} size={44} color={MANIM.green} mono>
                {c}
              </Txt>
            ))}
          </Fade>
          {used.length ? (
            <Fade show={beat >= 2} dy={10}>
              <Txt x={qCommaX} y={Y_DIV + 72} size={44} color={MANIM.yellow} mono>
                ,
              </Txt>
            </Fade>
          ) : null}
          {used.map((s, j) => (
            <Fade key={`q${j}`} show={beat >= j + 2} dy={10}>
              <Txt x={qDecX(j)} y={Y_DIV + 66} size={44} color={MANIM.green} mono>
                {String(s.q)}
              </Txt>
            </Fade>
          ))}
          <Fade show={beat === lastBeat && !exact} dx={-6}>
            <Txt x={qDecX(decCells - 1) + CW / 2 + 6} y={Y_DIV + 66} size={44} color={MANIM.yellow} mono anchor="start">
              …
            </Txt>
          </Fade>

          {/* restos: cada fila es el resto con la cifra que se baja */}
          {[{ rem: r0, next: used[0] }, ...used.map((s, j) => ({ rem: s.rem, next: used[j + 1] }))].map((row, k) => {
            if (k > used.length) return null;
            const nextCell = row.next ? cellOfDecimal(k) : k === 0 ? sInt - 1 : cellOfDecimal(k - 1);
            const remStr = String(row.rem);
            const str = row.next ? `${remStr}${row.next.digit}` : remStr;
            const highlightRepeat = repeated && beat === lastBeat && k >= used.length - 1 && row.rem === finalRem;
            return (
              <Fade key={`r${k}`} show={stageShown(k)} dy={-6}>
                {str.split("").map((ch, i) => {
                  const cell = nextCell - (str.length - 1 - i);
                  const isBrought = row.next && i === str.length - 1;
                  return (
                    <Txt key={i} x={digitX[Math.max(cell, 0)]!} y={rowY(k)} size={40} color={isBrought ? MANIM.yellow : MANIM.muted} mono>
                      {ch}
                    </Txt>
                  );
                })}
                {highlightRepeat ? (
                  <circle cx={digitX[Math.max(nextCell - (str.length - 1), 0)]! + 0} cy={rowY(k) - 14} r={26} fill="none" stroke={MANIM.orange} strokeWidth={3} />
                ) : null}
              </Fade>
            );
          })}
          <Fade show={beat === lastBeat} dy={10}>
            <Txt x={divX} y={Y_DIV + 150} size={34} color={MANIM.yellow} anchor="start">
              {exact ? `${tdividend} : ${tdivisor} = ${quotientText}` : `${tdividend} : ${tdivisor} ≈ ${quotientText}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
