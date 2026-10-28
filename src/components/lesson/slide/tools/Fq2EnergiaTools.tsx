"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg, type Pt } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

export const G = 9.8;
/** Energía cinética Ec = ½ · m · v² (J, con m en kg y v en m/s). */
export const cinetica = (m: number, v: number) => 0.5 * m * v * v;
/** Energía potencial gravitatoria Ep = m · g · h (J). */
export const potencial = (m: number, h: number, g = G) => m * g * h;
/** Caída desde la altura h0 hasta la altura h: energía potencial, cinética y calor disipado si se pierde una fracción f de la energía liberada. */
export function energiasCaida(m: number, h0: number, h: number, f = 0) {
  const ep0 = potencial(m, h0);
  const ep = potencial(m, h);
  const liberada = ep0 - ep;
  return { ep, ec: liberada * (1 - f), calor: liberada * f, total: ep0 };
}
/** Velocidad en un punto de la caída: v = √(2·Ec/m). */
export const velocidadDeEc = (ec: number, m: number) => (m > 0 ? Math.sqrt((2 * ec) / m) : NaN);

/** Temperatura de equilibrio al mezclar dos cantidades de agua (mismo calor específico). */
export const temperaturaEquilibrio = (m1: number, t1: number, m2: number, t2: number) => (m1 + m2 > 0 ? (m1 * t1 + m2 * t2) / (m1 + m2) : NaN);
export const aKelvin = (c: number) => c + 273;

export const CADENAS: Record<string, { nombre: string; pasos: { forma: string; color: string }[]; nota: string }> = {
  hidro: { nombre: "Central hidroeléctrica", pasos: [{ forma: "Potencial gravitatoria (agua embalsada)", color: "blue" }, { forma: "Cinética (agua que cae)", color: "orange" }, { forma: "Cinética de rotación (turbina)", color: "purple" }, { forma: "Eléctrica", color: "yellow" }], nota: "El agua cae por una tubería y mueve la turbina que acciona el generador." },
  termica: { nombre: "Central térmica de carbón", pasos: [{ forma: "Química (carbón)", color: "red" }, { forma: "Térmica (vapor)", color: "orange" }, { forma: "Cinética de rotación (turbina)", color: "purple" }, { forma: "Eléctrica", color: "yellow" }], nota: "Al quemar el combustible se calienta agua y el vapor mueve la turbina." },
  solar: { nombre: "Panel solar fotovoltaico", pasos: [{ forma: "Luminosa (radiación solar)", color: "yellow" }, { forma: "Eléctrica", color: "blue" }], nota: "La luz del Sol libera electrones en las células de silicio." },
  coche: { nombre: "Coche de gasolina", pasos: [{ forma: "Química (gasolina)", color: "red" }, { forma: "Térmica (combustión)", color: "orange" }, { forma: "Cinética (el coche se mueve)", color: "blue" }], nota: "Gran parte de la energía se pierde como calor en el motor." },
  bombilla: { nombre: "Bombilla LED", pasos: [{ forma: "Eléctrica", color: "yellow" }, { forma: "Luminosa", color: "green" }, { forma: "Térmica (calor residual)", color: "red" }], nota: "Casi toda se convierte en luz; algo se disipa como calor." },
  persona: { nombre: "Una persona que corre", pasos: [{ forma: "Química (alimentos)", color: "green" }, { forma: "Cinética (movimiento)", color: "blue" }, { forma: "Térmica (calor corporal)", color: "red" }], nota: "El cuerpo convierte la energía de los alimentos en movimiento y calor." },
};

export const FUENTES = {
  carbon: { nombre: "Carbón", renovable: false, co2: 820 },
  petroleo: { nombre: "Petróleo", renovable: false, co2: 650 },
  gas: { nombre: "Gas natural", renovable: false, co2: 490 },
  nuclear: { nombre: "Nuclear", renovable: false, co2: 12 },
  solar: { nombre: "Solar fotovoltaica", renovable: true, co2: 45 },
  eolica: { nombre: "Eólica", renovable: true, co2: 12 },
  hidraulica: { nombre: "Hidráulica", renovable: true, co2: 24 },
  biomasa: { nombre: "Biomasa", renovable: true, co2: 230 },
} as const;
export type FuenteId = keyof typeof FUENTES;
/** Emisiones (kg de CO₂) al generar una cantidad de energía eléctrica (kWh) con una fuente (g CO₂/kWh, ciclo de vida, orientativo). */
export const emisionesCO2 = (id: FuenteId, kWh: number) => (FUENTES[id].co2 * kWh) / 1000;
/** Rendimiento: energía útil / energía total · 100. */
export const rendimiento = (util: number, total: number) => (total > 0 ? (100 * util) / total : NaN);

const COL: Record<string, string> = { blue: MANIM.blue, orange: MANIM.orange, purple: MANIM.purple, yellow: MANIM.yellow, red: MANIM.red, green: MANIM.green };

/* ───────────── 1. Formas y transformaciones ───────────── */

export function TransformacionesEnergiaFq2Explorador({ block }: { block: ToolBlock }) {
  const ids = Object.keys(CADENAS);
  const init = { id: ids[Math.round(num(block.params?.n, 0, 0, ids.length - 1))]! };
  const [s, setS] = useState(init);
  const c = CADENAS[s.id]!;
  const n = c.pasos.length;
  const w = 460 / n;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La energía no se crea ni se destruye: se transforma de unas formas en otras."}
      onReset={() => setS(init)}
      controls={<Choice label="Sistema" items={ids.map((id) => ({ value: id, label: CADENAS[id]!.nombre }))} value={s.id} onChange={(id) => setS({ id })} />}
    >
      <Svg w={520} h={150} testId="transformaciones-energia" maxH={170}>
        {c.pasos.map((p, i) => (
          <g key={i}>
            <rect x={30 + i * w} y={40} width={w - 24} height={60} rx={8} fill={COL[p.color]} fillOpacity={0.22} stroke={COL[p.color]} strokeWidth={2.5} />
            <text x={30 + i * w + (w - 24) / 2} y={64} textAnchor="middle" fill={MANIM.ink} fontSize={11} fontWeight={700}>{p.forma.split(" (")[0]}</text>
            {p.forma.includes("(") ? <text x={30 + i * w + (w - 24) / 2} y={82} textAnchor="middle" fill={MANIM.muted} fontSize={10}>{`(${p.forma.split(" (")[1]}`}</text> : null}
            {i < n - 1 ? <path d={`M ${30 + i * w + w - 22} 70 L ${30 + (i + 1) * w - 2} 70`} stroke={MANIM.ink} strokeWidth={3} /> : null}
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Sistema">{c.nombre}</Stat>
        <Stat color={MANIM.green} label="Transformaciones">{`${n - 1}`}</Stat>
        <Stat color={MANIM.muted} label="Cómo ocurre">{c.nota}</Stat>
      </Readout>
      <Note>La <b>energía</b> es la capacidad de un cuerpo o sistema para producir <b>cambios</b> (mover, calentar, iluminar…). Se mide en <b>julios (J)</b>. Existe en varias <b>formas</b>: <b>cinética</b> (del movimiento), <b>potencial</b> gravitatoria (por la altura) o elástica, <b>térmica</b>, <b>química</b>, <b>eléctrica</b>, <b>luminosa</b>, <b>nuclear</b>… La energía <b>no se crea ni se destruye</b>: <b>se transforma</b> de unas formas en otras y se <b>transfiere</b> de unos cuerpos a otros, en forma de <b>trabajo</b> o de <b>calor</b>. En casi toda transformación parte se «pierde» como <b>calor</b> disipado.</Note>
    </Frame>
  );
}

/* ───────────── 2. Cinética y potencial ───────────── */

export function CineticaPotencialFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { m: num(block.params?.a, 2, 0.5, 10), h: num(block.params?.b, 5, 0, 20), v: Math.round(num(block.params?.c, 4, 0, 20)) };
  const [s, setS] = useState(init);
  const ec = cinetica(s.m, s.v);
  const ep = potencial(s.m, s.h);
  const max = Math.max(ec, ep, 1);
  const bar = (v: number): number => (v / max) * 130;
  return (
    <Frame
      stacked
      hint={block.hint ?? "La energía cinética depende de la masa y del cuadrado de la velocidad; la potencial, de la masa y de la altura."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa" value={s.m} min={0.5} max={10} step={0.5} unit=" kg" color={MANIM.muted} format={f1} onChange={(m) => setS((o) => ({ ...o, m }))} />
          <Slider label="Altura sobre el suelo" value={s.h} min={0} max={20} step={1} unit=" m" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Slider label="Velocidad" value={s.v} min={0} max={20} step={1} unit=" m/s" color={MANIM.orange} onChange={(v) => setS((o) => ({ ...o, v }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="cinetica-potencial" maxH={210}>
        <Seg a={[40, 165]} b={[480, 165]} color={MANIM.ink} width={2} />
        <rect x={110} y={165 - bar(ep)} width={90} height={bar(ep)} fill={MANIM.blue} fillOpacity={0.85} />
        <text x={155} y={182} textAnchor="middle" fill={MANIM.blue} fontSize={13} fontWeight={700}>Potencial</text>
        <text x={155} y={165 - bar(ep) - 6} textAnchor="middle" fill={MANIM.ink} fontSize={13}>{`${f1(ep)} J`}</text>
        <rect x={290} y={165 - bar(ec)} width={90} height={bar(ec)} fill={MANIM.orange} fillOpacity={0.85} />
        <text x={335} y={182} textAnchor="middle" fill={MANIM.orange} fontSize={13} fontWeight={700}>Cinética</text>
        <text x={335} y={165 - bar(ec) - 6} textAnchor="middle" fill={MANIM.ink} fontSize={13}>{`${f1(ec)} J`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Cinética Ec = ½·m·v²">{`${f1(ec)} J`}</Stat>
        <Stat color={MANIM.blue} label="Potencial Ep = m·g·h">{`${f1(ep)} J`}</Stat>
        <Stat color={MANIM.purple} label="Suma (energía mecánica)">{`${f1(ec + ep)} J`}</Stat>
      </Readout>
      <Note>La <b>energía cinética</b> es la que tiene un cuerpo por estar en <b>movimiento</b>: <b>Ec = ½ · m · v²</b>; si se duplica la velocidad, se <b>cuadruplica</b>. La <b>energía potencial gravitatoria</b> es la que tiene por estar a una <b>altura</b>: <b>Ep = m · g · h</b>, con g = 9,8 N/kg. Se miden en <b>julios (J)</b>. La suma de ambas es la <b>energía mecánica</b>. Un objeto en lo alto tiene energía potencial «almacenada» que se transforma en cinética al caer.</Note>
    </Frame>
  );
}

/* ───────────── 3. Conservación de la energía ───────────── */

export function ConservacionEnergiaFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { h: Math.round(num(block.params?.a, 6, 0, 10)), roz: num(block.params?.n, 0, 0, 1) >= 0.5 };
  const [s, setS] = useState(init);
  const m = 2;
  const h0 = 10;
  const e = energiasCaida(m, h0, s.h, s.roz ? 0.25 : 0);
  const v = velocidadDeEc(e.ec, m);
  const Y = (h: number): number => 150 - h * 11;
  const Xr = (h: number): number => 40 + (1 - h / 10) * 220;
  const bar = (j: number): number => (j / e.total) * 120;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sin rozamiento, la energía potencial que se pierde se convierte en cinética: la mecánica total se conserva."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Altura de la bola (cae desde 10 m)" value={s.h} min={0} max={10} step={1} unit=" m" color={MANIM.blue} onChange={(h) => setS((o) => ({ ...o, h }))} />
          <Choice label="Rozamiento" items={[{ value: "no", label: "Sin rozamiento" }, { value: "si", label: "Con rozamiento (25 % se pierde como calor)" }]} value={s.roz ? "si" : "no"} onChange={(v2) => setS((o) => ({ ...o, roz: v2 === "si" }))} />
        </>
      }
    >
      <Svg w={520} h={190} testId="conservacion-energia" maxH={210}>
        <path d={`M 40 ${Y(10)} L 260 ${Y(0)}`} stroke={MANIM.ink} strokeWidth={3} />
        <Seg a={[40, Y(0)]} b={[300, Y(0)]} color={MANIM.muted} width={1.5} />
        <Dot p={[Xr(s.h), Y(s.h) - 8] as Pt} color={MANIM.orange} r={9} />
        {[["Ep", e.ep, MANIM.blue], ["Ec", e.ec, MANIM.orange], ["Calor", e.calor, MANIM.red]].map(([t, j, c], i) => (
          <g key={String(t)}>
            <rect x={340 + i * 55} y={165 - bar(Number(j))} width={40} height={bar(Number(j))} fill={String(c)} fillOpacity={0.85} />
            <text x={360 + i * 55} y={182} textAnchor="middle" fill={String(c)} fontSize={12} fontWeight={700}>{String(t)}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Potencial">{`${f1(e.ep)} J`}</Stat>
        <Stat color={MANIM.orange} label="Cinética">{`${f1(e.ec)} J`}</Stat>
        <Stat color={MANIM.red} label="Calor disipado">{`${f1(e.calor)} J`}</Stat>
        <Stat color={MANIM.green} label="Suma">{`${f1(e.ep + e.ec + e.calor)} J`}</Stat>
        <Stat color={MANIM.purple} label="Velocidad">{`${f1(v)} m/s`}</Stat>
      </Readout>
      <Note>El <b>principio de conservación de la energía</b> dice que la energía <b>no se crea ni se destruye</b>, solo se <b>transforma</b>. En una caída <b>sin rozamiento</b>, la <b>energía mecánica</b> (Ep + Ec) <b>se conserva</b>: lo que pierde la potencial lo gana la cinética. Con <b>rozamiento</b>, parte de la energía se convierte en <b>calor</b> (energía térmica) que se disipa en el ambiente: la mecánica disminuye, pero <b>la suma total sigue siendo la misma</b>. Por eso las máquinas reales nunca aprovechan toda la energía.</Note>
    </Frame>
  );
}

/* ───────────── 4. Calor y temperatura ───────────── */

export function CalorTemperaturaFq2Explorador({ block }: { block: ToolBlock }) {
  const init = { m1: Math.round(num(block.params?.a, 200, 50, 500)), t1: Math.round(num(block.params?.b, 80, 0, 100)), m2: Math.round(num(block.params?.c, 300, 50, 500)), t2: 20 };
  const [s, setS] = useState(init);
  const tf = temperaturaEquilibrio(s.m1, s.t1, s.m2, s.t2);
  const col = (t: number): string => (t > 60 ? MANIM.red : t > 35 ? MANIM.orange : MANIM.blue);
  return (
    <Frame
      stacked
      hint={block.hint ?? "El calor pasa del cuerpo caliente al frío hasta que las temperaturas se igualan; la temperatura final está entre las dos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Masa de agua caliente" value={s.m1} min={50} max={500} step={50} unit=" g" color={MANIM.red} onChange={(m1) => setS((o) => ({ ...o, m1 }))} />
          <Slider label="Temperatura del agua caliente" value={s.t1} min={0} max={100} step={5} unit=" °C" color={MANIM.orange} onChange={(t1) => setS((o) => ({ ...o, t1 }))} />
          <Slider label="Masa de agua fría" value={s.m2} min={50} max={500} step={50} unit=" g" color={MANIM.blue} onChange={(m2) => setS((o) => ({ ...o, m2 }))} />
          <Slider label="Temperatura del agua fría" value={s.t2} min={0} max={100} step={5} unit=" °C" color={MANIM.purple} onChange={(t2) => setS((o) => ({ ...o, t2 }))} />
        </>
      }
    >
      <Svg w={520} h={170} testId="calor-temperatura" maxH={190}>
        {[[70, s.t1, s.m1, "caliente"], [230, s.t2, s.m2, "fría"], [390, tf, s.m1 + s.m2, "mezcla"]].map(([x, t, m, nom]) => (
          <g key={String(nom)}>
            <rect x={Number(x)} y={150 - 20 - (Number(m) / 1000) * 120} width={70} height={(Number(m) / 1000) * 120 + 20} fill={col(Number(t))} fillOpacity={0.6} stroke={MANIM.ink} strokeWidth={2.5} />
            <text x={Number(x) + 35} y={166} textAnchor="middle" fill={MANIM.muted} fontSize={12}>{String(nom)}</text>
            <text x={Number(x) + 35} y={150 - 28 - (Number(m) / 1000) * 120} textAnchor="middle" fill={MANIM.ink} fontSize={13} fontWeight={700}>{`${f1(Number(t))} °C`}</text>
          </g>
        ))}
        <text x={150} y={90} fill={MANIM.ink} fontSize={22} fontWeight={700}>+</text>
        <text x={310} y={90} fill={MANIM.ink} fontSize={22} fontWeight={700}>=</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Temperatura final de equilibrio">{`${f1(tf)} °C`}</Stat>
        <Stat color={MANIM.muted} label="En kelvin">{`${f1(aKelvin(tf))} K`}</Stat>
        <Stat color={MANIM.yellow} label="El calor fluye">{s.t1 === s.t2 ? "no fluye (ya están a la misma temperatura)" : s.t1 > s.t2 ? "del agua caliente al agua fría" : "del agua fría al agua caliente"}</Stat>
      </Readout>
      <Note>La <b>temperatura</b> mide la <b>agitación media</b> de las partículas (se mide en °C o K con un termómetro). El <b>calor</b> es la <b>energía que se transfiere</b> de un cuerpo a otro por tener distinta temperatura: va siempre del <b>caliente al frío</b> hasta alcanzar el <b>equilibrio térmico</b>. No es lo mismo: dos vasos de agua a 80 °C tienen la misma temperatura, pero el más grande tiene <b>más energía térmica</b> y puede ceder más calor. Al mezclar agua de distintas temperaturas, la final es una <b>media ponderada por las masas</b>. El calor se transmite por <b>conducción</b>, <b>convección</b> y <b>radiación</b>.</Note>
    </Frame>
  );
}

/* ───────────── 5. Fuentes de energía ───────────── */

export function FuentesEnergiaFq2Explorador({ block }: { block: ToolBlock }) {
  const ids = Object.keys(FUENTES) as FuenteId[];
  const init = { id: ids[Math.round(num(block.params?.n, 0, 0, ids.length - 1))]!, kwh: Math.round(num(block.params?.a, 200, 50, 500)) };
  const [s, setS] = useState<{ id: FuenteId; kwh: number }>(init);
  const f = FUENTES[s.id];
  const max = Math.max(...ids.map((i) => FUENTES[i].co2));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Las fuentes renovables se regeneran de forma natural y suelen emitir mucho menos CO₂; las no renovables se agotan."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Fuente de energía" items={ids.map((id) => ({ value: id, label: FUENTES[id].nombre }))} value={s.id} onChange={(id) => setS((o) => ({ ...o, id }))} />
          <Slider label="Electricidad consumida al mes" value={s.kwh} min={50} max={500} step={10} unit=" kWh" color={MANIM.orange} onChange={(kwh) => setS((o) => ({ ...o, kwh }))} />
        </>
      }
    >
      <Svg w={520} h={230} testId="fuentes-energia" maxH={250}>
        {ids.map((id, i) => (
          <g key={id}>
            <text x={20} y={28 + i * 24} fill={id === s.id ? MANIM.yellow : MANIM.muted} fontSize={12} fontWeight={id === s.id ? 700 : 500}>{FUENTES[id].nombre}</text>
            <rect x={160} y={16 + i * 24} width={Math.max(3, (FUENTES[id].co2 / max) * 300)} height={14} rx={3} fill={FUENTES[id].renovable ? MANIM.green : MANIM.red} fillOpacity={id === s.id ? 0.95 : 0.45} />
            <text x={168 + (FUENTES[id].co2 / max) * 300} y={28 + i * 24} fill={MANIM.muted} fontSize={11}>{`${FUENTES[id].co2}`}</text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={f.renovable ? MANIM.green : MANIM.red} label="Tipo">{f.renovable ? "renovable" : "no renovable"}</Stat>
        <Stat color={MANIM.orange} label="Emisiones orientativas">{`${f.co2} g CO₂ / kWh`}</Stat>
        <Stat color={MANIM.purple} label={`Al generar ${s.kwh} kWh`}>{`${f1(emisionesCO2(s.id, s.kwh))} kg de CO₂`}</Stat>
      </Readout>
      <Note>Las <b>fuentes renovables</b> (solar, eólica, hidráulica, biomasa, geotérmica) se <b>regeneran</b> de forma natural y no se agotan a escala humana. Las <b>no renovables</b> (carbón, petróleo, gas natural, uranio) tienen reservas <b>limitadas</b>. Quemar combustibles fósiles emite <b>CO₂</b>, que refuerza el <b>efecto invernadero</b> y el cambio climático. Las cifras son <b>emisiones medias aproximadas de todo el ciclo de vida</b> (g de CO₂ por kWh de electricidad); varían según la tecnología y el país. Ahorrar energía y mejorar la <b>eficiencia</b> (rendimiento = energía útil / energía total) es la forma más barata de reducir el impacto.</Note>
    </Frame>
  );
}
