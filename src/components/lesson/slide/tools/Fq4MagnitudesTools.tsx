"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

const rad = (g: number): number => (g * Math.PI) / 180;
export type Vec = { x: number; y: number };
export const componentes = (modulo: number, anguloGrados: number): Vec => ({ x: modulo * Math.cos(rad(anguloGrados)), y: modulo * Math.sin(rad(anguloGrados)) });
export const suma = (a: Vec, b: Vec): Vec => ({ x: a.x + b.x, y: a.y + b.y });
export const resta = (a: Vec, b: Vec): Vec => ({ x: a.x - b.x, y: a.y - b.y });
export const modulo = (v: Vec): number => Math.hypot(v.x, v.y);
/** Ángulo (grados, 0–360) del vector respecto al eje X positivo. */
export function direccion(v: Vec): number {
  if (v.x === 0 && v.y === 0) return NaN;
  const a = (Math.atan2(v.y, v.x) * 180) / Math.PI;
  return a < 0 ? a + 360 : a;
}
export const productoEscalar = (a: Vec, b: Vec): number => a.x * b.x + a.y * b.y;

/** Estadística de una serie de medidas: media, desviación típica muestral e incertidumbre de la media (s/√n). */
export function estadistica(vals: readonly number[]): { n: number; media: number; s: number; incertidumbre: number } {
  const n = vals.length;
  if (n === 0) return { n, media: NaN, s: NaN, incertidumbre: NaN };
  const media = vals.reduce((a, b) => a + b, 0) / n;
  if (n === 1) return { n, media, s: NaN, incertidumbre: NaN };
  const s = Math.sqrt(vals.reduce((a, v) => a + (v - media) ** 2, 0) / (n - 1));
  return { n, media, s, incertidumbre: s / Math.sqrt(n) };
}
export const errorAbsoluto = (medida: number, verdadero: number): number => Math.abs(medida - verdadero);
export const errorRelativoPct = (medida: number, verdadero: number): number => (verdadero !== 0 ? (100 * Math.abs(medida - verdadero)) / Math.abs(verdadero) : NaN);
export const MEDIDAS_G = [9.5, 10.1, 9.7, 9.9, 9.6, 10.0, 9.8, 9.4, 10.2, 9.8] as const;

/** Ajuste por mínimos cuadrados y = a·x + b, con el coeficiente de determinación r². */
export function ajusteLineal(xs: readonly number[], ys: readonly number[]): { a: number; b: number; r2: number } {
  const n = xs.length;
  if (n < 2 || ys.length !== n) return { a: NaN, b: NaN, r2: NaN };
  const mx = xs.reduce((s, x) => s + x, 0) / n;
  const my = ys.reduce((s, y) => s + y, 0) / n;
  const sxx = xs.reduce((s, x) => s + (x - mx) ** 2, 0);
  const sxy = xs.reduce((s, x, i) => s + (x - mx) * (ys[i]! - my), 0);
  const syy = ys.reduce((s, y) => s + (y - my) ** 2, 0);
  if (sxx === 0) return { a: NaN, b: NaN, r2: NaN };
  const a = sxy / sxx;
  const b = my - a * mx;
  return { a, b, r2: syy === 0 ? 1 : (sxy * sxy) / (sxx * syy) };
}
export const sumaResiduos2 = (xs: readonly number[], ys: readonly number[], a: number, b: number): number => xs.reduce((s, x, i) => s + (ys[i]! - (a * x + b)) ** 2, 0);

export const CONJUNTOS = [
  { nombre: "Muelle (fuerza frente a alargamiento)", x: [2, 4, 6, 8, 10, 12], y: [0.9, 2.1, 2.9, 4.2, 5.0, 5.9], ejeX: "Alargamiento (cm)", ejeY: "Fuerza (N)", pendiente: "constante elástica k (N/cm)" },
  { nombre: "Caída libre (velocidad frente a tiempo)", x: [0.5, 1, 1.5, 2, 2.5, 3], y: [5.2, 9.6, 14.9, 19.4, 24.7, 29.3], ejeX: "Tiempo (s)", ejeY: "Velocidad (m/s)", pendiente: "aceleración g (m/s²)" },
  { nombre: "Sólido (masa frente a volumen)", x: [10, 20, 30, 40, 50], y: [27, 53, 81, 107, 135], ejeX: "Volumen (cm³)", ejeY: "Masa (g)", pendiente: "densidad ρ (g/cm³)" },
] as const;

/* ───────────── 1. Vectores ───────────── */

export function VectoresFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { ma: num(block.params?.a, 6, 1, 10), aa: Math.round(num(block.params?.b, 30, 0, 360)), mb: num(block.params?.c, 4, 1, 10), ab: Math.round(num(block.params?.n, 120, 0, 360)), op: "suma" as "suma" | "resta" };
  const [s, setS] = useState<{ ma: number; aa: number; mb: number; ab: number; op: "suma" | "resta" }>(init);
  const A = componentes(s.ma, s.aa);
  const B = componentes(s.mb, s.ab);
  const R = s.op === "suma" ? suma(A, B) : resta(A, B);
  const Bshow = s.op === "suma" ? B : { x: -B.x, y: -B.y };
  const alcance = Math.max(modulo(A), modulo(suma(A, Bshow)), modulo(R), 1);
  const k = Math.min(18, 80 / alcance);
  const ox = 260;
  const oy = 95;
  const P = (v: Vec): [number, number] => [ox + v.x * k, oy - v.y * k];
  const colinea = Math.abs(A.x * B.y - A.y * B.x) < 1e-9;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las magnitudes vectoriales se suman componente a componente o con el método de la cola a la cabeza."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Operación" items={[{ value: "suma", label: "A + B" }, { value: "resta", label: "A − B" }]} value={s.op} onChange={(op) => setS((o) => ({ ...o, op: op as "suma" | "resta" }))} />
          <Slider label="Módulo de A" value={s.ma} min={1} max={10} step={0.5} color={MANIM.blue} format={f1} onChange={(ma) => setS((o) => ({ ...o, ma }))} />
          <Slider label="Ángulo de A" value={s.aa} min={0} max={360} step={5} unit="°" color={MANIM.blue} onChange={(aa) => setS((o) => ({ ...o, aa }))} />
          <Slider label="Módulo de B" value={s.mb} min={1} max={10} step={0.5} color={MANIM.orange} format={f1} onChange={(mb) => setS((o) => ({ ...o, mb }))} />
          <Slider label="Ángulo de B" value={s.ab} min={0} max={360} step={5} unit="°" color={MANIM.orange} onChange={(ab) => setS((o) => ({ ...o, ab }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="vectores" maxH={210}>
        <Seg a={[40, oy]} b={[480, oy]} color={MANIM.muted} width={1} dashed />
        <Seg a={[ox, 10]} b={[ox, 180]} color={MANIM.muted} width={1} dashed />
        <Seg a={[ox, oy]} b={P(A)} color={MANIM.blue} width={3} />
        <Seg a={P(A)} b={P(suma(A, Bshow))} color={MANIM.orange} width={3} />
        <Seg a={[ox, oy]} b={P(R)} color={MANIM.green} width={4} />
        <Dot p={[ox, oy]} r={4} color={MANIM.ink} />
        <text x={P(A)[0] + 4} y={P(A)[1] - 4} fill={MANIM.blue} fontSize={12} fontWeight={700}>A</text>
        <text x={P(suma(A, Bshow))[0] + 4} y={P(suma(A, Bshow))[1] - 4} fill={MANIM.orange} fontSize={12} fontWeight={700}>{s.op === "suma" ? "B" : "−B"}</text>
        <text x={P(R)[0] + 6} y={P(R)[1] + 14} fill={MANIM.green} fontSize={12} fontWeight={700}>R</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Componentes de A">{`(${f2(A.x)}; ${f2(A.y)})`}</Stat>
        <Stat color={MANIM.orange} label="Componentes de B">{`(${f2(B.x)}; ${f2(B.y)})`}</Stat>
        <Stat color={MANIM.green} label={s.op === "suma" ? "A + B" : "A − B"}>{`(${f2(R.x)}; ${f2(R.y)}) · módulo ${f2(modulo(R))} · ${Number.isNaN(direccion(R)) ? "—" : `${f1(direccion(R))}°`}`}</Stat>
        <Stat color={MANIM.purple} label="Producto escalar A·B">{f2(productoEscalar(A, B))}</Stat>
        <Stat color={MANIM.muted} label="Posición relativa">{colinea ? "vectores paralelos" : "no paralelos"}</Stat>
      </Readout>
      <Note>Las <b>magnitudes escalares</b> (masa, temperatura, tiempo, energía) quedan definidas por un <b>valor</b> y una unidad. Las <b>vectoriales</b> (posición, velocidad, aceleración, fuerza) necesitan además <b>dirección y sentido</b>. Un vector se descompone en <b>componentes</b>: <b>vₓ = v·cos α</b> y <b>v_y = v·sen α</b>, y su <b>módulo</b> es √(vₓ² + v_y²). Para <b>sumar</b> vectores se suman sus componentes (o se colocan <b>cola con cabeza</b>); para restar, se suma el opuesto. El <b>producto escalar</b> A·B = Aₓ·Bₓ + A_y·B_y es un número: vale 0 si los vectores son perpendiculares.</Note>
    </Frame>
  );
}

/* ───────────── 2. Error e incertidumbre ───────────── */

export function ErrorMedidaFq4Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.a, 4, 1, MEDIDAS_G.length));
  const [n, setN] = useState(init);
  const datos = MEDIDAS_G.slice(0, n);
  const e = estadistica(datos);
  const verdadero = 9.81;
  const X = (v: number): number => 50 + ((v - 9.2) / 1.2) * 420;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al repetir la medida y promediar, la incertidumbre disminuye."}
      onReset={() => setN(init)}
      controls={<Slider label="Número de medidas que se promedian" value={n} min={1} max={MEDIDAS_G.length} step={1} color={MANIM.blue} onChange={setN} />}
    >
      <Svg w={520} h={130} testId="error-medida" maxH={150}>
        <Seg a={[50, 70]} b={[470, 70]} color={MANIM.muted} width={2} />
        <Seg a={[X(verdadero), 40]} b={[X(verdadero), 100]} color={MANIM.green} width={2} dashed />
        <text x={X(verdadero)} y={114} textAnchor="middle" fill={MANIM.green} fontSize={11}>valor de referencia 9,81</text>
        {datos.map((v, k) => <Dot key={k} p={[X(v), 70]} r={5} color={MANIM.blue} />)}
        {n >= 2 && <Seg a={[X(e.media - e.incertidumbre), 55]} b={[X(e.media + e.incertidumbre), 55]} color={MANIM.orange} width={5} />}
        <Dot p={[X(e.media), 55]} r={6} color={MANIM.orange} />
        <text x={50} y={26} fill={MANIM.muted} fontSize={11}>9,2</text>
        <text x={470} y={26} textAnchor="end" fill={MANIM.muted} fontSize={11}>10,4</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Media">{`${f2(e.media)} m/s²`}</Stat>
        <Stat color={MANIM.purple} label="Desviación típica s">{Number.isNaN(e.s) ? "—" : f2(e.s)}</Stat>
        <Stat color={MANIM.blue} label="Incertidumbre de la media s/√n">{Number.isNaN(e.incertidumbre) ? "—" : f2(e.incertidumbre)}</Stat>
        <Stat color={MANIM.green} label="Error absoluto respecto a 9,81">{f2(errorAbsoluto(e.media, verdadero))}</Stat>
        <Stat color={MANIM.red} label="Error relativo">{`${f2(errorRelativoPct(e.media, verdadero))} %`}</Stat>
      </Readout>
      <Note>Toda medida tiene <b>error</b>. El <b>error absoluto</b> es |medida − valor verdadero|, y el <b>relativo</b>, el error absoluto dividido entre el valor verdadero (en %): permite comparar la calidad de medidas de distinta magnitud. Los errores pueden ser <b>sistemáticos</b> (siempre en el mismo sentido: instrumento mal calibrado) o <b>aleatorios</b> (varían al repetir). Al <b>repetir</b> la medida, el mejor valor es la <b>media</b>, y la <b>incertidumbre</b> se estima con la desviación típica entre √n. Se escribe <b>x = media ± incertidumbre</b>, con <b>cifras significativas</b> coherentes. Las diez medidas de g son <b>simuladas</b> (péndulo).</Note>
    </Frame>
  );
}

/* ───────────── 3. Ajuste lineal ───────────── */

export function AjusteLinealFq4Explorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.n, 0, 0, CONJUNTOS.length - 1)), mejor: false, a: 0.3, b: 0 };
  const [s, setS] = useState(init);
  const set = CONJUNTOS[s.c]!;
  const xs = set.x as readonly number[];
  const ys = set.y as readonly number[];
  const fit = ajusteLineal(xs, ys);
  const aUso = s.mejor ? fit.a : s.a;
  const bUso = s.mejor ? fit.b : s.b;
  const xmax = Math.max(...xs) * 1.1;
  const ymax = Math.max(...ys) * 1.15;
  const X = (x: number): number => 50 + (x / xmax) * 420;
  const Y = (y: number): number => 150 - (y / ymax) * 125;
  const sr = sumaResiduos2(xs, ys, aUso, bUso);
  const aMax = (ymax / xmax) * 3;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El mejor ajuste minimiza la suma de los cuadrados de los residuos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Conjunto de datos" items={CONJUNTOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.c)} onChange={(k) => setS({ ...init, c: Number(k) })} />
          <Choice label="Recta" items={[{ value: "manual", label: "La ajusto yo" }, { value: "mejor", label: "Mejor ajuste" }]} value={s.mejor ? "mejor" : "manual"} onChange={(v) => setS((o) => ({ ...o, mejor: v === "mejor" }))} />
          {!s.mejor && <Slider label="Pendiente a" value={s.a} min={0} max={aMax} step={aMax / 100} color={MANIM.orange} format={f2} onChange={(a) => setS((o) => ({ ...o, a }))} />}
          {!s.mejor && <Slider label="Ordenada b" value={s.b} min={-ymax / 4} max={ymax / 4} step={ymax / 80} color={MANIM.purple} format={f2} onChange={(b) => setS((o) => ({ ...o, b }))} />}
        </>
      }
    >
      <Svg w={520} h={185} testId="ajuste-lineal" maxH={205}>
        <Seg a={[50, 150]} b={[480, 150]} color={MANIM.ink} width={2} />
        <Seg a={[50, 150]} b={[50, 15]} color={MANIM.ink} width={2} />
        <Seg a={[X(0), Y(Math.max(0, bUso))]} b={[X(xmax), Y(Math.max(0, Math.min(ymax * 1.2, aUso * xmax + bUso)))]} color={MANIM.orange} width={3} />
        {xs.map((x, i) => <Dot key={i} p={[X(x), Y(ys[i]!)]} r={5} color={MANIM.blue} />)}
        <text x={480} y={168} textAnchor="end" fill={MANIM.muted} fontSize={12}>{set.ejeX}</text>
        <text x={58} y={14} fill={MANIM.muted} fontSize={12}>{set.ejeY}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Recta y = a·x + b">{`y = ${f2(aUso)}·x ${bUso < 0 ? "−" : "+"} ${f2(Math.abs(bUso))}`}</Stat>
        <Stat color={MANIM.red} label="Suma de residuos² (tu recta)">{f2(sr)}</Stat>
        <Stat color={MANIM.green} label="Mejor ajuste">{`a = ${f2(fit.a)} · b = ${f2(fit.b)} · r² = ${fmtEs(fit.r2, 4)}`}</Stat>
        <Stat color={MANIM.purple} label={`La pendiente es la ${set.pendiente.split(" (")[0]}`}>{`${f2(fit.a)} ${set.pendiente.split("(")[1]?.replace(")", "") ?? ""}`}</Stat>
      </Readout>
      <Note>Cuando los datos siguen una tendencia lineal, se ajusta una <b>recta y = a·x + b</b>. El método de <b>mínimos cuadrados</b> elige a y b de modo que la <b>suma de los cuadrados de los residuos</b> (diferencias entre cada dato y la recta) sea mínima. La <b>pendiente</b> suele tener un significado físico (k del muelle, g, la densidad) y la <b>ordenada</b> indica el valor cuando x = 0. El coeficiente <b>r²</b> (entre 0 y 1) mide lo bien que explica la recta los datos: cuanto más cerca de 1, mejor. Los datos son <b>simulados</b>.</Note>
    </Frame>
  );
}
