import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8004-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Actividades, consolidación y autoevaluación — unidad 4 Los números enteros. */
export const numerosEnterosTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(13),
    title: "Series numéricas (act. 2, p. 43)",
    statement:
      "Escribe tres términos más: a) $0,1,-1,2,-2,\\ldots$ b) $6,4,2,0,-2,\\ldots$ c) $20,15,10,5,0,\\ldots$ d) $-21,-20,-18,-15,-11,\\ldots$ e) $8,7,5,2,-2,\\ldots$",
    solutionText:
      "a) $3,-3,4,-4$.\nb) $-4,-6,-8$.\nc) $-5,-10,-15$.\nd) $-6,0,7$ (diferencias $+1,+2,+3,+4,\\ldots$).\ne) $-7,-17,-28$ (restas $1,2,3,4,\\ldots$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(14),
    title: "Asocia un entero (act. 3, p. 43)",
    statement:
      "Escribe el entero adecuado: a) $2500$ € en el banco b) debe $150$ € c) séptimo piso d) segundo sótano e) $18$ °C f) tres grados bajo cero g) billete de $10$ € h) debe $2$ €.",
    solutionText:
      "a) $+2500$ b) $-150$ c) $+7$ d) $-2$ e) $+18$ f) $-3$ g) $+10$ h) $-2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(15),
    title: "Expresa numéricamente (act. 4, p. 43)",
    statement:
      "Traduce: a) gana $60$ € b) paga factura de $60$ € c) termómetro sube $5$ °C d) baja $5$ °C e) ascensor sube $4$ plantas f) baja $4$ plantas g) pierde moneda de $2$ €.",
    solutionText:
      "a) $+60$ b) $-60$ c) $+5$ d) $-5$ e) $+4$ f) $-4$ g) $-2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(16),
    title: "Enunciados con contexto (act. 7, p. 43)",
    statement:
      "Asocia un número: a) temperatura de $21$ °C a $18$ °C b) del segundo sótano al segundo piso c) de $37$ € a $34$ € en la hucha d) de $-2$ °C al mediodía a $+3$ °C.",
    solutionText:
      "a) $-3$ (bajó $3$ grados).\nb) $+4$ (sube cuatro plantas desde $-2$).\nc) $-3$ (gastó $3$ €).\nd) $+5$ (sube cinco grados).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(17),
    title: "Valor absoluto (act. 1–2, p. 44)",
    statement:
      "Calcula: a) $|-5|$ b) $|+8|$ c) $|-3|$ d) $|+4|$ e) $|-7|$ f) $|+1|$ y completa $|{-6}|=\\ldots$, $|{+9}|=\\ldots$, $|{-11}|=\\ldots$.",
    solutionText:
      "a) $5$ b) $8$ c) $3$ d) $4$ e) $7$ f) $1$.\n$|-6|=6$, $|+9|=9$, $|-11|=11$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(18),
    title: "Mismo valor absoluto (act. 3, p. 44)",
    statement: "Escribe dos enteros distintos con el mismo valor absoluto.",
    solutionText:
      "Ejemplos: $5$ y $-5$; $+12$ y $-12$. Son opuestos: $|a|=|-a|$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Orden en la recta (act. 4, p. 44)",
    statement:
      "Ordena de menor a mayor: $-7,+4,-1,+7,+6,-4,-5,+3,-11$.",
    solutionText:
      "$-11 < -7 < -5 < -4 < -1 < +3 < +4 < +6 < +7$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Comparación $<$ o $>$ (act. 5, p. 44)",
    statement:
      "Coloca $<$ o $>$: a) $(+8)$ y $(+3)$ b) $(-8)$ y $(+3)$ c) $(+8)$ y $(-3)$ d) $(-2)$ y $(-5)$ e) $(+2)$ y $(-5)$ f) $(-2)$ y $(+5)$.",
    solutionText:
      "a) $>$ b) $<$ c) $>$ d) $>$ e) $>$ f) $<$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Ordenar listas (act. 6, p. 44)",
    statement:
      "Ordena de menor a mayor: a) $+5,-3,-7,0,+1,+6,-12,-5$ b) $-6,-3,-9,0,-1,-5,-12,-4$.",
    solutionText:
      "a) $-12,-7,-5,-3,0,+1,+5,+6$.\nb) $-12,-9,-6,-5,-4,-3,-1,0$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Completa sumas con signo (act. 1, p. 46)",
    statement:
      "Completa: $+6+7=\\ldots$; $+3-8=\\ldots$; $-4+6=\\ldots$; $-5-4=\\ldots$.",
    solutionText:
      "$+13$; $-5$; $+2$; $-9$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Mismo signo (act. 2, p. 46)",
    statement:
      "Calcula: a) $6+5$ b) $+4+8$ c) $-6-2$ d) $-4-6$ e) $-5-9$ f) $+8+7$ g) $-8-7$ h) $-12-4$.",
    solutionText:
      "a) $11$ b) $12$ c) $-8$ d) $-10$ e) $-14$ f) $15$ g) $-15$ h) $-16$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Distinto signo (act. 3, p. 46)",
    statement:
      "Calcula: a) $+9-5$ b) $+3-7$ c) $-2+7$ d) $-15+5$ e) $7-12$ f) $-18+10$.",
    solutionText:
      "a) $4$ b) $-4$ c) $5$ d) $-10$ e) $-5$ f) $-8$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Suma y resta variada (act. 4, p. 46)",
    statement:
      "Calcula: a) $+6-7$ b) $-8+7$ c) $-5-1$ d) $+10-12$ e) $-16+20$ f) $-13-12$ g) $-18+11$.",
    solutionText:
      "a) $-1$ b) $-1$ c) $-6$ d) $-2$ e) $4$ f) $-25$ g) $-7$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Opera en orden (act. 6, p. 46)",
    statement:
      "Calcula: a) $10-3-5$ b) $5-8+4$ c) $-10+8+6$ d) $-10-3+8$ e) $-4-3-2$ f) $-1-5-7$.",
    solutionText:
      "a) $2$ b) $1$ c) $4$ d) $-5$ e) $-9$ f) $-13$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Agrupando signos (act. 8, p. 46)",
    statement:
      "Calcula: a) $9-2-3$ b) $3-7+4$ c) $-13+6+4$ d) $-2+10-15$ e) $-11-4+8$ f) $-8+5+6$.",
    solutionText:
      "a) $4$ b) $0$ c) $-3$ d) $-7$ e) $-7$ f) $3$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Positivos y negativos aparte (act. 9, p. 46)",
    statement:
      "Calcula: a) $5+7-2-4$ b) $2-6+4-9$ c) $-4-5+3+8$ d) $-8+2-7+6$ e) $-1+5+6-7$.",
    solutionText:
      "a) $6$ b) $-9$ c) $2$ d) $-7$ e) $3$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Quita paréntesis simples (act. 1–2, p. 49)",
    statement:
      "Quita paréntesis: a) $+( -1)$ b) $-(+4)$ c) $+(+8)$ d) $-( -6)$ e) $-(+25)$ f) $+( -12)$.",
    solutionText:
      "a) $-1$ b) $-4$ c) $+8$ d) $+6$ e) $-25$ f) $-12$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Opera con paréntesis (act. 3, p. 49)",
    statement:
      "Calcula: a) $+(+8)-(+5)$ b) $-(+6)-(-2)$ c) $+(-2)+(-6)$ d) $+(+7)-(-3)$ e) $+(-9)-(+2)$ f) $-(+6)+(+4)$.",
    solutionText:
      "a) $+3$ b) $-4$ c) $-8$ d) $+10$ e) $-11$ f) $-2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Bloques con signo (act. 4, p. 49)",
    statement:
      "Quita paréntesis y calcula: a) $+(5+3)$ b) $+( -6-3)$ c) $-(8+15)$ d) $-( -2-4)$ e) $+(9-7-2)$ f) $-(7-5+4)$.",
    solutionText:
      "a) $+8$ b) $-9$ c) $-23$ d) $+6$ e) $0$ f) $-6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Quita paréntesis y opera (act. 5, p. 49)",
    statement:
      "Calcula: a) $12+(+4)$ b) $15-(-6)$ c) $9+(-1)$ d) $3-(-5)$ e) $10-(+16)$ f) $30-(-12)$.",
    solutionText:
      "a) $16$ b) $21$ c) $8$ d) $8$ e) $-6$ f) $42$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "Varios paréntesis (act. 6–7, p. 49)",
    statement:
      "Calcula: a) $-(+14)-(-12)$ b) $35-(-15)$ c) $-(+22)-16$ d) $-(-27)-30$ e) $18+(+12)$ f) $-15-(+15)$.",
    solutionText:
      "a) $-2$ b) $50$ c) $-38$ d) $-3$ e) $30$ f) $-30$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "Paréntesis con varios sumandos (act. 8, p. 49)",
    statement:
      "Calcula: a) $12+(+3-5)$ b) $6-(9-7)$ c) $15-(2-9)$ d) $11-(-6+3)$ e) $13+(-8+2)$ f) $9-(-3-10)$.",
    solutionText:
      "a) $10$ b) $4$ c) $22$ d) $14$ e) $7$ f) $22$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "Dos paréntesis (act. 10, p. 49)",
    statement:
      "Calcula quitando paréntesis: a) $(7-4)+(9-5)$ b) $(5-12)-(8-6)$ c) $(7+3)-(5+4)$ d) $(10-7)-(-2-6)$ e) $-(8+4)+(5-9)$.",
    solutionText:
      "a) $7$ b) $-9$ c) $1$ d) $11$ e) $-8$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(36),
    title: "Producto de enteros (act. 1, p. 51)",
    statement:
      "Calcula: a) $3\\cdot(-2)$ b) $4\\cdot(+5)$ c) $-5\\cdot(+3)$ d) $-2\\cdot(-4)$ e) $(-5)\\cdot(-7)$ f) $(-6)\\cdot(+4)$.",
    solutionText:
      "a) $-6$ b) $20$ c) $-15$ d) $8$ e) $35$ f) $-24$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(37),
    title: "División de enteros (act. 2, p. 51)",
    statement:
      "Cociente entero si existe: a) $(-8):(+2)$ b) $(+20):(-10)$ c) $(-12):(-4)$ d) $(-15):(-3)$ e) $(-36):(+9)$ f) $(+42):(-7)$.",
    solutionText:
      "a) $-4$ b) $-2$ c) $3$ d) $5$ e) $-4$ f) $-6$.\n$(-4):(+3)$ y $(+20):(-7)$ no son enteros exactos.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(38),
    title: "Consolidación — conjunto Z (ej. 1–3, p. 52)",
    statement:
      "a) Factura de teléfono de $57$ € b) Ordena: $+6,+2,0,+4,-7,+3$ c) Ordena: $-4,0,+6,-8,+3,-5$.",
    solutionText:
      "a) $-57$ (debe).\nb) $-7,+2,+3,+4,+6$.\nc) $-8,-5,-4,0,+3,+6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(39),
    title: "Consolidación — sumas (ej. 4, p. 52)",
    statement:
      "Calcula: a) $13-9+5-7$ b) $6-8-6+5+4-6$ c) $-3-5+2-1-7+4$ d) $-8-7+2+9-10+18$.",
    solutionText:
      "a) $2$ b) $-5$ c) $-10$ d) $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(40),
    title: "Consolidación — paréntesis (ej. 5, p. 52)",
    statement:
      "Quita paréntesis y opera: a) $(+3)-(+8)$ b) $(-9)+(-6)$ c) $(-7)-(-7)-(+7)$ d) $(-11)+(+8)-(-6)$ e) $(+15)-(-12)-(+11)+(-16)$.",
    solutionText:
      "a) $-5$ b) $-15$ c) $-7$ d) $3$ e) $0$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(41),
    title: "Consolidación — expresiones (ej. 7–9, p. 52)",
    statement:
      "Calcula: a) $(4+8)-(3-9)$ b) $10+(8-15+2-6)$ c) $(5-7)-[(-3)+(-6)]$ d) $(+9)-[(+3)-(3-12)-(+8)]$.",
    solutionText:
      "a) $18$ b) $-1$ c) $7$ d) $5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(42),
    title: "Consolidación — mult/div (ej. 11–14, p. 52–53)",
    statement:
      "Calcula: a) $(-18):[(+6)\\cdot(-3)]$ b) $(+54):[(-6):(+3)]$ c) $35+7\\cdot(6-11)$ d) $60:(8-14)+12$.",
    solutionText:
      "a) $(-18):(+18)=1$.\nb) $(+54):(-2)=-27$.\nc) $35+7\\cdot(-5)=35-35=0$.\nd) $60:(-6)+12=-10+12=2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(43),
    title: "Consolidación — expresiones mixtas (ej. 13, p. 53)",
    statement:
      "Calcula: a) $(-11)-(-2)\\cdot[15-(+11)]$ b) $(+5)-(-18):[(+9)-(+15)]$ c) $(-4)\\cdot[(-6)-(-8)]-(+3)\\cdot[(-11)+(+7)]$.",
    solutionText:
      "a) $-11-(-2)\\cdot4=-11+8=-3$.\nb) $5-(-18):(-6)=5-3=2$.\nc) $(-4)\\cdot2-(+3)\\cdot(-4)=-8+12=4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(44),
    title: "Autoevaluación 1–4 (p. 53)",
    statement:
      "a) Gastó $35$ € b) Ordena: $(+4),(-3),(+5),(-5),(+1),(-6),(+2),(-1)$ c) Calcula: $4-9$; $3-8+1$; $-5-7+4+2$.",
    solutionText:
      "a) $-35$.\nb) $-6,-5,-3,-1,+1,+2,+4,+5$.\nc) $-5$; $-4$; $-6$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(45),
    title: "Autoevaluación 5–7 (p. 53)",
    statement:
      "Calcula: a) $(-7)+(+4)$ b) $(+2)-(-3)+(-5)$ c) $(-8)-(5-9)$ d) $20-[(15-9)-(7+3)]$ e) $5\\cdot(-2)$ f) $(-20):[(+12)\\cdot(-3)]$ g) $3\\cdot4-2\\cdot7$ h) $(-2)\\cdot(6-8)$.",
    solutionText:
      "a) $-3$ b) $0$ c) $-4$ d) $24$ e) $-10$ f) $(-20):[(-36)]=\\dfrac{-5}{9}$ (no es cociente entero; el producto interior es $-36$).\ng) $-2$ h) $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
