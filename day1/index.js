const fs = require("fs");

const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => +field))
    .catch((err) => console.log(err));

const itemsAreTwentyTwenty = (items) => {
  const itemsSum = items.reduce((sum, item) => sum + item, 0);

  return itemsSum === 2020;
};

const run = async () => {
  const input = await readFile();

  input.map((item, index) => {
    const compareArr = input.slice(index);

    compareArr.map((compareItem, compareIndex) => {
      const compareThirdArr = input.slice(compareIndex);

      compareThirdArr.map((thirdItem) => {
        if (itemsAreTwentyTwenty([item, compareItem, thirdItem])) {
          console.log({ item, compareItem, thirdItem });
          console.log(item * compareItem * thirdItem);
        }
      });
    });
  });
};

run(run);
