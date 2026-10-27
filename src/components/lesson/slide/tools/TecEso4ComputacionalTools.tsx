"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f0 = (v: number) => fmtEs(v, 0);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const LISTA_ORDENADA = [2, 5, 8, 12, 16, 23, 28, 31, 38, 42, 47, 51, 56, 63, 70, 77] as const;

/** Búsqueda lineal: posición (−1 si no está) y comparaciones realizadas. */
export function busquedaLineal(arr: readonly number[], t: number) {
  let comps = 0;
  for (let i = 0; i < arr.length; i++) {
    comps++;
    if (arr[i] === t) return { pos: i, comps };
  }
  return { pos: -1, comps };
}

/** Búsqueda binaria sobre una lista ordenada: posición, comparaciones y tramos examinados. */
export function busquedaBinaria(arr: readonly number[], t: number) {
  let bajo = 0;
  let alto = arr.length - 1;
  let comps = 0;
  const trazas: { bajo: number; alto: number; medio: number }[] = [];
  while (bajo <= alto) {
    const medio = Math.floor((bajo + alto) / 2);
    comps++;
    trazas.push({ bajo, alto, medio });
    if (arr[medio] === t) return { pos: medio, comps, trazas };
    if (arr[medio]! < t) bajo = medio + 1;
    else alto = medio - 1;
  }
  return { pos: -1, comps, trazas };
}

/** Instantáneas del método de la burbuja: cada comparación, con el estado de la lista. */
export function pasosBurbuja(inicial: readonly number[]) {
  const v = [...inicial];
  const pasos: { v: number[]; j: number; cambia: boolean; fin: number }[] = [];
  const n = v.length;
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - 1 - i; j++) {
      const cambia = v[j]! > v[j + 1]!;
      pasos.push({ v: [...v], j, cambia, fin: n - i });
      if (cambia) [v[j], v[j + 1]] = [v[j + 1]!, v[j]!];
    }
  }
  pasos.push({ v: [...v], j: -1, cambia: false, fin: 0 });
  return pasos;
}

export function resumenDatos(arr: readonly number[], umbral: number) {
  const n = arr.length;
  if (n === 0) return { media: 0, max: 0, min: 0, sobre: 0 };
  return { media: arr.reduce((a, b) => a + b, 0) / n, max: Math.max(...arr), min: Math.min(...arr), sobre: arr.filter((x) => x > umbral).length };
}

/** Operaciones en el peor caso para n datos. */
export const opsLineal = (n: number) => n;
export const opsBinaria = (n: number) => (n > 0 ? Math.floor(Math.log2(n)) + 1 : 0);
export const opsCuadratica = (n: number) => n * n;

export const DESCOMPOSICIONES = [
  { n: "Semáforo inteligente", partes: ["Detectar peatones (sensor)", "Medir el tráfico", "Decidir la fase (algoritmo)", "Encender las luces (actuadores)", "Registrar datos de uso"] },
  { n: "Estación meteorológica", partes: ["Leer temperatura y humedad", "Convertir y calibrar valores", "Guardar las medidas en una lista", "Calcular media, máximo y mínimo", "Mostrar o enviar los resultados"] },
  { n: "Robot recogepelotas", partes: ["Detectar la pelota", "Calcular la dirección", "Mover los motores", "Recoger con la pinza", "Evitar obstáculos y volver"] },
] as const;

/* ───────────── 1. Descomposición ───────────── */

export function DescomposicionExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, DESCOMPOSICIONES.length - 1)), hechas: [] as number[] };
  const [s, setS] = useState(init);
  const D = DESCOMPOSICIONES[s.p]!;
  const pct = (s.hechas.length / D.partes.length) * 100;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un problema grande se divide en partes pequeñas que se resuelven por separado. Marca cada parte cuando la tengas resuelta."}
      onReset={() => setS(init)}
      controls={<Choice label="Problema" items={DESCOMPOSICIONES.map((x, value) => ({ value, label: x.n }))} value={s.p} onChange={(p) => setS({ p, hechas: [] })} />}
    >
      <ul className="flex flex-col gap-2" data-testid="descomposicion">
        {D.partes.map((t, i) => {
          const ok = s.hechas.includes(i);
          return (
            <li key={t}>
              <button type="button" className={TOOL_BTN} aria-pressed={ok} onClick={() => setS((x) => ({ ...x, hechas: ok ? x.hechas.filter((k) => k !== i) : [...x.hechas, i] }))}>
                {ok ? "✓ " : ""}
                {i + 1}. {t}
              </button>
            </li>
          );
        })}
      </ul>
      <Readout>
        <Stat color={pct === 100 ? MANIM.green : MANIM.orange} label="Subproblemas resueltos">{s.hechas.length} de {D.partes.length}</Stat>
        <Stat color={MANIM.blue} label="Avance">{f0(pct)} %</Stat>
      </Readout>
      <Note>Descomponer es dividir el problema en subproblemas más sencillos; <b>abstraer</b> es quedarse con lo importante de cada uno. Cada parte se puede escribir como una función, probarla por separado y reutilizarla.</Note>
    </Frame>
  );
}

/* ───────────── 2. Búsqueda lineal frente a binaria ───────────── */

export function BusquedaExplorador({ block }: { block: ToolBlock }) {
  const init = { t: Math.round(num(block.params?.a, 47, 1, 80)) };
  const [s, setS] = useState(init);
  const L = busquedaLineal(LISTA_ORDENADA, s.t);
  const B = busquedaBinaria(LISTA_ORDENADA, s.t);
  const recorridas = new Set(Array.from({ length: Math.min(L.comps, 16) }, (_, i) => i));
  const medios = new Set(B.trazas.map((t) => t.medio));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el número que buscas en una lista ordenada de 16 elementos y compara cuántas comparaciones necesita cada método."}
      onReset={() => setS(init)}
      controls={<Slider label="Número buscado" value={s.t} min={1} max={80} step={1} color={MANIM.yellow} onChange={(t) => setS({ t })} />}
    >
      <Svg w={520} h={130} testId="busqueda" maxH={150}>
        {[0, 1].map((fila) => (
          <g key={fila}>
            <text x={4} y={30 + fila * 60} fill={MANIM.muted} fontSize={11}>
              {fila === 0 ? "lineal" : "binaria"}
            </text>
            {LISTA_ORDENADA.map((v, i) => {
              const vis = fila === 0 ? recorridas.has(i) : medios.has(i);
              const hit = (fila === 0 ? L.pos : B.pos) === i;
              return (
                <g key={i}>
                  <rect x={50 + i * 28} y={15 + fila * 60} width={26} height={26} rx={3} fill={hit ? MANIM.green : vis ? MANIM.orange : MANIM.surface} fillOpacity={hit ? 0.9 : vis ? 0.6 : 0.5} stroke={MANIM.muted} strokeWidth={1} />
                  <text x={63 + i * 28} y={32 + fila * 60} textAnchor="middle" fill={MANIM.ink} fontSize={10}>
                    {v}
                  </text>
                </g>
              );
            })}
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Comparaciones (lineal)">{L.comps}</Stat>
        <Stat color={MANIM.blue} label="Comparaciones (binaria)">{B.comps}</Stat>
        <Stat color={B.pos >= 0 ? MANIM.green : MANIM.red} label="Resultado">{B.pos >= 0 ? `posición ${B.pos}` : "no está"}</Stat>
      </Readout>
      <Note>La búsqueda <b>lineal</b> revisa uno a uno; la <b>binaria</b> mira el elemento central y descarta la mitad, pero exige la lista ordenada. Con 16 elementos la binaria necesita como máximo 5 comparaciones; con un millón, solo 20.</Note>
    </Frame>
  );
}

/* ───────────── 3. Ordenación por burbuja ───────────── */

export function OrdenacionExplorador({ block }: { block: ToolBlock }) {
  const base = [7, 3, 9, 1, 6, 4];
  const inicial = block.params?.n !== undefined && Math.round(num(block.params.n, 0, 0, 1)) === 1 ? [1, 2, 3, 5, 4, 6] : base;
  const pasos = pasosBurbuja(inicial);
  const [i, setI] = useState(0);
  const P = pasos[Math.min(i, pasos.length - 1)]!;
  const max = Math.max(...inicial);
  const ultimo = i >= pasos.length - 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Avanza paso a paso por el método de la burbuja. Se comparan dos vecinos y se intercambian si están mal ordenados."}
      onReset={() => setI(0)}
      controls={
        <div className="flex gap-2">
          <button type="button" className={TOOL_BTN} disabled={i === 0} onClick={() => setI((x) => Math.max(0, x - 1))}>
            Paso anterior
          </button>
          <button type="button" className={TOOL_BTN} disabled={ultimo} onClick={() => setI((x) => Math.min(pasos.length - 1, x + 1))}>
            Paso siguiente
          </button>
        </div>
      }
    >
      <Svg w={520} h={130} testId="ordenacion" maxH={150}>
        {P.v.map((v, k) => {
          const comp = !ultimo && (k === P.j || k === P.j + 1);
          const fijo = ultimo || k >= P.fin;
          return (
            <g key={k}>
              <rect x={60 + k * 65} y={115 - (v / max) * 95} width={50} height={(v / max) * 95} rx={3} fill={fijo ? MANIM.green : comp ? (P.cambia ? MANIM.red : MANIM.yellow) : MANIM.blue} fillOpacity={0.7} />
              <text x={85 + k * 65} y={110} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>
                {v}
              </text>
            </g>
          );
        })}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Paso">{i} de {pasos.length - 1}</Stat>
        <Stat color={ultimo ? MANIM.green : P.cambia ? MANIM.red : MANIM.yellow} label="Situación">{ultimo ? "lista ordenada" : P.cambia ? "se intercambian" : "ya están en orden"}</Stat>
      </Readout>
      <Note>En cada vuelta, el mayor de los elementos que quedan «sube» como una burbuja hasta su sitio (verde). Con n elementos hace del orden de n² comparaciones: es sencillo, pero lento para listas grandes.</Note>
    </Frame>
  );
}

/* ───────────── 4. Tratamiento de datos ───────────── */

const TEMP_MES = [8, 9, 11, 12, 15, 18, 20, 21, 19, 15, 11, 9];
const MESES = ["E", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];

export function DatosTemperaturasExplorador({ block }: { block: ToolBlock }) {
  const init = { u: Math.round(num(block.params?.a, 15, 0, 30)) };
  const [s, setS] = useState(init);
  const r = resumenDatos(TEMP_MES, s.u);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Temperatura media mensual de una ciudad del norte (datos orientativos). Mueve el umbral y mira cuántos meses lo superan."}
      onReset={() => setS(init)}
      controls={<Slider label="Umbral" value={s.u} min={0} max={30} step={1} unit=" °C" color={MANIM.orange} onChange={(u) => setS({ u })} />}
    >
      <Svg w={520} h={150} testId="datos" maxH={170}>
        <line x1={30} y1={130 - (s.u / 30) * 110} x2={500} y2={130 - (s.u / 30) * 110} stroke={MANIM.orange} strokeWidth={1.5} strokeDasharray="5 4" />
        {TEMP_MES.map((t, k) => (
          <g key={k}>
            <rect x={35 + k * 39} y={130 - (t / 30) * 110} width={30} height={(t / 30) * 110} rx={3} fill={t > s.u ? MANIM.red : MANIM.blue} fillOpacity={0.7} />
            <text x={50 + k * 39} y={144} textAnchor="middle" fill={MANIM.muted} fontSize={11}>
              {MESES[k]}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Media anual">{f1(r.media)} °C</Stat>
        <Stat color={MANIM.red} label="Máximo">{r.max} °C</Stat>
        <Stat color={MANIM.green} label="Mínimo">{r.min} °C</Stat>
        <Stat color={MANIM.orange} label={`Meses sobre ${s.u} °C`}>{r.sobre}</Stat>
      </Readout>
      <Note>Tratar datos es <b>recoger</b>, <b>filtrar</b> y <b>resumir</b> (media, máximo, mínimo, recuentos) para poder decidir. En Python se haría con una lista, un bucle y una condición, como en el programa de la lección.</Note>
    </Frame>
  );
}

/* ───────────── 5. Crecimiento de las operaciones ───────────── */

export function ComplejidadExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 1000, 10, 100000)) };
  const [s, setS] = useState(init);
  const filas = [
    { nombre: "Binaria (≈ log₂ n)", v: opsBinaria(s.n), c: MANIM.green },
    { nombre: "Lineal (n)", v: opsLineal(s.n), c: MANIM.blue },
    { nombre: "Burbuja (n²)", v: opsCuadratica(s.n), c: MANIM.red },
  ];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige cuántos datos hay y compara cuántas operaciones necesita cada algoritmo en el peor caso."}
      onReset={() => setS(init)}
      controls={<Slider label="Número de datos" value={s.n} min={10} max={100000} step={10} color={MANIM.yellow} onChange={(n) => setS({ n })} />}
    >
      <Readout>
        {filas.map((f) => (
          <Stat key={f.nombre} color={f.c} label={f.nombre}>{fmtEs(f.v, 0)}</Stat>
        ))}
      </Readout>
      <Note>Lo importante no es el tiempo exacto, sino cómo <b>crece</b> el trabajo al aumentar los datos. Un algoritmo cuadrático con 100 000 datos hace diez mil millones de operaciones; uno logarítmico, solo 17. Por eso elegir un buen algoritmo importa más que un ordenador más rápido.</Note>
    </Frame>
  );
}
