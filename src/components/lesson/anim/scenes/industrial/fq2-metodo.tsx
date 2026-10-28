import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const PASOS = [
  { t: "Observación", d: "¿Qué pasa?", c: MANIM.blue },
  { t: "Hipótesis", d: "Posible explicación", c: MANIM.green },
  { t: "Experimento", d: "Cambiar una variable", c: MANIM.orange },
  { t: "Análisis", d: "Tablas y gráficas", c: MANIM.purple },
  { t: "Conclusión", d: "¿Se cumple?", c: MANIM.yellow },
];
const W = 130;
const H = 90;
const GAP = 30;
const X0 = (800 - (PASOS.length * W + (PASOS.length - 1) * GAP)) / 2;
const Y = 140;

export function buildMetodoCientifico(): AnimBuild {
  return {
    label: "Etapas del método científico y cómo se repite",
    beatMs: 5200,
    captions: [
      "Todo empieza con una **observación**: algo llama la atención y surge una **pregunta**.",
      "Se propone una **hipótesis**: una explicación **comprobable** de lo observado.",
      "Se diseña un **experimento** en el que se cambia **una variable** y se mantienen **controladas** las demás.",
      "Los datos se organizan en **tablas** y **gráficas** y se **analizan**, teniendo en cuenta los **errores**.",
      "La **conclusión** dice si la hipótesis se **confirma** o se **rechaza**; los resultados se **comunican**.",
      "Si no se confirma, se **corrige la hipótesis** y se repite: la ciencia es un proceso **abierto** y en revisión continua.",
    ],
    render: (beat) => (
      <Canvas>
        {PASOS.map((p, i) => {
          const x = X0 + i * (W + GAP);
          return (
            <Fade key={p.t} show={beat >= i}>
              <rect x={x} y={Y} width={W} height={H} rx={14} fill={p.c} fillOpacity={0.18} stroke={p.c} strokeWidth={3.5} />
              <Txt x={x + W / 2} y={Y + 42} size={19} color={p.c}>{p.t}</Txt>
              <Txt x={x + W / 2} y={Y + 68} size={14} color={MANIM.muted} weight={500}>{p.d}</Txt>
              <Txt x={x + W / 2} y={Y - 12} size={20} color={p.c}>{String(i + 1)}</Txt>
              {i > 0 ? <path d={`M ${x - GAP + 4} ${Y + H / 2} L ${x - 6} ${Y + H / 2}`} stroke={MANIM.ink} strokeWidth={3} markerEnd="none" /> : null}
              {i > 0 ? <path d={`M ${x - 12} ${Y + H / 2 - 7} L ${x - 4} ${Y + H / 2} L ${x - 12} ${Y + H / 2 + 7}`} fill="none" stroke={MANIM.ink} strokeWidth={3} /> : null}
            </Fade>
          );
        })}
        <Fade show={beat >= 5}>
          <path d={`M ${X0 + 4 * (W + GAP) + W / 2} ${Y + H + 6} L ${X0 + 4 * (W + GAP) + W / 2} ${Y + H + 70} L ${X0 + 2 * (W + GAP) + W / 2} ${Y + H + 70} L ${X0 + 1 * (W + GAP) + W / 2} ${Y + H + 70} L ${X0 + 1 * (W + GAP) + W / 2} ${Y + H + 8}`} fill="none" stroke={MANIM.red} strokeWidth={3} strokeDasharray="9 7" />
          <path d={`M ${X0 + 1 * (W + GAP) + W / 2 - 8} ${Y + H + 20} L ${X0 + 1 * (W + GAP) + W / 2} ${Y + H + 6} L ${X0 + 1 * (W + GAP) + W / 2 + 8} ${Y + H + 20}`} fill="none" stroke={MANIM.red} strokeWidth={3} />
          <Txt x={400} y={Y + H + 100} size={20} color={MANIM.red}>si no se confirma: nueva hipótesis</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
