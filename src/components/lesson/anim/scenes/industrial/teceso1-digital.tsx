import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Capas de un dispositivo digital ───────────── */

export function buildCapasEntornoDigital(): AnimBuild {
  const capas = [
    { t: "Usuario", s: "tú, con tus archivos y tus cuentas", c: MANIM.green, y: 60 },
    { t: "Aplicaciones", s: "navegador, procesador de textos, apps", c: MANIM.blue, y: 140 },
    { t: "Sistema operativo", s: "gestiona el equipo y los archivos", c: MANIM.purple, y: 220 },
    { t: "Hardware", s: "procesador, memoria, disco, pantalla", c: MANIM.orange, y: 300 },
  ];
  return {
    label: "Un dispositivo digital en capas: hardware, sistema operativo, aplicaciones y usuario",
    beatMs: 5400,
    captions: [
      "Un ordenador o un móvil funciona por **capas**. Cada una usa los servicios de la que tiene debajo.",
      "El **hardware** son las piezas físicas: procesador, memoria, almacenamiento, pantalla y sensores.",
      "El **sistema operativo** (Windows, Linux, Android, iOS) controla el hardware, gestiona archivos y **ofrece servicios** a los programas.",
      "Las **aplicaciones** se instalan sobre el sistema operativo y permiten hacer tareas concretas.",
      "El **usuario** interactúa con las aplicaciones. Sus datos y cuentas están en las capas inferiores: hay que **protegerlos**.",
    ],
    render: (beat) => (
      <Canvas>
        {capas.map((c, i) => {
          const activa = beat === 0 || beat === 4 - i;
          return <Box key={c.t} x={400} y={c.y + 30} w={560} h={74} color={c.c} label={c.t} size={22} active={activa} />;
        })}
        {capas.map((c, i) => (
          <Fade key={c.t} show={beat === 4 - i}>
            <Txt x={400} y={c.y + 58} size={14} color={MANIM.muted}>
              {c.s}
            </Txt>
          </Fade>
        ))}
        <Fade show={beat === 0}>
          <Arrow x1={700} y1={330} x2={700} y2={80} color={MANIM.muted} width={3} />
          <Txt x={712} y={205} size={14} color={MANIM.muted} anchor="start">
            servicios
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Un mensaje viaja en paquetes ───────────── */

export function buildPaquetesRed(): AnimBuild {
  const pk = [0, 1, 2, 3];
  return {
    label: "Transmisión de datos: un archivo se divide en paquetes que viajan por la red y se reensamblan",
    beatMs: 5600,
    captions: [
      "Para enviar un archivo por internet, el **emisor** (tu dispositivo) y el **receptor** se comunican a través de un **canal** (cable, wifi, fibra, red móvil).",
      "El archivo se **divide en paquetes** pequeños y numerados. Así se pueden enviar por caminos distintos y volver a pedir solo los que fallen.",
      "Los paquetes pasan por **routers**, que los reenvían hacia su destino. Pueden llegar **por rutas diferentes**.",
      "El receptor **reordena** los paquetes y reconstruye el archivo. Si falta alguno, lo reclama de nuevo.",
      "La **velocidad** se mide en bits por segundo: cuanta más tenga el canal, más paquetes pasan cada segundo.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={90} y={210} w={120} h={80} color={MANIM.blue} label="Emisor" size={20} active />
        <Box x={710} y={210} w={120} h={80} color={MANIM.green} label="Receptor" size={20} active />
        <Box x={400} y={120} w={110} h={54} color={MANIM.orange} label="Router A" size={17} active={beat >= 2} />
        <Box x={400} y={300} w={110} h={54} color={MANIM.orange} label="Router B" size={17} active={beat >= 2} />
        <line x1={150} y1={195} x2={345} y2={125} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={150} y1={225} x2={345} y2={295} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={455} y1={125} x2={650} y2={195} stroke={MANIM.muted} strokeWidth={3} />
        <line x1={455} y1={295} x2={650} y2={225} stroke={MANIM.muted} strokeWidth={3} />
        {beat === 0 ? (
          <rect x={65} y={158} width={50} height={36} rx={6} fill={MANIM.yellow} fillOpacity={0.3} stroke={MANIM.yellow} strokeWidth={3} />
        ) : null}
        {pk.map((i) => {
          const x = beat === 1 ? 50 + i * 38 : beat === 2 ? [250, 250, 580, 580][i]! : beat >= 3 ? 640 + i * 28 : 0;
          const y = beat === 1 ? 262 : beat === 2 ? [150, 270, 150, 270][i]! : beat >= 3 ? 262 : 0;
          if (beat === 0) return null;
          return (
            <g key={i} className="anim-t">
              <rect x={x} y={y - 16} width={30} height={30} rx={5} fill={MANIM.yellow} fillOpacity={0.35} stroke={MANIM.yellow} strokeWidth={2.5} className="anim-t" />
              <Txt x={x + 15} y={y + 5} size={16} color={MANIM.ink}>
                {i + 1}
              </Txt>
            </g>
          );
        })}
        <Fade show={beat === 4}>
          <Txt x={400} y={390} size={20} color={MANIM.yellow}>
            100 Mb/s = 100 millones de bits cada segundo
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
