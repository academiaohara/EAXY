"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import {
  LinearDimension,
  OrthographicShape,
  SheetFrame,
} from "@/components/lesson/technical-drawing/TechnicalSheet";
import {
  drawingLength,
  projectSteppedBlock,
} from "@/components/lesson/technical-drawing/model";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Series de espesores de línea normalizados (mm) de razón √2. */
export const ESPESORES = [0.13, 0.18, 0.25, 0.35, 0.5, 0.7, 1, 1.4, 2] as const;
/** Espesor de la línea fina asociada a una gruesa (relación 1 : 2). */
export const espesorFino = (gruesa: number) => gruesa / 2;

/** Formato A_n de la serie A: A0 = 841 × 1189 mm (1 m²) y cada formato se obtiene doblando el anterior por su lado mayor. Devuelve [ancho, alto] con ancho < alto. */
export function formatoA(n: number): [number, number] {
  let [w, h] = [841, 1189];
  for (let i = 0; i < Math.round(n); i++) [w, h] = [Math.floor(h / 2), w];
  return [w, h];
}
/** Número de hojas A4 que caben en un formato A_n. */
export const hojasA4 = (n: number) => 2 ** (4 - Math.round(n));
/** Margen mínimo del recuadro (mm): 10 en A4 y A3; 20 en los mayores. */
export const margenRecuadro = (n: number) => (n >= 3 ? 10 : 20);

/** Escalas normalizadas de ampliación y reducción (ISO 5455) como [numerador, denominador] = dibujo : real. */
export const ESCALAS: [number, number][] = [
  [50, 1], [20, 1], [10, 1], [5, 1], [2, 1], [1, 1], [1, 2], [1, 5], [1, 10], [1, 20], [1, 50], [1, 100], [1, 200], [1, 500], [1, 1000],
];
/** Longitud en el dibujo para una longitud real y una escala num:den. */
export const dimensionDibujo = (real: number, num_: number, den: number) => (real * num_) / den;
/** Longitud real que representa una medida del dibujo. */
export const dimensionReal = (dibujo: number, num_: number, den: number) => (dibujo * den) / num_;
/** Mayor escala normalizada con la que una longitud real cabe en el espacio disponible (mm); null si no cabe ni a 1:1000. */
export function escalaAdecuada(real: number, disponible: number): [number, number] | null {
  if (!(real > 0) || !(disponible > 0)) return null;
  for (const e of ESCALAS) if (dimensionDibujo(real, e[0], e[1]) <= disponible + 1e-9) return e;
  return null;
}

/** Pieza en L extruida: base a × b × c1 y bloque superior a2 × b × c2 sobre el lado izquierdo. */
export function pieza(a: number, b: number, c1: number, c2: number, a2: number) {
  const aa = Math.min(a2, a);
  return { areaAlzado: a * c1 + aa * c2, volumen: b * (a * c1 + aa * c2), altura: c1 + c2 };
}

/** Acumulación de tolerancia de la posición del último elemento acotado: en cadena se suman los n errores de las cotas intermedias; desde una referencia común solo hay uno. */
export function toleranciaPosicion(sistema: "cadena" | "paralelo", n: number, t: number) {
  return sistema === "cadena" ? n * t : t;
}

/* ───────────── 1. Tipos de línea ───────────── */

type TipoLinea = { id: string; nombre: string; patron?: string; gruesa: boolean; uso: string };
const TIPOS: TipoLinea[] = [
  { id: "A", nombre: "Continua gruesa", gruesa: true, uso: "Contornos y aristas visibles." },
  { id: "B", nombre: "Continua fina", gruesa: false, uso: "Líneas de cota y de referencia, rayados, aristas de intersección ficticias." },
  { id: "C", nombre: "Continua fina a mano alzada o en zigzag", patron: "zigzag", gruesa: false, uso: "Límites de vistas o cortes parciales y roturas." },
  { id: "F", nombre: "Discontinua fina (o gruesa)", patron: "8 5", gruesa: false, uso: "Contornos y aristas ocultos." },
  { id: "G", nombre: "Mixta fina de trazo y punto", patron: "16 4 3 4", gruesa: false, uso: "Ejes de revolución, ejes y planos de simetría, trayectorias." },
  { id: "J", nombre: "Mixta de trazo y punto, gruesa en los extremos", patron: "16 4 3 4", gruesa: true, uso: "Indicación de planos de corte (gruesa en extremos y cambios de dirección)." },
  { id: "K", nombre: "Mixta fina de trazo y dos puntos", patron: "16 4 3 4 3 4", gruesa: false, uso: "Posiciones extremas de piezas móviles y contornos primitivos." },
];

export function TiposLineaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { t: Math.round(num(block.params?.n, 0, 0, TIPOS.length - 1)), e: 4 };
  const [s, setS] = useState(init);
  const tipo = TIPOS[s.t]!;
  const g = ESPESORES[s.e]!;
  const ancho = (tipo.gruesa ? g : espesorFino(g)) * 4;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada tipo de línea tiene un significado. Cambia el espesor: la línea fina siempre mide la mitad de la gruesa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de línea" items={TIPOS.map((x, i) => ({ value: i, label: `${x.id} · ${x.nombre}` }))} value={s.t} onChange={(t) => setS((v) => ({ ...v, t }))} />
          <Slider label="Espesor de la línea gruesa" value={s.e} min={0} max={ESPESORES.length - 1} step={1} color={MANIM.orange} format={(v) => `${fmtEs(ESPESORES[v]!, 2)} mm`} onChange={(e) => setS((v) => ({ ...v, e }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="tipos-linea" maxH={170}>
        {tipo.patron === "zigzag" ? (
          <polyline points="40,75 120,75 150,50 180,100 210,50 240,100 270,75 480,75" fill="none" stroke={MANIM.ink} strokeWidth={ancho} strokeLinejoin="round" />
        ) : (
          <line x1={40} y1={75} x2={480} y2={75} stroke={MANIM.ink} strokeWidth={ancho} strokeDasharray={tipo.patron} strokeLinecap={tipo.patron ? "butt" : "round"} />
        )}
        {tipo.id === "J" ? (
          <>
            <line x1={40} y1={75} x2={80} y2={75} stroke={MANIM.ink} strokeWidth={g * 4} />
            <line x1={440} y1={75} x2={480} y2={75} stroke={MANIM.ink} strokeWidth={g * 4} />
          </>
        ) : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Tipo">{tipo.id} · {tipo.nombre}</Stat>
        <Stat color={MANIM.orange} label="Espesor de esta línea">{fmtEs(tipo.gruesa ? g : espesorFino(g), 3)} mm</Stat>
        <Stat color={MANIM.muted} label="Gruesa : fina">2 : 1</Stat>
      </Readout>
      <Note><b>Uso:</b> {tipo.uso} Los espesores normalizados siguen una serie de razón √2 (0,13 · 0,18 · 0,25 · 0,35 · 0,5 · 0,7 · 1 · 1,4 · 2 mm) y la línea <b>gruesa</b> mide el <b>doble</b> que la <b>fina</b>. Cuando coinciden varias líneas, se dibuja la más importante: contorno visible, oculto, plano de corte, eje, cota. La normalización (UNE-EN ISO 128) asegura que todos lean el plano igual.</Note>
    </Frame>
  );
}

/* ───────────── 2. Formatos ───────────── */

export function FormatosDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 4, 0, 6)) };
  const [s, setS] = useState(init);
  const [w, h] = formatoA(s.n);
  const rect = (x: number, y: number, ww: number, hh: number, color: string, fill: number, label?: string) => (
    <g key={label ?? `${x}${y}`}>
      <rect x={x} y={y} width={ww} height={hh} fill={color} fillOpacity={fill} stroke={color} strokeWidth={1.5} />
      {label ? (
        <text x={x + ww - 4} y={y + hh - 4} textAnchor="end" fill={color} fontSize={11} fontWeight={700}>
          {label}
        </text>
      ) : null}
    </g>
  );
  const m = margenRecuadro(s.n);
  const X0F = 135;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada formato A se obtiene doblando el anterior por la mitad del lado mayor: la relación entre lados siempre es √2."}
      onReset={() => setS(init)}
      controls={<Slider label="Formato A" value={s.n} min={0} max={6} step={1} color={MANIM.blue} format={(v) => `A${v}`} onChange={(n) => setS({ n })} />}
    >
      <Svg w={520} h={190} testId="formatos" maxH={210}>
        {/* A0 de referencia con los formatos nestidos en su esquina inferior izquierda */}
        {[0, 1, 2, 3, 4, 5, 6].map((i) => {
          const [fw, fh] = formatoA(i);
          const base = 250;
          return rect(X0F, 6, fh * (base / 1189), fw * (base / 1189), i === s.n ? MANIM.blue : MANIM.muted, i === s.n ? 0.35 : 0.04, `A${i}`);
        })}
        <rect x={X0F + m * (250 / 1189)} y={6 + m * (250 / 1189)} width={Math.max(0, h * (250 / 1189) - 2 * m * (250 / 1189))} height={Math.max(0, w * (250 / 1189) - 2 * m * (250 / 1189))} fill="none" stroke={MANIM.yellow} strokeWidth={1} strokeDasharray="3 2" />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label={`Dimensiones de A${s.n}`}>{f0(w)} × {f0(h)} mm</Stat>
        <Stat color={MANIM.muted} label="Superficie">{f2((w * h) / 1e6)} m²</Stat>
        <Stat color={MANIM.green} label="Hojas A4 que caben">{f0(hojasA4(s.n))}</Stat>
        <Stat color={MANIM.yellow} label="Margen mínimo del recuadro">{margenRecuadro(s.n)} mm</Stat>
      </Readout>
      <Note>Los formatos de la <b>serie A</b> (UNE-EN ISO 5457) parten del <b>A0</b>, de <b>1 m²</b> y lados 841 × 1189 mm. Cada formato es la <b>mitad</b> del anterior, cortada por su lado mayor, y todos son <b>semejantes</b> porque la relación entre lados es √2 ≈ 1,414. El dibujo se encuadra en un <b>recuadro</b> (amarillo) con margen mínimo, más <b>20 mm a la izquierda</b> para archivar, y lleva el <b>cuadro de rotulación</b> en la esquina inferior derecha. Los planos se <b>pliegan</b> hasta el tamaño <b>A4</b> dejando visible el cuadro de rotulación.</Note>
    </Frame>
  );
}

/* ───────────── 3. Escalas ───────────── */

export function EscalaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { real: Math.round(num(block.params?.a, 1250, 10, 20000)), disp: Math.round(num(block.params?.b, 400, 50, 800) / 10) * 10 };
  const [s, setS] = useState({ real: Math.max(10, Math.min(20000, init.real)), disp: Math.max(50, Math.min(800, init.disp)) });
  const e = escalaAdecuada(s.real, s.disp);
  const dib = e ? dimensionDibujo(s.real, e[0], e[1]) : NaN;
  const nom = e ? `${e[0]} : ${e[1]}` : "ninguna";
  const dibujoMm = e ? drawingLength(s.real, e[0], e[1]) : null;
  const pxPerMm = 330 / s.disp;
  const objectWidth = dibujoMm ? dibujoMm * pxPerMm : 0;
  const spaceUsed = dibujoMm ? (dibujoMm / s.disp) * 100 : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige la mayor escala normalizada con la que el objeto cabe en el espacio del plano."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Longitud real del objeto" value={s.real} min={10} max={20000} step={10} unit=" mm" color={MANIM.orange} onChange={(real) => setS((v) => ({ ...v, real }))} />
          <Slider label="Espacio disponible en la hoja" value={s.disp} min={50} max={800} step={10} unit=" mm" color={MANIM.blue} onChange={(disp) => setS((v) => ({ ...v, disp }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="escala" maxH={300}>
        <SheetFrame width={520} height={250} title="PIEZA A · ESCALA" scale={e ? `${e[0]}:${e[1]}` : "—"}>
          <g data-testid="scale-title-block">
            <text x="34" y="35" fontSize="9" fill="#475569">LONGITUD REAL {s.real} mm · ESPACIO ÚTIL {s.disp} mm</text>
          </g>
          {e && dibujoMm ? (
            <g data-testid="scaled-object" data-real-mm={s.real} data-drawing-mm={dibujoMm} data-space-used={`${fmtEs(spaceUsed, 1)}%`}>
              <rect x="70" y="80" width={objectWidth} height="42" fill="none" stroke="#172033" strokeWidth="2.2" />
              <LinearDimension from={[70, 122]} to={[70 + objectWidth, 122]} offset={35} value={s.real} />
              <text data-testid="scale-real-dimension" x={70 + objectWidth / 2} y="190" textAnchor="middle" fontSize="9" fill="#475569">
                La pieza mide {dibujoMm} mm en el papel; la cota sigue indicando {s.real} mm reales.
              </text>
            </g>
          ) : null}
        </SheetFrame>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Escala adecuada (dibujo : real)">{nom}</Stat>
        <Stat color={MANIM.blue} label="Longitud en el dibujo">{e ? `${f1(dib)} mm` : "—"}</Stat>
        <Stat color={MANIM.muted} label="Factor">{e ? fmtEs(e[0] / e[1], e[0] / e[1] < 1 ? 4 : 1) : "—"}</Stat>
      </Readout>
      <Note>La <b>escala</b> es la razón entre una longitud del <b>dibujo</b> y la <b>real</b>: E = dibujo : real. Escala <b>1:1</b> es tamaño natural; <b>2:1, 5:1…</b> son de <b>ampliación</b> y <b>1:2, 1:50…</b> de <b>reducción</b>. Solo se emplean las escalas <b>normalizadas</b> (ISO 5455). La <b>escala gráfica</b> es una regla dibujada sobre el plano: sigue siendo válida si el plano se amplía o reduce al copiarlo. Elegida la escala, las <b>cotas</b> siempre indican la medida <b>real</b>, no la del dibujo.</Note>
    </Frame>
  );
}

/* ───────────── 4. Vistas normalizadas ───────────── */

export function VistasDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { shape: "step" as "step" | "cube", a: Math.round(num(block.params?.a, 80, 40, 100) / 10) * 10, b: Math.round(num(block.params?.b, 50, 30, 70) / 10) * 10, c1: 20, c2: 30, a2: 40 };
  const [s, setS] = useState(init);
  const cube = s.shape === "cube";
  const a = cube ? 40 : s.a;
  const b = cube ? 40 : s.b;
  const c1 = cube ? 40 : s.c1;
  const c2 = cube ? 0 : s.c2;
  const a2 = cube ? 40 : Math.min(s.a2, s.a - 10);
  const p = pieza(a, b, c1, c2, a2);
  const views = projectSteppedBlock({ width: a, depth: b, baseHeight: c1, topHeight: c2, stepWidth: a2 });
  const factor = Math.min(1.7, 130 / Math.max(a, b, p.altura));
  const frontOrigin = [80, 125] as const;
  const topOrigin = [80, 165] as const;
  const leftOrigin = [290, 125] as const;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las tres vistas nacen de la misma pieza: alzado y planta comparten largo; alzado y perfil comparten altura."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Pieza" items={[{ value: "cube", label: "Cubo" }, { value: "step", label: "Pieza escalonada" }]} value={s.shape} onChange={(shape) => setS((v) => ({ ...v, shape }))} />
          {!cube ? <Slider label="Largo" value={s.a} min={40} max={100} step={10} unit=" mm" color={MANIM.orange} onChange={(a) => setS((v) => ({ ...v, a }))} /> : null}
          {!cube ? <Slider label="Fondo" value={s.b} min={30} max={70} step={10} unit=" mm" color={MANIM.green} onChange={(b) => setS((v) => ({ ...v, b }))} /> : null}
          {!cube ? <Slider label="Altura de la base" value={s.c1} min={10} max={40} step={10} unit=" mm" color={MANIM.blue} onChange={(c1) => setS((v) => ({ ...v, c1 }))} /> : null}
          {!cube ? <Slider label="Altura del resalte" value={s.c2} min={10} max={40} step={10} unit=" mm" color={MANIM.purple} onChange={(c2) => setS((v) => ({ ...v, c2 }))} /> : null}
          {!cube ? <Slider label="Largo del resalte" value={a2} min={20} max={Math.max(20, s.a - 10)} step={10} unit=" mm" color={MANIM.yellow} onChange={(x) => setS((v) => ({ ...v, a2: x }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={330} testId="orthographic-sheet" maxH={370}>
        <SheetFrame width={520} height={330} title="VISTAS ORTOGONALES · MÉTODO EUROPEO" scale="1:1">
          <OrthographicShape view={views.front} origin={frontOrigin} factor={factor} testId="view-front" />
          <OrthographicShape view={views.top} origin={topOrigin} factor={factor} invertY={false} testId="view-top" />
          <OrthographicShape view={views.left} origin={leftOrigin} factor={factor} testId="view-left" />
          <text x={frontOrigin[0] + (a * factor) / 2} y="142" textAnchor="middle" fontSize="9" fill="#475569">ALZADO</text>
          <text x={topOrigin[0] + (a * factor) / 2} y={topOrigin[1] + b * factor + 14} textAnchor="middle" fontSize="9" fill="#475569">PLANTA</text>
          <text x={leftOrigin[0] + (b * factor) / 2} y="142" textAnchor="middle" fontSize="9" fill="#475569">PERFIL IZQUIERDO</text>
          <line x1={frontOrigin[0]} y1="150" x2={frontOrigin[0] + a * factor} y2="150" stroke="#94a3b8" strokeWidth="0.7" strokeDasharray="3 3" />
        </SheetFrame>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Altura total">{f0(p.altura)} mm</Stat>
        <Stat color={MANIM.muted} label="Superficie del alzado">{f0(p.areaAlzado)} mm²</Stat>
        <Stat color={MANIM.green} label="Volumen de la pieza">{f1(p.volumen / 1000)} cm³</Stat>
      </Readout>
      <Note>En el <b>sistema europeo (método E)</b> la pieza se imagina dentro de una caja de cristal y cada cara se proyecta ortogonalmente: el <b>alzado</b> (vista frontal) es la principal y se elige la que da más información; la <b>planta</b> queda <b>debajo</b> y el <b>perfil izquierdo</b> a la <b>derecha</b> del alzado. Las vistas están enlazadas: alzado y planta comparten <b>largo</b>; alzado y perfil comparten <b>altura</b>; planta y perfil comparten <b>fondo</b>. Una arista oculta solo se traza discontinua cuando existe y ayuda a definir la pieza.</Note>
    </Frame>
  );
}

/* ───────────── 5. Sistemas de acotación ───────────── */

export function AcotacionSistemasDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { sis: "cadena" as "cadena" | "paralelo", n: Math.round(num(block.params?.a, 4, 2, 6)), t: 10 };
  const [s, setS] = useState(init);
  const tol = toleranciaPosicion(s.sis, s.n - 1, s.t / 100);
  const sp = 70;
  const x0 = 80;
  const yPlaca = 55;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Acotar en cadena acumula las tolerancias; acotar desde una referencia común no."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sistema de acotación" items={[{ value: "cadena", label: "En cadena (serie)" }, { value: "paralelo", label: "En paralelo (referencia común)" }]} value={s.sis} onChange={(sis) => setS((v) => ({ ...v, sis }))} />
          <Slider label="Número de agujeros" value={s.n} min={2} max={6} step={1} color={MANIM.orange} onChange={(n) => setS((v) => ({ ...v, n }))} />
          <Slider label="Tolerancia de cada cota (±)" value={s.t} min={5} max={50} step={5} unit=" centésimas de mm" color={MANIM.red} onChange={(t) => setS((v) => ({ ...v, t }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="dimensioning-sheet" maxH={310}>
        <SheetFrame width={520} height={270} title="PLACA PERFORADA" scale="1:1">
          <rect x={x0 - 28} y={yPlaca} width={(s.n - 1) * sp + 56} height="50" fill="none" stroke="#172033" strokeWidth="2.2" />
          {Array.from({ length: s.n }, (_, i) => (
            <g key={i}>
              <circle cx={x0 + i * sp} cy={yPlaca + 25} r="9" fill="none" stroke="#172033" strokeWidth="2.2" />
              <line x1={x0 + i * sp - 14} y1={yPlaca + 25} x2={x0 + i * sp + 14} y2={yPlaca + 25} stroke="#64748b" strokeWidth="0.8" strokeDasharray="7 2 1 2" />
              <line x1={x0 + i * sp} y1={yPlaca + 11} x2={x0 + i * sp} y2={yPlaca + 39} stroke="#64748b" strokeWidth="0.8" strokeDasharray="7 2 1 2" />
            </g>
          ))}
          {s.sis === "cadena"
            ? Array.from({ length: s.n - 1 }, (_, i) => (
                <LinearDimension key={`chain-${i}`} from={[x0 + i * sp, yPlaca + 50]} to={[x0 + (i + 1) * sp, yPlaca + 50]} offset={40} value={15} tolerance={`±${fmtEs(s.t / 100, 2)}`} />
              ))
            : Array.from({ length: s.n - 1 }, (_, i) => (
                <LinearDimension key={`parallel-${i}`} from={[x0, yPlaca + 50]} to={[x0 + (i + 1) * sp, yPlaca + 50]} offset={34 + i * 18} value={(i + 1) * 15} tolerance={`±${fmtEs(s.t / 100, 2)}`} />
              ))}
          <text x={x0 - 20} y={yPlaca - 10} fill="#475569" fontSize="9">REFERENCIA A</text>
        </SheetFrame>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Tolerancia de posición del último agujero respecto de A">± {fmtEs(tol, 2)} mm</Stat>
        <Stat color={MANIM.muted} label="Cotas necesarias">{s.n - 1}</Stat>
      </Readout>
      <Note>La <b>acotación en cadena</b> pone las cotas una a continuación de otra: cada agujero se sitúa respecto del anterior, y los <b>errores se acumulan</b> (n·t en el último). La <b>acotación en paralelo</b> toma una <b>referencia común</b> y todas las cotas parten de ella: el error de cada elemento <b>no depende de los demás</b>. Se elige según la <b>función</b> de la pieza y cómo se va a fabricar y medir. En todos los casos: cada cota se escribe <b>una sola vez</b>, con las <b>líneas de cota</b> finas fuera del dibujo, flechas en los extremos y cifras legibles desde abajo o desde la derecha.</Note>
    </Frame>
  );
}

/* ───────────── 6. Simbología ───────────── */

type Simbolo = { nombre: string; desc: string; dibujo: (c: string) => ReactNode };
const SIMB: Record<string, Simbolo[]> = {
  electrico: [
    { nombre: "Resistencia", desc: "Componente que se opone al paso de la corriente (UNE-EN 60617).", dibujo: (c) => (<><line x1={10} y1={30} x2={30} y2={30} stroke={c} strokeWidth={2.5} /><rect x={30} y={20} width={40} height={20} fill="none" stroke={c} strokeWidth={2.5} /><line x1={70} y1={30} x2={90} y2={30} stroke={c} strokeWidth={2.5} /></>) },
    { nombre: "Lámpara", desc: "Receptor luminoso: círculo con dos diagonales.", dibujo: (c) => (<><circle cx={50} cy={30} r={16} fill="none" stroke={c} strokeWidth={2.5} /><line x1={39} y1={19} x2={61} y2={41} stroke={c} strokeWidth={2.5} /><line x1={61} y1={19} x2={39} y2={41} stroke={c} strokeWidth={2.5} /><line x1={10} y1={30} x2={34} y2={30} stroke={c} strokeWidth={2.5} /><line x1={66} y1={30} x2={90} y2={30} stroke={c} strokeWidth={2.5} /></>) },
    { nombre: "Interruptor", desc: "Abre o cierra el circuito; abierto, la cuchilla queda inclinada.", dibujo: (c) => (<><line x1={10} y1={40} x2={35} y2={40} stroke={c} strokeWidth={2.5} /><line x1={35} y1={40} x2={62} y2={18} stroke={c} strokeWidth={2.5} /><circle cx={35} cy={40} r={3} fill={c} /><circle cx={68} cy={40} r={3} fill={c} /><line x1={68} y1={40} x2={90} y2={40} stroke={c} strokeWidth={2.5} /></>) },
    { nombre: "Pila", desc: "Fuente de tensión continua: línea larga (+) y corta (−).", dibujo: (c) => (<><line x1={10} y1={30} x2={42} y2={30} stroke={c} strokeWidth={2.5} /><line x1={42} y1={14} x2={42} y2={46} stroke={c} strokeWidth={2.5} /><line x1={52} y1={22} x2={52} y2={38} stroke={c} strokeWidth={4.5} /><line x1={52} y1={30} x2={90} y2={30} stroke={c} strokeWidth={2.5} /></>) },
  ],
  arquitectonico: [
    { nombre: "Puerta", desc: "Hueco en el muro con la hoja y el arco que indica su apertura.", dibujo: (c) => (<><line x1={10} y1={50} x2={30} y2={50} stroke={c} strokeWidth={3.5} /><line x1={70} y1={50} x2={90} y2={50} stroke={c} strokeWidth={3.5} /><line x1={30} y1={50} x2={30} y2={14} stroke={c} strokeWidth={2.5} /><path d="M 30 14 A 36 36 0 0 1 66 50" fill="none" stroke={c} strokeWidth={1.5} strokeDasharray="3 3" /></>) },
    { nombre: "Ventana", desc: "Hueco con tres líneas finas que representan el vidrio.", dibujo: (c) => (<><line x1={10} y1={24} x2={30} y2={24} stroke={c} strokeWidth={3.5} /><line x1={70} y1={24} x2={90} y2={24} stroke={c} strokeWidth={3.5} /><line x1={10} y1={36} x2={30} y2={36} stroke={c} strokeWidth={3.5} /><line x1={70} y1={36} x2={90} y2={36} stroke={c} strokeWidth={3.5} /><line x1={30} y1={24} x2={70} y2={24} stroke={c} strokeWidth={1.5} /><line x1={30} y1={30} x2={70} y2={30} stroke={c} strokeWidth={1.5} /><line x1={30} y1={36} x2={70} y2={36} stroke={c} strokeWidth={1.5} /></>) },
    { nombre: "Muro", desc: "Dos líneas gruesas paralelas con el rayado del material.", dibujo: (c) => (<><line x1={10} y1={22} x2={90} y2={22} stroke={c} strokeWidth={3.5} /><line x1={10} y1={40} x2={90} y2={40} stroke={c} strokeWidth={3.5} />{[14, 26, 38, 50, 62, 74].map((x) => (<line key={x} x1={x} y1={40} x2={x + 10} y2={22} stroke={c} strokeWidth={1.2} />))}</>) },
    { nombre: "Escalera", desc: "Huellas paralelas y flecha de subida.", dibujo: (c) => (<>{[14, 26, 38, 50, 62, 74].map((x) => (<line key={x} x1={x} y1={14} x2={x} y2={46} stroke={c} strokeWidth={1.8} />))}<rect x={10} y={14} width={74} height={32} fill="none" stroke={c} strokeWidth={2.5} /><line x1={14} y1={30} x2={80} y2={30} stroke={MANIM.yellow} strokeWidth={2} /></>) },
  ],
  mecanico: [
    { nombre: "Eje de simetría", desc: "Línea fina de trazo y punto que pasa por el centro.", dibujo: (c) => (<><rect x={26} y={14} width={48} height={32} fill="none" stroke={c} strokeWidth={2.5} /><line x1={50} y1={6} x2={50} y2={54} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="10 3 2 3" /></>) },
    { nombre: "Agujero pasante", desc: "Circunferencia con ejes cruzados y cota Ø.", dibujo: (c) => (<><circle cx={50} cy={30} r={14} fill="none" stroke={c} strokeWidth={2.5} /><line x1={28} y1={30} x2={72} y2={30} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="10 3 2 3" /><line x1={50} y1={8} x2={50} y2={52} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="10 3 2 3" /></>) },
    { nombre: "Rosca (vista de frente)", desc: "Circunferencia fina de tres cuartos junto a la gruesa del núcleo.", dibujo: (c) => (<><circle cx={50} cy={30} r={12} fill="none" stroke={c} strokeWidth={2.5} /><path d="M 50 14 A 16 16 0 1 0 66 30" fill="none" stroke={c} strokeWidth={1.2} /></>) },
    { nombre: "Plano de corte", desc: "Línea de trazo y punto con extremos gruesos y flechas que indican el sentido.", dibujo: (c) => (<><line x1={10} y1={30} x2={90} y2={30} stroke={c} strokeWidth={1.5} strokeDasharray="12 3 2 3" /><line x1={10} y1={30} x2={20} y2={30} stroke={c} strokeWidth={4} /><line x1={80} y1={30} x2={90} y2={30} stroke={c} strokeWidth={4} /><polygon points="15,30 15,16 8,23" fill={c} /><polygon points="85,30 85,16 92,23" fill={c} /></>) },
  ],
};
const CATS = [
  { value: "electrico", label: "Eléctricos y electrónicos" },
  { value: "arquitectonico", label: "Arquitectónicos" },
  { value: "mecanico", label: "Mecánicos" },
];

export function SimbolosDt1Explorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, CATS.length - 1));
  const init = { c: CATS[idx]!.value, i: 0 };
  const [s, setS] = useState(init);
  const lista = SIMB[s.c]!;
  const sel = lista[Math.min(s.i, lista.length - 1)]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La simbología normalizada representa elementos con signos que todos los técnicos reconocen, sin dibujarlos tal como son."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de simbología" items={CATS} value={s.c} onChange={(c) => setS({ c, i: 0 })} />
          <Choice label="Símbolo" items={lista.map((x, i) => ({ value: i, label: x.nombre }))} value={Math.min(s.i, lista.length - 1)} onChange={(i) => setS((v) => ({ ...v, i }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="simbolos" maxH={170}>
        <g transform="translate(160 15) scale(2.0)">{sel.dibujo(MANIM.ink)}</g>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Símbolo">{sel.nombre}</Stat>
      </Readout>
      <Note><b>{sel.nombre}.</b> {sel.desc} La <b>simbología</b> sustituye el dibujo real de un elemento por un <b>signo convencional normalizado</b> (UNE-EN 60617 para esquemas eléctricos, UNE-EN ISO 7519 y similares para la construcción, ISO 128 y 6410 para roscas y cortes). Así se ahorra tiempo, se evitan errores y el plano se entiende en cualquier país. A cada símbolo se le suma la <b>leyenda</b> y, en planos de construcción, su tamaño real según la <b>escala</b>.</Note>
    </Frame>
  );
}
