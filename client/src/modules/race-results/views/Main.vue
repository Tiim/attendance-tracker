<template>
  <div>
    <Header :links="header"/>
    <div class="section">
      <div class="container">
        <router-view></router-view>
      </div>
    </div>
    <Footer/>
  </div>
</template>

<script>
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';

export default {
  name: 'RaceResultsIndex',
  components: { Header, Footer },
  data() {
    return {
      person: '',
      header: [
        { name: 'Home', to: '/' },
        { name: 'Add', to: '/race-results/add' },
      ],
    };
  },
};
</script>
<style scoped>
</style>
