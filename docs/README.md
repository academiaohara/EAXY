# Documentación

Plan técnico de Eaxy — plataforma de aprendizaje adaptativo de matemáticas.

## Índice

| Documento                                    | Contenido                                      |
| -------------------------------------------- | ---------------------------------------------- |
| [product.md](./product.md)                   | Visión, modos de uso, personas, principios     |
| [architecture.md](./architecture.md)         | Capas, flujos, estructura de carpetas, testing |
| [database.md](./database.md)                 | Modelo de datos PostgreSQL                     |
| [learning-model.md](./learning-model.md)     | Conceptos, mastery, historial de intentos      |
| [exercises.md](./exercises.md)               | Exercise Engine y tipos de ejercicio           |
| [classrooms.md](./classrooms.md)             | Aulas, asignaciones, vistas profesor/alumno    |
| [recommendations.md](./recommendations.md)   | Motor de recomendaciones explicables           |
| [assignment-rules.md](./assignment-rules.md) | Reglas de asignación automática                |
| [live-sessions.md](./live-sessions.md)       | Sesiones en vivo (móvil y manual)              |
| [security.md](./security.md)                 | Auth, RLS, permisos                            |
| [roadmap.md](./roadmap.md)                   | Fases de implementación                        |

## Orden de lectura sugerido

1. `product.md` — contexto de negocio
2. `architecture.md` — panorama técnico
3. `learning-model.md` + `database.md` — núcleo del dominio
4. Resto según el área a implementar

## Estado

Documentación de diseño (Paso 1). Decisiones de producto y arquitectura **aprobadas** (ver tablas en `architecture.md`). **Sin implementación todavía.**

### Decisiones clave registradas

- Mastery: media ponderada con decaimiento
- Menores: cuentas provisionadas por profesor (username+contraseña), sin datos de contacto
- Google OAuth: adultos autoregistrados; no sustituye acceso de alumno en aula
- Auth adultos: registro público con email
- Navegación libre con bloqueo opcional por unidad
- Supabase: local + remoto dev (prod separado pre-lanzamiento)
