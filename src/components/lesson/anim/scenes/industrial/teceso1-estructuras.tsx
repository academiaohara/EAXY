import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── Los cinco esfuerzos ───────────── */

const ESF = [
  { t: "Tracción", c: MANIM.red, ej: "cable de un ascensor" },
  { t: "Compresión", c: MANIM.blue, ej: "pilar de un edificio" },
  { t: "Flexión", c: MANIM.orange, ej: "tabla de un trampolín" },
  { t: "Torsión", c: MANIM.purple, ej: "destornillador al girar" },
  { t: "Cortadura", c: MANIM.green, ej: "tijeras" },
];

function Barra({ e, cx, cy, k }: { e: number; cx: number; cy: number; k: number }) {
  const c = ESF[e]!.c;
  const w = 220 * k;
  const h = 40 * k;
  const x0 = cx - w / 2;
  const y0 = cy - h / 2;
  if (e === 0) {
    return (
      <g>
        <rect x={x0 - 10 * k} y={y0 + 4 * k} width={w + 40 * k} height={h - 8 * k} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={4} />
        <Arrow x1={x0 - 14 * k} y1={cy} x2={x0 - 70 * k} y2={cy} color={c} width={5} />
        <Arrow x1={x0 + w + 34 * k} y1={cy} x2={x0 + w + 90 * k} y2={cy} color={c} width={5} />
      </g>
    );
  }
  if (e === 1) {
    return (
      <g>
        <rect x={x0 + 14 * k} y={y0 - 4 * k} width={w - 28 * k} height={h + 8 * k} fill={c} fillOpacity={0.3} stroke={c} strokeWidth={4} />
        <Arrow x1={x0 - 60 * k} y1={cy} x2={x0 + 8 * k} y2={cy} color={c} width={5} />
        <Arrow x1={x0 + w + 60 * k} y1={cy} x2={x0 + w - 8 * k} y2={cy} color={c} width={5} />
      </g>
    );
  }
  if (e === 2) {
    return (
      <g>
        <path d={`M ${x0} ${cy} Q ${cx} ${cy + 90 * k} ${x0 + w} ${cy}`} fill="none" stroke={c} strokeWidth={h * 0.8} opacity={0.4} />
        <path d={`M ${x0} ${cy} Q ${cx} ${cy + 90 * k} ${x0 + w} ${cy}`} fill="none" stroke={c} strokeWidth={4} />
        <polygon points={`${x0 - 14},${cy + 50} ${x0 + 14},${cy + 50} ${x0},${cy + 24}`} fill={MANIM.muted} />
        <polygon points={`${x0 + w - 14},${cy + 50} ${x0 + w + 14},${cy + 50} ${x0 + w},${cy + 24}`} fill={MANIM.muted} />
        <Arrow x1={cx} y1={cy - 80 * k} x2={cx} y2={cy + 8 * k} color={c} width={5} />
      </g>
    );
  }
  if (e === 3) {
    return (
      <g>
        <rect x={x0} y={y0} width={w} height={h} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={4} />
        {Array.from({ length: 9 }, (_, i) => (
          <line key={i} x1={x0 + ((i + 1) * w) / 10} y1={y0} x2={x0 + ((i + 1) * w) / 10 + 24 * k * ((i + 1) / 10)} y2={y0 + h} stroke={c} strokeWidth={3} />
        ))}
        <Txt x={x0 - 40} y={cy + 12} size={34} color={MANIM.muted}>
          ↺
        </Txt>
        <Txt x={x0 + w + 40} y={cy + 12} size={34} color={c}>
          ↻
        </Txt>
      </g>
    );
  }
  return (
    <g>
      <rect x={x0} y={cy - h / 2 - 4 * k} width={w / 2 - 3} height={h} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={4} />
      <rect x={x0 + w / 2 + 3} y={cy - h / 2 + 12 * k} width={w / 2 - 3} height={h} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={4} />
      <Arrow x1={x0 + w / 4} y1={cy - 70 * k} x2={x0 + w / 4} y2={cy - h / 2 - 8 * k} color={c} width={5} />
      <Arrow x1={x0 + (3 * w) / 4} y1={cy + 70 * k} x2={x0 + (3 * w) / 4} y2={cy + h / 2 + 16 * k} color={c} width={5} />
    </g>
  );
}

export function buildEsfuerzosTipos(): AnimBuild {
  return {
    label: "Los cinco esfuerzos que soporta una estructura: tracción, compresión, flexión, torsión y cortadura",
    beatMs: 5400,
    captions: [
      "Cuando se aplican **cargas** a una estructura, sus elementos soportan **esfuerzos**. Hay cinco tipos básicos.",
      "**Tracción**: dos fuerzas **estiran** el elemento. Ejemplo: el cable de un ascensor.",
      "**Compresión**: dos fuerzas **aplastan** el elemento. Ejemplo: un pilar de un edificio.",
      "**Flexión**: una carga **dobla** el elemento. Una parte se estira y otra se comprime. Ejemplo: la tabla de un trampolín.",
      "**Torsión**: dos fuerzas **retuercen** el elemento alrededor de su eje. Ejemplo: un destornillador al girar.",
      "**Cortadura**: dos fuerzas paralelas y contrarias **cortan** el elemento. Ejemplo: unas tijeras.",
    ],
    render: (beat) => (
      <Canvas>
        {beat === 0 ? (
          <>
            {ESF.map((e, i) => (
              <g key={e.t}>
                <Barra e={i} cx={150 + (i % 3) * 250} cy={i < 3 ? 120 : 300} k={0.45} />
                <Txt x={150 + (i % 3) * 250} y={i < 3 ? 190 : 370} size={20} color={e.c}>
                  {e.t}
                </Txt>
              </g>
            ))}
          </>
        ) : (
          <>
            <Barra e={beat - 1} cx={400} cy={190} k={1.2} />
            <Txt x={400} y={340} size={26} color={ESF[beat - 1]!.c}>
              {ESF[beat - 1]!.t}
            </Txt>
            <Txt x={400} y={376} size={20} color={MANIM.muted}>
              {ESF[beat - 1]!.ej}
            </Txt>
          </>
        )}
      </Canvas>
    ),
  };
}

/* ───────────── Triangulación: el triángulo es indeformable ───────────── */

export function buildTrianguloRigido(): AnimBuild {
  const bar = (a: [number, number], b: [number, number], c: string, w = 8) => <line x1={a[0]} y1={a[1]} x2={b[0]} y2={b[1]} stroke={c} strokeWidth={w} strokeLinecap="round" />;
  const nodo = (p: [number, number]) => <circle cx={p[0]} cy={p[1]} r={9} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />;
  return {
    label: "Un marco rectangular se deforma; un triángulo, no: por eso se triangula",
    beatMs: 5600,
    captions: [
      "Dos marcos con las **barras unidas por articulaciones**. A la izquierda, un cuadrilátero; a la derecha, un triángulo.",
      "Se aplica una **fuerza lateral**. El cuadrilátero **se deforma** (se convierte en un paralelogramo) sin que ninguna barra cambie de longitud.",
      "El **triángulo** no se mueve: para cambiar sus ángulos habría que alargar o acortar un lado, y las barras no lo permiten. Es **indeformable**.",
      "Si se añade una **diagonal** al cuadrilátero, queda dividido en dos triángulos y se vuelve rígido. Eso es **triangular**.",
      "Por eso se ven triángulos en grúas, torres eléctricas, cerchas de tejados y cuadros de bicicleta.",
    ],
    render: (beat) => {
      const dx = beat === 1 || beat === 2 ? 70 : 0;
      const A: [number, number] = [120, 320];
      const B: [number, number] = [320, 320];
      const C: [number, number] = [320 + dx, 130];
      const D: [number, number] = [120 + dx, 130];
      const T1: [number, number] = [470, 320];
      const T2: [number, number] = [680, 320];
      const T3: [number, number] = [575 + (beat === 1 || beat === 2 ? 0 : 0), 130];
      const colQ = beat === 1 || beat === 2 ? MANIM.red : beat >= 3 ? MANIM.green : MANIM.blue;
      return (
        <Canvas>
          <line x1={80} y1={328} x2={720} y2={328} stroke={MANIM.grid} strokeWidth={5} />
          {bar(A, B, colQ)}
          {bar(A, D, colQ)}
          {bar(B, C, colQ)}
          {bar(D, C, colQ)}
          <Fade show={beat >= 3}>{bar(A, C, MANIM.yellow, 7)}</Fade>
          {[A, B, C, D].map((p, i) => (
            <g key={i}>{nodo(p)}</g>
          ))}
          {bar(T1, T2, beat >= 2 ? MANIM.green : MANIM.blue)}
          {bar(T1, T3, beat >= 2 ? MANIM.green : MANIM.blue)}
          {bar(T2, T3, beat >= 2 ? MANIM.green : MANIM.blue)}
          {[T1, T2, T3].map((p, i) => (
            <g key={i}>{nodo(p)}</g>
          ))}
          <Fade show={beat === 1 || beat === 2}>
            <Arrow x1={20} y1={130} x2={100} y2={130} color={MANIM.red} width={6} />
            <Arrow x1={380} y1={130} x2={455} y2={130} color={MANIM.red} width={6} />
          </Fade>
          <Fade show={beat === 1}>
            <Txt x={220} y={390} size={20} color={MANIM.red}>
              se deforma
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={575} y={390} size={20} color={MANIM.green}>
              no se deforma
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={220} y={390} size={20} color={MANIM.green}>
              rígido con diagonal
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── El arco: la carga viaja por compresión ───────────── */

export function buildArcoDescarga(): AnimBuild {
  return {
    label: "Un arco transforma la carga en compresión y la lleva a los apoyos",
    beatMs: 5600,
    captions: [
      "Una **viga** apoyada en dos pilares soporta la carga **flexionándose**: la parte de abajo se estira y la de arriba se comprime. Si es larga, se dobla mucho.",
      "El **arco** tiene forma curva. La carga que recibe en la parte superior se reparte por **toda la curva**.",
      "Cada pieza del arco (dovela) **empuja** a la siguiente. Todas trabajan a **compresión**, el esfuerzo que mejor aguantan la piedra y el ladrillo.",
      "En los extremos el arco empuja hacia fuera y hacia abajo. Los **estribos** (macizos laterales) lo contrarrestan: así el arco no se abre.",
    ],
    render: (beat) => {
      const viga = beat === 0;
      return (
        <Canvas>
          <rect x={0} y={330} width={800} height={90} fill={MANIM.panel} />
          {viga ? (
            <g>
              <path d="M 160 180 Q 400 260 640 180" fill="none" stroke={MANIM.orange} strokeWidth={26} strokeLinecap="round" opacity={0.7} />
              <rect x={140} y={190} width={40} height={140} fill={MANIM.muted} fillOpacity={0.5} />
              <rect x={620} y={190} width={40} height={140} fill={MANIM.muted} fillOpacity={0.5} />
              <Arrow x1={400} y1={60} x2={400} y2={215} color={MANIM.red} width={6} />
              <Txt x={400} y={300} size={20} color={MANIM.orange}>
                flexión
              </Txt>
            </g>
          ) : (
            <g>
              <path d="M 160 330 Q 400 -20 640 330" fill="none" stroke={MANIM.blue} strokeWidth={30} strokeLinecap="butt" opacity={0.55} />
              <path d="M 160 330 Q 400 -20 640 330" fill="none" stroke={MANIM.blue} strokeWidth={4} />
              {[0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9].map((t) => {
                const x = 160 * (1 - t) ** 2 + 2 * 400 * t * (1 - t) + 640 * t * t;
                const y = 330 * (1 - t) ** 2 + 2 * -20 * t * (1 - t) + 330 * t * t;
                const nx = 2 * (1 - t) * (400 - 160) + 2 * t * (640 - 400);
                const ny = 2 * (1 - t) * (-20 - 330) + 2 * t * (330 + 20);
                const l = Math.hypot(nx, ny);
                return <line key={t} x1={x - (ny / l) * 17} y1={y + (nx / l) * 17} x2={x + (ny / l) * 17} y2={y - (nx / l) * 17} stroke={MANIM.surface} strokeWidth={3} />;
              })}
              <Arrow x1={400} y1={20} x2={400} y2={72} color={MANIM.red} width={6} />
              <Fade show={beat >= 2}>
                <Arrow x1={300} y1={120} x2={228} y2={196} color={MANIM.yellow} width={5} />
                <Arrow x1={500} y1={120} x2={572} y2={196} color={MANIM.yellow} width={5} />
                <Txt x={400} y={190} size={22} color={MANIM.yellow}>
                  compresión
                </Txt>
              </Fade>
              <Fade show={beat === 3}>
                <rect x={80} y={280} width={80} height={50} fill={MANIM.muted} fillOpacity={0.6} stroke={MANIM.muted} strokeWidth={3} />
                <rect x={640} y={280} width={80} height={50} fill={MANIM.muted} fillOpacity={0.6} stroke={MANIM.muted} strokeWidth={3} />
                <Arrow x1={176} y1={300} x2={120} y2={300} color={MANIM.red} width={5} />
                <Arrow x1={624} y1={300} x2={680} y2={300} color={MANIM.red} width={5} />
                <Txt x={120} y={270} size={18} color={MANIM.muted}>
                  estribo
                </Txt>
                <Txt x={680} y={270} size={18} color={MANIM.muted}>
                  estribo
                </Txt>
              </Fade>
            </g>
          )}
        </Canvas>
      );
    },
  };
}

/* ───────────── El camino de las cargas en un edificio ───────────── */

export function buildCaminoCargas(): AnimBuild {
  const pasos = [
    { t: "Cubierta", c: MANIM.blue },
    { t: "Vigas", c: MANIM.orange },
    { t: "Pilares", c: MANIM.green },
    { t: "Cimientos", c: MANIM.purple },
  ];
  return {
    label: "El camino de las cargas en un edificio: cubierta, vigas, pilares y cimientos hasta el terreno",
    beatMs: 5600,
    captions: [
      "Un edificio recibe **cargas**: su propio peso, las personas, el mobiliario, la nieve y el viento. La estructura las lleva hasta el suelo.",
      "La **cubierta** recibe la nieve, el viento y su propio peso, y los pasa a las vigas.",
      "Las **vigas** trabajan a **flexión**: recogen las cargas del forjado y las reparten hacia los pilares.",
      "Los **pilares** soportan la **compresión** y bajan las cargas verticalmente hasta la base.",
      "Los **cimientos** (zapatas) apoyan en un área ancha y reparten la carga sobre el **terreno**, que no debe hundirse.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={0} y={340} width={800} height={80} fill={MANIM.panel} />
        <polygon points="250,130 550,130 400,50" fill={MANIM.blue} fillOpacity={beat === 1 ? 0.45 : 0.15} stroke={MANIM.blue} strokeWidth={beat === 1 ? 5 : 3} className="anim-t" />
        <rect x={250} y={130} width={300} height={14} fill={MANIM.orange} fillOpacity={beat === 2 ? 0.6 : 0.25} stroke={MANIM.orange} strokeWidth={beat === 2 ? 5 : 3} className="anim-t" />
        <rect x={250} y={230} width={300} height={14} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={3} />
        {[262, 530].map((x) => (
          <rect key={x} x={x} y={144} width={20} height={190} fill={MANIM.green} fillOpacity={beat === 3 ? 0.55 : 0.2} stroke={MANIM.green} strokeWidth={beat === 3 ? 5 : 3} className="anim-t" />
        ))}
        {[238, 506].map((x) => (
          <rect key={x} x={x} y={334} width={68} height={16} fill={MANIM.purple} fillOpacity={beat === 4 ? 0.6 : 0.25} stroke={MANIM.purple} strokeWidth={beat === 4 ? 5 : 3} className="anim-t" />
        ))}
        <Fade show={beat >= 1}>
          <Arrow x1={400} y1={5} x2={400} y2={48} color={MANIM.yellow} width={5} />
        </Fade>
        <Fade show={beat >= 3}>
          <Arrow x1={272} y1={160} x2={272} y2={320} color={MANIM.yellow} width={4} />
          <Arrow x1={540} y1={160} x2={540} y2={320} color={MANIM.yellow} width={4} />
        </Fade>
        <Fade show={beat === 4}>
          {[272, 540].map((x) => (
            <g key={x}>
              <Arrow x1={x} y1={356} x2={x - 40} y2={392} color={MANIM.yellow} width={4} />
              <Arrow x1={x} y1={356} x2={x} y2={398} color={MANIM.yellow} width={4} />
              <Arrow x1={x} y1={356} x2={x + 40} y2={392} color={MANIM.yellow} width={4} />
            </g>
          ))}
        </Fade>
        {pasos.map((p, i) => (
          <Txt key={p.t} x={650} y={90 + i * 80} size={20} color={beat === i + 1 ? p.c : MANIM.muted} anchor="start">
            {i + 1}. {p.t}
          </Txt>
        ))}
      </Canvas>
    ),
  };
}
