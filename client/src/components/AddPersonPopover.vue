<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Add Person</p>
        </header>
        <div class="card-content">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input v-model="personName" class="input" type="text" placeholder="Name">
            </div>
          </div>
          <div class="field">
            <label class="label">Team</label>
            <div class="control">
              <div v-for="team in teams" :key="team.id">
                <input v-model="teamId" type="radio" name="team" :value="team.id">
                {{team.name}}
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <a href="#" class="card-footer-item" @click="exit()">Exit</a>
          <a href="#" class="card-footer-item" @click="save()">Save</a>
        </footer>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      personName: '',
      teamId: 0,
    };
  },
  computed: {
    teams() {
      return this.$store.state.team.teams;
    },
  },
  methods: {
    exit() {
      this.$emit('exit');
    },
    save() {
      this.$emit('save', { name: this.personName, teamId: this.teamId });
    },
  },
};
</script>
