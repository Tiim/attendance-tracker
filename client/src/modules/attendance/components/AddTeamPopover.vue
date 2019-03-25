<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Add Team</p>
        </header>
        <div class="card-content">
          <div class="field">
            <label class="label">Team Name</label>
            <div class="control">
              <input v-model="teamName" class="input" type="text" placeholder="Team Name">
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a class="card-footer-item" @click="exit()">Exit</a>
          <a class="card-footer-item" @click="save()">Save</a>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      teamName: '',
    };
  },
  methods: {
    exit() {
      this.$emit('exit');
    },
    save() {
      this.$emit('save', { name: this.teamName });
    },
  },
};
</script>
