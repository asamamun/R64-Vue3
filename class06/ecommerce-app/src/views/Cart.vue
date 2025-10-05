<template>
    <div class="container">
      <h2 class="my-4">Shopping Cart</h2>
      <table class="table" v-if="cart.length">
        <thead>
          <tr>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in cart" :key="item.id">
            <td>{{ item.title }}</td>
            <td>${{ item.price }}</td>
            <td>
              <input type="number" v-model.number="item.quantity" @change="updateQuantity(item.id, item.quantity)" min="1" class="form-control w-50">
            </td>
            <td>${{ item.price * item.quantity }}</td>
            <td>
              <button @click="removeFromCart(item.id)" class="btn btn-danger btn-sm">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div v-else>
        <p>Your cart is empty.</p>
      </div>
      <!--  -->
      <div class="mt-4">
      <h4>Order Information</h4>
      <div class="mb-3">
        <label for="name" class="form-label">Name</label>
        <input type="text" class="form-control" id="name" v-model="orderInfo.name" required>
      </div>
      <div class="mb-3">
        <label for="phone" class="form-label">Phone Number</label>
        <input type="tel" class="form-control" id="phone" v-model="orderInfo.phone" required>
      </div>
    </div>
      <!--  -->
      <div class="text-end" v-if="cart.length">
        <h4>Total: ${{ cartTotal }}</h4>
        <button @click="handlePlaceOrder" class="btn btn-success" :disabled="isPlacingOrder">
          {{ isPlacingOrder ? 'Placing Order...' : 'Place Order' }}
        </button>
      </div>
      <div v-if="!cart.length" class="alert alert-info">
      Your cart is empty.
    </div>

    <div v-if="orderMessage" :class="['alert', orderMessage.type === 'success' ? 'alert-success' : 'alert-danger']">
      {{ orderMessage.text }}
    </div>
    </div>
  </template>
  <script>
  import { useProductStore } from '../stores/productStore'
  import { storeToRefs } from 'pinia'
  
  export default {
    name: 'Cart',
    setup() {
      const productStore = useProductStore()
      const { cart, cartTotal } = storeToRefs(productStore)
      
      return {
        cart,
        cartTotal,
        placeOrder: productStore.placeOrder,
        removeFromCart: productStore.removeFromCart,
        updateQuantity: productStore.updateQuantity
      }
    },
    data() {
      return {
        isPlacingOrder: false,
        orderInfo: {
          name: '',
          phone: ''
        },
        orderMessage: null
      }
    },
    computed: {
      isFormValid() {
        return this.orderInfo.name.trim() !== '' && this.orderInfo.phone.trim() !== ''
      }
    },
    methods: {
      async handlePlaceOrder() {
        if (!this.isFormValid) {
          this.orderMessage = { type: 'error', text: 'Please fill in both name and phone number.' };
        return;
        }
        
        this.isPlacingOrder = true;
        try {
          const orderData = {
            ...this.orderInfo,
            cart: JSON.parse(JSON.stringify(this.cart)) // Convert Proxy to plain object
          };
          const success = await this.placeOrder(orderData);
          if (success) {            
            this.orderMessage = { type: 'success', text: 'Order placed successfully!' };
            this.$swal.fire('Success!', this.orderMessage.text, 'success');
          this.orderInfo.name = '';
          this.orderInfo.phone = '';
          } else {
            this.orderMessage = { type: 'error', text: 'Error placing order. Please try again.' };
          }
        } catch (error) {
          console.error('Error placing order:', error);
        this.orderMessage = { type: 'error', text: 'Error placing order. Please try again.' };
        } finally {
          this.isPlacingOrder = false;
        }
      }
    }
  }
  </script>