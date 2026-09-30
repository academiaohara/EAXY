import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8001-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Los números naturales» (1.º ESO, unidad 1). */
export const numerosNaturalesTopicExercises: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Números romanos del temario",
    statement:
      "Escribe en números romanos: a) $42$ b) $159$ c) $2185$. Traduce al decimal: d) XIV e) XC f) MCCLXXX.",
    solutionText:
      "a) $42 = 40 + 2 = XLII$\nb) $159 = 100 + 50 + 9 = CLIX$\nc) $2185 = 2000 + 100 + 80 + 5 = MMCLXXXV$\nd) XIV $= 10 + (5 - 1) = 14$\ne) XC $= (100 - 10) = 90$\nf) MCCLXXX $= 1000 + 100 + 100 + 50 + 10 + 10 + 10 = 1280$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Romanos en recuadro",
    statement: "¿Qué número decimal representa cada cantidad romana? a) XLIX b) CCLX c) MCCCVI.",
    solutionText:
      "a) XLIX $= (50 - 10) + (10 - 1) = 40 + 9 = 49$\nb) CCLX $= 100 + 100 + 50 + 10 = 260$\nc) MCCCVI $= 1000 + 100 + 100 + 100 + 5 + 1 = 1306$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Órdenes en el sistema decimal",
    statement:
      "a) ¿Cuántos millares hay en $40$ centenas?\nb) ¿Cuántas decenas son tres unidades de millar?\nc) ¿Cuántos millares hay en dos millones?\nd) ¿Cuántas unidades de millar forman medio millón?",
    solutionText:
      "a) $40$ centenas $= 40 \\cdot 100 = 4000$ unidades $= 4$ millares.\nb) Tres unidades de millar $= 3000$ unidades; $3000 : 10 = 300$ decenas.\nc) Dos millones $= 2\\,000\\,000$ unidades $= 2000$ millares.\nd) Medio millón $= 500\\,000$ unidades $= 500$ unidades de millar.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Redondeo a decenas y millares",
    statement:
      "Redondea: a) $458$ a las decenas. b) $24\\,963$ a los millares. c) $293\\,518$ a las decenas de millar.",
    solutionText:
      "a) La cifra de unidades es $8 \\geq 5$, subimos: $458 \\longrightarrow 460$.\nb) Miramos centenas ($9 \\geq 5$): $24\\,963 \\longrightarrow 25\\,000$.\nc) Miramos cifra de millar ($3 < 5$): $293\\,518 \\longrightarrow 290\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Compra con rebajas (Jorge)",
    statement:
      "Jorge compra una camisa de $54$ € y unos pantalones de $79$ €. En la camisa le rebajan $6$ € y en los pantalones, $15$ €. ¿Cuánto gasta?",
    solutionText:
      "Precio final de la camisa: $54 - 6 = 48$ €.\nPrecio final de los pantalones: $79 - 15 = 64$ €.\nTotal gastado: $48 + 64 = 112$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Peso del elefante pequeño",
    statement:
      "En una báscula, un lado marca $1588$ kg más el elefante pequeño y el otro lado marca $845$ kg y $1107$ kg. ¿Cuánto pesa el elefante pequeño?",
    solutionText:
      "Igualamos los dos lados en equilibrio:\n$1588 + x = 845 + 1107$\n$1588 + x = 1952$\n$x = 1952 - 1588 = 364$ kg.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Ahorro mensual de Teresa",
    statement:
      "Teresa gana $1670$ € al mes. Paga una letra de $384$ € y tiene otros gastos de $950$ €. ¿Cuánto ahorra cada mes?",
    solutionText:
      "Gastos totales: $384 + 950 = 1334$ €.\nAhorro: $1670 - 1334 = 336$ € al mes.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Compra aplazada (familia Antúnez)",
    statement:
      "Para comprar un sofá de $1458$ € y un sillón de $324$ €, la familia entrega $750$ € en efectivo y aplaza el resto. ¿A cuánto asciende la deuda?",
    solutionText:
      "Precio total: $1458 + 324 = 1782$ €.\nEntregado en efectivo: $750$ €.\nDeuda aplazada: $1782 - 750 = 1032$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Valor de la captura de merluza",
    statement:
      "Un barco pesquero captura $240$ kg de merluza que se vende a $11$ € el kilo. ¿Cuál es el valor total de la captura?",
    solutionText:
      "Valor total $= 240 \\cdot 11 = 2640$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Ventanas del edificio",
    statement:
      "Un edificio tiene $27$ plantas. En cada planta hay $12$ viviendas y en cada vivienda, $7$ ventanas. ¿Cuántas ventanas hay en total?",
    solutionText:
      "Ventanas por planta: $12 \\cdot 7 = 84$.\nTotal en el edificio: $27 \\cdot 84 = 2268$ ventanas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Patas en la granja",
    statement:
      "En una granja hay $38$ vacas y $15$ caballos. ¿Cuántas patas suman en total?",
    solutionText:
      "Cada animal tiene $4$ patas.\nTotal de animales: $38 + 15 = 53$.\nPatas: $53 \\cdot 4 = 212$ patas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Peso medio de un caballo",
    statement:
      "Un camión transporta $14$ caballos con una carga total de $4830$ kg. ¿Cuánto pesa, por término medio, cada caballo?",
    solutionText:
      "Peso medio $= 4830 : 14 = 345$ kg por caballo.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Reparto del premio de quinielas",
    statement:
      "Cinco amigos ganan un premio de $13\\,285$ €. ¿Qué cantidad corresponde a cada uno si reparten por partes iguales?",
    solutionText:
      "Cada uno recibe: $13\\,285 : 5 = 2657$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Operaciones combinadas",
    statement: "Calcula: a) $4 \\cdot 5 - 3 \\cdot 4 - 2$ b) $2 + 3 \\cdot (7 - 4)$.",
    solutionText:
      "a) Multiplicaciones primero: $20 - 12 - 2 = 8 - 2 = 6$.\nb) Paréntesis: $7 - 4 = 3$; multiplicación: $3 \\cdot 3 = 9$; suma: $2 + 9 = 11$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Venta del hortelano (consolidación)",
    statement:
      "Un hortelano lleva al mercado $85$ kg de tomates y $35$ kg de frambuesas. Vende los tomates a $2$ €/kg y las frambuesas a $3$ €/kg. ¿Cuánto obtiene por toda la mercancía?",
    solutionText:
      "Tomates: $85 \\cdot 2 = 170$ €.\nFrambuesas: $35 \\cdot 3 = 105$ €.\nIngreso total: $170 + 105 = 275$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Botellas del camión de reparto",
    statement:
      "Un camión lleva $15$ cajas de refrescos de naranja y $12$ de limón. Cada caja contiene $24$ botellas. ¿Cuántas botellas lleva en total?",
    solutionText:
      "Cajas totales: $15 + 12 = 27$.\nBotellas: $27 \\cdot 24 = 648$ botellas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Población esperada del pueblo",
    statement:
      "Un pueblo tiene $2000$ habitantes y se espera un aumento del $50\\%$ en diez años. ¿Qué población se prevé?",
    solutionText:
      "El $50\\%$ de $2000$ es $1000$ habitantes más.\nPoblación prevista: $2000 + 1000 = 3000$ habitantes.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
