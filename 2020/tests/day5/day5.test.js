import { readFile } from '../../utils';

import {
  getSeatID,
  getMySeatId,
  binarySearch,
  getHighestSeatID,
  formatBoardingPass,
  getRowsWithMissingSeats,
  INITIAL_ROW_INTERVAL,
  INITIAL_COLUMN_INTERVAL,
} from '../../days/day5';

describe('[05]', () => {
  const exampleInput = ['BFFFBBFRRR', 'FFFBBBFRRR', 'BBFFBBFRLL'];

  it('should format instructions correctly', () => {
    const expectedAnswer = { row: 7, column: 3 };
    const actualAnswer = formatBoardingPass(exampleInput[0]);

    expect(actualAnswer.rowDirections.length).toEqual(
      expectedAnswer.row,
    );
    expect(actualAnswer.columnDirections.length).toEqual(
      expectedAnswer.column,
    );
  });

  it('should return correct row', () => {
    const input = ['B', 'F', 'F', 'F', 'B', 'B', 'F'];
    const input2 = ['F', 'F', 'F', 'B', 'B', 'B', 'F'];

    const expectedAnswer = 70;
    const expectedAnswer2 = 14;

    const actualAnswer = binarySearch(input, INITIAL_ROW_INTERVAL);
    const actualAnswer2 = binarySearch(input2, INITIAL_ROW_INTERVAL);

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('should return correct seat', () => {
    const input = ['R', 'R', 'R'];
    const input2 = ['R', 'L', 'L'];

    const expectedAnswer = 7;
    const expectedAnswer2 = 4;

    const actualAnswer = binarySearch(input, INITIAL_COLUMN_INTERVAL);
    const actualAnswer2 = binarySearch(
      input2,
      INITIAL_COLUMN_INTERVAL,
    );

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('should return correct seatID', () => {
    const expectedAnswer = 567;
    const expectedAnswer2 = 119;

    const actualAnswer = getSeatID(70, 7);
    const actualAnswer2 = getSeatID(14, 7);

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('should return the highest seatID', () => {
    const expectedAnswer = 820;

    const actualAnswer = getHighestSeatID(exampleInput);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('Should return rows with missing seats', async () => {
    const expectedAnswer = 3;
    const actualAnswer = getRowsWithMissingSeats(exampleInput).length;

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const input = await readFile(
      `${__dirname}/data.txt`,
    ).then((res) => res.split('\n').filter((line) => line));

    // we got this by failing the test the first time
    const expectedAnswer = 871;
    const actualAnswer = getHighestSeatID(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const input = await readFile(
      `${__dirname}/data.txt`,
    ).then((res) => res.split('\n').filter((line) => line));

    // we got this by failing the test the first time
    const expectedAnswer = 640;
    const actualAnswer = getMySeatId(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
