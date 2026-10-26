"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── 9.1 Componentes de un dispositivo: hardware y software ───────────── */

type Pieza = { n: string; tipo: "Hardware" | "Software"; f: string };
export const DISPOSITIVOS: { n: string; piezas: Pieza[] }[] = [
  {
    n: "Ordenador",
    piezas: [
      { n: "Procesador (CPU)", tipo: "Hardware", f: "Ejecuta las instrucciones de los programas: es el «cerebro» del equipo." },
      { n: "Memoria RAM", tipo: "Hardware", f: "Guarda de forma temporal los programas y datos en uso. Se borra al apagar." },
      { n: "Disco (SSD o HDD)", tipo: "Hardware", f: "Almacena archivos y programas de forma permanente, aunque se apague el equipo." },
      { n: "Placa base", tipo: "Hardware", f: "Conecta todos los componentes entre sí." },
      { n: "Sistema operativo", tipo: "Software", f: "Gestiona el hardware y ofrece un entorno para usar el equipo (Windows, Linux, macOS)." },
      { n: "Aplicaciones", tipo: "Software", f: "Programas para tareas concretas: navegador, procesador de textos, editor de imágenes." },
    ],
  },
  {
    n: "Teléfono móvil",
    piezas: [
      { n: "Pantalla táctil", tipo: "Hardware", f: "Muestra la información y recoge las órdenes con los dedos." },
      { n: "Batería", tipo: "Hardware", f: "Almacena la energía eléctrica que necesita el aparato." },
      { n: "Cámara y sensores", tipo: "Hardware", f: "Captan imágenes, movimiento, ubicación o luz." },
      { n: "Chip de comunicaciones", tipo: "Hardware", f: "Permite conectarse a la red móvil, al wifi y al Bluetooth." },
      { n: "Sistema operativo (Android, iOS)", tipo: "Software", f: "Controla el teléfono y permite instalar y ejecutar aplicaciones." },
      { n: "Aplicaciones («apps»)", tipo: "Software", f: "Programas que se instalan para mensajería, mapas, juegos o estudio." },
    ],
  },
];

export function DispositivoComponentesExplorador({ block }: { block: ToolBlock }) {
  const init = { d: Math.round(num(block.params?.n, 0, 0, DISPOSITIVOS.length - 1)), p: 0, vistas: [0] as number[] };
  const [s, setS] = useState(init);
  const dis = DISPOSITIVOS[s.d]!;
  const pz = dis.piezas[s.p]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Pulsa cada componente y decide si es hardware (lo que se toca) o software (los programas)."}
      onReset={() => setS(init)}
      controls={<Choice label="Dispositivo" items={DISPOSITIVOS.map((x, i) => ({ value: i, label: x.n }))} value={s.d} onChange={(d) => setS({ d, p: 0, vistas: [0] })} />}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Componentes">
        {dis.piezas.map((x, i) => (
          <button key={x.n} type="button" aria-pressed={s.p === i} className={`${TOOL_BTN} ${s.p === i ? "bg-white/15" : ""}`} style={{ borderColor: x.tipo === "Hardware" ? MANIM.orange : MANIM.blue }} onClick={() => setS((a) => ({ ...a, p: i, vistas: a.vistas.includes(i) ? a.vistas : [...a.vistas, i] }))}>
            {x.n}
          </button>
        ))}
      </div>
      <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: pz.tipo === "Hardware" ? MANIM.orange : MANIM.blue }} data-testid="pieza-detalle">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{pz.n}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm font-bold" style={{ color: pz.tipo === "Hardware" ? MANIM.orange : MANIM.blue }}>
            {pz.tipo}
          </span>
        </div>
        <p className="mt-2">{pz.f}</p>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Componentes revisados">
          {s.vistas.length} de {dis.piezas.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 9.2 Diagnóstico de un problema técnico sencillo ───────────── */

export const PROBLEMAS = [
  { n: "El ordenador no enciende", pasos: [["¿El cable de alimentación está bien enchufado?", true], ["¿La regleta tiene corriente?", true], ["¿El botón de encendido responde?", false, "Es probable que falle la fuente de alimentación o el botón: hay que llamar al servicio técnico."]] },
  { n: "El equipo va muy lento", pasos: [["¿Hay muchos programas abiertos a la vez?", false, "Cierra los programas que no uses: la memoria RAM está saturada."], ["¿Queda espacio libre en el disco?", true], ["¿Hay actualizaciones pendientes?", true]] },
  { n: "No hay conexión a internet", pasos: [["¿El wifi está activado en el equipo?", true], ["¿Otros dispositivos se conectan a esa red?", false, "El fallo está en el router o en la línea: reinicia el router y, si sigue, avisa al operador."], ["¿La contraseña de la red es correcta?", true]] },
  { n: "No se oye el sonido", pasos: [["¿El volumen está en silencio?", true], ["¿Está seleccionada la salida de audio correcta?", false, "El sonido sale por otro dispositivo (por ejemplo, unos auriculares Bluetooth): cambia la salida de audio."], ["¿El altavoz está conectado?", true]] },
] as const;

export function DiagnosticoTecnicoExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 0, 0, PROBLEMAS.length - 1)), hechas: [] as number[] };
  const [s, setS] = useState(init);
  const pr = PROBLEMAS[s.p]!;
  const causa = pr.pasos.findIndex((x) => !x[1]);
  const hallado = s.hechas.includes(causa);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Comprueba las posibilidades de una en una, de la más sencilla a la más complicada, hasta encontrar la causa."}
      onReset={() => setS(init)}
      controls={<Choice label="Problema" items={PROBLEMAS.map((x, i) => ({ value: i, label: x.n }))} value={s.p} onChange={(p) => setS({ p, hechas: [] })} />}
    >
      <ol className="flex flex-col gap-2" data-testid="diagnostico-pasos">
        {pr.pasos.map((x, i) => {
          const hecho = s.hechas.includes(i);
          return (
            <li key={i} className="flex flex-wrap items-center gap-3 rounded-lg border px-3 py-2 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: hecho ? (x[1] ? MANIM.green : MANIM.red) : "var(--stage-border,#3d4f66)" }}>
              <span className="flex-1">{x[0]}</span>
              {hecho ? (
                <span className="font-bold" style={{ color: x[1] ? MANIM.green : MANIM.red }}>
                  {x[1] ? "Sí: está bien" : "No: aquí hay un fallo"}
                </span>
              ) : (
                <button type="button" className={TOOL_BTN} onClick={() => setS((a) => ({ ...a, hechas: [...a.hechas, i] }))}>
                  Comprobar
                </button>
              )}
            </li>
          );
        })}
      </ol>
      <Readout>
        <Stat color={MANIM.yellow} label="Comprobaciones hechas">
          {s.hechas.length} de {pr.pasos.length}
        </Stat>
        <Stat color={hallado ? MANIM.green : MANIM.muted} label="Causa">
          {hallado ? "Encontrada" : "Aún sin localizar"}
        </Stat>
      </Readout>
      <Note>{hallado ? (pr.pasos[causa]![2] as string) : "Un buen diagnóstico va de lo más simple a lo más complejo: cables, ajustes y programas antes que el hardware."}</Note>
    </Frame>
  );
}

/* ───────────── 9.3 Capacidad de almacenamiento ───────────── */

export const SOPORTES = [
  { n: "Memoria USB 16 GB", gb: 16 },
  { n: "Móvil 128 GB", gb: 128 },
  { n: "Disco externo 1 TB", gb: 1000 },
] as const;
const MB_POR = { fotos: 4, canciones: 5, videos: 100, apps: 200 };

/** Espacio ocupado en MB por un conjunto de archivos (1 GB = 1 000 MB). */
export const ocupadoMB = (fotos: number, canciones: number, videos: number, apps: number) => fotos * MB_POR.fotos + canciones * MB_POR.canciones + videos * MB_POR.videos + apps * MB_POR.apps;

export function CapacidadAlmacenamientoExplorador({ block }: { block: ToolBlock }) {
  const init = { sop: Math.round(num(block.params?.n, 1, 0, SOPORTES.length - 1)), fotos: 500, canciones: 200, videos: 20, apps: 30 };
  const [s, setS] = useState(init);
  const cap = SOPORTES[s.sop]!.gb;
  const usado = ocupadoMB(s.fotos, s.canciones, s.videos, s.apps) / 1000;
  const pct = (usado / cap) * 100;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada archivo ocupa espacio (1 GB = 1 000 MB). Añade fotos, canciones, vídeos y aplicaciones y comprueba si caben."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Soporte" items={SOPORTES.map((x, i) => ({ value: i, label: x.n }))} value={s.sop} onChange={(sop) => setS((x) => ({ ...x, sop }))} />
          <Slider label="Fotos (4 MB cada una)" value={s.fotos} min={0} max={5000} step={50} color={MANIM.blue} onChange={(fotos) => setS((x) => ({ ...x, fotos }))} />
          <Slider label="Canciones (5 MB cada una)" value={s.canciones} min={0} max={2000} step={50} color={MANIM.green} onChange={(canciones) => setS((x) => ({ ...x, canciones }))} />
          <Slider label="Vídeos de 1 minuto (100 MB cada uno)" value={s.videos} min={0} max={500} step={10} color={MANIM.orange} onChange={(videos) => setS((x) => ({ ...x, videos }))} />
          <Slider label="Aplicaciones (200 MB cada una)" value={s.apps} min={0} max={200} step={5} color={MANIM.purple} onChange={(apps) => setS((x) => ({ ...x, apps }))} />
        </>
      }
    >
      <div className="h-8 w-full overflow-hidden rounded border border-[color:var(--stage-border,#3d4f66)] bg-white/5" data-testid="barra-disco">
        <div className="anim-t flex h-full items-center justify-end pr-2 text-sm font-bold" style={{ width: `${Math.min(100, pct)}%`, background: pct > 100 ? MANIM.red : pct > 80 ? MANIM.orange : MANIM.green, color: MANIM.surface }}>
          {pct > 12 ? `${f0(Math.min(pct, 999))} %` : ""}
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Espacio ocupado">
          {f1(usado)} GB
        </Stat>
        <Stat color={MANIM.yellow} label="Capacidad">
          {f0(cap)} GB
        </Stat>
        <Stat color={pct > 100 ? MANIM.red : MANIM.green} label="Resultado">
          {pct > 100 ? `No caben: sobran ${f1(usado - cap)} GB` : `Caben: quedan ${f1(cap - usado)} GB libres`}
        </Stat>
      </Readout>
      <Note>Un byte tiene 8 bits; un kilobyte (KB), unos 1 000 bytes; un megabyte (MB), 1 000 KB; un gigabyte (GB), 1 000 MB; y un terabyte (TB), 1 000 GB. Los sistemas también reservan espacio para sí mismos, así que nunca se dispone de toda la capacidad anunciada.</Note>
    </Frame>
  );
}

/* ───────────── 9.4 Copias de seguridad ───────────── */

export const COPIAS = ["Solo el original, en el ordenador", "Copia en un disco externo en casa", "Copia en la nube", "Copia en un disco en casa de un familiar"] as const;
export const SUCESOS = ["Se estropea el disco duro", "Roban el ordenador", "Incendio o inundación en casa", "Borras un archivo sin querer", "Un virus cifra tus archivos (ransomware)"] as const;
/** survive[copia][suceso]: el dato sigue disponible. */
const SOBREVIVE: boolean[][] = [
  [false, false, false, false, false],
  [true, false, false, true, true],
  [true, true, true, false, false],
  [true, true, true, true, true],
];

/** Para cada suceso, ¿sobrevive el dato con las copias activadas? (`activas` incluye el índice 0 = original). */
export const sobrevive = (activas: number[]) => SUCESOS.map((_, j) => activas.some((i) => SOBREVIVE[i]![j]));

export function CopiaSeguridadExplorador({ block }: { block: ToolBlock }) {
  const init = { activas: [0] as number[], suceso: -1 };
  const [s, setS] = useState(init);
  const res = sobrevive(s.activas);
  const salvados = res.filter(Boolean).length;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Activa copias y provoca un desastre: ¿sobreviven tus datos? Prueba la regla 3-2-1: 3 copias, 2 soportes distintos, 1 fuera de casa."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-col gap-2 sm:col-span-2" role="group" aria-label="Copias">
          {COPIAS.map((c, i) => (
            <button key={c} type="button" disabled={i === 0} aria-pressed={s.activas.includes(i)} className={`${TOOL_BTN} text-left ${s.activas.includes(i) ? "bg-white/15" : ""}`} onClick={() => setS((x) => ({ ...x, activas: x.activas.includes(i) ? x.activas.filter((a) => a !== i) : [...x.activas, i] }))}>
              {s.activas.includes(i) ? "✓ " : ""}
              {c}
            </button>
          ))}
        </div>
      }
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Sucesos">
        {SUCESOS.map((x, j) => (
          <button key={x} type="button" aria-pressed={s.suceso === j} className={`${TOOL_BTN} ${s.suceso === j ? "bg-white/15" : ""}`} style={{ borderColor: s.suceso === j ? (res[j] ? MANIM.green : MANIM.red) : undefined }} onClick={() => setS((a) => ({ ...a, suceso: j }))}>
            {x}
          </button>
        ))}
      </div>
      <Readout>
        <Stat color={s.suceso < 0 ? MANIM.muted : res[s.suceso] ? MANIM.green : MANIM.red} label="¿Se salvan los datos?">
          {s.suceso < 0 ? "Elige un suceso" : res[s.suceso] ? "Sí: queda alguna copia" : "No: se pierden"}
        </Stat>
        <Stat color={MANIM.yellow} label="Sucesos superados">
          {salvados} de {SUCESOS.length}
        </Stat>
      </Readout>
      <Note>Una copia en el mismo sitio que el original no protege de robos o incendios. Una copia sincronizada en la nube puede arrastrar también un borrado o un virus. Por eso se combinan soportes y lugares distintos.</Note>
    </Frame>
  );
}

/* ───────────── 9.5 Tiempo de descarga ───────────── */

export const CONEXIONES = [
  { n: "Datos móviles 3G", mbps: 3 },
  { n: "Bluetooth", mbps: 2 },
  { n: "Datos móviles 4G", mbps: 30 },
  { n: "Wifi doméstico", mbps: 100 },
  { n: "Fibra óptica", mbps: 600 },
] as const;

/** Tiempo en segundos para transferir `mb` megabytes a `mbps` megabits por segundo (1 byte = 8 bits). */
export const segundosDescarga = (mb: number, mbps: number) => (mb * 8) / mbps;

export function legible(seg: number): string {
  if (seg < 1) return "menos de 1 segundo";
  if (seg < 60) return `${f0(seg)} s`;
  if (seg < 3600) return `${f1(seg / 60)} min`;
  return `${f1(seg / 3600)} h`;
}

export function TiempoDescargaExplorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.n, 3, 0, CONEXIONES.length - 1)), mb: Math.round(num(block.params?.a, 500, 1, 5000)) };
  const [s, setS] = useState(init);
  const con = CONEXIONES[s.c]!;
  const t = segundosDescarga(s.mb, con.mbps);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Tiempo = tamaño en bits ÷ velocidad. Recuerda: 1 byte son 8 bits, y la velocidad se da en megabits por segundo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de conexión" items={CONEXIONES.map((x, i) => ({ value: i, label: x.n }))} value={s.c} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Tamaño del archivo" value={s.mb} min={1} max={5000} step={1} unit=" MB" format={f0} color={MANIM.orange} onChange={(mb) => setS((x) => ({ ...x, mb }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad">
          {f0(con.mbps)} Mb/s
        </Stat>
        <Stat color={MANIM.orange} label="Tamaño en bits">
          {f0(s.mb * 8)} Mb
        </Stat>
        <Stat color={MANIM.green} label="Tiempo de descarga">
          {legible(t)}
        </Stat>
      </Readout>
      <Note>Mb (megabit) no es lo mismo que MB (megabyte): un megabyte son ocho megabits. La velocidad anunciada es un máximo teórico: en la práctica baja si hay muchos dispositivos conectados o mala señal.</Note>
    </Frame>
  );
}

/* ───────────── 9.6 Búsqueda avanzada ───────────── */

type Doc = { t: string; sitio: string; tipo: "pdf" | "web"; texto: string };
export const DOCS: Doc[] = [
  { t: "Guía de energía solar fotovoltaica", sitio: "gob", tipo: "pdf", texto: "energía solar paneles fotovoltaicos instalación" },
  { t: "Comprar paneles solares baratos", sitio: "com", tipo: "web", texto: "oferta paneles solares comprar precio" },
  { t: "Energía eólica en Asturias", sitio: "org", tipo: "web", texto: "energía eólica parques molinos asturias" },
  { t: "Cómo funciona un panel solar", sitio: "edu", tipo: "pdf", texto: "energía solar panel células fotovoltaicas funcionamiento" },
  { t: "Receta de tarta de manzana", sitio: "com", tipo: "web", texto: "receta tarta manzana horno" },
  { t: "Panel de control del ordenador", sitio: "com", tipo: "web", texto: "panel de control ajustes ordenador" },
  { t: "Informe de energías renovables en Asturias", sitio: "gob", tipo: "pdf", texto: "energías renovables asturias solar eólica hidráulica informe" },
  { t: "Opiniones sobre paneles solares caseros", sitio: "com", tipo: "web", texto: "opiniones paneles solares caseros foro" },
];

export function buscar(q: { texto: string; exacta: boolean; excluir: string; sitio: string; tipo: string }): Doc[] {
  const norm = (x: string) => x.toLowerCase();
  const palabras = norm(q.texto).split(/\s+/).filter(Boolean);
  return DOCS.filter((d) => {
    const cont = norm(`${d.t} ${d.texto}`);
    if (palabras.length === 0) return false;
    if (q.exacta ? !cont.includes(palabras.join(" ")) : !palabras.every((p) => cont.includes(p))) return false;
    if (q.excluir.trim() && cont.includes(norm(q.excluir.trim()))) return false;
    if (q.sitio !== "cualquiera" && d.sitio !== q.sitio) return false;
    if (q.tipo !== "cualquiera" && d.tipo !== q.tipo) return false;
    return true;
  });
}

export function BusquedaOperadoresExplorador({ block }: { block: ToolBlock }) {
  const init = { texto: "energía solar", exacta: false, excluir: "", sitio: "cualquiera", tipo: "cualquiera" };
  const [s, setS] = useState(init);
  const r = buscar(s);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Empieza con «energía solar» y ve afinando: comillas (frase exacta), excluir una palabra, un tipo de sitio o un tipo de archivo."}
      onReset={() => setS(init)}
      controls={
        <>
          <label className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)] sm:col-span-2">
            Palabras clave
            <input type="text" value={s.texto} aria-label="Palabras clave" onChange={(e) => setS((x) => ({ ...x, texto: e.target.value }))} className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-transparent px-3 py-2 text-base text-[color:var(--stage-ink,#fff)]" />
          </label>
          <Choice label="Frase exacta (entre comillas)" items={[{ value: 0, label: "No" }, { value: 1, label: "Sí" }]} value={s.exacta ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, exacta: v === 1 }))} />
          <label className="flex flex-col gap-1.5 text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            Excluir la palabra (operador −)
            <input type="text" value={s.excluir} aria-label="Excluir la palabra" onChange={(e) => setS((x) => ({ ...x, excluir: e.target.value }))} className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-transparent px-3 py-2 text-base text-[color:var(--stage-ink,#fff)]" />
          </label>
          <Choice label="Tipo de sitio" items={[{ value: "cualquiera", label: "Cualquiera" }, { value: "gob", label: "Institucional (.gob)" }, { value: "edu", label: "Educativo (.edu)" }, { value: "org", label: "Organización (.org)" }, { value: "com", label: "Comercial (.com)" }]} value={s.sitio} onChange={(sitio) => setS((x) => ({ ...x, sitio }))} />
          <Choice label="Tipo de archivo" items={[{ value: "cualquiera", label: "Cualquiera" }, { value: "pdf", label: "Solo PDF" }]} value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo }))} />
        </>
      }
    >
      <ul className="flex flex-col gap-2" data-testid="resultados-busqueda">
        {r.length === 0 ? <li className="text-[color:var(--stage-muted,#b8c2d0)]">Sin resultados: prueba con menos filtros.</li> : null}
        {r.map((d) => (
          <li key={d.t} className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-3 py-2 text-[color:var(--stage-ink,#fff)]">
            <span className="font-bold" style={{ color: MANIM.blue }}>
              {d.t}
            </span>
            <span className="ml-2 text-xs text-[color:var(--stage-muted,#b8c2d0)]">
              ejemplo.{d.sitio} · {d.tipo.toUpperCase()}
            </span>
          </li>
        ))}
      </ul>
      <Readout>
        <Stat color={MANIM.yellow} label="Resultados">
          {r.length} de {DOCS.length}
        </Stat>
      </Readout>
      <Note>Los operadores acotan la búsqueda: las comillas piden la frase exacta, el signo menos excluye una palabra, «site:» limita a un sitio y «filetype:» a un tipo de archivo. Aun así, hay que comprobar quién publica la información.</Note>
    </Frame>
  );
}

/* ───────────── 9.7 Fortaleza de una contraseña ───────────── */

/** Número de combinaciones posibles de una contraseña de `longitud` caracteres de un alfabeto de `tam` símbolos. */
export const combinaciones = (tam: number, longitud: number) => tam ** longitud;

const INTENTOS_S = 1e10; // intentos por segundo, orientativo

export function tiempoAtaque(comb: number): string {
  const seg = comb / INTENTOS_S / 2;
  if (seg < 1) return "al instante";
  if (seg < 60) return `${f0(seg)} segundos`;
  if (seg < 3600) return `${f0(seg / 60)} minutos`;
  if (seg < 86400) return `${f0(seg / 3600)} horas`;
  const dias = seg / 86400;
  if (dias < 365) return `${f0(dias)} días`;
  const anios = dias / 365;
  if (anios < 1000) return `${f0(anios)} años`;
  if (anios < 1e6) return `${f0(anios / 1000)} mil años`;
  if (anios < 1e9) return `${f0(anios / 1e6)} millones de años`;
  return "miles de millones de años";
}

export function ContrasenaFortalezaExplorador({ block }: { block: ToolBlock }) {
  const init = { len: Math.round(num(block.params?.a, 6, 4, 20)), min: true, may: false, num: false, sim: false };
  const [s, setS] = useState(init);
  const tam = (s.min ? 26 : 0) + (s.may ? 26 : 0) + (s.num ? 10 : 0) + (s.sim ? 32 : 0);
  const comb = tam > 0 ? combinaciones(tam, s.len) : 0;
  const t = tiempoAtaque(comb);
  const seg = comb / INTENTOS_S / 2;
  const nivel = seg < 3600 ? "Débil" : seg < 86400 * 365 * 100 ? "Aceptable" : "Fuerte";
  const alt = (k: "min" | "may" | "num" | "sim", txt: string) => (
    <button type="button" aria-pressed={s[k]} className={`${TOOL_BTN} ${s[k] ? "bg-white/15" : ""}`} onClick={() => setS((x) => ({ ...x, [k]: !x[k] }))}>
      {s[k] ? "✓ " : ""}
      {txt}
    </button>
  );
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada carácter extra multiplica las combinaciones. Prueba a alargar la contraseña y a mezclar tipos de caracteres."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Longitud de la contraseña" value={s.len} min={4} max={20} step={1} unit=" caracteres" color={MANIM.blue} onChange={(len) => setS((x) => ({ ...x, len }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Tipos de caracteres">
            {alt("min", "minúsculas (26)")}
            {alt("may", "MAYÚSCULAS (26)")}
            {alt("num", "números (10)")}
            {alt("sim", "símbolos (32)")}
          </div>
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Símbolos posibles en cada posición">
          {tam}
        </Stat>
        <Stat color={MANIM.blue} label="Combinaciones">
          {comb === 0 ? "—" : comb < 1e9 ? f0(comb) : `${(comb / 10 ** Math.floor(Math.log10(comb))).toFixed(1).replace(".", ",")} × 10^${Math.floor(Math.log10(comb))}`}
        </Stat>
        <Stat color={nivel === "Fuerte" ? MANIM.green : nivel === "Aceptable" ? MANIM.yellow : MANIM.red} label="Tiempo para adivinarla por fuerza bruta">
          {tam === 0 ? "—" : t}
        </Stat>
        <Stat color={nivel === "Fuerte" ? MANIM.green : nivel === "Aceptable" ? MANIM.yellow : MANIM.red} label="Fortaleza">
          {tam === 0 ? "Elige algún tipo de carácter" : nivel}
        </Stat>
      </Readout>
      <Note>Cálculo orientativo: un atacante que probase diez mil millones de combinaciones por segundo tardaría de media la mitad del tiempo indicado. Una contraseña larga es mejor que una corta y complicada. Y nunca se reutiliza la misma en varios servicios ni se comparte.</Note>
    </Frame>
  );
}

/* ───────────── 9.8 Situaciones digitales: ¿fraude?, ¿bienestar?, ¿buena educación? ───────────── */

type Sit = { t: string; a: boolean; e: string };
export const SET_SITUACIONES: { titulo: string; botones: [string, string]; items: Sit[] }[] = [
  {
    titulo: "Phishing",
    botones: ["Parece un fraude", "Parece legítimo"],
    items: [
      { t: "Un correo de «tu banco» dice que tu cuenta se bloqueará hoy si no pulsas un enlace e introduces tu contraseña.", a: true, e: "Las prisas, las amenazas y pedir contraseñas por enlace son señales típicas de phishing. Un banco real no lo hace." },
      { t: "Un SMS de Correos, que sí esperabas, te avisa de un paquete, sin enlace y con un número de seguimiento que reconoces.", a: false, e: "Si esperas el envío y no se te piden datos, es probable que sea real. Aun así, se comprueba por la web oficial." },
      { t: "Un mensaje de un desconocido dice que has ganado un móvil y te pide el número de tu tarjeta para «el envío».", a: true, e: "Nadie regala premios a cambio de datos bancarios: es una estafa." },
      { t: "Tu profesor te comparte un documento desde la cuenta institucional del centro, que aparece en la plataforma del aula.", a: false, e: "Viene de un canal conocido y desde una cuenta oficial; es legítimo." },
      { t: "Un correo con faltas de ortografía y un remitente raro (soporte@banc0-seguro.xyz) te pide actualizar tus datos.", a: true, e: "El dominio falsificado y las faltas delatan un intento de suplantación." },
    ],
  },
  {
    titulo: "Bienestar digital",
    botones: ["Es una buena respuesta", "No es buena respuesta"],
    items: [
      { t: "Alguien te manda en un chat un mensaje humillante sobre ti. Guardas una captura, no respondes y se lo cuentas a un adulto de confianza.", a: true, e: "Guardar pruebas, no contestar y pedir ayuda es la mejor respuesta ante el ciberacoso." },
      { t: "Un desconocido te pide una foto íntima y te amenaza con difundirla si no se la envías. Se la envías para que te deje en paz.", a: false, e: "Es sextorsión: ceder la empeora. Hay que bloquear, guardar pruebas y contárselo ya a un adulto o denunciar." },
      { t: "Para dormir mejor, dejas el móvil cargando fuera de la habitación por la noche.", a: true, e: "Reducir las pantallas antes de dormir mejora el descanso y el bienestar." },
      { t: "Compartes la foto de una compañera sin su permiso porque «es solo una broma».", a: false, e: "Difundir imágenes de otra persona sin consentimiento vulnera su intimidad y puede hacerle daño." },
      { t: "Revisas quién puede ver tus publicaciones y pones tu perfil en privado.", a: true, e: "Controlar la privacidad reduce los riesgos y protege tu intimidad." },
    ],
  },
  {
    titulo: "Netiqueta",
    botones: ["Es adecuado", "Es inadecuado"],
    items: [
      { t: "Escribes un correo al profesor con saludo, asunto claro, tu nombre y un tono respetuoso.", a: true, e: "Un mensaje claro y educado facilita la comunicación." },
      { t: "Escribes todo en mayúsculas en un chat de clase para que se note más lo que dices.", a: false, e: "Las mayúsculas se leen como gritos. Mejor usar un tono normal." },
      { t: "Antes de reenviar una noticia sorprendente, compruebas si aparece en medios fiables.", a: true, e: "Verificar evita difundir bulos." },
      { t: "Respondes con insultos a un compañero que no piensa como tú en un foro de la clase.", a: false, e: "El respeto debe mantenerse también en línea: se debate con argumentos, no con insultos." },
      { t: "Pides permiso antes de etiquetar a alguien en una foto o compartir su información.", a: true, e: "Respetar la privacidad de los demás forma parte de la buena conducta en la red." },
    ],
  },
];

export function SituacionesDigitalesExplorador({ block }: { block: ToolBlock }) {
  const set0 = Math.round(num(block.params?.n, 0, 0, SET_SITUACIONES.length - 1));
  const init = { set: set0, i: 0, aciertos: 0, fallos: 0, msg: "" };
  const [s, setS] = useState(init);
  const set = SET_SITUACIONES[s.set]!;
  const fin = s.i >= set.items.length;
  const it = set.items[Math.min(s.i, set.items.length - 1)]!;
  const responde = (a: boolean) => {
    const ok = a === it.a;
    setS((x) => ({ ...x, i: x.i + 1, aciertos: x.aciertos + (ok ? 1 : 0), fallos: x.fallos + (ok ? 0 : 1), msg: `${ok ? "¡Correcto! " : "Ojo: "}${it.e}` }));
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Lee cada situación y decide. Después verás la explicación."}
      onReset={() => setS({ ...init, set: s.set })}
      controls={
        <>
          <Choice label="Situaciones" items={SET_SITUACIONES.map((x, i) => ({ value: i, label: x.titulo }))} value={s.set} onChange={(sset) => setS({ ...init, set: sset })} />
          <div className="flex flex-wrap gap-3 sm:col-span-2">
            <button type="button" className={TOOL_BTN} disabled={fin} style={{ borderColor: MANIM.green, color: MANIM.green }} onClick={() => responde(true)}>
              {set.botones[0]}
            </button>
            <button type="button" className={TOOL_BTN} disabled={fin} style={{ borderColor: MANIM.red, color: MANIM.red }} onClick={() => responde(false)}>
              {set.botones[1]}
            </button>
          </div>
        </>
      }
    >
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-4 text-lg text-[color:var(--stage-ink,#fff)]" data-testid="situacion-digital">
        {fin ? `Has terminado: ${s.aciertos} de ${set.items.length} bien.` : it.t}
      </div>
      {s.msg ? <Note>{s.msg}</Note> : null}
      <Readout>
        <Stat color={MANIM.green} label="Aciertos">
          {s.aciertos}
        </Stat>
        <Stat color={MANIM.red} label="Fallos">
          {s.fallos}
        </Stat>
        <Stat color={MANIM.yellow} label="Situación">
          {Math.min(s.i + 1, set.items.length)} de {set.items.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 9.9 Licencias Creative Commons ───────────── */

export function licenciaCC(comercial: boolean, modif: "si" | "igual" | "no"): { codigo: string; texto: string } {
  const partes = ["BY"];
  if (!comercial) partes.push("NC");
  if (modif === "igual") partes.push("SA");
  if (modif === "no") partes.push("ND");
  const texto = `${comercial ? "Se permite el uso comercial" : "Solo uso no comercial"}; ${modif === "si" ? "se pueden hacer obras derivadas" : modif === "igual" ? "se pueden hacer obras derivadas si se comparten con la misma licencia" : "no se permiten obras derivadas"}; siempre hay que citar al autor.`;
  return { codigo: `CC ${partes.join("-")}`, texto };
}

export function LicenciasCcExplorador({ block }: { block: ToolBlock }) {
  const init = { com: true, mod: "si" as "si" | "igual" | "no" };
  const [s, setS] = useState(init);
  const l = licenciaCC(s.com, s.mod);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige lo que permitirías a otras personas hacer con tu obra y mira qué licencia Creative Commons corresponde."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="¿Se permite un uso comercial?" items={[{ value: 1, label: "Sí" }, { value: 0, label: "No" }]} value={s.com ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, com: v === 1 }))} />
          <Choice label="¿Se permite modificar la obra?" items={[{ value: "si", label: "Sí" }, { value: "igual", label: "Sí, compartiendo con la misma licencia" }, { value: "no", label: "No" }]} value={s.mod} onChange={(mod) => setS((x) => ({ ...x, mod }))} />
        </>
      }
    >
      <div className="rounded-lg border p-4 text-center" style={{ borderColor: MANIM.yellow }} data-testid="licencia">
        <p className="text-3xl font-bold" style={{ color: MANIM.yellow }}>
          {l.codigo}
        </p>
        <p className="mt-2 text-[color:var(--stage-ink,#fff)]">{l.texto}</p>
      </div>
      <Note>BY: atribución, citar al autor. NC: no comercial. SA: compartir igual. ND: sin obras derivadas. Si una obra no indica licencia, está protegida por derechos de autor: no se puede copiar ni publicar sin permiso.</Note>
    </Frame>
  );
}
