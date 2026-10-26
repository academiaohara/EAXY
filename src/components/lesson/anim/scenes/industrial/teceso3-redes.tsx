import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Cómo viaja un mensaje por Internet ───────────── */

export function buildRutaPaquetes(): AnimBuild {
  const R = [
    { x: 330, y: 70 },
    { x: 330, y: 190 },
    { x: 330, y: 310 },
    { x: 480, y: 130 },
    { x: 480, y: 250 },
  ];
  return {
    label: "Un mensaje se trocea en paquetes que viajan por rutas distintas y se recomponen",
    beatMs: 5600,
    captions: [
      "Un archivo o un mensaje de **Internet** no viaja entero: **se trocea en paquetes** pequeños, cada uno con una **cabecera** (origen, destino y número de orden).",
      "Cada paquete entra en la red por tu **router** y llega al primer **router** de la red de tu operador.",
      "Los **routers** deciden en cada salto **por dónde enviar** cada paquete. Los paquetes pueden seguir **rutas distintas**.",
      "Si un enlace está saturado o roto, los paquetes **toman otro camino**: por eso Internet es robusta.",
      "El equipo de destino **ordena los paquetes** por su número y **recompone** el mensaje. Si falta alguno, **lo pide de nuevo**.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={110} y={190} w={140} h={60} color={MANIM.blue} label="Origen" />
        <Box x={700} y={190} w={140} h={60} color={MANIM.green} label="Destino" />
        {R.map((r, i) => (
          <g key={i}>
            <circle cx={r.x} cy={r.y} r={24} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={r.x} y={r.y + 5} size={14} color={MANIM.yellow}>
              R{i + 1}
            </Txt>
          </g>
        ))}
        {[[0, 3], [1, 3], [1, 4], [2, 4]].map(([a, b]) => (
          <line key={`${a}${b}`} x1={R[a]!.x} y1={R[a]!.y} x2={R[b]!.x} y2={R[b]!.y} stroke={MANIM.muted} strokeWidth={2} />
        ))}
        {[3, 4].map((i) => (
          <line key={i} x1={R[i]!.x} y1={R[i]!.y} x2={650} y2={190} stroke={MANIM.muted} strokeWidth={2} />
        ))}
        {R.slice(0, 3).map((r, i) => (
          <line key={i} x1={175} y1={190} x2={r.x} y2={r.y} stroke={MANIM.muted} strokeWidth={2} />
        ))}
        <Fade show={beat === 0}>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={50 + k * 24} y={130} width={20} height={20} rx={3} fill={[MANIM.red, MANIM.orange, MANIM.yellow, MANIM.green][k]} />
          ))}
          <Txt x={110} y={115} size={18} color={MANIM.ink}>
            4 paquetes
          </Txt>
        </Fade>
        <Fade show={beat === 2 || beat === 3}>
          <Arrow x1={190} y1={185} x2={300} y2={75} color={MANIM.red} width={5} />
          <Arrow x1={354} y1={80} x2={456} y2={125} color={MANIM.red} width={5} />
          <Arrow x1={190} y1={195} x2={300} y2={305} color={MANIM.green} width={5} />
          <Arrow x1={354} y1={300} x2={456} y2={255} color={MANIM.green} width={5} />
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={30} size={20} color={MANIM.orange}>
            enlace caído → otra ruta
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          {[0, 1, 2, 3].map((k) => (
            <rect key={k} x={640 + k * 24} y={130} width={20} height={20} rx={3} fill={[MANIM.red, MANIM.orange, MANIM.yellow, MANIM.green][k]} />
          ))}
          <Txt x={700} y={115} size={18} color={MANIM.ink}>
            1 · 2 · 3 · 4
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
