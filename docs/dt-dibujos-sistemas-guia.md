# Dibujos de teoría de los sistemas de representación (DT I, temas 12–15): cómo se hacen

Guía para continuar el trabajo. Describe el tipo de dibujo que se ha acordado con el usuario, cómo está montado en el código, cómo se revisa y en qué punto quedó.

## 1. Qué pidió el usuario

- «Buenos dibujos no es que tengan mucha información a la vez, es que sean claros». No saturar.
- Seguir el libro (Editorial Donostiarra, `temp/dibujo-tecnico/1-bachillerato/`, PDF escaneados: hay que leer las páginas como imagen).
- Relacionar siempre lo que pasa **en el espacio** con lo que queda **en el dibujo**.
- Ejercicios sobre el propio dibujo (las prácticas `construccionPasos(...)` que ya existen); nada de tests sueltos.
- Sin deslizadores por defecto. Tono de Bachillerato, no infantil.
- Solo escritorio. Sin commit, push ni PR salvo que el usuario lo pida.

## 2. Reglas de diseño de cada dibujo

1. **Un paso, una idea.** Cada paso añade dos o tres elementos como mucho y su texto explica solo eso. Entre 3 y 5 pasos por dibujo.
2. **Lo auxiliar se retira.** Las líneas de construcción que ya han dado su punto desaparecen (`dura: 1`). Lo que debe quedarse aunque el paso sea temporal va en `base`.
3. **Casos distintos, de uno en uno.** Si la diapositiva compara casos (recta horizontal, frontal, de punta…), cada caso es un paso con `dura: 1` sobre unos ejes fijos en `base`. Nunca todos apilados.
4. **Coordenadas calculadas, nunca a ojo.** Cada punto se define una vez por sus coordenadas en el espacio y las proyecciones, trazas e intersecciones salen de funciones. Los dibujos antiguos tenían puntos mal situados por ponerlos a mano.
5. **Doble vista cuando el sistema la tiene.** En diédrico y acotados: «En el espacio» a la izquierda y «En el dibujo» a la derecha, con rótulos grises pequeños. En axonométrico y caballera el dibujo ya es una perspectiva, así que la doble vista solo se usa donde explica algo (cómo pasan los ejes del espacio al papel, por qué se reduce una medida, figura en verdadera forma frente a su perspectiva).
6. **Colores con significado fijo.** Verde: el elemento real o la proyección directa. Naranja: proyección horizontal (′, plano XOY). Azul: proyección vertical (″, plano XOZ). Morado: tercera proyección (‴, plano YOZ). Gris: auxiliar. Rojo: el resultado o lo que se destaca en ese paso.
7. **Rótulos que no se pisan.** Tamaño 15–19. Ningún rótulo encima de un eje ni de otra línea: se ajusta con `dx`, `dy`.
8. **Evitar coincidencias engañosas.** En isométrica, un punto con x ≈ y y z ≈ (x + y)/2 cae sobre el origen; una recta puede verse vertical sin serlo; una recta puede pasar justo por O o coincidir con un eje. Hay que elegir datos que no produzcan esto (por ejemplo P = (120, 55, 125) en vez de (95, 80, 90)).
9. **Textos.** Frases completas y concretas. `**negrita**` para el término que se define y `$...$` para letras y fórmulas. Nombrar las cosas como el libro (P′, α₁, T₁…).

## 3. Cómo está montado

- Motor: `src/components/lesson/anim/diagramas/engine.tsx`. Un dibujo es `Diagrama { label, pasos: Paso[] }` y cada `Paso { texto, items, dura?, base?, solo?, recorta? }`. Elementos: `seg`, `fl` (flecha), `pt`, `poli`, `lin`, `circ`, `arc`, `txt`. El encuadre es automático (hoja de 600×360); si el dibujo es muy ancho, el texto se ve más pequeño, así que conviene una proporción cercana a 1,8 : 1.
- Cada paso necesita al menos un elemento en `items` y un texto de más de 10 caracteres (lo exige `src/tests/unit/diagramas.test.tsx`).
- Modelos por tema, todos en `src/components/lesson/anim/diagramas/`:
  - `diedrico-modelo.ts` + `diedrico-espacio.ts` (tema 12, terminado).
  - `acotados-espacio.ts` (tema 13, parte principal terminada).
  - `axonometrico-espacio.ts` (tema 14, en curso: ver punto 5).
  - Tema 15 (caballera): sin empezar; el archivo actual es `caballera.ts`.
- Los archivos nuevos se registran en `index.tsx` **después** del antiguo, de modo que sustituyen a las claves del mismo nombre sin borrar el archivo viejo (para deshacer basta quitar esa línea).
- En las lecciones (`src/data/lessons/dibujo-tecnico-1-bachillerato/<tema>/`) una diapositiva es `slide("id", "Título", [], diagrama("clave"), "visual-top")`, y cada explicación va **justo antes** de su práctica `...construccionPasos("id")`.
- No tocar: `SlidePizarra.tsx`, `PredictHoja.tsx`, `HojaPractica.tsx`, `FillInBlank.tsx`, `Classify.tsx`, `StageSteps.tsx`, `anim/sprite.tsx`, el bloque final de `globals.css`. En `types.ts` y `registry.tsx`, solo añadir.

## 4. Cómo se revisa un dibujo

No vale con que compile: hay que **verlo paso a paso**.

- `scripts/_dt-hojas.tsx` (temporal, **borrar al terminar**) saca cada paso a imagen:
  `npx tsx scripts/_dt-hojas.tsx <carpeta-de-salida> "d14-*"`
  Genera un JPG por dibujo con todos sus pasos en una rejilla. Se abre con la herramienta de lectura de imágenes.
- En cada paso se comprueba: ¿se entiende sin leer el texto?, ¿hay rótulos pisados?, ¿algún punto cae sobre el origen o un eje?, ¿queda algo auxiliar que ya sobra?, ¿coincide con la figura del libro?
- Después: `npx tsc --noEmit -p .`, eslint de los archivos tocados, `npm run test:run` (hay un test de tangencias con compás que falla a veces por tiempos y no tiene relación) y una diapositiva abierta en el navegador.

## 5. Estado (14-11-2026)

- **Temas 12 y 13:** hechos y revisados (tema 13: quedan sin rehacer uso del sistema, cota, curvas de nivel, perfiles, desmonte, explanación y símbolos).
- **Tema 14:** hecho (`axonometrico-espacio.ts`, 22 dibujos) y lecciones 1, 2, 3, 4 y 6 actualizadas. Pendiente de pulir: `d14-tres-puntos` sigue algo apretado.
- **Tema 15:** hecho (`caballera-espacio.ts`, 16 dibujos, dos nuevos: `d15-mu-cubos` y `d15-hexagonos`, añadidos a las lecciones 2 y 4). Revisados en imagen; el óvalo de cuatro centros tiene centros lejanos, como en la Fig. 22 del libro.
- No comprobado en el navegador (el panel integrado no dejó abrir la página); sí tsc, eslint y los tests de diagramas.

## 6. Al terminar

- Recordar al usuario que empezar por el tema 12 fue una suposición (pidió «desde el tema 13 … para entender el sistema diédrico», y el diédrico es el 12).
