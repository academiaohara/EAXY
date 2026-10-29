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
| 10. Química y sociedad | 5: productos cotidianos y pH; seguridad y etiquetado; combustibles y contaminación (con lluvia ácida); efecto invernadero; residuos y sostenibilidad |

Total previsto: 50 lecciones.

## 4.º de ESO (en desarrollo)

Ids con sufijo `-fq4`, herramientas y animaciones `fq4-…`, `FQ4_SUBTITLES`, `moduleId(340 + n)` (curso `fisica-4-eso`, `courseId(9)`). Retoma 3.º con más cálculo, más rigor y formulación inorgánica y orgánica.

| Tema | Lecciones previstas |
|---|---|
| 1. Actividad científica y magnitudes | 3: magnitudes escalares y vectoriales; error e incertidumbre; análisis de datos y ajuste lineal |
| 2. El átomo y la tabla periódica | 3: configuración electrónica; tabla periódica y configuración; propiedades periódicas |
| 3. Enlace químico | 4: iónico y redes cristalinas; covalente, Lewis y geometría; metálico y propiedades de las sustancias; fuerzas intermoleculares |
| 4. Formulación y nomenclatura | 6: números de oxidación; óxidos; hidruros e hidrácidos; sales binarias; hidróxidos y oxoácidos; oxisales |
| 5. Reacciones químicas | 6: mol y masa molar; estequiometría; reactivo limitante; tipos de reacciones y combustión; ácidos, bases y neutralización; oxidación-reducción y velocidad |
| 6. Química del carbono | 5: el carbono y sus enlaces; hidrocarburos; grupos funcionales; combustibles fósiles; polímeros y biomoléculas |
| 7. Cinemática | 5: posición, velocidad y aceleración vectoriales; MRU y MRUA; caída libre y tiro vertical; movimiento circular uniforme; gráficas y seguridad vial |
| 8. Dinámica | 5: leyes de Newton y diagramas de fuerzas; peso, normal y rozamiento; plano inclinado; tensión y poleas; fuerza elástica y fuerza centrípeta |
| 9. Fuerzas gravitatorias | 4: ley de gravitación universal; peso en cuerpos celestes; órbitas y satélites; fenómenos astronómicos |
| 10. Trabajo, energía y potencia | 5: trabajo y potencia; energías cinética y potencial; teorema trabajo-energía; conservación de la energía mecánica; rendimiento |
| 11. Calor y energía térmica | 4: temperatura y equilibrio; calor específico y cambios de estado; transmisión y dilatación; máquinas térmicas y ahorro |
| 12. Ondas | 5: movimiento ondulatorio; ondas mecánicas y electromagnéticas; sonido; luz (reflexión y refracción); aplicaciones y contaminación acústica |

Total previsto: 55 lecciones.

## 1.º de Bachillerato (Física y Química, 12 temas, 54 lecciones)

Ids `-fb1`, herramientas `fb1-`, subtítulos `FB1_SUBTITLES`, carpeta `src/data/lessons/fisica-1-bachillerato/`, moduleId 361–372 (base 360). Contenido según el índice de `LOMLOE.txt` y los saberes básicos de Bachillerato (RD 243/2022); con enfoque de resolución de problemas y nivel de Bachillerato (cálculo con vectores, magnitudes con incertidumbre y unidades SI).

| Tema | Lecciones previstas |
|---|---|
| 1. Estructura atómica | 4: modelos atómicos; espectros y modelo de Bohr; modelo mecanocuántico y números cuánticos; configuración electrónica |
| 2. Sistema periódico | 3: organización y configuración; propiedades periódicas; reactividad |
| 3. Enlace químico | 5: enlace iónico y redes; covalente y Lewis; geometría y polaridad; fuerzas intermoleculares; metálico y propiedades |
| 4. Formulación inorgánica | 4: números de oxidación y binarios; hidróxidos y oxoácidos; oxisales; nomenclaturas de composición y Stock |
| 5. Cantidad de sustancia | 4: mol y masa molar; composición centesimal; fórmula empírica y molecular; estequiometría de partida |
| 6. Gases y disoluciones | 5: variables y leyes de los gases; gas ideal; mezclas y presiones parciales; concentración de disoluciones; dilución y propiedades coligativas |
| 7. Reacciones químicas | 5: ajuste y estequiometría; reactivo limitante y rendimiento; ácidos y bases; oxidación-reducción; aplicaciones industriales y ambientales |
| 8. Química orgánica | 5: carbono y cadenas; hidrocarburos; grupos funcionales oxigenados; funciones nitrogenadas y ésteres; isomería y aplicaciones |
| 9. Cinemática | 5: sistemas de referencia y vectores; MRU y MRUA; caída libre y movimiento parabólico; movimiento circular; gráficas y problemas |
| 10. Estática y dinámica | 5: leyes de Newton; rozamiento y normal; planos inclinados; sistemas de cuerpos; elástica y equilibrio |
| 11. Trabajo, energía y potencia | 5: trabajo y potencia; energías y teorema; fuerzas conservativas; conservación; rendimiento y transformaciones |
| 12. Fuerzas gravitatorias | 4: ley y campo gravitatorio; energía potencial gravitatoria; movimiento orbital; aplicaciones |

## Cursos siguientes (sin desarrollar)

2.º Bachillerato Física (10) y 2.º Bachillerato Química (10), según el índice de `LOMLOE.txt`.

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
| 3.º ESO · 6. El movimiento | Hecho (5 lecciones, `06-el-movimiento/`; herramientas `Fq3MovimientoTools.tsx` (y reutiliza `fq2-mru-explorador`), animación `fq3-mrua.tsx`; bloque `fisica-movimiento-fuerzas`; moduleId 326) |
| 3.º ESO · 7. Las fuerzas y sus efectos | Hecho (5 lecciones, `07-las-fuerzas-y-sus-efectos/`; herramientas `Fq3FuerzasTools.tsx`; bloque `fisica-movimiento-fuerzas`; moduleId 327) |
| 3.º ESO · 8. Energía y calor | Hecho (5 lecciones, `08-energia-y-calor/`; herramientas `Fq3EnergiaTools.tsx`; bloque `fisica-energia-ondas`; moduleId 328) |
| 3.º ESO · 9. Electricidad | Hecho (6 lecciones, `09-electricidad/`; herramientas `Fq3ElectricidadTools.tsx`, animación `fq3-corriente.tsx`; bloque nuevo `fisica-electricidad`; moduleId 329) |
| 3.º ESO · 10. Química y sociedad | Hecho (5 lecciones, `10-quimica-y-sociedad/`; herramientas `Fq3SociedadTools.tsx`; bloque `fisica-cambios-quimicos`; moduleId 330). **Física y Química 3.º ESO completo: 50 lecciones en 10 temas.** |
| 4.º ESO · 1. Actividad científica y magnitudes | Hecho (3 lecciones, `src/data/lessons/fisica-4-eso/01-actividad-cientifica-magnitudes/`; herramientas `Fq4MagnitudesTools.tsx`; bloque `fisica-metodo-medida`; moduleId 341; ids `-fq4`, herramientas `fq4-`) |
| 4.º ESO · 2. El átomo y la tabla periódica | Hecho (3 lecciones, `02-el-atomo-y-la-tabla-periodica/`; herramientas `Fq4AtomoTools.tsx`; bloque `fisica-materia`; moduleId 342) |
| 4.º ESO · 3. Enlace químico | Hecho (4 lecciones, `03-enlace-quimico/`; herramientas `Fq4EnlaceTools.tsx`; bloque `fisica-materia`; moduleId 343) |
| 4.º ESO · 4. Formulación y nomenclatura | Hecho (6 lecciones, `04-formulacion-y-nomenclatura/`; motor de formulación y herramientas `Fq4FormulacionTools.tsx`; bloque `fisica-materia`; moduleId 344) |
| 4.º ESO · 5. Reacciones químicas | Hecho (6 lecciones, `05-reacciones-quimicas/`; herramientas `Fq4ReaccionesTools.tsx`; bloque `fisica-cambios-quimicos`; moduleId 345) |
| 4.º ESO · 6. Química del carbono | Hecho (5 lecciones, `06-quimica-del-carbono/`; herramientas `Fq4CarbonoTools.tsx`; animación `fq4-polimerizacion`; bloque `fisica-cambios-quimicos`; moduleId 346) |
| 4.º ESO · 7. Cinemática | Hecho (5 lecciones, `07-cinematica/`; herramientas `Fq4CinematicaTools.tsx`; animación `fq4-mcu`; bloque `fisica-movimiento-fuerzas`; moduleId 347) |
| 4.º ESO · 8. Dinámica | Hecho (5 lecciones, `08-dinamica/`; herramientas `Fq4DinamicaTools.tsx`; animación `fq4-diagrama-fuerzas`; bloque `fisica-movimiento-fuerzas`; moduleId 348) |
| 4.º ESO · 9. Fuerzas gravitatorias | Hecho (4 lecciones, `09-fuerzas-gravitatorias/`; herramientas `Fq4GravitacionTools.tsx`; animación `fq4-canon-newton`; bloque `fisica-movimiento-fuerzas`; moduleId 349) |
| 4.º ESO · 10. Trabajo, energía y potencia | Hecho (5 lecciones, `10-trabajo-energia-potencia/`; herramientas `Fq4EnergiaTools.tsx`; animación `fq4-conservacion-pista`; bloque `fisica-energia-ondas`; moduleId 350) |
| 4.º ESO · 11. Calor y energía térmica | Hecho (4 lecciones, `11-calor-energia-termica/`; herramientas `Fq4CalorTools.tsx`; animación `fq4-curva-calentamiento`; bloque `fisica-energia-ondas`; moduleId 351) |
| 4.º ESO · 12. Ondas | Hecho (5 lecciones, `12-ondas/`; herramientas `Fq4OndasTools.tsx`; animación `fq4-ondas`; bloque `fisica-energia-ondas`; moduleId 352) |
| 1.º Bach. · 1. Estructura atómica | Hecho (4 lecciones, `src/data/lessons/fisica-1-bachillerato/01-estructura-atomica/`; herramientas `Fb1AtomoTools.tsx`; animación `fb1-orbitales`; bloque `fisica-materia`; moduleId 361; ids `-fb1`, herramientas `fb1-`) |
