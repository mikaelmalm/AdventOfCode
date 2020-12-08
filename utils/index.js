const fs = require('fs');

// eslint-disable-next-line import/prefer-default-export
export const readFile = (filename) =>
  fs.promises.readFile(filename, 'utf8');
