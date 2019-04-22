<template>
  <div class="field">
    <div class="control">
      <input v-model="dateModel" class="input" type="date">
    </div>
  </div>
</template>
<script>
import { zeroPad } from '@/util/formatNumber';
export default {
  props: {
    value: { type: Date, default: () => null },
  },
  computed: {
    dateModel: {
      get() {
        if (!this.value || isNaN(this.value.getDate())) {
          return null;
        }
        const month = this.value.getUTCMonth() + 1; //months from 1-12
        const day = this.value.getUTCDate();
        const year = this.value.getUTCFullYear();

        return zeroPad(year, 4) + '-' + zeroPad(month) + '-' + zeroPad(day);
      },
      set(date) {
        if (!date || date.length == 0) {
          this.$emit('input', null);
        } else {
          this.$emit('input', new Date(date));
        }
      },
    },
  },
};
</script>
