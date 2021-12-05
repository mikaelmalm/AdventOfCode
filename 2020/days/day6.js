const parseData = (data) =>
  data.split('\n\n').map((group) =>
    group
      .split('\n')
      .filter((result) => result)
      .map((answer) => answer.split('')),
  );

const getUniqueAnswers = (answers) =>
  answers.map((groupAnswers) => [...new Set(groupAnswers)]);

const getSum = (answers) => answers.flat().length;

const solution1 = (answers) => {
  const parsedAnswers = parseData(answers).map((group) =>
    group.flat(),
  );

  const uniqueAnswers = getUniqueAnswers(parsedAnswers);
  const sumOfAnswers = getSum(uniqueAnswers);

  return sumOfAnswers;
};

const solution2 = (answers) => {
  const parsedAnswers = parseData(answers);

  const identicalAnswersInGroup = parsedAnswers.reduce(
    (sum, groupAnswers) => {
      const answerString = groupAnswers.flat().join('');
      const uniqueAnswers = [...new Set(groupAnswers.flat())];

      const identicalAnswers = uniqueAnswers.filter((answer) => {
        const matches = answerString.match(
          new RegExp(`${answer}`, 'g'),
        );

        return matches.length === groupAnswers.length;
      });

      return identicalAnswers.length > 0
        ? [...sum, ...identicalAnswers]
        : sum;
    },
    [],
  );

  const sumOfAnswers = getSum(identicalAnswersInGroup);

  return sumOfAnswers;
};

export { solution1, solution2 };
