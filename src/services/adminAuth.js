import { readStorage, writeStorage, removeStorage } from "./storage";

// Demonstração local. Em produção, autenticação e senha devem ficar no backend.
const SESSION_KEY = "admin_session";
const DEFAULT_USER = "admin";
const DEFAULT_PASSWORD = "Sabryna@2026";

export function loginAdmin(username, password) {
  const configured = readStorage("admin_credentials", {
    username: DEFAULT_USER,
    password: DEFAULT_PASSWORD
  });
  if (username.trim() !== configured.username || password !== configured.password) return false;
  writeStorage(SESSION_KEY, { username: configured.username, loggedAt: new Date().toISOString() });
  return true;
}

export function isAdminLoggedIn() {
  return Boolean(readStorage(SESSION_KEY, null));
}

export function logoutAdmin() {
  removeStorage(SESSION_KEY);
}

export function changeAdminCredentials(currentPassword, username, newPassword) {
  const current = readStorage("admin_credentials", {
    username: DEFAULT_USER,
    password: DEFAULT_PASSWORD
  });
  if (current.password !== currentPassword || !username.trim() || newPassword.length < 8) return false;
  writeStorage("admin_credentials", { username: username.trim(), password: newPassword });
  return true;
}

export function getAdminUsername() {
  return readStorage("admin_credentials", { username: DEFAULT_USER }).username;
}
