"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Resultante de una carga repartida sobre un tramo L: valor y distancia desde el extremo que se indica. */
export function resultanteReparto(tipo: "uniforme" | "triangular", q: number, L: number) {
  if (tipo === "uniforme") return { Q: q * L, x: L / 2 };
  return { Q: (q * L) / 2, x: (2 * L) / 3 }; // q = 0 en el origen y máxima en el otro extremo
}

/** Reacciones de una viga biapoyada de luz L con una carga puntual P a una distancia a del apoyo A y una carga uniforme q. */
export function reacciones(L: number, P: number, a: number, q: number) {
  if (L <= 0) return { RA: 0, RB: 0 };
  const RB = (P * a + (q * L * L) / 2) / L;
  const RA = P + q * L - RB;
  return { RA, RB };
}

/** Momento flector máximo (kN·m) de una viga biapoyada: carga puntual central o carga uniforme. */
export const momentoMaximo = (caso: "puntual" | "uniforme", carga: number, L: number) => (caso === "puntual" ? (carga * L) / 4 : (carga * L * L) / 8);

export const inerciaRectangulo = (bMm: number, hMm: number) => (bMm * hMm ** 3) / 12;
export const inerciaCirculo = (dMm: number) => (Math.PI * dMm ** 4) / 64;
/** Tensión máxima de flexión (MPa) con M en kN·m, I en mm⁴ y c (distancia a la fibra extrema) en mm. */
export const tensionFlexion = (M_kNm: number, I_mm4: number, cMm: number) => (I_mm4 > 0 ? (M_kNm * 1e6 * cMm) / I_mm4 : Infinity);
/** Flecha máxima (mm): cargas en kN o kN/m, L en m, E en GPa e I en mm⁴. */
export function flecha(caso: "puntual" | "uniforme", carga: number, L_m: number, E_GPa: number, I_mm4: number) {
  const EI = E_GPa * 1000 * I_mm4; // N·mm²
  if (EI <= 0) return Infinity;
  const L = L_m * 1000;
  return caso === "puntual" ? (carga * 1000 * L ** 3) / (48 * EI) : (5 * carga * L ** 4) / (384 * EI); // carga uniforme kN/m = N/mm
}

export const inerciaPolarCirculo = (dMm: number) => (Math.PI * dMm ** 4) / 32;
/** Tensión cortante máxima por torsión (MPa) con T en N·m y d en mm. */
export const tensionTorsion = (T_Nm: number, dMm: number) => (dMm > 0 ? (16 * T_Nm * 1000) / (Math.PI * dMm ** 3) : Infinity);
/** Ángulo de torsión (grados): T en N·m, L en mm, G en GPa, d en mm. */
export function anguloTorsion(T_Nm: number, L_mm: number, G_GPa: number, dMm: number) {
  const GJ = G_GPa * 1000 * inerciaPolarCirculo(dMm);
  return GJ > 0 ? ((T_Nm * 1000 * L_mm) / GJ) * (180 / Math.PI) : Infinity;
}

/** Cortadura de un remache o tornillo: tensión cortante (MPa) y de aplastamiento (MPa). */
export const cortaduraUnion = (F_N: number, n: number, dMm: number) => (n > 0 && dMm > 0 ? F_N / (n * (Math.PI * dMm ** 2) / 4) : Infinity);
export const aplastamientoUnion = (F_N: number, n: number, dMm: number, tMm: number) => (n > 0 && dMm > 0 && tMm > 0 ? F_N / (n * dMm * tMm) : Infinity);

export const APOYOS_EULER = [
  { n: "Articulado - articulado", k: 1 },
  { n: "Empotrado - libre", k: 2 },
  { n: "Empotrado - articulado", k: 0.7 },
  { n: "Empotrado - empotrado", k: 0.5 },
];
/** Carga crítica de Euler (kN): E en GPa, I en mm⁴, L en m. */
export const cargaCritica = (E_GPa: number, I_mm4: number, L_m: number, k: number) => {
  const Le = k * L_m * 1000;
  return Le > 0 ? (Math.PI ** 2 * E_GPa * 1000 * I_mm4) / Le ** 2 / 1000 : Infinity;
};
/** Coeficiente de seguridad al vuelco: momento estabilizador entre momento volcador. */
export const coefVuelco = (pesoKN: number, brazoEstM: number, fuerzaKN: number, alturaM: number) => (fuerzaKN * alturaM > 0 ? (pesoKN * brazoEstM) / (fuerzaKN * alturaM) : Infinity);

/* ───────────── 1. Carga repartida y resultante ───────────── */

export function CargaRepartidaExplorador({ block }: { block: ToolBlock }) {
  const init = { t: Math.round(num(block.params?.n, 0, 0, 1)), q: num(block.params?.a, 10, 1, 50), L: 6 };
  const [s, setS] = useState(init);
  const r = resultanteReparto(s.t === 0 ? "uniforme" : "triangular", s.q, s.L);
  const X = (m: number) => 40 + (m / s.L) * 440;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una carga repartida se sustituye por una fuerza equivalente (resultante) aplicada en el centro de gravedad del reparto."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Reparto" items={[{ value: 0, label: "Uniforme" }, { value: 1, label: "Triangular (máxima a la derecha)" }]} value={s.t} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <Slider label="Carga máxima q" value={s.q} min={1} max={50} step={1} unit=" kN/m" color={MANIM.blue} onChange={(q) => setS((x) => ({ ...x, q }))} />
          <Slider label="Longitud del tramo" value={s.L} min={1} max={12} step={0.5} unit=" m" color={MANIM.orange} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="carga-repartida" maxH={150}>
        <line x1={40} y1={95} x2={480} y2={95} stroke={MANIM.muted} strokeWidth={5} />
        {Array.from({ length: 12 }, (_, i) => {
          const x = 50 + i * 38;
          const h = s.t === 0 ? 40 : (40 * (x - 40)) / 440;
          return <line key={i} x1={x} y1={95 - h} x2={x} y2={92} stroke={MANIM.blue} strokeWidth={2} />;
        })}
        <line x1={X(s.t === 0 ? r.x : s.L - r.x)} y1={15} x2={X(s.t === 0 ? r.x : s.L - r.x)} y2={90} stroke={MANIM.red} strokeWidth={4} />
        <polygon points={`${X(s.t === 0 ? r.x : s.L - r.x) - 6},80 ${X(s.t === 0 ? r.x : s.L - r.x) + 6},80 ${X(s.t === 0 ? r.x : s.L - r.x)},92`} fill={MANIM.red} />
        <text x={X(s.t === 0 ? r.x : s.L - r.x) + 8} y={24} fill={MANIM.red} fontSize={12}>
          Q = {f1(r.Q)} kN
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Resultante Q">{f1(r.Q)} kN</Stat>
        <Stat color={MANIM.purple} label={s.t === 0 ? "Posición (desde un extremo)" : "Posición (desde el extremo sin carga)"}>{f2(r.x)} m</Stat>
      </Readout>
      <Note>Uniforme: Q = q·L, aplicada en el centro (L/2). Triangular: Q = q·L/2 (área del triángulo), aplicada a 2L/3 del extremo donde la carga es cero (en el centro de gravedad del triángulo). La resultante da el mismo efecto en equilibrio, pero no sirve para calcular esfuerzos internos dentro del tramo.</Note>
    </Frame>
  );
}

/* ───────────── 2. Reacciones en una viga biapoyada ───────────── */

export function ReaccionesExplorador({ block }: { block: ToolBlock }) {
  const init = { L: 6, P: num(block.params?.a, 20, 0, 100), a: num(block.params?.b, 2, 0, 12), q: 5 };
  const [s, setS] = useState(init);
  const a = Math.min(s.a, s.L);
  const r = reacciones(s.L, s.P, a, s.q);
  const X = (m: number) => 40 + (m / s.L) * 440;
  const ok = Math.abs(r.RA + r.RB - (s.P + s.q * s.L)) < 1e-9;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Viga apoyada en A y B con una carga puntual y una carga uniforme. Las reacciones salen de las ecuaciones de equilibrio."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Luz entre apoyos L" value={s.L} min={2} max={12} step={0.5} unit=" m" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Carga puntual P" value={s.P} min={0} max={100} step={5} unit=" kN" color={MANIM.red} onChange={(P) => setS((x) => ({ ...x, P }))} />
          <Slider label="Distancia de P al apoyo A" value={Math.min(s.a, s.L)} min={0} max={12} step={0.5} unit=" m" color={MANIM.orange} onChange={(v) => setS((x) => ({ ...x, a: v }))} />
          <Slider label="Carga uniforme q" value={s.q} min={0} max={30} step={1} unit=" kN/m" color={MANIM.purple} onChange={(q) => setS((x) => ({ ...x, q }))} />
        </>
      }
    >
      <Svg w={520} h={140} testId="reacciones" maxH={160}>
        <line x1={40} y1={70} x2={480} y2={70} stroke={MANIM.muted} strokeWidth={6} />
        <polygon points="40,72 28,95 52,95" fill={MANIM.green} fillOpacity={0.6} />
        <polygon points="480,72 468,95 492,95" fill={MANIM.green} fillOpacity={0.6} />
        <line x1={X(a)} y1={15} x2={X(a)} y2={66} stroke={MANIM.red} strokeWidth={4} />
        <text x={X(a) + 6} y={24} fill={MANIM.red} fontSize={12}>
          P = {f0(s.P)} kN
        </text>
        <text x={40} y={118} textAnchor="middle" fill={MANIM.green} fontSize={12}>
          RA = {f1(r.RA)}
        </text>
        <text x={480} y={118} textAnchor="middle" fill={MANIM.green} fontSize={12}>
          RB = {f1(r.RB)}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Reacción en A">{f1(r.RA)} kN</Stat>
        <Stat color={MANIM.green} label="Reacción en B">{f1(r.RB)} kN</Stat>
        <Stat color={ok ? MANIM.green : MANIM.red} label="Comprobación ΣF = 0">{f1(r.RA + r.RB)} = {f1(s.P + s.q * s.L)} kN</Stat>
      </Readout>
      <Note>Momentos respecto a A: R<sub>B</sub>·L = P·a + (q·L)·L/2. Fuerzas verticales: R<sub>A</sub> + R<sub>B</sub> = P + q·L. Si la carga puntual se acerca a un apoyo, ese apoyo recibe casi toda la carga. Las dos ecuaciones (ΣM = 0 y ΣF = 0) bastan porque la viga es isostática.</Note>
    </Frame>
  );
}

/* ───────────── 3. Flexión de una viga ───────────── */

export function FlexionTi2Explorador({ block }: { block: ToolBlock }) {
  const init = { caso: Math.round(num(block.params?.n, 0, 0, 1)), c: num(block.params?.a, 20, 1, 200), L: 4, b: 100, h: 200, sec: 0 };
  const [s, setS] = useState(init);
  const caso = s.caso === 0 ? "puntual" : "uniforme";
  const M = momentoMaximo(caso, s.c, s.L);
  const I = s.sec === 0 ? inerciaRectangulo(s.b, s.h) : inerciaCirculo(s.h);
  const cExt = s.h / 2;
  const sig = tensionFlexion(M, I, cExt);
  const fl = flecha(caso, s.c, s.L, 210, I);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una viga de acero (E = 210 GPa) apoyada en sus extremos. Cambia la carga y la sección para ver el momento, la tensión y la flecha."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Carga" items={[{ value: 0, label: "Puntual en el centro" }, { value: 1, label: "Uniforme" }]} value={s.caso} onChange={(c2) => setS((x) => ({ ...x, caso: c2 }))} />
          <Choice label="Sección" items={[{ value: 0, label: "Rectangular b × h" }, { value: 1, label: "Circular de diámetro h" }]} value={s.sec} onChange={(sec) => setS((x) => ({ ...x, sec }))} />
          <Slider label={s.caso === 0 ? "Carga P" : "Carga q"} value={s.c} min={1} max={200} step={1} unit={s.caso === 0 ? " kN" : " kN/m"} color={MANIM.red} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Luz L" value={s.L} min={1} max={10} step={0.5} unit=" m" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Canto h" value={s.h} min={50} max={500} step={10} unit=" mm" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
          {s.sec === 0 ? <Slider label="Ancho b" value={s.b} min={20} max={300} step={10} unit=" mm" color={MANIM.purple} onChange={(b) => setS((x) => ({ ...x, b }))} /> : null}
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Momento flector máximo">{f1(M)} kN·m</Stat>
        <Stat color={MANIM.purple} label="Inercia I">{f1(I / 1e6)} · 10⁶ mm⁴</Stat>
        <Stat color={MANIM.orange} label="Tensión máxima σ = M·c/I">{f1(sig)} MPa</Stat>
        <Stat color={fl > (s.L * 1000) / 300 ? MANIM.red : MANIM.green} label="Flecha máxima">{f1(fl)} mm</Stat>
        <Stat color={MANIM.muted} label="Flecha admisible (L/300)">{f1((s.L * 1000) / 300)} mm</Stat>
      </Readout>
      <Note>M<sub>máx</sub> = P·L/4 (puntual) o q·L²/8 (uniforme). σ = M·c/I con c = h/2 en una sección simétrica. La inercia de un rectángulo es b·h³/12: el <b>canto pesa al cubo</b>, por eso las vigas se colocan «de canto». La flecha crece con L³ (puntual) o L⁴ (uniforme) y disminuye con E·I. Se comprueba la <b>resistencia</b> (σ ≤ σ<sub>adm</sub>) y la <b>rigidez</b> (flecha ≤ L/300).</Note>
    </Frame>
  );
}

/* ───────────── 4. Torsión de un eje ───────────── */

export function TorsionExplorador({ block }: { block: ToolBlock }) {
  const init = { T: num(block.params?.a, 200, 10, 2000), d: 30, L: 500 };
  const [s, setS] = useState(init);
  const tau = tensionTorsion(s.T, s.d);
  const th = anguloTorsion(s.T, s.L, 80, s.d);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un eje de acero (G = 80 GPa) transmite un par. Cambia el par, el diámetro y la longitud."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Par de torsión T" value={s.T} min={10} max={2000} step={10} unit=" N·m" color={MANIM.red} onChange={(T) => setS((x) => ({ ...x, T }))} />
          <Slider label="Diámetro del eje" value={s.d} min={10} max={80} step={1} unit=" mm" color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Longitud" value={s.L} min={100} max={2000} step={50} unit=" mm" color={MANIM.orange} onChange={(L) => setS((x) => ({ ...x, L }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Tensión cortante máxima τ">{f1(tau)} MPa</Stat>
        <Stat color={MANIM.orange} label="Ángulo de torsión">{f2(th)} °</Stat>
        <Stat color={MANIM.purple} label="Inercia polar J">{f1(inerciaPolarCirculo(s.d) / 1000)} · 10³ mm⁴</Stat>
      </Readout>
      <Note>τ<sub>máx</sub> = T·r/J con J = π·d⁴/32, es decir, τ<sub>máx</sub> = 16·T/(π·d³). Duplicar el diámetro reduce la tensión 8 veces; el ángulo θ = T·L/(G·J) disminuye 16 veces. La tensión es máxima en la superficie y nula en el eje; por eso los ejes huecos aprovechan mejor el material.</Note>
    </Frame>
  );
}

/* ───────────── 5. Uniones atornilladas: cortadura ───────────── */

export function CortaduraExplorador({ block }: { block: ToolBlock }) {
  const init = { F: num(block.params?.a, 20, 1, 200), n: 2, d: 10, t: 6 };
  const [s, setS] = useState(init);
  const tau = cortaduraUnion(s.F * 1000, s.n, s.d);
  const ap = aplastamientoUnion(s.F * 1000, s.n, s.d, s.t);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Una unión con tornillos a cortadura: la fuerza se reparte entre los tornillos y corta su sección, además de aplastar la chapa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza que transmite la unión" value={s.F} min={1} max={200} step={1} unit=" kN" color={MANIM.red} onChange={(F) => setS((x) => ({ ...x, F }))} />
          <Slider label="Número de tornillos" value={s.n} min={1} max={10} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Diámetro del tornillo" value={s.d} min={4} max={24} step={1} unit=" mm" color={MANIM.orange} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Espesor de la chapa" value={s.t} min={2} max={20} step={1} unit=" mm" color={MANIM.purple} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Readout>
        <Stat color={tau <= 150 ? MANIM.green : MANIM.red} label="Tensión cortante en el tornillo">{f0(tau)} MPa</Stat>
        <Stat color={ap <= 300 ? MANIM.green : MANIM.red} label="Tensión de aplastamiento en la chapa">{f0(ap)} MPa</Stat>
      </Readout>
      <Note>τ = F / (n·π·d²/4) y σ<sub>aplast</sub> = F / (n·d·t). Valores de referencia orientativos: τ<sub>adm</sub> ≈ 150 MPa para un tornillo de acero y σ<sub>aplast adm</sub> ≈ 300 MPa para la chapa. Más tornillos o más diámetro reducen ambas tensiones. Las tensiones de un buen diseño quedan por debajo de los límites con un coeficiente de seguridad.</Note>
    </Frame>
  );
}

/* ───────────── 6. Pandeo y vuelco ───────────── */

export function PandeoVuelcoExplorador({ block }: { block: ToolBlock }) {
  const init = { modo: Math.round(num(block.params?.n, 0, 0, 1)), L: num(block.params?.a, 3, 0.5, 8), d: 60, k: 0, W: 50, b: 1.5, F: 8, h: 6 };
  const [s, setS] = useState(init);
  const I = inerciaCirculo(s.d);
  const Pcr = cargaCritica(210, I, s.L, APOYOS_EULER[s.k]!.k);
  const cv = coefVuelco(s.W, s.b / 2, s.F, s.h);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos fallos de estabilidad: el pandeo de un pilar esbelto y el vuelco de una estructura."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Fallo" items={[{ value: 0, label: "Pandeo de un pilar" }, { value: 1, label: "Vuelco" }]} value={s.modo} onChange={(modo) => setS((x) => ({ ...x, modo }))} />
          {s.modo === 0 ? (
            <>
              <Slider label="Longitud del pilar" value={s.L} min={0.5} max={8} step={0.5} unit=" m" color={MANIM.blue} onChange={(L) => setS((x) => ({ ...x, L }))} />
              <Slider label="Diámetro (acero macizo)" value={s.d} min={20} max={150} step={5} unit=" mm" color={MANIM.orange} onChange={(d) => setS((x) => ({ ...x, d }))} />
              <Choice label="Condiciones de apoyo" items={APOYOS_EULER.map((x, value) => ({ value, label: x.n }))} value={s.k} onChange={(k) => setS((x) => ({ ...x, k }))} />
            </>
          ) : (
            <>
              <Slider label="Peso de la estructura" value={s.W} min={10} max={300} step={10} unit=" kN" color={MANIM.green} onChange={(W) => setS((x) => ({ ...x, W }))} />
              <Slider label="Ancho de la base" value={s.b} min={0.5} max={6} step={0.5} unit=" m" color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b }))} />
              <Slider label="Fuerza horizontal (viento)" value={s.F} min={1} max={60} step={1} unit=" kN" color={MANIM.red} onChange={(F) => setS((x) => ({ ...x, F }))} />
              <Slider label="Altura de aplicación" value={s.h} min={1} max={20} step={1} unit=" m" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
            </>
          )}
        </>
      }
    >
      {s.modo === 0 ? (
        <Readout>
          <Stat color={MANIM.blue} label="Esbeltez L/d">{f0((s.L * 1000) / s.d)}</Stat>
          <Stat color={MANIM.orange} label="Carga crítica de Euler">{f0(Pcr)} kN</Stat>
          <Stat color={MANIM.muted} label="Longitud de pandeo">{f2(APOYOS_EULER[s.k]!.k * s.L)} m</Stat>
        </Readout>
      ) : (
        <Readout>
          <Stat color={MANIM.green} label="Momento estabilizador">{f1(s.W * (s.b / 2))} kN·m</Stat>
          <Stat color={MANIM.red} label="Momento volcador">{f1(s.F * s.h)} kN·m</Stat>
          <Stat color={cv >= 1.5 ? MANIM.green : MANIM.red} label="Coeficiente de vuelco">{Number.isFinite(cv) ? f2(cv) : "—"}</Stat>
        </Readout>
      )}
      <Note>{s.modo === 0 ? "Un pilar esbelto falla por pandeo antes de agotar el material: P_cr = π²·E·I/(K·L)². Depende del cuadrado de la longitud (duplicar L reparte la capacidad entre 4) y de las condiciones de apoyo K: empotrado-libre (K = 2) aguanta cuatro veces menos que articulado-articulado. Se sustituye I por el menor momento de inercia de la sección." : "Una estructura no vuelca mientras el momento estabilizador del peso (W·b/2, respecto a la arista de giro) supere al momento volcador (F·h). Se exige un coeficiente de seguridad al vuelco de al menos 1,5. Más peso, base más ancha o menor altura del punto de aplicación lo mejoran."}</Note>
    </Frame>
  );
}
