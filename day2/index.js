const fs = require("fs");

const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => field.split(": ")))
    .catch((err) => console.log(err));

const solution1 = (input) => {
  return input.filter((field) => {
    const [timesNeeded, charNeeded] = field[0].split(" ");
    const [minTimes, maxTimes] = timesNeeded.split("-");
    const password = field[1];
    const regExp = new RegExp(charNeeded, "g");

    const matchChars = password.match(regExp);
    const numberOfTimesCharExist = matchChars && matchChars.length;

    if (!numberOfTimesCharExist) return null;

    const isValidPass =
      numberOfTimesCharExist >= +minTimes &&
      numberOfTimesCharExist <= +maxTimes;

    return isValidPass;
  });
};

const solution2 = (input) => {
  return input.filter((field) => {
    const [charPositions, charNeeded] = field[0].split(" ");
    const [charPos1, charPos2] = charPositions.split("-");
    const password = field[1];

    const charIsInPos1 = password[charPos1 - 1] === charNeeded;
    const charIsInPos2 = password[charPos2 - 1] === charNeeded;

    const bothPlacesIsNotSet = !(charIsInPos1 && charIsInPos2);

    const isValidPass =
      (bothPlacesIsNotSet && charIsInPos1) ||
      (bothPlacesIsNotSet && charIsInPos2);

    return isValidPass;
  });
};

const run = async () => {
  const input = await readFile();

  const result1 = solution1(input);
  console.log("1", result1.length);

  const result2 = solution2(input);
  console.log("2", result2.length);
};

run();
