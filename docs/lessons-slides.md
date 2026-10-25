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
| `punto-pendiente` | Recta por un punto con pendiente `mn/md`: escalón Δx, Δy, recta y ecuación punto-pendiente y simplificada | `nums` (`[x0, y0, mn, md]`) |
| `funcion-trozos` | Función a trozos del libro (x+4, −2x+13, 1) construida tramo a tramo con su fórmula final | — |
| `parabola-vertice` | Parábola `y = ax²+bx+c`: vértice x = −b/2a, tabla simétrica y curva | `a`, `b`, `c` |
| `hiperbola-asintotas` | Hipérbola `y = k/x`: tabla, dos ramas y asíntotas (los ejes) | `a` (k) |
| `homotecia-proyeccion` | Método de la proyección: rayos desde O, puntos a k veces la distancia y figura semejante homotética | `a` (k = 2 o 3) |
| `tales-paralelas` | Teorema de Tales: tres paralelas cortan a dos rectas y los segmentos son proporcionales | `nums` (`[oa, ab, bc, k]`) |
| `tronco-semejanza` | Tronco de cono completado hasta el cono: semejanza de triángulos para hallar x y volumen por diferencia de conos | `nums` (`[R, r, h]`) |
| `vector-coordenadas` | Vector AB: flecha entre dos puntos, avance en X e Y y coordenadas = extremo − origen con módulo | `nums` (`[ax, ay, bx, by]`) |
| `suma-vectores` | Suma de vectores: v a continuación de u, resultante y paralelogramo | `nums` (`[ux, uy, vx, vy]`) |
| `punto-medio-distancia` | Punto medio (semisuma) y distancia (Pitágoras) entre dos puntos | `nums` (`[x1, y1, x2, y2]`) |
| `perpendicular-giro` | Vector perpendicular (a, b) → (−b, a), triángulos iguales y m₁·m₂ = −1 | `nums` (`[a, b]`) |
| `varianza-desviaciones` | Desviaciones a la media, cuadrados, varianza y desviación típica de unos datos | `nums` (datos, 3 a 8) |
| `caja-atipico` | Diagrama de caja de las 40 estaturas: caja, límite de 1,5 veces su longitud, bigotes y el 189 como atípico | — |
| `arbol-urna` | Diagrama en árbol de dos extracciones de una urna con o sin reemplazamiento: ramas, probabilidades condicionadas y productos | `nums` (`[verdes, rojas, reemplazamiento 0/1]`) |
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
| `atomo-isotopos` | Átomo (núcleo y corteza, escala 10 m → 1 mm), núcleo con protones y neutrones, y isótopos / isóbaros / isótonos a partir del C-14 (Tecnología Industrial II, unidad 1) | — |
| `enlace-curva-energia` | Energía de atracción, de repulsión y neta frente a la distancia: mínimo en a₀ y energía de enlace | — |
| `ion-nacl` | Formación de NaCl: transferencia de un electrón, Na⁺ más pequeño y Cl⁻ más grande, red cristalina | — |
| `covalente-multiple` | Enlace covalente simple, doble y triple en F₂, O₂ y N₂ con pares compartidos y no enlazantes | — |
| `hibridacion-sp3` | Carbono: promoción 2s → 2p, cuatro orbitales sp³ y tetraedro del diamante (109,5°) | — |
| `metalico-nube` | Cationes en una nube de electrones: conducción y deslizamiento de capas sin romper el enlace | — |
| `agua-puente-h` | Dipolo permanente del agua (105°) y puentes de hidrógeno entre moléculas | — |
| `cristal-amorfo` | Sólido cristalino con celda unitaria que se repite frente a sólido amorfo | — |
| `elastico-plastico` | Planos de átomos con carga pequeña (elástica) y grande (deslizamiento, deformación permanente) con σ–ε en miniatura | — |
| `varilla-traccion` | Probeta en tracción: σ = F/A₀ = 200 MPa y ε = Δl/l₀ = 0,001 | — |
| `diagrama-traccion` | Diagrama σ–ε de un acero: OP, PE, límite elástico, fluencia, tensión de rotura y rotura | — |
| `brinell-huella` | Ensayo Brinell: bola, huella (d, f), S = π·D·f y HB = F/S (500 kp, 5 mm, 2,3 mm → 114 HB) | — |
| `rockwell-profundidad` | Rockwell: precarga, carga total, deformación permanente e y HRC = 100 − e | — |
| `pendulo-charpy` | Péndulo de Charpy: energía absorbida E₀ − E₁ y resiliencia ρ = Eₚ/S | — |
| `fatiga-ciclos` | Fatiga: tracción y compresión alternas, tres fases de rotura y curva de Wöhler con límite de fatiga | — |
| `procesos-camino-pv` | Gas de i a f por tres caminos: el trabajo (área bajo la curva) cambia; ciclo cerrado y trabajo neto (Tecnología Industrial II, unidad 6) | — |
| `motor-frigorifica-focos` | Motor térmico (Q_c → W + Q_f, η = 40 %) y máquina frigorífica entre dos focos | — |
| `carnot-ciclo` | Ciclo de Carnot en el diagrama pV: dos isotermas y dos adiabáticas, trabajo neto y η = 1 − T_f/T_c | — |
| `carnot-frigorifico` | El mismo ciclo recorrido al revés: compresión adiabática, cesión de Q_c, expansión adiabática y absorción de Q_f | — |
| `rankine-circuito` | Circuito de vapor: bomba, caldera, turbina y condensador, con las mejoras (recalentamiento y regeneración) | — |
| `brayton-circuito` | Turbina de gas: compresor, cámara de combustión y turbina, q₁, q₂ y η = 0,48 con r_p = 10 | — |
| `motor-4-tiempos` | Pistón, válvulas y cigüeñal en admisión, compresión, expansión y escape | — |
| `otto-diesel-pv` | Ciclos Otto (calor a V constante) y Diesel (a p constante) con sus rendimientos | — |
| `turbocompresor-flujo` | Gases de escape → turbina → compresor → intercooler → motor | — |
| `frigorifico-circuito` | Compresor, condensador, válvula de expansión y evaporador, y COP = Q_f/W | — |
| `bomba-calor-inversion` | Bomba de calor en invierno y en verano (válvula de cuatro vías) y ε > 1 | — |
| `oersted-aguja` | Aguja imantada junto a un hilo: sin corriente paralela, con corriente perpendicular, sentido invertido y campo en círculos (Tecnología Industrial II, unidad 7) | — |
| `hilos-paralelos-fuerza` | Dos hilos paralelos: atracción (mismo sentido), repulsión, doble intensidad y doble distancia; F/l = μ₀·I₁·I₂/(2π·a) | — |
| `lorentz-carga` | Carga + y − en un campo B entrante: F = q·v·B, trayectoria circular de radio m·v/(q·B) | — |
| `espira-momento` | Espira de perfil en un campo: par de fuerzas, M = I·S·B·sen φ, equilibrio y necesidad del colector | — |
| `faraday-varilla` | Barra móvil sobre un conductor en U: separación de cargas, corriente, fuerza de frenado y ε = B·l·v = ΔΦ/Δt | — |
| `motor-cc-bloques` | Motor de CC del arranque (125 A) al equilibrio (10 A) con E' creciente | — |
| `campo-giratorio` | Estator trifásico con tres corrientes a 120°: campo de módulo constante que gira 60° por instante | — |
| `arranque-estrella-triangulo` | Corriente y par de arranque en estrella y en triángulo (relación 3) | — |
| `monofasico-arranque` | Campo alternativo = dos campos giratorios opuestos; devanado auxiliar y condensador con diagrama vectorial | — |
| `humedad-compresion` | Al comprimir el aire sube la humedad relativa hasta el 100 % y el vapor sobrante condensa (Tecnología Industrial II, unidad 8) | — |
| `compresor-embolo` | Compresor de émbolo: aspiración, cierre, compresión y descarga | — |
| `red-distribucion-aire` | Compresor, depósito, filtro, línea principal inclinada 1–3°, bajantes y purgadores | — |
| `cilindros-efecto` | Cilindro de simple efecto (muelle) y de doble efecto (dos tomas) en avance y retroceso | — |
| `valvula-32-conmutacion` | Válvula 3/2 normalmente cerrada con pulsador y muelle gobernando un cilindro de simple efecto | — |
| `estrangulacion-velocidad` | Regulación de velocidad estrangulando la entrada o el escape, y dos unidireccionales | — |
| `espacio-fase-secuencia` | Diagrama espacio-fase de A+ B+ A− B− | — |
| `mando-doble-efecto` | Válvula 4/2 monoestable y cilindro de doble efecto: mando directo e indirecto por pilotaje | — |
| `viscosidad-placas` | Placa móvil y placa fija con aceite: capas con velocidad lineal y ley de Newton τ = μ·Δv/Δy (Tecnología Industrial II, unidad 9) | — |
| `flujo-laminar-turbulento` | Líneas de corriente, perfil de velocidades en un tubo y turbulencia | — |
| `prensa-hidraulica` | Prensa de émbolos de 2,5 y 150 cm²: Pascal, F₂ = 3 000 N y recorrido (86 emboladas) | — |
| `continuidad-bernoulli` | Estrechamiento: S₁v₁ = S₂v₂, presión menor donde la velocidad es mayor y medida del caudal | — |
| `bomba-engranajes` | Bomba de engranajes: aspiración, arrastre por la pared e impulsión | — |
| `limitadora-descarga` | Válvula limitadora que descarga al superar la presión de tarado y centro abierto en la 4/3 | — |
| `valvula-43-cilindro` | Cilindro de doble efecto con válvula 4/3: centro, avance, retroceso y parada | — |
| `regulacion-caudal-hid` | Orificio fijo, variable y con compensación de presión (Δp = F_m/S constante) | — |
| `lazo-abierto-cerrado` | Lazo abierto sin corrección frente a lazo cerrado con captador, comparador y realimentación | — |
| `respuesta-escalon` | Respuesta a un escalón: K, sobreoscilación M_P, t_p, t_d, t_r y banda de establecimiento t_s | — |
| `polos-plano-s` | Polos en el plano de Laplace: semiplano izquierdo (se apaga), eje imaginario (se mantiene) y derecho (crece) | — |
| `reduccion-bloques` | Serie (G₁G₂), paralelo (G₁+G₂) y anillo (G/(1+G), G/(1+GH)) como bloque equivalente | — |
| `laplace-dominios` | Ecuación diferencial en t → transformada de Laplace → álgebra en s → transformada inversa | — |
| `offset-proporcional` | Depósito con control P: offset tras un aumento de consumo y su eliminación con acción integral | — |
| `senal-analogica-digital` | Señal analógica lineal de un depósito (0,2 V/L) y su cuantización con 1, 2 y 8 bits | — |
| `sensor-inductivo` | Detector inductivo: oscilador LC, corrientes de Foucault, caída de amplitud y conmutación; el plástico no reacciona | — |
| `optica-sensor` | Sensores ópticos: barrera, reflexión y proximidad con sus alcances (200 m, 10 m, 15 m) | — |
| `galga-deformacion` | Galga pegada a una pletina: ε = σ/E y R = R₀(1 + Kε) con el ejemplo del libro (5018,9 Ω) | — |
| `encoder-tacometro` | Disco ranurado, impulsos y f = N·n/60; tacómetro con e = K·B·ω | — |
| `presion-manometros` | Manómetro de columna (p = ρ·g·h) y tubo Bourdon que se endereza al subir la presión | — |
| `temperatura-captadores` | Curvas R(T) de Pt, NTC y PTC, puente de Wheatstone equilibrado y termopar | — |
| `operacional-inversor` | Operacional ideal: masa virtual, V₀ = −(R₂/R₁)·V₁ (ejemplo 150 k / 0,5 k) y comparador | — |
| `acelerador-asr` | Pedal con potenciómetros, módulo de control, motor de la mariposa, ASR y avería con muelle | — |
| `conversion-bases` | 45 → 101101 por divisiones sucesivas, lectura de restos y 0,36 ≈ 0,0101 por multiplicaciones | — |
| `logica-niveles` | La misma señal de +5 V / 0 V leída en lógica positiva y negativa | — |
| `puertas-logicas-basicas` | OR (paralelo), AND (serie) y NOT (contacto complementario) con lámpara y tabla de verdad | — |
| `puertas-universales` | NOR y NAND como OR y AND con círculo de inversión, XOR y puertas universales | — |
| `karnaugh-agrupar` | Mapa de tres variables del ejemplo 13: Σ(1,2,4,5,6) = c·ā + b·ā + b̄·a | — |
| `nand-implementacion` | NOT, AND y OR con puertas NAND y doble inversión de una suma de productos | — |
| `mux-decoder` | Multiplexor 4→1 con selección, decodificador 2→4 y comparador de 4 bits | — |
| `sumador-binario` | Suma 1011 + 0110 columna a columna con acarreos | — |
| `secuencial-intro` | Circuito combinacional frente a circuito con memoria ante el mismo pulsador | — |
| `biestable-rs` | Dos NOR realimentadas: mantiene, Set, memoria, Reset y estado prohibido R = S = 1 | — |
| `biestable-jk-d-t` | Cronograma de un J-K por flanco: Set, mantiene, Reset y conmuta (T) | — |
| `registro-desplazamiento` | Cuatro biestables D que desplazan la palabra serie 1011 en cuatro flancos | — |
| `cableado-ladder` | Pulsadores NA y NC, bobina y contactos de un contactor, temporizadores a la conexión y a la desconexión | — |
| `grafo-bimodal` | Grafo del ejemplo 1, ecuación KM₁ = SB̄₂·(SB₁ + KM₁), esquema de contactos y autorretención | — |
| `temporizadores-cronograma` | Cronograma del ejemplo 5: KA₁, KT₁ (20 s), KA₂, KT₂ (30 s) y apagado a los 50 s | — |
| `estrella-triangulo-control` | Circuito de potencia del arranque estrella-triángulo: KM₁, KM₃, KM₂, KT₁ y enclavamiento | — |
| `cuadrado-diferencia` | `(a − b)²`: a² menos dos franjas `ab`; el cuadradito `b²` se quita dos veces y se devuelve una | `a`, `b` (b < a) |
| `polinomio-tabla` | `(2x² − 1)(3x + 4)` en una tabla de dobles productos y suma de los cuatro | — |
| `intervalo-recta` | Intervalo acotado en la recta (desigualdad, sombreado, extremos que entran o no, notación); `c`: 0 abierto, 1 cerrado, 2 `(a, b]`, 3 `[a, b)` | `a`, `b` (a < b), `c` |
| `semirrecta-recta` | Semirrecta con punto relleno o vacío, flecha y notación con ∞; `c`: 0 `(−∞, a)`, 1 `(−∞, a]`, 2 `(a, +∞)`, 3 `[a, +∞)` | `a`, `c` |
| `division-polinomios` | División larga de polinomios: un término del cociente por paso, producto restado, resto y prueba dividendo = divisor·cociente + resto | `p`, `q` (coeficientes de mayor a menor grado) |
| `ruffini-tabla` | Regla de Ruffini: coeficientes, bajar el primero, multiplicar por `a` y sumar columna a columna; cociente y resto | `p` (coeficientes), `a` |
| `trig-triangulo-razones` | Hipotenusa, cateto opuesto y contiguo a un ángulo agudo, y seno, coseno y tangente | `a` (ángulo, 20–65) |
| `trig-semejantes` | Dos triángulos con 34°: lados distintos (41, 28, 50 mm y el doble), mismas razones | — |
| `trig-notables` | Razones exactas: 45° (mitad de un cuadrado de lado 1) o 30° y 60° (mitad de un equilátero) | `a` (45 o 30) |
| `trig-altura-arbol` | Altura de un árbol: distancia a la base y ángulo de elevación; `tg α = h/d` | `a` (ángulo), `b` (distancia) |
| `arbol-conteo` | Diagrama en árbol de 2 o 3 pasos: ramas que se multiplican y número de resultados | `a`, `b`, `c?` (ramas por paso, ≤ 24 hojas), `titles` |
| `permutaciones-arbol` | Ordenaciones de A, B y C: 3 · 2 · 1 = 6 y 3! | — |
| `combinaciones-dividir` | Cuatro amigos todos contra todos: 12 parejas ordenadas, cada partido contado dos veces → 6 | — |
| `complejo-suma-vectores` | Suma de complejos como suma de vectores: dos vectores, paralelogramo y diagonal | `a`, `b` (z₁ = a+bi), `c`, `d` (z₂ = c+di), enteros en [−4, 4] |
| `complejo-giro-i` | Multiplicar por i gira 90°: i·z, i²·z = −z, i³·z y vuelta a z | `a`, `b` (z = a+bi) |
| `complejo-polar` | Módulo (Pitágoras), argumento (ángulo con el eje real) y paso a forma trigonométrica | `a`, `b` (z = a+bi), enteros en [−5, 5] |
| `complejo-producto-polar` | Producto en forma polar: módulos que se multiplican y argumentos que se suman | `a`, `b` (r₁, θ₁°), `c`, `d` (r₂, θ₂°) |
| `complejo-raices` | Raíces n-ésimas de r con argumento θ: misma circunferencia, ángulos separados 360°/n, polígono regular | `a` (r), `b` (θ°), `c` (n, 2–8) |
| `logaritmo-exponente` | Escalera de potencias de la base: el logaritmo es el exponente buscado, log_a m = z ⇔ aᶻ = m | `a` (base 2–10), `b` (exponente) |
| `logaritmo-producto` | El logaritmo de un producto suma exponentes (barras una tras otra) y el de un cociente los resta | `a` (base), `b` (m ≥ 2), `c` (k < m) |
| `gauss-eliminacion` | Método de Gauss 3×3: sistema inicial, eliminar x, eliminar y y resultado (determinado, indeterminado o incompatible) | `nums`: `[a₁,b₁,c₁,d₁, a₂,b₂,c₂,d₂, a₃,b₃,c₃,d₃]` (enteros en [−9, 9]) |
| `serie-geometrica-saltos` | Suma infinita de una progresión geométrica como saltos decrecientes sobre la recta: sumas parciales y límite a₁/(1 − r) | `a` (a₁, 1–12), `b`, `c` (r = b/c con 0 < b < c ≤ 10) |
| `radian-arco` | El radián: un arco igual al radio, arcos de varios radianes y 180° = π rad | `a` (radianes destacados, 1–6) |
| `circulo-goniometrico` | Circunferencia de radio 1: P = (cos θ, sen θ), signo por cuadrantes, ángulo de referencia y tangente sobre x = 1 | `a` (ángulo en grados, 0–359) |
| `proyeccion-vector` | Producto escalar como proyección: u y v desde el origen, sombra de u sobre v, u·v y ángulo | `nums`: `[ux, uy, vx, vy]` (enteros en [−6, 6]) |
| `limite-aproximacion` | Límite en un punto: (x² − 1)/(x − 1) sin imagen en x = 1; aproximación por la izquierda y la derecha hacia 2 | — |
| `asintotas-tipos` | Asíntotas: vertical y horizontal de (2x + 1)/(x − 1) (`a: 1`); oblicua y = x + 3 y rama parabólica (`a: 2`) | `a` (1 o 2) |
| `secante-tangente` | De las secantes a la tangente: f(x) = x² en P(1, 1), Q en x = 3, 2, 1,5 (pendientes 4, 3, 2,5) y tangente de pendiente 2 | — |
| `derivada-signo` | f(x) = 2x − 0,1x²: tangente creciente en x = 5, horizontal en 10 y decreciente en 15 | — |
| `extremos-criterios` | f(x) = x³ − 3x: puntos críticos ±1, signo de f′ y criterio de la segunda derivada | — |
| `bayes-frecuencias` | Bayes con frecuencias naturales: 10 000 móviles, 200 defectuosos, detector con 90 % de aciertos y 1 % de falsas alarmas; entre 278 marcados, 180 son defectuosos (64,7 %) | — |
| `estadistica-conceptos` | Población (72 familias), muestra de 12 resaltada, variable «número de hijos» con sus datos y tamaño muestral n = 12 | — |
| `interes-compuesto-barras` | Interés compuesto frente a simple: tres años con barras, `M = C(1+r)ᵗ` (CCSS I, tema 2) | `a` (capital), `b` (rédito %) |
| `anualidad-capitalizacion` | Anualidades de capitalización: cada aportación al inicio de año se capitaliza hasta el final y los montantes suman una progresión geométrica | `a` (aportación), `b` (rédito %), `c` (años 3–5) |
| `anualidad-amortizacion` | Anualidades de amortización: la deuda capitalizada iguala a las cuotas capitalizadas y de ahí sale la cuota | `a` (cuota), `b` (rédito %), `c` (años 3–5) |
| `triangulo-pascal` | Triángulo de Pascal: cada número es la suma de los dos de arriba y es C(n, k); regla de Pascal con C(5,2) = 4 + 6 | — |
| `cuantia-monedas` | Variable aleatoria «caras en 3 monedas»: 8 resultados agrupados, función de cuantía y de distribución | — |
| `esperanza-juego` | Esperanza del juego de los dos dados (25 casos −10 €, 10 casos +20 €, 1 caso +40 €): E = −10/36 € | — |
| `binomial-forma` | Histogramas de B(n, 1/2) para n = 1, 3, 5, 10 y 20: de las barras a la campana | — |
| `campana-normal` | Campana N(μ, σ): simetría, puntos de inflexión y áreas 68,3 %, 95,4 % y 99,7 % | — |
| `tipificacion-normal` | De N(5,7; 1,1) a N(0, 1): restar la media, dividir por σ y leer P(5 < X < 6) = 0,3453 | — |
| `intervalo-confianza-construccion` | Intervalo de confianza para una proporción: p̂ = 0,35, n = 2 000, z = 1,96 y el intervalo (0,329; 0,371) | — |
| `factor-comun-area` | Extraer factor común como altura compartida de dos áreas: `g·b·x + g·c = g(bx + c)` | `a` (g), `b`, `c` |
| `fracciones-orden` | Ordenar 7/12, 5/8 y 9/16 con barras: común denominador (48) y comparación de numeradores | — |
| `fraccion-total` | Conocida la parte `a/b` (valor `c`), una parte = `c : a` y el total son `b` partes (fracción inversa) | `a`, `b`, `c` |
| `cantidad-inicial` | Cantidad inicial tras una variación: índice de variación, división y el error de «quitar el mismo %» | `a` (final), `b` (% de subida) |
| `pitagoras-demostracion` | Cuadrado de lado `b + c` llenado de dos maneras con cuatro triángulos: `b² + c² = a²` (hipotenusa `a`) | `a`, `b` (catetos) |
| `coordenadas-geograficas` | Planisferio: latitud y longitud de Jerez y de Auckland (antípodas) | — |
| `matriz-producto` | Producto A·B de 2×3 por 3×2: se resalta la fila de A y la columna de B de cada elemento y se calcula su producto escalar | — |
| `matriz-gauss-jordan` | Inversa por Gauss–Jordan: se parte de (A | I), cada operación elemental se aplica a la fila entera y a la derecha queda A⁻¹ (o aparece una fila de ceros si es singular) | `nums` (4 o 9 elementos de A por filas) |
| `matriz-rango-gauss` | Rango escalonando: operaciones elementales hasta una fila de ceros; rango = filas no nulas | `nums` (9 elementos de una matriz 3×3) |
| `matriz-traspuesta` | Traspuesta: las filas de A (por colores) pasan a ser las columnas de Aᵗ y 2×3 → 3×2 | — |
| `grafo-adyacencia` | Grafo dirigido de cuatro nodos y su matriz de adyacencia; al elevar al cuadrado, el elemento (A, C) cuenta el camino A→B→C | — |
| `matriz-elementos` | Tabla de juguetes como matriz 2×3: filas, columnas, dimensión y elementos a₁₃ y a₂₁ | — |
| `matriz-tipos` | Triangular superior e inferior, diagonal, escalar e identidad con los ceros y la diagonal marcados | — |
| `determinante-sarrus` | Regla de Sarrus: se repiten dos columnas, las diagonales que bajan suman y las que suben restan | `nums` (9 elementos por filas) |
| `matriz-menor-adjunto` | Menor complementario y adjunto: se tachan fila y columna, se calcula el menor 2×2, se aplica el signo y aparece el tablero de signos | `a`, `b` (fila y columna, desde 1) |
| `determinante-adjuntos` | Desarrollo por los adjuntos de una fila de un determinante 3×3 con los signos y cada término | `nums` (9 elementos), `a` (fila, desde 1) |
| `determinante-gauss` | Determinante haciendo ceros: cada operación y si cambia o no el valor; al final producto de la diagonal | `nums` (9 o 16 elementos) |
| `sistema-forma-matricial` | De las ecuaciones a A·X = B: matriz de coeficientes, columnas X y B y matriz ampliada | — |
| `sistema-gauss-ampliada` | Gauss sobre la matriz ampliada (A | B): cada operación, matriz escalonada y lectura (S.C.D., S.C.I. o S.I.) | `nums`: `[a₁,b₁,c₁,d₁, a₂,b₂,c₂,d₂, a₃,b₃,c₃,d₃]` (enteros en [−9, 9]) |
| `rouche-casos` | Rouché–Frobenius: tabla con los tres casos según rg(A), rg(A*) y n | — |
| `vector-componentes-3d` | Vector en el espacio: punto, flecha desde el origen, componentes sobre los ejes y módulo | `a`, `b`, `c` (coordenadas del punto, 0–5) |
| `vectores-suma-3d` | Suma de vectores del espacio: poligonal y regla del paralelogramo | `nums`: `[ux,uy,uz,vx,vy,vz]` (−5 a 5) |
| `producto-escalar-proyeccion` | Producto escalar con la proyección de v sobre u y el signo según el ángulo | `a`: ángulo en grados (0–180) |
| `producto-vectorial-3d` | Producto vectorial: paralelogramo, vector perpendicular y módulo como área | `nums`: `[ux,uy,uz,vx,vy,vz]` |
| `paralelepipedo-volumen` | Paralelepípedo de tres vectores: base, altura, producto mixto y volumen del tetraedro | `nums`: 9 componentes por filas |
| `recta-espacio-3d` | Recta de punto P y vector director v: puntos con t = 1, 2, −1 y ecuaciones paramétricas | `nums`: `[Px,Py,Pz,vx,vy,vz]` (−5 a 5) |
| `plano-tres-puntos-3d` | Plano por tres puntos: dos vectores, normal (producto vectorial) y ecuación general | `nums`: `[Ax,Ay,Az,Bx,By,Bz,Cx,Cy,Cz]` |
| `rectas-posiciones-3d` | Las cuatro posiciones relativas de dos rectas con los rangos de {u, v} y {u, v, PQ} | — |
| `proyeccion-punto-plano-3d` | Recta perpendicular por P, pie F, distancia y simétrico respecto de un plano | `nums`: `[Px,Py,Pz, A,B,C, D]` |
| `distancia-punto-recta-3d` | Distancia de un punto a una recta: paralelogramo de AP y v, área entre base y pie de la perpendicular | `nums`: `[P, A, v]` (9 valores) |
| `distancia-rectas-cruzan-3d` | Distancia entre dos rectas que se cruzan: paralelepípedo de u, v y PQ, volumen entre área de la base | `nums`: `[P, u, Q, v]` (12 valores) |
| `bolzano-biseccion` | Bolzano con f(x) = x³ − x − 1: cambio de signo en [1, 2] y bisección del intervalo | — |
| `rolle-lagrange` | Teorema de Rolle (a = 0, x² − 4x + 3 en [1, 3]) y de Lagrange (a = 1, x² en [0, 3]): tangente paralela a la secante | `a` (0 Rolle, 1 Lagrange) |
| `primitiva-familia` | La familia de primitivas F(x) + C de f(x) = x: curvas trasladadas con tangentes paralelas |  |
| `riemann-sumas` | Sumas de Riemann inferior y superior de x² en [0, 3] con 3, 6, 12 y 48 rectángulos |  |
| `teorema-fundamental` | La función área A(x) = ∫₀ˣ t dt: el incremento de área entre h tiende a la altura f(x) |  |
| `area-entre-curvas` | Área entre y = 2x e y = x² en [0, 2] con una franja vertical |  |
| `solido-revolucion` | Sólido de revolución de y = √x en [0, 4]: discos y volumen 8π |  |
| `pascal-binomio` | Triángulo de Pascal: cada número es la suma de los dos de encima, C(5, 2) = 10 y la fila de (a + b)⁴ |  |

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
| `intervalo-explorador` | Intervalo `(a, b)`, `[a, b]`, `(a, b]` o `[a, b)`: notación, desigualdad, recta y si un número de prueba pertenece | `initial: [a, b, tipo (0–3), x]` |
| `sistema-inecuaciones-explorador` | Dos semirrectas `x < a`, `x ≤ a`, `x > a`, `x ≥ a`: intersección como intervalo, punto o sin solución | `initial: [a, sentido1 (0–3), b, sentido2 (0–3)]` |
| `ruffini-explorador` | Tabla de Ruffini de un cúbico: cociente, resto = P(a) y si `a` es raíz | `initial: [c3, c2, c1, c0, a]` |
| `fraccion-alg-explorador` | Fracción algebraica y su simplificada (3 casos): mismo valor salvo en los valores excluidos | `a` (caso 0–2), `b` (x) |
| `trig-explorador` | Triángulo rectángulo con ángulo α e hipotenusa variables: lados y razones (que no cambian con el tamaño) | `a` (ángulo), `b` (hipotenusa) |
| `trig-resolver-explorador` | Resolver un triángulo rectángulo: con ángulo + hipotenusa (`n: 0`) o con dos catetos (`n: 1`, `c` opuesto, `d` contiguo); ángulos en °′″ | `n`, `a`, `b`, `c`, `d` |
| `combinatoria-explorador` | VR, V, P y C de `m` elementos tomados de `n` en `n`, y por qué C = V/n! | `a` (m ≤ 10), `b` (n ≤ m) |
| `entorno-explorador` | Entorno E(a, r) = (a−r, a+r) y número de prueba: pertenece si su distancia al centro es menor que r | `initial`: `[a, 2r, 2x]` (centro, doble del radio, doble del número de prueba) |
| `complejo-explorador` | Complejo z = x+yi en el plano: conjugado, módulo y argumento principal | `initial`: `[x, y]` en [−5, 5] |
| `complejos-operaciones-explorador` | Suma, resta, producto y cociente de dos complejos, con el resultado en binómica, polar y en el plano | `initial`: `[a, b, c, d, op]` (z₁ = a+bi, z₂ = c+di; op 0 +, 1 −, 2 ·, 3 :) |
| `potencia-compleja-explorador` | Moivre: z = r_θ elevado a n tiene módulo rⁿ y argumento nθ | `initial`: `[10r, θ°, n]` (r entre 0,5 y 1,5; n ≤ 12) |
| `raices-complejas-explorador` | Raíces n-ésimas de un complejo en polar: lista en binómica y polígono regular | `initial`: `[r, θ°, n]` (r ≤ 64, n 2–8) |
| `logaritmo-explorador` | log_b N exacto o entre dos potencias consecutivas, y comprobación con el cambio de base | `initial`: `[base 2–10, N ≤ 1000]` |
| `log-propiedades-explorador` | Producto, cociente y potencia con números concretos, y por qué log(x+y) ≠ log x + log y | `initial`: `[base, x, y, n]` |
| `sistema-parametro-explorador` | Sistema x+y+z=1, x+2y+3z=2, x+3y+mz=k: última ecuación tras Gauss, tipo (determinado/indeterminado/incompatible) y solución | `initial`: `[m, k]` |
| `inecuacion-cuadratica-explorador` | `ax²+bx+c ▢ 0` con a = ±1: parábola, discriminante, raíces y conjunto solución como unión de intervalos | `initial`: `[a, b, c, rel]` (rel 0 <, 1 ≤, 2 >, 3 ≥) |
| `region-inecuaciones-explorador` | Dos inecuaciones lineales `ax+by ≤/≥ c`: semiplanos, región solución, punto de corte de las rectas | `initial`: `[a₁,b₁,c₁,rel₁, a₂,b₂,c₂,rel₂]` (rel 0 ≤, 1 ≥) |
| `sucesion-explorador` | Sucesión de un catálogo (2n, 1/n, (−1)ⁿ, (2n+1)/(n+1)…): término n-ésimo, gráfica de puntos, tipo (convergente/divergente/oscilante), monotonía y acotación | `initial`: `[sucesión 0–8, n]` |
| `progresion-explorador` | Progresión aritmética (+d) o geométrica (·r): término general, suma de n términos y suma infinita si |r| < 1 | `initial`: `[tipo (0 aritmética, 1 geométrica), a₁, d o 2r, n]` |
| `limite-epsilon-explorador` | Definición de límite: dada una distancia ε, desde qué lugar n₀ todos los términos quedan a menos de ε del límite | `initial`: `[sucesión 0–3, ε índice 0–6]` |
| `limite-racional-explorador` | aₙ = (a·nᵖ + 3)/(c·nᵠ + 5): tabla con n grande y límite por comparación de grados | `initial`: `[p, a, q, c]` |
| `numero-e-explorador` | (1 + 1/n)ⁿ al crecer n y capital con n abonos al año frente a 1000·eʳ | `initial`: `[índice de n 0–8, rédito %]` |
| `radianes-explorador` | Grados ↔ radianes (fracción de π) y longitud de arco s = θ·r | `initial`: `[grados (0–720), radio]` |
| `circulo-trig-explorador` | Seno, coseno y tangente de un ángulo cualquiera sobre la circunferencia unidad, con cuadrante, referencia y valores exactos | `initial`: `[grados]` |
| `angulos-relacionados-explorador` | Tabla de razones de α, 180°−α, 180°+α, 360°−α, −α y 90°−α | `initial`: `[α agudo]` |
| `suma-angulos-explorador` | sen y cos de a ± b con las fórmulas frente al valor directo y al error típico sen a + sen b | `initial`: `[a, b, 0 suma/1 resta]` |
| `doble-mitad-explorador` | sen 2α, cos 2α y razones del ángulo mitad con sus fórmulas y el signo por cuadrante | `initial`: `[α (15–360)]` |
| `suma-producto-explorador` | Las cuatro fórmulas de suma de razones a producto, con valores | `initial`: `[A, B]` |
| `ecuacion-trig-explorador` | sen x = a, cos x = a o tg x = a: soluciones en [0°, 360°) y en la gráfica | `initial`: `[función (0 sen, 1 cos, 2 tg), 2a]` |
| `triangulo-general-explorador` | Triángulo por LAL, LLL, AAL o LLA (caso ambiguo con 0, 1 o 2 soluciones): lados, ángulos, área y dibujo | `initial`: `[caso (0–3), dato1, dato2, dato3]` |
| `producto-escalar-explorador` | u·v, módulos, ángulo (agudo, recto u obtuso) y proyección de u sobre v | `initial`: `[ux, uy, vx, vy]` |
| `recta-formas-explorador` | Recta por un punto y un vector director en forma vectorial, paramétricas, continua, general y explícita | `initial`: `[x₀, y₀, dx, dy]` |
| `rectas-angulo-explorador` | Dos rectas Ax+By=C: posición relativa, punto de corte y ángulo | `initial`: `[A₁, B₁, C₁, A₂, B₂, C₂]` |
| `distancia-punto-recta-explorador` | Distancia de un punto a la recta Ax+By+C=0 con el pie de la perpendicular | `initial`: `[A, B, C, x₀, y₀]` |
| `mediatriz-explorador` | Mediatriz del segmento AB y distancias de un punto T a A y B | `initial`: `[ax, ay, bx, by, tx, ty]` |
| `conica-explorador` | Circunferencia, elipse, hipérbola o parábola con centro o vértice en (h, k): ecuación, focos, excentricidad, asíntotas o directriz | `initial`: `[tipo (0 circ., 1 elipse, 2 hipérbola, 3 parábola), a, b, h, k]` |
| `dominio-explorador` | Dominio de una función polinómica, racional, con raíz, logaritmo o √(x² − q), con la gráfica solo donde hay valor | `initial`: `[tipo (0–4), p, q]` |
| `simetria-explorador` | Paridad de una función (par, impar o ninguna) comparando f(x) y f(−x) | `initial`: `[función (índice), 2·x₀]` |
| `signo-explorador` | Cortes con los ejes y tabla de signo de un polinomio factorizado | `initial`: `[r₁, r₂, r₃, tercer factor (0/1), signo (±1)]` |
| `funcion-raiz-explorador` | y = a·√(x − h) + k (o raíz cúbica): dominio y recorrido | `initial`: `[índice (2 o 3), a, h, k]` |
| `exp-log-explorador` | Exponencial y logaritmo de la misma base como inversas, con la recta y = x | `initial`: `[base]` |
| `trig-funcion-explorador` | y = A·f(Bx + C) + D con seno, coseno o tangente: periodo, amplitud y recorrido | `initial`: `[función (0 sen, 1 cos, 2 tg), A, B, C°, D]` |
| `abs-funcion-explorador` | Valor absoluto de f con f lineal o cuadrática: reflejo de la parte negativa y expresión a trozos | `initial`: `[tipo, a, b, c]` |
| `oferta-demanda-explorador` | Rectas de oferta y demanda, precio de mercado, excedente o escasez y punto de equilibrio | `initial`: `[ordenada oferta, pendiente oferta, ordenada demanda, pendiente demanda, precio]` |
| `composicion-explorador` | f∘g y g∘f para pares de funciones elementales, con valores en un punto | `initial`: `[f (índice), g (índice), 2·x]` |
| `inversa-explorador` | Función, inversa y simetría respecto de y = x; señala las no inyectivas | `initial`: `[función (índice), 2·x₀]` |
| `limite-tabla-explorador` | Tabla de valores al acercarse a a por un lado: cuatro funciones, límite lateral e imagen | `initial`: `[función (0–3), lado (0 izq., 1 der.), pasos (0–5)]` |
| `limite-lateral-explorador` | Seis funciones a trozos: límites laterales, f(a), existencia del límite y tipo de discontinuidad | `initial`: `[función (0–5), distancia k (0–4)]` |
| `limite-infinito-explorador` | Siete funciones y cuatro destinos (0⁺, 0⁻, +∞, −∞): tabla de valores, límite y tipo | `initial`: `[función (0–6), destino (0–3)]` |
| `asintotas-explorador` | f(x) = (ax² + bx + c)/(x − r): vertical, horizontal u oblicua (m, n) o hueco | `initial`: `[a, b, c, r]` |
| `cero-cero-explorador` | 0/0 factorizando o con el conjugado de una raíz: pasos, gráfica con hueco y límite | `initial`: `[0, a, b, c]` o `[1, s, k]` |
| `limite-grados-explorador` | (a·xᵖ + 3)/(c·xᵠ + 5) en ±∞: tabla, regla de grados y límite | `initial`: `[p, a, q, c, signo (0 +∞, 1 −∞)]` |
| `continuidad-k-explorador` | f(x) = x² si x < a; x + k si x ≥ a: laterales, salto y valor de k para que sea continua | `initial`: `[a, k]` |
| `operaciones-limite-explorador` | Límite de f ± g, f·g o f/g para funciones sencillas en +∞ o 0⁺: forma resultante, si es indeterminada y valor real | `initial`: `[f (0–5), g (0–5), operación (0 +, 1 −, 2 ·, 3 /), destino (0 +∞, 1 0⁺)]` |
| `resta-fracciones-explorador` | 1/(x − r) − k/(x² − r²) cuando x → r: común denominador, laterales y límite (finito solo si k = 2r) | `initial`: `[k, r]` |
| `secante-explorador` | Secante entre a y a + h para 11 funciones: puntos P y Q, TVM y pendiente de la tangente | `initial`: `[función (0–10), 2·a, tamaño de h (0–5), lado (0 der., 1 izq.)]` |
| `derivabilidad-explorador` | Seis casos (|x|, empalme suave, esquina, salto, ∛x, x·|x|): derivadas laterales, secantes y veredicto | `initial`: `[caso (0–5), distancia k (0–4)]` |
| `funcion-derivada-explorador` | f, f′ y la tangente en un punto móvil: valor, signo de f′ y ecuación de la tangente | `initial`: `[función (0–10), 10·a]` |
| `producto-cociente-explorador` | (f·g)′ o (f/g)′ con ocho funciones: regla aplicada, valor y comprobación con cocientes incrementales | `initial`: `[f, g (0–7), operación (0 ·, 1 /), 2·x]` |
| `cadena-explorador` | Derivada de f(g(x)) con seis exteriores y cuatro interiores, con comprobación numérica | `initial`: `[exterior (0–5), interior (0–3), 2·x]` |
| `derivada-inversa-explorador` | f, f⁻¹ y sus tangentes simétricas: (f⁻¹)′(b) = 1/f′(f⁻¹(b)); incluye arcsen y arctg | `initial`: `[función (0–5), 10·b]` |
| `velocidad-aceleracion-explorador` | Posición, velocidad y aceleración de cuatro movimientos en un instante t | `initial`: `[movimiento (0–3), t (0–40, fracción de tmax)]` |
| `extremos-explorador` | Puntos críticos, criterio de f″, inflexión y extremos absolutos en [p, q] | `initial`: `[función (0–5), p, q, absolutos (0/1)]` |
| `optimizacion-explorador` | Cuatro problemas del libro: función a optimizar, derivada, dominio y extremo | `initial`: `[problema (0–3), posición (0–100 %)]` |
| `sucesos-venn-explorador` | Dos sucesos de un dado en un diagrama de Venn: unión, intersección, diferencia, contrario y las dos leyes de De Morgan, con P por Laplace | `initial`: `[A (0–5), B (0–5), operación (0–5)]` |
| `prob-union-explorador` | Mosaico de A y B con P(A), P(B) y P(A∩B): unión, contrarios, condicionadas, incompatibilidad e independencia | `initial`: `[P(A) %, P(B) %, P(A∩B) %]` |
| `tabla-contingencia-explorador` | Tabla 2×2 con conteos (hígado, medicamento o genérico): marginales, los dos árboles y si son independientes | `initial`: `[datos (0–2)]` o `[datos, A∩B, noA∩B, A∩noB, noA∩noB]` |
| `arbol-tabla-explorador` | De P(A), P(B/A) y P(B/noA) a la tabla de contingencia y al árbol que empieza en B | `initial`: `[P(A) %, P(B/A) %, P(B/noA) %]` |
| `prob-total-explorador` | Probabilidad total y Bayes en cinco situaciones (urnas, cajas, móviles, sastres, tornillos), con suceso contrario y barra de posteriores | `initial`: `[situación (0–4), contrario (0/1), % defectuosos]` |
| `azar-famoso-explorador` | Cumpleaños, Caballero de la Meré y Galileo con tres dados | `initial`: `[problema (0–2), n, apuesta (0/1), suma 3–18]` |
| `percentiles-explorador` | Percentil p (posición n·p/100, por exceso si no es entera), cuartiles, mediana, rango intercuartílico y diagrama de caja en cuatro conjuntos de datos | `initial`: `[datos (0–3), p (1–99)]` |
| `doble-entrada-explorador` | Tablas de doble entrada (impresoras, fármacos, terapia, ganado): marginales, condicionadas a una fila o columna y test de independencia | `initial`: `[tabla (0–3), fila, columna]` |
| `nube-regresion-explorador` | Nube de puntos con seis conjuntos de datos o una nube sintética con r ajustable: medias, covarianza, r, rectas de regresión Y/X y X/Y, predicción y dato atípico | `initial`: `[datos (0–6), r·100, atípico (0/1), x atípico %, y atípico %, x₀ %]` |
| `capitalizacion-explorador` | Anualidades de capitalización: aportación, rédito, años y nº de pagos al año → capital final, aportado e intereses (CCSS I) | `initial`: `[aportación €, rédito %, años, pagos/año (1, 2, 4, 12)]` |
| `prestamo-explorador` | Anualidades de amortización de un préstamo: cuota, total pagado, intereses y deuda pendiente | `initial`: `[deuda €, rédito %, años, cuotas/año (1, 2, 4, 12)]` |
| `tae-explorador` | TAE: con el mismo rédito nominal, cuantas más capitalizaciones al año, mayor la TAE | `initial`: `[rédito nominal %, capitalizaciones/año (1, 2, 4, 12)]` |
| `interpolacion-explorador` | Interpolación y extrapolación lineal y cuadrática con los datos dosis–curaciones del libro | `initial`: `[dosis x (0–12), primer punto usado k (1–8)]` |
| `diferencias-explorador` | Diferencias sucesivas de cuatro series: detecta si los datos son lineales, cuadráticos, cúbicos o no polinómicos | `initial`: `[serie (0–3)]` |
| `parte-entera-explorador` | Parte entera [x], techo ⌈x⌉ y parte decimal, con la gráfica escalonada | `initial`: `[x·10 (−40 a 40)]` |
| `beneficio-explorador` | Ingresos (p = a − bx), costes (cx + F) y beneficio B(x); máximo donde B′(x) = 0 | `initial`: `[a, b·10, c, F, x]` |
| `regresion-cuadratica-explorador` | Recta frente a parábola de regresión (estatura y notas de Física): R² de cada una y predicción | `initial`: `[datos (0–1), x₀ (0–12)]` |
| `pascal-explorador` | C(n, k) con factoriales, fila del triángulo de Pascal resaltada, regla de Pascal y suma 2ⁿ | `initial`: `[n (0–10), k (0–10)]` |
| `binomio-explorador` | Desarrollo de (ax + b)ⁿ, término k+1 y suma de coeficientes | `initial`: `[n (1–8), a (1–3), b (−3 a 3), k]` |
| `cuantia-explorador` | Tabla de p(x) y F(x), media, varianza y desviación de cinco variables discretas (incluye un juego con signo de la esperanza) | `initial`: `[variable (0–4)]` |
| `binomial-explorador` | B(n, p): histograma, P(X = k), P(X ≤ k) y P(X ≥ k), media y desviación típica | `initial`: `[n (1–40), p % (1–99), k, modo (0 =, 1 ≤, 2 ≥)]` |
| `normal-explorador` | N(μ, σ): área sombreada entre a y b o en una cola, z de los extremos y regla 68–95–99,7 | `initial`: `[μ, σ, a, b, modo (0 entre, 1 menor, 2 mayor)]` |
| `tabla-normal-explorador` | Tabla de N(0, 1) con la celda de z resaltada, cola derecha, intervalo simétrico y simetría para z < 0 | `initial`: `[z·100 (−400 a 400)]` |
| `binomial-normal-explorador` | Probabilidad exacta de B(n, p) frente a la normal con y sin corrección de continuidad; criterio npq ≥ 9 | `initial`: `[n, p %, a, b]` |
| `intervalo-confianza-explorador` | Intervalo de confianza para una proporción y simulación de 20 muestras (cuántos intervalos contienen la proporción real) | `initial`: `[p̂‰, n, nivel (0 90 %, 1 95 %, 2 99 %), simulación (0/1)]` |
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
| `recta-mn-explorador` | `y = mx + n` con deslizadores (m en pasos de 0,5): escalón de pendiente, ordenada en el origen y tipo (proporcionalidad, constante, afín) | `initial` (`[2m, n]`) |
| `pendiente-puntos-explorador` | Dos puntos con deslizadores: pendiente (Δy/Δx), caso vertical y ecuación punto-pendiente y simplificada | `initial` (`[x1,y1,x2,y2]`) |
| `trozos-explorador` | Cuatro funciones a trozos: tramo usado en cada x, extremos abiertos/cerrados y si los tramos empalman o saltan | `a` (función), `b` (x) |
| `parabola-explorador` | Parábola con deslizadores a, b, c: vértice exacto, máximo/mínimo, anchura y cortes con los ejes | `a`, `b`, `c` |
| `hiperbola-explorador` | `y = k/(x−h)+v`: asíntotas vertical y horizontal, ramas y valores | `initial` (`[k, h, v]`) |
| `radical-explorador` | `y = a√(x−h)+k` con reflejo: dominio y recorrido | `initial` (`[a, h, k, reflejada 0/1]`) |
| `exponencial-explorador` | `y = C·aˣ` con bases 0,4–3: creciente/decreciente, puntos (0, C) y (1, Ca), asíntota | `a` (base), `b` (C) |
| `compuesto-explorador` | Variación porcentual anual repetida `C·(1+r/100)ˣ`: valor, años para duplicarse o reducirse a la mitad y gráfica | `initial` (`[C, r %, años]`) |
| `escala-explorador` | Escala 1:N (de 1:50 a 1:20 000 000) y medida del plano → distancia real, con razones de áreas N² y volúmenes N³ | `a` (N), `b` (cm) |
| `semejanza-razon-explorador` | Razón k de 0,5 a 4: lados ×k, área ×k², volumen ×k³ con cuadrícula comparativa | `a` (2k), `b` (lado) |
| `tales-explorador` | Triángulo en posición de Tales (AB, AC, BC y AD): lados proporcionales, AE, DE y razón de áreas | `initial` (`[AB, AC, BC, AD]`) |
| `sombra-explorador` | Alturas con sombras: vara y árbol en el mismo instante, H = h·S/s | `initial` (`[10h, 10s, 10S]`) |
| `homotecia-explorador` | Homotecia de centro O y razón k (−3 a 3): figura imagen, razón de longitudes y áreas | `a` (2k) |
| `vector-explorador` | Vector AB con A y B móviles: coordenadas, módulo exacto y decimal, sentido | `initial` (`[ax, ay, bx, by]`) |
| `vectores-operaciones-explorador` | k·u + m·v con u, v, k y m ajustables; también u + v y u − v | `initial` (`[ux, uy, vx, vy, k, m]`) |
| `punto-medio-explorador` | Punto medio y distancia entre A y B con el triángulo rectángulo | `initial` (`[ax, ay, bx, by]`) |
| `rectas-analitica-explorador` | Recta por A y B, paralela y perpendicular por T con sus ecuaciones | `initial` (`[ax, ay, bx, by, tx, ty]`) |
| `tabla-parametros-explorador` | Tabla de frecuencias editable (test, pesos agrupados, estaturas): Σf, Σfx, Σfx², media, varianza, σ y C.V. | `a` (tabla 0–2) |
| `agrupar-explorador` | Las 40 estaturas en 6, 8 o 10 intervalos: recorrido, r′, longitud, marcas de clase, frecuencias e histograma | `a` (6, 8 o 10) |
| `cuartiles-explorador` | Cuartiles y diagrama de caja con el criterio del libro en 4 distribuciones; el mayor valor de las estaturas se puede mover para ver cuándo es atípico | `a` (distribución 0–3) |
| `dispersion-explorador` | Compara C.V. de dos grupos con media y σ ajustables | `initial` (`[mediaA, 2σA, mediaB, 2σB]`) |
| `urna-arbol-explorador` | Urna con bolas verdes y rojas, con/sin reemplazamiento: P(VV), P(RR), una de cada color y ramas condicionadas | `initial` (`[verdes, rojas, reemplazamiento 0/1]`) |
| `dos-dados-explorador` | Tabla 6×6 de dos dados con operación (suma, diferencia, mayor, menor, producto), condición y probabilidad en 36avos | `a` (operación 0–4), `b` (k) |
| `independientes-explorador` | n pruebas independientes con probabilidad p: P(todas), P(ninguna) y P(alguna) | `initial` (`[p %, n]`) |
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
| `isotopos-explorador` | Protones y neutrones de un átomo frente a uno de referencia (C-14): A, símbolo y relación (isótopo, isóbaro, isótono) | `a` (Z de referencia), `b` (N de referencia) |
| `curva-enlace-explorador` | Distancia entre núcleos y energía de enlace: energía neta, dominio de atracción o repulsión y mínimo en a₀ = 0,3 nm | `a` (r en centésimas de nm), `b` (E₀ en kcal/mol) |
| `electronegatividad-explorador` | Dos elementos de la Tabla 1.1: ΔEN y tipo de enlace (metálico, iónico, covalente polar o apolar) | `a`, `b` (índices de los elementos) |
| `covalente-explorador` | Molécula X₂ (H, F, Cl, O, N): electrones de valencia, pares compartidos y tipo de enlace | `a` (índice del elemento) |
| `enlace-fusion-grafica` | Tabla 1.4: energía de enlace frente a temperatura de fusión por tipo de enlace y estimación de la energía de un metal | `a` (T de fusión inicial, °C) |
| `celda-explorador` | Celdas BCC, FCC y HCP en 3D que se giran: átomos por celda, vecinos y ejemplos | `a` (0 BCC, 1 FCC, 2 HCP) |
| `alotropia-explorador` | Estructura de un metal (Fe, Ca, Ti, Na, Al, Cu, Cr) según la temperatura, con sus transformaciones | `a` (metal), `b` (T inicial, °C) |
| `tension-deformacion-explorador` | Fuerza, diámetro, longitud inicial y alargamiento de una probeta: A₀, σ en MPa y ε | `a` (kN), `b` (mm), `c` (Δl en mm) |
| `diagrama-traccion-explorador` | Seis curvas σ–ε (acero con fluencia, fundido, bronce, Al-Cu, deformado en frío, templado): zona, tensión y deformación permanente al soltar | `a` (material) |
| `hooke-explorador` | Ley de Hooke con materiales de la Tabla 1.6: E, σ = F/A₀ y Δl = F·l₀/(A₀·E), con aviso al pasar el límite elástico | `a` (material), `b` (kN), `c` (mm²) |
| `tension-trabajo-explorador` | Tensión de trabajo σt = σF/n o σR/n y fuerza máxima para un material de la Tabla 1.6 | `a` (material), `b` (n) |
| `brinell-explorador` | Bola, carga y huella del ensayo Brinell: f, S, HB, huella válida (D/4 < d < D/2) y carga recomendada P = K·D² | `a` (kp), `b` (mm) |
| `vickers-explorador` | Carga y diagonal de la huella: HV = 1,8543·F/d² | `a` (kp), `b` (mm) |
| `rockwell-explorador` | Deformación permanente e (unidades de 0,002 mm): HRC = 100 − e y HRB = 130 − e | `a` (e) |
| `charpy-explorador` | Ángulos inicial y final del péndulo de Charpy: E₀, E₁, energía absorbida y resiliencia | `a` (° inicial), `b` (° final) |
| `fatiga-explorador` | Tensión alterna (% de σ_R) y vida en ciclos con límite de fatiga (curva esquemática) | `a` (%) |
| `carnot-explorador` | Rendimiento de Carnot de un motor o eficiencia de una máquina frigorífica según T_c y T_f (con kelvin) | `a` (T_c, °C), `b` (T_f, °C) |
| `brayton-explorador` | Rendimiento del ciclo Brayton frente a la relación de presiones r_p | `a` (r_p) |
| `otto-diesel-explorador` | Rendimientos Otto y Diesel con r y r_c, y aviso de detonación | `a` (r), `b` (r_c) |
| `potencia-motor-explorador` | P = (N/2)·V_T·d_a·δ·Q_c·η con gasolina o gasóleo, en kW y CV | `a` (rpm), `b` (l) |
| `cilindrada-explorador` | Diámetro, carrera, relación de compresión y cilindros: cilindrada, cámara de combustión y η Otto | `a` (mm), `b` (mm), `c` (r) |
| `frigorifica-explorador` | Eficiencia de Carnot y real de una máquina frigorífica: W, Q_c y ε de la bomba de calor | `a` (T_f, °C), `b` (T_c, °C) |
| `motor-tiempos-explorador` | Cigüeñal de 0° a 720°: pistón, válvulas, tiempo activo y cuándo hay trabajo | `a` (ángulo) |
| `campo-hilo-explorador` | Campo de un hilo B = μ₀I/(2πa) y fuerza entre dos hilos paralelos (atracción o repulsión) | `a` (I₁, A), `b` (I₂, A), `c` (a, mm) |
| `lorentz-explorador` | Protón, electrón o partícula α en un campo B: fuerza, radio y periodo | `a` (v, 10⁶ m/s), `b` (B, T) |
| `espira-par-explorador` | M = N·I·S·B·sen φ con N, I, S, B y φ, y curva del momento | `a` (N), `b` (I), `c` (φ) |
| `fem-induccion-explorador` | fem de una barra móvil (B·l·v) o de una bobina con flujo variable (N·ΔΦ/Δt) | `a` (B, T), `b` (v, m/s) |
| `motor-cc-explorador` | Motor independiente, derivación o serie: Iᵢ, I_ex, I y corriente de arranque | `a` (U), `b` (E') |
| `curvas-cc-explorador` | Curvas n(Iᵢ) y M(n) de un motor derivación (ejemplo del libro) y de uno serie | `a` (Iᵢ) |
| `balance-cc-explorador` | Balance de potencias de un motor derivación: pérdidas en cobre, hierro y mecánicas, P_u y rendimiento | `a` (U), `b` (I) |
| `arranque-cc-explorador` | Intensidad nominal, de arranque directo y resistencia del reóstato de arranque | `a` (U), `b` (E') |
| `velocidad-trifasico-explorador` | n₁ = 60·f/p, deslizamiento y velocidad del rotor | `a` (pares de polos), `b` (S, %) |
| `trifasico-conexion-explorador` | Placa 230/400 o 400/690 V y red: estrella o triángulo, U_f e I_f | `a` (I_L, A) |
| `curva-par-asincrono-explorador` | Característica mecánica de un asíncrono con la carga y la tensión: punto de funcionamiento, calado y arranque | `a` (carga, %), `b` (U, %) |
| `presion-neumatica-explorador` | Presión manométrica, absoluta y depresión; fuerza de las semiesferas de Magdeburgo | `a` (bar manométricos) |
| `caudal-cilindro-explorador` | Sección, presión necesaria, caudal Q = S·v y caudal atmosférico (ejemplo 1 del libro) | `a` (D, mm), `b` (v, m/s), `c` (kg) |
| `relacion-compresion-explorador` | Relación de compresión, volumen comprimido (Boyle) y número de etapas del compresor | `a` (bar) |
| `fuerza-cilindro-explorador` | Fuerza teórica y real (rozamiento 10 %, muelle 6 %) en simple efecto, avance y retroceso | `a` (D), `b` (d), `c` (bar) |
| `consumo-aire-explorador` | Volumen del cilindro, aire libre por ciclo y consumo en l/min | `a` (D, mm), `b` (carrera, mm) |
| `valvula-nomenclatura-explorador` | Nombre «vías/posiciones», símbolo, códigos ISO y CETOP y uso típico | `a` (vías), `b` (posiciones) |
| `logica-neumatica-explorador` | Válvula selectora (O) y de simultaneidad (Y) con dos pulsadores y tabla de verdad | `a` (0 O, 1 Y) |
| `ventosa-vacio-explorador` | Masa que sujeta una ventosa según la altitud, el vacío y la superficie | `a` (altitud, m) |
| `numeracion-neumatica-explorador` | Numeración 1.0, 1.1, 1.2…, 1.02 y 0.1 de los elementos de un circuito | `a` (grupo), `b` (segunda cifra) |
| `pascal-prensa-explorador` | Prensa hidráulica: presión, fuerza F₂ y número de emboladas con S₁, S₂, l₁, l₂ | `a` (F₁, N), `b` (S₁, cm²), `c` (S₂, cm²) |
| `continuidad-bernoulli-explorador` | Velocidades por continuidad y presión en el estrechamiento por Bernoulli, con aviso de cavitación | `a` (D₁, mm), `b` (D₂, mm), `c` (Q, l/min) |
| `viscosidad-fuerza-explorador` | Fuerza de rozamiento viscoso en un pistón (ejemplo 1): μ = ν·d, S y Δv/Δy | `a` (ν, cm²/s), `b` (v, m/min) |
| `energia-bernoulli-explorador` | Alturas geométrica, piezométrica y cinética y su porcentaje (ejemplo 5) | `a` (h, m), `b` (p, kp/cm²), `c` (v, m/s) |
| `potencia-hidraulica-explorador` | P = p·Q/(612η) en kW y p·Q/(450η) en CV, con la parte útil y las pérdidas | `a` (p), `b` (Q, l/min) |
| `perdida-carga-explorador` | Pérdida de carga h_f = ψ·(l/D)·v²/2g y caída de presión | `a` (ψ), `b` (l, m), `c` (v, m/s) |
| `bomba-caudal-explorador` | Caudal teórico y real de bombas de engranajes, paletas, pistones radiales y tornillo | `a` (0 a 3: tipo) |
| `cilindro-hidraulico-explorador` | Fuerza y velocidad de avance y retroceso de un cilindro de doble efecto con D, d, p y Q | `a` (D, mm), `b` (d, mm), `c` (p, bar) |
| `limitadora-explorador` | Presión de tarado frente a la que exige la carga: abre y descarga o no | `a` (tarado, bar), `b` (carga, bar) |
| `lazo-perturbacion-explorador` | Salida en lazo abierto y cerrado ante una perturbación; error = (r − d)/(1 + Kp·G) | `a` (r, %), `b` (d, %), `c` (Kp) |
| `segundo-orden-explorador` | Sistema de 2.º orden: M_P, t_p, t_r y t_s al variar ζ y ωn, con curva de respuesta | `a` (ζ), `b` (ωn, rad/s) |
| `bloques-explorador` | Serie, paralelo y anillo (directo o con H): FDT equivalente | `a` (G₁), `b` (G₂), `c` (H) |
| `routh-explorador` | Tabla de Routh de s⁴ + a₁s³ + a₂s² + a₃s + a₄ con cambios de signo y veredicto | `a`, `b`, `c` (a₁–a₃), `n` (a₄) |
| `pid-explorador` | Regulador P, PI, PD o PID sobre un proceso de dos retardos: error, sobreoscilación y establecimiento | `a` (Kp), `b` (ti, s), `c` (td, s) |
| `cuantizacion-ad-explorador` | Volumen (0–60 L) y bits (1–8) de un conversor A/D de 0–12 V: intervalo, código y resolución | `a` (volumen, L), `b` (bits) |
| `sensor-curva-explorador` | No linealidad e histéresis de un sensor lineal de 60 L: curvas de subida y bajada y lecturas | `a` (desviación, L), `b` (histéresis, L), `c` (volumen, L) |
| `sensor-proximidad-explorador` | Material y distancia: qué detector (inductivo, capacitivo, óptico, fotoeléctrico) lo detecta y por qué | `a` (índice del material), `b` (distancia, mm) |
| `potenciometro-divisor-explorador` | Reóstato de nivel en un depósito de Ø 3 m y 6 m: tensión (12 V) y volumen | `a` (altura, m) |
| `galga-deformacion-explorador` | σ, ε y R de una galga de 5000 Ω según fuerza, sección y factor de galga | `a` (F, N), `b` (S, mm²), `c` (K) |
| `encoder-rpm-explorador` | Frecuencia de impulsos N·n/60, grados por impulso y tensión del tacómetro | `a` (ranuras), `b` (rpm) |
| `termorresistencia-puente-explorador` | R_T = R₀(1 + αT) de platino, níquel o cobre y R₁ que equilibra el puente de Wheatstone | `a` (T, °C) |
| `puente-potenciometros-explorador` | Señal de error de un puente de potenciómetros lineales o circulares | `a` (X₁, %), `b` (X₂, %) |
| `operacional-inversor-explorador` | Inversor o comparador ideal: ganancia, salida y saturación a ±15 V | `a` (R₁, kΩ), `b` (R₂, kΩ), `c` (V₁, mV) |
| `binario-byte-explorador` | Byte con ocho bits activables: pesos, decimal y hexadecimal | `a` (valor) |
| `conversion-decimal-binario-explorador` | Divisiones y multiplicaciones por 2 de un número con parte entera y decimal | `a` (entera), `b` (centésimas) |
| `hex-bcd-explorador` | Un decimal en binario, octal, hexadecimal y BCD natural, Aiken y exceso 3 | `a` (número) |
| `logica-niveles-explorador` | Señal de tensión leída en lógica positiva o negativa | `a` (1 positiva) |
| `puerta-logica-explorador` | NOT/OR/AND (`a` = 0) o NOR/NAND/XOR (`a` = 1) con entradas pulsables y tabla de verdad | `a` (0 básicas, 1 invertidas) |
| `morgan-explorador` | Comprobación de las dos leyes de Morgan con sus tablas de verdad | `a` (1 o 2) |
| `formas-canonicas-explorador` | Tabla de tres variables editable: Σ de unos (minterms) y Π de ceros (maxterms) | `a` (índice del ejemplo) |
| `karnaugh-explorador` | Mapa de 2, 3 o 4 variables editable (0, 1, X): grupos y expresión mínima en suma de productos o producto de sumas | `a` (variables), `b` (índice del ejemplo) |
| `nand-nor-explorador` | Función de tres variables con solo NAND (suma de productos) o solo NOR (producto de sumas): inversores y puertas | `a` (índice del ejemplo) |
| `mux-decoder-explorador` | Multiplexor 8→1, decodificador 3→8, codificador con prioridad y comparador de 4 bits | `a` (0 a 3: circuito) |
| `sumador-binario-explorador` | Medio sumador, sumador completo y suma de 4 bits con acarreos | `a` (0 medio, 1 completo, 2 de 4 bits) |
| `secuencial-memoria-explorador` | Pulsador y reset: lámpara sin memoria frente a lámpara con memoria | — |
| `biestable-rs-explorador` | Biestable R-S con NOR: Set, Reset, mantenimiento, combinación prohibida e indeterminación | — |
| `biestable-jk-explorador` | J-K, T o D con flancos de reloj y el historial de Q | — |
| `registro-contador-explorador` | Registro de desplazamiento de 4 bits o contador binario de 4 bits con pulsos de reloj | `a` (0 registro, 1 contador) |
| `cableado-elementos-explorador` | Temporizador a la conexión o a la desconexión: cronograma según t y la duración de la orden | `a` (t, s), `b` (duración, s) |
| `grafo-bimodal-explorador` | Ecuaciones de los ejemplos 1 a 3 con pulsadores NA y NC: marcha, autorretención y paro | `a` (ejemplo) |
| `secuencia-reles-explorador` | Lámparas H₁ y H₂ de los ejemplos 5 y 6 con dos temporizadores y un cursor de tiempo | `a` (5 o 6), `b` (KT₁, s), `c` (KT₂, s) |
| `motor-enclavamiento-explorador` | Inversión de giro con KM₁ y KM₂ enclavados, paro SB₀ y relé térmico FT₁ | — |
| `matriz-operaciones-explorador` | Suma, resta y producto por un número de dos matrices 2×2 editables; elemento (1, 1) y suma de elementos del resultado | `initial`: `[a11, a12, a21, a22, b11, b12, b21, b22, k (−5–5), operación (0 suma, 1 resta, 2 k·A)]` |
| `matriz-producto-explorador` | A (m×n) por B (r×p) con dimensiones de 1 a 3: dice si A·B y B·A existen, y desglosa el elemento (i, j) como fila por columna | `initial`: `[m, n, r, p]` y luego 9 elementos de A y 9 de B por filas |
| `matriz-inversa-explorador` | Inversa 2×2 o 3×3 con determinante, comprobación A·A⁻¹ = I y aviso si es singular | `initial`: `[tamaño (2 o 3)]` y 9 elementos por filas |
| `matriz-potencias-explorador` | Aⁿ para cinco matrices 2×2 (giro de 90°, cizalla, todo unos, diagonal y Fibonacci) con la regla que se cumple | `initial`: `[matriz (0–4), n (0–12)]` |
| `grafo-caminos-explorador` | Matriz de adyacencia 4×4 editable (se pulsa cada casilla), grafo dibujado y Aᵏ con los caminos de longitud k entre dos nodos | `initial`: `[k (1–5), origen (0–3), destino (0–3)]` y 16 elementos de la matriz |
| `matriz-conmuta-explorador` | A·B y B·A de dos matrices 2×2 editables y si coinciden | `initial`: 4 elementos de A y 4 de B |
| `ecuacion-matricial-explorador` | Resuelve A·X = B o X·A = B con A⁻¹ por el lado correcto y comprueba la solución | `initial`: `[tipo (0: A·X, 1: X·A)]`, 4 elementos de A y 4 de B |
| `determinante-area-explorador` | Determinante 2×2 como área con signo del paralelogramo que forman las dos columnas | `initial`: `[a, b, c, d]` (−4 a 4) |
| `determinante-propiedades-explorador` | Aplica una operación (multiplicar fila, intercambiar, sumar múltiplo, trasponer, fila dependiente) a una 3×3 y compara el determinante con el que predice la propiedad | `initial`: `[operación (0–4), k (−3 a 3)]` y 9 elementos |
| `determinante-producto-explorador` | |A|, |B|, |A·B|, |A|·|B|, |k·A|, k²|A|, |A⁻¹| y 1/|A| con A y B de orden 2 | `initial`: 4 de A, 4 de B y k |
| `determinante-parametro-explorador` | Familias de matrices 3×3 con parámetro: determinante, rango y curva de |A(a)| | `initial`: `[familia (0–2), a (−5 a 5)]` |
| `adjunta-explorador` | Matriz adjunta, su traspuesta, A·Adj(A)ᵗ = |A|·I e inversa 2×2 o 3×3 | `initial`: `[tamaño (2 o 3)]` y 9 elementos |
| `rango-menores-explorador` | Rango de una 3×4 y cuántos menores de cada orden son no nulos | `initial`: 12 elementos por filas |
| `sistema-rouche-explorador` | Sistema 3×3 editable (o homogéneo): ecuaciones, matriz ampliada, rg(A), rg(A*), tipo y solución única o general | `initial`: 12 valores `[a, b, c, d]` por ecuación y un 13.º (1 = homogéneo) |
| `cramer-explorador` | Regla de Cramer 2×2 o 3×3: |A|, |Aₓ|, |A_y|, |A_z| y cada incógnita como cociente | `initial`: `[tamaño (2 o 3)]`, 9 coeficientes y 3 términos independientes |
| `sistema-familia-explorador` | Tres sistemas con parámetro a: |A|, tipo, solución y curva de |A(a)| | `initial`: `[sistema (0–2), a (−5 a 5)]` |
| `vectores-puntos-explorador` | Dos puntos A y B en 3D: vector AB, módulo y punto medio | `initial`: `[Ax, Ay, Az, Bx, By, Bz]` (−4 a 4) |
| `vectores-dependencia-explorador` | Tres vectores en filas: determinante, rango y si forman base o son coplanares | `initial`: 9 componentes por filas |
| `producto-escalar-3d-explorador` | u·v, módulos, ángulo, proyección y cosenos directores de u | `initial`: 6 componentes (u y v) |
| `producto-vectorial-explorador` | u×v con su dibujo, perpendicularidad y áreas del paralelogramo y del triángulo | `initial`: 6 componentes (u y v) |
| `producto-mixto-explorador` | Producto mixto, volumen del paralelepípedo y del tetraedro, coplanaridad | `initial`: 9 componentes por filas |
| `recta-espacio-explorador` | Recta P + t·v en 3D: paramétricas y punto para cada t | `initial`: `[Px,Py,Pz,vx,vy,vz,t]` |
| `plano-espacio-explorador` | Plano por tres puntos A, B, C: dibujo, normal y ecuación general | `initial`: 9 coordenadas (−5 a 5) |
| `posicion-rectas-explorador` | Dos rectas (P, u) y (Q, v): posición, rangos y punto de corte | `initial`: 12 valores (P, u, Q, v por filas) |
| `posicion-recta-plano-explorador` | Recta y plano: contenida, paralela o secante y punto de corte | `initial`: `[Px,Py,Pz,vx,vy,vz,A,B,C,D]` |
| `posicion-planos-explorador` | Tres planos: rangos, posición (punto, recta, prisma…) y posición de cada pareja | `initial`: 12 valores (A, B, C, D por plano) |
| `angulos-espacio-explorador` | Ángulo entre dos rectas, recta y plano o dos planos a partir de dos vectores | `initial`: `[modo (0–2)]` y 6 componentes |
| `proyeccion-simetrico-explorador` | Proyección ortogonal y simétrico de un punto respecto de un plano, una recta o un punto | `initial`: `[modo (0–2), P(3), …]` (plano: 4 valores; recta: A y v; punto: M) |
| `distancias-espacio-explorador` | Distancia exacta y aproximada punto-plano, punto-recta y entre dos rectas | `initial`: `[modo (0–2)]` y los datos de cada caso |
| `uno-infinito-explorador` | Límite de (1 + a/n)^(b·n) cuando n crece: valor con n = 10^k frente al límite e^(a·b) | `initial`: `[a (−3 a 3), b (1 a 3), k (0 a 7)]` |
| `lhopital-explorador` | Seis límites resueltos con L'Hôpital (0/0 y ∞/∞, con una o varias aplicaciones) y tabla numérica de comprobación | `initial`: `[caso (0–5), valores de la tabla (0–5)]` |
| `estudio-funcion-explorador` | Estudio completo en seis pasos (dominio, cortes, simetría, asíntotas, monotonía, curvatura) de siete funciones; cada paso añade sus puntos a la gráfica | `initial`: `[función (0–6), pasos mostrados (0–6)]` |
| `integral-polinomio-explorador` | f(x) = ax² + bx + c y su primitiva F(x) = (a/3)x³ + (b/2)x² + cx + C, con gráficas | `initial`: `[a, b, c (−3–3), C (−5–5)]` |
| `riemann-explorador` | Sumas de Riemann (izquierda, derecha, punto medio) de cuatro funciones frente a la integral exacta | `initial`: `[función 0–3, rectángulos 1–60, método 0–2]` |
| `barrow-explorador` | Regla de Barrow para f(x) = x² − 4: integral con signo frente a área geométrica | `initial`: `[a, b (−3–3)]` |
| `area-curvas-explorador` | Área entre y = m·x e y = x² (m³/6) | `initial`: `[m (1–5)]` |
| `volumen-revolucion-explorador` | Volumen de cono, paraboloide y esfera por discos | `initial`: `[perfil 0–2, b 1–5]` |
| `integral-metodos-explorador` | Nueve integrales resueltas paso a paso (potencia, exponencial, casi inmediata, cambio, partes, racional) con la comprobación F′ = f en un punto | `initial`: `[integral 0–8, pasos 0–3]` |
| `distribucion-discreta-explorador` | Juego con n monedas: tabla de ganancias y probabilidades, media, varianza y desviación típica | `initial`: `[monedas 1–6, premio por cara 0–5, precio 0–6]` |
| `chebychev-explorador` | B(20; 0,5): probabilidad exacta dentro de k desviaciones frente a la cota 1 − 1/k² | `initial`: `[k·10 (10–40)]` |
| `densidad-explorador` | Densidad f(x) = x/50 en [0, 10]: probabilidad de un intervalo como área y media | `initial`: `[c, d (0–10)]` |
| `intervalo-media-explorador` | Intervalo de confianza para la media: x̄ ± z·σ/√n según σ, n y nivel de confianza | `initial`: `[x̄, σ (1–30), índice de n (0–10), nivel 0–2]` |

## Respuesta como fracción

En un `fill_in_blank` cuya respuesta sea una fracción, usa `answerFormat: "fraction"`: el alumno ve dos casillas (numerador sobre la raya, denominador debajo) y `correctAnswers` se sigue escribiendo como `"n/d"` (por ejemplo `["3/4"]`). No pidas «el numerador» ni expliques el formato en el enunciado.

## Qué se conserva de las escenas anteriores

Las lecciones con módulos de escenario (`tienda-ciclista`, `bloques-numericos`, `mul-div-naturales`, `jerarquia-operaciones`…) siguen siendo válidas para **manipulación** (explorar, arrastrar, comprobar). Regla práctica: la teoría nueva va en `slide`; lo que el alumno **toca** va en `explore` / `predict` / `interactive_tool`.

## Ayuda del tutor en los ejercicios (`help`)

Los pasos de práctica (`predict`, `fill_in_blank`…) aceptan `help: HelpBranch[]`: un árbol de preguntas del alumno («¿Qué operación hago?», «Quiero saber si mi resultado es razonable»…) con respuestas que **no repiten la diapositiva**: otro ángulo, una estimación, un caso más sencillo, una pregunta guiada. Cada rama puede abrir `branches` más concretas. Sin `help`, el tutor solo separa «lo que te dan» de «lo que te piden». Nunca des el resultado en una rama; la solución sale tras responder (`explanation`).
