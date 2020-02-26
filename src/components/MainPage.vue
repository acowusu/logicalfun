<template>
  <div>
    <b-form-input v-model="text" @input="res"></b-form-input>
    <!-- <div class="mt-2">Value: {{ text }}</div> -->
    <b-alert :show="error" variant="danger">Invalid input</b-alert>
    <b-table v-if="!error" striped hover :items="items"></b-table>
    <tree
      v-if="!error"
      style="height:400px;background:#fff"
      :data="tree"
      node-text="label"
      layoutType="horizontal"
      :key="componentKey"
      linkLayout="orthogonal"
      nodeTextDisplay="leaves"
      :radius="10"
      :marginX="80"
    >
      <template #node="{data}">
        <template v-if="data.children && data.children.length">
          <image
            v-if="data.label == 'AND'"
            x="-1"
            y="-20"
            width="80"
            height="40"
            xlink:href="AND_ANSI.svg"
            transform="rotate(180)"
          />
          <image
            v-if="data.label == 'OR'"
            x="0"
            y="-20"
            width="80"
            height="40"
            xlink:href="OR_ANSI.svg"
            transform="rotate(180)"
          />
          <image
            v-if="data.label == 'XOR'"
            x="0"
            y="-20"
            width="80"
            height="40"
            xlink:href="XOR_ANSI.svg"
            transform="rotate(180)"
          />
          <image
            v-if="data.label == 'NOT'"
            x="0"
            y="-20"
            width="80"
            height="40"
            xlink:href="NOT_ANSI.svg"
            transform="rotate(180)"
          />
          <!-- <circle :r="radius" stroke="yellow">
            <title>{{ data.text }} {{ depth }}</title>
          </circle>-->

          <!-- <title>{{ data.text }} {{ depth }}</title> -->

          <!-- <path :fill="isRetracted ? 'red' : 'blue'" d="M190.5..">
            <title>{{ data.text }} {{ depth }}{{ data }}</title>
          </path>-->
        </template>
        <template v-else>
          <!-- <circle r="20" :stroke="data.label == 'a' ? 'blue' : 'yellow'">
            <title>{{ data.text }} {{ depth }}</title>
          </circle>-->
        </template>
      </template>
    </tree>
  </div>
</template>
<style >
.treeclass .nodetree text {
  font: 1em sans-serif !important;
  cursor: pointer;
}
</style>

<script>
import { getresult, build_tree } from "./logic.js";
import { tree } from "vued3tree";

console.log(getresult("a.b"));
export default {
  components: {
    tree
  },
  data() {
    return {
      componentKey: 1,
      text: "(a&¬b)|(¬a&b)",
      error: false,
      tree: {},
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
  computed: {
    thetree: function() {
      // this.$forceUpdate()
      return build_tree(this.text)[0];
    }
  },
  mounted: function() {
    this.res();
  },
  methods: {
    res: function() {
      try {
        this.tree = build_tree(this.text)[0];
        this.items = getresult(this.text);
        this.componentKey++;

        this.error = false;
      } catch (error) {
        this.error = true;
        this.tree = {};
      }
      // return getresult("a.b");
    }
  }
};
</script>
