# Rediseño de la experiencia de las lecciones del tema 1

## Objetivo

Rediseñar las cinco lecciones de «Los números naturales» de 1.º ESO para que expliquen las ideas con claridad y ayuden al alumno a descubrirlas mediante escenas visuales e interacción. La lección de multiplicación y división es la referencia de calidad porque ya usa objetos, situaciones concretas y pasos matemáticos visibles.

## Usuario y resultado esperado

El alumno debe poder seguir cada lección sin depender de explicaciones externas: primero entiende la situación, después ve cómo se representa la matemática, manipula una idea y termina aplicándola en un caso con sentido. Al cerrar una lección, debe poder explicar qué hizo y por qué.

## Principios didácticos

1. **Partir de algo reconocible.** Las situaciones —contar objetos, comparar cantidades, comprar, repartir o leer una cuenta— deben dar una razón para aprender la operación.
2. **Hacer visible el razonamiento.** La expresión matemática cambia junto con los grupos, cifras, cantidades o pasos que aparecen en pantalla.
3. **Interacción con propósito.** Cada acción del alumno descubre, compara o aplica una idea. Evitar pantallas de avance vacío y preguntas sueltas de cálculo mecánico.
4. **Feedback que explica.** Una acción incorrecta debe señalar qué relación matemática revisar y permitir probar otra vez.
5. **Pocas etapas, con recorrido completo.** Apuntar a 4–6 pasos por lección y aceptar un paso adicional cuando explique un procedimiento importante. No reducir el contenido hasta convertir una lección en varias definiciones.
6. **Coherencia entre las cinco lecciones.** Repetir el ritmo de situación → visualización → exploración guiada → aplicación → cierre, con escenas específicas para cada tema.

## Diseño de las lecciones

| Lección                            | Experiencia central                                                                                                                                                                                                                                                                                                                                                                                                                                                        | Aprendizaje que debe quedar claro                                                                                                                                                                                                                                              |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 1. Origen y sistemas de numeración | El alumno cuenta una colección, compara marcas, símbolos egipcios y romanos, y después agrupa unidades de diez en diez. La transición final representa una cantidad como decenas y unidades y muestra qué papel cumple el cero en un orden vacío.                                                                                                                                                                                                                          | Los sistemas pueden sumar símbolos o dar valor a la posición de cada cifra. En el decimal, diez unidades de un orden forman una del siguiente; el cero conserva el lugar.                                                                                                      |
| 2. Aproximación por redondeo       | Una cantidad realista (precio o población) se coloca entre dos valores redondos en una recta. Se visualiza cuál está más cerca; después, se anima el corte de cifras y el cambio de la cifra conservada. El alumno resuelve otra aproximación eligiendo en la representación dónde cortar y observa el resultado.                                                                                                                                                          | Redondear es elegir el múltiplo del orden más cercano. La primera cifra descartada decide si se mantiene o aumenta la cifra conservada; truncar no hace esa comparación.                                                                                                       |
| 3. Suma y resta                    | Una compra en la tienda ciclista se construye al seleccionar artículos: cada selección se suma y el total aparece por partes y en columna, conectando unidades, decenas y centenas. En la misma situación se parte de un presupuesto, se paga una compra y se visualiza cuánto queda. La exploración cambia el orden y la agrupación de sumandos y contrasta qué ocurre al restar.                                                                                         | Sumar junta cantidades; restar compara o quita y puede comprobarse con la operación inversa. La conmutativa y la asociativa se aplican a la suma: cambiar el orden o agrupar sus sumandos no cambia el total. La resta no es conmutativa ni asociativa.                        |
| 4. Multiplicación y división       | Mantener las escenas visuales existentes como hilo conductor: grupos iguales y suma repetida; intercambio de factores; un cálculo mental que usa agrupación; reparto de un precio para descubrir la distributiva; un algoritmo de multiplicación; reparto equitativo; división escrita y comprobación de cociente y resto. Elegir las escenas imprescindibles para que el recorrido sea breve y cada escena prepare la siguiente; cerrar conectando multiplicar y dividir. | Multiplicar representa grupos iguales, permite reordenar y descomponer factores y ofrece algoritmos para varias cifras. Dividir deshace esa agrupación mediante reparto o medida. En toda división, dividendo = divisor × cociente + resto y el resto es menor que el divisor. |
| 5. Orden de operaciones            | Una cuenta de cafetería genera dos resultados distintos según se haga primero la suma o la multiplicación. El alumno selecciona la operación en la expresión visual y ve cada reducción. Después compara la misma cuenta con paréntesis y resuelve una expresión nueva manipulando sus operaciones hasta terminarla.                                                                                                                                                       | Paréntesis primero; multiplicación y división después; suma y resta al final. Las operaciones del mismo nivel se resuelven de izquierda a derecha. Los paréntesis pueden cambiar el resultado.                                                                                 |

## Formato y controles

- Cada paso presenta una sola idea principal y combina texto breve con el elemento visual que la explica.
- Las comprobaciones viven dentro de la escena: agrupar fichas, elegir qué cifra conservar, construir una cesta, tocar qué operación resolver o comparar dos representaciones.
- No usar como control una pregunta de opción múltiple que solo pida calcular una cuenta corta, por ejemplo «5 × 2: 10, 12 o 14».
- Cuando una escena admita varios intentos, conservar el estado durante la navegación de la lección con el mecanismo ya existente.
- Cada lección termina con una síntesis visual de la idea y una aplicación breve, no solo con un rótulo de «lección completada».
- Mantener navegación, ritmo y controles compatibles con el marco actual de lecciones. Respetar teclado, foco visible y movimiento reducido.

## Enfoque técnico

Usar los tipos de paso actuales y los módulos de escena ya existentes (`StageModuleRenderer`, tienda ciclista, numeración natural, multiplicación/división y jerarquía de operaciones). Aprovechar las piezas actuales cuando enseñen el concepto y crear o ajustar escenas específicas cuando falte una representación esencial, en vez de añadir un motor genérico nuevo.

La modificación se limita al contenido interactivo y sus escenas del tema 1, además de pruebas y documentación necesarias. Se mantienen los cinco slugs de lección, su posición curricular y el diseño de ejercicios externos ya preparado para más adelante. No se añaden dependencias ni funciones móviles.

## Criterios de aceptación

1. Las cinco lecciones tienen un arco didáctico reconocible y 4–6 pasos aproximadamente, sin eliminar ideas necesarias para cubrir los temas.
2. Cada lección contiene al menos una interacción que hace visible el razonamiento matemático, no solo una animación decorativa.
3. Ningún control principal es una pregunta trivial de opción múltiple sobre una operación inmediata.
4. El feedback explica la relación o regla que debe revisar el alumno.
5. Redondeo distingue claramente redondear y truncar; suma/resta muestra que conmutativa y asociativa son propiedades de la suma; multiplicación/división enlaza las operaciones; jerarquía muestra el efecto de paréntesis y prioridades.
6. Los controles de navegación y la persistencia de estado existente siguen funcionando, incluso si cambian los pasos o escenas.
7. No hay escenas inaccesibles por teclado ni animaciones imprescindibles para entender el contenido.

## Fuera de alcance

- Rediseñar otros temas o cursos.
- Crear ejercicios externos con enunciado, imagen y vídeo; esta especificación solo cubre las lecciones teóricas interactivas.
- Añadir puntuaciones, cronómetros, una capa nueva de gamificación o un sistema genérico de cuestionarios.
- Cambiar el marco global de navegación o la política de escritorio de la aplicación.
