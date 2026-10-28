"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export type Clase = "elemento" | "compuesto" | "homogenea" | "heterogenea";
export const MATERIALES: Record<string, { nombre: string; clase: Clase; nota: string }> = {
  oxigeno: { nombre: "Oxígeno (O₂)", clase: "elemento", nota: "Formado por un solo tipo de átomo." },
  hierro: { nombre: "Hierro (Fe)", clase: "elemento", nota: "Un solo tipo de átomo: no se puede descomponer." },
  agua: { nombre: "Agua destilada (H₂O)", clase: "compuesto", nota: "Hidrógeno y oxígeno unidos en proporción fija." },
  sal: { nombre: "Sal común (NaCl)", clase: "compuesto", nota: "Sodio y cloro en proporción fija." },
  aire: { nombre: "Aire", clase: "homogenea", nota: "Mezcla de gases (N₂, O₂, Ar…): una sola fase." },
  salada: { nombre: "Agua con sal disuelta", clase: "homogenea", nota: "Disolución: no se distinguen los componentes." },
  bronce: { nombre: "Bronce", clase: "homogenea", nota: "Aleación de cobre y estaño: mezcla homogénea de sólidos." },
  granito: { nombre: "Granito", clase: "heterogenea", nota: "Se distinguen cristales de distintos minerales." },
  arena: { nombre: "Arena en agua", clase: "heterogenea", nota: "Se distinguen dos fases." },
  ensalada: { nombre: "Ensalada", clase: "heterogenea", nota: "Se distinguen los componentes a simple vista." },
};
/** Ruta de clasificación de una clase: materia → (sustancia pura | mezcla) → tipo. */
export function rutaClasificacion(c: Clase) {
  return c === "elemento" || c === "compuesto" ? ["Materia", "Sustancia pura", c === "elemento" ? "Elemento" : "Compuesto"] : ["Materia", "Mezcla", c === "homogenea" ? "Mezcla homogénea (disolución)" : "Mezcla heterogénea"];
}

/** Concentración de una disolución: % en masa = 100 · m_soluto / (m_soluto + m_disolvente). */
export const porcentajeMasa = (soluto: number, disolvente: number) => (soluto + disolvente > 0 ? (100 * soluto) / (soluto + disolvente) : NaN);
/** Concentración en g/L = masa de soluto (g) / volumen de disolución (L). */
export const gramosPorLitro = (soluto: number, volumenL: number) => (volumenL > 0 ? soluto / volumenL : NaN);

export type Sal = "nitrato" | "cloruro";
export const SALES: Record<Sal, { nombre: string; puntos: [number, number][] }> = {
  nitrato: { nombre: "Nitrato de potasio (KNO₃)", puntos: [[0, 13], [20, 32], [40, 64], [60, 110], [80, 169], [100, 246]] },
  cloruro: { nombre: "Cloruro de sodio (NaCl)", puntos: [[0, 35.7], [20, 36], [40, 36.6], [60, 37.3], [80, 38.4], [100, 39.8]] },
};
/** Solubilidad (g de sal por 100 g de agua) a la temperatura T (°C), interpolando linealmente la tabla. */
export function solubilidad(sal: Sal, T: number) {
  const p = SALES[sal].puntos;
  if (T <= p[0]![0]) return p[0]![1];
  for (let i = 1; i < p.length; i++) {
    if (T <= p[i]![0]) {
      const [t0, s0] = p[i - 1]!;
      const [t1, s1] = p[i]!;
      return s0 + ((s1 - s0) * (T - t0)) / (t1 - t0);
    }
  }
  return p[p.length - 1]![1];
}
/** Estado de una disolución según los g disueltos por 100 g de agua frente a la solubilidad. */
export function estadoDisolucion(gDisueltos: number, sol: number) {
  if (gDisueltos < sol - 1e-9) return "insaturada";
  if (gDisueltos <= sol + 1e-9) return "saturada";
  return "sobresaturada (el exceso precipita o queda sin disolver)";
}

export const TECNICAS = ["filtracion", "decantacion", "evaporacion", "destilacion", "cromatografia", "iman"] as const;
export type Tecnica = (typeof TECNICAS)[number];
export const NOMBRE_TECNICA: Record<Tecnica, string> = { filtracion: "Filtración", decantacion: "Decantación", evaporacion: "Evaporación / cristalización", destilacion: "Destilación", cromatografia: "Cromatografía", iman: "Separación magnética" };
export const SEPARACIONES: Record<string, { nombre: string; tecnica: Tecnica; propiedad: string }> = {
  arena: { nombre: "Arena y agua", tecnica: "filtracion", propiedad: "El sólido no atraviesa el papel de filtro; el líquido sí." },
  aceite: { nombre: "Aceite y agua", tecnica: "decantacion", propiedad: "Son líquidos inmiscibles de distinta densidad: forman dos capas." },
  sal: { nombre: "Sal disuelta en agua", tecnica: "evaporacion", propiedad: "El agua se evapora y la sal queda en forma de cristales." },
  alcohol: { nombre: "Alcohol y agua", tecnica: "destilacion", propiedad: "Tienen distinto punto de ebullición (78 °C y 100 °C)." },
  tinta: { nombre: "Colorantes de una tinta", tecnica: "cromatografia", propiedad: "Cada colorante avanza con el disolvente a distinta velocidad." },
  hierro: { nombre: "Limaduras de hierro y arena", tecnica: "iman", propiedad: "El hierro es atraído por un imán; la arena no." },
};
export const tecnicaCorrecta = (m: string): Tecnica | null => SEPARACIONES[m]?.tecnica ?? null;

export const COMPOSICIONES: Record<string, { nombre: string; partes: { nombre: string; pct: number }[]; nota: string }> = {
  aire: { nombre: "Aire seco (en volumen)", partes: [{ nombre: "Nitrógeno", pct: 78 }, { nombre: "Oxígeno", pct: 21 }, { nombre: "Argón y otros", pct: 1 }], nota: "El CO₂ es solo un 0,04 % aproximadamente." },
  bronce: { nombre: "Bronce (en masa)", partes: [{ nombre: "Cobre", pct: 88 }, { nombre: "Estaño", pct: 12 }], nota: "Composición típica; varía según la aleación." },
  laton: { nombre: "Latón (en masa)", partes: [{ nombre: "Cobre", pct: 67 }, { nombre: "Zinc", pct: 33 }], nota: "Composición típica; varía según la aleación." },
  oro18: { nombre: "Oro de 18 quilates (en masa)", partes: [{ nombre: "Oro", pct: 75 }, { nombre: "Otros metales (Cu, Ag)", pct: 25 }], nota: "18 quilates = 18/24 = 75 % de oro." },
  mar: { nombre: "Agua de mar (en masa)", partes: [{ nombre: "Agua", pct: 96.5 }, { nombre: "Sales disueltas", pct: 3.5 }], nota: "La salinidad media es de unos 35 g de sales por kg." },
};
/** Masa (g) de cada componente en una muestra de masa total m (g). */
export const masaComponentes = (id: string, masaTotal: number) => (COMPOSICIONES[id]?.partes ?? []).map((p) => ({ nombre: p.nombre, masa: (masaTotal * p.pct) / 100 }));

/* ───────────── 1. Clasificación de la materia ───────────── */

export function ClasificacionMateriaFq2Explorador({ block }: { block: ToolBlock }) {
  const ids = Object.keys(MATERIALES);
  const init = { id: ids[Math.round(num(block.params?.n, 0, 0, ids.length - 1))]! };
  const [s, setS] = useState(init);
  const m = MATERIALES[s.id]!;
  const ruta = rutaClasificacion(m.clase);
  const nodos: [string, number, number][] = [["Materia", 260, 30], ["Sustancia pura", 130, 90], ["Mezcla", 390, 90], ["Elemento", 70, 150], ["Compuesto", 190, 150], ["Homogénea", 330, 150], ["Heterogénea", 450, 150]];
  const aristas: [number, number][] = [[0, 1], [0, 2], [1, 3], [1, 4], [2, 5], [2, 6]];
  const activo = (nom: string) => ruta.some((r) => r.startsWith(nom));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Si tiene un solo componente, es una sustancia pura; si tiene varios, es una mezcla (homogénea si no se distinguen, heterogénea si sí)."}
      onReset={() => setS(init)}
      controls={<Choice label="Material" items={ids.map((id) => ({ value: id, label: MATERIALES[id]!.nombre }))} value={s.id} onChange={(id) => setS({ id })} />}
    >
      <Svg w={520} h={200} testId="clasificacion-materia" maxH={220}>
        {aristas.map(([a, b]) => (
          <Seg key={`${a}-${b}`} a={[nodos[a]![1], nodos[a]![2] + 14] as Pt} b={[nodos[b]![1], nodos[b]![2] - 14] as Pt} color={activo(nodos[a]![0]) && activo(nodos[b]![0]) ? MANIM.yellow : MANIM.grid} width={activo(nodos[a]![0]) && activo(nodos[b]![0]) ? 3 : 1.5} />
        ))}
        {nodos.map(([t, x, y]) => (
          <g key={t}>
            <rect x={x - 52} y={y - 14} width={104} height={28} rx={8} fill={activo(t) ? MANIM.yellow : MANIM.grid} fillOpacity={activo(t) ? 0.3 : 0.2} stroke={activo(t) ? MANIM.yellow : MANIM.grid} strokeWidth={activo(t) ? 2.5 : 1} />
            <text x={x} y={y + 5} textAnchor="middle" fill={activo(t) ? MANIM.ink : MANIM.muted} fontSize={13} fontWeight={activo(t) ? 700 : 500}>{t}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Clasificación">{ruta.slice(1).join(" → ")}</Stat>
        <Stat color={MANIM.muted} label="Por qué">{m.nota}</Stat>
      </Readout>
      <Note>Una <b>sustancia pura</b> tiene <b>composición fija</b> y propiedades características (punto de fusión, densidad…). Puede ser un <b>elemento</b> (un solo tipo de átomo) o un <b>compuesto</b> (varios tipos de átomos unidos en proporción fija, que solo se separan por <b>procesos químicos</b>). Una <b>mezcla</b> tiene varios componentes en proporción variable y se puede separar por <b>procedimientos físicos</b>. Si a simple vista se distinguen sus componentes es <b>heterogénea</b>; si no, <b>homogénea</b> (una <b>disolución</b>).</Note>
    </Frame>
  );
}

/* ───────────── 2. Concentración de una disolución ───────────── */

export function ConcentracionDisolucionFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { s: Math.round(num(block.params?.a, 20, 1, 100)), d: Math.round(num(block.params?.b, 200, 100, 1000)) };
  const [st, setSt] = useState(init);
  const pct = porcentajeMasa(st.s, st.d);
  const gl = gramosPorLitro(st.s, st.d / 1000);
  const frac = Math.min(1, st.s / 150);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La concentración dice cuánto soluto hay en una cantidad de disolución: cuanto más soluto o menos disolvente, más concentrada."}
      onReset={() => setSt(init)}
      controls={
        <>
          <Slider label="Masa de soluto (sal)" value={st.s} min={1} max={100} step={1} unit=" g" color={MANIM.orange} onChange={(s) => setSt((o) => ({ ...o, s }))} />
          <Slider label="Disolvente (agua)" value={st.d} min={100} max={1000} step={50} unit=" mL" color={MANIM.blue} onChange={(d) => setSt((o) => ({ ...o, d }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="concentracion-disolucion" maxH={220}>
        <rect x={190} y={30} width={140} height={140} rx={6} fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <rect x={192} y={32 + 140 * (1 - st.d / 1100)} width={136} height={140 * (st.d / 1100) - 4} fill={MANIM.blue} fillOpacity={0.15 + 0.5 * frac} />
        {Array.from({ length: Math.round(st.s / 4) }, (_, i) => (
          <Dot key={i} p={[200 + ((i * 53) % 120), 40 + 140 * (1 - st.d / 1100) + 8 + ((i * 37) % Math.max(10, 140 * (st.d / 1100) - 24))] as Pt} color={MANIM.orange} r={3} />
        ))}
        <text x={360} y={96} fill={MANIM.muted} fontSize={13}>Concentración</text>
        <text x={360} y={120} fill={MANIM.green} fontSize={22} fontWeight={700}>{`${f1(pct)} %`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="% en masa = soluto / disolución · 100">{f1(pct)} %</Stat>
        <Stat color={MANIM.purple} label="Concentración en g/L (volumen ≈ el del agua)">{f1(gl)} g/L</Stat>
        <Stat color={MANIM.muted} label="Masa de la disolución">{st.s + st.d} g</Stat>
      </Readout>
      <Note>Una <b>disolución</b> es una mezcla homogénea de <b>soluto</b> (lo que se disuelve) y <b>disolvente</b> (en que se disuelve, normalmente el componente mayoritario). La <b>concentración</b> indica la cantidad de soluto en una cantidad de disolución: el <b>% en masa</b> es los gramos de soluto por cada 100 g de disolución, y la concentración en <b>g/L</b>, los gramos de soluto por cada litro de disolución. Aquí se supone que 1 mL de agua pesa 1 g y que el soluto casi no cambia el volumen. Cuanto más soluto hay en el mismo disolvente, más <b>concentrada</b> está.</Note>
    </Frame>
  );
}

/* ───────────── 3. Solubilidad ───────────── */

export function SolubilidadCurvaFq2Explorador({ block }: { block: ToolBlock }) {
  const sales: Sal[] = ["nitrato", "cloruro"];
  const init = { sal: sales[Math.round(num(block.params?.n, 0, 0, 1))]!, T: Math.round(num(block.params?.a, 40, 0, 100)), g: Math.round(num(block.params?.b, 50, 0, 250)) };
  const [s, setS] = useState<{ sal: Sal; T: number; g: number }>(init);
  const sol = solubilidad(s.sal, s.T);
  const est = estadoDisolucion(s.g, sol);
  const X0 = 60;
  const Y0 = 190;
  const ux = 4;
  const uy = 0.62;
  const P = (T: number, g: number): Pt => [X0 + T * ux, Y0 - g * uy];
  const curva = Array.from({ length: 51 }, (_, i) => P(i * 2, solubilidad(s.sal, i * 2)));
  const color = est === "insaturada" ? MANIM.green : est === "saturada" ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La curva de solubilidad marca la máxima cantidad de sal que se disuelve en 100 g de agua a cada temperatura."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Sal" items={sales.map((x) => ({ value: x, label: SALES[x].nombre }))} value={s.sal} onChange={(sal) => setS((o) => ({ ...o, sal }))} />
          <Slider label="Temperatura" value={s.T} min={0} max={100} step={5} unit=" °C" color={MANIM.red} onChange={(T) => setS((o) => ({ ...o, T }))} />
          <Slider label="Sal añadida a 100 g de agua" value={s.g} min={0} max={250} step={5} unit=" g" color={MANIM.orange} onChange={(g) => setS((o) => ({ ...o, g }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="solubilidad-curva" maxH={250}>
        <Seg a={P(0, 0)} b={P(100, 0)} color={MANIM.ink} width={2} />
        <Seg a={P(0, 0)} b={P(0, 250)} color={MANIM.ink} width={2} />
        <text x={470} y={Y0 + 22} fill={MANIM.muted} fontSize={12} textAnchor="end">temperatura (°C)</text>
        <text x={14} y={20} fill={MANIM.muted} fontSize={12}>g de sal / 100 g de agua</text>
        <polyline points={curva.map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
        <text x={P(100, solubilidad(s.sal, 100))[0] - 20} y={P(100, solubilidad(s.sal, 100))[1] - 8} fill={MANIM.blue} fontSize={12} textAnchor="end">solubilidad</text>
        <Dot p={P(s.T, Math.min(s.g, 250))} color={color} r={8} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label={`Solubilidad a ${s.T} °C`}>{f1(sol)} g / 100 g de agua</Stat>
        <Stat color={color} label="Disolución">{est}</Stat>
        <Stat color={MANIM.muted} label="Sal sin disolver">{`${f1(Math.max(0, s.g - sol))} g`}</Stat>
      </Readout>
      <Note>La <b>solubilidad</b> es la máxima cantidad de soluto que se disuelve en una cantidad de disolvente a una temperatura dada. Una disolución es <b>insaturada</b> si admite más soluto, <b>saturada</b> si ya no admite más y <b>sobresaturada</b> si hay un exceso (que queda sin disolver o <b>precipita</b>). En general, la solubilidad de los <b>sólidos aumenta con la temperatura</b> (muy marcado en el nitrato de potasio, casi nada en la sal común); la de los <b>gases disminuye</b>. Los datos son valores aproximados interpolados de tablas habituales.</Note>
    </Frame>
  );
}

/* ───────────── 4. Técnicas de separación ───────────── */

export function SeparacionMezclasFq2Explorador({ block }: { block: ToolBlock }) {
  const mezclas = Object.keys(SEPARACIONES);
  const init = { m: mezclas[Math.round(num(block.params?.n, 0, 0, mezclas.length - 1))]!, t: "filtracion" as Tecnica };
  const [s, setS] = useState<{ m: string; t: Tecnica }>(init);
  const sep = SEPARACIONES[s.m]!;
  const ok = tecnicaCorrecta(s.m) === s.t;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada técnica aprovecha una propiedad en la que se diferencian los componentes de la mezcla."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Mezcla" items={mezclas.map((id) => ({ value: id, label: SEPARACIONES[id]!.nombre }))} value={s.m} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Choice label="Técnica" items={TECNICAS.map((t) => ({ value: t, label: NOMBRE_TECNICA[t] }))} value={s.t} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={120} testId="separacion-mezclas" maxH={140}>
        <text x={260} y={42} textAnchor="middle" fill={MANIM.ink} fontSize={20} fontWeight={700}>{`${sep.nombre}  →  ${NOMBRE_TECNICA[s.t]}`}</text>
        <text x={260} y={80} textAnchor="middle" fill={ok ? MANIM.green : MANIM.red} fontSize={22} fontWeight={700}>{ok ? "✓ Técnica adecuada" : "✗ No sirve para esta mezcla"}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Técnica adecuada">{NOMBRE_TECNICA[sep.tecnica]}</Stat>
        <Stat color={MANIM.yellow} label="Propiedad en la que se basa">{sep.propiedad}</Stat>
      </Readout>
      <Note>Las mezclas se separan por <b>procedimientos físicos</b> que aprovechan una diferencia entre los componentes. La <b>filtración</b> separa un sólido insoluble de un líquido; la <b>decantación</b>, líquidos inmiscibles o un sólido que se deposita; la <b>evaporación</b> y la <b>cristalización</b>, un sólido disuelto; la <b>destilación</b>, líquidos de distinto punto de ebullición; la <b>cromatografía</b>, sustancias que avanzan a distinta velocidad sobre un soporte; y la <b>separación magnética</b>, materiales atraídos por un imán. Las técnicas se pueden <b>combinar</b>.</Note>
    </Frame>
  );
}

/* ───────────── 5. Composición de mezclas cotidianas ───────────── */

export function ComposicionMezclasFq2Explorador({ block }: { block: ToolBlock }) {
  const ids = Object.keys(COMPOSICIONES);
  const init = { id: ids[Math.round(num(block.params?.n, 0, 0, ids.length - 1))]!, m: Math.round(num(block.params?.a, 100, 10, 1000)) };
  const [s, setS] = useState(init);
  const c = COMPOSICIONES[s.id]!;
  const masas = masaComponentes(s.id, s.m);
  const colores = [MANIM.blue, MANIM.orange, MANIM.green, MANIM.purple];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una mezcla se describe por el porcentaje de cada componente; con él se calcula cuánto hay de cada uno en una muestra."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Mezcla" items={ids.map((id) => ({ value: id, label: COMPOSICIONES[id]!.nombre.split(" (")[0]! }))} value={s.id} onChange={(id) => setS((o) => ({ ...o, id }))} />
          <Slider label="Masa de la muestra" value={s.m} min={10} max={1000} step={10} unit=" g" color={MANIM.orange} onChange={(m) => setS((o) => ({ ...o, m }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="composicion-mezclas" maxH={150}>
        <text x={20} y={28} fill={MANIM.muted} fontSize={13}>{c.nombre}</text>
        {c.partes.map((p, i) => {
          const x = 20 + c.partes.slice(0, i).reduce((t, q) => t + q.pct, 0) * 4.8;
          return (
            <g key={p.nombre}>
              <rect x={x} y={44} width={Math.max(2, p.pct * 4.8)} height={34} fill={colores[i % 4]} fillOpacity={0.85} stroke={MANIM.surface} strokeWidth={1} />
              {p.pct >= 8 ? <text x={x + (p.pct * 4.8) / 2} y={66} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{`${fmtEs(p.pct, 1)} %`}</text> : null}
            </g>
          );
        })}
        {c.partes.map((p, i) => (
          <g key={p.nombre}>
            <rect x={20 + i * 150} y={98} width={12} height={12} fill={colores[i % 4]} />
            <text x={38 + i * 150} y={109} fill={MANIM.muted} fontSize={12}>{p.nombre}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        {masas.map((q, i) => (
          <Stat key={q.nombre} color={colores[i % 4]!} label={`${q.nombre} en ${s.m} g`}>{f2(q.masa)} g</Stat>
        ))}
      </Readout>
      <Note>Las <b>aleaciones</b> (bronce, latón, el oro de joyería) son <b>mezclas homogéneas de metales</b>; el <b>aire</b> es una mezcla de gases y el <b>agua de mar</b>, una disolución de sales. La <b>composición</b> se da en <b>%</b>: la masa de cada componente en cada 100 g de mezcla (o su volumen, en los gases). Con ella se calcula la masa de cada componente en una muestra: <b>masa = % / 100 · masa total</b>. {c.nota} Los porcentajes son valores típicos aproximados.</Note>
    </Frame>
  );
}
