<template>
  <div>
    <Header/>
    <div class="section">
      <div class="container">
        <router-view/>
      </div>
    </div>
    <div class="section">
      <Footer/>
    </div>
  </div>
</template>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';
export default {
  name: 'App',
  components: {
    Header,
    Footer,
  },
};
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
