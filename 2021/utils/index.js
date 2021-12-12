const fs = require('fs');
const util = require('util');

// eslint-disable-next-line import/prefer-default-export
export const readFile = (filename) =>
  fs.promises.readFile(filename, 'utf8');

// log function to show deeper object sructure
export const log = (obj) =>
  console.log(
    util.inspect(obj, {
      showHidden: false,
      depth: null,
      colors: true,
    }),
  );
