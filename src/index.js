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
  state: {}
});

app.use(store);
app.mount("#app");