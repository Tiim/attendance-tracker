<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-three-quarters">
          <!-- personId -->
          <label class="label">Person</label>
          <PersonForm v-model="person"/>
          <!-- date -->
          <label class="label">Date</label>
          <DatePicker v-model="date"/>
          <label class="label">Category</label>
          <div class="field is-grouped">
            <!-- distande -->
            <div class="control">
              <input v-model="distance" class="input" type="number" placeholder="100">
            </div>
            <!-- style -->
            <div class="control">
              <input v-model="style" class="input" type="text" placeholder="Free">
            </div>
          </div>
          <!-- pool -->
          <label class="label">Pool</label>
          <CourseForm v-model="pool"/>
          <!-- time -->
          <label class="label">Time</label>
          <TimeForm v-model="time"/>
          <!-- splits -->
          <label class="label">Splits</label>
          <SplitsForm v-model="splits"/>
          <!-- official -->
          <div class="field">
            <label class="label">Official</label>
            <div class="control">
              <label class="checkbox">
                <input v-model="official" class="checkbox" type="checkbox">
                Official result from a competition
              </label>
            </div>
          </div>
          <!-- TODO: meet -->
          <!-- notes -->
          <div class="field">
            <label class="label">Notes</label>
            <div class="control">
              <textarea v-model="notes" class="textarea"/>
            </div>
          </div>
          <div class="field">
            <div class="control">
              <button class="button is-link" @click="submit">Submit</button>
            </div>
          </div>
          <div v-if="warning.length" class="notification is-warning">
            <div v-for="w in warning" :key="w">{{w}}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { check } from '@/util/checkForm';

import CourseForm from '../components/CourseForm';
import DatePicker from '../components/DatePicker';
import PersonForm from '../components/PersonForm';
import TimeForm from '../components/TimeForm';
import SplitsForm from '../components/SplitsForm';

export default {
  name: 'RaceResultsAdd',
  components: { CourseForm, DatePicker, PersonForm, TimeForm, SplitsForm },
  data() {
    return {
      person: null,
      date: null,
      distance: 100,
      style: 'free',
      pool: 'SCM',
      time: 0,
      splits: [],
      official: true,
      notes: '',
      warning: [],
    };
  },
  computed: {},
  methods: {
    submit() {
      this.warning = [];
      check(this.person, this.warning, 'Person not set');
      check(this.date, this.warning, 'Date not set');
      check(this.distance, this.warning, 'Distance not set');
      check(this.style, this.warning, 'Style not set');
      check(this.pool, this.warning, 'Pool not set');
      check(this.time, this.warning, 'Time not set');
      if (this.warning.length) {
        return;
      }
    },
  },
};
</script>
<style scoped>
</style>
