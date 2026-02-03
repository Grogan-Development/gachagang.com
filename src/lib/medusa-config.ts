export const medusaConfig = {
  baseUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
  publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || '',
};

export const apiRoutes = {
  products: '/store/products',
  product: (id: string) => `/store/products/${id}`,
  cart: '/store/cart',
  cartId: (id: string) => `/store/carts/${id}`,
  regions: '/store/regions',
  payment: '/store/payment',
  checkout: '/store/checkout',
};
