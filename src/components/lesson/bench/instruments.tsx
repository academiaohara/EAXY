import type { ReactNode } from "react";
import {
  CARTABON_CORTO,
  CARTABON_LARGO,
  ESCUADRA_L,
  RAD,
  dist,
  insetTriangle,
  rot,
  poseTransform,
  type Pt,
  type Pose,
} from "./geometry";

/**
 * Instrumentos de dibujo en SVG con aspecto real: plástico translúcido con bisel
 * y sombra, graduaciones a escala (1 unidad = 1 mm), metal cepillado y madera.
 * Cada instrumento se dibuja en su propio sistema local y se coloca con `pose`.
 */

const PLASTIC_EDGE = "#2b6f8f";
const PLASTIC_GLASS = "#9fd3ea";
const TICK = "#173244";

/** Degradados y filtros compartidos. Se pintan una vez por `<svg>`. */
export function BenchDefs() {
  return (
    <defs>
      <linearGradient id="bench-plastic" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#d9f0fb" stopOpacity="0.78" />
        <stop offset="0.55" stopColor={PLASTIC_GLASS} stopOpacity="0.5" />
        <stop offset="1" stopColor="#6bb5d6" stopOpacity="0.55" />
      </linearGradient>
      <linearGradient id="bench-plastic-orange" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#ffe3b8" stopOpacity="0.8" />
        <stop offset="0.55" stopColor="#ffc476" stopOpacity="0.55" />
        <stop offset="1" stopColor="#f09a3a" stopOpacity="0.6" />
      </linearGradient>
      <linearGradient id="bench-regla" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#fff6dc" />
        <stop offset="1" stopColor="#ecd9a3" />
      </linearGradient>
      <linearGradient id="bench-steel" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#7d8794" />
        <stop offset="0.35" stopColor="#eef1f5" />
        <stop offset="0.6" stopColor="#aab3bf" />
        <stop offset="1" stopColor="#6c7581" />
      </linearGradient>
      <linearGradient id="bench-wood" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#f3c986" />
        <stop offset="1" stopColor="#d79f55" />
      </linearGradient>
      <linearGradient id="bench-pencil" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#ffd84d" />
        <stop offset="0.5" stopColor="#f0b400" />
        <stop offset="1" stopColor="#b98200" />
      </linearGradient>
      <linearGradient id="bench-graphite" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" stopColor="#6d747c" />
        <stop offset="0.45" stopColor="#3a4047" />
        <stop offset="1" stopColor="#1d2126" />
      </linearGradient>
      <linearGradient id="bench-paper" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#fffefa" />
        <stop offset="1" stopColor="#f5f1e6" />
      </linearGradient>
      <linearGradient id="bench-desk" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="#8c6a4a" />
        <stop offset="1" stopColor="#6f5238" />
      </linearGradient>
      <filter id="bench-shadow" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="1.6" dy="2.4" stdDeviation="2" floodColor="#000" floodOpacity="0.32" />
      </filter>
      <filter id="bench-shadow-soft" x="-10%" y="-10%" width="125%" height="125%">
        <feDropShadow dx="1" dy="1.4" stdDeviation="1.1" floodColor="#000" floodOpacity="0.28" />
      </filter>
    </defs>
  );
}

/** Mesa de madera con una hoja de papel encima. */
export function Desk({ w, h, sheet }: { w: number; h: number; sheet: { x: number; y: number; w: number; h: number } }) {
  return (
    <g>
      <rect width={w} height={h} fill="url(#bench-desk)" />
      {Array.from({ length: 14 }, (_, i) => (
        <path
          key={i}
          d={`M0 ${(i + 0.5) * (h / 14)} C ${w * 0.3} ${(i + 0.5) * (h / 14) + (i % 2 ? 3 : -3)}, ${w * 0.6} ${(i + 0.5) * (h / 14) + (i % 3) - 1}, ${w} ${(i + 0.5) * (h / 14) + (i % 2 ? -2 : 2)}`}
          stroke="#000"
          strokeOpacity="0.07"
          strokeWidth="1.1"
          fill="none"
        />
      ))}
      <rect x={sheet.x} y={sheet.y} width={sheet.w} height={sheet.h} fill="url(#bench-paper)" filter="url(#bench-shadow)" />
    </g>
  );
}

/** Marcas de una graduación en mm a lo largo del eje x local (0 → len), hacia +y `dir` (1) o −y (−1). */
function Ticks({ len, dir = 1, every = 1, labels = true, from = 0 }: { len: number; dir?: 1 | -1; every?: number; labels?: boolean; from?: number }) {
  const out: ReactNode[] = [];
  for (let mm = from; mm <= len + 1e-6; mm += every) {
    const k = Math.round(mm);
    const cm = k % 10 === 0;
    const half = k % 5 === 0;
    const l = cm ? 5.5 : half ? 4 : 2.6;
    out.push(<line key={`t${k}`} x1={mm} y1={0} x2={mm} y2={dir * l} stroke={TICK} strokeWidth={cm ? 0.55 : 0.4} />);
    if (labels && cm && k > 0 && k < len - 4) {
      out.push(
        <text key={`n${k}`} x={mm} y={dir * 11.5} fontSize="4.6" textAnchor="middle" fill={TICK} fontFamily="ui-sans-serif, system-ui">
          {k / 10}
        </text>,
      );
    }
  }
  return <g>{out}</g>;
}

type PoseProps = { pose: Pose; className?: string; dim?: boolean };

/** Regla de 30 cm graduada en mm. Origen: esquina superior izquierda. */
export function Regla({ pose, len = 300, dim }: PoseProps & { len?: number }) {
  const h = 32;
  return (
    <g transform={poseTransform(pose)} filter="url(#bench-shadow)" opacity={dim ? 0.55 : 1}>
      <rect width={len} height={h} rx="2" fill="url(#bench-regla)" stroke="#a88b3f" strokeWidth="0.6" />
      <g transform="translate(0 0)">
        <Ticks len={len} dir={1} />
      </g>
      <rect x="1" y="1" width={len - 2} height="1.3" fill="#fff" opacity="0.7" />
      <text x={len - 10} y={h - 5} fontSize="5" textAnchor="end" fill="#8a7430" fontFamily="ui-sans-serif, system-ui">
        cm
      </text>
    </g>
  );
}

export const ESCUADRA_PTS: [Pt, Pt, Pt] = [[0, 0], [ESCUADRA_L, 0], [0, ESCUADRA_L]];
export const CARTABON_PTS: [Pt, Pt, Pt] = [[0, 0], [CARTABON_LARGO, 0], [0, CARTABON_CORTO]];

function PlasticTriangle({ pts, gradient }: { pts: [Pt, Pt, Pt]; gradient: string }) {
  const inner = insetTriangle(pts, 24);
  const path = (v: Pt[]) => `M${v.map((p) => `${p[0]} ${p[1]}`).join(" L")}Z`;
  return (
    <g filter="url(#bench-shadow)">
      <path d={`${path(pts)} ${path(inner)}`} fillRule="evenodd" fill={gradient} stroke={PLASTIC_EDGE} strokeWidth="0.9" strokeLinejoin="round" />
      <path d={path(inner)} fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="1" strokeLinejoin="round" />
      <path d={path(pts)} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" strokeLinejoin="round" transform="translate(0.6 0.6)" />
    </g>
  );
}

/** Escuadra 45°–45°–90°, lisa como las de dibujo. Origen: vértice del ángulo recto; catetos a lo largo de +x y +y. */
export function Escuadra({ pose, dim }: PoseProps) {
  return (
    <g transform={poseTransform(pose)} opacity={dim ? 0.55 : 1}>
      {/* área de agarre: incluye el hueco, para poder arrastrar desde cualquier punto de la escuadra */}
      <path d={`M0 0 L${ESCUADRA_L} 0 L0 ${ESCUADRA_L} Z`} fill="transparent" />
      <PlasticTriangle pts={ESCUADRA_PTS} gradient="url(#bench-plastic)" />
    </g>
  );
}

/** Cartabón 30°–60°–90°, liso. Origen: vértice del ángulo recto; el cateto largo va a lo largo de +x. */
export function Cartabon({ pose, dim }: PoseProps) {
  return (
    <g transform={poseTransform(pose)} opacity={dim ? 0.55 : 1}>
      <PlasticTriangle pts={CARTABON_PTS} gradient="url(#bench-plastic-orange)" />
    </g>
  );
}

/**
 * Transportador de 180° con dos escalas, como los reales. Origen: centro; el diámetro queda a lo largo de +x
 * y el arco hacia −y. Escala exterior: 0° a la derecha. Escala interior (roja): 0° a la izquierda.
 */
export function Transportador({ pose, r = 70, dim }: PoseProps & { r?: number }) {
  const rr = r - 14;
  const ticks: ReactNode[] = [];
  for (let a = 0; a <= 180; a++) {
    const big = a % 10 === 0;
    const mid = a % 5 === 0;
    const l = big ? 6 : mid ? 4.2 : 2.6;
    const cx = Math.cos(a * RAD);
    const sy = -Math.sin(a * RAD);
    ticks.push(
      <line key={a} x1={cx * r} y1={sy * r} x2={cx * (r - l)} y2={sy * (r - l)} stroke={TICK} strokeWidth={big ? 0.5 : 0.32} />,
    );
    if (big && a > 0 && a < 180) {
      ticks.push(
        <text key={`n${a}`} x={cx * (r - 10.5)} y={sy * (r - 10.5) + 1.6} fontSize="4.4" textAnchor="middle" fill={TICK} fontFamily="ui-sans-serif, system-ui">
          {a}
        </text>,
        <text key={`i${a}`} x={cx * (r - 17)} y={sy * (r - 17) + 1.5} fontSize="3.8" textAnchor="middle" fill="#a3302b" fontFamily="ui-sans-serif, system-ui">
          {180 - a}
        </text>,
      );
    }
  }
  return (
    <g transform={poseTransform(pose)} filter="url(#bench-shadow)" opacity={dim ? 0.55 : 1}>
      <path d={`M${-r - 6} 6 L${-r - 6} 0 A${r + 6} ${r + 6} 0 0 1 ${r + 6} 0 L${r + 6} 6 Z`} fill="url(#bench-plastic)" stroke={PLASTIC_EDGE} strokeWidth="0.9" />
      <path d={`M${-rr} 0 A${rr} ${rr} 0 0 1 ${rr} 0 Z`} fill="#fff" fillOpacity="0.25" stroke="#fff" strokeOpacity="0.7" strokeWidth="0.8" />
      {ticks}
      <line x1={-r} y1="0" x2={r} y2="0" stroke={TICK} strokeWidth="0.4" />
      <circle r="1.6" fill="none" stroke={TICK} strokeWidth="0.45" />
      <line x1="0" y1="-5" x2="0" y2="5" stroke={TICK} strokeWidth="0.35" />
    </g>
  );
}

/** Lápiz de madera. Origen: la punta de grafito; el cuerpo se alarga hacia +x. `grade` se rotula en el cuerpo. */
export function Lapiz({ pose, len = 170, dim, grade }: PoseProps & { len?: number; grade?: string }) {
  const w = 7.5;
  return (
    <g transform={poseTransform(pose)} filter="url(#bench-shadow-soft)" opacity={dim ? 0.55 : 1}>
      <path d={`M0 0 L16 ${-w / 2} L16 ${w / 2} Z`} fill="url(#bench-wood)" />
      <path d={`M0 0 L5 ${-1.6} L5 ${1.6} Z`} fill="#2f3438" />
      <rect x="16" y={-w / 2} width={len - 16 - 20} height={w} fill="url(#bench-pencil)" />
      <rect x="16" y={-w / 2 + 1.2} width={len - 16 - 20} height="1" fill="#fff" opacity="0.45" />
      {grade ? (
        <text x={34} y={2.2} fontSize="6" fontWeight="800" fill="#5b3a00" fontFamily="ui-sans-serif, system-ui">
          {grade}
        </text>
      ) : null}
      <rect x={len - 20} y={-w / 2} width="10" height={w} fill="url(#bench-steel)" />
      <rect x={len - 20} y={-w / 2 + 1.6} width="10" height="0.7" fill="#6c7581" />
      <rect x={len - 20} y={w / 2 - 2.3} width="10" height="0.7" fill="#6c7581" />
      <rect x={len - 10} y={-w / 2} width="10" height={w} rx="2.6" fill="#e9758b" />
    </g>
  );
}

/**
 * Compás. Origen: la bisagra; las dos patas caen hacia +y con abertura total `open` (grados).
 * Pata izquierda: punta seca de acero. Pata derecha: portaminas con mina de grafito.
 * Las dos puntas quedan a la misma altura, como al trazar. Radio con `compasRadio`.
 */
export const COMPAS_PATA = 110;
export const compasRadio = (openDeg: number) => 2 * COMPAS_PATA * Math.sin((openDeg * RAD) / 2);
export const compasApertura = (radio: number) => (2 * Math.asin(Math.min(1, radio / (2 * COMPAS_PATA))) * 180) / Math.PI;

/** Tramo recto entre dos puntos, con ancho `w0` en el primero y `w1` en el segundo. */
function tramo(a: Pt, b: Pt, w0: number, w1: number) {
  const dx = b[0] - a[0];
  const dy = b[1] - a[1];
  const l = Math.hypot(dx, dy) || 1;
  const nx = -dy / l;
  const ny = dx / l;
  const q = (p: Pt, n: number, w: number) => `${p[0] + nx * n * w} ${p[1] + ny * n * w}`;
  return `M${q(a, 1, w0)} L${q(b, 1, w1)} L${q(b, -1, w1)} L${q(a, -1, w0)} Z`;
}

export function Compas({ pose, open = 40, dim }: PoseProps & { open?: number }) {
  const half = (open / 2) * RAD;
  const L = COMPAS_PATA;
  const tip = (sign: -1 | 1): Pt => [sign * Math.sin(half) * L, Math.cos(half) * L];
  const at = (t: Pt, f: number): Pt => [t[0] * f, t[1] * f];
  const aguja = tip(-1);
  const mina = tip(1);
  const EDGE = "#59616c";
  return (
    <g transform={poseTransform(pose)} opacity={dim ? 0.55 : 1}>
      <g filter="url(#bench-shadow)">
        {/* patas superiores, de acero */}
        <path d={tramo([0, 0], at(aguja, 0.7), 4.4, 3)} fill="url(#bench-steel)" stroke={EDGE} strokeWidth="0.5" />
        <path d={tramo([0, 0], at(mina, 0.56), 4.4, 3.2)} fill="url(#bench-steel)" stroke={EDGE} strokeWidth="0.5" />
        {/* pata izquierda: aguja de acero que remata en punta fina */}
        <path d={tramo(at(aguja, 0.7), at(aguja, 0.78), 3.4, 2.4)} fill="#8a94a1" stroke={EDGE} strokeWidth="0.5" />
        <path d={tramo(at(aguja, 0.78), aguja, 1.7, 0.18)} fill="url(#bench-steel)" stroke="#3d444d" strokeWidth="0.4" />
        {/* pata derecha: portaminas con tornillo y mina de grafito */}
        <path d={tramo(at(mina, 0.56), at(mina, 0.74), 4.4, 3.6)} fill="#39424e" stroke="#1d232b" strokeWidth="0.5" />
        <circle cx={at(mina, 0.65)[0]} cy={at(mina, 0.65)[1]} r="1.5" fill="#aeb6c1" stroke="#1d232b" strokeWidth="0.4" />
        <path d={tramo(at(mina, 0.74), at(mina, 0.86), 2.4, 1.9)} fill="url(#bench-steel)" stroke={EDGE} strokeWidth="0.45" />
        <path d={tramo(at(mina, 0.86), mina, 1.3, 0.22)} fill="url(#bench-graphite)" stroke="#1f2328" strokeWidth="0.35" />
        {/* bisagra y asa unidas: el vástago nace de la propia bisagra */}
        <path d="M-2.4 -3 L-2.4 -22 L2.4 -22 L2.4 -3 Z" fill="url(#bench-steel)" stroke={EDGE} strokeWidth="0.5" />
        <rect x="-6" y="-35" width="12" height="14" rx="4" fill="#2b3340" stroke="#161b22" strokeWidth="0.5" />
        <rect x="-4.2" y="-33" width="2" height="10" rx="1" fill="#fff" opacity="0.18" />
        <circle r="6.4" fill="url(#bench-steel)" stroke={EDGE} strokeWidth="0.6" />
        <circle r="2.6" fill={EDGE} />
        <circle r="1" fill="#d6dbe2" />
      </g>
    </g>
  );
}

/**
 * Pose del compás con la punta seca en `n` y la mina en `m`, con la abertura que haga falta
 * (máx. 2 · pata). Devuelve también la abertura para pasársela a `<Compas open>`.
 */
export function poseCompas(n: Pt, m: Pt): { pose: Pose; open: number } {
  const radio = Math.min(dist(n, m), 2 * COMPAS_PATA - 0.01);
  const open = compasApertura(radio);
  const half = (open / 2) * RAD;
  const punta: Pt = [-Math.sin(half) * COMPAS_PATA, Math.cos(half) * COMPAS_PATA];
  const ang = (Math.atan2(m[1] - n[1], m[0] - n[0]) * 180) / Math.PI;
  const t = rot(punta, ang);
  return { pose: { x: n[0] - t[0], y: n[1] - t[1], rot: ang }, open };
}
