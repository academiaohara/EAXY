import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Compresión del aire y condensación de agua ───────────── */

export function buildHumedadCompresion(): AnimBuild {
  const widths = [380, 290, 190, 130];
  const rh = (w: number) => Math.min(100, (50 * 380) / w);
  const dots = Array.from({ length: 14 }, (_, i) => ({ i, fx: ((i * 0.618) % 1), fy: ((i * 0.377 + 0.1) % 1) }));
  return {
    label: "Al comprimir el aire sube la humedad relativa hasta la saturación y el agua condensa",
    beatMs: 5600,
    captions: [
      "Aire atmosférico con vapor de agua: la humedad relativa es $H_r = m_v/m_s$. Aquí, el $50\\,\\%$ (mitad de lo que cabría a esa temperatura).",
      "Al **comprimir** el aire, el mismo vapor ocupa menos volumen: la **humedad absoluta** (g/m³) aumenta y la relativa sube. Es como apretar una esponja.",
      "Cuando se llega al $100\\,\\%$ el aire está **saturado**: no admite más vapor.",
      "Si se comprime todavía más, el vapor sobrante **condensa en gotas**. Por eso en el compresor aparece agua, perjudicial para la instalación: hay que eliminarla (filtros, enfriamiento, secadores).",
    ],
    render: (beat) => {
      const w = widths[beat]!;
      const x0 = 80;
      const sat = beat >= 3;
      const vaporN = sat ? 9 : 14;
      return (
        <Canvas>
          <rect className="anim-t" x={x0} y={90} width={w} height={190} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.muted} strokeWidth={3} />
          <rect className="anim-t" x={x0 + w} y={90} width={26} height={190} fill={MANIM.muted} fillOpacity={0.7} />
          <line className="anim-t" x1={x0 + w + 26} y1={185} x2={x0 + w + 70} y2={185} stroke={MANIM.muted} strokeWidth={8} />
          {dots.slice(0, vaporN).map(({ i, fx, fy }) => (
            <circle key={i} className="anim-t" cx={x0 + 14 + fx * (w - 28)} cy={104 + fy * (140)} r={7} fill={MANIM.blue} fillOpacity={0.9} />
          ))}
          <Fade show={sat}>
            {[0, 1, 2, 3, 4].map((k) => (
              <ellipse key={k} cx={x0 + 20 + k * ((w - 40) / 4)} cy={264} rx={8} ry={10} fill={MANIM.blue} />
            ))}
            <Txt x={x0 + w / 2} y={312} size={20} color={MANIM.blue}>
              agua condensada
            </Txt>
          </Fade>
          <Txt x={650} y={120} size={20} color={MANIM.muted}>
            humedad relativa
          </Txt>
          <rect x={560} y={134} width={180} height={26} fill={MANIM.panel} />
          <rect className="anim-t" x={560} y={134} width={1.8 * rh(w)} height={26} fill={rh(w) >= 100 ? MANIM.red : MANIM.green} fillOpacity={0.9} />
          <Txt x={650} y={154} size={18} color={MANIM.ink}>
            {Math.round(rh(w))} %
          </Txt>
          <Txt x={650} y={210} size={20} color={MANIM.yellow}>
            {["aire a presión atmosférica", "comprimiendo…", "saturado (100 %)", "se pasa de saturación"][beat]}
          </Txt>
          <Txt x={400} y={392} size={18} color={MANIM.muted}>
            vapor de agua (puntos azules)
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Compresor de émbolo ───────────── */

export function buildCompresorEmbolo(): AnimBuild {
  const cx = 330;
  const top = 90;
  const yPos = [300, 300, 170, 130];
  const names = ["Aspiración", "Cierre de la admisión", "Compresión", "Descarga"];
  return {
    label: "Compresor de émbolo: aspiración, compresión y descarga",
    beatMs: 5600,
    captions: [
      "**Aspiración.** El pistón baja: la válvula de aspiración se abre y entra aire atmosférico. La de descarga está cerrada.",
      "Al llegar abajo, el pistón ha llegado al máximo volumen y **se cierran las dos válvulas**. Empieza la compresión.",
      "**Compresión.** El pistón sube y el aire se comprime. Con una etapa se alcanzan de 6 a 10 bar; con dos etapas (y refrigeración), hasta 15 bar.",
      "**Descarga.** Cuando la presión es la del circuito, se abre la válvula de cierre (descarga) y el aire comprimido sale hacia el depósito.",
    ],
    render: (beat) => {
      const y = yPos[beat]!;
      const inOpen = beat === 0;
      const outOpen = beat === 3;
      return (
        <Canvas>
          <rect x={cx - 80} y={top} width={14} height={280} fill={MANIM.muted} fillOpacity={0.55} />
          <rect x={cx + 66} y={top} width={14} height={280} fill={MANIM.muted} fillOpacity={0.55} />
          <rect x={cx - 80} y={top - 20} width={160} height={20} fill={MANIM.muted} fillOpacity={0.55} />
          <rect className="anim-t" x={cx - 66} y={top} width={132} height={y - top} fill={beat >= 2 ? MANIM.red : MANIM.blue} fillOpacity={beat >= 2 ? 0.45 : 0.25} />
          <g className="anim-t" style={{ transform: `translate(0px, ${y - 130}px)` }}>
            <rect x={cx - 66} y={130} width={132} height={46} fill={MANIM.muted} fillOpacity={0.9} stroke={MANIM.ink} strokeWidth={2} />
            <line x1={cx} y1={176} x2={cx} y2={300} stroke={MANIM.ink} strokeWidth={6} />
          </g>
          <g className="anim-t" style={{ transform: `translate(0px, ${inOpen ? 16 : 0}px)` }}>
            <rect x={cx - 46} y={top - 40} width={9} height={40} fill={MANIM.green} />
            <rect x={cx - 62} y={top} width={40} height={6} fill={MANIM.green} />
          </g>
          <g className="anim-t" style={{ transform: `translate(0px, ${outOpen ? 16 : 0}px)` }}>
            <rect x={cx + 36} y={top - 40} width={9} height={40} fill={MANIM.orange} />
            <rect x={cx + 22} y={top} width={40} height={6} fill={MANIM.orange} />
          </g>
          <Txt x={cx - 70} y={top - 50} size={16} color={MANIM.green} anchor="end">
            aspiración
          </Txt>
          <Txt x={cx + 70} y={top - 50} size={16} color={MANIM.orange} anchor="start">
            cierre / descarga
          </Txt>
          <Fade show={beat === 0}>
            <Arrow x1={cx - 190} y1={110} x2={cx - 80} y2={110} color={MANIM.blue} width={5} />
            <Txt x={cx - 200} y={116} size={17} color={MANIM.blue} anchor="end">
              aire atmosférico
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Arrow x1={cx + 84} y1={110} x2={cx + 190} y2={110} color={MANIM.red} width={7} />
            <Txt x={cx + 200} y={116} size={17} color={MANIM.red} anchor="start">
              aire comprimido
            </Txt>
          </Fade>
          <Txt x={640} y={160} size={24} color={MANIM.yellow}>
            {names[beat]}
          </Txt>
          <Txt x={640} y={200} size={18} color={MANIM.muted}>
            {beat === 2 ? "sube la presión" : beat === 0 ? "baja el pistón" : beat === 3 ? "válvula de descarga abierta" : "válvulas cerradas"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Red de distribución ───────────── */

export function buildRedDistribucion(): AnimBuild {
  const caps = [
    "El **compresor** aspira aire atmosférico (con polvo y humedad) y lo comprime hasta la presión de trabajo.",
    "El **depósito** acumula aire a presión: mantiene la presión estable, absorbe los picos de consumo y permite seguir unos instantes si falla la electricidad. Aquí también condensa parte del agua.",
    "El **tratamiento**: filtros (partículas), separadores de aceite y colectores de condensación. Sin ellos hay desgaste de juntas, válvulas agarrotadas, corrosión y agua en los componentes.",
    "La **línea principal** va ligeramente inclinada (1 a 3°) para que el agua condensada resbale hasta los puntos bajos, donde se purga. Las **bajantes** salen siempre por arriba, para no coger el agua.",
    "Cada bajante lleva una **llave de paso**, una unidad de mantenimiento y su **purgador** antes de llegar a las máquinas. Velocidad del aire: 6 a 10 m/s; caída de presión máxima: 0,1 bar.",
  ];
  return {
    label: "Red de aire comprimido: compresor, depósito, tratamiento, línea principal inclinada y bajantes",
    beatMs: 5600,
    captions: caps,
    render: (beat) => (
      <Canvas>
        <Box x={90} y={290} w={120} h={70} color={MANIM.red} label="Compresor" active={beat === 0 || beat === 4} size={17} />
        <Box x={250} y={290} w={110} h={100} color={MANIM.green} label="Depósito" active={beat === 1 || beat === 4} size={17} />
        <Box x={400} y={290} w={110} h={70} color={MANIM.blue} label="Filtro" active={beat === 2 || beat === 4} size={17} />
        <line x1={150} y1={290} x2={195} y2={290} stroke={MANIM.muted} strokeWidth={5} />
        <line x1={305} y1={290} x2={345} y2={290} stroke={MANIM.muted} strokeWidth={5} />
        <path d="M 455 290 L 520 290 L 520 110 L 760 140" fill="none" stroke={MANIM.orange} strokeWidth={8} strokeLinejoin="round" className="anim-t" strokeOpacity={beat >= 3 ? 1 : 0.35} />
        {[620, 700].map((x, k) => {
          const y = 110 + ((x - 520) / 240) * 30;
          return (
            <g key={x} className="anim-t" style={{ opacity: beat >= 3 ? 1 : 0.3 }}>
              <path d={`M ${x} ${y} L ${x} ${y - 24} Q ${x} ${y - 38} ${x + 14} ${y - 38}`} fill="none" stroke={MANIM.orange} strokeWidth={0} />
              <line x1={x} y1={y} x2={x} y2={300} stroke={MANIM.orange} strokeWidth={6} />
              <rect x={x - 14} y={300} width={28} height={30} fill={MANIM.panel} stroke={MANIM.blue} strokeWidth={3} />
              <line x1={x} y1={330} x2={x} y2={350} stroke={MANIM.blue} strokeWidth={5} />
              <Txt x={x} y={374} size={14} color={MANIM.blue}>
                purga {k + 1}
              </Txt>
            </g>
          );
        })}
        <Fade show={beat >= 3}>
          <path d="M 540 80 L 700 100" fill="none" stroke={MANIM.yellow} strokeWidth={0} />
          <Txt x={640} y={64} size={18} color={MANIM.yellow}>
            pendiente 1–3°
          </Txt>
          <Txt x={575} y={258} size={14} color={MANIM.muted} anchor="end">
            bajante
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={560} y={410} size={18} color={MANIM.green}>
            a las máquinas · v = 6–10 m/s · Δp ≤ 0,1 bar
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={250} y={200} size={16} color={MANIM.muted}>
            estabiliza la presión
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={400} y={230} size={16} color={MANIM.muted}>
            quita polvo, aceite y agua
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Cilindros de simple y de doble efecto ───────────── */

export function buildCilindrosEfecto(): AnimBuild {
  const L = 130;
  const W = 340;
  const H = 60;
  const stroke = 190;
  const seX = [0, 1, 0, 0, 0];
  const deX = [0, 0, 0, 1, 0];
  const Cyl = ({ y, p, spring, airBack, airFront, color }: { y: number; p: number; spring: boolean; airBack: boolean; airFront: boolean; color: string }) => {
    const px = L + 10 + p * stroke;
    return (
      <g>
        <rect x={L} y={y} width={W} height={H} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
        <rect className="anim-t" x={L + 3} y={y + 3} width={px - L - 3} height={H - 6} fill={MANIM.blue} fillOpacity={airBack ? 0.45 : 0} />
        <rect className="anim-t" x={px + 18} y={y + 3} width={L + W - px - 21} height={H - 6} fill={MANIM.orange} fillOpacity={airFront ? 0.45 : 0} />
        {spring ? (
          <path className="anim-t" d={`M ${px + 18} ${y + H / 2} ${Array.from({ length: 9 }, (_, i) => `L ${px + 18 + ((L + W - px - 22) * (i + 0.5)) / 9} ${y + H / 2 + (i % 2 ? 14 : -14)}`).join(" ")} L ${L + W - 4} ${y + H / 2}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
        ) : null}
        <rect className="anim-t" x={px} y={y + 4} width={18} height={H - 8} fill={color} />
        <rect className="anim-t" x={px + 18} y={y + H / 2 - 5} width={L + W - px + 90 - 18 - (L + W - px - 4) * 0 - 60} height={10} fill={MANIM.ink} fillOpacity={0.9} />
      </g>
    );
  };
  const info = [
    "reposo",
    "entra aire: avanza (el muelle se comprime)",
    "se corta el aire: el muelle devuelve el émbolo",
    "aire por la cámara trasera: avanza",
    "aire por la cámara delantera: retrocede",
  ];
  return {
    label: "Cilindro de simple efecto (muelle de retorno) y de doble efecto (dos tomas de aire)",
    beatMs: 5600,
    captions: [
      "Dos cilindros en reposo. El de **simple efecto** (arriba) tiene una sola toma de aire y un **muelle** de retorno; el de **doble efecto** (abajo) tiene dos tomas, una a cada lado del émbolo.",
      "**Simple efecto, avance.** El aire entra por su única conexión y empuja el émbolo, que vence el muelle. Solo trabaja en un sentido.",
      "**Simple efecto, retroceso.** Al dejar de aplicar aire, el **muelle** lo devuelve. Gasta la mitad de aire; se usa para sujetar, expulsar, apretar o levantar.",
      "**Doble efecto, avance.** El aire entra por la toma trasera y sale por la delantera: hay fuerza útil en el avance.",
      "**Doble efecto, retroceso.** Se invierten las tomas: el aire entra por la delantera y el émbolo vuelve. Hay fuerza útil en los dos sentidos; la carrera puede ser larga (cuidado con el pandeo del vástago).",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={60} y={64} size={18} color={MANIM.muted} anchor="start">
          Simple efecto
        </Txt>
        <Cyl y={80} p={seX[beat]!} spring airBack={beat === 1} airFront={false} color={MANIM.green} />
        <Txt x={60} y={254} size={18} color={MANIM.muted} anchor="start">
          Doble efecto
        </Txt>
        <Cyl y={270} p={deX[beat]!} spring={false} airBack={beat === 3} airFront={beat === 4} color={MANIM.blue} />
        <Fade show={beat === 1}>
          <Arrow x1={70} y1={110} x2={L - 4} y2={110} color={MANIM.blue} width={5} />
        </Fade>
        <Fade show={beat === 3}>
          <Arrow x1={70} y1={300} x2={L - 4} y2={300} color={MANIM.blue} width={5} />
          <Arrow x1={L + W + 4} y1={284} x2={L + W + 50} y2={284} color={MANIM.muted} width={3} head={9} />
        </Fade>
        <Fade show={beat === 4}>
          <Arrow x1={L + W + 70} y1={300} x2={L + W + 4} y2={300} color={MANIM.orange} width={5} />
        </Fade>
        <Txt x={400} y={408} size={20} color={MANIM.yellow}>
          {info[beat]}
        </Txt>
      </Canvas>
    ),
  };
}

/* ───────────── Válvula 3/2 normalmente cerrada con cilindro de simple efecto ───────────── */

export function buildValvula32(): AnimBuild {
  const state = [0, 1, 0, 2];
  const cylX = [0, 1, 0, 0];
  const L = 400;
  const W = 220;
  return {
    label: "Válvula 3/2 normalmente cerrada gobernando un cilindro de simple efecto",
    beatMs: 5600,
    captions: [
      "**Reposo.** El muelle mantiene la válvula en su posición normal: la entrada de aire (P, vía 1) está **bloqueada** y la utilización (A, vía 2) comunica con el escape (R, vía 3). El cilindro está recogido.",
      "**Se pulsa.** La corredera cambia de posición: ahora P comunica con A y el escape R queda cerrado. El aire llega al cilindro y el vástago **sale**.",
      "**Se suelta el pulsador.** El muelle devuelve la válvula a reposo: A vuelve a comunicar con R, el aire del cilindro **escapa** y su muelle lo recoge.",
      "Nombre: **válvula 3/2** (3 vías, 2 posiciones), **normalmente cerrada** (en reposo no deja pasar el aire), accionada por **pulsador manual** y con **retorno por muelle**.",
    ],
    render: (beat) => {
      const st = state[beat]!;
      const act = st === 1;
      const sq = (x: number, active: boolean, pass: boolean) => (
        <g>
          <rect className="anim-t" x={x} y={150} width={80} height={80} fill={active ? MANIM.yellow : MANIM.panel} fillOpacity={active ? 0.25 : 0.6} stroke={active ? MANIM.yellow : MANIM.muted} strokeWidth={active ? 5 : 3} />
          {pass ? (
            <g>
              <Arrow x1={x + 22} y1={222} x2={x + 22} y2={158} color={MANIM.ink} width={3} head={9} />
              <line x1={x + 58} y1={160} x2={x + 58} y2={176} stroke={MANIM.ink} strokeWidth={3} />
              <line x1={x + 48} y1={176} x2={x + 68} y2={176} stroke={MANIM.ink} strokeWidth={3} />
            </g>
          ) : (
            <g>
              <line x1={x + 22} y1={222} x2={x + 22} y2={200} stroke={MANIM.ink} strokeWidth={3} />
              <line x1={x + 12} y1={200} x2={x + 32} y2={200} stroke={MANIM.ink} strokeWidth={3} />
              <Arrow x1={x + 58} y1={160} x2={x + 58} y2={222} color={MANIM.ink} width={3} head={9} />
            </g>
          )}
        </g>
      );
      const portTxt = (x: number, y: number, t: string, c: string) => (
        <Txt x={x} y={y} size={17} color={c}>
          {t}
        </Txt>
      );
      return (
        <Canvas>
          {sq(130, act, true)}
          {sq(210, !act, false)}
          <path d="M 296 190 l 8 -10 l 8 20 l 8 -20 l 8 20 l 8 -10" fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <rect x={80} y={170} width={44} height={40} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={102} y={196} size={13} color={MANIM.green}>
            ⊙
          </Txt>
          <Txt x={102} y={250} size={14} color={MANIM.green}>
            pulsador
          </Txt>
          {portTxt(152, 262, "1 (P)", MANIM.blue)}
          {portTxt(232, 262, "3 (R)", MANIM.orange)}
          {portTxt(300, 100, "2 (A)", MANIM.green)}
          <line x1={170} y1={230} x2={170} y2={310} stroke={MANIM.blue} strokeWidth={5} />
          <Txt x={170} y={332} size={16} color={MANIM.blue}>
            aire a presión
          </Txt>
          <line x1={250} y1={150} x2={250} y2={110} stroke={MANIM.green} strokeWidth={5} />
          <path d={`M 250 110 L 250 ${190 - 80} L ${L} ${190 - 80}`} fill="none" stroke={MANIM.green} strokeWidth={5} />
          {/* cilindro */}
          <rect x={L} y={78 - 0} width={W} height={50} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect className="anim-t" x={L + 3} y={81} width={cylX[beat]! * 90 + 14} height={44} fill={MANIM.blue} fillOpacity={act ? 0.45 : 0} />
          <rect className="anim-t" x={L + 6 + cylX[beat]! * 90} y={82} width={14} height={36} fill={MANIM.green} />
          <rect className="anim-t" x={L + 20 + cylX[beat]! * 90} y={98} width={90 + 40} height={8} fill={MANIM.ink} />
          <path d={`M ${L + W - 4} 103 ${Array.from({ length: 8 }, (_, i) => `L ${L + 40 + cylX[beat]! * 90 + ((W - 44 - cylX[beat]! * 90) * (7 - i)) / 8} ${103 + (i % 2 ? 10 : -10)}`).join(" ")}`} fill="none" stroke={MANIM.yellow} strokeWidth={2} />
          <Fade show={act}>
            <Arrow x1={250} y1={150} x2={250} y2={112} color={MANIM.blue} width={5} />
          </Fade>
          <Fade show={st === 0 && beat !== 0}>
            <Arrow x1={256} y1={188} x2={256} y2={290} color={MANIM.orange} width={4} />
            <Txt x={300} y={300} size={16} color={MANIM.orange} anchor="start">
              escape
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <rect x={100} y={340} width={600} height={50} rx={10} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={3} />
            <Txt x={400} y={373} size={24} color={MANIM.yellow}>
              3/2 · normalmente cerrada · pulsador · muelle
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Válvula estranguladora unidireccional: a la entrada o a la salida ───────────── */

export function buildEstrangulacion(): AnimBuild {
  const L = 150;
  const W = 480;
  const prog = [0, 0.35, 1, 0.35];
  return {
    label: "Regulación de la velocidad de un cilindro estrangulando el aire de entrada o el de escape",
    beatMs: 5600,
    captions: [
      "Una válvula **estranguladora unidireccional** deja pasar el aire libremente en un sentido y lo estrangula en el otro. Sirve para regular la velocidad de un cilindro.",
      "**Regulación a la entrada** (aire de admisión estrangulado): se limita el caudal que llena el cilindro. El escape sale libre. Se usa en cilindros de simple efecto y cuando la carga se opone al movimiento.",
      "**Regulación a la salida** (aire de escape estrangulado): el émbolo avanza apoyado en un colchón de aire, con velocidad independiente de la carga. Es lo habitual en los de doble efecto.",
      "Para tener **velocidad distinta** en avance y en retroceso, se colocan dos válvulas unidireccionales (una por vía). Con una estranguladora normal o dos iguales, la velocidad es la misma en ambos sentidos.",
    ],
    render: (beat) => {
      const showSalida = beat === 2;
      const showEntrada = beat === 1;
      const p = beat === 2 ? 0.7 : prog[beat]!;
      const Cyl = ({ y, p: pp, throttleBack, throttleFront, label }: { y: number; p: number; throttleBack: boolean; throttleFront: boolean; label: string }) => {
        const px = L + 6 + pp * (W - 40);
        return (
          <g>
            <Txt x={60} y={y - 62} size={17} color={MANIM.muted} anchor="start">
              {label}
            </Txt>
            <rect x={L} y={y} width={W} height={56} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
            <rect className="anim-t" x={L + 3} y={y + 3} width={px - L - 3} height={50} fill={MANIM.blue} fillOpacity={0.35} />
            <rect className="anim-t" x={px} y={y + 4} width={16} height={48} fill={MANIM.green} />
            <rect className="anim-t" x={px + 16} y={y + 24} width={W + L - px + 60} height={8} fill={MANIM.ink} fillOpacity={0.8} />
            <g>
              <line x1={L + 24} y1={y} x2={L + 24} y2={y - 24} stroke={MANIM.blue} strokeWidth={4} />
              <rect x={L + 10} y={y - 38} width={28} height={16} fill={throttleBack ? MANIM.red : MANIM.surface} stroke={throttleBack ? MANIM.red : MANIM.muted} strokeWidth={2} />
              <line x1={L + W - 24} y1={y} x2={L + W - 24} y2={y - 24} stroke={MANIM.orange} strokeWidth={4} />
              <rect x={L + W - 38} y={y - 38} width={28} height={16} fill={throttleFront ? MANIM.red : MANIM.surface} stroke={throttleFront ? MANIM.red : MANIM.muted} strokeWidth={2} />
            </g>
          </g>
        );
      };
      return (
        <Canvas>
          <Cyl y={110} p={showEntrada ? p : beat === 3 ? 0.35 : 0} throttleBack={beat >= 1 && beat !== 2} throttleFront={false} label="Regulación a la entrada" />
          <Cyl y={280} p={showSalida ? p : beat === 3 ? 0.35 : 0} throttleBack={false} throttleFront={beat === 2 || beat === 3} label="Regulación a la salida" />
          <Fade show={beat >= 1 && beat !== 2}>
            <Txt x={L + 48} y={76} size={14} color={MANIM.red} anchor="start">
              estrangula
            </Txt>
          </Fade>
          <Fade show={beat === 2 || beat === 3}>
            <Txt x={L + W - 48} y={246} size={14} color={MANIM.red} anchor="end">
              estrangula
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={L + W / 2} y={200} size={17} color={MANIM.yellow}>
              el caudal que entra manda; el escape sale libre
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={L + W / 2} y={372} size={17} color={MANIM.yellow}>
              colchón de aire delante del émbolo: velocidad estable
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <Txt x={L + W / 2} y={200} size={17} color={MANIM.yellow}>
              dos válvulas unidireccionales: velocidades distintas en cada sentido
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Diagrama espacio-fase de dos cilindros ───────────── */

export function buildEspacioFase(): AnimBuild {
  const X0 = 150;
  const dx = 120;
  const fx = (f: number) => X0 + (f - 1) * dx;
  const A = [0, 1, 1, 0, 0];
  const B = [0, 0, 1, 1, 0];
  const yA = (v: number) => 150 - v * 60;
  const yB = (v: number) => 300 - v * 60;
  const path = (arr: number[], y: (v: number) => number) => arr.map((v, i) => `${i ? "L" : "M"} ${fx(i + 1)} ${y(v)}`).join(" ");
  return {
    label: "Diagrama espacio-fase de dos cilindros con la secuencia A+ B+ A− B−",
    beatMs: 5800,
    captions: [
      "El **diagrama espacio-fase** representa el recorrido de cada cilindro en cada **fase** (un cambio de estado). Las fases van horizontales y a la misma distancia; el espacio no va a escala.",
      "Cilindro **A**: sale entre las fases 1 y 2 (**A+**), se mantiene fuera y vuelve entre las fases 3 y 4 (**A−**). La designación del estado (dentro/fuera, 0/1) es libre.",
      "Cilindro **B**: sale entre las fases 2 y 3 (**B+**) y regresa entre las fases 4 y 5 (**B−**). La secuencia completa es **A+ B+ A− B−**.",
      "En la **fase 5** los dos cilindros han vuelto a su posición inicial: la fase 5 coincide con la 1 y el ciclo puede repetirse.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={110} y0={360} x1={740} y1={50} xLabel="fases" />
        {[1, 2, 3, 4, 5].map((f) => (
          <g key={f}>
            <line x1={fx(f)} y1={80} x2={fx(f)} y2={360} stroke={MANIM.grid} strokeWidth={2} strokeDasharray="5 6" />
            <Txt x={fx(f)} y={70} size={20} color={MANIM.muted}>
              {f === 5 ? "5 = 1" : f}
            </Txt>
          </g>
        ))}
        <Txt x={100} y={yA(1) + 5} size={15} color={MANIM.muted} anchor="end">
          fuera
        </Txt>
        <Txt x={100} y={yA(0) + 5} size={15} color={MANIM.muted} anchor="end">
          dentro
        </Txt>
        <Txt x={100} y={yB(1) + 5} size={15} color={MANIM.muted} anchor="end">
          fuera
        </Txt>
        <Txt x={100} y={yB(0) + 5} size={15} color={MANIM.muted} anchor="end">
          dentro
        </Txt>
        <Txt x={680} y={yA(0.5)} size={22} color={MANIM.blue}>
          Cilindro A
        </Txt>
        <Txt x={680} y={yB(0.5) + 4} size={22} color={MANIM.orange}>
          Cilindro B
        </Txt>
        <DrawPath show d={path(A, yA)} color={MANIM.blue} width={5} />
        <DrawPath show={beat >= 2} d={path(B, yB)} color={MANIM.orange} width={5} />
        <Fade show={beat >= 1 && beat <= 1}>
          <Txt x={(fx(1) + fx(2)) / 2 - 20} y={yA(0.5) + 6} size={19} color={MANIM.blue}>
            A+
          </Txt>
          <Txt x={(fx(3) + fx(4)) / 2 + 22} y={yA(0.5) + 6} size={19} color={MANIM.blue}>
            A−
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={(fx(2) + fx(3)) / 2 - 22} y={yB(0.5) + 6} size={19} color={MANIM.orange}>
            B+
          </Txt>
          <Txt x={(fx(4) + fx(5)) / 2 + 22} y={yB(0.5) + 6} size={19} color={MANIM.orange}>
            B−
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={420} y={410} size={22} color={MANIM.yellow}>
            secuencia A+ B+ A− B− · ciclo cerrado
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Mando directo e indirecto de un cilindro de doble efecto ───────────── */

export function buildMandoDoble(): AnimBuild {
  const L = 380;
  const W = 330;
  const px = [0, 1, 0, 0];
  const act = [false, true, false, true];
  return {
    label: "Mando de un cilindro de doble efecto con una válvula 4/2: directo (manual) e indirecto (pilotaje neumático)",
    beatMs: 5800,
    captions: [
      "**Mando directo.** Una válvula **4/2 monoestable** gobierna un cilindro de doble efecto. En reposo, el aire va a la cámara delantera y el vástago está **recogido**.",
      "**Se acciona la válvula.** El aire pasa a la cámara trasera y el aire delantero escapa: el vástago **sale**. Mientras se mantenga accionada, se queda fuera.",
      "**Se suelta.** El muelle devuelve la válvula a reposo: el aire entra por delante y el cilindro **retrocede**. El avance es más lento (la cámara trasera tiene más volumen) pero con **más fuerza** (más superficie).",
      "**Mando indirecto.** Si el cilindro es grande, la válvula necesita mucha fuerza. Una válvula 3/2 pequeña **pilota** (con una señal neumática, línea discontinua) a la 4/2 de potencia: la parte de mando trabaja a baja presión y ahorra costes.",
    ],
    render: (beat) => {
      const a = act[beat]!;
      const x = px[beat]!;
      const pistonX = L + 8 + x * (W - 50);
      const indirect = beat === 3;
      return (
        <Canvas>
          <rect x={L} y={60} width={W} height={60} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect className="anim-t" x={L + 3} y={63} width={pistonX - L - 3} height={54} fill={MANIM.blue} fillOpacity={a ? 0.45 : 0} />
          <rect className="anim-t" x={pistonX + 18} y={63} width={L + W - pistonX - 21} height={54} fill={MANIM.orange} fillOpacity={a ? 0 : 0.45} />
          <rect className="anim-t" x={pistonX} y={64} width={18} height={52} fill={MANIM.green} />
          <rect className="anim-t" x={pistonX + 18} y={86} width={L + W - pistonX + 50 - 40} height={10} fill={MANIM.ink} fillOpacity={0.85} />
          <Txt x={L + 40} y={46} size={15} color={MANIM.blue}>
            cámara trasera
          </Txt>
          <Txt x={L + W - 40} y={46} size={15} color={MANIM.orange}>
            cámara delantera
          </Txt>
          {/* válvula 4/2 */}
          {[0, 1].map((k) => {
            const x0 = 190 + k * 96;
            const on = k === 0 ? a : !a;
            return (
              <g key={k}>
                <rect className="anim-t" x={x0} y={230} width={96} height={80} fill={on ? MANIM.yellow : MANIM.panel} fillOpacity={on ? 0.22 : 0.5} stroke={on ? MANIM.yellow : MANIM.muted} strokeWidth={on ? 5 : 3} />
                {k === 0 ? (
                  <g stroke={MANIM.ink} strokeWidth={3}>
                    <line x1={x0 + 28} y1={302} x2={x0 + 28} y2={238} />
                    <line x1={x0 + 68} y1={302} x2={x0 + 68} y2={238} />
                  </g>
                ) : (
                  <g stroke={MANIM.ink} strokeWidth={3}>
                    <line x1={x0 + 28} y1={302} x2={x0 + 68} y2={238} />
                    <line x1={x0 + 68} y1={302} x2={x0 + 28} y2={238} />
                  </g>
                )}
              </g>
            );
          })}
          <path d="M 382 270 l 8 -10 l 8 20 l 8 -20 l 8 20 l 8 -10" fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <rect x={136} y={254} width={50} height={32} fill={MANIM.panel} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={161} y={276} size={13} color={MANIM.green}>
            ⊙
          </Txt>
          <Txt x={226} y={330} size={17} color={MANIM.orange}>
            A
          </Txt>
          <Txt x={286} y={330} size={17} color={MANIM.blue}>
            B
          </Txt>
          <Txt x={196} y={224} size={15} color={MANIM.blue}>
            P
          </Txt>
          {/* conexiones */}
          <path d={`M 218 230 L 218 ${150} L ${L + W - 40} 150 L ${L + W - 40} 120`} fill="none" stroke={MANIM.orange} strokeWidth={5} />
          <path d={`M 314 230 L 314 ${178} L ${L + 40} 178 L ${L + 40} 120`} fill="none" stroke={MANIM.blue} strokeWidth={5} />
          {indirect ? (
            <g>
              <rect x={60} y={140} width={70} height={60} fill={MANIM.panel} stroke={MANIM.purple} strokeWidth={3} />
              <Txt x={95} y={176} size={16} color={MANIM.purple}>
                3/2
              </Txt>
              <path d="M 130 170 L 150 170 L 150 270 L 186 270" fill="none" stroke={MANIM.purple} strokeWidth={4} strokeDasharray="8 6" />
              <Txt x={95} y={226} size={15} color={MANIM.purple}>
                pilotaje
              </Txt>
              <Txt x={95} y={130} size={15} color={MANIM.muted}>
                señal de mando
              </Txt>
            </g>
          ) : null}
          <Txt x={400} y={392} size={21} color={MANIM.yellow}>
            {["Reposo: vástago recogido", "Accionada: vástago fuera", "Desactivada: vuelve el vástago", "Mando indirecto por pilotaje neumático"][beat]}
          </Txt>
        </Canvas>
      );
    },
  };
}
