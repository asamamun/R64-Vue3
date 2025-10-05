<script setup>
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'

const productStore = useProductStore()
const router = useRouter()
</script>

<template>
  <div class="cart">
    <h2>Shopping Cart ({{ productStore.cartItemCount }} items)</h2>
    
    <div v-if="productStore.cart.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <button @click="router.push('/')" class="continue-shopping">Continue Shopping</button>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div 
          v-for="item in productStore.cart" 
          :key="item.id" 
          class="cart-item"
        >
          <img 
            :src="item.thumbnail || 'https://via.placeholder.com/60x60?text=No+Image'" 
            :alt="item.title"
            class="cart-item-image"
            @error="e => e.target.src = 'https://via.placeholder.com/60x60?text=No+Image'"
          >
          <div class="cart-item-details">
            <h4>{{ item.title }}</h4>
            <p>${{ item.price }}</p>
          </div>
          <div class="quantity-controls">
            <button @click="productStore.updateQuantity(item.id, item.quantity - 1)" class="quantity-btn">
              -
            </button>
            <span class="quantity">{{ item.quantity }}</span>
            <button @click="productStore.updateQuantity(item.id, item.quantity + 1)" class="quantity-btn">
              +
            </button>
          </div>
          <div class="cart-item-total">
            ${{ (item.price * item.quantity).toFixed(2) }}
          </div>
          <button 
            @click="productStore.removeFromCart(item.id)"
            class="remove-btn"
          >
            Remove
          </button>
        </div>
      </div>
      
      <div class="cart-summary">
        <div class="summary-row">
          <span>Subtotal</span>
          <span>${{ productStore.cartTotal.toFixed(2) }}</span>
        </div>
        <div class="summary-row">
          <span>Shipping</span>
          <span>Free</span>
        </div>
        <div class="summary-row total-row">
          <strong>Total</strong>
          <strong>${{ productStore.cartTotal.toFixed(2) }}</strong>
        </div>
        <button @click="router.push('/cart')" class="checkout-btn">
          View Cart & Checkout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart {
  padding: 20px;
}

.empty-cart {
  text-align: center;
  padding: 40px;
  color: #666;
}

.continue-shopping {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 15px;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 15px;
  border-bottom: 1px solid #eee;
}

.cart-item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.cart-item-details {
  flex: 1;
}

.cart-item-details h4 {
  margin: 0 0 5px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 10px;
  margin: 0 20px;
}

.quantity-btn {
  width: 30px;
  height: 30px;
  border: 1px solid #ddd;
  background: white;
  cursor: pointer;
  border-radius: 4px;
}

.quantity {
  min-width: 30px;
  text-align: center;
}

.cart-item-total {
  font-weight: bold;
  min-width: 80px;
  text-align: right;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 4px;
  cursor: pointer;
  margin-left: 15px;
}

.cart-summary {
  max-width: 400px;
  margin-left: auto;
  border: 1px solid #eee;
  border-radius: 8px;
  padding: 20px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.total-row {
  font-size: 18px;
}

.checkout-btn {
  width: 100%;
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 12px 24px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}
</style>