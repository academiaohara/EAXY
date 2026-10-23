#!/usr/bin/env python3
"""Genera lecciones TI2 unidades 11–13, parches en curriculum e index."""
from __future__ import annotations

import json
import re
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
LESSON_ROOT = ROOT / "src/data/lessons/tecnologia-industrial-2-bachillerato"

SUBTITLES = {
    11: "TEMA_TI2_11_SUBTITLE",
    12: "TEMA_TI2_12_SUBTITLE",
    13: "TEMA_TI2_13_SUBTITLE",
}

MODULES = [
    {
        "id": 72,
        "order": 11,
        "slug": "componentes-sistema-control",
        "folder": "11-componentes-sistema-control",
        "title": "Componentes de un sistema de control",
        "subtitle_num": 11,
        "lessons": [
            ("01-senal-analogica-digital", "senalAnalogicaDigital", "senal-analogica-digital", "1. Señales analógicas y conversión digital",
             "Transductores, linealidad, cuantización y conversores A/D.", "senal-analogica-digital"),
            ("02-detectores-inductivos", "detectoresInductivos", "detectores-inductivos", "2. Detectores inductivos",
             "Corrientes de Foucault, oscilador LC, montaje y conexión.", "sensor-inductivo"),
            ("03-sensores-capacitivos-opticos", "sensoresCapacitivosOpticos", "sensores-capacitivos-opticos",
             "3. Sensores capacitivos y ópticos", "Campo eléctrico, barrera, reflexión y fibra óptica.", None),
            ("04-desplazamiento-galgas", "desplazamientoGalgas", "desplazamiento-galgas", "4. Desplazamiento y galgas extensiométricas",
             "Potenciómetros, reglas ópticas y factor de galga.", None),
            ("05-transductores-velocidad", "transductoresVelocidad", "transductores-velocidad", "5. Transductores de velocidad",
             "Encoders incrementales, tacómetros e impulsos.", None),
            ("06-presion-temperatura", "presionTemperatura", "presion-temperatura", "6. Transductores de presión y temperatura",
             "Bourdon, diafragma, termopares y pirómetros.", None),
            ("07-luz-amplificador-operacional", "luzAmplificadorOperacional", "luz-amplificador-operacional",
             "7. Transductores de luz y amplificador operacional", "LDR, fotodiodos, ganancia inversora y comparador.", None),
            ("08-aplicaciones-automocion", "aplicacionesAutomocion", "aplicaciones-automocion", "8. Aplicaciones en automoción",
             "Potenciómetro del acelerador, ASR y ABS.", "lazo-abierto-cerrado"),
        ],
    },
    {
        "id": 73,
        "order": 12,
        "slug": "circuitos-combinacionales-boole",
        "folder": "12-circuitos-combinacionales-boole",
        "title": "Circuitos combinacionales. Álgebra de Boole",
        "subtitle_num": 12,
        "lessons": [
            ("01-sistemas-digitales-binario", "sistemasDigitalesBinario", "sistemas-digitales-binario",
             "1. Sistemas digitales y código binario", "Bit, byte y ventajas del sistema binario.", None),
            ("02-conversiones-bases", "conversionesBases", "conversiones-bases", "2. Conversiones entre bases numéricas",
             "Divisiones y multiplicaciones sucesivas; parte entera y decimal.", None),
            ("03-algebra-boole-tablas", "algebraBooleTablas", "algebra-boole-tablas", "3. Álgebra de Boole y tablas de verdad",
             "Variables lógicas, lógica positiva/negativa y funciones.", None),
            ("04-puertas-or-and-not", "puertasOrAndNot", "puertas-or-and-not", "4. Puertas OR, AND y NOT",
             "Suma lógica, producto lógico y complementación.", "puertas-logicas-basicas"),
            ("05-puertas-nor-nand-xor", "puertasNorNandXor", "puertas-nor-nand-xor", "5. Puertas NOR, NAND y XOR",
             "Puertas universales y circuitos integrados 7400/7402/7486.", None),
            ("06-karnaugh-simplificacion", "karnaughSimplificacion", "karnaugh-simplificacion", "6. Mapas de Karnaugh",
             "Agrupación de unos y simplificación de funciones.", "karnaugh-dos-variables"),
            ("07-implementacion-nand-nor", "implementacionNandNor", "implementacion-nand-nor", "7. Implementación con NAND y NOR",
             "Funciones básicas y diseño solo con puertas universales.", None),
            ("08-codificadores-multiplexores", "codificadoresMultiplexores", "codificadores-multiplexores",
             "8. Codificadores, decodificadores y multiplexores", "74154, selección de líneas y enrutado de datos.", None),
            ("09-sumadores-binarios", "sumadoresBinarios", "sumadores-binarios", "9. Sumadores binarios",
             "Medio sumador, sumador completo y arrastre.", None),
        ],
    },
    {
        "id": 74,
        "order": 13,
        "slug": "circuitos-secuenciales-control-cableado",
        "folder": "13-circuitos-secuenciales-control-cableado",
        "title": "Circuitos secuenciales. Introducción al control cableado",
        "subtitle_num": 13,
        "lessons": [
            ("01-memoria-secuencial", "memoriaSecuencial", "memoria-secuencial", "1. Circuitos secuenciales y memoria",
             "Salida dependiente del historial; relés e integrados.", None),
            ("02-biestable-rs", "biestableRs", "biestable-rs", "2. Biestable R-S asíncrono",
             "Set, Reset, tabla de verdad y entradas prohibidas.", "biestable-rs"),
            ("03-biestables-jk-d-t", "biestablesJkDT", "biestables-jk-d-t", "3. Biestables J-K, D y T",
             "Flanco, sincronismo y registros.", None),
            ("04-elementos-control-cableado", "elementosControlCableado", "elementos-control-cableado",
             "4. Elementos del control cableado", "Interruptores, pulsadores, relés y temporizadores.", None),
            ("05-teoria-bimodal-grafos", "teoriaBimodalGrafos", "teoria-bimodal-grafos", "5. Teoría bimodal y grafos",
             "Estados, transiciones y ecuaciones lógicas.", None),
            ("06-diseno-secuencias-plc", "disenoSecuenciasPlc", "diseno-secuencias-plc", "6. Diseño de secuencias y autómatas",
             "Diagrama de funcionamiento, esquema eléctrico y PLC.", None),
        ],
    },
]

CONTENT: dict[str, dict] = {
    "senal-analogica-digital": {
        "intro": "Para **regular** una magnitud física conviene convertirla en **señal eléctrica** medible con voltímetro o registrador.",
        "defs": [
            "**Señal analógica**: puede tomar infinitos valores entre dos extremos; un reóstato o un 4–20 mA son ejemplos.",
            "**Señal digital**: solo toma valores discretos; con $n$ bits hay $2^n$ intervalos de cuantización.",
        ],
        "q": "En un depósito, un flotador mueve un cursor sobre un reóstato alimentado a 12 V. ¿Qué tipo de señal entrega?",
        "choices": [("ok", "Analógica continua (tensión proporcional al nivel)"), ("dig", "Digital de un solo bit", "Cuantizaría el nivel en intervalos discretos."), ("onoff", "Solo encendido/apagado", "Eso sería un detector de umbral, no un reóstato lineal.")],
        "correct": "ok",
        "expl": "Mientras la tensión varía en continuo con el nivel, la señal es analógica; la digitalización llega después con un A/D.",
    },
    "detectores-inductivos": {
        "intro": "Los **detectores inductivos** ven piezas **metálicas** sin contacto gracias a un campo magnético alterno.",
        "defs": [
            "**Corrientes de Foucault**: en el metal cercano disipan energía y **amortiguan** el oscilador LC.",
            "**Distancia de reacción** $S_n$: alcance nominal; la **histéresis** evita conmutaciones repetidas al límite.",
        ],
        "q": "¿Qué material detecta con fiabilidad un sensor inductivo enrasado?",
        "choices": [("ok", "Una arandela de acero que se acerca al frente activo"), ("alu", "Un bloque de aluminio grueso a 40 mm", "El aluminio es peor conductor magnético; suele reducirse el alcance."), ("plast", "Una pieza de plástico", "No induce Foucault útiles: no activa la salida.")],
        "correct": "ok",
        "expl": "Los inductivos están pensados para metales ferromagnéticos o al menos conductores en el rango de $S_n$.",
    },
    "sensores-capacitivos-opticos": {
        "intro": "Los **capacitivos** detectan cambios de **capacidad** del campo eléctrico; los **ópticos** usan luz modulada (infrarroja).",
        "defs": [
            "**Capacitivo**: oscilador RC; líquidos, polvos y metales alteran la capacidad.",
            "**Óptico**: modos **barrera**, **reflexión** con reflector o **directo** sobre el objeto.",
        ],
        "q": "Para contar botellas transparentes en una cinta, ¿qué principio suele ser más adecuado?",
        "choices": [("ok", "Sensor óptico por barrera o reflexión"), ("ind", "Detector inductivo", "No ve plástico ni vidrio."), ("cap", "Solo capacitivo en polvo seco", "Puede valer, pero la óptica es la opción típica en embotellado.")],
        "correct": "ok",
        "expl": "La óptica detecta casi cualquier sólido opaco o reflectante; el inductivo exige metal.",
    },
    "desplazamiento-galgas": {
        "intro": "Medir **desplazamientos** cortos puede hacerse con **potenciómetros**, **reglas ópticas** o **galgas extensiométricas**.",
        "defs": [
            "**Potenciómetro lineal**: simple y barato, pero hay **desgaste** por rozamiento.",
            "**Galga extensiométrica**: $\\Delta R = R\\,k\\,\\varepsilon$ con deformación $\\varepsilon = \\sigma/E$.",
        ],
        "q": "Una galga de $1200\\,\\Omega$ y factor $k=2{,}1$ sufre $\\varepsilon=0{,}001$. ¿Cuánto cambia la resistencia?",
        "choices": [("ok", "Aumenta unos 2,5 Ω"), ("25", "Aumenta 25 Ω", "Revisa $\\Delta R = R\\,k\\,\\varepsilon$."), ("0", "No cambia", "La deformación modifica la resistencia.")],
        "correct": "ok",
        "expl": "$\\Delta R = 1200 \\cdot 2{,}1 \\cdot 0{,}001 \\approx 2{,}52\\,\\Omega$.",
    },
    "transductores-velocidad": {
        "intro": "La **velocidad** angular o lineal se convierte en **trenes de impulsos** o en una **tensión proporcional**.",
        "defs": [
            "**Encoder incremental**: ranuras + emisor/receptor → pulsos contados con reloj.",
            "**Tacómetro**: $e = K B \\omega$ relaciona velocidad angular y tensión de salida.",
        ],
        "q": "¿Para medir la posición angular de un eje con resolución fina suele usarse?",
        "choices": [("ok", "Encoder óptico incremental"), ("term", "Termopar tipo K", "Mide temperatura, no ángulo."), ("ldr", "Fotorresistencia LDR", "Depende de la luz ambiente, no de la posición mecánica.")],
        "correct": "ok",
        "expl": "Contando pulsos del encoder conoces desplazamiento angular (y velocidad si usas un reloj).",
    },
    "presion-temperatura": {
        "intro": "Presión y temperatura son magnitudes clave en procesos; existen captadores **mecánicos**, **electromecánicos** y **electrónicos**.",
        "defs": [
            "**Tubo Bourdon** y **diafragma**: elementos elásticos que se deforman con la presión.",
            "**Termopares** y **RTD (Pt100)**: generan señal eléctrica según la temperatura.",
        ],
        "q": "Un manómetro de tubo Bourdon mide directamente:",
        "choices": [("ok", "Presión mediante deformación de un tubo curvo"), ("temp", "Temperatura del fluido", "Para temperatura usarías termopar o RTD."), ("caud", "Caudal volumétrico", "El caudal requiere otro tipo de captador.")],
        "correct": "ok",
        "expl": "El Bourdon se endereza con la presión interior y acciona un puntero o un transmisor.",
    },
    "luz-amplificador-operacional": {
        "intro": "Las **LDR** y los **fotodiodos** convierten luz en señal eléctrica; el **operacional** amplifica o compara.",
        "defs": [
            "**Amplificador inversor**: $-V_s/V_e = R_2/R_1$ con virtual ground en la entrada −.",
            "**Comparador**: la salida satura a ±$V_{cc}$ según cuál entrada sea mayor.",
        ],
        "q": "En un amplificador inversor ideal, si $R_2 = 100\\,\\text{k}\\Omega$ y $R_1 = 10\\,\\text{k}\\Omega$, la ganancia en módulo es:",
        "choices": [("ok", "10"), ("0.1", "0,1", "Es la relación $R_2/R_1$, no su inversa."), ("100", "100", "Revisa la fórmula del inversor.")],
        "correct": "ok",
        "expl": "La ganancia es $|R_2/R_1| = 10$: 1 V de entrada produce 10 V de salida (invertidos).",
    },
    "aplicaciones-automocion": {
        "intro": "El **acelerador electrónico** ya no usa cable Bowden: un **potenciómetro** envía la consigna al módulo de gestión.",
        "defs": [
            "**ASR**: limita el par si las ruedas patinan; comparte sensores con el **ABS**.",
            "Todo ello son lazos **cerrados** con captadores, ECU y actuadores.",
        ],
        "q": "El pedal acelerador moderno actúa como:",
        "choices": [("ok", "Mando que genera señal eléctrica de consigna"), ("act", "Actuador de par directo sobre el motor", "El actuador es la mariposa o el motor eléctrico asociado."), ("capt", "Captador de velocidad de rueda", "Eso está en el sistema ABS.")],
        "correct": "ok",
        "expl": "El pedal es el mando; la ECU interpreta la señal y acciona la mariposa o el motor eléctrico.",
    },
    "sistemas-digitales-binario": {
        "intro": "Los sistemas digitales trabajan con **dos niveles** (0 y 1), lo que simplifica el diseño de circuitos muy rápidos.",
        "defs": [
            "**Bit**: dígito binario; **byte**: palabra de 8 bits ($256$ estados).",
            "Un PC realiza millones de operaciones binarias por segundo sin ambigüedad de niveles.",
        ],
        "q": "¿Cuántos estados distintos codifica un byte?",
        "choices": [("ok", "256"), ("8", "8", "Son 8 bits, pero las combinaciones son $2^8$."), ("16", "16", "Recuerda $2^8$.")],
        "correct": "ok",
        "expl": "$2^8 = 256$ combinaciones posibles de ocho bits.",
    },
    "conversiones-bases": {
        "intro": "Pasar de **decimal a binario**: divisiones sucesivas por 2 (parte entera) y multiplicaciones (parte decimal).",
        "defs": [
            "Los restos leídos de abajo arriba forman los bits (MSB al final de dividir).",
            "Ejemplo: $45_{10} = 101101_2$.",
        ],
        "q": "Para convertir la parte entera de un decimal a binario se usa:",
        "choices": [("ok", "Divisiones sucesivas por 2 guardando restos"), ("mul", "Multiplicaciones por 2", "Las multiplicaciones sirven para la parte fraccionaria."), ("sum", "Suma de potencias de 10", "Eso convierte binario a decimal, no al revés.")],
        "correct": "ok",
        "expl": "Cada resto es un bit; el último cociente es el bit más significativo.",
    },
    "algebra-boole-tablas": {
        "intro": "El **álgebra de Boole** (Boole, Shannon) manipula variables que solo valen **0** o **1**.",
        "defs": [
            "**Lógica positiva**: el nivel alto es 1; **negativa**: el alto es 0.",
            "**Tabla de verdad** lista todas las combinaciones de entradas y la salida.",
        ],
        "q": "Una tabla de verdad de dos variables tiene:",
        "choices": [("ok", "4 filas"), ("2", "2 filas", "Son $2^2$ combinaciones."), ("8", "8 filas", "Sería con tres variables.")],
        "correct": "ok",
        "expl": "Con $n$ variables hay $2^n$ filas; para $n=2$ son cuatro.",
    },
    "puertas-or-and-not": {
        "intro": "Las **puertas lógicas** implementan operaciones booleanas en electrónica.",
        "defs": [
            "**OR** ($+$): 1 si alguna entrada es 1; contactos en **paralelo**.",
            "**AND** ($\\cdot$): 1 solo si todas valen 1; contactos en **serie**.",
            "**NOT**: invierte; símbolo con círculo o puerta 7404.",
        ],
        "q": "La salida de una puerta AND es 1 cuando:",
        "choices": [("ok", "Todas las entradas valen 1"), ("one", "Al menos una entrada vale 1", "Eso describe la puerta OR."), ("none", "Todas valen 0", "En ese caso la salida es 0.")],
        "correct": "ok",
        "expl": "AND es producto lógico: solo $1\\cdot1=1$.",
    },
    "puertas-nor-nand-xor": {
        "intro": "**NOR** y **NAND** son **universales**: con ellas se puede implementar cualquier función.",
        "defs": [
            "**XOR** ($\\oplus$): salida 1 si las entradas son **distintas**.",
            "Integrados: 7400 (NAND), 7402 (NOR), 7486 (XOR).",
        ],
        "q": "¿Qué puerta tiene salida 1 cuando las entradas son diferentes?",
        "choices": [("ok", "XOR"), ("and", "AND", "Requiere ambas a 1."), ("or", "OR", "Con 1 y 0 ya valdría, pero también con 1 y 1.")],
        "correct": "ok",
        "expl": "La O-exclusiva detecta desigualdad: $1\\oplus0=1$, $1\\oplus1=0$.",
    },
    "karnaugh-simplificacion": {
        "intro": "El **mapa de Karnaugh** agrupa **unos adyacentes** para obtener la expresión mínima.",
        "defs": [
            "Grupos de 1, 2, 4 u 8 celdas; la variable que cambia dentro del grupo se elimina.",
            "Ejemplo: $\\bar A B + A B \\rightarrow S = B$.",
        ],
        "q": "Al agrupar dos unos adyacentes en un mapa de 2 variables, suele desaparecer:",
        "choices": [("ok", "La variable que cambia de valor dentro del grupo"), ("const", "La variable que se mantiene constante", "La constante es la que permanece en el término."), ("out", "Toda la función", "Solo se simplifica, no se anula.")],
        "correct": "ok",
        "expl": "Si dentro del grupo $A$ pasa de 0 a 1, $A$ no puede formar parte del producto simplificado.",
    },
    "implementacion-nand-nor": {
        "intro": "Cualquier AND/OR/NOT se construye solo con **NAND** o solo con **NOR**.",
        "defs": [
            "NOT: NAND con entradas unidas; AND: NAND + inversor NAND.",
            "Tras simplificar en Karnaugh, se convierte a red NAND con De Morgan.",
        ],
        "q": "¿Por qué se llaman universales a NAND y NOR?",
        "choices": [("ok", "Porque cualquier función lógica puede implementarse solo con ellas"), ("cheap", "Porque son más baratas", "El motivo es funcional, no económico."), ("fast", "Porque son más rápidas", "No es la definición de puerta universal.")],
        "correct": "ok",
        "expl": "Con repeticiones de una sola puerta universal se obtiene cualquier circuito combinatorio.",
    },
    "codificadores-multiplexores": {
        "intro": "Los **decodificadores** activan una de $2^n$ salidas; los **multiplexores** eligen una de varias entradas.",
        "defs": [
            "**74154**: decodificador/demultiplexor 4→16 con entradas de inhibición.",
            "Se usan en selección de memoria y generación de señales de control.",
        ],
        "q": "Un multiplexor de 4 entradas necesita _____ entradas de selección.",
        "choices": [("ok", "2"), ("4", "4", "Son entradas de datos, no de selección."), ("1", "1", "Con 1 bit solo elegirías 2 entradas.")],
        "correct": "ok",
        "expl": "$2^2 = 4$ canales; cada combinación de $S_1S_0$ elige una entrada.",
    },
    "sumadores-binarios": {
        "intro": "La **suma binaria** usa **arrastre** (carry) igual que el decimal, pero con reglas $1+1=10_2$.",
        "defs": [
            "**Medio sumador**: suma dos bits; **sumador completo** incluye carry de entrada.",
            "Los sumadores encadenados forman la ALU de un procesador.",
        ],
        "q": "En binario, $1 + 1 + 1$ (bit de arrastre incluido) da:",
        "choices": [("ok", "11₂ (suma 3)"), ("10", "10₂", "Falta contar el carry entrante."), ("100", "100₂", "Demasiado alto para tres unos.")],
        "correct": "ok",
        "expl": "$1+1+1 = 3$, que se escribe $11_2$ (carry 1 y suma 1).",
    },
    "memoria-secuencial": {
        "intro": "En un circuito **secuencial** la salida depende de las **entradas actuales y del historial**.",
        "defs": [
            "**Memoria**: desde relés hasta biestables integrados.",
            "En automatización aún se diseñan esquemas con **relés** antes de pasarlos a PLC.",
        ],
        "q": "¿Qué elemento aporta la memoria en un circuito secuencial?",
        "choices": [("ok", "Un biestable o elemento equivalente"), ("and", "Una puerta AND", "Es combinatoria, sin memoria."), ("wire", "Un simple cable", "No almacena estados.")],
        "correct": "ok",
        "expl": "Los biestables guardan un bit; las máquinas de estados los encadenan.",
    },
    "biestable-rs": {
        "intro": "El **biestable R-S** tiene entradas **Reset** y **Set** y salidas complementarias $Q$ y $\\bar Q$.",
        "defs": [
            "Con $R=S=0$ **mantiene** el estado; $S=1$ pone $Q=1$; $R=1$ pone $Q=0$.",
            "La combinación $11$ es **prohibida** en la versión con NOR.",
        ],
        "q": "En un R-S asíncrono con NOR, ¿qué ocurre si R=0 y S=0?",
        "choices": [("ok", "Se conserva el estado anterior"), ("set", "Siempre Q=1", "Eso corresponde a Set activo."), ("reset", "Siempre Q=0", "Eso corresponde a Reset activo.")],
        "correct": "ok",
        "expl": "Ambas entradas a 0 bloquean cambios: es el modo memoria.",
    },
    "biestables-jk-d-t": {
        "intro": "Los biestables **J-K**, **D** y **T** evitan el estado prohibido y permiten **sincronismo** con reloj.",
        "defs": [
            "**D**: retrasa la entrada un ciclo ($Q_{n+1}=D$).",
            "**T**: con $T=1$ conmuta; con $T=0$ mantiene.",
        ],
        "q": "El biestable D se usa principalmente para:",
        "choices": [("ok", "Registrar (almacenar) un bit en el flanco de reloj"), ("osc", "Oscilar libremente", "Eso sería un multivibrador astable."), ("add", "Sumar bits", "La suma es combinatoria.")],
        "correct": "ok",
        "expl": "En el flanco activo copia D a Q: es la celda básica de un registro.",
    },
    "elementos-control-cableado": {
        "intro": "El **control cableado** usa **contactos** y **relés** en esquemas tipo **ladder**.",
        "defs": [
            "**Pulsador NA**: vuelve solo; **interruptor**: mantiene posición.",
            "**Relé/contactor** y **temporizadores** KT generan retardos.",
        ],
        "q": "Un pulsador normalmente abierto:",
        "choices": [("ok", "Cierra el circuito solo mientras se presiona"), ("lock", "Mantiene la posición cerrada", "Eso es un interruptor."), ("timer", "Retarda la señal automáticamente", "El retardo lo da un temporizador.")],
        "correct": "ok",
        "expl": "Al soltar el dedo vuelve a abrir: un solo estado estable (abierto).",
    },
    "teoria-bimodal-grafos": {
        "intro": "La **teoría bimodal** representa estados y transiciones con **grafos** y obtiene **ecuaciones** de cada relé.",
        "defs": [
            "Cada estado $KA_i$ se activa con condiciones de encendido y se mantiene con realimentación.",
            "Los **cronogramas** muestran tiempos de temporizadores en paralelo.",
        ],
        "q": "Un grafo bimodal representa:",
        "choices": [("ok", "Estados del sistema y condiciones de paso entre ellos"), ("truth", "Una tabla de verdad combinatoria", "Las tablas no incluyen memoria temporal."), ("analog", "Una señal analógica", "Es herramienta de lógica secuencial.")],
        "correct": "ok",
        "expl": "Los nodos son estados (relés); las aristas, condiciones de transición.",
    },
    "diseno-secuencias-plc": {
        "intro": "El diseño va del **diagrama de secuencia** al **esquema eléctrico** y, hoy, al **programa de autómata**.",
        "defs": [
            "Ecuaciones tipo $KA_1 = \\overline{KT_2}\\cdot(SM + KA_1)$ incluyen enclavamiento.",
            "Los **PLC** sustituyen paneles de relés con la misma lógica reprogramable.",
        ],
        "q": "Frente a un panel de relés, un autómata programable:",
        "choices": [("ok", "Ocupa menos espacio y facilita cambios de secuencia"), ("slow", "Siempre es más lento", "Suele ser más rápido y fiable."), ("no", "No puede implementar temporizadores", "Los PLCs incluyen temporizadores software.")],
        "correct": "ok",
        "expl": "La lógica cableada enseña el razonamiento; el PLC lo ejecuta sin re-cablear.",
    },
}


def ts_string(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def render_lesson(mod_folder: str, file_stem: str, export_base: str, slug: str, title: str, subtitle_num: int, anim: str | None) -> str:
    c = CONTENT[slug]
    sub = SUBTITLES[subtitle_num]
    var = f"{export_base}Lesson"
    blocks_intro = "\n        ".join(
        f'{{ kind: "definition", text: {ts_string(d)} }},' for d in c["defs"]
    )
    choices_ts = []
    for item in c["choices"]:
        if len(item) == 2:
            cid, label = item
            choices_ts.append(f'        {{ id: {ts_string(cid)}, label: {ts_string(label)} }},')
        else:
            cid, label, fb = item
            choices_ts.append(
                f'        {{ id: {ts_string(cid)}, label: {ts_string(label)}, incorrectFeedback: {ts_string(fb)} }},'
            )
    choices_block = "\n".join(choices_ts)
    anim_step = ""
    if anim:
        anim_step = f"""
    {{
      id: "visual",
      type: "slide",
      title: "Visualiza el concepto",
      blocks: [{{ kind: "text", text: {ts_string(c["intro"])} }}],
      visual: {{ kind: "anim", scene: {ts_string(anim)}, beatMs: 5200 }},
    }},"""
    classify = f"""
    {{
      id: "clasifica",
      type: "classify",
      title: "Conceptos clave",
      question: "Relaciona cada elemento con su unidad o magnitud.",
      groups: [
        {{ id: "a", label: "Captación", tone: "cobalt" }},
        {{ id: "b", label: "Procesado", tone: "emerald" }},
      ],
      items: [
        {{ id: "1", text: "Transductor / sensor", group: "a" }},
        {{ id: "2", text: "Amplificador o A/D", group: "b" }},
        {{ id: "3", text: "Tabla de verdad", group: "b" }},
        {{ id: "4", text: "Magnitud física medida", group: "a" }},
      ],
      hint: "Piensa si convierte una magnitud o manipula señales/lógica.",
      explanation: "Los captadores miran al proceso; el procesado prepara la señal o la lógica.",
    }},""" if subtitle_num == 11 else f"""
    {{
      id: "clasifica",
      type: "classify",
      title: "¿Combinacional o secuencial?",
      question: "Clasifica cada bloque.",
      groups: [
        {{ id: "comb", label: "Combinacional", tone: "cobalt" }},
        {{ id: "sec", label: "Secuencial", tone: "violet" }},
      ],
      items: [
        {{ id: "1", text: "Puerta NAND", group: "comb" }},
        {{ id: "2", text: "Mapa de Karnaugh", group: "comb" }},
        {{ id: "3", text: "Biestable J-K", group: "sec" }},
        {{ id: "4", text: "Relé enclavado", group: "sec" }},
      ],
      hint: "¿Necesita memoria de estados anteriores?",
      explanation: "Combinacional: salida solo depende de entradas actuales. Secuencial: hay memoria.",
    }},"""

    return f"""import type {{ InteractiveLesson }} from "@/lib/lesson/types";
import {{ {sub} }} from "@/data/lessons/shared";

export const {var}: InteractiveLesson = {{
  slug: {ts_string(slug)},
  title: {ts_string(title)},
  subtitle: {sub},
  stage: {{ theme: "board" }},
  steps: [
    {{
      id: "intro",
      type: "slide",
      title: "Idea clave",
      blocks: [
        {{ kind: "text", text: {ts_string(c["intro"])} }},
        {blocks_intro}
      ],
      arrange: "stack",
    }},{anim_step}
    {{
      id: "profundiza",
      type: "slide",
      title: "En detalle",
      blocks: [
        {{ kind: "steps", items: [
          {", ".join(ts_string(x) for x in c["defs"])},
        ] }},
        {{ kind: "warning", text: "Repasa el PDF del libro: las tablas de características y los ejemplos numéricos del tema." }},
      ],
      arrange: "stack",
    }},
    {classify}
    {{
      id: "check",
      type: "predict",
      title: "Comprueba",
      question: {ts_string(c["q"])},
      mode: "choice",
      choices: [
{choices_block}
      ],
      correctChoiceId: {ts_string(c["correct"])},
      shuffleChoices: true,
      explanation: {ts_string(c["expl"])},
    }},
    {{
      id: "cierre",
      type: "slide",
      title: "Resumen",
      blocks: [
        {{ kind: "rule", title: "Llévate esto", text: {ts_string(c["expl"])} }},
      ],
      arrange: "stack",
    }},
  ],
}};
"""


def main() -> None:
    imports: list[tuple[str, str, str]] = []
    registry: list[tuple[str, str]] = []
    curriculum_modules: list[str] = []

    for mod in MODULES:
        mod_dir = LESSON_ROOT / mod["folder"]
        mod_dir.mkdir(parents=True, exist_ok=True)
        lesson_entries: list[str] = []
        for idx, (file_stem, export_base, slug, title, summary, anim) in enumerate(mod["lessons"], start=1):
            path = mod_dir / f"{file_stem}.ts"
            path.write_text(
                render_lesson(mod["folder"], file_stem, export_base, slug, title, mod["subtitle_num"], anim),
                encoding="utf-8",
            )
            var = f"{export_base}Lesson"
            imports.append((f"@/data/lessons/tecnologia-industrial-2-bachillerato/{mod['folder']}/{file_stem}", var, slug))
            registry.append((slug, var))
            lesson_id = mod["id"] * 100 + idx
            lesson_entries.append(
                f"""            {{
              id: lessonId({lesson_id}),
              title: {ts_string(title)},
              summary: {ts_string(summary)},
              orderIndex: {idx},
              kind: "interactive",
              interactiveSlug: {ts_string(slug)},
              conceptSlugs: [],
            }}"""
            )
        curriculum_modules.append(
            f"""        {{
          id: moduleId({mod["id"]}),
          slug: {ts_string(mod["slug"])},
          title: {ts_string(mod["title"])},
          orderIndex: {mod["order"]},
          lessons: [
{",\n".join(lesson_entries)},
          ],
        }}"""
        )

    # shared.ts subtitles
    shared = ROOT / "src/data/lessons/shared.ts"
    text = shared.read_text(encoding="utf-8")
    additions = [
        'export const TEMA_TI2_11_SUBTITLE = "Tecnología Industrial II, Unidad 11 — Componentes de un sistema de control";',
        'export const TEMA_TI2_12_SUBTITLE = "Tecnología Industrial II, Unidad 12 — Circuitos combinacionales. Álgebra de Boole";',
        'export const TEMA_TI2_13_SUBTITLE = "Tecnología Industrial II, Unidad 13 — Circuitos secuenciales. Introducción al control cableado";',
    ]
    for line in additions:
        if line not in text:
            text = text.rstrip() + "\n" + line + "\n"
    shared.write_text(text, encoding="utf-8")

    # index.ts imports + registry
    index = ROOT / "src/data/lessons/index.ts"
    idx_text = index.read_text(encoding="utf-8")
    for imp_path, var, _slug in sorted(imports, key=lambda x: x[1].lower()):
        imp_line = f'import {{ {var} }} from "{imp_path}";'
        if imp_line not in idx_text:
            idx_text = imp_line + "\n" + idx_text
    for slug, var in sorted(registry, key=lambda x: x[0]):
        entry = f'  {ts_string(slug)}: {var},'
        if f'"{slug}":' not in idx_text and f"'{slug}':" not in idx_text:
            idx_text = idx_text.replace("} as const;", f"  {slug}: {var},\n}} as const;", 1)
    index.write_text(idx_text, encoding="utf-8")

    # curriculum.ts insert modules before closing of TI2 course modules
    cur = ROOT / "src/content/curriculum.ts"
    cur_text = cur.read_text(encoding="utf-8")
    marker = "          ],\n        },\n      ],\n    },\n  ],\n\n  concepts:"
    insert = ",\n".join(curriculum_modules) + ",\n"
    if "componentes-sistema-control" not in cur_text:
        cur_text = cur_text.replace(
            "          ],\n        },\n      ],\n    },\n  ],\n\n  concepts:",
            "          ],\n        },\n" + insert + "      ],\n    },\n  ],\n\n  concepts:",
            1,
        )
        cur.write_text(cur_text, encoding="utf-8")

    # test update
    test = ROOT / "src/tests/unit/data/tecnologia-industrial-lessons.test.tsx"
    t = test.read_text(encoding="utf-8")
    t = t.replace("diez temas", "trece temas")
    t = t.replace("101 lecciones", "124 lecciones")
    old_mods = """      "sistemas-automaticos",
    ]);"""
    new_mods = """      "sistemas-automaticos",
      "componentes-sistema-control",
      "circuitos-combinacionales-boole",
      "circuitos-secuenciales-control-cableado",
    ]);"""
    t = t.replace(old_mods, new_mods)
    t = t.replace("expect(lessons).toHaveLength(101);", "expect(lessons).toHaveLength(124);")
    t = t.replace("expect(n).toBeGreaterThan(70);", "expect(n).toBeGreaterThan(85);")
    test.write_text(t, encoding="utf-8")

    # README
    readme = ROOT / "temp/tecnologia/README.md"
    r = readme.read_text(encoding="utf-8")
    if "Unidad 11" not in r:
        r = r.replace(
            "| `Unidad 10 - Sistemas automáticos.pdf` |",
            "| `Unidad 11 - Componentes de un sistema de control.pdf` | Captadores, señales analógicas/digitales, sensores de proximidad, transductores y operacional | `…/11-componentes-sistema-control/` |\n| `Unidad 12 - Circuitos combinacionales. Álgebra de Boole.pdf` | Binario, álgebra de Boole, puertas, Karnaugh, multiplexores | `…/12-circuitos-combinacionales-boole/` |\n| `Unidad 13 - Circuitos secuenciales. Introducción al control cableado.pdf` | Biestables, relés, grafos bimodales (extracto del capítulo 13) | `…/13-circuitos-secuenciales-control-cableado/` |\n| `Unidad 10 - Sistemas automáticos.pdf` |",
        )
        r = r.replace("(10 temas, 101 lecciones)", "(13 temas, 124 lecciones)")
        readme.write_text(r, encoding="utf-8")

    print("Generated", len(registry), "lessons")


if __name__ == "__main__":
    main()
