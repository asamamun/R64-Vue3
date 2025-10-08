//SFC 
const InputForm = { 
  template: `
    <div class="input-form">
    {{newItem}} - {{quantity}}
      <h2>Add an Item</h2>
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <input v-model="newItem" type="text" placeholder="Add an item!" />
        </div>
        <div class="field">
          <input v-model="quantity" type="number" placeholder="1" />
        </div>
        <button class="ui button">Submit</button>
      </form>
    </div>`,
    data() {
      return {
        newItem: 'abc',
        quantity: 5
      }
    },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      console.log(this.newItem, this.quantity)
    }
  }
}

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#app')
