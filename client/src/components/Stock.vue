<template>
  <canvas id="myChart"></canvas>
</template>

<script>
import Chart from 'chart.js/auto';

export default {
  props: ['stockData', 'dateList'],
  data: () => ({
    chart: null,
  }),
  watch: {
    stockData() {
      console.log('updated');
      console.log(this.stockData);
      this.chart.update();
    },
  },
  mounted() {
    const config = {
      type: 'line',
      data: {
        labels: this.dateList,
        datasets: this.stockData,
      },
      options: {},
    };
    this.chart = new Chart(document.getElementById('myChart'), config);
  },
};
</script>

<style></style>
