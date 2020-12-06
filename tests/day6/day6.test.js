import { readFile } from '../../utils';

import { solution1, solution2 } from '../../days/day6';

describe('[06]', () => {
  it('[part 1] - Should return correct data', async () => {
    const data = await readFile(`${__dirname}/data.txt`);

    // example data
    // const expectedAnswer = 11;

    // real data
    const expectedAnswer = 6680;
    const actualAnswer = solution1(data);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[part 2] - Should return correct data', async () => {
    const data = await readFile(`${__dirname}/data.txt`);

    // expect data
    // const expectedAnswer = 6;

    // real data
    const expectedAnswer = 3117;
    const actualAnswer = solution2(data);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
