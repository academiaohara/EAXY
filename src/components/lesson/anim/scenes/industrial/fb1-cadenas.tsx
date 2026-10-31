import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const zig = (x0: number, y0: number, n: number, dx: number): [number, number][] => Array.from({ length: n }, (_, i) => [x0 + i * dx, y0 + (i % 2 === 0 ? 0 : -dx * 0.55)] as [number, number]);
const camino = (pts: [number, number][]): string => pts.map((p, i) => `${i ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");

/** Cadenas del carbono: lineal, ramificada, cíclica y aromática, en fórmula de esqueleto. */
export function buildCadenasCarbono(): AnimBuild {
  return {
    label: "Cadenas carbonadas: lineal, ramificada, cíclica y aromática",
    beatMs: 5600,
    captions: [
      "El **carbono** forma **4 enlaces** (tetravalencia). Se une a otros carbonos y a H, O, N, halógenos… En la **fórmula de esqueleto**, cada **vértice** es un C con sus H sobrentendidos.",
      "**Cadena lineal** (abierta): butano, CH₃–CH₂–CH₂–CH₃. Los carbonos forman una línea en zigzag.",
      "**Cadena ramificada**: una cadena lateral sale de la principal. El 2-metilpropano tiene la misma fórmula que el butano (C₄H₁₀): son **isómeros**.",
      "**Cadena cíclica**: los extremos se unen en un anillo. El **ciclohexano** es C₆H₁₂ (dos H menos que el hexano).",
      "El **benceno** (C₆H₆) es un anillo **aromático**: seis carbonos con electrones π **deslocalizados**, muy estables. Se dibuja con un círculo o con enlaces alternos.",
    ],
    render: (beat) => {
      const lineal = zig(130, 250, 4, 90);
      const ramas = zig(130, 250, 3, 90);
      const hex = (cx: number, cy: number, r: number): [number, number][] => Array.from({ length: 6 }, (_, k) => [cx + r * Math.cos((Math.PI / 3) * k + Math.PI / 6), cy + r * Math.sin((Math.PI / 3) * k + Math.PI / 6)] as [number, number]);
      return (
        <Canvas>
          <Fade show={beat === 0}>
            <circle cx={400} cy={200} r={22} fill={MANIM.yellow} />
            <Txt x={400} y={207} size={20} color="#000">C</Txt>
            {[[400, 100], [400, 300], [300, 200], [500, 200]].map(([x, y], k) => <g key={k}><line x1={400} y1={200} x2={x} y2={y} stroke={MANIM.ink} strokeWidth={4} /><circle cx={x} cy={y} r={14} fill={MANIM.blue} /></g>)}
            <Txt x={400} y={360} size={20} color={MANIM.muted}>4 enlaces: metano CH₄</Txt>
          </Fade>
          <Fade show={beat === 1}>
            <path d={camino(lineal)} fill="none" stroke={MANIM.blue} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" transform="translate(130 -40)" />
            <Txt x={400} y={340} size={22} color={MANIM.blue}>butano (C₄H₁₀)</Txt>
          </Fade>
          <Fade show={beat === 2}>
            <path d={camino(ramas)} fill="none" stroke={MANIM.orange} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" transform="translate(130 -40)" />
            <line x1={350} y1={160} x2={350} y2={70} stroke={MANIM.green} strokeWidth={6} strokeLinecap="round" />
            <Txt x={392} y={100} size={18} color={MANIM.green}>–CH₃</Txt>
            <Txt x={400} y={340} size={22} color={MANIM.orange}>2-metilpropano (C₄H₁₀)</Txt>
          </Fade>
          <Fade show={beat === 3}>
            <polygon points={hex(400, 190, 90).map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.purple} strokeWidth={6} strokeLinejoin="round" />
            <Txt x={400} y={340} size={22} color={MANIM.purple}>ciclohexano (C₆H₁₂)</Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <polygon points={hex(400, 190, 90).map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.red} strokeWidth={6} strokeLinejoin="round" />
            <circle cx={400} cy={190} r={52} fill="none" stroke={MANIM.red} strokeWidth={4} />
            <Txt x={400} y={340} size={22} color={MANIM.red}>benceno (C₆H₆): aromático</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
