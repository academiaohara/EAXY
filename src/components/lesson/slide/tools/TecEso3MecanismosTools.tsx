"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Longitud aproximada de una cadena (en eslabones, par redondeado hacia arriba) entre dos piñones. */
export function longitudCadena(z1: number, z2: number, cMm: number, pMm = 12.7) {
  const l = (2 * cMm) / pMm + (z1 + z2) / 2 + ((z2 - z1) / (2 * Math.PI)) ** 2 / (cMm / pMm);
  const ent = Math.ceil(l);
  return ent % 2 === 0 ? ent : ent + 1;
}

/** Tornillo sin fin con corona: velocidad y par de salida. */
export function sinFin(nIn: number, z: number, entradas: number, par: number, eta: number) {
  const i = z / entradas;
  return { i, nOut: nIn / i, parOut: par * i * eta };
}

export type TipoLeva = "excéntrica" | "corazón" | "caída brusca";
export const TIPOS_LEVA: TipoLeva[] = ["excéntrica", "corazón", "caída brusca"];
/** Desplazamiento (mm) del seguidor para un ángulo de giro de la leva (0–360°) y una carrera `h`. */
export function desplazamientoLeva(tipo: TipoLeva, grados: number, h: number) {
  const g = ((grados % 360) + 360) % 360;
  if (tipo === "excéntrica") return ((1 - Math.cos((g * Math.PI) / 180)) / 2) * h;
  if (tipo === "corazón") return (g <= 180 ? g / 180 : (360 - g) / 180) * h;
  return (g <= 300 ? g / 300 : (360 - g) / 60) * h;
}

export const MARCHAS = [3.6, 2.0, 1.4, 1.0, 0.8] as const;
/** Caja de cambios: velocidad (km/h) y par en la rueda a partir de las rpm del motor y la marcha elegida. */
export function cajaCambios(rpm: number, marcha: number, diferencial: number, radioRuedaM: number, parMotor: number, eta = 0.9) {
  const iTotal = MARCHAS[marcha]! * diferencial;
  const rpmRueda = rpm / iTotal;
  return { iTotal, rpmRueda, kmh: ((rpmRueda * 2 * Math.PI * radioRuedaM * 60) / 1000), parRueda: parMotor * iTotal * eta };
}

export const rendimientoTotal = (etas: readonly number[]) => etas.reduce((a, b) => a * b, 1);
/** Potencia mecánica (W) a partir del par (N·m) y la velocidad (rpm). */
export const potenciaMecanica = (par: number, rpm: number) => (par * 2 * Math.PI * rpm) / 60;

/** Potencia eléctrica o del motor (W) que hace falta para subir `masa` kg a `v` m/s con rendimiento `eta`. */
export const potenciaElevacion = (masa: number, v: number, eta: number) => (eta > 0 ? (masa * 9.8 * v) / eta : Infinity);
export const fuerzaCable = (masa: number, tramos: number) => (masa * 9.8) / Math.max(1, tramos);

/** Aceleración centrífuga en el borde de un tambor, en múltiplos de g. */
export const aceleracionG = (rpm: number, radioM: number) => ((2 * Math.PI * rpm) / 60) ** 2 * radioM / 9.8;

/* ───────────── 1. Piñón y cadena ───────────── */

export function CadenaPinonExplorador({ block }: { block: ToolBlock }) {
  const init = { z1: Math.round(num(block.params?.a, 11, 8, 30)), z2: Math.round(num(block.params?.b, 33, 12, 60)), c: 400, n: 120 };
  const [s, setS] = useState(init);
  const i = s.z2 / s.z1;
  const eslabones = longitudCadena(s.z1, s.z2, s.c);
  const r1 = 6 + s.z1 * 0.9;
  const r2 = 6 + s.z2 * 0.9;
  const x1 = 90;
  const x2 = 90 + s.c * 0.6;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un piñón pequeño mueve uno grande: el grande gira más despacio y con más par. La cadena evita deslizamientos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Dientes del piñón motriz z₁" value={s.z1} min={8} max={30} step={1} color={MANIM.green} onChange={(z1) => setS((x) => ({ ...x, z1 }))} />
          <Slider label="Dientes del piñón conducido z₂" value={s.z2} min={12} max={60} step={1} color={MANIM.orange} onChange={(z2) => setS((x) => ({ ...x, z2 }))} />
          <Slider label="Distancia entre ejes" value={s.c} min={200} max={600} step={10} unit=" mm" color={MANIM.purple} onChange={(c) => setS((x) => ({ ...x, c }))} />
          <Slider label="Velocidad del motriz" value={s.n} min={20} max={300} step={10} unit=" rpm" color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="cadena" maxH={160}>
        <circle cx={x1} cy={75} r={r1} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} strokeDasharray="4 3" />
        <circle cx={x2} cy={75} r={r2} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={3} strokeDasharray="4 3" />
        <line x1={x1} y1={75 - r1} x2={x2} y2={75 - r2} stroke={MANIM.ink} strokeWidth={3} />
        <line x1={x1} y1={75 + r1} x2={x2} y2={75 + r2} stroke={MANIM.ink} strokeWidth={3} />
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Relación i = z₂ / z₁">{f2(i)} : 1</Stat>
        <Stat color={MANIM.blue} label="Velocidad del conducido">{fmtEs(s.n / i, 0)} rpm</Stat>
        <Stat color={MANIM.purple} label="Longitud de cadena (paso 1/2″)">{eslabones} eslabones</Stat>
        <Stat color={MANIM.green} label="Sentido de giro">El mismo en los dos piñones</Stat>
      </Readout>
      <Note>Con una cadena los dos piñones giran en el mismo sentido (con engranajes directos, en sentidos contrarios) y se pueden separar bastante. La relación depende solo de los dientes: i = z₂ / z₁. Se usa en bicicletas, motos y cintas transportadoras. El número de eslabones se redondea a un número par.</Note>
    </Frame>
  );
}

/* ───────────── 2. Tornillo sin fin y corona ───────────── */

export function SinFinCoronaEso3Explorador({ block }: { block: ToolBlock }) {
  const init = { z: Math.round(num(block.params?.a, 30, 10, 80)), n: 1500, par: 0.5, ent: Math.round(num(block.params?.n, 1, 1, 3)), eta: 40 };
  const [s, setS] = useState(init);
  const r = sinFin(s.n, s.z, s.ent, s.par, s.eta / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El tornillo sin fin da una reducción enorme en poco espacio. Observa cuánto baja la velocidad y cuánto sube el par."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Dientes de la corona" value={s.z} min={10} max={80} step={1} color={MANIM.orange} onChange={(z) => setS((x) => ({ ...x, z }))} />
          <Choice label="Entradas del tornillo" items={[{ value: 1, label: "1 entrada" }, { value: 2, label: "2 entradas" }, { value: 3, label: "3 entradas" }]} value={s.ent} onChange={(ent) => setS((x) => ({ ...x, ent }))} />
          <Slider label="Velocidad del motor" value={s.n} min={300} max={3000} step={100} unit=" rpm" color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Par del motor" value={s.par} min={0.1} max={2} step={0.1} unit=" N·m" color={MANIM.green} format={(v) => fmtEs(v, 1)} onChange={(par) => setS((x) => ({ ...x, par }))} />
          <Slider label="Rendimiento" value={s.eta} min={20} max={90} step={5} unit=" %" color={MANIM.red} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Relación de reducción i = z / entradas">{f1(r.i)} : 1</Stat>
        <Stat color={MANIM.blue} label="Velocidad de salida">{f1(r.nOut)} rpm</Stat>
        <Stat color={MANIM.green} label="Par de salida">{f1(r.parOut)} N·m</Stat>
        <Stat color={MANIM.red} label="Potencia perdida en calor">{fmtEs(potenciaMecanica(s.par, s.n) * (1 - s.eta / 100), 0)} W</Stat>
      </Readout>
      <Note>Por cada vuelta del tornillo, la corona avanza tantos dientes como entradas tiene el tornillo. Con 1 entrada y 30 dientes, 30 vueltas del tornillo dan una de la corona. Gira a 90° y suele ser irreversible (la corona no puede mover al tornillo), útil en ascensores y grúas, pero su rendimiento es bajo por el rozamiento.</Note>
    </Frame>
  );
}

/* ───────────── 3. Levas ───────────── */

export function LevaSeguidorEso3Explorador({ block }: { block: ToolBlock }) {
  const init = { t: Math.round(num(block.params?.n, 0, 0, 2)), g: Math.round(num(block.params?.a, 90, 0, 360)), h: 20 };
  const [s, setS] = useState(init);
  const tipo = TIPOS_LEVA[s.t]!;
  const d = desplazamientoLeva(tipo, s.g, s.h);
  const pts: string[] = [];
  for (let g = 0; g <= 360; g += 5) pts.push(`${40 + (g / 360) * 440},${150 - (desplazamientoLeva(tipo, g, s.h) / s.h) * 100}`);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El perfil de la leva decide el movimiento del seguidor. Compara cómo sube y baja con cada tipo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de leva" items={TIPOS_LEVA.map((n, value) => ({ value, label: n }))} value={s.t} onChange={(t) => setS((x) => ({ ...x, t }))} />
          <Slider label="Ángulo de giro de la leva" value={s.g} min={0} max={360} step={5} unit="°" color={MANIM.orange} onChange={(g) => setS((x) => ({ ...x, g }))} />
          <Slider label="Carrera del seguidor" value={s.h} min={5} max={40} step={1} unit=" mm" color={MANIM.blue} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Svg w={520} h={180} testId="leva" maxH={190}>
        <line x1={40} y1={150} x2={490} y2={150} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={40} y1={40} x2={40} y2={150} stroke={MANIM.muted} strokeWidth={2} />
        <polyline points={pts.join(" ")} fill="none" stroke={MANIM.blue} strokeWidth={3} />
        <circle cx={40 + (s.g / 360) * 440} cy={150 - (d / s.h) * 100} r={7} fill={MANIM.yellow} />
        <text x={490} y={170} fill={MANIM.muted} fontSize={11} textAnchor="end">
          giro de la leva (0° a 360°)
        </text>
        <text x={46} y={36} fill={MANIM.muted} fontSize={11}>
          altura del seguidor
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Altura del seguidor">{f1(d)} mm</Stat>
        <Stat color={MANIM.green} label="Carrera total">{s.h} mm</Stat>
      </Readout>
      <Note>{tipo === "excéntrica" ? "La leva excéntrica da un movimiento suave de subida y bajada (como una sinusoide): es la más sencilla de fabricar." : tipo === "corazón" ? "La leva de corazón sube y baja a velocidad constante: el seguidor se mueve de forma uniforme y simétrica." : "La leva de caída brusca sube despacio y cae de golpe: típico de los mecanismos de «trinquete» o de juguetes con golpes. Un muelle mantiene el seguidor pegado a la leva."}</Note>
    </Frame>
  );
}

/* ───────────── 4. Caja de cambios ───────────── */

export function CajaCambiosExplorador({ block }: { block: ToolBlock }) {
  const init = { rpm: Math.round(num(block.params?.a, 3000, 1000, 6000) / 100) * 100, m: Math.round(num(block.params?.n, 2, 0, 4)), par: 150, dif: 3.9 };
  const [s, setS] = useState(init);
  const r = cajaCambios(s.rpm, s.m, s.dif, 0.31, s.par);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada marcha tiene una relación distinta: las primeras dan mucho par y poca velocidad; las últimas, al contrario."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Marcha" items={[{ value: 0, label: "1.ª" }, { value: 1, label: "2.ª" }, { value: 2, label: "3.ª" }, { value: 3, label: "4.ª" }, { value: 4, label: "5.ª" }]} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Revoluciones del motor" value={s.rpm} min={1000} max={6000} step={100} unit=" rpm" color={MANIM.blue} onChange={(rpm) => setS((x) => ({ ...x, rpm }))} />
          <Slider label="Par del motor" value={s.par} min={50} max={300} step={10} unit=" N·m" color={MANIM.orange} onChange={(par) => setS((x) => ({ ...x, par }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Relación total (marcha × diferencial)">{f2(r.iTotal)} : 1</Stat>
        <Stat color={MANIM.blue} label="Velocidad de la rueda">{fmtEs(r.rpmRueda, 0)} rpm</Stat>
        <Stat color={MANIM.green} label="Velocidad del coche (rueda de 31 cm de radio)">{fmtEs(r.kmh, 0)} km/h</Stat>
        <Stat color={MANIM.orange} label="Par en las ruedas (rend. 90 %)">{fmtEs(r.parRueda, 0)} N·m</Stat>
      </Readout>
      <Note>El motor funciona bien en un rango de revoluciones, pero el coche necesita velocidades muy distintas. La caja de cambios ofrece varias relaciones: una marcha larga (relación baja) permite ir deprisa con el motor a pocas vueltas, y una corta da mucho par para arrancar o subir una cuesta. Ejemplo con valores típicos orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 5. Rendimiento y potencia ───────────── */

export function RendimientoCadenaExplorador({ block }: { block: ToolBlock }) {
  const init = { par: 2, rpm: 3000, e1: 90, e2: Math.round(num(block.params?.a, 80, 20, 98)), e3: 95 };
  const [s, setS] = useState(init);
  const p = potenciaMecanica(s.par, s.rpm);
  const et = rendimientoTotal([s.e1 / 100, s.e2 / 100, s.e3 / 100]);
  const salida = p * et;
  return (
    <Frame
      stacked
      hint={block.hint ?? "El rendimiento total es el producto de los rendimientos de cada elemento de la cadena: cada etapa pierde un poco."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Par en el eje del motor" value={s.par} min={0.5} max={10} step={0.5} unit=" N·m" color={MANIM.green} format={(v) => fmtEs(v, 1)} onChange={(par) => setS((x) => ({ ...x, par }))} />
          <Slider label="Velocidad del motor" value={s.rpm} min={500} max={6000} step={100} unit=" rpm" color={MANIM.blue} onChange={(rpm) => setS((x) => ({ ...x, rpm }))} />
          <Slider label="Reductor (etapa 1)" value={s.e2} min={20} max={98} step={1} unit=" %" color={MANIM.orange} onChange={(e2) => setS((x) => ({ ...x, e2 }))} />
          <Slider label="Correa (etapa 2)" value={s.e1} min={50} max={99} step={1} unit=" %" color={MANIM.purple} onChange={(e1) => setS((x) => ({ ...x, e1 }))} />
          <Slider label="Cadena (etapa 3)" value={s.e3} min={50} max={99} step={1} unit=" %" color={MANIM.yellow} onChange={(e3) => setS((x) => ({ ...x, e3 }))} />
        </>
      }
    >
      <Svg w={520} h={60} testId="rend" maxH={70}>
        <rect x={20} y={12} width={480} height={26} rx={6} fill={MANIM.red} fillOpacity={0.25} stroke={MANIM.muted} strokeWidth={2} />
        <rect x={20} y={12} width={480 * et} height={26} rx={6} fill={MANIM.green} fillOpacity={0.6} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Potencia de entrada P = M · ω">{fmtEs(p, 0)} W</Stat>
        <Stat color={MANIM.green} label="Rendimiento total (producto)">{fmtEs(et * 100, 1)} %</Stat>
        <Stat color={MANIM.green} label="Potencia útil de salida">{fmtEs(salida, 0)} W</Stat>
        <Stat color={MANIM.red} label="Potencia perdida (calor y rozamiento)">{fmtEs(p - salida, 0)} W</Stat>
      </Readout>
      <Note>Potencia mecánica = par × velocidad angular (ω = 2π · rpm / 60). Ninguna máquina real convierte toda la energía en trabajo útil: parte se pierde como calor por rozamiento. En una cadena de transmisión, los rendimientos se multiplican, así que conviene usar pocas etapas y bien lubricadas.</Note>
    </Frame>
  );
}

/* ───────────── 6. Grúa con polipasto ───────────── */

export function GruaPolipastoExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.a, 200, 10, 1000)), n: Math.round(num(block.params?.n, 2, 1, 6)), v: 0.2, eta: 70, h: 10 };
  const [s, setS] = useState(init);
  const P = potenciaElevacion(s.m, s.v, s.eta / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Con más tramos de cable, el cable soporta menos fuerza, pero el motor debe recoger más cable. La potencia depende de la carga y de la velocidad."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa de la carga" value={s.m} min={10} max={1000} step={10} unit=" kg" color={MANIM.orange} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Tramos de cable en el polipasto" value={s.n} min={1} max={6} step={1} color={MANIM.blue} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Velocidad de subida de la carga" value={s.v} min={0.05} max={0.5} step={0.05} unit=" m/s" color={MANIM.green} format={(v) => fmtEs(v, 2)} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Rendimiento" value={s.eta} min={30} max={95} step={5} unit=" %" color={MANIM.red} onChange={(eta) => setS((x) => ({ ...x, eta }))} />
          <Slider label="Altura a elevar" value={s.h} min={2} max={30} step={1} unit=" m" color={MANIM.purple} onChange={(h) => setS((x) => ({ ...x, h }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Peso de la carga">{fmtEs(s.m * 9.8, 0)} N</Stat>
        <Stat color={MANIM.blue} label="Fuerza en el cable">{fmtEs(fuerzaCable(s.m, s.n), 0)} N</Stat>
        <Stat color={MANIM.green} label="Cable que se recoge">{fmtEs(s.h * s.n, 0)} m</Stat>
        <Stat color={MANIM.orange} label="Potencia del motor necesaria">{fmtEs(P, 0)} W</Stat>
        <Stat color={MANIM.purple} label="Tiempo de elevación">{fmtEs(s.h / s.v, 0)} s</Stat>
      </Readout>
      <Note>Potencia = m · g · v / rendimiento. Más tramos de cable reducen la fuerza en cada uno (F = peso / n) y permiten usar cables y motores más pequeños, pero hay que recoger n veces más cable y hay más rozamiento. Para subir lo mismo en menos tiempo hace falta más potencia.</Note>
    </Frame>
  );
}

/* ───────────── 7. Lavadora: fuerza centrífuga ───────────── */

export function LavadoraCentrifugadoExplorador({ block }: { block: ToolBlock }) {
  const init = { motor: Math.round(num(block.params?.a, 12000, 3000, 20000) / 500) * 500, d1: 30, d2: 140, r: 25 };
  const [s, setS] = useState(init);
  const rpmTambor = (s.motor * s.d1) / s.d2;
  const g = aceleracionG(rpmTambor, s.r / 100);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La polea del motor es pequeña y la del tambor grande: el tambor gira más despacio. Calcula la fuerza de centrifugado en múltiplos de g."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Velocidad del motor" value={s.motor} min={3000} max={20000} step={500} unit=" rpm" color={MANIM.blue} onChange={(motor) => setS((x) => ({ ...x, motor }))} />
          <Slider label="Diámetro de la polea del motor" value={s.d1} min={20} max={80} step={5} unit=" mm" color={MANIM.green} onChange={(d1) => setS((x) => ({ ...x, d1 }))} />
          <Slider label="Diámetro de la polea del tambor" value={s.d2} min={80} max={300} step={10} unit=" mm" color={MANIM.orange} onChange={(d2) => setS((x) => ({ ...x, d2 }))} />
          <Slider label="Radio del tambor" value={s.r} min={15} max={35} step={1} unit=" cm" color={MANIM.purple} onChange={(r) => setS((x) => ({ ...x, r }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Relación de poleas">{f1(s.d2 / s.d1)} : 1</Stat>
        <Stat color={MANIM.blue} label="Velocidad del tambor">{fmtEs(rpmTambor, 0)} rpm</Stat>
        <Stat color={MANIM.green} label="Aceleración centrífuga en el borde">{fmtEs(g, 0)} g</Stat>
      </Readout>
      <Note>a = ω² · r, con ω = 2π · rpm / 60. Con 1 200 rpm y 25 cm de radio, la ropa soporta unas 400 g. Una polea pequeña en el motor y una grande en el tambor reducen la velocidad: el motor gira rápido (donde es eficiente) y el tambor, a la velocidad adecuada. Valores orientativos.</Note>
    </Frame>
  );
}
