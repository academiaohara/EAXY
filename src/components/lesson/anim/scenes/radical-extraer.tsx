import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { factorPowers, simplifyRadical } from "@/components/lesson/anim/radicals";
import type { AnimBuild } from "@/components/lesson/anim/types";

const R = 22;
const COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple, MANIM.yellow, MANIM.red];

/** Extraer factores de un radical: cada grupo de `índice` factores iguales deja un factor fuera. */
export function buildRadicalExtraer(params: { a?: number; b?: number }): AnimBuild {
  const n = Math.min(Math.max(Math.round(params.a ?? 720), 4), 2000);
  const index = Math.min(Math.max(Math.round(params.b ?? 2), 2), 4);
  const powers = factorPowers(n);
  const { k, m } = simplifyRadical(n, index);
  type Tok = { p: number; color: string; kind: "out" | "drop" | "stay"; x: number };
  const toks: Tok[] = [];
  const count = powers.reduce((s, [, e]) => s + e, 0);
  const STEP = Math.min(56, 640 / Math.max(count, 1));
  const startX = 400 - ((count - 1) * STEP) / 2;
  let i = 0;
  powers.forEach(([p, e], pi) => {
    const full = Math.floor(e / index);
    for (let t = 0; t < e; t += 1) {
      const inGroup = t < full * index;
      const first = inGroup && t % index === 0;
      toks.push({ p, color: COLORS[pi % COLORS.length]!, kind: inGroup ? (first ? "out" : "drop") : "stay", x: startX + i * STEP });
      i += 1;
    }
  });
  const outs = toks.filter((t) => t.kind === "out");
  const stays = toks.filter((t) => t.kind === "stay");
  const rootSign = index === 2 ? "√" : `${index}√`;
  const result = m === 1 ? `${k}` : `${k === 1 ? "" : k}${rootSign}${m}`;
  const Y = 190;

  return {
    label: `${rootSign}${n} = ${result}`,
    captions: [
      `Queremos simplificar $\\sqrt${index === 2 ? "" : `[${index}]`}{${n}}$ sacando todos los factores que se pueda.`,
      `Primero **descomponemos** ${n} en factores primos: $${n} = ${powers.map(([p, e]) => (e === 1 ? `${p}` : `${p}^{${e}}`)).join(" \\cdot ")}$.`,
      `Agrupamos los factores **iguales de ${index} en ${index}**: cada grupo completo puede salir.`,
      `De cada grupo sale **un** factor. Lo que no forma grupo se queda dentro de la raíz.`,
      `Resultado: $\\sqrt${index === 2 ? "" : `[${index}]`}{${n}} = ${m === 1 ? k : `${k === 1 ? "" : k}\\sqrt${index === 2 ? "" : `[${index}]`}{${m}}`}$.`,
    ],
    beatMs: 4200,
    render: (beat) => {
      const ST = 52;
      const outsW = outs.length * ST;
      const radW = stays.length > 0 ? 64 : 0;
      const staysW = stays.length * ST;
      const total = outsW + radW + staysW;
      const left = 400 - total / 2;
      const outX = (i: number) => left + i * ST + ST / 2;
      const radX = left + outsW + 8;
      const stayX = (i: number) => left + outsW + radW + i * ST + ST / 2;
      const Y2 = 270;
      let stayIdx = -1;
      return (
        <Canvas>
          <Fade show={beat === 0}>
            <Txt x={400} y={210} size={72} color={MANIM.ink}>{`${rootSign}${n}`}</Txt>
          </Fade>
          {toks.map((t, idx) => {
            if (t.kind === "stay") stayIdx += 1;
            const moved = beat >= 3 && t.kind === "stay";
            return (
              <g key={idx}>
                <Fade show={beat >= 1 && (beat < 3 || t.kind === "stay")} dy={12} delay={idx * 80}>
                  <Move x={moved ? stayX(stayIdx) - t.x : 0} y={moved ? Y2 - Y : 0}>
                    <circle cx={t.x} cy={Y} r={R} fill={MANIM.panel} stroke={t.color} strokeWidth={3} />
                    <Txt x={t.x} y={Y + 8} size={22} color={t.color}>{t.p}</Txt>
                  </Move>
                </Fade>
              </g>
            );
          })}
          <Fade show={beat === 2}>
            {(() => {
              const groups: { x1: number; x2: number; color: string }[] = [];
              let idx2 = 0;
              powers.forEach(([, e], pi) => {
                const full = Math.floor(e / index);
                for (let gi = 0; gi < full; gi += 1) {
                  groups.push({ x1: startX + (idx2 + gi * index) * STEP - R - 4, x2: startX + (idx2 + gi * index + index - 1) * STEP + R + 4, color: COLORS[pi % COLORS.length]! });
                }
                idx2 += e;
              });
              return groups.map((g, gi) => (
                <rect key={gi} x={g.x1} y={Y - R - 8} width={g.x2 - g.x1} height={2 * R + 16} rx={14} fill="none" stroke={g.color} strokeWidth={3} strokeDasharray="6 5" />
              ));
            })()}
          </Fade>
          <Fade show={beat >= 3} dy={14}>
            {outs.map((t, idx) => (
              <g key={idx}>
                <circle cx={outX(idx)} cy={Y2} r={R} fill={MANIM.panel} stroke={t.color} strokeWidth={3} />
                <Txt x={outX(idx)} y={Y2 + 8} size={22} color={t.color}>{t.p}</Txt>
              </g>
            ))}
            {stays.length > 0 ? (
              <g>
                <Txt x={radX + 20} y={Y2 + 24} size={80} color={MANIM.ink}>√</Txt>
                <line x1={radX + 38} y1={Y2 - 32} x2={stayX(stays.length - 1) + R + 8} y2={Y2 - 32} stroke={MANIM.ink} strokeWidth={4} />
              </g>
            ) : null}
          </Fade>
          <Fade show={beat >= 4} dy={14}>
            <Txt x={400} y={376} size={52} color={MANIM.yellow}>{`${rootSign}${n} = ${result}`}</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
