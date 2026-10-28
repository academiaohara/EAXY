import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Sincronización de un archivo con la nube ───────────── */

export function buildSincronizacionNube(): AnimBuild {
  return {
    label: "Sincronización con la nube: el archivo editado en un dispositivo aparece en los demás",
    beatMs: 5600,
    captions: [
      "Tienes un archivo (la memoria del proyecto) en el **ordenador**. También hay una **copia en la nube**, en un servidor de internet.",
      "Editas el archivo en el ordenador: ahora **la copia local es más reciente** que la de la nube.",
      "Si hay conexión, el programa de sincronización **sube** los cambios al servidor. Mientras sube, depende de tu **velocidad de subida**.",
      "Los demás dispositivos con tu cuenta (tablet, móvil) **detectan** el cambio en la nube.",
      "Y **descargan** la versión nueva: los tres dispositivos tienen el mismo contenido. Ojo: si se borra en uno, **se borra en todos**, por eso la nube no sustituye a una copia de seguridad.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={140} y={110} w={190} h={70} color={MANIM.blue} label="Ordenador" />
        <Box x={400} y={60} w={190} h={70} color={MANIM.purple} label="Nube (servidor)" />
        <Box x={660} y={110} w={190} h={70} color={MANIM.green} label="Móvil / tablet" />
        <Txt x={140} y={172} size={20} color={beat >= 1 ? MANIM.yellow : MANIM.muted}>
          {beat >= 1 ? "memoria v2" : "memoria v1"}
        </Txt>
        <Txt x={400} y={122} size={20} color={beat >= 2 ? MANIM.yellow : MANIM.muted}>
          {beat >= 2 ? "memoria v2" : "memoria v1"}
        </Txt>
        <Txt x={660} y={172} size={20} color={beat >= 4 ? MANIM.yellow : MANIM.muted}>
          {beat >= 4 ? "memoria v2" : "memoria v1"}
        </Txt>
        <Fade show={beat === 2}>
          <Arrow x1={230} y1={105} x2={310} y2={80} color={MANIM.yellow} width={6} />
          <Txt x={255} y={50} size={22} color={MANIM.yellow}>
            subir
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={190} size={22} color={MANIM.orange}>
            ¡hay cambios!
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Arrow x1={490} y1={80} x2={570} y2={105} color={MANIM.yellow} width={6} />
          <Txt x={545} y={150} size={22} color={MANIM.yellow}>
            descargar
          </Txt>
          <Txt x={400} y={280} size={24} color={MANIM.red}>
            borrar en uno = borrar en todos
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={140} y={215} size={22} color={MANIM.yellow}>
            ✎ editando…
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
