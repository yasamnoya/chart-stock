<template>
  <div id="app">
    <div id="header" class="d-flex flex-column">
      <h1 class="my-auto">Chart the Stock Market</h1>
      <p>其他人新增的股票編號會及時顯示，最多可同時顯示 4 支股票的價格，點選標籤以刪除。</p>
    </div>
    <div class="card container w-75 p-5">
      <div class="row">
        <stock @deleteStock="deleteStock" :dateList="dateList" :stockData="stockData"></stock>
      </div>
      <div class="row mt-4">
        <div id="form">
          <div class="d-flex">
            <input @keyup.enter="addStock" v-model="newStockNo" type="text" class="form-control" />
            <button @click="addStock" class="btn btn-primary">新增</button>
          </div>
        </div>
      </div>
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
    colors: ['#170055', '#3E00FF', '#AE00FB', '#95DFB9'],
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
      if (this.stockData.length >= 4) return;
      this.socket.emit('addStock', this.newStockNo.trim());
      this.newStockNo = '';
    },
    deleteStock(stockNo) {
      this.socket.emit('deleteStock', stockNo);
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
  background-color: azure;
  color: #2c3e50;
  width: 100vw;
  min-height: 100vh;
}

#header {
  height: 25vh;
}

#form div {
  gap: 1rem;
}

#form div button {
  min-width: 75px;
}
</style>
