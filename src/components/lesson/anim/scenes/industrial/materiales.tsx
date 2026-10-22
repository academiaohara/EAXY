import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/** Pseudo-azar determinista: 0…1 estable para el mismo índice. */
const rnd = (i: number, salt = 0) => {
  const x = Math.sin(i * 127.1 + salt * 311.7) * 43758.5453;
  return x - Math.floor(x);
};

/* ───────────── Vidrio: red cristalina frente a red amorfa ───────────── */

function Tetra({ x, y, rot, color, scale = 1, dx = 0, dy = 0 }: { x: number; y: number; rot: number; color: string; scale?: number; dx?: number; dy?: number }) {
  const r = 19;
  const pts = [0, 120, 240].map((a) => `${(x + r * Math.sin((a * Math.PI) / 180)).toFixed(1)},${(y - r * Math.cos((a * Math.PI) / 180)).toFixed(1)}`).join(" ");
  return (
    <g
      className="anim-t"
      style={{ transform: `translate(${dx}px, ${dy}px) rotate(${rot}deg) scale(${scale})`, transformBox: "fill-box", transformOrigin: "center" }}
    >
      <polygon points={pts} fill={color} fillOpacity={0.35} stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
      <circle cx={x} cy={y} r={3.5} fill={MANIM.red} />
    </g>
  );
}

export function buildVidrioRed(): AnimBuild {
  const cols = 6;
  const rows = 4;
  const S = 50;
  const ox = 70;
  const oy = 120;
  const cells = Array.from({ length: cols * rows }, (_, i) => ({ c: i % cols, r: Math.floor(i / cols), i }));
  const rx = 470;
  return {
    label: "Estructura de la sílice cristalina, del vidrio y del vidrio modificado con óxido de sodio",
    beatMs: 4000,
    captions: [
      "Con enfriamiento **lento**, los tetraedros de sílice (Si–O) se ordenan: red **cristalina** regular.",
      "Con enfriamiento **rápido** no hay tiempo de ordenarse: los tetraedros quedan unidos pero desordenados. Es un **vidrio** (sólido amorfo).",
      "Se añade un óxido **modificador**, como $Na_2O$. Hay más oxígeno que silicio y la red empieza a romperse.",
      "Los iones $Na^+$ ocupan los **intersticios** y los puentes de oxígeno se rompen: quedan cadenas y anillos.",
      "Resultado: **menor viscosidad** y menor temperatura de fusión (de $1\\,720$ a $800$ °C con la composición eutéctica). Más fácil de trabajar y más barato.",
    ],
    render: (beat) => {
      const glass = beat >= 1;
      return (
        <Canvas>
          <Txt x={ox + (cols * S) / 2 - 10} y={52} size={22} color={glass ? MANIM.orange : MANIM.blue}>
            {glass ? "Vidrio de sílice (amorfo)" : "Sílice cristalina (ordenada)"}
          </Txt>
          {cells.map(({ c, r, i }) => (
            <Tetra
              key={i}
              x={ox + c * S}
              y={oy + r * S}
              rot={glass ? (rnd(i) - 0.5) * 150 : 0}
              dx={glass ? (rnd(i, 1) - 0.5) * 22 : 0}
              dy={glass ? (rnd(i, 2) - 0.5) * 22 : 0}
              color={glass ? MANIM.orange : MANIM.blue}
            />
          ))}
          <Fade show={beat >= 2} dx={30}>
            <Txt x={rx + 120} y={52} size={22} color={MANIM.green}>
              Vidrio modificado (Na₂O)
            </Txt>
            {cells.map(({ c, r, i }) => {
              const broken = (c + r) % 3 === 0;
              return (
                <Tetra
                  key={`m${i}`}
                  x={rx + c * S}
                  y={oy + r * S + (broken && beat >= 3 ? (r % 2 ? 8 : -8) : 0)}
                  rot={(rnd(i, 3) - 0.5) * 150}
                  dx={(rnd(i, 4) - 0.5) * 22 + (broken && beat >= 3 ? (c % 2 ? 10 : -10) : 0)}
                  dy={(rnd(i, 5) - 0.5) * 22}
                  color={MANIM.green}
                />
              );
            })}
          </Fade>
          <Fade show={beat >= 3} scale={0.3}>
            {cells
              .filter(({ c, r }) => (c + r) % 3 === 0 && c < cols - 1)
              .map(({ c, r, i }) => (
                <g key={`na${i}`}>
                  <circle cx={rx + c * S + S / 2} cy={oy + r * S + 4} r={9} fill={MANIM.yellow} />
                  <Txt x={rx + c * S + S / 2} y={oy + r * S + 9} size={11} color={MANIM.surface} weight={800}>
                    Na⁺
                  </Txt>
                  <line x1={rx + c * S + 10} y1={oy + r * S - 2} x2={rx + c * S + 24} y2={oy + r * S + 12} stroke={MANIM.red} strokeWidth={3} />
                </g>
              ))}
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={400} y={386} size={19} color={MANIM.yellow}>
              Viscosidad ↓ · T. fusión: 1 720 °C → 800 °C
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Conformado cerámico: prensado en seco y sinterizado ───────────── */

export function buildPrensadoSinterizado(): AnimBuild {
  const dieX = 270;
  const dieW = 260;
  const base = 350;
  const cols = 10;
  const rows = 6;
  const parts = Array.from({ length: cols * rows }, (_, i) => ({ c: i % cols, r: Math.floor(i / cols), i }));
  const spacing = (beat: number) => (beat === 0 ? 26 : 21);
  const rowStep = (beat: number) => (beat === 0 ? 27 : 17.5);
  const radius = (beat: number) => (beat >= 3 ? 12 : beat >= 2 ? 11 : 9.5);
  return {
    label: "Prensado en seco de un polvo cerámico y posterior sinterizado",
    beatMs: 3800,
    captions: [
      "El polvo cerámico, mezclado con un poco de agua o aglutinante, llena el **troquel**. Entre las partículas hay mucho aire.",
      "El **punzón** baja y comprime el polvo: las partículas se acercan y el pieza queda compacta, aún frágil.",
      "**Sinterización**: se calienta por debajo del punto de fusión. Las partículas se sueldan por **difusión atómica** y los poros se reducen.",
      "La pieza final es más densa y resistente, aunque conserva algo de porosidad (hasta un $25\\,\\%$ menos de densidad que el material base).",
    ],
    render: (beat) => {
      const sp = spacing(beat);
      const rs = rowStep(beat);
      const width = (cols - 1) * sp;
      const punchY = beat === 0 ? 60 : beat === 1 ? base - rows * rs - 56 : base - rows * rs - 56;
      return (
        <Canvas>
          <rect x={dieX - 16} y={base - 190} width={16} height={206} fill="#6a7688" />
          <rect x={dieX + dieW} y={base - 190} width={16} height={206} fill="#6a7688" />
          <rect x={dieX - 16} y={base} width={dieW + 32} height={16} fill="#6a7688" />
          <g className="anim-t" style={{ transform: `translateY(${punchY - 60}px)` }}>
            <rect x={dieX + 20} y={60} width={dieW - 40} height={46} fill={MANIM.blue} fillOpacity={0.8} />
            <rect x={dieX + dieW / 2 - 14} y={20} width={28} height={42} fill={MANIM.blue} fillOpacity={0.8} />
          </g>
          {parts.map(({ c, r, i }) => (
            <circle
              key={i}
              className="anim-t"
              cx={dieX + dieW / 2 - width / 2 + c * sp + (r % 2) * (sp / 2) - sp / 4 + (beat === 0 ? (rnd(i) - 0.5) * 8 : 0)}
              cy={base - 14 - r * rs + (beat === 0 ? (rnd(i, 1) - 0.5) * 6 : 0)}
              r={radius(beat)}
              fill={beat >= 2 ? MANIM.orange : MANIM.yellow}
              fillOpacity={0.9}
              stroke={MANIM.surface}
              strokeWidth={beat >= 3 ? 0.6 : 1.6}
            />
          ))}
          <Fade show={beat === 2}>
            <Txt x={dieX + dieW / 2} y={base + 46} size={22} color={MANIM.orange}>
              Horno: T &lt; T de fusión
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <line x1={dieX + dieW / 2} y1={110} x2={dieX + dieW / 2} y2={base - rows * rs - 62} stroke={MANIM.red} strokeWidth={4} />
            <Txt x={dieX + dieW + 40} y={190} size={20} color={MANIM.red} anchor="start">
              Presión
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={dieX + dieW / 2} y={base + 46} size={20} color={MANIM.green}>
              Pieza sinterizada: más densa, pocos poros
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Moldeo en barbotina ───────────── */

const VASE = "M 370 60 L 430 60 L 430 92 C 430 130 480 160 480 230 C 480 310 440 350 400 350 C 360 350 320 310 320 230 C 320 160 370 130 370 92 Z";

export function buildBarbotina(): AnimBuild {
  return {
    label: "Moldeo en barbotina por escurrido en un molde de yeso poroso",
    beatMs: 3800,
    captions: [
      "La **barbotina** es una mezcla estable de arcilla y agua. Se vierte en un **molde poroso** de yeso.",
      "El yeso **absorbe el agua**: en la pared del molde se forma una capa de material más o menos dura.",
      "Cuando la capa tiene el grosor deseado, el **exceso de barbotina** se desaloja de la cavidad (escurrido).",
      "Se deja secar, se desmolda y por último se **calienta** para conseguir las propiedades y la microestructura deseadas.",
    ],
    render: (beat) => (
      <Canvas>
        <defs>
          <clipPath id="barbotina-cavidad">
            <path d={VASE} />
          </clipPath>
        </defs>
        <g className="anim-t" style={{ opacity: beat >= 3 ? 0.25 : 1 }}>
          <rect x={250} y={40} width={300} height={330} rx={10} fill="#8a8f7a" fillOpacity={0.45} stroke={MANIM.muted} strokeWidth={2} />
          {Array.from({ length: 60 }, (_, i) => (
            <circle key={i} cx={262 + rnd(i) * 276} cy={52 + rnd(i, 1) * 306} r={2} fill={MANIM.muted} opacity={0.5} />
          ))}
          <path d={VASE} fill={MANIM.surface} />
          <Txt x={190} y={210} size={18} color={MANIM.muted} weight={500}>
            Molde
          </Txt>
          <Txt x={190} y={232} size={18} color={MANIM.muted} weight={500}>
            de yeso
          </Txt>
        </g>
        <g clipPath="url(#barbotina-cavidad)">
          <rect x={300} y={60} width={200} height={300} fill="#e8d27a" className="anim-t" style={{ opacity: beat >= 0 && beat < 2 ? 0.85 : 0 }} />
          <path d={VASE} fill="none" stroke="#c9a15a" strokeWidth={beat >= 1 && beat < 3 ? 36 : 0} className="anim-t" />
          <path d={VASE} fill="none" stroke="#c9a15a" strokeWidth={beat >= 3 ? 36 : 0} className="anim-t" style={{ opacity: beat >= 3 ? 1 : 0 }} />
        </g>
        <Fade show={beat >= 3}>
          <path d={VASE} fill="none" stroke={MANIM.orange} strokeWidth={4} />
        </Fade>
        <Fade show={beat === 0} dy={-16}>
          <path d="M 400 12 L 392 32 L 408 32 Z" fill="#e8d27a" />
          <Txt x={400} y={8} size={17} color="#e8d27a">
            barbotina
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          {[300, 330, 360].map((y, i) => (
            <g key={y}>
              <path d={`M ${272 + i * 4} ${y} q 6 -14 12 0 a 6 6 0 1 1 -12 0`} fill={MANIM.blue} opacity={0.9} />
            </g>
          ))}
          <Txt x={600} y={170} size={19} color={MANIM.blue} anchor="start">
            el yeso absorbe agua
          </Txt>
        </Fade>
        <Fade show={beat === 2} dy={30}>
          <path d="M 400 360 L 392 385 L 408 385 Z" fill="#e8d27a" />
          <Txt x={600} y={330} size={19} color="#e8d27a" anchor="start">
            exceso escurrido
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={640} y={210} size={20} color={MANIM.orange}>
            Pieza cocida
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Polimerización por adición (polietileno) ───────────── */

function Carbon({ x, y, color = "#7d8aa0" }: { x: number; y: number; color?: string }) {
  return (
    <g>
      <circle cx={x} cy={y} r={14} fill={color} />
      <Txt x={x} y={y + 6} size={17} color={MANIM.surface} weight={800}>
        C
      </Txt>
    </g>
  );
}

function Hydrogens({ x, y, color = MANIM.muted }: { x: number; y: number; color?: string }) {
  return (
    <g>
      {[-1, 1].map((s) => (
        <g key={s}>
          <line x1={x} y1={y} x2={x + s * 14} y2={y - 28} stroke={color} strokeWidth={2} />
          <line x1={x} y1={y} x2={x + s * 14} y2={y + 28} stroke={color} strokeWidth={2} />
          <circle cx={x + s * 14} cy={y - 34} r={7} fill={MANIM.ink} opacity={0.9} />
          <circle cx={x + s * 14} cy={y + 34} r={7} fill={MANIM.ink} opacity={0.9} />
        </g>
      ))}
    </g>
  );
}

/** Unidad CH2–CH2 con enlace doble (monómero) o simple (mero). */
function EthyleneUnit({ x, y, double, color }: { x: number; y: number; double: boolean; color: string }) {
  return (
    <g>
      <Hydrogens x={x} y={y} />
      <Hydrogens x={x + 46} y={y} />
      {double ? (
        <>
          <line x1={x + 12} y1={y - 4} x2={x + 34} y2={y - 4} stroke={MANIM.red} strokeWidth={3} />
          <line x1={x + 12} y1={y + 4} x2={x + 34} y2={y + 4} stroke={MANIM.red} strokeWidth={3} />
        </>
      ) : (
        <line x1={x + 12} y1={y} x2={x + 34} y2={y} stroke={color} strokeWidth={3} />
      )}
      <Carbon x={x} y={y} />
      <Carbon x={x + 46} y={y} />
    </g>
  );
}

export function buildPolimerizacionAdicion(): AnimBuild {
  const y = 190;
  const unit = 92;
  const x0 = 150;
  const unitsOnChain = (beat: number) => (beat <= 2 ? 1 : beat === 3 ? 3 : 5);
  return {
    label: "Polimerización por adición del etileno para dar polietileno",
    beatMs: 4000,
    captions: [
      "El **etileno** ($C_2H_4$) es el **monómero**: sus dos carbonos comparten un **doble enlace**, no saturado.",
      "Hace falta un **iniciador**, como el agua oxigenada $H_2O_2$, que se rompe en dos grupos $OH$.",
      "Un grupo $OH$ rompe el doble enlace, que pasa a simple, y se une a un extremo. Aparece el primer **mero** con un enlace libre.",
      "La reacción continúa sola: cada nuevo monómero abre su doble enlace y se suma a la cadena. Empieza lento y se acelera.",
      "Termina cuando dos cadenas se unen o un grupo $OH$ cierra el extremo. Resultado: **polietileno**, $-(CH_2-CH_2)_n-$, con miles de unidades.",
    ],
    render: (beat) => {
      const n = unitsOnChain(beat);
      return (
        <Canvas>
          <Fade show={beat <= 1}>
            <EthyleneUnit x={x0} y={y} double color={MANIM.ink} />
            <Txt x={x0 + 23} y={y + 90} size={19} color={MANIM.red}>
              C=C no saturado
            </Txt>
            <Txt x={x0 + 23} y={y - 80} size={22} color={MANIM.yellow}>
              Etileno (monómero)
            </Txt>
          </Fade>
          <Fade show={beat === 1} dx={40}>
            <g transform="translate(470 0)">
              <rect x={0} y={y - 30} width={180} height={60} rx={10} fill={MANIM.panel} stroke={MANIM.purple} strokeWidth={2} />
              <Txt x={90} y={y + 8} size={26} color={MANIM.purple}>
                H–O–O–H
              </Txt>
              <Txt x={90} y={y - 46} size={19} color={MANIM.purple}>
                Iniciador
              </Txt>
              <Txt x={90} y={y + 70} size={20} color={MANIM.muted} weight={500}>
                → 2 · •OH
              </Txt>
            </g>
          </Fade>
          <Fade show={beat >= 2}>
            <g>
              <g className="anim-t" style={{ opacity: beat >= 2 ? 1 : 0 }}>
                <circle cx={x0 - 40} cy={y} r={15} fill={MANIM.purple} />
                <Txt x={x0 - 40} y={y + 6} size={14} color={MANIM.surface} weight={800}>
                  OH
                </Txt>
                <line x1={x0 - 26} y1={y} x2={x0 - 14} y2={y} stroke={MANIM.purple} strokeWidth={3} />
              </g>
              {Array.from({ length: n }, (_, k) => (
                <g key={k} className="anim-t" style={{ opacity: 1 }}>
                  <EthyleneUnit x={x0 + k * unit} y={y} double={false} color={MANIM.green} />
                  {k > 0 ? <line x1={x0 + (k - 1) * unit + 58} y1={y} x2={x0 + k * unit - 12} y2={y} stroke={MANIM.green} strokeWidth={3} /> : null}
                </g>
              ))}
              {beat >= 4 ? (
                <g>
                  <line x1={x0 + (n - 1) * unit + 58} y1={y} x2={x0 + (n - 1) * unit + 76} y2={y} stroke={MANIM.purple} strokeWidth={3} />
                  <circle cx={x0 + (n - 1) * unit + 90} cy={y} r={15} fill={MANIM.purple} />
                  <Txt x={x0 + (n - 1) * unit + 90} y={y + 6} size={14} color={MANIM.surface} weight={800}>
                    OH
                  </Txt>
                </g>
              ) : (
                <circle cx={x0 + (n - 1) * unit + 66} cy={y} r={6} fill={MANIM.yellow} />
              )}
            </g>
          </Fade>
          <Fade show={beat === 3} dx={-40}>
            <g transform={`translate(${x0 + 3 * unit + 90} 0)`}>
              <EthyleneUnit x={0} y={y + 120} double color={MANIM.ink} />
              <Txt x={23} y={y + 186} size={17} color={MANIM.muted} weight={500}>
                nuevo monómero
              </Txt>
            </g>
          </Fade>
          <Fade show={beat >= 4}>
            <Txt x={400} y={376} size={24} color={MANIM.green}>
              Polietileno: –(CH₂–CH₂)ₙ–
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Polimerización por condensación (PET) ───────────── */

export function buildPolimerizacionCondensacion(): AnimBuild {
  const y = 200;
  return {
    label: "Polimerización por condensación del dimetil-ftalato y el etilenglicol para dar PET",
    beatMs: 4000,
    captions: [
      "Dos monómeros distintos: **dimetil-ftalato** (anillo con dos grupos éster $-CO-O-CH_3$) y **etilenglicol** ($HO-CH_2-CH_2-OH$).",
      "El grupo $OH$ del etilenglicol se combina con el grupo $CH_3$ del éster.",
      "Se desprende un **subproducto colateral**, alcohol metílico ($CH_3OH$), y los dos monómeros se unen en una molécula mayor.",
      "La cadena sigue creciendo en los dos extremos. Termina cuando ningún monómero alcanza ya el extremo. Resultado: **PET**.",
    ],
    render: (beat) => {
      const joined = beat >= 2;
      return (
        <Canvas>
          <Fade show={!joined}>
            <polygon points="130,170 160,152 190,170 190,206 160,224 130,206" fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={3} />
            <Txt x={160} y={y + 6} size={16} color={MANIM.blue} weight={500}>
              anillo
            </Txt>
            <Txt x={70} y={y - 36} size={19} color={MANIM.blue}>
              CH₃–O–CO
            </Txt>
            <Txt x={258} y={y - 36} size={19} color={MANIM.blue}>
              CO–O–CH₃
            </Txt>
            <Txt x={160} y={y - 90} size={19} color={MANIM.blue}>
              Dimetil-ftalato
            </Txt>
            <rect x={470} y={y - 22} width={200} height={44} rx={8} fill={MANIM.green} fillOpacity={0.25} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={570} y={y + 8} size={22} color={MANIM.green}>
              HO–CH₂–CH₂–OH
            </Txt>
            <Txt x={570} y={y - 52} size={19} color={MANIM.green}>
              Etilenglicol
            </Txt>
          </Fade>
          <Fade show={joined}>
            <Txt x={150} y={y + 8} size={22} color={MANIM.blue}>
              CH₃–O–CO
            </Txt>
            <polygon points="250,170 280,152 310,170 310,206 280,224 250,206" fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={3} />
            <Txt x={380} y={y + 8} size={22} color={MANIM.blue}>
              CO–O
            </Txt>
            <Txt x={500} y={y + 8} size={22} color={MANIM.green}>
              –CH₂–CH₂–OH
            </Txt>
            <Txt x={400} y={y - 70} size={19} color={MANIM.muted} weight={500}>
              molécula mayor (dímero)
            </Txt>
          </Fade>
          <Fade show={beat === 1}>
            <rect x={300} y={y - 56} width={100} height={42} rx={8} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
            <rect x={458} y={y - 30} width={44} height={60} rx={8} fill="none" stroke={MANIM.yellow} strokeWidth={3} strokeDasharray="8 6" />
            <Txt x={380} y={y + 76} size={18} color={MANIM.yellow}>
              OH + CH₃ se combinan
            </Txt>
          </Fade>
          <Fade show={beat >= 2} dy={-50}>
            <circle cx={430} cy={86} r={30} fill={MANIM.red} fillOpacity={0.85} />
            <Txt x={430} y={92} size={15} color={MANIM.surface} weight={800}>
              CH₃OH
            </Txt>
            <Txt x={430} y={40} size={17} color={MANIM.red}>
              subproducto (alcohol metílico)
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={400} y={320} size={22} color={MANIM.orange}>
              Polietilen-ftalato (PET): … ◯–éster–CH₂CH₂–éster–◯ …
            </Txt>
            <Txt x={400} y={356} size={18} color={MANIM.muted} weight={500}>
              Masa molecular: M = Σ (fᵢ·Mᵢ − M subproducto)
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Polímeros frente al calor ───────────── */

function Chain({ x, y, w, wave = 0, color, dx = 0, kink = 0 }: { x: number; y: number; w: number; wave?: number; color: string; dx?: number; kink?: number }) {
  const seg = 8;
  const pts = Array.from({ length: seg + 1 }, (_, i) => {
    const t = i / seg;
    const yy = y + Math.sin(t * Math.PI * 3) * wave + (kink ? Math.sin(t * Math.PI) * kink : 0);
    return `${(x + t * w).toFixed(1)} ${yy.toFixed(1)}`;
  });
  return (
    <path
      d={`M ${pts.join(" L ")}`}
      fill="none"
      stroke={color}
      strokeWidth={4}
      strokeLinecap="round"
      strokeLinejoin="round"
      className="anim-t"
      style={{ transform: `translateX(${dx}px)` }}
    />
  );
}

export function buildPolimerosCalor(): AnimBuild {
  const W = 200;
  const cols = [70, 300, 530];
  const rowsY = [150, 190, 230, 270];
  return {
    label: "Comportamiento de termoplásticos, termoestables y elastómeros frente al calor y al esfuerzo",
    beatMs: 3800,
    captions: [
      "Tres familias según su estructura: **cadenas lineales** sueltas (termoplástico), **red** de cadenas entrelazadas (termoestable) y cadenas **enrolladas** con pocos enlaces (elastómero).",
      "Al **calentar**, los enlaces débiles entre cadenas del termoplástico se relajan: las cadenas deslizan y el material se ablanda. El termoestable mantiene su red.",
      "Al **enfriar**, el termoplástico conserva la forma nueva y puede volver a calentarse y reprocesarse. El termoestable ya no puede conformarse de nuevo.",
      "El **elastómero** se estira de forma elástica: las cadenas enrolladas se desenrollan al aplicar una fuerza.",
      "Al soltar, las cadenas vuelven a enrollarse y recupera su forma y tamaño. Tras vulcanizar, tampoco se puede conformar de nuevo.",
    ],
    render: (beat) => {
      const hot = beat === 1;
      const stretched = beat === 3;
      const termo = hot ? MANIM.red : beat >= 2 ? MANIM.blue : MANIM.blue;
      const heatShift = (i: number) => (hot ? (i % 2 ? 26 : -22) : beat >= 2 ? (i % 2 ? 26 : -22) : 0);
      return (
        <Canvas>
          {["Termoplástico", "Termoestable", "Elastómero"].map((t, i) => (
            <Txt key={t} x={cols[i]! + W / 2} y={60} size={22} color={[MANIM.blue, MANIM.orange, MANIM.green][i]}>
              {t}
            </Txt>
          ))}
          <Txt x={cols[0]! + W / 2} y={86} size={16} color={MANIM.muted} weight={500}>
            cadenas lineales
          </Txt>
          <Txt x={cols[1]! + W / 2} y={86} size={16} color={MANIM.muted} weight={500}>
            red entrecruzada
          </Txt>
          <Txt x={cols[2]! + W / 2} y={86} size={16} color={MANIM.muted} weight={500}>
            cadenas enrolladas
          </Txt>
          {cols.map((x) => (
            <rect key={x} x={x - 14} y={112} width={W + 28} height={190} rx={8} fill="none" stroke={MANIM.grid} strokeWidth={2} />
          ))}
          {rowsY.map((yy, i) => (
            <Chain key={`a${i}`} x={cols[0]!} y={yy} w={W} wave={7} color={termo} dx={heatShift(i)} />
          ))}
          {rowsY.map((yy, i) => (
            <Chain key={`b${i}`} x={cols[1]!} y={yy} w={W} wave={7} color={hot ? MANIM.red : MANIM.orange} />
          ))}
          {[0.15, 0.4, 0.65, 0.9].flatMap((t, k) =>
            [0, 1, 2].map((r) => (
              <line key={`x${k}${r}`} x1={cols[1]! + t * W} y1={rowsY[r]!} x2={cols[1]! + t * W} y2={rowsY[r + 1]!} stroke={MANIM.yellow} strokeWidth={3} />
            )),
          )}
          <g className="anim-t" style={{ transform: `scale(${stretched ? 1.25 : 1}, ${stretched ? 0.92 : 1})`, transformOrigin: `${cols[2]!}px 207px` }}>
            {rowsY.map((yy, i) => (
              <Chain key={`c${i}`} x={cols[2]!} y={yy} w={W} wave={stretched ? 3 : 14} color={MANIM.green} />
            ))}
            {[0.35, 0.7].flatMap((t, k) =>
              [0, 1, 2].map((r) => (
                <circle key={`d${k}${r}`} cx={cols[2]! + t * W} cy={(rowsY[r]! + rowsY[r + 1]!) / 2} r={4.5} fill={MANIM.yellow} />
              )),
            )}
          </g>
          <Fade show={hot}>
            <Txt x={cols[0]! + W / 2} y={340} size={19} color={MANIM.red}>
              se ablanda
            </Txt>
            <Txt x={cols[1]! + W / 2} y={340} size={19} color={MANIM.muted}>
              sigue rígido
            </Txt>
          </Fade>
          <Fade show={beat === 2}>
            <Txt x={cols[0]! + W / 2} y={340} size={19} color={MANIM.blue}>
              ✓ reprocesable
            </Txt>
            <Txt x={cols[1]! + W / 2} y={340} size={19} color={MANIM.orange}>
              ✗ no reprocesable
            </Txt>
          </Fade>
          <Fade show={stretched || beat === 4}>
            <Txt x={cols[2]! + W / 2} y={340} size={19} color={MANIM.green}>
              {stretched ? "se estira (elástico)" : "recupera su forma"}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Extrusión de termoplásticos ───────────── */

export function buildExtrusionTornillo(): AnimBuild {
  const bx = 150;
  const by = 190;
  const bw = 400;
  const bh = 80;
  const pellets = Array.from({ length: 14 }, (_, i) => ({ i, x: 280 + (i % 7) * 11, y: 62 + Math.floor(i / 7) * 12 }));
  return {
    label: "Extrusión de un termoplástico con un husillo",
    beatMs: 3800,
    captions: [
      "Los **gránulos** del termoplástico entran por la tolva al cilindro, donde gira un **tornillo** (husillo).",
      "El tornillo los empuja hacia delante mientras las **resistencias calefactoras** del cilindro los calientan.",
      "El polímero se **funde** y el tornillo lo comprime y lo hace fluir hacia la boquilla.",
      "Al pasar por la **boquilla** se le da la forma: tubo, lámina, película o recubrimiento de cables. Después se enfría y mantiene la forma.",
    ],
    render: (beat) => (
      <Canvas>
        <polygon points={`250,40 350,40 330,${by} 270,${by}`} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2.5} />
        {pellets.map((p) => (
          <circle
            key={p.i}
            className="anim-t"
            cx={p.x}
            cy={p.y}
            r={4.5}
            fill="#e8d27a"
            style={{ transform: beat === 0 ? "translate(0,0)" : `translate(${(p.i % 7) * 10 + beat * 60 - 30}px, ${by - p.y + 18 + (p.i % 3) * 14}px)`, opacity: beat >= 3 ? 0 : 1 }}
          />
        ))}
        <rect x={bx} y={by} width={bw} height={bh} rx={6} fill={MANIM.surface} stroke={MANIM.muted} strokeWidth={3} />
        <rect x={bx + 2} y={by + 2} width={bw - 4} height={bh - 4} fill={beat >= 2 ? MANIM.orange : "#e8d27a"} fillOpacity={beat >= 2 ? 0.55 : 0.2} className="anim-t" />
        {Array.from({ length: 14 }, (_, i) => (
          <line key={i} x1={bx + 20 + i * 26} y1={by + 6} x2={bx + 36 + i * 26} y2={by + bh - 6} stroke={MANIM.blue} strokeWidth={6} strokeLinecap="round" opacity={0.85} />
        ))}
        {[0, 1, 2, 3].map((i) => (
          <Fade key={i} show={beat >= 1} delay={i * 120}>
            <rect x={bx + 70 + i * 80} y={by - 12} width={50} height={12} rx={3} fill={MANIM.red} fillOpacity={0.75} />
          </Fade>
        ))}
        <Fade show={beat >= 1}>
          <Txt x={bx + 340} y={by - 22} size={17} color={MANIM.red}>
            resistencias calefactoras
          </Txt>
        </Fade>
        <polygon points={`${bx + bw},${by} ${bx + bw + 50},${by + 22} ${bx + bw + 50},${by + bh - 22} ${bx + bw},${by + bh}`} fill={MANIM.panel} stroke={MANIM.muted} strokeWidth={2.5} />
        <g className="anim-t" style={{ opacity: beat >= 3 ? 1 : 0 }}>
          <rect x={bx + bw + 50} y={by + 30} width={170} height={20} fill={MANIM.orange} fillOpacity={0.9} />
          <rect x={bx + bw + 50} y={by + 30} width={170} height={20} fill="none" stroke={MANIM.orange} strokeWidth={3} />
        </g>
        <Fade show={beat >= 3}>
          <Txt x={bx + bw + 125} y={by + 78} size={17} color={MANIM.orange}>
            perfil / tubo
          </Txt>
        </Fade>
        <Txt x={300} y={30} size={17} color={MANIM.muted} weight={500}>
          Tolva
        </Txt>
        <Txt x={bx + 140} y={by + bh + 28} size={17} color={MANIM.blue} weight={500}>
          Husillo (tornillo)
        </Txt>
        <Txt x={bx + bw + 25} y={by - 10} size={16} color={MANIM.muted} weight={500}>
          Boquilla
        </Txt>
      </Canvas>
    ),
  };
}

/* ───────────── Depósito de seguridad: capas ───────────── */

export function buildDepositoSeguridad(): AnimBuild {
  const x0 = 120;
  const w = 560;
  const layers: { name: string; y: number; h: number; color: string; show: number }[] = [
    { name: "Terreno geológico estable, compactado", y: 330, h: 50, color: "#6a5a45", show: 0 },
    { name: "Arcilla 50 cm  (permeabilidad < 10⁻⁹ m/s)", y: 296, h: 34, color: "#b0805a", show: 1 },
    { name: "Capa filtrante 30 cm + red de drenaje", y: 266, h: 30, color: "#a7b3a2", show: 2 },
    { name: "Geomembrana de polietileno de alta densidad, 1,5–2 mm", y: 258, h: 8, color: MANIM.blue, show: 3 },
    { name: "Capa filtrante y red primaria de lixiviados", y: 232, h: 26, color: "#a7b3a2", show: 4 },
  ];
  return {
    label: "Capas de un depósito de seguridad para residuos tóxicos y peligrosos",
    beatMs: 3800,
    captions: [
      "Un **depósito de seguridad** se emplaza sobre terreno geológico estable. El fondo y las paredes se **compactan** para eliminar alteraciones.",
      "Sobre el fondo, un relleno de **50 cm de arcilla**: permeabilidad muy pequeña, inferior a $10^{-9}$ m/s.",
      "Encima, una capa **filtrante de 30 cm** donde se aloja la red de drenaje de pluviales y lixiviados, protegida por una membrana geotextil.",
      "La capa filtrante sirve de cama a la **membrana sintética** de polietileno de alta densidad (1,5 a 2 mm).",
      "Sobre ella, otra capa filtrante con la **red primaria de recogida de lixiviados**. Después se depositan los residuos.",
      "Hacen falta **balsas** de recogida y evaporación de escorrentías y lixiviados: poca profundidad y gran superficie favorecen la evaporación.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={0} y={0} width={800} height={420} fill="none" />
        <Fade show={beat >= 4} dy={-30}>
          <polygon points={`${x0 + 20},232 ${x0 + w - 20},232 ${x0 + w - 70},130 ${x0 + 70},130`} fill="#5b6470" fillOpacity={0.9} stroke={MANIM.muted} strokeWidth={2} />
          {Array.from({ length: 40 }, (_, i) => (
            <rect key={i} x={x0 + 100 + rnd(i) * (w - 200)} y={142 + rnd(i, 1) * 80} width={14} height={9} fill={[MANIM.orange, MANIM.red, MANIM.yellow, MANIM.purple][i % 4]} opacity={0.85} transform={`rotate(${rnd(i, 2) * 60 - 30} ${x0 + 100 + rnd(i) * (w - 200)} ${142 + rnd(i, 1) * 80})`} />
          ))}
          <Txt x={400} y={116} size={20} color={MANIM.red}>
            Residuos tóxicos y peligrosos
          </Txt>
        </Fade>
        {layers.map((l) => (
          <Fade key={l.name} show={beat >= l.show} dy={-14}>
            <rect x={x0} y={l.y} width={w} height={l.h} fill={l.color} fillOpacity={0.9} stroke={MANIM.surface} strokeWidth={1.5} />
            {l.name.includes("filtrante") ? (
              <g>
                {Array.from({ length: 14 }, (_, i) => (
                  <circle key={i} cx={x0 + 20 + i * 40} cy={l.y + l.h / 2} r={3.5} fill="#e7efe5" />
                ))}
              </g>
            ) : null}
          </Fade>
        ))}
        <g>
          {layers.map((l) => (
            <Fade key={`t${l.name}`} show={beat === l.show}>
              <Txt x={400} y={406} size={19} color={MANIM.yellow}>
                {l.name}
              </Txt>
            </Fade>
          ))}
        </g>
        <Fade show={beat >= 5}>
          {[40, 640].map((x) => (
            <g key={x}>
              <rect x={x} y={300} width={120} height={14} rx={4} fill={MANIM.blue} fillOpacity={0.5} stroke={MANIM.blue} strokeWidth={2} />
              <Txt x={x + 60} y={296} size={15} color={MANIM.blue} weight={500}>
                balsa
              </Txt>
            </g>
          ))}
          <path d={`M ${x0} 280 L 160 304`} stroke={MANIM.blue} strokeWidth={3} fill="none" />
          <path d={`M ${x0 + w} 280 L 640 304`} stroke={MANIM.blue} strokeWidth={3} fill="none" />
          <Txt x={400} y={392} size={19} color={MANIM.blue}>
            Lixiviados → balsas de recogida y evaporación
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
