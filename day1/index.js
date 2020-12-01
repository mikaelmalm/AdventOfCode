const fs = require("fs");

const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => +field))
    .catch((err) => console.log(err));

const multiplyItems = (items) => items.reduce((sum, item) => sum * item, 1);

const checkInput = (input, times, items = []) => {
  input.some((item, index) => {
    const compareArr = input.slice(index);

    if (times === 1) {
      const prevSum = items.reduce((sum, item) => sum + item, 0);
      const requiredNum = 2020 - prevSum;
      const exist = requiredNum > 0 && compareArr.includes(requiredNum);

      if (exist) {
        const lastIndex = compareArr.indexOf(requiredNum);

        console.log(multiplyItems([...items, input[lastIndex]]));
        return true;
      }

      return false;
    } else if (times !== 0) {
      return checkInput(compareArr, times - 1, [...items, item]);
    }
  });
};

const run = async () => {
  const input = await readFile();
  checkInput(input, 3);
};

run(run);
