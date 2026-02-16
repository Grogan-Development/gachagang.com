"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, CreditCard, Truck, Check } from "lucide-react";
import { Button, Text } from "@/components/retroui";
import { useMedusaCart } from "@/context/MedusaCartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, isLoading } = useMedusaCart();
  const [step, setStep] = useState<"shipping" | "payment">("shipping");
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  useEffect(() => {
    if (!isLoading && (!cart?.items?.length)) {
      router.push("/shop");
    }
  }, [cart, isLoading, router]);

  const handlePaymentSubmit = async () => {
    setIsProcessing(true);
    setTimeout(() => {
      setOrderComplete(true);
      setIsProcessing(false);
    }, 1500);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-muted-foreground font-mono">Loading...</div>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="min-h-screen flex items-center justify-center py-16">
        <div className="max-w-md mx-auto text-center">
          <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-10 h-10 text-primary-foreground" />
          </div>
          <Text as="h1" className="mb-4">Order Complete!</Text>
          <Text as="p" className="text-muted-foreground mb-8">
            Thank you for your order. Confirmation email coming soon.
          </Text>
          <Button asChild>
            <Link href="/shop">Continue Shopping</Link>
          </Button>
        </div>
      </div>
    );
  }

  const items = cart?.items || [];
  const total = cart?.total ? cart.total / 100 : 0;

  return (
    <div className="min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link href="/shop" className="inline-flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors mb-8">
          <ArrowLeft className="w-4 h-4" /> Continue shopping
        </Link>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          <div>
            <Text as="h1" className="mb-6">Checkout</Text>

            <div className="flex items-center gap-4 mb-8">
              <div className={`flex items-center gap-2 ${step === "shipping" ? "text-primary" : "text-muted-foreground"}`}>
                <Truck className="w-5 h-5" />
                <span className="font-medium">Shipping</span>
              </div>
              <div className="w-8 h-px bg-border" />
              <div className={`flex items-center gap-2 ${step === "payment" ? "text-primary" : "text-muted-foreground"}`}>
                <CreditCard className="w-5 h-5" />
                <span className="font-medium">Payment</span>
              </div>
            </div>

            <form className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input placeholder="First Name" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
                <input placeholder="Last Name" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
              </div>
              <input placeholder="Email" type="email" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
              <input placeholder="Address" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
              <div className="grid sm:grid-cols-3 gap-4">
                <input placeholder="City" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
                <input placeholder="State" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
                <input placeholder="ZIP" className="px-4 py-3 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary w-full" />
              </div>

              <Button
                type="button"
                className="w-full mt-6"
                size="lg"
                disabled={isProcessing}
                onClick={handlePaymentSubmit}
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </Button>
            </form>
          </div>

          <div className="lg:pl-8 lg:border-l border-border">
            <Text as="h3" className="mb-4">Order Summary</Text>
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4">
                  <div className="w-16 h-16 bg-muted rounded border border-border flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <Text as="p" className="font-medium text-sm">{item.title}</Text>
                    <Text as="p" className="text-muted-foreground text-xs font-mono">Qty: {item.quantity}</Text>
                  </div>
                  <Text as="p" className="font-mono font-bold">${((item.unit_price * item.quantity) / 100).toFixed(2)}</Text>
                </div>
              ))}
            </div>
            <div className="border-t border-border pt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-mono">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span className="font-mono">Calculated at next step</span>
              </div>
              <div className="flex justify-between text-lg font-bold pt-2 border-t border-border">
                <span>Total</span>
                <span className="font-mono text-primary">${total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
