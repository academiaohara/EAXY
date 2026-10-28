"use client";

import { useState, type ReactNode } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);
const f3 = (v: number) => fmtEs(v, 3);

const RAD = Math.PI / 180;

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Axonometría ortogonal: dados los coeficientes de reducción kx y ky, kz sale de kx² + ky² + kz² = 2. */
export function ejesOrtogonales(kx: number, ky: number) {
  const k2 = 2 - kx * kx - ky * ky;
  const kz = k2 > 0 ? Math.sqrt(k2) : NaN;
  const valido = Number.isFinite(kz) && kx > 0 && ky > 0 && kx <= 1 && ky <= 1 && kz <= 1;
  if (!valido) return { valido: false as const, kz, n: [NaN, NaN, NaN] as const, xy: NaN, yz: NaN, xz: NaN };
  // n_i² = 1 − k_i²: componentes de la normal al cuadro en el triedro de ejes
  const n = [Math.sqrt(1 - kx * kx), Math.sqrt(1 - ky * ky), Math.sqrt(1 - kz * kz)] as const;
  const ang = (ni: number, nj: number, ki: number, kj: number) => Math.acos(Math.max(-1, Math.min(1, -(ni * nj) / (ki * kj)))) / RAD;
  return { valido: true as const, kz, n, xy: ang(n[0], n[1], kx, ky), yz: ang(n[1], n[2], ky, kz), xz: ang(n[0], n[2], kx, kz) };
}
/** Tipo de axonometría ortogonal según cuántos coeficientes coinciden. */
export function tipoAxonometria(kx: number, ky: number, kz: number, tol = 0.006) {
  const iguales = [Math.abs(kx - ky) < tol, Math.abs(ky - kz) < tol, Math.abs(kx - kz) < tol].filter(Boolean).length;
  return iguales >= 3 ? "isométrica" : iguales >= 1 ? "dimétrica" : "trimétrica";
}
/** Semiejes (relativos al diámetro D) de la elipse en que se proyecta una circunferencia contenida en un plano coordenado cuya normal es el eje i: mayor = D; menor = D · n_i. */
export const elipseOrtogonal = (ni: number) => ({ mayor: 1, menor: ni });
export const COEF_ISO = Math.sqrt(2 / 3);

/** Proyección caballera de un punto (x, y, z): el plano XZ es paralelo al cuadro y el eje Y se reduce un factor k formando el ángulo α. */
export const caballera = (x: number, y: number, z: number, alphaDeg: number, k: number): Pt => [x + k * y * Math.cos(alphaDeg * RAD), z + k * y * Math.sin(alphaDeg * RAD)];

/** Plano que corta a los ejes en (a,0,0), (0,b,0) y (0,0,c): área real del triángulo de trazas y distancia del origen al plano. */
export function planoPorTrazas(a: number, b: number, c: number) {
  const s = Math.sqrt((a * b) ** 2 + (b * c) ** 2 + (c * a) ** 2);
  return { area: s / 2, distancia: s > 0 ? (a * b * c) / s : NaN };
}

/* ───────────── Dibujo de la caja en axonometría ortogonal ───────────── */

/** Vectores unitarios de pantalla (y hacia abajo) de los ejes X, Y, Z: Z vertical, X a 90° + θxz y Y a 90° − θyz (ángulos medidos hacia arriba). */
export function ejesPantalla(kx: number, ky: number, kz: number, xz: number, yz: number) {
  const v = (deg: number, k: number): Pt => [k * Math.cos(deg * RAD), -k * Math.sin(deg * RAD)];
  return { X: v(90 + xz, kx), Y: v(90 - yz, ky), Z: v(90, kz) };
}
export type Ejes = ReturnType<typeof ejesPantalla>;
export const proy = (e: Ejes, o: Pt, u: number, x: number, y: number, z: number): Pt => [o[0] + u * (x * e.X[0] + y * e.Y[0] + z * e.Z[0]), o[1] + u * (x * e.X[1] + y * e.Y[1] + z * e.Z[1])];

export function CajaAxo({ e, o, u, a, b, c, hueco, extra }: { e: Ejes; o: Pt; u: number; a: number; b: number; c: number; hueco?: number; extra?: ReactNode }) {
  const P = (x: number, y: number, z: number) => proy(e, o, u, x, y, z);
  const poly = (pts: Pt[], color: string, op: number) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={color} fillOpacity={op} stroke={MANIM.ink} strokeWidth={2} strokeLinejoin="round" />;
  const hid = (p: Pt, q: Pt) => <Seg a={p} b={q} color={MANIM.muted} width={1.2} dashed />;
  const agujero: Pt[] = [];
  if (hueco && hueco > 0) {
    for (let i = 0; i <= 60; i++) {
      const th = (2 * Math.PI * i) / 60;
      agujero.push(P(a / 2 + (hueco / 2) * Math.cos(th), b / 2 + (hueco / 2) * Math.sin(th), c));
    }
  }
  return (
    <>
      {hid(P(0, 0, 0), P(a, 0, 0))}
      {hid(P(0, 0, 0), P(0, b, 0))}
      {hid(P(0, 0, 0), P(0, 0, c))}
      {poly([P(0, 0, c), P(a, 0, c), P(a, b, c), P(0, b, c)], MANIM.blue, 0.28)}
      {poly([P(a, 0, 0), P(a, b, 0), P(a, b, c), P(a, 0, c)], MANIM.orange, 0.22)}
      {poly([P(0, b, 0), P(a, b, 0), P(a, b, c), P(0, b, c)], MANIM.green, 0.22)}
      {agujero.length ? <polygon points={agujero.map((p) => p.join(",")).join(" ")} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={1.8} /> : null}
      {extra}
    </>
  );
}

const nombres = (tipo: string) => (tipo === "isométrica" ? MANIM.green : tipo === "dimétrica" ? MANIM.yellow : MANIM.purple);

/* ───────────── 1. Coeficientes de reducción y tipo de axonometría ───────────── */

const PRESETS = [
  { value: "iso", label: "Isométrica", kx: COEF_ISO, ky: COEF_ISO },
  { value: "dim", label: "Dimétrica", kx: 0.9, ky: 0.9 },
  { value: "tri", label: "Trimétrica", kx: 0.9, ky: 0.7 },
];

export function AxonometriaOrtogonalDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { kx: num(block.params?.a, COEF_ISO, 0.5, 1), ky: num(block.params?.b, COEF_ISO, 0.5, 1) };
  const [s, setS] = useState(init);
  const r = ejesOrtogonales(s.kx, s.ky);
  const e = r.valido ? ejesPantalla(s.kx, s.ky, r.kz, r.xz, r.yz) : null;
  const tipo = r.valido ? tipoAxonometria(s.kx, s.ky, r.kz) : "no existe";
  const preset = PRESETS.find((p) => p.kx === s.kx && p.ky === s.ky)?.value ?? "libre";
  return (
    <Frame
      stacked
      hint={block.hint ?? "En axonometría ortogonal los tres coeficientes de reducción cumplen kx² + ky² + kz² = 2. Mira cómo cambian los ángulos entre ejes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo" items={PRESETS.map((p) => ({ value: p.value, label: p.label }))} value={preset === "libre" ? "iso" : preset} onChange={(v) => { const p = PRESETS.find((x) => x.value === v)!; setS({ kx: p.kx, ky: p.ky }); }} />
          <Slider label="Coeficiente kx" value={s.kx} min={0.5} max={1} step={0.01} color={MANIM.orange} format={f2} onChange={(kx) => setS((v) => ({ ...v, kx }))} />
          <Slider label="Coeficiente ky" value={s.ky} min={0.5} max={1} step={0.01} color={MANIM.green} format={f2} onChange={(ky) => setS((v) => ({ ...v, ky }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="axonometria-ortogonal" maxH={300}>
        {e ? (
          <>
            <CajaAxo e={e} o={[260, 170]} u={95} a={1} b={1} c={1} />
            <Seg a={[260, 170]} b={proy(e, [260, 170], 120, 1, 0, 0)} color={MANIM.orange} width={3} />
            <Seg a={[260, 170]} b={proy(e, [260, 170], 120, 0, 1, 0)} color={MANIM.green} width={3} />
            <Seg a={[260, 170]} b={proy(e, [260, 170], 120, 0, 0, 1)} color={MANIM.blue} width={3} />
            <Dot p={[260, 170]} r={4} />
          </>
        ) : (
          <text x={260} y={135} textAnchor="middle" fill={MANIM.red} fontSize={16} fontWeight={700}>
            Con esos coeficientes no existe una axonometría ortogonal
          </text>
        )}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Coeficiente kz = √(2 − kx² − ky²)">{r.valido ? f3(r.kz) : "—"}</Stat>
        <Stat color={nombres(tipo)} label="Tipo">{tipo}</Stat>
        <Stat color={MANIM.muted} label="Ángulos entre ejes X–Y · Y–Z · X–Z">{r.valido ? `${f1(r.xy)}° · ${f1(r.yz)}° · ${f1(r.xz)}°` : "—"}</Stat>
      </Readout>
      <Note>Los <b>coeficientes de reducción</b> son la razón entre la longitud proyectada de cada eje y la real. En axonometría <b>ortogonal</b> cumplen <b>kx² + ky² + kz² = 2</b>. Si los tres son iguales (<b>√(2/3) ≈ 0,816</b>) los ejes forman 120° y la perspectiva es <b>isométrica</b>; si solo dos coinciden, <b>dimétrica</b>; si los tres son distintos, <b>trimétrica</b>. Además los tres ángulos entre ejes son <b>obtusos</b> y suman 360°.</Note>
    </Frame>
  );
}

/* ───────────── 2. Perspectiva isométrica de una pieza ───────────── */

export function IsometricaPiezaDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 4, 1, 8)), b: Math.round(num(block.params?.b, 3, 1, 8)), c: Math.round(num(block.params?.c, 2, 1, 8)), d: 2, red: "1" };
  const [s, setS] = useState(init);
  const k = s.red === "1" ? 1 : COEF_ISO;
  const e = ejesPantalla(k, k, k, 120, 120);
  const dMax = Math.min(s.a, s.b);
  const d = Math.min(s.d, dMax);
  const w = Math.min(30, 440 / (0.866 * (s.a + s.b)), 250 / (s.c + 0.5 * (s.a + s.b)));
  const u = w / k;
  const el = elipseOrtogonal(1 / Math.sqrt(3));
  return (
    <Frame
      stacked
      hint={block.hint ?? "La isométrica con coeficiente 1 (dibujo isométrico) agranda todo un 22 % pero es más fácil de acotar. Con 0,816 se conserva la escala real."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Coeficiente de reducción" items={[{ value: "1", label: "1 (dibujo isométrico)" }, { value: "0", label: "0,816 (reducida)" }]} value={s.red} onChange={(red) => setS((v) => ({ ...v, red }))} />
          <Slider label="Largo (eje X)" value={s.a} min={1} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Ancho (eje Y)" value={s.b} min={1} max={8} step={1} unit=" cm" color={MANIM.green} onChange={(b) => setS((v) => ({ ...v, b }))} />
          <Slider label="Alto (eje Z)" value={s.c} min={1} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(c) => setS((v) => ({ ...v, c }))} />
          <Slider label="Diámetro del agujero (cara superior)" value={d} min={0} max={dMax} step={1} unit=" cm" color={MANIM.purple} onChange={(dd) => setS((v) => ({ ...v, d: dd }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="isometrica-pieza" maxH={300}>
        <CajaAxo e={e} o={[260 - 0.433 * (s.b - s.a) * w, 135 + (s.c * w) / 2 - ((s.a + s.b) * w) / 4]} u={u} a={s.a} b={s.b} c={s.c} hueco={d} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Escala de los ejes">{s.red === "1" ? "1 : 1 (coef. 1)" : "0,816 (coef. reducido)"}</Stat>
        <Stat color={MANIM.purple} label="Agujero: eje mayor de la elipse">{d > 0 ? `${f2((d * (s.red === "1" ? COEF_ISO ** -1 : 1)))} cm` : "—"}</Stat>
        <Stat color={MANIM.purple} label="Agujero: eje menor de la elipse">{d > 0 ? `${f2(d * el.menor * (s.red === "1" ? COEF_ISO ** -1 : 1))} cm` : "—"}</Stat>
      </Readout>
      <Note>En la <b>perspectiva isométrica</b> los tres ejes forman 120° y las medidas se llevan sobre ellos (o sobre rectas paralelas). Con el <b>coeficiente 1</b> (la que se usa en el dibujo) la pieza sale un 22 % mayor que con el coeficiente real 0,816, pero las proporciones se conservan. Las <b>circunferencias</b> de los planos coordenados se dibujan como <b>elipses</b>: el eje mayor mide 1,22·D y el menor 0,71·D con coeficiente 1 (D y 0,577·D con coeficiente 0,816). Observa que el eje mayor es siempre perpendicular al eje de la perspectiva que no está en ese plano.</Note>
    </Frame>
  );
}

/* ───────────── 3. Perspectiva caballera ───────────── */

export function CaballeraDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 5, 1, 8)), b: Math.round(num(block.params?.b, 4, 1, 8)), c: Math.round(num(block.params?.c, 3, 1, 8)), alpha: 45, k: 50, d: 2 };
  const [s, setS] = useState(init);
  const k = s.k / 100;
  const u = Math.min(30, 220 / Math.max(s.a + s.b * k, s.c + s.b * k, 1));
  const O: Pt = [120, 235];
  const P = (x: number, y: number, z: number): Pt => {
    const q = caballera(x, y, z, s.alpha, k);
    return [O[0] + q[0] * u, O[1] - q[1] * u];
  };
  const poly = (pts: Pt[], color: string, op: number) => <polygon points={pts.map((p) => p.join(",")).join(" ")} fill={color} fillOpacity={op} stroke={MANIM.ink} strokeWidth={2} strokeLinejoin="round" />;
  const d = Math.min(s.d, s.a, s.c);
  const agujero: Pt[] = [];
  if (d > 0) {
    for (let i = 0; i <= 60; i++) {
      const th = (2 * Math.PI * i) / 60;
      agujero.push(P(s.a / 2 + (d / 2) * Math.cos(th), 0, s.c / 2 + (d / 2) * Math.sin(th)));
    }
  }
  const real = s.b;
  const reducida = s.b * k;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En la caballera la cara frontal se dibuja en verdadera forma; la profundidad se reduce y se inclina."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Largo (eje X)" value={s.a} min={1} max={8} step={1} unit=" cm" color={MANIM.orange} onChange={(a) => setS((v) => ({ ...v, a }))} />
          <Slider label="Profundidad (eje Y)" value={s.b} min={1} max={8} step={1} unit=" cm" color={MANIM.green} onChange={(b) => setS((v) => ({ ...v, b }))} />
          <Slider label="Alto (eje Z)" value={s.c} min={1} max={8} step={1} unit=" cm" color={MANIM.blue} onChange={(c) => setS((v) => ({ ...v, c }))} />
          <Slider label="Ángulo del eje Y" value={s.alpha} min={30} max={60} step={15} unit="°" color={MANIM.purple} onChange={(alpha) => setS((v) => ({ ...v, alpha }))} />
          <Slider label="Coeficiente de reducción de Y" value={s.k} min={30} max={100} step={5} unit=" %" color={MANIM.yellow} onChange={(kk) => setS((v) => ({ ...v, k: kk }))} />
          <Slider label="Agujero en la cara frontal (diámetro)" value={d} min={0} max={Math.min(s.a, s.c)} step={1} unit=" cm" color={MANIM.red} onChange={(dd) => setS((v) => ({ ...v, d: dd }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="caballera" maxH={300}>
        <Seg a={P(0, s.b, 0)} b={P(0, 0, 0)} color={MANIM.muted} width={1.2} dashed />
        <Seg a={P(0, s.b, 0)} b={P(s.a, s.b, 0)} color={MANIM.muted} width={1.2} dashed />
        <Seg a={P(0, s.b, 0)} b={P(0, s.b, s.c)} color={MANIM.muted} width={1.2} dashed />
        {poly([P(0, 0, s.c), P(s.a, 0, s.c), P(s.a, s.b, s.c), P(0, s.b, s.c)], MANIM.blue, 0.26)}
        {poly([P(s.a, 0, 0), P(s.a, s.b, 0), P(s.a, s.b, s.c), P(s.a, 0, s.c)], MANIM.orange, 0.22)}
        {poly([P(0, 0, 0), P(s.a, 0, 0), P(s.a, 0, s.c), P(0, 0, s.c)], MANIM.green, 0.3)}
        {agujero.length ? <polygon points={agujero.map((p) => p.join(",")).join(" ")} fill={MANIM.surface} stroke={MANIM.ink} strokeWidth={1.8} /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Profundidad real → dibujada">{f1(real)} → {f2(reducida)} cm</Stat>
        <Stat color={MANIM.purple} label="Desplazamiento de cada punto de fondo (horizontal; vertical)">{f2(reducida * Math.cos(s.alpha * RAD))} ; {f2(reducida * Math.sin(s.alpha * RAD))} cm</Stat>
        <Stat color={MANIM.muted} label="Cara frontal">verdadera magnitud (el círculo es un círculo)</Stat>
      </Readout>
      <Note>En la <b>perspectiva caballera</b> (axonometría <b>oblicua</b>) el plano de la cara frontal es paralelo al cuadro: se dibuja en <b>verdadera forma</b>, con las circunferencias como circunferencias. El eje de profundidad forma el <b>ángulo α</b> (30°, 45° o 60°) con la horizontal y se <b>reduce</b> con un coeficiente: el habitual es <b>0,5</b> (con 45°). En la <b>perspectiva militar</b> es el plano horizontal el que está en verdadera forma. La caballera es muy cómoda para <b>piezas con detalles circulares en una cara</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Punto y plano en axonometría ───────────── */

type Modo = "punto" | "plano";

export function PuntoPlanoAxoDt1Explorador({ block }: { block: ToolBlock }) {
  const init = { m: (Math.round(num(block.params?.n, 0, 0, 1)) === 1 ? "plano" : "punto") as Modo, x: Math.round(num(block.params?.a, 3, 0, 5)), y: Math.round(num(block.params?.b, 2, 0, 5)), z: 4 };
  const [s, setS] = useState(init);
  const k = COEF_ISO;
  const e = ejesPantalla(k, k, k, 120, 120);
  const u = 28;
  const O: Pt = [260, 178];
  const P = (x: number, y: number, z: number) => proy(e, O, u, x, y, z);
  const axis = (v: Pt, label: string, color: string, len = 5) => (
    <>
      <Seg a={O} b={[O[0] + len * u * v[0], O[1] + len * u * v[1]]} color={color} width={1.6} />
      <text x={O[0] + (len + 0.6) * u * v[0]} y={O[1] + (len + 0.6) * u * v[1] + 4} textAnchor="middle" fill={color} fontSize={14} fontWeight={700}>
        {label}
      </text>
    </>
  );
  const pl = planoPorTrazas(s.x || 1, s.y || 1, s.z || 1);
  const a = s.x || 1;
  const b = s.y || 1;
  const c = s.z || 1;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un punto se sitúa llevando sus coordenadas sobre los ejes. Un plano puede darse por los puntos en que corta a los ejes."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Elemento" items={[{ value: "punto", label: "Punto" }, { value: "plano", label: "Plano por sus trazas" }]} value={s.m} onChange={(m) => setS((v) => ({ ...v, m }))} />
          <Slider label={s.m === "punto" ? "Coordenada x" : "Corte con el eje X (a)"} value={s.x} min={s.m === "plano" ? 1 : 0} max={6} step={1} unit=" cm" color={MANIM.orange} onChange={(x) => setS((v) => ({ ...v, x }))} />
          <Slider label={s.m === "punto" ? "Coordenada y" : "Corte con el eje Y (b)"} value={s.y} min={s.m === "plano" ? 1 : 0} max={6} step={1} unit=" cm" color={MANIM.green} onChange={(y) => setS((v) => ({ ...v, y }))} />
          <Slider label={s.m === "punto" ? "Coordenada z" : "Corte con el eje Z (c)"} value={s.z} min={s.m === "plano" ? 1 : 0} max={6} step={1} unit=" cm" color={MANIM.blue} onChange={(z) => setS((v) => ({ ...v, z }))} />
        </>
      }
    >
      <Svg w={520} h={270} testId="axo-punto-plano" maxH={300}>
        {axis(e.X, "X", MANIM.orange)}
        {axis(e.Y, "Y", MANIM.green)}
        {axis(e.Z, "Z", MANIM.blue)}
        {s.m === "punto" ? (
          <>
            <Seg a={P(0, 0, 0)} b={P(s.x, 0, 0)} color={MANIM.orange} width={3.5} />
            <Seg a={P(s.x, 0, 0)} b={P(s.x, s.y, 0)} color={MANIM.green} width={3.5} />
            <Seg a={P(s.x, s.y, 0)} b={P(s.x, s.y, s.z)} color={MANIM.blue} width={3.5} />
            <Seg a={P(0, 0, 0)} b={P(s.x, s.y, 0)} color={MANIM.muted} width={1.4} dashed />
            <Seg a={P(0, 0, 0)} b={P(s.x, s.y, s.z)} color={MANIM.yellow} width={1.6} dashed />
            <Dot p={P(s.x, s.y, 0)} color={MANIM.muted} r={4} />
            <Dot p={P(s.x, s.y, s.z)} color={MANIM.red} r={7} />
            <text x={P(s.x, s.y, s.z)[0] + 10} y={P(s.x, s.y, s.z)[1] - 8} fill={MANIM.red} fontSize={16} fontWeight={700}>P</text>
          </>
        ) : (
          <>
            <polygon points={[P(a, 0, 0), P(0, b, 0), P(0, 0, c)].map((p) => p.join(",")).join(" ")} fill={MANIM.purple} fillOpacity={0.25} stroke={MANIM.purple} strokeWidth={2.5} />
            <Dot p={P(a, 0, 0)} color={MANIM.orange} r={5} />
            <Dot p={P(0, b, 0)} color={MANIM.green} r={5} />
            <Dot p={P(0, 0, c)} color={MANIM.blue} r={5} />
          </>
        )}
      </Svg>
      <Readout>
        {s.m === "punto" ? (
          <>
            <Stat color={MANIM.red} label="Coordenadas de P (x; y; z)">({s.x}; {s.y}; {s.z})</Stat>
            <Stat color={MANIM.muted} label="Distancia al origen">{f2(Math.hypot(s.x, s.y, s.z))} cm</Stat>
            <Stat color={MANIM.muted} label="Proyección secundaria (cota 0)">({s.x}; {s.y}; 0)</Stat>
          </>
        ) : (
          <>
            <Stat color={MANIM.purple} label="Área real del triángulo de trazas">{f2(pl.area)} cm²</Stat>
            <Stat color={MANIM.muted} label="Distancia del origen al plano">{f2(pl.distancia)} cm</Stat>
            <Stat color={MANIM.muted} label="Ecuación">x/{a} + y/{b} + z/{c} = 1</Stat>
          </>
        )}
      </Readout>
      <Note>Un <b>punto</b> queda definido por sus coordenadas (x, y, z), que se llevan sucesivamente sobre los ejes. Su <b>proyección secundaria</b> es el punto sobre el plano XY; la altura z se mide desde ella en paralelo al eje Z. Una <b>recta</b> se define por dos puntos y sus <b>trazas</b> son los puntos donde corta a los planos coordenados. Un <b>plano</b> queda definido por las rectas en que corta a los planos coordenados, es decir, por los puntos donde corta a los ejes. Las medidas <b>sobre los ejes</b> se ven reducidas; en otras direcciones no se pueden medir directamente.</Note>
    </Frame>
  );
}
