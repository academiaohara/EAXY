# Ilustraciones de lecciones (PNG)

Guía para generar y colocar imágenes de escenarios interactivos (1.º ESO, estilo libro de texto).

## Estilo visual (obligatorio)

- **Look:** dibujo didáctico de libro de matemáticas de la ESO (editorial tipo Santillana/Anaya): contornos finos, colores planos con sombreado suave, icono limpio.
- **No** fotorealismo, no stock photo, no gradientes dramáticos, no 3D de lujo.
- **Referencia en repo:** `public/lesson/mul-div-naturales/ticket.png` (entrada inclinada, naranja + azul marino).
- **Fondo:** transparente (PNG con canal alpha). Pedir explícitamente *transparent background* al generar.
- **Texto en la imagen:** evitar salvo que el diseño lo exija (p. ej. la palabra TICKET en la entrada de referencia). Sin marcas comerciales, precios ni números del ejercicio en el PNG (los precios van en la UI).
- **Cantidades:** no dibujar en la ilustración el número que el alumno debe calcular (p. ej. caja de bombones **vacía o con 2–3 piezas decorativas**; el total va en badges de la app).

### Bloque de prompt (pegar al final en ChatGPT u otro generador)

```text
Ilustración didáctica para libro de matemáticas de 1º ESO: dibujo digital limpio tipo editorial escolar, contornos finos, colores planos con sombra suave, sin fotorealismo. Fondo completamente transparente. Exportar PNG con canal alpha. Objeto centrado con margen ~15–20 % en el lienzo. Sin marcas ni texto comercial.
```

## Cómo se muestran (diapositivas `slide`)

- Las ilustraciones (`story`, `figure`) se pintan **directamente sobre la pizarra**, sin tarjeta: el PNG debe tener fondo transparente real, **sin halos, brillos ni sombras semitransparentes** alrededor, y recortado al contenido. Peso ≤ ~800 KB, lado mayor ≤ 1000 px.
- `story`: dibujo pequeño al lado del enunciado (máx. ~150 px de ancho en pantalla). `figure`: dibujo principal en la columna visual (máx. ~560 px).
- Si el PNG no existe todavía, la diapositiva sigue completa (en desarrollo se ve un aviso con el nombre del archivo que falta).

## Cómo pedir la imagen a la IA

1. Pega el **bloque de estilo** (abajo) y, después, el **prompt concreto** de la tabla.
2. Formato **1:1**, 1024×1024 (o el lienzo indicado). Pide siempre «fondo transparente»; si el generador no da canal alfa, genera sobre blanco liso y quita el fondo antes de guardar.
3. Un solo sujeto centrado, margen 10–15 %. **Sin texto ni cifras** dentro de la imagen.
4. Guarda como PNG en `Assets/` y avísame: la copio a `public/lesson/...` con el nombre exacto de la tabla (`next/image` no hace falta; se usa `<img>`). Peso objetivo ≤ 400 KB (exporta a 768×768 si pesa más).

```text
Ilustración didáctica para libro de Matemáticas de 1º ESO, estilo editorial escolar (Anaya/Santillana): dibujo digital limpio, contorno fino marrón oscuro, colores planos con una sola capa de sombreado suave, personajes expresivos con proporciones ligeramente caricaturescas, paleta cálida y equilibrada. Sin fotorrealismo, sin 3D, sin degradados dramáticos, sin texto, sin números, sin marcas comerciales. Fondo completamente transparente (PNG con canal alfa). Un solo conjunto centrado en el lienzo, con margen del 10–15 %.
```

## Tema 1 · Números naturales — ilustraciones

**Necesarias ya** (están enlazadas en las diapositivas):

| Archivo (`public/lesson/…`) | Dónde sale | Lienzo | Prompt (pegar tras el bloque de estilo) |
|---|---|---|---|
| `numeracion/origen/pastor-cabras.png` | L1 · «Los números nacieron para contar» (`story`, ~150 px) | 1024×1024 | Pastor prehistórico de pelo y barba alborotados, con túnica de piel de animal con manchas, sonriendo tranquilo. En una mano un cayado con muescas talladas bien visibles; en la otra un collar de semillas. A sus pies, cuatro cabras blancas con cuernos pequeños. Cuerpo entero. |
| `numeracion/origen/casa-en-venta.png` | L1 · «Redondear» (`story`, ~150 px) | 1024×1024 | Casa de campo de una planta con porche de columnas, tejado de teja roja, pequeño jardín con arbusto. En primer plano, clavado en el césped, un cartel de «se vende» **completamente en blanco** (sin texto ni cifras). Vista tres cuartos, luz de día. |
| `mul-div-naturales/fontanero.png` | L3 · «La distributiva como atajo» (`story`, ~150 px) | 1024×1024 | Fontanero joven con mono azul y gorra, arrodillado en el suelo, mirando con gesto concentrado el sifón de un lavabo blanco de pie mientras aprieta una tuerca con una llave inglesa. Caja de herramientas abierta a su lado. |

**Reservadas** para los ejercicios del tema (siguiente fase; mismas reglas de estilo):

| Archivo | Ejercicio del libro | Prompt |
|---|---|---|
| `ejercicios/hortelano-mercado.png` | Hortelano que vende tomates y frambuesas | Hortelano de camisa de cuadros y gorra de paja, sonriendo, junto a un carro con dos cajas de madera: una de tomates y otra de frambuesas. Sin precios ni carteles con texto. |
| `ejercicios/autobus-excursion.png` | Autobuses de excursión (resto) | Autobús escolar amarillo en vista tres cuartos y, delante, un grupo de cinco estudiantes con mochila saludando. Sin matrícula legible. |
| `ejercicios/granja-vacas-caballos.png` | Patas de vacas y caballos | Granja con establo de madera; en el prado, dos vacas manchadas y dos caballos marrones, bien separados y completos (se ven las cuatro patas de cada uno). |
| `ejercicios/ocas-bascula.png` | Tres ocas de distinto tamaño | Tres ocas blancas de distinto tamaño (pequeña, mediana, grande) en fila sobre una báscula plana de suelo con pantalla en blanco. |
| `ejercicios/colmenas-apicultor.png` | Apicultor y colmenas | Apicultor con traje blanco y careta de rejilla levantada, sonriendo, junto a tres colmenas de madera apiladas; un tarro de miel en primer plano. |
| `ejercicios/balanza-animales.png` | Elefante pequeño en la balanza | Balanza de dos platillos en equilibrio: en uno, un elefante grande y un elefante pequeño; en el otro, dos hipopótamos. Sin cifras. |

## Tema 3 · Divisibilidad

Sin ilustraciones: todo lo que ayuda a entender (grupos, rectángulos, saltos, criba, cintas…) lo cubren las animaciones. Regla del tema: solo se añade una imagen si explica algo; nunca decorativa.

## Tema 4 · Números enteros

Sin ilustraciones: ascensor, recta, fichas, facturas y paréntesis ya los cubren las animaciones. Los enunciados `story` quedan como texto.

## Tema 5 · Números decimales

Solo dos ilustraciones, las que anclan una cantidad al mundo real; el resto (rectas, tablas, columnas, divisiones) lo dibujan las animaciones. Ya están enlazadas en las diapositivas (hasta que llegue el PNG, la diapositiva se ve completa solo con el texto).

| Archivo (`public/lesson/decimales/…`) | Dónde sale | Lienzo | Prompt (pegar tras el bloque de estilo) |
|---|---|---|---|
| `bascula.png` | L1 · «Décimas, centésimas, milésimas» (`story`, ~150 px) | 1024×1024 | Báscula de cocina digital cuadrada, de plástico blanco con plataforma de acero, vista tres cuartos. Sobre la plataforma, un cuenco de acero con tres tomates rojos. La pantalla de la báscula **apagada y en blanco** (sin cifras ni texto). |
| `rollo-tela.png` | L2 · «Multiplicar: sin comas y se cuentan los decimales» (`story`, ~150 px) | 1024×1024 | Rollo de tela estampada de cuadros azules y blancos sobre un tubo de cartón, con un metro de costura amarillo medio desenrollado por delante. En el metro, **solo las marcas** (rayitas), **sin números**. Vista tres cuartos. |

Los tres temas anteriores sin ilustración (divisibilidad, enteros…) se mantienen igual; aquí se añaden solo porque la báscula (milésimas = gramos) y la tela (precio por metro) hacen concreta una cantidad con decimales.

## Flujo en el repositorio

1. Entrega del diseñador o generación → carpeta **`Assets/`** en la raíz (convención del equipo).
2. Copiar a **`public/lesson/<slug-leccion>/`** con el nombre exacto que usa el código (`next/image`, rutas `/lesson/...`).
3. Registrar la ruta en el módulo stage (`ASSETS` o constantes en `src/components/lesson/stage/modules/...`).
4. Comprobar en viewport ≥768px sobre tema `board` u oscuro: contornos legibles y sin halo blanco/negro feo.

## Lección «Multiplicación y división» (`mul-div-naturales`)

| Archivo | Uso en UI | Lienzo PNG | Contenido ~en lienzo | Máx. en pantalla |
|---------|-----------|------------|----------------------|------------------|
| `ticket.png` | Entradas apiladas | 512×512 | ~380×320, ratio 6:5, ~15° inclinación | 96×80 px |
| `bombones.png` | Montón / restos | 640×512 o 512×512 | ~480×390, ratio 4:3 | 160×130 px |
| `cajabombones.png` | Cajas iguales, asociativa | 512×512 | ~400×340; legible a 72 px ancho | 110×95 px |
| `bocadillo.png` | Menú distributiva | 256×256 | ~200×200, icono | 44×44 px |
| `botella.png` | Menú distributiva (bebida) | 256×256 | ~200×200, icono | 44×44 px |
| `huevo.png` | Pareja en asociativa | 128×128 | ~96×64, un huevo | ~16×20 px (×2) |

**Prompts concretos (español):**

- **ticket:** entrada cine, muesca y perforación, franja naranja con código de barras esquemático, sin cifras del ejercicio.
- **bombones:** 4–6 bombones en montón compacto, vista 3/4, no caja llena.
- **cajabombones:** caja cartón abierta 3/4, vacía o 2–3 bombones simples.
- **bocadillo:** baguette partido, jamón/queso, vista lateral, icono cuadrado.
- **botella:** tetrabrik o botellín genérico, sin marca.
- **huevo:** un huevo marrón, vista lateral.

Código: `src/components/lesson/stage/modules/mul-div-naturales/`.

## Otras lecciones con PNG

| Carpeta pública | Origen típico |
|-----------------|---------------|
| `public/lesson/tienda-ciclista/` | `Assets/bici.png`, casco, maillot, culotte |
| `public/lesson/numeracion/historia/` | `Assets/Egipcios.png`, romanos, primitivo |

Mismo estilo ESO y fondo transparente al ampliar o sustituir assets.

## Checklist antes de merge

- [ ] PNG en `public/lesson/...` con nombre estable
- [ ] Probado en la escena real (no solo en visor de archivos)
- [ ] Sin spoiler numérico en la imagen en pasos `predict`
- [ ] Tamaño razonable (optimizar si un PNG supera ~1,5 MB sin motivo)
