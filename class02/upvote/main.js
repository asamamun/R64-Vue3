const submissionComponent = {
  template: `<marquee><h1>Submission Component Placeholder</h1></marquee>`,
  props: ['submissions'],  
};

const productComponent = {

  // template: `<marquee><h1>Product Component Placeholder</h1></marquee>`,
  template: `<div class="columns is-multiline">
          <div v-for="product in products" :key="product.id" class="column is-one-third">
            <article class="media box">
              <figure class="media-left">
                <img
                  class="image is-64x64"
                  :src="product.thumbnail"
                />
              </figure>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>
                      <a class="has-text-info">
                        {{ product.title }}
                      </a>
                    </strong>
                    <br />
                    {{ product.description }}
                    <br />
                    <small class="is-size-7">
                      Price: {{ product.price }}
                    </small>
                  </p>
                </div>
              </div>
            </article>
          </div>
        </div>`,
  props: ['products'],
  // No methods needed for this simple display component

};
const upvoteApp = {
  data() {
    return {
      submissions: window.Seed.submissions,
      products: [],
    };
  },
  components: {
    // Register any components here if needed
    "submission-component": submissionComponent,
    "product-component": productComponent,
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
  methods: {
    upvote(submissionId) {
      const submission = this.submissions.find(
 (submission) => submission.id === submissionId
 );
      submission.votes += 1;
    },
    downvote(submissionId) {
      const submission = this.submissions.find(
        (submission) => submission.id === submissionId
      );
      submission.votes -= 1;
    },
  },
};

Vue.createApp(upvoteApp).mount("#app");
