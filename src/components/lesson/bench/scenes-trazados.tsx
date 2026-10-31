"use client";

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
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
import { useBenchCheck } from "./practice";
import { AMBAR, AZUL, Arco, BENCH_STEPS, BenchShell, INK, SANS, SVG_CLASS, VERDE, f1, Resultado, type BenchBlock } from "./scenes";
import { BenchDefs, CARTABON_PTS, Cartabon, Compas, Desk, ESCUADRA_PTS, Escuadra, Transportador, poseCompas } from "./instruments";

/** Punto del puntero en coordenadas del dibujo (en jsdom, sin matriz, se usan las del cliente). */
function puntero(svg: SVGSVGElement | null, ev: ReactPointerEvent): Pt {
  const ctm = svg && typeof svg.getScreenCTM === "function" ? svg.getScreenCTM() : null;
  if (!ctm) return [ev.clientX, ev.clientY];
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
  return [p.x, p.y];
}


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
  const last = BENCH_STEPS["perpendicular-escuadra-cartabon"] - 1;
  const [step, setStep] = useState(0);
  const [s, setS] = useState(0);
  const [agarrada, setAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ x0: number; s0: number } | null>(null);
  const ok = perpPasaPorP(setup, s);
  const { resultado } = useBenchCheck({ ready: step === last, evaluate: () => perpPasaPorP(setup, s) });
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const sv = hecho && !ok ? setup.sStar : s;
  const mueve = shown === last && resultado === null;
  const falta = Math.abs(perpEx(s) - setup.p[0]);

  const goStep = (n: number) => {
    setStep(n);
    if (n < last) setS(0);
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
  const esc = apoyarTriangulo(ESCUADRA_PTS, 0, 1, [perpEx(sv), 0], true);
  const [px] = setup.p;

  const extra =
    resultado === null ? null : resultado ? (
      <Resultado ok>Correcto: el cateto es perpendicular a r porque la escuadra solo se ha deslizado a lo largo de r.</Resultado>
    ) : (
      <Resultado ok={false}>El cateto no pasa por P: queda a {f1(falta)} mm. Pulsa «Reintentar» y vuelve a deslizar la escuadra.</Resultado>
    );

  return (
    <BenchShell scene="perpendicular-escuadra-cartabon" notes={block.notes} step={shown} setStep={goStep} extra={extra} label="Hoja con la recta r, el punto P, el cartabón y la escuadra">
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
            {hecho ? (
              <g data-testid="bench-trazo">
                <line x1={px} y1={90} x2={px} y2={-250} stroke="#2b3138" strokeWidth="1" strokeLinecap="round" />
                <path d={`M${px + 9} 0 L${px + 9} -9 L${px} -9`} fill="none" stroke="#2b3138" strokeWidth="0.9" />
              </g>
            ) : null}
            <g data-testid="bench-cartabon">
              <Cartabon pose={cart} />
            </g>
            <g style={{ opacity: shown >= 1 ? 1 : 0, transition: "opacity 400ms" }}>
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
                aria-valuenow={Math.round(sv)}
                style={{ cursor: mueve ? (agarrada ? "grabbing" : "grab") : "default", outline: "none" }}
                data-testid="bench-escuadra"
              >
                <Escuadra pose={esc} />
              </g>
            </g>
            <circle cx={px} cy={-dP} r="2.6" fill={resultado === true ? "#1f9d55" : "#c0392b"} />
            <text x={px + 8} y={-dP - 6} fontSize="13" fontWeight="700" fill={INK} fontFamily={SANS}>
              P
            </text>
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
  const last = BENCH_STEPS["transportador-medir"] - 1;
  const [step, setStep] = useState(0);
  const [phi, setPhi] = useState(inicial);
  const [agarrada, setAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const { resultado } = useBenchCheck({ ready: step === last, evaluate: () => phi === objetivo });
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const phiV = hecho ? objetivo : phi;
  const activo = shown >= 1;
  const practica = shown === last;
  const mueve = activo && resultado === null;

  const goStep = (n: number) => {
    setStep(n);
    if (n === 1) setPhi(inicial);
    if (n === last) setPhi(objetivo > 90 ? 60 : 120);
  };
  const aAngulo = (ev: ReactPointerEvent) => clamp(Math.round(angDe(V, puntero(svgRef.current, ev))), 0, 180);
  const onDown = (ev: ReactPointerEvent) => {
    if (!mueve) return;
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    setAgarrada(true);
  };
  const onMove = (ev: ReactPointerEvent) => {
    if (agarrada) setPhi(aAngulo(ev));
  };
  const onUp = () => setAgarrada(false);
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!mueve) return;
    const paso = ev.shiftKey ? 10 : 1;
    if (ev.key === "ArrowLeft" || ev.key === "ArrowUp") setPhi((v) => clamp(v + paso, 0, 180));
    else if (ev.key === "ArrowRight" || ev.key === "ArrowDown") setPhi((v) => clamp(v - paso, 0, 180));
    else return;
    ev.preventDefault();
  };

  const tip = enCirculo(V, 175, phiV);
  const extra =
    resultado !== null ? (
      resultado ? (
        <Resultado ok>Correcto: el segundo lado marca {objetivo}° en la escala que parte de 0 sobre el primer lado.</Resultado>
      ) : (
        <Resultado ok={false}>
          El lado marca {phi}° y el ángulo pedido es de {objetivo}°: {phi < objetivo ? `te faltan ${objetivo - phi}°` : `te pasas ${phi - objetivo}°`}. Pulsa «Reintentar».
        </Resultado>
      )
    ) : activo && !practica ? (
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="bench-transp-panel">
        Lectura en la escala exterior{" "}
        <span className="text-2xl font-bold tabular-nums text-[#58c4dd]" data-testid="bench-lectura">
          {phi}°
        </span>
      </p>
    ) : null;

  return (
    <BenchShell scene="transportador-medir" notes={block.notes} step={shown} setStep={goStep} extra={extra} label="Hoja con un transportador centrado en el vértice de un ángulo">
      <svg ref={svgRef} viewBox={`0 0 ${TV.w} ${TV.h}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con un transportador centrado en el vértice de un ángulo" data-testid="bench-transportador">
        <BenchDefs />
        <Desk w={TV.w} h={TV.h} sheet={TSHEET} />
        <line x1={30} y1={V[1]} x2={495} y2={V[1]} stroke={INK} strokeWidth="1.3" strokeLinecap="round" />
        {activo ? <line x1={V[0]} y1={V[1]} x2={tip[0]} y2={tip[1]} stroke={INK} strokeWidth="1.3" strokeLinecap="round" /> : null}
        <g transform={`translate(${V[0]} ${V[1]}) scale(${TK})`}>
          <Transportador pose={{ x: 0, y: 0, rot: 0 }} r={70} />
        </g>
        {activo ? <Arco v={V} a1={0} a2={-phiV} r={46} color={hecho ? VERDE : AMBAR} text={practica && resultado === null ? undefined : `${phiV}°`} textSize={15} dr={18} /> : null}
        {activo ? (
          <g
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            onKeyDown={onKey}
            tabIndex={mueve ? 0 : -1}
            role="slider"
            aria-label="Extremo del segundo lado del ángulo"
            aria-valuemin={0}
            aria-valuemax={180}
            aria-valuenow={phiV}
            style={{ cursor: mueve ? (agarrada ? "grabbing" : "grab") : "default", outline: "none" }}
            data-testid="bench-lado"
          >
            <circle cx={tip[0]} cy={tip[1]} r="16" fill="transparent" />
            <circle cx={tip[0]} cy={tip[1]} r="7" fill={hecho ? VERDE : AMBAR} stroke="#fff" strokeWidth="1.6" />
          </g>
        ) : null}
        {shown === 0 ? (
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

/** Radio y punto de la mina al arrastrar el compás: la punta seca queda en `centro` y la mina sigue al puntero. */
function useCompasArrastrable(svgRef: React.RefObject<SVGSVGElement | null>, centro: Pt, rMin: number, rMax: number, inicial: Pt) {
  const [mina, setMina] = useState<Pt>(inicial);
  const [agarrada, setAgarrada] = useState(false);
  const aMina = (p: Pt): Pt => {
    const d = dist(centro, p) || 1;
    const r = clamp(d, rMin, rMax);
    return [centro[0] + ((p[0] - centro[0]) * r) / d, centro[1] + ((p[1] - centro[1]) * r) / d];
  };
  const down = (ev: ReactPointerEvent) => {
    (ev.currentTarget as Element).setPointerCapture?.(ev.pointerId);
    setAgarrada(true);
  };
  const move = (ev: ReactPointerEvent) => {
    if (agarrada) setMina(aMina(puntero(svgRef.current, ev)));
  };
  const up = () => setAgarrada(false);
  const key = (ev: ReactKeyboardEvent) => {
    const paso = ev.shiftKey ? 12 : 4;
    const r = dist(centro, mina) || 1;
    const nuevo = ev.key === "ArrowRight" || ev.key === "ArrowUp" ? r + paso : ev.key === "ArrowLeft" || ev.key === "ArrowDown" ? r - paso : null;
    if (nuevo === null) return;
    const rr = clamp(nuevo, rMin, rMax);
    setMina([centro[0] + ((mina[0] - centro[0]) * rr) / r, centro[1] + ((mina[1] - centro[1]) * rr) / r]);
    ev.preventDefault();
  };
  return { mina, radio: dist(centro, mina), agarrada, handlers: { onPointerDown: down, onPointerMove: move, onPointerUp: up, onPointerCancel: up, onKeyDown: key } };
}

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
  const last = BENCH_STEPS["mediatriz-compas"] - 1;
  const [step, setStep] = useState(0);
  const [qy, setQy] = useState(C[1] + 28);
  const [qAgarrada, setQAgarrada] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const R_MIN = 40;
  const R_MAX = 170;
  const medio = dist(A, B) / 2;
  const compasPractica = useCompasArrastrable(svgRef, A, R_MIN, R_MAX, enCirculo(A, 70, 35));
  const rP = compasPractica.radio;
  const { resultado } = useBenchCheck({ ready: step === last, evaluate: () => rP >= medio + 5 });
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const practica = shown === last;
  const rVista = hecho && rP < medio + 5 ? r : rP;
  const minaVista = hecho && rP < medio + 5 ? enCirculo(A, r, 35) : compasPractica.mina;
  const yMin = C[1] - 14;
  const yMax = D[1] + 14;
  const Q: Pt = [M[0], clamp(qy, yMin, yMax)];
  const activoQ = shown === 3;

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

  const comp = shown === 0 ? poseCompas(A, enCirculo(A, r, aC + SPAN)) : shown === 1 ? poseCompas(B, enCirculo(B, r, bC - SPAN)) : practica ? poseCompas(A, minaVista) : null;
  const qa = dist(Q, A);
  const qb = dist(Q, B);
  const cortes = practica && rVista > medio ? interseccionCirculos(A, rVista, B, rVista) : null;

  const extra =
    activoQ ? (
      <div className="flex flex-col gap-1" data-testid="bench-mediatriz-panel">
        <p className="text-lg font-bold tabular-nums" data-testid="bench-dists">
          <span style={{ color: AZUL }}>QA = {f1(qa)} mm</span>
          <span className="mx-2 text-[color:var(--stage-muted,#b8c2d0)]">·</span>
          <span style={{ color: AMBAR }}>QB = {f1(qb)} mm</span>
        </p>
      </div>
    ) : resultado === null ? null : resultado ? (
      <Resultado ok>Correcto: con esa abertura los arcos se cortan, y la recta que une los cortes es la mediatriz.</Resultado>
    ) : (
      <Resultado ok={false}>
        {rP <= medio ? "Los arcos no llegan a cortarse: con una abertura igual o menor que la mitad de AB no hay puntos de corte." : "Los arcos casi se tocan: ábrelo algo más para que el corte quede claro."} Pulsa «Reintentar».
      </Resultado>
    );

  return (
    <BenchShell scene="mediatriz-compas" notes={block.notes} step={shown} setStep={(n) => setStep(n)} extra={extra} label="Hoja con un segmento AB y la construcción de su mediatriz con compás">
      <svg ref={svgRef} viewBox={`0 0 ${MV.w} ${MV.h}`} className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con un segmento AB y la construcción de su mediatriz con compás" data-testid="bench-mediatriz">
        <BenchDefs />
        <Desk w={MV.w} h={MV.h} sheet={MSHEET} />
        <line x1={A[0]} y1={A[1]} x2={B[0]} y2={B[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        {!practica ? (
          <g data-testid="bench-arcos-a">
            <ArcoPlano c={A} r={r} a1={aC - SPAN} a2={aC + SPAN} />
            <ArcoPlano c={A} r={r} a1={aD - SPAN} a2={aD + SPAN} />
          </g>
        ) : null}
        {!practica && shown >= 1 ? (
          <g data-testid="bench-arcos-b">
            <ArcoPlano c={B} r={r} a1={bC - SPAN} a2={bC + SPAN} />
            <ArcoPlano c={B} r={r} a1={bD - SPAN} a2={bD + SPAN} />
          </g>
        ) : null}
        {practica ? (
          <g data-testid="bench-arcos-practica">
            <ArcoPlano c={A} r={rVista} a1={-62} a2={62} />
            <ArcoPlano c={B} r={rVista} a1={118} a2={242} />
          </g>
        ) : null}
        {!practica && shown >= 2 ? (
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
        {hecho && cortes ? (
          <g data-testid="bench-recta">
            <line x1={cortes[0][0]} y1={cortes[0][1] - 20} x2={cortes[1][0]} y2={cortes[1][1] + 20} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
            <Punto p={cortes[0]} nombre="C" dx={8} dy={-2} />
            <Punto p={cortes[1]} nombre="D" dx={8} dy={14} />
            <Punto p={M} nombre="M" dx={-18} dy={-10} />
          </g>
        ) : null}
        {shown === 3 ? (
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
          <g
            data-testid="bench-compas"
            {...(practica && resultado === null ? compasPractica.handlers : {})}
            tabIndex={practica && resultado === null ? 0 : -1}
            role={practica ? "slider" : undefined}
            aria-label={practica ? "Compás: arrastra la mina para cambiar la abertura" : undefined}
            aria-valuemin={practica ? R_MIN : undefined}
            aria-valuemax={practica ? R_MAX : undefined}
            aria-valuenow={practica ? Math.round(rVista) : undefined}
            style={{ cursor: practica && resultado === null ? (compasPractica.agarrada ? "grabbing" : "grab") : "default", outline: "none" }}
          >
            {practica ? <circle cx={minaVista[0]} cy={minaVista[1]} r="22" fill="transparent" /> : null}
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}

/* ───────────── Bisectriz con compás ───────────── */

/** Arco que sale de `c` hacia el interior del ángulo (el lado alejado del vértice) mirando a `otro`. */
function arcoInterior(c: Pt, otro: Pt, V: Pt, r: number): [number, number] {
  const th = angDe(c, otro);
  const sign = dist(V, enCirculo(c, r, th + 40)) > dist(V, enCirculo(c, r, th - 40)) ? 1 : -1;
  return [th - sign * 8, th + sign * 100];
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
  const SPAN = 24;
  const last = BENCH_STEPS["bisectriz-compas"] - 1;
  const [step, setStep] = useState(0);
  const svgRef = useRef<SVGSVGElement>(null);
  const compasPractica = useCompasArrastrable(svgRef, P, 30, 200, enCirculo(P, cuerda * 0.32, 100));
  const rP = compasPractica.radio;
  const { resultado } = useBenchCheck({ ready: step === last, evaluate: () => rP >= cuerda / 2 + 5 });
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const practica = shown === last;
  const rVista = hecho && rP < cuerda / 2 + 5 ? r2 : rP;
  const minaVista = hecho && rP < cuerda / 2 + 5 ? enCirculo(P, r2, 100) : compasPractica.mina;
  const lado2 = enCirculo(V, 250, alfa);
  const bis = enCirculo(V, 290, alfa / 2);
  const corteVista = practica && rVista > cuerda / 2 ? (() => {
    const c = interseccionCirculos(P, rVista, Qp, rVista) as [Pt, Pt];
    return dist(c[0], V) > dist(c[1], V) ? c[0] : c[1];
  })() : null;
  const comp =
    shown === 0 ? poseCompas(V, enCirculo(V, r1, alfa + 7)) : shown === 1 ? poseCompas(P, enCirculo(P, r2, aTP - SPAN)) : shown === 2 ? poseCompas(Qp, enCirculo(Qp, r2, aTQ + SPAN)) : practica ? poseCompas(P, minaVista) : null;
  const mitad = Number.isInteger(alfa / 2) ? `${alfa / 2}°` : `${f1(alfa / 2)}°`;
  const [pa1, pa2] = arcoInterior(P, Qp, V, rVista);
  const [qa1, qa2] = arcoInterior(Qp, P, V, rVista);

  const extra =
    resultado === null ? null : resultado ? (
      <Resultado ok>Correcto: con esa abertura los arcos desde P y desde Q se cortan en T, y VT es la bisectriz.</Resultado>
    ) : (
      <Resultado ok={false}>Los arcos desde P y desde Q no llegan a cortarse: la abertura debe ser mayor que la mitad de PQ. Pulsa «Reintentar».</Resultado>
    );

  return (
    <BenchShell scene="bisectriz-compas" notes={block.notes} step={shown} setStep={(n) => setStep(n)} extra={extra} label="Hoja con un ángulo y la construcción de su bisectriz con compás">
      <svg ref={svgRef} viewBox="0 0 620 380" className={`${SVG_CLASS} touch-none select-none`} role="group" aria-label="Hoja con un ángulo y la construcción de su bisectriz con compás" data-testid="bench-bisectriz">
        <BenchDefs />
        <Desk w={620} h={380} sheet={{ x: 10, y: 10, w: 600, h: 360 }} />
        <line x1={V[0]} y1={V[1]} x2={V[0] + 400} y2={V[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <line x1={V[0]} y1={V[1]} x2={lado2[0]} y2={lado2[1]} stroke={INK} strokeWidth="1.4" strokeLinecap="round" />
        <ArcoPlano c={V} r={r1} a1={-6} a2={alfa + 6} />
        <Punto p={V} nombre="V" dx={-16} dy={18} />
        <Punto p={P} nombre="P" dx={6} dy={18} />
        <Punto p={Qp} nombre="Q" dx={8} dy={-6} />
        {!practica && shown >= 1 ? <ArcoPlano c={P} r={r2} a1={aTP - SPAN} a2={aTP + SPAN} /> : null}
        {!practica && shown >= 2 ? <ArcoPlano c={Qp} r={r2} a1={aTQ - SPAN} a2={aTQ + SPAN} /> : null}
        {!practica && shown >= 2 ? <Punto p={T} nombre="T" dx={8} dy={-6} color={VERDE} /> : null}
        {practica ? (
          <g data-testid="bench-arcos-practica">
            <ArcoPlano c={P} r={rVista} a1={pa1} a2={pa2} />
            <ArcoPlano c={Qp} r={rVista} a1={qa1} a2={qa2} />
          </g>
        ) : null}
        {hecho && corteVista ? (
          <g data-testid="bench-bisectriz-recta">
            <Punto p={corteVista} nombre="T" dx={8} dy={-6} color={VERDE} />
            <line x1={V[0]} y1={V[1]} x2={V[0] + (corteVista[0] - V[0]) * 1.5} y2={V[1] + (corteVista[1] - V[1]) * 1.5} stroke={VERDE} strokeWidth="1.8" strokeLinecap="round" />
          </g>
        ) : null}
        {!practica && shown >= 3 ? (
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
          <g
            data-testid="bench-compas"
            {...(practica && resultado === null ? compasPractica.handlers : {})}
            tabIndex={practica && resultado === null ? 0 : -1}
            role={practica ? "slider" : undefined}
            aria-label={practica ? "Compás: arrastra la mina para cambiar la abertura" : undefined}
            aria-valuemin={practica ? 30 : undefined}
            aria-valuemax={practica ? 200 : undefined}
            aria-valuenow={practica ? Math.round(rVista) : undefined}
            style={{ cursor: practica && resultado === null ? (compasPractica.agarrada ? "grabbing" : "grab") : "default", outline: "none" }}
          >
            {practica ? <circle cx={minaVista[0]} cy={minaVista[1]} r="22" fill="transparent" /> : null}
            <Compas pose={comp.pose} open={comp.open} />
          </g>
        ) : null}
      </svg>
    </BenchShell>
  );
}
