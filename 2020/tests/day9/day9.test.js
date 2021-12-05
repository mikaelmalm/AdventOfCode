import { readFile } from '../../utils';
import {
  parseData,
  findNonMatchingNumber,
  findContiguousNumbers,
  updateNumbersArr,
  solution1,
  solution2,
} from '../../days/day9';

describe('[09]', () => {
  it('should parse data correctly', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = 20;
    const actualAnswer = parseData(exampleData).length;

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('findNonMatchingNumber should return the first non matching number', async () => {
    const data = await readFile(`${__dirname}/test_data.txt`);
    const parsedData = parseData(data);
    const expectedAnswer = 127;
    const actualAnswer = findNonMatchingNumber(parsedData, 5);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with test data', async () => {
    const data = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 127;
    const actualAnswer = solution1(data, 5);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const data = await readFile(`${__dirname}/real_data.txt`);

    const expectedAnswer = 15353384;
    const actualAnswer = solution1(data, 25);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('updateNumbersArr should return an array where sum is less than required sum', async () => {
    const exampleData = [35, 20, 15, 25, 47];
    const expectedAnswer = [20, 15, 25, 47];

    const exampleData2 = [20, 15, 25, 47, 40];
    const expectedAnswer2 = [15, 25, 47, 40];

    // const exampleData2 = [2, 128];
    // const expectedAnswer2 = [];

    const actualAnswer = updateNumbersArr(exampleData, 127);
    const actualAnswer2 = updateNumbersArr(exampleData2, 127);

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('findContiguousNumbers should return the preamble where num is found', async () => {
    const data = await readFile(`${__dirname}/test_data.txt`);
    const parsedData = parseData(data);

    const expectedAnswer = [15, 25, 47, 40];
    const actualAnswer = findContiguousNumbers(parsedData, 127);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with test data', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = 62;
    const actualAnswer = solution2(exampleData, 5);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const exampleData = await readFile(`${__dirname}/real_data.txt`);
    const expectedAnswer = 2466556;
    const actualAnswer = solution2(exampleData, 25);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
