import Vue from 'vue';

const state = {
  events: [],
};

const getters = {};

const actions = {};

const mutations = {
  setEvents(state, events) {
    events.forEach((event) => {
      const i = state.events.findIndex((e) => e.id === event.id);
      if (i >= 0) {
        Vue.set(state.events, i, Object.assign(state.events[i], event));
      } else {
        state.events.push(event);
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
