import routes from './routes.js';
import renderMarkdown from './renderer.js';
import components from './components.js';

/*
* Set up the state manager, a `vuex` store
*/

// First, add a cache for fetched markdown content
let contentCache = [
  // Stores elements of form {hash: String, content: String}
];
const notFoundMessage = '## 404! Sad Times, Dogg.';

const store = Vuex.createStore({
  state: { path: null },
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
      const pageHash = newPath.split('-')[0]; // To allow kebab links e.g. #maps-downloads
      const route = routes.find(route => route.hash === pageHash);
      const contentIsCached = contentCache.some(cached => cached.hash === pageHash)
      // Fetch and cache content if it isn't there.
      if (route && route.contentPath && !contentIsCached) {
        return fetch(`./content/${route.contentPath}`)
          .then(r => r.text())
          .then(content => contentCache.push({hash: pageHash, content }))
          .then(() => commit('setPath', pageHash));
      }
      return new Promise(() => commit('setPath', pageHash));
    }
  }
});

/*
* Set up the main app, and mount it in the container.
*/
const app = Vue.createApp({
  components,
  data() {
    return { routes, ...Vuex.mapState(['path']), ...Vuex.mapGetters(['content'])};
  },
  computed: {
    rendered() {
      return renderMarkdown(this.content());
    }
  },
  methods: {
    ...Vuex.mapActions([ 'navigate' ]),
    listenToRenderedLinks() {
      this.$refs.content.querySelectorAll("a[href]").forEach((link) => {
        const url = new URL(link.href);
        if (url.hostname === window.location.hostname) { link.onclick = () => this.navigate(url.hash) }
      }, this);
    }
  },
  mounted() { this.$nextTick(() => this.listenToRenderedLinks()) },
  updated() { this.$nextTick(() => this.listenToRenderedLinks()) },
  template: `
    <div class="pure-g">
      <div id="menu" class="pure-u-1-5">
        <nav-menu :routes="routes"></nav-menu>
      </div>
      <div id="contentWrapper" class="pure-u-4-5">
        <div class="content" ref="content" v-html="rendered"></div>
      </div>
    </div>
  `
})

// Connect app to the state store
app.use(store);

// Navigate to the initial path, then render the app
store
  .dispatch('navigate', window.location.hash || '#')
  .then(() => app.mount("#app"));