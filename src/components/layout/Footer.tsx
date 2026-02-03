import Link from "next/link";
import { Zap, Github, Twitter, Instagram } from "lucide-react";
import { Text, Separator } from "@/components/retroui";

export function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = {
    shop: [
      { href: "/shop", label: "All Products" },
      { href: "/shop?category=apparel", label: "Apparel" },
      { href: "/shop?category=collectibles", label: "Collectibles" },
      { href: "/shop?category=accessories", label: "Accessories" },
    ],
    support: [
      { href: "/faq", label: "FAQ" },
      { href: "/shipping", label: "Shipping" },
      { href: "/returns", label: "Returns" },
      { href: "/contact", label: "Contact" },
    ],
    company: [
      { href: "/about", label: "About Us" },
      { href: "/blog", label: "Blog" },
      { href: "/careers", label: "Careers" },
      { href: "/press", label: "Press" },
    ],
  };

  return (
    <footer className="bg-card border-t-4 border-foreground">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center border-2 border-foreground shadow-md">
                <Zap className="w-6 h-6 text-primary-foreground" />
              </div>
              <span className="font-head text-2xl tracking-tight">
                Retro<span className="text-primary">Vault</span>
              </span>
            </Link>
            <Text as="p" className="text-muted-foreground mb-4 max-w-sm">
              Your one-stop shop for authentic 80s & 90s anime and pop culture
              merchandise. Join RetroVault and celebrate the golden era of
              entertainment.
            </Text>
            <div className="flex gap-3">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded flex items-center justify-center border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded flex items-center justify-center border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 bg-muted rounded flex items-center justify-center border-2 border-foreground hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <Text as="h4" className="font-head mb-4">
              SHOP
            </Text>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <Text as="h4" className="font-head mb-4">
              SUPPORT
            </Text>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <Text as="h4" className="font-head mb-4">
              COMPANY
            </Text>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <Separator />

      {/* Bottom Footer */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <Text as="p" className="text-sm text-muted-foreground">
            &copy; {currentYear} RetroVault. All rights reserved. See you space
            cowboy...
          </Text>
          <div className="flex gap-6 text-sm">
            <Link
              href="/privacy"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/terms"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
