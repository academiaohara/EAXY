import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Lazo abierto y lazo cerrado ───────────── */

export function buildLazoCerradoEso3(): AnimBuild {
  return {
    label: "Control en lazo abierto y en lazo cerrado con realimentación",
    beatMs: 5600,
    captions: [
      "Un sistema de control tiene una **entrada** (lo que queremos), un **controlador**, un **actuador** y una **salida** (lo que ocurre de verdad).",
      "En **lazo abierto** el controlador actúa **sin mirar el resultado**. Ejemplo: una tostadora con temporizador, que tuesta lo mismo con pan fino o grueso.",
      "Si aparece una **perturbación** (más frío, pan más grueso), el lazo abierto **no la corrige**: la salida se desvía de lo deseado.",
      "En **lazo cerrado** un **sensor** mide la salida y la envía de vuelta: es la **realimentación** (feedback).",
      "Un **comparador** resta la consigna y lo medido; con el **error** el controlador corrige. Así actúa un termostato: mantiene la temperatura aunque cambien las condiciones.",
    ],
    render: (beat) => {
      const cerrado = beat >= 3;
      return (
        <Canvas>
          <Box x={110} y={130} w={140} h={60} color={MANIM.blue} label="Entrada" />
          <Box x={300} y={130} w={160} h={60} color={MANIM.yellow} label="Controlador" />
          <Box x={500} y={130} w={140} h={60} color={MANIM.green} label="Actuador" />
          <Box x={690} y={130} w={120} h={60} color={MANIM.orange} label="Salida" />
          <Arrow x1={182} y1={130} x2={218} y2={130} color={MANIM.muted} width={4} />
          <Arrow x1={382} y1={130} x2={428} y2={130} color={MANIM.muted} width={4} />
          <Arrow x1={572} y1={130} x2={628} y2={130} color={MANIM.muted} width={4} />
          <Fade show={beat === 1}>
            <Txt x={400} y={230} size={24} color={MANIM.yellow}>
              sin mirar el resultado (ej.: temporizador)
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Arrow x1={500} y1={40} x2={500} y2={95} color={MANIM.red} width={6} />
            <Txt x={500} y={30} size={22} color={MANIM.red}>
              perturbación
            </Txt>
            <Txt x={400} y={260} size={24} color={MANIM.red}>
              la salida se desvía y nadie lo corrige
            </Txt>
          </Fade>
          <Fade show={cerrado}>
            <polyline points="690,165 690,300 110,300 110,165" fill="none" stroke={MANIM.purple} strokeWidth={5} />
            <Arrow x1={110} y1={240} x2={110} y2={168} color={MANIM.purple} width={5} />
            <Txt x={400} y={330} size={24} color={MANIM.purple}>
              sensor → realimentación
            </Txt>
          </Fade>
          <Fade show={beat === 4}>
            <Txt x={110} y={85} size={22} color={MANIM.blue}>
              consigna − medida = error
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
