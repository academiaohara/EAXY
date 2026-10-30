# Jerarquía visual de cursos y contenidos

## Intención

Hacer que las tarjetas de todas las asignaturas se lean más rápido, evitando repetir la materia y la etapa educativa cuando el contexto de la página ya las deja claras.

## Criterio elegido

- El círculo de cada curso muestra únicamente el ordinal del nivel: `1º`, `2º`, `3º` o `4º`.
- El encabezado de sección conserva la etapa (`ESO` o `Bachillerato`), por lo que no se repite dentro del círculo.
- Los títulos especializados eliminan el curso redundante: por ejemplo, `Dibujo Técnico I 1º Bachillerato` pasa a `Dibujo Técnico I`, y `Tecnología e Ingeniería II 2º Bachillerato` pasa a `Tecnología e Ingeniería II`.
- Los títulos sencillos que necesitan el nivel para distinguirse, como `Matemáticas 1º ESO`, lo conservan completo.
- Las etiquetas de la vista por contenido se reducen al intervalo de niveles: `1º → 2º`, `2º → 4º` o un único ordinal cuando solo corresponde a un curso.
- Se mantiene el color propio de cada asignatura, pero se mejora la jerarquía mediante tamaños, separación y etiquetas más compactas.

## Alcance

El criterio se aplica a Matemáticas, Física y Química, Tecnología y Dibujo Técnico, tanto en la vista `Por curso` como en `Por contenido`. No cambia nombres almacenados, rutas, progreso ni datos curriculares; solo su presentación.

## Alternativas consideradas

- Mostrar `1º Bach.` dentro del círculo: aporta contexto, pero repite el encabezado de etapa y vuelve a cargar la tarjeta.
- Mostrar `De 1º a 2º` en las etiquetas: es más conversacional, aunque ocupa más espacio y compite con el título.
- Se elige la forma compacta (`1º`, `1º → 2º`) porque encaja mejor con la petición y funciona igual en todas las asignaturas.

## Validación

Se cubrirán con tests las funciones que extraen el ordinal, simplifican títulos especializados y construyen intervalos. Después se comprobarán las vistas de las cuatro asignaturas y se ejecutarán los tests relacionados, TypeScript y lint sobre los archivos modificados.
