import type { CurriculumTopicExercise } from "@/content/types";

function topicExerciseId(n: number) {
  return `b4000000-0000-4000-8001-${n.toString().padStart(12, "0")}`;
}

const DEFAULT_VIDEO = "https://www.youtube.com/embed/8ZtInClXe1Q";

/** Resto de ejercicios resueltos de la unidad 1 (actividades, consolidación y autoevaluación). */
export const numerosNaturalesTopicExercisesExtra: CurriculumTopicExercise[] = [
  {
    id: topicExerciseId(18),
    title: "Sistema aditivo (símbolos 1, 5 y 20)",
    statement:
      "Con símbolos $=1$, $=5$ y $=20$, escribe de forma aditiva: $14$, $25$, $28$ y $52$.",
    solutionText:
      "$14 = 5+5+1+1+1+1$\n$25 = 20+5$\n$28 = 20+5+1+1+1$\n$52 = 20+20+5+5+1+1$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(19),
    title: "Grabados egipcios",
    statement:
      "¿Qué números representan los cuatro grabados egipcios del temario? (Símbolos de $1$, $10$, $100$ y $1000$.)",
    solutionText:
      "1.º $2000+30+6 = 2036$\n2.º $1000+200+2 = 1202$\n3.º $3000+400+50 = 3450$\n4.º $2000+100+30+4 = 2134$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(20),
    title: "Redondeo a las decenas (act. 1)",
    statement:
      "Redondea a las decenas: $96$, $299$, $458$, $553$, $3087$, $4906$, $6837$, $9060$.",
    solutionText:
      "$96 \\to 100$, $299 \\to 300$, $458 \\to 460$, $553 \\to 550$, $3087 \\to 3090$, $4906 \\to 4910$, $6837 \\to 6840$, $9060 \\to 9060$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(21),
    title: "Redondeo a las centenas (act. 2)",
    statement:
      "Redondea a las centenas: $3502$, $1696$, $2724$, $3310$, $6193$, $5924$, $6508$, $9538$.",
    solutionText:
      "$3502 \\to 3500$, $1696 \\to 1700$, $2724 \\to 2700$, $3310 \\to 3300$, $6193 \\to 6200$, $5924 \\to 5900$, $6508 \\to 6500$, $9538 \\to 9500$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(22),
    title: "Redondeo a los millares (act. 3)",
    statement:
      "Redondea a los millares: $24\\,963$, $7280$, $15\\,800$, $59\\,300$, $40\\,274$, $55\\,555$, $39\\,785$, $99\\,399$.",
    solutionText:
      "$24\\,963 \\to 25\\,000$, $7280 \\to 7000$, $15\\,800 \\to 16\\,000$, $59\\,300 \\to 59\\,000$, $40\\,274 \\to 40\\,000$, $55\\,555 \\to 56\\,000$, $39\\,785 \\to 40\\,000$, $99\\,399 \\to 99\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(23),
    title: "Redondeo a los millones (act. 4)",
    statement:
      "Redondea a los millones: $4\\,356\\,000$, $36\\,905\\,000$, $1\\,584\\,390$, $15\\,326\\,999$, $74\\,825\\,048$, $13\\,457\\,000$, $89\\,245\\,321$, $55\\,571\\,000$.",
    solutionText:
      "$4\\,356\\,000 \\to 4\\,000\\,000$, $36\\,905\\,000 \\to 37\\,000\\,000$, $1\\,584\\,390 \\to 2\\,000\\,000$, $15\\,326\\,999 \\to 15\\,000\\,000$, $74\\,825\\,048 \\to 75\\,000\\,000$, $13\\,457\\,000 \\to 13\\,000\\,000$, $89\\,245\\,321 \\to 89\\,000\\,000$, $55\\,571\\,000 \\to 56\\,000\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(24),
    title: "Suma mental (act. 1, p. 12)",
    statement: "Opera mentalmente las sumas a)–o) de la actividad 1 (p. 12): de $20+6$ a $298+24$.",
    solutionText:
      "a) $26$ b) $126$ c) $78$ d) $178$ e) $118$ f) $218$ g) $144$ h) $208$ i) $57$ j) $257$ k) $77$ l) $277$ m) $55$ n) $355$ ñ) $127$ o) $322$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(25),
    title: "Resta mental (act. 2, p. 12)",
    statement: "Calcula mentalmente las restas a)–o) de la actividad 2 (p. 12).",
    solutionText:
      "a) $22$ b) $37$ c) $13$ d) $5$ e) $4$ f) $1$ g) $10$ h) $5$ i) $9$ j) $4$ k) $14$ l) $7$ m) $23$ n) $13$ ñ) $33$ o) $23$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(26),
    title: "Sumas y restas combinadas (act. 3)",
    statement: "Calcula las expresiones a)–o) de la actividad 3 (p. 12).",
    solutionText:
      "a) $33$ b) $43$ c) $9$ d) $19$ e) $110$ f) $120$ g) $35$ h) $25$ i) $32$ j) $22$ k) $90$ l) $100$ m) $230$ n) $240$ ñ) $200$ o) $210$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(27),
    title: "Cálculo con lápiz y papel (act. 4)",
    statement: "Calcula: a) $254+78+136$ b) $1480+237+48$ c) $340+255-429$ d) $1526-831+63$ e) $782-346-274$ f) $1350-1107-58$.",
    solutionText:
      "a) $468$ b) $1765$ c) $166$ d) $758$ e) $162$ f) $185$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(28),
    title: "Paréntesis: comparar resultados (act. 5)",
    statement:
      "Opera y compara, en cada apartado, las cuatro expresiones de la actividad 5 (p. 12): a)–k).",
    solutionText:
      "a) $13-9+3=7$, $13+3-9=7$, $13-(9+3)=1$, $(13+3)-9=7$.\nb) $15-8+4=11$, $15+4-8=11$, $15-(8+4)=3$, $(15+4)-8=11$.\nc) $18-16+2=4$, $18+2-16=4$, $18-(16+2)=0$, $(18+2)-16=4$.\nd) $11-5-3=3$, $11-3-5=3$, $11-(5-3)=9$, $(11-3)-5=3$.\ne) $23-15+6=14$, $23+6-15=14$, $23-(15+6)=2$, $(23+6)-15=14$.\nf) $35-20-5=10$, $35-5-20=10$, $35-(20-5)=20$, $(35-5)-20=10$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(29),
    title: "Producto como suma repetida (act. 10)",
    statement:
      "Expresa como suma de sumandos iguales: a) $4\\cdot 6$ b) $10\\cdot 4$ c) $32\\cdot 3$ d) $28\\cdot 1$ e) $150\\cdot 2$ f) $1000\\cdot 3$.",
    solutionText:
      "a) $6+6+6+6$ b) $4+4+4+4+4+4+4+4+4+4$ c) $32+32+32$ d) $28$ e) $150+150$ f) $1000+1000+1000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(30),
    title: "Multiplicación mental (act. 11)",
    statement: "Opera mentalmente los productos a)–o) de la actividad 11 (p. 14).",
    solutionText:
      "a) $56$ b) $560$ c) $108$ d) $1080$ e) $490$ f) $4900$ g) $136$ h) $1360$ i) $120$ j) $1200$ k) $80$ l) $800$ m) $45$ n) $450$ ñ) $696$ o) $6960$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(31),
    title: "Multiplicaciones con cifras ocultas (act. 12)",
    statement: "Completa las cuatro multiplicaciones de la actividad 12 (p. 14).",
    solutionText:
      "1.º $45 \\cdot 28 = 1260$\n2.º $178 \\cdot 92 = 16\\,376$\n3.º $908 \\cdot 77 = 69\\,916$\n4.º $1747 \\cdot 45 = 78\\,615$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(32),
    title: "Multiplicar por 9 y por 11 (act. 13)",
    statement:
      "Multiplica mentalmente con el truco del temario ($n\\cdot 9 = n\\cdot 10 - n$, $n\\cdot 11 = n\\cdot 10 + n$): a)–l).",
    solutionText:
      "a) $108$ b) $132$ c) $135$ d) $165$ e) $162$ f) $198$ g) $225$ h) $275$ i) $243$ j) $297$ k) $297$ l) $363$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(33),
    title: "Multiplicar por 10, 100 y 1000 (act. 14)",
    statement: "Calcula los productos a)–i) de la actividad 14 (p. 14).",
    solutionText:
      "a) $190$ b) $1200$ c) $15\\,000$ d) $350$ e) $4100$ f) $57\\,000$ g) $1400$ h) $23\\,000$ i) $460\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(34),
    title: "Propiedad distributiva (act. 15)",
    statement: "Comprueba que coinciden: $15 \\cdot (6-2)$ y $15 \\cdot 6 - 15 \\cdot 2$.",
    solutionText:
      "$15 \\cdot (6-2) = 15 \\cdot 4 = 60$.\n$15 \\cdot 6 - 15 \\cdot 2 = 90 - 30 = 60$.\nAmbas expresiones valen **$60$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(35),
    title: "Problemas de multiplicación mental (act. 16)",
    statement:
      "Resuelve: a) $20$ bidones de $5$ L b) $5$ kg de almendras a $12$ €/kg c) $10$ cajas de $24$ botellas d) $4$ cubiertas a $150$ €.",
    solutionText:
      "a) $20 \\cdot 5 = 100$ litros.\nb) $5 \\cdot 12 = 60$ €.\nc) $10 \\cdot 24 = 240$ botellas.\nd) $4 \\cdot 150 = 600$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(36),
    title: "División mental (act. 20)",
    statement:
      "Divide mentalmente: a) $46:46$ b) $62:31$ c) $280:40$ d) $640:80$ e) $360:40$ f) $476:68$ g) $168:56$ h) $138:69$.",
    solutionText:
      "a) $1$ b) $2$ c) $7$ d) $8$ e) $9$ f) $7$ g) $3$ h) $2$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(37),
    title: "Cociente y resto (act. 21)",
    statement:
      "Halla cociente y resto: a) $96:13$ b) $713:31$ c) $5309:7$ d) $7029:26$ e) $49\\,896:162$ f) $80\\,391:629$.",
    solutionText:
      "a) $c=7$, $r=5$ b) $c=23$, $r=0$ c) $c=758$, $r=3$ d) $c=270$, $r=9$ e) $c=308$, $r=0$ f) $c=127$, $r=508$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(38),
    title: "Dividir entre 5 (act. 22)",
    statement:
      "Calcula dividiendo entre $10$ y multiplicando por $2$: a) $60:5$ … i) $420:5$.",
    solutionText:
      "a) $12$ b) $16$ c) $24$ d) $28$ e) $34$ f) $40$ g) $42$ h) $68$ i) $84$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(39),
    title: "Agrupación en divisiones (act. 23)",
    statement: "Calcula y compara: a)–h) de la actividad 23 (p. 16).",
    solutionText:
      "a) $(50:10):5=1$, $50:(10:5)=25$.\nb) $(36:6):2=3$, $36:(6:2)=12$.\nc) $(30:5)\\cdot 2=12$, $30:(5\\cdot 2)=3$.\nd) $(36:6)\\cdot 3=18$, $36:(6\\cdot 3)=2$.\n(La agrupación cambia el resultado: no hay asociatividad universal en la división.)",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(40),
    title: "Problemas de división mental (act. 24)",
    statement:
      "Resuelve: a) Docenas en $60$ pasteles b) $120$ excursionistas en $3$ autobuses c) $240$ minutos en horas d) Peso de $50$ caramelos de $450$ g.",
    solutionText:
      "a) $60:12 = 5$ docenas.\nb) $120:3 = 40$ excursionistas por autobús.\nc) $240:60 = 4$ horas.\nd) $450:50 = 9$ gramos por caramelo.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(41),
    title: "Operaciones combinadas (act. 27 y 28)",
    statement: "Calcula las expresiones a)–h) de las actividades 27 y 28 (p. 16).",
    solutionText:
      "Act. 27: a) $18$ b) $1$ c) $7$ d) $13$ e) $15$ f) $11$ g) $15$ h) $12$.\nAct. 28: a) $3$ b) $6$ c) $40$ d) $2$ e) $60$ f) $15$ g) $4$ h) $3$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(42),
    title: "Prioridad de operaciones (act. 29)",
    statement: "Calcula y compara los pares a)–e) de la actividad 29.",
    solutionText:
      "a) $2+3\\cdot 4=14$, $(2+3)\\cdot 4=20$.\nb) $6-2\\cdot 3=0$, $(6-2)\\cdot 3=12$.\nc) $15-4\\cdot 3=3$, $(15-4)\\cdot 3=33$.\nd) $5\\cdot 2+4=14$, $5\\cdot(2+4)=30$.\ne) $2\\cdot 15-10=20$, $2\\cdot(15-10)=10$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(43),
    title: "Varias multiplicaciones y restas (act. 30)",
    statement: "Resuelve a)–h) de la actividad 30 (p. 16).",
    solutionText:
      "a) $17$ b) $21$ c) $7$ d) $11$ e) $22$ f) $0$ g) $25$ h) $5$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(44),
    title: "Consolidación — egipcio (ej. 1, p. 17)",
    statement: "Escribe en egipcio aditivo: a) $48$ b) $235$ c) $2130$.",
    solutionText:
      "Se agrupan símbolos de $1$, $10$, $100$ y $1000$:\na) $48 = 10+10+10+10+1+1+1+1+1+1$ (cuatro «palos de $10$» y ocho unidades).\nb) $235 = 100+100+10+10+10+1+1+1+1+1$.\nc) $2130 = 1000+1000+100+10+10+10$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(45),
    title: "Consolidación — romanos (ej. 2, p. 17)",
    statement:
      "Traduce al decimal: a) XIV b) LXXIII c) LXIX d) CCXVII e) DCXC f) MCMLVI.",
    solutionText:
      "a) $14$ b) $73$ c) $69$ d) $217$ e) $690$ f) $1956$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(46),
    title: "Matrículas de coches (ej. 3, p. 17)",
    statement:
      "Dos matrículas: **3000 FZZ** y **9999 CHB**. a) ¿Cuál es más antiguo? b) Matrícula siguiente en cada caso. c) Dos consecutivas sin cifra común. d) Dos consecutivas con tres letras distintas.",
    solutionText:
      "a) **3000 FZZ** (número menor → matriculación anterior).\nb) Siguientes: **3001 FZZ** y **0000 CJC** (tras 9999 cambia la serie de letras).\nc) Ejemplo válido: **1999 BCD** y **2000 WXYZ** (ninguna cifra coincide).\nd) Ejemplo: **4521 ABC** y **4522 DEF** (las tres letras cambian).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(47),
    title: "Habitaciones del hotel (ej. 4, p. 17)",
    statement:
      "Habitaciones $401$, $235$, $724$, $231$. a) ¿Cuál está al final del pasillo? b) ¿Cuál en la última planta? c) ¿Cuáles están a la misma altura?",
    solutionText:
      "Interpretamos centenas como planta y unidades como posición en el pasillo.\na) **724** (número mayor).\nb) **724** (planta $7$).\nc) **235** y **231** (ambas en planta $2$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(48),
    title: "Precio aproximado de la vivienda (ej. 5, p. 17)",
    statement:
      "Un piso cuesta $293\\,528$ € y no recuerdas el precio exacto. ¿Qué frase usarías: «casi trescientos mil», «doscientos y pico mil» o «doscientos noventa mil»?",
    solutionText:
      "La mejor opción es **«casi trescientos mil euros»**, porque $293\\,528$ redondea a $300\\,000$ a las centenas de millar (la cifra de decenas de millar es $9$).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(49),
    title: "Consolidación — sumas y restas (ej. 6)",
    statement: "Calcula a)–f) del ejercicio 6 (p. 17).",
    solutionText: "a) $5$ b) $3$ c) $0$ d) $1$ e) $10$ f) $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(50),
    title: "Consolidación — multiplicaciones (ej. 7)",
    statement: "Multiplica a)–i) del ejercicio 7 (p. 17).",
    solutionText:
      "a) $160$ b) $1280$ c) $600$ d) $1700$ e) $8500$ f) $12\\,000$ g) $22\\,000$ h) $134\\,000$ i) $140\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(51),
    title: "Consolidación — divisiones (ej. 8)",
    statement: "Cociente y resto en a)–f) del ejercicio 8 (p. 17).",
    solutionText:
      "a) $330$, $r=7$ b) $46$, $r=11$ c) $201$, $r=0$ d) $43$, $r=0$ e) $3$, $r=0$ f) $107$, $r=0$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(52),
    title: "Consolidación — operaciones combinadas (ej. 9)",
    statement: "Opera a)–h) del ejercicio 9 (p. 17).",
    solutionText:
      "a) $20$ b) $14$ c) $4$ d) $30$ e) $44$ f) $7$ g) $6$ h) $4$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(53),
    title: "Expresión del hortelano (ej. 10, p. 17)",
    statement:
      "Un hortelano vende $85$ kg de tomates a $2$ €/kg y $35$ kg de frambuesas a $3$ €/kg. Escribe **una sola** expresión aritmética para el dinero obtenido.",
    solutionText:
      "Ingreso total: $85 \\cdot 2 + 35 \\cdot 3 = 275$ €.\nExpresión única: **$85 \\cdot 2 + 35 \\cdot 3$**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(54),
    title: "Peso de las tres ocas (problema 1, p. 18)",
    statement:
      "La oca mediana pesa $850$ g más que la pequeña y $1155$ g menos que la grande. En la báscula, la mediana marca $2530$ g. ¿Cuánto pesan entre las tres?",
    solutionText:
      "Mediana $= 2530$ g.\nPequeña: $2530 - 850 = 1680$ g.\nGrande: $2530 + 1155 = 3685$ g.\nTotal: $1680 + 2530 + 3685 = 7895$ g.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(55),
    title: "Ganancia del mayorista de patatas (problema 4, p. 18)",
    statement:
      "Compra $150$ sacos de $30$ kg por $2000$ €, desecha $300$ kg y envasa el resto en bolsas de $5$ kg vendidas a $4$ €/bolsa. ¿Qué ganancia obtiene?",
    solutionText:
      "Patatas totales: $150 \\cdot 30 = 4500$ kg.\nTras desecho: $4500 - 300 = 4200$ kg.\nBolsas: $4200 : 5 = 840$ bolsas.\nIngresos: $840 \\cdot 4 = 3360$ €.\nGanancia: $3360 - 2000 = 1360$ €.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(56),
    title: "Beneficio del colmenar (problema 5, p. 18)",
    statement:
      "$187$ colmenas, $2$ cosechas/año, $9$ kg de miel por colmena y cosecha. Envasado en tarros de $0{,}5$ kg; cajas de $6$ tarros a $18$ €/caja. ¿Beneficio anual? (sin otros gastos).",
    solutionText:
      "Miel anual: $187 \\cdot 2 \\cdot 9 = 3366$ kg.\nTarros: $3366 : 0{,}5 = 6732$ tarros.\nCajas: $6732 : 6 = 1122$ cajas.\nIngresos: $1122 \\cdot 18 = 20\\,196$ €.\nBeneficio anual estimado: **$20\\,196$ €**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(57),
    title: "Sector servicios (problema 6, p. 18)",
    statement:
      "En una ciudad de $48\\,000$ habitantes, un diagrama de barras muestra sectores AGRIC.:$2$, GANAD.:$3$, IND.:$7$, SERV.:$6$ (partes proporcionales). ¿Cuántos habitantes hay en servicios?",
    solutionText:
      "Partes totales: $2+3+7+6 = 18$.\nServicios: $\\dfrac{6}{18} = \\dfrac{1}{3}$ del total.\nHabitantes: $48\\,000 : 3 = 16\\,000$ personas.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(58),
    title: "Autoevaluación 1 — sistemas de numeración",
    statement:
      "Cantidad $3290$ escrita en decimal, romano MMMCCXC y en egipcio aditivo. a) ¿Qué sistemas son? b) ¿Aditivos o posicionales?",
    solutionText:
      "a) **Decimal**, **romano** y **egipcio**.\nb) Decimal: **posicional**. Romano y egipcio: **aditivos**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(59),
    title: "Autoevaluación 2 — cifras y letras",
    statement:
      "Escribe con letras o cifras: a) Ochocientos cuarenta y tres mil. b) Trece millones doscientos ochenta mil. c) $1500000$ d) $350000000$.",
    solutionText:
      "a) $843\\,000$ b) $13\\,280\\,000$ c) Un millón quinientos mil d) Trescientos cincuenta millones.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(60),
    title: "Autoevaluación 3 — redondeo de población",
    statement:
      "Una ciudad tiene $839\\,000$ habitantes. Redondea a) a las centenas de millar b) a las decenas de millar.",
    solutionText:
      "a) Miramos decenas de millar ($3<5$): $839\\,000 \\to 800\\,000$.\nb) Miramos unidades de millar ($9\\geq 5$): $839\\,000 \\to 840\\,000$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(61),
    title: "Autoevaluación 4 — términos desconocidos",
    statement:
      "Calcula: a) $143 + \\square = 237$ b) $\\square - 133 = 85$ c) $25 \\cdot \\square = 175$ d) $\\square : 15 = 13$.",
    solutionText: "a) $\\square = 94$ b) $\\square = 218$ c) $\\square = 7$ d) $\\square = 195$.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(62),
    title: "Autoevaluación 5 — paréntesis",
    statement:
      "Coloca paréntesis para que se cumpla: a) $8-5\\cdot 3=9$ b) $8\\cdot 4-5=12$ c) $6\\cdot 3-1+2=24$ d) $6\\cdot 3-1+2=14$.",
    solutionText:
      "a) $(8-5)\\cdot 3 = 9$\nb) $(8-5)\\cdot 4 = 12$\nc) $6\\cdot(3-1+2) = 24$\nd) $6\\cdot(3-1)+2 = 14$",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(63),
    title: "Autoevaluación 6 — monedas de 1 €",
    statement:
      "Con monedas de $50$, $20$ y $10$ céntimos, ¿de cuántas formas distintas puedes juntar $1$ €?",
    solutionText:
      "Resolvemos $50a+20b+10c=100$ con $a,b,c$ naturales.\nPosibles valores de $a$: $0$ (6 formas), $1$ (3 formas), $2$ (1 forma).\nTotal: **$10$ formas distintas**.",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
  {
    id: topicExerciseId(64),
    title: "Autoevaluación 7 — cosecha de manzanas",
    statement:
      "Campos con $160$ y $213$ manzanos; $35$ kg por árbol; cajas de $10$ kg. a) ¿Kg totales? b) ¿Cuántas cajas de $10$ kg?",
    solutionText:
      "Árboles: $160+213=373$.\na) Kilos: $373 \\cdot 35 = 13\\,055$ kg.\nb) Cajas completas de $10$ kg: $13\\,055 : 10 = 1305$ cajas (sobran $5$ kg).",
    solutionVideoUrl: DEFAULT_VIDEO,
  },
];
