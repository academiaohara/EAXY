"use client";

import { clamp, dist, rotarPunto, type Pt } from "./geometry";
import { MSHEET, MV, Practica, SNAP, type Def, type Est } from "./scenes-compas";
import { GIRO_CENTRO, GIRO_ORIG, PapelGiro } from "./scenes-giro";
import { HOMO_IMG, PapelHomotecia } from "./scenes-homotecia";
import { SIM_IMG, PapelSimetria } from "./scenes-simetria";
import { PapelTraslacion, TRAS_IMG } from "./scenes-transformaciones";
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

function defUnir(tipo: number, th: number): Def {
  const img = imagenes(tipo, th);
  const indice = (p: Pt) => img.findIndex((q) => dist(p, q) <= SNAP + 2);
  return {
    scene: "union-imagen",
    fases: ["regla"],
    nClics: 6,
    extRegla: 0,
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
    cortes: () => img,
    progreso: (est: Est) => {
      const lados = Math.floor(est.clics.length / 2);
      return est.clics.length % 2 === 1 ? `Lados trazados: ${lados} de 3 · elige el otro extremo del lado` : `Lados trazados: ${lados} de 3`;
    },
    evaluar: (est) => {
      const lados: [number, number][] = [];
      for (let i = 0; i + 1 < est.clics.length; i += 2) lados.push([indice(est.clics[i]), indice(est.clics[i + 1])]);
      if (lados.length < 3) return { ok: false, mensaje: "Faltan lados por trazar." };
      if (lados.some(([a, b]) => a < 0 || b < 0 || a === b)) return { ok: false, mensaje: "Cada pasada de la regla debe pasar por dos de los puntos A′, B′ y C′. Pulsa «Reintentar»." };
      const claves = new Set(lados.map(([a, b]) => `${Math.min(a, b)}-${Math.max(a, b)}`));
      if (claves.size < 3) return { ok: false, mensaje: "Has repetido un lado: hay que trazar A′B′, B′C′ y C′A′, uno cada vez. Pulsa «Reintentar»." };
      return { ok: true, mensaje: `Correcto: A′B′C′ es la figura transformada del triángulo ABC por la ${TEMA[tipo]}.` };
    },
  };
}

export function UnionImagen({ block }: { block: BenchBlock }) {
  const tipo = clamp(Math.round(block.params?.a ?? 0), 0, 3);
  return <Practica block={block} def={defUnir(tipo, 60)} vista={{ ...MV, sheet: MSHEET }} />;
}
