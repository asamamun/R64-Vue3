import { createRouter, createWebHistory } from 'vue-router';
import About from '../components/About.vue';
import Dunkrik from '../components/Dunkrik.vue';
import Interstellar from '../components/Interstellar.vue';
import TheDarkKnightRises from '../components/TheDarkKnightRises.vue';
import MovieDetails from '../components/MovieDetails.vue';
import top20Movies from '../seed';

const routes = [
  {
    path: '/',
    component: {
      name: 'index-blurb',
      template: `<h2>Pick a Christopher Nolan movie!</h2> OR <h2>Pick a movie from the list!</h2>`
    }
  },
  {path: '/dunkirk', component: Dunkrik},
  {path: '/interstellar', component: Interstellar},
  {path: '/the-dark-knight-rises', component: TheDarkKnightRises},
  {path:'/about', component: About}, 
  { path: '/movie/:id', component: MovieDetails },
  {
    path: '/:pathMatch(.*)*',
    component: {
      name: 'not-found-blurb',
      template: `<h2>Not Found :(. Pick a movie from the list!</h2>`
    }
  }
];

const App = {
  name: 'App',
  data() {
    return {
      movies: null
    };
  },
  methods: {
    getmovieLink(id) {
      return `/movie/${id}`;
    }
  },
  mounted() {
    this.movies = top20Movies;
    console.log(this.movies);
  },
  template: `
  <div id="app">
    <div class="movies">
      <h2>Which movie?</h2>
      <router-link to="/dunkirk">dunkirk</router-link> |
      <router-link to="/interstellar">interstellar</router-link> |
      <router-link to="/the-dark-knight-rises">the-dark-knight-rises</router-link> |
      <router-link to="/about">about</router-link>
      <ol>
        <router-link to="/movie/1">1</router-link> | 
        <router-link to="/movie/2">2</router-link> |
        <router-link to="/movie/3">3</router-link> |
        <router-link to="/movie/4">4</router-link>
      </ol>
      <ul>
        <li v-for="movie in movies" :key="movie.id">
          <router-link :to="getmovieLink(movie.id)">{{ movie.title }}</router-link>
        </li>
      </ul>
      <hr>
      <router-view></router-view>
    </div>
  </div>
`
};


export const router = createRouter({
  history: createWebHistory(),
  routes
});

export default App;
