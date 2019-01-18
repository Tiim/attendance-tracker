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
import TeamAdd from '../components/TeamAdd';
import TeamList from '../components/TeamList';
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
    this.$store.dispatch('team/load');
  },
};
</script>

<style scoped>
</style>
