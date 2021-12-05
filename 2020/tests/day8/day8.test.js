import { readFile } from '../../utils';
import {
  parseData,
  findAllIndexes,
  solution1,
  solution2,
} from '../../days/day8';

describe('[08]', () => {
  it('should parse data correctly', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = ['nop', 0];
    const actualAnswer = parseData(exampleData);

    expect(actualAnswer[0]).toEqual(expectedAnswer);
  });

  it('should return indexes for instruction', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const parsedData = parseData(exampleData);

    const expectedAnswer = [2, 4, 7];
    const expectedAnswer1 = [0];
    const actualAnswer = findAllIndexes(parsedData, 'jmp');
    const actualAnswer1 = findAllIndexes(parsedData, 'nop');

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer1).toEqual(expectedAnswer1);
  });

  it('[Part 1] - should work with test data', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = 5;
    const actualAnswer = solution1(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const data = await readFile(`${__dirname}/real_data.txt`);
    const expectedAnswer = 1200;
    const actualAnswer = solution1(data);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with test data', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = 8;
    const actualAnswer = solution2(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const exampleData = await readFile(`${__dirname}/real_data.txt`);
    const expectedAnswer = 1023;
    const actualAnswer = solution2(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
