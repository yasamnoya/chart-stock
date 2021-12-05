<template>
  <div id="app">
    Homepage
    <div>
      <stock :dateList="dateList" :stockData="stockData"></stock>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client';
import Stock from './components/Stock.vue';

export default {
  components: {
    Stock,
  },
  data: () => ({
    socket: io(process.env.VUE_APP_BACKEND_URL),
    dateList: ['January', 'February', 'March', 'April', 'May', 'June'],
    stockData: [
      {
        label: '0050',
        backgroundColor: 'rgb(255, 0, 132)',
        borderColor: 'rgb(255, 0, 132)',
        data: [1, 11, 6, 3, 21, 31, 46],
      },
      {
        label: '0056',
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(255, 99, 132)',
        data: [0, 10, 5, 2, 20, 30, 45],
      },
    ],
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
