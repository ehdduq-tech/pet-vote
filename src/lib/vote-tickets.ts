const STORAGE_KEY = "pet-app-vote-tickets";
const DATE_KEY = "pet-app-last-login";
const DAILY_TICKETS = 3;

type TicketState = {
  tickets: number;
  lastLoginDate: string;
};

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function readState(): TicketState {
  if (typeof window === "undefined") {
    return { tickets: DAILY_TICKETS, lastLoginDate: todayString() };
  }

  const tickets = Number(localStorage.getItem(STORAGE_KEY) ?? DAILY_TICKETS);
  const lastLoginDate = localStorage.getItem(DATE_KEY) ?? "";

  return { tickets, lastLoginDate };
}

function writeState(state: TicketState) {
  localStorage.setItem(STORAGE_KEY, String(state.tickets));
  localStorage.setItem(DATE_KEY, state.lastLoginDate);
}

export function grantDailyTickets(): number {
  const today = todayString();
  const state = readState();

  if (state.lastLoginDate !== today) {
    const newState = {
      tickets: state.tickets + DAILY_TICKETS,
      lastLoginDate: today,
    };
    writeState(newState);
    return newState.tickets;
  }

  return state.tickets;
}

export function getVoteTickets(): number {
  return readState().tickets;
}

export function useVoteTicket(): boolean {
  const state = readState();
  if (state.tickets <= 0) return false;

  writeState({ ...state, tickets: state.tickets - 1 });
  return true;
}
