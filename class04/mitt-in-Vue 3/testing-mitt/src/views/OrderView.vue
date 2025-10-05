<script setup>
import { useProductStore } from '@/stores/product'
import { computed } from 'vue'

const productStore = useProductStore()

const orders = computed(() => productStore.allOrders)
</script>

<template>
  <div class="order-history">
    <h2>Order History</h2>
    
    <div v-if="orders.length === 0" class="no-orders">
      <p>You haven't placed any orders yet.</p>
    </div>
    
    <div v-else class="orders-list">
      <div 
        v-for="order in orders" 
        :key="order.id" 
        class="order-card"
      >
        <div class="order-header">
          <h3>Order #{{ order.id }}</h3>
          <p class="order-date">{{ new Date(order.orderDate).toLocaleDateString() }}</p>
        </div>
        
        <div class="order-items">
          <div 
            v-for="item in order.items" 
            :key="item.id" 
            class="order-item"
          >
            <img 
              :src="item.thumbnail" 
              :alt="item.title"
              class="item-image"
            >
            <div class="item-details">
              <h4>{{ item.title }}</h4>
              <p>Quantity: {{ item.quantity }}</p>
              <p>Price: ${{ item.price }}</p>
            </div>
            <div class="item-total">
              ${{ (item.price * item.quantity).toFixed(2) }}
            </div>
          </div>
        </div>
        
        <div class="order-total">
          <strong>Total: ${{ order.total.toFixed(2) }}</strong>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-history {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

.no-orders {
  text-align: center;
  padding: 40px;
  color: #666;
}

.order-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  margin-bottom: 20px;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.order-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid #eee;
  background-color: #f5f5f5;
}

.order-date {
  color: #666;
}

.order-items {
  padding: 15px;
}

.order-item {
  display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.item-image {
  width: 60px;
  height: 60px;
  object-fit: cover;
  margin-right: 15px;
  border-radius: 4px;
}

.item-details {
  flex: 1;
}

.item-total {
  font-weight: bold;
}

.order-total {
  padding: 15px 20px;
  text-align: right;
  border-top: 1px solid #eee;
  font-size: 18px;
}
</style>