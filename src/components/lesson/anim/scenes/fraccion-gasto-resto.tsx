import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { Frac } from "@/components/lesson/anim/fraction-svg";
import { MANIM } from "@/components/lesson/anim/palette";
import { gcd } from "@/components/lesson/anim/number-theory";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 90;
const W = 620;
const Y0 = 60;
const H = 72;

const simplify = (n: number, d: number) => {
  const g = gcd(n, d) || 1;
  return [n / g, d / g] as const;
};

/**
 * Problema «gasta a/b y después c/d de lo que le quedaba»: una barra con el dinero.
 * La segunda fracción actúa sobre el resto (multiplica), y el total gastado se suma.
 */
export function buildFraccionGastoResto(params: { a?: number; b?: number; c?: number; d?: number }): AnimBuild {
  const a = params.a ?? 1;
  const b = params.b ?? 2;
  const c = params.c ?? 1;
  const d = params.d ?? 3;
  const N = b * d;
  const cell = W / N;
  const first = a * d;
  const second = c * (b - a);
  const spent = first + second;
  const left = N - spent;
  const [ra, rb] = simplify(b - a, b);
  const [sn, sd] = simplify(second, N);
  const [tn, td] = simplify(spent, N);
  const [ln, ld] = simplify(left, N);
  const restStart = X0 + first * cell;

  const captions = [
    `Toda la barra es **el dinero de Marta**: vale $1$.`,
    `Gasta $\\dfrac{${a}}{${b}}$ en el concierto: partimos la barra en **${b}** y coloreamos **${a}**.`,
    `Le queda $1 - \\dfrac{${a}}{${b}} = \\dfrac{${ra}}{${rb}}$ del dinero. **Esta parte** es la que ahora hay que repartir.`,
    `La revista cuesta $\\dfrac{${c}}{${d}}$ **de lo que le quedaba**: partimos el resto (no la barra entera) en **${d}** y cogemos **${c}**.`,
    `Para medirlo sobre el total, cortamos toda la barra en trozos iguales (${N}): la revista es $\\dfrac{${c}}{${d}} \\cdot \\dfrac{${ra}}{${rb}} = \\dfrac{${sn}}{${sd}}$ **del dinero**.`,
    `En total ha gastado el concierto más la revista, ya con el mismo denominador: $\\dfrac{${first}}{${N}} + \\dfrac{${second}}{${N}} = \\dfrac{${spent}}{${N}}${tn !== spent ? ` = \\dfrac{${tn}}{${td}}` : ""}$.`,
    `Lo que le queda es lo que no se ha gastado: $1 - \\dfrac{${tn}}{${td}} = \\dfrac{${ln}}{${ld}}$ del dinero.`,
  ];

  const bigLines = Array.from({ length: N - 1 }, (_, i) => i + 1);
  const rowY = 335;

  return {
    label: `Problema de Marta: gasta ${a}/${b} y ${c}/${d} de lo que le queda; gasta ${tn}/${td} y le queda ${ln}/${ld}`,
    captions,
    beatMs: 4200,
    render: (beat) => (
      <Canvas>
        {/* barra del dinero */}
        <rect x={X0} y={Y0} width={W} height={H} fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={3} rx={3} />
        {/* concierto */}
        <Fade show={beat >= 1}>
          <rect x={X0} y={Y0} width={first * cell} height={H} fill={MANIM.blue} fillOpacity={0.5} />
        </Fade>
        {/* resto */}
        <Fade show={beat >= 2 && beat < 5}>
          <rect x={restStart} y={Y0} width={W - first * cell} height={H} fill={MANIM.green} fillOpacity={0.28} />
        </Fade>
        {/* revista */}
        <Fade show={beat >= 3}>
          <rect x={restStart} y={Y0} width={second * cell} height={H} fill={MANIM.purple} fillOpacity={0.6} />
        </Fade>
        {/* queda al final */}
        <Fade show={beat >= 6}>
          <rect x={X0 + spent * cell} y={Y0} width={left * cell} height={H} fill={MANIM.green} fillOpacity={0.5} />
        </Fade>
        {/* rayas: de b partes (concierto), del resto en d partes, y de todos los trozos */}
        <Fade show={beat >= 1 && beat < 4}>
          {Array.from({ length: b - 1 }, (_, i) => (
            <line key={i} x1={X0 + ((i + 1) * W) / b} x2={X0 + ((i + 1) * W) / b} y1={Y0} y2={Y0 + H} stroke={MANIM.ink} strokeWidth={3} />
          ))}
        </Fade>
        <Fade show={beat >= 3 && beat < 4}>
          {Array.from({ length: d - 1 }, (_, i) => {
            const x = restStart + ((i + 1) * (W - first * cell)) / d;
            return <line key={i} x1={x} x2={x} y1={Y0} y2={Y0 + H} stroke={MANIM.yellow} strokeWidth={2.5} />;
          })}
        </Fade>
        <Fade show={beat >= 4}>
          {bigLines.map((i) => (
            <line key={i} x1={X0 + i * cell} x2={X0 + i * cell} y1={Y0} y2={Y0 + H} stroke={MANIM.muted} strokeOpacity={0.7} strokeWidth={1.5} />
          ))}
        </Fade>
        <rect x={X0} y={Y0} width={W} height={H} fill="none" stroke={MANIM.ink} strokeWidth={3} rx={3} />

        {/* llaves */}
        <HBrace show={beat === 0} x1={X0} x2={X0 + W} y={Y0 + H + 10} label="todo el dinero = 1" color={MANIM.ink} labelSize={26} />
        <HBrace show={beat === 1} x1={X0 + 2} x2={X0 + first * cell - 2} y={Y0 + H + 10} label={`concierto: ${a}/${b}`} color={MANIM.blue} labelSize={26} />
        <HBrace show={beat === 2} x1={restStart + 2} x2={X0 + W - 2} y={Y0 + H + 10} label={`queda ${ra}/${rb}`} color={MANIM.green} labelSize={26} />
        <HBrace show={beat === 3} x1={restStart + 2} x2={X0 + W - 2} y={Y0 + H + 10} label={`${c}/${d} de lo que queda`} color={MANIM.yellow} labelSize={26} />
        <HBrace show={beat === 4} x1={restStart + 2} x2={restStart + second * cell - 2} y={Y0 + H + 10} label={`revista: ${sn}/${sd} del total`} color={MANIM.purple} labelSize={26} />
        <HBrace show={beat === 5} x1={X0 + 2} x2={X0 + spent * cell - 2} y={Y0 + H + 10} label="gastado" color={MANIM.yellow} labelSize={26} />
        <HBrace show={beat === 6} x1={X0 + spent * cell + 2} x2={X0 + W - 2} y={Y0 + H + 10} label="queda" color={MANIM.green} labelSize={26} />

        {/* cuentas */}
        <Fade show={beat === 4} dy={10}>
          <Frac x={250} y={rowY - 12} n={c} d={d} size={40} color={MANIM.yellow} />
          <Txt x={330} y={rowY - 4} size={38}>
            ·
          </Txt>
          <Frac x={410} y={rowY - 12} n={ra} d={rb} size={40} color={MANIM.green} />
          <Txt x={490} y={rowY - 4} size={38} color={MANIM.muted}>
            =
          </Txt>
          <Frac x={570} y={rowY - 12} n={sn} d={sd} size={40} color={MANIM.purple} />
        </Fade>
        <Fade show={beat === 5} dy={10}>
          <Frac x={150} y={rowY - 12} n={first} d={N} size={40} color={MANIM.blue} />
          <Txt x={225} y={rowY - 4} size={38}>
            +
          </Txt>
          <Frac x={300} y={rowY - 12} n={second} d={N} size={40} color={MANIM.purple} />
          <Txt x={375} y={rowY - 4} size={38} color={MANIM.muted}>
            =
          </Txt>
          <Frac x={450} y={rowY - 12} n={spent} d={N} size={40} color={MANIM.yellow} />
          {tn !== spent ? (
            <>
              <Txt x={525} y={rowY - 4} size={38} color={MANIM.muted}>
                =
              </Txt>
              <Frac x={600} y={rowY - 12} n={tn} d={td} size={40} color={MANIM.yellow} />
            </>
          ) : null}
        </Fade>
        <Fade show={beat === 6} dy={10}>
          <Txt x={240} y={rowY - 4} size={38}>
            1
          </Txt>
          <Txt x={300} y={rowY - 4} size={38}>
            −
          </Txt>
          <Frac x={370} y={rowY - 12} n={tn} d={td} size={40} color={MANIM.yellow} />
          <Txt x={445} y={rowY - 4} size={38} color={MANIM.muted}>
            =
          </Txt>
          <Frac x={520} y={rowY - 12} n={ln} d={ld} size={44} color={MANIM.green} />
        </Fade>
      </Canvas>
    ),
  };
}
