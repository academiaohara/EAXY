"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent, type ReactNode } from "react";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import {
  CARTABON_LARGO,
  PARALELA_S_MAX,
  add,
  apoyarTriangulo,
  cartabonPose,
  clamp,
  dot,
  escuadraPose,
  filoPasaPorP,
  mul,
  paralelaSetup,
  sub,
  type Pt,
} from "./geometry";
import { useBenchCheck } from "./practice";
import { BenchDefs, CARTABON_PTS, Cartabon, Compas, Desk, ESCUADRA_PTS, Escuadra, Lapiz, Regla, Transportador } from "./instruments";

export type BenchNote = { title: string; text: string; fact?: string };

export type BenchBlock = {
  scene: BenchSceneName;
  params?: { a?: number; b?: number };
  /** Un texto por paso: título, explicación y, opcionalmente, un dato destacado. */
  notes?: BenchNote[];
};

export type BenchSceneName =
  | "instrumentos-catalogo"
  | "escuadra-cartabon-angulos"
  | "lapices-dureza"
  | "paralelas-escuadra-cartabon"
  | "perpendicular-escuadra-cartabon"
  | "transportador-medir"
  | "mediatriz-compas"
  | "bisectriz-compas"
  | "mediatriz-practica"
  | "bisectriz-practica"
  | "trasladar-angulo-compas"
  | "trasladar-practica"
  | "traslacion-compas"
  | "traslacion-practica"
  | "giro-compas"
  | "giro-practica"
  | "simetria-compas"
  | "simetria-practica"
  | "homotecia-compas"
  | "homotecia-practica"
  | "thales-dividir"
  | "thales-practica"
  | "media-compas"
  | "media-practica"
  | "aurea-compas"
  | "aurea-practica"
  | "equivalencia-triangulos"
  | "cuadratura-compas"
  | "cuadratura-practica"
  | "semejanza-razon"
  | "puntos-notables"
  | "circuncentro-practica"
  | "triangulo-lll-compas"
  | "triangulo-lll-practica"
  | "hexagono-compas"
  | "hexagono-practica"
  | "rombo-compas"
  | "rombo-practica"
  | "poligono-elementos"
  | "apotema-practica"
  | "estrella-compas"
  | "pentagrama-practica"
  | "tangentes-compas"
  | "tangentes-practica"
  | "circunferencias-posiciones"
  | "circ-tangente-practica"
  | "enlace-compas"
  | "enlace-practica"
  | "ovalo-compas"
  | "ovalo-practica"
  | "espiral-compas"
  | "espiral-practica"
  | "evolvente-hilo";

/** Número de pasos de cada escena: la lección debe aportar un texto por paso. */
export const BENCH_STEPS: Record<BenchSceneName, number> = {
  "instrumentos-catalogo": 6,
  "escuadra-cartabon-angulos": 6,
  "lapices-dureza": 3,
  "paralelas-escuadra-cartabon": 3,
  "perpendicular-escuadra-cartabon": 3,
  "transportador-medir": 3,
  "mediatriz-compas": 4,
  "bisectriz-compas": 4,
  "mediatriz-practica": 6,
  "bisectriz-practica": 9,
  "trasladar-angulo-compas": 5,
  "trasladar-practica": 9,
  "traslacion-compas": 5,
  "traslacion-practica": 15,
  "giro-compas": 5,
  "giro-practica": 16,
  "simetria-compas": 5,
  "simetria-practica": 22,
  "homotecia-compas": 5,
  "homotecia-practica": 13,
  "thales-dividir": 7,
  "thales-practica": 10,
  "media-compas": 5,
  "media-practica": 4,
  "aurea-compas": 5,
  "aurea-practica": 7,
  "equivalencia-triangulos": 4,
  "cuadratura-compas": 5,
  "cuadratura-practica": 12,
  "semejanza-razon": 4,
  "puntos-notables": 5,
  "circuncentro-practica": 11,
  "triangulo-lll-compas": 5,
  "triangulo-lll-practica": 7,
  "hexagono-compas": 5,
  "hexagono-practica": 17,
  "rombo-compas": 5,
  "rombo-practica": 8,
  "poligono-elementos": 5,
  "apotema-practica": 6,
  "estrella-compas": 4,
  "pentagrama-practica": 1,
  "tangentes-compas": 5,
  "tangentes-practica": 12,
  "circunferencias-posiciones": 5,
  "circ-tangente-practica": 7,
  "enlace-compas": 5,
  "enlace-practica": 12,
  "ovalo-compas": 6,
  "ovalo-practica": 21,
  "espiral-compas": 5,
  "espiral-practica": 12,
  "evolvente-hilo": 4,
};

export const INK = "#2a2f36";
export const SANS = "ui-sans-serif, system-ui";
export const f1 = (v: number) => v.toFixed(1).replace(".", ",");

/* ───────────── Contenedor: instrumentos a la izquierda, información a la derecha ───────────── */

export function BenchShell({
  scene,
  notes,
  step,
  setStep,
  extra,
  nav,
  accion,
  label,
  children,
}: {
  scene: BenchSceneName;
  notes?: BenchNote[];
  step: number;
  setStep: (n: number) => void;
  extra?: ReactNode;
  /** Sustituye los botones Anterior / Siguiente (escenas donde los pasos avanzan al hacer la acción). */
  nav?: ReactNode;
  /** Lo que tiene que hacer el alumno en este paso (escenas interactivas): se muestra como «Tu turno». */
  accion?: string | null;
  label: string;
  children: ReactNode;
}) {
  const total = BENCH_STEPS[scene];
  const note = notes?.[step];
  const btn =
    "inline-flex items-center gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";
  return (
    <section className="grid h-full min-h-0 gap-6 lg:grid-cols-[minmax(0,1.7fr)_minmax(0,1fr)] lg:gap-8" data-testid="bench" data-scene={scene}>
      <div className="flex min-h-0 min-w-0 items-center justify-center" aria-label={label}>
        {children}
      </div>
      <div className="flex min-h-0 min-w-0 flex-col py-2">
        <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden pt-[6%]" aria-live="polite">
          {accion ? (
            <p className="inline-flex w-fit items-center gap-2 rounded-full bg-[#ffd866] px-3 py-1 text-xs font-extrabold uppercase tracking-[0.12em] text-[#1b2433]" data-testid="bench-accion">
              <span aria-hidden className="inline-block size-2 animate-pulse rounded-full bg-[#1b2433]" />
              Tu turno: <span className="normal-case tracking-normal">{accion}</span>
            </p>
          ) : null}
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--stage-muted,#b8c2d0)]" data-testid="bench-titulo">
              {note?.title ?? ""}
            </p>
            <MathRenderer
              text={note?.text ?? ""}
              emphasis="mark-alternate"
              className={`mt-3 block font-semibold leading-snug text-[color:var(--stage-ink,#fff)] [text-wrap:pretty] ${(note?.text.length ?? 0) > 150 ? "text-[1.2rem]" : "text-[1.5rem]"}`}
            />
            {note?.fact ? (
              <p className="mt-3 text-sm font-semibold text-[#ffd866]" data-testid="bench-dato">
                {note.fact}
              </p>
            ) : null}
          </div>
          {extra}
        </div>
        <div className="flex shrink-0 items-center gap-3 pt-3" data-testid="bench-nav">
          {nav ?? (
            <button type="button" className={btn} disabled={step === 0} onClick={() => setStep(step - 1)} data-testid="bench-anterior">
              <ChevronLeftIcon className="size-4" aria-hidden />
              Anterior
            </button>
          )}
          <span className="text-xs font-bold uppercase tracking-[0.14em] text-[color:var(--stage-accent,#58c4dd)]" data-testid="bench-paso">
            Paso {step + 1} de {total}
          </span>
          {total <= 12 ? (
            <div className="flex items-center gap-1.5" aria-hidden>
              {Array.from({ length: total }, (_, i) => (
                <span key={i} className={`size-2 rounded-full ${i === step ? "bg-[#58c4dd]" : i < step ? "bg-[#58c4dd]/50" : "bg-white/20"}`} />
              ))}
            </div>
          ) : null}
          {nav ? null : (
            <button type="button" className={btn} disabled={step === total - 1} onClick={() => setStep(step + 1)} data-testid="bench-siguiente">
              Siguiente
              <ChevronRightIcon className="size-4" aria-hidden />
            </button>
          )}
        </div>
      </div>
    </section>
  );
}

export const SVG_CLASS = "block h-full max-h-full w-full max-w-full rounded-xl";

/* ───────────── Ángulos: arcos de anotación ───────────── */

const rad = (d: number) => (d * Math.PI) / 180;

/** Arco de `a1` a `a2` (grados, eje Y hacia abajo) alrededor de `v`, con la cifra al lado. */
export function Arco({ v, a1, a2, r, color, text, textSize = 13, dr = 13, fuera = false }: { v: Pt; a1: number; a2: number; r: number; color: string; text?: string; textSize?: number; dr?: number; fuera?: boolean }) {
  let d = a2 - a1;
  while (d > 180) d -= 360;
  while (d <= -180) d += 360;
  const p = (a: number, rr: number): Pt => [v[0] + rr * Math.cos(rad(a)), v[1] + rr * Math.sin(rad(a))];
  const s = p(a1, r);
  const e = p(a1 + d, r);
  const mid = fuera ? p(a1 + d / 2 + 180, dr) : p(a1 + d / 2, r + dr);
  return (
    <g>
      <path d={`M${s[0]} ${s[1]} A${r} ${r} 0 0 ${d > 0 ? 1 : 0} ${e[0]} ${e[1]}`} fill="none" stroke={color} strokeWidth="2.4" strokeLinecap="round" />
      {text ? (
        <text x={mid[0]} y={mid[1] + textSize * 0.35} fontSize={textSize} fontWeight="800" fill={color} textAnchor="middle" fontFamily={SANS}>
          {text}
        </text>
      ) : null}
    </g>
  );
}

/* ───────────── 1. Catálogo de instrumentos ───────────── */

const ORDEN_CATALOGO = ["regla", "escuadra", "cartabon", "transportador", "compas", "lapiz"] as const;

export function InstrumentosCatalogo({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const foco = ORDEN_CATALOGO[step];
  const wrap = (id: (typeof ORDEN_CATALOGO)[number], el: ReactNode) => (
    <g
      data-testid={`bench-item-${id}`}
      data-foco={foco === id}
      style={{ opacity: foco === id ? 1 : 0.38, transition: "opacity 300ms", filter: foco === id ? "drop-shadow(0 0 6px #ffd866) drop-shadow(0 0 2px #ffd866)" : undefined }}
    >
      {el}
    </g>
  );
  return (
    <BenchShell scene="instrumentos-catalogo" notes={block.notes} step={step} setStep={setStep} label="Mesa con los instrumentos de dibujo técnico">
      <svg viewBox="0 0 620 380" className={SVG_CLASS} aria-hidden focusable="false" data-testid="bench-catalogo">
        <BenchDefs />
        <Desk w={620} h={380} sheet={{ x: 10, y: 10, w: 600, h: 360 }} />
        {wrap("regla", <Regla pose={{ x: 28, y: 26, rot: 0 }} />)}
        {wrap("transportador", <Transportador pose={{ x: 480, y: 100, rot: 0 }} />)}
        {wrap("escuadra", <Escuadra pose={{ x: 34, y: 100, rot: 0 }} />)}
        {wrap("cartabon", <Cartabon pose={{ x: 235, y: 140, rot: 0 }} />)}
        {wrap("compas", <Compas pose={{ x: 548, y: 190, rot: 0 }} open={38} />)}
        {wrap("lapiz", <Lapiz pose={{ x: 250, y: 340, rot: 0 }} grade="HB" />)}
      </svg>
    </BenchShell>
  );
}

/* ───────────── 2. Ángulos con escuadra y cartabón ───────────── */

export const AZUL = "#1f78b4";
export const AMBAR = "#d97706";
export const VERDE = "#1f9d55";

/** Dirección (grados, eje Y hacia abajo) del vértice `i` hacia el vértice `j` de un triángulo. */
const dirTri = (pts: Pt[], i: number, j: number) => (Math.atan2(pts[j][1] - pts[i][1], pts[j][0] - pts[i][0]) * 180) / Math.PI;

/** Un triángulo grande con sus tres ángulos marcados. */
function TrianguloConAngulos({ pts, k, o, color, vals, children }: { pts: [Pt, Pt, Pt]; k: number; o: Pt; color: string[]; vals: string[]; children: ReactNode }) {
  const w = pts.map((p) => add(o, mul(p, k)));
  return (
    <g>
      <g transform={`translate(${o[0]} ${o[1]}) scale(${k})`}>{children}</g>
      {([0, 1, 2] as const).map((i) => {
        const j = ((i + 1) % 3) as 0 | 1 | 2;
        const m = ((i + 2) % 3) as 0 | 1 | 2;
        return <Arco key={i} v={w[i]} a1={dirTri(w, i, j)} a2={dirTri(w, i, m)} r={i === 0 ? 30 : 38} color={color[i]} text={vals[i]} dr={30} textSize={16} fuera />;
      })}
    </g>
  );
}

function Rayo({ o, deg, len = 270, etiqueta }: { o: Pt; deg: number; len?: number; etiqueta?: string }) {
  const e: Pt = [o[0] + len * Math.cos(rad(deg)), o[1] - len * Math.sin(rad(deg))];
  return (
    <g>
      <line x1={o[0]} y1={o[1]} x2={e[0]} y2={e[1]} stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
      {etiqueta ? (
        <text x={e[0] + 6} y={e[1] - 4} fontSize="12" fontWeight="700" fill={INK} fontFamily={SANS}>
          {etiqueta}
        </text>
      ) : null}
    </g>
  );
}

/** Arco de ángulo con la base en la horizontal (0° = hacia la derecha, sentido antihorario en pantalla). */
function ArcoBase({ o, de, a, r, color, text, dr }: { o: Pt; de: number; a: number; r: number; color: string; text: string; dr?: number }) {
  return <Arco v={o} a1={-de} a2={-a} r={r} color={color} text={text} dr={dr ?? 16} textSize={14} />;
}

export function EscuadraCartabonAngulos({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  const O: Pt = [120, 322];
  const sobreEscuadra = apoyarTriangulo(ESCUADRA_PTS, 1, 2, [170, 168]);
  const sobreCartabon = apoyarTriangulo(CARTABON_PTS, 0, 1, [170, 336]);
  const xi = 170;
  const xf = 170 + CARTABON_LARGO;
  return (
    <BenchShell scene="escuadra-cartabon-angulos" notes={block.notes} step={step} setStep={setStep} label="Escuadra y cartabón sobre la hoja">
      <svg viewBox="0 0 620 380" className={SVG_CLASS} aria-hidden focusable="false" data-testid="bench-angulos">
        <BenchDefs />
        <Desk w={620} h={380} sheet={{ x: 10, y: 10, w: 600, h: 360 }} />
        {step === 0 ? (
          <TrianguloConAngulos pts={ESCUADRA_PTS} k={1.45} o={[190, 62]} color={[VERDE, AZUL, AZUL]} vals={["90°", "45°", "45°"]}>
            <Escuadra pose={{ x: 0, y: 0, rot: 0 }} />
          </TrianguloConAngulos>
        ) : null}
        {step === 1 ? (
          <TrianguloConAngulos pts={CARTABON_PTS} k={1.3} o={[150, 105]} color={[VERDE, AMBAR, AMBAR]} vals={["90°", "30°", "60°"]}>
            <Cartabon pose={{ x: 0, y: 0, rot: 0 }} />
          </TrianguloConAngulos>
        ) : null}
        {step === 2 ? (
          <g data-testid="bench-igual-longitud">
            <Escuadra pose={sobreEscuadra} />
            <Cartabon pose={sobreCartabon} />
            <line x1={xi} y1={168} x2={xf} y2={168} stroke={AZUL} strokeWidth="3.2" strokeLinecap="round" />
            <line x1={xi} y1={336} x2={xf} y2={336} stroke={AMBAR} strokeWidth="3.2" strokeLinecap="round" />
            {[xi, xf].map((x) => (
              <line key={x} x1={x} y1={34} x2={x} y2={352} stroke={INK} strokeWidth="0.9" strokeDasharray="5 4" />
            ))}
            <text x={(xi + xf) / 2} y={188} fontSize="12" fontWeight="700" fill={AZUL} textAnchor="middle" fontFamily={SANS}>
              hipotenusa de la escuadra
            </text>
            <text x={(xi + xf) / 2} y={356} fontSize="12" fontWeight="700" fill={AMBAR} textAnchor="middle" fontFamily={SANS}>
              cateto largo del cartabón
            </text>
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-rayos">
            <line x1="40" y1={O[1]} x2="590" y2={O[1]} stroke={INK} strokeWidth="1.3" />
            {step === 3 ? (
              <>
                <Rayo o={O} deg={30} etiqueta="30° cartabón" />
                <Rayo o={O} deg={45} etiqueta="45° escuadra" />
                <ArcoBase o={O} de={0} a={30} r={64} color={AMBAR} text="30°" />
                <ArcoBase o={O} de={0} a={45} r={92} color={AZUL} text="45°" />
                <ArcoBase o={O} de={30} a={45} r={160} color={VERDE} text="15°" dr={18} />
              </>
            ) : null}
            {step === 4 ? (
              <>
                <Rayo o={O} deg={45} etiqueta="45°" />
                <Rayo o={O} deg={75} etiqueta="75°" />
                <ArcoBase o={O} de={0} a={45} r={70} color={AZUL} text="45°" />
                <ArcoBase o={O} de={45} a={75} r={110} color={AMBAR} text="+30°" />
                <ArcoBase o={O} de={0} a={75} r={170} color={VERDE} text="75°" dr={18} />
              </>
            ) : null}
            {step === 5 ? (
              <>
                <Rayo o={O} deg={60} etiqueta="60°" />
                <Rayo o={O} deg={105} etiqueta="105°" />
                <ArcoBase o={O} de={0} a={60} r={70} color={AMBAR} text="60°" />
                <ArcoBase o={O} de={60} a={105} r={110} color={AZUL} text="+45°" />
                <ArcoBase o={O} de={0} a={105} r={170} color={VERDE} text="105°" dr={18} />
              </>
            ) : null}
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── 3. Lápices: dureza de la mina ───────────── */

const GRADOS: { g: string; w: number; op: number }[] = [
  { g: "2H", w: 0.6, op: 0.45 },
  { g: "H", w: 0.9, op: 0.6 },
  { g: "HB", w: 1.4, op: 0.82 },
  { g: "B", w: 2.1, op: 0.94 },
  { g: "2B", w: 3, op: 1 },
];

export function LapicesDureza({ block }: { block: BenchBlock }) {
  const [step, setStep] = useState(0);
  return (
    <BenchShell scene="lapices-dureza" notes={block.notes} step={step} setStep={setStep} label="Lápices de distinta dureza y sus trazos">
      <svg viewBox="0 0 620 380" className={SVG_CLASS} aria-hidden focusable="false" data-testid="bench-lapices">
        <BenchDefs />
        <filter id="bench-smudge" x="-20%" y="-300%" width="140%" height="700%">
          <feGaussianBlur stdDeviation="3.2" />
        </filter>
        <Desk w={620} h={380} sheet={{ x: 10, y: 10, w: 600, h: 360 }} />
        {step === 0 ? (
          <g data-testid="bench-escala">
            {GRADOS.map((p, i) => {
              const y = 62 + i * 66;
              return (
                <g key={p.g}>
                  <Lapiz pose={{ x: 40, y, rot: 0 }} len={200} grade={p.g} />
                  <line x1="268" y1={y} x2="540" y2={y} stroke="#15181c" strokeOpacity={p.op} strokeWidth={p.w} strokeLinecap="round" />
                </g>
              );
            })}
            <text x="576" y="64" fontSize="11" fontWeight="700" fill={AZUL} textAnchor="middle" fontFamily={SANS}>
              dura
            </text>
            <text x="576" y="338" fontSize="11" fontWeight="700" fill={AMBAR} textAnchor="middle" fontFamily={SANS}>
              blanda
            </text>
            <line x1="576" y1="74" x2="576" y2="322" stroke={INK} strokeWidth="1.2" strokeDasharray="3 4" />
          </g>
        ) : null}
        {step === 1 ? (
          <g data-testid="bench-uso">
            {/* construcción con mina dura: fina y clara */}
            <g stroke="#15181c" strokeOpacity="0.45" strokeWidth="0.7">
              <line x1="165" y1="70" x2="415" y2="320" />
              <line x1="415" y1="70" x2="165" y2="320" />
              <line x1="290" y1="60" x2="290" y2="330" />
              <line x1="155" y1="195" x2="425" y2="195" />
            </g>
            {/* trazado final con mina media: oscuro y uniforme */}
            <g fill="none" stroke="#15181c" strokeOpacity="0.9" strokeWidth="2.1" strokeLinejoin="round">
              <rect x="165" y="70" width="250" height="250" />
              <circle cx="290" cy="195" r="125" />
            </g>
            <Lapiz pose={{ x: 428, y: 190, rot: -10 }} len={150} grade="2H" />
            <Lapiz pose={{ x: 417, y: 262, rot: 12 }} len={150} grade="HB" />
            <text x="470" y="140" fontSize="12" fontWeight="700" fill={AZUL} fontFamily={SANS}>
              construcción: 2H
            </text>
            <text x="470" y="322" fontSize="12" fontWeight="700" fill={AMBAR} fontFamily={SANS}>
              trazado final: HB
            </text>
          </g>
        ) : null}
        {step === 2 ? (
          <g data-testid="bench-errores">
            {/* izquierda: mina blanda sobre una construcción: mancha */}
            <line x1="50" y1="190" x2="290" y2="190" stroke="#15181c" strokeOpacity="0.5" strokeWidth="0.8" />
            <line x1="60" y1="198" x2="280" y2="182" stroke="#15181c" strokeOpacity="0.55" strokeWidth="9" strokeLinecap="round" filter="url(#bench-smudge)" />
            <line x1="60" y1="198" x2="280" y2="182" stroke="#15181c" strokeOpacity="0.8" strokeWidth="2.8" strokeLinecap="round" />
            <text x="170" y="262" fontSize="13" fontWeight="800" fill="#b91c1c" textAnchor="middle" fontFamily={SANS}>
              B sobre construcción
            </text>
            <text x="170" y="280" fontSize="12" fill={INK} textAnchor="middle" fontFamily={SANS}>
              mancha y no se borra bien
            </text>
            {/* derecha: mina dura muy apretada: surco en el papel */}
            <line x1="340" y1="186" x2="580" y2="186" stroke="#ffffff" strokeWidth="1.2" />
            <line x1="340" y1="190" x2="580" y2="190" stroke="#15181c" strokeOpacity="0.45" strokeWidth="0.8" />
            <line x1="340" y1="193.4" x2="580" y2="193.4" stroke="#000" strokeOpacity="0.16" strokeWidth="1.8" />
            <text x="460" y="262" fontSize="13" fontWeight="800" fill="#b91c1c" textAnchor="middle" fontFamily={SANS}>
              2H apretando
            </text>
            <text x="460" y="280" fontSize="12" fill={INK} textAnchor="middle" fontFamily={SANS}>
              marca un surco en el papel
            </text>
            <line x1="310" y1="120" x2="310" y2="320" stroke={INK} strokeWidth="1" strokeDasharray="3 5" opacity="0.5" />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── 4. Paralela con escuadra y cartabón (se arrastra la escuadra) ───────────── */

const VIEW_W = 520;
const VIEW_H = 350;
const SHEET = { x: 30, y: 16, w: 460, h: 334 };

/** Resultado de una comprobación, bajo el texto del paso (el color lo da también el pie de la lección). */
export function Resultado({ ok, children }: { ok: boolean; children: ReactNode }) {
  return (
    <p
      className={`rounded-lg border px-3 py-2 text-sm leading-snug ${ok ? "border-emerald-400/60 bg-emerald-400/10 text-emerald-100" : "border-amber-400/60 bg-amber-400/10 text-amber-100"}`}
      data-testid="bench-resultado"
      data-ok={ok}
    >
      {children}
    </p>
  );
}

export function ParalelasEscuadraCartabon({ block }: { block: BenchBlock }) {
  const theta = clamp(block.params?.a ?? 12, -15, 30);
  const dP = clamp(block.params?.b ?? 70, 40, 100);
  const last = BENCH_STEPS["paralelas-escuadra-cartabon"] - 1;
  const [step, setStep] = useState(0);
  const [s, setS] = useState(0);
  const [agarrada, setAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ start: Pt; s0: number } | null>(null);

  const setup = paralelaSetup([175, 70], theta, dP);
  const ok = filoPasaPorP(setup, s);
  const { resultado, finalizar } = useBenchCheck();
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const sv = hecho ? setup.sStar : s;
  const eq = escuadraPose(setup, sv);
  const ct = cartabonPose(setup);
  const mueve = shown === last && resultado === null;

  const goStep = (n: number) => {
    setStep(n);
    if (n < last) setS(0);
  };

  const toSvg = (ev: ReactPointerEvent): Pt => {
    const svg = svgRef.current;
    const ctm = svg && typeof svg.getScreenCTM === "function" ? svg.getScreenCTM() : null;
    if (!ctm) return [ev.clientX, ev.clientY];
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
    return [p.x, p.y];
  };
  const onDown = (ev: ReactPointerEvent) => {
    if (!mueve) return;
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    drag.current = { start: toSvg(ev), s0: s };
    setAgarrada(true);
  };
  const onMove = (ev: ReactPointerEvent) => {
    if (!drag.current) return;
    setS(clamp(drag.current.s0 + dot(sub(toSvg(ev), drag.current.start), setup.h), 0, PARALELA_S_MAX));
  };
  // Al soltar (o al mover con el teclado) con el borde sobre P, la construcción queda hecha.
  const onUp = () => {
    const estabaArrastrando = drag.current !== null;
    drag.current = null;
    setAgarrada(false);
    if (estabaArrastrando && mueve && ok) finalizar();
  };
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!mueve) return;
    const paso = ev.shiftKey ? 10 : 2;
    const nuevo = ev.key === "ArrowUp" || ev.key === "ArrowRight" ? clamp(s + paso, 0, PARALELA_S_MAX) : ev.key === "ArrowDown" || ev.key === "ArrowLeft" ? clamp(s - paso, 0, PARALELA_S_MAX) : null;
    if (nuevo === null) return;
    setS(nuevo);
    if (filoPasaPorP(setup, nuevo)) finalizar();
    ev.preventDefault();
  };

  const rA = add(setup.c0, mul(setup.u, -60));
  const rB = add(setup.c0, mul(setup.u, 280));
  const pa = add(setup.p, mul(setup.u, -150));
  const pb = add(setup.p, mul(setup.u, 200));

  const extra = resultado === null ? null : <Resultado ok>Correcto: la recta trazada es paralela a r porque la escuadra solo se ha desplazado, no ha girado.</Resultado>;

  return (
    <BenchShell scene="paralelas-escuadra-cartabon" notes={block.notes} step={shown} setStep={goStep} extra={extra} accion={mueve ? "arrastra la escuadra hasta que su filo pase por P" : null} label="Hoja con la recta r, el punto P, la escuadra y el cartabón">
      <svg ref={svgRef} viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con la recta r, el punto P, la escuadra y el cartabón" data-testid="bench-paralelas">
        <BenchDefs />
        <clipPath id="bench-sheet-clip">
          <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} />
        </clipPath>
        <Desk w={VIEW_W} h={VIEW_H} sheet={SHEET} />
        <g clipPath="url(#bench-sheet-clip)">
          <line x1={rA[0]} y1={rA[1]} x2={rB[0]} y2={rB[1]} stroke={INK} strokeWidth="0.9" />
          <text x={rA[0] - 4} y={rA[1] - 7} fontSize="11" fontWeight="700" fill={INK} fontFamily={SANS}>
            r
          </text>
          {hecho ? <line data-testid="bench-trazo" x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke="#2b3138" strokeWidth="1" strokeLinecap="round" /> : null}
        </g>
        <g style={{ opacity: shown >= 1 ? 1 : 0, transition: "opacity 400ms" }} data-testid="bench-cartabon">
          <Cartabon pose={ct} />
        </g>
        <g
          onPointerDown={onDown}
          onPointerMove={onMove}
          onPointerUp={onUp}
          onPointerCancel={onUp}
          onKeyDown={onKey}
          tabIndex={mueve ? 0 : -1}
          role="slider"
          aria-label="Escuadra: arrástrala sobre el cartabón"
          aria-valuemin={0}
          aria-valuemax={PARALELA_S_MAX}
          aria-valuenow={Math.round(sv)}
          style={{ cursor: mueve ? (agarrada ? "grabbing" : "grab") : "default", outline: "none" }}
          data-testid="bench-escuadra"
        >
          <Escuadra pose={eq} />
        </g>
        <circle cx={setup.p[0]} cy={setup.p[1]} r="2.4" fill={resultado === true ? "#1f9d55" : "#c0392b"} />
        <text x={setup.p[0] + 5} y={setup.p[1] + 12} fontSize="11" fontWeight="700" fill={INK} fontFamily={SANS}>
          P
        </text>
      </svg>
    </BenchShell>
  );
}
