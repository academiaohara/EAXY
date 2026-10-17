import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { ORDER_ABBR, ORDER_PLURAL, ORDER_SINGULAR, parseDec, readDec, texDec, words } from "@/components/lesson/anim/decimal";

const INT_ABBR = ["UM", "C", "D", "U"];
const GAP = 34;
const Y_HEAD = 120;
const Y_DIGIT = 205;

/** La tabla de órdenes y la lectura de un decimal: parte entera + parte decimal con el nombre de la última cifra. */
export function buildTablaDecimal(params: { dec?: string }): AnimBuild {
  const dec = params.dec ?? "13,0574";
  const d = parseDec(dec);
  const intLen = Math.min(4, Math.max(2, d.int.length));
  const fracLen = Math.min(6, Math.max(3, d.frac.length));
  const cols = intLen + fracLen;
  const colW = Math.min(86, 700 / cols);
  const total = cols * colW + GAP;
  const x0 = (800 - total) / 2;
  const intX = (j: number) => x0 + j * colW + colW / 2;
  const fracX = (j: number) => x0 + intLen * colW + GAP + j * colW + colW / 2;
  const commaX = x0 + intLen * colW + GAP / 2;

  const intDigits = d.int.padStart(intLen, " ").split("");
  const fracDigits = d.frac.padEnd(fracLen, " ").split("");
  const lastFrac = d.frac.length - 1;
  const fracNumber = Number(d.frac || "0");
  const order = ORDER_PLURAL[lastFrac]!;
  const intWords = `${words(Number(d.int), true)} ${Number(d.int) === 1 ? "unidad" : "unidades"}`;
  const hasLeadingZero = d.frac.startsWith("0") && d.frac.length > 1;

  const cell = (x: number, y: number, w: number, h: number, color: string, fill = "rgba(255,255,255,0.04)") => (
    <rect x={x - w / 2} y={y - h / 2} width={w} height={h} rx={10} fill={fill} stroke={color} strokeWidth={2.5} />
  );

  return {
    label: `Tabla de órdenes y lectura de ${dec}: ${readDec(dec)}`,
    captions: [
      `Cada cifra ocupa un orden. A la izquierda de la coma, **unidades, decenas…**; a la derecha, **décimas, centésimas, milésimas…**, cada una diez veces menor que la anterior.`,
      `Primero la **parte entera**: $${d.int}$ → **${intWords}**.`,
      `Después la **parte decimal**, leída como un número entero ($${fracNumber}$) y seguida del orden de su **última cifra**: las **${order}**.${hasLeadingZero ? " El cero de las décimas no se nombra, pero **hace falta**: marca dónde empieza el $" + d.frac.replace(/^0+/, "")[0] + "$." : ""}`,
      `$${texDec(dec)}$ se lee: **${readDec(dec)}**.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        {/* cabecera */}
        {Array.from({ length: intLen }, (_, j) => (
          <Txt key={`hi${j}`} x={intX(j)} y={Y_HEAD} size={26} color={MANIM.muted}>
            {INT_ABBR[INT_ABBR.length - intLen + j]}
          </Txt>
        ))}
        {Array.from({ length: fracLen }, (_, j) => (
          <Txt key={`hf${j}`} x={fracX(j)} y={Y_HEAD} size={26} color={j === lastFrac && beat >= 2 ? MANIM.yellow : MANIM.muted}>
            {ORDER_ABBR[j]}
          </Txt>
        ))}
        {/* celdas y cifras */}
        {intDigits.map((c, j) => (
          <g key={`ci${j}`}>
            {cell(intX(j), Y_DIGIT - 18, colW - 8, 80, beat === 1 ? MANIM.blue : MANIM.grid, beat === 1 ? "rgba(88,196,221,0.12)" : undefined)}
            <Txt x={intX(j)} y={Y_DIGIT} size={50} color={c === " " ? MANIM.grid : MANIM.ink} mono>
              {c === " " ? "" : c}
            </Txt>
          </g>
        ))}
        {fracDigits.map((c, j) => {
          const active = beat >= 2 && j <= lastFrac;
          const isLast = j === lastFrac && beat >= 2;
          return (
            <g key={`cf${j}`}>
              {cell(
                fracX(j),
                Y_DIGIT - 18,
                colW - 8,
                80,
                isLast ? MANIM.yellow : active ? MANIM.green : MANIM.grid,
                isLast ? "rgba(255,216,102,0.16)" : active ? "rgba(131,193,103,0.10)" : undefined,
              )}
              <Txt x={fracX(j)} y={Y_DIGIT} size={50} color={c === " " ? MANIM.grid : MANIM.ink} mono>
                {c === " " ? "" : c}
              </Txt>
            </g>
          );
        })}
        <Txt x={commaX} y={Y_DIGIT + 6} size={60} color={MANIM.yellow} mono>
          ,
        </Txt>

        {/* parte entera */}
        <HBrace show={beat === 1} x1={x0 + 6} x2={x0 + intLen * colW - 6} y={Y_DIGIT + 40} color={MANIM.blue} label={intWords} labelSize={24} />
        {/* parte decimal */}
        <HBrace
          show={beat === 2}
          x1={fracX(0) - colW / 2 + 6}
          x2={fracX(lastFrac) + colW / 2 - 6}
          y={Y_DIGIT + 40}
          color={MANIM.green}
          label={`${fracNumber} ${fracNumber === 1 ? ORDER_SINGULAR[lastFrac] : order}`}
          labelSize={24}
        />
        <Fade show={beat === 2} dy={8}>
          <Txt x={fracX(lastFrac)} y={Y_HEAD - 44} size={22} color={MANIM.yellow}>
            {order}
          </Txt>
        </Fade>

        <Fade show={beat === 3} dy={10}>
          <rect x={30} y={318} width={740} height={64} rx={14} fill="rgba(255,216,102,0.10)" stroke={MANIM.yellow} strokeWidth={2.5} />
          <Txt x={400} y={360} size={Math.min(26, 700 / Math.max(20, readDec(dec).length) * 1.75)} color={MANIM.yellow}>
            {readDec(dec)}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
