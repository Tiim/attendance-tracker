import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  teams: [],
};

const getters = {};

const teamsUrl = `${apiUrl}/teams`;
const teamUrl = (id) => `${teamsUrl}/${id}`;

const actions = {
  async load(context) {
    const teams = await fetch(teamsUrl).then((res) => res.json());
    const persons = teams.flatMap((t) => {
      const p = t.persons;
      delete t.persons;
      return p;
    });
    context.commit('person/setPersons', persons, { root: true });
    context.commit('setTeams', teams);
  },

  async loadSingle(context, id) {
    const team = await fetch(teamUrl(id)).then((res) => res.json());
    context.commit('person/setPersons', team.persons, { root: true });
    context.commit('event/setEvents', team.events, { root: true });
    delete team.persons;
    delete team.events;
    context.commit('setTeamSingle', team);
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
  setTeamSingle(state, team) {
    const i = state.teams.findIndex((t) => t.id === team.id);
    if (i >= 0) {
      Vue.set(state.teams, i, Object.assign(state.teams[i], team));
    } else {
      state.teams.push(team);
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
