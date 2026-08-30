# Eaxy

Plataforma interactiva de aprendizaje de matemáticas, inspirada en Brilliant.org. Aprende haciendo: lecciones cortas, manipulativos visuales, feedback inmediato y pistas progresivas.

## Requisitos

- Node.js 20+
- npm

## Instalación

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en el navegador.

## Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción |
| `npm run start` | Servidor de producción |
| `npm run lint` | ESLint |
| `npm run validate:lessons` | Valida el JSON de lecciones con Zod |

## Cómo añadir una lección nueva

1. Crea un archivo JSON en `content/math/`, por ejemplo `mi-leccion.json`.
2. Sigue el esquema definido en `src/lib/lesson-schema.ts` (ver también `docs/architecture.md`).
3. Añade la lección al índice en `content/math/index.json`.
4. Valida con `npm run validate:lessons`.
5. La lección estará disponible en `/leccion/mi-leccion`.

### Estructura mínima de una lección

```json
{
  "id": "mi-leccion",
  "slug": "mi-leccion",
  "title": "Título de la lección",
  "description": "Descripción breve",
  "subject": "math",
  "topic": "tema",
  "estimatedMinutes": 10,
  "steps": [
    {
      "id": "paso-1",
      "type": "intro",
      "title": "Introducción",
      "content": "Texto con fórmulas inline: $\\frac{1}{2}$",
      "requiresCheck": false
    }
  ]
}
```

### Tipos de paso

- `intro` — Presentación sin comprobación
- `interaction` — Incluye un widget interactivo
- `explanation` — Explicación sin comprobación

### Widgets disponibles

- `tap_select` — Elegir opción correcta
- `slider_explore` — Explorar valores con visualización en tiempo real
- `fraction_bar` — Manipulativo de fracciones (sombrear partes)

## Probar la lección demo

1. Ejecuta `npm run dev`.
2. En la página de inicio, haz clic en **Introducción a las fracciones**.
3. Recorre los 7 pasos: intro → tap_select → slider_explore → fraction_bar → explicación → tap_select → reto final.
4. El progreso se guarda en `localStorage`.

## Estructura del proyecto

```
├── content/math/          # Lecciones en JSON
├── docs/
│   ├── architecture.md    # Arquitectura técnica
│   ├── vision.md          # Visión del producto
│   └── notes/             # Apuntes pedagógicos (contexto)
├── scripts/
│   └── validate-lessons.ts
├── src/
│   ├── app/               # Next.js App Router
│   ├── components/        # UI, lecciones y widgets
│   └── lib/               # Motor, esquemas, utilidades
├── AGENTS.md
└── README.md
```

## Documentación

- [Arquitectura](docs/architecture.md)
- [Visión del producto](docs/vision.md)
- [AGENTS.md](AGENTS.md) — Guía para agentes de Cursor
