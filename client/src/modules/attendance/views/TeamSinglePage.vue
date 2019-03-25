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
      return this.$store.state.attendance.team.teams.find(
        (t) => t.id == this.$route.params.id
      );
    },

    events() {
      let events = [];
      events = events.concat(
        this.$store.state.attendance.event.events.filter(
          (e) => e.teamId == this.team.id
        )
      );
      return events;
    },

    persons() {
      let persons = [];
      persons = persons.concat(
        this.$store.state.attendance.person.persons.filter(
          (p) => p.teamId == this.team.id
        )
      );
      return persons;
    },
  },
  created() {
    this.$store.dispatch('attendance/team/load', this.$route.params.id);
    this.$store.dispatch('attendance/event/loadForTeam', {
      id: this.$route.params.id,
      limit: this.collumns,
    });
    this.$store.dispatch(
      'attendance/person/loadForTeam',
      this.$route.params.id
    );
  },
};
</script>

<style scoped>
</style>
