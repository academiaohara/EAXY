import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";
import { Axes, DrawPath } from "@/components/lesson/anim/scenes/industrial/common";

const f1 = (v: number, d = 1) => v.toFixed(d).replace(".", ",");
const rad = (deg: number) => (deg * Math.PI) / 180;

function Arrow({ x1, y1, x2, y2, color, width = 4, head = 12 }: { x1: number; y1: number; x2: number; y2: number; color: string; width?: number; head?: number }) {
  const a = Math.atan2(y2 - y1, x2 - x1);
  const hx = x2 - Math.cos(a) * head;
  const hy = y2 - Math.sin(a) * head;
  const w = head * 0.55;
  return (
    <g>
      <line x1={x1} y1={y1} x2={hx} y2={hy} stroke={color} strokeWidth={width} strokeLinecap="round" />
      <polygon points={`${x2},${y2} ${hx - Math.sin(a) * w},${hy + Math.cos(a) * w} ${hx + Math.sin(a) * w},${hy - Math.cos(a) * w}`} fill={color} />
    </g>
  );
}

/* ───────────── Deformación elástica y plástica ───────────── */

export function buildElasticoPlastico(): AnimBuild {
  const cols = 5;
  const rows = 4;
  const S = 54;
  const ox = 130;
  const oy = 330;
  const offsets = [
    [0, 0, 0, 0],
    [0, 6, 12, 18],
    [0, 0, 0, 0],
    [0, 6, 12 + S, 18 + S],
    [0, 0, S, S],
  ];
  const labels = ["Sin carga", "Carga pequeña", "Se suelta: vuelve a su sitio", "Carga grande: los planos deslizan", "Se suelta: queda deformado"];
  // σ–ε en miniatura: recta elástica hasta el límite y curva plástica.
  const O: [number, number] = [570, 330];
  const marker: [number, number][] = [O, [595, 280], O, [690, 185], [762, 330]];
  return {
    label: "Deformación elástica (los átomos vuelven) y plástica (los planos deslizan)",
    beatMs: 4800,
    captions: [
      "Un metal en reposo: átomos ordenados en planos. Vamos a **tirar** de la fila superior mientras la inferior está sujeta.",
      "Con una carga pequeña los átomos se desplazan **ligeramente** de sus posiciones, pero sin cambiar de vecinos. Los enlaces se estiran.",
      "Al retirar la carga todo vuelve a su sitio: es una **deformación elástica**, que desaparece al cesar la fuerza.",
      "Con una carga mayor que el **límite elástico**, un plano de átomos desliza sobre otro hasta ocupar la posición siguiente de la red.",
      "Al soltar, solo se recupera la parte elástica. Queda una **deformación plástica** (permanente): los átomos tienen otros vecinos.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={ox - 40} y={oy + 24} width={cols * S + 80} height={16} fill={MANIM.muted} fillOpacity={0.35} />
        <Txt x={ox + ((cols - 1) * S) / 2} y={oy + 62} size={17} color={MANIM.muted}>
          base sujeta
        </Txt>
        {Array.from({ length: rows }, (_, r) =>
          Array.from({ length: cols }, (_, c) => (
            <circle
              key={`${r}-${c}`}
              className="anim-t"
              cx={0}
              cy={0}
              r={16}
              fill={r >= 2 && beat >= 3 ? MANIM.orange : MANIM.blue}
              fillOpacity={0.88}
              style={{ transform: `translate(${ox + c * S + offsets[beat]![r]!}px, ${oy - r * S}px)` }}
            />
          )),
        )}
        <Fade show={beat === 1 || beat === 3}>
          <Arrow x1={ox + cols * S - 10 + offsets[beat]![3]!} y1={oy - 3 * S} x2={ox + cols * S + 70 + offsets[beat]![3]!} y2={oy - 3 * S} color={MANIM.red} />
          <Txt x={ox + cols * S + 38 + offsets[beat]![3]!} y={oy - 3 * S - 16} size={20} color={MANIM.red}>
            F
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <line x1={ox - 24} y1={oy - S / 2} x2={ox + cols * S + 10} y2={oy - S / 2} stroke={MANIM.yellow} strokeWidth={2.5} strokeDasharray="7 6" />
          <Txt x={ox - 30} y={oy - S / 2 - 2} size={15} color={MANIM.yellow} anchor="end">
            plano de
          </Txt>
          <Txt x={ox - 30} y={oy - S / 2 + 16} size={15} color={MANIM.yellow} anchor="end">
            deslizamiento
          </Txt>
        </Fade>
        <Txt x={ox + ((cols - 1) * S) / 2 + 20} y={52} size={23} color={beat >= 3 ? MANIM.orange : MANIM.green}>
          {labels[beat]}
        </Txt>
        {/* Curva σ–ε */}
        <Axes x0={O[0]} y0={O[1]} x1={780} y1={110} xLabel="ε" yLabel="σ" />
        <path d="M 570 330 L 620 230 Q 650 185 690 185" fill="none" stroke={MANIM.muted} strokeWidth={3} />
        <circle cx={620} cy={230} r={5} fill={MANIM.yellow} />
        <Txt x={640} y={246} size={15} color={MANIM.yellow} anchor="start">
          límite elástico
        </Txt>
        <Fade show={beat === 4}>
          <line x1={690} y1={185} x2={762} y2={330} stroke={MANIM.orange} strokeWidth={2.5} strokeDasharray="6 5" />
          <line x1={O[0]} y1={344} x2={762} y2={344} stroke={MANIM.orange} strokeWidth={4} />
          <Txt x={668} y={366} size={15} color={MANIM.orange}>
            deformación permanente
          </Txt>
        </Fade>
        <circle className="anim-t" cx={0} cy={0} r={7} fill={beat >= 3 ? MANIM.orange : MANIM.green} style={{ transform: `translate(${marker[beat]![0]}px, ${marker[beat]![1]}px)` }} />
      </Canvas>
    ),
  };
}

/* ───────────── Varilla sometida a tracción ───────────── */

export function buildVarillaTraccion(): AnimBuild {
  const F = 30_000;
  const A0 = 150;
  const l0 = 100;
  const dl = 0.1;
  const sigma = F / A0;
  const bx = 190;
  const by = 175;
  const BH = 56;
  const L = 330;
  const D = 34;
  return {
    label: "Varilla en tracción: tensión σ = F/A₀ y deformación ε = Δl/l₀",
    beatMs: 4800,
    captions: [
      "Una probeta cilíndrica de acero tiene una sección inicial $A_0 = 150$ mm² y una longitud de medida $l_0 = 100$ mm (UNE 7010).",
      `Se tira de ella con una fuerza **uniaxial** $F = 30\\,000$ N. La **tensión** es la fuerza por unidad de sección: $\\sigma = F/A_0 = ${f1(sigma, 0)}$ N/mm² $= ${f1(sigma, 0)}$ MPa.`,
      `La varilla se **alarga**: pasa de $l_0 = 100$ mm a $l = ${f1(l0 + dl, 1)}$ mm, un alargamiento $\\Delta l = ${f1(dl, 1)}$ mm (el dibujo lo exagera para que se vea).`,
      `La **deformación** es el alargamiento por unidad de longitud inicial: $\\varepsilon = \\Delta l/l_0 = ${f1(dl, 1)}/100 = 0{,}001$. No tiene unidades; en porcentaje, un $0{,}1\\,\\%$.`,
    ],
    render: (beat) => {
      const dx = beat >= 2 ? D : 0;
      return (
        <Canvas>
          <rect x={bx - 36} y={by - 22} width={36} height={BH + 44} rx={5} fill={MANIM.muted} fillOpacity={0.4} />
          <g className="anim-t" style={{ transform: `translate(${dx}px, 0px)` }}>
            <rect x={bx + L} y={by - 22} width={36} height={BH + 44} rx={5} fill={MANIM.muted} fillOpacity={0.4} />
          </g>
          <rect className="anim-t" x={bx} y={by} width={L + dx} height={BH} fill={MANIM.blue} fillOpacity={0.3} stroke={MANIM.blue} strokeWidth={3} style={{ transition: "width 0.7s ease" }} />
          {/* marcas de la longitud de medida */}
          <line x1={bx + 40} y1={by - 14} x2={bx + 40} y2={by + BH + 14} stroke={MANIM.yellow} strokeWidth={2.5} />
          <g className="anim-t" style={{ transform: `translate(${dx}px, 0px)` }}>
            <line x1={bx + L - 40} y1={by - 14} x2={bx + L - 40} y2={by + BH + 14} stroke={MANIM.yellow} strokeWidth={2.5} />
          </g>
          <line x1={bx + 40} y1={by - 34} x2={bx + L - 40 + dx} y2={by - 34} stroke={MANIM.yellow} strokeWidth={2} className="anim-t" />
          <Txt x={bx + L / 2 + dx / 2} y={by - 44} size={20} color={MANIM.yellow}>
            {beat >= 2 ? `l = ${f1(l0 + dl, 1)} mm` : "l₀ = 100 mm"}
          </Txt>
          <Fade show={beat >= 1}>
            <Arrow x1={bx - 40} y1={by + BH / 2} x2={bx - 120} y2={by + BH / 2} color={MANIM.red} width={5} head={16} />
            <Move2 dx={dx}>
              <Arrow x1={bx + L + 40} y1={by + BH / 2} x2={bx + L + 120} y2={by + BH / 2} color={MANIM.red} width={5} head={16} />
              <Txt x={bx + L + 82} y={by + BH / 2 - 20} size={22} color={MANIM.red}>
                F
              </Txt>
            </Move2>
            <Txt x={bx - 82} y={by + BH / 2 - 20} size={22} color={MANIM.red}>
              F
            </Txt>
          </Fade>
          {/* sección */}
          <circle cx={90} cy={82} r={30} fill={MANIM.green} fillOpacity={0.3} stroke={MANIM.green} strokeWidth={3} />
          <Txt x={140} y={80} size={20} color={MANIM.green} anchor="start">
            A₀ = 150 mm²
          </Txt>
          <Txt x={140} y={104} size={15} color={MANIM.muted} anchor="start">
            (Ø 13,8 mm)
          </Txt>
          <Fade show={beat >= 1}>
            <Txt x={400} y={320} size={26} color={MANIM.yellow}>
              σ = F / A₀ = 30 000 / 150 = {f1(sigma, 0)} MPa
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={400} y={364} size={26} color={MANIM.green}>
              ε = Δl / l₀ = 0,001 = 0,1 %
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

function Move2({ dx, children }: { dx: number; children: ReactNode }) {
  return (
    <g className="anim-t" style={{ transform: `translate(${dx}px, 0px)` }}>
      {children}
    </g>
  );
}

/* ───────────── Diagrama de tracción con sus zonas ───────────── */

export function buildDiagramaTraccion(): AnimBuild {
  const X0 = 110;
  const Y0 = 360;
  const P: [number, number] = [170, 230];
  const E: [number, number] = [192, 190];
  const Fp: [number, number] = [206, 178];
  const Rp: [number, number] = [470, 68];
  const Sp: [number, number] = [552, 110];
  const seg = {
    op: `M ${X0} ${Y0} L ${P[0]} ${P[1]}`,
    pe: `M ${P[0]} ${P[1]} Q 183 208 ${E[0]} ${E[1]}`,
    ef: `M ${E[0]} ${E[1]} L ${Fp[0]} ${Fp[1]} L 216 172 L 226 183 L 236 173 L 246 183 L 256 176 L 264 180`,
    fr: `M 264 180 C 320 150, 400 70, ${Rp[0]} ${Rp[1]}`,
    rs: `M ${Rp[0]} ${Rp[1]} Q 520 70 ${Sp[0]} ${Sp[1]}`,
  };
  const dot = (p: [number, number], name: string, color: string, dx = 10, dy = -12, anchor: "start" | "end" = "start") => (
    <g>
      <circle cx={p[0]} cy={p[1]} r={6} fill={color} />
      <Txt x={p[0] + dx} y={p[1] + dy} size={20} color={color} anchor={anchor}>
        {name}
      </Txt>
    </g>
  );
  const guide = (p: [number, number], name: string, color: string) => (
    <g>
      <line x1={X0} y1={p[1]} x2={p[0]} y2={p[1]} stroke={color} strokeWidth={1.5} strokeDasharray="4 5" />
      <Txt x={X0 - 8} y={p[1] + 6} size={16} color={color} anchor="end">
        {name}
      </Txt>
    </g>
  );
  return {
    label: "Diagrama de tracción de un acero: proporcionalidad, límite elástico, fluencia, rotura",
    beatMs: 5200,
    captions: [
      "El ensayo registra la tensión $\\sigma = F/A_0$ frente a la deformación $\\varepsilon = \\Delta l/l_0$. Al principio es una **recta** (OP): la deformación es proporcional a la tensión. Es la **zona de proporcionalidad**.",
      "Más allá de $P$ sigue siendo elástica (al soltar se recupera la longitud), pero ya no es lineal: tramo **PE**. El punto $E$ es el **límite elástico** $\\sigma_E$. Todo el tramo OE es la **zona elástica**.",
      "Algunos aceros presentan la **fluencia**: en $F$ se alarga mucho sin que suba la tensión. $\\sigma_F$ es la **tensión de fluencia** y se localiza fácilmente (P y E son difíciles de ver).",
      "Pasado $E$ la deformación es **permanente** (zona plástica). La tensión vuelve a crecer hasta el máximo, $R$: es la **tensión de rotura** $\\sigma_R$.",
      "Después de $R$ el material sigue alargándose aunque la tensión baje, formando un **cuello**, hasta la rotura física en $S$.",
    ],
    render: (beat) => (
      <Canvas>
        <Axes x0={X0} y0={Y0} x1={770} y1={30} xLabel="deformación ε" yLabel="tensión σ" />
        <rect className="anim-t" x={X0} y={30} width={E[0] - X0} height={Y0 - 30} fill={MANIM.blue} fillOpacity={beat >= 1 ? 0.12 : 0} />
        <rect className="anim-t" x={E[0]} y={30} width={Sp[0] - E[0]} height={Y0 - 30} fill={MANIM.orange} fillOpacity={beat >= 3 ? 0.08 : 0} />
        <DrawPath show d={seg.op} color={MANIM.blue} width={5} />
        <DrawPath show={beat >= 1} d={seg.pe} color={MANIM.green} width={5} />
        <DrawPath show={beat >= 2} d={seg.ef} color={MANIM.yellow} width={5} />
        <DrawPath show={beat >= 3} d={seg.fr} color={MANIM.orange} width={5} />
        <DrawPath show={beat >= 4} d={seg.rs} color={MANIM.red} width={5} />
        <Fade show>
          <circle cx={X0} cy={Y0} r={5} fill={MANIM.ink} />
          <Txt x={X0 - 16} y={Y0 + 24} size={18} color={MANIM.ink}>
            O
          </Txt>
        </Fade>
        <Fade show>{dot(P, "P", MANIM.blue, -12, -6, "end")}</Fade>
        <Fade show={beat >= 1}>
          {dot(E, "E", MANIM.green, -12, -6, "end")}
          {guide(P, "σP", MANIM.blue)}
          {guide(E, "σE", MANIM.green)}
        </Fade>
        <Fade show={beat >= 2}>
          {dot(Fp, "F", MANIM.yellow, 8, -16)}
          {guide(Fp, "σF", MANIM.yellow)}
        </Fade>
        <Fade show={beat >= 3}>
          {dot(Rp, "R", MANIM.orange, 0, -18)}
          {guide(Rp, "σR", MANIM.orange)}
        </Fade>
        <Fade show={beat >= 4}>{dot(Sp, "S", MANIM.red, 14, 8)}</Fade>
        <Fade show={beat === 0}>
          <Txt x={235} y={310} size={18} color={MANIM.blue} anchor="start">
            OP: recta, σ = cte·ε
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Txt x={X0 + (E[0] - X0) / 2} y={Y0 + 54} size={17} color={MANIM.green}>
            zona elástica
          </Txt>
          <Txt x={235} y={290} size={18} color={MANIM.green} anchor="start">
            PE: elástica, no lineal
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={300} y={142} size={18} color={MANIM.yellow} anchor="start">
            fluencia: se alarga sin subir σ
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={(E[0] + Sp[0]) / 2} y={Y0 + 54} size={17} color={MANIM.orange}>
            zona plástica (deformación permanente)
          </Txt>
        </Fade>
        <Fade show={beat === 4}>
          <Txt x={Sp[0] + 20} y={Sp[1] + 44} size={17} color={MANIM.red} anchor="start">
            rotura física
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Ensayo Brinell ───────────── */

export function buildBrinellHuella(): AnimBuild {
  const R = 90;
  const D = 5;
  const dMm = 2.3;
  const F = 500;
  const f = (D - Math.sqrt(D * D - dMm * dMm)) / 2;
  const S = Math.PI * D * f;
  const HB = F / S;
  const cx = 300;
  const ys = 270;
  const dPx = (dMm / D) * (2 * R);
  const fPx = (f / D) * (2 * R);
  const ballY = (beat: number) => (beat === 0 ? ys - R - 36 : beat === 1 ? ys - R + fPx : ys - R - 60);
  return {
    label: "Ensayo de dureza Brinell: bola de acero, huella de diámetro d y profundidad f",
    beatMs: 5200,
    captions: [
      "Una **bola de acero templado** de diámetro $D$ se comprime contra el material con una carga $F$ durante un tiempo determinado.",
      "La bola penetra y deja un **casquete esférico** en el material. Cuanto más blando el material, más profunda es la huella.",
      `Al retirar la bola se mide el **diámetro de la huella**, $d$. Con $D$ y $d$ se calcula la profundidad $f = \\dfrac{D - \\sqrt{D^2 - d^2}}{2}$ (con $D = 5$ mm y $d = 2{,}3$ mm: $f = ${f1(f, 2)}$ mm).`,
      `La dureza es la carga entre la superficie del casquete: $HB = F/S$, con $S = \\pi D f = ${f1(S, 2)}$ mm². Con $F = 500$ kp: $HB = ${f1(HB, 0)}$.`,
    ],
    render: (beat) => {
      const by = ballY(beat);
      const x1 = cx - dPx / 2;
      const x2 = cx + dPx / 2;
      return (
        <Canvas>
          <rect x={90} y={ys} width={430} height={110} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.muted} strokeWidth={2} />
          <Fade show={beat >= 2}>
            <path d={`M ${x1} ${ys} A ${R} ${R} 0 0 0 ${x2} ${ys} Z`} fill={MANIM.surface} stroke={MANIM.orange} strokeWidth={3} />
          </Fade>
          <g className="anim-t" style={{ transform: `translate(${cx}px, ${by}px)` }}>
            <circle cx={0} cy={0} r={R} fill={MANIM.blue} fillOpacity={0.85} stroke={MANIM.blue} strokeWidth={2} />
            <Txt x={0} y={8} size={22} color={MANIM.surface} weight={800}>
              D
            </Txt>
          </g>
          <g className="anim-t" style={{ transform: `translate(0px, ${beat >= 2 ? -60 : 0}px)` }}>
            <Fade show={beat <= 1}>
              <Arrow x1={cx} y1={by - R - 40} x2={cx} y2={by - R - 4} color={MANIM.red} width={5} head={14} />
              <Txt x={cx + 22} y={by - R - 16} size={22} color={MANIM.red} anchor="start">
                F
              </Txt>
            </Fade>
          </g>
          <Fade show={beat >= 2}>
            <line x1={x1} y1={ys - 12} x2={x2} y2={ys - 12} stroke={MANIM.yellow} strokeWidth={2.5} />
            <line x1={x1} y1={ys - 20} x2={x1} y2={ys - 4} stroke={MANIM.yellow} strokeWidth={2.5} />
            <line x1={x2} y1={ys - 20} x2={x2} y2={ys - 4} stroke={MANIM.yellow} strokeWidth={2.5} />
            <Txt x={cx} y={ys - 24} size={22} color={MANIM.yellow}>
              d
            </Txt>
            <line x1={x2 + 26} y1={ys} x2={x2 + 26} y2={ys + fPx} stroke={MANIM.green} strokeWidth={3} />
            <Txt x={x2 + 38} y={ys + fPx + 4} size={22} color={MANIM.green} anchor="start">
              f
            </Txt>
          </Fade>
          <Fade show={beat >= 1}>
            <Txt x={cx} y={ys + 138} size={20} color={MANIM.muted}>
              material ensayado
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={560} y={110} size={22} color={MANIM.green} anchor="start">
              S = π · D · f
            </Txt>
            <Txt x={560} y={150} size={22} color={MANIM.yellow} anchor="start">
              HB = F / S
            </Txt>
            <Txt x={560} y={196} size={18} color={MANIM.muted} anchor="start">
              F = 500 kp
            </Txt>
            <Txt x={560} y={220} size={18} color={MANIM.muted} anchor="start">
              D = 5 mm · d = 2,3 mm
            </Txt>
            <Txt x={560} y={262} size={26} color={MANIM.orange} anchor="start">
              HB ≈ {f1(HB, 0)}
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Ensayo Rockwell ───────────── */

export function buildRockwellProfundidad(): AnimBuild {
  const ys = 250;
  const px = 1.2;
  const h1 = 14;
  const hTotal = 14 + 52 * px;
  const hFinal = 14 + 40 * px;
  const tip = [ys + h1, ys + hTotal, ys + hFinal, ys + hFinal];
  const cx = 280;
  const cone = (yTip: number) => {
    const hw = 62;
    const hh = hw / Math.tan(rad(60));
    return `${cx},${yTip} ${cx - hw},${yTip - hh} ${cx + hw},${yTip - hh}`;
  };
  const loads = ["10 kp", "10 + 140 = 150 kp", "10 kp", "10 kp"];
  return {
    label: "Ensayo Rockwell con cono de diamante: precarga, carga total y profundidad permanente e",
    beatMs: 5200,
    captions: [
      "Un penetrador (cono de diamante de $120°$ para duros: **HRC**; bola para blandos: **HRB**) se apoya con una **precarga** de $10$ kp. Se mide su profundidad $h_1$ y se pone a cero el comparador.",
      "Se añade una carga extra hasta $150$ kp en total ($140$ kp más) durante $3$–$6$ s y se mide la profundidad $h_2$: el material cede de forma elástica y plástica.",
      "Se **retira la carga adicional** y queda solo la precarga. El penetrador sube un poco: se recupera lo elástico y permanece la deformación **permanente** $e$.",
      "La dureza no es la profundidad, sino lo que falta para una referencia: $HRC = 100 - e$ (y $HRB = 130 - e$). Un material blando se hunde más (e grande) y sale **menos** dureza.",
    ],
    render: (beat) => (
      <Canvas>
        <rect x={110} y={ys} width={340} height={140} fill={MANIM.muted} fillOpacity={0.18} stroke={MANIM.muted} strokeWidth={2} />
        <g>
          <polygon className="anim-t" points={cone(tip[beat]!)} fill={MANIM.blue} fillOpacity={0.85} stroke={MANIM.blue} strokeWidth={2} style={{ transition: "all 0.7s ease" }} />
          <rect className="anim-t" x={cx - 24} y={tip[beat]! - 150} width={48} height={150 - 36} fill={MANIM.blue} fillOpacity={0.5} style={{ transition: "all 0.7s ease" }} />
          <Arrow x1={cx} y1={tip[beat]! - 190} x2={cx} y2={tip[beat]! - 158} color={MANIM.red} width={5} head={13} />
          <Txt x={cx + 18} y={tip[beat]! - 170} size={19} color={MANIM.red} anchor="start">
            {loads[beat]}
          </Txt>
        </g>
        <line x1={110} y1={ys + h1} x2={450} y2={ys + h1} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
        <Txt x={104} y={ys + h1 + 6} size={16} color={MANIM.yellow} anchor="end">
          h₁
        </Txt>
        <Fade show={beat >= 1}>
          <line x1={110} y1={ys + hTotal} x2={450} y2={ys + hTotal} stroke={MANIM.orange} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={104} y={ys + hTotal + 6} size={16} color={MANIM.orange} anchor="end">
            h₂
          </Txt>
        </Fade>
        <Fade show={beat >= 2}>
          <line x1={430} y1={ys + h1} x2={430} y2={ys + hFinal} stroke={MANIM.green} strokeWidth={4} />
          <Txt x={444} y={ys + h1 + (hFinal - h1) / 2 + 6} size={22} color={MANIM.green} anchor="start">
            e
          </Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <Txt x={520} y={118} size={22} color={MANIM.yellow} anchor="start">
            HRC = 100 − e
          </Txt>
          <Txt x={520} y={158} size={18} color={MANIM.muted} anchor="start">
            1 unidad de e = 0,002 mm
          </Txt>
          <Txt x={520} y={200} size={18} color={MANIM.green} anchor="start">
            ej.: e = 40 → 0,08 mm
          </Txt>
          <Txt x={520} y={246} size={28} color={MANIM.orange} anchor="start">
            HRC = 60
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          <Txt x={520} y={118} size={20} color={MANIM.green} anchor="start">
            queda solo la parte
          </Txt>
          <Txt x={520} y={144} size={20} color={MANIM.green} anchor="start">
            plástica: e
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Péndulo de Charpy ───────────── */

export function buildPenduloCharpy(): AnimBuild {
  const m = 20;
  const Lm = 0.8;
  const g = 9.8;
  const a0 = 120;
  const a1 = 75;
  const h0 = Lm * (1 - Math.cos(rad(a0)));
  const h1 = Lm * (1 - Math.cos(rad(a1)));
  const E0 = m * g * h0;
  const E1 = m * g * h1;
  const Ep = E0 - E1;
  const S = 0.8;
  const rho = Ep / S;
  const px = 300;
  const py = 120;
  const Lp = 130;
  const angles = [-a0, 0, a1, a1];
  const pos = (th: number) => ({ x: px + Lp * Math.sin(rad(th)), y: py + Lp * Math.cos(rad(th)) });
  const ground = py + Lp;
  return {
    label: "Péndulo de Charpy: la energía absorbida en la rotura es la diferencia de alturas",
    beatMs: 5200,
    captions: [
      `El péndulo ($m = 20$ kg, brazo de $0{,}8$ m) se suelta desde un ángulo de $120°$. Su energía inicial es potencial: $E_0 = m\\,g\\,h_0 = 20\\cdot 9{,}8\\cdot ${f1(h0, 2)} = ${f1(E0, 0)}$ J.`,
      "En el punto más bajo el martillo golpea la **probeta entallada** (55 mm de longitud, 10 mm de lado) y la rompe de un solo golpe.",
      `El péndulo sigue su camino pero **no sube tanto**: llega hasta $75°$, a una altura $h_1 = ${f1(h1, 2)}$ m. Le queda $E_1 = ${f1(E1, 0)}$ J.`,
      `La energía absorbida en la rotura es la que falta: $E_p = E_0 - E_1 = ${f1(Ep, 0)}$ J. La **resiliencia** es $\\rho = E_p/S$; con $S = 0{,}8$ cm² bajo la entalla, $\\rho = ${f1(rho, 0)}$ J/cm².`,
    ],
    render: (beat) => {
      const th = angles[beat]!;
      const ghost = pos(-a0);
      return (
        <Canvas>
          <rect x={px - 120} y={ground + 38} width={240} height={14} fill={MANIM.muted} fillOpacity={0.4} />
          <rect x={px - 55} y={ground + 24} width={110} height={14} fill={MANIM.muted} fillOpacity={0.15} stroke={MANIM.muted} strokeWidth={1.5} />
          <Fade show={beat === 0}>
            <rect x={px - 44} y={ground + 12} width={88} height={14} fill={MANIM.yellow} fillOpacity={0.6} stroke={MANIM.yellow} strokeWidth={2} />
          </Fade>
          <Fade show={beat >= 1}>
            <polygon points={`${px - 44},${ground + 24} ${px - 6},${ground + 24} ${px - 12},${ground + 14}`} fill={MANIM.yellow} fillOpacity={0.6} stroke={MANIM.yellow} strokeWidth={2} />
            <polygon points={`${px + 6},${ground + 24} ${px + 44},${ground + 24} ${px + 14},${ground + 12}`} fill={MANIM.yellow} fillOpacity={0.6} stroke={MANIM.yellow} strokeWidth={2} />
          </Fade>
          {/* referencias de altura */}
          <line x1={px - 150} y1={ghost.y} x2={px + 190} y2={ghost.y} stroke={MANIM.orange} strokeWidth={1.5} strokeDasharray="5 6" />
          <Fade show={beat >= 2}>
            <line x1={px - 150} y1={pos(a1).y} x2={px + 190} y2={pos(a1).y} stroke={MANIM.green} strokeWidth={1.5} strokeDasharray="5 6" />
          </Fade>
          <line x1={px - 150} y1={ground} x2={px + 190} y2={ground} stroke={MANIM.muted} strokeWidth={1.5} strokeDasharray="5 6" />
          <Txt x={px - 156} y={(ghost.y + ground) / 2 + 6} size={19} color={MANIM.orange} anchor="end">
            h₀
          </Txt>
          <Fade show={beat >= 2}>
            <Txt x={px + 196} y={(pos(a1).y + ground) / 2 + 6} size={19} color={MANIM.green} anchor="start">
              h₁
            </Txt>
          </Fade>
          {/* eje y soporte */}
          <circle cx={px} cy={py} r={8} fill={MANIM.muted} />
          <g className="anim-t" style={{ transform: `translate(${px}px, ${py}px) rotate(${-th}deg)` }}>
            <line x1={0} y1={0} x2={0} y2={Lp} stroke={MANIM.ink} strokeWidth={4} strokeLinecap="round" />
            <circle cx={0} cy={Lp} r={22} fill={MANIM.blue} fillOpacity={0.9} />
          </g>
          <g className="anim-t" style={{ transform: `translate(${pos(th).x}px, ${pos(th).y}px)` }}>
            <Txt x={0} y={5} size={14} color={MANIM.surface} weight={800}>
              20 kg
            </Txt>
          </g>
          <Fade show={beat === 1}>
            {[0, 60, 120, 180, 240, 300].map((a) => (
              <line key={a} x1={px + Math.cos(rad(a)) * 18} y1={ground + 4 + Math.sin(rad(a)) * 18} x2={px + Math.cos(rad(a)) * 38} y2={ground + 4 + Math.sin(rad(a)) * 38} stroke={MANIM.red} strokeWidth={3} strokeLinecap="round" />
            ))}
            <Txt x={px} y={ground + 76} size={18} color={MANIM.red}>
              ¡rotura!
            </Txt>
          </Fade>
          <Fade show={beat >= 0}>
            <Txt x={560} y={96} size={19} color={MANIM.orange} anchor="start">
              E₀ = m·g·h₀ = {f1(E0, 0)} J
            </Txt>
          </Fade>
          <Fade show={beat >= 2}>
            <Txt x={560} y={132} size={19} color={MANIM.green} anchor="start">
              E₁ = m·g·h₁ = {f1(E1, 0)} J
            </Txt>
          </Fade>
          <Fade show={beat >= 3}>
            <Txt x={560} y={176} size={19} color={MANIM.yellow} anchor="start">
              Eₚ = E₀ − E₁ = {f1(Ep, 0)} J
            </Txt>
            <Txt x={560} y={222} size={22} color={MANIM.red} anchor="start">
              ρ = Eₚ / S = {f1(rho, 0)} J/cm²
            </Txt>
          </Fade>
        </Canvas>
      );
    },
  };
}

/* ───────────── Fatiga ───────────── */

export function buildFatigaCiclos(): AnimBuild {
  const cy = 215;
  const T = (x: number, y: number, label: string, color: string) => (
    <Txt x={x} y={y} size={20} color={color}>
      {label}
    </Txt>
  );
  const crackSeg = (cx: number, depth: number, id: string) => (
    <g>
      <clipPath id={id}>
        <circle cx={cx} cy={cy} r={70} />
      </clipPath>
      <circle cx={cx} cy={cy} r={70} fill={MANIM.red} fillOpacity={0.5} stroke={MANIM.muted} strokeWidth={2.5} />
      <rect x={cx - 80} y={cy - 70} width={160} height={depth} fill={MANIM.blue} fillOpacity={0.55} clipPath={`url(#${id})`} />
      {[0.3, 0.55, 0.8].map((k) => (
        <path key={k} d={`M ${cx - 70} ${cy - 70 + depth * k} Q ${cx} ${cy - 70 + depth * k + 10} ${cx + 70} ${cy - 70 + depth * k}`} fill="none" stroke={MANIM.ink} strokeOpacity={0.4} strokeWidth={1.5} clipPath={`url(#${id})`} />
      ))}
    </g>
  );
  const curve = (() => {
    const pts: string[] = [];
    for (let x = 0; x <= 560; x += 8) {
      pts.push(`${x === 0 ? "M" : "L"} ${150 + x} ${215 - 70 * Math.sin((x / 560) * Math.PI * 6)}`);
    }
    return pts.join(" ");
  })();
  const sn = "M 130 90 C 250 100, 330 200, 450 258 C 520 280, 600 285, 740 286";
  return {
    label: "Fatiga: esfuerzos alternos por debajo del límite elástico acaban en rotura",
    beatMs: 5200,
    captions: [
      "En el ensayo de **flexión rotatoria** la probeta gira con una carga en el extremo. Un punto de la superficie pasa de **tracción** (arriba) a **compresión** (abajo) en cada media vuelta.",
      "La tensión varía de forma **alterna** en cada vuelta. Aunque su valor máximo está por **debajo del límite elástico**, se repite miles o millones de veces.",
      "La rotura tiene **tres fases**: **incubación** (nace una fisura interna), **maduración** (la grieta avanza poco a poco) y **rotura** instantánea de lo que queda de sección.",
      "Si la tensión alterna es menor que el **límite de fatiga**, la pieza no rompe por muchos ciclos que se repitan. Si es mayor, rompe, y antes cuanto mayor sea.",
    ],
    render: (beat) => (
      <Canvas>
        <Fade show={beat === 0}>
          <circle cx={200} cy={cy} r={82} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={150} y={cy - 82} width={100} height={28} fill={MANIM.red} fillOpacity={0.75} />
          <rect x={150} y={cy + 54} width={100} height={28} fill={MANIM.blue} fillOpacity={0.75} />
          {T(200, cy - 100, "tracción (+)", MANIM.red)}
          {T(200, cy + 112, "compresión (−)", MANIM.blue)}
          <circle cx={600} cy={cy} r={82} fill={MANIM.blue} fillOpacity={0.12} stroke={MANIM.muted} strokeWidth={3} />
          <rect x={550} y={cy - 82} width={100} height={28} fill={MANIM.blue} fillOpacity={0.75} />
          <rect x={550} y={cy + 54} width={100} height={28} fill={MANIM.red} fillOpacity={0.75} />
          {T(600, cy - 100, "compresión (−)", MANIM.blue)}
          {T(600, cy + 112, "tracción (+)", MANIM.red)}
          <path d="M 320 190 Q 400 120 480 190" fill="none" stroke={MANIM.yellow} strokeWidth={3.5} />
          <polygon points="482,192 464,188 474,172" fill={MANIM.yellow} />
          {T(400, 120, "media vuelta", MANIM.yellow)}
          <Txt x={400} y={cy + 8} size={26} color={MANIM.muted}>
            ⟲
          </Txt>
        </Fade>
        <Fade show={beat === 1}>
          <Axes x0={150} y0={cy} x1={740} y1={90} xLabel="tiempo (ciclos)" yLabel="σ" />
          <path d={curve} fill="none" stroke={MANIM.blue} strokeWidth={3.5} />
          <line x1={150} y1={cy - 130} x2={740} y2={cy - 130} stroke={MANIM.red} strokeWidth={2.5} strokeDasharray="8 6" />
          <Txt x={745} y={cy - 138} size={17} color={MANIM.red} anchor="end">
            límite elástico
          </Txt>
          <Txt x={440} y={cy + 118} size={19} color={MANIM.blue}>
            σ máx. &lt; σ elástico, pero se repite miles de veces
          </Txt>
        </Fade>
        <Fade show={beat === 2}>
          {crackSeg(170, 18, "fat-a")}
          {crackSeg(400, 78, "fat-b")}
          {crackSeg(630, 112, "fat-c")}
          {T(170, cy + 110, "1. incubación", MANIM.green)}
          {T(400, cy + 110, "2. maduración", MANIM.orange)}
          {T(630, cy + 110, "3. rotura final", MANIM.red)}
          <Txt x={170} y={cy + 134} size={15} color={MANIM.muted}>
            fisura interna
          </Txt>
          <Txt x={400} y={cy + 134} size={15} color={MANIM.muted}>
            zona lisa, de grano fino
          </Txt>
          <Txt x={630} y={cy + 134} size={15} color={MANIM.muted}>
            zona rugosa, de grano grueso
          </Txt>
          <Txt x={400} y={72} size={18} color={MANIM.blue}>
            azul: grieta que avanza · rojo: sección que aguanta
          </Txt>
        </Fade>
        <Fade show={beat === 3}>
          <Axes x0={120} y0={340} x1={760} y1={50} xLabel="nº de ciclos hasta la rotura (escala log.)" yLabel="σ alterna" />
          <path d={sn} fill="none" stroke={MANIM.blue} strokeWidth={4.5} />
          <line x1={120} y1={286} x2={740} y2={286} stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="7 6" />
          <Txt x={200} y={272} size={19} color={MANIM.yellow} anchor="start">
            límite de fatiga
          </Txt>
          <Txt x={560} y={330 - 120} size={18} color={MANIM.red} anchor="start">
            rompe
          </Txt>
          <Txt x={560} y={315} size={18} color={MANIM.green} anchor="start">
            no rompe nunca
          </Txt>
        </Fade>
      </Canvas>
    ),
  };
}
