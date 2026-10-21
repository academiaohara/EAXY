"use client";

import { useState } from "react";
// industrial-imports
import { ConversorIndustrial, PlanoInclinadoTrabajo, ResorteExplorador, EnergiaRampa, MomentoInercia, EquilibrioTermico, PrimerPrincipio, RendimientoCadena, PotenciaVehiculo, ParTrabajo, DiagramaPV, PotenciaElectricaHidraulica } from "@/components/lesson/slide/tools/MaquinasTools";
import { IntersticioRed, DurezaMartensita, TttExplorador, JominyExplorador, TemperaturasTratamiento, PerfilDureza, PilaElectroquimica, NernstExplorador, FaradayExplorador, RecubrimientoRayado, PillingBedworth } from "@/components/lesson/slide/tools/TratamientosTools";
import { ResistenciaEspecifica, PiezaPesoMinimo, AleacionesFiltro, GrietaGriffith, GradoPolimerizacion, RtpComunidades } from "@/components/lesson/slide/tools/MaterialesTools";
import { AleacionConcentracion, EnergiaFusion, GibbsExplorador, DiagramaBinario, DiagramaEutectico, FeCExplorador, AceroClasificador } from "@/components/lesson/slide/tools/AleacionesTools";
import { MathRenderer } from "@/components/lesson/MathRenderer";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { CompasBisectriz, CompasMediatriz } from "@/components/lesson/slide/tools/CompasTools";
import {
  AnguloExplorador,
  AngulosSuma,
  BisectrizExplorador,
  ParalelasExplorador,
  PoligonoExplorador,
  PuntoMediatriz,
  RectasPosicion,
  Transportador,
  TrianguloExplorador,
} from "@/components/lesson/slide/tools/GeometryTools";
import {
  CircCircExplorador,
  CircRectaExplorador,
  ParalelogramoExplorador,
  PoligonoRegularExplorador,
  TrianguloCentros,
  TrianguloClasificador,
} from "@/components/lesson/slide/tools/FigurasTools";
import { CirculoExplorador, ParalelogramoArea, PoligonoRegularArea, RectanguloExplorador, TrapecioArea, TrianguloArea } from "@/components/lesson/slide/tools/AreaTools";
import { DatosExplorador, PlanoExplorador, SectoresExplorador } from "@/components/lesson/slide/tools/DatosTools";
import { DadoSimulador, LaplaceExplorador } from "@/components/lesson/slide/tools/ProbTools";
import { PoliedroExplorador } from "@/components/lesson/slide/tools/SolidTools";
import { FractionProductTool } from "@/components/lesson/slide/tools/FractionProductTool";
import { decEs, sectorPath } from "@/components/lesson/anim/fraction";
import { MANIM } from "@/components/lesson/anim/palette";


/** Barra(s) de una unidad partida en `d` trozos con `n` coloreados (puede ocupar más de una unidad). */
function Bars({ n, d, color }: { n: number; d: number; color: string }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const W = 440;
  const H = 40;
  const gap = 14;
  const cell = W / d;
  return (
    <svg viewBox={`0 0 ${W + 4} ${wholes * (H + gap) - gap + 4}`} className="block w-full" aria-hidden focusable="false">
      {Array.from({ length: wholes }, (_, w) => {
        const filled = clamp(n - w * d, 0, d);
        const y = 2 + w * (H + gap);
        return (
          <g key={w}>
            <rect x={2} y={y} width={W} height={H} rx={5} fill={MANIM.panel} />
            <rect x={2} y={y} width={filled * cell} height={H} rx={5} fill={color} fillOpacity={0.85} className="anim-t" />
            {Array.from({ length: d + 1 }, (_, i) => (
              <line key={i} x1={2 + i * cell} y1={y} x2={2 + i * cell} y2={y + H} stroke={MANIM.yellow} strokeWidth={i === 0 || i === d ? 2.5 : 1.2} />
            ))}
          </g>
        );
      })}
    </svg>
  );
}

/** Una pizza partida en `d` porciones con `filled` coloreadas; con más de una unidad se dibujan varias. */
function Pizzas({ n, d, color }: { n: number; d: number; color: string }) {
  const wholes = Math.max(1, Math.ceil(n / d));
  const R = 84;
  const gap = 28;
  const W = wholes * 2 * R + (wholes - 1) * gap + 8;
  return (
    <svg viewBox={`0 0 ${W} ${2 * R + 8}`} className="mx-auto block h-48 w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-pizzas">
      {Array.from({ length: wholes }, (_, w) => {
        const filled = clamp(n - w * d, 0, d);
        const cx = 4 + R + w * (2 * R + gap);
        const cy = 4 + R;
        return (
          <g key={w}>
            {Array.from({ length: d }, (_, i) => {
              const props = {
                fill: i < filled ? color : MANIM.panel,
                fillOpacity: i < filled ? 0.9 : 1,
                stroke: MANIM.yellow,
                strokeWidth: 2,
                strokeLinejoin: "round" as const,
                className: "anim-t",
              };
              return d === 1 ? (
                <circle key={i} cx={cx} cy={cy} r={R} {...props} />
              ) : (
                <path key={i} d={sectorPath(cx, cy, R, i, d)} {...props} />
              );
            })}
            <circle cx={cx} cy={cy} r={R} fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
          </g>
        );
      })}
    </svg>
  );
}

/** Recta de 0 a 2 con la fracción marcada. */
function MiniLine({ value, color }: { value: number; color: string }) {
  const x = (v: number) => 20 + v * 200;
  return (
    <svg viewBox="0 0 440 56" className="mx-auto block w-full max-w-md" aria-hidden focusable="false">
      <line x1={10} y1={30} x2={430} y2={30} stroke={MANIM.ink} strokeWidth={2.5} strokeLinecap="round" />
      {[0, 1, 2].map((v) => (
        <g key={v}>
          <line x1={x(v)} y1={22} x2={x(v)} y2={38} stroke={MANIM.ink} strokeWidth={3} />
          <text x={x(v)} y={54} fill={MANIM.ink} fontSize={14} textAnchor="middle" fontWeight={600}>
            {v}
          </text>
        </g>
      ))}
      <circle cx={x(clamp(value, 0, 2))} cy={30} r={8} fill={color} className="anim-t" />
    </svg>
  );
}

/** Numerador y denominador libres: la fracción se ve como barra, como punto en la recta y como decimal. */
function FraccionExplorador({ block }: { block: ToolBlock }) {
  const init = { n: block.params?.n ?? 3, d: block.params?.d ?? 8 };
  const [n, setN] = useState(clamp(init.n, 0, 2 * init.d));
  const [d, setD] = useState(clamp(init.d, 1, 12));

  const changeD = (next: number) => {
    setD(next);
    setN((cur) => clamp(cur, 0, 2 * next));
  };
  const value = n / d;
  const exact = (n * 1000) % d === 0;
  const kind = n < d ? "menor que 1" : n === d ? "igual a 1" : "mayor que 1";
  const color = n < d ? MANIM.blue : n === d ? MANIM.yellow : MANIM.red;

  return (
    <Frame
      stacked
      hint={block.hint ?? "Mueve el numerador y el denominador y fíjate cuándo la fracción cruza el 1."}
      onReset={() => {
        setN(clamp(init.n, 0, 2 * init.d));
        setD(clamp(init.d, 1, 12));
      }}
      controls={
        <>
          <Slider label="Numerador (partes que coges)" value={n} min={0} max={2 * d} color={MANIM.orange} onChange={setN} />
          <Slider label="Denominador (partes iguales)" value={d} min={1} max={12} color={MANIM.blue} onChange={changeD} />
        </>
      }
    >
      <div className="flex items-center justify-center gap-6" data-testid="tool-readout">
        <MathRenderer text={`$\\dfrac{${n}}{${d}}$`} className="text-4xl" />
        <span className="text-xl font-semibold" style={{ color }}>
          {kind}
        </span>
        <span className="text-xl tabular-nums text-[color:var(--stage-ink,#fff)]">
          {exact ? "=" : "≈"} {decEs(value)}
        </span>
      </div>
      <Pizzas n={n} d={d} color={color} />
      <MiniLine value={value} color={color} />
    </Frame>
  );
}

/** Se multiplican numerador y denominador por k: las barras cambian de trozos, no de porción. */
function FraccionEquivalentes({ block }: { block: ToolBlock }) {
  const n0 = block.params?.n ?? 2;
  const d0 = block.params?.d ?? 5;
  const initK = block.params?.k ?? 2;
  const [k, setK] = useState(clamp(initK, 1, 6));

  return (
    <Frame
      hint={block.hint ?? `Cambia k: la fracción ${n0}/${d0} se escribe de otra forma, pero la parte coloreada mide lo mismo.`}
      onReset={() => setK(clamp(initK, 1, 6))}
      controls={
        <>
          <MathRenderer text={`Fracción de partida: $\\dfrac{${n0}}{${d0}}$`} className="text-lg" />
          <Slider label="Multiplicar arriba y abajo por k" value={k} min={1} max={6} color={MANIM.green} onChange={setK} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer
          text={`$\\dfrac{${n0}}{${d0}} = \\dfrac{${n0} \\cdot ${k}}{${d0} \\cdot ${k}} = \\dfrac{${n0 * k}}{${d0 * k}}$`}
          className="text-2xl"
        />
      </div>
      <Bars n={n0} d={d0} color={MANIM.blue} />
      <Bars n={n0 * k} d={d0 * k} color={MANIM.green} />
    </Frame>
  );
}

const MAX_N = 10;

/** Máquina `a·n + b`: el alumno mueve `n` y ve la cuenta y el resultado entre todos los valores de la tabla. */
function ValorNumerico({ block }: { block: ToolBlock }) {
  const a = clamp(block.params?.a ?? 2, 1, 9);
  const b = clamp(block.params?.b ?? 3, -9, 9);
  const initN = clamp(block.params?.n ?? 5, 0, MAX_N);
  const [n, setN] = useState(initN);
  const out = (k: number) => a * k + b;
  const top = Math.max(1, ...Array.from({ length: MAX_N + 1 }, (_, k) => out(k)));
  const W = 440;
  const H = 130;
  const cell = W / (MAX_N + 1);
  const sign = b < 0 ? "-" : "+";

  return (
    <Frame
      hint={block.hint ?? "Mueve n y fíjate en que la misma regla sirve para cualquier número."}
      onReset={() => setN(initN)}
      controls={
        <>
          <MathRenderer text={`Regla: $n \\longrightarrow ${a === 1 ? "" : a}n ${sign} ${Math.abs(b)}$`} className="text-lg" />
          <Slider label="Número n que entra" value={n} min={0} max={MAX_N} color={MANIM.orange} onChange={setN} />
        </>
      }
    >
      <div className="flex items-baseline gap-4" data-testid="tool-readout">
        <MathRenderer text={`$${a} \\cdot ${n} ${sign} ${Math.abs(b)} = ${out(n)}$`} className="text-3xl" />
      </div>
      <svg viewBox={`0 0 ${W + 4} ${H + 28}`} className="block w-full" aria-hidden focusable="false">
        {Array.from({ length: MAX_N + 1 }, (_, k) => {
          const h = (Math.max(0, out(k)) / top) * H;
          const active = k === n;
          return (
            <g key={k}>
              <rect x={2 + k * cell + 4} y={H - h} width={cell - 8} height={Math.max(h, 2)} rx={4} fill={active ? MANIM.green : MANIM.blue} fillOpacity={active ? 0.95 : 0.45} className="anim-t" />
              <text x={2 + k * cell + cell / 2} y={H + 18} fontSize={13} textAnchor="middle" fill={active ? MANIM.green : MANIM.muted}>
                {k}
              </text>
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

const BAL = { minB: -6, maxB: 9, minC: -6, maxC: 21 } as const;

function eqText(a: number, b: number, c: number): string {
  const lhs = `${a > 1 ? a : ""}x${b > 0 ? ` + ${b}` : b < 0 ? ` - ${-b}` : ""}`;
  return `${lhs} = ${c}`;
}

function Dots({ count }: { count: number }) {
  const neg = count < 0;
  return (
    <>
      {Array.from({ length: Math.abs(count) }, (_, i) => (
        <span
          key={i}
          className="inline-block size-5 rounded-full"
          style={neg ? { border: `2.5px dashed ${MANIM.red}` } : { background: MANIM.yellow }}
        />
      ))}
    </>
  );
}

/** Balanza `a·x + b = c`: lo que se haga en los dos platos mantiene el equilibrio y la solución. */
function BalanzaExplorador({ block }: { block: ToolBlock }) {
  const a0 = clamp(block.params?.a ?? 2, 1, 5);
  const b0 = clamp(block.params?.b ?? 3, BAL.minB, BAL.maxB);
  const c0 = clamp(block.params?.c ?? 11, BAL.minC, BAL.maxC);
  const [eq, setEq] = useState({ a: a0, b: b0, c: c0 });
  const solution = (c0 - b0) / a0;
  const { a, b, c } = eq;
  const addBoth = (d: number) => setEq((e) => ({ ...e, b: e.b + d, c: e.c + d }));
  const canAdd = (d: number) => b + d >= BAL.minB && b + d <= BAL.maxB && c + d >= BAL.minC && c + d <= BAL.maxC;
  const canDivide = a > 1 && b % a === 0 && c % a === 0;
  const btn =
    "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-35";

  return (
    <Frame
      hint={block.hint ?? "Haz lo mismo en los dos platos y comprueba que la solución de x no cambia."}
      onReset={() => setEq({ a: a0, b: b0, c: c0 })}
      controls={
        <>
          <button type="button" className={btn} disabled={!canAdd(1)} onClick={() => addBoth(1)}>
            Sumar 1 a los dos platos
          </button>
          <button type="button" className={btn} disabled={!canAdd(-1)} onClick={() => addBoth(-1)}>
            Restar 1 a los dos platos
          </button>
          <button
            type="button"
            className={btn}
            disabled={!canDivide}
            title={canDivide ? undefined : "Solo se puede dividir si el número que multiplica a x divide a todo lo demás"}
            onClick={() => setEq({ a: 1, b: b / a, c: c / a })}
          >
            {a > 1 ? `Dividir entre ${a} los dos platos` : "Dividir los dos platos"}
          </button>
        </>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1" data-testid="tool-readout">
        <MathRenderer text={`$${eqText(a, b, c)}$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.green }}>
          Solución: x = {solution}
        </span>
      </div>
      <div className="flex items-end justify-center gap-3" aria-hidden>
        <div className="flex min-h-24 flex-1 flex-wrap content-end items-end gap-1.5 rounded-b-3xl border-b-4 border-[color:var(--stage-muted,#b8c2d0)] bg-white/5 p-3">
          {Array.from({ length: a }, (_, i) => (
            <span key={i} className="flex size-9 items-center justify-center rounded-md text-lg font-extrabold" style={{ background: MANIM.blue, color: MANIM.surface }}>
              x
            </span>
          ))}
          <Dots count={b} />
        </div>
        <span className="pb-2 text-2xl font-bold text-[color:var(--stage-ink,#fff)]">=</span>
        <div className="flex min-h-24 flex-1 flex-wrap content-end items-end gap-1.5 rounded-b-3xl border-b-4 border-[color:var(--stage-muted,#b8c2d0)] bg-white/5 p-3">
          <Dots count={c} />
        </div>
      </div>
      <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">La balanza sigue equilibrada: hagas lo que hagas, si lo haces en los dos platos.</p>
    </Frame>
  );
}

/** Cuadrícula de 100 casillas: el alumno elige el porcentaje y se pintan tantas casillas como indica. */
function PorcentajeCuadricula({ block }: { block: ToolBlock }) {
  const init = clamp(Math.round(block.params?.a ?? 35), 0, 100);
  const [pct, setPct] = useState(init);
  const CELL = 38;
  const btn =
    "rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-1.5 text-sm font-semibold tabular-nums text-[color:var(--stage-ink,#fff)] hover:bg-white/10";

  return (
    <Frame
      hint={block.hint ?? "Mueve el porcentaje y cuenta las casillas pintadas: cada casilla es el 1 %."}
      onReset={() => setPct(init)}
      controls={
        <>
          <Slider label="Porcentaje" value={pct} min={0} max={100} color={MANIM.yellow} onChange={setPct} />
          <div className="flex flex-wrap gap-2">
            {[10, 25, 50, 75, 100].map((v) => (
              <button key={v} type="button" className={btn} onClick={() => setPct(v)}>
                {v} %
              </button>
            ))}
          </div>
        </>
      }
    >
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-1" data-testid="tool-readout">
        <MathRenderer text={`$${pct}\\% = \\dfrac{${pct}}{100} = ${decEs(pct / 100)}$`} className="text-3xl" />
        <span className="text-lg font-semibold" style={{ color: MANIM.yellow }}>
          {pct} casillas de cada 100
        </span>
      </div>
      <svg viewBox={`0 0 ${10 * CELL + 4} ${10 * CELL + 4}`} className="mx-auto block h-64 w-auto max-w-full" aria-hidden focusable="false" data-testid="tool-grid">
        {Array.from({ length: 100 }, (_, i) => {
          const r = Math.floor(i / 10);
          const c = i % 10;
          const on = (9 - r) * 10 + c < pct;
          return (
            <rect
              key={i}
              x={2 + c * CELL + 2}
              y={2 + r * CELL + 2}
              width={CELL - 4}
              height={CELL - 4}
              rx={4}
              fill={on ? MANIM.yellow : "none"}
              fillOpacity={on ? 0.9 : 0}
              stroke={on ? MANIM.yellow : MANIM.grid}
              strokeWidth={2}
              className="anim-t"
            />
          );
        })}
      </svg>
    </Frame>
  );
}

/** Herramienta interactiva dentro de una diapositiva (el alumno cambia valores y ve el resultado). */
export function SlideTool({ block }: { block: ToolBlock }) {
  switch (block.tool) {
    case "fraccion-explorador":
      return <FraccionExplorador block={block} />;
    case "fraccion-equivalentes":
      return <FraccionEquivalentes block={block} />;
    case "fraction-product":
      return <FractionProductTool initial={block.initial} />;
    case "valor-numerico":
      return <ValorNumerico block={block} />;
    case "balanza-explorador":
      return <BalanzaExplorador block={block} />;
    case "porcentaje-cuadricula":
      return <PorcentajeCuadricula block={block} />;
    case "rectas-posicion":
      return <RectasPosicion block={block} />;
    case "punto-mediatriz":
      return <PuntoMediatriz block={block} />;
    case "compas-mediatriz":
      return <CompasMediatriz block={block} />;
    case "compas-bisectriz":
      return <CompasBisectriz block={block} />;
    case "bisectriz-explorador":
      return <BisectrizExplorador block={block} />;
    case "angulo-explorador":
      return <AnguloExplorador block={block} />;
    case "angulos-suma":
      return <AngulosSuma block={block} />;
    case "paralelas-explorador":
      return <ParalelasExplorador block={block} />;
    case "transportador":
      return <Transportador block={block} />;
    case "triangulo-explorador":
      return <TrianguloExplorador block={block} />;
    case "poligono-explorador":
      return <PoligonoExplorador block={block} />;
    case "triangulo-clasificador":
      return <TrianguloClasificador block={block} />;
    case "triangulo-centros":
      return <TrianguloCentros block={block} />;
    case "paralelogramo-explorador":
      return <ParalelogramoExplorador block={block} />;
    case "poligono-regular-explorador":
      return <PoligonoRegularExplorador block={block} />;
    case "circ-recta-explorador":
      return <CircRectaExplorador block={block} />;
    case "circ-circ-explorador":
      return <CircCircExplorador block={block} />;
    case "poliedro-explorador":
      return <PoliedroExplorador block={block} />;
    case "rectangulo-explorador":
      return <RectanguloExplorador block={block} />;
    case "paralelogramo-area":
      return <ParalelogramoArea block={block} />;
    case "trapecio-area":
      return <TrapecioArea block={block} />;
    case "triangulo-area":
      return <TrianguloArea block={block} />;
    case "poligono-regular-area":
      return <PoligonoRegularArea block={block} />;
    case "circulo-explorador":
      return <CirculoExplorador block={block} />;
    case "plano-explorador":
      return <PlanoExplorador block={block} />;
    case "datos-explorador":
      return <DatosExplorador block={block} />;
    case "sectores-explorador":
      return <SectoresExplorador block={block} />;
    case "dado-simulador":
      return <DadoSimulador block={block} />;
    case "laplace-explorador":
      return <LaplaceExplorador block={block} />;
    case "aleacion-concentracion":
      return <AleacionConcentracion block={block} />;
    case "energia-fusion":
      return <EnergiaFusion block={block} />;
    case "gibbs-explorador":
      return <GibbsExplorador block={block} />;
    case "diagrama-binario":
      return <DiagramaBinario block={block} />;
    case "diagrama-eutectico":
      return <DiagramaEutectico block={block} />;
    case "fe-c-explorador":
      return <FeCExplorador block={block} />;
    case "acero-clasificador":
      return <AceroClasificador block={block} />;
    case "resistencia-especifica":
      return <ResistenciaEspecifica block={block} />;
    case "pieza-peso-minimo":
      return <PiezaPesoMinimo block={block} />;
    case "aleaciones-filtro":
      return <AleacionesFiltro block={block} />;
    case "grieta-griffith":
      return <GrietaGriffith block={block} />;
    case "grado-polimerizacion":
      return <GradoPolimerizacion block={block} />;
    case "rtp-comunidades":
      return <RtpComunidades block={block} />;
    case "intersticio-red":
      return <IntersticioRed block={block} />;
    case "dureza-martensita":
      return <DurezaMartensita block={block} />;
    case "ttt-explorador":
      return <TttExplorador block={block} />;
    case "jominy-explorador":
      return <JominyExplorador block={block} />;
    case "temperaturas-tratamiento":
      return <TemperaturasTratamiento block={block} />;
    case "perfil-dureza":
      return <PerfilDureza block={block} />;
    case "pila-electroquimica":
      return <PilaElectroquimica block={block} />;
    case "nernst-explorador":
      return <NernstExplorador block={block} />;
    case "faraday-explorador":
      return <FaradayExplorador block={block} />;
    case "recubrimiento-rayado":
      return <RecubrimientoRayado block={block} />;
    case "pilling-bedworth":
      return <PillingBedworth block={block} />;
    case "conversor-industrial":
      return <ConversorIndustrial block={block} />;
    case "plano-inclinado-trabajo":
      return <PlanoInclinadoTrabajo block={block} />;
    case "resorte-explorador":
      return <ResorteExplorador block={block} />;
    case "energia-rampa":
      return <EnergiaRampa block={block} />;
    case "momento-inercia":
      return <MomentoInercia block={block} />;
    case "equilibrio-termico":
      return <EquilibrioTermico block={block} />;
    case "primer-principio-explorador":
      return <PrimerPrincipio block={block} />;
    case "rendimiento-cadena":
      return <RendimientoCadena block={block} />;
    case "potencia-vehiculo":
      return <PotenciaVehiculo block={block} />;
    case "par-trabajo-explorador":
      return <ParTrabajo block={block} />;
    case "diagrama-pv":
      return <DiagramaPV block={block} />;
    case "potencia-electrica-hidraulica":
      return <PotenciaElectricaHidraulica block={block} />;
    /* industrial-tools */
    default:
      return null;
  }
}
