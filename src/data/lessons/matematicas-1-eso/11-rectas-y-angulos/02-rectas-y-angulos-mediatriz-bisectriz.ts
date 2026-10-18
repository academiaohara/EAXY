import type { InteractiveLesson } from "@/lib/lesson/types";
import { TEMA_1ESO_11_SUBTITLE } from "@/data/lessons/shared";

export const rectasYAngulosMediatrizBisectrizLesson: InteractiveLesson = {
  slug: "rectas-y-angulos-mediatriz-bisectriz",
  title: "2. Mediatriz y bisectriz",
  subtitle: TEMA_1ESO_11_SUBTITLE,
  stage: { theme: "board" },
  steps: [
    {
      id: "mediatriz",
      type: "slide",
      help: [
        {
          label: "¿Qué es el punto medio?",
          message: "El punto del segmento que está a la misma distancia de los dos extremos: lo parte en dos mitades iguales.",
        },
        {
          label: "¿Qué significa $\\overline{PA}$?",
          message: "Con la barra encima es la **longitud** del segmento de extremos $P$ y $A$. Sin barra, $PA$ es el segmento mismo.",
        },
      ],
      title: "Mediatriz de un segmento",
      blocks: [
        {
          kind: "definition",
          text: "La **mediatriz** de un segmento es la recta **perpendicular** al segmento en su **punto medio**.",
        },
        {
          kind: "rule",
          title: "Propiedad",
          text: "Los puntos de la mediatriz **equidistan** (están a igual distancia) de los extremos del segmento.",
          formula: "\\overline{PA} = \\overline{PB} \\qquad \\overline{QA} = \\overline{QB}",
        },
        {
          kind: "text",
          text: "$PA$ es el segmento de extremos $P$ y $A$; $\\overline{PA}$ es la longitud de ese segmento.",
        },
      ],
      visual: { kind: "anim", scene: "mediatriz-equidistan" },
    },
    {
      id: "explora-mediatriz",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Mueve P solo hacia arriba y abajo: las distancias cambian, pero se mantienen iguales. Si lo mueves hacia un lado, dejan de serlo.",
        },
      ],
      title: "Explora: ¿dónde equidista un punto?",
      blocks: [
        {
          kind: "text",
          text: "Mueve el punto $P$ y compara $PA$ con $PB$. Encuentra **todas** las posiciones en las que coinciden.",
        },
        {
          kind: "rule",
          title: "Para comprobar",
          text: "Un punto equidista de $A$ y de $B$ **si y solo si** está en la mediatriz de $AB$.",
        },
      ],
      visual: { kind: "tool", tool: "punto-mediatriz", params: { a: 0, b: 2 } },
    },
    {
      id: "wifi",
      type: "predict",
      help: [
        {
          label: "¿Qué condición tiene que cumplir el punto?",
          message: "Tiene que estar a la **misma distancia** de las dos casas. ¿Qué recta cumple eso con un segmento?",
        },
        {
          label: "Un caso fácil",
          message: "El punto medio entre las dos casas cumple la condición. Pero no es el único: busca la recta que lo contiene.",
        },
      ],
      title: "Un punto de encuentro",
      question:
        "Dos amigas viven en las casas A y B, unidas por un camino recto. Quieren quedar en un punto del parque que esté exactamente a la misma distancia de las dos casas. ¿Dónde pueden quedar?",
      mode: "choice",
      choices: [
        { id: "a", label: "En cualquier punto de la mediatriz del segmento AB" },
        {
          id: "b",
          label: "En cualquier punto del camino AB",
          incorrectFeedback:
            "Solo el punto medio del camino equidista de las dos casas. Los demás puntos del camino están más cerca de una que de otra.",
        },
        {
          id: "c",
          label: "En cualquier punto de una paralela al camino AB",
          incorrectFeedback:
            "Una paralela a AB se mantiene a la misma distancia del camino, pero eso no hace que sus puntos equidisten de A y de B.",
        },
        {
          id: "d",
          label: "Solo en el punto medio de AB",
          incorrectFeedback:
            "El punto medio sirve, pero no es el único: todos los puntos de la mediatriz, que es una recta entera, equidistan de A y de B.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Los puntos que equidistan de A y B forman la **mediatriz** de AB: pueden quedar en cualquiera de ellos.",
    },
    {
      id: "construir-mediatriz",
      type: "slide",
      help: [
        {
          label: "¿Por qué más de la mitad?",
          message: "Si la abertura fuera menor que la mitad de $AB$, los arcos de $A$ y de $B$ no llegarían a encontrarse y no habría puntos de corte.",
        },
        {
          label: "¿Por qué sirve esta construcción?",
          message: "Cada punto de corte está a la misma distancia de $A$ (la abertura) y de $B$ (la misma abertura): equidista, así que está en la mediatriz. Dos puntos bastan para fijar una recta.",
        },
      ],
      title: "Trazar la mediatriz con regla y compás",
      blocks: [
        {
          kind: "steps",
          title: "Pasos",
          items: [
            "Pincha el compás en $A$ y ábrelo **más de la mitad** de $AB$.",
            "Traza un arco a cada lado del segmento.",
            "Con **la misma abertura**, pincha en $B$ y traza otro arco.",
            "Une con la regla los dos puntos de corte: es la mediatriz.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "mediatriz-compas", beatMs: 2800 },
    },
    {
      id: "construye-mediatriz",
      type: "slide",
      help: [
        {
          label: "¿Qué abertura elijo?",
          message: "Una que supere la mitad de $AB$ (30 mm). Con 24 mm el compás se queda corto; con 40 mm los arcos se cortan bien.",
        },
        {
          label: "¿Por qué se bloquea la abertura?",
          message: "En el papel tampoco se puede cambiar el compás entre los dos arcos: ambos deben tener el mismo radio.",
        },
      ],
      title: "Constrúyela tú",
      blocks: [
        {
          kind: "text",
          text: "Elige la abertura, gira el compás para trazar el primer arco, pásate a $B$ y traza el segundo. Después coloca la regla.",
        },
        {
          kind: "warning",
          title: "Prueba una abertura corta",
          text: "Con una abertura de menos de 30 mm (la mitad de $AB$) los dos arcos nunca llegan a cortarse y no hay mediatriz.",
        },
      ],
      visual: { kind: "tool", tool: "compas-mediatriz", params: { a: 40 } },
    },
    {
      id: "perpendicular-mitad",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué sé de P?",
          message: "$P$ está en la mediatriz de $AB$: por tanto está a la misma distancia de $A$ que de $B$.",
        },
        {
          label: "Con un esquema",
          message: "Dibuja el segmento $AB$, la mediatriz y un punto $P$ de ella unido a los dos extremos: los dos segmentos que salen de $P$ son iguales.",
        },
      ],
      title: "Distancias desde la mediatriz",
      question:
        "El punto P está en la mediatriz del segmento AB y su distancia a A es de 7 cm. ¿Cuántos centímetros hay de P a B? (escribe solo el número)",
      correctAnswers: ["7"],
      hint: "Los puntos de la mediatriz equidistan de los extremos.",
      explanation: "$P$ equidista de $A$ y de $B$: $\\overline{PB} = \\overline{PA} = 7$ cm.",
    },
    {
      id: "bisectriz",
      type: "slide",
      help: [
        {
          label: "¿Qué es la distancia de un punto a una recta?",
          message: "La longitud del segmento **perpendicular** desde el punto hasta la recta: es la distancia más corta posible.",
        },
        {
          label: "¿La bisectriz es una recta?",
          message: "Es una **semirrecta**: parte del vértice del ángulo y no tiene fin.",
        },
      ],
      title: "Bisectriz de un ángulo",
      blocks: [
        {
          kind: "definition",
          text: "La **bisectriz** de un ángulo es la **semirrecta** que lo divide en otros dos ángulos iguales.",
        },
        {
          kind: "rule",
          title: "Propiedad",
          text: "Los puntos de la bisectriz **equidistan** de los lados del ángulo (la distancia se mide en perpendicular).",
          formula: "\\overline{PR} = \\overline{PS} \\qquad \\overline{QR'} = \\overline{QS'}",
        },
      ],
      visual: { kind: "anim", scene: "bisectriz-equidistan" },
    },
    {
      id: "explora-bisectriz",
      type: "slide",
      help: [
        {
          label: "¿Qué debo observar?",
          message: "Mueve P a lo largo de la bisectriz: las dos distancias crecen o decrecen juntas, siempre iguales. Y cada mitad del ángulo vale justo la mitad.",
        },
      ],
      title: "Explora: ángulos iguales y distancias iguales",
      blocks: [
        {
          kind: "text",
          text: "Cambia la **amplitud** del ángulo y la **posición** de $P$ sobre la bisectriz. ¿Qué se mantiene siempre igual?",
        },
      ],
      visual: { kind: "tool", tool: "bisectriz-explorador", params: { a: 60, b: 3 } },
    },
    {
      id: "farola",
      type: "predict",
      help: [
        {
          label: "¿Qué recta me interesa?",
          message: "Un camino que se mantiene a la misma distancia de las dos aceras es la bisectriz del ángulo que forman.",
        },
        {
          label: "¿Cuánto vale cada mitad?",
          message: "La bisectriz parte el ángulo en dos iguales: divide $80^\\circ$ entre $2$.",
        },
      ],
      title: "Una farola en la esquina",
      question:
        "Dos aceras se cruzan formando una esquina de 80°. El ayuntamiento coloca una farola en un punto que está a la misma distancia de las dos aceras. El camino recto desde la esquina hasta la farola, ¿qué ángulo forma con cada acera?",
      mode: "choice",
      choices: [
        { id: "a", label: "$40^\\circ$" },
        {
          id: "b",
          label: "$80^\\circ$",
          incorrectFeedback:
            "$80^\\circ$ es el ángulo completo de la esquina. El camino a la farola lo reparte en dos ángulos iguales, así que cada uno es menor.",
        },
        {
          id: "c",
          label: "$160^\\circ$",
          incorrectFeedback:
            "Has duplicado el ángulo. La bisectriz divide el ángulo en dos partes iguales; no lo multiplica.",
        },
        {
          id: "d",
          label: "$90^\\circ$",
          incorrectFeedback:
            "$90^\\circ$ sería un ángulo recto, y nada en el enunciado lo indica. El camino queda justo en medio de los $80^\\circ$.",
        },
      ],
      correctChoiceId: "a",
      shuffleChoices: true,
      explanation:
        "Los puntos que equidistan de los dos lados están en la **bisectriz**, que reparte $80^\\circ$ en dos ángulos de $80^\\circ : 2 = 40^\\circ$.",
    },
    {
      id: "construir-bisectriz",
      type: "slide",
      help: [
        {
          label: "¿Por qué hay que usar tres arcos?",
          message: "El primero marca dos puntos, $R$ y $S$, a la misma distancia del vértice. Los otros dos buscan un punto $T$ a igual distancia de $R$ y de $S$: ese punto queda en medio del ángulo.",
        },
      ],
      title: "Trazar la bisectriz con regla y compás",
      blocks: [
        {
          kind: "steps",
          title: "Pasos",
          items: [
            "Pincha en el **vértice** y traza un arco que corte a los dos lados ($R$ y $S$).",
            "Pincha en $R$ y traza un arco dentro del ángulo.",
            "Con **la misma abertura**, pincha en $S$ y traza otro arco que corte al anterior.",
            "Une el vértice con el punto de corte: es la bisectriz.",
          ],
        },
      ],
      visual: { kind: "anim", scene: "bisectriz-compas", beatMs: 2800 },
    },
    {
      id: "construye-bisectriz",
      type: "slide",
      help: [
        {
          label: "¿Y si no se cortan los arcos?",
          message: "Los arcos de $R$ y de $S$ solo se cortan si su radio es mayor que la mitad de $RS$. Ábrelo más y repite.",
        },
        {
          label: "¿Qué cambia si cambio la amplitud?",
          message: "La construcción es la misma: la bisectriz siempre queda en medio, deja dos ángulos iguales.",
        },
      ],
      title: "Constrúyela tú",
      blocks: [
        {
          kind: "text",
          text: "Traza el arco del vértice, después el de $R$ y el de $S$, y coloca la regla. Cambia la amplitud o la abertura y repite.",
        },
      ],
      visual: { kind: "tool", tool: "compas-bisectriz", params: { a: 60, b: 40 } },
    },
    {
      id: "mitades",
      type: "fill_in_blank",
      help: [
        {
          label: "¿Qué hace la bisectriz?",
          message: "Divide el ángulo en dos partes **iguales**: cada una es la mitad.",
        },
        {
          label: "¿Qué operación hago?",
          message: "Divide los $70^\\circ$ entre $2$.",
        },
      ],
      title: "Las dos mitades",
      question:
        "Un ángulo de 70° se divide con su bisectriz. ¿Cuántos grados mide cada uno de los dos ángulos que resultan? (escribe solo el número)",
      correctAnswers: ["35", "35º", "35°"],
      hint: "Los dos ángulos son iguales y suman 70°.",
      explanation: "$70^\\circ : 2 = 35^\\circ$ cada uno.",
    },
  ],
};
