import type { ReactNode } from "react";
import { Canvas, Fade, Txt } from "@/components/lesson/anim/primitives";
import { Seg, type Pt } from "@/components/lesson/anim/geometry";
import { MANIM } from "@/components/lesson/anim/palette";
import type { AnimBuild } from "@/components/lesson/anim/types";

/* ───────────── Curvas de nivel de una colina y de un valle ───────────── */

const BASE_Y = 190;
const CX = 230;
const ALTO = 150;
const ANCHO = 90;
const perfilY = (x: number) => BASE_Y - ALTO * Math.exp(-(((x - CX) / ANCHO) ** 2));
const semi = (h: number) => ANCHO * Math.sqrt(Math.log(ALTO / h));
const niveles = [30, 60, 90, 120];
const cotas = [10, 20, 30, 40];
const PLANTA_Y = 292;

export function buildCurvasNivel(): AnimBuild {
  const perfil: Pt[] = Array.from({ length: 81 }, (_, i) => {
    const x = 20 + i * 5;
    return [x, perfilY(x)] as Pt;
  });
  return {
    label: "Curvas de nivel: secciones horizontales de una colina y su proyección acotada",
    beatMs: 5600,
    captions: [
      "Unos **planos horizontales equidistantes** cortan la superficie del terreno. Cada plano da una **sección**, cuyo contorno es una **curva de nivel**.",
      "Proyectadas sobre el plano de comparación, las secciones son **curvas cerradas acotadas**: todos los puntos de una curva tienen **la misma cota**.",
      "Si la cota **aumenta hacia dentro**, el plano representa un **monte** o colina; si **aumenta hacia afuera**, un **valle** u hondonada.",
      "La separación entre planos es la **equidistancia**. Con poca pendiente se intercalan **curvas intercalares**, dibujadas a trazos.",
    ],
    render: (beat) => (
      <Canvas>
        <polyline points={perfil.map((p) => p.join(",")).join(" ")} fill="none" stroke={MANIM.green} strokeWidth={3.5} strokeLinejoin="round" />
        <Seg a={[20, BASE_Y]} b={[420, BASE_Y]} color={MANIM.muted} width={2} />
        <Txt x={430} y={BASE_Y + 6} size={14} color={MANIM.muted} anchor="start">plano de comparación</Txt>
        {niveles.map((h, i) => (
          <g key={h}>
            <Seg a={[20, BASE_Y - h]} b={[420, BASE_Y - h]} color={MANIM.blue} width={1.6} dashed />
            <Txt x={438} y={BASE_Y - h + 5} size={14} color={MANIM.blue} anchor="start">{`cota ${cotas[i]}`}</Txt>
          </g>
        ))}
        <Fade show={beat >= 1}>
          {niveles.map((h, i) => {
            const r = semi(h);
            return (
              <g key={h}>
                <ellipse cx={CX} cy={PLANTA_Y} rx={r} ry={r * 0.5} fill="none" stroke={MANIM.blue} strokeWidth={2.4} />
                <Seg a={[CX + r, BASE_Y - h]} b={[CX + r, PLANTA_Y]} color={MANIM.muted} width={1} dashed />
                <Txt x={CX + r + 12} y={PLANTA_Y + 5} size={14} color={MANIM.blue}>{cotas[i]}</Txt>
              </g>
            );
          })}
        </Fade>
        <Fade show={beat >= 2}>
          <Txt x={CX} y={PLANTA_Y + 92} size={16} color={MANIM.green}>Monte: la cota sube hacia dentro</Txt>
          {[40, 30, 20, 10].map((c, i) => {
            const r = semi(niveles[3 - i]);
            return (
              <g key={`vv${c}`}>
                <ellipse cx={610} cy={PLANTA_Y} rx={r * 0.95} ry={r * 0.475} fill="none" stroke={MANIM.orange} strokeWidth={2.4} />
                <Txt x={610} y={PLANTA_Y - r * 0.475 - 3} size={13} color={MANIM.orange}>{c}</Txt>
              </g>
            );
          })}
          <Txt x={610} y={PLANTA_Y + 92} size={16} color={MANIM.orange}>Valle: la cota sube hacia afuera</Txt>
        </Fade>
        <Fade show={beat >= 3}>
          <ellipse cx={CX} cy={PLANTA_Y} rx={(semi(30) + semi(60)) / 2} ry={(semi(30) + semi(60)) / 4} fill="none" stroke={MANIM.yellow} strokeWidth={2} strokeDasharray="6 5" />
          <Txt x={CX - 215} y={PLANTA_Y - 5} size={15} color={MANIM.yellow} anchor="start">curva intercalar</Txt>
          <Seg a={[470, BASE_Y - 30]} b={[470, BASE_Y - 60]} color={MANIM.yellow} width={2.5} />
          <Txt x={480} y={BASE_Y - 40} size={14} color={MANIM.yellow} anchor="start">equidistancia</Txt>
        </Fade>
      </Canvas>
    ),
  };
}

/* ───────────── Símbolos del dibujo topográfico ───────────── */

export function buildSimbolosTopograficos(): AnimBuild {
  const fila = (y: number, texto: string, dibujo: ReactNode) => (
    <g key={texto}>
      {dibujo}
      <Txt x={300} y={y + 5} size={17} anchor="start" color={MANIM.ink}>{texto}</Txt>
    </g>
  );
  return {
    label: "Símbolos del dibujo topográfico",
    beatMs: 5600,
    captions: [
      "El relieve se representa con **curvas de nivel acotadas**: las ordinarias son líneas continuas y las **intercalares**, a trazos. Un **punto acotado** indica la altitud de un punto concreto.",
      "Los **accidentes naturales** (ríos, vaguadas) y las **obras artificiales** (caminos, edificios, taludes) se indican con **símbolos convencionales**.",
    ],
    render: (beat) => (
      <Canvas>
        {fila(60, "Curva de nivel (continua)", <path d="M60 60 C100 30 150 90 230 55" fill="none" stroke={MANIM.green} strokeWidth={3} />)}
        {fila(110, "Curva intercalar (a trazos)", <path d="M60 110 C100 80 150 140 230 105" fill="none" stroke={MANIM.green} strokeWidth={2.4} strokeDasharray="8 6" />)}
        {fila(160, "Punto acotado", <g><circle cx={110} cy={160} r={4} fill={MANIM.ink} /><Txt x={150} y={165} size={16}>125,3</Txt></g>)}
        <Fade show={beat >= 1}>
          {fila(215, "Río o arroyo", <path d="M60 215 q20 -14 40 0 t40 0 t40 0 t40 0" fill="none" stroke={MANIM.blue} strokeWidth={3.5} />)}
          {fila(265, "Camino", <g><Seg a={[60, 258]} b={[230, 258]} color={MANIM.ink} width={2.2} /><Seg a={[60, 272]} b={[230, 272]} color={MANIM.ink} width={2.2} /></g>)}
          {fila(320, "Edificio", <g><rect x={90} y={305} width={110} height={30} fill="none" stroke={MANIM.ink} strokeWidth={2.4} /><Seg a={[90, 335]} b={[120, 305]} color={MANIM.muted} width={1.4} /><Seg a={[125, 335]} b={[155, 305]} color={MANIM.muted} width={1.4} /><Seg a={[160, 335]} b={[190, 305]} color={MANIM.muted} width={1.4} /></g>)}
          {fila(375, "Talud (desmonte o terraplén)", <g><Seg a={[60, 375]} b={[230, 375]} color={MANIM.ink} width={2.2} />{[75, 100, 125, 150, 175, 200].map((x, i) => <Seg key={x} a={[x, 375]} b={[x, 375 + (i % 2 ? 12 : 18)]} color={MANIM.ink} width={1.6} />)}</g>)}
        </Fade>
      </Canvas>
    ),
  };
}
