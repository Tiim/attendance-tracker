import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  persons: [],
};

const getters = {};

const personsUrl = `${apiUrl}/persons`;
const personUrl = (id) => `${personsUrl}/${id}`;

const actions = {
  async load(context) {
    const persons = await fetch(personsUrl).then((res) => res.json());
    context.commit('setPersons', persons);
  },
  async loadSingle(context, id) {
    const person = await fetch(personUrl(id)).then((res) => res.json());
    context.commit('team/setTeamSingle', person.team, { root: true });
    context.commit('event/setEvents', person.events, { root: true });
    delete person.team;
    delete person.events;
    context.commit('setPersonSingle', person);
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
