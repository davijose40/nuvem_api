const axios = require('axios');
const api = require('../utils/api');
const verifyDateDiff = require('../utils/verify');
const filtraDezMaioresCidades = require('../utils/filtraDezMaioresCidades');

module.exports = {
  index: async (request, response) => {
    const { state, dateStart, dateEnd } = request.query;

    state.toUpperCase();

    if (!state) {
      return response.status(402).json({ error: 'State is required!' });
    }

    if (!verifyDateDiff(dateEnd, dateStart)) {
      return response
        .status(409)
        .json({ error: 'Verify date of start and end' });
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
    const tenCitiesEndDateArray = filtraDezMaioresCidades(
      arrayAllCitiesEndDate,
    );

    const responseObjetctWithData = tenCitiesEndDateArray.map(
      (cityObject, i) => {
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
      },
    );

    try {
      await axios.post(
        'https://us-central1-lms-nuvem-mestra.cloudfunctions.net/testApi',
        responseObjetctWithData,
        {
          headers: {
            // Overwrite Axios's automatically set Content-Type
            'Content-Type': 'application/json',
            MeuNome: 'Davi José Bernarde da Silva',
          },
        },
      );
    } catch (error) {
      console.log(error);
      return response
        .status(500)
        .json({ message: 'something goes wrong try again later' });
    }

    return response.status(201).json({ message: 'send to distination' });
  },
};
