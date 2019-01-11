<template>
  <div class="columns">
    <div class="column box">
      <h4>Add Team</h4>
      <div class="field">
        <p class="control">
          <input class="input" type="text" v-model="name" placeholder="Team Name">
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
    return {
      errors: [],
      name: '',
    };
  },

  methods: {
    submit() {
      this.errors = [];

      if (!this.name || this.name.length < 3) {
        this.errors.push('Name must be set and at least 3 characters long');
      }

      if (!this.errors.length) {
        this.$store.dispatch('teams/add', {
          name: this.name,
        });
        this.name = '';
      }
    },
  },
};
</script>

<style scoped>
</style>
