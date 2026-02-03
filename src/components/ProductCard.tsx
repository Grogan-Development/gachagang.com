"use client";

import Image from "next/image";
import Link from "next/link";
import { ShoppingCart } from "lucide-react";
import { Button, Card, Badge, Text } from "@/components/retroui";
import { Product } from "@/lib/medusa-client";
import { useMedusaCart } from "@/context/MedusaCartContext";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useMedusaCart();
  const variant = product.variants?.[0];

  const handleAddToCart = () => {
    if (variant) {
      addToCart(variant.id);
    }
  };

  const inStock = variant?.inventory_quantity && variant.inventory_quantity > 0;
  const price = variant?.prices?.[0]?.amount || 0;

  return (
    <Card className="group w-full flex flex-col overflow-hidden">
      {/* Product Image */}
      <Link href={`/product/${product.id}`} className="block relative">
        <div className="aspect-square bg-muted overflow-hidden">
          <div className="w-full h-full flex items-center justify-center relative">
            {product.thumbnail ? (
              <Image
                src={product.thumbnail}
                alt={product.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center">
                <span className="text-4xl">🎮</span>
              </div>
            )}
          </div>
        </div>
        {/* Tags */}
        <div className="absolute top-2 left-2 flex flex-wrap gap-1">
          {!inStock && (
            <Badge variant="destructive" size="sm">
              SOLD OUT
            </Badge>
          )}
        </div>
      </Link>

      {/* Product Info */}
      <Card.Content className="flex-1 flex flex-col gap-2">
        <div className="flex flex-wrap gap-1">
          {product.tags?.slice(0, 2).map((tag) => (
            <Badge key={tag.id} variant="outline" size="sm">
              {tag.value}
            </Badge>
          ))}
        </div>
        <Link href={`/product/${product.id}`}>
          <Text as="h3" className="font-medium hover:text-primary transition-colors line-clamp-2">
            {product.title}
          </Text>
        </Link>
        <Text as="p" className="text-muted-foreground text-sm line-clamp-2">
          {product.description}
        </Text>
      </Card.Content>

      {/* Price and Add to Cart */}
      <Card.Footer className="flex items-center justify-between gap-2 border-t-2 border-foreground">
        <Text as="span" className="text-xl font-bold text-primary">
          ${(price / 100).toFixed(2)}
        </Text>
        <Button
          size="sm"
          disabled={!inStock}
          onClick={(e) => {
            e.preventDefault();
            handleAddToCart();
          }}
        >
          <ShoppingCart className="w-4 h-4 mr-1" />
          ADD
        </Button>
      </Card.Footer>
    </Card>
  );
}
