import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── El proceso de diseño es un ciclo ───────────── */

export function buildProcesoDisenoCiclo(): AnimBuild {
  return {
    label: "Proceso de diseño: de la necesidad al prototipo, con una vuelta atrás cuando el ensayo no cumple",
    beatMs: 5600,
    captions: [
      "Todo proyecto parte de una **necesidad** o un problema concreto de unos usuarios. Si no está bien definido, lo demás se construye sobre arena.",
      "Se **investiga** lo que ya existe, se **generan ideas** y se traducen en **requisitos** medibles. Aquí se decide qué significa «cumplir».",
      "Se construye un **prototipo** (físico o virtual) y se **ensaya** contra los requisitos: no se opina, se mide.",
      "Si el ensayo **no cumple**, se vuelve atrás: se corrige la idea o los requisitos. El diseño es **iterativo**, no una línea recta.",
      "Cuando cumple, se **documenta** (memoria, planos, lista de materiales) para que otros puedan fabricar, mejorar o comprobar la solución.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={110} y={110} w={150} h={62} color={MANIM.blue} label="Necesidad" active={beat === 0 || beat >= 1} />
        <Fade show={beat >= 1}>
          <Arrow x1={190} y1={110} x2={250} y2={110} color={MANIM.muted} width={3} />
          <Box x={330} y={110} w={150} h={62} color={MANIM.green} label="Investigar" />
          <Arrow x1={410} y1={110} x2={470} y2={110} color={MANIM.muted} width={3} />
          <Box x={550} y={110} w={150} h={62} color={MANIM.yellow} label="Ideas" />
          <Arrow x1={630} y1={110} x2={690} y2={110} color={MANIM.muted} width={3} />
          <Box x={730} y={110} w={90} h={62} color={MANIM.orange} label="Requisitos" size={15} />
        </Fade>
        <Fade show={beat >= 2} dy={14}>
          <Arrow x1={730} y1={142} x2={640} y2={268} color={MANIM.muted} width={3} />
          <Box x={600} y={300} w={150} h={62} color={MANIM.purple} label="Prototipo" />
          <Arrow x1={525} y1={300} x2={465} y2={300} color={MANIM.muted} width={3} />
          <Box x={385} y={300} w={150} h={62} color={MANIM.red} label="Ensayo" />
        </Fade>
        <Fade show={beat === 3} dy={10}>
          <path d="M 385 268 C 385 200 550 190 550 143" fill="none" stroke={MANIM.red} strokeWidth={4} strokeDasharray="8 6" />
          <Arrow x1={550} y1={160} x2={550} y2={143} color={MANIM.red} width={4} />
          <Txt x={300} y={215} size={19} color={MANIM.red}>
            ¿cumple? No → mejorar
          </Txt>
        </Fade>
        <Fade show={beat >= 4} dy={14}>
          <Arrow x1={310} y1={300} x2={250} y2={300} color={MANIM.green} width={4} />
          <Box x={170} y={300} w={150} h={62} color={MANIM.green} label="Memoria" />
          <Txt x={300} y={355} size={19} color={MANIM.green}>
            cumple → documentar
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Gantt y camino crítico ───────────── */

const GT = [
  { id: "A", n: "Investigar", s: 0, d: 3 },
  { id: "B", n: "Diseñar", s: 3, d: 4 },
  { id: "C", n: "Comprar", s: 3, d: 2 },
  { id: "D", n: "Construir", s: 7, d: 5 },
  { id: "E", n: "Ensayar", s: 12, d: 3 },
  { id: "F", n: "Documentar", s: 7, d: 4 },
];
const CRIT = new Set(["A", "B", "D", "E"]);

export function buildGanttCaminoCritico(): AnimBuild {
  const X = (d: number) => 190 + d * 38;
  const Y = (i: number) => 60 + i * 52;
  return {
    label: "Diagrama de Gantt: tareas, dependencias, camino crítico y holgura",
    beatMs: 5600,
    captions: [
      "Un **diagrama de Gantt** coloca cada tarea en el tiempo: la longitud de la barra es su duración. Empieza **Investigar** (3 días).",
      "Las **dependencias** mandan: *Diseñar* y *Comprar* solo empiezan al acabar *Investigar*; *Construir* necesita ambas.",
      "El **camino crítico** es la cadena más larga sin holgura: A → B → D → E (15 días). Si una de ellas se retrasa, **se retrasa el proyecto**.",
      "*Comprar* tiene **2 días de holgura** y *Documentar* **4**: pueden alargarse hasta ese margen sin mover la fecha final.",
    ],
    render: (beat) => (
      <Canvas>
        {Array.from({ length: 17 }, (_, d) => (
          <g key={d}>
            <line x1={X(d)} y1={36} x2={X(d)} y2={366} stroke={MANIM.grid} strokeWidth={0.8} />
            {d % 3 === 0 ? (
              <Txt x={X(d)} y={392} size={14} color={MANIM.muted}>
                {d}
              </Txt>
            ) : null}
          </g>
        ))}
        {GT.map((t, i) => {
          const show = beat >= 1 || t.id === "A";
          const crit = beat >= 2 && CRIT.has(t.id);
          const holg = beat >= 3 && !CRIT.has(t.id);
          return (
            <g key={t.id}>
              <Fade show={show} dx={-10}>
                <Txt x={180} y={Y(i) + 22} size={16} color={MANIM.muted} anchor="end">
                  {t.id}. {t.n}
                </Txt>
                <rect x={X(t.s)} y={Y(i)} width={t.d * 38} height={30} rx={5} fill={crit ? MANIM.red : MANIM.blue} fillOpacity={0.85} className="anim-t" />
              </Fade>
              <Fade show={holg}>
                <rect x={X(t.s + t.d)} y={Y(i) + 8} width={(t.id === "C" ? 2 : 4) * 38} height={14} rx={3} fill="none" stroke={MANIM.green} strokeWidth={2.5} strokeDasharray="5 4" />
              </Fade>
            </g>
          );
        })}
        <Fade show={beat === 1}>
          <Arrow x1={X(3)} y1={Y(0) + 15} x2={X(3) + 2} y2={Y(1) + 2} color={MANIM.yellow} width={3} />
          <Arrow x1={X(7)} y1={Y(1) + 30} x2={X(7) + 2} y2={Y(3) + 2} color={MANIM.yellow} width={3} />
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={X(15)} y1={36} x2={X(15)} y2={366} stroke={MANIM.red} strokeWidth={3} strokeDasharray="6 5" />
          <Txt x={X(15)} y={28} size={16} color={MANIM.red}>
            fin: día 15
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={X(14.2)} y={Y(2) + 22} size={15} color={MANIM.green} anchor="end">
            holgura 2 d
          </Txt>
          <Txt x={X(14.2)} y={Y(5) + 22} size={15} color={MANIM.green} anchor="end">
            holgura 4 d
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
