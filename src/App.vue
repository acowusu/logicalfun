<template>
  <div id="app">
    <b-container>
      <!-- <b-form-checkbox v-model="dark" inline>Dark</b-form-checkbox> -->

      <b-jumbotron header="Logical fun" lead="enter a logical statement">
        <b-button
          onclick="TogetherJS(this); return false;"
          pill
          variant="outline-secondary"
        >Start Sharing</b-button>

        <br />
        <!-- <button class="btn btn-success">Start Shareing</button> -->
        <img width="25%" src="./assets/logo.png" />
        <pre><code>
          instructions:
          Enter a logical expression to be evaluated
          the symbols for each gate are as follows
          AND . & ∧ 
          OR  + | ∨
          NOT ¬ ! ~
          XOR ^ ⊕ *
          brackets an be used to control order of operation
          Note: double negation is not supported
          </code></pre>

        <MainPage />
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import MainPage from "./components/MainPage";

export default {
  name: "App",
  components: {
    MainPage
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
img,
table {
  margin: 2em 0;
}
</style>
