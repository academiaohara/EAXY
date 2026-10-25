import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Ciclo de instrucción de la CPU ───────────── */

export function buildCicloInstruccion(): AnimBuild {
  const prog = ["1: LEER  a", "2: LEER  b", "3: SUMAR a, b", "4: ESCRIBIR"];
  return {
    label: "Ciclo de instrucción: captar, decodificar y ejecutar",
    beatMs: 5600,
    captions: [
      "Un programa es una **lista de instrucciones** guardada en la **memoria RAM**. La CPU tiene un **contador de programa (PC)** que dice cuál toca ahora.",
      "**Captar (fetch)**: la CPU lee de la RAM la instrucción a la que apunta el PC, la **3**, y la guarda en su registro de instrucción.",
      "**Decodificar**: la unidad de control interpreta la instrucción: «sumar los valores de a y de b».",
      "**Ejecutar**: la ALU (unidad aritmético-lógica) hace la suma y guarda el resultado en un registro.",
      "El PC avanza a la siguiente instrucción y el ciclo se repite **miles de millones de veces por segundo** (los GHz de la CPU).",
    ],
    render: (beat) => {
      const pc = beat < 4 ? 2 : 3;
      return (
        <Canvas>
          <rect x={50} y={60} width={240} height={290} rx={12} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={170} y={90} size={22} color={MANIM.blue}>
            Memoria RAM
          </Txt>
          {prog.map((p, i) => (
            <g key={p}>
              <rect x={70} y={110 + i * 56} width={200} height={42} rx={6} fill={i === pc ? "rgba(255,216,102,0.2)" : MANIM.panel} stroke={i === pc ? MANIM.yellow : MANIM.grid} strokeWidth={i === pc ? 4 : 2} className="anim-t" />
              <Txt x={170} y={138 + i * 56} size={18} mono color={i === pc ? MANIM.yellow : MANIM.ink}>
                {p}
              </Txt>
            </g>
          ))}
          <rect x={380} y={60} width={370} height={290} rx={12} fill={MANIM.surface} stroke={MANIM.red} strokeWidth={4} />
          <Txt x={565} y={90} size={22} color={MANIM.red}>
            CPU
          </Txt>
          <Box x={480} y={140} w={160} h={44} color={MANIM.yellow} label={`PC = ${pc + 1}`} size={18} active={beat === 0 || beat === 4} />
          <Box x={650} y={140} w={160} h={44} color={MANIM.orange} label="Registro de instr." size={15} active={beat === 1} />
          <Box x={480} y={240} w={160} h={60} color={MANIM.purple} label="Unidad de control" size={16} active={beat === 2} />
          <Box x={650} y={240} w={160} h={60} color={MANIM.green} label="ALU" size={20} active={beat === 3} />
          <Fade show={beat === 1}>
            <Arrow x1={272} y1={110 + pc * 56 + 21} x2={566} y2={142} color={MANIM.yellow} width={5} />
            <Txt x={420} y={375} size={18} color={MANIM.yellow}>
              captar
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Arrow x1={650} y1={165} x2={560} y2={218} color={MANIM.purple} width={5} />
            <Txt x={565} y={375} size={18} color={MANIM.purple}>
              decodificar
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Arrow x1={562} y1={240} x2={568} y2={240} color={MANIM.green} width={5} />
            <Txt x={720} y={190} size={20} color={MANIM.green} anchor="end">
              a + b = 12
            </Txt>
            <Txt x={680} y={375} size={18} color={MANIM.green}>
              ejecutar
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Un bucle for, iteración a iteración ───────────── */

export function buildBucleIteraciones(): AnimBuild {
  const codigo = ["suma = 0", "for i in range(1, 4):", "\u00a0\u00a0\u00a0\u00a0suma += i", 'print("Suma:", suma)'];
  const estados = [
    { l: 0, i: "—", s: "—", out: "" },
    { l: 2, i: "1", s: "1", out: "" },
    { l: 2, i: "2", s: "3", out: "" },
    { l: 2, i: "3", s: "6", out: "" },
    { l: 3, i: "3", s: "6", out: "Suma: 6" },
  ];
  return {
    label: "Un bucle for: la misma línea se ejecuta una vez por cada valor de la secuencia",
    beatMs: 5600,
    captions: [
      "Antes del bucle, la variable `suma` vale 0. Ahora viene un `for`: repetirá el bloque con sangría **una vez por cada valor** de la secuencia.",
      "`range(1, 4)` produce 1, 2, 3 (el final **no** se incluye). **Iteración 1**: `i = 1` y `suma += i` deja `suma = 1`.",
      "**Iteración 2**: `i = 2` y `suma` pasa a 3. Fíjate: `suma` **acumula**, `i` solo toma el valor del momento.",
      "**Iteración 3**: `i = 3` y `suma = 6`. Era el último valor de la secuencia.",
      "Se acaba la secuencia, el programa **sale del bucle** y ejecuta la siguiente línea, fuera de la sangría: imprime 6. El bloque se ejecutó 3 veces.",
    ],
    render: (beat) => {
      const e = estados[beat]!;
      return (
        <Canvas>
          <rect x={40} y={50} width={420} height={230} rx={10} fill={MANIM.surface} stroke={MANIM.grid} strokeWidth={3} />
          {codigo.map((c, k) => (
            <g key={c}>
              <rect x={50} y={64 + k * 52} width={400} height={40} rx={6} fill={k === e.l ? "rgba(255,216,102,0.2)" : "none"} stroke={k === e.l ? MANIM.yellow : "none"} strokeWidth={3} className="anim-t" />
              <Txt x={70 + (c.startsWith("\u00a0") ? 36 : 0)} y={92 + k * 52} size={20} mono anchor="start" color={k === e.l ? MANIM.yellow : MANIM.ink}>
                {c.trim()}
              </Txt>
            </g>
          ))}
          <rect x={500} y={50} width={260} height={160} rx={10} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={630} y={80} size={18} color={MANIM.blue}>
            Variables
          </Txt>
          <Txt x={540} y={125} size={26} mono anchor="start" color={MANIM.orange}>
            i = {e.i}
          </Txt>
          <Txt x={540} y={170} size={26} mono anchor="start" color={MANIM.green}>
            suma = {e.s}
          </Txt>
          <rect x={500} y={230} width={260} height={50} rx={10} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={630} y={262} size={20} mono color={MANIM.green}>
            {e.out || "salida: —"}
          </Txt>
          <Fade show={beat >= 1 && beat <= 3}>
            <Txt x={250} y={330} size={20} color={MANIM.yellow}>
              Iteración {beat} de 3
            </Txt>
          </Fade>
          <Fade show={beat === 4}>
            <Txt x={250} y={330} size={20} color={MANIM.green}>
              El bloque se ejecutó 3 veces
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
