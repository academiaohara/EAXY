import { Canvas, Fade, HBrace, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const SYMBOLS = [
  { s: "I", v: "1" },
  { s: "V", v: "5" },
  { s: "X", v: "10" },
  { s: "L", v: "50" },
  { s: "C", v: "100" },
  { s: "D", v: "500" },
  { s: "M", v: "1 000" },
];

const SUBTRACTIVE = [
  { r: "IV", v: "4", why: "5 − 1" },
  { r: "IX", v: "9", why: "10 − 1" },
  { r: "XL", v: "40", why: "50 − 10" },
  { r: "XC", v: "90", why: "100 − 10" },
  { r: "CD", v: "400", why: "500 − 100" },
  { r: "CM", v: "900", why: "1 000 − 100" },
];

const SERIF = "var(--font-serif, Georgia, 'Times New Roman', serif)";

const CELL = 0.8;

/** Palabra romana en celdas de ancho fijo: devuelve las letras y el x de cada tramo. */
function Word({ text, cx, y, size, color = MANIM.ink }: { text: string; cx: number; y: number; size: number; color?: string }) {
  const w = size * CELL;
  const x0 = cx - (text.length * w) / 2;
  return (
    <g>
      {text.split("").map((ch, i) => (
        <Letter key={i} x={x0 + i * w + w / 2} y={y} size={size} color={color}>
          {ch}
        </Letter>
      ))}
    </g>
  );
}

function span(text: string, cx: number, size: number, from: number, to: number): [number, number] {
  const w = size * CELL;
  const x0 = cx - (text.length * w) / 2;
  return [x0 + from * w + 3, x0 + to * w - 3];
}

function Letter({ x, y, children, color = MANIM.ink, size = 84 }: { x: number; y: number; children: string; color?: string; size?: number }) {
  return (
    <text x={x} y={y} fontSize={size} fill={color} textAnchor="middle" fontWeight={600} style={{ fontFamily: SERIF }}>
      {children}
    </text>
  );
}

/** Romano: se suma… salvo cuando un símbolo menor va a la izquierda de uno mayor. */
export function buildRomanoResta(): AnimBuild {
  return {
    label: "Sistema romano: los símbolos suman, salvo I, X y C delante de un mayor, que restan",
    captions: [
      "Siete símbolos. Con ellos se escribe **cualquier** número natural.",
      "**VI**: el menor va a la **derecha** → se **suma**: $5 + 1 = 6$.",
      "**IV**: el menor va a la **izquierda** → se **resta**: $5 - 1 = 4$.",
      "Solo restan **I, X y C**, y solo delante de los dos símbolos siguientes. Son seis casos.",
      "Se lee por bloques: **XIV** = $10 + (5 - 1) = 14$. Y **MCCLXXX** = $1000 + 200 + 50 + 30 = 1\\,280$.",
    ],
    render: (beat) => (
      <Canvas>
        {/* Beat 0: los siete símbolos */}
        <Fade show={beat === 0} dy={12}>
          {SYMBOLS.map((sy, i) => (
            <g key={sy.s}>
              <Letter x={70 + i * 110} y={190}>{sy.s}</Letter>
              <Txt x={70 + i * 110} y={240} size={24} color={MANIM.yellow}>
                {sy.v}
              </Txt>
            </g>
          ))}
        </Fade>

        {/* Beats 1-2: VI vs IV */}
        <Fade show={beat === 1} dy={12}>
          <Letter x={340} y={200} color={MANIM.blue}>V</Letter>
          <Letter x={440} y={200} color={MANIM.green}>I</Letter>
          <HBrace show x1={300} x2={470} y={230} color={MANIM.yellow} label="5 + 1 = 6" />
          <Txt x={400} y={110} size={24} color={MANIM.muted}>
            el menor, a la derecha
          </Txt>
        </Fade>
        <Fade show={beat === 2} dy={12}>
          <Letter x={340} y={200} color={MANIM.green}>I</Letter>
          <Letter x={440} y={200} color={MANIM.blue}>V</Letter>
          <HBrace show x1={300} x2={470} y={230} color={MANIM.red} label="5 − 1 = 4" />
          <Txt x={400} y={110} size={24} color={MANIM.muted}>
            el menor, a la izquierda
          </Txt>
        </Fade>

        {/* Beat 3: los seis casos */}
        <Fade show={beat === 3} dy={12}>
          {SUBTRACTIVE.map((c, i) => {
            const col = i % 3;
            const row = Math.floor(i / 3);
            const x = 150 + col * 250;
            const y = 130 + row * 130;
            return (
              <g key={c.r}>
                <Letter x={x} y={y + 40} size={60} color={MANIM.red}>{c.r}</Letter>
                <Txt x={x} y={y + 78} size={20} color={MANIM.muted}>
                  {`${c.why} = ${c.v}`}
                </Txt>
              </g>
            );
          })}
        </Fade>

        {/* Beat 4: lectura por bloques */}
        <Fade show={beat === 4} dy={12}>
          <Word text="XIV" cx={210} y={170} size={64} />
          <HBrace show x1={span("XIV", 210, 64, 0, 1)[0]} x2={span("XIV", 210, 64, 0, 1)[1]} y={190} color={MANIM.purple} label="10" labelSize={22} />
          <HBrace show x1={span("XIV", 210, 64, 1, 3)[0]} x2={span("XIV", 210, 64, 1, 3)[1]} y={190} color={MANIM.red} label="5 − 1 = 4" labelSize={20} delay={200} />
          <Txt x={210} y={310} size={30} color={MANIM.yellow}>= 14</Txt>
          <Word text="MCCLXXX" cx={560} y={170} size={64} />
          <HBrace show x1={span("MCCLXXX", 560, 64, 0, 1)[0]} x2={span("MCCLXXX", 560, 64, 0, 1)[1]} y={190} color={MANIM.purple} label="1000" labelSize={18} />
          <HBrace show x1={span("MCCLXXX", 560, 64, 1, 3)[0]} x2={span("MCCLXXX", 560, 64, 1, 3)[1]} y={190} color={MANIM.orange} label="200" labelSize={18} delay={200} />
          <HBrace show x1={span("MCCLXXX", 560, 64, 3, 4)[0]} x2={span("MCCLXXX", 560, 64, 3, 4)[1]} y={190} color={MANIM.blue} label="50" labelSize={18} delay={400} />
          <HBrace show x1={span("MCCLXXX", 560, 64, 4, 7)[0]} x2={span("MCCLXXX", 560, 64, 4, 7)[1]} y={190} color={MANIM.green} label="30" labelSize={18} delay={600} />
          <Txt x={560} y={310} size={30} color={MANIM.yellow}>= 1 280</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

export { SUBTRACTIVE as ROMAN_SUBTRACTIVE_PAIRS };
