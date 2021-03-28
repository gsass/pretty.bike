const app = Vue.createApp({
  data() {
    return {
      input: '# Hey.'
    }
  },
  computed: {
    rendered() {
      return marked(this.input, { sanitizer:  DOMPurify.sanitize });
    }
  },
  template: `
    <div v-html="rendered"></div>
  `
})

const store = Vuex.createStore({
  state: {
    path: '#'
  },
  mutations: {
    setPath (state, newPath) {
      state.path = newPath
    }
  },
  actions: {
    navigate ({ commit }, newPath) {
      window.location.hash = newPath;
      commit('setPath', newPath);
    }
  }
});

app.use(store);
app.mount("#app");