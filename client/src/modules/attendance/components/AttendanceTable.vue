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
            <th class="headerBottom">
              <a v-if="!isSingle" class="button" @click="prev()">&lt;</a>
            </th>
            <th v-for="event in eventsPaginated" :key="event.id">
              <EventTitle :event="event"/>
            </th>
            <th class="headerBottom">
              <div v-if="!isSingle">
                <a class="button" @click="addEvent()">+</a>
                <a class="button" @click="next()">&gt;</a>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="data in tableData" :key="data.person.id">
            <td>{{data.person.name}}</td>
            <td></td>
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
    collumns: { type: Number, default: () => 8 },
    events: { type: Array, default: () => [] },
    persons: { type: Array, default: () => [] },
  },
  data() {
    return {
      addEventActive: false,
      offset: 0,
    };
  },
  computed: {
    isSingle() {
      return !this.personId && !this.teamId;
    },
    eventsPaginated() {
      return this.events
        .slice()
        .reverse()
        .slice(this.offset, this.collumns + this.offset)
        .reverse();
    },
    tableData() {
      const persons = this.persons;
      const events = this.eventsPaginated;
      console.log(events);

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
      this.$store.dispatch('attendance/event/newEvent', { ...event, teamId });
    },
    next() {
      this.offset = Math.max(0, this.offset - this.collumns);
    },
    prev() {
      if (this.eventsPaginated.length === 0 || this.isSingle) {
        return;
      }
      const command = this.teamId ? 'loadForTeam' : 'loadForPerson';

      this.$store.dispatch(`attendance/event/${command}`, {
        id: this.teamId || this.personId,
        limit: this.collumns,
        before: this.events[0].date,
      });
      this.offset = this.offset + this.collumns;
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
