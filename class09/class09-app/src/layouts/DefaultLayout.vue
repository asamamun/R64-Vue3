<template>
  <div class="layout">
    <router-view name="header"></router-view>
    <div class="container">
      <router-view name="sidebar"></router-view>
      <main>
        <router-view name="main"></router-view>
      </main>
      <router-view name="wishlist"></router-view>
    </div>
  </div>
</template>

<script setup lang="ts">
// Default layout component that defines the structure for named router views
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  display: flex;
  flex: 1;
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>