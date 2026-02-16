module.exports = [
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

const mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[project]/src/lib/medusa-config.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "apiRoutes",
    ()=>apiRoutes,
    "medusaConfig",
    ()=>medusaConfig
]);
const medusaConfig = {
    baseUrl: process.env.MEDUSA_BACKEND_URL || 'http://localhost:9000',
    publishableApiKey: process.env.NEXT_PUBLIC_MEDUSA_PUBLISHABLE_KEY || ''
};
const apiRoutes = {
    products: '/store/products',
    product: (id)=>`/store/products/${id}`,
    cart: '/store/cart',
    cartId: (id)=>`/store/carts/${id}`,
    regions: '/store/regions',
    payment: '/store/payment',
    checkout: '/store/checkout'
};
}),
"[project]/src/lib/medusa-client.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "medusaClient",
    ()=>medusaClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/medusa-config.ts [app-ssr] (ecmascript)");
;
class MedusaClient {
    baseUrl;
    constructor(){
        this.baseUrl = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$config$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaConfig"].baseUrl;
    }
    async request(endpoint, options) {
        const url = `${this.baseUrl}${endpoint}`;
        const response = await fetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                ...options?.headers
            }
        });
        if (!response.ok) {
            throw new Error(`Medusa API error: ${response.statusText}`);
        }
        return response.json();
    }
    async getProducts(params) {
        const queryParams = new URLSearchParams();
        if (params?.limit) queryParams.append('limit', params.limit.toString());
        if (params?.offset) queryParams.append('offset', params.offset.toString());
        if (params?.category_id) queryParams.append('category_id[]', params.category_id);
        if (params?.tags) params.tags.forEach((tag)=>queryParams.append('tags[]', tag));
        return this.request(`/store/products?${queryParams.toString()}`);
    }
    async getProduct(id) {
        return this.request(`/store/products/${id}`);
    }
    async createCart(regionId) {
        return this.request('/store/cart', {
            method: 'POST',
            body: JSON.stringify({
                region_id: regionId
            })
        });
    }
    async getCart(cartId) {
        return this.request(`/store/carts/${cartId}`);
    }
    async addToCart(cartId, variantId, quantity = 1) {
        return this.request(`/store/carts/${cartId}/line-items`, {
            method: 'POST',
            body: JSON.stringify({
                variant_id: variantId,
                quantity
            })
        });
    }
    async updateCartItem(cartId, itemId, quantity) {
        return this.request(`/store/carts/${cartId}/line-items/${itemId}`, {
            method: 'POST',
            body: JSON.stringify({
                quantity
            })
        });
    }
    async removeCartItem(cartId, itemId) {
        return this.request(`/store/carts/${cartId}/line-items/${itemId}`, {
            method: 'DELETE'
        });
    }
    async getRegions() {
        return this.request('/store/regions');
    }
}
const medusaClient = new MedusaClient();
}),
"[project]/src/context/MedusaCartContext.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MedusaCartProvider",
    ()=>MedusaCartProvider,
    "useMedusaCart",
    ()=>useMedusaCart
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/medusa-client.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
const MedusaCartContext = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createContext"])(undefined);
function MedusaCartProvider({ children }) {
    const [cart, setCart] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [cartId, setCartId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isLoading, setIsLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(true);
    const [isCartOpen, setIsCartOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    // Load cart from localStorage on mount
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        const savedCartId = localStorage.getItem("retrovault-cart-id");
        if (savedCartId) {
            setCartId(savedCartId);
            loadCart(savedCartId);
        } else {
            setIsLoading(false);
        }
    }, []);
    const loadCart = async (id)=>{
        try {
            const { cart: loadedCart } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaClient"].getCart(id);
            setCart(loadedCart);
        } catch (error) {
            console.error("Failed to load cart:", error);
            localStorage.removeItem("retrovault-cart-id");
            setCartId(null);
        } finally{
            setIsLoading(false);
        }
    };
    const createCart = async ()=>{
        try {
            const { regions } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaClient"].getRegions();
            const regionId = regions[0]?.id;
            if (regionId) {
                const { cart: newCart } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaClient"].createCart(regionId);
                setCart(newCart);
                setCartId(newCart.id);
                localStorage.setItem("retrovault-cart-id", newCart.id);
            }
        } catch (error) {
            console.error("Failed to create cart:", error);
        }
    };
    const ensureCartExists = async ()=>{
        if (!cartId) {
            await createCart();
        } else if (!cart) {
            await loadCart(cartId);
        }
    };
    const addToCart = async (variantId, quantity = 1)=>{
        await ensureCartExists();
        if (!cartId) {
            console.error("No cart available");
            return;
        }
        try {
            const { cart: updatedCart } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaClient"].addToCart(cartId, variantId, quantity);
            setCart(updatedCart);
            setIsCartOpen(true);
        } catch (error) {
            console.error("Failed to add to cart:", error);
        }
    };
    const removeFromCart = async (itemId)=>{
        if (!cartId) return;
        try {
            const { cart: updatedCart } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaClient"].removeCartItem(cartId, itemId);
            setCart(updatedCart);
        } catch (error) {
            console.error("Failed to remove from cart:", error);
        }
    };
    const updateQuantity = async (itemId, quantity)=>{
        if (!cartId) return;
        if (quantity <= 0) {
            await removeFromCart(itemId);
            return;
        }
        try {
            const { cart: updatedCart } = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$medusa$2d$client$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["medusaClient"].updateCartItem(cartId, itemId, quantity);
            setCart(updatedCart);
        } catch (error) {
            console.error("Failed to update quantity:", error);
        }
    };
    const clearCart = ()=>{
        setCart(null);
        setCartId(null);
        localStorage.removeItem("retrovault-cart-id");
    };
    const totalItems = cart?.items?.reduce((sum, item)=>sum + item.quantity, 0) || 0;
    const totalPrice = cart?.total ? cart.total / 100 : 0;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(MedusaCartContext.Provider, {
        value: {
            cart,
            cartId,
            isLoading,
            addToCart,
            removeFromCart,
            updateQuantity,
            clearCart,
            totalItems,
            totalPrice,
            isCartOpen,
            setIsCartOpen
        },
        children: children
    }, void 0, false, {
        fileName: "[project]/src/context/MedusaCartContext.tsx",
        lineNumber: 130,
        columnNumber: 5
    }, this);
}
function useMedusaCart() {
    const context = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useContext"])(MedusaCartContext);
    if (!context) {
        throw new Error("useMedusaCart must be used within a MedusaCartProvider");
    }
    return context;
}
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
;
else {
    if ("TURBOPACK compile-time falsy", 0) //TURBOPACK unreachable
    ;
    else {
        if ("TURBOPACK compile-time truthy", 1) {
            if ("TURBOPACK compile-time truthy", 1) {
                module.exports = __turbopack_context__.r("[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)");
            } else //TURBOPACK unreachable
            ;
        } else //TURBOPACK unreachable
        ;
    }
} //# sourceMappingURL=module.compiled.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].ReactJsxDevRuntime; //# sourceMappingURL=react-jsx-dev-runtime.js.map
}),
"[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)", ((__turbopack_context__, module, exports) => {
"use strict";

module.exports = __turbopack_context__.r("[project]/node_modules/next/dist/server/route-modules/app-page/module.compiled.js [app-ssr] (ecmascript)").vendored['react-ssr'].React; //# sourceMappingURL=react.js.map
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__73f9db43._.js.map