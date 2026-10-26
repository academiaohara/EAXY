import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── El diodo: una válvula de un solo sentido ───────────── */

export function buildDiodoSentido(): AnimBuild {
  return {
    label: "Diodo y LED: la corriente solo pasa en un sentido",
    beatMs: 5600,
    captions: [
      "El **diodo** es un componente con dos terminales: **ánodo (+)** y **cátodo (−)**. Su símbolo es una flecha contra una barra: indica el sentido en que deja pasar la corriente.",
      "En **polarización directa** (ánodo al positivo, cátodo al negativo) conduce, siempre que se supere su tensión umbral (0,7 V un diodo de silicio).",
      "En **polarización inversa** (conectado al revés) se comporta como un interruptor abierto: **no pasa corriente**.",
      "Un **LED** es un diodo que **emite luz** al conducir. Necesita una **resistencia en serie** para limitar la corriente.",
      "Un LED al revés no se enciende, pero tampoco pasa nada grave: por eso hay que fijarse en la **pata larga (ánodo)** y en la marca plana del cátodo.",
    ],
    render: (beat) => {
      const dir = beat === 1 || beat === 3;
      const apaga = beat === 2 || beat === 4;
      return (
        <Canvas>
          <polygon points="330,140 330,260 430,200" fill={dir ? MANIM.green : MANIM.surface} fillOpacity={dir ? 0.45 : 1} stroke={dir ? MANIM.green : MANIM.muted} strokeWidth={5} className="anim-t" />
          <line x1={440} y1={135} x2={440} y2={265} stroke={dir ? MANIM.green : MANIM.muted} strokeWidth={7} />
          <line x1={140} y1={200} x2={330} y2={200} stroke={MANIM.ink} strokeWidth={5} />
          <line x1={440} y1={200} x2={640} y2={200} stroke={MANIM.ink} strokeWidth={5} />
          <Txt x={260} y={170} size={22} color={MANIM.blue}>
            ánodo +
          </Txt>
          <Txt x={560} y={170} size={22} color={MANIM.orange}>
            cátodo −
          </Txt>
          <Fade show={dir}>
            <Arrow x1={160} y1={240} x2={310} y2={240} color={MANIM.green} width={6} />
            <Txt x={235} y={285} size={22} color={MANIM.green}>
              pasa corriente
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={400} y={320} size={26} color={MANIM.red}>
              ✕ conectado al revés: bloquea
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            {[0, 1, 2].map((k) => (
              <line key={k} x1={460 + k * 22} y1={120} x2={490 + k * 22} y2={80} stroke={dir ? MANIM.yellow : MANIM.muted} strokeWidth={4} strokeLinecap="round" opacity={dir ? 1 : 0.3} />
            ))}
            <Txt x={560} y={70} size={22} color={dir ? MANIM.yellow : MANIM.muted}>
              {dir ? "LED: ¡luz!" : "LED apagado"}
            </Txt>
          </Fade>
          <Fade show={apaga && beat === 4}>
            <Txt x={400} y={340} size={22} color={MANIM.muted}>
              pata larga = ánodo
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── El transistor como interruptor ───────────── */

export function buildTransistorLlave(): AnimBuild {
  return {
    label: "Transistor NPN: una pequeña corriente de base controla una corriente grande de colector",
    beatMs: 5600,
    captions: [
      "El **transistor** tiene tres terminales: **base**, **colector** y **emisor**. Funciona como un interruptor controlado por una señal eléctrica.",
      "Sin corriente en la base (menos de unos 0,7 V), el transistor está en **corte**: es un interruptor **abierto** y la carga no recibe corriente.",
      "Al aplicar tensión a la base a través de una **resistencia**, circula una **pequeña corriente de base**.",
      "Esa pequeña corriente **abre el paso** entre colector y emisor: la corriente de colector es **β veces mayor** (β ≈ 100).",
      "Con suficiente corriente de base, el transistor **satura**: es un interruptor **cerrado** y la lámpara luce a pleno brillo. Con una señal débil se controla una carga potente.",
    ],
    render: (beat) => {
      const on = beat >= 3;
      const base = beat >= 2;
      return (
        <Canvas>
          <Box x={400} y={70} w={180} h={56} color={MANIM.yellow} label="Lámpara" active={on} />
          <line x1={400} y1={98} x2={400} y2={160} stroke={on ? MANIM.green : MANIM.muted} strokeWidth={6} className="anim-t" />
          <circle cx={430} cy={225} r={62} fill="none" stroke={MANIM.ink} strokeWidth={4} />
          <line x1={405} y1={180} x2={405} y2={270} stroke={MANIM.ink} strokeWidth={7} />
          <line x1={405} y1={205} x2={400} y2={160} stroke={MANIM.ink} strokeWidth={5} />
          <line x1={405} y1={248} x2={400} y2={305} stroke={MANIM.ink} strokeWidth={5} />
          <line x1={220} y1={225} x2={405} y2={225} stroke={base ? MANIM.blue : MANIM.muted} strokeWidth={5} className="anim-t" />
          <Txt x={190} y={200} size={22} color={MANIM.blue}>
            base
          </Txt>
          <Txt x={470} y={150} size={22} color={MANIM.green}>
            colector
          </Txt>
          <Txt x={470} y={320} size={22} color={MANIM.orange}>
            emisor
          </Txt>
          <Fade show={base}>
            <Arrow x1={230} y1={255} x2={340} y2={255} color={MANIM.blue} width={4} />
            <Txt x={285} y={285} size={20} color={MANIM.blue}>
              Ib pequeña
            </Txt>
          </Fade>
          <Fade show={on}>
            <Arrow x1={620} y1={110} x2={620} y2={290} color={MANIM.green} width={8} />
            <Txt x={680} y={200} size={22} color={MANIM.green}>
              Ic = β · Ib
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={620} y={200} size={24} color={MANIM.muted}>
              corte: sin paso
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
