# Revisar un tema creado por otro agente (Composer u otro)

Objetivo: revisar rápido y bien un tema nuevo (ver la receta en `docs/pdf-a-tema.md`). Hazlo **en este orden**; casi todo lo mecánico lo cubre el script.

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
npx tsc --noEmit -p . | grep -v "e2e\|playwright"
npx eslint <ficheros nuevos o cambiados>      # el lint global tiene errores previos ajenos
npx vitest run
```
Build con el entorno de `docs/pdf-a-tema.md` §6 antes de dar por bueno.

## 4. Contenido contra el PDF
Si el PDF está en `temp/`, léelo por rangos y contrasta **solo lo que importa**: fórmulas, valores de los ejemplos numéricos (`correctAnswers` y `explanation`), definiciones y unidades. Cálculos que no cuadran con el libro: calcúlalos tú; si el libro tiene el error, usa el valor correcto y anótalo en el aviso final. Revisa también:
- Respuestas correctas de cada `predict`: que no haya dos opciones válidas ni una incorrecta que sea cierta.
- `correctAnswers` numéricas con variantes (`1,33`, `1.33`, fracción) y el redondeo que pide el enunciado.
- Tono: adolescentes, sin infantilismos; sin copiar párrafos largos del libro.
- Herramientas: `Note`/`hint` en texto plano (nada de `$…$`); lecciones y captions sí admiten LaTeX.

## 5. Revisión visual (la que más se salta)
```
npm run dev -- --hostname 127.0.0.1 --port 3000      # en segundo plano
TEMA=<slug-tema> CURSO=<slug-curso> OUT=/tmp/rev node scripts/review-visual.mjs <slug-leccion>   # una por lección con anim/herramienta
```
Lee los `M-*-anim.png` / `M-*-tool.png`. Busca: etiquetas solapadas o cortadas, flechas en sentido contrario, texto cruzado por líneas de ejes, beats sin cambio visible, datos que no corresponden al caption, herramientas con valores por defecto sin sentido, números con punto decimal o sin formato español. Pasa `errors: none` (errores de página en consola).

## 6. Tests de herramientas
Cada herramienta nueva: montaje con params extremos/ausentes/cero + una comprobación numérica. Si falta, añádelos (patrón en `src/tests/unit/lesson/slide-tool-control.test.tsx`).

## 7. Cierre
Corrige directamente lo pequeño; lo grande (lección mal planteada) se lista y se pregunta al usuario. Commit en la rama del usuario, sin PR salvo petición. En la respuesta: qué se ha corregido, qué queda, discrepancias del libro.
