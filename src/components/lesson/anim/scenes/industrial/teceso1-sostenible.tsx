import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Ciclo de vida de un producto (un móvil) ───────────── */

export function buildCicloVidaProductoEso(): AnimBuild {
  const fases = [
    { t: "Extraer materias primas", s: "minería, plásticos", c: MANIM.green },
    { t: "Fabricar", s: "energía y agua", c: MANIM.orange },
    { t: "Transportar", s: "barco, camión", c: MANIM.blue },
    { t: "Usar", s: "electricidad", c: MANIM.purple },
    { t: "Fin de vida", s: "residuo o reciclaje", c: MANIM.red },
  ];
  const xs = [110, 270, 430, 590, 730];
  return {
    label: "Ciclo de vida de un producto: extraer, fabricar, transportar, usar y fin de vida",
    beatMs: 5600,
    captions: [
      "Todo producto tiene un **ciclo de vida**: desde que se extraen sus materias primas hasta que se convierte en residuo. En **cada fase** hay un impacto ambiental.",
      "**Extracción**: se consumen **recursos** (minerales, petróleo, agua) y se altera el terreno donde se obtienen.",
      "**Fabricación**: se consume **energía y agua** y se generan **emisiones y residuos** industriales. En un móvil es la fase que más pesa.",
      "**Transporte**: el producto viaja por barco, avión o camión: **emite CO₂** según la distancia.",
      "**Uso**: se consume **electricidad** al cargarlo y utilizarlo. Alargar su vida es la mejor forma de repartir el impacto.",
      "**Fin de vida**: si se tira, se pierde el material y se contamina; si se **recicla o reutiliza**, el ciclo se cierra.",
    ],
    render: (beat) => (
      <Canvas>
        {fases.map((f, i) => (
          <g key={f.t}>
            <Box x={xs[i]!} y={190} w={140} h={92} color={f.c} label={["Extracción", "Fabricación", "Transporte", "Uso", "Fin de vida"][i]} size={17} active={beat === 0 || beat === i + 1} />
            <Txt x={xs[i]!} y={250} size={14} color={MANIM.muted}>
              {f.s}
            </Txt>
            {i < 4 ? <Arrow x1={xs[i]! + 72} y1={190} x2={xs[i + 1]! - 72} y2={190} color={MANIM.muted} width={3} head={9} /> : null}
          </g>
        ))}
        <Fade show={beat === 5}>
          <path d="M 730 140 C 730 60 110 60 110 140" fill="none" stroke={MANIM.green} strokeWidth={4} strokeDasharray="10 7" />
          <Txt x={420} y={52} size={20} color={MANIM.green}>
            reciclar y reutilizar cierra el ciclo
          </Txt>
        </Fade>
        <Fade show={beat >= 1 && beat <= 5}>
          <Txt x={420} y={340} size={20} color={fases[Math.max(0, beat - 1)]!.c}>
            {["", "recursos naturales", "energía, agua y emisiones", "emisiones del transporte", "consumo eléctrico", "residuos o materiales recuperados"][beat]}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Jerarquía de residuos ───────────── */

export function buildJerarquiaResiduos(): AnimBuild {
  const niveles = [
    { t: "Reducir", s: "no generar el residuo", c: MANIM.green, w: 640 },
    { t: "Reutilizar", s: "darle otro uso", c: MANIM.blue, w: 540 },
    { t: "Reciclar", s: "transformarlo en materia prima", c: MANIM.yellow, w: 440 },
    { t: "Valorizar", s: "obtener energía al quemarlo", c: MANIM.orange, w: 340 },
    { t: "Eliminar", s: "vertedero", c: MANIM.red, w: 240 },
  ];
  return {
    label: "Jerarquía de residuos: reducir, reutilizar, reciclar, valorizar y eliminar",
    beatMs: 5400,
    captions: [
      "Hay opciones mejores y peores para gestionar un residuo. La **jerarquía de residuos** las ordena de **más a menos recomendable**.",
      "**Reducir**: lo mejor es **no generar** el residuo (menos envases, productos duraderos).",
      "**Reutilizar**: usar de nuevo el objeto o darle **otro uso**, sin transformarlo.",
      "**Reciclar**: transformar el residuo en **nueva materia prima**. Ahorra recursos pero gasta energía.",
      "**Valorizar**: quemarlo para **aprovechar la energía**. Solo para lo que no se puede reciclar.",
      "**Eliminar**: llevarlo al **vertedero**. Es la última opción: se pierde el material y se contamina.",
    ],
    render: (beat) => (
      <Canvas>
        {niveles.map((n, i) => (
          <g key={n.t} className="anim-t" opacity={beat === 0 || beat === i + 1 ? 1 : 0.35}>
            <rect x={400 - n.w / 2} y={30 + i * 72} width={n.w} height={60} rx={10} fill={n.c} fillOpacity={0.2} stroke={n.c} strokeWidth={beat === i + 1 ? 5 : 3} />
            <Txt x={400} y={58 + i * 72} size={24} color={n.c}>
              {n.t}
            </Txt>
            <Txt x={400} y={80 + i * 72} size={15} color={MANIM.muted}>
              {n.s}
            </Txt>
          </g>
        ))}
        <Fade show={beat === 0}>
          <Arrow x1={765} y1={60} x2={765} y2={380} color={MANIM.muted} width={3} head={10} />
          <Txt x={765} y={44} size={15} color={MANIM.green}>
            mejor
          </Txt>
          <Txt x={765} y={404} size={15} color={MANIM.red}>
            peor
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
