import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Arrow } from "@/components/lesson/anim/scenes/industrial/termicos";

/* ───────────── De la pieza a los átomos ───────────── */

export function buildEscalaMaterialZoom(): AnimBuild {
  const granos = ["M 0 -60 L 50 -34 L 44 22 L -8 34 L -48 6 L -42 -40 Z", "M 50 -34 L 74 4 L 52 54 L 44 22 Z", "M -8 34 L 44 22 L 52 54 L 10 72 L -30 54 Z", "M -48 6 L -8 34 L -30 54 L -66 38 Z"];
  const cols = [MANIM.blue, MANIM.green, MANIM.purple, MANIM.orange];
  return {
    label: "Zoom: pieza, granos cristalinos y átomos ordenados",
    beatMs: 5600,
    captions: [
      "Una **pieza metálica** parece continua y uniforme a simple vista, pero eso es solo apariencia.",
      "Con un microscopio se ve que está formada por **granos**: pequeños cristales de entre $0{,}01$ y $0{,}1$ mm, cada uno con su orientación.",
      "Dentro de un grano, los **átomos** (≈ $0{,}3$ nm) se colocan en una **red ordenada**. Entre granos hay un borde irregular.",
      "El comportamiento de la pieza (resistencia, ductilidad) depende de esta estructura: **grano fino → más resistente**; **planos de átomos que deslizan → se deforma**.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={50} y={150} width={180} height={80} rx={6} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
        <Txt x={140} y={265} size={20} color={MANIM.blue}>
          Pieza (cm)
        </Txt>
        <Fade show={beat >= 1} dx={-12}>
          <Arrow x1={240} y1={190} x2={300} y2={190} color={MANIM.muted} width={3} />
          <Txt x={270} y={175} size={15} color={MANIM.muted}>
            × 1 000
          </Txt>
          <g transform="translate(400 190)">
            <circle r={96} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={2} />
            {granos.map((g, i) => (
              <path key={i} d={g} fill={cols[i]} fillOpacity={0.25} stroke={cols[i]} strokeWidth={2.5} transform="scale(1.1)" />
            ))}
          </g>
          <Txt x={400} y={320} size={20} color={MANIM.green}>
            Granos (0,01–0,1 mm)
          </Txt>
        </Fade>
        <Fade show={beat >= 2} dx={-12}>
          <Arrow x1={510} y1={190} x2={560} y2={190} color={MANIM.muted} width={3} />
          <Txt x={535} y={175} size={15} color={MANIM.muted}>
            × 100 000
          </Txt>
          <g transform="translate(670 190)">
            <circle r={96} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={2} />
            {Array.from({ length: 5 }, (_, j) =>
              Array.from({ length: 5 }, (_, i) => <circle key={`${i}-${j}`} cx={-60 + i * 30} cy={-60 + j * 30} r={9} fill={MANIM.orange} fillOpacity={0.6} stroke={MANIM.orange} strokeWidth={2} />),
            )}
          </g>
          <Txt x={670} y={320} size={20} color={MANIM.orange}>
            Átomos (≈ 0,3 nm)
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={400} y={60} size={22} color={MANIM.yellow}>
            Estructura interna → propiedades de la pieza
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Termoplástico frente a termoestable ───────────── */

export function buildPolimeroCadenas(): AnimBuild {
  const cadena = (x0: number, y0: number, amp: number, fase: number, color: string) => {
    const pts = Array.from({ length: 24 }, (_, i) => `${i ? "L" : "M"} ${x0 + i * 13} ${(y0 + amp * Math.sin(i * 0.9 + fase)).toFixed(1)}`).join(" ");
    return <path d={pts} fill="none" stroke={color} strokeWidth={4} strokeLinecap="round" className="anim-t" />;
  };
  return {
    label: "Termoplástico: cadenas independientes que deslizan al calentar. Termoestable: red con enlaces cruzados que no funde",
    beatMs: 5600,
    captions: [
      "En un **termoplástico** (polietileno, PVC) las cadenas largas están **enredadas** y unidas por fuerzas débiles. En un **termoestable** (epoxi, baquelita) hay **enlaces cruzados** que forman una red.",
      "Al **calentar**, las fuerzas débiles se vencen: las cadenas del termoplástico **deslizan**. Se reblandece y se puede moldear.",
      "El termoplástico se funde, se moldea y se **recicla** por fusión. El termoestable **no funde**: sus enlaces cruzados mantienen la red hasta que se **descompone**.",
    ],
    render: (beat) => {
      const caliente = beat >= 1;
      const amp = caliente ? 20 : 8;
      return (
        <Canvas>
          <Txt x={200} y={42} size={22} color={MANIM.green}>
            Termoplástico
          </Txt>
          <Txt x={600} y={42} size={22} color={MANIM.red}>
            Termoestable
          </Txt>
          {[0, 1, 2, 3, 4].map((j) => cadena(60, 100 + j * 52 + (caliente ? (j % 2 ? 8 : -8) : 0), amp, j * 1.7, caliente ? MANIM.orange : MANIM.green))}
          {[0, 1, 2, 3, 4].map((j) => cadena(460, 100 + j * 52, 8, j * 1.7, MANIM.red))}
          {[0, 1, 2, 3, 4, 5, 6].map((i) => (
            <line key={i} x1={500 + i * 40} y1={100 + (i % 4) * 52} x2={500 + i * 40} y2={152 + (i % 4) * 52} stroke={MANIM.yellow} strokeWidth={4} />
          ))}
          <Fade show={caliente}>
            <Arrow x1={400} y1={370} x2={400} y2={340} color={MANIM.orange} width={5} />
            <Txt x={400} y={395} size={18} color={MANIM.orange}>
              calor
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Txt x={200} y={375} size={19} color={MANIM.green}>
              Se funde: reciclable
            </Txt>
            <Txt x={600} y={375} size={19} color={MANIM.red}>
              No funde: se descompone
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Procesos de conformado ───────────── */

export function buildConformadoProcesos(): AnimBuild {
  return {
    label: "Fundición, forja, laminación y extrusión: cómo se da forma al metal",
    beatMs: 5600,
    captions: [
      "**Fundición**: el metal líquido se vierte en un **molde** con la forma de la pieza y solidifica. Permite geometrías complejas, con acabado y precisión medios.",
      "**Forja**: el metal caliente se deforma a golpes o presión entre matrices. Mantiene la fibra del material y da piezas muy **resistentes**.",
      "**Laminación**: el metal pasa entre **rodillos** que reducen su espesor. Es el proceso base de chapas, perfiles y barras.",
      "**Extrusión**: un émbolo empuja el material por una **matriz** con la forma del perfil. Produce perfiles de sección constante, como los de aluminio.",
    ],
    render: (beat) => (
      <Canvas>
        <Txt x={400} y={45} size={24} color={MANIM.yellow}>
          {["Fundición", "Forja", "Laminación", "Extrusión"][beat]}
        </Txt>
        <Fade show={beat === 0}>
          <path d="M 220 140 L 580 140 L 580 330 L 220 330 Z" fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <path d="M 300 160 L 500 160 L 520 300 L 280 300 Z" fill={MANIM.orange} fillOpacity={0.85} />
          <Arrow x1={400} y1={90} x2={400} y2={150} color={MANIM.orange} width={6} />
          <Txt x={400} y={360} size={18} color={MANIM.muted}>
            metal líquido en el molde
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <rect x={270} y={300} width={260} height={50} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={290} y={250} width={220} height={50} fill={MANIM.orange} fillOpacity={0.85} />
          <rect x={300} y={150} width={200} height={70} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={3} />
          <Arrow x1={400} y1={110} x2={400} y2={148} color={MANIM.red} width={6} />
          <Txt x={400} y={385} size={18} color={MANIM.muted}>
            la pieza se aplasta y se ensancha
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <circle cx={400} cy={160} r={50} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
          <circle cx={400} cy={290} r={50} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={4} />
          <rect x={130} y={205} width={190} height={40} fill={MANIM.orange} fillOpacity={0.85} />
          <rect x={480} y={218} width={190} height={14} fill={MANIM.orange} fillOpacity={0.85} />
          <Arrow x1={190} y1={300} x2={300} y2={300} color={MANIM.red} width={5} />
          <Txt x={400} y={380} size={18} color={MANIM.muted}>
            el espesor baja al pasar entre los rodillos
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <rect x={150} y={160} width={200} height={130} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={170} y={195} width={160} height={60} fill={MANIM.orange} fillOpacity={0.85} />
          <rect x={110} y={175} width={40} height={100} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={3} />
          <rect x={350} y={220} width={300} height={10} fill={MANIM.orange} fillOpacity={0.85} />
          <Arrow x1={60} y1={225} x2={108} y2={225} color={MANIM.red} width={6} />
          <Txt x={400} y={340} size={18} color={MANIM.muted}>
            el material sale con la forma de la matriz
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
