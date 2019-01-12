// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store';
import './../node_modules/bulma/css/bulma.css';

import * as config from './config';

Vue.config.productionTip = false;

const wakeBackend = async () => {
  await fetch(config.apiUrl).then((r) => r.json());
};

wakeBackend();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
});
