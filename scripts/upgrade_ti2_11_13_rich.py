#!/usr/bin/env python3
"""Sobrescribe las 23 lecciones TI2 unidades 11–13 con contenido rico (anim + tool + predict)."""
from __future__ import annotations

import json
from pathlib import Path
from typing import Any

ROOT = Path(__file__).resolve().parents[1]
LESSON_ROOT = ROOT / "src/data/lessons/tecnologia-industrial-2-bachillerato"

SUBTITLES = {11: "TEMA_TI2_11_SUBTITLE", 12: "TEMA_TI2_12_SUBTITLE", 13: "TEMA_TI2_13_SUBTITLE"}

MAPPING: dict[str, dict[str, Any]] = {
    "senal-analogica-digital": {"anim": "senal-analogica-digital", "tool": "cuantizacion-ad-explorador", "params": {"a": 30, "b": 6, "c": 4}},
    "detectores-inductivos": {"anim": "sensor-inductivo", "tool": "inductivo-sn-explorador"},
    "sensores-capacitivos-opticos": {"anim": "optica-sensor", "tool": "optica-modos-explorador"},
    "desplazamiento-galgas": {"anim": "galga-potenciometro", "tool": "galga-deformacion-explorador", "params": {"a": 2000, "b": 1200, "c": 2.1}},
    "transductores-velocidad": {"anim": "encoder-tacometro", "tool": "encoder-rpm-explorador"},
    "presion-temperatura": {"anim": "presion-temperatura-capt", "tool": "captador-presion-temp-explorador"},
    "luz-amplificador-operacional": {"anim": "ldr-operacional", "tool": "operacional-inversor-explorador", "params": {"a": 10, "b": 100}},
    "aplicaciones-automocion": {"anim": "lazo-abierto-cerrado", "tool": "lazo-perturbacion-explorador", "params": {"a": 50, "b": -20, "c": 10}},
    "sistemas-digitales-binario": {"anim": "binario-sistemas", "tool": "binario-byte-explorador"},
    "conversiones-bases": {"anim": "conversion-bases", "tool": "conversion-decimal-binario-explorador"},
    "algebra-boole-tablas": {"anim": "logica-niveles", "tool": "logica-niveles-explorador"},
    "puertas-or-and-not": {"anim": "puertas-logicas-basicas", "tool": "puerta-logica-explorador", "params": {"n": 0}},
    "puertas-nor-nand-xor": {"anim": "puertas-universales", "tool": "puerta-universal-explorador", "params": {"n": 0}},
    "karnaugh-simplificacion": {"anim": "karnaugh-dos-variables", "tool": "karnaugh-2-explorador"},
    "implementacion-nand-nor": {"anim": "nand-implementacion", "tool": "de-morgan-nand-explorador"},
    "codificadores-multiplexores": {"anim": "mux-decoder", "tool": "mux-decoder-explorador"},
    "sumadores-binarios": {"anim": "sumador-binario", "tool": "sumador-binario-explorador"},
    "memoria-secuencial": {"anim": "secuencial-intro", "tool": "secuencial-memoria-explorador"},
    "biestable-rs": {"anim": "biestable-rs", "tool": "biestable-rs-explorador"},
    "biestables-jk-d-t": {"anim": "biestable-jk-d-t", "tool": "biestable-jk-explorador"},
    "elementos-control-cableado": {"anim": "cableado-ladder", "tool": "cableado-elementos-explorador"},
    "teoria-bimodal-grafos": {"anim": "grafo-bimodal", "tool": "grafo-bimodal-explorador"},
    "diseno-secuencias-plc": {"anim": "secuencia-reles-plc", "tool": "secuencia-reles-explorador"},
}

LESSONS: list[dict[str, Any]] = [
    {"folder": "11-componentes-sistema-control", "file": "01-senal-analogica-digital", "export": "senalAnalogicaDigital", "slug": "senal-analogica-digital", "title": "1. Señales analógicas y conversión digital", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "02-detectores-inductivos", "export": "detectoresInductivos", "slug": "detectores-inductivos", "title": "2. Detectores inductivos", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "03-sensores-capacitivos-opticos", "export": "sensoresCapacitivosOpticos", "slug": "sensores-capacitivos-opticos", "title": "3. Sensores capacitivos y ópticos", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "04-desplazamiento-galgas", "export": "desplazamientoGalgas", "slug": "desplazamiento-galgas", "title": "4. Desplazamiento y galgas extensiométricas", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "05-transductores-velocidad", "export": "transductoresVelocidad", "slug": "transductores-velocidad", "title": "5. Transductores de velocidad", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "06-presion-temperatura", "export": "presionTemperatura", "slug": "presion-temperatura", "title": "6. Transductores de presión y temperatura", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "07-luz-amplificador-operacional", "export": "luzAmplificadorOperacional", "slug": "luz-amplificador-operacional", "title": "7. Transductores de luz y amplificador operacional", "unit": 11},
    {"folder": "11-componentes-sistema-control", "file": "08-aplicaciones-automocion", "export": "aplicacionesAutomocion", "slug": "aplicaciones-automocion", "title": "8. Aplicaciones en automoción", "unit": 11},
    {"folder": "12-circuitos-combinacionales-boole", "file": "01-sistemas-digitales-binario", "export": "sistemasDigitalesBinario", "slug": "sistemas-digitales-binario", "title": "1. Sistemas digitales y código binario", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "02-conversiones-bases", "export": "conversionesBases", "slug": "conversiones-bases", "title": "2. Conversiones entre bases numéricas", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "03-algebra-boole-tablas", "export": "algebraBooleTablas", "slug": "algebra-boole-tablas", "title": "3. Álgebra de Boole y tablas de verdad", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "04-puertas-or-and-not", "export": "puertasOrAndNot", "slug": "puertas-or-and-not", "title": "4. Puertas OR, AND y NOT", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "05-puertas-nor-nand-xor", "export": "puertasNorNandXor", "slug": "puertas-nor-nand-xor", "title": "5. Puertas NOR, NAND y XOR", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "06-karnaugh-simplificacion", "export": "karnaughSimplificacion", "slug": "karnaugh-simplificacion", "title": "6. Mapas de Karnaugh", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "07-implementacion-nand-nor", "export": "implementacionNandNor", "slug": "implementacion-nand-nor", "title": "7. Implementación con NAND y NOR", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "08-codificadores-multiplexores", "export": "codificadoresMultiplexores", "slug": "codificadores-multiplexores", "title": "8. Codificadores, decodificadores y multiplexores", "unit": 12},
    {"folder": "12-circuitos-combinacionales-boole", "file": "09-sumadores-binarios", "export": "sumadoresBinarios", "slug": "sumadores-binarios", "title": "9. Sumadores binarios", "unit": 12},
    {"folder": "13-circuitos-secuenciales-control-cableado", "file": "01-memoria-secuencial", "export": "memoriaSecuencial", "slug": "memoria-secuencial", "title": "1. Circuitos secuenciales y memoria", "unit": 13},
    {"folder": "13-circuitos-secuenciales-control-cableado", "file": "02-biestable-rs", "export": "biestableRs", "slug": "biestable-rs", "title": "2. Biestable R-S asíncrono", "unit": 13},
    {"folder": "13-circuitos-secuenciales-control-cableado", "file": "03-biestables-jk-d-t", "export": "biestablesJkDT", "slug": "biestables-jk-d-t", "title": "3. Biestables J-K, D y T", "unit": 13},
    {"folder": "13-circuitos-secuenciales-control-cableado", "file": "04-elementos-control-cableado", "export": "elementosControlCableado", "slug": "elementos-control-cableado", "title": "4. Elementos del control cableado", "unit": 13},
    {"folder": "13-circuitos-secuenciales-control-cableado", "file": "05-teoria-bimodal-grafos", "export": "teoriaBimodalGrafos", "slug": "teoria-bimodal-grafos", "title": "5. Teoría bimodal y grafos", "unit": 13},
    {"folder": "13-circuitos-secuenciales-control-cableado", "file": "06-diseno-secuencias-plc", "export": "disenoSecuenciasPlc", "slug": "diseno-secuencias-plc", "title": "6. Diseño de secuencias y autómatas", "unit": 13},
]


def ts(s: str) -> str:
    return json.dumps(s, ensure_ascii=False)


def params_ts(params: dict[str, Any] | None) -> str:
    if not params:
        return ""
    inner = ", ".join(f"{k}: {json.dumps(v)}" for k, v in params.items())
    return f", params: {{ {inner} }}"


def help_ts(help_items: list[tuple[str, str]]) -> str:
    if not help_items:
        return ""
    lines = ", ".join(f'{{ label: {ts(l)}, message: {ts(m)} }}' for l, m in help_items)
    return f"      help: [{lines}],\n"


def block_ts(b: dict[str, Any]) -> str:
    kind = b["kind"]
    if kind == "text":
        return f'{{ kind: "text", text: {ts(b["text"])} }}'
    if kind == "definition":
        return f'{{ kind: "definition", text: {ts(b["text"])} }}'
    if kind == "rule":
        parts = [f'kind: "rule"', f'title: {ts(b["title"])}']
        if "formula" in b:
            parts.append(f'formula: {ts(b["formula"])}')
        parts.append(f'text: {ts(b["text"])}')
        return "{ " + ", ".join(parts) + " }"
    if kind == "steps":
        title = f', title: {ts(b["title"])}' if b.get("title") else ""
        items = ",\n          ".join(ts(i) for i in b["items"])
        return f'{{ kind: "steps"{title}, items: [\n          {items},\n        ] }}'
    if kind == "warning":
        return f'{{ kind: "warning", text: {ts(b["text"])} }}'
    if kind == "example":
        lines = ",\n          ".join(f'{{ math: {ts(l["math"])} }}' for l in b["lines"])
        return f'{{ kind: "example", title: {ts(b["title"])}, lines: [\n          {lines},\n        ] }}'
    raise ValueError(kind)


def blocks_ts(blocks: list[dict[str, Any]], indent: str = "        ") -> str:
    return ",\n".join(f"{indent}{block_ts(b)}" for b in blocks)


def classify_ts(c: dict[str, Any]) -> str:
    groups = ",\n        ".join(
        f'{{ id: {ts(g["id"])}, label: {ts(g["label"])}, tone: {ts(g["tone"])} }}' for g in c["groups"]
    )
    items = ",\n        ".join(
        f'{{ id: {ts(i["id"])}, text: {ts(i["text"])}, group: {ts(i["group"])} }}' for i in c["items"]
    )
    h = help_ts(c.get("help", []))
    return f"""    {{
      id: {ts(c["id"])},
      type: "classify",
{h}      title: {ts(c["title"])},
      question: {ts(c["question"])},
      groups: [
        {groups},
      ],
      items: [
        {items},
      ],
      hint: {ts(c["hint"])},
      explanation: {ts(c["explanation"])},
    }},"""


def predict_ts(p: dict[str, Any]) -> str:
    choices_lines = []
    for ch in p["choices"]:
        if len(ch) == 2:
            choices_lines.append(f'        {{ id: {ts(ch[0])}, label: {ts(ch[1])} }},')
        else:
            choices_lines.append(
                f'        {{ id: {ts(ch[0])}, label: {ts(ch[1])}, incorrectFeedback: {ts(ch[2])} }},'
            )
    choices_block = "\n".join(choices_lines)
    h = help_ts(p.get("help", []))
    return f"""    {{
      id: {ts(p["id"])},
      type: "predict",
{h}      title: {ts(p["title"])},
      question: {ts(p["question"])},
      mode: "choice",
      choices: [
{choices_block}
      ],
      correctChoiceId: {ts(p["correct"])},
      shuffleChoices: true,
      explanation: {ts(p["explanation"])},
    }},"""


# Rich pedagogical content per slug (McGraw-Hill TI2 units 11–13)
RICH: dict[str, dict[str, Any]] = {
    "senal-analogica-digital": {
        "intro_title": "De la magnitud física a la señal eléctrica",
        "intro_help": [("¿Por qué convertir?", "El regulador y la ECU trabajan con tensiones o corrientes medibles; el transductor hace de «traductor».")],
        "intro_blocks": [
            {"kind": "text", "text": "Para **regular** una magnitud física conviene convertirla en **señal eléctrica** medible con voltímetro o registrador."},
            {"kind": "definition", "text": "**Señal analógica**: puede tomar infinitos valores entre dos extremos; un reóstato o una salida 4–20 mA son ejemplos típicos en automatización."},
            {"kind": "definition", "text": "**Señal digital**: solo toma valores discretos; con $n$ bits hay $2^n$ niveles de cuantización tras el conversor A/D."},
            {"kind": "steps", "title": "Cadena de adquisición", "items": [
                "El **transductor** convierte temperatura, presión o nivel en tensión o corriente.",
                "El **filtro** limita ruido y protege al conversor.",
                "El **A/D** cuantiza y codifica en binario para el procesador.",
            ]},
        ],
        "anim_title": "Analógica frente a digital",
        "anim_help": [("¿Qué es cuantizar?", "Se aproxima el valor continuo al escalón más cercano; más bits ⇒ escalones más finos.")],
        "anim_blocks": [{"kind": "rule", "title": "Resolución", "formula": "Q = V_{ref}/2^n", "text": "La **resolución** del conversor depende de la tensión de referencia y del número de bits $n$."}],
        "detail_title": "Linealidad y error",
        "detail_help": [("¿Linealidad?", "Un transductor lineal da una salida proporcional a la magnitud en todo el rango útil.")],
        "detail_blocks": [
            {"kind": "text", "text": "En el libro se comparan sensores por **linealidad**, **histéresis** y **deriva** con la temperatura."},
            {"kind": "warning", "text": "Un error de cuantización fijo puede ser aceptable en nivel de depósito, pero no en pesaje legal: ahí interesa más resolución (más bits)."},
        ],
        "tool_title": "Explora la cuantización",
        "tool_help": [("¿Y el ruido?", "Con pocos bits el escalón es grande: pequeñas variaciones de la magnitud no se ven en digital.")],
        "tool_text": "Sube el número de bits y la tensión de referencia: observa cuántos niveles obtienes y el tamaño del escalón.",
        "classify": {
            "id": "tipo-senal", "title": "¿Analógica o digital?", "question": "Clasifica cada señal del taller.",
            "help": [("Pista", "¿Varía en continuo o solo en niveles discretos?")],
            "groups": [{"id": "ana", "label": "Analógica", "tone": "cobalt"}, {"id": "dig", "label": "Digital", "tone": "emerald"}],
            "items": [
                {"id": "1", "text": "Salida 4–20 mA de un transmisor de presión", "group": "ana"},
                {"id": "2", "text": "Bus de datos de un encoder ya decodificado", "group": "dig"},
                {"id": "3", "text": "Tensión en un reóstato lineal", "group": "ana"},
                {"id": "4", "text": "Palabra de 12 bits del PLC", "group": "dig"},
            ],
            "hint": "El cable puede llevar analógica; el registro interno suele ser digital.",
            "explanation": "La analógica es continua en el tiempo y amplitud; la digital está cuantizada y codificada.",
        },
        "predicts": [
            {"id": "check-flotador", "title": "Flotador y reóstato", "help": [("Pista", "¿Varía la tensión en continuo con el nivel?")],
             "question": "En un depósito, un flotador mueve un cursor sobre un reóstato a 12 V. ¿Qué tipo de señal entrega?",
             "choices": [("ok", "Analógica continua (tensión proporcional al nivel)"), ("dig", "Digital de un solo bit", "Cuantizaría el nivel en intervalos discretos."), ("onoff", "Solo encendido/apagado", "Eso sería un detector de umbral, no un reóstato lineal."), ("pwm", "PWM ya digitalizada", "El reóstato da tensión continua; el PWM llegaría después.")],
             "correct": "ok", "explanation": "Mientras la tensión varía en continuo con el nivel, la señal es analógica; la digitalización llega después con un A/D."},
            {"id": "check-bits", "title": "Niveles de un A/D", "help": [("Pista", "Cuenta combinaciones con $2^n$.")],
             "question": "Un conversor de 10 bits con referencia 5 V, ¿cuántos niveles distintos puede codificar?",
             "choices": [("ok", "1024"), ("512", "512", "Serían 9 bits."), ("1000", "1000", "No es potencia de 2."), ("256", "256", "Eso sería 8 bits.")],
             "correct": "ok", "explanation": "$2^{10} = 1024$ niveles; la resolución es $5/1024 \\approx 4{,}9\\ \\text{mV}$."},
            {"id": "check-ad", "title": "Función del A/D", "help": [("Pista", "Va de continuo a discreto.")],
             "question": "La función principal de un conversor A/D en un lazo de control es:",
             "choices": [("ok", "Convertir la señal analógica del captador en datos digitales para el regulador"), ("da", "Amplificar la salida del actuador", "Eso lo hace un amplificador de potencia."), ("fil", "Eliminar el error permanente", "Eso es tarea del regulador, no del A/D."), ("pwm", "Generar PWM para el motor", "El PWM puede ser salida del regulador digital.")],
             "correct": "ok", "explanation": "El A/D permite que la unidad de control procese la medida con algoritmos digitales."},
        ],
    },
    "detectores-inductivos": {
        "intro_title": "Proximidad sin contacto",
        "intro_help": [("¿Solo hierro?", "Detectan metales conductores; el acero ferromagnético da el mayor alcance nominal $S_n$.")],
        "intro_blocks": [
            {"kind": "text", "text": "Los **detectores inductivos** ven piezas **metálicas** sin contacto gracias a un campo magnético alterno en el frente activo."},
            {"kind": "definition", "text": "**Corrientes de Foucault**: en el metal cercano disipan energía y **amortiguan** el oscilador LC interno."},
            {"kind": "definition", "text": "**Distancia de reacción** $S_n$: alcance nominal con pastilla de acero estándar; la **histéresis** evita conmutaciones repetidas al límite."},
            {"kind": "steps", "title": "Montaje", "items": [
                "Salida a colector abierto o PNP/NPN según carga.",
                "Cable blindado si hay interferencias de variadores.",
                "Distancia de montaje según catálogo para no falsificar $S_n$.",
            ]},
        ],
        "anim_title": "Campo y oscilador",
        "anim_help": [("¿Por qué oscila?", "El amortiguamiento por Foucault cambia la amplitud y la frecuencia; el umbral conmuta la salida.")],
        "anim_blocks": [{"kind": "rule", "title": "Principio", "text": "Sin metal el oscilador vibra con amplitud alta; con metal cercano la amplitud cae y la salida cambia de estado."}],
        "detail_title": "Factores que reducen alcance",
        "detail_help": [("Material", "Aluminio y cobre dan menos alcance que acero; el agua no activa un inductivo.")],
        "detail_blocks": [
            {"kind": "text", "text": "La temperatura, el recubrimiento de pintura y el ángulo de aproximación modifican la distancia real de detección."},
            {"kind": "warning", "text": "Un inductivo **no** sustituye a un capacitivo para detectar plástico o líquidos: el principio es magnético-eléctrico, no capacitivo."},
        ],
        "tool_title": "Ajusta $S_n$ e histéresis",
        "tool_help": [("Histéresis", "Separación entre encendido y apagado al retirar la pieza.")],
        "tool_text": "Acerca la pastilla de acero y mira cuándo conmuta la salida; juega con la histéresis para evitar rebotes.",
        "classify": {
            "id": "detecta-no", "title": "¿Lo ve un inductivo?", "question": "¿Qué objetos activan de forma fiable un sensor inductivo enrasado?",
            "help": [("Pista", "Hace falta metal conductor en el rango $S_n$.")],
            "groups": [{"id": "si", "label": "Sí", "tone": "emerald"}, {"id": "no", "label": "No / poco fiable", "tone": "rose"}],
            "items": [
                {"id": "1", "text": "Tornillo de acero en la cinta", "group": "si"},
                {"id": "2", "text": "Arandela cromada", "group": "si"},
                {"id": "3", "text": "Botella PET", "group": "no"},
                {"id": "4", "text": "Lámina de aluminio fina lejos del nominal", "group": "no"},
            ],
            "hint": "Plástico y vidrio no amortiguan el oscilador.",
            "explanation": "Los inductivos están pensados para metales en el alcance nominal; otros materiales reducen o anulan la detección.",
        },
        "predicts": [
            {"id": "check-material", "title": "Pastilla de prueba", "help": [("Pista", "El catálogo usa acero estándar.")],
             "question": "¿Qué material detecta con fiabilidad un sensor inductivo enrasado en su $S_n$?",
             "choices": [("ok", "Una arandela de acero que se acerca al frente activo"), ("alu", "Un bloque de aluminio grueso a 40 mm", "El aluminio reduce mucho el alcance."), ("plast", "Una pieza de plástico", "No induce Foucault útiles."), ("madera", "Un listón de madera", "No es conductor.")],
             "correct": "ok", "explanation": "Los inductivos están pensados para metales ferromagnéticos o conductores en el rango de $S_n$."},
            {"id": "check-foucault", "title": "Foucault", "help": [("Pista", "Disipan energía en el metal.")],
             "question": "Las corrientes de Foucault en un detector inductivo:",
             "choices": [("ok", "Amortiguan el oscilador cuando hay metal cercano"), ("gen", "Alimentan el LED de señal", "El LED indica estado, no se alimenta de Foucault."), ("frio", "Enfrían el sensor", "No es un efecto térmico útil aquí."), ("campo", "Crean un campo estático permanente", "El campo es alterno.")],
             "correct": "ok", "explanation": "La disipación en el metal reduce la amplitud del oscilador y dispara el comparador de umbral."},
            {"id": "check-salida", "title": "PNP o NPN", "help": [("Pista", "Debe coincidir con la entrada del PLC.")],
             "question": "Al cablear un inductivo a una entrada de PLC, lo primero es comprobar:",
             "choices": [("ok", "Tipo de salida (PNP/NPN) y tensión de alimentación"), ("color", "Solo el color del cable", "El color no define la lógica."), ("sn", "Que $S_n$ sea máximo", "Debe ajustarse a la aplicación, no al máximo."), ("pwm", "Que entregue PWM", "La salida es todo o nada, no PWM.")],
             "correct": "ok", "explanation": "Una salida PNP en entrada NPN no conmuta; revisa esquema y datasheet."},
        ],
    },
}


def _load_gen_content() -> dict[str, dict]:
    import importlib.util

    spec = importlib.util.spec_from_file_location("gen_ti2_11_13", ROOT / "scripts/gen_ti2_11_13.py")
    if spec is None or spec.loader is None:
        raise RuntimeError("Cannot load gen_ti2_11_13.py")
    mod = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(mod)
    return mod.CONTENT


def _default_rich(slug: str, unit: int) -> dict[str, Any]:
    """Fallback content from gen script essentials — extended at runtime for missing slugs."""
    c = _load_gen_content()[slug]
    intro = c["intro"]
    defs = c["defs"]
    base_predict = {
        "id": "check-1",
        "title": "Comprueba",
        "help": [("Pista", "Repasa las definiciones del inicio.")],
        "question": c["q"],
        "choices": list(c["choices"]) + [("d", "Ninguna de las anteriores", "Hay una opción correcta entre las tres primeras.")],
        "correct": c["correct"],
        "explanation": c["expl"],
    }
    while len(base_predict["choices"]) < 4:
        base_predict["choices"].append(("extra", "Opción distractora", "No coincide con el libro."))
    return {
        "intro_title": "Idea clave",
        "intro_help": [("Contexto", "Contenido alineado con la unidad del manual McGraw-Hill TI2.")],
        "intro_blocks": [{"kind": "text", "text": intro}]
        + [{"kind": "definition", "text": d} for d in defs]
        + [{"kind": "steps", "title": "Puntos del tema", "items": defs}],
        "anim_title": "Visualiza el concepto",
        "anim_help": [("Animación", "Sigue los pasos; cada beat resalta una parte del esquema.")],
        "anim_blocks": [{"kind": "rule", "title": "Recuerda", "text": intro}],
        "detail_title": "Aplicación industrial",
        "detail_help": [("Taller", "Relaciona el esquema con montaje real de sensores o circuitos.")],
        "detail_blocks": [
            {"kind": "text", "text": "En instalaciones reales se combinan varios captadores con filtrado, cableado apantallado y ajuste según hoja de datos."},
            {"kind": "steps", "items": defs},
        ],
        "tool_title": "Manipula parámetros",
        "tool_help": [("Explorador", "Cambia valores y observa la respuesta al instante.")],
        "tool_text": "Usa la herramienta para comprobar las relaciones del tema antes de los ejercicios de choice.",
        "classify": _unit_classify(unit, slug),
        "predicts": [base_predict, _second_predict(slug, c), _third_predict(slug, c)],
    }


def _unit_classify(unit: int, slug: str) -> dict[str, Any]:
    if unit == 11:
        return {
            "id": "capt-proc", "title": "Captación o procesado", "question": "¿Capta magnitud o procesa señal?",
            "help": [("Pista", "Sensor/transductor frente a amplificador o conversor.")],
            "groups": [{"id": "a", "label": "Captación", "tone": "cobalt"}, {"id": "b", "label": "Procesado", "tone": "emerald"}],
            "items": [
                {"id": "1", "text": "Galga extensiométrica", "group": "a"},
                {"id": "2", "text": "Amplificador de instrumentación", "group": "b"},
                {"id": "3", "text": "Encoder de posición", "group": "a"},
                {"id": "4", "text": "Conversor A/D", "group": "b"},
            ],
            "hint": "¿Mira al proceso o prepara la señal?",
            "explanation": "Captación: magnitud física → eléctrica. Procesado: condiciona para medir o regular.",
        }
    if unit == 12:
        return {
            "id": "comb-sec", "title": "Combinacional o secuencial", "question": "Clasifica cada bloque.",
            "help": [("Pista", "¿Necesita memoria de estados anteriores?")],
            "groups": [{"id": "comb", "label": "Combinacional", "tone": "cobalt"}, {"id": "sec", "label": "Secuencial", "tone": "violet"}],
            "items": [
                {"id": "1", "text": "Puerta NAND", "group": "comb"},
                {"id": "2", "text": "Sumador completo", "group": "comb"},
                {"id": "3", "text": "Biestable J-K", "group": "sec"},
                {"id": "4", "text": "Multiplexor 74151", "group": "comb"},
            ],
            "hint": "La salida combinatoria solo depende de entradas actuales.",
            "explanation": "Combinacional: sin memoria. Secuencial: la salida depende también del historial.",
        }
    return {
        "id": "cable-plc", "title": "Cableado o autómata", "question": "¿Dónde encaja cada elemento?",
        "help": [("Pista", "Relés físicos frente a memoria de PLC.")],
        "groups": [{"id": "cab", "label": "Control cableado", "tone": "amber"}, {"id": "plc", "label": "PLC / lógica programada", "tone": "cobalt"}],
        "items": [
            {"id": "1", "text": "Contactor con bobina K1", "group": "cab"},
            {"id": "2", "text": "Temporizador KT en riel", "group": "cab"},
            {"id": "3", "text": "Contador CTU en programa", "group": "plc"},
            {"id": "4", "text": "Marca interna %M10", "group": "plc"},
        ],
        "hint": "El ladder en papel usa relés; el PLC los emula en software.",
        "explanation": "El cableado usa elementos físicos; el autómata ejecuta la misma lógica de forma reprogramable.",
    }


def _second_predict(slug: str, c: dict) -> dict[str, Any]:
    extras = {
        "sensores-capacitivos-opticos": ("check-modo", "Modo óptico", "Para contar botellas opacas en cinta suele usarse:",
            [("ok", "Barrera o reflexión con emisor y receptor"), ("ind", "Solo inductivo", "No ve plástico."), ("term", "Termopar", "Mide temperatura."), ("pres", "Bourdon", "Mide presión.")], "ok", "La óptica detecta la interrupción o el reflejo del objeto."),
        "desplazamiento-galgas": ("check-galga", "Deformación", "Con $R=1200\\,\\Omega$, $k=2{,}1$, $\\varepsilon=0{,}001$, $\\Delta R$ vale aproximadamente:",
            [("ok", "2,5 Ω"), ("25", "25 Ω", "Aplica $\\Delta R=Rk\\varepsilon$."), ("0", "0 Ω", "Hay deformación elástica."), ("120", "120 Ω", "Demasiado grande.")], "ok", "$\\Delta R=1200\\cdot2{,}1\\cdot0{,}001\\approx2{,}5\\,\\Omega$."),
    }
    if slug in extras:
        e = extras[slug]
        return {"id": e[0], "title": e[1], "help": [("Pista", "Manual unidad 11.")], "question": e[2], "choices": e[3], "correct": e[4], "explanation": e[5]}
    return {
        "id": "check-2", "title": "Segunda comprobación", "help": [("Pista", "Piensa en la definición central del tema.")],
        "question": f"Según el tema «{slug}», la afirmación correcta es:",
        "choices": [
            ("ok", c["choices"][0][1] if c["choices"] else "La opción del manual"),
            ("w1", "La salida no depende de las entradas", "En casi todos los bloques del tema sí depende."),
            ("w2", "No hace falta alimentación", "Sensores y puertas necesitan alimentación."),
            ("w3", "Es siempre analógico", "Muchos bloques de estas unidades son digitales."),
        ],
        "correct": "ok",
        "explanation": c["expl"],
    }


def _third_predict(slug: str, c: dict) -> dict[str, Any]:
    return {
        "id": "check-3", "title": "Aplica", "help": [("Pista", "Elimina opciones imposibles primero.")],
        "question": "En un proyecto de automatización, elegir mal el captador o la puerta lógica implica:",
        "choices": [
            ("ok", "Errores de medida, falsos disparos o secuencias que no arrancan"),
            ("nada", "Solo cambia el color del LED", "El fallo es funcional y de seguridad."),
            ("mas", "Siempre mejora la respuesta", "Un sensor inadecuado empeora el control."),
            ("pdf", "Solo afecta al dossier", "Afecta al proceso real."),
        ],
        "correct": "ok",
        "explanation": "Por eso el manual detalla características, montaje y tablas de verdad antes del cableado.",
    }


# Extend RICH for remaining slugs using generator + hand-tuned predicts where needed
HAND_PREDICTS: dict[str, list[dict[str, Any]]] = {
    "sensores-capacitivos-opticos": [
        {"id": "check-optica", "title": "Botellas en cinta", "help": [("Pista", "Vidrio y plástico no activan inductivos.")],
         "question": "Para contar botellas transparentes en una cinta, ¿qué principio suele ser más adecuado?",
         "choices": [("ok", "Sensor óptico por barrera o reflexión"), ("ind", "Detector inductivo", "No ve plástico ni vidrio."), ("cap", "Solo capacitivo en polvo", "Puede valer en sólidos, pero la óptica es típica en embotellado."), ("term", "Termopar", "Mide temperatura.")],
         "correct": "ok", "explanation": "La óptica detecta casi cualquier sólido opaco o reflectante; el inductivo exige metal."},
        {"id": "check-cap", "title": "Capacitivo", "help": [("Pista", "Cambia la capacidad del campo.")],
         "question": "Un sensor capacitivo detecta con fiabilidad:",
         "choices": [("ok", "Líquidos y sólidos que alteran el campo eléctrico"), ("solo", "Solo metales ferromagnéticos", "Eso es el inductivo."), ("luz", "Solo cambios de luz", "Eso es óptico."), ("pres", "Presión en bar", "Usa otro principio.")],
         "correct": "ok", "explanation": "El oscilador RC cambia de frecuencia o amplitud cuando varía la capacidad del entorno."},
        {"id": "check-barrera", "title": "Barrera luminosa", "help": [("Pista", "Emisor y receptor enfrentados.")],
         "question": "En modo barrera, la salida conmuta cuando:",
         "choices": [("ok", "Se interrumpe el haz entre emisor y receptor"), ("ref", "Siempre hay reflexión en el objeto", "Eso es modo reflexión."), ("ind", "Hay metal cerca", "Principio inductivo."), ("temp", "Sube la temperatura", "No es un termómetro.")],
         "correct": "ok", "explanation": "Sin objeto el receptor ve el haz; al interrumpirse, cambia el estado lógico."},
    ],
    "aplicaciones-automocion": [
        {"id": "check-pedal", "title": "Pedal electrónico", "help": [("Pista", "Genera consigna, no par motor directo.")],
         "question": "El pedal acelerador moderno actúa como:",
         "choices": [("ok", "Mando que genera señal eléctrica de consigna"), ("act", "Actuador de par directo sobre el motor", "El actuador es la mariposa."), ("capt", "Captador de velocidad de rueda", "Eso es ABS."), ("abs", "Solo interruptor del ABS", "El ABS es otro lazo.")],
         "correct": "ok", "explanation": "El pedal es el mando; la ECU interpreta la señal y acciona la mariposa o el motor eléctrico."},
        {"id": "check-asr", "title": "ASR", "help": [("Pista", "Limita deslizamiento.")],
         "question": "El ASR (control de tracción) es un lazo:",
         "choices": [("ok", "Cerrado: mide velocidad de ruedas y ajusta par"), ("abierto", "Abierto sin sensores", "Usa captadores de rueda."), ("mec", "Solo mecánico", "Es electrónico."), ("manual", "Solo manual del conductor", "Actúa automáticamente.")],
         "correct": "ok", "explanation": "Compara velocidades de ruedas y reduce par o frena una rueda que patina."},
        {"id": "check-abs-auto", "title": "ABS", "help": [("Pista", "Realimentación de velocidad.")],
         "question": "El ABS evita el bloqueo de rueda porque:",
         "choices": [("ok", "Realimenta la velocidad y modula la presión de frenado"), ("mas", "Aumenta siempre la presión", "La reduce al detectar bloqueo."), ("nada", "No usa sensores", "Lleva captadores en ruedas."), ("abierto", "Es lazo abierto", "Hay comparación y corrección.")],
         "correct": "ok", "explanation": "Es control en lazo cerrado sobre la velocidad angular de cada rueda."},
    ],
    "puertas-or-and-not": [
        {"id": "check-and", "title": "AND", "help": [("Pista", "Producto lógico.")],
         "question": "La salida de una puerta AND es 1 cuando:",
         "choices": [("ok", "Todas las entradas valen 1"), ("one", "Al menos una entrada vale 1", "Eso es OR."), ("none", "Todas valen 0", "Salida 0."), ("inv", "Las entradas son opuestas", "Eso se parece a XOR.")],
         "correct": "ok", "explanation": "AND es producto lógico: solo $1\\cdot1=1$."},
        {"id": "check-or-contacto", "title": "Contactos", "help": [("Pista", "Paralelo = OR en lógica positiva.")],
         "question": "Dos contactos en paralelo implementan lógica:",
         "choices": [("ok", "OR (suma lógica)"), ("and", "AND", "Serie sería AND."), ("not", "NOT", "NOT invierte una señal."), ("xor", "XOR", "No es exclusiva.")],
         "correct": "ok", "explanation": "Con lógica positiva, paralelo equivale a OR; en serie, AND."},
        {"id": "check-not", "title": "NOT", "help": [("Pista", "Complemento.")],
         "question": "La puerta NOT con entrada 0 da salida:",
         "choices": [("ok", "1"), ("0", "0", "Invierte."), ("x", "Indeterminada", "Está definida."), ("ana", "Analógica", "Es digital.")],
         "correct": "ok", "explanation": "NOT es complementación: $\\overline{0}=1$."},
    ],
    "biestable-rs": [
        {"id": "check-mem", "title": "Modo memoria", "help": [("Pista", "R=S=0 en NOR.")],
         "question": "En un R-S asíncrono con NOR, ¿qué ocurre si R=0 y S=0?",
         "choices": [("ok", "Se conserva el estado anterior"), ("set", "Siempre Q=1", "Set activo es S=1."), ("reset", "Siempre Q=0", "Reset activo es R=1."), ("proh", "Estado prohibido", "Eso es R=S=1.")],
         "correct": "ok", "explanation": "Ambas entradas a 0 bloquean cambios: es el modo memoria."},
        {"id": "check-set", "title": "Set", "help": [("Pista", "S=1, R=0.")],
         "question": "Con S=1 y R=0 en un R-S NOR, la salida Q pasa a:",
         "choices": [("ok", "1"), ("0", "0", "Eso sería reset."), ("q", "No cambia", "Set fuerza Q=1."), ("osc", "Oscila", "No en asíncrono estable.")],
         "correct": "ok", "explanation": "Set activo fuerza el estado alto en Q."},
        {"id": "check-prohib", "title": "Prohibido", "help": [("Pista", "Ambas a 1 en NOR.")],
         "question": "La combinación R=1 y S=1 en R-S con NOR se evita porque:",
         "choices": [("ok", "Puede dejar Q y $\\bar Q$ en el mismo nivel lógico"), ("low", "Consume menos que J-K", "No es la razón principal."), ("rap", "Es más rápida", "Es inestable."), ("plc", "El PLC no lo permite", "También en cableado.")],
         "correct": "ok", "explanation": "Se pierde la complementariedad de salidas; por eso se usa J-K o D sincronizados."},
    ],
}


def rich_for(slug: str, unit: int) -> dict[str, Any]:
    if slug in RICH:
        return RICH[slug]
    data = _default_rich(slug, unit)
    if slug in HAND_PREDICTS:
        data["predicts"] = HAND_PREDICTS[slug]
    # Hand-tune titles for key topics
    titles = {
        "sensores-capacitivos-opticos": ("Capacitivos y ópticos", "Modos ópticos", "Elige modo y objeto"),
        "desplazamiento-galgas": ("Medir desplazamiento", "Potenciómetro y galga", "Deformación y $\\Delta R$"),
        "transductores-velocidad": ("Velocidad y posición", "Encoder y tacómetro", "Cuenta pulsos o mide tensión"),
        "presion-temperatura": ("Presión y temperatura", "Bourdon y termopar", "Compara captadores"),
        "luz-amplificador-operacional": ("Luz y operacional", "LDR y ganancia", "Inversor y comparador"),
        "aplicaciones-automocion": ("Automoción", "Lazos en el vehículo", "Perturbación en el lazo"),
        "sistemas-digitales-binario": ("Sistema binario", "Bit y byte", "Combina bits"),
        "conversiones-bases": ("Bases numéricas", "Divisiones sucesivas", "Decimal ↔ binario"),
        "algebra-boole-tablas": ("Boole y tablas", "Niveles lógicos", "Completa la tabla"),
        "puertas-nor-nand-xor": ("Universales y XOR", "NAND/NOR", "Elige puerta"),
        "karnaugh-simplificacion": ("Karnaugh", "Agrupa unos", "Simplifica"),
        "implementacion-nand-nor": ("Solo NAND", "De Morgan", "Convierte la función"),
        "codificadores-multiplexores": ("Mux y decoder", "Selección", "Líneas de control"),
        "sumadores-binarios": ("Suma binaria", "Carry", "Medio y completo sumador"),
        "memoria-secuencial": ("Secuencial", "Memoria", "Estado y salida"),
        "biestables-jk-d-t": ("J-K, D y T", "Flanco de reloj", "Registro"),
        "elementos-control-cableado": ("Ladder", "Contactos y relés", "NA y NC"),
        "teoria-bimodal-grafos": ("Grafos bimodales", "Estados", "Transiciones"),
        "diseno-secuencias-plc": ("Secuencia a PLC", "Relés y autómata", "Enclavamiento"),
    }
    if slug in titles:
        data["intro_title"], data["anim_title"], data["tool_title"] = titles[slug]
    return data


def render_lesson(meta: dict[str, Any]) -> str:
    slug = meta["slug"]
    unit = meta["unit"]
    map_ = MAPPING[slug]
    rich = rich_for(slug, unit)
    sub = SUBTITLES[unit]
    var = f"{meta['export']}Lesson"
    params = map_.get("params")

    intro_h = help_ts(rich["intro_help"])
    anim_h = help_ts(rich["anim_help"])
    detail_h = help_ts(rich["detail_help"])
    tool_h = help_ts(rich["tool_help"])

    classify_block = classify_ts(rich["classify"]) if rich.get("classify") else ""
    predicts = "\n".join(predict_ts(p) for p in rich["predicts"])

    return f"""import type {{ InteractiveLesson }} from "@/lib/lesson/types";
import {{ {sub} }} from "@/data/lessons/shared";

export const {var}: InteractiveLesson = {{
  slug: {ts(slug)},
  title: {ts(meta["title"])},
  subtitle: {sub},
  stage: {{ theme: "board" }},
  steps: [
    {{
      id: "intro",
      type: "slide",
{intro_h}      title: {ts(rich["intro_title"])},
      blocks: [
{blocks_ts(rich["intro_blocks"])},
      ],
      arrange: "stack",
    }},
    {{
      id: "anim",
      type: "slide",
{anim_h}      title: {ts(rich["anim_title"])},
      blocks: [
{blocks_ts(rich["anim_blocks"])},
      ],
      visual: {{ kind: "anim", scene: {ts(map_["anim"])}, beatMs: 5600 }},
    }},
    {{
      id: "detalle",
      type: "slide",
{detail_h}      title: {ts(rich["detail_title"])},
      blocks: [
{blocks_ts(rich["detail_blocks"])},
      ],
      arrange: "stack",
    }},
    {{
      id: "explora",
      type: "slide",
{tool_h}      title: {ts(rich["tool_title"])},
      blocks: [{{ kind: "text", text: {ts(rich["tool_text"])} }}],
      visual: {{ kind: "tool", tool: {ts(map_["tool"])}{params_ts(params)} }},
    }},
{classify_block}
{predicts}
  ],
}};
"""


def main() -> None:
    for meta in LESSONS:
        slug = meta["slug"]
        if slug not in MAPPING:
            raise SystemExit(f"Missing mapping for {slug}")
        path = LESSON_ROOT / meta["folder"] / f"{meta['file']}.ts"
        path.write_text(render_lesson(meta), encoding="utf-8")
        print("Wrote", path.relative_to(ROOT))
    print("Done:", len(LESSONS), "lessons")


if __name__ == "__main__":
    main()
