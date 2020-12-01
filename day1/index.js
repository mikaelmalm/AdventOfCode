const fs = require("fs");

const currentPath = process.cwd();

const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => +field))
    .catch((err) => console.log(err));

const run = async () => {
  const input = await readFile();

  input.map((item, index) => {
    const compareArr = input.slice(index);

    compareArr.map((compareItem) => {
      if (item + compareItem === 2020) {
        console.log({ item, compareItem });
        console.log(item * compareItem);
      }
    });
  });
};

run(run);
