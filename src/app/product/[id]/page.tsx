"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ShoppingCart, Minus, Plus, Check, ArrowUpRight } from "lucide-react";
import { medusaClient, Product } from "@/lib/medusa-client";
import { useMedusaCart } from "@/context/MedusaCartContext";

export default function ProductPage() {
  const params = useParams();
  const { addToCart } = useMedusaCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    if (params.id) {
      loadProduct();
    }
  }, [params.id]);

  const loadProduct = async () => {
    try {
      const { product: fetchedProduct } = await medusaClient.getProduct(params.id as string);
      setProduct(fetchedProduct);
      if (fetchedProduct.variants?.[0]) {
        setSelectedVariant(fetchedProduct.variants[0].id);
      }
    } catch (error) {
      console.error("Failed to load product:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddToCart = async () => {
    if (!selectedVariant) return;
    await addToCart(selectedVariant, quantity);
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const price = (product?.variants?.[0]?.prices?.[0]?.amount || 0);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="font-display font-black text-4xl animate-pulse">LOADING...</div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="font-display font-black text-6xl text-muted-foreground">404</div>
        <p className="font-mono text-sm mt-4">Product not found</p>
        <Link href="/shop" className="mt-6 px-6 py-3 border-2 border-foreground font-display font-bold hover:bg-primary hover:text-primary-foreground transition-colors">
          BACK TO SHOP
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute top-[5%] right-[-10%] w-[40%] h-[50%] bg-primary/5 rotate-12 blur-3xl" />
        <div className="absolute bottom-[10%] left-[-10%] w-[30%] h-[40%] bg-cyan-500/5 -rotate-12 blur-3xl" />
      </div>

      <div className="relative z-10">
        {/* Header */}
        <header className="p-4 md:p-6">
          <div className="flex items-start justify-between">
            <Link href="/" className="group -rotate-2 hover:rotate-0 transition-transform duration-300">
              <div className="text-2xl md:text-3xl font-display font-black leading-none">
                <span className="block">GACHA</span>
                <span className="block text-primary">GANG</span>
              </div>
            </Link>
            
            <Link href="/shop" className="flex items-center gap-2 font-display font-bold text-sm hover:text-primary transition-colors">
              <ArrowLeft className="w-4 h-4" />
              SHOP
            </Link>
          </div>
        </header>

        {/* Product Content - Asymmetric Layout */}
        <div className="px-4 md:px-6 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Image - Takes 7 cols on large */}
            <div className="lg:col-span-7 lg:-ml-6">
              <div className="relative aspect-square border-2 border-foreground bg-muted overflow-hidden group -rotate-1 hover:rotate-0 transition-transform duration-300">
                {product.thumbnail ? (
                  <img 
                    src={product.thumbnail} 
                    alt={product.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-black text-8xl text-muted">?</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-background/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              </div>
            </div>

            {/* Info - Takes 5 cols, offset styling */}
            <div className="lg:col-span-5 lg:mt-12">
              {/* Category badge */}
              <div className="flex items-center gap-2 mb-4">
                <span className="px-2 py-1 bg-primary text-primary-foreground font-mono text-xs font-bold">
                  {product.categories?.[0]?.name?.toUpperCase() || "MISC"}
                </span>
                <span className="font-mono text-xs text-muted-foreground">
                  ID: {product.id.slice(-6)}
                </span>
              </div>

              {/* Title */}
              <h1 className="font-display font-black text-4xl md:text-5xl lg:text-6xl leading-[0.9] mb-6">
                {product.title.toUpperCase()}
              </h1>

              {/* Price - Large */}
              <div className="mb-8">
                <span className="font-display font-black text-5xl md:text-6xl text-primary">
                  ${(price / 100).toFixed(2)}
                </span>
              </div>

              {/* Description */}
              <p className="font-mono text-sm text-muted-foreground leading-relaxed mb-8 max-w-md">
                {product.description || "No description available."}
              </p>

              {/* Variant Selection */}
              {product.variants && product.variants.length > 1 && (
                <div className="mb-6">
                  <span className="font-display font-bold text-sm block mb-3">VARIANT</span>
                  <div className="flex flex-wrap gap-2">
                    {product.variants.map((variant) => (
                      <button
                        key={variant.id}
                        onClick={() => setSelectedVariant(variant.id)}
                        className={`px-4 py-2 border-2 font-mono text-sm transition-all ${
                          selectedVariant === variant.id
                            ? 'bg-primary text-primary-foreground border-primary'
                            : 'border-foreground hover:border-primary'
                        }`}
                      >
                        {variant.title}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <span className="font-display font-bold text-sm block mb-3">QTY</span>
                <div className="flex items-center gap-0">
                  <button 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <div className="w-16 h-12 border-y-2 border-foreground flex items-center justify-center font-mono font-bold">
                    {quantity}
                  </div>
                  <button 
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 border-2 border-foreground flex items-center justify-center hover:bg-muted transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Add to Cart */}
              <button
                onClick={handleAddToCart}
                disabled={addedToCart}
                className={`w-full py-4 font-display font-black text-xl border-2 transition-all flex items-center justify-center gap-2 ${
                  addedToCart
                    ? 'bg-green-500 text-white border-green-500'
                    : 'bg-primary text-primary-foreground border-primary hover:shadow-[4px_4px_0_0_var(--foreground)]'
                }`}
              >
                {addedToCart ? (
                  <><Check className="w-6 h-6" /> ADDED</>
                ) : (
                  <><ShoppingCart className="w-6 h-6" /> ADD TO CART</>
                )}
              </button>

              {/* Trust badges */}
              <div className="mt-8 pt-8 border-t-2 border-border">
                <div className="grid grid-cols-2 gap-4 font-mono text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-primary rounded-full" />
                    FREE SHIPPING
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-cyan-500 rounded-full" />
                    AUTHENTIC
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-yellow-400 rounded-full" />
                    2-5 DAY DELIVERY
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-purple-500 rounded-full" />
                    SECURE CHECKOUT
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related/You Might Like - Minimal */}
        <div className="px-4 md:px-6 py-12 border-t-2 border-border">
          <div className="flex items-center justify-between mb-8">
            <h2 className="font-display font-black text-2xl md:text-3xl -rotate-1">YOU MIGHT LIKE</h2>
            <Link href="/shop" className="font-display font-bold text-sm flex items-center gap-1 hover:text-primary transition-colors">
              VIEW ALL <ArrowUpRight className="w-4 h-4" />
            </Link>
          </div>
          <p className="font-mono text-sm text-muted-foreground">
            More drops coming soon...
          </p>
        </div>

        {/* Footer */}
        <footer className="border-t-2 border-border px-4 md:px-6 py-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div className="font-display font-black text-lg">
              GACHA<span className="text-primary">GANG</span>
            </div>
            <div className="font-mono text-xs text-muted-foreground">© 2025</div>
          </div>
        </footer>
      </div>
    </div>
  );
}
