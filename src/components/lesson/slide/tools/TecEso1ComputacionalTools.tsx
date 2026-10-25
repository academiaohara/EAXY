"use client";

import { useEffect, useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;

/* ───────────── 7.1 Ordena los pasos de un algoritmo ───────────── */

export const ALGORITMOS = [
  { n: "Hacer una tostada", pasos: ["Sacar una rebanada de pan", "Meterla en la tostadora", "Bajar la palanca", "Esperar a que salte", "Sacar la tostada", "Untar mantequilla"] },
  { n: "Cruzar la calle", pasos: ["Llegar al paso de peatones", "Pulsar el botón del semáforo", "Esperar a que se ponga verde", "Mirar a ambos lados", "Cruzar caminando"] },
  { n: "Lavarse las manos", pasos: ["Abrir el grifo", "Mojarse las manos", "Echar jabón", "Frotar durante 20 segundos", "Aclarar con agua", "Secarse con una toalla"] },
  { n: "Llamar por teléfono", pasos: ["Desbloquear el teléfono", "Abrir los contactos", "Buscar el nombre", "Pulsar «llamar»", "Esperar respuesta", "Hablar"] },
] as const;

/** Orden inicial desordenado (fijo, para que sea reproducible). */
const MEZCLA = [3, 0, 5, 2, 4, 1];

export const posicionesCorrectas = (orden: number[]) => orden.filter((v, i) => v === i).length;

function ordenInicial(n: number) {
  return MEZCLA.filter((i) => i < n).concat();
}

export function AlgoritmoOrdenaExplorador({ block }: { block: ToolBlock }) {
  const a0 = Math.round(num(block.params?.n, 0, 0, ALGORITMOS.length - 1));
  const init = { a: a0, orden: ordenInicial(ALGORITMOS[a0]!.pasos.length), comprobado: false };
  const [s, setS] = useState(init);
  const alg = ALGORITMOS[s.a]!;
  const bien = posicionesCorrectas(s.orden);
  const mueve = (i: number, d: -1 | 1) =>
    setS((x) => {
      const j = i + d;
      if (j < 0 || j >= x.orden.length) return x;
      const o = [...x.orden];
      [o[i], o[j]] = [o[j]!, o[i]!];
      return { ...x, orden: o, comprobado: false };
    });
  return (
    <Frame
      stacked
      hint={block.hint ?? "Reordena los pasos con las flechas hasta que el algoritmo funcione. Un orden incorrecto da un resultado incorrecto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Algoritmo" items={ALGORITMOS.map((x, i) => ({ value: i, label: x.n }))} value={s.a} onChange={(a) => setS({ a, orden: ordenInicial(ALGORITMOS[a]!.pasos.length), comprobado: false })} />
          <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, comprobado: true }))}>
            Comprobar el orden
          </button>
        </>
      }
    >
      <ol className="flex flex-col gap-2" data-testid="algoritmo-pasos">
        {s.orden.map((p, i) => (
          <li key={p} className="flex items-center gap-2 rounded-lg border px-3 py-2 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: s.comprobado ? (p === i ? MANIM.green : MANIM.red) : "var(--stage-border,#3d4f66)" }}>
            <span className="w-6 text-center font-bold text-[color:var(--stage-muted,#b8c2d0)]">{i + 1}</span>
            <span className="flex-1">{alg.pasos[p]}</span>
            <button type="button" aria-label={`Subir «${alg.pasos[p]}»`} className={`${TOOL_BTN} !px-2 !py-1`} disabled={i === 0} onClick={() => mueve(i, -1)}>
              ↑
            </button>
            <button type="button" aria-label={`Bajar «${alg.pasos[p]}»`} className={`${TOOL_BTN} !px-2 !py-1`} disabled={i === s.orden.length - 1} onClick={() => mueve(i, 1)}>
              ↓
            </button>
          </li>
        ))}
      </ol>
      <Readout>
        <Stat color={MANIM.yellow} label="Pasos en su sitio">
          {s.comprobado ? `${bien} de ${s.orden.length}` : "pulsa «Comprobar»"}
        </Stat>
        <Stat color={s.comprobado && bien === s.orden.length ? MANIM.green : MANIM.muted} label="Algoritmo">
          {s.comprobado ? (bien === s.orden.length ? "Correcto: funciona" : "Incorrecto: revisa el orden") : "—"}
        </Stat>
      </Readout>
      <Note>Un algoritmo debe ser ordenado, preciso y terminar. Si cambias el orden de dos pasos, el resultado puede ser otro (¡o imposible!).</Note>
    </Frame>
  );
}

/* ───────────── 7.2 Programar un robot con bloques ───────────── */

export type Instr = { k: "F" | "L" | "R" } | { k: "rep"; n: number; cuerpo: Instr[] } | { k: "if"; si: Instr[]; no: Instr[] };
type Ruta = (number | "cuerpo" | "si" | "no")[];

export type Nivel = { n: string; w: number; h: number; start: { x: number; y: number; d: number }; meta: { x: number; y: number }; muros: [number, number][]; bloques: ("F" | "L" | "R" | "rep" | "if")[]; texto: string; par: number };

export const NIVELES: Nivel[] = [
  { n: "1. Secuencia", w: 5, h: 4, start: { x: 0, y: 3, d: 0 }, meta: { x: 3, y: 1 }, muros: [], bloques: ["F", "L", "R"], texto: "Lleva el robot hasta la meta con avanzar y girar.", par: 6 },
  { n: "2. Repetir", w: 5, h: 5, start: { x: 0, y: 4, d: 0 }, meta: { x: 4, y: 0 }, muros: [], bloques: ["F", "L", "R", "rep"], texto: "Sube la escalera. Fíjate en el patrón y usa «repetir».", par: 5 },
  { n: "3. Condición", w: 5, h: 5, start: { x: 0, y: 0, d: 0 }, meta: { x: 4, y: 4 }, muros: [], bloques: ["F", "L", "R", "rep", "if"], texto: "Haz que el robot llegue a la esquina usando «si hay pared delante».", par: 4 },
  { n: "4. Laberinto", w: 6, h: 5, start: { x: 0, y: 4, d: 0 }, meta: { x: 5, y: 0 }, muros: [[2, 2], [2, 3], [2, 4], [4, 0], [4, 1], [4, 2]], bloques: ["F", "L", "R", "rep", "if"], texto: "Esquiva los muros hasta llegar a la meta.", par: 16 },
];

const DX = [1, 0, -1, 0];
const DY = [0, 1, 0, -1];

export type Estado = { x: number; y: number; d: number };

const hayPared = (n: Nivel, e: Estado) => {
  const x = e.x + DX[e.d]!;
  const y = e.y + DY[e.d]!;
  return x < 0 || y < 0 || x >= n.w || y >= n.h || n.muros.some(([a, b]) => a === x && b === y);
};

/** Ejecuta el programa y devuelve todos los estados visitados. */
export function simula(prog: Instr[], n: Nivel, limite = 300): { trace: Estado[]; exito: boolean; choque: boolean; limite: boolean } {
  let e: Estado = { ...n.start };
  const trace: Estado[] = [e];
  let choque = false;
  let exito = false;
  let pasos = 0;
  let cortado = false;
  const ejecuta = (lista: Instr[]): boolean => {
    for (const ins of lista) {
      if (exito || choque || cortado) return false;
      if (ins.k === "F") {
        pasos += 1;
        if (hayPared(n, e)) {
          choque = true;
          return false;
        }
        e = { x: e.x + DX[e.d]!, y: e.y + DY[e.d]!, d: e.d };
        trace.push(e);
        if (e.x === n.meta.x && e.y === n.meta.y) exito = true;
      } else if (ins.k === "L" || ins.k === "R") {
        pasos += 1;
        e = { ...e, d: (e.d + (ins.k === "L" ? 3 : 1)) % 4 };
        trace.push(e);
      } else if (ins.k === "rep") {
        for (let i = 0; i < ins.n; i += 1) {
          if (!ejecuta(ins.cuerpo)) return false;
        }
      } else if (ins.k === "if") {
        if (!ejecuta(hayPared(n, e) ? ins.si : ins.no)) return false;
      }
      if (pasos > limite) {
        cortado = true;
        return false;
      }
    }
    return true;
  };
  ejecuta(prog);
  return { trace, exito, choque, limite: cortado };
}

export const cuentaBloques = (prog: Instr[]): number => prog.reduce((a, i) => a + 1 + (i.k === "rep" ? cuentaBloques(i.cuerpo) : i.k === "if" ? cuentaBloques(i.si) + cuentaBloques(i.no) : 0), 0);

function modifica(prog: Instr[], ruta: Ruta, f: (l: Instr[]) => Instr[]): Instr[] {
  if (ruta.length === 0) return f(prog);
  const [i, campo, ...resto] = ruta as [number, "cuerpo" | "si" | "no", ...Ruta];
  return prog.map((ins, k) => (k === i ? ({ ...ins, [campo]: modifica((ins as unknown as Record<string, Instr[]>)[campo]!, resto, f) } as Instr) : ins));
}

const NOMBRE_BLOQUE: Record<string, string> = { F: "Avanzar", L: "Girar a la izquierda", R: "Girar a la derecha", rep: "Repetir 2 veces", if: "Si hay pared delante" };

function BloqueFila({ ins, ruta, idx, objetivo, onObjetivo, onQuita, onN }: { ins: Instr; ruta: Ruta; idx: number; objetivo: string; onObjetivo: (r: Ruta) => void; onQuita: (r: Ruta, i: number) => void; onN: (r: Ruta, i: number, n: number) => void }) {
  const col = ins.k === "F" ? MANIM.blue : ins.k === "rep" ? MANIM.orange : ins.k === "if" ? MANIM.purple : MANIM.green;
  const quita = (
    <button type="button" aria-label={`Quitar «${ins.k === "F" ? "Avanzar" : ins.k === "L" ? "Girar a la izquierda" : ins.k === "R" ? "Girar a la derecha" : ins.k === "rep" ? "Repetir" : "Si hay pared"}»`} className={`${TOOL_BTN} !px-2 !py-0.5`} onClick={() => onQuita(ruta, idx)}>
      ✕
    </button>
  );
  const cuerpo = (campo: "cuerpo" | "si" | "no", titulo: string) => {
    const r: Ruta = [...ruta, idx, campo];
    const sel = JSON.stringify(r) === objetivo;
    const items = (ins as unknown as Record<string, Instr[]>)[campo]!;
    return (
      <div className="ml-3 mt-1 flex flex-col gap-1 border-l-2 pl-2" style={{ borderColor: col }}>
        <button type="button" className={`${TOOL_BTN} !py-0.5 text-left ${sel ? "bg-white/15" : ""}`} aria-pressed={sel} onClick={() => onObjetivo(r)}>
          ＋ {titulo}
        </button>
        {items.map((q, j) => (
          <BloqueFila key={j} ins={q} ruta={r} idx={j} objetivo={objetivo} onObjetivo={onObjetivo} onQuita={onQuita} onN={onN} />
        ))}
      </div>
    );
  };
  return (
    <div className="rounded-md border px-2 py-1.5 text-sm text-[color:var(--stage-ink,#fff)]" style={{ borderColor: col }}>
      <div className="flex items-center gap-2">
        <span className="flex-1 font-semibold" style={{ color: col }}>
          {ins.k === "rep" ? (
            <span className="inline-flex items-center gap-2">
              Repetir
              <button type="button" aria-label="Menos repeticiones" className={`${TOOL_BTN} !px-2 !py-0`} onClick={() => onN(ruta, idx, -1)}>
                −
              </button>
              <span className="tabular-nums">{ins.n}</span>
              <button type="button" aria-label="Más repeticiones" className={`${TOOL_BTN} !px-2 !py-0`} onClick={() => onN(ruta, idx, 1)}>
                +
              </button>
              veces
            </span>
          ) : ins.k === "if" ? (
            "Si hay pared delante"
          ) : (
            NOMBRE_BLOQUE[ins.k]
          )}
        </span>
        {quita}
      </div>
      {ins.k === "rep" ? cuerpo("cuerpo", "añadir dentro del bucle") : null}
      {ins.k === "if" ? (
        <>
          {cuerpo("si", "entonces: añadir aquí")}
          {cuerpo("no", "si no: añadir aquí")}
        </>
      ) : null}
    </div>
  );
}

export function ProgramaBloquesExplorador({ block }: { block: ToolBlock }) {
  const nv0 = Math.round(num(block.params?.n, 0, 0, NIVELES.length - 1));
  const init = { nv: nv0, prog: [] as Instr[], objetivo: "[]", paso: 0, anima: false };
  const [s, setS] = useState(init);
  const nivel = NIVELES[s.nv]!;
  const res = simula(s.prog, nivel);
  const fin = res.trace.length - 1;
  const e = res.trace[Math.min(s.paso, fin)]!;
  const bloquesUsados = cuentaBloques(s.prog);
  useEffect(() => {
    if (!s.anima) return;
    if (s.paso >= fin) {
      setS((x) => ({ ...x, anima: false }));
      return;
    }
    const t = setTimeout(() => setS((x) => ({ ...x, paso: x.paso + 1 })), 350);
    return () => clearTimeout(t);
  }, [s.anima, s.paso, fin]);
  const objetivoRuta: Ruta = JSON.parse(s.objetivo) as Ruta;
  const anade = (ins: Instr) => setS((x) => ({ ...x, prog: modifica(x.prog, JSON.parse(x.objetivo) as Ruta, (l) => [...l, ins]), paso: 0, anima: false }));
  const quita = (ruta: Ruta, i: number) => setS((x) => ({ ...x, prog: modifica(x.prog, ruta, (l) => l.filter((_, k) => k !== i)), objetivo: "[]", paso: 0, anima: false }));
  const cambiaN = (ruta: Ruta, i: number, d: number) =>
    setS((x) => ({ ...x, prog: modifica(x.prog, ruta, (l) => l.map((q, k) => (k === i && q.k === "rep" ? { ...q, n: clamp(q.n + d, 1, 12) } : q))), paso: 0, anima: false }));
  const acabado = s.paso >= fin;
  const celda = 52;
  const ox = 10;
  const oy = 10;
  const W = nivel.w * celda + 20;
  const H = nivel.h * celda + 20;
  const flecha = (x: number, y: number, d: number) => {
    const cx = ox + x * celda + celda / 2;
    const cy = oy + y * celda + celda / 2;
    const a = (d * Math.PI) / 2;
    const p = (r: number, ang: number) => `${cx + Math.cos(a + ang) * r},${cy + Math.sin(a + ang) * r}`;
    return <polygon points={`${p(18, 0)} ${p(14, 2.5)} ${p(14, -2.5)}`} fill={MANIM.yellow} stroke={MANIM.ink} strokeWidth={2} className="anim-t" />;
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Construye el programa con bloques, ejecútalo y mira el recorrido. Si choca o no llega a la meta, corrige el programa (¡depurar!)."}
      onReset={() => setS({ ...init, nv: s.nv })}
      controls={
        <>
          <Choice label="Reto" items={NIVELES.map((x, i) => ({ value: i, label: x.n }))} value={s.nv} onChange={(nv) => setS({ ...init, nv })} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Bloques disponibles">
            {nivel.bloques.map((b) => (
              <button key={b} type="button" className={TOOL_BTN} onClick={() => anade(b === "rep" ? { k: "rep", n: 2, cuerpo: [] } : b === "if" ? { k: "if", si: [], no: [] } : { k: b })}>
                {NOMBRE_BLOQUE[b]}
              </button>
            ))}
          </div>
        </>
      }
    >
      <p className="text-[color:var(--stage-ink,#fff)]">{nivel.texto}</p>
      <div className="grid gap-4 sm:grid-cols-[auto_minmax(0,1fr)]">
        <svg viewBox={`0 0 ${W} ${H}`} width={W} height={H} className="mx-auto" aria-hidden focusable="false" data-testid="robot-mapa">
          {Array.from({ length: nivel.w * nivel.h }, (_, k) => {
            const x = k % nivel.w;
            const y = Math.floor(k / nivel.w);
            const muro = nivel.muros.some(([a, b]) => a === x && b === y);
            const meta = nivel.meta.x === x && nivel.meta.y === y;
            return <rect key={k} x={ox + x * celda} y={oy + y * celda} width={celda - 2} height={celda - 2} rx={6} fill={muro ? MANIM.muted : meta ? MANIM.green : MANIM.panel} fillOpacity={muro ? 0.7 : meta ? 0.4 : 1} stroke={meta ? MANIM.green : MANIM.grid} strokeWidth={meta ? 3 : 1} />;
          })}
          <polyline points={res.trace.slice(0, Math.min(s.paso, fin) + 1).map((t) => `${ox + t.x * celda + celda / 2},${oy + t.y * celda + celda / 2}`).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={4} strokeLinejoin="round" opacity={0.6} />
          {flecha(e.x, e.y, e.d)}
        </svg>
        <div className="flex min-w-0 flex-col gap-2" data-testid="programa">
          <button type="button" className={`${TOOL_BTN} text-left ${s.objetivo === "[]" ? "bg-white/15" : ""}`} aria-pressed={s.objetivo === "[]"} onClick={() => setS((x) => ({ ...x, objetivo: "[]" }))}>
            ＋ añadir al programa principal
          </button>
          {s.prog.length === 0 ? <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">El programa está vacío.</p> : null}
          {s.prog.map((ins, i) => (
            <BloqueFila key={i} ins={ins} ruta={[]} idx={i} objetivo={s.objetivo} onObjetivo={(r) => setS((x) => ({ ...x, objetivo: JSON.stringify(r) }))} onQuita={quita} onN={cambiaN} />
          ))}
          <p className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">Los bloques nuevos se añaden en: {objetivoRuta.length === 0 ? "el programa principal" : "el bloque marcado"}.</p>
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, paso: 0, anima: fin > 0 }))}>
          Ejecutar
        </button>
        <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, paso: Math.min(x.paso + 1, fin), anima: false }))}>
          Un paso
        </button>
        <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, paso: fin, anima: false }))}>
          Ver resultado
        </button>
        <button type="button" className={TOOL_BTN} onClick={() => setS((x) => ({ ...x, paso: 0, anima: false }))}>
          Robot al inicio
        </button>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Bloques usados">
          {bloquesUsados} (programa de referencia: {nivel.par})
        </Stat>
        <Stat color={acabado ? (res.exito ? MANIM.green : MANIM.red) : MANIM.muted} label="Resultado">
          {!acabado ? "Ejecutando…" : res.exito ? "¡Meta alcanzada!" : res.choque ? "El robot ha chocado con un muro" : res.limite ? "El programa no termina" : s.prog.length === 0 ? "Sin programa" : "No llega a la meta"}
        </Stat>
      </Readout>
      <Note>Un programa es una secuencia de instrucciones que se ejecutan en orden. «Repetir» evita escribir lo mismo muchas veces y «Si…» permite que el robot decida según lo que encuentra.</Note>
    </Frame>
  );
}

/* ───────────── 7.3 Recorrer un diagrama de flujo ───────────── */

type Nodo = { id: string; t: "ini" | "fin" | "proc" | "dec" | "es"; txt: string; x: number; y: number; sig?: string; si?: string; no?: string };
type Flujo = { n: string; nodos: Nodo[]; sal: string[] };

export const FLUJOS: Flujo[] = [
  {
    n: "¿Llueve?",
    sal: [],
    nodos: [
      { id: "a", t: "ini", txt: "Inicio", x: 210, y: 25, sig: "b" },
      { id: "b", t: "dec", txt: "¿Llueve?", x: 210, y: 105, si: "c", no: "d" },
      { id: "c", t: "proc", txt: "Coger el paraguas", x: 90, y: 195, sig: "e" },
      { id: "d", t: "proc", txt: "Ponerse gafas de sol", x: 330, y: 195, sig: "e" },
      { id: "e", t: "proc", txt: "Salir a la calle", x: 210, y: 270, sig: "f" },
      { id: "f", t: "fin", txt: "Fin", x: 210, y: 330 },
    ],
  },
  {
    n: "Par o impar",
    sal: [],
    nodos: [
      { id: "a", t: "ini", txt: "Inicio", x: 210, y: 25, sig: "b" },
      { id: "b", t: "es", txt: "Leer un número n", x: 210, y: 90, sig: "c" },
      { id: "c", t: "dec", txt: "¿n es múltiplo de 2?", x: 210, y: 175, si: "d", no: "e" },
      { id: "d", t: "es", txt: "Escribir «es par»", x: 90, y: 265, sig: "f" },
      { id: "e", t: "es", txt: "Escribir «es impar»", x: 330, y: 265, sig: "f" },
      { id: "f", t: "fin", txt: "Fin", x: 210, y: 335 },
    ],
  },
  {
    n: "Contar hasta 3",
    sal: [],
    nodos: [
      { id: "a", t: "ini", txt: "Inicio", x: 210, y: 25, sig: "b" },
      { id: "b", t: "proc", txt: "n = 1", x: 210, y: 85, sig: "c" },
      { id: "c", t: "dec", txt: "¿n ≤ 3?", x: 210, y: 170, si: "d", no: "f" },
      { id: "d", t: "es", txt: "Escribir n", x: 210, y: 250, sig: "e" },
      { id: "e", t: "proc", txt: "n = n + 1", x: 210, y: 315, sig: "c" },
      { id: "f", t: "fin", txt: "Fin", x: 350, y: 250 },
    ],
  },
];

export function FlujoSencilloExplorador({ block }: { block: ToolBlock }) {
  const f0 = Math.round(num(block.params?.n, 0, 0, FLUJOS.length - 1));
  const init = { f: f0, actual: "a", camino: ["a"] as string[], log: [] as string[], n: 1, entrada: 6 };
  const [s, setS] = useState(init);
  const fl = FLUJOS[s.f]!;
  const nodo = (id: string) => fl.nodos.find((q) => q.id === id)!;
  const cur = nodo(s.actual);
  const avanza = (a: string, extra?: Partial<typeof s>) => setS((x) => ({ ...x, actual: a, camino: [...x.camino, a], ...extra }));
  const paso = (opcion?: "si" | "no") => {
    if (cur.t === "fin") return;
    if (cur.t === "dec") {
      const o = opcion ?? (s.f === 1 ? (s.entrada % 2 === 0 ? "si" : "no") : s.f === 2 ? (s.n <= 3 ? "si" : "no") : "si");
      avanza(o === "si" ? cur.si! : cur.no!);
      return;
    }
    let log = s.log;
    let n = s.n;
    if (s.f === 2 && cur.id === "b") n = 1;
    if (s.f === 2 && cur.id === "d") log = [...log, String(n)];
    if (s.f === 2 && cur.id === "e") n += 1;
    if (s.f === 1 && cur.id === "d") log = [...log, "es par"];
    if (s.f === 1 && cur.id === "e") log = [...log, "es impar"];
    avanza(cur.sig!, { log, n });
  };
  const forma = (q: Nodo, activo: boolean) => {
    const c = activo ? MANIM.yellow : q.t === "dec" ? MANIM.purple : q.t === "es" ? MANIM.green : q.t === "proc" ? MANIM.blue : MANIM.orange;
    const t = (
      <text x={q.x} y={q.y + 5} fill={MANIM.ink} fontSize={13} textAnchor="middle" fontWeight={activo ? 700 : 500}>
        {q.txt}
      </text>
    );
    if (q.t === "ini" || q.t === "fin") return <g key={q.id}><rect x={q.x - 50} y={q.y - 17} width={100} height={34} rx={17} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={activo ? 4 : 2.5} />{t}</g>;
    if (q.t === "proc") return <g key={q.id}><rect x={q.x - 70} y={q.y - 20} width={140} height={40} rx={4} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={activo ? 4 : 2.5} />{t}</g>;
    if (q.t === "es") return <g key={q.id}><polygon points={`${q.x - 60},${q.y + 20} ${q.x - 80},${q.y - 20} ${q.x + 80},${q.y - 20} ${q.x + 60},${q.y + 20}`} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={activo ? 4 : 2.5} />{t}</g>;
    return <g key={q.id}><polygon points={`${q.x},${q.y - 36} ${q.x + 96},${q.y} ${q.x},${q.y + 36} ${q.x - 96},${q.y}`} fill={c} fillOpacity={0.25} stroke={c} strokeWidth={activo ? 4 : 2.5} />{t}</g>;
  };
  const aristas: { a: Nodo; b: Nodo; etq?: string }[] = [];
  for (const q of fl.nodos) {
    if (q.sig) aristas.push({ a: q, b: nodo(q.sig) });
    if (q.si) aristas.push({ a: q, b: nodo(q.si), etq: "Sí" });
    if (q.no) aristas.push({ a: q, b: nodo(q.no), etq: "No" });
  }
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa «Siguiente paso» para recorrer el diagrama. En un rombo (decisión) el camino depende de la respuesta."}
      onReset={() => setS({ ...init, f: s.f })}
      controls={
        <>
          <Choice label="Diagrama" items={FLUJOS.map((x, i) => ({ value: i, label: x.n }))} value={s.f} onChange={(f) => setS({ ...init, f })} />
          {s.f === 1 ? <Slider label="Número que se lee" value={s.entrada} min={1} max={20} step={1} color={MANIM.yellow} onChange={(entrada) => setS({ ...init, f: 1, entrada })} /> : null}
        </>
      }
    >
      <Svg w={420} h={360} testId="flujo" maxH={380}>
        {aristas.map((ar, i) => {
          const abajo = ar.etq && ar.b.x === ar.a.x;
          const lateral = ar.a.t === "dec" && ar.etq && !abajo;
          const volver = ar.b.y < ar.a.y;
          const x1 = lateral ? (ar.b.x < ar.a.x ? ar.a.x - 96 : ar.a.x + 96) : ar.a.x;
          const y1 = lateral ? ar.a.y : ar.a.y + (ar.a.t === "dec" ? 36 : 20);
          const x2 = ar.b.x;
          const y2 = ar.b.y - (ar.b.t === "dec" ? 36 : 20);
          const d = volver ? `M ${ar.a.x - 70} ${ar.a.y} L 30 ${ar.a.y} L 30 ${ar.b.y} L ${ar.b.x - 96} ${ar.b.y}` : lateral ? `M ${x1} ${y1} L ${x2} ${y1} L ${x2} ${y2}` : `M ${x1} ${y1} L ${x2} ${y2}`;
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={MANIM.muted} strokeWidth={2.5} markerEnd="url(#fl)" />
              {ar.etq ? (
                <text x={abajo ? x1 + 16 : x1 + (ar.b.x < ar.a.x ? -18 : 18)} y={abajo ? y1 + 16 : y1 - 8} fill={MANIM.yellow} fontSize={13} textAnchor="middle" fontWeight={700}>
                  {ar.etq}
                </text>
              ) : null}
            </g>
          );
        })}
        <defs>
          <marker id="fl" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="6" markerHeight="6" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill={MANIM.muted} />
          </marker>
        </defs>
        {fl.nodos.map((q) => forma(q, q.id === s.actual))}
      </Svg>
      <div className="flex flex-wrap gap-2">
        {cur.t === "dec" && s.f === 0 ? (
          <>
            <button type="button" className={TOOL_BTN} onClick={() => paso("si")}>
              Sí, llueve
            </button>
            <button type="button" className={TOOL_BTN} onClick={() => paso("no")}>
              No llueve
            </button>
          </>
        ) : (
          <button type="button" className={TOOL_BTN} disabled={cur.t === "fin"} onClick={() => paso()}>
            Siguiente paso
          </button>
        )}
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Paso actual">
          {cur.txt}
        </Stat>
        <Stat color={MANIM.blue} label="Pasos dados">
          {s.camino.length - 1}
        </Stat>
        {s.f === 2 ? (
          <Stat color={MANIM.purple} label="Variable n">
            {s.n}
          </Stat>
        ) : null}
        <Stat color={MANIM.green} label="Salida">
          {s.log.length ? s.log.join(" · ") : "—"}
        </Stat>
      </Readout>
      <Note>{cur.t === "dec" ? "Un rombo hace una pregunta con respuesta Sí o No y el camino se bifurca." : cur.t === "fin" ? "El algoritmo ha terminado." : "Cada símbolo tiene su forma: óvalo (inicio/fin), rectángulo (acción), paralelogramo (entrada/salida) y rombo (decisión)."}</Note>
    </Frame>
  );
}

/* ───────────── 7.4 Variables como cajas ───────────── */

type Linea = { c: string; f: (v: Record<string, number | string | boolean>) => Record<string, number | string | boolean> };
export const PROGRAMAS_VAR: { n: string; l: Linea[] }[] = [
  {
    n: "Puntos de un juego",
    l: [
      { c: "puntos = 0", f: (v) => ({ ...v, puntos: 0 }) },
      { c: "puntos = puntos + 10", f: (v) => ({ ...v, puntos: Number(v.puntos) + 10 }) },
      { c: "puntos = puntos + 5", f: (v) => ({ ...v, puntos: Number(v.puntos) + 5 }) },
      { c: "puntos = puntos * 2", f: (v) => ({ ...v, puntos: Number(v.puntos) * 2 }) },
    ],
  },
  {
    n: "Intercambiar dos valores",
    l: [
      { c: "a = 3", f: (v) => ({ ...v, a: 3 }) },
      { c: "b = 8", f: (v) => ({ ...v, b: 8 }) },
      { c: "aux = a", f: (v) => ({ ...v, aux: v.a! }) },
      { c: "a = b", f: (v) => ({ ...v, a: v.b! }) },
      { c: "b = aux", f: (v) => ({ ...v, b: v.aux! }) },
    ],
  },
  {
    n: "Datos de distintos tipos",
    l: [
      { c: "nombre = «Ana»", f: (v) => ({ ...v, nombre: "Ana" }) },
      { c: "edad = 12", f: (v) => ({ ...v, edad: 12 }) },
      { c: "es_alumna = verdadero", f: (v) => ({ ...v, es_alumna: true }) },
      { c: "edad = edad + 1", f: (v) => ({ ...v, edad: Number(v.edad) + 1 }) },
    ],
  },
];

export function VariablesCajasExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PROGRAMAS_VAR.length - 1)), i: 0 };
  const [s, setS] = useState(init);
  const prog = PROGRAMAS_VAR[s.p]!;
  let vars: Record<string, number | string | boolean> = {};
  for (let k = 0; k < s.i; k += 1) vars = prog.l[k]!.f(vars);
  const tipo = (x: number | string | boolean) => (typeof x === "number" ? "número" : typeof x === "string" ? "texto" : "lógico");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ejecuta el programa línea a línea y observa cómo cambia el contenido de cada caja (variable). Predice el valor antes de pulsar."}
      onReset={() => setS({ ...init, p: s.p })}
      controls={
        <>
          <Choice label="Programa" items={PROGRAMAS_VAR.map((x, i) => ({ value: i, label: x.n }))} value={s.p} onChange={(p) => setS({ p, i: 0 })} />
          <button type="button" className={TOOL_BTN} disabled={s.i >= prog.l.length} onClick={() => setS((x) => ({ ...x, i: x.i + 1 }))}>
            Ejecutar la siguiente línea
          </button>
        </>
      }
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <ol className="flex flex-col gap-1 font-mono text-sm" data-testid="var-codigo">
          {prog.l.map((q, k) => (
            <li key={k} className="rounded px-2 py-1 text-[color:var(--stage-ink,#fff)]" style={{ background: k === s.i - 1 ? "rgb(255 216 102 / 0.2)" : k < s.i ? "rgb(255 255 255 / 0.05)" : "transparent", opacity: k < s.i ? 1 : 0.55 }}>
              {k + 1}. {q.c}
            </li>
          ))}
        </ol>
        <div className="flex flex-wrap content-start gap-3" data-testid="var-cajas">
          {Object.keys(vars).length === 0 ? <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">Aún no hay ninguna variable.</p> : null}
          {Object.entries(vars).map(([k, v]) => (
            <div key={k} className="flex min-w-24 flex-col items-center rounded-lg border-2 px-3 py-2" style={{ borderColor: MANIM.blue }}>
              <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">{k}</span>
              <span className="text-xl font-bold tabular-nums" style={{ color: MANIM.yellow }}>
                {typeof v === "boolean" ? (v ? "verdadero" : "falso") : String(v)}
              </span>
              <span className="text-xs text-[color:var(--stage-muted,#b8c2d0)]">{tipo(v)}</span>
            </div>
          ))}
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Líneas ejecutadas">
          {s.i} de {prog.l.length}
        </Stat>
      </Readout>
      <Note>Una variable es una caja con nombre que guarda un dato. Al asignar un valor nuevo, el anterior se pierde: «puntos = puntos + 5» lee la caja, suma 5 y guarda el resultado en la misma caja.</Note>
    </Frame>
  );
}

/* ───────────── 7.5 Condiciones: elige la rama ───────────── */

export function ramaClima(llueve: boolean, temp: number): { rama: 0 | 1 | 2; accion: string } {
  if (llueve) return { rama: 0, accion: "Coger el paraguas" };
  if (temp > 25) return { rama: 1, accion: "Ponerse camiseta" };
  return { rama: 2, accion: "Ponerse chaqueta" };
}

export function CondicionesExplorador({ block }: { block: ToolBlock }) {
  const init = { llueve: false, temp: Math.round(num(block.params?.a, 20, -5, 40)) };
  const [s, setS] = useState(init);
  const r = ramaClima(s.llueve, s.temp);
  const linea = (i: number, txt: string) => (
    <li key={i} className="rounded px-2 py-1 font-mono text-sm text-[color:var(--stage-ink,#fff)]" style={{ background: r.rama === i ? "rgb(131 193 103 / 0.25)" : "transparent", opacity: r.rama === i ? 1 : 0.55 }}>
      {txt}
    </li>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el tiempo y la temperatura: el programa solo ejecuta la primera condición que se cumple."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="¿Llueve?" items={[{ value: 0, label: "No" }, { value: 1, label: "Sí" }]} value={s.llueve ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, llueve: v === 1 }))} />
          <Slider label="Temperatura" value={s.temp} min={-5} max={40} step={1} unit=" °C" color={MANIM.orange} onChange={(temp) => setS((x) => ({ ...x, temp }))} />
        </>
      }
    >
      <ul className="flex flex-col gap-1" data-testid="cond-codigo">
        {linea(0, "si llueve → coger el paraguas")}
        {linea(1, "si no, si temperatura > 25 → ponerse camiseta")}
        {linea(2, "si no → ponerse chaqueta")}
      </ul>
      <Readout>
        <Stat color={MANIM.green} label="El programa decide">
          {r.accion}
        </Stat>
        <Stat color={MANIM.yellow} label="Condición que se cumple">
          {r.rama === 0 ? "llueve" : r.rama === 1 ? "temperatura > 25" : "ninguna de las anteriores"}
        </Stat>
      </Readout>
      <Note>Las condiciones se evalúan en orden. En cuanto una es verdadera se ejecuta su acción y las demás se ignoran: aunque haga calor, si llueve, coge el paraguas.</Note>
    </Frame>
  );
}

/* ───────────── 7.6 Depurar: encuentra el error ───────────── */

export const PROGRAMAS_ERROR = [
  { n: "Dibujar un cuadrado", obj: "El robot debe dibujar un cuadrado de lado 4.", l: ["repetir 4 veces:", "   avanzar 4", "girar a la izquierda 45°"], err: 2, why: "El giro de un cuadrado es de 90°, no de 45°; además tiene que estar dentro del bucle (con la sangría)." },
  { n: "Contar hasta 5", obj: "Debe escribir 1, 2, 3, 4, 5.", l: ["n = 1", "mientras n < 5:", "   escribir n", "   n = n + 1"], err: 1, why: "Con «n < 5» se detiene al llegar a 5 sin escribirlo. La condición correcta es «n ≤ 5»." },
  { n: "Hacer un bocadillo", obj: "Un bocadillo de queso listo para comer.", l: ["coger dos rebanadas", "poner las dos rebanadas juntas", "poner el queso", "comer"], err: 1, why: "El queso se pone antes de juntar las rebanadas; el orden de las instrucciones importa." },
  { n: "Semáforo", obj: "Si el semáforo está en rojo, esperar; si no, cruzar.", l: ["si semáforo = rojo:", "   cruzar", "si no:", "   esperar"], err: 1, why: "Las acciones están cambiadas: en rojo hay que esperar y con otro color, cruzar." },
] as const;

export function DepuraProgramaExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PROGRAMAS_ERROR.length - 1)), sel: -1 };
  const [s, setS] = useState(init);
  const pr = PROGRAMAS_ERROR[s.p]!;
  const acierto = s.sel === pr.err;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Lee el objetivo del programa y pulsa la línea que contiene el error."}
      onReset={() => setS(init)}
      controls={<Choice label="Programa con un error" items={PROGRAMAS_ERROR.map((x, i) => ({ value: i, label: x.n }))} value={s.p} onChange={(p) => setS({ p, sel: -1 })} />}
    >
      <p className="text-[color:var(--stage-ink,#fff)]">
        <strong>Objetivo:</strong> {pr.obj}
      </p>
      <div className="flex flex-col gap-1 font-mono text-sm" data-testid="depura-lineas" role="group" aria-label="Líneas del programa">
        {pr.l.map((q, k) => (
          <button key={k} type="button" aria-pressed={s.sel === k} className={`${TOOL_BTN} !text-left whitespace-pre`} style={{ borderColor: s.sel === k ? (acierto ? MANIM.green : MANIM.red) : undefined }} onClick={() => setS((x) => ({ ...x, sel: k }))}>
            {k + 1}. {q}
          </button>
        ))}
      </div>
      <Readout>
        <Stat color={s.sel < 0 ? MANIM.muted : acierto ? MANIM.green : MANIM.red} label="Resultado">
          {s.sel < 0 ? "Elige una línea" : acierto ? "¡Has encontrado el error!" : "Esa línea está bien; sigue buscando"}
        </Stat>
      </Readout>
      {acierto ? <Note>{pr.why}</Note> : <Note>Depurar es encontrar y corregir errores. Se hace probando el programa, siguiéndolo paso a paso y comparando lo que hace con lo que debería hacer.</Note>}
    </Frame>
  );
}
