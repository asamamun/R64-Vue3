const upvoteApp = {
  data() {
    return {
      submissions: window.Seed.submissions,
      products: [],
    };
  },
  //in vue created hook called when instance is created
  created() {
    fetch('https://dummyjson.com/products')
      .then((response) => response.json())
      .then((data) => {
        console.log('Products received from API:', data.products);
        this.products = data.products;
      })
      .catch((error) => {
        console.error('Error fetching products:', error);
      });
  },
  mounted() {
    // This hook runs after the component is mounted to the DOM.
    // You can access all your component's data using 'this'.
    console.log('Vue app has been mounted!');
    console.log('Initial data object:', this.$data);
    console.log('Submissions data:', this.submissions);
    console.log('Products data (will be empty initially, then update):', this.products);
  },
  //computed
  computed: {
    sortedSubmissions() {
      return this.submissions.sort((a, b) => {
        return b.votes - a.votes;
      });
    },
  },
};

Vue.createApp(upvoteApp).mount("#app");
