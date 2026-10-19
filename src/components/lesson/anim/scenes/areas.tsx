import type { ReactNode } from "react";
import { Canvas, Fade, Move, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, RightMark, Seg, angleOf, footOn, polar, type Pt } from "@/components/lesson/anim/geometry";
import { regularPoints } from "@/components/lesson/anim/scenes/poligono-regular";
import type { AnimBuild } from "@/components/lesson/anim/types";

const poly = (p: readonly Pt[]) => p.map((q) => q.join(",")).join(" ");
const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];

function Shape({ pts, color, fill = 0.16, width = 4, show = true, dashed = false }: { pts: readonly Pt[]; color: string; fill?: number; width?: number; show?: boolean; dashed?: boolean }) {
  return (
    <polygon
      points={poly(pts)}
      fill={color}
      fillOpacity={fill}
      stroke={color}
      strokeWidth={width}
      strokeLinejoin="round"
      strokeDasharray={dashed ? "9 7" : undefined}
      className="anim-t"
      style={{ opacity: show ? 1 : 0 }}
    />
  );
}

/** Cuadrícula de `cols × rows` cuadrados de lado `u` con esquina superior izquierda en `o`. */
function Cells({ o, cols, rows, u, show, color = MANIM.blue, stagger = false }: { o: Pt; cols: number; rows: number; u: number; show: boolean; color?: string; stagger?: boolean }) {
  return (
    <g>
      {Array.from({ length: rows * cols }, (_, k) => {
        const r = Math.floor(k / cols);
        const c = k % cols;
        return (
          <rect
            key={k}
            x={o[0] + c * u + 1}
            y={o[1] + r * u + 1}
            width={u - 2}
            height={u - 2}
            rx={3}
            fill={color}
            fillOpacity={show ? 0.45 : 0}
            className="anim-t"
            style={{ transitionDelay: show && stagger ? `${r * 70}ms` : "0ms" }}
          />
        );
      })}
    </g>
  );
}

const T = ({ x, y, size = 28, color = MANIM.ink, anchor = "start", children }: { x: number; y: number; size?: number; color?: string; anchor?: "start" | "middle" | "end"; children: ReactNode }) => (
  <Txt x={x} y={y} size={size} color={color} anchor={anchor}>{children}</Txt>
);

/* ───────────── Área y perímetro ───────────── */

export function buildAreaPerimetro(): AnimBuild {
  const U = 44;
  const R0: Pt = [50, 130];
  const S0: Pt = [380, 130];
  return {
    label: "Un rectángulo de 5 por 1 y un cuadrado de 3 por 3 tienen el mismo perímetro, 12, pero áreas distintas, 5 y 9 cuadrados",
    captions: [
      "El **perímetro** es la longitud del contorno; el **área** es la superficie que ocupa. Comparemos dos figuras.",
      "Las dos tienen el mismo perímetro: $2\\cdot(5+1) = 12$ y $4\\cdot 3 = 12$.",
      "Pero su área, contando cuadrados de $1$, no es la misma: $5$ frente a $9$.",
      "**No hay relación fija** entre perímetro y área: con la misma valla se puede cercar más o menos superficie.",
    ],
    render: (beat) => (
      <Canvas>
        <Cells o={R0} cols={5} rows={1} u={U} show={beat >= 2} />
        <Cells o={S0} cols={3} rows={3} u={U} show={beat >= 2} color={MANIM.green} stagger />
        <Shape pts={[R0, [R0[0] + 5 * U, R0[1]], [R0[0] + 5 * U, R0[1] + U], [R0[0], R0[1] + U]]} color={beat === 1 ? MANIM.yellow : MANIM.ink} fill={0.05} width={beat === 1 ? 6 : 4} />
        <Shape pts={[S0, [S0[0] + 3 * U, S0[1]], [S0[0] + 3 * U, S0[1] + 3 * U], [S0[0], S0[1] + 3 * U]]} color={beat === 1 ? MANIM.yellow : MANIM.ink} fill={0.05} width={beat === 1 ? 6 : 4} />
        <T x={R0[0] + 110} y={R0[1] + 110} size={26} color={MANIM.muted} anchor="middle">rectángulo 5 × 1</T>
        <T x={S0[0] + 66} y={S0[1] + 200} size={26} color={MANIM.muted} anchor="middle">cuadrado 3 × 3</T>
        <Fade show={beat === 1} dy={6}>
          <T x={R0[0] + 110} y={R0[1] + 150} size={30} color={MANIM.yellow} anchor="middle">P = 12</T>
          <T x={S0[0] + 66} y={S0[1] + 240} size={30} color={MANIM.yellow} anchor="middle">P = 12</T>
        </Fade>
        <Fade show={beat >= 2} dy={6}>
          <T x={R0[0] + 110} y={R0[1] + 150} size={30} color={MANIM.blue} anchor="middle">A = 5</T>
          <T x={S0[0] + 66} y={S0[1] + 240} size={30} color={MANIM.green} anchor="middle">A = 9</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={72} size={30} color={MANIM.ink} anchor="middle">mismo perímetro ≠ misma área</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Rectángulo y cuadrado ───────────── */

export function buildAreaRectangulo(p: { a?: number; b?: number } = {}): AnimBuild {
  const a = Math.round(Math.min(Math.max(p.a ?? 6, 2), 8));
  const b = Math.round(Math.min(Math.max(p.b ?? 4, 1), 6));
  const U = Math.min(46, Math.floor(380 / a), Math.floor(230 / b));
  const o: Pt = [100, 100];
  const rect: Pt[] = [o, [o[0] + a * U, o[1]], [o[0] + a * U, o[1] + b * U], [o[0], o[1] + b * U]];
  const l = b === a ? b + 1 : b;
  return {
    label: `Rectángulo de ${a} por ${b}: el área es base por altura, contando filas y columnas de cuadrados, y el cuadrado es el caso en que los lados coinciden`,
    captions: [
      `Un rectángulo de base $a = ${a}$ y altura $b = ${b}$. Su perímetro es la suma de sus cuatro lados.`,
      `El área es el número de cuadrados de $1$ que caben: $${a}$ columnas por $${b}$ filas.`,
      `Así, $A = a\\cdot b = ${a}\\cdot ${b} = ${a * b}$ y $P = 2a + 2b = ${2 * a + 2 * b}$.`,
      `Un **cuadrado** es un rectángulo con base y altura iguales: $A = l^2$ y $P = 4l$. Con $l = ${l}$: $A = ${l * l}$, $P = ${4 * l}$.`,
      "Si conoces el área y buscas el lado, deshaces el cuadrado con la raíz: si $A = 81$, entonces $l = \\sqrt{81} = 9$.",
    ],
    render: (beat) => {
      const sq = Math.min(46, Math.floor(230 / l));
      const so: Pt = [100, 100];
      return (
        <Canvas>
          <Fade show={beat <= 2}>
            <Cells o={o} cols={a} rows={b} u={U} show={beat >= 1} stagger />
            <Shape pts={rect} color={beat === 0 ? MANIM.yellow : MANIM.ink} fill={0.05} width={beat === 0 ? 6 : 4} />
            <T x={o[0] + (a * U) / 2} y={o[1] - 14} size={26} color={MANIM.blue} anchor="middle">a = {a}</T>
            <T x={o[0] - 14} y={o[1] + (b * U) / 2 + 8} size={26} color={MANIM.green} anchor="end">b = {b}</T>
          </Fade>
          <Fade show={beat === 3}>
            <Cells o={so} cols={l} rows={l} u={sq} show color={MANIM.orange} />
            <Shape pts={[so, [so[0] + l * sq, so[1]], [so[0] + l * sq, so[1] + l * sq], [so[0], so[1] + l * sq]]} color={MANIM.ink} fill={0.05} />
            <T x={so[0] + (l * sq) / 2} y={so[1] - 14} size={26} color={MANIM.orange} anchor="middle">l = {l}</T>
          </Fade>
          <Fade show={beat === 2} dy={6}>
            <T x={470} y={170} size={32} color={MANIM.yellow}>{`A = ${a} · ${b} = ${a * b}`}</T>
            <T x={470} y={226} size={30} color={MANIM.ink}>{`P = ${2 * a} + ${2 * b} = ${2 * a + 2 * b}`}</T>
          </Fade>
          <Fade show={beat === 3} dy={6}>
            <T x={470} y={170} size={32} color={MANIM.orange}>A = l²</T>
            <T x={470} y={226} size={30} color={MANIM.ink}>P = 4l</T>
          </Fade>
          <Fade show={beat === 4} dy={6}>
            <T x={400} y={170} size={34} color={MANIM.orange} anchor="middle">A = 81 cm²</T>
            <T x={400} y={236} size={38} color={MANIM.yellow} anchor="middle">l = √81 = 9 cm</T>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Paralelogramo ───────────── */

const PA: Pt = [50, 320];
const PB: Pt = [320, 320];
const PC: Pt = [410, 140];
const PD: Pt = [140, 140];

export function buildAreaParalelogramo(): AnimBuild {
  const tri: Pt[] = [PA, [PD[0], PA[1]], PD];
  return {
    label: "Un paralelogramo se convierte en un rectángulo de la misma base y altura al mover un triángulo de un lado al otro, así que su área es base por altura",
    captions: [
      "Un **paralelogramo** de base $b$ y altura $a$ (la distancia entre los lados opuestos, medida en perpendicular).",
      "Cortamos el triángulo de la izquierda…",
      "…y lo pegamos a la derecha: sale un **rectángulo** de base $b$ y altura $a$, con la misma superficie.",
      "Por tanto $A = b\\cdot a$. El perímetro, $P = 2b + 2c$, **no** determina el área: hace falta la altura.",
      "Con los mismos lados $b$ y $c$ pero más inclinado, la altura baja y el área también: mismo perímetro, otra área.",
    ],
    render: (beat) => {
      const slant = 250;
      return (
        <Canvas>
          <Shape pts={[PA, PB, PC, PD]} color={MANIM.blue} fill={beat >= 2 ? 0.28 : 0.14} show={beat <= 3} />
          <Move x={beat >= 2 ? PB[0] - PA[0] : 0} y={0}>
            <Shape pts={tri} color={MANIM.orange} fill={beat >= 1 ? 0.5 : 0} width={beat >= 1 ? 4 : 0} show={beat <= 3} />
          </Move>
          <Seg a={PD} b={[PD[0], PA[1]]} color={MANIM.yellow} width={3} dashed show={beat <= 3} />
          <Fade show={beat <= 3}>
            <RightMark v={[PD[0], PA[1]]} a={180} b={90} size={14} color={MANIM.yellow} />
            <T x={PD[0] + 18} y={230} size={26} color={MANIM.yellow}>a</T>
            <T x={(PA[0] + PB[0]) / 2 + 40} y={PA[1] + 38} size={26} color={MANIM.blue} anchor="middle">b</T>
            <T x={PD[0] - 30} y={225} size={26} color={MANIM.green} anchor="end">c</T>
          </Fade>
          <Fade show={beat === 3} dy={6}>
            <T x={460} y={300} size={32} color={MANIM.yellow} anchor="start">A = b · a</T>
          </Fade>
          <Fade show={beat === 4} dy={6}>
            <Shape pts={[[PA[0], PA[1]], [PB[0], PB[1]], [PB[0] + slant * 0.6, 220], [PA[0] + slant * 0.6, 220]]} color={MANIM.purple} fill={0.2} />
            <T x={500} y={190} size={28} color={MANIM.purple}>mismos lados,</T>
            <T x={500} y={230} size={28} color={MANIM.purple}>menos altura</T>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Rombo ───────────── */

const RC: Pt = [230, 215];
const RH = 160;
const RV = 120;

export function buildAreaRombo(): AnimBuild {
  const top: Pt = [RC[0], RC[1] - RV];
  const bot: Pt = [RC[0], RC[1] + RV];
  const left: Pt = [RC[0] - RH, RC[1]];
  const right: Pt = [RC[0] + RH, RC[1]];
  const rect: Pt[] = [[left[0], top[1]], [right[0], top[1]], [right[0], bot[1]], [left[0], bot[1]]];
  return {
    label: "El área de un rombo es la mitad del rectángulo que forman sus dos diagonales: d por d' dividido entre 2",
    captions: [
      "Un **rombo** es un paralelogramo con los cuatro lados iguales: su área se puede calcular como $A = l\\cdot a$.",
      "También se puede calcular con sus **diagonales**: la mayor $d$ y la menor $d'$, que se cortan en perpendicular.",
      "El rombo cabe justo en un rectángulo de dimensiones $d \\times d'$.",
      "Las cuatro esquinas que sobran son iguales a los cuatro triángulos del rombo: el rombo ocupa la **mitad** del rectángulo.",
      "$A = \\dfrac{d\\cdot d'}{2}$. Con $d = 8$ y $d' = 6$: $A = 24$.",
    ],
    render: (beat) => (
      <Canvas>
        <Shape pts={rect} color={MANIM.purple} fill={0.14} dashed show={beat >= 2} />
        <Shape pts={[top, right, bot, left]} color={MANIM.blue} fill={beat >= 3 ? 0.45 : 0.18} />
        <Seg a={left} b={right} color={MANIM.yellow} width={3.5} dashed show={beat >= 1} />
        <Seg a={top} b={bot} color={MANIM.green} width={3.5} dashed show={beat >= 1} />
        <Fade show={beat >= 1}>
          <T x={RC[0] + 6} y={RC[1] - 10} size={26} color={MANIM.yellow} anchor="start">d</T>
          <T x={RC[0] + 12} y={RC[1] - 60} size={26} color={MANIM.green} anchor="start">d&apos;</T>
        </Fade>
        <Fade show={beat === 3}>
          {[[rect[0]!, top, left], [rect[1]!, top, right], [rect[2]!, bot, right], [rect[3]!, bot, left]].map((t, i) => (
            <polygon key={i} points={poly(t as Pt[])} fill={MANIM.red} fillOpacity={0.35} stroke={MANIM.red} strokeWidth={2} />
          ))}
        </Fade>
        <Fade show={beat === 0}>
          <T x={RC[0] + 90} y={RC[1] - 62} size={24} color={MANIM.muted}>l</T>
        </Fade>
        <Fade show={beat >= 2} dy={6}>
          <T x={470} y={160} size={28} color={MANIM.purple}>rectángulo: d · d&apos;</T>
        </Fade>
        <Fade show={beat >= 3} dy={6}>
          <T x={470} y={210} size={28} color={MANIM.blue}>rombo: mitad</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={470} y={280} size={34} color={MANIM.yellow}>A = d · d&apos; / 2</T>
          <T x={470} y={324} size={28} color={MANIM.ink}>8 · 6 / 2 = 24</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Trapecio ───────────── */

const TA: Pt = [60, 330];
const TB: Pt = [364, 330];
const TC: Pt = [282, 178];
const TD: Pt = [130, 178];

export function buildAreaTrapecio(): AnimBuild {
  const Mx = mid(TB, TC);
  const rot = (p: Pt): Pt => [2 * Mx[0] - p[0], 2 * Mx[1] - p[1]];
  const copy = [TA, TB, TC, TD].map(rot) as unknown as Pt[];
  const bigPar: Pt[] = [TA, [copy[3]![0], TA[1]], copy[0]!, TD].map((p, i) => (i === 2 ? [copy[0]![0], TD[1]] : p)) as Pt[];
  return {
    label: "Dos trapecios iguales, uno girado, forman un paralelogramo de base b más b' y altura a: el área del trapecio es la mitad",
    captions: [
      "En un **trapecio**, los lados paralelos son las **bases** ($b$ la mayor, $b'$ la menor) y la **altura** $a$ es la distancia entre ellas.",
      "Le adosamos otro trapecio igual, girado media vuelta…",
      "…y se forma un **paralelogramo** de base $b + b'$ y altura $a$.",
      "El trapecio es la mitad: $A = \\dfrac{(b + b')\\cdot a}{2}$. Con $b = 8$, $b' = 4$ y $a = 4$: $A = 24$.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 1} dx={20}>
          <Shape pts={copy} color={MANIM.orange} fill={0.3} />
        </Fade>
        <Shape pts={[TA, TB, TC, TD]} color={MANIM.blue} fill={0.3} />
        <Fade show={beat >= 2}>
          <Shape pts={bigPar} color={MANIM.yellow} fill={0} width={3} dashed />
        </Fade>
        <Seg a={[TD[0] + 30, TD[1]]} b={[TD[0] + 30, TA[1]]} color={MANIM.green} width={3} dashed />
        <RightMark v={[TD[0] + 30, TA[1]]} a={180} b={90} size={13} color={MANIM.green} />
        <T x={TD[0] + 44} y={258} size={24} color={MANIM.green}>a</T>
        <T x={(TA[0] + TB[0]) / 2} y={TA[1] + 36} size={24} color={MANIM.blue} anchor="middle">b</T>
        <T x={(TD[0] + TC[0]) / 2} y={TD[1] - 12} size={24} color={MANIM.blue} anchor="middle">b&apos;</T>
        <Fade show={beat >= 2}>
          <HB x1={TA[0]} x2={copy[3]![0]} y={TA[1] + 52} text="b + b'" color={MANIM.yellow} />
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={400} y={86} size={34} color={MANIM.yellow} anchor="middle">A = (b + b&apos;) · a / 2</T>
          <T x={400} y={128} size={26} color={MANIM.ink} anchor="middle">(8 + 4) · 4 / 2 = 24</T>
        </Fade>
      </Canvas>
    ),
  };
}

function HB({ x1, x2, y, text, color }: { x1: number; x2: number; y: number; text: string; color: string }) {
  return (
    <g>
      <line x1={x1} y1={y} x2={x2} y2={y} stroke={color} strokeWidth={3} />
      <line x1={x1} y1={y - 7} x2={x1} y2={y + 7} stroke={color} strokeWidth={3} />
      <line x1={x2} y1={y - 7} x2={x2} y2={y + 7} stroke={color} strokeWidth={3} />
      <T x={(x1 + x2) / 2} y={y + 28} size={24} color={color} anchor="middle">{text}</T>
    </g>
  );
}

/* ───────────── Triángulo ───────────── */

const TRA: Pt = [70, 330];
const TRB: Pt = [340, 330];
const TRC: Pt = [190, 150];

export function buildAreaTriangulo(): AnimBuild {
  const M = mid(TRB, TRC);
  const copy: Pt[] = [TRA, TRB, TRC].map((p) => [2 * M[0] - p[0], 2 * M[1] - p[1]] as Pt);
  const ghosts: { c: Pt; color: string }[] = [
    { c: [90, 150], color: MANIM.green },
    { c: [330, 150], color: MANIM.purple },
  ];
  return {
    label: "Un triángulo con otro igual forma un paralelogramo de base b y altura a, así que su área es b por a dividido entre 2, y no cambia aunque el vértice superior se desplace",
    captions: [
      "Un triángulo de base $b$ y altura $a$ (la perpendicular a la base desde el vértice opuesto).",
      "Si le juntamos otro triángulo igual, girado media vuelta…",
      "…se obtiene un **paralelogramo** de base $b$ y altura $a$.",
      "El triángulo es la mitad del paralelogramo: $A = \\dfrac{b\\cdot a}{2}$.",
      "Si el vértice superior se desliza por la paralela a la base, la base y la altura no cambian: el **área** tampoco.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 1 && beat <= 3} dx={20}>
          <Shape pts={copy} color={MANIM.orange} fill={0.3} />
        </Fade>
        <Shape pts={[TRA, TRB, TRC]} color={MANIM.blue} fill={0.3} />
        <Seg a={TRC} b={[TRC[0], TRA[1]]} color={MANIM.yellow} width={3} dashed />
        <RightMark v={[TRC[0], TRA[1]]} a={180} b={90} size={13} color={MANIM.yellow} />
        <T x={TRC[0] + 14} y={250} size={24} color={MANIM.yellow}>a</T>
        <T x={(TRA[0] + TRB[0]) / 2} y={TRA[1] + 36} size={24} color={MANIM.blue} anchor="middle">b</T>
        <Fade show={beat === 4}>
          <Seg a={[40, TRC[1]]} b={[540, TRC[1]]} color={MANIM.muted} width={2} dashed />
          {ghosts.map((g, i) => (
            <Shape key={i} pts={[TRA, TRB, g.c]} color={g.color} fill={0.1} width={3} />
          ))}
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={470} y={300} size={34} color={MANIM.yellow}>A = b · a / 2</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={560} y={220} size={26} color={MANIM.ink}>misma base,</T>
          <T x={560} y={256} size={26} color={MANIM.ink}>misma altura,</T>
          <T x={560} y={292} size={26} color={MANIM.yellow}>misma área</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Triángulo rectángulo ───────────── */

export function buildAreaTrianguloRectangulo(): AnimBuild {
  const A: Pt = [120, 340];
  const B: Pt = [360, 340];
  const C: Pt = [120, 160];
  const f = footOn(A, B, C);
  return {
    label: "En un triángulo rectángulo un cateto es la altura del otro, y con la hipotenusa como base la altura sale de igualar las dos formas de calcular el área",
    captions: [
      "Triángulo rectángulo de catetos $c' = 15$ y $c = 20$, e hipotenusa $25$. Los catetos son perpendiculares.",
      "Un cateto hace de base y el otro de altura: el triángulo es la mitad del rectángulo $c\\cdot c'$, $A = \\dfrac{20\\cdot 15}{2} = 150$ cm².",
      "Con la **hipotenusa** como base, la altura $a$ ya no es un cateto: es la perpendicular desde el vértice recto.",
      "El área es la misma: $150 = \\dfrac{25\\cdot a}{2}$, luego $a = \\dfrac{300}{25} = 12$ cm.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 1}>
          <Shape pts={[A, B, [B[0], C[1]], C]} color={MANIM.purple} fill={0.12} dashed />
        </Fade>
        <Shape pts={[A, B, C]} color={MANIM.blue} fill={0.3} />
        <RightMark v={A} a={0} b={90} size={20} color={MANIM.ink} />
        <T x={(A[0] + B[0]) / 2} y={A[1] + 34} size={24} color={MANIM.blue} anchor="middle">c = 20</T>
        <T x={A[0] - 14} y={(A[1] + C[1]) / 2 + 8} size={24} color={MANIM.green} anchor="end">c&apos; = 15</T>
        <Fade show={beat >= 2}>
          <Seg a={A} b={f} color={MANIM.yellow} width={3.5} />
          <RightMark v={f} a={angleOf(f, A)} b={angleOf(f, B)} size={13} color={MANIM.yellow} />
          <T x={(A[0] + f[0]) / 2 + 14} y={(A[1] + f[1]) / 2 + 24} size={24} color={MANIM.yellow} anchor="start">a</T>
          <T x={mid(B, C)[0] + 22} y={mid(B, C)[1] - 4} size={24} color={MANIM.orange} anchor="start">h = 25</T>
        </Fade>
        <Fade show={beat === 1} dy={6}>
          <T x={440} y={200} size={30} color={MANIM.yellow}>A = c · c&apos; / 2</T>
          <T x={440} y={246} size={28} color={MANIM.ink}>20 · 15 / 2 = 150 cm²</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={440} y={200} size={30} color={MANIM.yellow}>25 · a / 2 = 150</T>
          <T x={440} y={246} size={32} color={MANIM.ink}>a = 12 cm</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Polígono irregular ───────────── */

const IRR: Pt[] = [[70, 300], [190, 350], [330, 305], [385, 190], [255, 85], [110, 150]];
const TRI_COLORS = [MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple];

export function buildAreaPoligonoTriangulos(): AnimBuild {
  const tris = [1, 2, 3, 4].map((i) => [IRR[0]!, IRR[i]!, IRR[i + 1]!] as Pt[]);
  return {
    label: "El área de un polígono irregular se calcula descomponiéndolo en triángulos desde un vértice y sumando las áreas de cada triángulo",
    captions: [
      "Para hallar el área de un polígono cualquiera, lo **descomponemos en triángulos**.",
      "Trazamos diagonales desde un mismo vértice: un hexágono se parte en $4$ triángulos.",
      "Cada triángulo tiene su base y su altura: se calcula el área de cada uno por separado.",
      "El área del polígono es la **suma** de las áreas de los triángulos. El perímetro es la suma de sus lados.",
    ],
    render: (beat) => (
      <Canvas>
        {tris.map((t, i) => (
          <Shape key={i} pts={t} color={TRI_COLORS[i]!} fill={beat >= 2 ? 0.35 : 0} width={0} show={beat >= 2} />
        ))}
        {[2, 3, 4].map((i) => (
          <Seg key={i} a={IRR[0]!} b={IRR[i]!} color={MANIM.muted} width={2.5} dashed show={beat >= 1} />
        ))}
        <polygon points={poly(IRR)} fill={MANIM.blue} fillOpacity={beat < 2 ? 0.14 : 0} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <Fade show={beat >= 2}>
          {tris.map((t, i) => {
            const c: Pt = [(t[0]![0] + t[1]![0] + t[2]![0]) / 3, (t[0]![1] + t[1]![1] + t[2]![1]) / 3];
            return <T key={i} x={c[0]} y={c[1] + 10} size={28} color={MANIM.ink} anchor="middle">{`A${i + 1}`}</T>;
          })}
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={430} y={190} size={28} color={MANIM.yellow}>A = A1 + A2 + A3 + A4</T>
          <T x={430} y={240} size={24} color={MANIM.ink}>P = suma de los 6 lados</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={430} y={210} size={26} color={MANIM.ink}>cada Ai = base · altura / 2</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Polígono regular ───────────── */

const OH: Pt = [220, 215];
const RH2 = 150;

export function buildAreaPoligonoRegular(): AnimBuild {
  const v = regularPoints(OH, RH2, 6, 0);
  const a = RH2 * Math.cos(Math.PI / 6);
  const Mm = polar(OH, a, 270);
  return {
    label: "Un polígono regular de n lados se descompone en n triángulos iguales de base el lado y altura la apotema, y su área es el perímetro por la apotema dividido entre 2",
    captions: [
      "Un polígono **regular** tiene lados iguales ($l$) y una apotema $a$: la distancia del centro a cada lado.",
      "Unimos el centro con los vértices: se forman tantos **triángulos iguales** como lados tiene, aquí $6$.",
      "Cada triángulo tiene base $l$ y altura $a$: su área es $\\dfrac{l\\cdot a}{2}$.",
      "Con $n$ triángulos: $A = n\\cdot\\dfrac{l\\cdot a}{2} = \\dfrac{(n\\cdot l)\\cdot a}{2} = \\dfrac{P\\cdot a}{2}$.",
      "Ejemplo: $l = 4$ cm y $a \\approx 3{,}5$ cm. $P = 6\\cdot 4 = 24$ cm y $A = \\dfrac{24\\cdot 3{,}5}{2} = 42$ cm².",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={poly(v)} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.ink} strokeWidth={4} strokeLinejoin="round" />
        <Fade show={beat >= 1}>
          {v.map((p, i) => (
            <Seg key={i} a={OH} b={p} color={MANIM.muted} width={2.5} />
          ))}
          <Dot p={OH} color={MANIM.yellow} r={5} />
        </Fade>
        <Fade show={beat >= 2}>
          <polygon points={poly([OH, v[4]!, v[5]!])} fill={MANIM.yellow} fillOpacity={0.35} stroke={MANIM.yellow} strokeWidth={3} strokeLinejoin="round" />
          <Seg a={OH} b={Mm} color={MANIM.green} width={3.5} />
          <RightMark v={Mm} a={90} b={0} size={13} color={MANIM.green} />
          <T x={OH[0] - 12} y={(OH[1] + Mm[1]) / 2 + 8} size={24} color={MANIM.green} anchor="end">a</T>
          <T x={OH[0]} y={Mm[1] + 34} size={24} color={MANIM.yellow} anchor="middle">l</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={430} y={200} size={28} color={MANIM.yellow}>A del triángulo</T>
          <T x={430} y={244} size={30} color={MANIM.ink}>= l · a / 2</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={430} y={190} size={30} color={MANIM.ink}>A = n · l · a / 2</T>
          <T x={430} y={240} size={34} color={MANIM.yellow}>A = P · a / 2</T>
          <T x={430} y={282} size={24} color={MANIM.muted}>P = n · l (perímetro)</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={430} y={190} size={28} color={MANIM.ink}>P = 6 · 4 = 24 cm</T>
          <T x={430} y={240} size={30} color={MANIM.yellow}>A = 24 · 3,5 / 2</T>
          <T x={430} y={284} size={32} color={MANIM.green}>A = 42 cm²</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Longitud de la circunferencia: π ───────────── */

export function buildLongitudPi(): AnimBuild {
  const d = 150;
  const C: Pt = [140, 120];
  const y = 290;
  const x0 = 60;
  return {
    label: "La longitud de una circunferencia es algo más de tres veces su diámetro, tres diámetros y 0,14 de otro: el número pi",
    captions: [
      "Una circunferencia de diámetro $d$. ¿Cuánto mide su contorno?",
      "Imaginemos que la **desenrollamos** sobre una recta: es un segmento de longitud $l$.",
      "Si colocamos el diámetro sobre él, cabe **tres veces**…",
      "…y sobra un poco más: cerca de $0{,}14$ de diámetro.",
      "La longitud es siempre $3{,}14$ veces el diámetro. A ese número lo llamamos $\\pi$: $l = \\pi d = 2\\pi r$.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={C[0]} cy={C[1]} r={d / 2} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.blue} strokeWidth={4} />
        <Seg a={[C[0] - d / 2, C[1]]} b={[C[0] + d / 2, C[1]]} color={MANIM.yellow} width={4} />
        <T x={C[0]} y={C[1] - 10} size={26} color={MANIM.yellow} anchor="middle">d</T>
        <Fade show={beat >= 1} dy={-10}>
          <Seg a={[x0, y]} b={[x0 + Math.PI * d, y]} color={MANIM.blue} width={5} />
          <T x={x0 + (Math.PI * d) / 2} y={y + 70} size={26} color={MANIM.blue} anchor="middle">l = longitud de la circunferencia</T>
        </Fade>
        {[0, 1, 2].map((i) => (
          <Fade key={i} show={beat >= 2} dy={-6} delay={i * 180}>
            <rect x={x0 + i * d + 2} y={y - 22} width={d - 4} height={20} rx={4} fill={MANIM.yellow} fillOpacity={0.5} stroke={MANIM.yellow} strokeWidth={2} />
            <T x={x0 + i * d + d / 2} y={y - 28} size={22} color={MANIM.yellow} anchor="middle">d</T>
          </Fade>
        ))}
        <Fade show={beat >= 3} dy={-6}>
          <rect x={x0 + 3 * d + 2} y={y - 22} width={0.14 * d - 2} height={20} rx={3} fill={MANIM.orange} fillOpacity={0.7} stroke={MANIM.orange} strokeWidth={2} />
          <T x={x0 + 3 * d + 0.07 * d} y={y - 42} size={20} color={MANIM.orange} anchor="middle">0,14 d</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={470} y={90} size={30} color={MANIM.yellow}>l = π · d</T>
          <T x={470} y={136} size={28} color={MANIM.ink}>π ≈ 3,14</T>
          <T x={470} y={178} size={26} color={MANIM.muted}>l = 2 · π · r</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Área del círculo ───────────── */

export function buildAreaCirculo(): AnimBuild {
  const r = 85;
  const C: Pt = [150, 120];
  const base = 2 * Math.PI * r;
  const x0 = 60;
  const y = 360;
  const apex: Pt = [x0 + base / 2, y - r];
  return {
    label: "El círculo se descompone en muchos triángulos finos de altura r cuyas bases suman la longitud de la circunferencia, 2 pi r, y así su área es pi por r al cuadrado",
    captions: [
      "Un círculo de radio $r$. Su contorno mide $2\\pi r$.",
      "Lo descomponemos en **muchos triángulos** muy finos, como si fuera un polígono regular de muchos lados.",
      "Esos triángulos son casi rectos: su altura es $r$, y la suma de todas sus bases es la longitud de la circunferencia, $2\\pi r$.",
      "El área es la de un triángulo de base $2\\pi r$ y altura $r$: $A = \\dfrac{2\\pi r\\cdot r}{2} = \\pi r^2$.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={C[0]} cy={C[1]} r={r} fill={MANIM.blue} fillOpacity={0.16} stroke={MANIM.blue} strokeWidth={4} />
        <Fade show={beat >= 1}>
          {Array.from({ length: 24 }, (_, i) => {
            const p = polar(C, r, (360 / 24) * i);
            return <Seg key={i} a={C} b={p} color={MANIM.ink} width={1.5} />;
          })}
        </Fade>
        <Seg a={C} b={polar(C, r, 35)} color={MANIM.yellow} width={4} />
        <T x={C[0] + 28} y={C[1] - 26} size={24} color={MANIM.yellow}>r</T>
        <Dot p={C} color={MANIM.yellow} r={5} />
        <Fade show={beat >= 2} dy={10}>
          <polygon points={poly([[x0, y], [x0 + base, y], apex])} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} strokeLinejoin="round" />
          <Seg a={apex} b={[apex[0], y]} color={MANIM.yellow} width={3} dashed />
          <T x={apex[0] + 12} y={y - r / 2 + 8} size={24} color={MANIM.yellow}>r</T>
          <T x={x0 + base / 2} y={y + 36} size={24} color={MANIM.green} anchor="middle">base = 2πr</T>
        </Fade>
        <Fade show={beat === 0} dy={6}>
          <T x={330} y={110} size={28} color={MANIM.ink}>longitud = 2πr</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={330} y={90} size={30} color={MANIM.ink}>A = 2πr · r / 2</T>
          <T x={330} y={140} size={36} color={MANIM.yellow}>A = π r²</T>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Corona circular ───────────── */

export function buildCoronaCircular(): AnimBuild {
  const C: Pt = [210, 210];
  const R = 140;
  const r = 84;
  return {
    label: "El área de una corona circular es el área del círculo grande menos el del círculo pequeño, y su perímetro es la suma de las dos circunferencias",
    captions: [
      "Dos circunferencias **concéntricas** (mismo centro) de radios $R = 5$ y $r = 3$ cm encierran una **corona circular**.",
      "El círculo grande tiene área $\\pi\\cdot 5^2 = 25\\pi$.",
      "Le quitamos el hueco, el círculo pequeño: $\\pi\\cdot 3^2 = 9\\pi$.",
      "Área de la corona: $A = \\pi R^2 - \\pi r^2 = 25\\pi - 9\\pi = 16\\pi \\approx 50{,}27$ cm².",
      "El perímetro del recinto es la suma de las dos circunferencias: $2\\pi\\cdot 5 + 2\\pi\\cdot 3 = 16\\pi \\approx 50{,}27$ cm. Que coincidan los números es pura casualidad: son magnitudes distintas.",
    ],
    render: (beat) => (
      <Canvas>
        <circle cx={C[0]} cy={C[1]} r={R} fill={MANIM.blue} fillOpacity={beat === 1 ? 0.35 : 0.2} stroke={MANIM.blue} strokeWidth={4} />
        <circle cx={C[0]} cy={C[1]} r={r} fill={beat === 2 ? MANIM.red : beat === 1 ? MANIM.blue : MANIM.surface} fillOpacity={beat === 2 ? 0.5 : beat === 1 ? 0.35 : 1} stroke={MANIM.orange} strokeWidth={4} className="anim-t" />
        <Dot p={C} color={MANIM.yellow} r={5} />
        <Seg a={C} b={polar(C, r, 20)} color={MANIM.orange} width={3.5} />
        <Seg a={C} b={polar(C, R, 200)} color={MANIM.blue} width={3.5} />
        <T x={C[0] + 40} y={C[1] - 12} size={22} color={MANIM.orange}>r</T>
        <T x={C[0] - 80} y={C[1] + 40} size={22} color={MANIM.blue}>R</T>
        <Fade show={beat === 1} dy={6}>
          <T x={450} y={200} size={32} color={MANIM.blue}>π · 5² = 25π</T>
        </Fade>
        <Fade show={beat === 2} dy={6}>
          <T x={450} y={200} size={32} color={MANIM.red}>− π · 3² = − 9π</T>
        </Fade>
        <Fade show={beat === 3} dy={6}>
          <T x={450} y={180} size={28} color={MANIM.ink}>A = πR² − πr²</T>
          <T x={450} y={230} size={32} color={MANIM.yellow}>A = 16π ≈ 50,27 cm²</T>
        </Fade>
        <Fade show={beat === 4} dy={6}>
          <T x={450} y={180} size={26} color={MANIM.ink}>P = 2π·5 + 2π·3</T>
          <T x={450} y={230} size={32} color={MANIM.yellow}>P = 16π ≈ 50,27 cm</T>
        </Fade>
        <Fade show={beat === 0} dy={6}>
          <T x={450} y={200} size={32} color={MANIM.ink}>Corona circular</T>
        </Fade>
      </Canvas>
    ),
  };
}
