<template>
  <div>
    <div v-if="team">
      <div class="content">
        <h1>{{team.name}}</h1>
        <PersonList :teamId="id"/>
      </div>
      <div class="content">
        <PersonAdd :teamId="id"/>
      </div>
    </div>
    <div v-else>
      <p>loading..</p>
    </div>
  </div>
</template>

<script>
import PersonAdd from './PersonAdd';
import PersonList from './PersonList';
export default {
  name: 'TeamSinglePage',
  data() {
    return {};
  },
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },
    team() {
      return this.$store.state.teams.teams.find((t) => t.id === this.id);
    },
  },
  components: {
    PersonAdd,
    PersonList,
  },
  beforeMount() {
    this.$store.dispatch('teams/load');
    this.$store.dispatch('person/load');
  },
};
</script>

<style scoped>
</style>
