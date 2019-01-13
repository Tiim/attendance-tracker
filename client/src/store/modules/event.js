import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  events: [],
};

const getters = {};

const eventsUrl = `${apiUrl}/events`;
const eventUrl = (id) => `${eventsUrl}/${id}`;

const actions = {
  async loadSingle(context, id) {
    const team = await fetch(eventUrl(id)).then((res) => res.json());
    context.commit('setEvents', [team]);
  },

  async setAttendanceState(context, state) {
    //const { old, newState } = state;
    //TODO: push to server
    context.commit('setAttendanceState', state);
  },
};

const mutations = {
  setEvents(state, events) {
    events.forEach((event) => {
      event.attendances = event.attendances || [];
      event.date = new Date(event.date);
      const i = state.events.findIndex((e) => e.id === event.id);
      if (i >= 0) {
        Vue.set(state.events, i, Object.assign(state.events[i], event));
      } else {
        state.events.push(event);
      }
    });
  },
  setAttendanceState(state, status) {
    const { old, newState } = status;
    old.state = newState;
    const event = state.events.find((e) => e.id === old.eventId);
    const oldAtt = event.attendances.find((a) => a.id === old.id);
    if (!oldAtt) {
      event.attendances.push(old);
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
