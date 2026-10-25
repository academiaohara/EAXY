"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, clamp, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);

/** Barra de puntuación 0–10 con etiqueta. */
function Barra({ label, valor, color, extra }: { label: string; valor: number; color: string; extra?: string }) {
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-40 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full" style={{ width: `${clamp(valor, 0, 10) * 10}%`, background: color }} />
      </div>
      <span className="w-20 text-right tabular-nums">{extra ?? `${f0(valor)} / 10`}</span>
    </div>
  );
}

/* ───────────── 3.1 Pruebas con muestras de materiales ───────────── */

export const MUESTRAS = [
  { n: "Madera de pino", r: ["Absorbe el golpe, pero se astilla o se marca.", "Arde a unos 300 °C y casi no conduce el calor.", "Absorbe humedad: se hincha y acaba pudriéndose si no se protege.", "No conduce la corriente: es aislante.", "El imán no la atrae."] },
  { n: "Acero", r: ["Resiste el golpe y se deforma poco: es duro y tenaz.", "Conduce bien el calor y funde a unos 1 500 °C.", "Se oxida (herrumbre) si no se pinta o protege.", "Conduce la corriente.", "El imán lo atrae: es ferromagnético."] },
  { n: "Aluminio", r: ["Se abolla con facilidad: es blando.", "Conduce muy bien el calor y funde a 660 °C.", "Se cubre de una capa fina de óxido que lo protege.", "Conduce la corriente.", "El imán no lo atrae."] },
  { n: "Cobre", r: ["Se deforma sin romperse: es maleable y dúctil.", "Excelente conductor del calor; funde a 1 085 °C.", "Se cubre de cardenillo verde, pero apenas se corroe por dentro.", "Excelente conductor: por eso se usa en los cables.", "El imán no lo atrae."] },
  { n: "Vidrio", r: ["Se rompe en trozos: es frágil.", "Resiste bastante, pero se rompe con cambios bruscos de temperatura.", "El agua no le afecta.", "No conduce la corriente: es aislante.", "El imán no lo atrae."] },
  { n: "Cerámica (ladrillo)", r: ["Duro pero frágil: se rompe o se desmigaja.", "Resiste temperaturas muy altas.", "Es porosa: absorbe algo de agua.", "No conduce la corriente.", "El imán no la atrae."] },
  { n: "PVC (plástico)", r: ["Resiste golpes moderados; en frío puede agrietarse.", "Se reblandece a unos 80 °C y no conviene quemarlo.", "Es impermeable.", "No conduce la corriente: aísla los cables.", "El imán no lo atrae."] },
  { n: "Goma", r: ["Absorbe el golpe y recupera su forma: es elástica.", "Se degrada con calor intenso.", "Es impermeable.", "No conduce la corriente.", "El imán no la atrae."] },
  { n: "Tela de algodón", r: ["Sin efecto: es flexible y blanda.", "Arde con facilidad.", "Absorbe agua y se empapa.", "No conduce la corriente (si está seca).", "El imán no la atrae."] },
  { n: "Granito", r: ["Muy duro: resiste, aunque un golpe fuerte lo puede fracturar.", "Resiste muy bien el calor.", "Casi no absorbe agua.", "No conduce la corriente.", "El imán no lo atrae."] },
] as const;
export const PRUEBAS = ["Golpe", "Calor", "Agua", "Electricidad", "Imán"] as const;
const COLOR_PRUEBA = [MANIM.red, MANIM.orange, MANIM.blue, MANIM.yellow, MANIM.purple];

export function EnsayoMaterialExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 1, 0, MUESTRAS.length - 1)), p: 0, hechas: new Set<string>() };
  const [s, setS] = useState(init);
  const mu = MUESTRAS[s.m]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un material y sométele a las cinco pruebas: golpe, calor, agua, electricidad e imán."}
      onReset={() => setS({ ...init, hechas: new Set() })}
      controls={<Choice label="Muestra" items={MUESTRAS.map((x, i) => ({ value: i, label: x.n }))} value={s.m} onChange={(m) => setS({ m, p: 0, hechas: new Set() })} />}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Pruebas">
        {PRUEBAS.map((p, i) => (
          <button key={p} type="button" aria-pressed={s.p === i} className={`${TOOL_BTN} ${s.p === i ? "bg-white/15" : ""}`} style={{ borderColor: COLOR_PRUEBA[i] }} onClick={() => setS((a) => ({ ...a, p: i, hechas: new Set([...a.hechas, `${a.m}-${i}`]) }))}>
            {p}
          </button>
        ))}
      </div>
      <div className="rounded-lg border p-3 text-[color:var(--stage-ink,#fff)]" style={{ borderColor: COLOR_PRUEBA[s.p] }} data-testid="ensayo-resultado">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{mu.n}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm font-bold" style={{ color: COLOR_PRUEBA[s.p] }}>
            Prueba: {PRUEBAS[s.p]}
          </span>
        </div>
        <p className="mt-2">{mu.r[s.p]}</p>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Pruebas realizadas con esta muestra">
          {[...s.hechas].filter((h) => h.startsWith(`${s.m}-`)).length} de {PRUEBAS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 3.2 Comparar propiedades de dos materiales ───────────── */

export const PROPIEDADES = ["Dureza", "Resistencia a la rotura", "Peso (densidad)", "Conducción eléctrica", "Conducción térmica", "Flexibilidad", "Resistencia a la corrosión"] as const;
export const COMPARABLES = [
  { n: "Acero", p: [8, 9, 8, 5, 6, 4, 3], rho: 7850 },
  { n: "Aluminio", p: [4, 5, 3, 8, 8, 5, 7], rho: 2700 },
  { n: "Cobre", p: [4, 4, 9, 10, 10, 6, 7], rho: 8960 },
  { n: "Madera de pino", p: [3, 4, 1, 0, 1, 4, 4], rho: 500 },
  { n: "Vidrio", p: [7, 3, 3, 0, 1, 0, 10], rho: 2500 },
  { n: "PVC", p: [3, 4, 2, 0, 0, 5, 9], rho: 1400 },
] as const;

export function PropiedadesBarrasExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 0, 0, COMPARABLES.length - 1)), b: Math.round(num(block.params?.b, 3, 0, COMPARABLES.length - 1)) };
  const [s, setS] = useState(init);
  const A = COMPARABLES[s.a]!;
  const B = COMPARABLES[s.b]!;
  const ganaA = A.p.filter((v, i) => v > (B.p[i] ?? 0)).length;
  const ganaB = B.p.filter((v, i) => v > (A.p[i] ?? 0)).length;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige dos materiales y compara sus propiedades (valores orientativos de 0 a 10). Ninguno es el mejor en todo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material A (azul)" items={COMPARABLES.map((x, i) => ({ value: i, label: x.n }))} value={s.a} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Choice label="Material B (naranja)" items={COMPARABLES.map((x, i) => ({ value: i, label: x.n }))} value={s.b} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <div className="flex flex-col gap-2" data-testid="propiedades-barras">
        {PROPIEDADES.map((p, i) => (
          <div key={p} className="flex flex-col gap-1">
            <Barra label={p} valor={A.p[i] ?? 0} color={MANIM.blue} />
            <Barra label="" valor={B.p[i] ?? 0} color={MANIM.orange} />
          </div>
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.blue} label={`${A.n}: densidad`}>
          {f0(A.rho)} kg/m³
        </Stat>
        <Stat color={MANIM.orange} label={`${B.n}: densidad`}>
          {f0(B.rho)} kg/m³
        </Stat>
        <Stat color={MANIM.green} label="Propiedades en las que gana A / B">
          {ganaA} / {ganaB}
        </Stat>
      </Readout>
      <Note>Que un material puntúe alto no siempre es bueno: una puntuación alta en «peso» significa que es pesado y en «conducción» que deja pasar el calor o la corriente. Depende de lo que busques.</Note>
    </Frame>
  );
}

/* ───────────── 3.3 Madera maciza y derivados ───────────── */

export const TABLEROS = [
  { n: "Madera maciza", c: "Tablones cortados directamente del tronco, con la veta natural.", u: "Muebles de calidad, vigas, puertas.", p: [7, 3, 4, 3] },
  { n: "Contrachapado", c: "Láminas finas de madera pegadas con las fibras cruzadas (capas perpendiculares).", u: "Maquetas, muebles, encofrados.", p: [8, 5, 6, 7] },
  { n: "Aglomerado", c: "Virutas y serrín de madera prensados con cola.", u: "Muebles económicos de cocina y estudio.", p: [4, 8, 3, 6] },
  { n: "Tablero de fibras (MDF)", c: "Fibras de madera muy finas aglomeradas con resinas.", u: "Muebles lacados, estanterías, maquetas.", p: [5, 7, 3, 9] },
] as const;
const CRIT = ["Resistencia", "Bajo coste", "Resistencia a la humedad", "Facilidad de mecanizar"];

export function MaderaDerivadosExplorador({ block }: { block: ToolBlock }) {
  const init = { t: Math.round(num(block.params?.n, 1, 0, TABLEROS.length - 1)) };
  const [s, setS] = useState(init);
  const t = TABLEROS[s.t]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara los cuatro tipos de tablero: de qué están hechos, para qué se usan y en qué destacan."}
      onReset={() => setS(init)}
      controls={<Choice label="Tipo de tablero" items={TABLEROS.map((x, i) => ({ value: i, label: x.n }))} value={s.t} onChange={(v) => setS({ t: v })} />}
    >
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3 text-[color:var(--stage-ink,#fff)]" data-testid="tablero-detalle">
        <p>
          <strong>Composición:</strong> {t.c}
        </p>
        <p className="mt-1">
          <strong>Usos:</strong> {t.u}
        </p>
      </div>
      <div className="flex flex-col gap-2">
        {CRIT.map((c, i) => (
          <Barra key={c} label={c} valor={t.p[i] ?? 0} color={[MANIM.blue, MANIM.green, MANIM.orange, MANIM.purple][i]!} />
        ))}
      </div>
      <Note>{s.t === 1 ? "Al cruzar las fibras de cada capa, el tablero se deforma poco y resiste en todas las direcciones: por eso es más estable que la madera maciza." : s.t === 0 ? "La madera maciza tiene su resistencia en la dirección de la veta y puede «jugar» (alabearse) con los cambios de humedad." : "Los derivados aprovechan los restos de la madera, abaratan el producto y se fabrican en tableros grandes y uniformes."}</Note>
    </Frame>
  );
}

/* ───────────── 3.4 Metales: pruebas de imán, corriente y oxidación ───────────── */

export const METALES = [
  { n: "Hierro", ferroso: true, comp: "Metal puro (Fe). Blando y muy oxidable.", elec: true, oxid: 1, uso: "Poco usado puro; base del acero." },
  { n: "Acero", ferroso: true, comp: "Aleación de hierro con menos de un 2 % de carbono.", elec: true, oxid: 0.8, uso: "Estructuras, herramientas, tornillos, carrocerías." },
  { n: "Fundición", ferroso: true, comp: "Aleación de hierro con más de un 2 % de carbono: dura y frágil.", elec: true, oxid: 0.7, uso: "Tapas de alcantarilla, bloques de motor." },
  { n: "Cobre", ferroso: false, comp: "Metal puro (Cu), rojizo y muy buen conductor.", elec: true, oxid: 0.25, uso: "Cables, tuberías, circuitos." },
  { n: "Aluminio", ferroso: false, comp: "Metal puro (Al), ligero y brillante.", elec: true, oxid: 0.1, uso: "Latas, ventanas, bicicletas, aviones." },
  { n: "Latón", ferroso: false, comp: "Aleación de cobre y zinc, dorada.", elec: true, oxid: 0.2, uso: "Grifos, tornillería, instrumentos musicales." },
  { n: "Bronce", ferroso: false, comp: "Aleación de cobre y estaño, marrón rojizo.", elec: true, oxid: 0.2, uso: "Estatuas, campanas, cojinetes." },
  { n: "Estaño", ferroso: false, comp: "Metal puro (Sn), blando y de bajo punto de fusión.", elec: true, oxid: 0.05, uso: "Soldaduras y hojalata." },
] as const;

export function MetalesPruebaExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 1, 0, METALES.length - 1)), iman: false, dias: Math.round(num(block.params?.a, 0, 0, 200)) };
  const [s, setS] = useState(init);
  const me = METALES[s.m]!;
  const oxid = clamp(s.dias / 100, 0, 1) * me.oxid;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Acerca el imán y deja pasar los días en un ambiente húmedo: solo los metales férricos son atraídos y se oxidan de forma destructiva."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal" items={METALES.map((x, i) => ({ value: i, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Choice label="Imán" items={[{ value: 0, label: "Lejos" }, { value: 1, label: "Acercar el imán" }]} value={s.iman ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, iman: v === 1 }))} />
          <Slider label="Días en ambiente húmedo" value={s.dias} min={0} max={200} step={10} color={MANIM.orange} onChange={(dias) => setS((x) => ({ ...x, dias }))} />
        </>
      }
    >
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3 text-[color:var(--stage-ink,#fff)]" data-testid="metal-detalle">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{me.n}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm font-bold" style={{ color: me.ferroso ? MANIM.red : MANIM.blue }}>
            {me.ferroso ? "Férrico (contiene hierro)" : "No férrico"}
          </span>
        </div>
        <p className="mt-2">{me.comp}</p>
        <p className="mt-1 text-[color:var(--stage-muted,#b8c2d0)]">Usos: {me.uso}</p>
      </div>
      <Readout>
        <Stat color={s.iman ? (me.ferroso ? MANIM.green : MANIM.muted) : MANIM.muted} label="Imán">
          {!s.iman ? "—" : me.ferroso ? "Lo atrae" : "No lo atrae"}
        </Stat>
        <Stat color={MANIM.yellow} label="Conduce la electricidad">
          {me.elec ? "Sí" : "No"}
        </Stat>
        <Stat color={oxid > 0.5 ? MANIM.red : oxid > 0.15 ? MANIM.orange : MANIM.green} label="Oxidación visible">
          {f0(oxid * 100)} %
        </Stat>
      </Readout>
      <Note>{me.ferroso ? "El hierro y sus aleaciones se oxidan (herrumbre) y la capa de óxido es porosa: el interior sigue deteriorándose. Se protegen con pintura o galvanizado." : "Los metales no férricos suelen formar una capa de óxido fina y firme que protege lo de debajo."}</Note>
    </Frame>
  );
}

/* ───────────── 3.5 Plásticos y el calor ───────────── */

export const PLASTICOS = [
  { n: "Termoplástico", ej: "PVC, polietileno, PET" },
  { n: "Termoestable", ej: "Baquelita, resina epoxi" },
  { n: "Elastómero", ej: "Caucho, silicona" },
] as const;

/** Estado de un plástico según su tipo (0, 1, 2) y la temperatura en °C. */
export function estadoPlastico(tipo: number, t: number): { estado: string; moldeable: boolean; color: string } {
  if (tipo === 0) {
    if (t < 80) return { estado: "Rígido", moldeable: false, color: MANIM.blue };
    if (t < 160) return { estado: "Blando: se puede moldear", moldeable: true, color: MANIM.orange };
    if (t < 260) return { estado: "Fundido", moldeable: true, color: MANIM.red };
    return { estado: "Se descompone y arde", moldeable: false, color: MANIM.muted };
  }
  if (tipo === 1) {
    if (t < 220) return { estado: "Rígido (no se ablanda)", moldeable: false, color: MANIM.blue };
    return { estado: "Se carboniza: no funde", moldeable: false, color: MANIM.muted };
  }
  if (t < 180) return { estado: "Elástico: recupera su forma", moldeable: false, color: MANIM.green };
  return { estado: "Se degrada y pierde la elasticidad", moldeable: false, color: MANIM.muted };
}

export function PlasticoCalorExplorador({ block }: { block: ToolBlock }) {
  const init = { tipo: Math.round(num(block.params?.n, 0, 0, 2)), t: Math.round(num(block.params?.a, 20, 20, 300)), est: 0 };
  const [s, setS] = useState(init);
  const e = estadoPlastico(s.tipo, s.t);
  const fundido = e.estado === "Fundido";
  const blando = e.moldeable && !fundido;
  const carbon = e.color === MANIM.muted;
  const alto = fundido ? 18 : 70;
  const ancho = s.tipo === 2 ? 220 + s.est * 2 : 220;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la temperatura y observa qué pasa con cada tipo. Con el elastómero, estíralo y suéltalo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tipo de plástico" items={PLASTICOS.map((x, i) => ({ value: i, label: x.n }))} value={s.tipo} onChange={(tipo) => setS((x) => ({ ...x, tipo, est: 0 }))} />
          <Slider label="Temperatura" value={s.t} min={20} max={300} step={10} unit=" °C" color={MANIM.orange} onChange={(t) => setS((x) => ({ ...x, t }))} />
          {s.tipo === 2 ? <Slider label="Estiramiento" value={s.est} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(est) => setS((x) => ({ ...x, est }))} /> : null}
        </>
      }
    >
      <Svg w={520} h={150} testId="plastico" maxH={170}>
        <rect x={260 - ancho / 2} y={120 - alto} width={ancho} height={alto} rx={fundido ? 40 : blando ? 18 : 4} fill={e.color} fillOpacity={0.4} stroke={e.color} strokeWidth={4} className="anim-t" />
        {carbon ? <text x={260} y={90} fill={MANIM.ink} fontSize={16} textAnchor="middle">humo y carbonilla</text> : null}
        <line x1={20} y1={122} x2={500} y2={122} stroke={MANIM.grid} strokeWidth={3} />
      </Svg>
      <Readout>
        <Stat color={e.color} label="Estado">
          {e.estado}
        </Stat>
        <Stat color={MANIM.yellow} label="¿Se puede volver a moldear?">
          {e.moldeable ? "Sí (y se recicla por fusión)" : "No"}
        </Stat>
      </Readout>
      <Note>{`${PLASTICOS[s.tipo]!.n}: ${PLASTICOS[s.tipo]!.ej}. ` + (s.tipo === 0 ? "Sus cadenas se deslizan al calentar, por eso se moldea y se recicla." : s.tipo === 1 ? "Sus cadenas están enlazadas en red: nunca se ablanda, se quema." : "Sus cadenas se estiran y vuelven a su sitio al soltar, como un muelle.")}</Note>
    </Frame>
  );
}

/* ───────────── 3.6 Elegir el material de un objeto ───────────── */

export const CANDIDATOS = [
  { n: "Acero", p: [9, 3, 6, 1] },
  { n: "Aluminio", p: [6, 8, 5, 1] },
  { n: "Madera", p: [5, 7, 8, 8] },
  { n: "Plástico (ABS, PVC)", p: [6, 9, 8, 9] },
  { n: "Vidrio", p: [3, 4, 6, 8] },
  { n: "Cerámica", p: [4, 3, 7, 9] },
] as const;
export const CRITERIOS_SEL = ["Resistencia", "Ligereza", "Bajo precio", "Aislamiento"] as const;
export const OBJETOS_SEL = [
  { n: "Casco de bicicleta", w: [5, 5, 2, 1] },
  { n: "Mango de una sartén", w: [2, 2, 2, 5] },
  { n: "Marco de una ventana", w: [3, 2, 3, 5] },
  { n: "Barandilla de un puente", w: [5, 1, 3, 0] },
] as const;

/** Puntuación ponderada (0–10) de cada candidato según los pesos de los criterios. */
export const puntuaciones = (w: readonly number[]) => {
  const total = w.reduce((a, b) => a + b, 0) || 1;
  return CANDIDATOS.map((c) => ({ n: c.n, v: c.p.reduce((a, v, i) => a + v * (w[i] ?? 0), 0) / total })).sort((a, b) => b.v - a.v);
};

export function SeleccionMaterialEsoExplorador({ block }: { block: ToolBlock }) {
  const o0 = Math.round(num(block.params?.n, 0, 0, OBJETOS_SEL.length - 1));
  const init = { w: [...OBJETOS_SEL[o0]!.w] as number[], o: o0 };
  const [s, setS] = useState(init);
  const r = puntuaciones(s.w);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un objeto y ajusta la importancia de cada criterio. El mejor material cambia según lo que más te importe."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Objeto" items={OBJETOS_SEL.map((x, i) => ({ value: i, label: x.n }))} value={s.o} onChange={(o) => setS({ o, w: [...OBJETOS_SEL[o]!.w] })} />
          {CRITERIOS_SEL.map((c, i) => (
            <Slider key={c} label={`Importancia de «${c}»`} value={s.w[i] ?? 0} min={0} max={5} step={1} color={MANIM.yellow} onChange={(v) => setS((x) => ({ ...x, w: x.w.map((q, j) => (j === i ? v : q)) }))} />
          ))}
        </>
      }
    >
      <div className="flex flex-col gap-2" data-testid="seleccion-ranking">
        {r.map((x, i) => (
          <Barra key={x.n} label={`${i + 1}. ${x.n}`} valor={x.v} color={i === 0 ? MANIM.green : MANIM.blue} extra={fmtEs(x.v, 1)} />
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Material mejor valorado">
          {r[0]!.n}
        </Stat>
      </Readout>
      <Note>Puntuaciones orientativas. En la realidad se tienen en cuenta más criterios: durabilidad, aspecto, facilidad de trabajar y el impacto ambiental del material.</Note>
    </Frame>
  );
}

/* ───────────── 3.7 Encuentra los peligros del taller ───────────── */

export const PELIGROS = [
  { x: 130, y: 90, t: "Pelo largo suelto cerca de una máquina", c: "Hay que recogerse el pelo, y quitarse pulseras y colgantes, para que nada se enganche." },
  { x: 390, y: 90, t: "Se sierra sin gafas de protección", c: "Las gafas protegen los ojos de virutas y astillas. Se usan siempre que se corta, taladra o lija." },
  { x: 270, y: 262, t: "Serrín y restos en el suelo", c: "El suelo debe estar limpio: el serrín resbala y los restos pueden provocar una caída." },
  { x: 295, y: 126, t: "Herramienta con el filo hacia fuera, al borde de la mesa", c: "Las herramientas se dejan en su sitio, con el filo hacia dentro, para que no caigan ni corten." },
  { x: 60, y: 245, t: "Regleta sobrecargada y cable por el suelo", c: "No se conectan muchos aparatos a la vez, y los cables se recogen para no tropezar ni provocar un cortocircuito." },
  { x: 465, y: 245, t: "Mochila en el pasillo", c: "Mochilas y abrigos se guardan fuera de las zonas de paso: en una emergencia hay que poder salir rápido." },
] as const;

export function TallerPeligrosExplorador({ block }: { block: ToolBlock }) {
  const init = { hallados: [] as number[], ver: -1 };
  const [s, setS] = useState(init);
  const pulsa = (i: number) => setS((a) => ({ hallados: a.hallados.includes(i) ? a.hallados : [...a.hallados, i], ver: i }));
  return (
    <Frame
      stacked
      hint={block.hint ?? "Hay seis situaciones peligrosas en este taller. Pulsa sobre las que encuentres y lee cómo corregirlas."}
      onReset={() => setS(init)}
      controls={<span className="text-sm text-[color:var(--stage-muted,#b8c2d0)] sm:col-span-2">Pulsa los círculos para revisarlos. Un círculo verde es un peligro ya localizado.</span>}
    >
      <div className="relative mx-auto w-full max-w-xl">
      <Svg w={520} h={300} testId="taller">
        <rect x={0} y={0} width={520} height={300} fill={MANIM.panel} />
        <rect x={0} y={230} width={520} height={70} fill={MANIM.surface} />
        <rect x={100} y={150} width={330} height={16} fill={MANIM.orange} fillOpacity={0.5} stroke={MANIM.orange} strokeWidth={3} />
        <line x1={115} y1={166} x2={115} y2={230} stroke={MANIM.orange} strokeWidth={5} />
        <line x1={415} y1={166} x2={415} y2={230} stroke={MANIM.orange} strokeWidth={5} />
        {/* alumna con el pelo suelto */}
        <circle cx={130} cy={100} r={20} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={3} />
        <path d="M 110 100 C 100 150, 112 170, 125 175" fill="none" stroke={MANIM.yellow} strokeWidth={5} />
        <rect x={110} y={122} width={40} height={30} rx={6} fill={MANIM.blue} fillOpacity={0.4} stroke={MANIM.blue} strokeWidth={3} />
        {/* alumno que sierra sin gafas */}
        <circle cx={390} cy={100} r={20} fill={MANIM.green} fillOpacity={0.5} stroke={MANIM.green} strokeWidth={3} />
        <rect x={370} y={122} width={40} height={30} rx={6} fill={MANIM.green} fillOpacity={0.4} stroke={MANIM.green} strokeWidth={3} />
        <line x1={410} y1={140} x2={450} y2={125} stroke={MANIM.muted} strokeWidth={4} />
        {/* herramienta al borde */}
        <rect x={270} y={140} width={50} height={9} fill={MANIM.muted} transform="rotate(-8 270 144)" />
        {/* serrín */}
        {[225, 250, 275, 300, 235, 290].map((x, i) => (
          <circle key={x} cx={x} cy={262 + (i % 3) * 8} r={3} fill={MANIM.yellow} fillOpacity={0.7} />
        ))}
        {/* regleta */}
        <rect x={35} y={225} width={50} height={10} rx={3} fill={MANIM.red} fillOpacity={0.5} stroke={MANIM.red} strokeWidth={2} />
        <path d="M 60 235 C 80 270, 120 280, 160 275" fill="none" stroke={MANIM.muted} strokeWidth={2.5} />
        {/* mochila */}
        <rect x={445} y={225} width={36} height={44} rx={8} fill={MANIM.purple} fillOpacity={0.5} stroke={MANIM.purple} strokeWidth={3} />
      </Svg>
        {PELIGROS.map((p, i) => {
          const hallado = s.hallados.includes(i);
          return (
            <button
              key={p.t}
              type="button"
              aria-label={`Peligro ${i + 1}${hallado ? ` (localizado): ${p.t}` : ""}`}
              className="absolute flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-[3px] text-base font-bold text-[color:var(--stage-ink,#fff)]"
              style={{ left: `${(p.x / 520) * 100}%`, top: `${(p.y / 300) * 100}%`, borderColor: hallado ? MANIM.green : MANIM.red, borderStyle: hallado ? "solid" : "dashed", background: hallado ? "rgb(131 193 103 / 0.25)" : "rgb(252 98 85 / 0.1)" }}
              onClick={() => pulsa(i)}
            >
              {hallado ? "✓" : "?"}
            </button>
          );
        })}
      </div>
      {s.ver >= 0 ? (
        <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3 text-[color:var(--stage-ink,#fff)]" data-testid="peligro-detalle">
          <p className="font-bold" style={{ color: MANIM.red }}>
            {PELIGROS[s.ver]!.t}
          </p>
          <p className="mt-1">{PELIGROS[s.ver]!.c}</p>
        </div>
      ) : null}
      <Readout>
        <Stat color={MANIM.green} label="Peligros localizados">
          {s.hallados.length} de {PELIGROS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 3.8 Contenedores de reciclaje ───────────── */

export const CONTENEDORES = [
  { id: "amarillo", n: "Amarillo", c: "#ffd866", d: "envases de plástico, latas y briks" },
  { id: "azul", n: "Azul", c: "#58c4dd", d: "papel y cartón" },
  { id: "verde", n: "Verde", c: "#83c167", d: "envases de vidrio" },
  { id: "marron", n: "Marrón", c: "#c58b5a", d: "restos orgánicos" },
  { id: "gris", n: "Gris", c: "#b8c2d0", d: "resto (lo que no se recicla)" },
  { id: "punto", n: "Punto limpio", c: "#c59bd6", d: "pilas, aceite, aparatos, bombillas, pinturas" },
] as const;
export const RESIDUOS = [
  { n: "Botella de agua de plástico", b: "amarillo" },
  { n: "Lata de refresco", b: "amarillo" },
  { n: "Brik de leche", b: "amarillo" },
  { n: "Caja de cartón", b: "azul" },
  { n: "Periódico viejo", b: "azul" },
  { n: "Frasco de mermelada de vidrio", b: "verde" },
  { n: "Cáscara de plátano", b: "marron" },
  { n: "Colilla y pañal", b: "gris" },
  { n: "Pilas gastadas", b: "punto" },
  { n: "Aceite de cocina usado", b: "punto" },
] as const;

export function ContenedoresReciclajeExplorador({ block }: { block: ToolBlock }) {
  const init = { i: 0, aciertos: 0, fallos: 0, msg: "" };
  const [s, setS] = useState(init);
  const fin = s.i >= RESIDUOS.length;
  const r = RESIDUOS[Math.min(s.i, RESIDUOS.length - 1)]!;
  const elige = (id: string) => {
    const ok = id === r.b;
    const correcto = CONTENEDORES.find((c) => c.id === r.b)!;
    setS((a) => ({ i: a.i + 1, aciertos: a.aciertos + (ok ? 1 : 0), fallos: a.fallos + (ok ? 0 : 1), msg: ok ? `¡Correcto! ${r.n}: contenedor ${correcto.n.toLowerCase()}.` : `No: ${r.n} va al contenedor ${correcto.n.toLowerCase()} (${correcto.d}).` }));
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el contenedor adecuado para cada residuo. Si te equivocas, verás dónde va y por qué."}
      onReset={() => setS(init)}
      controls={
        <div className="grid gap-2 sm:col-span-2 sm:grid-cols-3" role="group" aria-label="Contenedores">
          {CONTENEDORES.map((c) => (
            <button key={c.id} type="button" disabled={fin} className={TOOL_BTN} style={{ borderColor: c.c, color: c.c }} onClick={() => elige(c.id)}>
              {c.n}
            </button>
          ))}
        </div>
      }
    >
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-4 text-center text-lg text-[color:var(--stage-ink,#fff)]" data-testid="residuo-actual">
        {fin ? `Has terminado: ${s.aciertos} de ${RESIDUOS.length} bien.` : `¿Dónde va «${r.n}»?`}
      </div>
      {s.msg ? <Note>{s.msg}</Note> : null}
      <Readout>
        <Stat color={MANIM.green} label="Aciertos">
          {s.aciertos}
        </Stat>
        <Stat color={MANIM.red} label="Fallos">
          {s.fallos}
        </Stat>
        <Stat color={MANIM.yellow} label="Residuo">
          {Math.min(s.i + 1, RESIDUOS.length)} de {RESIDUOS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}
