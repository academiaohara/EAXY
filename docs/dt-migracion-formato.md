# Dibujo Técnico: migración del contenido anterior al formato nuevo

## Punto de partida

El contenido creado a partir del RD 243/2022 (LOMLOE) antes de la «mesa de dibujo» sigue publicado y funciona:

| Curso | Lecciones | Cálculos (`calc`) | Tests (`pick`) | Clasificaciones (`sort`) | Diapositivas (`slide`) | Otros |
|---|---|---|---|---|---|---|
| Dibujo Técnico I (antiguo) | 50 | 144 | 46 | 46 | 158 | 10 storyboards, 8 talleres `dt1-workshop` |
| Dibujo Técnico II | 41 | 100 | 41 | 41 | 142 | — |

Está hecho con animaciones tipo Manim, herramientas con deslizadores y preguntas teóricas. Cumple el temario, pero no el estándar actual: instrumentos y construcciones realistas, práctica en vez de preguntas, pasos dentro de la diapositiva sin scroll, comprobación en el pie (verde/naranja).

Ya renovado (formato nuevo): tema 1 «Instrumentos y trazados fundamentales» (4 lecciones), tema 3 «Proporcionalidad, equivalencia y semejanza» (4 lecciones) y tema 5 «Transformaciones geométricas» (4 lecciones: traslación, giro, simetría y homotecia).

## Principios

1. **Nada se borra hasta que su sustituto está publicado.** Cada lección reescrita conserva `slug` e `id` para no perder el progreso de nadie.
2. **Se conserva el contenido, no el formato.** Definiciones, reglas y notas de las diapositivas antiguas pasan a ser el texto (`notes`) de los pasos de la escena nueva.
3. **Se eliminan** los `calc`, `pick` y `sort` teóricos, los storyboards y los talleres antiguos. La práctica es el propio ejercicio (construir, medir, marcar) con práctica guiada (solo se aceptan acciones válidas y al terminar sale el «Correcto» solo).
4. **Un tema = una PR**, para poder revisar y corregir sobre un tema completo.
5. **Cobertura curricular intacta:** al reescribir cada tema se contrasta de nuevo con los criterios y saberes del RD 243/2022 (DT I y DT II) y, en DT I, con la comparación frente al libro de Editorial Donostiarra.

## Orden propuesto

1. **Geometría plana** (encaja directamente con el motor de práctica con compás, regla y escuadra): ya hechos instrumentos y transformaciones; siguen proporcionalidad y semejanza, triángulos y polígonos, tangencias y curvas técnicas. La «Historia» del tema 2 se mantiene como texto, sin preguntas.
2. **Normalización y documentación gráfica** (formatos, escalas, vistas, líneas, acotación, rotulación): necesita un formato nuevo de «lámina con pieza real».
3. **Sistemas de representación** (diédrico, axonométrico, planos acotados, cónico): necesita formatos nuevos (maqueta de planos de proyección, proyección de un sólido sobre la hoja). Se diseñan y se validan contigo antes de escribir las lecciones.
4. **CAD**: simulación realista de la interfaz.
5. **Dibujo Técnico II**: homología, afinidad, potencia y cónicas reutilizan el motor de compás y regla; los cuerpos y el diédrico avanzado, los formatos del punto 3.

## Fuente en el libro de cada tema

Libro de referencia: *Dibujo Técnico I, 1.º Bachillerato* (Editorial Donostiarra), ya dividido por temas en [`temp/dibujo-tecnico/1-bachillerato/`](../temp/dibujo-tecnico/1-bachillerato/README.md) (un PDF por tema; escaneado, sin texto seleccionable; la página del PDF es la impresa − 1). Las páginas de esta tabla son las del PDF completo, tal como las indica ese README. **Al migrar o añadir un tema, se apunta aquí su tema y páginas de origen.**

| Tema en la web (DT I) | Tema del libro (páginas) | Estado |
|---|---|---|
| Instrumentos y trazados fundamentales | T01 Instrumentos de dibujo (10–17); T02 Trazados fundamentales en el plano (18–29) | Migrado |
| Historia y fundamentos geométricos (lugares geométricos, arco capaz) | Sin tema propio; cerca de T02 y T06 | Sin migrar (oculto) |
| Proporcionalidad, equivalencia y semejanza | T06 Relaciones geométricas (54–61); «Semejanza y escalas» toca T03 Escalas (30–35) | Migrado |
| Triángulos, cuadriláteros y polígonos regulares | T04 Formas poligonales I (36–43); T05 Formas poligonales II (44–53) | Migrado |
| Transformaciones geométricas | T07 Transformaciones geométricas (62–65) | Migrado |
| Tangencias y curvas técnicas | T08 Tangencias (66–75); T09 Curvas técnicas (76–81) | Migrado |
| Sistema diédrico (2 temas) | T11 Sistemas de representación (90–93); T12 Sistema diédrico (94–109) | Sin migrar (oculto) |
| Sistemas axonométricos | T14 Sistema axonométrico (118–133); T15 Perspectiva caballera (134–145) | Sin migrar (oculto) |
| Planos acotados y sistema cónico | T13 Sistema de planos acotados (110–117); el sistema cónico no figura en el índice del libro | Sin migrar (oculto) |
| Normalización y documentación gráfica | T16 Principios generales de representación (146–161); T17 Rotulación normalizada (162–167); T18 Acotación (168–183) | Sin migrar (oculto) |
| Sistemas CAD | Sin tema en el libro | Sin migrar (oculto) |

Sin tema propio en la web: T03 Escalas (30–35), T10 Curvas cónicas (82–89; en la web están en DT II) y T19 Arte y dibujo técnico (184–205). El libro coloca la geometría descriptiva (T11–T15) antes de la normalización (T16–T18); el orden de la web es el acordado en «Orden propuesto».

## Decisiones tomadas

- **Orden:** el propuesto arriba (confirmado).
- **Formato de los sistemas de representación:** la misma «mesa de dibujo» (`bench`) del tema 1: escenas SVG realistas con pasos dentro de la diapositiva, animación de la explicación y práctica paso a paso con práctica guiada (solo se aceptan acciones válidas y al terminar sale el «Correcto» solo). No habrá modelo 3D interactivo. Se crearán las escenas nuevas que haga falta (planos de proyección, sólidos proyectados sobre la hoja…) reutilizando el motor de práctica.
- **Código antiguo:** cuando un tema esté migrado, se retiran las herramientas, animaciones y talleres antiguos que ya no use ninguna lección (con sus tests).

## Código antiguo retirado

- Tema 3 (proporcionalidad, equivalencia y semejanza): herramientas `dt1-thales-explorador`, `dt1-media-proporcional-explorador`, `dt1-equivalencia-explorador` y `dt1-homotecia-explorador`, la animación `dt1-seccion-aurea` y sus helpers de cálculo y tests. La homotecia se trabaja en el tema 5; la lección 4 del tema 3 pasa a centrarse en semejanza y escalas.
- Tema 4 (triángulos, cuadriláteros y polígonos): herramientas `dt1-puntos-notables-explorador`, `dt1-triangulo-datos-explorador`, `dt1-cuadrilatero-explorador`, `dt1-poligono-regular-explorador`, `dt1-metodo-general-explorador` y `dt1-estrellado-explorador`, la animación `dt1-pentagono-euclides`, el archivo `DtPoligonosTools.tsx` y sus cálculos y tests.
- Tema 6 (tangencias y curvas técnicas): herramientas `dt1-tangente-punto-explorador`, `dt1-circunferencias-explorador`, `dt1-enlace-explorador`, `dt1-ovalo-explorador` y `dt1-espiral-evolvente-explorador`, las animaciones `dt1-tangentes-punto` y `dt1-trazado-ovalo`, el archivo `DtTangenciasTools.tsx` y sus cálculos y tests.
