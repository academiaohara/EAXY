"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Disponibilidad de un sistema con n réplicas independientes y disponibilidad a cada una (0–1). */
export const disponibilidadTotal = (a: number, n: number) => 1 - (1 - a) ** Math.max(0, n);
export const horasCaidaAnio = (disp: number) => (1 - disp) * 8760;
/** Tiempo (s) de una transferencia: latencia + tamaño / ancho de banda. */
export const tiempoTransferencia = (mb: number, mbps: number, latenciaMs: number) => (mbps > 0 ? latenciaMs / 1000 + (mb * 8) / mbps : Infinity);

export type Pieza = { id: number; nombre: string; material: string; masa: number; precio: number };
export const PIEZAS: Pieza[] = [
  { id: 1, nombre: "Eje", material: "acero", masa: 450, precio: 12.5 },
  { id: 2, nombre: "Soporte", material: "aluminio", masa: 120, precio: 8 },
  { id: 3, nombre: "Engranaje", material: "acero", masa: 210, precio: 15 },
  { id: 4, nombre: "Carcasa", material: "plástico", masa: 90, precio: 4.5 },
  { id: 5, nombre: "Polea", material: "aluminio", masa: 75, precio: 6.5 },
  { id: 6, nombre: "Tapa", material: "plástico", masa: 40, precio: 2 },
  { id: 7, nombre: "Palanca", material: "acero", masa: 160, precio: 9 },
  { id: 8, nombre: "Casquillo", material: "bronce", masa: 60, precio: 7 },
];
export type Consulta = {
  filtro: "ninguno" | "acero" | "aluminio" | "plastico" | "masa>100" | "precio<8";
  orden: "id" | "masa" | "precio";
  desc: boolean;
  agregado: "ninguno" | "count" | "avg-precio" | "sum-masa";
};
const FILTROS: Record<Consulta["filtro"], ((p: Pieza) => boolean) | null> = {
  ninguno: null,
  acero: (p) => p.material === "acero",
  aluminio: (p) => p.material === "aluminio",
  plastico: (p) => p.material === "plástico",
  "masa>100": (p) => p.masa > 100,
  "precio<8": (p) => p.precio < 8,
};
const WHERE_SQL: Record<Consulta["filtro"], string> = {
  ninguno: "",
  acero: "WHERE material = 'acero'",
  aluminio: "WHERE material = 'aluminio'",
  plastico: "WHERE material = 'plástico'",
  "masa>100": "WHERE masa > 100",
  "precio<8": "WHERE precio < 8",
};
/** Ejecuta una consulta sencilla sobre la tabla de piezas y devuelve las filas, el agregado y la sentencia SQL equivalente. */
export function ejecutarConsulta(rows: readonly Pieza[], q: Consulta) {
  const f = FILTROS[q.filtro];
  const r = (f ? rows.filter(f) : [...rows]).sort((a, b) => (q.orden === "id" ? a.id - b.id : a[q.orden] - b[q.orden]) * (q.desc ? -1 : 1));
  const campos = q.agregado === "count" ? "COUNT(*)" : q.agregado === "avg-precio" ? "AVG(precio)" : q.agregado === "sum-masa" ? "SUM(masa)" : "*";
  let valor: number | null = null;
  if (q.agregado === "count") valor = r.length;
  if (q.agregado === "avg-precio") valor = r.length ? r.reduce((s, p) => s + p.precio, 0) / r.length : 0;
  if (q.agregado === "sum-masa") valor = r.reduce((s, p) => s + p.masa, 0);
  const orden = q.agregado === "ninguno" ? `ORDER BY ${q.orden} ${q.desc ? "DESC" : "ASC"}` : "";
  const sql = ["SELECT", campos, "FROM piezas", WHERE_SQL[q.filtro], orden].filter(Boolean).join(" ") + ";";
  return { rows: r, valor, sql };
}

/** Datos generados por un conjunto de sensores (GB al día y TB al año), con compresión opcional. */
export function volumenDatos(sensores: number, muestrasPorSegundo: number, bytesPorMuestra: number, factorCompresion = 1) {
  const diaB = (sensores * muestrasPorSegundo * bytesPorMuestra * 86400) / Math.max(1, factorCompresion);
  return { diaGB: diaB / 1e9, anioTB: (diaB * 365) / 1e12 };
}

export type Punto = { x: number; y: number; c: 0 | 1 };
export const PUNTOS: Punto[] = [
  { x: 1, y: 2, c: 0 }, { x: 2, y: 1, c: 0 }, { x: 1.5, y: 3, c: 0 }, { x: 3, y: 2, c: 0 }, { x: 2.5, y: 3.5, c: 0 }, { x: 0.5, y: 1, c: 0 },
  { x: 6, y: 6, c: 1 }, { x: 7, y: 5, c: 1 }, { x: 5.5, y: 7, c: 1 }, { x: 6.5, y: 4.5, c: 1 }, { x: 8, y: 7, c: 1 }, { x: 4.5, y: 5, c: 1 },
];
/** Clasifica un punto con la recta w1·x + w2·y + b > 0 → clase 1. */
export const clasifica = (w1: number, w2: number, b: number, p: { x: number; y: number }) => (w1 * p.x + w2 * p.y + b > 0 ? 1 : 0);
export const precisionLineal = (w1: number, w2: number, b: number, pts: readonly Punto[] = PUNTOS) => (pts.length ? (pts.filter((p) => clasifica(w1, w2, b, p) === p.c).length / pts.length) * 100 : 0);
/** Un paso del perceptrón: corrige los pesos si el punto está mal clasificado. */
export function pasoPerceptron(w: { w1: number; w2: number; b: number }, p: Punto, lr = 0.1) {
  const err = p.c - clasifica(w.w1, w.w2, w.b, p);
  return { w1: w.w1 + lr * err * p.x, w2: w.w2 + lr * err * p.y, b: w.b + lr * err };
}

/** Métricas de un clasificador para una población con prevalencia, sensibilidad y especificidad (0–1). */
export function metricasClasificador(poblacion: number, prevalencia: number, sensibilidad: number, especificidad: number) {
  const pos = poblacion * prevalencia;
  const neg = poblacion - pos;
  const tp = pos * sensibilidad;
  const fn = pos - tp;
  const tn = neg * especificidad;
  const fp = neg - tn;
  return { tp, fp, fn, tn, precision: tp + fp > 0 ? tp / (tp + fp) : 0, recall: pos > 0 ? tp / pos : 0, exactitud: poblacion > 0 ? (tp + tn) / poblacion : 0 };
}

export const ALFABETO = "ABCDEFGHIJKLMNÑOPQRSTUVWXYZ";
/** Cifrado César sobre el alfabeto español de 27 letras (ignora tildes y signos no alfabéticos). */
export function cesar(texto: string, k: number) {
  const n = ALFABETO.length;
  const norm = texto
    .toUpperCase()
    .replace(/Ñ/g, "\u0001")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/\u0001/g, "Ñ");
  return Array.from(norm)
    .map((ch) => {
      const i = ALFABETO.indexOf(ch);
      return i < 0 ? ch : ALFABETO[(((i + k) % n) + n) % n]!;
    })
    .join("");
}
export const espacioClaves = (simbolos: number, longitud: number) => simbolos ** longitud;
/** Tiempo medio (años) de un ataque de fuerza bruta: la mitad del espacio a una velocidad dada (intentos/s). */
export const aniosFuerzaBruta = (espacio: number, intentosPorSegundo: number) => (intentosPorSegundo > 0 ? espacio / 2 / intentosPorSegundo / 31557600 : Infinity);

/** Personas esperadas por combinación de atributos (cuasi-identificadores) en una población. */
export const personasPorCombinacion = (poblacion: number, categorias: readonly number[]) => poblacion / categorias.reduce((a, b) => a * Math.max(1, b), 1);

/* ───────────── 1. Disponibilidad de un sistema distribuido ───────────── */

export function DisponibilidadExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 2, 1, 6)), a: 99, mb: 500, mbps: 100, ms: 40 };
  const [s, setS] = useState(init);
  const d = disponibilidadTotal(s.a / 100, s.n);
  const t = tiempoTransferencia(s.mb, s.mbps, s.ms);
  const caida = horasCaidaAnio(d);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Replicar un servicio en varios servidores aumenta su disponibilidad. Y la red limita el tiempo de cualquier transferencia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Réplicas del servicio" value={s.n} min={1} max={6} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Disponibilidad de cada servidor" value={s.a} min={90} max={99.9} step={0.1} unit=" %" color={MANIM.green} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Tamaño a transferir" value={s.mb} min={1} max={5000} step={10} unit=" MB" color={MANIM.orange} onChange={(mb) => setS((x) => ({ ...x, mb }))} />
          <Slider label="Ancho de banda" value={s.mbps} min={1} max={1000} step={1} unit=" Mbps" color={MANIM.purple} onChange={(mbps) => setS((x) => ({ ...x, mbps }))} />
          <Slider label="Latencia" value={s.ms} min={1} max={400} step={1} unit=" ms" color={MANIM.red} onChange={(ms) => setS((x) => ({ ...x, ms }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Disponibilidad del conjunto">{fmtEs(d * 100, 4)} %</Stat>
        <Stat color={MANIM.red} label="Tiempo caído al año">{caida < 1 ? `${f1(caida * 60)} min` : `${f1(caida)} h`}</Stat>
        <Stat color={MANIM.orange} label="Tiempo de transferencia">{Number.isFinite(t) ? `${f1(t)} s` : "—"}</Stat>
      </Readout>
      <Note>Con n réplicas independientes el sistema solo falla si fallan todas: D = 1 − (1 − a)ⁿ. Dos servidores del 99 % dan un 99,99 % (menos de una hora caída al año). La transferencia tarda latencia + tamaño·8/ancho de banda. Las réplicas también mejoran el rendimiento (reparto de carga), pero exigen mantener los datos <b>sincronizados</b> (consistencia).</Note>
    </Frame>
  );
}

/* ───────────── 2. Consultas SQL ───────────── */

export function SqlExplorador({ block }: { block: ToolBlock }) {
  const init: Consulta = { filtro: "ninguno", orden: "id", desc: false, agregado: "ninguno" };
  const [q, setQ] = useState<Consulta>(init);
  const r = ejecutarConsulta(PIEZAS, q);
  const filtros: { value: Consulta["filtro"]; label: string }[] = [
    { value: "ninguno", label: "Ninguno" },
    { value: "acero", label: "material = acero" },
    { value: "aluminio", label: "material = aluminio" },
    { value: "plastico", label: "material = plástico" },
    { value: "masa>100", label: "masa > 100" },
    { value: "precio<8", label: "precio < 8" },
  ];
  const agregados: { value: Consulta["agregado"]; label: string }[] = [
    { value: "ninguno", label: "Filas" },
    { value: "count", label: "COUNT(*)" },
    { value: "avg-precio", label: "AVG(precio)" },
    { value: "sum-masa", label: "SUM(masa)" },
  ];
  const ordenes: { value: Consulta["orden"]; label: string }[] = [
    { value: "id", label: "id" },
    { value: "masa", label: "masa" },
    { value: "precio", label: "precio" },
  ];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Construye una consulta sobre una tabla de piezas: filtra, ordena o calcula un agregado. Verás la sentencia SQL y el resultado."}
      onReset={() => setQ(init)}
      controls={
        <>
          <Choice label="Filtro (WHERE)" items={filtros} value={q.filtro} onChange={(filtro) => setQ((x) => ({ ...x, filtro }))} />
          <Choice label="Resultado" items={agregados} value={q.agregado} onChange={(agregado) => setQ((x) => ({ ...x, agregado }))} />
          {q.agregado === "ninguno" ? (
            <>
              <Choice label="Ordenar por" items={ordenes} value={q.orden} onChange={(orden) => setQ((x) => ({ ...x, orden }))} />
              <button type="button" className={TOOL_BTN} aria-pressed={q.desc} onClick={() => setQ((x) => ({ ...x, desc: !x.desc }))}>
                Orden descendente: {q.desc ? "sí" : "no"}
              </button>
            </>
          ) : null}
        </>
      }
    >
      <pre className="overflow-x-auto rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/30 p-3 font-mono text-sm text-[color:var(--stage-ink,#fff)]" data-testid="sql">
        {r.sql}
      </pre>
      {q.agregado === "ninguno" ? (
        <table className="w-full text-left font-mono text-sm text-[color:var(--stage-ink,#fff)]" data-testid="sql-resultado">
          <thead>
            <tr className="text-[color:var(--stage-muted,#b8c2d0)]">
              <th>id</th>
              <th>nombre</th>
              <th>material</th>
              <th>masa (g)</th>
              <th>precio (€)</th>
            </tr>
          </thead>
          <tbody>
            {r.rows.map((p) => (
              <tr key={p.id}>
                <td>{p.id}</td>
                <td>{p.nombre}</td>
                <td>{p.material}</td>
                <td>{p.masa}</td>
                <td>{fmtEs(p.precio, 2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <Readout>
          <Stat color={MANIM.green} label="Resultado">{r.valor === null ? "—" : fmtEs(r.valor, q.agregado === "avg-precio" ? 2 : 0)}</Stat>
        </Readout>
      )}
      <Note>Una base de datos relacional guarda los datos en <b>tablas</b> (filas = registros, columnas = atributos) con una <b>clave primaria</b> (aquí, id). <b>SELECT</b> elige qué mostrar, <b>WHERE</b> filtra filas, <b>ORDER BY</b> ordena y las funciones <b>COUNT, SUM y AVG</b> resumen. Otras tablas se enlazan con <b>claves ajenas</b> y se combinan con JOIN.</Note>
    </Frame>
  );
}

/* ───────────── 3. Volumen de datos (big data) ───────────── */

export function VolumenDatosExplorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.a, 1000, 1, 100000)), hz: 1, b: 50, c: 1 };
  const [st, setS] = useState(init);
  const v = volumenDatos(st.s, st.hz, st.b, st.c);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una red de sensores genera datos sin parar. Calcula cuánto almacenamiento exige."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Número de sensores" value={st.s} min={1} max={100000} step={100} color={MANIM.blue} onChange={(s) => setS((x) => ({ ...x, s }))} />
          <Slider label="Muestras por segundo y sensor" value={st.hz} min={0.1} max={100} step={0.1} unit=" Hz" color={MANIM.orange} onChange={(hz) => setS((x) => ({ ...x, hz }))} />
          <Slider label="Bytes por muestra" value={st.b} min={4} max={500} step={2} unit=" B" color={MANIM.purple} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Factor de compresión" value={st.c} min={1} max={10} step={0.5} unit="×" color={MANIM.green} onChange={(c) => setS((x) => ({ ...x, c }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Datos al día">{v.diaGB < 1000 ? `${f1(v.diaGB)} GB` : `${f2(v.diaGB / 1000)} TB`}</Stat>
        <Stat color={MANIM.orange} label="Datos al año">{v.anioTB < 1000 ? `${f1(v.anioTB)} TB` : `${f2(v.anioTB / 1000)} PB`}</Stat>
        <Stat color={MANIM.green} label="Coste de almacenar un año (≈ 20 €/TB·año)">{f0(v.anioTB * 20)} €</Stat>
      </Readout>
      <Note>Big data significa tanto volumen que no cabe ni se procesa con las herramientas habituales. Se describe con las <b>«V»</b>: <b>Volumen</b>, <b>Velocidad</b> (datos en tiempo real), <b>Variedad</b> (texto, imágenes, sensores) y <b>Veracidad</b> (calidad). Se almacena en sistemas distribuidos y se procesa en paralelo. Coste orientativo.</Note>
    </Frame>
  );
}

/* ───────────── 4. Clasificador lineal y perceptrón ───────────── */

export function ClasificadorExplorador({ block }: { block: ToolBlock }) {
  const init = { w1: 0.5, w2: 0.5, b: -1 };
  const [w, setW] = useState(init);
  const [paso, setPaso] = useState(0);
  const acc = precisionLineal(w.w1, w.w2, w.b);
  const X = (x: number) => 40 + (x / 9) * 440;
  const Y = (y: number) => 130 - (y / 9) * 115;
  const entrenar = () => {
    setW((x) => pasoPerceptron(x, PUNTOS[paso % PUNTOS.length]!, 0.1));
    setPaso((p) => p + 1);
  };
  const linea = Math.abs(w.w2) > 1e-6 ? [0, 9].map((x) => ({ x, y: -(w.w1 * x + w.b) / w.w2 })) : null;
  const clip = (y: number) => Math.max(-5, Math.min(14, y));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos clases de puntos. Mueve la recta para separarlas a mano, o deja que el perceptrón aprenda corrigiendo sus pesos punto a punto."}
      onReset={() => {
        setW(init);
        setPaso(0);
      }}
      controls={
        <>
          <Slider label="Peso w₁ (eje x)" value={w.w1} min={-2} max={2} step={0.05} color={MANIM.blue} onChange={(w1) => setW((x) => ({ ...x, w1 }))} />
          <Slider label="Peso w₂ (eje y)" value={w.w2} min={-2} max={2} step={0.05} color={MANIM.orange} onChange={(w2) => setW((x) => ({ ...x, w2 }))} />
          <Slider label="Sesgo b" value={w.b} min={-10} max={10} step={0.1} color={MANIM.purple} onChange={(b) => setW((x) => ({ ...x, b }))} />
          <button type="button" className={TOOL_BTN} onClick={entrenar}>
            Entrenar con el siguiente punto
          </button>
        </>
      }
    >
      <Svg w={520} h={150} testId="clasificador" maxH={170}>
        {linea ? <line x1={X(linea[0]!.x)} y1={Y(clip(linea[0]!.y))} x2={X(linea[1]!.x)} y2={Y(clip(linea[1]!.y))} stroke={MANIM.yellow} strokeWidth={2.5} /> : null}
        {PUNTOS.map((p, i) => {
          const ok = clasifica(w.w1, w.w2, w.b, p) === p.c;
          return <circle key={i} cx={X(p.x)} cy={Y(p.y)} r={6} fill={p.c === 0 ? MANIM.blue : MANIM.orange} stroke={ok ? MANIM.green : MANIM.red} strokeWidth={3} />;
        })}
      </Svg>
      <Readout>
        <Stat color={acc === 100 ? MANIM.green : MANIM.yellow} label="Aciertos">{f0(acc)} %</Stat>
        <Stat color={MANIM.muted} label="Puntos vistos al entrenar">{paso}</Stat>
      </Readout>
      <Note>Un modelo clasifica con una regla w₁·x + w₂·y + b &gt; 0. <b>Entrenar</b> es ajustar los pesos para minimizar los errores en los datos de ejemplo: el perceptrón, ante cada punto mal clasificado, empuja la recta hacia él. El contorno rojo marca los puntos mal clasificados. Si los datos no son separables por una recta, este modelo no puede acertar todos: hacen falta modelos más complejos (redes neuronales).</Note>
    </Frame>
  );
}

/* ───────────── 5. Errores de un clasificador ───────────── */

export function ConfusionExplorador({ block }: { block: ToolBlock }) {
  const init = { p: num(block.params?.a, 1, 0.1, 50), se: 95, es: 95 };
  const [s, setS] = useState(init);
  const m = metricasClasificador(10000, s.p / 100, s.se / 100, s.es / 100);
  const celdas = [
    { x: 140, y: 10, v: m.tp, n: "Verdaderos positivos", c: MANIM.green },
    { x: 290, y: 10, v: m.fp, n: "Falsos positivos", c: MANIM.red },
    { x: 140, y: 60, v: m.fn, n: "Falsos negativos", c: MANIM.red },
    { x: 290, y: 60, v: m.tn, n: "Verdaderos negativos", c: MANIM.green },
  ];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un modelo detecta una condición poco frecuente en 10 000 casos. Aunque acierte mucho, ¿cuántas de sus alarmas son reales?"}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Prevalencia (casos reales)" value={s.p} min={0.1} max={50} step={0.1} unit=" %" color={MANIM.blue} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Sensibilidad (detecta los positivos)" value={s.se} min={50} max={100} step={1} unit=" %" color={MANIM.green} onChange={(se) => setS((x) => ({ ...x, se }))} />
          <Slider label="Especificidad (descarta los negativos)" value={s.es} min={50} max={100} step={1} unit=" %" color={MANIM.orange} onChange={(es) => setS((x) => ({ ...x, es }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="confusion" maxH={130}>
        {celdas.map((c) => (
          <g key={c.n}>
            <rect x={c.x} y={c.y} width={140} height={44} rx={6} fill={c.c} fillOpacity={0.25} stroke={c.c} strokeWidth={2} />
            <text x={c.x + 70} y={c.y + 20} textAnchor="middle" fill={MANIM.ink} fontSize={15} fontWeight={700}>
              {f0(c.v)}
            </text>
            <text x={c.x + 70} y={c.y + 36} textAnchor="middle" fill={MANIM.muted} fontSize={10}>
              {c.n}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Exactitud">{f1(m.exactitud * 100)} %</Stat>
        <Stat color={MANIM.blue} label="Sensibilidad (recall)">{f1(m.recall * 100)} %</Stat>
        <Stat color={m.precision < 0.5 ? MANIM.red : MANIM.green} label="Precisión: de las alarmas, reales">{f1(m.precision * 100)} %</Stat>
      </Readout>
      <Note>Con una condición rara (1 %) y un modelo con un 95 % de sensibilidad y de especificidad, <b>la mayoría de las alarmas son falsas</b>: solo unas 16 de cada 100. La exactitud engaña cuando las clases están desequilibradas. Por eso se mira también la <b>precisión</b> y la <b>sensibilidad</b>, se conoce la <b>prevalencia</b> y se valora el <b>coste de cada tipo de error</b>. Los sesgos en los datos de entrenamiento producen errores desiguales entre grupos.</Note>
    </Frame>
  );
}

/* ───────────── 6. Cifrado César y fuerza bruta ───────────── */

export function CifradoExplorador({ block }: { block: ToolBlock }) {
  const init = { k: Math.round(num(block.params?.a, 3, 0, 26)), sim: 62, len: 8, vel: 9 };
  const [s, setS] = useState(init);
  const claro = "ATACAMOS AL AMANECER";
  const cif = cesar(claro, s.k);
  const esp = espacioClaves(s.sim, s.len);
  const anios = aniosFuerzaBruta(esp, 10 ** s.vel);
  const tiempo = anios < 1 / 365 ? "menos de un día" : anios < 1 ? `${f0(anios * 365)} ${Math.round(anios * 365) === 1 ? "día" : "días"}` : anios < 1e6 ? `${f0(anios)} años` : `${anios.toExponential(1).replace(".", ",")} años`;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cifra un mensaje con el cifrado César (desplaza cada letra) y mira por qué un cifrado débil se rompe y cuánto dura una contraseña."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Desplazamiento k (clave del César)" value={s.k} min={0} max={26} step={1} color={MANIM.blue} onChange={(k) => setS((x) => ({ ...x, k }))} />
          <Slider label="Símbolos posibles en una contraseña" value={s.sim} min={10} max={95} step={1} color={MANIM.orange} onChange={(sim) => setS((x) => ({ ...x, sim }))} />
          <Slider label="Longitud de la contraseña" value={s.len} min={4} max={20} step={1} unit=" caracteres" color={MANIM.purple} onChange={(len) => setS((x) => ({ ...x, len }))} />
          <Slider label="Velocidad del atacante (10ˣ intentos/s)" value={s.vel} min={3} max={12} step={1} color={MANIM.red} onChange={(vel) => setS((x) => ({ ...x, vel }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.muted} label="Mensaje">{claro}</Stat>
        <Stat color={MANIM.blue} label="Cifrado con k">{cif}</Stat>
        <Stat color={MANIM.orange} label="Combinaciones de la contraseña">{esp < 1e6 ? f0(esp) : esp.toExponential(2).replace(".", ",")}</Stat>
        <Stat color={anios < 1 ? MANIM.red : MANIM.green} label="Tiempo medio de fuerza bruta">{tiempo}</Stat>
      </Readout>
      <Note>El César solo tiene 26 claves útiles: se rompe probándolas todas, o analizando la frecuencia de las letras. Los cifrados modernos (AES, RSA) tienen espacios de claves enormes: 2<sup>128</sup> o más. En una contraseña, el espacio es <b>símbolos<sup>longitud</sup></b>: crece mucho más al <b>alargarla</b> que al añadir símbolos. Una contraseña larga y única, un gestor de contraseñas y la verificación en dos pasos son la mejor defensa.</Note>
    </Frame>
  );
}

/* ───────────── 7. Privacidad: cuasi-identificadores ───────────── */

export function PrivacidadExplorador({ block }: { block: ToolBlock }) {
  const init = { cp: Math.round(num(block.params?.a, 1, 0, 1)), ed: 1, se: 0, pro: 0 };
  const [s, setS] = useState(init);
  const CATS = { cp: 500, ed: 90, se: 2, pro: 50 };
  const cats = [s.cp ? CATS.cp : 1, s.ed ? CATS.ed : 1, s.se ? CATS.se : 1, s.pro ? CATS.pro : 1];
  const pers = personasPorCombinacion(1_000_000, cats);
  const un = (v: number) => (v ? "sí" : "no");
  const botones = [["cp", "Código postal (500 zonas)"], ["ed", "Fecha de nacimiento (90 años)"], ["se", "Sexo (2)"], ["pro", "Profesión (50)"]] as const;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un conjunto de datos «anónimo» de un millón de personas. Cuantos más datos corrientes se combinan, menos personas comparten esa combinación."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2">
          {botones.map(([k, l]) => (
            <button key={k} type="button" className={TOOL_BTN} aria-pressed={!!s[k]} onClick={() => setS((x) => ({ ...x, [k]: x[k] ? 0 : 1 }))}>
              {l}: {un(s[k])}
            </button>
          ))}
        </div>
      }
    >
      <Readout>
        <Stat color={pers <= 1 ? MANIM.red : pers < 10 ? MANIM.yellow : MANIM.green} label="Personas que comparten esa combinación">{pers < 1 ? "menos de una: identificable" : f0(pers)}</Stat>
        <Stat color={MANIM.muted} label="Combinaciones posibles">{f0(cats.reduce((a, b) => a * b, 1))}</Stat>
      </Readout>
      <Note>Quitar el nombre no anonimiza: <b>código postal + fecha de nacimiento + sexo</b> bastan para identificar a una gran parte de la población. Se llaman <b>cuasi-identificadores</b>. Por eso el RGPD exige <b>minimizar los datos</b>, pedir <b>consentimiento</b>, limitar la finalidad y aplicar técnicas como la <b>k-anonimidad</b> (cada combinación comparte al menos k personas). Cálculo orientativo con atributos independientes.</Note>
    </Frame>
  );
}
