<template>
  <div>
    <div class="content">
      <h1 class="title">People</h1>
      <PersonList/>
    </div>
  </div>
</template>

<script>
import PersonList from '../components/PersonList';
export default {
  name: 'PersonPage',
  components: {
    PersonList,
  },
  created() {
    this.$store.dispatch('attendance/person/load');
  },
};
</script>

<style scoped>
</style>
