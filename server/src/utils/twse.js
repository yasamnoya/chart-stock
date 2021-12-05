const axios = require('axios');
const moment = require('moment');

const TWSE_STOCK_DAY_URL = 'https://www.twse.com.tw/exchangeReport/STOCK_DAY';

const fetchStockPriceOfMonth = async (monthOffset, stockNo) => {
  try {
    const res = await axios.get(TWSE_STOCK_DAY_URL, {
      params: {
        response: 'json',
        date: moment().subtract(monthOffset, 'months').format('YYYYMMDD'),
        stockNo,
      },
    });

    const result = res.data.data.map((data) => data[6]);
    return result;
  } catch (e) {
    console.log(e);
    return 'error';
  }
};

const fetchStockPriceOfDays = async (days, stockNo) => {
  const promises = [];
  for (let i = 0; i <= days / 20; i += 1) {
    promises.push(fetchStockPriceOfMonth(i, stockNo));
  }
  const prices = await (await Promise.all(promises)).reverse().flat(1); // reverse for months

  return prices.slice(-days);
};

module.exports = {
  fetchStockPriceOfDays,
};
