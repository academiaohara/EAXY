import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Seg } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const L = 200;
const R = 600;
const T = 120;
const B = 320;

type Dir = "u" | "d" | "l" | "r";
const flecha = (x: number, y: number, d: Dir, color: string, key: string) => {
  const p: [number, number][] =
    d === "r" ? [[x - 9, y - 8], [x + 9, y], [x - 9, y + 8]] : d === "l" ? [[x + 9, y - 8], [x - 9, y], [x + 9, y + 8]] : d === "u" ? [[x - 8, y + 9], [x, y - 9], [x + 8, y + 9]] : [[x - 8, y - 9], [x, y + 9], [x + 8, y - 9]];
  return <polygon key={key} points={p.map((q) => q.join(",")).join(" ")} fill={color} />;
};

/** Circuito sencillo: el sentido de los electrones y el convencional, y cómo se conectan los aparatos de medida. */
export function buildCorriente(): AnimBuild {
  return {
    label: "Corriente eléctrica en un circuito sencillo",
    beatMs: 5400,
    captions: [
      "Un **circuito** necesita un **generador** (pila), **conductores**, un **receptor** (bombilla) y un **interruptor**. Con el interruptor **abierto** no hay corriente.",
      "Al **cerrarlo**, los **electrones** (carga negativa) se mueven del polo **negativo** al **positivo** por el exterior de la pila.",
      "Por **convenio**, el sentido de la **corriente** se toma **al revés**: del polo **positivo** al **negativo**, como si se movieran cargas positivas.",
      "Un **amperímetro** se conecta **en serie** (la corriente pasa por él); un **voltímetro**, **en paralelo** con el receptor.",
    ],
    render: (beat) => {
      const cerrado = beat >= 1;
      return (
        <Canvas>
          <path d={`M ${L} 200 L ${L} ${T} L ${cerrado ? 395 : 380} ${T}`} fill="none" stroke={MANIM.ink} strokeWidth={4} />
          {cerrado ? <Seg a={[395, T]} b={[405, T]} color={MANIM.ink} width={4} /> : <Seg a={[380, T]} b={[410, T - 28]} color={MANIM.ink} width={4} />}
          <path d={`M 405 ${T} L ${R} ${T} L ${R} 190`} fill="none" stroke={MANIM.ink} strokeWidth={4} />
          <path d={`M ${R} 250 L ${R} ${B} L ${L} ${B} L ${L} 240`} fill="none" stroke={MANIM.ink} strokeWidth={4} />
          <Seg a={[L - 25, 200]} b={[L + 25, 200]} color={MANIM.red} width={5} />
          <Seg a={[L - 12, 240]} b={[L + 12, 240]} color={MANIM.blue} width={5} />
          <Txt x={L - 50} y={206} size={20} color={MANIM.red}>+</Txt>
          <Txt x={L - 50} y={248} size={20} color={MANIM.blue}>−</Txt>
          <circle cx={R} cy={220} r={30} fill={cerrado ? MANIM.yellow : "none"} fillOpacity={0.7} stroke={MANIM.ink} strokeWidth={4} />
          <Txt x={R + 110} y={226} size={20} color={MANIM.muted}>bombilla</Txt>
          <Txt x={(L + R) / 2} y={T - 44} size={20} color={MANIM.muted}>interruptor</Txt>
          <Fade show={beat === 1}>
            {flecha(500, T, "l", MANIM.green, "e1")}
            {flecha(300, T, "l", MANIM.green, "e2")}
            {flecha(L, 160, "d", MANIM.green, "e3")}
            {flecha(300, B, "r", MANIM.green, "e4")}
            {flecha(500, B, "r", MANIM.green, "e5")}
            {flecha(R, 285, "u", MANIM.green, "e6")}
            {flecha(R, 160, "u", MANIM.green, "e7")}
            <Txt x={400} y={370} size={20} color={MANIM.green}>electrones: de − a +</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            {flecha(500, T, "r", MANIM.yellow, "c1")}
            {flecha(300, T, "r", MANIM.yellow, "c2")}
            {flecha(L, 160, "u", MANIM.yellow, "c3")}
            {flecha(300, B, "l", MANIM.yellow, "c4")}
            {flecha(500, B, "l", MANIM.yellow, "c5")}
            {flecha(R, 285, "d", MANIM.yellow, "c6")}
            {flecha(R, 160, "d", MANIM.yellow, "c7")}
            {beat === 2 && <Txt x={400} y={370} size={20} color={MANIM.yellow}>corriente (convenio): de + a −</Txt>}
          </Fade>
          <Fade show={beat === 3}>
            <circle cx={400} cy={B} r={24} fill="none" stroke={MANIM.orange} strokeWidth={4} />
            <Txt x={400} y={B + 8} size={22} color={MANIM.orange}>A</Txt>
            <Txt x={400} y={B + 58} size={18} color={MANIM.orange}>amperímetro (serie)</Txt>
            <path d={`M ${R - 80} 220 L ${R - 80} 190 L ${R - 120} 190`} fill="none" stroke={MANIM.purple} strokeWidth={3} />
            <circle cx={R - 150} cy={190} r={24} fill="none" stroke={MANIM.purple} strokeWidth={4} />
            <Txt x={R - 150} y={198} size={22} color={MANIM.purple}>V</Txt>
            <Txt x={R - 150} y={238} size={18} color={MANIM.purple}>voltímetro (paralelo)</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
