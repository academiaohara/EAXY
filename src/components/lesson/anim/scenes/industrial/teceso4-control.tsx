import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Lazo de control cerrado ───────────── */

function Bloque({ x, y, w = 130, texto, color, on }: { x: number; y: number; w?: number; texto: string; color: string; on: boolean }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={70} rx={10} fill={color} fillOpacity={on ? 0.45 : 0.1} stroke={color} strokeWidth={on ? 5 : 2} className="anim-t" />
      <Txt x={x + w / 2} y={y + 35} size={19} color={MANIM.ink}>
        {texto}
      </Txt>
    </g>
  );
}

export function buildLazoCerrado(): AnimBuild {
  return {
    label: "Lazo cerrado: referencia, comparador, controlador, actuador, proceso y sensor",
    beatMs: 5600,
    captions: [
      "En un sistema **de lazo abierto** el controlador envía la orden al actuador y **no comprueba** el resultado.",
      "Se añade un **sensor** que mide la **salida real** del proceso.",
      "El **comparador** resta la medida a la **consigna** y obtiene el **error**.",
      "Aparece una **perturbación** (por ejemplo, se abre una ventana) y la salida se aleja de la consigna.",
      "El controlador ve el error y **corrige** la orden: el lazo cerrado mantiene la salida sin intervención humana.",
    ],
    render: (beat) => (
      <Canvas>
        <Bloque x={30} y={130} w={110} texto="consigna" color={MANIM.green} on={beat === 2 || beat === 4} />
        <Fade show={beat >= 2}>
          <circle cx={190} cy={165} r={24} fill={MANIM.yellow} fillOpacity={0.4} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={190} y={166} size={22} color={MANIM.ink}>
            ±
          </Txt>
        </Fade>
        <Bloque x={240} y={130} texto="controlador" color={MANIM.blue} on={beat === 0 || beat === 4} />
        <Bloque x={400} y={130} texto="actuador" color={MANIM.orange} on={beat === 0} />
        <Bloque x={560} y={130} texto="proceso" color={MANIM.purple} on={beat === 3} />
        <Arrow x1={142} y1={165} x2={beat >= 2 ? 164 : 238} y2={165} color={MANIM.muted} width={4} />
        <Fade show={beat >= 2}>
          <Arrow x1={216} y1={165} x2={238} y2={165} color={MANIM.red} width={4} />
          <Txt x={228} y={118} size={16} color={MANIM.red}>
            error
          </Txt>
        </Fade>
        <Arrow x1={372} y1={165} x2={398} y2={165} color={MANIM.muted} width={4} />
        <Arrow x1={532} y1={165} x2={558} y2={165} color={MANIM.muted} width={4} />
        <Arrow x1={692} y1={165} x2={760} y2={165} color={MANIM.muted} width={4} />
        <Txt x={750} y={140} size={16} color={MANIM.muted}>
          salida
        </Txt>
        <Fade show={beat >= 1}>
          <path d="M 725 165 L 725 290 L 190 290 L 190 192" fill="none" stroke={MANIM.green} strokeWidth={4} />
          <Bloque x={400} y={255} w={130} texto="sensor" color={MANIM.green} on={beat === 1} />
        </Fade>
        <Fade show={beat === 3}>
          <Arrow x1={625} y1={40} x2={625} y2={125} color={MANIM.red} width={6} />
          <Txt x={625} y={25} size={20} color={MANIM.red}>
            perturbación
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={400} y={360} size={22} color={MANIM.green}>
            la salida vuelve a la consigna
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
