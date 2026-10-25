import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Un termostato como sistema de control ───────────── */

export function buildSistemaControlTermostato(): AnimBuild {
  return {
    label: "Bloques de un sistema de control: referencia, comparador, controlador, actuador, planta y sensor",
    beatMs: 5600,
    captions: [
      "El usuario fija la **referencia**: la temperatura deseada, $22\\ ^\\circ\\text{C}$. Es la señal de entrada del sistema.",
      "El **sensor** mide la temperatura real de la **planta** (la habitación) y la convierte en una señal que el controlador entiende.",
      "El **comparador** calcula el **error** $e = r - y$ entre lo deseado y lo medido. El **controlador** decide qué hacer con ese error: encender o apagar.",
      "El **actuador** (caldera y válvula) convierte la orden en **energía**: calienta la habitación. El controlador y el sensor manejan *información*; el actuador y la planta, *energía*.",
      "Una **perturbación** (una ventana abierta) enfría la habitación. Como el sensor lo detecta, el error crece y el sistema **corrige** sin intervención humana.",
    ],
    render: (beat) => (
      <Canvas>
        <Box x={80} y={150} w={120} h={56} color={MANIM.yellow} label="Referencia" size={16} active={beat === 0} />
        <circle cx={200} cy={150} r={16} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
        <Txt x={200} y={156} size={18}>
          Σ
        </Txt>
        <Arrow x1={140} y1={150} x2={182} y2={150} color={MANIM.muted} width={3} />
        <Arrow x1={216} y1={150} x2={262} y2={150} color={MANIM.muted} width={3} />
        <Box x={320} y={150} w={110} h={56} color={MANIM.green} label="Controlador" size={16} active={beat === 2} />
        <Arrow x1={376} y1={150} x2={432} y2={150} color={MANIM.orange} width={4} />
        <Box x={490} y={150} w={110} h={56} color={MANIM.orange} label="Actuador" size={16} active={beat === 3} />
        <Arrow x1={546} y1={150} x2={602} y2={150} color={MANIM.orange} width={4} />
        <Box x={660} y={150} w={110} h={56} color={MANIM.blue} label="Planta" size={16} active={beat === 1 || beat === 3} />
        <Arrow x1={716} y1={150} x2={780} y2={150} color={MANIM.blue} width={3} />
        <Txt x={760} y={125} size={14} color={MANIM.blue}>
          T real
        </Txt>
        <Fade show={beat >= 1}>
          <path d="M 740 150 L 740 300 L 460 300" fill="none" stroke={MANIM.purple} strokeWidth={3} />
          <Box x={400} y={300} w={110} h={50} color={MANIM.purple} label="Sensor" size={16} active={beat === 1} />
          <path d="M 345 300 L 200 300 L 200 168" fill="none" stroke={MANIM.purple} strokeWidth={3} />
          <Arrow x1={200} y1={190} x2={200} y2={170} color={MANIM.purple} width={3} />
          <Txt x={300} y={282} size={14} color={MANIM.purple}>
            realimentación
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={235} y={125} size={15} color={MANIM.red} anchor="middle">
            error e
          </Txt>
        </Fade>
        <Fade show={beat === 4} dy={-10}>
          <Arrow x1={660} y1={50} x2={660} y2={118} color={MANIM.red} width={5} />
          <Txt x={660} y={38} size={17} color={MANIM.red}>
            Perturbación: ventana abierta
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── LDR en un divisor de tensión ───────────── */

export function buildSensorDivisorTension(): AnimBuild {
  const casos = [
    { luz: "Oscuridad", r: "50 kΩ", v: 0.83, c: MANIM.blue },
    { luz: "Luz media (100 lux)", r: "4,5 kΩ", v: 3.44, c: MANIM.yellow },
    { luz: "Mucha luz (1 000 lux)", r: "0,5 kΩ", v: 4.76, c: MANIM.orange },
  ];
  return {
    label: "Un sensor resistivo (LDR) en un divisor de tensión convierte la luz en una tensión",
    beatMs: 5600,
    captions: [
      "Una **LDR** es una resistencia que **baja** con la luz. Un controlador no mide ohmios, mide **tensiones**: se conecta en un **divisor** con una resistencia fija de $10\\ \\text{k}\\Omega$ y $5$ V.",
      "En **oscuridad**, la LDR vale unos $50\\ \\text{k}\\Omega$: casi toda la tensión cae en ella y $V_{out}$ es pequeña: $5\\cdot 10/(10+50) = 0{,}83$ V.",
      "Con **luz media**, la LDR baja a unos $4{,}5\\ \\text{k}\\Omega$ y $V_{out}$ sube a $3{,}44$ V.",
      "Con **mucha luz**, la LDR casi no resiste y $V_{out}\\approx 4{,}8$ V. El conversor A/D lo convierte en un número de 0 a 1023 que lee el programa.",
    ],
    render: (beat) => {
      const c = casos[Math.max(0, beat - 1)]!;
      return (
        <Canvas>
          <line x1={250} y1={40} x2={250} y2={90} stroke={MANIM.muted} strokeWidth={4} />
          <Txt x={250} y={30} size={20} color={MANIM.red}>
            +5 V
          </Txt>
          <rect x={225} y={90} width={50} height={80} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={4} />
          <Txt x={250} y={138} size={18} color={MANIM.yellow}>
            LDR
          </Txt>
          <Fade show={beat >= 1}>
            <Txt x={300} y={138} size={18} color={c.c} anchor="start">
              {c.r}
            </Txt>
          </Fade>
          <line x1={250} y1={170} x2={250} y2={210} stroke={MANIM.muted} strokeWidth={4} />
          <circle cx={250} cy={210} r={6} fill={MANIM.green} />
          <line x1={250} y1={210} x2={400} y2={210} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={420} y={216} size={20} color={MANIM.green} anchor="start">
            V_out
          </Txt>
          <line x1={250} y1={210} x2={250} y2={250} stroke={MANIM.muted} strokeWidth={4} />
          <rect x={225} y={250} width={50} height={80} fill={MANIM.surface} stroke={MANIM.blue} strokeWidth={4} />
          <Txt x={250} y={298} size={16} color={MANIM.blue}>
            10 kΩ
          </Txt>
          <line x1={250} y1={330} x2={250} y2={360} stroke={MANIM.muted} strokeWidth={4} />
          <Txt x={250} y={380} size={18} color={MANIM.muted}>
            GND
          </Txt>
          <rect x={520} y={60} width={70} height={300} fill={MANIM.surface} stroke={MANIM.grid} strokeWidth={3} />
          <rect x={520} y={360 - (beat >= 1 ? (c.v / 5) * 300 : 0)} width={70} height={beat >= 1 ? (c.v / 5) * 300 : 0} fill={c.c} fillOpacity={0.7} className="anim-t" />
          <Txt x={555} y={50} size={16} color={MANIM.muted}>
            5 V
          </Txt>
          <Fade show={beat >= 1}>
            <Txt x={640} y={210} size={20} color={c.c} anchor="start">
              {c.v.toLocaleString("es-ES")} V
            </Txt>
            <Txt x={640} y={246} size={16} color={MANIM.muted} anchor="start">
              {c.luz}
            </Txt>
            {beat === 3 ? (
              <Txt x={640} y={290} size={16} color={MANIM.green} anchor="start">
                ADC ≈ 974
              </Txt>
            ) : null}
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Histéresis ───────────── */

export function buildHisteresisComparador(): AnimBuild {
  const N = 90;
  const X = (i: number) => 60 + (i / (N - 1)) * 680;
  const rampa = (i: number) => 3.6 - (i / (N - 1)) * 2.2 + Math.sin(i * 2.9) * 0.28;
  const Y = (v: number) => 220 - (v / 5) * 150;
  const pts = Array.from({ length: N }, (_, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${Y(rampa(i)).toFixed(1)}`).join(" ");
  const U = 2.5;
  const H = 0.4;
  const simple = Array.from({ length: N }, (_, i) => (rampa(i) > U ? 1 : 0));
  let e = 1;
  const hist = Array.from({ length: N }, (_, i) => {
    const v = rampa(i);
    if (e === 1 && v < U - H) e = 0;
    else if (e === 0 && v > U + H) e = 1;
    return e;
  });
  const dig = (a: number[], y0: number) => a.map((v, i) => `${i ? "L" : "M"} ${X(i).toFixed(1)} ${y0 - v * 30}`).join(" ");
  return {
    label: "Un umbral simple provoca rebotes con ruido; la histéresis usa dos umbrales y los evita",
    beatMs: 5600,
    captions: [
      "Una señal real **baja poco a poco** pero lleva **ruido**: pequeñas oscilaciones sobre la tendencia. Queremos que el controlador sepa cuándo cruza los $2{,}5$ V.",
      "Con **un solo umbral**, el ruido hace que la señal cruce la línea muchas veces alrededor del punto de cambio: la salida digital **rebota** (ideal para destrozar un relé).",
      "Con **histéresis** hay dos umbrales: para **apagarse** la señal debe bajar de $2{,}1$ V y para **encenderse** subir de $2{,}9$ V. El ruido pequeño ya no provoca cambios: **una sola transición**.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={60} y1={Y(U)} x2={740} y2={Y(U)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
        <Fade show={beat === 2}>
          <line x1={60} y1={Y(U + H)} x2={740} y2={Y(U + H)} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="3 4" />
          <line x1={60} y1={Y(U - H)} x2={740} y2={Y(U - H)} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="3 4" />
        </Fade>
        <path d={pts} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <Txt x={70} y={50} size={16} color={MANIM.blue} anchor="start">
          señal con ruido
        </Txt>
        <Fade show={beat === 1}>
          <path d={dig(simple, 330)} fill="none" stroke={MANIM.red} strokeWidth={3} />
          <Txt x={70} y={352} size={16} color={MANIM.red} anchor="start">
            salida con umbral simple: rebotes
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <path d={dig(hist, 330)} fill="none" stroke={MANIM.green} strokeWidth={3} />
          <Txt x={70} y={352} size={16} color={MANIM.green} anchor="start">
            salida con histéresis: una sola transición
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Secuencia de una línea de clasificación ───────────── */

export function buildSecuenciaClasificacion(): AnimBuild {
  const xs = [90, 260, 330, 330, 330, 560];
  return {
    label: "Secuencia automática: detectar, decidir, actuar y volver al reposo",
    beatMs: 5600,
    captions: [
      "Una pieza avanza por la **cinta transportadora**. Todo está en **reposo**: pistón recogido, sensor sin detectar.",
      "La pieza llega al **sensor**, que mide su altura y envía la señal al controlador.",
      "El **controlador** aplica su regla: «si la altura ≥ 20 cm → pieza grande → activar el pistón». Es lógica de control programada.",
      "El **pistón** (actuador) sale y empuja la pieza grande a la caja lateral. Si el controlador tardase demasiado, la pieza ya habría pasado.",
      "La pieza queda **clasificada** y el pistón **vuelve a reposo**. Hasta que no lo haya hecho, no debe aceptarse otra pieza: es una condición de **seguridad / interbloqueo**.",
    ],
    render: (beat) => {
      const px = beat >= 4 ? 330 : xs[Math.min(beat + 0, 4)]!;
      return (
        <Canvas>
          <rect x={40} y={230} width={640} height={26} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={px - 30} y={beat >= 4 ? 300 : 170} width={60} height={60} rx={6} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={4} className="anim-t" />
          <Txt x={px} y={beat >= 4 ? 336 : 206} size={14}>
            25 cm
          </Txt>
          <rect x={300} y={90} width={60} height={50} rx={6} fill={MANIM.surface} stroke={beat === 1 ? MANIM.yellow : MANIM.purple} strokeWidth={4} />
          <Txt x={330} y={120} size={15} color={MANIM.purple}>
            Sensor
          </Txt>
          <Box x={140} y={80} w={130} h={50} color={MANIM.green} label="Controlador" size={16} active={beat === 2} />
          <Fade show={beat >= 1 && beat <= 2}>
            <Arrow x1={296} y1={115} x2={206} y2={90} color={MANIM.purple} width={3} />
          </Fade>
          <rect x={430 - (beat === 3 ? 90 : 0)} y={170} width={beat === 3 ? 120 : 30} height={50} rx={4} fill={MANIM.orange} fillOpacity={0.6} stroke={MANIM.orange} strokeWidth={4} className="anim-t" />
          <Txt x={580} y={195} size={15} color={MANIM.orange}>
            Pistón
          </Txt>
          <rect x={280} y={300} width={100} height={80} fill="none" stroke={MANIM.green} strokeWidth={3} strokeDasharray="6 5" />
          <Txt x={330} y={395} size={14} color={MANIM.green}>
            caja de grandes
          </Txt>
          <Fade show={beat === 3}>
            <Arrow x1={400} y1={140} x2={470} y2={170} color={MANIM.orange} width={3} />
            <Txt x={560} y={140} size={15} color={MANIM.orange}>
              orden al pistón
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}
