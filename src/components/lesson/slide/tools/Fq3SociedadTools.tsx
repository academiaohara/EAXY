"use client";

import { useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Dot, Seg } from "@/components/lesson/anim/geometry";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f1 = (v: number) => fmtEs(v, 1);

/* ───────────── Cálculos y datos (se comprueban en los tests) ───────────── */

export const SUSTANCIAS_PH = [
  { nombre: "Jugo gástrico", ph: 1.5 },
  { nombre: "Zumo de limón", ph: 2.2 },
  { nombre: "Refresco de cola", ph: 2.5 },
  { nombre: "Vinagre", ph: 2.9 },
  { nombre: "Lluvia ácida", ph: 4.0 },
  { nombre: "Café", ph: 5.0 },
  { nombre: "Lluvia normal", ph: 5.6 },
  { nombre: "Agua pura", ph: 7.0 },
  { nombre: "Sangre", ph: 7.4 },
  { nombre: "Bicarbonato", ph: 8.3 },
  { nombre: "Jabón", ph: 10.0 },
  { nombre: "Lejía", ph: 12.5 },
  { nombre: "Desatascador (sosa)", ph: 14.0 },
] as const;
export function claseAcidez(ph: number): "ácida" | "neutra" | "básica" {
  if (ph < 6.95) return "ácida";
  if (ph > 7.05) return "básica";
  return "neutra";
}
/** Concentración de iones H⁺ (mol/L) para un pH dado. */
export const concentracionH = (ph: number): number => 10 ** -ph;
/** Cuántas veces más ácida es una disolución de pH₁ que otra de pH₂. */
export const vecesMasAcida = (ph1: number, ph2: number): number => 10 ** (ph2 - ph1);
/** Color aproximado del indicador universal. */
export const colorPH = (ph: number): string => `hsl(${Math.round(Math.max(0, Math.min(14, ph)) / 14 * 260)}, 80%, 55%)`;

export const PICTOGRAMAS = [
  { codigo: "GHS01", nombre: "Explosivo", significado: "Puede explotar por golpe, fricción, calor o chispa.", ejemplo: "Fuegos artificiales, pólvora", consejo: "Mantener lejos de fuentes de calor y no golpear." },
  { codigo: "GHS02", nombre: "Inflamable", significado: "Se enciende con facilidad.", ejemplo: "Alcohol, acetona, butano", consejo: "Alejar de llamas y chispas; ventilar." },
  { codigo: "GHS03", nombre: "Comburente", significado: "Favorece la combustión de otras sustancias.", ejemplo: "Lejía concentrada, oxígeno", consejo: "No poner en contacto con combustibles." },
  { codigo: "GHS04", nombre: "Gas a presión", significado: "Gas en un recipiente a presión que puede explotar si se calienta.", ejemplo: "Bombonas de butano", consejo: "No exponer al sol ni al fuego." },
  { codigo: "GHS05", nombre: "Corrosivo", significado: "Quema la piel y los ojos y ataca metales.", ejemplo: "Desatascador, ácido de limpieza", consejo: "Usar guantes y gafas." },
  { codigo: "GHS06", nombre: "Toxicidad aguda", significado: "Puede causar la muerte o intoxicación grave en pequeñas dosis.", ejemplo: "Algunos pesticidas, metanol", consejo: "No inhalar ni ingerir; guardar bajo llave." },
  { codigo: "GHS07", nombre: "Irritante / nocivo", significado: "Irrita piel u ojos o es nocivo en cierta cantidad.", ejemplo: "Detergentes, algunos disolventes", consejo: "Evitar el contacto y lavarse las manos." },
  { codigo: "GHS08", nombre: "Peligro grave para la salud", significado: "Puede causar cáncer o dañar órganos a largo plazo.", ejemplo: "Benceno, amianto", consejo: "Evitar toda exposición." },
  { codigo: "GHS09", nombre: "Peligroso para el medio ambiente", significado: "Daña los organismos acuáticos.", ejemplo: "Pinturas, pesticidas", consejo: "No verter por el desagüe: llevar al punto limpio." },
] as const;

export const CONTAMINANTES = [
  { nombre: "Dióxido de carbono (CO₂)", origen: "Combustión de carbón, petróleo y gas; respiración", efecto: "Gas de efecto invernadero: calentamiento global", medida: "Menos combustibles fósiles; renovables y eficiencia" },
  { nombre: "Monóxido de carbono (CO)", origen: "Combustión incompleta (motores, estufas defectuosas)", efecto: "Tóxico: se une a la hemoglobina y quita oxígeno a la sangre", medida: "Buena ventilación y revisar las calderas" },
  { nombre: "Dióxido de azufre (SO₂)", origen: "Quema de carbón y petróleo con azufre", efecto: "Lluvia ácida e irritación respiratoria", medida: "Combustibles con poco azufre; filtros en chimeneas" },
  { nombre: "Óxidos de nitrógeno (NOₓ)", origen: "Motores de combustión a alta temperatura", efecto: "Lluvia ácida y smog; problemas respiratorios", medida: "Catalizadores; menos tráfico y vehículos eléctricos" },
  { nombre: "Partículas (PM2.5)", origen: "Diésel, industria, calefacciones de leña", efecto: "Enfermedades respiratorias y cardiovasculares", medida: "Filtros de partículas; transporte público" },
  { nombre: "Ozono troposférico (O₃)", origen: "Reacciones de NOₓ con la luz solar (smog fotoquímico)", efecto: "Irritante para ojos y pulmones; daña cultivos", medida: "Reducir NOₓ y compuestos orgánicos volátiles" },
  { nombre: "Clorofluorocarburos (CFC)", origen: "Aerosoles y refrigerantes antiguos", efecto: "Destruyen la capa de ozono estratosférica", medida: "Prohibidos por el Protocolo de Montreal" },
] as const;

const SIGMA = 5.67e-8;
/** Temperatura de equilibrio de la Tierra sin atmósfera con albedo a (K): ((1−a)·S/(4σ))^(1/4), S = 1361 W/m². */
export const temperaturaSinAtmosfera = (albedo = 0.3, S = 1361): number => ((1 - albedo) * S / (4 * SIGMA)) ** 0.25;
/** Temperatura de la superficie en un modelo de una capa de atmósfera que absorbe una fracción ε de la radiación infrarroja. */
export const temperaturaSuperficie = (eps: number, albedo = 0.3): number => temperaturaSinAtmosfera(albedo) * (2 / (2 - Math.max(0, Math.min(1, eps)))) ** 0.25;
export const kelvinACelsius = (k: number): number => k - 273.15;

export const MATERIALES = [
  { nombre: "Papel y cartón", degradacion: "de unos meses a unos pocos años", ahorro: 40, kgAnio: 70 },
  { nombre: "Vidrio", degradacion: "más de 1000 años (no se degrada de forma natural)", ahorro: 30, kgAnio: 20 },
  { nombre: "Plástico (PET)", degradacion: "de 100 a 1000 años", ahorro: 70, kgAnio: 35 },
  { nombre: "Latas de aluminio", degradacion: "de 200 a 500 años", ahorro: 95, kgAnio: 5 },
  { nombre: "Materia orgánica", degradacion: "de unas semanas a unos meses", ahorro: 0, kgAnio: 150 },
] as const;
export const kgReciclados = (kgAnio: number, tasa: number): number => kgAnio * Math.max(0, Math.min(100, tasa)) / 100;

/* ───────────── 1. Escala de pH ───────────── */

export function EscalaPhFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 3, 0, SUSTANCIAS_PH.length - 1));
  const [i, setI] = useState(init);
  const sus = SUSTANCIAS_PH[i]!;
  const X = (ph: number): number => 50 + (ph / 14) * 420;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Por debajo de 7 es ácida; por encima de 7, básica; 7 es neutra."}
      onReset={() => setI(init)}
      controls={<Choice label="Sustancia" items={SUSTANCIAS_PH.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={110} testId="escala-ph" maxH={130}>
        {Array.from({ length: 15 }, (_, p) => (
          <g key={p}>
            <rect x={X(p) - 14} y={40} width={30} height={26} fill={colorPH(p)} fillOpacity={0.85} />
            <text x={X(p)} y={84} textAnchor="middle" fill={MANIM.muted} fontSize={11}>{p}</text>
          </g>
        ))}
        <Seg a={[X(sus.ph), 30]} b={[X(sus.ph), 40]} color={MANIM.ink} width={3} />
        <Dot p={[X(sus.ph), 24]} r={6} color={MANIM.ink} />
        <text x={X(0)} y={104} fill={MANIM.red} fontSize={11}>ácido</text>
        <text x={X(14)} y={104} textAnchor="end" fill={MANIM.blue} fontSize={11}>básico</text>
      </Svg>
      <Readout>
        <Stat color={colorPH(sus.ph)} label={sus.nombre}>{`pH = ${f1(sus.ph)} · ${claseAcidez(sus.ph)}`}</Stat>
        <Stat color={MANIM.purple} label="Concentración de H⁺">{`10^(−${f1(sus.ph)}) mol/L`}</Stat>
        <Stat color={MANIM.green} label="Frente a agua pura (pH 7)">{sus.ph < 7 ? `${fmtEs(vecesMasAcida(sus.ph, 7), 0)} veces más ácida` : sus.ph > 7 ? `${fmtEs(vecesMasAcida(7, sus.ph), 0)} veces más básica` : "igual"}</Stat>
      </Readout>
      <Note>El <b>pH</b> mide la <b>acidez</b> de una disolución acuosa en una escala de 0 a 14: <b>pH &lt; 7</b> es <b>ácida</b> (más iones H⁺), <b>pH = 7</b> es <b>neutra</b> y <b>pH &gt; 7</b> es <b>básica</b> o alcalina. La escala es <b>logarítmica</b>: cada unidad de pH supone una acidez <b>10 veces</b> mayor o menor. Se mide con <b>indicadores</b> (papel indicador universal, col lombarda) o con un pH-metro. La <b>lluvia normal</b> es ligeramente ácida (pH ≈ 5,6) y se llama <b>lluvia ácida</b> si es más ácida que eso. Valores de pH aproximados.</Note>
    </Frame>
  );
}

/* ───────────── 2. Pictogramas de peligro ───────────── */

export function PictogramasFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 1, 0, PICTOGRAMAS.length - 1));
  const [i, setI] = useState(init);
  const p = PICTOGRAMAS[i]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Un rombo con borde rojo indica un peligro: el dibujo del interior dice cuál."}
      onReset={() => setI(init)}
      controls={<Choice label="Pictograma" items={PICTOGRAMAS.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Svg w={520} h={130} testId="pictogramas" maxH={150}>
        <rect x={225} y={20} width={70} height={70} fill="#ffffff" stroke={MANIM.red} strokeWidth={8} transform="rotate(45 260 55)" />
        <text x={260} y={60} textAnchor="middle" fill="#111827" fontSize={14} fontWeight={800}>{p.codigo}</text>
        <text x={260} y={122} textAnchor="middle" fill={MANIM.ink} fontSize={14} fontWeight={700}>{p.nombre}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.red} label="Qué significa">{p.significado}</Stat>
        <Stat color={MANIM.orange} label="Ejemplos">{p.ejemplo}</Stat>
        <Stat color={MANIM.green} label="Precaución">{p.consejo}</Stat>
      </Readout>
      <Note>Los productos químicos llevan una <b>etiqueta</b> con el <b>nombre</b>, el <b>fabricante</b>, <b>pictogramas</b> de peligro, una <b>palabra de advertencia</b> («Peligro» o «Atención») y <b>frases</b> sobre riesgos y precauciones. Los pictogramas del sistema europeo (<b>CLP</b>) son rombos con <b>borde rojo</b>. Aquí se muestra el código en lugar del dibujo. Antes de usar un producto hay que <b>leer la etiqueta</b>; los residuos peligrosos (pinturas, pilas, aerosoles) se llevan al <b>punto limpio</b>.</Note>
    </Frame>
  );
}

/* ───────────── 3. Contaminantes atmosféricos ───────────── */

export function ContaminantesFq3Explorador({ block }: { block: ToolBlock }) {
  const init = Math.round(num(block.params?.n, 0, 0, CONTAMINANTES.length - 1));
  const [i, setI] = useState(init);
  const c = CONTAMINANTES[i]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada contaminante tiene un origen y un efecto distinto, y una forma de reducirlo."}
      onReset={() => setI(init)}
      controls={<Choice label="Contaminante" items={CONTAMINANTES.map((x, k) => ({ value: String(k), label: x.nombre.split(" (")[1]?.replace(")", "") ?? x.nombre }))} value={String(i)} onChange={(k) => setI(Number(k))} />}
    >
      <Readout>
        <Stat color={MANIM.yellow} label="Contaminante">{c.nombre}</Stat>
        <Stat color={MANIM.orange} label="De dónde procede">{c.origen}</Stat>
        <Stat color={MANIM.red} label="Efecto">{c.efecto}</Stat>
        <Stat color={MANIM.green} label="Cómo reducirlo">{c.medida}</Stat>
      </Readout>
      <Note>La <b>contaminación atmosférica</b> es la presencia en el aire de sustancias en cantidades que dañan a las personas o al medio ambiente. Procede sobre todo de la <b>combustión</b> de combustibles fósiles. La <b>lluvia ácida</b> se forma cuando el SO₂ y los NOₓ reaccionan con el agua de la atmósfera y producen ácido sulfúrico y ácido nítrico: daña bosques, lagos y monumentos de piedra caliza. Los problemas se reducen con <b>filtros</b> y <b>catalizadores</b>, <b>combustibles más limpios</b> y <b>menos consumo</b>.</Note>
    </Frame>
  );
}

/* ───────────── 4. Efecto invernadero ───────────── */

export function EfectoInvernaderoFq3Explorador({ block }: { block: ToolBlock }) {
  const init = num(block.params?.a, 0.78, 0, 1);
  const [eps, setEps] = useState(init);
  const T = temperaturaSuperficie(eps);
  const T0 = temperaturaSinAtmosfera();
  const Y = (c: number): number => 140 - ((c + 40) / 80) * 120;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cuanta más radiación infrarroja retiene la atmósfera, más se calienta la superficie."}
      onReset={() => setEps(init)}
      controls={<Slider label="Fracción de infrarrojo que retiene la atmósfera" value={eps} min={0} max={1} step={0.01} color={MANIM.orange} format={(v) => `${Math.round(v * 100)} %`} onChange={setEps} />}
    >
      <Svg w={520} h={170} testId="efecto-invernadero" maxH={190}>
        <Seg a={[60, Y(0)]} b={[480, Y(0)]} color={MANIM.muted} width={1} dashed />
        <text x={64} y={Y(0) - 4} fill={MANIM.muted} fontSize={11}>0 °C</text>
        <text x={64} y={148} fill={MANIM.muted} fontSize={11}>−40 °C</text>
        <rect x={150} y={Math.min(Y(kelvinACelsius(T)), 150)} width={80} height={Math.max(2, 150 - Y(kelvinACelsius(T)))} fill={MANIM.orange} fillOpacity={0.85} />
        <rect x={300} y={Y(kelvinACelsius(T0))} width={80} height={Math.max(2, 150 - Y(kelvinACelsius(T0)))} fill={MANIM.blue} fillOpacity={0.85} />
        <text x={190} y={165} textAnchor="middle" fill={MANIM.ink} fontSize={12}>con atmósfera</text>
        <text x={340} y={165} textAnchor="middle" fill={MANIM.ink} fontSize={12}>sin atmósfera</text>
        <text x={190} y={Y(kelvinACelsius(T)) - 6} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{`${f1(kelvinACelsius(T))} °C`}</text>
        <text x={340} y={Y(kelvinACelsius(T0)) - 6} textAnchor="middle" fill={MANIM.ink} fontSize={12}>{`${f1(kelvinACelsius(T0))} °C`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.orange} label="Temperatura media de la superficie">{`${f1(kelvinACelsius(T))} °C`}</Stat>
        <Stat color={MANIM.blue} label="Sin atmósfera">{`${f1(kelvinACelsius(T0))} °C`}</Stat>
        <Stat color={MANIM.red} label="Aumento por el efecto invernadero">{`+${f1(T - T0)} °C`}</Stat>
      </Readout>
      <Note>La Tierra recibe luz solar y emite <b>radiación infrarroja</b>. Los <b>gases de efecto invernadero</b> (vapor de agua, CO₂, metano, óxidos de nitrógeno) <b>retienen</b> parte de esa radiación y calientan la superficie: es un efecto <b>natural y necesario</b>, que eleva la temperatura media de unos −18 °C a unos <b>+15 °C</b>. El problema es el <b>aumento</b> de esos gases por la <b>quema de combustibles fósiles</b>, la deforestación y la ganadería: refuerza el efecto invernadero y causa el <b>cambio climático</b> (aumento de temperatura, deshielo, subida del nivel del mar, fenómenos extremos). El modelo es una <b>simplificación</b> de una sola capa; el valor ε ≈ 0,78 reproduce la temperatura actual.</Note>
    </Frame>
  );
}

/* ───────────── 5. Residuos y reciclaje ───────────── */

export function ReciclajeFq3Explorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 2, 0, MATERIALES.length - 1)), r: Math.round(num(block.params?.a, 40, 0, 100)) };
  const [s, setS] = useState(init);
  const mat = MATERIALES[s.m]!;
  const rec = kgReciclados(mat.kgAnio, s.r);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Reciclar ahorra materias primas y energía y evita que los residuos se acumulen en vertederos."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={MATERIALES.map((x, k) => ({ value: String(k), label: x.nombre }))} value={String(s.m)} onChange={(k) => setS((o) => ({ ...o, m: Number(k) }))} />
          <Slider label="Porcentaje que se recicla" value={s.r} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(r) => setS((o) => ({ ...o, r }))} />
        </>
      }
    >
      <Svg w={520} h={110} testId="reciclaje" maxH={130}>
        <rect x={60} y={40} width={400} height={26} rx={6} fill={MANIM.red} fillOpacity={0.5} />
        <rect x={60} y={40} width={(s.r / 100) * 400} height={26} rx={6} fill={MANIM.green} fillOpacity={0.9} />
        <text x={60} y={30} fill={MANIM.green} fontSize={12}>{`reciclado ${s.r} %`}</text>
        <text x={460} y={30} textAnchor="end" fill={MANIM.red} fontSize={12}>{`a vertedero ${100 - s.r} %`}</text>
      </Svg>
      <Readout>
        <Stat color={MANIM.yellow} label="Tiempo de degradación">{mat.degradacion}</Stat>
        <Stat color={MANIM.green} label="Ahorro de energía al reciclar">{mat.ahorro > 0 ? `≈ ${mat.ahorro} %` : "se composta (abono)"}</Stat>
        <Stat color={MANIM.blue} label={`Por persona y año (≈ ${mat.kgAnio} kg)`}>{`${f1(rec)} kg reciclados · ${f1(mat.kgAnio - rec)} kg a vertedero`}</Stat>
      </Readout>
      <Note>Un <b>residuo</b> es todo material que se desecha. La regla de las <b>3 R</b>: <b>reducir</b> (consumir menos), <b>reutilizar</b> (dar otro uso) y <b>reciclar</b> (convertir el residuo en nueva materia prima). Reciclar <b>ahorra energía</b> y recursos y evita contaminar: fabricar aluminio reciclado necesita un 95 % menos de energía que partir del mineral. La <b>materia orgánica</b> se composta y da abono. Los residuos <b>peligrosos</b> (pilas, aceites, pinturas) van al <b>punto limpio</b>. Las cifras (tiempos, ahorros y kilos por persona) son <b>órdenes de magnitud aproximados</b>.</Note>
    </Frame>
  );
}
