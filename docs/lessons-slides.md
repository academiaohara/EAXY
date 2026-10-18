# Diapositivas de lección (`slide`) y animaciones tipo Manim

Formato declarativo para **teoría nueva**: título + bloques de texto con forma propia + un elemento visual (animación o ilustración). Se escribe solo con datos; no hace falta un componente por lección.

```ts
{
  id: "decimal-posicion",
  type: "slide",
  title: "Sistema posicional: el valor lo da el lugar",
  blocks: [ /* columna de texto, de arriba abajo */ ],
  visual: { kind: "anim", scene: "decimal-posicion", params: { n: 35_318, a: 4, b: 2 } },
}
```

- Componente: `src/components/lesson/slide/` (`SlideStepView`, `SlideBlocks`, `SlideFigure`).
- Tipos: `SlideStep`, `SlideBlock`, `SlideAnimId` en `src/lib/lesson/types.ts`.
- Siempre se puede **Continuar**: la animación ayuda, no bloquea.
- Colocación: con `visual`, texto | visual en dos columnas (`arrange: "split"`, por defecto). `visual-top` pone la visual ancha arriba; `text-top` pone los bloques de texto en dos columnas arriba y la visual a todo el ancho debajo (animaciones con expresiones largas); `stack` todo en una columna.
- Pensada para el tema `board` (pizarra oscura, paleta Manim).

## Criterio de redacción

- **Se habla a un adolescente de 12–17 años, no a un niño.** Sin «¡genial!», sin preguntas retóricas de relleno, sin repetir lo mismo con otras palabras.
- Una idea por diapositiva. Si hay que explicarla de dos formas, **cada forma en un bloque distinto** (`definition` + `example`, `compare`, `rule`…), no en dos párrafos.
- Primero lo que importa (definición/regla), luego el caso concreto, luego el matiz o error típico (`warning`).
- Contextos reales (precios, recibos, listas de espera, mapas…) mejor que «Juan tiene 5 manzanas».
- Cuando haya un **proceso** (canjear, redondear, repartir, reescribir una expresión) → animación. Cuando sea una **definición** → bloque de texto; no se anima por animar.
- Cada diapositiva con preguntas debajo: tras 2–3 diapositivas de teoría, un `predict` con una decisión matemática con contexto (≥ 40 caracteres de enunciado, opciones con `incorrectFeedback` que explican el error típico).

## Bloques (`blocks`)

| `kind` | Para qué | Campos |
|--------|----------|--------|
| `text` | Párrafo | `text` (Markdown ligero: `**resaltado**`, `$LaTeX$`) |
| `definition` | Definición grande con el término destacado | `text` |
| `rule` | Regla/fórmula que hay que retener | `title?`, `text?`, `formula?` (LaTeX display; varias líneas con `gathered`) |
| `example` | Ejemplo resuelto | `title?`, `lines: { math, note? }[]` (`math` sin `$`) |
| `warning` | Error típico, matiz | `title?` (por defecto «Ojo»), `text` |
| `compare` | Dos lecturas lado a lado | `left`/`right`: `{ title, text?, math?[], tone? }` |
| `steps` | Pasos numerados | `title?`, `items[]` |
| `formula` | Igualdad destacada, centrada y sin caja grande | `tex` |
| `relations` | Frases «A es múltiplo de B» con los números en ficha de color | `items: { left, relation, right, tone? }[]` |
| `facts` | Fichas cortas símbolo = valor | `items: { tex, label? }[]` |
| `story` | Enunciado con dibujo al lado | `text`, `src`, `alt`, `side?`, `maxWidth?` |
| `figure` | Ilustración con pie | `src`, `alt`, `caption?`, `maxWidth?` |
| `anim` | Animación controlada | `scene`, `params?`, `captions?`, `beatMs?` |

Las ilustraciones (`story`, `figure`) se pintan **tal cual**, sin tarjeta ni fondo: los PNG deben venir con fondo transparente y sin halos ni sombras semitransparentes. Si el PNG aún no existe, `story` se queda solo con el texto y `figure` se omite en producción (en desarrollo muestra un hueco con el nombre del archivo que falta).

## Animaciones (`anim`)

Una animación es una lista de **pasos** (beats). Cada paso es un estado del lienzo; el movimiento lo ponen las transiciones CSS (aparecer, desplazar, dibujar). El alumno puede **pausar, retroceder, avanzar y reiniciar** sin salir de la diapositiva; arranca sola salvo con «reducir movimiento». Cada paso trae un **texto breve** (`captions`) que dice qué mirar.

| `scene` | Concepto | Parámetros |
|---------|----------|------------|
| `egipcio-aditivo` | Sistema aditivo egipcio, número descompuesto por órdenes | `n` (< 10 000) |
| `romano-resta` | Romano: suma, resta (IV…CM), lectura por bloques | — |
| `decimal-canje` | 10 unidades = 1 decena, 10 decenas = 1 centena… (base 10) | — |
| `decimal-posicion` | Mismo dígito, distinto valor según el lugar | `n`, `a`, `b` (potencias de los dos dígitos que se comparan) |
| `redondeo-recta` | Redondear = extremo más cercano en la recta; conecta con la regla del 5 | `n`, `power` (3 = millares…) |
| `resta-diferencia` | Restar como diferencia (barras) | `a` (tengo), `b` (precio) |
| `area-distributiva` | `a·(b+c) = a·b + a·c` con áreas | `a`, `b`, `c` |
| `reparto-agrupar` | Repartir y agrupar son el mismo reparto (150 : 6 = 25 y 150 : 25 = 6) | `a` (total), `b` (cajas) |
| `expr-reescritura` | Reducir una expresión paso a paso (hasta dos columnas en paralelo) | `expr`, `expr2?`, `titles?` |
| `divisibilidad-grupos` | Divisible = grupos completos sin sobrantes; con resto no lo es | `a` (múltiplo de `b`), `b`, `extra` |
| `divisores-rectangulos` | Los divisores salen por parejas al ordenar `n` objetos en rectángulos | `n` |
| `multiplos-saltos` | Múltiplos como saltos en la recta; con `b`, múltiplos comunes y m.c.m. | `a`, `b?` |
| `criterio-suma-cifras` | Por qué vale sumar cifras para el 3 y el 9 (100 = 99 + 1) | `n` (3 cifras) |
| `criterio-alternada` | Criterio del 11: suma de posiciones impares − pares | `n` |
| `criba-eratostenes` | Criba hasta `n`: tachar múltiplos de 2, 3, 5 y 7 | `n` (≤ 120) |
| `descomposicion-primos` | Descomposición con la línea vertical, eligiendo el primo con los criterios | `n` |
| `tabla-exponentes` | Tabla primo × número: m.c.m. (mayor exponente) o m.c.d. (menor, solo comunes) | `nums`, `mode` |
| `mcd-cortes` | Cortar dos cintas en trozos iguales: el mayor que cabe justo es el m.c.d. | `a`, `b` |
| `ascensor-enteros` | Planta = posición fija; subir/bajar = variación (mismo signo, dos usos) | `a` (planta inicial), `b` (variación) |
| `recta-enteros` | Los naturales se reflejan respecto del 0: negativos, opuestos y ℕ ⊂ ℤ | — |
| `valor-absoluto` | Valor absoluto = distancia al 0; los opuestos comparten distancia | `a`, `b` |
| `comparar-enteros` | El mayor es el de más a la derecha; con negativos el orden «se invierte» | `a`, `b` |
| `suma-recta` | Sumar enteros como dos saltos en la recta (mismo sentido: se suman distancias; contrario: se restan) | `a`, `b` |
| `fichas-opuestos` | Fichas +1 / −1 que se anulan por parejas al sumar con distinto signo | `a`, `b` |
| `resta-opuesto` | Restar un entero = invertir el salto de sumarlo = sumar su opuesto | `a`, `b` |
| `parentesis-signos` | Signo delante de un paréntesis: con `+` los términos se quedan, con `−` cambian todos | `sign`, `nums` (términos con signo) |
| `producto-signos` | Los cuatro casos del signo del producto con ingresos y facturas (repetir o anular) | `a` (≤ 4), `b` |
| `division-inversa` | Cada producto da dos cocientes: la regla de los signos de la división | `a`, `b` |
| `decimal-zoom` | Décimas, centésimas, milésimas: cada tramo se amplía y se divide en diez (recta en cascada) | `dec` (hasta 3 decimales) |
| `tabla-decimal` | Tabla de órdenes (D U , d c m dm…) y lectura: parte entera + parte decimal con el nombre de la última cifra | `dec` |
| `comparar-decimales` | Comparar: parte entera, ceros para igualar cifras, primera cifra distinta | `terms` (dos decimales) |
| `redondeo-decimal` | Redondear a unidades, décimas y centésimas en la recta, y la regla del 5 | `dec` |
| `decimal-columna` | Suma o resta en columna: coma bajo coma, ceros, llevadas, resultado de derecha a izquierda | `terms`, `op` (`+`/`-`) |
| `decimal-producto` | Multiplicar sin comas, productos parciales y contar las cifras decimales (con redondeo a céntimos opcional) | `terms` (dos factores), `places?` |
| `coma-potencias10` | Multiplicar o dividir por 10, 100, 1000: la coma se desplaza (con ceros de relleno) | `dec`, `dir` (`mul`/`div`) |
| `division-decimal` | División con divisor natural: coma en el cociente, ceros bajados, resto repetido (periódico) | `terms` (dividendo, divisor), `places` (≤ 3) |
| `division-coma-divisor` | Divisor decimal: se multiplican dividendo y divisor por 10, 100… y el cociente no cambia | `terms` (dividendo, divisor) |
| `medir-unidad` | Medir = contar cuántas veces cabe la unidad (jarra y vasos); la misma jarra mide 5 o 8 vasos según el vaso | — |
| `meridiano-metro` | De dónde sale el metro: meridiano 40 000 km → cuadrante 10 000 km → diezmillonésima parte | — |
| `cubo-agua` | Cubo de 1 dm de arista: 1 dm³ = 1 litro = 1 kg de agua; 1 cm³ de agua = 1 g | — |
| `escalera-unidades` | Unidad base con múltiplos (kilo, hecto, deca) y submúltiplos (deci, centi, mili); ×10 por salto (×100 en superficie, con ha/a/ca) | `units` (`m`/`l`/`g`/`m2`) |
| `tabla-unidades` | Tabla de unidades: cambiar de unidad moviendo la coma (`from`+`to`), juntar una cantidad compleja (`parts`+`to`) o separar una incompleja (`dec`+`from`); en `m2` cada columna ocupa dos cifras | `units`, `dec`, `from`, `to`, `parts` |
| `escala-longitudes` | Eje en escala de potencias de 10: Å, nm, µm, mm, m, km, UA y año luz | — |
| `cuadrados-area` | Superficie como conteo de cuadrados: rectángulo (filas × columnas) y triángulo (mitad) | `a` (base), `b` (alto) |
| `m2-dm2` | 1 m² = 10 × 10 dm² = 100 dm², y 1 dm² = 100 cm²: de 100 en 100 | — |
| `tabla-razon` | Tabla de dos magnitudes: directa (se multiplican igual, cociente constante) o inversa (una se multiplica y la otra se divide, producto constante) | `rel`, `a`, `b` (primera columna), `nums` (valores de la primera fila), `titles` |
| `reduccion-unidad` | Reducción a la unidad: de `a ↔ b` se baja a 1 y se sube a `c`; directa (`:a`, `·c`) o inversa (`·a`, `:c`) | `rel`, `a`, `b`, `c`, `titles` |
| `cuadricula-porcentaje` | Porcentaje como «a de cada 100» en una cuadrícula de 100; con total `b` ≠ 100, paquetes de 100 | `a` (%), `b` (total) |
| `aumento-barra` | Aumento (`sign: "+"`) o rebaja (`"-"`) porcentual con barras; termina en el factor 1 ± a/100 | `a` (precio), `b` (%), `sign` |
| `fraccion-partes` | Pizza partida en `b` porciones iguales (denominador), se toman `a` (numerador); al final, lo que queda y que suma 1 | `a`, `b` |
| `fraccion-recta` | La unidad en la recta partida en `b` trozos: `a`/b < 1, b/b = 1 y `c`/b > 1 | `a`, `b`, `c` |
| `fraccion-operador` | Fracción de una cantidad: el total `a` se divide en `b` partes y se toman `c` (÷ den, × num) | `a`, `b`, `c` |
| `fraccion-equivalente` | Barra `a`/`b` que se vuelve a partir (×`c`, después ×2): mismo trozo coloreado, fracciones equivalentes | `a`, `b`, `c` |
| `fraccion-barras-suma` | Suma/resta con barras: con mismo denominador se cuenta; con distinto se corta hasta el m.c.m. y se cuenta (en la resta, lo que se quita va en rojo); el último paso deja solo el resultado en grande | `a`, `b`, `c`, `d` (`a/b` y `c/d`), `op` |
| `fraccion-de-fraccion` | Producto como área: `a/b` del ancho por `c/d` del alto; el solape son `a·c` de `b·d` cuadraditos | `a`, `b`, `c`, `d` |
| `simplificar-factores` | Factores primos que se quedan en su fracción, viajan a una sola fracción y se tachan por parejas (cada pareja, de un color); con `inv` parte de una división (se da la vuelta a la segunda) | `a`, `b`, `c`, `d`, `inv?` |
| `fraccion-cabe` | Dividir = cuántas veces cabe: con trozos del m.c.m. basta contar | `a`, `b`, `c`, `d` |
| `fraccion-combinada` | `a/b · (c/d ∓ e/f)`: primero el paréntesis (común denominador y resta o suma), después el producto con simplificación en cruz | `a`, `b`, `c`, `d`, `e`, `f`, `op` |
| `fraccion-gasto-resto` | Problema «gasta `a/b` y después `c/d` de lo que le quedaba»: barra del dinero; la segunda fracción actúa sobre el resto, se suma lo gastado y se resta de la unidad | `a`, `b`, `c`, `d` |
| `balanza-ecuacion` | Balanza en equilibrio: `a·x + b = c` (`sign: "+"`) o `x − b = c` (`sign: "-"`); se hace lo mismo en los dos platos hasta dejar la caja x sola (la solución debe ser entera) | `a`, `b`, `c`, `sign` |
| `maquina-funcion` | Máquina que asocia a cada `n` el valor `a·n + b`: dos casos concretos y la regla general | `a`, `b`, `nums` (dos entradas) |
| `semejantes-agrupar` | `a·x + b·x + c·y`: las x se agrupan, las y no se mezclan («queda indicada») | `a`, `b`, `c` |

`captions` en el bloque `anim` sustituye los textos de paso de la escena (uno por paso): así una misma escena sirve para contextos distintos (p. ej. el fontanero de `area-distributiva`).

### Añadir una animación nueva

1. Crear `src/components/lesson/anim/scenes/<nombre>.tsx` con una función `buildX(params): AnimBuild` (`{ label, captions, render(beat) }`).
2. Para aritmética (m.c.d., m.c.m., factorización, exponentes voladitos) usar `anim/number-theory.ts`. Usar las piezas de `anim/primitives.tsx` (`Canvas` 800×420, `Fade`, `Move`, `WriteLine`, `HBrace`, `Txt`) y los colores de `anim/palette.ts` (paleta Manim). Equivalencias: `Fade` ≈ FadeIn/FadeOut, `Move` ≈ shift, `WriteLine` ≈ Create/Write, `HBrace` ≈ Brace + texto.
3. Añadir el id a `SlideAnimId` y a los parámetros en `src/lib/lesson/types.ts`, y registrarla en `anim/registry.tsx`.
4. Reglas: transiciones CSS (clase `anim-t`), sin timers propios; `captions` con LaTeX donde ayude; todo debe verse correcto en cada paso (el test `slide-anim.test.tsx` dibuja todos los pasos de todas las animaciones usadas en lecciones); respetar `prefers-reduced-motion` (ya lo hace el reproductor y `.anim-t`).
5. Verificar visualmente cada paso en viewport ≥ 1280 px (la animación no debe solapar rótulos).

## Herramienta interactiva en la diapositiva

Al preparar una lección nueva, plantéate si un concepto se entiende mejor **tocándolo**: una herramienta que muestra lo que se enseña y deja al alumno **cambiar los valores** para ver cómo responde el resultado. Es opcional; no se añade por sistema.

- **Cuándo sí:** el concepto depende de parámetros y ver el efecto de moverlos aclara la idea (p. ej. un área al variar base y altura, una fracción al cambiar numerador y denominador, un salto en la recta al cambiar el signo, una escala, una proporción).
- **Cuándo no:** definiciones, convenios y reglas sin variación que explorar; un proceso paso a paso, que ya cubre una `anim`.
- **Diseño:** un único conjunto pequeño de controles (1–3), valores acotados para que nunca salga algo absurdo, el resultado visible junto a los controles (cifra, dibujo o ambos), valor inicial con sentido y botón de reiniciar. Sin bloquear: siempre se puede **Continuar**.
- **Texto:** una línea que diga qué probar («Mueve la base y observa qué pasa con el área»), sin tono infantil.
- **Estilo:** tema `board` y paleta de `anim/palette.ts`; solo escritorio (≥ 768 px).
- **Relación con el resto:** la `anim` muestra un proceso fijo; la herramienta interactiva deja explorar. Si lo que se pide es una decisión evaluable, va en `predict` / `explore` / `interactive_tool`, no aquí.
- **Estado técnico:** `SlideStep.visual` admite `anim`, `figure` y `tool` (`{ kind: "tool", tool, params?, hint? }`). Las herramientas viven en `src/components/lesson/slide/SlideTool.tsx` y se registran en `SlideToolId` (`src/lib/lesson/types.ts`); su test (`slide-tool.test.tsx`) monta cada una con valores extremos. Añadir una nueva = id en `SlideToolId` + caso en `SlideTool` + test.

| `tool` | Concepto | Parámetros |
|--------|----------|------------|
| `fraccion-explorador` | Numerador (0–2·d) y denominador (1–12) libres: barra, punto en la recta y decimal (`=`/`≈`); dice si es menor, igual o mayor que 1 | `n`, `d` iniciales |
| `fraccion-equivalentes` | Fracción de partida `n`/`d` y multiplicador `k` (1–6): dos barras con el mismo trozo coloreado | `n`, `d`, `k` |
| `fraction-product` | Producto de dos fracciones propias en un cuadrado unidad: columnas (1.ª), filas (2.ª) y zona solapada = resultado; denominadores de 1 a 8 | `initial: [a, b, c, d]` |
| `valor-numerico` | Máquina `a·n + b`: deslizador de `n` (0–10), cuenta y gráfico de barras con todos los valores | `a`, `b`, `n` |
| `balanza-explorador` | Balanza `a·x + b = c`: sumar/restar 1 o dividir entre `a` en los dos platos; la solución no cambia (ecuaciones equivalentes) | `a`, `b`, `c` |

## Respuesta como fracción

En un `fill_in_blank` cuya respuesta sea una fracción, usa `answerFormat: "fraction"`: el alumno ve dos casillas (numerador sobre la raya, denominador debajo) y `correctAnswers` se sigue escribiendo como `"n/d"` (por ejemplo `["3/4"]`). No pidas «el numerador» ni expliques el formato en el enunciado.

## Qué se conserva de las escenas anteriores

Las lecciones con módulos de escenario (`tienda-ciclista`, `bloques-numericos`, `mul-div-naturales`, `jerarquia-operaciones`…) siguen siendo válidas para **manipulación** (explorar, arrastrar, comprobar). Regla práctica: la teoría nueva va en `slide`; lo que el alumno **toca** va en `explore` / `predict` / `interactive_tool`.

## Ayuda del tutor en los ejercicios (`help`)

Los pasos de práctica (`predict`, `fill_in_blank`…) aceptan `help: HelpBranch[]`: un árbol de preguntas del alumno («¿Qué operación hago?», «Quiero saber si mi resultado es razonable»…) con respuestas que **no repiten la diapositiva**: otro ángulo, una estimación, un caso más sencillo, una pregunta guiada. Cada rama puede abrir `branches` más concretas. Sin `help`, el tutor solo separa «lo que te dan» de «lo que te piden». Nunca des el resultado en una rama; la solución sale tras responder (`explanation`).
