const parseData = (data) =>
  data
    .split('\r\n\r\n')
    // go through all fields, and split newlines and remove empty values
    .map((field) =>
      field
        .split(/\s|\r\n/)
        .filter((row) => row)
        .map((row) => row.split(':')),
    );

const getPassportFields = (passport) =>
  passport.reduce((result, pass) => [...result, pass[0]], []);

const validateRange = (value, min, max) =>
  value >= min && value <= max;
const validateYear = (year, min, max) =>
  year.length === 4 && validateRange(year, min, max);

const validateHeight = (rawHeight) => {
  const height = rawHeight.split(/[a-z]/).filter((value) => value)[0];
  const format = rawHeight.split(/[0-9]/).filter((value) => value)[0];

  const cmValidation = { min: 150, max: 193 };
  const inValidation = { min: 59, max: 76 };

  const validation = format === 'cm' ? cmValidation : inValidation;

  return height >= validation.min && height <= validation.max;
};

const validateHairColor = (color) => /^#[a-f0-9]{6}$/.test(color);
const validateEyeColor = (color) => {
  const acceptedColors = [
    'amb',
    'blu',
    'brn',
    'gry',
    'grn',
    'hzl',
    'oth',
  ];

  return acceptedColors.includes(color);
};

const validatePassportId = (id) => {
  const numbers = id.match(/[0-9]/g);

  return id.length === 9 && numbers.length === 9;
};

const validateData = (data) => {
  const [key, value] = data;

  switch (key) {
    case 'byr':
      return validateYear(value, 1920, 2002);

    case 'iyr':
      return validateYear(value, 2010, 2020);

    case 'eyr':
      return validateYear(value, 2020, 2030);

    case 'hgt':
      return validateHeight(value);

    case 'hcl':
      return validateHairColor(value);

    case 'ecl':
      return validateEyeColor(value);

    case 'pid':
      return validatePassportId(value);

    case 'cid':
      // hackerman
      return true;

    default:
      return false;
  }
};

const checkPassports = (passports) => {
  const requiredKeys = [
    'byr',
    'iyr',
    'eyr',
    'hgt',
    'hcl',
    'ecl',
    'pid',
  ];

  const passportsWithAllFields = passports.filter((passport) => {
    const passportFields = getPassportFields(passport);

    const allKeysPresent = requiredKeys.every((key) =>
      passportFields.includes(key),
    );

    return allKeysPresent;
  });

  const validatedPassport = passportsWithAllFields.filter(
    (passport) => {
      const validated = passport.every((pass) => validateData(pass));

      return validated;
    },
  );

  return validatedPassport;
};

// only have solution 2 for this
const solution = (data) => {
  const parsedData = parseData(data);

  const result = checkPassports(parsedData);

  return result.length;
};

export default solution;
