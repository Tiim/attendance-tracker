<template>
  <div>
    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th v-for="event in events" v-bind:key="event.id">{{event.date}}</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{{person.name}}</td>
            <td v-for="data in tableData" v-bind:key="data.id">
              <AttendanceTableEntry v-bind:data="data"/>
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
    personId: Number,
  },
  components: {
    AttendanceTableEntry,
  },
  computed: {
    tableData() {
      return this.events.map((e) => {
        const att = e.attendances || [];
        return (
          att.find((a) => a.personId == this.person.id) || {
            eventId: e.id,
            personId: this.person.id,
            state: 'absent',
          }
        );
      });
    },
    person() {
      return this.$store.state.person.persons.find(
        (p) => p.id == this.personId
      );
    },
    events() {
      return this.$store.state.event.events.filter(
        (e) => e.teamId === this.person.teamId
      );
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
