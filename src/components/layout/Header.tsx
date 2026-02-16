"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingCart, Menu, X, Search, Sparkles } from "lucide-react";
import { Button, Input } from "@/components/retroui";
import { useMedusaCart } from "@/context/MedusaCartContext";
import { CartDrawer } from "./CartDrawer";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { totalItems, setIsCartOpen } = useMedusaCart();

  const navLinks = [
    { href: "/", label: "HOME" },
    { href: "/shop", label: "SHOP" },
    { href: "/about", label: "ABOUT" },
  ];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background border-b-2 border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center border-2 border-primary group-hover:shadow-[0_0_15px_rgba(255,56,100,0.5)] transition-shadow">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-xl md:text-2xl font-bold tracking-tight">
                Gacha<span className="text-primary">Gang</span>
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="px-4 py-2 font-display font-medium text-sm uppercase tracking-wide hover:text-primary transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-2">
              {/* Search Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="hidden md:flex"
              >
                <Search className="w-5 h-5" />
              </Button>

              {/* Cart Button */}
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsCartOpen(true)}
                className="relative border-2 border-foreground hover:border-primary hover:text-primary transition-colors"
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems > 0 && (
                  <span className="absolute -top-2 -right-2 w-5 h-5 bg-primary text-primary-foreground text-xs font-bold rounded-full flex items-center justify-center border-2 border-background">
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

          {/* Search Bar */}
          {isSearchOpen && (
            <div className="hidden md:block py-3 border-t border-border animate-fade-in">
              <div className="max-w-md mx-auto">
                <Input
                  type="search"
                  placeholder="Search anime merch, collectibles..."
                  className="w-full"
                />
              </div>
            </div>
          )}

          {/* Mobile Navigation */}
          {isMobileMenuOpen && (
            <nav className="md:hidden py-4 border-t border-border">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-3 font-display font-medium uppercase tracking-wide hover:text-primary transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-3">
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full"
                />
              </div>
            </nav>
          )}
        </div>

        {/* Marquee Banner */}
        <div className="bg-primary text-primary-foreground py-1.5 overflow-hidden border-t border-border">
          <div className="animate-marquee whitespace-nowrap flex">
            {[...Array(4)].map((_, i) => (
              <span key={i} className="mx-8 text-xs font-display font-bold uppercase tracking-wider">
                FREE SHIPPING ON ORDERS OVER  // USE CODE: GANG20 FOR 20% OFF // NEW ANIME DROPS WEEKLY // JOIN THE GANG
              </span>
            ))}
          </div>
        </div>
      </header>

      <CartDrawer />

      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.2s ease-out;
        }
      `}</style>
    </>
  );
}
