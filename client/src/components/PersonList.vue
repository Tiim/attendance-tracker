<template>
  <div>
    <div class="menu">
      <ul class="menu-list">
        <li v-for="person in people" v-bind:key="person.id">
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
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
