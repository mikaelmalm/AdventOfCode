export const INITIAL_ROW_INTERVAL = { min: 0, max: 127 };
export const INITIAL_COLUMN_INTERVAL = { min: 0, max: 7 };
const INSTRUCTIONS = {
  LOWER: ['F', 'L'],
  HIGHER: ['B', 'R'],
};

export const formatBoardingPass = (boardingPass) =>
  boardingPass.split('').reduce(
    (formatedPasses, currentInstruction) => {
      const rowInstructions = ['F', 'B'];
      const isRowInstruction = rowInstructions.includes(
        currentInstruction,
      );

      if (isRowInstruction) {
        return {
          ...formatedPasses,
          rowDirections: [
            ...formatedPasses.rowDirections,
            currentInstruction,
          ],
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
    },
  );

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

const getAllSeatIDs = (boardingPasses) =>
  boardingPasses.map((boardingPass) => {
    const formatedPass = formatBoardingPass(boardingPass);

    const row = binarySearch(
      formatedPass.rowDirections,
      INITIAL_ROW_INTERVAL,
    );
    const column = binarySearch(
      formatedPass.columnDirections,
      INITIAL_COLUMN_INTERVAL,
    );

    const seatID = getSeatID(row, column);

    return seatID;
  }, 0);

export const getHighestSeatID = (boardingPasses) => {
  const allSeatIds = getAllSeatIDs(boardingPasses);

  return Math.max(...allSeatIds);
};

const getTakenSeats = (boardingPasses) =>
  boardingPasses.reduce((result, boardingPass) => {
    const formatedPass = formatBoardingPass(boardingPass);

    const row = binarySearch(
      formatedPass.rowDirections,
      INITIAL_ROW_INTERVAL,
    );
    const column = binarySearch(
      formatedPass.columnDirections,
      INITIAL_COLUMN_INTERVAL,
    );

    const rowColumns = result[row]
      ? [...result[row], column]
      : [column];
    const sortedRowColumns = rowColumns.sort();

    // would like to have this as an array and use row as index, but did not manage it
    return {
      ...result,
      [row]: sortedRowColumns,
    };
  }, {});

const getEmptySeats = (rowsWithEmptySeats) =>
  rowsWithEmptySeats.reduce((result, row) => {
    const SEAT_POSITIONS = [0, 1, 2, 3, 4, 5, 6, 7];

    // did not want to do a nested loop, but for now it will do since lack of time
    const emptyRowSeats = SEAT_POSITIONS.reduce((sum, seat) => {
      if (!row.takenSeats.includes(seat)) {
        return [...sum, { row: row.row, column: seat }];
      }

      return sum;
    }, []);

    return [...result, ...emptyRowSeats];
  }, []);

export const getRowsWithMissingSeats = (takenSeats) =>
  Object.keys(takenSeats)
    .filter((row) => takenSeats[row].length !== 8)
    .reduce(
      (result, row) => [
        ...result,
        {
          row,
          takenSeats: takenSeats[row],
        },
      ],
      [],
    );

export const getMySeatId = (boardingPasses) => {
  const takenSeats = getTakenSeats(boardingPasses);
  const rowsWithEmptySeats = getRowsWithMissingSeats(takenSeats);
  const allSeatIds = getAllSeatIDs(boardingPasses);

  const emptySeats = getEmptySeats(rowsWithEmptySeats);

  const mySeatId = emptySeats.reduce((sum, seat) => {
    const seatId = getSeatID(seat.row, seat.column);

    if (
      allSeatIds.includes(seatId + 1) &&
      allSeatIds.includes(seatId - 1)
    ) {
      return seatId;
    }

    return '';
  });

  return mySeatId;
};
