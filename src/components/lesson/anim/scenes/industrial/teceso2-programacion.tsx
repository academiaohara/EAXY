import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Un bucle «para» ejecutado paso a paso ───────────── */

const CODIGO = ["suma ← 0", "para i de 1 a 3:", "    suma ← suma + i", "mostrar suma"];

export function buildBucleTraza(): AnimBuild {
  // Línea resaltada, valor de i y de suma en cada paso
  const ESTADOS = [
    { l: 0, i: "—", suma: "0", salida: "" },
    { l: 2, i: "1", suma: "1", salida: "" },
    { l: 2, i: "2", suma: "3", salida: "" },
    { l: 2, i: "3", suma: "6", salida: "" },
    { l: 3, i: "3", suma: "6", salida: "6" },
  ];
  return {
    label: "Un bucle «para» ejecutado paso a paso con una tabla de variables",
    beatMs: 5600,
    captions: [
      "El programa empieza por la primera línea: **suma ← 0**. La variable **suma** guarda el valor 0.",
      "Entra en el **bucle** con **i = 1**: el cuerpo se ejecuta y **suma ← 0 + 1 = 1**.",
      "Segunda vuelta, **i = 2**: la misma instrucción da **suma ← 1 + 2 = 3**.",
      "Tercera vuelta, **i = 3**: **suma ← 3 + 3 = 6**. Ya se han hecho las **3 repeticiones**.",
      "Como **i** ha llegado al final, el bucle **termina** y el programa continúa: **mostrar suma** escribe **6**. Un bucle evita escribir la misma instrucción tres veces.",
    ],
    render: (beat) => {
      const e = ESTADOS[beat]!;
      return (
        <Canvas>
          <rect x={60} y={60} width={380} height={230} rx={14} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2} />
          {CODIGO.map((c, k) => (
            <g key={k}>
              {k === e.l ? <rect x={72} y={86 + k * 52} width={356} height={40} rx={8} fill={MANIM.yellow} fillOpacity={0.22} stroke={MANIM.yellow} strokeWidth={2} className="anim-t" /> : null}
              <text x={90} y={113 + k * 52} fill={k === e.l ? MANIM.yellow : MANIM.ink} fontSize={24} fontFamily="monospace" fontWeight={k === e.l ? 800 : 500}>
                {c}
              </text>
            </g>
          ))}
          <Txt x={560} y={80} size={22} color={MANIM.muted}>
            variables
          </Txt>
          <rect x={490} y={100} width={120} height={70} rx={10} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={550} y={128} size={20} color={MANIM.blue}>
            i
          </Txt>
          <Txt x={550} y={158} size={30} color={MANIM.ink}>
            {e.i}
          </Txt>
          <rect x={630} y={100} width={120} height={70} rx={10} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={690} y={128} size={20} color={MANIM.green}>
            suma
          </Txt>
          <Txt x={690} y={158} size={30} color={MANIM.ink}>
            {e.suma}
          </Txt>
          <Fade show={beat >= 1 && beat <= 3}>
            <Txt x={620} y={230} size={24} color={MANIM.yellow}>
              {`vuelta ${beat} de 3`}
            </Txt>
          </Fade>
          <Fade show={beat === 4}>
            <rect x={490} y={215} width={260} height={60} rx={10} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={4} />
            <Txt x={620} y={253} size={28} color={MANIM.green}>
              pantalla: 6
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
