import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CELL = 58;
const Y = 170;

/** Notación científica: la coma salta hasta detrás de la primera cifra significativa y el salto da el exponente. */
export function buildNotacionCientifica(params: { dec?: string }): AnimBuild {
  const raw = (params.dec ?? "35600000").replace(/\s/g, "");
  const [intPart, fracPart = ""] = raw.split(",");
  const digits = (intPart + fracPart).split("");
  const point = (intPart ?? "").length;
  const first = Math.max(digits.findIndex((d) => d !== "0"), 0);
  const exp = point - first - 1;
  const mantissaDigits = digits.slice(first).join("").replace(/0+$/, "") || digits[first] || "0";
  const mantissa = mantissaDigits.length > 1 ? `${mantissaDigits[0]},${mantissaDigits.slice(1)}` : mantissaDigits;
  const shown = digits.length;
  const x0 = 400 - (shown * CELL) / 2;
  const cellX = (i: number) => x0 + i * CELL + CELL / 2;
  const edge = (k: number) => x0 + k * CELL;
  const big = exp >= 0;
  const jumps = Math.abs(exp);
  const original = raw.replace(".", ",");
  const ten = `10^{${exp}}`;

  return {
    label: `${original} en notación científica: ${mantissa} · 10^${exp}`,
    captions: [
      `Queremos escribir $${original.replace(",", "{,}")}$ con **una sola cifra entera** distinta de cero.`,
      `La primera cifra significativa es el **${digits[first]}**: la coma tiene que quedar justo detrás de ella.`,
      `La coma se desplaza **${jumps}** ${jumps === 1 ? "lugar" : "lugares"} hacia la ${big ? "izquierda" : "derecha"}.`,
      `Cada lugar es un factor $10$: ${big ? "número grande → exponente **positivo**" : "número pequeño → exponente **negativo**"}. Resultado: $${mantissa.replace(",", "{,}")} \\cdot ${ten}$.`,
    ],
    render: (beat) => (
      <Canvas>
        {digits.map((d, i) => (
          <g key={i}>
            <rect x={x0 + i * CELL + 4} y={Y - 36} width={CELL - 8} height={72} rx={8} fill={MANIM.panel} stroke={i === first && beat >= 1 ? MANIM.yellow : MANIM.grid} strokeWidth={i === first && beat >= 1 ? 4 : 2} className="anim-t" />
            <Txt x={cellX(i)} y={Y + 14} size={40} color={i < first ? MANIM.muted : MANIM.ink}>{d}</Txt>
          </g>
        ))}
        <g className="anim-t" style={{ opacity: beat >= 2 ? 0.25 : 1 }}>
          <circle cx={edge(point)} cy={Y + 30} r={7} fill={MANIM.red} />
        </g>
        <Fade show={beat >= 2} dy={-10}>
          <circle cx={edge(first + 1)} cy={Y + 30} r={7} fill={MANIM.green} />
          <path d={`M ${edge(point)} ${Y - 52} Q ${(edge(point) + edge(first + 1)) / 2} ${Y - 130} ${edge(first + 1)} ${Y - 52}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={(edge(point) + edge(first + 1)) / 2} y={Y - 106} size={24} color={MANIM.yellow}>{`${jumps} ${jumps === 1 ? "lugar" : "lugares"}`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dy={8}>
          <text x={400} y={330} fontSize={46} fill={MANIM.ink} fontWeight={600} textAnchor="middle" style={{ fontFamily: "var(--font-sans, system-ui, sans-serif)" }}>
            {`${mantissa} · 10`}
            <tspan dy={-20} fontSize={30} fill={big ? MANIM.green : MANIM.orange}>{exp}</tspan>
          </text>
        </Fade>
      </Canvas>
    ),
  };
}
