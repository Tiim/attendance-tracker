import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import { debug } from '../config';

import person from './modules/person';
import team from './modules/team';

Vue.use(Vuex);

const store = new Vuex.Store({
  strict: debug,

  modules: {
    person,
    team,
  },

  plugins: [createLogger()],
});

export default store;
