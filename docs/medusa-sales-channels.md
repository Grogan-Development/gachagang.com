# MedusaJS Cloud Sales Channels Documentation

## Overview

This document explains how we use MedusaJS Cloud Sales Channels to manage multiple storefronts (RetroVault, Grogan-Engrave.com, and future channels) from a single backend.

## What are Sales Channels?

Sales Channels in MedusaJS Cloud allow you to:
- **Separate product catalogs** per storefront
- **Control pricing** independently per channel
- **Manage inventory** across multiple stores
- **Route orders** to the correct channel
- **Customize availability** per storefront

## Our Sales Channels

### 1. Default Channel: Grogan-Engrave.com
- **Purpose**: Custom engraving e-commerce
- **Products**: Engraved items, custom products
- **Pricing**: Custom engraving pricing
- **Inventory**: Managed per product

### 2. RetroVault Channel
- **Purpose**: Retro 80s/90s pop culture merchandise
- **Products**: Apparel, collectibles, accessories
- **Pricing**: Standard retail pricing
- **Inventory**: Managed per product

### 3. Future Channels
- Wholesale channel (B2B)
- Marketplace integrations (Etsy, Amazon, etc.)
- Regional storefronts (different currencies)

## Product Assignment Strategy

### Channel-Specific Products
Products are assigned to specific sales channels using one of these methods:

#### Method 1: Product Tags
```typescript
// Products tagged with their sales channel
{
  "handle": "cowboy-bebop-t-shirt",
  "tags": ["retrovault", "apparel", "cowboy-bebop"],
  "sales_channels": ["retrovault-channel-id"]
}
```

#### Method 2: Sales Channel Linking
```typescript
// Link products to sales channels via API
await medusaClient.admin.products.create({
  title: "Akira Poster",
  sales_channels: [
    {
      id: "retrovault-channel-id"
    }
  ]
});
```

#### Method 3: Collections
```typescript
// Collections mapped to sales channels
{
  "handle": "retrovault-collection",
  "sales_channels": ["retrovault-channel-id"],
  "products": [...]
}
```

## API Usage Patterns

### Fetching Products by Sales Channel

```typescript
import { sdk } from '@/lib/config';

// Fetch products for RetroVault channel
const { products } = await sdk.store.products.list({
  sales_channel_id: process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID
});
```

### Filtering Products in Frontend

```typescript
// src/lib/medusa-products.ts
export async function getProductsForChannel(channelId: string) {
  const { products } = await medusaClient.getProducts({
    sales_channel_id: channelId
  });
  return products;
}
```

### Setting Sales Channel IDs

```typescript
// .env.local
NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID=retrovault-channel-id
MEDUSA_SALES_CHANNEL_ID=retrovault-channel-id

# For Grogan-Engrave.com
NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID=grogan-engrave-channel-id
MEDUSA_SALES_CHANNEL_ID=grogan-engrave-channel-id
```

## Channel Configuration

### RetroVault Channel Setup

```typescript
// src/lib/medusa-config.ts
export const SALES_CHANNEL_ID = process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID || 'retrovault-default';

export const CHANNEL_CONFIG = {
  retrovault: {
    id: process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID,
    name: 'RetroVault',
    currency: 'USD',
    regions: ['us'],
    default_region: 'us'
  },
  groganEngrave: {
    id: 'grogan-engrave-channel-id',
    name: 'Grogan Engrave',
    currency: 'USD',
    regions: ['us'],
    default_region: 'us'
  }
};
```

## Product Upload with Sales Channels

### CSV Format
```csv
handle,title,description,tags,sales_channel_id
cowboy-bebop-t-shirt,Cowboy Bebop T-Shirt,Authentic anime apparel,"retrovault,apparel",retrovault-channel-id
custom-engraved-mug,Custom Engraved Mug,Personalized engraving,"grogan-engrave,custom",grogan-engrave-channel-id
```

### Upload Script
```typescript
// src/scripts/upload-products.ts
const salesChannelId = process.env.MEDUSA_SALES_CHANNEL_ID || 'retrovault-default';

await medusaClient.admin.products.create({
  handle: product.handle,
  title: product.title,
  sales_channels: [
    {
      id: salesChannelId
    }
  ]
});
```

## Order Routing

Orders are automatically associated with the sales channel they were created from:

```typescript
// Order created from RetroVault
{
  "order": {
    "sales_channel_id": "retrovault-channel-id",
    "items": [...],
    "total": 99.99
  }
}
```

## Benefits of Multi-Channel Architecture

1. **Single Backend**: One MedusaJS Cloud instance powers all storefronts
2. **Shared Inventory**: Track inventory across all channels in real-time
3. **Centralized Management**: Manage products, orders, and customers from one admin
4. **Flexible Pricing**: Set different prices per channel (retail vs wholesale)
5. **Scalable**: Add new channels without backend changes
6. **Consistent Data**: Same product data across all storefronts

## Common Patterns

### Channel-Aware Product Fetching
```typescript
// src/lib/medusa-products.ts
export async function getProducts() {
  const channelId = process.env.NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID;
  const { products } = await medusaClient.getProducts({
    sales_channel_id: channelId
  });
  return products;
}
```

### Cross-Channel Product Sync
```typescript
// Sync a product to multiple channels
async function syncProductToChannels(productId: string, channels: string[]) {
  await medusaClient.admin.products.update(productId, {
    sales_channels: channels.map(id => ({ id }))
  });
}
```

### Channel-Specific Pricing
```typescript
// Set different prices per channel
await medusaClient.admin.products.update(productId, {
  prices: [
    {
      amount: 2999,
      currency_code: 'USD',
      sales_channel_id: 'retrovault-channel-id'
    },
    {
      amount: 2499,
      currency_code: 'USD',
      sales_channel_id: 'wholesale-channel-id'
    }
  ]
});
```

## Environment Variables

### RetroVault (.env.local)
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://grogan-engrave.medusajs.app
NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID=retrovault-channel-id
MEDUSA_SALES_CHANNEL_ID=retrovault-channel-id
```

### Grogan-Engrave.com (.env.local)
```env
NEXT_PUBLIC_MEDUSA_BACKEND_URL=https://grogan-engrave.medusajs.app
NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID=grogan-engrave-channel-id
MEDUSA_SALES_CHANNEL_ID=grogan-engrave-channel-id
```

## Admin Panel Configuration

1. **Navigate to Settings** → **Sales Channels**
2. **Create new channel** for RetroVault (if not exists)
3. **Copy channel ID** to `.env.local`
4. **Assign products** to the channel
5. **Set pricing** per channel if needed

## Testing

### Verify Channel Assignment
```bash
# Test connection and channel
bun run test-medusa
```

### Check Product Channel
```typescript
// src/scripts/inspect-product.ts
const product = await medusaClient.getProduct(productId);
console.log('Sales Channels:', product.sales_channels);
```

## Troubleshooting

### Products Not Showing
- Verify `NEXT_PUBLIC_MEDUSA_SALES_CHANNEL_ID` is set
- Check product has sales channel assigned in admin
- Ensure channel is active in Medusa admin

### Wrong Products Loading
- Confirm correct channel ID in environment variables
- Check product sales channel assignments
- Verify API calls include `sales_channel_id` parameter

### Orders Not Routing
- Ensure sales channel ID is set on storefront
- Check order creation includes sales channel context
- Verify MedusaJS Cloud has channel configured

## Future Enhancements

- [ ] Channel-specific promotions/discounts
- [ ] Multi-currency support per channel
- [ ] Channel-specific shipping rules
- [ ] Inventory reservation per channel
- [ ] Channel analytics and reporting
