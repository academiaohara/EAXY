# Revisar un tema creado por otro agente (Composer u otro)

Objetivo: comprobar que el tema enseña y funciona (ver la receta en `docs/pdf-a-tema.md`). Aplicar el [estándar de calidad](./lesson-quality-standard.md); los scripts comprueban estructura y no sustituyen el juicio pedagógico.

## 0. Aceptación pedagógica

Leer las fichas del tema y recorrer su progresión. Verificar objetivo observable, conocimientos previos y ausencia de explicaciones duplicadas. Identificar la acción principal del alumno: ¿usa el contenido, puede equivocarse, entiende la consecuencia y puede corregir? Si la práctica se limita a tests o agrupaciones, exigir justificación pedagógica o rediseñar dentro del alcance autorizado. Comprobar una aplicación a una variación del ejemplo.

Revisar si el medio elegido aporta: un documento debe poder inspeccionarse; una simulación debe responder; Manim debe mostrar una relación o construcción. Ni una interfaz decorativa ni una animación por pantalla acreditan calidad. Registrar evidencia por criterio de la puerta de aceptación del estándar.

## 1. Alcance (1 min)
`git log --stat origin/main..HEAD` o `git diff --stat main...HEAD`: confirma qué módulo/curso toca y que no hay cambios ajenos (p. ej. `AGENTS.md` regenerado, ficheros sueltos). Identifica el `<slug-curso>` y `<slug-tema>`.

## 2. Coherencia automática (1 min)
```
npx tsx scripts/generate-lessons-index.ts && npm run seed:generate && git status --short   # no debe aparecer nada nuevo sin commitear
npx tsx scripts/review-tema.ts <slug-curso> <slug-tema>
```
Comprueba: ids únicos y correlativos, fichero ↔ slug, ≥5 pasos, al menos un visual por lección, animaciones/herramientas registradas, en los tipos y documentadas, tests de herramientas, seed e índice al día, README y test del curso. Corrige los `ERROR`; valora los `aviso`.

## 3. Calidad técnica (3–5 min)
```
npx tsc --noEmit -p .
npx eslint <ficheros nuevos o cambiados>      # el lint global tiene errores previos ajenos
npx vitest run
```
Build con el entorno de `docs/pdf-a-tema.md` §6 cuando se cambie código de aplicación o su integración. Para documentación sin cambios de producto, verificar enlaces y coherencia de instrucciones. No repetir suites amplias sin cambios o fallos que lo justifiquen; registrar deuda previa por separado.

## 4. Contenido contra el PDF
Si el PDF está en `temp/`, léelo por rangos y contrasta **solo lo que importa**: fórmulas, valores de los ejemplos numéricos (`correctAnswers` y `explanation`), definiciones y unidades. Cálculos que no cuadran con el libro: calcúlalos tú; si el libro tiene el error, usa el valor correcto y anótalo en el aviso final. Revisa también:
- Respuestas correctas de cada `predict`: que no haya dos opciones válidas ni una incorrecta que sea cierta.
- `correctAnswers` numéricas con variantes (`1,33`, `1.33`, fracción) y el redondeo que pide el enunciado.
- Tono: adolescentes, sin infantilismos; sin copiar párrafos largos del libro.
- Herramientas: `Note`/`hint` en texto plano (nada de `$…$`); lecciones y captions sí admiten LaTeX.

## 5. Revisión visual (la que más se salta)

Además de capturas, operar sobre la actividad: un error, una corrección, un reinicio y una solución válida. Revisar fases intermedias y finales, teclado, movimiento reducido y continuidad del progreso. Confirmar con cálculos las propiedades representadas: puntos en arcos, ángulos, escalas e intersecciones, usando los datos que alimentan el dibujo. Un render sin errores no demuestra corrección conceptual.
```
npm run dev -- --hostname 127.0.0.1 --port 3000      # en segundo plano
TEMA=<slug-tema> CURSO=<slug-curso> OUT=/tmp/rev node scripts/review-visual.mjs <slug-leccion>   # una por lección con anim/herramienta
```
Lee los `M-*-anim.png` / `M-*-tool.png`. Busca: etiquetas solapadas o cortadas, flechas en sentido contrario, texto cruzado por líneas de ejes, beats sin cambio visible, datos que no corresponden al caption, herramientas con valores por defecto sin sentido, números con punto decimal o sin formato español. Pasa `errors: none` (errores de página en consola).

## 6. Tests de herramientas
Cada herramienta nueva: montaje con params extremos/ausentes/cero + una comprobación numérica. Si falta, añádelos (patrón en `src/tests/unit/lesson/slide-tool-control.test.tsx`).

## 7. Cierre
Corregir los problemas dentro del alcance autorizado, incluidos los de diseño cuando el usuario haya delegado esa decisión. Consultar solo si falta una decisión que cambie materialmente el alcance. Entregar evidencia por criterio, limitaciones y discrepancias del libro; no declarar validación con alumnos si solo hay revisión interna. Commit y PR según las instrucciones vigentes del usuario.
