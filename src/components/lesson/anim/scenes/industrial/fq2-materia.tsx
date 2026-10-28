import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const BW = 200;
const BH = 190;
const BY = 80;
const BXS = [60, 300, 540];
const COLORES = [MANIM.orange, MANIM.blue, MANIM.purple];

const semilla = (n: number): Pt[] => Array.from({ length: n }, (_, i) => [((i * 37 + 11) % 97) / 97, ((i * 61 + 23) % 89) / 89] as Pt);

/** Partículas de cada estado dentro de una caja de origen (x0, BY). */
function particulas(estado: 0 | 1 | 2, x0: number): { p: Pt; flecha: Pt }[] {
  if (estado === 0) {
    return Array.from({ length: 24 }, (_, i) => ({ p: [x0 + 28 + (i % 6) * 29, BY + BH - 30 - Math.floor(i / 6) * 29] as Pt, flecha: [0, 0] as Pt }));
  }
  if (estado === 1) {
    return semilla(18).map((s, i) => ({ p: [x0 + 16 + s[0] * (BW - 32), BY + BH * 0.42 + 16 + s[1] * (BH * 0.58 - 32)] as Pt, flecha: [Math.cos(i * 2.3) * 12, Math.sin(i * 2.3) * 12] as Pt }));
  }
  return semilla(12).map((s, i) => ({ p: [x0 + 14 + s[0] * (BW - 28), BY + 14 + s[1] * (BH - 28)] as Pt, flecha: [Math.cos(i * 2.3) * 30, Math.sin(i * 2.3) * 30] as Pt }));
}

export function buildParticulasEstados(): AnimBuild {
  return {
    label: "Cómo están las partículas en un sólido, un líquido y un gas",
    beatMs: 5400,
    captions: [
      "Toda la materia está formada por **partículas** en movimiento, con **espacios** entre ellas. Veamos cómo se colocan en cada **estado**.",
      "En un **sólido** las partículas están **muy juntas y ordenadas**. Solo **vibran** en su sitio: por eso tiene **forma y volumen propios**.",
      "En un **líquido** siguen **juntas**, pero **desordenadas**: se **deslizan** unas sobre otras. Tiene volumen propio y **toma la forma del recipiente**.",
      "En un **gas** están **muy separadas** y se mueven **libres y deprisa**, en todas direcciones: **ocupa todo el recipiente** y se puede **comprimir**.",
      "Al **calentar**, las partículas **ganan energía** y se mueven más deprisa: así se pasa de sólido a líquido y de líquido a gas.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <Txt x={400} y={210} size={30} color={MANIM.ink}>¿Cómo están las partículas en cada estado?</Txt>
        </Fade>
        {[0, 1, 2].map((e) => {
          const x0 = BXS[e]!;
          return (
            <Fade key={e} show={beat >= e + 1}>
              <rect x={x0} y={BY} width={BW} height={BH} fill="none" stroke={MANIM.ink} strokeWidth={3} />
              {particulas(e as 0 | 1 | 2, x0).map((q, i) => (
                <g key={i}>
                  {beat >= 3 || e === 2 || e === 1 ? <Seg a={q.p} b={[q.p[0] + q.flecha[0], q.p[1] + q.flecha[1]]} color={COLORES[e]!} width={2} /> : null}
                  <circle cx={q.p[0]} cy={q.p[1]} r={8} fill={COLORES[e]} fillOpacity={0.9} />
                </g>
              ))}
              <Txt x={x0 + BW / 2} y={BY + BH + 34} size={24} color={COLORES[e]!}>{["Sólido", "Líquido", "Gas"][e]!}</Txt>
            </Fade>
          );
        })}
        <Fade show={beat >= 4}>
          <path d="M 270 40 L 540 40" stroke={MANIM.red} strokeWidth={4} />
          <path d="M 528 28 L 544 40 L 528 52" fill="none" stroke={MANIM.red} strokeWidth={4} />
          <path d="M 60 40 L 270 40" stroke={MANIM.red} strokeWidth={4} />
          <Txt x={400} y={26} size={20} color={MANIM.red}>más energía → más agitación</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
