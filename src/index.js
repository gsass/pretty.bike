/*
* Define App components
* TODO move this to a module when it hits 80+ ll.
*/
const navMenu = {
  props: {
    routes: Array,
    currentHash: String,
  },
  template: `
    <div class="pure-menu">
      <ul class="pure-menu-list">
        <li v-for="route in routes" :key="route.hash" class="pure-menu-item">
          <a :href="route.hash" class="pure-menu-link">{{ route.label }}</a>
        </li>
      </ul>
    </div>
  `
}

/*
* Set up the state manager, a `vuex` store
*/

// First, add a cache for fetched markdown content
let contentCache = [
  // Supports elements of form {hash: String, content: String},
  {hash: '#', content: '# Hey.'},
];

const store = Vuex.createStore({
  state: { path: '#' },
  getters: {
    content: state => {
      const cached = contentCache.find(item => item.hash === state.path) || {};
      return cached.content;
    }
  },
  mutations: {
    setPath (state, newPath) {
      state.path = newPath
    }
  },
  actions: {
    navigate ({ commit }, newPath) {
      commit('setPath', newPath);
    }
  }
});

// Navigate to the desired path before setting up the main app
store.dispatch('navigate', window.location.hash || '#')

/*
* Set up the main app, and mount it in the container.
*/

const routes = [ // Rotes for this app are all hash-based and all here
];
const notFoundMessage = '## 404! Sad Times, Dogg.';

const app = Vue.createApp({
  data() { return {
    routes,
    ...Vuex.mapState(['path',]),
    ...Vuex.mapGetters(['content'])
  }},
  computed: {
    rendered() {
      return marked(
        this.content() || notFoundMessage,
        { sanitizer:  DOMPurify.sanitize }
      );
    }
  },
  template: `
    <div class="pure-g">
      <div id="menu" class="pure-u-1-5">
        <nav-menu :routes="routes"></nav-menu>
      </div>
      <div id="content" class="pure-u-4-5">
        <div v-html="rendered"></div>
      </div>
    </div>
  `
})

app.component('navMenu', navMenu)

app.use(store);
app.mount("#app");