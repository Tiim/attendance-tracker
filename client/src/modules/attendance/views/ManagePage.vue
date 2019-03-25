<template>
  <div>
    <div class="content">
      <h1>Manage</h1>
    </div>
    <div>
      <ManageTeamTree/>
    </div>
  </div>
</template>

<script>
import ManageTeamTree from '../components/ManageTeamTree';
export default {
  name: 'ManagePage',
  components: {
    ManageTeamTree,
  },
  data() {
    return {};
  },
  created() {
    this.$store.dispatch('attendance/team/load');
    this.$store.dispatch('attendance/person/load');
  },
};
</script>

<style scoped>
</style>
