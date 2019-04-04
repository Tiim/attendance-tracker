<template>
  <nav class="navbar has-shadow is-spaced" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item has-text-weight-bold" href="/">Attendance Tracker</a>

        <a role="button" class="navbar-burger burger" @click="tapBurger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div :class="{'navbar-menu': true, 'is-active': mobileMenuOpen}">
        <div class="navbar-start">
          <router-link
            v-for="link in links"
            :key="link.to"
            :to="link.to"
            class="navbar-item"
            @click.native="closeBurger"
          >{{link.name}}</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
  props: {
    links: { type: Array, default: () => [{ name: 'Home', to: '/' }] },
  },
  data() {
    return {
      mobileMenuOpen: false,
    };
  },
  methods: {
    tapBurger() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeBurger() {
      this.mobileMenuOpen = false;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
