<template>
  <div>
    <div class="field has-addons">
      <div class="control">
        <input
          v-model="name"
          :disabled="isSet"
          class="input"
          type="text"
          placeholder="Name"
          @input="onInput"
        >
      </div>
      <p v-if="isSet" class="control">
        <a class="button" @click="clear">X</a>
      </p>
    </div>
    <nav class="panel">
      <a v-for="p in searchResult" :key="p.id" class="panel-block" @click="select(p)">{{p.name}}</a>
    </nav>
  </div>
</template>

<script>
import fetch from '@/util/fetch';
import { apiUrl } from '../../../config';

const personsUrl = `${apiUrl}/persons`;
const personUrl = (id) => `${apiUrl}/persons/${id}`;

export default {
  name: 'PersonForm',
  components: {},
  props: {
    value: { type: Number, default: () => null },
  },
  data() {
    return {
      name: '',
      selected: null,
      isSet: false,
      searchResult: null,
    };
  },
  computed: {},
  watch: {
    async value(v) {
      if (!v && v !== 0) {
        this.clear(false);
      } else {
        const res = await fetch.get(personUrl(v)).then((r) => r.json());
        this.select(res, false);
      }
    },
  },
  methods: {
    async onInput() {
      //TODO: implement debounce
      const res = await fetch
        .get(personsUrl, { search: this.name })
        .then((r) => r.json());
      this.searchResult = res;
    },
    select(person, emit = true) {
      this.searchResult = null;
      this.name = person.name;
      this.isSet = true;
      this.selected = person;
      if (emit) {
        this.$emit('input', person.id);
      }
    },
    clear(emit = true) {
      this.searchResult = null;
      this.name = '';
      this.isSet = false;
      if (emit) {
        this.$emit('input', null);
      }
    },
  },
};
</script>
<style scoped>
</style>
