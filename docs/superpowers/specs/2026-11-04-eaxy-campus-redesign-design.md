# Rediseño integral de Eaxy — «Campus contemporáneo»

## Intención

Rediseñar la experiencia de Eaxy para que se perciba como un campus educativo contemporáneo: cálido, claro, reconocible y coherente entre la portada pública y la aplicación. El rediseño debe ayudar a un estudiante a entender rápidamente dónde está, qué puede estudiar y cuál es su siguiente paso.

La interfaz actual tiene una base funcional sólida, pero usa dos lenguajes cercanos aunque no plenamente integrados: una portada de marketing y una aplicación organizada principalmente por asignaturas. El nuevo sistema unifica ambos sin alterar el contenido curricular ni el reproductor de las lecciones.

## Objetivos

- Dar a la portada una jerarquía más directa: propuesta de valor, acceso al curso y continuación del progreso.
- Crear una navegación global coherente para las zonas públicas y autenticadas.
- Hacer que cada asignatura sea reconocible mediante color, icono y tono propios dentro de un sistema común.
- Nombrar los cursos por nivel: `1 ESO`, `2 ESO`, `3 ESO`, `4 ESO`, `1 Bachillerato` y `2 Bachillerato`.
- Evitar repetir la asignatura en el nombre de cada curso cuando el contexto ya la muestra.
- Permitir que un estudiante retome su actividad con el mínimo número de decisiones.
- Unificar visualmente Inicio, Aprender, materias, niveles, cursos, Practicar, Progreso, Perfil y autenticación.
- Mantener accesibilidad, claridad de lectura y navegación por teclado.

## No objetivos

- No rediseñar el reproductor de lecciones interactivas ni sus pasos, tutor, herramientas, animaciones o ejercicios internos.
- No reactivar ni rediseñar la zona docente `/aulas`, actualmente desactivada.
- No rediseñar la página interna de muestra `/tutor`.
- No modificar el currículo, las lecciones, el cálculo de dominio ni el motor de recomendaciones.
- No introducir una experiencia móvil: Eaxy sigue siendo una aplicación solo para escritorio con bloqueo por debajo de 768 px.
- No añadir nuevas integraciones, inteligencia artificial, persistencia o capacidades de backend.
- No cambiar las rutas canónicas existentes de cursos y lecciones salvo la nueva entrada agrupada por nivel que sea necesaria para resolver variantes.

## Antiobjetivos

El resultado no debe parecer una plantilla SaaS genérica, una plataforma infantil, un escaparate excesivamente decorativo ni un laboratorio oscuro. Tampoco debe sacrificar densidad útil por grandes espacios vacíos, esconder materias detrás de menús ambiguos o convertir cada página en una sucesión repetitiva de tarjetas promocionales.

## Restricciones del proyecto

- Next.js 16, React 19 y Tailwind CSS 4 ya forman la base técnica.
- Deben reutilizarse los componentes y patrones actuales cuando encajen, evitando nuevas dependencias salvo necesidad demostrada.
- `DesktopOnlyGate` y la política de solo escritorio se mantienen.
- Las rutas de lección ocultan el chrome global; ese comportamiento se conserva.
- Los datos pueden venir del catálogo embebido o de Supabase y el diseño debe funcionar en ambos modos.
- Los estados sin cuenta, con cuenta, sin progreso, con progreso, disponible y próximamente deben seguir siendo comprensibles.
- No se inventarán estadísticas, testimonios o capacidades del producto.

## Enfoques considerados

### 1. Renovación superficial

Cambiar portada, cabecera y tarjetas conservando casi toda la estructura y los estilos internos actuales.

Ventaja: menor coste y riesgo. Desventaja: la transición entre portada, catálogo y áreas personales seguiría sintiéndose fragmentada.

### 2. Sistema visual completo — seleccionado

Definir un sistema visual compartido y aplicarlo a la portada, navegación, catálogos y áreas de aplicación, dejando intacto el reproductor de lecciones.

Ventaja: coherencia real sin interferir con la parte pedagógica más especializada. Desventaja: requiere revisar varios componentes y estados compartidos.

### 3. Reestructuración funcional profunda

Además del rediseño, alterar la arquitectura de información, el currículo y los recorridos de aprendizaje.

Ventaja: libertad total. Desventaja: amplía el alcance, cambia hábitos y mezcla un objetivo visual con decisiones pedagógicas no solicitadas.

## Dirección visual seleccionada

La dirección es «Campus contemporáneo»:

- Fondo marfil suave en lugar de blanco clínico.
- Tinta verde bosque como color estructural principal.
- Amarillo solar y coral como acentos de energía y acción.
- Colores específicos por asignatura para orientación, no como grandes degradados dominantes.
- Formas redondeadas pero contenidas, con radios consistentes y sombras suaves.
- Tipografía de interfaz muy legible, con titulares compactos y expresivos.
- Ilustración abstracta mediante formas geométricas sencillas y recursos curriculares existentes; no fotografías genéricas.
- Animaciones breves y funcionales, siempre respetando `prefers-reduced-motion`.

La personalidad debe ser optimista y madura: apropiada para alumnado desde 1 ESO hasta 2 Bachillerato.

## Sistema visual

### Tokens principales

El sistema sustituirá la dependencia casi exclusiva del cobalto por una paleta semántica:

- `ink`: verde bosque oscuro para texto principal y navegación.
- `paper`: marfil cálido para el fondo general.
- `surface`: blanco cálido para tarjetas y paneles.
- `sun`: amarillo para llamadas a la acción y señales positivas.
- `coral`: acento secundario y progreso activo.
- `muted`: verde grisáceo para texto secundario.
- `border`: borde cálido de bajo contraste.

Los tokens actuales que consumen lecciones no se eliminarán de forma incompatible. Los nuevos tokens se introducirán mediante variables compartidas y se mapearán de forma segura a componentes existentes.

### Temas por asignatura

- Matemáticas: violeta.
- Física y Química: turquesa.
- Tecnología: coral/naranja.
- Dibujo Técnico: azul.

Cada tema aporta un color de icono, borde activo, pequeña superficie tintada y detalles de progreso. El color no será el único indicador: siempre irá acompañado del nombre e icono de la asignatura.

### Componentes compartidos

- Botones primarios oscuros o amarillos según contraste y contexto.
- Botones secundarios de superficie clara con borde.
- Tarjetas con radio uniforme, borde sutil, sombra ligera y elevación mínima al pasar el cursor.
- Etiquetas de nivel en formato cápsula.
- Barras de progreso con texto explícito.
- Estados de foco visibles y consistentes.
- Jerarquía tipográfica común para cejas, títulos, texto descriptivo y metadatos.

## Arquitectura de navegación

### Portada pública

La cabecera muestra:

- Logo Eaxy con enlace a Inicio.
- `Inicio`, `Aprender`, `Practicar` y `Mi progreso`.
- Acción de sesión: `Entrar` o identidad del usuario.
- CTA `Empezar gratis` para visitantes.

Las asignaturas no necesitan ocupar permanentemente toda la barra. Se presentan de forma prominente en la portada y en Aprender, mientras la navegación superior mantiene los destinos principales.

### Aplicación

La aplicación usa la misma cabecera y lenguaje visual. El destino activo se indica por forma, color y `aria-current`. La información de cuenta queda en el extremo derecho. El aviso de progreso local para invitados se mantiene, rediseñado como una franja compacta integrada.

### Migas de pan

Las rutas profundas conservan migas de pan compactas. Los nombres de curso dentro de una asignatura usan solo el nivel; las modalidades aparecen únicamente cuando son necesarias para distinguir opciones.

## Nomenclatura y agrupación de cursos

### Regla de presentación

En tarjetas, listas y accesos rápidos dentro de una asignatura se usan estos nombres:

- `1 ESO`
- `2 ESO`
- `3 ESO`
- `4 ESO`
- `1 Bachillerato`
- `2 Bachillerato`

No se muestra el prefijo de asignatura, el ordinal `º` ni nombres como `Matemáticas I`, `Tecnología e Ingeniería II` o `Dibujo Técnico I` en el primer nivel de elección.

### Variantes dentro de un mismo nivel

Cuando una asignatura contiene más de un curso para el mismo nivel, la tarjeta del nivel actúa como agrupador:

1. El estudiante elige el nivel, por ejemplo `4 ESO`.
2. Si existe un solo curso, se entra directamente en él.
3. Si existen varias modalidades, la misma página de asignatura despliega una selección breve dentro del contexto del nivel, sin crear una nueva ruta ni alterar las URL canónicas de los cursos.
4. Las modalidades conservan sus nombres descriptivos solo en ese segundo paso, por ejemplo `Opción A`, `Opción B`, `Ciencias` o `Ciencias Sociales`, según los datos reales.

Esta regla resuelve los cursos duplicados de Matemáticas en 4 ESO y Bachillerato sin incumplir la nomenclatura solicitada.

## Experiencias por área

### Inicio

La portada se convierte en una entrada útil además de presentar el producto:

- Hero con mensaje breve, CTA `Elegir mi curso` y enlace secundario a cómo funciona.
- Para quien tenga progreso, tarjeta flotante con el siguiente paso real.
- Cuadrícula visible de asignaturas y niveles.
- Demostración concreta del funcionamiento de una lección o recomendación.
- Secciones narrativas distintas: cómo aprende el alumno, qué materias existen y qué ocurre con el progreso.
- Preguntas frecuentes y CTA final sin repetir el mismo argumento.

La navegación lateral por puntos puede retirarse si deja de aportar orientación con la nueva composición; se prioriza una página que se entienda por jerarquía y desplazamiento natural.

### Aprender

La cabecera saluda cuando hay usuario y ofrece una instrucción clara cuando no lo hay. El orden de prioridad es:

1. Continuar el último aprendizaje.
2. Recomendación, si existe.
3. Elegir asignatura y nivel.

Las asignaturas muestran identidad propia y acceso directo a sus niveles. Las métricas se mantienen como apoyo, sin competir con la siguiente acción.

### Materia y nivel

La página de materia usa una cabecera compacta con icono, descripción y progreso agregado. Debajo aparecen los niveles como tarjetas simples y comparables.

Al abrir un nivel:

- Si hay un único curso, se resuelve directamente a la ruta actual del curso.
- Si hay varias modalidades, se muestra un selector intermedio con explicación suficiente para distinguirlas.

### Curso y tema

Las páginas de curso y tema reciben el nuevo chrome, espaciado, tipografía y componentes de superficie. Se preservan su estructura curricular, progreso, carrusel, accesos rápidos y enlaces a lecciones.

### Practicar

Se organiza alrededor de la acción principal: retomar práctica recomendada o elegir materia, nivel y tema. Los filtros y estados usan el mismo patrón de asignaturas y niveles.

Las rutas de práctica y ejercicio independientes, incluidas `/practicar/[conceptSlug]` y `/aprender/ejercicio/[exerciseId]`, forman parte del rediseño. Solo se considera reproductor de lecciones inalterado la experiencia interactiva que actualmente oculta el chrome global.

### Progreso y Perfil

La información se presenta con resúmenes claros, barras y estados comprensibles. El diseño evita paneles de analítica densos cuando no hay datos y ofrece un siguiente paso útil en estados vacíos.

### Autenticación

Entrar y crear cuenta usan una composición de dos zonas en escritorio: formulario enfocado y una superficie de marca discreta. No se añaden pasos ni campos.

## Estados y comportamiento

- Invitado: el progreso local se explica sin interrumpir la tarea.
- Usuario autenticado: se muestra nombre, progreso sincronizado y cierre de sesión accesible.
- Sin progreso: la interfaz conduce a elegir asignatura y nivel.
- Con progreso: `Continuar` domina sobre `Explorar`.
- Próximamente: la opción permanece visible pero no aparenta estar activa.
- Error o vacío: mensaje concreto y acción segura para volver o reintentar.
- Carga: esqueletos con la misma geometría del contenido final cuando haya espera perceptible.

## Accesibilidad

- Contraste WCAG AA para texto, iconos funcionales y estados de foco.
- Navegación completa por teclado y orden de foco lógico.
- `aria-current`, nombres accesibles y regiones semánticas en navegación y migas.
- Los cambios de color siempre se acompañan de texto, icono o forma.
- Objetivos interactivos cómodos para escritorio y mínimo de 40 px cuando el control sea principal.
- Movimiento reducido o eliminado con `prefers-reduced-motion`.
- Encabezados jerárquicos y textos en español consistentes.

## Comportamiento por tamaño

La aplicación se diseña para escritorio desde 768 px. Dentro de ese rango:

- Entre 768 y 1100 px se reducen columnas y separación, sin introducir navegación móvil.
- En pantallas amplias se usa un ancho máximo generoso y líneas de lectura controladas.
- No se crean menús hamburguesa ni layouts específicos para móvil.

## Estrategia de implementación

La implementación debe avanzar de lo compartido a lo específico:

1. Tokens, fondo, tipografía y primitivas UI.
2. Cabecera, shell, navegación y aviso de invitado.
3. Helpers y agrupación de niveles/modalidades.
4. Inicio y Aprender.
5. Materia, nivel, curso y tema.
6. Practicar, Progreso y Perfil.
7. Autenticación.
8. Revisión visual, accesibilidad, pruebas y regresiones.

La implementación no debe hacer una sustitución masiva ciega de clases. Los componentes compartidos se cambian primero y cada área se verifica en sus estados reales.

## Verificación esperada

- Pruebas unitarias para la extracción de nivel, agrupación de cursos y resolución directa o por modalidad.
- Actualización de pruebas de navegación y catálogos.
- Pruebas E2E de Inicio, Aprender, elección de materia/nivel, acceso a curso y apertura de una lección.
- Pruebas de estados invitado/autenticado disponibles en el entorno.
- Revisión visual en 768, 1024, 1440 y 1920 px.
- Comprobación de teclado, foco, contraste y movimiento reducido.
- `npm run lint`, `npm run test:run`, pruebas E2E relevantes y `npm run build` antes de completar.

## Criterios de éxito

- Un visitante puede llegar desde Inicio a un curso sin dudar entre nombres redundantes.
- Un estudiante con progreso identifica su siguiente acción inmediatamente.
- Todas las áreas fuera del reproductor de lecciones parecen parte del mismo producto.
- Los cursos se presentan primero solo por año y las modalidades se muestran únicamente cuando hacen falta.
- No se rompe ninguna ruta existente de curso o lección.
- El reproductor de lecciones mantiene su diseño y comportamiento actuales.
