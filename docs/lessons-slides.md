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
| `regla-tres-cruz` | Regla de tres directa: filas como fracciones iguales (magnitud arriba/abajo igual en las dos), producto en cruz y despeje de la x | `a`, `b` (pareja conocida), `c` (valor por el que se pregunta), `titles`, `unit?` |
| `regla-tres-producto` | Regla de tres inversa: el producto de cada fila es el mismo, `a·b = c·x`, y se despeja la x | `a`, `b` (pareja conocida), `c`, `titles`, `unit?` |
| `porcentaje-mental` | Cálculo mental: barra del total partida en 10 (10 % = ÷10), mitad del 10 % = 5 % y combinar (15 %) | `a` (total, múltiplo de 20) |
| `factor-cambio` | Aumento (100 % + a % → ×1,a) y rebaja (100 % − a % → ×0,b) con dos barras | `a`, `b` (precio y % del aumento), `c`, `d` (precio y % de la rebaja) |
| `cuadricula-porcentaje` | Porcentaje como «a de cada 100» en una cuadrícula de 100; con total `b` ≠ 100, paquetes de 100 | `a` (%), `b` (total) |
| `aumento-barra` | Aumento (`sign: "+"`) o rebaja (`"-"`) porcentual con barras; termina en el factor 1 ± a/100 | `a` (precio), `b` (%), `sign` |
| `fraccion-partes` | Pizza partida en `b` porciones iguales (denominador), se toman `a` (numerador); al final, lo que queda y que suma 1 | `a`, `b` |
| `fraccion-recta` | La unidad en la recta partida en `b` trozos: `a`/b < 1, b/b = 1 y `c`/b > 1 | `a`, `b`, `c` |
| `fraccion-operador` | Fracción de una cantidad: el total `a` se divide en `b` partes y se toman `c` (÷ den, × num) | `a`, `b`, `c` |
| `fraccion-equivalente` | Barra `a`/`b` que se vuelve a partir (×`c`, después ×2): mismo trozo coloreado, fracciones equivalentes | `a`, `b`, `c` |
| `fraccion-barras-suma` | Suma/resta con barras: con mismo denominador se cuenta; con distinto se corta hasta el m.c.m. y se cuenta (en la resta, lo que se quita va en rojo); el último paso deja solo el resultado en grande | `a`, `b`, `c`, `d` (`a/b` y `c/d`), `op` |
| `fraccion-de-fraccion` | Producto como área: `a/b` del ancho por `c/d` del alto; el solape son `a·c` de `b·d` cuadraditos | `a`, `b`, `c`, `d` |
| `simplificar-factores` | Se marca cada número (4, 3, 8, 4) y a la vez se muestra su descomposición en primos; luego se sustituye en la fracción (la original queda arriba con un «=»). Factores primos que se quedan en su fracción, viajan a una sola fracción y se tachan por parejas (cada pareja, de un color); con `inv` parte de una división (se da la vuelta a la segunda) | `a`, `b`, `c`, `d`, `inv?` |
| `fraccion-cabe` | Dividir = cuántas veces cabe: con trozos del m.c.m. basta contar | `a`, `b`, `c`, `d` |
| `fraccion-combinada` | `a/b · (c/d ∓ e/f)`: primero el paréntesis (común denominador y resta o suma), después el producto con simplificación en cruz | `a`, `b`, `c`, `d`, `e`, `f`, `op` |
| `fraccion-gasto-resto` | Problema «gasta `a/b` y después `c/d` de lo que le quedaba»: barra del dinero; la segunda fracción actúa sobre el resto, se suma lo gastado y se resta de la unidad | `a`, `b`, `c`, `d` |
| `balanza-ecuacion` | Balanza en equilibrio: `a·x + b = c` (`sign: "+"`) o `x − b = c` (`sign: "-"`); se hace lo mismo en los dos platos hasta dejar la caja x sola (la solución debe ser entera) | `a`, `b`, `c`, `sign` |
| `maquina-funcion` | Máquina que asocia a cada `n` el valor `a·n + b`: dos casos concretos y la regla general | `a`, `b`, `nums` (dos entradas) |
| `semejantes-agrupar` | `a·x + b·x + c·y`: las x se agrupan, las y no se mezclan («queda indicada») | `a`, `b`, `c` |
| `letras-valores` | Monedas en clave: cada letra vale un número, se sustituye y se suma (`a + a + b + c + c = 47`) | — |
| `enunciado-expresion` | Traducir «el doble de la edad del año pasado» por trozos: `x`, `x − 1`, `2(x − 1)` frente al error `2x − 1` | — |
| `campo-perimetro-area` | Campo de largo `x` y ancho `y`: perímetro `2x + 2y` (suma de lados) y área `x·y` (cuadrícula) | — |
| `monomio-partes` | `−3x²y` separado en coeficiente y parte literal, y leído como producto `−3·x·x·y` | — |
| `monomio-producto` | `(a·xᶜ)·(b·xᵈ)`: se desarrollan las potencias, se reordenan y se cuentan las letras (exponentes que se suman) | `a`, `b`, `c`, `d` (exponentes ≤ 4) |
| `monomio-cociente` | `(a·xᶜ):(b·xᵈ)` como fracción: se tachan letras por parejas y se dividen los coeficientes | `a` (múltiplo de `b`), `b`, `c`, `d` (`c ≥ d`) |
| `ecuacion-identidad` | Se prueban `x = 1…5`: `3x − 4 = 8` solo se cumple con `x = 4`; `6x − 4x = 2x` con todos | — |
| `comprobar-solucion` | Comprobar `x = 3` en `7x − 2x + 4 = 8 + 3x + 2` (19 = 19) y ver cómo se delata un valor erróneo (`x = 2`) | — |
| `pasos-problema` | Los cuatro pasos (nombrar, relacionar, resolver, interpretar) con barras: Pablo `x`, Lucía `x + 6`, suman 30 | — |
| `recta-semirrecta` | Recta (sin principio ni fin), semirrecta (un punto la parte en dos) y segmento (dos puntos la acotan) | — |
| `posiciones-rectas` | Paralelas (misma distancia), secantes (un punto) y perpendiculares (90°): la recta `s` gira en torno a un punto | — |
| `mediatriz-equidistan` | Mediatriz = perpendicular por el punto medio; sus puntos equidistan de los extremos (`PA = PB`, `QA = QB`) | — |
| `mediatriz-compas` | Construcción con **compás y regla**: arcos desde A y desde B con la misma abertura, la regla une los cortes | — |
| `bisectriz-equidistan` | Bisectriz de un ángulo de 60°: dos mitades de 30° y distancias iguales a los lados | — |
| `bisectriz-compas` | Construcción con compás y regla: arco en el vértice, dos arcos iguales desde R y S, regla por el corte T | — |
| `angulo-elementos` | Ángulo = región entre dos semirrectas con el mismo origen: vértice, lados y amplitud | — |
| `angulos-opuestos` | Dos rectas que se cortan: los opuestos por el vértice son iguales y los consecutivos suman 180° | — |
| `paralelas-secante` | Secante y dos paralelas: los ocho ángulos, opuestos, correspondientes (se trasladan) y alternos | — |
| `grado-minuto` | Un recto = 90 grados; 1° = 60′ y 1′ = 60″ (zoom de barras); 37° 40′ = 37° + 40/60 | — |
| `angulos-columna` | Suma (llevada de 60′ a 1°) o resta (préstamo de 1° = 60′) de ángulos en grados y minutos, en columna | `op` (`+`/`-`), `a`, `b` (grados y minutos del 1.º), `c`, `d` (del 2.º) |
| `triangulo-180` | Los ángulos de un triángulo suman 180°: la paralela por un vértice copia a y b junto a c | — |
| `poligono-triangulos` | Cuadrilátero, pentágono y hexágono partidos en triángulos: suma `(n − 2)·180°` y ángulo del regular | — |
| `triangulos-clasificacion` | Triángulos según ángulos (acutángulo, rectángulo, obtusángulo) y lados (equilátero, isósceles, escaleno) | — |
| `triangulo-mediana` | Las tres medianas, el baricentro y su reparto 2 : 1 | — |
| `triangulo-altura` | Las tres alturas y el ortocentro, dentro (acutángulo) y fuera (obtusángulo, con prolongación) | — |
| `cuadrilateros-familia` | Cuadrilátero → romboide, rombo, rectángulo, cuadrado, trapecio y trapezoide | — |
| `trapecio-tipos` | Trapecio: bases y altura, rectángulo e isósceles | — |
| `poligono-regular-circunscrito` | Polígono regular y circunferencia circunscrita con centro y radio | — |
| `poligono-apotema` | Apotema en un hexágono: punto medio, triángulo rectángulo y `r² = a² + (l/2)²` | — |
| `circunferencia-elementos` | Circunferencia frente a círculo; radio, diámetro, cuerda y arco | — |
| `circunferencia-recta` | Recta exterior, tangente y secante según `d` y `r` | — |
| `circunferencias-posiciones` | Dos circunferencias: exteriores, tangentes, secantes, interiores y concéntricas | — |
| `revolucion-giro` | Rectángulo que gira → cilindro; triángulo rectángulo que gira → cono | — |
| `poliedro-elementos` | Cubo: caras, aristas, vértices y desarrollo | — |
| `poliedros-regulares` | Tabla de los cinco sólidos platónicos (caras, vértices, aristas) y comprobación de Euler | — |
| `prisma-elementos` | Prisma pentagonal: bases, caras laterales y recuento `n + 2`, `2n`, `3n` | — |
| `piramide-elementos` | Pirámide pentagonal: base, caras laterales, cúspide y recuento `n + 1`, `n + 1`, `2n` | — |
| `area-perimetro` | Rectángulo 5×1 y cuadrado 3×3: mismo perímetro (12), distinta área (5 y 9) | — |
| `area-rectangulo` | Rectángulo `a × b` contando cuadrados: `A = a·b`, `P = 2a + 2b`; cuadrado y raíz | `a` (≤ 8), `b` (≤ 6) |
| `area-paralelogramo` | Paralelogramo → rectángulo moviendo un triángulo: `A = b·a`; el perímetro no basta | — |
| `area-rombo` | Rombo dentro del rectángulo `d × d'`: `A = d·d'/2` | — |
| `area-trapecio` | Dos trapecios forman un paralelogramo de base `b + b'`: `A = (b + b')·a/2` | — |
| `area-triangulo` | Dos triángulos forman un paralelogramo: `A = b·a/2`; el área no cambia al mover el vértice | — |
| `area-triangulo-rectangulo` | Catetos como base y altura; altura sobre la hipotenusa igualando áreas | — |
| `area-poligono-triangulos` | Polígono irregular descompuesto en triángulos desde un vértice | — |
| `area-poligono-regular` | Polígono regular en `n` triángulos iguales: `A = P·a/2` | — |
| `longitud-pi` | Circunferencia desenrollada: tres diámetros y 0,14 más; `l = πd = 2πr` | — |
| `area-circulo` | Círculo en triángulos finos de altura `r` y bases `2πr`: `A = πr²` | — |
| `corona-circular` | Corona circular: `πR² − πr²` y perímetro de las dos circunferencias | — |
| `plano-cartesiano` | Ejes, origen, abscisa y ordenada: `P(3, 5)` frente a `Q(5, 3)` | — |
| `cuadrantes-signos` | Los cuatro cuadrantes, signos de las coordenadas y puntos sobre los ejes | — |
| `diagrama-puntos` | Edad y estatura de cuatro hermanos: leer ordenadas y abscisas | — |
| `grafica-tramos` | Distancia–tiempo por tramos: sube, horizontal (parado), más inclinada y baja | — |
| `grafica-llamadas` | Coste de una llamada: cuota fija de 0,40 € y 0,20 € por minuto | — |
| `tabla-frecuencias` | Frecuencias absolutas y relativas del número de hermanos de 36 alumnos | — |
| `media-mediana-moda` | Media, mediana y moda de 1, 3, 2, 0, 1, 3, 4, 2, 2 | — |
| `mediana-par` | Media, mediana (dos centrales) y moda de ocho datos | — |
| `grafico-barras-histograma` | Barras separadas frente a histograma de intervalos y polígono de frecuencias | — |
| `diagrama-sectores` | 40 personas: 9° por persona y ángulos que suman 360° | — |
| `exp-determinista-aleatorio` | Agua a 100 °C (siempre hierve) frente a lanzar un dado (cambia) | — |
| `espacio-muestral` | Espacio muestral de moneda, dado, dado de ocho caras y suma de dos dados | — |
| `sucesos-conjuntos` | Sucesos de un dado: par, un 5, suceso seguro e imposible | — |
| `frecuencias-dado` | 50 lanzamientos: frecuencias absolutas y relativas, suma 1 | — |
| `grandes-numeros` | La frecuencia relativa de cara se estabiliza cerca de 0,5 | — |
| `laplace-dado` | Regla de Laplace con un dado: par, un 2 y mayor que 4 | — |
| `suceso-union-interseccion` | «Par o múltiplo de 3» (unión) y «par y múltiplo de 3» (intersección) | — |
| `pitagoras-cuadrados` | Cuadrados sobre los lados de un triángulo rectángulo: `a² + b² = c²` con las áreas | `a`, `b` (catetos, por defecto 3 y 4) |
| `semejanza-figuras` | Dos triángulos rectángulos semejantes: lados correspondientes proporcionales y razón de semejanza | `a`, `b` (catetos del pequeño), `c` (razón `k`) |
| `tales-sombras` | Altura de un objeto con su sombra y la de una estaca: triángulos semejantes y proporción | `a` (altura de la estaca), `b` (su sombra), `c` (sombra del objeto) |
| `desarrollo-ortoedro` | Desarrollo de un ortoedro: seis rectángulos iguales de dos en dos y `A = 2(ab + ac + bc)` | `a`, `b`, `c` (aristas) |
| `desarrollo-cilindro` | Desarrollo de un cilindro: rectángulo `2πr × h` y dos círculos (con π ≈ 3,14) | `a` (radio), `b` (altura) |
| `desarrollo-cono` | Desarrollo de un cono: sector de radio `g` con arco `2πr` y círculo de la base (π ≈ 3,14) | `a` (radio `r`), `b` (generatriz `g`) |
| `esfera-cilindro` | La superficie de la esfera coincide con la lateral del cilindro que la envuelve: `4πR²` | — |
| `cubo-dm3` | Cubo de 1 dm de arista: 10 × 10 cubitos por nivel y 10 niveles, 1 dm³ = 1 000 cm³ | — |
| `arquimedes-volumenes` | Cono, esfera y cilindro de igual radio y altura 2r: volúmenes en proporción 1 : 2 : 3 | — |
| `funcion-temperatura` | Gráfica de la temperatura de un día: lectura de un punto, variable independiente y dependiente | — |
| `funcion-tramos-extremos` | La misma gráfica leída de izquierda a derecha: tramos crecientes, decrecientes, constantes, máximo y mínimo | — |
| `funcion-es-no-es` | Criterio de la recta vertical: una gráfica es función si cada vertical la corta una sola vez | — |
| `recta-pendiente` | La recta `y = mx + n`: ordenada en el origen y pendiente con dos escalones | `a` (pendiente `m`), `b` (ordenada `n`) |
| `dispersion-puntos` | Diagrama de puntos de 12 edades: recorrido, media y desviación media (distancias a la media) | — |
| `caja-bigotes` | Mediana, cuartiles `Q1` y `Q3` de 14 datos y diagrama de caja y bigotes | — |
| `error-aproximacion` | Error absoluto (distancia entre el valor real y el aproximado) y error relativo (cociente con el valor real) | `a` (valor real), `b` (aproximado) |
| `notacion-cientifica` | Notación científica: la coma salta hasta detrás de la primera cifra significativa y el salto da el exponente | `dec` (número con coma, p. ej. «35600000» o «0,0000092») |
| `progresion-pasos` | Progresión aritmética (+d) o geométrica (·r): de a₁ a aₙ se dan n − 1 pasos iguales y sale el término general | `a` (a₁), `b` (d o r), `c` (términos mostrados, ≤ 5), `d` (n del ejemplo), `prog` (`aritmetica`/`geometrica`) |
| `suma-gauss` | Suma 1 + 2 + … + n: se escribe al derecho y al revés, cada columna suma n + 1 y S = n(n + 1)/2 | `a` (n, de 4 a 12) |
| `cuadrado-suma` | Cuadrado de una suma: cuadrado de lado a + b partido en a², b² y dos rectángulos ab | `a`, `b` (lados, por defecto 5 y 3) |
| `suma-por-diferencia` | Suma por diferencia: a² − b² se corta y se recoloca en un rectángulo (a + b)·(a − b) | `a`, `b` (por defecto 7 y 3, con b < a) |
| `parabola-raices` | Parábola y = ax² + bx + c: las soluciones son los cortes con el eje X y el signo del discriminante decide cuántos hay | `a`, `b`, `c` (por defecto 1, −2, −3) |
| `sistema-rectas` | Sistema lineal como dos rectas: se cortan (una solución), son paralelas (incompatible) o coinciden (indeterminado) | `sys` (`unica`/`incompatible`/`indeterminado`) |
| `funcion-continuidad` | Tres funciones: puntos aislados (aparatos vendidos), saltos bruscos (llamada) y trazo continuo (estatura) | — |
| `funcion-tendencia-periodo` | Tendencia (el agua se enfría hacia 20 °C) y función periódica con su periodo | — |
| `pendiente-dos-puntos` | Pendiente de la recta por dos puntos: variación de y entre variación de x | `a`, `b` (x₁, y₁), `c`, `d` (x₂, y₂) |
| `rectas-encuentro` | Peatón (4 km/h) y ciclista (10 km/h, media hora después): el encuentro es el punto de corte de dos rectas | — |
| `conica-lugar` | Elipse (suma de distancias a dos focos), parábola (foco y directriz) e hipérbola (diferencia de distancias) como lugares geométricos | `conica` (`elipse`/`parabola`/`hiperbola`) |
| `sector-circular` | Sector circular: fracción a/360 del área del círculo | `a` (ángulo en grados), `b` (radio) |
| `husos-horarios` | Husos horarios: 15° de longitud equivalen a una hora (Bilbao 12 h → Estambul 14 h, Monterrey 5 h) | — |
| `potencias-factores` | Producto y cociente de potencias de la misma base contando factores (se suman / se restan los exponentes) | `a` (m), `b` (n < m) |
| `potencias-exp-negativo` | Al bajar el exponente se divide entre la base: llega a `b⁰ = 1` y a `b⁻ⁿ = 1/bⁿ` | `a` (base) |
| `potencia-signo` | Signo de las potencias de base negativa: exponente par → positivo, impar → negativo; `(−2)⁴` frente a `−2⁴` | `a` (base negativa, −2 a −4) |
| `potencia-de-potencia` | `(aᵐ)ⁿ`: n grupos de m factores = m·n factores | `a` (m), `b` (n) |
| `potencia-de-producto` | `(a·b)ⁿ = aⁿ·bⁿ`: se reordenan los factores en dos filas | `a` (n, 2–4) |
| `potencia-fraccion-inversa` | `(a/b)⁻ⁿ`: inverso de la potencia positiva y `(b/a)ⁿ` | `a`, `b`, `c` (n) |
| `fraccion-mixta` | Fracción impropia → número mixto con barras: unidades completas, resto y `D = d·c + r` | `a` (numerador), `b` (denominador) |
| `decimal-periodico-restos` | Fracción → decimal: cadena de restos, se repite uno (periódico) o llega a 0 (exacto), con el periodo marcado | `a` (numerador), `b` (denominador) |
| `generatriz-periodico` | Fracción generatriz de un periódico puro o mixto: multiplicar por potencias de 10, restar y cancelar la cola | `dec` (parte entera y no periódica, «1,2»), `per` (periodo, «34») |
| `error-relativo-comparar` | Mismo error absoluto, distinto error relativo: dos barras con la franja del error | `a`, `b` (medidas), `c` (cota), `titles`, `unit` (`"km\|m"`) |
| `notacion-operacion` | Operar con notación científica: producto, cociente, potencia y suma (igualar exponentes) | `nop` (`mul`/`div`/`pow`/`sum`), `terms` (mantisas), `a`, `b` (exponentes), `c` (potencia) |
| `aproximacion-raiz` | `√n` atrapada entre decimales cada vez más próximos (cuadrados de las cotas): irracional si no es exacta | `a` (radicando 2–30) |
| `numero-oro-construccion` | Construcción de Φ = (1+√5)/2 con un cuadrado unidad y compás | — |
| `pi-circunferencia` | π: la circunferencia desenrollada mide 3 diámetros y un poco más | — |
| `conjuntos-numericos` | ℕ ⊂ ℤ ⊂ ℚ, los irracionales y ℝ como unión | — |
| `raiz-en-recta` | √a como hipotenusa de un triángulo rectángulo llevada a la recta con el compás | `a` (2, 5, 8, 10, 13) |
| `radical-potencia` | ⁿ√(aᵐ) = a^(m/n) y simplificación de la fracción | `a` (índice), `b` (exponente) |
| `radical-extraer` | Extraer factores: descomposición, grupos de «índice» factores iguales y resultado `k·ⁿ√m` | `a` (radicando), `b` (índice 2–4) |
| `radicales-semejantes` | Sumar radicales: idénticos se unen, distintos no, y semejanzas ocultas al extraer factores | — |
| `racionalizar` | `a/√b = a√b/b`: multiplicar por 1 arriba y abajo, con comprobación decimal | `a`, `b` |
| `proporcion-compuesta` | Proporcionalidad compuesta con dos magnitudes: etiquetas directa/inversa y fórmula con una razón por magnitud | `nums` (`[k1, k2, resultado, n1, n2]`), `rels` (`["d","i"]`), `titles` |
| `reparto-partes` | Reparto proporcional: barra del total en partes iguales y lo que se lleva cada uno | `nums` (valores), `a` (total), `titles`, `unit` |
| `mezcla-tabla` | Mezcla: tabla cantidad–precio–coste, totales y precio de la mezcla en la recta | `nums` (`[q1, p1, q2, p2]`), `titles`, `unit` (`"kg\|€"`) |
| `movil-encuentro` | Dos móviles en sentidos opuestos (velocidades se suman) o en el mismo sentido (se restan) | `mov` (`opuesto`/`alcance`), `nums` (`[v1, v2, d, retraso min]`) |
| `interes-proporcional` | Interés simple como proporcionalidad compuesta: capital, tiempo e interés | `a` (capital), `b` (rédito %), `c` (años) |
| `polinomios-columna` | Suma o resta de polinomios en columnas por grado (en la resta, se cambia el signo del sustraendo) | `nums` (`[a3,a2,a1,a0,b3,b2,b1,b0]`), `op` (`+`/`-`) |
| `producto-area` | `(ax + b)(cx + d)` como áreas de un rectángulo partido en cuatro | `a`, `b`, `c`, `d` |
| `denominadores-mcm` | Quitar denominadores multiplicando por el m.c.m.: cada término se simplifica | `nums` (ternas `[coef, denominador, lleva x]`) |
| `problema-barras` | Modelo de barras de «un número más su k-ésima parte es N»: k+1 partes iguales y x = k·(N/(k+1)) | `nums` (`[k, N]`) |
| `inecuacion-signo` | Inecuación `a·x rel c`: valores de prueba, semirrecta solución y por qué se invierte el signo al dividir entre un negativo | `nums` (`[a, c]`), `ine` (`<`, `<=`, `>`, `>=`) |
| `reduccion-suma` | Método de reducción: multiplicar, sumar para eliminar una incógnita, despejar y volver a sustituir (elige solo la incógnita más barata de eliminar) | `nums` (`[a1,b1,c1,a2,b2,c2]`) |
| `racionales-zoom` | Entre dos racionales siempre hay otro: 1/2, 1/4, 3/8, 7/16… ampliando | — |
| `raiz-cuadrado` | Cuadrado de lado `a`: área `a²` y raíz como operación inversa (y el caso del cubo) | `a` (lado) |
| `raiz-entre-cuadrados` | Raíz entera en la recta: el radicando queda entre dos cuadrados perfectos consecutivos; resto | `a` (radicando) |
| `sustitucion-sistema` | Método de sustitución en `3x + 2y = 18` y `x − 3y = −5`: despejar, sustituir, resolver, calcular y comprobar | — |
| `sistema-test` | Problema del test de 50 preguntas: barra aciertos/fallos, dos ecuaciones e interpretación | — |
| `progresion-comparar` | Barras de una progresión aritmética (+d) frente a una geométrica (·r) desde `a₁` | `a` (a₁), `b` (d), `c` (r) |
| `recta-tabla-puntos` | Representar `y = mx + n`: tabla con `x = 0, 1, 2`, puntos y recta | `a` (m), `b` (n) |
| `recta-constante` | `y = k` (recta horizontal, función) frente a `x = k` (vertical, no es función) | `a` (k) |
| `dominio-recorrido` | Gráfica proyectada sobre el eje X (dominio) y sobre el eje Y (recorrido) | — |
| `tabla-formula` | De la tabla a la fórmula: variación constante = pendiente, valor en `x = 0` = ordenada | `a` (m), `b` (n), `c` (primer x), `d` (paso de x) |
| `tarifas-escalones` | Tarifa por hora o fracción: gráfica en escalones con punto lleno/vacío; no se unen los puntos | `a` (precio por hora) |
| `red-solucion-solida` | Disolución sólida por sustitución e inserción y deformación de la red (Tecnología Industrial II) | — |
| `curva-enfriamiento` | Curvas de enfriamiento: metal puro (T constante), subfusión, aleación y eutéctica | — |
| `solidificacion-etapas` | Nucleación, dendritas y granos; afinadores de grano | — |
| `regla-palanca` | Regla de la palanca en un diagrama binario (isoterma, segmentos y fracciones) | — |
| `eutectico-enfriamiento` | Enfriamiento de una hipoeutéctica A-B hasta el eutéctico y su microestructura | — |
| `fec-enfriamiento` | Enfriamiento de un acero Fe-C hasta perlita + ferrita o cementita | `a` (% de C, 0,1–1,7) |
| `grafito-fundiciones` | Fundición gris, esferoidal, blanca y maleable según la forma del carbono | — |
| `vidrio-red` | Sílice cristalina, vidrio y vidrio modificado con Na₂O | — |
| `prensado-sinterizado` | Prensado en seco de un polvo cerámico y sinterización | — |
| `barbotina` | Moldeo en barbotina por escurrido | — |
| `polimerizacion-adicion` | Polimerización por adición del etileno | — |
| `polimerizacion-condensacion` | Polimerización por condensación del PET con subproducto | — |
| `polimeros-calor` | Termoplástico, termoestable y elastómero frente al calor y al esfuerzo | — |
| `extrusion-tornillo` | Extrusión de un termoplástico con husillo | — |
| `deposito-seguridad` | Capas de un depósito de seguridad para RTP | — |
| `austenita-martensita` | Red FCC → BCC (lento) o BCT (martensita, rápido) con el carbono atrapado | — |
| `jominy-ensayo` | Ensayo Jominy y curvas de templabilidad | — |
| `ttt-lectura` | Lectura de las curvas TTT y enfriamientos v₁, v₂, v₃ | — |
| `ciclos-tratamiento` | Ciclos T–t de normalizado, temple, martempering, austempering y revenido | — |
| `cementacion-difusion` | Difusión de carbono en la superficie y perfil de dureza | — |
| `pila-corrosion` | Pila Fe-Cu: ánodo, cátodo, electrones y ΔU = 0,78 V | — |
| `aireacion-diferencial` | Corrosión por aireación diferencial en una rendija | — |
| `proteccion-catodica` | Ánodo de sacrificio y corriente impuesta | — |
| `desgaste-asperezas` | Desgaste: encaje de crestas y partículas abrasivas | — |
| `cavitacion` | Colapso de burbujas y picadura de la pared | — |
| `plano-inclinado` | Mismo trabajo (mgh) con rampas de distinta inclinación | — |
| `trabajo-area-curva` | Trabajo de fuerza variable como área bajo F(x) con 4, 8 y 16 tramos | — |
| `resorte-trabajo` | Resorte: ley de Hooke y W = ½ k x² como área de un triángulo | — |
| `rodadura-carrera` | Carrera por un plano de bloque, esfera, cilindro y aro | — |
| `primer-principio-flujos` | Motor térmico (Q = ΔU + W) y máquina frigorífica (W = ΔU + Q) | — |
| `par-trabajo` | Par de fuerzas, momento M = d·F y trabajo W = M·θ | — |
| `piston-trabajo` | Expansión isobárica en un cilindro: W = p·ΔV | — |
| `presa-turbina` | Cadena de energía en una central hidroeléctrica | — |
| `cuadrado-diferencia` | `(a − b)²`: a² menos dos franjas `ab`; el cuadradito `b²` se quita dos veces y se devuelve una | `a`, `b` (b < a) |
| `polinomio-tabla` | `(2x² − 1)(3x + 4)` en una tabla de dobles productos y suma de los cuatro | — |
| `factor-comun-area` | Extraer factor común como altura compartida de dos áreas: `g·b·x + g·c = g(bx + c)` | `a` (g), `b`, `c` |
| `fracciones-orden` | Ordenar 7/12, 5/8 y 9/16 con barras: común denominador (48) y comparación de numeradores | — |
| `fraccion-total` | Conocida la parte `a/b` (valor `c`), una parte = `c : a` y el total son `b` partes (fracción inversa) | `a`, `b`, `c` |
| `cantidad-inicial` | Cantidad inicial tras una variación: índice de variación, división y el error de «quitar el mismo %» | `a` (final), `b` (% de subida) |
| `pitagoras-demostracion` | Cuadrado de lado `b + c` llenado de dos maneras con cuatro triángulos: `b² + c² = a²` (hipotenusa `a`) | `a`, `b` (catetos) |
| `coordenadas-geograficas` | Planisferio: latitud y longitud de Jerez y de Auckland (antípodas) | — |

`captions` en el bloque `anim` sustituye los textos de paso de la escena (uno por paso): así una misma escena sirve para contextos distintos (p. ej. el fontanero de `area-distributiva`).

### Animaciones a todo el ancho

El lienzo estándar es 800 × 420, pensado para la columna derecha. Si la escena necesita ancho (líneas de tiempo, tablas largas, muchas barras), usa `<Canvas width={1200}>` y coloca la diapositiva con `arrange: "text-top"` (texto en dos columnas arriba, animación a todo el ancho debajo) o `"visual-top"`. El lienzo se acota a ~58 % de la altura de la ventana. Ejemplo: `progresion-comparar`.

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
| `enteros-explorador` | Dos enteros (−10 a 10) en la recta: orden, opuestos, valor absoluto y distancia `\|a − b\|` | `a`, `b` |
| `potencia-explorador` | Base (−5 a 5) y exponente (−4 a 6): factores, signo y valor, también con exponente cero o negativo; la base 0 no está definida | `a` (base), `b` (exponente) |
| `racional-explorador` | Numerador (−24 a 24) y denominador (1–8): posición en la recta, forma mixta, irreducible y decimal (`=`/`≈`) | `n`, `d` |
| `gasto-resto-explorador` | «Gasta `a/b` y después `c/d` de lo que queda»: barra, fracciones del total y cantidades; la 2.ª fracción actúa sobre el resto | `initial: [a, b, c, d, total]` |
| `decimal-explorador` | Fracción n/d (n 1–99, d 2–40): decimal con arco en el periodo, tipo, longitud del periodo, factores del denominador y restos | `n`, `d` |
| `generatriz-explorador` | Parte entera, cifras sin repetir y periodo: pasos de la generatriz y fracción irreducible | `a` (entera), `b` (sin repetir), `c` (periodo), `initial: [cifras sin repetir, cifras del periodo]` |
| `aproximacion-explorador` | Una cantidad y el orden de redondeo: aproximación, cifras significativas, error absoluto, cota y cota del error relativo | `a` (índice de la cantidad), `b` (orden 10^k) |
| `notacion-explorador` | Mantisa (1–9,99) y exponente (−12 a 15): todas las cifras, prefijo y posición en la escala de potencias de 10 | `a` (mantisa ×100), `b` (exponente) |
| `raiz-aprox-explorador` | √n (2–50) y cifras decimales (0–6): cotas, sus cuadrados y si la raíz es exacta o irracional | `a` (radicando), `b` (cifras) |
| `conjuntos-explorador` | Doce números (24, −5, 28/7, 0,\overline{71}, √7, π−1…) y los conjuntos a los que pertenecen | `a` (índice) |
| `raiz-indice-explorador` | Índice (2–7) y radicando (−128 a 256): existencia, valor exacto o aproximado | `a` (índice), `b` (radicando) |
| `radical-exponencial-explorador` | ⁿ√(aᵐ) = a^(m/n): fracción simplificada y cuándo desaparece el radical | `a` (índice), `b` (exponente) |
| `radical-simplificador` | Radicando (2–1000) e índice (2–4): descomposición y `k·ⁿ√m` | `a` (radicando), `b` (índice) |
| `racionalizar-explorador` | `a/√b` y su forma racionalizada simplificada, con el mismo valor decimal | `a`, `b` |
| `proporcion-explorador` | Regla de tres directa/inversa: fórmula, tipo y gráfica (recta o hipérbola) | `a`, `b`, `c`, `n` (`1` = inversa) |
| `compuesta-explorador` | Compuesta con dos magnitudes: nuevo valor y relación directa/inversa de cada una | `a`, `b`, `c` (datos), `initial: [n1, n2, inversa1, inversa2]` |
| `reparto-explorador` | Reparto proporcional entre tres: importes, fracciones y barra | `initial: [a, b, c, total]` |
| `mezcla-explorador` | Mezcla de dos productos: precio medio y posición entre los dos precios | `initial: [q1, p1 (céntimos), q2, p2]` |
| `moviles-explorador` | Cruce (suma) o alcance (resta, con retraso): tiempo y si hay alcance | `n` (`1` = alcance), `initial: [v1, v2, d, retraso min]` |
| `indice-variacion-explorador` | Una o dos variaciones porcentuales: índice, cantidad final y variación total (≠ suma) | `a` (cantidad), `b`, `c` (%) |
| `interes-explorador` | Interés simple: capital, rédito y meses; interés, capital final y barras anuales | `a` (capital), `b` (rédito), `c` (meses) |
| `monomio-explorador` | Monomio `c·xᵖ·y^q`: coeficiente, parte literal, grado, valor numérico y semejanza | `a` (coef.), `b` (exp. x), `c` (exp. y) |
| `monomios-operador` | Suma, resta, producto y cociente de dos monomios; avisa si no son semejantes o el cociente no es monomio | `initial: [coefA, expA, coefB, expB, 0, 0, op (0 +, 1 −, 2 ·, 3 :)]` |
| `polinomio-explorador` | Polinomio de grado ≤ 3 con deslizadores: grado, P(x) y gráfica | `initial: [c3, c2, c1, c0]`, `a` (x) |
| `polinomios-operador` | A ± B con coeficientes por grado: resultado y grado | `initial: [A3..A0, B3..B0, resta (1)]` |
| `producto-polinomios-explorador` | `(ax+b)(cx+d)` desarrollado y comprobación con un valor de x | `initial: [a, b, c, d]`, `a` (x) |
| `factor-comun-explorador` | Construye `k·xᵐ·(…)` y la herramienta detecta el factor común y comprueba | `initial: [k, m, c2, c1, c0]` |
| `mcm-explorador` | m.c.m. de tres denominadores y por cuánto se multiplica cada término | `initial: [d1, d2, d3]` |
| `tanteo-explorador` | Tanteo de ecuaciones sin método (x³+5=69, x^x=3125, 3^x=81…): elegir ecuación y x con décimas, ver si se queda corto o se pasa | `a` (índice), `b` (x·10) |
| `ecuacion-lineal-explorador` | `ax+b=cx+d` con deslizadores: una solución, ninguna o identidad | `initial` (`[a,b,c,d]`) |
| `cuadratica-explorador` | `ax²+bx+c=0`: parábola, discriminante, número de soluciones y raíces | `a`, `b`, `c` |
| `raices-factores-explorador` | Producto cero: 2 o 3 factores `(x−r)` y sus raíces en la parábola/curva | `initial` (`[r1,r2,r3,tres]`) |
| `reparto-ecuacion-explorador` | Reparto con renuncias: total, renuncias y recargo → ecuación de 2.º grado y n | `initial` (`[total,q,delta]`) |
| `inecuacion-explorador` | `ax+b rel c`: semirrecta solución y aviso de inversión del signo | `initial` (`[a,b,c,relIndex]`) |
| `recta-dos-incognitas-explorador` | `ax+by=c` con deslizadores: recta, tabla de soluciones y casos horizontal, vertical o sin recta | `initial` (`[a,b,c]`) |
| `sistema-grafico-explorador` | Dos rectas `a₁x+b₁y=c₁`, `a₂x+b₂y=c₂`: punto de corte, paralelas o coincidentes | `initial` (`[a1,b1,c1,a2,b2,c2]`) |
| `reduccion-explorador` | Método de reducción: elegir los multiplicadores y ver cuándo se cancela x o y (con botón de multiplicadores mínimos) | `initial` (`[a1,b1,c1,a2,b2,c2]`) |
| `sistema-no-lineal-explorador` | Recta `y=mx+n` frente a círculo, parábola o hipérbola: ecuación de 2.º grado al sustituir y puntos de corte | `initial` (`[curva 0–2, m, n]`) |
| `capitales-sistema-explorador` | Capital repartido en dos inversiones: `x+y=T`, `r₁x+r₂y=G` con barra del reparto | `initial` (`[T, r1, r2, G]`) |
| `funcion-explorador` | Función con deslizador de x: punto de la gráfica, dominio, recorrido, tramos de crecimiento y extremos relativos (5 funciones: x³−3x+2, x²−4x, x³−12x, sueldo, bola) | `a` (índice de función) |
| `periodica-explorador` | Noria: función periódica con periodo y t ajustables; instantes equivalentes marcados y resto de t entre T | `initial` (`[T, t]`) |
| `aparcamiento-explorador` | Tres tarifas de aparcamiento (por horas empezadas, exacta, entrada + exacta): coste según el tiempo y gráfica con saltos | `a` (minutos) |
| `valor-numerico` | Máquina `a·n + b`: deslizador de `n` (0–10), cuenta y gráfico de barras con todos los valores | `a`, `b`, `n` |
| `porcentaje-cuadricula` | Cuadrícula de 100 casillas: el alumno mueve el porcentaje (0–100, con atajos 10/25/50/75/100) y se pintan las casillas; lectura `p % = p/100 = decimal` | `a` (porcentaje inicial) |
| `rectas-posicion` | La recta `s` gira alrededor de un punto fijo (0–180°): paralelas, secantes (con su ángulo) o perpendiculares | `a` (giro inicial) |
| `punto-mediatriz` | Se mueve un punto `P` (altura y desplazamiento lateral): `PA = PB` solo si está en la mediatriz de `AB` | `a` (desplazamiento), `b` (altura) |
| `compas-mediatriz` | **Compás y regla interactivos**: abertura (se bloquea al empezar), giro del compás que traza cada arco, paso a B y regla; con abertura ≤ mitad de `AB` los arcos no se cortan | `a` (abertura inicial, mm) |
| `compas-bisectriz` | Compás y regla: amplitud del ángulo, arco en el vértice, arcos desde R y S (abertura propia) y regla | `a` (amplitud), `b` (abertura de los arcos, mm) |
| `bisectriz-explorador` | Amplitud del ángulo y posición de `P` en la bisectriz: dos mitades iguales y `PR = PS` | `a` (amplitud), `b` (distancia de P, cm) |
| `angulo-explorador` | Amplitud 0–360°: nombre del ángulo (agudo, recto, obtuso, llano, cóncavo, completo) con atajos 90/180/360 | `a` |
| `angulos-suma` | Complementarios (90°) o suplementarios (180°): al cambiar `α` se ajusta `β` | `a` (α), `b` (`90` o `180`) |
| `paralelas-explorador` | Inclinación de la secante (30–150°) y tipo de pareja (opuestos, correspondientes, alternos, consecutivos) con sus valores | `a` (inclinación) |
| `transportador` | Transportador con las dos escalas: la lectura sigue a la abertura del ángulo | `a` |
| `triangulo-explorador` | Ángulos `a` y `b` libres (el tercero se ajusta): triángulo y barra que suma 180° | `a`, `b` |
| `poligono-explorador` | Número de lados 3–12: triángulos en que se parte, suma `(n − 2)·180°` y ángulo del regular | `n` |
| `balanza-explorador` | Balanza `a·x + b = c`: sumar/restar 1 o dividir entre `a` en los dos platos; la solución no cambia (ecuaciones equivalentes) | `a`, `b`, `c` |
| `triangulo-clasificador` | Se mueve el vértice `C`: nombre según lados y según ángulos | `a`, `b` (posición de `C`) |
| `triangulo-centros` | Medianas y baricentro o alturas y ortocentro (dentro, en el vértice o fuera) | `a`, `b`, `c` (`1` = alturas) |
| `paralelogramo-explorador` | Lados y ángulo: romboide, rombo, rectángulo o cuadrado | `a`, `b`, `c` (ángulo) |
| `poligono-regular-explorador` | Lados (3–12) y radio: apotema y lado | `n`, `a` (radio) |
| `circ-recta-explorador` | Distancia `d` y radio `r`: exteriores, tangentes o secantes | `a` (`d`), `b` (`r`) |
| `circ-circ-explorador` | `R`, `r` y distancia entre centros: seis posiciones relativas | `a`, `b`, `c` |
| `poliedro-explorador` | Prisma o pirámide de base con `n` lados (3–10): caras, vértices, aristas y Euler | `n`, `a` (`1` = pirámide) |
| `rectangulo-explorador` | Base y altura: área y perímetro; con «Perímetro fijo» el cuadrado da el área máxima | `a`, `b`, `c` (`1` = perímetro fijo) |
| `paralelogramo-area` | Base, altura e inclinación: el área no cambia, el perímetro sí | `a`, `b`, `c` (desplazamiento) |
| `trapecio-area` | Bases y altura: `A = (B + b)·a/2` | `a` (B), `b`, `c` (altura) |
| `triangulo-area` | Base, altura y posición del vértice: el área solo depende de base y altura | `a`, `b`, `c` |
| `poligono-regular-area` | Lados (3–12) y lado: apotema, perímetro y área con `n` triángulos | `n`, `a` (lado) |
| `circulo-explorador` | Radio: longitud, área y 3,14 cuadrados de lado `r` | `a` (radio) |
| `plano-explorador` | Abscisa y ordenada (−6 a 6): cuadrante o eje, e intercambio de coordenadas | `a` (x), `b` (y) |
| `datos-explorador` | Datos editables con + y −: media, mediana y moda al instante | — |
| `sectores-explorador` | Frecuencias de cuatro categorías: grados por persona y ángulo de cada sector | — |
| `dado-simulador` | Lanza un dado o una moneda ×1, ×10, ×100, ×1000: frecuencias absolutas y relativas | `a` (`2` = moneda) |
| `laplace-explorador` | Marca caras de un dado o cambia bolas rojas y verdes: casos favorables, posibles y P | `a` (`1` = bolsa), `b`, `c` (bolas) |
| `aleacion-concentracion` | Concentración en masa de una aleación o soluto que hay que añadir | `a` (m_s), `b` (m_D), `c` (`1` = modo objetivo) |
| `energia-fusion` | Energía para fundir un metal: calentar hasta T_s + calor latente | `a` (índice del metal), `b` (kg) |
| `gibbs-explorador` | Regla de las fases F + N = C + 2 con el agua como ejemplo | `a` (C), `b` (F) |
| `diagrama-binario` | Diagrama isomorfo Cu-Ni: zona, composiciones y regla de la palanca | `a` (% Ni), `b` (°C) |
| `diagrama-eutectico` | Diagrama eutéctico A-B: estado, reparto y constituyentes | `a` (% B), `b` (°C) |
| `fe-c-explorador` | Diagrama Fe-C: región y reparto entre perlita y proeutectoide | `a` (% C), `b` (°C) |
| `acero-clasificador` | Hierro, acero y fundición según el carbono | `a` (% C) |
| `resistencia-especifica` | Metales de la tabla 3.1 ordenados por propiedad y frente al hierro | `a` (metal) |
| `pieza-peso-minimo` | Latón, acero o aluminio: masa de la pieza para una carga | `a` (kN), `b` (mm) |
| `aleaciones-filtro` | Aleaciones de Al, Mg y Ti según resistencia mínima y densidad máxima | `a` (MPa), `b` (g/cm³) |
| `grieta-griffith` | σmáx = 2σ√(a/r) en un cerámico con grieta | `a` (mm), `b` (n de r = 10⁻ⁿ mm) |
| `grado-polimerizacion` | Masa molecular del polímero (con y sin subproducto) | `a` (monómero), `b` (n) |
| `rtp-comunidades` | Reparto de los RTP por comunidad y método de gestión | `a` (comunidad) |
| `intersticio-red` | Huecos de la FCC y la BCC frente al átomo de carbono; % de C en la celda | `a` (R en pm), `b` (átomos de C), `c` (`1` = BCC) |
| `dureza-martensita` | Dureza de la martensita según el % de C | `a` (% C) |
| `ttt-explorador` | Velocidad de enfriamiento sobre las curvas TTT y estructura resultante | `a` (0–100) |
| `jominy-explorador` | Curvas de templabilidad de tres aceros y dureza a una distancia | `a` (acero), `b` (mm) |
| `temperaturas-tratamiento` | Temperaturas de temple, recocido, normalizado, globulización y revenido según el % de C | `a` (% C) |
| `perfil-dureza` | Dureza según la profundidad: cementado frente a temple total | `a` (mm), `c` (`1` = temple total) |
| `pila-electroquimica` | Pila de dos metales de la serie fem: ánodo, cátodo, ΔU y semirreacciones | `a`, `b` (índices) |
| `nernst-explorador` | Ley de Nernst: efecto de la concentración en ΔU | `a`, `b` (metales), `c` (log₁₀ [M₁]) |
| `faraday-explorador` | Ley de Faraday: masa depositada, espesor y tiempo de recubrimiento | `a` (metal), `b` (A), `c` (min) |
| `recubrimiento-rayado` | Recubrimiento metálico rayado sobre acero: ¿quién se corroe? | `a` (metal) |
| `pilling-bedworth` | Relación de volúmenes óxido/metal y tipo de capa | `a` (metal) |
| `conversor-industrial` | Conversión de presión, potencia, energía y fuerza | `a` (magnitud) |
| `plano-inclinado-trabajo` | Fuerza, recorrido y trabajo en una rampa, con rozamiento | `a` (kg), `b` (m), `c` (m) |
| `resorte-explorador` | Resorte: F = k·x y W = ½ k x² | `a` (k), `b` (x) |
| `energia-rampa` | Ep, Ec y trabajo de rozamiento a lo largo de una rampa | `a` (h₀), `b` (°), `c` (μ) |
| `momento-inercia` | Momento de inercia, radio de giro y energía de rotación | `a` (forma), `b` (kg), `c` (m) |
| `equilibrio-termico` | Mezcla de un cuerpo caliente con agua: temperatura final | `a` (material), `b` (kg), `c` (°C) |
| `primer-principio-explorador` | Q = ΔU + W (motor) o W = ΔU + Q (frigorífica) | `a` (Q), `b` (W), `c` (`1` = frigorífica) |
| `rendimiento-cadena` | Rendimiento total de varias máquinas en serie | `a` (kW útiles) |
| `potencia-vehiculo` | Potencia de un coche a velocidad constante (aire y rodadura) | `a` (km/h), `b` (Cx) |
| `par-trabajo-explorador` | Par, ángulo girado y trabajo de rotación de una rueda | `a` (N·m), `b` (m), `c` (m) |
| `diagrama-pv` | Isobárica, isoterma, isocora, adiabática y politrópica en el diagrama p–V | `a` (bar), `b` (L), `c` (V₂/V₁) |
| `potencia-electrica-hidraulica` | P = U·I con coste en kWh y P = p·Q de una presa | `a` (V), `b` (A), `c` (`1` = hidráulica) |

## Respuesta como fracción

En un `fill_in_blank` cuya respuesta sea una fracción, usa `answerFormat: "fraction"`: el alumno ve dos casillas (numerador sobre la raya, denominador debajo) y `correctAnswers` se sigue escribiendo como `"n/d"` (por ejemplo `["3/4"]`). No pidas «el numerador» ni expliques el formato en el enunciado.

## Qué se conserva de las escenas anteriores

Las lecciones con módulos de escenario (`tienda-ciclista`, `bloques-numericos`, `mul-div-naturales`, `jerarquia-operaciones`…) siguen siendo válidas para **manipulación** (explorar, arrastrar, comprobar). Regla práctica: la teoría nueva va en `slide`; lo que el alumno **toca** va en `explore` / `predict` / `interactive_tool`.

## Ayuda del tutor en los ejercicios (`help`)

Los pasos de práctica (`predict`, `fill_in_blank`…) aceptan `help: HelpBranch[]`: un árbol de preguntas del alumno («¿Qué operación hago?», «Quiero saber si mi resultado es razonable»…) con respuestas que **no repiten la diapositiva**: otro ángulo, una estimación, un caso más sencillo, una pregunta guiada. Cada rama puede abrir `branches` más concretas. Sin `help`, el tutor solo separa «lo que te dan» de «lo que te piden». Nunca des el resultado en una rama; la solución sale tras responder (`explanation`).
