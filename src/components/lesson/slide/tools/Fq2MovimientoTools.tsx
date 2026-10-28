"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Recorrido de ida a metros y vuelta b metros sobre una recta: distancia recorrida, desplazamiento y posición final respecto del origen. */
export function idaVuelta(a: number, b: number, origen = 0) {
  return { distancia: Math.abs(a) + Math.abs(b), desplazamiento: a - b, final: a - b - origen, inicio: -origen, giro: a - origen };
}
/** Velocidad media (distancia / tiempo). */
export const velocidadMedia = (d: number, t: number) => (t > 0 ? d / t : NaN);
export const kmhAms = (v: number) => v / 3.6;
export const msAkmh = (v: number) => v * 3.6;
export const REFERENCIAS_VELOCIDAD = [
  { nombre: "una persona andando", kmh: 5 },
  { nombre: "una bicicleta", kmh: 20 },
  { nombre: "un coche en ciudad", kmh: 50 },
  { nombre: "un coche en autopista", kmh: 120 },
  { nombre: "un tren de alta velocidad", kmh: 300 },
  { nombre: "un avión de pasajeros", kmh: 900 },
] as const;
export const referenciaMasCercana = (kmh: number) => REFERENCIAS_VELOCIDAD.reduce((a, b) => (Math.abs(Math.log((b.kmh + 1e-9) / (kmh + 1e-9))) < Math.abs(Math.log((a.kmh + 1e-9) / (kmh + 1e-9))) ? b : a));

/** Movimiento rectilíneo uniforme: posición x = x₀ + v·t. */
export const posicionMRU = (x0: number, v: number, t: number) => x0 + v * t;
/** Pendiente de la gráfica posición–tiempo entre t1 y t2: (x2 − x1)/(t2 − t1) = velocidad. */
export const pendiente = (x1: number, t1: number, x2: number, t2: number) => (t2 !== t1 ? (x2 - x1) / (t2 - t1) : NaN);
/** Encuentro de dos móviles con MRU: tiempo y posición en que coinciden (null si van paralelos o el encuentro fue en el pasado). */
export function encuentro(x1: number, v1: number, x2: number, v2: number) {
  const dv = v1 - v2;
  if (Math.abs(dv) < 1e-12) return null;
  const t = (x2 - x1) / dv;
  if (t < 0) return null;
  return { t, x: x1 + v1 * t };
}
export const interpretaGrafica = (v: number) => (Math.abs(v) < 1e-9 ? "reposo (recta horizontal)" : v > 0 ? "se aleja del origen con velocidad constante" : "se acerca al origen con velocidad constante");

/* ───────────── 1. Sistema de referencia, desplazamiento y distancia ───────────── */

export function ReferenciaDesplazamientoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 60, 0, 100)), b: Math.round(num(block.params?.b, 20, 0, 100)), o: Math.round(num(block.params?.c, 0, -20, 40)) };
  const [s, setS] = useState(init);
  const r = idaVuelta(s.a, s.b, s.o);
  const X0 = 40;
  const ux = 3.6;
  const X = (m: number): number => X0 + (m + 50) * ux;
  const yL = 110;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La distancia recorrida suma todo el camino; el desplazamiento solo compara la posición final con la inicial. La posición depende del origen elegido."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Ida" value={s.a} min={0} max={100} step={5} unit=" m" color={MANIM.orange} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Vuelta" value={s.b} min={0} max={100} step={5} unit=" m" color={MANIM.blue} onChange={(b) => setS((o) => ({ ...o, b }))} />
          <Slider label="Posición del origen del sistema de referencia" value={s.o} min={-20} max={40} step={5} unit=" m" color={MANIM.purple} onChange={(o) => setS((q) => ({ ...q, o }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="referencia-desplazamiento" maxH={210}>
        <Seg a={[X(-50), yL]} b={[X(100), yL]} color={MANIM.ink} width={2.5} />
        {[-50, -25, 0, 25, 50, 75, 100].map((m) => (
          <g key={m}>
            <Seg a={[X(m), yL - 6]} b={[X(m), yL + 6]} color={MANIM.ink} width={1.5} />
            <text x={X(m)} y={yL + 24} textAnchor="middle" fill={MANIM.muted} fontSize={11}>{`${m - s.o}`}</text>
          </g>
        ))}
        <Seg a={[X(0), yL - 26]} b={[X(0), yL + 6]} color={MANIM.purple} width={3} />
        <text x={X(0)} y={yL - 32} textAnchor="middle" fill={MANIM.purple} fontSize={12} fontWeight={700}>salida</text>
        <path d={`M ${X(0)} ${yL - 44} L ${X(s.a)} ${yL - 44}`} stroke={MANIM.orange} strokeWidth={3} />
        <path d={`M ${X(s.a)} ${yL - 58} L ${X(s.a - s.b)} ${yL - 58}`} stroke={MANIM.blue} strokeWidth={3} />
        <Dot p={[X(0), yL] as Pt} color={MANIM.green} r={6} />
        <Dot p={[X(s.a - s.b), yL] as Pt} color={MANIM.red} r={7} />
        <Seg a={[X(0), yL + 46]} b={[X(s.a - s.b), yL + 46]} color={MANIM.yellow} width={3.5} />
        <text x={(X(0) + X(s.a - s.b)) / 2} y={yL + 64} textAnchor="middle" fill={MANIM.yellow} fontSize={12} fontWeight={700}>desplazamiento</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Distancia recorrida">{`${r.distancia} m`}</Stat>
        <Stat color={MANIM.yellow} label="Desplazamiento">{`${r.desplazamiento} m`}</Stat>
        <Stat color={MANIM.red} label="Posición final (en tu sistema)">{`${r.final} m`}</Stat>
        <Stat color={MANIM.purple} label="Posición inicial">{`${r.inicio} m`}</Stat>
      </Readout>
      <Note>Para describir un movimiento hay que elegir un <b>sistema de referencia</b>: un origen y un sentido positivo. La <b>posición</b> es dónde está el cuerpo respecto de ese origen (puede ser negativa) y la <b>trayectoria</b> es la línea que describe. La <b>distancia recorrida</b> es la longitud de todo el camino (siempre positiva); el <b>desplazamiento</b> es la diferencia entre la posición <b>final</b> y la <b>inicial</b>, con signo. Si vuelves al punto de partida, la distancia es grande pero el desplazamiento es <b>cero</b>. Cambiar el origen cambia las posiciones, pero <b>no</b> la distancia ni el desplazamiento.</Note>
    </Frame>
  );
}

/* ───────────── 2. Velocidad media ───────────── */

export function VelocidadMediaFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { d: Math.round(num(block.params?.a, 120, 1, 300)), t: num(block.params?.b, 1.5, 0.1, 5) };
  const [s, setS] = useState(init);
  const v = velocidadMedia(s.d, s.t);
  const ref = referenciaMasCercana(v);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La velocidad media es la distancia recorrida dividida por el tiempo empleado: 1 m/s equivale a 3,6 km/h."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia recorrida" value={s.d} min={1} max={300} step={1} unit=" km" color={MANIM.orange} onChange={(d) => setS((o) => ({ ...o, d }))} />
          <Slider label="Tiempo empleado" value={s.t} min={0.1} max={5} step={0.1} unit=" h" color={MANIM.blue} format={f1} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="velocidad-media" maxH={170}>
        <text x={260} y={50} textAnchor="middle" fill={MANIM.ink} fontSize={20}>{`v = d / t = ${s.d} km / ${f1(s.t)} h`}</text>
        <text x={260} y={100} textAnchor="middle" fill={MANIM.green} fontSize={34} fontWeight={700}>{`${f1(v)} km/h`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Velocidad media">{`${f1(v)} km/h`}</Stat>
        <Stat color={MANIM.purple} label="En unidades del SI">{`${f2(kmhAms(v))} m/s`}</Stat>
        <Stat color={MANIM.yellow} label="Es parecida a la de">{ref.nombre}</Stat>
      </Readout>
      <Note>La <b>velocidad media</b> es <b>v = d / t</b>: el espacio recorrido dividido entre el tiempo empleado. En el <b>SI</b> se mide en <b>m/s</b>; en la vida diaria, en <b>km/h</b>. Para pasar de <b>m/s a km/h</b> se multiplica por <b>3,6</b>; de <b>km/h a m/s</b>, se divide entre 3,6. La velocidad media no dice cómo fue el viaje: un coche puede haber ido más deprisa o más despacio en distintos momentos. La <b>velocidad</b> (vectorial) tiene además dirección y sentido; la <b>rapidez</b> es solo su valor.</Note>
    </Frame>
  );
}

/* ───────────── 3. MRU ───────────── */

export function MruFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { x0: Math.round(num(block.params?.a, 0, -50, 50)), v: Math.round(num(block.params?.b, 10, -20, 30)), t: Math.round(num(block.params?.c, 4, 0, 10)) };
  const [s, setS] = useState(init);
  const x = posicionMRU(s.x0, s.v, s.t);
  const minX = -50;
  const maxX = 350;
  const px = (m: number): number => 30 + ((Math.min(maxX, Math.max(minX, m)) - minX) / (maxX - minX)) * 460;
  return (
    <Frame
      stacked
      hint={block.hint ?? "En un MRU la velocidad es constante: se recorren distancias iguales en tiempos iguales y la posición es x = x₀ + v·t."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición inicial x₀" value={s.x0} min={-50} max={50} step={5} unit=" m" color={MANIM.purple} onChange={(x0) => setS((o) => ({ ...o, x0 }))} />
          <Slider label="Velocidad v" value={s.v} min={-20} max={30} step={1} unit=" m/s" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Tiempo t" value={s.t} min={0} max={10} step={1} unit=" s" color={MANIM.blue} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="mru" maxH={170}>
        <Seg a={[px(minX), 100]} b={[px(maxX), 100]} color={MANIM.ink} width={2.5} />
        {[-50, 0, 50, 100, 150, 200, 250, 300, 350].map((m) => (
          <g key={m}>
            <Seg a={[px(m), 94]} b={[px(m), 106]} color={MANIM.ink} width={1.5} />
            <text x={px(m)} y={126} textAnchor="middle" fill={MANIM.muted} fontSize={10}>{m}</text>
          </g>
        ))}
        {Array.from({ length: s.t + 1 }, (_, k) => (
          <Dot key={k} p={[px(posicionMRU(s.x0, s.v, k)), 80] as Pt} color={k === s.t ? MANIM.red : MANIM.muted} r={k === s.t ? 8 : 4} />
        ))}
        <rect x={px(x) - 16} y={56} width={32} height={16} rx={4} fill={MANIM.orange} />
        <text x={px(x)} y={48} textAnchor="middle" fill={MANIM.yellow} fontSize={12} fontWeight={700}>{`t = ${s.t} s`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Posición x = x₀ + v·t">{`${x} m`}</Stat>
        <Stat color={MANIM.green} label="Distancia recorrida en este tiempo">{`${Math.abs(s.v * s.t)} m`}</Stat>
        <Stat color={MANIM.purple} label="Velocidad en km/h">{`${f1(msAkmh(s.v))} km/h`}</Stat>
      </Readout>
      <Note>Un <b>movimiento rectilíneo uniforme (MRU)</b> es el de un cuerpo que va en <b>línea recta</b> con <b>velocidad constante</b>: en tiempos iguales recorre <b>espacios iguales</b> (los puntos grises están equiespaciados). Su ecuación es <b>x = x₀ + v · t</b>, con x₀ la posición inicial y v la velocidad. Si v es <b>positiva</b>, el cuerpo avanza en el sentido positivo; si es <b>negativa</b>, retrocede. Si v = 0, está en <b>reposo</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Gráfica posición-tiempo ───────────── */

export function GraficaPosicionTiempoFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { x0: Math.round(num(block.params?.a, 10, -20, 40)), v: Math.round(num(block.params?.b, 5, -10, 15)), t1: 2, t2: 6 };
  const [s, setS] = useState(init);
  const X0 = 60;
  const Y0 = 130;
  const ux = 40;
  const uy = 1.3;
  const P = (t: number, x: number): Pt => [X0 + t * ux, Y0 - x * uy];
  const x1 = posicionMRU(s.x0, s.v, s.t1);
  const x2 = posicionMRU(s.x0, s.v, s.t2);
  const m = pendiente(x1, s.t1, x2, s.t2);
  return (
    <Frame
      stacked
      hint={block.hint ?? "En una gráfica posición-tiempo, la pendiente de la recta es la velocidad; la ordenada en el origen es la posición inicial."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Posición inicial x₀" value={s.x0} min={-20} max={40} step={5} unit=" m" color={MANIM.purple} onChange={(x0) => setS((o) => ({ ...o, x0 }))} />
          <Slider label="Velocidad v" value={s.v} min={-10} max={15} step={1} unit=" m/s" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
          <Slider label="Instante t₁" value={s.t1} min={0} max={5} step={1} unit=" s" color={MANIM.blue} onChange={(t1) => setS((o) => ({ ...o, t1 }))} />
          <Slider label="Instante t₂" value={s.t2} min={1} max={8} step={1} unit=" s" color={MANIM.green} onChange={(t2) => setS((o) => ({ ...o, t2 }))} />
        </>
      }
    >
      <Svg w={520} h={240} testId="grafica-posicion-tiempo" maxH={260}>
        <Seg a={P(0, -20)} b={P(8.5, -20)} color={MANIM.grid} width={1} />
        <Seg a={P(0, 0)} b={P(8.5, 0)} color={MANIM.ink} width={2} />
        <Seg a={P(0, -20)} b={P(0, 100)} color={MANIM.ink} width={2} />
        <text x={470} y={Y0 + 18} fill={MANIM.muted} fontSize={12} textAnchor="end">tiempo (s)</text>
        <text x={14} y={16} fill={MANIM.muted} fontSize={12}>posición (m)</text>
        <Seg a={P(0, s.x0)} b={P(8, posicionMRU(s.x0, s.v, 8))} color={MANIM.orange} width={3.5} />
        <Seg a={P(s.t1, x1)} b={P(s.t2, x1)} color={MANIM.yellow} width={1.5} dashed />
        <Seg a={P(s.t2, x1)} b={P(s.t2, x2)} color={MANIM.yellow} width={1.5} dashed />
        <Dot p={P(s.t1, x1)} color={MANIM.blue} r={6} />
        <Dot p={P(s.t2, x2)} color={MANIM.green} r={6} />
        <Dot p={P(0, s.x0)} color={MANIM.purple} r={5} />
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Posición en t₁">{`${x1} m`}</Stat>
        <Stat color={MANIM.green} label="Posición en t₂">{`${x2} m`}</Stat>
        <Stat color={MANIM.yellow} label="Pendiente Δx / Δt">{`${f1(m)} m/s`}</Stat>
        <Stat color={MANIM.purple} label="Interpretación">{interpretaGrafica(s.v)}</Stat>
      </Readout>
      <Note>La gráfica <b>posición–tiempo</b> (x–t) de un MRU es una <b>recta</b>. Su <b>pendiente</b>, el cociente <b>Δx / Δt</b> entre dos puntos cualesquiera, es la <b>velocidad</b>: cuanto más inclinada, más rápido. Una recta <b>creciente</b> indica que el cuerpo se aleja del origen; <b>decreciente</b>, que se acerca; <b>horizontal</b>, que está <b>parado</b>. El punto donde la recta corta el eje vertical es la <b>posición inicial</b> x₀. Tomar dos instantes cualesquiera da siempre la misma pendiente: la velocidad es constante.</Note>
    </Frame>
  );
}

/* ───────────── 5. Encuentro de dos móviles ───────────── */

export function EncuentroMovilesFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { x2: Math.round(num(block.params?.a, 200, 0, 400)), v1: Math.round(num(block.params?.b, 20, 0, 40)), v2: Math.round(num(block.params?.c, -10, -30, 30)) };
  const [s, setS] = useState(init);
  const e = encuentro(0, s.v1, s.x2, s.v2);
  const X0 = 50;
  const Y0 = 190;
  const ux = 22;
  const uy = 0.4;
  const P = (t: number, x: number): Pt => [X0 + t * ux, Y0 - x * uy];
  const clip = (x: number) => Math.max(-20, Math.min(400, x));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Dos móviles se encuentran cuando tienen la misma posición en el mismo instante: x₁ = x₂."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Distancia inicial entre ellos (el 1 sale de 0)" value={s.x2} min={0} max={400} step={10} unit=" m" color={MANIM.purple} onChange={(x2) => setS((o) => ({ ...o, x2 }))} />
          <Slider label="Velocidad del móvil 1" value={s.v1} min={0} max={40} step={1} unit=" m/s" color={MANIM.orange} onChange={(v1) => setS((o) => ({ ...o, v1 }))} />
          <Slider label="Velocidad del móvil 2" value={s.v2} min={-30} max={30} step={1} unit=" m/s" color={MANIM.blue} onChange={(v2) => setS((o) => ({ ...o, v2 }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="encuentro-moviles" maxH={250}>
        <Seg a={P(0, 0)} b={P(20, 0)} color={MANIM.ink} width={2} />
        <Seg a={P(0, -20)} b={P(0, 400)} color={MANIM.ink} width={2} />
        <text x={500} y={Y0 + 18} fill={MANIM.muted} fontSize={12} textAnchor="end">tiempo (s)</text>
        <text x={14} y={14} fill={MANIM.muted} fontSize={12}>posición (m)</text>
        <Seg a={P(0, 0)} b={P(20, clip(s.v1 * 20))} color={MANIM.orange} width={3} />
        <Seg a={P(0, s.x2)} b={P(20, clip(s.x2 + s.v2 * 20))} color={MANIM.blue} width={3} />
        {e && e.t <= 20 && e.x >= -20 && e.x <= 400 ? <Dot p={P(e.t, e.x)} color={MANIM.yellow} r={8} /> : null}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Tiempo de encuentro">{e ? `${f1(e.t)} s` : "no se encuentran"}</Stat>
        <Stat color={MANIM.green} label="Posición del encuentro">{e ? `${f1(e.x)} m` : "—"}</Stat>
        <Stat color={MANIM.muted} label="Tipo">{s.v2 < 0 ? "van al encuentro" : s.v1 > s.v2 ? "alcance (el 1 persigue al 2)" : "el 1 no alcanza al 2"}</Stat>
      </Readout>
      <Note>Para resolver un problema de <b>encuentro</b> se escribe la ecuación de cada móvil, <b>x₁ = x₀₁ + v₁·t</b> y <b>x₂ = x₀₂ + v₂·t</b>, y se <b>igualan</b>: x₁ = x₂. De ahí sale el <b>tiempo</b>, <b>t = (x₀₂ − x₀₁) / (v₁ − v₂)</b>, y sustituyéndolo, la <b>posición</b>. En la gráfica x–t, el encuentro es el <b>punto donde se cruzan</b> las dos rectas. Si los móviles van en sentidos opuestos, se <b>encuentran</b>; si van en el mismo sentido, el de detrás debe ser <b>más rápido</b> para <b>alcanzar</b> al otro. Si las velocidades son iguales, nunca se encuentran.</Note>
    </Frame>
  );
}
