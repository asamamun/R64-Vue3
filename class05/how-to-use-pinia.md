# How to Use Pinia in This Vue 3 Application

This document explains how Pinia state management is implemented in this Vue 3 e-commerce application. Pinia is the recommended state management library for Vue 3, offering a simpler and more intuitive API compared to Vuex.

## Table of Contents

1. [Installation](#installation)
2. [Plugin Setup](#plugin-setup)
3. [Store Creation](#store-creation)
4. [Store Structure](#store-structure)
5. [Persistence Configuration](#persistence-configuration)
6. [Using Stores in Components](#using-stores-in-components)
7. [CRUD Operations](#crud-operations)
8. [Best Practices](#best-practices)

## Installation

Pinia is already included in the project dependencies. To install it in a new project:

```bash
npm install pinia
```

For localStorage persistence, we also need the persisted state plugin:

```bash
npm install pinia-plugin-persistedstate
```

## Plugin Setup

The Pinia plugin is configured in `src/main.js`:

```javascript
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

const app = createApp(App)

// Create Pinia instance
const pinia = createPinia()
// Add persisted state plugin
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(router)

app.mount('#app')
```

## Store Creation

Stores are created using the `defineStore` function from Pinia. Our main store is located at `src/stores/product.js`:

```javascript
import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useProductStore = defineStore(
  'product',
  () => {
    // State
    const products = ref([])
    const cart = ref([])
    const orders = ref([])
    const loading = ref(false)
    const error = ref(null)
    const productsLoaded = ref(false)

    // Getters (computed properties)
    const cartItemCount = computed(() => {
      return cart.value.reduce((total, item) => total + item.quantity, 0)
    })

    const cartTotal = computed(() => {
      return cart.value.reduce((total, item) => total + item.price * item.quantity, 0)
    })

    const allOrders = computed(() => {
      return orders.value
    })

    // Actions (methods)
    async function fetchProducts() {
      /* ... */
    }
    function addToCart(product) {
      /* ... */
    }
    function removeFromCart(productId) {
      /* ... */
    }
    function updateQuantity(productId, quantity) {
      /* ... */
    }
    function placeOrder(orderDetails) {
      /* ... */
    }

    // Return all state, getters, and actions
    return {
      products,
      cart,
      orders,
      loading,
      error,
      productsLoaded,
      fetchProducts,
      addToCart,
      removeFromCart,
      updateQuantity,
      cartItemCount,
      cartTotal,
      placeOrder,
      allOrders,
    }
  },
  {
    // Persistence configuration
    persist: {
      key: 'product-store',
      storage: localStorage,
      paths: ['products', 'cart', 'orders', 'productsLoaded'],
    },
  },
)
```

## Store Structure

Our Pinia store follows the Composition API syntax with three main parts:

### 1. State

Reactive data properties using Vue's `ref()`:

- `products`: Array of product items
- `cart`: Array of items in the shopping cart
- `orders`: Array of completed orders
- `loading`: Boolean indicating API loading state
- `error`: String containing error messages
- `productsLoaded`: Boolean tracking if products have been loaded from API

### 2. Getters

Computed properties using Vue's `computed()`:

- `cartItemCount`: Total number of items in cart
- `cartTotal`: Total price of items in cart
- `allOrders`: Computed list of all orders

### 3. Actions

Methods that can modify state:

- `fetchProducts()`: Load products from API (only once)
- `addToCart()`: Add product to shopping cart
- `removeFromCart()`: Remove product from cart
- `updateQuantity()`: Update product quantity in cart
- `placeOrder()`: Create new order from cart items

## Persistence Configuration

The store uses `pinia-plugin-persistedstate` to automatically sync specified state properties with localStorage:

```javascript
{
  persist: {
    key: 'product-store',           // localStorage key
    storage: localStorage,          // Storage mechanism
    paths: ['products', 'cart', 'orders', 'productsLoaded'] // Properties to persist
  }
}
```

This ensures that:

- Products loaded from API are saved locally
- Cart items persist between page reloads
- Order history is maintained
- The `productsLoaded` flag prevents repeated API calls

## Using Stores in Components

To use the store in any Vue component:

### 1. Import the store

```javascript
import { useProductStore } from '@/stores/product'
```

### 2. Initialize the store

```javascript
const productStore = useProductStore()
```

### 3. Access state, getters, and actions

```vue
<template>
  <div>
    <!-- Access state -->
    <p>Loading: {{ productStore.loading }}</p>

    <!-- Access getters -->
    <p>Cart items: {{ productStore.cartItemCount }}</p>

    <!-- Call actions -->
    <button @click="productStore.addToCart(product)">Add to Cart</button>
  </div>
</template>

<script setup>
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
</script>
```

## CRUD Operations

### Create (Add Product)

```javascript
function addProduct(product) {
  const newProduct = {
    id: products.value.length > 0 ? Math.max(...products.value.map((p) => p.id)) + 1 : 1,
    ...product,
  }
  products.value.push(newProduct)
  return newProduct
}
```

### Read (Fetch Products)

```javascript
async function fetchProducts() {
  // Only fetch once
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
  } finally {
    loading.value = false
  }
}
```

### Update (Modify Product)

```javascript
function updateProduct(updatedProduct) {
  const index = products.value.findIndex((p) => p.id === updatedProduct.id)
  if (index !== -1) {
    products.value[index] = updatedProduct
  }
}
```

### Delete (Remove Product)

```javascript
function deleteProduct(productId) {
  products.value = products.value.filter((p) => p.id !== productId)
  // Also remove from cart if present
  cart.value = cart.value.filter((item) => item.id !== productId)
}
```

## Best Practices

1. **One Store Per Feature**: We use a single store for all product-related functionality
2. **Selective Persistence**: Only persist necessary data to localStorage
3. **One-Time API Loading**: Products are loaded only once from the API
4. **Local CRUD Operations**: After initial load, all operations happen locally
5. **Reactive Getters**: Use computed properties for derived state
6. **Clear Action Names**: Actions have descriptive names that indicate their purpose
7. **Error Handling**: Proper error handling for API calls
8. **Loading States**: Show loading indicators during API operations

## Example Usage in Components

### HomeView.vue (Product Display)

```vue
<script setup>
import { onMounted } from 'vue'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()

onMounted(() => {
  productStore.fetchProducts()
})
</script>

<template>
  <div v-if="productStore.loading">Loading...</div>
  <div v-else-if="productStore.error">Error: {{ productStore.error }}</div>
  <div v-else>
    <ProductList :products="productStore.products" @add-to-cart="productStore.addToCart" />
  </div>
</template>
```

### CartView.vue (Cart Management)

```vue
<script setup>
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
</script>

<template>
  <div>
    <div v-for="item in productStore.cart" :key="item.id">
      <span>{{ item.title }}</span>
      <button @click="productStore.updateQuantity(item.id, item.quantity - 1)">-</button>
      <span>{{ item.quantity }}</span>
      <button @click="productStore.updateQuantity(item.id, item.quantity + 1)">+</button>
      <button @click="productStore.removeFromCart(item.id)">Remove</button>
    </div>
    <div>Total: ${{ productStore.cartTotal.toFixed(2) }}</div>
  </div>
</template>
```

This implementation provides a complete state management solution with automatic persistence, making it perfect for e-commerce applications where data needs to persist between sessions.
