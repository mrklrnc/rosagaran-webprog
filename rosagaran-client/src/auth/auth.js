const STORAGE_KEY = 'rosagaran.auth.user';

function getStorage(remember) {
  try {
    return remember ? window.localStorage : window.sessionStorage;
  } catch {
    return null;
  }
}

export function signIn({ email, name, remember = false } = {}) {
  if (!email) throw new Error('Email is required');

  const user = {
    email,
    name: name || email.split('@')[0] || 'User',
    signedInAt: new Date().toISOString(),
  };

  const storage = getStorage(remember);
  storage?.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
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

