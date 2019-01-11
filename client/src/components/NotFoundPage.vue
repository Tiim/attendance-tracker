<template>
  <div class="content">
    <div class="notification is-danger">
      <router-link class="delete" to="/"/>
      <h1 class="title">404</h1>
      <h2 class="subtitle is-5">Page not found</h2>
      <p>The page you are looking for doesn't exist or an other error occured.</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'NotFoundPage',
  components: {},
};
</script>

<style scoped>
</style>
