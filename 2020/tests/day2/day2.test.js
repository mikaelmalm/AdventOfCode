import { readFile } from '../../utils';

import { solution1, solution2 } from '../../days/day2';

describe('[02]', () => {
  it('[Part 1] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 614;
    const actualAnswer = solution1(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 354;
    const actualAnswer = solution2(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
