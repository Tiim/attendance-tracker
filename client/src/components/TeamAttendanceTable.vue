<template>
  <div>
    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th v-for="event in events" :key="event.id">{{event.date}}</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in tableData" :key="data.person.id">
            <td>{{data.person.name}}</td>
            <td v-for="att in data.attendances" :key="att.eventId +''+ att.personId">
              <AttendanceTableEntry :data="att"/>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import AttendanceTableEntry from './AttendanceTableEntry';
export default {
  name: 'PersonAttendanceTable',
  props: {
    teamId: Number,
  },
  components: {
    AttendanceTableEntry,
  },
  computed: {
    events() {
      return this.$store.state.event.events.filter(
        (e) => e.teamId === this.teamId
      );
    },
    tableData() {
      const persons = this.$store.state.person.persons.filter(
        (p) => p.teamId === this.teamId
      );
      const events = this.events;

      return persons.map((p) => ({
        person: p,
        attendances: events.map((e) => {
          const att = e.attendances || [];
          return (
            att.find((a) => a.personId === p.id) || {
              eventId: e.id,
              personId: p.id,
              state: 'absent',
            }
          );
        }),
      }));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
