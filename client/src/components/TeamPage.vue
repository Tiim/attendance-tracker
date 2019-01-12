<template>
  <div class="content">
    <div class="content">
      <TeamList/>
    </div>
    <div class="content">
      <TeamAdd/>
    </div>
  </div>
</template>

<script>
import TeamAdd from './TeamAdd';
import TeamList from './TeamList';
export default {
  name: 'TeamPage',
  data() {
    return {};
  },
  components: {
    TeamAdd,
    TeamList,
  },
  created() {
    this.$store.dispatch('teams/load');
  },
};
</script>

<style scoped>
</style>
