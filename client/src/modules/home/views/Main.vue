<template>
  <div>
    <div class="columns is-multiline">
      <div
        v-for="modules in listModules"
        :key="modules"
        class="column is-one-third-desktop is-half-tablet"
      >
        <div class="columns is-mobile">
          <Tile v-for="m in modules" :key="m.name" :module="m"/>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Tile from '../components/Tile';
import modules from '../modules';

export default {
  name: 'HomeIndex',
  components: { Tile },
  data() {
    return {
      chunkSize: 2,
    };
  },
  computed: {
    listModules() {
      var R = [];
      for (var i = 0; i < modules.length; i += this.chunkSize)
        R.push(modules.slice(i, i + this.chunkSize));
      return R;
    },
  },
};
</script>
<style scoped>
</style>
