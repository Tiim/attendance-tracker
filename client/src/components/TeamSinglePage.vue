<template>
  <div>
    <div v-if="team">
      <div class="content">
        <h1>{{team.name}}</h1>
        <TeamAttendanceTable :teamId="team.id"/>
      </div>
      <div class="content">
        <PersonAdd :teamId="team.id"/>
      </div>
    </div>
  </div>
</template>

<script>
import PersonAdd from './PersonAdd';
import TeamAttendanceTable from './TeamAttendanceTable';
export default {
  name: 'TeamSinglePage',
  components: {
    TeamAttendanceTable,
    PersonAdd,
  },
  computed: {
    team() {
      return this.$store.state.team.teams.find(
        (t) => t.id == this.$route.params.id
      );
    },
  },
  created() {
    this.$store.dispatch('team/loadSingle', this.$route.params.id).then(() => {
      this.$store.state.event.events
        .filter((e) => e.teamId === this.team.id)
        .forEach((e) => this.$store.dispatch('event/loadSingle', e.id));
    });
  },
};
</script>

<style scoped>
</style>
