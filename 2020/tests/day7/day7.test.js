import { readFile } from '../../utils';

import {
  parseData,
  getBagsThatAllowsBag,
  getBagsToStoreBagIn,
  solution1,
  solution2,
} from '../../days/day7';

describe('[07]', () => {
  it('should parse data correctly', async () => {
    const exampleData = await readFile(`${__dirname}/test_part1.txt`);
    const expectedAnswer = [
      {
        type: 'light red',
        items: [
          { amount: 1, bag: 'bright white' },
          { amount: 2, bag: 'muted yellow' },
        ],
      },
    ];
    const actualAnswer = parseData(exampleData);

    expect([actualAnswer[0]]).toEqual(expectedAnswer);
  });

  it('should find bags that can contain a shiny gold bag', async () => {
    const exampleData = await readFile(`${__dirname}/test_part1.txt`);
    const expectedAnswer = ['bright white', 'muted yellow'];

    const bags = parseData(exampleData);

    const actualAnswer = getBagsThatAllowsBag(bags, 'shiny gold');

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('should find bags that allow, or have bags that allow a shiny gold bag', async () => {
    const exampleData = await readFile(`${__dirname}/test_part1.txt`);
    const bags = parseData(exampleData);

    const expectedAnswer = [
      'light red',
      'dark orange',
      'bright white',
      'muted yellow',
    ];

    const actualAnswer = getBagsToStoreBagIn(bags, 'shiny gold');

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[part 1] - should work with real data', async () => {
    const data = await readFile(`${__dirname}/real_data.txt`);

    const expectedAnswer = 161;
    const actualAnswer = solution1(data);

    expect(actualAnswer).toEqual(expectedAnswer);
  });

  it('[part 2] - should work with test data', async () => {
    const data = await readFile(`${__dirname}/test_part1.txt`);
    const data2 = await readFile(`${__dirname}/test_part2.txt`);

    const expectedAnswer = 32;
    const expectedAnswer2 = 126;
    const actualAnswer = solution2(data);
    const actualAnswer2 = solution2(data2);

    expect(actualAnswer).toEqual(expectedAnswer);
    expect(actualAnswer2).toEqual(expectedAnswer2);
  });

  it('[part 2] - should work with real data', async () => {
    const data = await readFile(`${__dirname}/real_data.txt`);

    const expectedAnswer = 30899;
    const actualAnswer = solution2(data);

    expect(actualAnswer).toEqual(expectedAnswer);
  });
});
