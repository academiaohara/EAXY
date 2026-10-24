import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

/** Polilínea «M x y L x y …» a partir de puntos ya en coordenadas del lienzo. */
export const poly = (pts: readonly (readonly [number, number])[]) =>
  pts.map(([x, y], i) => `${i ? "L" : "M"} ${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");

/** Piloto: apagado (contorno) o encendido (relleno). */
export function Lamp({ x, y, on, color = MANIM.yellow, r = 16 }: { x: number; y: number; on: boolean; color?: string; r?: number }) {
  return (
    <g className="anim-t">
      <circle cx={x} cy={y} r={r} fill={on ? color : MANIM.surface} stroke={on ? color : MANIM.muted} strokeWidth={3} />
      {on ? <circle cx={x} cy={y} r={r + 7} fill="none" stroke={color} strokeWidth={2} opacity={0.45} /> : null}
    </g>
  );
}

/** Varias líneas de texto alineadas a la izquierda. */
export function Lines({ x, y, items, size = 18, gap = 28, anchor = "start" }: { x: number; y: number; items: { t: ReactNode; c?: string }[]; size?: number; gap?: number; anchor?: "start" | "middle" | "end" }) {
  return (
    <g>
      {items.map((it, i) => (
        <Txt key={i} x={x} y={y + i * gap} size={size} color={it.c ?? MANIM.ink} anchor={anchor} weight={500}>
          {it.t}
        </Txt>
      ))}
    </g>
  );
}

/* ───────────── 1. Señal analógica → digital ───────────── */

const SX0 = 80;
const SX1 = 440;
const SY0 = 330;
const SYH = 240; // altura de 12 V
const sx = (l: number) => SX0 + ((SX1 - SX0) * l) / 60;
const sy = (v: number) => SY0 - (SYH * v) / 12;

export function buildSenalAnalogicaDigital(): AnimBuild {
  const bitsOf = (beat: number) => (beat >= 3 ? 8 : beat === 2 ? 2 : 1);
  return {
    label: "De la magnitud física a bits: señal analógica, cuantización y resolución",
    beatMs: 5600,
    captions: [
      "Un **transductor** de nivel entrega una tensión proporcional al volumen: de 0 a 12 V para 0 a 60 L. La pendiente es $12/60 = 0{,}2\\ \\mathrm{V/L}$ (**sensibilidad**).",
      "Con **1 bit** solo distinguimos dos intervalos: por debajo de 6 V se lee **0** y por encima, **1**. Es lo que necesita una alarma de nivel.",
      "Con **2 bits** hay $2^2 = 4$ intervalos de 3 V: 00, 01, 10 y 11. Cada bit que se añade **duplica** el número de intervalos.",
      "Con **8 bits** hay 256 intervalos de $12/256 \\approx 0{,}047$ V. Con 35 L la señal es 7 V y el conversor entrega **10010101**.",
    ],
    render: (beat) => {
      const bits = bitsOf(beat);
      const n = 2 ** bits;
      const stair: [number, number][] = [];
      for (let i = 0; i < n; i += 1) {
        const yv = ((i + 0.5) * 12) / n;
        stair.push([sx((60 * i) / n), sy(yv)], [sx((60 * (i + 1)) / n), sy(yv)]);
      }
      const codes = bits === 1 ? ["0", "1"] : ["00", "01", "10", "11"];
      return (
        <Canvas>
          <Axes x0={SX0} y0={SY0} x1={SX1 + 20} y1={60} yLabel="Tensión (V)" />
          <Txt x={(SX0 + SX1) / 2} y={SY0 + 46} size={17} color={MANIM.muted}>
            Volumen (L)
          </Txt>
          {[0, 3, 6, 9, 12].map((v) => (
            <g key={v}>
              <line x1={SX0 - 5} y1={sy(v)} x2={SX0 + 5} y2={sy(v)} stroke={MANIM.muted} strokeWidth={2} />
              <Txt x={SX0 - 10} y={sy(v) + 5} size={15} color={MANIM.muted} anchor="end">
                {v}
              </Txt>
            </g>
          ))}
          {[0, 20, 40, 60].map((l) => (
            <Txt key={l} x={sx(l)} y={SY0 + 20} size={15} color={MANIM.muted}>
              {l}
            </Txt>
          ))}
          <DrawPath d={poly([[sx(0), sy(0)], [sx(60), sy(12)]])} color={MANIM.blue} width={4} show />
          <Fade show={beat >= 1}>
            <DrawPath d={poly(stair)} color={MANIM.orange} width={bits <= 2 ? 5 : 3} show />
            {bits <= 2
              ? Array.from({ length: n + 1 }, (_, i) => (
                  <line key={i} x1={SX0} y1={sy((12 * i) / n)} x2={SX1} y2={sy((12 * i) / n)} stroke={MANIM.grid} strokeWidth={1.5} strokeDasharray="5 5" />
                ))
              : null}
          </Fade>
          <Fade show={beat >= 3}>
            <line x1={sx(35)} y1={SY0} x2={sx(35)} y2={sy(7)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
            <line x1={SX0} y1={sy(7)} x2={sx(35)} y2={sy(7)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
            <circle cx={sx(35)} cy={sy(7)} r={6} fill={MANIM.yellow} />
          </Fade>
          {/* panel derecho */}
          <Fade show={beat >= 1 && bits <= 2}>
            <Txt x={520} y={80} size={20} color={MANIM.orange} anchor="start">
              {bits} bit{bits > 1 ? "s" : ""} → {n} intervalos
            </Txt>
            {codes.map((c, i) => {
              const lo = (12 * i) / n;
              const hi = (12 * (i + 1)) / n;
              const y = 270 - i * (bits === 1 ? 70 : 52);
              return (
                <g key={c}>
                  <rect x={520} y={y - 22} width={64} height={38} rx={8} fill={MANIM.panel} stroke={MANIM.orange} strokeWidth={2.5} />
                  <Txt x={552} y={y + 4} size={22} color={MANIM.yellow} mono>
                    {c}
                  </Txt>
                  <Txt x={600} y={y + 4} size={19} color={MANIM.ink} anchor="start">
                    {lo} – {hi} V
                  </Txt>
                </g>
              );
            })}
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={520} y={110} size={20} color={MANIM.blue} anchor="start">
              Señal analógica
            </Txt>
            <Lines
              x={520}
              y={146}
              items={[
                { t: "continua: entre dos valores" },
                { t: "siempre hay otro intermedio" },
                { t: "V = 0,2 · volumen", c: MANIM.yellow },
              ]}
            />
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={520} y={80} size={20} color={MANIM.orange} anchor="start">
              8 bits → 256 intervalos
            </Txt>
            <Lines
              x={520}
              y={130}
              items={[
                { t: "Resolución:" },
                { t: "12 / 256 ≈ 0,047 V", c: MANIM.green },
                { t: "35 L → 7 V", c: MANIM.yellow },
                { t: "7 / 12 · 256 ≈ 149", c: MANIM.yellow },
                { t: "149 = 10010101₂", c: MANIM.yellow },
              ]}
              gap={34}
              size={20}
            />
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 3. Detector inductivo ───────────── */

export function buildSensorInductivo(): AnimBuild {
  return {
    label: "Detector inductivo: oscilador LC, corrientes de Foucault y conmutación",
    beatMs: 5600,
    captions: [
      "El detector son tres etapas: un circuito **resonante LC** cuya bobina crea un campo magnético variable, una etapa de **conmutación** y un **amplificador** final con piloto.",
      "Sin metal delante, el oscilador vibra con **amplitud grande** y la salida está en reposo.",
      "Al acercarse una pieza de **acero**, el campo induce **corrientes de Foucault** en ella. Esas pérdidas le roban energía al oscilador.",
      "Dentro de la distancia de detección $S_n$ la amplitud cae por debajo del umbral: la etapa de conmutación **cambia la salida** y se enciende el piloto.",
      "Una pieza de **plástico** no tiene pérdidas por Foucault: el oscilador no se entera. Los inductivos solo reaccionan frente a **metales**.",
    ],
    render: (beat) => {
      const near = beat === 2 || beat === 3;
      const metal = beat <= 3;
      const objX = beat <= 1 ? 640 : beat === 2 ? 470 : beat === 3 ? 330 : 330;
      const amp = beat === 2 ? 28 : beat === 3 ? 10 : 36;
      const on = beat === 3;
      const wave = Array.from({ length: 161 }, (_, i) => {
        const x = 90 + (i * 620) / 160;
        return [x, 345 + amp * Math.sin((i / 160) * Math.PI * 14)] as [number, number];
      });
      const blocks = [
        { x: 120, t: "Oscilador LC", c: MANIM.blue },
        { x: 300, t: "Conmutación", c: MANIM.green },
        { x: 480, t: "Amplificador", c: MANIM.purple },
      ];
      return (
        <Canvas>
          {blocks.map((b, i) => (
            <g key={b.t}>
              <Box x={b.x} y={50} w={150} h={46} color={b.c} label={b.t} size={17} active={beat === 0 || i === 0 || (i === 1 && beat >= 3) || (i === 2 && beat >= 3)} />
              {i < 2 ? <Arrow x1={b.x + 78} y1={50} x2={blocks[i + 1]!.x - 78} y2={50} color={MANIM.muted} width={3} head={10} /> : null}
            </g>
          ))}
          <Arrow x1={558} y1={50} x2={612} y2={50} color={MANIM.muted} width={3} head={10} />
          <Lamp x={640} y={50} on={on} color={MANIM.green} />
          <Txt x={640} y={92} size={15} color={on ? MANIM.green : MANIM.muted}>
            {on ? "salida ON" : "salida OFF"}
          </Txt>
          {/* detector y campo */}
          <rect x={60} y={130} width={120} height={80} rx={10} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={4} />
          {[0, 1, 2, 3].map((i) => (
            <ellipse key={i} cx={158 - i * 0} cy={150 + i * 17} rx={10} ry={7} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          ))}
          <Txt x={100} y={176} size={16} color={MANIM.blue}>
            Sensor
          </Txt>
          {[0, 1, 2].map((i) => (
            <path key={i} d={`M 182 ${150 + i * 18} Q ${250 + i * 30} ${170} 182 ${204 - i * 18 + 0}`} fill="none" stroke={MANIM.yellow} strokeWidth={2.5} opacity={0.75} strokeDasharray="6 5" />
          ))}
          <line x1={330} y1={125} x2={330} y2={225} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="4 5" />
          <Txt x={330} y={118} size={15} color={MANIM.muted}>
            S_n
          </Txt>
          {/* pieza */}
          <g className="anim-t" style={{ transform: `translate(${objX - 330}px, 0px)` }}>
            <rect x={320} y={135} width={22} height={80} rx={3} fill={metal ? MANIM.blue : MANIM.orange} fillOpacity={0.3} stroke={metal ? MANIM.muted : MANIM.orange} strokeWidth={3} />
            <Txt x={331} y={238} size={14} color={metal ? MANIM.muted : MANIM.orange}>
              {metal ? "acero" : "plástico"}
            </Txt>
            <Fade show={near}>
              <ellipse cx={331} cy={158} rx={7} ry={11} fill="none" stroke={MANIM.red} strokeWidth={2.5} />
              <ellipse cx={331} cy={190} rx={7} ry={11} fill="none" stroke={MANIM.red} strokeWidth={2.5} />
            </Fade>
          </g>
          <Fade show={near}>
            <Txt x={520} y={165} size={17} color={MANIM.red} anchor="start">
              corrientes de Foucault
            </Txt>
            <Txt x={520} y={190} size={17} color={MANIM.red} anchor="start">
              → pérdidas de energía
            </Txt>
          </Fade>
          {/* oscilación */}
          <rect x={80} y={295} width={640} height={100} rx={8} fill={MANIM.surface} stroke={MANIM.grid} strokeWidth={2} />
          <line x1={80} y1={345 - 22} x2={720} y2={345 - 22} stroke={MANIM.red} strokeWidth={1.5} strokeDasharray="6 5" opacity={0.7} />
          <line x1={80} y1={345 + 22} x2={720} y2={345 + 22} stroke={MANIM.red} strokeWidth={1.5} strokeDasharray="6 5" opacity={0.7} />
          <Txt x={712} y={288} size={14} color={MANIM.red} anchor="end">
            umbral
          </Txt>
          <path d={poly(wave)} fill="none" stroke={amp < 22 ? MANIM.orange : MANIM.blue} strokeWidth={3} className="anim-t" />
          <Txt x={80} y={288} size={14} color={MANIM.muted} anchor="start">
            oscilación del circuito LC
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 4. Sensores ópticos ───────────── */

export function buildOpticaSensor(): AnimBuild {
  return {
    label: "Sensores ópticos: barrera, reflexión y proximidad (directo)",
    beatMs: 5600,
    captions: [
      "**Barrera**: emisor y receptor enfrentados. Con el camino libre el haz llega al receptor y la salida está en reposo.",
      "Al pasar un objeto, **corta el haz**: el receptor deja de ver luz y el detector conmuta. Alcance de las células: hasta **200 m**.",
      "**Reflexión**: emisor y receptor van en el mismo módulo y un **reflector** devuelve la luz. El objeto que se interpone la corta. Alcance: hasta **10 m**.",
      "**Proximidad** (directo): no hay reflector; el propio objeto **devuelve la luz** al receptor. Alcance: hasta **15 m**, según su color y brillo.",
      "La luz va **modulada en infrarrojo**: el receptor solo atiende a ese pulsado y es insensible a las luces parásitas del ambiente.",
    ],
    render: (beat) => {
      const mode = beat <= 1 ? "barrera" : beat === 2 ? "reflexion" : "proximidad";
      const blocked = beat === 1 || beat === 2;
      const detects = beat >= 1;
      return (
        <Canvas>
          <Txt x={400} y={44} size={24} color={MANIM.yellow}>
            {mode === "barrera" ? "Barrera" : mode === "reflexion" ? "Reflexión" : "Proximidad"}
          </Txt>
          {mode === "barrera" ? (
            <g>
              <Box x={110} y={190} w={120} h={70} color={MANIM.blue} label="Emisor" size={18} />
              <Box x={690} y={190} w={120} h={70} color={MANIM.green} label="Receptor" size={18} />
              <line x1={172} y1={190} x2={blocked ? 360 : 628} y2={190} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="12 8" className="anim-t" />
              <Fade show={blocked}>
                <rect x={370} y={130} width={50} height={120} rx={6} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.orange} strokeWidth={4} />
                <Txt x={395} y={285} size={17} color={MANIM.orange}>
                  objeto
                </Txt>
              </Fade>
            </g>
          ) : null}
          {mode === "reflexion" ? (
            <g>
              <Box x={110} y={190} w={130} h={90} color={MANIM.blue} label="" size={16} />
              <Txt x={110} y={178} size={16} color={MANIM.blue}>
                Emisor
              </Txt>
              <Txt x={110} y={210} size={16} color={MANIM.green}>
                Receptor
              </Txt>
              <rect x={672} y={140} width={26} height={100} rx={4} fill={MANIM.purple} fillOpacity={0.35} stroke={MANIM.purple} strokeWidth={4} />
              <Txt x={685} y={268} size={17} color={MANIM.purple}>
                reflector
              </Txt>
              <line x1={176} y1={176} x2={360} y2={176} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="12 8" />
              <line x1={176} y1={206} x2={360} y2={206} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="12 8" opacity={0.7} />
              <rect x={370} y={140} width={50} height={100} rx={6} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.orange} strokeWidth={4} />
              <Txt x={395} y={268} size={17} color={MANIM.orange}>
                objeto
              </Txt>
            </g>
          ) : null}
          {mode === "proximidad" ? (
            <g>
              <Box x={110} y={190} w={130} h={90} color={MANIM.blue} label="" size={16} />
              <Txt x={110} y={178} size={16} color={MANIM.blue}>
                Emisor
              </Txt>
              <Txt x={110} y={210} size={16} color={MANIM.green}>
                Receptor
              </Txt>
              <line x1={176} y1={176} x2={520} y2={176} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="12 8" />
              <line x1={520} y1={206} x2={176} y2={206} stroke={MANIM.yellow} strokeWidth={4} strokeDasharray="12 8" opacity={0.7} />
              <rect x={520} y={140} width={60} height={100} rx={6} fill={MANIM.orange} fillOpacity={0.35} stroke={MANIM.orange} strokeWidth={4} />
              <Txt x={550} y={268} size={17} color={MANIM.orange}>
                objeto
              </Txt>
            </g>
          ) : null}
          <Lamp x={400} y={355} on={detects} color={MANIM.green} r={14} />
          <Txt x={430} y={361} size={18} color={detects ? MANIM.green : MANIM.muted} anchor="start">
            {detects ? "Objeto detectado" : "Camino libre"}
          </Txt>
          <Fade show={beat === 4}>
            <rect x={150} y={300} width={500} height={40} rx={8} fill={MANIM.panel} stroke={MANIM.yellow} strokeWidth={2} />
            <Txt x={400} y={327} size={18} color={MANIM.yellow}>
              Haz IR pulsado → el receptor filtra la luz ambiente
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 6. Galga extensométrica ───────────── */

export function buildGalgaDeformacion(): AnimBuild {
  return {
    label: "Galga extensométrica: al deformarse la barra cambia su resistencia",
    beatMs: 5800,
    captions: [
      "Una **galga** es un hilo metálico en zigzag pegado a la pieza. Sin carga mide su resistencia nominal: $R_0 = 5000\\ \\Omega$.",
      "Al **traccionar** la barra con $F = 10\\,000$ N se alarga y la galga se estira con ella: el hilo se hace más largo y más fino, y su resistencia **sube**.",
      "La deformación unitaria sale de la ley de Hooke: $\\varepsilon = \\sigma/E = F/(S\\,E) = 10\\,000/(30\\cdot 220\\,000) = 0{,}0015$.",
      "Con factor de galga $K = 2{,}5$: $R = R_0(1 + K\\varepsilon) = 5000\\,(1 + 2{,}5 \\cdot 0{,}0015) = 5018{,}9\\ \\Omega$. Medir $R$ permite conocer la fuerza.",
    ],
    render: (beat) => {
      const stretched = beat >= 1;
      const L = stretched ? 440 : 400;
      const zig = (len: number, amp: number) => {
        const pts: [number, number][] = [];
        const n = 12;
        for (let i = 0; i <= n; i += 1) {
          pts.push([(len * i) / n, i % 2 === 0 ? -amp : amp]);
        }
        return pts;
      };
      const g = zig(L - 140, stretched ? 15 : 20).map(([x, y]) => [x + 170, y + 145] as [number, number]);
      return (
        <Canvas>
          {/* barra */}
          <rect x={80} y={105} width={L + 60} height={80} rx={4} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} className="anim-t" />
          <Txt x={110} y={210} size={16} color={MANIM.muted} anchor="start">
            Pletina de acero: E = 220 000 N/mm², S = 30 mm²
          </Txt>
          <rect x={60} y={95} width={18} height={100} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={3} />
          <Fade show={stretched}>
            <Arrow x1={80 + L + 60} y1={145} x2={80 + L + 140} y2={145} color={MANIM.red} width={6} head={16} />
            <Txt x={80 + L + 100} y={125} size={18} color={MANIM.red}>
              F
            </Txt>
          </Fade>
          <path d={poly(g)} fill="none" stroke={MANIM.yellow} strokeWidth={4} strokeLinejoin="round" className="anim-t" />
          <Txt x={170 + (L - 140) / 2} y={85} size={17} color={MANIM.yellow}>
            galga
          </Txt>
          <Fade show={stretched}>
            <HBraceLine x1={80} x2={80 + L + 60} y={235} label="L₀ + ΔL" />
          </Fade>
          {/* lecturas */}
          <rect x={90} y={280} width={190} height={100} rx={12} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={185} y={308} size={15} color={MANIM.muted}>
            Resistencia de la galga
          </Txt>
          <Txt x={185} y={355} size={34} color={beat >= 3 ? MANIM.green : MANIM.ink} mono>
            {beat >= 3 ? "5018,9 Ω" : "5000 Ω"}
          </Txt>
          <Fade show={beat >= 2}>
            <Lines
              x={320}
              y={300}
              size={19}
              gap={34}
              items={[
                { t: "σ = F/S = 333 N/mm²" },
                { t: "ε = σ/E = 0,0015", c: MANIM.orange },
                ...(beat >= 3 ? [{ t: "R = R₀(1 + K·ε)", c: MANIM.green }] : []),
              ]}
            />
          </Fade>
        </Canvas>
      );
    },
  };
}

function HBraceLine({ x1, x2, y, label }: { x1: number; x2: number; y: number; label: string }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={MANIM.red} strokeWidth={3} />
      <line x1={x1} y1={y - 8} x2={x1} y2={y + 8} stroke={MANIM.red} strokeWidth={3} />
      <line x1={x2} y1={y - 8} x2={x2} y2={y + 8} stroke={MANIM.red} strokeWidth={3} />
      <Txt x={(x1 + x2) / 2} y={y + 26} size={17} color={MANIM.red}>
        {label}
      </Txt>
    </g>
  );
}

/* ───────────── 7. Encoder y tacómetro ───────────── */

export function buildEncoderTacometro(): AnimBuild {
  const N = 12;
  return {
    label: "Medir la velocidad: encoder (impulsos) y tacómetro (tensión)",
    beatMs: 5800,
    captions: [
      "Un **disco ranurado** gira solidario con el eje. A un lado hay un emisor de luz y al otro un fotorreceptor.",
      "Cada **ranura** deja pasar la luz y el receptor genera un impulso. Contando impulsos se conoce el **ángulo girado**: con 12 ranuras, 30° por impulso.",
      "Con un **reloj** se cuentan los impulsos por segundo: $f = N\\,n/60$. A 600 rpm y 12 ranuras salen **120 Hz**. El encoder es captador de velocidad.",
      "El **tacómetro** es una dinamo: la tensión es proporcional a la velocidad, $e = K\\,B\\,\\omega$. Al duplicar la velocidad se duplica la tensión.",
    ],
    render: (beat) => {
      const cx = 200;
      const cy = 215;
      const R = 110;
      const rot = beat === 0 ? 0 : beat === 1 ? 18 : beat === 2 ? 40 : 0;
      const slots = Array.from({ length: N }, (_, i) => {
        const a = ((i * 360) / N + rot) * (Math.PI / 180);
        return { x: cx + (R - 22) * Math.cos(a), y: cy + (R - 22) * Math.sin(a), deg: (i * 360) / N + rot };
      });
      const pulses = (() => {
        const pts: [number, number][] = [];
        const x0 = 470;
        const w = 290;
        const n = 8;
        let x = x0;
        pts.push([x, 120]);
        for (let i = 0; i < n; i += 1) {
          const half = w / (2 * n);
          pts.push([x, 90], [x + half, 90], [x + half, 120], [x + 2 * half, 120]);
          x += 2 * half;
        }
        return pts;
      })();
      return (
        <Canvas>
          <g>
            <circle cx={cx} cy={cy} r={R} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={4} />
            <circle cx={cx} cy={cy} r={14} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={3} />
            <g className="anim-t" style={{ transform: `rotate(${rot}deg)`, transformOrigin: `${cx}px ${cy}px` }}>
              {slots.map((s, i) => (
                <rect key={i} x={s.x - 14} y={s.y - 6} width={28} height={12} rx={4} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={2.5} transform={`rotate(${s.deg - rot} ${s.x} ${s.y})`} />
              ))}
            </g>
          </g>
          <Box x={cx} y={55} w={110} h={40} color={MANIM.yellow} label="Emisor" size={16} />
          <Box x={cx} y={375} w={110} h={40} color={MANIM.green} label="Receptor" size={16} />
          <line x1={cx} y1={76} x2={cx} y2={354} stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" opacity={0.6} />
          <Fade show={beat >= 1 && beat <= 2}>
            <path d={poly(pulses)} fill="none" stroke={MANIM.green} strokeWidth={3.5} />
            <Txt x={470} y={78} size={15} color={MANIM.muted} anchor="start">
              impulsos del fotorreceptor
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Lines x={470} y={190} size={19} gap={32} items={[{ t: "12 ranuras → 12 impulsos/vuelta" }, { t: "360° / 12 = 30° por impulso", c: MANIM.yellow }]} />
          </Fade>
          <Fade show={beat === 2}>
            <Lines
              x={470}
              y={190}
              size={19}
              gap={32}
              items={[{ t: "f = N · n / 60" }, { t: "f = 12 · 600 / 60 = 120 Hz", c: MANIM.yellow }, { t: "n = 60 f / N", c: MANIM.green }]}
            />
          </Fade>
          <Fade show={beat === 3}>
            <Box x={560} y={110} w={140} h={50} color={MANIM.purple} label="Tacómetro" size={18} />
            {[
              { n: 600, v: 3.14, x: 470 },
              { n: 1200, v: 6.28, x: 620 },
            ].map((s) => (
              <g key={s.n}>
                <rect x={s.x} y={190} width={120} height={150} rx={10} fill={MANIM.surface} stroke={MANIM.purple} strokeWidth={3} />
                <Txt x={s.x + 60} y={214} size={16} color={MANIM.muted}>
                  {s.n} rpm
                </Txt>
                <rect x={s.x + 40} y={330 - s.v * 14} width={40} height={s.v * 14} fill={MANIM.purple} fillOpacity={0.5} stroke={MANIM.purple} strokeWidth={2} />
                <Txt x={s.x + 60} y={322 - s.v * 14} size={20} color={MANIM.yellow} mono>
                  {String(s.v).replace(".", ",")} V
                </Txt>
              </g>
            ))}
            <Txt x={560} y={365} size={18} color={MANIM.purple}>
              e = K · B · ω  (K·B = 0,05 V·s/rad)
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── 8. Presión: manómetros mecánicos ───────────── */

export function buildPresionManometros(): AnimBuild {
  return {
    label: "Presión: manómetro de columna y tubo Bourdon",
    beatMs: 5800,
    captions: [
      "El **manómetro de columna** (tubo en U) mide la presión **comparándola** con un líquido de densidad y altura conocidas: la presión es $p = \\rho\\,g\\,h$.",
      "Al aplicar presión, el líquido baja en un brazo y sube en el otro: la **diferencia de alturas $h$** es la medida. Sirve para presiones bajas.",
      "El **tubo Bourdon** es un tubo metálico de sección elíptica, curvado casi en anillo y cerrado por un extremo. Sin presión la aguja marca cero.",
      "Al aplicar presión, el tubo **tiende a enderezarse**: el movimiento del extremo cerrado, amplificado por una palanca o un piñón, mueve la aguja o un transductor eléctrico.",
    ],
    render: (beat) => {
      if (beat <= 1) {
        const d = beat === 1 ? 30 : 0;
        const yL = 180 + d;
        const yR = 180 - d;
        return (
          <Canvas>
            <path d={`M 281 ${yL} L 319 ${yL} L 319 290 Q 319 303 350 303 Q 381 303 381 290 L 381 ${yR} L 419 ${yR} L 419 300 Q 419 343 370 343 L 330 343 Q 281 343 281 300 Z`} fill={MANIM.blue} fillOpacity={0.45} className="anim-t" />
            <path d="M 280 70 L 280 300 Q 280 345 330 345 L 370 345 Q 420 345 420 300 L 420 70" fill="none" stroke={MANIM.muted} strokeWidth={5} />
            <path d="M 320 70 L 320 290 Q 320 305 350 305 Q 380 305 380 290 L 380 70" fill="none" stroke={MANIM.muted} strokeWidth={5} />
            <Arrow x1={225} y1={70} x2={278} y2={70} color={MANIM.red} width={5} />
            <Txt x={200} y={76} size={22} color={MANIM.red}>
              p
            </Txt>
            <Txt x={140} y={250} size={17} color={MANIM.muted}>
              {beat === 0 ? "p = 0: mismo nivel" : "p > 0"}
            </Txt>
            <Fade show={beat === 1}>
              <line x1={420} y1={yL} x2={480} y2={yL} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="4 4" />
              <line x1={420} y1={yR} x2={480} y2={yR} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="4 4" />
              <line x1={470} y1={yR} x2={470} y2={yL} stroke={MANIM.yellow} strokeWidth={3} />
              <Txt x={492} y={185} size={22} color={MANIM.yellow} anchor="start">
                h
              </Txt>
              <Txt x={560} y={330} size={22} color={MANIM.green}>
                p = ρ · g · h
              </Txt>
            </Fade>
          </Canvas>
        );
      }
      const open = beat === 3 ? 14 : 0;
      const cx = 260;
      const cy = 215;
      const Rr = 100;
      const a0 = -200;
      const a1 = 20 - open * 1.4;
      const pt = (a: number, r: number) => [cx + r * Math.cos((a * Math.PI) / 180), cy + r * Math.sin((a * Math.PI) / 180)] as const;
      const [sx0, sy0] = pt(a0, Rr);
      const [ex, ey] = pt(a1, Rr);
      const tipA = beat === 3 ? -14 : 0;
      return (
        <Canvas>
          <path d={`M ${sx0} ${sy0} A ${Rr} ${Rr} 0 1 1 ${ex} ${ey}`} fill="none" stroke={MANIM.blue} strokeWidth={22} strokeLinecap="round" className="anim-t" />
          <path d={`M ${sx0} ${sy0} A ${Rr} ${Rr} 0 1 1 ${ex} ${ey}`} fill="none" stroke={MANIM.surface} strokeWidth={10} strokeLinecap="round" className="anim-t" />
          <rect x={sx0 - 16} y={sy0 - 4} width={32} height={80} rx={4} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <Arrow x1={sx0} y1={sy0 + 160} x2={sx0} y2={sy0 + 82} color={MANIM.red} width={5} />
          <Txt x={sx0} y={sy0 + 190} size={18} color={MANIM.red}>
            presión p
          </Txt>
          <circle cx={ex} cy={ey} r={7} fill={MANIM.yellow} />
          <line x1={ex} y1={ey} x2={460} y2={ey + 40 + tipA * 2} stroke={MANIM.yellow} strokeWidth={3} className="anim-t" />
          <circle cx={560} cy={215} r={90} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={4} />
          {Array.from({ length: 9 }, (_, i) => {
            const a = (-210 + i * 30) * (Math.PI / 180);
            return <line key={i} x1={560 + 72 * Math.cos(a)} y1={215 + 72 * Math.sin(a)} x2={560 + 84 * Math.cos(a)} y2={215 + 84 * Math.sin(a)} stroke={MANIM.muted} strokeWidth={3} />;
          })}
          <g className="anim-t" style={{ transform: `rotate(${beat === 3 ? 70 : 0}deg)`, transformOrigin: "560px 215px" }}>
            <line x1={560} y1={215} x2={560 + 70 * Math.cos((-210 * Math.PI) / 180)} y2={215 + 70 * Math.sin((-210 * Math.PI) / 180)} stroke={MANIM.red} strokeWidth={4} strokeLinecap="round" />
          </g>
          <circle cx={560} cy={215} r={7} fill={MANIM.ink} />
          <Txt x={560} y={330} size={17} color={MANIM.muted}>
            {beat === 3 ? "aguja desviada" : "p = 0"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 8. Temperatura: termorresistencia, puente y termopar ───────────── */

export function buildTemperaturaCaptadores(): AnimBuild {
  return {
    label: "Temperatura: termorresistencia, puente de Wheatstone y termopar",
    beatMs: 5800,
    captions: [
      "Una **termorresistencia** cambia de resistencia con la temperatura: $R_T = R_0(1 + \\alpha T)$. El platino es casi lineal; un **NTC** baja con la temperatura y un **PTC** sube muy deprisa.",
      "Para medir esa resistencia se usa el **puente de Wheatstone**: con el puente equilibrado el voltímetro marca 0 V y $R_x = R_2 R_3 / R_1$.",
      "Un **termopar** son dos metales distintos unidos por un extremo. Si la unión se calienta, aparece una **fem proporcional** a la diferencia de temperatura entre sus extremos.",
    ],
    render: (beat) => {
      if (beat === 0) {
        const X0 = 110;
        const Y0 = 340;
        const X = (t: number) => X0 + (t / 200) * 560;
        const Y = (r: number) => Y0 - (r / 3) * 230;
        const ptc = Array.from({ length: 41 }, (_, i) => [X(i * 5), Y(0.35 + 2.4 * Math.pow(i / 40, 3.2))] as [number, number]);
        const ntc = Array.from({ length: 41 }, (_, i) => [X(i * 5), Y(2.6 * Math.exp(-i / 11) + 0.1)] as [number, number]);
        const pt = Array.from({ length: 41 }, (_, i) => [X(i * 5), Y(0.6 + 1.2 * (i / 40))] as [number, number]);
        return (
          <Canvas>
            <Axes x0={X0} y0={Y0} x1={700} y1={80} xLabel="T (°C)" yLabel="R" />
            <DrawPath d={poly(ptc)} color={MANIM.red} width={4} show />
            <DrawPath d={poly(ntc)} color={MANIM.blue} width={4} show />
            <DrawPath d={poly(pt)} color={MANIM.green} width={4} show />
            <Txt x={X(165)} y={Y(2.55) - 8} size={18} color={MANIM.red} anchor="start">
              PTC
            </Txt>
            <Txt x={X(58)} y={Y(1.15) - 12} size={18} color={MANIM.blue} anchor="start">
              NTC
            </Txt>
            <Txt x={X(120)} y={Y(1.42) + 28} size={18} color={MANIM.green} anchor="start">
              Pt (casi lineal)
            </Txt>
            <Txt x={400} y={52} size={20} color={MANIM.yellow}>
              R(T) = R₀ (1 + α T)
            </Txt>
          </Canvas>
        );
      }
      if (beat === 1) {
        return (
          <Canvas>
            <polygon points="300,60 440,200 300,340 160,200" fill="none" stroke={MANIM.ink} strokeWidth={3} />
            {[
              { x: 230, y: 130, t: "R₁", c: MANIM.red },
              { x: 370, y: 130, t: "R₂", c: MANIM.green },
              { x: 230, y: 270, t: "R₃", c: MANIM.blue },
              { x: 370, y: 270, t: "Rₓ", c: MANIM.orange },
            ].map((r) => (
              <g key={r.t}>
                <rect x={r.x - 28} y={r.y - 17} width={56} height={34} rx={6} fill={MANIM.surface} stroke={r.c} strokeWidth={3} />
                <Txt x={r.x} y={r.y + 7} size={20} color={r.c}>
                  {r.t}
                </Txt>
              </g>
            ))}
            <line x1={160} y1={200} x2={440} y2={200} stroke={MANIM.grid} strokeWidth={2} strokeDasharray="5 5" />
            <circle cx={300} cy={200} r={24} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={300} y={207} size={20} color={MANIM.yellow}>
              V
            </Txt>
            <Txt x={300} y={238} size={16} color={MANIM.yellow}>
              0 V
            </Txt>
            <Lines
              x={500}
              y={150}
              size={19}
              gap={34}
              items={[
                { t: "I₁R₁ = I₂R₂" },
                { t: "I₁R₃ = I₂Rₓ" },
                { t: "Rₓ = R₂R₃ / R₁", c: MANIM.green },
                { t: "R₂ = R₃ = 100 Ω", c: MANIM.muted },
              ]}
            />
          </Canvas>
        );
      }
      return (
        <Canvas>
          <path d="M 120 200 L 360 200" stroke={MANIM.blue} strokeWidth={8} strokeLinecap="round" />
          <path d="M 360 200 L 600 140" stroke={MANIM.orange} strokeWidth={8} strokeLinecap="round" />
          <path d="M 360 200 L 600 260" stroke={MANIM.green} strokeWidth={8} strokeLinecap="round" />
          <circle cx={360} cy={200} r={14} fill={MANIM.red} />
          <Txt x={360} y={166} size={18} color={MANIM.red}>
            unión caliente
          </Txt>
          <Txt x={240} y={185} size={16} color={MANIM.blue}>
            metal A
          </Txt>
          <Txt x={560} y={120} size={16} color={MANIM.orange}>
            metal B
          </Txt>
          <circle cx={680} cy={200} r={36} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={680} y={208} size={22} color={MANIM.yellow}>
            mV
          </Txt>
          <path d="M 600 140 L 650 140 L 650 190" fill="none" stroke={MANIM.ink} strokeWidth={3} />
          <path d="M 600 260 L 650 260 L 650 210" fill="none" stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={400} y={330} size={20} color={MANIM.yellow}>
            fem ∝ (T caliente − T fría)
          </Txt>
          <Txt x={400} y={364} size={17} color={MANIM.muted}>
            tipo K (cromel–alumel): 500 a 1000 °C
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 10. Amplificador operacional ───────────── */

export function buildOperacionalInversor(): AnimBuild {
  return {
    label: "Amplificador operacional ideal: inversor y comparador",
    beatMs: 6000,
    captions: [
      "El operacional tiene entrada **inversora (−)**, no inversora (+) y salida. En el modelo ideal la impedancia de entrada es **infinita**: por las entradas no entra corriente.",
      "Con la entrada (+) a masa, la (−) queda a **0 V** (masa virtual). La intensidad $I_1 = V_1/R_1$ no tiene otro camino que $R_2$, y $I_2 = V_0/R_2$ con $I_1 + I_2 = 0$.",
      "De ahí sale la ganancia del **inversor**: $V_0 = -\\dfrac{R_2}{R_1}\\,V_1$. Con 150 kΩ y 0,5 kΩ, una señal de 15 mV da **−4,5 V**: se amplifica ×300 y se invierte el signo.",
      "Como **comparador** con $R_1 = R_4$ y $R_2 = R_3$: $V_0 = \\dfrac{R_2}{R_1}(V_2 - V_1)$. La salida es la diferencia de las entradas, multiplicada.",
    ],
    render: (beat) => {
      const comp = beat === 3;
      return (
        <Canvas>
          <polygon points="360,120 360,300 520,210" fill={MANIM.panel} stroke={MANIM.ink} strokeWidth={4} />
          <Txt x={382} y={170} size={26} color={MANIM.red}>
            −
          </Txt>
          <Txt x={382} y={262} size={26} color={MANIM.green}>
            +
          </Txt>
          {/* entrada inversora */}
          <line x1={150} y1={160} x2={360} y2={160} stroke={MANIM.ink} strokeWidth={3} />
          <rect x={185} y={146} width={70} height={28} rx={4} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={3} />
          <Txt x={220} y={167} size={17} color={MANIM.blue}>
            R₁
          </Txt>
          <Txt x={130} y={166} size={20} color={MANIM.yellow} anchor="end">
            V₁
          </Txt>
          {/* realimentación */}
          <path d="M 300 160 L 300 80 L 560 80 L 560 210" fill="none" stroke={MANIM.ink} strokeWidth={3} />
          <rect x={395} y={66} width={70} height={28} rx={4} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={430} y={87} size={17} color={MANIM.orange}>
            R₂
          </Txt>
          <line x1={520} y1={210} x2={640} y2={210} stroke={MANIM.ink} strokeWidth={3} />
          <Txt x={660} y={216} size={20} color={MANIM.green} anchor="start">
            V₀
          </Txt>
          <circle cx={560} cy={210} r={4} fill={MANIM.ink} />
          <circle cx={300} cy={160} r={4} fill={MANIM.ink} />
          {/* entrada no inversora */}
          {comp ? (
            <g>
              <line x1={150} y1={260} x2={360} y2={260} stroke={MANIM.ink} strokeWidth={3} />
              <rect x={185} y={246} width={70} height={28} rx={4} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={3} />
              <Txt x={220} y={267} size={17} color={MANIM.blue}>
                R₄
              </Txt>
              <Txt x={130} y={266} size={20} color={MANIM.yellow} anchor="end">
                V₂
              </Txt>
              <line x1={300} y1={260} x2={300} y2={330} stroke={MANIM.ink} strokeWidth={3} />
              <rect x={286} y={290} width={28} height={30} rx={4} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
              <Txt x={338} y={312} size={17} color={MANIM.orange}>
                R₃
              </Txt>
              <line x1={280} y1={332} x2={320} y2={332} stroke={MANIM.ink} strokeWidth={3} />
            </g>
          ) : (
            <g>
              <line x1={330} y1={260} x2={360} y2={260} stroke={MANIM.ink} strokeWidth={3} />
              <line x1={330} y1={260} x2={330} y2={320} stroke={MANIM.ink} strokeWidth={3} />
              <line x1={310} y1={322} x2={350} y2={322} stroke={MANIM.ink} strokeWidth={3} />
              <line x1={318} y1={330} x2={342} y2={330} stroke={MANIM.ink} strokeWidth={3} />
            </g>
          )}
          <Fade show={beat === 1}>
            <Arrow x1={170} y1={138} x2={210} y2={138} color={MANIM.yellow} width={4} head={10} />
            <Txt x={190} y={124} size={16} color={MANIM.yellow}>
              I₁
            </Txt>
            <Arrow x1={480} y1={52} x2={430} y2={52} color={MANIM.yellow} width={4} head={10} />
            <Txt x={455} y={38} size={16} color={MANIM.yellow}>
              I₂
            </Txt>
            <Txt x={300} y={186} size={16} color={MANIM.muted} anchor="end">
              0 V
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <rect x={90} y={346} width={400} height={44} rx={10} fill={MANIM.surface} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={290} y={376} size={21} color={MANIM.green}>
              V₀ = −(150/0,5) · 15 mV = −4,5 V
            </Txt>
          </Fade>
          <Fade show={comp}>
            <Txt x={560} y={330} size={22} color={MANIM.green}>
              V₀ = (R₂/R₁)(V₂ − V₁)
            </Txt>
          </Fade>
          <Txt x={400} y={412} size={17} color={MANIM.muted}>
            {comp ? "Comparador (R₁ = R₄, R₂ = R₃)" : "Amplificador inversor"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── 11. Acelerador electrónico y ASR ───────────── */

export function buildAceleradorAsr(): AnimBuild {
  return {
    label: "El acelerador como reóstato: control electrónico de la mariposa y ASR",
    beatMs: 6000,
    captions: [
      "El pedal mueve **potenciómetros** (de grafito): su tensión informa de **cuánto** quiere acelerar el conductor. No hay cable de acero hasta el motor.",
      "El **módulo de control** compara esa orden con la posición real de la mariposa que mide un **captador inductivo**, y manda al **motor eléctrico** que la abra o la cierre.",
      "Si el sistema **ABS** detecta que una rueda desliza, el ordenador ordena reducir la apertura: entra menos aire, baja la potencia y la rueda **recupera tracción**.",
      "Todo está **duplicado** (incluso triplicado) para detectar averías. Si falla gravemente, un **muelle** cierra la mariposa y el coche no puede moverse.",
    ],
    render: (beat) => {
      return (
        <Canvas>
          <Box x={90} y={110} w={130} h={60} color={MANIM.blue} label="Pedal" size={19} />
          <Box x={90} y={200} w={130} h={44} color={MANIM.blue} label="Potenciómetros" size={14} />
          <Arrow x1={90} y1={138} x2={90} y2={176} color={MANIM.muted} width={3} head={10} />
          <Arrow x1={156} y1={200} x2={240} y2={200} color={MANIM.muted} width={4} />
          <Box x={330} y={200} w={170} h={90} color={MANIM.green} label="Control mariposa" size={17} />
          <Arrow x1={416} y1={200} x2={470} y2={200} color={beat >= 1 ? MANIM.yellow : MANIM.muted} width={4} />
          <Box x={540} y={200} w={140} h={60} color={MANIM.orange} label="Motor eléctrico" size={16} active={beat >= 1} />
          <Arrow x1={540} y1={232} x2={540} y2={290} color={beat >= 1 ? MANIM.yellow : MANIM.muted} width={4} />
          <Box x={540} y={320} w={150} h={52} color={MANIM.purple} label="Mariposa" size={18} />
          <Fade show={beat >= 1}>
            <Arrow x1={465} y1={320} x2={390} y2={250} color={MANIM.purple} width={4} />
            <Txt x={400} y={340} size={15} color={MANIM.purple} anchor="end">
              captador inductivo
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Box x={330} y={60} w={170} h={50} color={MANIM.red} label="ABS / ordenador" size={16} />
            <Arrow x1={330} y1={86} x2={330} y2={154} color={MANIM.red} width={5} />
            <Txt x={346} y={125} size={15} color={MANIM.red} anchor="start">
              rueda patina
            </Txt>
            <Txt x={630} y={326} size={17} color={MANIM.red} anchor="start">
              ↓ menos aire
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <rect x={60} y={355} width={680} height={44} rx={10} fill={MANIM.panel} stroke={MANIM.red} strokeWidth={3} />
            <Txt x={400} y={384} size={18} color={MANIM.red}>
              Sistema duplicado · en caso de avería grave el muelle cierra la mariposa
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
