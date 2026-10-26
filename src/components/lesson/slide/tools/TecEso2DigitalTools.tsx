"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const RAM_SO_MB = 3500;
export const APPS_RAM = [
  { n: "Editor de vídeo", mb: 3000 },
  { n: "Videojuego", mb: 4500 },
  { n: "Videollamada", mb: 1000 },
] as const;
export const MB_PESTANA = 250;

/** Memoria usada (MB) por el sistema operativo, las pestañas del navegador y las aplicaciones activas. */
export function usoRam(pestanas: number, activas: readonly boolean[]) {
  return RAM_SO_MB + pestanas * MB_PESTANA + APPS_RAM.reduce((a, ap, i) => a + (activas[i] ? ap.mb : 0), 0);
}

export function estadoRam(usoMb: number, ramGb: number) {
  const pct = (usoMb / (ramGb * 1024)) * 100;
  return { pct, estado: pct <= 70 ? "Fluido" : pct <= 100 ? "Justo" : "Saturada: usa el disco y va muy lento" };
}

export const ARCHIVOS = [
  { ruta: "Documentos/Tecnologia/memoria.docx", abre: "Procesador de textos", tipo: "Documento de texto" },
  { ruta: "Documentos/Tecnologia/planos/soporte.dxf", abre: "Programa de CAD", tipo: "Dibujo vectorial (CAD)" },
  { ruta: "Documentos/Tecnologia/fotos/prototipo.jpg", abre: "Visor o editor de imágenes", tipo: "Imagen comprimida" },
  { ruta: "Documentos/Tecnologia/presupuesto.xlsx", abre: "Hoja de cálculo", tipo: "Hoja de cálculo" },
  { ruta: "Descargas/instalador.exe", abre: "El sistema operativo (ejecutable)", tipo: "Programa ejecutable" },
] as const;
export const CARPETAS_ORIGEN = ["Documentos", "Documentos/Tecnologia", "Descargas"] as const;

/** Ruta relativa a un archivo desde una carpeta de trabajo (ambas sin barra inicial). */
export function rutaRelativa(desde: string, ruta: string) {
  const a = desde.split("/");
  const b = ruta.split("/");
  let i = 0;
  while (i < a.length && i < b.length - 1 && a[i] === b[i]) i += 1;
  return [...Array(a.length - i).fill(".."), ...b.slice(i)].join("/");
}

export const extension = (ruta: string) => (ruta.includes(".") ? ruta.slice(ruta.lastIndexOf(".") + 1) : "");

export const FILAS_HOJA = [
  { n: "Listones", p: 1.5 },
  { n: "Cola", p: 3 },
  { n: "Tornillos (caja)", p: 4 },
  { n: "Lija", p: 0.8 },
] as const;

export function totalesHoja(cant: readonly number[], iva = 21) {
  const sub = FILAS_HOJA.reduce((a, f, i) => a + f.p * cant[i]!, 0);
  return { sub, iva: (sub * iva) / 100, total: sub * (1 + iva / 100) };
}

export const FORMATOS_IMG = [
  { n: "BMP (sin comprimir)", f: 1 },
  { n: "PNG (sin pérdida)", f: 0.5 },
  { n: "JPEG (comprimido)", f: 0.1 },
] as const;

/** Tamaño aproximado en MB de una imagen a 24 bits por píxel según el formato. */
export const tamanoImagenMB = (w: number, h: number, fmt: number) => (w * h * 3 * FORMATOS_IMG[fmt]!.f) / 1024 ** 2;

/** Segundos que tarda en subirse `gb` gigabytes a `mbps` megabits por segundo. */
export const segundosSubida = (gb: number, mbps: number) => (mbps > 0 ? (gb * 8000) / mbps : Infinity);
export function formatoTiempo(seg: number) {
  if (!Number.isFinite(seg)) return "—";
  if (seg < 90) return `${fmtEs(seg, 0)} s`;
  if (seg < 5400) return `${f1(seg / 60)} min`;
  if (seg < 172800) return `${f1(seg / 3600)} h`;
  return `${f1(seg / 86400)} días`;
}

export const ACTIVIDADES_PANTALLA = ["Estudio y clase", "Redes sociales", "Vídeos y series", "Videojuegos", "Mensajería"] as const;
export function resumenPantalla(h: readonly number[]) {
  const total = h.reduce((a, b) => a + b, 0);
  const ocio = total - h[0]!;
  return { total, ocio, pctVigilia: (total / 15) * 100, aviso: ocio <= 2 ? "Equilibrado" : ocio <= 4 ? "Moderado: cuida las pausas" : "Elevado: conviene reducir y hacer pausas" };
}

/* ───────────── 1. Memoria RAM y multitarea ───────────── */

export function SistemaRecursosExplorador({ block }: { block: ToolBlock }) {
  const init = { ram: Math.round(num(block.params?.n, 1, 0, 2)), pest: Math.round(num(block.params?.a, 6, 0, 40)), act: [false, false, false] };
  const [s, setS] = useState(init);
  const RAMS = [4, 8, 16];
  const uso = usoRam(s.pest, s.act);
  const e = estadoRam(uso, RAMS[s.ram]!);
  const color = e.pct <= 70 ? MANIM.green : e.pct <= 100 ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Abre aplicaciones y pestañas y mira cuándo se llena la memoria RAM. Cuando se satura, el ordenador usa el disco y se vuelve lento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Memoria RAM del equipo" items={RAMS.map((g, value) => ({ value, label: `${g} GB` }))} value={s.ram} onChange={(ram) => setS((x) => ({ ...x, ram }))} />
          <Slider label="Pestañas del navegador abiertas" value={s.pest} min={0} max={40} step={1} color={MANIM.blue} onChange={(pest) => setS((x) => ({ ...x, pest }))} />
          <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Aplicaciones abiertas">
            {APPS_RAM.map((a, i) => (
              <button key={a.n} type="button" className={TOOL_BTN} aria-pressed={s.act[i]} onClick={() => setS((x) => ({ ...x, act: x.act.map((v, k) => (k === i ? !v : v)) }))}>
                {a.n}
              </button>
            ))}
          </div>
        </>
      }
    >
      <Svg w={520} h={60} testId="ram" maxH={70}>
        <rect x={20} y={15} width={480} height={30} rx={6} fill="none" stroke={MANIM.muted} strokeWidth={2} />
        <rect x={20} y={15} width={Math.min(480, (e.pct / 100) * 480)} height={30} rx={6} fill={color} fillOpacity={0.6} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Memoria en uso">{f1(uso / 1024)} GB de {RAMS[s.ram]} GB</Stat>
        <Stat color={color} label="Ocupación">{fmtEs(e.pct, 0)} %</Stat>
        <Stat color={color} label="Estado">{e.estado}</Stat>
      </Readout>
      <Note>La memoria RAM guarda lo que se está usando ahora mismo; es muy rápida pero se vacía al apagar. Si se llena, el sistema operativo vuelca datos al disco, mucho más lento. El sistema operativo reparte la memoria y el procesador entre los programas.</Note>
    </Frame>
  );
}

/* ───────────── 2. Rutas de archivos ───────────── */

export function RutasExplorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.n, 1, 0, ARCHIVOS.length - 1)), c: Math.round(num(block.params?.a, 1, 0, CARPETAS_ORIGEN.length - 1)) };
  const [s, setS] = useState(init);
  const A = ARCHIVOS[s.f]!;
  const desde = CARPETAS_ORIGEN[s.c]!;
  const rel = rutaRelativa(desde, A.ruta);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un archivo y la carpeta en la que estás. Compara la ruta absoluta (desde el principio) con la relativa (desde donde estás)."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Archivo" items={ARCHIVOS.map((a, value) => ({ value, label: a.ruta.split("/").at(-1)! }))} value={s.f} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Choice label="Carpeta de trabajo" items={CARPETAS_ORIGEN.map((c, value) => ({ value, label: c }))} value={s.c} onChange={(c) => setS((x) => ({ ...x, c }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2 font-mono text-sm" data-testid="rutas">
        <div>
          <span className="text-[color:var(--stage-muted,#b8c2d0)]">Ruta absoluta: </span>
          <span style={{ color: MANIM.green }}>/{A.ruta}</span>
        </div>
        <div>
          <span className="text-[color:var(--stage-muted,#b8c2d0)]">Desde «{desde}»: </span>
          <span style={{ color: MANIM.yellow }}>{rel}</span>
        </div>
      </div>
      <Readout>
        <Stat color={MANIM.blue} label="Extensión">.{extension(A.ruta)}</Stat>
        <Stat color={MANIM.orange} label="Tipo de archivo">{A.tipo}</Stat>
        <Stat color={MANIM.green} label="Se abre con">{A.abre}</Stat>
      </Readout>
      <Note>La ruta absoluta nombra todas las carpetas desde la raíz; la relativa cuenta desde donde estás, y «..» significa subir a la carpeta superior. La extensión (.docx, .jpg…) indica el formato y, por tanto, qué programa lo abre.</Note>
    </Frame>
  );
}

/* ───────────── 3. Hoja de cálculo ───────────── */

export function HojaCalculoExplorador({ block }: { block: ToolBlock }) {
  const init = { cant: [6, 2, 1, 3], formulas: block.params?.n === 1 };
  const [s, setS] = useState(init);
  const t = totalesHoja(s.cant);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las cantidades y observa cómo se recalculan las celdas con fórmulas. Activa «Ver fórmulas» para ver lo que hay escrito en cada celda."}
      onReset={() => setS(init)}
      controls={
        <>
          {FILAS_HOJA.map((f, i) => (
            <Slider key={f.n} label={`Cantidad de ${f.n.toLowerCase()}`} value={s.cant[i]!} min={0} max={20} step={1} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, cant: x.cant.map((o, k) => (k === i ? v : o)) }))} />
          ))}
          <div className="sm:col-span-2">
            <button type="button" className={TOOL_BTN} aria-pressed={s.formulas} onClick={() => setS((x) => ({ ...x, formulas: !x.formulas }))}>
              {s.formulas ? "Ver valores" : "Ver fórmulas"}
            </button>
          </div>
        </>
      }
    >
      <table className="w-full border-collapse text-sm" data-testid="hoja">
        <thead>
          <tr className="text-[color:var(--stage-muted,#b8c2d0)]">
            <th className="border border-white/10 px-2 py-1"> </th>
            {["A · Concepto", "B · Cantidad", "C · Precio (€)", "D · Importe (€)"].map((h) => (
              <th key={h} className="border border-white/10 px-2 py-1 text-left font-normal">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {FILAS_HOJA.map((f, i) => (
            <tr key={f.n}>
              <td className="border border-white/10 px-2 py-1 text-[color:var(--stage-muted,#b8c2d0)]">{i + 2}</td>
              <td className="border border-white/10 px-2 py-1">{f.n}</td>
              <td className="border border-white/10 px-2 py-1">{s.cant[i]}</td>
              <td className="border border-white/10 px-2 py-1">{f2(f.p)}</td>
              <td className="border border-white/10 px-2 py-1" style={{ color: MANIM.green }}>
                {s.formulas ? `=B${i + 2}*C${i + 2}` : f2(f.p * s.cant[i]!)}
              </td>
            </tr>
          ))}
          <tr>
            <td className="border border-white/10 px-2 py-1 text-[color:var(--stage-muted,#b8c2d0)]">6</td>
            <td className="border border-white/10 px-2 py-1 font-bold" colSpan={3}>
              Subtotal
            </td>
            <td className="border border-white/10 px-2 py-1" style={{ color: MANIM.yellow }}>
              {s.formulas ? "=SUMA(D2:D5)" : f2(t.sub)}
            </td>
          </tr>
          <tr>
            <td className="border border-white/10 px-2 py-1 text-[color:var(--stage-muted,#b8c2d0)]">7</td>
            <td className="border border-white/10 px-2 py-1 font-bold" colSpan={3}>
              Total con IVA (21 %)
            </td>
            <td className="border border-white/10 px-2 py-1" style={{ color: MANIM.yellow }}>
              {s.formulas ? "=E6*1,21" : f2(t.total)}
            </td>
          </tr>
        </tbody>
      </table>
      <Note>Una fórmula empieza por «=» y usa referencias a celdas (B2, C2…): si cambia una celda, todo lo que depende de ella se recalcula solo. Por eso la hoja de cálculo es ideal para presupuestos y tablas de datos.</Note>
    </Frame>
  );
}

/* ───────────── 4. Tamaño de una imagen según el formato ───────────── */

export function FormatoImagenExplorador({ block }: { block: ToolBlock }) {
  const init = { w: Math.round(num(block.params?.a, 1920, 320, 4000) / 10) * 10, h: Math.round(num(block.params?.b, 1080, 240, 3000) / 10) * 10, f: 0 };
  const [s, setS] = useState(init);
  const mb = tamanoImagenMB(s.w, s.h, s.f);
  const porGb = mb > 0 ? Math.floor(1024 / mb) : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia las dimensiones de la imagen y el formato. Compara cuánto ocupa y cuántas fotos caben en 1 GB."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Formato" items={FORMATOS_IMG.map((x, value) => ({ value, label: x.n }))} value={s.f} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Slider label="Ancho" value={s.w} min={320} max={4000} step={10} unit=" px" color={MANIM.blue} onChange={(w) => setS((x) => ({ ...x, w }))} />
          <Slider label="Alto" value={s.h} min={240} max={3000} step={10} unit=" px" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Píxeles">{f1((s.w * s.h) / 1e6)} megapíxeles</Stat>
        <Stat color={MANIM.green} label="Tamaño aproximado">{mb < 1 ? `${fmtEs(mb * 1024, 0)} KB` : `${f2(mb)} MB`}</Stat>
        <Stat color={MANIM.yellow} label="Imágenes en 1 GB">{fmtEs(porGb, 0)}</Stat>
      </Readout>
      <Note>Cada píxel guarda su color con 3 bytes (rojo, verde y azul). Sin comprimir (BMP) el tamaño es ancho × alto × 3 bytes; PNG comprime sin perder calidad y JPEG comprime mucho más descartando detalles poco visibles. Los valores son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 5. Subir a la nube ───────────── */

export function SubidaNubeExplorador({ block }: { block: ToolBlock }) {
  const init = { gb: Math.round(num(block.params?.a, 50, 1, 500)), mbps: Math.round(num(block.params?.b, 20, 5, 300) / 5) * 5 };
  const [s, setS] = useState(init);
  const seg = segundosSubida(s.gb, s.mbps);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Calcula cuánto tarda una copia de seguridad en subirse a la nube. La subida suele ser bastante más lenta que la bajada."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Datos a subir" value={s.gb} min={1} max={500} step={1} unit=" GB" color={MANIM.blue} onChange={(gb) => setS((x) => ({ ...x, gb }))} />
          <Slider label="Velocidad de subida" value={s.mbps} min={5} max={300} step={5} unit=" Mbps" color={MANIM.orange} onChange={(mbps) => setS((x) => ({ ...x, mbps }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Datos">{s.gb} GB = {fmtEs(s.gb * 8000, 0)} megabits</Stat>
        <Stat color={MANIM.green} label="Tiempo de subida">{formatoTiempo(seg)}</Stat>
      </Readout>
      <Note>1 byte son 8 bits: una velocidad de 20 megabits por segundo (Mbps) equivale a 2,5 megabytes por segundo. Tiempo = datos en megabits ÷ velocidad. En la primera copia conviene subir solo lo importante.</Note>
    </Frame>
  );
}

/* ───────────── 6. Tiempo de pantalla ───────────── */

export function TiempoPantallaExplorador({ block }: { block: ToolBlock }) {
  const init = { h: [2, 1.5, 1, 1, 1].map((v, i) => (i === 1 ? Math.round(num(block.params?.a, 1.5, 0, 8) * 2) / 2 : v)) };
  const [s, setS] = useState(init);
  const r = resumenPantalla(s.h);
  const col = r.ocio <= 2 ? MANIM.green : r.ocio <= 4 ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Anota las horas al día que dedicas a cada actividad con pantallas. Los valores de referencia son orientativos: lo importante es el equilibrio."}
      onReset={() => setS(init)}
      controls={
        <>
          {ACTIVIDADES_PANTALLA.map((a, i) => (
            <Slider key={a} label={a} value={s.h[i]!} min={0} max={8} step={0.5} unit=" h/día" color={MANIM.blue} format={(v) => fmtEs(v, 1)} onChange={(v) => setS((x) => ({ h: x.h.map((o, k) => (k === i ? v : o)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={50} testId="pantalla" maxH={60}>
        <rect x={20} y={12} width={480} height={26} rx={6} fill="none" stroke={MANIM.muted} strokeWidth={2} />
        <rect x={20} y={12} width={Math.min(480, (r.total / 15) * 480)} height={26} rx={6} fill={col} fillOpacity={0.55} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Total con pantallas">{f1(r.total)} h/día</Stat>
        <Stat color={MANIM.orange} label="De ocio (sin estudio)">{f1(r.ocio)} h/día</Stat>
        <Stat color={MANIM.yellow} label="Del tiempo despierto (15 h)">{fmtEs(r.pctVigilia, 0)} %</Stat>
        <Stat color={col} label="Valoración">{r.aviso}</Stat>
      </Readout>
      <Note>El bienestar digital consiste en usar la tecnología con intención: pausas cada hora, sin pantallas justo antes de dormir y con tiempo para el deporte, la familia y las amistades. Las cifras de la valoración son solo una guía.</Note>
    </Frame>
  );
}
