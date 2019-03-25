<template>
  <div>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="person in persons" :key="person.id">
          <router-link :to="{name: 'attendance-person', params: {id: person.id}}">{{person.name}}</router-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PersonList',
  computed: {
    persons() {
      return this.$store.state.attendance.person.persons;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
