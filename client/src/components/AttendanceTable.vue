<template>
  <div>
    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th>Name</th>
            <th v-for="event in events" :key="event.id">
              <EventTitle :event="event"/>
            </th>
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
import EventTitle from './EventTitle';
export default {
  name: 'AttendanceTable',
  props: {
    personId: Number,
    teamId: Number,
  },
  components: {
    AttendanceTableEntry,
    EventTitle,
  },
  computed: {
    events() {
      let events = [];
      if (this.teamId) {
        events = events.concat(
          this.$store.state.event.events.filter((e) => e.teamId == this.teamId)
        );
      }
      if (this.personId) {
        events = events.concat(
          this.$store.state.event.events.filter(
            (e) => e.teamId == this.personId
          )
        );
      }
      return events;
    },
    persons() {
      let persons = [];
      if (this.personId) {
        persons = persons.push(
          this.$store.state.person.persons.find((p) => p.id == this.personId)
        );
      }
      if (this.teamId) {
        persons = persons.concat(
          this.$store.state.person.persons.filter(
            (p) => p.teamId == this.teamId
          )
        );
      }
      return persons;
    },
    tableData() {
      const persons = this.persons;
      const events = this.events;

      return persons.map((p) => ({
        person: p,
        attendances: events.map((e) => {
          const att = e.attendances || [];
          return (
            att.find((a) => a.personId == p.id) || {
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
