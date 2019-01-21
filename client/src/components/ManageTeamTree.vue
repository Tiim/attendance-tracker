<template>
  <div>
    <div class="box field is-grouped">
      <p class="control">
        <a class="button is-small is-grouped" @click="addTeamActive = true">Add Team</a>
      </p>
      <p class="control">
        <a class="button is-small is-grouped" @click="addPersonActive = true">Add Person</a>
      </p>
    </div>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="team in teams" :key="team.id">
          <a class="is-active">{{team.name}}</a>
          <ul>
            <li v-for="person in team.persons" :key="person.id">
              <a>{{person.name}}</a>
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
      addTeamActive: false,
      addPersonActive: false,
    };
  },

  computed: {
    teams() {
      return this.$store.state.team.teams.map((t) => {
        return {
          ...t,
          persons:
            this.$store.state.person.persons.filter((p) => p.teamId === t.id) ||
            [],
        };
      });
    },
  },
  methods: {
    saveTeam(team) {
      this.addTeamActive = false;
      this.$store.dispatch('team/newTeam', team);
    },
    savePerson(person) {
      this.addPersonActive = false;
      this.$store.dispatch('person/newPerson', person);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
