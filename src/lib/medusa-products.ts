import { medusaClient, Product } from './medusa-client';

export async function getProducts(params?: {
  limit?: number;
  offset?: number;
  category_id?: string;
  tags?: string[];
}): Promise<Product[]> {
  const { products } = await medusaClient.getProducts(params);
  return products;
}

export async function getProduct(id: string): Promise<Product | null> {
  try {
    const { product } = await medusaClient.getProduct(id);
    return product;
  } catch (error) {
    return null;
  }
}

export async function getFeaturedProducts(): Promise<Product[]> {
  const { products } = await medusaClient.getProducts({ limit: 4 });
  return products;
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  const { products } = await medusaClient.getProducts({ category_id: categoryId });
  return products;
}
