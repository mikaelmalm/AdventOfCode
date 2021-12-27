const parseData = (data) => {
  const linePaths = data.split('\n').map((line) =>
    line
      .split(' -> ')
      .map((cordinate) =>
        cordinate.split(',').map((num) => parseInt(num, 10)),
      )
      .flat(),
  );

  return linePaths;
};

const solution1 = (data) => {
  const linePaths = parseData(data);

  const verticalLines = linePaths.filter((path) => {
    const [x1, y1, x2, y2] = path;

    const xIsEqual = x1 === x2;
    const yIsEqual = y1 === y2;

    return xIsEqual || yIsEqual;
  });

  // const verticalLines = linePaths;
  // sets points on map
  const setPoint = (x, y) => {
    map[y] = map[y] || [];
    map[y][x] = map[y][x] || 0;
    return ++map[y][x];
  };

  const map = [];
  let collitions = 0;

  for (const cordinates of verticalLines) {
    const [x1, y1, x2, y2] = cordinates;

    // find out what part should increase
    const direction = x1 === x2 ? 'y' : 'x';
    const fromTo = direction === 'y' ? [y1, y2] : [x1, x2];
    // sort so we increase
    fromTo.sort((a, b) => a - b);

    // how many steps we need
    const [from, to] = fromTo;
    const steps = to - from;

    for (let i = 0; i <= steps; i++) {
      const [x, y] =
        direction === 'y' ? [x1, from + i] : [from + i, y1];

      if (setPoint(x, y) === 2) {
        collitions++;
      }
    }
  }

  return collitions;
};

const solution2 = (data) => {
  const linePaths = parseData(data);

  const setPoint = (x, y) => {
    map[y] = map[y] || [];
    map[y][x] = map[y][x] || 0;
    return ++map[y][x];
  };

  const map = [];
  let collitions = 0;

  for (const cordinates of linePaths) {
    const [x1, y1, x2, y2] = cordinates;

    let [x, y] = [x1, y1];

    while (true) {
      if (setPoint(x, y) === 2) {
        collitions++;
      }

      if (x === x2 && y === y2) {
        break;
      }

      if (x2 > x1) {
        x++;
      } else if (x2 < x1) {
        x--;
      }

      if (y2 > y1) {
        y++;
      } else if (y2 < y1) {
        y--;
      }
    }
  }

  return collitions;
};

export { solution1, solution2 };
