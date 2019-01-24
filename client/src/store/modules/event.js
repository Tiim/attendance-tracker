import Vue from 'vue';
import { apiUrl } from '../../config';

const state = {
  events: [],
};

const getters = {};

const eventsUrl = `${apiUrl}/events`;
const attendanceUrl = `${apiUrl}/events/attendance`;
const eventUrl = (id) => `${eventsUrl}/${id}`;

const actions = {
  async loadSingle(context, id) {
    const team = await fetch(eventUrl(id)).then((res) => res.json());
    context.commit('setEvents', [team]);
  },

  async setAttendanceState(context, state) {
    const { old, newState } = state;
    const body = { ...old, state: newState };

    const result = await fetch(attendanceUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    }).then((r) => r.json());

    context.commit('setAttendanceState', result);
  },

  async addNewEvent(context, event) {
    const result = await fetch(eventsUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(event),
    }).then((r) => r.json());

    context.commit('setEvents', [result]);
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
    const event = state.events.find((e) => e.id === status.eventId);
    const oldAtt = event.attendances.find((a) => a.id === status.id);
    if (!oldAtt) {
      event.attendances.push(status);
    } else {
      oldAtt.state = status.state;
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
