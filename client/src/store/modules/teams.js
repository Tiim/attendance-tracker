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
    context.commit('setTeams', teams);
  },

  async loadSingle(context, id) {
    const team = await fetch(teamUrl(id));
    context.commit('setTeamSingle', team);
  },

  async add(context, team) {
    const response = await fetch(teamsUrl, {
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
  setTeamSingle(state, team) {
    const i = state.teams.findIndex((t) => t.id === team.id);
    state.teams[i] = {
      ...state.teams[i],
      ...team,
    };
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
