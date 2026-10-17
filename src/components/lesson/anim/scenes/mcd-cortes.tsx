import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { divisors, gcd, smallestPrimeFactor } from "@/components/lesson/anim/number-theory";

const X0 = 50;
const BAR_W = 700;
const BAR_H = 44;
const YA = 130;
const YB = 250;

type Trial = { size: number; fits: boolean };

/** Cortar dos cintas en trozos iguales: el mayor tamaño que cabe justo en las dos es el m.c.d. */
export function buildMcdCortes(params: { a?: number; b?: number }): AnimBuild {
  const a = params.a ?? 24;
  const b = params.b ?? 36;
  const g = gcd(a, b);
  const unit = BAR_W / Math.max(a, b);
  const bad = divisors(a).find((d) => d > 1 && b % d !== 0);
  const small = smallestPrimeFactor(g);
  const trials: Trial[] = [];
  if (bad !== undefined) {
    trials.push({ size: bad, fits: false });
  }
  if (small < g) {
    trials.push({ size: small, fits: true });
  }
  trials.push({ size: g, fits: true });

  const pieces = (len: number, size: number) => {
    const full = Math.floor(len / size);
    return { full, rest: len - full * size };
  };

  const captions = [
    `Dos cintas, de **${a} m** y **${b} m**. Hay que cortarlas en trozos **iguales**, sin que sobre nada y lo **más largos** posible.`,
    ...trials.map(({ size, fits }) => {
      const pa = pieces(a, size);
      const pb = pieces(b, size);
      if (!fits) {
        const bar = pa.rest ? a : b;
        const p = pieces(bar, size);
        return `Trozos de **${size} m**: en la cinta de ${bar} salen ${p.full} y **sobran ${p.rest} m**. ${size} no divide a los dos: no sirve.`;
      }
      return size === g
        ? `Trozos de **${size} m**: ${pa.full} y ${pb.full} trozos exactos. Ningún trozo mayor cabe justo en las dos cintas: **m.c.d.(${a}, ${b}) = ${g}**.`
        : `Trozos de **${size} m**: sirve (divide a ${a} y a ${b}), pero salen ${pa.full} y ${pb.full} trozos. Buscamos el **mayor** divisor común.`;
    }),
  ];

  const bar = (y: number, len: number, size: number, colors: [string, string], label: string) => {
    const { full, rest } = pieces(len, size);
    return (
      <g>
        {Array.from({ length: full }).map((_, k) => (
          <rect key={k} x={X0 + k * size * unit + 1.5} y={y} width={size * unit - 3} height={BAR_H} rx={6} fill={colors[k % 2]} fillOpacity={0.9} />
        ))}
        {rest > 0 ? (
          <rect x={X0 + full * size * unit + 1.5} y={y} width={rest * unit - 3} height={BAR_H} rx={6} fill="rgba(252,98,85,0.2)" stroke={MANIM.red} strokeWidth={3} strokeDasharray="7 6" />
        ) : null}
        <Txt x={X0} y={y - 14} size={22} color={MANIM.muted} anchor="start">{label}</Txt>
        <Txt x={X0 + len * unit} y={y - 14} size={22} color={rest > 0 ? MANIM.red : MANIM.green} anchor="end">
          {rest > 0 ? `${full} trozos + ${rest} m sobran` : `${full} trozos`}
        </Txt>
      </g>
    );
  };

  return {
    label: `Cortar cintas de ${a} m y ${b} m en trozos iguales: el trozo mayor posible mide ${g} m (m.c.d.)`,
    captions,
    beatMs: 3000,
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <rect x={X0} y={YA} width={a * unit} height={BAR_H} rx={6} fill={MANIM.blue} fillOpacity={0.85} />
          <rect x={X0} y={YB} width={b * unit} height={BAR_H} rx={6} fill={MANIM.orange} fillOpacity={0.85} />
          <Txt x={X0} y={YA - 14} size={22} color={MANIM.muted} anchor="start">{`cinta A: ${a} m`}</Txt>
          <Txt x={X0} y={YB - 14} size={22} color={MANIM.muted} anchor="start">{`cinta B: ${b} m`}</Txt>
        </Fade>
        {trials.map((t, k) => (
          <Fade key={k} show={beat === k + 1}>
            {bar(YA, a, t.size, [MANIM.blue, "#3a9ab5"], `cinta A: ${a} m`)}
            {bar(YB, b, t.size, [MANIM.orange, "#d06a1f"], `cinta B: ${b} m`)}
            <Txt x={400} y={360} size={30} color={t.fits ? (t.size === g ? MANIM.yellow : MANIM.green) : MANIM.red}>
              {`trozos de ${t.size} m ${t.fits ? "✓" : "✗"}`}
            </Txt>
          </Fade>
        ))}
      </Canvas>
    ),
  };
}
