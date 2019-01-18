<template>
  <div class="content">
    <ul>
      <li v-for="team in teams" :key="team.id">
        {{team.name}}
        <ul>
          <li v-for="person in team.persons" :key="person.id">{{person.name}}</li>
          <li>
            <button class="button is-small">Add Person</button>
          </li>
        </ul>
      </li>
      <li>
        <button class="button is-small">Add Team</button>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'TeamTree',
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
