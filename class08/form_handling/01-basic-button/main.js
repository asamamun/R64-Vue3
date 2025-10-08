//option API
const ButtonRow = { 
  template: `
    <div>
    Name: {{ formData.name }}<br/>
    Phone: {{ formData.phone }}<br/>
    Description: {{ formData.description }}
    <hr/>
      <button @click="onHoodieClick" class="ui button">Hoodie</button>
      <button @click="onTeeClick" class="ui button">Tee</button>
      <button @click="onFittedCapClick" class="ui button">Fitted Cap</button>
      <button @click="onJacketClick" class="ui button">Jacket</button>
      <br/>
      <textarea type="text" v-model="formData.description" name="description" ></textarea>
      <input type="text" v-model="formData.name" name="name"/>
      <input type="text" v-model="formData.phone" name="phone" />
    </div>`,
  data() {
    return {
      formData: {
        description: 'some description',
        name: 'IDBUW@example.com',
        phone: '3467865786'
      }
    }
  },
  methods: {
/*     onInputChange(evt) {
      //console.log('The user changed the input', evt.target.name, 'with value', evt.target.value); 
    }, */
    onHoodieClick(evt) {
      console.log('The user clicked button-hoodie', evt); 
    },
    onTeeClick(evt) {
      console.log('The user clicked button-tee', evt);  
    },
    onFittedCapClick(evt) {
      console.log('The user clicked button-fitted-cap', evt);  
    },
    onJacketClick(evt) {
      console.log('The user clicked button-jacket', evt);  
    }
  }
}

Vue.createApp({
  components: {
    'button-row': ButtonRow
  }
}).mount('#app')
