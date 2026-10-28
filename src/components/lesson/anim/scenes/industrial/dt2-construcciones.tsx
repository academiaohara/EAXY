import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

const RAD = Math.PI / 180;
const pts = (a: readonly Pt[]) => a.map((p) => p.join(",")).join(" ");

/** Intersección de las rectas p1p2 y p3p4 (null si son paralelas). */
export function cortaRectas(p1: Pt, p2: Pt, p3: Pt, p4: Pt): Pt | null {
  const d = (p1[0] - p2[0]) * (p3[1] - p4[1]) - (p1[1] - p2[1]) * (p3[0] - p4[0]);
  if (Math.abs(d) < 1e-9) return null;
  const a = p1[0] * p2[1] - p1[1] * p2[0];
  const b = p3[0] * p4[1] - p3[1] * p4[0];
  return [(a * (p3[0] - p4[0]) - (p1[0] - p2[0]) * b) / d, (a * (p3[1] - p4[1]) - (p1[1] - p2[1]) * b) / d];
}
/** Puntos de corte de dos circunferencias (null si no se cortan). */
export function cortaCircunferencias(c1: Pt, r1: number, c2: Pt, r2: number): [Pt, Pt] | null {
  const d = Math.hypot(c2[0] - c1[0], c2[1] - c1[1]);
  if (d > r1 + r2 || d < Math.abs(r1 - r2) || d === 0) return null;
  const a = (r1 * r1 - r2 * r2 + d * d) / (2 * d);
  const h = Math.sqrt(Math.max(0, r1 * r1 - a * a));
  const ux = (c2[0] - c1[0]) / d;
  const uy = (c2[1] - c1[1]) / d;
  const m: Pt = [c1[0] + a * ux, c1[1] + a * uy];
  return [[m[0] - h * uy, m[1] + h * ux], [m[0] + h * uy, m[1] - h * ux]];
}
/** Alarga el segmento ab por ambos lados una fracción k de su longitud. */
const alarga = (a: Pt, b: Pt, k: number): [Pt, Pt] => [[a[0] - k * (b[0] - a[0]), a[1] - k * (b[1] - a[1])], [b[0] + k * (b[0] - a[0]), b[1] + k * (b[1] - a[1])]];

/* ───────────── Homología: puntos homólogos por el eje y el centro ───────────── */

const EY = 340;
const O: Pt = [250, 60];
const A: Pt = [300, 250];
const B: Pt = [470, 215];
const C: Pt = [390, 140];
const A2: Pt = [O[0] + 1.3 * (A[0] - O[0]), O[1] + 1.3 * (A[1] - O[1])];
const EJE_A: Pt = [40, EY];
const EJE_B: Pt = [760, EY];
const M = cortaRectas(A, B, EJE_A, EJE_B)!;
const N = cortaRectas(A, C, EJE_A, EJE_B)!;
const B2 = cortaRectas(O, B, M, A2)!;
const CH2 = cortaRectas(O, C, N, A2)!;

export function buildHomologiaConstruccion(): AnimBuild {
  return {
    label: "Construcción de una figura homóloga a partir del eje, el centro y un par de puntos homólogos",
    beatMs: 5600,
    captions: [
      "Datos: el **eje** e, el **centro O**, el triángulo **ABC** y el homólogo **A′** de A, que está **alineado con O y A**.",
      "Para hallar **B′**: se prolonga el lado **AB** hasta cortar al **eje** en **M**. Los puntos del eje son **dobles**.",
      "La recta homóloga de AB pasa por **M** (punto doble) y por **A′**: es la recta **MA′**.",
      "**B′** está alineado con **O y B**, y sobre la recta MA′: es su **intersección**.",
      "Igual con **C**: AC corta al eje en **N**; la recta **NA′** corta al rayo **OC** en **C′**.",
      "Se unen **A′B′C′**: es la figura **homóloga** de ABC. Sus lados cortan al eje en los mismos puntos que los lados de ABC.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={EJE_A} b={EJE_B} color={MANIM.ink} width={3.5} />
        <Txt x={725} y={EY + 28} size={22} color={MANIM.ink}>eje e</Txt>
        <polygon points={pts([A, B, C])} fill={MANIM.blue} fillOpacity={0.18} stroke={MANIM.blue} strokeWidth={3} strokeLinejoin="round" />
        <Dot p={O} color={MANIM.red} r={7} />
        <Txt x={O[0]} y={O[1] - 14} size={22} color={MANIM.red}>O</Txt>
        <Seg a={O} b={A2} color={MANIM.muted} width={1.6} dashed />
        {[["A", A, -18, 0], ["B", B, 16, 6], ["C", C, 0, -12]].map(([t, p, dx, dy]) => (
          <g key={String(t)}>
            <Dot p={p as Pt} color={MANIM.blue} r={5} />
            <Txt x={(p as Pt)[0] + (dx as number)} y={(p as Pt)[1] + (dy as number) + 6} size={20} color={MANIM.blue}>{String(t)}</Txt>
          </g>
        ))}
        <Dot p={A2} color={MANIM.orange} r={5} />
        <Txt x={A2[0] + 18} y={A2[1] + 6} size={20} color={MANIM.orange}>A′</Txt>
        <Fade show={beat >= 1}>
          <Seg a={A} b={M} color={MANIM.purple} width={2} dashed />
          <Seg a={A} b={B} color={MANIM.purple} width={2} dashed />
          <Dot p={M} color={MANIM.yellow} r={6} />
          <Txt x={M[0]} y={M[1] + 26} size={20} color={MANIM.yellow}>M</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg {...{ a: M, b: A2 }} color={MANIM.orange} width={2.2} dashed />
          <Seg a={A2} b={B2} color={MANIM.orange} width={2.2} dashed />
        </Fade>
        <Fade show={beat >= 3}>
          <Seg a={O} b={B2} color={MANIM.muted} width={1.6} dashed />
          <Dot p={B2} color={MANIM.orange} r={5} />
          <Txt x={B2[0] + 18} y={B2[1] + 6} size={20} color={MANIM.orange}>B′</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <Seg a={A} b={N} color={MANIM.purple} width={2} dashed />
          <Dot p={N} color={MANIM.yellow} r={6} />
          <Txt x={N[0]} y={N[1] + 26} size={20} color={MANIM.yellow}>N</Txt>
          <Seg a={N} b={CH2} color={MANIM.orange} width={2.2} dashed />
          <Seg a={O} b={CH2} color={MANIM.muted} width={1.6} dashed />
          <Dot p={CH2} color={MANIM.orange} r={5} />
          <Txt x={CH2[0] + 18} y={CH2[1] + 6} size={20} color={MANIM.orange}>C′</Txt>
        </Fade>
        <Fade show={beat >= 5}>
          <polygon points={pts([A2, B2, CH2])} fill={MANIM.orange} fillOpacity={0.22} stroke={MANIM.orange} strokeWidth={3.5} strokeLinejoin="round" />
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Elipse por afinidad: dos circunferencias concéntricas ───────────── */

const EC: Pt = [400, 210];
const RA = 170;
const RB = 100;
const ang = (deg: number): Pt => [Math.cos(deg * RAD), -Math.sin(deg * RAD)];
const pg = (deg: number): Pt => [EC[0] + RA * ang(deg)[0], EC[1] + RA * ang(deg)[1]];
const pq = (deg: number): Pt => [EC[0] + RB * ang(deg)[0], EC[1] + RB * ang(deg)[1]];
const pe = (deg: number): Pt => [pg(deg)[0], pq(deg)[1]];
const ANG1 = 40;
const MAS = [0, 20, 65, 90, 110, 130, 155, 180, 200, 225, 250, 270, 290, 315, 340];

export function buildElipseCircunferencias(): AnimBuild {
  return {
    label: "Construcción de una elipse punto a punto con las circunferencias de diámetros 2a y 2b",
    beatMs: 5400,
    captions: [
      "Se dibujan los **ejes** y dos **circunferencias concéntricas**: de radio **a** (semieje mayor) y de radio **b** (semieje menor).",
      "Se traza un **radio cualquiera**: corta a la circunferencia mayor en **P** y a la menor en **Q**.",
      "Por **P** se baja la **vertical** y por **Q** se traza la **horizontal**: se cortan en **E**, un **punto de la elipse**.",
      "Repitiendo con **otros radios** se obtienen más puntos. Cada uno es el **afín** del punto de la circunferencia mayor, con razón **b/a**.",
      "Se unen los puntos con una **curva continua**: es la **elipse** de semiejes a y b. Los extremos del eje mayor y menor son sus **vértices**.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={[EC[0] - RA - 40, EC[1]]} b={[EC[0] + RA + 40, EC[1]]} color={MANIM.muted} width={1.6} dashed />
        <Seg a={[EC[0], EC[1] - RA - 20]} b={[EC[0], EC[1] + RA + 20]} color={MANIM.muted} width={1.6} dashed />
        <circle cx={EC[0]} cy={EC[1]} r={RA} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <circle cx={EC[0]} cy={EC[1]} r={RB} fill="none" stroke={MANIM.green} strokeWidth={3} />
        <Txt x={EC[0] + RA + 24} y={EC[1] - 8} size={20} color={MANIM.blue}>a</Txt>
        <Txt x={EC[0] + 16} y={EC[1] - RB + 24} size={20} color={MANIM.green}>b</Txt>
        <Fade show={beat >= 1}>
          <Seg a={EC} b={pg(ANG1)} color={MANIM.ink} width={2.4} />
          <Dot p={pg(ANG1)} color={MANIM.blue} r={6} />
          <Dot p={pq(ANG1)} color={MANIM.green} r={6} />
          <Txt x={pg(ANG1)[0] + 16} y={pg(ANG1)[1] - 6} size={22} color={MANIM.blue}>P</Txt>
          <Txt x={pq(ANG1)[0] + 6} y={pq(ANG1)[1] + 26} size={22} color={MANIM.green}>Q</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={pg(ANG1)} b={pe(ANG1)} color={MANIM.purple} width={2.2} dashed />
          <Seg a={pq(ANG1)} b={pe(ANG1)} color={MANIM.purple} width={2.2} dashed />
          <Dot p={pe(ANG1)} color={MANIM.orange} r={7} />
          <Txt x={pe(ANG1)[0] + 16} y={pe(ANG1)[1] - 8} size={22} color={MANIM.orange}>E</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          {MAS.map((d) => (
            <g key={d}>
              <Seg a={pg(d)} b={pe(d)} color={MANIM.muted} width={1.1} dashed />
              <Seg a={pq(d)} b={pe(d)} color={MANIM.muted} width={1.1} dashed />
              <Dot p={pe(d)} color={MANIM.orange} r={4} />
            </g>
          ))}
        </Fade>
        <Fade show={beat >= 4}>
          <ellipse cx={EC[0]} cy={EC[1]} rx={RA} ry={RB} fill={MANIM.orange} fillOpacity={0.12} stroke={MANIM.orange} strokeWidth={4} />
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Parábola: foco y directriz ───────────── */

const PX0 = 180; // vértice
const PF_: number = 60; // distancia foco–vértice
const FOCO: Pt = [PX0 + PF_, 210];
const DIR_X = PX0 - PF_;
const parabolaY = (x: number) => Math.sqrt(Math.max(0, 4 * PF_ * (x - PX0)));
const PARAMS = [80, 120, 160, 200];

export function buildParabolaFocoDirectriz(): AnimBuild {
  return {
    label: "Construcción de una parábola punto a punto a partir del foco y la directriz",
    beatMs: 5400,
    captions: [
      "Datos: la **directriz** d, el **foco F** y el **eje** (perpendicular a d por F). El **vértice V** está a mitad de camino.",
      "Se traza una **paralela a la directriz** a la distancia **d₁** (hacia el lado del foco).",
      "Con el compás en **F** y radio **d₁** se cortan los puntos de esa paralela: **equidistan** de F y de d. Son **dos puntos** de la parábola.",
      "Repitiendo con **distintas distancias** se obtienen más puntos, simétricos respecto del eje.",
      "Se unen los puntos con una **curva continua**: es la **parábola** de foco F y directriz d.",
    ],
    render: (beat) => {
      const d1 = PARAMS[1]!;
      const x1 = DIR_X + d1;
      const y1 = Math.sqrt(d1 * d1 - (x1 - FOCO[0]) ** 2);
      const curva: Pt[] = [];
      for (let i = -30; i <= 30; i++) {
        const y = (i / 30) * 196;
        curva.push([PX0 + (y * y) / (4 * PF_), 210 + y]);
      }
      return (
        <Canvas>
          <Seg a={[DIR_X, 20]} b={[DIR_X, 400]} color={MANIM.ink} width={3.5} />
          <Txt x={DIR_X + 4} y={16} size={20} color={MANIM.ink} anchor="start">directriz d</Txt>
          <Seg a={[DIR_X - 30, 210]} b={[760, 210]} color={MANIM.muted} width={1.6} dashed />
          <Dot p={FOCO} color={MANIM.yellow} r={7} />
          <Txt x={FOCO[0] + 4} y={FOCO[1] + 28} size={22} color={MANIM.yellow}>F</Txt>
          <Dot p={[PX0, 210]} color={MANIM.blue} r={5} />
          <Txt x={PX0 - 2} y={210 + 28} size={20} color={MANIM.blue}>V</Txt>
          <Fade show={beat >= 1}>
            <Seg a={[x1, 20]} b={[x1, 400]} color={MANIM.purple} width={2.2} dashed />
            <Seg a={[DIR_X, 360]} b={[x1, 360]} color={MANIM.purple} width={2.2} />
            <Txt x={(DIR_X + x1) / 2} y={382} size={20} color={MANIM.purple}>d₁</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <circle cx={FOCO[0]} cy={FOCO[1]} r={d1} fill="none" stroke={MANIM.green} strokeWidth={2} strokeDasharray="8 6" />
            <Dot p={[x1, 210 - y1]} color={MANIM.orange} r={6} />
            <Dot p={[x1, 210 + y1]} color={MANIM.orange} r={6} />
            <Seg a={FOCO} b={[x1, 210 - y1]} color={MANIM.green} width={2} />
          </Fade>
          <Fade show={beat >= 3}>
            {PARAMS.filter((d) => d !== d1).map((d) => {
              const x = DIR_X + d;
              const y = parabolaY(x);
              return (
                <g key={d}>
                  <Seg a={[x, 210 - y]} b={[x, 210 + y]} color={MANIM.muted} width={1.1} dashed />
                  <Dot p={[x, 210 - y]} color={MANIM.orange} r={4.5} />
                  <Dot p={[x, 210 + y]} color={MANIM.orange} r={4.5} />
                </g>
              );
            })}
          </Fade>
          <Fade show={beat >= 4}>
            <polyline points={pts(curva)} fill="none" stroke={MANIM.orange} strokeWidth={4} strokeLinejoin="round" />
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Eje radical con una circunferencia auxiliar ───────────── */

const C1: Pt = [230, 220];
const R1 = 110;
const C2: Pt = [520, 220];
const R2 = 90;
const C3: Pt = [380, 130];
const R3 = 130;
const X13 = cortaCircunferencias(C1, R1, C3, R3)!;
const X23 = cortaCircunferencias(C2, R2, C3, R3)!;
const MR = cortaRectas(X13[0], X13[1], X23[0], X23[1])!;

export function buildEjeRadicalConstruccion(): AnimBuild {
  return {
    label: "Construcción del eje radical de dos circunferencias con una auxiliar",
    beatMs: 5600,
    captions: [
      "Datos: dos circunferencias **C₁ y C₂**. Su **eje radical** es perpendicular a la **línea de centros**.",
      "Se traza una **circunferencia auxiliar C₃** que **corte a las dos**.",
      "El **eje radical de C₁ y C₃** es la recta que pasa por sus dos **puntos de corte** (la cuerda común).",
      "El **eje radical de C₂ y C₃** es la cuerda común de esas dos circunferencias.",
      "Las dos rectas se cortan en **M**: tiene la **misma potencia** respecto de las tres circunferencias (es su **centro radical**).",
      "Por **M** se traza la **perpendicular a la línea de centros**: es el **eje radical** de C₁ y C₂.",
    ],
    render: (beat) => {
      const l13 = alarga(X13[0], X13[1], 0.9);
      const l23 = alarga(X23[0], X23[1], 0.9);
      return (
        <Canvas>
          <circle cx={C1[0]} cy={C1[1]} r={R1} fill={MANIM.blue} fillOpacity={0.1} stroke={MANIM.blue} strokeWidth={3} />
          <circle cx={C2[0]} cy={C2[1]} r={R2} fill={MANIM.orange} fillOpacity={0.1} stroke={MANIM.orange} strokeWidth={3} />
          <Seg a={C1} b={C2} color={MANIM.muted} width={1.6} dashed />
          <Dot p={C1} color={MANIM.blue} r={5} />
          <Dot p={C2} color={MANIM.orange} r={5} />
          <Txt x={C1[0] - 16} y={C1[1] + 26} size={20} color={MANIM.blue}>C₁</Txt>
          <Txt x={C2[0] + 18} y={C2[1] + 26} size={20} color={MANIM.orange}>C₂</Txt>
          <Fade show={beat >= 1}>
            <circle cx={C3[0]} cy={C3[1]} r={R3} fill="none" stroke={MANIM.green} strokeWidth={2.6} strokeDasharray="9 6" />
            <Txt x={C3[0]} y={C3[1] - R3 - 10} size={20} color={MANIM.green}>C₃ (auxiliar)</Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Seg a={l13[0]} b={l13[1]} color={MANIM.purple} width={2.4} />
            <Dot p={X13[0]} color={MANIM.purple} r={5} />
            <Dot p={X13[1]} color={MANIM.purple} r={5} />
          </Fade>
          <Fade show={beat >= 3}>
            <Seg a={l23[0]} b={l23[1]} color={MANIM.yellow} width={2.4} />
            <Dot p={X23[0]} color={MANIM.yellow} r={5} />
            <Dot p={X23[1]} color={MANIM.yellow} r={5} />
          </Fade>
          <Fade show={beat >= 4}>
            <Dot p={MR} color={MANIM.red} r={8} />
            <Txt x={MR[0] + 18} y={MR[1] + 6} size={22} color={MANIM.red}>M</Txt>
          </Fade>
          <Fade show={beat >= 5}>
            <Seg a={[MR[0], 10]} b={[MR[0], 410]} color={MANIM.ink} width={4} />
            <Txt x={MR[0] + 10} y={32} size={20} color={MANIM.ink} anchor="start">eje radical</Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Abatimiento de un punto: triángulo de abatimiento ───────────── */

const CH_Y = 90;
const PH_: Pt = [300, 90 + 120];
const FOOT: Pt = [300, CH_Y];
const COTA = 150;
const ZP: Pt = [PH_[0] + COTA, PH_[1]];
const HIP = Math.hypot(PH_[1] - CH_Y, COTA);
const P0: Pt = [300, CH_Y + HIP];

export function buildAbatimientoPunto(): AnimBuild {
  return {
    label: "Abatimiento de un punto de un plano sobre el PH con el triángulo de abatimiento",
    beatMs: 5600,
    captions: [
      "Se tiene la **charnela** (traza horizontal del plano) y la **proyección horizontal P′** del punto. La perpendicular a la charnela por P′ la corta en **F**.",
      "Por **P′** se lleva, perpendicularmente a **P′F**, la **cota** de P (su distancia al PH): se obtiene el punto **Z**.",
      "El segmento **FZ** es la **hipotenusa**: la **distancia real** de P a la charnela (triángulo rectángulo de catetos P′F y la cota).",
      "Con el compás en **F** y radio **FZ** se lleva esa distancia sobre la perpendicular a la charnela: aparece **P₀**, el punto **abatido**.",
      "Hemos obtenido **P₀**: la posición de P cuando el plano gira sobre su charnela hasta coincidir con el PH.",
    ],
    render: (beat) => (
      <Canvas>
        <Seg a={[60, CH_Y]} b={[740, CH_Y]} color={MANIM.yellow} width={4} />
        <Txt x={640} y={CH_Y - 12} size={20} color={MANIM.yellow}>charnela (traza)</Txt>
        <Dot p={FOOT} color={MANIM.yellow} r={6} />
        <Txt x={FOOT[0] - 18} y={FOOT[1] - 10} size={20} color={MANIM.yellow}>F</Txt>
        <Seg a={FOOT} b={PH_} color={MANIM.muted} width={2.2} dashed />
        <Dot p={PH_} color={MANIM.orange} r={7} />
        <Txt x={PH_[0] - 22} y={PH_[1] + 6} size={22} color={MANIM.orange}>P′</Txt>
        <Fade show={beat >= 1}>
          <Seg a={PH_} b={ZP} color={MANIM.blue} width={3} />
          <Dot p={ZP} color={MANIM.blue} r={6} />
          <Txt x={ZP[0] + 22} y={ZP[1] + 6} size={22} color={MANIM.blue}>Z</Txt>
          <Txt x={(PH_[0] + ZP[0]) / 2} y={PH_[1] + 28} size={20} color={MANIM.blue}>cota</Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <Seg a={FOOT} b={ZP} color={MANIM.green} width={3.4} />
          <Txt x={(FOOT[0] + ZP[0]) / 2 + 16} y={(FOOT[1] + ZP[1]) / 2 - 8} size={20} color={MANIM.green} anchor="start">distancia real</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <path d={`M ${ZP[0]} ${ZP[1]} A ${HIP} ${HIP} 0 0 1 ${P0[0]} ${P0[1]}`} fill="none" stroke={MANIM.green} strokeWidth={2.4} strokeDasharray="8 6" />
          <Seg a={FOOT} b={P0} color={MANIM.muted} width={2.2} dashed />
        </Fade>
        <Fade show={beat >= 4}>
          <Dot p={P0} color={MANIM.green} r={8} />
          <Txt x={P0[0] - 24} y={P0[1] + 8} size={24} color={MANIM.green}>P₀</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Desarrollo de un cono ───────────── */

const CONO_R = 60;
const CONO_H = 200;
const CONO_G = Math.hypot(CONO_R, CONO_H);
const CONO_AP: Pt = [140, 60];
const SEC_C: Pt = [540, 40];
const SEC_ANG = (360 * CONO_R) / CONO_G;
const sectorPt = (deg: number): Pt => [SEC_C[0] + CONO_G * Math.cos(deg * RAD), SEC_C[1] + CONO_G * Math.sin(deg * RAD)];

export function buildDesarrolloConoDt2(): AnimBuild {
  const a0 = 90 - SEC_ANG / 2;
  const a1 = 90 + SEC_ANG / 2;
  const base: Pt = [CONO_AP[0], CONO_AP[1] + CONO_H];
  return {
    label: "Desarrollo de un cono de revolución: un sector circular",
    beatMs: 5600,
    captions: [
      "Un **cono** de radio **R** y altura **H**. Su **generatriz** mide **g = √(R² + H²)**.",
      "Se **corta** la superficie lateral por una **generatriz** y se **extiende** sobre el plano.",
      "Resulta un **sector circular** de **radio g** (la generatriz): todos los puntos de la base están a la distancia g del vértice.",
      "El **arco** del sector es la **circunferencia de la base**: su longitud es **2πR**.",
      "El **ángulo** del sector es **360° · R / g**: con estas medidas, unos **103°**. Con ese sector se vuelve a cerrar el cono.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={pts([CONO_AP, [base[0] - CONO_R, base[1]], [base[0] + CONO_R, base[1]]])} fill={MANIM.blue} fillOpacity={0.14} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />
        <ellipse cx={base[0]} cy={base[1]} rx={CONO_R} ry={14} fill="none" stroke={MANIM.ink} strokeWidth={2.4} />
        <Seg a={CONO_AP} b={base} color={MANIM.muted} width={1.4} dashed />
        <Txt x={CONO_AP[0] + CONO_R + 20} y={CONO_AP[1] + CONO_H / 2} size={20} color={MANIM.green}>g</Txt>
        <Txt x={base[0]} y={base[1] + 36} size={20} color={MANIM.muted}>R</Txt>
        <Fade show={beat >= 1}>
          <Seg a={CONO_AP} b={[base[0] + CONO_R, base[1]]} color={MANIM.orange} width={4} />
        </Fade>
        <Fade show={beat >= 2}>
          <path d={`M ${SEC_C[0]} ${SEC_C[1]} L ${sectorPt(a0)[0]} ${sectorPt(a0)[1]} A ${CONO_G} ${CONO_G} 0 0 1 ${sectorPt(a1)[0]} ${sectorPt(a1)[1]} Z`} fill={MANIM.green} fillOpacity={0.16} stroke={MANIM.green} strokeWidth={3.4} strokeLinejoin="round" />
          <Seg a={SEC_C} b={sectorPt(90)} color={MANIM.muted} width={1.4} dashed />
          <Txt x={SEC_C[0] + 16} y={SEC_C[1] + CONO_G / 2} size={20} color={MANIM.green}>g</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <path d={`M ${sectorPt(a0)[0]} ${sectorPt(a0)[1]} A ${CONO_G} ${CONO_G} 0 0 1 ${sectorPt(a1)[0]} ${sectorPt(a1)[1]}`} fill="none" stroke={MANIM.orange} strokeWidth={5} />
          <Txt x={SEC_C[0]} y={SEC_C[1] + CONO_G + 30} size={22} color={MANIM.orange}>arco = 2πR</Txt>
        </Fade>
        <Fade show={beat >= 4}>
          <path d={`M ${SEC_C[0]} ${SEC_C[1] + 70} A 70 70 0 0 1 ${SEC_C[0] + 70 * Math.sin((SEC_ANG / 2) * RAD)} ${SEC_C[1] + 70 * Math.cos((SEC_ANG / 2) * RAD)}`} fill="none" stroke={MANIM.yellow} strokeWidth={3} />
          <Txt x={SEC_C[0] + 74} y={SEC_C[1] + 96} size={20} color={MANIM.yellow}>{`${Math.round(SEC_ANG)}°`}</Txt>
        </Fade>
      </Canvas>
    ),
  };
}
