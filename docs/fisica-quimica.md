# Física y Química — plan

Fuente: índice orientativo de `temp/fisica-y-quimica/LOMLOE.txt` (2.º, 3.º y 4.º de ESO, 1.º de Bachillerato y 2.º de Bachillerato de Física y de Química) más conocimiento general de la materia. El Real Decreto 243/2022 (`temp/BOE-A-2022-5521_copia.pdf`) solo cubre **Bachillerato**; el de ESO (RD 217/2022) y el desarrollo asturiano no están en el repositorio, así que para ESO el contenido sale del índice orientativo.

Materia en el menú: `fisica` con la etiqueta «Física y Química». Cursos ya creados (vacíos): `fisica-2-eso`, `fisica-3-eso`, `fisica-4-eso`, `fisica-1-bachillerato`, `fisica-2-bachillerato` (solo Física). Pendiente: `quimica-2-bachillerato`.

Convenciones (como en Dibujo Técnico): lecciones en `src/data/lessons/<curso>/<NN-tema>/<NN-leccion>.ts`, ids con sufijo `-fq2` (2.º ESO), herramientas y animaciones `fq2-…`, subtítulos `FQ2_SUBTITLES` en `shared.ts`, una herramienta interactiva por lección y animaciones Manim en las construcciones clave.

## 2.º de ESO (primer curso a desarrollar)

| Tema | Lecciones previstas |
|---|---|
| 1. La actividad científica | 5: método científico; magnitudes y Sistema Internacional; medida, error y cifras significativas; tablas y gráficas; laboratorio y seguridad |
| 2. La materia y sus propiedades | 5: masa, volumen y densidad; estados de agregación; modelo cinético-molecular; cambios de estado; gráficas de calentamiento |
| 3. Sustancias puras y mezclas | 5: clasificación de la materia; disoluciones y concentración; solubilidad; técnicas de separación; aplicaciones |
| 4. Estructura de la materia | 5: modelos atómicos; protones, neutrones y electrones; iones e isótopos; tabla periódica; átomos, moléculas e iones |
| 5. Cambios físicos y químicos | 4: cómo distinguirlos; reacciones químicas; conservación de la masa; combustión y oxidación |
| 6. El movimiento | 5: sistema de referencia y trayectoria; velocidad; MRU; gráficas posición-tiempo; problemas |
| 7. Las fuerzas | 5: concepto y vectores; peso y gravedad; fuerza elástica; rozamiento; equilibrio |
| 8. La energía | 5: formas de energía; cinética y potencial; conservación; calor y temperatura; fuentes y eficiencia |
| 9. La luz y el sonido | 5: propagación y sombras; reflexión; refracción; sonido; contaminación acústica |

Total previsto: 44 lecciones.

## 3.º de ESO (en desarrollo)

Ids con sufijo `-fq3`, herramientas y animaciones `fq3-…`, `FQ3_SUBTITLES`, `moduleId(320 + n)` (curso `fisica-3-eso`, `courseId(8)`). Retoma 2.º con más cálculo: notación científica, enlace y mol, ajuste y cálculos con masas, MRUA, leyes de Newton, trabajo y potencia, electricidad.

| Tema | Lecciones previstas |
|---|---|
| 1. El trabajo científico | 4: método y variables; notación científica y cifras significativas; factores de conversión; tablas, gráficas e informes |
| 2. El átomo y el sistema periódico | 5: modelos atómicos; Z, A y partículas; isótopos e iones; distribución electrónica; tabla periódica y propiedades |
| 3. Elementos y compuestos químicos | 6: elementos y símbolos; enlace iónico; enlace covalente; enlace metálico; fórmulas y masa molecular (mol); nomenclatura |
| 4. La reacción química | 5: ecuaciones y ajuste; conservación de la masa y cálculos; velocidad de reacción; combustión y oxidación; aplicaciones |
| 5. Disoluciones | 4: concentración; solubilidad; preparación y diluciones; separación |
| 6. El movimiento | 5: posición y velocidad media; MRU; aceleración; MRUA; gráficas y problemas |
| 7. Las fuerzas y sus efectos | 5: composición de fuerzas; leyes de Newton; peso, normal y rozamiento; presión; fluidos |
| 8. Energía y calor | 5: trabajo y potencia; conservación; calor y Q = m·c·ΔT; transmisión y aislamiento; rendimiento |
| 9. Electricidad | 6: carga; corriente, tensión y resistencia; ley de Ohm; serie y paralelo; potencia y energía; seguridad |
| 10. Química y sociedad | 4: combustibles y contaminación; efecto invernadero; lluvia ácida y residuos; seguridad y etiquetado |

Total previsto: 49 lecciones.

## Cursos siguientes (sin desarrollar)

4.º ESO (12), 1.º Bachillerato (12), 2.º Bachillerato Física (10) y 2.º Bachillerato Química (10), según el índice de `LOMLOE.txt`.

## Estado

| Tema | Estado |
|---|---|
| Plan de 2.º ESO | Aprobado por el usuario |
| 2.º ESO · 1. La actividad científica | Hecho (5 lecciones, `src/data/lessons/fisica-2-eso/01-actividad-cientifica/`; herramientas `Fq2MedidaTools.tsx`, animación `fq2-metodo.tsx`; bloque `fisica-metodo-medida`; moduleId 301) |
| 2.º ESO · 2. La materia y sus propiedades | Hecho (5 lecciones, `02-materia-propiedades/`; herramientas `Fq2MateriaTools.tsx`, animación `fq2-materia.tsx`; bloque `fisica-materia`; moduleId 302) |
| 2.º ESO · 3. Sustancias puras y mezclas | Hecho (5 lecciones, `03-sustancias-puras-mezclas/`; herramientas `Fq2MezclasTools.tsx`, animación `fq2-destilacion.tsx`; bloque `fisica-materia`; moduleId 303) |
| 2.º ESO · 4. Estructura de la materia | Hecho (5 lecciones, `04-estructura-materia/`; herramientas `Fq2AtomoTools.tsx`, animación `fq2-rutherford.tsx`; bloque `fisica-materia`; moduleId 304) |
| 2.º ESO · 5. Cambios físicos y químicos | Hecho (4 lecciones, `05-cambios-fisicos-quimicos/`; herramientas `Fq2ReaccionesTools.tsx`, animación `fq2-lavoisier.tsx`; bloque `fisica-cambios-quimicos`; moduleId 305) |
| 2.º ESO · 6. El movimiento | Hecho (5 lecciones, `06-el-movimiento/`; herramientas `Fq2MovimientoTools.tsx`, animación `fq2-mru.tsx`; bloque `fisica-movimiento-fuerzas`; moduleId 306) |
| 2.º ESO · 7. Las fuerzas | Hecho (5 lecciones, `07-las-fuerzas/`; herramientas `Fq2FuerzasTools.tsx`, animación `fq2-fuerzas.tsx`; bloque `fisica-movimiento-fuerzas`; moduleId 307) |
| 2.º ESO · 8. La energía | Hecho (5 lecciones, `08-la-energia/`; herramientas `Fq2EnergiaTools.tsx`, animación `fq2-energia.tsx`; bloque `fisica-energia-ondas`; moduleId 308) |
| 2.º ESO · 9. La luz y el sonido | Hecho (5 lecciones, `09-la-luz-y-el-sonido/`; herramientas `Fq2LuzSonidoTools.tsx`, animación `fq2-luz.tsx`; bloque `fisica-energia-ondas`; moduleId 309). **Física y Química 2.º ESO completo: 44 lecciones en 9 temas.** |
| 3.º ESO · 1. El trabajo científico | Hecho (4 lecciones, `src/data/lessons/fisica-3-eso/01-el-trabajo-cientifico/`; herramientas `Fq3TrabajoTools.tsx`; bloque `fisica-metodo-medida`; moduleId 321; ids `-fq3`, herramientas `fq3-`) |
| 3.º ESO · 2. El átomo y el sistema periódico | Hecho (5 lecciones, `02-el-atomo-y-el-sistema-periodico/`; herramientas `Fq3AtomoTools.tsx` (y reutiliza `fq2-construir-atomo-explorador` y `fq2-tabla-periodica-explorador`), animación `fq3-atomo.tsx`; bloque `fisica-materia`; moduleId 322) |
| 3.º ESO · 3. Elementos y compuestos químicos | Hecho (6 lecciones, `03-elementos-y-compuestos-quimicos/`; herramientas `Fq3CompuestosTools.tsx`, animación `fq3-enlace.tsx`; bloque `fisica-materia`; moduleId 323) |
| 3.º ESO · 4. La reacción química | Hecho (5 lecciones, `04-la-reaccion-quimica/`; herramientas `Fq3ReaccionesTools.tsx` (y reutiliza `fq2-ajuste-ecuacion-explorador`), animación `fq3-colisiones.tsx`; bloque `fisica-cambios-quimicos`; moduleId 324) |
| 3.º ESO · 5. Disoluciones | Hecho (4 lecciones, `05-disoluciones/`; herramientas `Fq3DisolucionesTools.tsx`; bloque `fisica-materia`; moduleId 325) |
