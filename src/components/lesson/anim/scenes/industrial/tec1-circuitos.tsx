import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/** Resistencia en zigzag, horizontal, centrada en (x, y). */
function Res({ x, y, w = 90, color = MANIM.orange, label }: { x: number; y: number; w?: number; color?: string; label?: string }) {
  const n = 6;
  const pts = [`${x - w / 2},${y}`, ...Array.from({ length: n }, (_, i) => `${x - w / 2 + ((i + 0.5) * w) / n},${y + (i % 2 ? 14 : -14)}`), `${x + w / 2},${y}`].join(" ");
  return (
    <g>
      <polyline points={pts} fill="none" stroke={color} strokeWidth={4} strokeLinejoin="round" />
      {label ? (
        <Txt x={x} y={y - 26} size={18} color={color}>
          {label}
        </Txt>
      ) : null}
    </g>
  );
}

/** Pila: placa larga (+) y corta (−), vertical. */
function Pila({ x, y, label }: { x: number; y: number; label?: string }) {
  return (
    <g>
      <line x1={x - 22} y1={y - 12} x2={x + 22} y2={y - 12} stroke={MANIM.yellow} strokeWidth={5} />
      <line x1={x - 12} y1={y + 12} x2={x + 12} y2={y + 12} stroke={MANIM.yellow} strokeWidth={5} />
      <Txt x={x + 36} y={y - 8} size={18} color={MANIM.red}>
        +
      </Txt>
      <Txt x={x + 36} y={y + 24} size={18} color={MANIM.blue}>
        −
      </Txt>
      {label ? (
        <Txt x={x - 54} y={y + 6} size={20} color={MANIM.yellow}>
          {label}
        </Txt>
      ) : null}
    </g>
  );
}

/* ───────────── Cargas, tensión, intensidad y resistencia ───────────── */

export function buildCargaMovilCircuito(): AnimBuild {
  const dots = Array.from({ length: 12 }, (_, i) => i);
  const pos = (i: number, shift: number) => {
    // posición sobre el rectángulo (130,90)-(670,300), recorrido en sentido horario
    const per = 2 * (540 + 210);
    let d = ((i * per) / 12 + shift) % per;
    if (d < 540) return { x: 130 + d, y: 90 };
    d -= 540;
    if (d < 210) return { x: 670, y: 90 + d };
    d -= 210;
    if (d < 540) return { x: 670 - d, y: 300 };
    d -= 540;
    return { x: 130, y: 300 - d };
  };
  return {
    label: "Circuito eléctrico: la pila impulsa las cargas, la resistencia limita el flujo",
    beatMs: 5600,
    captions: [
      "Un conductor contiene **cargas libres** (electrones) que se mueven al azar: no hay corriente neta sin una causa que las empuje.",
      "La **pila** crea una **diferencia de potencial** (tensión, $V$, en voltios) entre sus bornes: es lo que empuja a las cargas por el circuito, como una bomba de agua.",
      "Las cargas circulan: la **intensidad** $I$ (en amperios) mide cuántas cargas pasan por segundo: $1\\ \\text{A} = 1\\ \\text{C/s}$. Sentido convencional: de $+$ a $-$ fuera de la pila.",
      "La **resistencia** $R$ (en ohmios) se opone al paso: con más resistencia, pasa menos corriente. Todo se resume en $I = V/R$.",
    ],
    render: (beat) => {
      const n = beat === 0 ? 12 : beat === 3 ? 5 : 10;
      const shift = beat * 120;
      return (
        <Canvas>
          <path d="M 130 90 L 670 90 L 670 300 L 130 300 Z" fill="none" stroke={MANIM.muted} strokeWidth={4} />
          <rect x={95} y={160} width={70} height={80} fill={MANIM.surface} />
          <Pila x={130} y={200} />
          <Fade show={beat >= 1}>
            <Txt x={130} y={265} size={20} color={MANIM.yellow} anchor="middle">
              V
            </Txt>
          </Fade>
          <rect x={560} y={140} width={220} height={120} fill={MANIM.surface} fillOpacity={0} />
          <g transform="translate(670 195) rotate(90) translate(-670 -195)">
            <Res x={670} y={195} w={beat === 3 ? 120 : 90} label={undefined} color={beat === 3 ? MANIM.red : MANIM.orange} />
          </g>
          <Fade show={beat >= 3}>
            <Txt x={720} y={200} size={22} color={MANIM.red} anchor="start">
              R ↑
            </Txt>
          </Fade>
          {dots.slice(0, n).map((i) => {
            const p = pos(i, beat === 0 ? (i % 5) * 60 : shift);
            return <circle key={i} cx={p.x} cy={beat === 0 ? p.y + ((i * 17) % 15) - 7 : p.y} r={7} fill={MANIM.blue} className="anim-t" />;
          })}
          <Fade show={beat >= 2}>
            <Arrow x1={300} y1={72} x2={420} y2={72} color={MANIM.green} width={5} />
            <Txt x={360} y={56} size={20} color={MANIM.green}>
              I
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={400} y={200} size={24} color={MANIM.yellow}>
              I = V / R
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Serie y paralelo: qué se reparte ───────────── */

export function buildSerieParaleloReparto(): AnimBuild {
  return {
    label: "Serie: misma intensidad, la tensión se reparte. Paralelo: misma tensión, la intensidad se reparte",
    beatMs: 5600,
    captions: [
      "**En serie** hay un único camino: R₁ = 2 Ω y R₂ = 4 Ω con una pila de 12 V. La resistencia total es $R_{eq} = 2 + 4 = 6\\ \\Omega$.",
      "Por un único camino pasa la **misma intensidad** en todo el circuito: $I = 12/6 = 2$ A. La **tensión se reparte** en proporción a cada resistencia: $V_1 = 4$ V y $V_2 = 8$ V (suman 12 V).",
      "**En paralelo** hay dos caminos: R₁ = 6 Ω y R₂ = 3 Ω, las dos conectadas directamente a los 12 V. $R_{eq}$ es menor que la menor: $1/R_{eq} = 1/6 + 1/3 \\Rightarrow R_{eq} = 2\\ \\Omega$.",
      "Las dos reciben la **misma tensión** (12 V) y la **intensidad se reparte**: $I_1 = 12/6 = 2$ A e $I_2 = 12/3 = 4$ A. La pila entrega $I = 6$ A.",
    ],
    render: (beat) => {
      const serie = beat < 2;
      return (
        <Canvas>
          {serie ? (
            <g>
              <path d="M 140 100 L 280 100 M 400 100 L 520 100 L 660 100 L 660 300 L 140 300 L 140 100" fill="none" stroke={MANIM.muted} strokeWidth={4} />
              <path d="M 280 100 L 280 100" stroke={MANIM.muted} />
              <Res x={340} y={100} w={110} color={MANIM.blue} label="R₁ = 2 Ω" />
              <Res x={590} y={100} w={110} color={MANIM.orange} label="R₂ = 4 Ω" />
              <rect x={100} y={170} width={80} height={60} fill={MANIM.surface} />
              <Pila x={140} y={200} />
              <Txt x={90} y={205} size={20} color={MANIM.yellow} anchor="end">
                12 V
              </Txt>
              <Fade show={beat === 1}>
                <Txt x={340} y={150} size={20} color={MANIM.blue}>
                  V₁ = 4 V
                </Txt>
                <Txt x={590} y={150} size={20} color={MANIM.orange}>
                  V₂ = 8 V
                </Txt>
                <Arrow x1={380} y1={330} x2={480} y2={330} color={MANIM.green} width={5} />
                <Txt x={430} y={360} size={20} color={MANIM.green}>
                  I = 2 A (la misma en todo el circuito)
                </Txt>
              </Fade>
            </g>
          ) : (
            <g>
              <path d="M 140 80 L 660 80 L 660 320 L 140 320 L 140 80 M 360 80 L 360 320 M 520 80 L 520 320" fill="none" stroke={MANIM.muted} strokeWidth={4} />
              <g transform="translate(360 200) rotate(90) translate(-360 -200)">
                <Res x={360} y={200} w={110} color={MANIM.blue} />
              </g>
              <g transform="translate(520 200) rotate(90) translate(-520 -200)">
                <Res x={520} y={200} w={110} color={MANIM.orange} />
              </g>
              <Txt x={400} y={205} size={20} color={MANIM.blue} anchor="start">
                R₁ = 6 Ω
              </Txt>
              <Txt x={560} y={205} size={20} color={MANIM.orange} anchor="start">
                R₂ = 3 Ω
              </Txt>
              <rect x={100} y={170} width={80} height={60} fill={MANIM.surface} />
              <Pila x={140} y={200} />
              <Txt x={90} y={205} size={20} color={MANIM.yellow} anchor="end">
                12 V
              </Txt>
              <Fade show={beat === 3}>
                <Txt x={300} y={270} size={20} color={MANIM.blue} anchor="end">
                  I₁ = 2 A
                </Txt>
                <Txt x={580} y={150} size={20} color={MANIM.orange} anchor="start">
                  I₂ = 4 A
                </Txt>
                <Txt x={250} y={55} size={20} color={MANIM.green}>
                  I = 6 A = 2 A + 4 A
                </Txt>
                <Txt x={440} y={345} size={20} color={MANIM.yellow}>
                  misma tensión: 12 V en cada rama
                </Txt>
              </Fade>
            </g>
          )}
        </Canvas>
      );
    },
  };
}

/* ───────────── Leyes de Kirchhoff ───────────── */

export function buildKirchhoffNodoMalla(): AnimBuild {
  return {
    label: "Kirchhoff: en un nudo, lo que entra sale; en una malla, las subidas igualan a las caídas",
    beatMs: 5600,
    captions: [
      "**Ley de los nudos**: en un nudo no se acumula carga. La suma de las intensidades que **entran** es igual a la de las que **salen**: $\\sum I = 0$.",
      "Entran $5$ A y $3$ A; sale $8$ A. Comprobación: $5 + 3 - 8 = 0$. Si falta una intensidad, la ley permite calcularla.",
      "**Ley de las mallas**: al recorrer un camino cerrado, las **subidas** de tensión (fuentes) igualan a las **caídas** (resistencias): $\\sum V = 0$.",
      "Pila de $12$ V con tres resistencias en serie que consumen $4$, $3$ y $5$ V: $12 - 4 - 3 - 5 = 0$. Con estas dos leyes y la de Ohm se resuelve cualquier circuito.",
    ],
    render: (beat) => (
      <Canvas>
        {beat < 2 ? (
          <g>
            <circle cx={400} cy={210} r={14} fill={MANIM.yellow} />
            <Txt x={400} y={246} size={20} color={MANIM.yellow}>
              nudo
            </Txt>
            <Arrow x1={170} y1={120} x2={386} y2={202} color={MANIM.green} width={6} />
            <Txt x={190} y={105} size={22} color={MANIM.green} anchor="start">
              I₁ = 5 A (entra)
            </Txt>
            <Arrow x1={170} y1={320} x2={386} y2={218} color={MANIM.green} width={6} />
            <Txt x={190} y={345} size={22} color={MANIM.green} anchor="start">
              I₂ = 3 A (entra)
            </Txt>
            <Arrow x1={414} y1={210} x2={640} y2={210} color={MANIM.red} width={6} />
            <Txt x={640} y={190} size={22} color={MANIM.red} anchor="end">
              I₃ = 8 A (sale)
            </Txt>
            <Fade show={beat === 1}>
              <Txt x={400} y={70} size={26} color={MANIM.blue}>
                5 + 3 − 8 = 0
              </Txt>
            </Fade>
          </g>
        ) : (
          <g>
            <path d="M 140 100 L 660 100 L 660 320 L 140 320 Z" fill="none" stroke={MANIM.muted} strokeWidth={4} />
            <rect x={100} y={170} width={80} height={80} fill={MANIM.surface} />
            <Pila x={140} y={210} />
            <Txt x={90} y={215} size={22} color={MANIM.yellow} anchor="end">
              +12 V
            </Txt>
            <Res x={300} y={100} w={100} color={MANIM.blue} />
            <Res x={500} y={100} w={100} color={MANIM.green} />
            <g transform="translate(660 210) rotate(90) translate(-660 -210)">
              <Res x={660} y={210} w={100} color={MANIM.orange} />
            </g>
            <Txt x={300} y={70} size={20} color={MANIM.blue}>
              −4 V
            </Txt>
            <Txt x={500} y={70} size={20} color={MANIM.green}>
              −3 V
            </Txt>
            <Txt x={700} y={215} size={20} color={MANIM.orange} anchor="start">
              −5 V
            </Txt>
            <Fade show={beat === 3}>
              <Txt x={400} y={220} size={26} color={MANIM.yellow}>
                12 − 4 − 3 − 5 = 0
              </Txt>
            </Fade>
          </g>
        )}
      </Canvas>
    ),
  };
}
