const express = require('express');
const CovidController = require('../controller/CovidController.js');

const routes = express.Router();

routes.get('/', CovidController.index);

module.exports = routes;
