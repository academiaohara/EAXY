# Estándar de diseño y aceptación de lecciones

Este es el criterio común para crear o revisar lecciones de cualquier asignatura en EAXY. Las guías de componentes describen herramientas disponibles; este documento decide cuándo utilizarlas. Ante una receta antigua que imponga Manim, cuestionarios o cantidades de módulos, aplica este estándar. Las instrucciones explícitas del usuario prevalecen.

## 1. Diseñar el aprendizaje antes de elegir componentes

Antes de editar una lección, leer el tema completo y sus conexiones con el anterior y el siguiente. Preparar una ficha breve con la [plantilla de diseño](./templates/lesson-design.md), dentro de la documentación del trabajo. Si el encargo ya especifica el diseño, completar solo lo que falte; no convertir la ficha en una cadena de aprobaciones.

- Definir qué podrá hacer el alumno al terminar: una acción observable, con condiciones y criterio de éxito. «Comprender la mediatriz» se concreta en «situar un punto que equidiste de dos referencias y comprobar sus distancias».
- Identificar conocimientos previos y el error o dificultad que la lección va a resolver.
- Repartir los conceptos entre lecciones: introducción, práctica y transferencia. Repetir para recuperar o aplicar tiene sentido; volver a explicar lo mismo sin propósito no.
- Formular una pregunta central que organice la experiencia y una situación donde merezca resolverla.
- Diseñar primero la acción del alumno y su evidencia de aprendizaje; después, la explicación y el medio visual que le ayudan a realizarla.

El índice del libro es una fuente de contenido, no una obligación de convertir cada epígrafe en una pantalla. No fijar cuotas universales de lecciones, pasos, animaciones o preguntas.

## 2. Elegir el medio que necesita la idea

Una misma lección puede combinar medios. Manim es un recurso para trazados, transformaciones y relaciones matemáticas, sin convertirse en identidad obligatoria de todas las pantallas.

| Necesidad de aprendizaje                     | Medio que conviene considerar                       | Acción del alumno                                    |
| -------------------------------------------- | --------------------------------------------------- | ---------------------------------------------------- |
| Seguir una construcción o demostración       | Animación geométrica por fases                      | Anticipar, construir o comprobar una propiedad       |
| Leer un plano, mapa, recibo o gráfico        | Documento legible con anotaciones y herramientas    | Inspeccionar, medir, localizar información o reparar |
| Aprender una operación de CAD o programación | Simulación funcional de una interfaz                | Ejecutar la operación y observar su resultado        |
| Descubrir una relación                       | Manipulable con respuesta inmediata                 | Cambiar una variable, predecir y contrastar          |
| Comparar soluciones                          | Comparador visual o banco de pruebas                | Probar alternativas con criterios concretos          |
| Entender un objeto, material o proceso       | Imagen, modelo, vídeo o escena de realismo adecuado | Observar rasgos, experimentar o diagnosticar         |
| Resolver una situación                       | Escenario de trabajo con documentos y objetos       | Decidir, producir y revisar una solución             |

Realismo significa fidelidad a la tarea: un plano debe poder leerse como plano; una interfaz debe responder a las operaciones que enseña. No equivale a añadir fotografías, texturas o controles decorativos. Elegir ilustración, fotografía, SVG, HTML o modelo según lo que haga visible el concepto y permita operar sobre él.

Los tipos `slide`, `storyboard`, herramientas y módulos existentes son opciones técnicas. Reutilizar cuando encajen. Si falta una interacción esencial, desarrollar el componente mínimo adecuado e integrarlo con navegación, intentos y progreso; no sustituir silenciosamente la actividad por un test porque sea más fácil de implementar. Si el alcance impide hacerlo, describir la limitación concreta.

## 3. Interacción con propósito

La práctica principal debe pedir una acción propia de la materia y mostrar su consecuencia. Ejemplos: completar una vista, corregir una cota, construir con compás, montar un circuito, detectar una avería, interpretar una fuente, editar una frase o experimentar con un modelo.

- Dar un objetivo claro y herramientas suficientes; evitar exploradores que solo digan «mueve los deslizadores».
- Plantear predicción, prueba y contraste cuando ayuden a descubrir la propiedad. No revelar primero la solución de un reto que luego solo pide repetirla.
- Hacer que el error sea informativo: mostrar qué condición falla, orientar una nueva acción y permitir otro intento. La ayuda puede crecer sin entregar toda la solución de entrada.
- Aceptar distintas soluciones válidas cuando el problema las permita. Validar propiedades, unidades y tolerancias justificadas, no una secuencia exacta de clics o coordenadas arbitrarias.
- Permitir deshacer, reiniciar y recuperarse de un estado incorrecto sin perder todo el trabajo.
- Incluir una aplicación con alguna variación respecto al ejemplo guiado para comprobar transferencia.

Los tests y las clasificaciones quedan como comprobaciones puntuales o cuando elegir/clasificar sea el propio aprendizaje. No serán la única práctica ni la práctica dominante de una lección nueva o rediseñada. Toda excepción debe justificar por qué la respuesta cerrada demuestra el objetivo y quedar visible en la ficha de diseño.

Arrastrar respuestas a cajas, vestir un cuestionario como una misión o añadir puntos y confeti no mejora por sí solo la actividad. El interés debe surgir del reto, de poder actuar y de entender el efecto de las decisiones. Evitar castigos, cronómetros sin motivo y tareas de precisión motriz que no evalúan el contenido.

## 4. Explicación y composición visual

- Combinar explicación y acción en el mismo escenario cuando se refieran al mismo objeto. Aprovechar el ancho útil de escritorio; no encerrar toda escena en una tarjeta con borde por defecto.
- Colocar texto breve junto a la parte relevante. En secuencias, sincronizar texto, dibujo y señalización: cada fase debe enseñar exactamente lo que dice.
- Resaltar los términos importantes al aparecer su referente. Compartir colores semánticos entre texto y visual, acompañados de etiquetas o formas para no depender solo del color.
- Usar transiciones para hacer comprensibles los cambios. Mantener control manual, pausa, retroceso y acceso equivalente con movimiento reducido; ningún control puede prometer una acción que no realiza.
- Sustituir listas vacías por ejemplos, comparaciones o documentos anotados cuando aporten comprensión. El espacio en blanco puede ayudar; no rellenarlo con decoración.
- Ajustar tono y realismo a la edad y asignatura, sin infantilizar. Conservar legibilidad de medidas, textos y herramientas.
- Permitir teclado y una alternativa a arrastrar cuando sea necesaria. Acompañar las ayudas visuales con información accesible y mantener las convenciones de navegación y progreso de la plataforma.

## 5. Corrección del modelo y evidencia

Una escena que se renderiza sin errores puede estar enseñando una propiedad falsa. Comprobar el modelo que alimenta el dibujo y su correspondencia con la narración.

Si un validador antiguo solo reconoce `predict`, `classify` o visuales dentro de `slide`, actualizar su cobertura cuando se integre un formato nuevo. No añadir preguntas de relleno para satisfacer un contador. Este cambio de criterio no actualiza por sí solo todos los validadores existentes: la integración de cada interacción deberá comprobarlos.

- Geometría: cuadrados con lados iguales y ángulos rectos; puntos pertenecientes al lugar indicado; arcos que llegan a sus extremos; invariancias e intersecciones calculadas. Usar esos mismos datos para dibujar y validar.
- Ciencias y tecnología: unidades, escalas, conexiones y relaciones físicas coherentes. Identificar cuándo una representación es esquemática; un esquema tampoco puede contradecir la propiedad que pretende demostrar.
- Documentos e interfaces: datos legibles y plausibles, acciones funcionales y consecuencias fieles. Evitar elementos que parezcan operativos y no respondan.
- Revisar estados iniciales, intermedios, finales, errores, reintentos, soluciones alternativas y valores extremos relevantes.
- Verificar en navegador las fases y actividades modificadas. Observar qué ocurre al actuar y equivocarse; una captura de la portada no acredita el recorrido.

## 6. Puerta de aceptación

Para entregar una lección, cada fila debe tener evidencia breve en la descripción de la PR o en un informe enlazado. «Pendiente» significa que todavía falta esa comprobación. La suite verde y la presencia de un visual no sustituyen la revisión pedagógica.

| Criterio                               | Evidencia necesaria                                                                                           |
| -------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| Objetivo observable y reparto del tema | Ficha con qué hace el alumno, qué demuestra y qué queda para otras lecciones                                  |
| Medio adecuado                         | Explicar qué aporta el formato elegido a esa idea                                                             |
| Práctica auténtica                     | Acción principal y resultado producido por el alumno; excepción justificada si depende de respuestas cerradas |
| Feedback útil                          | Ejemplo de error, explicación de la condición y posibilidad de corregir                                       |
| Transferencia                          | Situación nueva que exige aplicar lo aprendido                                                                |
| Fidelidad conceptual                   | Cálculo, fuente o prueba de las propiedades que enseña la escena                                              |
| Correspondencia texto/visual           | Revisión de las fases y estados relevantes, con capturas o recorrido verificable                              |
| Accesibilidad y continuidad            | Teclado, movimiento reducido, reinicio, navegación e intentos/progreso según la interacción                   |

Devolver a diseño si falla el objetivo, la actividad principal o la fidelidad conceptual. Corregir presentación si tapa datos, desperdicia el escenario o desincroniza la explicación. No convertir un fallo de concepto en un detalle de estilo.

## 7. Alcance, coste y entrega

- Aplicar el estándar al trabajo nuevo o al alcance que se esté rediseñando; no reescribir todo el catálogo sin encargo.
- Preparar fichas breves, reutilizar componentes adecuados y verificar primero el flujo más representativo antes de multiplicar pantallas.
- Ejecutar pruebas proporcionales a lo cambiado: datos y documentos no necesitan levantar toda la aplicación. Para lógica interactiva, probar propiedades y resultados; para cambios compartidos, cubrir sus consumidores.
- Ejecutar los controles obligatorios del repositorio cuando correspondan. Repetir comprobaciones amplias solo tras cambios o fallos que lo justifiquen y registrar deuda previa por separado.
- Respetar el presupuesto y las preferencias del usuario. No lanzar agentes, revisiones costosas o generar recursos sin una necesidad concreta y autorización aplicable.
- Entregar lo implementado, la evidencia, las limitaciones y el enlace de PR cuando esté autorizada. No afirmar «didáctico», «divertido» o «realista» como resultado validado con alumnos si solo se ha revisado internamente.
