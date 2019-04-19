<template>
  <div>
    <div class="container">
      <div class="columns">
        <div class="column is-three-quarters">
          <!-- personId -->
          <div class="field">
            <label class="label">Person</label>
            <div class="control">
              <input v-model="person" class="input" type="number" placeholder="1">
            </div>
          </div>
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
          <div class="field">
            <label class="label">Pool</label>
            <div class="control">
              <div class="select">
                <select v-model="pool">
                  <option>LCM</option>
                  <option>SCM</option>
                  <!--TODO: add more pool lengths -->
                </select>
              </div>
            </div>
          </div>
          <!-- time -->
          <label class="label">Time</label>
          <TimeForm v-model="time"/>
          <!-- TODO: splits -->
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
              <button class="button is-link">Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { zeroPad } from '@/util/formatNumber';
import TimeForm from '../components/TimeForm';
import SplitsForm from '../components/SplitsForm';

export default {
  name: 'RaceResultsAdd',
  components: { TimeForm, SplitsForm },
  data() {
    return {
      person: 1,
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
};
</script>
<style scoped>
</style>
