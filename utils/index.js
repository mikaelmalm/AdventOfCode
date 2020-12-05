const fs = require("fs");

export const readFile = (filename) =>
  fs.promises.readFile(`${__dirname}/${filename}.txt`, "utf8");
