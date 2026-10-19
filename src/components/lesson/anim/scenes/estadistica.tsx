import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, polar, type Pt } from "@/components/lesson/anim/geometry";
import type { AnimBuild } from "@/components/lesson/anim/types";

const T = ({ x, y, size = 26, color = MANIM.ink, anchor = "start", children }: { x: number; y: number; size?: number; color?: string; anchor?: "start" | "middle" | "end"; children: ReactNode }) => (
  <Txt x={x} y={y} size={size} color={color} anchor={anchor}>{children}</Txt>
);

/** Ejes cartesianos con cuadrícula: `ox, oy` es el origen en píxeles y `u` los píxeles por unidad. */
export function Axes({ ox, oy, u, xmin, xmax, ymin, ymax, ticks = true, labels = true }: { ox: number; oy: number; u: number; xmin: number; xmax: number; ymin: number; ymax: number; ticks?: boolean; labels?: boolean }) {
  return (
    <g>
      {Array.from({ length: xmax - xmin + 1 }, (_, i) => xmin + i).map((x) => (
        <line key={`vx${x}`} x1={ox + x * u} y1={oy - ymax * u} x2={ox + x * u} y2={oy - ymin * u} stroke={MANIM.grid} strokeWidth={x === 0 ? 0 : 1} />
      ))}
      {Array.from({ length: ymax - ymin + 1 }, (_, i) => ymin + i).map((y) => (
        <line key={`hy${y}`} x1={ox + xmin * u} y1={oy - y * u} x2={ox + xmax * u} y2={oy - y * u} stroke={MANIM.grid} strokeWidth={y === 0 ? 0 : 1} />
      ))}
      <line x1={ox + xmin * u - 8} y1={oy} x2={ox + xmax * u + 14} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
      <line x1={ox} y1={oy + -ymin * u + 8} x2={ox} y2={oy - ymax * u - 14} stroke={MANIM.ink} strokeWidth={3} />
      <polygon points={`${ox + xmax * u + 16},${oy} ${ox + xmax * u + 4},${oy - 6} ${ox + xmax * u + 4},${oy + 6}`} fill={MANIM.ink} />
      <polygon points={`${ox},${oy - ymax * u - 16} ${ox - 6},${oy - ymax * u - 4} ${ox + 6},${oy - ymax * u - 4}`} fill={MANIM.ink} />
      {ticks && labels
        ? [
            ...Array.from({ length: xmax - xmin + 1 }, (_, i) => xmin + i)
              .filter((x) => x !== 0)
              .map((x) => <text key={`tx${x}`} x={ox + x * u} y={oy + 22} fontSize={15} fill={MANIM.muted} textAnchor="middle">{x}</text>),
            ...Array.from({ length: ymax - ymin + 1 }, (_, i) => ymin + i)
              .filter((y) => y !== 0)
              .map((y) => <text key={`ty${y}`} x={ox - 10} y={oy - y * u + 5} fontSize={15} fill={MANIM.muted} textAnchor="end">{y}</text>),
          ]
        : null}
    </g>
  );
}

/* ───────────── Plano cartesiano ───────────── */

export function buildPlanoCartesiano(): AnimBuild {
  const u = 36;
  const ox = 90;
  const oy = 330;
  const P: Pt = [ox + 3 * u, oy - 5 * u];
  const Q: Pt = [ox + 5 * u, oy - 3 * u];
  return {
    label: "Plano cartesiano con el eje X de abscisas, el eje Y de ordenadas, el origen O y el punto P de coordenadas 3 y 5, distinto del punto Q de coordenadas 5 y 3",
    captions: [
      "Un sistema de **ejes cartesianos** son dos rectas perpendiculares. El punto donde se cortan es el **origen** $O(0, 0)$.",
      "El eje horizontal es el eje **X**, o eje de **abscisas**. El vertical es el eje **Y**, o eje de **ordenadas**.",
      "Para situar $P(3, 5)$: desde el origen, $3$ unidades a la derecha (la **abscisa**)…",
      "…y $5$ hacia arriba (la **ordenada**). Se escribe $P(x, y)$: primero la abscisa y luego la ordenada.",
      "El orden importa: $Q(5, 3)$ tiene las mismas cifras pero es **otro punto**.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes ox={ox} oy={oy} u={u} xmin={0} xmax={8} ymin={0} ymax={7} />
        <Dot p={[ox, oy]} color={MANIM.yellow} r={7} />
        <T x={ox - 24} y={oy + 26} size={22} color={MANIM.yellow} anchor="middle">O</T>
        <Fade show={beat >= 1}>
          <T x={ox + 8 * u + 24} y={oy - 14} size={24} color={MANIM.blue}>X</T>
          <T x={ox + 18} y={oy - 7 * u - 20} size={24} color={MANIM.green}>Y</T>
          <T x={ox + 8 * u - 10} y={oy + 52} size={20} color={MANIM.blue} anchor="end">abscisas</T>
          <T x={ox + 38} y={oy - 7 * u - 34} size={20} color={MANIM.green}>ordenadas</T>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={[ox, oy]} b={[P[0], oy]} color={MANIM.blue} width={5} />
          <T x={ox + 1.5 * u} y={oy + 46} size={22} color={MANIM.blue} anchor="middle">x = 3</T>
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={[P[0], oy]} b={P} color={MANIM.green} width={5} />
          <Seg a={[ox, P[1]]} b={P} color={MANIM.muted} width={2} dashed />
          <Dot p={P} color={MANIM.yellow} r={9} />
          <T x={P[0] + 16} y={P[1] - 8} size={26} color={MANIM.yellow}>P(3, 5)</T>
        </Fade>
        <Fade show={beat === 4}>
          <Dot p={Q} color={MANIM.orange} r={9} />
          <T x={Q[0] + 16} y={Q[1] + 6} size={26} color={MANIM.orange}>Q(5, 3)</T>
        </Fade>
        <Fade show={beat >= 3} dy={6}>
          <T x={560} y={120} size={28} color={MANIM.ink}>P(x, y)</T>
          <T x={560} y={160} size={24} color={MANIM.blue}>x → abscisa</T>
          <T x={560} y={196} size={24} color={MANIM.green}>y → ordenada</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Cuadrantes y signos ───────────── */

export function buildCuadrantesSignos(): AnimBuild {
  const u = 30;
  const ox = 230;
  const oy = 210;
  const pts: { p: [number, number]; name: string; color: string }[] = [
    { p: [3, 2], name: "B(3, 2)", color: MANIM.blue },
    { p: [-3, 2], name: "C(−3, 2)", color: MANIM.green },
    { p: [-2, -4], name: "F(−2, −4)", color: MANIM.orange },
    { p: [4, -2], name: "G(4, −2)", color: MANIM.purple },
  ];
  const axisPts: { p: [number, number]; name: string }[] = [
    { p: [0, 3], name: "A(0, 3)" },
    { p: [-2, 0], name: "D(−2, 0)" },
    { p: [3, 0], name: "E(3, 0)" },
  ];
  const quads = [
    { q: "I", s: "(+, +)", at: [ox + 5 * u, oy - 5 * u] as Pt, color: MANIM.blue },
    { q: "II", s: "(−, +)", at: [ox - 5 * u, oy - 5 * u] as Pt, color: MANIM.green },
    { q: "III", s: "(−, −)", at: [ox - 5 * u, oy + 5 * u] as Pt, color: MANIM.orange },
    { q: "IV", s: "(+, −)", at: [ox + 5 * u, oy + 5 * u] as Pt, color: MANIM.purple },
  ];
  return {
    label: "Los cuatro cuadrantes del plano y los signos de las coordenadas, con puntos en los cuadrantes y sobre los ejes",
    captions: [
      "Los ejes dividen el plano en **cuatro cuadrantes**, numerados en sentido antihorario desde arriba a la derecha.",
      "Los signos de $(x, y)$ cambian según el cuadrante: $(+,+)$, $(-,+)$, $(-,-)$ y $(+,-)$.",
      "Ejemplos: $B(3, 2)$ en el I, $C(-3, 2)$ en el II, $F(-2, -4)$ en el III y $G(4, -2)$ en el IV.",
      "Sobre el eje **Y** la abscisa es $0$: $A(0, 3)$. Sobre el eje **X** la ordenada es $0$: $D(-2, 0)$, $E(3, 0)$. Esos puntos no están en ningún cuadrante.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes ox={ox} oy={oy} u={u} xmin={-6} xmax={6} ymin={-6} ymax={6} ticks={false} />
        {quads.map((q) => (
          <Fade key={q.q} show={beat >= 0 && beat <= 2}>
            <T x={q.at[0]} y={q.at[1] + (q.at[1] < oy ? 10 : -10)} size={beat >= 1 ? 22 : 34} color={q.color} anchor="middle">{beat >= 1 ? `${q.q} ${q.s}` : q.q}</T>
          </Fade>
        ))}
        <Fade show={beat === 2}>
          {pts.map((p) => (
            <g key={p.name}>
              <Dot p={[ox + p.p[0] * u, oy - p.p[1] * u]} color={p.color} r={7} />
              <T x={ox + p.p[0] * u + 12} y={oy - p.p[1] * u - 8} size={18} color={p.color}>{p.name}</T>
            </g>
          ))}
        </Fade>
        <Fade show={beat === 3}>
          {axisPts.map((p) => (
            <g key={p.name}>
              <Dot p={[ox + p.p[0] * u, oy - p.p[1] * u]} color={MANIM.yellow} r={7} />
              <T x={ox + p.p[0] * u + 12} y={oy - p.p[1] * u - 8} size={18} color={MANIM.yellow}>{p.name}</T>
            </g>
          ))}
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Diagrama de puntos: edad y estatura ───────────── */

export function buildDiagramaPuntos(): AnimBuild {
  const ox = 90;
  const oy = 340;
  const ux = 24;
  const uy = 1.6;
  const people: { n: string; age: number; h: number; color: string }[] = [
    { n: "Bernardo", age: 16, h: 175, color: MANIM.blue },
    { n: "Flora", age: 14, h: 150, color: MANIM.green },
    { n: "Cristina", age: 11, h: 150, color: MANIM.orange },
    { n: "David", age: 5, h: 105, color: MANIM.purple },
  ];
  const at = (a: number, h: number): Pt => [ox + a * ux, oy - (h - 80) * uy * 1.1];
  return {
    label: "Diagrama de puntos de edad y estatura de cuatro hermanos: el más alto está más arriba, los que miden lo mismo están a la misma altura y el pequeño queda cerca del origen",
    captions: [
      "En un diagrama cartesiano de una situación real, cada punto es una persona con **dos medidas**: la **edad** (eje X) y la **estatura** (eje Y).",
      "Cada hermano es un punto. Para interpretar hay que saber qué mide cada eje.",
      "**Bernardo** es el más alto: su punto tiene la mayor **ordenada**.",
      "**Cristina** y **Flora** miden lo mismo (misma ordenada), pero Flora es mayor: su punto está más a la derecha (mayor **abscisa**).",
      "**David**, el pequeño, tiene la menor edad y la menor estatura: su punto está más cerca del origen.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={ox} y1={oy} x2={ox + 17 * ux} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
        <line x1={ox} y1={oy} x2={ox} y2={60} stroke={MANIM.ink} strokeWidth={3} />
        <T x={ox + 17 * ux} y={oy + 34} size={22} color={MANIM.blue} anchor="end">edad (años)</T>
        <T x={ox + 8} y={52} size={22} color={MANIM.green}>estatura (cm)</T>
        <Fade show={beat >= 1}>
          {people.map((p) => {
            const c = at(p.age, p.h);
            return (
              <g key={p.n}>
                <Dot p={c} color={p.color} r={9} />
                <T x={p.n === "Cristina" ? c[0] - 14 : c[0] + 14} y={c[1] - 12} size={22} color={p.color} anchor={p.n === "Cristina" ? "end" : "start"}>{p.n}</T>
              </g>
            );
          })}
        </Fade>
        <Fade show={beat === 2}>
          <Seg a={[ox, at(16, 175)[1]]} b={at(16, 175)} color={MANIM.blue} width={2.5} dashed />
          <T x={ox + 10} y={at(16, 175)[1] - 8} size={20} color={MANIM.blue}>la mayor ordenada</T>
        </Fade>
        <Fade show={beat === 3}>
          <Seg a={[ox, at(11, 150)[1]]} b={at(14, 150)} color={MANIM.green} width={2.5} dashed />
          <T x={ox + 10} y={at(11, 150)[1] - 8} size={20} color={MANIM.green}>misma estatura</T>
          <Seg a={[at(11, 150)[0], oy]} b={at(11, 150)} color={MANIM.orange} width={2} dashed />
          <Seg a={[at(14, 150)[0], oy]} b={at(14, 150)} color={MANIM.green} width={2} dashed />
        </Fade>
        <Fade show={beat === 4}>
          <Seg a={[ox, oy]} b={at(5, 105)} color={MANIM.purple} width={2.5} dashed />
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Gráfica por tramos: distancia y tiempo ───────────── */

const TRAMOS: [number, number][] = [[0, 0], [2, 120], [4, 120], [7, 300], [9, 180]];

export function buildGraficaTramos(): AnimBuild {
  const ox = 90;
  const oy = 340;
  const ux = 40;
  const uy = 0.9;
  const pt = (i: number): Pt => [ox + TRAMOS[i]![0] * ux, oy - TRAMOS[i]![1] * uy];
  const seg = (i: number, show: boolean, color: string) => <Seg key={i} a={pt(i)} b={pt(i + 1)} color={color} width={6} show={show} />;
  return {
    label: "Gráfica de distancia en función del tiempo con un tramo que sube, uno horizontal, otro más inclinado y uno que baja, leída de izquierda a derecha",
    captions: [
      "La **variable independiente** $x$ (el tiempo) va en el eje horizontal; la **dependiente** $y$ (la distancia), en el vertical. $y$ es **función** de $x$.",
      "Se lee de **izquierda a derecha**. Primer tramo: la distancia **aumenta**; te estás moviendo.",
      "Tramo **horizontal**: pasa el tiempo pero la distancia no cambia; estás **parado**.",
      "Después sube más inclinado: te mueves **más deprisa** (más distancia en el mismo tiempo).",
      "Por último **baja**: la distancia disminuye, estás volviendo hacia el punto de partida.",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={ox} y1={oy} x2={ox + 10 * ux} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
        <line x1={ox} y1={oy} x2={ox} y2={50} stroke={MANIM.ink} strokeWidth={3} />
        <T x={ox + 10 * ux} y={oy + 34} size={22} color={MANIM.blue} anchor="end">tiempo (h)  →  x</T>
        <T x={ox + 10} y={44} size={22} color={MANIM.green}>distancia (km)  ↑  y</T>
        {seg(0, beat >= 1, MANIM.green)}
        {seg(1, beat >= 2, MANIM.yellow)}
        {seg(2, beat >= 3, MANIM.orange)}
        {seg(3, beat >= 4, MANIM.red)}
        <Fade show={beat >= 1}>
          <T x={520} y={110} size={22} color={MANIM.green}>sube: avanza</T>
        </Fade>
        <Fade show={beat >= 2}>
          <T x={520} y={146} size={22} color={MANIM.yellow}>horizontal: parado</T>
        </Fade>
        <Fade show={beat >= 3}>
          <T x={520} y={182} size={22} color={MANIM.orange}>más inclinada: más rápido</T>
        </Fade>
        <Fade show={beat >= 4}>
          <T x={520} y={218} size={22} color={MANIM.red}>baja: vuelve</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Llamadas: coste en función del tiempo ───────────── */

export function buildGraficaLlamadas(): AnimBuild {
  const ox = 100;
  const oy = 340;
  const ux = 60;
  const uy = 160;
  const pt = (m: number): Pt => [ox + m * ux, oy - (0.4 + 0.2 * m) * uy];
  return {
    label: "Coste de una llamada en función de su duración: parte de la cuota de establecimiento de 0,40 euros y suma 0,20 euros por cada minuto",
    captions: [
      "Gráfica **tiempo–coste**: el tiempo es la variable independiente ($x$) y el coste, la dependiente ($y$).",
      "Antes de interpretar hay que mirar la **escala**: aquí cada cuadrito vertical son $0{,}20$ €.",
      "Aunque el tiempo sea $0$, el coste ya es $0{,}40$ €: es la **cuota de establecimiento**, un coste fijo al descolgar.",
      "Cada minuto de conexión suma otros $0{,}20$ €: el coste aumenta de forma constante.",
      "A los $4$ minutos: $0{,}40 + 4\\cdot 0{,}20 = 1{,}20$ €.",
    ],
    render: (beat) => (
      <Canvas>
        {Array.from({ length: 8 }, (_, i) => (
          <g key={i}>
            <line x1={ox} y1={oy - i * 0.2 * uy} x2={ox + 8 * ux} y2={oy - i * 0.2 * uy} stroke={MANIM.grid} strokeWidth={1} />
            {i > 0 ? <text x={ox - 10} y={oy - i * 0.2 * uy + 5} fontSize={15} fill={MANIM.muted} textAnchor="end">{(i * 0.2).toFixed(1).replace(".", ",")}</text> : null}
          </g>
        ))}
        {Array.from({ length: 9 }, (_, i) => (
          <g key={i}>
            <line x1={ox + i * ux} y1={oy} x2={ox + i * ux} y2={oy - 7 * 0.2 * uy} stroke={MANIM.grid} strokeWidth={1} />
            {i > 0 ? <text x={ox + i * ux} y={oy + 22} fontSize={15} fill={MANIM.muted} textAnchor="middle">{i}</text> : null}
          </g>
        ))}
        <line x1={ox} y1={oy} x2={ox + 8 * ux + 10} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
        <line x1={ox} y1={oy} x2={ox} y2={oy - 7 * 0.2 * uy - 10} stroke={MANIM.ink} strokeWidth={3} />
        <T x={ox + 8 * ux} y={oy + 44} size={20} color={MANIM.blue} anchor="end">tiempo (min)</T>
        <T x={ox + 8} y={oy - 7 * 0.2 * uy - 16} size={20} color={MANIM.green}>coste (€)</T>
        <Fade show={beat >= 2}>
          <Dot p={pt(0)} color={MANIM.yellow} r={8} />
          <T x={pt(0)[0] + 16} y={pt(0)[1] + 28} size={20} color={MANIM.yellow}>cuota fija: 0,40 €</T>
        </Fade>
        <Seg a={pt(0)} b={pt(7.5)} color={MANIM.orange} width={5} show={beat >= 3} />
        <Fade show={beat >= 3}>
          {[1, 2, 3, 4].map((m) => (
            <Dot key={m} p={pt(m)} color={MANIM.orange} r={6} />
          ))}
          <T x={560} y={150} size={24} color={MANIM.orange}>+ 0,20 € por minuto</T>
        </Fade>
        <Fade show={beat === 4}>
          <Seg a={[pt(4)[0], oy]} b={pt(4)} color={MANIM.muted} width={2} dashed />
          <Seg a={[ox, pt(4)[1]]} b={pt(4)} color={MANIM.muted} width={2} dashed />
          <Dot p={pt(4)} color={MANIM.yellow} r={9} />
          <T x={pt(4)[0] + 16} y={pt(4)[1] + 34} size={22} color={MANIM.yellow}>(4 min, 1,20 €)</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Tabla de frecuencias ───────────── */

const HERMANOS = [4, 16, 9, 6, 1, 0];

export function buildTablaFrecuencias(): AnimBuild {
  const x0 = 190;
  const cw = 90;
  return {
    label: "Tabla de frecuencias del número de hermanos de 36 alumnos con las frecuencias absolutas y relativas, cuyo total es 36 y 1",
    captions: [
      "Preguntamos a los $36$ alumnos de una clase cuántos hermanos tienen: la variable es el **número de hermanos**.",
      "La **frecuencia absoluta** $f$ de cada valor es cuántas veces aparece: $f(0) = 4$, $f(1) = 16$, $f(2) = 9$…",
      "La **frecuencia relativa** es $fr = \\dfrac{f}{N}$, donde $N = 36$ es el total de datos: $fr(1) = \\dfrac{16}{36}$.",
      "Comprobación: las frecuencias absolutas suman $N = 36$ y las relativas suman $1$.",
    ],
    render: (beat) => (
      <Canvas>
        <T x={x0 - 8} y={78} size={22} color={MANIM.muted} anchor="end">hermanos</T>
        <T x={x0 - 8} y={146} size={22} color={MANIM.blue} anchor="end">f (absoluta)</T>
        <T x={x0 - 8} y={214} size={22} color={MANIM.green} anchor="end">fr = f / 36</T>
        {HERMANOS.map((f, i) => {
          const cx = x0 + 60 + i * cw;
          return (
            <g key={i}>
              <rect x={cx - 38} y={46} width={76} height={44} rx={6} fill={MANIM.panel} />
              <T x={cx} y={78} size={26} color={MANIM.ink} anchor="middle">{i}</T>
              <Fade show={beat >= 1} dy={-8} delay={i * 90}>
                <T x={cx} y={146} size={28} color={MANIM.blue} anchor="middle">{f}</T>
              </Fade>
              <Fade show={beat >= 2} dy={-8} delay={i * 90}>
                <T x={cx - 22} y={200} size={22} color={MANIM.green} anchor="start">{f}</T>
                <line x1={cx - 24} y1={208} x2={cx + 24} y2={208} stroke={MANIM.green} strokeWidth={2} />
                <T x={cx - 22} y={234} size={22} color={MANIM.green} anchor="start">36</T>
              </Fade>
            </g>
          );
        })}
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={310} size={28} color={MANIM.blue} anchor="middle">4 + 16 + 9 + 6 + 1 + 0 = 36 = N</T>
          <T x={400} y={352} size={28} color={MANIM.green} anchor="middle">las relativas suman 36/36 = 1</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Media, mediana y moda ───────────── */

const DATOS = [1, 3, 2, 0, 1, 3, 4, 2, 2];
const ORDEN = [...DATOS].sort((a, b) => a - b);

function Chips({ values, x0, y, size = 46, hl = [], color = MANIM.blue, hlColor = MANIM.yellow }: { values: number[]; x0: number; y: number; size?: number; hl?: number[]; color?: string; hlColor?: string }) {
  return (
    <g>
      {values.map((v, i) => (
        <g key={i}>
          <rect x={x0 + i * (size + 8)} y={y} width={size} height={size} rx={8} fill={hl.includes(i) ? hlColor : color} fillOpacity={hl.includes(i) ? 0.85 : 0.3} stroke={hl.includes(i) ? hlColor : color} strokeWidth={3} className="anim-t" />
          <T x={x0 + i * (size + 8) + size / 2} y={y + size / 2 + 9} size={26} color={hl.includes(i) ? MANIM.surface : MANIM.ink} anchor="middle">{v}</T>
        </g>
      ))}
    </g>
  );
}

export function buildMediaMedianaModa(): AnimBuild {
  const modaIdx = ORDEN.map((v, i) => (v === 2 ? i : -1)).filter((i) => i >= 0);
  return {
    label: "Media, mediana y moda del número de hermanos de nueve amigos: 1, 3, 2, 0, 1, 3, 4, 2, 2",
    captions: [
      "Número de hermanos de $9$ amigos: $1, 3, 2, 0, 1, 3, 4, 2, 2$. Vamos a resumirlos con **tres parámetros**.",
      "La **media**: la suma de todos los valores entre cuántos hay. $18 : 9 = 2$.",
      "La **mediana**: se ordenan los datos y se toma el valor **central**. Con $9$ datos es el quinto: $2$.",
      "Si el número de datos es **par**, la mediana es el promedio de los **dos centrales**.",
      "La **moda**: el dato con mayor **frecuencia**. El $2$ aparece tres veces.",
    ],
    render: (beat) => (
      <Canvas>
        <Chips values={beat >= 2 ? ORDEN : DATOS} x0={80} y={80} hl={beat === 2 ? [4] : beat === 4 ? modaIdx : []} />
        <Fade show={beat === 0}>
          <T x={400} y={210} size={30} color={MANIM.ink} anchor="middle">9 datos</T>
        </Fade>
        <Fade show={beat === 1} dy={6}>
          <T x={400} y={190} size={28} color={MANIM.ink} anchor="middle">1+3+2+0+1+3+4+2+2 = 18</T>
          <T x={400} y={240} size={34} color={MANIM.yellow} anchor="middle">media = 18 : 9 = 2</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={400} y={190} size={28} color={MANIM.ink} anchor="middle">datos ordenados: 4 a cada lado</T>
          <T x={400} y={240} size={34} color={MANIM.yellow} anchor="middle">mediana = 2</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={190} size={26} color={MANIM.ink} anchor="middle">con 8 datos y centrales 8 y 9: (8 + 9) : 2</T>
          <T x={400} y={240} size={34} color={MANIM.yellow} anchor="middle">mediana = 8,5</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={400} y={190} size={28} color={MANIM.ink} anchor="middle">el 2 aparece 3 veces</T>
          <T x={400} y={240} size={34} color={MANIM.yellow} anchor="middle">moda = 2</T>
        </Fade>
      </Canvas>
    ),
  };
}

export function buildMedianaPar(): AnimBuild {
  const d = [4, 6, 8, 8, 9, 10, 10, 10];
  const sum = d.reduce((a, b) => a + b, 0);
  return {
    label: "Media, mediana y moda de ocho datos ordenados, 4, 6, 8, 8, 9, 10, 10, 10: media 8,125, mediana 8,5 y moda 10",
    captions: [
      "Ocho datos ya ordenados: $4, 6, 8, 8, 9, 10, 10, 10$.",
      "Media: la suma es $65$ y se divide entre $8$: $\\dfrac{65}{8} = 8{,}125$.",
      "Mediana: con número **par** de datos hay **dos centrales**, el cuarto y el quinto ($8$ y $9$). Su promedio es $8{,}5$.",
      "Moda: el $10$ aparece tres veces, más que ningún otro. Los tres parámetros cuentan cosas distintas de los mismos datos.",
    ],
    render: (beat) => (
      <Canvas>
        <Chips values={d} x0={110} y={80} hl={beat === 2 ? [3, 4] : beat === 3 ? [5, 6, 7] : []} />
        <Fade show={beat === 1} dy={6}>
          <T x={400} y={200} size={28} color={MANIM.ink} anchor="middle">{`suma = ${sum}`}</T>
          <T x={400} y={250} size={34} color={MANIM.yellow} anchor="middle">media = 65 : 8 = 8,125</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={400} y={200} size={28} color={MANIM.ink} anchor="middle">centrales: 8 y 9</T>
          <T x={400} y={250} size={34} color={MANIM.yellow} anchor="middle">mediana = (8 + 9) : 2 = 8,5</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={200} size={28} color={MANIM.ink} anchor="middle">el 10 se repite 3 veces</T>
          <T x={400} y={250} size={34} color={MANIM.yellow} anchor="middle">moda = 10</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Gráficos: barras e histograma ───────────── */

const ESTAT = [3, 6, 11, 8, 2];

export function buildGraficoBarrasHistograma(): AnimBuild {
  const ox = 100;
  const oy = 330;
  const w = 90;
  const uy = 16;
  const hermanos = [4, 16, 9, 6, 1];
  return {
    label: "Diagrama de barras del número de hermanos, con barras separadas, y un histograma de estaturas agrupadas en intervalos, con rectángulos pegados",
    captions: [
      "En un **diagrama de barras** hay una barra fina por valor o categoría, **separadas** entre sí. Aquí, número de hermanos de $36$ alumnos.",
      "La **altura** de cada barra es la **frecuencia absoluta**: hay $16$ alumnos con un hermano.",
      "Cuando hay **muchos valores** numéricos, se agrupan en **intervalos**: estaturas de $155$–$160$, $160$–$165$…",
      "En el **histograma** los rectángulos van **pegados**, porque los intervalos son continuos.",
      "Si unimos los **puntos medios** de las barras se obtiene el **polígono de frecuencias**.",
    ],
    render: (beat) => {
      const inter = beat >= 2;
      const vals = inter ? ESTAT : hermanos;
      const bw = inter ? w : 56;
      const gap = inter ? 0 : 36;
      return (
        <Canvas>
          <line x1={ox} y1={oy} x2={ox + 5 * w + 40} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={ox} y1={oy} x2={ox} y2={60} stroke={MANIM.ink} strokeWidth={3} />
          {vals.map((v, i) => {
            const x = ox + 20 + i * (bw + gap);
            return (
              <g key={i}>
                <rect x={x} y={oy - v * uy} width={bw} height={v * uy} fill={inter ? MANIM.green : MANIM.blue} fillOpacity={0.45} stroke={inter ? MANIM.green : MANIM.blue} strokeWidth={3} className="anim-t" />
                <T x={x + bw / 2} y={oy - v * uy - 10} size={20} color={MANIM.ink} anchor="middle">{v}</T>
                <T x={x + bw / 2} y={oy + 26} size={18} color={MANIM.muted} anchor="middle">{inter ? `${155 + 5 * i}–${160 + 5 * i}` : i}</T>
              </g>
            );
          })}
          <Fade show={beat === 4}>
            <polyline
              points={[[ox + 20, oy], ...vals.map((v, i) => [ox + 20 + i * w + w / 2, oy - v * uy] as Pt), [ox + 20 + 5 * w, oy]].map((p) => p.join(",")).join(" ")}
              fill="none"
              stroke={MANIM.yellow}
              strokeWidth={4}
              strokeLinejoin="round"
            />
          </Fade>
          <T x={ox + 5 * w + 40} y={oy + 56} size={20} color={MANIM.blue} anchor="end">{inter ? "estatura (cm)" : "nº de hermanos"}</T>
          <T x={ox - 8} y={48} size={18} color={MANIM.green} anchor="end">frecuencia</T>
          <Fade show={beat === 1}>
            <Seg a={[ox, oy - 16 * uy]} b={[ox + 20 + 1 * (bw + gap) + bw, oy - 16 * uy]} color={MANIM.yellow} width={2} dashed />
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Diagrama de sectores ───────────── */

export const SECTORES = [
  { name: "Fútbol", f: 20, color: MANIM.blue },
  { name: "Baloncesto", f: 10, color: MANIM.orange },
  { name: "Tenis", f: 6, color: MANIM.green },
  { name: "Otros", f: 4, color: MANIM.purple },
];

export function PieSlices({ data, c, r, show = true }: { data: { f: number; color: string; name?: string }[]; c: Pt; r: number; show?: boolean }) {
  const total = data.reduce((a, d) => a + d.f, 0) || 1;
  const starts = data.reduce<number[]>((acc, d, i) => [...acc, i === 0 ? 90 : acc[i - 1]! - (data[i - 1]!.f / total) * 360], []);
  return (
    <g className="anim-t" style={{ opacity: show ? 1 : 0 }}>
      {data.map((d, i) => {
        const ang = (d.f / total) * 360;
        const a0 = starts[i]!;
        const a1 = a0 - ang;
        if (d.f === 0) {
          return null;
        }
        if (ang >= 359.99) {
          return <circle key={i} cx={c[0]} cy={c[1]} r={r} fill={d.color} fillOpacity={0.4} stroke={d.color} strokeWidth={3} />;
        }
        const p0 = polar(c, r, a0);
        const p1 = polar(c, r, a1);
        const large = ang > 180 ? 1 : 0;
        return <path key={i} d={`M ${c[0]} ${c[1]} L ${p0[0]} ${p0[1]} A ${r} ${r} 0 ${large} 1 ${p1[0]} ${p1[1]}  Z`} fill={d.color} fillOpacity={0.4} stroke={d.color} strokeWidth={3} strokeLinejoin="round" />;
      })}
    </g>
  );
}

export function buildDiagramaSectores(): AnimBuild {
  const c: Pt = [210, 215];
  const r = 140;
  const deg = (f: number) => f * 9;
  return {
    label: "Diagrama de sectores con 40 entrevistados y deporte preferido: a cada persona le corresponden 9 grados y los sectores suman 360 grados",
    captions: [
      "Un **diagrama de sectores** reparte un círculo entre los valores: cada **sector** es una categoría. Aquí, el deporte preferido de $40$ personas.",
      "Los $360^\\circ$ del círculo se reparten entre las $40$ personas: a cada una le corresponden $360 : 40 = 9^\\circ$.",
      "El ángulo de cada sector es la frecuencia por $9^\\circ$: fútbol, $20\\cdot 9^\\circ = 180^\\circ$ (la mitad).",
      "Baloncesto: $10\\cdot 9^\\circ = 90^\\circ$. Tenis: $6\\cdot 9^\\circ = 54^\\circ$. Otros: $4\\cdot 9^\\circ = 36^\\circ$.",
      "Todos los sectores juntos suman $180^\\circ + 90^\\circ + 54^\\circ + 36^\\circ = 360^\\circ$.",
    ],
    render: (beat) => (
      <Canvas>
        <PieSlices data={SECTORES} c={c} r={r} />
        {SECTORES.map((s, i) => (
          <Fade key={s.name} show={beat >= 0} dx={10} delay={i * 80}>
            <rect x={440} y={90 + i * 52} width={22} height={22} rx={4} fill={s.color} fillOpacity={0.6} />
            <T x={472} y={109 + i * 52} size={24} color={MANIM.ink}>{s.name}</T>
            <Fade show={beat >= 2 && (beat === 2 ? i === 0 : true)}>
              <T x={760} y={109 + i * 52} size={24} color={s.color} anchor="end">{`${s.f} → ${deg(s.f)}°`}</T>
            </Fade>
          </Fade>
        ))}
        <Fade show={beat === 1} dy={6}>
          <T x={440} y={330} size={26} color={MANIM.yellow}>360° : 40 = 9° por persona</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={440} y={330} size={24} color={MANIM.yellow}>180 + 90 + 54 + 36 = 360°</T>
        </Fade>
      </Canvas>
    ),
  };
}

export { Chips };
