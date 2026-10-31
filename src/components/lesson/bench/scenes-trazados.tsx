"use client";

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  PERP_EX0,
  PERP_S_MAX,
  angDe,
  apoyarTriangulo,
  clamp,
  dist,
  enCirculo,
  interseccionCirculos,
  perpEx,
  perpPasaPorP,
  perpSetup,
  puntoMedio,
  rot,
  sub,
  type Pt,
} from "./geometry";
import { AMBAR, AZUL, Arco, BenchShell, INK, SANS, SVG_CLASS, VERDE, f1, type BenchBlock } from "./scenes";
import { BenchDefs, CARTABON_PTS, Cartabon, Compas, Desk, ESCUADRA_PTS, Escuadra, Transportador, poseCompas } from "./instruments";

/** Punto del puntero en coordenadas del dibujo (en jsdom, sin matriz, se usan las del cliente). */
function puntero(svg: SVGSVGElement | null, ev: ReactPointerEvent): Pt {
  const ctm = svg && typeof svg.getScreenCTM === "function" ? svg.getScreenCTM() : null;
  if (!ctm) return [ev.clientX, ev.clientY];
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
  return [p.x, p.y];
}

const BTN =
  "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-4 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40";
const GHOST = "rounded-lg px-3 py-2 text-sm text-[color:var(--stage-muted,#b8c2d0)] underline-offset-2 hover:underline";

/** Arco de circunferencia (ángulos antihorarios, 0° = derecha) en trazo de grafito. */
function ArcoPlano({ c, r, a1, a2, grosor = 1.1, color = INK }: { c: Pt; r: number; a1: number; a2: number; grosor?: number; color?: string }) {
  const s = enCirculo(c, r, a1);
  const e = enCirculo(c, r, a2);
  return <path d={`M${s[0]} ${s[1]} A${r} ${r} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} ${a2 > a1 ? 0 : 1} ${e[0]} ${e[1]}`} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" />;
}

function Punto({ p, nombre, dx = 7, dy = -7, color = INK }: { p: Pt; nombre: string; dx?: number; dy?: number; color?: string }) {
  return (
    <g>
      <circle cx={p[0]} cy={p[1]} r="2.4" fill={color} />
      <text x={p[0] + dx} y={p[1] + dy} fontSize="13" fontWeight="700" fill={INK} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
        {nombre}
      </text>
    </g>
  );
}

/* ───────────── Perpendicular con escuadra y cartabón (se arrastra la escuadra por r) ───────────── */

const PV = { w: 520, h: 420 };
const PSHEET = { x: 30, y: 16, w: 460, h: 404 };

export function PerpendicularEscuadraCartabon({ block }: { block: BenchBlock }) {
  const th = clamp(block.params?.a ?? 8, -15, 25);
  const dP = clamp(block.params?.b ?? 80, 50, 120);
  const setup = perpSetup(dP);
  const c0: Pt = [105, 250];
  const [step, setStep] = useState(0);
  const [s, setS] = useState(0);
  const [traced, setTraced] = useState(false);
  const [agarrada, setAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x0: number; s0: number } | null>(null);
  const mueve = step === 2 && !traced;
  const ok = perpPasaPorP(setup, s);
  const falta = Math.abs(perpEx(s) - setup.p[0]);

  const goStep = (n: number) => {
    setStep(n);
    if (n < 2) {
      setS(0);
      setTraced(false);
    }
  };
  const aLocal = (ev: ReactPointerEvent) => rot(sub(puntero(svgRef.current, ev), c0), -th)[0];
  const onDown = (ev: ReactPointerEvent) => {
    if (!mueve) return;
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    drag.current = { x0: aLocal(ev), s0: s };
    setAgarrada(true);
  };
  const onMove = (ev: ReactPointerEvent) => {
    if (drag.current) setS(clamp(drag.current.s0 + aLocal(ev) - drag.current.x0, 0, PERP_S_MAX));
  };
  const onUp = () => {
    drag.current = null;
    setAgarrada(false);
  };
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!mueve) return;
    const paso = ev.shiftKey ? 10 : 2;
    if (ev.key === "ArrowRight" || ev.key === "ArrowUp") setS((v) => clamp(v + paso, 0, PERP_S_MAX));
    else if (ev.key === "ArrowLeft" || ev.key === "ArrowDown") setS((v) => clamp(v - paso, 0, PERP_S_MAX));
    else return;
    ev.preventDefault();
  };

  const cart = apoyarTriangulo(CARTABON_PTS, 0, 1, [0, 0], false);
  const esc = apoyarTriangulo(ESCUADRA_PTS, 0, 1, [perpEx(s), 0], true);
  const [px] = setup.p;

  const extra =
    step === 2 ? (
      <div className="flex flex-col gap-2" data-testid="bench-perp-panel">
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          Distancia del cateto a P{" "}
          <span className="text-xl font-bold tabular-nums" style={{ color: ok ? "#83c167" : "#fc6255" }} data-testid="bench-dist">
            {f1(falta)} mm
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-3">
          <button type="button" className={BTN} disabled={!ok || traced} onClick={() => setTraced(true)} data-testid="bench-trazar">
            Trazar la perpendicular
          </button>
          {s > 0 || traced ? (
            <button
              type="button"
              className={GHOST}
              onClick={() => {
                setS(0);
                setTraced(false);
              }}
              data-testid="bench-reiniciar"
            >
              Volver a empezar
            </button>
          ) : null}
        </div>
        <p className="text-sm leading-snug text-[color:var(--stage-ink,#fff)]" data-testid="bench-estado">
          {traced
            ? "Hecho: el cateto es perpendicular a r porque la escuadra solo se ha deslizado a lo largo de r."
            : ok
              ? "El cateto pasa por P. Ya puedes trazar."
              : "Arrastra la escuadra a lo largo de r hasta que su cateto vertical pase por P."}
        </p>
      </div>
    ) : null;

  return (
    <BenchShell scene="perpendicular-escuadra-cartabon" notes={block.notes} step={step} setStep={goStep} extra={extra} label="Hoja con la recta r, el punto P, el cartabón y la escuadra">
      <svg ref={svgRef} viewBox={`0 0 ${PV.w} ${PV.h}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con la recta r, el punto P, el cartabón y la escuadra" data-testid="bench-perpendicular">
        <BenchDefs />
        <clipPath id="bench-perp-clip">
          <rect x={PSHEET.x} y={PSHEET.y} width={PSHEET.w} height={PSHEET.h} />
        </clipPath>
        <Desk w={PV.w} h={PV.h} sheet={PSHEET} />
        <g clipPath="url(#bench-perp-clip)">
          <g transform={`translate(${c0[0]} ${c0[1]}) rotate(${th})`}>
            <line x1={-70} y1={0} x2={400} y2={0} stroke={INK} strokeWidth="0.9" />
            <text x={-40} y={-8} fontSize="12" fontWeight="700" fill={INK} fontFamily={SANS}>
              r
            </text>
            {traced ? (
              <g data-testid="bench-trazo">
                <line x1={px} y1={90} x2={px} y2={-250} stroke="#2b3138" strokeWidth="1" strokeLinecap="round" />
                <path d={`M${px + 9} 0 L${px + 9} -9 L${px} -9`} fill="none" stroke="#2b3138" strokeWidth="0.9" />
              </g>
            ) : null}
            <g data-testid="bench-cartabon">
              <Cartabon pose={cart} />
            </g>
            <g style={{ opacity: step >= 1 ? 1 : 0, transition: "opacity 400ms" }}>
              <g
                onPointerDown={onDown}
                onPointerMove={onMove}
                onPointerUp={onUp}
                onPointerCancel={onUp}
                onKeyDown={onKey}
                tabIndex={mueve ? 0 : -1}
                role="slider"
                aria-label="Escuadra: arrástrala a lo largo de r"
                aria-valuemin={0}
                aria-valuemax={PERP_S_MAX}
                aria-valuenow={Math.round(s)}
                style={{ cursor: mueve ? (agarrada ? "grabbing" : "grab") : "default", outline: "none" }}
                data-testid="bench-escuadra"
              >
                <Escuadra pose={esc} />
              </g>
            </g>
            <circle cx={px} cy={-dP} r="2.6" fill={ok && step === 2 ? "#1f9d55" : "#c0392b"} />
            <text x={px + 8} y={-dP - 6} fontSize="13" fontWeight="700" fill={INK} fontFamily={SANS}>
              P
            </text>
            {ok && mueve ? <line x1={px} y1={0} x2={px} y2={-200} stroke="#1f9d55" strokeWidth="1.4" strokeDasharray="4 3" /> : null}
            {mueve && s < 6 ? (
              <g data-testid="bench-pista" pointerEvents="none">
                <line x1={PERP_EX0 + 45} y1={-30} x2={PERP_EX0 + 105} y2={-30} stroke="#d97706" strokeWidth="2.6" strokeLinecap="round" />
                <circle cx={PERP_EX0 + 105} cy={-30} r="4.2" fill="#d97706" />
              </g>
            ) : null}
          </g>
        </g>
      </svg>
    </BenchShell>
  );
}

/* ───────────── Transportador: medir y dibujar ángulos ───────────── */

const TV = { w: 520, h: 330 };
const TSHEET = { x: 10, y: 10, w: 500, h: 310 };
const TK = 2.2;
const TR = 70 * TK;

export function TransportadorMedir({ block }: { block: BenchBlock }) {
  const inicial = clamp(Math.round(block.params?.a ?? 37), 5, 175);
  const objetivo = clamp(Math.round(block.params?.b ?? 130), 5, 175);
  const V: Pt = [240, 262];
  const [step, setStep] = useState(0);
  const [phi, setPhi] = useState(inicial);
  const [agarrada, setAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const activo = step >= 1;
  const meta = step === 2;
  const logrado = meta && phi === objetivo;

  const goStep = (n: number) => {
    setStep(n);
    if (n === 1) setPhi(inicial);
    if (n === 2) setPhi(objetivo > 90 ? 60 : 120);
  };
  const aAngulo = (ev: ReactPointerEvent) => clamp(Math.round(angDe(V, puntero(svgRef.current, ev))), 0, 180);
  const onDown = (ev: ReactPointerEvent) => {
    if (!activo) return;
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    setAgarrada(true);
  };
  const onMove = (ev: ReactPointerEvent) => {
    if (agarrada) setPhi(aAngulo(ev));
  };
  const onUp = () => setAgarrada(false);
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!activo) return;
    const paso = ev.shiftKey ? 10 : 1;
    if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") setPhi((v) => clamp(v + paso, 0, 180));
    else if (ev.key === "ArrowRight" || ev.key === "ArrowDown") setPhi((v) => clamp(v - paso, 0, 180));
    else return;
    ev.preventDefault();
  };

  const tip = enCirculo(V, 175, phi);
  const extra = activo ? (
    <div className="flex flex-col gap-1.5" data-testid="bench-transp-panel">
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
        Lectura en la escala exterior{" "}
        <span className="text-2xl font-bold tabular-nums" style={{ color: logrado ? "#83c167" : "#58c4dd" }} data-testid="bench-lectura">
          {phi}°
        </span>
      </p>
      {meta ? (
        <p className="text-sm leading-snug text-[color:var(--stage-ink,#fff)]" data-testid="bench-estado">
          {logrado ? `Correcto: has dibujado un ángulo de ${objetivo}°.` : `Objetivo: ${objetivo}°. ${phi < objetivo ? `Te faltan ${objetivo - phi}°.` : `Te pasas ${phi - objetivo}°.`}`}
        </p>
      ) : (
        <p className="text-sm leading-snug text-[color:var(--stage-ink,#fff)]">Arrastra el extremo del segundo lado y mira cómo cambia la lectura.</p>
      )}
    </div>
  ) : null;

  return (
    <BenchShell scene="transportador-medir" notes={block.notes} step={step} setStep={goStep} extra={extra} label="Hoja con un transportador centrado en el vértice de un ángulo">
      <svg ref={svgRef} viewBox={`0 0 ${TV.w} ${TV.h}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con un transportador centrado en el vértice de un ángulo" data-testid="bench-transportador">
        <BenchDefs />
        <Desk w={TV.w} h={TV.h} sheet={TSHEET} />
        <line x1={30} y1={V[1]} x2={495} y2={V[1]} stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
        {activo ? <line x1={V[0]} y1={V[1]} x2={tip[0]} y2={tip[1]} stroke={INK} strokeWidth="1.3" strokeLinecap="round" /> : null}
        <g transform={`translate(${V[0]} ${V[1]}) scale(${TK})`}>
          <Transportador pose={{ x: 0, y: 0, rot: 0 }} r={70} />
        </g>
        {activo ? <Arco v={V} a1={0} a2={-phi} r={46} color={logrado ? VERDE : AMBAR} text={`${phi}°`} textSize={15} dr={18} /> : null}
        {activo ? (
          <g
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
            tabIndex={0}
            role="slider"
            aria-label="Extremo del segundo lado del ángulo"
            aria-valuemin={0}
            aria-valuemax={180}
            aria-valuenow={phi}
            style={{ cursor: agarrada ? "grabbing" : "grab", outline: "none" }}
            data-testid="bench-lado"
          >
            <circle cx={tip[0]} cy={tip[1]} r="16" fill="transparent" />
            <circle cx={tip[0]} cy={tip[1]} r="7" fill={logrado ? VERDE : AMBAR} stroke="#fff" strokeWidth="1.6" />
          </g>
        ) : null}
        {step === 0 ? (
          <g fontFamily={SANS} fontSize="12" fontWeight="700" stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
            <line x1={V[0] - 100} y1={V[1] + 36} x2={V[0] - 6} y2={V[1] + 4} stroke={AZUL} strokeWidth="1.6" />
            <text x={V[0] - 215} y={V[1] + 46} fill={AZUL}>centro sobre el vértice</text>
            <text x={V[0] + TR + 18} y={V[1] - 6} fill={AMBAR}>0° sobre el lado</text>
            <line x1={V[0] + TR + 12} y1={V[1] - 18} x2={V[0] + TR + 12} y2={V[1] - 2} stroke={AMBAR} strokeWidth="1.6" />
          </g>
        ) : null}
        <Punto p={V} nombre="V" dx={-14} dy={20} />
      </svg>
    </BenchShell>
  );
}

/* ───────────── Mediatriz con compás ───────────── */

const MV = { w: 620, h: 380 };
const MSHEET = { x: 10, y: 10, w: 600, h: 360 };

export function MediatrizCompas({ block }: { block: BenchBlock }) {
  const A: Pt = [210, 190];
  const B: Pt = [410, 190];
  const r = 130;
  const [C, D] = interseccionCirculos(A, r, B, r) as [Pt, Pt];
  const M = puntoMedio(A, B);
  const aC = angDe(A, C);
  const aD = angDe(A, D);
  const bC = angDe(B, C);
  const bD = angDe(B, D);
  const SPAN = 26;
  const [step, setStep] = useState(0);
  const [qy, setQy] = useState(C[1] + 28);
  const [agarrada, setAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const yMin = C[1] - 14;
  const yMax = D[1] + 14;
  const Q: Pt = [M[0], clamp(qy, yMin, yMax)];
  const activo = step === 3;

  const onDown = (ev: ReactPointerEvent) => {
    if (!activo) return;
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    setAgarrada(true);
  };
  const onMove = (ev: ReactPointerEvent) => {
    if (agarrada) setQy(clamp(puntero(svgRef.current, ev)[1], yMin, yMax));
  };
  const onUp = () => setAgarrada(false);
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!activo) return;
    const paso = ev.shiftKey ? 20 : 4;
    if (ev.key === "ArrowUp") setQy((v) => clamp(v - paso, yMin, yMax));
    else if (ev.key === "ArrowDown") setQy((v) => clamp(v + paso, yMin, yMax));
    else return;
    ev.preventDefault();
  };

  const comp = step === 0 ? poseCompas(A, enCirculo(A, r, aC + SPAN)) : step === 1 ? poseCompas(B, enCirculo(B, r, bC - SPAN)) : null;
  const qa = dist(Q, A);
  const qb = dist(Q, B);

  const extra = activo ? (
    <div className="flex flex-col gap-1.5" data-testid="bench-mediatriz-panel">
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
        Distancias de Q a los extremos
      </p>
      <p className="text-lg font-bold tabular-nums" data-testid="bench-dists">
        <span style={{ color: AZUL }}>QA = {f1(qa)} mm</span>
        <span className="mx-2 text-[color:var(--stage-muted,#b8c2d0)]">·</span>
        <span style={{ color: AMBAR }}>QB = {f1(qb)} mm</span>
      </p>
      <p className="text-sm leading-snug text-[color:var(--stage-ink,#fff)]">Arrastra Q a lo largo de la mediatriz: las dos distancias son siempre iguales.</p>
    </div>
  ) : null;

  return (
    <BenchShell scene="mediatriz-compas" notes={block.notes} step={step} setStep={setStep} extra={extra} label="Hoja con un segmento AB y la construcción de su mediatriz con compás">
      <svg ref={svgRef} viewBox={`0 0 ${MV.w} ${MV.h}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con un segmento AB y la construcción de su mediatriz con compás" data-testid="bench-mediatriz">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <g data-testid="bench-arcos-a">
          <ArcoPlano c={A} r={r} a1={aC - SPAN} a2={aC + SPAN} />
          <ArcoPlano c={A} r={r} a1={aD - SPAN} a2={aD + SPAN} />
        </g>
        {step >= 1 ? (
          <g data-testid="bench-arcos-b">
            <ArcoPlano c={B} r={r} a1={bC - SPAN} a2={bC + SPAN} />
            <ArcoPlano c={B} r={r} a1={bD - SPAN} a2={bD + SPAN} />
          </g>
        ) : null}
        {step >= 2 ? (
          <g data-testid="bench-recta">
            <line x1={C[0]} y1={C[1] - 22} x2={D[0]} y2={D[1] + 22} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
            <path d={`M${M[0] + 10} ${M[1]} L${M[0] + 10} ${M[1] - 10} L${M[0]} ${M[1] - 10}`} fill="none" stroke={INK} strokeWidth="0.9" />
            <text x={M[0] + 12} y={C[1] - 26} fontSize="13" fontWeight="700" fill={VERDE} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
              mediatriz
            </text>
            <Punto p={C} nombre="C" dx={8} dy={-2} />
            <Punto p={D} nombre="D" dx={8} dy={14} />
            <Punto p={M} nombre="M" dx={-18} dy={-10} />
          </g>
        ) : null}
        {step >= 3 ? (
          <g>
            <line x1={Q[0]} y1={Q[1]} x2={A[0]} y2={A[1]} stroke={AZUL} strokeWidth="1.6" strokeDasharray="6 4" />
            <line x1={Q[0]} y1={Q[1]} x2={B[0]} y2={B[1]} stroke={AMBAR} strokeWidth="1.6" strokeDasharray="6 4" />
            <g
              onPointerDown={onDown}
              onPointerMove={onMove}
              onPointerUp={onUp}
              onPointerCancel={onUp}
              onKeyDown={onKey}
              tabIndex={0}
              role="slider"
              aria-label="Punto Q sobre la mediatriz"
              aria-valuemin={Math.round(yMin)}
              aria-valuemax={Math.round(yMax)}
              aria-valuenow={Math.round(Q[1])}
              style={{ cursor: agarrada ? "grabbing" : "grab", outline: "none" }}
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
          <g data-testid="bench-compas" style={{ transition: "opacity 300ms" }}>
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Bisectriz con compás ───────────── */

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
  const SPAN = 24;
  const [step, setStep] = useState(0);
  const lado2 = enCirculo(V, 250, alfa);
  const bis = enCirculo(V, 290, alfa / 2);
  const comp =
    step === 0 ? poseCompas(V, enCirculo(V, r1, alfa + 7)) : step === 1 ? poseCompas(P, enCirculo(P, r2, aTP - SPAN)) : step === 2 ? poseCompas(Qp, enCirculo(Qp, r2, aTQ + SPAN)) : null;
  const mitad = Number.isInteger(alfa / 2) ? `${alfa / 2}°` : `${f1(alfa / 2)}°`;

  return (
    <BenchShell scene="bisectriz-compas" notes={block.notes} step={step} setStep={setStep} label="Hoja con un ángulo y la construcción de su bisectriz con compás">
      <svg viewBox="0 0 620 380" className={SVG_CLASS} role="group" aria-label="Hoja con un ángulo y la construcción de su bisectriz con compás" data-testid="bench-bisectriz">
        <BenchDefs />
        <Desk w={620} h={380} sheet={{ x: 10, y: 10, w: 600, h: 360 }} />
        <line x1={V[0]} y1={V[1]} x2={V[0] + 400} y2={V[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <line x1={V[0]} y1={V[1]} x2={lado2[0]} y2={lado2[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <ArcoPlano c={V} r={r1} a1={-6} a2={alfa + 6} />
        <Punto p={V} nombre="V" dx={-16} dy={18} />
        <Punto p={P} nombre="P" dx={6} dy={18} />
        <Punto p={Qp} nombre="Q" dx={8} dy={-6} />
        {step >= 1 ? <ArcoPlano c={P} r={r2} a1={aTP - SPAN} a2={aTP + SPAN} /> : null}
        {step >= 2 ? <ArcoPlano c={Qp} r={r2} a1={aTQ - SPAN} a2={aTQ + SPAN} /> : null}
        {step >= 2 ? <Punto p={T} nombre="T" dx={8} dy={-6} color={VERDE} /> : null}
        {step >= 3 ? (
          <g data-testid="bench-bisectriz-recta">
            <line x1={V[0]} y1={V[1]} x2={bis[0]} y2={bis[1]} stroke={VERDE} strokeWidth="1.8" strokeLinecap="round" />
            <Arco v={V} a1={0} a2={-alfa / 2} r={74} color={AMBAR} text={mitad} textSize={14} dr={16} />
            <Arco v={V} a1={-alfa / 2} a2={-alfa} r={96} color={AZUL} text={mitad} textSize={14} dr={16} />
            <text x={bis[0] + 6} y={bis[1] - 4} fontSize="13" fontWeight="700" fill={VERDE} fontFamily={SANS} stroke="#fffefa" strokeWidth="3.5" paintOrder="stroke" strokeLinejoin="round">
              bisectriz
            </text>
          </g>
        ) : null}
        {comp ? (
          <g data-testid="bench-compas">
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

