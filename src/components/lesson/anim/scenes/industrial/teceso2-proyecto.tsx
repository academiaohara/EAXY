import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── El proyecto como ciclo de mejora ───────────── */

const NODOS = [
  { t: "Necesidad", x: 130, y: 110, c: MANIM.blue },
  { t: "Ideas", x: 330, y: 60, c: MANIM.green },
  { t: "Diseño", x: 540, y: 110, c: MANIM.yellow },
  { t: "Prototipo", x: 540, y: 270, c: MANIM.orange },
  { t: "Pruebas", x: 330, y: 330, c: MANIM.purple },
] as const;

export function buildCicloDiseno(): AnimBuild {
  return {
    label: "El proyecto tecnológico es un ciclo: necesidad, ideas, diseño, prototipo, pruebas y mejora",
    beatMs: 5600,
    captions: [
      "Todo proyecto empieza con una **necesidad** o un problema: ¿qué hay que resolver y para quién? Se concretan los **requisitos**.",
      "Se generan **muchas ideas** (lluvia de ideas, SCAMPER) y después se **elige** la mejor con criterios.",
      "La idea elegida se convierte en un **diseño**: bocetos, planos, lista de materiales y plan de trabajo.",
      "Se construye un **prototipo**, una primera versión para probar la idea sin gastar demasiado.",
      "Se **prueba** el prototipo frente a los requisitos. Lo que falla se **mejora**, y el ciclo vuelve a empezar: así se llega a un buen producto.",
    ],
    render: (beat) => (
      <Canvas>
        {NODOS.map((n, i) => (
          <Box key={n.t} x={n.x} y={n.y} w={170} h={60} color={n.c} label={n.t} active={i === beat} />
        ))}
        {[[0, 1], [1, 2], [2, 3], [3, 4]].map(([a, b]) => (
          <Arrow key={`${a}-${b}`} x1={NODOS[a]!.x + (NODOS[b]!.x - NODOS[a]!.x) * 0.38} y1={NODOS[a]!.y + (NODOS[b]!.y - NODOS[a]!.y) * 0.38} x2={NODOS[a]!.x + (NODOS[b]!.x - NODOS[a]!.x) * 0.62} y2={NODOS[a]!.y + (NODOS[b]!.y - NODOS[a]!.y) * 0.62} color={MANIM.muted} width={4} />
        ))}
        <Fade show={beat === 4}>
          <Arrow x1={250} y1={310} x2={150} y2={150} color={MANIM.red} width={6} />
          <Txt x={110} y={250} size={26} color={MANIM.red}>
            mejora
          </Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Txt x={130} y={175} size={20} color={MANIM.blue}>
            requisitos
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
