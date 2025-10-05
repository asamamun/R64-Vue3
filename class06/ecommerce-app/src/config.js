const config = {
    apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://192.168.54.81/ROUND57/VUE/ecommerce-app/APIS',
    apiProducts: 'https://dummyjson.com/products',
    endpoints: {
      placeOrder: '/place-order.php',
      getOrders: '/getorders.php'
    }
  }
  
  export default config