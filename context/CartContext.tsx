"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import { Item, Property } from "@/lib/flowData";

export interface CartEntry {
  item: Item;
}

interface AddResult {
  success: boolean;
  conflict: boolean;
  message: string;
}

interface CartContextType {
  cartItems: CartEntry[];
  cartProperty: Property | null;
  addToCart: (item: Item, property: Property) => AddResult;
  removeFromCart: (itemId: string) => void;
  clearCart: () => void;
  isInCart: (itemId: string) => boolean;
  cartCount: number;
  subtotal: number;
  estimatedSavings: number;
}

const CartContext = createContext<CartContextType | null>(null);

const CART_ITEMS_KEY = "passon_cart_items";
const CART_PROPERTY_KEY = "passon_cart_property";

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartEntry[]>([]);
  const [cartProperty, setCartProperty] = useState<Property | null>(null);
  const [hydrated, setHydrated] = useState(false);

  // Rehydrate from localStorage on mount
  useEffect(() => {
    try {
      const storedItems = localStorage.getItem(CART_ITEMS_KEY);
      const storedProperty = localStorage.getItem(CART_PROPERTY_KEY);
      if (storedItems) setCartItems(JSON.parse(storedItems));
      if (storedProperty) setCartProperty(JSON.parse(storedProperty));
    } catch {
      // Silently ignore parse errors
    }
    setHydrated(true);
  }, []);

  // Persist cart items
  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  // Persist cart property
  useEffect(() => {
    if (!hydrated) return;
    if (cartProperty) {
      localStorage.setItem(CART_PROPERTY_KEY, JSON.stringify(cartProperty));
    } else {
      localStorage.removeItem(CART_PROPERTY_KEY);
    }
  }, [cartProperty, hydrated]);

  const addToCart = useCallback(
    (item: Item, property: Property): AddResult => {
      // Block mixing items from different properties
      if (cartProperty && cartProperty.id !== property.id) {
        return {
          success: false,
          conflict: true,
          message: `Your cart has items from ${cartProperty.name}. Clear it first to browse a different property.`,
        };
      }
      // Prevent duplicates
      if (cartItems.some((e) => e.item.id === item.id)) {
        return {
          success: false,
          conflict: false,
          message: "Already in your request.",
        };
      }
      setCartItems((prev) => [...prev, { item }]);
      setCartProperty(property);
      return { success: true, conflict: false, message: "Added to your request!" };
    },
    [cartItems, cartProperty]
  );

  const removeFromCart = useCallback((itemId: string) => {
    setCartItems((prev) => {
      const next = prev.filter((e) => e.item.id !== itemId);
      if (next.length === 0) setCartProperty(null);
      return next;
    });
  }, []);

  const clearCart = useCallback(() => {
    setCartItems([]);
    setCartProperty(null);
    localStorage.removeItem(CART_ITEMS_KEY);
    localStorage.removeItem(CART_PROPERTY_KEY);
  }, []);

  const isInCart = useCallback(
    (itemId: string) => cartItems.some((e) => e.item.id === itemId),
    [cartItems]
  );

  const subtotal = cartItems.reduce((sum, e) => sum + e.item.price, 0);

  const estimatedSavings = cartItems.reduce((sum, e) => {
    if (e.item.estimatedOriginalPrice) {
      return sum + (e.item.estimatedOriginalPrice - e.item.price);
    }
    return sum;
  }, 0);

  const cartCount = cartItems.length;

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartProperty,
        addToCart,
        removeFromCart,
        clearCart,
        isInCart,
        cartCount,
        subtotal,
        estimatedSavings,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
