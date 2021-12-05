<template>
  <div id="app">Homepage</div>
</template>

<script>
import io from 'socket.io-client';

export default {
  data: () => ({
    socket: io(process.env.VUE_APP_BACKEND_URL),
  }),
  created() {
    this.socket.on('connect', () => {
      console.log('connected');
    });
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
