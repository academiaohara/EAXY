import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Tres dimensiones de la sostenibilidad ───────────── */

export function buildTripleSostenibilidad(): AnimBuild {
  return {
    label: "Sostenibilidad: ambiental, social y económica; lo sostenible está en la intersección",
    beatMs: 5600,
    captions: [
      "**Dimensión ambiental**: usar los recursos sin agotarlos ni degradar el entorno (aire, agua, suelo, clima).",
      "**Dimensión social**: salud, empleo digno, acceso a la tecnología, equidad y seguridad de las personas.",
      "**Dimensión económica**: la solución debe ser viable y rentable a largo plazo; si no se puede pagar, no se mantiene.",
      "Una tecnología es **sostenible** cuando cumple las tres a la vez. Las zonas de solapamiento de dos son **insuficientes**: viable pero injusto, o justo pero que arruina el medio.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 0}>
          <circle cx={340} cy={170} r={115} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={270} y={130} size={20} color={MANIM.green}>
            Ambiental
          </Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <circle cx={460} cy={170} r={115} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={530} y={130} size={20} color={MANIM.blue}>
            Social
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <circle cx={400} cy={270} r={115} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={4} />
          <Txt x={400} y={340} size={20} color={MANIM.orange}>
            Económica
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={400} y={215} size={22} color={MANIM.yellow}>
            SOSTENIBLE
          </Txt>
          <Txt x={400} y={150} size={13} color={MANIM.muted}>
            soportable
          </Txt>
          <Txt x={340} y={265} size={13} color={MANIM.muted} anchor="end">
            viable
          </Txt>
          <Txt x={460} y={265} size={13} color={MANIM.muted} anchor="start">
            equitativo
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Ciclo de vida de un producto ───────────── */

const ETAPAS = [
  { t: "Extracción", e: "Entra: minerales, agua, energía. Sale: residuos de minería, emisiones.", c: MANIM.red },
  { t: "Fabricación", e: "Entra: materiales, energía. Sale: producto, residuos de proceso, emisiones.", c: MANIM.orange },
  { t: "Transporte", e: "Entra: combustible o electricidad. Sale: emisiones de CO₂.", c: MANIM.yellow },
  { t: "Uso", e: "Entra: energía, consumibles, mantenimiento. Sale: servicio útil, desgaste.", c: MANIM.green },
  { t: "Fin de vida", e: "Entra: producto usado. Sale: materiales recuperados o residuos a vertedero.", c: MANIM.blue },
];

export function buildCicloVidaFases(): AnimBuild {
  const pos = ETAPAS.map((_, i) => {
    const a = (-90 + i * 72) * (Math.PI / 180);
    return { x: 210 + 150 * Math.cos(a), y: 215 + 135 * Math.sin(a) };
  });
  return {
    label: "Ciclo de vida de un producto: de la cuna a la tumba",
    beatMs: 5600,
    captions: [
      "El **ciclo de vida** recorre todo lo que le pasa a un producto «de la cuna a la tumba». Evaluar solo una fase puede dar una imagen engañosa.",
      "**Extracción** de materias primas: consume agua y energía y genera residuos y emisiones muy lejos del usuario.",
      "**Fabricación**: transforma materiales en producto. Suele concentrar mucha energía y residuos industriales.",
      "**Transporte** entre cada fase: emisiones que dependen de la distancia y del medio (barco, camión, avión).",
      "**Uso**: en aparatos que consumen energía (bombillas, electrodomésticos) esta fase suele dominar el impacto total.",
      "**Fin de vida**: reciclar, reutilizar o eliminar. Si se recuperan materiales, el ciclo se **cierra** y vuelve a la extracción.",
    ],
    render: (beat) => (
      <Canvas>
        {ETAPAS.map((e, i) => (
          <g key={e.t}>
            <Box x={pos[i]!.x} y={pos[i]!.y} w={130} h={46} color={e.c} label={e.t} size={16} active={beat === 0 || beat === i + 1} />
            <Arrow x1={pos[i]!.x + (pos[(i + 1) % 5]!.x - pos[i]!.x) * 0.3} y1={pos[i]!.y + (pos[(i + 1) % 5]!.y - pos[i]!.y) * 0.3} x2={pos[i]!.x + (pos[(i + 1) % 5]!.x - pos[i]!.x) * 0.7} y2={pos[i]!.y + (pos[(i + 1) % 5]!.y - pos[i]!.y) * 0.7} color={MANIM.muted} width={3} />
          </g>
        ))}
        {ETAPAS.map((e, i) => (
          <Fade key={e.t} show={beat === i + 1}>
            <rect x={440} y={120} width={350} height={180} rx={12} fill={MANIM.surface} stroke={e.c} strokeWidth={3} />
            <Txt x={615} y={152} size={20} color={e.c}>
              {e.t}
            </Txt>
            {e.e.split(". ").map((l, k) => (
              <Txt key={k} x={615} y={190 + k * 34} size={12} color={MANIM.ink}>
                {l.replace(/\.$/, "")}
              </Txt>
            ))}
          </Fade>
        ))}
      </Canvas>
    ),
  };
}

/* ───────────── Economía lineal frente a circular ───────────── */

export function buildEconomiaLinealCircular(): AnimBuild {
  const pasos = ["Extraer", "Fabricar", "Usar", "Tirar"];
  return {
    label: "Economía lineal (extraer, fabricar, usar, tirar) frente a circular (reducir, reutilizar, reparar, reciclar)",
    beatMs: 5600,
    captions: [
      "**Economía lineal**: se extraen recursos, se fabrica, se usa y se **tira**. Cada producto consume materia nueva y acaba como residuo.",
      "**Economía circular**: el residuo de una fase es **recurso** de otra. Los productos se **reutilizan**, se **reparan** y sus materiales se **reciclan**, volviendo al ciclo.",
      "Orden de prioridad (las «R»): **reducir** primero (no consumir lo innecesario), luego **reutilizar**, **reparar** y, solo al final, **reciclar**. Y diseñar los productos para que puedan desmontarse.",
    ],
    render: (beat) => (
      <Canvas>
        {pasos.map((p, i) => (
          <g key={p}>
            <Box x={110 + i * 190} y={190} w={140} h={60} color={[MANIM.red, MANIM.orange, MANIM.green, MANIM.muted][i]!} label={p} size={20} />
            {i < 3 ? <Arrow x1={182 + i * 190} y1={190} x2={228 + i * 190} y2={190} color={MANIM.muted} width={4} /> : null}
          </g>
        ))}
        <Fade show={beat >= 1}>
          <path d="M 490 160 C 490 70 300 70 300 160" fill="none" stroke={MANIM.green} strokeWidth={4} />
          <Arrow x1={303} y1={140} x2={300} y2={160} color={MANIM.green} width={4} />
          <Txt x={395} y={78} size={16} color={MANIM.green}>
            reutilizar · reparar
          </Txt>
          <path d="M 680 225 C 680 340 110 340 110 225" fill="none" stroke={MANIM.blue} strokeWidth={4} />
          <Arrow x1={110} y1={245} x2={110} y2={226} color={MANIM.blue} width={4} />
          <Txt x={395} y={330} size={16} color={MANIM.blue}>
            reciclar: los materiales vuelven a la fabricación
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          {["1. Reducir", "2. Reutilizar", "3. Reparar", "4. Reciclar"].map((t, i) => (
            <Txt key={t} x={80 + i * 210} y={395} size={17} color={[MANIM.green, MANIM.green, MANIM.yellow, MANIM.orange][i]!}>
              {t}
            </Txt>
          ))}
        </Fade>
      </Canvas>
    ),
  };
}
