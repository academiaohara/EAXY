import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

/** Nudo sumador: círculo con aspa y los signos de sus entradas. */
function Sum({ x, y, plus = "+", minus = "−", minusSide = "bottom" }: { x: number; y: number; plus?: string; minus?: string; minusSide?: "bottom" | "top" }) {
  return (
    <g>
      <circle cx={x} cy={y} r={17} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
      <line x1={x - 10} y1={y - 10} x2={x + 10} y2={y + 10} stroke={MANIM.ink} strokeWidth={2.5} />
      <line x1={x - 10} y1={y + 10} x2={x + 10} y2={y - 10} stroke={MANIM.ink} strokeWidth={2.5} />
      <Txt x={x - 28} y={y - 10} size={18} color={MANIM.green}>
        {plus}
      </Txt>
      <Txt x={x + 14} y={minusSide === "bottom" ? y + 38 : y - 26} size={20} color={MANIM.red}>
        {minus}
      </Txt>
    </g>
  );
}

/* ───────────── Lazo abierto frente a lazo cerrado ───────────── */

export function buildLazoAbiertoCerrado(): AnimBuild {
  return {
    label: "Lazo abierto: no se entera de las perturbaciones. Lazo cerrado: mide la salida y corrige",
    beatMs: 5600,
    captions: [
      "**Lazo abierto**: la señal de mando pasa por los elementos de control y actúa sobre la planta. La salida **no influye** en la acción de control (un tostador, una lavadora…).",
      "Aparece una **perturbación** (cambia la demanda, la carga, la temperatura exterior). El sistema no lo sabe: la salida **se desvía** de la deseada y nadie lo corrige.",
      "**Lazo cerrado**: un **captador** mide la salida y la **realimenta**. Un comparador calcula la **señal de error** $e = r - y$ entre la referencia y la salida real.",
      "El controlador actúa sobre el error: aunque entre la perturbación, la salida **vuelve** hacia la referencia. Es más preciso, pero hay que vigilar la **estabilidad**.",
    ],
    render: (beat) => {
      const closed = beat >= 2;
      const pert = beat >= 1;
      const bad = pert && !closed;
      return (
        <Canvas>
          <Box x={70} y={190} w={110} h={64} color={MANIM.blue} label="Mando" size={19} />
          <Fade show={closed}>
            <Sum x={175} y={190} />
          </Fade>
          <Arrow x1={125} y1={190} x2={closed ? 156 : 225} y2={190} color={MANIM.muted} width={4} />
          <Fade show={closed}>
            <Arrow x1={192} y1={190} x2={225} y2={190} color={MANIM.muted} width={4} />
          </Fade>
          <Box x={290} y={190} w={130} h={64} color={MANIM.green} label="Control" size={19} />
          <Arrow x1={355} y1={190} x2={425} y2={190} color={MANIM.muted} width={4} />
          <Box x={485} y={190} w={120} h={64} color={MANIM.orange} label="Planta" size={19} />
          <Arrow x1={545} y1={190} x2={720} y2={190} color={bad ? MANIM.red : MANIM.green} width={5} />
          <Txt x={700} y={170} size={20} color={bad ? MANIM.red : MANIM.green} anchor="end">
            Salida
          </Txt>
          <Fade show={pert} dy={-14}>
            <Arrow x1={485} y1={60} x2={485} y2={155} color={MANIM.red} width={5} />
            <Txt x={485} y={46} size={19} color={MANIM.red}>
              Perturbación
            </Txt>
          </Fade>
          <Fade show={bad}>
            <Txt x={640} y={228} size={19} color={MANIM.red}>
              ≠ deseada
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={640} y={228} size={19} color={MANIM.green}>
              ≈ deseada ✓
            </Txt>
          </Fade>
          <Fade show={closed} dy={14}>
            <line x1={620} y1={190} x2={620} y2={320} stroke={MANIM.purple} strokeWidth={4} />
            <circle cx={620} cy={190} r={5} fill={MANIM.purple} />
            <Arrow x1={620} y1={320} x2={470} y2={320} color={MANIM.purple} width={4} />
            <Box x={400} y={320} w={130} h={58} color={MANIM.purple} label="Captador" size={18} />
            <line x1={335} y1={320} x2={175} y2={320} stroke={MANIM.purple} strokeWidth={4} />
            <Arrow x1={175} y1={320} x2={175} y2={214} color={MANIM.purple} width={4} />
            <Txt x={275} y={300} size={17} color={MANIM.purple}>
              realimentación
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Respuesta a un escalón ───────────── */

const ZETA = 0.35;
const WN = 1.6;
const WD = WN * Math.sqrt(1 - ZETA * ZETA);
const stepY = (t: number) => (t <= 0 ? 0 : 1 - Math.exp(-ZETA * WN * t) * (Math.cos(WD * t) + (ZETA / Math.sqrt(1 - ZETA * ZETA)) * Math.sin(WD * t)));

function firstCross(level: number): number {
  for (let t = 0; t < 12; t += 0.005) {
    if (stepY(t) >= level) {
      return t;
    }
  }
  return 12;
}

function settleTime(tol: number): number {
  let last = 0;
  for (let t = 0; t < 12; t += 0.005) {
    if (Math.abs(stepY(t) - 1) > tol) {
      last = t;
    }
  }
  return last;
}

export function buildRespuestaEscalon(): AnimBuild {
  const X0 = 100;
  const Y0 = 340;
  const SX = 50;
  const SY = 200;
  const X = (t: number) => X0 + SX * t;
  const Y = (y: number) => Y0 - SY * y;
  const pts = Array.from({ length: 241 }, (_, i) => {
    const t = i * 0.05;
    return `${i === 0 ? "M" : "L"} ${X(t).toFixed(1)} ${Y(stepY(t)).toFixed(1)}`;
  }).join(" ");
  const tp = Math.PI / WD;
  const mp = Math.exp((-Math.PI * ZETA) / Math.sqrt(1 - ZETA * ZETA));
  const t10 = firstCross(0.1);
  const t90 = firstCross(0.9);
  const ts = settleTime(0.02);
  return {
    label: "Respuesta transitoria a un escalón: ganancia, sobreoscilación, tiempos de retardo, subida, pico y establecimiento",
    beatMs: 5600,
    captions: [
      "Para estudiar el comportamiento se aplica una **señal escalón** (dar al interruptor): la entrada pasa de $0$ a $1$ en $t = 0$ y se mantiene.",
      "La salida no sigue al escalón al instante: tiene un **régimen transitorio** y acaba en un **régimen permanente**. La **ganancia** $K$ es el valor final dividido por la amplitud del escalón.",
      "**Sobreoscilación máxima** $M_P$: lo que el pico supera al valor final (en %). **Tiempo de pico** $t_p$: cuándo se alcanza.",
      "**Tiempo de retardo** $t_d$: hasta el $10\\,\\%$ del valor final. **Tiempo de subida** $t_r$: del $10\\,\\%$ al $90\\,\\%$. Dicen lo rápido que arranca.",
      "**Tiempo de establecimiento** $t_s$: desde el que la salida ya no sale de la banda de tolerancia ($\\pm 2\\,\\%$). Un sistema es **estable** si esas oscilaciones se apagan.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={X0} y0={Y0} x1={760} y1={50} xLabel="t" yLabel="salida" />
        <line x1={X0} y1={Y(1)} x2={750} y2={Y(1)} stroke={MANIM.green} strokeWidth={2} strokeDasharray="6 6" />
        <Txt x={X0 - 12} y={Y(1) + 6} size={17} color={MANIM.green} anchor="end">
          K
        </Txt>
        <polyline points={`${X0},${Y(0)} ${X0},${Y(1) - 0} 750,${Y(1) - 0}`} fill="none" stroke={MANIM.blue} strokeWidth={3} strokeOpacity={beat === 0 ? 1 : 0.35} />
        <Txt x={X(8.2)} y={Y(1) + 26} size={17} color={MANIM.blue} anchor="start" opacity={beat === 0 ? 1 : 0}>
          entrada escalón u(t)
        </Txt>
        <DrawPath show={beat >= 1} d={pts} color={MANIM.yellow} width={4} />
        <Fade show={beat >= 2}>
          <circle cx={X(tp)} cy={Y(1 + mp)} r={7} fill={MANIM.red} />
          <line x1={X(tp)} y1={Y(1 + mp)} x2={X(tp)} y2={Y0} stroke={MANIM.red} strokeWidth={2} strokeDasharray="5 5" />
          <line x1={X(tp) + 12} y1={Y(1 + mp)} x2={X(tp) + 12} y2={Y(1)} stroke={MANIM.red} strokeWidth={3} />
          <Txt x={X(tp) + 4} y={Y(1 + mp) - 16} size={19} color={MANIM.red} anchor="start">
            M_P
          </Txt>
          <Txt x={X(tp)} y={Y0 + 28} size={19} color={MANIM.red}>
            t_p
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={X0} y1={Y(0.1)} x2={X(t10)} y2={Y(0.1)} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="4 4" />
          <line x1={X0} y1={Y(0.9)} x2={X(t90)} y2={Y(0.9)} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="4 4" />
          <line x1={X(t10)} y1={Y(0.1)} x2={X(t10)} y2={Y0} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="4 4" />
          <line x1={X(t90)} y1={Y(0.9)} x2={X(t90)} y2={Y0} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="4 4" />
          <Txt x={X0 + (X(t10) - X0) / 2 - 8} y={Y0 + 52} size={18} color={MANIM.purple}>
            t_d
          </Txt>
          <Txt x={(X(t10) + X(t90)) / 2} y={Y0 + 28} size={18} color={MANIM.purple}>
            t_r
          </Txt>
          <Txt x={X0 - 12} y={Y(0.9) + 6} size={15} color={MANIM.purple} anchor="end">
            90 %
          </Txt>
          <Txt x={X0 - 12} y={Y(0.1) + 6} size={15} color={MANIM.purple} anchor="end">
            10 %
          </Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <rect x={X0} y={Y(1.02)} width={650} height={Y(0.98) - Y(1.02)} fill={MANIM.blue} fillOpacity={0.25} />
          <line x1={X(ts)} y1={Y(1) - 30} x2={X(ts)} y2={Y0} stroke={MANIM.blue} strokeWidth={2} strokeDasharray="5 5" />
          <Txt x={X(ts)} y={Y0 + 28} size={19} color={MANIM.blue}>
            t_s
          </Txt>
          <Txt x={700} y={Y(1) - 34} size={16} color={MANIM.blue}>
            banda ±2 %
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Polos en el plano de Laplace ───────────── */

export function buildPolosPlanoS(): AnimBuild {
  const CX = 200;
  const CY = 215;
  const PX = 90; // px por unidad real
  const PY = 36; // px por unidad imaginaria
  const casos = [
    { sigma: -0.5, color: MANIM.green, nombre: "polos con parte real negativa" },
    { sigma: 0, color: MANIM.yellow, nombre: "polos sobre el eje imaginario" },
    { sigma: 0.2, color: MANIM.red, nombre: "polos con parte real positiva" },
  ] as const;
  const W = 2.5;
  const T0 = 440;
  const wave = (sigma: number) =>
    Array.from({ length: 161 }, (_, i) => {
      const t = i * 0.0625;
      const a = Math.exp(sigma * t) * Math.cos(W * t);
      return `${i === 0 ? "M" : "L"} ${(T0 + 32 * t).toFixed(1)} ${(CY - 13 * a).toFixed(1)}`;
    }).join(" ");
  return {
    label: "Estabilidad y plano complejo de Laplace: la posición de los polos decide si la respuesta se apaga, se mantiene o crece",
    beatMs: 5600,
    captions: [
      "Los **polos** son las raíces de la ecuación característica, números complejos $s = \\sigma + j\\omega$. Se dibujan en el **plano complejo**: $\\sigma$ en horizontal, $\\omega$ en vertical.",
      "Polos en el **semiplano izquierdo** ($\\sigma < 0$): la respuesta lleva un factor $e^{\\sigma t}$ que **se apaga**. El sistema es **estable**.",
      "Polos **sobre el eje imaginario** ($\\sigma = 0$): la oscilación se mantiene con amplitud constante. Es el **límite de estabilidad**, que se considera también inestable.",
      "Polos en el **semiplano derecho** ($\\sigma > 0$): el factor $e^{\\sigma t}$ **crece** sin límite. Basta **un** polo ahí para que el sistema sea **inestable**.",
    ],
    render: (beat) => {
      const idx = beat - 1;
      const caso = idx >= 0 ? casos[idx]! : null;
      return (
        <Canvas>
          <rect x={30} y={60} width={CX - 30} height={310} fill={MANIM.green} fillOpacity={0.1} />
          <rect x={CX} y={60} width={CX + 20} height={310} fill={MANIM.red} fillOpacity={0.1} />
          <line x1={30} y1={CY} x2={420} y2={CY} stroke={MANIM.muted} strokeWidth={2.5} />
          <line x1={CX} y1={60} x2={CX} y2={370} stroke={MANIM.muted} strokeWidth={2.5} />
          <Txt x={415} y={CY + 22} size={17} color={MANIM.muted} anchor="end">
            σ
          </Txt>
          <Txt x={CX + 12} y={74} size={17} color={MANIM.muted} anchor="start">
            jω
          </Txt>
          <Txt x={115} y={92} size={17} color={MANIM.green}>
            estable
          </Txt>
          <Txt x={315} y={92} size={17} color={MANIM.red}>
            inestable
          </Txt>
          {caso ? (
            <g key={idx} className="anim-t">
              {[-1, 1].map((sg) => {
                const x = CX + caso.sigma * PX * 2;
                const y = CY - sg * W * PY;
                return (
                  <g key={sg}>
                    <line x1={x - 9} y1={y - 9} x2={x + 9} y2={y + 9} stroke={caso.color} strokeWidth={5} strokeLinecap="round" />
                    <line x1={x - 9} y1={y + 9} x2={x + 9} y2={y - 9} stroke={caso.color} strokeWidth={5} strokeLinecap="round" />
                  </g>
                );
              })}
              <Txt x={CX + 20} y={CY + 182} size={16} color={caso.color}>
                {caso.nombre}
              </Txt>
            </g>
          ) : null}
          <Axes x0={T0} y0={CY} x1={770} y1={80} xLabel="t" />
          <Txt x={T0 + 6} y={74} size={17} color={MANIM.muted} anchor="start">
            respuesta
          </Txt>
          {casos.map((c, i) => (
            <DrawPath key={c.nombre} show={beat === i + 1} d={wave(c.sigma)} color={c.color} width={4} />
          ))}
          <Fade show={beat >= 3}>
            <Txt x={T0 + 170} y={CY + 110} size={18} color={MANIM.red}>
              un solo polo a la derecha basta
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Reducción de diagramas de bloques ───────────── */

export function buildReduccionBloques(): AnimBuild {
  const eq = (x: number, y: number) => (
    <Txt x={x} y={y + 10} size={40} color={MANIM.ink}>
      ≡
    </Txt>
  );
  return {
    label: "Álgebra de bloques: serie, paralelo y bucle realimentado se reducen a un único bloque equivalente",
    beatMs: 5600,
    captions: [
      "**Serie**: la salida de un bloque es la entrada del siguiente. Las funciones de transferencia **se multiplican**: $G = G_1\\,G_2$.",
      "**Paralelo**: los dos bloques reciben la misma entrada y un **sumador** junta las salidas. Las funciones **se suman**: $G = G_1 + G_2$.",
      "**Anillo con realimentación directa** (resta): $V = G\\,(U - V)$. Despejando: $\\dfrac{V}{U} = \\dfrac{G}{1+G}$.",
      "**Realimentación a través de otro elemento** $H$: $\\dfrac{V}{U} = \\dfrac{G}{1+G\\,H}$. Es la forma general del lazo cerrado con realimentación negativa.",
    ],
    render: (beat) => (
      <Canvas>
        {beat === 0 ? (
          <g>
            <Arrow x1={20} y1={210} x2={78} y2={210} color={MANIM.muted} />
            <Box x={125} y={210} w={80} h={56} color={MANIM.blue} label="G₁" />
            <Arrow x1={165} y1={210} x2={218} y2={210} color={MANIM.muted} />
            <Box x={265} y={210} w={80} h={56} color={MANIM.green} label="G₂" />
            <Arrow x1={305} y1={210} x2={360} y2={210} color={MANIM.muted} />
            {eq(400, 205)}
            <Arrow x1={440} y1={210} x2={500} y2={210} color={MANIM.muted} />
            <Box x={600} y={210} w={170} h={64} color={MANIM.yellow} label="G₁ · G₂" size={22} />
            <Arrow x1={685} y1={210} x2={760} y2={210} color={MANIM.muted} />
          </g>
        ) : null}
        {beat === 1 ? (
          <g>
            <line x1={20} y1={210} x2={50} y2={210} stroke={MANIM.muted} strokeWidth={4} />
            <line x1={50} y1={130} x2={50} y2={290} stroke={MANIM.muted} strokeWidth={4} />
            <Arrow x1={50} y1={130} x2={88} y2={130} color={MANIM.muted} />
            <Arrow x1={50} y1={290} x2={88} y2={290} color={MANIM.muted} />
            <Box x={135} y={130} w={80} h={56} color={MANIM.blue} label="G₁" />
            <Box x={135} y={290} w={80} h={56} color={MANIM.green} label="G₂" />
            <line x1={175} y1={130} x2={265} y2={130} stroke={MANIM.muted} strokeWidth={4} />
            <Arrow x1={265} y1={130} x2={265} y2={190} color={MANIM.muted} />
            <line x1={175} y1={290} x2={265} y2={290} stroke={MANIM.muted} strokeWidth={4} />
            <Arrow x1={265} y1={290} x2={265} y2={230} color={MANIM.muted} />
            <Sum x={265} y={210} plus="+" minus="+" minusSide="bottom" />
            <Arrow x1={282} y1={210} x2={350} y2={210} color={MANIM.muted} />
            {eq(395, 205)}
            <Arrow x1={435} y1={210} x2={500} y2={210} color={MANIM.muted} />
            <Box x={600} y={210} w={170} h={64} color={MANIM.yellow} label="G₁ + G₂" size={22} />
            <Arrow x1={685} y1={210} x2={760} y2={210} color={MANIM.muted} />
          </g>
        ) : null}
        {beat >= 2 ? (
          <g>
            <Arrow x1={15} y1={190} x2={60} y2={190} color={MANIM.muted} />
            <Sum x={80} y={190} />
            <Arrow x1={97} y1={190} x2={160} y2={190} color={MANIM.muted} />
            <Box x={205} y={190} w={80} h={56} color={MANIM.blue} label="G" />
            <line x1={245} y1={190} x2={340} y2={190} stroke={MANIM.muted} strokeWidth={4} />
            <Arrow x1={300} y1={190} x2={340} y2={190} color={MANIM.muted} />
            <circle cx={300} cy={190} r={5} fill={MANIM.purple} />
            <line x1={300} y1={190} x2={300} y2={310} stroke={MANIM.purple} strokeWidth={4} />
            {beat === 2 ? (
              <line x1={300} y1={310} x2={80} y2={310} stroke={MANIM.purple} strokeWidth={4} />
            ) : (
              <g>
                <line x1={300} y1={310} x2={235} y2={310} stroke={MANIM.purple} strokeWidth={4} />
                <Box x={190} y={310} w={80} h={52} color={MANIM.purple} label="H" />
                <line x1={150} y1={310} x2={80} y2={310} stroke={MANIM.purple} strokeWidth={4} />
              </g>
            )}
            <Arrow x1={80} y1={310} x2={80} y2={209} color={MANIM.purple} />
            {eq(395, 185)}
            <Arrow x1={435} y1={190} x2={490} y2={190} color={MANIM.muted} />
            <Box x={605} y={190} w={190} h={76} color={MANIM.yellow} label={beat === 2 ? "G / (1 + G)" : "G / (1 + G·H)"} size={22} />
            <Arrow x1={700} y1={190} x2={770} y2={190} color={MANIM.muted} />
          </g>
        ) : null}
      </Canvas>
    ),
  };
}

/* ───────────── Controlador proporcional: el offset, y cómo lo quita la integral ───────────── */

export function buildOffsetProporcional(): AnimBuild {
  const X0 = 100;
  const Y0 = 350;
  const SX = 50;
  const SY = 190;
  const T0 = 3;
  const X = (t: number) => X0 + SX * t;
  const Y = (v: number) => Y0 - SY * v;
  const path = (f: (u: number) => number) =>
    Array.from({ length: 241 }, (_, i) => {
      const t = i * 0.05;
      const v = t <= T0 ? 1 : f(t - T0);
      return `${i === 0 ? "M" : "L"} ${X(t).toFixed(1)} ${Y(v).toFixed(1)}`;
    }).join(" ");
  const OFF = 0.3;
  const pPath = path((u) => 1 - OFF * (1 - Math.exp(-u / 0.9)));
  const piPath = path((u) => 1 - 0.45 * (u / 1.3) * Math.exp(1 - u / 1.3));
  return {
    label: "Control proporcional del nivel de un depósito: queda un offset; añadir acción integral lo elimina",
    beatMs: 5600,
    captions: [
      "Un regulador de nivel mantiene el depósito en el **punto de consigna** (PC). Con el consumo constante, el nivel coincide con él.",
      "El **consumo aumenta** de golpe: sale más agua de la que entra y el nivel empieza a bajar. El flotador abre más la válvula.",
      "Con acción **proporcional** la válvula solo se abre en proporción al error. Cuando entra tanto como sale, el nivel se estabiliza **por debajo** del PC: es el **offset**, el defecto del control P.",
      "Añadiendo acción **integral**, la válvula sigue abriéndose mientras exista error: el nivel **vuelve al PC** y el offset desaparece (regulador PI).",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={X0} y0={Y0} x1={760} y1={50} xLabel="t" yLabel="nivel" />
        <line x1={X0} y1={Y(1)} x2={750} y2={Y(1)} stroke={MANIM.green} strokeWidth={2} strokeDasharray="6 6" />
        <Txt x={750} y={Y(1) - 10} size={17} color={MANIM.green} anchor="end">
          PC (consigna)
        </Txt>
        <DrawPath show={beat === 0} d={path(() => 1)} color={MANIM.blue} width={4} />
        <DrawPath show={beat === 1} d={path((u) => 1 - 0.3 * Math.min(1, u / 1.2))} color={MANIM.blue} width={4} />
        <Fade show={beat >= 1} dy={-10}>
          <line x1={X(T0)} y1={60} x2={X(T0)} y2={Y0} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="5 5" />
          <Txt x={X(T0) + 8} y={80} size={18} color={MANIM.orange} anchor="start">
            ↑ consumo
          </Txt>
        </Fade>
        <DrawPath show={beat === 2} d={pPath} color={MANIM.yellow} width={4} />
        <Fade show={beat === 2}>
          <line x1={X(11)} y1={Y(1)} x2={X(11)} y2={Y(1 - OFF)} stroke={MANIM.red} strokeWidth={4} />
          <Txt x={X(11) - 10} y={(Y(1) + Y(1 - OFF)) / 2 + 6} size={20} color={MANIM.red} anchor="end">
            offset
          </Txt>
        </Fade>
        <DrawPath show={beat >= 3} d={piPath} color={MANIM.purple} width={4} />
        <DrawPath show={beat >= 3} d={pPath} color={MANIM.yellow} width={3} opacity={0.35} />
        <Fade show={beat >= 3}>
          <Txt x={X(10.8)} y={Y(0.6)} size={17} color={MANIM.yellow}>
            solo P
          </Txt>
          <Txt x={X(10.8)} y={Y(1) + 24} size={17} color={MANIM.purple}>
            P + I
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Laplace: del tiempo al dominio de s y vuelta ───────────── */

export function buildLaplaceDominios(): AnimBuild {
  return {
    label: "Transformada de Laplace: la ecuación diferencial se convierte en álgebra y se vuelve al tiempo",
    beatMs: 5600,
    captions: [
      "El sistema se describe con una **ecuación diferencial** en el tiempo. Resolverla directamente (derivando e integrando) es un camino largo.",
      "La **transformada de Laplace** $\\mathcal{L}$ lleva la ecuación al dominio de $s$: **derivar** pasa a ser **multiplicar por $s$**.",
      "En el dominio de $s$ es una ecuación **algebraica**: se despeja la salida $C(s)$ como un cociente de polinomios.",
      "La **transformada inversa** $\\mathcal{L}^{-1}$ devuelve $c(t)$, la respuesta en el tiempo. El camino de arriba es el más corto.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={40} y={90} width={300} height={170} rx={14} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={190} y={120} size={20} color={MANIM.blue}>
          Dominio del tiempo
        </Txt>
        <Txt x={190} y={170} size={24} color={MANIM.ink}>
          m·x″ + b·x′ + k·x = f(t)
        </Txt>
        <Txt x={190} y={220} size={18} color={MANIM.muted}>
          ecuación diferencial
        </Txt>
        <rect x={460} y={90} width={300} height={170} rx={14} fill={MANIM.green} fillOpacity={0.12} stroke={MANIM.green} strokeWidth={3} opacity={beat >= 1 ? 1 : 0.25} className="anim-t" />
        <Txt x={610} y={120} size={20} color={MANIM.green} opacity={beat >= 1 ? 1 : 0.25}>
          Dominio de s
        </Txt>
        <Fade show={beat >= 1}>
          <Txt x={610} y={170} size={22} color={MANIM.ink}>
            (m·s² + b·s + k)·X = F
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={610} y={220} size={22} color={MANIM.yellow}>
            X/F = 1 / (m·s² + b·s + k)
          </Txt>
        </Fade>
        <Fade show={beat >= 1}>
          <Arrow x1={350} y1={150} x2={450} y2={150} color={MANIM.green} width={5} />
          <Txt x={400} y={136} size={22} color={MANIM.green}>
            𝓛
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Arrow x1={450} y1={210} x2={350} y2={210} color={MANIM.orange} width={5} />
          <Txt x={400} y={238} size={22} color={MANIM.orange}>
            𝓛⁻¹
          </Txt>
        </Fade>
        <Fade show={beat === 0}>
          <path d="M 190 262 C 190 330 610 330 610 262" fill="none" stroke={MANIM.red} strokeWidth={4} strokeDasharray="8 8" />
          <Txt x={400} y={350} size={19} color={MANIM.red}>
            resolver directamente: derivar e integrar (difícil)
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <path d="M 190 90 C 190 40 610 40 610 90" fill="none" stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={400} y={34} size={19} color={MANIM.yellow}>
            álgebra en lugar de cálculo
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
