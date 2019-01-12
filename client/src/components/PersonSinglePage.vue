<template>
  <div class="content">
    <div v-if="person">
      <h1>{{person.name}}</h1>
      <p v-if="person.team">Team: {{person.team.name}}</p>
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
};
</script>

<style scoped>
</style>
