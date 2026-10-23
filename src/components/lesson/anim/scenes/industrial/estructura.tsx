import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

const rad = (deg: number) => (deg * Math.PI) / 180;

/** Pseudo-azar determinista: 0…1 estable para el mismo índice. */
const rnd = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/** Puntos repartidos sobre una circunferencia (electrones en una capa). */
function RingDots({ cx, cy, r, n, start = 0, color, size = 3.5 }: { cx: number; cy: number; r: number; n: number; start?: number; color: string; size?: number }) {
  return (
    <g>
      {Array.from({ length: n }, (_, i) => {
        const a = rad(start + (360 / n) * i);
        return <circle key={i} cx={cx + r * Math.cos(a)} cy={cy + r * Math.sin(a)} r={size} fill={color} />;
      })}
    </g>
  );
}

/** Nucleones (protones rojos y neutrones grises) apretados en un núcleo. */
export function Nucleus({ cx, cy, p, n, r = 6.4, label }: { cx: number; cy: number; p: number; n: number; r?: number; label?: ReactNode }) {
  const total = p + n;
  return (
    <g>
      {Array.from({ length: total }, (_, k) => {
        const isProton = Math.floor(((k + 1) * p) / total) > Math.floor((k * p) / total);
        const ang = k * 2.39996;
        const d = r * 1.75 * Math.sqrt(k + 0.4);
        return (
          <circle
            key={k}
            cx={cx + d * Math.cos(ang)}
            cy={cy + d * Math.sin(ang)}
            r={r}
            fill={isProton ? MANIM.red : "#9aa7b8"}
            stroke={MANIM.surface}
            strokeWidth={1.2}
          />
        );
      })}
      {label}
    </g>
  );
}

/* ───────────── El átomo: núcleo, corteza e isótopos ───────────── */

export function buildAtomoIsotopos(): AnimBuild {
  const refs = [
    { id: "c12", name: "C-12", rel: "isótopo", z: 6, n: 6, x: 120, color: MANIM.green },
    { id: "c14", name: "C-14", rel: "de referencia", z: 6, n: 8, x: 300, color: MANIM.blue },
    { id: "n14", name: "N-14", rel: "isóbaro", z: 7, n: 7, x: 490, color: MANIM.orange },
    { id: "o16", name: "O-16", rel: "isótono", z: 8, n: 8, x: 680, color: MANIM.purple },
  ];
  return {
    label: "El átomo: núcleo con protones y neutrones, corteza con electrones; isótopos, isóbaros e isótonos",
    beatMs: 4500,
    captions: [
      "El átomo tiene un **núcleo** de carga positiva con casi toda la masa y una **corteza** de electrones. Si el átomo midiera $10$ m de radio, el núcleo sería una bolita de $1$ mm.",
      "El núcleo lo forman **protones** (carga positiva) y **neutrones**. El número de protones es el **número atómico** $Z$; el total de nucleones es el **número másico** $A = Z + N$.",
      "Según qué se repita, los átomos son **isótopos** (mismo $Z$), **isóbaros** (mismo $A$) o **isótonos** (mismo $N$). Partimos del carbono-14: $Z = 6$, $N = 8$, $A = 14$.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <circle cx={400} cy={215} r={160} fill={MANIM.blue} fillOpacity={0.1} stroke={MANIM.blue} strokeWidth={2} strokeDasharray="8 8" />
          <circle cx={400} cy={215} r={105} fill="none" stroke={MANIM.blue} strokeOpacity={0.45} strokeWidth={1.5} strokeDasharray="4 8" />
          <circle cx={400} cy={215} r={7} fill={MANIM.red} />
          {[20, 140, 255].map((a, i) => (
            <circle key={a} cx={400 + (i === 1 ? 105 : 160) * Math.cos(rad(a))} cy={215 + (i === 1 ? 105 : 160) * Math.sin(rad(a))} r={7} fill={MANIM.blue} />
          ))}
          <Txt x={400} y={42} size={24} color={MANIM.yellow}>
            Átomo: radio ≈ 10⁻¹⁰ m
          </Txt>
          <Txt x={400} y={252} size={18} color={MANIM.red}>
            núcleo ≈ 10⁻¹⁴ m
          </Txt>
          <Txt x={30} y={110} size={20} color={MANIM.blue} anchor="start">
            electrones (corteza)
          </Txt>
          <Txt x={30} y={134} size={16} color={MANIM.muted} anchor="start">
            «vibran» en una zona
          </Txt>
          <Txt x={30} y={154} size={16} color={MANIM.muted} anchor="start">
            de probabilidad
          </Txt>
          <Txt x={400} y={410} size={18} color={MANIM.muted}>
            Si el átomo midiera 10 m, el núcleo mediría 1 mm
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Nucleus cx={290} cy={215} p={6} n={8} r={14} />
          <Txt x={290} y={355} size={22} color={MANIM.yellow}>
            Núcleo del C-14
          </Txt>
          <circle cx={520} cy={150} r={14} fill={MANIM.red} stroke={MANIM.surface} strokeWidth={1.5} />
          <Txt x={560} y={157} size={22} color={MANIM.red} anchor="start">
            protón (+): Z = 6
          </Txt>
          <circle cx={520} cy={215} r={14} fill="#9aa7b8" stroke={MANIM.surface} strokeWidth={1.5} />
          <Txt x={560} y={222} size={22} color="#c3ccd8" anchor="start">
            neutrón: N = 8
          </Txt>
          <Txt x={520} y={300} size={28} color={MANIM.green} anchor="start">
            A = Z + N = 14
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          {refs.map((r) => (
            <g key={r.id}>
              <Nucleus cx={r.x} cy={165} p={r.z} n={r.n} r={r.id === "c14" ? 9 : 9} />
              <Txt x={r.x} y={272} size={24} color={r.color}>
                {r.name}
              </Txt>
              <Txt x={r.x} y={298} size={17} color={MANIM.muted}>
                {r.rel}
              </Txt>
              <Txt x={r.x} y={336} size={20} color={r.id === "c12" || r.id === "c14" ? MANIM.green : MANIM.ink}>
                Z = {r.z}
              </Txt>
              <Txt x={r.x} y={362} size={20} color={r.id === "o16" || r.id === "c14" ? MANIM.purple : MANIM.ink}>
                N = {r.n}
              </Txt>
              <Txt x={r.x} y={388} size={20} color={r.id === "n14" || r.id === "c14" ? MANIM.orange : MANIM.ink}>
                A = {r.z + r.n}
              </Txt>
            </g>
          ))}
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Fuerzas y energías de enlace ───────────── */

export function buildEnlaceCurvaEnergia(): AnimBuild {
  const A0 = 0.3;
  const X = (r: number) => 70 + r * 700;
  const Y = (e: number) => 190 - e * 85;
  const eNet = (r: number) => (A0 / r) ** 12 - 2 * (A0 / r) ** 6;
  const eAtt = (r: number) => -2 * (A0 / r) ** 6;
  const eRep = (r: number) => (A0 / r) ** 12;
  const path = (f: (r: number) => number, lo: number, hi: number) => {
    const pts: string[] = [];
    for (let r = lo; r <= hi + 1e-9; r += 0.01) {
      const e = f(r);
      if (e > 1.45 || e < -2.2) {
        continue;
      }
      pts.push(`${pts.length ? "L" : "M"} ${X(r).toFixed(1)} ${Y(e).toFixed(1)}`);
    }
    return pts.join(" ");
  };
  const marks = [0.85, 0.55, 0.22, A0, A0];
  return {
    label: "Energía de atracción, de repulsión y neta entre dos átomos según la distancia",
    beatMs: 4500,
    captions: [
      "Dos átomos a gran distancia casi no se notan. Al acercarse aparecen **fuerzas** entre ellos; vamos a seguir la **energía** en función de la distancia $r$.",
      "**Atracción**: la naturaleza del enlace y la atracción entre cada núcleo y la nube electrónica del otro. Crece (en valor absoluto) al acercarse y la energía baja.",
      "**Repulsión**: entre los núcleos y entre las nubes electrónicas. Es de muy corto alcance, pero crece muy deprisa cuando los átomos casi se tocan.",
      "La suma de ambas curvas es la **energía neta**, con un **mínimo** a la distancia de equilibrio $a_0$ (para muchos átomos, $0{,}3$ nm). Ahí las fuerzas de atracción y repulsión se igualan.",
      "La profundidad del pozo es la **energía de enlace**: lo que cuesta separar los átomos hasta una distancia infinita. Cuanto más profundo, más fuerte el enlace.",
    ],
    render: (beat) => {
      const mx = X(marks[Math.min(beat, marks.length - 1)]!);
      return (
        <Canvas>
          <Axes x0={70} y0={190} x1={775} y1={30} xLabel="distancia r" yLabel="energía" />
          <Txt x={60} y={150} size={16} color={MANIM.muted} anchor="end">
            +
          </Txt>
          <Txt x={60} y={250} size={16} color={MANIM.muted} anchor="end">
            −
          </Txt>
          <DrawPath show={beat >= 1} d={path(eAtt, 0.2, 0.95)} color={MANIM.green} width={3.5} />
          <DrawPath show={beat >= 2} d={path(eRep, 0.24, 0.95)} color={MANIM.red} width={3.5} />
          <DrawPath show={beat >= 3} d={path(eNet, 0.255, 0.95)} color={MANIM.blue} width={5} />
          <Fade show={beat >= 1}>
            <Txt x={X(0.6)} y={Y(eAtt(0.6)) + 32} size={17} color={MANIM.green} anchor="start">
              E atractiva
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Txt x={X(0.36)} y={Y(eRep(0.36)) - 10} size={17} color={MANIM.red} anchor="start">
              E repulsiva
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <line x1={X(A0)} y1={190} x2={X(A0)} y2={Y(-1)} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 5" />
            <circle cx={X(A0)} cy={Y(-1)} r={7} fill={MANIM.yellow} />
            <Txt x={X(A0) + 16} y={Y(-1) + 6} size={19} color={MANIM.yellow} anchor="start">
              mínimo de energía
            </Txt>
            <Txt x={X(A0)} y={216} size={18} color={MANIM.yellow}>
              a₀
            </Txt>
          </Fade>
          <Fade show={beat >= 4}>
            <line x1={X(A0) + 150} y1={190} x2={X(A0) + 150} y2={Y(-1)} stroke={MANIM.orange} strokeWidth={2.5} />
            <polygon points={`${X(A0) + 150},${Y(-1)} ${X(A0) + 145},${Y(-1) - 10} ${X(A0) + 155},${Y(-1) - 10}`} fill={MANIM.orange} />
            <Txt x={X(A0) + 162} y={Y(-0.85)} size={18} color={MANIM.orange} anchor="start">
              energía de enlace
            </Txt>
            <line x1={X(A0)} y1={Y(-1)} x2={X(A0) + 150} y2={Y(-1)} stroke={MANIM.orange} strokeWidth={1.5} strokeDasharray="4 4" />
          </Fade>
          {/* Los dos átomos a la distancia r marcada */}
          <circle cx={70} cy={340} r={22} fill={MANIM.purple} fillOpacity={0.75} />
          <g className="anim-t" style={{ transform: `translate(${mx}px, 0px)` }}>
            <circle cx={0} cy={340} r={22} fill={MANIM.orange} fillOpacity={0.8} />
            <line x1={0} y1={324} x2={0} y2={190} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="3 5" />
          </g>
          <line x1={92} y1={340} x2={mx - 22} y2={340} stroke={MANIM.muted} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={400} y={392} size={18} color={MANIM.muted}>
            {beat === 0 ? "lejos: casi no hay interacción" : beat === 1 ? "se acercan: domina la atracción" : beat === 2 ? "demasiado cerca: domina la repulsión" : "a₀ ≈ 0,3 nm: equilibrio"}
          </Txt>
        </Canvas>
      );
    },
  };
}

/* ───────────── Enlace iónico: NaCl ───────────── */

function Shells({ cx, cy, electrons, outerR, body, color, outerColor }: { cx: number; cy: number; electrons: number[]; outerR: number; body: number; color: string; outerColor?: string }) {
  const radii = [18, 34, outerR];
  return (
    <g>
      <circle cx={cx} cy={cy} r={body} fill={color} fillOpacity={0.14} stroke={color} strokeWidth={2.5} />
      <circle cx={cx} cy={cy} r={5} fill={MANIM.yellow} />
      {electrons.map((n, i) => (
        <RingDots key={i} cx={cx} cy={cy} r={radii[i]!} n={n} start={i * 20 + 10} color={i === electrons.length - 1 && outerColor ? outerColor : MANIM.ink} size={3.3} />
      ))}
    </g>
  );
}

export function buildIonNaCl(): AnimBuild {
  const NA_R = 62;
  const NAP_R = 42;
  const CL_R = 52;
  const CLM_R = 62;
  const pos = (beat: number) => ({ na: beat >= 2 ? 322 : 160, cl: beat >= 2 ? 322 + NAP_R + CLM_R : 480 });
  const cy = 200;
  return {
    label: "Formación de un par de cloruro de sodio y disposición de los iones en el cristal",
    beatMs: 4800,
    captions: [
      "El **sodio** (grupo 1A, electropositivo) tiene un único electrón en su capa más externa ($3s^1$). El **cloro** (grupo 7A, electronegativo) necesita uno más para completarla ($3p^5$).",
      "El electrón pasa del sodio al cloro: se **transfiere**. Cada átomo consigue la configuración estable de un gas noble.",
      "Quedan **iones** con carga: $Na^+$, más pequeño que el átomo (pierde la capa externa), y $Cl^-$, más grande (aumenta la repulsión entre electrones). Se atraen por fuerza **electrostática** (de Coulomb).",
      "En el cristal cada ion se rodea de iones de signo contrario. Es un enlace **no direccional**: la red crece en todas las direcciones. Dura y frágil, aislante en sólido y conductora al disolver (iones libres).",
    ],
    render: (beat) => {
      const p = pos(beat);
      const ecx = beat >= 1 ? p.cl - 50 : p.na + 50;
      const Lattice = () => (
        <g>
          {Array.from({ length: 4 }, (_, r) =>
            Array.from({ length: 5 }, (_, c) => {
              const na = (r + c) % 2 === 0;
              const x = 255 + c * 72;
              const y = 120 + r * 72;
              return (
                <g key={`${r}-${c}`}>
                  <circle cx={x} cy={y} r={na ? 20 : 30} fill={na ? MANIM.blue : MANIM.green} fillOpacity={0.55} stroke={na ? MANIM.blue : MANIM.green} strokeWidth={2} />
                  <Txt x={x} y={y + 6} size={16} color={MANIM.surface} weight={800}>
                    {na ? "+" : "−"}
                  </Txt>
                </g>
              );
            }),
          )}
        </g>
      );
      return (
        <Canvas>
          <Fade show={beat <= 2}>
            <g className="anim-t" style={{ transform: `translate(${p.na}px, ${cy}px)` }}>
              <Shells cx={0} cy={0} electrons={beat >= 1 ? [2, 8] : [2, 8, 1]} outerR={50} body={beat >= 1 ? NAP_R : NA_R} color={MANIM.blue} />
            </g>
            <g className="anim-t" style={{ transform: `translate(${p.cl}px, ${cy}px)` }}>
              <Shells cx={0} cy={0} electrons={beat >= 1 ? [2, 8, 7] : [2, 8, 7]} outerR={44} body={beat >= 1 ? CLM_R : CL_R} color={MANIM.green} />
            </g>
            <circle
              className="anim-t"
              cx={0}
              cy={0}
              r={5}
              fill={MANIM.orange}
              style={{ transform: `translate(${ecx}px, ${cy}px)` }}
            />
            <Txt x={p.na} y={cy + 110} size={22} color={MANIM.blue}>
              {beat >= 2 ? "Na⁺" : "Na  (3s¹)"}
            </Txt>
            <Txt x={p.cl} y={cy + 110} size={22} color={MANIM.green}>
              {beat >= 2 ? "Cl⁻" : "Cl  (3p⁵)"}
            </Txt>
            <Fade show={beat === 0}>
              <Txt x={400} y={52} size={22} color={MANIM.yellow}>
                electropositivo + electronegativo
              </Txt>
            </Fade>
            <Fade show={beat === 1}>
              <line x1={p.na + 66} y1={cy - 70} x2={p.cl - 70} y2={cy - 70} stroke={MANIM.orange} strokeWidth={3} />
              <polygon points={`${p.cl - 56},${cy - 70} ${p.cl - 70},${cy - 77} ${p.cl - 70},${cy - 63}`} fill={MANIM.orange} />
              <Txt x={(p.na + p.cl) / 2} y={cy - 84} size={20} color={MANIM.orange}>
                se transfiere 1 e⁻
              </Txt>
            </Fade>
            <Fade show={beat === 2}>
              <Txt x={400} y={72} size={22} color={MANIM.yellow}>
                atracción electrostática
              </Txt>
              <Txt x={p.na - 52} y={cy - 78} size={20} color={MANIM.blue}>
                más pequeño
              </Txt>
              <Txt x={p.cl + 62} y={cy - 84} size={20} color={MANIM.green}>
                más grande
              </Txt>
            </Fade>
          </Fade>
          <Fade show={beat >= 3}>
            <Lattice />
            <Txt x={400} y={44} size={22} color={MANIM.yellow}>
              Cristal de NaCl
            </Txt>
            <Txt x={400} y={408} size={18} color={MANIM.muted}>
              Na⁺ pequeño (azul) · Cl⁻ grande (verde) · cada ion rodeado por iones de signo contrario
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Enlace covalente múltiple ───────────── */

export type CovMol = { name: string; a: string; v: number; pairs: number; x: number; color: string };

const pairDots = (x: number, y: number, vertical: boolean, color: string, key: string) => (
  <g key={key}>
    <circle cx={x - (vertical ? 0 : 5)} cy={y - (vertical ? 5 : 0)} r={5} fill={color} />
    <circle cx={x + (vertical ? 0 : 5)} cy={y + (vertical ? 5 : 0)} r={5} fill={color} />
  </g>
);

/** Molécula diatómica homonuclear con pares no enlazantes (gris) y compartidos (amarillo o rayas). */
export function LewisMolecule({ m, lines, cy = 200 }: { m: CovMol; lines: boolean; cy?: number }) {
  const lonePairs = (m.v - m.pairs) / 2;
  const slots = [
    { dx: 0, dy: -38, vert: false },
    { dx: 0, dy: 38, vert: false },
  ];
  const atom = (side: -1 | 1) => {
    const ax = m.x + side * 58;
    const outer = { dx: side * 38, dy: 0, vert: true };
    const list = lonePairs === 3 ? [...slots, outer] : lonePairs === 2 ? slots : [outer];
    return (
      <g key={side}>
        <circle cx={ax} cy={cy} r={30} fill={m.color} fillOpacity={0.14} stroke={m.color} strokeWidth={2.5} />
        <Txt x={ax} y={cy + 9} size={28} color={m.color} weight={800}>
          {m.a}
        </Txt>
        {list.slice(0, lonePairs).map((sl, i) => pairDots(ax + sl.dx, cy + sl.dy, sl.vert, MANIM.muted, `l${i}`))}
      </g>
    );
  };
  const shared = Array.from({ length: m.pairs }, (_, j) => (j - (m.pairs - 1) / 2) * 16);
  return (
    <g>
      {atom(-1)}
      {atom(1)}
      {lines ? (
        <g>
          {shared.map((_, j) => (
            <line key={j} x1={m.x - 30} y1={cy + (j - (m.pairs - 1) / 2) * 11} x2={m.x + 30} y2={cy + (j - (m.pairs - 1) / 2) * 11} stroke={MANIM.yellow} strokeWidth={4} strokeLinecap="round" />
          ))}
        </g>
      ) : (
        shared.map((dx, j) => pairDots(m.x + dx * 0.7, cy, true, MANIM.yellow, `s${j}`))
      )}
      <Txt x={m.x} y={cy - 92} size={26} color={m.color}>
        {m.name}
      </Txt>
      <Txt x={m.x} y={cy + 100} size={19} color={MANIM.yellow}>
        {m.pairs === 1 ? "enlace simple" : m.pairs === 2 ? "enlace doble" : "enlace triple"}
      </Txt>
      <Txt x={m.x} y={cy + 126} size={17} color={MANIM.muted}>
        {m.pairs} par{m.pairs > 1 ? "es" : ""} compartido{m.pairs > 1 ? "s" : ""}
      </Txt>
    </g>
  );
}

export function buildCovalenteMultiple(): AnimBuild {
  const mols: CovMol[] = [
    { name: "F₂", a: "F", v: 7, pairs: 1, x: 140, color: MANIM.green },
    { name: "O₂", a: "O", v: 6, pairs: 2, x: 400, color: MANIM.blue },
    { name: "N₂", a: "N", v: 5, pairs: 3, x: 660, color: MANIM.purple },
  ];
  return {
    label: "Enlace covalente simple, doble y triple en F₂, O₂ y N₂",
    beatMs: 4500,
    captions: [
      "El flúor tiene $7$ electrones de valencia y le falta $1$. Cada átomo **aporta un electrón** y comparten un par: **enlace simple** F–F. Ahora los dos cuentan $8$ electrones.",
      "El oxígeno tiene $6$ y le faltan $2$: comparten **dos pares**. Es un **enlace doble**, O=O.",
      "El nitrógeno tiene $5$ y le faltan $3$: comparten **tres pares**. Es un **enlace triple**, N≡N. Cada átomo completa su octeto (configuración de gas noble).",
      "En la fórmula cada par compartido se dibuja como una raya. Es un enlace **direccional**: los electrones se comparten entre dos átomos concretos.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat >= 0}>
          <LewisMolecule m={mols[0]!} lines={beat >= 3} />
        </Fade>
        <Fade show={beat >= 1} dy={16}>
          <LewisMolecule m={mols[1]!} lines={beat >= 3} />
        </Fade>
        <Fade show={beat >= 2} dy={16}>
          <LewisMolecule m={mols[2]!} lines={beat >= 3} />
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={400} y={400} size={18} color={MANIM.muted}>
            Amarillo: pares compartidos · gris: pares no enlazantes
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Hibridación sp³ del carbono y el diamante ───────────── */

export function buildHibridacionSp3(): AnimBuild {
  const bx = (i: number) => 130 + i * 110;
  const by = 170;
  const BW = 84;
  const BH = 64;
  const labels = ["1s", "2s", "2p", "2p", "2p"];
  const arrows = (beat: number): string[][] => {
    if (beat === 0) {
      return [["↑", "↓"], ["↑", "↓"], ["↑"], ["↑"], []];
    }
    if (beat === 1) {
      return [["↑", "↓"], ["↑"], ["↑"], ["↑"], ["↑"]];
    }
    return [["↑", "↓"], ["↑"], ["↑"], ["↑"], ["↑"]];
  };
  const Box = ({ i, beat }: { i: number; beat: number }) => {
    const hybrid = beat >= 2 && i >= 1;
    const color = hybrid ? MANIM.green : i === 0 ? MANIM.blue : i === 1 ? MANIM.orange : MANIM.purple;
    return (
      <g>
        <rect className="anim-t" x={bx(i)} y={by} width={BW} height={BH} rx={6} fill={color} fillOpacity={0.18} stroke={color} strokeWidth={3} />
        <Txt x={bx(i) + BW / 2} y={by + BH + 30} size={20} color={color}>
          {hybrid ? "sp³" : labels[i]!}
        </Txt>
        {arrows(beat)[i]!.map((a, k, arr) => (
          <Txt key={k} x={bx(i) + BW / 2 + (arr.length === 2 ? (k === 0 ? -16 : 16) : 0)} y={by + 44} size={40} color={MANIM.ink} weight={700}>
            {a}
          </Txt>
        ))}
      </g>
    );
  };
  const cx = 540;
  const cyy = 225;
  const V = [
    [cx, 90],
    [cx - 130, 330],
    [cx + 150, 335],
    [cx + 95, 200],
  ] as const;
  return {
    label: "Hibridación sp³ del carbono: de la configuración electrónica al tetraedro del diamante",
    beatMs: 4800,
    captions: [
      "El carbono (nivel más bajo) es $1s^2\\,2s^2\\,2p^2$: solo tiene **dos orbitales $2p$ semillenos**, así que debería formar solo dos enlaces.",
      "Pero el carbono forma **cuatro** enlaces. Un electrón $2s$ **se promueve** a un orbital $2p$ libre: hace falta algo de energía, y queda cuatro orbitales semillenos.",
      "El orbital $2s$ y los tres $2p$ se mezclan: **hibridación**. Resultan **cuatro orbitales $sp^3$ equivalentes**, cada uno con un electrón. La energía que se libera al enlazar compensa la de la promoción.",
      "Los cuatro enlaces se orientan lo más lejos posible entre sí: un **tetraedro** con ángulos de $109{,}5°$. Esa geometría da el **diamante**: duro, muy estable y con $T_f$ de $3\\,550$ °C.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 2}>
          <Txt x={400} y={64} size={24} color={MANIM.yellow}>
            {beat === 0 ? "Carbono en estado fundamental" : beat === 1 ? "Promoción 2s → 2p" : "Cuatro orbitales híbridos sp³"}
          </Txt>
          {labels.map((_, i) => (
            <Box key={i} i={i} beat={beat} />
          ))}
          <Fade show={beat === 1}>
            <path d={`M ${bx(1) + BW / 2} ${by - 8} Q ${(bx(1) + bx(4)) / 2 + BW / 2} ${by - 90} ${bx(4) + BW / 2} ${by - 8}`} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
            <polygon points={`${bx(4) + BW / 2},${by - 6} ${bx(4) + BW / 2 - 9},${by - 22} ${bx(4) + BW / 2 + 5},${by - 22}`} fill={MANIM.yellow} />
            <Txt x={(bx(1) + bx(4)) / 2 + BW / 2} y={by - 78} size={19} color={MANIM.yellow}>
              hace falta energía
            </Txt>
          </Fade>
          <Fade show={beat === 0}>
            <Txt x={bx(2) + 110} y={by + 130} size={20} color={MANIM.red}>
              solo 2 orbitales semillenos
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={bx(2) + 110} y={by + 130} size={20} color={MANIM.green}>
              ¡4 enlaces equivalentes!
            </Txt>
          </Fade>
        </Fade>
        <Fade show={beat === 3}>
          {V.map(([x, y], i) => (
            <g key={i}>
              <line x1={cx} y1={cyy} x2={x} y2={y} stroke={MANIM.green} strokeWidth={5} strokeLinecap="round" strokeDasharray={i === 3 ? "8 6" : undefined} />
              <circle cx={x} cy={y} r={20} fill={MANIM.blue} fillOpacity={0.9} />
            </g>
          ))}
          <line x1={V[0][0]} y1={V[0][1]} x2={V[1][0]} y2={V[1][1]} stroke={MANIM.muted} strokeWidth={1.5} strokeOpacity={0.5} />
          <line x1={V[1][0]} y1={V[1][1]} x2={V[2][0]} y2={V[2][1]} stroke={MANIM.muted} strokeWidth={1.5} strokeOpacity={0.5} />
          <line x1={V[0][0]} y1={V[0][1]} x2={V[2][0]} y2={V[2][1]} stroke={MANIM.muted} strokeWidth={1.5} strokeOpacity={0.5} />
          <line x1={V[3][0]} y1={V[3][1]} x2={V[0][0]} y2={V[0][1]} stroke={MANIM.muted} strokeWidth={1.5} strokeOpacity={0.5} strokeDasharray="4 4" />
          <circle cx={cx} cy={cyy} r={26} fill={MANIM.orange} />
          <Txt x={cx} y={cyy + 8} size={22} color={MANIM.surface} weight={800}>
            C
          </Txt>
          <path d={`M ${cx - 55} ${cyy + 88} A 90 90 0 0 0 ${cx + 62} ${cyy + 98}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={cx + 4} y={cyy + 136} size={22} color={MANIM.yellow}>
            109,5°
          </Txt>
          <Txt x={40} y={80} size={22} color={MANIM.green} anchor="start">
            Diamante: C en tetraedro
          </Txt>
          <Txt x={40} y={108} size={17} color={MANIM.muted} anchor="start">
            4 enlaces sp³ a la misma distancia
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Enlace metálico: nube de electrones ───────────── */

export function buildMetalicoNube(): AnimBuild {
  const cols = 6;
  const rows = 4;
  const SX = 82;
  const SY = 70;
  const ox = 150;
  const oy = 120;
  const ions = Array.from({ length: cols * rows }, (_, i) => ({ c: i % cols, r: Math.floor(i / cols), i }));
  const electrons = Array.from({ length: 30 }, (_, i) => i);
  const epos = (i: number, beat: number) => {
    if (beat === 0) {
      const ion = ions[i % ions.length]!;
      const a = rnd(i, 3) * Math.PI * 2;
      return { x: ox + ion.c * SX + Math.cos(a) * 30, y: oy + ion.r * SY + Math.sin(a) * 30 };
    }
    const base = { x: ox - 20 + rnd(i, 1) * (cols * SX), y: oy - 28 + rnd(i, 2) * (rows * SY - 10) };
    return beat === 2 ? { x: base.x + 38, y: base.y } : base;
  };
  const shift = (r: number, beat: number) => (beat === 3 ? (r <= 1 ? 40 : 0) : 0);
  return {
    label: "Enlace metálico: iones positivos en una nube de electrones de valencia",
    beatMs: 4500,
    captions: [
      "En un metal los átomos están muy juntos y sus electrones de valencia, atraídos por varios núcleos vecinos, **no pertenecen a un único átomo**.",
      "Podemos imaginar **cationes** (átomos sin sus electrones de valencia) ordenados en una red, inmersos en una **nube electrónica** de baja densidad que los une. El enlace no es direccional.",
      "Los electrones se mueven con facilidad: al aplicar una tensión o un gradiente de temperatura se desplazan y transportan carga y calor. De ahí la **alta conductividad eléctrica y térmica**.",
      "Si se empuja una capa de cationes, resbala sobre otra y la nube los sigue manteniendo unidos: el metal se **deforma sin romperse**. Por eso son maleables y dúctiles.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={ox - 52} y={oy - 52} width={cols * SX + 10} height={rows * SY + 14} rx={14} fill={MANIM.blue} fillOpacity={beat >= 1 ? 0.1 : 0} className="anim-t" />
        {ions.map(({ c, r, i }) => (
          <g key={i} className="anim-t" style={{ transform: `translate(${shift(r, beat)}px, 0px)` }}>
            <circle cx={ox + c * SX} cy={oy + r * SY} r={18} fill={MANIM.red} fillOpacity={0.85} />
            <Txt x={ox + c * SX} y={oy + r * SY + 6} size={20} color={MANIM.surface} weight={800}>
              +
            </Txt>
          </g>
        ))}
        {electrons.map((i) => {
          const p = epos(i, beat);
          return <circle key={i} className="anim-t" cx={0} cy={0} r={4.5} fill={MANIM.blue} style={{ transform: `translate(${p.x}px, ${p.y}px)` }} />;
        })}
        <Fade show={beat === 1}>
          <Txt x={400} y={52} size={22} color={MANIM.blue}>
            nube de electrones de valencia
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <line x1={ox - 40} y1={400} x2={ox + cols * SX - 40} y2={400} stroke={MANIM.yellow} strokeWidth={4} />
          <polygon points={`${ox + cols * SX - 30},400 ${ox + cols * SX - 46},392 ${ox + cols * SX - 46},408`} fill={MANIM.yellow} />
          <Txt x={ox + (cols * SX) / 2 - 40} y={388} size={19} color={MANIM.yellow}>
            los electrones se desplazan → corriente
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <line x1={ox - 54} y1={oy + SY * 1.5} x2={ox + cols * SX} y2={oy + SY * 1.5} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="8 6" />
          <Txt x={400} y={400} size={19} color={MANIM.yellow}>
            capas que resbalan sin que se rompa el enlace
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Agua: dipolo permanente y puente de hidrógeno ───────────── */

const PHI = 52.5;
const HL = 50;

function Water({ x, y, rot, scale = 1, charges = false }: { x: number; y: number; rot: number; scale?: number; charges?: boolean }) {
  const hx = HL * Math.sin(rad(PHI));
  const hy = HL * Math.cos(rad(PHI));
  return (
    <g style={{ transform: `translate(${x}px, ${y}px) rotate(${rot}deg) scale(${scale})` }}>
      <line x1={0} y1={0} x2={hx} y2={hy} stroke={MANIM.muted} strokeWidth={5} />
      <line x1={0} y1={0} x2={-hx} y2={hy} stroke={MANIM.muted} strokeWidth={5} />
      <circle cx={0} cy={0} r={24} fill={MANIM.blue} />
      <circle cx={hx} cy={hy} r={13} fill={MANIM.red} />
      <circle cx={-hx} cy={hy} r={13} fill={MANIM.red} />
      <text x={0} y={7} textAnchor="middle" fontSize={20} fontWeight={800} fill={MANIM.surface}>
        O
      </text>
      {charges ? (
        <g>
          <text x={0} y={-34} textAnchor="middle" fontSize={22} fontWeight={700} fill={MANIM.blue}>
            δ−
          </text>
          <text x={hx + 20} y={hy + 24} textAnchor="middle" fontSize={20} fontWeight={700} fill={MANIM.red}>
            δ+
          </text>
          <text x={-hx - 20} y={hy + 24} textAnchor="middle" fontSize={20} fontWeight={700} fill={MANIM.red}>
            δ+
          </text>
        </g>
      ) : null}
    </g>
  );
}

export function buildAguaPuenteH(): AnimBuild {
  // Cuatro moléculas en anillo: el H₁ de cada una apunta al O de la siguiente.
  const WS = 1.5;
  const P = [
    [290, 120],
    [510, 120],
    [510, 300],
    [290, 300],
  ] as const;
  const theta = [0, 90, 180, 270];
  const rot = theta.map((t) => t - (90 - PHI));
  const tip = (i: number) => [P[i]![0] + HL * WS * Math.cos(rad(theta[i]!)), P[i]![1] + HL * WS * Math.sin(rad(theta[i]!))] as const;
  const bond = (i: number) => {
    const a = tip(i);
    const b = P[(i + 1) % 4]!;
    const d = Math.hypot(b[0] - a[0], b[1] - a[1]);
    const ux = (b[0] - a[0]) / d;
    const uy = (b[1] - a[1]) / d;
    return { x1: a[0] + ux * 20, y1: a[1] + uy * 20, x2: b[0] - ux * 38, y2: b[1] - uy * 38 };
  };
  return {
    label: "Dipolo permanente de la molécula de agua y puentes de hidrógeno",
    beatMs: 4800,
    captions: [
      "La molécula de agua no es lineal: forma un ángulo de $105°$. Los electrones se desplazan hacia el oxígeno, que queda con **carga parcial negativa** ($\\delta^-$), y los hidrógenos con carga parcial positiva ($\\delta^+$).",
      "Es un **dipolo permanente**: aunque la molécula es neutra, tiene una zona negativa y otra positiva, como un imán eléctrico.",
      "El hidrógeno ($\\delta^+$) de una molécula atrae al oxígeno ($\\delta^-$) de otra: es el **puente de hidrógeno**, un enlace secundario más fuerte que las fuerzas de Van der Waals.",
      "Cada molécula puede enlazarse con varias vecinas. Energía de enlace: $12{,}2$ kcal/mol en el agua, frente a $7{,}4$ en $Cl_2$ (Van der Waals) y más de $100$ en un enlace primario.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat <= 1}>
          <Water x={400} y={170} rot={0} scale={2.2} charges />
          <path d="M 450 275 A 90 90 0 0 0 350 275" fill="none" stroke={MANIM.yellow} strokeWidth={2.5} />
          <Txt x={400} y={308} size={22} color={MANIM.yellow}>
            105°
          </Txt>
          <Fade show={beat === 1}>
            <line x1={400} y1={60} x2={400} y2={320} stroke={MANIM.orange} strokeWidth={3} strokeDasharray="8 6" />
            <Txt x={575} y={150} size={20} color={MANIM.orange} anchor="start">
              dipolo permanente
            </Txt>
            <Txt x={575} y={176} size={16} color={MANIM.muted} anchor="start">
              − en el O, + en los H
            </Txt>
          </Fade>
        </Fade>
        <Fade show={beat >= 2}>
          {[0, 1, 2, 3].map((i) => (
            <Fade key={i} show={i < 2 || beat >= 3}>
              <Water x={P[i]![0]} y={P[i]![1]} rot={rot[i]!} scale={WS} />
            </Fade>
          ))}
          <Fade show={beat >= 2}>
            <line {...bond(0)} stroke={MANIM.yellow} strokeWidth={3.5} strokeDasharray="7 6" />
          </Fade>
          <Fade show={beat >= 3}>
            {[1, 2, 3].map((i) => (
              <line key={i} {...bond(i)} stroke={MANIM.yellow} strokeWidth={3.5} strokeDasharray="7 6" />
            ))}
          </Fade>
          <Txt x={400} y={52} size={22} color={MANIM.yellow}>
            ---  puente de hidrógeno
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Sólido cristalino frente a amorfo ───────────── */

export function buildCristalAmorfo(): AnimBuild {
  const cols = 6;
  const rows = 5;
  const S = 46;
  const lx = 90;
  const rx = 470;
  const oy = 100;
  const cell = { c: 1, r: 2 };
  const pts = Array.from({ length: cols * rows }, (_, i) => ({ c: i % cols, r: Math.floor(i / cols), i }));
  return {
    label: "Sólido cristalino con celda unitaria que se repite frente a sólido amorfo",
    beatMs: 4500,
    captions: [
      "En un **sólido cristalino** los átomos, iones o moléculas se colocan en posiciones ordenadas que se repiten en las tres dimensiones. Cada punto de la red tiene un entorno idéntico.",
      "Basta conocer una porción mínima: la **celda unitaria**. Al repetirla (trasladarla) en el espacio se reconstruye todo el cristal.",
      "En un **sólido amorfo** (como el vidrio) hay átomos y enlaces, pero **sin orden de largo alcance**: su estructura recuerda a la de un líquido «congelado».",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={lx + ((cols - 1) * S) / 2} y={52} size={22} color={MANIM.blue}>
          Cristalino
        </Txt>
        {pts.map(({ c, r, i }) => (
          <circle key={i} cx={lx + c * S} cy={oy + r * S} r={12} fill={MANIM.blue} fillOpacity={0.85} />
        ))}
        <rect
          className="anim-t"
          x={lx + cell.c * S}
          y={oy + cell.r * S}
          width={S}
          height={S}
          fill={MANIM.yellow}
          fillOpacity={0.22}
          stroke={MANIM.yellow}
          strokeWidth={3.5}
        />
        <Fade show={beat === 1}>
          {[
            [2, 2],
            [3, 2],
            [4, 2],
            [1, 1],
            [1, 0],
            [2, 1],
          ].map(([c, r]) => (
            <rect key={`${c}-${r}`} x={lx + c! * S} y={oy + r! * S} width={S} height={S} fill={MANIM.yellow} fillOpacity={0.12} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
          ))}
          <Txt x={lx + ((cols - 1) * S) / 2} y={oy + rows * S + 14} size={19} color={MANIM.yellow}>
            la celda unitaria se repite
          </Txt>
        </Fade>
        <Fade show={beat === 0}>
          <Txt x={lx + ((cols - 1) * S) / 2} y={oy + rows * S + 14} size={19} color={MANIM.muted}>
            orden de largo alcance
          </Txt>
        </Fade>
        <Fade show={beat === 2} dx={30}>
          <Txt x={rx + ((cols - 1) * S) / 2} y={52} size={22} color={MANIM.orange}>
            Amorfo
          </Txt>
          {pts.map(({ c, r, i }) => (
            <circle key={i} cx={rx + c * S + (rnd(i, 7) - 0.5) * 30} cy={oy + r * S + (rnd(i, 8) - 0.5) * 30} r={12} fill={MANIM.orange} fillOpacity={0.85} />
          ))}
          <Txt x={rx + ((cols - 1) * S) / 2} y={oy + rows * S + 14} size={19} color={MANIM.muted}>
            sin orden de largo alcance
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
