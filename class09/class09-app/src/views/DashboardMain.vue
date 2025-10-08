<template>
  <div class="main-content">
    <h2>{{ pageTitle }}</h2>
    
    <div class="product-list">
      <ProductCard 
        v-for="product in displayedProducts" 
        :key="product.id"
        :product="product"
        @add-to-cart="handleAddToCart"
        @add-to-wishlist="handleAddToWishlist"
      />
    </div>
    
    <div v-if="displayedProducts.length === 0" class="no-products">
      <p>No products found in this category.</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useProductStore } from '../stores/productStore'
import ProductCard from '../components/ProductCard.vue'
import type { Product } from '../stores/productStore'

// Define props
interface Props {
  categoryId?: string
}

const props = defineProps<Props>()

// Use store
const productStore = useProductStore()

// Computed properties
const displayedProducts = computed(() => {
  if (props.categoryId) {
    return productStore.products.filter(product => product.category === props.categoryId)
  }
  return productStore.filteredProducts
})

const pageTitle = computed(() => {
  if (props.categoryId) {
    return `${props.categoryId.charAt(0).toUpperCase() + props.categoryId.slice(1)} Products`
  }
  if (productStore.selectedCategory) {
    return `${productStore.selectedCategory.charAt(0).toUpperCase() + productStore.selectedCategory.slice(1)} Products`
  }
  return 'All Products'
})

// Methods
function handleAddToCart(product: Product) {
  productStore.addToCart(product)
}

function handleAddToWishlist(product: Product) {
  productStore.addToWishlist(product)
}
</script>

<style scoped>
.main-content {
  padding: 20px;
}

.main-content h2 {
  color: #333;
  margin-top: 0;
}

.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.no-products {
  text-align: center;
  padding: 40px;
  color: #666;
}

@media (max-width: 768px) {
  .product-list {
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 15px;
  }
}
</style>