# Rediseño inmersivo del Tema 1 de Dibujo Técnico I

## Intención

Convertir el Tema 1 en una introducción didáctica, visual e interactiva al dibujo técnico. El alumno debe comprender para qué sirve cada idea, verla evolucionar en pantalla y tomar decisiones útiles; no limitarse a leer listas, memorizar autores o responder distractores evidentes.

El tema se utilizará como piloto de un formato narrativo reutilizable para otras asignaturas.

## Problemas actuales

- El texto y la animación viven en zonas separadas y compiten por la atención.
- El reproductor encierra la visual en una tarjeta con borde y desaprovecha el escenario.
- Las diapositivas de listas dejan grandes superficies vacías.
- Los textos de cada fase aparecen como subtítulos inferiores, lejos de aquello que explican.
- La lección 1 adelanta historia que la lección 2 vuelve a enseñar.
- La lección 2 adelanta el arco capaz antes de la lección de lugares geométricos.
- Las lecciones 3 y 4 repiten definiciones y aplicaciones.
- Muchos ejercicios comprueban memoria literal, clasificación por palabras clave o cálculo aislado.

## Enfoques considerados

### 1. Reescribir el contenido dentro de los módulos actuales

Es la alternativa más barata, pero conserva el reproductor bordeado, la separación entre explicación y visual y las pantallas vacías. No resuelve el problema principal.

### 2. Formato narrativo inmersivo reutilizable

Elegido. Incorpora un modo de presentación que sincroniza visual, explicación, énfasis y controles en un único escenario. El Tema 1 se reescribe con este formato y con actividades específicas para cada objetivo.

### 3. Una interfaz distinta para cada lección

Permitiría más personalización, pero duplicaría controles, accesibilidad, persistencia y estilos. Sería difícil extenderlo al resto del currículo.

## Arquitectura de presentación

### Nuevo paso narrativo

Se añadirá un tipo declarativo “storyboard” a “LessonStep”.

Cada paso indicará:

- una escena registrada;
- un título general;
- una sucesión de fases;
- el texto breve de cada fase;
- las palabras o expresiones que deben resaltarse;
- la duración opcional;
- ayudas específicas del concepto.

La escena seguirá dibujando su estado según el índice de fase. La explicación se renderizará fuera del SVG para conservar buena legibilidad, adaptación de tamaño, matemáticas y accesibilidad.

### Composición visual

En escritorio, el escenario utilizará todo el ancho disponible:

- aproximadamente dos tercios para la construcción, documento o diagrama;
- aproximadamente un tercio para la explicación sincronizada;
- sin tarjeta interior, borde ni fondo duplicado;
- controles discretos integrados en el pie del presentador;
- indicador de fase cercano a la explicación;
- posibilidad de invertir la composición cuando el texto necesite señalar una zona concreta.

El texto de la fase cambiará con la animación. Las ideas importantes usarán el mismo color que la línea, medida o región destacada en la visual. Las fases anteriores podrán quedar atenuadas cuando ayuden a mantener el razonamiento.

Las listas no se trasladarán literalmente a este formato. Se convertirán en:

- comparaciones visuales;
- documentos anotados;
- mapas de relaciones;
- construcciones que aparecen paso a paso;
- galerías explorables;
- decisiones sobre casos concretos.

### Reutilización

El nuevo reproductor aprovechará el registro de escenas y los controles existentes, pero ofrecerá una variante inmersiva. No se cambiará el aspecto de las animaciones actuales que no opten por este modo.

Debe respetar:

- reproducción, pausa, avance, retroceso y reinicio;
- reducción de movimiento;
- navegación por teclado;
- texto accesible y anuncios de cambio de fase;
- persistencia del progreso de la lección;
- modo presentador y pantalla completa.

## Reparto pedagógico del Tema 1

### Lección 1 — Un lenguaje para construir

**Pregunta central:** ¿Cómo consiguen varias personas construir exactamente el mismo objeto?

**Contenido exclusivo:**

- diferencia entre boceto expresivo y documento técnico;
- precisión y ausencia de ambigüedad;
- vistas, medidas, escala, símbolos y normalización;
- campos profesionales;
- relación entre dibujo manual y CAD.

**Secuencia:**

1. Reto inicial: un taller recibe dos representaciones de una pieza; el alumno decide cuál permite fabricarla.
2. Escena narrativa: el objeto se transforma en vistas y se añaden, por fases, medidas, escala y símbolos.
3. Galería de documentos profesionales con rasgos destacados.
4. Actividad de diagnóstico: localizar información ausente o ambigua en un plano.
5. Actividad visual de campos: asociar documentos ilustrados con su uso.
6. Cierre de transferencia: elegir qué información necesita un profesional para construir un caso nuevo.

La cronología y los autores desaparecen de esta lección.

### Lección 2 — De medir a demostrar

**Pregunta central:** ¿Cómo pasó la geometría de recetas de medida a métodos que siempre funcionan?

**Contenido exclusivo:**

- medida práctica antigua;
- Thales y relaciones geométricas;
- Pitágoras como relación demostrable;
- Euclides, postulados y construcciones con regla y compás;
- Hipatia y la conservación y enseñanza del conocimiento geométrico.

**Secuencia:**

1. Comparación entre medir un caso y demostrar una regla.
2. Línea histórica breve en la que cada hito resuelve un problema, no una lista de fechas.
3. Exploración de Pitágoras mediante áreas, evitando convertir la lección en una tanda de cálculos.
4. Construcción guiada con regla y compás vinculada a Euclides.
5. Actividad de ordenar razonamientos o pasos.
6. Transferencia: decidir qué afirmación es válida para cualquier figura y justificarla.

No se define el arco capaz ni se anuncia como la siguiente lección. El teorema del ángulo en semicircunferencia puede aparecer como ejemplo de Thales, sin desarrollar su lugar geométrico.

### Lección 3 — Encontrar puntos mediante condiciones

**Pregunta central:** ¿Qué figura forman todos los puntos que cumplen una misma condición?

**Contenido exclusivo:**

- concepto de lugar geométrico;
- circunferencia;
- mediatriz;
- bisectriz;
- paralelas a distancia fija;
- intersección de lugares para resolver construcciones.

**Secuencia:**

1. Predicción inicial sobre puntos que mantienen una distancia.
2. Explorador a pantalla ancha: el alumno mueve P y ve variar o conservarse las magnitudes.
3. Narración sincronizada para cada lugar, con distancias y condiciones resaltadas.
4. Actividad de construir una mediatriz o bisectriz por fases.
5. Problemas de intersección con cero, una o dos soluciones.
6. Transferencia: escoger los dos lugares necesarios para localizar un punto.

El arco capaz solo se presenta al final como una nueva condición angular que se estudiará después.

### Lección 4 — Ver un segmento bajo el mismo ángulo

**Pregunta central:** ¿Desde qué posiciones se ve un segmento bajo un ángulo determinado?

**Contenido exclusivo:**

- definición experimental del arco capaz;
- invariancia del ángulo inscrito;
- caso de 90 grados y relación con Thales;
- construcción con regla y compás;
- efecto de modificar el ángulo;
- aplicaciones de localización y diseño.

**Secuencia:**

1. Predicción: varios observadores miran el mismo segmento desde distintas posiciones.
2. Explorador: mover P y descubrir el arco antes de nombrarlo.
3. Construcción narrativa a pantalla completa, con cada trazo acompañado por su razón.
4. Comparación visual de ángulos menores, iguales y mayores que 90 grados.
5. Problema auténtico de localización mediante intersección de dos arcos.
6. Construcción o selección de pasos como evaluación final.

La fórmula del radio se presenta como ampliación derivada de la geometría, no como centro de tres ejercicios numéricos consecutivos.

## Principios para las actividades

- Toda actividad debe comprobar la pregunta central de la lección.
- La respuesta correcta no debe reconocerse solo por repetir literalmente el texto anterior.
- Los distractores deben representar errores plausibles.
- Se priorizan documentos, construcciones, medidas y decisiones visuales.
- El alumno debe predecir antes de que la animación revele la respuesta cuando sea útil.
- El feedback explica la propiedad geométrica que decide la respuesta.
- Una lección alterna explicación y acción; no acumula tres o más pantallas pasivas seguidas.
- Se limita la carga: una decisión principal por actividad y entre seis y ocho pasos por lección.

## Componentes interactivos

Se crearán únicamente los componentes que el rediseño necesita y que puedan reutilizarse:

- comparación entre boceto y plano técnico;
- inspector de información de un plano;
- galería de campos profesionales;
- explorador y constructor de lugares geométricos;
- explorador y construcción del arco capaz;
- ordenación de pasos de construcción.

Cuando un comportamiento pueda expresarse con los tipos “predict”, “explore” o controles existentes, se reutilizará. No se crearán componentes específicos para preguntas convencionales.

## Alcance

Incluye:

- el nuevo formato narrativo;
- escenas necesarias para las cuatro lecciones;
- reescritura de los cuatro archivos de lección;
- actividades interactivas y feedback;
- pruebas de registro, renderizado, navegación, reducción de movimiento y contenido;
- revisión visual completa a 1440 × 1000.

No incluye:

- rediseñar otros temas en esta entrega;
- cambiar el contenedor global de todas las lecciones;
- modificar el currículo, títulos, rutas o progreso;
- crear una experiencia móvil;
- sustituir el tutor o la navegación lateral.

## Criterios de aceptación

- Ninguna lección repite la enseñanza principal de otra.
- Cada lección tiene una pregunta central reconocible.
- El texto de las escenas cambia sincronizado con la visual.
- Los términos destacados comparten color o relación visible con el dibujo.
- Las escenas inmersivas no muestran la tarjeta bordeada del reproductor antiguo.
- No quedan diapositivas compuestas únicamente por una lista pequeña en una gran zona vacía.
- Las actividades requieren aplicar una propiedad o interpretar un documento.
- El tema completo puede recorrerse sin referencias incorrectas a lecciones anteriores o siguientes.
- La navegación, accesibilidad, persistencia y reducción de movimiento siguen funcionando.
- Los tests existentes y los nuevos tests específicos pasan.

## Decisiones del constructor

El implementador puede decidir:

- proporciones exactas de las columnas dentro de los límites anteriores;
- nombres internos de componentes y tipos;
- detalles gráficos de documentos y piezas;
- qué actividades usan SVG, HTML o una combinación;
- tiempos concretos de las fases, siempre que el alumno conserve control manual.
