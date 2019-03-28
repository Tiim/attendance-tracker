import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { debug } from '../config';

import attendance from '../modules/attendance/store';
import login from '../modules/login/store/login';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: debug,

  modules: {
    attendance,
    login,
  },

  plugins: [createLogger()],
});

export default store;
