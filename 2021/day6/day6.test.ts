import { readFile } from '../utils';

import { countFishGrowth } from './day6';

describe('[01]', () => {
  it('[Part 1] - should work with test data', async () => {
    const input = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 5934;
    const actualAnswer = countFishGrowth(input, 80);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 360610;
    const actualAnswer = countFishGrowth(input, 80);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with test data', async () => {
    const input = await readFile(`${__dirname}/test_data.txt`);

    const expectedAnswer = 26984457539;
    const actualAnswer = countFishGrowth(input, 256);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    const expectedAnswer = 1631629590423;
    const actualAnswer = countFishGrowth(input, 256);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
