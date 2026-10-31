import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const X0 = 110;
const Y0 = 340;
const VX = 70;
const VY = 190;
const G = 90;
const T = 4;
const pos = (t: number): [number, number] => [X0 + VX * t, Y0 - (VY * t - 0.5 * G * t * t) * 0.9];

function Flecha({ x1, y1, x2, y2, color }: { x1: number; y1: number; x2: number; y2: number; color: string }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = (d: number) => x2 - 13 * Math.cos(a) + d * 6 * Math.cos(a + Math.PI / 2);
  const hy = (d: number) => y2 - 13 * Math.sin(a) + d * 6 * Math.sin(a + Math.PI / 2);
  return (
    <g>
      <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={4} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx(1)},${hy(1)} ${hx(-1)},${hy(-1)}`} fill={color} />
    </g>
  );
}

/** Tiro parabólico: composición de un MRU horizontal y un MRUA vertical. */
export function buildParabolico(): AnimBuild {
  return {
    label: "Tiro parabólico: movimiento horizontal uniforme y vertical uniformemente acelerado",
    beatMs: 5600,
    captions: [
      "Un proyectil se lanza con **velocidad inicial v₀** formando un ángulo **θ** con la horizontal. Solo actúa la **gravedad**.",
      "**Horizontal**: no hay aceleración → **MRU**. Recorre **distancias iguales en tiempos iguales**: **vₓ = v₀·cos θ** constante.",
      "**Vertical**: aceleración **−g** → **MRUA**. Sube frenándose hasta v_y = 0 en el punto más alto y luego baja acelerando.",
      "Al **componer** ambos movimientos resulta una **parábola**. La velocidad es siempre **tangente** y su componente horizontal **no cambia**.",
      "El **alcance** es máximo con θ = **45°**; el tiempo de vuelo depende solo de la componente vertical.",
    ],
    render: (beat) => {
      const pts = Array.from({ length: 41 }, (_, k) => pos((k / 40) * T)).map((p) => p.join(",")).join(" ");
      const marcas = [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4];
      return (
        <Canvas>
          <line x1={60} y1={Y0} x2={740} y2={Y0} stroke={MANIM.ink} strokeWidth={3} />
          <Fade show={beat === 0}>
            <Flecha x1={X0} y1={Y0} x2={X0 + 110} y2={Y0 - 130} color={MANIM.yellow} />
            <Txt x={X0 + 140} y={Y0 - 130} size={22} color={MANIM.yellow}>v₀</Txt>
            <path d={`M ${X0 + 50} ${Y0} A 50 50 0 0 0 ${X0 + 38} ${Y0 - 32}`} fill="none" stroke={MANIM.ink} strokeWidth={2} />
            <Txt x={X0 + 80} y={Y0 - 14} size={18} color={MANIM.ink}>θ</Txt>
          </Fade>
          <Fade show={beat === 1}>
            {marcas.map((t) => <circle key={t} cx={pos(t)[0]} cy={Y0 + 24} r={7} fill={MANIM.green} />)}
            <Txt x={400} y={Y0 + 56} size={20} color={MANIM.green}>MRU: x = vₓ·t (separaciones iguales)</Txt>
          </Fade>
          <Fade show={beat === 2}>
            {marcas.map((t) => <circle key={t} cx={X0 - 30} cy={pos(t)[1]} r={7} fill={MANIM.red} />)}
            <Txt x={X0 - 30} y={Y0 + 56} size={18} color={MANIM.red}>MRUA: y = v_y·t − ½gt²</Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <polyline points={pts} fill="none" stroke={MANIM.blue} strokeWidth={4} />
            {[0.5, 1.5, 2.5, 3.5].map((t) => {
              const [px, py] = pos(t);
              const vy = (VY - G * t) * 0.9;
              return (
                <g key={t}>
                  <circle cx={px} cy={py} r={6} fill={MANIM.orange} />
                  <Flecha x1={px} y1={py} x2={px + VX * 0.7} y2={py} color={MANIM.green} />
                  <Flecha x1={px} y1={py} x2={px} y2={py - vy * 0.35} color={MANIM.red} />
                </g>
              );
            })}
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={400} y={44} size={26} color={MANIM.yellow}>alcance máximo: θ = 45°</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
