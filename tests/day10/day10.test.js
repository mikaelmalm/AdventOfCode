import { readFile } from '../../utils';
import { parseData, solution1, solution2 } from '../../days/day10';

describe('[09]', () => {
  it('should parse data correctly', async () => {
    const exampleData = await readFile(`${__dirname}/test_data1.txt`);
    const expectedAnswer = 11;
    const actualAnswer = parseData(exampleData).length;

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with test data', async () => {
    const exampleData = await readFile(`${__dirname}/test_data1.txt`);

    const expectedAnswer = 35;
    const actualAnswer = solution1(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 1] - should work with real data', async () => {
    const exampleData = await readFile(`${__dirname}/real_data.txt`);

    const expectedAnswer = 1998;
    const actualAnswer = solution1(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[Part 2] - should work with test data', async () => {
    const exampleData = await readFile(`${__dirname}/test_data1.txt`);
    const exampleData2 = await readFile(
      `${__dirname}/test_data2.txt`,
    );

    const expectedAnswer = 8;
    const expectedAnswer2 = 19208;
    const actualAnswer = solution2(exampleData);
    const actualAnswer2 = solution2(exampleData2);

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('[Part 2] - should work with test data', async () => {
    const exampleData = await readFile(`${__dirname}/test_data1.txt`);
    const exampleData2 = await readFile(
      `${__dirname}/test_data2.txt`,
    );

    const expectedAnswer = 8;
    const expectedAnswer2 = 19208;
    const actualAnswer = solution2(exampleData);
    const actualAnswer2 = solution2(exampleData2);

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('[Part 2] - should work with real data', async () => {
    const exampleData = await readFile(`${__dirname}/real_data.txt`);

    const expectedAnswer = 347250213298688;
    const actualAnswer = solution2(exampleData);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
