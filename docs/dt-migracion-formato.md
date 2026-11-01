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

**La web y el libro tienen los mismos temas con el mismo número.** El tema N de la web es el tema N del libro; la carpeta de las lecciones es `src/data/lessons/dibujo-tecnico-1-bachillerato/NN-<tema>/`. Los números que faltan son temas del libro que aún no tienen lecciones. Los temas 20 a 22 son ampliaciones que no están en el libro.

| Tema (libro y web) | Páginas del PDF | Lecciones en la web | Estado |
|---|---|---|---|
| 1. Instrumentos de dibujo | 10–17 | 2 | Migrado |
| 2. Trazados fundamentales en el plano | 18–29 | 12 | Migrado hasta la pág. 25 (falta la 26 en adelante: ángulos con plantillas y actividades) |
| 3. Escalas | 30–35 | 1 (sin migrar: escalas numéricas y gráficas, que venían de la normalización) | Oculto |
| 4. Formas poligonales I (triángulos) | 36–43 | 2 | Migrado (por revisar contra el libro) |
| 5. Formas poligonales II (cuadriláteros y polígonos regulares) | 44–53 | 4 | Migrado (por revisar contra el libro) |
| 6. Relaciones geométricas | 54–61 | 4 (Thales, media proporcional y áurea, equivalencia y cuadratura, semejanza y escalas) | Migrado (por revisar contra el libro) |
| 7. Transformaciones geométricas | 62–65 | 4 | Migrado |
| 8. Tangencias | 66–75 | 3 | Migrado (por revisar contra el libro) |
| 9. Curvas técnicas | 76–81 | 2 (óvalo y ovoide, espirales y evolvente) | Migrado (por revisar contra el libro) |
| 10. Curvas cónicas | 82–89 | 0 (en la web están en DT II) | Sin lecciones |
| 11. Sistemas de representación | 90–93 | 1 | Sin migrar (oculto) |
| 12. Sistema diédrico | 94–109 | 9 | Sin migrar (oculto) |
| 13. Sistema de planos acotados | 110–117 | 4 | Sin migrar (oculto) |
| 14. Sistema axonométrico | 118–133 | 4 | Sin migrar (oculto) |
| 15. Sistema de perspectiva caballera | 134–145 | 1 | Sin migrar (oculto) |
| 16. Normalización: principios generales de representación | 146–161 | 4 (líneas, formatos, vistas, simbología) | Sin migrar (oculto) |
| 17. Normalización: rotulación normalizada | 162–167 | 0 | Sin lecciones |
| 18. Normalización: acotación | 168–183 | 1 | Sin migrar (oculto) |
| 19. Arte y dibujo técnico | 184–205 | 0 | Sin lecciones |
| 20. Historia y fundamentos geométricos (ampliación) | — | 4 | Oculto |
| 21. Sistema cónico (ampliación) | — | 2 | Oculto |
| 22. Sistemas CAD (ampliación) | — | 4 | Oculto |

Los temas 3 y 4 a 9 llevan lecciones que antes estaban agrupadas de otra forma (por ejemplo, «Tangencias y curvas técnicas» era un solo tema); se repartieron para que cada tema de la web coincida con el del libro. Hay que revisar el contenido de los temas 3 a 9 contra el libro, tema por tema.

## Decisiones tomadas

- **Orden:** el propuesto arriba (confirmado).
- **Formato de los sistemas de representación:** la misma «mesa de dibujo» (`bench`) del tema 1: escenas SVG realistas con pasos dentro de la diapositiva, animación de la explicación y práctica paso a paso con práctica guiada (solo se aceptan acciones válidas y al terminar sale el «Correcto» solo). No habrá modelo 3D interactivo. Se crearán las escenas nuevas que haga falta (planos de proyección, sólidos proyectados sobre la hoja…) reutilizando el motor de práctica.
- **Código antiguo:** cuando un tema esté migrado, se retiran las herramientas, animaciones y talleres antiguos que ya no use ninguna lección (con sus tests).

## Código antiguo retirado

- Tema 3 (proporcionalidad, equivalencia y semejanza): herramientas `dt1-thales-explorador`, `dt1-media-proporcional-explorador`, `dt1-equivalencia-explorador` y `dt1-homotecia-explorador`, la animación `dt1-seccion-aurea` y sus helpers de cálculo y tests. La homotecia se trabaja en el tema 5; la lección 4 del tema 3 pasa a centrarse en semejanza y escalas.
- Tema 4 (triángulos, cuadriláteros y polígonos): herramientas `dt1-puntos-notables-explorador`, `dt1-triangulo-datos-explorador`, `dt1-cuadrilatero-explorador`, `dt1-poligono-regular-explorador`, `dt1-metodo-general-explorador` y `dt1-estrellado-explorador`, la animación `dt1-pentagono-euclides`, el archivo `DtPoligonosTools.tsx` y sus cálculos y tests.
- Tema 6 (tangencias y curvas técnicas): herramientas `dt1-tangente-punto-explorador`, `dt1-circunferencias-explorador`, `dt1-enlace-explorador`, `dt1-ovalo-explorador` y `dt1-espiral-evolvente-explorador`, las animaciones `dt1-tangentes-punto` y `dt1-trazado-ovalo`, el archivo `DtTangenciasTools.tsx` y sus cálculos y tests.

### Orden del libro (decisión del autor)

A partir de ahora se sigue **el orden del libro**: se migra cada tema con todo su contenido, de principio a fin, y cuando se haya recorrido todo el libro se añade lo que falte de la LOMLOE. El contenido de cada tema se saca de `temp/dibujo-tecnico/1-bachillerato/` (los PDF están escaneados: se leen como imágenes, página a página).
