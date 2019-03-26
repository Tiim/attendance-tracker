<template>
  <div class="column is-half">
    <div class="box">
      <router-link :to="module.link">
        <div class>
          <img :src="module.icon">
          <p class="has-text-centered">{{module.name}}</p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tile',
  props: {
    module: {
      type: Object,
      default: () => ({
        name: 'Home',
        link: '/attendance',
        icon: '/modules/home/home.svg',
      }),
    },
  },
  computed: {},
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
