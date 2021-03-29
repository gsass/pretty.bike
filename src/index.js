/*
* Define App components
* TODO move this to a module when it hits 80+ ll.
*/
const navMenu = {
  props: {
    links: Array,
    currentHash: String,
  },
  template: `
    <ul>
      <li v-for="link in links" :key="link.hash">
        <a :href="link.hash">{{ link.label }}</a>
      </li>
    </ul>
  `
}

/*
* Set up the state manager, a `vuex` store
*/
const store = Vuex.createStore({
  state: {
    path: window.location.hash
  },
  mutations: {
    setPath (state, newPath) {
      state.path = newPath
    }
  },
  actions: {
    navigate ({ commit }, newPath) {
      // TODO remove side effect from action!
      window.location.hash = newPath;
      commit('setPath', newPath);
    }
  }
});


/*
* Set up the main app, and mount it in the container.
*/
const app = Vue.createApp({
  data() {
    return {
      input: '# Hey.',
      links: [
        {hash: "#info", label: "Info"},
        {hash: "#map", label: "Map"}
      ],
      currentHash: "#info"
    }
  },
  computed: {
    rendered() {
      return marked(this.input, { sanitizer:  DOMPurify.sanitize });
    }
  },
  template: `
    <nav-menu :links="links"></nav-menu>
    <div v-html="rendered"></div>
  `
})

app.component('navMenu', navMenu)

app.use(store);
app.mount("#app");