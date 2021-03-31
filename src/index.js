import routes from './routes.js';
import renderMarkdown from './renderer.js';
import components from './components.js';

/*
* Set up the state manager, a `vuex` store
*/

// First, add a cache for fetched markdown content
let contentCache = [
  // Supports elements of form {hash: String, content: String},
  {hash: '#', content: '# Hey.'},
];
const notFoundMessage = '## 404! Sad Times, Dogg.';

const store = Vuex.createStore({
  state: { path: '#' },
  getters: {
    content(state) {
      const cached = contentCache.find(item => item.hash === state.path) || {};
      return cached.content || notFoundMessage;
    }
  },
  mutations: {
    setPath(state, newPath) { state.path = newPath }
  },
  actions: {
    navigate({ commit }, newPath) {
      const route = routes.find(route => route.hash === newPath);
      const contentIsCached = contentCache.some(cached => cached.hash === newPath)
      // Fetch and cache content if it isn't there.
      if (route && route.contentPath && !contentIsCached) {
        fetch(`./content/${route.contentPath}`)
          .then(r => r.text())
          .then(content => contentCache.push({hash: newPath, content }))
          .then(() => commit('setPath', newPath));
      } else {
        commit('setPath', newPath);
      }
    }
  }
});

// Navigate to the desired path before setting up the main app
store.dispatch('navigate', window.location.hash || '#')

/*
* Set up the main app, and mount it in the container.
*/
const app = Vue.createApp({
  components,
  data() { return {
    routes,
    ...Vuex.mapState(['path',]),
    ...Vuex.mapGetters(['content'])
  }},
  computed: {
    rendered() {
      return renderMarkdown(this.content());
    }
  },
  template: `
    <div class="pure-g">
      <div id="menu" class="pure-u-1-5">
        <nav-menu :routes="routes"></nav-menu>
      </div>
      <div id="contentWrapper" class="pure-u-4-5">
        <div class="content" v-html="rendered"></div>
      </div>
    </div>
  `
})

app.use(store);
app.mount("#app");