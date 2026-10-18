import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { parseDec, texDec } from "@/components/lesson/anim/decimal";

const PAD = 3;
const LABELS = ["", "10", "100", "1000"];

/** Valor tras desplazar la coma (como texto): se recoloca la coma y se añaden ceros donde hagan falta. */
export function shiftComma(dec: string, dir: "mul" | "div", k: number): string {
  const { int, frac } = parseDec(dec);
  const digits = `${int === "0" ? "" : int}${frac}`;
  const g0 = int === "0" ? 0 : int.length;
  const g = dir === "mul" ? g0 + k : g0 - k;
  let intPart: string;
  let fracPart: string;
  if (g <= 0) {
    intPart = "0";
    fracPart = `${"0".repeat(-g)}${digits}`;
  } else if (g >= digits.length) {
    intPart = `${digits}${"0".repeat(g - digits.length)}`;
    fracPart = "";
  } else {
    intPart = digits.slice(0, g);
    fracPart = digits.slice(g);
  }
  intPart = intPart.replace(/^0+(?=\d)/, "") || "0";
  fracPart = fracPart.replace(/0+$/, "");
  return fracPart ? `${intPart},${fracPart}` : intPart;
}

/** Multiplicar o dividir por 10, 100, 1000: la coma se desplaza a la derecha o a la izquierda. */
export function buildComaPotencias10(params: { dec?: string; dir?: "mul" | "div" }): AnimBuild {
  const dir = params.dir ?? "mul";
  const dec = params.dec ?? (dir === "mul" ? "2,45" : "15,3");
  const d = parseDec(dec);
  const digits = `${d.int === "0" ? "" : d.int}${d.frac}`.split("");
  const len = digits.length;
  const cells = len + PAD * 2;
  const W = Math.min(64, 700 / cells);
  const startX = (800 - cells * W) / 2;
  const cellX = (i: number) => startX + i * W + W / 2;
  const g0 = PAD + (d.int === "0" ? 0 : d.int.length);
  const firstIdx = PAD;
  const lastIdx = PAD + len - 1;
  const gAt = (k: number) => (dir === "mul" ? g0 + k : g0 - k);
  const color = dir === "mul" ? MANIM.green : MANIM.blue;
  const op = dir === "mul" ? "·" : ":";

  const visible = (i: number, k: number): { show: boolean; zero: boolean } => {
    const g = gAt(k);
    if (i >= firstIdx && i <= lastIdx) return { show: true, zero: false };
    if (i < firstIdx) return { show: i >= (g <= firstIdx ? g - 1 : firstIdx), zero: true };
    return { show: i <= g - 1, zero: true };
  };

  const captions = [1, 2, 3].map((k) => {
    const result = shiftComma(dec, dir, k);
    const g = gAt(k);
    const zeros =
      dir === "mul"
        ? Math.max(0, g - (lastIdx + 1))
        : Math.max(0, firstIdx - g);
    const side = dir === "mul" ? "derecha" : "izquierda";
    const extra =
      dir === "mul"
        ? zeros > 0
          ? ` Faltan cifras: se añade${zeros > 1 ? "n" : ""} **${zeros === 1 ? "un cero" : `${zeros} ceros`}** hasta la coma.`
          : ""
        : g <= firstIdx
          ? ` No queda parte entera: se escribe un $0$ delante de la coma${zeros > 0 ? ` y se añade${zeros > 1 ? "n" : ""} **${zeros === 1 ? "un cero" : `${zeros} ceros`}** entre la coma y la primera cifra` : ""}.`
          : "";
    const why = dir === "mul" ? "cada cifra pasa a valer diez veces más" : "cada cifra pasa a valer diez veces menos";
    return `$${texDec(dec)} ${dir === "mul" ? "\\cdot" : ":"} ${LABELS[k]} = ${texDec(result)}$: la coma se mueve **${k} lugar${k > 1 ? "es" : ""} a la ${side}** (${why}).${extra}`;
  });
  captions.unshift(
    dir === "mul"
      ? `Multiplicar por 10, 100, 1000… es hacer que cada cifra valga 10, 100, 1000… veces más. Veamos $${texDec(dec)}$.`
      : `Dividir entre 10, 100, 1000… es hacer que cada cifra valga 10, 100, 1000… veces menos. Veamos $${texDec(dec)}$.`,
  );

  return {
    label: `${dec} ${dir === "mul" ? "por" : "entre"} 10, 100 y 1000: se mueve la coma`,
    captions,
    beatMs: 3400,
    render: (beat) => {
      const g = gAt(beat);
      const result = shiftComma(dec, dir, beat);
      const commaVisible = g <= lastIdx && g >= 1;
      return (
        <Canvas>
          <Fade show={beat > 0} dy={-12}>
            <Txt x={400} y={88} size={46} color={color}>
              {`${dec}  ${op}  ${LABELS[Math.min(beat, 3)]}`}
            </Txt>
          </Fade>
          {Array.from({ length: cells }, (_, i) => {
            const v = visible(i, beat);
            const isDigit = i >= firstIdx && i <= lastIdx;
            return (
              <Fade key={i} show={v.show} dx={dir === "mul" ? -8 : 8}>
                <rect x={cellX(i) - W / 2 + 3} y={140} width={W - 6} height={100} rx={10} fill="rgba(255,255,255,0.04)" stroke={isDigit ? MANIM.grid : MANIM.yellow} strokeWidth={2} />
                <Txt x={cellX(i)} y={208} size={56} color={isDigit ? MANIM.ink : MANIM.yellow} mono>
                  {isDigit ? digits[i - firstIdx] : "0"}
                </Txt>
              </Fade>
            );
          })}
          <Move x={startX + g * W} y={0}>
            <Fade show={commaVisible}>
              <rect x={-4} y={128} width={8} height={124} rx={4} fill={MANIM.red} fillOpacity={0.9} />
              <Txt x={0} y={274} size={26} color={MANIM.red}>
                coma
              </Txt>
            </Fade>
          </Move>
          <Fade show={beat > 0} dy={8}>
            <Txt x={400} y={340} size={44} color={MANIM.yellow}>
              {`= ${result}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
