import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── De un croquis 2D a un sólido 3D ───────────── */

export function buildExtrusionPerfil(): AnimBuild {
  const L: [number, number][] = [[0, 0], [3, 0], [3, 1], [1, 1], [1, 3], [0, 3]];
  const u = 46;
  const P2 = (x: number, y: number) => [110 + x * u, 330 - y * u] as const;
  const iso = (x: number, y: number, z: number) => [560 + (x - y) * u * 0.6, 330 - (x + y) * u * 0.34 - z * u * 0.8] as const;
  const pts2 = L.map(([x, y]) => P2(x, y).join(",")).join(" ");
  const h = 2.2;
  return {
    label: "Modelado 3D: un croquis 2D acotado se extruye hasta formar un sólido",
    beatMs: 5600,
    captions: [
      "Un modelador **CAD 3D** empieza casi siempre con un **croquis 2D** sobre un plano: aquí, un perfil en L.",
      "Se añaden las **cotas** y las **restricciones** (lados paralelos, ángulos de 90°). El programa recalcula el dibujo si se cambia una medida.",
      "La operación **extrusión** da **altura** al perfil: se empuja el croquis en la dirección perpendicular a su plano.",
      "Resultado: un **sólido** del que el programa conoce el **volumen**, la **masa** (si se elige el material) y las vistas 2D.",
      "Después se aplican otras operaciones: **agujeros**, **chaflanes**, **redondeos**. Y el modelo se puede **imprimir en 3D** o enviar a una máquina de corte.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 2}>
          <polygon points={pts2} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={4} />
        </Fade>
        <Fade show={beat === 1 || beat === 2}>
          <line x1={110} y1={350} x2={110 + 3 * u} y2={350} stroke={MANIM.yellow} strokeWidth={2} />
          <Txt x={110 + 1.5 * u} y={372} size={18} color={MANIM.yellow}>
            30
          </Txt>
          <line x1={86} y1={330} x2={86} y2={330 - 3 * u} stroke={MANIM.yellow} strokeWidth={2} />
          <Txt x={64} y={330 - 1.5 * u} size={18} color={MANIM.yellow}>
            30
          </Txt>
          <line x1={110 + 3 * u + 22} y1={330} x2={110 + 3 * u + 22} y2={330 - u} stroke={MANIM.yellow} strokeWidth={2} />
          <Txt x={110 + 3 * u + 44} y={330 - 0.5 * u} size={18} color={MANIM.yellow}>
            10
          </Txt>
          <Txt x={110 + 2 * u} y={330 - 2 * u} size={20} color={MANIM.green}>
            ⟂ ∥
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Arrow x1={470} y1={290} x2={590} y2={180} color={MANIM.orange} width={5} />
          <Txt x={560} y={150} size={20} color={MANIM.orange}>
            extruir 22 mm
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          {L.map(([x, y], i) => {
            const q = L[(i + 1) % L.length]!;
            const A = iso(x, y, 0);
            const B = iso(q[0], q[1], 0);
            const C = iso(q[0], q[1], h);
            const D = iso(x, y, h);
            return <polygon key={i} points={[A, B, C, D].map((p) => p.join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.3 + (i % 2) * 0.12} stroke={MANIM.surface} strokeWidth={1.5} />;
          })}
          <polygon points={L.map(([x, y]) => iso(x, y, h).join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.ink} strokeWidth={3} />
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={560} y={400} size={18} color={MANIM.yellow}>
            volumen y masa calculados automáticamente
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <circle cx={iso(0.45, 2.2, h)[0]} cy={iso(0.45, 2.2, h)[1]} r={9} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={560} y={400} size={18} color={MANIM.orange}>
            agujero · chaflán · redondeo → impresión 3D
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
