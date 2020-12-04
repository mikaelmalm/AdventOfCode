const fs = require("fs");

// Read file helper,
const readFile = () =>
  fs.promises
    .readFile(`${__dirname}/data.txt`, "utf8")
    .then((res) =>
      res
        .split("\r\n\r\n")
        // go through all fields, and split newlines and remove empty values
        .map((field) =>
          field
            .split(/\s|\r\n/)
            .filter((field) => field)
            .map((field) => field.split(":"))
        )
    )

    .catch((err) => console.log(err));

const checkPassports = (passports) => {
  // since 'cid' was not required, we don't even think about it
  const requiredKeys = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];

  return passports.filter((passport) => {
    const passportFields = passport.reduce(
      (result, pass) => [...result, pass[0]],
      []
    );

    const allKeysPresent = requiredKeys.every((key) =>
      passportFields.includes(key)
    );

    return allKeysPresent;
  });
};

const run = async () => {
  const data = await readFile();

  const result = checkPassports(data);

  console.log(result.length);
};

run();
