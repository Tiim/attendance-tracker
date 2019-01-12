<template>
  <div>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="person in persons" v-bind:key="person.id">
          <router-link :to="{name: 'person', params: {id: person.id}}">{{person.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonList',
  props: {
    teamId: {
      type: Number,
      required: false,
    },
  },
  computed: {
    persons() {
      if (this.teamId) {
        return this.$store.state.person.persons.filter((p) => {
          return p.teamId == this.teamId;
        });
      } else {
        return this.$store.state.person.persons;
      }
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
