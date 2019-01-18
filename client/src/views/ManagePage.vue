<template>
  <div class="content">
    <h1>Manage</h1>
    <ManageTeamTree/>
  </div>
</template>

<script>
import ManageTeamTree from '@/components/ManageTeamTree';
export default {
  name: 'ManagePage',
  data() {
    return {};
  },
  components: {
    ManageTeamTree,
  },
  created() {
    this.$store.dispatch('team/load');
  },
};
</script>

<style scoped>
</style>
