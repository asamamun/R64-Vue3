// Vuex store
const store = Vuex.createStore({
    state() {
      return {
        todos: []

      }
    },
    mutations: {
      addTodo(state, todo) {
        state.todos.push(todo)
      },
      toggleTodo(state, id) {
        const todo = state.todos.find(todo => todo.id === id)
        if (todo) {
          todo.completed = !todo.completed
        }
      },
      deleteTodo(state, id) {
        state.todos = state.todos.filter(todo => todo.id !== id)
      }
    },
    actions: {
      addTodo({ commit }, text) {
        const todo = {
          id: Date.now(),
          text,
          completed: false
        }
        commit('addTodo', todo)
      },
      toggleTodo({ commit }, id) {
        commit('toggleTodo', id)
      },
      deleteTodo({ commit }, id) {
        commit('deleteTodo', id)
      }
    },
    getters: {
      allTodos: state => state.todos
    }
  })
  
  // Input component
  const inputComponent = {
    template: `
      <div class="mb-3">      
        <input v-model="newTodo" @keyup.enter="addTodo" class="form-control" placeholder="Add a new todo">
      </div>
    `,
    data() {
      return {
        newTodo: '55'
      }
    },
    methods: {
      addTodo() {
        if (this.newTodo.trim()) {
          this.$store.dispatch('addTodo', this.newTodo)
          this.newTodo = ''
        }
      }
    }
  }
  
  // Todo list component
  const todoList = {
    template: `
      <ul class="list-group">
        <li v-for="todo in todos" :key="todo.id" class="list-group-item d-flex justify-content-between align-items-center">
          <div>
            <input type="checkbox" :checked="todo.completed" @change="toggleTodo(todo.id)" class="form-check-input me-2"> {{todo.completed}}
            <span :class="{ 'text-decoration-line-through': todo.completed }">{{ todo.text }}</span>
          </div>
          <button @click="deleteTodo(todo.id)" class="btn btn-danger btn-sm">Delete</button>
        </li>
      </ul>
    `,
    computed: {
      todos() {
        return this.$store.getters.allTodos
      }
    },
    methods: {
      toggleTodo(id) {
        this.$store.dispatch('toggleTodo', id)
      },
      deleteTodo(id) {
        this.$store.dispatch('deleteTodo', id)
      }
    }
  }

  // Howto component explaining Vuex concepts
  const howto = {
    template: `
      <div class="card mt-4">
        <div class="card-header">
          <h3>How Vuex Works in This App</h3>
        </div>
        <div class="card-body">
          <h5>What is Vuex?</h5>
          <p>Vuex is a state management pattern and library for Vue.js applications. It serves as a centralized store for all the components in an application, with rules ensuring that the state can only be mutated in a predictable fashion.</p>
          
          <h5>Core Concepts in This Implementation</h5>
          <ul>
            <li><strong>State</strong>: The source of truth that drives our app. In this app, it's the todos array.</li>
            <li><strong>Getters</strong>: Computed properties for stores. Used to retrieve todos from the state.</li>
            <li><strong>Mutations</strong>: The only way to actually change state in a Vuex store. They are synchronous transactions.</li>
            <li><strong>Actions</strong>: Similar to mutations, but they can contain arbitrary asynchronous operations.</li>
          </ul>
          
          <h5>How It Works in This Todo App</h5>
          <ol>
            <li><strong>Store Creation</strong>: We create a Vuex store with state, mutations, actions, and getters.</li>
            <li><strong>Adding Todos</strong>: When a user adds a todo, the inputComponent dispatches the addTodo action, which creates a todo object and commits the addTodo mutation to add it to the state.</li>
            <li><strong>Displaying Todos</strong>: The todoList component uses the allTodos getter to retrieve todos from the state.</li>
            <li><strong>Toggling Todos</strong>: When a user toggles a todo, the todoList dispatches the toggleTodo action, which commits the toggleTodo mutation to update the todo's completed status.</li>
            <li><strong>Deleting Todos</strong>: When a user deletes a todo, the todoList dispatches the deleteTodo action, which commits the deleteTodo mutation to remove it from the state.</li>
          </ol>
          
          <h5>Understanding Commit and Mutations</h5>
          <p>In Vuex, the only way to change the state is by committing a mutation. Mutations are synchronous transactions that directly modify the state. Each mutation has a string type and a handler function. The handler function is where we make actual state modifications, and it will receive the state as the first argument.</p>
          
          <p>For example, in our todo app:</p>
          <pre><code>
  mutations: {
    addTodo(state, todo) {
      state.todos.push(todo)
    },
    toggleTodo(state, id) {
      const todo = state.todos.find(todo => todo.id === id)
      if (todo) {
        todo.completed = !todo.completed
      }
    },
    deleteTodo(state, id) {
      state.todos = state.todos.filter(todo => todo.id !== id)
    }
  }
          </code></pre>
          
          <p>Components never directly call mutation handlers. Instead, we commit a mutation by calling <code>store.commit('mutationType', payload)</code>. In our app, this happens indirectly through actions:</p>
          
          <pre><code>
  actions: {
    addTodo({ commit }, text) {
      const todo = {
        id: Date.now(),
        text,
        completed: false
      }
      commit('addTodo', todo)  // This is where commit is called
    }
  }
          </code></pre>
          
          <h5>Vue Directives Used in This App</h5>
          <p>You might notice several Vue directives in the template code:</p>
          <ul>
            <li><strong>:key</strong>: The colon (:) is shorthand for v-bind. So :key is the same as v-bind:key. It dynamically binds the key attribute to the value of todo.id. Without the colon, key would be treated as a literal string "todo.id" rather than the actual value of todo.id.</li>
            <li><strong>:checked</strong>: Similarly binds the checked attribute of the checkbox to todo.completed.</li>
            <li><strong>:class</strong>: Dynamically binds CSS classes based on the todo's completed status.</li>
            <li><strong>@change and @click</strong>: Shorthand for v-on:change and v-on:click event handlers.</li>
          </ul>
          
          <h5>Data Flow</h5>
          <p>Components &rarr; Actions (dispatch) &rarr; Mutations (commit) &rarr; State &rarr; Getters &rarr; Components</p>
        </div>
      </div>
    `
}

// Vue app
const app = Vue.createApp({
  components: {
    'howto': howto,
    'input-component': inputComponent,
    'todo-list': todoList
    
  }
})

app.use(store)
app.mount('#app')