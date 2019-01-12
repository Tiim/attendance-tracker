<template>
  <div class="columns">
    <div class="column box">
      <h4>Add Team</h4>
      <div class="field">
        <p class="control">
          <input class="input" type="text" v-model="name" placeholder="Team Name">
        </p>
      </div>
      <div class="field">
        <p class="control">
          <button @click="submit" class="button is-link">Add Team</button>
        </p>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
export default {
  name: 'TeamAdd',
  data() {
    return { name: '' };
  },
  methods: {
    submit() {
      //TODO: Submit new team
    },
  },
};
</script>

<style scoped>
</style>
