const express = require('express');
const cors = require('cors');
const axios = require('axios');

const BASE_URL = 'https://brasil.io/api/';

const api = axios.create({
  baseURL: BASE_URL,
});
// const state = 'PR';
// const date = '2020-05-10';

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', async (request, response) => {
  const { state, dateStart, dateEnd } = request.query;

  state.toUpperCase();

  if (!state) {
    return response.status(402).json({ error: 'State is required!' });
  }

  function verifyDateDiff(end, start) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diff = endDate.getDate() - startDate.getDate();
    return diff;
  }

  if (!verifyDateDiff(dateEnd, dateStart)) {
    return response.status(409).json({ error: 'Verify date of start and end' });
  }

  // consulta api com os dados
  const responseApiStartDate = await api.get('dataset/covid19/caso/data', {
    params: {
      state,
      date: dateStart,
    },
  });

  const responseApiEndDate = await api.get('dataset/covid19/caso/data', {
    params: {
      state,
      date: dateEnd,
    },
  });

  function filtraDezMaioresCidades(arrayCidade) {
    return arrayCidade
      .filter(city => city.city !== null)
      .sort((a, b) => {
        return b.estimated_population_2019 - a.estimated_population_2019;
      })
      .slice(0, 10);
  }

  // get data from api
  const objectAllCitiesStartDate = await responseApiStartDate.data;
  const objectAllCitiesEndDate = await responseApiEndDate.data;
  // extrai array from object
  const arrayAllCitiesStartDate = objectAllCitiesStartDate.results;
  const arrayAllCitiesEndDate = objectAllCitiesEndDate.results;

  // filtra as dez maiores cidade pela data da api
  const tenCitiesStartDateArray = filtraDezMaioresCidades(
    arrayAllCitiesStartDate,
  );
  const tenCitiesEndDateArray = filtraDezMaioresCidades(arrayAllCitiesEndDate);

  const resp = tenCitiesEndDateArray.map((cityObject, i) => {
    const perc =
      (cityObject.confirmed_per_100k_inhabitants -
        tenCitiesStartDateArray[i].confirmed_per_100k_inhabitants) *
      0.001;
    return {
      percentual: `${perc.toFixed(2)}%`,
      id: i,
      city: cityObject.city,
      state: cityObject.state,
    };
  });

  console.log('resp :>> ', resp);

  return response.json({ message: 'hello from app' });
});

module.exports = app;
