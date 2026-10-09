# Diseño: ejercicios externos con recursos multimedia

Fecha: 2026-10-09

## Objetivo

Retirar los ejercicios externos actualmente cargados en el catálogo curricular sin eliminar su diseño de producto. La interfaz debe quedar preparada para una futura colección más pequeña de ejercicios, cada uno con enunciado, imagen de una resolución y vídeo de YouTube.

Este cambio no modifica las interacciones que forman parte de las lecciones teóricas ni el motor de ejercicios usado por otras capacidades del producto.

## Alcance

Incluido:

- Mantener la sección `TopicExercisesSection`, su listado de tarjetas y el diálogo.
- Ampliar el modelo de ejercicio externo para admitir `solutionImageUrl` y hacer opcionales `solutionText` y `solutionVideoUrl`.
- Mostrar de forma condicional la imagen, el texto y el vídeo disponibles.
- Normalizar enlaces de YouTube normales y enlaces `embed` a una URL embebible segura para el iframe.
- Retirar los datos de ejercicios externos del catálogo curricular actual.
- Mantener las rutas y componentes preparados para reintroducir ejercicios más adelante.
- Actualizar pruebas unitarias y E2E afectadas.

Fuera de alcance:

- Crear ejercicios nuevos.
- Modificar las lecciones interactivas o sus pasos evaluables.
- Eliminar el motor general de ejercicios, tablas de Supabase o lógica de aulas.
- Integrar GeoGebra, Manim u otras dependencias.
- Cambiar la regla de escritorio del producto.

## Modelo de datos

El tipo de contenido externo evolucionará a:

```ts
type CurriculumTopicExercise = {
  id: string;
  title: string;
  statement: string;
  solutionImageUrl?: string;
  solutionVideoUrl?: string;
  solutionText?: string;
};
```

El catálogo puede tener ejercicios vacíos durante esta fase. Las capas de consulta convertirán el modelo de contenido al resumen de UI sin inventar URLs ni valores por defecto.

## Interfaz y flujo

La sección de ejercicios seguirá oculta cuando un tema no tenga ejercicios, por lo que retirar los datos no deja tarjetas ficticias ni contenido de demostración.

Cuando exista un ejercicio:

1. La tarjeta abre el diálogo actual.
2. El enunciado se renderiza con el soporte LaTeX existente.
3. La imagen de resolución aparece solo si existe `solutionImageUrl`, con texto alternativo derivado del título.
4. El vídeo aparece solo si existe `solutionVideoUrl`; los enlaces de YouTube se convierten a una URL embebible.
5. La resolución textual aparece solo si existe `solutionText`.
6. Si falta alguno de los tres recursos, el diálogo continúa siendo válido y no muestra controles vacíos.

Las imágenes externas usarán una etiqueta `img` con `alt`, `loading="lazy"` y un contenedor con tamaño limitado. No se añadirá una lista global de dominios de Next Image para URLs externas arbitrarias.

## Seguridad y compatibilidad

- Solo se aceptarán URLs `http` y `https` para recursos externos.
- La normalización de YouTube rechazará protocolos no web y mantendrá el comportamiento actual para URLs `embed`.
- El iframe conservará `title`, `allowFullScreen` y los permisos mínimos ya usados.
- Las URLs de imagen se tratarán como recursos remotos no confiables: se mostrarán, pero no se ejecutarán como HTML.
- El cambio será compatible con cualquier ejercicio existente que aún use `solutionText` y `solutionVideoUrl`.

## Archivos previstos

- `src/content/types.ts`
- `src/lib/curriculum/types.ts`
- `src/lib/learning/resolve-practice-path.ts`
- `src/components/learning/topic-exercises-section.tsx`
- `src/data/topic-exercises/*` y `src/content/curriculum.ts` para retirar la carga actual
- pruebas relacionadas con catálogo, aprendizaje y ejercicios externos

## Verificación

Se ejecutarán:

- `npm run lint`
- `npm run test:run`
- `npm run test:e2e`
- `npm run build`

También se comprobará que:

- los temas sin ejercicios no muestran la sección;
- la navegación principal de lecciones sigue funcionando;
- la vista de un ejercicio con recursos opcionales no rompe el diálogo;
- no se añaden lecciones ni contenido académico inventado.
