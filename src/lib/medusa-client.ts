import { medusaConfig } from './medusa-config';

export interface Product {
  id: string;
  title: string;
  description: string;
  thumbnail?: string;
  handle?: string;
  variants?: ProductVariant[];
  categories?: ProductCategory[];
  tags?: ProductTag[];
  status: string;
  created_at: string;
  updated_at: string;
}

export interface ProductVariant {
  id: string;
  title: string;
  prices?: ProductPrice[];
  inventory_quantity?: number;
  manage_inventory?: boolean;
  allow_backorder?: boolean;
}

export interface ProductPrice {
  id: string;
  amount: number;
  currency_code: string;
}

export interface ProductCategory {
  id: string;
  name: string;
  handle: string;
}

export interface ProductTag {
  id: string;
  value: string;
}

export interface Cart {
  id: string;
  items: CartItem[];
  region?: Region;
  total?: number;
  currency_code?: string;
}

export interface CartItem {
  id: string;
  title: string;
  quantity: number;
  unit_price: number;
  product_id: string;
  variant_id: string;
  thumbnail?: string;
}

export interface Region {
  id: string;
  name: string;
  currency_code: string;
  tax_rate: number;
}

class MedusaClient {
  private baseUrl: string;

  constructor() {
    this.baseUrl = medusaConfig.baseUrl;
  }

  private async request<T>(
    endpoint: string,
    options?: RequestInit
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      throw new Error(`Medusa API error: ${response.statusText}`);
    }

    return response.json();
  }

  async getProducts(params?: {
    limit?: number;
    offset?: number;
    category_id?: string;
    tags?: string[];
  }): Promise<{ products: Product[]; count: number }> {
    const queryParams = new URLSearchParams();
    if (params?.limit) queryParams.append('limit', params.limit.toString());
    if (params?.offset) queryParams.append('offset', params.offset.toString());
    if (params?.category_id) queryParams.append('category_id[]', params.category_id);
    if (params?.tags) params.tags.forEach(tag => queryParams.append('tags[]', tag));

    return this.request<{ products: Product[]; count: number }>(
      `/store/products?${queryParams.toString()}`
    );
  }

  async getProduct(id: string): Promise<{ product: Product }> {
    return this.request<{ product: Product }>(`/store/products/${id}`);
  }

  async createCart(regionId: string): Promise<{ cart: Cart }> {
    return this.request<{ cart: Cart }>('/store/cart', {
      method: 'POST',
      body: JSON.stringify({ region_id: regionId }),
    });
  }

  async getCart(cartId: string): Promise<{ cart: Cart }> {
    return this.request<{ cart: Cart }>(`/store/carts/${cartId}`);
  }

  async addToCart(
    cartId: string,
    variantId: string,
    quantity: number = 1
  ): Promise<{ cart: Cart }> {
    return this.request<{ cart: Cart }>(`/store/carts/${cartId}/line-items`, {
      method: 'POST',
      body: JSON.stringify({
        variant_id: variantId,
        quantity,
      }),
    });
  }

  async updateCartItem(
    cartId: string,
    itemId: string,
    quantity: number
  ): Promise<{ cart: Cart }> {
    return this.request<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${itemId}`, {
      method: 'POST',
      body: JSON.stringify({ quantity }),
    });
  }

  async removeCartItem(
    cartId: string,
    itemId: string
  ): Promise<{ cart: Cart }> {
    return this.request<{ cart: Cart }>(`/store/carts/${cartId}/line-items/${itemId}`, {
      method: 'DELETE',
    });
  }

  async getRegions(): Promise<{ regions: Region[] }> {
    return this.request<{ regions: Region[] }>('/store/regions');
  }
}

export const medusaClient = new MedusaClient();
