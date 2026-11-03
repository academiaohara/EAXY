import { arc, circ, fl, lin, poli, pt, seg, txt, type Diagrama, type Pt } from "./engine";

const elipseCurva = (c: Pt, a: number, b: number): Pt[] => Array.from({ length: 73 }, (_, i) => [c[0] + a * Math.cos((i / 72) * 6.2832), c[1] + b * Math.sin((i / 72) * 6.2832)] as Pt);

const uso = (): Diagrama => {
  const C: Pt = [400, 215];
  return {
    label: "Aplicaciones del sistema de planos acotados: topografía, caminos y terraplenes",
    pasos: [
      { texto: "El sistema representa el **relieve del terreno** con **curvas de nivel acotadas**: es la base del dibujo topográfico.", items: [
        lin(elipseCurva(C, 250, 160), "verde", false, 3), lin(elipseCurva(C, 190, 120), "verde", false, 3), lin(elipseCurva(C, 130, 80), "verde", false, 3), lin(elipseCurva(C, 70, 40), "verde", false, 3),
        txt([650, 225], "10", "verde", 18), txt([590, 225], "20", "verde", 18), txt([530, 225], "30", "verde", 18), txt([470, 225], "40", "verde", 18),
      ] },
      { texto: "Con él se trazan **caminos y canales** y se estudian sus **pendientes**.", items: [
        lin([[140, 330], [260, 290], [380, 250], [480, 150], [600, 110], [680, 80]], "amarillo", false, 5), txt([170, 360], "camino", "amarillo", 20),
      ] },
      { texto: "Y se calculan **desmontes y terraplenes**: la tierra que hay que quitar o aportar.", items: [
        poli([[300, 300], [380, 250], [380, 300]], "rojo", 0.3), poli([[470, 190], [560, 150], [560, 190]], "azul", 0.3), txt([340, 325], "desmonte", "rojo", 18), txt([515, 215], "terraplén", "azul", 18),
      ] },
    ],
  };
};

const punto = (): Diagrama => {
  const plano: Pt[] = [[110, 330], [560, 330], [690, 260], [240, 260]];
  return {
    label: "Representación del punto: cota positiva, nula y negativa",
    pasos: [
      { texto: "Hay un único **plano de proyección horizontal**. Un punto puede estar **encima**, **en** el plano o **debajo**.", items: [poli(plano, "gris", 0.14), txt([600, 330], "π", "gris", 22)] },
      { texto: "Encima: $A$ se proyecta ortogonalmente en $A'$ y su **cota** (5) se anota entre paréntesis: $A'(5)$.", items: [pt([360, 90], "A", "verde", 12, -6), seg([360, 90], [360, 285], "verde", true), pt([360, 285], "A′(5)", "naranja", 14, 22)] },
      { texto: "En el plano: cota **cero**, $B'(0)$. Debajo: cota **negativa**, $C'(-4)$.", items: [pt([220, 300], "B′(0)", "azul", -18, 24), pt([500, 380], "C", "rojo", 12, 8), seg([500, 380], [500, 300], "rojo", true), pt([500, 300], "C′(−4)", "rojo", 14, -10)] },
    ],
  };
};

const cota = (): Diagrama => ({
  label: "Cota, desnivel y altitud",
  pasos: [
    { texto: "La **cota** es la longitud del segmento que une el punto con su proyección sobre el plano.", items: [seg([100, 260], [700, 260], "gris", false, 3), txt([740, 266], "0", "gris", 20), pt([260, 120], "P(8)", "verde", 12, -8), seg([260, 120], [260, 260], "verde", true), pt([520, 330], "Q(−3)", "rojo", 12, 24), seg([520, 330], [520, 260], "rojo", true)] },
    { texto: "El **desnivel** entre dos puntos es la **diferencia algebraica** de sus cotas: entre $P(8)$ y $Q(-3)$ es 11.", items: [seg([620, 120], [620, 330], "amarillo", false, 3), seg([610, 120], [630, 120], "amarillo"), seg([610, 330], [630, 330], "amarillo"), txt([650, 232], "11", "amarillo", 24, "start")] },
    { texto: "Si el plano es el **nivel del mar**, las cotas positivas son **altitudes** y las negativas, **profundidades** o sondas.", items: [lin(Array.from({ length: 40 }, (_, i) => [100 + i * 15, 260 + Math.sin(i / 3) * 5] as Pt), "azul", false, 4), txt([160, 230], "altitudes ↑", "verde", 19), txt([160, 330], "profundidades ↓", "rojo", 19)] },
  ],
});

const recta = (): Diagrama => {
  const A: Pt = [220, 230];
  const B: Pt = [600, 130];
  const Ap: Pt = [220, 330];
  const Bp: Pt = [600, 330];
  return {
    label: "Representación de la recta: proyección, desnivel y pendiente",
    pasos: [
      { texto: "La recta se representa por su **proyección** $r'$ sobre el plano, que une las proyecciones de dos puntos acotados.", items: [
        seg([60, 330], [740, 330], "gris", false, 2.5), pt(Ap, "A′(2)", "naranja", -10, 24), pt(Bp, "B′(5,5)", "naranja", -6, 24), seg(Ap, Bp, "naranja", false, 4.5), txt([700, 306], "r′", "naranja", 21),
      ] },
      { texto: "En el espacio la recta forma un ángulo $\\alpha$ con el plano. El **desnivel** $d$ es la diferencia de cotas.", items: [
        seg(A, B, "verde", false, 4), seg(A, Ap, "gris", true), seg(B, Bp, "gris", true), seg([220, 230], [600, 230], "gris", true), seg([600, 130], [600, 230], "amarillo", false, 4), txt([620, 185], "d", "amarillo", 22, "start"), arc(Ap, 70, 0, 14, "amarillo"),
      ] },
      { texto: "**Pendiente**: $p = \\tan\\alpha = \\dfrac{d}{r'}$. Si $r' = 100$, el desnivel es $D$: $p$ es un tanto por ciento.", items: [txt([400, 385], "p = tg α = d / r′", "amarillo", 26)] },
    ],
  };
};

const trazaModulo = (): Diagrama => {
  const x0 = 130;
  const dx = 100;
  const y = 250;
  return {
    label: "Traza, intervalo y graduación de una recta",
    pasos: [
      { texto: "Una recta se **gradúa**: se divide en partes iguales, una por cada unidad de cota. Aquí entre $A'(1)$ y $E'(5)$.", items: [
        seg([x0 + 0 * dx, y], [x0 + 4 * dx, y], "naranja", false, 4), ...[0, 1, 2, 3, 4].map((k) => pt([x0 + k * dx, y], `${"ABCDE"[k]}′(${k + 1})`, "naranja", -10, 28)),
      ] },
      { texto: "La longitud de cada parte es el **intervalo** $i$: la proyección de un segmento de la recta con desnivel igual a la unidad.", items: [
        seg([x0, y - 40], [x0 + dx, y - 40], "amarillo", false, 3), txt([x0 + dx / 2, y - 55], "i", "amarillo", 24),
      ] },
      { texto: "La **traza** $T'(0)$ es el punto de cota cero: se halla llevando el intervalo hacia atrás. La pendiente es la inversa: $p = 1/i$.", items: [
        seg([x0 - dx, y], [x0, y], "verde", true, 3.4), pt([x0 - dx, y], "T′(0)", "verde", -10, 28), txt([400, 360], "p = 1 / i", "amarillo", 26),
      ] },
    ],
  };
};

const lmp = (): Diagrama => {
  const O: Pt = [360, 340];
  const k = 70;
  return {
    label: "El plano por su línea de máxima pendiente: horizontales y graduación",
    pasos: [
      { texto: "El plano se da por su **línea de máxima pendiente** (l.m.p.), **graduada**, perpendicular a las horizontales del plano.", items: [
        seg([O[0], O[1]], [O[0], O[1] - 3.6 * k], "verde", false, 4), ...[0, 1, 2, 3].map((n) => pt([O[0], O[1] - n * k], `${n}`, "verde", 12, 6)),
      ] },
      { texto: "Las **horizontales** son rectas del plano de cota entera: **perpendiculares a la l.m.p.** por cada división.", items: [
        ...[0, 1, 2, 3].map((n) => seg([O[0] - 220, O[1] - n * k], [O[0] + 220, O[1] - n * k], n === 0 ? "naranja" : "azul", false, n === 0 ? 4 : 2.6)), txt([O[0] + 235, O[1] + 6], "α₀", "naranja", 22, "start"),
      ] },
      { texto: "Todos los puntos de una horizontal tienen la **misma cota**. Dos horizontales también definen el plano.", items: [txt([O[0] + 235, O[1] - 3 * k + 6], "h(3)", "azul", 21, "start"), txt([O[0] + 235, O[1] - 2 * k + 6], "h(2)", "azul", 21, "start"), txt([O[0] + 235, O[1] - k + 6], "h(1)", "azul", 21, "start")] },
    ],
  };
};

const angulo = (): Diagrama => {
  const O: Pt = [380, 330];
  const k = 70;
  return {
    label: "Ángulo del plano con el plano del cuadro: abatimiento de la l.m.p.",
    pasos: [
      { texto: "Con la l.m.p. graduada y las horizontales dibujadas, se quiere hallar el ángulo $\\alpha$ del plano con el cuadro.", items: [
        seg([O[0], O[1]], [O[0], O[1] - 3 * k], "verde", false, 4), ...[0, 1, 2, 3].map((n) => seg([O[0] - 200, O[1] - n * k], [O[0] + 200, O[1] - n * k], n === 0 ? "naranja" : "azul", false, n === 0 ? 4 : 2.4)), pt(O, "O", "blanco", 8, 24), pt([O[0], O[1] - 3 * k], "C(3)", "verde", 10, -8),
      ] },
      { texto: "Se **abate** la l.m.p.: sobre $h(3)$ se toman tres unidades hasta $C_0$.", items: [pt([O[0] - 120, O[1] - 3 * k], "C₀", "amarillo", -34, -6), seg([O[0], O[1] - 3 * k], [O[0] - 120, O[1] - 3 * k], "amarillo", true, 3)] },
      { texto: "El ángulo que forma $C_0O$ con la traza es el **ángulo $\\alpha$** del plano.", items: [seg(O, [O[0] - 120, O[1] - 3 * k], "amarillo", false, 4), arc(O, 60, 180, 180 + 0.001, "verde"), txt([O[0] - 70, O[1] - 24], "α", "verde", 24)] },
    ],
  };
};

const casos = (): Diagrama => ({
  label: "Planos particulares en planos acotados",
  pasos: [
    { texto: "Un plano **paralelo al horizontal** no tiene representación gráfica, pero se puede operar con él.", items: [poli([[110, 190], [320, 190], [380, 130], [170, 130]], "azul", 0.18), txt([245, 235], "plano horizontal", "azul", 20)] },
    { texto: "Un plano **perpendicular al plano de proyección** (plano de perfil) se representa por su **traza** y una letra griega.", items: [seg([480, 120], [700, 120], "naranja", false, 4.5), txt([590, 105], "α", "naranja", 24), txt([590, 160], "plano de perfil", "naranja", 20), seg([440, 260], [740, 260], "gris", false, 2.5)] },
    { texto: "Se utiliza para obtener los **perfiles longitudinales y transversales** de un terreno.", items: [lin([[440, 330], [500, 300], [560, 340], [620, 290], [680, 320], [740, 280]], "verde", false, 3.6), txt([590, 380], "perfil del terreno", "verde", 19)] },
  ],
});

const interseccion = (): Diagrama => {
  const P0: Pt = [400, 360];
  const dirA = (n: number): Pt => [P0[0] - 40 - n * 40, P0[1] - n * 90];
  void dirA;
  return {
    label: "Intersección de dos planos: horizontales de igual cota",
    pasos: [
      { texto: "Dos planos $\\alpha$ y $\\beta$ dados por su **l.m.p. graduada**.", items: [
        seg([220, 370], [130, 90], "naranja", false, 3.5), seg([580, 370], [670, 90], "azul", false, 3.5), txt([110, 100], "α", "naranja", 24), txt([690, 100], "β", "azul", 24),
        ...[1, 2, 3].map((n) => pt([220 - n * 30, 370 - n * 93], `${12 + n}`, "naranja", -26, 6)), ...[1, 2, 3].map((n) => pt([580 + n * 30, 370 - n * 93], `${12 + n}`, "azul", 12, 6)),
      ] },
      { texto: "Las **horizontales de la misma cota** de ambos planos son perpendiculares a sus l.m.p.", items: [
        ...[1, 2, 3].map((n) => seg([220 - n * 30 - 100, 370 - n * 93 + 32], [220 - n * 30 + 280, 370 - n * 93 - 108], "naranja", true, 2.2)), ...[1, 2, 3].map((n) => seg([580 + n * 30 + 100, 370 - n * 93 + 32], [580 + n * 30 - 280, 370 - n * 93 - 108], "azul", true, 2.2)),
      ] },
      { texto: "Se cortan en puntos de **igual cota**: unidos forman la **recta intersección** $i'$.", items: [seg([400, 370], [400, 60], "amarillo", false, 4), ...[1, 2, 3].map((n) => pt([400, 370 - n * 93 + 0], `${12 + n}`, "amarillo", 12, -4))] },
    ],
  };
};

const paralelas = (): Diagrama => ({
  label: "Intersección de planos cuyas l.m.p. son paralelas: abatimiento de las dos",
  pasos: [
    { texto: "Si las **trazas son paralelas**, las horizontales de igual cota no se cortan en puntos útiles. Se parte de la recta $AB$ con las dos l.m.p. graduadas.", items: [seg([90, 120], [710, 120], "gris", false, 3), pt([90, 120], "A", "naranja", -4, -12), pt([710, 120], "B", "azul", -4, -12), ...[0, 1, 2, 3].map((n) => pt([90 + n * 40, 120], `${7 + n}`, "naranja", -8, -14)), ...[0, 1, 2, 3].map((n) => pt([710 - n * 60, 120], `${7 + n}`, "azul", -8, -14))] },
    { texto: "Se **abaten** las dos l.m.p. (como para hallar sus ángulos con el cuadro).", items: [seg([90, 120], [210, 330], "naranja", false, 3.4), seg([710, 120], [530, 330], "azul", false, 3.4), seg([210, 120], [210, 330], "gris", true), seg([530, 120], [530, 330], "gris", true)] },
    { texto: "El punto $V_0$ donde se cortan define la intersección, **horizontal** en este caso; su cota se mide desde $V_0$ hasta $AB$.", items: [pt([310, 285], "V₀", "amarillo", 12, 22), seg([310, 120], [310, 285], "amarillo", false, 3.4)] },
  ],
});

const aristaGotera = (): Diagrama => ({
  label: "Arista y gotera",
  pasos: [
    { texto: "**Arista**: las vertientes de lados opuestos de un tejado se cortan en una recta (cumbrera) y las cotas **disminuyen al alejarse** de la intersección.", items: [
      poli([[110, 330], [260, 110], [410, 330]], "azul", 0.14), lin([[110, 330], [260, 110], [410, 330]], "azul", false, 4), txt([260, 95], "arista", "azul", 21), seg([40, 330], [480, 330], "gris", false, 2.5),
    ] },
    { texto: "**Gotera**: las vertientes se unen por abajo y las cotas **aumentan al alejarse** de la intersección (canal de desagüe).", items: [
      lin([[500, 110], [650, 330], [800, 110]], "naranja", false, 4), txt([650, 360], "gotera", "naranja", 21), seg([480, 330], [840, 330], "gris", false, 2.5),
    ] },
  ],
});

const cubiertas = (): Diagrama => ({
  label: "Cubierta de un edificio: planos inclinados desde cada lado de la planta",
  pasos: [
    { texto: "Se parte de la **planta** del edificio: el polígono que forman sus lados.", items: [poli([[180, 330], [620, 330], [620, 130], [180, 130]], "azul", 0.1)] },
    { texto: "Cada **plano inclinado** parte de un lado con su **pendiente**. Las intersecciones de los planos contiguos son las **limatesas**, a 45° si todas son iguales.", items: [seg([180, 330], [280, 230], "naranja", false, 3.4), seg([180, 130], [280, 230], "naranja", false, 3.4), seg([620, 330], [520, 230], "naranja", false, 3.4), seg([620, 130], [520, 230], "naranja", false, 3.4)] },
    { texto: "Las limatesas se encuentran en los extremos de la **cumbrera**, la recta horizontal más alta del tejado.", items: [seg([280, 230], [520, 230], "amarillo", false, 5), txt([400, 215], "cumbrera", "amarillo", 20)] },
  ],
});

const perfiles = (): Diagrama => ({
  label: "Perfil del terreno por un plano vertical",
  pasos: [
    { texto: "Un **plano vertical** corta al terreno según un **perfil**. En planta se ve su traza $AB$ cortando las curvas de nivel.", items: [
      lin(Array.from({ length: 73 }, (_, i) => [400 + 280 * Math.cos((i / 72) * 6.2832), 130 + 90 * Math.sin((i / 72) * 6.2832)] as Pt), "verde", false, 3), lin(Array.from({ length: 73 }, (_, i) => [400 + 190 * Math.cos((i / 72) * 6.2832), 130 + 60 * Math.sin((i / 72) * 6.2832)] as Pt), "verde", false, 3),
      lin(Array.from({ length: 73 }, (_, i) => [400 + 100 * Math.cos((i / 72) * 6.2832), 130 + 32 * Math.sin((i / 72) * 6.2832)] as Pt), "verde", false, 3), seg([90, 130], [710, 130], "amarillo", false, 3.5), txt([90, 112], "A", "amarillo", 22), txt([712, 112], "B", "amarillo", 22, "start"),
    ] },
    { texto: "Por los puntos de corte se trazan **perpendiculares** a $AB$ y sobre ellas se llevan las **cotas**.", items: [...[120, 210, 300, 500, 590, 680].map((x) => seg([x, 130], [x, 330 - [0, 40, 80, 80, 40, 0][[120, 210, 300, 500, 590, 680].indexOf(x)]!], "gris", true, 1.8))] },
    { texto: "Uniendo los puntos se obtiene el **perfil** abatido (con una escala menor para las cotas).", items: [lin([[120, 330], [210, 290], [300, 250], [400, 235], [500, 250], [590, 290], [680, 330]], "naranja", false, 5)] },
  ],
});

const desmonte = (): Diagrama => ({
  label: "Desmonte y terraplén de un camino de pendiente uniforme",
  pasos: [
    { texto: "El perfil del terreno entre $A$ y $B$ y la **rasante** del camino (pendiente uniforme).", items: [lin([[80, 330], [200, 290], [320, 200], [440, 190], [560, 270], [720, 310]], "verde", false, 4.5), seg([80, 300], [720, 220], "amarillo", false, 3.4), txt([60, 306], "A", "amarillo", 22, "end"), txt([740, 226], "B", "amarillo", 22, "start")] },
    { texto: "Donde la rasante queda **por debajo** del terreno hay que **excavar**: es el **desmonte**.", items: [poli([[208, 284], [320, 200], [440, 190], [522, 245]], "rojo", 0.4), txt([370, 160], "desmonte", "rojo", 22)] },
    { texto: "Donde queda **por encima**, hay que **rellenar**: es el **terraplén**.", items: [poli([[80, 300], [208, 284], [200, 290], [80, 330]], "azul", 0.4), poli([[522, 245], [720, 220], [720, 310], [560, 270]], "azul", 0.4), txt([640, 340], "terraplén", "azul", 22)] },
  ],
});

const explanacion = (): Diagrama => ({
  label: "Explanación: plataforma con taludes de desmonte y terraplén",
  pasos: [
    { texto: "Una **explanación** es una plataforma horizontal que se excava o rellena sobre un terreno inclinado.", items: [lin([[60, 130], [360, 230], [560, 330], [740, 350]], "verde", false, 4.5), seg([320, 230], [460, 230], "amarillo", false, 5), txt([390, 215], "plataforma", "amarillo", 20)] },
    { texto: "A un lado, un **talud de desmonte** (pendiente 10/6): corta el terreno hacia arriba.", items: [seg([320, 230], [248, 110], "rojo", false, 4), txt([240, 100], "desmonte p=10/6", "rojo", 18, "end"), pt([270, 150], "N", "rojo", -22, 0)] },
    { texto: "Al otro, un **talud de terraplén** (pendiente 10/9): rellena hasta alcanzar el terreno.", items: [seg([460, 230], [568, 350], "azul", false, 4), txt([580, 372], "terraplén p=10/9", "azul", 18, "start"), pt([548, 330], "M", "azul", 12, -8)] },
  ],
});

export const DIAGRAMAS_ACOTADOS: Record<string, Diagrama> = {
  "d13-uso": uso(), "d13-punto": punto(), "d13-cota": cota(), "d13-recta": recta(), "d13-traza-modulo": trazaModulo(), "d13-lmp": lmp(), "d13-angulo": angulo(),
  "d13-casos": casos(), "d13-interseccion": interseccion(), "d13-paralelas": paralelas(), "d13-arista-gotera": aristaGotera(), "d13-cubiertas": cubiertas(),
  "d13-perfiles": perfiles(), "d13-desmonte": desmonte(), "d13-explanacion": explanacion(),
};
export { circ, fl };
