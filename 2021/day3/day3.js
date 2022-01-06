const parseData = (data) => {
  const inputLength = data.indexOf(`\n`);

  const binaryArrays = data
    .replaceAll('\n', '')
    .split('')
    .reduce((sum, current, index) => {
      const posInArr = index % inputLength;

      const updatedValue = [
        ...(sum[posInArr] ?? []),
        Number(current),
      ];
      sum[posInArr] = updatedValue;

      return sum;
    }, []);

  return {
    binaryArrays,
    inputArrays: data.split('\n'),
  };
};

const calculateSum = (arr) =>
  arr.reduce((sum, currentVal) => sum + currentVal, 0);

const getNumberToKeep = (sum, inputLength, messurement) => {
  switch (messurement) {
    case 'oxygen':
      return sum >= inputLength / 2 ? 1 : 0;

    case 'co2':
      return sum < inputLength / 2 ? 1 : 0;
  }
};

const calculateRating = (inputArrays, inputLength, messurement) => {
  let inputArray = inputArrays;
  let res;
  let index = 0;

  while (index < inputLength) {
    const currentInput = inputArray.reduce(
      (sum, current) => [...sum, Number(current[index])],
      [],
    );

    const sum = calculateSum(currentInput);

    const numberToKeep = getNumberToKeep(
      sum,
      currentInput.length,
      messurement,
    );

    const newInputArr = inputArray.filter((arr) => {
      return Number(arr[index]) === numberToKeep;
    });

    if (newInputArr.length === 1) {
      res = newInputArr[0];
      break;
    }

    inputArray = newInputArr;
    index++;
  }

  return res;
};

const solution1 = (data) => {
  const { binaryArrays: input } = parseData(data);

  const { gamma, epsilon } = input.reduce(
    (sumRes, currentInput) => {
      const sum = calculateSum(currentInput);

      const gammaRate = sum > currentInput.length / 2 ? 1 : 0;
      const epsilonRate = gammaRate === 1 ? 0 : 1;

      return {
        gamma: `${sumRes.gamma}${gammaRate}`,
        epsilon: `${sumRes.epsilon}${epsilonRate}`,
      };
    },
    {
      gamma: '',
      epsilon: '',
    },
  );

  const gammaDecimal = parseInt(gamma, 2);
  const epsilonDecimal = parseInt(epsilon, 2);

  const result = gammaDecimal * epsilonDecimal;

  return result;
};

const solution2 = (data) => {
  const { inputArrays } = parseData(data);
  const inputLength = inputArrays[0].length;

  const oxygenRating = calculateRating(
    inputArrays,
    inputLength,
    'oxygen',
  );

  const co2Rating = calculateRating(inputArrays, inputLength, 'co2');

  const oxygen = parseInt(oxygenRating, 2);
  const co2 = parseInt(co2Rating, 2);

  const result = oxygen * co2;

  return result;
};

export { solution1, solution2 };
