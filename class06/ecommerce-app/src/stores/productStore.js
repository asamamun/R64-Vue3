import { defineStore } from 'pinia'
import axios from 'axios'
import config from '../config'

export const useProductStore = defineStore('products', {
  state: () => ({
    products: [],
    cart: [],
    orders: []
  }),
  
  getters: {
    cartTotal: (state) => {
      return state.cart.reduce((total, item) => total + item.price * item.quantity, 0)
    }
  },
  
  actions: {
    async fetchProducts() {
      try {
        const response = await axios.get(config.apiProducts)
        this.products = response.data.products
      } catch (error) {
        console.error('Error fetching products:', error)
      }
    },
    
    async fetchOrders() {
      try {
        const response = await axios.get(`${config.apiBaseUrl}${config.endpoints.getOrders}`)
        if (response.data.success) {
          // Ensure order_data is properly parsed
          const orders = response.data.orders.map(order => {
            if (typeof order.order_data === 'string' && order.order_data) {
              try {
                if (order.order_data.trim() !== '' && order.order_data.trim() !== 'null') {
                  order.order_data = JSON.parse(order.order_data)
                } else {
                  order.order_data = []
                }
              } catch (e) {
                console.error('Error parsing order_data for order', order.id, ':', e)
                order.order_data = []
              }
            }
            return order
          })
          this.orders = orders
        }
      } catch (error) {
        console.error('Error fetching orders:', error)
      }
    },
    
    addToCart(product) {
      const existingProduct = this.cart.find(item => item.id === product.id)
      if (existingProduct) {
        existingProduct.quantity++
      } else {
        this.cart.push({ ...product, quantity: 1 })
      }
      this.saveCartToLocalStorage()
    },
    
    removeFromCart(productId) {
      this.cart = this.cart.filter(item => item.id !== productId)
      this.saveCartToLocalStorage()
    },
    
    updateQuantity({ productId, quantity }) {
      const product = this.cart.find(item => item.id === productId)
      if (product) {
        product.quantity = quantity
      }
      this.saveCartToLocalStorage()
    },
    
    clearCart() {
      this.cart = []
      this.saveCartToLocalStorage()
    },
    
    async placeOrder(orderData) {
      try {
        const url = `${config.apiBaseUrl}${config.endpoints.placeOrder}`
        const response = await axios.post(url, orderData)
        if (response.data.success) {
          this.clearCart()
          // Refresh orders after placing a new order
          await this.fetchOrders()
          return true
        }
        return false
      } catch (error) {
        console.error('Error placing order:', error)
        return false
      }
    },
    
    saveCartToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.cart))
    },
    
    loadCartFromLocalStorage() {
      const savedCart = localStorage.getItem('cart')
      if (savedCart) {
        this.cart = JSON.parse(savedCart)
      }
    }
  }
})