// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './../node_modules/bulma/css/bulma.css';

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});

let currentPath = window.location.pathname + window.location.search;
if (currentPath.includes('/login')) {
  currentPath = '/';
}
store.dispatch('login/checkLoginState', currentPath);
router.replace('login');
