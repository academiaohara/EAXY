"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

/* ───────────── Cálculos (se comprueban en los tests) ───────────── */

/** Valores orientativos: densidad (g/cm³), resistencia (MPa) y precio aproximado (€/kg). */
export const MATERIALES_PREST = [
  { n: "Acero", rho: 7.85, sigma: 250, euro: 1 },
  { n: "Aluminio 6061", rho: 2.7, sigma: 275, euro: 3 },
  { n: "Titanio", rho: 4.5, sigma: 880, euro: 25 },
  { n: "Pino", rho: 0.5, sigma: 40, euro: 1 },
  { n: "Fibra de carbono", rho: 1.6, sigma: 600, euro: 40 },
  { n: "PLA", rho: 1.24, sigma: 50, euro: 20 },
] as const;

/** Resistencia específica: resistencia dividida entre la densidad (MPa·cm³/g). */
export const resistenciaEspecifica = (sigma: number, rho: number) => sigma / rho;
/** Coste (€) por cada 100 MPa de resistencia y por kg de material. */
export const costePorResistencia = (euroKg: number, sigma: number) => (euroKg / sigma) * 100;

export const FUNDICION = [
  { n: "Aluminio", rho: 2.7, contr: 1.3 },
  { n: "Bronce", rho: 8.8, contr: 1.5 },
  { n: "Hierro fundido", rho: 7.2, contr: 1.0 },
] as const;
/** Masa (kg) de metal a fundir para una pieza de `volCm3`, incluyendo un `extraPct` % para bebederos y mazarotas. */
export const masaColada = (volCm3: number, rho: number, extraPct = 30) => (volCm3 * rho * (1 + extraPct / 100)) / 1000;
/** Medida del modelo para compensar la contracción al enfriarse (porcentaje). */
export const medidaModelo = (mm: number, contrPct: number) => mm * (1 + contrPct / 100);

export const MATERIALES_CORTE = [
  { n: "Aluminio", vc: 200 },
  { n: "Latón", vc: 120 },
  { n: "Acero dulce", vc: 60 },
  { n: "Acero inoxidable", vc: 40 },
  { n: "Madera", vc: 500 },
] as const;
/** Velocidad de corte (m/min) para una herramienta o pieza de diámetro `d` mm girando a `n` rpm. */
export const velocidadCorte = (dMm: number, n: number) => (Math.PI * dMm * n) / 1000;
/** Revoluciones por minuto para conseguir la velocidad de corte `vc` con un diámetro `d`. */
export const rpmCorte = (vc: number, dMm: number) => (dMm > 0 ? (1000 * vc) / (Math.PI * dMm) : 0);
/** Tiempo (min) de una pasada de longitud `L` mm con avance `f` mm por vuelta a `n` rpm. */
export const tiempoPasada = (L: number, f: number, n: number) => (f > 0 && n > 0 ? L / (f * n) : Infinity);

export type Requisito = "desmontable" | "estanca" | "calor" | "distintos";
export const UNIONES = [
  { n: "Tornillo y tuerca", des: true, est: false, calor: true, dist: true, nota: "Se puede montar y desmontar muchas veces." },
  { n: "Remache", des: false, est: false, calor: true, dist: true, nota: "Fija chapas; rápido y resistente, pero no se desmonta." },
  { n: "Soldadura", des: false, est: true, calor: true, dist: false, nota: "Une metales fundiéndolos: muy resistente, exige equipo y protección." },
  { n: "Adhesivo", des: false, est: true, calor: false, dist: true, nota: "Une materiales distintos sin calor; depende de la superficie y del curado." },
  { n: "Encaje o ajuste", des: true, est: false, calor: true, dist: true, nota: "Piezas con forma complementaria; sin elementos extra." },
] as const;
export function unionesValidas(req: readonly Requisito[]) {
  return UNIONES.filter((u) => (!req.includes("desmontable") || u.des) && (!req.includes("estanca") || u.est) && (!req.includes("calor") || u.calor) && (!req.includes("distintos") || u.dist)).map((u) => u.n);
}

export const IMPACTO_MAT = [
  { n: "Aluminio", virgen: 180, reciclado: 15 },
  { n: "Acero", virgen: 25, reciclado: 10 },
  { n: "Plástico PET", virgen: 80, reciclado: 35 },
  { n: "Vidrio", virgen: 15, reciclado: 10 },
] as const;
/** Energía incorporada (MJ) de una masa con un porcentaje de material reciclado (valores orientativos). */
export const energiaIncorporada = (kg: number, virgen: number, reciclado: number, pctReciclado: number) => kg * (virgen * (1 - pctReciclado / 100) + reciclado * (pctReciclado / 100));

/** Longitud total de corte (mm) de una placa rectangular `w × h` con `n` agujeros circulares de diámetro `d`. */
export const longitudCorte = (w: number, h: number, n: number, d: number) => 2 * (w + h) + n * Math.PI * d;
export const MATERIALES_LASER = [
  { n: "Cartón (3 mm)", v: 40 },
  { n: "Madera contrachapada (3 mm)", v: 12 },
  { n: "Metacrilato (3 mm)", v: 8 },
] as const;
/** Tiempo (s) de corte láser: recorrido a velocidad `v` mm/s más 0,5 s de perforación por agujero. */
export const tiempoLaser = (L: number, v: number, n: number) => (v > 0 ? L / v + 0.5 * n : Infinity);

/** Nivel de riesgo a partir de probabilidad (1–5) y gravedad (1–5). */
export function nivelRiesgo(prob: number, grav: number) {
  const v = prob * grav;
  return { valor: v, nivel: v <= 4 ? "Bajo" : v <= 12 ? "Medio" : "Alto" };
}

/* ───────────── 1. Prestaciones y selección ───────────── */

export function PrestacionesExplorador({ block }: { block: ToolBlock }) {
  const init = { c: Math.round(num(block.params?.n, 0, 0, 2)) };
  const [s, setS] = useState(init);
  const CRIT = ["Resistencia específica (ligero y resistente)", "Menor coste por resistencia", "Menor densidad"];
  const val = (m: (typeof MATERIALES_PREST)[number]) => (s.c === 0 ? resistenciaEspecifica(m.sigma, m.rho) : s.c === 1 ? 1 / costePorResistencia(m.euro, m.sigma) : 1 / m.rho);
  const orden = [...MATERIALES_PREST].sort((a, b) => val(b) - val(a));
  const max = val(orden[0]!);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el criterio y observa cómo cambia el material ganador. Los datos son orientativos."}
      onReset={() => setS(init)}
      controls={<Choice label="Criterio" items={CRIT.map((label, value) => ({ value, label }))} value={s.c} onChange={(c) => setS({ c })} />}
    >
      <Svg w={520} h={190} testId="prestaciones" maxH={200}>
        {orden.map((m, i) => (
          <g key={m.n}>
            <text x={10} y={24 + i * 30} fill={MANIM.ink} fontSize={13}>
              {m.n}
            </text>
            <rect x={150} y={10 + i * 30} width={Math.max(3, (val(m) / max) * 280)} height={20} rx={3} fill={i === 0 ? MANIM.green : MANIM.blue} fillOpacity={0.6} />
            <text x={156 + (val(m) / max) * 280} y={25 + i * 30} fill={MANIM.yellow} fontSize={12}>
              {s.c === 0 ? `${fmtEs(resistenciaEspecifica(m.sigma, m.rho), 0)}` : s.c === 1 ? `${f2(costePorResistencia(m.euro, m.sigma))} €` : `${f2(m.rho)} g/cm³`}
            </text>
          </g>
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.green} label="Mejor opción con este criterio">{orden[0]!.n}</Stat>
        <Stat color={MANIM.yellow} label="Datos del ganador (orient.)">σ = {orden[0]!.sigma} MPa · ρ = {f2(orden[0]!.rho)} g/cm³ · ≈ {orden[0]!.euro} €/kg</Stat>
      </Readout>
      <Note>No existe «el mejor material»: depende de lo que se pida. Para una bicicleta de competición importa la resistencia por kilo; para una estructura fija, el coste. Los índices de selección (σ/ρ, coste por resistencia…) convierten esa decisión en un cálculo.</Note>
    </Frame>
  );
}

/* ───────────── 2. Fundición ───────────── */

export function FundicionExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, 2)), v: Math.round(num(block.params?.a, 200, 20, 1000)), l: 100 };
  const [s, setS] = useState(init);
  const M = FUNDICION[s.m]!;
  const kg = masaColada(s.v, M.rho);
  const kgPieza = (s.v * M.rho) / 1000;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el metal y el volumen de la pieza. Calcula el metal que hay que fundir y de qué tamaño hacer el modelo para compensar la contracción."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Metal" items={FUNDICION.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Volumen de la pieza" value={s.v} min={20} max={1000} step={10} unit=" cm³" color={MANIM.blue} onChange={(v) => setS((x) => ({ ...x, v }))} />
          <Slider label="Longitud de la pieza" value={s.l} min={20} max={300} step={5} unit=" mm" color={MANIM.orange} onChange={(l) => setS((x) => ({ ...x, l }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Masa de la pieza">{f2(kgPieza)} kg</Stat>
        <Stat color={MANIM.orange} label="Metal a fundir (con un 30 % extra de bebederos y mazarotas)">{f2(kg)} kg</Stat>
        <Stat color={MANIM.green} label={`Longitud del modelo (contracción ${fmtEs(M.contr, 1)} %)`}>{f1(medidaModelo(s.l, M.contr))} mm</Stat>
      </Readout>
      <Note>En la fundición se hace un modelo, se moldea en arena y se vierte el metal líquido. Además de la pieza se rellenan los canales de llenado (bebederos) y los depósitos que alimentan la contracción (mazarotas), que luego se cortan y se refunden. Como el metal se contrae al enfriar, el modelo se hace algo mayor. Valores orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 3. Mecanizado: velocidad de corte ───────────── */

export function CorteTornoExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, MATERIALES_CORTE.length - 1)), d: Math.round(num(block.params?.a, 20, 5, 100)), L: 100, f: 0.2 };
  const [s, setS] = useState(init);
  const M = MATERIALES_CORTE[s.m]!;
  const n = rpmCorte(M.vc, s.d);
  const t = tiempoPasada(s.L, s.f, n);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada material tiene una velocidad de corte recomendada. Cuanto mayor es el diámetro, menos revoluciones hacen falta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material de la pieza" items={MATERIALES_CORTE.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Diámetro de la pieza o de la broca" value={s.d} min={5} max={100} step={1} unit=" mm" color={MANIM.blue} onChange={(d) => setS((x) => ({ ...x, d }))} />
          <Slider label="Longitud de la pasada" value={s.L} min={10} max={300} step={10} unit=" mm" color={MANIM.orange} onChange={(L) => setS((x) => ({ ...x, L }))} />
          <Slider label="Avance de la herramienta" value={s.f} min={0.05} max={0.5} step={0.05} unit=" mm/vuelta" color={MANIM.green} format={(v) => fmtEs(v, 2)} onChange={(f) => setS((x) => ({ ...x, f }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Velocidad de corte recomendada (orient.)">{M.vc} m/min</Stat>
        <Stat color={MANIM.blue} label="Revoluciones: n = 1000 · Vc / (π · D)">{fmtEs(n, 0)} rpm</Stat>
        <Stat color={MANIM.green} label="Tiempo de la pasada: L / (avance · n)">{t < 1 ? `${fmtEs(t * 60, 0)} s` : `${f1(t)} min`}</Stat>
      </Readout>
      <Note>En el torno, la fresadora y el taladro la herramienta o la pieza giran. La velocidad de corte es la velocidad del borde: Vc = π · D · n / 1000. Si es demasiado alta, la herramienta se quema; si es baja, el trabajo es lento y el acabado, peor. El valor adecuado depende del material y de la herramienta (los de la tabla son orientativos).</Note>
    </Frame>
  );
}

/* ───────────── 4. Elegir una unión ───────────── */

export function UnionExplorador({ block }: { block: ToolBlock }) {
  const init = { r: [] as Requisito[] };
  const [s, setS] = useState(init);
  void block;
  const R: { id: Requisito; n: string }[] = [
    { id: "desmontable", n: "Que se pueda desmontar" },
    { id: "estanca", n: "Que sea estanca (no pierda líquido)" },
    { id: "calor", n: "Que resista el calor" },
    { id: "distintos", n: "Unir materiales distintos" },
  ];
  const ok = unionesValidas(s.r);
  return (
    <Frame
      stacked
      hint="Activa los requisitos de tu unión y mira qué tipos de unión los cumplen. Si no queda ninguna, habrá que revisar el diseño."
      onReset={() => setS(init)}
      controls={
        <div className="flex flex-wrap gap-2 sm:col-span-2" role="group" aria-label="Requisitos">
          {R.map((x) => (
            <button key={x.id} type="button" className={TOOL_BTN} aria-pressed={s.r.includes(x.id)} onClick={() => setS((v) => ({ r: v.r.includes(x.id) ? v.r.filter((q) => q !== x.id) : [...v.r, x.id] }))}>
              {x.n}
            </button>
          ))}
        </div>
      }
    >
      <ul className="flex flex-col gap-1 text-sm" data-testid="uniones">
        {UNIONES.map((u) => {
          const v = ok.includes(u.n);
          return (
            <li key={u.n} style={{ color: v ? MANIM.green : MANIM.muted }}>
              {v ? "✓" : "✗"} <b>{u.n}</b>: {u.nota}
            </li>
          );
        })}
      </ul>
      <Readout>
        <Stat color={ok.length ? MANIM.green : MANIM.red} label="Uniones que cumplen todos los requisitos">{ok.length ? ok.join(", ") : "Ninguna"}</Stat>
      </Readout>
      <Note>La unión se elige según el uso: desmontable (tornillos, encajes) o permanente (remaches, soldadura, adhesivos); según los materiales que se unen y según las condiciones (calor, humedad, vibraciones). Es una simplificación, pero ayuda a razonar.</Note>
    </Frame>
  );
}

/* ───────────── 5. Impacto de los materiales ───────────── */

export function ImpactoMaterialExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, IMPACTO_MAT.length - 1)), kg: Math.round(num(block.params?.a, 10, 1, 100)), pct: 0 };
  const [s, setS] = useState(init);
  const M = IMPACTO_MAT[s.m]!;
  const e0 = energiaIncorporada(s.kg, M.virgen, M.reciclado, 0);
  const e = energiaIncorporada(s.kg, M.virgen, M.reciclado, s.pct);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige un material y la cantidad. Sube el porcentaje de material reciclado y mira cuánta energía se ahorra al fabricarlo. Valores orientativos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={IMPACTO_MAT.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Cantidad" value={s.kg} min={1} max={100} step={1} unit=" kg" color={MANIM.blue} onChange={(kg) => setS((x) => ({ ...x, kg }))} />
          <Slider label="Porcentaje de material reciclado" value={s.pct} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(pct) => setS((x) => ({ ...x, pct }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.red} label="Energía con material virgen (orient.)">{fmtEs(e0, 0)} MJ</Stat>
        <Stat color={MANIM.green} label={`Energía con ${s.pct} % reciclado`}>{fmtEs(e, 0)} MJ</Stat>
        <Stat color={MANIM.yellow} label="Ahorro">{fmtEs(e0 - e, 0)} MJ ({fmtEs(e0 > 0 ? ((e0 - e) / e0) * 100 : 0, 0)} %)</Stat>
      </Readout>
      <Note>Obtener un metal a partir de su mineral consume mucha energía; reciclarlo, mucha menos (en el aluminio, la diferencia es enorme). Por eso conviene diseñar productos fáciles de separar y reciclar. Los valores de energía incorporada son aproximados y varían según la fuente.</Note>
    </Frame>
  );
}

/* ───────────── 6. Corte láser ───────────── */

export function CorteLaserExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 1, 0, 2)), w: Math.round(num(block.params?.a, 100, 40, 300)), h: 60, n: 4, d: 8 };
  const [s, setS] = useState(init);
  const M = MATERIALES_LASER[s.m]!;
  const L = longitudCorte(s.w, s.h, s.n, s.d);
  const t = tiempoLaser(L, M.v, s.n);
  const k = Math.min(1, 400 / s.w);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cambia el tamaño de la placa, los agujeros y el material. Cuantos más metros de corte, más tiempo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATERIALES_LASER.map((x, value) => ({ value, label: x.n }))} value={s.m} onChange={(m) => setS((x) => ({ ...x, m }))} />
          <Slider label="Ancho de la placa" value={s.w} min={40} max={300} step={10} unit=" mm" color={MANIM.blue} onChange={(w) => setS((x) => ({ ...x, w }))} />
          <Slider label="Alto de la placa" value={s.h} min={30} max={200} step={10} unit=" mm" color={MANIM.orange} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Número de agujeros" value={s.n} min={0} max={20} step={1} color={MANIM.green} onChange={(n) => setS((x) => ({ ...x, n }))} />
          <Slider label="Diámetro de cada agujero" value={s.d} min={3} max={20} step={1} unit=" mm" color={MANIM.purple} onChange={(d) => setS((x) => ({ ...x, d }))} />
        </>
      }
    >
      <Svg w={520} h={140} testId="laser" maxH={150}>
        <rect x={30} y={20} width={s.w * k} height={s.h * k * 0.9} fill={MANIM.green} fillOpacity={0.2} stroke={MANIM.green} strokeWidth={3} />
        {Array.from({ length: s.n }, (_, i) => (
          <circle key={i} cx={30 + ((i + 0.5) / Math.max(1, s.n)) * s.w * k} cy={20 + s.h * k * 0.45} r={Math.max(2, (s.d / 2) * k)} fill={MANIM.surface} stroke={MANIM.yellow} strokeWidth={2} />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Longitud total de corte">{fmtEs(L, 0)} mm</Stat>
        <Stat color={MANIM.orange} label={`Velocidad de corte (${M.n}, orient.)`}>{M.v} mm/s</Stat>
        <Stat color={MANIM.green} label="Tiempo estimado">{t < 90 ? `${fmtEs(t, 0)} s` : `${f1(t / 60)} min`}</Stat>
      </Readout>
      <Note>El láser sigue un dibujo vectorial 2D: tiempo = longitud de corte ÷ velocidad (más medio segundo de perforación por cada contorno interior). Por eso cuantos más agujeros y más complejo es el contorno, más tarda. La velocidad depende del material, su grosor y la potencia del láser; los valores son orientativos.</Note>
    </Frame>
  );
}

/* ───────────── 7. Matriz de riesgos ───────────── */

export function MatrizRiesgosExplorador({ block }: { block: ToolBlock }) {
  const init = { p: Math.round(num(block.params?.a, 3, 1, 5)), g: Math.round(num(block.params?.b, 4, 1, 5)) };
  const [s, setS] = useState(init);
  const r = nivelRiesgo(s.p, s.g);
  const col = r.nivel === "Bajo" ? MANIM.green : r.nivel === "Medio" ? MANIM.yellow : MANIM.red;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Valora la probabilidad de que ocurra un accidente y su gravedad. El nivel de riesgo es el producto de las dos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Probabilidad (1 muy rara, 5 muy frecuente)" value={s.p} min={1} max={5} step={1} color={MANIM.blue} onChange={(p) => setS((x) => ({ ...x, p }))} />
          <Slider label="Gravedad (1 leve, 5 muy grave)" value={s.g} min={1} max={5} step={1} color={MANIM.orange} onChange={(g) => setS((x) => ({ ...x, g }))} />
        </>
      }
    >
      <Svg w={520} h={150} testId="riesgos" maxH={160}>
        {Array.from({ length: 5 }, (_, gi) => 5 - gi).flatMap((g) =>
          Array.from({ length: 5 }, (_, pi) => pi + 1).map((p) => {
            const lv = nivelRiesgo(p, g).nivel;
            const c = lv === "Bajo" ? MANIM.green : lv === "Medio" ? MANIM.yellow : MANIM.red;
            const act = p === s.p && g === s.g;
            return <rect key={`${p}-${g}`} x={150 + (p - 1) * 40} y={10 + (5 - g) * 26} width={38} height={24} rx={3} fill={c} fillOpacity={act ? 0.95 : 0.3} stroke={act ? MANIM.ink : "none"} strokeWidth={3} />;
          }),
        )}
        <text x={145} y={80} fill={MANIM.muted} fontSize={11} textAnchor="end">
          gravedad
        </text>
        <text x={250} y={146} fill={MANIM.muted} fontSize={11} textAnchor="middle">
          probabilidad
        </text>
      </Svg>
      <Readout>
        <Stat color={col} label="Riesgo = probabilidad × gravedad">{r.valor} → {r.nivel}</Stat>
      </Readout>
      <Note>{r.nivel === "Alto" ? "Riesgo alto: hay que eliminar el peligro o aplicar medidas de protección antes de trabajar." : r.nivel === "Medio" ? "Riesgo medio: conviene aplicar medidas preventivas (protecciones, formación, supervisión)." : "Riesgo bajo: se mantiene con buenas prácticas y orden."} Las medidas se aplican por orden: eliminar el peligro, protegerlo (resguardos), organizar el trabajo y, por último, usar equipos de protección personal (gafas, guantes, mascarilla).</Note>
    </Frame>
  );
}
