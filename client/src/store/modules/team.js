import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  teams: [],
};

const getters = {};

const teamsUrl = `${apiUrl}/teams`;
const teamUrl = (id) => `${apiUrl}/teams/${id}`;

const actions = {
  async load(context) {
    const teams = await fetch(teamsUrl).then((res) => res.json());
    context.commit('setTeams', teams);
  },

  async newTeam(context, t) {
    const team = await fetch(teamsUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(t),
    }).then((res) => res.json());
    context.commit('setTeams', [team]);
  },

  async delete(context, teamId) {
    await fetch(teamUrl(teamId), { method: 'DELETE' });
    context.commit('delete', teamId);
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
  delete(state, teamId) {
    const i = state.teams.findIndex((t) => t.id === teamId);
    state.teams.splice(i, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
