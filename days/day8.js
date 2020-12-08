const parseData = (data) =>
  data
    .split('\r\n')
    .filter((line) => line)
    .map((line) => {
      const [instruction, value] = line.split(' ');

      return [instruction, +value];
    });

// followInstruction

// updateAccumulator
const updateAccumulator = (accumulator, value) => accumulator + value;

// jump to index
const jumpToIndex = (currentIndex, value) => currentIndex + value;

const solution1 = (data) => {
  const instructions = parseData(data);

  // initial values for program
  let currentValue = 0;
  const indexHistory = [];

  for (let i = 0; i < instructions.length; ) {
    const [operation, argument] = instructions[i];

    // check if we have been on this instruction before
    if (indexHistory.includes(i)) return currentValue;
    indexHistory.push(i);

    // for now, fuck mutability
    if (operation === 'acc') {
      currentValue = updateAccumulator(currentValue, argument);
      i += 1;
    }

    if (operation === 'jmp') {
      i = jumpToIndex(i, argument);
    }

    if (operation === 'nop') {
      i += 1;
    }
  }

  return currentValue;
};

const solution2 = (data) => {
  const instructions = parseData(data);

  return instructions;
};

export { parseData, solution1, solution2 };
