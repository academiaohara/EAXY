import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Búsqueda binaria ───────────── */

const LISTA = [2, 5, 8, 12, 16, 23, 28, 31, 38, 42, 47, 51, 56, 63, 70, 77];
const OBJETIVO = 51;
/** Tramos (bajo, alto, medio) de cada paso buscando 51. */
const PASOS = [
  { bajo: 0, alto: 15, medio: 7 },
  { bajo: 8, alto: 15, medio: 11 },
];

export function buildBusquedaBinaria(): AnimBuild {
  return {
    label: "Búsqueda binaria de un número en una lista ordenada de 16 elementos",
    beatMs: 5400,
    captions: [
      "Buscamos el **51** en una lista **ordenada** de 16 números. Un método lineal podría revisarlos todos.",
      "Se mira el **elemento central** (31). Como 51 > 31, el 51 solo puede estar en la **mitad derecha**: se descartan 8 números de golpe.",
      "Nuevo centro de la mitad restante: el **51**. ¡Encontrado en solo **2 comparaciones**!",
      "Cada comparación **descarta la mitad**: con 16 datos bastan como máximo 5 comparaciones; con 1 000 000, solo 20.",
    ],
    render: (beat) => {
      const paso = beat === 1 ? PASOS[0]! : beat >= 2 ? PASOS[1]! : null;
      return (
        <Canvas>
          {LISTA.map((v, i) => {
            const x = 40 + i * 45;
            const centro = paso && i === paso.medio;
            const hit = beat >= 2 && v === OBJETIVO;
            const fuera = beat >= 2 && i < 8;
            return (
              <g key={v}>
                <rect x={x} y={170} width={40} height={50} rx={5} fill={hit ? MANIM.green : centro ? MANIM.orange : MANIM.surface} fillOpacity={fuera ? 0.2 : hit || centro ? 0.8 : 0.7} stroke={MANIM.muted} strokeWidth={2} className="anim-t" />
                <Txt x={x + 20} y={195} size={18} color={fuera ? MANIM.muted : MANIM.ink}>
                  {String(v)}
                </Txt>
              </g>
            );
          })}
          <Fade show={beat === 1}>
            <rect x={40} y={165} width={8 * 45 - 5} height={60} rx={6} fill={MANIM.red} fillOpacity={0.12} stroke={MANIM.red} strokeWidth={2} strokeDasharray="6 4" />
            <Txt x={200} y={260} size={22} color={MANIM.red}>
              se descarta
            </Txt>
            <Txt x={40 + 7 * 45 + 20} y={150} size={20} color={MANIM.orange}>
              ▼ 31
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={40 + 11 * 45 + 20} y={150} size={20} color={MANIM.green}>
              ▼ 51
            </Txt>
            <Txt x={400} y={80} size={28} color={MANIM.green}>
              ¡encontrado!
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={400} y={90} size={26} color={MANIM.yellow}>
              ¿dónde está el 51?
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={400} y={90} size={26} color={MANIM.blue}>
              n datos → log₂ n comparaciones
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
