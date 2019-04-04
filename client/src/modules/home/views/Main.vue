<template>
  <div>
    <Header/>
    <div class="section">
      <div class="container">
        <div class="columns is-multiline">
          <div
            v-for="modules in listModules"
            :key="modules.i"
            class="column is-one-third-desktop is-half-tablet"
          >
            <div class="columns is-mobile">
              <Tile v-for="m in modules.arr" :key="m.link" :module="m"/>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import Tile from '../components/Tile';
import modules from '../modules';

export default {
  name: 'HomeIndex',
  components: { Header, Footer, Tile },
  data() {
    return {
      chunkSize: 2,
    };
  },
  computed: {
    listModules() {
      var R = [];
      for (var i = 0; i < modules.length; i += this.chunkSize)
        R.push({ i: i, arr: modules.slice(i, i + this.chunkSize) });
      return R;
    },
  },
};
</script>
<style scoped>
</style>
