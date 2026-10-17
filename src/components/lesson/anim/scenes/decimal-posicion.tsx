import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt } from "@/components/lesson/anim/format";

/** Nombre del orden según la potencia de 10 (0 = unidades). */
const SHORT = ["Unidades", "Decenas", "Centenas", "Unid. millar", "Dec. millar", "Cent. millar", "Unid. millón"];
const FULL = ["unidades", "decenas", "centenas", "unidades de millar", "decenas de millar", "centenas de millar", "unidades de millón"];
const Y_HEAD = 130;

/** El valor de una cifra depende del lugar que ocupa (sistema posicional). */
export function buildDecimalPosicion(params: { n?: number; a?: number; b?: number }): AnimBuild {
  const n = params.n ?? 35_318;
  const powerA = params.a ?? 4;
  const powerB = params.b ?? 2;
  const digitOf = (p: number) => Math.floor(n / 10 ** p) % 10;
  const digitCount = String(n).length;
  const cols = Math.min(7, Math.max(6, digitCount));
  const powers = Array.from({ length: cols }, (_, i) => cols - 1 - i);
  const colW = 740 / cols;
  const x0 = (800 - cols * colW) / 2;

  const valA = digitOf(powerA) * 10 ** powerA;
  const valB = digitOf(powerB) * 10 ** powerB;
  const parts = powers.map((p) => digitOf(p) * 10 ** p).filter((v) => v > 0);

  return {
    label: `El valor de cada cifra de ${fmt(n)} depende de su posición`,
    captions: [
      "Cada **posición** es un orden de unidades. Cada paso a la izquierda vale **diez veces más**.",
      `Escribimos **${fmt(n)}**: una cifra por orden.`,
      `Aquí el **${digitOf(powerA)}** está en las ${FULL[powerA]}: vale **${fmt(valA)}**.`,
      `Este otro **${digitOf(powerB)}** está en las ${FULL[powerB]}: vale solo **${fmt(valB)}**. Misma cifra, valor distinto.`,
      `El número es la **suma** de los valores de sus cifras: ${parts.map(fmt).join(" + ")} = ${fmt(n)}.`,
    ],
    render: (beat) => (
      <Canvas>
        {powers.map((p, i) => {
          const present = p < digitCount;
          const x = x0 + i * colW;
          const cx = x + (colW - 6) / 2;
          const hot = p === powerA && beat === 2 ? MANIM.yellow : p === powerB && beat === 3 ? MANIM.green : null;
          return (
            <g key={p}>
              <Fade show dy={-8} delay={i * 40}>
                <rect x={x} y={Y_HEAD} width={colW - 6} height={48} rx={8} fill="rgba(255,255,255,0.05)" stroke={hot ?? MANIM.grid} strokeWidth={hot ? 3 : 1.5} />
                <Txt x={cx} y={Y_HEAD + 30} size={16} color={hot ?? MANIM.muted} weight={600}>
                  {SHORT[p]}
                </Txt>
              </Fade>
              <rect x={x} y={Y_HEAD + 54} width={colW - 6} height={86} rx={8} fill={hot ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.03)"} stroke={hot ?? MANIM.grid} strokeWidth={hot ? 3 : 1.5} className="anim-t" />
              {present ? (
                <Fade show={beat >= 1} dy={-30} delay={(cols - 1 - i) * 60}>
                  <Txt x={cx} y={Y_HEAD + 114} size={56} color={hot ?? MANIM.ink} weight={700}>
                    {String(digitOf(p))}
                  </Txt>
                </Fade>
              ) : null}
              {i < cols - 1 ? (
                <Fade show={beat === 0} dy={4}>
                  <Txt x={x + colW - 3} y={Y_HEAD - 14} size={18} color={MANIM.yellow}>
                    ◂ ×10
                  </Txt>
                </Fade>
              ) : null}
            </g>
          );
        })}

        <Fade show={beat === 2} dy={10}>
          <Txt x={400} y={80} size={34} color={MANIM.yellow}>
            {`${digitOf(powerA)} · ${fmt(10 ** powerA)} = ${fmt(valA)}`}
          </Txt>
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <Txt x={400} y={80} size={34} color={MANIM.green}>
            {`${digitOf(powerB)} · ${fmt(10 ** powerB)} = ${fmt(valB)}`}
          </Txt>
        </Fade>

        <Fade show={beat === 4} dy={14}>
          <rect x={50} y={290} width={700} height={80} rx={14} fill="rgba(255,216,102,0.1)" stroke={MANIM.yellow} strokeWidth={2} />
          <Txt x={400} y={340} size={30} color={MANIM.ink}>
            {`${parts.map(fmt).join(" + ")} = ${fmt(n)}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
