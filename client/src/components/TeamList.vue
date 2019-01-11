<template>
  <div>
    <h1 class="title">Teams</h1>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="team in teams" v-bind:key="team.id">
          <router-link
            :to="{ name: 'team', params: { id: team.id }}"
            class="has-text-weight-semibold"
          >{{team.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'TeamList',
  computed: mapState('teams', ['teams']),
  beforeMount() {
    this.$store.dispatch('teams/load');
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
