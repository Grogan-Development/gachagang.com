import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold tracking-wider">
            GACHA<span className="text-primary">GANG</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="font-medium hover:text-primary transition-colors">SHOP</Link>
            <Link href="/about" className="font-medium hover:text-primary transition-colors">ABOUT</Link>
            <Link href="#" className="font-medium hover:text-primary transition-colors">CART (0)</Link>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[70vh] flex items-center justify-center noise-bg">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="font-display text-6xl md:text-8xl lg:text-9xl font-black tracking-tight mb-6">
            <span className="block">80S PUNK</span>
            <span className="block text-primary">90S GRUNGE</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Authentic vintage merch. No reproductions. Real collectors know.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-8 py-4 bg-primary text-primary-foreground font-display font-bold text-lg hover:opacity-90 transition-opacity"
            >
              SHOP NOW <ArrowRight className="w-5 h-5" />
            </Link>
            <Link
              href="/about"
              className="inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground font-display font-bold text-lg hover:bg-foreground hover:text-background transition-colors"
            >
              OUR STORY
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-8">SHOP BY CATEGORY</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "APPAREL", href: "/shop?category=apparel" },
              { name: "COLLECTIBLES", href: "/shop?category=collectibles" },
              { name: "ACCESSORIES", href: "/shop?category=accessories" },
              { name: "POSTERS", href: "/shop?category=posters" },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={cat.href}
                className="group aspect-square border-2 border-border flex items-center justify-center hover:border-primary transition-colors"
              >
                <span className="font-display font-bold text-xl group-hover:text-primary transition-colors">
                  {cat.name}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 border-t border-border">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-display text-4xl font-bold mb-8">NEW ARRIVALS</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="group">
                <div className="aspect-square bg-muted border-2 border-border mb-4 overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                    Product {i}
                  </div>
                </div>
                <h3 className="font-display font-bold mb-1">Product Name {i}</h3>
                <p className="text-muted-foreground">$49.99</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 border-t border-border">
        <div className="max-w-xl mx-auto px-4 text-center">
          <h2 className="font-display text-3xl font-bold mb-4">JOIN THE GANG</h2>
          <p className="text-muted-foreground mb-6">
            Get exclusive drops and early access to new releases.
          </p>
          <form className="flex gap-2">
            <input
              type="email"
              placeholder="your@email.com"
              className="flex-1 px-4 py-3 bg-background border-2 border-border focus:outline-none focus:border-primary"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-primary text-primary-foreground font-display font-bold hover:opacity-90 transition-opacity"
            >
              SUBSCRIBE
            </button>
          </form>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-display text-xl font-bold">
              GACHA<span className="text-primary">GANG</span>
            </div>
            <div className="flex gap-6 text-sm text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Instagram</a>
              <a href="#" className="hover:text-primary transition-colors">Twitter</a>
              <a href="#" className="hover:text-primary transition-colors">TikTok</a>
            </div>
            <div className="text-sm text-muted-foreground">© 2025</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
