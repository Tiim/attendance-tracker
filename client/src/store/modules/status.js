import { apiUrl } from '../../config';

const state = {
  events: [],
  statuses: [],
};

const getters = {};

const eventUrl = `${apiUrl}/event`;
const statusUrl = `${apiUrl}/status`;

const actions = {
  async load(context, options) {
    const { teamId } = options;
    const events = await fetch(`${eventUrl}/${teamId}`).then((res) =>
      res.json()
    );
    context.commit('addEvents', events);
    const event = events[0];
    const statuses = await fetch(`${statusUrl}/${event.id}`).then((res) =>
      res.json()
    );
    context.commit('addStatuses', statuses);
  },
};

const mutations = {
  addEvents(state, events) {
    state.events = state.events.concat(events);
  },

  addStatuses(state, statuses) {
    state.statuses = state.statuses.concat(statuses);
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
