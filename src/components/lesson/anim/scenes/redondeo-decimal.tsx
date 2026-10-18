import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { fromScaled, parseDec, scaled, texDec } from "@/components/lesson/anim/decimal";

const X0 = 225;
const X1 = 740;
const tickX = (t: number) => X0 + (t / 10) * (X1 - X0);
const NAMES = ["unidades", "décimas", "centésimas"];

/** Aproximar por redondeo: el decimal se queda con el extremo más cercano de su tramo. */
export function buildRedondeoDecimal(params: { dec?: string }): AnimBuild {
  const dec = params.dec ?? "4,2857";
  const d = parseDec(dec);
  const levels = Math.max(1, Math.min(3, d.frac.length));
  const ys = levels === 1 ? [190] : levels === 2 ? [100, 250] : [70, 195, 320];

  const info = Array.from({ length: levels }, (_, u) => {
    const lo = scaled(`${d.int}${d.frac.slice(0, u)}`);
    const rest = d.frac.slice(u);
    const t = Number(`0.${rest}`);
    const cut = Number(rest[0]);
    const up = cut >= 5;
    return {
      u,
      lo,
      t,
      cut,
      up,
      kept: `${d.int}${u ? "," : ""}${d.frac.slice(0, u)}`,
      suppressed: rest,
      loText: fromScaled(lo, u),
      hiText: fromScaled(lo + 1, u),
      result: fromScaled(up ? lo + 1 : lo, u),
    };
  });

  const captions = [
    ...info.flatMap((lv) => [
      `A las **${NAMES[lv.u]}**: $${texDec(dec)}$ queda entre $${texDec(lv.loText)}$ y $${texDec(lv.hiText)}$. El **punto medio** es $${texDec(fromScaled(lv.lo * 10 + 5, lv.u + 1))}$.`,
      lv.up
        ? `Está **pasado el punto medio**: queda más cerca de $${texDec(lv.hiText)}$. $${texDec(dec)} \\approx ${texDec(lv.result)}$.`
        : `Está **antes del punto medio**: queda más cerca de $${texDec(lv.loText)}$. $${texDec(dec)} \\approx ${texDec(lv.result)}$.`,
    ]),
    `La recta y la regla de siempre coinciden: la primera cifra que se **suprime** decide. Si es **5 o más**, la anterior sube una unidad; si no, se queda.`,
  ];
  const summary = captions.length - 1;
  const CELL = 40;
  const chars = Array.from(`${d.int},${d.frac}`);
  const startX = 300;

  return {
    label: `Redondear ${dec}: ${info.map((l) => `a las ${NAMES[l.u]} ${l.result}`).join(", ")}`,
    captions,
    beatMs: 3400,
    render: (beat) => (
      <Canvas>
        <g className="anim-t" style={{ opacity: beat >= summary ? 0 : 1 }}>
          {info.map((lv, i) => {
            const y = ys[i]!;
            const shown = beat >= 2 * i;
            const decided = beat >= 2 * i + 1;
            const xDot = tickX(lv.t * 10);
            const xTarget = lv.up ? X1 : X0;
            return (
              <g key={lv.u}>
                <Fade show={shown} dy={-8}>
                  <Txt x={20} y={y + 6} size={21} color={MANIM.blue} anchor="start">
                    {NAMES[lv.u]}
                  </Txt>
                  <line x1={X0 - 16} y1={y} x2={X1 + 16} y2={y} stroke={MANIM.grid} strokeWidth={4} strokeLinecap="round" />
                  {Array.from({ length: 11 }, (_, t) => (
                    <line key={t} x1={tickX(t)} y1={y - (t % 10 === 0 ? 14 : 8)} x2={tickX(t)} y2={y + (t % 10 === 0 ? 14 : 8)} stroke={t % 10 === 0 ? MANIM.ink : MANIM.muted} strokeWidth={t % 10 === 0 ? 4 : 2.5} strokeLinecap="round" />
                  ))}
                  <line x1={tickX(5)} y1={y - 30} x2={tickX(5)} y2={y + 14} stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray="6 6" />
                  <Txt x={tickX(5)} y={y + 40} size={18} color={MANIM.orange} weight={500}>
                    punto medio
                  </Txt>
                  <circle cx={xDot} cy={y} r={10} fill={MANIM.yellow} stroke={MANIM.surface} strokeWidth={3} />
                  <Txt x={xDot + (lv.t > 0.5 ? -16 : 16)} y={y - 20} size={22} color={MANIM.yellow} anchor={lv.t > 0.5 ? "end" : "start"}>
                    {dec}
                  </Txt>
                  <Txt x={X0} y={y + 40} size={22} color={MANIM.muted}>
                    {lv.loText}
                  </Txt>
                  <Txt x={X1} y={y + 40} size={22} color={MANIM.muted}>
                    {lv.hiText}
                  </Txt>
                </Fade>
                <Fade show={decided} dy={-4}>
                  <circle cx={xTarget} cy={y} r={20} fill="rgba(131,193,103,0.15)" stroke={MANIM.green} strokeWidth={3} />
                  <Txt x={xTarget} y={y + 74} size={28} color={MANIM.green}>
                    {`≈ ${lv.result}`}
                  </Txt>
                </Fade>
              </g>
            );
          })}
        </g>

        {/* resumen: la cifra que decide */}
        <Fade show={beat >= summary} dy={10}>
          {info.map((lv, i) => {
            const y = levels === 1 ? 210 : levels === 2 ? 160 + i * 110 : 120 + i * 100;
            return (
              <g key={lv.u}>
                <Txt x={24} y={y} size={22} color={MANIM.blue} anchor="start">
                  {NAMES[lv.u]}
                </Txt>
                {chars.map((c, j) => {
                  const intPart = j < d.int.length;
                  const isComma = j === d.int.length;
                  const fracIdx = j - d.int.length - 1;
                  const kept = intPart || (!isComma && fracIdx < lv.u);
                  const decisive = !intPart && !isComma && fracIdx === lv.u;
                  const x = startX + j * CELL;
                  return (
                    <g key={j}>
                      {decisive ? <rect x={x - CELL / 2 + 2} y={y - 38} width={CELL - 4} height={52} rx={8} fill="rgba(255,216,102,0.18)" stroke={MANIM.yellow} strokeWidth={2.5} /> : null}
                      <Txt x={x} y={y} size={40} color={kept || (isComma && lv.u > 0) ? MANIM.green : decisive ? MANIM.yellow : MANIM.muted} mono>
                        {c}
                      </Txt>
                    </g>
                  );
                })}
                <Txt x={startX + chars.length * CELL + 30} y={y} size={34} color={MANIM.ink} anchor="start">
                  {`${lv.cut} ${lv.up ? "≥" : "<"} 5  →  ${lv.result}`}
                </Txt>
              </g>
            );
          })}
        </Fade>
      </Canvas>
    ),
  };
}
