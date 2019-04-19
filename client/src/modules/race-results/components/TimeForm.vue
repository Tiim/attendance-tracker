<template>
  <div>
    <div class="field has-addons">
      <div class="control">
        <input v-model="timeH" class="input time-nr" type="text" placeholder="h">
      </div>
      <p class="control">
        <a class="button is-static">:</a>
      </p>
      <div class="control">
        <input v-model="timeM" class="input time-nr" type="text" placeholder="m">
      </div>
      <p class="control">
        <a class="button is-static">:</a>
      </p>
      <div class="control">
        <input v-model="timeS" class="input time-nr" type="text" placeholder="s">
      </div>
      <p class="control">
        <a class="button is-static">.</a>
      </p>
      <div class="control">
        <input v-model="timeHs" class="input time-nr" type="text" placeholder="hs">
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment';
import { hideZero } from '@/util/formatNumber';

export default {
  name: 'TimeForm',
  components: {},
  props: {
    value: { type: Number, default: () => 0 },
  },
  computed: {
    timeH: {
      get() {
        return hideZero(
          Math.floor(moment.duration(this.value, 'millisecond').asHours())
        );
      },
      set(h) {
        this.compute({ h });
      },
    },
    timeM: {
      get() {
        return hideZero(moment.duration(this.value, 'millisecond').minutes());
      },
      set(m) {
        this.compute({ m });
      },
    },
    timeS: {
      get() {
        return hideZero(moment.duration(this.value, 'millisecond').seconds());
      },
      set(s) {
        this.compute({ s });
      },
    },
    timeHs: {
      get() {
        return hideZero(
          moment.duration(this.value, 'millisecond').milliseconds() / 10
        );
      },
      set(hs) {
        this.compute({ hs });
      },
    },
  },
  methods: {
    compute(n) {
      const h = Number(n.h || this.timeH);
      const m = Number(n.m || this.timeM);
      const s = Number(n.s || this.timeS);
      const hs = Number(n.hs || this.timeHs);
      let d = moment.duration(h, 'hour');
      d = d.add(m, 'minute');
      d = d.add(s, 'second');
      d = d.add(hs * 10, 'millisecond');
      const ms = d.asMilliseconds();
      this.$emit('input', ms);
    },
  },
};
</script>
<style scoped>
.time-nr {
  max-width: 3em;
}
</style>
