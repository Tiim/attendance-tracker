import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  persons: [],
};

const getters = {};

const personsUrl = `${apiUrl}/persons`;

const actions = {
  async load(context) {
    const persons = await fetch(personsUrl).then((res) => res.json());
    context.commit('setPersons', persons);
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
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
