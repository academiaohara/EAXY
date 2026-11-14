import { lin, poli, pt, seg, txt, type Diagrama, type Item, type Pt } from "./engine";
import { DIAGRAMAS_DIEDRICO_ESPACIO } from "./diedrico-espacio";

const Y0 = 215;

/* Perspectiva de los dos planos: PV (vertical, detrás) y PH (horizontal, hacia nosotros). */
const PV: Pt[] = [[250, 50], [550, 50], [550, 215], [250, 215]];
const PH: Pt[] = [[250, 215], [550, 215], [670, 330], [370, 330]];
const planos = (): Item[] => [poli(PV, "azul", 0.14), poli(PH, "naranja", 0.14), seg([250, 215], [550, 215], "blanco", false, 4), txt([600, 205], "L.T.", "blanco", 20, "start"), txt([300, 80], "PV", "azul", 22), txt([600, 320], "PH", "naranja", 22)];

/** Punto con abscisa `x`, alejamiento `al` y cota `co` en la perspectiva de los planos: el alejamiento baja a la derecha y la cota sube. */
const Q = (x: number, al: number, co: number): Pt => [x + 1.043 * al, 215 + al - co];

const reversible = (): Diagrama => {
  const A = Q(420, 60, 100), Ah = Q(420, 60, 0), Av = Q(420, 0, 100);
  const mid = (a: Pt, b: Pt): Pt => [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
  return {
    label: "Un punto del espacio y sus dos proyecciones: reversibilidad",
    pasos: [
      { texto: "Un punto $A$ del primer diedro, **suspendido** en el espacio: delante del PV y encima del PH.", items: [...planos(), pt(A, "A", "verde", 14, -6)] },
      { texto: "Se proyecta ortogonalmente: la proyectante **perpendicular al PH** llega a $A'$ y la **perpendicular al PV** llega a $A''$.", items: [
        seg(A, Ah, "verde", true, 2), pt(Ah, "A′", "naranja", 14, 20), seg(A, Av, "verde", true, 2), pt(Av, "A″", "azul", -34, -4),
        txt([mid(A, Ah)[0] + 10, mid(A, Ah)[1]], "⟂ PH", "naranja", 15, "start"), txt([mid(A, Av)[0] - 6, mid(A, Av)[1] - 12], "⟂ PV", "azul", 15, "end"),
      ] },
      { texto: "Conocidas $A'$ y $A''$, las **perpendiculares** a cada plano por ellas se cortan en $A$: un punto tiene solo **dos proyecciones** y estas solo pueden serlo de un punto. Esta **reversibilidad** es la propiedad principal de todo sistema de representación: a partir de las proyecciones se puede saber la posición del cuerpo.", items: [
        seg(Ah, Q(420, 60, 160), "amarillo", true, 2), seg(Av, Q(420, 110, 100), "amarillo", true, 2), txt([400, 385], "reversible: dos proyecciones definen el punto", "amarillo", 22),
      ] },
    ],
  };
};

const notacion = (): Diagrama => {
  const sc = (p: Pt): Pt => [p[0] * 0.62 + 10, p[1] * 0.62 + 50];
  const A = Q(420, 60, 100), Ah = Q(420, 60, 0), Av = Q(420, 0, 100);
  const ox = 620;
  return {
    label: "Notación de puntos, rectas, planos y de la línea de tierra en diédrico",
    pasos: [
      { texto: "Los **puntos** con letras mayúsculas (también se pueden nombrar con números): $A(A'\\text{-}A'')$, siendo $A'$ la proyección **horizontal** y $A''$ la **vertical**. A la izquierda, el punto en el espacio; a la derecha, su épura.", solo: true, items: [
        poli(PV.map(sc), "azul", 0.14), poli(PH.map(sc), "naranja", 0.14), seg(sc([250, 215]), sc([550, 215]), "blanco", false, 3.5), txt(sc([280, 80]), "PV", "azul", 16), txt(sc([590, 320]), "PH", "naranja", 16),
        pt(sc(A), "A", "verde", 10, -8), seg(sc(A), sc(Ah), "verde", true), pt(sc(Ah), "A′", "naranja", 10, 18), seg(sc(A), sc(Av), "verde", true), pt(sc(Av), "A″", "azul", -26, -4),
        seg([430, Y0], [790, Y0], "blanco", false, 3.5), seg([ox, 115], [ox, 275], "gris", true, 1.8), pt([ox, 115], "A″", "azul", 12, -8), pt([ox, 275], "A′", "naranja", 12, 22), txt([780, Y0 - 12], "L.T.", "gris", 18, "end"),
      ] },
      { texto: "La **línea de tierra** se representa con **línea llena y fina** y con **dos trazos** en sus extremos.", items: [
        seg([40, Y0], [760, Y0], "blanco", false, 1.6), seg([40, Y0 + 9], [62, Y0 + 9], "blanco", false, 3.5), seg([738, Y0 + 9], [760, Y0 + 9], "blanco", false, 3.5), txt([752, Y0 - 12], "L.T.", "gris", 19, "end"),
      ] },
      { texto: "Las **rectas** con letras minúsculas: $r(r'\\text{-}r'')$ indica que la recta $r$ tiene por proyecciones $r'$ y $r''$, horizontal y vertical.", items: [
        lin([[330, Y0 + 100], [480, Y0 + 40]], "naranja", false, 3.5), lin([[330, Y0 - 100], [480, Y0 - 40]], "azul", false, 3.5), txt([505, Y0 + 40], "r′", "naranja", 22), txt([505, Y0 - 40], "r″", "azul", 22),
      ] },
      { texto: "Los **planos** con letras del alfabeto griego: $\\alpha(\\alpha_1\\text{-}\\alpha_2)$ indica que el plano $\\alpha$ tiene por trazas $\\alpha_1$ y $\\alpha_2$, horizontal y vertical.", items: [
        pt([620, Y0], "N", "blanco", -6, 24), lin([[620, Y0], [720, Y0 + 90]], "naranja", false, 3.5), lin([[620, Y0], [730, Y0 - 100]], "azul", false, 3.5), txt([740, Y0 + 100], "α₁", "naranja", 22), txt([745, Y0 - 100], "α₂", "azul", 22),
      ] },
    ],
  };
};

/* Punto sobre un bisector: en perfil (izquierda) y en la épura (derecha). */
const bisectoresPunto = (): Diagrama => {
  const P0: Pt = [150, 215];
  const perfil = (): Item[] => [seg([60, 215], [240, 215], "naranja", false, 3.4), seg([150, 120], [150, 310], "azul", false, 3.4), txt([158, 132], "PV", "azul", 17, "start"), txt([238, 236], "PH", "naranja", 17, "end"), pt(P0, "L.T.", "blanco", 10, 20)];
  const ox = 580;
  return {
    label: "Puntos de los planos bisectores: simetría y coincidencia de proyecciones",
    pasos: [
      { texto: "Un punto del **primer bisector** equidista de los dos planos: su **cota** y su **alejamiento** son **iguales**. En la épura, $C'$ y $C''$ quedan a la **misma distancia de la L.T.** y a distinto lado: son **simétricas** respecto de ella.", solo: true, items: [
        ...perfil(), seg([80, 285], [220, 145], "amarillo", true, 1.8), pt([205, 160], "C", "amarillo", 12, -8), seg([205, 160], [205, 215], "verde", true), seg([205, 160], [150, 160], "verde", true),
        txt([214, 192], "a", "verde", 15, "start"), txt([178, 152], "a", "verde", 15),
        seg([400, Y0], [780, Y0], "blanco", false, 3.5), txt([772, Y0 - 12], "L.T.", "gris", 18, "end"), seg([ox, 160], [ox, 270], "gris", true, 1.8), pt([ox, 160], "C″", "azul", 12, -8), pt([ox, 270], "C′", "naranja", 12, 22),
        txt([ox + 22, 190], "a", "verde", 16, "start"), txt([ox + 22, 250], "a", "verde", 16, "start"),
      ] },
      { texto: "Un punto del **segundo bisector** también equidista de los planos, pero está en el 2.º diedro: sus dos proyecciones quedan **al mismo lado** de la L.T., a la misma distancia, y por tanto **coinciden**: $G'=G''$.", solo: true, items: [
        ...perfil(), seg([80, 145], [220, 285], "morado", true, 1.8), pt([95, 160], "G", "morado", -14, -8), seg([95, 160], [95, 215], "verde", true), seg([95, 160], [150, 160], "verde", true),
        txt([86, 192], "a", "verde", 15, "end"), txt([122, 152], "a", "verde", 15),
        seg([400, Y0], [780, Y0], "blanco", false, 3.5), txt([772, Y0 - 12], "L.T.", "gris", 18, "end"), seg([ox, 160], [ox, Y0], "gris", true, 1.8), pt([ox, 160], "G′=G″", "morado", 0, -14), txt([ox + 22, 190], "a", "verde", 16, "start"),
      ] },
    ],
  };
};

export const DIAGRAMAS_DIEDRICO: Record<string, Diagrama> = {
  "d12-bisectores-punto": bisectoresPunto(), "d12-reversible": reversible(), "d12-notacion": notacion(),
  /* Recta y plano (págs. 99-109): dibujos con la vista en el espacio y el dibujo plano, en `diedrico-espacio.ts`. */
  ...DIAGRAMAS_DIEDRICO_ESPACIO,
};
export type { Item };
