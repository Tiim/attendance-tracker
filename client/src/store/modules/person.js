import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  persons: [],
};

const getters = {};

const personsUrl = `${apiUrl}/persons`;
const forTeamUrl = (id) => `${apiUrl}/teams/${id}/persons`;

const actions = {
  async load(context) {
    const persons = await fetch(personsUrl).then((res) => res.json());
    context.commit('setPersons', persons);
  },

  async loadForTeam(context, teamId) {
    const events = await fetch(forTeamUrl(teamId)).then((res) => res.json());
    context.commit('setPersons', events);
  },

  async newPerson(context, p) {
    const person = await fetch(personsUrl, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(p),
    }).then((res) => res.json());
    context.commit('setPersons', [person]);
  },
};

const mutations = {
  setPersons(state, persons) {
    persons.forEach((person) => {
      const i = state.persons.findIndex((t) => t.id === person.id);
      if (i >= 0) {
        Vue.set(state.persons, i, Object.assign(state.persons[i], person));
      } else {
        state.persons.push(person);
      }
    });
  },
  setPersonSingle(state, person) {
    const i = state.persons.findIndex((p) => p.id === person.id);
    if (i >= 0) {
      Vue.set(state.persons, i, Object.assign(state.persons[i], person));
    } else {
      state.persons.push(person);
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
