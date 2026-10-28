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

/** Un rectángulo en un croquis tiene 4 vértices libres: 8 grados de libertad. Cada restricción quita los suyos: horizontal o vertical de un lado (1), cota (1), fijar un vértice (2), fijar el centro de un agujero (2) y su diámetro (1). */
export const GDL_RECTANGULO = 8;
export type Restricciones = { horizontales: number; verticales: number; cotas: number; fijos: number };
export function estadoCroquis(r: Restricciones, conAgujero = false) {
  const total = GDL_RECTANGULO + (conAgujero ? 3 : 0);
  const quitados = r.horizontales + r.verticales + r.cotas + 2 * r.fijos;
  const libres = total - quitados;
  return { total, quitados, libres, estado: libres > 0 ? "infradefinido" : libres === 0 ? "totalmente definido" : "sobredefinido" };
}

/** Perfil en L de ancho a, alto b y espesor t (mm): área de la sección. */
export const areaPerfilL = (a: number, b: number, t: number) => {
  const tt = Math.min(t, a, b);
  return tt * (a + b - tt);
};
/** Pieza extruida a lo largo de c: volumen (cm³) y masa (g) con densidad g/cm³; las medidas en mm. */
export function piezaExtruida(a: number, b: number, t: number, c: number, densidad: number) {
  const vol = (areaPerfilL(a, b, t) * c) / 1000;
  return { volumen: vol, masa: vol * densidad };
}
export const DENSIDADES = { acero: 7.85, aluminio: 2.7, plastico: 1.2 } as const;

/* ───────────── 1. Croquis con restricciones ───────────── */

export function CroquisRestriccionesDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { h: Math.round(num(block.params?.a, 1, 0, 2)), v: Math.round(num(block.params?.b, 1, 0, 2)), c: 1, f: 0, agujero: false };
  const [s, setS] = useState(init);
  const r: Restricciones = { horizontales: s.h, verticales: s.v, cotas: s.c, fijos: s.f };
  const e = estadoCroquis(r, s.agujero);
  const color = e.libres === 0 ? MANIM.green : e.libres > 0 ? MANIM.yellow : MANIM.red;
  // la figura se deforma tanto más cuanto menos restringida está
  const sesgo = Math.max(0, 2 - s.h - s.v) * 10;
  const P: Pt[] = [[150, 60], [330 + sesgo, 60 - sesgo / 2], [330 + sesgo, 190], [150, 190 + sesgo / 2]];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada restricción elimina grados de libertad; el croquis está totalmente definido cuando no quedan libres."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lados horizontales (restricción)" value={s.h} min={0} max={2} step={1} color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Slider label="Lados verticales (restricción)" value={s.v} min={0} max={2} step={1} color={MANIM.blue} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Cotas (ancho, alto)" value={s.c} min={0} max={3} step={1} color={MANIM.orange} onChange={(c) => setS((o) => ({ ...o, c }))} />
          <Slider label="Vértices fijados al origen" value={s.f} min={0} max={2} step={1} color={MANIM.purple} onChange={(f) => setS((o) => ({ ...o, f }))} />
          <Choice label="Elementos del croquis" items={[{ value: "no", label: "Solo el rectángulo" }, { value: "si", label: "Rectángulo y agujero" }]} value={s.agujero ? "si" : "no"} onChange={(v) => setS((o) => ({ ...o, agujero: v === "si" }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="croquis-restricciones" maxH={270}>
        <polygon points={P.map((p) => p.join(",")).join(" ")} fill={color} fillOpacity={0.12} stroke={color} strokeWidth={3} strokeLinejoin="round" />
        {P.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r={5} fill={i < s.f ? MANIM.purple : MANIM.ink} />)}
        {s.agujero ? <circle cx={240 + sesgo / 2} cy={125} r={30} fill="none" stroke={color} strokeWidth={2.5} strokeDasharray={e.libres > 0 ? "6 4" : undefined} /> : null}
        {s.h > 0 ? <Seg a={[150, 60]} b={[330, 60]} color={MANIM.blue} width={0.8} dashed /> : null}
        {s.v > 0 ? <Seg a={[150, 60]} b={[150, 190]} color={MANIM.blue} width={0.8} dashed /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.muted} label="Grados de libertad iniciales">{`${e.total}`}</Stat>
        <Stat color={MANIM.blue} label="Eliminados por las restricciones">{`${e.quitados}`}</Stat>
        <Stat color={color} label="Libres">{`${e.libres}`}</Stat>
        <Stat color={color} label="Estado del croquis">{e.estado}</Stat>
      </Readout>
      <Note>En el <b>modelado paramétrico</b> se parte de un <b>croquis</b> 2D cuyos elementos se controlan con <b>restricciones</b> (horizontal, vertical, paralelo, tangente, coincidente…) y <b>cotas</b> (dimensiones). Un rectángulo suelto tiene <b>8 grados de libertad</b> (dos por vértice). Cada restricción elimina los suyos: una horizontal o vertical, <b>uno</b>; una cota, <b>uno</b>; fijar un vértice, <b>dos</b>. Con <b>cero libres</b> el croquis está <b>totalmente definido</b> y es predecible; con restricciones de más (<b>sobredefinido</b>) hay conflicto. Al cambiar una cota, todo el modelo se <b>recalcula</b>.</Note>
    </Frame>
  );
}

/* ───────────── 2. De la pieza 3D a las vistas ───────────── */

const MAT = [
  { value: "acero", label: "Acero" },
  { value: "aluminio", label: "Aluminio" },
  { value: "plastico", label: "Plástico" },
] as const;

export function ModeloAVistasDt2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 60, 30, 80)), b: Math.round(num(block.params?.b, 50, 30, 80)), t: Math.round(num(block.params?.c, 10, 4, 20)), c: 40, m: "acero" as keyof typeof DENSIDADES };
  const [s, setS] = useState(init);
  const t = Math.min(s.t, s.a - 1, s.b - 1);
  const k = 1.5;
  const pieza = piezaExtruida(s.a, s.b, t, s.c, DENSIDADES[s.m]);
  const R = (x: number, y: number, w: number, h: number, c: string, op = 0.14) => <rect x={x} y={y} width={w} height={h} fill={c} fillOpacity={op} stroke={MANIM.ink} strokeWidth={2.5} />;
  const x1 = 40;
  const base = 210;
  const x2 = x1 + s.a * k + 40;
  const x3 = x2 + s.c * k + 40;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un programa CAD genera las vistas del plano directamente del modelo 3D: al cambiar una cota, todas se actualizan."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ancho a" value={s.a} min={30} max={80} step={5} unit=" mm" color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Alto b" value={s.b} min={30} max={80} step={5} unit=" mm" color={MANIM.blue} onChange={(b) => setS((o) => ({ ...o, b }))} />
          <Slider label="Espesor t" value={t} min={4} max={20} step={2} unit=" mm" color={MANIM.green} onChange={(tt) => setS((o) => ({ ...o, t: tt }))} />
          <Slider label="Longitud de extrusión c" value={s.c} min={20} max={80} step={5} unit=" mm" color={MANIM.purple} onChange={(c) => setS((o) => ({ ...o, c }))} />
          <Choice label="Material" items={MAT} value={s.m} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={520} h={250} testId="modelo-a-vistas" maxH={270}>
        <polygon points={[[x1, base], [x1 + s.a * k, base], [x1 + s.a * k, base - t * k], [x1 + t * k, base - t * k], [x1 + t * k, base - s.b * k], [x1, base - s.b * k]].map((p) => p.join(",")).join(" ")} fill={MANIM.blue} fillOpacity={0.16} stroke={MANIM.ink} strokeWidth={2.5} strokeLinejoin="round" />
        <text x={x1} y={base + 20} fill={MANIM.muted} fontSize={12}>Alzado</text>
        {R(x2, base - s.b * k, s.c * k, s.b * k, MANIM.green)}
        <Seg a={[x2, base - t * k]} b={[x2 + s.c * k, base - t * k]} color={MANIM.ink} width={2.5} />
        <text x={x2} y={base + 20} fill={MANIM.muted} fontSize={12}>Perfil</text>
        {R(x3, base - s.c * k, s.a * k, s.c * k, MANIM.orange)}
        <Seg a={[x3 + t * k, base]} b={[x3 + t * k, base - s.c * k]} color={MANIM.ink} width={2.5} />
        <text x={x3} y={base + 20} fill={MANIM.muted} fontSize={12}>Planta</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Área de la sección">{f1(areaPerfilL(s.a, s.b, t))} mm²</Stat>
        <Stat color={MANIM.green} label="Volumen">{f2(pieza.volumen)} cm³</Stat>
        <Stat color={MANIM.orange} label="Masa">{f1(pieza.masa)} g</Stat>
      </Readout>
      <Note>En el <b>CAD 3D</b> se modela <b>una sola vez</b> la pieza (aquí, un perfil en L <b>extruido</b>) y el programa <b>deduce</b> las vistas: alzado, perfil y planta, con sus aristas visibles. Si cambias una <b>cota</b> o el <b>material</b>, todas las vistas y las <b>propiedades físicas</b> (volumen, masa, centro de gravedad) se <b>actualizan solas</b>: no hay que redibujar. El mismo modelo sirve para <b>planos de taller</b>, <b>simulaciones</b>, <b>impresión 3D</b> o <b>mecanizado CNC</b>.</Note>
    </Frame>
  );
}
