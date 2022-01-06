const parseData = (data) =>
  data.split('\n').map((value) => {
    const [direction, steps] = value.split(' ');

    return {
      direction,
      steps: Number(steps),
    };
  });

const solution1 = (data) => {
  const input = parseData(data);

  const positions = input.reduce(
    (totalPos, order) => {
      switch (order.direction) {
        case 'forward':
          return {
            ...totalPos,
            horizontal: totalPos.horizontal + order.steps,
          };
        case 'up':
          return {
            ...totalPos,
            depth: totalPos.depth - order.steps,
          };

        case 'down':
          return {
            ...totalPos,
            depth: totalPos.depth + order.steps,
          };
      }
    },
    {
      horizontal: 0,
      depth: 0,
    },
  );

  const result = positions.horizontal * positions.depth;

  return result;
};

const solution2 = (data) => {
  const input = parseData(data);

  const positions = input.reduce(
    (totalPos, order) => {
      switch (order.direction) {
        case 'forward':
          return {
            ...totalPos,
            horizontal: totalPos.horizontal + order.steps,
            depth: totalPos.depth + totalPos.aim * order.steps,
          };
        case 'up':
          return {
            ...totalPos,
            aim: totalPos.aim - order.steps,
          };

        case 'down':
          return {
            ...totalPos,
            aim: totalPos.aim + order.steps,
          };
      }
    },
    {
      horizontal: 0,
      depth: 0,
      aim: 0,
    },
  );

  const result = positions.horizontal * positions.depth;

  return result;
};

export { solution1, solution2 };
