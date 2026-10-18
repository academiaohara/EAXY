import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { numEs, numTex } from "@/components/lesson/anim/prop";

const X_LABEL = 20;
const X_FIRST = 250;
const X_END = 760;
const Y_TOP = 150;
const Y_BOT = 250;

type Params = { rel?: "directa" | "inversa"; a?: number; b?: number; nums?: number[]; titles?: string[] };

/**
 * Tabla de valores de dos magnitudes. Directa: al multiplicar la primera por m, la segunda
 * también (y el cociente se mantiene). Inversa: la segunda se divide entre m (y el producto
 * se mantiene). `a`, `b` = primera columna; `nums` = valores de la primera fila.
 */
export function buildTablaRazon(params: Params): AnimBuild {
  const rel = params.rel ?? "directa";
  const a = params.a ?? 1;
  const b = params.b ?? 5;
  const nums = params.nums?.length ? params.nums : [1, 2, 3, 4];
  const [tTop = "Magnitud A", tBot = "Magnitud B"] = params.titles ?? [];
  const first = nums[0]!;
  const ys = nums.map((x) => (rel === "directa" ? (b * x) / a : (a * b) / x));
  const n = nums.length;
  const colW = (X_END - X_FIRST) / n;
  const cx = (i: number) => X_FIRST + colW * i + colW / 2;
  const jump = nums[1]! / first;
  const jumpTxt = Number.isInteger(jump) ? String(jump) : numEs(jump);
  const k = rel === "directa" ? b / a : a * b;
  const last = n - 1;
  const lastJump = nums[last]! / first;

  const captions = [
    `Dos magnitudes en una tabla: **${tTop}** arriba y **${tBot}** abajo. Primera columna: $${numTex(first)}$ y $${numTex(ys[0]!)}$.`,
    rel === "directa"
      ? `Si **${tTop}** se multiplica por $${jumpTxt}$, **${tBot}** también se multiplica por $${jumpTxt}$.`
      : `Si **${tTop}** se multiplica por $${jumpTxt}$, **${tBot}** se **divide** entre $${jumpTxt}$.`,
    `Se completa el resto de la tabla aplicando esa misma regla en cada columna.`,
    rel === "directa"
      ? `Funciona con cualquier salto: de $${numTex(first)}$ a $${numTex(nums[last]!)}$ ambas se multiplican por $${numTex(lastJump)}$.`
      : `Funciona con cualquier salto: de $${numTex(first)}$ a $${numTex(nums[last]!)}$, una se multiplica por $${numTex(lastJump)}$ y la otra se divide entre $${numTex(lastJump)}$.`,
    rel === "directa"
      ? `Lo que no cambia es el **cociente**: $${tBot}\\,/\\,${tTop} = ${numTex(k)}$ en todas las columnas.`
      : `Lo que no cambia es el **producto**: $${numTex(first)} \\cdot ${numTex(ys[0]!)} = ${numTex(k)}$ en todas las columnas.`,
  ];

  const cell = (i: number, row: "top" | "bot", show: boolean) => (
    <Fade key={`${row}${i}`} show={show} dy={-8} delay={i * 80}>
      <rect
        x={cx(i) - colW / 2 + 4}
        y={(row === "top" ? Y_TOP : Y_BOT) - 38}
        width={colW - 8}
        height={64}
        rx={8}
        fill={row === "top" ? MANIM.blue : MANIM.green}
        fillOpacity={0.18}
        stroke={row === "top" ? MANIM.blue : MANIM.green}
        strokeWidth={2}
      />
      <Txt x={cx(i)} y={(row === "top" ? Y_TOP : Y_BOT) + 8} size={32} color={row === "top" ? MANIM.blue : MANIM.green}>
        {numEs(row === "top" ? nums[i]! : ys[i]!)}
      </Txt>
    </Fade>
  );

  const arrow = (i: number, j: number, y: number, up: boolean, label: string, color: string, show: boolean) => {
    const x1 = cx(i);
    const x2 = cx(j);
    const dy = up ? -58 : 58;
    return (
      <Fade show={show} dy={up ? 6 : -6}>
        <path d={`M ${x1} ${y + (up ? -40 : 28)} Q ${(x1 + x2) / 2} ${y + dy * 1.9} ${x2} ${y + (up ? -40 : 28)}`} fill="none" stroke={color} strokeWidth={3} strokeLinecap="round" />
        <Txt x={(x1 + x2) / 2} y={y + dy * 1.25 + (up ? -6 : 18)} size={28} color={color}>
          {label}
        </Txt>
      </Fade>
    );
  };

  const bot = rel === "directa" ? `× ${jumpTxt}` : `: ${jumpTxt}`;
  const botLast = rel === "directa" ? `× ${numEs(lastJump)}` : `: ${numEs(lastJump)}`;

  return {
    label: `Tabla de proporcionalidad ${rel} entre ${tTop} y ${tBot}`,
    captions,
    beatMs: 3800,
    render: (beat) => (
      <Canvas>
        <Fade show>
          <Txt x={X_LABEL} y={Y_TOP + 8} size={22} color={MANIM.blue} anchor="start">{tTop}</Txt>
          <Txt x={X_LABEL} y={Y_BOT + 8} size={22} color={MANIM.green} anchor="start">{tBot}</Txt>
        </Fade>
        {cell(0, "top", true)}
        {cell(0, "bot", true)}
        {nums.slice(1).map((_, i) => cell(i + 1, "top", beat >= (i === 0 ? 1 : 2)))}
        {nums.slice(1).map((_, i) => cell(i + 1, "bot", beat >= (i === 0 ? 1 : 2)))}
        {beat === 1 && (
          <>
            {arrow(0, 1, Y_TOP, true, `× ${jumpTxt}`, MANIM.yellow, true)}
            {arrow(0, 1, Y_BOT, false, bot, MANIM.orange, true)}
          </>
        )}
        {beat === 3 && n > 2 && (
          <>
            {arrow(0, last, Y_TOP, true, `× ${numEs(lastJump)}`, MANIM.yellow, true)}
            {arrow(0, last, Y_BOT, false, botLast, MANIM.orange, true)}
          </>
        )}
        <Fade show={beat >= 4} dy={10}>
          <Txt x={400} y={386} size={30} color={MANIM.yellow}>
            {rel === "directa" ? `cociente = ${numEs(k)}` : `producto = ${numEs(k)}`}
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
