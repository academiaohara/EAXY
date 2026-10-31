import type { ReactNode } from "react";
import {
  CARTABON_CORTO,
  CARTABON_LARGO,
  ESCUADRA_L,
  RAD,
  insetTriangle,
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

function PlasticTriangle({ pts, gradient, ticksOn, children }: { pts: [Pt, Pt, Pt]; gradient: string; ticksOn?: ReactNode; children?: ReactNode }) {
  const inner = insetTriangle(pts, 24);
  const path = (v: Pt[]) => `M${v.map((p) => `${p[0]} ${p[1]}`).join(" L")}Z`;
  return (
    <g filter="url(#bench-shadow)">
      <path d={`${path(pts)} ${path(inner)}`} fillRule="evenodd" fill={gradient} stroke={PLASTIC_EDGE} strokeWidth="0.9" strokeLinejoin="round" />
      <path d={path(inner)} fill="none" stroke="#fff" strokeOpacity="0.75" strokeWidth="1" strokeLinejoin="round" />
      <path d={path(pts)} fill="none" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.2" strokeLinejoin="round" transform="translate(0.6 0.6)" />
      {ticksOn}
      {children}
    </g>
  );
}

/** Escuadra 45°–45°–90°. Origen: vértice del ángulo recto; catetos a lo largo de +x y +y. */
export function Escuadra({ pose, dim, label = true }: PoseProps & { label?: boolean }) {
  const L = ESCUADRA_L;
  const pts: [Pt, Pt, Pt] = [[0, 0], [L, 0], [0, L]];
  return (
    <g transform={poseTransform(pose)} opacity={dim ? 0.55 : 1}>
      <PlasticTriangle
        pts={pts}
        gradient="url(#bench-plastic)"
        ticksOn={
          <g transform="translate(0 0.9)">
            <Ticks len={L - 6} dir={1} from={6} labels={false} />
          </g>
        }
      >
        {label ? (
          <g fontFamily="ui-sans-serif, system-ui" fontSize="6" fill={PLASTIC_EDGE} fontWeight="700">
            <text x="17" y="16">90°</text>
            <text x={L - 50} y="10">45°</text>
            <text x="6" y={L - 34} transform="rotate(0)">45°</text>
          </g>
        ) : null}
      </PlasticTriangle>
    </g>
  );
}

/** Cartabón 30°–60°–90°. Origen: vértice del ángulo recto; el cateto largo va a lo largo de +x. */
export function Cartabon({ pose, dim, label = true }: PoseProps & { label?: boolean }) {
  const pts: [Pt, Pt, Pt] = [[0, 0], [CARTABON_LARGO, 0], [0, CARTABON_CORTO]];
  return (
    <g transform={poseTransform(pose)} opacity={dim ? 0.55 : 1}>
      <PlasticTriangle
        pts={pts}
        gradient="url(#bench-plastic-orange)"
        ticksOn={
          <g transform="translate(0 0.9)">
            <Ticks len={CARTABON_LARGO - 6} dir={1} from={6} labels={false} />
          </g>
        }
      >
        {label ? (
          <g fontFamily="ui-sans-serif, system-ui" fontSize="6" fill="#9a5b0d" fontWeight="700">
            <text x="17" y="16">90°</text>
            <text x={CARTABON_LARGO - 50} y="9">30°</text>
            <text x="5" y={CARTABON_CORTO - 18}>60°</text>
          </g>
        ) : null}
      </PlasticTriangle>
    </g>
  );
}

/** Transportador de 180°. Origen: centro; el diámetro queda a lo largo de +x y el arco hacia −y. */
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
        <text
          key={`n${a}`}
          x={cx * (r - 10.5)}
          y={sy * (r - 10.5) + 1.6}
          fontSize="4.4"
          textAnchor="middle"
          fill={TICK}
          fontFamily="ui-sans-serif, system-ui"
        >
          {a}
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

/** Lápiz de madera. Origen: la punta de grafito; el cuerpo se alarga hacia +x. */
export function Lapiz({ pose, len = 170, dim }: PoseProps & { len?: number }) {
  const w = 7.5;
  return (
    <g transform={poseTransform(pose)} filter="url(#bench-shadow-soft)" opacity={dim ? 0.55 : 1}>
      {/* madera afilada */}
      <path d={`M0 0 L16 ${-w / 2} L16 ${w / 2} Z`} fill="url(#bench-wood)" />
      <path d={`M0 0 L5 ${-1.6} L5 ${1.6} Z`} fill="#2f3438" />
      {/* cuerpo */}
      <rect x="16" y={-w / 2} width={len - 16 - 20} height={w} fill="url(#bench-pencil)" />
      <rect x="16" y={-w / 2 + 1.2} width={len - 16 - 20} height="1" fill="#fff" opacity="0.45" />
      {/* virola y goma */}
      <rect x={len - 20} y={-w / 2} width="10" height={w} fill="url(#bench-steel)" />
      <rect x={len - 20} y={-w / 2 + 1.6} width="10" height="0.7" fill="#6c7581" />
      <rect x={len - 20} y={w / 2 - 2.3} width="10" height="0.7" fill="#6c7581" />
      <rect x={len - 10} y={-w / 2} width="10" height={w} rx="2.6" fill="#e9758b" />
    </g>
  );
}

/**
 * Compás. Origen: la bisagra; las dos patas caen hacia +y con abertura total `open` (grados).
 * Pata izquierda: punta seca; pata derecha: mina. Devuelve el radio con `compasRadio`.
 */
export const COMPAS_PATA = 110;
export const compasRadio = (openDeg: number) => 2 * COMPAS_PATA * Math.sin((openDeg * RAD) / 2);
export const compasApertura = (radio: number) => (2 * Math.asin(Math.min(1, radio / (2 * COMPAS_PATA))) * 180) / Math.PI;

export function Compas({ pose, open = 40, dim }: PoseProps & { open?: number }) {
  const half = (open / 2) * RAD;
  const L = COMPAS_PATA;
  const leg = (sign: -1 | 1): Pt => [sign * Math.sin(half) * L, Math.cos(half) * L];
  const needle = leg(-1);
  const lead = leg(1);
  const legPath = (tip: Pt, wTop: number, wBot: number) => {
    const ang = Math.atan2(tip[1], tip[0]);
    const nx = -Math.sin(ang);
    const ny = Math.cos(ang);
    const p1: Pt = [nx * wTop, ny * wTop];
    const p2: Pt = [-nx * wTop, -ny * wTop];
    const p3: Pt = [tip[0] - nx * wBot, tip[1] - ny * wBot];
    const p4: Pt = [tip[0] + nx * wBot, tip[1] + ny * wBot];
    return `M${p1[0]} ${p1[1]} L${p4[0]} ${p4[1]} L${p3[0]} ${p3[1]} L${p2[0]} ${p2[1]} Z`;
  };
  const along = (tip: Pt, t: number): Pt => [tip[0] * t, tip[1] * t];
  const nPoint = along(needle, 0.84);
  const lPoint = along(lead, 0.8);
  return (
    <g transform={poseTransform(pose)} opacity={dim ? 0.55 : 1}>
      <g filter="url(#bench-shadow)">
        {/* asa */}
        <rect x="-2.3" y="-26" width="4.6" height="14" rx="1.5" fill="url(#bench-steel)" stroke="#59616c" strokeWidth="0.5" />
        <rect x="-5.5" y="-34" width="11" height="9" rx="3" fill="#2b3340" stroke="#161b22" strokeWidth="0.5" />
        {/* patas */}
        <path d={legPath([needle[0] * 0.86, needle[1] * 0.86], 4.2, 2.6)} fill="url(#bench-steel)" stroke="#59616c" strokeWidth="0.5" />
        <path d={legPath([lead[0] * 0.8, lead[1] * 0.8], 4.2, 2.8)} fill="url(#bench-steel)" stroke="#59616c" strokeWidth="0.5" />
        {/* punta seca */}
        <path d={`M${nPoint[0] - 1.2} ${nPoint[1] - 0.2} L${needle[0]} ${needle[1]} L${nPoint[0] + 1.2} ${nPoint[1] + 0.2}Z`} fill="#444c56" />
        {/* portaminas y mina */}
        <path d={legPath(lPoint, 3.4, 2.7)} fill="#c4cad3" stroke="#59616c" strokeWidth="0.5" transform={`translate(${(lead[0] - lPoint[0]) * 0.0} 0)`} />
        <path d={`M${lPoint[0] - 1.1} ${lPoint[1]} L${lead[0]} ${lead[1]} L${lPoint[0] + 1.1} ${lPoint[1]}Z`} fill="#2f3438" />
        {/* bisagra */}
        <circle r="6" fill="url(#bench-steel)" stroke="#59616c" strokeWidth="0.6" />
        <circle r="2.3" fill="#59616c" />
        <circle r="0.9" fill="#d6dbe2" />
      </g>
    </g>
  );
}
