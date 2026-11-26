import { readStorage, writeStorage } from "./storage";

const KEY = "products";

export function getProducts() {
  return readStorage(KEY, []);
}

export function saveProduct(product) {
  const current = getProducts();
  const exists = current.some((item) => item.id === product.id);
  const next = exists
    ? current.map((item) => item.id === product.id ? { ...product, updatedAt: new Date().toISOString() } : item)
    : [{ ...product, createdAt: new Date().toISOString() }, ...current];
  writeStorage(KEY, next);
  return next;
}

export function deleteProduct(id) {
  const next = getProducts().filter((item) => item.id !== id);
  writeStorage(KEY, next);
  return next;
}

export function setProductStatus(id, active) {
  const next = getProducts().map((item) => item.id === id ? { ...item, active } : item);
  writeStorage(KEY, next);
  return next;
}

export function createProductId() {
  return `prod_${Date.now()}_${Math.random().toString(36).slice(2, 7)}`;
}
