export const formatDecimalWithTwoDigitsAfterDecimalPoint = (data: object) => {
  Object.keys(data).forEach((key: string) => {
    if (typeof data[key] === 'number' || !isNaN(data[key])) {
      data[key] = Number((Math.round(data[key] * 100) / 100).toFixed(2));
    }
  });
};
