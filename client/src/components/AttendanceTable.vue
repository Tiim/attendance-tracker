<template>
  <div>
    <div class="content">
      <table class="table">
        <thead>
          <tr>
            <th class="headerBottom">
              <div>
                <div>Name</div>
              </div>
            </th>
            <th v-for="event in events" :key="event.id">
              <EventTitle :event="event"/>
            </th>
            <th class="headerBottom">
              <a class="button" @click="addEvent()">+</a>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in tableData" :key="data.person.id">
            <td>{{data.person.name}}</td>
            <td v-for="att in data.attendances" :key="att.eventId +''+ att.personId">
              <AttendanceTableEntry :data="att"/>
            </td>
            <td></td>
          </tr>
        </tbody>
      </table>
    </div>
    <AddEventPopover v-if="addEventActive" @exit="addEventActive = false" @save="newEvent($event)"/>
  </div>
</template>

<script>
import AddEventPopover from './AddEventPopover';
import AttendanceTableEntry from './AttendanceTableEntry';
import EventTitle from './AttendanceTableEventTitle';
export default {
  name: 'AttendanceTable',
  components: {
    AddEventPopover,
    AttendanceTableEntry,
    EventTitle,
  },
  props: {
    personId: { type: Number, default: () => undefined },
    teamId: { type: Number, default: () => undefined },
  },
  data() {
    return {
      addEventActive: false,
    };
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
        const person = this.persons.find((p) => p.id == this.personId);
        events = events.concat(
          this.$store.state.event.events.filter(
            (e) => e.teamId == person.teamId
          )
        );
      }
      return events;
    },
    persons() {
      let persons = [];
      if (this.personId) {
        persons.push(
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
  methods: {
    addEvent() {
      this.addEventActive = true;
    },
    newEvent(event) {
      this.addEventActive = false;
      const teamId = this.teamId || this.persons[0].teamId;
      this.$store.dispatch('event/addNewEvent', { ...event, teamId });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.headerBottom {
  vertical-align: bottom;
}
</style>
