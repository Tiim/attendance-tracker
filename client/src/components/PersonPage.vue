<template>
  <div>
    <div class="content">
      <h1 class="title">People</h1>
      <PersonList/>
    </div>
    <div class="content">
      <PersonAdd/>
    </div>
  </div>
</template>

<script>
import PersonAdd from './PersonAdd';
import PersonList from './PersonList';
export default {
  name: 'PersonPage',
  components: {
    PersonAdd,
    PersonList,
  },
  created() {
    this.$store.dispatch('person/load');
  },
};
</script>

<style scoped>
</style>
