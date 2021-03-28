const app = Vue.createApp({
  data() {
    return {
      input: '# Hey.'
    }
  },
  computed: {
    rendered() {
      return marked(this.input, { sanitize: true });
    }
  },
  /** methods: {
    update: _.debounce(function(e) {
      this.input = e.target.value;
    }, 300)
  } */
})

app.mount("#app");