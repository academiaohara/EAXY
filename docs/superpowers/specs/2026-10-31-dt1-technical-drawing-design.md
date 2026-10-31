# Dibujo Técnico I: lámina técnica verificable

## Intención

Las actividades de Dibujo Técnico I deben comportarse como dibujos técnicos, no como formularios numéricos con un SVG decorativo. El alumno tiene que ver y manipular una pieza coherente, sus proyecciones, su escala y sus cotas.

## Resultado visible

- Una pieza tridimensional sencilla genera alzado, planta y perfil izquierdo mediante proyección ortogonal.
- Las tres vistas mantienen correspondencia, alineación y disposición del método europeo: planta bajo el alzado y perfil izquierdo a la derecha.
- La escala transforma toda la geometría del dibujo con una única razón `dibujo : realidad`; las cifras de cota conservan la medida real.
- La acotación utiliza línea fina, líneas auxiliares que sobrepasan la línea de cota, flechas cerradas y cifra centrada sin que la línea atraviese el texto.
- El papel se presenta como una lámina blanca con marco, zona útil y cajetín; no como un plano cartesiano.
- La interacción principal ocurre sobre la lámina. Los campos numéricos quedan como apoyo preciso y accesible.

## Enfoques considerados

1. Corregir a mano cada SVG existente. Es rápido, pero vuelve a duplicar cálculos y permite que las vistas se contradigan.
2. Usar imágenes del libro. Son una referencia visual útil, pero no responden a la interacción y el libro es anterior a LOMLOE.
3. Crear primitivas y un modelo geométrico compartido. Es el enfoque elegido porque permite comprobar matemáticamente escala, proyección y cotas, y reutilizar el mismo lenguaje visual en el resto del curso.

## Límites de esta corrección

Se corrigen los tres fallos concretos —escala, vistas y acotación— y se integran en el bloque de normalización de 1.º de Bachillerato. El motor debe admitir más piezas después, pero esta entrega no intenta ser un CAD completo ni sustituir todas las lecciones del curso de una vez.

## Fuentes y decisiones

El libro antiguo de `temp/dibujo-tecnico/1-bachillerato` sirve como referencia gráfica para escalas, sistemas de representación y acotación. La terminología y las series se mantienen alineadas con ISO 5455 y con las reglas ya documentadas en el curso. El sistema de vistas utilizado es el europeo o primer diedro.
