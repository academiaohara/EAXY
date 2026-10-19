import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const T = ({ x, y, size = 26, color = MANIM.ink, anchor = "start", children }: { x: number; y: number; size?: number; color?: string; anchor?: "start" | "middle" | "end"; children: ReactNode }) => (
  <Txt x={x} y={y} size={size} color={color} anchor={anchor}>{children}</Txt>
);

/** Ficha con un valor (cara de dado, resultado…), resaltable. */
export function Chip({ x, y, size = 56, label, tone = "idle", dim = false }: { x: number; y: number; size?: number; label: string; tone?: "idle" | "hit" | "alt" | "both"; dim?: boolean }) {
  const color = tone === "hit" ? MANIM.yellow : tone === "alt" ? MANIM.green : tone === "both" ? MANIM.orange : MANIM.blue;
  const on = tone !== "idle";
  return (
    <g className="anim-t" style={{ opacity: dim ? 0.35 : 1 }}>
      <rect x={x} y={y} width={size} height={size} rx={10} fill={color} fillOpacity={on ? 0.85 : 0.22} stroke={color} strokeWidth={3} className="anim-t" />
      <Txt x={x + size / 2} y={y + size / 2 + size * 0.17} size={size * 0.5} color={on ? MANIM.surface : MANIM.ink} anchor="middle">{label}</Txt>
    </g>
  );
}

const FACES = ["1", "2", "3", "4", "5", "6"];
const rowX = (i: number, n: number, size = 56, gap = 14) => 400 - (n * size + (n - 1) * gap) / 2 + i * (size + gap);

/* ───────────── Determinista frente a aleatorio ───────────── */

export function buildExpDeterministaAleatorio(): AnimBuild {
  const rolls = ["4", "1", "6"];
  return {
    label: "Un experimento determinista, calentar agua a 100 grados, da siempre el mismo resultado; uno aleatorio, lanzar un dado, da resultados distintos al repetirlo",
    captions: [
      "Comparamos dos experimentos repetidos **en las mismas condiciones**.",
      "**Determinista:** calentar agua a $100\\,°\\text{C}$. Una vez conocidas las condiciones, sabemos qué pasará: **siempre** hierve.",
      "**Aleatorio:** lanzar un dado. Aunque lo repitamos igual, el resultado **cambia** y no se puede predecir.",
      "Determinista: «es seguro que…». Aleatorio: «es más probable», «es poco probable», «es imposible»…",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={400} y1={50} x2={400} y2={380} stroke={MANIM.grid} strokeWidth={2} />
        <T x={200} y={60} size={28} color={MANIM.green} anchor="middle">Determinista</T>
        <T x={600} y={60} size={28} color={MANIM.orange} anchor="middle">Aleatorio</T>
        <T x={200} y={96} size={20} color={MANIM.muted} anchor="middle">agua a 100 °C</T>
        <T x={600} y={96} size={20} color={MANIM.muted} anchor="middle">lanzar un dado</T>
        {[0, 1, 2].map((i) => (
          <g key={i}>
            <Fade show={beat >= 1} dx={-10} delay={i * 220}>
              <rect x={100} y={130 + i * 70} width={200} height={50} rx={10} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} />
              <T x={200} y={163 + i * 70} size={24} color={MANIM.ink} anchor="middle">hierve</T>
            </Fade>
            <Fade show={beat >= 2} dx={10} delay={i * 220}>
              <rect x={540} y={130 + i * 70} width={120} height={50} rx={10} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={3} />
              <T x={600} y={165 + i * 70} size={28} color={MANIM.ink} anchor="middle">{rolls[i]!}</T>
            </Fade>
          </g>
        ))}
        <Fade show={beat >= 1 && beat !== 3}>
          <T x={200} y={365} size={24} color={MANIM.green} anchor="middle">siempre lo mismo</T>
        </Fade>
        <Fade show={beat >= 2 && beat !== 3}>
          <T x={600} y={365} size={24} color={MANIM.orange} anchor="middle">cambia: no se predice</T>
        </Fade>
        <Fade show={beat === 3}>
          <T x={200} y={365} size={24} color={MANIM.green} anchor="middle">«es seguro que…»</T>
          <T x={600} y={365} size={24} color={MANIM.orange} anchor="middle">«es más / menos probable»</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Espacio muestral ───────────── */

export function buildEspacioMuestral(): AnimBuild {
  const sums = Array.from({ length: 11 }, (_, i) => String(i + 2));
  return {
    label: "Espacio muestral de una moneda, de un dado y de la suma de dos dados, con sus sucesos elementales",
    captions: [
      "El **espacio muestral** $E$ es el conjunto de **todos los resultados posibles** de un experimento aleatorio. Moneda: $E = \\{c, x\\}$.",
      "Cada resultado posible es un **suceso elemental**: cara ($c$) y cruz ($x$). Son $2$.",
      "Dado de seis caras: $E = \\{1, 2, 3, 4, 5, 6\\}$. Hay $6$ sucesos elementales.",
      "Un dado de ocho caras: $E = \\{1, \\dots, 8\\}$, con $8$ resultados.",
      "Si lanzamos dos dados y **sumamos**, los resultados posibles son $2, 3, \\dots, 12$: hay $11$ sumas distintas (aunque no igual de probables).",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 1}>
          <T x={400} y={90} size={28} color={MANIM.muted} anchor="middle">lanzar una moneda</T>
          <Chip x={rowX(0, 2, 90, 40)} y={150} size={90} label="c" tone={beat === 1 ? "hit" : "idle"} />
          <Chip x={rowX(1, 2, 90, 40)} y={150} size={90} label="x" tone={beat === 1 ? "alt" : "idle"} />
          <T x={400} y={300} size={34} color={MANIM.ink} anchor="middle">E = {"{ c, x }"}</T>
        </Fade>
        <Fade show={beat === 2}>
          <T x={400} y={90} size={28} color={MANIM.muted} anchor="middle">lanzar un dado</T>
          {FACES.map((f, i) => (
            <Chip key={f} x={rowX(i, 6)} y={150} label={f} />
          ))}
          <T x={400} y={300} size={34} color={MANIM.ink} anchor="middle">E = {"{ 1, 2, 3, 4, 5, 6 }"}</T>
        </Fade>
        <Fade show={beat === 3}>
          <T x={400} y={90} size={28} color={MANIM.muted} anchor="middle">dado de ocho caras</T>
          {Array.from({ length: 8 }, (_, i) => (
            <Chip key={i} x={rowX(i, 8, 52, 12)} y={150} size={52} label={String(i + 1)} />
          ))}
          <T x={400} y={300} size={34} color={MANIM.ink} anchor="middle">E = {"{ 1, …, 8 }"}: 8 resultados</T>
        </Fade>
        <Fade show={beat === 4}>
          <T x={400} y={90} size={28} color={MANIM.muted} anchor="middle">dos dados: suma de los puntos</T>
          {sums.map((v, i) => (
            <Chip key={v} x={rowX(i, 11, 50, 10)} y={150} size={50} label={v} />
          ))}
          <T x={400} y={300} size={34} color={MANIM.ink} anchor="middle">11 resultados: 2, 3, …, 12</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Sucesos: elemental, compuesto, seguro e imposible ───────────── */

export function buildSucesosConjuntos(): AnimBuild {
  const tone = (beat: number, f: number): "idle" | "hit" => {
    if (beat === 1) {
      return f % 2 === 0 ? "hit" : "idle";
    }
    if (beat === 2) {
      return f === 5 ? "hit" : "idle";
    }
    if (beat === 3) {
      return "hit";
    }
    return "idle";
  };
  return {
    label: "Sucesos de un dado: salir par, salir 5 como suceso elemental, el suceso seguro de salir menos de 7 y el suceso imposible de salir 30",
    captions: [
      "Al lanzar un dado, $E = \\{1, 2, 3, 4, 5, 6\\}$. Un **suceso** está formado por uno o varios sucesos elementales.",
      "«Salir número **par**» es el suceso $\\{2, 4, 6\\}$: tres sucesos elementales.",
      "«Salir un $5$» es el suceso $\\{5\\}$: un único suceso elemental.",
      "«Salir un número **menor que $7$**» contiene **todos** los elementales: es el **suceso seguro**. Siempre ocurre.",
      "«Salir el $30$» no contiene **ninguno**: es el **suceso imposible**, $\\varnothing$. Nunca ocurre.",
    ],
    render: (beat) => (
      <Canvas>
        {FACES.map((f, i) => (
          <Chip key={f} x={rowX(i, 6)} y={110} label={f} tone={tone(beat, Number(f))} />
        ))}
        <T x={400} y={60} size={26} color={MANIM.muted} anchor="middle">E = {"{ 1, 2, 3, 4, 5, 6 }"}</T>
        <Fade show={beat === 1} dy={6}>
          <T x={400} y={230} size={32} color={MANIM.yellow} anchor="middle">par = {"{ 2, 4, 6 }"}</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={400} y={230} size={32} color={MANIM.yellow} anchor="middle">«sale un 5» = {"{ 5 }"}</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={230} size={32} color={MANIM.yellow} anchor="middle">«menor que 7» = E</T>
          <T x={400} y={280} size={28} color={MANIM.green} anchor="middle">suceso SEGURO</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={400} y={230} size={32} color={MANIM.yellow} anchor="middle">«sale 30» = ∅</T>
          <T x={400} y={280} size={28} color={MANIM.red} anchor="middle">suceso IMPOSIBLE</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Frecuencias de 50 lanzamientos ───────────── */

const F_DADO = [7, 6, 14, 9, 10, 4];

export function buildFrecuenciasDado(): AnimBuild {
  const ox = 100;
  const oy = 300;
  const w = 90;
  const uy = 12;
  return {
    label: "Frecuencias absolutas y relativas de 50 lanzamientos de un dado: la cara 3 sale 14 veces, su frecuencia relativa es 0,28 y todas suman 1",
    captions: [
      "Roberto lanza un dado **50 veces** y apunta cuántas veces sale cada cara: la **frecuencia absoluta** $f_i$.",
      "Las frecuencias absolutas suman el número de lanzamientos: $7 + 6 + 14 + 9 + 10 + 4 = 50 = n$.",
      "La **frecuencia relativa** es $h_i = \\dfrac{f_i}{n}$. Para el $3$: $h_3 = \\dfrac{14}{50} = 0{,}28$.",
      "Las frecuencias relativas de todas las caras suman $1$ (o $100\\,\\%$).",
    ],
    render: (beat) => (
      <Canvas>
        <line x1={ox} y1={oy} x2={ox + 6 * w + 10} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
        {F_DADO.map((f, i) => {
          const x = ox + 14 + i * w;
          const hl = beat === 2 && i === 2;
          return (
            <g key={i}>
              <rect x={x} y={oy - f * uy} width={w - 28} height={f * uy} fill={hl ? MANIM.yellow : MANIM.blue} fillOpacity={hl ? 0.7 : 0.4} stroke={hl ? MANIM.yellow : MANIM.blue} strokeWidth={3} className="anim-t" />
              <T x={x + (w - 28) / 2} y={oy - f * uy - 10} size={22} color={MANIM.ink} anchor="middle">{f}</T>
              <T x={x + (w - 28) / 2} y={oy + 28} size={24} color={MANIM.muted} anchor="middle">{i + 1}</T>
              <Fade show={beat >= 3}>
                <T x={x + (w - 28) / 2} y={oy + 62} size={20} color={MANIM.green} anchor="middle">{(f / 50).toFixed(2).replace(".", ",")}</T>
              </Fade>
            </g>
          );
        })}
        <T x={ox - 14} y={oy + 28} size={20} color={MANIM.muted} anchor="end">cara</T>
        <Fade show={beat >= 3}>
          <T x={ox - 14} y={oy + 62} size={20} color={MANIM.green} anchor="end">h</T>
        </Fade>
        <Fade show={beat === 1} dy={6}>
          <T x={400} y={70} size={30} color={MANIM.blue} anchor="middle">7 + 6 + 14 + 9 + 10 + 4 = 50</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={400} y={70} size={32} color={MANIM.yellow} anchor="middle">h₃ = 14 / 50 = 0,28</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={70} size={28} color={MANIM.green} anchor="middle">0,14 + 0,12 + 0,28 + 0,18 + 0,20 + 0,08 = 1</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Las frecuencias se estabilizan ───────────── */

function mulberry(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Frecuencia relativa de «cara» tras cada número de lanzamientos de una secuencia fija. */
export const MONEDA_SERIE: { n: number; h: number }[] = (() => {
  const rnd = mulberry(20260615);
  const marks = [5, 10, 20, 40, 70, 100, 200, 400, 700, 1000, 2000];
  const out: { n: number; h: number }[] = [];
  let caras = 0;
  let k = 0;
  for (let n = 1; n <= 2000; n += 1) {
    if (rnd() < 0.5) {
      caras += 1;
    }
    if (n === marks[k]) {
      out.push({ n, h: caras / n });
      k += 1;
    }
  }
  return out;
})();

export function buildGrandesNumeros(): AnimBuild {
  const ox = 90;
  const oy = 330;
  const W = 600;
  const Hh = 240;
  const x = (n: number) => ox + (Math.log10(n) / Math.log10(2000)) * W;
  const y = (h: number) => oy - h * Hh;
  const upTo = (m: number) => MONEDA_SERIE.filter((p) => p.n <= m);
  const shown = (beat: number) => upTo(beat === 0 ? 0 : beat === 1 ? 20 : beat === 2 ? 200 : 2000);
  return {
    label: "Frecuencia relativa de cara al lanzar una moneda muchas veces: oscila mucho con pocos lanzamientos y se acerca a 0,5 cuando hay muchos",
    captions: [
      "Lanzamos una moneda y calculamos la **frecuencia relativa de cara** $h = \\dfrac{\\text{caras}}{n}$ después de cada tanda de lanzamientos.",
      "Con **pocos** lanzamientos ($n \\le 20$) la frecuencia relativa oscila mucho.",
      "Con unos cientos de lanzamientos las oscilaciones se calman.",
      "Con muchos lanzamientos, $h$ se **estabiliza** cerca de $0{,}5$. Ese valor al que se acerca es la **probabilidad** de cara.",
    ],
    render: (beat) => {
      const pts = shown(beat);
      return (
        <Canvas>
          <line x1={ox} y1={oy} x2={ox + W + 10} y2={oy} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={ox} y1={oy} x2={ox} y2={oy - Hh - 20} stroke={MANIM.ink} strokeWidth={3} />
          <line x1={ox} y1={y(0.5)} x2={ox + W} y2={y(0.5)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="9 7" />
          <T x={ox - 12} y={y(0.5) + 6} size={20} color={MANIM.yellow} anchor="end">0,5</T>
          <T x={ox - 12} y={y(1) + 6} size={18} color={MANIM.muted} anchor="end">1</T>
          <T x={ox - 12} y={y(0) + 6} size={18} color={MANIM.muted} anchor="end">0</T>
          {[10, 100, 1000].map((n) => (
            <T key={n} x={x(n)} y={oy + 26} size={18} color={MANIM.muted} anchor="middle">{String(n)}</T>
          ))}
          <T x={ox + W} y={oy + 54} size={20} color={MANIM.blue} anchor="end">número de lanzamientos n</T>
          <T x={ox + 8} y={oy - Hh - 26} size={20} color={MANIM.green}>h (cara)</T>
          {pts.length > 1 ? <polyline points={pts.map((p) => `${x(p.n)},${y(p.h)}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} strokeLinejoin="round" /> : null}
          {pts.map((p) => (
            <circle key={p.n} cx={x(p.n)} cy={y(p.h)} r={6} fill={MANIM.blue} stroke={MANIM.surface} strokeWidth={2} />
          ))}
          <Fade show={beat === 3} dy={6}>
            <T x={ox + W - 10} y={120} size={26} color={MANIM.yellow} anchor="end">P(cara) = 0,5</T>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Regla de Laplace con un dado ───────────── */

const percent = (num: number, den: number) => `${((num / den) * 100).toFixed(1).replace(".", ",")} %`;

export function buildLaplaceDado(): AnimBuild {
  const cases: { title: string; fav: number[]; frac: string; result: string }[] = [
    { title: "salir par", fav: [2, 4, 6], frac: "3 / 6", result: "1/2 = 50 %" },
    { title: "salir un 2", fav: [2], frac: "1 / 6", result: `≈ ${percent(1, 6)}` },
    { title: "salir mayor que 4", fav: [5, 6], frac: "2 / 6", result: "1/3" },
  ];
  return {
    label: "Regla de Laplace con un dado: la probabilidad es el número de casos favorables dividido entre los casos posibles, para salir par, salir un 2 y salir mayor que 4",
    captions: [
      "Si todos los sucesos elementales son **equiprobables**, la **regla de Laplace** da $P(A) = \\dfrac{\\text{casos favorables}}{\\text{casos posibles}}$.",
      "Salir **par**: $3$ casos favorables ($2, 4, 6$) de $6$ posibles. $P = \\dfrac{3}{6} = 50\\,\\%$.",
      "Salir un **2**: $1$ favorable de $6$. $P = \\dfrac{1}{6} \\approx 16{,}7\\,\\%$.",
      "Salir **mayor que 4**: $\\{5, 6\\}$, $2$ favorables de $6$. $P = \\dfrac{2}{6} = \\dfrac{1}{3}$. Recuerda: $0 \\le P \\le 1$.",
    ],
    render: (beat) => {
      const c = cases[beat - 1];
      return (
        <Canvas>
          {FACES.map((f, i) => (
            <Chip key={f} x={rowX(i, 6)} y={110} label={f} tone={c?.fav.includes(Number(f)) ? "hit" : "idle"} />
          ))}
          <T x={400} y={66} size={24} color={MANIM.muted} anchor="middle">casos posibles: 6 (E = {"{ 1, …, 6 }"})</T>
          <Fade show={beat === 0} dy={6}>
            <T x={400} y={250} size={36} color={MANIM.yellow} anchor="middle">P(A) = favorables / posibles</T>
            <T x={400} y={300} size={24} color={MANIM.ink} anchor="middle">solo si todos los resultados son equiprobables</T>
          </Fade>
          {c ? (
            <Fade show dy={6}>
              <T x={400} y={230} size={28} color={MANIM.ink} anchor="middle">{c.title}</T>
              <T x={400} y={284} size={36} color={MANIM.yellow} anchor="middle">{`P = ${c.frac}  =  ${c.result}`}</T>
            </Fade>
          ) : null}
        </Canvas>
      );
    },
  };
}

/* ───────────── Unión e intersección ───────────── */

export function buildSucesoUnionInterseccion(): AnimBuild {
  const A = [2, 4, 6];
  const B = [3, 6];
  const tone = (beat: number, f: number): "idle" | "hit" | "alt" | "both" => {
    const a = A.includes(f);
    const b = B.includes(f);
    if (beat === 0) {
      return a ? "hit" : "idle";
    }
    if (beat === 1) {
      return a && b ? "both" : a ? "hit" : b ? "alt" : "idle";
    }
    if (beat === 2) {
      return a || b ? "both" : "idle";
    }
    return a && b ? "both" : "idle";
  };
  const labels = ["A = par = {2, 4, 6}", "B = múltiplo de 3 = {3, 6}", "A o B = {2, 3, 4, 6}", "A y B = {6}"];
  const probs = ["P(A) = 3/6", "P(B) = 2/6", "P(A o B) = 4/6 = 2/3", "P(A y B) = 1/6"];
  return {
    label: "Unión e intersección de los sucesos par y múltiplo de 3 al lanzar un dado: A o B son los números 2, 3, 4 y 6, y A y B es solo el 6",
    captions: [
      "Sea $A$ = «salir par» $= \\{2, 4, 6\\}$.",
      "Y $B$ = «salir múltiplo de $3$» $= \\{3, 6\\}$. El $6$ está en los dos.",
      "**«A o B»** (unión): basta cumplir **una** condición. $\\{2, 3, 4, 6\\}$: $4$ casos de $6$, $P = \\dfrac{4}{6} = \\dfrac{2}{3}$. El $6$ se cuenta **una sola vez**.",
      "**«A y B»** (intersección): deben cumplirse **las dos a la vez**. Solo el $6$: $P = \\dfrac{1}{6}$.",
    ],
    render: (beat) => (
      <Canvas>
        {FACES.map((f, i) => (
          <Chip key={f} x={rowX(i, 6)} y={110} label={f} tone={tone(beat, Number(f))} />
        ))}
        <T x={400} y={66} size={24} color={MANIM.muted} anchor="middle">E = {"{ 1, 2, 3, 4, 5, 6 }"}</T>
        <T x={400} y={230} size={28} color={MANIM.ink} anchor="middle">{labels[beat]!}</T>
        <T x={400} y={284} size={34} color={MANIM.yellow} anchor="middle">{probs[beat]!}</T>
      </Canvas>
    ),
  };
}
