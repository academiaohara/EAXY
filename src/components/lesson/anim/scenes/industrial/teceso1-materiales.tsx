import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow, Box } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── De la materia prima al objeto ───────────── */

const CADENAS = [
  { y: 100, c: MANIM.orange, pasos: ["Árbol", "Aserrado", "Tablón", "Mesa"] },
  { y: 215, c: MANIM.blue, pasos: ["Mineral de hierro", "Alto horno", "Acero", "Clavo"] },
  { y: 330, c: MANIM.purple, pasos: ["Petróleo", "Refinado", "Plástico", "Botella"] },
];

export function buildMateriasPrimasProceso(): AnimBuild {
  const xs = [110, 300, 490, 680];
  return {
    label: "De la materia prima al objeto: madera, hierro y petróleo",
    beatMs: 5400,
    captions: [
      "Los objetos se fabrican con **materiales**, y estos se obtienen de **materias primas** que hay en la naturaleza.",
      "**Origen vegetal**: el árbol (materia prima) se **aserra** en tablones (material) con los que se fabrica una mesa.",
      "**Origen mineral**: el mineral de hierro se funde en el **alto horno** y se convierte en acero (material transformado) para fabricar objetos como clavos.",
      "**Origen fósil**: el petróleo se **refina** y se transforma en plásticos para fabricar botellas, tuberías o juguetes.",
      "La **materia prima** se extrae tal cual de la naturaleza; el **material** es lo que resulta de transformarla; el **objeto** es el producto final.",
    ],
    render: (beat) => (
      <Canvas>
        {CADENAS.map((ch, r) => (
          <g key={ch.y}>
            {ch.pasos.map((p, i) => (
              <g key={p}>
                <Box x={xs[i]!} y={ch.y} w={150} h={64} color={i === 0 ? MANIM.green : i === 3 ? MANIM.yellow : ch.c} label={p} size={17} active={beat === 0 || beat === 4 || beat === r + 1} />
                {i < 3 ? <Arrow x1={xs[i]! + 80} y1={ch.y} x2={xs[i + 1]! - 80} y2={ch.y} color={MANIM.muted} width={3} /> : null}
              </g>
            ))}
          </g>
        ))}
        <Fade show={beat === 4}>
          <Txt x={110} y={40} size={18} color={MANIM.green}>
            materia prima
          </Txt>
          <Txt x={300} y={40} size={18} color={MANIM.muted}>
            proceso
          </Txt>
          <Txt x={490} y={40} size={18} color={MANIM.blue}>
            material
          </Txt>
          <Txt x={680} y={40} size={18} color={MANIM.yellow}>
            objeto
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Contrachapado: capas con las fibras cruzadas ───────────── */

export function buildContrachapadoCapas(): AnimBuild {
  const fibras = (x: number, y: number, w: number, h: number, vertical: boolean, color: string) => {
    const n = 7;
    return Array.from({ length: n }, (_, i) =>
      vertical ? <line key={i} x1={x + ((i + 0.5) * w) / n} y1={y + 4} x2={x + ((i + 0.5) * w) / n} y2={y + h - 4} stroke={color} strokeWidth={2} /> : <line key={i} x1={x + 4} y1={y + ((i + 0.5) * h) / n} x2={x + w - 4} y2={y + ((i + 0.5) * h) / n} stroke={color} strokeWidth={2} />,
    );
  };
  return {
    label: "Contrachapado: láminas con las fibras cruzadas para que el tablero sea estable",
    beatMs: 5600,
    captions: [
      "En la **madera maciza** las fibras van todas en una dirección. Resiste mucho **a lo largo** de la veta, pero se **rompe con facilidad** si se golpea o se curva en el otro sentido.",
      "Para el **contrachapado** se desenrolla el tronco en **láminas muy finas**, como si fuera papel de cocina.",
      "Las láminas se apilan **cruzando las fibras**: una capa a lo largo, la siguiente a lo ancho, y así sucesivamente.",
      "Se encolan y se **prensan**. Cada capa frena a la vecina: el tablero se deforma poco y es resistente en todas las direcciones.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <rect x={220} y={130} width={360} height={150} fill={MANIM.orange} fillOpacity={0.25} stroke={MANIM.orange} strokeWidth={4} />
          {fibras(220, 130, 360, 150, false, MANIM.orange)}
          <path d="M 400 130 L 392 170 L 410 200 L 398 240 L 406 280" fill="none" stroke={MANIM.red} strokeWidth={4} />
          <Txt x={400} y={320} size={20} color={MANIM.red}>
            se parte con la veta
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <ellipse cx={240} cy={210} rx={54} ry={90} fill={MANIM.orange} fillOpacity={0.3} stroke={MANIM.orange} strokeWidth={4} />
          <path d="M 240 120 C 330 120 460 140 580 150 L 580 170 C 460 160 330 160 245 200" fill={MANIM.orange} fillOpacity={0.45} stroke={MANIM.orange} strokeWidth={3} />
          <Txt x={420} y={250} size={20} color={MANIM.orange}>
            lámina finísima
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          {[0, 1, 2, 3, 4].map((i) => {
            const y = 110 + i * (beat === 2 ? 52 : 28);
            const vertical = i % 2 === 1;
            return (
              <g key={i} className="anim-t">
                <rect x={220} y={y} width={360} height={beat === 2 ? 40 : 26} fill={vertical ? MANIM.green : MANIM.orange} fillOpacity={0.3} stroke={vertical ? MANIM.green : MANIM.orange} strokeWidth={3} />
                {fibras(220, y, 360, beat === 2 ? 40 : 26, vertical, vertical ? MANIM.green : MANIM.orange)}
              </g>
            );
          })}
        </Fade>
        <Fade show={beat === 3}>
          <Txt x={400} y={340} size={22} color={MANIM.yellow}>
            ↓ prensa y cola ↓
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Aleación: bronce = cobre + estaño ───────────── */

export function buildAleacionMezcla(): AnimBuild {
  const atomos = (x0: number, y0: number, cols: number, filas: number, color: (i: number, j: number) => string, r: (i: number, j: number) => number) =>
    Array.from({ length: cols * filas }, (_, k) => {
      const i = k % cols;
      const j = Math.floor(k / cols);
      return <circle key={k} cx={x0 + i * 30} cy={y0 + j * 30} r={r(i, j)} fill={color(i, j)} fillOpacity={0.75} stroke={color(i, j)} strokeWidth={2} />;
    });
  const esSn = (i: number, j: number) => (i * 3 + j * 5) % 7 === 0;
  return {
    label: "Aleación: el bronce mezcla átomos de cobre y de estaño",
    beatMs: 5600,
    captions: [
      "Un **metal puro** tiene todos sus átomos iguales. El cobre es muy maleable pero bastante blando.",
      "El **estaño** es otro metal puro, con átomos de distinto tamaño, y también blando.",
      "Si se **funden juntos** y se dejan solidificar se forma una **aleación**: el bronce, con átomos de estaño repartidos entre los de cobre.",
      "Los átomos distintos dificultan que las capas del metal se deslicen: el bronce es **más duro y resistente** que cualquiera de sus componentes. Una aleación **mejora las propiedades**.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0 || beat === 1}>
          <Txt x={200} y={60} size={22} color={MANIM.orange}>
            Cobre (Cu)
          </Txt>
          {atomos(110, 110, 7, 7, () => MANIM.orange, () => 13)}
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={600} y={60} size={22} color={MANIM.muted}>
            Estaño (Sn)
          </Txt>
          {atomos(510, 110, 7, 7, () => MANIM.muted, () => 9)}
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={240} y={60} size={22} color={MANIM.yellow}>
            Bronce (Cu + Sn)
          </Txt>
          {atomos(130, 110, 7, 7, (i, j) => (esSn(i, j) ? MANIM.muted : MANIM.orange), (i, j) => (esSn(i, j) ? 10 : 13))}
        </Fade>
        <Fade show={beat === 3}>
          {[
            { n: "Cobre", v: 3, c: MANIM.orange },
            { n: "Estaño", v: 2, c: MANIM.muted },
            { n: "Bronce", v: 7, c: MANIM.yellow },
          ].map((b, i) => (
            <g key={b.n}>
              <Txt x={510} y={150 + i * 60} size={18} color={b.c} anchor="end">
                {b.n}
              </Txt>
              <rect x={520} y={132 + i * 60} width={b.v * 30} height={26} fill={b.c} fillOpacity={0.6} />
            </g>
          ))}
          <Txt x={640} y={110} size={16} color={MANIM.muted}>
            dureza (orientativa)
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Ciclo de reciclaje de un material ───────────── */

export function buildCicloReciclaje(): AnimBuild {
  const cx = 400;
  const cy = 215;
  const rx = 270;
  const ry = 140;
  const nodos = [
    { t: "Uso del producto", c: MANIM.blue },
    { t: "Recogida selectiva", c: MANIM.green },
    { t: "Planta de reciclaje", c: MANIM.orange },
    { t: "Material reciclado", c: MANIM.purple },
    { t: "Nuevo producto", c: MANIM.yellow },
  ].map((n, i, a) => {
    const ang = -Math.PI / 2 + (i * 2 * Math.PI) / a.length;
    return { ...n, x: cx + rx * Math.cos(ang), y: cy + ry * Math.sin(ang) };
  });
  return {
    label: "Ciclo de reciclaje: del producto usado a un producto nuevo",
    beatMs: 5400,
    captions: [
      "Reciclar es **volver a usar** un material como materia prima para fabricar productos nuevos, en lugar de tirarlo.",
      "**1. Uso**: el consumidor usa el producto (una lata, una botella, una caja de cartón).",
      "**2. Recogida selectiva**: se deposita en el contenedor correcto, que separa el material del resto de residuos.",
      "**3. Planta de reciclaje**: se clasifica, se limpia y se tritura o se funde.",
      "**4. Material reciclado**: se obtiene un material casi como el original, que se vende a las fábricas.",
      "**5. Nuevo producto**: se fabrica un producto nuevo y vuelve a empezar el ciclo. Se ahorran materias primas, energía y residuos.",
    ],
    render: (beat) => (
      <Canvas>
        {nodos.map((n, i) => {
          const s = nodos[(i + 1) % nodos.length]!;
          const dx = s.x - n.x;
          const dy = s.y - n.y;
          const l = Math.hypot(dx, dy);
          return <Arrow key={`a${i}`} x1={n.x + (dx / l) * 74} y1={n.y + (dy / l) * 30} x2={s.x - (dx / l) * 74} y2={s.y - (dy / l) * 30} color={beat === i + 2 ? MANIM.yellow : MANIM.muted} width={3} />;
        })}
        {nodos.map((n, i) => (
          <Box key={n.t} x={n.x} y={n.y} w={150} h={54} color={n.c} label={n.t} size={16} active={beat === 0 || beat === i + 1} />
        ))}
        <Txt x={cx} y={cy + 6} size={34} color={MANIM.green}>
          ♻
        </Txt>
      </Canvas>
    ),
  };
}
