let authenticatedInSession = false;

const AUTH_KEY = "pet-app-authenticated";

function readAuthFlag(): boolean {
  try {
    return (
      localStorage.getItem(AUTH_KEY) === "true" ||
      sessionStorage.getItem(AUTH_KEY) === "true"
    );
  } catch {
    return false;
  }
}

function writeAuthFlag(): void {
  try {
    localStorage.setItem(AUTH_KEY, "true");
    return;
  } catch {
    // ignore
  }
  try {
    sessionStorage.setItem(AUTH_KEY, "true");
  } catch {
    // ignore
  }
}

function clearAuthFlag(): void {
  try {
    localStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
  try {
    sessionStorage.removeItem(AUTH_KEY);
  } catch {
    // ignore
  }
}

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  if (authenticatedInSession) return true;
  return readAuthFlag();
}

export function login(): void {
  authenticatedInSession = true;
  writeAuthFlag();
}

export function logout(): void {
  authenticatedInSession = false;
  clearAuthFlag();
}
