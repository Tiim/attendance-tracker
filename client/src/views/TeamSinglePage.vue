<template>
  <div>
    <div v-if="team">
      <div class="content">
        <h1>{{team.name}}</h1>
        <AttendanceTable
          :team-id="team.id"
          :collumns="collumns"
          :events="events"
          :persons="persons"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AttendanceTable from '../components/AttendanceTable';
export default {
  name: 'TeamSinglePage',
  components: {
    AttendanceTable,
  },
  data() {
    return {
      collumns: 4,
    };
  },
  computed: {
    team() {
      return this.$store.state.team.teams.find(
        (t) => t.id == this.$route.params.id
      );
    },

    events() {
      let events = [];
      events = events.concat(
        this.$store.state.event.events.filter((e) => e.teamId == this.team.id)
      );
      return events;
    },

    persons() {
      let persons = [];
      persons = persons.concat(
        this.$store.state.person.persons.filter((p) => p.teamId == this.team.id)
      );
      return persons;
    },
  },
  created() {
    this.$store.dispatch('team/load', this.$route.params.id);
    this.$store.dispatch('event/loadForTeam', {
      id: this.$route.params.id,
      limit: this.collumns,
    });
    this.$store.dispatch('person/loadForTeam', this.$route.params.id);
  },
};
</script>

<style scoped>
</style>
