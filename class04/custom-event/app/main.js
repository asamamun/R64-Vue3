const inputComponent = {
  // emits: ['add-note'],
  template: `
  <h3>{{input}}</h3>
  <input 
  :placeholder="placeholder" 
  v-model="userinput" 
  @keyup.enter="monitorEnterKey"
  class="input is-small" 
  type="text" />`,
  props: ["placeholder"],
  methods: {
    monitorEnterKey() {
      this.$emit('add-note', {
        userinput: this.userinput,
        timestamp: new Date().toLocaleString()     
      });
      this.userinput = '';
    }
  },
  data() {
    return {
      userinput: ''
    }
  }
}

const noteCountComponent = {
  template: `
  <p>Total Notes: {{ notes.length }}</p>
  `,
  props: ["notes"]
}

const app = {
  components: {
    'input-component': inputComponent,
    'note-count-component': noteCountComponent
  },
  methods: {
    addNote(note) {
      this.notes.push(note.userinput);
      this.timestamps.push(note.timestamp);
    }
  },
  data() {
    return {
      notes: [],
 timestamps: [],
 placeholder: 'Enter your note'
    }
  }
};

Vue.createApp(app).mount('#app');
