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

export const C_LUZ = 300000; // km/s, aproximado

/** Tamaño de la sombra proyectada por un objeto de tamaño `c` con foco puntual a `a` del objeto y pantalla a `b` tras él. */
export function tamanoSombra(c: number, a: number, b: number): number {
  if (a <= 0) return NaN;
  return (c * (a + b)) / a;
}

/** El ángulo de reflexión es igual al de incidencia. */
export const anguloReflexion = (incidencia: number): number => incidencia;

export const MEDIOS = {
  aire: { nombre: "Aire", n: 1 },
  agua: { nombre: "Agua", n: 1.33 },
  vidrio: { nombre: "Vidrio", n: 1.5 },
  diamante: { nombre: "Diamante", n: 2.42 },
} as const;
export type MedioId = keyof typeof MEDIOS;

/** Ley de Snell: n1·sen(i) = n2·sen(r). Devuelve NaN si hay reflexión total. */
export function anguloRefraccion(n1: number, n2: number, iGrados: number): number {
  const s = (n1 * Math.sin((iGrados * Math.PI) / 180)) / n2;
  if (!Number.isFinite(s) || Math.abs(s) > 1) return NaN;
  return (Math.asin(s) * 180) / Math.PI;
}

/** Ángulo límite al pasar de n1 a n2 (solo existe si n1 > n2). */
export function anguloLimite(n1: number, n2: number): number {
  if (!(n1 > n2) || n2 <= 0) return NaN;
  return (Math.asin(n2 / n1) * 180) / Math.PI;
}

export const SONIDO_MEDIOS = {
  aire: { nombre: "Aire (20 °C)", v: 343 },
  agua: { nombre: "Agua", v: 1480 },
  acero: { nombre: "Acero", v: 5000 },
  vacio: { nombre: "Vacío", v: 0 },
} as const;
export type SonidoMedioId = keyof typeof SONIDO_MEDIOS;

export const longitudOnda = (v: number, f: number): number => (f > 0 ? v / f : NaN);
export const periodo = (f: number): number => (f > 0 ? 1 / f : NaN);
/** Distancia a un obstáculo que produce un eco tras `t` segundos (el sonido va y vuelve). */
export const distanciaEco = (v: number, t: number): number => (v * t) / 2;

/** Nivel sonoro a distancia d, sabiendo L1 a la distancia d1 (fuente puntual al aire libre). */
export function nivelADistancia(l1: number, d1: number, d: number): number {
  if (d <= 0 || d1 <= 0) return NaN;
  return l1 - 20 * Math.log10(d / d1);
}

export const RUIDOS = [
  { nombre: "Susurro", db: 30 },
  { nombre: "Conversación", db: 60 },
  { nombre: "Tráfico intenso", db: 80 },
  { nombre: "Discoteca", db: 100 },
  { nombre: "Avión al despegar", db: 120 },
] as const;

export function riesgoAuditivo(db: number): string {
  if (db < 55) return "sin riesgo";
  if (db < 70) return "molesto";
  if (db < 85) return "molesto; a la larga, perjudicial";
  if (db < 120) return "daño auditivo con exposición prolongada";
  return "umbral del dolor: daño inmediato";
}

const rad = (g: number): number => (g * Math.PI) / 180;

/* ───────────── 1. Propagación y sombras ───────────── */

export function SombrasFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: num(block.params?.a, 60, 20, 150), b: num(block.params?.b, 80, 10, 150), c: num(block.params?.c, 20, 5, 40) };
  const [s, setS] = useState(init);
  const sombra = tamanoSombra(s.c, s.a, s.b);
  const X0 = 50;
  const XO = X0 + s.a * 1.4;
  const XP = XO + s.b * 1.4;
  const cy = 100;
  const hp = s.c * 1.4 * 0.5;
  const hs = (sombra * 1.4 * 0.5) || 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanto más cerca está el objeto de la fuente, más grande es la sombra."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia foco – objeto" value={s.a} min={20} max={150} step={5} unit=" cm" color={MANIM.yellow} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Distancia objeto – pantalla" value={s.b} min={10} max={150} step={5} unit=" cm" color={MANIM.blue} onChange={(b) => setS((o) => ({ ...o, b }))} />
          <Slider label="Tamaño del objeto" value={s.c} min={5} max={40} step={1} unit=" cm" color={MANIM.orange} onChange={(c) => setS((o) => ({ ...o, c }))} />
        </>
      }
    >
      <Svg w={520} h={200} testId="sombras" maxH={220}>
        <Seg a={[XO, cy - hp]} b={[XP, cy - Math.min(hs, 95)]} color={MANIM.yellow} width={1.5} />
        <Seg a={[XO, cy + hp]} b={[XP, cy + Math.min(hs, 95)]} color={MANIM.yellow} width={1.5} />
        <Seg a={[X0, cy]} b={[XO, cy - hp]} color={MANIM.yellow} width={1.5} />
        <Seg a={[X0, cy]} b={[XO, cy + hp]} color={MANIM.yellow} width={1.5} />
        <Seg a={[XO, cy - hp]} b={[XO, cy + hp]} color={MANIM.orange} width={5} />
        <Seg a={[XP, cy - Math.min(hs, 95)]} b={[XP, cy + Math.min(hs, 95)]} color={MANIM.ink} width={6} />
        <Dot p={[X0, cy]} r={7} color={MANIM.yellow} />
        <text x={X0} y={cy + 24} textAnchor="middle" fill={MANIM.yellow} fontSize={12} fontWeight={700}>foco</text>
        <text x={XO} y={175} textAnchor="middle" fill={MANIM.orange} fontSize={12} fontWeight={700}>objeto</text>
        <text x={XP} y={175} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>pantalla</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Objeto">{`${f1(s.c)} cm`}</Stat>
        <Stat color={MANIM.ink} label="Sombra en la pantalla">{`${f1(sombra)} cm`}</Stat>
        <Stat color={MANIM.purple} label="Aumento">{`× ${f2(sombra / s.c)}`}</Stat>
      </Readout>
      <Note>La luz se propaga en <b>línea recta</b> y en todas direcciones desde el foco. Un objeto <b>opaco</b> la detiene y deja una <b>sombra</b>. Por semejanza de triángulos, <b>sombra = tamaño · (a + b) / a</b>, donde a es la distancia foco–objeto y b la distancia objeto–pantalla. Al acercar el objeto al foco o alejarlo de la pantalla, la sombra crece. Los <b>eclipses</b> de Sol y de Luna son sombras a escala astronómica.</Note>
    </Frame>
  );
}

/* ───────────── 2. Reflexión ───────────── */

export function ReflexionFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { i: Math.round(num(block.params?.a, 40, 0, 80)) };
  const [s, setS] = useState(init);
  const r = anguloReflexion(s.i);
  const cx = 260;
  const cy = 130;
  const L = 110;
  const pIn: [number, number] = [cx - L * Math.sin(rad(s.i)), cy - L * Math.cos(rad(s.i))];
  const pOut: [number, number] = [cx + L * Math.sin(rad(r)), cy - L * Math.cos(rad(r))];
  return (
    <Frame
      stacked
      hint={block.hint ?? "El ángulo de reflexión siempre es igual al de incidencia, medidos desde la normal."}
      onReset={() => setS(init)}
      controls={<Slider label="Ángulo de incidencia" value={s.i} min={0} max={80} step={1} unit="°" color={MANIM.yellow} onChange={(i) => setS({ i })} />}
    >
      <Svg w={520} h={170} testId="reflexion" maxH={190}>
        <Seg a={[60, cy]} b={[460, cy]} color={MANIM.ink} width={5} />
        <Seg a={[cx, cy - 108]} b={[cx, cy]} color={MANIM.muted} width={1.5} dashed />
        <Seg a={pIn} b={[cx, cy]} color={MANIM.yellow} width={3} />
        <Seg a={[cx, cy]} b={pOut} color={MANIM.green} width={3} />
        <text x={cx + 8} y={cy - 112} textAnchor="start" fill={MANIM.muted} fontSize={12}>normal</text>
        <text x={cx - 60} y={cy - 28} textAnchor="end" fill={MANIM.yellow} fontSize={13} fontWeight={700}>{`i = ${s.i}°`}</text>
        <text x={cx + 60} y={cy - 28} fill={MANIM.green} fontSize={13} fontWeight={700}>{`r = ${r}°`}</text>
        <text x={470} y={cy + 20} textAnchor="end" fill={MANIM.ink} fontSize={12}>espejo</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ángulo de incidencia">{`${s.i}°`}</Stat>
        <Stat color={MANIM.green} label="Ángulo de reflexión">{`${r}°`}</Stat>
        <Stat color={MANIM.purple} label="Rayo reflejado respecto al espejo">{`${90 - r}°`}</Stat>
      </Readout>
      <Note>Un rayo de luz que llega a una superficie <b>rebota</b>: es la <b>reflexión</b>. Los ángulos se miden respecto de la <b>normal</b> (perpendicular al espejo). <b>Ley de la reflexión</b>: el rayo incidente, la normal y el rayo reflejado están en el <b>mismo plano</b>, y el ángulo de incidencia es <b>igual</b> al de reflexión. En una superficie lisa (espejo) la reflexión es <b>especular</b>; en una rugosa, <b>difusa</b>, y por eso podemos ver los objetos desde cualquier lado.</Note>
    </Frame>
  );
}

/* ───────────── 3. Refracción ───────────── */

const IDS: MedioId[] = ["aire", "agua", "vidrio", "diamante"];

export function RefraccionFq2Explorador({ block }: { block: ToolBlock }) {
  const init = {
    i: Math.round(num(block.params?.a, 45, 0, 89)),
    m1: IDS[Math.round(num(block.params?.n, 0, 0, 3))]!,
    m2: "agua" as MedioId,
  };
  const [s, setS] = useState<{ i: number; m1: MedioId; m2: MedioId }>(init);
  const n1 = MEDIOS[s.m1].n;
  const n2 = MEDIOS[s.m2].n;
  const r = anguloRefraccion(n1, n2, s.i);
  const total = Number.isNaN(r);
  const lim = anguloLimite(n1, n2);
  const cx = 260;
  const cy = 90;
  const L = 80;
  const pIn: [number, number] = [cx - L * Math.sin(rad(s.i)), cy - L * Math.cos(rad(s.i))];
  const pRef: [number, number] = [cx + L * Math.sin(rad(s.i)), cy - L * Math.cos(rad(s.i))];
  const pOut: [number, number] = total ? pRef : [cx + L * Math.sin(rad(r)), cy + L * Math.cos(rad(r))];
  const items = IDS.map((id) => ({ value: id, label: MEDIOS[id].nombre }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Al pasar a un medio con mayor índice de refracción, el rayo se acerca a la normal."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ángulo de incidencia" value={s.i} min={0} max={89} step={1} unit="°" color={MANIM.yellow} onChange={(i) => setS((o) => ({ ...o, i }))} />
          <Choice label="Medio de arriba" items={items} value={s.m1} onChange={(m1) => setS((o) => ({ ...o, m1: m1 as MedioId }))} />
          <Choice label="Medio de abajo" items={items} value={s.m2} onChange={(m2) => setS((o) => ({ ...o, m2: m2 as MedioId }))} />
        </>
      }
    >
      <Svg w={520} h={180} testId="refraccion" maxH={200}>
        <rect x={60} y={cy} width={400} height={80} fill={MANIM.blue} fillOpacity={0.18} />
        <Seg a={[60, cy]} b={[460, cy]} color={MANIM.ink} width={2} />
        <Seg a={[cx, cy - 85]} b={[cx, cy + 85]} color={MANIM.muted} width={1.5} dashed />
        <Seg a={pIn} b={[cx, cy]} color={MANIM.yellow} width={3} />
        <Seg a={[cx, cy]} b={pOut} color={total ? MANIM.red : MANIM.green} width={3} />
        <text x={70} y={cy - 8} fill={MANIM.muted} fontSize={12}>{`${MEDIOS[s.m1].nombre} (n = ${fmtEs(n1, 2)})`}</text>
        <text x={70} y={cy + 20} fill={MANIM.muted} fontSize={12}>{`${MEDIOS[s.m2].nombre} (n = ${fmtEs(n2, 2)})`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Ángulo de incidencia">{`${s.i}°`}</Stat>
        <Stat color={total ? MANIM.red : MANIM.green} label={total ? "Resultado" : "Ángulo de refracción"}>{total ? "reflexión total" : `${f1(r)}°`}</Stat>
        <Stat color={MANIM.purple} label="Ángulo límite">{Number.isNaN(lim) ? "no existe" : `${f1(lim)}°`}</Stat>
      </Readout>
      <Note>La <b>refracción</b> es el cambio de dirección de la luz al pasar de un medio a otro, porque cambia su <b>velocidad</b>. El <b>índice de refracción</b> n = c / v mide cuánto se frena la luz en el medio. <b>Ley de Snell</b>: n₁ · sen(i) = n₂ · sen(r). Al entrar en un medio con <b>mayor n</b>, el rayo se <b>acerca</b> a la normal; si sale a uno con menor n, se <b>aleja</b>. Pasado el <b>ángulo límite</b> no hay refracción: toda la luz se refleja (<b>reflexión total</b>, base de la fibra óptica). Los valores de n son aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 4. El sonido ───────────── */

const SIDS: SonidoMedioId[] = ["aire", "agua", "acero", "vacio"];

export function OndaSonidoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.a, 4, 1, 10)), amp: num(block.params?.b, 40, 5, 60), m: SIDS[Math.round(num(block.params?.n, 0, 0, 3))]! };
  const [s, setS] = useState<{ f: number; amp: number; m: SonidoMedioId }>(init);
  const v = SONIDO_MEDIOS[s.m].v;
  const fHz = s.f * 100; // frecuencia real mostrada (100 Hz por ciclo)
  const lambda = longitudOnda(v, fHz);
  const pts: string[] = [];
  for (let x = 0; x <= 440; x += 4) {
    const y = 80 - s.amp * Math.sin((x / 440) * s.f * 2 * Math.PI);
    pts.push(`${x + 40},${y}`);
  }
  return (
    <Frame
      stacked
      hint={block.hint ?? "Más frecuencia = sonido más agudo; más amplitud = sonido más fuerte."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Frecuencia" value={s.f * 100} min={100} max={1000} step={100} unit=" Hz" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, f: h / 100 }))} />
          <Slider label="Amplitud (intensidad)" value={s.amp} min={5} max={60} step={5} color={MANIM.orange} onChange={(amp) => setS((o) => ({ ...o, amp }))} />
          <Choice label="Medio de propagación" items={SIDS.map((id) => ({ value: id, label: SONIDO_MEDIOS[id].nombre }))} value={s.m} onChange={(m) => setS((o) => ({ ...o, m: m as SonidoMedioId }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="onda-sonido" maxH={180}>
        <Seg a={[40, 80]} b={[480, 80]} color={MANIM.muted} width={1} dashed />
        <polyline points={pts.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <text x={480} y={150} textAnchor="end" fill={MANIM.muted} fontSize={12}>{`${s.f} ciclos en la ventana`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Frecuencia">{`${fHz} Hz`}</Stat>
        <Stat color={MANIM.purple} label="Velocidad del sonido">{v === 0 ? "no se propaga" : `${fmtEs(v, 0)} m/s`}</Stat>
        <Stat color={MANIM.green} label="Longitud de onda">{Number.isNaN(lambda) || v === 0 ? "—" : `${f2(lambda)} m`}</Stat>
      </Readout>
      <Note>El <b>sonido</b> es una <b>onda mecánica</b>: nace de una vibración y se propaga por un medio material (sólido, líquido o gas); en el <b>vacío no se propaga</b>. La <b>frecuencia</b> (en Hz) determina el <b>tono</b> (grave o agudo); la <b>amplitud</b>, la <b>intensidad</b> (fuerte o débil). Va más deprisa en sólidos y líquidos que en gases. Se cumple <b>λ = v / f</b>. El oído humano percibe aproximadamente entre <b>20 Hz y 20 000 Hz</b>. La escala de frecuencias de aquí es ilustrativa. Las velocidades son aproximadas.</Note>
    </Frame>
  );
}

/* ───────────── 5. Ruido y decibelios ───────────── */

export function DecibeliosFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { l1: Math.round(num(block.params?.a, 90, 30, 120)), d: Math.round(num(block.params?.b, 1, 1, 64)) };
  const [s, setS] = useState(init);
  const nivel = nivelADistancia(s.l1, 1, s.d);
  const clamp = Math.max(0, Math.min(130, nivel));
  const W = (clamp / 130) * 400;
  const color = nivel < 55 ? MANIM.green : nivel < 85 ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada vez que se duplica la distancia, el nivel baja unos 6 dB."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Nivel a 1 m de la fuente" value={s.l1} min={30} max={120} step={5} unit=" dB" color={MANIM.orange} onChange={(l1) => setS((o) => ({ ...o, l1 }))} />
          <Slider label="Distancia al oyente" value={s.d} min={1} max={64} step={1} unit=" m" color={MANIM.blue} onChange={(d) => setS((o) => ({ ...o, d }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="decibelios" maxH={170}>
        <rect x={60} y={40} width={400} height={26} rx={6} fill={MANIM.muted} fillOpacity={0.2} />
        <rect x={60} y={40} width={W} height={26} rx={6} fill={color} fillOpacity={0.85} />
        {RUIDOS.map((r) => (
          <g key={r.db}>
            <Seg a={[60 + (r.db / 130) * 400, 70]} b={[60 + (r.db / 130) * 400, 82]} color={MANIM.muted} width={1.5} />
            <text x={60 + (r.db / 130) * 400} y={96} textAnchor="middle" fill={MANIM.muted} fontSize={11}>{`${r.db}`}</text>
          </g>
        ))}
        <text x={60} y={28} fill={MANIM.ink} fontSize={13} fontWeight={700}>{`${f1(clamp)} dB`}</text>
        <text x={60} y={125} fill={MANIM.muted} fontSize={12}>30 susurro · 60 conversación · 80 tráfico · 100 discoteca · 120 avión</text>
      </Svg>
      <Readout>
        <Stat color={color} label="Nivel en el oyente">{`${f1(nivel)} dB`}</Stat>
        <Stat color={MANIM.purple} label="Valoración">{riesgoAuditivo(nivel)}</Stat>
      </Readout>
      <Note>La <b>intensidad</b> del sonido se mide en <b>decibelios (dB)</b> con una escala <b>logarítmica</b>: 10 dB más es una intensidad <b>10 veces mayor</b>. La <b>contaminación acústica</b> es el exceso de ruido. La OMS recomienda no pasar de unos <b>55 dB</b> de día en zonas residenciales, y por encima de <b>85 dB</b> la exposición prolongada daña el oído. En campo abierto, cada vez que se <b>duplica la distancia</b> el nivel baja unos <b>6 dB</b>. Para protegernos: <b>alejarse</b> de la fuente, usar <b>tapones</b> y <b>aislar</b> con materiales absorbentes. Los umbrales son orientativos.</Note>
    </Frame>
  );
}
