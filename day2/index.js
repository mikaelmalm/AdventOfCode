const fs = require("fs");

const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) => res.split("\r\n"))
    .then((res) => res.map((field) => field.split(': ')))
    .catch((err) => console.log(err));

const checkInput = (input) => {
  
  return input.filter((field) => {
    
    const [timesNeeded, charNeeded] = field[0].split(' ')
    const formatedTimesNeeded = timesNeeded.split('-').join(',')
    const password = field[1]

    
    // This solition is not working since it only matches chars in a row
    const regExp = new RegExp(`[${charNeeded}]{${formatedTimesNeeded}}`, 'g');

    // console.log(regExp)
    
    // returns all valid passwords
    return regExp.test(password)
  });
};

const run = async () => {
  const input = await readFile();

  
  const result = checkInput(input);

  console.log(result.length)
};

run();
