import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { fmtEs, hm, movers } from "@/components/lesson/anim/arith";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 80;
const X1 = 720;
const Y = 230;

/**
 * Móviles: en sentidos opuestos las velocidades se suman; en el mismo sentido (alcance) se restan.
 * `nums = [v1, v2, d, retraso (min)]`. En el alcance, el 1.º es el lento (que va delante) y el 2.º el rápido.
 */
export function buildMovilEncuentro(params: { mov?: "opuesto" | "alcance"; nums?: number[] }): AnimBuild {
  const mode = params.mov ?? "opuesto";
  const [v1 = 80, v2 = 120, d = 350, delayMin = 0] = params.nums ?? [];
  const delay = delayMin / 60;
  const res = movers(mode, v1, v2, d, delay);
  const opp = mode === "opuesto";
  const lead = opp ? d : d + v1 * delay;
  const closing = opp ? v1 + v2 : v2 - v1;
  const span = opp ? d : res.x || d;
  const sx = (km: number) => X0 + (km / Math.max(span, 1)) * (X1 - X0);
  const start1 = opp ? 0 : lead;
  const start2 = opp ? d : 0;
  const meetX = res.ok ? (opp ? res.x : res.x) : 0;
  const f = (v: number) => fmtEs(v, 2);

  const pos = (beat: number) => {
    if (beat < 3) return { a: start1, b: start2 };
    return opp ? { a: meetX, b: meetX } : { a: res.ok ? v1 * res.t + lead : lead, b: meetX };
  };
  const p = pos(3);
  const sc = (beat: number) => (beat >= 3 ? p : pos(beat));

  return {
    label: opp
      ? `Móviles en sentidos opuestos a ${f(v1)} y ${f(v2)} km/h a ${f(d)} km: se cruzan en ${hm(res.t)}`
      : `Alcance: ${f(v2)} km/h persigue a ${f(v1)} km/h con ${f(lead)} km de ventaja: lo alcanza en ${hm(res.t)}`,
    captions: opp
      ? [
          `Dos puntos a **${f(d)} km**. Salen a la vez uno hacia el otro: $${f(v1)}$ km/h y $${f(v2)}$ km/h.`,
          `Se acercan a la vez: la distancia entre ellos disminuye a $${f(v1)} + ${f(v2)} = ${f(closing)}$ km/h (**velocidad de aproximación**).`,
          `Tiempo $= \\dfrac{d}{v} = \\dfrac{${f(d)}}{${f(closing)}} = ${f(res.t)}$ h $= ${hm(res.t)}$.`,
          `Se cruzan tras ${hm(res.t)}, a $${f(v1)} \\cdot ${f(res.t)} = ${f(res.x)}$ km del punto de partida del primero.`,
        ]
      : [
          `Un móvil lento ($${f(v1)}$ km/h) va delante${delay > 0 ? ` y el otro sale ${delayMin} min más tarde` : ""}. **Ventaja** inicial: $${f(lead)}$ km.`,
          `Van en el mismo sentido: el rápido recorta la ventaja a $${f(v2)} - ${f(v1)} = ${f(closing)}$ km/h (**velocidad de aproximación**).`,
          `Tiempo $= \\dfrac{${f(lead)}}{${f(closing)}} = ${f(res.t)}$ h $= ${hm(res.t)}$.`,
          `El rápido lo alcanza tras ${hm(res.t)} y ha recorrido $${f(v2)} \\cdot ${f(res.t)} = ${f(res.x)}$ km.`,
        ],
    beatMs: 4200,
    render: (beat) => {
      const { a, b } = sc(beat);
      const together = beat >= 3;
      const car = (x: number, color: string, label: string, dir: 1 | -1, shift: number) => (
        <g>
          <rect x={sx(x) - 22} y={Y - 30} width={44} height={24} rx={6} fill={color} className="anim-t" />
          <circle cx={sx(x) - 12} cy={Y - 4} r={6} fill={MANIM.ink} />
          <circle cx={sx(x) + 12} cy={Y - 4} r={6} fill={MANIM.ink} />
          <path d={`M ${sx(x) + dir * 30} ${Y - 18} l ${dir * 14} 0`} stroke={color} strokeWidth={3} />
          <Txt x={sx(x) + (together ? shift : 0)} y={Y - 44} size={22} color={color}>{label}</Txt>
        </g>
      );
      return (
        <Canvas>
          <line x1={X0 - 20} y1={Y + 6} x2={X1 + 20} y2={Y + 6} stroke={MANIM.grid} strokeWidth={6} strokeLinecap="round" />
          <Txt x={X0} y={Y + 44} size={20} color={MANIM.muted}>0 km</Txt>
          <Txt x={X1} y={Y + 44} size={20} color={MANIM.muted}>{`${f(span)} km`}</Txt>
          {car(a, MANIM.blue, `${f(v1)} km/h`, 1, -50)}
          {car(b, MANIM.orange, `${f(v2)} km/h`, opp ? -1 : 1, 50)}
          <Fade show={beat >= 1} dy={-6}>
            <Txt x={400} y={80} size={30} color={MANIM.yellow}>{`aproximación: ${f(closing)} km/h`}</Txt>
          </Fade>
          <Fade show={beat >= 2} dy={-6}>
            <Txt x={400} y={130} size={34} color={MANIM.green}>{`t = ${f(opp ? d : lead)} / ${f(closing)} → ${hm(res.t)}`}</Txt>
          </Fade>
          <Fade show={beat >= 3} dy={8}>
            <circle cx={sx(opp ? meetX : meetX)} cy={Y + 6} r={9} fill={MANIM.green} />
            <Txt x={sx(meetX)} y={Y + 90} size={22} color={MANIM.green}>{opp ? "se cruzan" : "lo alcanza"}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
