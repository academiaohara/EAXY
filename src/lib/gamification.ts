const GAMIFICATION_KEY = "eaxy-gamification";

export interface GamificationState {
  stars: number;
  streak: number;
  lastVisitDate: string;
}

const DEFAULT_STATE: GamificationState = {
  stars: 0,
  streak: 0,
  lastVisitDate: "",
};

function readState(): GamificationState {
  if (typeof window === "undefined") return DEFAULT_STATE;
  try {
    const raw = localStorage.getItem(GAMIFICATION_KEY);
    return raw ? (JSON.parse(raw) as GamificationState) : DEFAULT_STATE;
  } catch {
    return DEFAULT_STATE;
  }
}

function writeState(state: GamificationState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(GAMIFICATION_KEY, JSON.stringify(state));
}

function todayString(): string {
  return new Date().toISOString().slice(0, 10);
}

function yesterdayString(): string {
  const d = new Date();
  d.setDate(d.getDate() - 1);
  return d.toISOString().slice(0, 10);
}

export function getGamificationState(): GamificationState {
  return readState();
}

export function recordVisit(): GamificationState {
  const state = readState();
  const today = todayString();

  if (state.lastVisitDate === today) return state;

  const newStreak =
    state.lastVisitDate === yesterdayString() ? state.streak + 1 : 1;

  const updated: GamificationState = {
    ...state,
    streak: newStreak,
    lastVisitDate: today,
  };

  writeState(updated);
  return updated;
}

export function awardLessonStars(stars: number): GamificationState {
  const state = readState();
  const updated: GamificationState = {
    ...state,
    stars: state.stars + stars,
  };
  writeState(updated);
  return updated;
}

export function calculateLessonStars(
  hintsUsed: number,
  incorrectAttempts: number,
): number {
  if (incorrectAttempts === 0 && hintsUsed === 0) return 3;
  if (incorrectAttempts <= 1 && hintsUsed <= 1) return 2;
  return 1;
}
