<script setup>
import { useProductStore } from '@/stores/product'
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const productStore = useProductStore()
const router = useRouter()
const showCheckout = ref(false)
const customerInfo = ref({
  name: '',
  email: '',
  address: ''
})

function placeOrder() {
  if (!customerInfo.value.name || !customerInfo.value.email || !customerInfo.value.address) {
    alert('Please fill in all customer information')
    return
  }
  
  productStore.placeOrder(customerInfo.value)
  showCheckout.value = false
  customerInfo.value = { name: '', email: '', address: '' }
  alert('Order placed successfully!')
  router.push('/orders')
}
</script>

<template>
  <div class="cart-page">
    <h2>Shopping Cart ({{ productStore.cartItemCount }} items)</h2>
    
    <div v-if="productStore.cart.length === 0" class="empty-cart">
      <p>Your cart is empty</p>
      <router-link to="/" class="continue-shopping">Continue Shopping</router-link>
    </div>
    
    <div v-else>
      <div class="cart-items">
        <div 
          v-for="item in productStore.cart" 
          :key="item.id" 
          class="cart-item"
        >
          <img 
            :src="item.thumbnail" 
            :alt="item.title"
            class="item-image"
          >
          <div class="item-details">
            <h3>{{ item.title }}</h3>
            <p class="item-price">${{ item.price }}</p>
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
          <div class="item-total">
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
        <button @click="showCheckout = true" class="checkout-btn">
          Proceed to Checkout
        </button>
      </div>
    </div>
    
    <!-- Checkout Modal -->
    <div v-if="showCheckout" class="modal-overlay">
      <div class="modal">
        <h2>Checkout</h2>
        <div class="customer-info">
          <h3>Customer Information</h3>
          <input 
            v-model="customerInfo.name" 
            placeholder="Full Name" 
            class="form-input"
          >
          <input 
            v-model="customerInfo.email" 
            placeholder="Email" 
            class="form-input"
          >
          <textarea 
            v-model="customerInfo.address" 
            placeholder="Shipping Address" 
            class="form-input"
          ></textarea>
        </div>
        
        <div class="order-summary">
          <h3>Order Summary</h3>
          <div class="summary-item" v-for="item in productStore.cart" :key="item.id">
            <span>{{ item.title }} (x{{ item.quantity }})</span>
            <span>${{ (item.price * item.quantity).toFixed(2) }}</span>
          </div>
          <div class="summary-total">
            <strong>Total: ${{ productStore.cartTotal.toFixed(2) }}</strong>
          </div>
        </div>
        
        <div class="modal-actions">
          <button @click="showCheckout = false" class="cancel-btn">Cancel</button>
          <button @click="placeOrder" class="confirm-btn">Place Order</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.cart-page {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.empty-cart {
  text-align: center;
  padding: 60px 20px;
}

.empty-cart p {
  font-size: 18px;
  margin-bottom: 20px;
}

.continue-shopping {
  display: inline-block;
  background-color: #4caf50;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 4px;
}

.cart-items {
  margin-bottom: 30px;
}

.cart-item {
  display: flex;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  margin-right: 20px;
  border-radius: 8px;
}

.item-details {
  flex: 1;
}

.item-details h3 {
  margin: 0 0 10px 0;
}

.item-price {
  color: #e91e63;
  font-weight: bold;
  font-size: 18px;
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

.item-total {
  font-weight: bold;
  font-size: 18px;
  margin: 0 20px;
  min-width: 80px;
}

.remove-btn {
  background-color: #f44336;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
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
  border-bottom: none;
}

.checkout-btn {
  width: 100%;
  background-color: #2196f3;
  color: white;
  border: none;
  padding: 15px;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
  margin-top: 20px;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal {
  background: white;
  border-radius: 8px;
  padding: 20px;
  width: 90%;
  max-width: 500px;
  max-height: 90vh;
  overflow-y: auto;
}

.customer-info, .order-summary {
  margin-bottom: 20px;
}

.form-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.summary-item {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  border-bottom: 1px solid #eee;
}

.summary-total {
  text-align: right;
  margin-top: 10px;
  font-size: 18px;
}

.modal-actions {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

.cancel-btn, .confirm-btn {
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn {
  background-color: #f44336;
  color: white;
}

.confirm-btn {
  background-color: #4caf50;
  color: white;
}
</style>