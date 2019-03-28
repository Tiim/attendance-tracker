import Vue from 'vue';
import { apiUrl } from '../../../config';
import fetch from '@/util/fetch';

const state = {
  persons: [],
};

const getters = {};

const personsUrl = `${apiUrl}/persons`;
const personUrl = (id) => `${apiUrl}/persons/${id}`;
const forTeamUrl = (id) => `${apiUrl}/teams/${id}/persons`;

const actions = {
  async load(context) {
    const persons = await fetch.get(personsUrl).then((res) => res.json());
    context.commit('setPersons', persons);
  },

  async loadForTeam(context, teamId) {
    const events = await fetch
      .get(forTeamUrl(teamId))
      .then((res) => res.json());
    context.commit('setPersons', events);
  },

  async newPerson(context, p) {
    const person = await fetch.put(personsUrl, p).then((res) => res.json());
    context.commit('setPersons', [person]);
  },

  async delete(context, id) {
    await fetch.delete(personUrl(id));
    context.commit('delete', id);
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
  delete(state, id) {
    const i = state.persons.findIndex((t) => t.id === id);
    state.persons.splice(i, 1);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
