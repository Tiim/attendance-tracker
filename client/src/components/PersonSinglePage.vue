<template>
  <div class="content">
    <div v-if="person">
      <h1>{{person.name}}</h1>
      <p v-if="person.team">Team: {{person.team.name}}</p>
      <pre>{{JSON.stringify(person, null, 2)}}</pre>
      <pre>{{JSON.stringify(status, null, 2)}}</pre>
    </div>
    <div v-else>
      <p>loading..</p>
    </div>
  </div>
</template> 

<script>
export default {
  name: 'PersonSinglePage',
  components: {},
  computed: {
    id() {
      return parseInt(this.$route.params.id);
    },
    person() {
      return this.$store.state.person.people.find((t) => t.id === this.id);
    },
    status() {
      return this.$store.state.status;
    },
  },
  beforeMount() {
    console.log(this);
    this.$store.dispatch('person/load').then(() => {
      console.log(this);
      this.$store.dispatch('status/load', { teamId: this.person.team.id });
    });
  },
};
</script>

<style scoped>
</style>
