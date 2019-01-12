import { apiUrl } from '../../config';

const state = {
  people: [],
};

const getters = {};

const peopleUrl = `${apiUrl}/persons`;

const actions = {
  async load(context) {
    const people = await fetch(peopleUrl).then((res) => res.json());
    context.commit('setPeople', people);
  },

  async add(context, person) {
    const response = await fetch(peopleUrl, {
      method: 'POST',
      body: JSON.stringify(person),
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
  setPeople(state, people) {
    state.people = people;
  },

  add(state, newPerson) {
    state.people.push(newPerson);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
