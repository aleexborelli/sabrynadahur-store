const PREFIX = "sabryna_store_";

export function readStorage(key, fallback) {
  try {
    const value = localStorage.getItem(PREFIX + key);
    return value ? JSON.parse(value) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage(key, value) {
  localStorage.setItem(PREFIX + key, JSON.stringify(value));
}

export function removeStorage(key) {
  localStorage.removeItem(PREFIX + key);
}
