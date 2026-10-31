import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

function Vaso({ x, color, etiqueta }: { x: number; color: string; etiqueta: string }) {
  return (
    <g>
      <rect x={x} y={170} width={200} height={170} fill={color} fillOpacity={0.22} stroke={MANIM.ink} strokeWidth={3} />
      <Txt x={x + 100} y={366} size={18} color={MANIM.muted}>{etiqueta}</Txt>
    </g>
  );
}

/** Pila Daniell: Zn (ánodo, oxidación) y Cu (cátodo, reducción), hilo conductor y puente salino. */
export function buildPilaDaniell(): AnimBuild {
  return {
    label: "Pila Daniell: cinc y cobre",
    beatMs: 5600,
    captions: [
      "Una **pila** separa las dos semirreacciones de una redox en dos **semipilas**. Aquí: una lámina de **Zn** en ZnSO₄ y otra de **Cu** en CuSO₄.",
      "En el **ánodo (−)**, el Zn **se oxida**: Zn → Zn²⁺ + 2 e⁻. Los iones pasan a la disolución y la lámina se **desgasta**.",
      "Los **electrones** viajan por el **hilo** del ánodo al cátodo. Ese flujo es la **corriente eléctrica**.",
      "En el **cátodo (+)**, el Cu²⁺ **se reduce**: Cu²⁺ + 2 e⁻ → Cu. El cobre se **deposita** sobre la lámina.",
      "El **puente salino** cierra el circuito moviendo iones y mantiene neutras las disoluciones. **E° = 0,34 − (−0,76) = 1,10 V**.",
    ],
    render: (beat) => (
      <Canvas>
        <Vaso x={110} color={MANIM.blue} etiqueta="ZnSO₄ (ánodo −)" />
        <Vaso x={490} color={MANIM.orange} etiqueta="CuSO₄ (cátodo +)" />
        <rect x={190} y={120} width={30} height={200} fill={MANIM.muted} fillOpacity={0.8} stroke={MANIM.ink} strokeWidth={2} />
        <rect x={570} y={120} width={30 + (beat >= 3 ? 12 : 0)} height={200} fill={MANIM.red} fillOpacity={0.75} stroke={MANIM.ink} strokeWidth={2} />
        <Txt x={205} y={108} size={20} color={MANIM.ink}>Zn</Txt>
        <Txt x={585} y={108} size={20} color={MANIM.ink}>Cu</Txt>
        <path d="M 205 120 L 205 60 L 585 60 L 585 120" fill="none" stroke={MANIM.ink} strokeWidth={4} />
        <rect x={300} y={90} width={200} height={50} rx={4} fill={MANIM.yellow} fillOpacity={0.12} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 4" />
        <path d="M 310 200 L 310 130 L 490 130 L 490 200" fill="none" stroke={MANIM.green} strokeWidth={10} opacity={0.5} />
        <Txt x={400} y={150} size={14} color={MANIM.green}>puente salino</Txt>
        <Fade show={beat >= 1}>
          {[0, 1, 2].map((k) => <circle key={k} cx={250 + k * 22} cy={230 + (k % 2) * 30} r={9} fill={MANIM.blue} />)}
          <Txt x={150} y={260} size={20} color={MANIM.blue}>Zn²⁺</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          {[0, 1, 2, 3].map((k) => <circle key={k} cx={260 + k * 90} cy={52} r={7} fill={MANIM.yellow} />)}
          <Txt x={400} y={30} size={20} color={MANIM.yellow}>e⁻ →</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={690} y={260} size={20} color={MANIM.orange}>Cu²⁺ → Cu</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Txt x={400} y={410} size={26} color={MANIM.yellow}>E° = 1,10 V</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
