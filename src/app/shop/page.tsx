import { Suspense } from "react";
import { Button, Text, Badge, Input } from "@/components/retroui";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/medusa-products";

export const dynamic = 'force-dynamic';

async function ShopContent({ searchParams }: { searchParams: { category?: string } }) {
  const category = searchParams.category;
  
  try {
    const products = await getProducts(category ? { category_id: category } : undefined);
    const filteredProducts = category
      ? products.filter((p) => p.categories?.some((c) => c.handle === category))
      : products;

    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-28 space-y-6">
              {/* Categories */}
              <div>
                <Text as="h4" className="font-medium mb-3">
                  CATEGORIES
                </Text>
                <div className="space-y-2">
                  {["all", "apparel", "collectibles", "accessories", "art", "home"].map((cat) => (
                    <button
                      key={cat}
                      className={`w-full text-left px-3 py-2 rounded border-2 transition-all capitalize ${
                        category === cat
                          ? "bg-primary text-primary-foreground border-foreground"
                          : "border-transparent hover:bg-muted"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Info */}
            <div className="flex items-center justify-between mb-6">
              <Text as="p" className="text-muted-foreground">
                Showing {filteredProducts.length} product
                {filteredProducts.length !== 1 ? "s" : ""}
              </Text>
            </div>

            {/* Products Grid */}
            {filteredProducts.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">🔍</div>
                <Text as="h3" className="mb-2">
                  No products found
                </Text>
                <Text as="p" className="text-muted-foreground mb-4">
                  Try adjusting your filters or search query
                </Text>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  } catch (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">⚠️</div>
          <Text as="h3" className="mb-2">
            Unable to load products
          </Text>
          <Text as="p" className="text-muted-foreground mb-4">
            Please check back later or contact support
          </Text>
        </div>
      </div>
    );
  }
}

export default async function ShopPage({
  searchParams,
}: {
  searchParams: { category?: string };
}) {
  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="bg-card border-b-4 border-foreground py-8">
        <div className="container mx-auto px-4">
          <Text as="h1" className="mb-2">
            SHOP
          </Text>
          <Text as="p" className="text-muted-foreground">
            Browse our collection of authentic 80s & 90s merchandise
          </Text>
        </div>
      </div>

      <Suspense fallback={<div className="container mx-auto px-4 py-8">Loading...</div>}>
        <ShopContent searchParams={searchParams} />
      </Suspense>
    </div>
  );
}
