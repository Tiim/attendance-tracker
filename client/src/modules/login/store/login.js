import { apiUrl } from '../../../config';
import fetch from '@/util/fetch';

const state = {
  loggedIn: false,
  route: '',
  user: {},
};

const getters = {};

const loginCheckUrl = `${apiUrl}/user/me`;
const loginUrl = `${apiUrl}/auth/login`;

const actions = {
  async checkLoginState(context, route) {
    const res = await fetch.get(loginCheckUrl);
    if (res.status === 403) {
      context.commit('setState', { loggedIn: false, route, user: {} });
      return false;
    } else {
      const { user } = await res.json();
      context.commit('setState', { loggedIn: true, route, user });
      return true;
    }
  },

  async login(context, creds) {
    const res = await fetch.post(loginUrl, creds);

    if (res.status !== 200) {
      return false;
    } else {
      const user = await res.json();
      context.commit('setState', { loggedIn: true, user });
      return true;
    }
  },
};

const mutations = {
  setState(state, change) {
    state.loggedIn = change.loggedIn;
    state.user = change.user;
    if (change.route) {
      state.route = change.route;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
