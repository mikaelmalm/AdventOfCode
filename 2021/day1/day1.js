const parseData = (data) =>
  data.split('\n').map((value) => Number(value));

const solution1 = (data) => {
  const input = parseData(data);

  const depthIncreasedTimes = input.reduce(
    (timesIncreased, messurement, index) => {
      if (index === 0) return timesIncreased;

      const prevInput = input[index - 1];
      const shouldIncrease = messurement >= prevInput;

      return shouldIncrease ? timesIncreased + 1 : timesIncreased;
    },
    0,
  );

  return depthIncreasedTimes;
};

const solution2 = (data) => {
  const input = parseData(data);

  const calculateInputValue = (input, index) =>
    input[index] + input[index + 1] + input[index + 2];

  const depthIncreasedTimes = input.reduce(
    (timesIncreased, _, index) => {
      if (index === 0) return timesIncreased;

      const prevInput = calculateInputValue(input, index - 1);
      const currentInput = calculateInputValue(input, index);

      // checks the last values since they would become NaN
      if (!currentInput || !prevInput) return timesIncreased;

      const shouldIncrease = currentInput > prevInput;

      return shouldIncrease ? timesIncreased + 1 : timesIncreased;
    },
    0,
  );

  return depthIncreasedTimes;
};

export { solution1, solution2 };
