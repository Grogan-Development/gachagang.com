"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Zap } from "lucide-react";
import { Button } from "@/components/retroui";
import { useMedusaCart } from "@/context/MedusaCartContext";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useMedusaCart();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b-4 border-foreground">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center border-2 border-foreground shadow-md group-hover:shadow-none transition-shadow">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-head text-xl md:text-2xl tracking-tight">
                Retro<span className="text-primary">Vault</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 font-medium hover:bg-muted rounded transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Cart Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-foreground">
                    {totalItems}
                  </span>
                )}
              </Button>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              >
                {isMobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t-2 border-foreground">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 font-medium hover:bg-muted rounded transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}
        </div>

        {/* Marquee Banner */}
        <div className="bg-primary text-primary-foreground py-1 overflow-hidden">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-8 text-sm font-medium">
                FREE SHIPPING ON ORDERS OVER $75 // USE CODE: RETRO20 FOR 20% OFF // NEW ARRIVALS EVERY WEEK // JOIN THE GANG
              </span>
            ))}
          </div>
        </div>
      </header>

      <CartDrawer />

      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          animation: marquee 30s linear infinite;
        }
      `}</style>
    </>
  );
}
