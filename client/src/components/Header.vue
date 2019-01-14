<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item has-text-weight-bold" href="/">Attendance Tracker</a>
        
        <a role="button" @click="tapBurger" class="navbar-burger burger">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>
      <div :class="{'navbar-menu': true, 'is-active': mobileMenuOpen}">
        <div class="navbar-start">
          <router-link @click.native="closeBurger" to="/" class="navbar-item">Home</router-link>
          <router-link @click.native="closeBurger" to="/team" class="navbar-item">Teams</router-link>
          <router-link @click.native="closeBurger" to="/person" class="navbar-item">People</router-link>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Header',
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
