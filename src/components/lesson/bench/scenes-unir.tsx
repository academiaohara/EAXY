"use client";

import { useState } from "react";
import { clamp, dist, rotarPunto, type Pt } from "./geometry";
import { MSHEET, MV, Practica, secuenciar, type Def, type Est } from "./scenes-compas";
import { defGiro, GIRO_CENTRO, GIRO_ORIG, PapelGiro } from "./scenes-giro";
import { defHomotecia, HOMO_IMG, PapelHomotecia } from "./scenes-homotecia";
import { defSimetria, SIM_IMG, PapelSimetria } from "./scenes-simetria";
import { defTraslacion, PapelTraslacion, TRAS_IMG } from "./scenes-transformaciones";
import { Punto } from "./scenes-trazados";
import { VERDE, type BenchBlock } from "./scenes";

const NOMBRES = ["A′", "B′", "C′"];

/** Etiquetas de A′, B′ y C′ para cada transformación (0 traslación, 1 giro, 2 simetría, 3 homotecia). */
const ETIQUETAS: [number, number][][] = [
  [[6, 16], [8, -6], [6, 16]],
  [[-20, -6], [-20, -6], [-22, 4]],
  [[8, 16], [8, -6], [8, 16]],
  [[6, 18], [8, -6], [-22, -6]],
];

const TEMA = ["traslación", "giro", "simetría", "homotecia"];

function imagenes(tipo: number, th: number): Pt[] {
  if (tipo === 0) return TRAS_IMG;
  if (tipo === 1) return GIRO_ORIG.map((p) => rotarPunto(p, GIRO_CENTRO, th));
  if (tipo === 2) return SIM_IMG;
  return HOMO_IMG;
}

/** Fase final: la regla une sola A′B′, B′C′ y C′A′ y el ejercicio acaba. */
export function defUnir(tipo: number, th: number): Def {
  const img = imagenes(tipo, th);
  return {
    scene: "traslacion-practica",
    fases: ["auto"],
    autoLados: () => [[img[0], img[1]], [img[1], img[2]], [img[2], img[0]]],
    papel: () => (
      <g>
        {tipo === 0 ? <PapelTraslacion etiquetas={{ a2: false, b2: false, c2: false }} /> : null}
        {tipo === 1 ? <PapelGiro /> : null}
        {tipo === 2 ? <PapelSimetria puntos={0} /> : null}
        {tipo === 3 ? <PapelHomotecia /> : null}
        {img.map((q, i) => (
          <Punto key={i} p={q} nombre={NOMBRES[i]} dx={ETIQUETAS[tipo][i][0]} dy={ETIQUETAS[tipo][i][1]} color={VERDE} />
        ))}
      </g>
    ),
    candidatos: () => [],
    radioLim: () => [40, 200],
    radioIni: () => 100,
    rhoIni: () => 0,
    arco: (_est, _n, _radio, c) => ({ centro: c, base: 0, signo: 1, rhoMin: -45, rhoMax: 45, req: [-8, 8] }),
    cortes: () => [],
    evaluar: () => ({ ok: true, mensaje: `Correcto: A′B′C′ es la figura transformada del triángulo ABC por la ${TEMA[tipo]}.` }),
  };
}

const vista = { ...MV, sheet: MSHEET };

function Secuencia({ block, def }: { block: BenchBlock; def: () => Def }) {
  const [d] = useState(def);
  return <Practica block={block} def={d} vista={vista} />;
}

/** Traslación completa: B, C y unir los puntos. */
export function TraslacionPractica({ block }: { block: BenchBlock }) {
  return <Secuencia block={block} def={() => secuenciar("traslacion-practica", [defTraslacion(1), defTraslacion(2)], defUnir(0, 0))} />;
}

/** Giro completo: A, B, C y unir los puntos. */
export function GiroPractica({ block }: { block: BenchBlock }) {
  const th = clamp(Math.round(block.params?.a ?? 60), 30, 120);
  return <Secuencia block={block} def={() => secuenciar("giro-practica", [defGiro(th, 0), defGiro(th, 1), defGiro(th, 2)], defUnir(1, th))} />;
}

/** Simetría completa: A, B, C y unir los puntos. */
export function SimetriaPractica({ block }: { block: BenchBlock }) {
  return <Secuencia block={block} def={() => secuenciar("simetria-practica", [defSimetria(0), defSimetria(1), defSimetria(2)], defUnir(2, 0))} />;
}

/** Homotecia completa: A, B, C y unir los puntos. */
export function HomoteciaPractica({ block }: { block: BenchBlock }) {
  return <Secuencia block={block} def={() => secuenciar("homotecia-practica", [defHomotecia(0), defHomotecia(1), defHomotecia(2)], defUnir(3, 0))} />;
}
