<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useProductStore } from '@/stores/product'

const productStore = useProductStore()
</script>

<template>
  <div class="app-container">
    <!-- Top Navigation Menu -->
    <header class="top-nav">
      <nav class="nav-container">
        <RouterLink to="/" class="nav-link" active-class="active">Products</RouterLink>
        <RouterLink to="/cart" class="nav-link" active-class="active">
          Cart ({{ productStore.cartItemCount }})
        </RouterLink>
        <RouterLink to="/orders" class="nav-link" active-class="active">Orders</RouterLink>
      </nav>
    </header>

    <!-- Main Content Area -->
    <main class="main-content">
      <RouterView />
    </main>
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.top-nav {
  background-color: #f8f9fa;
  border-bottom: 1px solid #e0e0e0;
  padding: 0;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.nav-link {
  display: inline-block;
  padding: 15px 20px;
  text-decoration: none;
  color: #333;
  font-weight: 500;
  transition: color 0.3s;
  border-bottom: 3px solid transparent;
}

.nav-link:hover {
  color: #4caf50;
}

.nav-link.active {
  color: #4caf50;
  border-bottom: 3px solid #4caf50;
}

.main-content {
  flex: 1;
  padding: 20px 0;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
  padding: 20px;
}

@media (max-width: 768px) {
  .nav-container {
    flex-direction: column;
  }
  
  .nav-link {
    width: 100%;
    text-align: center;
    border-bottom: 1px solid #e0e0e0;
  }
  
  .nav-link:last-child {
    border-bottom: none;
  }
  
  .main-content {
    padding: 10px;
  }
}
</style>