<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-three-quarters">
          <!-- personId -->
          <label class="label">Person</label>
          <PersonForm v-model="person"/>
          <!-- date -->
          <div class="field">
            <label class="label">Date</label>
            <div class="control">
              <input v-model="dateModel" class="input" type="date">
            </div>
          </div>
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
              <input v-model="official" class="checkbox" type="checkbox">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { zeroPad } from '@/util/formatNumber';
import PersonForm from '../components/PersonForm';
import CourseForm from '../components/CourseForm';
import TimeForm from '../components/TimeForm';
import SplitsForm from '../components/SplitsForm';

export default {
  name: 'RaceResultsAdd',
  components: { CourseForm, PersonForm, TimeForm, SplitsForm },
  data() {
    return {
      person: null,
      date: new Date(),
      distance: 100,
      style: 'free',
      pool: 'SCM',
      time: 10000,
      splits: [],
      official: true,
      notes: '',
    };
  },
  computed: {
    dateModel: {
      get() {
        const month = this.date.getUTCMonth() + 1; //months from 1-12
        const day = this.date.getUTCDate();
        const year = this.date.getUTCFullYear();

        return year + '-' + zeroPad(month) + '-' + zeroPad(day);
      },
      set(date) {
        this.date = new Date(date);
      },
    },
  },
  methods: {
    submit() {
      console.log({
        person: this.person,
        date: this.date,
        distance: this.distance,
        style: this.style,
        pool: this.pool,
        time: this.time,
        splits: this.splits,
        official: this.official,
        notes: this.notes,
      });
    },
  },
};
</script>
<style scoped>
</style>
