<template>
  <nav class="navbar" role="navigation" aria-label="main navigation">
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
          <router-link to="/" class="navbar-item" @click.native="closeBurger">Home</router-link>
          <router-link to="/team" class="navbar-item" @click.native="closeBurger">Teams</router-link>
          <router-link to="/person" class="navbar-item" @click.native="closeBurger">People</router-link>
          <router-link to="/manage" class="navbar-item" @click.native="closeBurger">Manage</router-link>
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
