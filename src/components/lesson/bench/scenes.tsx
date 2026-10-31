"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { MANIM } from "@/components/lesson/anim/palette";
import { Frame, Slider } from "@/components/lesson/slide/tool-ui";
import {
  PARALELA_S_MAX,
  add,
  cartabonPose,
  clamp,
  distanciaFiloAP,
  dot,
  escuadraPose,
  filoEscuadra,
  filoPasaPorP,
  mul,
  paralelaSetup,
  sub,
  type Pt,
} from "./geometry";
import { BenchDefs, Cartabon, Compas, Desk, Escuadra, Lapiz, Regla, Transportador, compasRadio } from "./instruments";

export type BenchBlock = {
  scene: "instrumentos-catalogo" | "paralelas-escuadra-cartabon";
  params?: { a?: number; b?: number };
  hint?: string;
};

const f1 = (v: number) => v.toFixed(1).replace(".", ",");

/* ───────────── 1. Catálogo de instrumentos ───────────── */

type Item = {
  id: string;
  nombre: string;
  para: string;
  dato: string;
};

const ITEMS: Item[] = [
  { id: "regla", nombre: "Regla graduada", para: "Medir longitudes y trazar rectas. La graduación en milímetros es la unidad del dibujo técnico.", dato: "30 cm · divisiones de 1 mm" },
  { id: "escuadra", nombre: "Escuadra", para: "Trazar perpendiculares y paralelas, y ángulos de 45° y 90°.", dato: "Ángulos 90° · 45° · 45°" },
  { id: "cartabon", nombre: "Cartabón", para: "Ángulos de 30°, 60° y 90°. Junto con la escuadra, da todos los múltiplos de 15°.", dato: "Ángulos 90° · 60° · 30°" },
  { id: "transportador", nombre: "Transportador", para: "Medir y llevar ángulos cualesquiera, de 0° a 180°.", dato: "Precisión de 1°" },
  { id: "compas", nombre: "Compás", para: "Trazar circunferencias y arcos, y trasladar distancias sin medirlas.", dato: "Punta seca + mina" },
  { id: "lapiz", nombre: "Lápiz o portaminas", para: "Trazar con línea fina y uniforme. Para dibujo técnico: minas duras (H, 2H) para construcciones y blandas (HB) para el trazado final.", dato: "H = duro · B = blando" },
];

function Hot({ id, sel, onSel, children, label }: { id: string; sel: string; onSel: (id: string) => void; children: React.ReactNode; label: string }) {
  const on = sel === id;
  return (
    <g
      role="button"
      tabIndex={0}
      aria-label={label}
      aria-pressed={on}
      data-testid={`bench-item-${id}`}
      onClick={() => onSel(id)}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onSel(id);
        }
      }}
      style={{ cursor: "pointer", outline: "none", filter: on ? "drop-shadow(0 0 5px #ffd866) drop-shadow(0 0 2px #ffd866)" : undefined }}
    >
      {children}
    </g>
  );
}

export function InstrumentosCatalogo({ block }: { block: BenchBlock }) {
  const [sel, setSel] = useState("escuadra");
  const [open, setOpen] = useState(38);
  const item = ITEMS.find((i) => i.id === sel) ?? ITEMS[0];
  return (
    <Frame
      stacked
      hint={block.hint ?? "Toca cada instrumento para ver para qué sirve. En el compás, cambia la abertura."}
      onReset={() => {
        setSel("escuadra");
        setOpen(38);
      }}
      controls={
        <>
          <Slider label="Abertura del compás" value={open} min={10} max={80} step={1} unit="°" color={MANIM.blue} onChange={setOpen} />
          <div className="flex flex-col justify-center text-sm text-[color:var(--stage-muted,#b8c2d0)]">
            <span>Radio que traza</span>
            <span className="text-xl font-bold tabular-nums" style={{ color: MANIM.orange }} data-testid="bench-radio">
              {f1(compasRadio(open) / 10)} cm
            </span>
          </div>
        </>
      }
    >
      <svg viewBox="0 0 620 380" className="mx-auto block h-auto w-full max-w-2xl rounded-lg" role="img" aria-label="Mesa con los instrumentos de dibujo técnico" data-testid="bench-catalogo">
        <BenchDefs />
        <Desk w={620} h={380} sheet={{ x: 10, y: 10, w: 600, h: 360 }} />
        <Hot id="regla" sel={sel} onSel={setSel} label="Regla graduada">
          <Regla pose={{ x: 28, y: 26, rot: 0 }} />
        </Hot>
        <Hot id="transportador" sel={sel} onSel={setSel} label="Transportador">
          <Transportador pose={{ x: 480, y: 100, rot: 0 }} />
        </Hot>
        <Hot id="escuadra" sel={sel} onSel={setSel} label="Escuadra">
          <Escuadra pose={{ x: 34, y: 100, rot: 0 }} />
        </Hot>
        <Hot id="cartabon" sel={sel} onSel={setSel} label="Cartabón">
          <Cartabon pose={{ x: 235, y: 140, rot: 0 }} />
        </Hot>
        <Hot id="compas" sel={sel} onSel={setSel} label="Compás">
          <Compas pose={{ x: 548, y: 190, rot: 0 }} open={open} />
        </Hot>
        <Hot id="lapiz" sel={sel} onSel={setSel} label="Lápiz">
          <Lapiz pose={{ x: 250, y: 340, rot: 0 }} />
        </Hot>
      </svg>
      <div className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] bg-black/20 px-4 py-3" data-testid="bench-item-info">
        <p className="text-base font-bold text-[color:var(--stage-ink,#fff)]">{item.nombre}</p>
        <p className="mt-0.5 text-sm leading-snug text-[color:var(--stage-ink,#fff)]">{item.para}</p>
        <p className="mt-1 text-xs font-semibold" style={{ color: MANIM.yellow }}>
          {item.dato}
        </p>
      </div>
    </Frame>
  );
}

/* ───────────── 2. Paralela con escuadra y cartabón ───────────── */

const VIEW_W = 520;
const VIEW_H = 350;
const SHEET = { x: 30, y: 16, w: 460, h: 334 };

export function ParalelasEscuadraCartabon({ block }: { block: BenchBlock }) {
  const theta0 = clamp(block.params?.a ?? 12, -15, 30);
  const dP = clamp(block.params?.b ?? 70, 40, 100);
  const [theta, setTheta] = useState(theta0);
  const [s, setS] = useState(0);
  const [traced, setTraced] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const drag = useRef<{ start: Pt; s0: number } | null>(null);

  const setup = paralelaSetup([175, 70], theta, dP);
  const eq = escuadraPose(setup, s);
  const ct = cartabonPose(setup);
  const [e0, e1] = filoEscuadra(setup, s);
  const dist = distanciaFiloAP(setup, s);
  const ok = filoPasaPorP(setup, s);

  const toSvg = (ev: ReactPointerEvent): Pt => {
    const svg = svgRef.current;
    if (!svg) return [0, 0];
    const ctm = svg.getScreenCTM();
    if (!ctm) return [0, 0];
    const p = new DOMPoint(ev.clientX, ev.clientY).matrixTransform(ctm.inverse());
    return [p.x, p.y];
  };

  const onDown = (ev: ReactPointerEvent) => {
    (ev.currentTarget as Element).setPointerCapture(ev.pointerId);
    drag.current = { start: toSvg(ev), s0: s };
    setTraced(false);
  };
  const onMove = (ev: ReactPointerEvent) => {
    if (!drag.current) return;
    const d = sub(toSvg(ev), drag.current.start);
    setS(clamp(drag.current.s0 + dot(d, setup.h), 0, PARALELA_S_MAX));
  };
  const onUp = () => {
    drag.current = null;
  };

  const rA = add(setup.c0, mul(setup.u, -60));
  const rB = add(setup.c0, mul(setup.u, 280));
  const pa = add(setup.p, mul(setup.u, -150));
  const pb = add(setup.p, mul(setup.u, 200));

  return (
    <Frame
      stacked
      hint={block.hint ?? "Sujeta el cartabón y desliza la escuadra a lo largo de él hasta que su borde pase por P. Después traza."}
      onReset={() => {
        setS(0);
        setTraced(false);
        setTheta(theta0);
      }}
      controls={
        <>
          <Slider label="Desliza la escuadra" value={Math.round(s)} min={0} max={PARALELA_S_MAX} step={1} unit=" mm" color={MANIM.blue} onChange={(v) => { setS(v); setTraced(false); }} />
          <Slider label="Inclinación de r" value={theta} min={-15} max={30} step={1} unit="°" color={MANIM.orange} onChange={(v) => { setTheta(v); setS(0); setTraced(false); }} />
        </>
      }
    >
      <svg
        ref={svgRef}
        viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
        className="mx-auto block h-auto w-full max-w-2xl touch-none rounded-lg select-none"
        role="group"
        aria-label="Hoja con la recta r, el punto P, la escuadra y el cartabón"
        data-testid="bench-paralelas"
      >
        <BenchDefs />
        <clipPath id="bench-sheet-clip">
          <rect x={SHEET.x} y={SHEET.y} width={SHEET.w} height={SHEET.h} />
        </clipPath>
        <Desk w={VIEW_W} h={VIEW_H} sheet={SHEET} />
        <g clipPath="url(#bench-sheet-clip)">
          {/* recta dada */}
          <line x1={rA[0]} y1={rA[1]} x2={rB[0]} y2={rB[1]} stroke="#2a2f36" strokeWidth="0.9" />
          <text x={rA[0] - 4} y={rA[1] - 7} fontSize="11" fontWeight="700" fill="#2a2f36" fontFamily="ui-sans-serif, system-ui">
            r
          </text>
          {/* paralela trazada */}
          {traced ? <line data-testid="bench-trazo" x1={pa[0]} y1={pa[1]} x2={pb[0]} y2={pb[1]} stroke="#2b3138" strokeWidth="1" strokeLinecap="round" /> : null}
        </g>
        <g>
          {/* cartabón fijo */}
          <Cartabon pose={ct} label={false} />
          {/* escuadra deslizante */}
          <g
            onPointerDown={onDown}
            onPointerMove={onMove}
            onPointerUp={onUp}
            onPointerCancel={onUp}
            style={{ cursor: "grab" }}
            data-testid="bench-escuadra"
          >
            <Escuadra pose={eq} label={false} />
          </g>
          {/* punto P */}
          <circle cx={setup.p[0]} cy={setup.p[1]} r="2.2" fill={ok ? "#1f9d55" : "#c0392b"} />
          <text x={setup.p[0] + 5} y={setup.p[1] + 11} fontSize="11" fontWeight="700" fill="#2a2f36" fontFamily="ui-sans-serif, system-ui">
            P
          </text>
          {/* lápiz sobre el punto cuando el filo pasa por P */}
          {ok && !traced ? <line x1={e0[0]} y1={e0[1]} x2={e1[0]} y2={e1[1]} stroke="#1f9d55" strokeWidth="1.2" strokeDasharray="4 3" /> : null}
        </g>
      </svg>
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        <div className="text-sm text-[color:var(--stage-muted,#b8c2d0)]">
          Distancia del borde a P
          <span className="ml-2 text-xl font-bold tabular-nums" style={{ color: ok ? MANIM.green : MANIM.red }} data-testid="bench-dist">
            {f1(Math.abs(dist))} mm
          </span>
        </div>
        <button
          type="button"
          disabled={!ok}
          onClick={() => setTraced(true)}
          data-testid="bench-trazar"
          className="rounded-lg border border-[color:var(--stage-border,#3d4f66)] px-4 py-2 text-sm font-semibold text-[color:var(--stage-ink,#fff)] hover:bg-white/10 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Trazar la paralela
        </button>
        <p className="text-sm text-[color:var(--stage-muted,#b8c2d0)]" data-testid="bench-estado">
          {traced
            ? "Hecho: la recta trazada es paralela a r porque la escuadra no ha girado, solo se ha desplazado."
            : ok
              ? "El borde pasa por P. Ya puedes trazar."
              : "Sigue deslizando la escuadra sobre el cartabón."}
        </p>
      </div>
    </Frame>
  );
}

