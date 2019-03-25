<template>
  <div class="content">
    <div v-if="persons">
      <h1>Event {{ event.date}}</h1>
      <AttendanceTable :persons="persons" :events="events"/>
    </div>
  </div>
</template> 

<script>
import AttendanceTable from '../components/AttendanceTable';
export default {
  name: 'EventSinglePage',
  components: {
    AttendanceTable,
  },
  computed: {
    event() {
      return this.$store.state.attendance.event.events.find(
        (e) => e.id === this.$route.params.id
      );
    },
    persons() {
      return this.$store.state.attendance.person.persons.filter(
        (p) => p.teamId == this.event.teamId
      );
    },
    events() {
      return [this.event];
    },
  },
  created() {
    this.$store.dispatch('attendance/event/loadSingle', this.$route.params.id);
  },
};
</script>

<style scoped>
</style>
