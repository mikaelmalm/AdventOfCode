const parseData = (data) =>
  data
    .split('\r\n')
    .filter((line) => line)
    .map((line) => {
      const [instruction, value] = line.split(' ');

      return [instruction, +value];
    });

// updateAccumulator
const updateAccumulator = (accumulator, value) => accumulator + value;

// jump to index
const jumpToIndex = (currentIndex, value) => currentIndex + value;

const runProgram = (instructions) => {
  // initial values for program
  let currentValue = 0;
  const indexHistory = [];

  for (let i = 0; i < instructions.length; ) {
    const [operation, argument] = instructions[i];

    // check if we have been on this instruction before
    if (indexHistory.includes(i))
      return { value: currentValue, terminated: true };

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

  return { value: currentValue, terminated: false };
};

const solution1 = (data) => {
  const instructions = parseData(data);

  const result = runProgram(instructions);
  return result.value;
};

// find all indexes of wanted value
const findAllIndexes = (instructions, type) => {
  const indexes = instructions.reduce((acc, instruction, index) => {
    if (instruction[0] === type) return [...acc, index];
    return acc;
  }, []);

  return indexes;
};

const updateInstruction = (
  newInstructionIndexes,
  newInstruction,
  instructions,
  index,
) => {
  const instructionIndex = newInstructionIndexes[index];
  const argument = instructions[instructionIndex][1];

  const preArr = instructions.slice(0, instructionIndex);
  const afterArr = instructions.slice(instructionIndex + 1);

  const updatedInstructions = [
    ...preArr,
    [newInstruction, argument],
    ...afterArr,
  ];

  return updatedInstructions;
};

const solution2 = (data) => {
  const instructions = parseData(data);
  const jmpInstructions = findAllIndexes(instructions, 'jmp');
  const nopInstructions = findAllIndexes(instructions, 'nop');

  // try changing all jmp
  for (let i = 0; i < jmpInstructions.length; i += 1) {
    const updatedInstructions = updateInstruction(
      jmpInstructions,
      'nop',
      instructions,
      i,
    );

    const result = runProgram(updatedInstructions);

    if (!result.terminated) return result.value;
  }

  for (let i = 0; i < nopInstructions.length; i += 1) {
    const updatedInstructions = updateInstruction(
      nopInstructions,
      'jmp',
      instructions,
      i,
    );

    const result = runProgram(updatedInstructions);

    if (!result.terminated) return result.value;
  }

  return 'could not be found';
};

export { parseData, findAllIndexes, solution1, solution2 };
