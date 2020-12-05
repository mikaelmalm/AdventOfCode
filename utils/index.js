const fs = require("fs");

export const readFile = (filename) => fs.promises.readFile(filename, "utf8");
