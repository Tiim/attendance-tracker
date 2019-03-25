<template>
  <div class="content">
    <div v-if="person">
      <h1>{{person.name}}</h1>
      <p v-if="person.team">Team: {{person.team.name}}</p>
      <AttendanceTable :person-id="person.id" :persons="[person]" :events="events"/>
    </div>
  </div>
</template> 

<script>
import AttendanceTable from '../components/AttendanceTable';
export default {
  name: 'PersonSinglePage',
  components: {
    AttendanceTable,
  },
  computed: {
    person() {
      return this.$store.state.person.persons.find(
        (t) => t.id == this.$route.params.id
      );
    },
    events() {
      let events = [];
      const person = this.person;
      events = this.$store.state.event.events.filter(
        (e) => e.teamId == person.teamId
      );
      return events;
    },
  },
  created() {
    this.$store.dispatch('person/load');
    this.$store.dispatch('event/loadForPerson', { id: this.$route.params.id });
  },
};
</script>

<style scoped>
</style>
