<template>
  <div id="app">
    <router-view />
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
