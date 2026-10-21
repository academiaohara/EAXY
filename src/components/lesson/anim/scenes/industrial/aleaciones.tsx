import { Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Canvas } from "@/components/lesson/anim/primitives";
import type { AnimBuild } from "@/components/lesson/anim/types";
import {
  Axes,
  DrawPath,
  GRAIN_COLORS,
  pointsAttr,
  spreadSeeds,
  voronoiPolygons,
} from "@/components/lesson/anim/scenes/industrial/common";
import type { SlideAnimParams } from "@/lib/lesson/types";

/* ───────────── Red cristalina: sustitución e inserción ───────────── */

const S = 62;

function Atom({ x, y, r, color, dx = 0, dy = 0, scale = 1, opacity = 0.85 }: { x: number; y: number; r: number; color: string; dx?: number; dy?: number; scale?: number; opacity?: number }) {
  return (
    <g
      className="anim-t"
      style={{ transform: `translate(${dx}px, ${dy}px) scale(${scale})`, transformBox: "fill-box", transformOrigin: "center" }}
    >
      <circle cx={x} cy={y} r={r} fill={color} fillOpacity={opacity} stroke={color} strokeWidth={2} />
    </g>
  );
}

/** Desplazamiento radial de una posición respecto de un defecto (positivo = hacia fuera). */
function push(p: readonly [number, number], c: readonly [number, number], k: number): [number, number] {
  const dx = p[0] - c[0];
  const dy = p[1] - c[1];
  const l = Math.hypot(dx, dy) || 1;
  const m = k * (S / l) ** 2;
  return [(dx / l) * m, (dy / l) * m];
}

export function buildRedSolucionSolida(): AnimBuild {
  const L = { cx: 200, cy: 220 };
  const R = { cx: 600, cy: 220 };
  const cols = 5;
  const rows = 4;
  const cell = (c: number, r: number, o: { cx: number; cy: number }): [number, number] => [o.cx + (c - 2) * S, o.cy + (r - 1.5) * S];
  const subCell: [number, number] = cell(2, 1, L);
  const holes: [number, number][] = [
    [R.cx + 0.5 * S, R.cy - 1 * S],
    [R.cx - 1.5 * S, R.cy + 1 * S],
  ];

  return {
    label: "Red cristalina del disolvente con átomos de soluto por sustitución y por inserción",
    beatMs: 3600,
    captions: [
      "En una aleación hay un **disolvente**, que conserva la red cristalina, y un **soluto** que se disuelve en ella.",
      "**Sustitución**: el soluto tiene un tamaño parecido y **ocupa el lugar** de un átomo del disolvente. La red sigue intacta.",
      "**Inserción**: si los átomos del soluto son muy pequeños, se colocan en los **huecos** (intersticios) de la red.",
      "Si el átomo es **mayor** que el hueco, la red se deforma. Aparecen tensiones internas, como en un ensayo de tracción.",
      "Un átomo **menor** también deforma la red: la contrae. En ambos casos sube el límite elástico y el material se vuelve más frágil.",
    ],
    render: (beat) => {
      const big = beat >= 3;
      const small = beat >= 4;
      return (
        <Canvas>
          <Txt x={L.cx} y={46} size={22} color={MANIM.blue}>
            {beat >= 1 ? "(a) Sustitución" : "Red del disolvente"}
          </Txt>
          {Array.from({ length: rows }, (_, r) =>
            Array.from({ length: cols }, (_, c) => {
              const p = cell(c, r, L);
              const isSub = c === 2 && r === 1;
              if (isSub) {
                return null;
              }
              const k = small ? -9 : big ? 12 : 0;
              const [dx, dy] = k === 0 ? [0, 0] : push(p, subCell, k);
              return <Atom key={`l${c}-${r}`} x={p[0]} y={p[1]} r={22} color={MANIM.blue} dx={dx} dy={dy} />;
            }),
          )}
          <Atom x={subCell[0]} y={subCell[1]} r={22} color={beat >= 1 ? MANIM.yellow : MANIM.blue} scale={small ? 0.72 : big ? 1.3 : 1} opacity={0.95} />

          <Fade show={beat >= 2} dx={20}>
            <Txt x={R.cx} y={46} size={22} color={MANIM.blue}>
              (b) Inserción
            </Txt>
            {Array.from({ length: rows }, (_, r) =>
              Array.from({ length: cols }, (_, c) => {
                const p = cell(c, r, R);
                const [ax, ay] = big ? push(p, holes[0]!, 7) : [0, 0];
                const [bx, by] = big ? push(p, holes[1]!, 7) : [0, 0];
                return <Atom key={`r${c}-${r}`} x={p[0]} y={p[1]} r={22} color={MANIM.blue} dx={ax + bx} dy={ay + by} />;
              }),
            )}
            {holes.map((h, i) => (
              <Atom key={`h${i}`} x={h[0]} y={h[1]} r={9} color={MANIM.red} scale={big ? 1.25 : 1} opacity={1} />
            ))}
          </Fade>

          <g>
            <circle cx={150} cy={392} r={8} fill={MANIM.blue} />
            <Txt x={166} y={398} size={16} color={MANIM.muted} anchor="start" weight={500}>
              Disolvente
            </Txt>
            <circle cx={300} cy={392} r={8} fill={MANIM.yellow} />
            <Txt x={316} y={398} size={16} color={MANIM.muted} anchor="start" weight={500}>
              Soluto (sustitución)
            </Txt>
            <circle cx={530} cy={392} r={5} fill={MANIM.red} />
            <Txt x={544} y={398} size={16} color={MANIM.muted} anchor="start" weight={500}>
              Soluto (inserción)
            </Txt>
          </g>
        </Canvas>
      );
    },
  };
}

/* ───────────── Curvas de enfriamiento ───────────── */

export function buildCurvaEnfriamiento(): AnimBuild {
  const pure = "M 100 60 C 150 120 220 170 280 175 L 470 175 C 520 190 600 270 740 330";
  const dip = "M 262 176 Q 272 214 288 196 L 306 175";
  const alloy = "M 100 40 C 150 100 210 135 250 142 C 330 160 400 205 470 235 C 540 265 620 300 740 345";
  const eutectic = "M 100 90 C 150 150 220 200 280 205 L 440 205 C 500 225 600 290 740 340";
  return {
    label: "Curvas de enfriamiento de un metal puro y de aleaciones",
    beatMs: 3400,
    captions: [
      "Un metal puro se enfría desde el estado **líquido**: la temperatura baja con el tiempo.",
      "Al llegar a la temperatura de solidificación $T_s$ se queda **constante**: el metal cede calor latente mientras cristaliza.",
      "Cuando todo es sólido, la temperatura vuelve a bajar.",
      "A veces el líquido baja de $T_s$ sin solidificar: es la **subfusión**. Es inestable: al empezar a cristalizar vuelve a subir.",
      "En una aleación no hay tramo horizontal. En **B** empiezan los cristales y en **C** termina la solidificación; entre ambos la temperatura sigue bajando, más despacio.",
      "Una aleación **eutéctica** se comporta como un metal puro: solidifica a temperatura constante.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={90} y0={370} x1={760} y1={30} xLabel="Tiempo" yLabel="Temperatura" />
        <DrawPath show d={pure} color={MANIM.blue} opacity={beat >= 4 ? 0.3 : 1} delay={0} />
        <Fade show={beat >= 1}>
          <line x1={90} y1={175} x2={280} y2={175} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 6" />
          <Txt x={98} y={166} size={22} color={MANIM.yellow} anchor="start">
            Ts
          </Txt>
          <Txt x={375} y={152} size={20} color={MANIM.yellow}>
            Solidificación
          </Txt>
        </Fade>
        <Fade show={beat >= 0 && beat < 4}>
          <Txt x={150} y={206} size={19} color={MANIM.muted} weight={500}>
            Líquido
          </Txt>
        </Fade>
        <Fade show={beat >= 2 && beat < 4}>
          <Txt x={640} y={248} size={19} color={MANIM.muted} weight={500}>
            Sólido
          </Txt>
        </Fade>
        <DrawPath show={beat === 3} d={dip} color={MANIM.orange} width={5} />
        <Fade show={beat === 3} dy={6}>
          <Txt x={310} y={235} size={20} color={MANIM.orange}>
            Subfusión
          </Txt>
        </Fade>
        <DrawPath show={beat >= 4} d={alloy} color={MANIM.green} opacity={beat >= 5 ? 0.35 : 1} />
        <Fade show={beat === 4}>
          {(
            [
              ["A", 100, 40],
              ["B", 250, 142],
              ["C", 470, 235],
              ["D", 740, 345],
            ] as const
          ).map(([name, x, y]) => (
            <g key={name}>
              <circle cx={x} cy={y} r={6} fill={MANIM.green} />
              <Txt x={x + (name === "A" ? 16 : 12)} y={y - 12} size={20} color={MANIM.green}>
                {name}
              </Txt>
            </g>
          ))}
          <Txt x={248} y={118} size={17} color={MANIM.green} weight={500}>
            Inicio
          </Txt>
          <Txt x={478} y={268} size={17} color={MANIM.green} weight={500}>
            Fin
          </Txt>
        </Fade>
        <DrawPath show={beat >= 5} d={eutectic} color={MANIM.purple} />
        <Fade show={beat >= 5}>
          <line x1={90} y1={205} x2={280} y2={205} stroke={MANIM.purple} strokeWidth={2} strokeDasharray="6 6" />
          <Txt x={360} y={232} size={19} color={MANIM.purple}>
            Eutéctica: T constante
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Etapas de la solidificación ───────────── */

const PW = 340;
const PH = 300;
const SEEDS_FEW: readonly (readonly [number, number])[] = [
  [60, 55],
  [170, 70],
  [270, 45],
  [80, 180],
  [200, 195],
  [290, 240],
  [150, 262],
];
const SEEDS_MANY = spreadSeeds(18, PW, PH);

/** Granos como polígonos exactos de Voronoi; `scale` los hace crecer desde su centro. */
function Grains({ seeds, scale, ox, oy }: { seeds: readonly (readonly [number, number])[]; scale: number; ox: number; oy: number }) {
  const polys = voronoiPolygons(seeds, PW, PH);
  return (
    <g transform={`translate(${ox} ${oy})`}>
      {polys.map((poly, i) => (
        <g
          key={i}
          className="anim-t"
          style={{ opacity: scale > 0.1 ? 1 : 0, transform: `scale(${scale})`, transformBox: "fill-box", transformOrigin: "center", transitionDelay: `${i * 70}ms` }}
        >
          <polygon points={pointsAttr(poly)} fill={GRAIN_COLORS[i % GRAIN_COLORS.length]} fillOpacity={0.6} stroke="#0d1520" strokeWidth={4} strokeLinejoin="round" />
        </g>
      ))}
    </g>
  );
}

function Dendrite({ x, y, len, show }: { x: number; y: number; len: number; show: boolean }) {
  const arms: [number, number][] = [
    [1, 0],
    [-1, 0],
    [0, 1],
    [0, -1],
  ];
  return (
    <Fade show={show} scale={0.3}>
      {arms.map(([ax, ay], i) => (
        <g key={i}>
          <line x1={x} y1={y} x2={x + ax * len} y2={y + ay * len} stroke={MANIM.ink} strokeWidth={2.5} strokeLinecap="round" />
          {[0.4, 0.7].map((t) => (
            <g key={t}>
              <line x1={x + ax * len * t} y1={y + ay * len * t} x2={x + ax * len * t + ay * len * 0.25} y2={y + ay * len * t + ax * len * 0.25} stroke={MANIM.ink} strokeWidth={1.5} />
              <line x1={x + ax * len * t} y1={y + ay * len * t} x2={x + ax * len * t - ay * len * 0.25} y2={y + ay * len * t - ax * len * 0.25} stroke={MANIM.ink} strokeWidth={1.5} />
            </g>
          ))}
        </g>
      ))}
    </Fade>
  );
}

export function buildSolidificacionEtapas(): AnimBuild {
  const LX = 40;
  const RX = 420;
  const Y = 60;
  const dots = Array.from({ length: 46 }, (_, i) => [((i * 53) % (PW - 20)) + 10, ((i * 97) % (PH - 20)) + 10] as const);
  return {
    label: "Etapas de la solidificación: nucleación, crecimiento y formación del grano",
    beatMs: 3600,
    captions: [
      "El metal fundido es un **líquido** sin orden: los átomos se mueven libremente.",
      "**Nucleación**: aparecen núcleos estables de sólido. Para ello hace falta un pequeño subenfriamiento.",
      "**Cristalización**: cada núcleo crece en las tres direcciones del espacio formando **dendritas**.",
      "**Formación del grano**: los cristales se encuentran y quedan separados por los **bordes de grano**.",
      "Los **afinadores de grano** añaden más núcleos: más granos, más pequeños y mejores propiedades mecánicas.",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={LX + PW / 2} y={40} size={20} color={MANIM.blue}>
          {beat >= 4 ? "Pocos núcleos" : "Metal en el molde"}
        </Txt>
        <rect x={LX} y={Y} width={PW} height={PH} rx={6} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.blue} strokeWidth={2.5} />
        <Fade show={beat < 3}>
          <g transform={`translate(${LX} ${Y})`}>
            {dots.map(([x, y], i) => (
              <circle key={i} cx={x} cy={y} r={3} fill={MANIM.blue} opacity={0.6} />
            ))}
          </g>
        </Fade>
        <Grains seeds={SEEDS_FEW} scale={beat >= 3 ? 1 : beat >= 2 ? 0.5 : 0.05} ox={LX} oy={Y} />
        <g transform={`translate(${LX} ${Y})`}>
          <Fade show={beat >= 1}>
            {SEEDS_FEW.map(([x, y], i) => (
              <rect key={i} x={x - 6} y={y - 6} width={12} height={12} fill={MANIM.ink} />
            ))}
          </Fade>
          {SEEDS_FEW.map(([x, y], i) => (
            <Dendrite key={i} x={x} y={y} len={34} show={beat === 2} />
          ))}
        </g>
        <Fade show={beat >= 1 && beat < 3}>
          <Txt x={LX + PW / 2} y={Y + PH + 34} size={19} color={MANIM.muted} weight={500}>
            {beat === 1 ? "Núcleos estables" : "Crecimiento dendrítico"}
          </Txt>
        </Fade>
        <Fade show={beat >= 3 && beat < 4}>
          <Txt x={LX + PW / 2} y={Y + PH + 34} size={19} color={MANIM.muted} weight={500}>
            Granos y bordes de grano
          </Txt>
        </Fade>

        <Fade show={beat >= 4} dx={30}>
          <Txt x={RX + PW / 2} y={40} size={20} color={MANIM.green}>
            Con afinadores de grano
          </Txt>
          <rect x={RX} y={Y} width={PW} height={PH} rx={6} fill="none" stroke={MANIM.green} strokeWidth={2.5} />
          <Grains seeds={SEEDS_MANY} scale={1} ox={RX} oy={Y} />
          <Txt x={RX + PW / 2} y={Y + PH + 34} size={19} color={MANIM.green} weight={500}>
            Más núcleos → grano fino
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Regla de la palanca (diagrama genérico del libro) ───────────── */

const PX = (c: number) => 110 + c * 6;
const yUp = (u: number) => 90 + 180 * u ** 1.15;
const yLow = (u: number) => yUp(u) + 338 * u * (1 - u);

function lensPath(top: boolean): string {
  const pts: string[] = [];
  for (let i = 0; i <= 40; i += 1) {
    const u = i / 40;
    pts.push(`${PX(u * 100).toFixed(1)} ${(top ? yUp(u) : yLow(u)).toFixed(1)}`);
  }
  return `M ${pts.join(" L ")}`;
}

export function buildReglaPalanca(): AnimBuild {
  const T3 = 190;
  const cb = 25;
  const c0 = 40;
  const ca = 60;
  return {
    label: "Regla de la palanca aplicada a un diagrama de fases binario",
    beatMs: 3800,
    captions: [
      "Aleación con el **40 % de B** que se enfría. En la zona central conviven las fases $\\alpha$ y $\\beta$ y hay que saber cuánto hay de cada una.",
      "A la temperatura $T_3$ se traza la **isoterma**. Corta las líneas de fase en $C_\\beta = 25\\,\\%$ y $C_\\alpha = 60\\,\\%$: son las composiciones de cada fase.",
      "El punto de la aleación divide la isoterma en dos segmentos: $40-25 = 15$ y $60-40 = 20$.",
      "La fracción de una fase es el **segmento del lado contrario** dividido entre la isoterma completa: $W_\\alpha = \\dfrac{40-25}{60-25} = 0{,}4286$.",
      "Y la otra fase: $W_\\beta = \\dfrac{60-40}{60-25} = 0{,}5714$. Suman 1, es decir, el 100 %.",
    ],
    render: (beat) => {
      const xCb = PX(cb);
      const x0 = PX(c0);
      const xCa = PX(ca);
      return (
        <Canvas>
          <path d={`${lensPath(true)} L ${PX(100)} 40 L ${PX(0)} 40 Z`} fill={MANIM.blue} fillOpacity={0.22} stroke="none" />
          <path d={`${lensPath(false)} L ${PX(100)} 340 L ${PX(0)} 340 Z`} fill={MANIM.yellow} fillOpacity={0.2} stroke="none" />
          <path
            d={`${lensPath(true)} L ${[...Array(41)].map((_, i) => `${PX((1 - i / 40) * 100).toFixed(1)} ${yLow(1 - i / 40).toFixed(1)}`).join(" L ")} Z`}
            fill={MANIM.green}
            fillOpacity={0.3}
            stroke="none"
          />
          <DrawPath show d={lensPath(true)} color={MANIM.blue} width={3} />
          <DrawPath show d={lensPath(false)} color={MANIM.yellow} width={3} />
          <Axes x0={PX(0)} y0={340} x1={PX(100) + 30} y1={30} yLabel="Temperatura" />
          <Txt x={PX(50)} y={376} size={16} color={MANIM.muted} weight={500}>
            Composición (% de B)
          </Txt>
          <Txt x={PX(86)} y={90} size={22} color={MANIM.blue}>
            Fase α
          </Txt>
          <Txt x={PX(14)} y={290} size={22} color={MANIM.yellow}>
            Fase β
          </Txt>
          <Txt x={PX(78)} y={254} size={22} color={MANIM.green}>
            α + β
          </Txt>
          <Txt x={PX(0)} y={360} size={16} color={MANIM.muted} weight={500} anchor="middle">
            100 % A
          </Txt>
          <Txt x={PX(100)} y={360} size={16} color={MANIM.muted} weight={500} anchor="middle">
            100 % B
          </Txt>
          <line x1={x0} y1={40} x2={x0} y2={340} stroke={MANIM.ink} strokeWidth={2} strokeDasharray="6 6" opacity={0.7} />
          <Txt x={x0} y={30} size={17} color={MANIM.ink} weight={500}>
            C = 40 %
          </Txt>
          <circle cx={x0} cy={T3} r={7} fill={MANIM.ink} />
          <Txt x={x0 + 12} y={T3 - 12} size={20} color={MANIM.ink} anchor="start">
            P₃
          </Txt>
          <Txt x={PX(0) + 8} y={T3 - 8} size={19} color={MANIM.muted} anchor="start">
            T₃
          </Txt>

          <Fade show={beat >= 1}>
            <line x1={PX(0)} y1={T3} x2={xCa} y2={T3} stroke={MANIM.red} strokeWidth={3.5} />
            <circle cx={xCb} cy={T3} r={6} fill={MANIM.yellow} />
            <circle cx={xCa} cy={T3} r={6} fill={MANIM.blue} />
            <line x1={xCb} y1={T3} x2={xCb} y2={340} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 5" />
            <line x1={xCa} y1={T3} x2={xCa} y2={340} stroke={MANIM.blue} strokeWidth={2} strokeDasharray="5 5" />
            <Txt x={xCb} y={326} size={17} color={MANIM.yellow} weight={700}>
              25
            </Txt>
            <Txt x={xCa} y={326} size={17} color={MANIM.blue} weight={700}>
              60
            </Txt>
            <Txt x={xCb - 6} y={T3 - 12} size={17} color={MANIM.yellow} anchor="end">
              Cβ
            </Txt>
            <Txt x={xCa + 6} y={T3 - 12} size={17} color={MANIM.blue} anchor="start">
              Cα
            </Txt>
          </Fade>

          <Fade show={beat >= 2}>
            <line x1={xCb} y1={T3 + 14} x2={x0} y2={T3 + 14} stroke={MANIM.orange} strokeWidth={5} strokeLinecap="round" />
            <line x1={x0} y1={T3 + 14} x2={xCa} y2={T3 + 14} stroke={MANIM.purple} strokeWidth={5} strokeLinecap="round" />
            <Txt x={(xCb + x0) / 2} y={T3 + 40} size={18} color={MANIM.orange} weight={700}>
              15
            </Txt>
            <Txt x={(x0 + xCa) / 2} y={T3 + 40} size={18} color={MANIM.purple} weight={700}>
              20
            </Txt>
          </Fade>

          <Fade show={beat >= 3}>
            <g transform="translate(560 150)">
              <rect x={0} y={0} width={190} height={26} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={1.5} />
              <rect x={0} y={0} width={190 * 0.4286} height={26} fill={MANIM.blue} fillOpacity={0.8} className="anim-t" />
              <rect x={190 * 0.4286} y={0} width={190 * (beat >= 4 ? 0.5714 : 0)} height={26} fill={MANIM.yellow} fillOpacity={0.8} className="anim-t" />
              <Txt x={95 * 0.4286} y={19} size={15} color={MANIM.surface}>
                α
              </Txt>
              {beat >= 4 ? (
                <Txt x={190 * 0.4286 + 190 * 0.2857} y={19} size={15} color={MANIM.surface}>
                  β
                </Txt>
              ) : null}
              <Txt x={95} y={-10} size={17} color={MANIM.ink} weight={500}>
                Aleación al 40 % de B
              </Txt>
              <Txt x={0} y={60} size={19} color={MANIM.blue} anchor="start">
                Wα = 0,4286 → 42,86 %
              </Txt>
              {beat >= 4 ? (
                <Txt x={0} y={90} size={19} color={MANIM.yellow} anchor="start">
                  Wβ = 0,5714 → 57,14 %
                </Txt>
              ) : null}
            </g>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Aleación eutéctica: enfriamiento de una hipoeutéctica ───────────── */

const EX = (c: number) => 70 + c * 4.4;
const EY = (t: number) => 360 - (t - 400) * 0.5;

export function buildEutecticoEnfriamiento(): AnimBuild {
  const c0 = 30;
  const states: { t: number; text: string }[] = [
    { t: 800, text: "" },
    { t: 700, text: "" },
    { t: 600, text: "" },
    { t: 500, text: "" },
    { t: 430, text: "" },
  ];
  return {
    label: "Enfriamiento de una aleación hipoeutéctica A-B hasta la reacción eutéctica",
    beatMs: 3800,
    captions: [
      "Aleación con el **30 % de B**. Por encima de la línea de *liquidus* todo es líquido homogéneo.",
      "En la línea de *liquidus* empiezan a formarse los primeros cristales de **A puro**.",
      "Entre *liquidus* y *solidus* hay cristales de A y líquido. Al cristalizar A, el líquido se **enriquece en B**.",
      "A la temperatura eutéctica el líquido alcanza la composición eutéctica (60 % de B) y solidifica de golpe en **cristales mixtos A + B**.",
      "Por debajo no hay más cambios: A primario rodeado de **eutéctico**. Como tiene menos B que la eutéctica, es **hipoeutéctica**.",
    ],
    render: (beat) => {
      const dotY = EY(states[beat]!.t);
      const mx = 560;
      const my = 110;
      const mw = 220;
      const mh = 180;
      const crystals: [number, number, number, number][] = [
        [30, 40, 50, 28],
        [100, 24, 44, 30],
        [150, 90, 56, 26],
        [45, 110, 52, 34],
        [110, 140, 46, 26],
        [170, 30, 36, 24],
      ];
      return (
        <Canvas>
          <Axes x0={EX(0)} y0={370} x1={EX(100) + 16} y1={40} xLabel="% de B" yLabel="Temperatura" />
          <DrawPath show d={`M ${EX(0)} ${EY(900)} L ${EX(60)} ${EY(500)} L ${EX(100)} ${EY(700)}`} color={MANIM.blue} width={3.5} />
          <DrawPath show d={`M ${EX(0)} ${EY(500)} L ${EX(100)} ${EY(500)}`} color={MANIM.orange} width={3.5} />
          <Txt x={EX(70)} y={EY(800)} size={22} color={MANIM.blue}>
            Líquido
          </Txt>
          <Txt x={EX(16)} y={EY(670)} size={17} color={MANIM.muted} weight={500}>
            L + A
          </Txt>
          <Txt x={EX(88)} y={EY(556)} size={17} color={MANIM.muted} weight={500}>
            L + B
          </Txt>
          <Txt x={EX(28)} y={EY(450)} size={16} color={MANIM.muted} weight={500}>
            A + (A+B)
          </Txt>
          <Txt x={EX(80)} y={EY(450)} size={16} color={MANIM.muted} weight={500}>
            B + (A+B)
          </Txt>
          <Txt x={EX(60)} y={EY(500) + 62} size={16} color={MANIM.orange} weight={500}>
            Eutéctico
          </Txt>
          <line x1={EX(c0)} y1={EY(900)} x2={EX(c0)} y2={EY(400)} stroke={MANIM.ink} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
          <g className="anim-t" style={{ transform: `translateY(${dotY}px)` }}>
            <circle cx={EX(c0)} cy={0} r={8} fill={MANIM.red} />
          </g>
          <Fade show={beat === 2}>
            <line x1={EX(0)} y1={EY(600)} x2={EX(45)} y2={EY(600)} stroke={MANIM.yellow} strokeWidth={3} />
            <circle cx={EX(45)} cy={EY(600)} r={5} fill={MANIM.yellow} />
            <Txt x={EX(45) + 8} y={EY(600) - 8} size={16} color={MANIM.yellow} anchor="start">
              líquido: 45 % B
            </Txt>
          </Fade>
          <Fade show={beat === 3}>
            <circle cx={EX(60)} cy={EY(500)} r={7} fill={MANIM.yellow} />
            <Txt x={EX(60)} y={EY(500) + 36} size={16} color={MANIM.yellow}>
              60 % B
            </Txt>
          </Fade>

          <Txt x={mx + mw / 2} y={92} size={18} color={MANIM.muted} weight={500}>
            Microestructura
          </Txt>
          <rect x={mx} y={my} width={mw} height={mh} rx={6} fill={MANIM.blue} fillOpacity={beat < 1 ? 0.25 : 0.12} stroke={MANIM.muted} strokeWidth={2} />
          <g transform={`translate(${mx} ${my})`}>
            <Fade show={beat >= 3}>
              {Array.from({ length: 18 }, (_, i) => (
                <rect key={i} x={i * 12.5} y={0} width={6} height={mh} fill={MANIM.purple} fillOpacity={0.75} />
              ))}
              {Array.from({ length: 18 }, (_, i) => (
                <rect key={i} x={i * 12.5 + 6} y={0} width={6.5} height={mh} fill={MANIM.orange} fillOpacity={0.55} />
              ))}
            </Fade>
            {crystals.map(([x, y, w, h], i) => (
              <g key={i} className="anim-t" style={{ opacity: beat >= 1 ? 1 : 0, transform: `scale(${beat >= 2 ? 1 : 0.35})`, transformBox: "fill-box", transformOrigin: "center", transitionDelay: `${i * 90}ms` }}>
                <rect x={x} y={y} width={w} height={h} rx={9} fill={MANIM.green} fillOpacity={0.95} stroke={MANIM.surface} strokeWidth={2} />
              </g>
            ))}
          </g>
          <Fade show={beat >= 4}>
            <Txt x={mx + 4} y={my + mh + 28} size={16} color={MANIM.green} anchor="start">
              ■ A primario
            </Txt>
            <Txt x={mx + 4} y={my + mh + 50} size={16} color={MANIM.purple} anchor="start">
              ▮▮ Eutéctico (A + B)
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Aceros: del líquido a la perlita ───────────── */

const FX = (c: number) => 80 + c * 250;
const FY = (t: number) => 355 - (t - 600) * 0.28;
const tLiq = (c: number) => 1539 - 95.1 * c;
const tSol = (c: number) => 1539 - 232.4 * c;
const tA3 = (c: number) => (c <= 0.89 ? 910 - ((910 - 723) / 0.89) * c : 723);
const tAcm = (c: number) => (c >= 0.89 ? 723 + ((1130 - 723) / (1.76 - 0.89)) * (c - 0.89) : 723);

export function buildFeCEnfriamiento(params: SlideAnimParams = {}): AnimBuild {
  const c = Math.min(1.7, Math.max(0.1, params.a ?? 0.5));
  const eutectoid = Math.abs(c - 0.89) < 0.02;
  const hypo = c < 0.89 && !eutectoid;
  const tCross = eutectoid ? 723 : hypo ? tA3(c) : tAcm(c);
  const temps = [1600, tLiq(c), tSol(c), tCross, 723, 640];
  const wPerl = hypo ? Math.round((c / 0.89) * 100) : eutectoid ? 100 : Math.round(((6.67 - c) / (6.67 - 0.89)) * 100);
  const cName = eutectoid ? "eutectoide" : hypo ? "hipoeutectoide" : "hipereutectoide";
  const prime = hypo ? "ferrita" : "cementita";
  const cStr = String(c).replace(".", ",");

  const captions = [
    `Acero con el **${cStr} % de C** a 1 600 °C: está **líquido**.`,
    "Al llegar a la línea de *liquidus* empiezan a formarse cristales de **austenita** ($\\gamma$).",
    "En la línea de *solidus* ha solidificado todo: el acero es **austenita** pura.",
    eutectoid
      ? "Sigue siendo austenita hasta $A_1$: en este acero coinciden $A_3$, $A_1$ y $A_{cm}$."
      : hypo
        ? "En $A_3$ el hierro $\\gamma$ empieza a transformarse en hierro $\\alpha$: aparece la **ferrita proeutectoide** y la austenita restante se enriquece en carbono."
        : "En $A_{cm}$ empieza a separarse **cementita** ($Fe_3C$) y la austenita restante se empobrece en carbono.",
    eutectoid
      ? "En $A_1$ la austenita se transforma de golpe en **perlita** (ferrita + cementita en láminas)."
      : `En $A_1$ la austenita restante llega al 0,89 % de C y se transforma en **perlita**. Queda perlita + ${prime}.`,
    eutectoid
      ? "A temperatura ambiente: **100 % perlita**. Es la composición eutectoide."
      : `A temperatura ambiente: aproximadamente **${wPerl} % perlita** y **${100 - wPerl} % ${prime}** (regla de la palanca). Es un acero **${cName}**.`,
  ];

  const fecPolys = voronoiPolygons(
    [
      [30, 30],
      [100, 55],
      [170, 28],
      [40, 110],
      [120, 125],
      [180, 105],
      [70, 165],
      [160, 160],
    ],
    200,
    180,
  );
  const mx = 580;
  const my = 120;

  return {
    label: "Enfriamiento de un acero desde el estado líquido hasta temperatura ambiente",
    beatMs: 3600,
    captions,
    render: (beat) => {
      const dy = FY(temps[beat]!);
      return (
        <Canvas>
          <defs>
            <pattern id="fec-perlita" width="8" height="8" patternUnits="userSpaceOnUse" patternTransform="rotate(35)">
              <rect width="8" height="8" fill="#d9c6e8" />
              <rect width="3" height="8" fill="#3a2d4d" />
            </pattern>
          </defs>
          <Axes x0={FX(0)} y0={375} x1={FX(1.9)} y1={50} xLabel="% de C" yLabel="Temperatura" />
          <DrawPath show d={`M ${FX(0)} ${FY(1539)} L ${FX(1.9)} ${FY(tLiq(1.9))}`} color={MANIM.blue} width={3} />
          <DrawPath show d={`M ${FX(0)} ${FY(1539)} L ${FX(1.76)} ${FY(1130)}`} color={MANIM.blue} width={3} />
          <DrawPath show d={`M ${FX(0)} ${FY(910)} L ${FX(0.89)} ${FY(723)}`} color={MANIM.green} width={3} />
          <DrawPath show d={`M ${FX(0.89)} ${FY(723)} L ${FX(1.76)} ${FY(1130)}`} color={MANIM.orange} width={3} />
          <DrawPath show d={`M ${FX(0)} ${FY(723)} L ${FX(1.76)} ${FY(723)}`} color={MANIM.yellow} width={3} />
          <Txt x={FX(1.45)} y={FY(1540)} size={19} color={MANIM.blue}>
            Líquido
          </Txt>
          <Txt x={FX(0.98)} y={FY(1130)} size={19} color={MANIM.muted} weight={500}>
            Austenita γ
          </Txt>
          <Txt x={FX(0.95)} y={FY(1310)} size={15} color={MANIM.muted} weight={500}>
            γ + L
          </Txt>
          <Txt x={FX(0.22)} y={FY(840)} size={15} color={MANIM.muted} weight={500}>
            α + γ
          </Txt>
          <Txt x={FX(0.4)} y={FY(650)} size={15} color={MANIM.muted} weight={500}>
            α + perlita
          </Txt>
          <Txt x={FX(1.4)} y={FY(650)} size={15} color={MANIM.muted} weight={500}>
            Fe₃C + perlita
          </Txt>
          <Txt x={FX(1.45)} y={FY(850)} size={15} color={MANIM.muted} weight={500}>
            γ + Fe₃C
          </Txt>
          <Txt x={FX(0) - 12} y={FY(723) + 6} size={15} color={MANIM.yellow} anchor="end">
            A₁
          </Txt>
          <Txt x={FX(0) - 12} y={FY(910) + 6} size={15} color={MANIM.green} anchor="end">
            A₃
          </Txt>
          <Txt x={FX(1.76) + 6} y={FY(1130) - 4} size={15} color={MANIM.orange} anchor="start">
            Acm
          </Txt>
          <line x1={FX(c)} y1={FY(1650)} x2={FX(c)} y2={FY(600)} stroke={MANIM.ink} strokeWidth={2} strokeDasharray="6 6" opacity={0.6} />
          <g className="anim-t" style={{ transform: `translateY(${dy}px)` }}>
            <circle cx={FX(c)} cy={0} r={8} fill={MANIM.red} />
          </g>

          <Txt x={mx + 100} y={100} size={18} color={MANIM.muted} weight={500}>
            Microestructura
          </Txt>
          <rect x={mx - 2} y={my - 2} width={204} height={184} rx={6} fill="none" stroke={MANIM.muted} strokeWidth={2} />
          <g transform={`translate(${mx} ${my})`}>
            <rect width={200} height={180} fill={MANIM.blue} fillOpacity={0.18} />
            {fecPolys.map((poly, k) => {
              const boundary = hypo ? "#f1f5fa" : MANIM.red;
              const showBoundary = beat >= 3 && !eutectoid;
              const fill = beat < 1 ? "transparent" : beat >= 4 ? "url(#fec-perlita)" : "#3a6ea5";
              return (
                <g
                  key={k}
                  className="anim-t"
                  style={{ opacity: beat >= 1 ? 1 : 0, transform: `scale(${beat >= 2 ? 1 : 0.45})`, transformBox: "fill-box", transformOrigin: "center", transitionDelay: `${k * 60}ms` }}
                >
                  <polygon
                    points={pointsAttr(poly)}
                    fill={fill}
                    stroke={showBoundary ? boundary : "#102033"}
                    strokeWidth={showBoundary ? 6 : 3}
                    strokeLinejoin="round"
                    className="anim-t"
                  />
                </g>
              );
            })}
          </g>
          <Fade show={beat >= 5}>
            <Txt x={mx} y={my + 206} size={15} color="#d9c6e8" anchor="start">
              ▨ Perlita
            </Txt>
            {!eutectoid ? (
              <Txt x={mx} y={my + 228} size={15} color={hypo ? "#f1f5fa" : MANIM.red} anchor="start">
                {hypo ? "▢ Ferrita" : "▢ Cementita"}
              </Txt>
            ) : null}
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Fundiciones: forma del grafito ───────────── */

export function buildGrafitoFundiciones(): AnimBuild {
  const panels = [
    { x: 30, name: "Gris", sub: "grafito en láminas" },
    { x: 230, name: "Esferoidal", sub: "grafito en esferas" },
    { x: 430, name: "Blanca", sub: "carbono como cementita" },
    { x: 630, name: "Maleable", sub: "grafito en rosetas" },
  ];
  const pw = 150;
  const py = 110;
  const ph = 180;
  const flakes = [
    "M 12 40 Q 40 30 70 50 T 130 44",
    "M 20 90 Q 60 70 90 95 T 140 80",
    "M 8 140 Q 50 125 80 148 T 138 130",
    "M 40 20 Q 50 60 40 100",
    "M 100 70 Q 110 110 98 160",
    "M 60 110 Q 76 130 66 168",
  ];
  const spheres: [number, number, number][] = [
    [35, 35, 11],
    [100, 50, 10],
    [60, 95, 12],
    [118, 120, 11],
    [30, 145, 10],
    [95, 160, 9],
  ];
  const rosettes: [number, number][] = [
    [40, 45],
    [105, 70],
    [55, 125],
    [115, 150],
  ];
  const focus = (i: number, beat: number) => (beat === i ? 1 : beat > i ? 0.55 : 0.18);
  return {
    label: "Tipos de fundición según la forma en que aparece el carbono",
    beatMs: 3800,
    captions: [
      "**Fundición gris**: el carbono (2,5–4 %) aparece como **láminas de grafito**. Es frágil a tracción, pero muy resistente a compresión y amortigua vibraciones.",
      "Con pequeñas adiciones de **magnesio** el grafito se vuelve **esferas**: la fundición esferoidal es más resistente y dúctil, con propiedades parecidas al acero.",
      "Con poco silicio y **enfriamiento rápido**, el carbono se queda como **cementita**: fundición blanca, muy dura y frágil, imposible de mecanizar.",
      "Calentada entre 800 y 900 °C durante mucho tiempo, la cementita se descompone en **rosetas de grafito**: fundición maleable, con ductilidad apreciable.",
    ],
    render: (beat) => (
      <Canvas>
        {panels.map((p, i) => (
          <g key={p.name} className="anim-t" style={{ opacity: focus(i, beat) }}>
            <Txt x={p.x + pw / 2} y={92} size={21} color={i === beat ? MANIM.yellow : MANIM.ink}>
              {p.name}
            </Txt>
            <rect x={p.x} y={py} width={pw} height={ph} rx={6} fill={i === 2 ? "#cfd8e3" : "#6a7688"} stroke={i === beat ? MANIM.yellow : MANIM.muted} strokeWidth={i === beat ? 4 : 2} />
            <g transform={`translate(${p.x} ${py})`}>
              {i === 0 &&
                flakes.map((d, k) => <path key={k} d={d} fill="none" stroke="#0d1520" strokeWidth={4} strokeLinecap="round" />)}
              {i === 1 &&
                spheres.map(([x, y, r], k) => (
                  <g key={k}>
                    <circle cx={x} cy={y} r={r + 4} fill="#8793a6" />
                    <circle cx={x} cy={y} r={r} fill="#0d1520" />
                  </g>
                ))}
              {i === 2 &&
                Array.from({ length: 22 }, (_, k) => (
                  <rect key={k} x={10 + ((k * 37) % 120)} y={10 + ((k * 53) % 150)} width={14} height={6} rx={2} fill="#7b8798" transform={`rotate(${(k * 40) % 120} ${10 + ((k * 37) % 120)} ${10 + ((k * 53) % 150)})`} />
                ))}
              {i === 3 &&
                rosettes.map(([x, y], k) => (
                  <g key={k}>
                    {[0, 1, 2, 3, 4, 5].map((a) => (
                      <ellipse key={a} cx={x + Math.cos((a * Math.PI) / 3) * 9} cy={y + Math.sin((a * Math.PI) / 3) * 9} rx={10} ry={6} fill="#0d1520" transform={`rotate(${a * 60} ${x + Math.cos((a * Math.PI) / 3) * 9} ${y + Math.sin((a * Math.PI) / 3) * 9})`} />
                    ))}
                  </g>
                ))}
            </g>
            <Txt x={p.x + pw / 2} y={py + ph + 26} size={15} color={MANIM.muted} weight={500}>
              {p.sub}
            </Txt>
          </g>
        ))}
        <Fade show={beat >= 1}>
          <Txt x={215} y={60} size={16} color={MANIM.green}>
            + Mg →
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={612} y={60} size={16} color={MANIM.orange}>
            recocido 800–900 °C →
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={415} y={60} size={16} color={MANIM.blue}>
            enfriamiento rápido
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
