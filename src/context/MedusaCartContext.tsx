"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { medusaClient, Cart, CartItem } from "@/lib/medusa-client";

interface MedusaCartContextType {
  cart: Cart | null;
  cartId: string | null;
  isLoading: boolean;
  addToCart: (variantId: string, quantity?: number) => Promise<void>;
  removeFromCart: (itemId: string) => Promise<void>;
  updateQuantity: (itemId: string, quantity: number) => Promise<void>;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const MedusaCartContext = createContext<MedusaCartContextType | undefined>(undefined);

export function MedusaCartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart | null>(null);
  const [cartId, setCartId] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCartId = localStorage.getItem("retrovault-cart-id");
    if (savedCartId) {
      setCartId(savedCartId);
      loadCart(savedCartId);
    } else {
      setIsLoading(false);
    }
  }, []);

  const loadCart = async (id: string) => {
    try {
      const { cart: loadedCart } = await medusaClient.getCart(id);
      setCart(loadedCart);
    } catch (error) {
      console.error("Failed to load cart:", error);
      localStorage.removeItem("retrovault-cart-id");
      setCartId(null);
    } finally {
      setIsLoading(false);
    }
  };

  const createCart = async () => {
    try {
      const { regions } = await medusaClient.getRegions();
      const regionId = regions[0]?.id;
      
      if (regionId) {
        const { cart: newCart } = await medusaClient.createCart(regionId);
        setCart(newCart);
        setCartId(newCart.id);
        localStorage.setItem("retrovault-cart-id", newCart.id);
      }
    } catch (error) {
      console.error("Failed to create cart:", error);
    }
  };

  const ensureCartExists = async () => {
    if (!cartId) {
      await createCart();
    } else if (!cart) {
      await loadCart(cartId);
    }
  };

  const addToCart = async (variantId: string, quantity = 1) => {
    await ensureCartExists();
    
    if (!cartId) {
      console.error("No cart available");
      return;
    }

    try {
      const { cart: updatedCart } = await medusaClient.addToCart(cartId, variantId, quantity);
      setCart(updatedCart);
      setIsCartOpen(true);
    } catch (error) {
      console.error("Failed to add to cart:", error);
    }
  };

  const removeFromCart = async (itemId: string) => {
    if (!cartId) return;

    try {
      const { cart: updatedCart } = await medusaClient.removeCartItem(cartId, itemId);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to remove from cart:", error);
    }
  };

  const updateQuantity = async (itemId: string, quantity: number) => {
    if (!cartId) return;

    if (quantity <= 0) {
      await removeFromCart(itemId);
      return;
    }

    try {
      const { cart: updatedCart } = await medusaClient.updateCartItem(cartId, itemId, quantity);
      setCart(updatedCart);
    } catch (error) {
      console.error("Failed to update quantity:", error);
    }
  };

  const clearCart = () => {
    setCart(null);
    setCartId(null);
    localStorage.removeItem("retrovault-cart-id");
  };

  const totalItems = cart?.items?.reduce((sum, item) => sum + item.quantity, 0) || 0;
  const totalPrice = cart?.total ? cart.total / 100 : 0;

  return (
    <MedusaCartContext.Provider
      value={{
        cart,
        cartId,
        isLoading,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
        isCartOpen,
        setIsCartOpen,
      }}
    >
      {children}
    </MedusaCartContext.Provider>
  );
}

export function useMedusaCart() {
  const context = useContext(MedusaCartContext);
  if (!context) {
    throw new Error("useMedusaCart must be used within a MedusaCartProvider");
  }
  return context;
}
