const filtraDezMaioresCidades = arrayCidade => {
  return arrayCidade
    .filter(city => city.city !== null)
    .sort((a, b) => {
      return b.estimated_population_2019 - a.estimated_population_2019;
    })
    .slice(0, 10);
};

module.exports = filtraDezMaioresCidades;
