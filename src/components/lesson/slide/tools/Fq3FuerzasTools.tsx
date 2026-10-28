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

export const G = 9.8;
const rad = (g: number): number => (g * Math.PI) / 180;

/** Resultante de dos fuerzas que forman un ángulo θ (grados) entre sí: módulo y dirección respecto a F₁. */
export function resultante(f1v: number, f2v: number, theta: number): { modulo: number; angulo: number } {
  const x = f1v + f2v * Math.cos(rad(theta));
  const y = f2v * Math.sin(rad(theta));
  return { modulo: Math.hypot(x, y), angulo: (Math.atan2(y, x) * 180) / Math.PI };
}

/** Aceleraciones de dos cuerpos que se empujan con una fuerza F (acción y reacción). */
export function accionReaccion(F: number, m1: number, m2: number): { a1: number; a2: number } {
  return { a1: m1 > 0 ? F / m1 : NaN, a2: m2 > 0 ? F / m2 : NaN };
}

/** Fuerza de rozamiento máxima: μ · N (N = m·g en una superficie horizontal). */
export const rozamientoMax = (mu: number, m: number, g = G): number => Math.max(0, mu) * Math.max(0, m) * g;
/** Bloque en una superficie horizontal empujado con una fuerza F: rozamiento, fuerza neta y aceleración. */
export function bloqueHorizontal(F: number, m: number, mu: number, g = G) {
  const N = m * g;
  const max = rozamientoMax(mu, m, g);
  const parado = F <= max;
  const roz = parado ? F : max;
  const neta = F - roz;
  return { N, peso: m * g, rozamientoMax: max, rozamiento: roz, neta, a: m > 0 ? neta / m : NaN, parado };
}
/** Velocidad y distancia a los t segundos si parte del reposo con aceleración constante. */
export const cinematicaDesdeReposo = (a: number, t: number) => ({ v: a * t, x: 0.5 * a * t * t });

/** Presión (Pa) = fuerza (N) / superficie (m²). */
export const presion = (F: number, S: number): number => (S > 0 ? F / S : NaN);
/** Presión hidrostática (Pa) a una profundidad h en un fluido de densidad ρ. */
export const presionHidrostatica = (rho: number, h: number, g = G): number => rho * g * Math.max(0, h);
/** Empuje de Arquímedes (N) sobre un volumen sumergido V (m³) en un fluido de densidad ρ. */
export const empuje = (rhoFluido: number, volumenSumergido: number, g = G): number => rhoFluido * g * Math.max(0, volumenSumergido);

export const OBJETOS = [
  { nombre: "Corcho", rho: 240 },
  { nombre: "Madera de pino", rho: 500 },
  { nombre: "Hielo", rho: 920 },
  { nombre: "Aluminio", rho: 2700 },
  { nombre: "Hierro", rho: 7870 },
  { nombre: "Plomo", rho: 11340 },
] as const;
export const FLUIDOS = [
  { nombre: "Aceite", rho: 920 },
  { nombre: "Agua", rho: 1000 },
  { nombre: "Agua de mar", rho: 1030 },
  { nombre: "Mercurio", rho: 13600 },
] as const;
/** Fracción del volumen que queda sumergida (1 si se hunde). */
export function fraccionSumergida(rhoObjeto: number, rhoFluido: number): number {
  if (!(rhoFluido > 0) || !(rhoObjeto > 0)) return NaN;
  return rhoObjeto < rhoFluido ? rhoObjeto / rhoFluido : 1;
}
export const flota = (rhoObjeto: number, rhoFluido: number): boolean => rhoObjeto <= rhoFluido;

/* ───────────── 1. Composición de fuerzas ───────────── */

export function ComposicionFuerzasFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { a: num(block.params?.a, 60, 10, 100), b: num(block.params?.b, 40, 10, 100), t: Math.round(num(block.params?.c, 60, 0, 180)) };
  const [s, setS] = useState(init);
  const r = resultante(s.a, s.b, s.t);
  const k = 1.3;
  const ox = 130;
  const oy = 130;
  const p1: [number, number] = [ox + s.a * k, oy];
  const p2: [number, number] = [ox + s.b * k * Math.cos(rad(s.t)), oy - s.b * k * Math.sin(rad(s.t))];
  const pr: [number, number] = [p1[0] + p2[0] - ox, p1[1] + p2[1] - oy];
  return (
    <Frame
      stacked
      hint={block.hint ?? "La resultante es la diagonal del paralelogramo que forman las dos fuerzas."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza F₁" value={s.a} min={10} max={100} step={5} unit=" N" color={MANIM.blue} onChange={(a) => setS((o) => ({ ...o, a }))} />
          <Slider label="Fuerza F₂" value={s.b} min={10} max={100} step={5} unit=" N" color={MANIM.orange} onChange={(b) => setS((o) => ({ ...o, b }))} />
          <Slider label="Ángulo entre ellas" value={s.t} min={0} max={180} step={5} unit="°" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="composicion-fuerzas" maxH={190}>
        <Seg a={p1} b={pr} color={MANIM.muted} width={1.5} dashed />
        <Seg a={p2} b={pr} color={MANIM.muted} width={1.5} dashed />
        <Seg a={[ox, oy]} b={p1} color={MANIM.blue} width={4} />
        <Seg a={[ox, oy]} b={p2} color={MANIM.orange} width={4} />
        <Seg a={[ox, oy]} b={pr} color={MANIM.green} width={5} />
        <Dot p={[ox, oy]} r={5} color={MANIM.ink} />
        <text x={p1[0] + 6} y={p1[1] + 14} fill={MANIM.blue} fontSize={12} fontWeight={700}>F₁</text>
        <text x={p2[0] - 6} y={p2[1] - 6} fill={MANIM.orange} fontSize={12} fontWeight={700}>F₂</text>
        <text x={pr[0] + 6} y={pr[1] - 4} fill={MANIM.green} fontSize={12} fontWeight={700}>R</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Resultante R">{`${f1(r.modulo)} N`}</Stat>
        <Stat color={MANIM.purple} label="Dirección (respecto a F₁)">{`${f1(r.angulo)}°`}</Stat>
        <Stat color={MANIM.muted} label="Caso">{s.t === 0 ? "mismo sentido: se suman" : s.t === 180 ? "sentidos opuestos: se restan" : s.t === 90 ? "perpendiculares: Pitágoras" : "ángulo cualquiera"}</Stat>
      </Readout>
      <Note>Cuando varias fuerzas actúan sobre un cuerpo, su efecto es el de una sola, la <b>fuerza resultante</b>. Si tienen el <b>mismo sentido</b> se <b>suman</b>; si tienen <b>sentidos opuestos</b>, se <b>restan</b> (y gana la mayor); si son <b>perpendiculares</b>, R = √(F₁² + F₂²); en general, es la <b>diagonal del paralelogramo</b>. Si la resultante es <b>cero</b>, el cuerpo está en <b>equilibrio</b>: en reposo o con velocidad constante. Las fuerzas son <b>vectores</b>: tienen módulo, dirección y sentido.</Note>
    </Frame>
  );
}

/* ───────────── 2. Acción y reacción ───────────── */

export function AccionReaccionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { F: num(block.params?.a, 60, 10, 200), m1: Math.round(num(block.params?.b, 40, 10, 100)), m2: Math.round(num(block.params?.c, 80, 10, 100)), t: 2 };
  const [s, setS] = useState(init);
  const { a1, a2 } = accionReaccion(s.F, s.m1, s.m2);
  const r1 = 14 + s.m1 * 0.15;
  const r2 = 14 + s.m2 * 0.15;
  const L = 20 + s.F * 0.5;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las dos fuerzas son iguales y opuestas, pero actúan sobre cuerpos distintos: el de menos masa acelera más."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza del empujón" value={s.F} min={10} max={200} step={10} unit=" N" color={MANIM.orange} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Masa del cuerpo 1" value={s.m1} min={10} max={100} step={5} unit=" kg" color={MANIM.blue} onChange={(m1) => setS((o) => ({ ...o, m1 }))} />
          <Slider label="Masa del cuerpo 2" value={s.m2} min={10} max={100} step={5} unit=" kg" color={MANIM.green} onChange={(m2) => setS((o) => ({ ...o, m2 }))} />
          <Slider label="Tiempo tras el empujón" value={s.t} min={1} max={5} step={1} unit=" s" color={MANIM.purple} onChange={(t) => setS((o) => ({ ...o, t }))} />
        </>
      }
    >
      <Svg w={520} h={130} testId="accion-reaccion" maxH={150}>
        <Dot p={[220 - r1, 65]} r={r1} color={MANIM.blue} />
        <Dot p={[300 + r2, 65]} r={r2} color={MANIM.green} />
        <Seg a={[260, 65]} b={[260 - L, 65]} color={MANIM.blue} width={4} />
        <Seg a={[260, 65]} b={[260 + L, 65]} color={MANIM.green} width={4} />
        <text x={220 - r1} y={69} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>{`${s.m1} kg`}</text>
        <text x={300 + r2} y={69} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>{`${s.m2} kg`}</text>
        <text x={260} y={112} textAnchor="middle" fill={MANIM.muted} fontSize={12}>{`Fuerzas iguales y opuestas: ${s.F} N`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Aceleración del cuerpo 1">{`${f2(a1)} m/s² (← ${f1(a1 * s.t)} m/s a los ${s.t} s)`}</Stat>
        <Stat color={MANIM.green} label="Aceleración del cuerpo 2">{`${f2(a2)} m/s² (→ ${f1(a2 * s.t)} m/s a los ${s.t} s)`}</Stat>
        <Stat color={MANIM.purple} label="Cociente de aceleraciones a₁ / a₂">{`${f2(a1 / a2)} = m₂ / m₁`}</Stat>
      </Readout>
      <Note><b>Tercera ley de Newton (acción y reacción)</b>: si un cuerpo ejerce una fuerza sobre otro, este ejerce sobre el primero otra fuerza <b>igual y de sentido contrario</b>. Las dos fuerzas actúan sobre <b>cuerpos distintos</b>, por eso no se anulan. Como <b>a = F / m</b>, el cuerpo con <b>menos masa</b> adquiere <b>más aceleración</b>: al empujarse dos patinadores, el más ligero sale más rápido. Se desprecia el rozamiento.</Note>
    </Frame>
  );
}

/* ───────────── 3. Segunda ley y rozamiento ───────────── */

export function Newton2RozamientoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { F: Math.round(num(block.params?.a, 60, 0, 200)), m: Math.round(num(block.params?.b, 20, 5, 100)), mu: num(block.params?.c, 0.2, 0, 0.8), t: 3 };
  const [s, setS] = useState(init);
  const b = bloqueHorizontal(s.F, s.m, s.mu);
  const cin = cinematicaDesdeReposo(b.a, s.t);
  const esc = 110 / Math.max(s.F, b.rozamientoMax, b.peso, 1);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La aceleración depende de la fuerza neta: lo que empuja menos lo que rozamiento resta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Fuerza aplicada" value={s.F} min={0} max={200} step={10} unit=" N" color={MANIM.orange} onChange={(F) => setS((o) => ({ ...o, F }))} />
          <Slider label="Masa del bloque" value={s.m} min={5} max={100} step={5} unit=" kg" color={MANIM.blue} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Coeficiente de rozamiento μ" value={s.mu} min={0} max={0.8} step={0.05} color={MANIM.red} format={f2} onChange={(mu) => setS((o) => ({ ...o, mu }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="newton2-rozamiento" maxH={210}>
        <Seg a={[60, 150]} b={[470, 150]} color={MANIM.ink} width={3} />
        <rect x={230} y={110} width={60} height={40} fill={MANIM.blue} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2} />
        {s.F > 0 && <Seg a={[290, 130]} b={[290 + s.F * 0.6, 130]} color={MANIM.orange} width={5} />}
        {b.rozamiento > 0 && <Seg a={[230, 140]} b={[230 - b.rozamiento * 0.6, 140]} color={MANIM.red} width={5} />}
        <Seg a={[260, 110]} b={[260, 110 - b.peso * esc * 0.35]} color={MANIM.green} width={4} />
        <Seg a={[250, 150]} b={[250, 150 + b.peso * esc * 0.35]} color={MANIM.purple} width={4} />
        <text x={300 + s.F * 0.6} y={126} fill={MANIM.orange} fontSize={12}>F</text>
        <text x={225 - b.rozamiento * 0.6} y={146} textAnchor="end" fill={MANIM.red} fontSize={12}>Fr</text>
        <text x={268} y={70} fill={MANIM.green} fontSize={12}>N</text>
        <text x={256} y={185} fill={MANIM.purple} fontSize={12}>P</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.purple} label="Peso = Normal">{`${f1(b.peso)} N`}</Stat>
        <Stat color={MANIM.red} label={`Rozamiento (máx. ${f1(b.rozamientoMax)} N)`}>{`${f1(b.rozamiento)} N`}</Stat>
        <Stat color={MANIM.green} label="Fuerza neta">{`${f1(b.neta)} N`}</Stat>
        <Stat color={MANIM.blue} label="Aceleración">{b.parado ? "0 (no se mueve)" : `${f2(b.a)} m/s²`}</Stat>
        <Stat color={MANIM.orange} label={`A los ${s.t} s`}>{`v = ${f1(cin.v)} m/s · x = ${f1(cin.x)} m`}</Stat>
      </Readout>
      <Note><b>Segunda ley de Newton</b>: la fuerza neta sobre un cuerpo es igual a su masa por su aceleración, <b>ΣF = m · a</b> (1 N = 1 kg · m/s²). Sobre un bloque apoyado actúan el <b>peso</b> P = m·g (hacia abajo) y la <b>normal</b> N (la reacción de la superficie, hacia arriba, igual al peso si la superficie es horizontal). El <b>rozamiento</b> se opone al movimiento y vale como máximo <b>Fr = μ · N</b>: si la fuerza aplicada es menor, el bloque <b>no se mueve</b> y el rozamiento iguala a la fuerza. Se supone igual el rozamiento estático y el cinético.</Note>
    </Frame>
  );
}

/* ───────────── 4. Presión ───────────── */

const SITUACIONES_PRESION = [
  { nombre: "Persona de pie (tacones)", F: 700, S: 0.0008 },
  { nombre: "Persona de pie (zapatillas)", F: 700, S: 0.04 },
  { nombre: "Persona con raquetas de nieve", F: 700, S: 0.3 },
  { nombre: "Cuchillo afilado", F: 20, S: 0.000002 },
  { nombre: "Cuchillo romo", F: 20, S: 0.0002 },
] as const;

export function PresionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, SITUACIONES_PRESION.length - 1));
  const [i, setI] = useState(init);
  const [sS, setSS] = useState(1);
  const sit = SITUACIONES_PRESION[i]!;
  const S = sit.S * sS;
  const P = presion(sit.F, S);
  return (
    <Frame
      stacked
      hint={block.hint ?? "La misma fuerza produce más presión si se reparte en una superficie menor."}
      onReset={() => { setI(init); setSS(1); }}
      controls={
        <>
          <Choice label="Situación" items={SITUACIONES_PRESION.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => { setI(Number(k)); setSS(1); }} />
          <Slider label="Superficie de apoyo (× la de partida)" value={sS} min={0.25} max={4} step={0.25} color={MANIM.blue} format={f2} onChange={setSS} />
        </>
      }
    >
      <Svg w={520} h={130} testId="presion" maxH={150}>
        <Seg a={[60, 100]} b={[460, 100]} color={MANIM.ink} width={3} />
        <rect x={260 - Math.min(150, 20 + S * 600)} y={96} width={Math.min(300, 40 + S * 1200)} height={4} fill={MANIM.orange} />
        <Seg a={[260, 20]} b={[260, 90]} color={MANIM.red} width={5} />
        <text x={275} y={50} fill={MANIM.red} fontSize={13}>{`F = ${sit.F} N`}</text>
        <text x={260} y={122} textAnchor="middle" fill={MANIM.orange} fontSize={13}>{`S = ${fmtEs(S * 10000, 2)} cm²`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Fuerza (peso o empuje)">{`${sit.F} N`}</Stat>
        <Stat color={MANIM.orange} label="Superficie">{`${fmtEs(S * 10000, 2)} cm²`}</Stat>
        <Stat color={MANIM.green} label="Presión">{`${fmtEs(P, 0)} Pa (${fmtEs(P / 101300, 2)} atm)`}</Stat>
      </Readout>
      <Note>La <b>presión</b> es la fuerza que actúa <b>perpendicularmente</b> por unidad de superficie: <b>P = F / S</b>. En el SI se mide en <b>pascales</b> (1 Pa = 1 N/m²); también se usan la <b>atmósfera</b> (1 atm ≈ 101 300 Pa) y el <b>bar</b>. Para la misma fuerza, <b>cuanto menor sea la superficie, mayor es la presión</b>: por eso un cuchillo afilado corta y unas raquetas de nieve evitan hundirse. Los valores de fuerza y superficie son <b>aproximados</b>.</Note>
    </Frame>
  );
}

/* ───────────── 5. Flotación ───────────── */

export function FlotacionFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { o: Math.round(num(block.params?.a, 1, 0, OBJETOS.length - 1)), f: Math.round(num(block.params?.b, 1, 0, FLUIDOS.length - 1)) };
  const [s, setS] = useState(init);
  const obj = OBJETOS[s.o]!;
  const flu = FLUIDOS[s.f]!;
  const fr = fraccionSumergida(obj.rho, flu.rho);
  const V = 0.001; // 1 litro
  const E = empuje(flu.rho, V * fr);
  const P = obj.rho * V * G;
  const hunde = !flota(obj.rho, flu.rho);
  const lado = 70;
  const nivel = 60;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un cuerpo flota si su densidad es menor que la del fluido."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Objeto" items={OBJETOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.o)} onChange={(k) => setS((o) => ({ ...o, o: Number(k) }))} />
          <Choice label="Fluido" items={FLUIDOS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.f)} onChange={(k) => setS((o) => ({ ...o, f: Number(k) }))} />
        </>
      }
    >
      <Svg w={520} h={160} testId="flotacion" maxH={180}>
        <rect x={150} y={nivel} width={220} height={90} fill={MANIM.blue} fillOpacity={0.3} />
        <path d="M 150 20 L 150 150 L 370 150 L 370 20" fill="none" stroke={MANIM.ink} strokeWidth={3} />
        <rect x={260 - lado / 2} y={hunde ? 150 - lado : nivel - lado * (1 - fr)} width={lado} height={lado} fill={MANIM.orange} fillOpacity={0.85} stroke={MANIM.ink} strokeWidth={2} />
        <text x={260} y={(hunde ? 150 - lado : nivel - lado * (1 - fr)) + lado / 2 + 4} textAnchor="middle" fill={MANIM.ink} fontSize={12} fontWeight={700}>{obj.nombre.split(" ")[0]}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Densidad del objeto">{`${fmtEs(obj.rho, 0)} kg/m³`}</Stat>
        <Stat color={MANIM.blue} label="Densidad del fluido">{`${fmtEs(flu.rho, 0)} kg/m³`}</Stat>
        <Stat color={hunde ? MANIM.red : MANIM.green} label="Resultado">{hunde ? "se hunde" : fr >= 0.999 ? "flota entre dos aguas (justo en equilibrio)" : `flota con el ${fmtEs(fr * 100, 0)} % sumergido`}</Stat>
        <Stat color={MANIM.purple} label="Empuje / peso (1 litro)">{`${f2(E)} N / ${f2(P)} N`}</Stat>
      </Readout>
      <Note>Un cuerpo sumergido recibe un <b>empuje</b> hacia arriba igual al <b>peso del fluido que desaloja</b> (<b>principio de Arquímedes</b>): <b>E = ρ<sub>fluido</sub> · g · V<sub>sumergido</sub></b>. Compara el empuje con el <b>peso</b>: si E &lt; P, el cuerpo <b>se hunde</b>; si E = P, queda en equilibrio y <b>flota</b>. Como el peso es ρ<sub>objeto</sub>·g·V, un objeto flota si su <b>densidad</b> es <b>menor</b> que la del fluido, y la fracción sumergida es ρ<sub>objeto</sub> / ρ<sub>fluido</sub>. (Los barcos de acero flotan porque su forma encierra mucho aire y su densidad media es menor que la del agua.) Densidades aproximadas.</Note>
    </Frame>
  );
}
