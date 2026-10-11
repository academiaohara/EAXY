# UI, Tailwind v4 y shadcn/ui

## Filosofía visual

- Fondo tipo papel (`bg-paper`), texto `text-ink`, acento **cobalto** (`primary`, `text-cobalt`, etc.).
- Tipografía: **Plus Jakarta Sans** (`font-display`) para títulos; **Inter** (`font-sans`) cuerpo; mono para código/números.
- Espaciado generoso, tarjetas elevadas (`paper-raised`), bordes suaves (tokens `--radius-*` en `globals.css`).

Variables y tema: `src/app/globals.css` (`@theme inline`, `:root`).

## Tailwind CSS v4

- Configuración principal en **`src/app/globals.css`**, no en `tailwind.config.js` clásico.
- Imports: `tailwindcss`, `tw-animate-css`, `shadcn/tailwind.css`.
- Usa clases semánticas del tema: `bg-background`, `text-muted-foreground`, `border-border`, `bg-card`, etc.
- Colores de marca: `bg-paper`, `text-ink`, `text-ink-muted`, `bg-cobalt`, `bg-cobalt-tint`.

### Solo escritorio (importante)

- **No** uses `max-sm:` / `max-md:` para adaptar a móvil.
- **No** ocultes la navegación principal con `hidden md:flex` (la app no se sirve bajo `md`).
- **Sí** puedes usar `sm:`, `lg:`, `xl:` para refinar columnas y tipografía en pantallas de escritorio.

## shadcn/ui

- Config: `components.json` — estilo **`base-nova`**, **`rsc: true`**, iconos Lucide.
- Componentes instalados en `src/components/ui/` (Button, Card, Input, Dialog, Tabs, Table, Badge, …).
- Añadir componentes nuevos con el CLI de shadcn **solo si el usuario lo pide** o la tarea lo requiere; respeta `components.json`.

### Patrones habituales

```tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";

<button className={cn("...", className)} />
```

- Variantes de botón: props del componente (`variant`, `size`), no reinventar clases base.
- Estados disabled/loading: props nativas o `aria-busy`.

## Iconos

```tsx
import { ArrowRightIcon } from "lucide-react";
<ArrowRightIcon className="size-4" aria-hidden />
```

Usa `aria-hidden` en iconos decorativos; texto accesible en botones.

## Contenido matemático

- KaTeX importado en `globals.css`; componentes que renderizan fórmulas deben seguir patrones existentes en lecciones/ejercicios (busca `katex` en el repo).

## Layouts de página

Patrón frecuente:

```tsx
<div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8 px-4 py-8 sm:px-6 sm:py-10">
```

Ajusta `max-w-*` según densidad (dashboard vs lección).

## Accesibilidad mínima

- Un `<h1>` por vista principal.
- Labels en formularios (`Label` + `Input`).
- Focus visible (shadcn ya aporta estilos; no quitar outline sin sustituto).
- `data-testid` en enlaces/acciones críticos cuando ya exista convención en la página hermana (ver aprender/practicar).

## Qué no hacer

- Introducir otra librería de componentes (MUI, Chakra) sin acuerdo.
- CSS modules o styled-components para casos que Tailwind + shadcn cubren.
- Hardcodear hex fuera de tokens salvo excepciones locales documentadas.
