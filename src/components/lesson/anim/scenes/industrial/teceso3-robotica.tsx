import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Estructura de un programa de placa: setup y loop ───────────── */

export function buildSetupLoop(): AnimBuild {
  const PASOS = [
    { t: "Leer sensores", c: MANIM.blue },
    { t: "Decidir", c: MANIM.yellow },
    { t: "Actuar", c: MANIM.green },
  ] as const;
  return {
    label: "Un programa de placa: setup() una vez y loop() sin parar",
    beatMs: 5600,
    captions: [
      "Al **encender** la placa se ejecuta **una sola vez** la función **setup()**: aquí se configuran los pines como entradas o salidas.",
      "Después empieza **loop()**, que se repite **indefinidamente**, miles de veces por segundo.",
      "Primero el robot **lee los sensores** (pulsadores, distancia, luz).",
      "Después **decide** con las condiciones del programa (**si … si no**).",
      "Y por último **actúa**: enciende un LED, mueve un motor. Y vuelve a empezar: así reacciona a lo que ocurre en cada instante.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={130} y={90} w={200} h={64} color={MANIM.purple} label="setup()  (1 vez)" active={beat === 0} />
        <Box x={400} y={200} w={140} h={60} color={PASOS[0].c} label={PASOS[0].t} active={beat === 2} />
        <Box x={560} y={200} w={120} h={60} color={PASOS[1].c} label={PASOS[1].t} active={beat === 3} />
        <Box x={700} y={200} w={110} h={60} color={PASOS[2].c} label={PASOS[2].t} active={beat === 4} />
        <Arrow x1={235} y1={110} x2={310} y2={170} color={MANIM.muted} width={4} />
        <Arrow x1={478} y1={200} x2={498} y2={200} color={MANIM.muted} width={4} />
        <Arrow x1={624} y1={200} x2={642} y2={200} color={MANIM.muted} width={4} />
        <rect x={330} y={150} width={500} height={110} rx={16} fill="none" stroke={beat >= 1 ? MANIM.orange : MANIM.muted} strokeWidth={4} strokeDasharray="10 6" className="anim-t" />
        <Txt x={420} y={140} size={22} color={beat >= 1 ? MANIM.orange : MANIM.muted}>
          loop()
        </Txt>
        <Fade show={beat === 4}>
          <polyline points="760,235 760,300 400,300 400,235" fill="none" stroke={MANIM.orange} strokeWidth={5} />
          <Txt x={580} y={330} size={22} color={MANIM.orange}>
            se repite
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── PWM: ciclo de trabajo ───────────── */

export function buildPwmCiclo(): AnimBuild {
  return {
    label: "PWM: la tensión media depende del ciclo de trabajo",
    beatMs: 5400,
    captions: [
      "Una salida digital solo puede estar en **5 V** (alta) o **0 V** (baja). Para simular valores intermedios se enciende y apaga **muy rápido**: **PWM**.",
      "Con un **25 %** de ciclo de trabajo la señal está en alto una cuarta parte del tiempo: **tensión media ≈ 1,25 V**. El motor gira despacio.",
      "Con un **50 %**: tensión media 2,5 V y velocidad intermedia.",
      "Con un **75 %**: tensión media 3,75 V; el motor gira rápido.",
      "Con el **100 %** la salida está siempre en alto (5 V). Y con el **0 %**, siempre apagada. En una placa, **analogWrite(pin, 0–255)** fija el ciclo de trabajo.",
    ],
    render: (beat) => {
      const duty = beat === 0 ? 50 : beat === 4 ? 100 : [25, 50, 75][beat - 1]!;
      return (
        <Canvas>
          {[0, 1, 2, 3].map((k) => (
            <g key={k}>
              <rect x={110 + k * 150} y={110} width={(duty / 100) * 140} height={70} fill={MANIM.orange} fillOpacity={0.6} stroke={MANIM.orange} strokeWidth={3} className="anim-t" />
            </g>
          ))}
          <line x1={100} y1={180} x2={720} y2={180} stroke={MANIM.muted} strokeWidth={3} />
          <Txt x={70} y={125} size={20} color={MANIM.orange}>
            5 V
          </Txt>
          <Txt x={70} y={180} size={20} color={MANIM.muted}>
            0 V
          </Txt>
          <Txt x={400} y={270} size={30} color={MANIM.yellow}>
            {`ciclo de trabajo ${duty} %  →  ${(duty / 100 * 5).toFixed(2).replace(".", ",")} V de media`}
          </Txt>
          <Fade show={beat === 4}>
            <Txt x={400} y={320} size={22} color={MANIM.green}>
              analogWrite(pin, 0 a 255)
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
