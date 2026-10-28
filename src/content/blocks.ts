import type { SubjectKey } from "@/lib/navigation/subjects";

/**
 * Bloques de contenido: una segunda forma de recorrer el currículo, transversal a los cursos.
 * Un bloque agrupa las lecciones de un mismo contenido («Fracciones») de todos los cursos
 * de una asignatura, para verlas ordenadas de 1.º ESO a Bachillerato.
 *
 * - El tema (módulo) es la unidad de asignación por defecto.
 * - Cuando un tema mezcla contenidos, `lessons` reasigna lecciones concretas (por `orderIndex`).
 * - Los ejercicios de tema (`topicExercises`) pertenecen al bloque por defecto de su tema.
 */

export type CurriculumBlock = {
  slug: string;
  subject: SubjectKey;
  title: string;
  description: string;
  /** Orden dentro de la asignatura (de lo más básico a lo más avanzado). */
  orderIndex: number;
};

export type ModuleBlockPlan =
  | string
  | {
      /** Bloque del tema y de sus ejercicios de tema. */
      default: string;
      /** `orderIndex` de lección → bloque, para las que no encajan en el bloque del tema. */
      lessons: Record<number, string>;
    };

export const BLOCKS: readonly CurriculumBlock[] = [
  {
    slug: "numeros-naturales-y-enteros",
    subject: "matematicas",
    title: "Números naturales y enteros",
    description: "Sistemas de numeración, operaciones, orden de operaciones y números con signo.",
    orderIndex: 1,
  },
  {
    slug: "divisibilidad",
    subject: "matematicas",
    title: "Divisibilidad",
    description: "Múltiplos y divisores, criterios, números primos, m.c.m. y m.c.d.",
    orderIndex: 2,
  },
  {
    slug: "fracciones",
    subject: "matematicas",
    title: "Fracciones",
    description: "De la parte de la unidad a las operaciones, la fracción como operador y los racionales.",
    orderIndex: 3,
  },
  {
    slug: "numeros-decimales",
    subject: "matematicas",
    title: "Números decimales y aproximación",
    description: "Órdenes decimales, operaciones, periódicos, redondeo, cifras significativas y errores.",
    orderIndex: 4,
  },
  {
    slug: "potencias-y-raices",
    subject: "matematicas",
    title: "Potencias, raíces y números reales",
    description: "Potencias, raíces, notación científica, radicales y números irracionales.",
    orderIndex: 5,
  },
  {
    slug: "proporcionalidad-y-porcentajes",
    subject: "matematicas",
    title: "Proporcionalidad y porcentajes",
    description: "Magnitudes proporcionales, repartos, porcentajes y variaciones porcentuales.",
    orderIndex: 6,
  },
  {
    slug: "medida-y-magnitudes",
    subject: "matematicas",
    title: "Medida y magnitudes",
    description: "Sistema métrico decimal y sistema sexagesimal.",
    orderIndex: 7,
  },
  {
    slug: "lenguaje-algebraico",
    subject: "matematicas",
    title: "Lenguaje algebraico y polinomios",
    description: "Expresiones algebraicas, monomios, polinomios, factor común e identidades notables.",
    orderIndex: 8,
  },
  {
    slug: "ecuaciones",
    subject: "matematicas",
    title: "Ecuaciones e inecuaciones",
    description: "Ecuaciones de primer y segundo grado, problemas e inecuaciones.",
    orderIndex: 9,
  },
  {
    slug: "sistemas-de-ecuaciones",
    subject: "matematicas",
    title: "Sistemas de ecuaciones",
    description: "Ecuaciones con dos incógnitas, métodos de resolución y problemas.",
    orderIndex: 10,
  },
  {
    slug: "progresiones",
    subject: "matematicas",
    title: "Sucesiones y progresiones",
    description: "Término general, progresiones aritméticas y geométricas.",
    orderIndex: 11,
  },
  {
    slug: "funciones-y-graficas",
    subject: "matematicas",
    title: "Funciones y gráficas",
    description: "Coordenadas, concepto de función y características: crecimiento, continuidad y periodicidad.",
    orderIndex: 12,
  },
  {
    slug: "funciones-lineales",
    subject: "matematicas",
    title: "Funciones lineales y rectas",
    description: "Proporcionalidad, función afín, pendiente y ecuaciones de la recta.",
    orderIndex: 13,
  },
  {
    slug: "funciones-elementales",
    subject: "matematicas",
    title: "Parábolas, hipérbolas y exponenciales",
    description: "Funciones cuadráticas, de proporcionalidad inversa, radicales y exponenciales.",
    orderIndex: 14,
  },
  {
    slug: "geometria-plana",
    subject: "matematicas",
    title: "Rectas, ángulos y figuras planas",
    description: "Rectas, ángulos, triángulos, cuadriláteros, polígonos, circunferencia y lugares geométricos.",
    orderIndex: 15,
  },
  {
    slug: "areas-y-perimetros",
    subject: "matematicas",
    title: "Áreas y perímetros",
    description: "Medidas de cuadriláteros, triángulos, polígonos, círculo y figuras curvas.",
    orderIndex: 16,
  },
  {
    slug: "pitagoras-y-semejanza",
    subject: "matematicas",
    title: "Pitágoras y semejanza",
    description: "Teorema de Pitágoras, Tales, figuras semejantes, escalas y homotecia.",
    orderIndex: 17,
  },
  {
    slug: "cuerpos-y-volumenes",
    subject: "matematicas",
    title: "Cuerpos geométricos y volúmenes",
    description: "Poliedros, cuerpos de revolución, superficies y volúmenes.",
    orderIndex: 18,
  },
  {
    slug: "trigonometria",
    subject: "matematicas",
    title: "Trigonometría",
    description: "Razones trigonométricas, relaciones fundamentales y resolución de triángulos rectángulos.",
    orderIndex: 19,
  },
  {
    slug: "geometria-analitica",
    subject: "matematicas",
    title: "Geometría analítica",
    description: "Vectores, distancias, punto medio y ecuaciones de rectas.",
    orderIndex: 20,
  },
  {
    slug: "estadistica",
    subject: "matematicas",
    title: "Estadística",
    description: "Variables, tablas y gráficos, medidas de centralización y de dispersión.",
    orderIndex: 21,
  },
  {
    slug: "probabilidad",
    subject: "matematicas",
    title: "Probabilidad",
    description: "Experimentos aleatorios, regla de Laplace y experiencias compuestas.",
    orderIndex: 22,
  },
  {
    slug: "combinatoria",
    subject: "matematicas",
    title: "Combinatoria",
    description: "Diagrama en árbol, variaciones, permutaciones y combinaciones.",
    orderIndex: 23,
  },
  {
    slug: "numeros-complejos",
    subject: "matematicas",
    title: "Números complejos",
    description: "Unidad imaginaria, forma binómica, plano complejo, forma polar, Moivre y raíces.",
    orderIndex: 24,
  },
  {
    slug: "logaritmos",
    subject: "matematicas",
    title: "Logaritmos",
    description: "Definición, propiedades, cambio de base y escalas logarítmicas.",
    orderIndex: 25,
  },
  {
    slug: "algebra-lineal",
    subject: "matematicas",
    title: "Álgebra lineal",
    description: "Matrices, determinantes y sistemas de ecuaciones lineales.",
    orderIndex: 26,
  },
  {
    slug: "geometria-del-espacio",
    subject: "matematicas",
    title: "Geometría del espacio",
    description: "Vectores, rectas, planos y problemas métricos en el espacio.",
    orderIndex: 27,
  },
  {
    slug: "calculo-integral",
    subject: "matematicas",
    title: "Cálculo integral",
    description: "Primitivas, métodos de integración, integral definida, áreas y volúmenes.",
    orderIndex: 28,
  },
  {
    slug: "programacion-lineal",
    subject: "matematicas",
    title: "Programación lineal",
    description: "Inecuaciones con dos incógnitas, región factible, rectas de nivel y problemas de optimización.",
    orderIndex: 29,
  },
  {
    slug: "materiales",
    subject: "tecnologia",
    title: "Materiales",
    description: "Estructura, propiedades y ensayos; aleaciones, no férreos, tratamientos y corrosión.",
    orderIndex: 1,
  },
  {
    slug: "maquinas-y-motores",
    subject: "tecnologia",
    title: "Máquinas y motores",
    description: "Principios generales de las máquinas, motores térmicos y motores eléctricos.",
    orderIndex: 2,
  },
  {
    slug: "neumatica-e-hidraulica",
    subject: "tecnologia",
    title: "Neumática e hidráulica",
    description: "Automatismos neumáticos y oleohidráulicos.",
    orderIndex: 3,
  },
  {
    slug: "sistemas-de-control",
    subject: "tecnologia",
    title: "Sistemas de control",
    description: "Sistemas automáticos, componentes de un sistema de control y su respuesta.",
    orderIndex: 4,
  },
  {
    slug: "electronica-digital",
    subject: "tecnologia",
    title: "Electrónica digital",
    description: "Álgebra de Boole, circuitos combinacionales y secuenciales.",
    orderIndex: 5,
  },
  {
    slug: "proyectos-tecnologicos",
    subject: "tecnologia",
    title: "Proyectos tecnológicos",
    description: "Investigar, diseñar, planificar, construir, ensayar y documentar una solución técnica.",
    orderIndex: 6,
  },
  {
    slug: "circuitos-electricos-electronicos",
    subject: "tecnologia",
    title: "Circuitos eléctricos y electrónicos",
    description: "Magnitudes eléctricas, ley de Ohm, asociaciones, Kirchhoff, potencia y componentes.",
    orderIndex: 7,
  },
  {
    slug: "programacion",
    subject: "tecnologia",
    title: "Informática y programación",
    description: "Arquitectura, sistemas operativos, datos, algoritmos y programación en Python.",
    orderIndex: 8,
  },
  {
    slug: "expresion-grafica",
    subject: "tecnologia",
    title: "Expresión gráfica",
    description: "Instrumentos, bocetos y croquis, acotación, escalas, vistas y perspectivas.",
    orderIndex: 10,
  },
  {
    slug: "estructuras",
    subject: "tecnologia",
    title: "Estructuras",
    description: "Elementos estructurales, esfuerzos, estabilidad, triangulación y estructuras de edificios y puentes.",
    orderIndex: 11,
  },
  {
    slug: "competencia-digital",
    subject: "tecnologia",
    title: "Competencia digital",
    description: "Dispositivos, almacenamiento, redes, búsqueda de información, seguridad, bienestar digital y propiedad intelectual.",
    orderIndex: 12,
  },
  {
    slug: "tecnologia-sostenible",
    subject: "tecnologia",
    title: "Tecnología sostenible",
    description: "Recursos, eficiencia energética, ciclo de vida, economía circular y renovables.",
    orderIndex: 9,
  },
  {
    slug: "dibujo-geometria-plana",
    subject: "dibujo",
    title: "Geometría plana",
    description: "Lugares geométricos, proporcionalidad, polígonos, tangencias y curvas técnicas.",
    orderIndex: 1,
  },
  {
    slug: "dibujo-sistemas-representacion",
    subject: "dibujo",
    title: "Sistemas de representación",
    description: "Diédrico, axonométrico, planos acotados y perspectiva cónica.",
    orderIndex: 2,
  },
  {
    slug: "dibujo-normalizacion-documentacion",
    subject: "dibujo",
    title: "Normalización y documentación gráfica",
    description: "Escalas, formatos, vistas, líneas normalizadas, acotación y simbología.",
    orderIndex: 3,
  },
  {
    slug: "dibujo-sistemas-cad",
    subject: "dibujo",
    title: "Sistemas CAD",
    description: "Dibujo vectorial 2D, modelado 3D con primitivas y trabajo colaborativo.",
    orderIndex: 4,
  },
  {
    slug: "fisica-metodo-medida",
    subject: "fisica",
    title: "Método científico y medida",
    description: "El método científico, las magnitudes y unidades, el error de medida, las gráficas y el trabajo en el laboratorio.",
    orderIndex: 1,
  },
  {
    slug: "fisica-materia",
    subject: "fisica",
    title: "La materia",
    description: "Propiedades, estados de agregación, mezclas y estructura de la materia.",
    orderIndex: 2,
  },
  {
    slug: "fisica-cambios-quimicos",
    subject: "fisica",
    title: "Cambios y reacciones químicas",
    description: "Cambios físicos y químicos, reacciones, conservación de la masa y combustión.",
    orderIndex: 3,
  },
  {
    slug: "fisica-movimiento-fuerzas",
    subject: "fisica",
    title: "Movimiento y fuerzas",
    description: "Sistemas de referencia, velocidad, movimiento rectilíneo uniforme, fuerzas y su equilibrio.",
    orderIndex: 4,
  },
  {
    slug: "fisica-energia-ondas",
    subject: "fisica",
    title: "Energía, luz y sonido",
    description: "Formas y transformaciones de la energía, calor, fuentes de energía, luz y sonido.",
    orderIndex: 5,
  },
];

/** Clave `<curso>/<tema>` → bloque (o bloque por defecto más reasignaciones de lecciones). */
export const MODULE_BLOCK_PLAN: Readonly<Record<string, ModuleBlockPlan>> = {
  // ── Matemáticas 1.º ESO ────────────────────────────────────────────────
  "matematicas-1-eso/numeros-naturales": "numeros-naturales-y-enteros",
  "matematicas-1-eso/potencias-y-raices": "potencias-y-raices",
  "matematicas-1-eso/divisibilidad": "divisibilidad",
  "matematicas-1-eso/numeros-enteros": "numeros-naturales-y-enteros",
  "matematicas-1-eso/numeros-decimales": "numeros-decimales",
  "matematicas-1-eso/sistema-metrico-decimal": "medida-y-magnitudes",
  "matematicas-1-eso/fracciones": "fracciones",
  "matematicas-1-eso/operaciones-con-fracciones": "fracciones",
  "matematicas-1-eso/proporcionalidad-y-porcentajes": "proporcionalidad-y-porcentajes",
  "matematicas-1-eso/algebra": {
    default: "lenguaje-algebraico",
    lessons: { 3: "ecuaciones", 4: "ecuaciones", 5: "ecuaciones", 6: "ecuaciones" },
  },
  "matematicas-1-eso/rectas-y-angulos": "geometria-plana",
  "matematicas-1-eso/figuras-geometricas": {
    default: "geometria-plana",
    lessons: {
      5: "cuerpos-y-volumenes",
      6: "cuerpos-y-volumenes",
      7: "cuerpos-y-volumenes",
      8: "cuerpos-y-volumenes",
    },
  },
  "matematicas-1-eso/areas-y-perimetros": "areas-y-perimetros",
  "matematicas-1-eso/tablas-y-graficas": {
    default: "funciones-y-graficas",
    lessons: { 4: "estadistica", 5: "estadistica", 6: "estadistica" },
  },
  "matematicas-1-eso/probabilidad": "probabilidad",

  // ── Matemáticas 2.º ESO ────────────────────────────────────────────────
  "matematicas-2-eso/divisibilidad-y-numeros-enteros": {
    default: "divisibilidad",
    lessons: {
      6: "numeros-naturales-y-enteros",
      7: "numeros-naturales-y-enteros",
      8: "potencias-y-raices",
      9: "potencias-y-raices",
    },
  },
  "matematicas-2-eso/sistema-decimal-y-sexagesimal": {
    default: "numeros-decimales",
    lessons: { 5: "potencias-y-raices", 6: "medida-y-magnitudes", 7: "medida-y-magnitudes" },
  },
  "matematicas-2-eso/las-fracciones": "fracciones",
  "matematicas-2-eso/proporcionalidad-y-porcentajes": "proporcionalidad-y-porcentajes",
  "matematicas-2-eso/algebra": "lenguaje-algebraico",
  "matematicas-2-eso/ecuaciones": "ecuaciones",
  "matematicas-2-eso/sistemas-de-ecuaciones": "sistemas-de-ecuaciones",
  "matematicas-2-eso/teorema-de-pitagoras-y-semejanza": "pitagoras-y-semejanza",
  "matematicas-2-eso/cuerpos-geometricos": {
    default: "cuerpos-y-volumenes",
    lessons: { 1: "geometria-plana", 2: "geometria-plana", 3: "geometria-plana", 4: "geometria-plana" },
  },
  "matematicas-2-eso/medida-del-volumen": "cuerpos-y-volumenes",
  "matematicas-2-eso/funciones": {
    default: "funciones-y-graficas",
    lessons: { 3: "funciones-lineales", 4: "funciones-lineales", 5: "funciones-lineales", 6: "funciones-lineales" },
  },
  "matematicas-2-eso/estadistica": "estadistica",

  // ── Matemáticas 3.º ESO ────────────────────────────────────────────────
  "matematicas-3-eso/fracciones-y-decimales": {
    default: "fracciones",
    lessons: { 8: "proporcionalidad-y-porcentajes", 9: "proporcionalidad-y-porcentajes" },
  },
  "matematicas-3-eso/potencias-y-raices": {
    default: "potencias-y-raices",
    lessons: { 4: "numeros-decimales" },
  },
  "matematicas-3-eso/progresiones": "progresiones",
  "matematicas-3-eso/lenguaje-algebraico": "lenguaje-algebraico",
  "matematicas-3-eso/ecuaciones": "ecuaciones",
  "matematicas-3-eso/sistemas-de-ecuaciones": "sistemas-de-ecuaciones",
  "matematicas-3-eso/funciones-y-graficas": "funciones-y-graficas",
  "matematicas-3-eso/funciones-lineales": "funciones-lineales",
  "matematicas-3-eso/problemas-metricos-en-el-plano": {
    default: "areas-y-perimetros",
    lessons: {
      1: "pitagoras-y-semejanza",
      2: "pitagoras-y-semejanza",
      3: "geometria-plana",
      4: "geometria-plana",
    },
  },
  "matematicas-3-eso/cuerpos-geometricos": "cuerpos-y-volumenes",

  // ── Matemáticas 4.º ESO ────────────────────────────────────────────────
  "matematicas-4-eso/numeros-enteros-y-racionales": {
    default: "fracciones",
    lessons: {
      1: "numeros-naturales-y-enteros",
      2: "numeros-naturales-y-enteros",
      3: "potencias-y-raices",
      7: "potencias-y-raices",
    },
  },
  "matematicas-4-eso/numeros-decimales": {
    default: "numeros-decimales",
    lessons: { 6: "potencias-y-raices", 7: "potencias-y-raices" },
  },
  "matematicas-4-eso/numeros-reales": "potencias-y-raices",
  "matematicas-4-eso/problemas-aritmeticos": "proporcionalidad-y-porcentajes",
  "matematicas-4-eso/expresiones-algebraicas": "lenguaje-algebraico",
  "matematicas-4-eso/ecuaciones-e-inecuaciones": "ecuaciones",
  "matematicas-4-eso/sistemas-de-ecuaciones": "sistemas-de-ecuaciones",
  "matematicas-4-eso/funciones-caracteristicas": "funciones-y-graficas",
  "matematicas-4-eso/las-funciones-lineales": "funciones-lineales",
  "matematicas-4-eso/otras-funciones-elementales": "funciones-elementales",
  "matematicas-4-eso/la-semejanza-aplicaciones": "pitagoras-y-semejanza",
  "matematicas-4-eso/geometria-analitica": "geometria-analitica",
  "matematicas-4-eso/estadistica": "estadistica",
  "matematicas-4-eso/calculo-de-probabilidades": "probabilidad",

  // ── Matemáticas 4.º ESO (B) ────────────────────────────────────────────
  "matematicas-4-eso-b/numeros-reales": {
    default: "potencias-y-raices",
    lessons: { 10: "numeros-decimales", 11: "numeros-decimales" },
  },
  "matematicas-4-eso-b/polinomios-y-fracciones-algebraicas": "lenguaje-algebraico",
  "matematicas-4-eso-b/ecuaciones-inecuaciones-y-sistemas": {
    default: "ecuaciones",
    lessons: {
      6: "sistemas-de-ecuaciones",
      7: "sistemas-de-ecuaciones",
      8: "sistemas-de-ecuaciones",
      9: "sistemas-de-ecuaciones",
      10: "sistemas-de-ecuaciones",
      11: "sistemas-de-ecuaciones",
      12: "sistemas-de-ecuaciones",
      13: "sistemas-de-ecuaciones",
    },
  },
  "matematicas-4-eso-b/funciones-caracteristicas": "funciones-y-graficas",
  "matematicas-4-eso-b/funciones-elementales": {
    default: "funciones-elementales",
    lessons: { 1: "funciones-lineales", 2: "funciones-lineales", 3: "funciones-lineales", 4: "funciones-lineales", 5: "funciones-lineales", 6: "funciones-lineales", 7: "funciones-lineales", 8: "funciones-lineales" },
  },
  "matematicas-4-eso-b/la-semejanza-aplicaciones": "pitagoras-y-semejanza",
  "matematicas-4-eso-b/trigonometria": "trigonometria",
  "matematicas-4-eso-b/geometria-analitica": "geometria-analitica",
  "matematicas-4-eso-b/estadistica": "estadistica",
  "matematicas-4-eso-b/calculo-de-probabilidades": "probabilidad",
  "matematicas-4-eso-b/combinatoria": "combinatoria",

  // ── Matemáticas 1.º Bachillerato ───────────────────────────────────────
  "matematicas-1-bachillerato/numeros-reales-y-complejos": {
    default: "potencias-y-raices",
    lessons: {
      6: "numeros-decimales", 7: "numeros-decimales",
      8: "numeros-complejos", 9: "numeros-complejos", 10: "numeros-complejos", 11: "numeros-complejos", 12: "numeros-complejos", 13: "numeros-complejos",
      14: "logaritmos", 15: "logaritmos",
    },
  },
  "matematicas-1-bachillerato/geometria": "geometria-analitica",
  "matematicas-1-bachillerato/trigonometria": "trigonometria",
  "matematicas-1-bachillerato/funciones": "funciones-elementales",
  "matematicas-1-bachillerato/limites-y-continuidad": "funciones-elementales",
  "matematicas-1-bachillerato/derivadas": "funciones-elementales",
  "matematicas-1-bachillerato/probabilidad": "probabilidad",
  "matematicas-1-bachillerato/estadistica": "estadistica",
  "matematicas-1-bachillerato/sucesiones": {
    default: "progresiones",
    lessons: { 10: "funciones-elementales" },
  },
  "matematicas-1-bachillerato/algebra": {
    default: "lenguaje-algebraico",
    lessons: {
      7: "ecuaciones", 8: "ecuaciones", 9: "ecuaciones", 10: "ecuaciones", 11: "ecuaciones",
      12: "sistemas-de-ecuaciones", 13: "sistemas-de-ecuaciones", 14: "sistemas-de-ecuaciones", 15: "sistemas-de-ecuaciones",
    },
  },

  "matematicas-ccss-1-bachillerato/numeros-reales": { default: "potencias-y-raices", lessons: { 5: "numeros-decimales", 13: "numeros-decimales", 14: "logaritmos", 15: "logaritmos" } },
  "matematicas-ccss-1-bachillerato/matematica-financiera": "proporcionalidad-y-porcentajes",
  "matematicas-ccss-1-bachillerato/algebra": { default: "lenguaje-algebraico", lessons: { 7: "ecuaciones", 8: "ecuaciones", 9: "ecuaciones", 10: "ecuaciones", 11: "ecuaciones", 12: "ecuaciones", 13: "ecuaciones", 14: "ecuaciones", 15: "sistemas-de-ecuaciones", 16: "sistemas-de-ecuaciones", 17: "sistemas-de-ecuaciones", 18: "sistemas-de-ecuaciones", 19: "sistemas-de-ecuaciones", 20: "sistemas-de-ecuaciones" } },
  "matematicas-ccss-1-bachillerato/funciones": "funciones-elementales",
  "matematicas-ccss-1-bachillerato/limites-y-continuidad": "funciones-elementales",
  "matematicas-ccss-1-bachillerato/derivadas": "funciones-elementales",
  "matematicas-ccss-1-bachillerato/estadistica": "estadistica",
  "matematicas-ccss-1-bachillerato/probabilidad": "probabilidad",
  "matematicas-ccss-1-bachillerato/combinatoria": "combinatoria",
  "matematicas-ccss-1-bachillerato/distribuciones": "probabilidad",
  // ── Tecnología Industrial II (2.º Bachillerato) ────────────────────────
  "tecnologia-industrial-2-bachillerato/estructura-materiales-ensayos": "materiales",
  "tecnologia-industrial-2-bachillerato/aleaciones-diagramas-equilibrio": "materiales",
  "tecnologia-industrial-2-bachillerato/materiales-no-ferreos-reciclaje": "materiales",
  "tecnologia-industrial-2-bachillerato/tratamientos-termicos-corrosion": "materiales",
  "tecnologia-industrial-2-bachillerato/principios-generales-maquinas": "maquinas-y-motores",
  "tecnologia-industrial-2-bachillerato/motores-termicos-circuitos-frigorificos": "maquinas-y-motores",
  "tecnologia-industrial-2-bachillerato/magnetismo-motores-electricos": "maquinas-y-motores",
  "tecnologia-industrial-2-bachillerato/automatizacion-neumatica": "neumatica-e-hidraulica",
  "tecnologia-industrial-2-bachillerato/automatismos-oleohidraulicos": "neumatica-e-hidraulica",
  "tecnologia-industrial-2-bachillerato/sistemas-automaticos": "sistemas-de-control",
  "tecnologia-industrial-2-bachillerato/componentes-sistema-control": "sistemas-de-control",
  "tecnologia-industrial-2-bachillerato/circuitos-combinacionales-boole": "electronica-digital",
  "tecnologia-industrial-2-bachillerato/circuitos-secuenciales-control-cableado": "electronica-digital",
  // ── Tecnología 1.º ESO ──
  "tecnologia-1-eso/tecnologia-proceso-tecnologico": "proyectos-tecnologicos",
  "tecnologia-1-eso/expresion-comunicacion-grafica": "expresion-grafica",
  "tecnologia-1-eso/materiales-uso-tecnico": "materiales",
  "tecnologia-1-eso/estructuras": "estructuras",
  "tecnologia-1-eso/mecanismos-basicos": "maquinas-y-motores",
  "tecnologia-1-eso/iniciacion-electricidad": "circuitos-electricos-electronicos",
  "tecnologia-1-eso/pensamiento-computacional": "programacion",
  "tecnologia-1-eso/tecnologia-sostenible": "tecnologia-sostenible",
  "tecnologia-1-eso/digitalizacion-entorno-personal": "competencia-digital",
  "tecnologia-1-eso/comunicacion-difusion-ideas": "expresion-grafica",
  // ── Tecnología 2.º ESO ──
  "tecnologia-2-eso/electricidad": "circuitos-electricos-electronicos",
  "tecnologia-2-eso/estructuras-mecanismos": "estructuras",
  "tecnologia-2-eso/programacion": "programacion",
  "tecnologia-2-eso/dibujo-tecnico-diseno-digital": "expresion-grafica",
  "tecnologia-2-eso/materiales-fabricacion": "materiales",
  "tecnologia-2-eso/proyecto-tecnologico": "proyectos-tecnologicos",
  "tecnologia-2-eso/digitalizacion-entorno-personal": "competencia-digital",
  "tecnologia-2-eso/tecnologia-sostenible": "tecnologia-sostenible",
  // ── Tecnología 3.º ESO ──
  "tecnologia-3-eso/electricidad-electronica": "circuitos-electricos-electronicos",
  "tecnologia-3-eso/control-automatizacion": "sistemas-de-control",
  "tecnologia-3-eso/programacion-robotica": "programacion",
  "tecnologia-3-eso/redes-dispositivos-digitales": "competencia-digital",
  "tecnologia-3-eso/mecanismos-maquinas": "maquinas-y-motores",
  "tecnologia-3-eso/materiales-procesos": "materiales",
  "tecnologia-3-eso/desarrollo-proyectos": "proyectos-tecnologicos",
  "tecnologia-3-eso/tecnologia-sostenible": "tecnologia-sostenible",
  // ── Tecnología 4.º ESO ──
  "tecnologia-4-eso/electricidad-electronica": "circuitos-electricos-electronicos",
  "tecnologia-4-eso/pensamiento-computacional": "programacion",
  "tecnologia-4-eso/automatizacion-robotica": "sistemas-de-control",
  "tecnologia-4-eso/sistemas-mecanicos": "maquinas-y-motores",
  "tecnologia-4-eso/materiales-fabricacion": "materiales",
  "tecnologia-4-eso/proyectos-ingenieria": "proyectos-tecnologicos",
  "tecnologia-4-eso/tecnologia-sostenible": "tecnologia-sostenible",
  "tecnologia-4-eso/taller-simulacion-fabricacion": "materiales",
  // ── Tecnología e Ingeniería I (1.º Bachillerato) ───────────────────────
  "tecnologia-ingenieria-1-bachillerato/proyectos-investigacion-desarrollo": "proyectos-tecnologicos",
  "tecnologia-ingenieria-1-bachillerato/materiales-fabricacion": "materiales",
  "tecnologia-ingenieria-1-bachillerato/sistemas-mecanicos": "maquinas-y-motores",
  "tecnologia-ingenieria-1-bachillerato/sistemas-electricos-electronicos": "circuitos-electricos-electronicos",
  "tecnologia-ingenieria-1-bachillerato/sistemas-informaticos-programacion": "programacion",
  "tecnologia-ingenieria-1-bachillerato/sistemas-automaticos-control": "sistemas-de-control",
  "tecnologia-ingenieria-1-bachillerato/tecnologia-sostenible": "tecnologia-sostenible",
  "tecnologia-ingenieria-2-bachillerato/estructuras": "estructuras",
  "tecnologia-ingenieria-2-bachillerato/sistemas-informaticos-emergentes": "competencia-digital",
  "tecnologia-ingenieria-2-bachillerato/corriente-alterna": "circuitos-electricos-electronicos",
  "tecnologia-ingenieria-2-bachillerato/proyectos-id": "proyectos-tecnologicos",
  "tecnologia-ingenieria-2-bachillerato/impacto-sostenibilidad-ingenieria": "tecnologia-sostenible",
  "fisica-2-eso/actividad-cientifica": "fisica-metodo-medida",
  "fisica-2-eso/materia-propiedades": "fisica-materia",
  "fisica-2-eso/sustancias-puras-mezclas": "fisica-materia",
  "fisica-2-eso/estructura-materia": "fisica-materia",
  "fisica-2-eso/cambios-fisicos-quimicos": "fisica-cambios-quimicos",
  "fisica-2-eso/el-movimiento": "fisica-movimiento-fuerzas",
  "fisica-2-eso/las-fuerzas": "fisica-movimiento-fuerzas",
  "fisica-2-eso/la-energia": "fisica-energia-ondas",
  "fisica-2-eso/la-luz-y-el-sonido": "fisica-energia-ondas",
  "dibujo-tecnico-2-bachillerato/geometria-arquitectura-ingenieria": "dibujo-geometria-plana",
  "dibujo-tecnico-2-bachillerato/homologia-afinidad": "dibujo-geometria-plana",
  "dibujo-tecnico-2-bachillerato/potencia-eje-radical-tangencias": "dibujo-geometria-plana",
  "dibujo-tecnico-2-bachillerato/curvas-conicas": "dibujo-geometria-plana",
  "dibujo-tecnico-2-bachillerato/diedrico-avanzado": "dibujo-sistemas-representacion",
  "dibujo-tecnico-2-bachillerato/cuerpos-diedrico": "dibujo-sistemas-representacion",
  "dibujo-tecnico-2-bachillerato/axonometrico-conico-acotados": "dibujo-sistemas-representacion",
  "dibujo-tecnico-2-bachillerato/normalizacion-proyecto": "dibujo-normalizacion-documentacion",
  "dibujo-tecnico-2-bachillerato/sistemas-cad": "dibujo-sistemas-cad",
  "dibujo-tecnico-1-bachillerato/historia-fundamentos-geometricos": "dibujo-geometria-plana",
  "dibujo-tecnico-1-bachillerato/proporcionalidad-equivalencia-semejanza": "dibujo-geometria-plana",
  "dibujo-tecnico-1-bachillerato/triangulos-cuadrilateros-poligonos": "dibujo-geometria-plana",
  "dibujo-tecnico-1-bachillerato/tangencias-curvas-tecnicas": "dibujo-geometria-plana",
  "dibujo-tecnico-1-bachillerato/sistema-diedrico-punto-recta-plano": "dibujo-sistemas-representacion",
  "dibujo-tecnico-1-bachillerato/sistema-diedrico-relaciones-distancias": "dibujo-sistemas-representacion",
  "dibujo-tecnico-1-bachillerato/sistemas-axonometricos": "dibujo-sistemas-representacion",
  "dibujo-tecnico-1-bachillerato/planos-acotados-conico": "dibujo-sistemas-representacion",
  "dibujo-tecnico-1-bachillerato/normalizacion-documentacion-grafica": "dibujo-normalizacion-documentacion",
  "dibujo-tecnico-1-bachillerato/sistemas-cad": "dibujo-sistemas-cad",
  "matematicas-2-bachillerato/matrices": "algebra-lineal",
  "matematicas-2-bachillerato/determinantes": "algebra-lineal",
  "matematicas-2-bachillerato/sistemas-de-ecuaciones": "algebra-lineal",
  "matematicas-2-bachillerato/vectores-en-el-espacio": "geometria-del-espacio",
  "matematicas-2-bachillerato/rectas-y-planos": "geometria-del-espacio",
  "matematicas-2-bachillerato/geometria-metrica": "geometria-del-espacio",
  "matematicas-2-bachillerato/limites-y-continuidad": "funciones-elementales",
  "matematicas-2-bachillerato/derivadas": "funciones-elementales",
  "matematicas-2-bachillerato/representacion-de-funciones": "funciones-elementales",
  "matematicas-2-bachillerato/integrales": "calculo-integral",
  "matematicas-2-bachillerato/probabilidad-y-combinatoria": "probabilidad",
  "matematicas-2-bachillerato/distribuciones-de-probabilidad": "probabilidad",
  "matematicas-ccss-2-bachillerato/matrices": "algebra-lineal",
  "matematicas-ccss-2-bachillerato/sistemas-de-ecuaciones": "algebra-lineal",
  "matematicas-ccss-2-bachillerato/programacion-lineal": "programacion-lineal",
  "matematicas-ccss-2-bachillerato/limites-y-continuidad": "funciones-elementales",
  "matematicas-ccss-2-bachillerato/derivadas": "funciones-elementales",
  "matematicas-ccss-2-bachillerato/integrales": "calculo-integral",
  "matematicas-ccss-2-bachillerato/probabilidad": "probabilidad",
  "matematicas-ccss-2-bachillerato/estimacion": "estadistica",
};

export function moduleBlockKey(courseSlug: string, moduleSlug: string): string {
  return `${courseSlug}/${moduleSlug}`;
}

export function getBlocksForSubject(subject: SubjectKey): CurriculumBlock[] {
  return BLOCKS.filter((block) => block.subject === subject).sort(
    (a, b) => a.orderIndex - b.orderIndex,
  );
}

export function getBlock(subject: SubjectKey, slug: string): CurriculumBlock | undefined {
  return BLOCKS.find((block) => block.subject === subject && block.slug === slug);
}

/** Bloque por defecto de un tema; también es el bloque de sus ejercicios de tema. */
export function getModuleBlockSlug(courseSlug: string, moduleSlug: string): string | undefined {
  const plan = MODULE_BLOCK_PLAN[moduleBlockKey(courseSlug, moduleSlug)];
  if (!plan) {
    return undefined;
  }
  return typeof plan === "string" ? plan : plan.default;
}

export function getLessonBlockSlug(
  courseSlug: string,
  moduleSlug: string,
  lessonOrderIndex: number,
): string | undefined {
  const plan = MODULE_BLOCK_PLAN[moduleBlockKey(courseSlug, moduleSlug)];
  if (!plan) {
    return undefined;
  }
  if (typeof plan === "string") {
    return plan;
  }
  return plan.lessons[lessonOrderIndex] ?? plan.default;
}
