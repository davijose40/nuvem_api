// array de nome de cidades


const arrayCasosDateEnd = tenCitiesEndDateArray.map(
  city => city.confirmed_per_100k_inhabitants,
);

const arrayDiffCasosDescending = arrayCasosDateEnd
  .map((casosEnd, i) => casosEnd - arrayCasosDateStart[i])
  .sort((a, b) => b - a);

const arrayPercentHabitants = arrayDiffCasosDescending.map(el => el * 0.001);
