<template>
  <div class="columns">
    <div class="column box">
      <h4>Add Person to #{{teamId?teamId:''}}</h4>
      <div class="field">
        <p class="control">
          <input v-model="name" class="input" type="text" placeholder="Name">
        </p>
      </div>
      <div v-if="errors.length" class="field">
        <div class="notification is-warning">
          <dl class="content">
            <dt v-for="e in errors" :key="e">{{e}}</dt>
          </dl>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button class="button is-link" @click="submit">Add Person</button>
        </p>
      </div>
    </div>
    <div class="column"></div>
  </div>
</template>

<script>
export default {
  name: 'TeamAdd',

  props: {
    teamId: {
      type: Number,
      required: false,
      default: () => null,
    },
  },
  data() {
    return {
      errors: [],
      name: '',
    };
  },

  methods: {
    submit() {
      //TODO: submit new person
    },
  },
};
</script>

<style scoped>
</style>
