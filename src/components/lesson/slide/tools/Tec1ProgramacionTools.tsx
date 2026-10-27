"use client";

import { useMemo, useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";
import { callPython, pyRepr, runPython, type PyVal } from "@/lib/lesson/mini-python";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);

function HBar({ label, value, max, color, text }: { label: string; value: number; max: number; color: string; text?: string }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-36 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full rounded" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="w-24 shrink-0 text-right font-bold tabular-nums">{text ?? f1(value)}</span>
    </div>
  );
}

/* ───────────── 5.1 Componentes de un ordenador y recorrido de un dato ───────────── */

type Cat = "Entrada" | "Procesamiento" | "Almacenamiento" | "Salida" | "Soporte";
const CATC: Record<Cat, string> = { Entrada: MANIM.green, Procesamiento: MANIM.red, Almacenamiento: MANIM.blue, Salida: MANIM.purple, Soporte: MANIM.orange };
const PIEZAS: { n: string; cat: Cat; fn: string; con: string }[] = [
  { n: "Procesador (CPU)", cat: "Procesamiento", fn: "Ejecuta las instrucciones de los programas. Se caracteriza por su número de núcleos y su frecuencia (GHz).", con: "Se conecta a la memoria RAM por el bus de memoria y al resto por la placa base." },
  { n: "Memoria RAM", cat: "Almacenamiento", fn: "Memoria rápida y volátil: guarda los programas y datos que se están usando. Se borra al apagar.", con: "Se comunica directamente con la CPU a través del bus de memoria." },
  { n: "Disco SSD / HDD", cat: "Almacenamiento", fn: "Almacenamiento permanente: conserva los archivos sin energía. El SSD (memoria flash) es mucho más rápido que el HDD (platos giratorios).", con: "Se conecta a la placa base por SATA o NVMe." },
  { n: "Placa base", cat: "Soporte", fn: "Circuito que interconecta todos los componentes mediante buses y les reparte energía y datos.", con: "Contiene los zócalos de CPU y RAM y los conectores de disco, USB y tarjetas." },
  { n: "Tarjeta gráfica (GPU)", cat: "Procesamiento", fn: "Procesa gráficos y cálculos en paralelo con miles de unidades sencillas. Genera la imagen que ve el usuario.", con: "Va en una ranura PCIe y se conecta al monitor por HDMI o DisplayPort." },
  { n: "Fuente de alimentación", cat: "Soporte", fn: "Convierte los 230 V de corriente alterna de la red en tensiones continuas bajas (3,3, 5 y 12 V).", con: "Alimenta la placa base y los demás componentes con cables." },
  { n: "Teclado y ratón", cat: "Entrada", fn: "Periféricos de entrada: convierten acciones del usuario en señales digitales.", con: "Se conectan por USB o Bluetooth." },
  { n: "Monitor", cat: "Salida", fn: "Periférico de salida: muestra la imagen que genera la tarjeta gráfica.", con: "Se conecta por HDMI o DisplayPort." },
  { n: "Tarjeta de red", cat: "Entrada", fn: "Permite enviar y recibir datos por cable o por wifi. Actúa como entrada y salida a la vez.", con: "Integrada en la placa base o en una ranura." },
];
const RECORRIDO = [
  { p: "Teclado", cat: "Entrada" as Cat, t: "Pulsas la tecla A. El teclado genera un código digital (un número) que identifica la tecla." },
  { p: "Placa base (bus USB)", cat: "Soporte" as Cat, t: "El código viaja por el cable USB y los buses de la placa base hasta la CPU." },
  { p: "CPU", cat: "Procesamiento" as Cat, t: "El sistema operativo lleva el dato al programa que tiene el foco (el editor de texto). La CPU ejecuta las instrucciones que lo procesan." },
  { p: "Memoria RAM", cat: "Almacenamiento" as Cat, t: "El programa añade la letra «A» al documento, que vive en la RAM mientras se edita." },
  { p: "GPU", cat: "Procesamiento" as Cat, t: "La tarjeta gráfica calcula cómo dibujar la letra con la fuente actual y genera la imagen." },
  { p: "Monitor", cat: "Salida" as Cat, t: "La imagen llega al monitor y ves la letra aparecer en pantalla." },
  { p: "Disco SSD", cat: "Almacenamiento" as Cat, t: "Al guardar el archivo, la CPU copia el contenido de la RAM al disco: así se conserva al apagar." },
];

export function OrdenadorComponentesExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: num(block.params?.n, 0, 0, 1) >= 0.5 ? 1 : 0, sel: 0, paso: 0 };
  const [s, setS] = useState(init);
  const p = PIEZAS[s.sel]!;
  const r = RECORRIDO[s.paso]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Explora cada componente (función y conexiones) o sigue el recorrido de un dato desde que pulsas una tecla hasta que aparece en pantalla."}
      onReset={() => setS(init)}
      controls={<Choice label="Qué quieres hacer" items={[{ value: 0, label: "Explorar componentes" }, { value: 1, label: "Recorrido de un dato" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />}
    >
      {s.modo === 0 ? (
        <>
          <div className="flex flex-wrap gap-2" role="group" aria-label="Componentes">
            {PIEZAS.map((x, i) => (
              <button key={x.n} type="button" aria-pressed={s.sel === i} className={`${TOOL_BTN} ${s.sel === i ? "bg-white/15" : ""}`} style={{ borderColor: CATC[x.cat] }} onClick={() => setS((a) => ({ ...a, sel: i }))}>
                {x.n}
              </button>
            ))}
          </div>
          <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: CATC[p.cat] }} data-testid="pieza-detalle">
            <div className="flex flex-wrap items-baseline gap-3">
              <span className="text-lg font-bold">{p.n}</span>
              <span className="rounded bg-white/10 px-2 py-0.5 text-sm font-bold" style={{ color: CATC[p.cat] }}>
                {p.cat}
              </span>
            </div>
            <p className="mt-2">
              <strong>Función:</strong> {p.fn}
            </p>
            <p className="mt-1">
              <strong>Conexiones:</strong> {p.con}
            </p>
          </div>
        </>
      ) : (
        <>
          <ol className="flex flex-wrap items-center gap-2" data-testid="recorrido-lista">
            {RECORRIDO.map((x, i) => (
              <li key={x.p} className="flex items-center gap-2">
                <span className="rounded-md border px-2 py-1 text-sm text-[color:var(--stage-ink,#fff)]" style={{ borderColor: i === s.paso ? MANIM.yellow : CATC[x.cat], background: i === s.paso ? "rgba(255,216,102,0.15)" : undefined, opacity: i <= s.paso ? 1 : 0.45 }}>
                  {x.p}
                </span>
                {i < RECORRIDO.length - 1 ? <span aria-hidden>→</span> : null}
              </li>
            ))}
          </ol>
          <p className="text-[color:var(--stage-ink,#fff)]" data-testid="recorrido-texto">
            <strong>{r.p}</strong> ({r.cat.toLowerCase()}): {r.t}
          </p>
          <div className="flex gap-2">
            <button type="button" className={TOOL_BTN} disabled={s.paso === 0} onClick={() => setS((a) => ({ ...a, paso: a.paso - 1 }))}>
              Paso anterior
            </button>
            <button type="button" className={TOOL_BTN} disabled={s.paso === RECORRIDO.length - 1} onClick={() => setS((a) => ({ ...a, paso: a.paso + 1 }))}>
              Paso siguiente
            </button>
          </div>
        </>
      )}
      <Readout>
        <Stat color={MANIM.yellow} label={s.modo === 0 ? "Esquema entrada–proceso–salida" : "Paso del recorrido"}>
          {s.modo === 0 ? "Entrada → Procesamiento → Salida (+ almacenamiento)" : `${s.paso + 1} de ${RECORRIDO.length}`}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 5.2 Procesos y memoria ───────────── */

const APPS = [
  { id: "sis", n: "Sistema operativo (siempre activo)", ram: 1.5, cpu: 5, fijo: true },
  { id: "nav", n: "Navegador web", ram: 0.4, cpu: 3, fijo: false },
  { id: "ide", n: "Editor de código", ram: 0.6, cpu: 4, fijo: false },
  { id: "vid", n: "Vídeo en streaming", ram: 0.3, cpu: 12, fijo: false },
  { id: "jue", n: "Juego 3D", ram: 3.5, cpu: 55, fijo: false },
  { id: "ant", n: "Antivirus (análisis)", ram: 0.5, cpu: 25, fijo: false },
  { id: "llam", n: "Videollamada", ram: 0.8, cpu: 30, fijo: false },
];

export function usoRecursos(activas: string[], pestanas: number) {
  const act = APPS.filter((a) => a.fijo || activas.includes(a.id));
  const ram = act.reduce((t, a) => t + a.ram + (a.id === "nav" ? 0.25 * pestanas : 0), 0);
  const cpu = act.reduce((t, a) => t + a.cpu + (a.id === "nav" ? 2 * pestanas : 0), 0);
  return { act, ram, cpu };
}

export function ProcesosMemoriaExplorador({ block }: { block: ToolBlock }) {
  const init = { on: ["nav", "ide"], tabs: Math.round(num(block.params?.b, 4, 0, 30)), ramTotal: Math.round(num(block.params?.a, 8, 2, 32)) };
  const [s, setS] = useState(init);
  const { act, ram, cpu } = usoRecursos(s.on, s.tabs);
  const exceso = Math.max(0, ram - s.ramTotal);
  const lento = 1 + (exceso / s.ramTotal) * 6 + Math.max(0, cpu - 100) / 50;
  const estado = exceso > 0 ? "La RAM no basta: el sistema usa el disco como memoria virtual (swap) y todo se vuelve muy lento." : cpu > 100 ? "La CPU está saturada: los procesos hacen cola y la respuesta empeora." : cpu > 80 || ram > 0.85 * s.ramTotal ? "Cerca del límite: cualquier programa más puede ralentizar el equipo." : "Funciona con holgura.";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Abre y cierra programas y cambia la RAM del equipo. El sistema operativo reparte CPU y memoria entre los procesos; si la RAM se llena, usa el disco y todo se vuelve lento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="RAM instalada" value={s.ramTotal} min={2} max={32} step={2} unit=" GB" color={MANIM.blue} onChange={(ramTotal) => setS((x) => ({ ...x, ramTotal }))} />
          <Slider label="Pestañas del navegador" value={s.tabs} min={0} max={30} color={MANIM.orange} onChange={(tabs) => setS((x) => ({ ...x, tabs }))} />
          {APPS.filter((a) => !a.fijo).map((a) => (
            <Choice key={a.id} label={a.n} items={[{ value: 0, label: "Cerrado" }, { value: 1, label: "Abierto" }]} value={s.on.includes(a.id) ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, on: v === 1 ? [...x.on, a.id] : x.on.filter((i) => i !== a.id) }))} />
          ))}
        </>
      }
    >
      <HBar label="Memoria RAM" value={Math.min(ram, s.ramTotal)} max={s.ramTotal} color={ram > s.ramTotal ? MANIM.red : MANIM.blue} text={`${f1(ram)} / ${s.ramTotal} GB`} />
      <HBar label="CPU" value={Math.min(cpu, 100)} max={100} color={cpu > 100 ? MANIM.red : MANIM.green} text={`${f0(cpu)} %`} />
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[color:var(--stage-ink,#fff)]" data-testid="procesos-tabla">
          <thead>
            <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="py-1">Proceso</th>
              <th>RAM</th>
              <th>CPU</th>
            </tr>
          </thead>
          <tbody>
            {[...act]
              .sort((a, b) => b.ram - a.ram)
              .map((a) => (
                <tr key={a.id} className="border-t border-[color:var(--stage-border,#3d4f66)]">
                  <td className="py-1">{a.n.replace(" (siempre activo)", "")}</td>
                  <td>{f1(a.ram + (a.id === "nav" ? 0.25 * s.tabs : 0))} GB</td>
                  <td>{f0(a.cpu + (a.id === "nav" ? 2 * s.tabs : 0))} %</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
      <Readout>
        <Stat color={exceso > 0 || cpu > 100 ? MANIM.red : MANIM.green} label="Lentitud estimada">
          ×{f1(lento)}
        </Stat>
      </Readout>
      <Note>{estado} Cifras de ejemplo: cada equipo y programa real consumen cantidades distintas.</Note>
    </Frame>
  );
}

/* ───────────── 5.2 Permisos de archivos ───────────── */

export function permisosOctal(bits: boolean[]): string {
  return [0, 3, 6].map((i) => (bits[i] ? 4 : 0) + (bits[i + 1] ? 2 : 0) + (bits[i + 2] ? 1 : 0)).join("");
}

export function PermisosArchivosExplorador({ block }: { block: ToolBlock }) {
  const init = [true, true, false, true, false, false, false, false, false]; // 640
  const [b, setB] = useState<boolean[]>(init);
  const dir = num(block.params?.n, 0, 0, 1) >= 0.5;
  const cadena = b.map((v, i) => (v ? "rwx"[i % 3]! : "-")).join("");
  const quien = ["propietario", "grupo", "otros"];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Marca los permisos de lectura (r = 4), escritura (w = 2) y ejecución (x = 1) de cada tipo de usuario: el número de tres cifras es la suma por columnas."}
      onReset={() => setB(init)}
      controls={<span />}
    >
      <div className="overflow-x-auto">
        <table className="w-full text-center text-sm text-[color:var(--stage-ink,#fff)]" data-testid="permisos-tabla">
          <thead>
            <tr className="text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="py-1 text-left">Usuario</th>
              <th>Leer (r)</th>
              <th>Escribir (w)</th>
              <th>{dir ? "Entrar (x)" : "Ejecutar (x)"}</th>
              <th>Cifra</th>
            </tr>
          </thead>
          <tbody>
            {quien.map((q, g) => (
              <tr key={q} className="border-t border-[color:var(--stage-border,#3d4f66)]">
                <td className="py-1 text-left font-semibold">{q}</td>
                {[0, 1, 2].map((k) => (
                  <td key={k}>
                    <input type="checkbox" aria-label={`${q} ${["leer", "escribir", "ejecutar"][k]}`} checked={b[g * 3 + k]!} onChange={() => setB((x) => x.map((y, i) => (i === g * 3 + k ? !y : y)))} />
                  </td>
                ))}
                <td className="font-bold tabular-nums" style={{ color: MANIM.yellow }}>
                  {permisosOctal(b)[g]}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Notación numérica">
          chmod {permisosOctal(b)} {dir ? "carpeta" : "archivo"}
        </Stat>
        <Stat color={MANIM.green} label="Notación simbólica">
          {dir ? "d" : "-"}
          {cadena}
        </Stat>
        <Stat color={MANIM.blue} label="Otros usuarios pueden">
          {[b[6] ? "leer" : "", b[7] ? "escribir" : "", b[8] ? (dir ? "entrar" : "ejecutar") : ""].filter(Boolean).join(", ") || "nada"}
        </Stat>
      </Readout>
      <Note>Un script que debe poder ejecutarse necesita la «x» del usuario; un archivo con contraseñas, ningún permiso para «otros». En una carpeta, la «x» es el permiso para entrar en ella.</Note>
    </Frame>
  );
}

/* ───────────── 5.3 Texto en binario ───────────── */

export function codificarTexto(texto: string): { c: string; bytes: number[] }[] {
  const enc = new TextEncoder();
  return [...texto].map((c) => ({ c, bytes: [...enc.encode(c)] }));
}

export function TextoBinarioExplorador({ block }: { block: ToolBlock }) {
  const init = "Hola";
  const [t, setT] = useState(init);
  const cods = useMemo(() => codificarTexto(t.slice(0, 12)), [t]);
  const bits = cods.reduce((a, x) => a + x.bytes.length * 8, 0);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Escribe un texto: cada carácter se guarda como un número y cada número como bits. Prueba con una vocal con tilde o con «ñ» y fíjate en cuántos bytes ocupa."}
      onReset={() => setT(init)}
      controls={
        <label className="flex flex-col gap-1 text-sm text-[color:var(--stage-muted,#b8c2d0)] sm:col-span-2">
          Texto (máx. 12 caracteres)
          <input value={t} maxLength={12} onChange={(e) => setT(e.target.value)} className="rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-2 py-1.5 text-base text-[color:var(--stage-ink,#fff)]" />
        </label>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[color:var(--stage-ink,#fff)]" data-testid="texto-tabla">
          <thead>
            <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="py-1">Carácter</th>
              <th>Código (decimal)</th>
              <th>Bytes UTF-8 en binario</th>
            </tr>
          </thead>
          <tbody>
            {cods.map((x, i) => (
              <tr key={i} className="border-t border-[color:var(--stage-border,#3d4f66)]">
                <td className="py-1 font-bold">{x.c === " " ? "␣" : x.c}</td>
                <td className="tabular-nums">{x.bytes.length === 1 ? x.bytes[0] : (x.c.codePointAt(0) ?? 0)}</td>
                <td className="font-mono tabular-nums">{x.bytes.map((b) => b.toString(2).padStart(8, "0")).join(" ")}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Caracteres">
          {cods.length}
        </Stat>
        <Stat color={MANIM.blue} label="Tamaño">
          {cods.reduce((a, x) => a + x.bytes.length, 0)} bytes = {bits} bits
        </Stat>
      </Readout>
      <Note>Los caracteres del alfabeto inglés ocupan 1 byte (código ASCII). Las letras con tilde, la ñ o los emojis necesitan 2 o más bytes en UTF-8, la codificación más usada hoy.</Note>
    </Frame>
  );
}

/* ───────────── 5.3 Tamaño de archivos ───────────── */

export function bytesImagen(w: number, h: number, bits: number, compresion: number): number {
  return (w * h * bits) / 8 / compresion;
}
export function bytesAudio(frec: number, bits: number, canales: number, seg: number, compresion: number): number {
  return (frec * (bits / 8) * canales * seg) / compresion;
}
export function fmtBytes(b: number): string {
  if (b < 1024) return `${fmtEs(b, 0)} B`;
  if (b < 1024 ** 2) return `${fmtEs(b / 1024, 1)} KB`;
  if (b < 1024 ** 3) return `${fmtEs(b / 1024 ** 2, 1)} MB`;
  return `${fmtEs(b / 1024 ** 3, 2)} GB`;
}

const RESOLUCIONES = [
  { n: "640 × 480", w: 640, h: 480 },
  { n: "1280 × 720 (HD)", w: 1280, h: 720 },
  { n: "1920 × 1080 (Full HD)", w: 1920, h: 1080 },
  { n: "3840 × 2160 (4K)", w: 3840, h: 2160 },
];

export function TamanoArchivoExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: num(block.params?.n, 0, 0, 1) >= 0.5 ? 1 : 0, res: 2, bits: 24, comp: 1, frec: 44100, bitsA: 16, can: 2, seg: 180 };
  const [s, setS] = useState(init);
  const r = RESOLUCIONES[s.res]!;
  const size = s.modo === 0 ? bytesImagen(r.w, r.h, s.bits, s.comp) : bytesAudio(s.frec, s.bitsA, s.can, s.seg, s.comp);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El tamaño sin comprimir es el producto de todos los datos que se guardan. Cambia cada parámetro y observa cuál influye más; la compresión reduce el tamaño dividiéndolo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de archivo" items={[{ value: 0, label: "Imagen" }, { value: 1, label: "Audio" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          {s.modo === 0 ? (
            <>
              <Choice label="Resolución" items={RESOLUCIONES.map((x, i) => ({ value: i, label: x.n }))} value={s.res} onChange={(res) => setS((x) => ({ ...x, res }))} />
              <Choice label="Profundidad de color" items={[{ value: 1, label: "1 bit (blanco y negro)" }, { value: 8, label: "8 bits (256 grises)" }, { value: 24, label: "24 bits (color real)" }]} value={s.bits} onChange={(bits) => setS((x) => ({ ...x, bits }))} />
            </>
          ) : (
            <>
              <Choice label="Frecuencia de muestreo" items={[{ value: 8000, label: "8 kHz" }, { value: 22050, label: "22,05 kHz" }, { value: 44100, label: "44,1 kHz" }, { value: 48000, label: "48 kHz" }]} value={s.frec} onChange={(frec) => setS((x) => ({ ...x, frec }))} />
              <Choice label="Bits por muestra" items={[{ value: 8, label: "8 bits" }, { value: 16, label: "16 bits" }, { value: 24, label: "24 bits" }]} value={s.bitsA} onChange={(bitsA) => setS((x) => ({ ...x, bitsA }))} />
              <Choice label="Canales" items={[{ value: 1, label: "Mono" }, { value: 2, label: "Estéreo" }]} value={s.can} onChange={(can) => setS((x) => ({ ...x, can }))} />
              <Slider label="Duración" value={s.seg} min={10} max={600} step={10} unit=" s" color={MANIM.orange} onChange={(seg) => setS((x) => ({ ...x, seg }))} />
            </>
          )}
          <Choice label="Compresión" items={[{ value: 1, label: "Sin comprimir" }, { value: 10, label: "Con pérdida (≈ 1:10)" }]} value={s.comp} onChange={(comp) => setS((x) => ({ ...x, comp }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.green} label="Tamaño del archivo">
          {fmtBytes(size)}
        </Stat>
        <Stat color={MANIM.blue} label="Bytes exactos">
          {f0(Math.round(size))}
        </Stat>
      </Readout>
      <Note>
        {s.modo === 0 ? `Tamaño = ancho × alto × bits por píxel ÷ 8 = ${r.w} × ${r.h} × ${s.bits} ÷ 8.` : `Tamaño = frecuencia × bytes por muestra × canales × segundos = ${f0(s.frec)} × ${s.bitsA / 8} × ${s.can} × ${s.seg}.`} Aquí 1 KB = 1 024 B.
      </Note>
    </Frame>
  );
}

/* ───────────── 5.4 Diagramas de flujo ejecutables ───────────── */

type V = Record<string, number>;
type FNode = { id: string; kind: "start" | "end" | "io" | "proc" | "dec"; text: string; x: number; y: number; run?: (v: V) => void; cond?: (v: V) => boolean; out?: (v: V) => string };
type FEdge = { from: string; to: string; label?: string; pts: [number, number][] };
type FPreset = { title: string; inputs: { k: string; label: string; min: number; max: number; value: number }[]; nodes: FNode[]; edges: FEdge[]; h: number };

const FLUJOS: FPreset[] = [
  {
    title: "Aprobado o suspenso",
    inputs: [{ k: "nota", label: "Nota", min: 0, max: 10, value: 6 }],
    h: 290,
    nodes: [
      { id: "s", kind: "start", text: "Inicio", x: 260, y: 22 },
      { id: "i", kind: "io", text: "Leer nota", x: 260, y: 70 },
      { id: "d", kind: "dec", text: "¿nota ≥ 5?", x: 260, y: 135 },
      { id: "a", kind: "io", text: "Mostrar «Aprobado»", x: 130, y: 205, out: () => "Aprobado" },
      { id: "b", kind: "io", text: "Mostrar «Suspenso»", x: 390, y: 205, out: () => "Suspenso" },
      { id: "e", kind: "end", text: "Fin", x: 260, y: 264 },
    ],
    edges: [
      { from: "s", to: "i", pts: [[260, 34], [260, 54]] },
      { from: "i", to: "d", pts: [[260, 86], [260, 111]] },
      { from: "d", to: "a", label: "sí", pts: [[185, 135], [130, 135], [130, 189]] },
      { from: "d", to: "b", label: "no", pts: [[335, 135], [390, 135], [390, 189]] },
      { from: "a", to: "e", pts: [[130, 221], [130, 264], [236, 264]] },
      { from: "b", to: "e", pts: [[390, 221], [390, 264], [284, 264]] },
    ],
  },
  {
    title: "Suma de 1 a N con un bucle",
    inputs: [{ k: "N", label: "N", min: 1, max: 8, value: 4 }],
    h: 330,
    nodes: [
      { id: "s", kind: "start", text: "Inicio", x: 200, y: 20 },
      { id: "i", kind: "io", text: "Leer N", x: 200, y: 60 },
      { id: "p0", kind: "proc", text: "suma ← 0 ; i ← 1", x: 200, y: 102, run: (v) => { v.suma = 0; v.i = 1; } },
      { id: "d", kind: "dec", text: "¿i ≤ N?", x: 200, y: 160 },
      { id: "p1", kind: "proc", text: "suma ← suma + i", x: 400, y: 160, run: (v) => { v.suma = v.suma! + v.i!; } },
      { id: "p2", kind: "proc", text: "i ← i + 1", x: 400, y: 212, run: (v) => { v.i = v.i! + 1; } },
      { id: "o", kind: "io", text: "Mostrar suma", x: 200, y: 245, out: (v) => `suma = ${v.suma}` },
      { id: "e", kind: "end", text: "Fin", x: 200, y: 296 },
    ],
    edges: [
      { from: "s", to: "i", pts: [[200, 32], [200, 44]] },
      { from: "i", to: "p0", pts: [[200, 76], [200, 86]] },
      { from: "p0", to: "d", pts: [[200, 118], [200, 136]] },
      { from: "d", to: "p1", label: "sí", pts: [[275, 160], [325, 160]] },
      { from: "p1", to: "p2", pts: [[400, 176], [400, 196]] },
      { from: "p2", to: "d", pts: [[400, 228], [400, 250], [510, 250], [510, 118], [200, 118]] },
      { from: "d", to: "o", label: "no", pts: [[200, 184], [200, 229]] },
      { from: "o", to: "e", pts: [[200, 261], [200, 284]] },
    ],
  },
  {
    title: "El mayor de tres números",
    inputs: [
      { k: "a", label: "a", min: 0, max: 20, value: 7 },
      { k: "b", label: "b", min: 0, max: 20, value: 12 },
      { k: "c", label: "c", min: 0, max: 20, value: 9 },
    ],
    h: 350,
    nodes: [
      { id: "s", kind: "start", text: "Inicio", x: 200, y: 20 },
      { id: "i", kind: "io", text: "Leer a, b, c", x: 200, y: 60 },
      { id: "m", kind: "proc", text: "m ← a", x: 200, y: 100, run: (v) => { v.m = v.a!; } },
      { id: "d1", kind: "dec", text: "¿b > m?", x: 200, y: 150 },
      { id: "b1", kind: "proc", text: "m ← b", x: 380, y: 150, run: (v) => { v.m = v.b!; } },
      { id: "d2", kind: "dec", text: "¿c > m?", x: 200, y: 225 },
      { id: "b2", kind: "proc", text: "m ← c", x: 380, y: 225, run: (v) => { v.m = v.c!; } },
      { id: "o", kind: "io", text: "Mostrar m", x: 200, y: 290, out: (v) => `el mayor es ${v.m}` },
      { id: "e", kind: "end", text: "Fin", x: 200, y: 330 },
    ],
    edges: [
      { from: "s", to: "i", pts: [[200, 32], [200, 44]] },
      { from: "i", to: "m", pts: [[200, 76], [200, 84]] },
      { from: "m", to: "d1", pts: [[200, 116], [200, 128]] },
      { from: "d1", to: "b1", label: "sí", pts: [[275, 150], [315, 150]] },
      { from: "d1", to: "d2", label: "no", pts: [[200, 172], [200, 203]] },
      { from: "b1", to: "d2", pts: [[380, 166], [380, 190], [200, 190]] },
      { from: "d2", to: "b2", label: "sí", pts: [[275, 225], [315, 225]] },
      { from: "d2", to: "o", label: "no", pts: [[200, 247], [200, 274]] },
      { from: "b2", to: "o", pts: [[380, 241], [380, 262], [200, 262]] },
      { from: "o", to: "e", pts: [[200, 306], [200, 318]] },
    ],
  },
];

export function DiagramaFlujoExplorador({ block }: { block: ToolBlock }) {
  const preset = FLUJOS[Math.round(num(block.params?.n, 0, 0, FLUJOS.length - 1))]!;
  const initIn = Object.fromEntries(preset.inputs.map((i) => [i.k, i.value])) as V;
  const [inp, setInp] = useState<V>(initIn);
  const [est, setEst] = useState<{ at: string; v: V; out: string[]; camino: string[]; pasos: number }>({ at: "s", v: {}, out: [], camino: ["s"], pasos: 0 });
  const nodo = (id: string) => preset.nodes.find((n) => n.id === id)!;
  const siguiente = (cur: { at: string; v: V; out: string[]; camino: string[]; pasos: number }) => {
    const n = nodo(cur.at);
    if (n.kind === "end" || cur.pasos > 200) return cur;
    const v = { ...cur.v };
    let out = cur.out;
    let to: string | undefined;
    if (n.kind === "dec") {
      const si = n.cond ? n.cond(v) : decidir(preset, n.id, v);
      to = preset.edges.find((e) => e.from === n.id && e.label === (si ? "sí" : "no"))?.to;
    } else {
      if (n.kind === "io" && n.text.startsWith("Leer")) Object.assign(v, inp);
      n.run?.(v);
      if (n.out) out = [...out, n.out(v)];
      to = preset.edges.find((e) => e.from === n.id)?.to;
    }
    return to ? { at: to, v, out, camino: [...cur.camino, to], pasos: cur.pasos + 1 } : cur;
  };
  const reiniciar = () => setEst({ at: "s", v: {}, out: [], camino: ["s"], pasos: 0 });
  const fin = nodo(est.at).kind === "end";
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ejecuta el algoritmo paso a paso: el nodo resaltado es el que se está ejecutando. Cambia los datos de entrada y comprueba que el camino cambia."}
      onReset={() => {
        setInp(initIn);
        reiniciar();
      }}
      controls={
        <>
          {preset.inputs.map((i) => (
            <Slider key={i.k} label={`Dato de entrada: ${i.label}`} value={inp[i.k]!} min={i.min} max={i.max} color={MANIM.yellow} onChange={(val) => {
              const nuevo = { ...inp, [i.k]: val };
              setInp(nuevo);
              reiniciar();
            }} />
          ))}
        </>
      }
    >
      <p className="text-sm font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{preset.title}</p>
      <Svg w={520} h={preset.h} maxH={Math.min(preset.h + 10, 340)} testId="tool-flujo">
        {preset.edges.map((e, i) => {
          const usado = est.camino.some((c, k) => c === e.from && est.camino[k + 1] === e.to);
          const d = e.pts.map((p, k) => `${k ? "L" : "M"} ${p[0]} ${p[1]}`).join(" ");
          const [px, py] = e.pts[e.pts.length - 1]!;
          const [qx, qy] = e.pts[e.pts.length - 2]!;
          const a = Math.atan2(py - qy, px - qx);
          return (
            <g key={i}>
              <path d={d} fill="none" stroke={usado ? MANIM.yellow : MANIM.muted} strokeWidth={usado ? 3 : 1.8} />
              <polygon points={`${px},${py} ${px - 9 * Math.cos(a) + 4 * Math.sin(a)},${py - 9 * Math.sin(a) - 4 * Math.cos(a)} ${px - 9 * Math.cos(a) - 4 * Math.sin(a)},${py - 9 * Math.sin(a) + 4 * Math.cos(a)}`} fill={usado ? MANIM.yellow : MANIM.muted} />
              {e.label ? (
                <text x={e.pts[0]![0] + (e.pts[1]![0] > e.pts[0]![0] ? 10 : e.pts[1]![0] < e.pts[0]![0] ? -22 : 8)} y={e.pts[0]![1] + (e.pts[1]![1] > e.pts[0]![1] ? 16 : -6)} fill={MANIM.green} fontSize={13} fontWeight={700}>
                  {e.label}
                </text>
              ) : null}
            </g>
          );
        })}
        {preset.nodes.map((n) => {
          const activo = est.at === n.id;
          const visitado = est.camino.includes(n.id);
          const col = activo ? MANIM.yellow : visitado ? MANIM.green : MANIM.muted;
          const common = { fill: activo ? "rgba(255,216,102,0.2)" : MANIM.surface, stroke: col, strokeWidth: activo ? 3.5 : 2 };
          return (
            <g key={n.id}>
              {n.kind === "start" || n.kind === "end" ? (
                <rect x={n.x - 38} y={n.y - 13} width={76} height={26} rx={13} {...common} />
              ) : n.kind === "io" ? (
                <polygon points={`${n.x - 70},${n.y + 15} ${n.x - 58},${n.y - 15} ${n.x + 70},${n.y - 15} ${n.x + 58},${n.y + 15}`} {...common} />
              ) : n.kind === "proc" ? (
                <rect x={n.x - 75} y={n.y - 15} width={150} height={30} {...common} />
              ) : (
                <polygon points={`${n.x},${n.y - 24} ${n.x + 75},${n.y} ${n.x},${n.y + 24} ${n.x - 75},${n.y}`} {...common} />
              )}
              <text x={n.x} y={n.y + 5} textAnchor="middle" fill={MANIM.ink} fontSize={13}>
                {n.text}
              </text>
            </g>
          );
        })}
      </Svg>
      <div className="flex flex-wrap gap-2">
        <button type="button" className={TOOL_BTN} disabled={fin} onClick={() => setEst(siguiente)}>
          Paso siguiente
        </button>
        <button type="button" className={TOOL_BTN} disabled={fin} onClick={() => setEst((c) => { let x = c; for (let k = 0; k < 200 && nodo(x.at).kind !== "end"; k += 1) x = siguiente(x); return x; })}>
          Ejecutar hasta el final
        </button>
        <button type="button" className={TOOL_BTN} onClick={() => reiniciar()}>
          Volver al inicio
        </button>
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Variables">
          {Object.entries(est.v).map(([k, v]) => `${k} = ${v}`).join(" · ") || "—"}
        </Stat>
        <Stat color={MANIM.green} label="Salida">
          {est.out.join(" | ") || "(aún nada)"}
        </Stat>
        <Stat color={MANIM.yellow} label="Pasos">
          {est.pasos}
        </Stat>
      </Readout>
    </Frame>
  );
}

function decidir(p: FPreset, id: string, v: V): boolean {
  if (p.title.startsWith("Aprobado")) return v.nota! >= 5;
  if (p.title.startsWith("Suma")) return v.i! <= v.N!;
  if (id === "d1") return v.b! > v.m!;
  return v.c! > v.m!;
}

/* ───────────── 5.5–5.9 Editor de Python con traza ───────────── */

type PyPreset = { titulo: string; code: string; inputs?: { name: string; label: string; min: number; max: number; step?: number }[]; nota: string };

export const PROGRAMAS: PyPreset[] = [
  {
    titulo: "Variables y operaciones",
    code: "radio = 5\npi = 3.14159\narea = pi * radio ** 2\nperimetro = 2 * pi * radio\nprint(\"Área:\", area)\nprint(f\"Perímetro: {perimetro:.2f}\")",
    inputs: [{ name: "radio", label: "radio", min: 1, max: 20 }],
    nota: "Cada línea asigna un valor a una variable o muestra algo. Fíjate en que las variables se crean al asignarles un valor y en que 5 es un entero y 3.14159 un decimal (float).",
  },
  {
    titulo: "Decisión: if / elif / else",
    code: "nota = 7\nif nota >= 9:\n    resultado = \"sobresaliente\"\nelif nota >= 5:\n    resultado = \"aprobado\"\nelse:\n    resultado = \"suspenso\"\nprint(resultado)",
    inputs: [{ name: "nota", label: "nota", min: 0, max: 10 }],
    nota: "Solo se ejecuta una rama: la primera cuya condición es verdadera. Cambia la nota y mira qué líneas se ejecutan.",
  },
  {
    titulo: "Bucle for con acumulador",
    code: "n = 5\nsuma = 0\nfor i in range(1, n + 1):\n    suma += i\nprint(\"La suma es\", suma)",
    inputs: [{ name: "n", label: "n", min: 1, max: 10 }],
    nota: "range(1, n + 1) recorre 1, 2, …, n. En cada vuelta, suma acumula el valor de i. Cuenta cuántas veces se ejecuta la línea del for.",
  },
  {
    titulo: "Bucle while con contador",
    code: "combustible = 3\nwhile combustible > 0:\n    print(\"Quedan\", combustible, \"litros\")\n    combustible -= 1\nprint(\"Depósito vacío\")",
    inputs: [{ name: "combustible", label: "combustible", min: 0, max: 6 }],
    nota: "El while repite mientras la condición sea cierta. Si dentro del bucle no se modifica la variable de la condición, el bucle nunca termina.",
  },
  {
    titulo: "Funciones",
    code: "def area_rectangulo(base, altura):\n    area = base * altura\n    return area\n\na = area_rectangulo(4, 3)\nb = area_rectangulo(2, 5)\nprint(a + b)",
    nota: "Al llamar a la función, el programa salta dentro de ella con sus parámetros, calcula y vuelve con el valor de return. Observa cómo cambia el marco en la tabla de variables.",
  },
  {
    titulo: "Depurar: la media está mal",
    code: "notas = [6, 8, 10, 4]\ntotal = 0\nfor nota in notas:\n    total += nota\nmedia = total / (len(notas) + 1)\nprint(\"Media:\", media)",
    nota: "La media de 6, 8, 10 y 4 es 7. ¿Por qué sale otro valor? Avanza paso a paso, mira total y busca la línea que falla. Después corrígela en el editor y vuelve a ejecutar.",
  },
  {
    titulo: "Depurar: error de sintaxis",
    code: "edad = 17\nif edad >= 18\n    print(\"Mayor de edad\")\nelse:\n    print(\"Menor de edad\")",
    nota: "El programa ni siquiera empieza: Python lee todo antes de ejecutarlo y se queja de la línea 2. Lee el mensaje, corrige y ejecuta de nuevo.",
  },
  {
    titulo: "Tipos de datos",
    code: "nombre = \"Lucía\"\nedad = 16\naltura = 1.68\nes_estudiante = True\nprint(nombre, edad, altura, es_estudiante)\nprint(edad + altura)\nprint(nombre + str(edad))",
    nota: "Texto (str), entero (int), decimal (float) y lógico (bool). Prueba a cambiar la última línea por nombre + edad y lee el mensaje de error.",
  },
  {
    titulo: "Listas: guardar varios datos",
    code: "datos = [18, 21, 25, 19]\ndatos.append(23)\nprint(\"Hay\", len(datos), \"datos\")\nprint(\"Máximo:\", max(datos), \"Mínimo:\", min(datos))\nprint(\"Media:\", sum(datos) / len(datos))\nprint(\"Primero:\", datos[0], \"Último:\", datos[-1])",
    nota: "Una lista guarda varios valores en orden. Se accede con un índice que empieza en 0 (y -1 es el último). Prueba a añadir más datos con append.",
  },
  {
    titulo: "Búsqueda lineal",
    code: "lista = [3, 8, 12, 17, 21, 30]\nobjetivo = 17\nposicion = -1\nfor i in range(len(lista)):\n    if lista[i] == objetivo:\n        posicion = i\n        break\nprint(\"Posición:\", posicion)",
    inputs: [{ name: "objetivo", label: "objetivo", min: 3, max: 30, step: 1 }],
    nota: "La búsqueda lineal revisa los elementos uno a uno. Cambia el objetivo (por ejemplo a 30 o a 5) y cuenta cuántos pasos da el programa.",
  },
  {
    titulo: "Búsqueda binaria",
    code: "lista = [2, 5, 8, 12, 16, 23, 38, 56]\nobjetivo = 23\nbajo = 0\nalto = len(lista) - 1\npasos = 0\nposicion = -1\nwhile bajo <= alto:\n    medio = (bajo + alto) // 2\n    pasos += 1\n    if lista[medio] == objetivo:\n        posicion = medio\n        break\n    elif lista[medio] < objetivo:\n        bajo = medio + 1\n    else:\n        alto = medio - 1\nprint(\"Posición:\", posicion, \"en\", pasos, \"pasos\")",
    inputs: [{ name: "objetivo", label: "objetivo", min: 2, max: 56, step: 1 }],
    nota: "Solo funciona con la lista ordenada: se mira el elemento central y se descarta la mitad que no puede contener el objetivo. Compara el número de pasos con el de la búsqueda lineal.",
  },
  {
    titulo: "Ordenar con el método de la burbuja",
    code: "v = [5, 2, 9, 1]\nn = len(v)\nfor i in range(n - 1):\n    for j in range(n - 1 - i):\n        if v[j] > v[j + 1]:\n            aux = v[j]\n            v[j] = v[j + 1]\n            v[j + 1] = aux\nprint(v)",
    nota: "Se comparan elementos vecinos y se intercambian si están mal colocados. Tras cada vuelta del bucle externo, el mayor de los que quedan «sube» al final.",
  },
  {
    titulo: "Funciones y programación modular",
    code: "def media(lista):\n    return sum(lista) / len(lista)\n\ndef maximo(lista):\n    m = lista[0]\n    for x in lista:\n        if x > m:\n            m = x\n    return m\n\ntemps = [14, 17, 21, 19]\nprint(\"Media:\", media(temps))\nprint(\"Máxima:\", maximo(temps))",
    nota: "Cada función resuelve una parte del problema y se puede probar por separado y reutilizar. El programa principal queda corto y legible.",
  },
  {
    titulo: "Datos: filtrar y resumir",
    code: "temps = [12, 14, 9, 17, 21, 25, 19]\numbral = 15\ncalidos = []\nfor t in temps:\n    if t > umbral:\n        calidos.append(t)\nprint(len(calidos), \"días por encima de\", umbral)\nprint(calidos)\nprint(sorted(temps))",
    inputs: [{ name: "umbral", label: "umbral", min: 5, max: 25, step: 1 }],
    nota: "Recorrer una lista y quedarse con lo que cumple una condición es la base del tratamiento de datos. Mueve el umbral y mira cómo cambia el resultado.",
  },
  {
    titulo: "Depurar: el máximo falla con negativos",
    code: "notas = [-4, -9, -2, -7]\nmaximo = 0\nfor x in notas:\n    if x > maximo:\n        maximo = x\nprint(\"Máximo:\", maximo)",
    nota: "El resultado debería ser -2, pero sale 0: el valor inicial no pertenece a la lista. Arréglalo con maximo = notas[0] y vuelve a ejecutar.",
  },
  {
    titulo: "Depurar: índice fuera de rango",
    code: "precios = [3, 5, 8]\ntotal = 0\nfor i in range(len(precios) + 1):\n    total += precios[i]\nprint(total)",
    nota: "El bucle da una vuelta de más y pide un índice que no existe (la lista tiene los índices 0, 1 y 2). Lee el mensaje de error, localiza la línea y corrige el rango.",
  },
];

export function PythonTrazaExplorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, PROGRAMAS.length - 1));
  const prog = PROGRAMAS[idx]!;
  const [code, setCode] = useState(prog.code);
  const [modo, setModo] = useState<"edit" | "run">("edit");
  const [paso, setPaso] = useState(0);
  const [bps, setBps] = useState<number[]>([]);
  const res = useMemo(() => (modo === "run" ? runPython(code) : null), [code, modo]);
  const total = res ? res.steps.length + (res.error ? 1 : 0) : 0;
  const enError = res?.error && paso >= res.steps.length;
  const cur = res && !enError ? res.steps[Math.min(paso, res.steps.length - 1)] : undefined;
  const lineas = code.split("\n");
  const lineaActual = enError ? res!.error!.line : (cur?.line ?? -1);
  const salida = res ? res.output.slice(0, enError || paso >= res.steps.length - 1 ? undefined : (cur?.outLen ?? 0)) : [];
  const setInput = (name: string, v: number) => setCode((c) => c.replace(new RegExp(`^${name} = .*$`, "m"), `${name} = ${v}`));
  const valorInput = (name: string) => {
    const m = new RegExp(`^${name} = (-?[0-9.]+)`, "m").exec(code);
    return m ? Number(m[1]) : 0;
  };
  const reiniciar = () => {
    setCode(prog.code);
    setModo("edit");
    setPaso(0);
    setBps([]);
  };
  const siguienteBp = () => {
    if (!res) return;
    for (let k = paso + 1; k < res.steps.length; k += 1) {
      if (bps.includes(res.steps[k]!.line)) {
        setPaso(k);
        return;
      }
    }
    setPaso(total - 1);
  };
  return (
    <Frame
      hint={block.hint ?? "Edita el programa, pulsa «Ejecutar paso a paso» y avanza línea a línea viendo cómo cambian las variables. Pulsa el número de una línea para poner un punto de interrupción."}
      onReset={reiniciar}
      controls={
        <>
          <p className="text-sm font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{prog.titulo}</p>
          {prog.inputs?.map((i) => (
            <Slider key={i.name} label={`Valor de ${i.label}`} value={valorInput(i.name)} min={i.min} max={i.max} step={i.step ?? 1} color={MANIM.yellow} onChange={(v) => { setInput(i.name, v); setModo("edit"); }} />
          ))}
          <div className="flex flex-wrap gap-2">
            <button type="button" className={TOOL_BTN} onClick={() => { setModo("run"); setPaso(0); }}>
              Ejecutar paso a paso
            </button>
            <button type="button" className={TOOL_BTN} disabled={modo === "edit"} onClick={() => setModo("edit")}>
              Editar el código
            </button>
          </div>
          {modo === "run" && res ? (
            <div className="flex flex-wrap gap-2" role="group" aria-label="Control de la ejecución">
              <button type="button" className={TOOL_BTN} disabled={paso === 0} onClick={() => setPaso(0)}>
                Al principio
              </button>
              <button type="button" className={TOOL_BTN} disabled={paso === 0} onClick={() => setPaso((p) => Math.max(0, p - 1))}>
                Paso anterior
              </button>
              <button type="button" className={TOOL_BTN} disabled={paso >= total - 1} onClick={() => setPaso((p) => Math.min(total - 1, p + 1))}>
                Paso siguiente
              </button>
              <button type="button" className={TOOL_BTN} disabled={paso >= total - 1} onClick={siguienteBp}>
                Continuar hasta el punto de interrupción
              </button>
            </div>
          ) : null}
        </>
      }
    >
      {modo === "edit" ? (
        <textarea aria-label="Código en Python" spellCheck={false} value={code} onChange={(e) => setCode(e.target.value)} rows={Math.min(14, lineas.length + 1)} className="w-full resize-y rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/30 p-3 font-mono text-sm leading-6 text-[color:var(--stage-ink,#fff)]" />
      ) : (
        <ol className="overflow-x-auto rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/30 py-2 font-mono text-sm leading-6 text-[color:var(--stage-ink,#fff)]" data-testid="python-lineas">
          {lineas.map((l, k) => {
            const n = k + 1;
            const activa = n === lineaActual;
            return (
              <li key={k} className="flex" style={{ background: activa ? (enError ? "rgba(252,98,85,0.25)" : "rgba(255,216,102,0.2)") : undefined }} data-activa={activa ? "si" : "no"}>
                <button type="button" aria-label={`Punto de interrupción en la línea ${n}`} aria-pressed={bps.includes(n)} className="w-10 shrink-0 pr-2 text-right text-[color:var(--stage-muted,#b8c2d0)] hover:text-white" onClick={() => setBps((b) => (b.includes(n) ? b.filter((x) => x !== n) : [...b, n]))}>
                  {bps.includes(n) ? "●" : ""}
                  {n}
                </button>
                <span className="whitespace-pre pl-2">{l || " "}</span>
              </li>
            );
          })}
        </ol>
      )}
      {modo === "run" && res ? (
        <>
          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-md border border-[color:var(--stage-border,#3d4f66)] p-2" data-testid="python-variables">
              <div className="text-xs font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Variables {cur ? `(${cur.frame})` : ""}</div>
              {cur && Object.keys(cur.vars).length ? (
                <table className="mt-1 w-full font-mono text-sm text-[color:var(--stage-ink,#fff)]">
                  <tbody>
                    {Object.entries(cur.vars).map(([k, v]) => (
                      <tr key={k}>
                        <td className="pr-3" style={{ color: MANIM.blue }}>
                          {k}
                        </td>
                        <td>{v}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p className="mt-1 text-sm text-[color:var(--stage-muted,#b8c2d0)]">(ninguna todavía)</p>
              )}
            </div>
            <div className="rounded-md border border-[color:var(--stage-border,#3d4f66)] p-2" data-testid="python-salida">
              <div className="text-xs font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">Salida</div>
              <pre className="mt-1 whitespace-pre-wrap font-mono text-sm" style={{ color: MANIM.green }}>
                {salida.join("\n") || "(sin salida todavía)"}
              </pre>
            </div>
          </div>
          {enError ? (
            <p className="rounded-md border p-2 text-sm font-bold" style={{ borderColor: MANIM.red, color: MANIM.red }} role="alert" data-testid="python-error">
              {res.error!.kind} (línea {res.error!.line}): {res.error!.msg}
            </p>
          ) : null}
          <Readout>
            <Stat color={MANIM.yellow} label="Paso">
              {Math.min(paso + 1, total)} de {total}
            </Stat>
            <Stat color={MANIM.blue} label="Línea que se va a ejecutar">
              {lineaActual > 0 ? lineaActual : enError ? res.error!.line : "fin del programa"}
            </Stat>
          </Readout>
        </>
      ) : null}
      <Note>{prog.nota}</Note>
    </Frame>
  );
}

/* ───────────── 5.10 Pruebas automáticas ───────────── */

type TestCase = { args: PyVal[]; esperado: string };
type TestPreset = { titulo: string; fn: string; code: string; tests: TestCase[]; nota: string };

export const EJERCICIOS_TEST: TestPreset[] = [
  {
    titulo: "clasifica(n): negativo, cero o positivo",
    fn: "clasifica",
    code: "def clasifica(n):\n    if n < 0:\n        return \"negativo\"\n    elif n > 0:\n        return \"positivo\"\n",
    tests: [
      { args: [-5], esperado: "'negativo'" },
      { args: [7], esperado: "'positivo'" },
      { args: [0], esperado: "'cero'" },
      { args: [-1], esperado: "'negativo'" },
    ],
    nota: "Una de las pruebas falla: es un caso límite (el 0). Un buen conjunto de pruebas incluye siempre los valores frontera.",
  },
  {
    titulo: "es_par(n)",
    fn: "es_par",
    code: "def es_par(n):\n    return n % 2 == 1\n",
    tests: [
      { args: [4], esperado: "True" },
      { args: [7], esperado: "False" },
      { args: [0], esperado: "True" },
      { args: [-2], esperado: "True" },
    ],
    nota: "Todas las pruebas fallan: el error es de lógica (una comparación equivocada), no de sintaxis. El programa «funciona» pero da resultados incorrectos.",
  },
  {
    titulo: "maximo(a, b, c)",
    fn: "maximo",
    code: "def maximo(a, b, c):\n    if a > b:\n        return a\n    return b\n",
    tests: [
      { args: [1, 2, 3], esperado: "3" },
      { args: [5, 2, 1], esperado: "5" },
      { args: [2, 9, 4], esperado: "9" },
      { args: [3, 3, 3], esperado: "3" },
      { args: [1, 5, 8], esperado: "8" },
    ],
    nota: "El código ignora el tercer número. Las pruebas con el mayor en la posición c lo delatan; con el mayor en a o b parece correcto.",
  },
  {
    titulo: "cuenta_pares(lista)",
    fn: "cuenta_pares",
    code: "def cuenta_pares(lista):\n    contador = 0\n    for x in lista:\n        if x % 2 == 0:\n            contador += 1\n    return contador\n",
    tests: [
      { args: [[1, 2, 3, 4]], esperado: "2" },
      { args: [[]], esperado: "0" },
      { args: [[7, 9]], esperado: "0" },
      { args: [[0, -2, 5]], esperado: "2" },
    ],
    nota: "Este código es correcto: las cuatro pruebas pasan, incluida la lista vacía. Rómpelo a propósito (por ejemplo, empieza el contador en 1) y observa qué pruebas lo detectan.",
  },
];

export function TestsAutomaticosExplorador({ block }: { block: ToolBlock }) {
  const idx = Math.round(num(block.params?.n, 0, 0, EJERCICIOS_TEST.length - 1));
  const ej = EJERCICIOS_TEST[idx]!;
  const [code, setCode] = useState(ej.code);
  const [ejecutado, setEjecutado] = useState(false);
  const resultados = useMemo(
    () =>
      ej.tests.map((t) => {
        const r = callPython(code, ej.fn, t.args);
        const obtenido = r.error ? `${r.error.kind}: ${r.error.msg}` : pyRepr(r.value ?? null);
        return { t, obtenido, ok: !r.error && obtenido === t.esperado };
      }),
    [code, ej],
  );
  const pasan = resultados.filter((r) => r.ok).length;
  return (
    <Frame
      hint={block.hint ?? "Escribe o corrige la función y pulsa «Ejecutar pruebas». Cada caso compara el resultado esperado con el obtenido; un caso rojo te dice dónde buscar."}
      onReset={() => {
        setCode(ej.code);
        setEjecutado(false);
      }}
      controls={
        <>
          <p className="text-sm font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{ej.titulo}</p>
          <textarea aria-label="Código de la función" spellCheck={false} value={code} onChange={(e) => { setCode(e.target.value); setEjecutado(false); }} rows={Math.min(12, code.split("\n").length + 1)} className="w-full resize-y rounded-md border border-[color:var(--stage-border,#3d4f66)] bg-black/30 p-3 font-mono text-sm leading-6 text-[color:var(--stage-ink,#fff)]" />
          <button type="button" className={TOOL_BTN} onClick={() => setEjecutado(true)}>
            Ejecutar pruebas
          </button>
        </>
      }
    >
      <div className="overflow-x-auto">
        <table className="w-full text-sm text-[color:var(--stage-ink,#fff)]" data-testid="tests-tabla">
          <thead>
            <tr className="text-left text-[color:var(--stage-muted,#b8c2d0)]">
              <th className="py-1">Llamada</th>
              <th>Esperado</th>
              <th>Obtenido</th>
              <th />
            </tr>
          </thead>
          <tbody>
            {resultados.map((r, i) => (
              <tr key={i} className="border-t border-[color:var(--stage-border,#3d4f66)]">
                <td className="py-1 font-mono">
                  {ej.fn}({r.t.args.map((a) => pyRepr(a)).join(", ")})
                </td>
                <td className="font-mono">{r.t.esperado}</td>
                <td className="font-mono">{ejecutado ? r.obtenido : "—"}</td>
                <td className="font-bold" style={{ color: r.ok ? MANIM.green : MANIM.red }}>
                  {ejecutado ? (r.ok ? "✓" : "✗") : ""}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Readout>
        <Stat color={ejecutado && pasan === resultados.length ? MANIM.green : MANIM.yellow} label="Pruebas superadas">
          {ejecutado ? `${pasan} de ${resultados.length}` : "sin ejecutar"}
        </Stat>
      </Readout>
      <Note>{ej.nota} Que pasen todas las pruebas no garantiza que no haya errores: solo que no hay ninguno en los casos que has probado.</Note>
    </Frame>
  );
}
