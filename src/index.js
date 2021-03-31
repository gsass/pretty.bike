/*
* Routes for this app are all hash-based and all here
* All routes must have attributes `name` and `hash`
* Routes may also have a `label` which allows them to appear in the nav,
* and a `contentPath` to load associated markdown content for the page
*/
const routes = [
  {name: 'home', hash: '#'},
  { name: 'mechanicals',
    hash: '#mechanicals',
    label: 'Mechanical Checklist',
    contentPath: 'mechanical_checklist.md'},
  { name: 'packing-list',
    hash: '#packing',
    label: 'Packing List',
    contentPath: 'packing_list.md'}
];

/*
* Define custom renderer to apply Pure classes as needed
* TODO modularize
*/
const renderer = {
  table(header, body) {
    if (body) body = '<tbody>' + body + '</tbody>';

    return '<table class="pure-table pure-table-bordered">\n'
      + '<thead>\n'
      + header
      + '</thead>\n'
      + body
      + '</table>\n';
  }
}
marked.use({ renderer })

/*
* Define App components
* TODO move this to a module when it hits 80+ ll.
*/
const navMenu = {
  props: { routes: Array },
  computed: {
    links() {
      return this.routes.filter(item => !!item.label)
    }
  },
  methods: Vuex.mapActions([ 'navigate' ]),
  template: `
    <div class="pure-menu nav-menu">
      <ul class="pure-menu-list">
        <li v-for="link in links" :key="link.hash" class="pure-menu-item">
          <a :href="link.hash" @click="navigate(link.hash)" class="pure-menu-link">
            {{ link.label }}
          </a>
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
      // Fetch and cache content if it isn't there...
      const route = routes.find(route => route.hash === newPath);
      let getContent = new Promise(() => {});
      const contentIsCached = contentCache.some(cached => cached.hash === newPath)
      if (route && route.contentPath && !contentIsCached) {
        getContent = fetch(`./content/${route.contentPath}`)
          .then(r => r.text())
          .then(content => contentCache.push({hash: newPath, content }))
      }
      // ...then update app store state
      getContent.then(() => commit('setPath', newPath));
    }
  }
});

// Navigate to the desired path before setting up the main app
store.dispatch('navigate', window.location.hash || '#')

/*
* Set up the main app, and mount it in the container.
*/
const app = Vue.createApp({
  data() { return {
    routes,
    ...Vuex.mapState(['path',]),
    ...Vuex.mapGetters(['content'])
  }},
  computed: {
    rendered() {
      return marked(this.content(), { sanitizer:  DOMPurify.sanitize });
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