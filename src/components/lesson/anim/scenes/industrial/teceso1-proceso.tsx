import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Fases del proyecto tecnológico (con vuelta atrás) ───────────── */

const FASES = [
  { t: "1 Problema", c: MANIM.red, x: 110, y: 130 },
  { t: "2 Información", c: MANIM.orange, x: 310, y: 130 },
  { t: "3 Diseño", c: MANIM.yellow, x: 510, y: 130 },
  { t: "4 Planificación", c: MANIM.green, x: 710, y: 130 },
  { t: "5 Construcción", c: MANIM.blue, x: 610, y: 300 },
  { t: "6 Evaluación", c: MANIM.purple, x: 410, y: 300 },
  { t: "7 Mejora", c: MANIM.muted, x: 210, y: 300 },
];

export function buildFasesProyectoEso(): AnimBuild {
  return {
    label: "Fases del proyecto tecnológico: del problema a la mejora, volviendo atrás cuando hace falta",
    beatMs: 5200,
    captions: [
      "Un **proyecto tecnológico** es un camino ordenado para resolver un problema. Son siete fases, y se puede volver atrás.",
      "**1. Problema**: se detecta una necesidad y se define qué hay que resolver, para quién y con qué límites.",
      "**2. Información**: se investigan objetos parecidos, materiales y soluciones que ya existen.",
      "**3. Diseño**: se piensan varias ideas, se dibuja un boceto y se elige la mejor.",
      "**4. Planificación**: se decide qué materiales, herramientas, tareas, tiempos y presupuesto hacen falta.",
      "**5. Construcción**: se fabrica el prototipo siguiendo el plan y las normas de seguridad.",
      "**6. Evaluación**: se prueba y se comprueba si resuelve el problema y cumple los requisitos.",
      "**7. Mejora**: se anotan los fallos y se vuelve a la fase que corresponda. Cada vuelta mejora el producto.",
    ],
    render: (beat) => (
      <Canvas>
        {FASES.map((f, i) => {
          const sig = FASES[i + 1];
          return (
            <g key={f.t}>
              <Box x={f.x} y={f.y} w={165} h={70} color={f.c} label={f.t} size={18} active={beat === 0 || beat === i + 1} />
              {sig && i !== 3 ? <Arrow x1={f.x + (sig.x > f.x ? 86 : -86)} y1={f.y} x2={sig.x + (sig.x > f.x ? -86 : 86)} y2={sig.y} color={MANIM.muted} width={3} /> : null}
            </g>
          );
        })}
        <Arrow x1={710} y1={168} x2={640} y2={265} color={MANIM.muted} width={3} />
        <Fade show={beat === 7}>
          <Arrow x1={170} y1={268} x2={115} y2={170} color={MANIM.yellow} width={4} />
          <Txt x={400} y={395} size={20} color={MANIM.yellow}>
            si no funciona bien: vuelve a diseñar, planificar o construir
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Ciencia, técnica, tecnología e ingeniería ───────────── */

export function buildCienciaTecnicaTecnologia(): AnimBuild {
  const cols = [
    { x: 105, t: "Ciencia", s: "explica por qué", e: "¿Por qué un arco aguanta peso?", c: MANIM.blue },
    { x: 290, t: "Técnica", s: "sabe cómo hacerlo", e: "Colocar las piedras en el orden correcto", c: MANIM.orange },
    { x: 475, t: "Tecnología", s: "aplica ciencia y técnica", e: "Resolver un problema: cruzar un río", c: MANIM.green },
    { x: 660, t: "Ingeniería", s: "diseña y calcula", e: "Planificar el puente completo", c: MANIM.purple },
  ];
  return {
    label: "Ciencia, técnica, tecnología e ingeniería, a partir de un puente",
    beatMs: 5400,
    captions: [
      "Cuatro palabras que se confunden. Las vemos con un ejemplo: **construir un puente**.",
      "**Ciencia**: busca conocimiento y explica los fenómenos. Responde a «¿por qué?» (cómo se reparten las fuerzas en un arco).",
      "**Técnica**: conjunto de procedimientos y habilidades para hacer algo (tallar y encajar piedras). Puede existir sin explicación científica.",
      "**Tecnología**: usa ciencia y técnica para resolver necesidades de las personas. Responde a «¿cómo resuelvo este problema?».",
      "**Ingeniería**: la profesión que diseña, calcula y dirige la construcción de soluciones tecnológicas complejas.",
    ],
    render: (beat) => (
      <Canvas>
        {cols.map((c, i) => (
          <g key={c.t}>
            <Box x={c.x} y={150} w={160} h={80} color={c.c} label={c.t} size={22} active={beat === 0 || beat === i + 1} />
            <Txt x={c.x} y={225} size={15} color={MANIM.muted}>
              {c.s}
            </Txt>
            <Fade show={beat === i + 1} dy={10}>
              <rect x={c.x - 82} y={265} width={164} height={74} rx={10} fill={c.c} fillOpacity={0.15} stroke={c.c} strokeWidth={2.5} />
              <Txt x={c.x} y={308} size={15} color={MANIM.ink}>
                {c.e.length > 26 ? c.e.slice(0, c.e.lastIndexOf(" ", 26)) : c.e}
              </Txt>
              {c.e.length > 26 ? (
                <Txt x={c.x} y={328} size={15} color={MANIM.ink}>
                  {c.e.slice(c.e.lastIndexOf(" ", 26) + 1)}
                </Txt>
              ) : null}
            </Fade>
          </g>
        ))}
        <Fade show={beat >= 3}>
          <Txt x={197} y={162} size={28} color={MANIM.yellow}>
            +
          </Txt>
          <Txt x={382} y={162} size={28} color={MANIM.yellow}>
            →
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
