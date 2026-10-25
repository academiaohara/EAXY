"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const rad = (d: number) => (d * Math.PI) / 180;

/* ───────────── 4.1 Los cinco esfuerzos ───────────── */

export const ESFUERZOS = [
  { n: "Tracción", c: MANIM.red, d: "Fuerzas que estiran el elemento: tienden a alargarlo.", ej: "Cable de un ascensor, cuerda de una tienda de campaña, tirante de un puente colgante." },
  { n: "Compresión", c: MANIM.blue, d: "Fuerzas que aplastan el elemento: tienden a acortarlo.", ej: "Pilar de un edificio, patas de una silla, columnas de un templo." },
  { n: "Flexión", c: MANIM.orange, d: "Fuerzas que doblan el elemento: una parte se estira y otra se comprime.", ej: "Tabla de un trampolín, estante con libros, viga de un forjado." },
  { n: "Torsión", c: MANIM.purple, d: "Pares de fuerzas que retuercen el elemento alrededor de su eje.", ej: "Destornillador al girar, eje de un coche, llave en una cerradura." },
  { n: "Cortadura", c: MANIM.green, d: "Fuerzas paralelas y opuestas que tienden a cortar el elemento.", ej: "Tijeras, perforadora de papel, remache o tornillo que sujeta dos chapas." },
] as const;

export function EsfuerzosBarraExplorador({ block }: { block: ToolBlock }) {
  const init = { e: Math.round(num(block.params?.n, 0, 0, 4)), carga: Math.round(num(block.params?.a, 50, 0, 100)) };
  const [s, setS] = useState(init);
  const es = ESFUERZOS[s.e]!;
  const d = s.carga / 100;
  const x0 = 130;
  const w = 260;
  const y0 = 105;
  const h = 40;
  const flecha = (x1: number, y1: number, x2: number, y2: number) => <line x1={x1} y1={y1} x2={x2} y2={y2} stroke={es.c} strokeWidth={5} strokeLinecap="round" markerEnd="url(#punta)" />;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un esfuerzo y aumenta la carga: observa cómo se deforma la barra. Si la carga es excesiva, la estructura falla."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Esfuerzo" items={ESFUERZOS.map((x, i) => ({ value: i, label: x.n }))} value={s.e} onChange={(e) => setS((x) => ({ ...x, e }))} />
          <Slider label="Carga aplicada" value={s.carga} min={0} max={100} step={5} unit=" %" color={es.c} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="esfuerzos" maxH={250}>
        <defs>
          <marker id="punta" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="context-stroke" />
          </marker>
        </defs>
        {s.e === 0 ? (
          <>
            <rect x={x0} y={y0} width={w + 70 * d} height={h - 8 * d} rx={4} fill={es.c} fillOpacity={0.3} stroke={es.c} strokeWidth={4} />
            {flecha(x0 - 6, y0 + h / 2, x0 - 70, y0 + h / 2)}
            {flecha(x0 + w + 70 * d + 6, y0 + h / 2, x0 + w + 70 * d + 70, y0 + h / 2)}
          </>
        ) : s.e === 1 ? (
          <>
            <rect x={x0 + 20 * d} y={y0 - 4 * d} width={w - 50 * d} height={h + 8 * d} rx={4} fill={es.c} fillOpacity={0.3} stroke={es.c} strokeWidth={4} />
            {flecha(x0 - 62, y0 + h / 2, x0 + 14 * d, y0 + h / 2)}
            {flecha(x0 + w + 62, y0 + h / 2, x0 + w - 30 * d, y0 + h / 2)}
          </>
        ) : s.e === 2 ? (
          <>
            <path d={`M ${x0} ${y0 + 10} Q ${x0 + w / 2} ${y0 + 10 + 110 * d} ${x0 + w} ${y0 + 10}`} fill="none" stroke={es.c} strokeWidth={h * 0.8} strokeLinecap="round" opacity={0.45} />
            <path d={`M ${x0} ${y0 + 10} Q ${x0 + w / 2} ${y0 + 10 + 110 * d} ${x0 + w} ${y0 + 10}`} fill="none" stroke={es.c} strokeWidth={4} />
            <polygon points={`${x0 - 14},${y0 + 60} ${x0 + 6},${y0 + 60} ${x0 - 4},${y0 + 36}`} fill={MANIM.muted} />
            <polygon points={`${x0 + w - 6},${y0 + 60} ${x0 + w + 14},${y0 + 60} ${x0 + w + 4},${y0 + 36}`} fill={MANIM.muted} />
            {flecha(x0 + w / 2, y0 - 50, x0 + w / 2, y0 - 6 + 100 * d)}
          </>
        ) : s.e === 3 ? (
          <>
            <rect x={x0} y={y0} width={w} height={h} rx={4} fill={es.c} fillOpacity={0.25} stroke={es.c} strokeWidth={4} />
            {Array.from({ length: 9 }, (_, i) => {
              const xx = x0 + ((i + 1) * w) / 10;
              return <line key={i} x1={xx} y1={y0} x2={xx + d * 40 * ((i + 1) / 10)} y2={y0 + h} stroke={es.c} strokeWidth={3} />;
            })}
            <text x={x0 - 40} y={y0 + h / 2 + 12} fill={MANIM.muted} fontSize={36} textAnchor="middle">
              ↺
            </text>
            <text x={x0 + w + 40} y={y0 + h / 2 + 12} fill={es.c} fontSize={36} textAnchor="middle">
              ↻
            </text>
          </>
        ) : (
          <>
            <rect x={x0} y={y0 + 20} width={w / 2 - 4} height={h} fill={es.c} fillOpacity={0.25} stroke={es.c} strokeWidth={4} />
            <rect x={x0 + w / 2 + 4} y={y0 + 20} width={w / 2 - 4} height={h} fill={es.c} fillOpacity={0.25} stroke={es.c} strokeWidth={4} transform={`translate(0 ${d * 20})`} className="anim-t" />
            {flecha(x0 + w / 4, y0 - 36, x0 + w / 4, y0 + 14)}
            {flecha(x0 + (3 * w) / 4, y0 + 110 + d * 20, x0 + (3 * w) / 4, y0 + 76 + d * 20)}
          </>
        )}
      </Svg>
      <Readout>
        <Stat color={es.c} label="Esfuerzo">
          {es.n}
        </Stat>
        <Stat color={s.carga > 85 ? MANIM.red : MANIM.green} label="Estado">
          {s.carga > 85 ? "Peligro: carga excesiva" : s.carga === 0 ? "Sin carga" : "Soporta la carga"}
        </Stat>
      </Readout>
      <Note>
        {es.d} <em>Ejemplos:</em> {es.ej}
      </Note>
    </Frame>
  );
}

/* ───────────── 4.2 Resistencia de una viga a flexión ───────────── */

const E_MADERA = 10e9; // Pa

/** Flecha (mm) en el centro de una viga biapoyada de madera con carga puntual central. */
export function flechaViga(masaKg: number, luzM: number, bM: number, hM: number): number {
  const I = (bM * hM ** 3) / 12;
  return ((masaKg * 9.8 * luzM ** 3) / (48 * E_MADERA * I)) * 1000;
}

export function VigaFlexionExplorador({ block }: { block: ToolBlock }) {
  const init = { masa: Math.round(num(block.params?.a, 20, 10, 200)), luz: num(block.params?.b, 1, 0.5, 4), canto: true, b: 5, h: 2 };
  const [s, setS] = useState(init);
  const alto = s.canto ? Math.max(s.b, s.h) : Math.min(s.b, s.h);
  const ancho = s.canto ? Math.min(s.b, s.h) : Math.max(s.b, s.h);
  const f = flechaViga(s.masa, s.luz, ancho / 100, alto / 100);
  const limite = (s.luz * 1000) / 250;
  const ok = f <= limite;
  const sag = clamp(f * 1.5, 0, 60);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia la carga, la distancia entre apoyos y coloca la viga de canto o plana: la misma sección resiste muy distinto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Carga en el centro" value={s.masa} min={10} max={200} step={10} unit=" kg" color={MANIM.red} onChange={(masa) => setS((x) => ({ ...x, masa }))} />
          <Slider label="Distancia entre apoyos" value={s.luz} min={0.5} max={4} step={0.5} unit=" m" format={f1} color={MANIM.blue} onChange={(luz) => setS((x) => ({ ...x, luz }))} />
          <Choice label="Colocación (listón de 5 × 2 cm)" items={[{ value: 1, label: "De canto (2 cm de ancho, 5 cm de alto)" }, { value: 0, label: "Plana (5 cm de ancho, 2 cm de alto)" }]} value={s.canto ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, canto: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="viga" maxH={210}>
        <path d={`M 70 80 Q 260 ${80 + sag * 2} 450 80`} fill="none" stroke={ok ? MANIM.green : MANIM.red} strokeWidth={10} strokeLinecap="round" className="anim-t" />
        <polygon points="50,120 90,120 70,92" fill={MANIM.muted} />
        <polygon points="430,120 470,120 450,92" fill={MANIM.muted} />
        <line x1={260} y1={20} x2={260} y2={70 + sag * 2} stroke={MANIM.red} strokeWidth={4} markerEnd="url(#punta2)" />
        <defs>
          <marker id="punta2" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.red} />
          </marker>
        </defs>
        <rect x={236} y={150} width={ancho * 5} height={alto * 5} fill={MANIM.orange} fillOpacity={0.4} stroke={MANIM.orange} strokeWidth={3} transform={`translate(${(-ancho * 5) / 2 + 24} 0)`} />
        <text x={330} y={178} fill={MANIM.muted} fontSize={13}>
          sección: {ancho} × {alto} cm
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Flecha (cuánto se dobla)">
          {f1(f)} mm
        </Stat>
        <Stat color={ok ? MANIM.green : MANIM.red} label={`Límite admisible (luz/250 = ${f1(limite)} mm)`}>
          {ok ? "Correcta" : "Se dobla demasiado"}
        </Stat>
      </Readout>
      <Note>Una viga resiste la flexión mucho mejor si su material está lejos del centro: colocarla de canto reduce la flecha unas 6 veces. Por eso las vigas de los forjados son altas y estrechas, y las doble T tienen alas y alma.</Note>
    </Frame>
  );
}

/* ───────────── 4.3 Estabilidad: ¿cuándo vuelca un objeto? ───────────── */

/** Ángulo (°) de inclinación al que vuelca un bloque con base `b` y centro de gravedad a altura `hcg`. */
export const anguloVuelco = (b: number, hcg: number) => (Math.atan2(b / 2, hcg) * 180) / Math.PI;

export function EstabilidadExplorador({ block }: { block: ToolBlock }) {
  const init = { b: Math.round(num(block.params?.a, 60, 20, 120)), h: Math.round(num(block.params?.b, 120, 30, 180)), lastre: false, ang: 0 };
  const [s, setS] = useState(init);
  const hcg = s.lastre ? s.h / 4 : s.h / 2;
  const crit = anguloVuelco(s.b, hcg);
  const vuelca = s.ang >= crit;
  const px = 300;
  const py = 205;
  const k = 1.1;
  const bx = s.b * k;
  const hy = s.h * k;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Inclina el objeto: vuelca cuando la vertical del centro de gravedad cae fuera de la base. Ensancha la base o añade lastre abajo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Anchura de la base" value={s.b} min={20} max={120} step={5} unit=" cm" color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b, ang: 0 }))} />
          <Slider label="Altura del objeto" value={s.h} min={30} max={180} step={10} unit=" cm" color={MANIM.green} onChange={(h) => setS((x) => ({ ...x, h, ang: 0 }))} />
          <Slider label="Inclinación" value={s.ang} min={0} max={60} step={1} unit="°" color={MANIM.orange} onChange={(ang) => setS((x) => ({ ...x, ang }))} />
          <Choice label="Peso" items={[{ value: 0, label: "Repartido" }, { value: 1, label: "Lastre en la base" }]} value={s.lastre ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, lastre: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="estabilidad" maxH={250}>
        <line x1={20} y1={py} x2={500} y2={py} stroke={MANIM.grid} strokeWidth={4} />
        <g transform={`rotate(${s.ang} ${px + bx / 2} ${py})`} className="anim-t">
          <rect x={px - bx / 2} y={py - hy} width={bx} height={hy} fill={vuelca ? MANIM.red : MANIM.blue} fillOpacity={0.25} stroke={vuelca ? MANIM.red : MANIM.blue} strokeWidth={4} />
          <circle cx={px} cy={py - hcg * k} r={8} fill={MANIM.yellow} />
          {s.lastre ? <rect x={px - bx / 2 + 3} y={py - hy / 4} width={bx - 6} height={hy / 4 - 3} fill={MANIM.muted} fillOpacity={0.6} /> : null}
        </g>
        {(() => {
          const a = rad(s.ang);
          const gx = px + bx / 2 + (-bx / 2) * Math.cos(a) + hcg * k * Math.sin(a);
          const gy = py + (-bx / 2) * Math.sin(a) - hcg * k * Math.cos(a);
          return <line x1={gx} y1={gy} x2={gx} y2={py} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />;
        })()}
        <circle cx={px + bx / 2} cy={py} r={5} fill={MANIM.muted} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ángulo crítico de vuelco">
          {f0(crit)}°
        </Stat>
        <Stat color={vuelca ? MANIM.red : MANIM.green} label="Estado">
          {vuelca ? "Vuelca" : "Estable"}
        </Stat>
      </Readout>
      <Note>El punto amarillo es el centro de gravedad. Mientras la vertical que baja desde él caiga dentro de la base de apoyo, el objeto recupera su posición. Bajo y ancho = estable; alto y estrecho = inestable.</Note>
    </Frame>
  );
}

/* ───────────── 4.4 Triangulación ───────────── */

export const MODOS_TRIANG = ["Sin diagonal", "Una diagonal", "Dos diagonales (cruz)"] as const;

/** Desplazamiento lateral relativo de la cabeza del marco (0 = rígido) según el número de diagonales y la fuerza. */
export const deformacionMarco = (diagonales: number, fuerza: number) => (diagonales === 0 ? fuerza * 1.2 : diagonales === 1 ? fuerza * 0.03 : fuerza * 0.015);

export function TriangulacionExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 2)), f: Math.round(num(block.params?.a, 50, 0, 100)) };
  const [s, setS] = useState(init);
  const dx = deformacionMarco(s.modo, s.f);
  const x0 = 190;
  const y0 = 190;
  const w = 140;
  const h = 130;
  const tl = { x: x0 + dx, y: y0 - h };
  const tr = { x: x0 + w + dx, y: y0 - h };
  const bl = { x: x0, y: y0 };
  const br = { x: x0 + w, y: y0 };
  const rigido = dx < 6;
  const col = rigido ? MANIM.green : MANIM.red;
  const barra = (a: { x: number; y: number }, b: { x: number; y: number }, c: string = col) => <line x1={a.x} y1={a.y} x2={b.x} y2={b.y} stroke={c} strokeWidth={7} strokeLinecap="round" className="anim-t" />;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Empuja el marco de lado. Sin diagonales se deforma como un paralelogramo; con una diagonal los lados forman triángulos y no se mueve."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Refuerzo" items={MODOS_TRIANG.map((x, i) => ({ value: i, label: x }))} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          <Slider label="Fuerza lateral" value={s.f} min={0} max={100} step={5} unit=" N" color={MANIM.red} onChange={(f) => setS((x) => ({ ...x, f }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="triangulacion" maxH={240}>
        <line x1={x0 - 40} y1={y0 + 6} x2={x0 + w + 40} y2={y0 + 6} stroke={MANIM.grid} strokeWidth={4} />
        {barra(bl, br)}
        {barra(bl, tl)}
        {barra(br, tr)}
        {barra(tl, tr)}
        {s.modo >= 1 ? barra(bl, tr, MANIM.yellow) : null}
        {s.modo === 2 ? barra(br, tl, MANIM.yellow) : null}
        {[bl, br, tl, tr].map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r={8} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={3} />
        ))}
        {s.f > 0 ? <line x1={tl.x - 70 - s.f * 0.4} y1={tl.y} x2={tl.x - 14} y2={tl.y} stroke={MANIM.red} strokeWidth={5} markerEnd="url(#punta3)" /> : null}
        <defs>
          <marker id="punta3" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.red} />
          </marker>
        </defs>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Desplazamiento de la parte superior">
          {f1(dx)} cm
        </Stat>
        <Stat color={col} label="Estructura">
          {rigido ? "Rígida (indeformable)" : "Deformable: se va a caer"}
        </Stat>
      </Readout>
      <Note>El triángulo es el único polígono que no se deforma si sus lados no cambian de longitud: para modificar sus ángulos habría que alargar o acortar un lado. Un cuadrilátero, en cambio, se «aplasta» sin cambiar ningún lado.</Note>
    </Frame>
  );
}

/* ───────────── 4.5 Tipos de puentes ───────────── */

export const PUENTES = [
  { n: "Puente de vigas", esf: "Flexión en la viga y compresión en los pilares", luz: "hasta unos 100 m", ej: "Pasos elevados y pasarelas" },
  { n: "Puente de arco", esf: "Compresión en todo el arco, que empuja a los estribos", luz: "hasta unos 500 m", ej: "Puentes romanos y de piedra" },
  { n: "Puente colgante", esf: "Tracción en los cables principales y compresión en las torres", luz: "más de 1 000 m", ej: "Golden Gate (San Francisco)" },
  { n: "Puente atirantado", esf: "Tracción en los tirantes y compresión en las torres y el tablero", luz: "hasta unos 1 000 m", ej: "Puente de Rande (Vigo)" },
] as const;

export function PuentesTiposExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PUENTES.length - 1)), esf: true };
  const [s, setS] = useState(init);
  const pu = PUENTES[s.p]!;
  const T = s.esf ? MANIM.red : MANIM.ink; // tracción
  const C = s.esf ? MANIM.blue : MANIM.ink; // compresión
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia de puente y activa «Ver esfuerzos»: en rojo, lo que se estira; en azul, lo que se comprime."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de puente" items={PUENTES.map((x, i) => ({ value: i, label: x.n }))} value={s.p} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Choice label="Esfuerzos" items={[{ value: 1, label: "Ver esfuerzos" }, { value: 0, label: "Ocultar" }]} value={s.esf ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, esf: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="puente" maxH={240}>
        <rect x={0} y={180} width={520} height={50} fill={MANIM.blue} fillOpacity={0.15} />
        <line x1={20} y1={130} x2={500} y2={130} stroke={MANIM.ink} strokeWidth={8} strokeLinecap="round" />
        <rect x={20} y={130} width={30} height={90} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={470} y={130} width={30} height={90} fill={MANIM.muted} fillOpacity={0.5} />
        {s.p === 0 ? (
          <>
            <line x1={260} y1={130} x2={260} y2={220} stroke={C} strokeWidth={14} />
            <path d="M 50 130 Q 155 150 260 130 Q 365 150 470 130" fill="none" stroke={MANIM.orange} strokeWidth={3} strokeDasharray="6 4" />
          </>
        ) : null}
        {s.p === 1 ? <path d="M 50 220 Q 260 80 470 220" fill="none" stroke={C} strokeWidth={14} /> : null}
        {s.p === 1
          ? [100, 160, 220, 260, 300, 360, 420].map((x) => {
              const t = (x - 50) / 420;
              return <line key={x} x1={x} y1={130} x2={x} y2={220 - 280 * t * (1 - t)} stroke={MANIM.muted} strokeWidth={4} />;
            })
          : null}
        {s.p === 2 ? (
          <>
            <line x1={130} y1={40} x2={130} y2={220} stroke={C} strokeWidth={12} />
            <line x1={390} y1={40} x2={390} y2={220} stroke={C} strokeWidth={12} />
            <path d="M 20 125 Q 75 40 130 40 Q 260 160 390 40 Q 445 40 500 125" fill="none" stroke={T} strokeWidth={5} />
            {[170, 210, 260, 310, 350].map((x) => {
              const t = (x - 130) / 260;
              return <line key={x} x1={x} y1={40 + 240 * t * (1 - t)} x2={x} y2={130} stroke={T} strokeWidth={2} />;
            })}
          </>
        ) : null}
        {s.p === 3 ? (
          <>
            <line x1={260} y1={30} x2={260} y2={220} stroke={C} strokeWidth={12} />
            {[60, 100, 140, 180, 220].map((dx2, i) => (
              <g key={dx2}>
                <line x1={260} y1={40 + i * 8} x2={260 - dx2} y2={130} stroke={T} strokeWidth={3} />
                <line x1={260} y1={40 + i * 8} x2={260 + dx2} y2={130} stroke={T} strokeWidth={3} />
              </g>
            ))}
          </>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Esfuerzos principales">
          {pu.esf}
        </Stat>
        <Stat color={MANIM.green} label="Luz típica">
          {pu.luz}
        </Stat>
      </Readout>
      <Note>
        Ejemplo: {pu.ej}. {s.esf ? "Rojo: tracción. Azul: compresión." : ""}
      </Note>
    </Frame>
  );
}

/* ───────────── 4.6 Ensayo de un puente de papel ───────────── */

export const PERFILES = [
  { n: "Hoja plana", f: 1 },
  { n: "Doblada en acordeón", f: 4 },
  { n: "Tubo enrollado", f: 6 },
] as const;

/** Carga máxima (g) que aguanta un puente de papel: según perfil, luz (cm) y si lleva triangulación. */
export const cargaMaxima = (perfil: number, luzCm: number, triangulado: boolean) => Math.round(((40 * (PERFILES[perfil]?.f ?? 1) * (triangulado ? 2.5 : 1)) / (luzCm / 10)) * 10);

export function EnsayoPuenteExplorador({ block }: { block: ToolBlock }) {
  const init = { perfil: Math.round(num(block.params?.n, 0, 0, 2)), tri: false, luz: Math.round(num(block.params?.a, 20, 10, 40)), carga: 0 };
  const [s, setS] = useState(init);
  const max = cargaMaxima(s.perfil, s.luz, s.tri);
  const rompe = s.carga > max;
  const sag = rompe ? 90 : clamp((s.carga / max) * 40, 0, 40);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Prueba una hoja de papel como puente. Cambia su forma, la separación entre apoyos y la triangulación, y carga monedas hasta que se rompa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Forma del puente" items={PERFILES.map((x, i) => ({ value: i, label: x.n }))} value={s.perfil} onChange={(perfil) => setS((x) => ({ ...x, perfil, carga: 0 }))} />
          <Choice label="Refuerzo" items={[{ value: 0, label: "Sin triangular" }, { value: 1, label: "Con triangulación" }]} value={s.tri ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, tri: v === 1, carga: 0 }))} />
          <Slider label="Distancia entre apoyos" value={s.luz} min={10} max={40} step={5} unit=" cm" color={MANIM.blue} onChange={(luz) => setS((x) => ({ ...x, luz, carga: 0 }))} />
          <Slider label="Carga añadida (monedas)" value={s.carga} min={0} max={800} step={10} unit=" g" color={MANIM.red} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="ensayo-puente" maxH={210}>
        <rect x={40} y={110} width={60} height={80} fill={MANIM.muted} fillOpacity={0.5} />
        <rect x={420} y={110} width={60} height={80} fill={MANIM.muted} fillOpacity={0.5} />
        <path d={`M 100 108 Q 260 ${108 + sag * 2} 420 108`} fill="none" stroke={rompe ? MANIM.red : MANIM.green} strokeWidth={s.perfil === 0 ? 4 : s.perfil === 1 ? 10 : 16} strokeLinecap="round" className="anim-t" />
        {s.tri && !rompe ? <path d={`M 130 108 L 195 ${108 - 36} L 260 108 L 325 ${108 - 36} L 390 108`} fill="none" stroke={MANIM.yellow} strokeWidth={3} /> : null}
        {s.carga > 0 ? <rect x={236} y={92 + sag * 2 - clamp(s.carga / 30, 4, 26)} width={48} height={clamp(s.carga / 30, 4, 26)} rx={3} fill={MANIM.orange} fillOpacity={0.7} stroke={MANIM.orange} strokeWidth={2} className="anim-t" /> : null}
        {rompe ? <text x={260} y={180} fill={MANIM.red} fontSize={22} fontWeight={700} textAnchor="middle">¡Se ha roto!</text> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Carga máxima que aguanta">
          {f0(max)} g
        </Stat>
        <Stat color={rompe ? MANIM.red : MANIM.green} label="Resultado">
          {rompe ? `Se rompe (${f0(s.carga - max)} g de más)` : `Resiste con un margen de ${f0(max - s.carga)} g`}
        </Stat>
      </Readout>
      <Note>Doblar el papel no añade material, pero sí sitúa el papel lejos del centro, y triangular reparte la carga entre barras. Así se consigue más resistencia con el mismo peso de puente.</Note>
    </Frame>
  );
}
