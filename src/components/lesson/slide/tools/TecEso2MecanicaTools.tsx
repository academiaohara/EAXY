"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (x: number) => fmtEs(x, 1);
const f2 = (x: number) => fmtEs(x, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Tensión (MPa = N/mm²) en una sección de `areaMm2` mm² sometida a `fuerzaN` newton. */
export const tension = (fuerzaN: number, areaMm2: number) => (areaMm2 > 0 ? fuerzaN / areaMm2 : Infinity);

/** Coeficiente de seguridad: resistencia del material ÷ tensión aplicada. */
export const coefSeguridad = (limiteMPa: number, tensionMPa: number) => (tensionMPa > 0 ? limiteMPa / tensionMPa : Infinity);

/** Momento de inercia (mm⁴) de un rectángulo `b` × `h` que se flexa «de canto» (h vertical) o «plano». */
export const inercia = (b: number, h: number, canto: boolean) => (canto ? (b * h ** 3) / 12 : (h * b ** 3) / 12);

/** Palanca (0): `k` = brazo de la fuerza en cm (brazo de la carga fijo, 20 cm). Polipasto (1): `k` poleas móviles. Plano inclinado (2): `k` longitud en m con 1 m de altura. */
export function maquinaSimple(maq: 0 | 1 | 2, carga: number, k: number) {
  if (maq === 0) return { fuerza: (carga * 20) / k, recorrido: k / 20 };
  return { fuerza: carga / k, recorrido: k };
}

/** Relación de transmisión de un tren de dos etapas (entrada ÷ salida). */
export const relacionTren = (z1: number, z2: number, z3: number, z4: number) => (z2 / z1) * (z4 / z3);

/** Salida de un reductor: velocidad (rpm), par (N·m) y potencia (W). */
export function salidaReductor(rpmIn: number, parIn: number, i: number, rendimiento: number) {
  const pIn = (parIn * 2 * Math.PI * rpmIn) / 60;
  return { rpm: rpmIn / i, par: parIn * i * rendimiento, pIn, pOut: pIn * rendimiento };
}

export const rpmConducidaPoleas = (n1: number, d1: number, d2: number) => (d2 > 0 ? (n1 * d1) / d2 : Infinity);

/** Longitud aproximada de la correa (mm), abierta o cruzada, con distancia entre ejes `c`. */
export function longitudCorrea(cruzada: boolean, d1: number, d2: number, c: number) {
  const dif = cruzada ? d1 + d2 : d2 - d1;
  return 2 * c + (Math.PI * (d1 + d2)) / 2 + dif ** 2 / (4 * c);
}

export type Mecanismo = "pinon" | "tornillo" | "biela" | "leva";

/** Desplazamiento lineal (mm) a la salida tras `vueltas` vueltas de la entrada; `p` es radio, paso o excentricidad según el mecanismo. */
export function desplazamiento(mec: Mecanismo, p: number, vueltas: number) {
  const th = 2 * Math.PI * vueltas;
  if (mec === "pinon") return 2 * Math.PI * p * vueltas;
  if (mec === "tornillo") return p * vueltas;
  if (mec === "biela") {
    const L = 4 * p;
    return p + L - (p * Math.cos(th) + Math.sqrt(L * L - (p * Math.sin(th)) ** 2));
  }
  return p * (1 - Math.cos(th));
}

/** Elevador de carga con reductor: devuelve la velocidad de subida y si el par del motor basta. */
export function elevador(rpm: number, i: number, rCm: number, masaKg: number, rendimiento: number, parMotor: number) {
  const r = rCm / 100;
  const rpmTambor = rpm / i;
  const v = (2 * Math.PI * r * rpmTambor) / 60;
  const parNecesario = (masaKg * 9.8 * r) / (i * rendimiento);
  return { rpmTambor, v, parNecesario, sube: parMotor >= parNecesario, potenciaUtil: masaKg * 9.8 * v };
}

/* ───────────── 1. Tensión en una sección ───────────── */

const MATERIALES = [
  { nombre: "Pino", lim: 40 },
  { nombre: "Aluminio", lim: 100 },
  { nombre: "Acero", lim: 235 },
] as const;

export function TensionExplorador({ block }: { block: ToolBlock }) {
  const init = { f: Math.round(num(block.params?.a, 4000, 100, 40000)), b: Math.round(num(block.params?.b, 20, 4, 60)), h: 10, m: 0 };
  const [s, setS] = useState(init);
  const A = s.b * s.h;
  const sig = tension(s.f, A);
  const lim = MATERIALES[s.m]!.lim;
  const cs = coefSeguridad(lim, sig);
  const estado = cs >= 2 ? "Seguro" : cs >= 1 ? "Justo: sin margen" : "Se rompe";
  const color = cs >= 2 ? MANIM.green : cs >= 1 ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Tira de una barra: aumenta la fuerza y reduce la sección hasta que la tensión supere la resistencia del material. Los valores son orientativos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATERIALES.map((m, value) => ({ value, label: m.nombre }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Fuerza de tracción" value={s.f} min={100} max={40000} step={100} unit=" N" color={MANIM.orange} onChange={(f) => setS((x) => ({ ...x, f }))} />
          <Slider label="Ancho de la sección" value={s.b} min={4} max={60} step={1} unit=" mm" color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Alto de la sección" value={s.h} min={4} max={60} step={1} unit=" mm" color={MANIM.purple} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="tension" maxH={160}>
        <rect x={90} y={75 - s.h * 0.8} width={340} height={s.h * 1.6} rx={3} fill={color} fillOpacity={0.3} stroke={color} strokeWidth={3} />
        <line x1={20} y1={75} x2={90} y2={75} stroke={MANIM.orange} strokeWidth={5} />
        <line x1={430} y1={75} x2={500} y2={75} stroke={MANIM.orange} strokeWidth={5} />
        <polygon points="10,75 28,66 28,84" fill={MANIM.orange} />
        <polygon points="510,75 492,66 492,84" fill={MANIM.orange} />
        <text x={260} y={140} fill={MANIM.ink} fontSize={14} textAnchor="middle">
          sección {s.b} × {s.h} mm = {A} mm²
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Tensión σ = F / A">{f1(sig)} MPa</Stat>
        <Stat color={MANIM.orange} label={`Resistencia del ${MATERIALES[s.m]!.nombre.toLowerCase()} (orient.)`}>{lim} MPa</Stat>
        <Stat color={color} label="Coeficiente de seguridad">{f1(cs)} · {estado}</Stat>
      </Readout>
      <Note>La tensión es la fuerza repartida por cada milímetro cuadrado (1 N/mm² = 1 MPa). Una sección mayor reparte la fuerza y baja la tensión; los proyectos reales exigen un coeficiente de seguridad claramente superior a 1.</Note>
    </Frame>
  );
}

/* ───────────── 2. Perfil de canto o plano ───────────── */

export function PerfilCantoExplorador({ block }: { block: ToolBlock }) {
  const init = { canto: Math.round(num(block.params?.n, 1, 0, 1)), b: Math.round(num(block.params?.a, 10, 5, 40)), h: Math.round(num(block.params?.b, 30, 5, 60)) };
  const [s, setS] = useState(init);
  const I = inercia(s.b, s.h, s.canto === 1);
  const Iplano = inercia(s.b, s.h, false);
  const rel = Iplano > 0 ? I / Iplano : 1;
  const flecha = rel > 0 ? 1 / rel : Infinity; // flecha relativa respecto de colocarlo plano
  const w = s.canto === 1 ? s.b : s.h;
  const h = s.canto === 1 ? s.h : s.b;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un listón rectangular flexa muy distinto según cómo se coloque. Gíralo y compara su rigidez."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Colocación" items={[{ value: 0, label: "Plano (tumbado)" }, { value: 1, label: "De canto (de pie)" }]} value={s.canto} onChange={(canto) => setS((x) => ({ ...x, canto }))} />
          <Slider label="Ancho b" value={s.b} min={5} max={40} step={1} unit=" mm" color={MANIM.blue} onChange={(b) => setS((x) => ({ ...x, b }))} />
          <Slider label="Alto h" value={s.h} min={5} max={60} step={1} unit=" mm" color={MANIM.purple} onChange={(hh) => setS((x) => ({ ...x, h: hh }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="perfil-canto" maxH={180}>
        <line x1={40} y1={150} x2={480} y2={150} stroke={MANIM.muted} strokeWidth={3} />
        <rect x={260 - w * 1.4} y={60 - h * 0.6 + 40} width={w * 2.8} height={h * 1.2} fill={MANIM.green} fillOpacity={0.35} stroke={MANIM.green} strokeWidth={3} />
        <Arrowy x={260} y1={10} y2={50 - h * 0.1} />
        <text x={260} y={165} fill={MANIM.ink} fontSize={13} textAnchor="middle">
          sección vista de frente ({s.canto === 1 ? `${s.b} × ${s.h}` : `${s.h} × ${s.b}`} mm)
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Inercia I = b·h³ / 12">{fmtEs(I, 0)} mm⁴</Stat>
        <Stat color={MANIM.blue} label="Rigidez respecto a ponerlo plano">× {f2(rel)}</Stat>
        <Stat color={MANIM.orange} label="Flecha relativa">{f2(flecha)}</Stat>
      </Readout>
      <Note>La rigidez crece con el cubo de la altura en la dirección de la carga: un listón de 10 × 30 mm de canto resiste 9 veces más que tumbado. Por eso las vigas se colocan «de pie» y los perfiles en doble T tienen el material lejos del centro.</Note>
    </Frame>
  );
}

function Arrowy({ x, y1, y2 }: { x: number; y1: number; y2: number }) {
  return (
    <g>
      <line x1={x} y1={y1} x2={x} y2={y2} stroke={MANIM.orange} strokeWidth={4} />
      <polygon points={`${x},${y2 + 8} ${x - 6},${y2 - 2} ${x + 6},${y2 - 2}`} fill={MANIM.orange} />
      <text x={x + 12} y={y1 + 12} fill={MANIM.orange} fontSize={13}>
        carga
      </text>
    </g>
  );
}

/* ───────────── 3. Máquinas simples: ventaja mecánica ───────────── */

export function VentajaMecanicaExplorador({ block }: { block: ToolBlock }) {
  const init = { maq: Math.round(num(block.params?.n, 0, 0, 2)) as 0 | 1 | 2, carga: Math.round(num(block.params?.a, 400, 50, 1000)), k: [60, 4, 4] as number[] };
  const [s, setS] = useState(init);
  const k = s.k[s.maq]!;
  const r = maquinaSimple(s.maq, s.carga, k);
  const NOMBRES = ["Palanca", "Polipasto", "Plano inclinado"];
  const rango = s.maq === 0 ? { min: 20, max: 100, step: 5, lab: "Brazo de la fuerza", u: " cm" } : s.maq === 1 ? { min: 1, max: 6, step: 1, lab: "Poleas móviles (tramos de cuerda)", u: "" } : { min: 1, max: 8, step: 1, lab: "Longitud de la rampa (sube 1 m)", u: " m" };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Reduce la fuerza con cada máquina y fíjate en lo que pagas a cambio: más recorrido. El trabajo (fuerza × distancia) no cambia."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Máquina" items={NOMBRES.map((label, value) => ({ value, label }))} value={s.maq} onChange={(m) => setS((x) => ({ ...x, maq: m as 0 | 1 | 2 }))} />
          <Slider label="Peso de la carga" value={s.carga} min={50} max={1000} step={10} unit=" N" color={MANIM.orange} onChange={(carga) => setS((x) => ({ ...x, carga }))} />
          <Slider label={rango.lab} value={k} min={rango.min} max={rango.max} step={rango.step} unit={rango.u} color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, k: x.k.map((o, i) => (i === x.maq ? v : o)) }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="ventaja" maxH={120}>
        <rect x={40} y={30} width={Math.max(10, r.fuerza / s.carga * 420)} height={22} fill={MANIM.blue} fillOpacity={0.6} rx={3} />
        <text x={40} y={22} fill={MANIM.blue} fontSize={13}>
          fuerza necesaria
        </text>
        <rect x={40} y={78} width={Math.max(10, Math.min(1, r.recorrido / 8) * 420)} height={22} fill={MANIM.yellow} fillOpacity={0.6} rx={3} />
        <text x={40} y={72} fill={MANIM.yellow} fontSize={13}>
          recorrido que hay que hacer
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Fuerza necesaria">{f1(r.fuerza)} N</Stat>
        <Stat color={MANIM.green} label="Ventaja mecánica (carga ÷ fuerza)">× {f2(s.carga / r.fuerza)}</Stat>
        <Stat color={MANIM.yellow} label="Recorrido (relativo a la elevación de la carga)">× {f2(r.recorrido)}</Stat>
      </Readout>
      <Note>Las máquinas simples no ahorran trabajo: lo que se gana en fuerza se paga en distancia. Fuerza × recorrido de la fuerza = carga × altura (sin rozamientos).</Note>
    </Frame>
  );
}

/* ───────────── 4. Tren de transmisión con par y potencia ───────────── */

export function TrenTransmisionExplorador({ block }: { block: ToolBlock }) {
  const init = { n: Math.round(num(block.params?.a, 1500, 300, 3000)), par: 2, z1: 10, z2: 40, z3: 12, z4: 36, eta: 90 };
  const [s, setS] = useState(init);
  const i = relacionTren(s.z1, s.z2, s.z3, s.z4);
  const o = salidaReductor(s.n, s.par, i, s.eta / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un reductor baja las rpm y sube el par. Cambia los dientes de cada etapa y comprueba que la potencia no aumenta, solo se pierde algo por rozamiento."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad del motor" value={s.n} min={300} max={3000} step={100} unit=" rpm" color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Par del motor" value={s.par} min={1} max={10} step={1} unit=" N·m" color={MANIM.orange} onChange={(par) => setS((x) => ({ ...x, par }))} />
          <Slider label="Etapa 1: dientes motor z₁" value={s.z1} min={8} max={30} step={1} color={MANIM.green} onChange={(z1) => setS((x) => ({ ...x, z1 }))} />
          <Slider label="Etapa 1: dientes conducida z₂" value={s.z2} min={10} max={60} step={1} color={MANIM.green} onChange={(z2) => setS((x) => ({ ...x, z2 }))} />
          <Slider label="Etapa 2: dientes motriz z₃" value={s.z3} min={8} max={30} step={1} color={MANIM.purple} onChange={(z3) => setS((x) => ({ ...x, z3 }))} />
          <Slider label="Etapa 2: dientes conducida z₄" value={s.z4} min={10} max={60} step={1} color={MANIM.purple} onChange={(z4) => setS((x) => ({ ...x, z4 }))} />
          <Slider label="Rendimiento del conjunto" value={s.eta} min={50} max={100} step={5} unit=" %" color={MANIM.yellow} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="tren-transmision" maxH={170}>
        {[
          { z: s.z1, x: 70, c: MANIM.green, y: 60 },
          { z: s.z2, x: 70 + (s.z1 + s.z2) * 2, c: MANIM.green, y: 60 },
          { z: s.z3, x: 70 + (s.z1 + s.z2) * 2, c: MANIM.purple, y: 100 },
          { z: s.z4, x: 70 + (s.z1 + s.z2) * 2 + (s.z3 + s.z4) * 2, c: MANIM.purple, y: 100 },
        ].map((g, k) => (
          <g key={k}>
            <circle cx={g.x} cy={g.y} r={g.z * 0.9} fill={g.c} fillOpacity={0.25} stroke={g.c} strokeWidth={3} strokeDasharray="5 3" />
            <text x={g.x} y={g.y + 5} fill={g.c} fontSize={13} textAnchor="middle" fontWeight={700}>
              z={g.z}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Relación i = n_entrada / n_salida">{f2(i)} : 1</Stat>
        <Stat color={MANIM.blue} label="Velocidad de salida">{fmtEs(o.rpm, 0)} rpm</Stat>
        <Stat color={MANIM.orange} label="Par de salida">{f1(o.par)} N·m</Stat>
        <Stat color={MANIM.green} label="Potencia entrada / salida">{fmtEs(o.pIn, 0)} W / {fmtEs(o.pOut, 0)} W</Stat>
      </Readout>
      <Note>{i >= 1 ? "Es un reductor: la salida gira más lenta pero con más par. La potencia no se multiplica; con el rozamiento, la de salida es algo menor." : "Es un multiplicador: la salida gira más rápida pero con menos par."}</Note>
    </Frame>
  );
}

/* ───────────── 5. Poleas y correas ───────────── */

export function PoleasCorreasCalcExplorador({ block }: { block: ToolBlock }) {
  const init = { d1: Math.round(num(block.params?.a, 40, 20, 150)), d2: Math.round(num(block.params?.b, 120, 20, 250)), n1: 1200, c: 300, cruz: 0 };
  const [s, setS] = useState(init);
  const n2 = rpmConducidaPoleas(s.n1, s.d1, s.d2);
  const L = longitudCorrea(s.cruz === 1, s.d1, s.d2, s.c);
  const sc = 0.55;
  const r1 = (s.d1 / 2) * sc;
  const r2 = (s.d2 / 2) * sc;
  const x1 = 90;
  const x2 = 90 + s.c * 0.9;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La polea pequeña gira más rápido. Prueba una correa cruzada para invertir el sentido y observa cómo cambia la longitud de la correa."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Correa" items={[{ value: 0, label: "Abierta" }, { value: 1, label: "Cruzada" }]} value={s.cruz} onChange={(cruz) => setS((x) => ({ ...x, cruz }))} />
          <Slider label="Diámetro motriz d₁" value={s.d1} min={20} max={150} step={5} unit=" mm" color={MANIM.green} onChange={(d1) => setS((x) => ({ ...x, d1 }))} />
          <Slider label="Diámetro conducida d₂" value={s.d2} min={20} max={250} step={5} unit=" mm" color={MANIM.orange} onChange={(d2) => setS((x) => ({ ...x, d2 }))} />
          <Slider label="Velocidad del motor" value={s.n1} min={300} max={3000} step={100} unit=" rpm" color={MANIM.blue} onChange={(n1) => setS((x) => ({ ...x, n1 }))} />
          <Slider label="Distancia entre ejes" value={s.c} min={150} max={400} step={10} unit=" mm" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
        </>
      }
    >
      <Svg w={520} h={180} testId="poleas-correas" maxH={190}>
        <circle cx={x1} cy={90} r={r1} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={4} />
        <circle cx={x2} cy={90} r={r2} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={4} />
        {s.cruz === 0 ? (
          <>
            <line x1={x1} y1={90 - r1} x2={x2} y2={90 - r2} stroke={MANIM.ink} strokeWidth={3} />
            <line x1={x1} y1={90 + r1} x2={x2} y2={90 + r2} stroke={MANIM.ink} strokeWidth={3} />
          </>
        ) : (
          <>
            <line x1={x1} y1={90 - r1} x2={x2} y2={90 + r2} stroke={MANIM.ink} strokeWidth={3} />
            <line x1={x1} y1={90 + r1} x2={x2} y2={90 - r2} stroke={MANIM.ink} strokeWidth={3} />
          </>
        )}
        <text x={x1} y={95} fill={MANIM.green} fontSize={14} textAnchor="middle" fontWeight={700}>
          ↻
        </text>
        <text x={x2} y={95} fill={MANIM.orange} fontSize={14} textAnchor="middle" fontWeight={700}>
          {s.cruz === 1 ? "↺" : "↻"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Relación i = d₂ / d₁">{f2(s.d2 / s.d1)} : 1</Stat>
        <Stat color={MANIM.blue} label="Velocidad de la conducida">{fmtEs(n2, 0)} rpm</Stat>
        <Stat color={MANIM.green} label="Sentido de giro">{s.cruz === 1 ? "Invertido" : "El mismo"}</Stat>
        <Stat color={MANIM.purple} label="Longitud de la correa (aprox.)">{fmtEs(L, 0)} mm</Stat>
      </Readout>
      <Note>n₁ · d₁ = n₂ · d₂: la polea de menor diámetro gira más deprisa. La correa abierta mantiene el sentido; la cruzada lo invierte.</Note>
    </Frame>
  );
}

/* ───────────── 6. Transformación del movimiento ───────────── */

const MECANISMOS: { id: Mecanismo; nombre: string; param: string; min: number; max: number; unidad: string; tipo: string }[] = [
  { id: "pinon", nombre: "Piñón-cremallera", param: "Radio del piñón", min: 5, max: 30, unidad: " mm", tipo: "Rectilíneo continuo" },
  { id: "tornillo", nombre: "Tornillo-tuerca", param: "Paso de la rosca", min: 1, max: 10, unidad: " mm", tipo: "Rectilíneo continuo" },
  { id: "biela", nombre: "Biela-manivela", param: "Radio de la manivela", min: 5, max: 30, unidad: " mm", tipo: "Rectilíneo alternativo" },
  { id: "leva", nombre: "Leva excéntrica", param: "Excentricidad", min: 2, max: 15, unidad: " mm", tipo: "Rectilíneo alternativo" },
];

export function TransformacionExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 3)), p: [12, 4, 12, 6] as number[], v: Math.round(num(block.params?.a, 4, 0, 20)) / 4 };
  const [s, setS] = useState(init);
  const mec = MECANISMOS[s.m]!;
  const p = Math.min(mec.max, Math.max(mec.min, s.p[s.m]!));
  const d = desplazamiento(mec.id, p, s.v);
  const carrera = mec.id === "biela" ? 2 * p : mec.id === "leva" ? 2 * p : null;
  const escala = Math.min(1, 380 / Math.max(100, d, 4 * p));
  const x = 80 + d * escala;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Gira la entrada (vueltas) y observa cuánto se desplaza la salida. Los mecanismos alternativos suben y bajan; los continuos avanzan siempre."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Mecanismo" items={MECANISMOS.map((m, value) => ({ value, label: m.nombre }))} value={s.m} onChange={(m) => setS((x2) => ({ ...x2, m }))} />
          <Slider label={mec.param} value={p} min={mec.min} max={mec.max} step={1} unit={mec.unidad} color={MANIM.blue} onChange={(v) => setS((x2) => ({ ...x2, p: x2.p.map((o, i) => (i === x2.m ? v : o)) }))} />
          <Slider label="Giro de la entrada (vueltas)" value={s.v} min={0} max={5} step={0.25} color={MANIM.orange} onChange={(v) => setS((x2) => ({ ...x2, v }))} format={(v) => fmtEs(v, 2)} />
        </>
      }
    >
      <Svg w={520} h={110} testId="transformacion" maxH={120}>
        <line x1={60} y1={80} x2={480} y2={80} stroke={MANIM.muted} strokeWidth={3} />
        <rect x={x - 22} y={44} width={44} height={36} rx={4} fill={MANIM.green} fillOpacity={0.45} stroke={MANIM.green} strokeWidth={3} className="anim-t" />
        <text x={x} y={68} fill={MANIM.ink} fontSize={13} textAnchor="middle">
          salida
        </text>
        <text x={80} y={30} fill={MANIM.orange} fontSize={14}>
          entrada: {fmtEs(s.v, 2)} {s.v === 1 ? "vuelta" : "vueltas"} ↻
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Desplazamiento de la salida">{f1(d)} mm</Stat>
        <Stat color={MANIM.blue} label="Tipo de movimiento de salida">{mec.tipo}</Stat>
        {carrera !== null ? <Stat color={MANIM.yellow} label="Carrera (recorrido total)">{f1(carrera)} mm</Stat> : null}
      </Readout>
      <Note>
        {mec.id === "pinon" && "Cada vuelta del piñón desplaza la cremallera una longitud 2·π·r (la de su circunferencia)."}
        {mec.id === "tornillo" && "Cada vuelta avanza la tuerca un paso de rosca: gran reducción de velocidad y mucha fuerza."}
        {mec.id === "biela" && "La manivela convierte el giro en un vaivén. La carrera es el doble del radio de la manivela (como en un motor de combustión)."}
        {mec.id === "leva" && "La leva empuja el seguidor y un muelle lo devuelve. La carrera es el doble de la excentricidad."}
      </Note>
    </Frame>
  );
}

/* ───────────── 7. Elevador con reductor ───────────── */

export function ElevadorExplorador({ block }: { block: ToolBlock }) {
  const init = { rpm: Math.round(num(block.params?.a, 1500, 500, 3000)), i: 20, r: 4, m: Math.round(num(block.params?.b, 40, 1, 200)), eta: 80, par: 2 };
  const [s, setS] = useState(init);
  const e = elevador(s.rpm, s.i, s.r, s.m, s.eta / 100, s.par);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un motor pequeño solo mueve una carga grande si el reductor multiplica el par. Busca el equilibrio entre fuerza y velocidad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad del motor" value={s.rpm} min={500} max={3000} step={100} unit=" rpm" color={MANIM.blue} onChange={(rpm) => setS((x) => ({ ...x, rpm }))} />
          <Slider label="Par del motor" value={s.par} min={0.5} max={5} step={0.5} unit=" N·m" color={MANIM.orange} onChange={(par) => setS((x) => ({ ...x, par }))} format={(v) => fmtEs(v, 1)} />
          <Slider label="Relación del reductor (1 : i)" value={s.i} min={1} max={60} step={1} color={MANIM.green} onChange={(i) => setS((x) => ({ ...x, i }))} />
          <Slider label="Radio del tambor" value={s.r} min={2} max={10} step={1} unit=" cm" color={MANIM.purple} onChange={(r) => setS((x) => ({ ...x, r }))} />
          <Slider label="Masa de la carga" value={s.m} min={1} max={200} step={1} unit=" kg" color={MANIM.yellow} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Rendimiento" value={s.eta} min={50} max={95} step={5} unit=" %" color={MANIM.red} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="elevador" maxH={160}>
        <circle cx={140} cy={50} r={22 + s.r * 2} fill={MANIM.purple} fillOpacity={0.25} stroke={MANIM.purple} strokeWidth={4} />
        <line x1={140 + 22 + s.r * 2} y1={50} x2={140 + 22 + s.r * 2} y2={125} stroke={MANIM.ink} strokeWidth={3} />
        <rect x={140 + 22 + s.r * 2 - 22} y={125} width={44} height={20} fill={e.sube ? MANIM.green : MANIM.red} fillOpacity={0.5} stroke={e.sube ? MANIM.green : MANIM.red} strokeWidth={3} />
        <text x={300} y={60} fill={e.sube ? MANIM.green : MANIM.red} fontSize={20} fontWeight={800}>
          {e.sube ? "La carga sube" : "El motor no puede"}
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Velocidad del tambor">{fmtEs(e.rpmTambor, 0)} rpm</Stat>
        <Stat color={MANIM.green} label="Velocidad de subida">{f2(e.v)} m/s</Stat>
        <Stat color={MANIM.orange} label="Par necesario en el motor">{f2(e.parNecesario)} N·m</Stat>
        <Stat color={MANIM.yellow} label="Potencia útil">{fmtEs(e.potenciaUtil, 0)} W</Stat>
      </Readout>
      <Note>Con un reductor mayor se necesita menos par del motor, pero la carga sube más despacio. Con un tambor más ancho sube más rápido, pero el motor debe esforzarse más.</Note>
    </Frame>
  );
}
