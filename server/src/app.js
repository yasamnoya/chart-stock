const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const router = require('./routes');

const app = express();

app.use(morgan('common'));

app.use(cors());

app.use(router);

module.exports = app;
