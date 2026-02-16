"use client";

import { X, Plus, Minus, Trash2, ShoppingBag, ArrowRight } from "lucide-react";
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
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
        <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l-2 border-border z-50 flex items-center justify-center">
          <Text as="p" className="font-mono text-muted-foreground">Loading cart...</Text>
        </div>
      </>
    );
  }

  return (
    <>
      <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50" onClick={() => setIsCartOpen(false)} />
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-card border-l-2 border-border z-50 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Text as="h2" className="font-display font-bold flex items-center gap-2">
            <ShoppingBag className="w-5 h-5" />
            YOUR CART ({totalItems})
          </Text>
          <Button variant="ghost" size="icon" onClick={() => setIsCartOpen(false)}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground mb-4" />
              <Text as="h3" className="font-display font-bold mb-2">Your cart is empty</Text>
              <Text as="p" className="text-muted-foreground mb-4 text-sm">Add some anime swag to get started</Text>
              <Button onClick={() => setIsCartOpen(false)} asChild variant="retro-pink">
                <Link href="/shop">START SHOPPING</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 p-3 bg-background border-2 border-border rounded hover:border-primary transition-colors">
                  <div className="w-20 h-20 bg-muted rounded border border-border overflow-hidden flex-shrink-0">
                    {item.thumbnail ? (
                      <Image src={item.thumbnail} alt={item.title} width={80} height={80} className="object-cover w-full h-full" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                        <ShoppingBag className="w-6 h-6" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <Text as="h4" className="font-display font-medium text-sm truncate">{item.title}</Text>
                    <Text as="p" className="text-primary font-mono font-bold"></Text>
                    <div className="flex items-center gap-2 mt-2">
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity - 1)} className="h-7 w-7 p-0 border-2">
                        <Minus className="w-3 h-3" />
                      </Button>
                      <span className="w-8 text-center font-mono font-bold">{item.quantity}</span>
                      <Button variant="outline" size="sm" onClick={() => updateQuantity(item.id, item.quantity + 1)} className="h-7 w-7 p-0 border-2">
                        <Plus className="w-3 h-3" />
                      </Button>
                      <Button variant="ghost" size="sm" onClick={() => removeFromCart(item.id)} className="h-7 w-7 p-0 ml-auto text-destructive hover:text-destructive">
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
          <div className="p-4 border-t border-border bg-background">
            <div className="flex justify-between items-center mb-4">
              <Text as="span" className="font-display font-bold uppercase tracking-wide">Subtotal</Text>
              <Text as="span" className="text-xl font-mono font-bold text-primary"></Text>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href="/checkout" onClick={() => setIsCartOpen(false)}>
                CHECKOUT <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </Button>
            <p className="text-center text-xs text-muted-foreground mt-2 font-mono">Shipping & taxes calculated at checkout</p>
          </div>
        )}
      </div>
    </>
  );
}
