<template>
  <div>
    <Split
      v-for="(item,idx) in array"
      :key="item.index"
      :value="item"
      :index="idx"
      @input="update"
    />
  </div>
</template>

<script>
import Split from './Split';

export default {
  name: 'SplitsForm',
  components: { Split },
  props: {
    value: { type: Array, default: () => [] },
  },
  data() {
    return {
      index: 0,
    };
  },
  computed: {
    array() {
      const v = [];
      this.value.forEach((e, i) => {
        this.$set(v, i, e);
        if (!v[i].index) {
          v[i].index = i;
        }
      });
      this.$set(v, this.value.length, {
        start: 0,
        end: 100,
        time: 60000,
        index: this.next(),
      });
      return v;
    },
  },
  methods: {
    update(event) {
      const array = this.value;
      if (event.value) {
        this.$set(array, event.index, event.value);
      } else {
        console.log(array.splice(event.index, 1));
      }
      this.$emit('input', array);
    },
    next() {
      return ++this.index;
    },
  },
};
</script>
<style scoped>
</style>
