const parseData = (data) =>
  data
    .split('\n')
    .filter((line) => line)
    .map((field) => +field);

const addNumbersInArray = (arr) =>
  arr.reduce((sum, number) => sum + number, 0);

const getSumArray = (arr) =>
  arr
    .map((item, index) => {
      const itemsToAdd = arr.slice(index);

      const result = itemsToAdd.reduce(
        (childSum, itemToAdd) =>
          itemToAdd !== item
            ? [...childSum, item + itemToAdd]
            : childSum,
        [],
      );

      return result;
    })
    .flat();

const updateNumbersArr = (arr, maxValue) => {
  const currentSum = addNumbersInArray(arr);

  if (currentSum > maxValue) {
    return updateNumbersArr(arr.slice(1), maxValue);
  }

  return arr;
};

const findNonMatchingNumber = (arr, preAmbleLength) => {
  for (let i = preAmbleLength; i < arr.length; i += 1) {
    const compareArr = arr.slice(
      i - preAmbleLength,
      i + preAmbleLength,
    );
    const sumArray = getSumArray(compareArr);

    if (!sumArray.includes(arr[i])) return arr[i];
  }

  return 'not found';
};

const findContiguousNumbers = (
  numbers,
  matchingNumber,
  numbersArr = [],
) => {
  for (let i = numbersArr.length; i < numbers.length; i += 1) {
    // if number + next number is less than matchingNumber
    const sumOfNumbers = addNumbersInArray(numbersArr);

    // if number + next number is equal than matchingNumber return numbers
    if (sumOfNumbers === matchingNumber) return numbersArr;

    const updatedNumbersArr = updateNumbersArr(
      numbersArr,
      matchingNumber,
    );

    const updatedSumOfNumbers = addNumbersInArray(updatedNumbersArr);

    // console.log({ updatedSumOfNumbers, updatedNumbersArr });

    if (updatedSumOfNumbers === matchingNumber)
      return updatedNumbersArr;

    if (updatedSumOfNumbers > matchingNumber) return null;

    // console.log({ updatedNumbersArr });
    return findContiguousNumbers(numbers, matchingNumber, [
      ...numbersArr,
      numbers[i],
    ]);
  }

  return 'not found';
};

const solution1 = (data, preAmbleLength) => {
  const parsedData = parseData(data);
  const nonMatchingNumber = findNonMatchingNumber(
    parsedData,
    preAmbleLength,
  );

  return nonMatchingNumber;
};

const solution2 = (data, preAmbleLength) => {
  const parsedData = parseData(data);
  const nonMatchingNumber = findNonMatchingNumber(
    parsedData,
    preAmbleLength,
  );

  const matchingArr = findContiguousNumbers(
    parsedData,
    nonMatchingNumber,
  );

  const sortedMatches = matchingArr.sort((a, b) => a - b);

  if (sortedMatches.length < 1) return 0;
  const minValue = sortedMatches[0];
  const maxValue = sortedMatches[sortedMatches.length - 1];
  const result = minValue + maxValue;

  return result;
};

export {
  parseData,
  findNonMatchingNumber,
  findContiguousNumbers,
  updateNumbersArr,
  solution1,
  solution2,
};
