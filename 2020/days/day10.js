const parseData = (data) =>
  data
    .split('\n')
    .filter((line) => line)
    .map((field) => +field);

const formatData = (data) => {
  const sortedData = data.sort((a, b) => a - b);
  const ownDevice = sortedData[sortedData.length - 1] + 3;

  return [...sortedData, ownDevice];
};

const countPaths = (orginalAdaptors) => {
  // include the wall, since the wall will be our answer
  const adaptors = [0, ...orginalAdaptors];
  // we start at the end, adding our device as the end-path
  const lastAdaptor = Math.max(...adaptors);

  // add our device as the "first" path
  const paths = {
    [lastAdaptor + 3]: 1,
  };

  // loop all adaptors, starting at the end, looking on how many paths we can take
  for (let i = adaptors.length - 1; i >= 0; i -= 1) {
    const currentAdaptor = adaptors[i];

    // all the possible options for the current adaptor
    const options = [
      currentAdaptor + 1,
      currentAdaptor + 2,
      currentAdaptor + 3,
    ];

    /**
     * here some magic happens
     * first we check the option, and if it exists, we count the amont of paths that option can go
     * then we add all the paths values together, showing howmany paths the options for this adaptor can go
     *
     * Example:
     * 22 is our device, we count it as path 1
     * next, we get the number 19 as currentAdaptor, 19 have the options 20, 21 and 22
     * there is no adaptor 20 or 21, so those return 0, but 22 that is our device got 1 path to it,
     * this value is saved as paths for adaptor 19
     *
     * for adaptor 10, we have the options 11 12 and 13
     * Adaptor 11 exists, and have 1 path forward
     * Adaptor 12 exists, and have 1 path forward
     * Adaptor 13 does not exist, 0 paths forward
     * So adaptor 10 gets 2 paths forward
     *
     * Adaptor 7 have options 8,9,10
     * only 10 exists, and have 2 paths forward, therefore, adaptor 7 gets a total of 2 paths forward
     *
     * Adaptor 5 finds adaptor 6 (2 paths) and adaptor 7 (2 paths), so it equal 4 paths
     *
     * Adaptor 4 finds 5 (4 paths), 6 (2 paths) and 7(2 paths), equal 8 paths
     *
     * Adaptor 1 finds 2 (0),3 (0), and 4 (8)
     *
     * The wall, counted as adaptor 0 (could also be my superhero name after this assignment. Mikael "Adaptor 0" Malm)
     * finds 1 (8), 2 (0) and 3 (0), resulting in 8 different paths that can come from the wall to the device
     *
     * It goes like this:
     * 19 => 1
     * 16 => 1,
     * 15 => 1,
     * 12 => 1,
     * 11 => 1,
     * 10 => 2,
     * 7 => 2,
     * 6 => 2,
     * 5 => 4,
     * 4 => 8,
     * 1 => 8
     * 0 => 8
     */
    const pathsForward = options.reduce((sum, option) => {
      const optionPaths = paths[option];
      const path = optionPaths || 0;

      return sum + path;
    }, 0);

    // Is this Memoization? I think so :sweat_smile:
    paths[currentAdaptor] = pathsForward;
  }

  // return how many paths the wall has to the device
  return paths[0];
};

const solution1 = (data) => {
  const parsedData = parseData(data);
  const dataWithOwnDevice = formatData(parsedData);

  // get steps needed
  const result = dataWithOwnDevice.map((item, index) => {
    if (index === 0) return item;

    return item - dataWithOwnDevice[index - 1];
  });

  const oneOff = result.filter((item) => item === 1).length;
  const threeOff = result.filter((item) => item === 3).length;

  return oneOff * threeOff;
};

const solution2 = (data) => {
  const parsedData = parseData(data);
  // Sort does mutate, even if you put it in a variable
  const sortedData = [...parsedData].sort((a, b) => a - b);
  const result = countPaths(sortedData);

  return result;
};

export { parseData, solution1, solution2 };
