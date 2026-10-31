# Dibujo Técnico: migración del contenido anterior al formato nuevo

## Punto de partida

El contenido creado a partir del RD 243/2022 (LOMLOE) antes de la «mesa de dibujo» sigue publicado y funciona:

| Curso | Lecciones | Cálculos (`calc`) | Tests (`pick`) | Clasificaciones (`sort`) | Diapositivas (`slide`) | Otros |
|---|---|---|---|---|---|---|
| Dibujo Técnico I (antiguo) | 50 | 144 | 46 | 46 | 158 | 10 storyboards, 8 talleres `dt1-workshop` |
| Dibujo Técnico II | 41 | 100 | 41 | 41 | 142 | — |

Está hecho con animaciones tipo Manim, herramientas con deslizadores y preguntas teóricas. Cumple el temario, pero no el estándar actual: instrumentos y construcciones realistas, práctica en vez de preguntas, pasos dentro de la diapositiva sin scroll, comprobación en el pie (verde/naranja).

Ya renovado (formato nuevo): tema 1 «Instrumentos y trazados fundamentales» (4 lecciones) y tema 5 «Transformaciones geométricas» (4 lecciones: traslación, giro, simetría y homotecia).

## Principios

1. **Nada se borra hasta que su sustituto está publicado.** Cada lección reescrita conserva `slug` e `id` para no perder el progreso de nadie.
2. **Se conserva el contenido, no el formato.** Definiciones, reglas y notas de las diapositivas antiguas pasan a ser el texto (`notes`) de los pasos de la escena nueva.
3. **Se eliminan** los `calc`, `pick` y `sort` teóricos, los storyboards y los talleres antiguos. La práctica es el propio ejercicio (construir, medir, marcar) con «Comprobar» en el pie.
4. **Un tema = una PR**, para poder revisar y corregir sobre un tema completo.
5. **Cobertura curricular intacta:** al reescribir cada tema se contrasta de nuevo con los criterios y saberes del RD 243/2022 (DT I y DT II) y, en DT I, con la comparación frente al libro de Editorial Donostiarra.

## Orden propuesto

1. **Geometría plana** (encaja directamente con el motor de práctica con compás, regla y escuadra): ya hechos instrumentos y transformaciones; siguen proporcionalidad y semejanza, triángulos y polígonos, tangencias y curvas técnicas. La «Historia» del tema 2 se mantiene como texto, sin preguntas.
2. **Normalización y documentación gráfica** (formatos, escalas, vistas, líneas, acotación, rotulación): necesita un formato nuevo de «lámina con pieza real».
3. **Sistemas de representación** (diédrico, axonométrico, planos acotados, cónico): necesita formatos nuevos (maqueta de planos de proyección, proyección de un sólido sobre la hoja). Se diseñan y se validan contigo antes de escribir las lecciones.
4. **CAD**: simulación realista de la interfaz.
5. **Dibujo Técnico II**: homología, afinidad, potencia y cónicas reutilizan el motor de compás y regla; los cuerpos y el diédrico avanzado, los formatos del punto 3.

## Decisiones tomadas

- **Orden:** el propuesto arriba (confirmado).
- **Formato de los sistemas de representación:** la misma «mesa de dibujo» (`bench`) del tema 1: escenas SVG realistas con pasos dentro de la diapositiva, animación de la explicación y práctica paso a paso con «Comprobar» en el pie. No habrá modelo 3D interactivo. Se crearán las escenas nuevas que haga falta (planos de proyección, sólidos proyectados sobre la hoja…) reutilizando el motor de práctica.
- **Código antiguo:** cuando un tema esté migrado, se retiran las herramientas, animaciones y talleres antiguos que ya no use ninguna lección (con sus tests).
