"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { medusaClient, Product } from "@/lib/medusa-client";

const categories = [
  { id: "all", name: "ALL" },
  { id: "apparel", name: "APPAREL" },
  { id: "collectibles", name: "COLLECTIBLES" },
  { id: "accessories", name: "ACCESSORIES" },
  { id: "posters", name: "POSTERS" },
];

function ShopContent() {
  const searchParams = useSearchParams();
  const categoryParam = searchParams.get("category");
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "all");

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const { products: fetchedProducts } = await medusaClient.getProducts();
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredProducts = selectedCategory === "all" 
    ? products 
    : products.filter((p) => p.categories?.some((c: { handle: string }) => c.handle === selectedCategory));

  return (
    <div>
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelectedCategory(cat.id)}
            className={`px-4 py-2 font-display font-bold text-sm border-2 transition-colors ${
              selectedCategory === cat.id
                ? "bg-primary text-primary-foreground border-primary"
                : "border-border hover:border-primary"
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      {loading ? (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="aspect-square bg-muted border-2 border-border animate-pulse" />
          ))}
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="font-display text-2xl font-bold mb-4">No products found</p>
          <button 
            onClick={() => setSelectedCategory("all")}
            className="px-6 py-3 border-2 border-foreground font-display font-bold hover:bg-foreground hover:text-background transition-colors"
          >
            VIEW ALL
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {filteredProducts.map((product) => {
            const price = (product.variants?.[0]?.prices?.[0]?.amount || 0) / 100;
            
            return (
              <Link
                key={product.id}
                href={`/product/${product.id}`}
                className="group"
              >
                <div className="aspect-square bg-muted border-2 border-border mb-4 overflow-hidden group-hover:border-primary transition-colors">
                  {product.thumbnail ? (
                    <img 
                      src={product.thumbnail} 
                      alt={product.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                      ?
                    </div>
                  )}
                </div>
                <h3 className="font-display font-bold mb-1 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                <p className="text-muted-foreground">${price.toFixed(2)}</p>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function ShopPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="font-display text-2xl font-bold tracking-wider">
            GACHA<span className="text-primary">GANG</span>
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <Link href="/shop" className="font-medium text-primary">SHOP</Link>
            <Link href="/about" className="font-medium hover:text-primary transition-colors">ABOUT</Link>
            <Link href="#" className="font-medium hover:text-primary transition-colors">CART (0)</Link>
          </nav>
        </div>
      </header>

      {/* Page Header */}
      <div className="border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-8">
          <h1 className="font-display text-5xl font-black tracking-tight">SHOP</h1>
          <p className="text-muted-foreground mt-2">
            Authentic vintage merch from the golden era.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        <Suspense fallback={<div className="text-center py-16">Loading...</div>}>
          <ShopContent />
        </Suspense>
      </div>

      {/* Footer */}
      <footer className="border-t border-border py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="font-display text-xl font-bold">
              GACHA<span className="text-primary">GANG</span>
            </div>
            <div className="text-sm text-muted-foreground">© 2025</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
