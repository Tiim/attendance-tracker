import { apiUrl } from '../../config';

const state = {
  teams: [],
};

const getters = {};

const teamUrl = `${apiUrl}/team`;

const actions = {
  async load(context) {
    const teams = await fetch(teamUrl).then((res) => res.json());
    context.commit('setTeams', teams);
  },

  async add(context, team) {
    const response = await fetch(teamUrl, {
      method: 'POST',
      body: JSON.stringify(team),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (response.ok) {
      context.commit('add', await response.json());
    } else {
      console.log(response);
    }
  },
};

const mutations = {
  setTeams(state, teams) {
    state.teams = teams;
  },
  add(state, newTeam) {
    state.teams.push(newTeam);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
