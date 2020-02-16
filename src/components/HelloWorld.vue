<template>
  <div>
    <b-form-input v-model="text" @input="res"></b-form-input>
    <!-- <div class="mt-2">Value: {{ text }}</div> -->
    <b-alert :show="error" variant="danger">Invalid input</b-alert>
    <b-table v-if="!error" striped hover :items="items"></b-table>
  </div>
</template>

<script>
import { getresult } from "./logic.js";
console.log(getresult("a.b"));
export default {
  data() {
    return {
      text: "A.B",
      error: false,
      items: [
        { A: true, B: true, optput: true },
        { A: true, B: false, optput: false },
        { A: false, B: false, optput: false },
        { A: false, B: true, optput: false }
      ]
      // results: function(inp) {
      //   return getresult("a.b");
      // }
    };
  },
  methods: {
    res: function() {
      try {
        this.items = getresult(this.text);
        this.error = false;
      } catch (error) {
        this.error = true;
      }
      // return getresult("a.b");
    }
  }
};
</script>
