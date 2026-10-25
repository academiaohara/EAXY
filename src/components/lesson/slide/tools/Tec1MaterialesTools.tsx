"use client";

import { useMemo, useState } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Readout, Svg } from "@/components/lesson/slide/tools/GeometryTools";
import { Choice, Note, Stat as StatBase, fmtEs, num } from "@/components/lesson/slide/tools/industrial-ui";
import { TOOL_BTN, Frame, Slider, type ToolBlock } from "@/components/lesson/slide/tool-ui";

const Stat = (props: Parameters<typeof StatBase>[0]) => <StatBase plain {...props} />;
const f0 = (v: number) => fmtEs(v, 0);
const f1 = (v: number) => fmtEs(v, 1);
const f2 = (v: number) => fmtEs(v, 2);

function HBar({ label, value, max, color, text }: { label: string; value: number; max: number; color: string; text?: string }) {
  const w = max > 0 ? Math.max(0, Math.min(100, (value / max) * 100)) : 0;
  return (
    <div className="flex items-center gap-3 text-sm text-[color:var(--stage-ink,#fff)]">
      <span className="w-40 shrink-0 text-[color:var(--stage-muted,#b8c2d0)]">{label}</span>
      <div className="h-4 flex-1 overflow-hidden rounded bg-white/10">
        <div className="anim-t h-full rounded" style={{ width: `${w}%`, background: color }} />
      </div>
      <span className="w-24 shrink-0 text-right font-bold tabular-nums">{text ?? f1(value)}</span>
    </div>
  );
}

/* ───────────── 2.1 Mesa de muestras ───────────── */

const MUESTRAS = [
  { n: "Acero al carbono", fam: "Metálico", sub: "Ferroso", usos: "Estructuras, tornillos, herramientas, chapa de carrocería.", rasgo: "Resistente y barato; se oxida si no se protege; es magnético." },
  { n: "Fundición de hierro", fam: "Metálico", sub: "Ferroso", usos: "Bloques de motor, tapas de alcantarilla, bancadas de máquinas.", rasgo: "Se cuela muy bien en moldes; es duro pero frágil." },
  { n: "Aluminio", fam: "Metálico", sub: "No ferroso", usos: "Latas, perfiles de ventana, carrocerías ligeras.", rasgo: "Ligero (2 700 kg/m³), conduce bien el calor y la electricidad, resiste la corrosión." },
  { n: "Cobre", fam: "Metálico", sub: "No ferroso", usos: "Cables, tuberías, intercambiadores de calor.", rasgo: "Muy buen conductor eléctrico y térmico; dúctil." },
  { n: "Polietileno (PE)", fam: "Polimérico", sub: "Termoplástico", usos: "Bolsas, botellas, tuberías de riego.", rasgo: "Ligero, flexible, aislante; se reblandece con el calor y se puede reciclar fundiéndolo." },
  { n: "Resina epoxi", fam: "Polimérico", sub: "Termoestable", usos: "Adhesivos, placas de circuito impreso, matrices de composites.", rasgo: "Rígida y estable; una vez curada ya no se funde." },
  { n: "Vidrio", fam: "Cerámico", sub: "Amorfo", usos: "Ventanas, envases, fibra óptica.", rasgo: "Duro, transparente, aislante y frágil." },
  { n: "Porcelana", fam: "Cerámico", sub: "Cristalino", usos: "Sanitarios, aislantes eléctricos, vajilla.", rasgo: "Resiste calor y productos químicos; se rompe sin deformarse." },
  { n: "Hormigón armado", fam: "Compuesto", sub: "Matriz + refuerzo", usos: "Edificios, puentes, cimentaciones.", rasgo: "El hormigón resiste la compresión y las barras de acero resisten la tracción." },
  { n: "Fibra de carbono (CFRP)", fam: "Compuesto", sub: "Matriz + refuerzo", usos: "Bicicletas, aeronáutica, material deportivo.", rasgo: "Muy rígido y ligero; caro y difícil de reciclar." },
  { n: "Madera de pino", fam: "Natural", sub: "Renovable", usos: "Muebles, estructuras ligeras, embalajes.", rasgo: "Renovable y fácil de trabajar; sus propiedades dependen de la dirección de la veta." },
  { n: "Corcho", fam: "Natural", sub: "Renovable", usos: "Tapones, aislamiento térmico y acústico.", rasgo: "Muy ligero, compresible y aislante; se obtiene sin talar el árbol." },
] as const;
const FAMS = ["Todas", "Metálico", "Polimérico", "Cerámico", "Compuesto", "Natural"] as const;

export function MesaMuestrasExplorador({ block }: { block: ToolBlock }) {
  const [fam, setFam] = useState<(typeof FAMS)[number]>("Todas");
  const [sel, setSel] = useState(Math.round(num(block.params?.a, 0, 0, MUESTRAS.length - 1)));
  const [vistos, setVistos] = useState<number[]>([sel]);
  const m = MUESTRAS[sel]!;
  const lista = MUESTRAS.map((x, i) => ({ x, i })).filter(({ x }) => fam === "Todas" || x.fam === fam);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige una muestra: cada material tiene una familia, una subclase y un uso típico. Filtra por familia para compararlas."}
      onReset={() => {
        setFam("Todas");
        setSel(0);
        setVistos([0]);
      }}
      controls={<Choice label="Familia" items={FAMS.map((f) => ({ value: f, label: f }))} value={fam} onChange={setFam} />}
    >
      <div className="flex flex-wrap gap-2" role="group" aria-label="Muestras">
        {lista.map(({ x, i }) => (
          <button
            key={x.n}
            type="button"
            aria-pressed={sel === i}
            className={`${TOOL_BTN} ${sel === i ? "border-[color:var(--stage-ink,#fff)] bg-white/15" : ""}`}
            onClick={() => {
              setSel(i);
              setVistos((v) => (v.includes(i) ? v : [...v, i]));
            }}
          >
            {x.n}
          </button>
        ))}
      </div>
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] p-3 text-[color:var(--stage-ink,#fff)]" data-testid="muestra-detalle">
        <div className="flex flex-wrap items-baseline gap-3">
          <span className="text-lg font-bold">{m.n}</span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm" style={{ color: MANIM.blue }}>
            {m.fam}
          </span>
          <span className="rounded bg-white/10 px-2 py-0.5 text-sm" style={{ color: MANIM.green }}>
            {m.sub}
          </span>
        </div>
        <p className="mt-2">
          <strong>Usos:</strong> {m.usos}
        </p>
        <p className="mt-1">
          <strong>Rasgos:</strong> {m.rasgo}
        </p>
      </div>
      <Readout>
        <Stat color={MANIM.yellow} label="Muestras examinadas">
          {vistos.length} de {MUESTRAS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── 2.2 Estructura atómica ───────────── */

type Modo = "cristal" | "amorfo" | "sustitucional" | "intersticial";

/** Pseudoaleatorio determinista en [0, 1) para que el dibujo no cambie entre renderizados. */
const hash = (i: number, k: number) => {
  const x = Math.sin(i * 127.1 + k * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

export function EstructuraAtomicaExplorador({ block }: { block: ToolBlock }) {
  const MODOS: Modo[] = ["cristal", "amorfo", "sustitucional", "intersticial"];
  const init = { modo: MODOS[Math.round(num(block.params?.n, 0, 0, 3))]!, pct: Math.round(num(block.params?.a, 15, 0, 40)) };
  const [s, setS] = useState(init);
  const cols = 8;
  const rows = 5;
  const total = cols * rows;
  const order = useMemo(() => Array.from({ length: total }, (_, i) => i).sort((a, b) => hash(a, 3) - hash(b, 3)), [total]);
  const nSol = Math.round((s.pct / 100) * total);
  const sol = new Set(order.slice(0, nSol));
  const atoms: { x: number; y: number; r: number; c: string; key: string }[] = [];
  for (let j = 0; j < rows; j += 1) {
    for (let i = 0; i < cols; i += 1) {
      const k = j * cols + i;
      let x = 60 + i * 56;
      let y = 50 + j * 56;
      if (s.modo === "amorfo") {
        x += (hash(k, 1) - 0.5) * 34;
        y += (hash(k, 2) - 0.5) * 34;
      }
      const subst = s.modo === "sustitucional" && sol.has(k);
      atoms.push({ x, y, r: subst ? 19 : 15, c: subst ? MANIM.orange : MANIM.blue, key: `a${k}` });
    }
  }
  if (s.modo === "intersticial") {
    for (let q = 0; q < nSol; q += 1) {
      const k = order[q]!;
      const i = k % cols;
      const j = Math.floor(k / cols);
      if (i < cols - 1 && j < rows - 1) {
        atoms.push({ x: 60 + i * 56 + 28, y: 50 + j * 56 + 28, r: 7, c: MANIM.red, key: `i${k}` });
      }
    }
  }
  const texto: Record<Modo, string> = {
    cristal: "Átomos ordenados en una red que se repite: orden de largo alcance. Los metales, la sal y muchos cerámicos son cristalinos.",
    amorfo: "Átomos sin orden de largo alcance, como en un líquido congelado: vidrios y muchos polímeros. Sin planos regulares, no hay punto de fusión nítido: se reblandecen.",
    sustitucional: "Aleación sustitucional: átomos de otro elemento (naranja, de tamaño parecido) ocupan posiciones de la red. Ejemplo: latón (Cu + Zn).",
    intersticial: "Aleación intersticial: átomos pequeños (rojo) se cuelan en los huecos de la red y la deforman. Ejemplo: acero (Fe + C).",
  };
  return (
    <Frame
      stacked
      hint={block.hint ?? "Compara cómo se colocan los átomos. En las aleaciones, sube el porcentaje de átomos distintos y mira cómo se deforma la red."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Estructura"
            items={[
              { value: "cristal", label: "Cristalina" },
              { value: "amorfo", label: "Amorfa" },
              { value: "sustitucional", label: "Aleación sustitucional" },
              { value: "intersticial", label: "Aleación intersticial" },
            ]}
            value={s.modo}
            onChange={(modo) => setS((x) => ({ ...x, modo }))}
          />
          <Slider label="Átomos del segundo elemento" value={s.pct} min={0} max={40} unit=" %" color={MANIM.orange} disabled={s.modo === "cristal" || s.modo === "amorfo"} onChange={(pct) => setS((x) => ({ ...x, pct }))} />
        </>
      }
    >
      <Svg w={520} h={290} maxH={300} testId="tool-estructura">
        {atoms.map((a) => (
          <circle key={a.key} cx={a.x} cy={a.y} r={a.r} fill={a.c} fillOpacity={0.55} stroke={a.c} strokeWidth={2} className="anim-t" />
        ))}
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Átomos de la red">
          {total}
        </Stat>
        <Stat color={MANIM.orange} label="Átomos añadidos">
          {s.modo === "sustitucional" || s.modo === "intersticial" ? nSol : 0}
        </Stat>
      </Readout>
      <Note>{texto[s.modo]}</Note>
    </Frame>
  );
}

/* ───────────── 2.3 Comparador de propiedades ───────────── */

/** Valores típicos orientativos (los reales dependen de la aleación, la calidad y la dirección de carga). */
const PROPS = [
  { n: "Acero estructural", rho: 7850, E: 200, sr: 400, k: 50 },
  { n: "Aluminio 6061", rho: 2700, E: 69, sr: 300, k: 167 },
  { n: "Cobre", rho: 8960, E: 117, sr: 220, k: 390 },
  { n: "Polietileno (HDPE)", rho: 950, E: 1, sr: 25, k: 0.45 },
  { n: "Vidrio", rho: 2500, E: 70, sr: 50, k: 1 },
  { n: "Hormigón", rho: 2400, E: 30, sr: 3, k: 1.7 },
  { n: "Fibra de carbono (CFRP)", rho: 1600, E: 130, sr: 1500, k: 5 },
  { n: "Madera de pino (a lo largo)", rho: 500, E: 10, sr: 80, k: 0.13 },
] as const;

export function PropiedadesComparadorExplorador({ block }: { block: ToolBlock }) {
  const init = { a: Math.round(num(block.params?.a, 0, 0, PROPS.length - 1)), b: Math.round(num(block.params?.b, 1, 0, PROPS.length - 1)) };
  const [s, setS] = useState(init);
  const A = PROPS[s.a]!;
  const B = PROPS[s.b]!;
  const filas = [
    { n: "Densidad, ρ (kg/m³)", a: A.rho, b: B.rho, max: 9000, d: f0 },
    { n: "Módulo de Young, E (GPa)", a: A.E, b: B.E, max: 230, d: f0 },
    { n: "Resistencia a tracción (MPa)", a: A.sr, b: B.sr, max: 1500, d: f0 },
    { n: "Conductividad térmica (W/m·K)", a: A.k, b: B.k, max: 400, d: f2 },
    { n: "Resistencia específica σ/ρ (kJ/kg)", a: (A.sr * 1000) / A.rho, b: (B.sr * 1000) / B.rho, max: 1000, d: f0 },
  ];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige dos materiales. Fíjate en la última fila: dividir la resistencia por la densidad dice qué material aguanta más por kilo."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material A (azul)" items={PROPS.map((p, i) => ({ value: i, label: p.n }))} value={s.a} onChange={(a) => setS((x) => ({ ...x, a }))} />
          <Choice label="Material B (naranja)" items={PROPS.map((p, i) => ({ value: i, label: p.n }))} value={s.b} onChange={(b) => setS((x) => ({ ...x, b }))} />
        </>
      }
    >
      <div className="flex flex-col gap-3" data-testid="props-tabla">
        {filas.map((f) => (
          <div key={f.n} className="flex flex-col gap-1">
            <span className="text-xs font-bold uppercase tracking-wide text-[color:var(--stage-muted,#b8c2d0)]">{f.n}</span>
            <HBar label={A.n} value={f.a} max={f.max} color={MANIM.blue} text={f.d(f.a)} />
            <HBar label={B.n} value={f.b} max={f.max} color={MANIM.orange} text={f.d(f.b)} />
          </div>
        ))}
      </div>
      <Note>Valores típicos <strong>orientativos</strong>: dependen de la aleación o calidad exacta. La resistencia del hormigón y del vidrio es a tracción; a compresión son mucho mayores.</Note>
    </Frame>
  );
}

/* ───────────── 2.6 Contenido de carbono en el hierro ───────────── */

function claseFe(c: number): { nombre: string; uso: string } {
  if (c < 0.05) return { nombre: "Hierro casi puro", uso: "Núcleos magnéticos; poco usado como estructural." };
  if (c < 0.25) return { nombre: "Acero de bajo carbono (dulce)", uso: "Chapa de carrocería, alambre, perfiles soldables." };
  if (c < 0.6) return { nombre: "Acero de medio carbono", uso: "Ejes, engranajes, bielas, tornillos de alta resistencia." };
  if (c <= 2.1) return { nombre: "Acero de alto carbono", uso: "Muelles, herramientas de corte, cables de acero." };
  return { nombre: "Fundición", uso: "Bloques de motor, bancadas, tapas de alcantarilla." };
}

export function CarbonoHierroExplorador({ block }: { block: ToolBlock }) {
  const init = num(block.params?.a, 0.4, 0, 4.5);
  const [c, setC] = useState(init);
  const k = claseFe(c);
  const fund = c > 2.1;
  const dureza = fund ? 0.85 : Math.min(1, 0.2 + c * 0.8);
  const duct = fund ? 0.03 : Math.max(0.05, 1 - c * 0.85);
  const solda = fund ? 0.05 : Math.max(0.05, 1 - c * 1.2);
  const cola = fund ? 0.9 : 0.15 + c * 0.25;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube el porcentaje de carbono: el material gana dureza y pierde ductilidad y soldabilidad. Pasado el 2,1 % deja de ser acero y es fundición."}
      onReset={() => setC(init)}
      controls={<Slider label="Carbono en el hierro" value={c} min={0} max={4.5} step={0.05} unit=" %" format={f2} color={MANIM.orange} onChange={setC} />}
    >
      <Readout>
        <Stat color={MANIM.orange} label="Clase">
          {k.nombre}
        </Stat>
      </Readout>
      <div className="flex flex-col gap-1.5" data-testid="carbono-barras">
        <HBar label="Dureza y resistencia" value={dureza} max={1} color={MANIM.red} text={`${Math.round(dureza * 100)} %`} />
        <HBar label="Ductilidad" value={duct} max={1} color={MANIM.green} text={`${Math.round(duct * 100)} %`} />
        <HBar label="Soldabilidad" value={solda} max={1} color={MANIM.blue} text={`${Math.round(solda * 100)} %`} />
        <HBar label="Facilidad de colada" value={cola} max={1} color={MANIM.purple} text={`${Math.round(cola * 100)} %`} />
      </div>
      <Note>
        <strong>Usos típicos:</strong> {k.uso} Las barras son tendencias relativas e <strong>ilustrativas</strong>, no valores de ensayo.
      </Note>
    </Frame>
  );
}

/* ───────────── 2.7 Polímeros frente a la temperatura ───────────── */

type Pol = "termoplastico" | "termoestable" | "elastomero";

export function PolimeroTemperaturaExplorador({ block }: { block: ToolBlock }) {
  const TIPOS: Pol[] = ["termoplastico", "termoestable", "elastomero"];
  const init = { tipo: TIPOS[Math.round(num(block.params?.n, 0, 0, 2))]!, t: Math.round(num(block.params?.a, 20, -50, 350)) };
  const [s, setS] = useState(init);
  const estado = (() => {
    if (s.tipo === "termoplastico") {
      if (s.t < 120) return { e: "Sólido rígido o flexible", c: MANIM.green, d: "Las cadenas se mantienen unidas por fuerzas débiles." };
      if (s.t < 250) return { e: "Reblandecido: se puede moldear", c: MANIM.orange, d: "Las fuerzas entre cadenas se vencen y las cadenas deslizan: se inyecta, extruye o recicla." };
      return { e: "Degradado", c: MANIM.red, d: "Se rompen las propias cadenas: el material se descompone." };
    }
    if (s.tipo === "termoestable") {
      if (s.t < 250) return { e: "Sólido rígido e invariable", c: MANIM.green, d: "Los enlaces cruzados mantienen la red: no se reblandece ni se puede fundir de nuevo." };
      return { e: "Degradado (se carboniza)", c: MANIM.red, d: "No funde: al pasar su límite térmico se descompone." };
    }
    if (s.t < -60) return { e: "Vítreo: duro y quebradizo", c: MANIM.blue, d: "Por debajo de su temperatura de transición vítrea las cadenas apenas se mueven." };
    if (s.t < 200) return { e: "Elástico: se estira y recupera", c: MANIM.green, d: "Cadenas enrolladas con pocos enlaces cruzados: se estiran y vuelven." };
    return { e: "Degradado", c: MANIM.red, d: "A temperaturas altas el caucho se degrada." };
  })();
  const amp = Math.max(1.5, Math.min(14, 3 + (s.t + 50) / 30));
  const cadenas = [0, 1, 2, 3, 4].map((j) => {
    const y = 40 + j * 46;
    const pts = Array.from({ length: 41 }, (_, i) => {
      const x = 30 + i * 11.5;
      const fase = s.tipo === "elastomero" ? 2.2 : 1.2;
      return `${i ? "L" : "M"} ${x.toFixed(1)} ${(y + amp * Math.sin(i * fase + j * 1.7)).toFixed(1)}`;
    }).join(" ");
    return { y, pts };
  });
  const cruces = s.tipo === "termoestable" ? 9 : s.tipo === "elastomero" ? 3 : 0;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube la temperatura con cada tipo de polímero: el termoplástico se reblandece, el termoestable no, y el elastómero recupera su forma."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice
            label="Tipo de polímero"
            items={[
              { value: "termoplastico", label: "Termoplástico" },
              { value: "termoestable", label: "Termoestable" },
              { value: "elastomero", label: "Elastómero" },
            ]}
            value={s.tipo}
            onChange={(tipo) => setS((x) => ({ ...x, tipo }))}
          />
          <Slider label="Temperatura" value={s.t} min={-50} max={350} step={5} unit=" °C" color={MANIM.orange} onChange={(t) => setS((x) => ({ ...x, t }))} />
        </>
      }
    >
      <Svg w={520} h={250} maxH={260} testId="tool-polimero">
        {cadenas.map((c, i) => (
          <path key={i} d={c.pts} fill="none" stroke={estado.c} strokeWidth={3} strokeLinecap="round" className="anim-t" />
        ))}
        {Array.from({ length: cruces }, (_, i) => {
          const j = i % 4;
          const x = 80 + ((i * 53) % 400);
          return <line key={i} x1={x} y1={40 + j * 46} x2={x} y2={40 + (j + 1) * 46} stroke={MANIM.red} strokeWidth={4} />;
        })}
      </Svg>
      <Readout>
        <Stat color={estado.c} label="Estado a esta temperatura">
          {estado.e}
        </Stat>
        <Stat color={MANIM.yellow} label="Reciclable por fusión">
          {s.tipo === "termoplastico" ? "Sí" : "No"}
        </Stat>
      </Readout>
      <Note>
        {estado.d} Las temperaturas son <strong>orientativas</strong> (cada polímero real tiene las suyas).
      </Note>
    </Frame>
  );
}

/* ───────────── 2.8 Materiales compuestos ───────────── */

const FIBRAS = [
  { n: "Fibra de vidrio", E: 72, rho: 2550 },
  { n: "Fibra de carbono", E: 230, rho: 1800 },
];
const MATRIZ = { E: 3, rho: 1200 };

/** Regla de mezclas: módulo en la dirección de las fibras (Voigt) y en la transversal (Reuss). */
export function mezclaCompuesto(vf: number, Ef: number, Em: number, rf: number, rm: number) {
  return { Ep: vf * Ef + (1 - vf) * Em, Et: 1 / (vf / Ef + (1 - vf) / Em), rho: vf * rf + (1 - vf) * rm };
}

export function CompuestoMezclasExplorador({ block }: { block: ToolBlock }) {
  const init = { vf: Math.round(num(block.params?.a, 50, 0, 70)), fib: Math.round(num(block.params?.n, 0, 0, 1)), sep: false };
  const [s, setS] = useState(init);
  const fib = FIBRAS[s.fib]!;
  const r = mezclaCompuesto(s.vf / 100, fib.E, MATRIZ.E, fib.rho, MATRIZ.rho);
  const capas = 5;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la fracción de fibra: el módulo a lo largo de las fibras crece casi en proporción, pero en dirección transversal apenas mejora. Separa las capas para ver la estructura."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Refuerzo (matriz epoxi)" items={FIBRAS.map((f, i) => ({ value: i, label: f.n }))} value={s.fib} onChange={(fib2) => setS((x) => ({ ...x, fib: fib2 }))} />
          <Slider label="Fracción de fibra, Vf" value={s.vf} min={0} max={70} unit=" %" color={MANIM.green} onChange={(vf) => setS((x) => ({ ...x, vf }))} />
          <Choice label="Vista" items={[{ value: 0, label: "Material compacto" }, { value: 1, label: "Separar capas" }]} value={s.sep ? 1 : 0} onChange={(v) => setS((x) => ({ ...x, sep: v === 1 }))} />
        </>
      }
    >
      <Svg w={520} h={190} maxH={200} testId="tool-compuesto">
        {Array.from({ length: capas }, (_, i) => {
          const y = 20 + i * (s.sep ? 32 : 24);
          return (
            <g key={i} className="anim-t">
              <rect x={60} y={y} width={400} height={s.sep ? 24 : 24} rx={3} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={1.5} />
              {Array.from({ length: Math.round(s.vf / 6) }, (_, k) => (
                <line key={k} x1={66} y1={y + 3 + ((k * 7) % 18)} x2={454} y2={y + 3 + ((k * 7) % 18)} stroke={MANIM.green} strokeWidth={2.2} />
              ))}
            </g>
          );
        })}
        <text x={260} y={184} textAnchor="middle" fill={MANIM.muted} fontSize={12}>
          verde: fibras · azul: matriz de resina
        </text>
      </Svg>
      <div className="flex flex-col gap-1.5" data-testid="compuesto-barras">
        <HBar label="E a lo largo (GPa)" value={r.Ep} max={170} color={MANIM.green} text={f1(r.Ep)} />
        <HBar label="E transversal (GPa)" value={r.Et} max={170} color={MANIM.orange} text={f1(r.Et)} />
        <HBar label="Densidad (kg/m³)" value={r.rho} max={2600} color={MANIM.purple} text={f0(r.rho)} />
      </div>
      <Note>Regla de mezclas: E∥ = Vf·Ef + (1−Vf)·Em y 1/E⊥ = Vf/Ef + (1−Vf)/Em. Es un modelo ideal (fibras perfectamente alineadas y unidas); los laminados reales son algo menos rígidos.</Note>
    </Frame>
  );
}

/* ───────────── 2.9 Tratamientos térmicos del acero ───────────── */

const TRATAMIENTOS = [
  { id: "recocido", n: "Recocido", enf: "Muy lento (en el horno)", est: "Perlita y ferrita gruesas", hrc: 12, duct: "Muy alta", frag: "Baja", obj: "Ablandar, eliminar tensiones, facilitar el mecanizado." },
  { id: "normalizado", n: "Normalizado", enf: "Al aire", est: "Perlita fina, grano afinado", hrc: 20, duct: "Alta", frag: "Baja", obj: "Uniformizar el grano y mejorar la resistencia." },
  { id: "temple", n: "Temple", enf: "Rápido (agua o aceite)", est: "Martensita", hrc: 60, duct: "Muy baja", frag: "Alta", obj: "Endurecer al máximo." },
  { id: "revenido", n: "Temple + revenido", enf: "Temple y recalentado a media temperatura", est: "Martensita revenida", hrc: 0, duct: "Media", frag: "Media-baja", obj: "Recuperar tenacidad tras el temple, perdiendo algo de dureza." },
] as const;

export function TratamientoCurvaExplorador({ block }: { block: ToolBlock }) {
  const init = { id: TRATAMIENTOS[Math.round(num(block.params?.n, 2, 0, 3))]!.id as (typeof TRATAMIENTOS)[number]["id"], rev: Math.round(num(block.params?.a, 400, 150, 650)) };
  const [s, setS] = useState<{ id: (typeof TRATAMIENTOS)[number]["id"]; rev: number }>(init);
  const t = TRATAMIENTOS.find((x) => x.id === s.id)!;
  const hrc = s.id === "revenido" ? Math.round(60 - (s.rev - 150) * 0.06) : t.hrc;
  const Xt = (m: number) => 50 + m * 4.2;
  const Yt = (T: number) => 200 - T * 0.2;
  const pasos: [number, number][] =
    s.id === "recocido"
      ? [[0, 20], [20, 850], [45, 850], [110, 100]]
      : s.id === "normalizado"
        ? [[0, 20], [20, 850], [45, 850], [75, 20]]
        : s.id === "temple"
          ? [[0, 20], [20, 850], [45, 850], [52, 20]]
          : [[0, 20], [20, 850], [45, 850], [52, 20], [62, 20], [80, s.rev], [95, s.rev], [110, 20]];
  const d = pasos.map(([m, T], i) => `${i ? "L" : "M"} ${Xt(m)} ${Yt(T)}`).join(" ");
  return (
    <Frame
      stacked
      hint={block.hint ?? "Elige el tratamiento: lo que cambia es la velocidad de enfriamiento y, por tanto, la microestructura. En el revenido, sube la temperatura y verás caer la dureza."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Tratamiento" items={TRATAMIENTOS.map((x) => ({ value: x.id, label: x.n }))} value={s.id} onChange={(id) => setS((x) => ({ ...x, id }))} />
          <Slider label="Temperatura de revenido" value={s.rev} min={150} max={650} step={10} unit=" °C" color={MANIM.orange} disabled={s.id !== "revenido"} onChange={(rev) => setS((x) => ({ ...x, rev }))} />
        </>
      }
    >
      <Svg w={520} h={230} maxH={240} testId="tool-tratamiento">
        <line x1={50} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={200} x2={50} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={Yt(727)} x2={500} y2={Yt(727)} stroke={MANIM.yellow} strokeWidth={1.5} strokeDasharray="5 4" />
        <text x={500} y={Yt(727) - 4} textAnchor="end" fill={MANIM.yellow} fontSize={11}>
          727 °C (línea crítica)
        </text>
        <path d={d} fill="none" stroke={MANIM.orange} strokeWidth={3.5} strokeLinejoin="round" className="anim-t" />
        <text x={500} y={218} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          tiempo →
        </text>
        <text x={56} y={30} fill={MANIM.muted} fontSize={12}>
          T (°C)
        </text>
      </Svg>
      <Readout>
        <Stat color={MANIM.blue} label="Enfriamiento">
          {t.enf}
        </Stat>
        <Stat color={MANIM.purple} label="Microestructura">
          {t.est}
        </Stat>
        <Stat color={MANIM.red} label="Dureza aprox.">
          {hrc} HRC
        </Stat>
        <Stat color={MANIM.green} label="Ductilidad / fragilidad">
          {t.duct} / {t.frag}
        </Stat>
      </Readout>
      <Note>
        <strong>Objetivo:</strong> {t.obj} Valores <strong>ilustrativos</strong> para un acero de medio carbono; el diagrama de tiempos no está a escala.
      </Note>
    </Frame>
  );
}

/* ───────────── 2.10 Elección del proceso según la tirada ───────────── */

/** Datos ilustrativos: coste de preparación (útiles, moldes) y coste variable por pieza. */
const PROCESOS = [
  { n: "Impresión 3D", setup: 30, v: 38, c: MANIM.purple },
  { n: "Mecanizado CNC", setup: 300, v: 14, c: MANIM.blue },
  { n: "Fundición en arena", setup: 2500, v: 6, c: MANIM.orange },
  { n: "Fundición a presión (molde metálico)", setup: 25000, v: 1.2, c: MANIM.green },
];

export function ProcesoCosteExplorador({ block }: { block: ToolBlock }) {
  const init = num(block.params?.a, 2, 0, 5);
  const [e, setE] = useState(init);
  const N = Math.max(1, Math.round(10 ** e));
  const costes = PROCESOS.map((p) => p.setup / N + p.v);
  const best = costes.indexOf(Math.min(...costes));
  const X = (x: number) => 50 + (x / 5) * 440;
  const Y = (c: number) => 200 - (Math.log10(Math.max(c, 0.5)) / 4) * 170;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Aumenta la tirada: los procesos con molde caro (preparación alta, coste por pieza bajo) acaban ganando a los flexibles."}
      onReset={() => setE(init)}
      controls={<Slider label="Piezas a fabricar" value={e} min={0} max={5} step={0.1} color={MANIM.yellow} format={(v) => f0(Math.max(1, Math.round(10 ** v)))} onChange={setE} />}
    >
      <Svg w={520} h={240} maxH={250} testId="tool-proceso">
        <line x1={50} y1={200} x2={500} y2={200} stroke={MANIM.muted} strokeWidth={2} />
        <line x1={50} y1={200} x2={50} y2={20} stroke={MANIM.muted} strokeWidth={2} />
        {PROCESOS.map((p) => (
          <path key={p.n} d={Array.from({ length: 51 }, (_, i) => { const x = i / 10; const n = 10 ** x; return `${i ? "L" : "M"} ${X(x).toFixed(1)} ${Y(p.setup / n + p.v).toFixed(1)}`; }).join(" ")} fill="none" stroke={p.c} strokeWidth={3} />
        ))}
        <line x1={X(e)} y1={20} x2={X(e)} y2={200} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="5 4" />
        <text x={500} y={220} textAnchor="end" fill={MANIM.muted} fontSize={12}>
          piezas (escala logarítmica, 1 a 100 000)
        </text>
        <text x={56} y={30} fill={MANIM.muted} fontSize={12}>
          € por pieza (escala logarítmica)
        </text>
      </Svg>
      <div className="flex flex-col gap-1.5" data-testid="proceso-costes">
        {PROCESOS.map((p, i) => (
          <HBar key={p.n} label={p.n} value={costes[i]!} max={Math.max(...costes)} color={i === best ? MANIM.green : p.c} text={`${f2(costes[i]!)} €`} />
        ))}
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Proceso más barato">
          {PROCESOS[best]!.n}
        </Stat>
        <Stat color={MANIM.yellow} label="Piezas">
          {f0(N)}
        </Stat>
      </Readout>
      <Note>Coste por pieza = preparación ÷ nº de piezas + coste variable. Cifras <strong>ilustrativas</strong> de orden de magnitud, no presupuestos reales.</Note>
    </Frame>
  );
}

/* ───────────── 2.11 Impresión 3D: material, tiempo y coste ───────────── */

/** Estimación simple de una pieza maciza en forma de caja: pared de 1,2 mm y relleno proporcional. */
export function estimar3d(w: number, d: number, h: number, relleno: number, capa: number) {
  const t = 1.2;
  const total = w * d * h;
  const inner = Math.max(0, w - 2 * t) * Math.max(0, d - 2 * t) * Math.max(0, h - 2 * t);
  const vol = total - inner + (relleno / 100) * inner; // mm³
  const masa = (vol / 1000) * 1.24; // g (PLA)
  const q = 12 * (capa / 0.2); // mm³/s de material depositado
  const capas = h / capa;
  const horas = (vol / q + capas * 8) / 3600;
  const coste = masa * 0.025 + horas * 0.3;
  return { vol, masa, horas, coste };
}

export function Impresion3dExplorador({ block }: { block: ToolBlock }) {
  const init = { w: Math.round(num(block.params?.a, 60, 20, 120)), h: Math.round(num(block.params?.b, 40, 10, 100)), rel: Math.round(num(block.params?.c, 20, 0, 100)), capa: 0.2 };
  const [s, setS] = useState(init);
  const e = estimar3d(s.w, s.w, s.h, s.rel, s.capa);
  const hh = Math.floor(e.horas);
  const mm = Math.round((e.horas - hh) * 60);
  return (
    <Frame
      stacked
      hint={block.hint ?? "Reduce el relleno o engrosa la capa: el tiempo y el coste bajan, pero la pieza será menos resistente o tendrá peor acabado."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Lado de la base" value={s.w} min={20} max={120} step={5} unit=" mm" color={MANIM.blue} onChange={(w) => setS((x) => ({ ...x, w }))} />
          <Slider label="Altura" value={s.h} min={10} max={100} step={5} unit=" mm" color={MANIM.green} onChange={(h) => setS((x) => ({ ...x, h }))} />
          <Slider label="Relleno interior" value={s.rel} min={0} max={100} step={5} unit=" %" color={MANIM.orange} onChange={(rel) => setS((x) => ({ ...x, rel }))} />
          <Slider label="Altura de capa" value={s.capa} min={0.1} max={0.4} step={0.05} unit=" mm" format={f2} color={MANIM.purple} onChange={(capa) => setS((x) => ({ ...x, capa }))} />
        </>
      }
    >
      <Readout>
        <Stat color={MANIM.blue} label="Material">
          {f1(e.masa)} g
        </Stat>
        <Stat color={MANIM.orange} label="Tiempo de impresión">
          {hh} h {mm} min
        </Stat>
        <Stat color={MANIM.green} label="Coste estimado">
          {f2(e.coste)} €
        </Stat>
      </Readout>
      <Svg w={520} h={150} maxH={160} testId="tool-3d">
        <rect x={160} y={140 - s.h * 1.2} width={s.w * 1.4} height={s.h * 1.2} fill={MANIM.blue} fillOpacity={0.25} stroke={MANIM.blue} strokeWidth={3} />
        <rect x={160 + 6} y={140 - s.h * 1.2 + 6} width={Math.max(0, s.w * 1.4 - 12)} height={Math.max(0, s.h * 1.2 - 12)} fill={MANIM.orange} fillOpacity={0.1 + (s.rel / 100) * 0.6} />
      </Svg>
      <Note>Modelo simplificado: caja con pared de 1,2 mm, relleno proporcional, PLA a 1,24 g/cm³, 25 €/kg de filamento, 12 mm³/s de caudal a capa de 0,2 mm, 8 s por capa y 0,30 €/h de máquina. Sirve para comparar variantes, no para presupuestar.</Note>
    </Frame>
  );
}

/* ───────────── 2.11 Tolerancias y control de calidad ───────────── */

/** Inversa de la normal estándar (algoritmo de Acklam, error < 1,2·10⁻⁹). */
export function invNorm(p: number): number {
  const a = [-39.69683028665376, 220.9460984245205, -275.9285104469687, 138.357751867269, -30.66479806614716, 2.506628277459239];
  const b = [-54.47609879822406, 161.5858368580409, -155.6989798598866, 66.80131188771972, -13.28068155288572];
  const c = [-0.007784894002430293, -0.3223964580411365, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783];
  const d = [0.007784695709041462, 0.3224671290700398, 2.445134137142996, 3.754408661907416];
  const pl = 0.02425;
  if (p < pl) {
    const q = Math.sqrt(-2 * Math.log(p));
    return (((((c[0]! * q + c[1]!) * q + c[2]!) * q + c[3]!) * q + c[4]!) * q + c[5]!) / ((((d[0]! * q + d[1]!) * q + d[2]!) * q + d[3]!) * q + 1);
  }
  if (p > 1 - pl) {
    return -invNorm(1 - p);
  }
  const q = p - 0.5;
  const r = q * q;
  return ((((((a[0]! * r + a[1]!) * r + a[2]!) * r + a[3]!) * r + a[4]!) * r + a[5]!) * q) / (((((b[0]! * r + b[1]!) * r + b[2]!) * r + b[3]!) * r + b[4]!) * r + 1);
}

const MUESTRA_Z = Array.from({ length: 40 }, (_, i) => invNorm((i + 0.5) / 40));
const ORDEN_Z = MUESTRA_Z.map((z, i) => ({ z, k: hash(i, 9) })).sort((a, b) => a.k - b.k).map((x) => x.z);

export function ToleranciaCalidadExplorador({ block }: { block: ToolBlock }) {
  const init = { tol: num(block.params?.a, 0.1, 0.02, 0.2), off: num(block.params?.b, 0, -0.1, 0.1), sd: num(block.params?.c, 0.04, 0.01, 0.1) };
  const [s, setS] = useState(init);
  const NOM = 20;
  const medidas = ORDEN_Z.map((z) => NOM + s.off + z * s.sd);
  const fuera = medidas.filter((m) => Math.abs(m - NOM) > s.tol).length;
  const cp = (2 * s.tol) / (6 * s.sd);
  const X = (m: number) => 260 + ((m - NOM) / 0.3) * 240;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Cada punto es una pieza medida. Descentra el proceso o aumenta su dispersión y verás cómo crecen los defectos; una tolerancia más estricta también los aumenta."}
      onReset={() => setS(init)}
      controls={
        <>
          <Slider label="Tolerancia admitida, ±" value={s.tol} min={0.02} max={0.2} step={0.01} unit=" mm" format={f2} color={MANIM.green} onChange={(tol) => setS((x) => ({ ...x, tol }))} />
          <Slider label="Descentrado del proceso" value={s.off} min={-0.1} max={0.1} step={0.01} unit=" mm" format={f2} color={MANIM.orange} onChange={(off) => setS((x) => ({ ...x, off }))} />
          <Slider label="Dispersión (desviación típica)" value={s.sd} min={0.01} max={0.1} step={0.01} unit=" mm" format={f2} color={MANIM.blue} onChange={(sd) => setS((x) => ({ ...x, sd }))} />
        </>
      }
    >
      <Svg w={520} h={150} maxH={160} testId="tool-tolerancia">
        <rect x={X(NOM - s.tol)} y={20} width={X(NOM + s.tol) - X(NOM - s.tol)} height={90} fill={MANIM.green} fillOpacity={0.15} stroke={MANIM.green} strokeWidth={2} />
        <line x1={X(NOM)} y1={14} x2={X(NOM)} y2={116} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="4 4" />
        {medidas.map((m, i) => {
          const out = Math.abs(m - NOM) > s.tol;
          return <circle key={i} cx={Math.max(8, Math.min(512, X(m)))} cy={30 + (i % 8) * 10} r={4.5} fill={out ? MANIM.red : MANIM.blue} />;
        })}
        <text x={X(NOM)} y={136} textAnchor="middle" fill={MANIM.yellow} fontSize={12}>
          nominal 20,00 mm
        </text>
      </Svg>
      <Readout>
        <Stat color={fuera === 0 ? MANIM.green : MANIM.red} label="Piezas fuera de tolerancia">
          {fuera} de 40
        </Stat>
        <Stat color={MANIM.yellow} label="Rechazo">
          {f1((fuera / 40) * 100)} %
        </Stat>
        <Stat color={cp >= 1.33 ? MANIM.green : MANIM.orange} label="Capacidad Cp = 2·tol / 6σ">
          {f2(cp)}
        </Stat>
      </Readout>
      <Note>Cp ≥ 1,33 suele considerarse un proceso capaz. El descentrado no cambia Cp pero sí los defectos: por eso también se controla la media. Las 40 medidas son <strong>simuladas</strong> con una distribución normal.</Note>
    </Frame>
  );
}

/* ───────────── 2.12 Fábrica virtual: riesgos ───────────── */

const RIESGOS = [
  { n: "Máquina sin resguardo", r: "Atrapamiento de manos o ropa.", m: "Resguardo fijo, parada de emergencia y formación.", t: "Seguridad", x: 40, y: 40 },
  { n: "Charco de aceite", r: "Caídas al mismo nivel.", m: "Limpiar, señalizar y poner bandeja de recogida bajo la fuga.", t: "Seguridad", x: 150, y: 40 },
  { n: "Esmerilado sin gafas", r: "Proyección de partículas en los ojos.", m: "Gafas o pantalla facial y resguardo en la máquina.", t: "Seguridad", x: 260, y: 40 },
  { n: "Ruido continuo de 90 dB", r: "Pérdida de audición.", m: "Protectores auditivos, cabinas y mantenimiento de la maquinaria.", t: "Seguridad", x: 370, y: 40 },
  { n: "Humo de soldadura", r: "Inhalación de humos metálicos.", m: "Extracción localizada y mascarilla adecuada.", t: "Seguridad", x: 40, y: 120 },
  { n: "Taladrina al desagüe", r: "Contaminación del agua.", m: "Circuito cerrado, decantación y gestión por empresa autorizada.", t: "Ambiente", x: 150, y: 120 },
  { n: "Virutas y aceite mezclados", r: "Residuo peligroso que no se puede reciclar.", m: "Separar por tipo de residuo y entregarlo a un gestor autorizado.", t: "Ambiente", x: 260, y: 120 },
  { n: "Carga mal apilada", r: "Caída de objetos pesados.", m: "Apilar con estabilidad, usar carretilla y calzado de seguridad.", t: "Seguridad", x: 370, y: 120 },
] as const;

export function FabricaRiesgosExplorador({ block }: { block: ToolBlock }) {
  const [sel, setSel] = useState<number | null>(null);
  const [vistos, setVistos] = useState<number[]>([]);
  const r = sel === null ? null : RIESGOS[sel]!;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Recorre la fábrica y pulsa cada puesto: identifica el riesgo y la medida. Hay riesgos para las personas y para el medio ambiente."}
      onReset={() => {
        setSel(null);
        setVistos([]);
      }}
      controls={<span />}
    >
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4" role="group" aria-label="Puestos de la fábrica">
        {RIESGOS.map((x, i) => (
          <button
            key={x.n}
            type="button"
            aria-pressed={sel === i}
            className={`${TOOL_BTN} text-left ${sel === i ? "border-[color:var(--stage-ink,#fff)] bg-white/15" : ""}`}
            style={vistos.includes(i) ? { borderColor: x.t === "Ambiente" ? MANIM.green : MANIM.orange } : undefined}
            onClick={() => {
              setSel(i);
              setVistos((v) => (v.includes(i) ? v : [...v, i]));
            }}
          >
            {x.n}
          </button>
        ))}
      </div>
      {r ? (
        <div className="grid gap-3 sm:grid-cols-3" data-testid="riesgo-detalle">
          {[
            { t: "Riesgo", v: r.r, c: MANIM.red },
            { t: "Medida", v: r.m, c: MANIM.green },
            { t: "Tipo", v: r.t === "Ambiente" ? "Ambiental" : "Seguridad laboral", c: MANIM.blue },
          ].map((c) => (
            <div key={c.t} className="rounded-lg border p-3" style={{ borderColor: c.c }}>
              <div className="text-xs font-bold uppercase tracking-wide" style={{ color: c.c }}>
                {c.t}
              </div>
              <p className="mt-1 text-base leading-snug text-[color:var(--stage-ink,#fff)]">{c.v}</p>
            </div>
          ))}
        </div>
      ) : (
        <Note>Elige un puesto para ver su riesgo y la medida preventiva.</Note>
      )}
      <Readout>
        <Stat color={MANIM.yellow} label="Riesgos identificados">
          {vistos.length} de {RIESGOS.length}
        </Stat>
      </Readout>
    </Frame>
  );
}

/* ───────────── Reciclaje y energía ───────────── */

/** Energía por kg (MJ/kg), valores de orden de magnitud: primaria frente a reciclada. */
const RECICLA = [
  { n: "Aluminio", p: 170, r: 9 },
  { n: "Acero", p: 25, r: 10 },
  { n: "Cobre", p: 65, r: 18 },
  { n: "Vidrio", p: 15, r: 10 },
  { n: "PET", p: 80, r: 30 },
] as const;

export function ReciclajeEnergiaExplorador({ block }: { block: ToolBlock }) {
  const init = { m: Math.round(num(block.params?.n, 0, 0, RECICLA.length - 1)), pct: Math.round(num(block.params?.a, 50, 0, 100)), kg: Math.round(num(block.params?.b, 10, 1, 100)) };
  const [s, setS] = useState(init);
  const m = RECICLA[s.m]!;
  const e = (1 - s.pct / 100) * m.p + (s.pct / 100) * m.r;
  const ahorro = (1 - e / m.p) * 100;
  const total = e * s.kg;
  return (
    <Frame
      stacked
      hint={block.hint ?? "Sube el porcentaje de material reciclado: en el aluminio el ahorro es enorme; en el vidrio, moderado. Cambia el material para comparar."}
      onReset={() => setS(init)}
      controls={
        <>
          <Choice label="Material" items={RECICLA.map((r, i) => ({ value: i, label: r.n }))} value={s.m} onChange={(mm) => setS((x) => ({ ...x, m: mm }))} />
          <Slider label="Contenido reciclado" value={s.pct} min={0} max={100} step={5} unit=" %" color={MANIM.green} onChange={(pct) => setS((x) => ({ ...x, pct }))} />
          <Slider label="Masa fabricada" value={s.kg} min={1} max={100} unit=" kg" color={MANIM.blue} onChange={(kg) => setS((x) => ({ ...x, kg }))} />
        </>
      }
    >
      <div className="flex flex-col gap-1.5" data-testid="reciclaje-barras">
        <HBar label="Solo material primario" value={m.p} max={180} color={MANIM.red} text={`${f0(m.p)} MJ/kg`} />
        <HBar label="Solo material reciclado" value={m.r} max={180} color={MANIM.green} text={`${f0(m.r)} MJ/kg`} />
        <HBar label="Mezcla elegida" value={e} max={180} color={MANIM.yellow} text={`${f1(e)} MJ/kg`} />
      </div>
      <Readout>
        <Stat color={MANIM.green} label="Ahorro de energía">
          {f0(ahorro)} %
        </Stat>
        <Stat color={MANIM.orange} label="Energía total">
          {f0(total)} MJ ({f0(total / 3.6)} kWh)
        </Stat>
      </Readout>
      <Note>Valores de <strong>orden de magnitud</strong> (energía de producción por kilo); varían según el proceso y la fuente de energía.</Note>
    </Frame>
  );
}
