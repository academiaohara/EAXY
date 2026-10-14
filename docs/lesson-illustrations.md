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
