"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Roscas métricas ISO de paso grueso: diámetro nominal d y paso P (mm). */
export const ROSCAS: readonly { d: number; p: number }[] = [
  { d: 3, p: 0.5 }, { d: 4, p: 0.7 }, { d: 5, p: 0.8 }, { d: 6, p: 1 }, { d: 8, p: 1.25 },
  { d: 10, p: 1.5 }, { d: 12, p: 1.75 }, { d: 16, p: 2 }, { d: 20, p: 2.5 }, { d: 24, p: 3 },
];
/** Diámetros característicos de una rosca métrica de paso P: del flanco d₂ = d − 0,6495·P, del núcleo del tornillo d₃ = d − 1,2269·P y de la broca previa al roscado ≈ d − P. */
export function roscaMetrica(d: number, p: number) {
  return { flanco: d - 0.6495 * p, nucleo: d - 1.2269 * p, broca: d - p, profundidad: 0.6134 * p };
}

/** Segmentos de rayado a 45° dentro del rectángulo [0,w]×[0,h] con separación horizontal `sep` (y hacia arriba como en pantalla). */
export function lineasRayado(w: number, h: number, sep: number): [Pt, Pt][] {
  const out: [Pt, Pt][] = [];
  if (!(sep > 0) || !(w > 0) || !(h > 0)) return out;
  for (let c = -h + sep; c < w; c += sep) {
    const x0 = Math.max(0, c);
    const x1 = Math.min(w, c + h);
    if (x1 - x0 > 1e-9) out.push([[x0, x0 - c], [x1, x1 - c]]);
  }
  return out;
}

export type TipoPerfil = "redondo" | "cuadrado" | "tubo" | "angulo";
/** Área (mm²) y masa por metro (kg/m, acero de 7,85 g/cm³) de un perfil de tamaño a y espesor e (mm). */
export function propiedadesPerfil(tipo: TipoPerfil, a: number, e: number) {
  const ee = Math.min(e, a / 2);
  const area = tipo === "redondo" ? (Math.PI * a * a) / 4 : tipo === "cuadrado" ? a * a : tipo === "tubo" ? (Math.PI / 4) * (a * a - (a - 2 * ee) ** 2) : ee * (2 * a - ee);
  return { area, masaMetro: area * 7.85e-3 };
}

/** Ajuste entre un agujero (ES, EI) y un eje (es, ei), en µm: juego máximo = ES − ei y juego mínimo = EI − es. */
export function ajusteTolerancias(ES: number, EI: number, es: number, ei: number) {
  const juegoMax = ES - ei;
  const juegoMin = EI - es;
  const tipo = juegoMin >= 0 ? "con juego" : juegoMax <= 0 ? "con apriete" : "indeterminado";
  return { juegoMax, juegoMin, tipo, toleranciaAjuste: juegoMax - juegoMin };
}

/** Lista de piezas de una unión atornillada de brida: cantidad y masa unitaria (valores didácticos). */
export function listaPiezas(nTornillos: number) {
  const filas = [
    { pos: 1, nombre: "Brida", cant: 2, masa: 1.2, material: "Acero" },
    { pos: 2, nombre: "Junta", cant: 1, masa: 0.02, material: "Fibra" },
    { pos: 3, nombre: "Tornillo M10×40", cant: nTornillos, masa: 0.05, material: "Acero" },
    { pos: 4, nombre: "Tuerca M10", cant: nTornillos, masa: 0.02, material: "Acero" },
    { pos: 5, nombre: "Arandela", cant: nTornillos * 2, masa: 0.005, material: "Acero" },
  ];
  return { filas, piezas: filas.reduce((s, f) => s + f.cant, 0), masa: filas.reduce((s, f) => s + f.cant * f.masa, 0) };
}

export const MATERIALES = {
  acero: { nombre: "Acero", densidad: 7.85, factor: 2 },
  aluminio: { nombre: "Aluminio", densidad: 2.7, factor: 9 },
  plastico: { nombre: "Polipropileno", densidad: 0.9, factor: 2.5 },
} as const;
export type MaterialId = keyof typeof MATERIALES;
/** Masa (kg) y huella de carbono orientativa (kg CO₂e) de una pieza de volumen V (cm³); el material reciclado (fracción r) reduce el factor en un 80 % (modelo simplificado). */
export function huellaMaterial(m: MaterialId, volumenCm3: number, reciclado: number) {
  const mat = MATERIALES[m];
  const masa = (mat.densidad * volumenCm3) / 1000;
  const r = Math.min(1, Math.max(0, reciclado));
  return { masa, co2: masa * mat.factor * (1 - 0.8 * r) };
}

/* ───────────── 1. Rosca métrica ───────────── */

export function RoscaMetricaDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 5, 0, ROSCAS.length - 1)), L: Math.round(num(block.params?.b, 30, 10, 60)) };
  const [s, setS] = useState(init);
  const r = ROSCAS[s.i]!;
  const g = roscaMetrica(r.d, r.p);
  const U = 4;
  const cy = 120;
  const x0 = 50;
  const rad = (r.d / 2) * U;
  const radN = (g.nucleo / 2) * U;
  const Lp = s.L * U;
  const Cx = 420;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En el dibujo, la rosca se representa con línea gruesa en el diámetro exterior y línea fina en el del núcleo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Rosca M" value={s.i} min={0} max={ROSCAS.length - 1} step={1} color={MANIM.orange} format={(v) => `M${ROSCAS[Math.round(v)]!.d}`} onChange={(i) => setS((o) => ({ ...o, i: Math.round(i) }))} />
          <Slider label="Longitud roscada" value={s.L} min={10} max={60} step={5} unit=" mm" color={MANIM.blue} onChange={(L) => setS((o) => ({ ...o, L }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="rosca-metrica" maxH={260}>
        <Seg a={[x0, cy - rad]} b={[x0 + Lp, cy - rad]} color={MANIM.ink} width={3} />
        <Seg a={[x0, cy + rad]} b={[x0 + Lp, cy + rad]} color={MANIM.ink} width={3} />
        <Seg a={[x0 + Lp, cy - rad]} b={[x0 + Lp, cy + rad]} color={MANIM.ink} width={3} />
        <Seg a={[x0, cy - rad]} b={[x0, cy + rad]} color={MANIM.ink} width={3} />
        <Seg a={[x0, cy - radN]} b={[x0 + Lp, cy - radN]} color={MANIM.blue} width={1.2} />
        <Seg a={[x0, cy + radN]} b={[x0 + Lp, cy + radN]} color={MANIM.blue} width={1.2} />
        <Seg a={[x0 - 12, cy]} b={[x0 + Lp + 12, cy]} color={MANIM.yellow} width={1} dashed />
        <circle cx={Cx} cy={cy} r={rad} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <path d={`M ${Cx + radN} ${cy} A ${radN} ${radN} 0 1 1 ${Cx} ${cy - radN}`} fill="none" stroke={MANIM.blue} strokeWidth={1.2} />
        <Seg a={[Cx - rad - 10, cy]} b={[Cx + rad + 10, cy]} color={MANIM.yellow} width={1} dashed />
        <Seg a={[Cx, cy - rad - 10]} b={[Cx, cy + rad + 10]} color={MANIM.yellow} width={1} dashed />
        <text x={x0} y={cy + 80} fill={MANIM.muted} fontSize={12}>Vista lateral</text>
        <text x={Cx - 30} y={cy + 80} fill={MANIM.muted} fontSize={12}>Vista frontal</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Paso P">{f2(r.p)} mm</Stat>
        <Stat color={MANIM.blue} label="Diámetro del núcleo d₃">{f2(g.nucleo)} mm</Stat>
        <Stat color={MANIM.green} label="Diámetro del flanco d₂">{f2(g.flanco)} mm</Stat>
        <Stat color={MANIM.purple} label="Broca para la rosca interior (d − P)">{f1(g.broca)} mm</Stat>
      </Readout>
      <Note>Una <b>rosca métrica</b> se designa con <b>M</b> y el diámetro nominal (M10) y, si es de paso grueso, no se indica el paso. En el dibujo se simplifica: <b>línea gruesa</b> en el diámetro exterior y <b>fina</b> en el del núcleo; en la vista frontal, un <b>círculo fino de tres cuartos</b>. Las medidas dependen del <b>paso P</b>: el núcleo es d₃ ≈ d − 1,23·P y la broca previa al roscado en el agujero es aproximadamente d − P.</Note>
    </Frame>
  );
}

/* ───────────── 2. Cortes ───────────── */

const CORTES = [
  { value: "sin", label: "Vista sin corte" },
  { value: "total", label: "Corte total" },
  { value: "medio", label: "Medio corte" },
] as const;

export function CortesPiezaDt2Explorador({ block }: { block: ToolBlock }) {
  const modos = ["sin", "total", "medio"] as const;
  const init = { m: modos[Math.round(num(block.params?.n, 1, 0, 2))]!, d: Math.round(num(block.params?.a, 30, 10, 50)), sep: Math.round(num(block.params?.b, 6, 3, 12)) };
  const [s, setS] = useState<{ m: (typeof modos)[number]; d: number; sep: number }>(init);
  const W = 100;
  const H = 60;
  const k = 3.2;
  const x0 = 260 - (W * k) / 2;
  const y0 = 30;
  const hole = s.d;
  const hx0 = (W - hole) / 2;
  const P = (x: number, y: number): Pt => [x0 + x * k, y0 + (H - y) * k];
  const rayar = (xa: number, xb: number) => lineasRayado(xb - xa, H, s.sep).map(([a, b], i) => <Seg key={`${xa}-${i}`} a={P(xa + a[0], a[1])} b={P(xa + b[0], b[1])} color={MANIM.blue} width={1.2} />);
  const rect = (xa: number, xb: number, color: string, w = 3) => (
    <polygon points={[P(xa, 0), P(xb, 0), P(xb, H), P(xa, H)].map((p) => p.join(",")).join(" ")} fill="none" stroke={color} strokeWidth={w} strokeLinejoin="round" />
  );
  const eje = <Seg a={P(W / 2, -6)} b={P(W / 2, H + 6)} color={MANIM.yellow} width={1} dashed />;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El corte muestra el interior: las partes cortadas se rayan a 45° con línea fina y los huecos quedan limpios."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Representación" items={CORTES} value={s.m} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Diámetro del taladro" value={s.d} min={10} max={50} step={5} unit=" mm" color={MANIM.orange} onChange={(d) => setS((o) => ({ ...o, d }))} />
          <Slider label="Separación del rayado" value={s.sep} min={3} max={12} step={1} unit=" mm" color={MANIM.blue} onChange={(sep) => setS((o) => ({ ...o, sep }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="cortes-pieza" maxH={290}>
        {s.m === "sin" ? (
          <>
            {rect(0, W, MANIM.ink)}
            <Seg a={P(hx0, 0)} b={P(hx0, H)} color={MANIM.muted} width={1.5} dashed />
            <Seg a={P(hx0 + hole, 0)} b={P(hx0 + hole, H)} color={MANIM.muted} width={1.5} dashed />
          </>
        ) : null}
        {s.m === "total" ? (
          <>
            {rayar(0, hx0)}
            {rayar(hx0 + hole, W)}
            {rect(0, hx0, MANIM.ink)}
            {rect(hx0 + hole, W, MANIM.ink)}
          </>
        ) : null}
        {s.m === "medio" ? (
          <>
            {rayar(0, hx0)}
            {rect(0, hx0, MANIM.ink)}
            <Seg a={P(hx0, 0)} b={P(hx0, H)} color={MANIM.ink} width={3} />
            <Seg a={P(W / 2, 0)} b={P(W, 0)} color={MANIM.ink} width={3} />
            <Seg a={P(W / 2, H)} b={P(W, H)} color={MANIM.ink} width={3} />
            <Seg a={P(W, 0)} b={P(W, H)} color={MANIM.ink} width={3} />
          </>
        ) : null}
        {eje}
        <text x={x0 - 30} y={y0 + H * k + 30} fill={MANIM.muted} fontSize={12}>
          {s.m === "sin" ? "El taladro se ve con líneas ocultas (discontinuas)" : s.m === "total" ? "El plano de corte atraviesa toda la pieza: se raya lo cortado" : "Simétrica: una mitad en corte y la otra en vista, separadas por el eje"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Espesor de cada pared">{f1((W - hole) / 2)} mm</Stat>
        <Stat color={MANIM.blue} label="Líneas de rayado (cada pared)">{`${lineasRayado((W - hole) / 2, H, s.sep).length}`}</Stat>
        <Stat color={MANIM.muted} label="Rayado">45°, línea fina y continua</Stat>
      </Readout>
      <Note>Un <b>corte</b> imagina la pieza <b>seccionada por un plano</b> y retirada la parte que está delante, para ver el interior sin <b>líneas ocultas</b>. En el <b>corte total</b> el plano atraviesa toda la pieza; en el <b>medio corte</b>, que solo vale para piezas <b>simétricas</b>, una mitad se dibuja en corte y la otra en vista, separadas por el <b>eje</b>. Las superficies que ha tocado el plano se <b>rayan</b> con líneas finas a <b>45°</b>, siempre en el mismo sentido y con separación uniforme en una misma pieza; los huecos y lo que está más allá del plano no se rayan.</Note>
    </Frame>
  );
}

/* ───────────── 3. Perfiles y secciones ───────────── */

const PERFILES = [
  { value: "redondo", label: "Redondo macizo" },
  { value: "cuadrado", label: "Cuadrado macizo" },
  { value: "tubo", label: "Tubo redondo" },
  { value: "angulo", label: "Ángulo en L" },
] as const;

export function PerfilesSeccionDt2Explorador({ block }: { block: ToolBlock }) {
  const tipos: TipoPerfil[] = ["redondo", "cuadrado", "tubo", "angulo"];
  const init = { t: tipos[Math.round(num(block.params?.n, 2, 0, 3))]!, a: Math.round(num(block.params?.a, 40, 20, 60)), e: Math.round(num(block.params?.b, 4, 2, 10)) };
  const [s, setS] = useState<{ t: TipoPerfil; a: number; e: number }>(init);
  const e = Math.min(s.e, s.a / 2 - 1);
  const pr = propiedadesPerfil(s.t, s.a, e);
  const k = 2.4;
  const cx = 260;
  const cy = 120;
  const a = s.a * k;
  const t = e * k;
  const id = "rayado-perfil";
  const forma = () => {
    if (s.t === "redondo") return <circle cx={cx} cy={cy} r={a / 2} fill={`url(#${id})`} stroke={MANIM.ink} strokeWidth={3} />;
    if (s.t === "cuadrado") return <rect x={cx - a / 2} y={cy - a / 2} width={a} height={a} fill={`url(#${id})`} stroke={MANIM.ink} strokeWidth={3} />;
    if (s.t === "tubo") {
      const ro = a / 2;
      const ri = ro - t;
      return <path d={`M ${cx - ro} ${cy} a ${ro} ${ro} 0 1 0 ${2 * ro} 0 a ${ro} ${ro} 0 1 0 ${-2 * ro} 0 Z M ${cx - ri} ${cy} a ${ri} ${ri} 0 1 1 ${2 * ri} 0 a ${ri} ${ri} 0 1 1 ${-2 * ri} 0 Z`} fillRule="evenodd" fill={`url(#${id})`} stroke={MANIM.ink} strokeWidth={3} />;
    }
    const x = cx - a / 2;
    const y = cy - a / 2;
    return <polygon points={[[x, y], [x + t, y], [x + t, y + a - t], [x + a, y + a - t], [x + a, y + a], [x, y + a]].map((p) => p.join(",")).join(" ")} fill={`url(#${id})`} stroke={MANIM.ink} strokeWidth={3} strokeLinejoin="round" />;
  };
  const conEspesor = s.t === "tubo" || s.t === "angulo";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un perfil comercial se define por la forma de su sección, sus dimensiones y su espesor; de ahí salen el área y la masa por metro."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Perfil" items={PERFILES} value={s.t} onChange={(t) => setS((o) => ({ ...o, t }))} />
          <Slider label={s.t === "redondo" ? "Diámetro" : s.t === "tubo" ? "Diámetro exterior" : "Lado"} value={s.a} min={20} max={60} step={5} unit=" mm" color={MANIM.orange} onChange={(a2) => setS((o) => ({ ...o, a: a2 }))} />
          {conEspesor ? <Slider label="Espesor" value={e} min={2} max={10} step={1} unit=" mm" color={MANIM.blue} onChange={(e2) => setS((o) => ({ ...o, e: e2 }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={240} testId="perfiles-seccion" maxH={260}>
        <defs>
          <pattern id={id} width={8} height={8} patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
            <line x1={0} y1={0} x2={0} y2={8} stroke={MANIM.blue} strokeWidth={1.4} />
          </pattern>
        </defs>
        {forma()}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Área de la sección">{f1(pr.area)} mm²</Stat>
        <Stat color={MANIM.green} label="Masa por metro (acero)">{f2(pr.masaMetro)} kg/m</Stat>
        <Stat color={MANIM.muted} label="Masa de una barra de 6 m">{f1(pr.masaMetro * 6)} kg</Stat>
      </Readout>
      <Note>Una <b>sección</b> muestra solo lo que corta el plano, <b>rayado</b> y sin lo que hay detrás. Si se <b>abate</b> sobre la propia vista se dibuja con <b>línea fina</b> encima de ella; si se <b>desplaza</b>, se coloca fuera, con el trazo del plano de corte indicado. Las <b>roturas</b> (líneas finas a mano alzada o en zigzag) permiten <b>acortar</b> piezas largas de sección constante. Con la sección se calcula el <b>área</b> y, con la densidad del acero (7,85 g/cm³), la <b>masa por metro</b>: área en mm² × 0,00785 = kg/m.</Note>
    </Frame>
  );
}

/* ───────────── 4. Tolerancias y ajustes ───────────── */

export function AjusteToleranciasDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { ES: Math.round(num(block.params?.a, 21, 10, 50)), es: Math.round(num(block.params?.b, -7, -60, 40)), IT: 13 };
  const [s, setS] = useState(init);
  const ei = s.es - s.IT;
  const aj = ajusteTolerancias(s.ES, 0, s.es, ei);
  const cy = 130;
  const U = 2.4;
  const Y = (v: number) => cy - v * U;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El juego máximo es la diferencia entre el agujero más grande y el eje más pequeño; el mínimo, entre el agujero más pequeño y el eje más grande."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tolerancia superior del agujero ES" value={s.ES} min={10} max={50} step={1} unit=" µm" color={MANIM.blue} onChange={(ES) => setS((o) => ({ ...o, ES }))} />
          <Slider label="Desviación superior del eje es" value={s.es} min={-60} max={40} step={1} unit=" µm" color={MANIM.orange} onChange={(es) => setS((o) => ({ ...o, es }))} />
          <Slider label="Tolerancia del eje" value={s.IT} min={6} max={30} step={1} unit=" µm" color={MANIM.green} onChange={(IT) => setS((o) => ({ ...o, IT }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="ajuste-tolerancias" maxH={280}>
        <Seg a={[40, Y(0)]} b={[480, Y(0)]} color={MANIM.ink} width={2} />
        <text x={380} y={Y(0) - 6} fill={MANIM.ink} fontSize={12} fontWeight={700}>línea de cero (nominal)</text>
        <rect x={150} y={Y(s.ES)} width={80} height={s.ES * U} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={2.5} />
        <text x={150} y={Y(s.ES) - 6} fill={MANIM.blue} fontSize={12} fontWeight={700}>agujero</text>
        <rect x={290} y={Y(s.es)} width={80} height={s.IT * U} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={2.5} />
        <text x={290} y={Y(s.es) - 6} fill={MANIM.orange} fontSize={12} fontWeight={700}>eje</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Juego mínimo EI − es">{`${aj.juegoMin} µm`}</Stat>
        <Stat color={MANIM.green} label="Juego máximo ES − ei">{`${aj.juegoMax} µm`}</Stat>
        <Stat color={MANIM.yellow} label="Tipo de ajuste">{aj.tipo}</Stat>
        <Stat color={MANIM.muted} label="Tolerancia del ajuste">{`${aj.toleranciaAjuste} µm`}</Stat>
      </Readout>
      <Note>Ninguna pieza se fabrica con la medida exacta: se admite un <b>intervalo de tolerancia</b> alrededor de la <b>dimensión nominal</b>. Al ensamblar un <b>eje</b> en un <b>agujero</b>, el ajuste puede ser <b>con juego</b> (siempre holgado), <b>con apriete</b> (siempre forzado) o <b>indeterminado</b> (según las medidas reales). El <b>juego máximo</b> es ES − ei y el <b>mínimo</b> es EI − es. En esta herramienta el agujero tiene EI = 0, como en el sistema de <b>agujero base</b>. Una tolerancia más estrecha da mejor ajuste pero encarece la fabricación.</Note>
    </Frame>
  );
}

/* ───────────── 5. Lista de piezas de un conjunto ───────────── */

export function ListaPiezasDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 4, 3, 8)) };
  const [s, setS] = useState(init);
  const lp = listaPiezas(s.n);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El plano de conjunto numera cada pieza con un globo y la lista de piezas recoge el número, la cantidad, la denominación y el material."}
      onReset={() => setS(init)}
      controls={<Slider label="Tornillos de la unión" value={s.n} min={3} max={8} step={1} color={MANIM.orange} onChange={(n) => setS({ n })} />}
    >
      <Svg w={520} h={230} testId="lista-piezas" maxH={250}>
        {["Pos.", "Cant.", "Denominación", "Material"].map((c, i) => (
          <text key={c} x={[20, 70, 130, 340][i]} y={28} fill={MANIM.muted} fontSize={13} fontWeight={700}>{c}</text>
        ))}
        <Seg a={[14, 36]} b={[500, 36]} color={MANIM.ink} width={1.5} />
        {lp.filas.map((f, i) => (
          <g key={f.pos}>
            <circle cx={30} cy={62 + i * 32 - 5} r={11} fill="none" stroke={MANIM.yellow} strokeWidth={1.5} />
            <text x={30} y={62 + i * 32} textAnchor="middle" fill={MANIM.yellow} fontSize={13} fontWeight={700}>{f.pos}</text>
            <text x={78} y={62 + i * 32} fill={MANIM.ink} fontSize={14} fontWeight={700}>{f.cant}</text>
            <text x={130} y={62 + i * 32} fill={MANIM.ink} fontSize={14}>{f.nombre}</text>
            <text x={340} y={62 + i * 32} fill={MANIM.muted} fontSize={14}>{f.material}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Piezas en total">{`${lp.piezas}`}</Stat>
        <Stat color={MANIM.green} label="Masa del conjunto (valores didácticos)">{f2(lp.masa)} kg</Stat>
        <Stat color={MANIM.muted} label="Referencias distintas">{`${lp.filas.length}`}</Stat>
      </Readout>
      <Note>El <b>plano de conjunto</b> (o de montaje) muestra cómo se <b>ensamblan</b> las piezas. Cada una lleva un <b>globo numerado</b> que remite a la <b>lista de piezas</b> (el <b>despiece</b>), con su posición, cantidad, denominación, material y, a menudo, la norma o las dimensiones. Las piezas <b>normalizadas</b> (tornillos, tuercas, arandelas) se compran y se designan por su norma; las <b>especiales</b> (la brida) llevan su propio <b>plano de taller</b>. Si cambias el número de tornillos, cambian las cantidades de tornillos, tuercas y arandelas, pero no las de brida y junta.</Note>
    </Frame>
  );
}

/* ───────────── 6. Material, masa y huella de carbono ───────────── */

export function HuellaMaterialDt2Explorador({ block }: { block: ToolBlock }) {
  const ids: MaterialId[] = ["acero", "aluminio", "plastico"];
  const init = { m: ids[Math.round(num(block.params?.n, 0, 0, 2))]!, v: Math.round(num(block.params?.a, 200, 50, 500)), r: Math.round(num(block.params?.b, 0, 0, 100)) };
  const [s, setS] = useState<{ m: MaterialId; v: number; r: number }>(init);
  const h = huellaMaterial(s.m, s.v, s.r / 100);
  const todos = ids.map((id) => ({ id, ...huellaMaterial(id, s.v, s.r / 100) }));
  const maxCo2 = Math.max(...todos.map((t) => t.co2), 0.001);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La misma pieza pesa y contamina distinto según el material; reciclar reduce la huella."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={ids.map((id) => ({ value: id, label: MATERIALES[id].nombre }))} value={s.m} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Volumen de la pieza" value={s.v} min={50} max={500} step={50} unit=" cm³" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Material reciclado" value={s.r} min={0} max={100} step={10} unit=" %" color={MANIM.green} onChange={(r) => setS((o) => ({ ...o, r }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="huella-material" maxH={210}>
        {todos.map((t, i) => (
          <g key={t.id}>
            <text x={20} y={40 + i * 46} fill={t.id === s.m ? MANIM.yellow : MANIM.muted} fontSize={14} fontWeight={700}>{MATERIALES[t.id].nombre}</text>
            <rect x={150} y={24 + i * 46} width={Math.max(2, (t.co2 / maxCo2) * 300)} height={22} rx={4} fill={t.id === s.m ? MANIM.green : MANIM.grid} fillOpacity={t.id === s.m ? 0.9 : 0.6} />
            <text x={156 + (t.co2 / maxCo2) * 300} y={41 + i * 46} fill={MANIM.ink} fontSize={13}>{`${f2(t.co2)} kg CO₂e`}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Masa de la pieza">{f2(h.masa)} kg</Stat>
        <Stat color={MANIM.green} label="Huella orientativa">{f2(h.co2)} kg CO₂e</Stat>
        <Stat color={MANIM.muted} label="Densidad">{f2(MATERIALES[s.m].densidad)} g/cm³</Stat>
      </Readout>
      <Note>Al <b>diseñar</b> se decide casi todo el impacto de un producto. Para un mismo volumen, el <b>aluminio</b> pesa un tercio que el acero, pero su <b>producción primaria</b> consume mucha energía. Usar <b>material reciclado</b> reduce mucho la huella. Los valores son <b>órdenes de magnitud</b> didácticos (el factor real depende del proceso, la región y la aleación): sirven para <b>comparar</b> opciones, no para certificar. El <b>ecodiseño</b> considera todo el <b>ciclo de vida</b>: materias primas, fabricación, transporte, uso y fin de vida, para reducir material, evitar mezclas difíciles de reciclar y alargar la vida útil.</Note>
    </Frame>
  );
}
