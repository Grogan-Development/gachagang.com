"use client";

import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ShoppingCart,
  Heart,
  Share2,
  Truck,
  Shield,
  RotateCcw,
} from "lucide-react";
import { Button, Text, Badge, Card, Separator } from "@/components/retroui";
import { ProductCard } from "@/components/ProductCard";
import { Product } from "@/lib/medusa-client";
import { useMedusaCart } from "@/context/MedusaCartContext";
import { getProduct } from "@/lib/medusa-products";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const product = await getProduct(id);
  const variant = product?.variants?.[0];
  const inStock = variant?.inventory_quantity && variant.inventory_quantity > 0;
  const price = variant?.prices?.[0]?.amount || 0;

  if (!product) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      {/* Breadcrumb */}
      <div className="bg-card border-b-2 border-foreground py-4">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-2 text-sm">
            <Link href="/" className="text-muted-foreground hover:text-primary">
              Home
            </Link>
            <span className="text-muted-foreground">/</span>
            <Link
              href="/shop"
              className="text-muted-foreground hover:text-primary"
            >
              Shop
            </Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-foreground truncate max-w-[200px]">
              {product.title}
            </span>
          </div>
        </div>
      </div>

      {/* Back Button - Mobile */}
      <div className="lg:hidden container mx-auto px-4 py-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/shop">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Shop
          </Link>
        </Button>
      </div>

      {/* Product Section */}
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="space-y-4">
            <div className="aspect-square bg-card border-4 border-foreground rounded-lg overflow-hidden relative">
              <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-primary/20 to-secondary/20">
                {product.thumbnail ? (
                  <Image
                    src={product.thumbnail}
                    alt={product.title}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <span className="text-8xl">🎮</span>
                )}
              </div>
              {!inStock && (
                <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                  <Badge variant="destructive" size="lg">
                    SOLD OUT
                  </Badge>
                </div>
              )}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            {/* Tags */}
            <div className="flex flex-wrap gap-2">
              {product.tags?.map((tag) => (
                <Badge key={tag.id} variant="outline">
                  {tag.value}
                </Badge>
              ))}
            </div>

            {/* Title & Price */}
            <div>
              <Text as="h1" className="mb-2">
                {product.title}
              </Text>
              <Text as="p" className="text-3xl font-bold text-primary">
                ${(price / 100).toFixed(2)}
              </Text>
            </div>

            {/* Description */}
            <Text as="p" className="text-lg text-muted-foreground">
              {product.description}
            </Text>

            <Separator />

            {/* Stock Status */}
            <div>
              <Text as="span" className="text-muted-foreground">
                {inStock ? "In Stock" : "Out of Stock"}
              </Text>
            </div>

            <Separator />

            {/* Actions */}
            <AddToCartButton productId={id} variantId={variant?.id} disabled={!inStock} />

            <Separator />

            {/* Features */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="flex items-center gap-3 p-3 bg-card border-2 border-foreground rounded">
                <Truck className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <Text as="h5" className="font-medium text-sm">
                    Free Shipping
                  </Text>
                  <Text as="p" className="text-xs text-muted-foreground">
                    On orders $75+
                  </Text>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card border-2 border-foreground rounded">
                <Shield className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <Text as="h5" className="font-medium text-sm">
                    Authentic
                  </Text>
                  <Text as="p" className="text-xs text-muted-foreground">
                    100% genuine
                  </Text>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-card border-2 border-foreground rounded">
                <RotateCcw className="w-6 h-6 text-primary flex-shrink-0" />
                <div>
                  <Text as="h5" className="font-medium text-sm">
                    Easy Returns
                  </Text>
                  <Text as="p" className="text-xs text-muted-foreground">
                    30-day policy
                  </Text>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function AddToCartButton({ productId, variantId, disabled }: { productId: string; variantId?: string; disabled: boolean }) {
  const { addToCart } = useMedusaCart();

  const handleAddToCart = () => {
    if (variantId) {
      addToCart(variantId);
    }
  };

  return (
    <div className="flex gap-4">
      <Button
        size="lg"
        className="flex-1"
        disabled={disabled || !variantId}
        onClick={handleAddToCart}
      >
        <ShoppingCart className="w-5 h-5 mr-2" />
        ADD TO CART
      </Button>
      <Button variant="outline" size="lg">
        <Heart className="w-5 h-5" />
      </Button>
      <Button variant="outline" size="lg">
        <Share2 className="w-5 h-5" />
      </Button>
    </div>
  );
}
