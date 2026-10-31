"use client";

import { useRef, useState, type KeyboardEvent as ReactKeyboardEvent, type PointerEvent as ReactPointerEvent } from "react";
import {
  PERP_S_MAX,
  angDe,
  apoyarTriangulo,
  clamp,
  enCirculo,
  perpEx,
  perpPasaPorP,
  perpSetup,
  rot,
  sub,
  type Pt,
} from "./geometry";
import { useBenchCheck } from "./practice";
import { AMBAR, AZUL, Arco, BENCH_STEPS, BenchShell, INK, SANS, SVG_CLASS, VERDE, Resultado, type BenchBlock } from "./scenes";
import { BenchDefs, CARTABON_PTS, Cartabon, Desk, ESCUADRA_PTS, Escuadra, Transportador } from "./instruments";

/** Punto del puntero en coordenadas del dibujo (en jsdom, sin matriz, se usan las del cliente). */
export function puntero(svg: SVGSVGElement | null, ev: ReactPointerEvent): Pt {
  const ctm = svg && typeof svg.getScreenCTM === "function" ? svg.getScreenCTM() : null;
  if (!ctm) return [ev.clientX, ev.clientY];
  const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
  return [p.x, p.y];
}


/** Arco de circunferencia (ángulos antihorarios, 0° = derecha) en trazo de grafito. */
export function ArcoPlano({ c, r, a1, a2, grosor = 1.1, color = INK }: { c: Pt; r: number; a1: number; a2: number; grosor?: number; color?: string }) {
  const s = enCirculo(c, r, a1);
  const e = enCirculo(c, r, a2);
  return <path d={`M${s[0]} ${s[1]} A${r} ${r} 0 ${Math.abs(a2 - a1) > 180 ? 1 : 0} ${a2 > a1 ? 0 : 1} ${e[0]} ${e[1]}`} fill="none" stroke={color} strokeWidth={grosor} strokeLinecap="round" />;
}

export function Punto({ p, nombre, dx = 7, dy = -7, color = INK }: { p: Pt; nombre: string; dx?: number; dy?: number; color?: string }) {
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
  const { resultado, finalizar } = useBenchCheck();
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const sv = hecho ? setup.sStar : s;
  const mueve = shown === last && resultado === null;

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
  // Al soltar (o al mover con el teclado) con el cateto sobre P, la construcción queda hecha.
  const onUp = () => {
    const estabaArrastrando = drag.current !== null;
    drag.current = null;
    setAgarrada(false);
    if (estabaArrastrando && mueve && ok) finalizar();
  };
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!mueve) return;
    const paso = ev.shiftKey ? 10 : 2;
    const nuevo = ev.key === "ArrowRight" || ev.key === "ArrowUp" ? clamp(s + paso, 0, PERP_S_MAX) : ev.key === "ArrowLeft" || ev.key === "ArrowDown" ? clamp(s - paso, 0, PERP_S_MAX) : null;
    if (nuevo === null) return;
    setS(nuevo);
    if (perpPasaPorP(setup, nuevo)) finalizar();
    ev.preventDefault();
  };

  const cart = apoyarTriangulo(CARTABON_PTS, 0, 1, [0, 0], false);
  const esc = apoyarTriangulo(ESCUADRA_PTS, 0, 1, [perpEx(sv), 0], true);
  const [px] = setup.p;

  const extra = resultado === null ? null : <Resultado ok>Correcto: el cateto es perpendicular a r porque la escuadra solo se ha deslizado a lo largo de r.</Resultado>;

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
  const [aviso, setAviso] = useState<string | null>(null);
  const { resultado, finalizar } = useBenchCheck();
  const hecho = resultado === true;
  const shown = resultado !== null ? last : step;
  const phiV = hecho ? objetivo : phi;
  const activo = shown >= 1;
  const practica = shown === last;
  const mueve = activo && resultado === null;

  const goStep = (n: number) => {
    setStep(n);
    setAviso(null);
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
  // En el ejercicio, al soltar sobre el ángulo pedido la construcción queda hecha; si no, se sigue ajustando.
  const onUp = () => {
    const estabaArrastrando = agarrada;
    setAgarrada(false);
    if (!estabaArrastrando || !mueve || !practica) return;
    if (phi === objetivo) finalizar();
    else setAviso(`Ahora marca ${phi}°: sigue ajustando hasta llegar a ${objetivo}°.`);
  };
  const onKey = (ev: ReactKeyboardEvent) => {
    if (!mueve) return;
    const paso = ev.shiftKey ? 10 : 1;
    const nuevo = ev.key === "ArrowLeft" || ev.key === "ArrowUp" ? clamp(phi + paso, 0, 180) : ev.key === "ArrowRight" || ev.key === "ArrowDown" ? clamp(phi - paso, 0, 180) : null;
    if (nuevo === null) return;
    setPhi(nuevo);
    setAviso(null);
    if (practica && nuevo === objetivo) finalizar();
    ev.preventDefault();
  };

  const tip = enCirculo(V, 175, phiV);
  const extra =
    resultado !== null ? (
      <Resultado ok>Correcto: el segundo lado marca {objetivo}° en la escala que parte de 0 sobre el primer lado.</Resultado>
    ) : activo && !practica ? (
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="bench-transp-panel">
        Lectura en la escala exterior{" "}
        <span className="text-2xl font-bold tabular-nums text-[#58c4dd]" data-testid="bench-lectura">
          {phi}°
        </span>
      </p>
    ) : practica && aviso ? (
      <p className="text-sm text-amber-200" data-testid="bench-aviso">
        {aviso}
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
