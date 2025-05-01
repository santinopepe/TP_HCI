<template>
  <div id="app">
    <LoginScreen />
  </div>
</template>

<script>
import LoginScreen from './components/Registro/Login.vue';

export default {
  name: 'App',
  components: {
    LoginScreen
  }
}
</script>

<style>
@import './assets/styles.css';
</style>