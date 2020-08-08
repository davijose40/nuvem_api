const axios = require('axios');

const BASE_URL = 'https://brasil.io/api/';

module.exports = axios.create({
  baseURL: BASE_URL,
});
