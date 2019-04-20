<template>
  <div class="field has-addons">
    <div class="control">
      <div class="select">
        <select v-model="selected" @change="onChange">
          <option v-for="p in pool" :key="p">{{p}}</option>
        </select>
      </div>
    </div>
    <p class="control">
      <a class="button is-static">{{selectedFull.length}}{{selectedFull.unit}}</a>
    </p>
  </div>
</template>
<script>
import poolData from '../../../../../shared/data/pool';

export default {
  name: 'CourseForm',
  props: {
    value: { type: String, default: () => poolData[0].name },
  },
  data() {
    const pool = poolData.map((p) => p.name);
    return {
      selected: this.value,
      pool,
    };
  },
  computed: {
    selectedFull() {
      return poolData.find((p) => p.name === this.selected);
    },
  },
  methods: {
    onChange() {
      this.$emit('input', this.selected);
    },
  },
};
</script>
