<script setup>
import { ref, onMounted } from 'vue'
import { useProductStore } from '@/stores/product'
import ProductList from '@/components/ProductList.vue'

const productStore = useProductStore()
const showAddProduct = ref(false)
const newProduct = ref({
  title: '',
  description: '',
  price: 0,
  thumbnail: '',
  category: '',
  brand: ''
})

onMounted(() => {
  productStore.fetchProducts()
})

function addProduct() {
  if (!newProduct.value.title || !newProduct.value.price) {
    alert('Please fill in required fields')
    return
  }
  
  productStore.addProduct(newProduct.value)
  showAddProduct.value = false
  newProduct.value = {
    title: '',
    description: '',
    price: 0,
    thumbnail: '',
    category: '',
    brand: ''
  }
}
</script>

<template>
  <main>
    <div class="header-section">
      <h1>Products</h1>
      <button @click="showAddProduct = true" class="add-product-btn">Add Product</button>
    </div>
    
    <div v-if="productStore.loading">Loading products...</div>
    <div v-else-if="productStore.error">Error: {{ productStore.error }}</div>
    <div v-else>
      <ProductList 
        :products="productStore.products" 
        @add-to-cart="productStore.addToCart"
      />
    </div>
    
    <!-- Add Product Modal -->
    <div v-if="showAddProduct" class="modal-overlay">
      <div class="modal">
        <h2>Add New Product</h2>
        <div class="form-group">
          <label>Title *</label>
          <input v-model="newProduct.title" class="form-input" placeholder="Product title">
        </div>
        
        <div class="form-group">
          <label>Description</label>
          <textarea v-model="newProduct.description" class="form-input" placeholder="Product description"></textarea>
        </div>
        
        <div class="form-group">
          <label>Price *</label>
          <input v-model.number="newProduct.price" type="number" class="form-input" placeholder="Product price">
        </div>
        
        <div class="form-group">
          <label>Thumbnail URL</label>
          <input v-model="newProduct.thumbnail" class="form-input" placeholder="Image URL">
        </div>
        
        <div class="form-group">
          <label>Category</label>
          <input v-model="newProduct.category" class="form-input" placeholder="Product category">
        </div>
        
        <div class="form-group">
          <label>Brand</label>
          <input v-model="newProduct.brand" class="form-input" placeholder="Product brand">
        </div>
        
        <div class="modal-actions">
          <button @click="showAddProduct = false" class="cancel-btn">Cancel</button>
          <button @click="addProduct" class="confirm-btn">Add Product</button>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.header-section {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}

.add-product-btn {
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
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

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.form-input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
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