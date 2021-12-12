const parseData = (data) =>
  data.split('\n').map((field) => field.split(': '));

const solution1 = (data) => {
  const input = parseData(data);

  const result = input.filter((field) => {
    const [timesNeeded, charNeeded] = field[0].split(' ');
    const [minTimes, maxTimes] = timesNeeded.split('-');
    const password = field[1];
    const regExp = new RegExp(charNeeded, 'g');

    const matchChars = password.match(regExp);
    const numberOfTimesCharExist = matchChars && matchChars.length;

    if (!numberOfTimesCharExist) return null;

    const isValidPass =
      numberOfTimesCharExist >= +minTimes &&
      numberOfTimesCharExist <= +maxTimes;

    return isValidPass;
  });

  return result.length;
};

const solution2 = (data) => {
  const input = parseData(data);

  const result = input.filter((field) => {
    const [charPositions, charNeeded] = field[0].split(' ');
    const [charPos1, charPos2] = charPositions.split('-');
    const password = field[1];

    const charIsInPos1 = password[charPos1 - 1] === charNeeded;
    const charIsInPos2 = password[charPos2 - 1] === charNeeded;

    const bothPlacesIsNotSet = !(charIsInPos1 && charIsInPos2);

    const isValidPass =
      (bothPlacesIsNotSet && charIsInPos1) ||
      (bothPlacesIsNotSet && charIsInPos2);

    return isValidPass;
  });

  return result.length;
};

export { solution1, solution2 };
