<template>
  <div>
    <div class="box field is-grouped">
      <p class="control">
        <a class="button is-small is-grouped" @click="addTeamActive = true">Add Team</a>
      </p>
      <p class="control">
        <a class="button is-small is-grouped" @click="addPersonActive = true">Add Person</a>
      </p>
      <p v-if="selected" class="control">
        <a class="button is-small is-grouped" @click="deleteSelected()">Delete</a>
      </p>
    </div>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="team in teams" :key="team.id">
          <a :class="{'is-active': activeTeam == team.id}" @click="selectTeam(team)">{{team.name}}</a>
          <ul>
            <li v-for="person in team.persons" :key="person.id">
              <a
                :class="{'is-active': activePerson == person.id}"
                @click="selectPerson(person)"
              >{{person.name}}</a>
            </li>
          </ul>
        </li>
      </ul>
      <AddTeamPopover v-if="addTeamActive" @exit="addTeamActive = false" @save="saveTeam($event)"/>
      <AddPersonPopover
        v-if="addPersonActive"
        @exit="addPersonActive = false"
        @save="savePerson($event)"
      />
    </div>
  </div>
</template>

<script>
import AddPersonPopover from './AddPersonPopover';
import AddTeamPopover from './AddTeamPopover';
export default {
  name: 'TeamTree',
  components: {
    AddPersonPopover,
    AddTeamPopover,
  },
  data() {
    return {
      activeTeam: null,
      activePerson: null,
      addTeamActive: false,
      addPersonActive: false,
    };
  },

  computed: {
    selected() {
      return this.activeTeam || this.activePerson;
    },
    teams() {
      return this.$store.state.attendance.team.teams.map((t) => {
        return {
          ...t,
          persons:
            this.$store.state.attendance.person.persons.filter(
              (p) => p.teamId === t.id
            ) || [],
        };
      });
    },
  },
  methods: {
    saveTeam(team) {
      this.addTeamActive = false;
      this.$store.dispatch('attendance/team/newTeam', team);
    },
    savePerson(person) {
      this.addPersonActive = false;
      this.$store.dispatch('attendance/person/newPerson', person);
    },
    selectTeam(team) {
      this.activeTeam = team.id;
      this.activePerson = null;
    },
    selectPerson(person) {
      this.activeTeam = null;
      this.activePerson = person.id;
    },
    deleteSelected() {
      const id = this.selected;
      if (this.activeTeam) {
        this.$store.dispatch('attendance/team/delete', id);
      } else {
        this.$store.dispatch('attendance/person/delete', id);
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
