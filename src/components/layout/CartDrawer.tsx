"use client";

import { X, Plus, Minus, Trash2, ShoppingBag } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button, Text } from "@/components/retroui";
import { useMedusaCart } from "@/context/MedusaCartContext";

export function CartDrawer() {
  const { cart, isLoading, removeFromCart, updateQuantity, isCartOpen, setIsCartOpen } = useMedusaCart();

  if (!isCartOpen) return null;

  const items = cart?.items || [];
  const totalPrice = cart?.total ? cart.total / 100 : 0;
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  if (isLoading) {
    return (
      <>
        <div className="fixed inset-0 bg-black/50 z-50" />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l-4 border-foreground z-50 flex items-center justify-center">
          <Text as="p">Loading cart...</Text>
        </div>
      </>
    );
  }

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={() => setIsCartOpen(false)}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l-4 border-foreground z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b-2 border-foreground">
          <Text as="h2" className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            YOUR CART ({totalItems})
          </Text>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsCartOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <Text as="h3" className="mb-2">
                Your cart is empty
              </Text>
              <Text as="p" className="text-muted-foreground mb-4">
                Looks like you haven&apos;t added anything yet
              </Text>
              <Button onClick={() => setIsCartOpen(false)} asChild>
                <Link href="/shop">START SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-card border-2 border-foreground rounded shadow-md"
                >
                  {/* Product Image */}
                  <div className="w-20 h-20 bg-muted rounded border-2 border-foreground overflow-hidden flex-shrink-0">
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground text-xs">
                      {item.thumbnail ? (
                        <Image
                          src={item.thumbnail}
                          alt={item.title}
                          width={80}
                          height={80}
                          className="object-cover"
                        />
                      ) : (
                        <ShoppingBag className="w-8 h-8" />
                      )}
                    </div>
                  </div>

                  {/* Product Info */}
                  <div className="flex-1 min-w-0">
                    <Text as="h4" className="font-medium text-sm truncate">
                      {item.title}
                    </Text>
                    <Text as="p" className="text-primary font-bold">
                      ${(item.unit_price / 100).toFixed(2)}
                    </Text>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity - 1)
                        }
                        className="h-7 w-7 p-0"
                      >
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-medium">
                        {item.quantity}
                      </span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() =>
                          updateQuantity(item.id, item.quantity + 1)
                        }
                        className="h-7 w-7 p-0"
                      >
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                        className="h-7 w-7 p-0 ml-auto text-destructive"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-4 border-t-2 border-foreground bg-card">
            <div className="flex justify-between items-center mb-4">
              <Text as="span" className="font-medium">
                SUBTOTAL
              </Text>
              <Text as="span" className="text-xl font-bold text-primary">
                ${totalPrice.toFixed(2)}
              </Text>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                CHECKOUT
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2">
              Shipping & taxes calculated at checkout
            </p>
          </div>
        )}
      </div>
    </>
  );
}
