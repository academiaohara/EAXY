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

## Cursos siguientes (sin desarrollar)

3.º ESO (10 temas), 4.º ESO (12), 1.º Bachillerato (12), 2.º Bachillerato Física (10) y 2.º Bachillerato Química (10), según el índice de `LOMLOE.txt`.

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
