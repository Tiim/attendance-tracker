<template>
  <div class="content">
    <div class="content">
      <TeamList/>
    </div>
  </div>
</template>

<script>
import TeamList from '../components/TeamList';
export default {
  name: 'TeamPage',
  components: {
    TeamList,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('attendance/team/load');
  },
};
</script>

<style scoped>
</style>
