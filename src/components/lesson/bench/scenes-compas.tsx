"use client";

import { useEffect, useRef, useState, type PointerEvent as ReactPointerEvent, type KeyboardEvent as ReactKeyboardEvent, type ReactNode } from "react";
import { angDe, clamp, dist, enCirculo, interseccionCirculos, puntoMedio, type Pt } from "./geometry";
import { BenchDefs, Compas, Desk, Regla, Transportador, poseCompas } from "./instruments";
import { useBenchCheck } from "./practice";
import { AMBAR, AZUL, Arco, BenchShell, INK, Resultado, SANS, SVG_CLASS, VERDE, f1, type BenchBlock, type BenchSceneName } from "./scenes";
import { ArcoPlano, Punto, puntero } from "./scenes-trazados";

/* ───────────── Utilidades de animación ───────────── */

export const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
export const lerpP = (a: Pt, b: Pt, t: number): Pt => [lerp(a[0], b[0], t), lerp(a[1], b[1], t)];
/** Fracción (0–1) de `p` dentro del tramo [a, b]. */
export const tramo = (p: number, a: number, b: number) => clamp((p - a) / (b - a), 0, 1);
const norm180 = (a: number) => {
  const d = ((((a + 180) % 360) + 360) % 360) - 180;
  return d === -180 ? 180 : d;
};

/** Sin `matchMedia` (tests) o con «reducir movimiento», las animaciones saltan al estado final. */
function sinMovimiento() {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return typeof window !== "undefined";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/** Progreso 0→1 que se reinicia cada vez que cambia `clave` (por ejemplo, el paso). */
export function useProgreso(clave: string | number, ms: number) {
  const reducido = sinMovimiento();
  const [estado, setEstado] = useState<{ clave: string | number; p: number }>({ clave, p: 0 });
  useEffect(() => {
    if (reducido) return;
    let raf = 0;
    const t0 = performance.now();
    const tick = (ahora: number) => {
      const v = Math.min(1, (ahora - t0) / ms);
      setEstado({ clave, p: v });
      if (v < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [clave, ms, reducido]);
  if (reducido) return 1;
  return estado.clave === clave ? estado.p : 0;
}

/** Arco que se va dibujando de `a1` hacia `a2` según `t` (0–1). */
export function ArcoAnim({ c, r, a1, a2, t }: { c: Pt; r: number; a1: number; a2: number; t: number }) {
  if (t <= 0) return null;
  return <ArcoPlano c={c} r={r} a1={a1} a2={a1 + (a2 - a1) * t} />;
}

/** La regla entra, el lápiz traza la recta por `a` y `b` y la regla se retira. `p` va de 0 a 1. */
function ReglaTrazando({ a, b, p, ext = 40, color = INK, testId }: { a: Pt; b: Pt; p: number; ext?: number; color?: string; testId?: string }) {
  const L = 300;
  const ang = (Math.atan2(b[1] - a[1], b[0] - a[0]) * 180) / Math.PI;
  const rd = (ang * Math.PI) / 180;
  const dir: Pt = [Math.cos(rd), Math.sin(rd)];
  const n: Pt = [-dir[1], dir[0]];
  const mid = puntoMedio(a, b);
  const pose = { x: mid[0] - (dir[0] * L) / 2, y: mid[1] - (dir[1] * L) / 2, rot: ang };
  const entra = tramo(p, 0, 0.3);
  const traza = tramo(p, 0.3, 0.85);
  const sale = tramo(p, 0.85, 1);
  const ini: Pt = [a[0] - dir[0] * ext, a[1] - dir[1] * ext];
  const fin: Pt = [b[0] + dir[0] * ext, b[1] + dir[1] * ext];
  const hasta = lerpP(ini, fin, traza);
  const desp = (1 - entra) * 70;
  return (
    <g data-testid={testId}>
      {traza > 0 ? <line x1={ini[0]} y1={ini[1]} x2={hasta[0]} y2={hasta[1]} stroke={color} strokeWidth="1.5" strokeLinecap="round" /> : null}
      {p < 1 ? (
        <g opacity={entra * (1 - sale)} transform={`translate(${n[0] * desp} ${n[1] * desp})`} pointerEvents="none">
          <Regla pose={pose} len={L} />
        </g>
      ) : null}
    </g>
  );
}

export const MV = { w: 620, h: 380 };
export const MSHEET = { x: 10, y: 10, w: 600, h: 360 };

/* ───────────── Mediatriz: explicación animada ───────────── */

export function MediatrizCompas({ block }: { block: BenchBlock }) {
  const A: Pt = [210, 190];
  const B: Pt = [410, 190];
  const r = 130;
  const [C, D] = interseccionCirculos(A, r, B, r) as [Pt, Pt];
  const M = puntoMedio(A, B);
  const aC = angDe(A, C);
  const aD = angDe(A, D);
  const bC = angDe(B, C);
  const bD = angDe(B, D) < 0 ? angDe(B, D) + 360 : angDe(B, D);
  const S = 26;
  const [step, setStep] = useState(0);
  const [qy, setQy] = useState(C[1] + 28);
  const [qAgarrada, setQAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const p = useProgreso(step, step === 0 ? 4600 : step === 1 ? 5400 : step === 2 ? 3600 : 1);

  const yMin = C[1] - 14;
  const yMax = D[1] + 14;
  const Q: Pt = [M[0], clamp(qy, yMin, yMax)];
  const activoQ = step === 3;
  const onQDown = (ev: ReactPointerEvent) => {
    if (!activoQ) return;
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    setQAgarrada(true);
  };
  const onQMove = (ev: ReactPointerEvent) => {
    if (qAgarrada) setQy(clamp(puntero(svgRef.current, ev)[1], yMin, yMax));
  };
  const onQUp = () => setQAgarrada(false);
  const onQKey = (ev: ReactKeyboardEvent) => {
    if (!activoQ) return;
    const paso = ev.shiftKey ? 20 : 4;
    if (ev.key === "ArrowUp") setQy((v) => clamp(v - paso, yMin, yMax));
    else if (ev.key === "ArrowDown") setQy((v) => clamp(v + paso, yMin, yMax));
    else return;
    ev.preventDefault();
  };

  // Arcos desde A (paso 0 se dibujan; después, completos) y desde B (paso 1 se dibujan).
  const a1 = step === 0 ? { arr: tramo(p, 0, 0.42), aba: tramo(p, 0.58, 1) } : { arr: 1, aba: 1 };
  const b1 = step === 1 ? { arr: tramo(p, 0, 0.42), aba: tramo(p, 0.58, 1) } : step > 1 ? { arr: 1, aba: 1 } : { arr: 0, aba: 0 };

  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 0) {
    const ang = p < 0.42 ? lerp(aC + S, aC - S, p / 0.42) : p < 0.58 ? lerp(aC - S, aD + S, (p - 0.42) / 0.16) : lerp(aD + S, aD - S, (p - 0.58) / 0.42);
    comp = poseCompas(A, enCirculo(A, r, ang));
  } else if (step === 1) {
    // El compás aparece ya clavado en B, con la misma abertura, y empieza a dibujar.
    const ang = p < 0.42 ? lerp(bC - S, bC + S, p / 0.42) : p < 0.58 ? lerp(bC + S, bD - S, (p - 0.42) / 0.16) : lerp(bD - S, bD + S, (p - 0.58) / 0.42);
    comp = poseCompas(B, enCirculo(B, r, ang));
  }

  const extra = activoQ ? (
    <div className="flex flex-col gap-1" data-testid="bench-mediatriz-panel">
      <p className="text-lg font-bold tabular-nums" data-testid="bench-dists">
        <span style={{ color: AZUL }}>QA = {f1(dist(Q, A))} mm</span>
        <span className="mx-2 text-[color:var(--stage-muted,#b8c2d0)]">·</span>
        <span style={{ color: AMBAR }}>QB = {f1(dist(Q, B))} mm</span>
      </p>
    </div>
  ) : null;

  return (
    <BenchShell scene="mediatriz-compas" notes={block.notes} step={step} setStep={setStep} extra={extra} label="Hoja con un segmento AB y la construcción de su mediatriz con compás">
      <svg ref={svgRef} viewBox={`0 0 ${MV.w} ${MV.h}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con un segmento AB y la construcción de su mediatriz con compás" data-testid="bench-mediatriz">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <g data-testid="bench-arcos-a">
          <ArcoAnim c={A} r={r} a1={aC + S} a2={aC - S} t={a1.arr} />
          <ArcoAnim c={A} r={r} a1={aD + S} a2={aD - S} t={a1.aba} />
        </g>
        {step >= 1 ? (
          <g data-testid="bench-arcos-b">
            <ArcoAnim c={B} r={r} a1={bC - S} a2={bC + S} t={b1.arr} />
            <ArcoAnim c={B} r={r} a1={bD - S} a2={bD + S} t={b1.aba} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-testid="bench-recta">
            <ReglaTrazando a={C} b={D} p={step === 2 ? p : 1} ext={22} />
            <path d={`M${M[0] + 10} ${M[1]} L${M[0] + 10} ${M[1] - 10} L${M[0]} ${M[1] - 10}`} fill="none" stroke={INK} strokeWidth="0.9" opacity={step === 2 ? tramo(p, 0.85, 1) : 1} />
            <g opacity={step === 2 ? tramo(p, 0.85, 1) : 1}>
              <text x={M[0] + 12} y={C[1] - 26} fontSize="13" fontWeight="700" fill={VERDE} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                mediatriz
              </text>
              <Punto p={C} nombre="C" dx={8} dy={-2} />
              <Punto p={D} nombre="D" dx={8} dy={14} />
              <Punto p={M} nombre="M" dx={-18} dy={-10} />
            </g>
          </g>
        ) : null}
        {step === 3 ? (
          <g>
            <line x1={Q[0]} y1={Q[1]} x2={A[0]} y2={A[1]} stroke={AZUL} strokeWidth="1.6" strokeDasharray="6 4" />
            <line x1={Q[0]} y1={Q[1]} x2={B[0]} y2={B[1]} stroke={AMBAR} strokeWidth="1.6" strokeDasharray="6 4" />
            <g
              onPointerDown={onQDown}
              onPointerMove={onQMove}
              onPointerUp={onQUp}
              onPointerCancel={onQUp}
              onKeyDown={onQKey}
              tabIndex={0}
              role="slider"
              aria-label="Punto Q sobre la mediatriz"
              aria-valuemin={Math.round(yMin)}
              aria-valuemax={Math.round(yMax)}
              aria-valuenow={Math.round(Q[1])}
              style={{ cursor: qAgarrada ? "grabbing" : "grab", outline: "none" }}
              data-testid="bench-q"
            >
              <circle cx={Q[0]} cy={Q[1]} r="18" fill="transparent" />
              <circle cx={Q[0]} cy={Q[1]} r="7.5" fill={VERDE} stroke="#fff" strokeWidth="1.6" />
            </g>
            <text x={Q[0] + 12} y={Q[1] + 4} fontSize="13" fontWeight="700" fill={INK} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
              Q
            </text>
          </g>
        ) : null}
        <Punto p={A} nombre="A" dx={-16} dy={18} />
        <Punto p={B} nombre="B" dx={8} dy={18} />
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Bisectriz: explicación animada ───────────── */

/** Signo del giro con el que un arco centrado en `c` mirando a `otro` se adentra en el ángulo (lado alejado del vértice). */
function signoInterior(c: Pt, otro: Pt, V: Pt, r: number): 1 | -1 {
  const base = angDe(c, otro);
  return dist(V, enCirculo(c, r, base + 40)) > dist(V, enCirculo(c, r, base - 40)) ? 1 : -1;
}

export function BisectrizCompas({ block }: { block: BenchBlock }) {
  const alfa = clamp(Math.round(block.params?.a ?? 70), 40, 130);
  const V: Pt = [170, 315];
  const r1 = 120;
  const P = enCirculo(V, r1, 0);
  const Qp = enCirculo(V, r1, alfa);
  const cuerda = dist(P, Qp);
  const r2 = clamp(cuerda / 2 + 45, 60, 200);
  const cortes = interseccionCirculos(P, r2, Qp, r2) as [Pt, Pt];
  const T = dist(cortes[0], V) > dist(cortes[1], V) ? cortes[0] : cortes[1];
  const aTP = angDe(P, T);
  const aTQ = angDe(Qp, T);
  const S = 24;
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 0 ? 3200 : step === 1 ? 3600 : step === 2 ? 3600 : 4200);
  const lado2 = enCirculo(V, 250, alfa);
  const bis = enCirculo(V, 290, alfa / 2);
  const mitad = Number.isInteger(alfa / 2) ? `${alfa / 2}°` : `${f1(alfa / 2)}°`;

  // Arco desde V (paso 0), desde P (paso 1) y desde Q (paso 2).
  const tV = step === 0 ? tramo(p, 0, 1) : 1;
  const tP = step === 1 ? p : step > 1 ? 1 : 0;
  const tQ = step === 2 ? p : step > 2 ? 1 : 0;

  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 0) comp = poseCompas(V, enCirculo(V, r1, lerp(-6, alfa + 6, tV)));
  else if (step === 1) comp = poseCompas(P, enCirculo(P, r2, lerp(aTP - S, aTP + S, tP)));
  else if (step === 2) comp = poseCompas(Qp, enCirculo(Qp, r2, lerp(aTQ + S, aTQ - S, tQ)));

  const pb = step === 3 ? p : 1;
  const hastaBorde = lerpP(T, bis, tramo(pb, 0.3, 0.85));

  return (
    <BenchShell scene="bisectriz-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un ángulo y la construcción de su bisectriz con compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un ángulo y la construcción de su bisectriz con compás" data-testid="bench-bisectriz">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <line x1={V[0]} y1={V[1]} x2={V[0] + 400} y2={V[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <line x1={V[0]} y1={V[1]} x2={lado2[0]} y2={lado2[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <ArcoAnim c={V} r={r1} a1={-6} a2={alfa + 6} t={tV} />
        <Punto p={V} nombre="V" dx={-16} dy={18} />
        <g opacity={step === 0 ? tramo(p, 0.85, 1) : 1}>
          <Punto p={P} nombre="P" dx={6} dy={18} />
          <Punto p={Qp} nombre="Q" dx={8} dy={-6} />
        </g>
        {step >= 1 ? <ArcoAnim c={P} r={r2} a1={aTP - S} a2={aTP + S} t={tP} /> : null}
        {step >= 2 ? <ArcoAnim c={Qp} r={r2} a1={aTQ + S} a2={aTQ - S} t={tQ} /> : null}
        {step >= 2 ? (
          <g opacity={step === 2 ? tramo(p, 0.9, 1) : 1}>
            <Punto p={T} nombre="T" dx={8} dy={-6} color={VERDE} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g data-testid="bench-bisectriz-recta">
            <ReglaTrazando a={V} b={T} p={pb} ext={0} color={VERDE} />
            {/* la recta sigue hasta el borde del dibujo */}
            <line x1={T[0]} y1={T[1]} x2={hastaBorde[0]} y2={hastaBorde[1]} stroke={VERDE} strokeWidth="1.5" strokeLinecap="round" />
            <g opacity={tramo(pb, 0.85, 1)}>
              <Arco v={V} a1={0} a2={-alfa / 2} r={74} color={AMBAR} text={mitad} textSize={14} dr={16} />
              <Arco v={V} a1={-alfa / 2} a2={-alfa} r={96} color={AZUL} text={mitad} textSize={14} dr={16} />
              <text x={bis[0] + 6} y={bis[1] - 4} fontSize="13" fontWeight="700" fill={VERDE} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
                bisectriz
              </text>
            </g>
          </g>
        ) : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Práctica paso a paso con compás y regla ───────────── */

/** `angulo`: marcar un ángulo con el transportador arrastrando el segundo lado hasta su valor. */
/** `medida`: tomar con el compás la distancia entre dos puntos (punta en uno, mina en el otro). */
export type Tipo = "centro" | "abertura" | "medida" | "arco" | "regla" | "angulo";

export type Est = {
  /** Fase actual; `fases.length` = construcción terminada. */
  fase: number;
  centros: Pt[];
  radios: number[];
  /** Ángulo de la mina respecto de la dirección de referencia del arco en curso. */
  rho: number;
  /** Tramo de ángulos ya trazado en cada arco. */
  cub: ({ lo: number; hi: number } | null)[];
  clics: Pt[];
  /** Puntos tocados en una fase `medida`. */
  medida: Pt[];
  /** Ángulo (°, antihorario) que marca el segundo lado en una fase `angulo`. */
  ang: number;
};

type CfgArco = { centro: Pt; base: number; signo: 1 | -1; rhoMin: number; rhoMax: number; req: [number, number] };

export type Def = {
  scene: BenchSceneName;
  fases: Tipo[];
  /** Dibujo base de la hoja (segmento, ángulo, puntos…). */
  papel: (est: Est) => ReactNode;
  /** Puntos donde se puede clavar la punta en el centro número `idx`. */
  candidatos: (est: Est, idx: number) => Pt[];
  /** Puntos entre los que se puede tomar una medida con el compás (fase `medida`). */
  medibles?: (est: Est) => Pt[];
  /** Fase `angulo`: vértice, dirección del primer lado, valor que hay que marcar y largo del segundo lado. */
  angulo?: (est: Est) => { centro: Pt; base: number; objetivo: number; largo: number };
  /** Compás fijo que se muestra aparte (por ejemplo, con la medida ya tomada). */
  compasEspecial?: (est: Est, tipo: Tipo | undefined) => { n: Pt; m: Pt } | null;
  radioLim: (a: number) => [number, number];
  radioIni: (a: number, est: Est) => number;
  arco: (est: Est, n: number, radio: number, c: Pt) => CfgArco;
  rhoIni: (n: number) => number;
  /** Puntos de la construcción a los que se ajustan los toques de la regla. */
  cortes: (est: Est) => Pt[];
  /** Toques de la fase final (2 por defecto: dos puntos de la regla; 1: marcar un punto; 6: tres pasadas de la regla). */
  nClics?: number;
  /** Cuánto se prolonga la recta de la regla más allá de los puntos tocados (28 por defecto). */
  extRegla?: number;
  /** Texto de progreso bajo el paso (por ejemplo, «Lados trazados: 1 de 3»). */
  progreso?: (est: Est) => string | null;
  evaluar: (est: Est) => { ok: boolean; mensaje: string };
};

export const SNAP = 14;
const HIT = 24;

function mapaFases(fases: Tipo[]) {
  const arcos: { c: number; a: number }[] = [];
  let c = -1;
  let a = -1;
  fases.forEach((t) => {
    if (t === "centro") c += 1;
    if (t === "abertura" || t === "medida") a += 1;
    if (t === "arco") arcos.push({ c, a });
  });
  return arcos;
}

const cuenta = (fases: Tipo[], hasta: number, t: Tipo) => fases.slice(0, hasta).filter((x) => x === t).length;
/** Cuántas aberturas se han fijado antes de la fase `hasta` (por «abertura» o por «medida»). */
const cuentaAb = (fases: Tipo[], hasta: number) => fases.slice(0, hasta).filter((x) => x === "abertura" || x === "medida").length;

export function Practica({ block, def, vista }: { block: BenchBlock; def: Def; vista: { w: number; h: number; sheet: { x: number; y: number; w: number; h: number } } }) {
  const { fases } = def;
  const mapa = mapaFases(fases);
  const inicial: Est = { fase: 0, centros: [], radios: [], rho: 0, cub: [], clics: [], medida: [], ang: 20 };
  const [est, setEst] = useState<Est>(inicial);
  const [prev, setPrev] = useState<Est[]>([]);
  const [agarrada, setAgarrada] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const svgRef = useRef<SVGSVGElement>(null);

  const hecha = est.fase >= fases.length;
  const tipo = hecha ? undefined : fases[est.fase];
  const evaluacion = def.evaluar(est);
  const { resultado } = useBenchCheck({ ready: hecha, evaluate: () => def.evaluar(est).ok });
  const bloqueada = resultado !== null;

  // Configuración del arco al que se refiere la fase actual.
  const nArcoPrevio = cuenta(fases, est.fase, "arco");
  const nDisp = tipo === "arco" ? nArcoPrevio : tipo === "abertura" ? nArcoPrevio : nArcoPrevio - 1;
  const cfgDe = (n: number, radio: number, estado: Est = est): CfgArco | null => {
    const m = mapa[n];
    if (!m || !estado.centros[m.c]) return null;
    return def.arco(estado, n, radio, estado.centros[m.c]);
  };
  const radioDe = (n: number, estado: Est = est) => estado.radios[mapa[n]?.a ?? 0];

  const entrar = (e: Est, f: number): Est => {
    const t = fases[f];
    const out: Est = { ...e, fase: f, radios: [...e.radios], cub: [...e.cub] };
    if (t === "medida") out.medida = [];
    if (t === "abertura") {
      const a = cuentaAb(fases, f);
      if (out.radios[a] === undefined) out.radios[a] = def.radioIni(a, out);
    }
    if (t === "arco") {
      const n = cuenta(fases, f, "arco");
      out.cub[n] = { lo: out.rho, hi: out.rho };
    }
    return out;
  };
  const avanzar = (e: Est) => {
    setPrev((h) => [...h, est]);
    setEst(entrar(e, e.fase + 1));
    setAviso(null);
  };

  const rhoDe = (cfg: CfgArco, p: Pt) => clamp(norm180(cfg.signo * (angDe(cfg.centro, p) - cfg.base)), cfg.rhoMin, cfg.rhoMax);

  const onDown = (ev: ReactPointerEvent) => {
    if (bloqueada || hecha || !tipo) return;
    const p = puntero(svgRef.current, ev);
    if (tipo === "centro") {
      const idx = cuenta(fases, est.fase, "centro");
      const cand = def.candidatos(est, idx).find((c) => dist(c, p) <= HIT);
      if (!cand) {
        setAviso("Toca el punto donde quieres clavar la punta seca del compás.");
        return;
      }
      const nSig = cuenta(fases, est.fase, "arco");
      avanzar({ ...est, centros: [...est.centros, cand], rho: def.rhoIni(nSig) });
      return;
    }
    if (tipo === "angulo") {
      (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
      setAgarrada(true);
      return;
    }
    if (tipo === "medida") {
      const cand = (def.medibles?.(est) ?? []).find((c) => dist(c, p) <= HIT);
      if (!cand || (est.medida[0] && dist(est.medida[0], cand) < 1)) {
        setAviso(est.medida.length === 0 ? "Toca uno de los dos puntos marcados para clavar la punta del compás." : "Toca el otro punto para colocar la mina.");
        return;
      }
      if (est.medida.length === 0) {
        setEst({ ...est, medida: [cand] });
        setAviso(null);
        return;
      }
      const radios = [...est.radios];
      radios[cuentaAb(fases, est.fase)] = dist(est.medida[0], cand);
      avanzar({ ...est, medida: [...est.medida, cand], radios });
      return;
    }
    if (tipo === "regla") {
      const sn = def.cortes(est).find((c) => dist(c, p) <= SNAP) ?? p;
      const clics = [...est.clics, sn];
      if (clics.length >= (def.nClics ?? 2)) {
        setPrev((h) => [...h, est]);
        setEst({ ...est, clics, fase: fases.length });
      } else setEst({ ...est, clics });
      setAviso(null);
      return;
    }
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    setAgarrada(true);
  };

  const onMove = (ev: ReactPointerEvent) => {
    if (!agarrada || bloqueada || !tipo) return;
    const p = puntero(svgRef.current, ev);
    if (tipo === "angulo") {
      const a = def.angulo?.(est);
      if (a) setEst({ ...est, ang: clamp(Math.round(norm180(angDe(a.centro, p) - a.base)), 0, 180) });
      return;
    }
    if (tipo === "abertura") {
      const aIdx = cuentaAb(fases, est.fase);
      const n = nArcoPrevio;
      const cfg = cfgDe(n, est.radios[aIdx] ?? 80);
      if (!cfg) return;
      const [rMin, rMax] = def.radioLim(aIdx);
      const radio = clamp(dist(cfg.centro, p), rMin, rMax);
      const radios = [...est.radios];
      radios[aIdx] = radio;
      setEst({ ...est, radios, rho: rhoDe(cfg, p) });
    } else if (tipo === "arco") {
      const n = nArcoPrevio;
      const cfg = cfgDe(n, radioDe(n));
      if (!cfg) return;
      const rho = rhoDe(cfg, p);
      const cub = [...est.cub];
      const c0 = cub[n] ?? { lo: rho, hi: rho };
      cub[n] = { lo: Math.min(c0.lo, rho), hi: Math.max(c0.hi, rho) };
      const nuevo = { ...est, rho, cub };
      if (cub[n]!.lo <= cfg.req[0] && cub[n]!.hi >= cfg.req[1]) {
        setAgarrada(false);
        avanzar(nuevo);
      } else setEst(nuevo);
    }
  };
  const onUp = () => {
    setAgarrada(false);
    if (tipo !== "angulo" || bloqueada) return;
    const a = def.angulo?.(est);
    if (!a) return;
    if (Math.abs(est.ang - a.objetivo) <= 1) avanzar({ ...est, ang: a.objetivo });
    else setAviso("El segundo lado todavía no marca el ángulo del giro: ajústalo con la escala del transportador.");
  };

  const fijar = () => {
    if (tipo === "abertura" && !bloqueada) avanzar(est);
  };
  const deshacer = () => {
    setPrev((h) => {
      const ult = h[h.length - 1];
      if (ult) setEst(ult);
      return h.slice(0, -1);
    });
    setAviso(null);
    setAgarrada(false);
  };
  const onKey = (ev: ReactKeyboardEvent) => {
    if (tipo === "angulo" && !bloqueada) {
      const a = def.angulo?.(est);
      const paso = ev.shiftKey ? 10 : 1;
      const nuevo = ev.key === "ArrowLeft" || ev.key === "ArrowUp" ? est.ang + paso : ev.key === "ArrowRight" || ev.key === "ArrowDown" ? est.ang - paso : null;
      if (a && nuevo !== null) {
        const ang = clamp(nuevo, 0, 180);
        if (Math.abs(ang - a.objetivo) <= 0) avanzar({ ...est, ang });
        else setEst({ ...est, ang });
        ev.preventDefault();
      }
      return;
    }
    if (tipo !== "abertura" || bloqueada) return;
    const aIdx = cuentaAb(fases, est.fase);
    const [rMin, rMax] = def.radioLim(aIdx);
    const paso = ev.shiftKey ? 12 : 4;
    const r0 = est.radios[aIdx] ?? 80;
    const r = ev.key === "ArrowRight" || ev.key === "ArrowUp" ? r0 + paso : ev.key === "ArrowLeft" || ev.key === "ArrowDown" ? r0 - paso : null;
    if (r === null) return;
    const radios = [...est.radios];
    radios[aIdx] = clamp(r, rMin, rMax);
    setEst({ ...est, radios });
    ev.preventDefault();
  };

  // --- Dibujo ---
  const arcosDibujados = est.cub.map((cub, n) => {
    if (!cub) return null;
    const cfg = cfgDe(n, radioDe(n));
    if (!cfg) return null;
    return <ArcoPlano key={n} c={cfg.centro} r={radioDe(n)} a1={cfg.base + cfg.signo * cub.lo} a2={cfg.base + cfg.signo * cub.hi} grosor={1.3} />;
  });

  let compas: ReactNode = null;
  const especial = def.compasEspecial?.(est, tipo) ?? null;
  if (especial) {
    const c = poseCompas(especial.n, especial.m);
    compas = (
      <g data-testid="bench-compas" pointerEvents="none" opacity={tipo === "medida" ? 1 : 0.55}>
        <Compas pose={c.pose} open={c.open} />
      </g>
    );
  } else if (nDisp >= 0 && est.centros.length > 0 && !hecha && tipo !== "regla" && tipo !== "medida") {
    const nn = Math.min(nDisp, mapa.length - 1);
    const cfg = cfgDe(nn, radioDe(nn));
    if (cfg) {
      const c = poseCompas(cfg.centro, enCirculo(cfg.centro, radioDe(nn), cfg.base + cfg.signo * est.rho));
      compas = (
        <g data-testid="bench-compas" pointerEvents="none" opacity={tipo === "centro" ? 0.5 : 1}>
          <Compas pose={c.pose} open={c.open} />
        </g>
      );
    }
  }
  // Cada pareja de toques es una pasada de la regla; la última se anima y las anteriores quedan trazadas.
  const parejas = Math.floor(est.clics.length / 2);
  const pRegla = useProgreso(parejas > 0 ? `regla-${est.clics.length}` : "no", 1200);

  const nota = Math.min(est.fase, fases.length - 1);
  const extra = (
    <div className="flex flex-col gap-2">
      {tipo === "abertura" && !bloqueada ? (
        <button
          type="button"
          onClick={fijar}
          data-testid="bench-fijar"
          className="self-start rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-4 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10"
        >
          Fijar abertura
        </button>
      ) : null}
      {def.progreso?.(est) && !bloqueada ? (
        <p className="text-sm font-semibold text-[color:var(--stage-muted,#b8c2d0)]" data-testid="bench-progreso">
          {def.progreso(est)}
        </p>
      ) : null}
      {aviso && !bloqueada ? (
        <p className="text-sm text-amber-200" data-testid="bench-aviso">
          {aviso}
        </p>
      ) : null}
      {bloqueada ? <Resultado ok={resultado === true}>{evaluacion.mensaje}</Resultado> : null}
    </div>
  );

  const nav = (
    <button
      type="button"
      onClick={deshacer}
      disabled={prev.length === 0 || bloqueada}
      data-testid="bench-deshacer"
      className="inline-flex items-center gap-1 rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35"
    >
      Deshacer
    </button>
  );

  return (
    <BenchShell scene={def.scene} notes={block.notes} step={nota} setStep={() => undefined} extra={extra} nav={nav} label="Hoja de dibujo: construcción paso a paso con compás y regla">
      <svg
        ref={svgRef}
        viewBox={`0 0 ${vista.w} ${vista.h}`}
        className={`${SVG_CLASS} touch-none select-none`}
        role="group"
        aria-label="Hoja de dibujo: construcción paso a paso con compás y regla"
        tabIndex={tipo === "abertura" || tipo === "angulo" ? 0 : -1}
        onPointerDown={onDown}
        onPointerMove={onMove}
        onPointerUp={onUp}
        onPointerCancel={onUp}
        onKeyDown={onKey}
        style={{ cursor: bloqueada || hecha ? "default" : tipo === "abertura" || tipo === "arco" || tipo === "angulo" ? (agarrada ? "grabbing" : "grab") : "crosshair", outline: "none" }}
        data-testid="bench-practica"
        data-fase={est.fase}
        data-tipo={tipo ?? "hecha"}
      >
        <BenchDefs />
        <Desk w={vista.w} h={vista.h} sheet={vista.sheet} />
        {def.papel(est)}
        <g data-testid="bench-arcos-practica">{arcosDibujados}</g>
        {tipo === "angulo" && def.angulo ? (() => {
          const a = def.angulo(est);
          const fin = enCirculo(a.centro, a.largo, a.base + est.ang);
          return (
            <g data-testid="bench-angulo" pointerEvents="none">
              <g transform={`translate(${a.centro[0]} ${a.centro[1]}) scale(1.8)`}>
                <Transportador pose={{ x: 0, y: 0, rot: -a.base }} r={70} />
              </g>
              <line x1={a.centro[0]} y1={a.centro[1]} x2={fin[0]} y2={fin[1]} stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
              <circle cx={fin[0]} cy={fin[1]} r="7" fill={AMBAR} stroke="#fff" strokeWidth="1.6" />
              <text x={fin[0] + 10} y={fin[1] - 8} fontSize="14" fontWeight="800" fill={AMBAR} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round" data-testid="bench-angulo-lectura">
                {est.ang}°
              </text>
            </g>
          );
        })() : null}
        {Array.from({ length: parejas }, (_, i) => (
          <ReglaTrazando key={i} a={est.clics[2 * i]} b={est.clics[2 * i + 1]} p={i === parejas - 1 ? pRegla : 1} ext={def.extRegla ?? 28} testId={i === parejas - 1 ? "bench-regla-trazo" : undefined} />
        ))}
        {est.medida.map((c, i) => (
          <g key={`m${i}`} data-testid="bench-medida" pointerEvents="none">
            <circle cx={c[0]} cy={c[1]} r="3.4" fill="none" stroke={AZUL} strokeWidth="1.6" />
            <circle cx={c[0]} cy={c[1]} r="0.9" fill={AZUL} />
          </g>
        ))}
        {est.clics.map((c, i) => (
          <g key={i} data-testid="bench-clic" pointerEvents="none">
            <circle cx={c[0]} cy={c[1]} r="3.4" fill="none" stroke={AMBAR} strokeWidth="1.6" />
            <circle cx={c[0]} cy={c[1]} r="0.9" fill={AMBAR} />
          </g>
        ))}
        {compas}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Mediatriz: práctica ───────────── */

const MA: Pt = [210, 190];
const MB: Pt = [410, 190];
const MAB = dist(MA, MB);

const defMediatriz: Def = {
  scene: "mediatriz-practica",
  fases: ["centro", "abertura", "arco", "centro", "arco", "regla"],
  papel: () => (
    <g>
      <line x1={MA[0]} y1={MA[1]} x2={MB[0]} y2={MB[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <Punto p={MA} nombre="A" dx={-16} dy={18} />
      <Punto p={MB} nombre="B" dx={8} dy={18} />
    </g>
  ),
  candidatos: (est, idx) => (idx === 0 ? [MA, MB] : [dist(est.centros[0], MA) < 1 ? MB : MA]),
  radioLim: () => [40, 170],
  radioIni: () => 70,
  rhoIni: () => 35,
  arco: (est, n, radio, c) => {
    const otro = dist(c, MA) < 1 ? MB : MA;
    const th = radio > MAB / 2 ? (Math.acos(clamp(MAB / (2 * radio), 0, 1)) * 180) / Math.PI : 0;
    const t = Math.max(th, 20) + 6;
    return { centro: c, base: angDe(c, otro), signo: 1, rhoMin: -100, rhoMax: 100, req: [-t, t] };
  },
  cortes: (est) => {
    const r = est.radios[0];
    return r !== undefined && r > MAB / 2 + 0.5 ? (interseccionCirculos(MA, r, MB, r) as [Pt, Pt]) : [];
  },
  evaluar: (est) => {
    const r = est.radios[0] ?? 0;
    if (r <= MAB / 2 + 4) return { ok: false, mensaje: "Con esa abertura los arcos no se cortan: debe ser mayor que la mitad de AB. Pulsa «Reintentar» y abre más el compás." };
    const [C, D] = interseccionCirculos(MA, r, MB, r) as [Pt, Pt];
    const [p1, p2] = est.clics;
    if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos por los que pasa la regla." };
    const bien = (dist(p1, C) <= SNAP + 2 && dist(p2, D) <= SNAP + 2) || (dist(p1, D) <= SNAP + 2 && dist(p2, C) <= SNAP + 2);
    return bien
      ? { ok: true, mensaje: "Correcto: la recta que pasa por los dos puntos donde se cortan los arcos es la mediatriz de AB." }
      : { ok: false, mensaje: "La regla no pasa por los dos puntos donde se cortan los arcos. Pulsa «Reintentar»." };
  },
};

export function MediatrizPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defMediatriz} vista={{ ...MV, sheet: MSHEET }} />;
}

/* ───────────── Bisectriz: práctica ───────────── */

function defBisectriz(alfa: number): Def {
  const V: Pt = [170, 315];
  const lado = (r: number): [Pt, Pt] => [enCirculo(V, r, 0), enCirculo(V, r, alfa)];
  const corte = (est: Est): Pt | null => {
    const [P, Q] = lado(est.radios[0] ?? 90);
    const r2 = est.radios[1];
    if (r2 === undefined || r2 <= dist(P, Q) / 2 + 0.5) return null;
    const c = interseccionCirculos(P, r2, Q, r2) as [Pt, Pt];
    return dist(c[0], V) > dist(c[1], V) ? c[0] : c[1];
  };
  return {
    scene: "bisectriz-practica",
    fases: ["centro", "abertura", "arco", "centro", "abertura", "arco", "centro", "arco", "regla"],
    papel: (est) => {
      const [P, Q] = lado(est.radios[0] ?? 90);
      const l2 = enCirculo(V, 250, alfa);
      return (
        <g>
          <line x1={V[0]} y1={V[1]} x2={V[0] + 400} y2={V[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <line x1={V[0]} y1={V[1]} x2={l2[0]} y2={l2[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
          <Punto p={V} nombre="V" dx={-16} dy={18} />
          {est.fase >= 3 ? (
            <>
              <Punto p={P} nombre="P" dx={6} dy={18} />
              <Punto p={Q} nombre="Q" dx={8} dy={-6} />
            </>
          ) : null}
        </g>
      );
    },
    candidatos: (est, idx) => {
      const [P, Q] = lado(est.radios[0] ?? 90);
      if (idx === 0) return [V];
      if (idx === 1) return [P, Q];
      return [dist(est.centros[1], P) < 1 ? Q : P];
    },
    radioLim: (a) => (a === 0 ? [50, 170] : [30, 200]),
    radioIni: (a, est) => {
      if (a === 0) return 90;
      const [P, Q] = lado(est.radios[0] ?? 90);
      return dist(P, Q) * 0.32;
    },
    rhoIni: (n) => (n === 0 ? 25 : 40),
    arco: (est, n, radio, c) => {
      if (n === 0) return { centro: c, base: 0, signo: 1, rhoMin: -30, rhoMax: alfa + 40, req: [-4, alfa + 4] };
      const [P, Q] = lado(est.radios[0] ?? 90);
      const otro = dist(c, P) < 1 ? Q : P;
      const cu = dist(P, Q);
      const th = radio > cu / 2 ? (Math.acos(clamp(cu / (2 * radio), 0, 1)) * 180) / Math.PI : 45;
      const req: [number, number] = radio > cu / 2 ? [th - 6, th + 6] : [20, 70];
      return { centro: c, base: angDe(c, otro), signo: signoInterior(c, otro, V, radio), rhoMin: -15, rhoMax: 110, req };
    },
    cortes: (est) => {
      const T = corte(est);
      return T ? [V, T] : [V];
    },
    evaluar: (est) => {
      const T = corte(est);
      if (!T) return { ok: false, mensaje: "Con esa abertura los arcos desde P y desde Q no se cortan: debe ser mayor que la mitad de PQ. Pulsa «Reintentar»." };
      const [p1, p2] = est.clics;
      if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos por los que pasa la regla." };
      const bien = (dist(p1, V) <= SNAP + 2 && dist(p2, T) <= SNAP + 2) || (dist(p1, T) <= SNAP + 2 && dist(p2, V) <= SNAP + 2);
      return bien
        ? { ok: true, mensaje: "Correcto: la recta que une el vértice con el corte de los arcos es la bisectriz del ángulo." }
        : { ok: false, mensaje: "La regla debe pasar por el vértice V y por el punto T donde se cortan los arcos. Pulsa «Reintentar»." };
    },
  };
}

export function BisectrizPractica({ block }: { block: BenchBlock }) {
  const alfa = clamp(Math.round(block.params?.a ?? 70), 40, 130);
  const [def] = useState(() => defBisectriz(alfa));
  return <Practica block={block} def={def} vista={{ ...MV, sheet: MSHEET }} />;
}


/* ───────────── Trasladar un ángulo con compás ───────────── */

const TV1: Pt = [110, 270];
const TV2: Pt = [380, 270];
const TR0 = 90;

/** Papel común: el ángulo original en `V`, la nueva semirrecta en `V'` y los puntos que se van marcando. */
function papelTrasladar(alfa: number, nombres: { pq: boolean; p2: boolean; q2: boolean }, r0: number) {
  const P = enCirculo(TV1, r0, 0);
  const Q = enCirculo(TV1, r0, alfa);
  const P2 = enCirculo(TV2, r0, 0);
  const Q2 = enCirculo(TV2, r0, alfa);
  const lado = enCirculo(TV1, 170, alfa);
  return (
    <g>
      <line x1={TV1[0]} y1={TV1[1]} x2={TV1[0] + 200} y2={TV1[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <line x1={TV1[0]} y1={TV1[1]} x2={lado[0]} y2={lado[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <line x1={TV2[0]} y1={TV2[1]} x2={TV2[0] + 220} y2={TV2[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
      <Punto p={TV1} nombre="V" dx={-16} dy={18} />
      <Punto p={TV2} nombre="V′" dx={-18} dy={18} />
      {nombres.pq ? (
        <>
          <Punto p={P} nombre="P" dx={6} dy={18} />
          <Punto p={Q} nombre="Q" dx={8} dy={-6} />
        </>
      ) : null}
      {nombres.p2 ? <Punto p={P2} nombre="P′" dx={6} dy={18} /> : null}
      {nombres.q2 ? <Punto p={Q2} nombre="Q′" dx={8} dy={-6} color={VERDE} /> : null}
    </g>
  );
}

export function TrasladarAnguloCompas({ block }: { block: BenchBlock }) {
  const alfa = clamp(Math.round(block.params?.a ?? 55), 25, 110);
  const r0 = TR0;
  const P = enCirculo(TV1, r0, 0);
  const Q = enCirculo(TV1, r0, alfa);
  const P2 = enCirculo(TV2, r0, 0);
  const Q2 = enCirculo(TV2, r0, alfa);
  const aQ2 = angDe(P2, Q2);
  const cuerda = dist(P, Q);
  const S = 24;
  const [step, setStep] = useState(0);
  const p = useProgreso(step, step === 0 ? 3000 : step === 1 ? 3000 : step === 2 ? 1 : step === 3 ? 3000 : 3600);
  const mitad = `${alfa}°`;

  const tV = step === 0 ? p : 1;
  const tV2 = step === 1 ? p : step > 1 ? 1 : 0;
  const tQ2 = step === 3 ? p : step > 3 ? 1 : 0;
  const pb = step === 4 ? p : 1;
  const lejos = enCirculo(TV2, 200, alfa);
  const hastaBorde = lerpP(Q2, lejos, tramo(pb, 0.3, 0.85));

  let comp: ReturnType<typeof poseCompas> | null = null;
  if (step === 0) comp = poseCompas(TV1, enCirculo(TV1, r0, lerp(-6, alfa + 6, tV)));
  else if (step === 1) comp = poseCompas(TV2, enCirculo(TV2, r0, lerp(-6, alfa + 6, tV2)));
  else if (step === 2) comp = poseCompas(P, Q);
  else if (step === 3) comp = poseCompas(P2, enCirculo(P2, cuerda, lerp(aQ2 - S, aQ2 + S, tQ2)));

  return (
    <BenchShell scene="trasladar-angulo-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un ángulo y su traslado a otra semirrecta con compás">
      <svg viewBox={`0 0 ${MV.w} ${MV.h}`} className={SVG_CLASS} role="group" aria-label="Hoja con un ángulo y su traslado a otra semirrecta con compás" data-testid="bench-trasladar">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        {papelTrasladar(alfa, { pq: step > 0 || p > 0.9, p2: step > 1 || (step === 1 && p > 0.9), q2: step > 3 || (step === 3 && p > 0.9) }, r0)}
        <g data-testid="bench-arco-v">
          <ArcoAnim c={TV1} r={r0} a1={-6} a2={alfa + 6} t={tV} />
        </g>
        {step >= 1 ? (
          <g data-testid="bench-arco-v2">
            <ArcoAnim c={TV2} r={r0} a1={-6} a2={alfa + 6} t={tV2} />
          </g>
        ) : null}
        {step === 2 ? <line x1={P[0]} y1={P[1]} x2={Q[0]} y2={Q[1]} stroke={AMBAR} strokeWidth="2" strokeDasharray="6 4" data-testid="bench-cuerda" /> : null}
        {step >= 3 ? (
          <g data-testid="bench-arco-q2">
            <ArcoAnim c={P2} r={cuerda} a1={aQ2 - S} a2={aQ2 + S} t={tQ2} />
          </g>
        ) : null}
        {step >= 4 ? (
          <g data-testid="bench-trasladado">
            <ReglaTrazando a={TV2} b={Q2} p={pb} ext={0} color={VERDE} />
            <line x1={Q2[0]} y1={Q2[1]} x2={hastaBorde[0]} y2={hastaBorde[1]} stroke={VERDE} strokeWidth="1.5" strokeLinecap="round" />
            <g opacity={tramo(pb, 0.85, 1)}>
              <Arco v={TV1} a1={0} a2={-alfa} r={52} color={AMBAR} text={mitad} textSize={14} dr={16} />
              <Arco v={TV2} a1={0} a2={-alfa} r={52} color={AMBAR} text={mitad} textSize={14} dr={16} />
            </g>
          </g>
        ) : null}
        {comp ? (
          <g data-testid="bench-compas" pointerEvents="none">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

function defTrasladar(alfa: number): Def {
  const radio0 = (est: Est) => est.radios[0] ?? 80;
  const PQ = (est: Est): [Pt, Pt] => [enCirculo(TV1, radio0(est), 0), enCirculo(TV1, radio0(est), alfa)];
  const P2 = (est: Est): Pt => enCirculo(TV2, radio0(est), 0);
  const Q2 = (est: Est): Pt => enCirculo(TV2, radio0(est), alfa);
  return {
    scene: "trasladar-practica",
    fases: ["centro", "abertura", "arco", "centro", "arco", "medida", "centro", "arco", "regla"],
    papel: (est) => papelTrasladar(alfa, { pq: est.fase >= 3, p2: est.fase >= 5, q2: est.fase >= 8 }, radio0(est)),
    candidatos: (est, idx) => (idx === 0 ? [TV1] : idx === 1 ? [TV2] : [P2(est)]),
    medibles: (est) => PQ(est),
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 130],
    radioIni: () => 80,
    rhoIni: (n) => (n === 2 ? -25 : 25),
    arco: (est, n, radio, c) => {
      if (n < 2) return { centro: c, base: 0, signo: 1, rhoMin: -30, rhoMax: alfa + 40, req: [-4, alfa + 4] };
      return { centro: c, base: angDe(c, Q2(est)), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] };
    },
    cortes: (est) => [TV2, Q2(est)],
    evaluar: (est) => {
      const [p1, p2] = est.clics;
      if (!p1 || !p2) return { ok: false, mensaje: "Faltan los dos puntos por los que pasa la regla." };
      const q2 = Q2(est);
      const bien = (dist(p1, TV2) <= SNAP + 2 && dist(p2, q2) <= SNAP + 2) || (dist(p1, q2) <= SNAP + 2 && dist(p2, TV2) <= SNAP + 2);
      return bien
        ? { ok: true, mensaje: "Correcto: el ángulo trasladado mide lo mismo que el original, porque los triángulos VPQ y V′P′Q′ tienen los tres lados iguales." }
        : { ok: false, mensaje: "La regla debe pasar por el vértice V′ y por el punto Q′ donde se cortan los arcos. Pulsa «Reintentar»." };
    },
  };
}

export function TrasladarPractica({ block }: { block: BenchBlock }) {
  const alfa = clamp(Math.round(block.params?.a ?? 55), 25, 110);
  const [def] = useState(() => defTrasladar(alfa));
  return <Practica block={block} def={def} vista={{ ...MV, sheet: MSHEET }} />;
}
