import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore('product', () => {
    const products = ref([])
    const cart = ref([])
    const orders = ref([])
    const loading = ref(false)
    const error = ref(null)
    const productsLoaded = ref(false)

    // Fetch products from API (only once)
    async function fetchProducts() {
        // If products are already loaded, don't fetch again
        if (productsLoaded.value) return

        loading.value = true
        error.value = null
        try {
            const response = await fetch('https://dummyjson.com/products')
            const data = await response.json()
            products.value = data.products
            productsLoaded.value = true
        } catch (err) {
            error.value = err.message
            console.error('Error fetching products:', err)
        } finally {
            loading.value = false
        }
    }

    // Add a new product locally
    function addProduct(product) {
        const newProduct = {
            id: products.value.length > 0 ? Math.max(...products.value.map(p => p.id)) + 1 : 1,
            ...product
        }
        products.value.push(newProduct)
        return newProduct
    }

    // Update an existing product
    function updateProduct(updatedProduct) {
        const index = products.value.findIndex(p => p.id === updatedProduct.id)
        if (index !== -1) {
            products.value[index] = updatedProduct
        }
    }

    // Delete a product
    function deleteProduct(productId) {
        products.value = products.value.filter(p => p.id !== productId)
        // Also remove from cart if present
        cart.value = cart.value.filter(item => item.id !== productId)
    }

    // Add product to cart
    function addToCart(product) {
        const existingItem = cart.value.find(item => item.id === product.id)
        if (existingItem) {
            existingItem.quantity += 1
        } else {
            cart.value.push({ ...product, quantity: 1 })
        }
    }

    // Remove product from cart
    function removeFromCart(productId) {
        cart.value = cart.value.filter(item => item.id !== productId)
    }

    // Update product quantity in cart
    function updateQuantity(productId, quantity) {
        const item = cart.value.find(item => item.id === productId)
        if (item) {
            item.quantity = quantity
            if (item.quantity <= 0) {
                removeFromCart(productId)
            }
        }
    }

    // Calculate total items in cart
    const cartItemCount = computed(() => {
        return cart.value.reduce((total, item) => total + item.quantity, 0)
    })

    // Calculate total price
    const cartTotal = computed(() => {
        return cart.value.reduce((total, item) => total + (item.price * item.quantity), 0)
    })

    // Place order
    function placeOrder(orderDetails) {
        const order = {
            id: Date.now(),
            items: [...cart.value],
            total: cartTotal.value,
            orderDate: new Date().toISOString(),
            ...orderDetails
        }

        orders.value.push(order)
        cart.value = [] // Clear cart after placing order

        return order
    }

    // Get all orders
    const allOrders = computed(() => {
        return orders.value
    })

    return {
        products,
        cart,
        orders,
        loading,
        error,
        productsLoaded,
        fetchProducts,
        addProduct,
        updateProduct,
        deleteProduct,
        addToCart,
        removeFromCart,
        updateQuantity,
        cartItemCount,
        cartTotal,
        placeOrder,
        allOrders
    }
}, {
    persist: {
        key: 'product-store',
        storage: localStorage,
        paths: ['products', 'cart', 'orders', 'productsLoaded'] // Persist products as well
    }
})