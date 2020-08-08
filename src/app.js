const express = require('express');
const cors = require('cors');

const CovidController = require('./controller/CovidController.js');

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', CovidController.index);

module.exports = app;
