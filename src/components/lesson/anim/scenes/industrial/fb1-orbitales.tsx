import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const CY = 200;

function Lobulos({ cx, ang, color }: { cx: number; ang: number; color: string }) {
  return (
    <g transform={`translate(${cx} ${CY}) rotate(${ang})`}>
      <ellipse cx={0} cy={-46} rx={26} ry={46} fill={color} fillOpacity={0.45} stroke={color} strokeWidth={3} />
      <ellipse cx={0} cy={46} rx={26} ry={46} fill={color} fillOpacity={0.45} stroke={color} strokeWidth={3} />
    </g>
  );
}

/** De las órbitas de Bohr a los orbitales: nubes de probabilidad con forma s, p y d. */
export function buildOrbitales(): AnimBuild {
  return {
    label: "Orbitales atómicos: formas s, p y d",
    beatMs: 5600,
    captions: [
      "Bohr colocaba al electrón en **órbitas** con trayectoria definida. El modelo **mecanocuántico** lo sustituye por **orbitales**.",
      "Un **orbital** es la región del espacio donde hay **mayor probabilidad** (≈ 90 %) de encontrar al electrón. El orbital **s** (l = 0) es **esférico**.",
      "Los orbitales **p** (l = 1) tienen dos **lóbulos**. Hay **tres**, orientados según x, y, z (**m_l = −1, 0, +1**).",
      "Los orbitales **d** (l = 2) son **cinco**, con cuatro lóbulos en su mayoría. Los **f** (l = 3) son siete.",
      "Cada orbital admite como máximo **2 electrones** de espín opuesto: s → 2, p → 6, d → 10, f → 14.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <circle cx={400} cy={CY} r={22} fill={MANIM.red} />
          <circle cx={400} cy={CY} r={70} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
          <circle cx={400} cy={CY} r={125} fill="none" stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 6" />
          <circle cx={470} cy={CY} r={10} fill={MANIM.yellow} />
          <Txt x={400} y={370} size={20} color={MANIM.muted}>órbitas de Bohr</Txt>
        </Fade>
        <Fade show={beat >= 1 && beat < 4}>
          <g>
            <circle cx={beat === 1 ? 400 : 160} cy={CY} r={beat === 1 ? 90 : 38} fill={MANIM.blue} fillOpacity={0.35} stroke={MANIM.blue} strokeWidth={3} />
            <circle cx={beat === 1 ? 400 : 160} cy={CY} r={5} fill={MANIM.red} />
            <Txt x={beat === 1 ? 400 : 160} y={beat === 1 ? 330 : 280} size={22} color={MANIM.blue}>s</Txt>
          </g>
        </Fade>
        <Fade show={beat >= 2 && beat < 4}>
          <Lobulos cx={400} ang={0} color={MANIM.orange} />
          <Lobulos cx={400} ang={90} color={MANIM.green} />
          <Lobulos cx={400} ang={45} color={MANIM.purple} />
          <Txt x={400} y={350} size={22} color={MANIM.orange}>p (pₓ, p_y, p_z)</Txt>
        </Fade>
        <Fade show={beat >= 3 && beat < 4}>
          <g>
            {[0, 90].map((a) => (
              <g key={a} transform={`translate(640 ${CY}) rotate(${a + 45})`}>
                <ellipse cx={0} cy={-34} rx={18} ry={32} fill={MANIM.red} fillOpacity={0.45} stroke={MANIM.red} strokeWidth={3} />
                <ellipse cx={0} cy={34} rx={18} ry={32} fill={MANIM.red} fillOpacity={0.45} stroke={MANIM.red} strokeWidth={3} />
              </g>
            ))}
            <Txt x={640} y={310} size={22} color={MANIM.red}>d</Txt>
          </g>
        </Fade>
        <Fade show={beat >= 4}>
          {[["s", 2, MANIM.blue], ["p", 6, MANIM.orange], ["d", 10, MANIM.red], ["f", 14, MANIM.purple]].map(([l, n, c], k) => (
            <g key={String(l)}>
              <rect x={170 + k * 140} y={170} width={100} height={60} rx={8} fill="none" stroke={String(c)} strokeWidth={3} />
              <Txt x={220 + k * 140} y={208} size={28} color={String(c)}>{`${l}: ${n} e⁻`}</Txt>
            </g>
          ))}
        </Fade>
      </Canvas>
    ),
  };
}
