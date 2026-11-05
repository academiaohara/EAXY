# Diseño: mejora del Tema 10 — Curvas cónicas

## Intención

Hacer que el Tema 10 de Dibujo Técnico I sea coherente con el PDF de referencia y más fácil de estudiar: teoría breve pero completa, procedimientos reproducibles y construcciones de lienzo fieles a los datos geométricos.

## Objetivos

- Mejorar las diapositivas teóricas de cónicas, elipse, hipérbola y parábola.
- Incorporar los conceptos del PDF que faltan o están implícitos: posiciones del plano secante, cónicas degeneradas, elementos y relaciones métricas, circunferencias auxiliares y asíntotas.
- Revisar las construcciones del Tema 10 para que sus herramientas representen correctamente cada paso y no solo el resultado final.
- Añadir comprobaciones textuales de la propiedad que justifica cada construcción.
- Mantener la arquitectura actual de lecciones, diagramas y herramientas.

## No objetivos

- No rediseñar el reproductor general de lecciones.
- No convertir el PDF completo en una transcripción literal.
- No cambiar el currículo de Dibujo Técnico II ni las construcciones de otros temas.

## Enfoque elegido

Se mantiene la estructura actual y se hace una corrección focalizada. La teoría se ampliará en los datos de las lecciones/diagramas existentes y las construcciones se corregirán en el registro centralizado de `construcciones-conicas.ts`. Cada construcción conservará su formato de animación y práctica, con una nota final de verificación geométrica.

## Criterios de aceptación

- La web debe reflejar las definiciones del PDF sin contradicciones de signos, nombres o relaciones.
- Elipse: por puntos, haces proyectivos, envolventes y circunferencias auxiliares deben mostrar los datos y líneas auxiliares adecuados.
- Hipérbola: por puntos, haces y envolventes deben conservar la diferencia constante y representar las asíntotas cuando corresponda.
- Parábola: por puntos, por vértice-punto y por envolventes deben mostrar directriz, foco, eje y la equidistancia correspondiente.
- Los tests unitarios existentes de cónicas y lecciones deben seguir pasando; se añadirán pruebas para las invariantes que no estén cubiertas.
- La validación final incluirá typecheck/tests y una comprobación visual de las diapositivas modificadas.

## Decisiones del implementador

- Se reutilizarán los tipos, helpers y componentes existentes.
- Las explicaciones se mantendrán en español claro, con notación consistente y sin sobrecargar cada diapositiva.
- Cuando el PDF use una construcción que no sea adecuada para la herramienta disponible, se conservará el procedimiento equivalente que sí pueda comprobarse geométricamente en el lienzo y se explicitará la propiedad que lo justifica.
