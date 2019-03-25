<template>
  <div class="modal is-active">
    <div class="modal-background"></div>
    <div class="modal-content">
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">Event</p>
        </header>
        <div class="card-content">
          <label class="label">Event Date</label>
          <div class="field has-addons">
            <div class="control">
              <input v-model="date" class="input" type="text" placeholder="Event Date">
            </div>
            <div class="control">
              <button class="button" @click="btnNow()">Now</button>
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
      date: this.startdate(),
    };
  },
  methods: {
    startdate() {
      const date = new Date();
      const min = Math.round(date.getMinutes() / 15) * 15;
      date.setMinutes(min);
      date.setSeconds(0);
      return date.toString();
    },
    exit() {
      this.$emit('exit');
    },
    save() {
      const date = new Date(this.date);
      this.$emit('save', { date });
    },
    btnNow() {
      this.date = this.startdate();
    },
  },
};
</script>
