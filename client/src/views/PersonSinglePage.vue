<template>
  <div class="content">
    <div v-if="person">
      <h1>{{person.name}}</h1>
      <p v-if="person.team">Team: {{person.team.name}}</p>
      <AttendanceTable :personId="person.id"/>
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
  },
  created() {
    this.$store.dispatch('person/loadSingle', this.$route.params.id);
  },
};
</script>

<style scoped>
</style>
