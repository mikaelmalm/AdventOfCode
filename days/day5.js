export const INITIAL_ROW_INTERVAL = { min: 0, max: 127 };
export const INITIAL_COLUMN_INTERVAL = { min: 0, max: 7 };
const INSTRUCTIONS = {
  LOWER: ["F", "L"],
  HIGHER: ["B", "R"],
};

export const formatBoardingPass = (boardingPass) => {
  return boardingPass.split("").reduce(
    (formatedPasses, currentInstruction) => {
      const rowInstructions = ["F", "B"];
      const isRowInstruction = rowInstructions.includes(currentInstruction);

      if (isRowInstruction) {
        return {
          ...formatedPasses,
          rowDirections: [...formatedPasses.rowDirections, currentInstruction],
        };
      }

      return {
        ...formatedPasses,
        columnDirections: [
          ...formatedPasses.columnDirections,
          currentInstruction,
        ],
      };
    },
    {
      rowDirections: [],
      columnDirections: [],
    }
  );
};

export const binarySearch = (instructions, interval) => {
  const currentInstruction = instructions[0];
  const isLowerPart = INSTRUCTIONS.LOWER.includes(currentInstruction);

  const intervalSplit = Math.round((interval.max - interval.min) / 2);

  const updatedInterval = isLowerPart
    ? { ...interval, max: interval.max - intervalSplit }
    : { ...interval, min: interval.min + intervalSplit };

  if (instructions.length === 1) {
    return isLowerPart ? updatedInterval.min : updatedInterval.max;
  }

  return binarySearch(instructions.slice(1), updatedInterval);
};

export const getSeatID = (row, column) => row * 8 + column;

export const getHighestSeatID = (boardingPasses) => {
  return boardingPasses.reduce((result, bordingPass) => {
    const formatedPass = formatBoardingPass(bordingPass);

    const row = binarySearch(formatedPass.rowDirections, INITIAL_ROW_INTERVAL);
    const column = binarySearch(
      formatedPass.columnDirections,
      INITIAL_COLUMN_INTERVAL
    );

    const seatID = getSeatID(row, column);

    return seatID > result ? seatID : result;
  }, 0);
};
