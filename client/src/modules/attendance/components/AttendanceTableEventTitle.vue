<template>
  <div class="rotate">
    <div>
      <router-link :to="{name: 'attendance-event', params: {id: event.id}}">{{text}}</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'EventTitle',
  props: {
    event: {
      type: Object,
      default: () => ({
        id: 1,
        date: new Date(),
      }),
    },
  },
  computed: {
    text() {
      const date = this.event.date;
      return `${date.toLocaleString('de-ch')}`;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rotate {
  writing-mode: vertical-lr;
  transform: rotate(180deg);
  white-space: nowrap;
}
</style>
