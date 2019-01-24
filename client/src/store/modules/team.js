import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  teams: [],
};

const getters = {};

const teamsUrl = `${apiUrl}/teams`;

const actions = {
  async load(context) {
    const teams = await fetch(teamsUrl).then((res) => res.json());
    context.commit('setTeams', teams);
  },

  async new(context, t) {
    const team = await fetch(teamsUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(t),
    }).then((res) => res.json());
    context.commit('setTeams', [team]);
  },
};

const mutations = {
  setTeams(state, teams) {
    teams.forEach((team) => {
      const i = state.teams.findIndex((t) => t.id === team.id);
      if (i >= 0) {
        Vue.set(state.teams, i, Object.assign(state.teams[i], team));
      } else {
        state.teams.push(team);
      }
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
