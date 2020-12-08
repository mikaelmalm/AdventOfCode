import { readFile } from '../../utils';
import { parseData, solution1 } from '../../days/day8';

describe('[08]', () => {
  it('should parse data correctly', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = ['nop', 0];
    const actualAnswer = parseData(exampleData);

    expect(actualAnswer[0]).toEqual(expectedAnswer);
  });

  it('should return current value when on an prevoius instruction', async () => {
    const exampleData = await readFile(`${__dirname}/test_data.txt`);
    const expectedAnswer = 5;
    const actualAnswer = solution1(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const exampleData = await readFile(`${__dirname}/real_data.txt`);
    const expectedAnswer = 1200;
    const actualAnswer = solution1(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
