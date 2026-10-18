import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const MX = 300;
const MW = 200;

/** Máquina que asocia a cada número `n` el resultado `a·n + b`; al final, la regla general. */
export function buildMaquinaFuncion(params: { a?: number; b?: number; nums?: number[] }): AnimBuild {
  const a = Math.max(1, params.a ?? 2);
  const b = params.b ?? 3;
  const nums = (params.nums?.length ? params.nums : [3, 5]).slice(0, 2);
  const sign = b < 0 ? "−" : "+";
  const absB = Math.abs(b);
  const rule = `${a === 1 ? "n" : `${a}n`} ${sign} ${absB}`;
  const out = (n: number) => a * n + b;
  const [n1, n2 = n1] = nums as [number, number?];

  return {
    label: `Máquina que a cada número n le asocia ${rule}: ${n1} → ${out(n1)}, ${n2} → ${out(n2)} y el caso general`,
    captions: [
      `La máquina siempre hace lo mismo: multiplica por **${a}** y ${b < 0 ? "resta" : "suma"} **${absB}**.`,
      `Entra $${n1}$: $${a} \\cdot ${n1} = ${a * n1}$ y $${a * n1} ${sign} ${absB} = ${out(n1)}$. Sale **${out(n1)}**.`,
      `Entra $${n2}$: $${a} \\cdot ${n2} = ${a * n2}$ y $${a * n2} ${sign} ${absB} = ${out(n2)}$. Sale **${out(n2)}**.`,
      `Con la letra $n$ describimos **cualquier** entrada a la vez: $n \\longrightarrow ${a === 1 ? "n" : `${a}n`} ${sign} ${absB}$.`,
    ],
    render: (beat) => {
      const n = beat === 1 ? n1 : n2;
      const general = beat >= 3;
      const showRun = beat === 1 || beat === 2;
      return (
        <Canvas>
          {/* máquina */}
          <rect x={MX} y={130} width={MW} height={150} rx={18} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={MX + MW / 2} y={175} size={24} color={MANIM.muted}>
            máquina
          </Txt>
          <Txt x={MX + MW / 2} y={235} size={36} color={MANIM.yellow}>
            {rule}
          </Txt>
          {/* flechas */}
          <line x1={150} y1={205} x2={MX - 8} y2={205} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
          <polygon points={`${MX - 8},195 ${MX + 8},205 ${MX - 8},215`} fill={MANIM.ink} />
          <line x1={MX + MW + 8} y1={205} x2={650} y2={205} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
          <polygon points={`650,195 666,205 650,215`} fill={MANIM.ink} />
          {/* entrada */}
          <Fade show={showRun || general} dx={-20}>
            <circle cx={110} cy={205} r={36} fill={MANIM.blue} fillOpacity={0.9} />
            <Txt x={110} y={217} size={34} color={MANIM.surface} weight={800}>
              {general ? "n" : String(n)}
            </Txt>
          </Fade>
          {/* salida */}
          <Fade show={showRun || general} dx={-20} delay={250}>
            <circle cx={700} cy={205} r={42} fill={MANIM.green} fillOpacity={0.9} />
            <Txt x={700} y={216} size={general ? 19 : 34} color={MANIM.surface} weight={800}>
              {general ? rule : String(out(n))}
            </Txt>
          </Fade>
          {/* cuenta */}
          <Fade show={showRun} dy={10}>
            <Txt x={400} y={340} size={30} color={MANIM.ink}>
              {`${a} · ${n} ${sign} ${absB} = ${out(n)}`}
            </Txt>
          </Fade>
          <Fade show={general} dy={10}>
            <Txt x={400} y={340} size={32} color={MANIM.yellow}>
              {`n → ${rule}`}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
