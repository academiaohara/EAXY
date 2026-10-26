"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── 10.1 CAD 2D: una placa con una matriz de agujeros ───────────── */

/** Posiciones (mm) de los centros de una matriz de agujeros entre márgenes iguales. */
export function centrosAgujeros(largo: number, ancho: number, margen: number, cols: number, filas: number): [number, number][] {
  const out: [number, number][] = [];
  for (let j = 0; j < filas; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      out.push([cols === 1 ? largo / 2 : margen + (i * (largo - 2 * margen)) / (cols - 1), filas === 1 ? ancho / 2 : margen + (j * (ancho - 2 * margen)) / (filas - 1)]);
    }
  }
  return out;
}

/** Comprueba la regla del taller: separación entre bordes ≥ medio diámetro y margen al borde ≥ diámetro. */
export function revisaPlaca(largo: number, ancho: number, d: number, margen: number, cols: number, filas: number) {
  const px = cols > 1 ? (largo - 2 * margen) / (cols - 1) : Infinity;
  const py = filas > 1 ? (ancho - 2 * margen) / (filas - 1) : Infinity;
  const paso = Math.min(px, py);
  const entre = paso - d;
  const bordeOk = margen - d / 2 >= d / 2;
  const entreOk = entre >= d / 2;
  const cabe = margen * 2 + d <= Math.min(largo, ancho) + 0.001;
  return { paso, entre, bordeOk, entreOk, cabe, ok: bordeOk && entreOk && cabe };
}

export function CadPlacaExplorador({ block }: { block: ToolBlock }) {
  const init = { L: Math.round(num(block.params?.a, 120, 60, 200)), W: Math.round(num(block.params?.b, 70, 40, 120)), d: 8, m: 15, cols: 4, filas: 2 };
  const [s, setS] = useState(init);
  const centros = centrosAgujeros(s.L, s.W, s.m, s.cols, s.filas);
  const r = revisaPlaca(s.L, s.W, s.d, s.m, s.cols, s.filas);
  const k = Math.min(440 / s.L, 230 / s.W);
  const x0 = 40;
  const y0 = 30;
  const aguj = centros.length;
  const areaNeta = s.L * s.W - aguj * Math.PI * (s.d / 2) ** 2;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un programa de CAD repite elementos con una «matriz». Cambia las dimensiones y comprueba si la placa cumple las reglas del taller."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Largo de la placa" value={s.L} min={60} max={200} step={5} unit=" mm" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Ancho de la placa" value={s.W} min={40} max={120} step={5} unit=" mm" color={MANIM.green} onChange={(W) => setS((x) => ({ ...x, W }))} />
          <Slider label="Diámetro de los agujeros" value={s.d} min={4} max={20} step={1} unit=" mm" color={MANIM.orange} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Margen hasta el primer centro" value={s.m} min={5} max={40} step={1} unit=" mm" color={MANIM.yellow} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Columnas de la matriz" value={s.cols} min={1} max={8} step={1} color={MANIM.purple} onChange={(cols) => setS((x) => ({ ...x, cols }))} />
          <Slider label="Filas de la matriz" value={s.filas} min={1} max={5} step={1} color={MANIM.purple} onChange={(filas) => setS((x) => ({ ...x, filas }))} />
        </>
      }
    >
      <Svg w={520} h={290} testId="cad-placa" maxH={300}>
        <rect x={x0} y={y0} width={s.L * k} height={s.W * k} fill={MANIM.blue} fillOpacity={0.12} stroke={r.ok ? MANIM.ink : MANIM.red} strokeWidth={3} />
        {centros.map(([cx, cy], i) => (
          <circle key={i} cx={x0 + cx * k} cy={y0 + cy * k} r={(s.d / 2) * k} fill={MANIM.surface} stroke={r.ok ? MANIM.ink : MANIM.red} strokeWidth={2.5} />
        ))}
        <line x1={x0} y1={y0 + s.W * k + 22} x2={x0 + s.L * k} y2={y0 + s.W * k + 22} stroke={MANIM.yellow} strokeWidth={2} />
        <text x={x0 + (s.L * k) / 2} y={y0 + s.W * k + 18} fill={MANIM.yellow} fontSize={13} textAnchor="middle">
          {s.L}
        </text>
        <text x={x0 + s.L * k + 14} y={y0 + (s.W * k) / 2} fill={MANIM.yellow} fontSize={13}>
          {s.W}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Agujeros">
          {aguj}
        </Stat>
        <Stat color={MANIM.blue} label="Separación entre centros">
          {r.paso === Infinity ? "—" : `${f1(r.paso)} mm`}
        </Stat>
        <Stat color={MANIM.green} label="Área de material">
          {f0(areaNeta)} mm²
        </Stat>
        <Stat color={r.ok ? MANIM.green : MANIM.red} label="Revisión">
          {r.ok ? "Cumple las reglas" : !r.cabe ? "No caben en la placa" : !r.bordeOk ? "Agujeros muy cerca del borde" : "Agujeros demasiado juntos"}
        </Stat>
      </Readout>
      <Note>Reglas de taller (orientativas): entre dos agujeros debe quedar al menos medio diámetro de material, y el borde del agujero no debe estar más cerca del canto que medio diámetro. El CAD calcula las posiciones solo y permite modificar un parámetro y rehacer todo el dibujo.</Note>
    </Frame>
  );
}

/* ───────────── 10.2 CAD 3D: extrusión de un perfil ───────────── */

export const PERFILES_3D = ["Cuadrado", "Círculo", "Triángulo", "Hexágono", "Perfil en L"] as const;
export const MATERIALES_3D = [
  { n: "Madera de pino", rho: 0.5 },
  { n: "PLA (impresión 3D)", rho: 1.24 },
  { n: "Aluminio", rho: 2.7 },
  { n: "Acero", rho: 7.85 },
] as const;

/** Puntos del perfil (en cm), centrado aproximadamente en el origen. */
export function puntosPerfil(tipo: number, a: number): [number, number][] {
  const r = a / 2;
  if (tipo === 0) return [[-r, -r], [r, -r], [r, r], [-r, r]];
  if (tipo === 1) return Array.from({ length: 24 }, (_, i) => [r * Math.cos((i * 2 * Math.PI) / 24), r * Math.sin((i * 2 * Math.PI) / 24)] as [number, number]);
  if (tipo === 2) return [0, 1, 2].map((i) => [r * Math.cos((Math.PI / 2) + (i * 2 * Math.PI) / 3) * 1.15, -r * Math.sin((Math.PI / 2) + (i * 2 * Math.PI) / 3) * 1.15] as [number, number]);
  if (tipo === 3) return Array.from({ length: 6 }, (_, i) => [r * Math.cos((i * Math.PI) / 3), r * Math.sin((i * Math.PI) / 3)] as [number, number]);
  const t = a / 3;
  return [[-r, -r], [r, -r], [r, -r + t], [-r + t, -r + t], [-r + t, r], [-r, r]];
}

/** Área del perfil en cm², con `a` en cm. */
export function areaPerfil(tipo: number, a: number): number {
  if (tipo === 0) return a * a;
  if (tipo === 1) return Math.PI * (a / 2) ** 2;
  if (tipo === 2) return (Math.sqrt(3) / 4) * a * a;
  if (tipo === 3) return ((3 * Math.sqrt(3)) / 2) * (a / 2) ** 2;
  return a * a - ((2 * a) / 3) ** 2;
}

export function ExtrusionExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.n, 4, 0, 4)), a: Math.round(num(block.params?.a, 4, 2, 8)), h: Math.round(num(block.params?.b, 6, 1, 15)), m: 1 };
  const [s, setS] = useState(init);
  const pts = puntosPerfil(s.p, s.a);
  const area = areaPerfil(s.p, s.a);
  const vol = area * s.h;
  const masa = vol * MATERIALES_3D[s.m]!.rho;
  const u = 14;
  const ox = 260;
  const oy = 220;
  const P = (x: number, y: number, z: number) => [ox + (x - y) * u * 0.866, oy - (x + y) * u * 0.5 - z * u * 1.0] as const;
  const top = pts.map(([x, y]) => P(x, y, s.h * 0.7));
  const caras = pts
    .map((p, i) => {
      const q = pts[(i + 1) % pts.length]!;
      return { a: p, b: q, prof: (p[0] + q[0] + p[1] + q[1]) / 2 };
    })
    .sort((m, n) => n.prof - m.prof);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Extruir es dar altura a un perfil 2D para obtener un sólido. Cambia el perfil, sus medidas, la altura y el material y mira el volumen y la masa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Perfil" items={PERFILES_3D.map((x, i) => ({ value: i, label: x }))} value={s.p} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Choice label="Material" items={MATERIALES_3D.map((x, i) => ({ value: i, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Tamaño del perfil" value={s.a} min={2} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Slider label="Altura de la extrusión" value={s.h} min={1} max={15} step={1} unit=" cm" color={MANIM.green} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={260} testId="extrusion" maxH={270}>
        {caras.map((c, i) => {
          const A = P(c.a[0], c.a[1], 0);
          const B = P(c.b[0], c.b[1], 0);
          const C = P(c.b[0], c.b[1], s.h * 0.7);
          const D = P(c.a[0], c.a[1], s.h * 0.7);
          return <polygon key={i} points={[A, B, C, D].map((p) => p.join(",")).join(" ")} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.surface} strokeWidth={1} />;
        })}
        <polygon points={top.map((p) => p.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.55} stroke={MANIM.ink} strokeWidth={2} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Área del perfil">
          {f1(area)} cm²
        </Stat>
        <Stat color={MANIM.green} label="Volumen (área × altura)">
          {f1(vol)} cm³
        </Stat>
        <Stat color={MANIM.orange} label={`Masa de ${MATERIALES_3D[s.m]!.n.toLowerCase()}`}>
          {masa >= 1000 ? `${f1(masa / 1000)} kg` : `${f0(masa)} g`}
        </Stat>
      </Readout>
      <Note>Un modelador 3D parte de un croquis 2D con cotas y le aplica operaciones: extrusión, revolución, agujeros o chaflanes. Con el volumen y la densidad del material se estima su masa antes de fabricar la pieza.</Note>
    </Frame>
  );
}

/* ───────────── 10.3 Una diapositiva legible ───────────── */

/** Luminancia relativa de un color hexadecimal (WCAG). */
export function luminancia(hex: string): number {
  const c = hex.replace("#", "");
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(c.slice(i, i + 2), 16) / 255).map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4)) as [number, number, number];
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** Relación de contraste entre dos colores (de 1 a 21). */
export function contraste(a: string, b: string): number {
  const [l1, l2] = [luminancia(a), luminancia(b)].sort((x, y) => y - x) as [number, number];
  return (l1 + 0.05) / (l2 + 0.05);
}

export const PARES_COLOR = [
  { n: "Blanco sobre azul oscuro", t: "#ffffff", f: "#0b2a5b" },
  { n: "Negro sobre blanco", t: "#111111", f: "#ffffff" },
  { n: "Gris claro sobre blanco", t: "#cfcfcf", f: "#ffffff" },
  { n: "Amarillo sobre blanco", t: "#f5e663", f: "#ffffff" },
  { n: "Rojo sobre verde", t: "#d42020", f: "#2a8c2a" },
] as const;

export function DiapositivaLegibleExplorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.n, 2, 0, PARES_COLOR.length - 1)), pt: Math.round(num(block.params?.a, 14, 10, 60)), pal: 90 };
  const [s, setS] = useState(init);
  const par = PARES_COLOR[s.c]!;
  const ratio = contraste(par.t, par.f);
  const okColor = ratio >= 4.5;
  const okTam = s.pt >= 24;
  const okPal = s.pal <= 50;
  const todo = okColor && okTam && okPal;
  const texto = "Una buena diapositiva resume la idea principal con pocas palabras y letra grande. ".repeat(6).split(" ").slice(0, s.pal).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una diapositiva se debe leer desde el fondo del aula: letra grande, buen contraste y pocas palabras. Ajusta los tres factores."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Colores (texto sobre fondo)" items={PARES_COLOR.map((x, i) => ({ value: i, label: x.n }))} value={s.c} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Tamaño de letra" value={s.pt} min={10} max={60} step={2} unit=" pt" color={MANIM.blue} onChange={(pt) => setS((x) => ({ ...x, pt }))} />
          <Slider label="Número de palabras" value={s.pal} min={10} max={150} step={5} color={MANIM.orange} onChange={(pal) => setS((x) => ({ ...x, pal }))} />
        </>
      }
    >
      <div className="mx-auto aspect-video w-full max-w-md overflow-hidden rounded-md border border-[color:var(--stage-border,#3d4f66)] p-3" style={{ background: par.f, color: par.t, fontSize: `${s.pt * 0.32}px`, lineHeight: 1.25 }} data-testid="diapositiva">
        <p className="font-bold">Título de la diapositiva</p>
        <p>{texto}</p>
      </div>
      <Readout>
        <Stat color={okColor ? MANIM.green : MANIM.red} label="Contraste (mínimo 4,5)">
          {f1(ratio)}:1
        </Stat>
        <Stat color={okTam ? MANIM.green : MANIM.red} label="Letra (mínimo 24 pt)">
          {s.pt} pt
        </Stat>
        <Stat color={okPal ? MANIM.green : MANIM.red} label="Palabras (máximo 50)">
          {s.pal}
        </Stat>
        <Stat color={todo ? MANIM.green : MANIM.yellow} label="Valoración">
          {todo ? "Legible y accesible" : "Hay que mejorarla"}
        </Stat>
      </Readout>
      <Note>El contraste se calcula con la luminancia de los dos colores: una relación mínima de 4,5 a 1 hace el texto legible para la mayoría de las personas, incluidas las que tienen baja visión. Los gráficos y vídeos también necesitan texto alternativo y subtítulos.</Note>
    </Frame>
  );
}

/* ───────────── 10.4 Un clasificador que aprende con ejemplos ───────────── */

type Punto = { x: number; y: number; c: 0 | 1 };
/** Manzanas (0): cortas y rojas. Plátanos (1): largos y amarillos. */
export const ENTRENAMIENTO: Punto[] = [
  { x: 3, y: 1, c: 0 }, { x: 4, y: 2, c: 0 }, { x: 3.5, y: 3, c: 0 }, { x: 4.5, y: 1.5, c: 0 }, { x: 5, y: 3, c: 0 }, { x: 2.5, y: 2, c: 0 }, { x: 4, y: 3.5, c: 0 }, { x: 3, y: 2.5, c: 0 },
  { x: 8, y: 8, c: 1 }, { x: 7.5, y: 7, c: 1 }, { x: 9, y: 8.5, c: 1 }, { x: 8.5, y: 6.5, c: 1 }, { x: 7, y: 7.5, c: 1 }, { x: 9, y: 7, c: 1 }, { x: 8, y: 9, c: 1 }, { x: 7.5, y: 8.5, c: 1 },
];
export const PRUEBA: Punto[] = [
  { x: 3.8, y: 2.2, c: 0 }, { x: 4.8, y: 3.8, c: 0 }, { x: 2.8, y: 1.2, c: 0 }, { x: 5.5, y: 4, c: 0 },
  { x: 8.2, y: 7.6, c: 1 }, { x: 7.2, y: 6.8, c: 1 }, { x: 8.8, y: 8.8, c: 1 }, { x: 6.8, y: 6.5, c: 1 },
];

/** Entrena con los primeros `n0` ejemplos de manzana y `n1` de plátano (centroides) y devuelve el acierto sobre la prueba. */
export function entrena(n0: number, n1: number) {
  const m = (c: 0 | 1, n: number) => {
    const xs = ENTRENAMIENTO.filter((p) => p.c === c).slice(0, n);
    return xs.length ? { x: xs.reduce((a, p) => a + p.x, 0) / xs.length, y: xs.reduce((a, p) => a + p.y, 0) / xs.length } : null;
  };
  const c0 = m(0, n0);
  const c1 = m(1, n1);
  const predice = (p: Punto): 0 | 1 => {
    if (!c0 && !c1) return 0;
    if (!c0) return 1;
    if (!c1) return 0;
    const d0 = (p.x - c0.x) ** 2 + (p.y - c0.y) ** 2;
    const d1 = (p.x - c1.x) ** 2 + (p.y - c1.y) ** 2;
    return d0 <= d1 ? 0 : 1;
  };
  const aciertos = PRUEBA.filter((p) => predice(p) === p.c).length;
  return { c0, c1, predice, aciertos };
}

export function ClasificadorIaExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 2, 0, 8)), sesgo: false };
  const [s, setS] = useState(init);
  const n0 = s.n;
  const n1 = s.sesgo ? 0 : s.n;
  const m = entrena(n0, n1);
  const X = (v: number) => 30 + v * 46;
  const Y = (v: number) => 210 - v * 18;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El modelo aprende de ejemplos. Dale más ejemplos y mira cómo mejora; luego usa datos sesgados (sin plátanos) y observa el error."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ejemplos de entrenamiento por fruta" value={s.n} min={0} max={8} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Choice label="Datos de entrenamiento" items={[{ value: 0, label: "Equilibrados (manzanas y plátanos)" }, { value: 1, label: "Sesgados (solo manzanas)" }]} value={s.sesgo ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, sesgo: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="clasificador" maxH={250}>
        <rect x={20} y={10} width={480} height={205} rx={8} fill={MANIM.panel} />
        <text x={260} y={236} fill={MANIM.muted} fontSize={12} textAnchor="middle">
          longitud →
        </text>
        <text x={12} y={120} fill={MANIM.muted} fontSize={12} transform="rotate(-90 12 120)" textAnchor="middle">
          amarillo →
        </text>
        {ENTRENAMIENTO.map((p, i) => {
          const idx = ENTRENAMIENTO.filter((q) => q.c === p.c).indexOf(p);
          const usado = idx < (p.c === 0 ? n0 : n1);
          return <circle key={i} cx={X(p.x)} cy={Y(p.y)} r={6} fill={p.c === 0 ? MANIM.red : MANIM.yellow} fillOpacity={usado ? 1 : 0.15} stroke={MANIM.ink} strokeWidth={usado ? 1.5 : 0} />;
        })}
        {PRUEBA.map((p, i) => {
          const ok = m.predice(p) === p.c;
          return <rect key={i} x={X(p.x) - 6} y={Y(p.y) - 6} width={12} height={12} fill="none" stroke={ok ? MANIM.green : MANIM.red} strokeWidth={3} />;
        })}
        {m.c0 ? <text x={X(m.c0.x)} y={Y(m.c0.y) + 5} fill={MANIM.ink} fontSize={14} textAnchor="middle">×</text> : null}
        {m.c1 ? <text x={X(m.c1.x)} y={Y(m.c1.y) + 5} fill={MANIM.ink} fontSize={14} textAnchor="middle">×</text> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Ejemplos usados">
          {n0 + n1}
        </Stat>
        <Stat color={m.aciertos >= 7 ? MANIM.green : m.aciertos >= 5 ? MANIM.yellow : MANIM.red} label="Aciertos en 8 frutas nuevas">
          {m.aciertos} de 8
        </Stat>
      </Readout>
      <Note>Círculos: ejemplos con los que se entrena (rojo: manzanas; amarillo: plátanos). Cuadrados: frutas nuevas que el modelo debe clasificar (verde si acierta, rojo si falla). Un sistema de IA solo sabe lo que ha visto: si los datos son pobres o sesgados, comete errores y puede ser injusto.</Note>
    </Frame>
  );
}

/* ───────────── 10.5 Anatomía de una aplicación sencilla (eventos) ───────────── */

export const EVENTOS = [
  { n: "Cuando se pulse el botón «Tirar el dado»", a: "Elegir un número al azar del 1 al 6 y mostrarlo en pantalla." },
  { n: "Cuando se pulse el botón «Reiniciar»", a: "Poner el contador a 0 y borrar el resultado anterior." },
  { n: "Cuando el sensor detecte una sacudida", a: "Tirar el dado sin tocar la pantalla." },
] as const;

export function AppEventosExplorador({ block }: { block: ToolBlock }) {
  const init = { ev: -1, veces: 0, ultimo: 0 };
  const [s, setS] = useState(init);
  const dispara = (i: number) =>
    setS((x) => {
      if (i === 1) return { ev: i, veces: 0, ultimo: 0 };
      const val = ((x.veces * 5 + 3) % 6) + 1;
      return { ev: i, veces: x.veces + 1, ultimo: val };
    });
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una aplicación reacciona a eventos. Provoca cada evento y mira qué acción ejecuta el programa."}
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-col gap-2 sm:col-span-2" role="group" aria-label="Eventos">
          {EVENTOS.map((e, i) => (
            <button key={e.n} type="button" className={`${TOOL_BTN} text-left ${s.ev === i ? "bg-white/15" : ""}`} onClick={() => dispara(i)}>
              {e.n}
            </button>
          ))}
        </div>
      }
    >
      <div className="mx-auto flex h-32 w-48 flex-col items-center justify-center rounded-2xl border-4 border-[color:var(--stage-border,#3d4f66)] text-[color:var(--stage-ink,#fff)]" data-testid="app-movil">
        <span className="text-5xl font-bold tabular-nums" style={{ color: MANIM.yellow }}>
          {s.ultimo === 0 ? "—" : s.ultimo}
        </span>
        <span className="mt-1 text-xs text-[color:var(--stage-muted,#b8c2d0)]">Tiradas: {s.veces}</span>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Acción ejecutada">
          {s.ev < 0 ? "ninguna: espera un evento" : EVENTOS[s.ev]!.a}
        </Stat>
      </Readout>
      <Note>Una app tiene una interfaz (lo que se ve) y una lógica (lo que ocurre). La lógica se programa con eventos («cuando…») y acciones. Herramientas como App Inventor o Scratch permiten crearla con bloques.</Note>
    </Frame>
  );
}
