<template>
  <div class="columns">
    <div class="column box">
      <h4>Add Person to #{{teamId?teamId:''}}</h4>
      <div class="field">
        <p class="control">
          <input class="input" type="text" v-model="name" placeholder="Name">
        </p>
      </div>
      <div class="field" v-if="errors.length">
        <div class="notification is-warning">
          <dl class="content">
            <dt v-for="e in errors" v-bind:key="e">{{e}}</dt>
          </dl>
        </div>
      </div>
      <div class="field">
        <p class="control">
          <button @click="submit" class="button is-link">Add Person</button>
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
    return {
      errors: [],
      name: '',
    };
  },

  props: {
    teamId: {
      type: Number,
      required: false,
      default: () => null,
    },
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
