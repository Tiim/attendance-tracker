<template>
  <div>
    <button v-on:click="onClick" :class="classes">{{text}}</button>
  </div>
</template>

<script>
export default {
  name: 'AttendanceTableEntry',
  props: {
    data: Object,
  },
  methods: {
    onClick() {
      const cycle = {
        present: 'excused',
        absent: 'present',
        excused: 'absent',
      };
      const newState = cycle[this.data.state];
      this.$store.dispatch('event/setAttendanceState', {
        old: this.data,
        newState,
      });
    },
  },
  computed: {
    text() {
      const text = {
        present: '+',
        absent: '-',
        excused: '*',
      };
      return text[this.data.state];
    },
    classes() {
      const classes = ['button'];
      const colors = {
        present: 'is-primary',
        absent: 'is-danger',
        excused: 'is-warning',
      };
      return [...classes, colors[this.data.state]];
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.button {
  width: 36px;
  height: 36px;
}
</style>
