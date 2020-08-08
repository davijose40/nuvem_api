const express = require('express');
const axios = require('axios');

const api = axios.create({
  baseURL: 'https://brasil.io/',
});

const routes = express.Router();

// http://localhost/?state=PR&dateStart=2020-05-10&dateEnd=2020-05-18

routes.get('/', async (request, response) => {
  const resp = await api.get(
    'api/dataset/covid19/caso/data/?state=PR&date=2020-05-10',
  );

  console.log(resp);

  response.json({ message: 'hello from get' });
});

module.exports = routes;
