<template>
  <div id="app">
    <b-container>
      <b-jumbotron header="Logica" lead="enter a logical statement">
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
          Note: implicit and is not supported
          </code></pre>
        <HelloWorld msg="Hello Vue in CodeSandbox!" />
      </b-jumbotron>
    </b-container>
  </div>
</template>

<script>
import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",
  components: {
    HelloWorld
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
