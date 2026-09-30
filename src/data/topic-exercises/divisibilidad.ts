import type { CurriculumTopicExercise } from "@/content/types";
import { divisibilidadTopicExercisesExtra } from "@/data/topic-exercises/divisibilidad-extra";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8003-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Ejercicios resueltos del tema «Divisibilidad» (1.º ESO, unidad 3). */
const divisibilidadTopicExercisesBase: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(1),
    title: "Envíos a Valencia y Sevilla (act. 5, p. 35)",
    statement:
      "Una fábrica envía mercancía a Valencia cada $6$ días y a Sevilla cada $8$ días. Hoy coinciden los envíos. ¿Cuánto tardarán en volver a coincidir?",
    solutionText:
      "Buscamos el mínimo común múltiplo de $6$ y $8$.\n$m.c.m.(6,8)=24$ días.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(2),
    title: "Columnas de cubos (act. 6, p. 35)",
    statement:
      "Dos columnas iguales: cubos de $40$ cm y cubos de $30$ cm. La altura supera $2$ m pero no llega a $3$ m. ¿Qué altura alcanzan?",
    solutionText:
      "$m.c.m.(40,30)=120$ cm por piso común.\nEntre $200$ cm y $300$ cm: $120\\cdot2=240$ cm $=2{,}4$ m.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(3),
    title: "Autobuses rojo y verde (act. 7, p. 35)",
    statement:
      "La línea roja pasa cada $20$ min y la verde cada $30$ min. Si coinciden a las $14{:}00$, ¿cuándo vuelven a coincidir?",
    solutionText:
      "$m.c.m.(20,30)=60$ minutos.\nVuelven a coincidir a las **$15{:}00$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(4),
    title: "Gatos y perros en jaulas (ejemplo p. 36)",
    statement:
      "Hay $8$ gatos y $12$ perros. Se transportan en jaulas iguales, lo más grandes posible, con el mismo número de animales en cada jaula. ¿Cuántos por jaula?",
    solutionText:
      "Divisores comunes de $8$ y $12$: $1,2,4$.\n$m.c.d.(8,12)=4$ animales por jaula (jaulas de $4$ inquilinos).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(5),
    title: "Monedas de Rosa (act. 5, p. 37)",
    statement:
      "Rosa paga un bolígrafo de $70$ cént y un rotulador de $80$ cént con monedas iguales, sin cambio. ¿Qué valor puede tener cada moneda?",
    solutionText:
      "El valor debe dividir a $70$ y $80$.\n$m.c.d.(70,80)=10$ céntimos.\nTambién valen $2$, $5$ o $10$ cént (divisores comunes); la mayor moneda posible es **$10$ cént**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(6),
    title: "Listones del carpintero (act. 6, p. 37)",
    statement:
      "Listones de $180$ cm y $240$ cm se cortan en trozos iguales, lo más largos posible, sin desperdicio. ¿Longitud de cada trozo?",
    solutionText: "$m.c.d.(180,240)=60$ cm por trozo.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(7),
    title: "Antonio y Julio (problema 17, p. 39)",
    statement:
      "Antonio tiene entre $40$ y $50$ años, el triple que su hijo Julio, que tiene menos de $15$. ¿Cuántos años tiene cada uno?",
    solutionText:
      "Probamos edades de Julio menores de $15$:\nSi Julio tiene $14$ años, Antonio tiene $42$ (está entre $40$ y $50$).\n**Antonio: $42$ años; Julio: $14$ años.**",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(8),
    title: "Cromos de Ricardo (problema 18, p. 39)",
    statement:
      "Ricardo ordena sus cromos en parejas, tríos y grupos de cinco. Tiene más de $80$ y menos de $100$. ¿Cuántos cromos tiene?",
    solutionText:
      "El total debe ser múltiplo de $2$, de $3$ y de $5$ → múltiplo de $30$.\nEntre $80$ y $100$: **$90$ cromos**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(9),
    title: "Mantecados de Raquel (problema 19, p. 39)",
    statement:
      "Raquel envasa $64$ mantecados en cajas iguales, sin sobrar. ¿Cuántas cajas puede llenar en cada reparto posible?",
    solutionText:
      "Cada reparto corresponde a un divisor de $64$:\n$1,2,4,8,16,32,64$ cajas (con $64,32,16,8,4,2,1$ mantecados por caja).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(10),
    title: "Pilas de tablones (problema 20, p. 39)",
    statement:
      "Pilas de tablones de $35$ mm (pino) y $20$ mm (roble) tienen la misma altura. Da al menos tres alturas posibles.",
    solutionText:
      "$m.c.m.(35,20)=140$ mm.\nOtras alturas comunes: $280$ mm, $420$ mm, … (múltiplos de $140$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(11),
    title: "Balanza vasos y tazas (problema 21, p. 39)",
    statement:
      "Un vaso pesa $75$ g y una taza $60$ g. ¿Cuántos vasos y tazas en cada plato para equilibrar la balanza?",
    solutionText:
      "Igualamos pesos: $75v=60t$ → $5v=4t$.\nSolución mínima: **$4$ vasos** ($300$ g) y **$5$ tazas** ($300$ g).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(12),
    title: "Camisetas y zapatillas (problema 22, p. 39)",
    statement:
      "Se intercambia valor entre camisetas de $24$ € y zapatillas de $30$ € a precio unitario. ¿Cuántas de cada tipo equivalen al mismo dinero?",
    solutionText:
      "Igualamos importes: m.c.m. de precios en unidades mínimas.\n$120$ €: **$5$ camisetas** ($5\\cdot24$) = **$4$ zapatillas** ($4\\cdot30$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(13),
    title: "Campamento en cabañas (problema 23, p. 39)",
    statement:
      "$60$ niños y $36$ padres van a un campamento. Cada cabaña lleva el mismo número de personas del mismo grupo (padres aparte de niños). ¿Cuántos por cabaña usando el máximo posible?",
    solutionText:
      "Buscamos el $m.c.d.(60,36)=12$ personas por cabaña.\nNiños: $60:12=5$ cabañas. Padres: $36:12=3$ cabañas.\n**$12$ personas por cabaña** (mínimo número de cabañas para ese reparto).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Rondas de vigilantes (autoeval. 8, p. 39)",
    statement:
      "Un vigilante completa la ronda cada $30$ min y otro cada $40$ min. Empiezan juntos a las $22{:}00$. ¿Cuándo coinciden de nuevo?",
    solutionText:
      "$m.c.m.(30,40)=120$ min $=2$ h.\nVuelven a coincidir a las **$00{:}00$** (medianoche).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];

export const divisibilidadTopicExercises: CurriculumTopicExercise[] = [
  ...divisibilidadTopicExercisesBase,
  ...divisibilidadTopicExercisesExtra,
];
