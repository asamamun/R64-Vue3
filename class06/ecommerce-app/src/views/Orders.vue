<template>
  <div class="container">
    <h2 class="my-4">Order History</h2>
    
    <div v-if="loading" class="text-center">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
    
    <div v-else-if="orders.length === 0" class="alert alert-info">
      No orders found.
    </div>
    
    <div v-else>
      <div class="row">
        <div v-for="order in orders" :key="order.id" class="col-md-12 mb-4">
          <div class="card">
            <div class="card-header d-flex justify-content-between align-items-center">
              <h5 class="mb-0">Order #{{ order.id }}</h5>
              <span class="badge bg-primary">{{ formatDate(order.created) }}</span>
            </div>
            <div class="card-body">
              <div class="row">
                <div class="col-md-6">
                  <p><strong>Customer:</strong> {{ order.name }}</p>
                  <p><strong>Phone:</strong> {{ order.phone }}</p>
                </div>
                <div class="col-md-6 text-end">
                  <p><strong>Total Items:</strong> {{ getOrderItemCount(order) }}</p>
                  <p><strong>Total Price:</strong> ${{ getOrderTotal(order).toFixed(2) }}</p>
                </div>
              </div>
              
              <button class="btn btn-outline-primary" @click="showOrderDetails(order)">
                View Details
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Order Details Modal -->
    <div class="modal fade" id="orderDetailsModal" tabindex="-1" aria-labelledby="orderDetailsModalLabel" aria-hidden="true" ref="modalElement">
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="orderDetailsModalLabel">Order #{{ selectedOrder?.id }} Details</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body" v-if="selectedOrder">
            <div class="row mb-3">
              <div class="col-md-6">
                <p><strong>Customer:</strong> {{ selectedOrder.name }}</p>
                <p><strong>Phone:</strong> {{ selectedOrder.phone }}</p>
              </div>
              <div class="col-md-6 text-end">
                <p><strong>Date:</strong> {{ formatDate(selectedOrder.created) }}</p>
                <p><strong>Total Items:</strong> {{ getOrderItemCount(selectedOrder) }}</p>
                <p><strong>Total Price:</strong> ${{ getOrderTotal(selectedOrder).toFixed(2) }}</p>
              </div>
            </div>
            
            <h6>Items:</h6>
            <div class="table-responsive">
              <table class="table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in getParsedOrderData(selectedOrder)" :key="index">
                    <td>
                      <div class="d-flex align-items-center">
                        <img :src="getItemImage(item)" :alt="getItemTitle(item)" class="img-thumbnail me-3" style="width: 60px; height: 60px; object-fit: cover;">
                        <div>
                          <div>{{ getItemTitle(item) }}</div>
                          <small class="text-muted">{{ item.category }}</small>
                        </div>
                      </div>
                    </td>
                    <td>${{ getItemPrice(item).toFixed(2) }}</td>
                    <td>{{ getItemQuantity(item) }}</td>
                    <td>${{ (getItemPrice(item) * getItemQuantity(item)).toFixed(2) }}</td>
                  </tr>
                  <tr v-if="getParsedOrderData(selectedOrder).length === 0">
                    <td colspan="4" class="text-center">No items found</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useProductStore } from '../stores/productStore'
import { storeToRefs } from 'pinia'
import { onMounted, ref, nextTick } from 'vue'

export default {
  name: 'Orders',
  setup() {
    const productStore = useProductStore()
    const { orders } = storeToRefs(productStore)
    const loading = ref(true)
    const selectedOrder = ref(null)
    const modalElement = ref(null)
    
    const loadOrders = async () => {
      loading.value = true
      await productStore.fetchOrders()
      loading.value = false
    }
    
    const getParsedOrderData = (order) => {
      if (!order || !order.order_data) return []
      
      // If order_data is already an array, return it
      if (Array.isArray(order.order_data)) {
        return order.order_data
      }
      
      // If order_data is a string, try to parse it as JSON
      if (typeof order.order_data === 'string') {
        try {
          // Check if it's a valid JSON string
          if (order.order_data.trim() === '' || order.order_data.trim() === 'null') {
            return []
          }
          
          const parsed = JSON.parse(order.order_data)
          return Array.isArray(parsed) ? parsed : []
        } catch (e) {
          console.error('Error parsing order_data for order', order.id, ':', e)
          console.error('Raw order_data:', order.order_data)
          return []
        }
      }
      
      return []
    }
    
    const getItemTitle = (item) => {
      return item.title || item.name || 'Unknown Product'
    }
    
    const getItemPrice = (item) => {
      const price = parseFloat(item.price) || 0
      return price
    }
    
    const getItemQuantity = (item) => {
      const quantity = parseInt(item.quantity) || 1
      return quantity
    }
    
    const getItemImage = (item) => {
      // Handle different image formats
      if (item.thumbnail) {
        // If thumbnail is an array, use the first image
        if (Array.isArray(item.thumbnail)) {
          return item.thumbnail[0] || 'https://via.placeholder.com/60'
        }
        // If thumbnail is a string
        return item.thumbnail
      }
      
      if (item.image) {
        // If image is an array, use the first image
        if (Array.isArray(item.image)) {
          return item.image[0] || 'https://via.placeholder.com/60'
        }
        // If image is a string
        return item.image
      }
      
      return 'https://via.placeholder.com/60'
    }
    
    const showOrderDetails = async (order) => {
      selectedOrder.value = order
      // Use nextTick to ensure the DOM is updated before showing the modal
      await nextTick()
      if (modalElement.value) {
        const modal = new window.bootstrap.Modal(modalElement.value)
        modal.show()
      }
    }
    
    const formatDate = (dateString) => {
      const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' }
      return new Date(dateString).toLocaleDateString(undefined, options)
    }
    
    const getOrderItemCount = (order) => {
      const orderData = getParsedOrderData(order)
      return orderData.reduce((total, item) => total + getItemQuantity(item), 0)
    }
    
    const getOrderTotal = (order) => {
      const orderData = getParsedOrderData(order)
      return orderData.reduce((total, item) => total + (getItemPrice(item) * getItemQuantity(item)), 0)
    }
    
    onMounted(() => {
      loadOrders()
    })
    
    return {
      orders,
      loading,
      selectedOrder,
      modalElement,
      loadOrders,
      showOrderDetails,
      formatDate,
      getOrderItemCount,
      getOrderTotal,
      getParsedOrderData,
      getItemTitle,
      getItemPrice,
      getItemQuantity,
      getItemImage
    }
  }
}
</script>

<style scoped>
.card {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
  transition: box-shadow 0.3s ease-in-out;
}

.card:hover {
  box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15);
}

.img-thumbnail {
  object-fit: cover;
}
</style>