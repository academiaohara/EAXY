import { CONSTRUCCIONES, etiqueta, fasesPractica, instrumentoAngulo, type Construccion, type ConstruccionId, type Nota, type Op } from "./construcciones-datos";

/**
 * Textos de las construcciones del tema 5: un texto por paso de la animación y uno por fase de la práctica, generados a
 * partir de las operaciones para que explicación y ejercicio cuenten siempre la misma construcción.
 */
const L = (p: string) => (etiqueta(p) ? `$${etiqueta(p)}$` : "el punto");
/** Nombre de un punto en un título (los puntos de la recta auxiliar no llevan rótulo). */
const tit = (p: string) => etiqueta(p) || "la última marca";
const seg = (a: string, b: string) => `$${etiqueta(a)}${etiqueta(b)}$`;

/** Puntos que se marcan justo después de la operación `i` (las marcas que la siguen). */
function marcasTras(c: Construccion, i: number): string[] {
  const out: string[] = [];
  for (let j = i + 1; j < c.ops.length && c.ops[j].k === "marca"; j += 1) {
    const m = c.ops[j] as Extract<Op, { k: "marca" }>;
    if (!m.sim) out.push(m.p);
  }
  return out;
}

const esDato = (c: Construccion, p: string) => c.datos.some((d) => d.a === p || d.b === p || d.mitad === p);

function notaOp(c: Construccion, o: Op, i: number): Nota {
  const marcas = marcasTras(c, i);
  const donde = marcas.length === 1 ? ` Donde corta está el punto ${L(marcas[0])}.` : marcas.length > 1 ? ` Donde cortan están los puntos ${marcas.map(L).join(" y ")}.` : "";
  switch (o.k) {
    case "medir": {
      const dato = c.datos.find((d) => d.a === o.de || d.b === o.de || d.a === o.a || d.b === o.a);
      const que = dato ? `la medida del segmento $${dato.nombre}$` : `la distancia ${seg(o.de, o.a)}`;
      return { title: dato ? `Se toma la medida ${dato.nombre}` : `Se toma la medida ${etiqueta(o.de)}${etiqueta(o.a)}`, text: `Se abre el compás hasta que la punta seca esté en ${L(o.de)} y la mina en ${L(o.a)}: así se toma ${que}.`, fact: `Abertura = ${etiqueta(o.de)}${etiqueta(o.a)}` };
    }
    case "arco":
      return { title: `Arco con centro en ${tit(o.c)}`, text: `Se clava la punta seca en ${L(o.c)} y, sin cambiar la abertura, se traza un arco hacia ${esDato(c, o.hacia) ? "el segmento" : L(o.hacia)}.${donde}` };
    case "circulo":
      return { title: `Circunferencia de centro ${tit(o.c)}`, text: `Se clava la punta seca en ${L(o.c)} y se da la vuelta completa con la mina: la circunferencia pasa por ${L(o.hacia)}.`, fact: `Centro ${tit(o.c)}` };
    case "marca":
      return { title: etiqueta(o.p) ? `Punto ${etiqueta(o.p)}` : "Marca del corte", text: `Se marca el punto ${L(o.p)}.` };
    case "recta":
      return { title: `Recta por ${etiqueta(o.a)} y ${etiqueta(o.b)}`, text: `Se apoya la regla en ${L(o.a)} y ${L(o.b)} y se traza la recta.${o.limpia ? " Se borran los arcos auxiliares y queda solo la recta." : ""}${donde}` };
    case "perp":
      return { title: `Perpendicular por ${etiqueta(o.punto)}`, text: `Con la escuadra apoyada por un cateto en la recta (y el cartabón de guía, si hace falta) se desliza hasta que su otro cateto pasa por ${L(o.punto)}. Se traza la perpendicular.${donde}`, fact: "90°" };
    case "angulo": {
      const inst = instrumentoAngulo(o.obj);
      if (inst) {
        const quien = inst === "escuadra45" ? "la escuadra" : "el cartabón";
        return { title: `Ángulo de ${o.obj}° en ${etiqueta(o.v)}`, text: `Se apoya ${quien} con un cateto sobre la recta y su vértice de $${o.obj}^\\circ$ en ${L(o.v)}; el lápiz traza por la hipotenusa.${donde}`, fact: `${o.obj}°` };
      }
      return { title: `Ángulo de ${o.obj}° en ${etiqueta(o.v)}`, text: `Se centra el transportador en ${L(o.v)}, se marca el ángulo de $${o.obj}^\\circ$ y con la regla se traza su lado.${donde}`, fact: `${o.obj}°` };
    }
    case "paralelas":
      return { title: "Paralelas con escuadra y cartabón", text: `Por ${o.marcas.map(L).join(", ")} se trazan **paralelas** a ${seg(o.recta[0], o.recta[1])}: el cartabón se apoya en esa recta y la escuadra desliza hasta cada punto. Cortan al segmento en partes iguales.` };
    case "lados":
      return { title: o.pts.length === 3 && c.ops.filter((x) => x.k === "lados").length > 1 ? "Se unen los vértices alternos" : "Se dibuja la figura", text: `Con la regla se unen ${o.pts.map(L).join(", ")} en orden. Los lados definitivos se dibujan en trazo grueso.` };
    case "solucion":
      return o.hasta
        ? { title: "Se dibuja el arco de enlace", text: `Con centro en ${L(o.c)} se traza el arco entre ${L(o.hacia)} y ${L(o.hasta)}, que son los puntos de tangencia. Queda en trazo grueso.`, fact: "Arco de enlace" }
        : { title: "Se dibuja la solución", text: `Con centro en ${L(o.c)} y pasando por ${L(o.hacia)} se traza la circunferencia solución, en trazo grueso.`, fact: `Centro ${tit(o.c)}` };
    case "elipseConjugada":
      return { title: "Se dibuja la elipse", text: `Con los diámetros conjugados por ${L(o.c)} y la elipse inscrita en el paralelogramo de sus tangentes, se traza a lápiz y a mano alzada, o con plantilla, la elipse de centro ${L(o.c)} en trazo grueso.`, fact: "Elipse" };
    case "elipse":
      return { title: "Se dibuja la elipse", text: `Se unen los puntos obtenidos con una curva suave, a mano alzada o con plantilla de curvas, y se remarca la elipse de centro ${L(o.c)} en trazo grueso.`, fact: "Elipse" };
    case "curvaPuntos":
      return { title: "Se dibuja la curva", text: `Se unen ${o.pts.map(L).join(", ")} con una curva suave, a mano alzada o con plantilla de curvas, en trazo grueso.`, fact: "Curva por los puntos" };
    case "curva":
      return { title: "Se dibuja la parábola", text: `Se traza a mano alzada, o con plantilla, la curva tangente a las rectas ${seg(o.a, o.c)} y ${seg(o.c, o.b)} en ${L(o.a)} y ${L(o.b)}: es el arco de parábola, en trazo grueso.`, fact: "Envolvente de las rectas" };
    default:
      return { title: "", text: "" };
  }
}

/** Notas de la animación: una por paso (los datos y cada operación salvo las marcas). */
export function notasAnimacion(id: ConstruccionId): Nota[] {
  const c = CONSTRUCCIONES[id] as Construccion;
  const out: Nota[] = [{ title: "Los datos", text: c.intro }];
  c.ops.forEach((o, i) => {
    if (o.k === "marca") return;
    out.push(c.notas?.[i] ?? notaOp(c, o, i));
  });
  return out;
}

/** Notas de la práctica: una por fase. */
export function notasPractica(id: ConstruccionId): Nota[] {
  const c = CONSTRUCCIONES[id] as Construccion;
  const out: Nota[] = [];
  for (const o of c.ops) {
    switch (o.k) {
      case "medir":
        out.push({ title: `Toma la medida ${etiqueta(o.de)}${etiqueta(o.a)}`, text: `Toca los dos extremos, ${L(o.de)} y ${L(o.a)}, para tomar su medida con el compás.`, fact: "Misma abertura" });
        break;
      case "arco":
      case "circulo":
        out.push({ title: `Clava la punta en ${tit(o.c)}`, text: `Toca ${L(o.c)} para clavar la punta seca del compás.` });
        out.push({ title: o.k === "circulo" ? "Circunferencia" : `Arco desde ${tit(o.c)}`, text: o.k === "circulo" ? "Da la vuelta completa con la mina siguiendo la circunferencia." : "Arrastra la mina para trazar el arco por donde debe cortar." });
        break;
      case "marca":
        if (!o.sim) out.push({ title: etiqueta(o.p) ? `Marca ${etiqueta(o.p)}` : "Marca el corte", text: `Toca el punto ${L(o.p)} donde se cortan los trazos.` });
        break;
      case "recta":
        out.push({ title: `Regla por ${etiqueta(o.a)} y ${etiqueta(o.b)}`, text: `Toca ${L(o.a)} y ${L(o.b)}: la regla traza la recta.${o.limpia ? " Después se borran los arcos auxiliares." : ""}` });
        break;
      case "perp":
        out.push({ title: `Perpendicular por ${etiqueta(o.punto)}`, text: `Arrastra la escuadra a lo largo de la recta hasta que su filo pase por ${L(o.punto)}: queda trazada la perpendicular.`, fact: "90°" });
        break;
      case "angulo": {
        const inst = instrumentoAngulo(o.obj);
        out.push({ title: `Ángulo de ${o.obj}° en ${etiqueta(o.v)}`, text: inst ? `Desliza ${inst === "escuadra45" ? "la escuadra" : "el cartabón"} a lo largo de la recta hasta que su vértice de ${o.obj}° llegue a ${L(o.v)}: el lápiz traza el lado.` : "Con el transportador, arrastra el segundo lado hasta ese ángulo.", fact: `${o.obj}°` });
        break;
      }
      case "paralelas":
        o.marcas.forEach((m) => out.push({ title: `Paralela por ${etiqueta(m)}`, text: `Desliza la escuadra sobre el cartabón hasta que su filo pase por ${L(m)}.`, fact: "Paralela" }));
        break;
      default:
        break;
    }
  }
  out.push({ title: "Cierra la figura", text: "Lo que has construido se dibuja solo, ya en trazo grueso." });
  return out;
}

export function textoTarea(id: ConstruccionId) {
  const c = CONSTRUCCIONES[id] as Construccion;
  return {
    question: `Construye: ${c.titulo.charAt(0).toLowerCase()}${c.titulo.slice(1)}.`,
    hint: "Repite los pasos de la animación: cada trazo lleva al siguiente.",
    explanation: c.intro.replace(/\$/g, ""),
  };
}

/** Comprobación interna: la práctica debe tener una nota por fase. */
export const fasesDe = (id: ConstruccionId) => fasesPractica(CONSTRUCCIONES[id] as Construccion).length;
