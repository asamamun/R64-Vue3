const InputForm = { 
  template: `
    <div class="input-form">
      <form @submit="submitForm" class="ui form">
        <div class="field">
          <label>New Item</label>
          <input v-model="fields.newItem" type="text"
            placeholder="Add an item!" />
          <span style="color: red">{{ fieldErrors.newItem }}</span>
        </div>
        <div class="field">
          <label>Email</label>
          <input v-model="fields.email" type="text"
            placeholder="What's your email?" />
          <span style="color: red">{{ fieldErrors.email }}</span>
        </div>
        <div class="field">
          <label>Urgency</label>
          <select v-model="fields.urgency" class="ui fluid search dropdown">
            <option disabled value="">Please select one</option>
            <option>Nonessential</option>
            <option>Moderate</option>
            <option>Urgent</option>
          </select>
          <span style="color: red">{{ fieldErrors.urgency }}</span>
        </div>
        <div class="field">
          <div class="ui checkbox">
            <input v-model="fields.termsAndConditions" type="checkbox" />
            <label>I accept the terms and conditions</label>
            <span style="color: red">{{ fieldErrors.termsAndConditions }}</span>
          </div>
        </div>
        <button class="ui button">Submit</button>
      </form>
      <div class="ui segment">
        <h4 class="ui header">Items</h4>
        <ul>
          <li v-for="item in items" class="item">{{ item }}</li>
        </ul>
      </div>
      <h3>V-if Statement example, clicking terms and conditions set fields.termsAndConditions to true that is why id terms-and-conditions is visible</h3>

      <div id="terms-and-conditions" class="ui segment" v-if="fields.termsAndConditions"> 
      <marquee>
      <h4 class="ui header">Terms and Conditions</h4>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl. Sed euismod, nisl nec ultricies lacinia, nisl nisl aliquam nisl, eget aliquam nisl nisl sit amet nisl.
      </p>
      </marquee>
      </div>
    </div>`,
  data() {
    return {
      fields: {
        newItem: '',
        email: '',
        urgency: '',
        termsAndConditions: false
      },
      fieldErrors: {
        newItem: null,
        email: null,
        urgency: null,
        termsAndConditions: null
      },
      items: []
    }
  },
  methods: {
    submitForm(evt) {
      evt.preventDefault();

      this.fieldErrors = this.validateForm(this.fields);
      if (Object.keys(this.fieldErrors).length) return;

      this.items.push(this.fields.newItem);
      this.fields.newItem = '';
      this.fields.email = '';
      this.fields.urgency = '';
      this.fields.termsAndConditions = false;
    },
    validateForm(fields) {
      const errors = {};
      if (!fields.newItem) errors.newItem = "New Item Required";
      if (!fields.email) errors.email = "Email Required";
      if (!fields.urgency) errors.urgency = "Urgency Required";
      if (!fields.termsAndConditions) {
        errors.termsAndConditions = "Terms and conditions have to be approved";
      }

      if (fields.email && !this.isEmail(fields.email)) {
        errors.email = "Invalid Email";
      }

      return errors;
    },
    isEmail(email) {
      const re = /\S+@\S+\.\S+/;
      return re.test(email);
    }
  }
}

Vue.createApp({
  components: {
    'input-form': InputForm
  }
}).mount('#app')
