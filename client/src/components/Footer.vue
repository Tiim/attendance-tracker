<template>
  <div class="container">
    <footer class="footer">
      <div class="content">
        <p>
          <strong>Attendance Tracker</strong>
        </p>
        <p>&copy;Tim Bachmann {{year}}</p>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'Footer',
  data() {
    return {
      year: new Date().getFullYear(),
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
