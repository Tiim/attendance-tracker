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
    state.persons = persons;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
