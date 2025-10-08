<template>
  <div class="home">
    <h1>Vue3 Multiple View Layout</h1>
    <p>This is a demonstration of multiple view layouts with props passing in Vue3.</p>
    <nav>
      <router-link to="/">Dashboard</router-link>
      <router-link to="/category/electronics">Electronics</router-link>
      <router-link to="/category/clothing">Clothing</router-link>
    </nav>
  </div>
</template>

<script setup lang="ts">
// Home view component
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

.home h1 {
  color: #42b983;
}

nav {
  margin-top: 20px;
}

nav a {
  display: inline-block;
  margin: 0 10px;
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  text-decoration: none;
  border-radius: 4px;
  transition: background-color 0.3s;
}

nav a:hover {
  background-color: #359c6d;
}
</style>