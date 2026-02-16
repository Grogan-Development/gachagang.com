import Link from "next/link";
import { Sparkles, Github, Twitter, Instagram, Mail } from "lucide-react";
import { Text } from "@/components/retroui";

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
    ],
  };

  return (
    <footer className="bg-card border-t-2 border-border">
      {/* Main Footer */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded flex items-center justify-center border-2 border-primary">
                <Sparkles className="w-5 h-5 text-primary-foreground" />
              </div>
              <span className="font-display text-2xl font-bold tracking-tight">
                Gacha<span className="text-primary">Gang</span>
              </span>
            </Link>
            <Text as="p" className="text-muted-foreground mb-4 max-w-sm text-sm">
              Your ultimate destination for 80s & 90s anime and pop culture
              merchandise. From Cowboy Bebop to Akira, we got the goods.
            </Text>
            <div className="flex gap-2">
              {[Twitter, Instagram, Github].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded border-2 border-border flex items-center justify-center hover:border-primary hover:text-primary transition-colors"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <Text as="h4" className="font-display font-bold mb-4 text-sm uppercase tracking-wide">
              Shop
            </Text>
            <ul className="space-y-2">
              {footerLinks.shop.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <Text as="h4" className="font-display font-bold mb-4 text-sm uppercase tracking-wide">
              Support
            </Text>
            <ul className="space-y-2">
              {footerLinks.support.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <Text as="h4" className="font-display font-bold mb-4 text-sm uppercase tracking-wide">
              Company
            </Text>
            <ul className="space-y-2">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-muted-foreground hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-border">
          <div className="max-w-md mx-auto text-center">
            <Text as="h4" className="font-display font-bold mb-2">Join the Gang</Text>
            <Text as="p" className="text-muted-foreground text-sm mb-4">
              Subscribe for exclusive drops and early access
            </Text>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="your@email.com"
                className="flex-1 px-4 py-2 rounded border-2 border-input bg-background text-foreground font-mono text-sm focus:outline-none focus:border-primary"
              />
              <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded font-display font-bold text-sm uppercase tracking-wide hover:bg-primary/90 transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-border">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Text as="p" className="text-xs text-muted-foreground font-mono">
              &copy; {currentYear} GachaGang. All rights reserved. See you space cowboy...
            </Text>
            <div className="flex gap-6 text-xs">
              <Link href="/privacy" className="text-muted-foreground hover:text-primary transition-colors">Privacy</Link>
              <Link href="/terms" className="text-muted-foreground hover:text-primary transition-colors">Terms</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
