<script setup>
import { ref, onMounted } from 'vue';

// Reactive state to store the posts, loading status, and any errors.
const posts = ref([]);
const isLoading = ref(true);
const error = ref(null);

// Fetch data when the component is mounted.
onMounted(async () => {
  try {
    const response = await fetch('https://dummyjson.com/posts');
    if (!response.ok) {
      // Handle HTTP errors like 404 or 500
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    // The API returns an object with a 'posts' array
    posts.value = data.posts;
  } catch (e) {
    // Handle fetch errors (e.g., network issues) or the error thrown above
    error.value = e.message;
    console.error("Failed to fetch posts:", e);
  } finally {
    // This will run regardless of success or failure
    isLoading.value = false;
  }
});
</script>

<template>
  <div class="posts-page">
    <h1>Latest Posts</h1>

    <!-- Show a loading message while data is being fetched -->
    <div v-if="isLoading" class="loading-message">
      <p>Loading posts...</p>
    </div>

    <!-- Show an error message if the fetch failed -->
    <div v-else-if="error" class="error-message">
      <p>Sorry, we couldn't load the posts. Error: {{ error }}</p>
    </div>

    <!-- Once data is loaded, display the list of posts -->
    <div v-else class="posts-container">
      <!-- 
        v-for iterates over the 'posts' array.
        'post' is the alias for each item in the array.
        ':key' is a special attribute that helps Vue efficiently update the list.
        It should be a unique identifier for each item, like 'post.id'.
      -->
      <article v-for="post in posts" :key="post.id" class="post-card">
        <h2>{{ post.title }}</h2>
        <p>{{ post.body }}</p>
        <div class="post-meta">
          <div class="tags">
            <!-- You can even have nested v-for loops -->
            <span v-for="tag in post.tags" :key="tag" class="tag">
              #{{ tag }}
            </span>
          </div>
          <div class="reactions">
            ❤️ {{ post.reactions }}
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style scoped>
/* 'scoped' means these styles will only apply to this component */
.posts-page {
  font-family: sans-serif;
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.loading-message, .error-message {
  text-align: center;
  padding: 40px;
  font-size: 1.2rem;
}

.error-message {
  color: #d32f2f;
}

.posts-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 20px;
}

.post-card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  padding: 16px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 2px 5px rgba(0,0,0,0.05);
  transition: transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
}

.post-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 4px 10px rgba(0,0,0,0.1);
}

.post-card h2 {
  font-size: 1.25rem;
  margin: 0 0 10px 0;
}

.post-card p {
  flex-grow: 1;
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

.post-meta {
  margin-top: auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
}

.tags .tag {
  background-color: #f0f0f0;
  padding: 2px 8px;
  border-radius: 4px;
  margin-right: 5px;
  color: #555;
  font-size: 0.8rem;
}

.reactions {
  color: #e53935;
  font-weight: bold;
}
</style>