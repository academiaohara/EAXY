"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { contarAtomos, masaMolecular, sub } from "@/components/lesson/slide/tools/Fq2AtomoTools";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const FENOMENOS = [
  { id: "hielo", nombre: "Fundir un cubito de hielo", fisico: true, razon: "El agua sigue siendo agua: solo cambia de estado." },
  { id: "papel", nombre: "Romper una hoja de papel", fisico: true, razon: "Cambia la forma, pero el papel sigue siendo papel." },
  { id: "azucar", nombre: "Disolver azúcar en agua", fisico: true, razon: "Es una mezcla: las sustancias se pueden volver a separar." },
  { id: "vapor", nombre: "Condensación del vapor en un cristal", fisico: true, razon: "Cambio de estado: no aparece ninguna sustancia nueva." },
  { id: "madera", nombre: "Quemar un trozo de madera", fisico: false, razon: "Aparecen sustancias nuevas (cenizas, CO₂, vapor de agua) y se desprende luz y calor." },
  { id: "hierro", nombre: "Oxidación de un clavo de hierro", fisico: false, razon: "El hierro reacciona con el oxígeno y forma óxido, una sustancia distinta." },
  { id: "leche", nombre: "Leche que se agria", fisico: false, razon: "Cambia el olor y el sabor: se forman sustancias nuevas." },
  { id: "bicarbonato", nombre: "Vinagre con bicarbonato", fisico: false, razon: "Se desprende un gas (CO₂): hay una reacción química." },
  { id: "huevo", nombre: "Freír un huevo", fisico: false, razon: "Las proteínas cambian y no se pueden recuperar: sustancias nuevas." },
  { id: "tijeras", nombre: "Cortar tela con tijeras", fisico: true, razon: "Solo cambia la forma de la tela." },
] as const;
/** Evidencias de que ha ocurrido una reacción química. */
export const EVIDENCIAS = ["aparece un gas (burbujas)", "cambia el color", "se desprende o absorbe calor o luz", "se forma un sólido (precipitado)", "cambia el olor"] as const;

export type Reaccion = { id: string; nombre: string; reactivos: string[]; productos: string[]; coef: number[] };
export const REACCIONES: Reaccion[] = [
  { id: "agua", nombre: "Formación del agua", reactivos: ["H2", "O2"], productos: ["H2O"], coef: [2, 1, 2] },
  { id: "amoniaco", nombre: "Síntesis del amoniaco", reactivos: ["N2", "H2"], productos: ["NH3"], coef: [1, 3, 2] },
  { id: "metano", nombre: "Combustión del metano", reactivos: ["CH4", "O2"], productos: ["CO2", "H2O"], coef: [1, 2, 1, 2] },
  { id: "magnesio", nombre: "Combustión del magnesio", reactivos: ["Mg", "O2"], productos: ["MgO"], coef: [2, 1, 2] },
];
/** Cuenta los átomos de cada elemento a un lado de la ecuación: Σ coeficiente · átomos de cada fórmula. */
export function contarLado(formulas: readonly string[], coefs: readonly number[]): Record<string, number> {
  const out: Record<string, number> = {};
  formulas.forEach((f, i) => {
    const c = contarAtomos(f) ?? {};
    for (const [el, n] of Object.entries(c)) out[el] = (out[el] ?? 0) + n * (coefs[i] ?? 0);
  });
  return out;
}
/** ¿Tiene los mismos átomos de cada elemento a ambos lados? */
export function estaAjustada(r: Reaccion, coefs: readonly number[]) {
  const a = contarLado(r.reactivos, coefs.slice(0, r.reactivos.length));
  const b = contarLado(r.productos, coefs.slice(r.reactivos.length));
  const els = new Set([...Object.keys(a), ...Object.keys(b)]);
  return [...els].every((e) => (a[e] ?? 0) === (b[e] ?? 0)) && coefs.every((c) => c > 0);
}
/** Masa (u) de un lado de la ecuación con los coeficientes dados. */
export const masaLado = (formulas: readonly string[], coefs: readonly number[]) => formulas.reduce((s, f, i) => s + (coefs[i] ?? 0) * masaMolecular(f), 0);
/** Número de moléculas de cada especie tras ξ unidades de reacción (ajustada), desde un reactivo inicial con múltiplo de los coeficientes. */
export function avanceReaccion(r: Reaccion, unidades: number, avance: number) {
  const nr = r.reactivos.length;
  const reactivos = r.reactivos.map((f, i) => ({ f, n: (unidades - avance) * r.coef[i]! }));
  const productos = r.productos.map((f, i) => ({ f, n: avance * r.coef[nr + i]! }));
  return { reactivos, productos };
}
/** ¿Hay fuego? Hacen falta los tres lados del triángulo: combustible, comburente y energía de activación. */
export const hayFuego = (combustible: boolean, comburente: boolean, energia: boolean) => combustible && comburente && energia;

const sf = (f: string) => f.replace(/\d+/g, (d) => sub(d));
const ec = (coefs: readonly number[], r: Reaccion) => {
  const lado = (fs: string[], off: number) => fs.map((f, i) => `${coefs[off + i] === 1 ? "" : coefs[off + i]} ${sf(f)}`.trim()).join(" + ");
  return `${lado(r.reactivos, 0)}  →  ${lado(r.productos, r.reactivos.length)}`;
};

/* ───────────── 1. Cambio físico o químico ───────────── */

export function CambioFisicoQuimicoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.n, 0, 0, FENOMENOS.length - 1)) };
  const [s, setS] = useState(init);
  const fe = FENOMENOS[s.i]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En un cambio físico la sustancia sigue siendo la misma; en un cambio químico aparecen sustancias nuevas."}
      onReset={() => setS(init)}
      controls={<Choice label="Fenómeno" items={FENOMENOS.map((x, i) => ({ value: i, label: x.nombre }))} value={s.i} onChange={(i) => setS({ i })} />}
    >
      <Svg w={520} h={120} testId="cambio-fisico-quimico" maxH={140}>
        <text x={260} y={44} textAnchor="middle" fill={MANIM.ink} fontSize={20} fontWeight={700}>{fe.nombre}</text>
        <text x={260} y={86} textAnchor="middle" fill={fe.fisico ? MANIM.blue : MANIM.red} fontSize={26} fontWeight={700}>{fe.fisico ? "Cambio FÍSICO" : "Cambio QUÍMICO"}</text>
      </Svg>
      <Readout>
        <Stat color={fe.fisico ? MANIM.blue : MANIM.red} label="Tipo">{fe.fisico ? "físico" : "químico"}</Stat>
        <Stat color={MANIM.yellow} label="Por qué">{fe.razon}</Stat>
        <Stat color={MANIM.green} label="¿Aparecen sustancias nuevas?">{fe.fisico ? "no" : "sí"}</Stat>
      </Readout>
      <Note>En un <b>cambio físico</b> cambia el <b>aspecto</b> (forma, estado, tamaño) pero <b>no la naturaleza</b> de la sustancia: es, en general, <b>reversible</b>. Ejemplos: los cambios de estado, romper, disolver o mezclar. En un <b>cambio químico</b> (o <b>reacción química</b>) unas sustancias, los <b>reactivos</b>, se transforman en otras distintas, los <b>productos</b>, con propiedades diferentes. Suele ser difícil de revertir. Algunas <b>evidencias</b> son: aparece un gas, cambia el color, se desprende o absorbe calor o luz, se forma un sólido o cambia el olor.</Note>
    </Frame>
  );
}

/* ───────────── 2. Avance de una reacción ───────────── */

export function AvanceReaccionFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 0, 0, REACCIONES.length - 1)), a: Math.round(num(block.params?.a, 0, 0, 4)) };
  const [s, setS] = useState(init);
  const r = REACCIONES[s.r]!;
  const unidades = 4;
  const { reactivos, productos } = avanceReaccion(r, unidades, s.a);
  const colorDe = (f: string) => ({ H: MANIM.blue, O: MANIM.red, N: MANIM.green, C: MANIM.ink, Mg: MANIM.purple }[Object.keys(contarAtomos(f) ?? {})[0] ?? "H"] ?? MANIM.muted);
  const todos = [...reactivos, ...productos];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Durante la reacción, los reactivos se van gastando y los productos van apareciendo; los átomos se reorganizan."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES.map((x, i) => ({ value: i, label: x.nombre }))} value={s.r} onChange={(i) => setS({ r: i, a: 0 })} />
          <Slider label="Avance de la reacción" value={s.a} min={0} max={unidades} step={1} unit={` de ${unidades}`} color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, a }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="avance-reaccion" maxH={190}>
        <text x={260} y={28} textAnchor="middle" fill={MANIM.yellow} fontSize={18} fontWeight={700}>{ec(r.coef, r)}</text>
        {todos.map((t, i) => {
          const esProducto = i >= reactivos.length;
          const x0 = esProducto ? 300 : 30;
          const idx = esProducto ? i - reactivos.length : i;
          return (
            <g key={`${t.f}-${i}`}>
              <text x={x0} y={66 + idx * 36} fill={esProducto ? MANIM.green : MANIM.orange} fontSize={13} fontWeight={700}>{`${sf(t.f)}: ${t.n}`}</text>
              {Array.from({ length: Math.min(t.n, 16) }, (_, k) => <circle key={k} cx={x0 + 84 + k * 11} cy={61 + idx * 36} r={4.5} fill={colorDe(t.f)} />)}
            </g>
          );
        })}
        <text x={150} y={150} textAnchor="middle" fill={MANIM.muted} fontSize={12}>REACTIVOS</text>
        <text x={420} y={150} textAnchor="middle" fill={MANIM.muted} fontSize={12}>PRODUCTOS</text>
      </Svg>
      <Readout>
        {reactivos.map((t) => <Stat key={t.f} color={MANIM.orange} label={`${sf(t.f)} (reactivo)`}>{`${t.n}`}</Stat>)}
        {productos.map((t) => <Stat key={t.f} color={MANIM.green} label={`${sf(t.f)} (producto)`}>{`${t.n}`}</Stat>)}
        <Stat color={MANIM.purple} label="Avance">{`${s.a} de ${unidades}`}</Stat>
      </Readout>
      <Note>En una <b>reacción química</b> los <b>reactivos</b> (a la izquierda de la flecha) se transforman en <b>productos</b> (a la derecha). A nivel de partículas, los <b>enlaces</b> de los reactivos se <b>rompen</b> y los <b>átomos se reordenan</b> para formar moléculas nuevas. Conforme avanza, <b>disminuyen los reactivos</b> y <b>aumentan los productos</b>. Los <b>coeficientes</b> indican la proporción en que reaccionan: en 2 H₂ + O₂ → 2 H₂O, por cada 2 moléculas de hidrógeno se gasta 1 de oxígeno y salen 2 de agua.</Note>
    </Frame>
  );
}

/* ───────────── 3. Ajuste de ecuaciones y conservación de la masa ───────────── */

export function AjusteEcuacionFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { r: Math.round(num(block.params?.n, 0, 0, REACCIONES.length - 1)), c: [1, 1, 1, 1] };
  const [s, setS] = useState(init);
  const r = REACCIONES[s.r]!;
  const n = r.reactivos.length + r.productos.length;
  const coefs = s.c.slice(0, n);
  const L = contarLado(r.reactivos, coefs.slice(0, r.reactivos.length));
  const R = contarLado(r.productos, coefs.slice(r.reactivos.length));
  const ok = estaAjustada(r, coefs);
  const mL = masaLado(r.reactivos, coefs.slice(0, r.reactivos.length));
  const mR = masaLado(r.productos, coefs.slice(r.reactivos.length));
  const els = [...new Set([...Object.keys(L), ...Object.keys(R)])];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Ajustar es poner coeficientes delante de las fórmulas para que haya los mismos átomos de cada elemento a ambos lados; así se conserva la masa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reacción" items={REACCIONES.map((x, i) => ({ value: i, label: x.nombre }))} value={s.r} onChange={(i) => setS({ r: i, c: [1, 1, 1, 1] })} />
          {[...r.reactivos, ...r.productos].map((f, i) => (
            <Slider key={`${s.r}-${i}`} label={`Coeficiente de ${sf(f)}`} value={coefs[i]!} min={1} max={6} step={1} color={i < r.reactivos.length ? MANIM.orange : MANIM.green} onChange={(v) => setS((o) => ({ ...o, c: o.c.map((x, k) => (k === i ? v : x)) }))} />
          ))}
        </>
      }
    >
      <Svg w={520} h={110} testId="ajuste-ecuacion" maxH={130}>
        <text x={260} y={42} textAnchor="middle" fill={MANIM.yellow} fontSize={22} fontWeight={700}>{ec(coefs, r)}</text>
        <text x={260} y={84} textAnchor="middle" fill={ok ? MANIM.green : MANIM.red} fontSize={20} fontWeight={700}>{ok ? "✓ Ecuación ajustada" : "✗ No está ajustada"}</text>
      </Svg>
      <Readout>
        {els.map((e) => (
          <Stat key={e} color={(L[e] ?? 0) === (R[e] ?? 0) ? MANIM.green : MANIM.red} label={`Átomos de ${e} (izq. · der.)`}>{`${L[e] ?? 0} · ${R[e] ?? 0}`}</Stat>
        ))}
        <Stat color={Math.abs(mL - mR) < 1e-9 ? MANIM.green : MANIM.red} label="Masa reactivos · productos (u)">{`${f1(mL)} · ${f1(mR)}`}</Stat>
      </Readout>
      <Note>Según la <b>ley de conservación de la masa</b> (Lavoisier, 1789) la masa total <b>no cambia</b> en una reacción: la de los reactivos es igual a la de los productos, porque los <b>átomos no se crean ni se destruyen</b>, solo se reordenan. En la ecuación química esto significa que debe haber <b>los mismos átomos de cada elemento</b> a los dos lados. Para <b>ajustarla</b> se ponen <b>coeficientes</b> delante de las fórmulas (nunca se cambian los subíndices, porque cambiarían la sustancia). Prueba a ajustar cada reacción hasta que se pongan en verde todos los elementos.</Note>
    </Frame>
  );
}

/* ───────────── 4. Triángulo del fuego ───────────── */

export function TrianguloFuegoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { c: num(block.params?.a, 1, 0, 1) >= 0.5, o: num(block.params?.b, 1, 0, 1) >= 0.5, e: num(block.params?.c, 1, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  const fuego = hayFuego(s.c, s.o, s.e);
  const onoff = [{ value: "si", label: "Presente" }, { value: "no", label: "Retirado" }];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Para apagar un fuego basta retirar uno de los tres elementos del triángulo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Combustible (madera, gas, papel…)" items={onoff} value={s.c ? "si" : "no"} onChange={(v) => setS((o) => ({ ...o, c: v === "si" }))} />
          <Choice label="Comburente (oxígeno del aire)" items={onoff} value={s.o ? "si" : "no"} onChange={(v) => setS((o) => ({ ...o, o: v === "si" }))} />
          <Choice label="Energía de activación (calor, chispa)" items={onoff} value={s.e ? "si" : "no"} onChange={(v) => setS((o) => ({ ...o, e: v === "si" }))} />
        </>
      }
    >
      <Svg w={520} h={220} testId="triangulo-fuego" maxH={240}>
        <polygon points="260,30 150,190 370,190" fill={fuego ? MANIM.orange : MANIM.grid} fillOpacity={fuego ? 0.35 : 0.15} stroke={fuego ? MANIM.orange : MANIM.muted} strokeWidth={3} />
        {[["Combustible", 260, 22, s.c], ["Comburente", 128, 206, s.o], ["Energía", 392, 206, s.e]].map(([t, x, y, on]) => (
          <text key={String(t)} x={Number(x)} y={Number(y)} textAnchor="middle" fill={on ? MANIM.green : MANIM.red} fontSize={14} fontWeight={700}>{`${t}${on ? "" : " ✗"}`}</text>
        ))}
        <text x={260} y={150} textAnchor="middle" fill={fuego ? MANIM.yellow : MANIM.muted} fontSize={17} fontWeight={700}>{fuego ? "¡HAY FUEGO!" : "no hay fuego"}</text>
      </Svg>
      <Readout>
        <Stat color={fuego ? MANIM.red : MANIM.green} label="Resultado">{fuego ? "combustión en marcha" : "no se produce combustión"}</Stat>
        <Stat color={MANIM.muted} label="Para apagarlo">{fuego ? "retira el combustible, el oxígeno o enfría" : "—"}</Stat>
      </Readout>
      <Note>La <b>combustión</b> es una reacción química muy rápida entre un <b>combustible</b> y un <b>comburente</b> (normalmente el <b>oxígeno</b> del aire) que <b>desprende calor y luz</b>. Necesita una <b>energía de activación</b> inicial (una chispa, una llama). Estos tres elementos forman el <b>triángulo del fuego</b>: si falta uno, el fuego no se produce o se apaga. Un extintor de <b>CO₂</b> o una manta <b>quitan el oxígeno</b>; el <b>agua</b> enfría; cortar el gas <b>retira el combustible</b>. La <b>oxidación</b> del hierro es otra reacción con oxígeno, pero <b>lenta</b>.</Note>
    </Frame>
  );
}
