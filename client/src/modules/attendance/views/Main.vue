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
  name: 'AttendanceIndex',
  components: { Header, Footer },
  data() {
    return {
      header: [
        { name: 'Home', to: '/' },
        { name: 'Teams', to: '/attendance/team' },
        { name: 'People', to: '/attendance/person' },
        { name: 'Manage (tmp)', to: '/attendance/manage' },
      ],
    };
  },
};
</script>
<style scoped>
</style>
