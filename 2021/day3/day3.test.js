import { readFile } from '../utils';

import { solution1, solution2 } from './day3';

describe('[01]', () => {
  it('[Part 1] - should work with test data', async () => {
    const input = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 198;
    const actualAnswer = solution1(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 4103154;
    const actualAnswer = solution1(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with test data', async () => {
    const input = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 230;
    const actualAnswer = solution2(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 4245351;
    const actualAnswer = solution2(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
