import renderMarkdown from './renderer.js';

/*
* Define App components
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
    <div class="pure-g nav-menu">
      <div v-for="link, index in links" :key="link.hash" :class="index ? 'pure-u-1-6 pure-u-lg-1' : 'pure-u-1'">
        <a :href="link.hash" @click="navigate(link.hash)" class="pure-menu-link">
          {{ link.label }}
        </a>
      </div>
    </div>
  `
};

const renderedMarkdown = {
  props: { content: Function },
  computed: {
    rendered() {
      return renderMarkdown(this.content());
    }
  },
  methods: {
    ...Vuex.mapActions([ 'navigate' ]),
    connectRenderedLinks() {
      // Adds a `navigate` action to the onclick event of local links
      this.$refs.content.querySelectorAll("a[href]").forEach((link) => {
        const url = new URL(link.href);
        if (url.hostname === window.location.hostname) { link.onclick = () => this.navigate(url.hash) }
      }, this);
    }
  },
  mounted() { this.$nextTick(() => this.connectRenderedLinks()) },
  updated() { this.$nextTick(() => this.connectRenderedLinks()) },
  template: `<div class="content" ref="content" v-html="rendered"></div>`
};

export default { navMenu, renderedMarkdown };