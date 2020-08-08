const verifyDateDiff = (end, start) => {
  const startDate = new Date(start);
  const endDate = new Date(end);
  const diff = endDate.getDate() - startDate.getDate();
  return diff;
};

module.exports = verifyDateDiff;
