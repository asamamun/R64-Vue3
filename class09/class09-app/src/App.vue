<template>
  <div id="app">
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
// App.vue is the main component that defines the layout structure
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100vh;
}

.container {
  display: flex;
  min-height: calc(100vh - 60px);
}

main {
  flex: 1;
  padding: 20px;
  background-color: #f8f9fa;
}

/* Responsive layout */
@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}
</style>