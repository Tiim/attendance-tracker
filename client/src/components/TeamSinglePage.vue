<template>
  <div>
    <div v-if="team">
      <div class="content">
        <h1>{{team.name}}</h1>
        <PersonList :teamId="team.id"/>
      </div>
      <div class="content">
        <PersonAdd :teamId="team.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import PersonAdd from './PersonAdd';
import PersonList from './PersonList';
export default {
  name: 'TeamSinglePage',
  components: {
    PersonAdd,
    PersonList,
  },
  computed: {
    team() {
      return this.$store.state.team.teams.find(
        (t) => t.id == this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch('team/loadSingle', this.$route.params.id);
  },
};
</script>

<style scoped>
</style>
