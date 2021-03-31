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
    <div class="pure-menu nav-menu">
      <ul class="pure-menu-list">
        <li v-for="link, index in links" :key="link.hash" :class="index ? 'pure-menu-item' : 'pure-menu-heading'">
          <a :href="link.hash" @click="navigate(link.hash)" class="pure-menu-link">
            {{ link.label }}
          </a>
        </li>
      </ul>
    </div>
  `
}

export default { navMenu };