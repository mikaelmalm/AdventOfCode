import { readFile } from '../../utils';

import { solution1, solution2 } from '../../days/day1';

describe('[01]', () => {
  it('[Part 1] - should work with test data', async () => {
    const input = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 7;
    const actualAnswer = solution1(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 1226;
    const actualAnswer = solution1(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with test data', async () => {
    const input = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 5;
    const actualAnswer = solution2(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 1252;
    const actualAnswer = solution2(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
