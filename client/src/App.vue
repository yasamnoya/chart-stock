<template>
  <div id="app">
    Homepage
    <div>
      <stock :dateList="dateList" :stockData="stockData"></stock>
      <input v-model="newStockNo" type="text" />
      <button @click="addStock">新增</button>
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
    newStockNo: '',
    socket: io(process.env.VUE_APP_BACKEND_URL),
    colors: ['#170055', '#3E00FF', '#AE00FB', '#B5FFD9'],
    dateList: [],
    stockData: [
      {
        label: 'Label',
        backgroundColor: 'rgb(255, 0, 132)',
        borderColor: 'rgb(255, 0, 132)',
        data: [1],
      },
    ],
  }),
  created() {
    for (let i = 0; i < 30; i += 1) this.dateList.push('');

    this.socket.on('connect', () => {
      console.log('connected');
    });

    this.socket.on('gotPrices', (prices) => {
      this.stockData.splice(0, this.stockData.length);
      for (let i = 0; i < prices.stockNos.length; i += 1) {
        this.stockData.push({
          label: prices.stockNos[i],
          backgroundColor: this.colors[i],
          borderColor: this.colors[i],
          data: prices.pricesList[i],
        });
      }
    });
  },
  methods: {
    addStock() {
      if (this.newStockNo.trim() === '') return;
      this.socket.emit('addStock', this.newStockNo.trim());
    },
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
