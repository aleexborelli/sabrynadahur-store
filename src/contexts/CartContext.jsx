import { createContext, useContext, useMemo, useState } from "react";
import { readStorage, writeStorage } from "../services/storage";

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => readStorage("cart", []));

  function persist(next) {
    setItems(next);
    writeStorage("cart", next);
  }

  function addItem(product, quantity = 1) {
    persist(items.some((item) => item.id === product.id)
      ? items.map((item) => item.id === product.id
          ? { ...item, quantity: item.quantity + quantity }
          : item)
      : [...items, { ...product, quantity }]);
  }

  function updateQuantity(id, quantity) {
    if (quantity <= 0) return removeItem(id);
    persist(items.map((item) => item.id === id ? { ...item, quantity } : item));
  }

  function removeItem(id) {
    persist(items.filter((item) => item.id !== id));
  }

  function clearCart() {
    persist([]);
  }

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(() => ({
    items, totalItems, subtotal, addItem, updateQuantity, removeItem, clearCart
  }), [items, totalItems, subtotal]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart deve ser usado dentro de CartProvider");
  return context;
}
