import type { EgyptianSymbolId } from "@/components/lesson/tools/naturales-numeracion/EgyptianNumeralIcon";

export type SistemasHistoriaTabId = "tally" | "egypt" | "roman";

export type SistemasHistoriaToolState = {
  tab: SistemasHistoriaTabId;
  tallyCount: number;
  egyptSymbols: EgyptianSymbolId[];
  romanStr: string;
};

export function createDefaultSistemasHistoriaState(): SistemasHistoriaToolState {
  return {
    tab: "tally",
    tallyCount: 0,
    egyptSymbols: [],
    romanStr: "",
  };
}
