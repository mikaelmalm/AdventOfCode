const parseData = (data) => {
  const [unformatedNumbers, ...unformatedCards] = data.split('\n\n');

  const cards = unformatedCards.map((card) => {
    return {
      original: card
        .split(`\n`)
        .map((row) => row.split(' ').filter(Boolean).map(Number)),
    };
  });

  const numbers = unformatedNumbers.split(',').map(Number);

  return {
    numbers,
    cards,
  };
};

const checkNumber = (card, number) => {
  const checkedCard = card.map((row) => {
    const numberIndex = row.indexOf(number);

    if (numberIndex !== -1) {
      const first = row.slice(0, numberIndex);
      const second = row.slice(numberIndex + 1);
      return [...first, 'x', ...second];
    }

    return row;
  });

  return checkedCard;
};

const checkNumbers = (card, numbers) => {
  return numbers.reduce((checkedCard, number) => {
    return checkNumber(checkedCard, number);
  }, card);
};

const rowHasBingo = (row) => {
  const filteredRow = row.filter((value) => value === 'x');

  return filteredRow.length === 5 ? true : false;
};

const evaluateCard = (card) => {
  let xInColumn = [];

  for (let i = 0; i < card.length; i = i + 1) {
    if (rowHasBingo(card[i])) return true;

    card[i].map((value, index) => {
      if (value === 'x') {
        xInColumn[index] = (xInColumn[index] || 0) + 1;
      }
    });
  }

  const columnHasBingo = xInColumn.indexOf(5) !== -1;

  return columnHasBingo;
};

const evaluateCards = (cards) =>
  cards.filter((card) => evaluateCard(card.checked));

// calculate sum of remaining numbers
const calculateSumOfCard = (card) =>
  card
    .flat()
    .reduce((sum, value) => (!isNaN(value) ? sum + value : sum), 0);

const findFirstBingo = (cards, numbers) => {
  const checkedCards = cards.map((card) => {
    const data = card.checked ? card.checked : card.original;

    return {
      ...card,
      checked: checkNumbers(data, numbers.currentCheck),
    };
  });

  const evaluatedCards = evaluateCards(checkedCards);

  if (
    evaluateCards.length === 1 &&
    numbers.currentCheck.length === 1
  ) {
    return {
      bingoNumber: numbers.currentCheck[0],
      card: checkedCards[0].checked,
    };
  }

  if (evaluatedCards.length > 0) {
    // since we don't keep track of positions checked and all that, we reset the cards to it's original form
    // however, since we now that these are the winning cards, we only check them moving forward
    const newCards = evaluatedCards.map((card) => ({
      original: card.original,
    }));

    const [checkIndex] = [...numbers.currentCheck].reverse();
    const prevIndex = numbers.original.indexOf(checkIndex);

    const newNumbers = {
      original: numbers.original,
      prevNumbers: numbers.currentCheck,
      currentCheck: [...numbers.original].slice(0, prevIndex),
    };

    return findFirstBingo(newCards, newNumbers);
  }

  const [checkIndex] = [...numbers.currentCheck].reverse();
  const prevIndex = numbers.prevNumbers.indexOf(checkIndex);
  const startIndex =
    prevIndex !== -1 ? prevIndex + 1 : numbers.currentCheck.length;

  const newNumbers = {
    original: numbers.original,
    prevNumbers: numbers.prevNumbers,
    currentCheck: [...numbers.prevNumbers].slice(startIndex),
  };

  return findFirstBingo(checkedCards, newNumbers);
};

const solution1 = (data) => {
  const input = parseData(data);

  const numbers = {
    original: input.numbers,
    prevNumbers: input.numbers,
    currentCheck: [...input.numbers].slice(
      0,
      Math.floor(input.numbers.length / 2),
    ),
  };

  const bingo = findFirstBingo(input.cards, numbers);
  const sumOfCard = calculateSumOfCard(bingo.card);

  return sumOfCard * bingo.bingoNumber;
};

const solution2 = (data) => {
  const { numbers, cards } = parseData(data);

  let cardsToCheck = cards.map((card) => card.original);
  let bingoNumber = -1;
  let bingoCard;

  for (let index = 0; index < numbers.length; index++) {
    const checkedCards = cardsToCheck.map((card) => {
      const checkedCard = checkNumber(card, numbers[index]);

      return checkedCard;
    });

    const notStillWinners = checkedCards.filter(
      (card) => !evaluateCard(card),
    );

    if (notStillWinners.length === 0) {
      bingoNumber = numbers[index];
      bingoCard = checkedCards[0];

      break;
    }

    cardsToCheck = notStillWinners;
  }

  const sumOfCard = calculateSumOfCard(bingoCard);

  return sumOfCard * bingoNumber;
};

export { solution1, solution2 };
