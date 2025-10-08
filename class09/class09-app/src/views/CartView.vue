<template>
  <div class="cart-view">
    <h1>Your Shopping Cart</h1>
    
    <div v-if="cartItems.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div 
          v-for="item in cartItems" 
          :key="item.product.id"
          class="cart-item"
        >
          <div class="item-image">
            <div class="placeholder-image">{{ item.product.name.charAt(0) }}</div>
          </div>
          <div class="item-details">
            <h3>{{ item.product.name }}</h3>
            <p class="category">{{ item.product.category }}</p>
            <p class="price">${{ item.product.price.toFixed(2) }}</p>
          </div>
          <div class="item-quantity">
            <button @click="decreaseQuantity(item.product.id)" class="quantity-btn">-</button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="increaseQuantity(item.product.id)" class="quantity-btn">+</button>
          </div>
          <div class="item-total">
            ${{ (item.product.price * item.quantity).toFixed(2) }}
          </div>
          <button @click="removeFromCart(item.product.id)" class="remove-btn">Remove</button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-item">
          <span>Subtotal:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <div class="summary-item">
          <span>Shipping:</span>
          <span>Free</span>
        </div>
        <div class="summary-item total">
          <span>Total:</span>
          <span>${{ cartTotal.toFixed(2) }}</span>
        </div>
        <button @click="checkout" class="checkout-btn">Proceed to Checkout</button>
        <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import type { CartItem } from '../stores/productStore'

const router = useRouter()
const productStore = useProductStore()

const cartItems = computed<CartItem[]>(() => productStore.cart)
const cartTotal = computed<number>(() => productStore.cartTotal)

function increaseQuantity(productId: number) {
  const item = cartItems.value.find(item => item.product.id === productId)
  if (item) {
    productStore.updateQuantity(productId, item.quantity + 1)
  }
}

function decreaseQuantity(productId: number) {
  const item = cartItems.value.find(item => item.product.id === productId)
  if (item) {
    productStore.updateQuantity(productId, item.quantity - 1)
  }
}

function removeFromCart(productId: number) {
  productStore.removeFromCart(productId)
}

function checkout() {
  alert('Checkout functionality would be implemented here')
  // In a real application, this would redirect to a checkout page
}
</script>

<style scoped>
/* Cart View Component Styles */
.cart-view {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.cart-view h1 {
  color: #333;
  margin-top: 0;
}

.empty-cart {
  text-align: center;
  padding: 50px 20px;
}

.empty-cart p {
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 20px;
}

.continue-shopping {
  display: inline-block;
  padding: 12px 24px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

.continue-shopping:hover {
  background-color: #359c6d;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px;
  border-bottom: 1px solid #eee;
  gap: 20px;
}

.item-image {
  width: 80px;
  height: 80px;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
}

.placeholder-image {
  width: 50px;
  height: 50px;
  background-color: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: bold;
}

.item-details {
  flex: 2;
}

.item-details h3 {
  margin: 0 0 5px 0;
  color: #333;
}

.category {
  color: #42b983;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin: 5px 0;
}

.price {
  font-weight: bold;
  color: #333;
  margin: 5px 0;
}

.item-quantity {
  display: flex;
  align-items: center;
  gap: 10px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  background-color: #f0f0f0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.quantity {
  min-width: 30px;
  text-align: center;
  font-weight: bold;
}

.item-total {
  font-weight: bold;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background-color: #dc3545;
  color: white;
  border: none;
  padding: 8px 12px;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.remove-btn:hover {
  background-color: #c82333;
}

.cart-summary {
  background-color: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  max-width: 400px;
  margin-left: auto;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
  font-size: 1.1rem;
}

.summary-item.total {
  font-size: 1.3rem;
  font-weight: bold;
  border-top: 1px solid #ddd;
  padding-top: 15px;
  margin-top: 15px;
}

.checkout-btn {
  width: 100%;
  padding: 15px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1.1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;
}

.checkout-btn:hover {
  background-color: #359c6d;
}

@media (max-width: 768px) {
  .cart-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  
  .item-quantity {
    align-self: center;
  }
  
  .item-total {
    text-align: left;
  }
  
  .cart-summary {
    max-width: 100%;
  }
}
</style>