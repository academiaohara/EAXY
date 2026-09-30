import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8003-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades, consolidación y autoevaluación — unidad 3 Divisibilidad. */
export const divisibilidadTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(15),
    title: "Comprueba divisibilidad (act. 1, p. 29)",
    statement:
      "Completa: a) $35$ y $5$ b) $42$ y $6$ c) $100$ y $25$ d) $108$ y $18$.",
    solutionText:
      "a) $35:5=7$ → **sí** es divisible.\nb) $42:6=7$ → **sí**.\nc) $100:25=4$ → **sí**.\nd) $108:18=6$ → **sí**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "¿Es $a$ divisible entre $b$? (act. 2)",
    statement:
      "Justifica: a) $a=90$, $b=30$ b) $a=185$, $b=15$ c) $a=182$, $b=14$ d) $a=2030$, $b=10$.",
    solutionText:
      "a) $90:30=3$ → **sí**.\nb) $185:15$ no es entero → **no**.\nc) $182:14=13$ → **sí**.\nd) $2030:10=203$ → **sí**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Parejas en divisibilidad (act. 3)",
    statement:
      "¿Están emparentados por divisibilidad? a) $224$ y $16$ b) $420$ y $35$ c) $613$ y $13$ d) $513$ y $19$ e) $688$ y $44$ f) $2070$ y $46$.",
    solutionText:
      "a) Sí ($224:16=14$).\nb) Sí ($420:35=12$).\nc) No ($613:13$ no es exacto).\nd) Sí ($513:19=27$).\ne) No.\nf) Sí ($2070:46=45$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Verdadero o falso (act. 5, p. 29)",
    statement:
      "Indica V o F: a) $15$ cabe $4$ veces en $60$ b) $75$ cabe $3$ veces en $225$ c) $42$ es divisible entre $7$ d) $54$ es divisible entre $8$ e) $65$ contiene a $13$ un número exacto de veces.",
    solutionText:
      "a) V ($60:15=4$).\nb) V ($225:75=3$).\nc) V ($42:7=6$).\nd) F ($54:8$ no es entero).\ne) V ($65:13=5$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Múltiplo o divisor (act. 6–8)",
    statement:
      "a) Completa con $18$, $2$ y $6$. b) ¿Por qué $518$ es múltiplo de $37$? c) ¿Es $23$ divisor de $345$?",
    solutionText:
      "a) $18$ es múltiplo de $6$; $2$ es divisor de $18$ (también $18$ múltiplo de $2$, $6$ divisor de $18$).\nb) $518:37=14$ → cabe un número exacto de veces.\nc) $345:23=15$ → **sí**, $23$ es divisor de $345$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Divisores y múltiplos en listas (act. 10–11)",
    statement:
      "De la lista $5,10,15,20,30,35,45,60,75,90$: a) divisores de $90$ b) múltiplos de $3$. De $8,10,20,24,30,45,60,75,95,120$: c) múltiplos de $4$ d) de $10$ e) de $15$.",
    solutionText:
      "a) $5,10,15,30,45,90$.\nb) $15,30,45,60,75,90$.\nc) $8,20,24,60,120$.\nd) $10,20,30,60,120$.\ne) $30,45,60,75,120$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Series de múltiplos (act. 1–2, p. 30)",
    statement:
      "Escribe tres múltiplos de $5$, $12$ y $19$. Añade cuatro términos a: múltiplos de $6$ ($6,12,18,24,\\ldots$), de $15$ y de $53$.",
    solutionText:
      "Ejemplos: múltiplos de $5$: $5,10,15$. De $12$: $12,24,36$. De $19$: $19,38,57$.\nSeries: $6,12,18,24,30,36,42,48$; $15,30,45,60,75,90,105,120$; $53,106,159,212,265,318,371,424$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Múltiplos de 6 y de 5 (act. 3–5, p. 30)",
    statement:
      "Entre $10,12,16,30,42,54,60,76,90,148,174$, ¿cuáles son múltiplos de $6$? Escribe los diez primeros múltiplos de $25$. ¿Qué observas en los múltiplos de $5$?",
    solutionText:
      "Múltiplos de $6$: $12,30,42,54,60,90,174$.\nDiez primeros múltiplos de $25$: $25,50,75,100,125,150,175,200,225,250$.\nLos múltiplos de $5$ terminan en $0$ o $5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Todos los divisores (act. 1, p. 31)",
    statement:
      "Lista todos los divisores de: a) $8$ b) $12$ c) $15$ d) $28$ e) $36$ f) $55$ g) $60$ h) $80$.",
    solutionText:
      "a) $1,2,4,8$ b) $1,2,3,4,6,12$ c) $1,3,5,15$ d) $1,2,4,7,14,28$ e) $1,2,3,4,6,9,12,18,36$ f) $1,5,11,55$ g) $1,2,3,4,5,6,10,12,15,20,30,60$ h) $1,2,4,5,8,10,16,20,40,80$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Divisores de números primos (act. 2)",
    statement: "Divisores de $7$, $13$, $17$ y $29$. ¿Qué observas?",
    solutionText:
      "Cada uno solo tiene divisores $1$ y él mismo.\nSon **números primos** (exactamente dos divisores).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Equipos de 24 alumnos (act. 3, p. 31)",
    statement:
      "¿De cuántas formas se reparten $24$ alumnos en equipos iguales? Indica equipos × alumnos.",
    solutionText:
      "$1\\times24$, $2\\times12$, $3\\times8$, $4\\times6$, $6\\times4$, $8\\times3$, $12\\times2$, $24\\times1$ → **$8$ formas**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Múltiplos de 2 (act. 1, p. 32)",
    statement:
      "Rodea los múltiplos de $2$: $57,66,71,90,99,111,162,228,483,805$.",
    solutionText: "Múltiplos de $2$ (cifra par): **$66,90,162,228$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Múltiplos de 3 (act. 2, p. 32)",
    statement:
      "¿Cuáles son múltiplos de $3$? $173,186,390,510,555,679,754,1023$.",
    solutionText:
      "Suma de cifras múltiplo de $3$: **$186$ ($1+8+6=15$), $390$, $510$, $555$, $1023$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Múltiplos de 5 y de 10 (act. 3–4, p. 32)",
    statement:
      "Múltiplos de $5$ entre $328,155,207,735,420,553,815$. Sucesión de los veinte primeros múltiplos de $10$.",
    solutionText:
      "Múltiplos de $5$: **$155,735,420,815$** (terminan en $0$ o $5$).\nMúltiplos de $10$: $10,20,30,\\ldots,200$ (todos terminan en $0$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Primos y compuestos (act. 1, p. 33)",
    statement: "Clasifica: $5,11,15,21,28,31,33,45,49$.",
    solutionText:
      "Primos: **$5,11,31$**.\nCompuestos: **$15,21,28,33,45,49$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Busca los primos (act. 2, p. 33)",
    statement:
      "Entre $47,57,67,77,87$, hay dos primos. Descompón los compuestos como producto de dos factores.",
    solutionText:
      "Primos: **$47$ y $67$**.\n$57=3\\cdot19$, $77=7\\cdot11$, $87=3\\cdot29$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Descomposición en tres factores (act. 3)",
    statement:
      "Descompón en tres factores: a) $16$ b) $18$ c) $40$ d) $66$ e) $72$ f) $222$ g) $500$ h) $1060$.",
    solutionText:
      "a) $2\\cdot2\\cdot4$ b) $2\\cdot3\\cdot3$ c) $2\\cdot4\\cdot5$ d) $2\\cdot3\\cdot11$ e) $2\\cdot6\\cdot6$ f) $2\\cdot3\\cdot37$ g) $2\\cdot10\\cdot25$ h) $2\\cdot10\\cdot53$ (otras agrupaciones válidas).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Descomponer 100 (act. 4, p. 33)",
    statement:
      "Descompón $100$: a) en dos factores b) en tres c) en el máximo número de factores primos.",
    solutionText:
      "a) $10\\cdot10$ o $4\\cdot25$, etc.\nb) $2\\cdot5\\cdot10$ o $2\\cdot2\\cdot25$, etc.\nc) $2\\cdot2\\cdot5\\cdot5$ (cuatro factores primos).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "M.c.m. de 12 y 18 (act. 1, p. 35)",
    statement:
      "a) Cuatro primeros múltiplos comunes de $12$ y $18$. b) $m.c.m.(12,18)$.",
    solutionText:
      "a) $36,72,108,144$ (también vale empezar en $36$ como primer común distinto de cero).\nb) **$m.c.m.(12,18)=36$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "M.c.m. a simple vista (act. 2, p. 35)",
    statement: "Calcula: a) $m.c.m.(6,8)$ b) $m.c.m.(9,12)$ c) $m.c.m.(15,25)$.",
    solutionText: "a) $24$ b) $36$ c) $75$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "M.c.m. método artesanal (act. 3–4)",
    statement:
      "Calcula: a) $m.c.m.(5,8)$ b) $m.c.m.(8,12)$ c) $m.c.m.(12,24)$ d) $m.c.m.(30,40)$ e) $m.c.m.(50,75)$ f) $m.c.m.(200,300)$ g) $m.c.m.(2,3)$ h) $m.c.m.(15,20)$.",
    solutionText:
      "a) $40$ b) $24$ c) $24$ d) $120$ e) $150$ f) $600$ g) $6$ h) $60$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(36),
    title: "M.c.d. de 12 y 18 (act. 1, p. 37)",
    statement:
      "a) Divisores comunes de $12$ y $18$. b) $m.c.d.(12,18)$.",
    solutionText:
      "a) $1,2,3,6$.\nb) **$m.c.d.(12,18)=6$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(37),
    title: "M.c.d. a simple vista (act. 2, p. 37)",
    statement: "a) $m.c.d.(12,16)$ b) $m.c.d.(15,20)$ c) $m.c.d.(24,30)$.",
    solutionText: "a) $4$ b) $5$ c) $6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(38),
    title: "M.c.d. método artesanal (act. 3–4)",
    statement:
      "Calcula: a) $m.c.d.(6,8)$ b) $m.c.d.(8,20)$ c) $m.c.d.(10,15)$ d) $m.c.d.(18,24)$ e) $m.c.d.(40,50)$ f) $m.c.d.(2,3)$ g) $m.c.d.(30,40)$.",
    solutionText:
      "a) $2$ b) $4$ c) $5$ d) $6$ e) $10$ f) $1$ g) $10$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(39),
    title: "Consolidación — reflexión (ej. 1, p. 38)",
    statement:
      "Responde Sí/No: a) $300$ L en bidones de $15$ L b) $100$ magdalenas en docenas c) listón $1{,}80$ m en trozos de $20$ cm d) $100$ min en cuartos de hora.",
    solutionText:
      "a) Sí ($300:15=20$).\nb) No ($100:12$ no es entero; sobran $4$).\nc) Sí ($180:20=9$ trozos).\nd) **No** (un cuarto de hora son $15$ min y $100:15$ no es exacto).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(40),
    title: "Consolidación — divisibilidad (ej. 2, p. 38)",
    statement:
      "¿Hay relación de divisibilidad? a) $20$ y $300$ b) $13$ y $195$ c) $38$ y $138$ d) $15$ y $75$ e) $23$ y $203$ f) $117$ y $702$.",
    solutionText:
      "a) Sí ($300:20=15$).\nb) Sí ($195:13=15$).\nc) No.\nd) Sí ($75:15=5$).\ne) No.\nf) Sí ($702:117=6$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(41),
    title: "Consolidación — múltiplos y divisores (ej. 3–9)",
    statement:
      "Resuelve: a) Tres números contenidos exactamente en $180$ b) tres que contengan a $15$ c) tres divisores de $180$ d) tres múltiplos de $15$ e) múltiplos de $20$ entre $150$ y $210$ f) múltiplo de $13$ entre $190$ y $200$ g) pares con producto $80$ h) todos los divisores de $80$ i) formas de $30$ en equipos iguales j) montones con $72$ terrones.",
    solutionText:
      "a) Ej.: $30,60,90$.\nb) Ej.: $15,30,45$.\nc) Ej.: $6,12,18$.\nd) Ej.: $15,30,45$.\ne) $160,180,200$.\nf) $195$ ($13\\cdot15$).\ng) $1\\cdot80,2\\cdot40,4\\cdot20,5\\cdot16,8\\cdot10$.\nh) $1,2,4,5,8,10,16,20,40,80$.\ni) $1\\times30,2\\times15,3\\times10,5\\times6$ (+ simétricas).\nj) Divisores de $72$: montones de $1,2,3,4,6,8,9,12,18,24,36,72$ unidades.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(42),
    title: "Consolidación — criterios y primos (ej. 10–14)",
    statement:
      "10) Haz $A51$, $2B8$, $31C$, $52D$, $1E8$ múltiplos de $3$. 12) Separa primos y compuestos: $14,17,28,29,47,53,57,63,71,79,91,99$. 14) ¿Es $113$ primo?",
    solutionText:
      "10) Ej.: $A=2$ ($255$), $B=2$ ($228$), $C=2$ ($312$), $D=2$ ($522$), $E=2$ ($108$) — suma de cifras múltiplo de $3$.\n12) Primos: $17,29,47,53,71,79$. Compuestos: el resto.\n14) **$113$ es primo** (no divisible por $2,3,5,7,11$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(43),
    title: "Consolidación — m.c.m. y m.c.d. (ej. 15–16)",
    statement:
      "Calcula: a) $m.c.m.(4,8)$ b) $m.c.d.(4,8)$ c) $m.c.m.(10,20)$ d) $m.c.d.(10,20)$ e) $m.c.m.(20,30)$ f) $m.c.d.(20,40)$. Si $m.c.m.=15$, ¿qué parejas pueden ser?",
    solutionText:
      "a) $8$ b) $4$ c) $20$ d) $10$ e) $60$ f) $20$.\nParejas con $m.c.m.=15$: **$(3,5)$, $(5,15)$, $(1,15)$** (y simétricas).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(44),
    title: "Autoevaluación 1–3 (p. 39)",
    statement:
      "1) Pares en divisibilidad con $6,10,30,80$. 2) ¿$60$ divisible entre $15$? ¿$5$ múltiplo de $15$? ¿$6$ divisor de $30$? ¿$162$ múltiplo de $8$? 3) a) Cinco primeros múltiplos de $6$ entre $50$ y $70$ b) divisores de $30$.",
    solutionText:
      "1) Ej.: $6$ y $30$; $10$ y $30$; $30$ y $80$ no.\n2) a) Sí b) No c) Sí d) No ($162:8$ no es entero).\n3) a) Múltiplos de $6$ entre $50$ y $70$: **$54$, $60$, $66$**.\nb) Divisores de $30$: $1,2,3,5,6,10,15,30$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(45),
    title: "Autoevaluación 4–7 (p. 39)",
    statement:
      "4) Reglas múltiplo de $3$ y divisible entre $5$. 5) Primos entre $14,23,65,67,87,97,101,111$. 6) $m.c.m.(10,15)$, $m.c.d.(10,15)$, $m.c.m.(30,40)$, $m.c.d.(30,40)$. 7) Formas de dividir $28$ alumnos en equipos iguales.",
    solutionText:
      "4) a) Suma de cifras múltiplo de $3$. b) Última cifra $0$ o $5$.\n5) Primos: $23,67,97,101$.\n6) $30,5,120,10$.\n7) Divisores de $28$: **$1,2,4,7,14,28$** equipos posibles (formas distintas de reparto).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
