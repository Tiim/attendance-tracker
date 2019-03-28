import Vue from 'vue';
import { apiUrl } from '@/config';
import { buildQuery } from '@/util/query';
import fetch from '@/util/fetch';

const state = {
  events: [],
};

const getters = {};

const eventsUrl = `${apiUrl}/events`;
const attendanceUrl = `${apiUrl}/events/attendance`;
const eventUrl = (id) => `${eventsUrl}/${id}`;
const forPersonUrl = (id, limit, before) =>
  `${apiUrl}/persons/${id}/events?${buildQuery({ limit, before })}`;
const forTeamUrl = (id, limit, before) =>
  `${apiUrl}/teams/${id}/events?${buildQuery({ limit, before })}`;

const actions = {
  async loadSingle(context, id) {
    const event = await fetch.get(eventUrl(id)).then((res) => res.json());
    context.commit('setEvents', [event]);
  },

  async loadForPerson(context, { id, limit, before }) {
    const events = await fetch
      .get(forPersonUrl(id, limit, before))
      .then((res) => res.json());
    context.commit('setEvents', events);
  },

  async loadForTeam(context, { id, limit, before }) {
    const events = await fetch
      .get(forTeamUrl(id, limit, before))
      .then((res) => res.json());
    context.commit('setEvents', events);
  },

  async newAttendanceState(context, state) {
    const { old, newState } = state;
    const body = { ...old, state: newState };

    const result = await fetch.put(attendanceUrl, body).then((r) => r.json());

    context.commit('setAttendanceState', result);
  },

  async newEvent(context, event) {
    const result = await fetch.put(eventsUrl, event).then((r) => r.json());

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

    state.events.sort(
      (a, b) => (a.date > b.date ? 1 : a.date < b.date ? -1 : 0)
    );
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
