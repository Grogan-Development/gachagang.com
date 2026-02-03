"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, CreditCard, Lock } from "lucide-react";
import { Button, Text, Input, Card, Badge, Separator } from "@/components/retroui";
import { useMedusaCart } from "@/context/MedusaCartContext";

export default function CheckoutPage() {
  const { cart, totalPrice, isLoading } = useMedusaCart();
  const [step, setStep] = useState<"info" | "payment" | "confirm">("info");

  const items = cart?.items || [];
  const shipping = totalPrice >= 75 ? 0 : 9.99;
  const tax = totalPrice * 0.08;
  const total = totalPrice + shipping + tax;

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Text as="p">Loading...</Text>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">🛒</div>
          <Text as="h2" className="mb-4">
            Your cart is empty
          </Text>
          <Button asChild>
            <Link href="/shop">CONTINUE SHOPPING</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b-4 border-foreground py-6">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            <Button variant="ghost" size="sm" asChild>
              <Link href="/shop">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Shop
              </Link>
            </Button>
            <div className="flex items-center gap-2">
              <Lock className="w-4 h-4 text-primary" />
              <Text as="span" className="text-sm">
                Secure Checkout
              </Text>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Progress Steps */}
        <div className="flex justify-center mb-12">
          <div className="flex items-center gap-4">
            {["info", "payment", "confirm"].map((s, i) => (
              <div key={s} className="flex items-center">
                <div
                  className={`w-8 h-8 rounded-full border-2 flex items-center justify-center font-bold ${
                    step === s
                      ? "bg-primary text-primary-foreground border-primary"
                      : i < ["info", "payment", "confirm"].indexOf(step)
                      ? "bg-secondary text-secondary-foreground border-secondary"
                      : "border-muted-foreground text-muted-foreground"
                  }`}
                >
                  {i + 1}
                </div>
                {i < 2 && (
                  <div
                    className={`w-12 h-1 mx-2 ${
                      i < ["info", "payment", "confirm"].indexOf(step)
                        ? "bg-secondary"
                        : "bg-muted"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Form */}
          <div className="lg:col-span-2">
            {step === "info" && (
              <Card className="p-6">
                <Text as="h2" className="mb-6">
                  SHIPPING INFORMATION
                </Text>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      First Name
                    </label>
                    <Input placeholder="Spike" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Last Name
                    </label>
                    <Input placeholder="Spiegel" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input type="email" placeholder="spike@bebop.ship" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium mb-2">
                      Address
                    </label>
                    <Input placeholder="123 Ganymede Station" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      City
                    </label>
                    <Input placeholder="Neo Tokyo" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      State / Province
                    </label>
                    <Input placeholder="Mars" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      ZIP / Postal Code
                    </label>
                    <Input placeholder="20XX" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">
                      Country
                    </label>
                    <select className="w-full px-4 py-2 rounded border-2 border-black shadow-md bg-background">
                      <option>United States</option>
                      <option>Canada</option>
                      <option>United Kingdom</option>
                      <option>Japan</option>
                    </select>
                  </div>
                </div>

                <div className="mt-6 flex justify-end">
                  <Button size="lg" onClick={() => setStep("payment")}>
                    CONTINUE TO PAYMENT
                  </Button>
                </div>
              </Card>
            )}

            {step === "payment" && (
              <Card className="p-6">
                <Text as="h2" className="mb-6">
                  PAYMENT METHOD
                </Text>

                <div className="space-y-4">
                  <div className="p-4 border-2 border-primary rounded bg-primary/5">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="radio"
                        name="payment"
                        defaultChecked
                        className="w-4 h-4"
                      />
                      <CreditCard className="w-5 h-5" />
                      <span className="font-medium">Credit Card</span>
                    </label>
                  </div>

                  <div className="space-y-4 mt-6">
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Card Number
                      </label>
                      <Input placeholder="4242 4242 4242 4242" />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Expiry Date
                        </label>
                        <Input placeholder="MM/YY" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          CVV
                        </label>
                        <Input placeholder="123" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">
                        Name on Card
                      </label>
                      <Input placeholder="SPIKE SPIEGEL" />
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setStep("info")}>
                    BACK
                  </Button>
                  <Button size="lg" onClick={() => setStep("confirm")}>
                    REVIEW ORDER
                  </Button>
                </div>
              </Card>
            )}

            {step === "confirm" && (
              <Card className="p-6">
                <Text as="h2" className="mb-6">
                  REVIEW YOUR ORDER
                </Text>

                <div className="space-y-6">
                  <div>
                    <Text as="h4" className="font-medium mb-2">
                      Shipping Address
                    </Text>
                    <Text as="p" className="text-muted-foreground">
                      Spike Spiegel
                      <br />
                      123 Ganymede Station
                      <br />
                      Neo Tokyo, Mars 20XX
                    </Text>
                  </div>

                  <Separator />

                  <div>
                    <Text as="h4" className="font-medium mb-2">
                      Payment Method
                    </Text>
                    <Text as="p" className="text-muted-foreground">
                      Credit Card ending in 4242
                    </Text>
                  </div>

                  <Separator />

                  <div>
                    <Text as="h4" className="font-medium mb-4">
                      Order Items
                    </Text>
                    <div className="space-y-3">
                      {items.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-4"
                        >
                          <div className="w-16 h-16 bg-muted rounded border-2 border-foreground flex items-center justify-center">
                            <span className="text-2xl">🎮</span>
                          </div>
                          <div className="flex-1">
                            <Text as="h5" className="font-medium">
                              {item.title}
                            </Text>
                            <Text
                              as="p"
                              className="text-sm text-muted-foreground"
                            >
                              Qty: {item.quantity}
                            </Text>
                          </div>
                          <Text as="span" className="font-bold">
                            ${((item.unit_price * item.quantity) / 100).toFixed(2)}
                          </Text>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex justify-between">
                  <Button variant="outline" onClick={() => setStep("payment")}>
                    BACK
                  </Button>
                  <Button size="lg">PLACE ORDER - ${total.toFixed(2)}</Button>
                </div>
              </Card>
            )}
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-28">
              <Text as="h3" className="mb-4">
                ORDER SUMMARY
              </Text>

              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.id}
                    className="flex items-center gap-3"
                  >
                    <div className="w-12 h-12 bg-muted rounded border-2 border-foreground flex items-center justify-center relative">
                      <span className="text-xl">🎮</span>
                      <Badge
                        variant="solid"
                        size="sm"
                        className="absolute -top-2 -right-2 w-5 h-5 p-0 flex items-center justify-center"
                      >
                        {item.quantity}
                      </Badge>
                    </div>
                    <div className="flex-1 min-w-0">
                      <Text
                        as="p"
                        className="text-sm font-medium truncate"
                      >
                        {item.title}
                      </Text>
                    </div>
                    <Text as="span" className="text-sm font-bold">
                      ${((item.unit_price * item.quantity) / 100).toFixed(2)}
                    </Text>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <Text as="span" className="text-muted-foreground">
                    Subtotal
                  </Text>
                  <Text as="span">${totalPrice.toFixed(2)}</Text>
                </div>
                <div className="flex justify-between">
                  <Text as="span" className="text-muted-foreground">
                    Shipping
                  </Text>
                  <Text as="span">
                    {shipping === 0 ? (
                      <span className="text-primary">FREE</span>
                    ) : (
                      `$${shipping.toFixed(2)}`
                    )}
                  </Text>
                </div>
                <div className="flex justify-between">
                  <Text as="span" className="text-muted-foreground">
                    Tax
                  </Text>
                  <Text as="span">${tax.toFixed(2)}</Text>
                </div>
              </div>

              <Separator className="my-4" />

              <div className="flex justify-between items-center">
                <Text as="span" className="font-bold">
                  TOTAL
                </Text>
                <Text as="span" className="text-2xl font-bold text-primary">
                  ${total.toFixed(2)}
                </Text>
              </div>

              {shipping === 0 && (
                <Badge variant="neon" className="w-full justify-center mt-4">
                  🎉 FREE SHIPPING APPLIED
                </Badge>
              )}
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
