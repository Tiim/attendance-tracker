<template>
  <div class="field has-addons">
    <p class="control">
      <a class="button is-static">Start:</a>
    </p>
    <div class="control">
      <input v-model="start" class="input" type="text" placeholder="start" @input="update()">
    </div>
    <p class="control">
      <a class="button is-static">End:</a>
    </p>
    <div class="control">
      <input v-model="end" class="input" type="text" placeholder="end" @input="update()">
    </div>
    <p class="control">
      <a class="button is-static">m time:</a>
    </p>
    <TimeForm v-model="time" @input="update()"/>
    <p class="control">
      <a class="button is-warning" @click="del()">X</a>
    </p>
  </div>
</template>

<script>
import TimeForm from './TimeForm';

export default {
  name: 'Split',
  components: { TimeForm },
  props: {
    index: { type: Number, default: () => 0 },
    value: { type: Object, default: () => ({ start: 0, end: 0, time: 60000 }) },
  },
  data() {
    return {
      start: this.value.start,
      end: this.value.end,
      time: this.value.time,
    };
  },
  computed: {},
  methods: {
    del() {
      this.$emit('input', { index: this.index, value: null });
    },
    update() {
      this.start = Number(this.start);
      this.end = Number(this.end);
      this.time = Number(this.time);
      this.$emit('input', {
        index: this.index,
        value: {
          ...this.value,
          start: Number(this.start),
          end: Number(this.end),
          time: this.time,
        },
      });
    },
  },
};
</script>
<style scoped>
</style>
