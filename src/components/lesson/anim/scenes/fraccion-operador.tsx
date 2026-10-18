import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fmt } from "@/components/lesson/anim/format";

const TX = 90;
const TY = 50;
const TW = 170;
const TH = 320;

/**
 * Fracción de una cantidad: el total (`a`) se divide en `b` partes iguales y se toman `c`.
 * Siempre en dos pasos: dividir y multiplicar.
 */
export function buildFraccionOperador(params: { a?: number; b?: number; c?: number }): AnimBuild {
  const total = params.a ?? 20;
  const d = Math.max(2, Math.min(10, params.b ?? 5));
  const n = Math.max(1, Math.min(d - 1, params.c ?? 2));
  const part = total / d;
  const result = part * n;
  const bandH = TH / d;
  const bands = Array.from({ length: d }, (_, i) => i);

  return {
    label: `${n}/${d} de ${total}: se divide ${total} entre ${d} y el resultado se multiplica por ${n}`,
    captions: [
      `Un bidón de **${fmt(total)} litros**. Queremos $\\frac{${n}}{${d}}$ de su contenido.`,
      `Se divide en **${d} partes iguales** (el denominador): $${fmt(total)} : ${d} = ${fmt(part)}$ litros cada una.`,
      `Se cogen **${n} partes** (el numerador): $${n} \\cdot ${fmt(part)} = ${fmt(result)}$ litros.`,
      `Dividir entre el denominador y multiplicar por el numerador: $\\frac{${n}}{${d}}$ de $${fmt(total)} = (${fmt(total)} : ${d}) \\cdot ${n} = ${fmt(result)}$.`,
    ],
    beatMs: 3600,
    render: (beat) => (
      <Canvas>
        <rect x={TX} y={TY} width={TW} height={TH} rx={16} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={4} />
        {bands.map((i) => {
          const taken = i >= d - n; // se cogen las de abajo
          const y = TY + i * bandH;
          return (
            <g key={i}>
              <rect
                x={TX + 3}
                y={y + 2}
                width={TW - 6}
                height={bandH - 4}
                rx={6}
                className="anim-t"
                fill={MANIM.blue}
                fillOpacity={beat >= 2 ? (taken ? 0.9 : 0.15) : 0.35}
                style={{ transitionDelay: beat >= 2 && taken ? `${(d - 1 - i) * 120}ms` : "0ms" }}
              />
              {i > 0 ? (
                <Fade show={beat >= 1}>
                  <line x1={TX} y1={y} x2={TX + TW} y2={y} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="8 6" />
                </Fade>
              ) : null}
              <Fade show={beat >= 1} dx={-10} delay={i * 40}>
                <Txt x={TX + TW / 2} y={y + bandH / 2 + 8} size={Math.min(24, bandH * 0.5)} color={MANIM.ink}>
                  {`${fmt(part)} l`}
                </Txt>
              </Fade>
            </g>
          );
        })}
        <Fade show={beat === 0} dx={-10}>
          <Txt x={TX + TW + 40} y={TY + TH / 2} size={34} color={MANIM.yellow} anchor="start">{`← ${fmt(total)} l`}</Txt>
        </Fade>
        <Fade show={beat === 1} dx={20}>
          <Txt x={560} y={170} size={30} color={MANIM.yellow}>{`${fmt(total)} : ${d} = ${fmt(part)}`}</Txt>
          <Txt x={560} y={212} size={22} color={MANIM.muted}>litros en cada parte</Txt>
        </Fade>
        <Fade show={beat === 2} dx={20}>
          <Txt x={560} y={170} size={30} color={MANIM.blue}>{`${n} · ${fmt(part)} = ${fmt(result)}`}</Txt>
          <Txt x={560} y={212} size={22} color={MANIM.muted}>{`litros en ${n} partes`}</Txt>
        </Fade>
        <Fade show={beat >= 3} dx={20}>
          <Txt x={560} y={150} size={28} color={MANIM.yellow}>{`÷ ${d}`}</Txt>
          <Txt x={560} y={192} size={28} color={MANIM.blue}>{`× ${n}`}</Txt>
          <Txt x={560} y={250} size={36} color={MANIM.green}>{`${fmt(result)} litros`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
