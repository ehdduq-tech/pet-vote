const STORAGE_KEY = "pet-app-vote-tickets";
const DATE_KEY = "pet-app-last-ticket-grant";
const DAILY_TICKETS = 3;

type TicketState = {
  tickets: number;
  lastGrantDate: string;
};

function todayString() {
  return new Date().toISOString().slice(0, 10);
}

function readState(): TicketState {
  if (typeof window === "undefined") {
    return { tickets: 0, lastGrantDate: "" };
  }

  try {
    const tickets = Number(localStorage.getItem(STORAGE_KEY) ?? 0);
    const lastGrantDate = localStorage.getItem(DATE_KEY) ?? "";
    return { tickets, lastGrantDate };
  } catch {
    return { tickets: 0, lastGrantDate: "" };
  }
}

function writeState(state: TicketState) {
  try {
    localStorage.setItem(STORAGE_KEY, String(state.tickets));
    localStorage.setItem(DATE_KEY, state.lastGrantDate);
  } catch {
    // ignore
  }
}

/** 하루에 한 번 이상 접속 시 3장의 투표권을 지급 */
export function grantDailyTickets(): number {
  const today = todayString();
  const state = readState();

  if (state.lastGrantDate !== today) {
    const newState = {
      tickets: state.tickets + DAILY_TICKETS,
      lastGrantDate: today,
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

export function returnVoteTicket(): void {
  const state = readState();
  writeState({ ...state, tickets: state.tickets + 1 });
}
