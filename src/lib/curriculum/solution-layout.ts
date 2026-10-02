export type SolutionLayout = {
  /** Líneas previas al primer apartado (o toda la resolución si no hay apartados). */
  intro: string[];
  parts: SolutionPart[];
};

export type SolutionPart = SolutionLayout & {
  /** Etiqueta sin paréntesis: «a», «b»… o «1», «2»… para actividades numeradas. */
  label: string;
};

type MarkerKind = "number" | "letter";

type Segment = { kind: "text" | "math"; value: string };

function toSegments(text: string): Segment[] {
  return text
    .split(/(\$[^$]+\$)/g)
    .filter((part) => part.length > 0)
    .map((part) =>
      part.startsWith("$") && part.endsWith("$") && part.length > 1
        ? { kind: "math", value: part.slice(1, -1) }
        : { kind: "text", value: part },
    );
}

const PART_MARKER: Record<MarkerKind, RegExp> = {
  number: /(^|\s)(\d{1,2})\)(?=\s|$)/g,
  letter: /(^|\s)([a-z])\)(?=\s|$)/g,
};

function nextLabel(kind: MarkerKind, label: string): string {
  return kind === "number"
    ? String(Number(label) + 1)
    : String.fromCharCode(label.charCodeAt(0) + 1);
}

/**
 * Divide la resolución por marcadores `a)`, `b)`… (o `1)`, `2)`…). Solo cuenta
 * marcadores fuera de `$…$`, precedidos de inicio o espacio y consecutivos desde
 * `a` (los números pueden empezar en cualquiera: una actividad puede continuar
 * la numeración de otra).
 */
function splitIntoParts(
  text: string,
  kind: MarkerKind,
): { intro: string; parts: { label: string; body: string }[] } {
  const segments = toSegments(text);
  const cuts: { label: string; start: number; end: number }[] = [];
  let expected: string | null = kind === "number" ? null : "a";
  let offset = 0;

  for (const segment of segments) {
    const raw = segment.kind === "math" ? `$${segment.value}$` : segment.value;
    if (segment.kind === "text") {
      for (const match of segment.value.matchAll(PART_MARKER[kind])) {
        const label = match[2];
        if (expected !== null && label !== expected) continue;
        const start = offset + (match.index ?? 0) + match[1].length;
        cuts.push({ label, start, end: start + label.length + 1 });
        expected = nextLabel(kind, label);
      }
    }
    offset += raw.length;
  }

  if (cuts.length < 2) {
    return { intro: text, parts: [] };
  }

  return {
    intro: text.slice(0, cuts[0].start),
    parts: cuts.map((cut, index) => ({
      label: cut.label,
      body: text.slice(cut.end, cuts[index + 1]?.start ?? text.length),
    })),
  };
}

/** Separa `latex` por un patrón solo donde no hay llaves abiertas. */
function splitTopLevel(latex: string, pattern: RegExp): string[] {
  const pieces: string[] = [];
  let depth = 0;
  let last = 0;
  for (let i = 0; i < latex.length; i++) {
    const char = latex[i];
    if (char === "\\" && (latex[i + 1] === "{" || latex[i + 1] === "}")) {
      i++;
      continue;
    }
    if (char === "{") depth++;
    else if (char === "}") depth = Math.max(0, depth - 1);
    else if (depth === 0 && i > last) {
      const match = pattern.exec(latex.slice(i));
      if (match && match.index === 0) {
        pieces.push(latex.slice(last, i));
        last = i;
        i += match[0].length - 1;
      }
    }
  }
  pieces.push(latex.slice(last));
  return pieces.map((piece) => piece.trim()).filter(Boolean);
}

/** Por debajo de esta longitud, una cadena de igualdades cabe en una línea. */
const LONG_CHAIN_LENGTH = 24;

/**
 * Trozos de una fórmula que van en líneas distintas: cada `\Rightarrow` abre
 * línea y, en cadenas largas con dos o más `=`, cada `=` a partir del segundo.
 */
function splitMath(latex: string): string[] {
  if (latex.includes("\\begin")) {
    return [latex];
  }
  return splitTopLevel(latex, /^\\(?:Rightarrow|Leftrightarrow|implies)(?![a-zA-Z])/).flatMap(
    (piece) => {
      const members = splitTopLevel(piece, /^=/);
      if (members.length < 3 || piece.length <= LONG_CHAIN_LENGTH) {
        return [piece];
      }
      return [`${members[0]} ${members[1]}`, ...members.slice(2)];
    },
  );
}

/** Saltos dentro de texto: tras `;`, tras `.` antes de mayúscula o fórmula, y antes de `→`. */
const TEXT_BREAK = /(;)\s+|(\.)\s+(?=[A-ZÁÉÍÓÚÑ¿¡$*])|\s*(?=→)/g;

function splitText(text: string, followedByMath: boolean): string[] {
  const source = followedByMath ? `${text}$` : text;
  const pieces: string[] = [];
  let last = 0;
  for (const match of source.matchAll(TEXT_BREAK)) {
    if (match[0].length === 0 && match.index === last) continue;
    const index = match.index ?? 0;
    const punctuation = match[1] ?? match[2] ?? "";
    pieces.push(source.slice(last, index + punctuation.length));
    last = index + match[0].length;
  }
  pieces.push(source.slice(last));
  if (followedByMath) {
    pieces[pieces.length - 1] = pieces[pieces.length - 1].slice(0, -1);
  }
  return pieces;
}

/** Reparte el cuerpo de un apartado (o de la resolución) en líneas cortas. */
export function splitSolutionLines(body: string): string[] {
  const lines: string[] = [];

  for (const rawLine of body.split("\n")) {
    let current = "";
    const flush = () => {
      if (current.trim()) lines.push(current.trim());
      current = "";
    };

    const segments = toSegments(rawLine);
    segments.forEach((segment, segmentIndex) => {
      if (segment.kind === "math") {
        splitMath(segment.value).forEach((piece, index) => {
          if (index > 0) flush();
          current += `$${piece}$`;
        });
        return;
      }
      const followedByMath = segments[segmentIndex + 1]?.kind === "math";
      splitText(segment.value, followedByMath).forEach((piece, index) => {
        if (index > 0) flush();
        current += piece;
      });
    });
    flush();
  }

  return lines;
}

function layoutLetters(text: string): SolutionLayout {
  const { intro, parts } = splitIntoParts(text, "letter");
  return {
    intro: splitSolutionLines(intro),
    parts: parts.map((part) => ({
      label: part.label,
      intro: splitSolutionLines(part.body),
      parts: [],
    })),
  };
}

/**
 * Organiza la resolución por apartados (`a)`, `b)`…), con actividades
 * numeradas (`1)`, `2)`…) como nivel superior, y cada apartado en varias líneas.
 */
export function layoutSolution(solutionText: string): SolutionLayout {
  const { intro, parts } = splitIntoParts(solutionText, "number");
  if (parts.length === 0) {
    return layoutLetters(solutionText);
  }
  return {
    intro: splitSolutionLines(intro),
    parts: parts.map((part) => ({ label: part.label, ...layoutLetters(part.body) })),
  };
}
