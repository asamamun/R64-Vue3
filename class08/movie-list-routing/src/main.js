// import { createApp } from 'vue'
import { createApp } from 'vue/dist/vue.esm-bundler';
/* import './style.css'
import App from './App.vue' */
import App from './app/app-complete';
import { router } from './app/app-complete';

createApp(App).use(router).mount('#app');
