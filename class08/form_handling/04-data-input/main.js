//option API
const InputForm = { 
  template: `
    <div class="input-form">
    {{formData.newItem}} - {{formData.newQuantity}}
      <form @submit="submitForm" class="ui form">\
        <div class="field">
          <input v-model="formData.newItem" type="text" placeholder="Add an item!">
        </div>
        <div class="field">
          <input v-model="formData.newQuantity" type="number" placeholder="Add an item!">
        </div>
        <button class="ui button">Submit</button>
      </form>
    </div>`,
  data() {
/*     return {
      newItem: '',
      newQuantity: ''
    } */
    return {
      formData:{
        newItem: 'AA',
        newQuantity: '8'
      }
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();
      console.log(this.formData.newItem , this.formData.newQuantity)
      // console.log(this.newQuantity)
    }
  }
}

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#app')
