import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Ley de Ohm con la analogía del agua ───────────── */

export function buildOhmAgua(): AnimBuild {
  return {
    label: "Ley de Ohm: la corriente depende de la tensión que empuja y de la resistencia que frena",
    beatMs: 5600,
    captions: [
      "Imagina un **depósito de agua** conectado a un tubo. El agua es la **carga eléctrica**, y su caudal, la **intensidad I** (en amperios).",
      "La **altura** del depósito es la **tensión V** (voltios): cuanto mayor, con más fuerza empuja el agua.",
      "Un tubo **estrecho** frena el paso: es la **resistencia R** (ohmios). Cuanto más estrecho, menos caudal.",
      "Al **subir la tensión** con el mismo tubo, el caudal aumenta en la misma proporción: **I = V ÷ R**.",
      "Al **duplicar la resistencia** con la misma tensión, la intensidad se **reduce a la mitad**. Esta es la **ley de Ohm**: V = I · R.",
    ],
    render: (beat) => {
      const alto = beat >= 3 && beat !== 4 ? 150 : 90;
      const tubo = beat === 2 ? 12 : beat === 4 ? 12 : 24;
      const flujo = beat === 0 ? 0.4 : beat === 3 ? 1 : beat === 4 ? 0.3 : beat === 1 ? 0.5 : 0.3;
      return (
        <Canvas>
          <rect x={120} y={330 - alto} width={150} height={alto} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={4} className="anim-t" />
          <rect x={270} y={330 - tubo} width={330} height={tubo} fill={MANIM.blue} fillOpacity={0.2 + 0.4 * flujo} stroke={beat >= 2 ? MANIM.orange : MANIM.blue} strokeWidth={4} className="anim-t" />
          {[0, 1, 2, 3, 4].map((k) => (
            <circle key={k} cx={300 + k * 62} cy={330 - tubo / 2} r={Math.max(3, tubo / 5)} fill={MANIM.blue} opacity={0.3 + 0.7 * flujo} className="anim-t" />
          ))}
          <Fade show={beat !== 2 && beat !== 4}>
            <Arrow x1={620} y1={318} x2={730} y2={318} color={MANIM.blue} width={4 + 6 * flujo} />
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={195} y={250} size={22} color={MANIM.ink}>
              agua = carga
            </Txt>
            <Txt x={680} y={290} size={22} color={MANIM.blue}>
              I (A)
            </Txt>
          </Fade>
          <Fade show={beat === 1 || beat === 3}>
            <line x1={90} y1={330 - alto} x2={90} y2={330} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={72} y={330 - alto / 2} size={26} color={MANIM.green}>
              V
            </Txt>
          </Fade>
          <Fade show={beat === 2 || beat === 4}>
            <Txt x={435} y={270} size={26} color={MANIM.orange}>
              R {beat === 4 ? "× 2" : ""}
            </Txt>
            <Arrow x1={620} y1={318} x2={680} y2={318} color={MANIM.blue} width={2.5} />
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={400} y={60} size={34} color={MANIM.yellow}>
              {beat === 3 ? "V ↑  ⇒  I ↑" : "R × 2  ⇒  I ÷ 2"}
            </Txt>
            <Txt x={400} y={110} size={26} color={MANIM.ink}>
              I = V ÷ R
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Reducción de un circuito mixto ───────────── */

export function buildMixtoReduccion(): AnimBuild {
  const wire = { stroke: MANIM.ink, strokeWidth: 5, fill: "none" } as const;
  const R = (x: number, y: number, t: string, c: string, vertical = false, izq = false) => (
    <g className="anim-t">
      <rect x={vertical ? x - 18 : x - 50} y={vertical ? y - 45 : y - 18} width={vertical ? 36 : 100} height={vertical ? 90 : 36} rx={6} fill={MANIM.surface} stroke={c} strokeWidth={5} />
      <Txt x={vertical ? (izq ? x - 85 : x + 70) : x} y={vertical ? y + 6 : y - 28} size={22} color={c}>
        {t}
      </Txt>
    </g>
  );
  return {
    label: "Circuito mixto: se reduce el paralelo, después la serie y se vuelve atrás para repartir",
    beatMs: 5800,
    captions: [
      "Este circuito es **mixto**: R1 está en **serie** con el grupo formado por R2 y R3, que están en **paralelo**.",
      "**Paso 1**: se reducen los paralelos. R2 = 6 Ω y R3 = 3 Ω equivalen a **Rp = (6 · 3) ÷ (6 + 3) = 2 Ω**.",
      "**Paso 2**: ahora R1 = 4 Ω y Rp = 2 Ω están en serie: **Req = 4 + 2 = 6 Ω**.",
      "Con la pila de 12 V: **I = V ÷ Req = 12 ÷ 6 = 2 A**. Esta corriente pasa por R1.",
      "**Vuelta atrás**: V en R1 = 2 · 4 = 8 V. En el paralelo quedan 12 − 8 = **4 V**, y por R2 pasan 4 ÷ 6 ≈ 0,67 A y por R3, 4 ÷ 3 ≈ 1,33 A (suman 2 A).",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <path d="M 130 210 L 130 90 L 330 90 M 330 90 L 650 90 L 650 330 L 130 330 L 130 210" {...wire} />
          <path d="M 380 90 L 380 330 M 500 90 L 500 330" {...wire} />
          {R(230, 90, "R1 = 4 Ω", MANIM.orange)}
          {R(380, 210, "R2 = 6 Ω", MANIM.blue, true, true)}
          {R(500, 210, "R3 = 3 Ω", MANIM.purple, true)}
        </Fade>
        <Fade show={beat === 1}>
          <path d="M 130 210 L 130 90 L 330 90 M 330 90 L 460 90 L 460 330 L 130 330 L 130 210" {...wire} />
          {R(230, 90, "R1 = 4 Ω", MANIM.orange)}
          {R(460, 210, "Rp = 2 Ω", MANIM.yellow, true)}
        </Fade>
        <Fade show={beat >= 2}>
          <path d="M 130 210 L 130 90 L 430 90 L 430 330 L 130 330 L 130 210" {...wire} />
          {R(430, 210, "Req = 6 Ω", MANIM.yellow, true)}
        </Fade>
        <rect x={110} y={190} width={40} height={40} fill={MANIM.surface} />
        <line x1={112} y1={198} x2={148} y2={198} stroke={MANIM.green} strokeWidth={5} />
        <line x1={120} y1={222} x2={140} y2={222} stroke={MANIM.green} strokeWidth={5} />
        <Txt x={80} y={216} size={22} color={MANIM.green}>
          12 V
        </Txt>
        <Fade show={beat === 3}>
          <Txt x={600} y={150} size={30} color={MANIM.blue}>
            I = 12 ÷ 6 = 2 A
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={640} y={130} size={24} color={MANIM.orange}>
            V1 = 8 V
          </Txt>
          <Txt x={640} y={180} size={24} color={MANIM.yellow}>
            Vp = 4 V
          </Txt>
          <Txt x={640} y={230} size={22} color={MANIM.blue}>
            I2 ≈ 0,67 A
          </Txt>
          <Txt x={640} y={270} size={22} color={MANIM.purple}>
            I3 ≈ 1,33 A
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
