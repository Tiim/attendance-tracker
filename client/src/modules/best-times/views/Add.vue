<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-half">
          <div class="field">
            <label class="label">Person</label>
            <div class="control">
              <input v-model="person" class="input" type="text" placeholder="Name">
            </div>
          </div>
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input v-model="date" class="input" type="date">
            </div>
          </div>
          <label class="label">Category</label>
          <div class="field is-grouped">
            <div class="control">
              <input v-model="distance" class="input" type="text" placeholder="100">
            </div>
            <div class="control">
              <input v-model="distance" class="input" type="text" placeholder="Free">
            </div>
          </div>
          <div class="field">
            <label class="label">Time</label>
            <div class="control">
              <input v-model="time" class="input" type="text" placeholder="1:00.01">
            </div>
          </div>
          <div class="field">
            <label class="label">Notes</label>
            <div class="control">
              <textarea v-model="notes" class="textarea"/>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeIndex',
  components: {},
  data() {
    return {
      person: '',
    };
  },
};
</script>
<style scoped>
</style>
