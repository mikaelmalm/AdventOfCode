const parseData = (data) => data.split('\r\n').map((field) => +field);

const multiplyItems = (items) =>
  items.reduce((sum, item) => sum * item, 1);

const getValues = (data, compareArr = data) => {
  for (let i = 0; i < data.length; i += 1) {
    const item = data[i];
    const sumNeeded = 2020 - item;

    const outcome = compareArr.find((value) => {
      if (typeof value === 'number') {
        return value === sumNeeded;
      }

      return value.sumOfItems === sumNeeded;
    });

    if (outcome) {
      return typeof outcome === 'number'
        ? [sumNeeded, item]
        : [...outcome.values, item];
    }
  }

  return [];
};

const calculateOutcomes = (input) => {
  const outcomesArr = input.map((value, index) => {
    const complareArr = input.slice(index);

    const valueOutcomes = complareArr
      .reduce((sum, compareValue) => {
        const sumOfItems = compareValue + value;

        return [
          ...sum,
          { sumOfItems, values: [compareValue, value] },
        ];
      }, [])
      .filter((currentObj) => currentObj.sumOfItems < 2020);

    return valueOutcomes;
  });

  return outcomesArr.flat();
};

const solution1 = (data) => {
  const parsedData = parseData(data);
  const numbersForSum = getValues(parsedData);
  const result = multiplyItems(numbersForSum);

  return result;
};

const solution2 = (data) => {
  const parsedData = parseData(data);

  const possibleOutcomes = calculateOutcomes(parsedData);
  const matchingValues = getValues(parsedData, possibleOutcomes);
  const result = multiplyItems(matchingValues);

  return result;
};

export { solution1, solution2 };
