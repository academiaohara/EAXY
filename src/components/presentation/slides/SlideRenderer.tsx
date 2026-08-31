import Image from "next/image";
import type { Slide } from "@/lib/presentation-schema";
import {
  formatSpanishNumber,
  QuoteBox,
  SectionTitle,
  SlideFrame,
} from "../SlideFrame";

interface SlideRendererProps {
  slide: Slide;
}

export function SlideRenderer({ slide }: SlideRendererProps) {
  switch (slide.type) {
    case "cover":
      return <CoverSlide slide={slide} />;
    case "history":
      return <HistorySlide slide={slide} />;
    case "counting":
      return <CountingSlide slide={slide} />;
    case "place-value-chart":
      return <PlaceValueChartSlide slide={slide} />;
    case "positional":
      return <PositionalSlide slide={slide} />;
    case "decomposition":
      return <DecompositionSlide slide={slide} />;
    default:
      return null;
  }
}

function CoverSlide({ slide }: { slide: Extract<Slide, { type: "cover" }> }) {
  return (
    <div className="relative flex h-full min-h-0 flex-col justify-center overflow-hidden rounded-xl bg-white px-6 py-8 shadow-inner ring-1 ring-slate-200/80 sm:px-10 sm:py-10">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 overflow-hidden"
      >
        <span className="absolute right-[8%] top-[12%] text-4xl font-bold text-sky-200/60 sm:text-5xl">
          +
        </span>
        <span className="absolute bottom-[18%] right-[15%] text-3xl font-bold text-orange-200/70 sm:text-4xl">
          ×
        </span>
        <span className="absolute bottom-[28%] right-[6%] text-2xl font-bold text-violet-200/70 sm:text-3xl">
          ÷
        </span>
        <span className="absolute right-[22%] top-[35%] text-xl text-sky-100 sm:text-2xl">
          ★
        </span>
      </div>

      <div className="relative z-10">
        <p className="text-2xl font-bold italic text-sky-800 sm:text-3xl lg:text-4xl">
          {slide.topic}
        </p>
        <h2 className="mt-2 text-3xl font-bold italic text-slate-900 sm:text-4xl lg:text-5xl">
          {slide.heading}
        </h2>

        <ul className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
          {slide.items.map((item) => (
            <li key={item.label} className="flex items-center gap-3">
              <span
                className={
                  item.highlight
                    ? "h-3 w-3 shrink-0 rotate-45 bg-rose-500 sm:h-3.5 sm:w-3.5"
                    : "h-3 w-3 shrink-0 rotate-45 bg-slate-400 sm:h-3.5 sm:w-3.5"
                }
              />
              <span
                className={
                  item.highlight
                    ? "text-base font-bold tracking-wide text-slate-900 sm:text-lg lg:text-xl"
                    : "text-base font-bold tracking-wide text-slate-700 sm:text-lg lg:text-xl"
                }
              >
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function HistorySlide({ slide }: { slide: Extract<Slide, { type: "history" }> }) {
  return (
    <SlideFrame header={slide.header}>
      <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
        <QuoteBox>{slide.quote}</QuoteBox>

        <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
          {slide.columns.map((column) => (
            <article
              key={column.title}
              className="flex min-h-0 flex-col rounded-xl border border-sky-100 bg-sky-50/40 p-3 sm:p-4"
            >
              <h4 className="text-center text-xs font-bold tracking-wide text-sky-700 sm:text-sm">
                {column.title}
              </h4>
              <div className="mt-2 h-1 rounded-full bg-sky-400" />
              <div className="relative mt-3 flex flex-1 items-center justify-center overflow-hidden rounded-lg bg-white p-2">
                {column.illustration === "roman-numerals" ? (
                  <div className="flex flex-wrap items-center justify-center gap-3 px-2 py-4">
                    {["I", "V", "X", "L", "C", "D", "M"].map((symbol) => (
                      <span
                        key={symbol}
                        className="text-2xl font-bold text-amber-800 sm:text-3xl"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                ) : column.image ? (
                  <Image
                    src={column.image}
                    alt={column.imageAlt ?? column.title}
                    width={320}
                    height={180}
                    className="h-auto max-h-32 w-full object-contain sm:max-h-36"
                  />
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </SlideFrame>
  );
}

function CountingSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "counting" }>;
}) {
  const topRow = Math.ceil(slide.ballCount / 2);
  const bottomRow = slide.ballCount - topRow;

  return (
    <SlideFrame header={slide.header}>
      <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
        <QuoteBox>{slide.quote}</QuoteBox>

        <div className="space-y-2 text-center">
          <SectionTitle>{slide.sectionTitle}</SectionTitle>
          <p className="font-mono text-lg tracking-[0.35em] text-slate-800 sm:text-xl lg:text-2xl">
            {slide.digits}
          </p>
        </div>

        <div className="mt-auto flex flex-col items-center gap-3 sm:gap-4">
          <p className="self-start text-sm font-bold text-sky-700 sm:text-base">
            {slide.visualLabel}
          </p>

          <div className="w-full max-w-md space-y-2">
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {Array.from({ length: topRow }, (_, index) => (
                <div key={`top-${index}`} className="flex flex-col items-center gap-1">
                  <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                    {index + 1}
                  </span>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm sm:h-10 sm:w-10" />
                </div>
              ))}
            </div>
            <div className="grid grid-cols-5 gap-2 sm:gap-3">
              {Array.from({ length: bottomRow }, (_, index) => (
                <div
                  key={`bottom-${index}`}
                  className="flex flex-col-reverse items-center gap-1"
                >
                  <span className="text-xs font-semibold text-slate-600 sm:text-sm">
                    {topRow + index + 1}
                  </span>
                  <span className="h-8 w-8 rounded-full bg-gradient-to-br from-orange-400 to-orange-600 shadow-sm sm:h-10 sm:w-10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function PlaceValueChartSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "place-value-chart" }>;
}) {
  return (
    <SlideFrame header={slide.header}>
      <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-5">
        <QuoteBox>{slide.quote}</QuoteBox>

        <div className="space-y-2 text-center">
          <SectionTitle>{slide.sectionTitle}</SectionTitle>
          <p className="font-mono text-base tracking-[0.3em] text-slate-800 sm:text-lg">
            {slide.digits}
          </p>
        </div>

        <div className="mt-2 flex min-h-0 flex-1 flex-col justify-center">
          <div className="flex items-end justify-center gap-1 sm:gap-2">
            {slide.places.map((place, index) => (
              <div key={place.short} className="flex flex-col items-center">
                {index < slide.places.length - 1 && (
                  <span className="mb-1 text-[10px] font-bold text-sky-500 sm:text-xs">
                    ×10
                  </span>
                )}
                <div className="flex h-16 w-14 flex-col items-center justify-center rounded-t-lg border border-sky-200 bg-sky-50 px-1 sm:h-20 sm:w-20">
                  <span className="text-[10px] font-bold text-sky-700 sm:text-xs">
                    {place.short}
                  </span>
                  <span className="mt-1 text-[9px] text-slate-500 sm:text-[10px]">
                    {formatSpanishNumber(place.value)}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="mx-auto mt-1 h-1.5 w-full max-w-xl rounded-full bg-sky-300" />

          <div className="mt-3 flex flex-wrap justify-center gap-x-4 gap-y-1 text-center text-[10px] text-slate-600 sm:text-xs">
            {slide.places
              .filter((place) => place.value >= 100)
              .map((place) => (
                <span key={place.label}>
                  {formatSpanishNumber(place.value)} unidades → {place.label}
                </span>
              ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function MathExample({
  label,
  digit,
  multiplier,
  result,
}: {
  label: string;
  digit: number;
  multiplier: number;
  result: number;
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] items-center gap-x-3 gap-y-1 sm:grid-cols-[minmax(0,1fr)_auto_auto]">
      <span className="text-sm font-medium text-sky-600 sm:text-base">
        {label}
      </span>
      <span className="hidden text-sky-400 sm:inline">→</span>
      <span className="font-mono text-sm text-slate-800 sm:text-base">
        {digit} × {formatSpanishNumber(multiplier)} ={" "}
        <strong>{formatSpanishNumber(result)}</strong>
      </span>
    </div>
  );
}

function PositionalSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "positional" }>;
}) {
  return (
    <SlideFrame header={slide.header}>
      <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
        <div className="rounded-lg border border-slate-300 bg-slate-50/80 px-4 py-3 sm:px-5 sm:py-4">
          <p className="text-sm leading-relaxed text-slate-800 sm:text-base">
            {slide.definition}
          </p>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <SectionTitle>{slide.sectionTitle}</SectionTitle>
          <div className="space-y-3 sm:space-y-4">
            {slide.examples.map((example) => (
              <MathExample key={example.label} {...example} />
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}

function DecompositionSlide({
  slide,
}: {
  slide: Extract<Slide, { type: "decomposition" }>;
}) {
  return (
    <SlideFrame header={slide.header}>
      <div className="flex min-h-0 flex-1 flex-col gap-4 sm:gap-6">
        <div className="rounded-lg border-2 border-fuchsia-400/80 px-4 py-3 sm:px-5 sm:py-4">
          <p className="mb-2 text-sm font-medium text-slate-800 sm:text-base">
            Para expresar un número usamos el sistema de numeración decimal:
          </p>
          <ul className="list-inside list-disc space-y-1 text-sm text-slate-700 sm:text-base">
            {slide.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>

        <div className="space-y-3 sm:space-y-4">
          <SectionTitle>{slide.sectionTitle}</SectionTitle>
          <div className="space-y-3 sm:space-y-4">
            {slide.examples.map((example) => (
              <MathExample key={example.label} {...example} />
            ))}
          </div>
        </div>
      </div>
    </SlideFrame>
  );
}
