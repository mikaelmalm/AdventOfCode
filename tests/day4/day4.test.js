import { readFile } from '../../utils';

import solution from '../../days/day4';

describe('[04]', () => {
  it('[Part 2] - should work with real data', async () => {
    const input = await readFile(`${__dirname}/data.txt`);

    // we got this by failing the test the first time
    const expectedAnswer = 224;
    const actualAnswer = solution(input);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
