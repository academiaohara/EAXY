"use client";

import type { ReactNode } from "react";
import { angDe, enCirculo, type Pt } from "./geometry";
import { INK, VERDE, type BenchBlock } from "./scenes";
import { GEO, AnguloDato, Dato } from "./scenes-construcciones";
import { MSHEET, MV, Practica, type Def, type Est } from "./scenes-compas";
import { Seg } from "./scenes-proporcion";
import { AUX, Dot, Poli, Recto } from "./scenes-teoria";
import { Punto } from "./scenes-trazados";

/**
 * Prácticas de las construcciones de triángulos del tema 4: el alumno hace con los instrumentos lo mismo que ha visto
 * animado (tomar una medida con el compás, llevarla, marcar un ángulo con el transportador, trazar con la regla).
 * Cada práctica solo acepta acciones válidas; al terminar, la regla traza sola los lados del triángulo.
 */
const vista = { ...MV, sheet: MSHEET };
type Seg2 = [Pt, Pt];

const Nom = ({ p, n, dx, dy }: { p: Pt; n: string; dx?: number; dy?: number }) => <Punto p={p} nombre={n} dx={dx} dy={dy} />;
const Rayo = ({ v, ang, largo }: { v: Pt; ang: number; largo: number }) => {
  const f = enCirculo(v, largo, ang);
  return <Seg a={v} b={f} color={INK} w={1.4} />;
};
const finalOk = (mensaje: string) => () => ({ ok: true, mensaje });

/** Fases de partida de las prácticas con arcos: la mina empieza a un lado del corte y hay que pasarla por él. */
const rhoIni = (n: number) => (n % 2 === 0 ? -25 : 25);

type CfgAngulo = { centro: Pt; base: number; objetivo: number; signo?: 1 | -1 };

/* ───────────── Equilátero: arcos de radio a desde B y desde C ───────────── */

const eq = GEO.eqLado;
const defEqLado: Def = {
  scene: "equilatero-lado-practica",
  fases: ["medida", "centro", "arco", "centro", "arco", "auto"],
  autoLados: () => [[eq.A, eq.B], [eq.A, eq.C]],
  papel: (est: Est) => (
    <g>
      <Dato a={eq.dato[0]} b={eq.dato[1]} nombre="a" />
      <Seg a={eq.B} b={eq.C} w={1.8} />
      <Nom p={eq.B} n="B" dx={-16} dy={18} />
      <Nom p={eq.C} n="C" dx={8} dy={18} />
      {est.fase >= 6 ? <Nom p={eq.A} n="A" dx={8} dy={-8} /> : null}
    </g>
  ),
  medibles: () => [eq.dato[0], eq.dato[1]],
  candidatos: (_est, idx) => (idx === 0 ? [eq.B] : [eq.C]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni,
  arco: (_est, _n, _r, c) => ({ centro: c, base: angDe(c, eq.A), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [],
  evaluar: finalOk("Correcto: A está a la distancia a de B y de C, así que los tres lados miden a y el triángulo es equilátero."),
};
export function EquilateroLadoPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defEqLado} vista={vista} />;
}

/* ───────────── Un ángulo con el transportador, una medida y un arco (LAL, catetos, isósceles) ───────────── */

type CfgAnguloLado = {
  scene: Def["scene"];
  datos: ReactNode;
  base: Seg2;
  nombresBase: [string, string];
  /** Posiciones de los nombres de los extremos de la base. */
  nom: [[number, number], [number, number]];
  angulo: CfgAngulo;
  /** Segmento dato cuya medida se lleva con el compás. */
  medida: Seg2;
  /** Centro del arco y vértice que se encuentra. */
  centro: Pt;
  vertice: Pt;
  nombreVertice: string;
  lados: Seg2[];
  marcaRecto?: boolean;
  mensaje: string;
};

function defAnguloLado(c: CfgAnguloLado): Def {
  const largo = 270;
  return {
    scene: c.scene,
    fases: ["angulo", "medida", "centro", "arco", "auto"],
    autoLados: () => c.lados,
    papel: (est: Est) => (
      <g>
        {c.datos}
        <Seg a={c.base[0]} b={c.base[1]} w={1.8} />
        <Nom p={c.base[0]} n={c.nombresBase[0]} dx={c.nom[0][0]} dy={c.nom[0][1]} />
        <Nom p={c.base[1]} n={c.nombresBase[1]} dx={c.nom[1][0]} dy={c.nom[1][1]} />
        {est.fase >= 1 ? <Rayo v={c.angulo.centro} ang={c.angulo.base + (c.angulo.signo ?? 1) * c.angulo.objetivo} largo={largo} /> : null}
        {est.fase >= 5 ? <Nom p={c.vertice} n={c.nombreVertice} dx={8} dy={-8} /> : null}
      </g>
    ),
    angulo: () => ({ ...c.angulo, largo }),
    medibles: () => [c.medida[0], c.medida[1]],
    candidatos: () => [c.centro],
    compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
    radioLim: () => [40, 215],
    radioIni: () => 100,
    rhoIni: () => -25,
    arco: (_est, _n, _r, cen) => ({ centro: cen, base: angDe(cen, c.vertice), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
    cortes: () => [],
    evaluar: finalOk(c.mensaje),
  };
}

const lal = GEO.lal;
const defLal = defAnguloLado({
  scene: "triangulo-lal-practica",
  datos: (
    <g>
      <Dato a={lal.datoA[0]} b={lal.datoA[1]} nombre="a" />
      <Dato a={lal.datoC[0]} b={lal.datoC[1]} nombre="c" color="#e0a800" />
      <AnguloDato v={[400, 150]} ang={lal.aB} nombre="B" />
    </g>
  ),
  base: [lal.B, lal.C],
  nombresBase: ["B", "C"],
  nom: [[-16, 18], [8, 18]],
  angulo: { centro: lal.B, base: 0, objetivo: lal.aB },
  medida: lal.datoC,
  centro: lal.B,
  vertice: lal.A,
  nombreVertice: "A",
  lados: [[lal.B, lal.A], [lal.A, lal.C]],
  mensaje: "Correcto: A está sobre el lado del ángulo B y a la distancia c de B, así que el triángulo tiene los lados a y c y el ángulo B que forman.",
});
export function TrianguloLalPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defLal} vista={vista} />;
}

const rc = GEO.recCatetos;
const defRecCatetos = defAnguloLado({
  scene: "rectangulo-catetos-practica",
  datos: (
    <g>
      <Dato a={rc.datoB[0]} b={rc.datoB[1]} nombre="b" />
      <Dato a={rc.datoC[0]} b={rc.datoC[1]} nombre="c" color="#e0a800" />
    </g>
  ),
  base: [rc.A, rc.B],
  nombresBase: ["A", "B"],
  nom: [[-16, 18], [8, 18]],
  angulo: { centro: rc.A, base: 0, objetivo: 90 },
  medida: rc.datoB,
  centro: rc.A,
  vertice: rc.C,
  nombreVertice: "C",
  lados: [[rc.A, rc.C], [rc.C, rc.B]],
  mensaje: "Correcto: los catetos AB y AC forman 90° y miden c y b; la hipotenusa BC es el tercer lado.",
});
export function RectanguloCatetosPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defRecCatetos} vista={vista} />;
}

const il = GEO.isoLadoAng;
const defIsoLadoAng = defAnguloLado({
  scene: "isosceles-lado-angulo-practica",
  datos: (
    <g>
      <Dato a={il.dato[0]} b={il.dato[1]} nombre="a" />
      <AnguloDato v={[400, 150]} ang={il.aB} nombre="B" />
    </g>
  ),
  base: [il.B, il.C],
  nombresBase: ["B", "C"],
  nom: [[-16, 18], [8, 18]],
  angulo: { centro: il.B, base: 0, objetivo: il.aB },
  medida: il.dato,
  centro: il.B,
  vertice: il.A,
  nombreVertice: "A",
  lados: [[il.B, il.A], [il.A, il.C]],
  mensaje: "Correcto: BA y BC miden lo mismo (a) y forman el ángulo B, así que el triángulo es isósceles.",
});
export function IsoscelesLadoAnguloPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defIsoLadoAng} vista={vista} />;
}

/* ───────────── Dos ángulos con el transportador y el vértice donde se cortan (ALA, cateto y ángulo, isósceles) ───────────── */

type CfgDosAngulos = {
  scene: Def["scene"];
  datos: ReactNode;
  base: Seg2;
  nombresBase: [string, string];
  nom: [[number, number], [number, number]];
  angulos: [CfgAngulo, CfgAngulo];
  vertice: Pt;
  nombreVertice: string;
  marcaRecto?: Pt;
  mensaje: string;
};

function defDosAngulos(c: CfgDosAngulos): Def {
  const largo = 280;
  const rayo = (a: CfgAngulo) => a.base + (a.signo ?? 1) * a.objetivo;
  return {
    scene: c.scene,
    fases: ["angulo", "angulo", "punto", "auto"],
    autoLados: () => [[c.angulos[0].centro, c.vertice], [c.angulos[1].centro, c.vertice]],
    papel: (est: Est) => (
      <g>
        {c.datos}
        <Seg a={c.base[0]} b={c.base[1]} w={1.8} />
        <Nom p={c.base[0]} n={c.nombresBase[0]} dx={c.nom[0][0]} dy={c.nom[0][1]} />
        <Nom p={c.base[1]} n={c.nombresBase[1]} dx={c.nom[1][0]} dy={c.nom[1][1]} />
        {est.fase >= 1 ? <Rayo v={c.angulos[0].centro} ang={rayo(c.angulos[0])} largo={largo} /> : null}
        {est.fase >= 2 ? <Rayo v={c.angulos[1].centro} ang={rayo(c.angulos[1])} largo={largo} /> : null}
        {est.fase >= 3 ? <Nom p={c.vertice} n={c.nombreVertice} dx={8} dy={-8} /> : null}
        {est.fase >= 3 && c.marcaRecto ? <Dot p={c.vertice} color={VERDE} r={4} /> : null}
      </g>
    ),
    angulo: (est) => ({ ...c.angulos[est.fase === 0 ? 0 : 1], largo }),
    candidatos: () => [],
    radioLim: () => [40, 215],
    radioIni: () => 100,
    rhoIni: () => 0,
    arco: (_est, _n, _r, cen) => ({ centro: cen, base: 0, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
    cortes: () => [c.vertice],
    evaluar: finalOk(c.mensaje),
  };
}

const ala = GEO.ala;
const defAla = defDosAngulos({
  scene: "triangulo-ala-practica",
  datos: (
    <g>
      <Dato a={ala.dato[0]} b={ala.dato[1]} nombre="a" />
      <AnguloDato v={[380, 150]} ang={ala.aB} nombre="B" />
      <AnguloDato v={[500, 150]} ang={ala.aCext} nombre="C" />
    </g>
  ),
  base: [ala.B, ala.C],
  nombresBase: ["B", "C"],
  nom: [[-16, 18], [8, 18]],
  angulos: [{ centro: ala.B, base: 0, objetivo: ala.aB }, { centro: ala.C, base: 180, objetivo: ala.aCext, signo: -1 }],
  vertice: ala.A,
  nombreVertice: "A",
  mensaje: "Correcto: los lados de los ángulos B y C se cortan en A, y el triángulo tiene el lado a y los dos ángulos adyacentes.",
});
export function TrianguloAlaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defAla} vista={vista} />;
}

const rca = GEO.recCatAng;
const defRecCatAng = defDosAngulos({
  scene: "rectangulo-cateto-angulo-practica",
  datos: (
    <g>
      <Dato a={rca.dato[0]} b={rca.dato[1]} nombre="b" />
      <AnguloDato v={[400, 150]} ang={rca.aC} nombre="C" />
    </g>
  ),
  base: [rca.A, rca.C],
  nombresBase: ["A", "C"],
  nom: [[-16, 18], [8, 18]],
  angulos: [{ centro: rca.C, base: 180, objetivo: rca.aC, signo: -1 }, { centro: rca.A, base: 0, objetivo: 90 }],
  vertice: rca.B,
  nombreVertice: "B",
  mensaje: "Correcto: el lado de C y la perpendicular por A se cortan en B, y el triángulo tiene el cateto b, el ángulo C y el ángulo recto en A.",
});
export function RectanguloCatetoAnguloPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defRecCatAng} vista={vista} />;
}

const idz = GEO.isoDesigual;
const defIsoDesigual = defDosAngulos({
  scene: "isosceles-desigual-practica",
  datos: (
    <g>
      <Dato a={idz.dato[0]} b={idz.dato[1]} nombre="b" />
      <AnguloDato v={[400, 150]} ang={idz.aA} nombre="A" />
    </g>
  ),
  base: [idz.A, idz.C],
  nombresBase: ["A", "C"],
  nom: [[-16, 18], [8, 18]],
  angulos: [{ centro: idz.A, base: 0, objetivo: idz.aA }, { centro: idz.C, base: 180, objetivo: idz.aA, signo: -1 }],
  vertice: idz.B,
  nombreVertice: "B",
  mensaje: "Correcto: los ángulos de la base son iguales (A = C), así que BA = BC y el triángulo es isósceles.",
});
export function IsoscelesDesigualPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defIsoDesigual} vista={vista} />;
}

/* ───────────── Rectángulo: cateto e hipotenusa (semicircunferencia de diámetro BC) ───────────── */

const rh = GEO.recHip;
const defRecHip: Def = {
  scene: "rectangulo-hipotenusa-practica",
  fases: ["medida", "centro", "arco", "medida", "centro", "arco", "auto"],
  autoLados: () => [[rh.A, rh.B], [rh.A, rh.C]],
  papel: (est: Est) => (
    <g>
      <Dato a={rh.datoA[0]} b={rh.datoA[1]} nombre="a" />
      <Dato a={rh.datoB[0]} b={rh.datoB[1]} nombre="b" color="#e0a800" />
      <Seg a={rh.B} b={rh.C} w={1.8} />
      <Nom p={rh.B} n="B" dx={-16} dy={18} />
      <Nom p={rh.C} n="C" dx={8} dy={18} />
      <Nom p={rh.O} n="O" dx={-5} dy={20} />
      <Dot p={rh.O} color="#1f78b4" r={3.6} />
      {est.fase >= 7 ? (
        <g>
          <Nom p={rh.A} n="A" dx={-6} dy={-10} />
          <Recto v={rh.A} a={rh.B} b={rh.C} />
        </g>
      ) : null}
    </g>
  ),
  medibles: (est) => (est.fase === 0 ? [rh.O, rh.B] : [rh.datoB[0], rh.datoB[1]]),
  candidatos: (_est, idx) => (idx === 0 ? [rh.O] : [rh.C]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni: (n) => (n === 0 ? -90 : -25),
  arco: (_est, n, _r, c) => (n === 0 ? { centro: c, base: 90, signo: 1, rhoMin: -95, rhoMax: 95, req: [-86, 86] } : { centro: c, base: angDe(c, rh.A), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [],
  evaluar: finalOk("Correcto: A está en la semicircunferencia de diámetro BC, así que el ángulo A es recto, y a la distancia b de C."),
};
export function RectanguloHipotenusaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defRecHip} vista={vista} />;
}

/* ───────────── Isósceles: lado igual y ángulo igual ───────────── */

const ii = GEO.isoIgualAng;
const defIsoIgualAng: Def = {
  scene: "isosceles-igual-angulo-practica",
  fases: ["angulo", "medida", "centro", "arco", "centro", "arco", "auto"],
  autoLados: () => [[ii.C, ii.B], [ii.B, ii.A], [ii.A, ii.C]],
  papel: (est: Est) => (
    <g>
      <Dato a={ii.dato[0]} b={ii.dato[1]} nombre="a" />
      <AnguloDato v={[400, 150]} ang={ii.aC} nombre="C" />
      <Seg a={[130, 290]} b={[500, 290]} w={1.4} />
      <Nom p={ii.C} n="C" dx={8} dy={18} />
      {est.fase >= 1 ? <Rayo v={ii.C} ang={180 - ii.aC} largo={260} /> : null}
      {est.fase >= 4 ? <Nom p={ii.B} n="B" dx={8} dy={-6} /> : null}
      {est.fase >= 7 ? <Nom p={ii.A} n="A" dx={-16} dy={18} /> : null}
    </g>
  ),
  angulo: () => ({ centro: ii.C, base: 180, objetivo: ii.aC, largo: 260, signo: -1 }),
  medibles: () => [ii.dato[0], ii.dato[1]],
  candidatos: (_est, idx) => (idx === 0 ? [ii.C] : [ii.B]),
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni,
  arco: (_est, n, _r, c) => ({ centro: c, base: angDe(c, n === 0 ? ii.B : ii.A), signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [],
  evaluar: finalOk("Correcto: B está a la distancia a de C sobre el lado del ángulo, y A a la misma distancia a de B sobre la base: BC = BA."),
};
export function IsoscelesIgualAnguloPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defIsoIgualAng} vista={vista} />;
}

/* ───────────── Equilátero a partir de la altura: h desde N y paralelas con escuadra y cartabón ───────────── */

const ea = GEO.eqAltura;
const FASE_ESC = 3;
const defEqAltura: Def = {
  scene: "equilatero-altura-practica",
  fases: ["medida", "centro", "arco", "escuadra", "escuadra", "auto"],
  autoLados: () => [[ea.C, ea.A], [ea.A, ea.B], [ea.C, ea.B]],
  papel: (est: Est) => {
    const trazadas = Math.max(0, Math.min(2, est.fase - FASE_ESC));
    return (
      <g>
        <Dato a={ea.dato[0]} b={ea.dato[1]} nombre="h" />
        <Seg a={[120, 290]} b={[500, 290]} color={AUX} w={1.2} />
        <Poli pts={[ea.P1, ea.P2, ea.V]} color="#e0a800" w={2} fill="rgba(224,168,0,0.1)" />
        <Nom p={ea.P1} n="1" dx={-14} dy={18} />
        <Nom p={ea.P2} n="2" dx={6} dy={18} />
        <Nom p={ea.V} n="3" dx={8} dy={-4} />
        <Seg a={ea.V} b={[ea.N[0], ea.A[1] - 18]} color={AUX} w={1.4} dash="5 4" />
        <Recto v={ea.N} a={ea.P2} b={ea.V} />
        <Nom p={ea.N} n="N" dx={6} dy={18} />
        {est.fase >= 3 ? <Nom p={ea.A} n="A" dx={8} dy={-6} /> : null}
        {[ea.C, ea.B].slice(0, trazadas).map((q, i) => (
          <g key={i} data-testid="bench-paralela-trazada">
            <Seg a={ea.A} b={q} color="#1f78b4" w={1.6} dash="7 5" />
          </g>
        ))}
        {trazadas >= 2 || est.fase >= 6 ? (
          <>
            <Nom p={ea.C} n="C" dx={-16} dy={18} />
            <Nom p={ea.B} n="B" dx={8} dy={18} />
          </>
        ) : null}
      </g>
    );
  },
  medibles: () => [ea.dato[0], ea.dato[1]],
  candidatos: () => [ea.N],
  compasEspecial: (est, tipo) => (est.medida.length === 2 && tipo === "centro" ? { n: est.medida[0], m: est.medida[1] } : null),
  radioLim: () => [40, 215],
  radioIni: () => 100,
  rhoIni: () => -25,
  arco: (_est, _n, _r, c) => ({ centro: c, base: 90, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
  cortes: () => [],
  escuadra: (est) => ({
    recta: est.fase === FASE_ESC ? [ea.P1, ea.V] : [ea.P2, ea.V],
    objetivos: [{ marca: ea.A, corte: ea.C }, { marca: ea.A, corte: ea.B }],
  }),
  extTrazo: 0,
  reiniciarEscuadra: true,
  evaluar: finalOk("Correcto: A está a la altura h sobre N y las paralelas a los lados del equilátero 1-2-3 por A cortan a la base en C y B, así que ABC es equilátero con altura h."),
};
export function EquilateroAlturaPractica({ block }: { block: BenchBlock }) {
  return <Practica block={block} def={defEqAltura} vista={vista} />;
}

