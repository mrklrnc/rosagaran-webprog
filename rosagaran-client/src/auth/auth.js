const STORAGE_KEY = "rosagaran.auth.user";

function normalizeRole(role) {
  return typeof role === "string" ? role.trim().toLowerCase() : "";
}

function getStorage(remember) {
  try {
    return remember ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function signIn({ user, token, remember = false } = {}) {
  if (!user?.email) throw new Error("User data is required");

  const nextUser = {
    ...user,
    type: normalizeRole(user.type),
    token,
    remember,
    signedInAt: new Date().toISOString(),
  };

  signOut();
  const storage = getStorage(remember);
  storage?.setItem(STORAGE_KEY, JSON.stringify(nextUser));
  return nextUser;
}

export function signOut() {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
  try {
    window.sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}

export function getCurrentUser() {
  const from = (storage) => {
    try {
      const raw = storage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  };

  return from(window.localStorage) || from(window.sessionStorage);
}

export function isAuthenticated() {
  return Boolean(getCurrentUser()?.token);
}

export function hasRole(user, allowedRoles = []) {
  if (!allowedRoles.length) return true;
  const userRole = normalizeRole(user?.type);
  return allowedRoles.map(normalizeRole).includes(userRole);
}
