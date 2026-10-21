# Pack Claude — calculadora Casio fx-991 (EAXY)

Copia de contexto para pulir la **pantalla LCD** y las escenas «calculadora» del tema 2 (potencias y raíz cuadrada). No es un proyecto ejecutable: los paths reales están bajo `src/`.

## Qué subir a Claude

Comprime esta carpeta o adjunta estos archivos:

| Archivo | Qué es |
|---------|--------|
| `casio-fx991.tsx` | SVG del cuerpo Casio + teclado; resalta tecla según `keySequence` y fase. Pantalla = slot `screen`. |
| `potencias-shared.tsx` | `usePotenciasPhases` (autoplay + controles en el pie), `SceneShell`, `fmt`, colores. |
| `PotenciasCalculadoraScene.tsx` | Escena **potencia** en calculadora (referencia de layout y chips de teclas). |
| `RaicesCalculadoraCasio.tsx` | Escena **√** + LCD (`SqrtCasioScreen`, vinculum, placeholder). |
| `raiz-cuadrada-calculadora-step.ts` | Paso `narrate` del catálogo (radicando 144). |

## Rutas en el repo (fuente de verdad)

- `src/components/lesson/stage/modules/potencias/casio-fx991.tsx`
- `src/components/lesson/stage/modules/potencias/PotenciasModule.tsx` (función `Calculadora`)
- `src/components/lesson/stage/modules/raices-cuadradas/RaicesCuadradasModule.tsx` (`RaizCalculadora`, `SqrtCasioScreen`)
- `src/data/lessons/potencias-base-exponente.ts` — paso `calculadora-potencia`
- `src/data/lessons/raiz-cuadrada-naturales.ts` — paso `raiz-calculadora-narrate`

## Comportamiento esperado

1. **Potencias:** secuencia base → tecla `pow` → exponente → `=`. Pantalla: base, caja de exponente, resultado abajo a la derecha.
2. **Raíz:** secuencia `sqrt` → un paso por **dígito** del radicando → `=`. Pantalla: radical con **vinculum continuo**, cuadrado placeholder bajo la barra, dígitos alineados; resultado en la segunda línea LCD.

## Colores

- Potencias: ámbar (`boardSemanticColors.amber`) en tecla activa.
- Raíces: mismo ámbar para raíz; turquesa para radicando en fórmulas LaTeX (`\\color{…}` con **doble barra** en strings JS).

## Prompt sugerido para Claude

> Mejora el render SVG de `SqrtCasioScreen` / `CASIO_LCD` para que el radical se vea como en una fx-991 real: vinculum unido al gancho, sin solapar dígitos, placeholder alineado. Mantén la API de `CasioFx991` (`phase`, `keySequence`, `screen`). No cambies el catálogo ni los slugs.
