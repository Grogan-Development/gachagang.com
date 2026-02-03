import { Product as MedusaProduct } from './medusa-client';

// Original hardcoded products
export const originalProducts = [
  {
    id: "1",
    name: "Spike Spiegel Bounty Hunter Tee",
    description: "See you space cowboy... Premium cotton tee featuring the legendary bounty hunter from Cowboy Bebop. Distressed vintage print.",
    price: 34.99,
    image: "/products/spike-tee.jpg",
    category: "apparel",
    tags: ["cowboy bebop", "anime", "90s"],
    inStock: true,
    featured: true,
  },
  {
    id: "2",
    name: "Neo-Tokyo Akira Bomber Jacket",
    description: "Channel your inner Kaneda with this iconic red bomber jacket. Detailed patches and embroidery.",
    price: 149.99,
    image: "/products/akira-jacket.jpg",
    category: "apparel",
    tags: ["akira", "anime", "80s"],
    inStock: true,
    featured: true,
  },
  {
    id: "3",
    name: "Godzilla King of Monsters Figure",
    description: "Highly detailed 12-inch collectible figure of the King of Monsters. Limited edition with certificate.",
    price: 89.99,
    image: "/products/godzilla-figure.jpg",
    category: "collectibles",
    tags: ["godzilla", "kaiju", "classic"],
    inStock: true,
    featured: true,
  },
  {
    id: "4",
    name: "DeLorean Time Machine Die-Cast",
    description: "1:24 scale die-cast model of Doc Brown's time-traveling DeLorean. Includes flux capacitor LED lights.",
    price: 64.99,
    image: "/products/delorean.jpg",
    category: "collectibles",
    tags: ["back to the future", "80s", "movies"],
    inStock: true,
    featured: true,
  },
  {
    id: "5",
    name: "Evangelion Unit-01 Hoodie",
    description: "Get in the robot, Shinji! Purple and green hoodie inspired by the iconic Eva Unit-01.",
    price: 79.99,
    image: "/products/eva-hoodie.jpg",
    category: "apparel",
    tags: ["evangelion", "anime", "90s"],
    inStock: true,
    featured: false,
  },
  {
    id: "6",
    name: "Ghost in the Shell Cyberpunk Poster",
    description: "Premium art print featuring Major Kusanagi. Metallic finish, 24x36 inches.",
    price: 29.99,
    image: "/products/gits-poster.jpg",
    category: "art",
    tags: ["ghost in the shell", "anime", "90s"],
    inStock: true,
    featured: false,
  },
  {
    id: "7",
    name: "Bebop Crew Enamel Pin Set",
    description: "Set of 5 enamel pins featuring Spike, Jet, Faye, Ed, and Ein. Hard enamel with gold finish.",
    price: 24.99,
    image: "/products/bebop-pins.jpg",
    category: "accessories",
    tags: ["cowboy bebop", "anime", "90s"],
    inStock: true,
    featured: false,
  },
  {
    id: "8",
    name: "Interstellar TARS Action Figure",
    description: "Articulated TARS robot figure with adjustable humor settings. Screen-accurate design.",
    price: 49.99,
    image: "/products/tars-figure.jpg",
    category: "collectibles",
    tags: ["interstellar", "sci-fi", "movies"],
    inStock: true,
    featured: false,
  },
  {
    id: "9",
    name: "Vaporwave Aesthetic Lamp",
    description: "Neon LED lamp with retrowave design. RGB color modes and remote control included.",
    price: 44.99,
    image: "/products/vaporwave-lamp.jpg",
    category: "home",
    tags: ["vaporwave", "80s", "decor"],
    inStock: true,
    featured: false,
  },
  {
    id: "10",
    name: "Retro Cassette Tape Wallet",
    description: "Genuine leather wallet designed like a cassette tape. Because rewinding is the future.",
    price: 39.99,
    image: "/products/cassette-wallet.jpg",
    category: "accessories",
    tags: ["retro", "80s", "accessories"],
    inStock: true,
    featured: false,
  },
  {
    id: "11",
    name: "Trigun Vash the Stampede Figure",
    description: "Highly detailed action figure of the Humanoid Typhoon himself. 60 billion double dollar bounty not included.",
    price: 74.99,
    image: "/products/vash-figure.jpg",
    category: "collectibles",
    tags: ["trigun", "anime", "90s"],
    inStock: true,
    featured: false,
  },
  {
    id: "12",
    name: "Synthwave Sunset Tapestry",
    description: "Large wall tapestry featuring iconic 80s synthwave sunset aesthetic. 60x80 inches.",
    price: 34.99,
    image: "/products/synthwave-tapestry.jpg",
    category: "home",
    tags: ["synthwave", "80s", "decor"],
    inStock: true,
    featured: false,
  },
];

// Convert to MedusaJS format
export function convertToMedusaFormat(product: typeof originalProducts[0]): Partial<MedusaProduct> {
  return {
    title: product.name,
    description: product.description,
    handle: product.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
    status: 'published',
    thumbnail: product.image,
    variants: [
      {
        id: `variant-${product.id}`,
        title: 'Default',
        prices: [
          {
            id: `price-${product.id}`,
            amount: Math.round(product.price * 100), // Convert to cents
            currency_code: 'usd',
          },
        ],
        inventory_quantity: product.inStock ? 100 : 0,
        manage_inventory: true,
        allow_backorder: !product.inStock,
      },
    ],
    tags: product.tags.map((tag, idx) => ({
      id: `tag-${product.id}-${idx}`,
      value: tag,
    })),
  };
}

// Generate MedusaJS product data
export const medusaProducts = originalProducts.map(convertToMedusaFormat);

// Categories mapping
export const categories = [
  { id: "cat-apparel", name: "Apparel", handle: "apparel" },
  { id: "cat-collectibles", name: "Collectibles", handle: "collectibles" },
  { id: "cat-accessories", name: "Accessories", handle: "accessories" },
  { id: "cat-art", name: "Art & Prints", handle: "art" },
  { id: "cat-home", name: "Home & Decor", handle: "home" },
];
