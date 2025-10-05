# Pinia Store Documentation

This directory contains all the Pinia stores for the e-commerce application.

## Store Structure

### productStore.js

This is the main store that handles:

1. **Products Management**
   - Fetching products from the API
   - Storing the product list

2. **Cart Management**
   - Adding products to cart
   - Removing products from cart
   - Updating product quantities
   - Calculating cart totals
   - Persisting cart to localStorage

## Usage

### In Options API Components

```javascript
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'

export default {
  setup() {
    const productStore = useProductStore()
    const { products, cart, cartTotal } = storeToRefs(productStore)
    
    return {
      // State and getters (reactive)
      products,
      cart,
      cartTotal,
      
      // Actions (methods)
      fetchProducts: productStore.fetchProducts,
      addToCart: productStore.addToCart,
      removeFromCart: productStore.removeFromCart
    }
  }
}
```

### In Composition API Components (script setup)

```javascript
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'

const productStore = useProductStore()
const { products, cart, cartTotal } = storeToRefs(productStore)

// Use directly
productStore.fetchProducts()
productStore.addToCart(product)
```

## Store Methods

### State
- `products`: Array of available products
- `cart`: Array of products in the shopping cart

### Getters
- `cartTotal`: Computed total price of items in cart

### Actions
- `fetchProducts()`: Fetch products from API
- `addToCart(product)`: Add a product to the cart
- `removeFromCart(productId)`: Remove a product from the cart
- `updateQuantity({ productId, quantity })`: Update product quantity
- `clearCart()`: Empty the cart
- `placeOrder(orderData)`: Submit an order
- `saveCartToLocalStorage()`: Save cart to localStorage
- `loadCartFromLocalStorage()`: Load cart from localStorage

## Persistence

The cart is automatically persisted to localStorage using:
- `saveCartToLocalStorage()`: Called after any cart modification
- `loadCartFromLocalStorage()`: Called when the app initializes