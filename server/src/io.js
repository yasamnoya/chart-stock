const { Server } = require('socket.io');
const http = require('http');
const moment = require('moment');
const app = require('./app');
const { fetchStockPriceOfDays } = require('./utils/twse');

const server = http.createServer(app);

const io = new Server(server, { cors: '*' });

const stockData = {
  updatedAt: moment().format('YYYYMMDD'),
  stockNos: [],
  pricesList: [],
};

io.on('connection', async (socket) => {
  socket.emit('gotPrices', stockData);

  socket.on('addStock', async (stockNo) => {
    try {
      if (stockData.stockNos.includes(stockNo)) return;

      console.log('fetch', stockNo);
      const prices = await fetchStockPriceOfDays(30, stockNo);
      stockData.stockNos.push(stockNo);
      stockData.pricesList.push(prices);
      io.emit('gotPrices', stockData);
    } catch (e) {
      console.log(e);
    }
  });
});

module.exports = server;
